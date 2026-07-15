---
phase: 33-token-foundation-fonts
reviewed: 2026-07-15T02:48:48Z
depth: deep
files_reviewed: 12
files_reviewed_list:
  - src/styles/global.css
  - src/layouts/BaseLayout.astro
  - src/components/WaveMark.astro
  - src/components/SEO.astro
  - astro.config.mjs
  - scripts/check-contrast.mjs
  - scripts/check-contrast.test.mjs
  - lighthouserc.json
  - lighthouserc-mobile.json
  - .github/workflows/deploy.yml
  - package.json
  - public/favicon.svg
findings:
  critical: 1
  warning: 4
  info: 12
  total: 17
status: issues_found
---

# Phase 33: Code Review Report

**Reviewed:** 2026-07-15T02:48:48Z
**Depth:** deep
**Files Reviewed:** 12
**Status:** issues_found

## Summary

Deep review of the Phase 33 token foundation: `--wl-*` @theme block, dark flip, 13 type-ramp utilities, fontsource self-hosting with preloads, the custom Fontaine-fallback Vite plugin, contrast gate script + tests, Lighthouse CI expansion, WaveMark component, and favicon/OG assets. Cross-file verification was performed against the built `dist/` output, `node_modules` fontsource file paths, and live execution of the contrast gate and its test suite (15/15 pass).

The token values, dark flip mechanics, contrast math, fontsource file paths, and OG/favicon assets all check out. However, the phase's headline CLS mechanism is provably non-functional: the metric-adjusted fallback `@font-face` families injected by the custom Vite plugin are never referenced by any font stack in the built CSS, so they do nothing (CR-01). Additionally, the contrast gate can silently fail open due to a fragile `isMain` check (WR-01), the companion text token fails WCAG AA on sea-glass surfaces that the gate does not cover (WR-02), and both Lighthouse configs assert a metric that no longer exists in Lighthouse 12 (WR-03).

Per phase context, the old-token/new-token coexistence and the Google Fonts + fontsource dual loading were NOT flagged as defects.

## Critical Issues

### CR-01: Fontaine fallback @font-face families are defined but never referenced — CLS mitigation is a complete no-op

**File:** `src/styles/global.css:29-30` and `astro.config.mjs:19-67`
**Issue:** The `fontaineFallbackPlugin` injects four metric-adjusted `@font-face` blocks defining the families `"Fraunces Variable fallback"` and `"Hanken Grotesk Variable fallback"` (size-adjust/ascent-override/descent-override). But no font stack anywhere references those families. The token stacks are:

```css
--font-wl-heading: 'Fraunces Variable', Georgia, serif;
--font-wl-body:    'Hanken Grotesk Variable', ui-sans-serif, system-ui, sans-serif;
```

Verified in the built output (`dist/_astro/_slug_.B8OFU7xO.css`): the four fallback `@font-face` blocks are emitted, and the only occurrences of `"...Variable fallback"` in the entire bundle are those definitions themselves. Fontaine normally does two things — generate the fallback `@font-face` AND rewrite `font-family` declarations to insert the fallback family into stacks. The custom plugin replicates only the first half; `FontaineTransform` cannot rewrite the custom-property stacks (`--font-wl-*` are custom properties, not `font-family` declarations, and per the config's own Pitfall 3 comment it never processes the fontsource CSS either).

Net effect: during font load, browsers render raw Georgia / system sans with no metric adjustment. The "Fontaine CLS=0 fallback" deliverable is dead code shipped on every page, and any CLS pass in Lighthouse today is coincidence of preloads, not the claimed mechanism. This is incorrect behavior of a core phase deliverable and gives false confidence in the CLS gate.

**Fix:** Reference the fallback families in the token stacks:

```css
--font-wl-heading: 'Fraunces Variable', 'Fraunces Variable fallback', Georgia, serif;
--font-wl-body:    'Hanken Grotesk Variable', 'Hanken Grotesk Variable fallback', ui-sans-serif, system-ui, sans-serif;
```

Note: the injected Fraunces fallback covers only normal style; `.wl-accent-outcome`/`.wl-accent-kicker` use `font-style: italic`, so the fallback will render as non-italic Georgia/Times during load — acceptable, but consider an italic-metrics block if kicker text ends up above the fold. After fixing, re-verify with a throttled-network Lighthouse run that the fallback family actually activates (DevTools rendered-fonts check).

## Warnings

### WR-01: Contrast gate `isMain` detection can silently fail open

**File:** `scripts/check-contrast.mjs:166`
**Issue:** `const isMain = import.meta.url === \`file://${process.argv[1]}\`;` — `import.meta.url` is percent-encoded (spaces → `%20`, non-ASCII encoded) while `process.argv[1]` is a raw path; the comparison also breaks on Windows drive letters and when invoked through a symlink. When the comparison fails, the script prints nothing, runs zero checks, and exits 0 — i.e., the accessibility gate passes without ever executing. A gate that can no-op silently is fail-open. It works today only because the current repo path contains no special characters.
**Fix:**

```js
import { pathToFileURL } from 'node:url';
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
```

### WR-02: Companion token `--wl-accent-soft-text` fails WCAG AA on sea-glass surfaces; gate matrix has no coverage for those combinations

**File:** `scripts/check-contrast.mjs:122-162`, `src/styles/global.css:26`
**Issue:** The companion token `#347E7B` is validated only against paper (`4.55:1` PASS). Verified with the script's own `contrastRatio`:

- `#347E7B` on sea-glass `#E6F1F1` → **4.12:1** (fails AA 4.5:1)
- `#347E7B` on sea-glass-deep `#D2E7E7` → **3.7:1** (fails AA 4.5:1)
- Also unchecked: `accent #0E7078` on sea-glass-deep → 4.53:1 (passes by 0.03 — no regression guard), `sub` on sea-glass-deep (6.51:1, passes).

The token comment in global.css says only "AA-compliant" without stating the paper-only restriction. Any later phase that places eyebrow/kicker text using the companion token on a sea-glass or card surface will silently ship an AA failure the gate cannot catch. If D-11 scopes the matrix to mockup-observed pairs, that restriction must be enforced somewhere visible.
**Fix:** Add the companion-on-sea-glass and companion-on-sea-glass-deep pairs to `PAIRS` (as text-use rows if those combos are ever legal, or as informational rows with an explicit "PAPER-ONLY" label), and annotate the token in `global.css`:

```css
/* --wl-accent-soft-text: AA only on --wl-paper (4.55:1). FAILS on sea-glass (4.12:1) and sea-glass-deep (3.7:1). */
```

### WR-03: Both Lighthouse configs assert `interactive` (TTI), which was removed in Lighthouse 10 — the assertion is inert

**File:** `lighthouserc.json:24`, `lighthouserc-mobile.json:21`
**Issue:** `"interactive": ["warn", { "maxNumericValue": 3800 }]` — the Time to Interactive audit was removed in Lighthouse 10 (2023). `treosh/lighthouse-ci-action@v12` bundles LHCI 0.14.x / Lighthouse 12.x, so this asserts an audit that does not exist in the report. At best it is a no-op; at worst LHCI emits a confusing "audit did not run" warning on every CI run. Either way, the interactivity gate the config appears to provide does not exist.
**Fix:** Replace with the supported successor metric in both files:

```json
"total-blocking-time": ["warn", { "maxNumericValue": 300 }]
```

### WR-04: `.wl-accent-outcome` code contradicts its own spec comment on `font-variation-settings`

**File:** `src/styles/global.css:681-691` (and `:693-703` for kicker)
**Issue:** The comment on `.wl-accent-outcome` states "no font-variation-settings for Fraunces accent styles", yet the rule immediately sets `font-variation-settings: "SOFT" 0, "WONK" 1;` (kicker likewise). The ramp header comment (line 522) says all Fraunces styles carry SOFT/WONK "per mockup renders". One of these is wrong: if the extraction table says accent styles carry no variation settings, then WONK 1 visibly changes italic glyph shapes versus the Figma mockups (a fidelity bug); if the header is right, the per-style comment is false documentation that will mislead Phase 41 cleanup.
**Fix:** Re-check the accent styles in the Figma extraction. Either delete the `font-variation-settings` line from both accent utilities, or correct the comment to "opsz not specced in extraction; SOFT/WONK retained per ramp-wide mockup render note".

## Info

### IN-01: WaveMark.astro is an orphaned component

**File:** `src/components/WaveMark.astro`
**Issue:** `grep -r "WaveMark" src/` finds no imports — the component is unused anywhere in the codebase. If it's staged for the Phase 34+ header, fine; otherwise it's dead code. Also note `aria-hidden="true"` is hardcoded with no override: any future use as the sole content of a link/button will produce a nameless control unless the consumer adds visible or sr-only text.
**Fix:** Confirm a consuming phase exists; consider making `aria-hidden` overridable via props when it gets wired in.

### IN-02: Dead 390px media overrides duplicate the 768px values

**File:** `src/styles/global.css:593-595, 610-612`
**Issue:** `.wl-heading-h3` and `.wl-text-lead` both set `font-size: 18px` at `max-width: 390px`, identical to the `max-width: 768px` rule that already applies. The 390px blocks are unreachable no-ops.
**Fix:** Delete both `@media (max-width: 390px)` blocks (keep a comment noting 390 == 768 per spec).

### IN-03: Type ramp uses px font sizes; H3 tracking looks like a mistraced constant

**File:** `src/styles/global.css:525-705`
**Issue:** (a) All 13 utilities use px font sizes, which ignore the user's browser default-font-size preference (page zoom still works, so WCAG 1.4.4 is met — quality note only). (b) `letter-spacing: -1.5px` is applied uniformly to hero (76px), H1 (61px), H2 (50px), and H3 (21px). At 21px that is -0.071em — 3.5x proportionally tighter than the hero and unusually tight for running headings. This pattern is consistent with a fixed-px value traced once and copied.
**Fix:** Verify H3's letter-spacing against the Figma extraction table specifically; consider em-based tracking so it scales with the media-query size changes (at 18px the -1.5px becomes -0.083em, even tighter).

### IN-04: Lighthouse config duplication and redundant workflow inputs

**File:** `lighthouserc.json`, `lighthouserc-mobile.json`, `.github/workflows/deploy.yml:38-54`
**Issue:** The two LHCI configs are identical except for `preset: "desktop"` — drift risk when assertions change (WR-03 already had to be fixed in two places). The workflow additionally passes `runs: 3` and `staticDistDir` as action inputs, duplicating values already in the configs; `staticDistDir` is not a documented input of `treosh/lighthouse-ci-action` and will produce an "unexpected input" warning while being ignored.
**Fix:** Remove `staticDistDir` (and optionally `runs`) from the workflow steps; consider generating the mobile config from the desktop one or documenting that both must be edited together.

### IN-05: FontaineTransform config is inert; `fallbacks` includes unresolvable generic `serif`

**File:** `astro.config.mjs:86-89`
**Issue:** By the config's own Pitfall 3 comment, FontaineTransform never processes the fontsource CSS, and no other `@font-face` sources exist — the plugin currently transforms nothing. Its `fallbacks` array also includes `'serif'`, a generic family that `local()` cannot resolve, so it would produce a useless `src: local("serif")` block if it ever did run. Kept "for fonts added later" is a fair rationale, but it is dead configuration today.
**Fix:** Either remove FontaineTransform until a real consumer exists, or drop `'serif'` from `fallbacks`.

### IN-06: Contrast ratio rounded before threshold comparison

**File:** `scripts/check-contrast.mjs:71, 176-177`
**Issue:** `contrastRatio` rounds to 2 decimals, and the gate compares the rounded value: a true ratio of 4.4951 rounds to 4.5 and passes AA despite actually failing. Current pairs are not near this boundary (closest text-use pair is 4.55), but the gate logic is technically permissive.
**Fix:** Return the unrounded ratio, compare against the threshold unrounded, and round only for display.

### IN-07: Test "parses lowercase hex" never exercises lowercase parsing

**File:** `scripts/check-contrast.test.mjs:27-32`
**Issue:** The test uses `'#000000'`, which contains no alphabetic characters — lowercase hex digits (e.g. `'#5aa9a5'`) are never tested, so the test name asserts behavior it does not verify. Also, no test covers the `PAIRS` matrix shape or the exit-code gate logic (the part that actually protects the tokens).
**Fix:** Change the fixture to a hex with letters, e.g. `assert.deepStrictEqual(hexToRgb('#5aa9a5'), { r: 90, g: 169, b: 165 })`, and add a smoke test that every `PAIRS` row has 5 elements with valid hex fg/bg.

### IN-08: SEO JSON-LD ships an empty `sameAs`; OG image lacks dimension/alt tags

**File:** `src/components/SEO.astro:43-48, 59-72`
**Issue:** `sameAs: []` is emitted as an empty array (the URLs are commented out) — harmless but pointless in the payload. The OG block omits `og:image:width`/`og:image:height` (1200/630 — the asset was verified at exactly those dimensions) and `og:image:alt`/`twitter:image:alt`, which some scrapers use for faster/accessible previews.
**Fix:** Drop `sameAs` until URLs exist; add `og:image:width`, `og:image:height`, and image alt meta tags.

### IN-09: faq.astro owns its own `<head>` and did not receive the new woff2 preloads

**File:** `src/pages/faq.astro` (cross-file; BaseLayout.astro:37-39)
**Issue:** `faq.astro` bypasses BaseLayout and duplicates the head structure, so the three self-hosted font preloads added in this phase exist only in BaseLayout. `/faq/` still loads the fonts (via `global.css` `@font-face` — the shared CSS bundle is linked on every page, verified in dist), but without preload hints its font-load behavior diverges from every other page. This duplication will bite again in Phase 41.
**Fix:** Migrate faq.astro onto BaseLayout, or copy the preload block until then.

### IN-10: Three variable-font preloads on every page plus Google Fonts (perf note)

**File:** `src/layouts/BaseLayout.astro:37-39, 41-59`
**Issue:** Every page unconditionally preloads Fraunces normal, Fraunces italic, and Hanken Grotesk woff2 at highest priority while also fetching the Bricolage/DM Sans Google Fonts CSS (intentional coexistence until Phase 41 — noted, not flagged). The italic Fraunces preload in particular pays full bandwidth cost on pages that render no italic above the fold, competing with the LCP resource on mobile. Watch the mobile LHCI perf gate (error-level at 0.9) — this dual-stack window is the most likely cause of a red deploy.
**Fix:** Consider dropping the italic preload (let unicode-range/lazy loading fetch it) until an above-the-fold kicker exists.

### IN-11: Dark-mode inline script accesses localStorage unguarded

**File:** `src/layouts/BaseLayout.astro:62-69`
**Issue:** `localStorage.theme` throws `SecurityError` when site data/cookies are blocked (some Chrome configurations), aborting the script — those users never get dark mode and see a console error. Pre-existing code (last functional change was Phase 07), included for completeness since the file is in scope.
**Fix:** Wrap in `try { ... } catch {}`.

### IN-12: Stale `allowScripts` entry for sharp@0.34.5

**File:** `package.json:35-38`
**Issue:** `allowScripts` whitelists both `sharp@0.34.5` and `sharp@0.33.5`, but the devDependency is `^0.33.5` — the 0.34.5 entry references a version not in the tree (leftover from a bump that was reverted, or pre-staged).
**Fix:** Remove the `sharp@0.34.5` entry, or update the dependency to match.

---

## Verified Clean (deep-dive checks that passed)

- Token hex values in `check-contrast.mjs` match `global.css` exactly for all 15 constants (light, dark, companions).
- Fontaine metric math is internally consistent (Fraunces: 1956/2000 ÷ 1.270154 = 76.9985% ascent ✓; Georgia and Arial blocks likewise).
- Fontsource woff2 filenames in BaseLayout imports match `node_modules/@fontsource-variable/*/files/` on disk.
- `public/og-image.png` exists at exactly 1200x630; `favicon.ico` and `favicon.svg` regenerated together (matching timestamps); favicon.svg dark-scheme handling is correct.
- Lighthouse URL `blog/im-pivoting/` corresponds to an existing content file.
- The `.dark` variable flip works: `@theme` vars are emitted layered, the unlayered `.dark` block wins; all `--color-wl-*` vars (including companion) confirmed present in dist CSS.
- `@layer base` body rule is correctly masked by the existing `font-body` utility on `<body>` — old pages unaffected as documented.
- Contrast gate executes correctly when run (`exit 0`, 1 decorative INFO row as designed); all 15 unit tests pass under `node --test`.
- Fallback CSS injection lands exactly once, in the single shared bundle linked by every page (no duplication across the 4 dist CSS files).

---

_Reviewed: 2026-07-15T02:48:48Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: deep_

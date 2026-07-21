---
phase: 33-token-foundation-fonts
verified: 2026-07-15T02:57:40Z
status: passed
score: 5/5 must-haves verified
gaps: []
human_verification:
  - test: "Open homepage in browser with network throttled (e.g. Slow 3G). Toggle dark mode on/off while Fraunces/Hanken Grotesk are still loading."
    expected: "No visible layout shift — the Fontaine fallback @font-face blocks (Fraunces Variable fallback / Hanken Grotesk Variable fallback) should hold column widths via metric-adjusted Georgia/Arial until the variable fonts swap in."
    why_human: "CLS=0 requires a live Lighthouse run or DevTools Rendered Fonts inspection. Structural verification confirms the mechanism is wired (fallback families appear in font stacks, ascent-override blocks land in dist CSS), but actual shift measurement requires network emulation."
  - test: "Visit https://joelshinness.com/og-image.png and inspect the composition."
    expected: "1200x630 PNG showing waveform mark, 'Joel Shinness Solutions' wordmark (Fraunces), verbatim tagline 'On your wavelength.', sea-cool palette background. No hand-authored geometry. Matches the Figma frame node 5:41 export."
    why_human: "OG approval was recorded in SUMMARY-06 (Joel approved via checkpoint on 2026-07-14). Visual fidelity vs. Figma frame cannot be verified programmatically."
---

# Phase 33: Token Foundation + Fonts Verification Report

**Phase Goal:** Every downstream component has correct, Figma-extracted token values and self-hosted variable fonts to build against — with zero fidelity gaps and zero Lighthouse CLS regression.
**Verified:** 2026-07-15T02:57:40Z
**Status:** passed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | All 8 `--wl-*` palette tokens (light + dark) are in `global.css @theme`, Figma-traced, no invented values | VERIFIED | 8 light values in new `@theme` block; `.dark {}` block flips 7 (sea-glass-deep keep-light per D-04/FIDELITY-GAP). Values match 33-FIGMA-EXTRACTION.md exactly. `grep -c "color-wl-" global.css` = 17 (9 light + 1 companion + 7 dark + 1 companion). |
| 2 | Fraunces + Hanken Grotesk self-hosted via `@fontsource-variable`, with Fontaine fallback CLS mechanism wired | VERIFIED | 3 `@import` lines at top of global.css (wght.css, wght-italic.css, hanken wght.css — no full.css). `fontaineFallbackPlugin` injects 4 fallback `@font-face` blocks; CR-01 fix confirmed: fallback families referenced in `--font-wl-heading`/`--font-wl-body` stacks in dist CSS. 3 preload `<link>` tags in built `dist/index.html` resolving to `/_astro/*.woff2`. |
| 3 | WCAG AA contrast passes for all text-use token pairs in both themes | VERIFIED | `node scripts/check-contrast.mjs` exits 0. 16 text-use pairs all pass 4.5:1. 3 decorative/restricted INFO rows. `node --test scripts/check-contrast.test.mjs` 15/15 pass. |
| 4 | Lighthouse CI tests landing + blog post on desktop + mobile with lcp-lazy-loaded/prioritize-lcp-image re-enabled | VERIFIED | `lighthouserc.json`: 2 URLs (/ + /blog/im-pivoting/), `"lcp-lazy-loaded": "warn"`, `"prioritize-lcp-image": "warn"`. `lighthouserc-mobile.json`: identical URLs + assertions, no `settings.preset`. `deploy.yml` has exactly 2 `treosh/lighthouse-ci-action@v12` steps. `/showcase/` intentionally deferred to Phase 38 (documented via `_comment` in both configs). |
| 5 | Waveform mark, favicon, and OG image from Figma are wired into BaseLayout/SEO | VERIFIED | `WaveMark.astro`: inline SVG, `stroke="currentColor"`, 3 paths with geometry copied verbatim from node 4:80 (Figma MCP export). `public/favicon.svg`: `<style>` block with `@media (prefers-color-scheme: dark)`, hardcoded `--wl-ink` light/dark hexes. `public/favicon.ico`: regenerated (mtime 2026-07-14). `public/og-image.png`: exists (1200x630 export of Figma frame 5:41, Joel-approved). `SEO.astro`: `ogImage` = `/og-image.png`; `og-image.svg` deleted. Built HTML emits `og:image` = `https://joelshinness.com/og-image.png`. |

**Score:** 5/5 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `.planning/phases/33-token-foundation-fonts/33-FIGMA-EXTRACTION.md` | Palette + type ramp + SVG + OG contract | VERIFIED | All 5 sections present: Palette Token Mapping (8 rows), Type Ramp (13 rows), Waveform Mark SVG (3 paths), OG Tagline, OG Frame Check. FIDELITY-GAPS documented (sea-glass-deep). |
| `src/styles/global.css` | `@theme` with 8 `--wl-*` tokens, `.dark` flip, companion, font tokens, `@layer base body`, 13 `.wl-*` type utilities | VERIFIED | Plain `@theme` (not inline), `.dark {}` flip block, `@layer base { body }` with `var(--font-wl-body)` + `line-height: 1.6`. 13 `.wl-*` selectors confirmed. No `clamp()`. No placeholders. Old neobrutalist block untouched. |
| `scripts/check-contrast.mjs` | Re-runnable WCAG AA gate, W3C formula, exits 0/1 | VERIFIED | 4 exported pure functions, 19-row PAIRS matrix, `pathToFileURL`-based `isMain` check (WR-01 fix). Exits 0. NOT in CI or package.json scripts (D-10). |
| `scripts/check-contrast.test.mjs` | 15 unit tests proving W3C formula | VERIFIED | 15/15 pass via `node --test`. Tests cover black-on-white 21:1, identical colors 1:1, order-independence, `#767676` AA boundary, known accent-soft failure. |
| `lighthouserc.json` | Expanded to 2 URLs, lcp-lazy-loaded/prioritize-lcp-image = warn | VERIFIED | 2 URLs, both LCP audits set to warn, TTI replaced with `total-blocking-time` (WR-03 fix), valid JSON. |
| `lighthouserc-mobile.json` | Same as desktop config, no `settings.preset` | VERIFIED | No `"preset"` key, same 2 URLs and assertion block, valid JSON. |
| `.github/workflows/deploy.yml` | 2 `treosh/lighthouse-ci-action@v12` steps | VERIFIED | 2 steps confirmed; second step references `lighthouserc-mobile.json`. |
| `src/components/WaveMark.astro` | Inline SVG, `stroke="currentColor"`, Figma geometry, `aria-hidden` | VERIFIED | 23 lines, inline `<svg>`, 3 `<path>` elements with `stroke="currentColor"`, geometry matches extraction artifact verbatim, `aria-hidden="true"`. |
| `public/favicon.svg` | Waveform mark + prefers-color-scheme dark support | VERIFIED | `<style>` block with `@media (prefers-color-scheme: dark)`, light stroke `#12333B`, dark stroke `#EAF6F3`. |
| `public/favicon.ico` | Regenerated from new mark | VERIFIED | File exists; mtime 2026-07-14 (newer than phase start). |
| `public/og-image.png` | 1200x630 Figma-exported PNG, Joel-approved | VERIFIED | File exists. Dimensions verified by sharp metadata in plan execution (1200x630). Direct export of Figma frame 5:41, approved by Joel on 2026-07-14. |
| `src/components/SEO.astro` | `ogImage` = `/og-image.png`, no svg reference | VERIFIED | Line 34: `const ogImage = \`${SITE_URL}/og-image.png\``. No `og-image.svg` anywhere in file or public/. |
| `src/layouts/BaseLayout.astro` | 3 `?url` imports, 3 `<link rel="preload">` tags | VERIFIED | 3 Vite `?url` imports in frontmatter, 3 `<link rel="preload" as="font" type="font/woff2" ... crossorigin="anonymous">` tags in `<head>`. Built HTML has 3 preloads resolving to `/_astro/*.woff2`. |
| `astro.config.mjs` | Fontaine plugin + custom fallback injector | VERIFIED | `FontaineTransform.vite(...)` imported and configured. `fontaineFallbackPlugin` custom Vite transform injects 4 fallback `@font-face` blocks. `grep -rl "ascent-override" dist/` returns 1 file. |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `33-FIGMA-EXTRACTION.md` palette table | `global.css @theme` block | downstream executor reads hex values | WIRED | All 8 light hex values in `@theme` match extraction artifact exactly. |
| `global.css @theme` `--wl-*` block | downstream Tailwind `bg-wl-*/text-wl-*` utilities | Tailwind 4 generates utilities from `@theme` vars | WIRED | `npm run build` succeeds; `--color-wl-*` vars emitted in dist CSS; Tailwind can generate utilities. |
| `global.css .dark` block | `BaseLayout.astro` FOUC `is:inline` toggle script | `.dark` class flip triggers custom property overrides | WIRED | `.dark {}` block present (plain, not `@theme`); `is:inline` script sets `.dark` on `<html>`; dark token values confirmed in dist CSS. |
| `global.css .wl-* type utilities` | `--font-wl-heading`/`--font-wl-body` tokens | `font-family: var(--font-wl-*)` | WIRED | All 13 `.wl-*` classes use `var(--font-wl-heading)` or `var(--font-wl-body)` (grep confirmed). |
| `BaseLayout.astro ?url font imports` | self-hosted woff2 in `node_modules/@fontsource-variable` | Vite `?url` resolves to hashed `/_astro/*.woff2` | WIRED | 3 preload URLs in built HTML reference `/_astro/fraunces-latin-wght-normal.*.woff2`, `fraunces-latin-wght-italic.*.woff2`, `hanken-grotesk-latin-wght-normal.*.woff2`. |
| `astro.config.mjs fontaineFallbackPlugin` | `dist/` CSS bundle | Vite transform injects `@font-face` at CSS start | WIRED | `grep "ascent-override" dist/_astro/_slug_.*.css` confirms 4 fallback blocks emitted. |
| `--font-wl-heading` / `--font-wl-body` stacks | Fontaine fallback `@font-face` families | family names in font-family list | WIRED (CR-01 FIXED) | `'Fraunces Variable fallback'` in `--font-wl-heading` and `'Hanken Grotesk Variable fallback'` in `--font-wl-body` confirmed (commit b6d5029). Previously a no-op; now the CLS mechanism is functional. |
| `33-FIGMA-EXTRACTION.md` waveform SVG | `WaveMark.astro` + `favicon.svg` | executor copied path data verbatim | WIRED | Path `d=` attributes in `WaveMark.astro` match the 3 paths in the extraction artifact exactly. `favicon.svg` uses same paths. |
| `scripts/check-contrast.mjs` companion hex | `global.css @theme` `--color-wl-accent-soft-text` | 33-04 reads companion from 33-03 summary | WIRED | `#347E7B` (light) / `#7FC4C0` (dark) in both `global.css` and `check-contrast.mjs` PAIRS matrix. |
| `SEO.astro` ogImage | `public/og-image.png` | `ogImage` constant | WIRED | `const ogImage = \`${SITE_URL}/og-image.png\`` confirmed. Built HTML emits `og:image` = `https://joelshinness.com/og-image.png`. No residual `og-image.svg` references. |

---

### Requirements Coverage

| Requirement | Phase | Status | Evidence |
|-------------|-------|--------|----------|
| FOUND-01: `@theme` token set — 8 `--wl-*` tokens light + dark, namespaced | Phase 33 | SATISFIED | 8 light tokens in new `@theme` block; 7 dark in `.dark` block (sea-glass-deep keep-light per D-04, documented FIDELITY-GAP); `--wl-` prefix isolates from old neobrutalist tokens. |
| FOUND-02: Fraunces + Hanken Grotesk self-hosted via `@fontsource-variable`, 13-style type ramp | Phase 33 | SATISFIED | 3 `@import` lines (wght.css, wght-italic.css, hanken wght.css), 3 preload `<link>` tags in `<head>`, Fontaine fallback metrics in dist CSS, 13 `.wl-*` composite utilities with baked breakpoints (no clamp). |
| FOUND-03: WCAG AA contrast verified for token pairs before any component | Phase 33 | SATISFIED | `node scripts/check-contrast.mjs` exits 0; 16 text-use pairs pass; `--wl-accent-soft-text` companion (#347E7B, 4.55:1) derived and wired; `node --test` 15/15 pass. |
| FOUND-04: Lighthouse CI expanded — landing + one blog post URL, mobile + desktop, lcp-lazy-loaded re-enabled | Phase 33 | SATISFIED | `lighthouserc.json` + `lighthouserc-mobile.json` each have 2 URLs; both audits set to warn; 2 CI steps in `deploy.yml`. `/showcase/` deferred to Phase 38 — documented with `_comment` in both configs; this is the approved deviation. |
| FOUND-05: Waveform mark, favicon, OG image from Figma wired into layout/SEO | Phase 33 | SATISFIED | `WaveMark.astro` (inline SVG, Figma geometry), `favicon.svg` (prefers-color-scheme dark), `favicon.ico` (regenerated), `og-image.png` (1200x630, Figma frame 5:41, Joel-approved), `SEO.astro` wired to PNG. |

**All 5 phase-33 requirements (FOUND-01 through FOUND-05) satisfied.**

---

### Code Review Fixes Verified (post-review commits b6d5029, 7a30bb1, 2df0725, fe54e76, 3690e3d)

| Finding | Commit | Fix Verified |
|---------|--------|--------------|
| CR-01: Fontaine fallback families not in font stacks (CLS mechanism was no-op) | b6d5029 | FIXED — `'Fraunces Variable fallback'` and `'Hanken Grotesk Variable fallback'` now in `--font-wl-heading`/`--font-wl-body` stacks in `global.css:35-36` |
| WR-01: `isMain` detection could fail-open (path comparison broken on special chars) | 7a30bb1 | FIXED — `pathToFileURL(process.argv[1]).href` comparison used in `check-contrast.mjs:186` |
| WR-02: `--wl-accent-soft-text` lacked documentation of sea-glass failure | 2df0725 | FIXED — PAPER-ONLY annotation in `global.css:26-28`; informational (non-blocking) rows added to PAIRS matrix in `check-contrast.mjs:152-153` |
| WR-03: Lighthouse configs asserted `interactive` (removed in LH 10) | fe54e76 | FIXED — replaced with `"total-blocking-time": ["warn", { "maxNumericValue": 600 }]` in both configs |
| WR-04: `.wl-accent-outcome`/`.wl-accent-kicker` comment contradicted spec | 3690e3d | FIXED — comment corrected to "opsz not specced in extraction table (—); SOFT 0 / WONK 1 retained per extraction's ramp-wide mockup-render note" (`global.css:688-689`) |

---

### Anti-Patterns Found

No blockers. Review info-level items (IN-01 through IN-12) are acknowledged and do not block downstream phases:

- **IN-01 (WaveMark orphaned):** Expected — Phase 34 (header) is its first consumer per plan.
- **IN-02 (dead 390px media overrides):** Non-blocking; duplicate rules (no-op) don't affect output.
- **IN-03 (px font sizes, H3 letter-spacing):** Quality note; WCAG 1.4.4 met; H3 `-1.5px` traces to Figma spec, not hand-authored.
- **IN-04 (LH config duplication):** Acceptable coexistence for Phase 33; cleanup in Phase 41.
- **IN-05 (FontaineTransform inert for fontsource paths):** Known and documented; workaround (`fontaineFallbackPlugin`) is wired and functional.
- **IN-06 (contrastRatio rounds before threshold):** Closest pair (4.55:1) is 0.05 above threshold; not near the rounding boundary.
- **IN-07 (test fixture doesn't exercise lowercase parsing):** Test name is inaccurate but parsing correctness is covered by other tests.
- **IN-08 (empty `sameAs`, missing OG dimension meta):** Cosmetic; does not affect social card rendering.
- **IN-09 (`faq.astro` bypasses BaseLayout — no preload hints):** Pre-existing; `faq.astro` still loads fonts via shared CSS bundle; Phase 41 scope.
- **IN-10 (3 preloads + Google Fonts dual-load):** Intentional coexistence until Phase 41; perf note on record.
- **IN-11 (localStorage unguarded in FOUC script):** Pre-existing; Phase 07 scope.
- **IN-12 (stale `sharp@0.34.5` in allowScripts):** Cosmetic; sharp 0.33.x is installed and works.

---

### Human Verification Required

#### 1. Fontaine CLS Measurement

**Test:** With the dev server running (`npm run dev`) or via a local Lighthouse run (`npx lhci collect --config=lighthouserc.json`), load the homepage on a throttled connection (Slow 3G in DevTools or Lighthouse emulation) while Fraunces/Hanken Grotesk are loading.
**Expected:** CLS = 0. DevTools Rendered Fonts panel should show the `"Fraunces Variable fallback"` or `"Hanken Grotesk Variable fallback"` families before the variable fonts load, confirming metric-adjusted fallback is active.
**Why human:** Structural checks pass (fallback families in font stacks, ascent-override in dist CSS). Actual CLS measurement requires live Lighthouse or network throttling — cannot be verified by grep.

#### 2. OG Image Visual Fidelity

**Test:** Open `/public/og-image.png` and compare against Figma frame `5:41` on page `2:3` of the brand file.
**Expected:** Waveform mark, "Joel Shinness Solutions" wordmark in Fraunces, tagline "On your wavelength." (with period), `joelshinness.com` — all on a sea-cool palette background.
**Why human:** Joel approved this via checkpoint on 2026-07-14. This entry confirms the approval happened; no further action required unless a regression is suspected.

---

### FIDELITY-GAPS (documented, not blocking)

- `--wl-sea-glass-deep` has no dark-mode evidence in Figma (no variable binding, not observed in dark frame 117:103). Keeps light value `#D2E7E7` in dark mode per D-04. Sea-glass-deep omitted from `.dark {}` block (keep-light behavior automatic). Flagged for Figma review before Phase 35 components use the token on dark surfaces.

---

### Gaps Summary

No gaps. All 5 requirements verified. All code review fixes confirmed present in codebase. Build passes. Contrast gate passes (15/15 tests, 0 exits). All artifacts exist, are substantive, and are wired. The CLS measurement and OG visual fidelity are flagged for human verification but do not constitute gaps — the structural mechanisms are in place.

---

_Verified: 2026-07-15T02:57:40Z_
_Verifier: Claude (gsd-verifier)_

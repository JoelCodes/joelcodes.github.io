---
phase: 36-content-components-expandable-cards
reviewed: 2026-07-16T22:57:28Z
depth: deep
files_reviewed: 10
files_reviewed_list:
  - astro.config.mjs
  - scripts/check-contrast.mjs
  - src/components/wl/FAQItem.astro
  - src/components/wl/FrequencyWave.astro
  - src/components/wl/ProjectCard.astro
  - src/content.config.ts
  - src/data/projects.json
  - src/styles/global.css
  - tests/accessibility/axe-tests.spec.ts
  - tests/accessibility/dark-mode.spec.ts
findings:
  critical: 1
  warning: 7
  info: 8
  total: 16
status: issues_found
---

# Phase 36: Code Review Report

**Reviewed:** 2026-07-16T22:57:28Z
**Depth:** deep
**Files Reviewed:** 10
**Status:** issues_found

## Summary

Deep review of the Phase 36 content components (ProjectCard, FAQItem, FrequencyWave), the projects content collection (schema + data), the shared `::details-content` animation CSS, config redirects, the contrast gate additions, and the a11y test suites. Cross-file checks performed: every `--wl-*` / `--color-wl-*` / `--font-wl-*` token and `.wl-*` utility referenced by the three components resolves to a definition in `global.css`; `Eyebrow.astro` and `Tag.astro` imports exist and their prop contracts match ProjectCard's usage; `content.config.ts` schema fields match `projects.json` keys with unique `id`s; redirect targets (`/portfolio`, `/contact`, `/faq`) have no colliding page files. The contrast gate was executed and passes.

However, the review found one confirmed functional defect that ships incorrect behavior (the ProjectCard open-state toggle label can never display — inline `style="display: none"` defeats the stylesheet swap), a cross-engine rendering risk in FrequencyWave (empirically verified safe in Chromium only; the test suite runs Chromium only), a dead hover affordance in FAQItem caused by the same inline-style-beats-class pattern, open-state spacing that double-counts container padding versus the extraction spec, placeholder data with a slug/title mismatch, and an a11y test that has been silently scanning a 404 page (`/about` has never existed as a route).

The pervasive use of inline `style` attributes for every declaration is the root cause of two of the top findings: inline styles cannot be overridden by any selector, so any state-driven CSS (`[open]`, `:hover`) touching an inline-styled property is dead on arrival.

## Critical Issues

### CR-01: ProjectCard "Hide" toggle label can never display — inline `display: none` defeats the `[open]` stylesheet swap

**File:** `src/components/wl/ProjectCard.astro:273-284, 391-396`
**Issue:** The open-state label is hidden with an inline style:

```astro
<span
  class="wl-toggle-label-open"
  style={[ ... 'display: none;' ].join(' ')}
>Hide</span>
```

and is supposed to be revealed by the component `<style>` block:

```css
.wl-project-card-details[open] .wl-toggle-label-open {
  display: inline;
}
```

Inline `style` attributes win over every stylesheet selector regardless of specificity (only `!important` can override them). The `display: inline` rule therefore never applies. Result: when the card is open, `.wl-toggle-label` ("Read the story") is correctly hidden (that rule overrides default display, not an inline style), and "Hide" stays hidden — the open card renders **no toggle label at all**, just a rotated chevron. This breaks the documented Figma contract (label "Hide" when open, nodes 41:27/41:77) and removes the visible close affordance.

**Fix:** Move the default hiding into the stylesheet and drop the inline `display: none`:

```astro
<span class="wl-toggle-label-open" style="font-family: var(--font-wl-body); font-size: 14px; font-weight: 600; line-height: normal; color: var(--color-wl-accent);">Hide</span>
```

```css
.wl-toggle-label-open { display: none; }
.wl-project-card-details[open] .wl-toggle-label { display: none; }
.wl-project-card-details[open] .wl-toggle-label-open { display: inline; }
```

## Warnings

### WR-01: FrequencyWave uses `var()` inside SVG *presentation attributes* — verified working in Chromium only; historically invisible in Firefox/WebKit

**File:** `src/components/wl/FrequencyWave.astro:50, 58, 66, 74, 82`
**Issue:** All five paths use `stroke="var(--color-wl-accent)"` as a presentation attribute, not a CSS declaration. I empirically verified this resolves in the project's installed Chromium (computed stroke `rgb(14, 112, 120)`), but Firefox and WebKit have historically not supported `var()` substitution in SVG presentation attributes (an invalid attribute value is dropped, `stroke` falls back to `none`, and with `fill="none"` on every path the entire component renders **nothing**). Firefox/WebKit could not be tested here — only the Chromium Playwright binary is installed, and the Playwright config (`projects: [chromium]`) means CI will never catch an engine-specific blank render. The component's own comment ("Inline SVG … so the CSS var resolves at render") conflates inline-SVG CSS inheritance (which works) with presentation-attribute `var()` (which is the risky path).
**Fix:** One-line change per path removes all risk — move the paint into CSS where `var()` is universally supported:

```astro
<path d="..." style="stroke: var(--color-wl-accent);" stroke-width="1.73958" opacity="0.14" fill="none" />
```

or add a single scoped rule `path { stroke: var(--color-wl-accent); }` and drop the attributes.

### WR-02: FAQItem question hover color is dead code — inline `color` beats `hover:text-wl-accent`

**File:** `src/components/wl/FAQItem.astro:84-97`
**Issue:** The question `<span>` carries `class="hover:text-wl-accent"` and an inline style that includes `color: var(--color-wl-ink);`. The inline declaration wins over the hover utility class in every browser, so the hover affordance never fires. Same inline-style-vs-stateful-CSS anti-pattern as CR-01.
**Fix:** Remove `color` from the inline style and use classes for both states (`class="text-wl-ink hover:text-wl-accent"`), or style the span entirely from the scoped `<style>` block:

```css
.wl-faq-item summary span:first-of-type:hover { color: var(--color-wl-accent); }
```

(class-based is cleaner). Note: for keyboard parity consider whether the hover treatment should also apply on `summary:focus-visible`.

### WR-03: Open-state spacing double-counts container padding — FAQItem row→answer gap is 31px, not the specced 12px

**File:** `src/components/wl/FAQItem.astro:76-77, 131-139` (also `src/components/wl/ProjectCard.astro:170, 316-320`)
**Issue:** The extraction assigns `padding: 19px top/bottom` to the FAQ item *container* (node 99:14) and a 12px gap between the question row and the answer (node 99:19). The implementation instead puts the full 19px top **and bottom** padding on the div inside `<summary>`, then adds `margin-top: 12px` on the answer wrapper. Closed state is correct, but open state stacks 19px (summary bottom padding) + 12px (margin) = **31px** between question and answer — 2.6× the spec. ProjectCard has the analogous structure (body div keeps its 29px bottom padding, then the expanded panel adds a 21px spacer → 50px toggle→divider); the ProjectCard extraction wording is more ambiguous about whether Figma measured the 21px inside or outside the body padding, so verify both at the fidelity gate.
**Fix (FAQItem):** Keep the container-padding model of the extraction — move horizontal/top padding to the row, and make the answer wrapper own only the 12px gap:

```css
.wl-faq-item[open] summary > div { padding-bottom: 0; }
```

then set the answer wrapper to `padding: 12px 24px 19px 24px;` and drop the `margin-top`.

### WR-04: projects.json second entry is a copy-paste of the first with a slug/title mismatch

**File:** `src/data/projects.json:17-29`
**Issue:** Entry 2 has `id`/`slug` `"inventory-sync-automation"` and `section: "craft-experiments"`, but its `eyebrow`, `title` ("Chat Safety Pipeline"), `outcome`, `summary`, `tags`, `problem`, `built`, `result`, and `thumbLabel` are byte-identical to entry 1. The Zod schema validates it happily (all strings), so nothing will catch this before Phase 38 renders two identical cards, one under a URL slug (`inventory-sync-automation`) that contradicts its content, in a section it does not belong to.
**Fix:** Replace entry 2's content fields with real inventory-sync copy, or if it is intentionally a placeholder, mark it unambiguously (e.g., `"title": "PLACEHOLDER — Inventory Sync Automation"`) so it cannot ship looking legitimate.

### WR-05: axe test scans a route that has never existed — `/about` a11y coverage is false-green against the dev 404 page

**File:** `tests/accessibility/axe-tests.spec.ts:39-50`
**Issue:** There is no `src/pages/about.astro` and git history shows "About" has only ever been a homepage *component* (`src/components/About.astro`), never a route. `page.goto('/about')` does not fail on a 404 status; axe then analyzes the Astro dev-server 404 page and the test passes, reporting accessibility coverage for a page that does not exist. Commit 97c4361 (this phase) pruned other stale-route tests but left this one.
**Fix:** Delete the `/about` test, or if an About page is planned, gate it correctly now:

```ts
const response = await page.goto('/about');
expect(response?.ok()).toBe(true);
```

### WR-06: ProjectCard renders expanded-panel chrome unconditionally — empty expansion with a stray divider when no story props are passed

**File:** `src/components/wl/ProjectCard.astro:313-326`
**Issue:** `problem`, `built`, and `result` are all optional per the Props interface, but the 21px spacer, the 1px divider, and the 18px spacer render unconditionally inside the expanded panel. A consumer that passes none of the three gets a fully interactive card whose "Read the story" toggle opens ~40px of blank space with a floating divider line. The per-section guards (`{problem && ...}`) show the author considered absence, but the wrapper chrome was not guarded.
**Fix:** Wrap the entire expanded panel:

```astro
{(problem || built || result) && (
  <div style="padding: 0 27px 29px 27px;"> ... </div>
)}
```

Ideally also suppress the toggle row when there is no expandable content (a `<details>` with nothing to disclose is a UX dead end).

### WR-07: Contrast gate tests the wrong foreground for the thumb label — un-composited white instead of white @ 0.85 opacity

**File:** `scripts/check-contrast.mjs:335-342` (renders at `src/components/wl/ProjectCard.astro:154-155`)
**Issue:** ProjectCard renders the thumb label as `#FFFFFF` with `opacity: 0.85`. The gate comment asserts "the WCAG formula uses the full-opacity hex (#FFFFFF)" — that is incorrect methodology: WCAG contrast is measured on the *rendered* color, and an element-level `opacity: 0.85` composites the glyphs over the gradient. Effective foreground over the `#0E7078` stop is ≈ `#DBEAEB`, giving a true ratio of ≈ 4.71:1, not the 5.82:1 the gate reports. It still passes 4.5:1 — but with a 0.21 margin, not 1.32, and the documented (wrong) rule would silently mask a real failure if the opacity or gradient ever changes.
**Fix:** Composite before testing:

```js
// white @ 0.85 over #0E7078 → #DBEAEB (0.85*255 + 0.15*channel, per channel)
['#DBEAEB', '#0E7078', 'thumb label: white@0.85 composited on gradient light stop', 4.5, true],
```

and correct the comment (WCAG measures rendered color; alpha must be flattened).

## Info

### IN-01: 21px regular-weight "+" glyph misclassified as WCAG large text

**File:** `scripts/check-contrast.mjs:330-333`
**Issue:** The comment claims "21px qualifies as large text (WCAG: 18pt+ or 14pt bold+)". 21px ≈ 15.75pt, below the 18pt (24px) regular-weight floor; the glyph is `font-weight: 400`, so the 14pt-bold branch does not apply either. Harmless in practice — the actual ratios (5.82:1 / 5.42:1) clear even the 4.5:1 normal-text bar — but the rationale is wrong and could be copied to a pair where it matters.
**Fix:** Either treat it as a non-text UI indicator under 1.4.11 (3:1, which is the more defensible framing for an `aria-hidden` toggle glyph) or use the 4.5:1 threshold; correct the comment.

### IN-02: Duplicate import statements from `astro/loaders`

**File:** `src/content.config.ts:2-3`
**Issue:** `glob` and `file` are imported in two separate statements from the same module.
**Fix:** `import { glob, file } from 'astro/loaders';`

### IN-03: `<summary>` content-model violations and an ineffective `display: inline` on the heading

**File:** `src/components/wl/ProjectCard.astro:125-308`, `src/components/wl/FAQItem.astro:65-125`
**Issue:** Both summaries wrap `<div>`/`<p>` flow content (spec allows only phrasing content or one heading element inside `<summary>`); the AT-flattening consequence is a documented, accepted decision (D-01/D-02), so this is informational. Separately, the ProjectCard heading's `display: inline` (line 186) is ineffective: the heading is a flex item of the column-flex body div, and flex items are blockified — the comment's rationale ("keeps heading … not forcing full-width block layout") does not hold; the heading is full-width regardless. The declaration is dead weight and the comment is misleading.
**Fix:** Remove `display: inline` or re-document why it exists (it does keep the heading in the outline either way — the outline benefit comes from using a real `hN`, not from the display value).

### IN-04: ProjectCard omits the WebKit marker suppression FAQItem declares necessary

**File:** `src/components/wl/ProjectCard.astro:125-127` vs `src/components/wl/FAQItem.astro:174-178`
**Issue:** FAQItem's own comment states "list-style:none is insufficient in Safari" and adds `summary::-webkit-details-marker { display: none; }`. ProjectCard relies on `list-style: none` plus `display: flex` on the summary only. Modern Safari (≥ 18.4 baseline) removes the marker when summary is not `display: list-item`, so practical impact is low — but the project's own belt-and-suspenders standard is applied inconsistently.
**Fix:** Add the same `summary::-webkit-details-marker { display: none; }` rule to ProjectCard's style block.

### IN-05: dark-mode spec leaks browser contexts on failure; suite runs Chromium only

**File:** `tests/accessibility/dark-mode.spec.ts:16-54`, `playwright.config.ts`
**Issue:** `context.close()` is only reached if the assertions pass; a failing `expect` skips cleanup (Playwright reaps at worker teardown, so this is hygiene, not correctness). More materially: the Playwright config declares a single Chromium project, so engine-specific defects (WR-01 is exactly this class) are structurally invisible to the suite.
**Fix:** Wrap context usage in `try/finally`; consider adding a WebKit project for at least the homepage smoke tests.

### IN-06: `interpolate-size: allow-keywords` and `details::details-content` rules are document-global

**File:** `src/styles/global.css:65-68, 223-231`
**Issue:** `interpolate-size: allow-keywords` on `:root` inherits everywhere and opts *every* element's height/width transitions into animating to/from `auto` in Chromium — including old-site elements and future MDX content. Likewise `details::details-content { height: 0; ... }` styles every `<details>` on the site, including any author-written `<details>` in blog MDX. Both are intentional per the in-file comments (shared ProjectCard/FAQItem definition), but the blast radius is site-wide; a `.wl-`-scoped selector would be safer once old pages are restyled.
**Fix:** No action required now; revisit scoping in the Phase 41 cleanup.

### IN-07: Pre-existing undefined tokens in the old-token zone: `--color-accent-teal` / `--color-accent-teal-hover`

**File:** `src/styles/global.css:464, 559, 564, 572`
**Issue:** `.toc a:hover`, `.prose a`, and `.prose blockquote` reference `--color-accent-teal(-hover)`, which is defined nowhere in the codebase (grep confirms zero definitions). `color: var(--undefined)` is invalid at computed-value time and falls back to inherited color — links in blog prose render without their accent. Pre-existing (v2.x zone, marked "unchanged until Phase 41"), flagged here because deep review traced the token graph.
**Fix:** Define the tokens or migrate these rules in Phase 41.

### IN-08: astro.config minor items — redirect asymmetry and fontaine plugin heuristics

**File:** `astro.config.mjs:73-79, 57-67`
**Issue:** (a) `/contact` redirects to `/#contact` but `/faq` redirects to bare `/`; no `#faq` anchor exists on the index yet, so this is correct today, but when the FAQ section lands (Phase 38) the redirect should gain the anchor. (b) `fontaineFallbackPlugin.transform` matches `id.includes('global.css')` *or* any CSS whose code contains `@fontsource-variable` — the same fallback `@font-face` blocks can be prepended into multiple CSS assets (benign duplication, slight byte cost), and `map: null` discards sourcemap alignment for the shifted lines.
**Fix:** (a) Revisit `/faq` target in Phase 38. (b) Tighten the match to the single entry stylesheet and return a proper sourcemap or use `enforce: 'post'` with an appended (not prepended) block if map fidelity matters.

---

_Reviewed: 2026-07-16T22:57:28Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: deep_

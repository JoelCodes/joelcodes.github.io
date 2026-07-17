---
phase: 37-landing-page
reviewed: 2026-07-17T21:33:02Z
depth: deep
files_reviewed: 9
files_reviewed_list:
  - src/pages/index.astro
  - src/components/layout/SiteHeader.astro
  - src/components/layout/SiteFooter.astro
  - src/components/wl/CTAButton.astro
  - src/components/wl/ServiceCard.astro
  - src/lib/constants.ts
  - src/styles/global.css
  - scripts/check-contrast.mjs
  - tests/accessibility/landing.spec.ts
findings:
  critical: 1
  warning: 6
  info: 6
  total: 13
status: issues_found
---

# Phase 37: Code Review Report

**Reviewed:** 2026-07-17T21:33:02Z
**Depth:** deep
**Files Reviewed:** 9
**Status:** issues_found

## Summary

Deep review of the Phase 37 landing page: nine sections in `index.astro`, chrome (SiteHeader/SiteFooter), the CTAButton/ServiceCard primitives, shared constants, the `--wl-*` token system in `global.css`, the contrast gate script, and the durable axe spec. Cross-file analysis covered the scroll-spy DOM contract (SiteHeader ↔ `#services`/`#about`), token custom-property consumers, the BaseLayout mounting chain, and the imported wl primitives (Eyebrow, Step, FrequencyWave).

The scroll-spy contract is sound: `ANCHORS = ['services', 'about']` matches the section ids in `index.astro`, `section[id] { scroll-margin-top: 64px }` matches the 64px header, the observer is guarded and DOM-ready-safe, and Astro's scoped `<style>` correctly matches the runtime-set `aria-current` attributes because the links carry the component scope.

However, there is one critical defect: **dark-mode backgrounds on five landing sections can never render**, because the light background is set via inline `style` while the dark override is a `dark:[background:...]` class — inline styles beat any class in the CSS cascade (a rule the codebase itself documents at `index.astro:678-679` and applies correctly to the portrait placeholder). In dark mode the text tokens flip to light values on top of light gradients, producing near-1:1 contrast. The dark-mode axe test cannot catch this because axe reports color-contrast on gradient backgrounds as "incomplete," not as violations. Additional warnings cover a breakpoint mis-mapping that renders the 1920px gutter spec at 1280px+, a fixed-height hero with `overflow: hidden` (reflow/zoom risk), hardcoded footer emails bypassing `CONTACT_EMAIL`, and list semantics stripped by `list-style: none`.

## Critical Issues

### CR-01: Dark-mode backgrounds never apply on five sections — inline `style` background beats the `dark:` class override

**File:** `src/pages/index.astro:39-49` (Hero), `:207-215` (Services), `:430-437` (Automations), `:725-732` (Agencies), `:796-803` (Final CTA)
**Issue:** These sections set the light background inside the inline `style` attribute (e.g. Hero: `'background: linear-gradient(to bottom, #E6F1F1, #D2E7E7);'`) and the dark background via a class (`dark:[background:linear-gradient(to_bottom,#123640,#0C2228)]`). Per the CSS cascade, an inline `style` declaration beats any non-`!important` stylesheet rule, including Tailwind arbitrary-property utilities (Tailwind v4 here emits no `!important`; there is no `important` config). Result: in dark mode, the dark gradients **never render** — the light gradients persist while every flippable token consumed inside these sections flips to its dark (light-colored) value: `--color-wl-ink` → `#EAF6F3`, `--color-wl-sub` → `#A9C9C7`, `--color-wl-accent` → `#4FB3B8`. That is roughly 1.1:1 contrast — the Hero h1, lead, Services heading, Automations flow copy, and Final CTA copy are unreadable in dark mode. The codebase explicitly documents this exact trap at `index.astro:678-679` ("inline style beats class specificity — Rule 1 pattern") and applies the correct class-based pattern to the portrait placeholder (`:690-691`) — the five sections violate the project's own Rule 1. The Agencies section (`:730-732`) is visually benign (both `#12333B` and `#16343C` are dark, and its text colors are non-flippable literals) but its `dark:[background:#16343C]` override is equally dead code.

Note: the passing dark-mode Playwright test does not disprove this — see WR-05: axe classifies color-contrast checks over gradient backgrounds as *incomplete*, not violations, so `expect(results.violations).toEqual([])` passes silently.

**Fix:** Move the light background out of `style` and into a class utility on each affected section, exactly like the portrait placeholder:
```astro
<section
  id="services"
  style="padding-top: 112px; padding-bottom: 112px;"
  class="px-[24px] sm:px-[32px] lg:px-[160px] xl:px-[400px]
         [background:linear-gradient(to_bottom,#EFF7F6,#E6F1F1)]
         dark:[background:linear-gradient(to_bottom,#10303A,#0E2B33)]"
>
```
Apply the same transformation to Hero, Automations, Agencies (`[background:#12333B] dark:[background:#16343C]`), and Final CTA. Verify by loading `/` with `.dark` on `<html>` and inspecting computed `background-image` on each section.

## Warnings

### WR-01: `xl:px-[400px]` applies the 1920px gutter spec from 1280px — canonical 1440 layout squeezed to a 640px column

**File:** `src/pages/index.astro:58, 127, 215, 350, 437, 550, 633, 732, 803`
**Issue:** The section comments state the Figma spec: "px-[160px] @1440, px-[400px] @1920" (`index.astro:36`). But Tailwind's `xl` breakpoint is **1280px**, so `xl:px-[400px]` activates from 1280px up. Consequences at real desktop widths: at 1440px (the canonical design width) the content column is `1440 − 800 = 640px` instead of the intended `1120px` (`max-width: 1120px` inner wrappers are unreachable below 1920); at 1280px it is 480px — a 76px hero h1 and 50px h2s wrapped into a sliver with 400px of empty gutter on each side. The 1120px layout the design specifies for 1440 never renders anywhere between 1024 and 1919px. (The same 9× repeated gutter class string is also a duplication smell — one shared wrapper or a `wl-gutters` utility would prevent drift.)
**Fix:** Replace `xl:px-[400px]` with a ≥1920 gate, e.g. `min-[1920px]:px-[400px]` (or drop it entirely — `max-width: 1120px; margin: 0 auto` already centers the column at ultra-wide widths). Extract the gutter stack into one utility class to eliminate the 9× duplication.

### WR-02: Hero fixed `height: 840px` + `overflow: hidden` + centered flex clips content on zoom/reflow (WCAG 1.4.4 / 1.4.10 risk)

**File:** `src/pages/index.astro:39-50`
**Issue:** The hero section uses `height: 840px; overflow: hidden; display: flex; align-items: center;`. When the content stack grows taller than 840px — text-only zoom, 320px-wide reflow viewports, user font-size overrides, or future copy edits — a center-aligned flex child overflows *both* edges and `overflow: hidden` clips it top and bottom with no way to scroll it into view. That is a WCAG 1.4.4 (Resize Text) / 1.4.10 (Reflow) failure mode on the page's primary content (h1 + CTAs). `overflow: hidden` itself is required (the FrequencyWave is absolutely positioned at 1670×1044px), but the fixed height is not.
**Fix:**
```astro
style={[... 'min-height: 840px;', /* was height: 840px */ ...]}
```
`min-height` preserves the 840px design frame while letting the section grow when content demands it; the wave stays clipped by `overflow: hidden`.

### WR-03: SiteFooter hardcodes `contact@joelshinness.com` twice, bypassing the `CONTACT_EMAIL` constant this phase introduced

**File:** `src/components/layout/SiteFooter.astro:64, 91`
**Issue:** `constants.ts` documents D-07: "all email CTAs use mailto:${CONTACT_EMAIL}" and exists specifically to replace duplicated inline literals in SiteHeader/SiteFooter. The footer imports `BOOKING_URL` from the constants module but still hardcodes `href="mailto:contact@joelshinness.com"` in two places (footer nav "Email" link and the bottom-row address, which also duplicates the literal as visible link text). If the contact address changes, `index.astro` updates via the constant while the footer silently drifts.
**Fix:**
```astro
import { BOOKING_URL, CONTACT_EMAIL } from '../../lib/constants';
...
<a href={`mailto:${CONTACT_EMAIL}`} ...>Email</a>
...
<a href={`mailto:${CONTACT_EMAIL}`} ...>{CONTACT_EMAIL}</a>
```

### WR-04: `list-style: none` strips list semantics in Safari/VoiceOver — step order is then conveyed nowhere

**File:** `src/pages/index.astro:367-369` (how-it-works `<ol>`), `:159` (who checkmark `<ul>`)
**Issue:** Safari removes list semantics from lists styled with `list-style: none`, so VoiceOver announces the five steps as plain text. The Step component's numeral is `aria-hidden="true"` by design, with the documented justification that "list semantics carry the step order" (Step.astro:20-22, check-contrast.mjs:280-282). When Safari drops the list semantics, that justification collapses: VoiceOver users get neither the numerals nor the list position — the 5-step sequence loses its ordering entirely. The section-2 `<ul>` has the same pattern with lower stakes (no order dependency, but item count/context is lost).
**Fix:** Add `role="list"` to both lists to restore semantics under `list-style: none`:
```astro
<ol role="list" class="grid grid-cols-1 lg:grid-cols-5" style="gap: 26px; list-style: none; ...">
```
Note `role="list"` restores list-ness but not ordered-ness announcements in all pairings; if step order matters to AT users (it does), consider un-hiding the numeral (remove `aria-hidden`) or adding visually-hidden "Step N" text.

### WR-05: Dark-mode axe test cannot detect gradient-background contrast failures — false confidence against exactly the CR-01 bug class

**File:** `tests/accessibility/landing.spec.ts:36, 54`
**Issue:** Five of nine landing sections have gradient backgrounds. axe-core cannot resolve a text element's effective background over a gradient, so it files those color-contrast checks under `results.incomplete`, not `results.violations`. The assertions only check `results.violations`, so the "dark mode … no accessibility violations" test passes even while dark mode renders light-on-light text (CR-01). As a durable spec intended to hold the WCAG 2.2 AA line for this page, it is structurally blind to the page's dominant surface type.
**Fix:** After the axe assertions, add targeted computed-style assertions for dark mode, e.g.:
```ts
const heroBg = await page.locator('section').first()
  .evaluate((el) => getComputedStyle(el).backgroundImage);
expect(heroBg).toContain('rgb(18, 54, 64)'); // #123640 dark gradient stop
```
and/or fail the test when `results.incomplete` contains `color-contrast` entries for landing-section text so gaps surface for manual verification.

### WR-06: Header (and footer) jump to `sm:px-[160px]` at 640px — header content overflows between 640px and ~900px

**File:** `src/components/layout/SiteHeader.astro:15`, `src/components/layout/SiteFooter.astro:11`
**Issue:** The 160px gutter is the 1440px Figma spec, but `sm:` applies it from 640px. At 768px the header's content box is `768 − 320 = 448px`, while its contents need roughly 580-600px (brand lockup ~240px: mark 30 + gap + 18.4px wordmark; desktop nav ~340px+: three 15px links + 26px gaps + "Book a call" CTA). The `justify-between` flex row cannot fit — links/CTA text wrap or overflow the 64px-tall header at common tablet widths. At exactly 640px it is worse (320px content box) with the full desktop nav visible (`hidden sm:flex`). The landing sections themselves use a graduated `sm:px-[32px] lg:px-[160px]` stack — the chrome skips the intermediate step. The footer shares the same `sm:px-[160px]` but degrades more gracefully (`flex-wrap` nav), just excessively squeezed.
**Fix:** Mirror the page-section gutter progression in the chrome:
```astro
<div class="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[160px] h-full flex items-center justify-between">
```
(same change in SiteFooter). Verify the header at 640/768/1024px.

## Info

### IN-01: Comment falsely claims the Proof credentials color fails WCAG AA on paper

**File:** `src/pages/index.astro:580-583`
**Issue:** The comment states "#4C6A70 on #F6FBFA = 2.82:1 (fails AA)" and "At 15px/regular this is a WCAG AA failure on paper … flagged to Joel at the fidelity gate." That is wrong: #4C6A70 on #F6FBFA is ≈5.58:1 — a clean AA pass, consistent with `global.css:94` ("AA on light paper") and the passing `BREADCRUMB / L_PAPER` text-use row in check-contrast.mjs (the gate would exit 1 otherwise). The 2.82:1 figure is #4C6A70 on *dark* paper #0C2228 (which is why the dark flip to #8FB4B2 exists). As written it escalates a non-existent compliance failure to the fidelity gate.
**Fix:** Correct the comment to "#4C6A70 on #F6FBFA = 5.58:1 (AA pass); 2.82:1 applies only on dark paper, hence the `--wl-proof-companies-color` dark flip."

### IN-02: check-contrast.mjs gradient-stop comments have lighter/darker reasoning inverted (correct pairs chosen by luck of symmetry)

**File:** `scripts/check-contrast.mjs:365-366, 373-375`
**Issue:** "Worst stop for text contrast is the lightest (#D2E7E7 …)" — #D2E7E7 is the *darkest* stop of the hero gradient; for dark text on a light surface the darkest stop is the worst case. Likewise "#DCEDEC is lighter than #E6F1F1 … so it is the worst case" — #DCEDEC (0xDC < 0xE6) is *darker*. The tested pairs are the correct worst-case stops, but the stated rationale is backwards; a future maintainer applying that reasoning to a new gradient (or to light-on-dark text, where the rule flips) would pick the wrong stop.
**Fix:** Reword: "worst case for dark text on a light gradient is the darkest stop (#D2E7E7 / #DCEDEC); for light text on a dark gradient it is the lightest stop."

### IN-03: Contrast matrix has no rows for the Agencies dark-frame surface #16343C

**File:** `scripts/check-contrast.mjs:349-384`; `src/pages/index.astro:357`
**Issue:** The Phase 37 coverage comment claims "on-ink Agencies strip (ONDARK_SURFACE #12333B): covered ✓", but in dark mode the Agencies background is `#16343C` (once CR-01 is fixed), and no pair tests that surface. Independently computed: `#5AA9A5` eyebrow = 4.81:1, `#A9C9C7` body = 7.46:1, `#4FB3B8` focus ring = 5.32:1 on #16343C — all pass, but the eyebrow's 0.31 margin over 4.5 is thin enough that the gate should own it.
**Fix:** Add `#16343C` rows for `ONDARK_EYEBROW`, `#A9C9C7`, `ONDARK_LABEL`, and `ONDARK_FOCUS` to `PAIRS`.

### IN-04: CTAButton does not default `rel="noopener"` when `target="_blank"` — safety-by-convention only

**File:** `src/components/wl/CTAButton.astro:46`
**Issue:** The component passes `target`/`rel` straight through; every call site must remember to pair `rel="noopener"` with `target="_blank"`. Comments across the codebase claim "ASVS L1: every _blank link carries rel=noopener" — currently true at all three call sites, but unenforced for future consumers. (Modern browsers imply `noopener` on `_blank`, so exposure is limited to legacy engines; low severity.)
**Fix:**
```ts
const relValue = rel ?? (target === '_blank' ? 'noopener' : undefined);
```
and render `rel={relValue}` in all three branches.

### IN-05: Dark-mode test leaks context on assertion failure

**File:** `tests/accessibility/landing.spec.ts:39-56`
**Issue:** `await context.close()` runs after the assertions; if `toHaveClass(/dark/)` or the axe expectation throws, the manually created context is never closed in-test (Playwright's worker teardown eventually reaps it, but it lingers across retries).
**Fix:** Wrap the body in `try { … } finally { await context.close(); }`.

### IN-06: "→" glyph embedded in Agencies CTA link text is announced by screen readers

**File:** `src/pages/index.astro:780`
**Issue:** `Let's talk overflow →` puts the arrow inside the accessible name; VoiceOver/NVDA announce it ("rightwards arrow" or similar), adding noise to the link label. Every other directional glyph in this phase is `aria-hidden` SVG.
**Fix:** `Let's talk overflow <span aria-hidden="true">→</span>` (Astro preserves the span inside the CTAButton slot).

---

_Reviewed: 2026-07-17T21:33:02Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: deep_

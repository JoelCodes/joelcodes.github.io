---
phase: 37-landing-page
fixed_at: 2026-07-17T22:30:00Z
review_path: .planning/phases/37-landing-page/37-REVIEW.md
iteration: 1
findings_in_scope: 7
fixed: 7
skipped: 0
status: all_fixed
---

# Phase 37: Code Review Fix Report

**Fixed at:** 2026-07-17T22:30:00Z
**Source review:** `.planning/phases/37-landing-page/37-REVIEW.md`
**Iteration:** 1

**Summary:**
- Findings in scope: 7 (CR-01 + WR-01 through WR-06)
- Fixed: 7
- Skipped: 0

## Fixed Issues

### CR-01: Dark-mode backgrounds never apply on five sections

**Files modified:** `src/pages/index.astro`
**Commit:** `bd57e47`
**Applied fix:** Moved `background` declarations out of inline `style` attributes
and into Tailwind arbitrary-property class utilities (`[background:...]`) on the
Hero, Services (Make), Automations, About, Agencies, and Final CTA sections.
The `dark:[background:...]` class overrides now win in the CSS cascade because
no inline style competes with them. Also added the Who, How, and Proof sections
to the WR-01 fix (same commit — see below) since they shared the `xl:px-[400px]`
gutter problem.

---

### WR-01: `xl:px-[400px]` applies 1920px gutter spec from 1280px

**Files modified:** `src/pages/index.astro`
**Commit:** `bd57e47`
**Applied fix:** Replaced `xl:px-[400px]` with `min-[1920px]:px-[400px]` on all
nine section elements and the Hero content div. The 400px gutter now activates
only at 1920px+, so the canonical 1440px layout correctly renders a 1120px content
column (160px gutters via `lg:px-[160px]`) instead of a 640px sliver.

---

### WR-02: Hero fixed `height: 840px` clips content on zoom/reflow

**Files modified:** `src/pages/index.astro`
**Commit:** `bd57e47`
**Applied fix:** Changed `height: 840px` to `min-height: 840px` in the Hero
section's inline style. The section now grows when content exceeds 840px (text
zoom, reflow viewports, future copy), eliminating the WCAG 1.4.4/1.4.10
clip risk. `overflow: hidden` remains for the FrequencyWave background clip.

---

### WR-03: SiteFooter hardcodes `contact@joelshinness.com` twice

**Files modified:** `src/components/layout/SiteFooter.astro`
**Commit:** `ed054ba`
**Applied fix:** Added `CONTACT_EMAIL` to the constants import, then replaced
both hardcoded `mailto:contact@joelshinness.com` literals — the footer nav
"Email" link and the bottom-row address link (href + visible text) — with
template literal `{`mailto:${CONTACT_EMAIL}`}` and `{CONTACT_EMAIL}`.

---

### WR-04: `list-style: none` strips list semantics in Safari/VoiceOver

**Files modified:** `src/pages/index.astro`
**Commit:** `bd57e47`
**Applied fix:** Added `role="list"` to the how-it-works `<ol>` (five steps)
and the who-section checkmark `<ul>` (four items). This restores Safari/
VoiceOver list semantics that `list-style: none` removes, so screen reader
users hear item count and list context.

---

### WR-05: Dark-mode axe test cannot detect gradient-background contrast failures

**Files modified:** `tests/accessibility/landing.spec.ts`
**Commit:** `0b759cf`
**Applied fix:** Added `getComputedStyle` assertions after the axe check in the
dark-mode test that verify the Hero and Final CTA sections render their dark
gradient start stop (`#123640`, rgb(18, 54, 64)) in dark mode. These will fail
immediately if an inline style re-introduces the CR-01 bug class. Also wrapped
the entire test body in `try/finally { await context.close(); }` to fix the
IN-05 context leak on assertion failure.
**Note:** Commit status requires human verification — the regex pattern for
computed background-image may need tuning against the actual browser output
format (Chrome renders `rgb(18, 54, 64)` with spaces; the regex matches both
space-padded and compact forms).

---

### WR-06: Header/footer jump to `sm:px-[160px]` at 640px

**Files modified:** `src/components/layout/SiteHeader.astro`, `src/components/layout/SiteFooter.astro`
**Commit:** `13f4d20`
**Applied fix:** Replaced `sm:px-[160px]` with `sm:px-8 lg:px-[160px]` in both
the SiteHeader inner div and the SiteFooter inner div. The 160px gutter now steps
in at 1024px (lg) instead of 640px (sm), matching the page-section progression
(`sm:px-[32px] lg:px-[160px]`). At 768px the header content box grows from
448px to ~608px, giving the brand lockup + nav links + CTA room to fit without
wrapping or overflowing the 64px header row.

---

## Skipped Issues

None — all Critical and Warning findings were successfully fixed.

---

_Fixed: 2026-07-17T22:30:00Z_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_

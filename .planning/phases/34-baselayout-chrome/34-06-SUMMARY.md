---
phase: 34-baselayout-chrome
plan: "06"
subsystem: ui
tags: [astro, tailwind, svg, dark-mode, accessibility, playwright, fidelity-gate]

# Dependency graph
requires:
  - phase: 34-05
    provides: SiteHeader + SiteFooter Wavelength chrome components live site-wide

provides:
  - Phase 34 fidelity gate: Figma-vs-rendered comparison approved by Joel
  - circle-badge WaveMark variant for dark surfaces (badge prop on WaveMark.astro)
  - Corrected footer bottom-row order matching Figma 42:74 (copyright left, email/GitHub right)
  - 34-REVIEW.md with gate verdict APPROVED and all deviation documentation

affects:
  - phase-35-ui-primitives (inherits WaveMark badge prop; SiteHeader/SiteFooter are final)
  - phase-41-quality-gate (fidelity gate discipline established here; final gate in Phase 41)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "WaveMark badge prop: CSS-only dark-surface treatment via Tailwind dark: visibility toggle, zero client JS"
    - "Fidelity gate: Playwright screenshot capture per phase, compared to Figma frames, documented in REVIEW.md"

key-files:
  created:
    - .planning/phases/34-baselayout-chrome/34-06-SUMMARY.md
  modified:
    - src/components/WaveMark.astro (badge prop added)
    - src/components/layout/SiteHeader.astro (dark:hidden / hidden dark:block mark toggle)
    - src/components/layout/SiteFooter.astro (badge mark + bottom-row swap)
    - .planning/phases/34-baselayout-chrome/34-REVIEW.md (gate approved, GC-01/02/03 resolved)
    - .planning/phases/34-baselayout-chrome/screenshots/ (all 5 screenshots re-captured)

key-decisions:
  - "WaveMark badge CSS-only: render both marks (bare + badge) and toggle with dark:hidden / hidden dark:block — no JS, no conditional server render"
  - "GC-03 footer height delta (~249px vs 261px) accepted as-is — browser/Figma line-height delta, no padding adjustment"
  - "Footer always uses badge mark (always-dark surface); header uses bare mark in light, badge in dark"

patterns-established:
  - "badge prop pattern: SVG component accepts a boolean prop to switch between presentations; caller decides context"
  - "CSS dark: toggle: two sibling elements with dark:hidden / hidden dark:block for zero-JS theme-conditional rendering"

requirements-completed: [CHROME-02, CHROME-03, CHROME-04]

# Metrics
duration: ~25min
completed: 2026-07-15
---

# Phase 34 Plan 06: Fidelity Gate Summary

**Wavelength chrome fidelity gate approved: circle-badge WaveMark added for dark surfaces, footer bottom-row corrected to match Figma 42:74, gate documented and closed.**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-07-15T19:40:00Z
- **Completed:** 2026-07-15T19:55:00Z
- **Tasks:** 2 (Task 1 previously committed; Task 2 checkpoint resolved and fixes applied)
- **Files modified:** 5 source files + screenshot directory

## Accomplishments

- Fidelity gate re-entered after Joel's "Approve with selected fixes" decision
- Fix GC-01/GC-02: extended `WaveMark.astro` with a `badge` boolean prop rendering a light `#EAF6F3` circular disc with `#12333B` ink wave strokes; applied in dark header (CSS `dark:` toggle) and always-dark footer — zero client JS
- Fix: footer bottom row swapped to copyright LEFT, `contact@joelshinness.com · GitHub` RIGHT — matches Figma node 42:74
- Build green, a11y suite 7/7 (no contrast violations from new badge)
- All 5 screenshots re-captured and visually verified
- 34-REVIEW.md updated with gate verdict APPROVED, all GC items resolved/accepted, approved deviations documented
- Phase 34 fidelity gate closed

## Task Commits

1. **Task 1: Capture screenshots + assemble fidelity record** - `3096138` (docs)
2. **Fix GC-01/GC-02 + footer bottom-row** - `71b9929` (fix)

**Plan metadata:** _(this commit — docs(34-06): complete fidelity gate plan)_

## Files Created/Modified

- `src/components/WaveMark.astro` — Added `badge` boolean prop; renders circle-badge SVG on dark surfaces
- `src/components/layout/SiteHeader.astro` — Dual-mark pattern: bare strokes `dark:hidden`, badge `hidden dark:block`
- `src/components/layout/SiteFooter.astro` — Badge mark always active; bottom-row order corrected
- `.planning/phases/34-baselayout-chrome/34-REVIEW.md` — Gate verdict APPROVED; GC-01/02/03 resolved
- `.planning/phases/34-baselayout-chrome/screenshots/*.png` — All 5 screenshots re-captured post-fix

## Decisions Made

- **CSS toggle over server conditional:** Both mark presentations (`bare` + `badge`) rendered in HTML; CSS `dark:hidden` / `hidden dark:block` selects the visible one. Avoids any client JS while keeping SSR output deterministic. Slight HTML cost (extra SVG in DOM) is negligible.
- **GC-03 height delta accepted:** ~12px footer height difference (249px rendered vs. 261px Figma) is browser/Figma font-engine variance in Hanken Grotesk at 14px. Padding is already correct per Figma extraction. No code change.
- **Single commit for both fixes:** Circle-badge and bottom-row swap were staged together as they both touch `SiteFooter.astro`; atomic boundary is the fidelity gate fix set.

## Deviations from Plan

The plan specified Task 1 (capture + assemble) then a checkpoint. The continuation picks up after the checkpoint with Joel's gate decisions. All deviations from the original Figma design are documented in 34-REVIEW.md as approved deviations.

### Auto-fixed Issues

None — both fixes were explicitly requested by Joel at the checkpoint.

**Total deviations:** 0 auto-fixes. Both code changes were gate-directed by Joel.

## Issues Encountered

None. Build green, 7/7 a11y on first try after fixes.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Phase 34 is complete. All six plans executed, fidelity gate approved.
- `WaveMark.astro` `badge` prop is available for Phase 35 UI primitives if any component needs it.
- SiteHeader and SiteFooter are finalized — Phase 35 starts from a stable chrome baseline.
- Pre-approved deviations D-02 (mark-only mobile wordmark) and D-05 (no toggle) carry forward for the record; they don't require re-approval in future phases.

---
*Phase: 34-baselayout-chrome*
*Completed: 2026-07-15*

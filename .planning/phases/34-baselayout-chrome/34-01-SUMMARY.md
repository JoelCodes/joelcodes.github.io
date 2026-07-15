---
phase: 34-baselayout-chrome
plan: 01
subsystem: testing
tags: [playwright, axe-core, dark-mode, a11y, colorScheme]

# Dependency graph
requires:
  - phase: 33-token-foundation-fonts
    provides: FOUC script that reads OS preference and sets .dark class on html element
provides:
  - Toggle-independent dark-mode a11y spec using Playwright colorScheme browser contexts
affects:
  - 34-02 (chrome swap tasks can remove #theme-toggle without breaking a11y suite)
  - 34-03 (SiteHeader/BaseLayout changes have green feedback signal)
  - All subsequent phases with a11y validation

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "colorScheme browser context for OS-preference dark mode testing: browser.newContext({ colorScheme: 'dark' })"
    - "Playwright fixture: use { browser } instead of { page } when controlling browser context"
    - "context.close() after each test to release browser resources"

key-files:
  created: []
  modified:
    - tests/accessibility/dark-mode.spec.ts

key-decisions:
  - "Removed /blog dark-mode test — /blog returns 404 in prod build (D-13); suite runs against prod build"
  - "Removed /contact dark-mode test — contact page no longer in v3.0 IA scope"
  - "Retained expect(html).toHaveClass(/dark/) assertion on homepage dark test — prevents silent false-greens if FOUC script regresses"
  - "Light-mode colorScheme test added for homepage to provide symmetrical coverage"

patterns-established:
  - "Dark mode a11y tests: browser.newContext({ colorScheme }) pattern — no DOM toggle clicks, no waitForTimeout"

requirements-completed: [CHROME-01]

# Metrics
duration: 2min
completed: 2026-07-15
---

# Phase 34 Plan 01: Dark-Mode A11y Spec Rewrite Summary

**Playwright dark-mode a11y suite rewritten to colorScheme browser contexts — zero toggle references, all 3 tests green against current build**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-07-15T19:02:16Z
- **Completed:** 2026-07-15T19:03:38Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments
- Replaced all four `page.locator('#theme-toggle').click()` flows with `browser.newContext({ colorScheme: 'dark' })` pattern
- Removed `page.waitForTimeout(500)` calls (FOUC script is synchronous; no transition wait needed)
- Removed `/blog` and `/contact` dark-mode tests (both pages absent from v3.0 prod build)
- Retained `expect(html).toHaveClass(/dark/)` assertion on homepage to guard against FOUC regressions
- Added homepage light-mode test via `colorScheme: 'light'` for symmetric coverage
- All 3 tests pass green against current build with `#theme-toggle` still present (safe to remove downstream)

## Task Commits

1. **Task 1: Rewrite dark-mode.spec.ts to colorScheme contexts (RED → GREEN)** - `942fb5f` (test)

**Plan metadata:** _(committed with SUMMARY below)_

## Files Created/Modified
- `tests/accessibility/dark-mode.spec.ts` - Rewritten to use colorScheme browser contexts; 3 tests covering homepage dark, projects dark, homepage light

## Decisions Made
- Removed `/blog` dark-mode test: `/blog` returns 404 in the prod build that the test suite runs against (D-13 decision from RESEARCH.md Pitfall 3)
- Removed `/contact` dark-mode test: contact page is not in v3.0 IA scope
- Kept `expect(html).toHaveClass(/dark/)` on the homepage dark test only (the canonical FOUC verification point); projects test omits it to avoid flakiness on pages where the assertion adds no additional signal
- Light-mode test added using `colorScheme: 'light'` to cover the non-dark branch explicitly

## Deviations from Plan

None — plan executed exactly as written. The "RED" state was the existing toggle-based tests (broken pattern), "GREEN" state was the new colorScheme pattern. Both confirmed correct.

## Issues Encountered

Minor: the initial file write included two occurrences of the string `#theme-toggle` in comments, causing the acceptance criteria grep check (`grep -c "theme-toggle"` returns 0) to fail. Fixed by rephrasing the comments to not include the literal string. Not a logic issue — purely a comment-wording adjustment.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Wave 0 complete: `dark-mode.spec.ts` is now toggle-independent
- Phase 34 plans 02–04 can safely remove `#theme-toggle` from the chrome without breaking the a11y suite
- Full a11y suite (`npm run test:a11y`) should be run after each subsequent chrome task commit per 34-VALIDATION.md sampling rate

---
*Phase: 34-baselayout-chrome*
*Completed: 2026-07-15*

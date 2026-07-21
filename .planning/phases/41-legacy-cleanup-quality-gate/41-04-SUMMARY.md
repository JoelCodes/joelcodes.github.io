---
phase: 41-legacy-cleanup-quality-gate
plan: 04
subsystem: testing
tags: [axe-core, playwright, accessibility, lighthouse, prod-guard, astro]

# Dependency graph
requires:
  - phase: 41-01
    provides: legacy component + page deletions; orphan sweep
  - phase: 41-02
    provides: global.css purged to --wl-* only
  - phase: 39-utility-pages-dev-hidden-pages
    provides: services/web + areas/abbotsford pages built (as Strategy A noindex-only)
provides:
  - PROD redirect guard on services/web (D-06)
  - PROD redirect guard on areas/abbotsford (D-06)
  - Lighthouse CI URL set scoped to exactly / and /404 (QUAL-02)
  - axe-core QUAL-01 gate: 20/20 tests pass, zero violations, all pages both themes
affects: [CI/CD Lighthouse runs, any future page additions to Lighthouse URL set]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "PROD redirect guard pattern: imports first, then `if (import.meta.env.PROD) return Astro.redirect('/')` — matches showcase/blog convention (D-06)"
    - "Lighthouse URL set restricted to real prod pages only — guarded pages excluded from CI scoring"

key-files:
  created: []
  modified:
    - src/pages/services/web.astro
    - src/pages/areas/abbotsford.astro
    - lighthouserc.json
    - lighthouserc-mobile.json

key-decisions:
  - "D-06 guard placement: imports must precede the if-return statement (esbuild ESM constraint); placing return before imports causes 'Unterminated string literal' build error — fixed inline"
  - "QUAL-01 gate: 20 tests, zero violations; one WR-05 incomplete gradient-bg contrast check logged as warning (not a violation, expected per landing.spec.ts design)"
  - "Lighthouse URL set: / and /404 only — all other routes (showcase, blog, services/*, areas/*) redirect in prod so cannot be Lighthouse targets"

patterns-established:
  - "PROD guard placement pattern: after all import statements, not before — ESM module semantics"

requirements-completed: [QUAL-01, QUAL-02]

# Metrics
duration: 12min
completed: 2026-07-20
---

# Phase 41 Plan 04: Dev-only PROD Guards + axe-Core Quality Gate Summary

**PROD redirect guards on services/web + areas/abbotsford; Lighthouse URL set scoped to / and /404; axe-core 20/20 pass, zero violations across all pages and both themes (QUAL-01 green, QUAL-02 config landed)**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-07-20T23:55:00Z
- **Completed:** 2026-07-20T23:57:00Z
- **Tasks:** 2
- **Files modified:** 5 (4 source + playwright-report)

## Accomplishments
- Added `if (import.meta.env.PROD) return Astro.redirect('/')` to both `src/pages/services/web.astro` and `src/pages/areas/abbotsford.astro` — prod builds now emit redirect stubs, not page content
- Scoped `lighthouserc.json` + `lighthouserc-mobile.json` URL arrays to exactly `http://localhost/` and `http://localhost/404` — stale `/blog/im-pivoting/` entry removed (QUAL-02 config complete)
- axe-core QUAL-01 gate: all 20 Playwright tests passed, zero WCAG 2.2 AA violations across landing, showcase, blog index+post, 404, services/web, and areas/abbotsford — light and dark themes

## Task Commits

1. **Task 1: Add PROD guard + scope Lighthouse URLs** - `c9b20c8` (feat)
2. **Task 2: Run axe-core QUAL-01 gate** - `7b24d04` (test)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `src/pages/services/web.astro` — added D-06 PROD redirect guard after imports
- `src/pages/areas/abbotsford.astro` — added D-06 PROD redirect guard after imports
- `lighthouserc.json` — URL set replaced: `/blog/im-pivoting/` → `/404`; _comment updated
- `lighthouserc-mobile.json` — URL set replaced: `/blog/im-pivoting/` → `/404`; _comment updated
- `playwright-report/index.html` — updated with 20-test pass run

## Decisions Made
- Guard placement after imports (not before): esbuild enforces ESM import-hoisting — placing `if (import.meta.env.PROD) return` before `import` statements caused a build-time "Unterminated string literal" error. Fixed by matching showcase.astro's exact pattern (imports → guard → logic).
- WR-05 incomplete gradient contrast: one axe `incomplete` (not `violation`) on gradient backgrounds in landing dark mode. This is by-design per landing.spec.ts §WR-05 — the computed-style assertions guard the real dark-mode surfaces. Not a gate blocker.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Import order: guard placed after imports, not before**
- **Found during:** Task 1 (adding PROD guard to both pages)
- **Issue:** First attempt placed `if (import.meta.env.PROD) return Astro.redirect('/')` before import statements, which esbuild treats as a syntax error ("Unterminated string literal" at line 55)
- **Fix:** Moved guard to after all import statements, matching showcase.astro lines 41-43 exactly
- **Files modified:** `src/pages/services/web.astro`, `src/pages/areas/abbotsford.astro`
- **Verification:** `npm run build` exits 0; `dist/services/web/index.html` and `dist/areas/abbotsford/index.html` contain redirect stubs, not page content
- **Committed in:** `c9b20c8` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug: import order)
**Impact on plan:** Import ordering is an ESM constraint, not a design choice. No scope creep. Both guards fully functional after fix.

## Issues Encountered
None beyond the import-order fix documented above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- QUAL-01 satisfied: axe-core zero violations across all pages, both themes
- QUAL-02 configuration landed: Lighthouse URL set scoped to / and /404; CI will score these on next push to main
- Remaining: QUAL-03 manual visual-fidelity sign-off (Phase 41 Plan 05) — halt-at-checkpoint for Joel's Figma-vs-rendered approval
- All services/areas/showcase/blog pages correctly redirect in prod; only / and /404 ship real content

---
*Phase: 41-legacy-cleanup-quality-gate*
*Completed: 2026-07-20*

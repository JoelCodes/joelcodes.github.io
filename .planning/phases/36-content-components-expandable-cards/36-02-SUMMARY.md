---
phase: 36-content-components-expandable-cards
plan: 02
subsystem: infra
tags: [astro, routing, redirects, accessibility, playwright, axe-core]

# Dependency graph
requires:
  - phase: 36-01
    provides: Phase 36 FIDELITY-GAP extraction; Figma values ready for component build
provides:
  - v1 /projects pages deleted (index.astro, [slug].astro)
  - /portfolio redirect repointed from /projects to /
  - /portfolio/[slug] dynamic redirect removed (Astro static-mode constraint)
  - Stale /projects axe-core tests removed from axe-tests.spec.ts and dark-mode.spec.ts
  - Green build with zero import errors — projects.json v1 has zero consumers
affects:
  - 36-03 (v2 projects.json rewrite can now land safely)
  - 38 (showcase page will reintroduce /portfolio/[slug] redirect)
  - 40 (URL strategy cleanup)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Astro static mode: dynamic redirects (/path/[param]) to fixed URLs not supported — omit or use page-level redirect"

key-files:
  created: []
  modified:
    - astro.config.mjs
    - tests/accessibility/axe-tests.spec.ts
    - tests/accessibility/dark-mode.spec.ts
  deleted:
    - src/pages/projects/index.astro
    - src/pages/projects/[slug].astro

key-decisions:
  - "Removed /portfolio/[slug] redirect entirely rather than mapping to fixed / — Astro static mode cannot generate static pages for a dynamic redirect targeting a non-parameterized URL (build error: GetStaticPathsRequired)"
  - "/portfolio/anything will 404 until Phase 38 ships /showcase with proper slug routing"

patterns-established:
  - "Astro dynamic redirect constraint: /path/[param] redirects must target /dest/[param] (same param), not a fixed URL"

requirements-completed: [CONT-01]

# Metrics
duration: 4min
completed: 2026-07-16
---

# Phase 36 Plan 02: v1 /projects Teardown Summary

**Deleted v1 neobrutalist /projects pages, repointed /portfolio redirect to /, and removed stale axe-core test routes — build is green and projects.json has zero consumers**

## Performance

- **Duration:** 4 min
- **Started:** 2026-07-16T21:58:09Z
- **Completed:** 2026-07-16T22:00:02Z
- **Tasks:** 2
- **Files modified:** 3 (+ 2 deleted)

## Accomplishments
- Deleted `src/pages/projects/index.astro` and `src/pages/projects/[slug].astro` (both v1 neobrutalist, consuming v1 projects.json fields: `category`, `draft`, `technologies`)
- Repointed `/portfolio` redirect from `/projects` to `/` in `astro.config.mjs`
- Removed stale `/projects` test blocks from `axe-tests.spec.ts` and `dark-mode.spec.ts` (Pitfall 6)
- Confirmed `npm run build` exits 0 — 6 pages built, no import errors, projects.json has zero consumers

## Task Commits

Each task was committed atomically:

1. **Task 1: Delete v1 /projects pages and repoint /portfolio redirects** - `933e2f7` (chore)
2. **Task 2: Remove stale /projects a11y tests and confirm green build** - `97c4361` (chore)

## Files Created/Modified
- `astro.config.mjs` - `/portfolio` now redirects to `/`; `/portfolio/[slug]` entry removed
- `tests/accessibility/axe-tests.spec.ts` - `/projects` test block removed
- `tests/accessibility/dark-mode.spec.ts` - `/projects` dark-mode test block removed
- `src/pages/projects/index.astro` - DELETED (v1 neobrutalist listing)
- `src/pages/projects/[slug].astro` - DELETED (v1 case study detail)
- `src/pages/projects/` - DELETED (empty directory)

## Decisions Made
- **Remove /portfolio/[slug] redirect entirely**: The plan spec'd `'/portfolio/[slug]': '/'` but Astro 5 static mode cannot generate a static redirect for a dynamic segment pointing to a fixed URL — it raises `GetStaticPathsRequired` at build time. Removing the entry is correct because (a) `/portfolio` already handles the index redirect, (b) the plan's intent is just a holding state until Phase 38 adds `/showcase`, and (c) no real traffic hits deep portfolio slug URLs currently.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Removed /portfolio/[slug] from redirects (Astro static-mode constraint)**
- **Found during:** Task 2 (green build verification)
- **Issue:** `npm run build` failed with `GetStaticPathsRequired` for `/portfolio/[slug]`. Astro static mode treats redirect entries with `[param]` segments as dynamic pages requiring `getStaticPaths()`. Redirecting a dynamic segment to a fixed URL (not containing the param) is not supported.
- **Fix:** Removed `'/portfolio/[slug]': '/'` from the redirects map in `astro.config.mjs`. Added explanatory comment. `/portfolio/anything` will 404 until Phase 38 restores slug routing via the upcoming `/showcase/[slug]` page.
- **Files modified:** `astro.config.mjs`
- **Verification:** `npm run build` exits 0 after removal; 6 pages built
- **Committed in:** `97c4361` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Fix was necessary to achieve the stated goal (green build). The /portfolio/[slug] redirect was never resolvable in static mode targeting a fixed URL; removing it is the correct approach until Phase 38 provides the showcase route.

## Issues Encountered
- Astro 5 static mode `[slug]` redirect to fixed URL raised `GetStaticPathsRequired` at build — resolved by dropping the dynamic redirect entry (see Deviations above).

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- projects.json has zero consumers — safe for 36-03 to overwrite with v2 schema
- `/portfolio` redirects to `/` (working)
- Build is green
- No blockers for 36-03

---
*Phase: 36-content-components-expandable-cards*
*Completed: 2026-07-16*

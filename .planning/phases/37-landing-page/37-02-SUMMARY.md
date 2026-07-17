---
phase: 37-landing-page
plan: "02"
subsystem: ui
tags: [astro, typescript, constants, scroll-spy, intersection-observer, aria-current, calendly]

# Dependency graph
requires:
  - phase: 37-landing-page/01
    provides: Figma extraction values (FIDELITY-GAP list) for landing sections
  - phase: 35-ui-primitives
    provides: CTAButton component (COMP-01) with Props interface to extend
  - phase: 34-baselayout-chrome
    provides: SiteHeader + SiteFooter chrome files with inline BOOKING_URL TODOs

provides:
  - "src/lib/constants.ts — BOOKING_URL (real Calendly URL) + CONTACT_EMAIL named exports"
  - "CTAButton target/rel pass-through props on all three anchor renders"
  - "SiteHeader: constants import, scroll-spy IntersectionObserver IIFE, aria-current CSS hooks, Showcase build-time current-page marker, new-tab Calendly CTAs"
  - "SiteFooter: constants import replacing inline BOOKING_URL TODO, new-tab Calendly Book-a-call link"

affects:
  - "37-landing-page/03 and later plans — index.astro can now import BOOKING_URL and use target='_blank' on CTAButton"
  - "38-showcase — SiteHeader scroll-spy and aria-current/page already wired for /showcase"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Shared constants module at src/lib/constants.ts — named exports, no default, matches content.config.ts convention"
    - "Vanilla IntersectionObserver IIFE scroll-spy in <script is:inline> (first deliberate client JS of v3.0 — D-01)"
    - "aria-current='location' for scroll-spy active state; aria-current='page' for build-time route match (D-04)"
    - "Astro emits no attribute when prop value is undefined — target/rel pass-through is safe for internal links"

key-files:
  created:
    - src/lib/constants.ts
  modified:
    - src/components/wl/CTAButton.astro
    - src/components/layout/SiteHeader.astro
    - src/components/layout/SiteFooter.astro

key-decisions:
  - "BOOKING_URL = https://calendly.com/discovery-joelshinness/discovery-call (real Calendly URL, D-05 — resolves FUT-01)"
  - "CONTACT_EMAIL = contact@joelshinness.com (D-07)"
  - "All Calendly CTAs use target='_blank' rel='noopener' — D-06 + reverse tabnabbing threat mitigation"
  - "Scroll-spy rootMargin '-64px 0px 0px 0px' to compensate for 64px sticky header"
  - "No active nav state when neither #services nor #about is in view (D-03 — nav only claims what's true)"

patterns-established:
  - "src/lib/ namespace created for shared typed constants — import path from components/layout/ is ../../lib/constants"
  - "IntersectionObserver scroll-spy with element-existence guard — inert on pages without #services/#about"

requirements-completed: [IA-03, IA-04]

# Metrics
duration: 8min
completed: "2026-07-17"
---

# Phase 37 Plan 02: Shared Conversion Infrastructure Summary

**Real Calendly URL centralized in `src/lib/constants.ts`; CTAButton gains `target`/`rel` pass-through; SiteHeader gets vanilla IntersectionObserver scroll-spy with `aria-current` CSS hooks; both chrome files shed inline BOOKING_URL TODOs**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-07-17T23:17:00Z
- **Completed:** 2026-07-17T23:25:00Z
- **Tasks:** 3
- **Files modified:** 4 (1 created, 3 modified)

## Accomplishments

- Created `src/lib/constants.ts` exporting `BOOKING_URL` (real Calendly URL from D-05) and `CONTACT_EMAIL` — both named exports, no default export, matching the `content.config.ts` codebase convention
- Added optional `target` and `rel` props to CTAButton's Props interface and threaded them through all three anchor renders (ghost-on-dark, small, solid/ghost); undefined values emit no attribute, so internal links are unaffected
- Replaced the duplicated `const BOOKING_URL = '/#book'; // TODO` in both SiteHeader and SiteFooter with `import { BOOKING_URL } from '../../lib/constants'`; added `target="_blank" rel="noopener"` to every Book-a-call CTA in both chrome files (D-06 + reverse tabnabbing mitigation)
- Added vanilla IntersectionObserver IIFE scroll-spy to SiteHeader as `<script is:inline>`: observes `#services` and `#about`, sets/removes `aria-current="location"` on matching nav links, uses `rootMargin: '-64px 0px 0px 0px'`, guards on `window.IntersectionObserver` and element existence so it is inert on pages without those anchors
- Added `aria-current={currentPath === '/showcase' ? 'page' : undefined}` on desktop Showcase nav link for build-time current-page marking (D-04)
- Added scoped `<style>` block to SiteHeader styling both `aria-current="location"` and `aria-current="page"` with `color: var(--color-wl-accent)` (D-02)

## Task Commits

1. **Task 1: Create shared constants module and add target/rel to CTAButton** - `f441b07` (feat)
2. **Task 2: Retrofit SiteHeader — constants import, scroll-spy, aria-current, Showcase current-page** - `2786563` (feat)
3. **Task 3: Retrofit SiteFooter — constants import and new-tab Book-a-call** - `f47c193` (feat)

## Files Created/Modified

- `src/lib/constants.ts` — new shared constants module; BOOKING_URL + CONTACT_EMAIL named exports
- `src/components/wl/CTAButton.astro` — Props interface extended with `target?` + `rel?`; all three `<a>` renders updated
- `src/components/layout/SiteHeader.astro` — inline BOOKING_URL removed; constants imported; scroll-spy script + aria-current CSS added; Showcase link + Book-a-call CTAs updated
- `src/components/layout/SiteFooter.astro` — inline BOOKING_URL removed; constants imported; Book-a-call link gains `target="_blank" rel="noopener"`

## Decisions Made

- Constants module placed at `src/lib/constants.ts` (Claude's discretion per CONTEXT) — matches `src/content.config.ts` pattern of named exports only
- Scroll-spy uses `rootMargin: '-64px 0px 0px 0px'` to compensate for the 64px sticky header; the existing `scroll-margin-top: 64px` on `section[id]` in global.css handles scroll-to-position independently
- Used `aria-current="location"` (ARIA spec value for anchor links on the same page) for scroll-spy; `aria-current="page"` for the Showcase link build-time match
- `rel="noopener"` only (not `noreferrer`) on Calendly links per CONTEXT D-06; `noopener noreferrer` kept on the pre-existing GitHub link

## Deviations from Plan

None — plan executed exactly as written. All three tasks matched the plan's action sections and acceptance criteria.

## Issues Encountered

One pre-existing TypeScript error in `src/pages/thank-you.astro` (incorrect `strokeWidth` prop on a Lucide component) — confirmed pre-existing on the base commit via `git stash` test. This error is unrelated to Plan 02 and was not introduced by these changes.

## User Setup Required

None — no external service configuration required. The real Calendly URL is now in source (`src/lib/constants.ts`). No environment variable needed.

## Next Phase Readiness

- `index.astro` (Wave 3) can now `import { BOOKING_URL, CONTACT_EMAIL } from '../lib/constants'` and use `<CTAButton target="_blank" rel="noopener">` for all Calendly CTAs — the two hard prerequisites are in place
- Scroll-spy is live but inert until `#services` and `#about` section anchors exist in the DOM (created in Plan 03/04)
- Both chrome files are clean: `grep -rn "BOOKING_URL = '/#book'" src/` returns zero results

---
*Phase: 37-landing-page*
*Completed: 2026-07-17*

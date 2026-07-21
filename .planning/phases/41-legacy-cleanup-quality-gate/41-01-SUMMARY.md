---
phase: 41-legacy-cleanup-quality-gate
plan: 01
subsystem: ui
tags: [astro, cleanup, legacy, neobrutalist, v1, v2, deletion, CLEAN-01]

# Dependency graph
requires:
  - phase: 40-url-strategy-ia-cleanup
    provides: orphan-before-delete discipline established, Phase 40 D-07 explicitly deferred this sweep here
  - phase: 39-utility-pages-dev-hidden-pages
    provides: wl/* components confirmed as only live component set
provides:
  - "All orphaned v1/v2 neobrutalist demo pages deleted (component-demo, test-isometric, design-system.astro, design-system.json.ts)"
  - "All orphaned root components deleted (About, FAQ, Hero, Process, ProjectCard, BlogCard)"
  - "All orphaned component directories deleted (ui/, illustrations/, design-system/)"
  - "All orphaned layout components deleted (Header, MobileNav, Footer)"
  - "npm run build green with zero import errors post-deletion"
affects: [41-02-CLEAN-02, CLEAN-02 grep now targets only global.css (orphan token refs eliminated)]

# Tech tracking
tech-stack:
  added: []
  patterns: ["orphan-before-delete: grep -rn zero live importers verified for every target before rm"]

key-files:
  created: []
  modified: []

key-decisions:
  - "Delete ALL verified-orphaned neobrutalist legacy per D-01 — roadmap SC list was illustrative, not exhaustive (extended to layout/Header, layout/MobileNav, layout/Footer, root ProjectCard, BlogCard, FAQ, etc.)"
  - "Topological deletion order: pages first (remove importers), then component dirs, then root components, then orphaned layout components"
  - "KEEP confirmed: WaveMark.astro, SEO.astro, layout/SiteHeader.astro, layout/SiteFooter.astro, TableOfContents.astro (token-free stale, out of D-01 scope), all wl/*"

patterns-established:
  - "Orphan-before-delete: always grep -rn zero live importers before any rm; never delete what a shipped surface imports"
  - "Build gate after each deletion wave (not just at end) catches missed import references early"

requirements-completed: [CLEAN-01]

# Metrics
duration: 2min
completed: 2026-07-21
---

# Phase 41 Plan 01: Delete Orphaned v1/v2 Artifacts Summary

**30 files across 3 component directories and 4 pages deleted — every verified-orphaned neobrutalist v1/v2 artifact gone, build green, src/ now contains only wl/*-based live surfaces**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-07-21T06:44:17Z
- **Completed:** 2026-07-21T06:45:40Z
- **Tasks:** 2
- **Files deleted:** 30 (4 pages + 26 components)

## Accomplishments

- Deleted 4 orphaned demo/design-system pages: `component-demo.astro`, `test-isometric.astro`, `design-system.astro`, `design-system.json.ts`
- Deleted 3 orphaned component directories: `src/components/ui/` (5 files), `src/components/illustrations/` (8 SVGs), `src/components/design-system/` (4 files)
- Deleted 6 orphaned root components: About, FAQ, Hero, Process, ProjectCard, BlogCard
- Deleted 3 orphaned layout components: Header, MobileNav, Footer
- `npm run build` exits 0 after each deletion wave — zero import-resolution errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Delete orphaned demo/design-system pages** — `7a07d1a` (chore)
2. **Task 2: Delete orphaned root components + illustration/design-system dirs** — `77cfc0c` (chore)

## Files Created/Modified

All changes were deletions — no files created or modified.

**Deleted pages (4):**
- `src/pages/component-demo.astro`
- `src/pages/test-isometric.astro`
- `src/pages/design-system.astro`
- `src/pages/design-system.json.ts`

**Deleted component directories (3):**
- `src/components/ui/` — Badge, Button, Card, CheckboxGroup, Input
- `src/components/illustrations/` — 8 SVGs (ProcessBuild, ProcessDiscovery, ProcessHandover, ProcessProposal, ProcessPrototype, TechAI, TechAutomations, TechWebApps)
- `src/components/design-system/` — CodeBlock, ComponentShowcase, DesignSystemNav, TokenSwatch

**Deleted root components (6):**
- `src/components/About.astro`
- `src/components/FAQ.astro`
- `src/components/Hero.astro`
- `src/components/Process.astro`
- `src/components/ProjectCard.astro`
- `src/components/BlogCard.astro`

**Deleted orphaned layout components (3):**
- `src/components/layout/Header.astro`
- `src/components/layout/MobileNav.astro`
- `src/components/layout/Footer.astro`

**Confirmed preserved (KEEP list):**
- `src/components/WaveMark.astro`
- `src/components/SEO.astro`
- `src/components/layout/SiteHeader.astro`
- `src/components/layout/SiteFooter.astro`
- All `src/components/wl/*`

## Decisions Made

- D-01 scope confirmed: the research orphan table was authoritative — every file in it was verified orphaned at execution time with `grep -rn` against src/pages, src/layouts, src/components/wl, and src/components/layout/Site* before deletion.
- Topological order enforced: pages deleted first (Task 1), component directories and root components deleted second (Task 2). This avoided any intermediate import-resolution errors.

## Deviations from Plan

None — plan executed exactly as written. Every file listed in the plan was verified orphaned and deleted. No live importer was found for any target.

## Issues Encountered

None. All 30 files were confirmed orphaned, deleted without incident, and the build remained green after each wave.

## Next Phase Readiness

- CLEAN-01 satisfied: every retired neobrutalist surface is gone
- The old-token-bearing files (ui/, illustrations/, design-system/, orphaned root/layout components) are deleted — the CLEAN-02 grep (`var(--color-yellow|shadow-neo-*|iso-*|bg-yellow|bg-turquoise`) will now return results only from `global.css` itself, which is the target of CLEAN-02 (Plan 41-02)
- No blockers for CLEAN-02

---
*Phase: 41-legacy-cleanup-quality-gate*
*Completed: 2026-07-21*

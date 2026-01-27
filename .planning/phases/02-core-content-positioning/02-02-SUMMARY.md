---
phase: 02-core-content-positioning
plan: 02
subsystem: ui
tags: [astro, tailwind, semantic-html, process-timeline, faq]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Design system with Tailwind tokens, typography, dark mode
provides:
  - Process component with 5-step vertical timeline and collaborative framing
  - FAQ component addressing common client concerns
affects: [02-04-homepage-composition]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Vertical timeline with left border accent and numbered circles
    - Collaborative "You/Joel" role display pattern
    - Simple static FAQ without accordion behavior

key-files:
  created:
    - src/components/Process.astro
    - src/components/FAQ.astro
  modified: []

key-decisions:
  - "Vertical timeline with left border (not horizontal) for scannability"
  - "Static FAQ list (no JavaScript accordion) for simplicity"
  - "Teal accent for process timeline (calmer than yellow CTA accent)"
  - "Collaborative You/Joel framing (not vendor 'I' vs 'you')"

patterns-established:
  - "Timeline steps use article elements with semantic structure"
  - "FAQ items use article elements with h3 questions and p answers"
  - "Both components use centered container with max-w constraints"
  - "Dark mode via text-light/dark color tokens throughout"

# Metrics
duration: 2min
completed: 2026-01-27
---

# Phase 2 Plan 02: Process & FAQ Summary

**Vertical timeline with 5-step collaborative workflow and FAQ addressing timeline, scope, and remote work concerns**

## Performance

- **Duration:** 2 min
- **Started:** 2026-01-27T06:48:08Z
- **Completed:** 2026-01-27T06:49:52Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Process component shows collaborative "You/Joel" framing across 5 steps (Discovery, Prototype, Proposal, Build, Handover)
- FAQ component addresses 5 common concerns (timeline, remote work, uncertainty, scope changes, post-handover)
- Both components use semantic HTML structure (section/article) with dark mode support
- Vertical timeline with teal accent border and numbered circles for visual hierarchy

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Process component with 5-step vertical timeline** - `6eedbf1` (feat)
2. **Task 2: Create FAQ component with common questions** - `162230b` (feat)

## Files Created/Modified
- `src/components/Process.astro` - 5-step vertical timeline with collaborative You/Joel role display for each step
- `src/components/FAQ.astro` - 5 common questions (timeline, remote work, uncertainty, scope changes, support) with concise answers

## Decisions Made
- **Teal accent for timeline:** Used teal instead of yellow for calmer, complementary visual against primary yellow CTA
- **No timing estimates:** Per CONTEXT.md guidance "every project is different" - avoided specific timeline numbers
- **Static FAQ list:** No JavaScript accordion behavior - keeps component simple and accessible
- **Vertical timeline only:** Single-column layout on all screen sizes for consistent scannability

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - both components built without issues. Build completed successfully.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Process and FAQ components ready for homepage composition
- Both components integrate with existing design system tokens
- Next: About component (02-03) and homepage composition (02-04)

---
*Phase: 02-core-content-positioning*
*Completed: 2026-01-27*

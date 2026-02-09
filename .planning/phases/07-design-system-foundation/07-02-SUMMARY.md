---
phase: 07-design-system-foundation
plan: 02
subsystem: ui
tags: [typography, density, neobrutalism, design-system, css]

# Dependency graph
requires:
  - phase: 07-01
    provides: Design tokens (OKLCH colors, shadows, fonts, spacing)
provides:
  - Density guidelines documentation (3/10 overall target with per-section targets)
  - Prose typography hierarchy (H1 ALL CAPS, descending weights H2-H4)
affects: [08-primitive-components, 09-section-components, design-consistency]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Density scale (0/10 to 10/10) for visual hierarchy"
    - "One accent per section rule for color usage"
    - "Shadow-implies-importance pattern for interactive elements"
    - "H1 ALL CAPS as maximum typographic impact"

key-files:
  created:
    - .planning/DENSITY.md
  modified:
    - src/styles/global.css

key-decisions:
  - "3/10 overall density target maintains neobrutalist character without overwhelming"
  - "Hero sections at 10/10, content at 3/10, blog posts at 2/10 for appropriate hierarchy"
  - "H1 only element using ALL CAPS to preserve impact and readability"
  - "Shadows reserved for interactive elements and hero sections only"

patterns-established:
  - "Density validation checklist: accent count, shadow justification, whitespace ratio, hierarchy clarity, mobile test"
  - "Per-section density targets documented for component development"
  - "Typography hierarchy: H1 (800 ALL CAPS) > H2 (700) > H3 (600) > H4 (500)"

# Metrics
duration: <1min
completed: 2026-02-09
---

# Phase 07 Plan 02: Typography & Density Guidelines Summary

**Documented 3/10 density system with per-section targets and established prose typography hierarchy with H1 ALL CAPS at weight 800**

## Performance

- **Duration:** <1 minute (automated execution)
- **Started:** 2026-02-09T22:13:25Z
- **Completed:** 2026-02-09T22:13:54Z
- **Tasks:** 3
- **Files modified:** 2

## Accomplishments
- Created comprehensive density guidelines document with 10-point scale, per-section targets, implementation rules, anti-patterns, and validation checklist
- Established prose typography hierarchy using design tokens with H1 ALL CAPS (weight 800), H2-H4 descending weights
- Verified design system foundation complete with passing builds and no regressions

## Task Commits

Each task was committed atomically:

1. **Task 1: Create density guidelines documentation** - `33ba942` (docs)
2. **Task 2: Update prose typography with heading hierarchy** - `4870d73` (feat)
3. **Task 3: Final verification and build** - No commit (verification only, user approved)

## Files Created/Modified
- `.planning/DENSITY.md` - Comprehensive density guidelines with 3/10 overall target, per-section density levels (Hero 10/10, Content 3/10, Blog 2/10), implementation rules, anti-patterns, validation checklist, and quick reference table
- `src/styles/global.css` - Added prose h1 styling (ALL CAPS, weight 800), updated h2-h4 to use design token variables with descending weights

## Decisions Made

**1. 3/10 Overall Density Target**
- Rationale: Maintains neobrutalist character while ensuring readability and professional trust for small business owner audience
- Impact: Sets constraint for all Phase 8+ component development

**2. Per-Section Density Levels**
- Hero: 10/10 (full neobrutalist impact with colored backgrounds, thick borders, shadows)
- Primary CTAs: 10/10 (maximum interactive emphasis)
- Content sections: 3/10 (subtle structure with one accent per section)
- Cards: 3/10 (3px borders, shadows only if interactive)
- Blog content: 2/10 (reading-optimized with heading accents only)
- Form inputs: 5/10 (clear affordance without shadows)
- Navigation: 3/10 (accent on active state only)
- Rationale: Establishes appropriate visual hierarchy for different content types

**3. H1 ALL CAPS Exclusivity**
- Decision: Only H1 uses ALL CAPS, all other headings normal case
- Rationale: Preserves maximum typographic impact and readability (ALL CAPS reduces reading speed)

**4. Shadows Imply Importance**
- Decision: Reserve colored shadows for interactive elements and hero sections
- Rationale: Creates clear visual affordance for clickable elements, prevents overwhelming static content

**5. One Accent Per Section**
- Decision: Each section uses single dominant accent color (yellow, turquoise, or magenta)
- Rationale: Prevents color chaos, maintains visual clarity

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - all tasks completed smoothly, builds passed, user verified typography visually.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

**Ready for Phase 8 (Primitive Components):**
- Design tokens fully defined (colors, shadows, fonts, spacing, borders)
- Density guidelines documented with per-section targets
- Typography hierarchy established
- Validation checklist available for component reviews

**Blockers/Concerns:**
- Must validate WCAG color contrast ratios before building components (flagged in STATE.md)
- Dark mode shadow glow visibility needs testing on real components

**Recommendations for Phase 8:**
- Reference DENSITY.md when building each component type
- Apply validation checklist (accent count, shadow justification, whitespace ratio, hierarchy clarity, mobile test)
- Start with highest-density components (buttons, CTAs) to test shadow/border combinations
- Test dark mode shadow glows early to adjust opacity if needed

---
*Phase: 07-design-system-foundation*
*Completed: 2026-02-09*

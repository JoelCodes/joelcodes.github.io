---
phase: 08-primitive-components
plan: 03
subsystem: ui
tags: [css, focus-visible, box-shadow, dark-mode, accessibility, wcag]

# Dependency graph
requires:
  - phase: 08-01
    provides: Initial Button.astro and Card.astro components with 2-layer structure
  - phase: 08-02
    provides: Double ring focus technique pattern
provides:
  - Button focus ring using box-shadow that respects border-radius
  - Card dark mode glow effect replacing offset shadows
  - Iterative refinement pattern for visual CSS issues
affects: [09-composite-components, 11-testing-accessibility]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Box-shadow focus rings for rounded elements (outline doesn't respect border-radius)"
    - "color-mix() for 50% opacity glows in dark mode"
    - "Iterative visual refinement after human verification"

key-files:
  created: []
  modified:
    - src/components/ui/Button.astro
    - src/components/ui/Card.astro

key-decisions:
  - "Use box-shadow instead of outline for focus rings to respect border-radius"
  - "Apply focus ring to .btn-front child via .btn:focus-visible .btn-front selector"
  - "Set glow opacity to 80% (increased from 50%) for better visibility"
  - "Disable stacked card pseudo-element shadows in dark mode to prevent double-glow"

patterns-established:
  - "Box-shadow focus technique: When outline ignores border-radius, use double box-shadow on child element"
  - "Iterative visual refinement: Initial implementation → verify → adjust → verify → complete"
  - "Dark mode glow formula: box-shadow: 0 0 20px color-mix(in oklch, color 80%, transparent)"

# Metrics
duration: 35min
completed: 2026-02-09
---

# Phase 8 Plan 3: UAT Gap Closure Summary

**Box-shadow focus rings and dark mode glows fixed through iterative refinement with 80% opacity and isolated pseudo-element handling**

## Performance

- **Duration:** 35 min
- **Started:** 2026-02-09T~18:30:00Z
- **Completed:** 2026-02-09T~19:05:00Z
- **Tasks:** 3 (including checkpoint)
- **Files modified:** 2

## Accomplishments
- Button focus rings now follow border-radius using box-shadow technique
- Card shadows transform into colored glows in dark mode
- Iterative refinement process caught and fixed two visual issues post-implementation
- WCAG 2.4.13 focus visibility maintained throughout changes

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix Button focus ring to follow border-radius** - `0c1a291` (fix)
2. **Task 2: Fix Card dark mode shadows to become glows** - `cf2e439` (fix)
3. **Task 3a: Fix button outline and card glow intensity** - `3b6ce62` (fix)
4. **Task 3b: Fix stacked card pseudo-element shadow in dark mode** - `f5800f9` (fix)

**Plan metadata:** (pending final commit)

_Note: Tasks 3a and 3b were iterative refinements discovered during visual verification checkpoint_

## Files Created/Modified
- `src/components/ui/Button.astro` - Replaced outline-based focus with box-shadow on .btn-front child; removed lingering browser default outline
- `src/components/ui/Card.astro` - Added dark mode glow effect with 80% opacity; disabled pseudo-element shadows for stacked cards in dark mode

## Decisions Made

**1. Box-shadow focus rings for rounded buttons**
- CSS `outline` property ignores `border-radius` and always draws rectangular
- Solution: Use `:focus-visible` on parent to trigger `box-shadow` on `.btn-front` child
- Double ring: 2px gap + 4px visible ring maintains WCAG contrast

**2. Iterative opacity adjustment for dark mode glows**
- Initial 50% opacity was too subtle per visual verification
- Increased to 80% for better visibility while maintaining subtlety
- Used `color-mix(in oklch, var(--card-shadow) 80%, transparent)` for perceptually uniform blending

**3. Stacked card pseudo-element isolation**
- Stacked cards use `::before` and `::after` pseudo-elements for visual layers
- These inherited the parent's dark mode glow, creating double-glow effect
- Solution: Explicitly set `box-shadow: none` on stacked card pseudo-elements in dark mode

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Browser default outline still visible on button focus**
- **Found during:** Task 3 (Visual verification checkpoint)
- **Issue:** After implementing box-shadow focus ring, browser's default blue outline still appeared alongside it
- **Fix:** Added `outline: none;` to `.btn:focus-visible` to suppress default behavior
- **Files modified:** src/components/ui/Button.astro
- **Verification:** Tabbed through buttons, only custom box-shadow ring visible
- **Committed in:** `3b6ce62` (Task 3a commit)

**2. [Rule 1 - Bug] Card dark mode glow too subtle at 50% opacity**
- **Found during:** Task 3 (Visual verification checkpoint)
- **Issue:** Glow effect barely visible in dark mode, defeating the "futuristic feel" design intent
- **Fix:** Increased `color-mix` opacity from 50% to 80%
- **Files modified:** src/components/ui/Card.astro
- **Verification:** Toggled dark mode, glows clearly visible without being overwhelming
- **Committed in:** `3b6ce62` (Task 3a commit)

**3. [Rule 1 - Bug] Stacked card pseudo-elements creating double-glow in dark mode**
- **Found during:** Task 3b (Post-checkpoint follow-up)
- **Issue:** Stacked card's `::before` and `::after` pseudo-elements inherited parent's glow, stacking multiple glows
- **Fix:** Added `:global(.dark) .card-stacked::before, :global(.dark) .card-stacked::after { box-shadow: none; }`
- **Files modified:** src/components/ui/Card.astro
- **Verification:** Toggled dark mode on stacked cards, single clean glow visible
- **Committed in:** `f5800f9` (Task 3b commit)

---

**Total deviations:** 3 auto-fixed (all Rule 1 - Bugs discovered during visual verification)
**Impact on plan:** All bugs were visual presentation issues that prevented design intent from being achieved. No scope creep, all fixes directly addressed UAT gap criteria.

## Issues Encountered

**Iterative refinement pattern:**
- Plan specified implementation approach but visual verification revealed edge cases
- First implementation had correct technique but missed browser default behavior and opacity tuning
- Human verification checkpoint caught issues before integration
- Pattern: implement → verify → refine → verify → complete

This validates the checkpoint:human-verify pattern for visual CSS work where spec can't capture all edge cases.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

**Ready for Phase 9 (Composite Components):**
- All primitive components (Button, Card, Input) have correct focus states
- Dark mode behavior is consistent across components
- Visual verification pattern established for future component work

**Considerations for Phase 9:**
- Button + Icon composition will inherit focus ring behavior
- Clickable cards may need pressed effect (similar to button active state)
- Card + Button integration should be tested for padding/CTA spacing

**Considerations for Phase 11 (Testing & Accessibility):**
- Focus ring contrast ratio should be verified against final color palette
- Dark mode glow visibility should be tested across different monitors/brightness levels
- Keyboard navigation flow through composite components needs end-to-end test

---
*Phase: 08-primitive-components*
*Completed: 2026-02-09*

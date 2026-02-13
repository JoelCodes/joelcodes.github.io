# Phase 17 Plan 08: Stacked Card Isolation Fix Summary

---
phase: 17-design-system-reference-page
plan: 08
subsystem: design-system
tags: [card-component, neobrutalism, pseudo-elements, css, uat-fix]
requires: [17-07]
provides:
  - "Visually distinct stacked card variant with visible multi-layer depth effect"
affects: [design-system-documentation]
tech-stack:
  added: []
  patterns: [pseudo-element-stacking, css-isolation-context]
key-files:
  created: []
  modified: [src/components/ui/Card.astro]
decisions:
  - id: "17-08-inset-zero"
    choice: "Use inset: 0 instead of inset: -4px for pseudo-elements"
    reason: "With inset: 0, the 4px/8px transforms make layers fully visible instead of hiding them behind the main card"
  - id: "17-08-solid-backgrounds"
    choice: "Add solid backgrounds to pseudo-elements matching card background"
    reason: "Creates true stacked paper effect with complete card layers visible"
  - id: "17-08-increased-opacity"
    choice: "Increase border opacity from 60%/30% to 80%/50%"
    reason: "Better contrast and visibility against white/dark backgrounds"
metrics:
  duration: 64
  completed: 2026-02-13
---

## One-liner

Enhanced stacked card pseudo-element visibility with proper inset positioning, solid backgrounds, and increased opacity for clear multi-layer depth effect.

## Context

**Phase:** 17 - Design System Reference Page
**Plan Type:** Gap Closure (UAT Fix)
**Trigger:** UAT reported "stacked cards aren't showing as stacked - just flat rectangles in light mode, flat rectangles with color glow in dark mode."

## What Was Done

### Tasks Completed

1. ✅ **Diagnosed and fixed stacked card pseudo-element visibility**
   - Changed `inset: -4px` to `inset: 0` for proper layer offset
   - Increased border width from `2px` to `3px` for clearer definition
   - Increased opacity from 60%/30% to 80%/50% for better contrast
   - Added solid background colors (`var(--color-bg-light)` / `var(--color-bg-dark)`)
   - Ensured `isolation: isolate` creates proper stacking context

### Root Cause

The original implementation used `inset: -4px`, which extended pseudo-elements 4px beyond the card in ALL directions. Combined with only 4px and 8px transforms, this meant the layers were mostly hidden behind the main card. The fix uses `inset: 0` so the pseudo-elements start at the card's edge, making the transformed layers fully visible.

### Visual Result

- **Light mode:** Main card with two clearly visible border layers offset 4px and 8px behind (stacked paper effect)
- **Dark mode:** Same multi-layer structure with soft glow on furthest layer
- **All variants:** Turquoise and magenta stacked cards show proper depth effect

## Implementation Details

### Modified Components

**src/components/ui/Card.astro:**
- Updated `.card-stacked::before` and `.card-stacked::after` styling
- Changed `inset: -4px` → `inset: 0`
- Changed `border: 2px solid` → `border: 3px solid`
- Added `background: var(--color-bg-light)` (light mode)
- Added `background: var(--color-bg-dark)` (dark mode)
- Increased opacity values for better visibility

### CSS Changes

```css
/* Before */
.card-stacked::before,
.card-stacked::after {
  content: '';
  position: absolute;
  inset: -4px;
  border: 2px solid;
  border-radius: 0.5rem;
  z-index: -1;
}

.card-stacked::before {
  border-color: oklch(0.25 0 0 / 0.6);
}

.card-stacked::after {
  border-color: oklch(0.25 0 0 / 0.3);
}

/* After */
.card-stacked::before,
.card-stacked::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 3px solid;
  border-radius: 0.5rem;
  z-index: -1;
  background: var(--color-bg-light);
}

.card-stacked::before {
  border-color: oklch(0.25 0 0 / 0.8);
}

.card-stacked::after {
  border-color: oklch(0.25 0 0 / 0.5);
}
```

## Decisions Made

### 1. Inset Zero Positioning
**Decision:** Use `inset: 0` instead of `inset: -4px`
**Rationale:** With `inset: 0`, the pseudo-elements start at the card's edge. The 4px and 8px transforms then create fully visible offset layers. The previous `-4px` inset made layers extend beyond the card in all directions, causing them to be mostly hidden behind the main card.

### 2. Solid Background Fill
**Decision:** Add `background: var(--color-bg-light/dark)` to pseudo-elements
**Rationale:** Creates a true "stacked paper" effect where you see complete card layers instead of just borders. Matches the main card's background for visual consistency.

### 3. Increased Border Opacity
**Decision:** Increase opacity from 60%/30% to 80%/50%
**Rationale:** Better contrast and visibility against both white and dark backgrounds. The layered effect requires sufficient opacity to be distinguishable.

### 4. Thicker Borders
**Decision:** Increase border width from `2px` to `3px`
**Rationale:** Aligns with neobrutalist design system standard (`border-[3px]`) and improves visibility of the stacked layers.

## Verification

✅ **Build:** `npm run build` - No errors
✅ **Visual Check:** Stacked cards show 3 visible layers (main + 2 pseudo-elements)
✅ **Light Mode:** Offset border layers clearly visible with stacked paper effect
✅ **Dark Mode:** Multi-layer structure maintained with appropriate glow transformation
✅ **All Variants:** Yellow, turquoise, and magenta stacked cards all display proper depth

## Deviations from Plan

None - plan executed exactly as written.

## Next Phase Readiness

**Phase 17 (Design System):** All UAT gaps from code block padding (17-07) and stacked cards (17-08) now resolved. Ready for any remaining gap closure plans (17-09 if exists).

**Dependencies:**
- Design system documentation complete with properly rendering stacked card examples
- Card component demonstrates neobrutalist stacking patterns for future reference

## Commits

| Commit | Message | Files |
|--------|---------|-------|
| dbde75b | fix(17-08): enhance stacked card pseudo-element visibility | src/components/ui/Card.astro |

## Files Changed

**Modified:**
- `src/components/ui/Card.astro` - Enhanced `.card-stacked` pseudo-element styling

## Performance Impact

- Zero performance impact (pure CSS changes)
- No additional DOM elements or JavaScript
- Pseudo-elements already existed, just improved visibility

## Lessons Learned

1. **Inset positioning critical for pseudo-element visibility:** When using transforms on pseudo-elements, `inset: 0` creates predictable offset behavior, while negative insets can hide layers
2. **Solid backgrounds enhance stacked effects:** Adding matching background fills to pseudo-elements creates clearer visual separation
3. **Opacity tuning matters:** Semi-transparent borders need sufficient opacity (70%+) to be visible against varying backgrounds
4. **Border width consistency:** Aligning component borders with design system standards (3px) improves visual coherence

---

*Duration: 64 seconds*
*Completed: 2026-02-13*

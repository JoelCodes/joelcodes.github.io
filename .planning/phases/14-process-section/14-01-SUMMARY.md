---
phase: 14-process-section
plan: 01
subsystem: visual-design
tags: [svg, illustrations, isometric, neobrutalism, theming]

requires:
  - phase: 12-foundation
    provides: isometric CSS utilities (iso-shadow, iso-glow)
  - phase: 12-foundation
    provides: neobrutalist design tokens (OKLCH colors)

provides:
  - artifact: 5 process step isometric SVG illustrations
    location: src/components/illustrations/
    purpose: Visual differentiation for process workflow steps

affects:
  - phase: 14
    plan: 02
    reason: Illustrations ready for Process.astro integration
  - phase: 15
    reason: Establishes illustration style guide for Tech section

tech-stack:
  added:
    - Astro SVG component imports (native)
  patterns:
    - Inline SVG with currentColor for CSS theming
    - aria-hidden="true" for decorative illustrations
    - viewBox for responsive scaling
    - opacity-based isometric face differentiation

key-files:
  created:
    - src/components/illustrations/ProcessDiscovery.svg
    - src/components/illustrations/ProcessPrototype.svg
    - src/components/illustrations/ProcessProposal.svg
    - src/components/illustrations/ProcessBuild.svg
    - src/components/illustrations/ProcessHandover.svg
  modified:
    - src/pages/test-isometric.astro

decisions:
  - decision: Use simple geometric shapes (3-5 per illustration)
    rationale: Ensures illustrations remain recognizable at 64x64px mobile size
    impact: All illustrations under 1KB, well under 20KB target
  - decision: Use currentColor instead of hard-coded hex colors
    rationale: Enables CSS-based theming that automatically adapts to parent color classes
    impact: Illustrations work with any color (yellow, turquoise, magenta) and adapt to dark mode
  - decision: Use opacity (0.7, 0.85, 1.0) for isometric face differentiation
    rationale: Creates depth perception without needing multiple colors or gradients
    impact: Minimal file size while maintaining isometric appearance
  - decision: All illustrations get aria-hidden="true"
    rationale: These are decorative illustrations (step descriptions provide the semantic content)
    impact: Screen readers skip the SVGs, relying on descriptive text instead

metrics:
  duration: 2 minutes
  completed: 2026-02-10
---

# Phase 14 Plan 01: Process Illustrations Summary

**One-liner:** Created 5 minimal isometric SVG illustrations (<1KB each) using currentColor for CSS theming and viewBox for responsive scaling.

## What Was Built

Created a library of 5 process step illustrations following the neobrutalist isometric style guide:

1. **ProcessDiscovery.svg (478 bytes)** - Magnifying glass with isometric lens
2. **ProcessPrototype.svg (662 bytes)** - Screen/window with content blocks
3. **ProcessProposal.svg (749 bytes)** - Document with checkmark and text lines
4. **ProcessBuild.svg (649 bytes)** - Stacked isometric cubes
5. **ProcessHandover.svg (722 bytes)** - Gift box with ribbon and bow

All illustrations:
- Use `currentColor` for automatic CSS theming
- Include `viewBox="0 0 100 100"` for responsive scaling
- Follow 45-degree isometric projection (consistent with iso-rotate utility)
- Use opacity-based face differentiation (0.7, 0.85, 1.0)
- Include `aria-hidden="true"` for accessibility
- Are under 1KB each (total: 3.26KB for all 5)

## Technical Implementation

**SVG Structure Pattern:**
```svg
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- Simple geometric shapes using currentColor -->
  <path d="..." fill="currentColor" opacity="0.85"/>
  <path d="..." fill="currentColor" opacity="1.0"/>
  <path d="..." fill="currentColor" opacity="0.7"/>
</svg>
```

**Astro Import Pattern (verified in test-isometric.astro):**
```astro
---
import ProcessDiscovery from '../components/illustrations/ProcessDiscovery.svg';
---

<div class="text-yellow iso-shadow">
  <ProcessDiscovery width={64} height={64} />
</div>
```

**Theming Integration:**
- Parent element sets text color (`.text-yellow`, `.text-turquoise`, etc.)
- SVG inherits color via `currentColor` fill attribute
- iso-shadow utility applies colored shadow in light mode
- Dark mode automatically transforms shadow to glow

## Deviations from Plan

None - plan executed exactly as written.

## Testing Performed

**Build Verification:**
- ✅ `npm run build` succeeded without errors
- ✅ All SVG files import correctly as Astro components
- ✅ No warnings about SVG processing

**File Verification:**
- ✅ All 5 SVG files exist in `src/components/illustrations/`
- ✅ Each file under 1KB (largest: 749 bytes)
- ✅ All use `currentColor` (25 occurrences across files)
- ✅ All have `viewBox` attribute (5 occurrences)
- ✅ All have `aria-hidden="true"` (5 occurrences)

**Visual Verification (test-isometric.astro):**
- ✅ All 5 illustrations render at 64x64px
- ✅ Colors inherit from parent element (yellow, turquoise, magenta tested)
- ✅ Illustrations recognizable and clear at target size
- ✅ iso-shadow utility creates visible offset shadow in light mode
- ✅ Dark mode transformation to glow works correctly

## Known Issues / Limitations

None identified.

**Future considerations:**
- Illustrations not yet integrated into Process.astro component (planned for 14-02)
- Mobile size (48x48px) testing deferred to integration task
- Lighthouse LCP impact will be measured after integration

## Next Phase Readiness

**Phase 14-02 (Process.astro integration):**
- ✅ All 5 illustrations created and verified
- ✅ Import pattern established and tested
- ✅ Theming pattern confirmed working
- ✅ File sizes well under budget

**Phase 15 (Tech section illustrations):**
- ✅ Illustration style guide established (3-5 shapes, currentColor, viewBox, opacity faces)
- ✅ Size target validated (<1KB per illustration achievable)
- ✅ Theming pattern proven for CSS color inheritance

**Blockers:** None

## Lessons Learned

1. **Simple shapes scale better:** Limiting to 3-5 geometric shapes per illustration kept files under 500-750 bytes while maintaining clarity at 64x64px
2. **currentColor is powerful:** Single SVG works with any color - no need for color variants or JavaScript theming
3. **Opacity for depth:** Using opacity (0.7, 0.85, 1.0) creates isometric face differentiation without color complexity
4. **viewBox essential:** `viewBox="0 0 100 100"` ensures illustrations scale perfectly at any size (64x64, 48x48, etc.)
5. **aria-hidden for decorative:** Since process descriptions provide semantic content, SVGs are correctly marked decorative

## Commits

- `b28f032`: feat(14-01): create 5 process step isometric illustrations
- `a357280`: feat(14-01): add process illustrations preview to test page

## Files Changed

**Created (5 files, 3.26KB total):**
- `src/components/illustrations/ProcessDiscovery.svg` (478 bytes)
- `src/components/illustrations/ProcessPrototype.svg` (662 bytes)
- `src/components/illustrations/ProcessProposal.svg` (749 bytes)
- `src/components/illustrations/ProcessBuild.svg` (649 bytes)
- `src/components/illustrations/ProcessHandover.svg` (722 bytes)

**Modified (1 file):**
- `src/pages/test-isometric.astro` (+57 lines)

Total impact: 6 files, +115 lines of code

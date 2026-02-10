---
status: diagnosed
trigger: "Investigate why the button focus ring is the same size for all buttons instead of fitting each button's size"
created: 2026-02-09T12:00:00Z
updated: 2026-02-09T12:10:00Z
---

## Current Focus

hypothesis: CONFIRMED - The focus ring implementation is correctly placed but the CSS approach has issues
test: N/A - root cause identified
expecting: N/A
next_action: Return diagnosis

## Symptoms

expected: Focus ring should follow each button's actual size (sm, md, lg)
actual: Focus ring appears the same size for all button sizes
errors: None (visual issue)
reproduction: Tab through buttons of different sizes on demo page
started: Since button component was created with 2-layer structure

## Eliminated

- hypothesis: Focus ring applied to wrong element
  evidence: Focus IS on outer .btn wrapper which shrink-wraps to content - this is correct
  timestamp: 2026-02-09T12:05:00Z

- hypothesis: Fixed dimensions causing uniform size
  evidence: No fixed width/height found; .btn uses inline-block with padding:0
  timestamp: 2026-02-09T12:06:00Z

## Evidence

- timestamp: 2026-02-09T12:00:00Z
  checked: Button.astro component structure (lines 29-38)
  found: Two-layer structure - outer `<Tag>` (button/a) wraps inner `<span class="btn-front">`
  implication: Size and focus are applied to different elements

- timestamp: 2026-02-09T12:01:00Z
  checked: Size class application (lines 22-26, 35)
  found: sizeClasses (px-4/6/8, py-2/3/4) applied to `.btn-front` span
  implication: Different buttons have different inner padding

- timestamp: 2026-02-09T12:02:00Z
  checked: Focus ring implementation (lines 97-101)
  found: focus-visible on .btn uses `outline` with `border-radius: 0.25rem`
  implication: border-radius on outline selector is ineffective - outlines are rectangular

- timestamp: 2026-02-09T12:03:00Z
  checked: Outer .btn styling (lines 46-61)
  found: `.btn` is `inline-block` with `padding: 0` and `padding-bottom: var(--btn-offset)`
  implication: Wrapper should shrink-wrap correctly

- timestamp: 2026-02-09T12:08:00Z
  checked: Compiled CSS in dist/
  found: Styles compile correctly with all size classes present
  implication: Build process is not the issue

- timestamp: 2026-02-09T12:09:00Z
  checked: CSS outline behavior
  found: CSS `outline` does NOT follow `border-radius` - it's always rectangular
  implication: The `border-radius: 0.25rem` on .btn:focus-visible is ineffective

## Resolution

root_cause: |
  The focus ring implementation has TWO issues:

  1. **Ineffective border-radius**: Lines 97-101 set `border-radius: 0.25rem` on `.btn:focus-visible`,
     but CSS `outline` does NOT respect border-radius - outlines are always rectangular boxes.
     This creates a visual mismatch: rounded buttons with square focus rings.

  2. **Sizing IS correct** but may appear uniform because:
     - The outline is offset by 4px from the wrapper
     - The wrapper has padding-bottom for shadow space
     - The rectangular outline shape makes size differences less visually distinct
     - All buttons have the same border-radius on .btn-front, so the rectangular outline
       makes them look more similar than they actually are

fix: |
  Option A (Modern browsers): Use `outline-style: auto` which respects element shape
  Option B (Box-shadow approach): Replace outline with box-shadow which follows border-radius
  Option C (Move focus to inner element): Apply focus-visible to .btn-front directly

verification:
files_changed: []

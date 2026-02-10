---
status: diagnosed
phase: 08-primitive-components
source: 08-01-SUMMARY.md, 08-02-SUMMARY.md
started: 2026-02-09T23:55:00Z
updated: 2026-02-10T00:05:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Button Hover Lift Effect
expected: Hovering over a button lifts the front layer up (visually moves up). The shadow remains in place, creating a 3D "floating" effect.
result: pass

### 2. Button Press Effect
expected: Clicking/pressing a button pushes it down (front layer moves down toward shadow). The button feels "pressed into" the page.
result: pass

### 3. Button Keyboard Focus Ring
expected: Tabbing to a button shows a visible focus ring (black outline with inner gap). The ring is clearly visible without clicking.
result: issue
reported: "The ring is the same size for each button, instead of looking like it fits the button."
severity: major

### 4. Card Borders and Shadows
expected: Cards have thick black borders and a colored offset shadow (shadow appears shifted down-right in light mode).
result: pass

### 5. Card Stacked Effect
expected: Cards with stacked prop show 3D layered appearance - multiple "cards" stacked behind with visible borders on bottom-right.
result: pass

### 6. Card Dark Mode Glow
expected: In dark mode, card shadows become colored glows instead of offset shadows. The glow creates a "neon" effect.
result: issue
reported: "There's no difference in how the shadows look between light and dark mode."
severity: major

### 7. Input Focus Ring
expected: Clicking into or tabbing to an input shows a double-ring focus indicator (4px total width, inner gap visible).
result: pass

### 8. Input Error State
expected: Input with error shows red border and displays the error message text below the input field.
result: pass

### 9. Input Label Display
expected: Inputs with label prop show the label text above the input field in a bold/heading font.
result: pass

### 10. Button Dark Mode
expected: In dark mode, buttons have dark background with colored text and borders. Colors invert appropriately.
result: pass

### 11. All Variants Present
expected: Demo page shows all three color variants (yellow, turquoise, magenta) for buttons, cards, and inputs.
result: pass

### 12. Button Sizes
expected: Demo page shows buttons in three sizes (small, medium, large) with visible size differences in padding and font.
result: pass

## Summary

total: 12
passed: 10
issues: 2
pending: 0
skipped: 0

## Gaps

- truth: "Button focus ring fits the button size and follows its outline"
  status: failed
  reason: "User reported: The ring is the same size for each button, instead of looking like it fits the button."
  severity: major
  test: 3
  root_cause: "CSS outline does not respect border-radius - outlines are always rectangular. Focus ring applied to outer .btn wrapper instead of .btn-front which has rounded corners."
  artifacts:
    - path: "src/components/ui/Button.astro"
      issue: "Lines 97-101: outline on .btn:focus-visible is rectangular, border-radius has no effect on outlines"
  missing:
    - "Replace outline with box-shadow on .btn-front to follow button shape"
  debug_session: ".planning/debug/button-focus-ring-size.md"

- truth: "Card shadows become colored glows in dark mode"
  status: failed
  reason: "User reported: There's no difference in how the shadows look between light and dark mode."
  severity: major
  test: 6
  root_cause: "Dark mode rules only change shadow color via --card-shadow variable but never change box-shadow property itself. Shadow stays as offset (6px 6px 0) instead of becoming glow (0 0 20px)."
  artifacts:
    - path: "src/components/ui/Card.astro"
      issue: "Lines 34-47: Missing box-shadow override in dark mode, only changes color variable"
  missing:
    - "Add box-shadow: 0 0 20px color-mix(...) in :global(.dark) .card rule"
  debug_session: ".planning/debug/card-dark-mode-glow.md"

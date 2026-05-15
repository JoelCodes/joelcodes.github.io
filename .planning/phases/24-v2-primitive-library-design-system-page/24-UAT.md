---
status: complete
phase: 24-v2-primitive-library-design-system-page
source:
  - 24-01-SUMMARY.md
  - 24-02-SUMMARY.md
  - 24-03-SUMMARY.md
  - 24-04-SUMMARY.md
started: 2026-05-15T00:00:00Z
updated: 2026-05-15T00:00:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Page loads on v2 BaseLayout
expected: `/design-system` opens at localhost:4321 without errors; sections for Buttons, Cards, Inputs, Badges, and Tokens are present.
result: issue
reported: "The dropdown is way too thin, and doesn't show text, even when something is selected."
severity: major
note: User observed the page rendered (sections present), but reported a defect in the Inputs section select primitive. Defect logically belongs to Test 6 (Input gallery); recorded here per UAT response-to-current-test rule and will be re-surfaced at Test 6.

### 2. Button gallery renders all 9 variant×size combos
expected: Buttons section shows primary, ghost, and link variants in sm/md/lg sizes (~14 buttons total including icon variants). Primary buttons use accent (green) background.
result: pass

### 3. Button keyboard focus shows accent ring
expected: Click into the page, then press Tab repeatedly. As focus lands on each Button, a green (accent) outline ring is visible around it. Pressing Enter on a `<button>` Button triggers it; Enter on a link-variant Button navigates away (or to its href).
result: pass

### 4. Card gallery shows all 4 variants
expected: Cards section shows at least 4 cards — a plain default card, an `elevated` card with a soft drop shadow, an `interactive` card, and a composed card with Header/Body/Footer regions (footer separated by a top border).
result: pass

### 5. Interactive Card hover lift + focus ring
expected: Hovering the `interactive` Card lifts it slightly (a small upward translate). Tabbing to it shows an accent green focus outline. The non-interactive cards do not lift on hover and are skipped by Tab.
result: issue
reported: "The interactive card does not lift on hover, but it does get an accent green focus."
severity: minor
note: Partial pass — focus ring works correctly; hover lift (`hover:-translate-y-0.5`) is missing. Likely Tailwind v4 utility-generation issue (possibly related to spacing-scale rename in recent commit 8932a76).

### 6. Input gallery renders and accepts typing
expected: Inputs section shows a text input, a textarea, and a select dropdown. You can type into the text input and textarea, and choose an option from the select. The disabled input is greyed out and is skipped when you Tab through.
result: issue
reported: "The select doesn't show default or selected text."
severity: major
note: Confirms the same defect first flagged on Test 1. Text input, textarea, and disabled-input Tab-skip behavior not explicitly mentioned by user — presumed working. Gap entry consolidated to reference both Test 1 and Test 6.

### 7. Input error state shows accessible error message
expected: The error-state Input shows a visible error message below the field (e.g., red text). The input has a visible label above it. (Helper text variant, if present, shows muted helper text below the field.)
result: issue
reported: "The error state is not red."
severity: cosmetic
note: Error message is present (user did not report it as missing), but the red color treatment is absent. Likely Input.astro `aria-invalid=true` styling not applying the danger color — either the danger token is undefined in v2 token system or the conditional class is wrong.

### 8. Badge gallery shows 3 variants and icon badges
expected: Badges section shows ~6 badges across three variants — accent (filled), muted (subtle background), and outline (bordered) — plus three additional badges with a small Lucide icon on the left.
result: pass

### 9. Tokens section renders swatches + typography ladder
expected: Tokens section shows ~8 color swatches (chips for primary, primary-hover, surface, surface-muted, text, text-muted, border, accent) with their token names readable, and a typography ladder of 8 "Aa" samples from display down to caption size, each labeled with its utility class.
result: pass

### 10. /design-system.json returns flat v2 token shape
expected: Visiting http://localhost:4321/design-system.json returns valid JSON with exactly these 5 top-level keys — `colors`, `spacing`, `radii`, `typography`, `fonts` — and `colors` contains semantic keys like `primary`, `surface`, `text`, `accent` (no `yellow`/`turquoise`/`magenta` v1 names).
result: pass

## Summary

total: 10
passed: 6
issues: 4
pending: 0
skipped: 0
distinct_gaps: 3

## Gaps

- truth: "Select primitive (Input as=\"select\") renders at usable width and shows the selected option's text"
  status: failed
  reason: "User reported on Test 1: The dropdown is way too thin, and doesn't show text, even when something is selected. Reconfirmed on Test 6: The select doesn't show default or selected text."
  severity: major
  tests: [1, 6]
  scope: "Likely root cause in src/components/v2/ui/Input.astro select branch — width constraints and/or select element styling (text color, padding, native vs styled rendering)"
  artifacts: []
  missing: []

- truth: "Interactive Card lifts on hover via hover:-translate-y-0.5"
  status: failed
  reason: "User reported: The interactive card does not lift on hover, but it does get an accent green focus."
  severity: minor
  test: 5
  scope: "src/components/v2/ui/Card.astro — hover:-translate-y-0.5 utility may not be generating CSS in Tailwind v4 (possibly related to spacing-scale rename in commit 8932a76). Focus ring works, so component is otherwise correct."
  artifacts: []
  missing: []

- truth: "Input error state shows red color treatment on the error message"
  status: failed
  reason: "User reported: The error state is not red."
  severity: cosmetic
  test: 7
  scope: "src/components/v2/ui/Input.astro — error message paragraph likely uses a token that isn't defined or isn't resolving to red. Check whether v2 token system has a danger/error color and whether the error-text class wires it up."
  artifacts: []
  missing: []

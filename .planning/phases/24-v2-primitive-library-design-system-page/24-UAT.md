---
status: diagnosed
phase: 24-v2-primitive-library-design-system-page
source:
  - 24-01-SUMMARY.md
  - 24-02-SUMMARY.md
  - 24-03-SUMMARY.md
  - 24-04-SUMMARY.md
started: 2026-05-15T00:00:00Z
updated: 2026-05-15T00:00:00Z
diagnosed: 2026-05-15T00:00:00Z
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
  root_cause: |
    Namespace collision in v2 @theme. src/styles/v2/global.css:26-31 defines --spacing-sm/md/lg/xl/2xl
    in Tailwind v4's spacing-scale namespace, which v4's max-w-{size} generator falls back to when
    no --container-{size} is defined. Compiled CSS contains .max-w-sm{max-width:var(--spacing-sm)} —
    so .max-w-sm resolves to 16px instead of the intended 384px. The select demo wrapper in
    src/pages/design-system.astro:258 (`<div class="max-w-sm mb-lg">`) is therefore clamped to 16px,
    which forces the select's w-full down to 16px content area (rendered ~34px total with padding).
    The "too thin" and "no visible text" symptoms are the same defect — no room to render the
    selected option text. Latent same-namespace hijack also affects max-w-md in
    src/components/v2/layout/Footer.astro. Confirmed via Playwright getComputedStyle and emitted
    CSS inspection. Side-effect of commit 8932a76 (--space-* → --spacing-* rename).
  artifacts:
    - path: "src/styles/v2/global.css"
      issue: "lines 26-31 define --spacing-sm/md/lg/xl/2xl in v4 spacing namespace, hijacking max-w-{size} fallback"
    - path: "src/pages/design-system.astro"
      issue: "line 258 uses max-w-sm expecting 384px but receives 16px"
    - path: "src/components/v2/layout/Footer.astro"
      issue: "max-w-md latent same-defect site (not flagged in UAT but will be incidentally fixed)"
  missing:
    - "Declare explicit --container-sm/md/lg/xl/2xl values in v2/global.css @theme so v4 prefers the container namespace for max-w-{size} (Tailwind v4 prefers container over spacing when both exist)"
    - "Add a Plan-24-03-style computed-style regression guard asserting the select demo wrapper renders at width >= ~300px"
  debug_session: .planning/debug/select-too-thin-no-text.md

- truth: "Interactive Card lifts on hover via hover:-translate-y-0.5"
  status: failed
  reason: "User reported: The interactive card does not lift on hover, but it does get an accent green focus."
  severity: minor
  test: 5
  root_cause: |
    Spec magnitude defect, NOT a Tailwind generation issue. hover:-translate-y-0.5 IS generating
    valid CSS and IS applying on :hover — Playwright headless probe of /design-system confirms
    computed translate becomes "0px -2px" on hover, and the emitted CSS contains the rule with
    --tw-translate-y resolving via the default v4 --spacing: .25rem. The defect is that -2px is
    below the threshold of human visual perception on a ~120px-tall card, especially on Retina.
    For comparison, v1 ProjectCard.astro and BlogCard.astro use hover:-translate-y-2 = -8px and
    read clearly as a "lift". UI-SPEC line 235 prescribed -2px; the spec value itself is the bug.
    No translate assertion in v2-primitives.spec.ts Test 7 — defect was undetectable by automation.
  artifacts:
    - path: "src/components/v2/ui/Card.astro"
      issue: "line 22 hover:-translate-y-0.5 (-2px) is below visual perception threshold"
    - path: ".planning/phases/24-v2-primitive-library-design-system-page/24-UI-SPEC.md"
      issue: "lines 235, 316 prescribe -2px; spec value is too small"
    - path: "tests/accessibility/v2-primitives.spec.ts"
      issue: "Test 7 missing assertion that interactive Card produces non-zero translate on :hover"
  missing:
    - "Change Card.astro:22 to hover:-translate-y-1 (-4px) or hover:-translate-y-1.5 (-6px) — perceptible but still subtle, closer to v1 8px idiom"
    - "Update 24-UI-SPEC.md lines 235/316 to match the chosen magnitude (replace -2px)"
    - "Add Playwright assertion in v2-primitives.spec.ts Test 7 verifying hover translate is non-zero (regression guard)"
  debug_session: .planning/debug/interactive-card-no-hover-lift.md

- truth: "Input error state shows red color treatment on the error message"
  status: failed
  reason: "User reported: The error state is not red."
  severity: cosmetic
  test: 7
  root_cause: |
    Code matches Plan 24-02 spec exactly — defect is at the SPEC level, not the implementation.
    src/components/v2/ui/Input.astro:56 applies class="text-small font-text text-text" on the
    error <p>, which resolves to --color-text (Crito navy oklch(0.225 0.044 264.6)) — the same
    color as body copy. Plan 24-02 explicitly mandated "no red" (lines 28, 220, 297) due to an
    upstream gap in the Phase 24 UI-SPEC's destructive-color section. The v2 @theme defines
    exactly 8 color tokens and NO --color-danger/--color-error. Differentiation currently relies
    entirely on aria-invalid="true", role="alert", and a ⚠ glyph prefix — visually weak.
  artifacts:
    - path: "src/components/v2/ui/Input.astro"
      issue: "line 56 error <p> uses text-text (body navy) by spec"
    - path: "src/styles/v2/global.css"
      issue: "lines 7-78 @theme defines 8 color tokens; no danger/error/red token"
    - path: ".planning/phases/24-v2-primitive-library-design-system-page/24-02-PLAN.md"
      issue: "lines 28, 220, 297 mandated 'no red' — upstream spec gap"
  missing:
    - "Add --color-danger: oklch(...) to v2 @theme (Crito-tone red, e.g. oklch(0.55 0.22 27))"
    - "Change Input.astro:56 from text-text to text-danger"
    - "Run tests/check-token-collision.cjs to confirm no v1 collision"
    - "Update src/pages/design-system.json.ts and design-system.astro colorTokens array to include danger swatch"
    - "Update 24-UI-SPEC.md to close the destructive-color gap"
  debug_session: .planning/debug/input-error-not-red.md

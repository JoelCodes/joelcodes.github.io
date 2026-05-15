---
status: resolved
trigger: "The error state is not red."
created: 2026-05-15T00:00:00Z
updated: 2026-05-15T22:08:00Z
resolved: 2026-05-15T22:08:00Z
closed_by: 24-07-PLAN.md
---

## Current Focus

hypothesis: CONFIRMED — Input.astro deliberately renders the error <p> with `text-text` (same color as body text). The v2 token system has no danger/error/red token by design. This is a Phase 24 spec gap, not a code bug.
test: Read Input.astro line 56 + global.css @theme block + 24-02-PLAN.md spec.
expecting: Class on error <p> is `text-text`; no `--color-danger` token in v2 @theme; plan explicitly mandates "no red."
next_action: Return ROOT CAUSE FOUND to caller.

## Symptoms

expected: On /design-system, the Input with `error` prop displays its error message in red text below the field, visually distinct from helper text (muted grey).
actual: The error message renders but is not red.
errors: None
reproduction: npm run dev → http://localhost:4321/design-system → scroll to Inputs section → observe error-state Input.
started: Discovered during UAT for Phase 24, 2026-05-15.

## Eliminated

- hypothesis: The error <p> uses an undefined custom class like `text-danger` or `text-error` that Tailwind v4 silently drops.
  evidence: Line 56 of src/components/v2/ui/Input.astro uses `class="text-small font-text text-text"`. `text-text` IS a defined token (`--color-text` in v2 @theme, line 15 of v2/global.css) and resolves to navy oklch(0.225 0.044 264.6). No undefined-class issue — the wiring works exactly as written.
  timestamp: 2026-05-15

## Evidence

- timestamp: 2026-05-15
  checked: src/components/v2/ui/Input.astro lines 55–59 (error paragraph rendering branch)
  found: |
    {error && (
      <p id={errorId} role="alert" class="text-small font-text text-text">
        <span aria-hidden="true">&#9888; </span>{error}
      </p>
    )}
    The applied color utility is `text-text` (same as default body color — navy). The only error-state signals are the `aria-invalid="true"` attribute on the field (line 42), `role="alert"` on the <p>, and the U+26A0 warning glyph prefix.
  implication: There is no red color treatment in the component. The rendered text inherits/applies `--color-text` (navy), identical to surrounding body copy.

- timestamp: 2026-05-15
  checked: src/styles/v2/global.css @theme block (lines 7–78)
  found: v2 token system defines exactly 8 color tokens — `--color-primary`, `--color-primary-hover`, `--color-surface`, `--color-surface-muted`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-accent`. No `--color-danger`, `--color-error`, `--color-red`, or any oklch red value exists.
  implication: Even if the executor wanted to wire `text-danger` into the error paragraph, no such token exists. The v2 token system has no destructive/danger color by design.

- timestamp: 2026-05-15
  checked: .planning/phases/24-v2-primitive-library-design-system-page/24-02-PLAN.md lines 28, 274, 297
  found: |
    Line 28 (Acceptance criteria): "Input error state uses no red color (Phase 24 destructive gap per UI-SPEC) — only aria-invalid + role=alert + asterisk in label"
    Line 220 (Source-file caveat): "DO NOT copy ... the red OKLCH error color [from v1]"
    Line 274 (Code spec verbatim): `<p id={errorId} role="alert" class="text-small font-text text-text">`
    Line 297 (Design rationale): "Error visual treatment is NO RED per UI-SPEC Color 'Destructive' gap. The asterisk in the label (when required) + the inline error message + aria-invalid='true' are the only error signals. The optional `⚠ ` glyph prefix in the error <p> is a typographic indicator, not a color signal."
  implication: The current Input.astro implementation EXACTLY matches the 24-02 plan's spec. The "no red" behavior is intentional, documented, and traceable to a deliberate UI-SPEC gap. The defect is therefore at the SPEC level (Phase 24's deferred destructive color), not the code level.

- timestamp: 2026-05-15
  checked: .planning/phases/24-v2-primitive-library-design-system-page/24-UAT.md lines 52–57 + 100–107
  found: Test 7 result is "issue", severity "cosmetic". The UAT user-facing truth ("Input error state shows red color treatment on the error message") DOES NOT match Phase 24's plan-locked behavior ("no red, by design"). UAT-level expectation diverges from PLAN-level acceptance criteria.
  implication: The user's UAT expectation is the conventional industry pattern (red error text). The codebase intentionally adopted a non-conventional "no red" pattern based on a UI-SPEC gap. Resolution requires either (a) extending the v2 token system to add a danger color and rewiring the error <p>, or (b) accepting the current "no red" behavior and updating UAT Test 7's expectation.

## Resolution

root_cause: |
  The Input error paragraph in src/components/v2/ui/Input.astro (line 56) renders with `class="text-small font-text text-text"`, which applies `--color-text` (navy oklch(0.225 0.044 264.6)) — the same color as default body copy. This is the exact code shipped per the 24-02 plan, which explicitly required "no red" error styling (lines 28, 220, 297) due to an upstream gap in the Phase 24 UI-SPEC's destructive color section. The v2 @theme in src/styles/v2/global.css defines no danger/error/red token (only 8 semantic colors: primary, primary-hover, surface, surface-muted, text, text-muted, border, accent). The error message therefore renders in navy text identical to body copy, with only `aria-invalid="true"`, `role="alert"`, and a `⚠` glyph prefix as differentiation — no color signal.

  This is a SPEC-LEVEL gap, not an implementation bug: the executor faithfully implemented what 24-02 required. The UAT truth ("error should be red") reflects the conventional industry pattern, which Phase 24 consciously deferred.

fix: (not applied — find_root_cause_only)
verification: (not applied — find_root_cause_only)
files_changed: []

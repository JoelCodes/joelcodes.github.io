---
status: diagnosed
trigger: "Select primitive (Input as='select') renders too thin and shows no selected text"
created: 2026-05-15T00:00:00Z
updated: 2026-05-15T00:00:00Z
---

## Current Focus

hypothesis: CONFIRMED. The wrapper `<div class="max-w-sm mb-lg">` around the select demo resolves to `max-width: 1rem (16px)` — NOT 24rem (384px) — because the v2 token redefinition of `--spacing-sm: 1rem` collides with Tailwind v4's `max-w-sm` generator, which (in the absence of a `--container-sm` token) falls back to `--spacing-sm`. The select's `w-full` then constrains it to ~16px of content area; with native select arrow and 16px horizontal padding, the rendered control is ~34px wide and clips the selected option text entirely.
test: Playwright getBoundingClientRect / getComputedStyle on #ds-budget and its ancestors.
expecting: parent `max-w-sm` width should be ~384px; actually measured 16px.
next_action: Return diagnosis (find_root_cause_only mode).

## Symptoms

expected: Select dropdown renders at same width as text input above it. Selected option text is visible inside closed-state select.
actual: Select renders "way too thin" (34px observed) and does NOT show "Select a range" or any other option text (no room after native arrow).
errors: None (visual/styling defect).
reproduction: npm run dev -> /design-system -> Inputs section -> observe select dropdown.
started: Phase 24 UAT (2026-05-15) - regression introduced by commit 8932a76 (`--space-* -> --spacing-*` rename).

## Eliminated

- hypothesis: Select missing `w-full` utility class
  evidence: Rendered HTML shows `class="w-full bg-surface text-text font-text text-body border border-border rounded-sm px-sm py-3 placeholder:text-text-muted"` — w-full IS present. Compiled CSS shows `.w-full{width:100%}` exists. The issue is the PARENT container width, not the select's own width utility.
  timestamp: 2026-05-15T00:00:00Z

- hypothesis: Select text color hidden (text-text not applied to select)
  evidence: Playwright computed-style measurement returned `color: oklch(0.225 0.044 264.6)` (which is `--color-text` navy) and `backgroundColor: oklch(1 0 0)` (white surface). Color contrast is correct. Text IS rendered with correct color — there is just no horizontal room for it because the select is 34px wide.
  timestamp: 2026-05-15T00:00:00Z

- hypothesis: Slot `<option>` content not being rendered inside select element
  evidence: Rendered HTML shows all 4 `<option>` elements correctly nested. JS measurement confirms `optionCount: 4` and `selectedText: "Select a range"`. Options ARE present; user just cannot SEE the text because the control is too narrow.
  timestamp: 2026-05-15T00:00:00Z

- hypothesis: Tailwind preflight `background-color: #0000` on select overrides bg-surface
  evidence: Computed style shows `backgroundColor: oklch(1 0 0)` (white) — bg-surface utility correctly overrides preflight transparent.
  timestamp: 2026-05-15T00:00:00Z

- hypothesis: `py-3` padding (Tailwind v4 numeric utility) not generating due to missing `--spacing` base
  evidence: Compiled CSS contains `.py-3{padding-block:calc(var(--spacing)*3)}` AND v4's automatic `--spacing: .25rem` default IS defined in the cascade. Padding correctly resolves to 12px (verified by computed style `paddingTop/Bottom: "12px"`).
  timestamp: 2026-05-15T00:00:00Z

## Evidence

- timestamp: 2026-05-15T00:00:00Z
  checked: src/components/v2/ui/Input.astro lines 40-54
  found: Class list `'w-full bg-surface text-text font-text text-body border border-border rounded-sm px-sm py-3'` applied to `<select>` correctly. `<slot />` renders `<option>` children inside the select. Component is correct.
  implication: Bug is NOT in Input.astro itself.

- timestamp: 2026-05-15T00:00:00Z
  checked: src/pages/design-system.astro lines 257-270
  found: Select demo is wrapped in `<div class="max-w-sm mb-lg">`. All other inputs are in a `grid grid-cols-1 md:grid-cols-2` parent (no max-w cap). Author's intent was to demonstrate select at a smaller width (`max-w-sm` is ostensibly Tailwind's 384px constraint).
  implication: This wrapper is the entry point of the defect — but `max-w-sm` SHOULD be 384px, not 16px.

- timestamp: 2026-05-15T00:00:00Z
  checked: dist/_astro/design-system.8EyWfAOu.css (compiled production CSS)
  found: `.max-w-sm{max-width:var(--spacing-sm)}` — references --spacing-sm (1rem / 16px), NOT a --container-sm token. Same pattern for max-w-md, max-w-lg, max-w-2xl. Only max-w-3xl..max-w-7xl resolve to --container-* (because v2 theme does not redefine those keys).
  implication: ROOT CAUSE LOCATED. The v2 theme redefinition of --spacing-sm/md/lg/xl/2xl hijacks the max-w-sm/md/lg/xl/2xl utilities. Tailwind v4's max-width utility generator uses --spacing-{size} as a fallback when --container-{size} is not defined.

- timestamp: 2026-05-15T00:00:00Z
  checked: src/styles/v2/global.css lines 26-31
  found: Theme defines `--spacing-xs: 0.5rem; --spacing-sm: 1rem; --spacing-md: 1.5rem; --spacing-lg: 2rem; --spacing-xl: 3rem; --spacing-2xl: 5rem;`. Comment on line 22 specifically notes "MUST use Tailwind v4's `--spacing-*` namespace so utilities like px-sm, py-md, gap-xs actually generate" — author was aware of the rename's impact on px/py/gap but did NOT anticipate the side-effect on max-w-*.
  implication: The token rename in commit 8932a76 successfully restored px/py/gap utilities (intended) but introduced a previously-unrecognized collision with max-w-* utilities (unintended).

- timestamp: 2026-05-15T00:00:00Z
  checked: Live browser measurement via Playwright on /design-system
  found:
    - `#ds-budget` (the select): width=34px, parentWidth=16px, grandparentWidth=16px, parentClass="flex flex-col gap-xs", grandparentClass="max-w-sm mb-lg"
    - `#ds-name` (sibling text input): width=468px (grid column at 1024px viewport)
    - select.color=oklch(0.225 0.044 264.6) (correct navy), select.backgroundColor=oklch(1 0 0) (correct white), select.appearance=auto (native arrow), select.selectedText="Select a range" (option correctly present)
  implication: Confirms the select element ITSELF is styled correctly. The defect is purely the wrapper's max-width: 16px collapsing the entire column to 16px content area (16px parent / 16px grandparent / 34px outer-box for select including 32px horizontal padding + 1px border each side). User reports of "thin" AND "no text" are both explained by the same cause: a 16px-wide content area cannot display readable text or even a native dropdown arrow with text alongside it.

- timestamp: 2026-05-15T00:00:00Z
  checked: src/components/v2/layout/Footer.astro
  found: `<p class="font-text text-text-muted max-w-md">` — uses max-w-md, which under the same collision now resolves to 24px (max-width: --spacing-md = 1.5rem). The footer "Web apps, automation, and AI development for small businesses." line should also visually break here, but UAT did not flag the footer (likely because the inner text content has a natural minimum and overflows, or because the user did not scroll/observe the footer paragraph carefully).
  implication: This is a second, latent occurrence of the same root-cause class. Fix scope should account for it; Footer paragraph is the only other v2 max-w-* usage in the repo.

## Resolution

root_cause: Tailwind v4 `max-w-{size}` utilities for `sm`, `md`, `lg`, `xl`, `2xl` resolve to `var(--spacing-{size})` (the v2 theme's t-shirt spacing tokens — 1rem, 1.5rem, 2rem, 3rem, 5rem) instead of Tailwind's default container widths (24rem, 28rem, 32rem, 42rem, etc.). The wrapper `<div class="max-w-sm mb-lg">` around the select demo in `src/pages/design-system.astro:258` therefore receives `max-width: 1rem (16px)` instead of the intended `24rem (384px)`. The select's `w-full` collapses to 16px of content area, leaving a 34px-wide native control that has no room to render the selected option's text. Symptom "too thin" and symptom "no selected text" both originate from the SAME 16px container clamp — they are not two separate defects.

fix: (NOT APPLIED — find_root_cause_only mode)

verification: (NOT APPLIED — find_root_cause_only mode)

files_changed: []

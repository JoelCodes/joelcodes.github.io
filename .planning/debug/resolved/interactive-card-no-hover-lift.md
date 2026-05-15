---
status: resolved
trigger: "Interactive Card does not lift on hover (UAT Phase 24 Gap)"
created: 2026-05-15T00:00:00Z
updated: 2026-05-15T22:08:00Z
resolved: 2026-05-15T22:08:00Z
closed_by: 24-06-PLAN.md
---

## Current Focus

hypothesis: (final, confirmed) The CSS is generated correctly and the hover lift IS being applied (`translate: 0px -2px` at hover, verified in headless Chromium). The defect is that `-translate-y-0.5` = 0.125rem = **2px** is a magnitude below the threshold of human visual perception for a card that is ~120px tall on a high-DPI display. The user sees "no lift" because the lift is technically present but visually imperceptible. The UI-SPEC prescribed `translateY(-2px)`; the implementation correctly translated that to `-translate-y-0.5`. The spec value is the root cause, not a missing token or non-generating utility.
test: (completed) Playwright headless probe of computed style at baseline and hover.
expecting: (met) `translate: 0px -2px` under hover; `--tw-translate-y: calc(0.25rem * -0.5)` resolves to -2px because Tailwind v4's `:root` provides `--spacing: .25rem` by default.
next_action: Return ROOT CAUSE FOUND. Do not fix (find_root_cause_only mode).

## Symptoms

expected: Hovering interactive Card on /design-system produces ~2px upward translateY (subtle lift).
actual: "The interactive card does not lift on hover, but it does get an accent green focus."
errors: None (visual defect).
reproduction: npm run dev → http://localhost:4321/design-system → scroll to Cards → hover the interactive card. No PERCEPTIBLE translate (actual translate is -2px, but imperceptible); focus ring works.
started: Discovered during UAT for Phase 24, 2026-05-15. Has likely never been visually convincing — the spec prescribed -2px from day one.

## Eliminated

- hypothesis: "Recent commit 8932a76 renamed --space-* to --spacing-* and that broke this utility because --spacing-* base token is missing for fractional resolution"
  evidence: Tailwind v4 ships a default `--spacing: .25rem` in `:root` (verified in dist CSS: `--spacing:.25rem`). The named `--spacing-xs/sm/md/lg/xl/2xl` tokens defined in v2's @theme do NOT clobber the base `--spacing`. Therefore `calc(var(--spacing) * -.5)` resolves correctly to `calc(0.25rem * -.5)` = `-0.125rem` = `-2px`.
  timestamp: 2026-05-15T00:15:00Z
- hypothesis: "The utility class is not generated in dist CSS"
  evidence: Grep of dist/_astro/design-system.BykOHk02.css confirms the rule IS generated: `.hover\:-translate-y-0\.5:hover{--tw-translate-y:calc(var(--spacing)*-.5);translate:var(--tw-translate-x)var(--tw-translate-y)}`. Also `@property --tw-translate-x/y` are registered with initial-value: 0.
  timestamp: 2026-05-15T00:15:00Z
- hypothesis: "transition-transform in Tailwind v4 doesn't transition the new `translate:` shorthand"
  evidence: `.transition-transform` in dist CSS is `transition-property:transform,translate,scale,rotate` — `translate` IS included.
  timestamp: 2026-05-15T00:15:00Z
- hypothesis: "Scoped Card <style> block is overriding or interfering"
  evidence: Only scoped rule is `div[data-astro-cid-nut46p5q]:focus-visible { outline:2px solid var(--color-accent); outline-offset:2px }`. No `translate` / `transform` in scoped CSS.
  timestamp: 2026-05-15T00:15:00Z
- hypothesis: "@media (hover: hover) is failing on the user's device"
  evidence: Playwright headless Chromium (default device profile = `(hover: hover)`) DOES apply the rule. While theoretically a touch-only device or DevTools touch emulation would block it, the user described "hover with mouse" on dev mode at localhost which means desktop Chrome/Safari/Firefox where `(hover: hover)` is true. Verified via CDP getMatchedStylesForNode under both natural and forced :hover — both produce `translate: 0px -2px` computed.
  timestamp: 2026-05-15T00:20:00Z

## Evidence

- timestamp: 2026-05-15T00:00:01Z
  checked: src/components/v2/ui/Card.astro lines 17-28
  found: Class list when interactive=true: `'cursor-pointer transition-transform duration-200 hover:-translate-y-0.5'`. Focus ring works (user-confirmed) → component is rendering correctly; defect is utility-generation only.
- timestamp: 2026-05-15T00:00:02Z
  checked: src/styles/v2/global.css @theme block
  found: Defines `--spacing-xs/sm/md/lg/xl/2xl` but NO base `--spacing`. (Initial hypothesis — later disproven; see Eliminated.)
- timestamp: 2026-05-15T00:10:00Z
  checked: dist/_astro/design-system.BykOHk02.css after `npm run build`
  found: Three relevant rules present:
    `.-translate-y-0\.5{--tw-translate-y:calc(var(--spacing)*-.5);translate:var(--tw-translate-x)var(--tw-translate-y)}`
    `.hover\:-translate-y-0\.5:hover{--tw-translate-y:calc(var(--spacing)*-.5);translate:var(--tw-translate-x)var(--tw-translate-y)}`
    `:root,:host{...--spacing:.25rem;...}`
    `@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}`
- timestamp: 2026-05-15T00:11:00Z
  checked: dist/_astro/design-system.BykOHk02.css for transition-transform rule
  found: `.transition-transform{transition-property:transform,translate,scale,rotate;...}` — includes `translate`, so the new shorthand IS transitioned.
- timestamp: 2026-05-15T00:12:00Z
  checked: dist/design-system/index.html for Card markup
  found: `<div tabindex="0" class="bg-surface border border-border rounded-lg overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-0.5" data-astro-cid-nut46p5q>`. Correct.
- timestamp: 2026-05-15T00:20:00Z
  checked: Playwright headless Chromium runtime probe (probe-hover.mjs) against `npm run dev` server
  found:
    BASELINE: `translate: "none"`, `--tw-translate-y: "0"`, `--spacing: "0.25rem"`
    HOVERED:  `translate: "0px -2px"`, `--tw-translate-y: "calc(0.25rem * -0.5)"`
    Forced-hover via CDP CSS.forcePseudoState confirms same result.
    The hover CSS works correctly — but the magnitude is -2px (translateY).
- timestamp: 2026-05-15T00:22:00Z
  checked: Comparison against v1 hover lift utilities — src/components/ProjectCard.astro and src/components/BlogCard.astro
  found: Both v1 cards use `hover:-translate-y-2` = -0.5rem = **-8px**. v2 Card uses `-translate-y-0.5` = **-2px** (4× smaller). 8px is clearly visible on a card; 2px is at or below the perceptible threshold for a subtle hover animation on high-DPI displays.
- timestamp: 2026-05-15T00:25:00Z
  checked: tests/accessibility/v2-primitives.spec.ts Test 7 (Card interactive) and Test 8 (spacing regression)
  found: Test 7 only asserts tabindex=0 + 2px solid accent outline at focus. NO test asserts translate at hover — Plan 24-02 verification doc explicitly notes "Animation feel not testable programmatically; hover:-translate-y-0.5 confirmed in source but browser rendering quality is subjective". Existing automated suite cannot catch this defect because it accepts the source-class presence as sufficient verification.
- timestamp: 2026-05-15T00:27:00Z
  checked: .planning/phases/24-v2-primitive-library-design-system-page/24-UI-SPEC.md line 235, line 316
  found: Spec literally states `translateY(-2px) with 200ms ease`. Implementation honors the spec verbatim. **The bug is in the spec value, not the implementation.** Spec intent was "small lift" but -2px is too small to be perceptible.
- timestamp: 2026-05-15T00:28:00Z
  checked: .planning/phases/24-v2-primitive-library-design-system-page/24-RESEARCH.md lines 564-568
  found: Research doc explicitly identified this risk: "If it doesn't render correctly, fall back to a scoped <style> transition block. Verify during Plan 24-02 implementation." The 24-02 SUMMARY (line 110) claims "Build confirmed this generates valid CSS" — but verification stopped at code-level (CSS rule present) and did not validate visual perceptibility.

## Resolution

root_cause: |
  The `hover:-translate-y-0.5` utility IS generating valid CSS and IS applying on hover (verified via headless Chromium: `translate: 0px -2px` at hover state, with the `--spacing: .25rem` Tailwind v4 default in :root resolving `calc(var(--spacing) * -.5)` correctly).
  
  However, **`-translate-y-0.5` = `translateY(-0.125rem)` = -2px**, which is too subtle to be perceptible to a user — especially on high-DPI / Retina displays where 2 logical pixels correspond to 4 device pixels of motion. The focus ring is clearly visible (2px solid outline with 2px offset = 4px total visual footprint at high contrast accent green), so the user can tell focus works but not hover.
  
  This is a **spec-value defect**: UI-SPEC §"Hover/Focus states" (line 235) prescribed `translateY(-2px)`, and the implementation correctly translated that into `-translate-y-0.5`. The spec intent of "subtle lift" became "imperceptible lift" because 2px is below the threshold where a subtle animation registers visually. The v1 cards (ProjectCard, BlogCard) use `-translate-y-2` (=-8px) which is the typical magnitude for a visible hover lift in this design space.
  
  Contributing factors that masked the defect during phase verification:
    1. Test 7 in v2-primitives.spec.ts asserts focus outline but never asserts the computed `translate` at hover.
    2. The spacing-regression guard (Test 8) only checks named utilities (px-sm, py-md, etc.) and does not exercise numeric utilities like -translate-y-0.5.
    3. 24-02-SUMMARY claims "Build confirmed this generates valid CSS" — verification went no further than rule presence.
    4. 24-VERIFICATION.md (line 161-164) deferred this to human visual judgment ("not testable programmatically") which then never got an explicit human sign-off step.

fix: (not applied — find_root_cause_only mode)

verification: (n/a)

files_changed: []

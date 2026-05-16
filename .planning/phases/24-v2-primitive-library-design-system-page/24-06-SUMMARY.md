---
phase: 24-v2-primitive-library-design-system-page
plan: "06"
plan_id: "24-06"
subsystem: components/v2/ui
gap_closure: true
closes_gap: "Interactive Card lifts perceptibly on hover"
tags: [tailwind-v4, card, hover-transform, playwright, regression-guard, uat-gap]
requires:
  - "24-01/02 (v2 component library — Button, Card, Input, Badge)"
  - "24-03 (v2-primitives.spec.ts base suite — 8 tests)"
  - "24-05 (max-width tokens + Test 9)"
provides:
  - "Card.astro hover:-translate-y-1 (-4px perceptible lift)"
  - "Test 7 hover lift magnitude assertion (ty <= -3px, UAT Gap 2 regression guard)"
  - "24-UI-SPEC.md lines 235 and 316 updated to translateY(-4px)"
affects: []
tech-stack:
  added: []
  patterns:
    - "Tailwind v4 CSS `translate` individual property (not `transform` matrix) — hover:-translate-y-1 generates getComputedStyle.translate='0px -4px', not a matrix"
    - "Playwright hover transition wait (300ms > 200ms duration) before sampling computed style"
key-files:
  created: []
  modified:
    - src/components/v2/ui/Card.astro
    - .planning/phases/24-v2-primitive-library-design-system-page/24-UI-SPEC.md
    - tests/accessibility/v2-primitives.spec.ts
decisions:
  - "Used hover:-translate-y-1 (-4px) over -translate-y-1.5 (-6px) — smallest perceptible step above the -2px threshold; stays subtle without matching v1's aggressive -8px"
  - "Used CSS `translate` individual property (not `transform` matrix) for hover assertion — Tailwind v4 hover:-translate-y-1 sets the CSS `translate` property; getComputedStyle.transform returns 'none'; parseTranslateTy() whitespace-splits '0px -4px' → ty=-4"
  - "Added page.waitForTimeout(300) after interactiveCard.hover() — CSS transition is 200ms; immediate read captures mid-animation value (~0); 300ms ensures full settlement"
metrics:
  duration: "5 minutes"
  completed: "2026-05-15"
---

# Phase 24 Plan 06: Card Hover Lift Gap Closure Summary

**One-liner:** Raised Card.astro hover lift from imperceptible -2px (`hover:-translate-y-0.5`) to perceptible -4px (`hover:-translate-y-1`); updated UI-SPEC lines 235 + 316; added Playwright regression guard asserting `ty <= -3px` using the CSS `translate` individual property.

## What Was Done

Closed UAT Gap 2 (minor): the interactive Card's hover lift was rendering (`translate: 0px -2px` confirmed via Playwright probe) but at -2px was below the visual perception threshold on ~120px-tall cards on Retina displays.

**Task 1:** Changed `src/components/v2/ui/Card.astro` line 22 from `hover:-translate-y-0.5` (-2px) to `hover:-translate-y-1` (-4px). All other Card.astro lines unchanged (focus-visible scoped style, tabindex attribute, shadow-md, overflow-hidden, base classes).

**Task 2:** Updated `.planning/phases/24-v2-primitive-library-design-system-page/24-UI-SPEC.md`:
- Line 235 (Component Inventory hover row): `translateY(-2px)` → `translateY(-4px)`
- Line 316 (Interaction Contract table): `translateY(-2px)` → `translateY(-4px)`

Duration (200ms ease) preserved on both rows.

**Task 3:** Added hover lift magnitude assertion inside Test 7 in `tests/accessibility/v2-primitives.spec.ts`.

## Chosen Magnitude

**`hover:-translate-y-1` (-4px)** — No escalation to -1.5 (-6px) was needed. The -4px value is:
- Above the -2px perception threshold (the defect)
- Subtle enough to match the "gentle lift" intent
- Well below v1's -8px (`hover:-translate-y-2`) which is more dramatic
- The smallest Tailwind numeric step up from the broken -0.5 utility

## Diff Summary

**`src/components/v2/ui/Card.astro`** — 1 line changed:
```
- interactive && 'cursor-pointer transition-transform duration-200 hover:-translate-y-0.5',
+ interactive && 'cursor-pointer transition-transform duration-200 hover:-translate-y-1',
```

**`.planning/phases/24-v2-primitive-library-design-system-page/24-UI-SPEC.md`** — 2 lines changed:
- Line 235: `-2px` → `-4px`
- Line 316: `-2px` → `-4px`

**`tests/accessibility/v2-primitives.spec.ts`** — 77 lines added (hover lift block inside Test 7).

## Parse Approach: CSS `translate` Individual Property

The plan offered two options: (a) transform matrix index 5, or (b) whitespace-split of `getComputedStyle.translate`. Option (b) was required.

**Discovery during testing:** Tailwind v4's `hover:-translate-y-1` generates the CSS `translate` individual property (CSS Transforms Level 2), NOT `transform: matrix(...)`. When hovered:
- `getComputedStyle(el).transform` → `"none"` (always, even when lifted)
- `getComputedStyle(el).translate` → `"0px -4px"` (correct Y translation)

The `parseTranslateTy` helper uses whitespace-split:
- `"none"` → `0`
- `"0px -4px"` (X Y form) → `parseFloat(parts[1])` = `-4`
- `"-4px"` (Y-only form, if X is omitted) → `parseFloat(parts[0])` = `-4`

This is the robust approach for Tailwind v4 transform utilities on Chromium.

## Transition Wait Requirement

A `page.waitForTimeout(300)` is required after `interactiveCard.hover()`. The 200ms CSS transition runs asynchronously — without the wait, Playwright reads the mid-animation value (~0.016px), which fails the `<= -3px` assertion. 300ms > 200ms transition duration ensures full settlement.

## Focus Ring Verification

The focus ring (outline 2px solid var(--color-accent), outline-offset: 2px) remains intact. Test 7's existing assertions (outlineWidth=2px, outlineOffset=2px, non-transparent outline color, tabIndexableCount=1) all continue to pass.

## Verification Commands

| Command | Exit Code | Output |
|---------|-----------|--------|
| `npm run build` | 0 | "17 page(s) built in 2.05s" |
| `grep -cE "hover:-translate-y-(1\|1\\.5)\\b" Card.astro` | — | 1 |
| `grep -c "hover:-translate-y-0.5" Card.astro` | — | 0 |
| `grep -c "translateY(-2px)" 24-UI-SPEC.md` | — | 0 |
| `grep -cE "translateY\\(-(4\|6)px\\)" 24-UI-SPEC.md` | — | 2 |
| `grep -cE "is:global\|dark:" Card.astro` | — | 0 |
| `npx playwright test tests/accessibility/v2-primitives.spec.ts` | 0 | 9 passed |

## Test Results

| Test | Name | Result |
|------|------|--------|
| Test 7 (extended) | Card with interactive=true is reachable by Tab and shows accent focus outline + hover lift | PASS |
| Tests 1-6, 8-9 | All existing v2-primitives tests | PASS |
| **Total** | **9/9 tests passing** | **PASS** |

## Decisions Made

| Decision | Context | Rationale |
|----------|---------|-----------|
| `-translate-y-1` (-4px) over `-translate-y-1.5` (-6px) | Task 1 magnitude choice | Smallest perceptible step up; stays subtle; v1 uses -8px which is more dramatic |
| CSS `translate` individual property over `transform` matrix | Task 3 parse approach | Tailwind v4 hover:-translate-y-* sets the CSS `translate` property, not `transform`; matrix reads "none" always |
| `page.waitForTimeout(300)` after hover | Task 3 animation settle | CSS `duration-200` transition runs asynchronously; immediate read captures ~0.016px mid-animation value; 300ms ensures full settlement |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Used CSS `translate` property instead of `transform` matrix in hover assertion**

- **Found during:** Task 3 first test run (hoverTy received 0 instead of -4)
- **Issue:** Tailwind v4 `hover:-translate-y-1` generates the CSS `translate` individual property (CSS Transforms Level 2), not `transform: matrix()`. The plan's primary recommended approach (parse matrix index 5 from `getComputedStyle.transform`) returned "none" always, even when the card was hovered and lifted.
- **Fix:** Replaced `parseMatrixTy` (reads `transform`) with `parseTranslateTy` (reads `translate`, whitespace-splits "0px -4px"). This is exactly the "string-split fallback" approach mentioned in the plan's Task 3 notes as an acceptable alternative.
- **Files modified:** `tests/accessibility/v2-primitives.spec.ts`

**2. [Rule 1 - Bug] Added `page.waitForTimeout(300)` after hover() to let CSS transition settle**

- **Found during:** Task 3 second test run after switching to `translate` property (hoverTy received -0.0158664 instead of -4)
- **Issue:** The CSS `translate` property is animated by `transition-transform duration-200`. Playwright's `hover()` triggers `:hover` synchronously but the CSS transition runs asynchronously. Reading `getComputedStyle.translate` immediately after hover captures the transition start (~0px), not the final value (-4px).
- **Fix:** Added `await page.waitForTimeout(300)` between `interactiveCard.hover()` and the `getComputedStyle.translate` read. 300ms > 200ms transition ensures the animation fully settles.
- **Files modified:** `tests/accessibility/v2-primitives.spec.ts`

## Next Phase Readiness

UAT Gap 2 closed. The interactive Card now lifts perceptibly (-4px) on hover. Test 7 permanently guards against regression to imperceptible lift values.

No blockers for proceeding to Gap 3 (plan 24-07).

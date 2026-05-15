---
phase: 24-v2-primitive-library-design-system-page
plan: "05"
plan_id: "24-05"
subsystem: styles/v2
gap_closure: true
closes_gap: "Select primitive renders at usable width and shows selected text"
tags: [tailwind-v4, css-tokens, max-width, regression-guard, playwright]
requires:
  - "24-03 (v2-primitives.spec.ts base suite — 8 tests)"
  - "24-01/02 (v2 component library — Button, Card, Input, Badge)"
provides:
  - "--max-width-sm/md/lg/xl/2xl tokens in v2 @theme (5 additive tokens)"
  - "Test 9 (container-namespace regression guard) in v2-primitives.spec.ts"
affects: []
tech-stack:
  added: []
  patterns:
    - "Tailwind v4 --max-width-* namespace for max-w-{size} utilities (highest priority over --spacing-* and --container-*)"
key-files:
  created: []
  modified:
    - src/styles/v2/global.css
    - tests/accessibility/v2-primitives.spec.ts
decisions:
  - "Use --max-width-* tokens (not --container-*) — Tailwind v4.1.18 lookup order for max-w-{name} is [--max-width-{name}, --spacing-{name}, --container-{name}]; --spacing-sm wins over --container-sm so container tokens alone don't fix the collision"
metrics:
  duration: "7 minutes"
  completed: "2026-05-15"
---

# Phase 24 Plan 05: Max-Width Token Fix + Regression Guard Summary

**One-liner:** Added `--max-width-sm/md/lg/xl/2xl` tokens to v2 @theme so `max-w-sm` resolves to 24rem (384px) instead of `--spacing-sm` (1rem = 16px), fixing the collapsed select demo wrapper and Footer tagline.

## What Was Done

Closed UAT Gap 1 (major): the select demo wrapper at `src/pages/design-system.astro:258` rendered at 16px wide because `max-w-sm` was resolving to `var(--spacing-sm)` = 1rem = 16px. The select's `w-full` inside collapsed to 16px, making the selected option text invisible.

**Task 1:** Added 5 `--max-width-*` tokens to `src/styles/v2/global.css` `@theme` block.

**Task 2:** Added Test 9 to `tests/accessibility/v2-primitives.spec.ts` asserting computed widths ≥ 300px for both the select demo wrapper and the Footer tagline.

## Diff Summary

**`src/styles/v2/global.css`** — 15 lines added (comment block + 5 token declarations):
```
  --max-width-sm:  24rem;  /* 384px */
  --max-width-md:  28rem;  /* 448px */
  --max-width-lg:  32rem;  /* 512px */
  --max-width-xl:  36rem;  /* 576px */
  --max-width-2xl: 42rem;  /* 672px */
```

**`tests/accessibility/v2-primitives.spec.ts`** — 50 lines added (Test 9, 3-site assertion block): 322 → 372 lines.

## Computed Width: Before and After

| Element | Selector | Before (broken) | After (fixed) |
|---------|----------|-----------------|---------------|
| Select demo wrapper | `section#input div.max-w-sm` | 16px | 384px |
| Select element | `section#input #ds-budget` | ~34px | ~384px |
| Footer tagline | `footer p.max-w-md` | 24px | 448px |

Playwright Test 9 confirms all three assert ≥ 300px on the chromium 1280px viewport.

## Root Cause (Corrected from Diagnosis)

The debug doc hypothesized that Tailwind v4 prefers `--container-{name}` over `--spacing-{name}` for `max-w-*`. However, inspecting Tailwind v4.1.18 source (`node_modules/tailwindcss/dist/chunk-CT46QCH7.mjs`) reveals the actual lookup order:

```
["max-w", ["--max-width", "--spacing", "--container"], "max-width"]
```

Priority: `--max-width-{name}` > `--spacing-{name}` > `--container-{name}`

Since `--spacing-sm = 1rem` was declared in the v2 @theme block, it took priority over any `--container-sm` token. The correct fix is declaring `--max-width-sm/md/lg/xl/2xl` (highest priority namespace), not `--container-*`.

## Token Collision Guard Output

```
OK: no token name collisions between src/styles/global.css and src/styles/v2/global.css
(checked 45 v1 names, 39 v2 names)
```

No `--max-width-*` tokens exist in v1 (`src/styles/global.css`) — additive change is safe.

## Test Results

| Test | Name | Result |
|------|------|--------|
| Test 8 | Named-spacing regression guard (px-sm/py-md/gap-xs/mb-lg) | PASS |
| Test 9 | Container-namespace regression guard (max-w-sm wrapper + Footer max-w-md) | PASS |
| Tests 1-7 | All existing v2-primitives tests | PASS |
| **Total** | **9/9 tests passing** | **PASS** |

## Verification Commands

| Command | Exit Code | Output |
|---------|-----------|--------|
| `node tests/check-token-collision.cjs` | 0 | "OK: no token name collisions" |
| `npm run build` | 0 | "17 page(s) built in 2.22s" |
| `test -f dist/design-system/index.html` | 0 | file exists |
| `npx playwright test tests/accessibility/v2-primitives.spec.ts --reporter=line` | 0 | 9 passed |
| `grep -cE "^\s*--max-width-(sm\|md\|lg\|xl\|2xl):" src/styles/v2/global.css` | — | 5 |
| `grep -cE "^\s*--spacing-(xs\|sm\|md\|lg\|xl\|2xl):" src/styles/v2/global.css` | — | 6 (untouched) |

## Decisions Made

| Decision | Context | Rationale |
|----------|---------|-----------|
| `--max-width-*` tokens over `--container-*` | Task 1 implementation | Tailwind v4.1.18 lookup order for max-w-{name} is [--max-width-{name}, --spacing-{name}, --container-{name}] — the plan's diagnosis was incorrect about which namespace wins; --max-width-* is the only correct fix |
| Lower-bound 300px assertion (not exact 384px) | Test 9 design | Robust to minor layout differences; still catches the broken state (16px / 24px) with wide margin |
| Footer tagline assertion included in Test 9 | Test scope | Single-token regression (only --max-width-md removed) would otherwise ship silently; covers both observed AND latent same-defect sites |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Used `--max-width-*` tokens instead of plan-specified `--container-*` tokens**

- **Found during:** Task 1 verification (Test 9 failed with wrapperWidthPx=16 after adding --container-* tokens)
- **Issue:** Tailwind v4.1.18 resolves `max-w-{name}` with lookup order `[--max-width-{name}, --spacing-{name}, --container-{name}]`. The plan's diagnosis assumed `--container-*` would win over `--spacing-*`, but `--spacing-*` is actually second (higher priority) in the lookup chain. Adding `--container-sm: 24rem` did nothing because `--spacing-sm: 1rem` was already matched first.
- **Fix:** Replaced all 5 `--container-*` tokens with `--max-width-*` tokens (same values: 24/28/32/36/42 rem). Amended Task 1 commit accordingly.
- **Files modified:** `src/styles/v2/global.css`
- **Commit:** `4e9d84c`
- **Note:** The plan's must_haves reference `--container-sm:` as the expected artifact, but this is superseded by the corrected implementation. The OBJECTIVE and test criteria (computed width ≥ 300px) are fully satisfied.

## Next Phase Readiness

UAT Gap 1 closed. The select demo wrapper and Footer tagline both render at correct container widths. Test 9 provides a permanent regression guard against the namespace-collision class of bug.

No blockers for proceeding to Gap 2 (plan 24-06) or Gap 3 (plan 24-07).

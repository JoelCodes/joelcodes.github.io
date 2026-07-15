---
phase: 33-token-foundation-fonts
plan: "03"
subsystem: accessibility
tags: [contrast, wcag, a11y, tokens, tdd, scripts]

dependency_graph:
  requires: ["33-01"]
  provides: ["FOUND-03", "companion-token-accent-soft-text"]
  affects: ["33-04", "phase-35-components", "phase-41-quality-gate"]

tech_stack:
  added: []
  patterns:
    - "Inline W3C WCAG 2.x relative-luminance formula (zero deps)"
    - "Node built-in test runner (node:test + node:assert/strict)"
    - "TDD RED/GREEN/REFACTOR gate pattern"
    - "Text-use vs. decorative distinction in contrast gate"

key_files:
  created:
    - scripts/check-contrast.mjs
    - scripts/check-contrast.test.mjs
  modified: []

decisions:
  - id: D-09
    summary: "Companion --wl-accent-soft-text derived by minimal same-hue darkening to 4.55:1"
  - id: D-10
    summary: "Script committed but NOT wired into CI or package.json scripts — re-run manually"
  - id: D-11
    summary: "Pair matrix covers mockup-observed text-on-background combinations only, both themes"
  - id: D-12
    summary: "No approval gate on companion — derived automatically, documented here for 33-04"

metrics:
  duration: "~4m"
  completed: "2026-07-15"
---

# Phase 33 Plan 03: WCAG AA Contrast Gate Summary

**One-liner:** Zero-dep contrast gate with inline W3C formula proves WCAG AA for all 17 `--wl-*` text-on-background pairs; accent-soft failure caught and remedied with `--wl-accent-soft-text = #347E7B` (4.55:1 on paper).

---

## What Was Built

`scripts/check-contrast.mjs` — a committed, re-runnable ESM script implementing the W3C WCAG 2.x relative-luminance formula with zero npm dependencies. It exports four pure functions (`hexToRgb`, `linearize`, `relativeLuminance`, `contrastRatio`) and runs a 17-pair contrast matrix over every mockup-observed text-on-background combination in both light and dark themes.

`scripts/check-contrast.test.mjs` — 15 unit tests using Node's built-in `node:test` runner. Tests prove the formula against W3C reference values (black-on-white = 21:1, canonical AA boundary grey `#767676` on white ≈ 4.54:1, identical-colour = 1:1, order-independence).

---

## TDD Execution Log

| Gate | Commit | Description |
|------|--------|-------------|
| RED | `5629a3f` | `test(33-03)`: 15 failing tests for formula functions + known accent-soft failure |
| GREEN | `bf93edb` | `feat(33-03)`: W3C formula + full PAIRS matrix, all tests pass, exits 0 |
| REFACTOR | `6c75e28` | `refactor(33-03)`: updated companion to true minimum `#347E7B` (4.55:1) |

---

## Companion Token Derivation (FOUND-03 / D-09)

### The Known Failure

`--wl-accent-soft` (`#5AA9A5`) on `--wl-paper` (`#F6FBFA`) for small body text:

- Contrast ratio: **2.63:1**
- WCAG AA normal text threshold: 4.5:1
- WCAG AA large text threshold: 3:1
- Result: **FAIL** — does not meet either threshold

`#5AA9A5` is therefore restricted to **decorative and illustration use only**. It must not be used as a text colour for body copy (any size), labels, or links on the paper background.

### Companion Token: `--wl-accent-soft-text`

Derivation method: same OKLCH hue (h ≈ 186°), chroma held constant, lightness reduced in minimal steps until `contrastRatio(hex, #F6FBFA) >= 4.5`.

| Step | Hex | Ratio on Paper | Status |
|------|-----|----------------|--------|
| Original | `#5AA9A5` | 2.63:1 | FAIL |
| Step -1 | `#36807D` | 4.43:1 | FAIL |
| Step -2 | `#357F7C` | 4.49:1 | FAIL |
| **Minimum** | **`#347E7B`** | **4.55:1** | **PASS** |

**`--wl-accent-soft-text` light value: `#347E7B` (ratio: 4.55:1 on `#F6FBFA`)**

**`--wl-accent-soft-text` dark value: `#7FC4C0`** (same as dark accent-soft; dark paper `#0C2228` gives 8.28:1 — already passes without darkening)

---

## Full Pair Matrix Results

### Light Theme

| Pair | Ratio | Threshold | Status |
|------|-------|-----------|--------|
| ink `#12333B` on paper `#F6FBFA` | 12.86:1 | 4.5 | PASS |
| sub `#35525A` on paper `#F6FBFA` | 8.02:1 | 4.5 | PASS |
| accent `#0E7078` on paper `#F6FBFA` | 5.57:1 | 4.5 | PASS |
| **accent-soft-text `#347E7B` on paper** | **4.55:1** | **4.5** | **PASS** |
| accent-soft `#5AA9A5` on paper [DECORATIVE] | 2.63:1 | 3 | INFO |
| ink `#12333B` on sea-glass `#E6F1F1` | 11.66:1 | 4.5 | PASS |
| sub `#35525A` on sea-glass `#E6F1F1` | 7.27:1 | 4.5 | PASS |
| accent `#0E7078` on sea-glass `#E6F1F1` | 5.05:1 | 4.5 | PASS |
| ink `#12333B` on sea-glass-deep `#D2E7E7` | 10.45:1 | 4.5 | PASS |

### Dark Theme

| Pair | Ratio | Threshold | Status |
|------|-------|-----------|--------|
| ink `#EAF6F3` on paper `#0C2228` | 14.88:1 | 4.5 | PASS |
| sub `#A9C9C7` on paper `#0C2228` | 9.31:1 | 4.5 | PASS |
| accent `#4FB3B8` on paper `#0C2228` | 6.64:1 | 4.5 | PASS |
| **accent-soft-text `#7FC4C0` on paper** | **8.28:1** | **4.5** | **PASS** |
| accent-soft `#7FC4C0` on paper [DECORATIVE] | 8.28:1 | 3 | PASS |
| ink `#EAF6F3` on sea-glass `#123640` | 11.66:1 | 4.5 | PASS |
| sub `#A9C9C7` on sea-glass `#123640` | 7.29:1 | 4.5 | PASS |
| accent `#4FB3B8` on sea-glass `#123640` | 5.21:1 | 4.5 | PASS |

**Gate result: PASS** — all 16 text-use pairs pass WCAG AA 4.5:1. 1 decorative/informational row noted.

---

## Handoff to Plan 33-04

Plan 33-04 must add these companion tokens to `@theme` in `src/styles/global.css`:

```css
/* Companion token — text use of accent-soft (AA-compliant) */
--color-wl-accent-soft-text: #347E7B;     /* light: 4.55:1 on #F6FBFA */
```

And in the `.dark {}` block:

```css
--color-wl-accent-soft-text: #7FC4C0;    /* dark: 8.28:1 on #0C2228 */
```

---

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Tightened companion to true minimum darkening**

- **Found during:** REFACTOR gate
- **Issue:** Initial companion `#2D7A76` (4.83:1) was more aggressively darkened than needed. True minimum is `#347E7B` (4.55:1), preserving more of the original teal hue.
- **Fix:** Sequential hex search confirmed `#347E7B` as the first value to clear 4.5:1.
- **Files modified:** `scripts/check-contrast.mjs`
- **Commit:** `6c75e28`

**2. [Rule 2 - Missing Critical] Text-use vs. decorative flag in PAIRS**

- **Found during:** GREEN phase — accent-soft on paper at 3:1 threshold was failing even the large-text threshold, which would cause exit 1 when the plan explicitly says decorative rows should not block the gate.
- **Fix:** Added `textUse` boolean as 5th element in each PAIRS row; only text-use failures count toward `textFailed` and exit code.
- **Files modified:** `scripts/check-contrast.mjs`
- **Commit:** `bf93edb`

---

## Success Criteria Verification

- [x] RED commit (failing tests) precedes GREEN commit (implementation) — `5629a3f` before `bf93edb`
- [x] `node --test scripts/check-contrast.test.mjs` passes — 15/15 pass
- [x] `node scripts/check-contrast.mjs` exits 0 — all text-use pairs pass
- [x] `--wl-accent-soft-text` companion derived and documented (`#347E7B`, 4.55:1)
- [x] `grep -c "accent-soft" scripts/check-contrast.mjs` = 17 (>= 1)
- [x] Script NOT referenced in `package.json` scripts
- [x] Script NOT in any CI workflow
- [x] SUMMARY.md committed (this file)

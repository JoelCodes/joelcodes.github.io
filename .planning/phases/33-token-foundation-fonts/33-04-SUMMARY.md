---
phase: 33-token-foundation-fonts
plan: "04"
subsystem: ui
tags: [tokens, tailwind, css-custom-properties, design-tokens, dark-mode, wcag, figma]

dependency_graph:
  requires:
    - phase: "33-01"
      provides: "Figma extraction artifact with all 8 --wl-* light+dark hex values"
    - phase: "33-03"
      provides: "FOUND-03 companion --color-wl-accent-soft-text (#347E7B light, #7FC4C0 dark)"
  provides:
    - "8 --color-wl-* palette tokens in @theme (light values, Figma-traced)"
    - "Plain .dark {} block flipping all 8 tokens to dark values"
    - "--color-wl-accent-soft-text companion in @theme and .dark"
    - "--font-wl-heading and --font-wl-body font-family tokens"
    - "@layer base body default: font-family + line-height 1.6"
  affects:
    - "33-05 (type ramp utilities — consume --font-wl-heading, --font-wl-body)"
    - "phase-34 (header/nav — consume --color-wl-ink, --color-wl-paper, --color-wl-accent)"
    - "phase-35 (components — all bg-wl-*/text-wl-* Tailwind utilities from these tokens)"
    - "phase-41 (cleanup — old neobrutalist block removal)"

tech-stack:
  added: []
  patterns:
    - "Plain @theme block (no 'inline') for Tailwind 4 CSS-first token definition"
    - "Plain .dark {} block (NOT second @theme) for runtime dark mode semantic flip"
    - "@layer base body rule for WL font default that yields to utility-class overrides"
    - "Namespace isolation via --wl- prefix with isolation comment banner"

key-files:
  created: []
  modified:
    - src/styles/global.css

key-decisions:
  - "Two @theme blocks: new --wl-* block ABOVE existing neobrutalist block with isolation comment (D-02, T-07)"
  - "Plain .dark {} block (not second @theme) ensures CSS cascade runtime flip works with existing .dark class toggle"
  - "--color-wl-sea-glass-deep omitted from .dark block (keep-light per D-04 FIDELITY-GAP — no dark evidence in Figma)"
  - "--color-wl-line light value expressed as color-mix(in oklch, #0E7078 16%, transparent); dark value as literal #5AA9A538"
  - "@layer base body line-height set to 1.6 per Figma body style (Text/Body row in extraction artifact)"

patterns-established:
  - "Token pattern: --color-wl-* in @theme light, redefined in .dark for dark; never dark: variant pairs"
  - "Companion token pattern: --color-wl-accent-soft-text for AA-failing text use of accent-soft"

metrics:
  duration: "~8m"
  completed: "2026-07-14"
---

# Phase 33 Plan 04: @theme Token Block Summary

**8 Figma-traced --color-wl-* palette tokens in isolated @theme + plain .dark flip + @layer base body default with Hanken Grotesk and line-height 1.6**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-07-14T17:37:00Z
- **Completed:** 2026-07-14T17:45:00Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- New `@theme` block (plain, not inline) placed above neobrutalist block with namespace isolation comment; all 8 `--color-wl-*` tokens defined with Figma-traced light hex values
- Plain `.dark {}` block redefines 7 tokens with dark values (sea-glass-deep keep-light per FIDELITY-GAP); uses existing `.dark` class toggle mechanism with no new JS
- `--color-wl-accent-soft-text` companion (#347E7B light, #7FC4C0 dark) wired from FOUND-03
- `--font-wl-heading` and `--font-wl-body` family stacks defined in same `@theme` block
- `@layer base body` rule applies Hanken Grotesk + 1.6 line-height; existing `font-body` utility on old pages wins via utility-over-base specificity (D-08)

## Token Values Written

### Light (@theme block)

| CSS Custom Property | Light Value | Source |
|---------------------|-------------|--------|
| `--color-wl-ink` | `#12333B` | figma-var |
| `--color-wl-sub` | `#35525A` | figma-var |
| `--color-wl-accent` | `#0E7078` | figma-var |
| `--color-wl-accent-soft` | `#5AA9A5` | figma-var |
| `--color-wl-sea-glass` | `#E6F1F1` | figma-var |
| `--color-wl-sea-glass-deep` | `#D2E7E7` | palette sheet node 4:25 |
| `--color-wl-paper` | `#F6FBFA` | figma-var + palette sheet |
| `--color-wl-line` | `color-mix(in oklch, #0E7078 16%, transparent)` | figma-var |
| `--color-wl-accent-soft-text` | `#347E7B` | FOUND-03 companion (4.55:1 on paper) |

### Dark (.dark block)

| CSS Custom Property | Dark Value | Source |
|---------------------|------------|--------|
| `--color-wl-ink` | `#EAF6F3` | figma-var (dark mode) |
| `--color-wl-sub` | `#A9C9C7` | figma-var (dark mode) |
| `--color-wl-accent` | `#4FB3B8` | figma-var (dark mode) |
| `--color-wl-accent-soft` | `#7FC4C0` | figma-var (dark mode) |
| `--color-wl-sea-glass` | `#123640` | figma-var (dark mode) |
| `--color-wl-sea-glass-deep` | *(keep light #D2E7E7)* | FIDELITY-GAP — omitted from .dark |
| `--color-wl-paper` | `#0C2228` | figma-var (dark mode) |
| `--color-wl-line` | `#5AA9A538` | figma-var (dark mode) |
| `--color-wl-accent-soft-text` | `#7FC4C0` | FOUND-03 companion (8.28:1 on dark paper) |

### FIDELITY-GAPS (tokens keeping light value in dark mode)

- `--color-wl-sea-glass-deep` (`#D2E7E7`): no dark evidence in Figma variables or dark mockup frame 117:103. Keeps light value per D-04. Needs Figma review.

## Task Commits

Each task was committed atomically (Tasks 1 and 2 share one commit since @layer base references `--font-wl-body` defined in Task 1):

1. **Task 1 + Task 2: Add --wl-* @theme block, .dark flip, and @layer base body** — `22e8ae9` (feat)

**Plan metadata:** (see below)

## Files Created/Modified

- `src/styles/global.css` — Added new `@theme` block with 9 `--color-wl-*` tokens (8 palette + companion) + 2 `--font-wl-*` tokens; plain `.dark {}` flip block for 8 tokens (sea-glass-deep keep-light); `@layer base body` with `font-family` + `line-height: 1.6`

## Decisions Made

- Tasks 1 and 2 committed together — `@layer base body` references `--font-wl-body` which was defined in Task 1; they are logically dependent and atomically correct together
- `--color-wl-line` light: `color-mix(in oklch, #0E7078 16%, transparent)` rather than the hex `#0E7070` alpha form — stays in the CSS-native color-mix idiom recorded in the extraction artifact
- `--color-wl-line` dark: literal `#5AA9A538` rather than a color-mix expression — the extraction artifact records this as the dark variable value directly

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## Verification

- `npm run build`: PASS (16 pages built, zero errors)
- `node scripts/check-contrast.mjs`: PASS (all 16 text-use pairs pass WCAG AA 4.5:1; 1 decorative INFO row)
- `grep -c "EXTRACT FROM FIGMA\|\[FIGMA VALUE\]\|PLACEHOLDER" src/styles/global.css`: 0
- `grep "@theme inline" src/styles/global.css`: (none)
- `grep -c "color-wl-" src/styles/global.css`: 17
- `.dark { --color-wl-paper` present: PASS
- `@layer base body` with `font-family: var(--font-wl-body)` and `line-height: 1.6`: PASS

## Next Phase Readiness

- 33-05 (type ramp utilities) can consume `--font-wl-heading` and `--font-wl-body` tokens; Tailwind will auto-generate `bg-wl-*` and `text-wl-*` utilities from the `--color-wl-*` tokens
- Dark mode works via existing `.dark` class toggle with no new JS
- Old neobrutalist pages unaffected (namespace isolation intact; `@layer base body` yields to `font-body` utility class)
- No blockers for downstream phases

---
*Phase: 33-token-foundation-fonts*
*Completed: 2026-07-14*

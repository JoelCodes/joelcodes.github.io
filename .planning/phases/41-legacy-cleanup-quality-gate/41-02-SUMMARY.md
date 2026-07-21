---
phase: 41-legacy-cleanup-quality-gate
plan: 02
subsystem: ui
tags: [tailwindcss, css-tokens, global-css, neobrutalist-purge, wl-tokens, dark-mode]

requires:
  - phase: 41-01-CLEAN-01
    provides: orphaned legacy components deleted so CLEAN-02 grep returns zero without false positives from deleted files

provides:
  - global.css purged to --wl-* system + base only (no old neobrutalist @theme or @layer utilities)
  - BaseLayout <body> migrated from old bg-bg-light/text-text-light/font-body to bg-wl-paper/text-wl-ink
  - CLEAN-02 requirement satisfied (both greps return zero)

affects:
  - 41-03 CLEAN-03: CLAUDE.md rewrite should reflect that old tokens are gone
  - 41-04 QUAL-01: axe tests run against the purged token system
  - 41-05 QUAL-02/QUAL-03: Lighthouse + visual gate operates on the purged build

tech-stack:
  added: []
  patterns:
    - "CLEAN-02 purge pattern: delete old @theme block + old @layer utilities in one commit, update BaseLayout body simultaneously to avoid silent styling gaps"

key-files:
  created: []
  modified:
    - src/styles/global.css
    - src/layouts/BaseLayout.astro

key-decisions:
  - "Deleted the stale comment 'Authored below untouched .prose scope (Phase 41 will delete .prose)' from the wl-prose section header — it referred to the now-deleted .prose block and caused the .prose grep to match"
  - "Removed stale body comment 'Utility classes (e.g. font-body on existing <body>) win over @layer base' — referred to old architecture"
  - "font-body removed (not replaced with font-wl-body) because @layer base already sets font-family: var(--font-wl-body) on body — utility is redundant"

patterns-established:
  - "Bottom-up deletion pattern: delete blocks from bottom to top of file so earlier line numbers stay valid during multi-delete"

requirements-completed: [CLEAN-02]

duration: 8min
completed: 2026-07-21
---

# Phase 41 Plan 02: CLEAN-02 Token Purge Summary

**Old neobrutalist @theme + @layer utilities (yellow/turquoise/magenta, shadow-neo, iso-*, .prose, .toc) stripped from global.css; BaseLayout body migrated to bg-wl-paper/text-wl-ink; both CLEAN-02 greps return zero; npm run build exits 0**

## Performance

- **Duration:** 8 min
- **Started:** 2026-07-21T23:50:00Z
- **Completed:** 2026-07-21T23:58:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Deleted 445 lines of dead CSS: old `@theme` block (--color-yellow/turquoise/magenta, --color-bg-*, --color-text-*, --border-neo*, --spacing-neo*, --font-heading, --font-body, --text-*, --leading-*), old `@layer utilities` (.text-yellow-text, .shadow-neo-*, .iso-*), `.project-card`/`.blog-card` animation classes + `@keyframes fadeInScale`, `.toc` block, and `.prose` block
- Preserved `@custom-variant dark` (line mandatory for Tailwind 4 dark: variant), all --wl-* tokens, .wl-prose, WL TYPE RAMP + WL CHROME utilities
- Migrated BaseLayout `<body>` from `font-body bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark` to `bg-wl-paper text-wl-ink`

## Task Commits

1. **Task 1+2: Purge global.css + migrate BaseLayout body** - `ed392c0` (feat)

## Files Created/Modified

- `src/styles/global.css` - 445 lines deleted; only --wl-* system + base + wl-prose + wl type ramp/chrome remain
- `src/layouts/BaseLayout.astro` - `<body>` class updated to bg-wl-paper text-wl-ink

## Decisions Made

- Tasks 1 and 2 committed together (plan notes they must be simultaneous — deleting old @theme without updating BaseLayout would silently break body styling)
- `font-body` removed without replacement: `@layer base { body { font-family: var(--font-wl-body) } }` already covers it
- `dark:bg-wl-paper` and `dark:text-wl-ink` omitted from body class (token flips automatically via .dark block in global.css — explicit dark: duplicates are harmless but redundant; kept minimal per RESEARCH mapping)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Stale comment in wl-prose section header caused .prose grep to match**
- **Found during:** Task 1 verification
- **Issue:** The wl-prose section header comment read "Authored below untouched .prose scope (Phase 41 will delete .prose)" — `.prose` appears in the comment text, triggering the task acceptance grep
- **Fix:** Removed the stale comment line (the .prose block is now deleted; the comment was a leftover authoring note)
- **Files modified:** src/styles/global.css
- **Verification:** grep -n "\.prose\b" src/styles/global.css returns zero
- **Committed in:** ed392c0

**2. [Rule 1 - Bug] Stale comment in @layer base caused font-body supplemental grep to match**
- **Found during:** Task 2 verification (supplemental grep)
- **Issue:** Comment "Utility classes (e.g. font-body on existing <body>) win over @layer base — old pages unaffected" in the @layer base block caused `grep -rn "font-body" src/` to return a match
- **Fix:** Removed the stale comment (no old pages remain; comment was from Phase 33 coexistence period)
- **Files modified:** src/styles/global.css
- **Verification:** Supplemental grep returns zero
- **Committed in:** ed392c0

---

**Total deviations:** 2 auto-fixed (both Rule 1 - stale comments triggering grep false positives)
**Impact on plan:** Both fixes necessary for CLEAN-02 grep to return true zero. No scope creep.

## Issues Encountered

None — purge executed cleanly. CLEAN-02 verification gates all pass.

## CLEAN-02 Verification Results

| Gate | Command | Result |
|------|---------|--------|
| @custom-variant dark preserved | `grep -c "@custom-variant dark" src/styles/global.css` | 1 |
| Old neobrutalist tokens removed | `grep -n "shadow-neo\|iso-shadow\|--border-neo\|--font-heading\|--color-yellow\|\.prose\b..." src/styles/global.css` | 0 matches |
| CLEAN-02 primary grep | `grep -rn "var(--color-yellow\|var(--font-heading\|var(--border-neo\|bg-yellow\|shadow-neo\|iso-shadow" src/` | 0 matches |
| Supplemental BaseLayout grep | `grep -rn "font-body\|bg-bg-light\|bg-bg-dark\|text-text-light\|text-text-dark" src/` | 0 matches |
| Build | `npm run build` | exit 0, 6 pages built |

## Next Phase Readiness

- CLEAN-02 requirement satisfied; ready for CLEAN-03 (41-03, already completed)
- Build is green; dark mode via @custom-variant dark is intact
- No blockers

---
*Phase: 41-legacy-cleanup-quality-gate*
*Completed: 2026-07-21*

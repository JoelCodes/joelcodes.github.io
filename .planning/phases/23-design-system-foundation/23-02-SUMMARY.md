---
phase: 23-design-system-foundation
plan: 02
subsystem: design-tokens
tags: [design-system, tailwind-v4, fontsource, css-custom-properties, v2, oklch]

requires:
  - phase: 23-01
    provides: verified Crito font families + OKLCH palette + 33-row token mapping table + npm package versions
provides:
  - src/styles/v2/global.css with the full v2 @theme block (33 tokens) in an isolated v2/ namespace
  - Self-hosted variable fonts (Plus Jakarta Sans + Inter) installed and pinned at ^5.2.8
  - tests/check-token-collision.cjs — programmatic D-08 enforcement gate (exits 1 on any v1↔v2 name overlap)
  - v1-collision-safe naming for weight + leading tokens: --font-weight-display/-text/-text-bold and --leading-display/-text
affects: [23-03, 23-04, 24-01, 24-02, 24-03, 24-04, 25, 26, 27, 28, 29, 30]

tech-stack:
  added:
    - "@fontsource-variable/plus-jakarta-sans@^5.2.8 — self-hosted display family"
    - "@fontsource-variable/inter@^5.2.8 — self-hosted body family"
    - "tests/check-token-collision.cjs — Wave 0 D-08 invariant guard (pure Node, zero deps)"
  patterns:
    - "Dual-entry-point CSS: v1 layouts import src/styles/global.css; v2 layouts import src/styles/v2/global.css. Per-page choice of layout selects the active token set. Tokens never resolve to both."
    - "v1-collision-safe token naming rule: every v2 token name MUST be string-distinct from every v1 name. Enforced by tests/check-token-collision.cjs (CI-runnable, 0 deps)."
    - "Variable-font @import order: @fontsource imports BEFORE @import 'tailwindcss' so the @theme layer initialises after font registration (RESEARCH §7)."

key-files:
  created:
    - src/styles/v2/global.css
    - tests/check-token-collision.cjs
  modified:
    - package.json
    - package-lock.json
    - .planning/phases/23-design-system-foundation/23-01-CRITO-INSPECTION.md   # mapping-table rename to v1-safe names

key-decisions:
  - "Adopt the plan's prescribed names --font-weight-display/-text/-text-bold and --leading-display/-text. The inspection report's mapping table originally proposed --font-weight-regular/medium/bold and --leading-tight/normal — the latter two would have collided with v1's --leading-tight/normal/relaxed and violated D-08. Inspection report amended in-place to match what shipped."
  - "Skip Chivo install per plan 23-01 decision (Crito uses Chivo only in footer; v2 consolidates body on Inter)."
  - "@fontsource imports use wght.css axis files, not index.css or full.css — minimises font CSS size while still enabling the variable axis."
  - "Pre-existing v1 type errors in CodeBlock.astro / thank-you.astro / blog/tags/[tag].astro are out of scope (Rule scope-boundary). v2 work introduces zero new astro check errors (verified via git stash + re-check)."

patterns-established:
  - "v2 isolated-namespace CSS: src/styles/v2/global.css is opt-in. v1 pages never reach it; collision check makes that mathematical."
  - "Wave 0 token collision guard: a pure-Node, dependency-free script enforces D-08 at any time (CI, pre-commit, manual). Defensive skip-message when v2 file is absent — safe to wire in early."

requirements-completed:
  - FOUND-03
  - FOUND-04

duration: 18 min
completed: 2026-05-14
---

# Phase 23 Plan 02: v2 Token System + Self-Hosted Fonts Summary

**Tailwind v4 `@theme` block in `src/styles/v2/global.css` containing 33 v2 design tokens (8 colors, 6 spacing, 4 radii, 8 sizes, 2 families, 3 weights, 2 leadings) — all OKLCH-verified from Crito, all string-distinct from v1 token names, enforced by a zero-dependency `tests/check-token-collision.cjs` guard, with Plus Jakarta Sans + Inter variable fonts self-hosted via `@fontsource-variable/*` (^5.2.8) — and v1 stylesheet byte-identical.**

## Performance

- **Duration:** 18 min
- **Started:** 2026-05-14T04:39:00Z
- **Completed:** 2026-05-14T04:57:00Z
- **Tasks:** 2
- **Files modified:** 4 (3 created, 1 metadata-edit)

## Accomplishments

- `tests/check-token-collision.cjs` ships as a stand-alone, zero-dependency Node script that parses both v1 and v2 stylesheets, extracts every `--name:` declaration, and exits 1 if any name appears in both. Acceptance-tested with a temporarily stubbed colliding token (`--color-yellow: red;`) → exits 1 as expected; reverted to clean state → exits 0 again.
- Installed the two self-hosted variable-font packages and pinned both at `^5.2.8` in `dependencies` (not `devDependencies` — they ship as bundled CSS).
- `src/styles/v2/global.css` written with the Tailwind v4 contract: `@fontsource` imports first, then `@import "tailwindcss";`, then a single `@theme { … }` block. Every token has a trailing inline comment naming its role and provenance.
- 45 v1 token names and 33 v2 token names share zero overlap, verified by the collision script (`OK: no token name collisions … (checked 45 v1 names, 33 v2 names)`).
- `npm run build` exits 0 and produces 16 pages without complaint; site still serves end-to-end.
- v1 stylesheet (`src/styles/global.css`) is byte-identical to its pre-Phase-23 state — `git diff --stat` shows zero changes.
- Amended `23-01-CRITO-INSPECTION.md` mapping-table rows for weight + leading tokens so plan 23-03 (which builds the matching Pencil variables) reads the same names that actually shipped.

## Task Commits

1. **Task 1: Wave 0 token-collision guard** — `9803d22` (test)
2. **Task 2: Install fonts + v2/global.css + mapping-table amendment** — `4425084` (feat)

## Files Created/Modified

- `tests/check-token-collision.cjs` — Pure-Node D-08 guard. Reads `src/styles/global.css` and `src/styles/v2/global.css`, extracts `--*:` names, intersects the sets, exits 1 on overlap with `COLLISION: --<name>` lines per offender. Defensive no-op pass when v2 file absent.
- `src/styles/v2/global.css` — Single `@theme` block, 33 tokens. Provenance comments anchor every value back to a Crito node ID in `23-01-CRITO-INSPECTION.md`.
- `package.json`, `package-lock.json` — Two new entries under `dependencies` (`@fontsource-variable/plus-jakarta-sans`, `@fontsource-variable/inter`), pinned `^5.2.8`.
- `.planning/phases/23-design-system-foundation/23-01-CRITO-INSPECTION.md` — Mapping-table rows for `weight/*` and `leading/*` corrected so the names mirror the CSS file. Table still has 33 rows.

## Decisions Made

- **Switched to plan-prescribed weight/leading token names.** The inspection report's original mapping used `--font-weight-regular/medium/bold` and `--leading-tight/normal` for those rows. The latter two would have collided with v1's `--leading-tight: 1.25` and `--leading-normal: 1.5` (D-08 violation). Plan 23-02 prescribed v1-safe alternatives (`--font-weight-display/-text/-text-bold`, `--leading-display/-text`) which were adopted. Mapping table amended to match.
- **`--font-weight-text-bold` = 500.** This is Crito's nav weight (verified on node `wM9Ac`). The token is named *-bold not *-medium to keep semantic intent ("the bold variant of text-tier copy") even though the numeric value is 500 not 700 — Crito uses medium-weight Inter for nav-style emphasis rather than full bold, and v2 follows that.
- **`npm run astro check` exit-0 acceptance criterion is interpreted as "no new errors introduced".** A pre-change `git stash` re-run confirmed 7 pre-existing v1 type errors in `CodeBlock.astro`, `thank-you.astro`, `blog/tags/[tag].astro` — identical count before and after this plan. Fixing them is out of scope for Phase 23 Plan 02. Documented as deviation below.

## Deviations from Plan

### Documented Deviations

**1. [Rule scope-boundary] `npm run astro check` exits 7 (pre-existing v1 errors, not caused by this plan)**
- **Found during:** Task 2 verification gate
- **Issue:** The plan's acceptance_criteria requires `npm run astro check` to exit 0. It exits 7 due to type errors in `src/components/design-system/CodeBlock.astro` (5 errors), `src/pages/thank-you.astro` (1), and `src/pages/blog/tags/[tag].astro` (1). All errors are in v1 files this plan did not touch.
- **Fix:** None applied. Per deviation rule "Scope boundary: do not auto-fix pre-existing issues unrelated to current task," these errors are out of scope. `git stash` + re-run confirms identical error count without this plan's changes — the v2 work introduces zero new astro check errors.
- **Files modified:** None.
- **Verification:** `git stash -u && npm run astro check` → "Result (44 files): - 7 errors". `git stash pop && npm run astro check` → "Result (44 files): - 7 errors". Identical.
- **Committed in:** (n/a — no fix committed; documented in this SUMMARY for traceability)

**2. [Rule 1 - Bug fix] Inspection report mapping-table token names changed to v1-collision-safe variants**
- **Found during:** Task 2, after reading v1 `src/styles/global.css` and discovering `--leading-tight`/`--leading-normal` already exist
- **Issue:** Inspection report's mapping table proposed `--leading-tight` and `--leading-normal` for v2 — those names collide exactly with v1. Same risk for `--font-weight-bold` overlapping v1's `--font-weight-h1..h4/body` family pattern, though `--font-weight-bold` is not literally in v1 it shares the prefix.
- **Fix:** Renamed the 5 affected rows in `23-01-CRITO-INSPECTION.md` to match the plan-prescribed v1-safe names (`--font-weight-display`, `--font-weight-text`, `--font-weight-text-bold`, `--leading-display`, `--leading-text`). v2/global.css uses the same safe names.
- **Files modified:** `.planning/phases/23-design-system-foundation/23-01-CRITO-INSPECTION.md`, `src/styles/v2/global.css`
- **Verification:** Mapping table still has 33 rows (`awk` + `grep -c` confirmed). Collision script reports `OK: no token name collisions … (checked 45 v1 names, 33 v2 names)`.
- **Committed in:** `4425084`

---

**Total deviations:** 2 (1 scope-boundary documented; 1 auto-fixed bug)
**Impact on plan:** v2 token system ships exactly as planned in scope. The astro-check exit-0 gate is documented as pre-existing v1 issues out of scope; build still passes. Inspection-report fix is a quality improvement that prevents a downstream D-08 violation in plan 23-03.

## Issues Encountered

- **Initial inspection report had v1-colliding token names in its mapping table.** Caught at Task 2 read-first gate (reading `src/styles/global.css` per `<read_first>`). Fixed in-line before shipping v2/global.css. The collision script would have caught it too — but it's better to ship correct upstream than rely on the gate.

## User Setup Required

None — no external service configuration required. Fonts are self-hosted via `node_modules` and bundled at build time.

## Next Phase Readiness

- Plan 23-03 (v2 BaseLayout + design-system.pen):
  - `src/styles/v2/global.css` exists at the path 23-03 needs to import.
  - The 33-token mapping table in `23-01-CRITO-INSPECTION.md` is now name-consistent with the CSS file — 23-03's Pencil variables (`color/primary`, `font/display`, `leading/text`, etc.) map 1:1 to the actual CSS custom properties.
  - Self-hosted font CSS is available for the BaseLayout to preload Plus Jakarta Sans (`node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2`).
- Plan 23-04 (Header/Footer/MobileNav + a11y spec):
  - All tokens needed by the layout components are live (`--color-primary`, `--space-md`, `--font-display`, etc.).
  - `tests/check-token-collision.cjs` is wired and ready to run in 23-04's verification flow alongside `npm run build` and `npm run test:a11y`.

---

*Phase: 23-design-system-foundation*
*Completed: 2026-05-14*

---
phase: 23-design-system-foundation
plan: 01
subsystem: design-tokens
tags: [design-system, pencil-mcp, fontsource, crito, oklch, v2]

requires:
  - phase: 23-CONTEXT
    provides: D-18 canonical Crito node IDs, D-19 zero-component baseline, D-06 token naming intent
  - phase: 23-RESEARCH
    provides: best-guess fonts, OKLCH palette inferences, --font-heading/-body collision audit
provides:
  - Verified Crito font families (Plus Jakarta Sans, Inter, Chivo) read directly from .pen via Pencil MCP
  - Verified hex/OKLCH color palette anchored to canonical Crito nodes
  - 33-row Pencil-variable → CSS-custom-property mapping table
  - npm package confirmations pinned to ^5.2.8 (plus-jakarta-sans, inter; chivo confirmed but rejected for v2)
  - Mandatory --font-display/--font-text rename resolving the v1 collision before any token CSS is written
affects: [23-02, 23-03, 23-04, 24, 25, 26, 27, 28, 29]

tech-stack:
  added: []                          # inspection-only, no install yet
  patterns:
    - "Token ground truth lives in 23-01-CRITO-INSPECTION.md and is referenced by every downstream v2 plan"
    - "Pencil MCP batch_get is the only legal read path for .pen files (encrypted on disk)"

key-files:
  created:
    - .planning/phases/23-design-system-foundation/23-01-CRITO-INSPECTION.md
  modified: []

key-decisions:
  - "Drop Chivo from v2 — Crito uses Inter for nav/body/hero and Chivo only in the footer; consolidating on Inter keeps the system 2-font and matches CONTEXT D-06's 2-token typography model"
  - "Coral #ff928a is a decorative shape accent in Crito, not a structural surface; NOT promoted to a v2 token (Q3 resolved)"
  - "--space-2xl stays at 5rem (80px) per RESEARCH §3; Crito's section deltas include content height and don't justify bumping to 7.5rem (Q4 resolved)"
  - "--color-primary-hover uses computed +6% L variant (oklch(0.286 0.054 264.6)) because Crito documents no hover state for fwSmg (Q2 resolved)"
  - "All v2 typography family tokens MUST be --font-display / --font-text — NEVER --font-heading / --font-body (which collide with v1)"

patterns-established:
  - "Pencil MCP-first token extraction: every Crito-derived value is verified by node ID before it appears in v2/global.css or design-system.pen"
  - "Confidence column in token tables (verified vs inferred-fallback) so downstream plans know which values were measured vs derived"

requirements-completed:
  - FOUND-01

duration: 14 min
completed: 2026-05-14
---

# Phase 23 Plan 01: Crito .pen Inspection Summary

**Verified Crito design tokens (3 fonts, 8 colors, 6 spacing, 4 radii) extracted via Pencil MCP into a 33-row Pencil-variable → CSS-custom-property mapping table that locks the v2 token contract before any code is written.**

## Performance

- **Duration:** 14 min
- **Started:** 2026-05-14T04:25:00Z
- **Completed:** 2026-05-14T04:39:00Z
- **Tasks:** 1
- **Files modified:** 1 (created)

## Accomplishments

- Inspected the Crito `.pen` source file via `mcp__pencil__batch_get` on the 6 canonical nodes from CONTEXT D-18 (`ULZiU`, `wM9Ac`, `35XXR`, `fwSmg`, `Y1ldm`, `ujMLJ`) plus two additional verification samples (`lUyFD`, `XH3uk`).
- Recorded verified font families (Plus Jakarta Sans heading, Inter body, Chivo footer-only) with exact `font.family` strings, `fontWeight`, `fontSize`, and `lineHeight` values from each canonical node.
- Recorded verified OKLCH color palette anchored to source nodes: primary navy `#141f39`, accent green `#38da71`, surface white `#ffffff`, surface-muted `#fafafa`, text-muted `#52525b`, border `#d4d4d8`, plus derived `--color-primary-hover` (RESEARCH §2 fallback) and a rejected coral decorative-only finding.
- Confirmed npm availability for `@fontsource-variable/plus-jakarta-sans` (5.2.8) and `@fontsource-variable/inter` (5.2.8); also verified `@fontsource-variable/chivo` exists at 5.2.8 but rejected it for v2 to keep the system 2-font.
- Produced the 33-row v2 Token Mapping Table (8 colors + 6 spacing + 4 radii + 8 sizes + 2 font families + 3 weights + 2 leadings) consumed by plans 23-02 and 23-03 as the single source of truth.
- Resolved all 4 RESEARCH "Open Questions" with verified data — no remaining unknowns blocking plan 23-02.
- Made the `--font-display`/`--font-text` rename explicit, with a "Critical Naming Override" section that downstream plans cannot miss.

## Task Commits

1. **Task 1: Inspect Crito .pen and record fonts, colors, spacing, radii** — `8a097f8` (docs)

## Files Created/Modified

- `.planning/phases/23-design-system-foundation/23-01-CRITO-INSPECTION.md` — 9-section inspection report (Title + Metadata + Fonts + Color Palette + Spacing + Radii + v2 Token Mapping Table + npm Package Confirmation + Open Questions Resolved + Critical Naming Override) with 33-row mapping table and recommended CSS values for plan 23-02 to ship verbatim.

## Decisions Made

- **Drop Chivo from v2.** Crito uses Chivo only in the footer. Consolidating on Inter throughout the footer matches CONTEXT D-06's 2-token typography model and avoids a third preload. Rationale documented in the Fonts table and Open Questions Resolved Q1.
- **Coral `#ff928a` is decorative only.** Q3 resolved: appears as path `1ZZkY` (heart shape) inside `35XXR` — not a surface, button, or structural fill. Not promoted to a token.
- **`--color-primary-hover` uses RESEARCH §2 computed-+6%-L variant.** Q2 resolved: Crito's CTA button `fwSmg` has no documented hover state in the `.pen`. `oklch(0.286 0.054 264.6)` ≈ `#1d2a4c`.
- **`--space-2xl` stays at 5rem (80px).** Q4 resolved: section Y-deltas in `ujMLJ` (614–1321px) include content height and don't justify bumping the breathing-room token. Sections that want more air can stack `--space-2xl` twice.

## Deviations from Plan

None - plan executed exactly as written.

**Total deviations:** 0
**Impact on plan:** Plan was followed step-by-step. The one notable observation — Crito uses 3 fonts, not 2 — was anticipated by RESEARCH §1's "Fallback packages" table (Chivo listed), so it required a decision rather than a deviation. Decision documented in the report; downstream plans 23-02 and 23-03 install only 2 packages per the v2 simplification.

## Issues Encountered

None. The Pencil MCP `batch_get` calls returned complete data for every canonical node on first request. `npm view` confirmed all three font packages on the first try.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Plan 23-02 (v2 token system + font install) has the verbatim CSS values, the recommended `@theme` block contents, the npm install command (pinned to `^5.2.8`), and the token names it must use (and must NOT use). It can execute without any second-guessing about ground truth.
- Plan 23-03 (BaseLayout v2 + `design/design-system.pen` variables) has the same 33-row mapping table as the spec for the Pencil variables it creates. Variable names mirror the CSS prefix structure (`color/primary` ↔ `--color-primary`) so the Token Reference frame is a 1:1 mapping.
- The `--font-display`/`--font-text` rename is now hard-locked in a "Critical Naming Override" section that every downstream plan reads before writing CSS or Pencil variables.

---

*Phase: 23-design-system-foundation*
*Completed: 2026-05-14*

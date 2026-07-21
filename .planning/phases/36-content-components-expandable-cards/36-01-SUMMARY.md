---
phase: 36-content-components-expandable-cards
plan: 01
subsystem: ui
tags: [figma, figma-desktop-mcp, design-tokens, svg, extraction]

requires:
  - phase: 35-ui-primitives
    provides: ServiceCard geometry precedent, --wl-card-* tokens, Tag/Eyebrow primitives
provides:
  - 36-EXTRACTION.md — every Phase 36 FIDELITY-GAP resolved with Figma-sourced values
  - ProjectCard full geometry (thumb 308px gradient block, body padding 26/27/29, gaps 8/8/10/18/21, radius 18, border line→accent on open)
  - FAQItem full geometry (white card radius 14, padding 19/24, Fraunces 18px question, rotating + toggle)
  - Chevron SVG path (M4 6L8 10L12 6, 16×16, stroke 1.33) and FrequencyWave 5-path SVG (viewBox 0 0 1670 1044, opacities .14–.22)
  - D-09 placeholder card copy (Chat Safety Pipeline, 8 fields + thumbLabel, verbatim)
  - Contrast-pair additions list for scripts/check-contrast.mjs
affects: [36-03, 36-04, 36-05, 36-06]

tech-stack:
  added: []
  patterns: [FIDELITY-GAP extraction-before-implementation, FLAGGED-fallback discipline]

key-files:
  created: [.planning/phases/36-content-components-expandable-cards/36-EXTRACTION.md]
  modified: []

key-decisions:
  - "ProjectCard has a thumb block (gradient + italic label) the UI-SPEC missed — thumbLabel joins the v2 schema"
  - "Card title is Fraunces 22px and hook is 17px italic INK — overrides UI-SPEC's .wl-heading-h3/.wl-accent-outcome assumptions"
  - "FAQ toggle is a rotating + glyph (45°), not a chevron; FAQItem is a bordered card, not a divided list row"
  - "Only 1 FLAGGED value: ProjectCard hover (no Figma spec) — ServiceCard-derived fallback per Phase 35 precedent"

patterns-established:
  - "Extraction artifact as single source of truth: downstream plans read 36-EXTRACTION.md, never Figma directly"

requirements-completed: [COMP-03, COMP-04, COMP-05, CONT-01]

duration: 12min
completed: 2026-07-16
---

# Phase 36 Plan 01: Figma FIDELITY-GAP Extraction Summary

**Every Phase 36 FIDELITY-GAP resolved from live Figma via figma-desktop MCP — ProjectCard/FAQItem geometry, both toggle indicators, the 5-path FrequencyWave SVG, and the verbatim D-09 placeholder copy, with only ProjectCard hover FLAGGED (no Figma spec exists).**

## Performance

- **Duration:** ~12 min (including the file-open human gate)
- **Tasks:** 3 (1 checkpoint:human-action + 2 auto)
- **Files modified:** 1 created

## Accomplishments
- Task 1 gate: wrong Figma file was open; Joel opened `1tg8wIPcvOVC5tPZ8pkGO2` and node `36:5` then resolved as the Components page
- ProjectCard closed (41:45) + expanded (41:95) fully extracted, including a thumb block, exact spacer gaps, and the expanded detail structure
- FAQItem closed (99:18) + open (99:24) fully extracted — surface question resolved (self-contained white card)
- Chevron SVG path pulled from the Figma asset server; FrequencyWave "field" (13:21) 5-path SVG captured verbatim
- D-09 placeholder copy transcribed verbatim from the Chat Safety Pipeline card (master + Showcase instance 32:1026)

## Task Commits

Committed as one artifact commit (extraction produces a single planning file):
1. **Tasks 1–3: extraction artifact** — see commit for `36-EXTRACTION.md`

## Files Created/Modified
- `.planning/phases/36-content-components-expandable-cards/36-EXTRACTION.md` — single source of truth for all Phase 36 geometry, SVG paths, type confirmations, contrast pairs, and placeholder copy

## Decisions Made
- Recorded 6 UI-SPEC deviations discovered in Figma (thumb block, 22px title, 17px ink hook, + glyph toggle, bordered FAQ card, explicit toggle row) — flagged for executors, not silently absorbed

## Deviations from Plan

None — plan executed as written. The checkpoint fired exactly as designed (wrong file open → human gate → resume).

## Issues Encountered
- First `get_metadata` call resolved node 36:5 in the WRONG open file (an Orbitron-branded file) — caught because the content didn't match the brand; gate protocol worked

## User Setup Required
None.

## Next Phase Readiness
- 36-03 (data layer) can read the D-09 copy + thumbLabel schema addition
- 36-04/36-05 (components) have every geometry/SVG value; zero remaining Figma access needed
- 36-06 contrast pairs pre-computed in the extraction artifact

---
*Phase: 36-content-components-expandable-cards*
*Completed: 2026-07-16*

---
phase: 37-landing-page
plan: 01
status: complete
subsystem: ui
tags: [figma, extraction, design-tokens, landing-page, mcp]

# Dependency graph
requires:
  - phase: 33-token-foundation-fonts
    provides: --wl-* token palette and type ramp the extracted values are mapped against
  - phase: 35-ui-primitives
    provides: CTAButton/Eyebrow/ServiceCard/Step component contracts confirmed by landing instances
  - phase: 36-content-components-expandable-cards
    provides: extraction artifact format precedent; FrequencyWave paths; FAQItem (confirmed unused here)
provides:
  - 37-EXTRACTION.md — source of truth for all landing FIDELITY-GAP values (copy, backgrounds, padding, component rosters, dark treatment)
  - Definitive answers: no FAQ section; Agencies is always-dark (#12333B light / #16343C dark); About photo is a PORTRAIT placeholder (no image asset in file)
  - FrequencyWave placement (Hero only, fixed 1670x1044 at -115/-100)
  - Icon SVG paths (check, arrow, web/automations/AI card icons, calendar, mail)
  - Contrast-pair additions list for scripts/check-contrast.mjs
affects: [37-02, 37-03, 37-04, 37-05, landing-page, check-contrast, fidelity-gate]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Gradient section backgrounds carry paired dark literals (no token pair for gradients)"
    - "Always-dark strip literal shifts between themes (#12333B light / #16343C dark)"

key-files:
  created:
    - .planning/phases/37-landing-page/37-EXTRACTION.md
    - .planning/phases/37-landing-page/fidelity/37-figma-12-2.png
    - .planning/phases/37-landing-page/fidelity/37-figma-117-103.png
  modified: []

key-decisions:
  - "FAQ decision: NO FAQ section in 12:2 (all five frames checked) — FAQItem stays unused in Phase 37"
  - "Always-dark decision: YES — Agencies (17:2), bg literal #12333B (light frame) / #16343C (dark frame); on-ink text, accent-soft eyebrow, ghost-on-dark CTA 'Let's talk overflow →'"
  - "About-photo decision: NO photo — 440x550 gradient placeholder labeled PORTRAIT; zero raster images exist in the frame (download_assets rawImages empty)"
  - "FrequencyWave placement: Hero only, absolute -115/-100, fixed 1670x1044 at ALL breakpoints (not full-bleed at 1920)"
  - "figma-desktop get_design_context hung permanently mid-session; per-section fills/type extracted via claude.ai Figma MCP against the same file — get_metadata/get_screenshot/get_variable_defs on figma-desktop remained healthy"
  - "Dark mode is NOT a pure token flip: paper sections flip via var(--paper), but 3 gradient pairs + Agencies strip + 4 misc literals need section-local dark values (all recorded)"

patterns-established:
  - "Landing section shell: py 112 at all four breakpoints; gutters 24/32/160/400; content max-width 1120"
  - "Section kicker line: Fraunces Italic 20px INK (not accent) — new local style for How/Auto"

requirements-completed: [PAGE-01, CONT-02]

# Metrics
duration: ~55min
completed: 2026-07-16
---

# Phase 37 Plan 01: Figma Extraction Summary

**All landing FIDELITY-GAPs resolved from Figma 12:2 into 37-EXTRACTION.md — 9 sections' verbatim copy, backgrounds (3 gradient pairs + always-dark Agencies strip), 112px section shell, component rosters, 7 icon SVG paths, and full dark-literal map; only 2 extraction gaps remain (rotor-line animation semantics, Agencies CTA destination).**

## Performance

- **Duration:** ~55 min
- **Completed:** 2026-07-16
- **Tasks:** 1
- **Files created:** 3

## Accomplishments
- 37-EXTRACTION.md written with node-referenced tables for all nine sections (Hero, Who, Three-ways/Make, How-it-works/How, Automations/Auto, Proof, About, Agencies, Final CTA), every copy string verbatim from light frames with node ids
- Three open questions answered definitively: **FAQ: NO** · **Always-dark: YES (Agencies, #12333B/#16343C)** · **About photo: NO (PORTRAIT placeholder)**
- FrequencyWave: Hero only; fixed 1670x1044 geometry at every breakpoint
- External URLs beyond Calendly: **none** in landing sections (footer "GitHub" is Phase 34 chrome)
- Extraction-gap count: **2** ([rotor-line animation semantics], [Agencies CTA destination URL])
- Dark treatment mapped: paper sections = token flip; Hero/Final, Make/About, Auto gradients get paired dark literals; Proof credentials, portrait placeholder, CTA shadow/ghost-bg literals recorded
- Contrast-pair additions table prepared for scripts/check-contrast.mjs (13 pairs)
- Reference PNGs persisted to fidelity/ (37-figma-12-2.png, 37-figma-117-103.png)

## Task Commits

1. **Task 1: Extract landing structure and screenshots from Figma 12:2 and 117:103** - see commit below (docs)

## Files Created/Modified
- `.planning/phases/37-landing-page/37-EXTRACTION.md` - source of truth for 37-03/37-04 section assembly
- `.planning/phases/37-landing-page/fidelity/37-figma-12-2.png` - light 1440 reference render
- `.planning/phases/37-landing-page/fidelity/37-figma-117-103.png` - dark 1440 reference render

## Decisions Made
- Followed D-10 strictly: all copy attributed to light-frame nodes; 117:103 consulted for colors only
- Recorded (not invented) three new light literals outside the token set: `#EFF7F6` (Make/About gradient top), `#DCEDEC` (Auto gradient bottom), `#4C6A70` (Proof credentials); plus dark counterparts
- UI-SPEC's guessed "stats/testimonial" Proof content does not exist in the frame — Proof is prose + a 15px credentials line (EA · Unity · lululemon · thatgamecompany)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] figma-desktop `get_design_context` permanently wedged**
- **Found during:** Task 1 (first per-section extraction call)
- **Issue:** Transport dropped on the first get_design_context call and every retry idle-timed out at 300s, while get_metadata/get_screenshot/get_variable_defs kept working. The plan's designated tool could not extract fills/type.
- **Fix:** Switched per-section extraction to the official claude.ai Figma MCP `get_design_context` against the same file key/node ids; cross-checked geometry against the figma-desktop metadata XML.
- **Files modified:** none (tooling change only)
- **Verification:** every section's values cross-checked against the 12:2 metadata XML geometry and figma-desktop screenshots
- **Committed in:** extraction commit

---

**Total deviations:** 1 auto-fixed (blocking tool failure)
**Impact on plan:** None on scope — same file, same nodes, same fidelity. MCP connectivity gate (get_metadata on 13:20) had passed before the failure.

## Issues Encountered
- Two parallel figma-desktop get_design_context calls crashed the server transport; the tool never recovered for this session. Sequential calls on other figma-desktop tools stayed healthy.
- Figma authoring inconsistencies recorded for Joel's D-10 batch: tag-pill centered @1440 but left-aligned @1920/768/390; Who list items overflow the 390 frame (nowrap artifact); mobile header nav omits Services/About links.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- 37-02/37-03/37-04 can proceed with zero design guesswork: all backgrounds, paddings, copy, and component rosters are concrete
- check-contrast.mjs extension list is pre-computed in 37-EXTRACTION.md
- 2 open items ride to the fidelity gate: rotor-line animation decision, Agencies CTA destination (suggest mailto per D-07)

---
*Phase: 37-landing-page*
*Completed: 2026-07-16*

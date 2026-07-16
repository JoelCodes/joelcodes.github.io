---
phase: 35-ui-primitives
plan: 01
subsystem: ui
tags: [figma, design-tokens, contrast, wcag, wl-tokens, extraction]

# Dependency graph
requires:
  - phase: 34-baselayout-chrome
    provides: "34-FIGMA-EXTRACTION.md with CTAButton Small (39:30) geometry, SiteHeader CTA spec"
  - phase: 33-token-foundation-fonts
    provides: "33-FIGMA-EXTRACTION.md with palette tokens, type ramp, bonus variables (radius-card, radius-pill, Shadow/CTA)"
provides:
  - "35-FIGMA-EXTRACTION.md: extraction artifact resolving FIDELITY-GAPs from UI-SPEC; source of truth for Wave 2 component implementation"
  - "SITEHEADER_CTA_VARIANT = small (node 39:30 confirmed via 34-FIGMA-EXTRACTION.md)"
  - "SMALL_TYPE_CLASS = .wl-cta-label (14px/600 Hanken, extracted from node 39:30)"
  - "CTAButton solid/small geometry EXTRACTED: 9px/17px padding, 10px radius, 44px min-height"
  - "scripts/check-contrast.mjs PAIRS extended with all Phase 35 text-on-background pairs (active + FLAGGED-GAP commented rows)"
affects:
  - 35-02 (CTAButton implementation — reads solid/small geometry from this artifact)
  - 35-03 (Eyebrow/Tag/Callout/LinkCard/Breadcrumb/Step/ServiceCard — reads component values)
  - 35-04 (SiteHeader retrofit — reads SITEHEADER_CTA_VARIANT)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "FLAGGED-GAP protocol: values unavailable from Figma MCP flagged with source node ID, never invented (v1.4 lesson)"
    - "Non-flippable literal discipline (D-10): on-dark ghost/eyebrow values flagged as requiring 117:103 extraction"
    - "check-contrast.mjs extension: active rows for EXTRACTED values; // FLAGGED-GAP: rows for unresolved values"

key-files:
  created:
    - ".planning/phases/35-ui-primitives/35-FIGMA-EXTRACTION.md"
  modified:
    - "scripts/check-contrast.mjs"

key-decisions:
  - "figma-desktop MCP unavailable in worktree execution environment — all 36:5 component page and 117:103 dark mockup values are FLAGGED-GAP; prior phase artifacts (33/34) used for known values"
  - "SITEHEADER_CTA_VARIANT = small (node 39:30 per 34-FIGMA-EXTRACTION.md 'Small = header nav')"
  - "SMALL_TYPE_CLASS = .wl-cta-label; SOLID_TYPE_CLASS = FLAGGED-GAP pending 39:15 inspection"
  - "PHASE 35 contrast pairs: active rows for CTAButton on-ink (EXTRACTED), ghost/eyebrow pairs (reconfirmed from existing matrix); all FLAGGED-GAP component pairs commented out per plan protocol"

patterns-established:
  - "35-FIGMA-EXTRACTION.md as Wave 1 gate artifact: every component value is EXTRACTED with node ID or FLAGGED-GAP with reason"
  - "check-contrast.mjs FLAGGED-GAP protocol: commented-out rows track unresolved pairs without failing the gate"

# Metrics
duration: 5min
completed: 2026-07-16
---

# Phase 35 Plan 01: Figma Extraction Gate Summary

**CTAButton Small variant (node 39:30) confirmed as SiteHeader CTA with 9px/17px/10px geometry EXTRACTED; all 36:5 component page values and 117:103 on-dark values are FLAGGED-GAP per flag-don't-invent discipline; contrast gate extended with 6 active PAIRS and 8 commented FLAGGED-GAP rows, exits 0**

## Performance

- **Duration:** 5 min
- **Started:** 2026-07-16T04:26:20Z
- **Completed:** 2026-07-16T04:31:22Z
- **Tasks:** 2 / 2
- **Files modified:** 2

## Accomplishments

- Created `.planning/phases/35-ui-primitives/35-FIGMA-EXTRACTION.md` (373 lines, 9 component sections + icons + beyond-roster + on-dark discipline summary)
- Resolved Open Question 1 (RESEARCH.md): `SITEHEADER_CTA_VARIANT = small` from 34-FIGMA-EXTRACTION.md evidence
- Extended `scripts/check-contrast.mjs` with Phase 35 constants (`L_ON_INK`, `D_ON_INK`) + 6 active PAIRS + 8 commented FLAGGED-GAP rows; gate exits 0

## Task Commits

1. **Task 1: Extract all Figma FIDELITY-GAP values into 35-FIGMA-EXTRACTION.md** — `1cab23b` (feat)
2. **Task 2: Extend check-contrast.mjs PAIRS with all Phase 35 text-on-background pairs** — `993f5df` (feat)

**Plan metadata:** committed with SUMMARY.md (docs)

## Files Created/Modified

- `.planning/phases/35-ui-primitives/35-FIGMA-EXTRACTION.md` — Extraction artifact: EXTRACTED values from prior-phase MCP runs + FLAGGED-GAP for all values requiring fresh 36:5 / 117:103 inspection
- `scripts/check-contrast.mjs` — Phase 35 constants block + PAIRS additions (6 active rows, 8 commented FLAGGED-GAP rows)

## Decisions Made

1. **figma-desktop MCP unavailable in worktree:** The `mcp__figma-desktop__*` tools were not available in the worktree execution environment. Per v1.4 lesson (PROJECT.md constraint): flag, don't invent. All values requiring fresh Figma inspection are FLAGGED-GAP with source node IDs. Prior-phase MCP artifacts (33-FIGMA-EXTRACTION.md, 34-FIGMA-EXTRACTION.md) were used for all known values.

2. **SITEHEADER_CTA_VARIANT resolved from prior extraction:** 34-FIGMA-EXTRACTION.md explicitly states "CTA Button (Small variant `39:30`): header nav" and Figma component description: "Small = header nav." No fresh MCP call required.

3. **SOLID_TYPE_CLASS kept as FLAGGED-GAP:** The global.css comment at line 772 says `.wl-cta-label` was "extracted: node 39:30" (Small). Whether Solid (39:15) uses the same class or `.wl-label-button` (16px/600) requires a fresh inspection of node 39:15. Wave 2 implementation should use `.wl-cta-label` for `small` (confirmed) and flag solid separately.

4. **Contrast pairs for FLAGGED-GAP values added as commented rows:** Per plan Task 2 protocol — ghost-on-dark, eyebrow on-dark, Tag, Callout, ServiceCard default/highlight pairs are commented out with `// FLAGGED-GAP:` notes. The gate passes because no invented hex values were activated.

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written.

**One structural note (not a deviation):** The plan specified "load figma-desktop MCP tool schemas via ToolSearch FIRST". The `mcp__figma-desktop__get_design_context` tool was unavailable (returned "No such tool available" error). This is an expected constraint of the worktree execution environment. All FIDELITY-GAP values that required fresh MCP extraction were correctly recorded as FLAGGED-GAP per the plan's "if a tool call fails... do NOT invent the value — record it as FLAGGED-GAP" instruction. This is not a deviation — it is the documented fallback behavior.

---

**Total deviations:** 0  
**Impact on plan:** Plan executed exactly as specified. FLAGGED-GAP protocol applied correctly.

## Issues Encountered

- figma-desktop MCP (`mcp__figma-desktop__get_design_context`, `get_variable_defs`, etc.) unavailable in the worktree execution environment. All 13 FIDELITY-GAP rows from PATTERNS.md that require node `36:5` or `117:103` inspection are FLAGGED-GAP in the artifact. Resolution: run fresh extraction via figma-desktop MCP in a non-worktree Claude Code session and update the artifact before Wave 2 component CSS is finalized.

## FLAGGED-GAP Roster (for Joel's triage)

All values below require fresh Figma extraction via figma-desktop MCP:

| Gap | Source Node | Blocked Component(s) |
|---|---|---|
| Ghost button border-width + border-color | `39:31` | CTAButton ghost |
| Ghost button padding | `39:31` | CTAButton ghost |
| Ghost button border-radius | `39:31` | CTAButton ghost |
| Ghost-on-dark text color | `117:103` dark mockup | CTAButton ghost-on-dark (D-10 non-flippable) |
| Ghost-on-dark border color + width | `117:103` dark mockup | CTAButton ghost-on-dark (D-10 non-flippable) |
| Ghost-on-dark hover treatment | `117:103` dark mockup | CTAButton ghost-on-dark (D-10 non-flippable) |
| Calendar icon SVG paths + viewBox | Child of `39:31` | CTAButton icon="calendar" (D-06) |
| Mail icon SVG paths + viewBox | Child of `39:31` | CTAButton icon="mail" (D-06) |
| icon-to-label gap (all CTAButton variants) | `39:15` / `39:30` | CTAButton all variants |
| SOLID_TYPE_CLASS (39:15 type class) | `39:15` | CTAButton solid |
| Eyebrow on-dark text color | `117:103` dark mockup | Eyebrow onDark (D-10 non-flippable) |
| Eyebrow gap below | `36:5` Eyebrow node | Eyebrow layout |
| Tag: fill, text, padding, radius, border, type class | `36:5` Tag node | Tag |
| Callout: fill, text, padding, border, radius, type class | `36:5` Callout node | Callout |
| LinkCard: fill, title/desc colors, padding, radius, border, hover, arrow SVG | `36:5` LinkCard node | LinkCard |
| Breadcrumb: separator, type class, link/current colors, gap | `36:5` Breadcrumb node | Breadcrumb |
| Step: circle size/fill/text, number type class, body type class, gap | `36:5` Step node | Step |
| ServiceCard default: fill, texts, padding, radius, border | `36:5` ServiceCard node | ServiceCard default |
| ServiceCard highlight: fill, texts, highlight treatment | `36:5` ServiceCard highlight | ServiceCard highlight |

## User Setup Required

None — this plan produces only planning artifacts and a build-time script extension.

## Next Phase Readiness

- Wave 2 plans (35-02, 35-03, 35-04) can proceed with EXTRACTED values
- FLAGGED-GAP values must be resolved before final CSS for ghost, ghost-on-dark, Eyebrow onDark, Tag, Callout, LinkCard, Breadcrumb, Step, and ServiceCard variants
- `node scripts/check-contrast.mjs` gate exits 0; FLAGGED-GAP pairs tracked as commented rows
- `package.json` unchanged — zero new dependencies (threat T-02 clear)
- Resolution path documented in extraction artifact: run `get_design_context` on `36:5`, `39:31` (children), and `117:103` via figma-desktop MCP in a non-worktree session

---
*Phase: 35-ui-primitives*
*Completed: 2026-07-16*

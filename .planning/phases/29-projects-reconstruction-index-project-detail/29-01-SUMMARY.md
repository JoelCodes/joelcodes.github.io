---
phase: 29-projects-reconstruction-index-project-detail
plan: 01
subsystem: design-system
tags: [pencil-mcp, projects-index, tagfilter-broad-scope, page-11-active, project-card, calibration-gate]

requires:
  - phase: 29-00
    provides: Compound/ProjectCard (DnsRs) + Section/ResultsMetrics (y4RORu) + Section/RelatedProjects (OLSa0) NEW reusable components
  - phase: 28
    provides: Section/TagFilter (O1IwyS) + paired-ref active-state-flip mechanic (D-117) + Plan 28-01 BlogCard descendants-override precedent
  - phase: 27
    provides: PAGE-11 ACTIVE production pattern (cl8tt) + crito-source-flat-raster branch (D-127)
  - phase: 25
    provides: Section/Header (G0wNOc) + Section/Footer (Xs0Hs)

provides:
  - NEW Projects top-level page frame (SCcln) at (28247.27, −4111.55) — FOURTH crito-source-flat-raster reconstruction in v2.0
  - First non-additive PEN-INVENTORY mutation in v2.0 (Y2isa row IN-PLACE reclassification per D-128)
  - THIRD Section/TagFilter consumer (Blog + Tag + Projects) validating D-115 broad-scoping
  - FIRST 6 Compound/ProjectCard instance consumers (Plan 29-00 component at scale)
  - FOURTH PAGE-11 ACTIVE production use (Y2isa hidden, structural archive preserved)

affects: [29-02 (Project detail frame — FindEmptySpace anchor SCcln available), 30 (Design-system showcase — TagFilter 3-consumer evidence), 32 (Fidelity sweep — pill-radius reconsider with 4 Badge instances at corner-10)]

tech-stack:
  added: []
  patterns:
    - "TagFilter descendants override via path-based syntax (`<paired-ref>/<label-text-id>` not nested descendants) — schema-correct multi-level descendants pattern"
    - "Pencil MCP inline execution (Pencil tools NOT inherited by gsd-executor subagents) — per-task Cmd+S save cadence required"

key-files:
  created:
    - .planning/phases/29-projects-reconstruction-index-project-detail/29-01-SUMMARY.md
  modified:
    - design/Crito.pen (NEW Projects frame SCcln + 5 children + 6 ProjectCard refs + sibling note bRkNL + Y2isa.enabled:false)
    - .planning/research/PEN-INVENTORY.md (Y2isa row IN-PLACE reclassification + NEW Projects row + 12-row Plan 29-01 additions section + OPEN-23-05/25-07/23-12 annotation extensions)

key-decisions:
  - "Calibration gate APPROVE-clean: all 5 section fidelity labels accepted per D-83 proposal (Header EXACT + page-intro EXACT + TagFilter APPROXIMATE + 6-grid APPROXIMATE + Footer EXACT)"
  - "Page-intro Option A default held (plain centered intro per Phase 26/27 + Plan 28-03 precedent); Option B coral banner pivot per Plan 28-01 line 705 NOT triggered"
  - "Badge variant default solid j0FxQZ held at all 6 ProjectCard category-badge instances; kJQmJ Outline path NOT triggered at calibration"
  - "D-130 DUAL pairing collapsed to single image at Task 0: Y2isa.fill.image == images/image-import-12.jpg (same as D-130 secondary pairing target per OPEN-25-07 line 303). Both pairings resolved against the same file."
  - "TagFilter descendants use path-based syntax (`RxShj/ATJK9`) per Pencil schema § Components-and-Instances multi-level descendants rule, NOT nested descendants objects"

patterns-established:
  - "Per-task Cmd+S save cadence: Pencil MCP buffers writes; user must save in app between tasks for git diffs to surface. Documented for Plan 29-02 carry-forward."
  - "D-130 single-image pairing collapse: when target raster's fill.image matches the secondary pairing target, document the collapse explicitly in calibration AskUserQuestion description"

requirements-completed: [PAGE-02]

duration: ~55min
completed: 2026-06-09
---

# Phase 29 Plan 01: Projects Index Reconstruction Summary

**NEW Projects top-level page frame (SCcln) ships at (28247.27, −4111.55) with Header + v1.3-verbatim page-intro + Section/TagFilter (10-key descendants override) + 6-Compound/ProjectCard grid (2 real projects.json + 4 representative) + Footer; Y2isa raster hidden via FOURTH PAGE-11 ACTIVE production use; FIRST non-additive PEN-INVENTORY reclassification in v2.0.**

## Execution Note: Pencil MCP Subagent-Tool-Inheritance Caveat

Plan 29-01 (and all Phase 29 plans) executed INLINE by the main orchestrator per the carry-forward caveat from Plan 28-00 + 27-00 + 29-00. Pencil MCP tools (`mcp__pencil__*`) are NOT inherited by spawned `gsd-executor` subagents in the Claude Code runtime, so component-build work must run in the orchestrator's tool context.

D-140 pre-flight enforcement (`mcp__pencil__get_editor_state({include_schema: false})` before EVERY Pencil-mutating call) confirmed at Tasks 0, 1, 2, 3, 4, 5. Active editor remained `design/Crito.pen` throughout.

**New finding (per-task save cadence):** Pencil MCP buffers `batch_design` writes in-memory; the .pen file on disk does NOT flush until the user presses Cmd+S in the Pencil app. Plan 29-00's per-task commits worked because the user was actively saving during that session; Plan 29-01 required explicit per-task save prompts. Pattern carries forward to Plan 29-02.

## Performance

- **Duration:** ~55 min (Tasks 0-6 inline + plan close)
- **Started:** 2026-06-09 ~12:30 PDT
- **Completed:** 2026-06-09 ~13:25 PDT
- **Tasks:** 7 of 7 (Tasks 0-6)
- **Files modified:** 2 (design/Crito.pen + .planning/research/PEN-INVENTORY.md)

## Task Outcomes

### Task 0: Pre-flight + Y2isa probe + content extraction (PASS)

- ✓ Active editor: `design/Crito.pen`
- ✓ Plan 29-00 deliverables intact: DnsRs (Compound/ProjectCard) + y4RORu (Section/ResultsMetrics) + OLSa0 (Section/RelatedProjects)
- ✓ **Y2isa.fill.image == `images/image-import-12.jpg`** — SAME image as D-130 secondary pairing target (OPEN-25-07 line 303 ProjectCard fidelity proxy). **D-130 DUAL pairing collapses to single image.**
- ✓ design/images/image-import-12.jpg accessible (1.5 MB)
- ✓ FUctJ Tag frame anchor at (26727.27, −4111.55), width 1440 → FindEmptySpace next-right will land at (28247.27, −4111.55)
- ✓ O1IwyS TagFilter: 10 paired-ref children verified at positions 1-5 with default-active Position 1 "All Posts"
- ✓ Badge primitive (j0FxQZ) label text id: `xSve5` (Inter 14/500/white "Badge") — category-badge override path: `QdrAM/xSve5`
- ✓ M1Wu9 (Blog index TagFilter instance) baseline: empty descendants map — captured for Task 3 cross-check
- ✓ v1.3 content extracted: heading 'Projects' + body verbatim from src/pages/projects/index.astro lines 19-23 + 4 categories (All Projects / Web Apps / Automation / AI Development) + 2 real projects from src/data/projects.json (bakery-order-system Web Apps + inventory-sync-automation Automation)

**Observation (non-blocking):** Editor state reports 29 reusable components vs Plan 29-00 SUMMARY's expected 28. Likely `AzmgQ` (Primitive / Icon / glyphs / substack) added between Plan 29-00 close and now. Flagged for future audit; Plan 29-01 ships zero new library entries.

### Task 1: Projects top-level page frame (PASS)

- FindEmptySpace `{nodeId: "FUctJ", direction: "right", padding: 80, width: 1440, height: 2200}` → returned `{x: 28247.27, y: −4111.55}`
- NEW Projects frame at returned coordinates:
  - **id: `SCcln`**
  - type: frame, name: "Projects"
  - width: 1440 (D-75 desktop page width), height: 2200 (initial, switches to fit_content at Task 3)
  - layout: vertical, gap: 0, padding: 0, alignItems: center
  - fill: #ffffffff (color-semantic-bg-page)
  - placeholder: true (Plan 26-02 pattern)
- FOURTH crito-source-flat-raster page frame in v2.0 (Contact n0QqTd + Blog Index EDAf1 + Blog Post aQ8FL + Tag FUctJ → Projects SCcln)

### Task 2: Composition (PASS — 5 children + sibling note)

Composition inserted across 5 batch_design sub-calls per Plan 27-02 Pitfall 9 (sub-25-op cap):

1. **Section / Header (cF7Lg, ref G0wNOc)** — no override per D-77
2. **page-intro (TjK3X)** — 1200w vertical gap 12 padding [80,0,48,0] alignItems center
   - heading **c2G4Fg**: 'Projects' (PJS 48/700/lh 1.4 navy textAlign center) — v1.3 line 19 verbatim
   - body **h6iw9**: v1.3 lines 20-23 verbatim (Inter 16/400/lh 1.625 secondary textAlign center textGrowth fixed-width width 600)
3. **Section / TagFilter (vWXhb, ref O1IwyS)** — 10-key path-based descendants override per D-137:
   - RxShj/ATJK9 + z1aro/UbwMv → 'All Projects' (Position 1 active default preserved)
   - al86r/ATJK9 + u3X64E/UbwMv → 'Web Apps'
   - C93nA/ATJK9 + j4KiI/UbwMv → 'Automation'
   - m35My/ATJK9 + EXgTG/UbwMv → 'AI Development'
   - CCXCE.enabled:false + hMIRk.enabled:false (Position 5 both shadows — v1.3 has only 4 categories)
   - THIRD consumer validates Phase 28 D-115 broad-scoping
4. **projects-grid (VlRQ0)** — 1200w vertical gap 24 padding [40,0,80,0] alignItems center
   - row-1 (**upm97**) horizontal gap 24 fill_container alignItems start:
     - ProjectCard-1 **n5ejTn**: "Bakery Order Automation" (Web Apps) — real bakery-order-system
     - ProjectCard-2 **DRvTq**: "Multi-Channel Inventory Sync" (Automation) — real inventory-sync-automation
     - ProjectCard-3 **WAkzM**: "Custom CRM for Local Real Estate" (Web Apps) — representative
   - row-2 (**aEjJD**) horizontal gap 24 fill_container alignItems start:
     - ProjectCard-4 **GbdZa**: "AI-Powered Recipe Generator" (AI Development) — representative
     - ProjectCard-5 **z5x28**: "Restaurant Inventory Dashboard" (Web Apps) — representative
     - ProjectCard-6 **Cc0mF**: "Slack Bot for Customer Support" (Automation) — representative
   - Each card: width fill_container; descendants override `mY1QY` title + `VRqcN` body (~160 char truncate) + `QdrAM/xSve5` Badge label
5. **Section / Footer (L5EmG, ref Xs0Hs)** — no override per D-77

**Sibling Pencil note (bRkNL)** at canvas root (1200×320 below Projects frame) documents composition + D-130 single-image collapse + PAGE-11 ACTIVE Task 5 deferral.

**Descendants override schema lesson:** Used PATH-based syntax (`RxShj/ATJK9`) for nested descendant overrides per Pencil schema § Components-and-Instances multi-level rule. NOT nested descendants objects. Pattern carries forward.

**Carry-forward warning (benign):** O1IwyS heading-slot (iHWbI) surfaces "fill_container without flexbox parent" warning on every instance read — pre-existing on O1IwyS itself per Pitfall 6. Not caused by Plan 29-01.

### Task 3: Layout sweep iter 1 + fit_content settle (PASS)

- Projects frame (SCcln): placeholder:false + height:fit_content
- `snapshot_layout({maxDepth: 0, problemsOnly: true})` → **"No layout problems."**
- batch_get SCcln readDepth 3 confirms 5 children in correct order
- **M1Wu9 (Blog index TagFilter instance) descendants map STILL EMPTY** — Plan 28-01 instance UNCHANGED by Plan 29-01 mutations. Per-instance descendants behavior on O1IwyS validated.
- get_variables count: **127 user-facing variables** (Plan 29-01 token drift: 0). Plan 29-00 SUMMARY reported 126 baseline — 1-token discrepancy is carry-forward baseline reconciliation (single token Plan 29-00 didn't enumerate), not Plan 29-01 introduction.

### Task 4: Calibration gate — DUAL pairing AskUserQuestion (APPROVE-clean)

- `get_screenshot({nodeId: "SCcln"})` succeeded on first call — no Tier-1 cross-row Update workaround needed (OPEN-26-02 stale-cache fallback not triggered)
- Inline render shows: Crito Header + centered "Projects" heading + 4-pill filter strip (All Projects active) + 6-card grid (3-col × 2-row, correct content) + Crito Footer
- AskUserQuestion fired with DUAL pairing documented as single-image collapse (Y2isa.fill.image == image-import-12.jpg)
- **User decision: APPROVE**
- Section fidelity labels per D-83 (all accepted per proposal):
  - Section/Header (G0wNOc): EXACT
  - page-intro (v1.3 verbatim): EXACT
  - Section/TagFilter (O1IwyS + descendants override): APPROXIMATE (D-115 broad-scoping)
  - 6-grid (DnsRs instances): APPROXIMATE (Plan 28-01 BlogCard precedent)
  - Section/Footer (Xs0Hs): EXACT
- No REVISE loop; no GAP raised; no OPEN-29-NN flags from calibration

### Task 5: PAGE-11 ACTIVE on Y2isa (PASS — FOURTH production use in v2.0)

- `Update("Y2isa", {enabled: false})` fired post-APPROVE per Pitfall 4 strict observance + § 3.3 + § 3.4 step 7
- Y2isa state post-mutation:
  - enabled: false (was true)
  - x: 5327.27 (UNCHANGED — structural archive)
  - y: −4111.55 (UNCHANGED — structural archive)
  - fill.image.url: "images/image-import-12.jpg" (preserved)
- PAGE-11 ACTIVE production-use chain: cl8tt (Plan 27-02) → DzqTm (Plan 28-01) → w1m3x (Plan 28-02) → **Y2isa (Plan 29-01)** → cYlRH (Plan 29-02 next)

### Task 6: PEN-INVENTORY mutations (PASS — FIRST non-additive in v2.0)

Six edits applied:

1. **Y2isa row IN-PLACE reclassification** (D-128 first non-additive change in v2.0):
   - scope: IN-SCOPE token-mining-only → **reconstructed-PHASE-29**
   - joel_page_map: 'none (token mining only)' → 'Projects (per D-06; reconstructed as `Projects` frame SCcln per Plan 29-01)'
   - status_counts: flat:1 → **hidden:1**
   - reconstruction_priority: 'n/a (out of scope)' → 'n/a (Phase 29 plan 29-01 — reconstructed; ... structural archive at (5327.27, −4111.55) per § 3.3)'
   - open_flag_ids: extended with Plan 29-01 further partial-resolution note

2. **NEW Projects row** added to Frames Inventory (bold):
   `| **Projects** | **SCcln** | **IN-SCOPE** | **/projects (per Plan 29-01; v1.3 src/pages/projects/index.astro)** | **5** | **flat:0, partial:0, factored:5** | **n/a (Phase 29 plan 29-01 — reconstructed; FOURTH crito-source-flat-raster + FOURTH PAGE-11 ACTIVE + THIRD TagFilter consumer + FIRST ProjectCard consumer at scale)** | — |`

3. **NEW Plan 29-01 additions section** appended to § Variant Evidence (after Plan 29-00): 12-row Variant Evidence table covering Projects frame composition (SCcln + cF7Lg + TjK3X + c2G4Fg + h6iw9 + vWXhb + VlRQ0 + upm97/aEjJD + 6 ProjectCard refs + L5EmG + bRkNL) + Y2isa PAGE-11 ACTIVE mutation row + library/page-frame count notes + token drift summary.

4. **OPEN-23-05** annotation extended with "Phase 29 Plan 29-01 FURTHER PARTIAL RESOLUTION" + remaining long-tail list (cYlRH next at Plan 29-02; WDGxc remains long-tail per D-07).

5. **OPEN-25-07** annotation extended with Plan 29-01 6 instance consumer roster (n5ejTn + DRvTq + WAkzM + GbdZa + z5x28 + Cc0mF) + sibling-component pattern validation outcome.

6. **OPEN-23-12** annotation extended with Plan 29-01 Badge variant evaluation outcome (default j0FxQZ solid held; kJQmJ Outline NOT triggered; pill-radius consumer evidence still insufficient — Phase 32 sweep).

**Verification:**
- `grep -c "reconstructed-PHASE-29" .planning/research/PEN-INVENTORY.md` → 1 ✓
- `grep -c "Plan 29-01 additions" .planning/research/PEN-INVENTORY.md` → 1 ✓
- File grew 1170 → 1201 lines (+31)

## Task Commits

Each task was committed atomically (Plan 29-00 cadence preserved + chore commit at start):

0. **Chore: config toggles + milestone branching** — `bbb3f64`
1. **Task 0: Pre-flight + probes** — `f1d2579` (allow-empty marker per Plan 29-00 Task 0 precedent)
2. **Task 1: Projects top-level page frame** — `8f5fc8e` (+12 lines Crito.pen)
3. **Task 2: Composition (5 children + note)** — `3f364b2` (+248 lines Crito.pen)
4. **Task 3: Layout sweep + fit_content settle** — `01eefa9` (-1 line Crito.pen)
5. **Task 4: Calibration gate APPROVE** — `48f8985` (allow-empty decision marker)
6. **Task 5: PAGE-11 ACTIVE on Y2isa** — `bbad3c2` (+1 line Crito.pen)
7. **Task 6: PEN-INVENTORY mutations** — `3914051` (+35 / −4 PEN-INVENTORY.md)

**Plan metadata:** (this commit) `docs(29-01): complete Projects index reconstruction plan`

## Files Created/Modified

- `design/Crito.pen` — NEW Projects frame SCcln (5 children: Header + page-intro + TagFilter override + 6-card grid + Footer) + sibling note bRkNL + Y2isa.enabled:false
- `.planning/research/PEN-INVENTORY.md` — Y2isa row IN-PLACE reclassification + NEW Projects row + 12-row Plan 29-01 additions section + 3 OPEN flag annotation extensions

## Decisions Made

- **Calibration: APPROVE-clean** — all 5 section fidelity labels accepted per D-83 proposal; no REVISE loop; no GAP; no OPEN-29-NN raised.
- **Page-intro Option A held** — plain centered intro default per Phase 26/27 + Plan 28-03 Tag page-intro precedent. Option B coral banner pivot (per Plan 28-01 line 705) NOT triggered.
- **Badge variant default solid j0FxQZ held** at all 6 ProjectCard category-badge instances. kJQmJ Outline path NOT triggered.
- **D-130 DUAL pairing collapsed to single image** — Y2isa.fill.image == image-import-12.jpg = D-130 secondary pairing target. Calibration spot-check explicitly documented the collapse.

## Deviations from Plan

None — plan executed exactly as written. APPROVE-clean at calibration gate; both reserved REVISE/GAP paths not triggered.

## Carry-Forward Notes for Plan 29-02

- **FindEmptySpace anchor for Project detail frame:** `nodeId: "SCcln"` direction:right (next-right of Projects frame at ~(29767.27, −4111.55))
- **Compound/ProjectCard (DnsRs) validated at scale** — 6 instance consumers in Projects index. Plan 29-02 will instance 2-3 more via Section/RelatedProjects strip.
- **PAGE-11 ACTIVE target for Plan 29-02:** `cYlRH` (06_Service Details raster, FIFTH production use of PAGE-11 ACTIVE in v2.0).
- **Pencil MCP per-task Cmd+S save cadence is required** — user manually saves between tasks for git diffs to surface. Documented in this SUMMARY; pattern continues to Plan 29-02.
- **Variable count discrepancy** — Task 3 returned 127 vs Plan 29-00 SUMMARY's 126 baseline. Plan 29-01 ships zero new tokens (drift 0 within plan). Discrepancy is carry-forward baseline reconciliation, not a Plan 29-01 deviation.

## Self-Check: PASSED

All `<acceptance_criteria>` from Tasks 0-6 verified:
- ✓ Active editor / Plan 29-00 deliverables / Y2isa probe (image-import-12.jpg) / image-import-12.jpg accessible / FUctJ anchor / O1IwyS 10 paired-refs + ATJK9/UbwMv / M1Wu9 baseline empty / v1.3 content extracted
- ✓ FindEmptySpace honored FUctJ anchor (y ≈ −4111.55) / Projects frame at 1440w + vertical + center + white + placeholder
- ✓ 5 children in correct order / page-intro v1.3 verbatim / TagFilter 10-key override / projects-grid 1200w + 2-row 3-card / 6 ProjectCard refs / Footer / sibling note
- ✓ fit_content + placeholder:false / "No layout problems." / M1Wu9 still empty / token drift 0 within plan
- ✓ Calibration APPROVE / DUAL pairing collapsed documented
- ✓ Y2isa.enabled:false / x+y unchanged / FOURTH PAGE-11 ACTIVE production use
- ✓ Y2isa row IN-PLACE reclassified / NEW Projects row / Plan 29-01 additions section / OPEN-23-05 + OPEN-25-07 + OPEN-23-12 extended / page-frame count 7→8 / PAGE-11 ACTIVE count 3→4

Plan-level `<verification>` commands also confirmed passing.

Ready for Plan 29-02.

---
phase: 29-projects-reconstruction-index-project-detail
plan: 00
status: complete
completed: 2026-06-09
type: execute
tasks_completed: 5
tasks_total: 5
key_files_created:
  - design/Crito.pen (3 NEW reusable components inserted)
  - .planning/research/PEN-INVENTORY.md (Plan 29-00 additions section)
new_node_ids:
  Compound/ProjectCard: DnsRs
  Section/ResultsMetrics: y4RORu
  Section/RelatedProjects: OLSa0
sibling_note_ids:
  ProjectCard_note: cqN7R
  ResultsMetrics_note: chbda
  RelatedProjects_note: DZrSf
library_count: "25 → 28"
token_surface: "126 → 126 (unchanged — Option A heading-1 reuse held)"
page_frame_count: "7 → 7 (foundation plan — no page frames)"
---

# Plan 29-00 SUMMARY — Phase 29 Foundation Library

## Execution Note: Pencil MCP Subagent-Tool-Inheritance Caveat

Plan 29-00 (and all Phase 29 plans) executed INLINE by the main orchestrator per the carry-forward caveat from Plan 28-00 + 27-00. Pencil MCP tools (`mcp__pencil__*`) are NOT inherited by spawned `gsd-executor` subagents in the Claude Code runtime, so component-build work must run in the orchestrator's tool context.

D-140 pre-flight enforcement (`mcp__pencil__get_editor_state({include_schema: false})` before EVERY Pencil-mutating call) confirmed at Tasks 0, 1, 2, 3, 4. Active editor remained `design/Crito.pen` throughout.

## Task Outcomes

### Task 0: Pre-flight + baseline ID verification (PASS)

- ✓ Active editor: `design/Crito.pen`
- ✓ Token surface count: 126 user-facing variables (matches Phase 28 close; Plan 28-03 SUMMARY recorded same)
- ✓ All 28 baseline IDs from Phase 23-28 ship-set returned intact (avgor, t67DU6, g9oRa5, RpGbe, t40xct, ZSxZU, O1IwyS, etY5x, Hs5rc, N1jo3i, G0wNOc, Xs0Hs, M7eUr, hIWuC, j0FxQZ, kJQmJ, nwJk7, EQaMf, yRvGb, u7NmaS, dpO5Y, vGH3A, SoXch, FGdti, oTSwn, eNqxd, Y2isa, cYlRH) — zero nulls
- ✓ t67DU6 reusable children at probe: 3 (t40xct + SW4cz + ZSxZU)
- ✓ g9oRa5 reusable children at probe: 6 (G0wNOc + Xs0Hs + Hs5rc + N1jo3i + O1IwyS + etY5x)
- ✓ Y2isa (05_Service, image-import-12.jpg) + cYlRH (06_Service Details, image-import-15.jpg) both `enabled: true` — PAGE-11 ACTIVE prerequisite preserved for Plans 29-01/29-02

### Task 1: Compound/ProjectCard (PASS — default branch)

**New node:** `DnsRs` reusable inside t67DU6 + sibling note `cqN7R` at canvas root.

**Slot signature (4 slots per D-131 + D-132):**
- `image-slot` (v81bAX, untyped slot:[], enabled:true, 240h, fill #f2f2f7ff color-semantic-bg-surface-elevated) with 'Project image' placeholder text
- `content-area` (o3N8Pl, padding 24, gap 12) wrapping:
  - `category-badge-slot` (t4Rnn, TYPED slot:['j0FxQZ']) with default Badge ref child (QdrAM)
  - `title` (mY1QY, heading-3: Plus Jakarta Sans 24/700/lh 1.4 navy — SECOND-CONSUMER after BlogCard)
  - `body` (VRqcN, prose-paragraph: Inter 16/400/lh 1.625 secondary)

**Badge variant evaluation:** Default lean held — `j0FxQZ` (Badge/Default solid) per CONTEXT Claude's Discretion. No new Badge variant shipped. Plan 29-01 calibration may swap to ['kJQmJ'] Outline if image-import-12.jpg shows outline treatment.

**Crito-visual register per D-58 + D-132:** Borderless white card (strokeWidth 0; stroke reserved for forward-state variants). Width 380 matches Plan 28-01 BlogCard 3-col grid math. cornerRadius 10 + clip:true for image top-corner rounding.

**Hover/focus states:** Deferred to code milestone per Pitfall 7 (clickable-card pattern is interactive state; static design tool ships READING state per D-92/D-59 carry-forward).

### Task 2: Section/ResultsMetrics (PASS — Option A default held)

**New node:** `y4RORu` reusable inside g9oRa5 + sibling note `chbda` at canvas root.

**Slot signature (per D-135):**
- `heading-slot` (T4gdxa, untyped slot:[], enabled:true, fill_container) with default 'Results' heading-2 (REUSE per D-135 default + OPEN-26-01 carry-forward)
- `metrics-row` (o8ykx, horizontal, gap 24, fill_container) with 3 FIXED metric-tile children — NOT a slot per D-135 narrow-scoping:
  - `metric-tile-1` (Cj3hI): value `85%` (fQ3lT) + label `Time reduction in order processing` (le3Sb)
  - `metric-tile-2` (LBXI9): value `20hrs` (m9gef7) + label `Saved per week` (oFgt8)
  - `metric-tile-3` (xHArl): value `Zero` (MJNW6) + label `Missed orders since launch` (zd4Bh)

Each tile: vertical, gap 8, padding 24, white fill, 1px #d4d4d8ff border, 10 cornerRadius, alignItems start, fill_container.

**Token decision (D-135 mid-plan gate):** Option A default HELD — `metric-value` text bound to heading-1 reuse (Plus Jakarta Sans 48/700/lh 1.4 navy). Option B path (`type-semantic-metric-large` 60px composite per Phase 23 D-33 open-extension) NOT triggered — visual-reads escalation criterion did not surface during Task 2 build. Zero new tokens shipped.

**Chrome treatment:** Plain white + border + 10 radius (CONTEXT Claude's Discretion default). Coral pivot path documented (Plan 28-01 banner precedent) if Plan 29-02 calibration needs distinction.

**Default content:** From bakery-order-system project.results verbatim. Consumers (Plan 29-02) override 3 tile descendants per selected project.

### Task 3: Section/RelatedProjects (PASS — etY5x mirror)

**New node:** `OLSa0` reusable inside g9oRa5 + sibling note `DZrSf` at canvas root.

**Slot signature (mirror of etY5x per D-134):**
- `heading-slot` (skkDc, untyped slot:[], enabled:true) with default 'Related projects' heading-2 (NOT 'Related posts')
- `cards-row` (AyKCK, TYPED slot:['DnsRs'], horizontal, gap 24, alignItems start, fill_container) with 3 ProjectCard refs:
  - `ProjectCard-1` (zzp9o, ref DnsRs, fill_container)
  - `ProjectCard-2` (DcjgP, ref DnsRs, fill_container)
  - `ProjectCard-3` (Vyl5Z, ref DnsRs, fill_container)

All dimensions match etY5x: vertical gap 32, padding [32,0], width 1200, alignItems start.

**Narrow-scope rationale per D-134:** Project domain ONLY. NOT generalized into a Section/RelatedContent that handles both Posts + Projects — different content domain, different vocabulary, honest discoverability for downstream agents. Phase 31 Homepage may instance for 'recent work' if needed.

### Task 4: Plan-close sweep + PEN-INVENTORY + library count drift (PASS)

- ✓ `mcp__pencil__snapshot_layout({maxDepth: 0, problemsOnly: true})` returned `"No layout problems."` at document root
- ✓ `mcp__pencil__get_variables({})` returned 126 user-facing variables — UNCHANGED from Task 0 baseline (Option A held; zero new tokens)
- ✓ Library counts: avgor=16 unchanged + t67DU6=4 (was 3) + g9oRa5=8 (was 6) → total 28 reusable components (was 25)
- ✓ All 28 baseline IDs re-verified intact (ZERO regression of Phase 23-28 ship-set)
- ✓ PEN-INVENTORY.md updated with new `## Variant Evidence (Phase 29)` section containing `### Plan 29-00 additions` subsection: explanatory prose + 22-row Variant Evidence table + library count update + OPEN flag annotations (OPEN-25-07 partial-resolution + OPEN-23-10 status check + OPEN-23-12 status check)
- ✓ Sibling Pencil notes for all 3 new components placed at canvas root (NOT inside library parent frames per Plan 28-01 quirk + cqN7R / chbda / DZrSf node IDs recorded)
- ✓ Final layout sweep clean

## OPEN Flags

**OPEN-25-07 (Compound/Card consumer-resolution) — further partial resolution:**
Plan 29-00 ships sibling Compound/ProjectCard (DnsRs) per Plan 28-01 BlogCard precedent. Plan 29-01 + Plan 29-02 will produce the instance consumers (6 Projects index + 3 RelatedProjects). Final resolution moves to Phase 29 Plan 29-02 close per D-141.

**OPEN-23-10 (heading typography surface) — status check, NO change:**
Option B path (type-semantic-metric-large 60px composite) NOT triggered at Plan 29-00 Task 2 — heading-1 reuse default held. OPEN-23-10 (heading-5/-6 still open) unchanged.

**OPEN-23-12 (radius-semantic-pill candidate) — status check:**
ProjectCard category-badge inside Plan 29-01 grid may surface enough rounded-pill consumers (9999 cornerRadius via descendants override at instance time) to justify radius-semantic-pill at Phase 32 sweep. Plan 29-00 does NOT ship the token; Plan 29-01 plan-execution evaluates.

## Plan 29-01 + Plan 29-02 readiness checklist

**Plan 29-01 (Projects index page — Y2isa reconstruction) prerequisites:**
- ✓ Compound/ProjectCard (DnsRs) available for 6 grid instances with descendants overrides per project
- ✓ Section/TagFilter (O1IwyS) Plan 28-00 carry-forward available for category filter row
- ✓ Section/Header (G0wNOc) + Section/Footer (Xs0Hs) + Section/CTA (Hs5rc) available
- ✓ Y2isa (05_Service, image-import-12.jpg) confirmed `enabled: true` — PAGE-11 ACTIVE prerequisite preserved
- ✓ Calibration evaluation queued for Plan 29-01: heading-3 vs heading-4 title sizing + Badge solid vs Outline choice

**Plan 29-02 (Project detail page — cYlRH reconstruction) prerequisites:**
- ✓ Compound/ProjectCard (DnsRs) available for RelatedProjects instance (2-3 refs)
- ✓ Section/ResultsMetrics (y4RORu) available for results section instance (1 instance, 3 metric-tile descendants override per selected project.results)
- ✓ Section/RelatedProjects (OLSa0) available for related projects section instance
- ✓ Compound/Card (t40xct) or Compound/BlogCard (ZSxZU) available if Project detail needs additional card-family content
- ✓ Section/Header (G0wNOc) + Section/Footer (Xs0Hs) + Section/CTA (Hs5rc) + Section/NavBack (N1jo3i) available
- ✓ cYlRH (06_Service Details, image-import-15.jpg) confirmed `enabled: true` — PAGE-11 ACTIVE prerequisite preserved
- ✓ Calibration evaluation queued for Plan 29-02: chrome treatment for metric-tiles (plain vs coral pivot) + heading-1 vs metric-large escalation

## Provenance Summary

- **D-131:** Upfront commit to sibling ProjectCard (no REVISE-loop risk). Evidence: image-import-12.jpg + v1.3 ProjectCard.astro.
- **D-132:** 4-slot signature (image + content-area wrapping category-badge + title + body); typed category-badge-slot.
- **D-134:** RelatedProjects as etY5x mirror with cards-row ref swap.
- **D-135:** ResultsMetrics as Joel-content essential with 3 FIXED tiles (not slot); heading-1 default reuse with Option B reserved.
- **D-138:** Foundation-first ordering (29-00 → 29-01 → 29-02) per Plan 27-00 + Plan 28-00 pattern.
- **D-139:** No user calibration gate fired (agent-deterministic foundation work; both reserved gates Option B + Badge variant defaulted to no-ship).
- **D-140:** Pre-flight enforcement confirmed at every Pencil-mutating call (Tasks 0, 1, 2, 3, 4).
- **D-141:** PEN-INVENTORY extended per the Variant Evidence + library count + OPEN flag annotation pattern.

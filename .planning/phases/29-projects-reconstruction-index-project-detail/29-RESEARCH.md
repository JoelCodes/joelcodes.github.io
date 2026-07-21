# Phase 29: Projects Reconstruction (Index + Project Detail) — Research

**Researched:** 2026-06-09
**Domain:** Pencil MCP `.pen` reconstruction — Crito-source-flat-raster branch (Y2isa + cYlRH) — 3-plan foundation-first ordering — Compound/ProjectCard upfront + Section/ResultsMetrics + Section/RelatedProjects + Section/TagFilter REUSE
**Confidence:** HIGH (CONTEXT D-127..D-141 are locked; all upstream slot/component/frame IDs are verified by reading PEN-INVENTORY rows + Phase 25/27/28 SUMMARYs; Pencil tool catalogue HIGH per Phase 28 production carry-forward; image-import-NN.jpg indices for Y2isa + cYlRH are LOW until Plan 29-01/02 Task 0 probes)

## Summary

Phase 29 reconstructs the Crito `05_Service` (Y2isa) + `06_Service Details` (cYlRH) flat-raster frames as editable `Projects` + `Project` top-level page frames per PAGE-02 + PAGE-09 + PAGE-11 + VALID-01/02/03. The CONTEXT.md decision chain (D-127..D-141) is fully locked: 3 plans (29-00 foundation + 29-01 index + 29-02 detail), `crito-source-flat-raster` branch on BOTH page frames, PAGE-11 ACTIVE post-APPROVE on Y2isa + cYlRH (FOURTH + FIFTH production uses in v2.0), and PEN-INVENTORY reclassification mutations (first non-additive change in v2.0).

Plan 29-00 ships **3 new narrow-scoped library entries** with possible Badge variant + possible new token: (1) `Compound / ProjectCard` (sibling of t40xct + ZSxZU per D-131 upfront commit — skips REVISE-loop risk per Plan 28-01 lesson, accepts Pitfall 1 tension mitigated by image-import-12.jpg + v1.3 src dual evidence); (2) `Section / ResultsMetrics` (3-fixed metric-tile structure — Joel-content essential per D-129 hybrid carve-out + D-135); (3) `Section / RelatedProjects` (3-ProjectCard horizontal row — narrow-scoped per D-134 mirror of Phase 28 RelatedPosts). Plans 29-01 + 29-02 consume the foundation, dual-pair Plan 29-01 calibration gate per D-130 (Y2isa overall + image-import-12.jpg ProjectCard fidelity), and single-pair Plan 29-02 per § 3.4.

**Primary recommendation:** Lift Phase 28 patterns directly. Compound/ProjectCard mirrors Compound/BlogCard (ZSxZU) slot signature with 1 swap (date-row → category-badge-slot); Section/RelatedProjects mirrors Section/RelatedPosts (etY5x) structure with 3 ProjectCard refs in cards-row instead of 3 t40xct refs; Section/TagFilter (O1IwyS) is REUSED with descendants override (category labels) at Plan 29-01 instance time. Plan 29-01 anchors on `FUctJ` (Tag frame from Plan 28-03); Plan 29-02 anchors on Plan 29-01 Projects frame. Heading-3 (24px) for ProjectCard title default per D-132 Claude's Discretion + Plan 28-01 BlogCard heading-3 first-consumer precedent.

## Standard Stack

### Core (Pencil MCP — production-proven through Phase 28)

| Tool | Purpose | Why Standard |
|------|---------|--------------|
| `mcp__pencil__get_editor_state({include_schema:false})` | Pre-flight active-editor assertion before EVERY mutating call | D-140 carry-forward chain Phase 23 OPEN-23-14 → 24 D-35 → 25 D-54 → 26 D-87 → 27 D-103 → 28 D-125; production-proven across ~14 calls Phase 24, 4+ calls Phase 25, every plan Phase 26-28 |
| `mcp__pencil__batch_get` | Verify baseline IDs intact + probe Y2isa/cYlRH raster `fill.image` for image-import-NN.jpg index | Used at start of every Phase 24-28 plan; production-proven |
| `mcp__pencil__get_variables({})` | Token surface drift verification (107 actual var count or 100 logical per plan-spec convention — Phase 28 plan-spec inconsistency at 107 vs 127 actual due to composite-as-N-sub-vars per Phase 26 precedent — accept as known) | Per § 4.4 step 2 and Phase 28 carry-forward |
| `mcp__pencil__batch_design` | Insert/Update for new components + page frames + descendants overrides; PAGE-11 ACTIVE `Update("Y2isa"/"cYlRH", {enabled:false})` post-APPROVE only | Mutation workhorse; ~25 ops cap per call (chunk per Plan 27-02 Pitfall 9 lesson) |
| `mcp__pencil__find_empty_space_on_canvas` | Place Projects + Project frames in the page-frame row (y ≈ −4111) using `nodeId` anchor | § 10.4 Plan 26-02 contribution carry-forward; mandatory `nodeId` argument |
| `mcp__pencil__snapshot_layout({maxDepth:0, problemsOnly:true})` | Plan-close layout sweep at document root + per-frame check | Phase 24-28 plan-close discipline; expected "No layout problems." with per-frame text-clipping false positives per Pitfall 5 |
| `mcp__pencil__get_screenshot({nodeId})` | Calibration-gate inline render of page frame + sub-sections + raster comparison | OPEN-23-01 inline-only — NEVER disk-written; pair with raster paths from `design/images/` |
| `mcp__pencil__set_variables` | ONLY if Plan 29-00 ships new `type-semantic-metric-large` primitive per D-135 plan-execution evaluation (default: reuse `type-semantic-heading-1` 48px) | Phase 23 D-33 open-extension policy; Phase 28 D-106 .fig fallback precedent for mid-plan user gate if needed |

### Supporting

| Tool | When to Use |
|------|-------------|
| `mcp__pencil__get_guidelines({topic:"design-system"})` | Plan 29-00 start to refresh slot mechanics for 3 new components |
| `Read` (v1.3 src files) | Content extraction per D-138 — projects.json + index.astro + [slug].astro + ProjectCard.astro (per CONTEXT line 251 — content-only references, NOT visual references) |

### Tools NOT in scope

| Tool | Why Not |
|------|---------|
| `mcp__pencil__export_nodes` | Broken for `.pen` files (MCP error -32603 per OPEN-23-01); substitution: structural JSON archive at `.planning/research/exports/v2.0/end-of-phase-29/id-inventory.json` |
| `mcp__pencil__replace_all_matching_properties` | Not needed — Phase 29 ships ZERO raw-value leaks by construction (all properties bind to semantic tokens at insert time) |
| `mcp__pencil__search_all_unique_properties` | Tool does NOT exist in current Pencil MCP build per OPEN-23-02 — manual walker pattern per Plan 24-05 sweep precedent if needed |

### Installation

No installation — Pencil MCP tools available via the orchestrator's MCP namespace. **Caveat per Phase 26-28 production:** Pencil MCP tools are NOT inherited by spawned `gsd-executor` subagents (subagent tool namespace: `Read, Write, Edit, Bash, Grep, Glob`). All Phase 29 plans MUST execute INLINE by the main orchestrator. This is a documented subagent-tool-inheritance caveat carried forward from Plan 26-01 onwards.

## Architecture Patterns

### Recommended Project Structure

```
design/Crito.pen
├── _Components / Primitives (avgor — 18 children)         # NO Phase 29 additions (unless D-132 Badge variant ships)
├── _Components / Compounds (t67DU6 — 3 children)          # +1 NEW: Compound/ProjectCard (D-131) → 4 children
├── _Components / Sections (g9oRa5 — 6 children)           # +2 NEW: Section/ResultsMetrics + Section/RelatedProjects → 8 children
├── _Tokens & Foundations (RpGbe)                          # UNCHANGED (unless D-135 metric-value token ships)
└── (page-frame row, y ≈ -4111)
    ├── FAQ (b7Hgy) ... 404 (csXky) ... Thank-you (XsDab) ... Contact (n0QqTd)
    ├── Blog (EDAf1) ... Blog Post (aQ8FL) ... Tag (FUctJ)
    ├── Projects (NEW — Plan 29-01, anchored on FUctJ via FindEmptySpace nodeId)
    └── Project (NEW — Plan 29-02, anchored on Projects frame from 29-01)

Raster archives (PAGE-11 ACTIVE post-APPROVE):
    ├── Y2isa (05_Service) → enabled:false post-Plan-29-01 APPROVE (FOURTH v2.0 use)
    └── cYlRH (06_Service Details) → enabled:false post-Plan-29-02 APPROVE (FIFTH v2.0 use)
```

### Pattern 1: Sibling-Component on Raster Divergence (D-131 upfront commit)

**What:** When a Crito raster's card shape diverges from `Compound / Card` (t40xct) general-purpose, ship a narrow-scoped sibling Compound inside t67DU6 instead of mutating t40xct.

**When to use:** Phase 29 commits this UPFRONT (Plan 29-00 foundation) for `Compound / ProjectCard` — skipping the REVISE-loop risk Phase 28 paid in Plan 28-01 (BlogCard birth at v1 calibration REVISE) per D-131 evidence: image-import-12.jpg + v1.3 ProjectCard.astro provide enough source evidence to skip the probe.

**Example (Plan 28-01 BlogCard precedent):**
```javascript
// Source: PEN-INVENTORY § Plan 28-01 additions, lines 695-702
// Compound / BlogCard (ZSxZU) — sibling of t40xct (NOT mutation):
Insert(t67DU6, {
  type: "frame",
  reusable: true,
  name: "Compound / BlogCard",
  layout: "vertical", gap: 0, padding: 0,
  width: 380,              // 3-col blog grid math: (1200 - 2*24)/3 ≈ 384, rounded 380
  cornerRadius: 10,         // radius-semantic-card
  fill: "#ffffffff",        // color-semantic-bg-page
  stroke: "#d4d4d8ff",      // color-semantic-border-default (kept for forward-state reuse)
  strokeWidth: 0,           // borderless per Crito raster (preserved for future Outline/Hover)
  strokeAlignment: "inner",
  clip: true                // for image top-corner rounding
})
```

**Anti-pattern:** DO NOT mutate t40xct's slot signature to accommodate project cards. t40xct continues to serve Phase 27 Contact sidebar consumer + future Phase 31 Homepage cross-card consumers unchanged. Phase 29 carry-forward of Plan 28-01 lesson per D-131.

### Pattern 2: Section Component Mirroring (D-134 RelatedProjects = mirror of Phase 28 RelatedPosts)

**What:** Section/RelatedProjects (D-134) has IDENTICAL slot signature shape to Section/RelatedPosts (etY5x) — only the cards-row TYPED slot suggestion + default refs swap from `['t40xct']` (RelatedPosts) to `['<ProjectCard-new-id>']` (RelatedProjects). Mirror the Phase 28 Plan 28-00 Task 5 batch_design pattern directly.

**Example (Phase 28 RelatedPosts structure to mirror — PEN-INVENTORY lines 680-685):**
```javascript
// etY5x = Section / RelatedPosts (reusable:true, vertical, gap 32, padding [32,0], width 1200, alignItems start)
// ├── W1edi = heading-slot (slot:[], enabled:true default, vertical, alignItems start)
// │   └── uQJdO = heading text "Related posts" (heading-2: PJS 32/700/lh 1.4, navy)
// ├── j9KOm = cards-row (slot:['t40xct'] TYPED, horizontal, gap 24, alignItems start, width fill_container)
// │   ├── HmMOm = card-1 (ref t40xct, fill_container)
// │   ├── mHWPU = card-2 (ref t40xct, fill_container)
// │   └── olBLe = card-3 (ref t40xct, fill_container)
// └── sUijx = sibling Pencil note documenting slot signature + narrow-scope rationale

// Plan 29-00 Section/RelatedProjects mirrors this EXACTLY with one swap:
//   cards-row slot:['<new-ProjectCard-id>'] + 3 refs to new ProjectCard component
//   heading text default 'Related projects' (per D-134)
```

### Pattern 3: TagFilter Reuse via Descendants Override (D-137 third consumer validates D-115 broad-scoping)

**What:** Plan 29-01 Projects index instances Section/TagFilter (O1IwyS) — NO new Section/CategoryFilter component built. Plan 29-01 instance descendants override the pill label content via Phase 24 Button label IDs `ATJK9` (M7eUr Default Button label) + `UbwMv` (hIWuC Secondary Button label).

**Example (paired-ref active-state mechanic — PEN-INVENTORY lines 675-678):**
```javascript
// O1IwyS slot signature:
//   ├── iHWbI = heading-slot (slot:[], enabled:false default)
//   └── CNqq9 = pills-row (horizontal, gap 12, alignItems center, justifyContent center)
//       │   10 paired-ref children (5 positions × 2 refs each):
//       ├── Position 1 ACTIVE: RxShj (M7eUr ref, label "All Posts", cornerRadius 9999, enabled:true)
//       ├── Position 1 INACTIVE shadow: z1aro (hIWuC ref, label "All Posts", enabled:false)
//       ├── Position 2 ACTIVE shadow: al86r (M7eUr ref, label "automation", enabled:false)
//       ├── Position 2 INACTIVE: u3X64E (hIWuC ref, label "automation", enabled:true)
//       ├── Position 3 ACTIVE shadow: C93nA (M7eUr ref, label "small-business", enabled:false)
//       ├── Position 3 INACTIVE: j4KiI (hIWuC ref, label "small-business", enabled:true)
//       ├── Position 4 ACTIVE shadow: m35My (M7eUr ref, label "productivity", enabled:false)
//       ├── Position 4 INACTIVE: EXgTG (hIWuC ref, label "productivity", enabled:true)
//       ├── Position 5 ACTIVE shadow: CCXCE (M7eUr ref, label "ai", enabled:false)
//       └── Position 5 INACTIVE: hMIRk (hIWuC ref, label "ai", enabled:true)

// Plan 29-01 Projects index instance — descendants override:
Insert(<Projects-frame>, {
  type: "ref",
  ref: "O1IwyS",
  descendants: {
    // Position 1 — Active label change "All Posts" → "All Projects" (default-active preserved)
    "RxShj": { descendants: { "ATJK9": { content: "All Projects" } } },
    "z1aro": { descendants: { "UbwMv": { content: "All Projects" } } },  // shadow content match
    // Position 2 — "automation" → "Web Apps" (inactive default preserved)
    "al86r": { descendants: { "ATJK9": { content: "Web Apps" } } },
    "u3X64E": { descendants: { "UbwMv": { content: "Web Apps" } } },
    // Position 3 — "small-business" → "Automation"
    "C93nA": { descendants: { "ATJK9": { content: "Automation" } } },
    "j4KiI": { descendants: { "UbwMv": { content: "Automation" } } },
    // Position 4 — "productivity" → "AI Development"
    "m35My": { descendants: { "ATJK9": { content: "AI Development" } } },
    "EXgTG": { descendants: { "UbwMv": { content: "AI Development" } } },
    // Position 5 — "ai" → DISABLE BOTH (only 4 categories per v1.3 — 1 All + 3 categories per D-137)
    "CCXCE": { enabled: false },
    "hMIRk": { enabled: false }
  }
})
```

**Note:** v1.3 ships exactly 4 filter buttons (`All Projects` + 3 categories). Position 5 must be disabled at both Active + Inactive shadows. Per Plan 28-03 D-117 paired-ref active-state-flip validation, per-instance descendants behavior is verified to work cleanly. Plan 28-01 Blog index instance (M1Wu9) remains UNCHANGED after Plan 28-03 + Plan 29-01 mutations.

### Pattern 4: Back-nav Inline Composition (D-133 — NOT Section/NavBack reuse)

**What:** Plan 29-02 Project detail back-nav is a 2-sibling inline composition at top of Project frame: `Primitive / Icon / 16` instance (lucide `arrow-left` glyph swap) + text node "Back to Projects". NOT a Section/NavBack instance — preserves D-79 narrow-scoping (NavBack is 404-only).

**Why NOT Section/NavBack:** Phase 26 Section/NavBack (N1jo3i) ships heading + 3-4 links to key pages — reusing it with descendants override hiding heading + 3 links would violate D-79 + produce an awkward instance.

**Example (Phase 27 D-99 secondary text-link precedent + Phase 24 D-44 Pattern A glyph swap):**
```javascript
// Project frame Task 2 — back-nav horizontal composition
Insert(<Project-frame>, {
  type: "frame",
  name: "back-nav",
  layout: "horizontal",
  gap: 8,                  // space-semantic-inline-sm adjacent (Pencil § 12 "Inside buttons [10, 16]" — 8 reads tight)
  alignItems: "center",
  padding: [32, 0, 0, 0],  // top padding from Header
  // Plan-execution: width: fill_container OR fixed 1200 inside page-frame center
})

// Child 1: Icon 16 ref with arrow-left glyph swap
Insert(<back-nav-frame>, {
  type: "ref",
  ref: "EQaMf",                                       // Primitive / Icon / 16 (Phase 24)
  descendants: {
    "<icon-node-id-inside-EQaMf>": { icon: "arrow-left" }   // Pattern A native swap per Phase 24 D-44
  }
})
// Note: arrow-left is lucide-native (verified Phase 24 PEN-INVENTORY line 803). chevron-left is also available per CONTEXT D-133 alternatives.

// Child 2: text node "Back to Projects" (v1.3 verbatim per D-138 + D-82)
Insert(<back-nav-frame>, {
  type: "text",
  content: "Back to Projects",
  fontFamily: "Inter",       // type-semantic-body-family
  fontSize: 16,              // type-semantic-body-size
  fontWeight: "500",         // bold-ish for affordance per Phase 27 D-99 secondary-link
  fill: "#15bee3ff",         // color-semantic-text-accent (CONTEXT default per D-133)
  lineHeight: 1.5            // type-semantic-body-lh
})
```

**Decision tree:**
- Default icon glyph: `arrow-left` (lucide-native per Phase 24 D-44 Pattern A; verified in `ujMLJ > OW4HR`)
- Alternative: `chevron-left` (also lucide-native; consider if Crito source / image-import-12.jpg shows a thinner chevron treatment)
- Color: `color-semantic-text-accent` (#15bee3ff cyan) per D-133 default; alternative `color-semantic-text-secondary` (#52525bff slate) if Crito agency-template register treats secondary nav muted

### Anti-Patterns to Avoid

- **DO NOT mutate t40xct slot signature** to accommodate ProjectCard (D-131 ships sibling per Plan 28-01 BlogCard precedent — t40xct serves Phase 27 + future Phase 31 unchanged)
- **DO NOT build Section/CategoryFilter** as a separate component (D-137 reuses Section/TagFilter with descendants override; component-library count stays at 8 sections after Phase 29)
- **DO NOT reuse Section/NavBack for Project back-nav** (D-133 preserves D-79 narrow-scoping for 404-only)
- **DO NOT hide Y2isa or cYlRH BEFORE APPROVE** (Pitfall 4 strict observance — `Update(<raster>, {enabled:false})` fires ONLY after Plan-close calibration gate APPROVE)
- **DO NOT pull in Screenshots / Testimonial / Built With sections** (D-136 explicit OPEN-29-NN deferral) unless cYlRH raster probe at Plan 29-02 Task 0 surfaces structural evidence (D-129 hybrid carve-out allows pullback)
- **DO NOT eyedrop colors from image-import-12.jpg or cYlRH raster** (Pitfall F3 — raster JPGs are visual proxies for PROPORTION + COLOR-RANGE only; values bind to existing semantic tokens)
- **DO NOT pre-emptively ship Compound/ProjectCard hover/focus variants** (Pitfall 7 — clickable-card hover/focus pattern is interactive state, ships at code milestone per Phase 25 D-59 / Phase 26 D-92 carry-forward)
- **DO NOT use `Move()` to reorder children after batch_design Insert** (Plan 28-01 + 28-02 Pencil quirk — Move() does NOT trigger flex re-render; workaround is Delete + recreate parent in correct order)
- **DO NOT rely on `fit_content` height for page frames** (Plan 28-01/02 quirk — fit_content captures ~50px short of cumulative children; use explicit height ~2000-3000 then settle)
- **DO NOT place Pencil notes INSIDE page frames** (Plan 28-01 quirk — notes don't follow flex layout and double-count height; place at document root as siblings of page frame)

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Category filter pills for Projects index | New `Section / CategoryFilter` component | Section/TagFilter (O1IwyS) reuse with descendants override on pill labels | D-137 validates D-115 broad-scoping with third consumer (Blog + Tag + Projects); honest documentation via optional sibling Pencil note |
| Project card with image + title + body + category | New per-page inline card markup | Compound/ProjectCard (NEW Plan 29-00) ships once, instanced 9× across 2 frames (6 Projects index + 3 Project detail's RelatedProjects) | D-131 sibling-component pattern per Plan 28-01 BlogCard precedent; 9× consumer cost amortizes 1× build |
| Related projects strip at bottom of Project detail | Inline 3-card row in Plan 29-02 | Section/RelatedProjects (NEW Plan 29-00) | D-134 narrow-scoped sibling of Phase 28 Section/RelatedPosts; ROADMAP success criterion 3 ('related projects strip factored as section component') satisfied literally |
| Results 3-metric grid on Project detail | Inline 3-cell layout in Plan 29-02 | Section/ResultsMetrics (NEW Plan 29-00) | D-135 narrow-scoped Joel-content essential; case-study payoff lives in dedicated component; Joel's domain vocab (NOT generalized into Section/StatsGrid) |
| Back-nav text-link with icon | Custom redrawn nav | Inline composition of Primitive/Icon/16 + text node (D-133) | D-133 + Phase 27 D-99 secondary-link pattern; defer Section/SecondaryLink until 3rd consumer per Pitfall O5/O6 minimalism |
| `arrow-left` glyph | Atomic-glyph component (Pattern B per Phase 24 D-46) | `library:"lucide", icon:"arrow-left"` Pattern A native (per Phase 24 D-44) | arrow-left is verified lucide-native (PEN-INVENTORY line 803); Pattern A is preferred when lucide has the glyph |
| Heading-2 size for ResultsMetrics heading | New token for 'Results' heading | Existing `type-semantic-heading-2-*` (32px from Phase 26 Plan 26-00) | D-135 default reuses heading-2; only ship NEW `type-semantic-metric-large` for the METRIC VALUES (48-60px display) if plan-execution surfaces need at calibration gate |
| Date stamp / Read More CTA on ProjectCard | Slots for these in ProjectCard signature | Drop per D-132 footer-actions-slot — v1.3 ProjectCard is clickable card WITHOUT inline CTA | Pitfall 7 — footer-actions-slot would have no instance-time consumer; image-import-12.jpg date + 'Read More' arrow are dropped per D-132 |

**Key insight:** Phase 29 ships **3 new library entries** maximum (Plan 29-00 ProjectCard + ResultsMetrics + RelatedProjects). Possible 4th entry (Badge variant) per D-132 plan-execution evaluation against image-import-12.jpg Project card categories. Possible 1 new token (`type-semantic-metric-large`) per D-135 plan-execution. Library count moves at most from 25 → 28 reusable components.

## Common Pitfalls

### Pitfall 1: PAGE-11 ACTIVE fires before APPROVE (Plan 27-02 + 28-01 + 28-02 strict observance)

**What goes wrong:** `Update("Y2isa"/"cYlRH", {enabled:false})` fires before user APPROVE at the calibration gate, hiding the raster before the reconstruction passes spot-check. User cannot do a final side-by-side without re-enabling the raster.

**Why it happens:** Agent attempts to batch the PAGE-11 mutation with calibration-gate logic for tool-call efficiency.

**How to avoid:** Strict sequencing per CALIBRATION-PROTOCOL § 3.4 step 7: gate FIRST (AskUserQuestion APPROVE/REVISE/GAP) → ONLY on APPROVE → THEN `Update(<raster>, {enabled:false})`. Plan 29-01 hides Y2isa post-APPROVE; Plan 29-02 hides cYlRH post-APPROVE. Each plan ships PAGE-11 ACTIVE as a separate task AFTER its calibration gate.

**Warning signs:** batch_design ops list contains both the calibration-gate request AND the Update(raster, {enabled:false}) — they MUST be split across two batch_design calls separated by the AskUserQuestion gate.

### Pitfall 2: Reclassification mutation order in PEN-INVENTORY (first non-additive change in v2.0)

**What goes wrong:** D-128 mutates Y2isa + cYlRH rows in-place — `joel_page_map` 'none' → 'Projects'/'Project detail'; drops `token-mining-only` qualifier; `status_counts` flat:1 → hidden:1 post-APPROVE; reconstruction priority `n/a` → `n/a (Phase 29 plan 29-NN — reconstructed; raster hidden via enabled:false per PAGE-11 ACTIVE)`. Earlier Phase 26-28 rows were ADDED, not RECLASSIFIED.

**Why it happens:** First non-additive PEN-INVENTORY change in v2.0; agent may forget to drop the token-mining-only qualifier or update reconstruction_priority correctly.

**How to avoid:** Plan-execution writes both Y2isa + cYlRH mutations explicitly per D-141 row-update pattern (parallel to Phase 27 cl8tt + Phase 28 DzqTm/w1m3x reclassification chain). Per-plan close: also update OPEN-23-05 (Y2isa + cYlRH partial-resolution — only `04_About` remains long-tail).

**Warning signs:** PEN-INVENTORY Frames Inventory row for Y2isa or cYlRH still contains `token-mining-only` in scope column OR `joel_page_map: 'none (token mining only)'` after Plan 29-01/02 APPROVE — reclassification incomplete.

### Pitfall 3: image-import-NN.jpg index identification (Plan 27-02 + Plan 28-02 precedent)

**What goes wrong:** Y2isa + cYlRH raster `fill.image` paths are UNKNOWN until Plan 29-01 + 29-02 Task 0 probes. Plan 27-02 found cl8tt = image-import-18.jpg; Plan 28-01 found DzqTm = image-import-14.jpg (matched Phase 25 D-49 prediction); Plan 28-02 found w1m3x = `images/image-import.jpg` (NO `-NN` suffix — first identification per OPEN-28-03 — likely a different convention from numbered rasters).

**Why it happens:** Raster file naming is non-uniform — some have suffixes, some don't. Convention drift across Crito source.

**How to avoid:** Plan 29-01 Task 0 probes `batch_get(['Y2isa'], readDepth: 2)` for `fill.image`. Plan 29-02 Task 0 same for cYlRH. Document filenames in PEN-INVENTORY + plan SUMMARY. CONTEXT D-130 dual-pairing identifies image-import-12.jpg as the Project card visual proxy (confirmed by Phase 25 D-49 raster-probe).

**Warning signs:** Plan can't identify raster filename → fall back to user-side editor visual verification at calibration gate per § 6.4 Tier-2.

### Pitfall 4: Cross-row stale-cache get_screenshot quirk (OPEN-26-02)

**What goes wrong:** `mcp__pencil__get_screenshot` returns blank-white for newly-created subtrees. Plan 26-01 cleared via cross-row position Update; Plan 26-02 same-row Update didn't clear; Plan 27-02 + 28-01 + 28-02 + 28-03 production-observed.

**How to avoid (Tier-1):** `Update(<new-page-frame>, {x: <new-x>, y: <different-row-y>})` then move back — cross-row Update clears the cache.

**How to avoid (Tier-2 fallback):** If Tier-1 fails, fall back to user-side editor verification in Pencil at the calibration gate. Structural verification via `batch_get` + `snapshot_layout` remains authoritative.

**Recovery script (Plan 29-01 + 29-02 calibration gates):**
```javascript
// Tier-1 attempt
get_screenshot({ nodeId: "<Projects-frame-id>" })
// If blank-white → cross-row move:
batch_design: `Update("<Projects-frame-id>", { x: <current-x>, y: <library-row-y ~ -11711> })`
batch_design: `Update("<Projects-frame-id>", { x: <current-x>, y: <page-row-y ~ -4111> })`
get_screenshot({ nodeId: "<Projects-frame-id>" })

// If Tier-1 fails → Tier-2 fallback:
// AskUserQuestion description: "Tier-2 fallback per OPEN-26-02 § 6.4 — get_screenshot stale-cache could not be cleared.
//  Please verify visually in Pencil's editor at canvas position (<x>, <y>) and confirm composition matches the
//  Y2isa raster reference at design/images/image-import-NN.jpg."
```

**Warning signs:** screenshot returns blank-white twice → Tier-2 immediately (don't loop more workarounds).

### Pitfall 5: Pencil layout-engine quirks (Plan 28-01 + 28-02 carry-forward)

**What goes wrong:**
1. **Move() does NOT trigger flex-layout re-render:** Inserting then Moving a frame updates children-array semantically but renders at original insertion position.
2. **fit_content height fails to capture last ~50px:** Page frame fit_content height reports H - 50.
3. **Pencil notes don't participate in flex layout the same way frames do:** Notes at canvas position render where placed but also contribute height to parent layout calc — double-counting.
4. **fontFamily expects single font name, not CSS stack** (OPEN-28-04) — Plan 29 likely not affected unless metric-value typography needs mono fallback.

**How to avoid:**
1. After Insert: if order is wrong, DELETE + RECREATE parent with children in correct semantic + visual order. Don't Move().
2. Use explicit page-frame height during build (~2400-3400 estimate); switch to fit_content ONLY at final task per Plan 26-02 Task 4 pattern.
3. Place sibling Pencil notes at document root, NOT inside page frames.

**Warning signs:** snapshot_layout shows children at unexpected y positions despite correct semantic order → Pitfall 5.1 active.

### Pitfall 6: snapshot_layout text-clipping false positives

**What goes wrong:** `snapshot_layout({problemsOnly:true})` reports "partially clipped" or "fully clipped" for text children inside button/badge frames due to a known Pencil text-y-coordinate quirk (first observed Plan 24-02 Q1 probe; re-observed Phase 25-28 plan-closes).

**How to avoid:** Document the false-positives in plan SUMMARY with citation to Phase 24 quirk; user visually verify; do NOT attempt to mitigate (no real rendering bug).

**Warning signs:** "partially clipped" reports on text children inside Button/Badge frames — benign per Phase 24-28 precedent.

## Code Examples

Verified patterns from Phase 28 production + PEN-INVENTORY Variant Evidence rows.

### Example 1: Compound/ProjectCard slot signature derivation (D-131 + D-132)

```javascript
// Source: D-132 + Plan 28-01 BlogCard pattern (PEN-INVENTORY lines 695-702)
// + v1.3 src/components/ProjectCard.astro lines 19-52

// 1. Parent frame (sibling of t40xct + ZSxZU inside t67DU6)
Insert(t67DU6, {
  type: "frame",
  reusable: true,
  name: "Compound / ProjectCard",
  layout: "vertical", gap: 0, padding: 0,
  width: 380,              // CONTEXT Claude's Discretion default per Plan 28-01 BlogCard math
  cornerRadius: 10,         // radius-semantic-card
  fill: "#ffffffff",        // color-semantic-bg-page
  stroke: "#d4d4d8ff",      // color-semantic-border-default (reserved)
  strokeWidth: 0,           // borderless per Crito-vocab register (or 1 if image-import-12.jpg shows border — plan-execution decides)
  strokeAlignment: "inner",
  clip: true
})

// 2. image-slot (16:9 placeholder per v1.3 line 24 aspect-ratio; mirror BlogCard 240h proportion)
Insert(<projectCard-id>, {
  type: "frame",
  name: "image-slot",
  slot: [],                  // untyped per BlogCard pattern
  enabled: true,
  layout: "vertical",
  justifyContent: "center",
  alignItems: "center",
  width: "fill_container",
  height: 214,                // 380 * 9/16 = 213.75; or 240 to match BlogCard prominence (plan-execution decides)
  fill: "#f2f2f7ff"          // color-semantic-bg-surface-elevated
})
// Child: placeholder text "Project image" (Inter 14/500 #52525bff)

// 3. content-area frame
Insert(<projectCard-id>, {
  type: "frame",
  name: "content-area",
  layout: "vertical",
  gap: 12,                   // space-semantic-stack-sm adjacent (matches BlogCard rhythm)
  padding: 24,               // space-primitive-24 per Pencil § 12 "Inside cards"
  width: "fill_container"
})

// 3a. category-badge-slot (NEW for ProjectCard vs BlogCard's date-row)
Insert(<content-area-id>, {
  type: "frame",
  name: "category-badge-slot",
  slot: ["j0FxQZ"],         // TYPED per D-52 PREFERRED — Badge/Default solid per CONTEXT Claude's Discretion default lean
                             // OR slot: ["kJQmJ"] if Badge/Outline preferred per image-import-12.jpg evaluation
                             // OR slot: [] untyped per BlogCard precedent (recommended for narrow-scoping)
  layout: "horizontal",
  alignItems: "center",
  width: "fill_container"
})
// Child: 1 Badge ref (j0FxQZ default OR kJQmJ Outline) with descendants override on label content

// 3b. title-slot — heading-3 candidate per D-132 + Plan 28-01 heading-3 first-consumer precedent
Insert(<content-area-id>, {
  type: "text",
  name: "title",
  content: "Project title placeholder",
  fontFamily: "Plus Jakarta Sans",   // type-semantic-heading-3-family (24px PJS per Phase 28 Plan 28-00)
  fontSize: 24,                       // type-semantic-heading-3-size (per CONTEXT Claude's Discretion default; heading-4 20px also valid per v1.3 text-xl)
  fontWeight: "700",                  // type-semantic-heading-3-weight
  fill: "#141f39ff",                  // color-semantic-text-primary
  lineHeight: 1.4,                    // type-semantic-heading-3-lh
  width: "fill_container"
})

// 3c. body-slot — problem excerpt 160-char truncate convention per v1.3 lines 14-16
Insert(<content-area-id>, {
  type: "text",
  name: "body",
  content: "Project problem excerpt placeholder describing the challenge briefly. Replace at instance time with first 160 chars of project.problem from projects.json.",
  fontFamily: "Inter",                // type-semantic-prose-paragraph-family
  fontSize: 16,                       // type-semantic-prose-paragraph-size
  fontWeight: "400",                  // type-semantic-prose-paragraph-weight
  fill: "#52525bff",                  // color-semantic-text-secondary
  lineHeight: 1.625,                  // type-semantic-prose-paragraph-lh
  width: "fill_container"
})

// 4. Sibling Pencil note at canvas root (NOT inside parent — Plan 28-01 quirk)
//    Documents: 4-slot signature; image-import-12.jpg + v1.3 ProjectCard.astro provenance;
//    narrow-scope rationale; heading-3 vs heading-4 title choice; borderless decision;
//    optional `radius-semantic-pill` candidate per OPEN-23-12 if category-badge cornerRadius 9999
```

### Example 2: Section/ResultsMetrics — 3 fixed metric-tile composition (D-135)

```javascript
// 1. Parent frame (sibling of TagFilter + RelatedPosts + RelatedProjects inside g9oRa5)
Insert(g9oRa5, {
  type: "frame",
  reusable: true,
  name: "Section / ResultsMetrics",
  layout: "vertical",
  gap: 32,                  // space-primitive-32 (matches RelatedPosts heading-to-cards gap)
  padding: [32, 0],          // space-primitive-32 vertical
  width: 1200,               // matches Phase 25-28 ship width
  alignItems: "start"
})

// 2. heading-slot (default 'Results' enabled:true per D-53)
Insert(<resultsMetrics-id>, {
  type: "frame",
  name: "heading-slot",
  slot: [],
  enabled: true,
  layout: "vertical",
  alignItems: "start",
  width: "fill_container"
})
// Child: heading text "Results" (heading-2 PJS 32/700/lh 1.4 navy — REUSE Phase 26 heading-2)

// 3. metrics-row (3 FIXED metric-tile children — NOT a slot per D-135 narrow-scoping)
Insert(<resultsMetrics-id>, {
  type: "frame",
  name: "metrics-row",
  layout: "horizontal",
  gap: 24,                   // space-semantic-stack-md (matches BlogCard grid gap)
  alignItems: "start",
  width: "fill_container"
})

// 4. 3 metric-tile children (FIXED, not refs)
for (i in 1..3) {
  Insert(<metrics-row-id>, {
    type: "frame",
    name: `metric-tile-${i}`,
    layout: "vertical",
    gap: 8,                  // space-semantic-inline-sm adjacent
    padding: 24,             // Pencil § 12 'Inside cards' (or 0 if no chrome per CONTEXT Claude's Discretion plain treatment)
    width: "fill_container",
    fill: "#ffffffff",        // color-semantic-bg-page (CONTEXT default: plain white + border + 10 radius)
    stroke: "#d4d4d8ff",     // color-semantic-border-default
    strokeWidth: 1,
    strokeAlignment: "inner",
    cornerRadius: 10,         // radius-semantic-card
    alignItems: "start"
    // ALTERNATIVE per Plan 28-01 coral-banner precedent: fill: "#ff928aff" decorative-coral instead of white
  })

  // metric-value (display number — DEFAULT reuse type-semantic-heading-1 48px PJS per D-135)
  Insert(<metric-tile-i-id>, {
    type: "text",
    name: "metric-value",
    content: i == 1 ? "85%" : i == 2 ? "20hrs" : "Zero",   // bakery-order-system v1.3 values per D-138 default
    fontFamily: "Plus Jakarta Sans",   // type-semantic-heading-1-family
    fontSize: 48,                       // type-semantic-heading-1-size (REUSE per D-135 default)
                                       //   OR ship NEW type-semantic-metric-large (60px proxy for v1.3 text-5xl) per plan-execution evaluation
    fontWeight: "700",
    fill: "#141f39ff",                  // color-semantic-text-primary
                                       //   OR color-semantic-text-accent (#15bee3ff) per Phase 28 prose-link precedent
    lineHeight: 1.4
  })

  // metric-label (caption-tier)
  Insert(<metric-tile-i-id>, {
    type: "text",
    name: "metric-label",
    content: i == 1 ? "Time reduction in order processing" : i == 2 ? "Saved per week" : "Missed orders since launch",
    fontFamily: "Inter",                // type-semantic-body-sm-family
    fontSize: 14,                       // type-semantic-body-sm-size (default per D-135; or caption-tier if shipped)
    fontWeight: "400",
    fill: "#52525bff",                  // color-semantic-text-secondary
    lineHeight: 1.5,
    width: "fill_container"
  })
}

// 5. Sibling Pencil note at canvas root documenting: 3-fixed-cell signature (NOT slot — narrow-scoping);
//    Joel-content essential per D-129 carve-out; metric-value token choice (heading-1 reuse vs new metric-large);
//    chrome treatment choice (plain vs coral)
```

**Token-evaluation user gate (per D-135 mid-plan gate precedent — D-72 + D-106):**

If plan-execution shows visual mismatch at first metric-tile render (48px reads too small vs v1.3 text-5xl ~48-60px), fire mid-plan AskUserQuestion with Options:
- **Option A:** Keep `type-semantic-heading-1` (48px) — interpolation default; closes without new token
- **Option B:** Ship NEW `type-semantic-metric-large` primitive at 60px (4 vars: family + size + weight + lh) per OPEN-23-10 partial-resolution path — raises OPEN-29-NN noting source-evidence (v1.3 text-5xl ≈ Tailwind 48px-60px)

### Example 3: Section/RelatedProjects — mirror of Section/RelatedPosts with ProjectCard refs (D-134)

```javascript
// 1. Parent frame (sibling of RelatedPosts etY5x inside g9oRa5) — MIRRORS etY5x structure exactly
Insert(g9oRa5, {
  type: "frame",
  reusable: true,
  name: "Section / RelatedProjects",
  layout: "vertical",
  gap: 32,                  // matches etY5x (space-primitive-32)
  padding: [32, 0],
  width: 1200,
  alignItems: "start"
})

// 2. heading-slot (mirror W1edi pattern)
Insert(<relatedProjects-id>, {
  type: "frame",
  name: "heading-slot",
  slot: [],
  enabled: true,             // default-ON per D-53 + W1edi precedent
  layout: "vertical",
  alignItems: "start"
})
// Child: heading text "Related projects" (NOT "Related posts") — heading-2 PJS 32/700/lh 1.4 navy

// 3. cards-row (mirror j9KOm pattern with ProjectCard refs instead of Card refs)
Insert(<relatedProjects-id>, {
  type: "frame",
  name: "cards-row",
  slot: ["<new-ProjectCard-id>"],   // TYPED per D-52 PREFERRED (NEW ProjectCard id from earlier task)
  layout: "horizontal",
  gap: 24,                            // matches j9KOm space-semantic-stack-md
  alignItems: "start",
  width: "fill_container"
})

// 4. 3 ProjectCard refs (default density per D-118 carry-forward)
for (i in 1..3) {
  Insert(<cards-row-id>, {
    type: "ref",
    ref: "<new-ProjectCard-id>",
    width: "fill_container"
    // descendants empty — consumers override at instance time
  })
}

// 5. Sibling Pencil note at canvas root documenting: narrow-scope (project domain ONLY, NOT generalized);
//    mirror of RelatedPosts structural shape with ProjectCard ref swap per D-134;
//    Plan 29-02 first consumer instance pattern
```

### Example 4: Plan 29-01 page-intro section composition decision

Per D-138 + CONTEXT specifics line 290: Plan 29-01 page-intro options are:

**Option A (default — Phase 26/27/28 plain page-intro precedent):**
```javascript
Insert(<Projects-frame>, {
  type: "frame",
  name: "page-intro",
  layout: "vertical",
  gap: 12,                   // space-primitive-12 candidate per BlogCard rhythm
  padding: [80, 0, 48, 0],   // matches Phase 28 Tag page-intro per Plan 28-03
  alignItems: "center",      // OR "start" per Phase 27 Contact alignment precedent
  width: 1200
})
// heading: "Projects" (v1.3 verbatim; heading-1 PJS 48/700/lh 1.4 navy)
// body: full v1.3 verbatim (centered, width 600 ~ max-w-2xl proxy)
```

**Option B (Plan 28-01 coral-banner precedent — if Y2isa raster probe shows hero-rhythm):**
```javascript
Insert(<Projects-frame>, {
  type: "frame",
  name: "page-intro-banner",
  layout: "vertical",
  fill: "#ff928aff",         // color-semantic-decorative-coral (Phase 28 Plan 28-01 banner first consumer)
  alignItems: "center"
})
// inner content frame (padding [80, 0, 48, 0]) + wave SVG bottom (60h white wave path)
```

**Recommendation:** Default to Option A (plain page-intro) per Phase 26-27 + Phase 28 Tag-page precedent. The Plan 28-01 coral banner was a REVISE-loop outcome flagged in OPEN-28-02 as APPROXIMATE with hero-alignment gap. Phase 32 fidelity sweep is the systematic refinement point for ALL page heroes. Plan-execution may pivot to Option B at calibration gate REVISE if user flags hero alignment.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Multi-variant Card matrix (project / blog / service Card variants) | Single Compound/Card (t40xct) + sibling Compounds (BlogCard ZSxZU, ProjectCard NEW Phase 29) | Phase 25 D-49 declared single Card; Phase 28 D-116 + Plan 28-01 REVISE established sibling-component pattern on raster divergence; Phase 29 D-131 applies upfront | 4 reusable compounds (t40xct + ZSxZU + NEW ProjectCard + future Phase 31 candidates), each narrow-scoped vs 1 polluted general-purpose component |
| Section/CategoryFilter as separate component for Projects | Section/TagFilter (O1IwyS) REUSE with descendants override (D-137) | Phase 28 D-115 broad-scoping; Phase 29 D-137 third consumer | Component library count stays at 8 sections after Phase 29; semantic stretch documented via optional sibling Pencil note |
| Page-frame placement without `nodeId` anchor | `find_empty_space_on_canvas({nodeId: <previous-frame>})` mandatory | Phase 26 Plan 26-02 contribution → § 10.4 | Page frames land on correct row (y ≈ −4111) instead of library row (y ≈ −11711) |
| PAGE-11 raster-removal before calibration | PAGE-11 ACTIVE post-APPROVE strict sequencing | Phase 27 Plan 27-02 first production use (cl8tt); Plan 28-01 + 28-02 carry-forward; Phase 29 4th + 5th uses | Y2isa + cYlRH structural archives persist at original canvas positions post-hide; user can re-enable for spot-check if needed |
| heading-2 size inferred per phase | OPEN-26-01 Plan 26-00 interpolation default (32px PJS 700/lh 1.4) validated through Phase 26-28 consumers | Phase 26 Plan 26-00 + OPEN-26-01 carry-forward; Phase 29 ResultsMetrics heading-slot reuses | Same heading-2 surface ships across FAQ + Blog + Tag + ResultsMetrics heading — provisional flag DROPPED at Plan 28-02 APPROVE |
| Compound/Card title-slot leaf text (Phase 25) | Plan 28-00 vGH3A extension (vertical + metadata-caption SoXch added) | Plan 28-00 Task 3 in-place mutation | Phase 27 sidebar Card consumer + Phase 28 RelatedPosts consumers unaffected (additive change); Phase 29 RelatedProjects ships its own NEW component (no further extension needed) |

**Deprecated/outdated:**
- v1.3 yellow-neobrutalist visual chrome (4px border + 6px hard shadow + uppercase Bricolage Grotesque) — NOT inherited per D-58 + D-132 Crito-visual register
- v1.3 ProjectCard date + 'Read More' arrow CTA — DROPPED from Compound/ProjectCard slot signature per D-132 (clickable-card pattern, no inline CTA needed)
- Section/NavBack reuse for Project detail back-nav — REJECTED per D-133 (preserves D-79 NavBack narrow-scoping for 404-only)

## Open Questions

Things that could not be fully resolved at research time (resolved at plan-execution).

### 1. Y2isa + cYlRH image-import-NN.jpg index identification

- **What we know:** image-import-12.jpg = Service grid + Project grid (Phase 25 D-49 confirmed); image-import-14.jpg = Blog cards (Plan 28-01 confirmed); image-import-18.jpg = Contact (Plan 27-02 confirmed); image-import.jpg (no suffix) = Blog Post (Plan 28-02 first identification per OPEN-28-03)
- **What's unclear:** Y2isa (05_Service) and cYlRH (06_Service Details) `fill.image` raster paths — UNKNOWN until Plan 29-01/02 Task 0 probes via `batch_get(['Y2isa', 'cYlRH'], readDepth: 2)`
- **Recommendation:** Plan 29-01 Task 0 probes Y2isa AND image-import-12.jpg per D-130 dual-pairing. Plan 29-02 Task 0 probes cYlRH (single pairing per § 3.4). Document identified filenames in 29-01/02-SUMMARY + PEN-INVENTORY Frames Inventory rows. Plan-execution likely candidates: image-import-12.jpg overall (covers Service grid + Project grid sections per Phase 25 D-49) OR image-import-11.jpg (preceding Crito 05_Service page) — confirmed via probe.

### 2. Compound/ProjectCard category-badge-slot — typed-suggestion choice

- **What we know:** Badge/Default solid (j0FxQZ) + Badge/Outline (kJQmJ) both available; v1.3 ProjectCard uses rounded-full yellow chip (visual-not-inherited); Phase 28 BlogCard tags-row uses `slot:['kJQmJ']` TYPED (PEN-INVENTORY line 701)
- **What's unclear:** Plan-execution evaluates against image-import-12.jpg Project card categories — does it depict a SOLID category chip (→ j0FxQZ) or OUTLINE pill (→ kJQmJ)?
- **Recommendation:** CONTEXT Claude's Discretion default lean is Badge/Default solid (stronger affordance reads as category indicator vs Outline used sparingly in v1.3). Plan 29-00 ships `slot:['j0FxQZ']` TYPED as default; plan-execution may swap at calibration gate v1 if image-import-12.jpg shows outline treatment.

### 3. ResultsMetrics metric-value token need

- **What we know:** D-135 default reuses `type-semantic-heading-1` (48px PJS 700/lh 1.4 navy); v1.3 uses `text-5xl` (Tailwind ≈ 48-60px); Phase 23 D-33 open-extension policy + Phase 26 D-72 / Phase 28 D-106 .fig fallback precedent for mid-plan user gate
- **What's unclear:** Visual rendering at Plan 29-00 Task 2 (or first instance in Plan 29-02) shows 48px adequate vs need for distinct 60px treatment
- **Recommendation:** Default: reuse heading-1 (48px). Mid-plan gate ONLY fires if visual evaluation shows distinct token need. If shipped: NEW `type-semantic-metric-large-{family,size,weight,lh}` 4-var composite at 60px (matching v1.3 text-5xl upper bound). OPEN-29-NN row added per D-141 Token Extensions section. OPEN-23-10 partial-resolution annotation (heading-5/-6 still open).

### 4. ResultsMetrics chrome treatment — plain vs coral

- **What we know:** CONTEXT D-135 default: plain white + 1px `color-semantic-border-default` + `radius-semantic-card` 10px. Alternative: `color-semantic-decorative-coral` fill (Plan 28-01 banner precedent)
- **What's unclear:** Crito Service Details (cYlRH) raster may not depict ANY metric-treatment (Joel-content essential per D-129 carve-out — ships regardless of cYlRH evidence)
- **Recommendation:** Ship plain default (Option A). Plan-execution at Plan 29-02 calibration gate may pivot to coral if visual rendering needs distinction. Coral pivot would also resolve OPEN-28-02 (page-hero coral alignment) via second consumer evidence.

### 5. ProjectCard parent dimensions — 380w default vs raster-derived

- **What we know:** Plan 28-01 BlogCard ships at 380w (3-col × 2-row 1200 - 2*24 / 3 = 384 rounded). v1.3 uses CSS grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- **What's unclear:** Whether image-import-12.jpg Project lower 2x2 grid shows different proportions than Service upper 4x2 grid (Project cards ~280×180 visible per Phase 25 D-49 raster-probe observation)
- **Recommendation:** Default 380w (matches BlogCard for visual consistency across blog-grid + projects-grid). Plan-execution may resize at calibration gate if 4-3 cards reads better at different proportion.

### 6. 04_About long-tail disposition (Phase 32 carry-forward)

- **What we know:** Phase 29 partial-resolution leaves only 04_About as token-mining-only carry-forward in OPEN-23-05
- **What's unclear:** Whether 04_About warrants ANY reconstruction in v2.0 or stays as flat-raster token-mining-only forever
- **Recommendation per CONTEXT Claude's Discretion line 124:** 04_About stays as flat raster, joel_page_map remains `none`, scope stays IN-SCOPE token-mining-only. Joel's Homepage has an About section per ROADMAP Phase 31 — 04_About is NOT a standalone About page. Phase 32 sweep + handoff doc records the final disposition with NO action required in Phase 29.

## Validation Architecture

Phase 29 outputs are `.pen` file mutations + PEN-INVENTORY markdown extensions. Validation per Nyquist gate uses these checkpoints.

### Per-Plan VALIDATION Checkpoints

| Plan | Checkpoint | Verification Mechanism | Expected Result |
|------|------------|------------------------|-----------------|
| 29-00 | Pre-flight active editor | `mcp__pencil__get_editor_state({include_schema:false})` | active editor == `design/Crito.pen` |
| 29-00 | Token surface drift baseline | `mcp__pencil__get_variables({})` | 107 logical (or 127 physical with composites-as-N-sub-vars per Phase 28 carry-forward) at plan-open |
| 29-00 | Token surface drift close (no new tokens) | `mcp__pencil__get_variables({})` | Unchanged from open IF D-135 default holds (no metric-value token) |
| 29-00 | Token surface drift close (+1 new token if D-135 ships metric-large) | `mcp__pencil__get_variables({})` | +4 (composite-as-N-sub-vars per Phase 28 family/size/weight/lh pattern) |
| 29-00 | NEW Compound/ProjectCard structurally intact | `mcp__pencil__batch_get(['<new-id>'], readDepth: 3)` | reusable:true, 4 slots (image / category-badge / title / body) all `enabled:true` per D-53 |
| 29-00 | NEW Section/ResultsMetrics structurally intact | `mcp__pencil__batch_get(['<new-id>'], readDepth: 3)` | reusable:true, heading-slot + metrics-row with 3 metric-tile children |
| 29-00 | NEW Section/RelatedProjects structurally intact | `mcp__pencil__batch_get(['<new-id>'], readDepth: 3)` | reusable:true, heading-slot + cards-row with 3 ProjectCard refs |
| 29-00 | Baseline IDs intact (no regression) | `mcp__pencil__batch_get(['avgor','t67DU6','g9oRa5','t40xct','ZSxZU','O1IwyS','etY5x','M7eUr','hIWuC','j0FxQZ','kJQmJ','EQaMf','u7NmaS','G0wNOc','Xs0Hs','vGH3A','SoXch','FGdti','oTSwn','eNqxd'])` | All return existing structure; ZERO mutations to Phase 23-28 ship-set |
| 29-00 | Library count check | `mcp__pencil__get_editor_state` reusable count | 25 → 27 or 28 (3 new Section/Compound + possibly Badge variant) |
| 29-00 | Layout sweep clean | `mcp__pencil__snapshot_layout({maxDepth:0, problemsOnly:true})` | `"No layout problems."` at document root |
| 29-00 | PEN-INVENTORY extension | grep on `PEN-INVENTORY.md` for new rows | New Variant Evidence rows for ProjectCard (~7) + ResultsMetrics (~7) + RelatedProjects (~6); possible Token Extensions row for metric-large; possible Badge variant row |
| 29-01 | Pre-flight active editor | per § 4.4 step 1 | active editor == `design/Crito.pen` |
| 29-01 | Y2isa image-import-NN.jpg identified | `batch_get(['Y2isa'], readDepth:2)` returns `fill.image` | filename string non-empty |
| 29-01 | image-import-12.jpg accessible | `Read` tool check `design/images/image-import-12.jpg` exists | File present (confirmed at research time) |
| 29-01 | Projects frame placed in page-row | `find_empty_space_on_canvas({nodeId: "FUctJ", direction: "right", padding: 80, width: 1440, height: <estimate>})` | y ≈ −4111 (NOT library row y ≈ −11711) |
| 29-01 | Projects frame composition | `batch_get(['<projects-frame-id>'], readDepth: 3)` | Header ref + page-intro + TagFilter ref + 6-ProjectCard grid + Footer ref (5 children) |
| 29-01 | TagFilter descendants override applied | `batch_get(['<TagFilter-instance-id>'], readDepth: 4)` | Position 5 (CCXCE + hMIRk) `enabled:false`; positions 1-4 label content swapped to "All Projects" / "Web Apps" / "Automation" / "AI Development" |
| 29-01 | ProjectCard instances composed | 6 ProjectCard refs (2 real projects + 4 representative) with descendants overrides | Per-card title / category-badge / body content set |
| 29-01 | Calibration gate AskUserQuestion fires per § 3.4 with dual pairing per D-130 | get_screenshot inline + image-import-12.jpg path | User decision: APPROVE / REVISE / GAP |
| 29-01 | PAGE-11 ACTIVE on Y2isa (post-APPROVE ONLY) | `Update("Y2isa", {enabled:false})` | Y2isa `enabled:false`; structural archive preserved at original (x,y) |
| 29-01 | Plan-close layout sweep | `mcp__pencil__snapshot_layout({maxDepth:0, problemsOnly:true})` at document root | `"No layout problems."` (per-frame text-clipping false positives OK) |
| 29-01 | PEN-INVENTORY mutations | Frames Inventory: Y2isa row mutated in-place (token-mining-only dropped; joel_page_map → 'Projects'; status_counts flat:1 → hidden:1; OPEN-23-05 partial-resolution annotation); new Projects row added | Mutations syntactically valid; cross-references intact |
| 29-02 | Pre-flight active editor | per § 4.4 step 1 | active editor == `design/Crito.pen` |
| 29-02 | cYlRH image-import-NN.jpg identified | `batch_get(['cYlRH'], readDepth:2)` returns `fill.image` | filename string non-empty (UNKNOWN at research time) |
| 29-02 | Project frame placed in page-row | `find_empty_space_on_canvas({nodeId: "<29-01-projects-frame-id>", direction: "right", padding: 80, width: 1440, height: <estimate>})` | y ≈ −4111 |
| 29-02 | Project frame composition | `batch_get(['<project-frame-id>'], readDepth: 3)` | Header + back-nav + title-header + body-prose + ResultsMetrics + RelatedProjects + Footer (7 children) |
| 29-02 | Back-nav inline composition | per D-133 pattern | 2-sibling: Icon/16 ref (arrow-left glyph swap) + text "Back to Projects" |
| 29-02 | body-prose section uses prose tokens | `batch_get` recursive on body-prose | type-semantic-heading-2 for 'The Challenge'/'The Solution' headings; type-semantic-prose-paragraph-* for body |
| 29-02 | ResultsMetrics 3-tile populated | `batch_get` on ResultsMetrics instance | 3 metric-tile descendants with project.results verbatim |
| 29-02 | RelatedProjects 2-3 ProjectCard refs | `batch_get` on RelatedProjects instance | 2 ProjectCard refs (v1.3 sample has 2 projects) or 3 representative |
| 29-02 | OPEN-29-NN deferrals recorded | PEN-INVENTORY § Open Flags — Phase 29 | Screenshots / Testimonial / Built With each get OPEN-29-NN row per D-136 |
| 29-02 | Calibration gate AskUserQuestion per § 3.4 single pairing | get_screenshot inline + cYlRH raster path | User decision: APPROVE / REVISE / GAP |
| 29-02 | PAGE-11 ACTIVE on cYlRH (post-APPROVE ONLY) | `Update("cYlRH", {enabled:false})` | cYlRH `enabled:false`; structural archive preserved |
| 29-02 | Plan-close layout sweep | `mcp__pencil__snapshot_layout({maxDepth:0, problemsOnly:true})` at document root | `"No layout problems."` |
| 29-02 | PEN-INVENTORY mutations | Frames Inventory: cYlRH row mutated in-place; new Project row added; OPEN-23-05 partial-resolution further annotation (only 04_About remains long-tail) | Mutations syntactically valid; cross-references intact |

### Phase-Close Validation

| Check | Verification |
|-------|--------------|
| Phase 29 ships 2 new top-level page frames (Projects + Project) | `get_editor_state` top-level page-frame count: 7 → 9 |
| Phase 29 ships 3 new library components | Library count 25 → 28 (+1 ProjectCard, +1 ResultsMetrics, +1 RelatedProjects) |
| Optional 4th library entry (Badge variant) | Library count 28 → 29 IF D-132 plan-execution evaluation surfaces variant need |
| Optional 1 new token surface | Token count +0 or +4 (composite) IF D-135 metric-large ships |
| PAGE-11 ACTIVE count v2.0 | 3 → 5 (Phase 29 adds Y2isa + cYlRH) |
| OPEN-23-05 final state | Only `04_About` remains in long-tail carry-forward |
| OPEN-25-07 final state | RESOLVED — Phase 29 ships sibling Compound/ProjectCard per Plan 28-01 BlogCard precedent; t40xct continues serving Phase 27 Contact + (Phase 28 RelatedPosts internal use) + future Phase 31 |
| Token-naming convention preserved | All new tokens follow `type-semantic-metric-large-{family,size,weight,lh}` flat-dash convention per Phase 23 D-12 |
| No mutations to Phase 23-28 ship-set | Baseline ID batch_get returns existing structure for all 20+ critical IDs |

### Validation Architecture Notes for Planner

- **VALIDATION.md per Nyquist gate** should encode per-plan checkpoints as test assertions
- **Sweep convention:** Phase 24-28 plan-close discipline uses `snapshot_layout({maxDepth:0, problemsOnly:true})` at document root — Phase 29 carries forward
- **PEN-INVENTORY extension is the single source of truth** — D-141 carries Phase 23 D-18 / Phase 24 D-23 / Phase 25 D-56 / Phase 26 D-88 / Phase 27 D-104 / Phase 28 D-126 forward
- **Per-section fidelity labels per D-83** carry-forward — Phase 29 has mixed-fidelity per plan:
  - Plan 29-01: page-intro EXACT (v1.3 verbatim); TagFilter APPROXIMATE (representative pills); 6-ProjectCard grid APPROXIMATE (representative content); Header EXACT; Footer EXACT
  - Plan 29-02: back-nav EXACT; title-header EXACT (project.title + categoryLabel + problem verbatim); body-prose EXACT-VERBATIM (Challenge + Solution from projects.json); ResultsMetrics EXACT (project.results verbatim); RelatedProjects APPROXIMATE (representative card content); Header EXACT; Footer EXACT
- **Cross-row stale-cache get_screenshot quirk** likely triggers on BOTH new frames per Phase 27/28 production precedent (Tier-2 user-side editor fallback is the production-proven path)
- **Subagent caveat:** Pencil MCP tools NOT inherited by spawned subagents — all Phase 29 plans execute INLINE by main orchestrator. Carry-forward from Phase 26 + Phase 27 + Phase 28.

## Sources

### Primary (HIGH confidence — file-internal authoritative)

- `.planning/phases/29-projects-reconstruction-index-project-detail/29-CONTEXT.md` — D-127..D-141 locked decisions, canonical refs, code context, specifics, deferred ideas
- `.planning/research/PEN-INVENTORY.md` — Frames Inventory (Y2isa lines 71, cYlRH line 70 baseline classification); Variant Evidence Phase 28 (lines 670-686 TagFilter + RelatedPosts + Badge/Outline slot IDs); Plan 28-01 additions (lines 695-702 BlogCard slot signature + line 708 v1.3 ProjectCard structural reference); Plan 28-03 additions (line 768 TagFilter descendants-override example); Compound Source Inference Phase 25 (lines 346-352 — Card raster-probe pattern); OPEN-25-07 line 303 (Card consumer-resolution + image-import-12.jpg cross-reference); OPEN-23-05 line 260 (raster-removal status chain); Icon variant IDs lines 389-392 (EQaMf/yRvGb/u7NmaS/dpO5Y); arrow-left lucide-native verified line 803
- `.planning/research/CALIBRATION-PROTOCOL.md` — § 2 branch decision tree; § 3.4 crito-source-flat-raster per-step script; § 10.4 FindEmptySpace nodeId anchor pattern; § 6.4 OPEN-26-02 stale-cache Tier-1/Tier-2 workarounds; § 9 per-page phase consumer map
- `.planning/phases/28-blog-reconstruction-index-post-tag-page/28-00-SUMMARY.md` — Plan 28-00 foundation pattern (TagFilter O1IwyS + RelatedPosts etY5x ship pattern; Compound/Card vGH3A title-slot extension precedent; Badge/Outline kJQmJ variant precedent)
- `.planning/phases/28-blog-reconstruction-index-post-tag-page/28-01-SUMMARY.md` — Plan 28-01 BlogCard ZSxZU sibling-component birth + REVISE-loop lesson + image-import-14.jpg raster path confirmation + Pencil layout-engine quirks (Move + fit_content + notes); EDAf1 = Blog index frame
- `.planning/phases/28-blog-reconstruction-index-post-tag-page/28-02-SUMMARY.md` — Plan 28-02 PRIMARY prose-token validation + w1m3x = image-import.jpg first identification (no -NN suffix); 2-column layout pattern; D-110 prose-paragraph 'provisional' flag DROPPED at APPROVE; aQ8FL = Blog Post frame
- `.planning/phases/28-blog-reconstruction-index-post-tag-page/28-03-SUMMARY.md` — Plan 28-03 D-117 paired-ref active-state flip validation + FUctJ = Tag frame (Plan 29-01 FindEmptySpace nodeId anchor)
- `.planning/phases/27-thank-you-contact-reconstruction/27-02-SUMMARY.md` — Plan 27-02 cl8tt = image-import-18.jpg first identification + PAGE-11 ACTIVE first production use + Section/Card descendant ID nested-ref slash path (k20bt/ATJK9) for Button label override
- `.planning/phases/25-section-compound-components/25-03-SUMMARY.md` — t40xct Compound/Card 4-slot signature + OPEN-25-07 source-coverage seed
- `.planning/phases/24-layout-primitives-primitive-components/24-05-SUMMARY.md` — Primitive IDs (M7eUr Default Button + hIWuC Secondary Button + j0FxQZ Badge + nwJk7 Input + EQaMf/yRvGb/u7NmaS/dpO5Y Icon 16/20/24/32) + Phase 24 Pattern A lucide-native glyph swap mechanism
- `src/components/ProjectCard.astro` — v1.3 ProjectCard slot signature derivation (image 16:9 + category badge rounded-full + title text-xl + body line-clamp-3 truncate 160 chars)
- `src/pages/projects/index.astro` — v1.3 verbatim heading + body for D-138 Plan 29-01 page-intro content extraction; 4 filter categories per D-137 instance content (All Projects + Web Apps + Automation + AI Development)
- `src/pages/projects/[slug].astro` — v1.3 verbatim back-nav text + section headings + Results metric layout structure
- `src/data/projects.json` — bakery-order-system + inventory-sync-automation real projects; project.results array structure for Section/ResultsMetrics metric-tile content; categoryLabel field for D-137 + D-132 ProjectCard category-badge content

### Secondary (MEDIUM confidence — Pencil MCP catalogue + best practices)

- `.planning/research/STACK.md` — Pencil MCP tool catalogue (HIGH confidence on workflow; MEDIUM on exact argument shapes — verified via Phase 24-28 production)
- `.planning/research/SUMMARY.md` — Themes T1 (variables-first), T5 (don't repeat v1.4), T6 (single-file strategy), T8 (component variants on-demand only)
- `.planning/research/PITFALLS.md` — Pitfall 1 (no inventing primitives without source — D-131 D-132 upfront-commit Pitfall-1 tension acknowledged); Pitfall 4 (PAGE-11 NEVER hide raster before APPROVE); Pitfall 7 (no premature variants — D-132 drops date + 'Read More' CTA slots); F3 (no eyedropping from raster JPGs)
- Pencil official docs (verified via Phase 23 audit cited in PEN-INVENTORY lines 18-53 Pencil Guidelines verbatim) — schema 2.13, `library: "lucide"` Pattern A, slot `[ids]` suggestion-only

### Tertiary (LOW confidence — flagged for validation)

- Plan 29-01 + 29-02 image-import-NN.jpg index identifications — UNKNOWN until plan-execution probes
- D-132 Compound/ProjectCard parent dimensions (380w default) — may resize at calibration if image-import-12.jpg shows different proportion
- D-132 title-slot heading-3 vs heading-4 (default heading-3 24px per Plan 28-01 BlogCard first-consumer precedent; v1.3 text-xl ≈ 20px = heading-4) — plan-execution evaluates
- D-135 metric-value token need (default heading-1 reuse; mid-plan gate fires only if visual mismatch)
- D-135 chrome treatment (default plain white + border + 10 radius; coral pivot per Plan 28-01 banner precedent if visual rendering warrants)

## Metadata

**Confidence breakdown:**
- Standard stack (Pencil MCP tool catalogue): HIGH — production-proven through Phase 24-28
- Architecture patterns (D-131/D-134/D-137 mirror precedents): HIGH — Phase 25 + Phase 28 lift directly
- Slot signatures + structural IDs (O1IwyS / etY5x / ZSxZU / t40xct / EQaMf / M7eUr / hIWuC / j0FxQZ / kJQmJ): HIGH — verified by reading PEN-INVENTORY rows
- Pitfalls + workarounds: HIGH — Phase 26-28 production-observed
- v1.3 src content extraction targets: HIGH — files read at research time
- image-import-NN.jpg identification for Y2isa + cYlRH: LOW — plan-execution probes
- D-132 Badge variant choice (Default solid vs Outline) for ProjectCard category-badge: MEDIUM — image-import-12.jpg evaluation deferred to plan-execution
- D-135 metric-value token need + chrome treatment: MEDIUM — plan-execution evaluation per D-72/D-106 precedent
- Compound/ProjectCard parent dimensions (380w default): MEDIUM — image-import-12.jpg evaluation deferred

**Research date:** 2026-06-09
**Valid until:** 2026-07-09 (30 days for stable Pencil MCP toolchain; Phase 29 plan-execution likely complete within 1-2 days)
**Subagent caveat (CRITICAL for plan-execution):** Phase 29 plans must execute INLINE by the main orchestrator — Pencil MCP tools are NOT inherited by spawned `gsd-executor` subagents (subagent tool namespace: `Read, Write, Edit, Bash, Grep, Glob`, no `mcp__pencil__*`). Carry-forward observation from Phase 26-28 production.

## RESEARCH COMPLETE

# Phase 29: Projects Reconstruction (Index + Project Detail) - Context

**Gathered:** 2026-06-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Two new top-level page frames — `Projects` (index) and `Project` (detail) — are added to `design/Crito.pen` as editable compositions of Phase 23–28 tokens / primitives / compounds / sections, **plus** a foundation layer of 3 new library entries: `Compound / ProjectCard` (narrow-scoped sibling of t40xct + ZSxZU per Phase 28 Plan 28-01 sibling-component precedent), `Section / ResultsMetrics` (NEW narrow-scoped — Joel's case-study payoff), and `Section / RelatedProjects` (NEW narrow-scoped sibling of Phase 28's Section/RelatedPosts per D-116 narrow-scoping precedent).

Branch assignments per CALIBRATION-PROTOCOL.md § 2 branch decision tree:
- **Projects index = `crito-source-present`, flat-raster sub-case** — `Y2isa` (05_Service) currently classified IN-SCOPE token-mining-only with `joel_page_map: none`; Phase 29 RECLASSIFIES in-place to `joel_page_map: 'Projects'`, scope `IN-SCOPE` (drop token-mining-only qualifier). PAGE-11 ACTIVE — hide `Y2isa` via `enabled: false` after Plan 29-01 APPROVE per § 3.3.
- **Project detail = `crito-source-present`, flat-raster sub-case** — `cYlRH` (06_Service Details) currently classified IN-SCOPE token-mining-only with `joel_page_map: none`; Phase 29 RECLASSIFIES in-place to `joel_page_map: 'Project detail'`, scope `IN-SCOPE` (drop token-mining-only qualifier). PAGE-11 ACTIVE — hide `cYlRH` via `enabled: false` after Plan 29-02 APPROVE per § 3.3.

Phase 29 partially resolves OPEN-23-05 (Y2isa + cYlRH reconstructed; only `04_About` remains as long-tail token-mining-only carry-forward), resolves OPEN-25-07 (Card consumer-resolution: Phase 29 ships sibling Compound/ProjectCard, NOT general-purpose t40xct reuse), and validates Phase 28 D-115 Section/TagFilter broad-scoping with a third consumer (Blog + Tag + Projects).

**Out of scope (already decided):**
- Per-page reconstruction for any other page (Phases 30–31)
- Mobile breakpoint reconstruction (PAGE-09 — desktop only for v2.0)
- Dark mode (TOKEN-07 + Phase 23 D-01)
- A new CALIBRATION-PROTOCOL revision — Phase 26 D-66 protocol applies as-is
- Joel's v1.3 4-link Header override (Phase 25 D-38 + Phase 26 D-77 + Phase 27 + Phase 28 carry-forward: defers to Phase 31 Homepage instance time)
- Joel-brand logo / wordmark in Section/Header logo slot (Phase 25 D-40 deferred)
- Joel-brand visual chrome (yellow neobrutalist Card border + 6px hard shadow + Bricolage Grotesque) — Crito visual register applies per D-58 carry-forward
- `Section / NavBack` reuse for Project detail back-nav — D-79 narrow-scoping preserved (NavBack is 404-only); Project detail uses inline text-link per D-133 (Phase 27 D-99 secondary-link precedent)
- Joel's v1.3 [slug].astro Screenshots gallery, Testimonial, Built With sections — OPEN-29-NN deferral per D-136 (Crito-shape Joel-content authority — cYlRH unlikely to depict these)
- Joel's v1.3 draft-project filtering ("Coming soon!" empty state) — out of scope for .pen reconstruction; .pen ships representative populated state per D-132 instance pattern
- Section/CategoryFilter as separate component — D-137 reuses Section/TagFilter (O1IwyS) directly with descendants overrides
- Embedded Calendly iframe — not relevant to Phase 29 surface
- Joel's v1.3 src code (v2.0 milestone scope — `.pen` file only)

</domain>

<decisions>
## Implementation Decisions

### Source-of-Truth Branch

- **D-127:** **Crito-source-flat-raster branch on BOTH page frames.** Y2isa (05_Service raster) is visual proxy for Projects index; cYlRH (06_Service Details raster) is visual proxy for Project detail. Same crito-source-flat-raster branch as Phase 27 cl8tt + Phase 28 DzqTm/w1m3x. PAGE-11 ACTIVE on both rasters after APPROVE per CALIBRATION-PROTOCOL § 3.3 — `Update("Y2isa", { enabled: false })` post-Plan-29-01 APPROVE (FOURTH production use of PAGE-11 ACTIVE in v2.0); `Update("cYlRH", { enabled: false })` post-Plan-29-02 APPROVE (FIFTH). Both `NEVER before APPROVE` per Pitfall 4.

- **D-128:** **Reclassify Y2isa + cYlRH PEN-INVENTORY rows in-place.** Both currently classified `IN-SCOPE token-mining-only` with `joel_page_map: 'none'` per PEN-INVENTORY lines 70-71 (Phase 23 D-07 carry-forward). Phase 29 mutates:
  - Y2isa: `joel_page_map: 'none'` → `'Projects (per Plan 29-01)'`; drop `token-mining-only` qualifier; `status_counts: flat:1` → `hidden:1, partial:0, factored:0` post-APPROVE; reconstruction priority `n/a` → `high (Phase 29 plan 29-01)` then `reconstructed-PHASE-29` post-APPROVE
  - cYlRH: same pattern with `joel_page_map: 'Project detail (per Plan 29-02)'`
  
  Parallel to Phase 27 cl8tt + Phase 28 DzqTm/w1m3x reclassification chain. Single source of truth — OPEN-23-05 closes for both frames; only `04_About` remains in the long-tail OPEN-23-05 carry-forward (token-mining-only per Phase 23 D-07, not reconstructed in v2.0).

- **D-129:** **Crito-shape, Joel-content authority for Project detail.** cYlRH raster is the STRUCTURAL authority for what sections ship in the Project detail frame. Joel's v1.3 [slug].astro section structure (back-nav + title-header + Challenge + Solution + Screenshots gallery + Results metric box + Testimonial + Built With) is richer than Crito Service Details likely depicts. Phase 29 ships only the sections cYlRH structurally supports PLUS Joel-content-essentials: back-nav (D-133), title-header (title + category-badge + problem hero), body-prose (Challenge + Solution as continuous prose using Phase 28 prose tokens), Section/ResultsMetrics (Joel's case-study payoff per D-135, ships even without cYlRH evidence — Joel-content essential), Section/RelatedProjects (D-134, ships per ROADMAP success criterion 3). OPEN-29-NN deferral per D-136 for: Screenshots gallery, Testimonial, Built With. Hybrid authority — cYlRH constrains the SHAPE of body-prose layout; Joel-content drives Results + Related Projects ships regardless of cYlRH evidence. Reverses Phase 27 D-97's "Joel-shape, Crito-visual" hybrid — Phase 29 leans more strictly on Crito structural fidelity than Phase 27 did, with explicit Joel-content carve-outs documented per section.

- **D-130:** **Dual pairing at Plan 29-01 calibration gate.** Projects index calibration carries TWO pairing targets raised at the SINGLE calibration AskUserQuestion per CALIBRATION-PROTOCOL § 3.4: (a) Y2isa raster overall page-layout pairing (header + page-intro + filter strip + grid + footer rhythm) per § 3.1 VALID-02; (b) `image-import-12.jpg` project-card visual pairing per OPEN-25-07 line 303 carry-forward (drives ProjectCard slot fidelity check against the lower 2x2 Project grid in image-import-12.jpg). Reduces REVISE-loop probability per Plan 28-01 lesson (where image-import-14.jpg pairing surfaced only at v1 REVISE → birthed BlogCard). Plan 29-02 Project-detail calibration follows § 3.4 single-pairing pattern (cYlRH only).

### ProjectCard Strategy

- **D-131:** **Compound/ProjectCard upfront as NEW narrow-scoped sibling in t67DU6.** Phase 28 Plan 28-01 set the precedent: when raster shape diverges from t40xct general-purpose Card, ship a narrow-scoped sibling (Compound/BlogCard ZSxZU). Phase 29 commits upfront (no Plan-29-NN raster-probe REVISE-loop risk) per Pitfall 1 tension noted — image-import-12.jpg + v1.3 src/components/ProjectCard.astro provide enough evidence to skip the probe. Lives in `_Components / Compounds` (t67DU6) alongside t40xct + ZSxZU; library count moves 3 → 4 reusable children. Narrow-scoped per D-116 precedent — NOT generalized for any other consumer; Phase 31 Homepage builds its own card if a homepage-project-grid surfaces.

- **D-132:** **Compound/ProjectCard v1.3-shape slot signature, Crito-visual register.** Slot signature mirrors v1.3 `src/components/ProjectCard.astro` (lines 19-52): image-slot (16:9 placeholder + sibling Pencil wiring note pointing to `project.thumbnail`) + category-badge-slot (Badge ref — plan-execution evaluates Phase 24 Badge/Default vs Phase 28 Badge/Outline vs new variant against image-import-12.jpg) + title-slot (project title — Phase 28 D-106 `type-semantic-heading-4` candidate per v1.3 `text-xl` 20px; plan-execution may use heading-3 if visual rendering needs more weight) + body-slot (problem excerpt, `type-semantic-prose-paragraph` truncate-to-160-chars convention per v1.3 lines 14-16). Crito-visual register per D-58 — NO v1.3 yellow neobrutalist Card chrome (4px border + 6px yellow hard shadow + uppercase Bricolage Grotesque heading); plan-execution lifts visual treatment from image-import-12.jpg Project card lower 2x2 grid. Drops image-import-12.jpg's date + 'Read More' arrow CTA from the slot signature — v1.3 ProjectCard is a clickable card without inline CTA, and a `footer-actions-slot` would have no instance-time consumer (Pitfall 7 prevention).

### Detail Page Composition

- **D-133:** **Back-nav as inline single text-link with iconLeading — NOT Section/NavBack reuse.** v1.3 [slug].astro line 23-33 ships a SINGLE 'Back to Projects' link with arrow icon, not a multi-link nav. Phase 26 Section/NavBack (N1jo3i) is narrow-scoped to 404 (D-79: heading + 3-4 links to key pages) — reusing it with descendants override hiding 3 of 4 links + the heading-slot would violate D-79 narrow-scoping intent and produce an awkward instance. Phase 29 ships back-nav as inline composition at top of Project frame: text node 'Back to Projects' + Primitive/Icon/16 instance (lucide `arrow-left` or `chevron-left` glyph swap per Phase 24 D-44 Pattern A — plan-execution probes both; default `arrow-left`); both as siblings of a horizontal-layout frame, vertically aligned. Styled with `type-semantic-body` + `color-semantic-text-accent` (or `text-secondary` — plan-execution decides) per Phase 27 D-99 secondary-link convention. Renders as 2 sibling refs/text nodes, no Section component. cYlRH raster probe at Plan 29-02 Task 0 may show no back-nav at all (Crito agency template may use persistent Header instead) — then ship per Joel-content authority per D-129 hybrid.

- **D-134:** **Section/RelatedProjects ships in Plan 29-00 — NEW narrow-scoped sibling of Phase 28 Section/RelatedPosts.** Mirrors Phase 28 D-116 narrow-scoping precedent: blog-only RelatedPosts; projects-only RelatedProjects (not generalized into Section/RelatedContent — different content domain, different vocabulary, downstream agents discover by domain vocab). Lives in `_Components / Sections` (g9oRa5); library count moves 6 → 7 reusable children. Slot signature: `heading-slot` (default text 'Related projects', `enabled: true` per Phase 25 D-53 placeholder pattern) + `cards-row` (horizontal row of 3 Compound/ProjectCard ref instances per Phase 28 D-118 3-card density). Resolves ROADMAP success criterion 3 literally ('related projects strip factored as section component'). Single consumer in Phase 29 (Project detail frame). PEN-INVENTORY Variant Evidence rows added per D-141.

- **D-135:** **Section/ResultsMetrics ships in Plan 29-00 — NEW narrow-scoped component (Joel-content essential).** v1.3 [slug].astro lines 98-116 ships a distinctive 3-up Results metric grid that is Joel's case-study PAYOFF (e.g., '85% time reduction', '20hrs saved/week', 'Zero missed orders'). Even though cYlRH raster unlikely depicts this surface, it ships per Joel-content authority for the case-study story per D-129 hybrid carve-out. Slot signature: `heading-slot` (default text 'Results', `enabled: true` per Phase 25 D-53) + `metrics-row` (horizontal frame with 3 FIXED `metric-tile` children). Each metric-tile: `metric-value` (display number — plan-execution evaluates token need: reuse `type-semantic-heading-1` 48px display OR ship NEW `type-semantic-metric-large` primitive if v1.3 `text-5xl` ≈ 48-60px needs distinct treatment; raise OPEN-29-NN if new token surfaces) + `metric-label` (caption-tier or `type-semantic-body-sm` + `color-semantic-text-secondary` for the small gray label like '85% time reduction'). Crito-vocab register — NO v1.3 yellow-neobrutalist chrome (`bg-yellow-100` box + `border-[4px]` + `6px_6px_0` hard shadow + uppercase Bricolage Grotesque heading); plan-execution picks a Crito-appropriate surface treatment (default: plain white with subtle `color-semantic-border-default` 1px border + `radius-semantic-card` 10px corner radius; or Plan 28-01 banner precedent's `color-semantic-decorative-coral` fill if Crito-vocab Results context warrants distinction). Lives in `_Components / Sections` (g9oRa5); library count moves 7 → 8 reusable children. Single consumer in Phase 29 (Project detail frame).

- **D-136:** **OPEN-29-NN deferrals for Project detail.** Joel's v1.3 [slug].astro sections that DO NOT ship in Phase 29 Project detail frame, deferred to a future Joel-content phase or code milestone:
  - **Screenshots gallery** (v1.3 lines 73-95) — 2-col responsive grid of project screenshots with hover effect; defers because no v1.3 ground-truth assets exist for the .pen reconstruction (each project has placeholder image references like `/images/portfolio/bakery-dashboard.jpg` that aren't depicted in either v1.3 site or Crito source)
  - **Testimonial conditional blockquote** (v1.3 lines 118-128) — left-border italic blockquote with author + role; only renders when `project.testimonial` is present; defers as a Joel-content section without Crito raster authority + conditional rendering belongs to code milestone
  - **Built With technology badges** (v1.3 lines 131-145) — horizontal row of turquoise Badge instances per `project.technologies`; defers as a Joel-content section without Crito raster authority (and the v1.3 turquoise neobrutalist treatment doesn't translate cleanly into Crito-vocab without ResultsMetrics-style explicit token wiring)
  
  Each adds an `OPEN-29-NN` row to PEN-INVENTORY with proposed re-introduction surface (future Joel-content phase / code milestone) and any cYlRH probe outcomes that may pull them back in earlier.

### Filter Strip + Categories

- **D-137:** **Reuse Phase 28 Section/TagFilter (O1IwyS) on Projects index — descendants override at instance time.** No new Section/CategoryFilter component built. Validates Phase 28 D-115 broad-scoping rationale with a third consumer (Blog index + Tag page + Projects index = 3 consumers from a single Section component). Instance composition on Projects frame:
  - Pill labels override via descendants: 'All Posts' → 'All Projects'; tag names (e.g., 'automation', 'small-business', 'productivity') → category labels per `src/data/projects.json` `categoryLabel` field: 'Web Apps', 'Automation', 'AI Development'
  - Active-pill-position override: default position 1 'All Projects' active per v1.3 `src/pages/projects/index.astro` line 35 `data-active="true"` (matches Phase 28 Blog index default)
  - Pill count: 4 per v1.3 (1 All + 3 categories)
  
  Section/TagFilter component name retained — Pencil component-library count unchanged; honest documentation via instance-time sibling Pencil note (optional, plan-execution decides) noting 'TagFilter functioning as category-filter here; semantic generalization deferred unless 4th consumer surfaces requiring component-name refactor.' Belt-and-suspenders per Phase 25 D-52 / Phase 27 D-93 convention.

### Plan Structure

- **D-138:** **Phase 29 ships 3 plans, foundation-first.** Mirrors Phase 27 D-101 3-plan + Phase 28 D-122 foundation-first ordering (Phase 28 shipped 4 because Tag page joel-only branch added a 4th surface; Phase 29 has only 2 page frames). Plans:
  - **29-00 — Foundation:** ships `Compound / ProjectCard` (NEW per D-131/D-132) + `Section / ResultsMetrics` (NEW per D-135) + `Section / RelatedProjects` (NEW per D-134) + possible Badge variant evaluation per D-132 plan-execution (similar to Phase 28 Plan 28-00 Badge/Outline evaluation) + possible new `type-semantic-metric-large` token per D-135 plan-execution (similar to Phase 28 Plan 28-00 mid-plan token-value gate per D-72/D-106 precedent). NO user-calibration gate at close per D-86 + D-102 + D-124 (agent-deterministic foundation work; possible mid-plan user gate ONLY if token-value escalation surfaces or Badge variant decision needs evidence-gate).
  - **29-01 — Projects index page frame:** crito-source-flat-raster branch (Y2isa); Task 0 probes Y2isa image-import-NN.jpg index + `image-import-12.jpg` (Project lower 2x2 grid) cross-pairing target; top-level `Projects` frame at 1440 width via `find_empty_space_on_canvas` with `nodeId` anchor on Phase 28 Tag frame (latest Phase 28 frame from 28-03); instances Section/Header + page-intro section (v1.3 verbatim from `src/pages/projects/index.astro` lines 19-23: 'Projects' heading + 'Real projects, real results. See how I've helped small businesses automate workflows, build custom tools, and leverage AI to work smarter.' body) + Section/TagFilter ref with descendants override per D-137 (4 pills, 'All Projects' active) + 6-Compound/ProjectCard grid (3-col × 2-row per Phase 28 D-114 density convention; ProjectCard descendants override populate v1.3 2 real projects from `projects.json` + 4 representative agency-template projects per Plan 28-01 BlogCard precedent) + Section/Footer; plan-close single calibration AskUserQuestion gate per CALIBRATION-PROTOCOL § 3.4 with DUAL pairing per D-130; on APPROVE → `Update("Y2isa", { enabled: false })` per PAGE-11 ACTIVE (NEVER before APPROVE per Pitfall 4).
  - **29-02 — Project detail page frame:** crito-source-flat-raster branch (cYlRH); Task 0 probes cYlRH image-import-NN.jpg index; top-level `Project` frame at 1440 width via `find_empty_space_on_canvas` with `nodeId` anchor on Projects frame from 29-01; instances Section/Header + back-nav inline composition per D-133 + title-header section (project title heading-1 + Compound/ProjectCard-style category-badge instance + problem hero `type-semantic-prose-paragraph` enlarged or kept; plan-execution evaluates) + body-prose section (Challenge + Solution as continuous prose using `type-semantic-heading-2` for the two sub-headings + `type-semantic-prose-paragraph-*` for body — verbatim from one project in `src/data/projects.json` per content extraction discipline; plan-execution selects a project that exercises distinctive content, default `bakery-order-system` for Sarah's testimonial-bearing case) + Section/ResultsMetrics ref with 3 metric-tile descendants override per D-135 (project.results array verbatim) + Section/RelatedProjects ref with 2 ProjectCard descendants overrides (project.results array has only 2 projects in v1.3 sample; plan-execution may ship 3 representative agency-template instances per D-134) + Section/Footer; plan-close single calibration AskUserQuestion gate per CALIBRATION-PROTOCOL § 3.4 (cYlRH single-pairing); on APPROVE → `Update("cYlRH", { enabled: false })` per PAGE-11 ACTIVE (NEVER before APPROVE per Pitfall 4). OPEN-29-NN entries written for Screenshots/Testimonial/Built With deferrals per D-136.

  Sequential, no waves. Foundation-first because per-page plans depend on Compound/ProjectCard + Section/ResultsMetrics + Section/RelatedProjects. Index before detail because index validates ProjectCard at production scale before detail exercises it in the Section/RelatedProjects strip (Phase 28 index-before-detail precedent extended).

- **D-139:** **Per-plan calibration gates — single AskUserQuestion at plan close per CALIBRATION-PROTOCOL § 3.4.**
  - **Plan 29-00 closes WITHOUT a user gate** at default — pure foundation work (3 new components + possible Badge variant + possible new metric-value token); no per-page content to spot-check. Mid-plan gate ONLY IF metric-value token decision escalates per D-72/D-106 precedent OR Badge variant evaluation surfaces visual-evidence question.
  - **Plan 29-01 closes WITH a single calibration gate** per § 3.4 (crito-source-flat-raster format) with DUAL pairing per D-130 — covers page-intro + TagFilter (active state) + 6-ProjectCard grid fidelity proposals + Y2isa raster pairing + image-import-12.jpg project-card pairing.
  - **Plan 29-02 closes WITH a single calibration gate** per § 3.4 (crito-source-flat-raster format) — covers back-nav + title-header + body-prose + Section/ResultsMetrics + Section/RelatedProjects fidelity proposals + cYlRH raster pairing.

### Cross-Cutting / Carry-Forward

- **D-140:** **Pre-flight `mcp__pencil__get_editor_state` enforcement carries forward** from Phase 23 OPEN-23-14 → Phase 24 D-35 → Phase 25 D-54 → Phase 26 D-87 → Phase 27 D-103 → Phase 28 D-125. Every Phase 29 plan that calls `set_variables`, `batch_design`, `find_empty_space_on_canvas`, or any Pencil-mutating tool first calls `mcp__pencil__get_editor_state({ include_schema: false })` and asserts active editor == `design/Crito.pen`. Halt and surface to user on mismatch. No exceptions.

- **D-141:** **PEN-INVENTORY extension pattern carries forward** from Phase 23 D-18 / Phase 24 D-23 / Phase 25 D-56 / Phase 26 D-88 / Phase 27 D-104 / Phase 28 D-126. Phase 29 adds:
  - **RECLASSIFICATION updates** to Y2isa + cYlRH rows in Frames Inventory per D-128: `joel_page_map` 'none' → 'Projects'/'Project detail'; `scope` mutation drops `token-mining-only` qualifier; `status_counts` `flat:1` → `hidden:1, partial:0, factored:0` post-APPROVE; `reconstruction_priority` `n/a` → `n/a (Phase 29 plans 29-01/29-02 — reconstructed; raster hidden via enabled:false per PAGE-11 ACTIVE post-APPROVE at calibration gate; structural archive persists at original canvas position per § 3.3)`
  - **NEW rows** for reconstructed `Projects` (Plan 29-01) + `Project` (Plan 29-02) frames in Frames Inventory
  - **Variant Evidence rows** for: Compound/ProjectCard slot signature (4 slots per D-132); Section/ResultsMetrics slot signature (heading + 3-fixed metric-tile cells per D-135); Section/RelatedProjects slot signature (heading + 3 ProjectCard refs per D-134); back-nav inline composition (text + Icon ref pattern per D-133); possible Badge variant addition per D-132 plan-execution; possible new `type-semantic-metric-large` token per D-135 plan-execution
  - **New section `## Open Flags — Phase 29 (OPEN-29-NN)`** populated by D-136 deferrals (Screenshots, Testimonial, Built With) + any plan-surfaced flags (likely candidates: cYlRH image-import-NN.jpg index identification at Plan 29-02 Task 0 per Phase 27 OPEN-25-07 + Phase 28 OPEN-28-03 precedent; Y2isa image-import-NN.jpg index identification at Plan 29-01 Task 0; metric-value token escalation if needed; Badge variant decision; prose-paragraph 'provisional' flag verification at Plan 29-02 body-prose if visual rendering surfaces concerns per Phase 26 D-71 + Phase 28 D-110 carry-forward)
  - **Updates to:** OPEN-23-05 (Y2isa + cYlRH partial-resolution post-APPROVE — only `04_About` remains long-tail token-mining-only carry-forward; closes the IN-SCOPE flat-raster reconstruction surface for v2.0 except for About); OPEN-25-07 (Card consumer-resolution — Phase 29 ships sibling Compound/ProjectCard NOT general-purpose t40xct reuse; consistent with Phase 28 BlogCard sibling-component precedent; t40xct serves Phase 27 Contact sidebar + future Phase 31 Homepage cross-card consumers); OPEN-23-10 partial-resolution if Plan 29-00 evaluates `type-semantic-metric-large` (otherwise heading-5/-6 remain open); OPEN-23-12 status check on `radius-semantic-pill` (Phase 28 D-120 deferred to instance-time override — Phase 29 may finally surface a real consumer if Compound/ProjectCard category badge uses `9999` cornerRadius enough to justify a token)
  - **PAGE-11 status updates:** Y2isa moves `flat → hidden-via-enabled:false` in status_counts post-Plan-29-01 APPROVE; cYlRH same post-Plan-29-02 APPROVE

### Claude's Discretion

- **Auto-layout vs absolute positioning at the page-frame level** — Phase 26/27/28 plan-execution lean is auto-layout vertical-stack at page level. Phase 29 carries forward.
- **Exact title typography token for Compound/ProjectCard** — D-132 default `type-semantic-heading-4` per v1.3 `text-xl` 20px; plan-execution may use heading-3 (24px) if visual rendering needs more weight against image-import-12.jpg Project card titles.
- **Compound/ProjectCard parent dimensions** — default 380w like Phase 28 BlogCard (3-col × 2-row 1200-content-width × 24-gap math); plan-execution may resize if Y2isa raster or image-import-12.jpg shows different proportion.
- **Category badge variant for Compound/ProjectCard category-badge-slot** — Phase 24 Badge/Default solid + Phase 28 Badge/Outline (kJQmJ, used by BlogCard tags) available. Plan-execution evaluates against image-import-12.jpg Project card categories. Default lean: Badge/Default solid (filled chip reads as a category indicator with stronger affordance than Outline which v1.3 uses sparingly).
- **Section/ResultsMetrics metric-value typography token** — D-135 default: reuse `type-semantic-heading-1` (48px display from Phase 23) for first try; ship NEW `type-semantic-metric-large` primitive only if visual rendering at calibration shows distinct treatment needed (Phase 23 D-33 open-extension policy + Pitfall 1 minimalism). Mid-plan gate per D-72/D-106 precedent.
- **Section/ResultsMetrics chrome treatment** — D-135 default: plain white + 1px `color-semantic-border-default` + `radius-semantic-card` 10px. Plan-execution may pivot to `color-semantic-decorative-coral` fill (Plan 28-01 banner precedent) if visual rendering needs distinction OR keep plain if Crito Service Details depicts a quiet result strip.
- **Section/RelatedProjects card density** — default 3 ProjectCard instances per Phase 28 D-118 RelatedPosts precedent; plan-execution may adjust if cYlRH or image-import-12.jpg depicts a different density (rare per Crito agency-template convention).
- **Back-nav icon glyph choice** — D-133 default `arrow-left` (lucide native Pattern A); plan-execution probes both `arrow-left` and `chevron-left` and picks against image-import-12.jpg/cYlRH visual treatment if either depicts a back-nav.
- **Back-nav color** — D-133 default `color-semantic-text-accent` (suggests interactive affordance); plan-execution may use `text-secondary` if Crito agency-template register treats secondary nav more muted.
- **v1.3 ProjectCard `categoryLabel` field as Compound/ProjectCard category-badge-slot content** — projects.json has 2 entries with categoryLabel: 'Web Apps' + 'Automation'. Plan-execution may ship the 4 v1.3 filter categories ('All Projects' active + 3 inactive: 'Web Apps' / 'Automation' / 'AI Development') as the representative pill set per D-137; ProjectCard instances ship category labels matching the active-filter or representative spread.
- **Compound/ProjectCard sample instance content for Plan 29-01** — 2 real `projects.json` entries (`bakery-order-system` + `inventory-sync-automation`) + 4 representative agency-template instances per Plan 28-01 BlogCard precedent (e.g., 'Custom CRM for Local Real Estate', 'AI-Powered Recipe Generator', etc.; plan-execution writes representative content).
- **Plan 29-02 body-prose project selection** — default `bakery-order-system` (testimonial-bearing case exercises the deferred-OPEN-29-NN Testimonial section context); plan-execution may use `inventory-sync-automation` if shorter/clearer prose serves calibration better.
- **Cross-row stale-cache get_screenshot quirk on 2 new page frames** — CALIBRATION-PROTOCOL § 6.4 Tier-1/Tier-2 workarounds available; Phase 29 plans inherit fallback path per Phase 27/28 production precedent (Tier-2 fallback at calibration gates is the production-proven path).
- **Per-plan `snapshot_layout({ problemsOnly: true })` discipline at plan close** — matches Phase 24/25/26/27/28 plan-close discipline. Default: yes, runs at every plan-close, documented in 29-NN-SUMMARY.md with text-clipping false-positive caveat per phase precedent (Plan 29-02 likely exceeds prior counts due to multi-section body-prose).
- **`radius-semantic-pill` token addition** — D-141 carry-forward; D-120 default-position is instance-time `9999` cornerRadius override. Phase 29 Compound/ProjectCard category-badge may finally surface enough rounded-pill consumer evidence to justify the token; plan-execution evaluates.
- **OPEN-23-05 long-tail (04_About)** — Phase 29 partial-resolution leaves only `04_About` as token-mining-only carry-forward. Phase 32 sweep + handoff doc records the final disposition; no Phase 29 action.
- **Plan 29-02 cYlRH raster probe surfacing extra sections** — D-129 Crito-shape Joel-content authority allows plan-execution to PULL IN deferred OPEN-29-NN sections (Screenshots / Testimonial / Built With) IF cYlRH structurally depicts them; default lean is to keep deferrals per D-136 conservative interpretation (Crito agency-template Service Details typically focuses on the service detail surface, not testimonials or technology badges).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope + requirements (must-read)
- `.planning/PROJECT.md` — v2.0 milestone goal, v1.4 abandonment context, single-file strategy, desktop-only scope, "content untouched" boundary (informs D-132 + D-135 Joel-content essential carve-outs).
- `.planning/REQUIREMENTS.md` — Phase 29 requirements: PAGE-02 (Projects index + Project detail), PAGE-09 (desktop-only), PAGE-11 (raster-removal-only-after-verify — ACTIVE for BOTH Y2isa and cYlRH per D-127 + § 3.3), VALID-01 (per-section fidelity labels — D-83 carry-forward), VALID-02 (calibration artifact — branch-redefined per § 3.1), VALID-03 (gap declaration — D-136 OPEN-29-NN flags).
- `.planning/ROADMAP.md` § "Phase 29" — Goal, Depends on (Phase 28), Success Criteria. **Important nuance:** Success criterion 3 ('hero, problem/solution/results, related projects') guided D-134 + D-135 component decisions; "related projects" success criterion satisfied by NEW Section/RelatedProjects per D-134 (Joel's v1.3 doesn't ship a related-projects section, but Phase 29 ships it per ROADMAP literal interpretation + Joel-content essential).
- `.planning/STATE.md` — current position: Phase 28 COMPLETE, Phase 29 ready to plan.

### CALIBRATION-PROTOCOL.md (definition-of-done framework — must-read at every per-page plan)
- `.planning/research/CALIBRATION-PROTOCOL.md` — Phase 26 Plan 26-03 codify-what-worked.
  - **§ 2 Branch Decision Tree** — Projects index + Project detail BOTH = `crito-source-present` flat-raster sub-case per D-127.
  - **§ 3 crito-source-present branch protocol** — § 3.1 VALID-02 (side-by-side with image-import-*.jpg raster); § 3.3 PAGE-11 ACTIVE (hide `Y2isa` after Plan 29-01 APPROVE; hide `cYlRH` after Plan 29-02 APPROVE); § 3.4 per-step script for both plans.
  - **§ 6.4 OPEN-26-02 stale-cache workaround tiering** — Tier-1 (cross-row Update) + Tier-2 (user editor verification fallback) — likely needed on both new page frames per Phase 27 + Phase 28 precedent.
  - **§ 10.4 FindEmptySpace `nodeId` anchor pattern** — Phase 29 plans use nodeId anchors: Plan 29-01 anchors on Phase 28 Tag frame (latest Phase 28 frame from 28-03 SUMMARY); Plan 29-02 anchors on Plan 29-01 Projects frame.

### Phase 28 carry-forward (Phase 29 inherits these decisions directly)
- `.planning/phases/28-blog-reconstruction-index-post-tag-page/28-CONTEXT.md` — Phase 28 decisions D-105 through D-126. Especially **D-114** (3-col × 2-row grid density — D-138 mirrors), **D-115** (Section/TagFilter broad-scoping — D-137 third consumer validates), **D-116** (narrow-scoping Section/RelatedPosts — D-134 Section/RelatedProjects mirrors narrow-scope rationale), **D-118** (3 Card refs in RelatedPosts — D-134 mirrors density), **D-119** (Hybrid library Mix-per-consumer for Badge variant decision — D-132 plan-execution evaluation extends), **D-122** (foundation-first plan ordering — D-138 mirrors), **D-124** (per-plan calibration gates with foundation-no-gate exception — D-139 mirrors), **D-125** (pre-flight active-editor — D-140 carry-forward), **D-126** (PEN-INVENTORY extension pattern — D-141 extends).
- `.planning/phases/28-blog-reconstruction-index-post-tag-page/28-01-SUMMARY.md` — Compound/BlogCard (ZSxZU) sibling-component birth + REVISE-loop lesson; informs D-131 upfront-commit decision to skip the probe-REVISE risk. Also: image-import-14.jpg pairing pattern (Phase 28 dual-target raster-vs-component); D-130 dual pairing extends this pattern to image-import-12.jpg for Phase 29 Projects.
- `.planning/phases/28-blog-reconstruction-index-post-tag-page/28-02-SUMMARY.md` (when published) — Plan 28-02 Blog Post detail PRIMARY validation site for prose tokens; Phase 29 Plan 29-02 body-prose section is the SECONDARY validation site (prose-paragraph 'provisional' flag further verification per D-110 carry-forward).
- `.planning/phases/28-blog-reconstruction-index-post-tag-page/28-03-SUMMARY.md` (when published) — Plan 28-03 Tag joel-only branch + nodeId anchor for Plan 29-01 (latest Phase 28 frame).

### Phase 27 carry-forward (D-99 secondary-link pattern for back-nav)
- `.planning/phases/27-thank-you-contact-reconstruction/27-CONTEXT.md` — Phase 27 decisions D-89 through D-104. Especially **D-93** (sibling-note belt-and-suspenders convention — D-137 TagFilter rename note + D-132 ProjectCard image-slot wiring note inherit), **D-97** (v1.3 content extraction discipline — Plan 29-02 body-prose verbatim extends), **D-99** (Thank-you secondary plain text-link with iconLeading — D-133 back-nav inheriting precedent), **D-101** (foundation-first plan ordering — D-138 mirrors), **D-102** (per-plan calibration gates — D-139 mirrors), **D-103** (pre-flight active-editor — D-140 carry-forward), **D-104** (PEN-INVENTORY extension pattern — D-141 extends).
- `.planning/phases/27-thank-you-contact-reconstruction/27-02-SUMMARY.md` — Plan 27-02 Contact crito-source-flat-raster execution + PAGE-11 ACTIVE first production use (cl8tt = image-import-18.jpg). Phase 29 Plans 29-01 + 29-02 are FOURTH + FIFTH production uses of PAGE-11 ACTIVE.

### Phase 26 carry-forward (Phase 29 inherits via Phase 27/28 chain)
- `.planning/phases/26-faq-404-reconstruction-calibration-workflow-established/26-CONTEXT.md` — Phase 26 decisions D-58 through D-88. Especially **D-58** (fresh-design-in-Crito-vocab — D-58 applies symmetrically to D-129 Crito-shape Joel-content hybrid; v1.3 yellow-neobrutalist chrome explicitly NOT inherited), **D-65** (single calibration gate per plan — D-139 carry-forward), **D-66** (CALIBRATION-PROTOCOL branch matrix — Phase 29 third phase to use single branch consistently per D-127), **D-72** (type-semantic token interpolation + mid-plan user gate precedent — D-135 metric-value token evaluation may follow same pattern), **D-78** (Section/CTA 3-slot signature broad-scoping — D-115 carry-forward), **D-79** (Section/NavBack narrow-scoping — D-133 preserves D-79 by NOT reusing NavBack for Project back-nav), **D-82** (v1.3 content verbatim where v1.3 has truth — Plan 29-01 page-intro + Plan 29-02 body-prose extend), **D-83** (per-section fidelity labels — D-129 + D-136 inherit), **D-86** (foundation plans close without user gate — D-139 carry-forward), **D-87** (pre-flight active-editor — D-140 carry-forward), **D-88** (PEN-INVENTORY extension pattern — D-141 extends).

### Phase 25 component library (Phase 29 instances + extends these)
- `.planning/phases/25-section-compound-components/25-CONTEXT.md` — Phase 25 decisions D-38 through D-57. Especially **D-38** (Crito-source nav labels stay literal — informs Header instances on Phase 29 page frames), **D-49** (single Card serves all card types via slot content — Phase 28 D-116 PROVED card-type divergence; Phase 29 D-131 continues sibling-component pattern), **D-50** (OPEN-25-07 source-coverage gap — Phase 29 partial-resolution per D-141), **D-52** (Pencil 2.13 typed-slot suggestion-only + sibling note belt-and-suspenders — D-134 + D-135 + D-137 sibling-note patterns inherit), **D-53** (`enabled: true` placeholder slots — D-134 + D-135 heading-slot defaults inherit).
- `.planning/phases/25-section-compound-components/25-01-SUMMARY.md` — Section/Header structural details: G0wNOc inside g9oRa5; 6 Crito-source nav labels (Phase 29 Header instances inherit as-is per D-77 carry-forward); Primitive/Button/Secondary `hIWuC` available for any secondary CTA need.
- `.planning/phases/25-section-compound-components/25-02-SUMMARY.md` — Section/Footer structural details: Xs0Hs inside g9oRa5; Phase 29 Footer instances inherit as-is per D-77 carry-forward.
- `.planning/phases/25-section-compound-components/25-03-SUMMARY.md` — Compound/Card (t40xct) structural details: 4-slot signature; OPEN-25-07 source-coverage gap context — Phase 29 D-131 ships sibling Compound/ProjectCard (NOT t40xct reuse) per Phase 28 BlogCard sibling-component precedent.

### Phase 24 primitive library (Phase 29 instances + may extend these)
- `.planning/phases/24-layout-primitives-primitive-components/24-CONTEXT.md` — Phase 24 decisions D-21 through D-37. Especially **D-22** (Default/Focus/Error compositional minimum forward states — D-132 Badge variant evaluation informed; D-135 metric-value token-need evaluation informed), **D-26** (source-driven glyph enumeration — D-133 back-nav `arrow-left` / `chevron-left` lucide-native Pattern A per D-44), **D-29** (Button iconLeading/iconTrailing slot pattern — D-133 back-nav inline composition pattern parallels), **D-33** (open token-extension policy — D-135 metric-value token-need follows), **D-35** (pre-flight active-editor — D-140 carry-forward), **D-44** (lucide-native Pattern A glyph swap — D-133 inherits).
- `.planning/phases/24-layout-primitives-primitive-components/24-05-SUMMARY.md` — primitive ids: Button/Default (M7eUr), Button/Secondary (hIWuC), Badge/Default (j0FxQZ), Badge/Outline (kJQmJ Phase 28 addition), Input/Default (nwJk7), Icon/24 (u7NmaS — plus 16/20/32 variants).

### Phase 23 token foundation (transitively referenced)
- `.planning/phases/23-audit-token-foundation/23-CONTEXT.md` — token-naming convention (D-12 flat-dash), components-reference-semantic-only (D-14 — D-132 + D-135 inherit), OPEN-flag policy (D-09 — informs all OPEN-29-NN additions), PEN-INVENTORY plain-markdown discipline (D-18 — carry-forward chain), Crito .fig fallback (D-04 — may inform D-135 metric-value token evaluation if mid-plan gate surfaces).
- Phase 23 OPEN flags Phase 29 partially resolves:
  - **OPEN-23-05** — Phase 29 reconstructs `Y2isa` (05_Service → Projects index) + `cYlRH` (06_Service Details → Project detail) per D-127 + D-128. Closes flat-raster reconstruction for Y2isa + cYlRH; only `04_About` (token-mining-only per D-07) remains in OPEN-23-05 long-tail carry-forward to Phase 32 disposition.
  - **OPEN-23-10** — heading-2 + heading-3 + heading-4 shipped (Phases 26 + 28); heading-5 + heading-6 remain open. D-135 metric-value token evaluation MAY add `type-semantic-metric-large` primitive if plan-execution surfaces real need (Phase 23 D-33 open-extension policy).
  - **OPEN-23-12** — `radius-semantic-pill` deferred to instance-time override per Phase 28 D-120. D-132 Compound/ProjectCard category-badge category-pill cornerRadius (likely `9999` per v1.3 rounded-full convention) may finally justify the token addition; plan-execution evaluates.

### Phase 25 + 26 + 27 + 28 OPEN flags Phase 29 resolves or extends
- **OPEN-25-07** — Phase 29 IS the resolution-precedent for the Card consumer-resolution pattern Phase 28 partial-resolved: ship sibling Compound/ProjectCard per Plan 28-01 BlogCard precedent (D-131). t40xct continues to serve Phase 27 Contact sidebar + Phase 28 RelatedPosts (3 t40xct refs) + future Phase 31 Homepage cross-card consumers. Phase 29 Card consumer count: 6 Compound/ProjectCard per Projects index + 3 Compound/ProjectCard per Project detail's RelatedProjects = 9 ProjectCard instances across 2 frames.
- **OPEN-23-12** — `radius-semantic-pill` evaluation per D-141 carry-forward (Phase 28 D-120 deferred to instance-time override).
- **OPEN-26-02** — stale-cache get_screenshot quirk; CALIBRATION-PROTOCOL § 6.4 Tier-1/Tier-2 workarounds available; Phase 29 plans inherit fallback path (likely triggers on both new frames per Phase 27 + Phase 28 precedent).
- **OPEN-28-02** — page-hero raster alignment gap (Phase 28 Plan 28-01 surfaced "page heroes need closer raster alignment"); Phase 29 Plan 29-01 page-intro section design should heed this lesson by probing Y2isa for hero-rhythm cues at calibration gate.

### Audit / inventory source (read for every plan in Phase 29)
- `.planning/research/PEN-INVENTORY.md` — single source of truth. Phase 29 plans read:
  - Frame classifications: `Y2isa` (05_Service) IN-SCOPE token-mining-only → reclassify to IN-SCOPE Projects with `status_counts: flat:1` → `hidden:1` post-Plan-29-01 APPROVE; `cYlRH` (06_Service Details) same pattern for Project detail post-Plan-29-02 APPROVE
  - Token surface (107+ tokens after Phase 28 — exact count varies per Phase 28 plan-spec inconsistency at 28-01-SUMMARY note; Phase 29 adds 0-1 new tokens per D-135 plan-execution evaluation)
  - Phase 23/24/25/26/27/28 Open Flags Phase 29 may resolve at calibration gates (listed above)
  - Phase 29 adds OPEN-29-NN rows per D-141 (Screenshots / Testimonial / Built With deferrals + plan-surfaced flags)
- `.planning/research/exports/v2.0/end-of-phase-28/id-inventory.json` (when published post-Phase 28 execution) — structural snapshot of `Crito.pen` after Phase 28. Plan 29-00 reads this to know primitive + section + compound ids to instance + baseline ids that must not be mutated. Includes latest Phase 28 frame id (e.g., Tag frame from Plan 28-03) for D-138 + § 10.4 FindEmptySpace anchor on Plan 29-01.

### Ground-truth source files (Phase 29 reads these via Pencil MCP or direct file I/O)
- `design/Crito.pen` — the work surface (Pencil MCP only). Phase 29 mutates:
  - NEW: `Compound / ProjectCard` inside `_Components / Compounds` (t67DU6) per D-131/D-132
  - NEW: `Section / ResultsMetrics` inside `_Components / Sections` (g9oRa5) per D-135
  - NEW: `Section / RelatedProjects` inside `_Components / Sections` (g9oRa5) per D-134
  - POSSIBLE NEW: Badge variant (`Primitive / Badge / Solid-Coral` or similar) inside `_Components / Primitives` (avgor) per D-132 plan-execution evaluation
  - POSSIBLE NEW: `type-semantic-metric-large` primitive + composite per D-135 plan-execution evaluation
  - NEW: `Projects` page frame per D-138 Plan 29-01
  - NEW: `Project` page frame per D-138 Plan 29-02
  - MUTATE: `Y2isa` raster — `enabled: false` after Plan 29-01 APPROVE (PAGE-11 ACTIVE per § 3.3)
  - MUTATE: `cYlRH` raster — `enabled: false` after Plan 29-02 APPROVE (PAGE-11 ACTIVE per § 3.3)
  - Existing frames (Phase 23–28 components + page frames + library parents) are read-only inputs.
- `design/images/image-import-*.jpg` — Phase 29 plans probe to identify:
  - Plan 29-01: Y2isa image-import-NN.jpg index AND image-import-12.jpg Project lower 2x2 grid (D-130 dual pairing per OPEN-25-07 line 303 carry-forward)
  - Plan 29-02: cYlRH image-import-NN.jpg index (UNKNOWN — FIRST identification per Phase 28 OPEN-28-03 precedent — likely a separate index from Y2isa)
- `design/images/Consulting & Agency Website Template I Crito (Community).fig` — Phase 28 OPEN-28-01 noted .fig not present in `design/`, only Alliatus .fig. If plan-execution can access the Crito .fig (e.g., user provides via other means), consult for D-135 metric-value typography fallback per Phase 23 D-04 / Phase 26 D-72 / Phase 28 D-106 precedent.
- `src/pages/projects/index.astro` (lines 1-149) — Joel's v1.3 Projects index page. Content extraction for D-138 Plan 29-01:
  - Page heading: 'Projects' (line 19)
  - Page-intro body: 'Real projects, real results. See how I've helped small businesses automate workflows, build custom tools, and leverage AI to work smarter.' (lines 20-23)
  - Filter category set: 'All Projects' / 'Web Apps' / 'Automation' / 'AI Development' (lines 30-62 — 4 categories per D-137)
  - Empty-state message (line 88-90): NOT shipped to .pen per Domain Out-of-scope (Joel's draft-filtering policy out of v2.0 scope)
- `src/pages/projects/[slug].astro` (lines 1-149) — Joel's v1.3 Project detail page. Content extraction for D-138 Plan 29-02:
  - Back-nav text: 'Back to Projects' (line 32) — D-133
  - Title-header structure (lines 36-51): h1 title + Badge category + xl body problem
  - Section headings: 'The Challenge' (line 56), 'The Solution' (line 66) — D-129 body-prose extraction
  - Section deferred per D-136: 'Screenshots' (lines 74-95), 'Results' (lines 100-115 — RECLAIMED via D-135), 'Testimonial' (lines 119-128), 'Built With' (lines 131-145)
- `src/components/ProjectCard.astro` (lines 1-53) — v1.3 ProjectCard structure source for D-132 Compound/ProjectCard slot signature derivation. Visual style (yellow neobrutalist + Bricolage Grotesque heading + 6px hard shadow + uppercase) explicitly NOT inherited per D-58 + D-132 Crito-visual register.
- `src/data/projects.json` — v1.3 project data. Content extraction:
  - 2 real projects: `bakery-order-system` (Web Apps, draft) + `inventory-sync-automation` (Automation, draft)
  - Each: title + slug + category + categoryLabel + thumbnail + problem + solution + results array (3 metrics) + technologies + screenshots + optional testimonial
  - Plan 29-02 default selects `bakery-order-system` for body-prose extraction (testimonial-bearing case — though Testimonial section deferred per D-136); Plan 29-01 ships both real projects + 4 representative agency-template instances per Plan 28-01 BlogCard precedent

### v2.0 research (cross-cutting context)
- `.planning/research/SUMMARY.md` — themes T1 (variables-first — Phase 29 adds 0-1 new tokens per D-135 evaluation), T5 (don't repeat v1.4 — calibration gates enforce per-section labels), T6 (single-file strategy — Projects + Project frames inside `Crito.pen`), T8 (component variants on-demand only — D-131 + D-132 + D-135 ship only what Phase 29 consumers need).
- `.planning/research/STACK.md` — Pencil MCP tool catalogue. `find_empty_space_on_canvas` with `nodeId` anchor (D-138 + § 10.4), `get_screenshot` (calibration artifacts — inline-only per OPEN-23-01 substitution), `set_variables` (used in Plan 29-00 IF D-135 metric-value token surfaces), `batch_design` (3-4 new components + 2 page frames).
- `.planning/research/PITFALLS.md` — Pitfall 1 (no inventing primitives without source — D-131 D-132 upfront-commit Pitfall-1 tension acknowledged; image-import-12.jpg + v1.3 ProjectCard.astro provide source evidence), Pitfall 4 (PAGE-11 NEVER hide raster before APPROVE — D-127 strict observance on Y2isa + cYlRH), Pitfall 7 (no premature component variants — D-132 drops image-import-12.jpg date + 'Read More' CTA slots), F3 (no eyedropping from raster JPGs — D-132 Crito-visual register lifted from raster at PROPORTION + COLOR-RANGE level only, NOT eyedropped tokens).

### Pencil MCP guidance (consulted during execution, not pre-read at planning)
- `mcp__pencil__get_editor_state({ include_schema: false })` — call FIRST in every 29-NN plan per D-140.
- `mcp__pencil__get_guidelines({ topic: "design-system" })` — call at start of Plan 29-00 (Component authoring guidance, slot mechanics for 3 new components).
- `mcp__pencil__get_variables({})` — call to verify 107+-token surface intact at Plan 29-00 start; re-call to verify drift expectations met (Phase 29 ships 0-1 new tokens per D-135) at every plan close.
- `mcp__pencil__batch_get` — verify baseline IDs intact (Phase 23–28 components + page frames + library parents).
- `mcp__pencil__batch_design` — Plan 29-00 (3 new library entries), Plan 29-01 (Projects page frame + content), Plan 29-02 (Project detail page frame + content + Section/ResultsMetrics 3-tile + Section/RelatedProjects 3-card composition).
- `mcp__pencil__find_empty_space_on_canvas` — Plan 29-01 + 29-02 page-frame placement per D-138 + § 10.4 (nodeId anchor pattern).
- `mcp__pencil__get_screenshot` — calibration artifacts per CALIBRATION-PROTOCOL § 3.4 step 4 (inline-only, NOT disk-written per OPEN-23-01 substitution).
- `mcp__pencil__snapshot_layout({ problemsOnly: true })` — per-plan close per Phase 24/25/26/27/28 precedent.

### Outputs this phase produces (referenced by Phase 30+)
- 2 new page frames in `design/Crito.pen`: `Projects` (Plan 29-01) + `Project` (Plan 29-02), both PAGE-11 ACTIVE applied.
- 3 new library entries: `Compound / ProjectCard`, `Section / ResultsMetrics`, `Section / RelatedProjects`.
- Possible 4th library entry (Badge variant) per D-132 plan-execution evaluation.
- Possible new token (`type-semantic-metric-large`) per D-135 plan-execution evaluation.
- `.planning/research/PEN-INVENTORY.md` extensions per D-141 (reclassifications + new rows + Variant Evidence + Token Extensions if applicable + OPEN-29-NN section).
- `.planning/research/exports/v2.0/end-of-phase-29/id-inventory.json` — structural snapshot per OPEN-23-01 substitution pattern (matches Phase 23 / 24 / 25 / 26 / 27 / 28 precedent).

</canonical_refs>

<code_context>
## Existing Code Insights

**Phase 29 makes NO `src/` code changes.** v2.0 is `.pen`-file-only (per PROJECT.md + REQUIREMENTS.md Out of Scope). The code-side observations below are content-extraction context only — they do NOT shape Phase 29 visual decisions for the crito-source-flat-raster branch (Y2isa + cYlRH + image-import-12.jpg are visual targets per D-127 / D-130).

### Reusable Assets (content-only references, not visual references)
- `src/pages/projects/index.astro` (lines 1-149) — v1.3 Projects index. Content extraction per D-138: heading 'Projects' + page-intro body verbatim (lines 19-23); 4 filter categories (All Projects / Web Apps / Automation / AI Development per lines 30-62 — D-137 instance content). Visual style (yellow neobrutalist filter buttons + grid + uppercase headings) explicitly NOT inherited per D-58 + D-132 Crito-visual register.
- `src/pages/projects/[slug].astro` (lines 1-149) — v1.3 Project detail. Content extraction per D-138 Plan 29-02: back-nav 'Back to Projects' (line 32 → D-133); title heading + category badge + problem hero (lines 36-51 — D-129 title-header section); 'The Challenge' + 'The Solution' section headings (lines 56, 66 — D-129 body-prose section); Results section LAYOUT (lines 100-115 — D-135 informs Section/ResultsMetrics 3-tile shape) + RECLAIMED via D-135 hybrid. Visual style (yellow box + 6px hard shadow + uppercase Bricolage Grotesque headings + turquoise tech badges) explicitly NOT inherited.
- `src/components/ProjectCard.astro` (lines 1-53) — v1.3 ProjectCard. Slot signature derivation per D-132: image-slot (16:9 aspect) + category-badge-slot (rounded-full yellow per v1.3 lines 36-40) + title-slot (text-xl font-bold per line 43) + body-slot (problem 3-line clamp truncated at 160 chars per lines 14-16, 48-50). Visual style explicitly NOT inherited (v1.3 yellow Card chrome).
- `src/data/projects.json` — v1.3 project data; 2 real projects (`bakery-order-system` + `inventory-sync-automation`). Content extraction: title + categoryLabel (D-137 instance pills + D-132 ProjectCard category-badge content) + problem (ProjectCard body-slot + title-header problem hero) + results array (Section/ResultsMetrics metric-tiles content per D-135). Plan 29-02 selects `bakery-order-system` default.

### Established Patterns (Pencil-side, ARE Phase 29 inputs)
- **Variables-first → primitives → compounds → sections → page frames** — Phase 23 tokens, Phase 24 primitives, Phase 25 sections + compounds, Phase 26-28 per-page reconstructions, Phase 29 sixth per-page phase (second after Phase 28 to potentially extend the token surface).
- **Single-file strategy** — everything in `design/Crito.pen`. Phase 29 page frames placed at the page-frame row (y ≈ −4111) via FindEmptySpace nodeId anchor pattern from CALIBRATION-PROTOCOL § 10.4 (Plan 29-01 anchors on Phase 28 Tag frame; Plan 29-02 anchors on Plan 29-01 Projects frame).
- **OPEN-flag system** — Phase 29 extends with `OPEN-29-NN` rows per D-141.
- **Pre-flight active-editor assertion** — D-140 carries forward from Phase 28 D-125 / Phase 27 D-103 / Phase 26 D-87 / Phase 25 D-54 / Phase 24 D-35 / Phase 23 OPEN-23-14.
- **Plain-markdown audit trails** — Phase 23 D-18 / Phase 24 D-23 / Phase 25 D-56 / Phase 26 D-88 / Phase 27 D-104 / Phase 28 D-126 pattern. Phase 29 D-141 extends.
- **Probe-first within plans** — Phase 24/25/26/27/28 established. Phase 29 Plan 29-01 probes Y2isa image-import-NN.jpg index AND image-import-12.jpg Project grid (dual pairing per D-130); Plan 29-02 probes cYlRH image-import-NN.jpg index (single pairing per § 3.4).
- **Belt-and-suspenders sibling-note documentation** — Phase 25 D-52 / Phase 26 D-78 / Phase 27 D-93 / Phase 28 D-111 pattern. D-132 ProjectCard image-slot wiring note + D-137 TagFilter rename note (optional) inherit.
- **Per-section fidelity labels with LAYOUT/TEXT split** — D-83 (Phase 26) precedent. D-129 + D-132 + D-135 inherit; Phase 29 detail page has mixed fidelity (body-prose verbatim = EXACT; Section/ResultsMetrics layout EXACT + content extracted EXACT; Section/RelatedProjects content APPROXIMATE; back-nav inline composition EXACT).
- **CALIBRATION-PROTOCOL crito-source-flat-raster branch** — Phase 27 Plan 27-02 + Phase 28 Plan 28-01 + Plan 28-02 production-proven. Phase 29 Plans 29-01 + 29-02 are FOURTH + FIFTH production uses.
- **Sibling-component pattern for divergent rasters** — Phase 28 Plan 28-01 REVISE-loop established. Phase 29 D-131 commits upfront (Compound/ProjectCard) to skip the REVISE-loop risk based on Phase 28's lesson.

### Integration Points
- **CALIBRATION-PROTOCOL.md is the definition-of-done framework** — every Plan 29-NN consults it at plan-time.
- **Phase 29 new components are the bridge** to Phase 30 (Design-system reference: token gallery + component gallery instances Phase 29 ProjectCard + ResultsMetrics + RelatedProjects) and Phase 31 (Homepage: may instance Compound/ProjectCard if Homepage has a featured-projects strip OR may build a separate card).
- **Phase 25 Compound/Card (t40xct)** continues to serve Phase 27 Contact sidebar + Phase 28 RelatedPosts (3 t40xct refs) consumers; Phase 29 D-131 sibling Compound/ProjectCard does NOT displace t40xct.
- **Phase 28 Section/TagFilter (O1IwyS)** is consumed for the THIRD time outside its declaring phase (Projects index Plan 29-01 instance). Validates Phase 28 D-115 broad-scoping claim with 3 consumers.
- **PEN-INVENTORY Frames Inventory table** — Phase 29 RECLASSIFIES 2 existing rows in-place (Y2isa + cYlRH) per D-128, the first time the inventory's classification (token-mining-only → IN-SCOPE reconstructed) has been mutated in v2.0. Prior reconstructions (Phase 26/27/28) added rows or moved scope from `IN-SCOPE flat:1` → `reconstructed-PHASE-NN`; Phase 29 also drops the `token-mining-only` qualifier.

</code_context>

<specifics>
## Specific Ideas

- **The Crito-shape Joel-content authority hybrid for the detail page (D-129) is the most subtle Phase 29 reading** — Phase 27 D-97 used "Joel-shape authority, Crito-visual register" for Contact (Joel's 8-field form shape over Crito's flat raster). Phase 29 reverses the polarity for Project detail: cYlRH structural authority CONSTRAINS the shape (body-prose section adopted as a single section instead of Joel's 4-section Challenge/Solution/Screenshots/Built With breakdown) WHILE Joel-content essentials (Results metric box + Related Projects strip) ship per ROADMAP + Joel-payoff regardless of cYlRH evidence. The hybrid is asymmetric — D-129 carves out per-section, NOT page-wide. Plan 29-02 plan-execution probes cYlRH and surfaces any section pull-back-in candidates at the calibration gate.
- **D-131 commits upfront where Phase 28 Plan 28-01 went through a REVISE-loop** — Phase 28 shipped Compound/BlogCard after image-import-14.jpg surfaced shape-divergence at v1 calibration. Phase 29 lifts the lesson — image-import-12.jpg + v1.3 ProjectCard.astro provide enough source evidence to commit Compound/ProjectCard at Plan 29-00 (foundation). Skips the v1 → v2 REVISE-loop risk. Acknowledged Pitfall 1 tension — the upfront commit IS Pitfall-1-tense (no raster probe yet) but mitigated by the dual evidence (Crito raster + v1.3 src).
- **Section/RelatedProjects (D-134) and Section/ResultsMetrics (D-135) are both NEW narrow-scoped components** — Phase 26 D-79 narrow-scoping precedent extends. Section/RelatedProjects is narrowly project-only (not generalized into Section/RelatedContent). Section/ResultsMetrics is narrowly metric-grid-only (not generalized into Section/StatsGrid for hypothetical future stats consumers). Both follow Pitfall O5/O6 prevention + named-by-domain-vocab discoverability for downstream agents.
- **Section/TagFilter broad-scoping validated with third consumer (D-137)** — Phase 28 D-115 argued broad-scoping based on 2 consumers from day one (Blog index + Tag page). Phase 29 Projects index becomes the third consumer, validating the broad-scoping decision retrospectively. Component-library count unchanged (no Section/CategoryFilter); only instance-time descendants overrides shift the pill content. Belt-and-suspenders sibling Pencil note at the instance (optional) documents the semantic stretch.
- **PAGE-11 ACTIVE applied TWICE in one phase (D-127)** — Phase 28 also applied twice (DzqTm + w1m3x); Phase 29 mirrors. Plans 29-01 + 29-02 each follow Pitfall 4 strict observance: hide raster ONLY after the per-plan APPROVE gate. Both Y2isa and cYlRH structural archives persist at original canvas position post-hide.
- **Reclassification mutation (D-128) is the first non-additive PEN-INVENTORY change in v2.0** — Phase 26/27/28 added rows or moved scope. Phase 29 D-128 RECLASSIFIES existing token-mining-only rows in-place: drops the `token-mining-only` qualifier AND updates `joel_page_map`. Closes a long-tail OPEN-23-05 carry-forward (only 04_About remains).
- **Back-nav inline composition (D-133) is the second secondary-link pattern consumer** — Phase 27 D-99 Thank-you secondary 'Return to homepage' was the first. Phase 29 D-133 Project back-nav extends. If a third consumer surfaces in Phase 30/31, consider whether a Section/SecondaryLink (Phase 26 D-79 narrow-scoping inverse) would consolidate the pattern.
- **Plan 29-00 foundation may ship 3-5 new artifacts** — 3 components (ProjectCard / ResultsMetrics / RelatedProjects) + possible Badge variant (1) + possible new token (1) = 3-5 deliverables. Mid-plan user gate (per Phase 26 D-72 / Phase 28 D-106 precedent) fires ONLY if token-value or Badge-variant evaluation surfaces an escalation; default close-without-gate per D-139.

</specifics>

<deferred>
## Deferred Ideas

- **Screenshots gallery section** — v1.3 [slug].astro lines 73-95 ships a 2-col responsive grid of project screenshots. Deferred to OPEN-29-NN per D-136 (no v1.3 ground-truth assets; cYlRH unlikely to depict). Future Joel-content phase or code milestone reintroduces.
- **Testimonial conditional blockquote** — v1.3 [slug].astro lines 118-128 (conditional on `project.testimonial`). Deferred to OPEN-29-NN per D-136. If a future Phase shows a Crito Service Details testimonial raster surface, ship `Section / Testimonial` then.
- **Built With technology badges row** — v1.3 [slug].astro lines 131-145 (turquoise Badge instances per `project.technologies` array). Deferred to OPEN-29-NN per D-136 (Joel-content section without Crito raster authority + v1.3 turquoise treatment doesn't translate cleanly into Crito-vocab).
- **Joel's draft-project filtering policy + 'Coming soon!' empty state** — v1.3 `src/pages/projects/index.astro` line 8 filters draft:true; line 88-90 ships empty-state message when filtered set is empty. Both real projects in `projects.json` currently have `draft: true`. .pen Phase 29 reconstruction ships a representative populated state (NOT empty state); empty-state design surfaces is a code-milestone concern.
- **Section/CategoryFilter as separate component** — D-137 declined; reuses Section/TagFilter (O1IwyS) instead. If a 4th consumer surfaces requiring semantic separation (e.g., different active-state visual mapping for categories vs tags), build then.
- **Generalized Section/RelatedContent unifying RelatedPosts + RelatedProjects** — declined per Phase 26 D-79 + Phase 28 D-116 narrow-scoping precedent. Honest vocabulary per content domain. Phase 30 Design-system reference may surface a generic 'card strip' shape that pulls these into a shared abstraction — defer to Phase 30 evaluation.
- **`Section / SecondaryLink` consolidation** — D-133 Phase 29 + Phase 27 D-99 are 2 consumers of the inline-text-link-with-iconLeading pattern. Not enough to factor; defer until 3rd consumer surfaces (potentially Phase 30 design-system reference or Phase 31 Homepage).
- **`type-semantic-metric-large` token (and related metric-tile typography)** — D-135 plan-execution evaluates need at Plan 29-00; default reuse `type-semantic-heading-1`. If shipped, this is the second post-Phase-23 token expansion path (Phase 28 added heading-3 / heading-4 / prose-link / prose-list / prose-inline-code / prose-code-block / mono-primitive).
- **`radius-semantic-pill` token** — OPEN-23-12 / Phase 28 D-120 deferred to instance-time `9999` cornerRadius override. Phase 29 Compound/ProjectCard category-badge MAY justify the token addition if plan-execution finds repeated 9999 use case across category + filter consumers; defer otherwise.
- **`Compound / ServiceCard` for Crito Service grid reconstruction** — Joel's site has no Services page (Crito 05_Service maps to Joel's Homepage Solutions section per PROJECT.md narrative). After D-128 reclassifies Y2isa for Projects, the Service-card shape Phase 25 D-49 hypothesized never gets a dedicated reconstruction. The shape lives on as the visual proxy for Projects via image-import-12.jpg; Phase 31 Homepage may re-derive a Services strip if needed.
- **Hover/focus states for Compound/ProjectCard** — clickable-card pattern in v1.3 (hover translates -y-2; focus shows yellow shadow). Static design tool represents READING state per D-92 / D-59 carry-forward; code milestone wires interactive states.
- **Joel-brand fonts (Bricolage Grotesque, DM Sans) + neobrutalist colors in Phase 29 frames** — PROJECT.md says these "still planned to be replaced when code milestones run on top of v2.0" (Out of Scope). Phase 29 explicitly NOT introducing them per D-58 carry-forward.
- **Joel's v1.3 4-link Header nav override (Blog / Projects / FAQ / Contact)** — Phase 25 D-38 + Phase 26 D-77 + Phase 27 + Phase 28 carry-forward chain: defers to Phase 31 Homepage instance time. Phase 29 inherits.
- **Joel-brand logo / wordmark in Section/Header logo slot** — Phase 25 D-40 deferred; Phase 26-28 do not address. Phase 29 instances inherit Crito-source logo placeholder.
- **`type-semantic-prose-paragraph-*` 'provisional' flag verification** — Phase 28 Plan 28-02 PRIMARY validation surface; Phase 26 D-71 carry-forward. Phase 29 Plan 29-02 body-prose is a SECONDARY validation surface — if visual rendering looks wrong at calibration, raise OPEN-29-NN.
- **04_About frame final disposition** — Phase 29 partial-resolution leaves only 04_About as token-mining-only carry-forward in OPEN-23-05. Phase 32 milestone-close sweep + handoff doc records the disposition (likely: 04_About stays as flat raster, joel_page_map remains `none`, scope stays IN-SCOPE token-mining-only — Joel's Homepage has an About section per ROADMAP, not a standalone About page).
- **Code-milestone `/projects` and `/projects/[slug]` route rewrites** — out of v2.0 scope. v1.3 routes keep rendering on v1.3 code throughout v2.0. Code milestone must refactor `/projects/index.astro` and `/projects/[slug].astro` to consume Phase 29's frames + draft-filtering policy + Screenshots/Testimonial/Built With reintroduction.

</deferred>

---

*Phase: 29-projects-reconstruction-index-project-detail*
*Context gathered: 2026-06-09*

---
phase: 28-blog-reconstruction-index-post-tag-page
plan: 01
status: complete
date: 2026-06-08
---

# Plan 28-01 Summary: Blog Index Page Reconstruction (Crito-Source Flat-Raster Branch)

Plan 28-01 reconstructs the Crito `07_Blog` flat-raster (DzqTm = image-import-14.jpg) as an editable `Blog` top-level page frame at canvas (~22407, -4111.55). Ships the new `Compound / BlogCard` component (REVISE loop), a coral page-intro banner with white SVG wave, the 3-col × 2-row BlogCard grid, and PAGE-11 ACTIVE on DzqTm (second production use of PAGE-11 ACTIVE in v2.0 after Phase 27 cl8tt).

## Pencil MCP Subagent-Tool-Inheritance Caveat

Executed INLINE by the main orchestrator per Plan 28-00 carry-forward (Pencil MCP tools unavailable to spawned `gsd-executor` subagents — agent tool namespace is `Read, Write, Edit, Bash, Grep, Glob`, no `mcp__pencil__*`).

## Task 0: Pre-flight + DzqTm probe + v1.3 content extraction

- `mcp__pencil__get_editor_state({ include_schema: false })` confirmed active editor `design/Crito.pen` ✓
- `mcp__pencil__get_variables({})` returned 127 user-facing tokens (Plan 28-00 close — note plan-spec said 107 which counts composites as 1 logical token; actual variable count expands per Phase 26 pattern: composites stored as N sub-vars). Recorded as known plan-spec inconsistency, not a drift event.
- **`mcp__pencil__batch_get(['DzqTm'], readDepth: 2)` returned DzqTm raster `fill.image = "images/image-import-14.jpg"` ✓** (matches Phase 25 D-49 prediction)
- DzqTm canvas position: (9767.27, -4111.55), width 1920, height 3871, layout: none, clip: true
- Plan 28-00 deliverables intact via batch_get: TagFilter O1IwyS + paired-ref pills + RelatedPosts etY5x + vGH3A extension with SoXch metadata-caption + Badge/Outline kJQmJ
- Phase 24/25/26/27 baselines intact: G0wNOc Section/Header, Xs0Hs Section/Footer, t40xct Compound/Card, M7eUr Button/Default, hIWuC Button/Secondary, j0FxQZ Badge, n0QqTd Contact frame at (20887.27, -4111.55)
- v1.3 verbatim strings extracted from `src/pages/blog/index.astro` lines 35-39: heading "Blog" + body "Practical insights on automation, AI, and custom software for small businesses. Learn how to work smarter, not harder."
- 2 real MDX posts identified: "Getting Started with Business Automation" (2026-01-27, tags: automation/small-business/productivity) + "I'm Pivoting" (2026-02-09, tags: ai/automation/etc)

No mutations in Task 0.

## Tasks 1-5: Initial Blog frame composition (REPLACED at REVISE loop)

Initial build per plan: FindEmptySpace nodeId:n0QqTd anchor → Blog frame at (22407.27, -4111.55) → Header ref + page-intro frame (1200w heading + body) + TagFilter ref + blog-grid with 6 t40xct Card refs (3-col × 2-row) + Footer ref + sibling featuredImage wiring note.

Sibling note R2eWc was initially placed INSIDE Blog frame but Pencil notes don't follow flex layout the same way frames do — note rendered at absolute canvas position OVERLAPPING blog-grid AND added height to parent's layout calc. Moved note to be sibling of N2pkDx at document root.

## REVISE loop: Compound/BlogCard component build + page-intro banner pivot

User decision at Plan 28-01 Task 8 calibration gate v1: REVISE — card style doesn't match the Crito raster (image-import-14.jpg). User clarification: "Make a BlogCard component" — distinct from t40xct general-purpose Card.

### REVISE step 1: Compound/BlogCard component build inside t67DU6

NEW reusable Compound component (sibling of t40xct + SW4cz):
- `ZSxZU` = `Compound / BlogCard` (reusable:true, vertical layout, gap 0, padding 0, width 380, cornerRadius 10, fill white, strokeWidth 0 borderless per user-directed REVISE-step-3, clip:true)
- `l58P3` = image-slot (frame, slot:[], width fill_container, height 240, fill #f2f2f7ff bg-surface-elevated, vertical layout with center alignItems + justifyContent) — contains placeholder text child `o419y` "Featured image"
- `uSmRf` = content-area (frame, width fill_container, vertical, gap 12, padding 24)
  - `wtjQE` = date-row (text): default "JAN 27, 2026 • 5 MIN READ", body-sm typography + secondary color
  - `Q0iK5` = title (text): default "Post title placeholder", **heading-3 typography** (Plus Jakarta Sans 24/700/lh 1.4) — **FIRST real consumer of Plan 28-00 heading-3 token surface**
  - `ZAlf3` = excerpt (text): default placeholder excerpt, prose-paragraph + secondary color
  - `n4lcP3` = tags-row (frame, slot:["kJQmJ"] TYPED per D-52 PREFERRED, horizontal, gap 8, alignItems center, fill_container) — contains 2 default Badge/Outline (kJQmJ) refs
- `HCDiX` = sibling Pencil note documenting slot signature + Crito-raster provenance + narrow-scope rationale + heading-3 first-consumer + borderless decision

### REVISE step 2: 6 Card instances replaced with BlogCard instances

Deleted 6 t40xct Card refs from row-1 + row-2 (MjesG, bEbz6, iiaTM, COGkG, MXt2G, AycvS). Inserted 6 new BlogCard refs (pXhdd, eu1zW, lf31r, J0OJyq, QPqZl, Tw07G) with full descendants overrides:
- 2 real MDX posts (Cards 1-2): "Getting Started with Business Automation" + "I'm Pivoting"
- 4 representative agency-template posts (Cards 3-6): "The Future of Small Business Tech" / "Why I Use Astro for Client Sites" / "Building Trust with Small Business Clients" / "AI Tools That Actually Save Time"
- Each Card descendants: wtjQE (date+readingTime) + Q0iK5 (title) + ZAlf3 (excerpt) + n4lcP3 (tags-row with 2-3 Badge/Outline refs labeled per post.data.tags)

### REVISE step 3: Border removal

User clarification: "The blog cards don't have borders on the design." Updated ZSxZU strokeWidth from 1 to 0 (preserves stroke color for forward-state reuse).

### REVISE step 4: page-intro banner with white wave shape

User clarification: "Let's also update the page header to have that color and visual accent" → "There's a beige-ish banner with a white wave shape" + chose `$color-semantic-decorative-coral` (#ff928aff) as nearest semantic match.

**Pencil layout-engine quirk encountered:** After deleting Rtshs and inserting new vhva5 banner + Move(banner, "N2pkDx", 1), batch_get confirmed banner at semantic index 1 but snapshot_layout rendered banner at y 1682 (past Footer) — Move reordered the children array but did NOT trigger flex-layout re-render. Tried multiple workarounds (re-Move all subsequent children to explicit indices, toggle fit_content, etc.) — none triggered re-layout. **Workaround codified:** Delete + recreate parent N2pkDx entirely with children inserted in correct semantic + visual order. Rebuilt as EDAf1 with banner WuC14 at index 1 from inception — snapshot_layout returned correct y positions immediately.

New banner structure (EDAf1 child WuC14):
- `WuC14` = page-intro-banner (frame, width fill_container, vertical, padding 0, fill #ff928aff coral, alignItems center)
- `uSpsf` = page-intro content frame (width 1200, vertical, gap 16, padding [80, 0, 48, 0], alignItems center)
  - `uqJfj` = heading (text): "Blog" — verbatim from v1.3, heading-1 typography
  - `K3m3y` = body (text): full v1.3 verbatim body, prose-paragraph typography, centered, width 600 (max-w-2xl proxy)
- `oR8Ep` = wave (path, NEW): width fill_container, height 60, fill white, viewBox [0,0,1440,60], geometry `M0,20 Q360,0 720,20 T1440,20 L1440,60 L0,60 Z` — 2-wave sine pattern (peak up at x=360, valley down at x=1080 via smooth-quadratic mirror)

## Task 8: Calibration gate (3 iterations)

- **v1:** REVISE — card style doesn't match (→ REVISE step 1+2 BlogCard component build)
- **v2:** REVISE — cards still don't match (border + banner) (→ REVISE step 3 borderless + REVISE step 4 banner)
- **v3:** APPROVE-with-GAP — composition matches with caveat that page heroes need closer alignment to raster (recorded as OPEN-28-02)

User-locked fidelity labels at v3 APPROVE-with-GAP:
- page-intro EXACT (verbatim v1.3 content)
- TagFilter APPROXIMATE (representative pill labels; actual tag set dynamic at code milestone)
- 6-BlogCard grid APPROXIMATE (representative posts + metadata + image-slot default placeholder)
- Header EXACT (Phase 25 baseline, D-77)
- Footer EXACT (Phase 25 baseline, D-77)
- Coral banner + white wave: APPROXIMATE per OPEN-28-02

## Task 9: PAGE-11 ACTIVE on DzqTm

- `Update("DzqTm", {enabled: false})` fired ONLY AFTER Task 8 APPROVE (Pitfall 4 + T-28-03 sequencing strictly observed)
- `batch_get` confirmed `enabled: false` ✓, frame structure preserved (DzqTm not deleted, just hidden — structural archive at (9767.27, -4111.55))
- **SECOND production use of PAGE-11 ACTIVE in v2.0** (first was cl8tt at Phase 27 Plan 27-02)
- `mcp__pencil__snapshot_layout({maxDepth:0, problemsOnly:true})` returned `"No layout problems."` at document root ✓

## OPEN flags raised

- **OPEN-28-02 (fidelity-gap, notable):** Page hero banner alignment with Crito raster (image-import-14.jpg) APPROXIMATE not EXACT. User flagged that page heroes across reconstructed pages need closer raster alignment (banner proportions + wave shape geometry + color tone — "beige-ish" in raster vs decorative-coral semantic shipped). Resolution mechanism: live calibration per per-page phase OR Phase 32 fidelity sweep. If warm-beige primitive repeatedly needed across 2+ heroes, add new token surface.

## OPEN flags updated

- **OPEN-23-05 (flat-raster scope):** Further partial-resolution annotation — 07_Blog (DzqTm) reconstructed as editable Blog (EDAf1) + PAGE-11 ACTIVE post-APPROVE. 4 flat-raster frames remain (08_Blog Details next at Plan 28-02, 06_Service Details, 05_Service, 04_About).
- **OPEN-25-07 (Card consumer-resolution):** Partial-resolution annotation — first Blog consumer revealed Crito blog cards diverge from t40xct general-purpose shape; ship NEW Compound/BlogCard sibling component pattern. t40xct serves general consumers (Phase 27 sidebar + future Projects) unchanged.

## Token surface change

127 → 127 (zero new tokens per D-91 reuse). heading-3 token surface (Plan 28-00 Task 1 shipped) gets its FIRST real consumer via Compound/BlogCard title. decorative-coral semantic alias (Phase 23 shipped) gets its FIRST real consumer via page-intro-banner fill.

## Library count change

- `_Components / Primitives` (avgor): unchanged at 16 reusable children
- `_Components / Compounds` (t67DU6): 2 → **3** reusable children (NEW Compound/BlogCard `ZSxZU`)
- `_Components / Sections` (g9oRa5): unchanged at 6 reusable children

## Page-frame count change

4 → **5** reconstructed top-level page frames in v2.0: FAQ + 404 + Thank-you + Contact + Blog. PAGE-11 ACTIVE count: 1 → 2 (cl8tt + DzqTm).

## Baseline IDs intact

Verified via batch_get + post-mutation get_editor_state: M7eUr, hIWuC, j0FxQZ, kJQmJ, t40xct, G0wNOc, Xs0Hs, vGH3A, SoXch, FGdti, oTSwn, eNqxd, O1IwyS, etY5x, avgor, t67DU6, g9oRa5, n0QqTd, csXky, b7Hgy, XsDab. Phase 24-27 + Plan 28-00 ship-set unchanged. DzqTm canvas position preserved.

## Pencil tooling observations (recorded for future-phase awareness)

1. **Move() does not trigger flex-layout re-render:** Inserting a frame then Moving it to a different child index updates the children-array order semantically (verified via batch_get) but the layout engine continues to render the moved frame at its original insertion position. Workaround: Delete + recreate parent with children in correct order at insertion-time. Codified for future page-frame restructuring.
2. **Pencil notes don't participate in flex layout the same way frames do:** Notes at canvas position render where placed regardless of parent layout flow, while ALSO contributing height to parent layout calculation — causing double-counting. Pattern: place sibling notes at document root next to their related frame, not inside it.
3. **fit_content height fails to capture last 50px of layout:** When Blog frame uses height:fit_content with children summing to total H, the parent reports H - 50 (~50px short). Workaround: explicit height value (e.g., 2400 initial, settle to actual content after rebuild).

## Next plans

- 28-02 (Blog Post Page) — PRIMARY validation consumer of heading-3 + heading-4 + all 4 prose composites (inline-code + code-block + link + list) + RelatedPosts component (footer)
- 28-03 (Blog Tag Page) — TagFilter active-state-flip mechanic (D-117 paired-ref toggle) + 6-BlogCard grid filtered subset

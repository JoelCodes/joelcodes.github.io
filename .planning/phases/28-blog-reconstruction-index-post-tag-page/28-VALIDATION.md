---
phase: 28
slug: blog-reconstruction-index-post-tag-page
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-06-08
---

# Phase 28 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
>
> **v2.0 special case — Pencil-MCP-only phase.** Phase 28 mutates `design/Crito.pen` exclusively (zero `src/` changes per CONTEXT D-126 carry-forward + PROJECT.md v2.0 milestone scope). The "validation framework" is **Pencil MCP introspection** (`get_editor_state` / `batch_get` / `snapshot_layout` / `search_all_unique_properties` / `get_variables`) — NOT Playwright / axe / jest / build. There is no rendered HTML surface to assert against in v2.0. Test commands below are Pencil MCP tool invocations, not shell commands.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Pencil MCP introspection (Pencil 2.13+) |
| **Config file** | none — Pencil MCP server runs in-process; active editor required = `design/Crito.pen` (D-125 enforces pre-flight assertion before every mutation) |
| **Quick run command** | `mcp__pencil__snapshot_layout({ maxDepth: 0, problemsOnly: true })` — document-root layout sanity check |
| **Full suite command** | Per-plan close: `get_editor_state` → `batch_get(baseline IDs)` → `snapshot_layout(per-frame)` → `search_all_unique_properties(scoped)` → `get_variables({})` (token-surface drift check) |
| **Estimated runtime** | < 5 seconds per command (Pencil MCP is in-process) |

---

## Sampling Rate

- **After every Pencil-mutating `batch_design` call:** Run `snapshot_layout({ parentId: <mutated-node>, problemsOnly: true })` immediately
- **After every plan-internal task that creates new nodes:** Run `batch_get({ nodeIds: [<created-nodes>], readDepth: 1 })` to confirm IDs intact
- **At every plan close:** Run the Full suite command above (per-plan close sweep — Phase 24/25/26/27 plan-close discipline carries forward)
- **Before `/gsd:verify-work`:** All Phase 28 plan-close sweeps must show `"No layout problems."` at document root (per-frame text-clipping false-positives per Phase 24-27 carry-forward quirk are documented in 28-NN-SUMMARY.md, NOT mitigated — likely exceed Phase 27 counts due to multi-paragraph post body prose per Pitfall 5)
- **Max feedback latency:** < 5 seconds (Pencil MCP in-process)

---

## Per-Task Verification Map

> Task IDs use the convention `{phase}-{plan}-{task}` matching planner output. Task list is preliminary — planner will refine in 28-NN-PLAN.md. Phase 28 ships 4 plans per CONTEXT D-122: 28-00 (foundation: 7 tokens + 2 Sections + possible Badge variant), 28-01 (Blog index crito-source-flat-raster, PAGE-11 ACTIVE on DzqTm), 28-02 (Blog post detail crito-source-flat-raster, PAGE-11 ACTIVE on w1m3x), 28-03 (Tag page joel-only-no-crito-ref, PAGE-11 INERT).

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 28-00-00 | 28-00 | 1 | PAGE-03 (foundation for) | — | Pre-flight active-editor assertion before any mutation (D-125) | tool | `mcp__pencil__get_editor_state({ include_schema: false })` returns `activeEditor.fileName == "Crito.pen"` | ✅ baseline | ⬜ pending |
| 28-00-01 | 28-00 | 1 | TOKEN-06 (heading-3) | — | `type-semantic-heading-3-*` 4-part composite added; interpolation default (24/700/lh 1.4) or .fig-derived value if probe succeeds | tool | `get_variables({})` confirms 4 new variables matching `type-semantic-heading-3-*` pattern; 100 tokens → 104 | ❌ W0 | ⬜ pending |
| 28-00-02 | 28-00 | 1 | TOKEN-06 (heading-4) | — | `type-semantic-heading-4-*` 4-part composite added; interpolation default (20/700/lh 1.4) | tool | `get_variables({})` confirms 4 new variables matching `type-semantic-heading-4-*` pattern; 104 → 108 | ❌ W0 | ⬜ pending |
| 28-00-03 | 28-00 | 1 | TOKEN-06 (mono primitive) | — | `type-primitive-family-mono` primitive added; system mono stack default if .fig silent | tool | `get_variables({})` confirms `type-primitive-family-mono` variable present; 108 → 109 | ❌ W0 | ⬜ pending |
| 28-00-04 | 28-00 | 1 | TOKEN-06 (inline-code) | — | `type-semantic-prose-inline-code-*` composite (mono + body-sm + bg-surface-elevated + 1px border + radius 4 + 4px h-padding) | tool | `get_variables({})` confirms inline-code composite variables; ~109 → 114 | ❌ W0 | ⬜ pending |
| 28-00-05 | 28-00 | 1 | TOKEN-06 (code-block) | — | `type-semantic-prose-code-block-*` composite (mono + body-sm + bg-surface-elevated + 16px padding + radius + lh 1.6) | tool | `get_variables({})` confirms code-block composite variables; ~114 → 119 | ❌ W0 | ⬜ pending |
| 28-00-06 | 28-00 | 1 | TOKEN-06 (prose-link) | — | `type-semantic-prose-link-*` composite (accent fill + hover-underline descriptor) | tool | `get_variables({})` confirms prose-link composite variables; ~119 → 121 | ❌ W0 | ⬜ pending |
| 28-00-07 | 28-00 | 1 | TOKEN-06 (prose-list) | — | `type-semantic-prose-list-*` composite (indent 24 + item-gap 8 + bullet-style disc + ordered-style decimal) | tool | `get_variables({})` confirms prose-list composite variables; ~121 → 125 | ❌ W0 | ⬜ pending |
| 28-00-08 | 28-00 | 1 | PAGE-03 (Section/TagFilter) | — | `Section / TagFilter` component built in `_Components / Sections` (g9oRa5); heading-slot enabled:false; pills-row with paired-ref children per Sub-option A1 | tool | `batch_get({ nodeIds: ['<tagfilter-id>'], readDepth: 3 })` confirms slot signature + paired Button/Default + Button/Secondary children | ❌ W0 | ⬜ pending |
| 28-00-09 | 28-00 | 1 | PAGE-03 (Section/RelatedPosts) | — | `Section / RelatedPosts` component built in `_Components / Sections` (g9oRa5); heading-slot enabled:true 'Related posts' default; cards-row of 3 Card refs | tool | `batch_get({ nodeIds: ['<relatedposts-id>'], readDepth: 3 })` confirms slot signature + 3 Card instance children | ❌ W0 | ⬜ pending |
| 28-00-10 | 28-00 | 1 | PAGE-03 (Card title-slot extension) | — | Compound/Card title-slot (vGH3A) extended with pre-created caption-tier metadata text node child (Path A per RESEARCH Focus 3) for instance-time content override | tool | `batch_get({ nodeIds: ['vGH3A'], readDepth: 2 })` confirms metadata-caption text node child exists; `search_all_unique_properties({ parentId: 'vGH3A' })` returns zero raw hex/px | ❌ W0 | ⬜ pending |
| 28-00-11 | 28-00 | 1 | PAGE-03 (Badge variant evaluation) | — | Badge/Outline variant added IF Phase 24 surface doesn't cover outline-pill style (per D-119 plan-execution evaluation) OR Badge surface confirmed sufficient | tool | If new variant: `batch_get({ nodeIds: ['<badge-outline>'], readDepth: 2 })` confirms variant exists + zero raw hex/px. If sufficient: 28-00-SUMMARY.md documents evaluation outcome | ❌ W0 / ✅ baseline (conditional) | ⬜ pending |
| 28-00-12 | 28-00 | 1 | PAGE-03 (foundation) | — | Document-root snapshot_layout clean after foundation work | tool | `snapshot_layout({ maxDepth: 0, problemsOnly: true })` returns `"No layout problems."` | ✅ baseline | ⬜ pending |
| 28-01-00 | 28-01 | 2 | PAGE-03 | — | DzqTm image-import-NN.jpg index probed (HIGH-PRIORITY Plan 28-01 deliverable per RESEARCH Focus 4; likely image-import-14.jpg per Phase 25 D-49 raster-probe note) | tool | `batch_get({ nodeIds: ['DzqTm'], readDepth: 2 })` reveals raster fill image reference; index recorded in 28-01-SUMMARY.md | ❌ W0 | ⬜ pending |
| 28-01-01 | 28-01 | 2 | PAGE-03 | — | Pre-flight active-editor assertion (D-125) | tool | `mcp__pencil__get_editor_state({ include_schema: false })` returns Crito.pen | ✅ baseline | ⬜ pending |
| 28-01-02 | 28-01 | 2 | PAGE-03 | — | `Blog` frame placed at page-frame row via FindEmptySpace nodeId anchor (n0QqTd Contact frame per Phase 27 § 10.4) | tool | `batch_get({ nodeIds: ['<blog-index-id>'], readDepth: 1 })` confirms y ≈ -4111 (same row as n0QqTd) | ❌ W0 | ⬜ pending |
| 28-01-03 | 28-01 | 2 | PAGE-03 | — | Page-intro section: 'Blog' heading (heading-1) + body verbatim from v1.3 index.astro lines 32-37 | tool | `batch_get({ nodeIds: ['<page-intro-id>'], readDepth: 2 })` confirms text content matches v1.3 verbatim | ❌ W0 | ⬜ pending |
| 28-01-04 | 28-01 | 2 | PAGE-03 | — | Section/TagFilter instance: 'All Posts' pill active + N=4 inactive tag pills (active state via paired-ref enabled toggle per RESEARCH Focus 6 A1) | tool | `batch_get({ nodeIds: ['<tagfilter-instance>'], readDepth: 3 })` confirms one Button/Default-ref pair enabled:true + remaining Button/Secondary-ref pairs enabled:true | ❌ W0 | ⬜ pending |
| 28-01-05 | 28-01 | 2 | PAGE-03 | — | 6 Card instances in 3-col × 2-row grid; each with title-slot descendants override (metadata-caption content) + footer-actions-slot Badge instances (tag pills) + image-slot default placeholder | tool | `batch_get({ nodeIds: ['<grid-id>'], readDepth: 3 })` confirms 6 Card refs (t40xct) with descendants overrides | ❌ W0 | ⬜ pending |
| 28-01-06 | 28-01 | 2 | PAGE-03 | — | Blog index Header (G0wNOc) + Footer (Xs0Hs) instances present + Crito-source labels intact (D-77 carry-forward) | tool | `batch_get({ nodeIds: ['<blog-header-ref>','<blog-footer-ref>'], readDepth: 1 })` confirms ref ids | ❌ W0 | ⬜ pending |
| 28-01-07 | 28-01 | 2 | PAGE-03 | — | Zero raw hex/px on Blog index frame (all token-bound) | tool | `search_all_unique_properties({ parentId: '<blog-index-id>' })` returns zero raw hex + zero raw px | ❌ W0 | ⬜ pending |
| 28-01-08 | 28-01 | 2 | PAGE-03, VALID-01, VALID-02 | — | Per-section fidelity labels per D-83; user APPROVE via CALIBRATION-PROTOCOL § 3.4 step 5 AskUserQuestion gate (crito-source-flat-raster — pairs against DzqTm image-import-NN.jpg from Task 28-01-00) | manual | AskUserQuestion at plan close — user side-by-side compares reconstructed Blog index frame against DzqTm raster | manual | ⬜ pending |
| 28-01-09 | 28-01 | 2 | PAGE-03, VALID-03, PAGE-11 ACTIVE (1/2) | — | **PAGE-11 ACTIVE — `DzqTm` raster hidden via `enabled: false` AFTER user APPROVE only** (CALIBRATION-PROTOCOL § 3.3 + § 3.4 step 7; NEVER before APPROVE per Pitfall 4; second production use after Phase 27 cl8tt) | tool | `batch_get({ nodeIds: ['DzqTm'], readDepth: 0 })` confirms `enabled: false` after APPROVE; PEN-INVENTORY Frames Inventory `status_counts` updated flat:1 → hidden:1 for 07_Blog | ❌ W0 | ⬜ pending |
| 28-01-10 | 28-01 | 2 | PAGE-03 | — | Plan-close snapshot_layout clean | tool | `snapshot_layout({ parentId: '<blog-index-id>', problemsOnly: true })` returns `"No layout problems."` | ✅ baseline | ⬜ pending |
| 28-02-00 | 28-02 | 3 | PAGE-03 | — | w1m3x image-import-NN.jpg index probed (HIGH-PRIORITY Plan 28-02 deliverable; UNKNOWN per RESEARCH Focus 4 — first identification) | tool | `batch_get({ nodeIds: ['w1m3x'], readDepth: 2 })` reveals raster fill image reference; index recorded in 28-02-SUMMARY.md | ❌ W0 | ⬜ pending |
| 28-02-01 | 28-02 | 3 | PAGE-03 | — | Pre-flight active-editor assertion (D-125) | tool | `mcp__pencil__get_editor_state({ include_schema: false })` | ✅ baseline | ⬜ pending |
| 28-02-02 | 28-02 | 3 | PAGE-03 | — | `Blog Post` frame placed at page-frame row via FindEmptySpace nodeId anchor (Blog index frame from Plan 28-01) | tool | `batch_get({ nodeIds: ['<blog-post-id>'], readDepth: 1 })` confirms y ≈ -4111 | ❌ W0 | ⬜ pending |
| 28-02-03 | 28-02 | 3 | PAGE-03 | — | Post header section: title (heading-1) + metadata row (date + reading-time) + tag row (inline Badge instances per D-121) + featured-image default placeholder + sibling wiring note (per D-113) | tool | `batch_get({ nodeIds: ['<post-header-id>'], readDepth: 3 })` confirms 4 child sections; tag row contains N Badge refs | ❌ W0 | ⬜ pending |
| 28-02-04 | 28-02 | 3 | PAGE-03, TOKEN-06 (prose-token validation — PRIMARY) | — | Post body section ships verbatim content from `src/content/blog/getting-started-with-automation.mdx`; exercises every Phase 28 prose token: H1+H2(×3)+H3+ul(4)+ol(3)+inline-code+code-block+italic+link+hr | tool | `batch_get({ nodeIds: ['<post-body-id>'], readDepth: 4 })` confirms 1 H1 + 3 H2 + 1 H3 + 1 ul + 1 ol + N inline-code spans + 1 code-block + 1 italic span + 1 link + 1 hr; each token-bound | ❌ W0 | ⬜ pending |
| 28-02-05 | 28-02 | 3 | PAGE-03 | — | Section/RelatedPosts instance with 3 full-shape Card instances (first cross-phase consumer test of D-116) | tool | `batch_get({ nodeIds: ['<relatedposts-instance>'], readDepth: 3 })` confirms ref `<relatedposts-id>` + 3 Card child refs (t40xct) | ❌ W0 | ⬜ pending |
| 28-02-06 | 28-02 | 3 | PAGE-03 | — | Blog post Header (G0wNOc) + Footer (Xs0Hs) instances present + Crito-source labels intact | tool | `batch_get({ nodeIds: ['<bp-header-ref>','<bp-footer-ref>'], readDepth: 1 })` confirms ref ids | ❌ W0 | ⬜ pending |
| 28-02-07 | 28-02 | 3 | PAGE-03 | — | Zero raw hex/px on Blog post detail frame (all token-bound — strictest test of new prose token surface) | tool | `search_all_unique_properties({ parentId: '<blog-post-id>' })` returns zero raw hex + zero raw px | ❌ W0 | ⬜ pending |
| 28-02-08 | 28-02 | 3 | PAGE-03, VALID-01, VALID-02 | — | Per-section fidelity labels per D-83; user APPROVE via CALIBRATION-PROTOCOL § 3.4 step 5 AskUserQuestion gate (crito-source-flat-raster — pairs against w1m3x image-import-NN.jpg from Task 28-02-00); prose-paragraph 'provisional' flag verification per D-110 | manual | AskUserQuestion at plan close — user side-by-side compares reconstructed Blog post detail frame against w1m3x raster + spot-checks prose-token rendering across post body | manual | ⬜ pending |
| 28-02-09 | 28-02 | 3 | PAGE-03, VALID-03, PAGE-11 ACTIVE (2/2) | — | **PAGE-11 ACTIVE — `w1m3x` raster hidden via `enabled: false` AFTER user APPROVE only** (third production use of PAGE-11 ACTIVE; second within Phase 28) | tool | `batch_get({ nodeIds: ['w1m3x'], readDepth: 0 })` confirms `enabled: false` after APPROVE; PEN-INVENTORY Frames Inventory `status_counts` updated flat:1 → hidden:1 for 08_Blog Details | ❌ W0 | ⬜ pending |
| 28-02-10 | 28-02 | 3 | PAGE-03 | — | Plan-close snapshot_layout clean | tool | `snapshot_layout({ parentId: '<blog-post-id>', problemsOnly: true })` returns `"No layout problems."` (text-clipping false-positives expected to exceed Phase 27 due to multi-paragraph post body prose per Pitfall 5 — known benign) | ✅ baseline | ⬜ pending |
| 28-03-01 | 28-03 | 4 | PAGE-03 | — | Pre-flight active-editor assertion (D-125) | tool | `mcp__pencil__get_editor_state({ include_schema: false })` | ✅ baseline | ⬜ pending |
| 28-03-02 | 28-03 | 4 | PAGE-03 | — | `Tag` frame placed at page-frame row via FindEmptySpace nodeId anchor (Blog post detail frame from Plan 28-02) | tool | `batch_get({ nodeIds: ['<tag-page-id>'], readDepth: 1 })` confirms y ≈ -4111 | ❌ W0 | ⬜ pending |
| 28-03-03 | 28-03 | 4 | PAGE-03 | — | Page-intro section: 'Posts tagged "automation"' heading (representative content per D-122 Claude's Discretion) + post count subhead (STUB per D-83 mixed-fidelity) + sibling note documenting dynamic generation pattern | tool | `batch_get({ nodeIds: ['<tag-intro-id>'], readDepth: 2 })` confirms text node content + sibling note exists | ❌ W0 | ⬜ pending |
| 28-03-04 | 28-03 | 4 | PAGE-03 | — | Section/TagFilter instance: current-tag pill ('automation') marked active + remaining pills inactive (different active-pill index from Blog index Plan 28-01 — validates D-117 descendants override flexibility) | tool | `batch_get({ nodeIds: ['<tag-tagfilter-instance>'], readDepth: 3 })` confirms different active-pill index than Plan 28-01 instance | ❌ W0 | ⬜ pending |
| 28-03-05 | 28-03 | 4 | PAGE-03 | — | 6 Card instances in 3-col × 2-row grid (filtered to representative 'automation' tag posts; same composition as Blog index per D-114) | tool | `batch_get({ nodeIds: ['<tag-grid-id>'], readDepth: 3 })` confirms 6 Card refs (t40xct) | ❌ W0 | ⬜ pending |
| 28-03-06 | 28-03 | 4 | PAGE-03 | — | Tag page Header (G0wNOc) + Footer (Xs0Hs) instances present | tool | `batch_get({ nodeIds: ['<tag-header-ref>','<tag-footer-ref>'], readDepth: 1 })` | ❌ W0 | ⬜ pending |
| 28-03-07 | 28-03 | 4 | PAGE-03 | — | Zero raw hex/px on Tag page frame (all token-bound) | tool | `search_all_unique_properties({ parentId: '<tag-page-id>' })` returns zero raw hex + zero raw px | ❌ W0 | ⬜ pending |
| 28-03-08 | 28-03 | 4 | PAGE-03, VALID-01, VALID-02 | — | Per-section fidelity labels per D-83; user APPROVE via CALIBRATION-PROTOCOL § 4.5 AskUserQuestion gate (joel-only token-usage format — pairs against `_Tokens & Foundations` RpGbe); PAGE-11 INERT per § 4.3 (no Crito source raster to hide) | manual | AskUserQuestion at plan close — user spot-checks token-usage vs RpGbe for page-intro + TagFilter + Card grid sections | manual | ⬜ pending |
| 28-03-09 | 28-03 | 4 | PAGE-03 | — | Plan-close snapshot_layout clean | tool | `snapshot_layout({ parentId: '<tag-page-id>', problemsOnly: true })` returns `"No layout problems."` | ✅ baseline | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

> "Wave 0" in this Pencil-MCP-only phase means: items the planner must ensure exist BEFORE the Pencil-mutating tasks fire. Pencil MCP is already installed and authenticated (Phase 23-27 confirmed). No test framework installation needed.

- [ ] Pencil MCP server reachable (verify via `mcp__pencil__get_editor_state({ include_schema: false })` returns activeEditor)
- [ ] Active editor == `design/Crito.pen` (D-125 carry-forward — Plan 28-NN first task asserts this)
- [ ] `.planning/research/exports/v2.0/end-of-phase-27/id-inventory.json` exists (Plan 28-00 reads this to know baseline IDs — Phase 23/24/25/26/27 ID set)
- [ ] No structural-edit conflicts with Phase 25/26/27 component baseline IDs (avgor, g9oRa5, t67DU6, RpGbe, nwJk7, vGH3A, oTSwn, FGdti, eNqxd, M7eUr, hIWuC, u7NmaS, G0wNOc, Xs0Hs, t40xct, Hs5rc, csXky, n0QqTd, Badge primitive ID TBC at Plan 28-00 Task 0)

---

## Manual-Only Verifications

> Calibration spot-check gates per CALIBRATION-PROTOCOL.md are inherently manual — they exist BECAUSE design fidelity cannot be reduced to a binary tool check.

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Blog index crito-source-flat-raster per-section fidelity labels accurate | PAGE-03, VALID-01, VALID-02 | Side-by-side comparison reconstructed-frame vs DzqTm raster (image-import-NN.jpg probed at Task 28-01-00) requires human judgment per CALIBRATION-PROTOCOL § 3.1; AskUserQuestion gate at Plan 28-01 close per § 3.4 step 5 | At Plan 28-01 close, structured AskUserQuestion presenting fidelity proposals for: page-intro, Section/TagFilter strip, 6-Card grid (representative card spot-check), Header (EXACT carry-forward), Footer (EXACT carry-forward). User picks APPROVE / REVISE / GAP per § 3.4 step 6. |
| Blog post detail crito-source-flat-raster per-section fidelity labels accurate + prose-token rendering | PAGE-03, VALID-01, VALID-02, TOKEN-06, prose-paragraph 'provisional' flag verification (D-110) | Side-by-side comparison reconstructed-frame vs w1m3x raster + prose-token visual validation requires human judgment per CALIBRATION-PROTOCOL § 3.1; AskUserQuestion gate at Plan 28-02 close per § 3.4 step 5 | At Plan 28-02 close, structured AskUserQuestion presenting fidelity proposals for: post header (title + metadata + tag row + featured-image), post body (prose-token validation primary — heading-3/-4 interpolation, prose-link, inline-code, code-block, prose-list), Section/RelatedPosts, Header (EXACT carry-forward), Footer (EXACT carry-forward). User picks APPROVE / REVISE / GAP. Also confirms whether prose-paragraph 'provisional' flag can be removed per D-110. |
| Tag page joel-only-no-crito-ref per-section fidelity labels accurate | PAGE-03, VALID-01 | Token-usage check vs `_Tokens & Foundations` (RpGbe) requires human judgment per CALIBRATION-PROTOCOL § 4.1; AskUserQuestion gate at Plan 28-03 close per § 4.5 | At Plan 28-03 close, structured AskUserQuestion presenting fidelity proposals for: page-intro (representative content STUB-acceptable), Section/TagFilter (active state — different active-pill index than Blog index), 6-Card grid, Header (EXACT carry-forward), Footer (EXACT carry-forward). User picks APPROVE / REVISE / GAP per § 4.5. |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending

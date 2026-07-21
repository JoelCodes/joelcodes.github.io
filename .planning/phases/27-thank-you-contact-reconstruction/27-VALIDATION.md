---
phase: 27
slug: thank-you-contact-reconstruction
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-06-07
---

# Phase 27 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
>
> **v2.0 special case — Pencil-MCP-only phase.** Phase 27 mutates `design/Crito.pen` exclusively (zero `src/` changes per CONTEXT D-88 carry-forward + PROJECT.md v2.0 milestone scope). The "validation framework" is **Pencil MCP introspection** (`get_editor_state` / `batch_get` / `snapshot_layout` / `search_all_unique_properties` / `get_variables`) — NOT Playwright / axe / jest / build. There is no rendered HTML surface to assert against in v2.0. Test commands below are Pencil MCP tool invocations, not shell commands.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Pencil MCP introspection (Pencil 2.13+) |
| **Config file** | none — Pencil MCP server runs in-process; active editor required = `design/Crito.pen` (D-103 enforces pre-flight assertion before every mutation) |
| **Quick run command** | `mcp__pencil__snapshot_layout({ maxDepth: 0, problemsOnly: true })` — document-root layout sanity check |
| **Full suite command** | Per-plan close: `get_editor_state` → `batch_get(baseline IDs)` → `snapshot_layout(per-frame)` → `search_all_unique_properties(scoped)` → `get_variables({})` (token-surface drift check) |
| **Estimated runtime** | < 5 seconds per command (Pencil MCP is in-process) |

---

## Sampling Rate

- **After every Pencil-mutating `batch_design` call:** Run `snapshot_layout({ parentId: <mutated-node>, problemsOnly: true })` immediately
- **After every plan-internal task that creates new nodes:** Run `batch_get({ nodeIds: [<created-nodes>], readDepth: 1 })` to confirm IDs intact
- **At every plan close:** Run the Full suite command above (per-plan close sweep documented in Phase 24/25/26 plan-close discipline)
- **Before `/gsd:verify-work`:** All Phase 27 plan-close sweeps must show `"No layout problems."` at document root (per-frame text-clipping false-positives per Phase 24 carry-forward quirk are documented in 27-NN-SUMMARY.md, NOT mitigated)
- **Max feedback latency:** < 5 seconds (Pencil MCP in-process)

---

## Per-Task Verification Map

> Task IDs use the convention `{phase}-{plan}-{task}` matching planner output. Task list is preliminary — planner will refine in 27-NN-PLAN.md. Phase 27 ships 3 plans per CONTEXT D-101: 27-00 (foundation), 27-01 (Thank-you joel-only), 27-02 (Contact crito-source flat-raster).

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 27-00-01 | 27-00 | 1 | PAGE-05, PAGE-06 (foundation for) | — | Pre-flight active-editor assertion before any mutation (D-103) | tool | `mcp__pencil__get_editor_state({ include_schema: false })` returns `activeEditor.fileName == "Crito.pen"` | ✅ baseline | ⬜ pending |
| 27-00-02 | 27-00 | 1 | PAGE-06 (form foundation) | — | Primitive/Input label-slot extension preserves existing instances (no Phase 24/25/26 instance breakage) | tool | `batch_get({ nodeIds: ['nwJk7','TnODC','qPSVW'], readDepth: 1 })` returns 3 nodes with `oCeJP` (or replacement) intact | ✅ baseline | ⬜ pending |
| 27-00-03 | 27-00 | 1 | PAGE-06 (form foundation) | — | Primitive/Input/Textarea variant added without raw hex/px leakage | tool | `search_all_unique_properties({ parentId: '<textarea-id>' })` returns zero raw hex + zero raw px (all token-bound) | ❌ W0 | ⬜ pending |
| 27-00-04 | 27-00 | 1 | PAGE-06 (form foundation) | — | Primitive/Select Default/Focus/Error trinity added; chevron Icon is lucide-native Pattern A | tool | `batch_get({ nodeIds: ['<select-default>','<select-focus>','<select-error>'], readDepth: 2 })` confirms chevron-down via lucide library reference | ❌ W0 | ⬜ pending |
| 27-00-05 | 27-00 | 1 | PAGE-06 (form foundation) | — | Primitive/Checkbox Default/Focus/Error trinity added | tool | `batch_get({ nodeIds: ['<checkbox-default>','<checkbox-focus>','<checkbox-error>'], readDepth: 2 })` + zero raw hex/px sweep | ❌ W0 | ⬜ pending |
| 27-00-06 | 27-00 | 1 | PAGE-06 (form foundation) | — | Compound/CheckboxGroup added with legend + options + helper slots | tool | `batch_get({ nodeIds: ['<checkboxgroup-id>'], readDepth: 2 })` confirms 3-slot signature + sibling slot-signature Pencil note | ❌ W0 | ⬜ pending |
| 27-00-07 | 27-00 | 1 | — | — | Zero token-surface drift (Phase 26 ended at 100 tokens; Phase 27 ships zero new tokens per D-89/D-91 reusing `color-semantic-text-error`) | tool | `get_variables({})` returns 100 tokens (same count before + after Plan 27-00) | ✅ baseline | ⬜ pending |
| 27-00-08 | 27-00 | 1 | PAGE-05, PAGE-06 (compositional foundation) | — | Document-root snapshot_layout clean after foundation work | tool | `snapshot_layout({ maxDepth: 0, problemsOnly: true })` returns `"No layout problems."` | ✅ baseline | ⬜ pending |
| 27-01-01 | 27-01 | 2 | PAGE-05 | — | Pre-flight active-editor assertion (D-103) | tool | `mcp__pencil__get_editor_state({ include_schema: false })` returns Crito.pen | ✅ baseline | ⬜ pending |
| 27-01-02 | 27-01 | 2 | PAGE-05 | — | Thank-you frame placed at page-frame row via FindEmptySpace nodeId anchor (CALIBRATION-PROTOCOL § 10.4) | tool | `batch_get({ nodeIds: ['<thank-you-id>'], readDepth: 1 })` confirms y ≈ -4111 (same row as csXky 404 frame) | ❌ W0 | ⬜ pending |
| 27-01-03 | 27-01 | 2 | PAGE-05 | — | Success-message section composed: Icon/32 + heading-1 + prose-paragraph; lucide circle-check Pattern A | tool | `batch_get({ nodeIds: ['<success-icon>'], readDepth: 2 })` confirms `library: "lucide"` + glyph `circle-check` | ❌ W0 | ⬜ pending |
| 27-01-04 | 27-01 | 2 | PAGE-05 | — | Section/CTA-Calendly instance: ref `Hs5rc` + actions-slot Button with "Skip the wait - book a call" verbatim (D-99) | tool | `batch_get({ nodeIds: ['<calendly-section>'], readDepth: 3 })` confirms ref Hs5rc + actions-slot Button label match | ❌ W0 | ⬜ pending |
| 27-01-05 | 27-01 | 2 | PAGE-05 | — | Calendly sibling Pencil text node documents wiring + v1.3 URL (calendly.com/joelshinness) | tool | `batch_get({ nodeIds: ['<sibling-note>'], readDepth: 1 })` confirms content contains "calendly.com/joelshinness" | ❌ W0 | ⬜ pending |
| 27-01-06 | 27-01 | 2 | PAGE-05 | — | Thank-you frame Header (G0wNOc) + Footer (Xs0Hs) instances present + Crito-source labels intact (D-77 carry-forward) | tool | `batch_get({ nodeIds: ['<thank-you-header-ref>','<thank-you-footer-ref>'], readDepth: 1 })` confirms ref ids | ❌ W0 | ⬜ pending |
| 27-01-07 | 27-01 | 2 | PAGE-05 | — | Zero raw hex/px on Thank-you frame (all token-bound) | tool | `search_all_unique_properties({ parentId: '<thank-you-id>' })` returns zero raw hex + zero raw px | ❌ W0 | ⬜ pending |
| 27-01-08 | 27-01 | 2 | PAGE-05, VALID-01, VALID-02 | — | Per-section fidelity labels per D-83; user APPROVE via CALIBRATION-PROTOCOL § 4.5 AskUserQuestion gate (joel-only branch) | manual | AskUserQuestion at plan close — user spot-checks token-usage vs `_Tokens & Foundations` (RpGbe) | manual | ⬜ pending |
| 27-01-09 | 27-01 | 2 | PAGE-05 | — | Plan-close snapshot_layout clean | tool | `snapshot_layout({ parentId: '<thank-you-id>', problemsOnly: true })` returns `"No layout problems."` (text-clipping false-positives documented per Phase 24 quirk) | ✅ baseline | ⬜ pending |
| 27-02-00 | 27-02 | 3 | PAGE-06 | — | cl8tt image-import-NN.jpg index probed (highest-priority Plan 27-02 deliverable) | tool | `batch_get({ nodeIds: ['cl8tt'], readDepth: 2 })` reveals raster fill image reference; index recorded in 27-02-SUMMARY.md | ❌ W0 | ⬜ pending |
| 27-02-01 | 27-02 | 3 | PAGE-06 | — | Pre-flight active-editor assertion (D-103) | tool | `mcp__pencil__get_editor_state({ include_schema: false })` | ✅ baseline | ⬜ pending |
| 27-02-02 | 27-02 | 3 | PAGE-06 | — | Contact frame placed at page-frame row via FindEmptySpace nodeId anchor (Thank-you frame from 27-01) | tool | `batch_get({ nodeIds: ['<contact-id>'], readDepth: 1 })` confirms y ≈ -4111 | ❌ W0 | ⬜ pending |
| 27-02-03 | 27-02 | 3 | PAGE-06 | — | Page-intro section with v1.3 verbatim microcopy ("Let's Talk" + body) | tool | `batch_get({ nodeIds: ['<page-intro-id>'], readDepth: 2 })` confirms text node content matches v1.3 line 18-22 verbatim | ❌ W0 | ⬜ pending |
| 27-02-04 | 27-02 | 3 | PAGE-06 | T-27-04 | 2-col asymmetric grid: form ≈ 800 + sidebar ≈ 400 + gap; horizontal-layout-frame mechanism | tool | `batch_get({ nodeIds: ['<grid-id>'], readDepth: 2 })` confirms horizontal layout + child widths | ❌ W0 | ⬜ pending |
| 27-02-05 | 27-02 | 3 | PAGE-06 | T-27-05 | 8 form fields all composed entirely from Primitive/Input + Primitive/Select + Compound/CheckboxGroup instances (ROADMAP success criterion 2) | tool | `batch_get({ nodeIds: ['<form-id>'], readDepth: 3 })` confirms 8 children, each is a ref to nwJk7/textarea-id/select-id/checkboxgroup-id (no inlined input markup) | ❌ W0 | ⬜ pending |
| 27-02-06 | 27-02 | 3 | PAGE-06 | — | Required-mark `enabled:true` on Name/Email/Message label slots (per D-97) | tool | `batch_get` on field label slots confirms `required-mark` text node `enabled:true` for required fields, `enabled:false` for optional | ❌ W0 | ⬜ pending |
| 27-02-07 | 27-02 | 3 | PAGE-06 | — | Sidebar Compound/Card instance with v1.3 verbatim title + body + Book a Call button | tool | `batch_get({ nodeIds: ['<sidebar-card>'], readDepth: 3 })` confirms ref t40xct + descendants match v1.3 lines 184-198 | ❌ W0 | ⬜ pending |
| 27-02-08 | 27-02 | 3 | PAGE-06 | — | Sidebar Calendly sibling Pencil text node documents wiring + v1.3 URL (calendly.com/me--juoi/discovery-call) | tool | `batch_get({ nodeIds: ['<sidebar-sibling-note>'], readDepth: 1 })` confirms content contains "calendly.com/me--juoi/discovery-call" | ❌ W0 | ⬜ pending |
| 27-02-09 | 27-02 | 3 | PAGE-06 | — | Contact Header (G0wNOc) + Footer (Xs0Hs) instances present | tool | `batch_get({ nodeIds: ['<contact-header-ref>','<contact-footer-ref>'], readDepth: 1 })` | ❌ W0 | ⬜ pending |
| 27-02-10 | 27-02 | 3 | PAGE-06 | — | Zero raw hex/px on Contact frame (all token-bound) | tool | `search_all_unique_properties({ parentId: '<contact-id>' })` returns zero raw hex + zero raw px | ❌ W0 | ⬜ pending |
| 27-02-11 | 27-02 | 3 | PAGE-06, VALID-01, VALID-02 | — | Per-section fidelity labels per D-83; user APPROVE via CALIBRATION-PROTOCOL § 3.4 step 5 AskUserQuestion gate (crito-source-flat-raster branch) — pairs Contact frame screenshot against the probed image-import-NN.jpg raster | manual | AskUserQuestion at plan close — user side-by-side compares reconstructed Contact frame against cl8tt raster | manual | ⬜ pending |
| 27-02-12 | 27-02 | 3 | PAGE-06, VALID-03 | — | **PAGE-11 ACTIVE — `cl8tt` raster hidden via `enabled: false` AFTER user APPROVE only** (CALIBRATION-PROTOCOL § 3.3 + § 3.4 step 7) | tool | `batch_get({ nodeIds: ['cl8tt'], readDepth: 0 })` confirms `enabled: false` after APPROVE; PEN-INVENTORY Frames Inventory `status_counts` updated flat:1 → hidden:1 | ❌ W0 | ⬜ pending |
| 27-02-13 | 27-02 | 3 | PAGE-06 | — | Plan-close snapshot_layout clean | tool | `snapshot_layout({ parentId: '<contact-id>', problemsOnly: true })` returns `"No layout problems."` | ✅ baseline | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

> "Wave 0" in this Pencil-MCP-only phase means: items the planner must ensure exist BEFORE the Pencil-mutating tasks fire. Pencil MCP is already installed and authenticated (Phase 23-26 confirmed). No test framework installation needed.

- [ ] Pencil MCP server reachable (verify via `mcp__pencil__get_editor_state({ include_schema: false })` returns activeEditor)
- [ ] Active editor == `design/Crito.pen` (D-103 carry-forward — Plan 27-NN first task asserts this)
- [ ] `.planning/research/exports/v2.0/end-of-phase-26/id-inventory.json` exists (Plan 27-00 reads this to know baseline IDs — Phase 23/24/25/26 ID set)
- [ ] No structural-edit conflicts with Phase 25/26 component baseline IDs (avgor, g9oRa5, t67DU6, RpGbe, nwJk7, TnODC, qPSVW, M7eUr, hIWuC, u7NmaS, G0wNOc, Xs0Hs, t40xct, Hs5rc, N1jo3i, b7Hgy, csXky)

---

## Manual-Only Verifications

> Calibration spot-check gates per CALIBRATION-PROTOCOL.md are inherently manual — they exist BECAUSE design fidelity cannot be reduced to a binary tool check.

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Thank-you joel-only per-section fidelity labels accurate | PAGE-05, VALID-01 | Token-usage check vs `_Tokens & Foundations` (RpGbe) requires human judgment per CALIBRATION-PROTOCOL § 4.1; AskUserQuestion gate at Plan 27-01 close per § 4.5 | At Plan 27-01 close, structured AskUserQuestion presenting fidelity proposals for: success-message (EXACT), Section/CTA-Calendly (EXACT), secondary-link (EXACT), Header (EXACT carry-forward), Footer (EXACT carry-forward). User picks APPROVE / REVISE / GAP per § 4.5 options. |
| Contact crito-source-flat-raster per-section fidelity labels accurate | PAGE-06, VALID-01, VALID-02 | Side-by-side comparison reconstructed-frame vs cl8tt raster (image-import-NN.jpg probed at Task 27-02-00) requires human judgment per CALIBRATION-PROTOCOL § 3.1; AskUserQuestion gate at Plan 27-02 close per § 3.4 step 5 | At Plan 27-02 close, structured AskUserQuestion presenting fidelity proposals for: page-intro, form-section (per-field), sidebar-Card, Header (EXACT carry-forward), Footer (EXACT carry-forward). User picks APPROVE / REVISE / GAP per § 3.4 step 6 options. |
| `get_screenshot` stale-cache workaround tiering (OPEN-26-02) | — | If screenshot returns blank-white, Tier-1 = cross-row position Update; Tier-2 = user-side editor verification in Pencil. Per CALIBRATION-PROTOCOL § 4.4 step 9 + § 6.4. Carry-forward from Phase 26. | Plan 27-01 Task and Plan 27-02 Task that produce screenshots include Tier-1 fallback inline; Tier-2 instructs user to verify visually in Pencil editor at calibration gate. |
| cl8tt raster image-import-NN.jpg index identification | PAGE-06 | Pencil MCP returns the index via batch_get; human interprets which file in design/images/ corresponds | Plan 27-02 Task 0: `batch_get({ nodeIds: ['cl8tt'], readDepth: 2 })` returns fill image reference; planner/executor reads the reference + records the matching design/images/image-import-NN.jpg index in 27-02-SUMMARY.md. |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` Pencil MCP tool command OR are marked manual (calibration gates)
- [ ] Sampling continuity: no 3 consecutive tasks without a Pencil MCP tool verification (foundation/composition tasks all gate on batch_get + snapshot_layout)
- [ ] Wave 0 covers all baseline-ID + Pencil-MCP-reachability dependencies
- [ ] No watch-mode flags (Pencil MCP is request/response, not watch)
- [ ] Feedback latency < 5 seconds (Pencil MCP in-process)
- [ ] `nyquist_compliant: true` set in frontmatter after Plan 27-NN ships

**Approval:** pending

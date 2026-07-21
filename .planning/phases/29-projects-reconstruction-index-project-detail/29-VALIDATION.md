---
phase: 29
slug: projects-reconstruction-index-project-detail
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-06-09
---

# Phase 29 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution. See `29-RESEARCH.md` § Validation Architecture for the complete per-plan checkpoint table that informs this validation strategy.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Pencil MCP tool catalogue (no traditional test framework — this is a `.pen` file mutation phase) |
| **Config file** | none — Pencil MCP tools loaded inline by main orchestrator |
| **Quick run command** | `mcp__pencil__snapshot_layout({maxDepth:0, problemsOnly:true})` at document root |
| **Full suite command** | `mcp__pencil__get_variables({})` + `batch_get` on baseline IDs + `snapshot_layout` |
| **Estimated runtime** | ~5 seconds per Pencil MCP call cluster |

---

## Sampling Rate

- **After every Pencil-mutating call:** Pre-flight `get_editor_state(include_schema:false)` asserts active editor == `design/Crito.pen` (D-140 carry-forward)
- **After every task commit:** Plan-execution probes affected node IDs via `batch_get` to confirm structural intent matches batch_design output
- **After every plan close:** Run `snapshot_layout({maxDepth:0, problemsOnly:true})` at document root — must return `"No layout problems."`
- **Before `/gsd:verify-work`:** All 3 plans (29-00 + 29-01 + 29-02) closed with passing layout sweep + token surface verification + PEN-INVENTORY extensions committed
- **Max feedback latency:** ~10 seconds per checkpoint (Pencil MCP round-trip)

---

## Per-Task Verification Map

> **Populated by the planner.** Each Phase 29 plan task gets a row mapping it to a checkpoint from 29-RESEARCH.md § Validation Architecture. The planner writes these task IDs and verification commands once it decomposes the plans into tasks. Per Pencil-MCP convention, verification is structural (batch_get returns expected shape) + behavioral (snapshot_layout returns clean) rather than unit-test-style assertion.

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| TBD by planner | 29-00 | 1 | PAGE-02 | — | Pre-flight active-editor + Compound/ProjectCard structural intact | structural | `mcp__pencil__batch_get(['<new-projectcard-id>'], readDepth:3)` | ✅ | ⬜ pending |
| TBD by planner | 29-00 | 1 | PAGE-02 | — | Section/ResultsMetrics structural intact | structural | `mcp__pencil__batch_get(['<new-resultsmetrics-id>'], readDepth:3)` | ✅ | ⬜ pending |
| TBD by planner | 29-00 | 1 | PAGE-02 | — | Section/RelatedProjects structural intact | structural | `mcp__pencil__batch_get(['<new-relatedprojects-id>'], readDepth:3)` | ✅ | ⬜ pending |
| TBD by planner | 29-01 | 1 | PAGE-02 | — | Projects frame composed; Y2isa reclassified | structural | `mcp__pencil__batch_get(['<projects-frame-id>'], readDepth:3)` | ✅ | ⬜ pending |
| TBD by planner | 29-01 | 1 | PAGE-02 | — | PAGE-11 ACTIVE on Y2isa (post-APPROVE only) | behavioral | `mcp__pencil__batch_get(['Y2isa'], readDepth:1)` returns `enabled:false` | ✅ | ⬜ pending |
| TBD by planner | 29-02 | 1 | PAGE-02 | — | Project frame composed; cYlRH reclassified | structural | `mcp__pencil__batch_get(['<project-frame-id>'], readDepth:3)` | ✅ | ⬜ pending |
| TBD by planner | 29-02 | 1 | PAGE-02 | — | PAGE-11 ACTIVE on cYlRH (post-APPROVE only) | behavioral | `mcp__pencil__batch_get(['cYlRH'], readDepth:1)` returns `enabled:false` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [x] Existing infrastructure covers all phase requirements — Pencil MCP tool catalogue is production-proven through Phase 23-28; no new test framework or fixture setup needed for this `.pen`-file-only phase

*Existing infrastructure (Pencil MCP) covers all phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Plan 29-01 calibration gate (dual pairing per D-130) | PAGE-02, VALID-01, VALID-02 | Visual fidelity per § 3.4 crito-source-flat-raster — Y2isa raster + image-import-12.jpg pairing | User reviews inline `get_screenshot` of Projects frame + Y2isa image-import-NN.jpg + image-import-12.jpg Project-card lower-2x2-grid alignment. APPROVE / REVISE / GAP decision recorded; on APPROVE → `Update("Y2isa", {enabled:false})` |
| Plan 29-02 calibration gate (single pairing per § 3.4) | PAGE-02, VALID-01, VALID-02 | Visual fidelity per § 3.4 crito-source-flat-raster — cYlRH raster pairing | User reviews inline `get_screenshot` of Project frame + cYlRH image-import-NN.jpg pairing. APPROVE / REVISE / GAP decision recorded; on APPROVE → `Update("cYlRH", {enabled:false})` |
| Per-section fidelity label confirmation | VALID-01 | Per-section EXACT / APPROXIMATE / STUB classification per D-83 | User confirms or revises section-level fidelity labels at calibration gate |
| OPEN-29-NN gap declaration | VALID-03 | Documenting Screenshots / Testimonial / Built With deferrals per D-136 — not silently filled | PEN-INVENTORY `## Open Flags — Phase 29` section gets explicit OPEN-29-NN rows for each deferred section + plan-surfaced flags |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify (structural batch_get + behavioral snapshot_layout) or Wave 0 dependencies — populated by planner
- [ ] Sampling continuity: every plan task is verified by a checkpoint from 29-RESEARCH.md § Validation Architecture
- [ ] Wave 0 covers all MISSING references — existing Pencil MCP infrastructure covers all needs
- [ ] No watch-mode flags — Pencil MCP is request/response not watch-mode
- [ ] Feedback latency < 10s per checkpoint (Pencil MCP round-trip)
- [ ] `nyquist_compliant: true` set in frontmatter — set after planner populates per-task verification map
- [ ] Subagent caveat documented — all Phase 29 plans MUST execute INLINE by main orchestrator (Pencil MCP tools NOT inherited by spawned subagents per Plan 28-00 + Plan 27-00 carry-forward)

**Approval:** pending (planner populates per-task map at Plan 29-00 / 29-01 / 29-02 wave)

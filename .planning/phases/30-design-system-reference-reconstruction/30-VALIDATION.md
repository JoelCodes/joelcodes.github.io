---
phase: 30
slug: design-system-reference-reconstruction
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-06-09
---

# Phase 30 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> **Adapted for v2.0 milestone realities** — `.pen`-file-only phase; zero `src/` code changes per PROJECT.md + REQUIREMENTS.md Out of Scope. Traditional test framework / src-coverage / CI dimensions ABSENT; structural Pencil MCP verification + user spot-check calibration replace them per 30-RESEARCH.md § Validation Architecture.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Pencil MCP toolchain (`mcp__pencil__*`) — Pencil schema 2.13 |
| **Config file** | none — Pencil MCP server is the entire toolchain |
| **Quick run command** | `mcp__pencil__get_editor_state({ include_schema: false })` + `mcp__pencil__snapshot_layout({ maxDepth: 0, problemsOnly: true })` (per-task) |
| **Full suite command** | `mcp__pencil__batch_get({ nodeIds: [...baseline...] })` + `mcp__pencil__get_variables({})` + `mcp__pencil__snapshot_layout({ maxDepth: 0, problemsOnly: true })` (per-plan close) |
| **Estimated runtime** | ~5-15 seconds per task; ~30-60 seconds per plan close |

---

## Sampling Rate

- **After every task commit:** Pre-flight `get_editor_state` + post-mutation `batch_get` on touched nodeIds + per-frame `snapshot_layout({ problemsOnly: true })`.
- **After every plan wave:** N/A — Phase 30 has no waves (D-151 sequential 2-plan structure).
- **Before `/gsd:verify-work`:** Plan 30-01 single calibration AskUserQuestion (joel-only branch § 4.5) must APPROVE; PEN-INVENTORY in-place reclassification of line 77 placeholder must complete post-APPROVE.
- **Max feedback latency:** ~60 seconds (per-plan close validation cycle).

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 30-00-00 | 30-00 | seq | PAGE-07 | — | Pre-flight active-editor assertion (D-153) | structural | `mcp__pencil__get_editor_state({include_schema:false})` | ✅ | ⬜ pending |
| 30-00-01 | 30-00 | seq | PAGE-07 / COMP-08 | — | Section/TokenSwatchGrid lives in g9oRa5 with declared slot signature | structural | `mcp__pencil__batch_get({nodeIds:["<TokenSwatchGrid>"], readDepth:2})` | ✅ | ⬜ pending |
| 30-00-02 | 30-00 | seq | PAGE-07 / COMP-08 | — | Section/TypeSpecimen lives in g9oRa5 with declared slot signature | structural | `mcp__pencil__batch_get({nodeIds:["<TypeSpecimen>"], readDepth:2})` | ✅ | ⬜ pending |
| 30-00-03 | 30-00 | seq | PAGE-07 / COMP-08 | — | Section/ComponentShowcase lives in g9oRa5 with code-snippet-slot per D-150 | structural | `mcp__pencil__batch_get({nodeIds:["<ComponentShowcase>"], readDepth:3})` | ✅ | ⬜ pending |
| 30-00-04 | 30-00 | seq | VALID-03 | — | Sibling Pencil notes ship with slot signatures (D-149 belt-and-suspenders) | structural | `mcp__pencil__batch_get({nodeIds:["<3 sibling notes>"], readDepth:1})` | ✅ | ⬜ pending |
| 30-00-05 | 30-00 | seq | TOKEN-* | — | Token surface drift expected 0 net-new (default per D-151) | structural | `mcp__pencil__get_variables({})` — count match | ✅ | ⬜ pending |
| 30-00-06 | 30-00 | seq | LAYOUT-01 | — | Document root `snapshot_layout` returns "No layout problems." | structural | `mcp__pencil__snapshot_layout({maxDepth:0, problemsOnly:true})` | ✅ | ⬜ pending |
| 30-00-07 | 30-00 | seq | AUDIT-03 | — | PEN-INVENTORY extension committed (new rows + Variant Evidence + OPEN-30-NN seed) | structural | `test -f .planning/research/PEN-INVENTORY.md && grep -q "TokenSwatchGrid" .planning/research/PEN-INVENTORY.md` | ✅ | ⬜ pending |
| 30-01-00 | 30-01 | seq | PAGE-07 | — | Pre-flight active-editor assertion (D-153) | structural | `mcp__pencil__get_editor_state({include_schema:false})` | ✅ | ⬜ pending |
| 30-01-01 | 30-01 | seq | PAGE-07 | — | RpGbe sub-grouping probed for token-gallery alignment (Q1 resolution) | structural | `mcp__pencil__batch_get({nodeIds:["RpGbe"], readDepth:3})` | ✅ | ⬜ pending |
| 30-01-02 | 30-01 | seq | PAGE-07 / LAYOUT-01 | — | `Design system` page frame created at 1440 width via `find_empty_space_on_canvas` nodeId:s5k41l anchor (§ 10.4) | structural | `mcp__pencil__batch_get({nodeIds:["<designSystemFrame>"], readDepth:1})` returns width=1440 | ✅ | ⬜ pending |
| 30-01-03 | 30-01 | seq | COMP-05 | — | Section/Header instance at top of page frame (no override per D-77) | structural | `mcp__pencil__batch_get({nodeIds:["<HeaderInstance>"]})` returns component=G0wNOc | ✅ | ⬜ pending |
| 30-01-04 | 30-01 | seq | PAGE-07 | — | page-intro section ships v1.3 verbatim per D-143 + 2 sibling Pencil notes (noindex + JSON endpoint) | structural | `mcp__pencil__batch_get({nodeIds:["<pageIntro>"], readDepth:3})` returns expected text content | ✅ | ⬜ pending |
| 30-01-05 | 30-01 | seq | PAGE-07 / TOKEN-02 | — | Colors section: 4 Section/TokenSwatchGrid instances (Primary Accent / Text / Neutral / Usage Guidelines) | structural | `mcp__pencil__batch_get({nodeIds:["<ColorsSection>"], readDepth:3})` returns 4 TokenSwatchGrid refs | ✅ | ⬜ pending |
| 30-01-06 | 30-01 | seq | PAGE-07 / TOKEN-03 / TOKEN-06 | — | Typography section: Family / Type Scale / Weights / Line Heights as TypeSpecimen / inline tables | structural | `mcp__pencil__batch_get({nodeIds:["<TypographySection>"], readDepth:3})` returns expected sub-section structure | ✅ | ⬜ pending |
| 30-01-07 | 30-01 | seq | PAGE-07 / COMP-01..07 | — | Components section: Primitives → Compounds → Sections; ~16 ComponentShowcase instances per D-148 | structural | `mcp__pencil__batch_get({nodeIds:["<ComponentsSection>"], readDepth:3})` returns 16 ComponentShowcase refs | ✅ | ⬜ pending |
| 30-01-08 | 30-01 | seq | PAGE-07 | — | Utilities section: 3 sub-sections (iso-shadow APPROXIMATE + iso-glow STUB + iso-rotate STUB per Q3 res) + sibling CSS notes | structural | `mcp__pencil__batch_get({nodeIds:["<UtilitiesSection>"], readDepth:3})` returns 3 sub-sections + 3 sibling notes | ✅ | ⬜ pending |
| 30-01-09 | 30-01 | seq | COMP-06 | — | Section/Footer instance at bottom (no override per D-77) | structural | `mcp__pencil__batch_get({nodeIds:["<FooterInstance>"]})` returns component=Xs0Hs | ✅ | ⬜ pending |
| 30-01-10 | 30-01 | seq | LAYOUT-01 | — | `snapshot_layout({ maxDepth: 0, problemsOnly: true })` returns "No layout problems." at doc root (text-clipping false-positives documented per Pitfall 6) | structural | `mcp__pencil__snapshot_layout({maxDepth:0, problemsOnly:true})` | ✅ | ⬜ pending |
| 30-01-11 | 30-01 | seq | PAGE-09 | — | page-frame fit_content settle + zero-mutation diff on Phase 23-29 baseline IDs (regression Dim 3) | structural | `mcp__pencil__batch_get({nodeIds:[...baseline 25+ ids...]})` returns unchanged | ✅ | ⬜ pending |
| 30-01-12 | 30-01 | seq | VALID-02 | — | Per-section `get_screenshot` (Tier-1 stale-cache mitigation; Tier-2 user-editor fallback ready per § 6.4) | manual+structural | `mcp__pencil__get_screenshot({nodeId:"<section>"})` inline render | ⚠️ pending Tier-2 fallback | ⬜ pending |
| 30-01-13 | 30-01 | seq | VALID-01 / VALID-02 | — | Plan-close calibration AskUserQuestion (joel-only branch § 4.5 format) — single gate covering all 5 sections + token-usage check against RpGbe | manual | AskUserQuestion APPROVE — user spot-check confirms semantic-token bindings | ✅ | ⬜ pending |
| 30-01-14 | 30-01 | seq | AUDIT-03 / PAGE-11 | — | On APPROVE: PEN-INVENTORY in-place reclassification of line 77 placeholder (joel-only Design System → reconstructed `Design system` frame); PAGE-11 INERT documented | structural | `grep -q "Design system" .planning/research/PEN-INVENTORY.md && grep -v "joel-only: Design System" .planning/research/PEN-INVENTORY.md` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] No traditional test infrastructure required — Phase 30 is `.pen`-file-only (no src/ code changes per PROJECT.md + REQUIREMENTS.md Out of Scope).
- [ ] Pencil MCP server must be available and connected to `design/Crito.pen` (D-153 pre-flight gate enforces; Hard Block #1 per .planning/research/SUMMARY.md).
- [ ] `mcp__pencil__get_editor_state({ include_schema: false })` returns `activeEditor.file == "design/Crito.pen"` at every plan start.
- [ ] Baseline IDs from Phase 23-29 reconstructed components + page frames available via `batch_get` (verified at Plan 30-00 Task 0 + Plan 30-01 Task 0).
- [ ] CALIBRATION-PROTOCOL.md § 4 joel-only branch protocol available (read at every plan).
- [ ] Tier-2 stale-cache fallback path documented per § 6.4 (pre-committed for ~58-instance density).

*Phase 30 has no Wave 0 install task — the "framework" is the Pencil MCP server already configured for the project.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual fidelity of `Design system` page frame vs `_Tokens & Foundations` RpGbe (token-usage check) | VALID-02 (branch-redefined per § 4.1) | Joel-only branch calibration is a semantic-token-usage check, not a side-by-side raster comparison; requires human visual judgment of whether the token bindings render correctly | At Plan 30-01 close: AskUserQuestion per § 4.5 — user reviews per-section fidelity label proposals + token-usage description + inline screenshots (or Tier-2 in-editor verification); selects APPROVE / REVISE / GAP |
| Per-section fidelity labels (EXACT / APPROXIMATE / STUB per D-83) | VALID-01 | Fidelity is contextual; user confirms or adjusts at calibration gate (CONTEXT proposes; user is authoritative) | Plan 30-01 calibration AskUserQuestion description proposes labels per section; user confirms in APPROVE option text |
| Utilities section iso-shadow approximation read | D-144 / Q3 resolution | Whether the offset-shape approximation reads cleanly or misleadingly depends on user judgment | Plan 30-01 Task 7: ship APPROXIMATE; calibration gate validates; re-label to STUB if user finds approximation misleading |
| Tier-2 stale-cache fallback trigger at calibration gate | § 6.4 / OPEN-26-02 | If Tier-1 cross-row Update doesn't clear render cache for a subtree, user verifies in actual Pencil editor at canvas coordinates instead of inline screenshot | Plan 30-01 Task 12: attempt `get_screenshot`; if blank-white, apply Tier-1 Update; if still blank, fall back to Tier-2 instruction to user pointing at editor coordinates |

---

## Validation Sign-Off

- [ ] All tasks have structural `<automated>` Pencil MCP verify OR are flagged manual (Tier-2 fallback / calibration spot-check)
- [ ] Sampling continuity: pre-flight `get_editor_state` + post-mutation `batch_get` is run after EVERY mutating task (D-153 chain)
- [ ] Wave 0 covers all MISSING references — N/A (no traditional test framework; Pencil MCP is the framework)
- [ ] No watch-mode flags — N/A (Pencil MCP is event-driven, not polling)
- [ ] Feedback latency < 60s for plan-close validation cycle
- [ ] `nyquist_compliant: true` set in frontmatter once all task statuses turn green
- [ ] Plan 30-01 single calibration AskUserQuestion APPROVED before phase close
- [ ] PEN-INVENTORY in-place reclassification of line 77 placeholder committed
- [ ] OPEN-30-NN section seeded for any plan-surfaced flags (Utilities STUB labels + possible new tokens + possible prose-code-block 'provisional' concerns)

**Approval:** pending

---

## Notes on Nyquist Dimensions for Phase 30

Phase 30 is `.pen`-file-only — NO `src/` code changes, NO traditional test framework. The Nyquist validation dimensions adapt:

- **Dimension 1 (correctness):** structural Pencil MCP verification per Per-Task Verification Map above (`batch_get` post-mutation; `get_variables` count drift; `snapshot_layout` at plan close)
- **Dimension 2 (visual fidelity):** user spot-check at Plan 30-01 calibration gate per § 4.5 joel-only branch format (token-usage check against RpGbe)
- **Dimension 3 (regression):** Phase 23-29 reconstructed components + page frames must NOT mutate — verified via baseline `batch_get` at every plan close (Per-Task task 30-01-11)
- **Dimensions 4-7 (performance / security / accessibility / scaling):** ABSENT — Phase 30 ships zero code. Performance, security, WCAG accessibility, scaling concerns are code-milestone deliverables. Sibling Pencil notes preserve the v1.3 noindex robots meta + `/design-system.json` endpoint intent for code-milestone wiring (D-143).
- **Dimension 8 (edge cases):** stale-cache `get_screenshot` quirk per § 6.4 Tier-2 fallback (HIGH likelihood on ~58-instance page frame); multi-section text-clipping false-positive per Pitfall 6; active-editor switch mid-plan halt via D-153 pre-flight.

This adaptation is consistent with Phase 26-29 VALIDATION.md precedent (if those phases produced VALIDATION.md; if not, Phase 30 establishes the v2.0-adapted Nyquist pattern for Phase 31 + 32 to inherit).

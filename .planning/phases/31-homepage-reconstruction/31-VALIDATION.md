---
phase: 31
slug: homepage-reconstruction
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-06-11
---

# Phase 31 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution. **.pen-only design phase** — Dimension 8 maps to Pencil MCP structural + visual checks per CALIBRATION-PROTOCOL § 3.4 + § 4.4 + § 4.5, NOT to a code test framework. RESEARCH.md § "Validation Architecture (Nyquist Dimension 8)" is the prescriptive contract; this file pins it to the executor.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Pencil MCP (`mcp__pencil__*` tools — design/Crito.pen mutation surface) |
| **Config file** | none — Pencil MCP server runtime + `.planning/research/CALIBRATION-PROTOCOL.md` (definition-of-done framework) |
| **Quick run command** | `mcp__pencil__get_editor_state({ include_schema: false })` + `mcp__pencil__get_variables({})` + `mcp__pencil__batch_get({ nodeIds: [...] })` |
| **Full suite command** | `mcp__pencil__snapshot_layout({ maxDepth: 0, problemsOnly: true })` + per-frame `snapshot_layout({ parentId: <id>, problemsOnly: true })` + § 3.4/§ 4.5 calibration AskUserQuestion gate |
| **Estimated runtime** | ~30–60s per plan close (incl. screenshot capture + stale-cache fallback per § 6.4) |

---

## Sampling Rate

- **After every task commit:** `get_editor_state` pre-flight assertion (D-166) + targeted `batch_get` on touched node IDs
- **After every plan wave:** `get_variables` token-surface drift check (default 0 net-new per D-164) + `batch_get` baseline regression on 21 component IDs + 9 page-frame IDs
- **Before `/gsd:verify-work`:** `snapshot_layout({ maxDepth: 0, problemsOnly: true })` returns `"No layout problems."` + Plan 31-01 single calibration AskUserQuestion APPROVED (D-155 HYBRID joel-only-with-Hero-pairing-exception)
- **Max feedback latency:** ~60s (stale-cache Tier-1 retry); ~5min (Tier-2 user-editor verification fallback per § 6.4 — Phase 26-30 production-proven)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 31-00-T0 | 00 | 1 | PAGE-01 | — | N/A (.pen design — no security surface) | content-extract | Manual extraction from `src/components/{Hero,Services,Process,About,homepage/ContactSection,layout/Header}.astro` per CONTEXT D-157/D-158/D-159/D-160/D-161/D-162/D-163; output in 31-00-SUMMARY.md | ✅ | ⬜ pending |
| 31-00-T1 | 00 | 1 | PAGE-01 | — | N/A | probe | `batch_get({ nodeIds: ["G0wNOc"], readDepth: 3 })` + identify nav-item child IDs + decide Path B vs Path C per RESEARCH § Focus 2 | ✅ | ⬜ pending |
| 31-00-T2 | 00 | 1 | PAGE-01 | — | N/A | probe | `batch_get({ nodeIds: ["hIWuC"], readDepth: 3 })` + identify stroke-bearing node + label text-child IDs per RESEARCH § Focus 3 + OPEN-25-01 carve-out | ✅ | ⬜ pending |
| 31-00-T3 | 00 | 1 | PAGE-01 | — | N/A | probe | `batch_get({ nodeIds: ["ujMLJ"], readDepth: 3 })` + per-ID role assignment for `0veF5 / Wx9kx / 7QsZc / HuBKK / LqPtn / ggx3v` + Hero illustration leaf node ID for LOCK-note parent target per RESEARCH § Focus 4 | ✅ | ⬜ pending |
| 31-01-T1 | 01 | 1 | PAGE-01 | — | N/A | mutate | `get_editor_state` pre-flight + `find_empty_space_on_canvas({ nodeId: "a0gRv" })` per § 10.4 + `batch_design` Create Homepage page-frame (1440 width, vertical layout, gap 0, alignItems center, fit_content height) per CONTEXT D-164 Plan 31-01 | ✅ | ⬜ pending |
| 31-01-T2 | 01 | 1 | PAGE-01 | — | N/A | mutate | `batch_design` Insert Section/Header (G0wNOc) ref-instance into Homepage; descendants override per D-162 (HIDE Home/About/Services + REPLACE one slot text with "Projects" per Path B from 31-00-T1) + sibling note re logo slot per D-163 | ✅ | ⬜ pending |
| 31-01-T3 | 01 | 1 | PAGE-01 | — | N/A | mutate | `batch_design` inline Hero composition per D-157: display heading (PJS 70 / heading-1) + subtitle (Inter 18 / body-sm) + dual CTAs (Button/Default M7eUr + Button/Secondary hIWuC with white-stroke white-label descendants override per OPEN-25-01) + decorative coral ellipse + Hero illustration STUB | ✅ | ⬜ pending |
| 31-01-T4 | 01 | 1 | PAGE-01 | — | N/A | mutate | `batch_design` inline Services composition per D-158: section H2 + 3-up Compound/Card (t40xct) grid with descendants overrides (image STUB / title / body / footer-actions Button) | ✅ | ⬜ pending |
| 31-01-T5 | 01 | 1 | PAGE-01 | — | N/A | mutate | `batch_design` inline Process composition per D-159: section H2 + 5-step vertical timeline (number + title + body); illustrations STUB | ✅ | ⬜ pending |
| 31-01-T6 | 01 | 1 | PAGE-01 | — | N/A | mutate | `batch_design` inline About composition per D-160: 2-column horizontal-layout (headshot STUB left + H2 + bio + Primary CTA right) | ✅ | ⬜ pending |
| 31-01-T7 | 01 | 1 | PAGE-01 | — | N/A | mutate | `batch_design` Insert Section/CTA (Hs5rc) ref-instance per D-161 with descendants overrides for headline + body + actions Primary Button → /contact; sibling note re v1.3 ContactSection on-homepage architecture | ✅ | ⬜ pending |
| 31-01-T8 | 01 | 1 | PAGE-01 | — | N/A | mutate | `batch_design` Insert Section/Footer (Xs0Hs) ref-instance — no override per D-77 | ✅ | ⬜ pending |
| 31-01-T9 | 01 | 1 | PAGE-01 | — | N/A | verify | `snapshot_layout({ maxDepth: 0, problemsOnly: true })` returns `"No layout problems."` + per-frame snapshot of Homepage; text-clipping false-positives documented BENIGN per Pitfall 6 | ✅ | ⬜ pending |
| 31-01-T10 | 01 | 1 | PAGE-01 | — | N/A | calibration | Single AskUserQuestion at close per D-155 HYBRID — § 4.5 joel-only token-usage description for all 7 sections + § 3.4 step 4 Hero side-by-side inline image pair (reconstructed Hero `get_screenshot` + ujMLJ Hero subtree `get_screenshot`) | ✅ | ⬜ pending (user gate) |
| 31-01-T11 | 01 | 1 | PAGE-01 | — | N/A | post-APPROVE | On APPROVE → `batch_design` add sibling Pencil note on ujMLJ Hero illustration's DIRECT PARENT per § 3.3 sub-section-raster sub-rule (raster stays enabled:true; LOCK semantic only); raster NEVER hidden | ✅ | ⬜ pending |
| 31-01-T12 | 01 | 1 | PAGE-01 | — | N/A | doc | PEN-INVENTORY extensions per D-167: NEW `Homepage` row + UPDATE `Home Page` (ujMLJ) line 65 status_counts (factored:8, partial:1, locked:1) + Variant Evidence rows + OPEN-31-NN section + OPEN-25-01 RESOLVED + OPEN-23-09 RESOLVED | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `.planning/phases/31-homepage-reconstruction/31-00-PLAN.md` (foundation probe plan — content extraction + 3 probes)
- [ ] `.planning/phases/31-homepage-reconstruction/31-01-PLAN.md` (page-frame composition + calibration gate)
- [ ] Pencil MCP server reachable (`get_editor_state` returns activeEditor)
- [ ] `design/Crito.pen` is the active editor at every mutating task per D-166

*Existing infrastructure (Phase 23-30 component library + token surface + CALIBRATION-PROTOCOL.md + PEN-INVENTORY.md + RESEARCH.md) covers all Phase 31 requirements. No code framework install needed (.pen-only milestone scope per PROJECT.md).*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Calibration spot-check (D-155 HYBRID single AskUserQuestion) | VALID-02 / PAGE-01 (highest scrutiny per ROADMAP success criterion 4) | Per-section fidelity proposals + Hero side-by-side require Joel visual judgment vs `_Tokens & Foundations` RpGbe (joel-only token-usage check) + ujMLJ Hero subtree (crito-source visual pairing) | Plan 31-01 T10 gate: review inline-rendered images + token-usage description; APPROVE / REVISE / GAP per CALIBRATION-PROTOCOL § 3.4 step 6 + § 4.5 step 9 |
| Header descendants-override Path B/C decision | PAGE-01 (D-162 + OPEN-30-07 ref-composition constraint) | Path B (HIDE + REPLACE one slot text with "Projects") vs Path C (`descendants.<navContainer>.children` whole-replacement) selected at Plan 31-00 T1 based on G0wNOc actual child structure | T1 probe outcome documented in 31-00-SUMMARY.md; Plan 31-01 T2 wires the selected path |
| Hero illustration leaf-node selection for LOCK-note parent target | PAGE-11 (D-155 + § 3.3 sub-section-raster sub-rule) | Sibling note attaches to DIRECT PARENT of Hero illustration raster, NOT ujMLJ root — leaf node ID identified at Plan 31-00 T3 | T3 probe outcome documented in 31-00-SUMMARY.md; Plan 31-01 T11 post-APPROVE attaches note to selected parent |
| Hero arrow-right iconTrailing wire-up | PAGE-01 (Phase 25 D-44 carry-forward + OPEN-30-07 fallback) | Phase 25 D-44 insert-at-path pattern blocked by OPEN-30-07; fallback to `descendants.<actionsContainer>.children` whole-replacement may be needed | Plan 31-01 T3 Hero CTA composition probes both paths; selects working one at execution time |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify (Pencil MCP probe / batch_get / snapshot_layout) OR explicit manual-only gate listed above
- [ ] Sampling continuity: pre-flight `get_editor_state` precedes every mutating task per D-166; no 3 consecutive mutations without active-editor assertion
- [ ] Wave 0 covers all MISSING references (Plan 31-00 + 31-01 PLAN.md files created)
- [ ] No watch-mode flags (.pen design phase — no test runner)
- [ ] Feedback latency < 60s (Tier-1 stale-cache retry path) / < 5min (Tier-2 user-editor verification per § 6.4)
- [ ] `nyquist_compliant: true` set in frontmatter (after Plan 31-01 calibration APPROVE + PEN-INVENTORY extensions committed)

**Approval:** pending (target: 2026-06-11 after Plan 31-01 calibration APPROVE)

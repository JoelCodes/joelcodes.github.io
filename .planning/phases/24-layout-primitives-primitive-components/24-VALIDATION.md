---
phase: 24
slug: layout-primitives-primitive-components
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-31
---

# Phase 24 — Validation Strategy

> Per-phase validation contract for `.pen`-only structural completeness. No runtime tests — validation is artifact presence + structural completeness + token-binding integrity via Pencil MCP read tools.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Pencil MCP read tools (`batch_get`, `snapshot_layout`, `get_variables`, `get_editor_state`) + Claude-side property walker (OPEN-23-02 workaround) + grep over PEN-INVENTORY.md |
| **Config file** | none — Pencil MCP is the runtime; no install step |
| **Quick run command** | `mcp__pencil__snapshot_layout({ rootId: "<primitive-frame-id>", problemsOnly: true })` per-primitive |
| **Full suite command** | Recursive `batch_get(readDepth: 4)` over `_Components / Primitives` + property-walker → cross-ref PEN-INVENTORY.md; covered by plan 24-05 sweep |
| **Estimated runtime** | ~30 seconds for full sweep (Pencil MCP batch_get is the dominant cost) |

---

## Sampling Rate

- **After every plan completes (24-01..24-04):** Run `snapshot_layout({ rootId, problemsOnly: true })` on the primitive(s) that plan created/touched.
- **After plan 24-05 (sweep):** Run the full Claude-side property walker over `_Components / Primitives` and cross-ref against PEN-INVENTORY.md `## Tokens Written — Primitives` + `## Token Extensions (Phase 24)` + `## Variant Evidence (Phase 24)`.
- **Before `/gsd:verify-work`:** All 8 VAL-24-* assertions must pass; reference set archived; `id-inventory.json` written for `end-of-phase-24/`.
- **Max feedback latency:** ~30 seconds per primitive (snapshot_layout); ~2 min for full sweep.

---

## Per-Task Verification Map

| Validation ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| VAL-24-01 | 24-01 | 1 | LAYOUT-01, COMP-08 (frame placement) | — | Four parent library frames at top of canvas; 15 baseline page frames unmutated | structural | `batch_get(readDepth: 1)` at document root → assert exactly 19 top-level frames; regex-match new frame names | ❌ W0 | ⬜ pending |
| VAL-24-02 | 24-02, 24-03, 24-04 | 2-3 | COMP-01, COMP-02, COMP-03, COMP-04 | — | Primitives present; variant matrices justified by source-evidence rows in PEN-INVENTORY.md `## Variant Evidence (Phase 24)` | structural | `batch_get` of `_Components / Primitives` (readDepth: 2) → assert child names match `Primitive / {Button,Input,Badge,Icon}`; grep PEN-INVENTORY.md for every variant cell | ❌ W0 | ⬜ pending |
| VAL-24-03 | 24-02, 24-03, 24-04 | 2-3 | LAYOUT-01, LAYOUT-02 | — | Every primitive uses auto-layout (flex/grid); padding + gap reference `space-primitive-*` literal values (dual-track per OPEN-23-13) | structural | Property walker: assert every primitive frame has `layout` property set; assert every padding/gap value matches a `space-primitive-*` literal from PEN-INVENTORY.md | ❌ W0 | ⬜ pending |
| VAL-24-04 | 24-05 | 4 | COMP-08, COMP-09 | — | Zero raw color hex + zero raw px spacing inside any primitive; every literal value resolves to a documented token or audit-trail binding row | structural | Claude-side recursive property walker (OPEN-23-02 substitute) over `_Components / Primitives` → cross-ref every literal against PEN-INVENTORY.md `## Tokens Written` + `## Token Extensions (Phase 24)` + `## Variant Evidence (Phase 24)` | ❌ W0 | ⬜ pending |
| VAL-24-05 | 24-05 | 4 | — (Success Criterion 5) | — | `snapshot_layout(problemsOnly: true)` returns "No layout problems." on every primitive parent + every variant cell | structural | `mcp__pencil__snapshot_layout({ rootId: <each-primitive-id>, problemsOnly: true })` × N primitives | ❌ W0 | ⬜ pending |
| VAL-24-06 | 24-01..24-04 | 1-3 | — (D-35 boundary) | T-23-T4 carry-forward | Every plan that calls `set_variables` or `batch_design` first asserts active editor path == `design/Crito.pen` | boundary | Grep each `24-NN-SUMMARY.md` for `get_editor_state` pre-flight result before any mutation batch; assert zero recorded mismatches | ❌ W0 | ⬜ pending |
| VAL-24-07 | 24-02, 24-03 | 2-3 | — (D-33 audit-trail) | — | If `get_variables({})` returns > 95 vars at end of Phase 24, every new token has a row in `## Token Extensions (Phase 24)` with frame_id + node_id + rationale | structural | `get_variables({})` → diff against Phase 23's 95-token surface → cross-ref each new token against PEN-INVENTORY.md `## Token Extensions (Phase 24)` rows | ❌ W0 | ⬜ pending |
| VAL-24-08 | 24-05 | 4 | — (OPEN-23-01 substitution) | — | `end-of-phase-24/id-inventory.json` exists with every primitive id + variant cell ids + glyph atom ids + slot ids; `get_screenshot` reference set captured and reviewed inline | structural | `test -f .planning/research/exports/v2.0/end-of-phase-24/id-inventory.json` + grep 24-05 SUMMARY.md for inline screenshot review | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `.planning/research/PEN-INVENTORY.md § "Variant Evidence (Phase 24)"` — empty table scaffolded by plan 24-02's first task (header row + schema cited in D-23)
- [ ] `.planning/research/PEN-INVENTORY.md § "Token Extensions (Phase 24)"` — empty table scaffolded by plan 24-03's first task (header row + schema cited in D-33)
- [ ] `.planning/research/PEN-INVENTORY.md § "Open Flags"` — extended with `OPEN-24-NN` section per D-22 / D-24 / D-28 / D-31
- [ ] No framework install — Pencil MCP is the runtime; STACK.md confirms 9-tool surface available

*If none: "Existing infrastructure covers all phase requirements."* — N/A: Phase 24 introduces two new audit-trail tables that must be scaffolded before plan 24-02 runs.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual fidelity of each primitive against Crito source frame | — (Success Criterion 5 user-review gate, PITFALLS C6 carry-forward) | No pixel-diff baseline yet (calibration starts Phase 26); structural tests + token-binding integrity cover the wire-level correctness, but a human eye is the second-look reviewer for "does this look like Crito" | Plan 24-05 captures `get_screenshot` per primitive parent; user opens each in the Pencil editor (or reviews the inline screenshot result) and confirms it matches the corresponding Crito source frame cited in `## Variant Evidence (Phase 24)` |
| Empty-slot auto-collapse behavior (D-30 assumption) | COMP-01 (Button icon slots) | Pencil schema 2.13 may default `enabled: true` (implicit collapse) or require `enabled: false` (explicit). Plan 24-02 probe-task answers this empirically by inserting a label-only Button and observing the result; user confirms the slot-collapse behavior matches expectations before plan 24-02 proceeds | Plan 24-02 first probe task captures a `get_screenshot` of a label-only Button; user confirms no visible empty-slot gap before plan 24-02 builds the variant matrix |
| Component-shape probe result (Q1: `frame` with marker vs distinct `component` type) | COMP-08 (semantic-token-only references) | Pencil 2.13 schema is documented at slot/token level but not at component-vs-frame declaration level; plan 24-02 first probe task creates a single test component and inspects its post-insert shape via `batch_get` | Plan 24-02 documents the discovered shape in 24-02-SUMMARY.md `## Pencil Schema Probe Results` before building the variant matrix |
| Icon-mechanism probe result (Q4: Pencil-native `library: "lucide"` vs D-25 atomic-glyph fallback) | COMP-04 (Icon sizes) | Pencil guidelines `## 3. Icons` document `library: "lucide"` but Phase 23 didn't exercise this path; plan 24-04 first task probes it with one test glyph | Plan 24-04 documents Pattern A (native) vs Pattern B (atomic-glyph fallback per D-25) in 24-04-SUMMARY.md `## Icon Mechanism Probe Result` before building the glyph set |

---

## Validation Sign-Off

- [ ] All VAL-24-* tasks have a documented `automated_command` or are explicitly flagged as Manual-Only
- [ ] Sampling continuity: every plan (24-01..24-05) has at least one structural assertion before its summary is written
- [ ] Wave 0 audit-trail tables scaffolded in PEN-INVENTORY.md before plan 24-02 starts
- [ ] No watch-mode flags (N/A — no code tests)
- [ ] Feedback latency < 60s per primitive (snapshot_layout dominates)
- [ ] `nyquist_compliant: true` set in frontmatter only after all 8 VAL-24-* assertions are green
- [ ] User confirmed visual reference set per VAL-24-05 manual gate

**Approval:** pending

---

## Nyquist Dimension Coverage

| Dimension | Applies | Phase 24 Coverage |
|---|---|---|
| 1. Behavioral / functional | NO | No code runs |
| 2. State transitions | NO | Variant states are static cells, not transitions |
| 3. Data integrity | PARTIAL | 95-token surface integrity + D-33 token extensions covered by VAL-24-07 |
| 4. Concurrency | NO | Single-threaded plan execution |
| 5. Error / boundary | PARTIAL | D-35 active-editor pre-flight (VAL-24-06) + Pencil schema probe failures |
| 6. Performance | NO | No runtime perf concern |
| 7. Accessibility / a11y | NO | Code-milestone concern |
| **8. Structural completeness** | **PRIMARY** | Every Success Criterion 1-5 → VAL-24-01..05 |
| 9. Visual / pixel fidelity | PARTIAL | `get_screenshot` reference set archived (VAL-24-08); no pixel-diff baseline until Phase 26 |
| 10. Cross-system integration | NO | No external system |

---

*Derived from `24-RESEARCH.md § Validation Architecture` (lines 568–646) — see RESEARCH.md for rationale per VAL-24-* assertion.*

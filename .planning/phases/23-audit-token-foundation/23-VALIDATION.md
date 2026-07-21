---
phase: 23
slug: audit-token-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-31
---

# Phase 23 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
>
> Phase 23 is `.pen`-only — no code runs, no behavioral tests. Validation is **artifact presence + structural completeness**. Sampling is end-state (after plan 23-05), not per-task.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — manual + Pencil MCP queries (`get_variables`, `batch_get`, `snapshot_layout`, `get_screenshot`) |
| **Config file** | none — no test runner needed for `.pen`-only phase |
| **Quick run command** | `bash .planning/phases/23-audit-token-foundation/scripts/validate-quick.sh` (Wave 0 may install; otherwise inline checks) |
| **Full suite command** | `bash .planning/phases/23-audit-token-foundation/scripts/validate-full.sh` (Wave 0 may install) |
| **Estimated runtime** | ~30 seconds (Pencil MCP calls are the long pole) |

---

## Sampling Rate

- **After every task commit:** N/A — Phase 23 tasks are sequential and validation is end-state. The coverage-checkpoint pause (after 23-01) is the only per-plan gate.
- **After every plan wave:** N/A — single-wave phase.
- **Before `/gsd:verify-work`:** All 5 VAL-23-* checks below must PASS (artifact present + schema complete).
- **Max feedback latency:** ~30s (single Pencil round-trip per VAL check).

---

## Nyquist Dimension Coverage

| Dimension | Applies | Covered By |
|-----------|---------|------------|
| 1. Behavioral / functional | NO | No code runs. |
| 2. State transitions | NO | No state machine. |
| 3. Data integrity | PARTIAL | Subsumed by Dim 8 (structural completeness of the `.pen`). |
| 4. Concurrency | NO | Single-threaded execution. |
| 5. Error / boundary | PARTIAL | Coverage-checkpoint PAUSE logic verified by VAL-23-01. |
| 6. Performance | NO | No runtime perf concern. |
| 7. Accessibility / a11y | NO | No rendered DOM. |
| **8. Structural completeness** | **PRIMARY** | VAL-23-01 through VAL-23-05 — all map 1:1 to ROADMAP Success Criteria. |
| 9. Visual / pixel fidelity | PARTIAL | VAL-23-03 archives screenshot; pixel-diff calibration starts Phase 26. |
| 10. Cross-system integration | NO | No external system. |

---

## Per-Task Verification Map

> Phase 23's verification is **end-state structural**, not per-task. The map below assigns each VAL-23-N to the plan that produced the artifact it checks.

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| VAL-23-01 | 23-01 | 1 | AUDIT-01, AUDIT-02, AUDIT-03 | — | N/A | structural | inline grep + field-presence check on `PEN-INVENTORY.md` | ❌ W0 | ⬜ pending |
| VAL-23-02 | 23-03, 23-04 | 1 | TOKEN-01, TOKEN-02, TOKEN-03, TOKEN-04, TOKEN-05, TOKEN-06, TOKEN-07 | — | N/A | structural | `get_variables({})` + regex check on names | ❌ W0 | ⬜ pending |
| VAL-23-03 | 23-05 | 1 | TOKEN-08 | — | N/A | structural | `batch_get` reference frame + `snapshot_layout` + `get_screenshot` exists | ❌ W0 | ⬜ pending |
| VAL-23-04 | 23-03, 23-04 | 1 | AUDIT-01 (provenance), TOKEN-01..07 | — | N/A | structural | grep `PEN-INVENTORY.md ## Tokens Written` for `source:` field | ❌ W0 | ⬜ pending |
| VAL-23-05 | (all) | 1 | — (zero-mutation invariant) | — | N/A | structural | before/after `get_screenshot` per Crito frame + `batch_get` node-id set diff | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## VAL-23-01: PEN-INVENTORY.md exists with required schema

Maps to **Success Criterion 1** (ROADMAP.md).

- [ ] File exists at `.planning/research/PEN-INVENTORY.md`.
- [ ] Entry count matches `get_editor_state` top-level frame count (expected ≈15 per v1.4-research/ARCHITECTURE.md).
- [ ] Every entry has all 8 fields from CONTEXT D-17 populated (`frame_name`, `frame_id`, `scope`, `joel_page_map`, `child_section_count`, `status_counts`, `reconstruction_priority`, `open_flag_ids`). Zero `TBD` / `???` placeholders.
- [ ] Every `scope` value is one of: `IN-SCOPE` / `IN-SCOPE token-mining-only` / `OUT-OF-SCOPE` / `joel-only-no-crito-ref`.
- [ ] Every IN-SCOPE entry has `child_section_count > 0` and `status_counts` summing to that count.
- [ ] OPEN flags follow D-10 schema (`id`, `category`, `severity`, `description`, `blocker-for-phase`).
- [ ] `## Coverage Checkpoint` section is present and resolves PASS or documents PAUSE-with-user-approval.

---

## VAL-23-02: Two-tier token surface

Maps to **Success Criterion 2**.

- [ ] `get_variables({})` returns tokens covering all four categories (color, typography, spacing, radii).
- [ ] Every token name matches flat-dash convention. Regex: `^(color|space|type|radius)-(primitive|semantic)-[a-z0-9-]+$`. No `/`, no `.`.
- [ ] Every component-facing semantic token (Tier 2) listed in TOKEN-02 through TOKEN-06 is present.
- [ ] Zero tokens carry `@light,@dark` or any per-theme suffix (D-01 dark-mode omission).
- [ ] Primitive count ≤ ~2x unique-property count from 23-01 audit (drift sanity check).
- [ ] Every semantic alias resolves to a primitive value (Pencil aliasing OR `description`-field fallback per ARCHITECTURE.md).

---

## VAL-23-03: `_Tokens & Foundations` reference frame

Maps to **Success Criterion 3**.

- [ ] `batch_get` returns a frame named `_Tokens & Foundations` near top of canvas.
- [ ] Frame contains: one swatch node per color token, one specimen per typography token, one stripe per spacing token, one rectangle per radius token.
- [ ] `snapshot_layout({ problemsOnly: true })` returns zero clipping / overlap issues for the reference frame.
- [ ] Screenshot archived at `.planning/research/exports/v2.0/tokens-foundations-23.png` (per CONTEXT D-19).
- [ ] Screenshot fits one viewport (height ≤ ~4000px; readable at single-page zoom).
- [ ] Dark-mode omission note present in the frame (per CONTEXT D-02).

---

## VAL-23-04: Source-evidence traceability

Maps to **Success Criterion 4**.

- [ ] Every token value in `PEN-INVENTORY.md` `## Tokens Written` log has a `source` field with one of: `search_all_unique_properties` / `Crito .fig` / `OPEN flag`.
- [ ] Zero tokens cite raster JPG or any `design/images/image-import-*.jpg` source (PITFALLS F3 — no eyedropping).
- [ ] Every OPEN flag has a `blocker-for-phase` value (`none` acceptable for non-blockers).

---

## VAL-23-05: Zero visual mutation to Crito frames

Maps to **Success Criterion 5**.

- [ ] For each of the ≈15 Crito top-level frames, `get_screenshot` at end of phase matches start of phase (visual diff is the validation method; user is second-look reviewer per PITFALLS C6).
- [ ] `batch_get` on each Crito frame returns the same child-node id set as at start of phase (no nodes added, removed, or renamed inside existing frames).
- [ ] The only NEW top-level frame on canvas is `_Tokens & Foundations` (per plan 23-05).

---

## Wave 0 Requirements

- [ ] `.planning/phases/23-audit-token-foundation/scripts/validate-quick.sh` — fast structural checks against PEN-INVENTORY.md (grep-based; runs without Pencil MCP)
- [ ] `.planning/phases/23-audit-token-foundation/scripts/validate-full.sh` — full structural + Pencil MCP checks (requires live Pencil session)
- [ ] Baseline `get_screenshot` per Crito frame captured BEFORE plan 23-01 starts; stored under `.planning/research/exports/v2.0/baseline-23/` for the VAL-23-05 zero-mutation diff
- [ ] No test framework install — `.pen`-only phase

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Reference-frame visual readability | TOKEN-08 (success criterion 3) | Pixel-diff calibration starts Phase 26; here, "verifiable in one screenshot" is a human-eye judgement | Open `tokens-foundations-23.png` at 100% zoom; confirm every swatch is labelled, every type specimen shows family + size + weight, spacing scale stripes are visually distinguishable |
| Crito frames look identical pre/post phase | Success Criterion 5 | Visual diff requires human pattern-match across ≈15 frames | Step through baseline screenshots vs end-of-phase screenshots side-by-side; flag any visible delta |
| Coverage-checkpoint judgement call | CONTEXT D-05 | "Thin coverage" is Claude's judgement, surfaced to user; not a fixed threshold | Reviewer reads `## Coverage Checkpoint` section of PEN-INVENTORY.md and either approves continuation to 23-03 or pauses for user input |

---

## Validation Sign-Off

- [ ] All tasks have inline structural checks OR Wave 0 dependencies declared
- [ ] Sampling continuity: end-state is acceptable here (single-wave `.pen` phase)
- [ ] Wave 0 covers baseline-screenshot capture (required for VAL-23-05)
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter once Wave 0 scripts land

**Approval:** pending

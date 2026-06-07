---
phase: 26-faq-404-reconstruction-calibration-workflow-established
plan: 03
status: complete
date: 2026-06-07
---

# Plan 26-03 Summary: CALIBRATION-PROTOCOL.md (codify-what-worked)

Plan 26-03 is **autonomous** (no user gate per D-86) and **doc-only**. Produces 4 new deliverables + 2 edits + ROADMAP updates + 26-03-SUMMARY.md (this file). All artifacts shipped without Pencil `.pen` mutations except the Task 0 + Task 3 pre-flight reads.

## Task 0: Pre-flight (read-only) — D-87 habit

`mcp__pencil__get_editor_state({ include_schema: false })` confirmed:
- Active editor `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/design/Crito.pen` ✓
- Top-level nodes: **21** ✓ (was 19 at Phase 25 close; +2 from FAQ + 404 page-frame reconstructions in Plans 26-01 + 26-02)
- Reusable components: **14** ✓ (Phase 25 + Phase 26-00 additions: Hs5rc Section/CTA + N1jo3i Section/NavBack)
- Plan 26-01 + Plan 26-02 user APPROVAL state confirmed via SUMMARY files; per-section fidelity labels per D-83 documented; PAGE-11 INERT note in PEN-INVENTORY from Plan 26-02 Task 6; OPEN-26-01 + OPEN-26-02 carry-forward documented.

No mutations issued in Task 0.

## Task 1: `.planning/research/CALIBRATION-PROTOCOL.md` (308 lines, 10 sections, 82 key-token matches)

Drafted from Plan 26-01 + 26-02 actuals per D-67 (codify-what-worked, not theory). 10 sections covering:

1. **Purpose + Scope** — codify the per-section calibration workflow; durable record of practice.
2. **Branch Decision Tree** — Frame scope as authoritative branch driver (PEN-INVENTORY's `scope` column).
3. **crito-source-present branch protocol** — VALID-02 = side-by-side; PAGE-11 ACTIVE; fidelity definitions per D-63 crito-source column; per-step script (8 steps).
4. **joel-only-no-crito-ref branch protocol** — VALID-02 = token-usage check against `_Tokens & Foundations` `RpGbe`; PAGE-11 INERT; fidelity definitions per D-63 joel-only column; per-step script (12 steps, codified from Plans 26-01 + 26-02 actuals); AskUserQuestion format template.
5. **VALID-01 Per-Section Labels** (D-83 reading) — fidelity attaches to sections, not whole pages; mixed-fidelity pages are honest; LAYOUT/TEXT split allowed for STUB content with EXACT layout.
6. **VALID-02 Calibration Artifact Substitution** (OPEN-23-01) — inline-only screenshot pattern; D-64 description identifiers (NOT writable paths); OPEN-26-02 stale-cache workaround tiering.
7. **VALID-03 Gap Declaration Template** — OPEN-flag format; re-pointing allowed (OPEN-23-11 → Phase 28 example); Phase 26 examples (OPEN-26-01 + OPEN-26-02).
8. **Cross-Cutting Constraints** — PAGE-09 desktop-only; PAGE-11 applicability; D-87 pre-flight; D-88 PEN-INVENTORY extension pattern; single-file strategy.
9. **Per-Page Phase Consumer Map** — per-page branch table for Phases 26-31; 04_About / 05_Service / 06_Service Details called out as token-mining-only (NOT reconstructed in v2.0).
10. **Codify-What-Worked — Phase 26 Retrospective** — 8 patterns extracted from Plans 26-01 + 26-02 actuals (Section component additions, heading-2 source-derivation, single calibration gate, FindEmptySpace `nodeId` anchor, PAGE-11 INERT carve-out, OPEN-26-02 workaround tiering, pure-ref instance, fit_content + clip pattern).

**Verification:**
- `wc -l` → 308 lines (well above 200 minimum per must_haves) ✓
- `grep -cE "EXACT|APPROXIMATE|STUB|joel-only|crito-source|PAGE-11|PAGE-09|OPEN-flag|get_screenshot|AskUserQuestion"` → 82 matches ≥ 10 (1 per token, all required tokens present) ✓

## Task 2: PEN-INVENTORY `## Calibration Protocol` anchor (1-2 sentence cross-reference per D-69)

Added immediately after the Frames Inventory PAGE-11 INERT block (Plan 26-02 contribution). Content:

> The per-section calibration workflow for every v2.0 per-page reconstruction phase (26 onward) is codified at `.planning/research/CALIBRATION-PROTOCOL.md`. It has two branches — `crito-source-present` and `joel-only-no-crito-ref` — selected via this PEN-INVENTORY's Frames Inventory `scope` column. Established by Phase 26 Plan 26-03; inherited by Phases 27/28/29/30/31. PAGE-11 (raster-removal) applies ONLY to the crito-source branch; the joel-only branch's PAGE-11 status is INERT (no raster exists to remove — see also the PAGE-11 INERT note above from Plan 26-02).

Length: 1 paragraph (4 sentences); positioned at PEN-INVENTORY's natural lookup point — right after the scope column that drives the branch decision. Satisfies D-69 (short anchor, not duplicate of CALIBRATION-PROTOCOL.md).

## Task 3: End-of-phase-26 structural snapshot

### `.planning/research/exports/v2.0/end-of-phase-26/id-inventory.json`

Mirrors `end-of-phase-25/id-inventory.json` schema field-by-field with Phase 26 extensions. Top-level keys (delta from Phase 25 schema):

- `phase` / `captured_at` / `predecessor` / `successor` / `active_editor` / `pencil_schema_version` — updated for Phase 26 context.
- `library_parents` — `_Components / Sections` (g9oRa5) annotated with Phase 26 extension note (Section/CTA + Section/NavBack additions).
- `primitives_phase_24` — carried forward (drift verification).
- `phase_25_additions` — carried forward (drift verification).
- **`phase_26_additions` (NEW)** — Section/CTA `Hs5rc` (3 slots + sibling note) + Section/NavBack `N1jo3i` (2 slots + 4 plain text children + sibling note) + FAQ page-frame `b7Hgy` (5 children + per-section fidelity outcomes) + 404 page-frame `csXky` (4 children + per-section fidelity outcomes + PAGE-11 INERT status).
- **`tokens_added_phase_26` (NEW)** — heading-2 4-part composite + size-32 primitive; OPEN-26-01 rationale; provisional flag drops for `type-semantic-prose-paragraph-*`.
- `validation_outcomes` — VAL-26-01..17 PASS attestations.
- `phase_25_baseline_drift_verification` — 35 expected-unchanged baseline IDs + mutations breakdown.
- `snapshot_layout_compliance` — document-level PASS at every plan close; text-clipping false-positive carry-forward note.
- `open_flag_summary` — seeded (OPEN-26-01, OPEN-26-02) + phase_23 status changes (OPEN-23-10 PARTIALLY RESOLVED, OPEN-23-11 PHASE 26 DECLINED) + provisional flag drops (prose-paragraph) + carry-forward to Phase 27+.
- `token_surface_count` — 95 → 100 (5 Phase 26 additions).
- **`calibration_protocol_established` (NEW)** — CALIBRATION-PROTOCOL.md location + anchor + inherited-by list + branch matrix + per-page consumer map.
- `files_modified_summary_phase_26` — high-level diff summary.
- `phase_26_close_status` — COMPLETE attestation.
- `next_phase` — pointer to Phase 27.

**Verification:**
- `python3 -m json.tool` parses without error (valid JSON) ✓
- `grep -cE "G0wNOc|Xs0Hs|t40xct|avgor|t67DU6|g9oRa5|RpGbe|b7Hgy|csXky|Hs5rc|N1jo3i"` → 22 hits (all 11 key IDs each appearing in multiple references) ✓

### `.planning/research/exports/v2.0/end-of-phase-26/README.md`

Sibling README mirrors Phase 25 format. Explains:
- Snapshot purpose: Phase 27 pre-flight baseline + zero-mutation diff target per OPEN-23-01 substitution.
- Schema delta from Phase 25 (3 new top-level keys: `phase_26_additions`, `tokens_added_phase_26`, `calibration_protocol_established`).
- How Phase 27+ should read the snapshot (6-step lookup pattern).
- Phase 27 pre-flight checklist (`get_editor_state` + `batch_get` baseline IDs + `get_variables` count).
- Cross-references to Phase 23/24/25 archives + Phase 26 plan SUMMARYs + PEN-INVENTORY sections + CALIBRATION-PROTOCOL.md.
- Highlights for Phase 27 readers (6 patterns extracted from Phase 26 practice).

## Task 4: ROADMAP.md plan close marks + Phase 26 close + "Last updated" refresh

Step 1: Plan 26-03 checkbox marked `[x]`.

Step 2: Progress table Phase 26 row updated:
- Before: `| 26. FAQ + 404 Reconstruction | v2.0 | 3/4 | In Progress|  |`
- After: `| 26. FAQ + 404 Reconstruction | v2.0 | 4/4 | Complete | 2026-06-07 |`

Step 3: Bottom-of-file "Last updated" line refreshed to 2026-06-07 with Phase 26 close note.

Step 4: No user gate at plan close per D-86 (autonomous markdown deliverable).

## Codify-What-Worked Retrospective (Section 10 of CALIBRATION-PROTOCOL.md restated)

The 8 patterns Phase 27+ should replicate:

1. **Section/CTA + Section/NavBack as Phase 26 additions to g9oRa5** — pattern for surfacing new section component needs from per-page phases.
2. **heading-2 source-derivation via AskUserQuestion gate** — pattern for token decisions when source is blocked (Plan 26-00 Task 1).
3. **Single calibration gate per plan; multiple sections in one description** — Plan 26-01 + 26-02 carry-forward of Phase 25 pattern; gives user the whole composition in one decision.
4. **FindEmptySpace `nodeId` anchor pattern** (Plan 26-02 contribution) — pass `nodeId: <previous-reconstructed-page-id>` as default placement protocol; ensures consistent page-frame-row anchoring.
5. **PAGE-11 INERT carve-out for joel-only branch** — cleanest single-line rule of the protocol; Plan 26-02 Task 6 added the PEN-INVENTORY note verbatim.
6. **OPEN-26-02 stale-cache workaround tiering** — Tier-1 cross-row Update + Tier-2 user-editor fallback codified in CALIBRATION-PROTOCOL.md § 4.4 + § 6.4.
7. **Pure-ref instance pattern** (Plan 26-02 contribution) — when a section component's defaults match consumer needs, instance without overrides (Section/NavBack inside 404).
8. **fit_content height + placeholder clear for page frames** (Plan 26-02 contribution) — ship with `placeholder: true` + fixed height during build; clear placeholder + switch to fit_content at the snapshot/screenshot task.

## VAL Outcomes (Phase 26 final)

- **PAGE-04** ✓ — FAQ frame reconstructed as token-driven composition (Plan 26-01).
- **PAGE-08** ✓ — 404 frame reconstructed (Plan 26-02).
- **PAGE-09** ✓ — Both pages desktop-only at 1440 width; constraint repeated in CALIBRATION-PROTOCOL.md § 8.
- **PAGE-11** ✓ — INERT for both joel-only pages per PEN-INVENTORY Plan 26-02 note + CALIBRATION-PROTOCOL.md § 4.3; ACTIVE branch defined for Phase 27-31 crito-source consumers.
- **VALID-01** ✓ — Per-section fidelity labels per D-83 recorded for all 9 sections across FAQ + 404 (5 + 4); 3-tier vocabulary (EXACT / APPROXIMATE / STUB) sufficient.
- **VALID-02** ✓ — Calibration artifacts via AskUserQuestion gates at Plan 26-01 Task 6 + Plan 26-02 Task 5 (Tier-2 fallback for 404 per OPEN-26-02); both APPROVED.
- **VALID-03** ✓ — OPEN-26-01 + OPEN-26-02 gaps declared per CALIBRATION-PROTOCOL.md § 7 template; OPEN-23-11 re-pointed to Phase 28 per D-70/D-73.

## Files Modified

- `.planning/research/CALIBRATION-PROTOCOL.md` (**NEW** — 308 lines, 10 sections — Task 1).
- `.planning/research/PEN-INVENTORY.md` (`## Calibration Protocol` anchor section added — Task 2).
- `.planning/research/exports/v2.0/end-of-phase-26/id-inventory.json` (**NEW** — Phase 26 structural snapshot — Task 3).
- `.planning/research/exports/v2.0/end-of-phase-26/README.md` (**NEW** — sibling schema documentation — Task 3).
- `.planning/ROADMAP.md` (plan 26-03 checkbox `[x]` + Progress table Phase 26 → Complete + Last updated refresh — Task 4).
- `.planning/phases/26-faq-404-reconstruction-calibration-workflow-established/26-03-SUMMARY.md` (this file — Task 4).

No `design/Crito.pen` mutations in Plan 26-03. Task 0 + Task 3 pre-flight reads (`get_editor_state`) are pure verification.

## Phase 26 Close Summary

Phase 26 (FAQ + 404 Reconstruction; Calibration Workflow Established) is **COMPLETE** with all 4 plans shipped:
- **Plan 26-00** — Foundation: `type-semantic-heading-2-*` 4-part composite + `type-primitive-size-32` primitive + Section/CTA + Section/NavBack inside g9oRa5. Token surface 95 → 100.
- **Plan 26-01** — FAQ page-frame reconstruction with 5 sections (Header + page-intro + qa-list with 5 verbatim Q+A + Section/CTA + Footer); calibration APPROVED.
- **Plan 26-02** — 404 page-frame reconstruction with 4 sections (Header + message-section with STUB content + Section/NavBack pure-ref instance + Footer); calibration APPROVED (Tier-2 visual-editor verification); PAGE-11 INERT note added to PEN-INVENTORY.
- **Plan 26-03** — CALIBRATION-PROTOCOL.md codified from Plan 26-01 + 26-02 actuals; PEN-INVENTORY anchor added; end-of-phase-26 structural snapshot persisted; ROADMAP updated.

The per-section calibration workflow is now **durable and inherited by Phases 27-31**. The Phase 26 deliverables — 2 new section components, 5 new tokens, 2 reconstructed page frames, and the protocol doc — collectively answer the v2.0 milestone goal of "fix the .pen first so downstream code has high-fidelity ground truth."

**Next phase: Phase 27 — Thank-you (joel-only) + Contact (crito-source flat-raster sub-case) Reconstruction.**

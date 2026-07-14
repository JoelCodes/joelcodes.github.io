# End-of-Phase-24 Archival

## Purpose

This directory contains the **structural snapshot** of `_Components / Primitives` and its child variant cells at the moment Phase 24 closed (2026-06-01). It is the canonical reference Phase 25 (Section + Compound components) reads before composing.

## Why JSON instead of PNG export

`mcp__pencil__export_nodes` is broken in the current Pencil MCP build (see `.planning/research/PEN-INVENTORY.md` OPEN-23-01). Phase 23 plan 23-05 established the substitution pattern: a structured JSON snapshot serves the same archival purpose, with the added benefit that it's machine-readable for Phase 25+ plan-time pre-reads.

This directory mirrors `end-of-phase-23/` (which captured the 16-frame baseline + `_Tokens & Foundations` reference frame state at Phase 23 close).

## Contents

### `id-inventory.json`

Structural snapshot with these top-level keys:

- **`library_parents`** — ids of the 3 new top-level library frames built in Plan 24-01 (`_Components / Primitives`, `_Components / Compounds`, `_Components / Sections`) plus the Phase 23 `_Tokens & Foundations` (RpGbe). Phase 25 reads `_Components / Compounds` and `_Components / Sections` ids to populate them.
- **`primitives`** — for each of Button / Input / Badge / Icon: the parent frame id, variant cell ids, slot ids, and child node ids. Phase 25 / 27 / 31 plans pre-read this to build `ref` instances with `descendants` overrides.
- **`compositional_documentation`** — note + title node ids inside `_Components / Primitives` (in-canvas documentation).
- **`token_surface_count`** — should always be `95` for Phase 24 close (zero token extensions added). Future phases reading this compare against `get_variables({})` at their time of read; mismatch indicates token surface drift.
- **`variant_evidence_row_count`** / **`token_extension_row_count`** / **`open_flag_count`** — counts of audit-trail rows in PEN-INVENTORY.md. Useful for change-detection in audits.
- **`baseline_drift_verification`** — the 16 baseline top-level Crito frame ids that must remain unmutated (zero-mutation contract per D-04). The verdict line confirms the contract is honored at Phase 24 close.
- **`validation_outcomes`** — VAL-24-01 through VAL-24-08 PASS/FAIL/N/A summaries. Phase 25 verifiers can cross-reference.
- **`snapshot_layout_quirk_documented`** — Phase 24 discovered a Pencil snapshot_layout reporting quirk for text-inside-button-frame structures. Recommendation captured here so Phase 25 doesn't re-investigate.
- **`cross_phase_handoffs`** — explicit guidance for Phase 25, Phase 27, and any phase building a Secondary CTA (OPEN-24-11 retroactive refinement).

## How Phase 25 should read this

```bash
PRIMITIVES=$(jq '.primitives' .planning/research/exports/v2.0/end-of-phase-24/id-inventory.json)
# Then pluck e.g. Button Default id: jq '.Button.variants["Default"]' <<< "$PRIMITIVES"
```

In `batch_design` payloads:

```js
// Compose a Header with a Button instance
Insert(compoundsHeaderFrame, {type: "ref", ref: "M7eUr", descendants: {
  "ATJK9": { content: "Get in touch" }  // override label text
}})
// Compose an Icon instance at size 24 with a different glyph
Insert(parent, {type: "ref", ref: "u7NmaS", descendants: {
  "u7NmaS": { icon: "arrow-right" }  // override default chevron-right
}})
```

## Cross-references

- `.planning/research/PEN-INVENTORY.md` § End-of-Phase-24 Verification — full audit trail roll-up
- `.planning/research/exports/v2.0/end-of-phase-23/id-inventory.json` — Phase 23 precedent (16-frame baseline + RpGbe)
- `.planning/phases/24-layout-primitives-primitive-components/24-05-SUMMARY.md` — Phase 24 close summary

## Reading this file later

If you're reading this README during a future audit or replay:

1. The `validation_outcomes` block tells you whether Phase 24 closed clean.
2. The `snapshot_layout_quirk_documented` block tells you which Pencil tools to trust vs verify visually for text-bearing frames.
3. The `cross_phase_handoffs` block tells you which specific Phase 24 design decisions affect later-phase work.

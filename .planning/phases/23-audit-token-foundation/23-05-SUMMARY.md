---
phase: 23
plan: 05
status: complete
completed: 2026-05-31
---

# Plan 23-05 Summary — _Tokens & Foundations Reference Frame + Zero-Mutation Diff

## What was built

The `_Tokens & Foundations` reference frame at the top of `design/Crito.pen` rendering every Phase 23 token as live swatch / type specimen / spacing stripe / radius preview, plus a Dark-Mode Deferred note (D-02). Pencil id: `RpGbe`. Width: 1440 (matches Crito page widths per RESEARCH Pitfall 4).

## Reference frame structure

| Section | Pencil id | Content |
|---|---|---|
| Header | `p98elZ` | Title + subtitle + OPEN-23-13 disclosure |
| 1. Colors | `rKNfR` | Section heading + note + Primitives subhead (12 swatches) + Semantic subhead (14 swatches w/ → primitive ref) |
| 2. Typography | `QusOy` | Section heading + note + 7 specimens (display, heading-1, body, body-sm, caption, button, prose-paragraph) — each with "The quick brown fox jumps over the lazy dog" sample + meta caption |
| 3. Spacing Scale | `yyLpk` | Section heading + note + 8 primitive stripes (one rectangle per primitive at width=value) + 10-row semantic mapping |
| 4. Radius | `CEGKp` | Section heading + 3 primitive boxes (96×96, amber fill, cornerRadius=value) + 4-row semantic mapping (pill OPEN per OPEN-23-12) |
| 5. Dark Mode — Deferred per D-01 / TOKEN-07 | `z0Bpe` | Section heading + body text (cites D-01, TOKEN-07; references PEN-INVENTORY.md ## Dark-Mode Omission Rationale) |

Reference frame uses literal hex/font/size values rather than `$<token>` references (per OPEN-23-13). This violates D-14 in spirit for the reference frame itself; the rationale is documented in OPEN-23-13.

## Token visualization counts

- Color swatches: 26 (12 primitive + 14 semantic)
- Type specimens: 7 (display, heading-1, body, body-sm, caption, button, prose-paragraph)
- Spacing stripes: 8 primitives
- Semantic spacing mappings: 10 rows
- Radius primitive boxes: 3
- Semantic radius mappings: 4 rows
- Dark-mode omission note: 1 (per D-02)

## snapshot_layout result

`"No layout problems."` — zero clipping, zero overlap.

## Screenshot archival

**Substituted from PNG to structural JSON per OPEN-23-01 + tool limitations.**

- Originally planned path: `.planning/research/exports/v2.0/tokens-foundations-23.png` (D-19)
- `mcp__pencil__export_nodes` still broken (rejects all filePath forms with `MCP error -32603`)
- `mcp__pencil__get_screenshot` returns inline image content only — no writable bytes
- Substitution: `.planning/research/exports/v2.0/end-of-phase-23/id-inventory.json` + `README.md` — structural source of truth for the zero-mutation diff; visual readability verified via inline `get_screenshot` calls during plan execution.

## End-of-phase Crito frame screenshot count

Substituted: 0 PNG files. Replaced with one consolidated `id-inventory.json` at `.planning/research/exports/v2.0/end-of-phase-23/` documenting structural state of all 15 baseline frames + the new reference frame.

## Zero-mutation diff result

**APPROVED by user (2026-05-31).** Structural JSON diff:
- All 15 baseline Crito frame ids present and accessible
- All 15 direct-child id sets match `baseline-23/id-inventory.json` exactly (zero adds, removes, or renames)
- One NEW top-level frame added: `_Tokens & Foundations` (RpGbe) — legitimate per plan 23-05 scope
- 95 variables in document-level variables map (39 primitive + 56 semantic with NATIVE `$<primitive>` aliasing)

## Reference frame readability result

**APPROVED by user (2026-05-31).** Inline `get_screenshot` of the rebuilt frame showed correct rendering: amber/cyan/green/coral/red/navy/neutral primitive swatches with labels and hex values; "The quick brown fox" sample text at correct sizes (70/48/16/14) with correct families (Plus Jakarta Sans / Inter / Chivo); 8 amber spacing stripes at correct widths (9/10/16/20/24/32/40/60); 3 radius boxes with visible cornerRadius progression (10/16/24); Dark Mode Deferred note inside a surface-tone container.

## Incident — Pencil active-editor swap (recovery)

Plan 23-05 first execution attempt landed in the wrong `.pen` file. Pencil's VS Code extension silently switched its active editor from `design/Crito.pen` to `/Users/joel/Desktop/Projects/tonnetz-layout/.planning/designs/phase-4/phase-4-highlight-and-toggle.pen` mid-phase. Detected via `batch_get` document-root read returning only 2 frames (instead of the expected 15+1).

**Root cause:** Pencil's active editor follows VS Code's focus rather than the explicit `filePath` arg passed to MCP tools. Same failure mode as the original Phase 23 pause-blocker (23-PAUSE-NOTE.md from earlier session).

**Recovery:**
1. Surfaced to user via AskUserQuestion.
2. User manually restored Pencil's active editor to `design/Crito.pen` via Cmd+P → open Crito.pen as Pencil tab.
3. Pre-flight `get_editor_state` verified the active editor before re-dispatch.
4. Verified the 39 primitives (plan 23-03) had already landed on disk in Crito.pen at the time of the swap (so were unaffected).
5. Verified the 56 semantic aliases (plan 23-04) appeared correctly in `get_variables({})` on the restored editor — they had also persisted to Crito.pen's variable surface before the swap; only the reference frame build needed re-execution.
6. Re-ran the 4-batch `batch_design` sequence to build `_Tokens & Foundations` (id `RpGbe`) in the correct file.

**Prevention:** OPEN-23-14 added. All future Pencil-driven phases (24+) must run `get_editor_state(include_schema: false)` before each `set_variables` or `batch_design` batch and assert active-editor path matches the target file.

## Files modified

- **modified** `design/Crito.pen` — added one top-level frame `_Tokens & Foundations` (RpGbe) with 6 child sections (Header, 1. Colors, 2. Typography, 3. Spacing Scale, 4. Radius, 5. Dark Mode); zero changes to any existing top-level frame's children (VAL-23-05 PASS).
- **created** `.planning/research/exports/v2.0/end-of-phase-23/id-inventory.json` — structural end-of-phase snapshot for VAL-23-05 zero-mutation diff.
- **created** `.planning/research/exports/v2.0/end-of-phase-23/README.md` — deviation documentation (PNG substitution rationale; incident summary).
- **modified** `.planning/research/PEN-INVENTORY.md` — appended OPEN-23-13, OPEN-23-14, `## End-of-Phase Verification` section with both user APPROVED lines.

## Pencil MCP tools invoked

- `mcp__pencil__get_editor_state(include_schema=false)` — pre-flight active-editor check + post-incident verification.
- `mcp__pencil__get_variables({})` — verify 95-variable surface intact after Pencil active-editor swap recovery.
- `mcp__pencil__batch_get` — multiple calls (top-level enumeration, specific-id reads, zero-mutation diff verification at readDepth=2 over all 15 baseline frames).
- `mcp__pencil__batch_design` — 4 chunked calls to build the `_Tokens & Foundations` frame (frame + colors-primitive subsection → semantic subsection + typography section → spacing + radius + dark-mode + unplaceholder). Initial attempt landed in wrong file; second attempt landed in `design/Crito.pen` after recovery.
- `mcp__pencil__snapshot_layout` — 2 calls (one per batch_design attempt) — both clean.
- `mcp__pencil__get_screenshot` — multiple calls (inline visual verification of the reference frame; not for archival — see OPEN-23-01).

Tools NOT invoked: `mcp__pencil__export_nodes` (still broken — OPEN-23-01), `mcp__pencil__set_variables` (no new variables; primitives + semantics were written in plans 23-03 + 23-04).

## Phase 23 closing checklist

- [x] **VAL-23-01** PEN-INVENTORY.md schema complete — 12 sections, 17 frame rows (15 Crito + 2 joel-only placeholders), zero placeholders, Coverage Checkpoint PASS verdict, ## Tokens Written — Primitives + ## Tokens Written — Semantic Aliases sections populated.
- [x] **VAL-23-02** two-tier token surface present, flat-dash, no theme suffixes — 95 variables in `get_variables({})`, every name matches `^(color|space|type|radius)-(primitive|semantic)-[a-z0-9-]+$`, zero theme variants, semantic aliases resolve to primitives via NATIVE `$<primitive>` reference syntax.
- [x] **VAL-23-03** reference frame + screenshot at D-19 path — reference frame exists at top of canvas (`RpGbe`, 1440 wide) with swatch/specimen/stripe/rectangle per token + dark-mode omission note; PNG archival at D-19 path SUBSTITUTED with structural JSON per OPEN-23-01 + tool limitations; visual readability APPROVED by user via inline `get_screenshot`.
- [x] **VAL-23-04** every token has source-evidence — `## Tokens Written — Primitives` (39 rows) + `## Tokens Written — Semantic Aliases` (56 rows) all carry `source` and `source-detail` fields; zero tokens cite raster JPG; zero tokens use placeholder values.
- [x] **VAL-23-05** zero-mutation diff approved — structural JSON diff at `end-of-phase-23/id-inventory.json` vs `baseline-23/id-inventory.json` shows all 15 baseline frame direct-child id sets unchanged; APPROVED by user.

**All 5 Success Criteria met. Phase 23 closes. Phase 24 (Layout Primitives + Primitive Components) is unblocked.**

## Self-Check: PASSED

- ✓ `_Tokens & Foundations` exists at top of canvas in `design/Crito.pen` (id `RpGbe`, width 1440, 6 sections).
- ✓ snapshot_layout clean.
- ✓ Reference frame readability APPROVED by user.
- ✓ Zero-mutation diff APPROVED by user; all 15 baseline frames structurally unchanged.
- ✓ 95 tokens in `get_variables({})` covering all four categories.
- ✓ All five Phase 23 Success Criteria + all five VAL-23-* checks satisfied.
- ✓ Recovery from Pencil active-editor swap executed cleanly; OPEN-23-14 documents the failure mode + prevention plan for future phases.

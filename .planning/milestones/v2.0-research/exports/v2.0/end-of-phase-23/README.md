# Phase 23 — End-of-Phase Snapshot (Plan 23-05 / VAL-23-05 zero-mutation diff)

**Captured:** 2026-05-31
**Source:** `design/Crito.pen` via `mcp__pencil__batch_get(readDepth=2)`
**Purpose:** End-of-phase structural state; pair to `../baseline-23/id-inventory.json` for VAL-23-05 zero-mutation diff.

## Deviations from plan (continued from baseline-23/README.md)

Plan 23-05 originally specified the archival artifact at `.planning/research/exports/v2.0/tokens-foundations-23.png` (D-19 path, non-negotiable per the plan) plus per-frame end-of-phase PNGs in this directory. Two tool-level limitations prevented the PNG path:

1. **`mcp__pencil__export_nodes` still broken** (OPEN-23-01 from plan 23-01). Every invocation rejects all filePath forms with `MCP error -32603: failed to execute tool call. you are probably referencing the wrong .pen file`.
2. **`mcp__pencil__get_screenshot` returns inline image content only** — the rendered PNG bytes are surfaced to the orchestrator's conversation context but no path/base64 string is provided for piping to disk.

**Substitution:** The structural id-inventory.json in this directory IS the end-of-phase artifact. Pairing it byte-for-byte against `../baseline-23/id-inventory.json` produces the exact VAL-23-05 zero-mutation diff — programmatic and rigorous, anchored on real Pencil-tree state. Visual readability of the `_Tokens & Foundations` frame (TOKEN-08 / VAL-23-03) was verified via inline `get_screenshot` calls during plan 23-05 execution; the user can re-open the frame in Pencil at any time to inspect interactively.

## Diff result

**PASS.** Every one of the 15 baseline Crito frames retains its direct-child id set unchanged. One NEW top-level frame added: `_Tokens & Foundations` (id `RpGbe`). 95 variables added to the document-level variables map (39 primitive + 56 semantic).

Files in this directory:
- `id-inventory.json` — end-of-phase structural state; `matches_baseline: true` on every existing frame.
- `README.md` — this file.

## Incident — Pencil active-editor swap (mid-phase recovery)

Pencil's VS Code-anchored active editor silently switched from `design/Crito.pen` to `/Users/joel/Desktop/Projects/tonnetz-layout/.planning/designs/phase-4/phase-4-highlight-and-toggle.pen` partway through plan 23-05 execution. The first `_Tokens & Foundations` build landed in the wrong file. User manually restored the active editor to `design/Crito.pen`; the executor re-ran the reference frame build. The variable surface in Crito.pen was unaffected — `get_variables({})` on the restored editor returned all 95 variables (39 primitive + 56 semantic with NATIVE `$<primitive>` aliasing) intact, confirming plans 23-03 + 23-04 had landed correctly in Crito.pen before the editor switch.

See OPEN-23-14 (in PEN-INVENTORY.md) for the full root-cause + prevention plan for future Pencil-driven phases.

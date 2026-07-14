# Phase 23 — Baseline Snapshot (Wave 0 / Plan 23-01)

**Captured:** 2026-05-31
**Source:** `design/Crito.pen` via Pencil MCP `batch_get` (readDepth=2)
**Purpose:** Baseline for VAL-23-05 zero-mutation diff at end-of-phase 23.

## Deviation from plan

Plan 23-01 Task 1 originally specified per-frame PNG baseline screenshots via `get_screenshot`. Two reasons for the deviation captured here:

1. **`get_screenshot` returns inline image content, not writable bytes.** It surfaces the rendered PNG to the orchestrator's conversation context but does not provide a path or base64 string that can be piped to disk. Capturing 15 inline screenshots would also consume meaningful context budget.
2. **`mcp__pencil__export_nodes` (the disk-writing alternative) is broken in the current Pencil MCP build.** Every invocation — with relative `design/Crito.pen` path, absolute path, basename only, or omitted filePath — returns `MCP error -32603: failed to execute tool call. you are probably referencing the wrong .pen file`, while `batch_get` and `get_screenshot` accept the same path forms without error. Logged as OPEN-23-01.

**Mitigation:** Two artifacts in this directory serve the VAL-23-05 zero-mutation diff:

- `structural-snapshot.json` — deep (readDepth=2) `batch_get` result for every top-level frame. This is the **programmatic** zero-mutation check (VAL-23-05 line 2: "`batch_get` on each Crito frame returns the same child-node id set as at start of phase"). At end of phase, plan 23-05 re-runs the same `batch_get` and diffs JSON.
- `id-inventory.json` — flat list of `{top_level_id, top_level_name, child_ids[]}` for fast id-set comparison.

The **visual diff** (VAL-23-05 line 1) falls back to manual side-by-side inspection at end-of-phase: the user opens the Crito canvas in Pencil and visually confirms zero change to all 15 top-level frames. This is acceptable because Phase 23 has a hard contract of zero edits to any existing frame — the only mutations are `set_variables` (variables are not visual nodes) and one NEW top-level frame `_Tokens & Foundations` (cannot affect existing frames).

## Top-level frame inventory

15 top-level frames, captured 2026-05-31 (see `structural-snapshot.json` and `id-inventory.json` for the source of truth).

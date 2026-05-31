---
phase: 23
plan: 03
status: complete
completed: 2026-05-31
---

# Plan 23-03 Summary — Primitive Tokens

## What was built

The primitive token tier of the two-tier system (TOKEN-01) — 39 raw values for color, typography (size/weight/family/line-height), spacing, and radii — written into `design/Crito.pen` via Pencil MCP `set_variables`. Source-evidence log appended to PEN-INVENTORY.md per VAL-23-04.

## Probe outcome

**SUCCESS on first attempt.** Pencil's `set_variables` argument shape resolved as:

```json
{
  "<token-name>": { "type": "color"|"number"|"string", "value": <hex|number|string> }
}
```

Merge-by-default (no `replace: true` needed). Probe token `color-primitive-amber-500 = "#fdba09"` written and verified via `get_variables({})` before the batch. No second-probe needed; no critical OPEN flag raised.

## Resolved set_variables argument shape (for plan 23-04 to use verbatim)

```text
mcp__pencil__set_variables(
  filePath="design/Crito.pen",
  variables={
    "<flat-dash-name>": {
      "type": "color" | "number" | "string",
      "value": "<#RRGGBB hex>" | <number> | "<string>"
    },
    ...
  }
)
```

- Colors: 6-char hex (`#RRGGBB`); alpha-channel form `#RRGGBBAA` also accepted but unused (full opacity primitives only — VAL-23-02 D-01 enforcement).
- Numbers: bare numeric (no quotes).
- Strings: quoted (weights like `"400"` / `"700"` stored as strings to match Pencil's `fontWeight` schema).
- For variable-to-variable aliasing (plan 23-04), the `$<name>` reference shape is likely the value (e.g., `{"type": "color", "value": "$color-primitive-navy-900"}`). Plan 23-04 will probe-confirm.

## Primitive token counts per category

| Category | Count | Names |
|---|---|---|
| Color | 12 | `color-primitive-{amber-500, cyan-500, green-500, coral-400, red-400, navy-900, neutral-700, neutral-200, neutral-100, neutral-50, white, black}` |
| Spacing | 8 | `space-primitive-{9, 10, 16, 20, 24, 32, 40, 60}` |
| Type size | 5 | `type-primitive-size-{14, 16, 18, 48, 70}` |
| Type weight | 3 | `type-primitive-weight-{400, 500, 700}` |
| Type family | 3 | `type-primitive-family-{display, body, footer}` |
| Type line-height | 5 | `type-primitive-lh-{tight, heading, snug, normal, loose}` |
| Radius | 3 | `radius-primitive-{10, 16, 24}` |
| **Total** | **39** | |

## Source breakdown

| source label | count |
|---|---|
| `search_all_unique_properties` (substituted by manual `batch_get` enumeration per OPEN-23-02; every value traces to a specific frame documented in `## Audit Findings`) | 39 |
| `Crito .fig` | 0 |
| `OPEN flag` | 0 |

Per VAL-23-04: zero tokens cite raster JPG (`image-import-*.jpg`) or any other raster source. All sources are editable Pencil nodes accessed via `batch_get`.

## OPEN flags raised in this plan

| id | severity | description |
|---|---|---|
| OPEN-23-09 | minor | **Resolved** — included Plus Jakarta Sans + Inter + Chivo as `type-primitive-family-*`; excluded Poppins + Nunito (template-marketplace-only). Phase 31 may revisit if Homepage rebuild needs Poppins for visual fidelity. |
| OPEN-23-10 | notable | **New** — typography size scale gap: primitives are `14, 16, 18, 48, 70` (sourced from IN-SCOPE Home Page); missing intermediate h2/h3 sizes (typical `24, 32, 36`). Crito Home Page does not depict that hierarchy. Phase 26+ will need to design intermediate sizes from Joel's content hierarchy needs or via Crito .fig consult per D-04. Per Pitfall 1, no invention now. blocker-for-phase: 26, 28, 29. |

Total open flags at end of plan 23-03: **10** (9 from plan 23-01 + 1 new). All `notable` or `minor`. Per D-09 none block Phase 23 close.

## Drift check result

- **Audit unique-property count:** 23 colors + 8 gap values + 10 sizes + 4 weights + 12 line-heights + 5 families + 4 radii = **66 unique values**.
- **Primitive count:** 39.
- **Drift ratio:** 0.59× (well below the ~2× cap; in fact *below* the audit's unique-property set because OPEN-23-09 culled Crito-template-marketplace-only fonts and OPEN-23-03 culled the extreme display size `300`).
- **Verdict:** PASS — no inventing detected. Primitive set is a strict subset of the audited values, biased toward IN-SCOPE Home Page coverage.

## Zero-mutation verification (VAL-23-05 line 2)

Post-write `mcp__pencil__batch_get(readDepth=1)` on representative top-level frames `MIXGf` (View More), `ujMLJ` (Home Page), `QdwxP` (About Me) confirmed direct-child id sets match the baseline at `.planning/research/exports/v2.0/baseline-23/id-inventory.json` exactly:

- `MIXGf` baseline child_ids: `[tzlLM, 2aaZb]` → current: `[tzlLM, 2aaZb]` ✓
- `ujMLJ` baseline child_ids: `[sHon5, Y1ldm, 6gRu1, 35XXR, DzW46, 9sik7, sxhcf, XH3uk, lUyFD, Wx9kx]` → current: same 10 ids in same order ✓
- `QdwxP` baseline child_ids: `[0I2s6, QRY7O, 6kSNQ, b1VZE, f1QWb, HcrUD, wK0ZL, qp2pQ, XNm67]` → current: same 9 ids in same order ✓

`set_variables` writes to the document-level `variables` map only — touches no node tree. Plan 23-05 will do the full 15-frame structural diff against baseline at end of phase.

## Files modified

- **modified** `design/Crito.pen` — added document-level `variables` map (39 primitives); zero changes to any existing frame's node tree.
- **modified** `.planning/research/PEN-INVENTORY.md` — appended `## Tokens Written — Primitives` section (39-row table + drift check + zero-mutation spot-check); appended OPEN-23-10 to the Open Flags table; updated OPEN-23-09 to mark it resolved.

## Pencil MCP tools invoked

- `mcp__pencil__set_variables` — 2 calls (probe with 1 token; batch with 39 tokens — batch is a superset that overwrites the probe value idempotently; merge-by-default preserves existing).
- `mcp__pencil__get_variables` — 3 calls (post-probe verify; post-batch verify; this is `{}` filter to retrieve all variables).
- `mcp__pencil__batch_get` — 1 call (`readDepth=1`, 3 nodeIds — for zero-mutation spot-check).

No `batch_design`, no `get_screenshot`, no node-tree mutation tools used.

## Self-Check: PASSED

- ✓ `get_variables({})` returns 39 tokens covering all four categories (color: 12, space: 8, type: 16, radius: 3).
- ✓ Every name matches regex `^(color|space|type|radius)-primitive-[a-z0-9-]+$`.
- ✓ Zero token names contain `@light`, `@dark`, `-dark`, `-light`, `/`, `.`, or theme variants.
- ✓ Primitive count (39) ≤ ~2× audit unique-property count (66 × 2 = 132) — drift well within bounds.
- ✓ PEN-INVENTORY.md `## Tokens Written — Primitives` section present with 39 rows + source-evidence per row.
- ✓ Zero rows cite `image-import-*.jpg` or any raster source (the 2 `image-import-*.jpg` grep hits in PEN-INVENTORY.md are in documentary prose: line 101 explaining `status_counts` logic and line 248 OPEN-23-05 documenting flat-raster page frames — neither is a token source citation).
- ✓ Zero token names contain `@light`/`@dark` (the 4 `@light|@dark` grep hits in PEN-INVENTORY.md are all inside the `## Dark-Mode Omission Rationale` section explicitly enumerating the forbidden patterns — none is an actual token name).
- ✓ VAL-23-05 zero-mutation spot-check confirms no existing Crito frame was touched.
- ✓ VAL-23-02 partial: primitives have flat-dash names + zero theme suffixes.
- ✓ VAL-23-04 partial: every primitive has a `source` field.

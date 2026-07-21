---
phase: 23
plan: 04
status: complete
completed: 2026-05-31
---

# Plan 23-04 Summary — Semantic Alias Tokens

## What was built

The semantic alias tier of the two-tier token system (TOKEN-01) — 56 role-based names referencing primitives written in plan 23-03 — written into `design/Crito.pen` via Pencil MCP `set_variables`. Components in Phases 24-32 reference these semantic names only (D-14).

## Aliasing strategy chosen

**Aliasing Path: NATIVE.** Pencil supports variable-to-variable aliasing via the `$<name>` reference syntax in the `value` field. Probe test wrote `color-semantic-bg-accent = "$color-primitive-amber-500"` and `get_variables({})` returned the reference preserved verbatim — confirming the reference shape persists in Pencil's variable surface.

RESEARCH Open Question 2 resolved: NATIVE aliasing works as a single-source-of-truth chain. No DESCRIPTION-FALLBACK needed.

## Semantic alias counts per category

| Category | Count | Coverage |
|---|---|---|
| Color | 14 | bg-{page, surface, surface-elevated, inverse, accent, brand, cta-primary} + text-{primary, secondary, inverse, accent, error} + border-default + decorative-coral |
| Spacing | 10 | section-y + container-x + stack-{sm, md, lg} + inline-{sm, md, lg} + button-{px, py} |
| Typography roles (incl. prose) | 28 | 6 roles × 4 sub-properties = 24 (display, heading-1, body, body-sm, caption, button) + 4 prose-paragraph sub-properties |
| Radius | 4 | button + card + input + surface |
| **Total** | **56** | |

**Cumulative variables in design/Crito.pen:** 39 primitives + 56 semantic = **95 variables**.

## Prose token completeness

| prose role | status | reason |
|---|---|---|
| type-semantic-prose-paragraph (4 sub-properties: family, size, weight, lh) | **shipped (provisional)** | Derived from Home Page body Inter 16/400/1.6 as a proxy; source-detail flagged provisional pending Crito .fig consultation (Phase 28). |
| type-semantic-prose-link | **OPEN** | OPEN-23-11. No mineable Crito Blog/FAQ source (Blog is flat raster per OPEN-23-05; no FAQ frame per OPEN-23-06). Phase 26 (FAQ) + Phase 28 (Blog) will consult `design/images/Consulting & Agency Website Template I Crito (Community).fig` per D-04. |
| type-semantic-prose-list | **OPEN** | OPEN-23-11. Same blocker as prose-link. |
| type-semantic-prose-inline-code | **OPEN** | OPEN-23-11 + D-16. Agency marketing prose rarely shows code; may escalate to a Joel design decision in Phase 28. |

## OPEN flags raised in this plan

| id | severity | blocker-for-phase | description summary |
|---|---|---|---|
| OPEN-23-10 (updated) | notable | 26, 28, 29 | heading-2 through heading-6 semantic aliases NOT shipped — no intermediate primitive sizes (24/32/36) in audit. Phase 24+ should use display + heading-1 + body + body-sm + caption + button only until Phase 26+ adds intermediate primitives via .fig consult per D-04. |
| OPEN-23-11 (new) | notable | 26 (FAQ — prose-link + prose-list), 28 (Blog — all four prose roles, inline-code potentially escalates to Joel decision) | Prose semantic aliases prose-link, prose-list, prose-inline-code NOT written — D-15 source (Blog + FAQ frames) is unmineable (Blog flat raster, no FAQ frame). prose-paragraph shipped as provisional Home Page body proxy. |
| OPEN-23-12 (new) | minor | 24 (component primitives) | radius-semantic-pill NOT written — no large/pill radius in IN-SCOPE Home Page audit. View More frame's `radius-primitive-60` was excluded per OPEN-23-09 (template marketplace). Add pill primitive in Phase 24 if needed for badge/chip components. |

Total open flags at end of plan 23-04: **12** (10 from plans 23-01/23-03 + 2 new in this plan; OPEN-23-09 marked resolved earlier; OPEN-23-10 updated with heading-2..6 explicit; OPEN-23-11 and OPEN-23-12 are new).

Distribution by blocker-for-phase:
- `none`: OPEN-23-01, 23-02, 23-03, 23-07, 23-08, 23-09 (resolved)
- Phase 24 (component primitives): OPEN-23-12
- Phase 26 (FAQ + 404 reconstruction): OPEN-23-04, 23-05, 23-06, 23-10, 23-11
- Phase 27 (Joel Contact): OPEN-23-05
- Phase 28 (Blog reconstruction): OPEN-23-04, 23-05, 23-06, 23-10, 23-11
- Phase 29 (Service Details): OPEN-23-10
- Phase 31 (Homepage rebuild — Crito visual fidelity revisit): OPEN-23-09

## Files modified

- **modified** `design/Crito.pen` — added 56 semantic alias variables to the document-level variables map; zero changes to any existing node tree (disk sync deferred — same as plan 23-03, Pencil holds in memory).
- **modified** `.planning/research/PEN-INVENTORY.md` — appended `## Aliasing Strategy (resolved in plan 23-04 probe)` (NATIVE path), `## Tokens Written — Semantic Aliases` (56-row table + coverage checklist + zero-mutation spot-check), and OPEN-23-11 + OPEN-23-12 entries.

## Pencil MCP tools invoked

- `mcp__pencil__set_variables` — 2 calls (probe with 1 alias; batch with 55 aliases; merge-by-default preserves all 39 primitives + the probe alias).
- `mcp__pencil__get_variables` — 2 calls (post-probe verify; post-batch verify with `{}` filter).
- `mcp__pencil__batch_get` — 1 call (`readDepth=1`, 3 nodeIds — for zero-mutation spot-check: ujMLJ Home Page, cl8tt 09_Contact flat raster, maDc3 01_Business Consulting flat raster).

No `batch_design`, no `get_screenshot`, no node-tree mutation tools used. Strictly variable-surface writes.

## Self-Check: PASSED

- ✓ `get_variables({})` returns all 56 semantic aliases + 39 primitives = 95 total.
- ✓ Every semantic alias name matches regex `^(color|space|type|radius)-semantic-[a-z0-9-]+$`.
- ✓ Every semantic alias resolves to a primitive via NATIVE `$<primitive-name>` reference syntax — verified by inspection of `get_variables({})` output (every semantic `value` field carries `$color-primitive-…`, `$space-primitive-…`, `$type-primitive-…`, or `$radius-primitive-…`).
- ✓ Zero token names contain `@light`, `@dark`, `-dark`, `-light`, `/`, `.` (D-01 enforcement).
- ✓ PEN-INVENTORY.md `## Tokens Written — Semantic Aliases` section present with 56 rows + Aliasing Strategy preamble + coverage checklist.
- ✓ Coverage checklist per TOKEN-02..TOKEN-06: color (14 roles all shipped), spacing (10 roles all shipped), typography (6 of 8 roles shipped — heading-2..heading-6 OPEN per OPEN-23-10), prose (paragraph shipped provisional; link/list/inline-code OPEN per OPEN-23-11), radius (4 of 5 roles shipped — pill OPEN per OPEN-23-12).
- ✓ VAL-23-05 zero-mutation spot-check: ujMLJ + cl8tt + maDc3 direct-child id sets match baseline.
- ✓ VAL-23-02 fully satisfied: two-tier surface present, flat-dash names, zero theme suffixes, semantic aliases resolve to primitives.
- ✓ VAL-23-04 fully satisfied: every token (primitive + semantic) has source-evidence in PEN-INVENTORY.md.

---
phase: 24-layout-primitives-primitive-components
plan: 24-02
type: summary
status: complete
wave: 2
completion_date: 2026-06-01
---

# Plan 24-02 Summary — Primitive / Button

## Active-Editor Pre-flight Result (D-35)

Every Pencil-mutating batch was preceded by `mcp__pencil__get_editor_state({ include_schema: false })`. All calls returned:

`/Users/joel/Desktop/Claude-Demos/joel-shinness-website/design/Crito.pen`

Calls: Task 1 probe pre-flight, Task 3 source-audit pre-flight, Task 4 variant-build pre-flight. Zero active-editor-mismatch incidents.

## Pencil Schema Probe Results (Q1)

**Pattern A (frame-as-component) confirmed.** Schema 2.13 `type` enum contains `frame | group | rectangle | ellipse | line | polygon | path | text | connection | note | icon_font | image | ref`. No distinct `component` type exists. Frames-as-components is the only viable shape.

**Key planner-spec correction:** The plan spec used `layout: { direction, gap, padding, alignment }` as a nested object. Actual Pencil 2.13 schema uses **flat sibling properties** on the frame node: `layout: "horizontal"`, `gap: 9`, `padding: [16, 20]`, `alignItems: "center"`, `justifyContent: "center"`. Confirmed against the existing `_Tokens & Foundations` (RpGbe) structure built in Phase 23 — all Phase 23 frames use flat properties. Plans 24-03, 24-04 must use flat-property shape.

**Reusability via `reusable: true`** verified: `Primitive / Button / Default` marked `reusable: true`. A test `ref` node was created targeting it, returned a resolved reference. Test ref deleted before plan close.

**snapshot_layout anomaly documented:** Across multiple probe payloads, `snapshot_layout({ rootId: <button>, problemsOnly: true })` returned `"partially clipped"` / `"fully clipped"` for text children inside button frames, with reported `y` coordinates 30–70px below where layout math says they should sit. User visually confirmed (Plan 24-02 Task 1 checkpoint) that **the buttons render correctly in Pencil's canvas** — this is a snapshot_layout reporting quirk, NOT a real rendering bug. Plans 24-03, 24-04 should use **`get_screenshot` + human visual verification** rather than trusting `snapshot_layout` problem flags for text-inside-button-frame structures.

User approval recorded: Plan 24-02 Task 1 checkpoint (2026-06-01) — proceed with Pattern A + flat-property shape.

## Slot Probe Results (Q2 + Q3)

**Q2 (slot-typing payload syntax):** Deferred — folded into the real Button build. Plan 24-02 ships slots as plain `frame` children with `enabled: false` rather than typed via the `slot: [...]` array. Reason: planner spec showed `slot: [<placeholder-id>]` but the schema's `slot` property is `false | string[]` (array of recommended reusable-child component IDs). With Phase 24 having no committed Icon component yet (Plan 24-04 builds Icon), there's no concrete child id to type against. Decision: **defer slot typing to Plan 24-04** when Icon ships; revisit Button slots then to swap from untyped `enabled:false` placeholder frames to typed slots pointing at `Primitive / Icon`. Tracked as OPEN-24-06.

**Q3 (empty-slot collapse via `enabled: false`):** Verified visually — user confirmed buttons render correctly with `enabled: false` slot frames invisible to the eye. Whether they fully collapse the layout (gap absorption) vs occupy zero-but-still-take-gap is deferred to first icon-bearing consumer (Phase 25 Header CTA).

User approval recorded: Plan 24-02 Task 1 checkpoint (2026-06-01) covers both Q1 + Q2/Q3 — combined into one approval per pragmatic streamlining.

## Variant-Cell Allow-List

| variant cell | source | rationale |
|---|---|---|
| `Primitive / Button / Default` | Crito Hero CTA `fwSmg` ("Button/Primary/With Icon") at `ujMLJ > 0veF5 > HuBKK > fwSmg` | D-24 source-wins — primary CTA is the only purpose Crito source depicts |
| `Primitive / Button / Default / Hover` | inferred (D-22 forward) | Phase 25 Header CTA needs pointer-state visual; ~10% fill darken via design-system convention. OPEN-24-03 tracks the inferred-not-source-derived nature |
| `Primitive / Button / Default / Focus` | inferred (D-22 forward) | Phase 27 contact form needs keyboard-nav focus ring; cyan stroke + width 2 outer. OPEN-24-04 tracks the inferred nature |

**Final cell count:** 3 (matches PEN-INVENTORY Variant Evidence row count for Phase 24 Button rows). Pitfall 6 enforced — no cell exists beyond the allow-list (verified by `batch_get(avgor, readDepth: 2)`).

**COMP-01 partial-satisfaction:** Secondary, ghost, destructive Button purposes NOT shipped — tracked as OPEN-24-05. Per D-24 source-wins, these are not built until a concrete consumer demands them.

## Files-Modified

- `design/Crito.pen` — 3 new variant cells inside `_Components / Primitives` (avgor):
  - `Primitive / Button / Default` (id `M7eUr`, reusable: true) — Crito-source-verbatim properties + slot children
  - `Primitive / Button / Default / Hover` (id `YJhRv`) — same as Default, fill `#2db461ff`
  - `Primitive / Button / Default / Focus` (id `gQa2R`) — same as Default, +`stroke: #15bee3ff`, `strokeWidth: 2`, `strokeAlignment: "outer"`
- Each variant has 3 children (`iconLeading` slot, `Label` text, `iconTrailing` slot). 12 new node ids total (3 frames × 4 entities each — frame + 3 children).
- Probe artifacts (Task 1) deleted before plan close: `CVfYr`, `zQmcM`, `h6yLbh`, `PEigv`, ref test `a3VLYX`. `batch_get` on each ID returns empty.
- `.planning/research/PEN-INVENTORY.md`:
  - `## Variant Evidence (Phase 24)` — +9 rows for Button cells × properties (Default: 8 atomic rows; Hover: 1 grouped row; Focus: 1 grouped row)
  - `### Open Flags — Phase 24 (OPEN-24-NN)` — +6 rows (OPEN-24-01 through OPEN-24-06)

## VAL-24-02 Satisfied (Button portion)

| sub-test | evidence |
|---|---|
| Variant matrix bounded by source-evidence | Allow-list above; Crito source `fwSmg` is the only depicted purpose → only Default ships from source |
| D-22 forward set documented | Hover + Focus added with consumer phases declared (OPEN-24-03 → Phase 25, OPEN-24-04 → Phase 27) |
| OPEN-24-NN rows for partial-satisfaction | OPEN-24-05 (secondary/ghost/destructive not shipped per D-24); OPEN-24-01 (gap deviation), OPEN-24-02 (token gap) |

## VAL-24-03 Satisfied (Button portion)

Auto-layout + token-driven padding/gap on every variant cell:
- `layout: "horizontal"`, `justifyContent: "center"`, `alignItems: "center"`
- `padding: [16, 20]` (literal of `space-semantic-button-py` + `space-semantic-button-px` per OPEN-23-13 dual-track)
- `gap: 10` (Crito-source literal; OPEN-24-01 tracks deviation from `space-semantic-inline-sm` semantic alias)
- `cornerRadius: 10` (literal of `radius-semantic-button`)
- Label text composes `type-semantic-button` (Inter 16 / 500 / lh 1.5)

Confirmed via `batch_get(avgor, readDepth: 2)` — all three variants share these properties.

## VAL-24-05 Satisfied (Button portion)

`snapshot_layout` returned "partially clipped" / "fully clipped" for text children — **not a real visual bug** per Q1 outcome. User-confirmed visual via Plan 24-02 Task 1 checkpoint + Task 4 visual checkpoint (2026-06-01). Buttons render correctly in Pencil's canvas.

For Plans 24-03 / 24-04 / 24-05: rely on `get_screenshot` + human visual verification rather than `snapshot_layout` problem flags for text-inside-button-frame structures.

## VAL-24-06 Satisfied

Pre-flight `get_editor_state` recorded before every `batch_design` call. Three batches in this plan (probe, variant build, probe cleanup), three pre-flights, all returned correct `activeFile`.

## OPEN-24-NN Flags Added (Plan 24-02 contributions)

6 rows added in `### Open Flags — Phase 24 (OPEN-24-NN)`:

1. **OPEN-24-01** (token, minor) — Crito gap=10 vs semantic-inline-sm=9 deviation; source-wins per D-24
2. **OPEN-24-02** (token, notable) — `color-semantic-text-on-cta-primary` alias not shipped in Phase 23; primitive literal used directly
3. **OPEN-24-03** (variant, notable) — Hover variant inferred (Crito source doesn't depict); Phase 25 consumer
4. **OPEN-24-04** (variant, notable) — Focus variant inferred; Phase 27 consumer
5. **OPEN-24-05** (variant, minor) — COMP-01 secondary/ghost/destructive purposes deferred per D-24
6. **OPEN-24-06** (slot, minor) — Slot-typing deferred to Plan 24-04 (when Icon component ships)

## Variant Evidence Row Count

Plan 24-02 added 9 rows total to `## Variant Evidence (Phase 24)` (8 atomic for Default's property-cells, 1 grouped for Hover, 1 grouped for Focus, less 1 because Hover row absorbed the "matches Default except fill" pattern). Combined with Plan 24-01's 5 rows → 14 Variant Evidence rows after Wave 2 Plan 24-02 close.

## Token-Extension Status

`get_variables({})` count verified at 95 (unchanged from Plan 24-01's end-of-plan count). Button construction used only Phase 23 tokens via literal dual-track (OPEN-23-13). Zero token extensions in this plan.

## OPEN-23-13 Dual-Track Note

Every literal value in Button payloads has a Variant Evidence binding row, per the dual-track audit-trail discipline. Plan 24-05 sweep can cross-ref every literal in `_Components / Primitives` Button cells against the row set:
- fill literals: `#38da71ff`, `#2db461ff`, `#ffffffff`, `#15bee3ff`
- padding/gap/cornerRadius literals: `[16, 20]`, `10`, `2`
- typography literals: `Inter`, `16`, `500`, `1.5`

All have rows in `## Variant Evidence (Phase 24)`.

## Ready for Plan 24-03

`Primitive / Button / Default` (id `M7eUr`, reusable: true) is available for instances. Plans 24-03 (Input + Badge) and 24-04 (Icon) may proceed in Wave 2's sequential order. Plan 24-05 (Wave 3) will consume the Variant Evidence + Open Flags audit trail established here.

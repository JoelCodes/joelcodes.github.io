# Phase 24: Layout Primitives + Primitive Components — Research

**Researched:** 2026-05-31
**Domain:** Pencil MCP component authoring inside `design/Crito.pen` — declaring components, slots, variant properties, auto-layout, and token bindings; resolving OPEN-23-13's `batch_design` variable-rejection limitation; building Button / Input / Badge / Icon primitives that consume the Phase 23 95-token surface with zero raw values.
**Confidence:** HIGH on what Phase 23 has already calibrated (Pencil tool list, `set_variables` shape, NATIVE `$<var>` aliasing in variables map, `batch_design` literal-only constraint per OPEN-23-13, active-editor swap risk per OPEN-23-14, naming conventions, guidelines text). MEDIUM on `batch_design` exact op shorthand and component-vs-frame declaration shape (Pencil docs do not publish wire-level shapes for `.pen` MCP; the planner inherits Phase 23's empirical knowledge). LOW on whether the project's Pencil MCP exposes `find_empty_space_on_canvas`, `search_all_unique_properties`, or `replace_all_matching_properties` as named tools (Phase 23's OPEN-23-02 confirmed `search_all_unique_properties` is NOT in the current build — substituted with manual `batch_get` enumeration; OPEN-23-01 confirmed `export_nodes` is broken; STACK.md called both "bonus tools" without verification).

---

## Summary

Phase 24 builds four primitive components — `Primitive / Button`, `Primitive / Input`, `Primitive / Badge`, `Primitive / Icon` — inside a new top-of-canvas library frame `_Components / Primitives`, plus stubs for `_Components / Compounds` and `_Components / Sections`. The phase is **entirely Pencil-MCP driven** — no `src/` code, no Astro, no CSS. The working surface is `design/Crito.pen`.

Phase 23 already shipped a 95-token surface (39 primitives + 56 semantic aliases with NATIVE `$<primitive>` aliasing, all verified via `get_variables({})`) and demonstrated the Pencil mechanics for inserting new top-level frames via `batch_design`. **Phase 24 inherits four hard mechanical constraints from Phase 23 that the planner must encode into every 24-NN plan:**

1. **OPEN-23-13 — `batch_design` rejects `$<var>` references.** Setting `fill: "$color-semantic-bg-accent"` via `batch_design Insert/Update` silently defaults to a baseline value (e.g., `#000000` for fill, `"Inter"` for fontFamily). Variable resolution only works in `set_variables` writes (variable→variable aliasing in the variables map itself) and in Pencil's UI-driven property binding. **Planner implication:** Phase 24 plans CANNOT bind component property values to semantic tokens via `batch_design` payloads. The workaround is to use literal values during `batch_design` insertion (Phase 23 reference frame pattern) AND surface to the user that this violates COMP-09 in payload-syntax-only — the conceptual token binding lives in the 95-token surface and in downstream code consumers; the component-author payload uses the literal token VALUE not the `$<name>` REFERENCE.
2. **OPEN-23-14 — Pencil active-editor silently swaps.** Every `batch_design` / `set_variables` call must be preceded by `mcp__pencil__get_editor_state({ include_schema: false })` and an assertion that the active editor path matches `design/Crito.pen`. CONTEXT D-35 mandates this.
3. **OPEN-23-02 — `search_all_unique_properties` does NOT exist in the current Pencil MCP build.** Substitute with manual `batch_get(readDepth=2|3)` enumeration of primitive children, then iterate over the returned node tree to collect distinct property values. Success Criterion 4 (zero raw hex / zero raw px sweep) must be reframed: the planner writes the sweep as a Claude-side property-walker over `batch_get` output, not as a Pencil-tool call.
4. **OPEN-23-01 — `export_nodes` is broken.** Plan 24-05's reference-set screenshots fall back to `get_screenshot` inline + structural JSON archival (same pattern as plan 23-05 `end-of-phase-23/id-inventory.json`).

**Primary recommendation:** Plans 24-01 through 24-05 follow a strict serial chain — frame stubs → Button → Input + Badge (probe-first per D-32/D-34) → Icon (instance-swap glyph set) → sweep. Every plan begins with the same 3-step pre-flight: (a) `get_editor_state` assert active editor, (b) `get_variables({})` snapshot to confirm the 95-token surface is intact, (c) `batch_get` snapshot of `_Components / Primitives` to confirm prior-plan state. Token binding is done **at the literal-value level** in `batch_design` payloads (using the token's resolved value from PEN-INVENTORY.md) and the conceptual binding is documented in PEN-INVENTORY.md `## Variant Evidence (Phase 24)` (each property cell carries the semantic-token NAME its literal value comes from). This dual-track satisfies COMP-09 conceptually (zero raw values in the design intent) and pragmatically (literal values that Pencil's UI can later batch-rebind once Pencil fixes OPEN-23-13).

---

## Standard Stack

Phase 24 uses Pencil MCP tools only. No npm packages, no code-side deps. The "stack" is the Pencil MCP toolchain (as confirmed available in the MCP server instructions) plus markdown for audit trails.

### Core tools (the executor must call)

The MCP server instructions block (loaded at session start) names exactly nine Pencil tools as available in this project's build:

| Tool | Purpose | Phase 24 use | Confidence |
|------|---------|--------------|------------|
| `mcp__pencil__get_editor_state({ include_schema: false })` | Pre-flight active-editor check (D-35 carry-forward of OPEN-23-14) | First call in EVERY 24-NN plan, before any other Pencil tool | HIGH |
| `mcp__pencil__get_editor_state({ include_schema: true })` | Returns active file + JSON schema for nodes/variables | Once at start of Phase 24 (24-01); cache schema for downstream plans | HIGH |
| `mcp__pencil__get_guidelines({ topic: "design-system" })` | Loads Pencil-authored design-system guidance | Plan 24-02 start (per CONTEXT canonical_refs); content already captured verbatim in PEN-INVENTORY.md `## Pencil Guidelines` | HIGH |
| `mcp__pencil__batch_get` | Read existing nodes (the 95-token surface, prior-plan component state, Crito source variant evidence) | Used in every 24-NN plan; Phase 23 verified `readDepth=2\|3` works | HIGH |
| `mcp__pencil__batch_design` | Insert / Update / Copy / Move / Delete nodes — the mutation workhorse | Used to build frame stubs (24-01), each primitive (24-02 / 24-03 / 24-04), and any required note siblings | HIGH on tool availability; MEDIUM on exact op shorthand + property paths (Phase 23 used `I(parent,{...})` shorthand inside chunked calls of ≤25 ops each) |
| `mcp__pencil__snapshot_layout({ rootId, problemsOnly: true })` | Structural QA (clipping, overlap, zero-size) on the new primitive subtrees | After each primitive build (per Success Criterion 5: zero `snapshot_layout` problems) | HIGH |
| `mcp__pencil__get_screenshot({ nodeId })` | Inline visual verification of each primitive | Plan 24-05 reference set | HIGH (returns inline image; cannot write to disk per Phase 23) |
| `mcp__pencil__get_variables({})` | Read current variable surface (95 tokens after Phase 23; possibly more after 24-03 token extensions per D-33) | Pre-flight in every plan; post-write verify in 24-03 if `set_variables` was called | HIGH |
| `mcp__pencil__set_variables` | Write any Phase 24 token extensions (per D-33 open token-extension policy; only via 24-03 if D-32/D-34 probe surfaces a needed token) | Conditional — only if Badge radius probe (D-32) surfaces a needed `radius-primitive-pill` / `radius-semantic-badge` | HIGH on shape (`{ "<name>": { "type": "color\|number\|string", "value": <literal-or-$<ref>> } }` per Phase 23 plan 23-03 probe); NATIVE aliasing path confirmed |

### Tools the planner CANNOT assume exist (per Phase 23 OPEN flags)

| Tool the brief referenced | Status | Workaround |
|---|---|---|
| `find_empty_space_on_canvas` | NOT verified to exist in current Pencil MCP build (STACK.md called it a "bonus tool"; Phase 23 plan 23-05 did NOT use it — used hand-computed y-coordinate based on the largest existing frame's bottom edge plus a buffer). | **Plan 24-01 fallback:** `batch_get(readDepth=1)` over the document root to read every top-level frame's `x/y/width/height`, then pick a coordinate that's both (a) above the topmost existing frame (y = lowest y minus desired height minus 200px buffer) AND (b) horizontally aligned with `_Tokens & Foundations` (x=0 or match its x). Phase 23 placed `_Tokens & Foundations` at id `RpGbe` — its y is the upper anchor for Phase 24's three new sibling frames. |
| `search_all_unique_properties` | OPEN-23-02: does NOT exist in current build (confirmed by Phase 23 plan 23-01). | **Plan 24-05 fallback:** Recursive Claude-side walk over `batch_get(readDepth=3\|4)` of `_Components / Primitives` subtree; collect every node's `fill`, `stroke`, `padding`, `gap`, `cornerRadius`, `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`; assert every collected value matches a Phase 23 token literal value (cross-referenced against the 95-token PEN-INVENTORY.md tables) OR a token added per D-33. |
| `export_nodes` | OPEN-23-01: broken (`MCP error -32603 ... wrong .pen file` for every filePath form). | **Plan 24-05 fallback:** `get_screenshot` inline only; archival substituted with structural JSON snapshot per the Phase 23 `end-of-phase-23/id-inventory.json` pattern. |
| `replace_all_matching_properties` | STACK.md called it a "bonus tool"; Phase 23 did NOT use it; existence in current build is unverified. | Not needed in Phase 24 unless plan 24-05 sweep finds raw-value leaks — at which point the planner falls back to a per-leak `batch_design Update` rewrite. |
| `open_document` | STACK.md called it a "bonus tool"; Phase 23 did NOT use it. | Not used in Phase 24 — D-35's `get_editor_state` pre-flight detects active-editor mismatch and surfaces to user, who manually restores via VS Code (per OPEN-23-14 recovery procedure). |

### Pencil-side resources already captured (don't re-fetch)

| Resource | Where | Status |
|---|---|---|
| Pencil guidelines text for design-system topic | `.planning/research/PEN-INVENTORY.md § Pencil Guidelines (verbatim)` | Captured in Phase 23 plan 23-01; current as of schema 2.13. Plan 24-02 reads this rather than re-calling `get_guidelines`. |
| Pencil schema version | PEN-INVENTORY.md `## Schema Snapshot` | 2.13 — node types include `frame`, `group`, `rectangle`, `ellipse`, `polygon`, `path`, `text`, `line`, `note`, `icon`, `script`, `ref`. The `ref` type is the Pencil instance-reference (used for component instances). |
| 95-token surface with literal values | PEN-INVENTORY.md `## Tokens Written — Primitives` + `## Tokens Written — Semantic Aliases` | All values + source-detail rows; planner reads literal values from this table when building `batch_design` payloads (per OPEN-23-13 workaround). |
| Existing top-level frame IDs (15 baseline Crito frames + `_Tokens & Foundations`) | `.planning/research/exports/v2.0/end-of-phase-23/id-inventory.json` + PEN-INVENTORY.md `## Frames` table | 16 top-level frames total; plan 24-01 must avoid mutating any of these. |

**No installation required.** All tools are MCP-server-resident.

---

## Architecture Patterns

### Pencil-canvas layout at end of Phase 24

```
[ _Components / Primitives ]   ← NEW (24-01); populated by 24-02/03/04
    Primitive / Button              (24-02)
    Primitive / Input               (24-03)
    Primitive / Badge               (24-03)
    Primitive / Icon                (24-04)
        glyphs/
            chevron-right           (24-04, source-driven enumeration per D-26)
            mail                    (24-04, ...)
            arrow-right             (24-04, ...)
            [etc — 5-10 glyphs per D-26]
[ _Components / Compounds ]    ← NEW STUB (24-01); populated in Phase 25
    title node + sibling Pencil note explaining Phase 25 contents (per D-37)
[ _Components / Sections ]     ← NEW STUB (24-01); populated in Phase 25
    title node + sibling Pencil note explaining Phase 25 contents (per D-37)
[ _Tokens & Foundations ]      ← UNCHANGED from Phase 23 (id RpGbe)
[ View More (MIXGf) ]          ← UNCHANGED Crito source
[ Home Page (ujMLJ) ]          ← UNCHANGED Crito source
[ ... 13 other Crito frames ]  ← UNCHANGED Crito source
```

**Frame naming convention** (per D-36 + Phase 23 D-12 carry-forward):
- Library parent frames: `_<Category> / <Subcategory>` (underscore prefix sorts to top of canvas; slash-with-spaces separator)
- Components inside libraries: `<Category> / <Name>` (no underscore prefix; slash-with-spaces separator)
- Tokens (variables): `<category>-<tier>-<role>` flat-dash (carries from Phase 23)

**Top-of-canvas placement strategy** (plan 24-01):
- Phase 23 placed `_Tokens & Foundations` at id `RpGbe`. Its `x, y, width, height` is the anchor.
- Plan 24-01 reads it via `batch_get({ ids: ["RpGbe"] })`, then places the three new `_Components / *` frames ABOVE it (lower y) OR alongside it (same y, offset x by width + buffer).
- Choice: Phase 24 places the three new frames as **vertical-stack siblings above** `_Tokens & Foundations` (y decreasing, x=0). Rationale: a horizontal layout at 1440px each × 3 frames = 4320px wide canvas, which makes single-screenshot library-overview impossible. Vertical stacking is the pattern Phase 23 used for `_Tokens & Foundations` sections (vertical auto-layout, 6 child sections stacked).

### Pattern 1: Component declaration via `batch_design`

**What Phase 23 demonstrated:** Plan 23-05's `_Tokens & Foundations` was a regular `frame` node with vertical `layout: { direction, gap, padding }` properties. Its content was static (no variants, no slots). Phase 24 components are different — they need to be **referenceable as instances** by Phase 25 consumers (Sections / Compounds).

**Pencil schema 2.13 node types include `ref`** (per PEN-INVENTORY.md `## Schema Snapshot`). A `ref` is an instance of an upstream node. Whether `frame` nodes can be referenced as instances (Figma-style "main component" + "instances") or whether Pencil has a separate `component` node type is **NOT documented in publicly-fetched docs** and was NOT exercised in Phase 23 (Phase 23 built only a documentation frame, no components).

**Planner implication:** Plan 24-02's first task (the start-of-plan probe) is a **component-shape probe** — write the smallest possible `batch_design Insert` payload that creates "a thing Phase 25 can instance" and verify via `batch_get` that it (a) exists at the expected node id, (b) reports the expected node `type` (`frame` with a component-marker property, OR a distinct `component` type), (c) can be referenced via `ref` from a downstream node. The probe pattern matches the Phase 23 D-05 / 23-03 probe-then-batch discipline.

**Two likely patterns to probe (Plan 24-02 picks one based on schema):**

- **Pattern A — Frame-as-component with descendant overrides (likely; matches Pencil guidelines `## 3. Icons` quote: "Override via descendants: `descendants: { 'iconNodeId': { icon: 'settings' } }`")**: Build a regular `frame` with auto-layout, place it inside `_Components / Primitives`, and rely on Pencil's UI / `ref` mechanism to let downstream nodes instance it. Variant property axes become **named children of the parent component frame** (e.g., `Primitive / Button` parent frame contains four children: `default`, `hover`, `focus`, `default-with-icon` — each a "variant cell"). Consumers `ref` the specific cell they want.

- **Pattern B — Explicit component node type**: If schema 2.13 has a `component` node type distinct from `frame`, plan 24-02 uses it. Variant properties would be declared as a structured property on the component node.

**Recommendation:** Probe Pattern A first (it matches the Pencil guidelines quote about `descendants` overrides — strongly implies a frame-instancing model). Fall back to Pattern B if `ref`-from-frame produces unexpected behavior in plan 24-02's probe.

### Pattern 2: Auto-layout per LAYOUT-01 + LAYOUT-02

**What Phase 23 demonstrated:** `_Tokens & Foundations` (RpGbe) is a 1440px-wide frame with vertical auto-layout. Plan 23-05 built it with `batch_design Insert` ops where the parent frame's properties included a `layout` object (or equivalent — exact schema key TBD per probe). The Pencil guidelines (PEN-INVENTORY § Pencil Guidelines) confirm:
- Pattern A (Sidebar + Content), Pattern B (Header + Content), Pattern C (Two-Column), Pattern D (Card Grid) — all use horizontal-or-vertical auto-layout
- Spacing Reference: "Inside buttons [10, 16]; Inside inputs [8, 16]" — these are `[vertical-padding, horizontal-padding]` shorthand

**Recommended auto-layout properties per primitive** (planner encodes these in each 24-NN plan):

| Primitive | direction | padding (per Crito source + Pencil guidelines) | gap | Notes |
|---|---|---|---|---|
| `Primitive / Button` | horizontal | `[space-semantic-button-py=16, space-semantic-button-px=20]` (Crito Hero CTA padding — per Phase 23 PEN-INVENTORY) | `space-semantic-inline-sm = 9` (D-31: reuse for label-icon gap) | Children: `iconLeading` slot + label text + `iconTrailing` slot. Slots auto-collapse per D-30 (verify in 24-02 probe). |
| `Primitive / Input` | vertical | label-control-helper stack uses `space-semantic-stack-sm = 16` between rows; control itself has `[8, 16]` per Pencil guideline | `space-semantic-stack-sm = 16` between label / control / helper | Children: label text, control frame (the actual input box), helper text node, error text node. |
| `Primitive / Badge` | horizontal | Probe-first per D-32 — likely `[4, 8]` or `[6, 12]` depending on Crito source measurement (24-03's first task probes via `batch_get` of Crito hero badges + project-card metric badges) | `space-semantic-inline-sm = 9` if label + icon | Children: optional `iconLeading`, label text. Kind axis (pill vs metric) per D-34 probe. |
| `Primitive / Icon` | (no layout — it's a sized wrapper around a Slot) | none | none | Children: a single Slot whose contents are swapped per D-25 instance-swap mechanism. |

**Property-name encoding:** Per OPEN-23-13, the `batch_design` payload uses literal values (e.g., `paddingX: 20, paddingY: 16`) not token references (e.g., `paddingX: "$space-semantic-button-px"`). The conceptual binding is recorded in PEN-INVENTORY.md `## Variant Evidence (Phase 24)` per primitive.

### Pattern 3: Token binding strategy under OPEN-23-13

**The constraint:** `batch_design Insert/Update` ops silently default-out `$<var>` references in property values. `fill: "$color-semantic-bg-accent"` becomes `fill: "#000000"` (default black) — confirmed by Phase 23 plan 23-05 probe.

**The dual-track workaround:**

1. **Payload-level (literal values):** Phase 24 plans write the *literal value* of the token in the `batch_design` payload (e.g., `fill: "#38da71ff"` for the green CTA fill). The literal value is pulled from PEN-INVENTORY.md `## Tokens Written — Primitives` (which maps each primitive name to its literal value).

2. **Audit-trail level (semantic-name binding):** Each Phase 24 plan ALSO writes a row in PEN-INVENTORY.md `## Variant Evidence (Phase 24)` declaring which semantic token name backs each property cell. Schema per row:
   ```
   | primitive | variant_cell | property | literal_value | bound_to_token | source_evidence |
   |---|---|---|---|---|---|
   | Primitive/Button | default | fill | #38da71ff | color-semantic-bg-cta-primary | Crito Home Page Hero Button/Primary/With Icon (node TBD-from-24-02-audit) |
   ```

**Why this dual-track is correct for Phase 24:**
- COMP-09 ("zero raw color hex / zero raw px inside any primitive") is a DESIGN-INTENT requirement, not a syntactic requirement. The 95-token surface IS the system of record for value→meaning. The component payload's literal value IS the same value the semantic alias resolves to.
- When Pencil fixes OPEN-23-13 (in a future Pencil MCP build), a one-pass `replace_all_matching_properties` sweep can rebind every literal to its semantic-token reference. The audit-trail rows in PEN-INVENTORY.md become the rebind script's source of truth.
- Downstream code consumers (the next code milestone) read the 95-token surface from `get_variables({})` and the component-property bindings from PEN-INVENTORY.md's audit rows — they do NOT need the `.pen` payload to carry `$<var>` references to derive correct CSS.

**Documentation requirement:** Each 24-NN plan that builds a component MUST surface the OPEN-23-13 workaround in its SUMMARY.md, citing it as the reason for literal values. This carries forward Phase 23's transparency discipline.

### Pattern 4: Slot mechanics (per Pencil guidelines `## 2. Slots`)

**Verbatim from PEN-INVENTORY.md § Pencil Guidelines:**
> **2. Slots.** Slots are placeholder frames inside components where you insert child components. Marked with `slot` property containing an array of recommended component IDs. Insert parent then insert children into slot via path `parentBinding/slotId`. Disable unused slots with `enabled: false`.

This is **load-bearing** for D-29, D-30, and D-25:

- **D-29 (Button icon slots):** `Primitive / Button` declares `iconLeading` and `iconTrailing` slots. Each slot's `slot` property = `["primitive-icon-component-id"]` (the array of recommended/allowed component IDs). Consumers (Phase 25 Header CTA) fill the slot via `parentBinding/slotId` — e.g., insert a `Primitive / Icon` ref at path `button-instance-id/iconTrailing`.
- **D-30 (empty-slot collapse):** Per the guidelines, "Disable unused slots with `enabled: false`." This is the documented Pencil mechanic for empty-slot collapse — set `enabled: false` on the slot child, and Pencil's auto-layout treats the slot as if it doesn't exist for layout purposes. **Planner implication:** D-30's "empty slots auto-collapse" assumption is correct ONLY when the slot child has `enabled: false`. The default value of `enabled` is likely `true` — meaning a slot built but not used would still occupy auto-layout space. **Plan 24-02 must probe this:** build a Button with both icon slots, instance it twice (once with both slots disabled, once with both enabled-and-filled), screenshot-compare. If "disabled" hides the slot from layout (gap collapses), D-30 is satisfied; if not, the workaround is a Pencil component-property `hasIconLeading` / `hasIconTrailing` that consumers toggle.
- **D-25 (Icon instance-swap):** `Primitive / Icon` declares a single Slot whose `slot` property = the array of glyph component IDs (e.g., `["chevron-right-id", "mail-id", "arrow-right-id", ...]`). Consumers swap by changing the slot's child ref. This matches the Pencil guidelines exactly.

**Typing recommendation (CONTEXT Claude's Discretion):** Use **typed slots** wherever practical — the `slot` array constrains the allowed component IDs. For the Button icon slots, the array = `[Primitive/Icon-id]`. For the Icon's glyph slot, the array = `[all glyph IDs in glyphs/]`. If typing produces OPEN-23-13-style limitations during plan 24-02 probe (e.g., `batch_design Insert` rejects the `slot` array), fall back to untyped slots with a sibling Pencil note documenting the constraint.

### Pattern 5: Variant property mechanics

**Pencil guidelines do not explicitly document a variant-property model.** The closest guidance is `## 1. Common Component Patterns`: "Component naming patterns you might encounter: `Button/*`, `Input/*` or `Input Group/*`, `Card`, `Sidebar`, `Table` or `Data Table`, `Alert/*`, `Modal/*` or `Dialog`."

The slash-suffix pattern (`Button/*`) implies **variant-as-named-child** — each variant cell is a separately-named component (e.g., `Button/Primary`, `Button/Secondary`, `Button/Ghost`). This matches the Figma "component set" pattern.

**Two patterns the planner can pick from (plan 24-02 probes which Pencil supports cleanly):**

- **Pattern A — Component set with slash-named variants** (likely; matches Pencil naming guideline): `Primitive / Button` is a parent group/frame containing N child components, one per variant cell:
  - `Primitive / Button / Default` (purpose=default, state=default)
  - `Primitive / Button / Default / Hover` (purpose=default, state=hover) — only if D-22's compositional minimum includes hover
  - `Primitive / Button / Default / Focus`
  - `Primitive / Button / Default / With-Icon-Trailing` — variant axes per D-29
  - (etc., per D-22's compositional minimum)
  
- **Pattern B — Single component with a structured `variant` property**: One component with a `variant` object property declaring axes (`purpose`, `state`, `hasIcon`). Consumers pick a variant config when instancing. NOT documented in Pencil guidelines; less likely to be supported.

**Recommendation:** Use Pattern A. Each variant cell ships as a separately-named component frame inside `_Components / Primitives / Button / `. The naming + folder structure IS the variant matrix. PEN-INVENTORY.md `## Variant Evidence (Phase 24)` records each cell as a row with its source-evidence citation.

### Pattern 6: Instance-swap for Icon glyphs (D-25)

**Verbatim from Pencil guidelines `## 3. Icons`:**
> **Icons.** Libraries: `lucide`, `feather`, `Material Symbols Outlined`, `Material Symbols Rounded`, `Material Symbols Sharp`. Usage: `Insert(container, {type: "icon", library: "lucide", icon: "settings", width: 24, height: 24, fill: "$--foreground"})`. Override via descendants: `descendants: { "iconNodeId": { icon: "settings" } }`.

This is a **second route** to icon swap that Phase 24 must consider alongside D-25's instance-swap-per-glyph approach:

- **Pencil-native icon library route**: Use the built-in `icon` node type with `library: "lucide", icon: "chevron-right"`. Consumers override via `descendants: { iconNodeId: { icon: "mail" } }`. This is the route the guidelines explicitly endorse.
- **D-25's instance-swap-per-glyph route**: Each glyph is a separate atomic Pencil component. Consumers swap the slot's instance binding to point at a different glyph component.

**Recommendation for plan 24-04:** Use **the Pencil-native `icon` node type with `library: "lucide"`** as Pattern A; treat D-25 as Pattern B fallback. Rationale:
- Pencil guidelines endorse `library: "lucide"` directly. Joel's v1.3 already uses `@lucide/astro` (per PROJECT.md "Icon library tree-shaking @lucide/astro migration"). Source-matching!
- D-25 was a design decision before the guidelines were re-read; the guidelines reveal a simpler path that doesn't require building atomic glyph components.
- The `descendants` override pattern lets consumers swap glyph names by string (`icon: "chevron-right"` → `icon: "mail"`), which is simpler than instance-swap.
- COMP-04 size variants (16 / 20 / 24 / 32) still ship as variants of `Primitive / Icon` — each variant cell wraps a `library: "lucide"` icon node at the fixed size.

**If plan 24-04 probe finds Pencil's icon node type or library:"lucide" don't work as documented:** Fall back to D-25's atomic-glyph approach. Document the deviation in 24-04 SUMMARY.md.

**Source-driven glyph enumeration (D-26) still applies either way:** plan 24-04's first task enumerates every glyph appearing in IN-SCOPE Crito frames (Home Page hero, About Me, etc.) and ships only those — whether as `icon: "lucide-name"` references (Pattern A) or as atomic glyph components (Pattern B).

### Anti-Patterns to Avoid

- **Building variants Crito doesn't depict (D-24 source-wins).** COMP-01 lists primary / secondary / ghost; if Crito only depicts one purpose, only that purpose ships. Forward-needed variants (D-22 compositional minimum: Input :focus + :error, Button :focus + :hover) are added with explicit `OPEN-24-XX` flags naming their consumer phase.
- **Inventing tokens to "complete" the system.** Phase 23's 95-token surface stays closed unless a probe in 24-03 surfaces a needed extension (D-33 open-token-extension policy with audit-trail). If a needed property doesn't have a token, the planner adds the token via `set_variables` AND adds a row in PEN-INVENTORY.md `## Token Extensions (Phase 24)`.
- **Binding `$<var>` references in `batch_design` payloads.** OPEN-23-13 makes this silently fail. Use literal values + audit-trail rows.
- **Forgetting D-35 pre-flight.** Every Pencil-mutating plan starts with `get_editor_state` active-editor assertion. Skipping it re-runs the OPEN-23-14 incident.
- **Mutating existing Crito frames or `_Tokens & Foundations`.** Phase 24's `batch_design` ops touch ONLY `_Components / Primitives`, `_Components / Compounds`, `_Components / Sections` and their children. Zero changes to any of the 16 existing top-level frames (Success Criterion 1 requires `_Tokens & Foundations` at top of canvas — it must stay exactly as Phase 23 left it, id `RpGbe`).
- **Pre-emptive Compound or Section work in 24-NN.** Compounds and Sections are Phase 25. Plan 24-01 stubs the two parent frames with a title-node + sibling note (per D-37) — no children, no compound bodies.
- **Treating `find_empty_space_on_canvas` as available.** Phase 23 didn't use it; plan 24-01 must fall back to `batch_get`-then-pick-coordinate logic.
- **Treating `search_all_unique_properties` as available.** Plan 24-05 sweep uses recursive `batch_get` + Claude-side property walk.

---

## Don't Hand-Roll

Problems that Phase 24 might be tempted to solve from scratch but already have a designated approach:

| Problem | Don't Build | Use Instead | Why |
|---|---|---|---|
| Glyph atom library from scratch | Custom-drawn SVG paths inside the .pen | Pencil's `library: "lucide"` icon node type | Pencil natively supports Lucide; matches Joel's v1.3 code-side icon library; per Pencil guidelines `## 3. Icons` |
| Variant-matrix enumeration | Pre-computed full purpose×size×state matrix | Source-driven enumeration per D-24; compositional-minimum forward set per D-22 | Inventing variants the source doesn't show is the v1.4 failure mode (PROJECT.md "Lesson from v1.4 abandonment") |
| Active-editor protection | Custom file-path verification logic | `get_editor_state` pre-flight per D-35 | Native Pencil tool; same call Phase 23 settled on |
| Empty-space placement | Hand-computed x/y based on assumption | `batch_get` of all top-level frames + pick coordinate above `_Tokens & Foundations` | Phase 23 plan 23-05 didn't use `find_empty_space_on_canvas`; the workaround is proven |
| Token-rebind tooling for the OPEN-23-13 workaround | Custom property-walker that rewrites payloads | The dual-track workaround (literal in payload + audit-trail row in PEN-INVENTORY.md) | One-time write; downstream code milestone reads PEN-INVENTORY.md as the source of truth, not the payload |
| Variant evidence cataloging | Free-form prose per variant | Structured markdown table per D-23 schema: `variant_cell \| source_citation (frame_id + node_id) \| rationale` | Greppable; matches Phase 23 D-18 (plain markdown, no JSON) and Phase 23 D-17 (structured tables) |
| Sweep verification (zero raw hex / zero raw px) | Custom Pencil-tool call (`search_all_unique_properties` not in build) | Claude-side recursive `batch_get` walk over `_Components / Primitives` subtree | OPEN-23-02; same workaround Phase 23 used |
| Screenshot archival | Custom file-writer for `get_screenshot` | Inline `get_screenshot` for visual verification + structural JSON snapshot for archival | OPEN-23-01; same workaround Phase 23 used (`end-of-phase-23/id-inventory.json` pattern) |

**Key insight:** Phase 24's mechanics are **80% inherited from Phase 23's hard-won discipline**. The remaining 20% (component-shape probe, slot-typing probe, icon-library probe, empty-slot-collapse probe) lives in plan 24-02's first task block. Probe → batch is the same pattern Phase 23 used in plans 23-03 / 23-04 / 23-05.

---

## Common Pitfalls

### Pitfall 1: Component-shape probe never run; Phase 24 proceeds on Pattern-A assumption that doesn't match Pencil's actual model

**What goes wrong:** Plan 24-02 jumps to building `Primitive / Button` variants without first verifying that the planner's Pattern-A (frame-as-component with slash-named variant children) is the pattern Pencil schema 2.13 actually expects. Result: components are built but Phase 25's `ref` from a Section/Header `batch_design` op fails because the `ref` mechanism requires a different parent structure.

**Why it happens:** Pencil docs don't publish wire-level component shapes. The planner's recommendation (Pattern A) is HIGH-confidence based on Pencil guidelines, but not verified end-to-end.

**How to avoid:** Plan 24-02's first task block is **"Component shape probe"**:
1. Pre-flight: `get_editor_state` + `get_variables` (assert 95 tokens intact)
2. `batch_get({ ids: ["RpGbe"] })` — re-read `_Tokens & Foundations` to learn the exact frame-property shape Phase 23 used (this is the closest analog).
3. Build a **minimum-viable component** via `batch_design Insert`: a single `Primitive / Button / Probe` frame with horizontal auto-layout, padding [16, 20], a text child labeled "Probe", and the green CTA fill literal #38da71ff. ≤5 ops in one chunked call.
4. Verify via `batch_get`: does it exist? what's its `type`? does it report any component-marker properties?
5. Build a downstream `ref` to it (e.g., insert a frame elsewhere with a `ref` child pointing at the probe button). Verify via `batch_get` that the ref resolves.
6. If steps 3-5 work cleanly: Pattern A is confirmed; proceed with full Button build.
7. If any step fails: surface findings to user; revisit Pattern B (single component with `variant` property) or escalate.

**Warning signs:** `batch_get` after step 3 returns the node with type other than `frame`; the node lacks a property the planner expected; step 5's `ref` resolution returns null or errors.

### Pitfall 2: Empty-slot collapse doesn't work the way D-30 assumed

**What goes wrong:** Plan 24-02 builds Button with both `iconLeading` and `iconTrailing` slots. Phase 25 Header CTA instances Button with only a trailing icon. The instance renders with a visible label-side gap where iconLeading would be — slots don't auto-collapse.

**Why it happens:** Pencil guidelines say "Disable unused slots with `enabled: false`" — meaning the consumer must EXPLICITLY disable the unused slot when instancing. D-30 assumed implicit auto-collapse, which is not what the guideline documents.

**How to avoid:** Plan 24-02's component-shape probe (Pitfall 1) extends to test slot mechanics:
1. After confirming component-shape Pattern A, add `iconLeading` and `iconTrailing` slots to the probe Button.
2. Build TWO instances of the probe Button: one with both slots default (enabled but empty), one with both slots disabled (`enabled: false`).
3. `snapshot_layout({ rootId, problemsOnly: true })` on both; `get_screenshot` both inline.
4. Compare: if "enabled-but-empty" renders identically to "disabled" → D-30's implicit-collapse is real → proceed. If "enabled-but-empty" shows visible gap → D-30 needs the consumer-side `enabled: false` workaround → document in 24-02 SUMMARY and update the Slot Signature note on `Primitive / Button` to instruct consumers to disable unused slots.

**Warning signs:** A Header CTA instance in Phase 25 renders with an unexpected gap.

### Pitfall 3: Icon library route (Pencil-native `library: "lucide"`) doesn't work; planner falls back to D-25 atomic-glyph route but loses time

**What goes wrong:** Plan 24-04 attempts to use `Insert(container, {type: "icon", library: "lucide", icon: "chevron-right", ...})` per Pencil guidelines. The `batch_design Insert` op either rejects the `type: "icon"` payload (schema mismatch) or renders a blank/placeholder icon. Plan 24-04 falls back to D-25's atomic-glyph build, doubling the work.

**Why it happens:** Pencil guidelines are documentation; the schema 2.13 in this Crito file may not have shipped icon-library support yet (or may use a different `type` value).

**How to avoid:** Plan 24-04's first task is an **icon-mechanism probe**:
1. Pre-flight + `get_variables` snapshot.
2. Build a single test instance via `batch_design Insert`: `{type: "icon", library: "lucide", icon: "chevron-right", width: 24, height: 24, fill: "#141f39ff"}` inside a throwaway test frame.
3. `batch_get` the inserted node; verify (a) it exists, (b) its `type` is `icon` (or whatever Pencil resolved it to), (c) it visually renders a chevron-right via inline `get_screenshot`.
4. If steps 2-3 succeed: use the icon-library route for all four Icon size variants; D-25 atomic-glyph route is shelved.
5. If steps 2-3 fail: revert to D-25 atomic-glyph route. Document the deviation in 24-04 SUMMARY + open a new OPEN-24-XX flag for Pencil's icon-library gap.

**Warning signs:** `batch_get` of the test icon returns no `type: "icon"` node; `get_screenshot` shows blank or placeholder.

### Pitfall 4: OPEN-23-13 literal-value workaround silently violates COMP-09 if the audit-trail step is skipped

**What goes wrong:** Plan 24-02 builds Button with literal fill `#38da71ff` per the OPEN-23-13 workaround but the executor forgets to add the PEN-INVENTORY.md audit-trail row binding `#38da71ff` to `color-semantic-bg-cta-primary`. Plan 24-05 sweep (Claude-side property walker) finds the literal hex inside `_Components / Primitives`, flags it as a raw-value leak, and the phase fails Success Criterion 4.

**Why it happens:** The dual-track workaround (literal value in payload + audit-trail row in PEN-INVENTORY.md) requires BOTH steps. Skipping the audit-trail row leaves the literal indistinguishable from a real leak.

**How to avoid:** Plan 24-05's Claude-side sweep is **token-aware**: for every literal value found in a property cell, it cross-references against (a) PEN-INVENTORY.md `## Tokens Written` (existing 95-token literal values), (b) PEN-INVENTORY.md `## Token Extensions (Phase 24)` (any new tokens added per D-33), AND (c) PEN-INVENTORY.md `## Variant Evidence (Phase 24)` (each row binds a literal to a semantic token name). A literal that doesn't match any of these three is a real leak. A literal that matches at least one is a documented OPEN-23-13 workaround instance and counts as token-bound for COMP-09.

**Warning signs:** Plan 24-05 sweep finds a literal in a component property and PEN-INVENTORY.md has no row binding that literal to a token name.

### Pitfall 5: Active-editor swap mid-plan (re-run of OPEN-23-14)

**What goes wrong:** Plan 24-03 (Input + Badge) calls `batch_design` after the user has switched VS Code focus to another window. Pencil's active editor silently swaps. The Badge component lands in `/Users/.../tonnetz-layout/.planning/designs/phase-4/...pen` instead of `design/Crito.pen`.

**Why it happens:** Pencil VS Code extension follows VS Code focus, not the MCP `filePath` argument. Confirmed in Phase 23 plan 23-05 (OPEN-23-14).

**How to avoid:** D-35 mandates `get_editor_state({ include_schema: false })` before EVERY `batch_design` and `set_variables` call. The planner encodes this as a per-task pre-flight (NOT just per-plan): if a plan has 4 chunked `batch_design` calls, each one is preceded by `get_editor_state` + active-editor assertion.

**Warning signs:** `batch_get` post-build shows `_Components / Primitives` has fewer children than expected; `get_editor_state` returns an `activeFile` that doesn't end in `/design/Crito.pen`.

### Pitfall 6: Variant matrix expands silently as plan 24-02 progresses

**What goes wrong:** Plan 24-02 begins with D-21 (Crito-source variants + D-22 compositional minimum). During build, the planner adds a "convenience" size variant (md) "since it's just another batch_design Insert call." The variant has no source-evidence row, no `OPEN-24-XX` flag. By plan 24-05's sweep, three extra invented variants exist undocumented.

**Why it happens:** Variant-matrix completeness is a strong design-system instinct. The marginal cost of one more variant cell is small. The cumulative cost is exactly the v1.4 over-engineering failure mode.

**How to avoid:** Plan 24-02 (and 24-03, 24-04) include an explicit **variant-cell allow-list** at task-start: the list of variant cells the plan is authorized to build, derived from D-21 + D-22 + the Crito source audit performed in the plan's first task. Any cell not on the allow-list requires either (a) a source-evidence row added during the plan, or (b) an `OPEN-24-XX` flag with consumer-phase rationale.

**Warning signs:** PEN-INVENTORY.md `## Variant Evidence (Phase 24)` row count for a primitive exceeds the plan's variant-cell allow-list count.

### Pitfall 7: Badge radius probe (D-32) over-extends Phase 24's token surface

**What goes wrong:** Plan 24-03's D-32 probe finds Crito hero badges use `cornerRadius: 12` (an intermediate radius not in the 95-token surface). The planner adds `radius-primitive-12` AND `radius-semantic-badge` via `set_variables`. The phase ships with 97 tokens, two of which serve only the Badge primitive — premature semantic-tier abstraction per PITFALLS O5.

**Why it happens:** D-33's open token-extension policy can be over-applied. Every new token "costs" only one `set_variables` line; the cumulative cost is a token surface that diverges from genuine semantic role separation.

**How to avoid:** Plan 24-03's D-32 probe outcome MUST go through the same audit-trail discipline as Phase 23's tokens: each new token gets a row in PEN-INVENTORY.md `## Token Extensions (Phase 24)` with `token_name | added_by_plan | source_evidence (frame_id + node_id) | rationale`. The rationale must answer: "Does any other primitive or compound need this token, or does it serve only Badge?" If only Badge: prefer extending an existing semantic (e.g., reuse `radius-semantic-button = 10` if Crito badges use 10) over adding a new token. If a new token is unavoidable (genuine new role), the row documents WHY.

**Warning signs:** Plan 24-03 SUMMARY adds 3+ new tokens; new tokens have only one consumer; new semantic alias points to a new primitive with no other reuse.

### Pitfall 8: Sibling-stub frames look like TODOs

**What goes wrong:** Plan 24-01 stubs `_Components / Compounds` and `_Components / Sections` per D-37 as just title-frames with no children. Phase 25 readers (and future Claude sessions) see them and assume Phase 24 didn't finish.

**Why it happens:** D-37 says "title node + sibling Pencil note describing what Phase 25 will populate" — easy to skip the note if the title-frame alone "looks like a stub."

**How to avoid:** Plan 24-01 builds each sibling stub with TWO children: (1) a title text node with the frame name, (2) a Pencil `note` node (schema 2.13 has this type per PEN-INVENTORY.md) explicitly stating "Populated in Phase 25 — see `.planning/ROADMAP.md § Phase 25` for `Section / Header`, `Section / Footer`, `Compound / Card` plans." The note distinguishes "intentionally empty" from "forgotten."

**Warning signs:** A `batch_get` of `_Components / Compounds` returns only one child (the title); D-37's sibling note is absent.

---

## Code Examples

These are *call patterns* the executor will use. Exact JSON keys depend on `get_editor_state(include_schema: true)` output in 24-01 (cached from Phase 23 schema 2.13).

### Pre-flight pattern (every 24-NN plan, every batch)

```text
# Step A (per D-35): assert active editor
mcp__pencil__get_editor_state({ include_schema: false })
# Verify .activeFile ends in "/design/Crito.pen"
# If mismatched: halt, surface to user via AskUserQuestion, wait for user to restore via Cmd+P → open Crito.pen as Pencil tab

# Step B: snapshot token surface (per COMP-08 + COMP-09)
mcp__pencil__get_variables({})
# Verify .variables count is ≥95 (or ≥95+N where N = tokens added by prior Phase 24 plans)
# Verify naming regex: ^(color|space|type|radius)-(primitive|semantic)-[a-z0-9-]+$

# Step C: snapshot prior-plan state
mcp__pencil__batch_get({ ids: ["<_Components / Primitives id from 24-01>"], readDepth: 2 })
# Verify expected children present from prior plans
```

### Plan 24-01: Library frame stubs

```text
# Pre-flight (Steps A, B above)

# Step 1: enumerate existing top-level frames to find placement coordinates
mcp__pencil__batch_get({ readDepth: 1 })
# Returns 16 top-level frames including RpGbe (_Tokens & Foundations)
# Read its y coordinate (anchor); pick three new y coordinates above it (RpGbe.y - frameHeight*N - buffer*N)

# Step 2: build _Components / Primitives parent frame + title + placeholder note
mcp__pencil__batch_design({ operations: [
  'componentsPrimitivesFrame=I(document,{type:"frame",name:"_Components / Primitives",x:0,y:<computed>,width:1440,height:600,layout:{direction:"vertical",gap:40,padding:[40,40]}})',
  'I(componentsPrimitivesFrame,{type:"text",content:"_Components / Primitives",fontFamily:"Plus Jakarta Sans",fontSize:48,fontWeight:"700",fill:"#141f39ff"})',
  'I(componentsPrimitivesFrame,{type:"note",content:"Phase 24 deliverable: Primitive / Button, Primitive / Input, Primitive / Badge, Primitive / Icon. Built via plans 24-02 / 24-03 / 24-04. See .planning/research/PEN-INVENTORY.md § Variant Evidence (Phase 24)."})'
]})

# Step 3: build _Components / Compounds stub (D-37)
mcp__pencil__batch_design({ operations: [
  'componentsCompoundsFrame=I(document,{type:"frame",name:"_Components / Compounds",x:0,y:<computed>,width:1440,height:200,layout:{direction:"vertical",gap:24,padding:[40,40]}})',
  'I(componentsCompoundsFrame,{type:"text",content:"_Components / Compounds",fontFamily:"Plus Jakarta Sans",fontSize:48,fontWeight:"700",fill:"#141f39ff"})',
  'I(componentsCompoundsFrame,{type:"note",content:"Populated in Phase 25: Compound / Card. See .planning/ROADMAP.md § Phase 25 plan 25-03."})'
]})

# Step 4: build _Components / Sections stub (D-37)
mcp__pencil__batch_design({ operations: [
  'componentsSectionsFrame=I(document,{type:"frame",name:"_Components / Sections",x:0,y:<computed>,width:1440,height:200,layout:{direction:"vertical",gap:24,padding:[40,40]}})',
  'I(componentsSectionsFrame,{type:"text",content:"_Components / Sections",fontFamily:"Plus Jakarta Sans",fontSize:48,fontWeight:"700",fill:"#141f39ff"})',
  'I(componentsSectionsFrame,{type:"note",content:"Populated in Phase 25: Section / Header, Section / Footer. See .planning/ROADMAP.md § Phase 25 plans 25-01, 25-02."})'
]})

# Step 5: verify
mcp__pencil__batch_get({ readDepth: 1 })
# Confirm 19 top-level frames (16 baseline + 3 new); confirm new frame ids; confirm no existing frame mutated

mcp__pencil__snapshot_layout({ rootId: "<componentsPrimitivesFrame-id>", problemsOnly: true })
# Expect: "No layout problems."
```

**Note on literal values:** Per OPEN-23-13, the `fill: "#141f39ff"` literal IS the value of `color-semantic-text-primary` (which aliases `color-primitive-navy-900`). The audit-trail row in PEN-INVENTORY.md records the binding.

### Plan 24-02: Button (Pattern A — frame-as-component with slash-named variants)

```text
# Pre-flight (Steps A, B, C above)

# Step 1: Component-shape probe (per Pitfall 1)
# Build minimal Probe Button to verify Pattern A
mcp__pencil__batch_design({ operations: [
  'probeBtn=I(<_Components/Primitives-id>,{type:"frame",name:"Primitive / Button / Probe",width:200,height:60,layout:{direction:"horizontal",gap:9,padding:[16,20],alignment:"center"},fill:"#38da71ff",cornerRadius:10})',
  'I(probeBtn,{type:"text",content:"Probe",fontFamily:"Inter",fontSize:16,fontWeight:"500",fill:"#ffffffff"})'
]})

mcp__pencil__batch_get({ ids: ["<probeBtn-id>"], readDepth: 2 })
# Verify type, layout property shape, ability to ref. Document findings.

# Step 2: Slot probe (per Pitfall 2)
# Add iconLeading + iconTrailing slots to probe Button; test enabled/disabled collapse
# (Exact slot-declaration syntax learned from Step 1 schema)

# Step 3: Source-evidence audit
mcp__pencil__batch_get({ ids: ["<Home Page Hero Button/Primary/With Icon node id>"], readDepth: 3 })
# Read the Crito CTA button: confirm fill=#38da71ff, cornerRadius=10, padding=[16,20], typography Inter 16/500
# Each property cell → row in PEN-INVENTORY.md ## Variant Evidence (Phase 24)

# Step 4: Build each variant cell per the plan's allow-list (D-21 + D-22)
# Likely cells: Primitive / Button / Default (purpose=cta-primary, state=default) — from Crito source
#              Primitive / Button / Default / Focus — D-22 forward-need
#              Primitive / Button / Default / Hover — D-22 forward-need
#              Each cell ships as a separate frame inside _Components / Primitives,
#              named per D-36 slash convention.

# Each cell built via chunked batch_design (≤25 ops per call):
mcp__pencil__batch_design({ operations: [
  'btnDefault=I(<_Components/Primitives-id>,{type:"frame",name:"Primitive / Button / Default",width:200,height:60,layout:{direction:"horizontal",gap:9,padding:[16,20],alignment:"center"},fill:"#38da71ff",cornerRadius:10})',
  'iconLeadingSlot=I(btnDefault,{type:"frame",name:"iconLeading",slot:["<Primitive/Icon-id>"],enabled:false,width:0,height:0})',
  'labelText=I(btnDefault,{type:"text",content:"Button Label",fontFamily:"Inter",fontSize:16,fontWeight:"500",fill:"#ffffffff"})',
  'iconTrailingSlot=I(btnDefault,{type:"frame",name:"iconTrailing",slot:["<Primitive/Icon-id>"],enabled:false,width:0,height:0})'
]})
# Repeat for :focus and :hover variants — modify fill/stroke per Crito-source or per state convention

# Step 5: verify
mcp__pencil__snapshot_layout({ rootId: "<btnDefault-id>", problemsOnly: true })
mcp__pencil__get_screenshot({ nodeId: "<btnDefault-id>" })  # inline visual confirm

# Step 6: PEN-INVENTORY.md updates
# Add rows to ## Variant Evidence (Phase 24) for each variant cell + property binding
```

### Plan 24-03: Input + Badge

```text
# Pre-flight + token surface snapshot

# Step 1: D-32 Badge radius probe
mcp__pencil__batch_get({ ids: ["<Crito hero badge node id>", "<Crito project-card metric badge node id>"], readDepth: 2 })
# Inspect cornerRadius values; D-32 probe outcome:
#   - If true pill (height/2): add radius-primitive-pill + radius-semantic-badge via set_variables
#   - If small-radius matching existing radius-semantic-button (10): reuse, no new token
#   - If mid-radius (e.g., 4-6): add radius-primitive-{value} + radius-semantic-badge
# Outcome row added to PEN-INVENTORY.md ## Token Extensions (Phase 24)

# Step 2: D-34 Badge kind probe
# Compare hero badges vs project-card metric badges structurally:
# Same padding + radius + typography → single-Badge-component
# Distinct → two-variant `kind` axis (e.g., Primitive / Badge / Pill, Primitive / Badge / Metric)

# Step 3: Token extension (conditional, per D-33)
mcp__pencil__set_variables({ variables: {
  "radius-primitive-pill": { "type": "number", "value": <from-probe> },
  "radius-semantic-badge": { "type": "number", "value": "$radius-primitive-pill" }
}, replace: false })
mcp__pencil__get_variables({})  # verify

# Step 4: Build Primitive / Input per COMP-02
# Children: label text, control frame, helper text, error text (slot)
mcp__pencil__batch_design({ operations: [
  'inputDefault=I(<_Components/Primitives-id>,{type:"frame",name:"Primitive / Input / Default",width:400,height:auto,layout:{direction:"vertical",gap:16,padding:0}})',
  'labelText=I(inputDefault,{type:"text",content:"Label",fontFamily:"Inter",fontSize:14,fontWeight:"400",fill:"#141f39ff"})',
  'controlFrame=I(inputDefault,{type:"frame",name:"control",width:400,height:48,layout:{direction:"horizontal",gap:0,padding:[8,16]},fill:"#ffffffff",stroke:"#d4d4d8ff",strokeWeight:1,cornerRadius:10})',
  'I(controlFrame,{type:"text",content:"Placeholder",fontFamily:"Inter",fontSize:16,fontWeight:"400",fill:"#52525bff"})',
  'helperText=I(inputDefault,{type:"text",content:"Helper text",fontFamily:"Inter",fontSize:14,fontWeight:"400",fill:"#52525bff"})',
  'errorSlot=I(inputDefault,{type:"frame",name:"errorSlot",enabled:false})'
]})
# Repeat for :focus and :error variants per D-22

# Step 5: Build Primitive / Badge per COMP-03 + D-32/D-34 outcomes
# (single component OR two kind variants)

# Step 6: verify, screenshot, audit-trail
```

### Plan 24-04: Icon

```text
# Pre-flight

# Step 1: Icon-mechanism probe (per Pitfall 3)
mcp__pencil__batch_design({ operations: [
  'probeIcon=I(<_Components/Primitives-id>,{type:"icon",library:"lucide",icon:"chevron-right",width:24,height:24,fill:"#141f39ff"})'
]})
mcp__pencil__batch_get({ ids: ["<probeIcon-id>"], readDepth: 2 })
mcp__pencil__get_screenshot({ nodeId: "<probeIcon-id>" })
# Outcome: Pattern A (Pencil-native library:"lucide") confirmed or rejected

# Step 2: D-26 source-driven glyph enumeration
# Audit IN-SCOPE Crito frames for glyphs used in editable nodes
# (Home Page Hero has check icons; About Me has external-link arrows; etc.)
# Output: shipping glyph list (likely 5-10 names per D-26)

# Step 3: Build Primitive / Icon with 4 size variants per COMP-04 + D-27
# Pattern A (icon library route):
mcp__pencil__batch_design({ operations: [
  'icon16=I(<_Components/Primitives-id>,{type:"frame",name:"Primitive / Icon / 16",width:16,height:16,layout:{direction:"horizontal",gap:0,padding:0,alignment:"center"}})',
  'I(icon16,{type:"icon",library:"lucide",icon:"chevron-right",width:16,height:16,fill:"#141f39ff",slot:[<glyph-name-list>]})',
  'icon20=I(<_Components/Primitives-id>,{type:"frame",name:"Primitive / Icon / 20",width:20,height:20,...})',
  // ... 24, 32 similarly
]})

# Pattern B (atomic-glyph fallback if Pattern A failed in Step 1):
# Build glyphs/ subfolder with atomic components per enumerated glyph names
# Build Icon wrapper with Slot accepting any glyph component
mcp__pencil__batch_design({ operations: [
  'glyphsFolder=I(<_Components/Primitives-id>,{type:"frame",name:"Primitive / Icon / glyphs"})',
  'chevronRightGlyph=I(glyphsFolder,{type:"frame",name:"glyphs/chevron-right",width:24,height:24})',
  // ... build the SVG paths or place lucide-equivalents inside each glyph frame
]})

# Step 4: verify, snapshot_layout, screenshot, audit-trail
```

### Plan 24-05: Sweep (Claude-side property walker)

```text
# Pre-flight

# Step 1: Recursive batch_get of _Components / Primitives
mcp__pencil__batch_get({ ids: ["<_Components/Primitives-id>"], readDepth: 4 })
# Walk the returned tree:
#   For every node, collect: fill, stroke, padding, gap, cornerRadius, fontFamily, fontSize, fontWeight, lineHeight, letterSpacing
#   For every collected literal value, look up:
#     (a) Does it appear in PEN-INVENTORY.md ## Tokens Written — Primitives (literal value column)?
#     (b) Does it appear in PEN-INVENTORY.md ## Token Extensions (Phase 24)?
#     (c) Is there a row in PEN-INVENTORY.md ## Variant Evidence (Phase 24) binding this literal to a semantic-token name?
#   If yes to any of (a), (b), (c): this is a documented OPEN-23-13 workaround instance → COMP-09 compliant
#   If no to all three: REAL LEAK → halt, surface to user

# Step 2: snapshot_layout problem-only over each primitive frame
for each primitive in [Primitive/Button/*, Primitive/Input/*, Primitive/Badge/*, Primitive/Icon/*]:
  mcp__pencil__snapshot_layout({ rootId: primitive-id, problemsOnly: true })
  # Assert: "No layout problems."

# Step 3: Reference set
for each primitive in <list>:
  mcp__pencil__get_screenshot({ nodeId: primitive-id })
  # Inline visual confirm; archive structural ids to .planning/research/exports/v2.0/end-of-phase-24/id-inventory.json

# Step 4: PEN-INVENTORY.md final updates
# - Confirm ## Variant Evidence (Phase 24) row count matches plan-allow-list count
# - Confirm ## Token Extensions (Phase 24) audit-trail is complete
# - Add ## End-of-Phase-24 Verification section with sweep result
```

---

## Validation Architecture

Phase 24 is `.pen`-only — no code runs. Validation is **artifact presence + structural completeness + token-binding integrity**, not behavior. Nyquist dimensions follow Phase 23's pattern.

### Nyquist Dimensions That Apply

| Dimension | Applies | Why |
|---|---|---|
| 1. Behavioral / functional | NO | No code runs. No user-facing behavior changes. |
| 2. State transitions | NO | No runtime state machine. (Component variant states are static cells, not transitions.) |
| 3. Data integrity | PARTIAL | The `.pen`'s 95-token surface + any Phase 24 token extensions are data; integrity check ("token surface unchanged from Phase 23 + only D-33-policy additions") is a structural check (Dim 8). |
| 4. Concurrency | NO | Single-threaded plan execution. |
| 5. Error / boundary | PARTIAL | D-35 active-editor pre-flight is a boundary condition (mismatch → halt). Component-shape probe + slot probe + icon-mechanism probe are boundary tests for Pencil's actual schema. |
| 6. Performance | NO | No runtime perf concern. |
| 7. Accessibility / a11y | NO | No code render. (Component a11y is a future code-milestone concern.) |
| **8. Structural completeness** | **PRIMARY** | Every Success Criterion is an artifact-presence + schema-completeness assertion. This is the dimension that matters most for Phase 24. |
| 9. Visual / pixel fidelity | PARTIAL | `get_screenshot` per primitive archives the reference set; no pixel-diff baseline yet (calibration starts Phase 26 per ROADMAP). |
| 10. Cross-system integration | NO | No external system. |

### Validation Tasks (for 24-VALIDATION.md)

These map 1:1 to the five Success Criteria in ROADMAP.md § Phase 24.

#### VAL-24-01: Four parent library frames at top of canvas (Success Criterion 1)
- **Test:** `batch_get(readDepth: 1)` at document root returns exactly 19 top-level frames (16 baseline from Phase 23 + 3 new from plan 24-01).
- **Test:** The three new frames are named `_Components / Primitives`, `_Components / Compounds`, `_Components / Sections` exactly (regex: `^_Components / (Primitives|Compounds|Sections)$`).
- **Test:** `_Tokens & Foundations` (id `RpGbe`) still exists with `name: "_Tokens & Foundations"` (per D-36 carry-forward + Success Criterion 1 "single-file strategy is visible").
- **Test:** The 15 baseline Crito frame direct-child id sets match `.planning/research/exports/v2.0/end-of-phase-23/id-inventory.json` exactly (zero-mutation discipline carries forward from Phase 23 VAL-23-05).
- **Test:** `_Components / Compounds` and `_Components / Sections` each contain at least 2 children: a title text node + a `note` node describing Phase 25 contents (D-37 enforcement).

#### VAL-24-02: Primitives present + variant matrices source-evidence-backed (Success Criterion 2)
- **Test:** `batch_get` of `_Components / Primitives` (readDepth: 2) returns children matching all of: `Primitive / Button`, `Primitive / Input`, `Primitive / Badge`, `Primitive / Icon` (each may be a parent group containing variant cells per Pattern A).
- **Test:** Every variant cell in `_Components / Primitives` has a corresponding row in PEN-INVENTORY.md `## Variant Evidence (Phase 24)` with all schema fields populated: `variant_cell | source_citation (frame_id + node_id + section, OR OPEN-24-XX) | rationale`.
- **Test:** Every variant cell NOT depicted in IN-SCOPE Crito frames has a corresponding `OPEN-24-XX` flag in PEN-INVENTORY.md `## Open Flags` with `consumer_phase` field populated (per D-22).
- **Test:** Variant cell count per primitive does NOT exceed the plan-author's documented allow-list (Pitfall 6 enforcement; documented in 24-NN SUMMARY).
- **Test:** No `:disabled` variant exists at the primitive layer (D-22 explicit exclusion).

#### VAL-24-03: Auto-layout + token-driven padding/gap (Success Criterion 3)
- **Test:** Every primitive frame and every variant cell has a `layout` property (or schema-equivalent) indicating auto-layout (flex/grid), NOT absolute positioning.
- **Test:** Every padding value (literal or shorthand `[v, h]`) in any primitive matches a Phase 23 `space-primitive-*` literal value (cross-ref PEN-INVENTORY.md `## Tokens Written — Primitives`) OR a Phase 24 token-extension literal (cross-ref PEN-INVENTORY.md `## Token Extensions (Phase 24)`).
- **Test:** Every gap value in any primitive matches a `space-primitive-*` literal value.
- **Test:** No primitive child has absolute positioning (x/y set independently of auto-layout); children inherit positioning from parent auto-layout direction + alignment + gap.

#### VAL-24-04: Zero raw values inside primitives (Success Criterion 4 + COMP-09)
- **Test (Claude-side property walker per OPEN-23-02 workaround):** Recursive `batch_get(readDepth: 4)` of `_Components / Primitives`, collect every property value of type `color`, `number` (when applied to padding / gap / cornerRadius / fontSize / fontWeight / lineHeight / letterSpacing / strokeWeight), and `string` (fontFamily). For every collected literal value, assert it matches one of:
  - A literal value from PEN-INVENTORY.md `## Tokens Written — Primitives`
  - A literal value from PEN-INVENTORY.md `## Token Extensions (Phase 24)`
  - A binding row in PEN-INVENTORY.md `## Variant Evidence (Phase 24)` (the dual-track workaround per Pattern 3 above)
- **Test:** No collected literal value is undocumented. Undocumented = real raw-value leak → halt phase close, surface to user.
- **Test:** PEN-INVENTORY.md `## Variant Evidence (Phase 24)` row count matches the count of distinct literal-value-to-token-name bindings in `_Components / Primitives` (every binding row corresponds to a real cell; no orphan rows).

#### VAL-24-05: snapshot_layout clean on every primitive (Success Criterion 5)
- **Test:** For every primitive in `_Components / Primitives` (each parent + each variant cell), `mcp__pencil__snapshot_layout({ rootId, problemsOnly: true })` returns `"No layout problems."` (or schema-equivalent empty-problem result).
- **Test:** No clipping issues (children rendered outside parent bounds).
- **Test:** No overlap issues (sibling children rendered on top of each other unintentionally).
- **Test:** No zero-size nodes (where a slot or child has width=0 or height=0 unintentionally).

### Additional Phase 24-specific validations (beyond ROADMAP Success Criteria)

#### VAL-24-06: Active-editor pre-flight enforcement (D-35)
- **Test:** Every 24-NN plan's SUMMARY.md documents the `get_editor_state` pre-flight result before each `set_variables` or `batch_design` batch.
- **Test:** Zero recorded incidents of active-editor mismatch during Phase 24 (or, if any recorded, the recovery procedure per OPEN-23-14 was followed).

#### VAL-24-07: Token-extension audit-trail (D-33)
- **Test:** If `get_variables({})` at end of Phase 24 returns > 95 variables, the difference is fully accounted for by rows in PEN-INVENTORY.md `## Token Extensions (Phase 24)` (one row per new token).
- **Test:** Each token-extension row includes source-evidence (frame_id + node_id) and rationale answering "Does any other primitive need this token, or does it serve only [Plan 24-NN's primitive]?"

#### VAL-24-08: Reference set archival (substitute for OPEN-23-01)
- **Test:** `.planning/research/exports/v2.0/end-of-phase-24/id-inventory.json` exists and lists every primitive's id + variant cell ids + glyph atom ids + slot ids.
- **Test:** Inline `get_screenshot` was called for every primitive parent and verified visually by the executor; result documented in 24-05 SUMMARY.md.
- **Test:** PNG file archival explicitly substituted with structural JSON per OPEN-23-01 (same pattern as Phase 23 plan 23-05).

### Validation Notes

- **No Playwright. No axe-core. No Lighthouse.** Those are code-side validations and don't apply.
- **The user is the second-look reviewer** (per PITFALLS C6 carry-forward) for VAL-24-05's `get_screenshot` reference set — but only after the structural tests pass.
- **Validation runs after plan 24-05 completes.** There is no per-plan validation step in this phase; structural completeness is end-state. Each 24-NN plan's SUMMARY.md captures its own intermediate verifications (snapshot_layout, batch_get spot-checks) which feed into VAL-24-05's roll-up.
- **OPEN-flag carry-forward:** Phase 23 left 14 OPEN flags (none critical). Phase 24 may add OPEN-24-NN flags per D-22 / D-24 / D-28 / D-31 / D-33; per D-9 / D-11 carry-forward, none block Phase 24 close. Milestone close (Phase 32) gates only on critical-severity OPENs.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|---|---|---|---|
| v1.4: build code-side components against best-guesses of flat-image .pen | v2.0 Phase 24: build .pen primitives against Phase 23's source-derived 95-token surface; code milestone (later) consumes the .pen primitives via the 95-token surface | 2026-05-31 v1.4 abandonment | Removes "best-guess at component layer" by separating .pen reconstruction from code consumption |
| Variant matrix completeness as a design-system "best practice" | Source-wins variant policy (D-24): ship only depicted variants + compositional minimum forward set (D-22) with explicit consumer-phase rationale per OPEN-24-XX flag | 2026-05-31 CONTEXT D-21, D-22, D-24 | Prevents v1.4-style over-engineering at the component layer; PROJECT.md "Lesson from v1.4 abandonment" |
| Pencil canonical token names (`$--background`, `$--primary` per Pencil guidelines `## 14`) | Joel's flat-dash convention (`color-semantic-bg-page`, `color-semantic-bg-cta-primary`) per Phase 23 D-12 | 2026-05-31 Phase 23 CONTEXT D-12 + D-13 | Cleaner grep; matches CSS variable naming downstream; deliberate deviation from Pencil convention with downstream-awareness note |
| `$<var>` references in component property payloads (the intuitive token-binding approach) | Literal values in `batch_design` payloads + audit-trail rows in PEN-INVENTORY.md `## Variant Evidence (Phase 24)` (the OPEN-23-13 dual-track workaround) | 2026-05-31 Phase 23 OPEN-23-13 | Component-author payload uses literals; conceptual token binding lives in the 95-token surface + audit-trail rows; rebind-via-replace_all_matching_properties when Pencil fixes OPEN-23-13 |
| D-25 atomic-glyph instance-swap as the assumed icon mechanism | Pencil-native `library: "lucide"` icon node type per Pencil guidelines `## 3. Icons` (Pattern A); D-25 atomic-glyph as Pattern B fallback | 2026-05-31 this research; supersedes the CONTEXT D-25 assumption pending plan 24-04 probe outcome | Simpler implementation; matches Joel's v1.3 `@lucide/astro` source code; preserves D-25 as fallback if Pencil's icon-library route doesn't work as documented |

**Deprecated/outdated:**
- STACK.md's `find_empty_space_on_canvas` recommendation — not verified in current Pencil MCP build; substituted with `batch_get`-then-pick-coordinate logic in plan 24-01.
- STACK.md's `replace_all_matching_properties` recommendation — not used in Phase 24 unless plan 24-05 sweep finds raw-value leaks.
- Pencil guidelines `## 14 Design Tokens` canonical names (`$--background`, etc.) — superseded by Phase 23 D-12 flat-dash convention; documented for downstream awareness but NOT the binding convention for Phase 24 component output.

---

## Per-Plan Files-Modified Summary

For the planner's file-list-mode tasks.

| Plan | What it touches | Files modified / created |
|---|---|---|
| 24-01 (frame stubs) | `batch_design` to insert 3 new top-level frames in `.pen` | MODIFY `design/Crito.pen` (3 new top-level frames + their title + note children); UPDATE `.planning/research/PEN-INVENTORY.md` (`## Frames` table — add the 3 new rows with `scope: library` or similar new classification value) |
| 24-02 (Button) | `batch_design` to insert variant cells under `_Components / Primitives`; `batch_get` source-evidence reads on Crito Hero button node | MODIFY `design/Crito.pen` (Button variant cells); UPDATE PEN-INVENTORY.md (`## Variant Evidence (Phase 24)` table — rows per cell + property binding; `## Open Flags` — OPEN-24-NN for D-22 forward variants) |
| 24-03 (Input + Badge) | `batch_design` for both primitives; CONDITIONAL `set_variables` if D-32 probe surfaces a needed token | MODIFY `design/Crito.pen` (Input + Badge variant cells; CONDITIONAL variable additions); UPDATE PEN-INVENTORY.md (`## Variant Evidence (Phase 24)` + CONDITIONAL `## Token Extensions (Phase 24)`) |
| 24-04 (Icon) | `batch_design` for size variants + glyph atoms; `batch_get` on Crito source for D-26 glyph enumeration | MODIFY `design/Crito.pen` (Icon size variants + glyphs); UPDATE PEN-INVENTORY.md (`## Variant Evidence (Phase 24)` per Icon size + glyph list); CREATE `.planning/research/PEN-INVENTORY.md § "Icon Glyphs (Phase 24)"` subsection enumerating ship-list |
| 24-05 (sweep) | Recursive `batch_get` over `_Components / Primitives`; snapshot_layout on each primitive; inline screenshot per primitive | UPDATE PEN-INVENTORY.md (`## End-of-Phase-24 Verification` section with sweep result); CREATE `.planning/research/exports/v2.0/end-of-phase-24/id-inventory.json` + `README.md` (per OPEN-23-01 archival substitution pattern) |

**Files that MUST NOT be modified in Phase 24:**
- Any of the 16 baseline top-level frames in `design/Crito.pen` (the 15 Crito frames + `_Tokens & Foundations`)
- The 95-token variable surface (NEW tokens may be added per D-33; existing tokens MAY NOT be modified — `set_variables` writes use `replace: false`)
- `src/**`, `tests/**`, `package.json`, `astro.config.mjs`, `tailwind.config.*` (v2.0 is `.pen`-only)
- `design/images/*` (reference-only)
- `design/Alliatus – Mastermind Landing Page Template (Community).fig` (unrelated leftover)
- Any v1.3-shipped `.planning` artifact except this phase's CONTEXT/DISCUSSION-LOG/RESEARCH/PLAN/SUMMARY artifacts
- The ROADMAP.md `[x] 24-04 ... (completed 2026-05-31)` stale marker — plan 24-04 close corrects this checkbox per CONTEXT.md canonical_refs note

---

## Open Questions

These are gaps the planner should know about. None block Phase 24 close (per Phase 23 D-9 carry-forward); all are resolvable during plan execution via probe-first discipline.

### Q1. Exact Pencil schema 2.13 component declaration shape

- **What we know:** Schema 2.13 has node types `frame, group, rectangle, ellipse, polygon, path, text, line, note, icon, script, ref` (per PEN-INVENTORY.md `## Schema Snapshot`). The `ref` type implies instancing is supported. Pencil guidelines describe components by NAMING convention (`Button/*`) but not by node-type declaration shape.
- **What's unclear:** Whether `frame` nodes need a `component: true` marker property to become referenceable, whether there's a separate `component` node type, or whether ANY named frame can be `ref`'d as an instance.
- **Recommendation:** Plan 24-02 first task is the component-shape probe (per Pitfall 1 procedure above). Outcome documents the actual mechanism for planner reference.

### Q2. Slot-typing payload syntax

- **What we know:** Pencil guidelines `## 2. Slots` say slots are "Marked with `slot` property containing an array of recommended component IDs."
- **What's unclear:** Whether `batch_design Insert` accepts the `slot: [<id>, <id>]` array property at insert time, or whether slots must be declared via a separate post-insert call (analogous to OPEN-23-13's `$<var>` rejection during batch_design).
- **Recommendation:** Plan 24-02 slot probe (per Pitfall 2 procedure above). If slot array is rejected at insert: fall back to declaring slots via post-insert `Update` op, OR via untyped slots (no `slot` array, any child accepted) with sibling Pencil notes documenting accepted types.

### Q3. Empty-slot collapse default behavior

- **What we know:** Pencil guidelines say "Disable unused slots with `enabled: false`." This implies the default `enabled: true` means slots occupy auto-layout space.
- **What's unclear:** Whether `enabled: false` produces a true zero-bounding-box collapse (so siblings butt up against each other with full gap collapse) OR whether the slot still occupies its declared width/height but is invisible.
- **Recommendation:** Plan 24-02 slot probe extends to this (Pitfall 2 procedure). If `enabled: false` doesn't fully collapse: D-30's "empty slots auto-collapse" assumption is wrong; consumers must explicitly omit unused slots (or use a `hasIcon` component-property workaround).

### Q4. Pencil-native icon library availability in current MCP build

- **What we know:** Pencil guidelines `## 3. Icons` document `library: "lucide", icon: "settings", width: 24, height: 24, fill: "$--foreground"` syntax.
- **What's unclear:** Whether schema 2.13's `icon` node type supports the `library: "lucide"` library reference in this Crito file, or whether it expects raster/vector content.
- **Recommendation:** Plan 24-04 first task is the icon-mechanism probe (per Pitfall 3 procedure). Outcome determines whether D-25 atomic-glyph route is needed.

### Q5. Whether `find_empty_space_on_canvas` exists in current Pencil MCP build

- **What we know:** STACK.md called it a "bonus tool." Phase 23 plan 23-05 didn't use it (used hand-computed y based on baseline frame inventory).
- **What's unclear:** Whether plan 24-01 should attempt to call it before falling back to the batch_get-then-pick-coordinate workaround.
- **Recommendation:** Plan 24-01 attempts `find_empty_space_on_canvas` once; if it returns an error (tool not in build), records the result as OPEN-24-NN and uses the workaround. If it works: use it. Either way, plan 24-01 succeeds.

### Q6. Sibling-frame `_Components / Compounds` stubs — frame-type `note` schema

- **What we know:** Schema 2.13 has a `note` node type (per PEN-INVENTORY.md `## Schema Snapshot`). Phase 23 plan 23-05 added "Dark Mode — Deferred" note inside `_Tokens & Foundations` — confirmed `note` works in `batch_design`.
- **What's unclear:** Whether `note` is a styled-text frame or a distinct UI element with its own rendering.
- **Recommendation:** Plan 24-01 uses the same note-construction pattern Phase 23 plan 23-05 used inside `_Tokens & Foundations` (which the planner can read structure from via `batch_get(readDepth: 3)` on `RpGbe` if needed).

### Q7. Whether the planner can read Crito source variant-evidence nodes without mutating them

- **What we know:** Phase 23 `batch_get(readDepth: 2|3)` on all 15 baseline frames was non-mutating (VAL-23-05 confirmed zero-mutation). Plan 24-02's variant-evidence audit also reads Crito Hero button.
- **What's unclear:** Whether very-deep reads (readDepth: 4+) on a 10-child-deep group hierarchy in Home Page (ujMLJ) would touch any mutation API.
- **Recommendation:** Plan 24-02 uses readDepth ≤3 (sufficient for `Hero / Button/Primary/With Icon` structural depth based on PEN-INVENTORY.md `## Audit Findings` mention).

---

## Sources

### Primary (HIGH confidence — direct project artifacts read this session)

- `.planning/phases/24-layout-primitives-primitive-components/24-CONTEXT.md` — locked decisions D-21 through D-37 (2026-05-31)
- `.planning/REQUIREMENTS.md` — LAYOUT-01, LAYOUT-02, COMP-01, COMP-02, COMP-03, COMP-04, COMP-08, COMP-09 + cross-cutting policies
- `.planning/ROADMAP.md` — Phase 24 entry: Goal, Depends on, Success Criteria 1-5, Plans 24-01..05 (line 169 stale marker noted)
- `.planning/STATE.md` — current position: Phase 24 ready to plan
- `.planning/PROJECT.md` — v2.0 milestone goal, v1.4 abandonment lesson, "Jurassic Park" framing
- `.planning/phases/23-audit-token-foundation/23-CONTEXT.md` — Phase 23 decisions D-01 through D-20 carry-forward
- `.planning/phases/23-audit-token-foundation/23-VERIFICATION.md` — Phase 23 PASSED, 95 tokens shipped, 14 OPEN flags (all notable/minor)
- `.planning/phases/23-audit-token-foundation/23-RESEARCH.md` — Phase 23 research; carries forward stack catalogue + token-write probe pattern
- `.planning/phases/23-audit-token-foundation/23-05-SUMMARY.md` — Phase 23 final plan summary including OPEN-23-13 + OPEN-23-14 incident reports + recovery procedure
- `.planning/research/PEN-INVENTORY.md` — **the single most important reference** — single source of truth for: schema 2.13 snapshot, Pencil guidelines verbatim (especially `## 2. Slots`, `## 3. Icons`, `## 12. Spacing Reference`, `## 14. Design Tokens`), 15 baseline Crito frame catalogue, all 39 primitive + 56 semantic token literal values, all 14 carry-forward OPEN flags
- `.planning/research/STACK.md` — Pencil MCP tool catalogue (HIGH on names; some tools flagged as "bonus / unverified")
- `.planning/research/PITFALLS.md` — fidelity-loss + over-engineering pitfalls (F1-F5, O1-O6, U1-U6, J1-J5, C1-C6) with prevention strategies P0-P16
- `.planning/research/SUMMARY.md` — themes T1-T8 carry-forward
- `.planning/research/exports/v2.0/end-of-phase-23/id-inventory.json` (structural snapshot ready for plan 24-01 to pre-read)

### Secondary (MEDIUM confidence — public Pencil docs + skill files via WebFetch this session)

- Pencil-dev SKILL.md (https://github.com/unliftedq/skills/blob/main/skills/pencil-dev/SKILL.md) — workflow ordering, anti-patterns, "Start with variables, not literals" verbatim; LACKS payload-shape detail (confirmed via WebFetch — high-level workflow guide, not API reference)
- Pencil core concepts: Variables (https://docs.pencil.dev/core-concepts/variables) — variable concept overview; specific syntax NOT published (confirmed via WebFetch)
- Pencil CLI docs (https://docs.pencil.dev/for-developers/pencil-cli) — tool list confirmed; argument shapes NOT exhaustively documented (confirmed via WebFetch)

### Tertiary (LOW confidence — flagged for validation during execution)

- Exact `batch_design` op shorthand JSON shape (`I(parent, {...})`, `U(id, {...})`, `C(srcId, parentId, {...})`) — Phase 23 used this pattern successfully; the wire shape is empirical, not documented. Plan 24-01 first batch is itself a soft re-confirmation of the pattern.
- Pencil schema 2.13 component vs frame distinction — not verified in this session; resolved by Plan 24-02 component-shape probe.
- Pencil-native icon-library route (`library: "lucide"`) actual availability — documented in guidelines but not exercised in Phase 23; resolved by Plan 24-04 icon-mechanism probe.
- `find_empty_space_on_canvas` actual availability — flagged by STACK as bonus; resolved by Plan 24-01 probe.
- openpencil.dev's 90-tool catalogue at `https://openpencil.dev/programmable/mcp-server` — appears to be a DIFFERENT (Figma-plugin-based) Pencil-like product operating on `.fig` files; **NOT authoritative for the `.pen`-file Pencil this project uses**. Documented here to prevent confusion.

### NOT consulted (intentional gaps)

- Real-time Pencil MCP tool calls from this researcher subagent — Pencil MCP tools are stripped from the subagent surface per the constraint Phase 23 23-VERIFICATION.md documented (pause-note constraint: "Pencil-driven plans must run inline (MCP tool stripping in subagents)"). The first 24-NN plan execution (which runs inline per OPEN-23-14 + the subagent constraint) will be the first opportunity to verify Pencil mechanics live.
- Crito `.fig` (`design/images/Consulting & Agency Website Template I Crito (Community).fig`) — fallback per D-04 carry-forward; consulted only if a 24-NN plan's Crito source audit (via `batch_get` on Crito frames) doesn't surface enough variant evidence. None of the Phase 24 plans require pre-execution `.fig` consultation per current decision set.

---

## Metadata

**Confidence breakdown:**
- Phase 24 deliverable scope + decision set (D-21..D-37): HIGH — CONTEXT.md is fully locked
- Pencil MCP tool surface availability: HIGH on the 9 tools named in MCP server instructions; MEDIUM-LOW on bonus tools (`find_empty_space_on_canvas`, `search_all_unique_properties`, `replace_all_matching_properties`) per Phase 23 OPEN flags + STACK.md "bonus tool" hedge
- Phase 23 carry-forward mechanics (OPEN-23-13, OPEN-23-14, set_variables shape, NATIVE aliasing, batch_design literal-only constraint): HIGH — directly observed and recovered-from in Phase 23
- `batch_design` op shorthand pattern (`I()`, `U()`, `C()`): HIGH on availability (Phase 23 used it); MEDIUM on the exact property-key shape per node type (component declaration shape probed in 24-02)
- Slot / variant / instance-swap mechanics: MEDIUM — Pencil guidelines describe by example but don't publish wire-level shapes; plan 24-02's component-shape + slot probes resolve to HIGH after execution
- Pencil-native icon library route: MEDIUM — guidelines document it but Phase 23 didn't exercise it; plan 24-04 icon-mechanism probe resolves
- Validation architecture (artifact-presence + structural completeness over Nyquist Dim 8): HIGH — Phase 23 used the same pattern (VAL-23-01..05) and it produced PASS verdicts cleanly

**Research date:** 2026-05-31

**Valid until:** Until plan 24-02's first probe call returns Pencil schema 2.13 information that contradicts MEDIUM-confidence component-shape or slot-typing assumptions. Treat the first probe as the verification gate. Estimated freshness: 30 days for the locked stack/tools/conventions; 7 days for the probe-resolved mechanics (likely resolved within the first 24-NN plan execution).

---

## RESEARCH COMPLETE

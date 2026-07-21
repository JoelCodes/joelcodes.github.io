# Phase 27: Thank-you + Contact Reconstruction — Research

**Researched:** 2026-06-07
**Domain:** Pencil 2.13 form-primitive authoring + dual-branch page-frame composition (joel-only + crito-source-flat-raster) under inherited CALIBRATION-PROTOCOL § 3 + § 4
**Confidence:** HIGH for Pencil MCP mechanics (Phase 23–26 production-confirmed), HIGH for v1.3 content extraction, HIGH for token-surface reuse (zero new tokens), MEDIUM for cl8tt raster image-import-NN.jpg index identification (deferred to plan-execution probe), HIGH for foundation deliverable shape

---

## Summary

Phase 27 ships TWO new top-level page frames (`Thank-you` joel-only-no-crito-ref + `Contact` crito-source-present-flat-raster sub-case) plus FIVE new library entries (one Input variant + one label-slot UPDATE on existing Input + two sibling primitives + one compound) inside `design/Crito.pen`. All strategic decisions are LOCKED in CONTEXT.md D-89 through D-104 — this research does NOT re-litigate them. The research output is concrete, Phase-27-actionable answers to the 10 technical questions the planner will encode into Plans 27-00 (foundation), 27-01 (Thank-you), 27-02 (Contact).

Phase 27 is the second per-page reconstruction phase after Phase 26's protocol-establishing FAQ + 404 work, and the FIRST phase to use BOTH calibration branches in one phase (CALIBRATION-PROTOCOL § 2 branch matrix: Thank-you joel-only per § 4, Contact crito-source flat-raster per § 3 + § 3.3 ACTIVE). Foundation-first plan ordering (D-101) is justified by the deepest-dependency rule — Plan 27-02's 8-field form requires Plan 27-00's primitives to exist first.

Four findings drive plan shape:

1. **Hybrid library strategy (D-89) is structurally distinct from prior Phase 24/25 library work.** Phase 27 mixes a variant extension (Textarea on existing Input nwJk7), a slot-signature UPDATE to an existing component (label-slot `required-mark` mechanic — first time Phase 27 MUTATES a Phase 24 baseline ID, requiring extra care), TWO sibling primitives (Select + Checkbox, each with Default/Focus/Error trinity per D-90), and ONE compound (CheckboxGroup composing Checkbox refs). Plan 27-00 ships all five in roughly the order: label-slot UPDATE → Textarea variant → Select primitive → Checkbox primitive → CheckboxGroup compound, because later items depend on earlier ones (CheckboxGroup needs Checkbox, label-slot UPDATE needs to land before the Textarea variant inherits it).

2. **cl8tt raster image-import-NN.jpg index is unknown at research time — must be probed at Plan 27-02 execution.** The Phase 23 audit (OPEN-23-05) catalogued cl8tt as `flat:1` (single image-import-*.jpg rectangle), but did NOT record which numeric index. Plan 27-02 Task 0 MUST call `batch_get({ nodeIds: ['cl8tt'], readDepth: 2 })` to read the `fill.image` reference and identify the matching `image-import-NN.jpg` in `design/images/`. This identifier is the side-by-side calibration artifact identifier per CALIBRATION-PROTOCOL § 3.5. Visual inspection of `design/images/` (probably image-import-08.jpg through image-import-12.jpg range, by numbered-page pattern) is the fallback.

3. **PAGE-11 ACTIVE for Contact is a first-of-its-kind Phase 27 mechanic.** Phase 26 codified PAGE-11 ACTIVE in CALIBRATION-PROTOCOL § 3.3 but Phase 26 only ran joel-only branch (PAGE-11 INERT). Plan 27-02 is the FIRST production use of the `Update(cl8tt, { enabled: false })` after-APPROVE step. PEN-INVENTORY `status_counts` for cl8tt moves from `flat:1` to `hidden:1` (or similar — exact label per D-104). The mutation MUST happen AFTER user APPROVES the side-by-side calibration gate, not before.

4. **Phase 27 adds ZERO new tokens.** Unlike Phase 26 (which added 5 tokens for heading-2-*), Phase 27's new primitives reuse the existing 100-token surface entirely: Textarea reuses Input's tokens; Select reuses Input's tokens + Icon/16 for chevron; Checkbox reuses existing color/space/radius tokens; CheckboxGroup reuses stack tokens. The `required-mark` `*` reuses `color-semantic-text-error` (→ `color-primitive-red-400`) per D-91. `get_variables({})` MUST return count `100` at every Plan 27-NN open AND close.

**Primary recommendation:** Plan 27-00 ordering = (1) pre-flight `get_editor_state` + `get_variables` (verify 100 tokens); (2) `batch_get` baseline IDs intact (35-ID expected-unmutated list from end-of-phase-26/id-inventory.json `expected_baseline_ids_unmutated` + Phase 26 additions Hs5rc + N1jo3i); (3) `batch_design` UPDATE Primitive/Input/Default `oCeJP` label-slot → convert from leaf text node to horizontal-layout frame containing [label-text-node, required-mark-text-node `enabled:false` default]; (4) `batch_design` Insert Textarea variant inside avgor; (5) `batch_design` Insert Primitive/Select Default/Focus/Error; (6) `batch_design` Insert Primitive/Checkbox Default/Focus/Error; (7) `batch_design` Insert Compound/CheckboxGroup inside t67DU6; (8) PEN-INVENTORY extensions. Plans 27-01 + 27-02 follow CALIBRATION-PROTOCOL § 4.4 + § 3.4 scripts respectively.

---

## Standard Stack

The established tooling and component vocabulary for Phase 27. ALL items are Phase 23–26 carry-forward — Phase 27 introduces ZERO new tools, ZERO new tokens, ZERO new MCP patterns.

### Core (Pencil MCP — production-confirmed across Phases 23–26)

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| `mcp__pencil__get_editor_state` | schema 2.13 | Pre-flight active-editor assertion per D-103 | Phase 26 used 14× across 4 plans with 0 mismatch incidents; D-103 carry-forward from D-87 |
| `mcp__pencil__get_guidelines` | live | Design System guide (call at Plan 27-00 start) | Confirms current slot mechanics + variant authoring conventions for new primitives |
| `mcp__pencil__batch_get` | live | Baseline-drift verification + cl8tt raster image probe | Phase 26 baseline-unmutated list at `end-of-phase-26/id-inventory.json` `expected_baseline_ids_unmutated` |
| `mcp__pencil__batch_design` | live | Insert/Update — 5 new library entries + 2 page frames + cl8tt hide | Phase 26 standard mechanism; chunk to ≤ 25 ops per call |
| `mcp__pencil__get_variables` | live | Verify 100-token surface intact (Phase 27 adds zero) | Token-drift sanity at every plan open + close |
| `mcp__pencil__find_empty_space_on_canvas` | live | Page-frame placement with `nodeId` anchor per CALIBRATION-PROTOCOL § 10.4 | Plan 27-01 anchors on `csXky` (404, Phase 26); Plan 27-02 anchors on `<Thank-you-frame-id>` from 27-01 close |
| `mcp__pencil__get_screenshot` | live | Inline calibration renders per § 3.4 / § 4.4 (NOT disk-written) | OPEN-23-01 inline-only substitution; OPEN-26-02 Tier-1/Tier-2 stale-cache workaround applies |
| `mcp__pencil__snapshot_layout` | live | `{ problemsOnly: true }` at per-plan close per Phase 24/25/26 precedent | Document-level returns "No layout problems."; per-frame text-clipping false-positives documented as benign |
| ~~`mcp__pencil__export_nodes`~~ | BROKEN | n/a | MCP error -32603 per OPEN-23-01; substituted by `id-inventory.json` archival |
| ~~`mcp__pencil__set_variables`~~ | not used | Phase 27 adds zero tokens (D-91 reuses error color) | Token surface stays at 100 across the entire phase |

### Library components instanced + UPDATED by Phase 27 (from end-of-phase-26 id-inventory.json — verified)

| Component | id | Source plan | Phase 27 use |
|-----------|----|-----------|----|
| `Primitive / Button / Default` | `M7eUr` | 24-02 | Section/CTA actions-slot (Thank-you Calendly Button); Contact form Submit Button; Contact sidebar Card footer-actions Button |
| `Primitive / Button / Secondary` | `hIWuC` | 25-01 | (Optional) Thank-you "Return to homepage" secondary link if upgraded from text-link per Claude's Discretion |
| `Primitive / Input / Default` | `nwJk7` | 24-03 | **UPDATED in Plan 27-00** — label-slot `oCeJP` extended with `required-mark` text node (D-91); Contact form Name/Email/Company/Message field instances |
| `Primitive / Input / Focus` | `TnODC` | 24-03 | Contact form first real Focus consumer per OPEN-24-08 |
| `Primitive / Input / Error` | `qPSVW` | 24-03 | Contact form first real Error consumer per OPEN-24-09 |
| `Primitive / Icon / 16` | `EQaMf` | 24-04 | Select chevron-down glyph (Pattern A — lucide native `chevron-down`) per D-92 |
| `Primitive / Icon / 32` | `dpO5Y` | 24-04 | Thank-you success-message indicator (Pattern A — lucide native `circle-check`) per D-100 |
| `Section / Header` | `G0wNOc` | 25-01 | Top of both Thank-you + Contact page frames; Crito-source nav labels stay literal per D-95 + D-99 |
| `Section / Footer` | `Xs0Hs` | 25-02 | Bottom of both Thank-you + Contact page frames |
| `Compound / Card` | `t40xct` | 25-03 | Contact sidebar instance per D-96 — image:enabled:false + title/body/footer-actions filled |
| `Section / CTA` | `Hs5rc` | 26-00 | Thank-you Section/CTA-Calendly per D-93 — first cross-phase consumer of the Phase 26 reusability claim |
| ~~`Section / NavBack`~~ | `N1jo3i` | 26-00 | **NOT used** — D-79 + D-99 explicit (Thank-you secondary link is plain text node, not NavBack) |

### Library parent frames (where new Phase 27 work lands)

| Parent | id | Phase 27 contribution |
|--------|----|----|
| `_Components / Primitives` (avgor) | `avgor` | NEW children: `Primitive / Input / Textarea` variant + `Primitive / Select` (× 3 variants) + `Primitive / Checkbox` (× 3 variants) — total 7 new reusable nodes. Plus UPDATE to `nwJk7`'s `oCeJP` label-slot. |
| `_Components / Compounds` (t67DU6) | `t67DU6` | NEW child: `Compound / CheckboxGroup` composition |
| `_Components / Sections` (g9oRa5) | `g9oRa5` | READ-ONLY — no new sections; Section/CTA + Section/Header + Section/Footer instanced as-is |
| `_Tokens & Foundations` (RpGbe) | `RpGbe` | READ-ONLY — calibration pairs against THIS frame on Plan 27-01 joel-only branch per § 4.1 |

### Baseline IDs that MUST remain unmutated through Phase 27 (35 IDs)

From `.planning/research/exports/v2.0/end-of-phase-26/id-inventory.json` `expected_baseline_ids_unmutated`:

**Crito source frames (15):** `MIXGf, QdwxP, kicJ8, ujMLJ, VleVl, cl8tt, w1m3x, DzqTm, cYlRH, Y2isa, WDGxc, 1nLS3, Jmdw0, maDc3, IKAu3`

**Library parents (3) + Foundations (1):** `RpGbe, avgor, t67DU6, g9oRa5`

**Phase 24 primitives (12):** `M7eUr, YJhRv, gQa2R, AvKtA, V4Dx4i, ATJK9, nwJk7, j0FxQZ, EQaMf, yRvGb, u7NmaS, dpO5Y`

**Phase 25 additions (5):** `hIWuC, AzmgQ, G0wNOc, Xs0Hs, t40xct`

**Phase 26 additions (2):** `Hs5rc, N1jo3i` (Section/CTA + Section/NavBack)

**Phase 26 page frames (2):** `b7Hgy` (FAQ), `csXky` (404)

**IMPORTANT — Plan 27-00 mutates `nwJk7` descendant `oCeJP` (the label-slot text node) — NOT `nwJk7` itself.** The Phase 24 primitive parent's properties (reusable, width, layout, gap, padding, fill, stroke, cornerRadius) MUST remain unchanged. Only the internal `oCeJP` node converts from leaf text → horizontal-layout frame containing original text + new `required-mark` text node. Plan 27-02 mutates `cl8tt` `enabled:false` after Plan 27-02 user APPROVE — this IS an intentional cl8tt mutation per PAGE-11 ACTIVE; document explicitly in PEN-INVENTORY status_counts update.

### Page-frame placement coordinates

From Phase 26 `id-inventory.json`:
- FAQ frame `b7Hgy`: `x: 16327.27, y: -4111.55` (page-frame row)
- 404 frame `csXky`: `x: 17847.27, y: -4111.55` (page-frame row)

Plan 27-01 FindEmptySpace with `nodeId: csXky` → expected placement around `x: 19367.27, y: -4111.55` (continues the page-frame row pattern, +1520 spacing). Plan 27-02 FindEmptySpace with `nodeId: <Thank-you-frame-id>` → expected placement around `x: 20887.27, y: -4111.55`. Exact x-coordinates returned by the tool; the `nodeId` anchor pattern (CALIBRATION-PROTOCOL § 10.4) guarantees same-row placement.

### Alternatives Considered (and rejected)

| Instead of | Could Use | Why rejected |
|-----------|-----------|-----|
| Three-variant Textarea (Default/Focus/Error) | Single Textarea variant (D-90 explicit) | Phase 24 Input ships Focus + Error as siblings of Default; instances pick variant. Textarea inherits Focus/Error visual via consistent rendering of stroke override — single Textarea variant is sufficient |
| Building `Section / Calendly` reusable component | Sibling Pencil note convention per D-93 | Pitfall O5/O6 — single-pattern wouldn't justify a new section; sibling note is Phase 25 D-52 belt-and-suspenders precedent |
| Compound/Card 4-slot reuse for CheckboxGroup | NEW Compound/CheckboxGroup per D-89 | image-slot is wrong shape (no image); title-slot semantically wrong (it's a `<legend>`-like label, not a card title); footer-actions-slot wrong (CheckboxGroup has no CTA). Distinct 3-slot signature (legend + options + helper) is the right tool |
| Single-state Select (just Default) | Default/Focus/Error trinity per D-90 | Real form consumer (Contact form) exercises Focus (tab through fields) and Error (Budget/Timeline could fail validation in future iterations). Trinity ships per Phase 24 D-22 compositional minimum |
| Disabled state variants for new primitives | Out of scope per CONTEXT D-90 + Deferred Ideas | Phase 24 didn't ship Disabled for Button/Input; adding for Phase 27 would create inconsistency; deferred to future state-coverage extension phase |
| Open-dropdown popover Select variant | Closed-state only per D-92 | D-59 precedent (FAQ accordion is static reading state, not interaction state); open-dropdown is code-side runtime concern |
| `Section / NavBack` for Thank-you "Return to homepage" | Plain text node per D-99 | NavBack is 404-narrow per D-79; Thank-you secondary link is single muted text link, not a 4-link nav-back row |

---

## Architecture Patterns

### Recommended Plan Order (D-101 — foundation-first, sequential, no waves)

```
Plan 27-00 (foundation, NO calibration gate per D-102)
  ├── Task 0: pre-flight get_editor_state + get_guidelines + get_variables (verify 100 tokens)
  ├── Task 1: batch_get baseline IDs intact (35 expected_baseline_ids_unmutated)
  ├── Task 2: batch_design UPDATE nwJk7's oCeJP label-slot — convert leaf text → h-layout frame
  │           containing [label-text-node, required-mark-text-node enabled:false default]
  ├── Task 3: batch_design Insert Primitive/Input/Textarea variant inside avgor
  ├── Task 4: batch_design Insert Primitive/Select Default + Focus + Error inside avgor
  ├── Task 5: batch_design Insert Primitive/Checkbox Default + Focus + Error inside avgor
  ├── Task 6: batch_design Insert Compound/CheckboxGroup inside t67DU6
  ├── Task 7: snapshot_layout problemsOnly + PEN-INVENTORY extensions
  └── Close: NO user calibration gate (D-102 — foundation plan agent-deterministic per Phase 26 D-86)

Plan 27-01 (Thank-you page frame — joel-only branch per CALIBRATION-PROTOCOL § 4)
  ├── Task 0: pre-flight + verify Plan 27-00 outputs intact (token count 100; 7 new library nodes)
  ├── Task 1: find_empty_space_on_canvas with nodeId: csXky → batch_design Thank-you page frame
  ├── Task 2: Insert Section/Header ref (G0wNOc)
  ├── Task 3: Insert success-message section
  │           (Primitive/Icon/32 with circle-check + heading + body — joel-only fresh design)
  ├── Task 4: Insert Section/CTA ref (Hs5rc) — Calendly placeholder per D-93 + D-94
  │           descendants override headline + actions Button label + sibling Pencil note for URL
  ├── Task 5: Insert optional secondary "Return to homepage" text-link
  ├── Task 6: Insert Section/Footer ref (Xs0Hs)
  ├── Task 7: snapshot_layout problemsOnly + fit_content height update
  ├── Task 8: per-section get_screenshot + AskUserQuestion calibration gate per § 4.5 format
  │           (OPEN-26-02 Tier-1 stale-cache workaround available; Tier-2 user-side editor fallback)
  └── Task 9: PEN-INVENTORY extensions + close

Plan 27-02 (Contact page frame — crito-source flat-raster sub-case per CALIBRATION-PROTOCOL § 3)
  ├── Task 0: pre-flight + verify 27-00 + 27-01 outputs intact + IDENTIFY cl8tt raster image-import index
  │           (batch_get cl8tt readDepth: 2 → read fill.image reference → identify image-import-NN.jpg)
  ├── Task 1: find_empty_space_on_canvas with nodeId: <Thank-you-frame-id> → batch_design Contact frame
  ├── Task 2: Insert Section/Header ref (G0wNOc)
  ├── Task 3: Insert page-intro section ("Let's Talk" heading + 48-hours body per D-100)
  ├── Task 4: Insert 2-col asymmetric grid frame (form 2fr left + sidebar 1fr right)
  │           (horizontal-layout frame, alignItems:flex_start, form ≈ 800 + sidebar ≈ 400 + gap ≈ 32)
  ├── Task 5: Insert 8-field form composition per D-97 (8 instances + Submit Button + privacy line)
  ├── Task 6: Insert Compound/Card sidebar instance per D-96
  ├── Task 7: Insert Section/Footer ref (Xs0Hs)
  ├── Task 8: snapshot_layout problemsOnly + fit_content height update
  ├── Task 9: per-section get_screenshot + side-by-side with cl8tt raster image-import-NN.jpg
  │           + AskUserQuestion calibration gate per § 3.4 format
  ├── Task 10: ON APPROVE → batch_design Update(cl8tt, { enabled: false }) per PAGE-11 ACTIVE
  │            PEN-INVENTORY status_counts cl8tt flat:1 → hidden:1
  └── Task 11: PEN-INVENTORY extensions + close
```

### Pattern 1: Primitive/Input label-slot extension via in-place UPDATE (D-91)

**What:** Convert Phase 24's Input `oCeJP` label slot from a leaf `text` node into a horizontal-layout `frame` containing two child text nodes — the original label text + a new `required-mark` text node with `enabled: false` default. Existing instances (Plan 26-00 / 26-01 / 26-02 if any consumed Input — none did) inherit gracefully because the slot's outer ID `oCeJP` stays the same; only its internal structure changes.

**Critical risk:** This is the FIRST Phase 27 mutation that changes a Phase 24 baseline ID's descendants. Phase 24's `oCeJP` was originally a `text` node with `content`, `fontFamily`, `fontSize`, `fontWeight`, `fill`. The UPDATE replaces type from `text` → `frame`, gives it auto-layout horizontal + gap (e.g., 4), and inserts the original text + new required-mark as children. Pencil's UPDATE mechanics for type-conversion need verification at Plan 27-00 Task 2 — if `type` cannot be updated in place, the FALLBACK is: (a) Delete oCeJP via batch_design, (b) Insert new frame with same name "label-slot" + same parent + same position, (c) populate children. The fallback changes the ID — document in PEN-INVENTORY Variant Evidence row + sibling note.

**Recommended sub-mechanism (probe Plan 27-00 Task 2 first):**

```js
// Probe: can batch_design Update change a node's type?
// If YES — preferred path (preserves oCeJP ID):
mcp__pencil__batch_design({
  operations: `
    Update("oCeJP", {
      type: "frame",            // was "text" — type-conversion probe
      layout: "horizontal",
      gap: 4,
      alignItems: "baseline",
      padding: 0
    })
    // Original label text becomes child 1
    labelText = I("oCeJP", {
      type: "text",
      content: "Label",
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: "400",
      fill: "#141f39ff",       // color-semantic-text-primary
      lineHeight: 1.4
    })
    // Required-mark becomes child 2 (default disabled)
    requiredMark = I("oCeJP", {
      type: "text",
      name: "required-mark",
      content: "*",
      enabled: false,           // default off
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: "400",
      fill: "#eb5757ff"        // color-semantic-text-error
    })
  `
})

// If NO (type-conversion not supported) — Delete + recreate path with name preservation
// AND consumer-instance update via descendants override:
// Plan 27-02 Contact form instances enable required-mark via:
//   descendants: { "<requiredMarkId>": { enabled: true } } for Name + Email + Message fields
```

**Why this matters for the planner:** The required-mark mechanic is the foundation for D-97's "Joel's 8-field form" where Name + Email + Message ship with `required-mark: enabled: true` and Company + Challenges + Budget + Timeline ship with the default `enabled: false`. The "(optional)" text Joel's v1.3 has next to optional fields is a separate concern handled at instance-time via either descendants override on the label text OR a supplemental text node — Plan 27-02 decides per cl8tt raster cues + Joel's v1.3 verbatim shape (D-97 ships Joel's "(optional)" text).

### Pattern 2: Primitive/Input/Textarea variant (D-89)

**What:** New variant inside `_Components / Primitives` (avgor) — sibling to Default/Focus/Error per Pencil 2.13's variant-as-sibling-component convention (Phase 25 D-43 finding: Frame schema has NO variant-axis property; variants are siblings using naming convention).

**Slot signature reuses Input's:** label / control / helper / errorSlot. The ONLY structural difference from Default is `control`'s minHeight or fixed height — taller for multi-line content. v1.3 uses `rows={4}` and `rows={6}`; Pencil ships ONE Textarea variant with default-tall control. Recommendation: `control` height = `120` (approx 4-row default; consumers resize via instance fill_container or fixed-height override). Alternative: `control` layout `vertical` with multi-line text growth — but Pencil text nodes inside frames use auto-grow patterns per Plan 24-03.

**`batch_design` shape (Plan 27-00 Task 3, abridged):**

```js
textareaVariant = I(avgor, {
  type: "frame",
  name: "Primitive / Input / Textarea",
  reusable: true,
  width: 320,                         // matches Input library preview default
  layout: "vertical",
  gap: 16,                            // space-semantic-stack-sm (same as Input Default)
  padding: 0,
  fill: "transparent"
})

// label-slot — INHERITS Phase 27 Task 2 label-slot pattern (frame with text + required-mark)
labelSlot = I(textareaVariant, {
  type: "frame",
  name: "label-slot",
  layout: "horizontal",
  gap: 4,
  alignItems: "baseline",
  contains: [
    { type: "text", content: "Label", fontFamily: "Inter", fontSize: 14, fontWeight: "400", fill: "#141f39ff", lineHeight: 1.4 },
    { type: "text", name: "required-mark", content: "*", enabled: false, fontFamily: "Inter", fontSize: 14, fontWeight: "400", fill: "#eb5757ff" }
  ]
})

// control-slot — vertical-layout, taller
control = I(textareaVariant, {
  type: "frame",
  name: "control",
  layout: "vertical",                 // vertical for multi-line content
  gap: 0,
  padding: [12, 16],                  // 12 top/bottom (taller than Input's 8); 16 sides
  width: "fill_container",
  height: 120,                        // default-tall; consumers override per rows
  fill: "#ffffffff",
  stroke: "#d4d4d8ff",
  strokeWidth: 1,
  cornerRadius: 10,
  contains: [
    {
      type: "text",
      name: "placeholder",
      content: "Multi-line placeholder text",
      fontFamily: "Inter",
      fontSize: 16,
      fontWeight: "400",
      fill: "#52525bff",
      lineHeight: 1.625
    }
  ]
})

// helper-slot — same as Input Default
helperSlot = I(textareaVariant, { /* helper text typography */ })

// errorSlot — same as Input Default (enabled:false)
errorSlot = I(textareaVariant, { name: "errorSlot", enabled: false, /* ... */ })
```

**Confidence:** HIGH for structure (mirrors Input Default). MEDIUM for exact `control` height default value (120 is plausible; verify visually at Plan 27-00 Task 7 snapshot review).

### Pattern 3: Primitive/Select Default/Focus/Error trinity (D-89 + D-90 + D-92)

**What:** New sibling primitive inside avgor. Distinct shape from Input — control frame contains placeholder text + chevron-down Icon Size 16 instance + closed-state-only popover representation (D-92). Same outer label/control/helper/errorSlot structural pattern as Input for consistency.

**chevron-down Icon: Pattern A native lucide.** Phase 24 D-44 + Phase 25 D-45 confirm Pattern A works in Pencil 2.13. `chevron-down` is already on Crito Home Page menu bar per PEN-INVENTORY line 502 — proven glyph.

**Slot signature:**

| slot id (use these names) | type | accepts | placeholder content | typography |
|----|----|----|----|----|
| `label-slot` | frame (extended per Pattern 1) | label text + required-mark | "Label" + "*" disabled | body-sm Inter 14/400 + body-sm error red for required-mark |
| `control` | frame | placeholder text + chevron-down icon | "Select option" + chevron Icon/16 | body Inter 16/400 + chevron color-semantic-text-secondary |
| `helper-slot` | text | helper text | "Optional helper text" | body-sm Inter 14/400 secondary |
| `errorSlot` | text | error message | enabled:false default | body-sm error |

**`batch_design` shape (Plan 27-00 Task 4 Default, abridged):**

```js
selectDefault = I(avgor, {
  type: "frame",
  name: "Primitive / Select / Default",
  reusable: true,
  width: 320,
  layout: "vertical",
  gap: 16,
  padding: 0
})

// label-slot (extended frame pattern)
// ...same as Input/Textarea label-slot...

// control — horizontal layout with placeholder text + chevron at right
selectControl = I(selectDefault, {
  type: "frame",
  name: "control",
  layout: "horizontal",
  justifyContent: "space_between",   // pushes chevron to right
  alignItems: "center",
  gap: 8,
  padding: [8, 16],                  // matches Input control padding
  width: "fill_container",
  fill: "#ffffffff",
  stroke: "#d4d4d8ff",
  strokeWidth: 1,
  cornerRadius: 10,
  contains: [
    {
      type: "text",
      name: "placeholder",
      content: "Select option",
      fontFamily: "Inter",
      fontSize: 16,
      fontWeight: "400",
      fill: "#52525bff",
      lineHeight: 1.625
    },
    {
      type: "icon",
      name: "chevron-icon",
      library: "lucide",
      icon: "chevron-down",
      width: 16,
      height: 16,
      fill: "#52525bff"             // color-semantic-text-secondary
    }
  ]
})

// helper-slot + errorSlot — same as Input pattern
```

**Focus + Error variants:** Sibling reusable frames with same structure, control stroke overrides:
- Focus: `stroke: "#15bee3ff"` (cyan-500) + `strokeWidth: 2` — matches Input/Focus per Phase 24 D-22 forward consistency
- Error: `stroke: "#eb5757ff"` (red-400) + `strokeWidth: 2` + errorSlot enabled with error message text — matches Input/Error

**D-92 explicit:** Closed-state only. The 5-option Budget dropdown + 4-option Timeline dropdown popovers are code-side concerns, NOT depicted in `.pen`.

### Pattern 4: Primitive/Checkbox Default/Focus/Error trinity (D-89 + D-90)

**What:** New sibling primitive inside avgor. Totally different shape from text inputs — small box + label. NO label/control/helper/errorSlot pattern; instead a flat 2-slot horizontal-layout signature: `box-slot` (the visual checkbox indicator) + `label-slot` (the field label text).

**Mechanics — box-slot:** A small square frame (16×16) with rounded corners (cornerRadius 4), white fill + neutral border + optional inner checkmark glyph for the checked state. Phase 27 ships DEFAULT (unchecked) Focus + Error variants. **A separate "Checked" state is NOT in CONTEXT D-90's Default/Focus/Error trinity** — it's deferred to a future state-coverage extension phase per the Deferred Ideas pattern (matching D-89's "no Disabled" carve-out). Consumer instances of Compound/CheckboxGroup show all 5 checkboxes in Default (unchecked) state, which matches v1.3 Solutions checkbox group's initial-render state.

**Slot signature:**

| slot id | type | accepts | content | typography |
|----|----|----|----|----|
| `box-slot` | frame | (checkmark icon at instance time — code consumer wires) | empty frame default | — |
| `label-slot` | text | checkbox label | "Option label" | body Inter 16/400 primary |

**`batch_design` shape (Plan 27-00 Task 5 Default, abridged):**

```js
checkboxDefault = I(avgor, {
  type: "frame",
  name: "Primitive / Checkbox / Default",
  reusable: true,
  width: "fit_content",
  layout: "horizontal",
  gap: 12,                            // space between box and label
  alignItems: "center",
  padding: 0
})

boxSlot = I(checkboxDefault, {
  type: "frame",
  name: "box-slot",
  width: 16,
  height: 16,
  fill: "#ffffffff",
  stroke: "#d4d4d8ff",                // color-semantic-border-default
  strokeWidth: 1,
  cornerRadius: 4,
  contains: []                        // empty — checked state inserts checkmark Icon
})

labelSlot = I(checkboxDefault, {
  type: "text",
  name: "label-slot",
  content: "Option label",
  fontFamily: "Inter",
  fontSize: 16,
  fontWeight: "400",
  fill: "#141f39ff",                  // color-semantic-text-primary
  lineHeight: 1.625
})
```

**Focus + Error variants:** Sibling frames with box-slot stroke overrides:
- Focus: box-slot `stroke: "#15bee3ff"` + `strokeWidth: 2` — matches Input/Focus consistency
- Error: box-slot `stroke: "#eb5757ff"` + `strokeWidth: 2` — matches Input/Error consistency

### Pattern 5: Compound/CheckboxGroup composition (D-89)

**What:** New compound inside `_Components / Compounds` (t67DU6). Composes N `Primitive / Checkbox / Default` ref instances + a legend text node + optional helper text. Default ships 3 Checkbox refs as placeholder content (per Phase 25 D-53 enabled-with-placeholder); Plan 27-02 Contact form instance overrides children list to 5 Checkbox refs with the v1.3 Solutions labels.

**Slot signature (3 slots):**

| slot id | type | accepts | placeholder content | typography |
|----|----|----|----|----|
| `legend-slot` | text | legend label | "Choose options" | body-sm Inter 14/400 primary (matches Input label) |
| `options-slot` | frame | N Checkbox refs | 3× ref Primitive/Checkbox/Default | vertical-stack default (per D-156 v1.3 `space-y-3`); horizontal optional per Claude's Discretion |
| `helper-slot` | text | helper text | enabled:false default | body-sm Inter 14/400 secondary |

**Layout default (Claude's Discretion per CONTEXT):** options-slot vertical-stack with gap `12` (closest to v1.3's `space-y-3` ≈ 12px Tailwind). Plan 27-02 Contact form instance keeps vertical default UNLESS cl8tt raster probe reveals horizontal layout — probe-first protocol per Phase 25 D-49 raster-probe inference precedent.

**`batch_design` shape (Plan 27-00 Task 6, abridged):**

```js
checkboxGroup = I(t67DU6, {
  type: "frame",
  name: "Compound / CheckboxGroup",
  reusable: true,
  width: 320,
  layout: "vertical",
  gap: 12,
  padding: 0
})

legendSlot = I(checkboxGroup, {
  type: "text",
  name: "legend-slot",
  content: "Choose options",
  fontFamily: "Inter",
  fontSize: 14,
  fontWeight: "400",
  fill: "#141f39ff",
  lineHeight: 1.4
})

optionsSlot = I(checkboxGroup, {
  type: "frame",
  name: "options-slot",
  slot: ["<Primitive/Checkbox/Default-id>"],  // typed suggestion per D-52 PREFERRED
  enabled: true,
  layout: "vertical",
  gap: 12,
  contains: [
    { type: "ref", ref: "<checkboxDefault-id>", descendants: { "<labelSlot-id>": { content: "Option 1" } } },
    { type: "ref", ref: "<checkboxDefault-id>", descendants: { "<labelSlot-id>": { content: "Option 2" } } },
    { type: "ref", ref: "<checkboxDefault-id>", descendants: { "<labelSlot-id>": { content: "Option 3" } } }
  ]
})

helperSlot = I(checkboxGroup, {
  type: "text",
  name: "helper-slot",
  content: "Optional helper text",
  enabled: false,
  fontFamily: "Inter",
  fontSize: 14,
  fontWeight: "400",
  fill: "#52525bff"
})

// Sibling Pencil note per D-52 belt-and-suspenders
checkboxGroupNote = I(t67DU6, {
  type: "note",
  content: "Compound / CheckboxGroup — slot signature: legend / options / helper. Plan 27-02 Contact Solutions field instance overrides options-slot contents to 5 Checkbox refs (AI / Automations / Web Apps / Consultation / Not Sure per D-97). Vertical-stack default per CONTEXT Claude's Discretion; horizontal possible per cl8tt raster shape probe at Plan 27-02 Task 0. No legend per option (legend-slot is the group-level prompt, like HTML <legend> inside <fieldset>).",
  fontFamily: "Inter",
  fontSize: 12,
  width: 1200
})
```

### Pattern 6: 2-col asymmetric grid for Contact form layout (D-95 + Claude's Discretion)

**What:** Contact page's form-and-sidebar 2-col grid. Pencil's auto-layout does NOT support CSS Grid fr units — auto-layout is flex-based (horizontal-stack or vertical-stack). The 2fr:1fr asymmetric ratio must be expressed via **fixed widths** on the children.

**Recommended dimensions:**
- Outer page-frame inner-content-width: 1200 (matches Header/Footer Phase 25 width)
- 2-col grid frame: horizontal-layout, gap 32 (space-semantic-stack-lg-ish), alignItems: flex_start (top-aligned per v1.3 `items-start`)
- Form column: fixed-width ≈ 760 (2fr-equivalent of 1168 effective width after gap)
- Sidebar column: fixed-width ≈ 376 (1fr-equivalent)
- Total: 760 + 32 + 376 ≈ 1168 (fits inside 1200 with minor padding tolerance)

Alternative (simpler ratio): 800 form + 32 gap + 368 sidebar = 1200. Plan 27-02 picks based on cl8tt raster proportional read.

**`batch_design` shape (Plan 27-02 Task 4, abridged):**

```js
gridFrame = I(contactPage, {
  type: "frame",
  name: "form-and-sidebar-grid",
  width: 1200,
  layout: "horizontal",
  justifyContent: "space_between",   // or just gap-based
  alignItems: "flex_start",           // top-aligned per v1.3 items-start
  gap: 32,
  padding: [0, 0]                    // section handles outer padding
})

formColumn = I(gridFrame, {
  type: "frame",
  name: "form-column",
  width: 760,                         // ~2fr
  layout: "vertical",
  gap: 24,
  padding: 0
})
// ...8 field instances inserted into formColumn per Pattern 7...

sidebarColumn = I(gridFrame, {
  type: "frame",
  name: "sidebar-column",
  width: 376,                         // ~1fr
  layout: "vertical",
  padding: 0
})
// Compound/Card instance per D-96 inserted into sidebarColumn
```

### Pattern 7: 8-field form composition (D-97 + D-98)

**What:** Plan 27-02 Task 5 inserts 8 field instances into formColumn. Mix of `Primitive/Input/Default` (4 single-line), `Primitive/Input/Textarea` (2 textareas), `Primitive/Select` (2 dropdowns), and `Compound/CheckboxGroup` (1 checkbox group). v1.3 verbatim content per D-98.

**Field-by-field shape:**

| # | Field | Primitive used | Required-mark | Label | Placeholder | Optional-text |
|---|------|----------------|---------------|-------|-------------|---------------|
| 1 | Name | Input/Default | enabled:true | "Name" | "Your name" | n/a |
| 2 | Email | Input/Default | enabled:true | "Email" | "you@example.com" | n/a |
| 3 | Company | Input/Default | enabled:false (default) | "Company" | "Company name (if applicable)" | "(optional)" — supplemental text node OR descendants-override of label text |
| 4 | Challenges | Input/Textarea | enabled:false | "What challenges are you facing?" | "What problems are slowing you down..." | "(optional)" |
| 5 | Solutions | Compound/CheckboxGroup | n/a | legend "What kinds of solutions do you think you'll need?" | n/a | n/a — 5 Checkbox children: AI / Automations / Web Apps / Consultation / Not Sure |
| 6 | Budget | Select | enabled:false | "Do you have a budget in mind?" | "Select budget range (optional)" | n/a — popover options are code-side per D-92 |
| 7 | Timeline | Select | enabled:false | "Do you have a timeline in mind?" | "Select timeline (optional)" | n/a |
| 8 | Message | Input/Textarea | enabled:true (per D-97 v1.3 inconsistency note — raises OPEN-27-NN) | "Message" | "Anything else you'd like to share..." | "(optional)" (despite required-mark — documents v1.3 inconsistency per D-97 footnote) |

Plus:
- Submit Button: `Primitive/Button/Default` instance with label "Send Message"
- Privacy line: plain text node, body-sm Inter 14/400 secondary, content "Your info stays between us. No spam, ever."

**"(optional)" text rendering decision:** D-97 says "plan-execution decides." Two viable mechanisms:
- **Option A (recommended):** Supplemental text node added to label-slot via descendants override at instance time. Cleaner — label-slot becomes 3-child horizontal-layout: [label-text-node, required-mark, optional-text-node]. Default for required-mark stays enabled:false; default for optional-text stays enabled:false. Instances enable per field per D-97.
- **Option B:** Concatenate into label-text-node content (e.g., "Company (optional)"). Less flexible — can't style "(optional)" differently. Matches v1.3 visual but breaks if label color changes.

**Plan 27-00 Task 2 label-slot extension should provision BOTH required-mark AND optional-text nodes** as enabled:false default children of the label-slot frame, so that instance authors can enable either or both without re-mutating the primitive. PEN-INVENTORY Variant Evidence row documents both nodes.

### Anti-Patterns to Avoid

- **Building Disabled state for any new primitive** — Out of scope per D-90 + Deferred Ideas. Adds variant proliferation without source-evidence or consumer need.
- **Building Open-dropdown popover Select variant** — D-92 explicit. Static design tool represents reading state, not interaction state.
- **Building a `Section / Calendly` reusable component** — Pitfall O5/O6 — single-consumer-pattern overkill. Sibling Pencil note convention per D-93 documents the wiring at instance-time.
- **Overriding Crito-source Section/Header + Section/Footer labels on Thank-you / Contact** — D-95 + D-99 + D-77 carry-forward. Joel's 4-link override is Phase 31 Homepage instance-time work.
- **Eyedropping cl8tt raster for new tokens** — Pitfall F3 + D-95 explicit. cl8tt is VISUAL calibration target only; tokens come from the 100-token Phase 23-26 surface.
- **Using Compound/Card for Contact form fields** — Wrong shape (image-slot N/A, title-slot semantically wrong). Plan 27-02 fields are direct Primitive instances inside formColumn vertical-stack.
- **Building a generalized form-section / fieldset / form-row component** — Considered + rejected per CONTEXT Deferred Ideas. Plan 27-02 ships 8 field instances as direct children of formColumn; Phase 31 Homepage form-repeat may justify a wrapper if/when it ships.
- **Hiding cl8tt BEFORE calibration APPROVE** — CALIBRATION-PROTOCOL § 3.4 step 7 is explicit: hide on APPROVE only. Premature hide breaks the side-by-side calibration mechanism.
- **Forgetting to update PEN-INVENTORY `status_counts` for cl8tt** — PAGE-11 ACTIVE moves cl8tt from `flat:1` → `hidden:1` (or equivalent label per Phase 27 D-104).
- **Writing to `.planning/ui-reviews/v2.0/` for calibration artifacts** — Inline-only per OPEN-23-01. CALIBRATION-PROTOCOL § 6.2 explicit: filenames are description identifiers, not writable paths.

---

## Don't Hand-Roll

Problems that look simple but have existing solutions.

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Multi-line text input | Custom textarea-like frame | `Primitive / Input / Textarea` variant per D-89 | Reuses Input's label/control/helper/errorSlot shape; only control sizing changes |
| Dropdown/select field | Custom select compound | `Primitive / Select` sibling primitive per D-89 | Distinct shape (chevron + closed-state) justifies sibling, not Input variant |
| Checkbox field | Custom toggle/checkbox | `Primitive / Checkbox` sibling primitive per D-89 | Box+label shape fundamentally different from text inputs |
| Multi-option checkbox group | Custom fieldset frame | `Compound / CheckboxGroup` per D-89 | Compounds Checkbox refs with legend; legitimate compound use case |
| Required-field indicator (`*`) | Concatenate into label text | Label-slot extension with `required-mark` text node per D-91 | Enables per-field enable/disable without label text mutation; D-53 enabled:default pattern |
| 2fr:1fr asymmetric grid | CSS Grid attempt | Horizontal-layout frame with fixed widths (form 760 + sidebar 376) per Pattern 6 | Pencil auto-layout is flex-based, no fr units; fixed widths achieve the same visual |
| Calendly wiring representation | Embedded iframe placeholder | Sibling Pencil note per D-93 + PEN-INVENTORY § Calendly Wiring Map | Single mechanism (sibling note) for two consumers (Thank-you + Contact); code-side concern at wire-time |
| Sidebar "Book a call" Card | New compound | `Compound / Card` (t40xct) instance with image:enabled:false per D-96 | Card 4-slot signature handles sidebar shape via slot CONTENT (D-49 reusability claim) |
| Thank-you success indicator | Custom checkmark SVG | `Primitive / Icon / 32` + Pattern A native `circle-check` per D-100 | lucide-native Pattern A confirmed in Phase 24 D-44; Icon/32 is existing variant |
| Thank-you "Return to homepage" link | Custom NavLink primitive OR Section/NavBack | Plain text node per D-99 | Single muted link, not a nav-back row; D-79 NavBack is 404-narrow |
| 8-field form composition | Custom form section component | Direct 8 instances inside formColumn vertical-stack per Pattern 7 | One consumer (Plan 27-02) — Pitfall O5/O6 prevention |
| cl8tt raster identification at research time | Guess image-import index | Probe at Plan 27-02 Task 0 via `batch_get cl8tt readDepth: 2` | The fill.image reference IS the canonical identifier |

**Key insight:** Phase 27 introduces ZERO new compound or section patterns. Every new shape is justified by D-89's Hybrid heuristic ("structurally close → variant; distinct → sibling; composed → compound"). The 5 new library entries are the absolute minimum for D-97's 8-field form to compose without inline markup.

---

## Common Pitfalls

### Pitfall 1: Treating cl8tt raster's content as authority over Joel's 8-field shape

**What goes wrong:** Plan 27-02 reads cl8tt raster, sees a Crito-template-generic 4-or-6-field form (Name + Email + Subject + Message style), and ships THAT shape because "the raster is the source." Loses Joel's lead-qualification SHAPE (Solutions checkbox group with 5 specific options, Budget+Timeline selects with specific ranges).

**Why it happens:** "crito-source" branch label suggests source-wins. D-97 hybrid authority is subtle: cl8tt is VISUAL calibration target (spacing, page-intro vertical position, sidebar shape, button-then-privacy ordering) while Joel's 8-field SHAPE is the authority for what gets shipped.

**How to avoid:**
- Plan 27-02 plan-document MUST state: "cl8tt raster is visual calibration target; Joel's v1.3 8-field shape per D-97 is the authority for content."
- Match ROADMAP success criterion 2 literally: "8-field lead-qualification form is composed entirely of `Primitive / Input` instances."
- Calibration AskUserQuestion gate proposes EXACT fidelity per D-83 because shape + content are Joel's truth — visual layout/spacing maps to raster's rhythm.

**Warning signs:** Plan task mentions "ship 4 fields per raster" or "Solutions checkbox group not needed per cl8tt."

### Pitfall 2: Mutating Phase 24 Input primitive parent properties via label-slot UPDATE

**What goes wrong:** Plan 27-00 Task 2 UPDATE accidentally changes `nwJk7`'s `reusable`, `width`, `layout`, `gap`, or `padding` while extending the label-slot. Breaks baseline.

**Why it happens:** `batch_design` Update with a properties object can include unintended fields. Easy to typo a field that's not part of the label-slot extension.

**How to avoid:**
- Scope every Update operation tightly: target ONLY `oCeJP` descendant, NOT the `nwJk7` parent.
- After Plan 27-00 Task 2, run `batch_get(['nwJk7'], readDepth: 1)` to verify nwJk7's own properties unchanged from Phase 24 baseline.
- PEN-INVENTORY Variant Evidence row explicitly documents which Phase 24 properties stayed unchanged.

**Warning signs:** `batch_get(nwJk7)` post-mutation shows changed width/layout/gap.

### Pitfall 3: cl8tt raster image-import index assumed instead of probed

**What goes wrong:** Plan 27-02 writes "image-import-09.jpg" or "image-import-12.jpg" as the calibration pairing without verifying via batch_get. Side-by-side calibration uses the WRONG raster.

**Why it happens:** Phase 23 OPEN-23-05 catalogued cl8tt as flat:1 but didn't record the index. Tempting to guess based on numerical-page order (09_Contact → image-import-09?) but Crito's image-import numbering may not align with page numbering.

**How to avoid:**
- Plan 27-02 Task 0 explicit step: `batch_get({ nodeIds: ['cl8tt'], readDepth: 2 })` to read the `fill.image` reference. The image reference name IS the image-import-NN.jpg index.
- Document the index in 27-02-SUMMARY.md immediately upon discovery.
- PEN-INVENTORY's `## Calendly Wiring Map (Phase 27)` adjacent section can also record the cl8tt raster index for future-phase reference.

**Warning signs:** Plan task references "image-import-NN.jpg" with a placeholder NN or with a specific number not verified by probe.

### Pitfall 4: PAGE-11 mutation timing — hiding cl8tt before APPROVE

**What goes wrong:** Plan 27-02 Task 5 (or earlier) calls `Update(cl8tt, { enabled: false })` because "the Contact frame is now reconstructed, so the raster's redundant." User never sees the side-by-side calibration gate.

**Why it happens:** CALIBRATION-PROTOCOL § 3.4 step 7 ("ON APPROVE + PAGE-11 ACTIVE → ...") is easy to read as "after reconstruction" rather than "after user APPROVE."

**How to avoid:**
- Plan 27-02 explicit task ordering: Task 9 calibration gate FIRST, then Task 10 cl8tt hide.
- Plan task description for cl8tt hide MUST cite "post user APPROVE per CALIBRATION-PROTOCOL § 3.4 step 7."
- If user REVISE'd instead of APPROVE'd, Plan 27-02 iterates via batch_design Update (re-gate) without hiding cl8tt.

**Warning signs:** Plan task list has cl8tt-hide step before the calibration gate.

### Pitfall 5: snapshot_layout text-clipping false-positives misread as real failures

**What goes wrong:** Plan 27-NN close gate calls `snapshot_layout({ problemsOnly: true })` which reports clipping inside textarea control text or checkbox label text. Plan halts believing layout is broken; actually it's the Phase 24/25/26-documented benign false-positive.

**Why it happens:** Pencil 2.13's text-inside-frame snapshot has a y-coordinate quirk per Plan 24-02 Q1 finding. Carries forward.

**How to avoid:**
- Document the false-positive in each 27-NN-SUMMARY.md per Phase 26 precedent.
- Cross-check with `get_screenshot` — if visual is correct, snapshot quirk is benign.
- Document-level (`maxDepth: 0`) result should still be `"No layout problems."` per Phase 26 VAL-26-13 carry-forward.
- Phase 27's new multi-line text consumers (Textarea control + CheckboxGroup vertical-stack) WILL trigger more text-clipping false-positives than Phase 26 — anticipate in 27-NN-SUMMARY.md.

**Warning signs:** Plan task adds "fix text clipping" subtask; should NOT — clipping is benign per Phase 24/25/26 precedent.

### Pitfall 6: OPEN-26-02 stale-cache get_screenshot blanks on new Phase 27 subtrees

**What goes wrong:** Plan 27-01 / 27-02 Task 8-9 calls `get_screenshot` on the newly-created page frame subtree → blank-white. Plan halts believing the design is broken.

**Why it happens:** OPEN-26-02 per-subtree stale-cache quirk codified in CALIBRATION-PROTOCOL § 6.4. Plan 26-02 hit Tier-2 (same-row Update didn't clear 404 subtree).

**How to avoid:**
- Per CALIBRATION-PROTOCOL § 4.4 step 9 + § 6.4 tiering:
  - **Tier-1:** `Update(<page-frame>, {x: <new-x>, y: <different-row-y>})` cross-row move, then move back. May clear cache.
  - **Tier-2:** Fall back to user-side verification in Pencil's actual editor at the calibration gate. Structural verification via `batch_get` + `snapshot_layout` remains authoritative.
- 27-NN-SUMMARY.md documents Tier used + outcome.

**Warning signs:** Plan task halts on blank-white screenshot without invoking Tier-1/Tier-2.

### Pitfall 7: Pencil 2.13 `batch_design` rejects `$<token>` references (OPEN-23-13 carry-forward)

**What goes wrong:** Plan 27-NN writes `fill: "$color-semantic-text-error"` for the required-mark and Pencil silently stores `fill: "#000000"` (default black). Required-mark renders black instead of red.

**Why it happens:** OPEN-23-13 documented — Phase 24/25/26 used literal hex + PEN-INVENTORY Variant Evidence rows for the binding. Easy to forget when adding new primitives.

**How to avoid:**
- All `batch_design` calls use literal values: `fill: "#eb5757ff"` NOT `fill: "$color-semantic-text-error"`.
- Every literal gets a PEN-INVENTORY Variant Evidence row binding to the semantic token (D-104).
- Phase 27 ships NO `set_variables` calls (no new tokens), so `$<primitive>` references never enter the workflow.

**Warning signs:** `batch_get` after a `batch_design` Insert shows `fill: "#000000ff"` where the plan expected red.

### Pitfall 8: Pre-flight active-editor mismatch (D-103 carry-forward)

**What goes wrong:** Plan 27-NN calls `batch_design` while Pencil's VS Code extension has silently switched active editor to a different `.pen` file (e.g., user opened another project). Mutations land in the wrong file.

**Why it happens:** OPEN-23-14 documented quirk — original Phase 23 pause-blocker. Pencil's VS Code extension is editor-state-coupled.

**How to avoid:**
- D-103 EVERY Phase 27 plan calls `mcp__pencil__get_editor_state({ include_schema: false })` before EVERY `batch_design` / `set_variables` / `find_empty_space_on_canvas` call.
- Assert `activeEditor.endsWith("design/Crito.pen")`. Halt + surface to user if mismatched.
- Phase 23-26 production: 0 mismatch incidents across ~30+ pre-flight calls. Carry-forward proven.

**Warning signs:** Plan task lacks the pre-flight step before batch_design.

### Pitfall 9: `batch_design` Insert chunking — exceeding ≤ 25 ops per call

**What goes wrong:** Plan 27-02 Task 5 (8-field form composition) tries to insert all field instances + Submit Button + privacy line + sidebar Card in one batch_design call. Exceeds Pencil's op-batch threshold; partial-failure recovery is awkward.

**Why it happens:** Convenience — fewer batches feel cleaner. But Phase 25 standard is ≤ 25 ops per call.

**How to avoid:**
- Plan 27-02 Task 5 chunks: (a) form column shell + first 4 fields, (b) remaining 4 fields + Submit + privacy line, (c) sidebar Card instance.
- Each chunk gets its own pre-flight active-editor assertion.

**Warning signs:** Plan task spec lists 30+ operations in single batch_design call.

### Pitfall 10: Missing Variant Evidence rows for new primitive variants

**What goes wrong:** Plan 27-00 closes without PEN-INVENTORY Variant Evidence rows for Textarea / Select / Checkbox / CheckboxGroup. Downstream audits can't trace literal → semantic bindings.

**Why it happens:** OPEN-23-13 dual-track is easy to neglect when work feels foundational rather than calibration-bound.

**How to avoid:**
- D-104 explicit: every new primitive + variant gets a row. Anticipate ~12-15 rows for Phase 27 foundation work.
- Plan 27-00 Task 7 (PEN-INVENTORY extensions) is a non-optional close-step.
- Pattern from Phase 26: 17 rows from Plan 26-00 alone for Section/CTA + Section/NavBack.

**Warning signs:** Plan 27-00 SUMMARY.md missing the Variant Evidence row count tally.

---

## Code Examples

Verified patterns from Phase 23/24/25/26 production use, adapted for Phase 27.

### Example 1: Pre-flight active-editor assertion (D-103)

```js
// Per D-103 — every Plan 27-NN that calls a Pencil-mutating tool starts with this:
const state = await mcp__pencil__get_editor_state({ include_schema: false })

if (!state.activeEditor?.endsWith("design/Crito.pen")) {
  throw new Error(`Active editor mismatch: expected design/Crito.pen, got ${state.activeEditor}`)
}

// 0 mismatch incidents across Phase 23-26 production
```

### Example 2: cl8tt raster image-import index probe (Plan 27-02 Task 0)

```js
// MUST run before constructing the side-by-side calibration artifact.
const cl8ttInfo = await mcp__pencil__batch_get({
  nodeIds: ['cl8tt'],
  readDepth: 2
})

// Read the fill.image reference — this IS the image-import-NN.jpg identifier
// Expected structure (based on Phase 23 flat-raster pattern):
//   cl8ttInfo.cl8tt.fill = { type: "image", image: "image-import-NN.jpg" } or similar
const rasterIndex = cl8ttInfo.cl8tt.fill?.image
//   OR cl8ttInfo.cl8tt.children[0].fill.image (if cl8tt is a frame containing a rect)

// Document the discovered index in 27-02-SUMMARY.md + AskUserQuestion description
const sideBySideIdentifier = `27-contact--side-by-side.png (paired with design/images/${rasterIndex})`
```

### Example 3: Label-slot UPDATE for required-mark mechanic (Plan 27-00 Task 2)

```js
// Pre-flight
const state = await mcp__pencil__get_editor_state({ include_schema: false })

// PROBE first: can batch_design Update change a node's type?
// If YES — in-place type-conversion:
mcp__pencil__batch_design({
  operations: `
    // Convert oCeJP from leaf text → horizontal-layout frame
    Update("oCeJP", {
      type: "frame",
      layout: "horizontal",
      gap: 4,
      alignItems: "baseline",
      padding: 0
    })

    // Re-insert original label as text child
    labelText = I("oCeJP", {
      type: "text",
      name: "label-text",
      content: "Label",
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: "400",
      fill: "#141f39ff",
      lineHeight: 1.4
    })

    // NEW: required-mark text node, disabled by default
    requiredMark = I("oCeJP", {
      type: "text",
      name: "required-mark",
      content: "*",
      enabled: false,
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: "400",
      fill: "#eb5757ff"
    })

    // OPTIONAL: optional-text node (per Plan 27-00 Pattern 7 decision)
    optionalText = I("oCeJP", {
      type: "text",
      name: "optional-text",
      content: "(optional)",
      enabled: false,
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: "400",
      fill: "#52525bff"
    })
  `
})

// Verify nwJk7 parent properties unchanged
const verifyParent = await mcp__pencil__batch_get({ nodeIds: ['nwJk7'], readDepth: 1 })
// Assert reusable, width, layout, gap, padding, fill, stroke, cornerRadius all match Phase 24 baseline
```

### Example 4: Compound/Card sidebar instance (Plan 27-02 Task 6)

```js
// Pattern from Phase 25 D-49 + D-53 — image-slot can be enabled:false; populate other slots
sidebarCard = I(sidebarColumn, {
  type: "ref",
  ref: "t40xct",
  descendants: {
    "FGdti": { enabled: false },                                          // image-slot OFF
    "vGH3A": { /* title-slot — descendant text node ID per Plan 25-03 */ },
    "kI3bc": { content: "Ready to chat?" },                              // title text
    "oTSwn": { /* body-slot frame */ },
    "ASA0X": { content: "Schedule a discovery call with me directly!" }, // body text
    "eNqxd": { /* footer-actions-slot frame */ },
    "k20bt": { /* existing Read More Button ref — replace label */ },
    "ATJK9": { content: "Book a Call" }                                  // Button label (M7eUr's text child)
  }
})

// Sibling Pencil note for Calendly wiring per D-93
calendlyNote = I(contactPage, {
  type: "note",
  content: "Calendly placeholder — code milestone wires Card footer-actions Button[0] `href` to https://calendly.com/me--juoi/discovery-call (v1.3 Contact sidebar Calendly URL).",
  fontFamily: "Inter",
  fontSize: 12,
  width: 376
})
```

### Example 5: FindEmptySpace with nodeId anchor (CALIBRATION-PROTOCOL § 10.4)

```js
// Plan 27-01 Thank-you placement (anchor on Phase 26 404 frame csXky)
const thankYouCoords = await mcp__pencil__find_empty_space_on_canvas({
  width: 1440,
  height: 1200,         // Thank-you estimate: Header(~80) + success-message(~400) + CTA(~250) + secondary-link(~40) + Footer(~500)
  direction: "right",
  padding: 80,
  nodeId: "csXky"       // Phase 26 404 frame anchor — same-row placement at y ≈ -4111.55
})
// Expected: { x: ~19367.27, y: ~-4111.55 }

// Plan 27-02 Contact placement (anchor on Thank-you frame from 27-01)
const contactCoords = await mcp__pencil__find_empty_space_on_canvas({
  width: 1440,
  height: 2000,         // Contact estimate: Header + page-intro + 8-field form + sidebar + Footer
  direction: "right",
  padding: 80,
  nodeId: "<thank-you-frame-id-from-27-01-close>"
})
// Expected: { x: ~20887.27, y: ~-4111.55 }
```

### Example 6: cl8tt PAGE-11 ACTIVE post-APPROVE hide (Plan 27-02 Task 10)

```js
// AFTER user APPROVE at Plan 27-02 Task 9 calibration gate — per CALIBRATION-PROTOCOL § 3.4 step 7

// Pre-flight
const state = await mcp__pencil__get_editor_state({ include_schema: false })

// Hide via enabled:false (NOT delete) — structural archive persists at canvas coordinates
mcp__pencil__batch_design({
  operations: `
    Update("cl8tt", { enabled: false })
  `
})

// Verify
const verifyHidden = await mcp__pencil__batch_get({ nodeIds: ['cl8tt'], readDepth: 1 })
// Assert cl8tt.enabled === false
// Assert cl8tt.x + cl8tt.y unchanged (structural archive at same canvas position)

// PEN-INVENTORY § Frames Inventory cl8tt row update:
//   status_counts: flat:1 → hidden:1 (or per D-104 chosen label)
//   status: IN-SCOPE → reconstructed-PHASE-27
//   open_flag_ids: OPEN-23-05 → RESOLVED Plan 27-02 (PAGE-11 ACTIVE)
```

### Example 7: Side-by-side calibration AskUserQuestion (Plan 27-02 Task 9)

```js
// Per CALIBRATION-PROTOCOL § 3.4 step 5 — crito-source branch format
const reconstructedScreenshot = await mcp__pencil__get_screenshot({ nodeId: contactPageId })
// Inline render — NOT disk-written per § 6.1

AskUserQuestion({
  description: `
## Calibration — Contact Page (crito-source flat-raster branch per D-95 + § 3)

**Inline renders shown above:**
- Reconstructed Contact frame (full page)
- cl8tt raster source: design/images/${rasterIndex} (probed Plan 27-02 Task 0)

### Section 1: page-intro
Fidelity label proposal: EXACT per D-83 (token-bound + content verbatim per D-100)

**Content (v1.3 verbatim per D-98):**
- Heading: "Let's Talk"
- Body: "Tell me about your project and I'll get back to you within 48 hours."

### Section 2: form-section
Fidelity label proposal: EXACT per D-83

**Content (8 fields per D-97 — v1.3 verbatim):**
- Name (required) / Email (required) / Company (optional) / Challenges (optional Textarea)
- Solutions (CheckboxGroup × 5: AI / Automations / Web Apps / Consultation / Not Sure)
- Budget (Select) / Timeline (Select) / Message (Textarea — required per validation truth)
- Submit Button "Send Message" + privacy line

### Section 3: sidebar Card
Fidelity label proposal: EXACT per D-83

**Content (v1.3 verbatim per D-98):**
- Title: "Ready to chat?"
- Body: "Schedule a discovery call with me directly!"
- Button: "Book a Call"
- Sibling note: Calendly URL https://calendly.com/me--juoi/discovery-call

### Section 4: Header + Footer
Fidelity label proposal: EXACT (Phase 25 shipped — D-77 carry-forward)

**Calibration target (D-95 crito-source flat-raster branch):**
cl8tt raster at design/images/${rasterIndex} is the visual calibration target. Joel's v1.3 8-field shape per D-97 is the authority for content. Does the reconstructed Contact frame match the raster's visual rhythm + Joel's content shape?

**Description identifiers (inline only per OPEN-23-01):**
- 27-contact-page-intro--side-by-side.png
- 27-contact-form--side-by-side.png
- 27-contact-sidebar--side-by-side.png
`,
  options: [
    "APPROVE — composition matches the source's visual + Joel's content; PAGE-11 ACTIVE step proceeds (hide cl8tt)",
    "REVISE — visual or content mismatch (free-text describe; iterate via batch_design Update; re-gate)",
    "GAP — composition reveals a token-surface or primitive gap (raise OPEN-27-NN; specify)"
  ]
})
```

---

## State of the Art

| Old Approach (pre-Phase 27) | Current Approach (Phase 27) | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Single-branch per-page reconstruction (Phase 26 was all joel-only) | Mixed-branch per-page reconstruction (Thank-you joel-only + Contact crito-source in same phase) | Phase 27 (per CONTEXT D-101 + CALIBRATION-PROTOCOL § 2) | First phase to exercise BOTH protocol branches; validates § 2 branch matrix |
| PAGE-11 INERT only (Phase 26 had no Crito source raster) | PAGE-11 ACTIVE first production use (Plan 27-02 cl8tt hide on APPROVE) | Phase 27 Plan 27-02 | First real test of § 3.3 raster-hide mechanism; updates PEN-INVENTORY status_counts |
| Phase 24 single Input variant set (Default/Focus/Error single-line) | Hybrid library (Input variants + Select/Checkbox siblings + CheckboxGroup compound) | Phase 27 Plan 27-00 | First foundation extension since Phase 26 D-72 heading-2; D-89 sets the precedent for Phase 28+ "missing primitive types" handling |
| Existing primitive baselines frozen | First in-place UPDATE to a Phase 24 baseline (`nwJk7`'s `oCeJP` label-slot extension) | Phase 27 Plan 27-00 Task 2 | New mutation pattern — extends instead of adds; PEN-INVENTORY Variant Evidence row documents extension |
| Sibling Pencil notes for layout documentation only | Sibling Pencil notes for runtime wiring documentation (Calendly URLs) | Phase 27 D-93 + D-94 | Belt-and-suspenders per D-52 extends to runtime concerns; PEN-INVENTORY § Calendly Wiring Map durable cross-reference |
| Foundation plans precede or accompany consumers (Phase 24 build-then-instance) | Foundation plan strictly precedes consumers (Plan 27-00 → 27-01 → 27-02 sequential) | Phase 27 D-101 | Reverses Phase 26 D-85 "rich-then-simple" ordering — foundation-first justified by 27-02's deeper primitive dependencies |

**Deprecated / out-of-scope for Phase 27:**
- **New tokens** — Phase 27 adds ZERO tokens (D-91 reuses `color-semantic-text-error`). Token surface stays at 100. If a calibration-gate consumer surfaces a real need (e.g., distinct `color-semantic-text-required`), raise OPEN-27-NN with consumer-phase deferral.
- **Disabled state for form primitives** — Out per D-90 + Deferred Ideas. Future state-coverage extension phase ships if needed.
- **Open-dropdown popover Select variant** — Out per D-92. Code-side runtime concern.
- **Generalized `Section / Calendly`** — Out per O5/O6 prevention. Sibling note convention per D-93 handles both consumers.
- **Embedded Calendly iframe representation in .pen** — Out per Deferred Ideas. Code-milestone wires.
- **Joel-brand fonts (Bricolage Grotesque, DM Sans) on Thank-you / Contact** — Out per PROJECT.md. v2.0 is Crito visual register.
- **Joel-brand 4-link Header override** — Out per D-95 + D-99 + Phase 25 D-38 carry-forward. Phase 31 Homepage instance-time work.

---

## Open Questions

Things that couldn't be fully resolved at research time — planner should account for these.

### 1. cl8tt raster image-import-NN.jpg index

- **What we know:** cl8tt is `flat:1` per OPEN-23-05; single image-import-*.jpg rectangle. 73 image-import files exist in `design/images/`.
- **What's unclear:** Which specific NN index corresponds to cl8tt. Plausible candidates by numerical-page order: image-import-09 through image-import-12.
- **Recommendation:** Plan 27-02 Task 0 probes via `batch_get({ nodeIds: ['cl8tt'], readDepth: 2 })` to read `fill.image` reference. Document in 27-02-SUMMARY.md immediately upon discovery. The side-by-side calibration artifact identifier becomes `27-contact-{section}--side-by-side.png (paired with design/images/<discovered-index>.jpg)`.

### 2. batch_design Update type-conversion feasibility (Plan 27-00 Task 2 label-slot)

- **What we know:** Phase 24/25/26 batch_design Update operations changed properties (fill, stroke, content, enabled). No prior phase changed a node's `type` (e.g., text → frame).
- **What's unclear:** Whether Pencil 2.13 batch_design allows in-place type conversion, or requires Delete + recreate (which would change the ID).
- **Recommendation:** Plan 27-00 Task 2 probes with a small test Update first. If type-conversion fails:
  - **Fallback path:** Delete `oCeJP` → Insert new frame with same name "label-slot" + same parent + same position → populate children with label-text + required-mark. ID changes (new generated ID). PEN-INVENTORY Variant Evidence row documents the ID change. Consumer instances reference the NEW slot ID.
- **Why this matters:** ID preservation simplifies downstream phase planning (consumer phases reference IDs by name). ID change requires careful documentation + Phase 28-31 awareness.

### 3. label-slot UPDATE impact on existing instances

- **What we know:** No Phase 24/25/26 plan instanced `Primitive / Input` as a consumer (Contact page wasn't reconstructed; FAQ + 404 didn't have form fields). Phase 27 is the FIRST consumer.
- **What's unclear:** Whether Pencil 2.13 ref instances automatically inherit descendant-structure changes from their referenced primitive, OR whether descendant-IDs are baked into instance overrides at instance-creation time.
- **Recommendation:** Plan 27-00 Task 2 ships the label-slot extension BEFORE any consumer instances exist. No legacy instances to verify against. Plan 27-02 Task 5 (first instance creation) reads the new slot structure via batch_get and overrides accordingly. Documents the inheritance behavior empirically.

### 4. Pencil 2.13 type-conversion for `optional-text` vs descendants override mechanism

- **What we know:** D-97 Company field needs "(optional)" text. Two viable mechanisms (Pattern 7 above): supplemental text node (Option A) OR concatenate into label content (Option B).
- **What's unclear:** Whether Pencil's descendants override mechanism (Phase 25 D-44 used `{descendantId: {enabled: true}}` pattern) supports inserting NEW children at instance time, or only enables/disables/overrides existing children.
- **Recommendation:** Option A (supplemental text node as existing child of label-slot with `enabled:false` default) is the safer path — leverages proven enabled-toggle mechanism. Plan 27-00 Task 2 ships the label-slot with THREE children: [label-text, required-mark (disabled), optional-text (disabled)]. Instances enable per field.

### 5. cl8tt raster horizontal vs vertical CheckboxGroup layout for Solutions field

- **What we know:** v1.3 ContactSection uses `space-y-3` (vertical-stack) for the 5-option CheckboxGroup. cl8tt raster may show either.
- **What's unclear:** Whether cl8tt raster (a generic Crito Contact template) depicts a checkbox group at all — Crito's template may have simpler form fields (Name/Email/Subject/Message).
- **Recommendation:** Default vertical (matches v1.3) per CONTEXT Claude's Discretion. Plan 27-02 Task 0 raster probe identifies the layout shape; if cl8tt shows horizontal radio-button-like row, override to horizontal. Document the probe-first decision in 27-02-SUMMARY.md.

### 6. v1.3 Message field validation inconsistency surface (D-97 footnote)

- **What we know:** v1.3 `validationConfig` includes `valueMissing` for Message (treats as required) but label reads "(optional)." Phase 27 D-97 ships required-mark enabled:true + optional-text enabled:true (both rendered).
- **What's unclear:** Whether code-milestone resolution removes the validationConfig entry (true-optional) or removes the "(optional)" label (true-required).
- **Recommendation:** Plan 27-02 raises OPEN-27-NN documenting the v1.3 inconsistency for code-milestone resolution. .pen ships both indicators per D-97; PEN-INVENTORY `## Open Flags — Phase 27` row references the OPEN-27-NN with consumer phase = code-milestone.

### 7. Provisional `type-semantic-prose-paragraph-*` re-verification on Contact page

- **What we know:** Phase 26 D-71 dropped the "provisional" flag after FAQ first-consumer APPROVE. Phase 27 Contact page-intro body + Contact sidebar Card body + Thank-you body are additional consumers.
- **What's unclear:** Whether the prose-paragraph token reads correctly at form-context scale (smaller surrounding fields, denser layout) vs FAQ's open prose context.
- **Recommendation:** Plan 27-01 + 27-02 calibration gates spot-check prose-paragraph rendering. If visual reads wrong, raise OPEN-27-NN for code-milestone or Phase 28 (Blog) verification.

---

## Validation Architecture

**Phase 27 ships .pen mutations only — NO `src/` changes per PROJECT.md + REQUIREMENTS.md.** What's the validation surface for purely-Pencil work? This section is consumed by Step 5.5 VALIDATION.md creation.

### What Phase 27 validates

1. **Token surface stability** — `get_variables({})` count = 100 at every plan open + close (Phase 27 adds zero tokens per D-91 reuse).
2. **Baseline ID integrity** — `batch_get` verifies the 35-ID `expected_baseline_ids_unmutated` list intact at every plan open. Plan 27-00 Task 2 mutates `nwJk7`'s `oCeJP` descendant only (parent properties unchanged); Plan 27-02 Task 10 mutates `cl8tt` `enabled: false` (intentional per PAGE-11 ACTIVE).
3. **New library entry presence** — `batch_get` verifies 7 new reusable nodes after Plan 27-00 (Textarea + Select × 3 + Checkbox × 3) + 1 new compound (CheckboxGroup) inside their respective parents.
4. **Page-frame presence** — `batch_get` verifies Thank-you frame (Plan 27-01) + Contact frame (Plan 27-02) at document root, same page-frame row y ≈ -4111.55 as FAQ b7Hgy + 404 csXky.
5. **Layout sweep** — `snapshot_layout({ maxDepth: 0, problemsOnly: true })` at document level returns `"No layout problems."` at every plan close. Per-frame `snapshot_layout({ parentId: <frame-id>, problemsOnly: true })` documents text-clipping false-positives per Phase 24/25/26 precedent (NOT real clipping; NO mitigation).
6. **Zero raw values inside new primitives + page frames** — Per OPEN-23-13 dual-track, every literal hex/px/typography value appears in PEN-INVENTORY Variant Evidence rows binding to a semantic token. Phase 27 adds ~15-20 Variant Evidence rows total (5 new library entries × ~3 rows each + page-frame composition rows).
7. **Pre-flight active-editor compliance** — D-103 enforced before EVERY mutating call across all plans. 0 mismatch incidents target (matches Phase 23-26 carry-forward).
8. **Calibration gate APPROVE** — Plan 27-01 single user gate per § 4.5 (joel-only token-usage format). Plan 27-02 single user gate per § 3.4 (crito-source side-by-side format). Plan 27-00 closes WITHOUT a user gate per D-102 + Phase 26 D-86 carry-forward.
9. **PEN-INVENTORY extensions** — Per D-104: Frames Inventory rows for Thank-you + Contact; Variant Evidence rows for all new library entries; `## Calendly Wiring Map (Phase 27)` new section; `## Open Flags — Phase 27 (OPEN-27-NN)` new section; cl8tt status_counts update post-APPROVE; updates to OPEN-24-04 / -07 / -08 / -09 marking partial resolution.
10. **PAGE-11 ACTIVE mutation timing** — Plan 27-02 Task 10 fires AFTER Task 9 user APPROVE only. Documented in 27-02-SUMMARY.md.
11. **id-inventory.json archival** — `.planning/research/exports/v2.0/end-of-phase-27/id-inventory.json` per OPEN-23-01 substitution pattern (matches Phase 23/24/25/26 precedent).

### What Phase 27 does NOT validate

- **No HTML rendering / Playwright tests** — Phase 27 ships .pen mutations; no `src/` changes; no rendered HTML to test.
- **No axe / accessibility audits** — Accessibility is a code-milestone concern. Phase 27 documents focus-ring + error-state visual decisions in PEN-INVENTORY Variant Evidence; OPEN-24-04 (Button focus ring) + OPEN-24-08 (Input Focus) + OPEN-24-09 (Input Error) note Phase 27 as the real consumer phase but don't run programmatic accessibility checks.
- **No `npm run build` / `npm run astro check`** — No `src/` changes; build/typecheck unchanged. (If a planner anticipates a build step, it's defensive only — there should be zero src diff post-phase.)
- **No Lighthouse / SEO checks** — No deployed pages changed.
- **No visual regression tooling beyond Pencil's `get_screenshot`** — Calibration is user-eye + protocol-driven, not automated.
- **No `export_nodes` PNG archival** — Per OPEN-23-01 (-32603 broken). Substituted by id-inventory.json structural snapshot.

### VALIDATION.md command surface (when planner creates VALIDATION.md)

The planner's VALIDATION.md should list:

```bash
# Pencil MCP validation (interactive, per-plan close):
#   mcp__pencil__get_editor_state({ include_schema: false })  # pre-flight
#   mcp__pencil__get_variables({})                              # expect 100
#   mcp__pencil__batch_get({ nodeIds: <35 baseline IDs + Phase 27 additions> })
#   mcp__pencil__snapshot_layout({ maxDepth: 0, problemsOnly: true })  # expect "No layout problems."

# NO npm / playwright / axe / lighthouse commands — Phase 27 has no src/ surface.

# Defensive (optional, document zero-diff):
git diff --name-only src/  # expect empty
git diff --name-only design/Crito.pen  # expect modified
git diff --name-only .planning/research/PEN-INVENTORY.md  # expect modified
```

VALIDATION.md should also document:
- The OPEN-26-02 Tier-1/Tier-2 workaround as expected get_screenshot behavior, not a blocker.
- Text-clipping false-positive as expected snapshot_layout output, not a blocker.
- Pencil's runtime memory caveat — file on disk is stale until user Cmd+S saves design/Crito.pen.

---

## Sources

### Primary (HIGH confidence — Pencil MCP production-confirmed + project audit-trail)

- `.planning/phases/27-thank-you-contact-reconstruction/27-CONTEXT.md` — D-89 through D-104 LOCKED (USER decisions)
- `.planning/research/CALIBRATION-PROTOCOL.md` — § 2 branch matrix + § 3 crito-source script + § 3.3 PAGE-11 ACTIVE + § 4 joel-only script + § 4.4 nodeId anchor + § 6 OPEN-23-01 substitution + § 10 retrospective
- `.planning/research/PEN-INVENTORY.md` — cl8tt classification (line 67), 404 csXky (line 78), Card slot signature (lines 318-323), Section/CTA Hs5rc (line 447), Input variant evidence (lines 351-359), Phase 26 Variant Evidence (lines 443-485)
- `.planning/research/exports/v2.0/end-of-phase-26/id-inventory.json` — 35 expected_baseline_ids_unmutated; csXky position {x: 17847.27, y: -4111.55}; 100-token surface verified end of Phase 26
- `.planning/phases/26-faq-404-reconstruction-calibration-workflow-established/26-CONTEXT.md` — D-58 through D-88 carry-forward (verbatim sourcing + per-section fidelity + foundation-plan-no-gate)
- `.planning/phases/26-faq-404-reconstruction-calibration-workflow-established/26-RESEARCH.md` — Pattern 1 (page-frame creation), Pattern 2 (Section/CTA slot signature), Pattern 4 (heading-2 token surface) — Phase 27 inherits the structural shape
- `.planning/phases/25-section-compound-components/25-03-SUMMARY.md` — Compound/Card t40xct 4-slot signature; typed-slot suggestion-only Pencil 2.13 finding (D-52); 9 Variant Evidence rows per compound
- `.planning/phases/24-layout-primitives-primitive-components/24-03-SUMMARY.md` — Primitive/Input structural details (nwJk7 / oCeJP / bhkR3 / dbEyb / xmhXv / uawpJ); Input/Focus + Input/Error inferred-source consumer phase = 27 (OPEN-24-08 + OPEN-24-09); variant-as-sibling-component finding
- `src/components/homepage/ContactSection.astro` (lines 1-204) — Joel's v1.3 8-field shape verbatim per D-97 + D-98 (Name/Email/Company/Challenges/Solutions/Budget/Timeline/Message + Submit + privacy + sidebar Card)
- `src/pages/thank-you.astro` (lines 1-53) — Joel's v1.3 Thank-you content verbatim per D-99 (heading + body + CTA + secondary link + Calendly URL)

### Secondary (HIGH confidence — codified Pencil 2.13 quirks)

- OPEN-23-01 — `export_nodes` broken (MCP -32603) + `get_screenshot` inline-only + id-inventory.json substitution
- OPEN-23-13 — `batch_design` rejects `$<token>` references — literal hex required + PEN-INVENTORY Variant Evidence row dual-track
- OPEN-23-14 → D-87 → D-103 — pre-flight active-editor assertion (silently switches in VS Code)
- OPEN-26-02 — get_screenshot stale-cache per-subtree quirk + Tier-1/Tier-2 workaround tiering (CALIBRATION-PROTOCOL § 6.4)
- Pencil 2.13 Frame schema has NO variant-axis property — variants are siblings with naming convention (Phase 25 D-43 finding)
- Pencil 2.13 typed slot `slot: [ids]` is suggestion-only, not enforcement (Phase 25 D-52 + Plan 25-03 Task 2)
- `find_empty_space_on_canvas` with nodeId anchor places on same row as anchor (Plan 26-02 contribution, CALIBRATION-PROTOCOL § 10.4)

### Tertiary (LOW confidence — flagged for plan-execution probe)

- cl8tt raster image-import-NN.jpg index — UNKNOWN, must be probed at Plan 27-02 Task 0
- batch_design Update type-conversion feasibility (text → frame) — UNKNOWN, must be probed at Plan 27-00 Task 2 with fallback
- Pencil's descendants override insert-vs-toggle mechanic for adding NEW children at instance time — UNKNOWN, safer to design label-slot with all 3 children (label-text + required-mark + optional-text) pre-created with enabled defaults

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — Phase 23-26 production-confirmed; ZERO new tools; ZERO new tokens
- Architecture patterns: HIGH — 6 patterns documented (label-slot extension, Textarea variant, Select trinity, Checkbox trinity, CheckboxGroup compound, 2-col asymmetric grid); 1 pattern MEDIUM (in-place type-conversion needs Plan 27-00 Task 2 probe)
- Don't hand-roll: HIGH — every item is D-89 Hybrid heuristic or explicit CONTEXT decision
- Pitfalls: HIGH — 10 pitfalls catalogued, 7 are Phase 23-26 carry-forward, 3 are Phase 27-specific (cl8tt index probe + PAGE-11 timing + label-slot UPDATE scope)
- Code examples: HIGH — 7 examples verified against Phase 23-26 production patterns
- Validation architecture: HIGH — explicit no-src-surface clarification + Pencil MCP command set

**Phase 27-specific risks:**
- cl8tt raster index unknown (Pitfall 3) — mitigation: Plan 27-02 Task 0 probe step
- Label-slot in-place type-conversion may fail (Open Question 2) — mitigation: fallback Delete + recreate path documented
- PAGE-11 ACTIVE first production use (Pitfall 4) — mitigation: explicit task ordering + APPROVE-gate dependency
- Foundation-first plan ordering reverses Phase 26 pattern (D-101) — mitigation: dependency rationale documented in CONTEXT

**Research date:** 2026-06-07
**Valid until:** 2026-07-07 (30-day estimate — Pencil MCP stable; project carry-forward chain unbroken; no upstream version churn anticipated)

---

*Phase: 27-thank-you-contact-reconstruction*
*Researched: 2026-06-07*
*Ready for: Plan structure (Plans 27-00 foundation, 27-01 Thank-you joel-only, 27-02 Contact crito-source flat-raster)*

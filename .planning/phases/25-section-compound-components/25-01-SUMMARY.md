---
phase: 25-section-compound-components
plan: 25-01
type: summary
status: in_progress
wave: 1
started: 2026-06-02
---

# Plan 25-01 Summary — Section / Header

**STATUS: Task 0 COMPLETE — DRAFT. Tasks 1–4 pending; Task 1 checkpoint to surface source-vs-CONTEXT conflicts before any Button mutations.**

This plan ships `Section / Header` (COMP-05) inside `_Components / Sections` (g9oRa5), adds a Secondary Button variant per D-42/D-43 (resolves OPEN-24-11), and wires both Header CTAs' iconTrailing slots with `arrow-right` per D-44 (resolves OPEN-24-06).

---

## Active-Editor Pre-flight Result (D-54)

`mcp__pencil__get_editor_state({ include_schema: true })` called at plan start.

- Active editor returned: `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/design/Crito.pen` ✓
- Schema version: 2.13 (matches Phase 23 audit + Phase 24 carry-forward)
- Reusable components confirmed present: M7eUr (Button/Default), nwJk7 (Input/Default), j0FxQZ (Badge), EQaMf (Icon/16), yRvGb (Icon/20), u7NmaS (Icon/24), dpO5Y (Icon/32) — matches `end-of-phase-24/id-inventory.json`

No active-editor mismatch incidents. D-54 pre-flight discipline observed.

## Guidelines Snapshot

Called `get_guidelines("Design System")` + `get_guidelines("Landing Page")` (Title-Case names — `design-system`/`landing-page` lowercase rejected by Pencil with valid-names list: Code, Design System, Landing Page, Mobile App, Slides, Table, Tailwind, Web App).

**Diff vs PEN-INVENTORY § "Pencil Guidelines" snapshot:** No material deviations from Phase 23 audit. Sections 1–15 carry forward as documented. Notable confirmations:
- § 2 (Slots): consumer inserts at `parentBinding/slotId`; `enabled: false` hides unused slots
- § 3 (Icons): lucide / feather / Material Symbols (Outlined/Rounded/Sharp) / **phosphor** (new addition to library list — phosphor not in PEN-INVENTORY's prior listing)
- § 12 (Spacing): Inside buttons `[10, 16]`; inside inputs `[8, 16]`
- § 13 (Button hierarchy): Primary → Secondary → Outline → Ghost → Destructive (informs D-43 Secondary naming)
- § 14 (Tokens): canonical Pencil `$--<name>` convention noted; Joel's project uses flat-dash `$<token>` convention per Phase 23 D-12 — not a deviation, just different naming

**Landing Page guide carry-forward:** Conversion intent (one CTA), transformation > outcome > benefit > feature, content before visuals, ≤2-3 centered text lines, accent color reserved for actions. Informs Header CTA emphasis (Default = primary action, Secondary = supporting action).

## Token Surface Confirmation

`get_variables({})` returned 95 entries (verified by enumeration). Matches Phase 23 ship-count + Phase 24 zero-extension result. No tokens added in this audit.

## Crito Menu Bar Source Audit (D-38, D-39, D-41 — strict source-wins)

`batch_get({ nodeIds: ["ULZiU"], readDepth: 4 })` — Menu bar source enumerated.

**Parent ULZiU:**

| property | value |
|---|---|
| type | `group` (NOT frame — no layout, no padding, no width/height properties) |
| name | "Menu bar" |
| position (in Hero) | x: 213, y: 40 |
| effective width | ~1180 (right edge of Buttons group + button width) |
| effective height | derived from children — ~45–60 (nav text height 29.6 + button height 61.7 → max ~62) |

**Menu bar children (3):**

| child_id | type | name | x | y | content / notable properties |
|---|---|---|---|---|---|
| `wM9Ac` | text | "Home Pages Pricing Portfolio Blog Contact" | 362 | 16 | SINGLE text node, content `"Home            Pages            Pricing            Portfolio            Blog            Contact"` (whitespace-separated labels); fontFamily: Inter, fontSize: 16, fontWeight: 500, fill: `#ffffffff` (white-on-navy), textGrowth: fixed-width-height, width: 560, height: 29.6 |
| `7BoiG` | group | "Buttons" | 1007 | 0 | Contains 1 child: `g0tBL` Button/Primary/With Icon |
| `9cyrs` | group | "Logo" | 0 | 9 | Contains 2 children: `BbjMB` Icon (multicolor vector logo glyph, ~38px tall × 38px wide) + `2zHRi` Txt (containing `TXMZr` "Crito" wordmark text, DM Sans 36/700, white, width 105, height 43, at x:52 relative to logo group) |

**Logo deeper detail (9cyrs):**

| sub_id | role | property | value |
|---|---|---|---|
| `BbjMB` | Icon group | (vector composition — 100+ colored path nodes; rendered as Crito's multicolor brand icon) | x:0, y:2 |
| `TXMZr` | Wordmark text | content / fontFamily / fontSize / fontWeight / fill | "Crito" / DM Sans / 36 / 700 / `#ffffffff` |

**CTA deeper detail (g0tBL inside Buttons group 7BoiG):**

| sub_id | role | property | value |
|---|---|---|---|
| `g0tBL` | Button outer frame | type / layout / justifyContent / padding / gap / cornerRadius / fill | frame / vertical / center / `[16, 20]` / 10 / 10 / `#38da71ff` (Crito's signature green CTA — same source `fwSmg` Phase 24 mined) |
| `oA3QE` | "Frame 1" inner row | alignItems / gap / justifyContent | center / 9 / center |
| `ujHMI` | CTA label text | content / fontFamily / fontSize / fontWeight / fill | "Get Started Free" / Inter / 16 / 500 / `#ffffffff` |
| `APN9C` | Icon slot frame (trailing) | enabled / gap / x position (in Frame 1) | **false** / 10 / 107 (right of label) — slot exists but is DISABLED in Crito source |

**Width / fixed-width target for D-41:** ULZiU is a group, no explicit width. Effective visual extent = 213 (Hero-x) + ~1180 (right edge of buttons within ULZiU) → ~1393 absolute. Symmetric to mirror left margin 213 → right margin 207 → Section/Header outer width ≈ **1414**. (Hero bg is 1600; symmetric ~93px margin on each side of the Menu bar's visible content.)

## Decisions (Open Questions 1, 3, 5 + new source-vs-CONTEXT conflicts surfaced)

### Open Q5: Logo slot default content
**Decided:** Slot `enabled: true` with placeholder = literal Crito wordmark text "Crito" (DM Sans 36/700, white-or-navy depending on Header bg context).
**Rationale:** Matches D-38 strict source-wins. The complex multicolor logo icon vector (`BbjMB`) is Crito's brand identity and not Joel's brand — placeholder text keeps the slot semantic without inventing a Joel-brand wordmark that doesn't exist yet. Phase 31 instances override with Joel-brand wordmark when designed.
**Note on context-aware fill:** Crito's wordmark is white on navy Hero. Section/Header background is white (Section is a library component, not the Hero-specific instance). Fill should be navy (`#141f39ff`) at the component level for visibility — analogous to Open Q3's Secondary stroke context-deviation. Logged as OPEN-25 sibling of Q3.

### Open Q3: Secondary Button stroke color (light-bg vs source-literal)
**Decided:** Secondary stroke = `#141f39ff` (navy) at component level, deviating from source-literal `#ffffffff` (white-on-dark-Hero).
**Rationale:** Section/Header is a generic library component with white-bg context. White outline on white bg = invisible. Navy outline = visible AND maps to `color-semantic-text-primary`. Phase 31 Hero instance may override stroke back to white.
**Will seed:** OPEN-25-01 at Task 4 close.

### Open Q1: Pencil variant-axis-extension probe
**Status:** UNRESOLVED — will execute in Task 1.
**Approach:** Try D-43 PREFERRED (add `purpose` axis cell to M7eUr) → if Hover/Focus YJhRv/gQa2R clobbered, fall back to sibling `Primitive / Button / Secondary` in avgor.

### NEW SOURCE-VS-CONTEXT CONFLICTS (surfaced for user gate at Task 1 checkpoint)

#### Conflict A — D-39 (3 Crito Menu bar affordances) vs source

**CONTEXT.md D-39 says:** Ship search + chevron-down + hamburger menu icons. Strict source-wins (D-55).
**Source actually shows:** ZERO affordance icons inside ULZiU. The earlier PEN-INVENTORY glyph audit (Phase 24 D-26 source-driven enumeration) found search/chevron-down/menu in `ujMLJ` SOMEWHERE — but not in the Menu bar group. The attribution "Home Page Menu bar — search affordance" / "...dropdown indicator" / "...mobile hamburger toggle" in PEN-INVENTORY Icon-Glyphs table appears to be incorrect.

**Options for resolution (user gate at Task 1 checkpoint):**
- **A1 (strict source-wins per D-55):** Ship 0 affordances. Section/Header carries logo + nav + CTA(s) only. Cleaner, narrower component.
- **A2 (honor CONTEXT D-39 as Joel-side design choice):** Ship 3 affordances anyway. Surface as OPEN-25-XX source-deviation flag declaring "Joel-side design choice to add affordances not present in Crito Menu bar source".
- **A3 (you decide):** Pencil's flat-image rationale of v1.4 abandonment recommends source-wins; recommend A1 unless user explicitly wants A2.

#### Conflict B — D-42 (dual CTAs in Header) vs source

**CONTEXT.md D-42 says:** Two CTAs in Section/Header — Default green + Secondary outline.
**Source actually shows:** ONE CTA in Menu bar (`g0tBL` "Get Started Free" green primary). The Secondary outline pattern source `mkw8g` ("Discover More") lives in Hero `Wx9kx > 0veF5 > HuBKK`, NOT in the Menu bar.

**Options for resolution (user gate at Task 1 checkpoint):**
- **B1 (strict source-wins per D-55):** Ship 1 CTA in Section/Header. Secondary Button variant STILL gets added to Primitive/Button library (per D-43, useful for Phase 27 contact form CTA / Phase 31 Hero instance) but Section/Header instances only the primary. Resolves OPEN-24-11 in Task 1 regardless.
- **B2 (honor CONTEXT D-42 as Joel-side design choice):** Ship 2 CTAs in Section/Header. Surface as OPEN-25-XX source-deviation flag declaring "Joel-side design choice to add Secondary CTA not present in Crito Menu bar source; Hero source `mkw8g` Secondary pattern instanced into Header per Joel's actual website navigation intent". Maintains D-44 (both CTAs wire arrow-right per actual use) — resolves OPEN-24-06 still.
- **B3 (you decide):** Strict source-wins discipline recommends B1; HOWEVER, D-42 was explicitly user-decided via AskUserQuestion with both Crito source structure shown AND Joel-intent acknowledged — so B2 is consistent with stated user intent. Recommend B2 (with OPEN-25-XX flag) unless user reverses the original decision.

### CTA label literal (Crito Menu bar source)

If B2 chosen, primary CTA descendant text override → `"Get Started Free"` (Crito source literal per D-38 strict source-wins for content). Secondary CTA label → no Menu bar source; suggest `"Learn More"` or `"Discover More"` (Hero source literal of `mkw8g`). User can confirm at checkpoint.

## Guidelines Snapshot (delta from Phase 23 baseline)

- Phosphor added to icon library list (informational; not relevant to Phase 25 ship-set which stays lucide).
- Token convention `$--<name>` documented as Pencil canonical — Joel's project uses flat-dash `$<name>` per Phase 23 D-12 (informational).

## Task 0 Validation Outcomes

| VAL ID | Status | Citation |
|---|---|---|
| VAL-25-14 (pre-flight active-editor) | PASS (1 of ≥ 4 expected pre-flight calls) | Plan start `get_editor_state` returned `design/Crito.pen` |
| VAL-25-01 / 07 / 08 / 11 / 12 / 15 / 16 / 19 / 20 | PENDING | Tasks 1–4 |

## Files Modified (Task 0)

- This SUMMARY.md draft (no Pencil mutations yet)
- No PEN-INVENTORY edits (Task 4)
- No `design/Crito.pen` mutations (Task 0 is read-only)

## Next: Task 1 Checkpoint

Task 1 will:
1. Probe Pencil 2.13 variant-axis-extension on M7eUr (Open Q1 resolution).
2. Add Secondary Button variant (D-42 / D-43) regardless of Conflict-B resolution — primitive library always benefits from Secondary even if Header instances only 1 CTA.
3. **CHECKPOINT** — surface to user: (a) variant-axis probe outcome; (b) Secondary cell `get_screenshot`; (c) **Conflict A** decision (affordances 0 or 3); (d) **Conflict B** decision (CTAs 1 or 2).

User responses at the checkpoint determine Task 2's Section/Header build scope.

# Phase 25: Section + Compound Components - Research

**Researched:** 2026-06-01
**Domain:** Pencil MCP component authoring — Section components (Header/Footer) composing Phase 24 primitives + Compound/Card with slot-based content variation
**Confidence:** HIGH on Pencil MCP slot mechanics + lucide brand-icon policy + Crito source structure; MEDIUM on Pencil 2.13 variant-axis-extension internals (must be probed at execution); HIGH on raster source enumeration for Card structure inference

## Summary

Phase 25 builds three new components on top of Phase 24's primitives (Button id `M7eUr`, Input `nwJk7`, Badge `j0FxQZ`, Icon size variants `EQaMf/yRvGb/u7NmaS/dpO5Y`) and Phase 23's 95-token surface: `Section / Header`, `Section / Footer`, and the slot-based `Compound / Card` (resolving COMP-05, COMP-06, COMP-07). The work resolves three Phase-24 carry-forward OPEN flags by ACTUAL use rather than synthetic probe: OPEN-24-06 (empty-slot collapse — resolved when Header CTAs wire real `arrow-right` icons into Button's `iconTrailing` slot per D-44), OPEN-24-11 (Secondary outline-button source `mkw8g` — resolved by Plan 25-01 first task adding a `purpose` variant axis cell to `Primitive / Button` per D-42/D-43), and OPEN-24-13 (Joel-brand glyphs — resolved by Plan 25-02 lucide-probe for Instagram (likely Pattern A with deprecation caveat) and Pattern-B atomic-glyph build for Substack per D-45/D-46).

Two disciplines coexist in this phase per D-55: **strict source-wins** for Section components (Crito Home Page Menu bar `ujMLJ` and Footer subtree provide direct ground truth — labels, layout, colors, typography all derive from `batch_get` reads), and **raster-probe inference + OPEN-25 flag** for `Compound / Card` (consumer page frames `07_Blog DzqTm`, `08_Blog Details w1m3x`, `06_Service Details cYlRH`, `05_Service Y2isa` are flat raster per OPEN-23-05 — Card structure derives from `design/images/image-import-{12,14,8,22,29}.jpg` visual inspection + the v1.3 `src/components/ui/Card.astro` as secondary structural reference per D-49). Card ships as a SINGLE component with 4 slots (image, title, body, footer-actions per D-51) — NOT three variants — explicitly per COMP-07 hard prohibition. All 4 slots default `enabled: true` with placeholder content per D-53 for visual library discoverability.

**Primary recommendation:** Execute plans 25-01 → 25-02 → 25-03 sequentially (D-57). Each plan starts with a Pencil MCP audit task (Plan 25-01 reads Home Page Menu bar `ujMLJ` subtree; Plan 25-02 reads Home Page Footer subtree + probes `library: "lucide"` for Instagram/Substack availability; Plan 25-03 reads `design/images/image-import-{12,14,8,22,29}.jpg` raster set + probes Pencil 2.13 slot-typing schema with array-of-suggested-component-IDs payload). Every batch_design / set_variables call is preceded by `mcp__pencil__get_editor_state({ include_schema: false })` asserting active editor == `design/Crito.pen` (D-54 carry-forward). Plan-close discipline mirrors Phase 24's pattern: `snapshot_layout({ problemsOnly: true })` per component (with text-clipping false-positive quirk documented per `end-of-phase-24/id-inventory.json snapshot_layout_quirk_documented`) + `get_screenshot` visual checkpoint + user approval gate before next plan.

## Standard Stack

The established libraries/tools/components for Phase 25 work.

### Core (Pencil MCP toolchain — already in use)
| Tool | Purpose | Plan usage |
|------|---------|-----------|
| `mcp__pencil__get_editor_state` | Pre-flight active-editor check before mutation | First call in EVERY 25-NN plan (D-54) |
| `mcp__pencil__get_guidelines` | Authoritative composition guidance | Start of 25-01 + 25-03 (`topic: "design-system"`); start of 25-01 (`topic: "landing-page"` for Header conventions) |
| `mcp__pencil__batch_get` | Read Crito source nodes for source-wins audit | Plan 25-01 Task 1 (`ujMLJ` Menu bar); Plan 25-02 Task 1 (`ujMLJ` Footer) |
| `mcp__pencil__batch_design` | Insert/Update/Copy/Move/Delete component nodes | Every build task in 25-01/02/03 (Insert + Update operations) |
| `mcp__pencil__set_variables` | Add tokens IF source demands (per D-33 open policy) | Likely zero calls — Phase 23's 95-token surface should cover Section/Compound work; only if a Header/Footer-specific token is needed |
| `mcp__pencil__get_variables` | Verify token surface before composing | Start of each plan (verify 95 tokens present) |
| `mcp__pencil__snapshot_layout` | Per-component structural validation | Plan-close discipline per VAL-25-04 |
| `mcp__pencil__get_screenshot` | Visual checkpoint for user approval gate | Plan-close discipline per VAL-25-05 (preferred over snapshot_layout for text-clipping verification per Phase 24 quirk doc) |

### Supporting (external — for Pattern B fallback)
| Resource | Purpose | When to Use |
|----------|---------|-------------|
| simpleicons.org canonical Substack SVG path | Pattern B atomic-glyph SVG source per D-46 | Plan 25-02 Task 2 (after lucide probe confirms Substack absence) |
| simpleicons.org canonical Instagram SVG path | Pattern B fallback IF lucide Instagram emits unworkable deprecation behavior | Plan 25-02 Task 2 contingency |

### Component Composition Stack (Phase 24 primitives — Phase 25 consumes, does not rebuild)
| Component | ID | Phase 25 usage |
|-----------|-----|-----------------|
| `Primitive / Button / Default` | `M7eUr` | Section/Header CTA (primary green). Plan 25-01 instances. |
| `Primitive / Button / Default/Hover` | `YJhRv` | (No direct Phase 25 use — Phase 24 forward state) |
| `Primitive / Button / Default/Focus` | `gQa2R` | (No direct Phase 25 use — Phase 27 consumer) |
| `Primitive / Button / Secondary` *(NEW — Plan 25-01)* | TBD | Section/Header secondary CTA (outline). Plan 25-01 ADDS via variant-axis extension per D-43 preferred path OR sibling component per D-43 fallback path. Source: Hero `mkw8g` "Discover More". |
| `Primitive / Input / Default` | `nwJk7` | Section/Footer newsletter email input (visible in image-import-14 + image-import-15 footers). Plan 25-02 instances. |
| `Primitive / Icon / 24` | `u7NmaS` | Default-size Icon for Section/Header CTA `iconTrailing` slot, Section/Footer social icons. Other sizes (`EQaMf=16`, `yRvGb=20`, `dpO5Y=32`) per source-evidence. |
| `Primitive / Badge` | `j0FxQZ` | Available for Card body slot consumer overrides (Blog category tag, Service tier "Startup Business" highlight per image-import-12). Card itself does NOT include Badge — consumers add at instance time. |

### Library Parent Frames (Phase 24 stubs — Phase 25 populates)
| Frame | ID | Populated by |
|-------|-----|--------------|
| `_Components / Sections` | `g9oRa5` | Plan 25-01 (Header) + Plan 25-02 (Footer) |
| `_Components / Compounds` | `t67DU6` | Plan 25-03 (Card) |
| `_Components / Primitives` | `avgor` | Plan 25-01 Task 0 (extends Button with Secondary variant cell per D-43 preferred path — INTERNAL mutation of M7eUr's variant axis, NOT a sibling add — unless probe falls back) |

**No new external installations.** Phase 25 is `.pen`-file-only. No npm, no fonts, no Astro changes.

## Architecture Patterns

### Pencil Slot Mechanics (verified from Pencil docs + Phase 24 guideline § 2)

**Slot declaration** (canonical Pencil schema per `docs.pencil.dev/for-developers/the-pen-format` + PEN-INVENTORY guideline § 2):

```text
A frame inside a reusable component is marked as a slot via the `slot` property.
`slot` accepts either:
  - false  → not a slot
  - [<componentId>, <componentId>, ...]  → array of SUGGESTED component IDs
                                            (guidance for human + AI designers,
                                             not strict enforcement)

Unused/empty slots set `enabled: false` to collapse layout (matches Phase 24 D-30).
Insertion path for consumers: `parentBinding/slotId`.
```

**Phase 24 confirmed pattern** (Button slot signature per `end-of-phase-24/id-inventory.json`):

```text
Primitive / Button / Default (id M7eUr) contains:
  - slots.iconLeading (Default: AvKtA) — "untyped frame with enabled:false"
  - slots.iconTrailing (Default: V4Dx4i) — "untyped frame with enabled:false"
  - slots.label (Default: ATJK9) — fixed text node, not technically a slot

OPEN-24-06: empty-slot collapse not verified standalone in Phase 24.
Phase 25 D-44 RESOLVES by ACTUAL use — Header CTAs wire `arrow-right` Icon into iconTrailing.
```

### Recommended `_Components / Sections / Header` Structure

```
Section / Header  (parent frame; instance of _Components/Sections g9oRa5 child)
├── nav-row  (horizontal auto-layout, gap: space-semantic-inline-md, padding: space-semantic-section-x)
│   ├── logo-slot  (slot:[<TBD-future-logo-component-IDs>] OR slot:[] untyped per probe outcome; enabled:true with placeholder per D-40)
│   ├── nav-links  (horizontal auto-layout, gap: space-semantic-inline-md)
│   │   ├── Home (text, type-semantic-body)
│   │   ├── About (text)
│   │   ├── Service (text)  [+ chevron-down icon? per D-39 source audit]
│   │   ├── Blog (text)
│   │   └── Contact (text)
│   ├── affordances-row  (horizontal auto-layout, gap: space-semantic-inline-sm)
│   │   ├── search icon (ref → Primitive/Icon/24=u7NmaS, glyph: search)
│   │   ├── menu icon (ref → Primitive/Icon/24=u7NmaS, glyph: menu) ← visual fidelity D-39
│   │   └── (optional) chevron-down, moon
│   └── cta-row  (horizontal auto-layout, gap: space-semantic-inline-sm)
│       ├── Button/Secondary instance  ← iconTrailing: ref → Primitive/Icon/24, glyph: arrow-right
│       └── Button/Default instance    ← iconTrailing: ref → Primitive/Icon/24, glyph: arrow-right
└── (sibling) Pencil note: slot signature documentation per D-52
```

**Width:** Fixed match to Crito source per D-41 (likely 1440 — confirm via Plan 25-01 Task 1 `batch_get(ujMLJ)` Menu bar bounds).

### Recommended `_Components / Sections / Footer` Structure

```
Section / Footer  (parent frame; instance of _Components/Sections g9oRa5 child)
├── main-row  (horizontal auto-layout, gap: space-semantic-stack-lg, padding: space-semantic-section)
│   ├── brand-column  (vertical auto-layout)
│   │   ├── logo placeholder (slot OR fixed depending on D-40-pattern reuse decision)
│   │   ├── tagline text (Chivo per D-47 — type-primitive-family-chivo or type-semantic-footer-body)
│   │   └── social-row  (horizontal, gap: space-semantic-inline-sm)
│   │       ├── Instagram icon  (Pattern A IF lucide probe resolves cleanly,
│   │       │                    Pattern B atomic-glyph fallback per D-45 contingency)
│   │       └── Substack icon   (Pattern B atomic-glyph per D-46 — confirmed not in lucide)
│   ├── link-column "Company" (vertical auto-layout, gap: space-semantic-stack-sm)
│   │   ├── column heading (text)
│   │   └── link list (literal Crito labels per D-48)
│   ├── link-column "Help" (same shape)
│   ├── link-column "Resources" (same shape)
│   └── link-column "Link" (same shape — Crito's literal "Link" header per source-wins D-48)
├── copyright-row  (horizontal, fill_container)
│   ├── copyright text (Chivo 14, color: color-semantic-text-on-dark, opacity 0.8 per audit)
│   └── social-icons mirror (optional per source audit)
└── (sibling) Pencil note: slot signature documentation
```

**Bg color:** `#141f39ff` (navy-900, source-evidence: Crito Footer per PEN-INVENTORY Audit Findings) bound to `color-semantic-bg-footer` or `color-semantic-bg-dark` semantic.

### Recommended `_Components / Compounds / Card` Structure (D-51 4-slot signature)

```
Compound / Card  (parent frame; instance of _Components/Compounds t67DU6 child)
├── image-slot       (slot:[<image/frame component-IDs OR empty array>]; enabled:true)
│   └── default content: placeholder rectangle, fill: color-semantic-bg-muted, aspect ~16:10
├── content-stack    (vertical auto-layout, gap: space-semantic-stack-sm, padding: space-semantic-card-inner=24)
│   ├── title-slot   (slot:[]; enabled:true)
│   │   └── default: "Card title" (Plus Jakarta Sans 20, color-semantic-text-primary)
│   ├── body-slot    (slot:[]; enabled:true)
│   │   └── default: "Card body text. Replace at instance time." (Inter 14, color-semantic-text-secondary)
│   └── footer-actions-slot  (slot:[<M7eUr Button/Default>, <Button/Secondary new>]; enabled:true)
│       └── default: Primitive/Button/Default instance with label "Read More" + iconTrailing arrow-right
└── (sibling) Pencil note: "Compound / Card — 4 slots:
                            image (accepts Image or Frame; default: placeholder rect),
                            title (accepts Text; default: 'Card title'),
                            body (accepts Text or rich content; default: 'Card body text'),
                            footer-actions (accepts Frame or Primitive/Button instance; default: Read More CTA).
                            All slots default enabled:true with placeholder content for library discoverability (D-53).
                            Consumers REPLACE placeholders via instance overrides — see PEN-INVENTORY § Compound Source Inference (Phase 25)."
```

**Card frame**: fill: `color-semantic-bg-card` (likely `#ffffff` per source), cornerRadius: `radius-semantic-card` (~10-16 — Plan 25-03 raster-probe decides), border: `color-semantic-border-default` (`#d4d4d8` neutral-200) 1px stroke per image-import-12 service-card source. **NO Card hover/focus states** per Claude's Discretion default in CONTEXT (defer until concrete consumer demand, surface as OPEN-25-XX if needed).

### Anti-Patterns to Avoid (Phase 25 specific)

- **Building three Card variants for Project/Blog/Service** — COMP-07 HARD-PROHIBITS. The variant-temptation is real because each consumer subtly differs (Project = image+title+date+"Read More"; Blog = date-badge-over-image+category+title+excerpt; Service = title+description+arrow). Resist. Slot content covers ALL variation.
- **Pre-emptive Card subdivision (image-overlay slot + image slot + badge-overlay slot)** — D-51 4-slot signature is intentionally generic. Image-overlay date-badge (visible in image-import-14 Blog cards) is the consumer's instance-time concern, NOT a Card-component-level slot.
- **Card hover lift / shadow ramp** — Crito source doesn't depict (visible in static raster). Default no-ship; surface as OPEN-25-XX if Phase 28 Blog consumer surfaces need.
- **Mutating Phase 24 primitives outside the D-42/D-43 Secondary-Button addition** — Button Default (M7eUr) Hover/Focus variants are locked. Only the new `purpose` variant axis cell (or sibling Button/Secondary fallback) is in-scope mutation.
- **Inventing brand-glyph SVG paths** — Pattern B Substack glyph MUST cite simpleicons.org canonical path (D-46). Hand-drawing is forbidden.
- **Treating slot documentation as Pencil-note-only** — D-52 says try `slot: [<suggested-IDs>]` typed props FIRST, fall back to untyped + sibling note. Sibling note is supplementary, not a replacement.
- **Skipping the iconTrailing wire-up for Header CTAs** — D-44 requires REAL `arrow-right` icon wire (resolves OPEN-24-06 by actual use). A label-only Button instance would skip the empty-slot-collapse verification.

## Don't Hand-Roll

Problems that look simple but have existing solutions in this phase's scope:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Secondary outline button styling | Hand-author a new outline-button frame from scratch | Add `purpose` variant cell to existing `Primitive / Button` (M7eUr) per D-43 preferred path | Keeps all Button variants discoverable in Pencil's variant picker; preserves Phase 24 Hover/Focus cells; matches D-22 compositional minimum philosophy |
| Instagram social glyph | Hand-author SVG path | `library: "lucide", icon: "instagram"` Pattern A probe per D-45 (with deprecation-warning caveat — lucide brand icons are deprecated as of v0.475.0 but still ship) | Pencil-native Pattern A is the Phase 24 D-25-superseded standard; deprecation is a warning, not a removal |
| Substack social glyph | Hand-author SVG path freehand | simpleicons.org canonical SVG path per D-46 — Pattern B atomic-glyph component | lucide explicitly does NOT add brand logos (confirmed via lucide-icons/lucide#2792 "not planned"); simpleicons is the canonical public-source brand-icon library |
| Newsletter email input in Footer | Build inline input markup | Instance `Primitive / Input / Default` (nwJk7) | COMP-09 zero-raw-inline-markup; primitive composition is the v2.0 discipline |
| Card image placeholder | Build raw `<img>`-shape rectangle | Pencil placeholder rectangle with `color-semantic-bg-muted` fill (D-53 default content) | Slot mechanics expect a frame-shaped placeholder; consumer overrides at instance time |
| Variant matrix for Card "project/blog/service kinds" | Build three Card variants | Build ONE Card with 4 slots (D-51) — variation via slot content | Explicit COMP-07 requirement; slot-vs-variant is the Pencil-mechanics policy decided in Phase 23 |
| Footer copyright micro-text styling | Add new typography token | Reuse Phase 23's `Chivo`-family primitive (note: shipped as `Footer-conditional, Phase 24+ may remove` per OPEN-23-09) | D-47 confirms Chivo is the load-bearing footer typography per Crito source — the conditional primitive earns its keep |
| Custom Pencil slot-typing validator | Build a sibling check that "slot only accepts X" | Pencil-native `slot: [<componentIds>]` array (suggestion mechanism — guidance, not enforcement) + sibling Pencil note per D-52 belt-and-suspenders | Pencil enforces via UI affordance, not rejection; sibling note covers human-readable contract |

**Key insight:** Phase 25's primary discipline is **composition of Phase 24 primitives via slots**, NOT new component construction. The only NEW components shipped are: (a) Button Secondary variant cell, (b) Section/Header, (c) Section/Footer, (d) Compound/Card, (e) Substack atomic-glyph (Pattern B fallback). Everything else is a `ref` instance of existing primitives.

## Common Pitfalls

### Pitfall 1: Card-Variants Creep (highest risk — repeat of v1.4 failure at the component layer)
**What goes wrong:** Plan 25-03 raster-audit surfaces three visually-distinct cards (Project per image-import-12 bottom; Blog per image-import-14; Service per image-import-12 top). Temptation: ship three variants. Outcome: COMP-07 hard-prohibition violated; slot mechanics never exercised; downstream phases fork their card consumers.
**Why it happens:** Variant matrices feel "complete-looking"; slot composition feels "incomplete-looking" to design-tool eyes. PITFALLS O1 (premature variant systems) is the structural risk.
**How to avoid:** Plan 25-03 first task explicitly audits the three card subregions side-by-side and confirms a single 4-slot signature serves all three via slot CONTENT (Project = image + title + date-text-in-body + "Read More" Button in footer-actions; Blog = image + category-badge + title + excerpt + meta-row in footer-actions; Service = optional-empty-image + title + description + arrow-CTA in footer-actions).
**Warning signs:** Plan 25-03 task list contains the word "variants" anywhere outside of the COMP-07-prohibition-attestation context. Plan 25-03 audit log mentions "Project Card" / "Blog Card" / "Service Card" as separate deliverables.

### Pitfall 2: Building Compound/Card from inference without raster grounding (rerun of v1.4 at the component layer)
**What goes wrong:** Plan 25-03 skips the raster-probe and builds Card from the v1.3 `src/components/ui/Card.astro` neobrutalist pattern. Output is a yellow-shadow neobrutalist card visually disconnected from Crito's clean white-card-with-subtle-border aesthetic.
**Why it happens:** Code-side Card.astro is "available reference material" — the bias is toward what's quick.
**How to avoid:** D-49 explicitly orders the source priority — raster-probe PRIMARY; v1.3 Card.astro SECONDARY (structural reference only, not visual values). Plan 25-03 Task 1 reads `design/images/image-import-{12,14,8,22,29}.jpg` BEFORE consulting Card.astro. Visual values (fill, border, shadow, cornerRadius) derive from raster-probe + Phase 23 tokens.
**Warning signs:** Plan 25-03 Task 1 plan references Card.astro before the raster-probe. Card fill uses any color outside the Phase 23 token surface. Card shadow uses neobrutalist `6px 6px 0` offset pattern.

### Pitfall 3: Skipping iconTrailing wire-up for Header CTAs (skips OPEN-24-06 resolution)
**What goes wrong:** Plan 25-01 ships Header CTAs as label-only Button instances. OPEN-24-06's "empty-slot collapse vs icon-bearing consumer" never gets verified.
**Why it happens:** Wiring the icon requires both knowing `arrow-right` is in the Phase 24 ship-list AND understanding the Pencil `ref` + `descendants` override pattern (PEN-INVENTORY guideline § 3).
**How to avoid:** D-44 EXPLICITLY requires both Header CTAs wire the icon. Plan 25-01 Task 4 (Build Header) MUST include `descendants` overrides on the `Primitive / Button` ref that populate `iconTrailing` slot with `ref → Primitive/Icon/24=u7NmaS` and override `icon: "arrow-right"`. Plan-close SUMMARY MUST update OPEN-24-06's resolution status.
**Warning signs:** Plan 25-01 Task 4 batch_design payload does not contain `iconTrailing` descendant key. Plan 25-01 SUMMARY says OPEN-24-06 is "deferred to a future plan."

### Pitfall 4: Treating slot signature as Pencil-note-only (skips typed-slot Pencil-native attempt)
**What goes wrong:** Plan 25-03 ships Card with sibling note documenting slot signature but doesn't try Pencil's `slot: [<componentIds>]` typed-suggestion mechanism. Library discoverability (consumer in Phase 28 Blog hovers slot → sees no suggestion list) is degraded.
**Why it happens:** Sibling notes are the established Phase 24 documentation pattern. Pencil-native typing is new territory.
**How to avoid:** D-52 says **try Pencil-native typed slots FIRST**, fall back to untyped IF probe shows OPEN-23-13-style limitation. Plan 25-03 Task 2 explicitly probes typed-slot mechanics on a single Card slot before propagating. The sibling note ships REGARDLESS of typed-slot probe outcome — belt-and-suspenders.
**Warning signs:** Plan 25-03 batch_design payload contains zero `slot: [...]` entries. Plan 25-03 SUMMARY says "Pencil typed slots not investigated."

### Pitfall 5: Inventing brand-glyph SVG paths (Pattern B Substack)
**What goes wrong:** Plan 25-02 hand-authors a Substack mark from memory. Output is visually wrong and/or violates brand-mark trademark conventions.
**Why it happens:** simpleicons.org requires a lookup; hand-drawing feels faster.
**How to avoid:** D-46 mandates citing a public-source SVG path. Use the simpleicons canonical Substack path (verified 2026-06-01): `M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z` (viewBox `0 0 24 24`).
**Warning signs:** Plan 25-02 Pattern B atomic-glyph component contains an SVG path that doesn't match the simpleicons canonical. Plan 25-02 SUMMARY does not cite the source URL.

### Pitfall 6: Mutating Phase 24 primitives beyond D-42/D-43 scope
**What goes wrong:** Plan 25-01 Task 0 attempts to "improve" Button Default's padding, gap, or radius while adding the Secondary variant cell. Phase 24 baseline drift introduced.
**Why it happens:** Refactoring temptation when touching the same component.
**How to avoid:** Plan 25-01 Task 0 scope is bounded to (a) add `purpose` variant axis OR (b) ship sibling `Primitive / Button / Secondary` component (D-43 fallback). Any other Button mutation requires a separate phase/plan with explicit user approval. Plan 25-01 SUMMARY logs all Phase 24 IDs touched.
**Warning signs:** Plan 25-01 batch_design contains Update ops on M7eUr (Default), YJhRv (Hover), gQa2R (Focus), or their child IDs outside the variant-axis-extension context.

### Pitfall 7: Picking up the wrong Footer Joel-brand swap pattern at the component layer
**What goes wrong:** Plan 25-02 swaps Crito's LinkedIn/Twitter brand glyphs (akar-icons per Phase 24 audit) for Joel's Instagram/Substack AT THE COMPONENT LEVEL.
**Why it happens:** D-45/D-46 says ship Joel-brand glyphs. CONTEXT clarification: glyphs ship at Phase 25, but the SOCIAL ROW INSTANCE in Section/Footer uses the appropriate brand set at the COMPONENT level (Joel's Instagram + Substack), since Section/Footer is Joel's component. Crito's LinkedIn+Twitter glyphs are NOT shipped (per Phase 24 OPEN-24-13).
**How to avoid:** Re-read CONTEXT "Out of scope" line: "Joel-brand glyph swap on inside-page Footer instances (those overrides happen at Phase 31 Homepage instance time; brand-glyph atomic primitives DO ship in Phase 25)" — this means the GLYPH PRIMITIVES are Phase 25 deliverables; PAGE-INSTANCES that override the social row come at Phase 31. Section/Footer at the component level uses Joel-brand glyphs (Instagram + Substack) as defaults — this is the component-level intent.
**Warning signs:** Plan 25-02 SUMMARY mentions shipping LinkedIn/Twitter atomic glyphs.

### Pitfall 8: snapshot_layout false-positive misread
**What goes wrong:** Plan 25-NN close sees `snapshot_layout` report `"partially clipped"` on Header/Footer/Card text children and treats as a real bug. Time spent debugging a non-issue; user gate delayed.
**Why it happens:** Phase 24 documented quirk (per `end-of-phase-24/id-inventory.json snapshot_layout_quirk_documented`) — text inside button/badge frames reports y-coordinate that doesn't match layout math.
**How to avoid:** Plan-close SUMMARY adopts Phase 24 precedent — document snapshot_layout per-frame quirk + visually verify via `get_screenshot` + user approval. Document-level `snapshot_layout(maxDepth: 0, problemsOnly: true)` remains reliable for top-frame overlap.
**Warning signs:** Plan 25-NN spends multiple iterations adjusting layout to satisfy snapshot_layout text-clipping warnings.

## Code Examples

Verified Pencil MCP composition patterns for Phase 25 work. All examples assume preceding `mcp__pencil__get_editor_state({include_schema: false})` returned `design/Crito.pen` per D-54.

### Pattern 1: Read Home Page Menu bar subtree (Plan 25-01 Task 1)

```text
mcp__pencil__batch_get({
  queries: [
    { id: "ujMLJ", readDepth: 4 }   // Home Page (parent)
  ]
})
// → Walks ujMLJ children. Identify Menu bar group (likely a top-region child).
// → Enumerate: logo node, nav-link text nodes (Home/About/Service/Blog/Contact?),
//   affordance icons (search/menu/chevron-down/moon), CTA button group (fwSmg primary + mkw8g secondary).
// → Record source citations for PEN-INVENTORY § Variant Evidence (Phase 25) rows.
```

### Pattern 2: Add Button Secondary purpose variant cell (Plan 25-01 Task 0 — preferred path per D-43)

```text
// First: read existing Button to know current variant-axis schema
mcp__pencil__batch_get({ queries: [{ id: "M7eUr", readDepth: 3 }] })

// If Button uses a `purpose` variant axis already (unlikely — Phase 24 shipped purpose-implicit Default only):
//   Add new cell to existing axis.
// If Button has NO purpose axis (likely — only Hover/Focus state cells exist):
//   Strategy A (preferred per D-43): Add `purpose` variant axis to component definition.
//     This requires batch_design Update on Button parent definition.
//   Strategy B (fallback per D-43): Ship sibling `Primitive / Button / Secondary` component.
//     Insert into avgor parent. Independent component, not a variant cell.

// Source-evidenced values from Hero `mkw8g` "Discover More":
//   fill: none
//   stroke: "#ffffffff" (white — note: Crito context is dark-bg hero;
//                        Header context is light-bg → Plan 25-01 must decide stroke color
//                        per source IF Header source mkw8g equivalent exists,
//                        OR ship Hero-source-as-canonical and let Header instance override)
//   strokeWidth: 0.5
//   strokeAlignment: "inner"
//   cornerRadius: 10 (matches Default's radius-semantic-button=10)
//   padding: [16, 20] (matches Default)
//   gap: 10 (matches Default's OPEN-24-01 literal)
//   label typography: identical to Default (Inter 16/500)

mcp__pencil__batch_design({
  operations: [
    'secondaryButton=I(avgor,{type:"frame",name:"Primitive / Button / Secondary",x:..,y:..,width:160,height:52,reusable:true,layout:"horizontal",padding:[16,20],gap:10,fill:"none",stroke:"#ffffffff",strokeWidth:0.5,strokeAlignment:"inner",cornerRadius:10})',
    'iconLeading=I(secondaryButton,{type:"frame",name:"iconLeading",slot:[],enabled:false})',
    'label=I(secondaryButton,{type:"text",text:"Button",fontFamily:"Inter",fontSize:16,fontWeight:500,fill:"#141f39ff"})',
    'iconTrailing=I(secondaryButton,{type:"frame",name:"iconTrailing",slot:[<u7NmaS>],enabled:false})'
  ]
})
```

**NOTE:** Per OPEN-23-13 (batch_design `$<token>` rejection), use literal hex/font values inline AND record the conceptual token binding in PEN-INVENTORY § Variant Evidence (Phase 25) row. Phase 25 inherits Phase 24's dual-track audit-trail discipline.

### Pattern 3: Instance Button with iconTrailing wire-up (Plan 25-01 Task 4 — Header CTAs)

```text
// Per PEN-INVENTORY guideline § 2 (slot insertion path: parentBinding/slotId)
// and guideline § 3 (Icon descendants override pattern):

mcp__pencil__batch_design({
  operations: [
    // Primary CTA: Default Button with arrow-right
    'primaryCTA=I(headerCtaRow,{type:"ref",ref:"M7eUr",descendants:{"ATJK9":{text:"Get Consulting"},"V4Dx4i":{enabled:true}}})',
    // Insert Icon ref into iconTrailing slot
    'primaryCTAIcon=I(primaryCTA/V4Dx4i,{type:"icon",library:"lucide",icon:"arrow-right",width:24,height:24,fill:"#ffffffff"})',

    // Secondary CTA: Secondary Button (NEW from Task 0) with arrow-right
    'secondaryCTA=I(headerCtaRow,{type:"ref",ref:"<secondaryButtonId>",descendants:{"<labelId>":{text:"Learn More"},"<iconTrailingId>":{enabled:true}}})',
    'secondaryCTAIcon=I(secondaryCTA/<iconTrailingId>,{type:"icon",library:"lucide",icon:"arrow-right",width:24,height:24,fill:"#141f39ff"})'
  ]
})
```

**Verifies OPEN-24-06 resolution:** When the consumer enables the previously-disabled slot AND inserts an Icon descendant, the slot must render visibly. Plan 25-01 SUMMARY documents the outcome (slot enables cleanly + Icon renders) or surfaces a refined OPEN flag.

### Pattern 4: Slot-typed Compound/Card (Plan 25-03 Task 3 — D-52 preferred path)

```text
mcp__pencil__batch_design({
  operations: [
    // Card parent — reusable component
    'card=I(t67DU6,{type:"frame",name:"Compound / Card",x:..,y:..,width:380,height:480,reusable:true,layout:"vertical",gap:0,padding:0,fill:"#ffffffff",stroke:"#d4d4d8ff",strokeWidth:1,cornerRadius:10})',

    // Image slot — typed with no specific suggestions (empty array allowed)
    'imageSlot=I(card,{type:"frame",name:"image-slot",slot:[],enabled:true,layout:"horizontal",width:380,height:220,fill:"#fafafaff"})',
    // Default placeholder content per D-53
    'imagePlaceholder=I(imageSlot,{type:"frame",fill:"#fafafaff",width:380,height:220})',

    // Content stack
    'contentStack=I(card,{type:"frame",name:"content-stack",layout:"vertical",gap:16,padding:24})',

    // Title slot
    'titleSlot=I(contentStack,{type:"frame",name:"title-slot",slot:[],enabled:true})',
    'titleDefault=I(titleSlot,{type:"text",text:"Card title",fontFamily:"Plus Jakarta Sans",fontSize:20,fontWeight:700,fill:"#141f39ff"})',

    // Body slot
    'bodySlot=I(contentStack,{type:"frame",name:"body-slot",slot:[],enabled:true})',
    'bodyDefault=I(bodySlot,{type:"text",text:"Card body text. Replace at instance time with project metric, blog excerpt, or service description.",fontFamily:"Inter",fontSize:14,fontWeight:400,fill:"#52525bff"})',

    // Footer-actions slot — TYPED with M7eUr + Secondary suggestions per D-52 preferred
    'footerSlot=I(contentStack,{type:"frame",name:"footer-actions-slot",slot:["M7eUr","<secondaryButtonId>"],enabled:true})',
    // Default action: Button/Default instance with arrow-right
    'footerDefault=I(footerSlot,{type:"ref",ref:"M7eUr",descendants:{"ATJK9":{text:"Read More"},"V4Dx4i":{enabled:true}}})',
    'footerDefaultIcon=I(footerDefault/V4Dx4i,{type:"icon",library:"lucide",icon:"arrow-right",width:24,height:24,fill:"#ffffffff"})',

    // Sibling Pencil note documenting slot signature (D-52 belt-and-suspenders)
    'cardSlotNote=I(t67DU6,{type:"text",text:"Compound / Card slot signature:\\n- image (Image|Frame; default: placeholder rect)\\n- title (Text; default: \'Card title\')\\n- body (Text|rich; default: filler)\\n- footer-actions (Frame|Primitive/Button; default: Read More CTA with arrow-right)\\nAll slots enabled:true with placeholder content per D-53 for library discoverability.",fontFamily:"Inter",fontSize:14,fill:"#52525bff",width:600})'
  ]
})
```

### Pattern 5: Pattern B atomic-glyph (Substack — Plan 25-02 Task 2)

```text
// After D-45 probe confirms Substack is missing from lucide
// (verified 2026-06-01: lucide-icons/lucide#2792 closed "not planned" — brand icons deprecated/excluded):

mcp__pencil__batch_design({
  operations: [
    // Atomic glyph child component per D-25-superseded Pattern B
    'substackGlyph=I(<iconGlyphsParent>,{type:"frame",name:"Primitive / Icon / glyphs / substack",x:..,y:..,width:24,height:24,reusable:true})',
    'substackPath=I(substackGlyph,{type:"vector",path:"M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z",fill:"#141f39ff",width:24,height:24})'
  ]
})
// SVG path source: simpleicons.org/icons/substack (verified 2026-06-01)
// viewBox 0 0 24 24 — matches Pencil-native Icon size 24 default

// Section/Footer social-row consumer overrides the default chevron-right glyph:
mcp__pencil__batch_design({
  operations: [
    'footerInsta=I(<socialRow>,{type:"icon",library:"lucide",icon:"instagram",width:24,height:24,fill:"#ffffffff"})',  // Pattern A
    'footerSubstack=I(<socialRow>,{type:"ref",ref:"<substackGlyphId>",descendants:{"<pathNodeId>":{fill:"#ffffffff"}}})'  // Pattern B
  ]
})
```

### Pattern 6: Pre-flight active-editor check (D-54 — EVERY mutation plan)

```text
mcp__pencil__get_editor_state({ include_schema: false })
// Expected return: { activeEditor: "/Users/joel/Desktop/Claude-Demos/joel-shinness-website/design/Crito.pen", ... }
// Assert match. Halt and surface to user on mismatch.
// Phase 24 ran ~14 of these with 0 incidents per end-of-phase-24/id-inventory.json validation_outcomes.
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `Primitive / Icon` via Pattern B atomic-glyph children (D-25 original) | Pattern A `library: "lucide"` native (per Phase 24 Q4 probe — D-25 SUPERSEDED) | Phase 24 plan 24-04 | Most icons ship native; Pattern B reserved for brand glyphs lucide can't provide (D-46 Substack) |
| OPEN-flag-as-blocker (would block phase close) | OPEN-flag-as-audit-trail (per Phase 23 D-09) | Phase 23 | Phase 25 generates OPEN-25-NN rows during plans without blocking close; resolution happens at consumer phase |
| Two-token-tier (Joel v1.3 — primitives only) | Two-tier with semantic aliases (95-token surface per Phase 23) | Phase 23 | Components reference semantic only (D-14) — Phase 25 follows |
| Hand-author Button variant matrices for completeness | Source-wins variant discipline (D-21/D-22/D-24) | Phase 24 | Phase 25 inherits — Secondary Button variant added ONLY because Hero `mkw8g` source exists (OPEN-24-11) |
| `batch_design` value: `$<token-name>` resolution | Literal value inline + sibling audit-trail row in PEN-INVENTORY Variant Evidence (OPEN-23-13 dual-track) | Phase 23 plan 23-05 | Phase 25 inherits — every literal in batch_design payload gets a Variant Evidence row |
| Pre-flight active-editor optional | Pre-flight `get_editor_state` MANDATORY before mutation (D-35 → D-54) | Phase 23 plan 23-05 (mid-phase OPEN-23-14 incident) | Phase 25 inherits — zero exceptions |

**Deprecated/outdated for Phase 25:**
- **D-25 atomic-glyph as default Icon pattern** — superseded by Phase 24's confirmed Pattern A. Phase 25 uses Pattern B ONLY for brand glyphs lucide explicitly excludes.
- **`@light,@dark` per-theme variable syntax** — Phase 23 D-01 omitted dark slots entirely. Phase 25 does not introduce them.

## Open Questions

Things that couldn't be fully resolved by research — flagged for execution-time probe in the plans.

### 1. Pencil 2.13 variant-axis-addition mechanics for existing components
**What we know:** Pencil schema supports `reusable: true` components with variant patterns (Phase 24 shipped Button/Default + Default/Hover + Default/Focus via separate frames). Public docs (`docs.pencil.dev/for-developers/the-pen-format`) don't describe variant-axis-extension internals.
**What's unclear:** Can a new `purpose` variant axis cell be added to existing M7eUr Button without restructuring Default/Hover/Focus cells? Does Pencil schema represent variants via parent-grouping-frame or via `variant` property on each variant cell?
**Recommendation:** Plan 25-01 Task 0 EXECUTES the probe — try preferred path (Update M7eUr to add `purpose` axis cell). If batch_design returns error OR Hover/Focus cells get clobbered, FALL BACK to sibling component `Primitive / Button / Secondary` per D-43 fallback path. Either path resolves OPEN-24-11. Document outcome in 25-01-SUMMARY.md.

### 2. Pencil 2.13 typed-slot mechanics — array-of-suggested-component-IDs precise behavior
**What we know:** PEN-INVENTORY guideline § 2 (verbatim Pencil-MCP-returned text) says: `slot` accepts an array of recommended component IDs. `docs.pencil.dev/core-concepts/slots` confirms "suggested slot components" mechanism — Pencil shows special UI affordance, lets consumers single-click insert suggested components. No published evidence of strict enforcement.
**What's unclear:** Does `slot: ["M7eUr", "<secondaryButtonId>"]` reject other instance types at insertion? Or is it guidance-only (consumer can still insert any type, just no special UI)? Does `enabled: false` collapse the slot to zero-dimension in auto-layout, or does it preserve a zero-content frame?
**Recommendation:** Plan 25-03 Task 2 EXECUTES the probe on a single Card footer-actions slot. Try `slot: [M7eUr]` → check Pencil-UI presentation via `get_screenshot`. Try `slot: []` → confirm vs typed. Try `enabled: false` vs `enabled: true` with placeholder → measure auto-layout collapse. Document outcome before propagating to all 4 slots. D-52 belt-and-suspenders: sibling Pencil note ships regardless of typed-slot outcome.

### 3. Header CTA secondary stroke color for light-bg context
**What we know:** Source `mkw8g` ("Discover More") is in Hero on dark-bg with stroke `#ffffffff` white. Section/Header context is light-bg (Crito Menu bar — `#ffffffff` background per Home Page audit).
**What's unclear:** Should Secondary Button cell stroke be the source-literal `#ffffffff` (white-on-light = invisible) OR the contextual color `#141f39ff` (navy-on-light)? Source-wins says ship `#ffffffff`; consumer-context-aware says ship navy.
**Recommendation:** Plan 25-01 ships Secondary cell with stroke `#141f39ff` (navy — context-aware default) AND records this as OPEN-25-XX with severity `notable` since it deviates from strict source-literal. Header instance then uses default stroke. Phase 31 Homepage Hero (which DOES use mkw8g context) can override at instance time to white. This preserves source-wins discipline at INSTANCE level while making the COMPONENT-level default usable.

### 4. Footer Newsletter Subscribe Input — derived from raster?
**What we know:** image-import-14.jpg (Blog index) Footer area shows a "Get update by signup newsletter" input row with "Your email..." placeholder + yellow "Subscribe" button. This is `Primitive / Input / Default` (nwJk7) instance + Button instance + label text.
**What's unclear:** Does the Subscribe button use Default green (`#38da71ff`) or a different yellow (`#fdba09ff` from Crito's banner amber)? Raster shows yellow.
**Recommendation:** Plan 25-02 Task 1 enumerates the Subscribe button source via `batch_get` on the Footer subtree. If yellow, this surfaces OPEN-25-XX — possibly a third Button purpose variant (`yellow` / `amber`) — but defer to Plan 25-02 SUMMARY decision. May simply override fill at instance time without shipping a new variant cell (matches D-24 source-wins-but-don't-multiply).

### 5. Header logo slot default content (D-40)
**What we know:** D-40 establishes logo as a slot. Plan 25-01 ships the slot pattern.
**What's unclear:** What goes in the slot's `enabled: true` placeholder per D-53 carryover? Crito "Crito" wordmark literal? Generic "Logo" placeholder text? Pencil placeholder frame?
**Recommendation:** Ship `enabled: true` with the Crito wordmark TEXT as the placeholder (matches D-38 strict source-wins discipline for Header content). Phase 31 Homepage overrides at instance time with Joel-brand wordmark (when designed). Surface as informational note in Plan 25-01 SUMMARY (not OPEN flag — already covered by deferred ideas).

### 6. Chivo footer-typography token strategy (D-47)
**What we know:** Phase 23 shipped Chivo as a primitive token with note `'Footer-conditional, Phase 24+ may remove'` (OPEN-23-09 resolution). D-47 confirms Footer uses Chivo — primitive earns its keep.
**What's unclear:** Should Plan 25-02 reference the primitive directly (`type-primitive-family-chivo`) OR add a semantic alias family (`type-semantic-footer-body-family`, `type-semantic-footer-body-size`, etc.)?
**Recommendation:** Per Claude's Discretion in CONTEXT — pick based on whether aliasing earns its keep. **Default recommendation:** Reference primitive directly (NO new semantic aliases) — Footer is the SINGLE consumer of Chivo per audit; aliasing at this scale adds no readability gain. Pitfall 7 (premature token hierarchies) enforcement. If Phase 31 surfaces a footer-typography-override pattern, add the alias family then.

### 7. Card cornerRadius source-evidence
**What we know:** image-import-12 Service cards show subtle rounded corners (~8-12px); image-import-14 Blog cards show similar. Phase 23 shipped `radius-primitive-10` and `radius-semantic-card` (verify — TBD).
**What's unclear:** Exact Crito Card radius from raster is hard to read precisely. Phase 24 Badge inferred radius via D-32 Case B (reuse `radius-semantic-button=10`).
**Recommendation:** Plan 25-03 reuses `radius-semantic-card` IF it exists in the 95-token surface; otherwise reuses `radius-semantic-button=10` (Phase 24 D-32 Case B precedent — Pitfall 7 enforcement, no new tokens added). Document as Variant Evidence row.

## Validation Architecture

Mirror Phase 24's VAL-24-* per-plan validation discipline. Plan VALIDATION.md generation should populate these VAL-25-* assertions:

| VAL ID | Assertion | Validates | How to Verify |
|--------|-----------|-----------|---------------|
| VAL-25-01 | Section/Header placed under `_Components / Sections` (g9oRa5) | COMP-05 + COMP-08 | `batch_get(g9oRa5, readDepth: 2)` — confirm Section/Header child present with reusable:true |
| VAL-25-02 | Section/Footer placed under `_Components / Sections` (g9oRa5) | COMP-06 + COMP-08 | `batch_get(g9oRa5, readDepth: 2)` — confirm Section/Footer child present |
| VAL-25-03 | Compound/Card placed under `_Components / Compounds` (t67DU6) | COMP-07 + COMP-08 | `batch_get(t67DU6, readDepth: 2)` — confirm Compound/Card child present, NO multi-variant matrix |
| VAL-25-04 | Card has exactly 4 slots (image, title, body, footer-actions) per D-51 | COMP-07 slot-not-variant policy | `batch_get(<cardId>, readDepth: 3)` — enumerate slot-property frames, confirm 4 |
| VAL-25-05 | All 4 Card slots default `enabled: true` with placeholder content per D-53 | D-53 library-discoverability decision | Same batch_get — confirm `enabled: true` on each slot + non-empty child |
| VAL-25-06 | Card slot signature documented via Pencil-native typed slot props per D-52 preferred OR sibling note per D-52 fallback (both ship per D-52 belt-and-suspenders) | D-52 slot documentation policy | Verify `slot: [...]` array on 0+ Card slots AND verify sibling Pencil note exists under t67DU6 |
| VAL-25-07 | Section/Header instances Primitive/Button (M7eUr or new Secondary) AT LEAST TWICE (dual CTA per D-42) | D-42 + COMP-05 composition | `batch_get(<headerCtaRow>, readDepth: 2)` — confirm 2 Button refs |
| VAL-25-08 | Header CTA Button instances have iconTrailing slot ENABLED + populated with Icon ref to arrow-right (D-44 resolution of OPEN-24-06) | D-44 + OPEN-24-06 resolution | Walk header CTA → confirm V4Dx4i descendant has `enabled: true` AND contains type:icon library:lucide icon:arrow-right |
| VAL-25-09 | Section/Footer instances Primitive/Icon for Instagram (Pattern A lucide-native OR Pattern B fallback per D-45 probe) AND Substack (Pattern B atomic-glyph per D-46) | D-45/D-46 + OPEN-24-13 resolution | Walk footer social-row → confirm 2 icon nodes; verify Instagram either type:icon library:lucide icon:instagram OR ref to Pattern B atomic; verify Substack is ref to Pattern B atomic glyph |
| VAL-25-10 | Pattern B Substack atomic-glyph SVG path matches simpleicons canonical (provenance attestation) | D-46 source-citation discipline | `batch_get(<substackGlyphId>, readDepth: 2)` — extract path attribute, confirm match against `M22.539 8.242H1.46...` (simpleicons.org Substack canonical, verified 2026-06-01) |
| VAL-25-11 | Secondary Button variant cell added per D-43 preferred path (variant-axis extension to M7eUr) OR sibling component per D-43 fallback (Primitive/Button/Secondary as independent reusable) | D-43 + OPEN-24-11 resolution | Walk M7eUr OR avgor — confirm Secondary cell/component present with source-evidenced values (fill:none, stroke literal, strokeWidth:0.5) |
| VAL-25-12 | Section + Compound + Glyph nodes use Pencil auto-layout (no absolute-positioned children) | COMP-09 + LAYOUT-01 carry-forward | snapshot_layout structural check + spot-verify each component frame's `layout` property |
| VAL-25-13 | Zero raw-value leaks beyond accepted Phase 23 + Phase 24 + Phase 25 Variant Evidence set | COMP-09 zero-raw-values | Sweep walker per Phase 24 Plan 24-05 Pattern — recursive batch_get over new nodes; literal-set intersection check against accepted Phase 23/24/25 set |
| VAL-25-14 | Pre-flight `get_editor_state` called before EVERY batch_design / set_variables call across Phase 25 (D-54) | D-54 carry-forward | Count from plan SUMMARYs — expect ~6-10 calls across 3 plans, 0 mismatch incidents |
| VAL-25-15 | snapshot_layout per-component runs clean at document level (maxDepth: 0); per-frame text-clipping false-positives documented per Phase 24 quirk | Phase 24 quirk carry-forward | snapshot_layout document-level + per-frame; document quirks in 25-NN-SUMMARY |
| VAL-25-16 | PEN-INVENTORY § Variant Evidence (Phase 24) EXTENDED with Phase 25 rows per D-56 (Secondary Button cell + each Section variant cell + Card slot bindings) — OR new sibling section per Claude's Discretion | D-23 audit-trail discipline carry-forward | Diff PEN-INVENTORY before/after Phase 25 — verify N new rows |
| VAL-25-17 | PEN-INVENTORY adds new `## Compound Source Inference (Phase 25)` section per D-49 + D-56 with per-slot raster citations for Card | D-49 raster-probe provenance | Verify section exists in PEN-INVENTORY with image-import-{12,14,8,22,29}.jpg citation rows |
| VAL-25-18 | OPEN-25-XX flag rows added per D-50 (Card source-coverage) + any other discovered flags | D-50 + Phase 23 D-09 carry-forward | Verify `### Open Flags — Phase 25 (OPEN-25-NN)` section in PEN-INVENTORY |
| VAL-25-19 | OPEN-24-06 (empty-slot collapse) marked RESOLVED with citation to Plan 25-01 Header CTA iconTrailing wire-up | D-44 ACTUAL-use resolution | PEN-INVENTORY OPEN-24-NN table — OPEN-24-06 resolution column updated |
| VAL-25-20 | OPEN-24-11 (Secondary Button source mkw8g) marked RESOLVED with citation to Plan 25-01 Task 0 | D-42/D-43 resolution | PEN-INVENTORY OPEN-24-NN table — OPEN-24-11 resolution column updated |
| VAL-25-21 | OPEN-24-13 (Joel-brand glyphs Instagram + Substack) marked RESOLVED with citation to Plan 25-02 Tasks 1-2 | D-45/D-46 resolution | PEN-INVENTORY OPEN-24-NN table — OPEN-24-13 resolution column updated |
| VAL-25-22 | Archival JSON written to `.planning/research/exports/v2.0/end-of-phase-25/id-inventory.json` per OPEN-23-01 substitution pattern (mirrors Phase 23/24) | Archival discipline carry-forward | File exists; contains library_parents, sections, compounds, secondary_button, substack_glyph, validation_outcomes blocks |
| VAL-25-23 | User visual checkpoint approved at each plan close + final Phase 25 close gate | Plan-close discipline carry-forward | Reference screenshot review log entries in 25-NN-SUMMARY.md files |

**Cross-cutting `must_haves.truths` for Phase 25 (mirror Phase 24 pattern):**
1. Section/Header + Section/Footer exist under g9oRa5 (COMP-05/COMP-06 + COMP-08)
2. Compound/Card exists under t67DU6 with EXACTLY 4 slots (COMP-07 slot-not-variant)
3. Sections/Compound reference primitive components + semantic tokens only (COMP-09 zero-raw-values)
4. Phase 24 primitives instanced via `ref` with descendant overrides — NO inline duplication of Button/Input/Icon markup
5. Each component has a sibling Pencil note declaring slot signature (sufficient for COMP-07 success criterion 3) PLUS Pencil-native typed slots where probe succeeds (D-52 belt-and-suspenders)
6. OPEN-24-06, OPEN-24-11, OPEN-24-13 RESOLVED with audit-trail citations
7. New Phase 25 OPEN-25-NN rows added per D-50 (Card source-coverage) + any other discovered flags
8. Pre-flight `get_editor_state` enforcement across every Phase 25 batch_design / set_variables call (D-54)
9. Phase 23's 95-token surface intact (assume zero token extensions; if any, surface as OPEN-25-XX with D-33 audit-trail row)
10. Phase 24 baseline IDs unmutated EXCEPT for D-42/D-43 Button Secondary variant addition

## Implementation Order Recommendation

Per D-57 default order (sequential, no waves needed at 3-plan scale):

**Plan 25-01: Section / Header** — first because it (a) establishes the slot-mechanics pattern (logo slot per D-40, iconTrailing wire-up per D-44) that Plan 25-03 Card slot work depends on; (b) adds Button Secondary variant per D-43 — a Phase-24-completing addition; (c) resolves OPEN-24-06 + OPEN-24-11 — clears two Phase 24 carry-forward flags before Card work begins.

**Task structure recommendation:**
1. Pre-flight (`get_editor_state` + `get_guidelines design-system` + `get_guidelines landing-page` + `get_variables`)
2. Crito Menu bar source audit (`batch_get(ujMLJ, readDepth: 4)` → enumerate labels, affordances, layout, CTAs)
3. Button Secondary variant probe + add (D-43 preferred → fallback per probe outcome; resolves OPEN-24-11)
4. Section/Header frame build (logo slot + nav-links + affordances + dual CTA row)
5. CTA iconTrailing wire-up with arrow-right (D-44; resolves OPEN-24-06)
6. Sibling Pencil note documenting slot signature
7. Close: snapshot_layout + get_screenshot + user gate + PEN-INVENTORY Variant Evidence row updates + OPEN flag resolution updates + 25-01-SUMMARY.md

**Plan 25-02: Section / Footer** — second because it's structurally simpler than Card AND its Pattern A/B glyph-probe outcome (D-45/D-46 — confirmed Substack needs Pattern B per research) reuses Phase 24 Icon mechanics, no slot novelty. Resolves OPEN-24-13.

**Task structure recommendation:**
1. Pre-flight
2. Crito Footer source audit (`batch_get` Home Page Footer subtree)
3. Instagram lucide probe (`batch_design` Insert test — confirm Pattern A works; document deprecation-warning behavior if surfaced)
4. Substack Pattern B atomic-glyph build using simpleicons canonical SVG path (D-46)
5. Section/Footer frame build (brand column + 4 link columns + copyright row + social-row instancing Instagram + Substack)
6. Newsletter Subscribe input instance (uses nwJk7)
7. Sibling Pencil note
8. Close: snapshot_layout + get_screenshot + user gate + PEN-INVENTORY updates + OPEN flag resolution updates + 25-02-SUMMARY.md

**Plan 25-03: Compound / Card** — third because it's the most-inferred component AND benefits from having slot mechanics already verified by Plan 25-01. Card source provenance is RASTER-DERIVED (D-49) — the cautious-discipline phase.

**Task structure recommendation:**
1. Pre-flight
2. Raster-probe Card audit (read `design/images/image-import-{12,14,8,22,29}.jpg` — enumerate Project/Blog/Service card structures, validate single 4-slot signature serves all three)
3. v1.3 Card.astro secondary structural reference consult (NOT visual values — structure only)
4. Pencil typed-slot mechanics probe (D-52 — test `slot: [<componentIds>]` on a single Card slot, measure UI affordance via get_screenshot)
5. Compound/Card frame build with 4 slots (image, title, body, footer-actions) — all `enabled: true` with placeholders per D-53
6. Sibling Pencil note + PEN-INVENTORY § Compound Source Inference (Phase 25) section with per-slot raster citations
7. OPEN-25-XX source-coverage flag declaration (D-50)
8. Close: snapshot_layout + get_screenshot + user gate + PEN-INVENTORY updates + 25-03-SUMMARY.md

**Phase 25 close (post Plan 25-03):**
- Sweep across new Section/Compound nodes (Plan 24-05 pattern — recursive batch_get + literal-set check)
- `id-inventory.json` write to `.planning/research/exports/v2.0/end-of-phase-25/` per OPEN-23-01 substitution pattern
- Final user gate
- STATE.md update (Phase 25 → completed)

## Sources

### Primary (HIGH confidence — Pencil docs + Pencil MCP-returned guidelines)
- **Pencil component slot mechanics** — `https://docs.pencil.dev/core-concepts/slots` + `https://docs.pencil.dev/for-developers/the-pen-format` (verified 2026-06-01): slots declared via `slot` property; accepts `false` or array of suggested component IDs; suggested-only (guidance, not strict enforcement). Components marked `reusable: true`; instances use `ref` type.
- **Pencil MCP-returned guidelines (verbatim in PEN-INVENTORY § "Pencil Guidelines")** — Authoritative Pencil-MCP output from Phase 23 audit. § 2 Slots: `slot` array of component IDs + `enabled: false` for disabled slots + insertion path `parentBinding/slotId`. § 3 Icons: `library: lucide`. § 12 Spacing reference: `Inside cards 24; Inside buttons [10, 16]; Inside inputs [8, 16]`. § 13 Button Hierarchy: `Primary/Default → Secondary → Outline → Ghost → Destructive`.
- **lucide brand-icon policy** — `https://github.com/lucide-icons/lucide/issues/2792` (verified 2026-06-01): brand icons including Instagram/Substack DEPRECATED as of lucide-react v0.475.0; issue closed "not planned"; lucide does not accept brand logos. **Substack confirmed ABSENT** (never added). Instagram still ships but emits deprecation warning.
- **simpleicons canonical Substack SVG path** — `https://simpleicons.org/icons/substack` (verified 2026-06-01): canonical 24x24 viewBox path `M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z` — public-source brand-icon library, the appropriate Pattern B source per D-46.
- **Phase 24 end-of-phase artifacts** — `.planning/research/exports/v2.0/end-of-phase-24/id-inventory.json` (primitive IDs to instance, baseline IDs to preserve, snapshot_layout quirk documentation, cross-phase handoffs to Phase 25); `.planning/phases/24-layout-primitives-primitive-components/24-05-SUMMARY.md` (Phase 24 close validation outcomes).
- **PEN-INVENTORY single-source-of-truth** — `.planning/research/PEN-INVENTORY.md`: frame classifications (Home Page ujMLJ IN-SCOPE for Header/Footer source-wins; flat-raster Blog/Service frames for Card raster-probe); 95-token surface; Phase 24 OPEN-24-06/11/13 carry-forward; Phase 24 Variant Evidence table format (30 rows) Phase 25 extends.
- **Phase 25 CONTEXT.md** — `.planning/phases/25-section-compound-components/25-CONTEXT.md`: D-38 through D-57 user-locked decisions driving every research direction above.
- **Phase 24 CONTEXT.md** — `.planning/phases/24-layout-primitives-primitive-components/24-CONTEXT.md`: D-21 through D-37 carry-forward decisions (especially D-22 compositional minimum, D-23 audit-trail format, D-24 source-wins, D-30 empty-slot collapse, D-35 pre-flight enforcement → D-54).
- **Phase 23 CONTEXT.md** — `.planning/phases/23-audit-token-foundation/23-CONTEXT.md`: D-09 OPEN-flag policy, D-12 flat-dash token naming, D-14 components-reference-semantic-only, D-18 plain-markdown audit trails.
- **REQUIREMENTS.md** — `.planning/REQUIREMENTS.md`: COMP-05, COMP-06, COMP-07 (Phase 25 scope); COMP-08, COMP-09 (cross-cutting); LAYOUT-01, LAYOUT-02 (carry-forward).
- **ROADMAP.md** — `.planning/ROADMAP.md` § "Phase 25": Goal, dependencies, success criteria, plan list 25-01/02/03.

### Secondary (MEDIUM confidence — design/images raster set + cross-cutting research)
- **design/images/image-import-12.jpg** (Service index frame — Service cards 4-up + Project cards 2x2 — verified 2026-06-01 by direct visual inspection)
- **design/images/image-import-14.jpg** (Blog index frame — Blog cards 3-up — verified 2026-06-01)
- **design/images/image-import-15.jpg** (Service Details frame — Header + Footer visible — verified 2026-06-01)
- **design/images/image-import-22.jpg** (About frame — Team member cards row — verified 2026-06-01)
- **design/images/image-import-8.jpg** (Blog detail frame — Header + post structure — verified 2026-06-01)
- **design/images/image-import.jpg** (Homepage frame — all card subregions including Service/Project/Team/Testimonial/Blog/News — verified 2026-06-01)
- **v2.0 research files** — `.planning/research/SUMMARY.md` (T5 don't-repeat-v1.4 → informs D-50 OPEN flag discipline), `STACK.md` (Pencil MCP tool catalogue + workflow ordering), `PITFALLS.md` (O1 premature variants, O5/O6 token + library bloat → informs Pitfalls 1+2 above, F3 no-eyedropping → informs D-49 use raster for STRUCTURE not values).
- **v1.3 src/components/ui/Card.astro** — secondary structural reference per D-49 (NOT visual reference). Single child slot pattern, neobrutalist styling (variant + stacked options) — explicitly NOT the v2.0 visual direction.

### Tertiary (LOW confidence — community sources, requires probe-time verification)
- **Pencil 2.13 variant-axis-extension mechanics** — Public docs don't describe internals. WebSearch surfaces ".pen format 2.5+ supports slots and themes" indirectly. **Plan 25-01 Task 0 EXECUTES the probe.**
- **Pencil 2.13 typed-slot ENFORCEMENT vs SUGGESTION behavior** — Docs say "suggested" but precise UI/runtime behavior on non-matching insertion is unverified. **Plan 25-03 Task 2 EXECUTES the probe.**
- **Crito Footer Newsletter Subscribe button color (yellow vs green)** — visible in raster as yellow per image-import-14; needs `batch_get` source confirmation. **Plan 25-02 Task 1 resolves.**

## Metadata

**Confidence breakdown:**
- Standard Stack: HIGH — Phase 24 primitives + Phase 23 tokens are concrete artifacts; Pencil MCP tool catalogue verified
- Architecture (Section/Compound structure): HIGH for Header/Footer (direct Crito source via ujMLJ); MEDIUM for Card (raster-probe inference per D-49 — confidence improves at Plan 25-03 raster-audit time)
- Pencil slot mechanics: HIGH on declaration syntax (verified across Pencil docs + Phase 24 MCP-returned guidelines); MEDIUM on typed-slot ENFORCEMENT precise behavior (probe-required)
- Variant-axis extension mechanics: MEDIUM-LOW — Public docs silent; Plan 25-01 probe required
- lucide brand-icon availability: HIGH — Substack confirmed absent (lucide #2792 closed "not planned"); Instagram confirmed deprecated-but-present
- Pattern B Substack SVG source: HIGH — simpleicons canonical path quoted verbatim with viewBox
- Raster source coverage for Card: HIGH — six specific images identified by content inspection
- Pitfalls: HIGH — derived from Phase 24 audit-trail discipline + PROJECT.md v1.4 abandonment lessons + identified Phase 25 specific traps
- Validation Architecture: HIGH — VAL-25-* assertions derived from Phase 24 VAL-24-* pattern with Phase 25 specific extensions

**Research date:** 2026-06-01
**Valid until:** 2026-07-01 (30-day stable horizon — Pencil MCP tooling stable, lucide policy stable; revisit if a new Pencil schema version ships)

---

*Phase: 25-section-compound-components*
*Research synthesized: 2026-06-01*

# Phase 26: FAQ + 404 Reconstruction (Calibration Workflow Established) — Research

**Researched:** 2026-06-06
**Domain:** Pencil 2.13 page-frame composition + joel-only calibration workflow codification
**Confidence:** HIGH for Pencil MCP mechanics (Phase 23–25 production-confirmed), HIGH for v1.3 FAQ content extraction, MEDIUM for `.fig` direct-read feasibility, HIGH for token-name conformance shape

---

## Summary

Phase 26 builds TWO new joel-only-no-crito-ref page frames (`FAQ`, `404`) plus TWO new Section components (`Section / CTA`, `Section / NavBack`) plus ONE new semantic typography composite (`type-semantic-heading-2-*`) inside `design/Crito.pen`. All decisions are LOCKED in CONTEXT.md D-58 through D-88 — this research does not re-litigate them. Research output is concrete, Phase-26-actionable answers to 8 technical questions the planner will encode into the 4 plans (26-00 foundation, 26-01 FAQ, 26-02 404, 26-03 CALIBRATION-PROTOCOL.md).

Three findings drive plan shape:

1. **`get_screenshot` cannot write to disk** (OPEN-23-01 carry-forward — confirmed across all Phases 23/24/25). Combined with `export_nodes` being broken for `.pen` files, the calibration artifact mechanism is **inline rendering for user spot-check at AskUserQuestion gate** — NOT a file written to `.planning/ui-reviews/v2.0/`. The D-64 filename naming convention is a **description identifier** for the inline gate, not a path that materializes a file. Calibration-protocol must document this substitution explicitly (mirrors OPEN-23-01 substitution at Phase 23 D-19).

2. **`.fig` is a Figma zip archive — agent cannot directly read variables**. The 21 MB `Consulting & Agency Website Template I Crito (Community).fig` at `design/images/` is a zipped Figma binary. It is NOT readable by the executing agent as JSON or markup. Phase 23 D-04 ".fig consult" means **the user opens Figma and reads values for the agent**. Plan 26-00 first task therefore raises an AskUserQuestion with a proposed `type-semantic-heading-2` value (interpolation between heading-1 48 and body 16 — recommended Plus Jakarta Sans 32/700/1.4) and asks the user to either confirm or supply Figma-derived values.

3. **Token name conformance is fully specified by Phase 23 D-12 + existing heading-1 surface.** `type-semantic-heading-2-*` must be a 4-part composite (`-family`, `-size`, `-weight`, `-lh`) mirroring heading-1 — confirmed from PEN-INVENTORY lines 687–690. NOT a single composite alias.

**Primary recommendation:** Plan 26-00 task ordering — (1) AskUserQuestion .fig-or-interpolation gate for heading-2 values, (2) `set_variables` writes 4 new semantic tokens, (3) `batch_design` builds `Section / CTA` + `Section / NavBack` inside `g9oRa5` (D-80). Plans 26-01 + 26-02 follow Phase 25's batch_design page-frame patterns. Plan 26-03 codifies what worked (D-67).

---

## Standard Stack

The established tooling and component vocabulary for Phase 26.

### Core (Pencil MCP — production-confirmed across Phases 23–25)

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| `mcp__pencil__get_editor_state` | schema 2.13 | Pre-flight active-editor assertion | D-87 carry-forward — Phase 25 used 12–15× across 3 plans with 0 mismatch incidents |
| `mcp__pencil__get_guidelines` | live | Design System + Landing Page guides | D-67 evidence-first; Phase 25 used `"Design System"` + `"Landing Page"` Title-Case (lowercase rejected) |
| `mcp__pencil__batch_get` | live | Read structural state of existing nodes | Used for baseline-drift verification (Phase 25 carry-forward) |
| `mcp__pencil__batch_design` | live | Insert/Update/Delete nodes — page frame, Section/CTA, Section/NavBack | Phase 25 standard mechanism; chunk to ≤ 25 ops per call |
| `mcp__pencil__set_variables` | live | Add `type-semantic-heading-2-*` (4 tokens) | Phase 23 mechanism; D-87 pre-flight applies |
| `mcp__pencil__get_variables` | live | Verify 95→99 token surface after Plan 26-00 | Phase 23 verification pattern |
| `mcp__pencil__find_empty_space_on_canvas` | live | Place FAQ + 404 page frames to right of Crito cluster (D-74) | Phase 24 D-37 stub-placement precedent |
| `mcp__pencil__get_screenshot` | live | Inline visual verification at user gates | **CANNOT write to disk** — inline-only (OPEN-23-01 confirmed) |
| `mcp__pencil__snapshot_layout` | live | `{ maxDepth: 0, problemsOnly: true }` at plan close | D-87 cross-cutting; text-clipping false-positive on text-inside-button-frame documented |

### Library components instanced by Phase 26 (from Phase 25 id-inventory.json — read-only)

| Component | id | Source plan | Phase 26 use |
|-----------|----|-----------|----|
| `Primitive / Button / Default` | `M7eUr` | 24-02 | Section/CTA actions-slot default; 404 NavBack key-page links if rendered as Buttons |
| `Primitive / Button / Secondary` | `hIWuC` | 25-01 | Section/CTA actions-slot alternative |
| `Primitive / Icon / 24` | `u7NmaS` | 24-04 | Reference if any icon-bearing slot needs typed-slot hint |
| `Section / Header` | `G0wNOc` | 25-01 | Instanced top of FAQ + 404 page frames (D-77) |
| `Section / Footer` | `Xs0Hs` | 25-02 | Instanced bottom of FAQ + 404 page frames (D-77) |
| `Compound / Card` | `t40xct` | 25-03 | **Not instanced in Phase 26** — FAQ Q+A items are NOT cards per D-59 |

### Library parent frames (where new Phase 26 work lands)

| Parent | id | Phase 26 contribution |
|--------|----|----|
| `_Components / Sections` (g9oRa5) | `g9oRa5` | NEW children: `Section / CTA`, `Section / NavBack` per D-80 |
| `_Tokens & Foundations` (RpGbe) | `RpGbe` | Read-only — calibration pairs against THIS frame per D-62 |

### Page-frame placement coordinates (D-74 reference)

Phase 25 id-inventory.json archives library parent positions (all at `y: -11711.553`):
- `avgor` (Primitives): `x: -15642.732`
- `g9oRa5` (Sections): `x: -14122.732`
- `t67DU6` (Compounds): `x: -12602.732`

Crito page frames sit at the document root level (separate cluster). `find_empty_space_on_canvas` should place FAQ + 404 to the **right** of the Crito page-frame cluster (D-74), NOT next to library frames (which live above per Phase 24 D-37).

### Alternatives Considered (and rejected)

| Instead of | Could Use | Why rejected |
|-----------|-----------|-----|
| `Section / CTA` 3-slot custom build | Reuse `Compound / Card` with footer-actions slot | D-78 — Card has image-slot which is wrong shape for CTA section. Custom 3-slot signature is the right tool |
| `Section / NavBack` as generalized "RelatedNav" | Build narrow 404-only single signature | D-79 + Pitfall O5/O6 — Blog/Projects related-content needs card grid, not link list. NavBack stays narrow |
| `.fig` direct read by agent | AskUserQuestion gate with interpolation fallback | `.fig` is zipped Figma binary, not agent-readable. User-mediated consult is the documented path |

---

## Architecture Patterns

### Recommended Plan Order (D-84 + D-85)

```
Plan 26-00 (foundation, sequential)
  ├── Task 0: pre-flight + get_variables (verify 95 tokens, no drift)
  ├── Task 1: AskUserQuestion — heading-2 .fig-or-interpolate gate (Claude's Discretion)
  ├── Task 2: set_variables — write 4 type-semantic-heading-2-* tokens
  ├── Task 3: batch_design — Section / CTA inside g9oRa5 with 3 slots
  ├── Task 4: batch_design — Section / NavBack inside g9oRa5 with 2 slots
  └── Task 5: PEN-INVENTORY extensions + close (no user gate per D-86)

Plan 26-01 (FAQ page frame)
  ├── Task 0: pre-flight + verify Plan 26-00 outputs intact
  ├── Task 1: find_empty_space_on_canvas → batch_design FAQ page frame
  ├── Task 2: Insert Section/Header ref (G0wNOc) + page intro section
  ├── Task 3: Insert Q+A list section (5 verbatim Q+A from v1.3)
  ├── Task 4: Insert Section/CTA ref ("Still have questions?" STUB)
  ├── Task 5: Insert Section/Footer ref (Xs0Hs)
  ├── Task 6: Calibration spot-check gate (user gate per D-86)
  └── Task 7: PEN-INVENTORY extensions + close

Plan 26-02 (404 page frame)
  ├── Task 0: pre-flight + verify 26-00/26-01 outputs intact
  ├── Task 1: find_empty_space_on_canvas → batch_design 404 page frame
  ├── Task 2: Section/Header ref (G0wNOc) + message section (STUB text)
  ├── Task 3: Insert Section/NavBack ref (4 link labels per Claude's Discretion default)
  ├── Task 4: Section/Footer ref (Xs0Hs)
  ├── Task 5: Calibration spot-check gate (user gate per D-86)
  └── Task 6: PEN-INVENTORY extensions + close

Plan 26-03 (CALIBRATION-PROTOCOL.md)
  ├── Task 0: pre-flight (read-only confirmation — no Pencil mutations)
  ├── Task 1: Draft CALIBRATION-PROTOCOL.md from D-66/D-67/D-68 actuals
  ├── Task 2: Update PEN-INVENTORY § Calibration Protocol anchor (D-69)
  └── Task 3: Close (no user gate per D-86)
```

### Pattern 1: Page-frame creation via `find_empty_space_on_canvas` + `batch_design`

**What:** Two new top-level page frames at the document root, NOT inside library parents.

**When to use:** Plan 26-01 + 26-02 page-frame insertion (D-74).

**`batch_design` shape (Plan 26-01 Task 1):**

```js
// Step 1: Find empty space to the right of existing 15 Crito frames + 4 library parents
const { x, y } = mcp__pencil__find_empty_space_on_canvas({
  width: 1440,
  height: 1800,    // FAQ approx: Header(~80) + intro(~200) + Q+A list (5×~150) + CTA(~250) + Footer(~500)
  preferredArea: "right_of_cluster"  // per D-74; tool may not expose this — use default sweep if not
})

// Step 2: Insert page frame as direct child of document
mcp__pencil__batch_design({
  operations: `
    faqPage = I(document, {
      type: "frame",
      name: "FAQ",                          // D-76 plain name
      x: ${x}, y: ${y},
      width: 1440,                          // D-75 matches Crito ujMLJ Hero rectangle width pattern
      height: 1800,                         // derived from section rhythm; may use fit_content
      layout: "vertical",                   // page-level auto-layout per Claude's Discretion default
      gap: 0,                               // sections handle their own padding
      padding: 0,
      fill: "#ffffffff"                     // color-semantic-bg-page (OPEN-23-13 literal)
    })
  `
})
```

**Page frame width 1440:** Per D-75. Header `G0wNOc` and Footer `Xs0Hs` are width 1200 (Phase 25). The page frame is wider — sections sit centered within (or use width 1200 explicitly with container alignment). Phase 25 Header/Footer width 1200 is the inner content width; page frame 1440 matches Crito Home Page Hero width pattern.

**Page frame height — fit_content vs fixed:**
- **Recommendation:** Use **fixed height** matching estimated section rhythm. Reason: Pencil's `find_empty_space_on_canvas` needs a real height to allocate space. After Section children land, use `batch_design` Update to set `height: "fit_content"` if the auto-layout vertical stack overflows the initial estimate.

### Pattern 2: Section / CTA — 3-slot composition (D-78)

**What:** New reusable component inside `g9oRa5`. 3 slots — `headline-slot`, `body-slot`, `actions-slot`. Each `enabled: true` with placeholder content per D-53 carry-forward.

**Slot signature (D-78):**

| slot id (use these) | type | accepts | placeholder content | typography |
|----|----|----|----|----|
| `headline-slot` | text (in frame) | heading-1 or heading-2 text | "Still have questions?" stub | `type-semantic-heading-2-*` (NEW) or `type-semantic-heading-1-*` |
| `body-slot` | text (in frame) | prose-paragraph text | "Get in touch and we'll help." stub | `type-semantic-prose-paragraph-*` |
| `actions-slot` | frame | Button refs (M7eUr or hIWuC) | 1× ref M7eUr "Get in touch" | — |

**`batch_design` shape (Plan 26-00 Task 3, abridged):**

```js
ctaSection = I(g9oRa5, {
  type: "frame",
  name: "Section / CTA",
  reusable: true,                          // first-class library component
  width: 1200,                             // matches Header/Footer width
  layout: "vertical",
  gap: 24,                                 // space-semantic-stack-md
  padding: [64, 0],                        // section-y rhythm; use literal per OPEN-23-13
  alignItems: "center",
  fill: "#f2f2f7ff"                        // color-semantic-bg-surface — STUB section visual distinct from page bg
})

headlineSlot = I(ctaSection, {
  type: "frame",
  name: "headline-slot",
  slot: [],                                // untyped — accepts text
  enabled: true,
  contains: [{
    type: "text",
    content: "Still have questions?",      // STUB per D-82
    fontFamily: "Plus Jakarta Sans",       // type-semantic-heading-2-family (NEW)
    fontSize: 32,                          // type-semantic-heading-2-size (NEW — pending D-72 user gate)
    fontWeight: "700",                     // type-semantic-heading-2-weight (NEW)
    fill: "#141f39ff",                     // color-semantic-text-primary
    lineHeight: 1.4                        // type-semantic-heading-2-lh (NEW)
  }]
})

bodySlot = I(ctaSection, {
  type: "frame",
  name: "body-slot",
  slot: [],                                // untyped — accepts text
  enabled: true,
  contains: [{
    type: "text",
    content: "Get in touch and we'll help you figure out next steps.",  // STUB per D-82
    fontFamily: "Inter",                   // type-semantic-prose-paragraph-family
    fontSize: 16,                          // type-semantic-prose-paragraph-size
    fontWeight: "400",
    fill: "#52525bff",                     // color-semantic-text-secondary
    lineHeight: 1.625                      // type-semantic-prose-paragraph-lh
  }]
})

actionsSlot = I(ctaSection, {
  type: "frame",
  name: "actions-slot",
  slot: ["M7eUr", "hIWuC"],                // TYPED per Plan 25-03 D-52 PREFERRED — Button picker hint
  enabled: true,
  layout: "horizontal",
  gap: 12,                                 // Pencil § 12 Button groups
  contains: [{
    type: "ref",
    ref: "M7eUr",
    descendants: { ATJK9: { content: "Get in touch" }, V4Dx4i: { enabled: true } }
  }]
})

// + arrow-right icon at actionsSlot/.../V4Dx4i per Phase 25 D-44 pattern

// Sibling Pencil note documenting slot signature (D-52 belt-and-suspenders)
ctaNote = I(g9oRa5, {
  type: "note",
  content: "Section / CTA — slot signature: ...",
  fontFamily: "Inter",
  fontSize: 12,
  width: 1200,
  height: 200
})
```

### Pattern 3: Section / NavBack — 2-slot composition (D-79)

**What:** Narrow-purpose component for 404 only. 2 slots — `heading-slot` + `links-slot`.

**Slot signature (D-79):**

| slot id | type | accepts | placeholder content | typography |
|----|----|----|----|----|
| `heading-slot` | text (in frame) | heading-2 text | "Find what you need" stub | `type-semantic-heading-2-*` (NEW) |
| `links-slot` | frame | 3–4 text nodes (text-styled links) | 4 nav links: "Home" / "Blog" / "Projects" / "Contact" (Claude's Discretion default) | `type-semantic-body-*` |

**Link rendering:** Per Claude's Discretion, **render as text nodes** (not Button instances). NavBack links are navigation-back affordances, not CTAs; body-typography text matches the visual register of "key page links" better than full Button primitives. Text nodes can have `underline: true` if `color-semantic-text-link` is later defined (currently no link semantic — use `color-semantic-text-primary` with implicit hover from code-side).

**`batch_design` shape (Plan 26-00 Task 4, abridged):**

```js
navBackSection = I(g9oRa5, {
  type: "frame",
  name: "Section / NavBack",
  reusable: true,
  width: 1200,
  layout: "vertical",
  gap: 16,
  padding: [32, 0],
  alignItems: "center"
})

headingSlot = I(navBackSection, {
  type: "frame", name: "heading-slot", slot: [], enabled: true,
  contains: [{ type: "text", content: "Find what you need", /* heading-2 typography */ }]
})

linksSlot = I(navBackSection, {
  type: "frame", name: "links-slot", slot: [], enabled: true,
  layout: "horizontal", gap: 24,
  contains: [
    { type: "text", content: "Home", /* body typography */ },
    { type: "text", content: "Blog", /* ... */ },
    { type: "text", content: "Projects", /* ... */ },
    { type: "text", content: "Contact", /* ... */ }
  ]
})

// Sibling Pencil note per D-52 belt-and-suspenders
```

### Pattern 4: `type-semantic-heading-2-*` token shape (D-72)

**What:** 4 new semantic alias tokens mirroring `type-semantic-heading-1-*`.

**Token names (D-12 flat-dash + heading-1 precedent at PEN-INVENTORY lines 687–690):**

| Token name | Type | Resolves to | Confidence |
|----|----|----|----|
| `type-semantic-heading-2-family` | NATIVE alias | `type-primitive-family-display` (Plus Jakarta Sans) | HIGH — heading family is consistent |
| `type-semantic-heading-2-size` | NATIVE alias | `type-primitive-size-32` (NEW primitive needed) OR direct literal | MEDIUM — pending D-72 user gate |
| `type-semantic-heading-2-weight` | NATIVE alias | `type-primitive-weight-700` (existing) | HIGH — display weight |
| `type-semantic-heading-2-lh` | NATIVE alias | `type-primitive-lh-heading` (existing, value 1.4) | HIGH — same as heading-1 |

**Size value — proposed interpolation per OPEN-23-10 fallback:**
- Existing Crito Home Page sizes: `14, 16, 18, 48, 70`
- Gap between body 16 and heading-1 48: needs ~24 / 32 / 36 to fill
- **Recommended: 32px** (matches Crito Poppins body size from OUT-OF-SCOPE banners, but reapplied here to Plus Jakarta Sans — the size value is the tier, not the family)
- Plan 26-00 task asks user to either confirm 32 OR open Figma and supply .fig-derived value

**New primitive token may be required:**

If user-confirmed size = 32, Phase 23 has no `type-primitive-size-32`. Two options:
- **Option A (matches D-72 OPEN flag handling):** Add `type-primitive-size-32` as a primitive extension via Phase 23 D-33 + D-88 (Token Extensions Phase 26 row in PEN-INVENTORY). Cleanest semantic chain.
- **Option B:** Define `type-semantic-heading-2-size` directly as `32` (literal in the variables map). Semantic alias references a number, not a primitive. Phase 23 semantic aliases all resolve to primitives — Option B breaks that convention.

**Recommendation:** Option A — add `type-primitive-size-32`. Conforms to Phase 23 D-12 + D-14 (semantic refs primitive only).

### Anti-Patterns to Avoid

- **Building accordion mechanics in the FAQ frame** — D-59 forbids. Static stacked Q+A only; collapse is a code concern.
- **Using `Compound / Card` for Q+A items** — image-slot is the wrong shape. Use plain frames per Q+A pair (heading-2 + prose-paragraph).
- **Writing to `.planning/ui-reviews/v2.0/` files** — `get_screenshot` cannot save. Use inline rendering at AskUserQuestion gate. CALIBRATION-PROTOCOL.md (Plan 26-03) must document this substitution.
- **Eyeballing heading-2 size from Crito raster** — Pitfall F3. Either consult `.fig` (user-mediated) or interpolate (D-72 explicit fallback). NOT raster eyedropping.
- **Generalizing Section/NavBack for Blog/Projects** — D-79 + Pitfall O5/O6. NavBack stays narrow.
- **Overriding Crito-source Header/Footer labels** — D-77 + Phase 25 D-38/D-48 carry-forward. Joel's 4-link nav is Phase 31 instance-time work.

---

## Don't Hand-Roll

Problems that look simple but have existing solutions.

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Q+A item visual structure | Custom Card variant | Plain vertical frame with heading-2 text + prose-paragraph text | D-59 — accordion not in design; Card has wrong slot shape (image-slot N/A) |
| 404 nav-back link affordances | Custom NavLink primitive | Plain text nodes with body typography per Claude's Discretion | Links are navigation, not CTAs; Button primitive is over-spec'd for nav-back link visual |
| Calibration artifact files | Custom export-to-PNG script | Inline `get_screenshot` at AskUserQuestion gate | `get_screenshot` cannot write bytes (OPEN-23-01); inline-only is the production-confirmed pattern |
| Heading-2 value derivation | Pixel-measure Crito raster | AskUserQuestion .fig-or-interpolate gate | Pitfall F3 + D-72 — agent cannot read `.fig` directly |
| FAQ Q+A content | Write new copy | Verbatim lift from `src/pages/faq.astro` lines 11–32 per D-82 | Existing v1.3 content already approved |
| Section composition in g9oRa5 | New library parent | Reuse g9oRa5 with sibling-component additions (matches Phase 25 D-80) | D-80 explicit |
| PEN-INVENTORY structure | New audit document | Extend existing tables per D-88 (Variant Evidence, Token Extensions, Open Flags) | Phase 23/24/25 audit-trail precedent |

**Key insight:** Phase 26 introduces zero new tooling or document patterns. All mechanisms are Phase 23–25 carry-forward.

---

## Common Pitfalls

### Pitfall 1: Treating `get_screenshot` filename as a writable path

**What goes wrong:** Plan writes "save screenshot to `.planning/ui-reviews/v2.0/26-faq-qa-section--token-usage.png`" and execution fails because `get_screenshot` returns inline bytes, not a file.

**Why it happens:** D-64 names a filename naming convention. The intent is the description identifier for the inline gate, NOT a disk write target. Easy to misread as a write op.

**How to avoid:**
- Plan 26-03's CALIBRATION-PROTOCOL.md MUST document the substitution (matches Phase 23 OPEN-23-01 substitution at D-19).
- Plans 26-01 + 26-02 calibration gate format: "Inline `get_screenshot(<sectionId>)` rendered to user via AskUserQuestion description. Filename identifier `26-faq-qa-section--token-usage.png` is descriptive, not a path."
- If a file output is genuinely needed for archival, fall back to the `id-inventory.json` structural snapshot pattern (Phase 23 D-19 substitution).

**Warning signs:** Plan task lists `Write(.planning/ui-reviews/...)` — that's wrong. Plan tasks should list `get_screenshot` followed by AskUserQuestion presentation.

### Pitfall 2: Adding heading-2 token without user-confirmed source

**What goes wrong:** Plan 26-00 ships `type-semantic-heading-2-size = 36` (or 32 or 24) without user input, violating Phase 23 D-04 (.fig consult per D-72) + Pitfall 1 (no inventing primitives without source).

**Why it happens:** Interpolation feels mechanical and "safe." But OPEN-23-10 explicitly states "Do not invent primitives now (Pitfall 1)" — and a semantic alias's primitive resolution counts.

**How to avoid:**
- Plan 26-00 Task 1 is an AskUserQuestion gate (Claude's Discretion explicit in CONTEXT). Present the user with: (a) recommended interpolation (32px Plus Jakarta Sans 700 lh 1.4), (b) the option to open `.fig` and supply Figma-derived values, (c) ack of D-72's OPEN-26-NN flag if .fig doesn't depict heading-2.
- If user confirms interpolation, the OPEN-26-NN flag carries forward to Phase 28 (Blog reconstruction) for heading-2 validation against a richer prose surface.

**Warning signs:** Plan 26-00 Task 2 (`set_variables`) runs without a preceding user gate.

### Pitfall 3: Mutating Phase 25 library parents during Phase 26 page-frame work

**What goes wrong:** Plans 26-01 / 26-02 page-frame insertion accidentally reposition g9oRa5 or change t40xct properties — breaks Phase 25 baseline.

**Why it happens:** `find_empty_space_on_canvas` returns coordinates, but the page frame is a different "node tree neighborhood" than library parents. Confusion possible.

**How to avoid:**
- Page frames sit at **document root** as direct children, NOT inside library parents.
- Every Plan 26-NN includes baseline-drift verification (Phase 25 carry-forward pattern from 25-01-SUMMARY § "Phase 24 baseline-drift verification").
- Expected unmutated baseline IDs for Phase 26 are listed in `end-of-phase-25/id-inventory.json` `phase_24_baseline_drift_verification.expected_baseline_ids_unmutated` (28 IDs). Plan 26-NN extends with Phase 25 additions: `G0wNOc`, `Xs0Hs`, `t40xct`, `hIWuC`, `AzmgQ` + all child IDs listed in `phase_25_additions`.

**Warning signs:** `batch_get` of g9oRa5/t67DU6 after a Plan 26-NN mutation shows changed x/y/children count.

### Pitfall 4: Forgetting Pencil 2.13 `batch_design` rejects `$<token>` references

**What goes wrong:** Plan 26-NN writes `fill: "$color-semantic-text-primary"` and Pencil silently stores `fill: "#000000"` (default black).

**Why it happens:** OPEN-23-13 documents this. Phase 24 + 25 have been using literal hex values + PEN-INVENTORY Variant Evidence rows to audit-trail the binding. Easy to forget.

**How to avoid:**
- All `batch_design` calls use literal values: `fill: "#141f39ff"` NOT `fill: "$color-semantic-text-primary"`.
- Every literal gets a PEN-INVENTORY Variant Evidence row binding it to the semantic token (Phase 24 D-23 / Phase 25 D-56 pattern).
- `set_variables` is the ONLY call where `$<primitive>` references work — used in Plan 26-00 Task 2 for heading-2 semantic aliases pointing to primitives.

**Warning signs:** `batch_get` after a `batch_design` Insert shows `fill: "#000000ff"` where the plan expected the navy primary text color.

### Pitfall 5: Section/Header instance not visible in FAQ page frame

**What goes wrong:** Plan 26-01 inserts `{type: "ref", ref: "G0wNOc"}` as page frame child, but Header is width 1200 and page frame is width 1440 — Header appears off-center.

**Why it happens:** Width mismatch + auto-layout `alignItems` default left-aligns.

**How to avoid:**
- Page frame width 1440 (D-75) outer; Section width 1200 (Phase 25 ship) inner.
- Page frame auto-layout `alignItems: "center"` centers Header/Footer horizontally.
- OR — page frame could be width 1200 outer, matching sections. Plan-time decision.

**Recommendation:** Page frame width 1440, `alignItems: "center"`, gap 0. Sections handle their own padding. Crito Home Page Hero rectangle was 1600 — 1440 is a refinement matching Crito Menu bar effective width (1180–1200 per Plan 25-01 audit).

### Pitfall 6: `snapshot_layout` text-clipping false-positive at plan close

**What goes wrong:** Plan 26-NN close gate calls `snapshot_layout({ problemsOnly: true })` which reports text clipping inside Section/CTA's headline text or 404 message text. False alarm if `get_screenshot` shows correct rendering.

**Why it happens:** Phase 24 24-05-SUMMARY documents the Pencil 2.13 text-inside-button-frame y-coordinate quirk. Same quirk applies to text-in-Section-frame nesting.

**How to avoid:**
- Document the false-positive in 26-NN-SUMMARY.md (Phase 24/25 precedent).
- Cross-check with `get_screenshot` — if visual is correct, snapshot quirk is benign.
- Document-level (`maxDepth: 0`) result should still be `"No layout problems."` per Phase 25 VAL-25-15 carry-forward.

**Warning signs:** Per-frame snapshot reports clipping but document-level reports clean.

---

## Code Examples

Verified patterns from Phase 23/24/25 production use.

### Example 1: Pre-flight active-editor assertion (D-87)

```js
// Per D-87 — every Plan 26-NN that calls a Pencil-mutating tool starts with this:
const state = await mcp__pencil__get_editor_state({ include_schema: false })

// Assert
if (!state.activeEditor?.endsWith("design/Crito.pen")) {
  // Halt and surface to user per Phase 25 D-54 / Phase 24 D-35 protocol
  throw new Error(`Active editor mismatch: expected design/Crito.pen, got ${state.activeEditor}`)
}

// 0 mismatch incidents across Phase 25 ~12-15 pre-flight calls
```

### Example 2: `set_variables` with semantic-alias-to-primitive resolution (Plan 26-00 Task 2)

```js
// Phase 23 mechanism — semantic aliases resolve through $<primitive> references
mcp__pencil__set_variables({
  variables: {
    "type-primitive-size-32": "32",                           // NEW primitive (Option A above)
    "type-semantic-heading-2-family": "$type-primitive-family-display",
    "type-semantic-heading-2-size": "$type-primitive-size-32",
    "type-semantic-heading-2-weight": "$type-primitive-weight-700",
    "type-semantic-heading-2-lh": "$type-primitive-lh-heading"
  },
  replace: false
})

// Verify
const vars = await mcp__pencil__get_variables({})
// Expect 95 + 5 = 100 tokens (was 95 at end of Phase 25)
```

### Example 3: Section ref instantiation in page frame (Plans 26-01 / 26-02)

```js
// Pattern from Phase 25 D-44 — ref + descendants override
// Inside FAQ page frame after page-intro section:
ctaInstance = I(faqPage, {
  type: "ref",
  ref: "<Section/CTA id from Plan 26-00>",
  descendants: {
    // Override headline-slot text content
    "<headlineSlotTextId>": { content: "Still have questions?" },
    "<bodySlotTextId>":     { content: "Get in touch and we'll help you figure out next steps." },
    "<ctaButtonLabelId>":   { content: "Get in touch" }
  }
})

// Note: descendants paths use child IDs from Plan 26-00's Section/CTA build.
// Plan 26-01 reads Plan 26-00's exported IDs from 26-00-SUMMARY.md.
```

### Example 4: Inline calibration screenshot at user gate (Plans 26-01 / 26-02)

```js
// Calibration gate per D-65 — inline, not disk-write
const screenshot = await mcp__pencil__get_screenshot({ nodeId: faqPageId })
// screenshot is delivered inline by Pencil MCP via the MCP image-content protocol

// Present at AskUserQuestion:
AskUserQuestion({
  description: `
## Calibration Spot-Check — FAQ Q+A Section

**Inline render:** [get_screenshot of <qaSectionId> displays here via MCP image content]

**Token usage (per D-65):**
- Headline (Q items): \`type-semantic-heading-2-*\` — Plus Jakarta Sans 32/700/lh 1.4
- Body (A items): \`type-semantic-prose-paragraph-*\` — Inter 16/400/lh 1.625
- Section padding: literal [64, 0] bound to space-semantic-section-y rhythm
- Text fill: \`color-semantic-text-primary\` #141f39ff (headings), \`color-semantic-text-secondary\` #52525bff (body)

**Calibration target:** \`_Tokens & Foundations\` reference frame RpGbe — does this composition use the declared tokens correctly?

**Description identifier (D-64):** \`26-faq-qa-section--token-usage.png\` (inline render only; not written to disk per OPEN-23-01 substitution — see CALIBRATION-PROTOCOL.md Plan 26-03)
  `,
  options: [
    "APPROVE — composition uses tokens correctly",
    "REVISE — token mismatch (specify which)",
    "GAP — composition reveals missing token (raise OPEN-26-NN)"
  ]
})
```

### Example 5: `snapshot_layout` at plan close (Phase 25 pattern)

```js
// Document-level — must return "No layout problems."
const docResult = await mcp__pencil__snapshot_layout({ maxDepth: 0, problemsOnly: true })
// Per Phase 25 VAL-25-15: PASS expected

// Per-frame on new page frame — document any text-clipping false-positives
const pageResult = await mcp__pencil__snapshot_layout({ rootId: faqPageId, problemsOnly: true })
// Phase 24 24-05-SUMMARY quirk: text-clipping reports inside button/section frames are benign
// Cross-check with get_screenshot; document in 26-NN-SUMMARY.md
```

---

## State of the Art

| Old Approach (pre-Phase 26) | Current Approach (Phase 26) | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Library-internal-only component work | Page-frame composition + library extension simultaneously | Phase 26 (per D-78 + D-80) | First per-page phase establishes cross-page consistency |
| Source-wins-only fidelity discipline | Branched calibration (crito-source vs joel-only) | D-66 + Plan 26-03 | Calibration protocol generalizes to all per-page phases 27–31 |
| Heading-1 only in semantic surface | Heading-1 + Heading-2 in semantic surface | D-72 + Plan 26-00 | Partial resolution of OPEN-23-10 |
| VALID-02 = side-by-side raster pairing | VALID-02 = token-usage pairing for joel-only branch | D-62 | Symmetric definition for joel-only pages |
| VALID-01 page-level fidelity label | VALID-01 per-section fidelity label | D-83 | Honest mixed-fidelity reporting (FAQ has EXACT Q+A + STUB CTA) |
| OPEN-23-11 prose tokens deferred to Phase 26 | OPEN-23-11 prose tokens re-pointed to Phase 28 | D-70 + D-73 | Phase 26 has no consumer for prose-link / prose-list / inline-code |

**Deprecated / out-of-scope for Phase 26:**
- **PAGE-11 raster-removal rule applicability:** PAGE-11 ("Original raster nodes are removed only after the replacement composition has been visually verified to match") has **no Phase 26 trigger** — FAQ + 404 are joel-only-no-crito-ref per PEN-INVENTORY. PEN-INVENTORY Frames Inventory rows for `(joel-only: 404)` and `(joel-only: Design System)` confirm `frame_id: n/a (no Crito source)` and `flat:0, partial:0, factored:0`. There is **nothing** to remove. CALIBRATION-PROTOCOL.md Plan 26-03 explicitly notes PAGE-11 applies ONLY to crito-source branch (D-68).
- **Mobile breakpoint frames:** PAGE-09 desktop-only (D-83 + ROADMAP cross-cutting policy).
- **prose-link / prose-list / inline-code semantic tokens:** D-70 + D-73 — Phase 28 owns.
- **Joel's v1.3 4-link Header override:** Phase 31 owns (D-77 + Phase 25 D-38 carry-forward).

---

## Open Questions

Things that couldn't be fully resolved at research time — planner should account for these.

### 1. Exact `type-semantic-heading-2-size` value

- **What we know:** OPEN-23-10 hints at 36px interpolation; PEN-INVENTORY § Token Extensions guide suggests interpolation between heading-1 48 and body 16. Phase 23 has no `type-primitive-size-32`. Card title (Plan 25-03) shipped `Plus Jakarta Sans 18/700` for an 18px mid-tier (informal — bound to no semantic alias yet).
- **What's unclear:** Whether the user prefers .fig-derived (open Figma manually) or interpolation. If interpolation, exact value 24 / 28 / 32 / 36.
- **Recommendation:** Plan 26-00 Task 1 = AskUserQuestion gate per Claude's Discretion in CONTEXT.md. Default proposal: **32px** (Plus Jakarta Sans 700, lh 1.4). User confirms or overrides.

### 2. Whether `type-primitive-size-32` needs to be a NEW primitive

- **What we know:** Phase 23 D-14 requires semantic-aliases-reference-primitives-only. Semantic alias to numeric literal breaks the rule.
- **What's unclear:** Whether D-33 (open token-extension policy) applies symmetrically to primitives or only semantics.
- **Recommendation:** Yes — add `type-primitive-size-32` as a primitive extension via Phase 23 D-33 carry-forward. Document in PEN-INVENTORY § Token Extensions (Phase 26) row per D-88. Phase 23 ships 13 primitive sizes (14, 16, 18, 48, 70 — 5 sizes for visible fonts; rest are families/weights/line-heights/etc.); adding one more (32) extends naturally.

### 3. Page-frame heights — fixed vs fit_content

- **What we know:** Phase 25 Plan 25-03 used `height: "fit_content"` for repositioned library parents. `find_empty_space_on_canvas` likely needs a numeric height to allocate space.
- **What's unclear:** Whether `find_empty_space_on_canvas` accepts `"fit_content"` or requires numeric.
- **Recommendation:** Plan 26-01 / 26-02 Task 1 inserts with numeric height (estimate); Task N (after all children added) Updates to `fit_content` if overflow visible. Document the pattern in CALIBRATION-PROTOCOL.md Plan 26-03 as the joel-only-branch page-frame creation script.

### 4. `find_empty_space_on_canvas` placement preference for "right of Crito cluster"

- **What we know:** Phase 24 D-37 used the tool successfully for library parent stubs. Phase 25 Plan 25-03 manually repositioned library frames.
- **What's unclear:** Whether the tool exposes a directional preference parameter (right vs left vs below), or whether it returns first-available space regardless of direction.
- **Recommendation:** Plan 26-01 Task 1 calls the tool with width/height and accepts whatever coords return. If returned position lands LEFT of Crito cluster, Plan 26-01 raises OPEN-26-NN and proposes manual repositioning at task close.

### 5. Should Plan 26-00 close gate user-verify Section/CTA + Section/NavBack visually?

- **What we know:** D-86 states Plans 26-00 + 26-03 close without user gates (agent-deterministic). But D-72 explicitly carves out a mid-plan user gate for the heading-2 .fig-or-interpolate question.
- **What's unclear:** Whether a *post-build* visual gate (Section/CTA + NavBack `get_screenshot`) is also desirable, or if Plan 26-01's first instance of Section/CTA serves as the implicit visual gate.
- **Recommendation:** No post-build user gate at Plan 26-00 close (D-86 explicit). Plan 26-01 calibration gate naturally exercises Section/CTA visually. Mirrors Phase 25 D-57 "next plan exercises previous plan's outputs" pattern.

---

## Detailed Research Findings (per focus-area question)

### Focus 1: Page-frame creation mechanics

**Question:** What does `batch_design` Insert look like for a top-level page frame at 1440 × {Crito-rhythm height}? Where does `find_empty_space_on_canvas` place new frames? What's the auto-layout structure?

**Answer:**

- `find_empty_space_on_canvas` was used in Phase 24 Plan 24-01 to place library parent stubs (`avgor`, `t67DU6`, `g9oRa5`) without overlapping the existing 15 Crito frames. Schema accepts `width` + `height` and returns `{x, y}` coordinates.
- Plan 26-01 + 26-02 each call the tool with FAQ-sized / 404-sized dimensions.
- `batch_design` Insert at `document` parent creates a top-level frame — pattern confirmed in Phase 24 Plan 24-01 (library stubs were inserted similarly).
- Auto-layout structure (Claude's Discretion default): vertical stack at page level, gap 0, padding 0; sections handle their own padding (Phase 25 Header/Footer have `padding: [48, 0]` in Footer; Section/CTA + NavBack pattern after).
- Page frame children order (FAQ): Section/Header ref → page-intro section frame → Q+A list section frame → Section/CTA ref → Section/Footer ref.
- Page frame children order (404): Section/Header ref → message section frame → Section/NavBack ref → Section/Footer ref.

**Confidence:** HIGH for general mechanism (Phase 24/25 precedent). MEDIUM for exact `find_empty_space_on_canvas` parameter shape — verify at Plan 26-01 Task 1 first call.

### Focus 2: Section/CTA + Section/NavBack composition patterns

**Question:** How do new Section components declare slot signatures with Pencil 2.13 typed-slots-are-suggestion-only? Concrete `batch_design` call shape?

**Answer:**

Section/CTA — 3 slots, `slot: []` (untyped) for headline + body; `slot: ["M7eUr", "hIWuC"]` (typed suggestion) for actions-slot. Belt-and-suspenders sibling Pencil note per D-52 + D-78. All slots `enabled: true` with placeholder content per D-53.

Section/NavBack — 2 slots, both `slot: []` (untyped). Heading text + 3-4 nav-link text children.

Concrete shapes provided in Pattern 2 + Pattern 3 above.

Plan 26-00 Task 3 builds Section/CTA inside g9oRa5; Task 4 builds Section/NavBack inside g9oRa5. Both follow Phase 25 Plan 25-01 (Section/Header) + 25-02 (Section/Footer) build pattern. Each gets a sibling Pencil note inside g9oRa5 (e.g., `<ctaNoteId>`, `<navBackNoteId>`) — matches Phase 25 `hkh26` (Header note) + `x48zh` (Footer note) precedent.

**Confidence:** HIGH — pattern is direct Phase 25 carry-forward.

### Focus 3: `type-semantic-heading-2` source-derivation from Crito .fig

**Question:** Can the executing agent open `.fig` directly? Or is `.fig` consult a Joel-side manual step that surfaces via AskUserQuestion?

**Answer:**

`.fig` files are zipped Figma binary archives. Verified by `file` command on the actual `Consulting & Agency Website Template I Crito (Community).fig` (21 MB at `design/images/`):

```
Zip archive data, at least v2.0 to extract, compression method=store
First 16 bytes show "PK....canvas.fig" — confirming it's a zip containing canvas.fig (Figma internal format)
```

**Agent CANNOT directly read variable definitions from this format.** The internal `canvas.fig` payload is Figma's proprietary binary serialization — not JSON, not XML, not markdown. Even `unzip` exposes only the binary `canvas.fig` blob.

**Practical workflow per D-72:**

Plan 26-00 Task 1 (Claude's Discretion AskUserQuestion gate):
1. Agent describes the heading-2 derivation question.
2. Agent presents the **interpolation recommendation** (32px Plus Jakarta Sans 700 lh 1.4) as the default.
3. User has two options:
   - **Option A:** Accept the interpolation. Plan 26-00 proceeds with Task 2 (set_variables) writing the proposed values. OPEN-26-NN row added to PEN-INVENTORY noting "interpolation-derived, not .fig-sourced; verifier consumer = Phase 28 Blog where richer heading hierarchy may surface mismatch."
   - **Option B:** User opens Figma desktop, navigates to Crito community template, reads heading-2 token (size, family, weight, line-height) from the Variables panel, and reports values back via AskUserQuestion follow-up. Plan 26-00 then proceeds with user-supplied values. No OPEN flag (source-confirmed).

**Confidence:** HIGH — `.fig` format characterization confirmed by direct `file` inspection. AskUserQuestion mediation is the established pattern (Phase 23 D-04 implies user mediation; Phase 25 D-46 Substack atomic-glyph used a similar "external source supplied by user/researcher" pattern via simpleicons.org).

### Focus 4: Calibration artifact generation via Pencil MCP

**Question:** How does `get_screenshot` produce per-section vs full-frame screenshots? Can it crop by node ID? What's the file-output mechanism?

**Answer:**

`get_screenshot({ nodeId: "<id>" })` renders the specified node (and its visible children/descendants) as an image. **The image is returned via the MCP image-content protocol and displayed inline in the agent's conversation context** — it does NOT save to disk.

OPEN-23-01 (PEN-INVENTORY line 247) documents `mcp__pencil__export_nodes` is broken for the .pen file (`MCP error -32603`). Phase 23 plan 23-05 attempted to archive `tokens-foundations-23.png` and discovered (23-05-SUMMARY line 46–48):
- `export_nodes` still broken (rejects all filePath forms)
- `get_screenshot` returns inline image content only — no writable bytes
- **Substitution:** Structural JSON (`id-inventory.json`) as the archival proxy

**Confirmation across Phase 25:**
- 25-01-SUMMARY § Reference Screenshot Set: "Captured inline via `get_screenshot` at each plan's build-visual checkpoint"
- 25-02-SUMMARY § Reference Screenshot Set: Same — inline only
- 25-03-SUMMARY § Reference Screenshot Set: Same — inline only

**Implication for Phase 26 calibration:**
- D-64's filenames (`26-faq-qa-section--token-usage.png`, etc.) are **description identifiers** for the inline AskUserQuestion gate, NOT paths to written files.
- `.planning/ui-reviews/v2.0/` directory will NOT receive Phase 26 contributions (currently doesn't exist; `.gitignore` blocks `*.png` in any case).
- Plan 26-03 CALIBRATION-PROTOCOL.md MUST document this substitution explicitly — the protocol is the durable record; inline screenshots are ephemeral conversation artifacts.

**Cropping by node ID:** Confirmed working. `get_screenshot({ nodeId: <sectionId> })` renders just that section — Phase 25 used this for per-section visual checks (e.g., `get_screenshot(hIWuC)` rendered just the Secondary Button).

**Confidence:** HIGH — confirmed across all of Phases 23/24/25 production use; OPEN-23-01 + 23-05-SUMMARY are the source citations.

### Focus 5: PAGE-11 raster-removal rule applicability

**Question:** Confirm PAGE-11 has nothing to remove in Phase 26 by searching for any raster nodes in OUT-OF-SCOPE Crito FAQ-like content.

**Answer:**

PEN-INVENTORY confirms FAQ + 404 are joel-only-no-crito-ref (rows at PEN-INVENTORY lines 77–78). Both have `frame_id: n/a (no Crito source)`, `child_section_count: 0`, `status_counts: flat:0, partial:0, factored:0`.

**No Crito FAQ frame exists** (OPEN-23-06 at PEN-INVENTORY line 252). The Crito Blog frame (`DzqTm`) is flat raster (OPEN-23-05) but is OUT-OF-SCOPE for Phase 26 — Phase 28 owns Blog reconstruction.

**No Crito 404 frame exists.** Frames Inventory enumerates 15 top-level Crito frames; none are named "404" or analogous. The 9 numbered frames `01_` through `09_` map to: 01-03 (agency variants OUT-OF-SCOPE), 04-06 (About/Service token-mining-only), 07 (Blog), 08 (Blog Details), 09 (Contact). No 404 frame in Crito source.

**Confirmation:**
PAGE-11 applies ONLY to the crito-source branch (D-68 explicit). Plan 26-03 CALIBRATION-PROTOCOL.md must include this carve-out in the branch matrix:

```
crito-source-present branch:
  - PAGE-11 active — original raster removed/hidden/locked after reconstruction verified
joel-only-no-crito-ref branch:
  - PAGE-11 not applicable — no raster exists to remove
```

**Confidence:** HIGH — confirmed by PEN-INVENTORY rows + OPEN-23-06 + frame enumeration.

### Focus 6: Calibration spot-check user-gate ergonomics

**Question:** Format of the calibration AskUserQuestion — how is the token list rendered? How is the screenshot delivered?

**Answer:**

Pattern proven in Phase 25 Plans 25-01 + 25-02 + 25-03:
- Plan task calls `mcp__pencil__get_screenshot({ nodeId: <sectionId> })` — image rendered inline in conversation
- Plan task immediately follows with AskUserQuestion presenting (a) the inline rendered screenshot, (b) structured description of the token bindings being verified, (c) a small option set (Approve / Revise / Gap-flag).

**Recommended format for Plans 26-01 + 26-02 calibration gate (per D-65):**

The AskUserQuestion `description` field is markdown. Render the token list as a markdown bullet list:

```markdown
## Calibration Spot-Check — FAQ Q+A Section

[Inline get_screenshot of qaSectionId is shown above this question by Pencil MCP]

**Semantic tokens consumed (per D-65 calibration vs `_Tokens & Foundations` RpGbe):**

- Headings (Q items): `type-semantic-heading-2-family` (Plus Jakarta Sans) + `-size` (32px) + `-weight` (700) + `-lh` (1.4)
- Body (A items): `type-semantic-prose-paragraph-family` (Inter) + `-size` (16px) + `-weight` (400) + `-lh` (1.625)
- Heading fill: `color-semantic-text-primary` (#141f39ff)
- Body fill: `color-semantic-text-secondary` (#52525bff)
- Section padding-y: literal [64, 0] bound to `space-semantic-section-y` rhythm
- Q+A item gap: 16 bound to `space-semantic-stack-sm`

**Calibration target (D-62 joel-only branch):**
The `_Tokens & Foundations` reference frame (RpGbe) at top of canvas shows the canonical visual register for these tokens. Does this Q+A section use them correctly?

**Description identifier (D-64 — inline-only per OPEN-23-01):**
`26-faq-qa-section--token-usage.png`
```

Options:
- "APPROVE — composition uses tokens correctly"
- "REVISE — token mismatch [free-text describe]"
- "GAP — composition reveals missing token (raise OPEN-26-NN)"

**Single AskUserQuestion per per-section calibration** (FAQ has 2 calibration gates: Q+A section + CTA section; 404 has 2: message section + NavBack section). Per D-65: "Single AskUserQuestion per per-page plan close" — interpretation: per-section gates batched at plan close, OR per-section gates throughout. **Recommendation:** Per-section gates batched at plan close (Phase 25 pattern — single user-gate at Task N close). FAQ plan close presents both Q+A + CTA in same gate; 404 plan close presents both message + NavBack.

**Confidence:** HIGH — pattern confirmed in Phase 25 25-01/02/03 user gates.

### Focus 7: `type-semantic-heading-2` token name conformance

**Question:** Does the new token name conform to existing primitive references? Is it a single composite or a 4-part family?

**Answer:**

Phase 23 PEN-INVENTORY § Tokens Written — Semantic Aliases (lines 687–690) confirms `type-semantic-heading-1` is a 4-part composite family:

| Token | Resolves to |
|----|----|
| `type-semantic-heading-1-family` | `$type-primitive-family-display` (Plus Jakarta Sans) |
| `type-semantic-heading-1-size` | `$type-primitive-size-48` |
| `type-semantic-heading-1-weight` | `$type-primitive-weight-700` |
| `type-semantic-heading-1-lh` | `$type-primitive-lh-heading` (1.4) |

**Heading-2 MUST mirror this 4-part shape:**

| Token | Resolves to (recommended) |
|----|----|
| `type-semantic-heading-2-family` | `$type-primitive-family-display` (same as heading-1 — Plus Jakarta Sans) |
| `type-semantic-heading-2-size` | `$type-primitive-size-32` (NEW primitive needed) |
| `type-semantic-heading-2-weight` | `$type-primitive-weight-700` (same as heading-1) |
| `type-semantic-heading-2-lh` | `$type-primitive-lh-heading` (1.4) (same as heading-1 — Crito heading rhythm reused) |

**Confirms D-12 flat-dash convention** — flat-dash hyphenation across both primitives and semantics. `type-semantic-heading-2-` matches the segment delimiter pattern.

**Adds one primitive (`type-primitive-size-32`)** to the surface — phase 23 originally shipped sizes 14, 16, 18, 48, 70. Phase 26 D-72 + D-33 + D-88 audit-trail this as the first Phase 26 primitive extension. PEN-INVENTORY § Token Extensions (Phase 24) gets a new "(Phase 26)" sub-section with this row.

**Final token count surface after Plan 26-00 Task 2:** 95 (Phase 25) + 5 = **100 tokens** (1 primitive + 4 semantics).

**Confidence:** HIGH — confirmed by PEN-INVENTORY heading-1 surface inspection + D-12 naming convention.

### Focus 8: Existing v1.3 FAQ Q+A content (lines 11–32)

**Question:** Extract the 5 Q+A pairs verbatim for direct copy-paste into Plan 26-01 `batch_design` calls.

**Answer:**

Read from `src/pages/faq.astro` lines 11–32 (verified):

**Q1:** "How long does a typical project take?"
**A1:** "Every project is different. Discovery and prototyping usually take 1-2 weeks, then we'll outline a timeline in the proposal based on scope."

**Q2:** "Do you work with clients outside your area?"
**A2:** "Absolutely. Most client communication happens over video calls and email. Location doesn't matter."

**Q3:** "What if I'm not sure exactly what I need?"
**A3:** "That's what discovery is for. We'll talk through your challenges and I'll help clarify what solution makes sense."

**Q4:** "How do you handle changes during the project?"
**A4:** "Small adjustments are normal. Larger scope changes are discussed together and may adjust the timeline or investment."

**Q5:** "What happens after handover?"
**A5:** "You get documentation and training. I'm available for questions and can provide ongoing support if needed."

**Encoding for `batch_design`:** All apostrophes (`'`) — `I'm`, `we'll`, `That's`, `Don't`, `you're` — must be passed verbatim. Pencil text node `content` field accepts UTF-8; no escaping needed beyond standard JSON string-quote semantics.

**Confidence:** HIGH — read directly from source file.

---

## Source-Branch Decision Tree for CALIBRATION-PROTOCOL.md (Plan 26-03 input)

Plan 26-03 needs the branch logic. Pre-derived for the planner:

```
Branch decision for any per-page phase (26 onward):
  ├── Check PEN-INVENTORY Frames Inventory for the page-name row
  ├── If row exists AND scope ∈ {IN-SCOPE, IN-SCOPE token-mining-only}:
  │     → CRITO-SOURCE-PRESENT branch
  │     → VALID-02 = side-by-side screenshot vs design/images/image-import-NN.{jpg,png}
  │     → VALID-01 fidelity = EXACT (pixel-faithful) / APPROXIMATE / STUB
  │     → PAGE-11 active — remove/hide/lock raster after verify
  │     → Calibration artifact identifier: `<phase>-<page>-<section>--side-by-side.png`
  │
  └── If row exists AND scope == joel-only-no-crito-ref:
        → JOEL-ONLY branch (Phase 26 case for FAQ + 404)
        → VALID-02 redefined per D-62 = token-usage check vs _Tokens & Foundations RpGbe
        → VALID-01 fidelity = EXACT (every property references semantic token) / APPROXIMATE (primitives directly or inferred values flagged OPEN) / STUB (layout placeholder)
        → PAGE-11 inert — no raster exists to remove
        → Calibration artifact identifier: `<phase>-<page>-<section>--token-usage.png`

Per-page phase consumer map:
  Phase 26: FAQ (joel-only) + 404 (joel-only) — BOTH joel-only branch
  Phase 27: Thank-you (joel-only) + Contact (crito-source via 09_Contact cl8tt) — uses BOTH branches in one phase
  Phase 28: Blog index (crito-source 07_Blog DzqTm) + Blog post (crito-source 08_Blog Details w1m3x) + Blog tag-page (joel-only no crito-ref) — mixed
  Phase 29: Projects index (joel-only) + Project detail (joel-only) — both joel-only
                Note: 04_About + 05_Service + 06_Service Details are IN-SCOPE-token-mining-only — NOT reconstructed
  Phase 30: Design system (joel-only) — joel-only branch
  Phase 31: Homepage (crito-source via ujMLJ — partially editable) — crito-source branch with already-editable nuance
```

**Phase 27 special:** Contact frame `cl8tt` is flat raster (OPEN-23-05) — crito-source branch but with no editable Crito source to mine. PAGE-11 should be evaluated case-by-case; CALIBRATION-PROTOCOL.md should note the flat-raster sub-case explicitly.

---

## PEN-INVENTORY Extensions Phase 26 Will Write (D-88 itemized)

For planner reference — Plan 26-NN summaries enumerate these as their PEN-INVENTORY edits:

| Section | Phase 26 extensions |
|---------|--------------------|
| **Frames Inventory** | NEW rows for `FAQ` (`frame_id: <new>`, scope: `joel-only-no-crito-ref`, status: `reconstructed-PHASE-26`) + `404` (same shape) — supersedes the placeholder rows from Phase 23 |
| **Variant Evidence (Phase 24)** sub-section "(Phase 26 late-additions)" | Rows for Section/CTA parent + 3 slots + placeholders + actions Button ref + arrow-right; Section/NavBack parent + 2 slots + heading + 3-4 link text children; FAQ page frame structural rows + Q+A section rows; 404 page frame structural rows + message section rows; CTA + NavBack sibling notes |
| **Token Extensions (Phase 24)** new "(Phase 26)" sub-section | 1 primitive row (`type-primitive-size-32`) + 4 semantic alias rows (`type-semantic-heading-2-{family,size,weight,lh}`) per D-72 |
| **Open Flags — Phase 26 (OPEN-26-NN)** NEW section | Populated by plan-surfaced flags. Likely includes: OPEN-26-01 (heading-2 interpolation-derived if user chose Option A), OPEN-26-02 (font/size in 404 message text STUB), OPEN-26-03 (NavBack link styling — body typography vs semantic-link if defined later), etc. Real flags determined at execution. |
| **Open Flags — Phase 23** OPEN-23-10 row | Update with Phase 26 partial-resolution note: "heading-2 resolved Phase 26 D-72; heading-3/4/5/6 remain open" |
| **Open Flags — Phase 23** OPEN-23-11 row | Update with Phase 26 re-pointing note: "prose-link + prose-list + inline-code re-pointed to Phase 28 per D-70 + D-73; Phase 26 declined to add (no consumer)" |
| **Variant Evidence — provisional flag** | Remove "provisional" flag from `type-semantic-prose-paragraph-*` rows IF calibration spot-check passes (D-71) |
| **NEW § Calibration Protocol** anchor | 1-2 sentence cross-reference to `.planning/research/CALIBRATION-PROTOCOL.md` per D-69 |

---

## Sources

### Primary (HIGH confidence — direct project artifacts)

- `.planning/phases/26-faq-404-reconstruction-calibration-workflow-established/26-CONTEXT.md` — D-58 through D-88 locked decisions
- `.planning/REQUIREMENTS.md` — PAGE-04, PAGE-08, PAGE-09, PAGE-11, VALID-01, VALID-02, VALID-03
- `.planning/ROADMAP.md` § Phase 26 — original Goal + Success Criteria
- `.planning/research/PEN-INVENTORY.md` lines 77–78 (joel-only frame rows), 247 (OPEN-23-01 export_nodes broken), 252 (OPEN-23-06 no Crito FAQ), 256 (OPEN-23-10 heading-2 gap), 259 (OPEN-23-13 $-references broken in batch_design), 687–690 (heading-1 semantic surface)
- `.planning/research/exports/v2.0/end-of-phase-25/id-inventory.json` — primitive + section IDs to instance
- `.planning/phases/25-section-compound-components/25-01-SUMMARY.md` — Section/Header build pattern, slot mechanics, user gate format
- `.planning/phases/25-section-compound-components/25-02-SUMMARY.md` — Section/Footer build pattern, atomic-glyph fallback
- `.planning/phases/25-section-compound-components/25-03-SUMMARY.md` — Compound/Card slot signature, typed-slot suggestion-only finding (D-52)
- `.planning/phases/23-audit-token-foundation/23-05-SUMMARY.md` (lines 46–48) — `get_screenshot` cannot write to disk, `export_nodes` broken, OPEN-23-01 substitution pattern
- `.planning/phases/24-layout-primitives-primitive-components/24-05-SUMMARY.md` — Phase 24 close + text-clipping false-positive documentation
- `src/pages/faq.astro` lines 11–32 — verbatim Q+A content

### Secondary (MEDIUM confidence — derived from project artifacts)

- `.planning/research/STACK.md` — Pencil MCP tool catalogue confirms `find_empty_space_on_canvas` placement mechanic
- `.planning/research/PITFALLS.md` — F3 (no eyedropping from raster), O5/O6 (component bloat), Pitfall 1 (no inventing primitives)
- `.planning/research/SUMMARY.md` — T1 (variables-first), T5 (don't repeat v1.4), T6 (single-file), T8 (component variants on-demand)
- Phase 25 25-02 25-03 plan files — calibration screenshot patterns; AskUserQuestion gate ergonomics

### Tertiary (LOW confidence — environment inspection)

- Direct `file` command inspection of `design/images/Consulting & Agency Website Template I Crito (Community).fig` — confirms zip archive format (Figma binary, agent-unreadable)
- `.planning/ui-reviews/v2.0/` directory presence check — directory does NOT exist; `.gitignore` blocks `*.png`; confirms inline-only screenshot pattern

---

## Metadata

**Confidence breakdown:**

| Area | Level | Reason |
|------|-------|--------|
| Page-frame creation mechanics (Focus 1) | HIGH | Phase 24/25 carry-forward; `find_empty_space_on_canvas` production-proven |
| Section/CTA + NavBack composition (Focus 2) | HIGH | Direct Phase 25 carry-forward; slot patterns confirmed |
| `.fig` direct-read feasibility (Focus 3) | HIGH | `file` command verified zip archive format; agent cannot read Figma binary |
| Calibration artifact mechanism (Focus 4) | HIGH | OPEN-23-01 + 23-05-SUMMARY + Phase 25 plan-close pattern all confirm inline-only |
| PAGE-11 applicability to joel-only (Focus 5) | HIGH | PEN-INVENTORY rows + OPEN-23-06 + frame enumeration |
| User gate ergonomics (Focus 6) | HIGH | Phase 25 25-01/02/03 user gate patterns |
| Token name conformance (Focus 7) | HIGH | Phase 23 heading-1 surface direct read |
| v1.3 FAQ content extraction (Focus 8) | HIGH | Direct file read |
| Exact heading-2 size value | MEDIUM | Interpolation recommended; user gate decides at Plan 26-00 Task 1 |
| `find_empty_space_on_canvas` directional preference | LOW | Parameter shape unverified — Plan 26-01 Task 1 probes |

**Research date:** 2026-06-06
**Valid until:** 30 days (stable foundation; revisit if Pencil schema bumps past 2.13)

---

*Phase: 26-faq-404-reconstruction-calibration-workflow-established*
*Research output for: Plan 26-00, 26-01, 26-02, 26-03 planning*

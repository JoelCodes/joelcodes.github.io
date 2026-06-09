# Phase 30: Design System Reference Reconstruction — Research

**Researched:** 2026-06-09
**Domain:** Pencil MCP-driven design-file reconstruction; per-page joel-only-no-crito-ref branch (CALIBRATION-PROTOCOL § 4); showcase-pattern factoring with intentional departure from Phase 26/28/29 narrow-scoping; v1.3 design-system content-extraction discipline
**Confidence:** HIGH on CONTEXT-locked decisions D-142..D-154 and carry-forward chain; HIGH on v1.3 source content extraction (file read directly); MEDIUM on `RpGbe` `_Tokens & Foundations` sub-grouping (will probe at Plan 30-01 Task 0); MEDIUM on Pencil 2.13 ergonomics for ~30-tile auto-layout horizontal-wrap (untested at this density inside the file); LOW on stale-cache `get_screenshot` behavior on a ~58-instance page-frame (production-precedent suggests likely trigger; Tier-2 fallback inherited).

## Summary

Phase 30 reconstructs the `Design system` page frame inside `design/Crito.pen` as the FIFTH production use of the CALIBRATION-PROTOCOL § 4 joel-only-no-crito-ref branch (after Plan 26-01 FAQ + Plan 26-02 404 + Plan 27-01 Thank-you + Plan 28-03 Tag), and it CLOSES the PEN-INVENTORY's last `joel-only-no-crito-ref` placeholder row (line 77 `(joel-only: Design System)`) via the Phase 29 D-128 in-place reclassification pattern. The phase ships in 2 plans by default (30-00 foundation + 30-01 page-frame), with plan-execution discretion to split 30-01 into 30-01 + 30-02 if the ~58-instance page-frame density warrants per § 6.4 stale-cache risk.

The single most-load-bearing structural decision is **D-149: factor all 3 showcase patterns** (`Section / TokenSwatchGrid`, `Section / TypeSpecimen`, `Section / ComponentShowcase`) as NEW narrow-scoped library entries in Plan 30-00 — an INTENTIONAL DEPARTURE from the Phase 26 D-79 + Phase 28 D-116 + Phase 29 D-134 single-consumer narrow-scoping precedent, justified by **in-phase repetition density** (~58 instances inside Phase 30 alone) plus future v3 design-system milestone plausibility. The library count moves 16 → 19. The departure is bounded at the SECTION-pattern level only; Phase 30 still does NOT invent new primitives or compounds (T8 + Pitfall O5/O6 discipline holds at the lower layers).

The content register is **utilitarian internal-docs (D-142)** — no hero band, no decorative bg fills, no Section/CTA marketing close — honest to v1.3's `<meta name="robots" content="noindex, follow">` framing as an internal reference for Joel + AI coding agents. Page-intro content comes **v1.3 verbatim** (D-143) from `src/pages/design-system.astro` lines 32-46, with sibling Pencil notes preserving the noindex meta + `/design-system.json` endpoint intent for the code milestone. The 5-section structure (Page-intro → Colors → Typography → Components → Utilities → Footer) **mirrors v1.3's section IDs verbatim** (D-144), preserved as sibling notes on each H2 frame.

**Primary recommendation:** Treat Plan 30-00 as a tight foundation plan (3 new section components inside g9oRa5, no user gate at close, possible 0-2 new tokens at mid-plan gate per D-72/D-106/D-135 precedent — default NO new tokens). Treat Plan 30-01 as the broadest single-plan calibration in v2.0 (5 sections + ~58 visual artifacts) — anchor on `nodeId: s5k41l` (Phase 29 Project frame) per § 10.4, ship `placeholder:true` during build, settle to `fit_content` at the snapshot/screenshot task, and pre-commit to Tier-2 user-editor verification at the calibration gate as the production-proven fallback for tall page frames. Probe `RpGbe` structure at Plan 30-01 Task 0 to align token-gallery sub-grouping with the reference frame the user sees during calibration.

## Standard Stack

The v2.0 milestone is `.pen`-file-only. The "stack" here is the Pencil MCP toolchain + the joel-only-no-crito-ref branch protocol. Zero `src/` code changes per PROJECT.md + REQUIREMENTS.md Out of Scope.

### Core (mutating tools — used in Plan 30-00 + 30-01)
| Tool | Version | Purpose | Why Standard |
|---|---|---|---|
| `mcp__pencil__get_editor_state({ include_schema: false })` | Pencil schema 2.13 | Pre-flight active-editor assertion before EVERY mutating call | D-153 carry-forward from Phase 23 OPEN-23-14 → 24 D-35 → 25 D-54 → 26 D-87 → 27 D-103 → 28 D-125 → 29 D-140. Prevents the OPEN-23-14 wrong-file mutation failure mode. Halt on mismatch. |
| `mcp__pencil__batch_design` | Pencil 2.13 | 3 new library entries (Plan 30-00) + 1 new page-frame + ~58 instance children (Plan 30-01) | Mutation workhorse; supports Insert `I(parent,{...})` + Update `U(id,{...})` + Copy `C(srcId,parentId,{...})` shorthand. ~25-op cap per call — chunk Plan 30-01 across multiple calls. |
| `mcp__pencil__set_variables` | Pencil 2.13 | Possible 0-2 new tokens at Plan 30-00 mid-plan gate | Default NO new tokens; only invoked IF showcase-internal padding/gap or heading-5/-6 specimen-label tokens surface escalation. Variable-to-variable aliasing via `$<name>` resolution works (Phase 23 OPEN-23-13 confirmed); batch_design value-ref STILL broken (literal hex required in component fills). |
| `mcp__pencil__find_empty_space_on_canvas` | Pencil 2.13 | Plan 30-01 page-frame placement with `nodeId: s5k41l` anchor | § 10.4 nodeId-anchor pattern. Without `nodeId`, FindEmptySpace picks the library row (y ≈ −11711); with anchor, placement falls on the page-frame row (y ≈ −4111). Phase 29 Project frame `s5k41l` is the latest reconstructed page frame (Plan 29-02 close) — confirmed via PEN-INVENTORY row 83 + canvas coord (7547.27, −4111.55). |

### Core (reading tools — used at every plan)
| Tool | Purpose | When |
|---|---|---|
| `mcp__pencil__batch_get` | Verify baseline IDs intact (Phase 23-29 components + page frames + library parents + RpGbe) | Plan 30-00 Task 0 + Plan 30-01 Task 0 + plan close zero-mutation diff |
| `mcp__pencil__get_variables({})` | Token-surface drift verification | Plan start + plan close; expects 127 tokens (post-Phase 28; Phase 27 + 29 added 0 each); Phase 30 ships 0-2 net-new per D-151 |
| `mcp__pencil__get_guidelines({ topic: "design-system" })` | Slot mechanics + spacing reference + token convention | Plan 30-00 start (3 new component-authoring tasks) |
| `mcp__pencil__snapshot_layout({ problemsOnly: true })` | Per-plan close validation; expect `"No layout problems."` at document root; text-clipping false-positives per-frame documented per Phase 24-29 precedent | Every plan close; Plan 30-01 likely exceeds prior counts due to ~58-instance density per Pitfall 6 |
| `mcp__pencil__get_screenshot({ nodeId })` | Inline screenshot for calibration gate AskUserQuestion (Plan 30-01 close only) | INLINE-only per OPEN-23-01 substitution; description identifiers per § 4.6 are NOT disk-write paths |

### Supporting (Pencil-side, in-canvas inputs)
| Resource | Pencil ID | Purpose | Use |
|---|---|---|---|
| `_Tokens & Foundations` | `RpGbe` | PRIMARY calibration target per D-62 + § 4.1 VALID-02 | Plan 30-01 calibration AskUserQuestion description structures itself around: "Does the Design system page frame's TokenSwatchGrid + TypeSpecimen + ComponentShowcase tile-bindings match the canonical surface declared in RpGbe?" |
| `_Components / Primitives` | `avgor` | Phase 24 + 25 Secondary Button + 27 Select/Checkbox/Substack glyph parent | Component gallery instances Button M7eUr + hIWuC, Input nwJk7, Badge j0FxQZ + kJQmJ, Icon u7NmaS + 16/20/32 variants |
| `_Components / Compounds` | `t67DU6` | Phase 25 Card + 28 BlogCard + 29 ProjectCard + 27 CheckboxGroup parent | Component gallery instances Card t40xct, BlogCard ZSxZU, ProjectCard DnsRs, CheckboxGroup compound |
| `_Components / Sections` | `g9oRa5` | Phase 25 Header/Footer + 26 CTA/NavBack + 28 TagFilter/RelatedPosts + 29 ResultsMetrics/RelatedProjects parent | Component gallery instances + Plan 30-00 adds 3 new children: TokenSwatchGrid + TypeSpecimen + ComponentShowcase |
| Phase 29 Project frame | `s5k41l` | Latest reconstructed page frame at canvas (7547.27, −4111.55) | Plan 30-01 `find_empty_space_on_canvas` anchor per § 10.4 — directs placement to page-frame row (y ≈ −4111) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff / Why Not |
|---|---|---|
| 3 NEW factored sections (D-149) | Inline composition × 58 inside the page frame | DECLINED by D-149: ~58 in-phase instances would duplicate structural decisions ~58 times; sibling-component pattern keeps page-frame body declarative. Pitfall O5/O6 single-consumer rule INTENTIONALLY OVERRIDDEN with documented rationale. |
| Single Plan 30-01 (default) | Plan 30-01 + 30-02 split | Default lean per D-151. Split discretion available IF scope-vs-attention warrants per § 6.4 stale-cache risk OR if AskUserQuestion description gets unwieldy. Phase 26-29 all completed within single per-page plans even at 4-7 sections per frame; Phase 30 has 5 sections but ~58 instances inside Components section alone — split is a real possibility at plan-execution. |
| `find_empty_space_on_canvas` with no anchor | `nodeId: s5k41l` anchor (D-145) | Without anchor, FindEmptySpace picks library row Y ≈ −11711 instead of page-frame row Y ≈ −4111 (Plan 26-02 contribution). § 10.4 codified the anchor pattern; mandatory for Plan 30-01. |
| Section/CTA marketing close | (none) | D-142 utilitarian internal-docs register declines; if a "back to homepage" link surfaces in plan-execution, ship as a Phase 27 D-99 secondary-text-link pattern (Phase 29 D-133 second consumer) — would be third consumer, justifying `Section / SecondaryLink` factoring per emerging-consumer rule (DEFERRED per D-145 default). |
| Sticky sidebar nav (v1.3) | Linear long-scroll (D-145) | v1.3 `lg:grid-cols-[250px_1fr]` DesignSystemNav DROPPED. Rationale: (a) sticky behavior doesn't render at Pencil design-tool level (D-92/D-59 static-design carry-forward); (b) Pitfall O5/O6 single-consumer rule applies AT THIS LAYER (no other Joel page has a sidebar — would violate narrow-scoping). Sibling Pencil note on page-intro section documents v1.3 surface for code milestone. |
| Joel-brand visual chrome (yellow neobrutalist + Bricolage Grotesque) | Crito-vocab register (D-58 carry-forward) | NOT inherited. v2.0 milestone is Crito-vocab fresh design; Joel-brand replacement happens at code milestone per PROJECT.md. v1.3 `border-l-4 border-turquoise` H2 treatment specifically NOT inherited. |
| Dual light/dark token-gallery | Light-mode only (TOKEN-07 + D-01) | TOKEN-07 dark-mode deferral applies; v1.3 design-system.astro shows light + dark swatches per TokenSwatch — Phase 30 ships light-mode only. Sibling note on Colors section documents v1.3 dual-mode rendering for future dark-mode milestone. |

**Installation:** N/A — Pencil MCP is the entire stack. No npm packages installed in v2.0.

## Architecture Patterns

### Plan Structure (D-151 default — 2 plans, foundation-first)

```
Phase 30
├── Plan 30-00 — Foundation (3 new section components in g9oRa5)
│   ├── Task 0 — Pre-flight + baseline read + RpGbe probe
│   ├── Task 1 — Section/TokenSwatchGrid component build
│   ├── Task 2 — Section/TypeSpecimen component build
│   ├── Task 3 — Section/ComponentShowcase component build (code-snippet-slot per D-150)
│   ├── Task 4 — Sibling-note slot signatures per D-149 (3 notes)
│   ├── Task 5 — Possible mid-plan token gate (D-72/D-106/D-135 precedent; default skip)
│   ├── Task 6 — Snapshot_layout + library zero-mutation diff
│   └── Task 7 — PEN-INVENTORY extension (NEW rows + Variant Evidence + OPEN-30-NN seed)
│       (No user-calibration gate at close per D-152 — pure foundation work)
│
└── Plan 30-01 — `Design system` page-frame composition + calibration
    ├── Task 0 — Pre-flight + baseline + RpGbe sub-grouping read
    ├── Task 1 — Page-frame chassis (placeholder:true, 1440, fit_content settle later)
    ├── Task 2 — Header instance (G0wNOc, no override per D-77)
    ├── Task 3 — page-intro section (v1.3 verbatim H1 + body + JSON-link + 2 sibling notes)
    ├── Task 4 — Colors section (4 TokenSwatchGrid instances: Primary Accent / Text / Neutral / Usage)
    ├── Task 5 — Typography section (TypeSpecimen instances: Font Families + Type Scale + Weights + LH)
    ├── Task 6 — Components section (~16 ComponentShowcase instances: Primitives → Compounds → Sections)
    ├── Task 7 — Utilities section (3 sub-sections: iso-shadow approximation + iso-glow STUB + iso-rotate STUB; sibling CSS notes)
    ├── Task 8 — Footer instance (Xs0Hs, no override per D-77)
    ├── Task 9 — Snapshot_layout + fit_content settle + zero-mutation baseline diff
    ├── Task 10 — Per-section get_screenshot (Tier-1 stale-cache mitigation; Tier-2 fallback ready)
    └── Task 11 — Plan-close calibration AskUserQuestion (joel-only branch § 4.5 format)
                  + on APPROVE: PEN-INVENTORY in-place reclassification of line 77 placeholder
```

**Plan-execution split discretion (D-151):** If ~58 instance density makes the single AskUserQuestion unwieldy at calibration gate, plan-execution at `/gsd:plan-phase 30` may split into:
- Plan 30-01 — chassis + Header + page-intro + Colors + Typography (token gallery surface)
- Plan 30-02 — Components + Utilities + Footer + calibration (component gallery surface)

Default lean: single Plan 30-01 (consistent with Phase 26-29 one-page-frame-one-plan precedent).

### Page-Frame Architecture (D-145 + D-146 — linear long-scroll, 1440 outer / 1200 content-width)

```
Design system page frame (1440w × fit_content)
├── layout: vertical, gap: 0, padding: 0, alignItems: center, fill: color-semantic-bg-page
├── x: <find_empty_space_on_canvas with nodeId:s5k41l anchor>
├── y: page-frame row ≈ −4111
│
├── Section/Header instance (G0wNOc — Crito-source pure-ref, no override per D-77)
│   (Page-frame chassis Header — first cross-page consumer per ROADMAP success criterion 3)
│
├── page-intro section (1200w sub-frame)
│   ├── H1 "Design System" (v1.3 line 32-34 verbatim) — `type-semantic-heading-1`
│   ├── Body: "Internal reference for Joel and AI coding agents..." (v1.3 line 35-37 verbatim)
│   ├── Secondary line: "Machine-readable format: /design-system.json" (v1.3 line 38-46 condensed)
│   ├── sibling Pencil note A — noindex preservation (v1.3 line 15-16)
│   └── sibling Pencil note B — JSON endpoint preservation (v1.3 lines 38-46 + design-system.json.ts)
│
├── Colors section (H2 "Colors" + 4 TokenSwatchGrid instances)
│   ├── sibling note: v1.3 #colors anchor ID
│   ├── Primary Accent (TokenSwatchGrid instance — ~3 brand swatches)
│   ├── Text Variants (TokenSwatchGrid instance — ~2 text-on-light + text-on-dark swatches)
│   ├── Neutral (TokenSwatchGrid instance — ~6 bg/text/border swatches)
│   └── Usage Guidelines (decorative — small grouped notes; may inline as a child frame)
│
├── Typography section (H2 "Typography" + TypeSpecimen instances)
│   ├── sibling note: v1.3 #typography anchor ID
│   ├── Font Families (TypeSpecimen instance — display + body specimens with ABCabc012)
│   ├── Type Scale (TypeSpecimen instance — display/h1/h2/h3/h4/body/body-sm/caption/button)
│   ├── Font Weights (TypeSpecimen instance OR inline table — 400/500/600/700)
│   └── Line Heights (TypeSpecimen instance OR inline table — tight/snug/normal/loose)
│
├── Components section (H2 "Components" + ~16 ComponentShowcase instances)
│   ├── sibling note: v1.3 #components anchor ID
│   ├── Primitives sub-heading (H3)
│   │   ├── Button/Default (M7eUr) ComponentShowcase + Button/Secondary (hIWuC) ComponentShowcase
│   │   ├── Input/Default (nwJk7) ComponentShowcase + Input/Focus + Input/Error showcases
│   │   ├── Badge/Default (j0FxQZ) + Badge/Outline (kJQmJ) showcases
│   │   └── Icon (u7NmaS + 16/20/32 variants) ComponentShowcase (sizes shown side-by-side)
│   ├── Compounds sub-heading (H3)
│   │   ├── Card (t40xct, populated default) ComponentShowcase
│   │   ├── BlogCard (ZSxZU, populated default) ComponentShowcase
│   │   ├── ProjectCard (DnsRs, populated default) ComponentShowcase
│   │   └── CheckboxGroup (populated default) ComponentShowcase
│   └── Sections sub-heading (H3)
│       ├── Header (G0wNOc) ComponentShowcase
│       ├── Footer (Xs0Hs) ComponentShowcase
│       ├── CTA (Hs5rc) ComponentShowcase
│       ├── NavBack (N1jo3i) ComponentShowcase
│       ├── TagFilter (O1IwyS) ComponentShowcase
│       ├── RelatedPosts ComponentShowcase
│       ├── ResultsMetrics (y4RORu) ComponentShowcase
│       └── RelatedProjects (OLSa0) ComponentShowcase
│
├── Utilities section (H2 "Utilities" + 3 sub-sections per D-144)
│   ├── sibling note: v1.3 #utilities anchor ID
│   ├── iso-shadow (APPROXIMATE — offset filled shape behind a Card placeholder)
│   │   └── sibling CSS note: `box-shadow: 5px 5px 0 currentColor` (global.css line 198-200; sm:3px, lg:8px)
│   ├── iso-glow (STUB — CSS-only filter, no clean Pencil rendering)
│   │   └── sibling CSS note: `box-shadow: 0 0 20px color-mix(in oklch, currentColor 40%, transparent)` (global.css line 225-227; subtle:15px/20%, strong:30px/60%)
│   └── iso-rotate (STUB — CSS 3D transform, no clean Pencil rendering)
│       └── sibling CSS note: `transform: rotateX(45deg) rotateZ(45deg)` (global.css line 146-148; subtle:30°/30°, steep:60°/45°)
│
└── Section/Footer instance (Xs0Hs — Crito-source pure-ref, no override per D-77)
```

### Pattern 1: Pure-Ref Instance with No Descendants Override (Plan 26-02 Task 3 contribution + D-77 carry-forward)

**What:** When a section component's defaults match the consumer's needs, instance it without overrides.
**When to use:** Section/Header (G0wNOc) and Section/Footer (Xs0Hs) on Plan 30-01 page-frame chassis. v1.3 design-system page renders the same generic Header + Footer; no Joel-brand override (deferred to Phase 31 Homepage per D-38 + D-77 carry-forward chain).
**Example pattern:**
```js
// Source: Plan 26-02 Task 3 (Section/NavBack pure-ref pattern) → carry-forward
batch_design({ operations: `
  headerInstance = I(designSystemPageFrame, {
    type: "ref",
    ref: "G0wNOc",
    name: "Section/Header instance"
  });
` });
// No descendants override. Component defaults serve directly.
```

### Pattern 2: `find_empty_space_on_canvas` with nodeId Anchor (§ 10.4 + Plan 26-02 contribution)

**What:** Pass a `nodeId` argument to FindEmptySpace to force placement on the same row as the anchor node.
**When to use:** Plan 30-01 page-frame placement; anchor on `nodeId: s5k41l` (Phase 29 Project frame at canvas (7547.27, −4111.55)).
**Example pattern:**
```js
// Source: CALIBRATION-PROTOCOL § 10.4 (Plan 26-02 contribution; Phase 27 + 28 + 29 inherited)
batch_design({ operations: `
  pos = FindEmptySpace({
    width: 1440,
    height: 2400,    // estimate; will settle via fit_content at Task 9
    direction: "right",
    padding: 80,
    nodeId: "s5k41l"  // Phase 29 Project frame — anchors to page-frame row y ≈ −4111
  });
  designSystemPageFrame = I(document, {
    type: "frame",
    name: "Design system",
    x: pos.x,
    y: pos.y,
    width: 1440,
    height: 2400,    // placeholder, will switch to fit_content at Task 9
    layout: "vertical",
    gap: 0,
    padding: 0,
    alignItems: "center",
    fill: "#ffffffff",  // color-semantic-bg-page resolved literal per OPEN-23-13 batch_design limitation
    placeholder: true
  });
` });
```

### Pattern 3: fit_content Height Settle After Build (Plan 26-02 Task 4 contribution)

**What:** Build the page frame with a fixed-height estimate during construction; clear `placeholder:true` and switch to `height: "fit_content"` at the snapshot/screenshot task.
**When to use:** Plan 30-01 Task 9 (after all sub-sections inserted, before calibration screenshots).
**Example pattern:**
```js
// Source: Plan 26-02 Task 4 — page-frame fit_content settle
batch_design({ operations: `
  U("<designSystemPageFrameId>", {
    placeholder: false,
    height: "fit_content"
  });
` });
```

### Pattern 4: Tier-1 / Tier-2 Stale-Cache Workaround (§ 6.4 OPEN-26-02)

**What:** Newly-created subtrees sometimes return blank-white from `get_screenshot` in the active session. Cross-row position Update clears stale cache (Tier-1); if Tier-1 fails, fall back to user-side editor verification (Tier-2).
**When to use:** Plan 30-01 Task 10 (per-section screenshot capture for calibration gate). HIGH likelihood of trigger given ~58-instance density per Phase 26-29 precedent.
**Example pattern:**
```js
// Source: CALIBRATION-PROTOCOL § 6.4 + Plan 26-02 Tier-2 production use
// Tier-1: move across rows, then back
batch_design({ operations: `
  U("<pageFrameId>", { x: <currentX>, y: -8000 });  // move to non-page-frame row
` });
batch_design({ operations: `
  U("<pageFrameId>", { x: <currentX>, y: -4111 });  // move back
` });
get_screenshot({ nodeId: "<section-id>" });
// Tier-2: if still blank, gate description says "verify in Pencil editor at canvas <coords>"
```

### Pattern 5: AskUserQuestion Single Plan-Close Gate (§ 4.5 joel-only branch)

**What:** Single AskUserQuestion at plan close with a structured description covering all per-section fidelity proposals + token-usage bindings.
**When to use:** Plan 30-01 Task 11 only (Plan 30-00 closes WITHOUT a user gate per D-152).
**Example structure (from CALIBRATION-PROTOCOL § 4.5):**
```
## Calibration Spot-Check — Design system Page (Joel-Only Branch)

**Inline renders shown above:** page-intro, Colors, Typography, Components, Utilities

### Section 1: page-intro
Fidelity label proposal: APPROXIMATE per D-83 (v1.3 verbatim text but new sibling-note structural docs)
**Semantic tokens consumed:**
- H1: type-semantic-heading-1 (Plus Jakarta Sans 70/700 lh-tight)
- body: type-semantic-prose-paragraph
- secondary-line: type-semantic-prose-caption + type-semantic-prose-link
- bg: color-semantic-bg-page

### Section 2: Colors
Fidelity label proposal: EXACT per D-83 (TokenSwatchGrid tiles bind directly to color-semantic-* declared in RpGbe)
... [Primary Accent / Text Variants / Neutral subgroupings] ...

### Section 3: Typography
... TypeSpecimen tile bindings ...

### Section 4: Components
Fidelity label proposal: EXACT (instances bind to canonical primitives/compounds/sections)

### Section 5: Utilities
Fidelity label proposal: APPROXIMATE (iso-shadow) + STUB (iso-glow, iso-rotate) per D-83 LAYOUT/TEXT split
**Sibling CSS notes attached for code-milestone re-implementation**

### Section 6: Header/Footer (chassis)
Fidelity label proposal: EXACT (pure-ref instances, no override per D-77)

### Calibration target (D-62 joel-only branch):
`_Tokens & Foundations` reference frame `RpGbe` — does the Design system page frame's TokenSwatchGrid + TypeSpecimen + ComponentShowcase tile-bindings match the canonical surface declared in RpGbe?

**Description identifiers (D-64, inline only per OPEN-23-01, NOT disk-written):**
- 30-design-system-page-intro--token-usage.png
- 30-design-system-colors--token-usage.png
- 30-design-system-typography--token-usage.png
- 30-design-system-components--token-usage.png
- 30-design-system-utilities--token-usage.png
```

Options:
- "APPROVE — all sections use tokens correctly; fidelity labels per D-83 as proposed"
- "REVISE — token mismatch (free-text describe)"
- "GAP — composition reveals a missing token (raise OPEN-30-NN; specify the gap)"

### Pattern 6: Sibling-Note Belt-and-Suspenders Documentation (D-93 + D-52 + D-149)

**What:** Pencil 2.13 typed-slot is suggestion-only (Plan 25-03 D-52 confirmed against schema). All slot signatures + structural notes ship as sibling Pencil notes regardless of typed-slot adoption.
**When to use:** Plan 30-00 Tasks 4 (3 new section slot-signature notes); Plan 30-01 Task 3 (noindex + JSON sibling notes on page-intro); Plan 30-01 Task 4-7 (v1.3 section-anchor-ID sibling notes on H2 frames + Utilities CSS notes).

### Anti-Patterns to Avoid

- **Hand-rolling inline composition for ~58 instances.** D-149 INTENTIONALLY DEPARTS from narrow-scoping precedent to avoid this. Use the 3 factored sections.
- **Inventing new primitive variants for the gallery.** D-147 + D-148 are honest: ship 1-2 curated variants per primitive (not exhaustive matrix). Variant matrices already exist at the primitive level for downstream agents to discover via `batch_get`.
- **Hiding the v1.3 noindex / JSON endpoint by not documenting them.** D-143 sibling Pencil notes are LOAD-BEARING for code-milestone handoff.
- **Joel-brand visual chrome (yellow neobrutalist, Bricolage Grotesque, turquoise H2 left-border).** D-58 + D-142 carry-forward: Crito-vocab register only.
- **Multi-theme rendering (light + dark side-by-side).** TOKEN-07 + D-01 carry-forward: light-mode only. Sibling note documents v1.3 dual-mode for future dark milestone.
- **Building Section/SidebarNav for one consumer.** Pitfall O5/O6 single-consumer rule applies AT THE PAGE-LEVEL navigation layer (no other Joel page has sidebar nav). D-145 explicit decline.
- **Skipping pre-flight `get_editor_state`.** D-153 is non-negotiable. OPEN-23-14 wrong-file-mutation failure mode prevented only by the assertion.
- **Hardcoding `$<variable-name>` references in batch_design Insert calls.** Per OPEN-23-13: batch_design silently rejects `$<token>` references (defaults to baseline). Use literal hex / size / family values in batch_design; variable resolution still works for `set_variables` + Pencil UI / standard runtime export.

## Don't Hand-Roll

Problems that look simple but have existing solutions inside `design/Crito.pen` after Phases 23-29:

| Problem | Don't Build | Use Instead | Why |
|---|---|---|---|
| Color swatch grid with ~30 tiles | Inline auto-layout horizontal-wrap frames × 30 | `Section / TokenSwatchGrid` (Plan 30-00 NEW per D-149) | ~30 inline tiles bloats Plan 30-01 + duplicates tile structural decisions; factored section gives heading-slot + grid-of-swatch-tiles signature reusable across Colors sub-sections (Primary Accent / Text / Neutral) |
| Type specimen tile with sample-text + token-name + size/weight/lh caption | Inline frame composition × 12 | `Section / TypeSpecimen` (Plan 30-00 NEW per D-149) | Repeating tile structure ~12 times for Type Scale + Font Families bloats the page-frame body; factored section ships heading-slot + grid-of-specimen-tiles signature |
| Component showcase block (label + live instance + code snippet) | Inline frame composition × 16 | `Section / ComponentShowcase` (Plan 30-00 NEW per D-149 + D-150) | ~16 showcase blocks × structural decisions = ~16× repetition. Factored section ships label-slot + live-instance-slot + code-snippet-slot signature. Code-snippet-slot uses Phase 28 `type-semantic-mono-primitive` + `type-semantic-prose-code-block` tokens (D-150). |
| Header + Footer for the Design system page chassis | New header/footer composition | `Section / Header (G0wNOc)` + `Section / Footer (Xs0Hs)` pure-ref instances | Phase 25 ships these; ROADMAP success criterion 3 requires using them at top + bottom of Phase 30 page as the cross-page consistency proof. Pure-ref pattern per Plan 26-02 Task 3 + D-77 (no override). |
| Button gallery showcase | Inline mini-Button | `Primitive / Button / Default` (M7eUr) + `Primitive / Button / Secondary` (hIWuC) refs | Phase 24 + 25 shipped both. D-147 curates 1-2 variants — NOT exhaustive 4 purposes × 3 sizes × 4 states matrix (would be 48 cells; D-148 says no — variants exist structurally at primitive level for downstream `batch_get`). |
| Input gallery showcase | Inline mini-Input | `Primitive / Input / Default` (nwJk7) + Focus + Error states | Phase 24 + 27 shipped. Each state ships as its own ComponentShowcase instance per D-148. |
| Badge gallery showcase | Inline mini-Badge | `Primitive / Badge / Default` (j0FxQZ) + `Primitive / Badge / Outline` (kJQmJ) | Phase 24 + 28 (Outline addition per Phase 28 Badge variant evaluation). |
| Icon gallery showcase | Inline mini-Icon × 4 sizes | `Primitive / Icon / 24` (u7NmaS) + 16/20/32 variants | Phase 24 D-29 Icon component with 4 size variants. Sizes ARE the canonical taxonomy here (per Phase 24 D-29), shown side-by-side as a single showcase. |
| Card / BlogCard / ProjectCard gallery showcases | New card variants | `Compound / Card` (t40xct) + `Compound / BlogCard` (ZSxZU) + `Compound / ProjectCard` (DnsRs) | Phase 25 + 28 + 29 sibling-component pattern (OPEN-25-07 RESOLVED). One populated default instance per card type as a ComponentShowcase. |
| CheckboxGroup gallery showcase | New compound | `Compound / CheckboxGroup` (Phase 27 Plan 27-00 sibling primitive + compound) | Phase 27 Plan 27-00 shipped — populated default instance. |
| 8 Section gallery showcases | Inline section compositions | `Section / Header` (G0wNOc) + Footer (Xs0Hs) + CTA (Hs5rc) + NavBack (N1jo3i) + TagFilter (O1IwyS) + RelatedPosts + ResultsMetrics (y4RORu) + RelatedProjects (OLSa0) | All shipped Phase 25-29. One canonical instance each as ComponentShowcase. |
| Page-frame chassis vertical layout | Custom positioning | Auto-layout vertical-stack at page level (Phase 26-29 carry-forward) | Phase 26/27/28/29 chain established the convention. Phase 30 inherits. |
| Calibration screenshot path management | Disk write `.png` files | INLINE `get_screenshot` only per OPEN-23-01 substitution | `get_screenshot` returns inline image-content via MCP protocol; does NOT save to disk. D-64 description identifiers are NOT writable paths. |

**Key insight:** Phase 30 is the v2.0 library reference — by definition, it INSTANCES the library, doesn't extend the primitives/compounds. The only NEW factoring is at the SECTION layer (3 showcase patterns) and is bounded by D-149's documented departure rationale. Anything that smells like "build a new primitive variant for the gallery" violates D-147 curation discipline.

## Common Pitfalls

### Pitfall 1: Stale-Cache `get_screenshot` on a Tall Page Frame (HIGH likelihood)

**What goes wrong:** Newly-created subtrees return blank-white from `get_screenshot` in the active session.
**Why it happens:** Pencil 2.13 per-subtree render cache; clears on cross-row position Updates (Tier-1) but Plan 26-02 found same-row Updates insufficient for some subtrees (Tier-2 needed).
**How to avoid:** Plan 30-01 Task 10 — pre-commit to Tier-2 fallback path:
1. Try `Update(pageFrame, { y: -8000 })` then `Update(pageFrame, { y: -4111 })` cross-row move + back.
2. If still blank, calibration gate description says "verify in Pencil editor at canvas (<x>, −4111.55)" — user APPROVES visually in the actual editor; structural verification via `batch_get` + `snapshot_layout` remains authoritative.
**Warning signs:** Phase 30 page-frame is the broadest single-plan calibration scope in v2.0 (5 sections + ~58 visual artifacts). Phase 26-29 precedent on tall page frames repeatedly triggered the quirk. Treat Tier-2 as the production path, not the exception.

### Pitfall 2: `batch_design` Silently Rejects `$<variable-name>` References (OPEN-23-13)

**What goes wrong:** Calls like `Insert(parent, { fill: "$color-semantic-bg-page" })` resolve to baseline (e.g., `#000000`) instead of the token value.
**Why it happens:** Pencil 2.13 batch_design value-field doesn't run the variable-resolution pipeline; only `set_variables` and standard runtime export do.
**How to avoid:** Use LITERAL hex / size / family values in batch_design calls; document the binding in PEN-INVENTORY Variant Evidence rows per OPEN-23-13 dual-track convention. Tokens are still the source of truth (they exist in `get_variables({})` and resolve correctly when consumed via Pencil UI or downstream code-milestone CSS export).
**Warning signs:** Inserted nodes render with wrong colors or default font; resolve by checking literal hex matches the resolved value of the intended semantic token in RpGbe.

### Pitfall 3: `snapshot_layout` Text-Clipping False-Positives (Pitfall 6 carry-forward)

**What goes wrong:** `snapshot_layout({ problemsOnly: true })` reports text-clipping warnings on multi-line text inside auto-layout frames, but the rendering is actually correct.
**Why it happens:** Pencil 2.13 layout solver flags text-overflow conservatively; auto-layout frames typically resolve at render time. Phase 24-29 precedent: documented as benign, no mitigation applied.
**How to avoid:** Plan 30-01 likely exceeds prior counts due to ~58-instance density (especially Components section). Document false-positives in Plan 30-01 SUMMARY per phase precedent. Do NOT add mitigation.
**Warning signs:** Snapshot output lists text nodes inside ComponentShowcase tiles; verify with inline `get_screenshot` (or Tier-2 editor view) — if text actually renders, it's the false-positive pattern.

### Pitfall 4: PAGE-11 INERT for joel-only Branch (§ 4.3)

**What goes wrong:** Confusion about whether to hide a raster after APPROVE. The joel-only-no-crito-ref branch has no Crito source raster — PAGE-11 INERT.
**Why it happens:** PAGE-11 is the cleanest single-line rule of CALIBRATION-PROTOCOL. ACTIVE on crito-source branch; INERT on joel-only branch. Phase 30 is the FIFTH joel-only-no-crito-ref consumer (after Plan 26-01 FAQ + Plan 26-02 404 + Plan 27-01 Thank-you + Plan 28-03 Tag).
**How to avoid:** Plan 30-01 closes with NO raster hide step. PEN-INVENTORY reclassification updates `(joel-only: Design System)` row to `Design system` with `status_counts: factored:N` (no `hidden:1` flip).
**Warning signs:** None — the rule is explicit. Document PAGE-11 INERT in the reclassified row per D-154.

### Pitfall 5: Premature Component Variant Addition (Pitfall 7 + D-147 curation)

**What goes wrong:** Reconstructor sees "the gallery should be exhaustive" and ships every Button purpose × size × state combination (~48 cells).
**Why it happens:** Storybook conventions imply gallery completeness; v1.3 design-system.astro shows multiple Button variants per the v1.3 surface.
**How to avoid:** D-147 + D-148 are explicit — curate 1-2 variants per component, NOT exhaustive matrix. Variant matrices ALREADY exist at the primitive level for downstream agents to discover via `batch_get`. Gallery purpose is visual reference + canonical-usage demonstration, NOT exhaustive enumeration.
**Warning signs:** Plan-execution proposes adding new Button purposes or new Badge variants — STOP. Phase 30 INSTANCES the library, doesn't extend it. Phase 24 D-22 forward-state-only caution + Hybrid library minimalism apply.

### Pitfall 6: Active Editor Mismatch (OPEN-23-14)

**What goes wrong:** Pencil VS Code extension silently switches the active editor when VS Code focus changes. `set_variables` or `batch_design` calls land in the WRONG `.pen` file.
**Why it happens:** Pencil 2.13 active-editor coupling to VS Code focus. Reproduced in Plan 23-05 mid-phase.
**How to avoid:** D-153 pre-flight `mcp__pencil__get_editor_state({ include_schema: false })` and assert active editor path == `design/Crito.pen`. Halt and surface to user on mismatch. NO EXCEPTIONS — Phase 23 OPEN-23-14 → 24 D-35 → 25 D-54 → 26 D-87 → 27 D-103 → 28 D-125 → 29 D-140 → 30 D-153.
**Warning signs:** None — the pre-flight is the warning sign. Run it before EVERY mutating call.

### Pitfall 7: Treating Sibling Pencil Notes as Optional (D-52 + D-93 + D-149)

**What goes wrong:** Plan-execution ships typed-slot props on the 3 new section components and skips sibling notes because "the schema documents it."
**Why it happens:** Pencil 2.13 typed-slot is suggestion-only (D-52 confirmed via Plan 25-03 schema check). Without sibling notes, slot signatures + structural intent are lost when downstream agents read the file.
**How to avoid:** D-149 mandates a sibling Pencil note for each of the 3 new sections declaring slot signature in human-readable form. D-143 mandates 2 sibling notes on page-intro section (noindex + JSON endpoint). D-144 mandates sibling notes on each H2 frame (v1.3 section anchor IDs). D-144 Utilities section mandates sibling CSS notes for each utility sub-section (the actual CSS mechanic).
**Warning signs:** Plan-execution claims "sibling notes redundant" — STOP. Belt-and-suspenders per D-93 is the convention; both layers ship.

### Pitfall O5/O6 Intentional Departure (D-149)

**What goes wrong (if not understood):** Plan-execution either (a) refuses to factor the 3 new sections (cites narrow-scoping precedent), OR (b) treats D-149 as broad license to factor more sections speculatively.
**Why it happens:** Phase 26 D-79 + Phase 28 D-116 + Phase 29 D-134 established narrow-scoping as v2.0's discipline (single-consumer → don't factor). D-149 INTENTIONALLY DEPARTS for this phase only.
**How to avoid:** Read D-149 verbatim: the departure is bounded. (a) In-phase repetition density (~58 instances) justifies; (b) future v3 design-system milestone plausibility argued; (c) factoring is at the SECTION-pattern level, not at the primitive/compound level. Narrow-scoping STILL applies at the primitive/compound layer — Phase 30 doesn't invent new primitives. Sibling-note belt-and-suspenders per D-93 enforces honesty.
**Warning signs:** Proposals for "another section component while we're here" without concrete in-phase repetition density evidence — STOP. The departure is specific to 3 patterns with concrete justification.

## Code Examples

Verified patterns from official sources + CALIBRATION-PROTOCOL.md + prior plan precedent.

### Pre-Flight Active-Editor Assertion (D-153)
```js
// Source: CALIBRATION-PROTOCOL.md § 8 + D-153 carry-forward chain
// MUST run before EVERY mutating call in Plan 30-00 and 30-01.
const state = await mcp__pencil__get_editor_state({ include_schema: false });
if (state.activeEditorFile !== "design/Crito.pen") {
  throw new Error(`Active editor is ${state.activeEditorFile}; expected design/Crito.pen. HALT and notify user.`);
}
```

### Section/TokenSwatchGrid Component Build (Plan 30-00 Task 1, slot signature per D-149)
```js
// Source: D-149 slot signature + Phase 25 D-52 typed-slot suggestion-only pattern
// Lives in: _Components / Sections (g9oRa5)
batch_design({ operations: `
  tokenSwatchGrid = I("g9oRa5", {
    type: "frame",
    name: "Section / TokenSwatchGrid",
    layout: "vertical",
    gap: 24,  // space-semantic-stack-md literal per OPEN-23-13
    padding: [32, 0],
    width: 1200,
    height: "fit_content",
    fill: "transparent",
    reusable: true
  });

  // heading-slot child
  headingSlot = I(tokenSwatchGrid, {
    type: "text",
    name: "heading-slot",
    text: "Color tokens",  // placeholder; consumer overrides
    fontFamily: "Plus Jakarta Sans",
    fontSize: 24,  // type-semantic-heading-3-size literal
    fontWeight: "700",
    fill: "#141f39ff",  // color-semantic-text-primary literal
    enabled: true
  });

  // grid-of-swatch-tiles container (auto-layout horizontal-wrap)
  gridContainer = I(tokenSwatchGrid, {
    type: "frame",
    name: "grid-container",
    layout: "horizontal",
    layoutWrap: "wrap",  // Pencil 2.13 auto-layout horizontal-wrap
    gap: 16,  // space-semantic-inline-md literal
    width: 1200,
    height: "fit_content",
    fill: "transparent"
  });

  // Default tile (consumers replace at instance time)
  defaultTile = I(gridContainer, {
    type: "frame",
    name: "swatch-tile-default",
    layout: "vertical",
    gap: 8,
    padding: 12,
    width: 200,
    height: "fit_content",
    fill: "#ffffffff"
  });

  swatchRect = I(defaultTile, {
    type: "rectangle",
    name: "swatch",
    fill: "#fdba09ff",  // placeholder color; consumer overrides
    width: 176,
    height: 80,
    cornerRadius: 4  // radius-semantic-sm literal
  });

  tokenName = I(defaultTile, {
    type: "text",
    name: "token-name",
    text: "color-semantic-bg-accent",  // placeholder
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "500",
    fill: "#141f39ff"
  });

  resolvedValue = I(defaultTile, {
    type: "text",
    name: "resolved-value",
    text: "#fdba09",  // placeholder
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "400",
    fill: "#52525bff"
  });
` });

// Sibling Pencil note per D-149 belt-and-suspenders (D-52 + D-93)
batch_design({ operations: `
  I(document, {
    type: "note",
    name: "Section/TokenSwatchGrid slot signature",
    text: "Slot signature: heading-slot (text) + grid-of-swatch-tiles (auto-layout horizontal-wrap frame). Each tile is a child frame with swatch (color-fill rectangle) + token-name (label) + resolved-value (caption). Consumer overrides tile contents via descendants. Default tile is the consumer-replaceable template."
  });
` });
```

### find_empty_space_on_canvas with nodeId Anchor (Plan 30-01 Task 1)
```js
// Source: CALIBRATION-PROTOCOL § 10.4 + Plan 26-02 contribution + Phase 27/28/29 inherited
// Anchors placement on Phase 29 Project frame s5k41l (canvas (7547.27, −4111.55))
batch_design({ operations: `
  pos = FindEmptySpace({
    width: 1440,
    height: 2400,
    direction: "right",
    padding: 80,
    nodeId: "s5k41l"  // Phase 29 Project frame
  });
  designSystemPageFrame = I(document, {
    type: "frame",
    name: "Design system",
    x: pos.x,
    y: pos.y,
    width: 1440,
    height: 2400,
    layout: "vertical",
    gap: 0,
    padding: 0,
    alignItems: "center",
    fill: "#ffffffff",  // color-semantic-bg-page literal per OPEN-23-13
    placeholder: true  // cleared at Task 9 fit_content settle
  });
` });
```

### ComponentShowcase Instance with Code Snippet (Plan 30-01 Task 6)
```js
// Source: D-150 code-snippet-slot using Phase 28 tokens; D-105 mono-primitive + prose-code-block
// Consumer-supplied snippet styled with type-semantic-mono-primitive + type-semantic-prose-code-block
batch_design({ operations: `
  buttonDefaultShowcase = I("<componentsSection>", {
    type: "ref",
    ref: "<componentShowcaseLibraryId>",  // Plan 30-00 ComponentShowcase
    name: "Button/Default ComponentShowcase",
    descendants: {
      "<labelSlotId>": {
        text: "Primitive / Button / Default"
      },
      "<liveInstanceSlotId>": {
        // Live instance — Button/Default ref M7eUr
      },
      "<codeSnippetSlotId>": {
        text: '<Button variant="yellow">Click</Button>',  // Canonical default-variant snippet per D-150
        enabled: true
      }
    }
  });

  // The live instance child is wired separately at path componentShowcase/liveInstanceSlotId
  liveInstance = I("<buttonDefaultShowcaseId>/<liveInstanceSlotId>", {
    type: "ref",
    ref: "M7eUr",  // Phase 24 Button/Default
    name: "Button/Default live instance"
  });
` });
```

### Plan 30-01 fit_content Settle + Snapshot (Task 9)
```js
// Source: Plan 26-02 Task 4 + Phase 27/28/29 inherited
batch_design({ operations: `
  U("<designSystemPageFrameId>", {
    placeholder: false,
    height: "fit_content"
  });
` });
snapshot_layout({ rootId: "<designSystemPageFrameId>", problemsOnly: true });
// Document text-clipping false-positives per Pitfall 3 carry-forward
```

### PEN-INVENTORY In-Place Reclassification of Placeholder Row (D-154 + D-128 carry-forward)
```markdown
<!-- BEFORE (PEN-INVENTORY line 77): -->
| (joel-only: Design System) | n/a (no Crito source) | joel-only-no-crito-ref | /design-system page (per D-08) | 0 | flat:0, partial:0, factored:0 | medium (Phase 30) | — |

<!-- AFTER (Plan 30-01 close, post-APPROVE): -->
| **Design system** | **<frameId>** | **joel-only-no-crito-ref** | **/design-system (per Plan 30-01)** | **7** | **flat:0, partial:0, factored:7** | **n/a (Phase 30 plan 30-01 — reconstructed; FIFTH joel-only-no-crito-ref branch use in v2.0; PAGE-11 INERT per § 4.3; first Phase 30 cross-page consistency proof for Header + Footer per ROADMAP success criterion 3)** | **OPEN-30-NN (Utilities iso-glow/iso-rotate STUB labeling + any plan-surfaced flags)** |
```

## State of the Art

| Old Approach (v1.3 / earlier v2.0) | Current Approach (Phase 30) | When Changed | Impact |
|---|---|---|---|
| v1.3 sticky sidebar nav (`lg:grid-cols-[250px_1fr]` DesignSystemNav) | Linear long-scroll, NO sidebar (D-145) | Phase 30 D-145 | Sticky positioning doesn't render in Pencil; Pitfall O5/O6 single-consumer rule applies at sidebar layer. Sibling note documents v1.3 surface for code milestone. |
| v1.3 5-component subset (Button + Card + Input + Badge + CheckboxGroup) | Full v2.0 library: 4 primitives + 4 compounds + 8 sections (D-148) | Phase 30 D-148 | Phase 30 IS the v2.0 library reference. Honest about everything Phases 23-29 shipped. v1.3 is a subset. |
| v1.3 dual light/dark TokenSwatch rendering | Light-mode only (TOKEN-07 + D-01 carry-forward) | Phase 23 D-01 → Phase 30 inherits | Sibling note on Colors section documents v1.3 dual-mode for future dark-mode milestone. |
| Inline composition for showcase tiles (Phase 26/28/29 narrow-scoping) | Factored Section/TokenSwatchGrid + TypeSpecimen + ComponentShowcase (D-149) | Phase 30 D-149 | Intentional departure for in-phase repetition density (~58 instances). Library count 16 → 19. Bounded at SECTION layer only; primitive/compound layer still narrow-scoped. |
| Joel-brand visual chrome (yellow neobrutalist, Bricolage Grotesque, turquoise H2 left-border) | Crito-vocab utilitarian-docs register (D-58 + D-142) | Phase 26 D-58 → Phase 30 D-142 inverts marketing polish | Phase 30 strips agency polish further than Phase 26-29 (no hero band, no decorative bg, no Section/CTA close). Internal-docs honesty. |
| Marketing-page polish (Phase 28 Blog + Phase 29 Projects) | Utilitarian internal-docs (D-142) | Phase 30 D-142 | Inverse of Phase 28-29 lean. Phase 30 IS a Phase-30-specific call; doesn't propagate to Phase 31 Homepage (which IS marketing polish). |

**Deprecated/outdated:**
- v1.3 `border-l-4 border-turquoise` H2 treatment — NOT inherited (Crito-vocab register per D-58 + D-142).
- v1.3 yellow neobrutalist Card border + 6px hard shadow + Bricolage Grotesque — deferred to code milestone per PROJECT.md.
- `export_nodes` for archival PNG — broken in Pencil 2.13 (OPEN-23-01); `id-inventory.json` structural substitution stands.
- `search_all_unique_properties` — does NOT exist in current Pencil MCP build (OPEN-23-02); manual `batch_get` enumeration substitutes.

## Validation Architecture

Phase 30 is `.pen`-file-only — NO src/ code changes, NO tests in the traditional sense. The Nyquist validation dimensions adapt to v2.0 milestone realities.

### Dimension 1 — Correctness (structural Pencil MCP verification)

- **Plan 30-00 close:** `mcp__pencil__batch_get({ nodeIds: [<TokenSwatchGrid>, <TypeSpecimen>, <ComponentShowcase>] })` confirms 3 new component frames live in g9oRa5; slot signatures present; sibling notes present.
- **Plan 30-01 close:** `mcp__pencil__batch_get({ nodeIds: [<designSystemPageFrame>, <Header instance>, <page-intro>, <Colors>, <Typography>, <Components>, <Utilities>, <Footer instance>] })` confirms 7 child sections + 1 page frame structurally correct.
- **Token surface drift:** `mcp__pencil__get_variables({})` at every plan open + close. Phase 30 expects 127 tokens at Plan 30-00 open (post-Phase 28 surface); Plan 30-00 close ships 127-129 depending on mid-plan token escalation per D-151 (default 127, no new tokens). Plan 30-01 close ships same count (no token additions in page-frame composition plan).
- **Layout problems:** `mcp__pencil__snapshot_layout({ maxDepth: 0, problemsOnly: true })` at document root returns `"No layout problems."` at every plan close; per-frame text-clipping false-positives per Pitfall 3 documented per phase precedent.

### Dimension 2 — Visual Fidelity (user spot-check at calibration gate)

- **Plan 30-01 only** — single AskUserQuestion at plan close per § 4.5 joel-only branch format.
- **Description structure** per § 4.5: per-section fidelity label proposals (likely EXACT for token galleries + Components + chassis; APPROXIMATE for Utilities iso-shadow + page-intro; STUB for Utilities iso-glow + iso-rotate) + semantic tokens consumed list + calibration target reference (RpGbe).
- **Tier-2 fallback ready** per § 6.4 — pre-commit to user-side editor verification at canvas (<x>, −4111.55) if `get_screenshot` stale-cache triggers.

### Dimension 3 — Regression (baseline ID verification)

- **Plan 30-00 close:** `batch_get` on Phase 23-29 component IDs (RpGbe, avgor, t67DU6, g9oRa5, M7eUr, hIWuC, nwJk7, j0FxQZ, kJQmJ, u7NmaS, G0wNOc, Xs0Hs, Hs5rc, N1jo3i, O1IwyS, t40xct, ZSxZU, DnsRs, y4RORu, OLSa0) — assert direct-child ID sets unchanged. NEW frames TokenSwatchGrid + TypeSpecimen + ComponentShowcase are the only additions.
- **Plan 30-01 close:** `batch_get` on Phase 23-29 page frames (b7Hgy, csXky, XsDab, n0QqTd, EDAf1, aQ8FL, FUctJ, SCcln, s5k41l, cl8tt, w1m3x, DzqTm, cYlRH, Y2isa, ujMLJ, etc.) — assert pre-existing frames not mutated. NEW page frame `Design system` is the only addition.
- **Crito-source remainder:** 04_About (WDGxc) IN-SCOPE token-mining-only remains a flat-raster long-tail row — out of scope for Phase 30 (Phase 32 records final disposition).

### Dimension 8 — Edge Cases

- **Stale-cache `get_screenshot`:** § 6.4 Tier-1 + Tier-2 workarounds pre-committed (HIGH likelihood on ~58-instance page frame per Phase 26-29 precedent).
- **Text-clipping false-positives:** Pitfall 3 carry-forward; documented per phase precedent (Plan 30-01 likely exceeds prior counts due to ~58 instances).
- **`batch_design` `$<token>` ref silent rejection:** Pitfall 2 / OPEN-23-13 — literal hex / size / family values used; Variant Evidence rows per OPEN-23-13 dual-track convention.
- **Active editor switch mid-plan:** D-153 pre-flight catches; halt + notify user.
- **Pencil 2.13 typed-slot suggestion-only:** D-52 carry-forward — sibling notes ship regardless (D-149 belt-and-suspenders).

### What's NOT in scope (Dimensions 4-7 absent)

- **Dimension 4 (perf), 5 (security), 6 (accessibility), 7 (scaling):** ABSENT — Phase 30 ships zero code. v1.3 design-system.astro route continues to render on v1.3 throughout v2.0. Performance, security, accessibility (WCAG), and scaling concerns are code-milestone deliverables. Sibling Pencil notes preserve the noindex robots meta + JSON endpoint intent for code-milestone wiring.

## Open Questions

Things that couldn't be fully resolved at research time.

### Question 1: RpGbe sub-grouping structure for token-gallery alignment

**What we know:** Phase 23 Plan 23-05 built RpGbe with 6 child sections: Header, 1. Colors (12 primitive + 14 semantic swatches), 2. Typography (7 specimens — display, heading-1, body, body-sm, caption, button, prose-paragraph), 3. Spacing Scale (8 primitive stripes + 10-row semantic mapping), 4. Radius (3 primitive boxes + 4-row semantic mapping), 5. Dark Mode — Deferred. Phase 24-29 may have augmented (heading-2 + heading-3 + heading-4 + prose tokens added in Phase 26 + 28). Phase 30 token-gallery sections expect Colors / Typography / Spacing / Radii sub-groupings — likely mirror RpGbe.
**What's unclear:** Whether RpGbe has been updated to reflect Phases 24-29 token additions (heading-2-* / heading-3-* / heading-4-* / mono-primitive / prose-link / prose-list / prose-inline-code / prose-code-block). If RpGbe was NOT updated, the token gallery still mirrors the canonical token surface from `get_variables({})`, with sibling note documenting that RpGbe is partial.
**Recommendation:** Plan 30-01 Task 0 probes RpGbe structure via `batch_get({ nodeIds: ["RpGbe"], readDepth: 3 })`. If sub-grouping is well-structured + complete, mirror it in the token-gallery sections (Colors → Primary/Text/Neutral/Usage; Typography → Family/Scale/Weight/LH; Spacing; Radii). If RpGbe is partial or unclear, plan-execution makes a judgment call based on v1.3 sub-groupings (already documented in D-144 + 30-CONTEXT.md `<code_context>` section).

### Question 2: Plan structure — single 30-01 vs split 30-01 + 30-02

**What we know:** D-151 defaults to 2 plans (30-00 + 30-01); plan-execution discretion to split 30-01 IF scope-vs-attention warrants. Phase 30 page-frame contains ~58 visual artifacts. Phase 26-29 all completed within single per-page plans even at 4-7 sections per frame; Phase 30 has 5 sections but Components section alone contains ~16 ComponentShowcase instances.
**What's unclear:** Whether the calibration AskUserQuestion description gets unwieldy at ~58 instances, AND whether stale-cache `get_screenshot` Tier-2 fallback at this density makes Tier-1 attempts costly enough to justify a split.
**Recommendation:** Default to single Plan 30-01 per Phase 26-29 precedent; flag the split discretion in Plan 30-01 SUMMARY. If plan-execution finds the calibration description structure exceeds 2 pages of description text OR if Tier-1 cross-row Update fails for 3+ subtrees, split into:
- Plan 30-01: chassis + Header + page-intro + Colors + Typography (token-gallery surface)
- Plan 30-02: Components + Utilities + Footer + calibration (component-gallery surface)

### Question 3: Utilities section approximation depth — APPROXIMATE vs STUB per utility

**What we know:** D-144 calls for visual approximation where possible. `src/styles/global.css` lines 146-158 (iso-rotate uses CSS 3D `rotateX(45deg) rotateZ(45deg)` — no clean Pencil rendering). Lines 193-218 (iso-shadow uses `box-shadow: 5px 5px 0 currentColor` light mode + dark-mode glow override — offset-shape approximation viable). Lines 221-231 (iso-glow uses `box-shadow: 0 0 20px color-mix(...)` — no clean Pencil filter rendering).
**What's unclear:** Whether iso-shadow visual approximation reads cleanly enough at calibration gate to ship as APPROXIMATE (vs STUB). The offset-filled-shape approximation behind a Card placeholder may look misleading if the offset color doesn't match the runtime `currentColor` semantics.
**Recommendation:** Plan 30-01 Task 7 ships iso-shadow as APPROXIMATE (offset filled rectangle behind a small bordered card placeholder, using `color-semantic-shadow-default` or `color-primitive-neutral-700` for the offset rectangle). Calibration gate validates; if user rejects approximation as misleading, re-label to STUB with sibling CSS note (same CSS note ships regardless per D-144). iso-glow + iso-rotate ship as STUB by default (CSS-only mechanics that Pencil cannot represent faithfully).

### Question 4: TokenSwatchGrid tile internal layout — vertical vs horizontal

**What we know:** Each tile contains swatch + token-name + resolved-value. CONTEXT Claude's Discretion default: auto-layout vertical frame (swatch → token-name → resolved-value), tile width ~200-240px, grid auto-layout horizontal-wrap.
**What's unclear:** Whether ~200px tile width gives ~6 tiles per row at 1200px content-width, and whether that density reads as a coherent grid vs as scattered tiles.
**Recommendation:** Default to vertical tile + ~200px width per CONTEXT Claude's Discretion. Plan-execution may pivot to ~240px width (5 tiles per row at 1200px) based on visual density at preview. The TokenSwatchGrid component itself ships with the default tile as the consumer-replaceable template; tile width is a per-grid-instance override (page-frame Colors section instances override per sub-grouping).

### Question 5: `type-semantic-prose-code-block` SECONDARY validation surface — provisional flag verification chain

**What we know:** Plan 28-02 Blog Post body was the PRIMARY validation surface for `type-semantic-prose-code-block`. Per Phase 28 D-110 + Phase 29 D-141 carry-forward, the 'provisional' flag verification is a chain: Plan 28-02 PRIMARY → Plan 29-02 SECONDARY (for prose-paragraph) → Plan 30-01 SECONDARY (for prose-code-block per D-150). If Plan 28-02 + Plan 30-01 both APPROVE without GAP, the flag clears at Phase 32 close.
**What's unclear:** Whether the ComponentShowcase context (small code snippet in a tile) renders cleanly vs the Blog Post body context (multi-line prose code block). Different visual rendering surfaces may surface different concerns.
**Recommendation:** Plan 30-01 calibration gate description explicitly calls out the `type-semantic-prose-code-block` SECONDARY validation. If visual rendering in the ComponentShowcase context surfaces concerns, raise OPEN-30-NN with rendering evidence; otherwise the chain advances toward Phase 32 close.

## Sources

### Primary (HIGH confidence)
- **30-CONTEXT.md** — Phase 30 LOCKED decisions D-142 through D-154 (read in full); user-resolved decisions from `/gsd:discuss-phase`
- **REQUIREMENTS.md** — PAGE-07 (Phase 30 ownership), PAGE-09 desktop-only, PAGE-11 INERT for joel-only, VALID-01 fidelity labels, VALID-02 calibration artifact branch-redefined, VALID-03 gap declaration
- **ROADMAP.md** § Phase 30 — Goal + Success Criteria (especially criterion 3: cross-page consistency proof for Header + Footer)
- **CALIBRATION-PROTOCOL.md** — § 2 branch decision tree, § 4 joel-only branch protocol, § 4.4 per-step script, § 4.5 AskUserQuestion format, § 4.6 description identifiers, § 6.4 OPEN-26-02 Tier-1/Tier-2 workaround, § 10.4 FindEmptySpace nodeId anchor, § 10.5 PAGE-11 INERT
- **PEN-INVENTORY.md** — line 77 placeholder row to reclassify; line 83 `s5k41l` Project frame anchor confirmation; Phase 23-29 component IDs (M7eUr / hIWuC / nwJk7 / j0FxQZ / kJQmJ / u7NmaS / G0wNOc / Xs0Hs / Hs5rc / N1jo3i / O1IwyS / t40xct / ZSxZU / DnsRs / y4RORu / OLSa0 / RpGbe / avgor / t67DU6 / g9oRa5); Open Flags through Phase 29; OPEN-23-13 batch_design value-ref limitation; OPEN-23-14 active-editor switch; OPEN-26-02 stale-cache quirk
- **29-CONTEXT.md** — D-127..D-141 direct predecessor decisions; D-128 in-place reclassification pattern (Y2isa + cYlRH precedent for D-154); D-140 pre-flight active-editor (D-153 carry-forward); D-141 PEN-INVENTORY extension pattern (D-154 carry-forward)
- **28-CONTEXT.md** — D-105 prose tokens (D-150 code-snippet consumer); D-108 mono-primitive + prose-code-block (D-150 styling); D-110 provisional-flag verification chain (Plan 30-01 SECONDARY)
- **27-CONTEXT.md** — D-93 sibling-note belt-and-suspenders convention (D-143 + D-149 inherit); D-98 v1.3 verbatim content extraction (D-143 inherits)
- **26-CONTEXT.md** — D-58 fresh-design-in-Crito-vocab (D-142 modifies); D-62 joel-only branch token-usage calibration (Plan 30-01 inherits); D-77 Joel-brand Header override deferral (D-148 + chassis inherit); D-79 narrow-scoping precedent (D-149 INTENTIONALLY DEPARTS); D-82 v1.3 content verbatim (D-143 inherits); D-83 per-section fidelity labels (D-144 + D-148 inherit); D-86 foundation no-gate (D-152 carry-forward)
- **25-CONTEXT.md** — D-49 single-Card-via-slots (Phase 28 + 29 sibling-pattern shipped; D-148 gallery shows all 3 separately); D-52 Pencil 2.13 typed-slot suggestion-only (D-149 sibling notes inherit); D-53 enabled:true placeholder slots (D-150 ComponentShowcase code-snippet-slot inherits)
- **24-CONTEXT.md** — D-22 forward-state-only (Pitfall 5 inherited); D-29 Icon 4 size variants (D-148 sizes-are-canonical-taxonomy); D-33 open token-extension policy (D-151 mid-plan gate inherits)
- **23-CONTEXT.md** — D-12 flat-dash naming; D-14 components-reference-semantic-only; D-18 PEN-INVENTORY plain-markdown discipline (D-154 inherits)
- **`src/pages/design-system.astro`** (1202 LOC) — v1.3 content extraction: line 14-15 noindex framing; lines 32-46 page-intro (H1 + body + JSON link); lines 50-181 Colors section (Primary Accent / Text Variants / Neutral / Usage Guidelines); lines 183-376 Typography (Font Families / Type Scale / Font Weights / Line Heights); lines 378-917 Components (Button / Card / Input / Badge / CheckboxGroup — v1.3 subset of D-148 superset); lines 919-1200 Utilities (iso-shadow / iso-glow / iso-rotate)
- **`src/styles/global.css`** lines 140-231 — actual CSS mechanics: iso-rotate `rotateX/rotateZ` transforms; iso-shadow `box-shadow Npx Npx 0 currentColor`; iso-glow `box-shadow 0 0 Npx color-mix(...)` filter
- **SUMMARY.md** — Themes T1 (variables-first), T5 (don't repeat v1.4 — calibration gates enforce), T6 (single-file strategy), T8 (component variants on-demand — D-149 INTENTIONALLY DEPARTS)
- **PITFALLS.md** — Pitfall 1 (no inventing primitives — D-149 acknowledged tension at SECTION layer); Pitfall 4 (PAGE-11 NEVER hide before APPROVE — INERT for joel-only); Pitfall 6 (snapshot_layout text-clipping false-positive); Pitfall 7 (no premature variants — D-147 curated 1-2 variants); O5/O6 (single-consumer anti-pattern — D-149 INTENTIONALLY DEPARTS with documented rationale)
- **STACK.md** — Pencil MCP tool catalogue; `find_empty_space_on_canvas` nodeId anchor; `get_screenshot` inline-only (OPEN-23-01 substitution); `batch_design` Insert/Update/Copy shorthand; `set_variables` rare use in Plan 30-00 IF mid-plan gate

### Secondary (MEDIUM confidence)
- 30-DISCUSSION-LOG.md — User decisions from `/gsd:discuss-phase` (referenced via 30-CONTEXT.md decisions; not separately consulted for research scope per CONTEXT-LOCK guardrail)
- Phase 24-29 SUMMARY files (when published) — Plan execution patterns; structural details for Header/Footer (G0wNOc/Xs0Hs); calibration script patterns for joel-only branch

### Tertiary (LOW confidence, flagged for validation)
- Specific Pencil 2.13 auto-layout horizontal-wrap behavior at ~30 tile density — UNTESTED at this scale in `design/Crito.pen`; Plan 30-01 instance density (TokenSwatchGrid Colors section) is the first stress test. If wrap behavior misbehaves, raise OPEN-30-NN.
- ~58-instance page-frame stale-cache quirk severity — production precedent suggests likely Tier-2 fallback at Plan 30-01 calibration; severity at this density UNVERIFIED. Plan 30-01 SUMMARY documents actual behavior.

## Metadata

**Confidence breakdown:**
- Standard stack (Pencil MCP tools, IDs, scope-branch): HIGH — direct citation from CONTEXT + CALIBRATION-PROTOCOL + PEN-INVENTORY + prior 24-29 plans
- Architecture (page-frame layout, plan structure, anchor pattern): HIGH — Phase 26-29 precedent established; D-145..D-148 + D-151 LOCKED
- Don't-hand-roll items (16 existing components + 3 new sections): HIGH — D-147 + D-148 + D-149 LOCKED with explicit ID citations
- Pitfalls (stale-cache, batch_design ref limitation, active editor, false positives): HIGH — production precedent across Phase 23-29; explicit OPEN flag references
- v1.3 content extraction (page-intro / Colors / Typography / Components / Utilities structure): HIGH — direct file read of `src/pages/design-system.astro`
- Utility CSS mechanics (iso-shadow / iso-glow / iso-rotate): HIGH — direct file read of `src/styles/global.css`
- RpGbe sub-grouping completeness (current state after Phases 24-29 token additions): MEDIUM — Plan 23-05 verification confirms 6 child sections at Phase 23 close; Phase 24-29 may have augmented but not verified at research time. Plan 30-01 Task 0 probe resolves.
- Plan structure decision (single 30-01 vs split): MEDIUM — Phase 26-29 single-plan precedent at lower instance density; Phase 30 instance density (~58) untested. Plan-execution discretion preserved per D-151.
- Pencil 2.13 horizontal-wrap behavior at ~30 tile density: MEDIUM — schema supports layoutWrap; untested at this scale.
- Stale-cache severity on ~58-instance page-frame: LOW (HIGH-likelihood prediction based on Phase 26-29 precedent; actual severity UNVERIFIED).
- Provisional-flag prose-code-block validation outcome at ComponentShowcase context: LOW — different rendering surface than Plan 28-02 Blog Post body PRIMARY; outcome depends on calibration gate.

**Research date:** 2026-06-09
**Valid until:** ~2026-07-09 (stable workflow; CALIBRATION-PROTOCOL stable since Phase 26; Pencil 2.13 schema stable across v2.0). Re-validate if Pencil schema updates OR if Phase 31 Homepage planning reveals carry-forward decisions that should propagate retroactively.

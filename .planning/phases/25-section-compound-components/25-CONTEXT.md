# Phase 25: Section + Compound Components - Context

**Gathered:** 2026-06-01
**Status:** Ready for planning

<domain>
## Phase Boundary

The `design/Crito.pen` library now carries the shared section components — `Section / Header` (logo + nav + dual CTA) and `Section / Footer` (link columns + social + copyright) — plus `Compound / Card`, a single slots-based component serving Project / Blog / Service card use cases via slot content (per COMP-07). Each component sits inside its `_Components / { Sections, Compounds }` parent (Phase 24's D-37 stubs), composes Phase 24 primitives, and references semantic tokens only. Section components instance `Primitive / Button` (Default + a NEW Secondary variant added this phase per OPEN-24-11 resolution) and `Primitive / Icon` (lucide-native glyphs + a Pattern-B atomic fallback for Substack). `Compound / Card` declares its slot signature via Pencil-native slot props with sibling documentation; slots default-populated for visual library discoverability.

**Out of scope (already decided):**
- Per-page reconstruction (Phases 26–31) — Phase 25 builds the components, not the pages that instance them
- Mobile breakpoint (PAGE-09 — desktop only for v2.0)
- Dark mode (TOKEN-07 + Phase 23 D-01)
- Joel-brand glyph swap on inside-page Footer instances (those overrides happen at Phase 31 Homepage instance time; brand-glyph atomic primitives DO ship in Phase 25)
- Token sync to code / CSS (next milestone)

</domain>

<decisions>
## Implementation Decisions

### Header Content & Affordances (Plan 25-01)
- **D-38:** **Crito-source nav labels (fixed text).** Plan 25-01 reads Home Page Menu bar `ujMLJ` via `batch_get`, enumerates the literal nav-link labels, and ships them as fixed Pencil text nodes inside `Section / Header`. Strict D-24 source-wins discipline. Joel's v1.3 4-link override (Blog / Projects / FAQ / Contact) happens at Phase 31 Homepage instance time via consumer-side text override — NOT at the component level.
- **D-39:** **Ship all three Crito Menu-bar affordances (strict source-wins).** Section/Header instances Primitive/Icon for each of: `search` (lucide-native, shipped Phase 24), `chevron-down` (lucide-native, shipped Phase 24), and the hamburger `menu` icon (lucide-native, shipped Phase 24). PAGE-09 desktop-only does NOT remove the hamburger — it's a visual-fidelity component artifact, not a behavioral one. Phase 31 (or later code milestone) decides whether to hide it via consumer-side override or behavior.
- **D-40:** **Logo is a slot (consumer fills).** Section/Header exposes a logo-shaped Pencil-native slot. Consumers populate the logo at instance time (Crito-source 'Crito' logo at Phase 31 Homepage, or future Joel-brand wordmark in a later milestone). Establishes the slot-mechanics pattern that Section/Footer link-columns and Compound/Card will reuse. Requires Plan 25-01 to verify slot-empty-state behavior before downstream-Card uses it (carries forward OPEN-24-06 verification by actual use).
- **D-41:** **Fixed-width matching Crito source.** Section/Header is a fixed-width frame matching Crito Home Page Menu bar's actual width (read via Plan 25-01 `batch_get` — likely 1440 or whatever `ujMLJ` depicts). Not `fill_container` with internal max-width content frame. Easiest to audit against source; matches per-page-frame instance pattern. Page-reconstruction phases (26+) instance Header inside same-width page frames.

### Header CTA Variant Choice (Plan 25-01)
- **D-42:** **Two CTAs ship in Section/Header (Default green + Secondary outline) — resolves OPEN-24-11 this phase.** Plan 25-01 first task adds a Secondary purpose variant to `Primitive / Button` derived from Crito Hero source `mkw8g` ("Discover More" — fill: none, stroke: white, strokeWidth: 0.5, strokeAlignment: inner, same padding+radius+layout as primary CTA). Section/Header then instances both: Default green for primary action + Secondary outline for the supporting action. Matches Crito's actual Menu-bar / Hero CTA pairing pattern.
- **D-43:** **Secondary lives as a new variant cell INSIDE existing `Primitive / Button` (preferred path).** Plan 25-01 adds a `purpose` variant axis (or augments an existing axis) to keep all Button variants discoverable in Pencil's variant picker under one component. Adds a new row to PEN-INVENTORY's Variant Evidence (Phase 24) table marked as `Phase-25-late-addition (resolves OPEN-24-11)` with source citation `mkw8g`. **Fallback:** if Plan 25-01 probe finds adding a `purpose` axis requires restructuring Default's existing variant cells in a way that breaks Default's already-shipped Hover/Focus states, ship Secondary as a sibling primitive component `Primitive / Button / Secondary` instead. Either path resolves OPEN-24-11.
- **D-44:** **Both Header CTAs use the trailing `arrow-right` icon slot (resolves OPEN-24-06 by ACTUAL use).** First real exercise of `Primitive / Button`'s `iconTrailing` slot — wires in `lucide:arrow-right` (already shipped Phase 24) for both Default and Secondary CTAs. The wire-up itself validates the empty-slot-collapse mechanic for label-only consumers vs icon-bearing consumers. Plan 25-01 captures the result in 25-01-SUMMARY.md and updates OPEN-24-06's resolution status.

### Footer Brand Glyph Strategy (Plan 25-02)
- **D-45:** **Joel-brand glyphs ship in Section/Footer (Instagram + Substack) — resolves OPEN-24-13.** Plan 25-02 first task: `batch_design` Insert probe with `library: "lucide", icon: "instagram"` and `icon: "substack"`. Expected outcome: Instagram resolves lucide-native (Pattern A per D-25 supersession), Substack does NOT resolve (lucide's curated set typically excludes Substack).
- **D-46:** **Substack ships via Pattern B atomic-glyph fallback (hand-authored SVG).** When the D-45 probe confirms lucide is missing Substack, Plan 25-02 ships Substack as a Pencil-native atomic-glyph component under `_Components / Primitives / Icon / glyphs / substack` (matches D-25's Pattern B fallback). SVG path hand-authored from a public-source Substack mark (e.g., simpleicons.org reference). Adds one row to the glyph-shipped list in PEN-INVENTORY's Icon section with provenance `Pattern B fallback (lucide missing Substack)`. Section/Footer's social-row then instances `Primitive / Icon` × 2 — Instagram with `library: "lucide"`, Substack with the atomic-glyph child via instance-swap.
- **D-47:** **Footer uses Chivo typography (Phase 23's conditional primitive earns its keep).** Plan 23-03 included Chivo as a primitive with the explicit note `'Footer-conditional, Phase 24+ may remove'`. Phase 25 Footer IS that condition — Section/Footer references the Chivo primitive (or a `type-semantic-footer-*` alias derived from it). The Chivo primitive token is now confirmed-load-bearing and stays in the surface. Strict source-wins (Crito Footer source uses Chivo for copyright + body).
- **D-48:** **Footer link columns ship Crito-source labels literally.** Plan 25-02 reads Home Page Footer subtree via `batch_get`, enumerates link columns + labels, and ships them as fixed Pencil text nodes. Strict D-24 source-wins, consistent with Header decision D-38. Joel's link-content override happens at Phase 31 Homepage instance time via consumer-side text override.

### Compound / Card Source-Coverage & Slot Signature (Plan 25-03)
- **D-49:** **Card ships as raster-probe inferred (stronger than Badge OPEN-24-12 inference).** Plan 25-03 first task reads `design/images/` raster screenshots of Project / Blog / Service card subregions (from Crito flat-raster frames `08_Blog Details` w1m3x, `07_Blog` DzqTm, `06_Service Details` cYlRH, `05_Service` Y2isa — all OPEN-23-05 flat-raster). Card structure is inferred from raster visual structure + Joel's existing `src/components/ui/Card.astro` v1.3 pattern as a secondary reference. Stronger provenance than Badge's fully-inferred path (D-32/D-34 Case B/I in Phase 24). Result documented in a new PEN-INVENTORY section `## Compound Source Inference (Phase 25)` with per-slot raster-citation rows.
- **D-50:** **OPEN-25 source-coverage flag declares raster-derived provenance.** Plan 25-03 adds an `OPEN-25-XX` row to PEN-INVENTORY's Open Flags section with severity `notable`, scope `source-coverage`, and consumer phase `28 (Blog) or 29 (Projects) — whichever phase first instances Card`. First concrete Card consumer locks the real values via consumer-site overrides or component-edits and resolves the flag. Follows Phase 24's OPEN-24-12 (Badge) consumer-resolution pattern.
- **D-51:** **4-slot signature (image, title, body, footer-actions) — matches ROADMAP Plan 25-03 wording.** Generic-enough to cover Project (image + title + result-metric body + CTA actions), Blog (image + title + excerpt body + meta-row actions), Service (icon + title + description body + CTA actions). The footer-actions slot is the catch-all for whatever bottom-row content the consumer needs (button instance, tags, metadata text, social actions). Resists pre-mature slot subdivision (Pitfall O5 / O6 carry-forward).
- **D-52:** **Slot declaration uses Pencil-native slot props (typed if Pencil supports, untyped fallback).** Plan 25-03 first task probes Pencil 2.13 schema slot-typing support (per Pencil guidelines § 2). If typed slots work cleanly, each slot declares its recommended component IDs (e.g., footer-actions slot accepts `Primitive / Button` instances). If typing has OPEN-23-13-style limitations, fall back to untyped slot props. **In addition**, Plan 25-03 writes a sibling Pencil note documenting the slot signature in human-readable form ('4 slots: image, title, body, footer-actions — image accepts Image or Frame, title accepts Text, body accepts Text or rich content, footer-actions accepts Frame or Primitive/Button') — belt-and-suspenders coverage for picker-discoverability + human-readable docs.
- **D-53:** **All 4 slots default to `enabled: true` with minimal placeholder content.** Card preview in `_Components / Compounds` shows a complete-looking card structure for visual library discoverability — image-shaped placeholder rectangle, "Card title" text in the title slot, "Card body text" filler in the body slot, a Primitive/Button/Default instance in the footer-actions slot. Consumers REPLACE placeholders at instance time. Strongest signal in the library that Card is a real, populated component — not a stub. Trade-off: more authoring work than `enabled: false` defaults; less consumer flexibility for slot-omission. The trade-off lands on visual-library-clarity since this is a design-tool deliverable, not a runtime component.

### Cross-cutting / Carry-forward
- **D-54:** **Pre-flight `get_editor_state` enforcement** carries forward from Phase 24 D-35. Every plan in Phase 25 that calls `set_variables` or `batch_design` first calls `mcp__pencil__get_editor_state({ include_schema: false })` and asserts active editor == `design/Crito.pen`. Halt and surface to user on mismatch. No exceptions.
- **D-55:** **Source-wins applied to Section components, raster-probe-inference applied to Compound/Card.** D-24 (source-wins) and Phase 24's OPEN-24-12 (inferred-component-with-flag) coexist in Phase 25 as parallel disciplines for different component layers: Section components have IN-SCOPE Crito sources (Menu bar + Footer in Home Page `ujMLJ`) → source-wins; Compound/Card's consumers (Project/Blog/Service frames) are flat-raster → raster-probe inference + OPEN-25 flag. Pattern matches Phase 24's per-primitive Case-analysis (Button source-derived, Badge inferred).
- **D-56:** **Variant Evidence + Token Extensions tables extend with Phase 25 rows.** New rows added to existing PEN-INVENTORY tables (per Phase 24 D-23 / D-33 audit-trail discipline): Variant Evidence rows for Secondary Button cell + each Section component + Card. Token Extensions rows IF source demands new tokens (D-33 open policy carries forward). A new section `## Compound Source Inference (Phase 25)` adds raster-citation rows for Card's slot structure inference.
- **D-57:** **Phase 25 plans 25-01, 25-02, 25-03 run sequentially (waves not needed at this scale).** Header before Footer before Card so that the slot-mechanics pattern established by Plan 25-01 (logo slot, OPEN-24-06 resolution) informs Plan 25-03's Card slot work. Plan 25-02 (Footer) is structurally simpler and can be reordered with 25-01 if a probe outcome demands, but default order is 01 → 02 → 03.

### Claude's Discretion
- **Auto-layout vs absolute positioning at the Section level** — Pencil guidelines say auto-layout for component internals; Plan 25-01 / 25-02 decide whether the top-level Section frame itself uses auto-layout (likely yes for content row inside) or fixed-position-with-internal-auto-layout. Pick based on Plan 25-01 source-audit findings + LAYOUT-01 / LAYOUT-02 carry-forward from Phase 24.
- **Variant Evidence row granularity for Section components** — whether each row covers a single property (e.g., `Section/Header > nav-row > gap`) or a slot/structural unit. Match the granularity choice Plan 24-02 / 24-03 used per primitive, picking for readability.
- **Card hover/focus state policy** — D-22's compositional minimum forward set (Button + Input states) was about primitive-layer states. Whether Compound/Card itself has hover/focus states depends on Plan 25-03 raster audit (do Crito cards show a hover lift / shadow? probably not visible in raster). Default: NO Card hover/focus states ship in Phase 25 — primitive-layer states cover button hover inside the footer-actions slot. Surface as `OPEN-25-XX` if downstream consumer needs Card-level hover.
- **Whether to add a new `color-semantic-text-on-cta-primary` alias** — OPEN-24-02 left this as 'add when consumer needs to override per theme'. Phase 25 Header CTA is the first consumer; Plan 25-01 audits whether the white-on-green CTA label needs the semantic alias OR whether continuing to use the primitive `color-primitive-white` literal directly is fine. Source-wins discipline preferred; alias only if consumer-override pattern actually emerges.
- **Whether to publish a per-Section `snapshot_layout({ problemsOnly: true })` after each Plan 25-NN** — matches Phase 24 plan-close discipline. Default: yes, runs at every plan-close, documented in 25-NN-SUMMARY.md with the Phase 24 text-clipping-quirk caveat documented in 24-05-SUMMARY.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope + requirements (must-read)
- `.planning/PROJECT.md` — v2.0 milestone goal, v1.4 abandonment context (informs D-49 raster-probe-inference cautious approach), single-file strategy, desktop-only scope (informs D-39 hamburger-ships-anyway).
- `.planning/REQUIREMENTS.md` — Phase 25 requirements: COMP-05 (Section/Header), COMP-06 (Section/Footer), COMP-07 (Compound/Card slot-based).
- `.planning/ROADMAP.md` § "Phase 25" — Goal, Depends on (Phase 24), Success Criteria, Plans list (25-01 Header, 25-02 Footer, 25-03 Card).
- `.planning/STATE.md` — current position: Phase 24 COMPLETE, Phase 25 ready to plan.

### Phase 24 carry-forward (Phase 25 inherits these decisions directly)
- `.planning/phases/24-layout-primitives-primitive-components/24-CONTEXT.md` — Phase 24 decisions D-21 through D-37. Especially D-22 (compositional minimum forward states — Button Hover/Focus + Input Focus/Error), D-23 (Variant Evidence table format), D-24 (source-wins discipline), D-25 (Pattern A lucide-native + D-26 source-driven glyph enumeration), D-28 (brand-glyph deferral to Phase 25 → resolved via D-45/D-46 here), D-29 (Button iconLeading/iconTrailing slot pattern), D-30 (empty-slot auto-collapse — informs D-44 Header CTA icon-slot verification), D-33 (open token-extension policy), D-35 (pre-flight active-editor — carried forward as D-54), D-37 (sibling library frame stubs — Phase 25 populates them).
- `.planning/phases/24-layout-primitives-primitive-components/24-VALIDATION.md` — validation pattern Phase 25 mirrors per-component (snapshot_layout, structural assertions, audit-trail cross-ref).
- `.planning/phases/24-layout-primitives-primitive-components/24-05-SUMMARY.md` — Phase 24 close sweep with primitive ids consumed in Phase 25: `Button / Default` (id M7eUr), `Input / Default` (id nwJk7), `Icon / 24` (id u7NmaS), library parents `_Components / Primitives` (avgor), `_Components / Compounds` (t67DU6), `_Components / Sections` (g9oRa5). Documents the `snapshot_layout` text-clipping false-positive that Phase 25 plan-close documentation should reuse.

### Phase 23 foundation (transitively referenced)
- `.planning/phases/23-audit-token-foundation/23-CONTEXT.md` — token-naming convention (D-12 flat-dash), components-reference-semantic-only (D-14), OPEN-flag policy (D-09), PEN-INVENTORY plain-markdown discipline (D-18).

### Audit / inventory source (read for every plan in Phase 25)
- `.planning/research/PEN-INVENTORY.md` — single source of truth. Phase 25 plans read:
  - Frame classifications (Home Page `ujMLJ` IN-SCOPE Menu bar + Footer subtrees for Sections; flat-raster Blog/Project/Service frames for Card raster-probe).
  - Token surface (95 tokens shipped Phase 23, 0 extensions in Phase 24) — for COMP-09 zero-raw-values compliance.
  - Phase 24 OPEN flags Phase 25 resolves: **OPEN-24-06** (empty-slot collapse — resolved by D-44 Header CTA icon-slot use), **OPEN-24-11** (Secondary Button source `mkw8g` — resolved by D-42/D-43), **OPEN-24-13** (Joel-brand glyph gap — resolved by D-45/D-46).
  - Phase 24 OPEN flags Phase 25 may resolve depending on audit: OPEN-24-02 (color-semantic-text-on-cta-primary alias), OPEN-24-10 (badge spacing alignment if Header/Card surfaces badges).
- `.planning/research/exports/v2.0/end-of-phase-24/id-inventory.json` — structural snapshot of `Crito.pen` after Phase 24. Plan 25-01 reads this to know primitive IDs to instance + baseline IDs that must not be mutated.

### Ground-truth source files (Phase 25 reads these via Pencil MCP, not direct file I/O)
- `design/Crito.pen` — the work surface. Phase 25 mutates only the new `_Components / Sections` + `_Components / Compounds` populations + the Button Secondary variant addition. Existing 15 Crito page frames + `_Tokens & Foundations` + Phase 24 primitives are read-only inputs except for the Button variant-axis extension.
- `design/images/` — raster reference set for Compound/Card source-inference (D-49). Plan 25-03 reads PNG screenshots of card-bearing subregions in Project/Blog/Service frames via direct file I/O (these are PNG files outside the .pen). Specific images to consult will be identified by Plan 25-03 first task.
- `design/images/Consulting & Agency Website Template I Crito (Community).fig` — fallback ground-truth source per Phase 23 D-04. Plan 25-03 consults only if raster screenshots can't resolve a Card structure question (e.g., text size in a body slot).

### v2.0 research (cross-cutting context)
- `.planning/research/SUMMARY.md` — themes T1 (variables-first), T5 (don't repeat v1.4 — gaps get declared not filled — informs D-50 OPEN flag), T6 (single-file strategy), T8 (component variants on-demand only — informs D-43 source-wins on Secondary addition).
- `.planning/research/STACK.md` — Pencil MCP tool catalogue; `get_guidelines({ topic: "design-system" })` is required reading at start of plan 25-01 (Sections) and plan 25-03 (Card) for current Pencil compound-component-authoring guidance.
- `.planning/research/PITFALLS.md` — O5 / O6 (premature token hierarchies + component-library bloat — informs D-51 4-slot resistance to subdivision), F3 (no eyedropping from raster — informs D-49 raster-probe-inference uses raster for STRUCTURE not COLOR values).

### Pencil MCP guidance (consulted during execution, not pre-read at planning)
- `mcp__pencil__get_editor_state({ include_schema: false })` — call FIRST in every 25-NN plan per D-54.
- `mcp__pencil__get_guidelines({ topic: "design-system" })` — call at start of plan 25-01, 25-02, 25-03 for current Pencil component-authoring guidance.
- `mcp__pencil__get_variables({})` — call to read the 95-token surface before referencing semantic tokens in any component; verify any Phase 25 D-33 token extensions.
- `mcp__pencil__batch_get` — read Home Page `ujMLJ` Menu bar subtree (Plan 25-01) + Footer subtree (Plan 25-02) for source-wins audit.
- `mcp__pencil__snapshot_layout({ problemsOnly: true })` — per-component at each plan close (text-clipping false positive from Phase 24 carries forward; document in 25-NN-SUMMARY.md per Phase 24 precedent).

### Outputs this phase produces (referenced by Phase 26+)
- `.planning/research/PEN-INVENTORY.md § "Variant Evidence (Phase 24)"` — extended with Phase-25-late-addition row for Secondary Button cell + new Section-level rows + Compound/Card rows (or a new sibling section per D-56 / Claude's discretion).
- `.planning/research/PEN-INVENTORY.md § "Token Extensions (Phase 24)"` — possibly extended with Phase 25 rows IF any plan adds tokens (D-33 open policy carries forward; expected to remain 0 rows unless Header/Footer source forces new tokens).
- `.planning/research/PEN-INVENTORY.md § "Compound Source Inference (Phase 25)"` — NEW section per D-49 + D-56 documenting per-slot raster citations for Card.
- `.planning/research/PEN-INVENTORY.md ### Open Flags — Phase 25 (OPEN-25-NN)` — populated by plans 25-01/02/03 per D-50 (Card source-coverage), plus any other notable / minor flags discovered during audit. OPEN-24-06/11/13 marked RESOLVED with Phase 25 plan citation.
- The 3 new section/compound components in `design/Crito.pen` (`_Components / Sections / { Header, Footer }`, `_Components / Compounds / Card`) plus the Secondary Button variant addition + the Substack atomic-glyph component.
- `.planning/research/exports/v2.0/end-of-phase-25/id-inventory.json` — structural snapshot per OPEN-23-01 substitution pattern (matches Phase 23 and Phase 24 precedent).

</canonical_refs>

<code_context>
## Existing Code Insights

**Phase 25 makes NO `src/` code changes.** v2.0 is `.pen`-file-only (per PROJECT.md + REQUIREMENTS.md Out of Scope). The code-side observations below are downstream-milestone awareness only — they do NOT shape Phase 25 work.

### Reusable Assets (code-side, not Phase 25 inputs)
- `src/components/layout/Header.astro` (and `Footer.astro`, `MobileNav.astro`) — v1.3 layout components. Inform NOTHING about Pencil component mechanics; will be replaced by a future code milestone that consumes Phase 25 Section components.
- `src/components/ui/Card.astro` — v1.3 design-system Card. Referenced in D-49 as a SECONDARY structural reference for Card slot signature inference (after the raster-probe — Crito-raster is the primary source). NOT a copy-source for visual values.

### Established Patterns (Pencil-side, ARE Phase 25 inputs)
- **Variables-first → primitives → compounds → sections** — Phase 23 established tokens, Phase 24 built primitives, Phase 25 builds compounds + sections. Each layer references the next-lower layer's exports via semantic tokens (per Phase 23 D-14 carry-forward).
- **Single-file strategy** — everything in `design/Crito.pen`. Library frames at top of canvas with `_` prefix. Phase 25 populates `_Components / Sections` (g9oRa5) + `_Components / Compounds` (t67DU6) stubs that Phase 24 Plan 24-01 created per D-37.
- **OPEN-flag system** — Phase 25 extends with `OPEN-25-NN` rows per D-50 (Card source-coverage) + any other plan-specific flags. RESOLVES Phase 24's OPEN-24-06, OPEN-24-11, OPEN-24-13 per D-44 / D-42 / D-45.
- **Pre-flight active-editor assertion** — D-54 carries forward from D-35 (Phase 24) / OPEN-23-14 (Phase 23). Every Pencil-mutating plan calls `get_editor_state` first.
- **Plain-markdown audit trails** — Phase 23 D-18 + Phase 24 D-23/D-33 set the pattern. Phase 25's new "Compound Source Inference (Phase 25)" section follows the same convention.
- **Probe-first within plans** — Phase 24 established this pattern (Badge probes, Icon mechanism probe). Phase 25 plans 25-01 (slot mechanics probe via logo slot) + 25-02 (lucide brand-glyph availability probe per D-45) + 25-03 (Pencil slot-typing schema probe per D-52) all use probe-first task ordering.

### Integration Points
- **PEN-INVENTORY.md is the bridge** — Phase 26+ (per-page reconstruction) reads Phase 25's Section + Compound entries + OPEN-25 flag status to know what's available before instancing components into page frames.
- **Component instancing pattern across phases** — Phase 25 Section/Header + Section/Footer are designed to be instanced at top + bottom of each IN-SCOPE page frame in Phases 26-31. Per-page consumers may override slot content (logo per D-40, link labels per Phase 31 brand-swap context) but should not edit component internals.

</code_context>

<specifics>
## Specific Ideas

- **OPEN-24-06 resolution via actual use, not standalone probe (D-44):** Phase 24 D-30 said "Plan 24-02's build verifies this Pencil mechanic works as expected; if it doesn't (OPEN-23-13-style limitation), surface to user." Phase 25 D-44 takes this further: both Header CTAs wire in real arrow-right icons, so the empty-slot question gets answered by ACTUAL consumer behavior. This is the strongest possible verification — production-shaped use, not a synthetic probe.
- **Source-wins applied across both layers, with different mechanisms per layer (D-55):** Section components (Header / Footer) have direct IN-SCOPE Crito sources → strict source-wins (Crito-literal labels, ship all affordances, Chivo typography). Compound/Card has FLAT-raster consumers → raster-probe-inference with OPEN-25 flag. The discipline is consistent (no inventing what source doesn't show); the evidence type differs (component-source vs raster-source).
- **Belt-and-suspenders slot documentation (D-52):** Pencil-native slot props + sibling Pencil note. Native props give Pencil-picker discoverability; sibling note gives human-readable contract. Both shipped, not either-or. Resists the trap of relying on one mechanism failing silently.
- **`enabled: true` slots with placeholder content (D-53) chooses library-clarity over consumer-flexibility.** The trade-off was conscious: this IS a design-tool deliverable; visual library legibility matters more than slot-omission ergonomics. Consumers replace placeholders at instance time — no different than replacing default text on any Pencil component.
- **Plan order 01 → 02 → 03 is intentional (D-57):** Header first because it establishes the slot-mechanics pattern (logo slot, OPEN-24-06 resolution) that Card slot work depends on. Card last because it's the most-inferred component and benefits from having the slot mechanics already verified in the file.

</specifics>

<deferred>
## Deferred Ideas

- **Joel-brand wordmark / logo asset** — D-40 makes the logo a slot at the component level. A real Joel-brand logo doesn't currently exist (PROJECT.md uses 'Joel Shinness' plain text). When designed, it gets instanced into the logo slot at Phase 31 Homepage time (or earlier if any per-page consumer needs it).
- **Section/Header sticky/non-sticky positioning intent** — runtime behavior, not Pencil-component visual structure. Code-milestone concern.
- **Search affordance behavior (Crito search icon ships per D-39 but has no Joel-side analog)** — visual fidelity ships; whether code milestone wires real site search or hides the icon is a future decision.
- **Chevron-down dropdown menu structure** — D-39 ships the chevron icon; the actual dropdown content (if any) is a future page-reconstruction concern.
- **Hamburger mobile-toggle behavior** — desktop-only per PAGE-09; hamburger ICON ships per D-39 (visual fidelity) but mobile-toggle behavior is a later-milestone concern.
- **Card hover/focus states** — Claude's-discretion entry above. Default no-ship in Phase 25; add when a downstream consumer surfaces the need with source/raster evidence.
- **`color-semantic-text-on-cta-primary` semantic alias** — OPEN-24-02 carry-forward. Plan 25-01 may add IF Header CTA work surfaces the need; otherwise remains deferred.
- **`type-semantic-footer-*` alias family** — D-47 references Chivo via primitive directly OR via a footer-specific semantic alias. Plan 25-02 picks based on whether aliasing earns its keep at this scale.
- **Compound/Card hover / focus / disabled states beyond primitive-layer button states** — D-22's compositional-minimum was primitive-layer-scoped. Card-level states wait for concrete consumer demand (Phase 28+).
- **Per-page Section/Footer Joel-brand-vs-Crito-brand swap (label content)** — Phase 31 Homepage owns this for the Crito-literal labels shipped by D-48. Footer brand GLYPHS ship Joel-brand at the component level (D-45 / D-46); label OVERRIDES happen per-instance at Phase 31.
- **`Compound / Card` as a multi-variant matrix** — explicitly REJECTED by COMP-07 (one component via slots, not three variants). Carries forward as a hard constraint, not a deferred decision.

</deferred>

---

*Phase: 25-section-compound-components*
*Context gathered: 2026-06-01*

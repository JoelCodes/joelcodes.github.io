# Phase 30: Design System Reference Reconstruction - Context

**Gathered:** 2026-06-09
**Status:** Ready for planning

<domain>
## Phase Boundary

A new top-level page frame — `Design system` — is added to `design/Crito.pen` as an editable composition of Phase 23–29 tokens / primitives / compounds / sections, **plus** a foundation layer of 3 new library entries: `Section / TokenSwatchGrid`, `Section / TypeSpecimen`, and `Section / ComponentShowcase`. The page is a user-facing route reconstruction for Joel's `/design-system` page (currently rendered by `src/pages/design-system.astro` at v1.3, ~1200 LOC), framed as an internal reference for Joel and AI coding agents.

Branch assignment per CALIBRATION-PROTOCOL.md § 2 branch decision tree:
- **Design system page = `joel-only-no-crito-ref`** — no Crito source frame exists (PEN-INVENTORY line 77 placeholder row `(joel-only: Design System)` confirms `joel_page_map: /design-system page (per D-08)`, `scope: joel-only-no-crito-ref`, `reconstruction_priority: medium (Phase 30)`). PAGE-11 **INERT** per § 4.3 (no raster to remove). Calibration follows § 4 joel-only branch — token-usage check against `_Tokens & Foundations` reference frame `RpGbe` per D-62.

Phase 30 closes the PEN-INVENTORY's last placeholder joel-only row by RECLASSIFYING it in-place to a real reconstructed frame row (parallel to Phase 29's Y2isa + cYlRH reclassification pattern). The Phase 30 page IS the v2.0 library reference — it's the only IN-SCOPE surface that exercises every primitive + compound + section component built so far in v2.0.

**Out of scope (already decided):**
- Per-page reconstruction for any other page (Phase 31 Homepage, Phase 32 sweep)
- Mobile breakpoint reconstruction (PAGE-09 — desktop only for v2.0)
- Dark mode (TOKEN-07 + Phase 23 D-01)
- A new CALIBRATION-PROTOCOL revision — Phase 26 D-66 protocol applies as-is (joel-only branch § 4)
- Joel's v1.3 4-link Header nav override (Phase 25 D-38 + Phase 26 D-77 + Phase 27 + Phase 28 + Phase 29 carry-forward: defers to Phase 31 Homepage instance time)
- Joel-brand logo / wordmark in Section/Header logo slot (Phase 25 D-40 deferred)
- Joel-brand visual chrome (yellow neobrutalist Card border + 6px hard shadow + Bricolage Grotesque + turquoise H2 left-border accent) — Crito visual register applies per D-58 carry-forward; v1.3 design-system.astro `border-l-4 border-turquoise` H2 treatment NOT inherited
- Sticky sidebar nav — v1.3 design-system.astro lines 22-26 ship a `lg:grid-cols-[250px_1fr]` DesignSystemNav sticky sidebar; Phase 30 drops it per D-145 (linear long-scroll architecture); sibling Pencil note documents the v1.3 surface for code milestone
- Section/CTA marketing close at bottom — D-142 utilitarian internal-docs register declines a marketing-style close (the page is for Joel + AI agents, not lead generation)
- Embedded interactive component states — D-92 / D-59 carry-forward (static design tool represents READING state; hover/focus/disabled interactive states wired in code milestone)
- Code-snippet content authoring beyond canonical default-variant snippets — D-150 ComponentShowcase code-snippet-slot receives `enabled: true` consumer-supplied snippet showing the canonical default-variant usage only; exhaustive snippet matrix across variants deferred to code milestone
- Joel's v1.3 src code (v2.0 milestone scope — `.pen` file only)
- CSS utility re-implementation — D-144 Utilities section ships visual approximation only (iso-shadow renderable as an offset filled shape behind a Card placeholder; iso-glow / iso-rotate likely STUB visualizations); the actual utility surface lives in `src/styles/global.css` and is a code-milestone concern
- Token-namespace reorganization for the page-frame gallery — D-147 token-gallery sub-grouping mirrors Phase 23 `_Tokens & Foundations` (RpGbe) sub-groupings; no parallel token-namespace surface is introduced

</domain>

<decisions>
## Implementation Decisions

### Page Register / Vibe

- **D-142:** **Utilitarian internal-docs register.** Honest to v1.3's `src/pages/design-system.astro` line 14-15 framing: "Internal reference for Joel and AI coding agents." Drops agency-polish chrome (no hero band, no decorative bg fills like Plan 28-01 banner's `color-semantic-decorative-coral`, no Section/CTA marketing close at bottom). Keeps Crito-vocab section components (Section/Header + Section/Footer + semantic tokens + type tokens). Reads like a docs site, not a sales page. Matches Phase 26 D-58 "Crito-vocab fresh design" intent but STRIPS agency polish in service of honest documentation register. Inverse of Phase 28-29 page-register lean (those pages serve marketing/portfolio purposes; Phase 30 serves internal documentation).

- **D-143:** **Page-intro content v1.3 verbatim + sibling Pencil notes for code-milestone wiring.** Per D-82 (Phase 26) + D-98 (Phase 27) + D-123 (Phase 28) content-extraction-discipline chain:
  - H1: `Design System` (v1.3 line 32-34)
  - Body paragraph: `Internal reference for Joel and AI coding agents. Components, tokens, and utilities for consistent development.` (v1.3 line 35-37)
  - Secondary line with link reference: `Machine-readable format: /design-system.json` (v1.3 line 38-46 condensed)
  - **Sibling Pencil note A — noindex preservation:** "v1.3 line 15-16 ships `<meta name=\"robots\" content=\"noindex, follow\" />` — internal-only page; preserve in code milestone." Per D-93 belt-and-suspenders convention.
  - **Sibling Pencil note B — JSON endpoint preservation:** "v1.3 lines 38-46 ship machine-readable `/design-system.json` link served by `src/pages/design-system.json.ts`; preserve endpoint in code milestone." Per D-93 belt-and-suspenders convention.

- **D-144:** **Mirror v1.3's 5 top-level sections.** Page-intro → Colors → Typography → Components → Utilities → (Section/Footer). Section IDs from v1.3 design-system.astro preserved as sibling Pencil notes on each H2 frame:
  - Section 1: page-intro (v1.3 `#introduction`)
  - Section 2: Colors (v1.3 `#colors`) — sub-sections: Primary Accent / Text Variants / Neutral / Usage Guidelines
  - Section 3: Typography (v1.3 `#typography`) — sub-sections: Font Families / Type Scale / Font Weights / Line Heights
  - Section 4: Components (v1.3 `#components`) — sub-sections: Primitives / Compounds / Sections (per D-148 full v2.0 library)
  - Section 5: Utilities (v1.3 `#utilities`) — sub-sections: iso-shadow / iso-glow / iso-rotate

  **Utilities section content treatment (Claude's Discretion at plan-execution):** iso-shadow renderable as an offset filled shape behind a Card placeholder (closest Pencil approximation of the CSS box-shadow pattern); iso-glow + iso-rotate likely STUB visualizations (CSS-only mechanics: drop-shadow filter, rotate transform — no clean Pencil rendering). Each utility sub-section ships with sibling Pencil note documenting actual CSS mechanic from `src/styles/global.css`; downstream code milestone re-implements. Per VALID-01 vocabulary — Utilities section per-sub-section labels likely APPROXIMATE (iso-shadow) and STUB (iso-glow, iso-rotate).

### Layout Architecture

- **D-145:** **Linear long-scroll page-frame architecture.** Vertical-stack: Section/Header (G0wNOc) → page-intro section → Colors section → Typography section → Components section → Utilities section → Section/Footer (Xs0Hs). Matches every other v2.0 page-frame architecture (Phase 26 FAQ + 404 / Phase 27 Thank-you + Contact / Phase 28 Blog × 3 / Phase 29 Projects + Project). No sticky sidebar. v1.3 `lg:grid-cols-[250px_1fr]` DesignSystemNav (line 22-26) DROPPED — sibling Pencil note on page-intro section documents v1.3 had a sidebar nav (for code milestone to re-introduce or remove). Rationale: (a) sticky positioning doesn't render at the Pencil design-tool level (D-92 / D-59 static-design carry-forward); (b) utilitarian-docs register from D-142 doesn't require dedicated nav chrome — anchor scrolling sufficient; (c) Pitfall O5/O6 single-consumer prevention — no other Joel page has a sidebar; building Section/SidebarNav for one consumer violates Phase 26 D-79 + Phase 28 D-116 + Phase 29 D-134 narrow-scoping precedent.

- **D-146:** **Page-frame dimensions follow Phase 26-29 chain conventions.** Width: 1440 (CALIBRATION-PROTOCOL § 10.4 standard; Phase 26 FAQ b7Hgy + 404 csXky precedent → Phase 27 Thank-you XsDab + Contact n0QqTd → Phase 28 Blog DzqTm + Blog Post w1m3x + Tag → Phase 29 Projects SCcln + Project s5k41l). Content-width: 1200 (sub-sections inside the 1440 page-frame center at 1200 via auto-layout `alignItems: center` + sub-section frame `width: 1200` per Phase 26 4.4 step 6). Between-section rhythm: `space-semantic-section-y` token per Phase 26 + carry-forward chain. Page-frame `layout: vertical`, `gap: 0` (sub-section frames carry their own internal padding/gap), `padding: 0`, `alignItems: center`, `fill: color-semantic-bg-page` (or `#ffffffff` per D-58 Crito-vocab default — plan-execution may pivot). Placement: `find_empty_space_on_canvas` with `nodeId: <Phase 29 Project frame s5k41l>` anchor per CALIBRATION-PROTOCOL § 10.4 nodeId-anchor pattern.

### Gallery Breadth + Scope

- **D-147:** **Tokens exhaustive, components curated.**
  - **Token gallery: ALL ~107 tokens shown.** Every color swatch (~30 across brand/text/bg/border/decorative roles per Phase 23 + 28 surface) + every type specimen (~12 across display/heading/caption/prose roles + Phase 28's 7 prose tokens) + every spacing tier (`space-semantic-*` ladder) + every radius tier (`radius-semantic-*` ladder). Each token rendered as a tile binding the literal value to the semantic-token name + a resolved-value caption (per § 4.5 calibration target — the page must visually demonstrate the token surface declared in `_Tokens & Foundations` RpGbe). Possible token surface extension at plan-execution if Plan 30-00 foundation surfaces showcase-internal padding/gap needs per D-72 / D-106 / D-135 mid-plan-gate precedent.
  - **Component gallery: curated 1–2 variants per component.** Button shows Default (M7eUr) + Secondary (hIWuC) — NOT all 4 purposes × 3 sizes (~12 combinations). Input shows Default (nwJk7) + Focus + Error states — NOT all type variants. Badge shows Default (j0FxQZ) + Outline (kJQmJ). Icon shows all 4 sizes (16/20/24/32) — sizes ARE the canonical taxonomy here per Phase 24 D-29, not a variant matrix that would explode. Card / BlogCard / ProjectCard each show one populated default instance + sibling note documenting slot signature. CheckboxGroup shows one populated default instance. Sections each show one canonical instance (Header + Footer + CTA + NavBack + TagFilter + RelatedPosts + ResultsMetrics + RelatedProjects) — Header + Footer get one canonical instance per ROADMAP success criterion 3 + D-77 carry-forward (no Joel-brand override). Rationale: variant matrices already live at the primitive-component level for downstream agents to discover via `batch_get`; gallery purpose is visual reference + canonical-usage demonstration, NOT exhaustive variant enumeration.

- **D-148:** **Full v2.0 library coverage in Component gallery.** All 4 primitives + 4 compounds + 8 sections from Phase 24-29:
  - **Primitives (4):** Button (M7eUr Default + hIWuC Secondary) / Input (nwJk7 Default + Focus + Error) / Badge (j0FxQZ Default + kJQmJ Outline) / Icon (u7NmaS + 16/20/32 variants)
  - **Compounds (4):** Card (t40xct, populated slot example) / BlogCard (ZSxZU Phase 28, populated) / ProjectCard (Phase 29 Plan 29-00, populated) / CheckboxGroup (Phase 27 Plan 27-00, populated)
  - **Sections (8):** Section/Header (G0wNOc) / Section/Footer (Xs0Hs) / Section/CTA (Hs5rc Phase 26) / Section/NavBack (N1jo3i Phase 26) / Section/TagFilter (O1IwyS Phase 28) / Section/RelatedPosts (Phase 28) / Section/ResultsMetrics (Phase 29) / Section/RelatedProjects (Phase 29)
  - **Sub-section ordering inside Components section:** Primitives → Compounds → Sections (natural composition order — primitives compose into compounds compose into sections; matches how Phase 24-29 ordered the library build).
  - Header + Footer canonical-instance demonstration counts as the Phase 30-specific cross-page consistency proof per ROADMAP success criterion 3 ("Phase 30 design-system page uses Section/Header and Section/Footer instances — proving the section components compose correctly in a page context other than the homepage"). Phase 30 IS the cross-page consistency proof for Header + Footer; Phase 31 Homepage extends with second consumer.
  - This IS the v2.0 library reference — honest about everything Phase 23-29 shipped. v1.3 design-system.astro's 5 components (Button + Card + Input + Badge + CheckboxGroup) are a subset of this list.

### Showcase-Pattern Factoring

- **D-149:** **Factor all 3 showcase patterns as NEW narrow-scoped library components in Plan 30-00 foundation.** Component library count moves 16 → 19. Intentionally departs from the Phase 26 D-79 + Phase 28 D-116 + Phase 29 D-134 single-consumer narrow-scoping precedent — justified by:
  - **Per-section repetition density inside Phase 30 alone:** ~30 color-swatch tiles + ~12 type-specimen tiles + ~16 component-showcase blocks = ~58 instances within a single phase. Inline composition would bloat the page-frame internals + duplicate structural decisions ~58 times.
  - **Future-consumer plausibility:** A v3 design-system overhaul milestone (post-v2.0) would re-consume these patterns. Phase 30 IS the design-system route; if it ever expands or restructures, having the patterns factored makes that future work cleaner.
  - **The Pitfall O5/O6 single-consumer rule is intentional self-restraint, not a hard rule** — D-149 documents that Phase 30 weighs the rule against the in-phase repetition density and consciously overrides. The narrow-scoping rule WAS still applied where the consumer count is genuinely 1 (Phase 26 NavBack, Phase 28 RelatedPosts, Phase 29 ResultsMetrics + RelatedProjects).

  **The 3 new sections:**
  1. **`Section / TokenSwatchGrid`** — color-swatch grid pattern. Slot signature: heading-slot (label like "Primary Accent Colors") + grid-of-swatch-tiles (auto-layout horizontal-wrap; each tile is a child frame with `swatch` color-fill + `token-name` label + `resolved-value` caption). Lives in `_Components / Sections` (g9oRa5).
  2. **`Section / TypeSpecimen`** — type-spec block pattern. Slot signature: heading-slot (label like "Type Scale") + grid-of-specimen-tiles (auto-layout vertical or horizontal-wrap; each tile is a child frame with `sample-text` rendered in the token + `token-name` label + `size/weight/line-height` caption). Lives in g9oRa5.
  3. **`Section / ComponentShowcase`** — component-instance pattern. Slot signature: label-slot (component name like "Button / Default") + live-instance-slot (the actual component ref instance) + code-snippet-slot (`enabled: true` default per D-150; consumer supplies snippet text styled with Phase 28 `type-semantic-mono-primitive` token + code-block bg/border treatment). Lives in g9oRa5.

  Each ships with a sibling Pencil note declaring slot signature per Phase 25 D-52 belt-and-suspenders. Possible new tokens at Plan 30-00 if showcase-internal padding/gap surfaces escalation per D-72 / D-106 / D-135 mid-plan-gate precedent (e.g., `space-semantic-showcase-tile-gap` if the existing semantic-stack ladder doesn't fit).

- **D-150:** **ComponentShowcase code-snippet-slot is `enabled: true` by default with consumer-supplied snippet content.** Snippet text styled with Phase 28 prose tokens: `type-semantic-mono-primitive` (mono family + 14-16px size) + `type-semantic-prose-code-block` (bg fill + border + padding treatment). Each instance in Component gallery ships a CANONICAL DEFAULT-VARIANT snippet only (e.g., `<Button variant="yellow">Click</Button>` for Button, `<Card variant="default">...</Card>` for Card, etc.) — NOT exhaustive snippets across all variants (variant matrix already shown structurally via curated 1-2 variants per D-147). v1.3 design-system.astro uses `<CodeBlock>` heavily across all component sections — Phase 30 honors this convention but at the curated-default level only. Matches Phase 28 D-105 prose-token consumer pattern with the design-system page as the SECOND prose-code-block consumer surface (Plan 28-02 Blog Post detail PRIMARY validation; Phase 30 SECONDARY validation surface in line with D-110 'provisional' flag verification chain).

### Plan Structure

- **D-151:** **Phase 30 ships 2 plans default, foundation-first.** Mirrors Phase 27 D-101 + Phase 28 D-122 + Phase 29 D-138 foundation-first ordering; plan count adjusts to page-count + foundation needs (Phase 26 = 4 plans for 2 frames + protocol codification; Phase 27 = 3 for 2 frames; Phase 28 = 4 for 3 frames; Phase 29 = 3 for 2 frames; Phase 30 = **2 for 1 frame**). Plan-execution at `/gsd:plan-phase 30` may split Plan 30-01 into 30-01 + 30-02 (token gallery + component gallery + utilities + chassis) if scope-vs-attention warrants — see plan-execution discretion below.
  - **Plan 30-00 — Foundation (no user gate at close per D-86 + D-102 + D-124 + D-139 chain):** ships 3 new Section components inside `_Components / Sections` (g9oRa5):
    - `Section / TokenSwatchGrid` per D-149 slot signature
    - `Section / TypeSpecimen` per D-149 slot signature
    - `Section / ComponentShowcase` per D-149 + D-150 slot signature
    - Possible new token at mid-plan gate per D-72 / D-106 / D-135 precedent IF showcase-internal padding/gap or component-showcase code-snippet typography surfaces an escalation (default: reuse existing surface, NO new tokens). Possible Badge variant addition NOT expected — Phase 28's Outline + Phase 24's Default cover the showcase needs.
    - Possible Badge or Card variant evaluation NOT expected — Phase 30 only INSTANCES the library, doesn't extend primitives/compounds.
    - Library count: 16 → 19 (+3 sections).
  - **Plan 30-01 — `Design system` page-frame composition + calibration (single user gate at close per CALIBRATION-PROTOCOL § 4.5 joel-only branch):** top-level `Design system` frame at 1440 width via `find_empty_space_on_canvas` with `nodeId: s5k41l` (Phase 29 Project frame) anchor per § 10.4. Instances:
    - Section/Header (G0wNOc, no override per D-77 carry-forward)
    - page-intro section (v1.3 verbatim per D-143: H1 + body + JSON-link secondary + 2 sibling Pencil notes for noindex + JSON endpoint)
    - Colors section (H2 "Colors" + sub-sections: Primary Accent / Text Variants / Neutral / Usage Guidelines — each sub-section is a Section/TokenSwatchGrid instance with appropriate descendants overrides for tile content)
    - Typography section (H2 "Typography" + sub-sections: Font Families / Type Scale / Font Weights / Line Heights — Font Families + Type Scale ship as Section/TypeSpecimen instances; Font Weights + Line Heights may ship as inline tables per scope analysis at plan-execution OR as additional TypeSpecimen instances with appropriate descendants)
    - Components section (H2 "Components" + sub-sections: Primitives / Compounds / Sections — each sub-section contains ~4-8 Section/ComponentShowcase instances per D-148 full v2.0 library; each Showcase ships label + live instance + canonical default-variant code snippet per D-150)
    - Utilities section (H2 "Utilities" + sub-sections: iso-shadow / iso-glow / iso-rotate — visual approximation per D-144 Claude's-Discretion treatment; each ships sibling Pencil note documenting the CSS mechanic from `src/styles/global.css`)
    - Section/Footer (Xs0Hs, no override per D-77 carry-forward)
    - **Plan-close calibration gate** per CALIBRATION-PROTOCOL § 4.5 joel-only branch — token-usage AskUserQuestion paired against `_Tokens & Foundations` RpGbe per D-62. Single gate covers all 5 page sections; structured token-usage description per § 4.5 format.
    - **PAGE-11 INERT** per § 4.3 (no Crito source raster to remove). PEN-INVENTORY status_counts updates: `factored:N` per actual sub-section count.

  **Plan-execution split discretion:** If Plan 30-01 scope-vs-attention warrants per § 6.4 stale-cache-quirk risk on a very-tall page-frame (Phase 30 frame likely exceeds Phase 29 Project frame height due to ~58 instance density), plan-execution at `/gsd:plan-phase 30` may split into:
  - Plan 30-01 — page-frame chassis + page-intro + Colors + Typography (token gallery surface; smaller calibration scope)
  - Plan 30-02 — Components + Utilities + Footer (component gallery surface; calibration gate at close covering 30-01 + 30-02 OR per-plan single gate per § 3.4 precedent)
  
  Default lean: single Plan 30-01 (consistent with Phase 26-29 one-page-frame-one-plan precedent — Plan 26-01 FAQ + Plan 26-02 404 + Plan 27-01 Thank-you + Plan 27-02 Contact + Plan 28-01 Blog index + Plan 28-02 Blog Post + Plan 28-03 Tag + Plan 29-01 Projects + Plan 29-02 Project all completed within single plans). Sequential, no waves.

- **D-152:** **Per-plan calibration gates — single AskUserQuestion at plan close per CALIBRATION-PROTOCOL § 4.5 joel-only branch.**
  - **Plan 30-00 closes WITHOUT a user gate** at default — pure foundation work (3 new section components). Mid-plan gate ONLY if token escalation surfaces per D-72/D-106/D-135 precedent.
  - **Plan 30-01 closes WITH a single calibration gate** per § 4.5 (joel-only branch token-usage format) — covers page-intro + Colors + Typography + Components + Utilities + Header/Footer fidelity proposals + token-binding check against `_Tokens & Foundations` RpGbe. AskUserQuestion description structure per § 4.5 markdown template; description identifier convention per § 4.6 (`30-design-system-{section}--token-usage.png` — IDENTIFIER ONLY, not disk-written per OPEN-23-01 substitution).

### Cross-Cutting / Carry-Forward

- **D-153:** **Pre-flight `mcp__pencil__get_editor_state` enforcement carries forward** from Phase 23 OPEN-23-14 → Phase 24 D-35 → Phase 25 D-54 → Phase 26 D-87 → Phase 27 D-103 → Phase 28 D-125 → Phase 29 D-140. Every Phase 30 plan that calls `set_variables`, `batch_design`, `find_empty_space_on_canvas`, or any Pencil-mutating tool first calls `mcp__pencil__get_editor_state({ include_schema: false })` and asserts active editor == `design/Crito.pen`. Halt and surface to user on mismatch. No exceptions.

- **D-154:** **PEN-INVENTORY extension pattern carries forward** from Phase 23 D-18 / Phase 24 D-23 / Phase 25 D-56 / Phase 26 D-88 / Phase 27 D-104 / Phase 28 D-126 / Phase 29 D-141. Phase 30 adds:
  - **RECLASSIFICATION update** to the `(joel-only: Design System)` placeholder row (PEN-INVENTORY line 77) per the Phase 29 in-place reclassification pattern (Y2isa + cYlRH precedent): row name `(joel-only: Design System)` → `Design system` (real frame name); add `frame_id: <Plan 30-01 frame id>`; `scope: joel-only-no-crito-ref` (unchanged); `joel_page_map: /design-system page` (unchanged); `child_section_count: 7` (Header + page-intro + Colors + Typography + Components + Utilities + Footer); `status_counts: factored:7`; `reconstruction_priority: medium (Phase 30)` → `n/a (Phase 30 plan 30-01 — reconstructed)`; `open_flag_ids: <OPEN-30-NN as raised at calibration gate>`.
  - **NEW rows** for Plan 30-00 foundation library entries: Section/TokenSwatchGrid + Section/TypeSpecimen + Section/ComponentShowcase (with frame IDs from `set_variables` / `batch_design` returns)
  - **Variant Evidence rows for Phase 30** covering: each new section's slot signature (TokenSwatchGrid + TypeSpecimen + ComponentShowcase per D-149); ComponentShowcase code-snippet-slot binding to Phase 28 `type-semantic-mono-primitive` + `type-semantic-prose-code-block` tokens per D-150; Utilities section visual-approximation evidence (iso-shadow offset-shape composition per D-144); possible new tokens per D-151 plan-execution evaluation
  - **New section `## Open Flags — Phase 30 (OPEN-30-NN)`** populated by D-144 Utilities STUB-level flags + any plan-surfaced flags (likely candidates: Utilities iso-glow/iso-rotate STUB labeling; possible new showcase-internal padding/gap token; possible `type-semantic-prose-code-block` 'provisional' flag verification at Plan 30-01 calibration gate if visual rendering surfaces concerns per Phase 28 D-110 carry-forward; possible new H2 section-divider visual treatment if `space-semantic-section-y` rhythm in docs-density context surfaces concerns)
  - **Updates to:** OPEN-25-07 (Card consumer count — Phase 30 Card gallery instance is 4th cross-phase consumer after Phase 27 Contact sidebar + Phase 28 RelatedPosts × 3 + Phase 29 ProjectCard ships as sibling); OPEN-23-12 (`radius-semantic-pill` status check — Phase 30 ComponentShowcase or token gallery may NOT surface new pill consumers; default leaves OPEN-23-12 carry-forward unchanged); OPEN-23-10 partial-resolution status check (heading-5/-6 token addition for token-gallery TypeSpecimen labels if needed — most likely Phase 30 reuses heading-3/-4 from Phase 28; defer if Plan 30-00 evaluation shows reuse fits)
  - **PAGE-11 status:** INERT for Phase 30 page frame per § 4.3 joel-only branch (no raster to remove)

### Claude's Discretion

- **Auto-layout vs absolute positioning at the page-frame level** — Phase 26/27/28/29 carry-forward: auto-layout vertical-stack at page level. Phase 30 inherits.
- **TokenSwatchGrid tile internal layout** — each tile is a small auto-layout vertical frame: `swatch` (color-fill rectangle with `space-semantic-stack-sm` padding) → `token-name` (Phase 28 `type-semantic-prose-paragraph` or new label-token; plan-execution decides — default reuse) → `resolved-value` caption (`type-semantic-prose-caption` or similar; plan-execution decides). Tile width default ~200-240px; grid auto-layout horizontal-wrap.
- **TypeSpecimen tile internal layout** — each tile is an auto-layout vertical frame: `sample-text` (rendered IN the token being specimen'd — e.g., "The quick brown fox" or token name itself rendered in display-heading) → `token-name` (caption) → `size/weight/line-height` metadata caption. Plan-execution may render specimens horizontally instead of vertically based on visual density needs.
- **ComponentShowcase tile internal layout** — auto-layout vertical or horizontal frame: `label-slot` (component name + variant identifier) → `live-instance-slot` (the actual component ref) → `code-snippet-slot` (rendered with mono-primitive + prose-code-block). Plan-execution decides between vertical (label-above-instance-above-snippet) vs horizontal (label-and-instance-row-with-snippet-below) — defaults vertical for cleanliness.
- **Token-gallery sub-grouping** — D-147 calls for ~107 tokens. Sub-grouping within Colors / Typography / Spacing / Radii can mirror Phase 23 `_Tokens & Foundations` (RpGbe) sub-groupings (which the user sees inline at calibration gate). If RpGbe grouping is unclear, plan-execution probes `RpGbe` structure at Plan 30-01 Task 0 to align.
- **Utilities section visual approximation depth** — D-144 calls for visual approximation where possible; iso-shadow most amenable to Pencil approximation (offset filled shape behind a Card placeholder using `color-semantic-shadow-default` or similar); iso-glow + iso-rotate likely STUB visualizations. Plan-execution may decide all 3 are STUB if visual approximation feels misleading.
- **Spacing-scale token-gallery visualization** — D-147 calls for visualization of the spacing ladder. Default: render each `space-semantic-*` token as a horizontal bar of that exact width with the token name + resolved value beside it (matches Phase 23 23-05 spacing-scale visualization precedent in `_Tokens & Foundations`).
- **Radius-scale token-gallery visualization** — Default: render each `radius-semantic-*` token as a square shape with that radius applied + token name caption.
- **Snapshot_layout discipline at plan close** — matches Phase 24/25/26/27/28/29 chain. Default: yes, runs at every plan close, documented in 30-NN-SUMMARY.md with text-clipping false-positive caveat per phase precedent (Plan 30-01 likely exceeds prior counts due to ~58 instance density). May also trigger OPEN-26-02 stale-cache quirk if subtree caching at calibration gate misbehaves — § 6.4 Tier-1/Tier-2 fallback inherited.
- **Cross-row stale-cache `get_screenshot` quirk on the new page frame** — CALIBRATION-PROTOCOL § 6.4 Tier-1/Tier-2 workarounds available; Phase 30 inherits fallback path per Phase 26-29 production precedent (Tier-2 fallback at calibration gates is the production-proven path on tall page frames).
- **`type-semantic-prose-code-block` SECONDARY validation surface verification** — D-150 ComponentShowcase code-snippet-slot uses prose-code-block. Plan-execution at calibration gate verifies the token renders well in the showcase context (different from Plan 28-02 Blog Post body context). If visual rendering looks wrong, raise OPEN-30-NN.
- **`type-semantic-prose-paragraph` 'provisional' flag final disposition** — Phase 28 Plan 28-02 PRIMARY validation; Phase 29 Plan 29-02 SECONDARY validation. Phase 30 likely doesn't use prose-paragraph heavily (utilitarian docs uses shorter strings + captions). 'Provisional' flag stays unchanged through Phase 30 unless a calibration finding surfaces it.
- **`radius-semantic-pill` token addition** — OPEN-23-12 carry-forward; D-120 default-position is instance-time `9999` cornerRadius override. Phase 30 token-gallery shows the radius surface — if the page-frame demonstrates that the deferred `9999` pattern repeats across the gallery itself, plan-execution may finally justify the token. Default: leave deferred.
- **Sub-section ordering inside Components section** — D-148 defaults Primitives → Compounds → Sections. Within each: Button → Input → Badge → Icon (primitives); Card → BlogCard → ProjectCard → CheckboxGroup (compounds); Header → Footer → CTA → NavBack → TagFilter → RelatedPosts → ResultsMetrics → RelatedProjects (sections — natural canonical-then-variant order; or chronological build order). Plan-execution may pivot for readability.
- **Sibling-note H2 anchor-IDs convention** — D-144 sibling Pencil notes on each H2 frame document v1.3 section IDs (`#introduction`, `#colors`, `#typography`, `#components`, `#utilities`) + brief content note for code-milestone handoff per D-93 belt-and-suspenders convention.
- **Plan 30-01 calibration gate scope decision** — D-152 calls for single calibration gate covering the whole page. If gate description gets unwieldy, plan-execution may split into 2 sub-gates: token-gallery gate (Colors + Typography + Spacing + Radii) + component-gallery gate (Components + Utilities + chassis). Default: single gate per § 4.5 precedent.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope + requirements (must-read)
- `.planning/PROJECT.md` — v2.0 milestone goal, v1.4 abandonment context, single-file strategy, desktop-only scope, "content untouched" boundary (informs D-142 + D-143 utilitarian register + v1.3 verbatim content extraction).
- `.planning/REQUIREMENTS.md` — Phase 30 requirements: PAGE-07 (Design-system reference frame reconstructed — token gallery + component gallery), PAGE-09 (desktop-only), PAGE-11 (INERT for joel-only branch per § 4.3), VALID-01 (per-section fidelity labels — D-83 carry-forward), VALID-02 (calibration artifact — branch-redefined per § 4.1), VALID-03 (gap declaration — OPEN-30-NN flags).
- `.planning/ROADMAP.md` § "Phase 30" — Goal, Depends on (Phase 29), Success Criteria. **Critical reading of success criteria 3:** "uses Phase 25 section components (Section / Header, Section / Footer) at top and bottom — proving the section components compose correctly in a page context other than the homepage" — D-148 Component gallery inclusion of Header + Footer as canonical instances is the literal-interpretation satisfier; Phase 30 IS the cross-page consistency proof for Header + Footer.
- `.planning/STATE.md` — current position: Phase 29 COMPLETE, Phase 30 ready to plan (sequence note: STATE.md "Last activity: 2026-06-09" reflects Phase 29 close; Phase 28 plans status mismatch in ROADMAP table reflects ROADMAP plan count not yet recompiled; orthogonal to Phase 30 readiness).

### CALIBRATION-PROTOCOL.md (definition-of-done framework — must-read at every per-page plan)
- `.planning/research/CALIBRATION-PROTOCOL.md` — Phase 26 Plan 26-03 codify-what-worked.
  - **§ 2 Branch Decision Tree** — Phase 30 Design system page = `joel-only-no-crito-ref` per PEN-INVENTORY line 77.
  - **§ 4 joel-only branch protocol** — § 4.1 VALID-02 (token-usage check against `_Tokens & Foundations` RpGbe); § 4.2 VALID-01 fidelity definitions (EXACT semantic-token binding; APPROXIMATE for utility-section visual approximations; STUB for iso-glow/iso-rotate per D-144); § 4.3 PAGE-11 INERT; § 4.4 per-step script for Plan 30-01; § 4.5 AskUserQuestion format; § 4.6 description identifier convention.
  - **§ 6.4 OPEN-26-02 stale-cache workaround tiering** — Tier-1 (cross-row Update) + Tier-2 (user editor verification fallback). Phase 30 page-frame is tall (~58 instance density); high likelihood of stale-cache quirk at calibration gate per Phase 26-29 precedent — Tier-2 fallback documented.
  - **§ 10.4 FindEmptySpace `nodeId` anchor pattern** — Plan 30-01 anchors on `nodeId: s5k41l` (Phase 29 Project frame). Without anchor, FindEmptySpace may pick library-row Y; with anchor, placement falls on page-frame row y ≈ −4111.

### Phase 29 carry-forward (Phase 30 inherits these decisions directly)
- `.planning/phases/29-projects-reconstruction-index-project-detail/29-CONTEXT.md` — Phase 29 decisions D-127 through D-141. Especially **D-128** (in-place PEN-INVENTORY reclassification pattern — D-154 Phase 30 `(joel-only: Design System)` row reclassification mirrors), **D-129** (Crito-shape Joel-content authority hybrid — D-142 + D-143 inverts to Joel-content authority for utilitarian docs register), **D-134 + D-135** (NEW narrow-scoped section components — D-149 PARTIALLY DEPARTS from this pattern by intentionally factoring all 3 showcase patterns for repetition density), **D-138** (foundation-first plan ordering — D-151 mirrors), **D-139** (per-plan calibration gates with foundation-no-gate exception — D-152 mirrors), **D-140** (pre-flight active-editor — D-153 carry-forward), **D-141** (PEN-INVENTORY extension pattern — D-154 extends).
- `.planning/phases/29-projects-reconstruction-index-project-detail/29-00-SUMMARY.md` (when published) — Plan 29-00 foundation pattern reference; Phase 30 Plan 30-00 mirrors structure.
- `.planning/phases/29-projects-reconstruction-index-project-detail/29-01-SUMMARY.md` + `29-02-SUMMARY.md` (when published) — Phase 29 page-frame composition + calibration patterns; Plan 30-01 inherits page-frame architecture conventions + Plan 30-01 `nodeId: s5k41l` anchor (Phase 29 Project frame id).

### Phase 28 carry-forward (D-150 prose-code-block + mono-primitive token consumers; D-148 BlogCard gallery instance)
- `.planning/phases/28-blog-reconstruction-index-post-tag-page/28-CONTEXT.md` — Phase 28 decisions D-105 through D-126. Especially **D-105** (prose tokens ship; mono-primitive + inline-code + code-block + prose-link + prose-list + heading-3 + heading-4 = 7 new tokens — D-148 Component gallery + D-150 ComponentShowcase code-snippet-slot consume), **D-115** (Section/TagFilter broad-scoping — D-148 Sections gallery includes), **D-116** (narrow-scoping for Section/RelatedPosts — D-148 Sections gallery includes; D-149 departs from narrow-scoping by factoring all 3 showcase patterns), **D-122** (foundation-first plan ordering — D-151 mirrors), **D-124** (per-plan calibration gates with foundation-no-gate exception — D-152 mirrors), **D-125** (pre-flight active-editor — D-153 carry-forward), **D-126** (PEN-INVENTORY extension pattern — D-154 extends).
- `.planning/phases/28-blog-reconstruction-index-post-tag-page/28-02-SUMMARY.md` (when published) — Plan 28-02 Blog Post body PRIMARY validation surface for prose tokens; Phase 30 Plan 30-01 calibration gate is SECONDARY validation for `type-semantic-prose-code-block` per D-150 + D-110 'provisional' flag chain.

### Phase 27 carry-forward (D-150 prose-code-block consumer; D-148 CheckboxGroup gallery instance)
- `.planning/phases/27-thank-you-contact-reconstruction/27-CONTEXT.md` — Phase 27 decisions D-89 through D-104. Especially **D-89** (Hybrid library strategy ships CheckboxGroup + Input variants — D-148 Component gallery includes CheckboxGroup compound), **D-93** (sibling-note belt-and-suspenders convention — D-143 noindex + JSON sibling notes inherit), **D-98** (v1.3 verbatim content extraction discipline — D-143 page-intro inherits), **D-101** (foundation-first plan ordering — D-151 mirrors), **D-102** (per-plan calibration gates — D-152 mirrors), **D-103** (pre-flight active-editor — D-153 carry-forward), **D-104** (PEN-INVENTORY extension pattern — D-154 extends).

### Phase 26 carry-forward (D-149 factoring DEPARTURE from narrow-scoping; § 4 joel-only branch protocol PRIMARY ancestor)
- `.planning/phases/26-faq-404-reconstruction-calibration-workflow-established/26-CONTEXT.md` — Phase 26 decisions D-58 through D-88. Especially **D-58** (fresh-design-in-Crito-vocab — D-142 utilitarian-docs register MODIFIES this by stripping agency polish further), **D-62** (joel-only branch token-usage calibration target — Plan 30-01 calibration gate inherits as primary calibration mode), **D-65** (single calibration gate per plan — D-152 carry-forward), **D-72** (mid-plan user gate precedent for token-value escalation — D-151 Plan 30-00 inherits IF showcase-internal padding/gap surfaces escalation), **D-78** (Section/CTA broad-scoping precedent — D-149 cites contrasting context for showcase-pattern factoring), **D-79** (Section/NavBack narrow-scoping precedent — D-149 INTENTIONALLY DEPARTS from this for showcase patterns based on per-section repetition density), **D-82** (v1.3 content verbatim — D-143 inherits), **D-83** (per-section fidelity labels — D-144 + D-148 inherit), **D-86** (foundation plans close without user gate — D-152 carry-forward), **D-87** (pre-flight active-editor — D-153 carry-forward), **D-88** (PEN-INVENTORY extension pattern — D-154 extends).
- `.planning/phases/26-faq-404-reconstruction-calibration-workflow-established/26-01-SUMMARY.md` (FAQ joel-only branch first production use) — Plan 30-01 inherits calibration script + Tier-2 fallback patterns.
- `.planning/phases/26-faq-404-reconstruction-calibration-workflow-established/26-02-SUMMARY.md` (404 joel-only branch + OPEN-26-02 stale-cache discovery) — Plan 30-01 inherits OPEN-26-02 Tier-2 fallback per § 6.4.

### Phase 25 component library (Phase 30 D-148 instances + Plan 30-00 D-149 extends g9oRa5)
- `.planning/phases/25-section-compound-components/25-CONTEXT.md` — Phase 25 decisions D-38 through D-57. Especially **D-38** (Crito-source nav labels stay literal — Header instances on Phase 30 page frame inherit as-is per D-77), **D-49** (single Card serves all card types via slot content — Phase 28 BlogCard + Phase 29 ProjectCard prove divergence; D-148 Component gallery shows all 3 as separate showcase instances), **D-52** (Pencil 2.13 typed-slot suggestion-only + sibling-note belt-and-suspenders — D-149 sibling notes for 3 new sections inherit), **D-53** (`enabled: true` placeholder slots — D-150 ComponentShowcase code-snippet-slot inherits).
- `.planning/phases/25-section-compound-components/25-01-SUMMARY.md` + `25-02-SUMMARY.md` + `25-03-SUMMARY.md` — Section/Header (G0wNOc), Section/Footer (Xs0Hs), Compound/Card (t40xct) structural details. Phase 30 page frame inherits Header + Footer instances per D-77 carry-forward.

### Phase 24 primitive library (Phase 30 D-148 instances)
- `.planning/phases/24-layout-primitives-primitive-components/24-CONTEXT.md` — Phase 24 decisions D-21 through D-37. Especially **D-22** (Default/Focus/Error compositional minimum forward states — D-148 Component gallery curates 1-2 variants per primitive per D-147), **D-29** (Button iconLeading/iconTrailing slot pattern — gallery showcase mentions but doesn't extensively enumerate), **D-44** (lucide-native Pattern A glyph swap — Icon gallery showcase ships 4 size variants per D-148).
- `.planning/phases/24-layout-primitives-primitive-components/24-05-SUMMARY.md` — primitive ids: Button/Default (M7eUr), Button/Secondary (hIWuC), Badge/Default (j0FxQZ), Badge/Outline (kJQmJ per Phase 28 addition), Input/Default (nwJk7), Icon/24 (u7NmaS plus 16/20/32 variants). Phase 30 D-148 references all.

### Phase 23 token foundation (PRIMARY calibration target via _Tokens & Foundations RpGbe)
- `.planning/phases/23-audit-token-foundation/23-CONTEXT.md` — token-naming convention (D-12 flat-dash), components-reference-semantic-only (D-14 — D-147 + D-149 inherit), OPEN-flag policy (D-09 — informs all OPEN-30-NN additions), PEN-INVENTORY plain-markdown discipline (D-18 — carry-forward chain), Crito .fig fallback (D-04 — may inform token-extension evaluation if mid-plan gate surfaces).
- `.planning/phases/23-audit-token-foundation/23-05-SUMMARY.md` — `_Tokens & Foundations` reference frame RpGbe at top-of-canvas — THIS IS THE PRIMARY CALIBRATION TARGET for Plan 30-01 per § 4.1 VALID-02 + D-62 joel-only branch. Plan 30-01 page frame TokenSwatchGrid + TypeSpecimen tiles must bind to the same semantic tokens RpGbe declares; calibration gate verifies the bindings.
- Phase 23 OPEN flags Phase 30 may resolve / partially resolve:
  - **OPEN-23-10** — heading-2 + heading-3 + heading-4 shipped (Phase 26 + 28); heading-5 + heading-6 remain open. D-147 token gallery TypeSpecimen tile labels likely reuse heading-3/-4 (no new tokens default); Plan 30-00 mid-plan gate may surface heading-5/-6 IF specimen-tile metadata caption needs distinct treatment — default leaves OPEN-23-10 long-tail unchanged.
  - **OPEN-23-12** — `radius-semantic-pill` deferred to instance-time override per Phase 28 D-120. D-147 token gallery Radii surface visualizes the radius ladder — if Phase 30 demonstrates `9999` pattern repeats enough across gallery itself, plan-execution may justify the token; default leaves deferred.

### Phase 26 + 27 + 28 + 29 OPEN flags Phase 30 may resolve or extend
- **OPEN-25-07** — Phase 28 + Phase 29 partial-resolution via BlogCard + ProjectCard sibling-component pattern; Phase 30 Component gallery showcases Card (t40xct) + BlogCard + ProjectCard = 3 distinct compound instances. Pattern fully demonstrated; OPEN-25-07 final disposition documented at Phase 32 milestone close.
- **OPEN-26-02** — stale-cache get_screenshot quirk; CALIBRATION-PROTOCOL § 6.4 Tier-1/Tier-2 workarounds available; Phase 30 page-frame tall (~58 instance density) — high likelihood of trigger at Plan 30-01 calibration gate. Tier-2 fallback path inherited per Phase 26-29 production precedent.
- **OPEN-28-NN** — Phase 28 prose-paragraph 'provisional' flag verification chain. Phase 30 Plan 30-01 page-frame likely doesn't use prose-paragraph heavily (utilitarian docs uses shorter strings + captions) — 'provisional' flag stays unchanged through Phase 30 unless calibration gate surfaces concerns. Phase 30 Plan 30-01 IS a SECONDARY validation surface for `type-semantic-prose-code-block` per D-150.
- **OPEN-29-NN** — Phase 29 deferrals (Screenshots / Testimonial / Built With for Project detail). Phase 30 doesn't address these; remains for future Joel-content phase / code milestone.

### Audit / inventory source (read for every plan in Phase 30)
- `.planning/research/PEN-INVENTORY.md` — single source of truth. Phase 30 plans read:
  - Frame classifications: `(joel-only: Design System)` placeholder row (line 77) → reclassify in-place to real reconstructed `Design system` frame row post-Plan-30-01 APPROVE (D-154 carry-forward of D-128 reclassification pattern)
  - Token surface (107+ tokens after Phase 28 + Phase 29 evaluation; Phase 30 adds 0-2 new tokens per D-151 plan-execution evaluation)
  - Phase 23/24/25/26/27/28/29 Open Flags Phase 30 may resolve at calibration gates (listed above)
  - Phase 30 adds OPEN-30-NN rows per D-154 (Utilities STUB labeling + any plan-surfaced flags)
- `.planning/research/exports/v2.0/end-of-phase-29/id-inventory.json` (when published post-Phase 29 execution) — structural snapshot of `Crito.pen` after Phase 29. Plan 30-00 reads this to know primitive + section + compound ids to instance + baseline ids that must not be mutated. Includes Phase 29 Project frame `s5k41l` id for D-151 + § 10.4 FindEmptySpace anchor on Plan 30-01.

### Ground-truth source files (Phase 30 reads these via Pencil MCP or direct file I/O)
- `design/Crito.pen` — the work surface (Pencil MCP only). Phase 30 mutates:
  - NEW: `Section / TokenSwatchGrid` inside `_Components / Sections` (g9oRa5) per D-149
  - NEW: `Section / TypeSpecimen` inside `_Components / Sections` (g9oRa5) per D-149
  - NEW: `Section / ComponentShowcase` inside `_Components / Sections` (g9oRa5) per D-149 + D-150
  - POSSIBLE NEW: 0-2 tokens per D-151 plan-execution evaluation (showcase-internal padding/gap; heading-5/-6 label tokens) — default NO new tokens
  - NEW: `Design system` page frame per D-151 Plan 30-01
  - Existing frames (Phase 23-29 components + page frames + library parents + 14 Crito-source page frames + RpGbe `_Tokens & Foundations`) are read-only inputs.
- `src/pages/design-system.astro` (lines 1-1202) — Joel's v1.3 design-system page. Content extraction for D-143 + D-144:
  - Page heading: `Design System` (line 32-34)
  - Page-intro body: `Internal reference for Joel and AI coding agents. Components, tokens, and utilities for consistent development.` (line 35-37)
  - Machine-readable JSON link: `/design-system.json` (lines 38-46)
  - noindex robots meta: `<meta name="robots" content="noindex, follow" />` (line 16)
  - Section IDs preserved as sibling notes: `#introduction` (line 31), `#colors` (line 50), `#typography` (line 183), `#components` (line 378), `#utilities` (line 919)
  - Component sub-section structure (Components section): Button (line 384) → Card (line 473) → Input (line 567) → Badge (line 677) → CheckboxGroup (line 787) — v1.3 5-component subset of D-148 full v2.0 library coverage
  - Utility sub-section structure (Utilities section): iso-shadow (line 929) → iso-glow (line 1029) → iso-rotate (line 1088) — D-144 visual approximation Claude's-Discretion
- `src/pages/design-system.json.ts` — v1.3 machine-readable JSON endpoint. Phase 30 page-frame doesn't reconstruct the JSON itself; D-143 sibling note documents endpoint for code milestone.
- `src/components/design-system/DesignSystemNav.astro` — v1.3 sticky sidebar nav. D-145 DROPS the sidebar; sibling note on page-intro section documents v1.3 surface for code milestone.
- `src/components/design-system/TokenSwatch.astro` — v1.3 swatch component pattern. Phase 30 Section/TokenSwatchGrid per D-149 replaces with Pencil-native equivalent.
- `src/components/design-system/ComponentShowcase.astro` — v1.3 component showcase pattern. Phase 30 Section/ComponentShowcase per D-149 + D-150 replaces with Pencil-native equivalent.
- `src/components/design-system/CodeBlock.astro` — v1.3 code-snippet component. Phase 30 ComponentShowcase code-snippet-slot per D-150 replaces with prose-code-block + mono-primitive Pencil-native rendering.
- `src/styles/global.css` — v1.3 CSS source for iso-shadow / iso-glow / iso-rotate utilities (Utilities section content reference per D-144).

### v2.0 research (cross-cutting context)
- `.planning/research/SUMMARY.md` — themes T1 (variables-first — Phase 30 adds 0-2 new tokens per D-151 evaluation; primarily INSTANCES the surface), T5 (don't repeat v1.4 — calibration gates enforce per-section labels), T6 (single-file strategy — Design system frame inside `Crito.pen`), T8 (component variants on-demand only — D-149 INTENTIONALLY DEPARTS to factor 3 showcase patterns for in-phase repetition density, NOT for hypothetical future consumers).
- `.planning/research/STACK.md` — Pencil MCP tool catalogue. `find_empty_space_on_canvas` with `nodeId` anchor (D-151 + § 10.4), `get_screenshot` (calibration artifacts — inline-only per OPEN-23-01 substitution), `set_variables` (used in Plan 30-00 IF showcase token surfaces per D-151), `batch_design` (3 new components in Plan 30-00 + 1 page frame in Plan 30-01).
- `.planning/research/PITFALLS.md` — Pitfall 1 (no inventing primitives without source — D-149 acknowledged tension: factoring 3 new sections WITHOUT external source-evidence, justified by in-phase repetition density not by per-section source; sibling-note documentation enforces honesty), Pitfall 4 (PAGE-11 NEVER hide raster before APPROVE — INERT for joel-only Phase 30 per § 4.3), Pitfall 6 (snapshot_layout text-clipping false-positive — documented per phase precedent), Pitfall 7 (no premature component variants — D-147 curated 1-2 variants per component honors this; D-148 Header + Footer single canonical instance honors this), Pitfall O5 (single-consumer component anti-pattern — D-149 INTENTIONALLY DEPARTS with documented rationale: in-phase repetition density justifies; future v3 milestone plausibility argued).

### Pencil MCP guidance (consulted during execution, not pre-read at planning)
- `mcp__pencil__get_editor_state({ include_schema: false })` — call FIRST in every 30-NN plan per D-153.
- `mcp__pencil__get_guidelines({ topic: "design-system" })` — call at start of Plan 30-00 (Component authoring guidance, slot mechanics for 3 new components).
- `mcp__pencil__get_variables({})` — call to verify 107+-token surface intact at Plan 30-00 start; re-call at every plan close to verify drift expectations (Phase 30 ships 0-2 new tokens per D-151).
- `mcp__pencil__batch_get` — verify baseline IDs intact (Phase 23-29 components + page frames + library parents + RpGbe).
- `mcp__pencil__batch_design` — Plan 30-00 (3 new library entries), Plan 30-01 (Design system page frame + content with ~58 visual artifacts).
- `mcp__pencil__find_empty_space_on_canvas` — Plan 30-01 page-frame placement per D-151 + § 10.4 (nodeId anchor pattern on `s5k41l`).
- `mcp__pencil__get_screenshot` — calibration artifacts per CALIBRATION-PROTOCOL § 4.5 step 9 (inline-only, NOT disk-written per OPEN-23-01 substitution).
- `mcp__pencil__snapshot_layout({ problemsOnly: true })` — per-plan close per Phase 24-29 precedent.

### Outputs this phase produces (referenced by Phase 31+)
- 1 new page frame in `design/Crito.pen`: `Design system` (Plan 30-01), PAGE-11 INERT (no raster).
- 3 new library entries: `Section / TokenSwatchGrid`, `Section / TypeSpecimen`, `Section / ComponentShowcase`. Library count: 16 → 19.
- Possible 0-2 new tokens per D-151 plan-execution evaluation (showcase-internal padding/gap; heading-5/-6 specimen labels). Default: no new tokens.
- `.planning/research/PEN-INVENTORY.md` extensions per D-154 (reclassification of `(joel-only: Design System)` placeholder row + new rows for 3 sections + Variant Evidence rows + Token Extensions if applicable + OPEN-30-NN section).
- `.planning/research/exports/v2.0/end-of-phase-30/id-inventory.json` — structural snapshot per OPEN-23-01 substitution pattern (matches Phase 23-29 precedent).

</canonical_refs>

<code_context>
## Existing Code Insights

**Phase 30 makes NO `src/` code changes.** v2.0 is `.pen`-file-only (per PROJECT.md + REQUIREMENTS.md Out of Scope). The code-side observations below are content-extraction context only — they do NOT shape Phase 30 visual decisions, which follow the joel-only-no-crito-ref branch per D-142 + D-145 + D-146 (Crito-vocab utilitarian-docs register, linear long-scroll, 1440 page-frame conventions).

### Reusable Assets (content-only references)
- `src/pages/design-system.astro` (lines 1-1202) — v1.3 design-system page. Primary content extraction source:
  - Page-intro: lines 31-47 → D-143 verbatim H1 + body + JSON-link secondary line + 2 sibling Pencil notes (noindex + JSON endpoint)
  - Section IDs + structure: 5 top-level sections (introduction / colors / typography / components / utilities) → D-144 mirror
  - Color sub-sections: Primary Accent / Text Variants / Neutral / Usage Guidelines (lines 50-181) → D-147 token gallery sub-grouping reference
  - Typography sub-sections: Font Families / Type Scale / Font Weight / Line Height (lines 183-376) → D-147 token gallery sub-grouping reference
  - Component sub-sections: Button / Card / Input / Badge / CheckboxGroup (lines 378-917) → D-148 v2.0 library is SUPERSET (adds Icon + BlogCard + ProjectCard + 8 sections)
  - Utility sub-sections: iso-shadow / iso-glow / iso-rotate (lines 919-1200) → D-144 visual approximation Claude's-Discretion treatment
  - Visual style (yellow neobrutalist + Bricolage Grotesque + uppercase H2 + turquoise left-border H2 accent) explicitly NOT inherited per D-58 + D-142 utilitarian-docs Crito-vocab register
- `src/pages/design-system.json.ts` — v1.3 machine-readable JSON endpoint. D-143 sibling note documents existence for code milestone.
- `src/components/design-system/DesignSystemNav.astro` — v1.3 sticky sidebar nav. D-145 DROPS the sidebar in Phase 30 reconstruction; sibling note documents v1.3 surface for code milestone.
- `src/components/design-system/TokenSwatch.astro` (v1.3 swatch component) + `src/components/design-system/ComponentShowcase.astro` (v1.3 showcase component) + `src/components/design-system/CodeBlock.astro` (v1.3 code-snippet component) — Phase 30 D-149 + D-150 ship Pencil-native equivalents (Section/TokenSwatchGrid + Section/ComponentShowcase + ComponentShowcase code-snippet-slot); v1.3 components are replaced when code milestone consumes the v2.0 .pen.
- `src/styles/global.css` — v1.3 CSS source for iso-shadow / iso-glow / iso-rotate utilities + design tokens. D-144 sibling Pencil notes on Utilities sub-sections document actual CSS mechanics for code-milestone re-implementation.

### Established Patterns (Pencil-side, ARE Phase 30 inputs)
- **Variables-first → primitives → compounds → sections → page frames** — Phase 23 tokens, Phase 24 primitives, Phase 25 sections + compounds, Phase 26-29 per-page reconstructions, Phase 30 seventh per-page phase (sixth after Phase 29 to potentially extend the token surface; minimal-extension expected per D-151).
- **Single-file strategy** — everything in `design/Crito.pen`. Phase 30 page frame placed at the page-frame row (y ≈ −4111) via FindEmptySpace nodeId anchor pattern from CALIBRATION-PROTOCOL § 10.4 (Plan 30-01 anchors on Phase 29 Project frame `s5k41l`).
- **OPEN-flag system** — Phase 30 extends with `OPEN-30-NN` rows per D-154.
- **Pre-flight active-editor assertion** — D-153 carries forward from Phase 29 D-140 / Phase 28 D-125 / Phase 27 D-103 / Phase 26 D-87 / Phase 25 D-54 / Phase 24 D-35 / Phase 23 OPEN-23-14.
- **Plain-markdown audit trails** — Phase 23 D-18 / Phase 24 D-23 / Phase 25 D-56 / Phase 26 D-88 / Phase 27 D-104 / Phase 28 D-126 / Phase 29 D-141 pattern. Phase 30 D-154 extends.
- **Probe-first within plans** — Phase 24-29 established. Phase 30 Plan 30-01 probes RpGbe (`_Tokens & Foundations`) structure at Task 0 IF token-gallery sub-grouping unclear; otherwise instances directly per D-147 default.
- **Belt-and-suspenders sibling-note documentation** — Phase 25 D-52 / Phase 26 D-78 / Phase 27 D-93 / Phase 28 D-111 / Phase 29 D-132 pattern. D-143 (noindex + JSON), D-144 (section IDs + Utilities CSS), D-145 (v1.3 sidebar), D-149 (slot signatures for 3 new sections) all inherit.
- **Per-section fidelity labels with LAYOUT/TEXT split** — D-83 (Phase 26) precedent. D-144 Utilities inherits (likely APPROXIMATE iso-shadow + STUB iso-glow + STUB iso-rotate). Token gallery sections EXACT (token bindings are the definitional surface). Component gallery sections EXACT (instances bind to canonical primitives).
- **CALIBRATION-PROTOCOL joel-only-no-crito-ref branch** — Phase 26 Plans 26-01 + 26-02 + Phase 27 Plan 27-01 + Phase 28 Plan 28-03 production-proven. Phase 30 Plan 30-01 is the FIFTH production use of the joel-only branch.
- **Anti-over-factoring discipline carry-forward** — Phase 26 D-79 + Phase 28 D-116 + Phase 29 D-134. Phase 30 D-149 INTENTIONALLY DEPARTS with documented rationale (in-phase repetition density justifies; future v3 milestone plausibility argued) — NOT applied as broad license to factor speculatively. The departure is bounded: 3 specific patterns with concrete in-phase consumer count justification, not category-level "more factoring everywhere."
- **In-place PEN-INVENTORY reclassification** — Phase 29 D-128 established (Y2isa + cYlRH token-mining-only → IN-SCOPE reconstructed). Phase 30 D-154 extends pattern to `(joel-only: Design System)` placeholder row (line 77) → real reconstructed `Design system` frame row.

### Integration Points
- **CALIBRATION-PROTOCOL.md is the definition-of-done framework** — Plan 30-01 consults at plan-time (joel-only branch § 4 sub-protocol).
- **`_Tokens & Foundations` reference frame RpGbe is the PRIMARY calibration target** — per D-62 + § 4.1 VALID-02. Plan 30-01 calibration AskUserQuestion description structures itself around: "Does the Design system page frame's TokenSwatchGrid + TypeSpecimen + ComponentShowcase tile-bindings match the canonical surface declared in RpGbe?"
- **Phase 30 is the cross-page consistency proof for Header + Footer** — per ROADMAP success criterion 3. Phase 30 D-148 Component gallery + page-frame chassis both instance Header + Footer; Phase 31 Homepage extends with second user-facing consumer.
- **Phase 30 IS the v2.0 library reference** — D-148 honest about all 4 primitives + 4 compounds + 8 sections shipped in Phases 23-29. v1.3 design-system.astro's 5-component subset (Button + Card + Input + Badge + CheckboxGroup) is preserved in the Components section + extended with the v2.0 additions.
- **PEN-INVENTORY Frames Inventory table** — Phase 30 RECLASSIFIES 1 existing placeholder row in-place (joel-only Design System line 77) per D-154 + D-128 carry-forward. Parallels Phase 29 reclassification pattern for the only remaining joel-only placeholder in v2.0 scope.

</code_context>

<specifics>
## Specific Ideas

- **The factoring departure at D-149 is the most deliberate Phase 30 reading** — Phase 26 D-79 + Phase 28 D-116 + Phase 29 D-134 established narrow-scoping as v2.0's anti-over-factoring discipline (single-consumer → don't factor speculatively). Phase 30 D-149 intentionally departs by factoring all 3 showcase patterns. The rationale is bounded: (a) per-section repetition density inside Phase 30 alone (~58 instances) makes inline-composition structurally bloated; (b) a future v3 design-system overhaul milestone is plausible (not invented — Phase 30 IS the design-system route and any future expansion would re-consume); (c) the departure is at the SECTION-pattern level, not at the primitive/compound level — sibling-note belt-and-suspenders per D-93 enforces honesty. The narrow-scoping discipline carries forward at the primitive/compound level (Phase 30 doesn't invent new primitives or compounds).
- **The utilitarian register at D-142 inverts the Phase 28-29 marketing-page polish lean** — Phase 28 Blog + Phase 29 Projects shipped at Crito-polished agency-quality because those surfaces ARE marketing surfaces. Phase 30 design-system is internal-only (noindex per v1.3 line 15-16). Honest-to-purpose register means stripping marketing chrome (no hero band, no decorative bg fills, no Section/CTA close). Section/Header + Section/Footer still wrap (consistency with Phase 26-29 + ROADMAP success criterion 3), but interior register is utilitarian. This is a Phase 30-specific call that doesn't propagate to Phase 31 Homepage (which IS marketing-polish).
- **The Component gallery at D-148 covers 16 distinct components vs v1.3's 5** — v1.3 design-system.astro shows only Button / Card / Input / Badge / CheckboxGroup (5 components — natural for v1.3 since that was the library at v1.3). Phase 30 surfaces all 4 primitives + 4 compounds + 8 sections from v2.0 = 16 components. The Components section is the largest sub-section of the page frame. Sub-section ordering Primitives → Compounds → Sections matches build order + composition-direction order.
- **PAGE-11 INERT applies for the FIFTH time in v2.0** — Phases 26 (FAQ + 404), 27 (Thank-you), 28 (Tag), 30 (Design system) = 5 joel-only-no-crito-ref branch consumers; PAGE-11 INERT for each. Contrasts with PAGE-11 ACTIVE pattern (Phase 27 Contact cl8tt → Phase 28 Blog DzqTm + Blog Post w1m3x → Phase 29 Projects Y2isa + Project cYlRH = 5 production uses). v2.0's two-branch matrix is now balanced 5-5 after Phase 30 ships.
- **In-place PEN-INVENTORY reclassification at D-154 closes the last joel-only placeholder in v2.0 scope** — Phase 29 D-128 reclassified 2 Crito-source token-mining-only rows. Phase 30 D-154 reclassifies the last placeholder row (line 77 `(joel-only: Design System)`). After Phase 30, every IN-SCOPE row in PEN-INVENTORY's Frames Inventory is either reconstructed-PHASE-NN, IN-SCOPE-being-reconstructed (Phase 31 Homepage), or IN-SCOPE-token-mining-only-long-tail (04_About — Phase 32 disposition).
- **`type-semantic-prose-code-block` SECONDARY validation surface at Plan 30-01** — Phase 28 Plan 28-02 Blog Post body PRIMARY validation. Phase 30 ComponentShowcase code-snippet-slot SECONDARY. If both surfaces look right, prose-code-block 'provisional' flag clears for Phase 32 close.
- **Plan 30-01 calibration scope is the broadest single-plan calibration in v2.0** — 5 sections + ~58 visual artifacts. May trigger OPEN-26-02 stale-cache quirk per § 6.4; Tier-2 user-editor verification fallback inherited per Phase 26-29 production precedent. Plan-execution discretion to split into 30-01 + 30-02 stays available per D-151 if scope-vs-attention warrants.

</specifics>

<deferred>
## Deferred Ideas

- **Sticky sidebar nav `Section / SidebarNav` component** — D-145 DROPS v1.3 sidebar; sibling Pencil note documents existence. If Phase 31 Homepage or future v3 milestone needs a sidebar pattern, factor then per emerging-consumer rule.
- **Section/CTA marketing close at bottom of design-system page** — D-142 utilitarian-docs register declines; if Phase 30 turns out to need a "back to homepage" or "see live site" link, ship as Phase 27 D-99 secondary-text-link pattern (Phase 29 D-133 second consumer) rather than Section/CTA.
- **TOC band at top of content** — discussed during Area 2 Layout architecture; declined in favor of linear long-scroll. Could re-introduce in future milestone as a Section/SecondaryLink third-consumer (Phase 27 D-99 + Phase 29 D-133 are prior 2; a Phase 31 or v3 third consumer would justify factoring `Section / SecondaryLink` per emerging-consumer rule).
- **Sticky positioning behavior in Pencil-rendered frames** — D-92 / D-59 static-design carry-forward + D-145 explicit decline. Code milestone wires sticky behavior; .pen represents structural READING state only.
- **Exhaustive every-variant component gallery (v1.3 parity)** — D-147 declines in favor of curated 1-2 variants per component. If future v3 milestone needs exhaustive variants for a documentation surface, extend D-148 then.
- **Code-snippet exhaustive variant matrix** — D-150 ships canonical default-variant snippet only. Code milestone re-implements with templated variant snippets at runtime.
- **Hover/focus/disabled state visualization in ComponentShowcase** — D-92 / D-59 carry-forward. Code milestone implements interactive states; Phase 30 ComponentShowcase shows static READING state only.
- **Joel-brand fonts (Bricolage Grotesque, DM Sans) + neobrutalist colors in Phase 30 frame** — PROJECT.md says these "still planned to be replaced when code milestones run on top of v2.0" (Out of Scope). Phase 30 explicitly NOT introducing them per D-58 + D-142 carry-forward.
- **Joel's v1.3 4-link Header nav override (Blog / Projects / FAQ / Contact)** — Phase 25 D-38 + Phase 26 D-77 + Phase 27 + Phase 28 + Phase 29 carry-forward chain: defers to Phase 31 Homepage instance time. Phase 30 inherits.
- **Joel-brand logo / wordmark in Section/Header logo slot** — Phase 25 D-40 deferred; Phases 26-29 do not address. Phase 30 instances inherit Crito-source logo placeholder.
- **`type-semantic-prose-paragraph` 'provisional' flag verification** — Phase 28 Plan 28-02 PRIMARY validation; Phase 29 Plan 29-02 SECONDARY validation. Phase 30 likely doesn't use prose-paragraph heavily — flag stays unchanged through Phase 30 unless calibration surfaces concerns.
- **`type-semantic-prose-code-block` 'provisional' flag final disposition** — D-150 Plan 30-01 SECONDARY validation; if both Plan 28-02 + Plan 30-01 surfaces look right, flag clears at Phase 32 close.
- **`radius-semantic-pill` token addition** — OPEN-23-12 / Phase 28 D-120 / Phase 29 D-141 deferred to instance-time `9999` cornerRadius override. Phase 30 Radii token-gallery surface visualizes radius ladder — could surface `9999` pattern enough to justify; defer otherwise.
- **`type-semantic-heading-5` + `type-semantic-heading-6` token additions** — OPEN-23-10 long-tail. Phase 30 Plan 30-00 evaluation per D-151 may or may not need these for TypeSpecimen tile metadata captions; default reuse of heading-3/-4 from Phase 28.
- **Showcase-internal padding/gap tokens (e.g., `space-semantic-showcase-tile-gap`)** — Plan 30-00 mid-plan gate per D-151. Default: reuse existing `space-semantic-stack-*` + `space-semantic-inline-*` ladder.
- **Code-milestone `/design-system` route rewrite** — out of v2.0 scope. v1.3 route keeps rendering on v1.3 code throughout v2.0. Code milestone must refactor `src/pages/design-system.astro` + JSON endpoint + companion components (DesignSystemNav, TokenSwatch, ComponentShowcase, CodeBlock) to consume Phase 30's Pencil-native section components + token bindings.
- **JSON endpoint surface reconstruction in Pencil** — v1.3 `/design-system.json.ts` programmatically generates a JSON token+component manifest. NOT reconstructable in Pencil (it's a code-side serialization concern); D-143 sibling note preserves intent for code milestone.
- **iso-shadow / iso-glow / iso-rotate as Pencil-native components** — D-144 ships visual approximations in the Utilities section but NOT factored as library components (no other v2.0 consumer; CSS-only utility surface). If future v3 needs a Pencil-native shadow component, factor then.
- **Multi-theme token-gallery rendering** — v1.3 design-system.astro shows dark-mode swatches alongside light-mode (e.g., TokenSwatch component shows light + dark variants). Phase 30 ships LIGHT-MODE ONLY per TOKEN-07 dark-mode deferral + Phase 23 D-01 single-theme. Sibling note on Colors section documents v1.3 dual-mode rendering for future dark-mode milestone.
- **`Section / SecondaryLink` consolidation** — D-145 + D-133 + D-99 are 2 consumers of the inline-text-link-with-iconLeading pattern. Not factored. If Phase 31 Homepage adds a third (e.g., a "View more projects" link in a homepage projects strip), factor then.
- **04_About frame final disposition** — Phase 29 partial-resolution leaves only 04_About as token-mining-only carry-forward in OPEN-23-05. Phase 30 doesn't address; Phase 32 milestone-close sweep + handoff doc records the final disposition.

</deferred>

---

*Phase: 30-design-system-reference-reconstruction*
*Context gathered: 2026-06-09*

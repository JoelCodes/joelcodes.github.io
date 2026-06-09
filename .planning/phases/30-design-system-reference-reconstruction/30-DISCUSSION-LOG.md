# Phase 30: Design System Reference Reconstruction - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-09
**Phase:** 30-design-system-reference-reconstruction
**Areas discussed:** Page register / vibe, Layout architecture, Gallery breadth, Showcase-pattern factoring

---

## Gray Area Selection

| Option | Description | Selected |
|--------|-------------|----------|
| Page register / vibe | Crito polished marketing-quality vs utilitarian internal-docs vs hybrid (Crito-vocab chrome but stripped section ornamentation) | ✓ |
| Layout architecture | Sticky sidebar nav (lg:grid-cols-[250px_1fr] like v1.3 DesignSystemNav) vs linear long-scroll. Sidebar would need a new Section/SidebarNav component | ✓ |
| Gallery breadth | Exhaustive every-variant (every Button purpose/size/state from Phase 24 D-22 forward set + every Badge variant + every Icon size 16/20/24/32 + every Card slot example) vs curated representative | ✓ |
| Showcase-pattern factoring | Ship NEW library components (Section/TokenSwatchGrid, Section/ComponentShowcase, possibly Section/TypeSpecimen) vs inline composition (Phase 30 is the only known consumer — Pitfall O5/O6 single-consumer rule) | ✓ |

**User's choice:** All 4 areas selected for discussion.

---

## Page register / vibe

### Q1: What register should the /design-system page-frame ship in?

| Option | Description | Selected |
|--------|-------------|----------|
| Utilitarian internal docs | Honest to v1.3's role — this page is 'Internal reference for Joel and AI coding agents'. Minimal section chrome, no decorative bg fills, no hero band, dense gallery layout. Matches D-58 'Crito-vocab' but explicitly strips agency polish | ✓ |
| Hybrid: Crito vocab, docs density | Use Crito-vocab section components but keep per-section internals docs-dense — no hero band, no decorative blocks, just structured gallery sections | |
| Crito polished agency | Full agency aesthetic, matches Phase 28-29 quality bar. Hero band, decorative bg fills, Section/CTA at bottom | |

**User's choice:** Utilitarian internal docs
**Notes:** Honest-to-purpose register. Drops marketing chrome (no hero band, no decorative bg fills, no Section/CTA close). Keeps Crito-vocab section components (Section/Header + Section/Footer + semantic tokens). Reads like a docs site, not a sales page. → D-142.

### Q2: Page-intro content + meta — v1.3 verbatim, or freshen?

| Option | Description | Selected |
|--------|-------------|----------|
| v1.3 verbatim + sibling notes | H1: 'Design System' / body: 'Internal reference for Joel and AI coding agents. Components, tokens, and utilities for consistent development.' + sibling Pencil notes documenting (a) noindex robots meta from v1.3 line 16, (b) /design-system.json link from lines 38-46 — both preserved as wiring notes for code milestone (D-93 belt-and-suspenders precedent) | ✓ |
| Lightly rewritten + sibling notes | Keep structure but freshen language. Same sibling notes. Pushes against D-82+D-98 carry-forward without strong rationale | |
| v1.3 verbatim, skip sibling notes | Just H1 + body verbatim. Skip noindex and JSON-link sibling notes — code-milestone concerns. Risks losing wiring intent at handoff | |

**User's choice:** v1.3 verbatim + sibling notes
**Notes:** D-82 + D-98 + D-123 content-extraction discipline carries forward. Two sibling Pencil notes added for noindex + JSON endpoint preservation. → D-143.

### Q3: Top-level section coverage — mirror v1.3's 5 sections, or different?

| Option | Description | Selected |
|--------|-------------|----------|
| Mirror v1.3: 5 sections | Page-intro → Colors → Typography → Components → Utilities. Matches v1.3 section IDs (#introduction, #colors, #typography, #components, #utilities). Each H2 carries sibling Pencil note with section ID + brief content note for code-milestone handoff | ✓ |
| Trim to 4 sections | Drop Utilities entirely as OPEN-30-NN deferral. Cleaner Phase 30 surface but loses v1.3 surface parity | |
| 5 sections, Utilities = STUB | Mirror v1.3 but ship Utilities as STUB section with heading + sibling note. Preserves surface parity + honest about deferral | |

**User's choice:** Mirror v1.3: 5 sections
**Notes:** Utilities section content treatment is Claude's-Discretion at plan-execution per D-144 — iso-shadow renderable as visual approximation; iso-glow + iso-rotate likely STUB visualizations. → D-144.

---

## Layout architecture

### Q1: Page-frame layout architecture — sidebar vs linear?

| Option | Description | Selected |
|--------|-------------|----------|
| Linear long-scroll | Matches every other v2.0 page frame. Vertical-stack Section/Header → page-intro → Colors → Typography → Components → Utilities → Section/Footer. No sticky sidebar. Drops v1.3 DesignSystemNav (sticky 250px sidebar from line 22-26) — sibling note documents v1.3 had a sidebar; code milestone re-introduces or removes. Sticky behavior doesn't render in Pencil anyway + utilitarian-docs register doesn't require nav chrome | ✓ |
| Linear + TOC band at top | Linear with inline TOC band (horizontal frame of 5 text-link anchors). Section/SecondaryLink pattern would have its 3rd consumer here (Phase 29 D-133 back-nav + Phase 27 D-99 Return-to-homepage are prior 2). Adds light nav utility without committing to a sidebar component | |
| Sticky sidebar (v1.3 mirror) | 2-col grid: 250px sticky sidebar + 1fr content. New Section/SidebarNav component (lives in g9oRa5) with 5 link items. Sticky behavior NOT rendered by Pencil. Risks Pitfall O5/O6 single-consumer (no other Joel page has a sidebar). High-investment if Phase 30 is the only consumer | |

**User's choice:** Linear long-scroll
**Notes:** Consistent with Phase 26-29 rhythm. Sticky doesn't render in Pencil + utilitarian-docs register doesn't need nav chrome + Pitfall O5/O6 single-consumer prevention. → D-145 + D-146.

---

## Gallery breadth

### Q1: How comprehensive should the galleries be?

| Option | Description | Selected |
|--------|-------------|----------|
| Tokens exhaustive, components curated | Token gallery shows ALL ~107 tokens (cheap — just swatches + specimens). Component gallery shows one canonical default + 1–2 representative variants per component. ~40-50 visual artifacts total. Honest documentation of token surface + variant matrix already lives at primitive level for downstream agents to discover | ✓ |
| Both exhaustive (v1.3 parity) | Every variant of every primitive (Button 4×3=12, Input ≥6, Badge ≥6, Icon 4 sizes, Card 3 slot examples) + every token. ~90-100 visual artifacts. Matches v1.3's ~1200-LOC depth | |
| Both curated | Token gallery shows representative samples per category. Component gallery one canonical default + 1 notable variant per component. ~25-30 visual artifacts. Smallest surface; risks losing token-surface visibility | |

**User's choice:** Tokens exhaustive, components curated
**Notes:** Honest documentation of full ~107-token surface (Phase 23 + 28 expansion); curated 1-2 variants per component because variant matrices already live at the primitive-component level. → D-147.

### Q2: Which components make the curated gallery?

| Option | Description | Selected |
|--------|-------------|----------|
| Full v2.0 library | All 4 primitives + 4 compounds + 8 sections from Phase 24-29. This IS the v2.0 library reference — honest about everything Phase 23-29 shipped. Sub-section order: Primitives → Compounds → Sections | ✓ |
| v1.3 parity (5 components) | Just Button + Card + Input + Badge + CheckboxGroup like v1.3. Drops Icon + BlogCard + ProjectCard + all sections from gallery. Loses v2.0 library visibility | |
| Primitives + Compounds only | 4 primitives + 4 compounds; skip section gallery. Argues sections are already 'visible' on every other v2.0 page frame, so dedicated showcase is redundant | |

**User's choice:** Full v2.0 library
**Notes:** Header + Footer canonical instances count as the cross-page consistency proof per ROADMAP success criterion 3. → D-148.

---

## Showcase-pattern factoring

### Q1: Showcase patterns repeat ~5-10x within Phase 30. Factor them as new library components, or inline-compose?

| Option | Description | Selected |
|--------|-------------|----------|
| Inline-compose all | No new library components. Each showcase block composed inline. Honors single-consumer rule established by Phase 26 D-79 + Phase 28 D-116 + Phase 29 D-134 narrow-scoping precedent | |
| Factor token-gallery patterns only | Ship NEW narrow-scoped Section/TokenSwatchGrid + Section/TypeSpecimen. DO NOT factor component-gallery showcase blocks. Library count moves 16 → 18 | |
| Factor all 3 showcase patterns | Ship Section/TokenSwatchGrid + Section/TypeSpecimen + Section/ComponentShowcase as new library entries. Component-showcase shape: label + live instance + optional sibling code-snippet text. Library count 16 → 19 | ✓ |

**User's choice:** Factor all 3 showcase patterns
**Notes:** Intentionally departs from the Phase 26 D-79 + Phase 28 D-116 + Phase 29 D-134 single-consumer narrow-scoping precedent. Bounded rationale: per-section repetition density inside Phase 30 alone (~58 instances) + future v3 design-system overhaul milestone plausibility + sibling-note belt-and-suspenders enforces honesty. Narrow-scoping discipline carries forward at primitive/compound level. → D-149.

### Q2: Should Section/ComponentShowcase include a code-snippet slot?

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — code-snippet slot | ComponentShowcase slot signature: label-slot + live-instance-slot + optional code-snippet-slot (using Phase 28 prose-code-block token + mono-primitive). v1.3 uses CodeBlock heavily. Each component-gallery instance ships with snippet showing canonical default-variant usage | ✓ |
| Yes — but enabled:false default per Phase 25 D-53 | Same signature, but code-snippet-slot ships with enabled: false default. Consumers opt-in. Realistically every Phase 30 instance turns it on — noise without benefit | |
| No — skip code snippets entirely | ComponentShowcase = label-slot + live-instance-slot only. Code-snippet deferred to code milestone | |

**User's choice:** Yes — code-snippet slot
**Notes:** The snippets ARE the docs. Each component-gallery instance ships a canonical default-variant snippet (e.g., `<Button variant="yellow">Click</Button>`) — NOT exhaustive across variants. Phase 30 Plan 30-01 calibration gate is SECONDARY validation surface for `type-semantic-prose-code-block` per D-110 chain. → D-150.

---

## Claude's Discretion

Items where plan-execution will resolve at execution time per documented defaults:

- **Utilities section visual approximation depth** (D-144) — iso-shadow likely APPROXIMATE rendering as offset filled shape behind a Card placeholder; iso-glow + iso-rotate likely STUB visualizations. Plan-execution may decide all 3 are STUB if approximation feels misleading.
- **Spacing-scale + Radius-scale token-gallery visualizations** (D-147) — default render conventions per Phase 23 23-05 precedent.
- **Token-gallery sub-grouping within Colors / Typography / Spacing / Radii** (D-147) — mirror Phase 23 `_Tokens & Foundations` RpGbe sub-groupings; plan-execution probes RpGbe at Plan 30-01 Task 0 if grouping unclear.
- **Sub-section ordering inside Components section** (D-148) — default Primitives → Compounds → Sections; within each, build order. Plan-execution may pivot for readability.
- **TokenSwatchGrid + TypeSpecimen + ComponentShowcase tile internal layouts** (D-149) — auto-layout vertical or horizontal-wrap; plan-execution decides based on visual-density needs.
- **Plan structure split** (D-151) — default 2 plans (30-00 foundation + 30-01 page-frame composition); plan-execution may split into 30-00 + 30-01 + 30-02 if scope-vs-attention warrants per § 6.4 stale-cache-quirk risk on tall page-frames.
- **Plan 30-00 mid-plan token gate** (D-151) — fires ONLY if showcase-internal padding/gap or component-showcase code-snippet typography surfaces escalation; default NO new tokens.
- **Plan 30-01 calibration gate scope** (D-152) — single gate covering full page; may split into token-gallery + component-gallery sub-gates if description gets unwieldy.

---

## Deferred Ideas

Ideas surfaced during discussion that belong in other phases / milestones:

- **Sticky sidebar nav `Section / SidebarNav` component** — D-145 declined for Phase 30; defer until 2nd consumer surfaces (Phase 31 Homepage or future v3 milestone).
- **TOC band at top of content** — declined in favor of linear long-scroll. Section/SecondaryLink third-consumer might justify factoring if Phase 31 Homepage or v3 milestone adds one.
- **Section/CTA marketing close at bottom** — D-142 declined for utilitarian-docs register.
- **Exhaustive every-variant component gallery (v1.3 parity)** — D-147 declined in favor of curated 1-2 variants; future v3 milestone might revisit.
- **Code-snippet exhaustive variant matrix** — D-150 ships canonical default-variant snippets only; code milestone re-implements with templated variant snippets.
- **Hover/focus/disabled state visualization in ComponentShowcase** — Phase 30 shows static READING state only; code milestone wires interactive states.
- **Joel-brand fonts + neobrutalist colors** — out of v2.0 scope per PROJECT.md; code milestone re-introduces.
- **Joel's v1.3 4-link Header nav override** — defers to Phase 31 Homepage instance time per carry-forward chain.
- **Joel-brand logo / wordmark in Section/Header logo slot** — Phase 25 D-40 deferred; carry-forward.
- **Multi-theme token-gallery rendering (light + dark mode swatches side-by-side)** — out of v2.0 scope per TOKEN-07; future dark-mode milestone.
- **iso-shadow / iso-glow / iso-rotate as Pencil-native components** — D-144 ships visual approximations only; no library factoring (CSS-only utility surface; single Phase 30 consumer).
- **JSON endpoint surface reconstruction in Pencil** — not reconstructable (code-side serialization concern); D-143 sibling note preserves intent.
- **`Section / SecondaryLink` consolidation** — 2 consumers (D-133 + D-99); not enough to factor. Phase 31 Homepage may add 3rd.
- **04_About frame final disposition** — token-mining-only carry-forward; Phase 32 milestone close addresses.

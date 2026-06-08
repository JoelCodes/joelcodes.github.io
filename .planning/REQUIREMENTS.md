# Requirements: v2.0 Prep Crito Design File

**Milestone:** v2.0 Prep Crito Design File
**Last updated:** 2026-05-31

This document scopes what v2.0 will deliver. Each requirement is testable, atomic, and traceable to one phase. Categories follow the FEATURES.md building-block grouping.

---

## Active Requirements (v2.0 Scope)

### Audit & Inventory

- [x] **AUDIT-01**: Live Pencil MCP audit of `design/Crito.pen` produces a versioned `.planning/research/PEN-INVENTORY.md` covering: schema version (from `get_editor_state(include_schema: true)`), guidelines (from `get_guidelines`), every top-level frame's children (from `batch_get`), all raw property values (from `search_all_unique_properties`), and current variable surface (from `get_variables`)
- [x] **AUDIT-02**: Every top-level page frame in the `.pen` is classified IN-SCOPE (maps to a Joel page: Homepage, Projects, Blog, FAQ, Contact, Thank-you, Design system, 404) or OUT-OF-SCOPE (Crito-only: View More, Information, Free Design Sample, etc.); only IN-SCOPE frames are reconstructed
- [x] **AUDIT-03**: Every section inside every IN-SCOPE page frame is catalogued in `PEN-INVENTORY.md` with status (`[FLAT]` raster image / partially editable / already factored) and reconstruction priority

### Token Foundation

- [x] **TOKEN-01**: Two-tier Pencil variable system established — **primitive tokens** (raw values: `color-primitive-orange-500`, `space-primitive-24`, `type-primitive-size-24`) and **semantic aliases** (role-based: `color-semantic-bg-accent`, `space-semantic-section-y`, `type-semantic-heading-1`); components reference semantic only, never primitives. Naming uses flat-dash convention (locked by Phase 23 CONTEXT.md D-12).
- [x] **TOKEN-02**: Color palette tokens cover the Crito palette derived from the original Figma source (not eyedropped from raster) — primary accent ramp, neutral ramp, surface, text, border roles
- [x] **TOKEN-03**: Typography tokens cover the Crito font families, sizes, weights, and line-heights — at minimum: display, h1-h6, body, body-sm, caption, button
- [x] **TOKEN-04**: Spacing scale tokens cover Crito's grid (e.g. 0/4/8/12/16/24/32/48/64/96) with semantic aliases (`space-semantic-section-y`, `space-semantic-container-x`, `space-semantic-stack-sm/md/lg`, `space-semantic-inline-sm/md/lg`)
- [x] **TOKEN-05**: Radius tokens cover Crito's radii (likely 2-4 named values: sm / md / lg / pill)
- [x] **TOKEN-06**: Prose typography tokens covering content-heavy surfaces (blog/FAQ): paragraph spacing, link color + underline behavior, inline code styling, list bullet styles
- [x] **TOKEN-07**: Dark-mode token slots **deferred** — tokens remain single-theme for v2.0; dark mode picked up in a later milestone
- [x] **TOKEN-08**: A `_Tokens & Foundations` reference frame inside the `.pen` shows live swatches for every color token, type specimens for every typography token, and a spacing-scale visualization

### Layout Primitives

- [ ] **LAYOUT-01**: Every reconstructed section uses Pencil's auto-layout (flex) or grid frames — no absolute-positioned children at section level
- [ ] **LAYOUT-02**: Auto-layout padding and gap values reference spacing tokens (TOKEN-04), never raw px

### Component Library

- [ ] **COMP-01**: `Primitive / Button` component with variants for purpose (primary, secondary, ghost), size (sm/md/lg), and state (default/hover/focus/disabled) — variants justified by source evidence, not invented pre-emptively
- [ ] **COMP-02**: `Primitive / Input` component covering Crito's input style with label, helper text, and error state slots
- [ ] **COMP-03**: `Primitive / Badge` component for small metric/label pills as they appear in Crito heroes and project cards
- [ ] **COMP-04**: `Primitive / Icon` component with size variants (16/20/24/32) and a glyph-swap mechanism (instance swap or component property, per Pencil's slot model)
- [ ] **COMP-05**: `Section / Header` component — Crito's top nav (logo + links + CTA)
- [ ] **COMP-06**: `Section / Footer` component — Crito's footer (links + social + copyright)
- [ ] **COMP-07**: `Compound / Card` component using slots for content variation (project card, blog card, service card) rather than three separate variants — verifies D-2 (Pencil slot mechanics)
- [ ] **COMP-08**: Component library lives in `design/Crito.pen` (single-file strategy) inside `_Components / Primitives`, `_Components / Compounds`, `_Components / Sections` parent frames at the top of the canvas
- [ ] **COMP-09**: Zero raw color hex / px values inside any component — every fill, stroke, padding, gap references a token

### Page Reconstruction

- [ ] **PAGE-01**: Homepage frame in `.pen` reconstructed — every flat raster section replaced with a layout-driven composition of section components instancing primitives and compounds
- [ ] **PAGE-02**: Projects index + project detail frames reconstructed (Crito's "Projects" / "Project" frames mapped to Joel's `/projects` route family)
- [ ] **PAGE-03**: Blog index + blog post + tag-page frames reconstructed (mapped to Joel's `/blog` route family) — section components for post header, prose body, related-posts strip, tag-filter strip
- [ ] **PAGE-04**: FAQ frame reconstructed (FAQ accordion section, CTA section)
- [x] **PAGE-05**: Contact frame reconstructed including the 8-field lead-qualification form using `Primitive / Input` instances
- [x] **PAGE-06**: Thank-you frame reconstructed (post-submission message + Calendly placeholder section)
- [ ] **PAGE-07**: Design-system reference frame reconstructed (token gallery, component gallery for the `/design-system` route)
- [ ] **PAGE-08**: 404 frame reconstructed (helpful navigation back to home + key pages)
- [ ] **PAGE-09**: All reconstruction is **desktop-only** for v2.0 — mobile breakpoint reconstruction deferred to a later milestone
- [ ] **PAGE-10**: Every IN-SCOPE page frame ends in zero `[FLAT]` status markers in the `_Inventory` frame
- [ ] **PAGE-11**: Original raster nodes are removed (or kept hidden/locked as archival reference) only after the replacement composition has been visually verified to match

### Validation

- [ ] **VALID-01**: Each reconstructed section carries an explicit fidelity label — `EXACT` (pixel-faithful), `APPROXIMATE` (visually close, gaps documented), or `STUB` (placeholder, full reconstruction deferred)
- [ ] **VALID-02**: Every reconstructed section has a side-by-side calibration artifact — `get_screenshot` of the reconstructed frame next to the matching raster in `design/images/` — saved to `.planning/ui-reviews/v2.0/`
- [ ] **VALID-03**: Gaps the source doesn't reveal are **declared as OPEN flags** (Pencil notes / inventory entries), never silently filled with personal style choices
- [ ] **VALID-04**: Milestone-close fidelity sweep: `search_all_unique_properties` across the full `.pen` returns zero raw color hex / px values inside components or sections (only tokens are referenced)
- [ ] **VALID-05**: Milestone-close archival: `export_nodes({ format: "png" })` produces a PNG per reconstructed IN-SCOPE page frame, saved to `.planning/research/exports/v2.0/`
- [ ] **VALID-06**: Handoff doc `.planning/research/v2.0-HANDOFF.md` describes how the reconstructed `.pen` is organized for the next milestone's code-side roadmapper (token namespaces, component locations, slot conventions)

---

## Future Requirements (deferred to later milestones)

- [ ] Dark-mode token slots and semantic dark variants (deferred per TOKEN-07)
- [ ] Mobile-breakpoint frames per section (deferred per PAGE-09)
- [ ] Code-side v2 component library implementing the `.pen` primitives (next milestone)
- [ ] Page-by-page code migration from v1.3 to v2 layout (later milestones)
- [ ] Token sync pipeline from `.pen` variables to CSS/Tailwind (later — code-side concern)
- [ ] WCAG 2.2 AA validation across migrated pages (code milestone)
- [ ] Lighthouse 90+ across all categories on migrated pages (code milestone)

---

## Out of Scope (explicit exclusions)

- **Any code changes** — `src/`, `tests/`, `package.json`, and other code paths are untouched in v2.0. Pages continue to render on v1.3 components throughout.
- **Reconstructing Crito frames Joel doesn't adopt** (View More, Information, Free Design Sample, Crito-only secondary pages) — AUDIT-02 explicitly filters these out
- **Crito's page architecture / IA** — Joel's existing page set is retained; v2.0 is about visual/component vocabulary, not site map
- **Dark mode** — explicitly deferred (PROJECT.md + TOKEN-07)
- **Mobile breakpoint reconstructions** — desktop only for v2.0 (PAGE-09)
- **Prototyping flows / interactive states / hover animations beyond static variant states** — downstream consumer is Astro code, not a clickable prototype
- **Atomic-design taxonomy (atoms/molecules/organisms)** — the primitive/compound/section grouping is sufficient at ~10 components
- **Component variants for every legitimate-looking state** — variants are added on demand as recreated sections need them, never pre-emptively
- **Reconstructing the Alliatus `.fig` file in `design/`** — Crito is the reference, not Alliatus
- **Custom illustration / asset recreation** — Crito photos and decorative illustrations stay as image references; v2.0 does not recreate them in vector
- **Token sync to code / CSS variable export pipeline** — code-side concern handled in next milestone
- **Editing copy or projects.json content** — content untouched in v2.0

---

## Traceability (Requirement → Phase)

Mapped by the roadmapper after phase structure approval. Every v2.0 requirement maps to exactly one phase; cross-cutting policies (e.g. COMP-09 zero-raw-values, VALID-04 sweep) are owned by a single phase but enforced throughout — see ROADMAP.md "Cross-cutting policies" note.

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUDIT-01 | Phase 23 | Complete |
| AUDIT-02 | Phase 23 | Complete |
| AUDIT-03 | Phase 23 | Complete |
| TOKEN-01 | Phase 23 | Complete |
| TOKEN-02 | Phase 23 | Complete |
| TOKEN-03 | Phase 23 | Complete |
| TOKEN-04 | Phase 23 | Complete |
| TOKEN-05 | Phase 23 | Complete |
| TOKEN-06 | Phase 23 | Complete |
| TOKEN-07 | Phase 23 | Complete |
| TOKEN-08 | Phase 23 | Complete |
| LAYOUT-01 | Phase 24 | Pending |
| LAYOUT-02 | Phase 24 | Pending |
| COMP-01 | Phase 24 | Pending |
| COMP-02 | Phase 24 | Pending |
| COMP-03 | Phase 24 | Pending |
| COMP-04 | Phase 24 | Pending |
| COMP-05 | Phase 25 | Pending |
| COMP-06 | Phase 25 | Pending |
| COMP-07 | Phase 25 | Pending |
| COMP-08 | Phase 24 | Pending |
| COMP-09 | Phase 24 | Pending |
| PAGE-01 | Phase 31 | Pending |
| PAGE-02 | Phase 29 | Pending |
| PAGE-03 | Phase 28 | Pending |
| PAGE-04 | Phase 26 | Pending |
| PAGE-05 | Phase 27 | Complete |
| PAGE-06 | Phase 27 | Complete |
| PAGE-07 | Phase 30 | Pending |
| PAGE-08 | Phase 26 | Pending |
| PAGE-09 | Phase 26 | Pending |
| PAGE-10 | Phase 32 | Pending |
| PAGE-11 | Phase 26 | Pending |
| VALID-01 | Phase 26 | Pending |
| VALID-02 | Phase 26 | Pending |
| VALID-03 | Phase 26 | Pending |
| VALID-04 | Phase 32 | Pending |
| VALID-05 | Phase 32 | Pending |
| VALID-06 | Phase 32 | Pending |

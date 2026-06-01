# Roadmap: Joel Shinness Website

## Milestones

- ✅ **v1.0 MVP** — Phases 1-6 (shipped 2026-01-27)
- ✅ **v1.1 Design Updates** — Phases 7-11 (shipped 2026-02-10)
- ✅ **v1.2 Homepage Refinement** — Phases 12-16 (shipped 2026-02-10)
- ✅ **v1.3 Design System & Navigation Cleanup** — Phases 17-22 (shipped 2026-02-11)
- ❌ **v1.4 Design Overhaul** — Abandoned 2026-05-31 (no code shipped; phase numbers 23-30 returned to pool)
- 🚧 **v2.0 Prep Crito Design File** — Phases 23-32 (active)

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1-6) — SHIPPED 2026-01-27</summary>

Complete lead-generation focused portfolio website with responsive design, blog platform, portfolio showcase, contact form, and Lighthouse 90+ performance.

**Stats:** 24 source files, 2,052 lines, 23 plans, 90 commits, 2-day build (Jan 26-27, 2026)

**Key accomplishments:**

- Responsive Astro/Tailwind foundation with dark mode and mobile navigation
- Homepage with value proposition, services, process, FAQ, and about section
- Portfolio with filterable case study grid and detailed project pages
- Contact form with validation and Formspree integration
- Blog platform with MDX, syntax highlighting, sticky TOC, and tag filtering
- SEO meta tags, JSON-LD structured data, and CI/CD pipeline

See: `.planning/milestones/v1.0-ROADMAP.md` for full details.

</details>

<details>
<summary>✅ v1.1 Design Updates (Phases 7-11) — SHIPPED 2026-02-10</summary>

Distinctive neobrutalist design transformation with narrative homepage, WCAG 2.2 AA accessibility compliance, and 3/10 aesthetic density.

**Stats:** 37 source files, 3,139 lines, 14 plans, ~100 commits, 2-day build (Feb 9-10, 2026)

**Key accomplishments:**

- OKLCH neobrutalist design system with shadow-to-glow dark mode transformation
- Button, Card, and Input primitives with WCAG 2.4.13 focus states
- Narrative homepage (Solutions -> Process -> Tech -> About -> Contact)
- Projects and Blog with neobrutalist cards and two-tier typography
- Playwright/axe-core accessibility testing with 98.7% manual audit pass rate
- FAQ relocated to footer accordion

See: `.planning/milestones/v1.1-ROADMAP.md` for full details.

</details>

<details>
<summary>✅ v1.2 Homepage Refinement (Phases 12-16) — SHIPPED 2026-02-10</summary>

Enhanced homepage sections with outcome-focused messaging, isometric illustrations, and improved FAQ discoverability for small business clients.

**Stats:** 34 source files, 3,649 lines, 10 plans, 1-day build (Feb 10, 2026)

**Key accomplishments:**

- Icon library migrated to @lucide/astro with tree-shaking (200KB+ bundle reduction)
- Hero section reframed with outcome-focused messaging and 3 visual trust badges
- Process section enhanced with 5 isometric illustrations and user-focused descriptions
- Technology section restructured into 3 categories (AI, Automations, Web Apps) with illustrations
- Dedicated FAQ page with FAQPage JSON-LD schema for SEO rich results
- Isometric CSS utilities (iso-shadow, iso-glow, iso-rotate) with dark mode glow transformation

See: `.planning/milestones/v1.2-ROADMAP.md` for full details.

</details>

<details>
<summary>✅ v1.3 Design System & Navigation Cleanup (Phases 17-22) — SHIPPED 2026-02-11</summary>

Consolidated design system into reference page, achieved 100% component consistency, streamlined navigation to 4 links, enhanced contact form for lead generation.

**Stats:** 40+ source files, 5,498 lines, 17 plans, 2-day build (Feb 10-11, 2026)

**Key accomplishments:**

- Design system reference page at /design-system with JSON API endpoint
- Component consistency audit with 16 findings resolved (zero raw HTML forms/buttons)
- CheckboxGroup component for multi-select form fields
- Enhanced 8-field contact form with n8n webhook integration
- Simplified header navigation (Blog, Projects, FAQ, Contact only)
- Footer with Instagram/Substack social icons (44x44px touch targets)
- Zero axe-core accessibility violations across all pages
- 100% Lighthouse scores (Performance, Accessibility, Best Practices, SEO)

See: `.planning/milestones/v1.3-ROADMAP.md` for full details.

</details>

<details>
<summary>❌ v1.4 Design Overhaul — ABANDONED 2026-05-31 (no code shipped)</summary>

**Status:** Abandoned. Both attempted foundation phases reverted (Phase 23 v1.4 = v2 token system + BaseLayoutV2 + v2 layout components; Phase 24 v1.4 = v2 primitive library + design-system page rebuild). Phase 25 v1.4 (leaf page migrations to BaseLayoutV2) also attempted and reverted.

**Root cause:** Code was authored from best-guess interpretations of mostly-flat raster sections in the Crito `.pen` file. Output looked generic and did not capture the design's vibe. Fix at the wrong layer.

**Resolution:** Replaced by **v2.0 Prep Crito Design File** — reconstruct the `.pen` file itself (recreate flat sections as editable Pencil components with proper tokens) before any code work resumes. v2.0 reuses Phase 23 onward since nothing v1.4 shipped.

See `.planning/MILESTONES.md` "v1.4 Design Overhaul (Abandoned)" entry for the full post-mortem.

</details>

### 🚧 v2.0 Prep Crito Design File (Phases 23-32, Active)

**Milestone goal:** Reconstruct `design/Crito.pen` from mostly-flat raster sections into editable, factored components backed by a real token system — so the next code milestone has structured ground truth to compile against instead of pixels to interpret. Pencil-MCP-centric; zero code changes in v2.0.

**Phase ordering rationale:** Variables-first is non-negotiable (the v1.4 root cause was reversing this order one layer earlier in code). Phase 23 starts with a live Pencil MCP audit and ends with the token foundation written — no component or page work yet. Phase 24 builds layout primitives and primitive components against those tokens. Phase 25 builds section/compound components on top of primitives. Phases 26-31 reconstruct IN-SCOPE pages one (or two) at a time, ordered lowest-risk to highest-risk; each per-page phase carries per-section side-by-side calibration as its definition-of-done (not deferred to a final QA pass — that is exactly how v1.4 failed). Phase 32 runs the milestone-close fidelity sweep, archives exports, and writes the handoff doc for the next milestone's code-side roadmapper.

**Cross-cutting policies (apply to every phase from Phase 24 onward):**

- **Zero raw hex/px values** inside any component or section — every fill, stroke, padding, gap, type style references a token (COMP-09 enforced; VALID-04 sweep-verifies at milestone close).
- **Single-file strategy** — everything lives in `design/Crito.pen`; library frames at top of canvas with `_` prefix (COMP-08).
- **Gap declaration, not gap filling** — when the source is silent, add a flagged OPEN note in Pencil; never silently fill with personal style choices (VALID-03 enforced from Phase 26 onward, but the discipline starts the moment Phase 23's audit surfaces the first ambiguity).
- **Desktop only for v2.0** — mobile breakpoint reconstruction deferred to a later milestone (PAGE-09).

---

#### Phase 23: Audit + Token Foundation

**Goal**: A live Pencil MCP audit of `design/Crito.pen` is committed as a versioned inventory, every IN-SCOPE Crito page frame is classified, and a two-tier token foundation (primitives + semantic aliases) is written into the `.pen` and rendered as a live reference frame — so every subsequent phase plans against observed source, not inferred best-guesses.
**Depends on**: Nothing (first v2.0 phase; v1.3 codebase unchanged throughout)
**Requirements**: AUDIT-01, AUDIT-02, AUDIT-03, TOKEN-01, TOKEN-02, TOKEN-03, TOKEN-04, TOKEN-05, TOKEN-06, TOKEN-07, TOKEN-08
**Success Criteria** (what must be TRUE):

  1. `.planning/research/PEN-INVENTORY.md` exists and a user reading it can identify, for every top-level frame in `design/Crito.pen`: the frame's name, its IN-SCOPE or OUT-OF-SCOPE classification (mapped to Joel's page set: Homepage, Projects, Blog, FAQ, Contact, Thank-you, Design system, 404), and a per-section status marker (`[FLAT]` / partially editable / already factored) with reconstruction priority
  2. Opening `design/Crito.pen` and inspecting `get_variables({})` returns a two-tier token set — primitive tokens (raw values under `color/primitive/*`, `space/primitive/*`, `type/primitive/*`, `radius/primitive/*`) and semantic aliases (role-based names like `color/semantic/bg/accent`, `space/semantic/section-y`, `type/semantic/heading-1`) — covering color, typography (display through caption + prose styles), spacing, and radii; dark-mode token slots are explicitly absent (deferred per TOKEN-07)
  3. The `_Tokens & Foundations` reference frame at the top of `design/Crito.pen` shows every color token as a live swatch with its name, every typography token as a type specimen, and a spacing-scale visualization — verifiable in one screenshot
  4. Every token value is traceable to source evidence: color tokens derive from the Crito Figma source (or its published documentation) rather than from JPG eyedropping; spacing/typography values come from the original `.fig` or from `search_all_unique_properties` over already-editable nodes in the `.pen`
  5. Page frames in `design/Crito.pen` are unchanged — the audit and token work introduce no visual mutation to any IN-SCOPE page frame

**Plans:** 5/5 plans complete

Plans:

- [x] 23-01-PLAN.md — Live Pencil MCP audit + baseline screenshots: `get_editor_state(include_schema: true)` → `get_guidelines` → `batch_get` → `search_all_unique_properties` → `get_variables({})`; write `.planning/research/PEN-INVENTORY.md` with every frame catalogued, classified, and coverage-checkpoint PASS/PAUSE gate
- [x] 23-02-PLAN.md — Document the dark-mode omission rationale in PEN-INVENTORY.md (collapsed to doc-only per CONTEXT D-01: dark slots omitted entirely for v2.0)
- [x] 23-03-PLAN.md — Write primitive tokens (color / spacing / typography / radii) via `set_variables` with probe-first pattern; verify via `get_variables({})`; log source-evidence per token
- [x] 23-04-PLAN.md — Write semantic aliases (`color-semantic-*`, `space-semantic-*`, `type-semantic-*` including prose styles for blog/FAQ, `radius-semantic-*`) via `set_variables`; probe-first to resolve aliasing strategy
- [x] 23-05-PLAN.md — Build `_Tokens & Foundations` reference frame via `batch_design`; archive `get_screenshot` to `.planning/research/exports/v2.0/tokens-foundations-23.png` (D-19); capture end-of-phase Crito frame screenshots for VAL-23-05 zero-mutation diff

---

#### Phase 24: Layout Primitives + Primitive Components

**Goal**: The `.pen` carries a small library of primitive components (`Primitive / Button`, `Primitive / Input`, `Primitive / Badge`, `Primitive / Icon`) that reference semantic tokens only, sit inside `_Components / Primitives` at the top of canvas, and use Pencil auto-layout (flex/grid) with token-driven padding and gap — no raw px, no raw hex, no absolute positioning at the component level.
**Depends on**: Phase 23
**Requirements**: LAYOUT-01, LAYOUT-02, COMP-01, COMP-02, COMP-03, COMP-04, COMP-08, COMP-09
**Success Criteria** (what must be TRUE):

  1. Opening `design/Crito.pen` shows four parent library frames at the top of the canvas with `_` prefix: `_Components / Primitives`, `_Components / Compounds`, `_Components / Sections` (stubbed, populated in Phase 25), and the existing `_Tokens & Foundations` from Phase 23 — single-file strategy is visible
  2. `_Components / Primitives` contains `Primitive / Button`, `Primitive / Input`, `Primitive / Badge`, and `Primitive / Icon`; variant matrices are justified by per-variant source evidence recorded in the PEN-INVENTORY (no invented states, no pre-emptive hover/disabled cells without a Crito page that depicts them)
  3. Every primitive component uses Pencil auto-layout for internal structure (no absolute-positioned children); all padding and gap values reference `space/semantic/*` tokens, not raw px
  4. Running `search_all_unique_properties` scoped to the primitive frames returns zero raw color hex and zero raw px spacing values inside any primitive — every styled property is a token reference
  5. `snapshot_layout({ rootId: "<primitive-frame-id>", problemsOnly: true })` returns no clipping or overlap issues across all four primitives

**Plans**: 5 plans

Plans:

**Wave 1**

- [ ] 24-01: Stub the four library parent frames at top of canvas (`_Components / Primitives`, `_Components / Compounds`, `_Components / Sections`); confirm `_Tokens & Foundations` is the top neighbor; use `find_empty_space_on_canvas` to avoid overlap with the 15 existing page frames

**Wave 2** *(blocked on Wave 1 completion)*

- [ ] 24-02: Build `Primitive / Button` with variants justified by source evidence (purpose / size / state); reference semantic tokens only; `snapshot_layout` problems-only check
- [ ] 24-03: Build `Primitive / Input` (label + control + helper text + error slot) and `Primitive / Badge` (pill/metric styles as they appear in Crito heroes and project cards); semantic-token-only; `snapshot_layout`
- [ ] 24-04: Build `Primitive / Icon` (size variants 16/20/24/32) with documented glyph-swap mechanism — Pattern A (Pencil-native `library: "lucide"` per RESEARCH supersession of D-25) or Pattern B (D-25 atomic-glyph fallback) per probe outcome; source-driven glyph enumeration per D-26; semantic-token-only; `snapshot_layout`

**Wave 3** *(blocked on Wave 2 completion)*

- [ ] 24-05: Sweep — `search_all_unique_properties` over primitive frames, confirm zero raw values; `get_screenshot` each primitive for the reference set

**Cross-cutting constraints:**

- Every Pencil-mutating batch is preceded by `get_editor_state` asserting active editor == `design/Crito.pen` (D-35)

---

#### Phase 25: Section + Compound Components

**Goal**: The shared section components (`Section / Header`, `Section / Footer`) and the compound `Compound / Card` (slots-based, one component for project / blog / service card variations) exist in the `.pen`, compose Phase 24 primitives, and document their slot signatures so the per-page reconstruction phases can instance them without re-deriving structure.
**Depends on**: Phase 24
**Requirements**: COMP-05, COMP-06, COMP-07
**Success Criteria** (what must be TRUE):

  1. `_Components / Sections` contains `Section / Header` (logo + nav links + CTA, matches the Crito top nav as catalogued in PEN-INVENTORY) and `Section / Footer` (links + social + copyright, matches Crito's footer)
  2. `_Components / Compounds` contains `Compound / Card` built with explicit slots for content variation (project card, blog card, service card all served by the same component via slot content, not by three separate variants) — verifies the Pencil slot mechanics policy decided in Phase 23
  3. Each section/compound component has a sibling Pencil note declaring its slot signature: which children are consumer-provided, which are fixed, which are optional
  4. Sections and the compound reference primitive components (Button, Input, Badge, Icon) and semantic tokens only — no raw hex, no raw px, no inline duplications of Button/Input markup

**Plans**: TBD

Plans:

- [ ] 25-01: Build `Section / Header` (logo + nav links + CTA button instance) using `Primitive / Button` and semantic tokens; document slot signature in sibling note
- [ ] 25-02: Build `Section / Footer` (link columns + social icons via `Primitive / Icon` + copyright row) using semantic tokens; document slot signature
- [ ] 25-03: Build `Compound / Card` with slots for content variation (image slot, title slot, body slot, footer-actions slot); verify the same component serves project / blog / service card use cases by populating each slot configuration; document slot signature

---

#### Phase 26: FAQ + 404 Reconstruction (Calibration Workflow Established)

**Goal**: The two simplest IN-SCOPE pages — FAQ (accordion list + CTA) and 404 (helpful navigation back to home + key pages) — are reconstructed as editable compositions of Phase 24/25 components on top of semantic tokens, *and* the per-section calibration workflow (side-by-side screenshot, fidelity label, OPEN-gap declaration, raster archival rule) is formally adopted here and applied to every later per-page phase.
**Depends on**: Phase 25
**Requirements**: PAGE-04, PAGE-08, PAGE-09, PAGE-11, VALID-01, VALID-02, VALID-03
**Success Criteria** (what must be TRUE):

  1. The Crito FAQ frame and 404 frame in `design/Crito.pen` no longer contain any `[FLAT]` raster sections — every section is a composition of layout frames, primitive instances, and (where applicable) compound instances referencing semantic tokens
  2. Each reconstructed section in both pages carries an explicit fidelity label in a sibling Pencil note: `EXACT` / `APPROXIMATE` / `STUB` (VALID-01); gaps the source doesn't reveal appear as flagged OPEN notes, never silently filled (VALID-03)
  3. `.planning/ui-reviews/v2.0/` contains a side-by-side calibration artifact for every reconstructed section — `get_screenshot` of the reconstructed frame paired with the matching raster from `design/images/` (VALID-02) — and the user has spot-checked at least one section per page before phase close
  4. Original raster nodes inside each reconstructed section are removed (or hidden/locked as archival reference) only after the replacement composition has been visually verified to match (PAGE-11); the FAQ and 404 page frames render the reconstructed compositions, not the original rasters
  5. Both reconstructions happen at the desktop breakpoint only — mobile-breakpoint frames are not introduced (PAGE-09); the policy is recorded as a one-line note in `_Tokens & Foundations` or `PEN-INVENTORY.md` so later per-page phases inherit it

**Plans**: TBD

Plans:

- [ ] 26-01: Reconstruct FAQ page sections (accordion list section, CTA section) — replace `[FLAT]` rasters with token-driven compositions of `Compound / Card` (or layout frames) + `Primitive / Button`; per-section side-by-side calibration into `.planning/ui-reviews/v2.0/`; fidelity labels; user spot-check
- [ ] 26-02: Reconstruct 404 page sections (message + nav-back compositions) — token-driven, primitive instances; per-section calibration; fidelity labels; user spot-check
- [ ] 26-03: Codify the calibration workflow as `.planning/research/CALIBRATION-PROTOCOL.md` (referenced by every later per-page phase) — side-by-side script, fidelity label definitions, OPEN-flag template, raster-removal rule, desktop-only constraint

---

#### Phase 27: Thank-you + Contact Reconstruction

**Goal**: The Thank-you frame (post-submission message + Calendly placeholder section) and the Contact frame (including the 8-field lead-qualification form built from `Primitive / Input` instances) are reconstructed end-to-end as editable compositions; the contact form proves the input primitive's variant set is sufficient for Joel's actual field shape.
**Depends on**: Phase 26
**Requirements**: PAGE-05, PAGE-06
**Success Criteria** (what must be TRUE):

  1. The Crito Thank-you frame in `design/Crito.pen` is fully reconstructed — zero `[FLAT]` markers — and the Calendly placeholder section is present as a distinct slot/note (so the future code milestone can wire a real Calendly link without re-deriving the section)
  2. The Crito Contact frame is fully reconstructed; the 8-field lead-qualification form is composed entirely of `Primitive / Input` instances (no inlined input markup); any field type the primitive doesn't yet cover is added as a justified variant rather than reinvented inline
  3. Each reconstructed section on both pages carries an EXACT / APPROXIMATE / STUB fidelity label and has a side-by-side artifact in `.planning/ui-reviews/v2.0/`; OPEN gaps (e.g. error states not depicted in Crito source) are flagged, not invented
  4. The user has spot-checked at least one section per page against the side-by-side artifacts before phase close

**Plans**: TBD

Plans:

- [ ] 27-01: Reconstruct Thank-you page sections (post-submission message section, Calendly placeholder section) per calibration protocol from Phase 26
- [ ] 27-02: Reconstruct Contact page sections including 8-field form using `Primitive / Input` instances; surface any input variants needed (justified by Joel's actual field shape, not invented) back to Phase 24's primitive; per-section calibration; user spot-check

---

#### Phase 28: Blog Reconstruction (Index + Post + Tag Page)

**Goal**: All three blog surfaces — index, post detail, and tag pages — are reconstructed as editable compositions; the prose typography tokens defined in Phase 23 (TOKEN-06) are validated against a real post body, the related-posts strip and tag-filter strip are factored as section components, and the post header layout instances Phase 25 primitives.
**Depends on**: Phase 27
**Requirements**: PAGE-03
**Success Criteria** (what must be TRUE):

  1. The Crito Blog index frame, Blog post frame, and Blog tag-page frame in `design/Crito.pen` are all fully reconstructed — zero `[FLAT]` markers across all three
  2. A blog post body in the reconstructed post frame uses prose semantic tokens (paragraph spacing, link color/underline, inline code style, list bullets) — verified by populating sample prose content that exercises every prose token
  3. The related-posts strip and tag-filter strip exist as factored section-level components (or compound instances) instanced inside the blog frames, not redrawn inline
  4. Per-section fidelity labels and side-by-side calibration artifacts exist for every reconstructed blog section in `.planning/ui-reviews/v2.0/`; user spot-check before phase close

**Plans**: TBD

Plans:

- [ ] 28-01: Reconstruct Blog index frame (post grid using `Compound / Card`, tag-filter strip); per-section calibration
- [ ] 28-02: Reconstruct Blog post frame (post header section, prose body validating TOKEN-06 prose tokens, related-posts strip); per-section calibration
- [ ] 28-03: Reconstruct Blog tag-page frame (filter strip + filtered card grid); per-section calibration; user spot-check across all three blog frames

---

#### Phase 29: Projects Reconstruction (Index + Project Detail)

**Goal**: The Projects index frame and the Project detail frame in Crito are reconstructed as editable compositions mapped to Joel's `/projects` route family; project cards in the index instance `Compound / Card`; project detail sections (hero, problem/solution/results, related projects) factor into section components where they recur.
**Depends on**: Phase 28
**Requirements**: PAGE-02
**Success Criteria** (what must be TRUE):

  1. The Crito Projects index frame and Project detail frame in `design/Crito.pen` are fully reconstructed — zero `[FLAT]` markers
  2. The project card in the index is an instance of `Compound / Card` (or a justified variant), not a separate redrawn card; image/title/result-metric slots are populated rather than hardcoded
  3. The project detail page's recurring section structures (hero, results strip, related projects strip) are factored as section components where they appear more than once, not duplicated inline
  4. Per-section fidelity labels and side-by-side calibration artifacts in `.planning/ui-reviews/v2.0/`; user spot-check before phase close

**Plans**: TBD

Plans:

- [ ] 29-01: Reconstruct Projects index frame (card grid using `Compound / Card`); per-section calibration
- [ ] 29-02: Reconstruct Project detail frame (hero, problem/solution/results, related projects); factor recurring section structures into section components; per-section calibration; user spot-check

---

#### Phase 30: Design System Reference Reconstruction

**Goal**: A reconstructed Design-system reference frame in `design/Crito.pen` — token gallery (mirroring Phase 23's `_Tokens & Foundations` but laid out as the `/design-system` page would render) plus component gallery (live instances of every primitive, compound, and section component) — exists as the design source for Joel's future `/design-system` code route.
**Depends on**: Phase 29
**Requirements**: PAGE-07
**Success Criteria** (what must be TRUE):

  1. A Design-system reference page frame exists in `design/Crito.pen` (separate from `_Tokens & Foundations`, which is the developer-facing internal reference) — laid out as a real user-facing page would render
  2. The page frame shows: a token gallery (color swatches with names, type specimens with role labels, spacing-scale visualization, radius examples) and a component gallery (live instances of `Primitive / Button` variants, `Primitive / Input` states, `Primitive / Badge`, `Primitive / Icon` sizes, `Compound / Card` slot examples, `Section / Header`, `Section / Footer`)
  3. The page frame uses Phase 25 section components (`Section / Header`, `Section / Footer`) at top and bottom — proving the section components compose correctly in a page context other than the homepage
  4. Per-section fidelity label and side-by-side calibration artifact in `.planning/ui-reviews/v2.0/`; user spot-check before phase close

**Plans**: TBD

Plans:

- [ ] 30-01: Build Design-system reference page frame — token gallery sections (colors, type, spacing, radii) + component gallery sections (primitives, compounds, sections); use `Section / Header` and `Section / Footer` instances; per-section calibration; user spot-check

---

#### Phase 31: Homepage Reconstruction

**Goal**: The Homepage frame — the highest section count and highest reuse payoff — is reconstructed last, with every flat raster section (hero, services, process, why-choose-us / about, contact-section preview, etc.) replaced by a layout-driven composition of section components instancing primitives and compounds; running the full library through the homepage is the strongest stress test of the foundation work.
**Depends on**: Phase 30
**Requirements**: PAGE-01
**Success Criteria** (what must be TRUE):

  1. The Crito Homepage frame in `design/Crito.pen` is fully reconstructed — zero `[FLAT]` markers across hero, services, process, about, and any other homepage sections
  2. Every homepage section is either a section-component instance (when the same section structure appears on other pages) or a rule-justified inline layout frame (when single-use) — duplication is documented, not silent
  3. The reconstructed homepage uses `Section / Header` and `Section / Footer` instances at top and bottom (proving cross-page consistency with Phase 30's design-system page)
  4. Per-section fidelity labels and side-by-side calibration artifacts in `.planning/ui-reviews/v2.0/` for every reconstructed homepage section; user spot-check before phase close (highest scrutiny because this is the most-trafficked surface)

**Plans**: TBD

Plans:

- [ ] 31-01: Reconstruct Homepage hero + services sections (highest visual stakes); per-section calibration
- [ ] 31-02: Reconstruct Homepage process + about sections; per-section calibration
- [ ] 31-03: Reconstruct any remaining Homepage sections (why-choose-us, contact preview, etc.); per-section calibration; user spot-check across all homepage sections

---

#### Phase 32: Fidelity Sweep + Handoff

**Goal**: A milestone-close fidelity sweep confirms zero raw hex/px leakage across the whole reconstructed file, archival PNG exports are written for every reconstructed IN-SCOPE page frame, the inventory shows zero `[FLAT]` markers across all IN-SCOPE pages, and a handoff document tells the next milestone's code-side roadmapper how the `.pen` is organized — closing v2.0 cleanly.
**Depends on**: Phase 31
**Requirements**: PAGE-10, VALID-04, VALID-05, VALID-06
**Success Criteria** (what must be TRUE):

  1. Running `search_all_unique_properties` across the full `design/Crito.pen` returns zero raw color hex values and zero raw px values inside any component or section (the only raw values legitimately remaining are inside the `_Tokens & Foundations` primitive definitions themselves, where they belong) — verified via `replace_all_matching_properties` if any leaks are found (VALID-04)
  2. `_Inventory` (and `.planning/research/PEN-INVENTORY.md`) shows zero `[FLAT]` markers across every IN-SCOPE page frame (Homepage, Projects index + detail, Blog index + post + tag, FAQ, Contact, Thank-you, Design system, 404) — PAGE-10 satisfied
  3. `.planning/research/exports/v2.0/` contains one PNG per reconstructed IN-SCOPE page frame, produced via `export_nodes({ format: "png" })` (VALID-05)
  4. `.planning/research/v2.0-HANDOFF.md` exists and describes for the next milestone's code-side roadmapper: token namespaces (primitive vs semantic), component locations within the `.pen` (`_Components / Primitives`, `_Components / Compounds`, `_Components / Sections`), slot conventions, and any OPEN-flagged gaps the code milestone will need to resolve (VALID-06)

**Plans**: TBD

Plans:

- [ ] 32-01: Fidelity sweep via `search_all_unique_properties` across the whole file; fix any raw-value leaks via `replace_all_matching_properties`; verify zero `[FLAT]` markers remain in PEN-INVENTORY.md
- [ ] 32-02: `export_nodes({ format: "png" })` for every reconstructed IN-SCOPE page frame; write to `.planning/research/exports/v2.0/`
- [ ] 32-03: Write `.planning/research/v2.0-HANDOFF.md` for the next milestone's code-side roadmapper (token namespaces, component locations, slot conventions, residual OPEN flags)

---

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → ... → 22 → 23 → 24 → 25 → 26 → 27 → 28 → 29 → 30 → 31 → 32

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Project Setup | v1.0 | 3/3 | Complete | 2026-01-26 |
| 2. Homepage Foundation | v1.0 | 4/4 | Complete | 2026-01-26 |
| 3. Portfolio System | v1.0 | 5/5 | Complete | 2026-01-27 |
| 4. Contact & SEO | v1.0 | 3/3 | Complete | 2026-01-27 |
| 5. Blog Platform | v1.0 | 6/6 | Complete | 2026-01-27 |
| 6. Performance & Deploy | v1.0 | 2/2 | Complete | 2026-01-27 |
| 7. Design System Foundation | v1.1 | 2/2 | Complete | 2026-02-09 |
| 8. Primitive Components | v1.1 | 3/3 | Complete | 2026-02-09 |
| 9. Homepage & Navigation | v1.1 | 4/4 | Complete | 2026-02-09 |
| 10. Projects & Blog | v1.1 | 2/2 | Complete | 2026-02-09 |
| 11. Testing & Accessibility | v1.1 | 3/3 | Complete | 2026-02-10 |
| 12. Foundation | v1.2 | 3/3 | Complete | 2026-02-10 |
| 13. Hero Section | v1.2 | 1/1 | Complete | 2026-02-10 |
| 14. Process Section | v1.2 | 3/3 | Complete | 2026-02-10 |
| 15. Technology Section | v1.2 | 2/2 | Complete | 2026-02-10 |
| 16. FAQ Page | v1.2 | 1/1 | Complete | 2026-02-10 |
| 17. Design System Reference Page | v1.3 | 5/5 | Complete | 2026-02-10 |
| 18. Component Consistency Audit | v1.3 | 1/1 | Complete | 2026-02-10 |
| 19. Component Migration (Tiered) | v1.3 | 6/6 | Complete | 2026-02-11 |
| 20. Contact Form Enhancement | v1.3 | 3/3 | Complete | 2026-02-11 |
| 21. Navigation Cleanup | v1.3 | 1/1 | Complete | 2026-02-10 |
| 22. Footer Enhancement | v1.3 | 1/1 | Complete | 2026-02-11 |
| 23. Audit + Token Foundation | v2.0 | 5/5 | Complete    | 2026-05-31 |
| 24. Layout Primitives + Primitive Components | v2.0 | 0/5 | Not started | - |
| 25. Section + Compound Components | v2.0 | 0/TBD | Not started | - |
| 26. FAQ + 404 Reconstruction | v2.0 | 0/TBD | Not started | - |
| 27. Thank-you + Contact Reconstruction | v2.0 | 0/TBD | Not started | - |
| 28. Blog Reconstruction | v2.0 | 0/TBD | Not started | - |
| 29. Projects Reconstruction | v2.0 | 0/TBD | Not started | - |
| 30. Design System Reference Reconstruction | v2.0 | 0/TBD | Not started | - |
| 31. Homepage Reconstruction | v2.0 | 0/TBD | Not started | - |
| 32. Fidelity Sweep + Handoff | v2.0 | 0/TBD | Not started | - |

---
*Roadmap initialized: 2026-01-26 for v1.0*
*Last updated: 2026-05-31 — v1.4 abandoned, v2.0 Prep Crito Design File phases 23-32 added*

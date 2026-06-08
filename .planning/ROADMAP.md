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

- [x] 24-01: Stub the four library parent frames at top of canvas (`_Components / Primitives`, `_Components / Compounds`, `_Components / Sections`); confirm `_Tokens & Foundations` is the top neighbor; use `find_empty_space_on_canvas` to avoid overlap with the 15 existing page frames

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 24-02: Build `Primitive / Button` with variants justified by source evidence (purpose / size / state); reference semantic tokens only; `snapshot_layout` problems-only check
- [x] 24-03: Build `Primitive / Input` (label + control + helper text + error slot) and `Primitive / Badge` (pill/metric styles as they appear in Crito heroes and project cards); semantic-token-only; `snapshot_layout`
- [x] 24-04: Build `Primitive / Icon` (size variants 16/20/24/32) with documented glyph-swap mechanism — Pattern A (Pencil-native `library: "lucide"` per RESEARCH supersession of D-25) or Pattern B (D-25 atomic-glyph fallback) per probe outcome; source-driven glyph enumeration per D-26; semantic-token-only; `snapshot_layout`

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 24-05: Sweep — `search_all_unique_properties` over primitive frames, confirm zero raw values; `get_screenshot` each primitive for the reference set

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

**Plans**: 3 plans

Plans:

**Wave 1**

- [x] 25-01-PLAN.md — `Section / Header` built (G0wNOc inside g9oRa5): Crito Menu-bar audit found 0 affordances + 1 CTA (source-wins resolutions A1 + B1 at Task 1 user gate); Secondary Button variant added as sibling component `hIWuC` in avgor (Pencil 2.13 has no variant-axis property — D-43 PREFERRED/FALLBACK converge); logo-slot + 6 Crito-source nav labels + single primary CTA wired with lucide arrow-right via descendants override; resolves OPEN-24-06 (empty-slot collapse via actual use) + OPEN-24-11 (Secondary from `mkw8g`); seeds OPEN-25-01/02/03

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 25-02-PLAN.md — `Section / Footer` built (Xs0Hs inside g9oRa5): Crito Footer audit (Y1ldm) found 3 link columns (not 4 as RESEARCH assumed) + Instagram already in source (correction to OPEN-24-13); lucide Instagram Pattern A probe PASS (D-45); Substack Pattern B atomic-glyph component `AzmgQ` from simpleicons canonical SVG (D-46 — resolves OPEN-24-13); Chivo typography earns its keep (D-47); social-row ships Joel-brand Instagram + Substack at component level (Twitter+LinkedIn skipped per Pitfall 7); seeds OPEN-25-04/05/06

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 25-03-PLAN.md — `Compound / Card` built (t40xct inside t67DU6): raster-probe inference from image-import-12.jpg (Service+Project) + image-import-14.jpg (Blog) per D-49 confirmed single 4-slot signature serves all 3 use cases; Pencil 2.13 typed-slot is suggestion-only per schema/§2 (D-52 PREFERRED applied to footer-actions-slot with `slot:['M7eUr','hIWuC']` + sibling note ships regardless per belt-and-suspenders); 4 slots image/title/body/footer-actions all enabled:true with placeholders per D-53; Phase 25 close sweep — library frames repositioned horizontally (avgor + g9oRa5 + t67DU6 side-by-side), heights fit_content, Phase 24 D-37 deferral notes deleted; id-inventory.json archived; seeds OPEN-25-07 (Card source-coverage gap per D-50)

**Cross-cutting constraints:**

- Every Pencil-mutating batch is preceded by `mcp__pencil__get_editor_state({ include_schema: false })` asserting active editor == `design/Crito.pen` (D-54)
- `snapshot_layout(maxDepth: 0, problemsOnly: true)` at document root returns `\"No layout problems.\"`; per-frame text-clipping false-positives documented per Phase 24 quirk (24-05-SUMMARY)

---

#### Phase 26: FAQ + 404 Reconstruction (Calibration Workflow Established)

**Goal**: The two simplest IN-SCOPE pages — FAQ (stacked Q+A list + CTA) and 404 (helpful navigation back to home + key pages) — are reconstructed as editable compositions of Phase 24/25 components on top of semantic tokens (with two new Section components and a `type-semantic-heading-2-*` token added as foundation), *and* the per-section calibration workflow (joel-only-branch token-usage check + crito-source-branch side-by-side script, fidelity label, OPEN-gap declaration, raster-removal rule) is formally adopted here and applied to every later per-page phase. FAQ and 404 are both `joel-only-no-crito-ref` per PEN-INVENTORY (no Crito source exists for either) — Phase 26 ships them as fresh designs in Crito vocab per CONTEXT D-58, not as v1.3 visual mirrors.
**Depends on**: Phase 25
**Requirements**: PAGE-04, PAGE-08, PAGE-09, PAGE-11, VALID-01, VALID-02, VALID-03
**Success Criteria** (what must be TRUE):

  1. Two new top-level page frames (`FAQ` and `404`) exist in `design/Crito.pen` as fresh-design compositions of Phase 23/24/25 tokens + primitives + sections — every section is a composition of layout frames, primitive instances, and section/compound instances referencing semantic tokens (no `[FLAT]` rasters because no Crito source rasters exist to begin with per PEN-INVENTORY `joel-only-no-crito-ref` scope rows)
  2. Each reconstructed section in both pages carries an explicit per-section fidelity label per CONTEXT D-83 (`EXACT` / `APPROXIMATE` / `STUB`) — recorded in plan SUMMARYs; gaps the source doesn't reveal appear as flagged OPEN-26-NN notes in PEN-INVENTORY, never silently filled (VALID-03)
  3. Per-section calibration was conducted via Plan-close AskUserQuestion gates per CONTEXT D-65 — inline `get_screenshot` rendering paired with semantic-token-usage description vs `_Tokens & Foundations` (D-62 joel-only branch). D-64 filenames are description identifiers, NOT disk-write paths (`get_screenshot` cannot write to disk per OPEN-23-01 — RESEARCH § Focus 4 substitution); the user spot-checked at least one section per page before phase close (VALID-02)
  4. PAGE-11 status documented as INERT for both FAQ and 404 (joel-only-no-crito-ref scope — no raster exists to remove per RESEARCH § Focus 5); PAGE-11 ACTIVE branch is defined in CALIBRATION-PROTOCOL.md for inheriting phases (27/28/29/31) that have crito-source rasters
  5. Both reconstructions happen at the desktop breakpoint only — mobile-breakpoint frames are not introduced (PAGE-09); the policy is repeated in `CALIBRATION-PROTOCOL.md` so later per-page phases inherit it

**Plans**: 4 plans

Plans:

- [x] 26-00-PLAN.md — Phase 26 foundation: `type-semantic-heading-2-*` 4-part composite + `type-primitive-size-32` primitive (per CONTEXT D-72 + RESEARCH § Focus 3 user gate at Task 1 for heading-2 values) + new Section/CTA (3-slot: headline/body/actions per D-78) + Section/NavBack (2-slot: heading/links per D-79) reusable components inside `_Components / Sections` (g9oRa5). Also updates this ROADMAP entry from 3 plans → 4 plans (D-84).
- [x] 26-01-PLAN.md — FAQ page frame reconstruction: top-level `FAQ` frame at 1440 width via `find_empty_space_on_canvas` (D-74); instances Section/Header (G0wNOc) + page-intro section + Q+A list (5 verbatim pairs from `src/pages/faq.astro` lines 11-32 per D-82) + Section/CTA (STUB microcopy per D-82) + Section/Footer (Xs0Hs); plan-close calibration spot-check user gate per D-65 (joel-only branch, D-62 token-usage check).
- [x] 26-02-PLAN.md — 404 page frame reconstruction: top-level `404` frame at 1440 width; instances Section/Header + message section (BIG headline + body, both STUB text per D-81 — layout EXACT) + Section/NavBack instance (4 structural labels Home/Blog/Projects/Contact per CONTEXT Claude's Discretion) + Section/Footer; plan-close calibration spot-check user gate per D-65; PAGE-11 INERT note recorded in PEN-INVENTORY per RESEARCH § Focus 5.
- [x] 26-03-PLAN.md — Codify `.planning/research/CALIBRATION-PROTOCOL.md` (codify-what-worked per D-67): branch matrix (crito-source-present vs joel-only-no-crito-ref) + per-step script per branch (Pencil MCP calls, pairing target, naming convention, user-gate format) + EXACT/APPROXIMATE/STUB definitions per branch per D-63 + OPEN-flag template + PAGE-11 carve-out (crito-source only) + PAGE-09 desktop-only constraint + inline-screenshot substitution per OPEN-23-01 + per-page phase consumer map for Phases 27-31. Cross-referenced from PEN-INVENTORY via short `## Calibration Protocol` anchor per D-69.

**Cross-cutting constraints:**

- Every Pencil-mutating call is preceded by `mcp__pencil__get_editor_state({ include_schema: false })` asserting active editor == `design/Crito.pen` (D-87 carry-forward from Phase 25 D-54 / Phase 24 D-35)
- `snapshot_layout({ maxDepth: 0, problemsOnly: true })` at document root returns `"No layout problems."` at every plan close; text-clipping false-positives per-frame documented per Phase 24/25 precedent
- PEN-INVENTORY extension pattern per D-88 — each mutating plan adds Frames Inventory / Variant Evidence (Phase 26) / Token Extensions (Phase 26) rows and any OPEN-26-NN flags

---

#### Phase 27: Thank-you + Contact Reconstruction

**Goal**: The Thank-you frame (post-submission message + Calendly placeholder section) and the Contact frame (including the 8-field lead-qualification form built from `Primitive / Input` instances) are reconstructed end-to-end as editable compositions; the contact form proves the input primitive's variant set is sufficient for Joel's actual field shape.
**Depends on**: Phase 26
**Requirements**: PAGE-05, PAGE-06
**Success Criteria** (what must be TRUE):

  1. The Crito Thank-you frame in `design/Crito.pen` is fully reconstructed — zero `[FLAT]` markers — and the Calendly placeholder section is present as a distinct slot/note (so the future code milestone can wire a real Calendly link without re-deriving the section)
  2. The Crito Contact frame is fully reconstructed; the 8-field lead-qualification form is composed entirely of `Primitive / Input` instances (no inlined input markup); any field type the primitive doesn't yet cover is added as a justified variant rather than reinvented inline (D-89 Hybrid library strategy: Textarea variant + Select/Checkbox sibling primitives + CheckboxGroup compound — Plan 27-00 foundation)
  3. Each reconstructed section on both pages carries an EXACT / APPROXIMATE / STUB fidelity label per D-83 and is calibrated via CALIBRATION-PROTOCOL.md inline-screenshot gates (Thank-you joel-only branch per § 4.5; Contact crito-source-flat-raster branch per § 3.4 — paired against `design/images/image-import-NN.jpg` probed at Plan 27-02 Task 0); OPEN-27-NN gaps flagged, not invented
  4. The user has spot-checked at least one section per page via the plan-close calibration gates (Plan 27-01 + Plan 27-02 single AskUserQuestion gates per CALIBRATION-PROTOCOL § 4.5 / § 3.4) before phase close; PAGE-11 INERT for Thank-you + PAGE-11 ACTIVE for Contact (cl8tt raster hidden via `enabled: false` AFTER user APPROVE only — first production use of PAGE-11 ACTIVE in v2.0)

**Plans**: 3 plans

Plans:

- [x] 27-00-PLAN.md — Phase 27 foundation (D-89 Hybrid library strategy + D-101 foundation-first): Primitive/Input label-slot UPDATE per D-91 (oCeJP → horizontal frame with label-text + required-mark enabled:false + optional-text enabled:false; in-place type-conversion probe + Delete+recreate fallback per RESEARCH Open Question 2) + Primitive/Input/Textarea variant + Primitive/Select Default/Focus/Error sibling primitive (chevron-down via lucide native Pattern A per D-92) + Primitive/Checkbox Default/Focus/Error sibling primitive + Compound/CheckboxGroup compound inside avgor + t67DU6. Seeds PEN-INVENTORY § Calendly Wiring Map (Phase 27) with both URLs per D-93. NO user-calibration gate at close per D-86 + D-102 (agent-deterministic foundation work).
- [x] 27-01-PLAN.md — Thank-you joel-only reconstruction (D-99 + D-100; CALIBRATION-PROTOCOL § 4 joel-only branch; PAGE-11 INERT per § 4.3 carry-forward): top-level `Thank-you` frame at 1440 width via `find_empty_space_on_canvas` with `nodeId: csXky` anchor (Phase 26 404 frame, CALIBRATION-PROTOCOL § 10.4); instances Section/Header (G0wNOc, no override per D-77) + success-message section (Primitive/Icon/32 with lucide circle-check Pattern A per D-100 + heading "Thanks for reaching out!" + body "I'll email you within 48 hours..." both v1.3 verbatim per D-98) + Section/CTA (Hs5rc, first cross-phase consumer per Phase 26 D-78; Calendly placeholder with v1.3 button label "Skip the wait - book a call" + sibling Calendly URL note `calendly.com/joelshinness` per D-93) + secondary "Return to homepage" plain text-link per D-99 Claude's Discretion + Section/Footer (Xs0Hs, no override per D-77); plan-close single calibration AskUserQuestion gate per CALIBRATION-PROTOCOL § 4.5 (joel-only token-usage format).
- [x] 27-02-PLAN.md — Contact crito-source-flat-raster reconstruction (D-95 + D-96 + D-97 + D-98; CALIBRATION-PROTOCOL § 3 crito-source-flat-raster sub-case; PAGE-11 ACTIVE per § 3.3 — FIRST production use of PAGE-11 ACTIVE in v2.0): Task 0 probes cl8tt raster image-import-NN.jpg index (HIGHEST-PRIORITY DELIVERABLE per RESEARCH § Pitfall 3); top-level `Contact` frame at 1440 width via `find_empty_space_on_canvas` with `nodeId: <thankYouPageId>` anchor; instances Section/Header + page-intro ("Let's Talk" + 48-hours body v1.3 verbatim per D-98) + 2-col asymmetric grid per D-95 (form-column 760 + sidebar-column 376; horizontal-layout alignItems flex_start) containing the 8-field form composed entirely of Plan 27-00 library instances per D-97 (Name + Email + Company + Challenges Textarea + Solutions CheckboxGroup × 5 + Budget Select + Timeline Select + Message Textarea + Submit + privacy; required-mark + optional-text per field per D-97 Message inconsistency raises OPEN-27-NN) + sidebar Compound/Card (t40xct, second cross-phase consumer per Phase 25 D-49; image disabled + v1.3 verbatim title/body/Button "Book a Call" + sibling Calendly URL note `calendly.com/me--juoi/discovery-call` per D-93) + Section/Footer; plan-close single calibration AskUserQuestion gate per CALIBRATION-PROTOCOL § 3.4 step 5 (crito-source-flat-raster side-by-side with cl8tt image-import-NN.jpg); on APPROVE → batch_design Update(cl8tt, { enabled: false }) per PAGE-11 ACTIVE (NEVER before APPROVE per Pitfall 4) → PEN-INVENTORY status_counts flat:1 → hidden:1 + OPEN-23-05 RESOLVED.

**Cross-cutting constraints:**

- Every Pencil-mutating call is preceded by `mcp__pencil__get_editor_state({ include_schema: false })` asserting active editor == `design/Crito.pen` (D-103 carry-forward from Phase 26 D-87 / Phase 25 D-54 / Phase 24 D-35)
- Phase 27 ships ZERO new tokens — `get_variables({})` returns 100 at every plan open + close (D-91 reuses `color-semantic-text-error` for required-mark; per Open Question reuse)
- `snapshot_layout({ maxDepth: 0, problemsOnly: true })` at document root returns `"No layout problems."` at every plan close; per-frame text-clipping false-positives anticipated to exceed Phase 26 due to multi-line content (textareas + CheckboxGroup) per Pitfall 5 (NOT mitigated — known benign)
- PEN-INVENTORY extension pattern per D-104 — Frames Inventory rows for Thank-you + Contact; Variant Evidence (Phase 27) sub-section; NEW § Calendly Wiring Map (Phase 27); Open Flags — Phase 27 (OPEN-27-NN); cl8tt status_counts update post-APPROVE; OPEN-23-05 RESOLVED + OPEN-24-04/-07/-08/-09 partial-resolution update notes

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

**Plans**: 4 plans

Plans:

**Wave 1**

- [ ] 28-00-PLAN.md — Phase 28 foundation (D-105 + D-115 + D-116 + Focus 3 Path A + Focus 7): ships 7 new prose tokens (heading-3 + heading-4 + mono-primitive + inline-code + code-block + prose-link + prose-list) + Section/TagFilter (broad-scoping per D-115; paired-ref pills per Focus 6 Sub-option A1) + Section/RelatedPosts (narrow-scoping per D-116; 3 Card refs) + Compound/Card title-slot extension (vGH3A + metadata-caption child per Focus 3 Path A) + Primitive/Badge/Outline variant (per D-119 plan-execution evaluation). Token surface: 100 → 107 user-facing. NO user-calibration gate at close per D-124 + D-86 (agent-deterministic foundation; mid-plan gate ONLY if .fig consult for heading-3/-4 values escalates per D-106 + Phase 26 D-72 precedent).

**Wave 2** *(blocked on Wave 1 completion)*

- [ ] 28-01-PLAN.md — Blog index page frame reconstruction: crito-source-flat-raster branch (DzqTm); Task 0 probes DzqTm image-import-NN.jpg index (likely image-import-14.jpg per Phase 25 D-49 raster-probe); top-level `Blog` frame at 1440 width via find_empty_space_on_canvas with nodeId:n0QqTd anchor (Phase 27 Contact frame per § 10.4); instances Section/Header + page-intro (v1.3 verbatim from index.astro lines 32-37 per D-98 + D-123) + Section/TagFilter (pre-configured 'All Posts' active per Plan 28-00 default) + 6-Card grid (3-col × 2-row per D-114; each Card with title-slot descendants override for metadata + footer-actions-slot Badge/Outline tag pills per D-111 + D-112 + default image placeholder per D-113) + Section/Footer; plan-close single calibration AskUserQuestion gate per CALIBRATION-PROTOCOL § 3.4 step 5 (crito-source-flat-raster format); on APPROVE → Update(DzqTm, { enabled: false }) per PAGE-11 ACTIVE (SECOND production use of PAGE-11 ACTIVE in v2.0; NEVER before APPROVE per Pitfall 4).

**Wave 3** *(blocked on Wave 2 completion)*

- [ ] 28-02-PLAN.md — Blog post detail page frame reconstruction: crito-source-flat-raster branch (w1m3x); Task 0 probes w1m3x image-import-NN.jpg index (UNKNOWN — FIRST identification per RESEARCH Focus 4); top-level `Blog Post` frame at 1440 width via find_empty_space_on_canvas with nodeId anchor on Blog index from 28-01; instances Section/Header + post header section (title heading-1 + metadata row + post-detail tag row of Badge/Outline instances per D-121 + featured-image default placeholder + sibling featuredImage+TOC+tags+metadata wiring note) + post body section (verbatim content from src/content/blog/getting-started-with-automation.mdx per D-123 — exercises ALL 7 Phase 28 prose tokens: H1 + 3 H2 + H3 + 2 ul + 1 ol + synthetic inline-code + JS code block + italic + prose-link + hr; PRIMARY validation surface for prose tokens + prose-paragraph 'provisional' flag verifier per D-110) + Section/RelatedPosts instance (Plan 28-00 with 3 Card descendants overrides per D-118) + Section/Footer; plan-close single calibration gate per § 3.4; on APPROVE → Update(w1m3x, { enabled: false }) per PAGE-11 ACTIVE (THIRD production use; SECOND in Phase 28).

**Wave 4** *(blocked on Wave 3 completion)*

- [ ] 28-03-PLAN.md — Blog tag page frame reconstruction: joel-only-no-crito-ref branch per CALIBRATION-PROTOCOL § 4; top-level `Tag` frame at 1440 width via find_empty_space_on_canvas with nodeId anchor on Blog Post from 28-02; instances Section/Header + page-intro section (representative 'Posts tagged "automation"' heading + '3 posts about automation' subhead per D-122 Claude's Discretion + STUB-acceptable per D-83 mixed-fidelity + sibling Pencil note documenting dynamic generation pattern) + Section/TagFilter instance with descendants override flipping active-pill index from position 1 ('All Posts') to position 2 ('automation') per D-117 paired-ref Sub-option A1 — DIFFERENT active-pill index than 28-01 validates flexibility + 6-Card grid (all 6 Cards include 'automation' tag in footer-actions-slot Badge/Outline overrides; filtered representation) + Section/Footer; plan-close single calibration AskUserQuestion gate per CALIBRATION-PROTOCOL § 4.5 (joel-only token-usage format — pairs against `_Tokens & Foundations` RpGbe); PAGE-11 INERT per § 4.3 (no Crito source to remove). Plan close + Phase 28 close — id-inventory.json archived at end-of-phase-28; OPEN-25-07 RESOLVED (15 Card instances across 3 frames validate D-49 single-Card claim).

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
| 24. Layout Primitives + Primitive Components | v2.0 | 5/5 | Complete   | 2026-06-01 |
| 25. Section + Compound Components | v2.0 | 3/3 | Complete | 2026-06-06 |
| 26. FAQ + 404 Reconstruction | v2.0 | 4/4 | Complete   | 2026-06-07 |
| 27. Thank-you + Contact Reconstruction | v2.0 | 3/3 | Complete    | 2026-06-08 |
| 28. Blog Reconstruction | v2.0 | 0/TBD | Not started | - |
| 29. Projects Reconstruction | v2.0 | 0/TBD | Not started | - |
| 30. Design System Reference Reconstruction | v2.0 | 0/TBD | Not started | - |
| 31. Homepage Reconstruction | v2.0 | 0/TBD | Not started | - |
| 32. Fidelity Sweep + Handoff | v2.0 | 0/TBD | Not started | - |

---
*Roadmap initialized: 2026-01-26 for v1.0*
*Last updated: 2026-06-08 — Phase 28 planned (4/4 plans: 28-00 foundation + 28-01 Blog index crito-source-flat-raster + 28-02 Blog post detail crito-source-flat-raster + 28-03 Tag joel-only-no-crito-ref; ships 7 prose tokens + 2 Section components + Card title-slot extension + Badge/Outline variant; PAGE-11 ACTIVE applied twice (DzqTm + w1m3x); CALIBRATION-PROTOCOL second dual-branch consumer; OPEN-25-07 resolved at Phase 28 close via 15 Card instances)*

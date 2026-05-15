# Phase 24: v2 Primitive Library + Design System Page - Context

**Gathered:** 2026-05-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Ship the v2 primitive library (Button, Card composition, Input, Badge) under `src/components/v2/ui/` and rebuild `/design-system` on `BaseLayoutV2` as a live integration test of the dual-layout strategy.

Concretely, by end of Phase 24:

1. **Button** — `src/components/v2/ui/Button.astro` with 3 variants × 3 sizes, polymorphic href→`<a>`, iconLeft/iconRight props.
2. **Card composition** — Four files in `src/components/v2/ui/`: `Card.astro`, `CardHeader.astro`, `CardBody.astro`, `CardFooter.astro`. Two visuals (default + elevated). `interactive` prop on Card for hover/focus behavior. Feature cards (ProjectCard, StatCard, ServiceCard) in later phases wrap these.
3. **Input** — `src/components/v2/ui/Input.astro` with `as=input|textarea|select` polymorphism, label, error state with `aria-describedby`, disabled state.
4. **Badge** — `src/components/v2/ui/Badge.astro` as small chip/tag (NOT v1 metric block). 3 variants (accent/muted/outline), optional iconLeft prop.
5. **`/design-system` page** — Rebuilt on `BaseLayoutV2` with three sections: Tokens, Primitives (live demos), Usage (code snippets). Replaces the v1.3 page.
6. **`/design-system.json` endpoint** — Returns flat semantic shape matching v2 tokens.
7. **Playwright + axe-core tests** — Run against `/design-system` page itself; gate WCAG 2.2 AA compliance for every interactive primitive.

**Not in this phase:**
- CheckboxGroup primitive — deferred to Phase 28 (only the contact form needs it; implementation-coupled to form layout)
- Feature components that wrap Card (ProjectCard, StatCard, ServiceCard, BlogCard) — Phases 25–29
- Page migrations — Phases 25–29
- v1 primitive deletion (`src/components/ui/`) — Phase 30
- Dark-mode variants — explicitly out of scope for v1.4

</domain>

<decisions>
## Implementation Decisions

### Button Surface Area
- **D-01:** Three variants: `primary` (filled green CTA — `--color-accent` bg, `--color-primary` text), `ghost` (outlined, same shape — `--color-border` outline, `--color-primary` text), `link` (text + arrow, no background — `--color-primary` text). Covers Crito's documented CTA, HOME-01 "dual CTA primary + ghost", and the "Read more →" / "Let's talk →" arrow links that recur across the site.
- **D-02:** Three sizes: `sm`, `md`, `lg`. `md` is Crito's verified `padding: [16, 20]`; `sm` for inline contexts (header CTA, blog share); `lg` for hero. Default = `md`.
- **D-03:** Polymorphic API — `href` prop renders `<a class="btn">`; otherwise `<button>`. Matches v1 pattern and v2 `Header.astro`'s existing "Let's Talk" CTA usage. Single API for nav, hero, and form contexts.
- **D-04:** `iconLeft` and `iconRight` props accept a Lucide/SimpleIcons component reference. Button handles `--space-xs` gap, icon sizing, and `currentColor`. The `link` variant defaults `iconRight` to Lucide `ArrowRight` (override-able to `null` to suppress). Pattern consistent with Badge (D-11) for predictability.

### Card Composition Strategy
- **D-05:** Compositional model with four separate files in `src/components/v2/ui/`: `Card.astro` (wrapper), `CardHeader.astro`, `CardBody.astro`, `CardFooter.astro`. Each imported separately at the call site (Astro does not support React-style namespaced exports). Feature cards built in later phases (ProjectCard in Phase 27, StatCard in Phase 27, ServiceCard in Phase 29, BlogCard in Phase 26) **wrap** these primitives — they do not extend Card with new variants.
- **D-06:** Two visuals on Card: default (white surface, `--color-border` 1px outline, `--radius-lg`) and `elevated` (adds shadow on top of the base treatment). Set via an `elevated` boolean prop. Pulls the depth knob into the primitive so service cards (HOME-04) can lift while stat strips (PROJ-02, HOME-03) stay flat.
- **D-07:** `interactive` boolean prop on Card adds hover lift + `:focus-visible` ring (per D-16 focus-ring rule) + `cursor-pointer`. Consumed by ProjectCard in Phase 27 to drive the hover-reveal overlay (PROJ-04) using the parent `:hover` state. ProjectCard does NOT re-implement hover styling; it composes Card with `interactive`.
- **D-08 [informational]:** HOME-03 stats strip and PROJ-02 stat-card strip use **Card + typography + Tailwind utilities** — NOT a dedicated Stat primitive. Pattern: `<Card><CardBody><p class="text-5xl font-display">15+</p><p class="text-small text-muted">Years</p></CardBody></Card>`. Phase 27 / Phase 29 confirm exact typography during planning. This is why Badge (D-09) is reserved for chip/tag use only. (Informational only — no Phase 24 plan implements a Stat primitive; deferred to Phases 27/29.)

### Badge Semantics
- **D-09:** Badge is a **small chip/tag** primitive — NOT a metric block. Single default size using `--text-caption` (12px) text, `--radius-full` (pill shape), generous horizontal padding. Replaces v1's `label/value/description` API. Use cases for v1.4: PROJ-05 "Featured" flag on ProjectCard, possible "AI" / "Automations" / "Web App" tags on service or project cards, possible blog post tags.
- **D-10:** Three variants on Badge: `accent` (`--color-accent` bg, `--color-primary` text — for emphasis like "Featured"), `muted` (`--color-surface-muted` bg, `--color-text-muted` text — for category chips), `outline` (transparent fill, `--color-border` outline, `--color-text` — for low-emphasis tag rows like blog tag pages).
- **D-11:** Optional `iconLeft` prop accepts a Lucide/SimpleIcons component reference (mirrors Button D-04 API for predictability). No `iconRight` — chips read left-to-right with the icon as a typographic prefix; trailing icons read as actions and aren't applicable here.

### Input
- **D-12:** Polymorphic `as` prop preserved from v1: `as='input' | 'textarea' | 'select'`. Phase 28 contact form needs all three (8-field form with text inputs, message textarea, select dropdowns). Single Input primitive avoids three near-identical components.
- **D-13:** Input demo states on `/design-system`: default + focused + error (with helper text + `aria-describedby`) + disabled. Plus one example each of `as='textarea'` and `as='select'`. Coverage matches WCAG-relevant interactive states; documents the full polymorphic API.
- **D-14:** Error state uses an inline helper element below the input with `role="alert"` and `aria-describedby` from the input to the error element. Required indicator (asterisk in label) and label/input pairing via `<label for>` follow standard WCAG practice — no decision needed.

### Design-System Page Rebuild
- **D-15:** Three sections on `/design-system`: **Tokens** (8 color swatches with cssVar+OKLCH, 8-size type scale demo, 6-step spacing scale demo, 4-step radii demo), **Primitives** (every variant × size × state for all four primitives rendered live), **Usage** (copy-able `<pre>` code snippets per primitive). Skip a "Patterns" section — page-specific layouts (hero, contact, project case study) live in actual pages, not in design-system docs.
- **D-16:** `/design-system.json` endpoint returns a **flat semantic shape** matching the v2 token names (no nested per-palette objects, no `dark` variants). Each leaf is `{cssVar, value}` where `value` is the raw OKLCH / rem / etc. string. Schema:
  ```
  { colors: { primary: {cssVar, value}, accent: {cssVar, value}, ... },
    spacing: { xs: {cssVar, value}, ... },
    radii:   { sm: {cssVar, value}, ... },
    typography: { display: {cssVar, value}, ... } }
  ```
- **D-17:** Phase 24 **replaces** `src/pages/design-system.astro` and `src/pages/design-system.json.ts` in place (Roadmap success criterion #1 wording: "the v1 design system page with neobrutalist components is replaced"). Both files import the v2 layout/primitives instead of v1. The replacement is a documented exception to Phase 23's FOUND-06 v1.3-coexistence guarantee — `/design-system` is the ONE v1.3 page that gets rewritten before its v1 components are deleted.

### Cross-Cutting Primitive Rules
- **D-18:** Focus-ring style — every interactive primitive (Button, Input, Card with `interactive`) uses `outline: 2px solid var(--color-accent); outline-offset: 2px;` on `:focus-visible`. Single recognizable cue across the library; satisfies WCAG 2.2 AA contrast (≥3:1 vs `--color-surface` white).
- **D-19:** Primitives consume tokens via Tailwind v4 auto-generated utility classes (the `@theme` block in `src/styles/v2/global.css` exposes `--color-primary`, `--space-xs`, etc., which Tailwind v4 turns into `bg-primary`, `p-xs`, `rounded-md`, `text-display`, etc. utilities). No scoped `<style>` blocks unless a token-driven visual cannot be expressed as a utility (e.g., the focus-ring outline rule). Zero `is:global` blocks (Roadmap success criterion #4).
- **D-20:** Plan 24-03 Playwright + axe-core tests target `/design-system` itself — not isolated test routes. Single test target gives real `BaseLayoutV2` integration, regression-safe against future page changes. Tests verify: (1) keyboard tab order reaches every Button/Input on the page, (2) every primitive variant passes axe-core with 0 violations, (3) `:focus-visible` rings meet contrast thresholds.

### CheckboxGroup Gap
- **D-21:** **Phase 24 ships only the 4 documented primitives (Button, Card, Input, Badge).** v1 has a fifth primitive (`src/components/ui/CheckboxGroup.astro`) used only by the contact form. Phase 28 (Contact Reskin) will build v2 CheckboxGroup alongside the form reskin since the component is implementation-coupled to the form's 8-field layout. Phase 24 scope NOT expanded. ROADMAP COMP-* requirements stay 4-primitive.

### Claude's Discretion
- Exact padding values per primitive (Button per-size padding, Card sub-component padding, Input field padding, Badge horizontal padding) — derived from Crito visual reference during planning/research. Tokens are locked (`--space-xs..2xl`); only the choices of which-token-where are open.
- Exact typography weights for label/error/helper text — derived from Crito and the `--font-weight-text` / `--font-weight-text-bold` tokens locked in `src/styles/v2/global.css`.
- Input border thickness and the focused-state border color (vs the outline focus ring per D-18) — derived from Crito; either keep 1px `--color-border` or use a slightly thicker border to match Crito's input rect treatment.
- Card shadow value when `elevated=true` — derive from Crito's verified card visuals (e.g., the dashboard sub-cards at `--radius-lg`). No shadow token exists yet; either add a `--shadow-md` token to `src/styles/v2/global.css` in Plan 24-02 or use a literal `box-shadow` value scoped to Card.astro. Token-promotion preferred if more than one primitive needs it.
- Hover-lift magnitude on Card with `interactive` — derive from Crito or use a small `translateY(-2px)` with a transition. Implementer's choice; constraint is "noticeable but not distracting".
- Whether `Button` and `Badge` re-export Lucide icon types or accept `any` — TypeScript signature detail. Implementer's choice.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope (locked)
- `.planning/ROADMAP.md` §"Phase 24: v2 Primitive Library + Design System Page" — Goal, Depends-on, Requirements list (COMP-01, COMP-02, COMP-03, COMP-04, COMP-07, LEAF-04), 4 Success Criteria, 4 plan slots. Plan numbering and Success Criteria are authoritative.
- `.planning/REQUIREMENTS.md` §"Components — v2 Library" (COMP-01..07) and §"Standalone Pages" (LEAF-04) — the 6 requirements this phase delivers. Also see "Out of Scope" table for what NOT to add (no dark mode, no v1.3 deletions).
- `.planning/PROJECT.md` §"Current Milestone: v1.4 Design Overhaul" — strategic context (build-alongside-then-swap, light-mode only, Crito has no reusable components).

### Phase 23 decisions (carry-forward — locked, do not re-decide)
- `.planning/phases/23-design-system-foundation/23-CONTEXT.md` — D-01..D-19 from Phase 23. Critical carry-forwards:
  - **D-01 / D-02:** v2 lives under `src/components/v2/` namespace (no `V2`-suffixed files inside the namespace). Primitives go in `src/components/v2/ui/`.
  - **D-04..D-08:** Semantic role-based token names; v1-collision rule (D-08) — every v2 token name must be string-distinct from v1.
  - **D-06:** Typography token rename — use `--font-display` / `--font-text` (NOT `--font-heading` / `--font-body` which collide with v1).
- `.planning/phases/23-design-system-foundation/23-01-CRITO-INSPECTION.md` — Crito `.pen` extracted values: CTA button (`fwSmg`, `--radius-md` = 10px verified, `--color-accent` = oklch(0.79 0.184 148.5) green verified, `--color-primary` = oklch(0.225 0.044 264.6) navy verified, `padding: [16, 20]`). Card-equivalent radii at `--radius-lg` = 16px on dashboard sub-cards. No hover state documented for CTA button (D-02 carry-forward — derived +6% L variant for `--color-primary-hover`).

### Visual reference (locked target — Pencil MCP only)
- `design/Consulting & Agency Website Template I Crito (Community).pen` — Crito agency template. Inspect via Pencil MCP `batch_get`, NOT Read/Grep (file is encrypted).
  - CTA button reference: node `fwSmg` (Button/Primary)
  - Dashboard sub-cards (for Card visual treatment): nodes `sC7wn`, `D1l93` (cornerRadius 16.055 → `--radius-lg`)
  - Other primitive-shaped artifacts: footer input rects (inline form inputs at `--radius-sm` ≈ 6px) inside footer group `Y1ldm`
- `design/design-system.pen` — current v2 design source of truth. Already contains token variable definitions + factored Header + Footer + inline Token Reference frame (Phase 23 deliverable). **Phase 24 adds factored components for Button, Card (composition), Input, Badge.** Phase 23 D-16 commits the project to growing this `.pen` file phase-by-phase to always reflect what's shipped in code.

### v2 foundation (must build on — Phase 23 outputs)
- `src/styles/v2/global.css` — locked v2 token system (33 tokens). Primitives MUST use only tokens defined here.
- `src/layouts/v2/BaseLayout.astro` — v2 layout shell. `/design-system` page imports this in Plan 24-04.
- `src/components/v2/layout/Header.astro` — pattern reference for Astro + Tailwind v4 utility usage in v2 components (already follows D-19 utility-first approach).
- `src/components/v2/layout/Footer.astro` — pattern reference for SimpleIcons usage and 44×44 touch targets.
- `src/components/v2/layout/MobileNav.astro` — pattern reference for focus-trap + `:focus-visible` handling.

### v1 references (API only — DO NOT copy styles)
- `src/components/ui/Button.astro` — v1 API shape (variant + size + href). v2 Button keeps the polymorphic href pattern but every variant value, size value, and visual treatment changes per D-01..D-04. Do NOT copy class names, color references, or the `btn-{variant}` pattern.
- `src/components/ui/Card.astro` — v1 API shape (variant + stacked). v2 Card replaces this entirely with the composition model (D-05). The `stacked` (offset shadow) concept is dropped.
- `src/components/ui/Input.astro` — v1 API shape (label, error, as=input|textarea|select). v2 Input keeps the polymorphic `as` API and the label/error contract. Do NOT copy the variant color system or any `.input-*` class names.
- `src/components/ui/Badge.astro` — v1 API shape (label, value, description, variant). v2 Badge **replaces this entirely** with chip/tag semantics (D-09). v1's stat-block use case moves to Card+typography (D-08).
- `src/pages/design-system.astro` (1202 lines) — v1 design-system page. Phase 24 replaces it in place. Reference for what content/structure the v2 page must cover (Tokens, Primitives, Usage); do NOT preserve v1's neobrutalist styling, dark-mode toggle code, or 3-color-variant demos.
- `src/pages/design-system.json.ts` (115 lines) — v1 design-system JSON endpoint. Phase 24 rewrites in place per D-16's flat shape.

### External packages
- `@lucide/astro` (installed) — icon source for Button (iconLeft/iconRight, default ArrowRight on `link` variant) and Badge (iconLeft). Same package already used by v2 Header.
- `simple-icons-astro` (installed) — only for branded social icons (already used in Footer). Not relevant for Phase 24 primitives.
- `@fontsource-variable/plus-jakarta-sans` + `@fontsource-variable/inter` (installed in Phase 23) — fonts already loaded via `src/styles/v2/global.css`. Primitives reference them via `--font-display` and `--font-text` tokens only; no direct imports in primitive files.

### Testing
- Plan 24-03 axe-core + Playwright spec lives in `tests/accessibility/v2-primitives.spec.ts` (new file). Existing reference: `tests/accessibility/v2-layout.spec.ts` (Phase 23 deliverable) demonstrates the v2 axe-core invocation pattern.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`@lucide/astro` icon imports** — already a v2 pattern in `src/components/v2/layout/Header.astro`. Reuse for Button iconLeft/iconRight and Badge iconLeft props (D-04, D-11).
- **`src/components/v2/layout/Header.astro`** — concrete v2 component pattern: Tailwind utilities only, scoped `<style>` only where utilities can't express the rule, no `is:global`. Primitives follow this pattern (D-19).
- **`src/components/v2/layout/MobileNav.astro`** — concrete `:focus-visible` + focus-trap pattern. Reference for D-18 focus-ring implementation on Button + Input + interactive Card.
- **`src/styles/v2/global.css` `@theme` block** — Tailwind v4 auto-generates utility classes from the custom properties declared here (e.g., `bg-primary` from `--color-primary`). No additional configuration needed; verified working in Phase 23 layout components.

### Established Patterns
- **Astro polymorphic component** — pattern documented in `src/components/v2/layout/Header.astro` for `Tag = href ? 'a' : 'button'`. Reuse exactly for v2 Button (D-03).
- **Astro scoped `<style>` for focus rings** — v1 and v2 layout components both keep `:focus-visible` rules in a scoped `<style>` block since Tailwind utilities can't fully express `outline-color: var(--color-accent)` cleanly in some browsers. Same rule applies to v2 primitives.
- **Tailwind v4 utilities from semantic tokens** — calls like `class="bg-primary text-surface rounded-md px-sm py-xs"` work because of the `@theme` block. Established and tested in Phase 23.
- **Light-mode-only invariant** — D-08 carry-forward from Phase 23 forbids `prefers-color-scheme`, `localStorage.theme`, `.dark` selectors, and any `dark:` utility in v2 components. Phase 24 primitives extend this — no dark variants in any primitive file, even commented-out.

### Integration Points
- **`/design-system` route** — `src/pages/design-system.astro` already exists (v1). Phase 24 overwrites the file in place. Layout import changes from `BaseLayout` to `src/layouts/v2/BaseLayout.astro`.
- **`/design-system.json` endpoint** — `src/pages/design-system.json.ts` already exists (v1). Phase 24 overwrites in place; the route URL is unchanged.
- **`design/design-system.pen` source of truth** — already exists from Phase 23 with Header/Footer + tokens. Phase 24 adds factored Button, Card (composition), Input, Badge components to this same file (D-16 from Phase 23 carry-forward — grow the `.pen` phase-by-phase to mirror shipped code).
- **`tests/check-token-collision.cjs`** — Phase 23 Wave-0 guard that fails CI if any v2 token name collides with a v1 token. Phase 24 adds zero new tokens by default; if a `--shadow-md` token is added per Claude's-Discretion above, the test must still pass (it likely will — v1 has no `--shadow-md` token).

</code_context>

<specifics>
## Specific Ideas

- **Phase 24 is the dual-layout strategy's first integration test.** Until now, only the `/` homepage and other pages use v1, and Phase 23 only verified that v1 pages render unchanged. Phase 24 actually flips a route (`/design-system`) onto `BaseLayoutV2`, exercising the v1/v2 coexistence under real user traffic. If anything in the dual-layout strategy is broken, Phase 24 surfaces it before Phases 25–29 commit to migrating every other page.
- **Card composition (D-05) is the most consequential single decision in this phase.** Every later phase that builds card-like UI — ProjectCard with hover overlay (Phase 27), stat-card strips (Phase 27/29), services 3-card grid (Phase 29), Why-Choose-Us (Phase 29), BlogCard (Phase 26) — wraps the primitive. Getting the slot/sub-component contract right here saves significant rework in Phases 26–29. If during planning the composition model proves awkward for any documented use case, raise it as a checkpoint before Plan 24-02 is executed.
- **Badge is intentionally NOT the v1 metric block** (D-09). v1 readers might assume `<Badge>` still renders a stat block; it does not. The contact form's trust signals (Phase 28) and any "500+ hours" hero metrics (Phase 29) use Card + typography (D-08), NOT Badge.
- **Focus ring approach (D-18) must be visually visible on the `/design-system` page itself,** since Plan 24-03 tests verify focus-visible contrast. The Tokens section's color swatches MUST receive `:focus-visible` correctly if interactive — but they're presentational divs, not interactive. The Primitives section is where focus rings get verified.

</specifics>

<deferred>
## Deferred Ideas

- **v2 CheckboxGroup primitive** — needed only by the Phase 28 contact form. Build in Phase 28 alongside the form reskin (D-21).
- **Feature cards (ProjectCard, StatCard, ServiceCard, BlogCard)** — Phase 26 / 27 / 29 work. Each wraps the v2 Card primitive built here.
- **`/design-system.json` consumers / external tooling integration** — no external consumer exists today. If Joel later wants a Figma/Pencil token sync via the JSON endpoint, the flat semantic shape (D-16) is a clean starting point.
- **Dark-mode variants of any primitive** — deferred to v1.5+ (DARK-* requirements). Do NOT add `dark:` utilities, even speculatively.
- **Storybook / component preview tooling** — Joel runs the `/design-system` page as the docs surface. No Storybook setup planned.
- **Pencil-factored components for feature cards / hero / stats strip** — added to `design/design-system.pen` in their respective implementing phases (D-16 Phase 23 carry-forward).
- **A Stat primitive** — explicitly NOT built. Stats use Card + typography (D-08). If this proves awkward in Phase 27 or 29, revisit then.
- **Variants beyond the 3 selected for Button** — e.g., destructive/danger styling. No documented v1.4 use case. Add only if a later phase has a concrete need.
- **Variants beyond the 3 selected for Badge** — e.g., status indicators with dot prefix. No documented v1.4 use case.

### Reviewed Todos (not folded)
None — no pending todos matched Phase 24's scope (`gsd-sdk query todo.match-phase 24` returned 0 matches).

</deferred>

---

*Phase: 24-v2-primitive-library-design-system-page*
*Context gathered: 2026-05-14*

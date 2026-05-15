# Phase 23: Design System Foundation - Context

**Gathered:** 2026-05-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Stand up the v2 visual foundation that every later phase (24–30) builds on:

1. **Tokens:** A complete v2 CSS custom-property set (colors, typography, spacing) defined in a v2-namespaced stylesheet, with semantic role-based names that share zero overlap with v1 token names.
2. **Layout shell:** `BaseLayout` for v2 — light-mode only, no dark-mode FOUC script, no `#theme-toggle`, no `localStorage.theme` reads.
3. **Header & Footer:** `Header` (sticky, 4 nav links, "Let's Talk" CTA, mobile hamburger) and `Footer` (2-column, social icons at 44x44, secondary nav, no newsletter bar) for v2.
4. **Pen design source:** `design/design-system.pen` containing the variable definitions + factored Header and Footer components, plus an inline token-mapping table (Pencil variable → CSS custom property).
5. **Self-hosted fonts:** Variable fonts installed via `@fontsource-variable/*` packages whose names are confirmed during Crito `.pen` inspection.
6. **Coexistence guarantee:** All existing v1.3 pages continue to render unchanged — v1 and v2 stylesheets coexist without any token-name collision.

**Not in this phase:** Building Button/Card/Input/Badge primitives (Phase 24). Migrating any pages (Phases 25–29). Deleting v1 (Phase 30).

</domain>

<decisions>
## Implementation Decisions

### v2 File Organization
- **D-01:** v2 lives under a parallel `v2/` namespace everywhere — no `V2`-suffixed file names inside the namespace. Final paths:
  - Components: `src/components/v2/layout/Header.astro`, `src/components/v2/layout/Footer.astro`, `src/components/v2/layout/MobileNav.astro` (Phase 24 will add `src/components/v2/ui/Button.astro` etc.)
  - Layout: `src/layouts/v2/BaseLayout.astro`
  - Styles: `src/styles/v2/global.css`
- **D-02:** This means ROADMAP/REQUIREMENTS wording (`BaseLayoutV2.astro`, `HeaderV2.astro`, `src/styles/v2.css`) is **superseded** by the v2/ namespace layout. Plans MUST use the namespaced paths above. The semantic intent of those requirement names is preserved; only the path representation differs.
- **D-03:** Phase 30 cleanup becomes: delete `src/components/{ui,layout}/`, delete `src/layouts/BaseLayout.astro`, delete `src/styles/global.css`, then rename `src/components/v2/` → `src/components/`, `src/layouts/v2/` → `src/layouts/`, `src/styles/v2/` → `src/styles/`. Symmetric, low-risk, no per-file renaming.

### Token Naming Convention
- **D-04:** Token scheme is **semantic role-based** across colors, typography, AND spacing. No Tailwind-style numeric scales.
- **D-05:** Color tokens (illustrative — exact OKLCH values TBD by research from Crito):
  - `--color-primary`, `--color-primary-hover`
  - `--color-surface`, `--color-surface-muted`
  - `--color-text`, `--color-text-muted`
  - `--color-border`
  - `--color-accent`
- **D-06:** Typography tokens:
  - Families: `--font-heading`, `--font-body`
  - Sizes: `--text-display`, `--text-h1`, `--text-h2`, `--text-h3`, `--text-h4`, `--text-body`, `--text-small`, `--text-caption`
- **D-07:** Spacing tokens (t-shirt scale, NOT numeric): `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`, `--space-2xl`. Values follow whatever rhythm Crito uses (likely 8pt grid).
- **D-08:** Strict v1-collision rule: every v2 token name must be string-distinct from every v1 token name in `src/styles/global.css`. v2 must not depend on any v1 token. Any shared concept (e.g., "primary text color") gets a brand-new variable, never a shared one. This makes Phase 30 a pure delete with no risky renames.

### HeaderV2 Behavior
- **D-09:** "Let's Talk" CTA `href` = `/#contact` — same anchor pattern as v1 today. Browser handles same-page anchors as scrolls and cross-page anchors as navigation, so a single href works on every route.
- **D-10:** Mobile pattern = **full-screen overlay**. Hamburger opens a viewport-covering panel with focus trap, ESC-to-close, and backdrop-tap-to-close. Large tappable links. Not a side drawer, not a dropdown.
- **D-11:** Mobile nav is a **fresh component** at `src/components/v2/layout/MobileNav.astro` — built from scratch using v2 tokens. Do NOT copy `src/components/layout/MobileNav.astro` — it carries dark-mode-toggle code we don't want to inherit.
- **D-12:** Active link highlighting: detect current route via `Astro.url.pathname`; set `aria-current="page"` on the matching nav link AND apply a visual cue (underline or accent color — picked from Crito visual reference during planning). Required for both desktop nav and mobile overlay.

### FooterV2 Structure
- **D-13:** Crito's footer is 3-column (Information, Useful Links, Help & Support, Resources). REQUIREMENTS.md says 2-column for our solo-consultant context. **Stay with 2-column.** Planner consolidates Crito's 3 short-link subgroups into a single "Links" column; left column carries brand + social.
- **D-14:** No newsletter bar (REQUIREMENTS Out of Scope).

### Pen File Scope
- **D-15:** `design/design-system.pen` at end of Phase 23 contains:
  1. Variable definitions for the full token set (colors, typography, spacing, radii)
  2. Factored reusable components for **Header and Footer only** (because those are the components Phase 23 ships in code)
  3. An inline "Token Reference" frame with a 2-column table: Pencil variable name → CSS custom property name
- **D-16:** Component factoring for Button/Card/Input/Badge happens in Phase 24 (alongside the code). Pen file grows phase-by-phase to always reflect what's shipped.
- **D-17:** Token-mapping table lives **inline in `design/design-system.pen`** (text frame), NOT in a separate markdown file. Single source of truth.

### Crito Reference Frames (canonical visual targets)
- **D-18:** Inspected `design/Consulting & Agency Website Template I Crito (Community).pen` via Pencil MCP and identified the canonical reference frames:
  - **Crito header (Menu bar):** group `ULZiU` inside Hero group `0veF5` inside Home Page frame `ujMLJ`
    - Children: `9cyrs` (Logo), `wM9Ac` (nav text "Home Pages Pricing Portfolio Blog Contact"), `7BoiG` (Buttons / CTA)
    - Note: Crito has 6 nav links; ours has 4. Adapt visual treatment, override link list.
  - **Crito footer:** group `Y1ldm` inside Home Page frame `ujMLJ`
    - Children: `gAmiq` (Information — Logo, descriptive text, Mobile, Email, Buttons, Social Media), `iHrsm` (Short Links — Useful Links, Help & Support, Resources subgroups), `8Kx6s` (copyright text)
    - Note: Crito footer is 3-column; ours is 2-column per REQUIREMENTS. Consolidate.
- **D-19:** Crito has zero reusable components (Figma → Pen conversion flattened them). Phase 23 factors Header and Footer ourselves on the way to building them in code.

### Claude's Discretion
- Exact OKLCH values for each color token — extracted from Crito `.pen` inspection during planning/research; user explicitly defers palette specifics to Crito.
- Exact font family names — extracted from Crito `.pen`; `@fontsource-variable/*` package names confirmed against the npm registry during research.
- Border radius scale, shadow tokens, transition/easing tokens, container/breakpoint values — derive from Crito reference; semantic naming follows the same role-based convention.
- Specific visual style for active-link highlight (underline vs accent color vs weight bump) — picked during planning from Crito reference.
- Whether `BaseLayoutV2` imports `v2/global.css` directly or via `<link>` in `<head>` — implementer's choice; either is fine.
- FOUND-06 coexistence verification approach (manual visual check vs Lighthouse vs snapshot) — implementer's choice; the success criterion is "v1.3 pages render unchanged" and any reasonable verification path satisfies it.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Visual reference (locked target)
- `design/Consulting & Agency Website Template I Crito (Community).pen` — Crito agency template; the entire visual language for v1.4 derives from this file. Inspect via Pencil MCP `batch_get`, NOT via Read/Grep (file is encrypted).
  - Header reference: node `ULZiU` (group "Menu bar") inside `0veF5` (Hero) inside `ujMLJ` (Home Page)
  - Footer reference: node `Y1ldm` (group "Footer") inside `ujMLJ` (Home Page)
  - Home page frame for overall context: `ujMLJ`

### Project specs
- `.planning/ROADMAP.md` §"Phase 23: Design System Foundation" — Goal, Depends on, Requirements list, 5 Success Criteria, 4 plan slots. Plan numbering and Success Criteria are authoritative.
- `.planning/REQUIREMENTS.md` §"Foundation — Design System" (FOUND-01..06) and §"Components — v2 Library" (COMP-05, COMP-06) — the 8 requirements this phase delivers. Also see "Out of Scope" table for what NOT to add.
- `.planning/PROJECT.md` §"Current Milestone: v1.4 Design Overhaul" — strategic context (build-alongside-then-swap, Crito has no reusable components, dark mode deferred).

### Existing code (v1 — must keep working)
- `src/styles/global.css` — v1 tokens. v2 tokens MUST share zero variable names with this file.
- `src/layouts/BaseLayout.astro` — v1 layout. Stays untouched.
- `src/components/layout/Header.astro` — v1 header (reference for nav-link list, but reuse none of its styles or dark-mode toggle code).
- `src/components/layout/Footer.astro` — v1 footer (reference for social icon URLs and 44x44 touch-target pattern).
- `src/components/layout/MobileNav.astro` — v1 mobile nav. **Do NOT copy from this for v2** (D-11) — it carries dark-mode toggle code we explicitly don't want.

### External package targets
- `@fontsource-variable/*` packages on npm — exact package names depend on which font families Crito uses. Confirm names during planning (research) and pin to specific versions in `package.json`.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`@lucide/astro`** (already a dependency): use for any line icons in HeaderV2/FooterV2 (hamburger, close X, social icons if Lucide covers them; otherwise `simple-icons-astro` for branded icons).
- **`simple-icons-astro` `Substack` icon**: already used by v1 Footer. Reuse for FooterV2 social icons (LinkedIn — currently inline SVG in v1, can be replaced with Lucide or kept inline; Substack via this package).
- **Tailwind v4 `@theme` directive**: v1 already uses it for token definition. v2 follows the same Tailwind v4 mechanism in `src/styles/v2/global.css`.

### Established Patterns
- **Sticky header convention**: v1 uses `sticky top-0 z-30 h-[60px]`. v2 keeps the sticky pattern (REQUIREMENT COMP-05 confirms) but height/borders/colors come from Crito tokens.
- **Tailwind via `@tailwindcss/vite`**: project uses Tailwind v4 via the Vite plugin. v2 stylesheet plugs in the same way.
- **Astro `is:inline` script pattern**: used in v1 BaseLayout for FOUC prevention. v2 BaseLayout deliberately omits this (no dark mode in v1.4).
- **Container width**: v1 uses Tailwind's `container mx-auto px-4`. v2 likely uses a similar pattern; exact max-width derived from Crito (their hero is 1600px wide; content area ~1170px based on x=213 padding both sides).

### Integration Points
- **CSS load order**: v1 `BaseLayout.astro` does `import '../styles/global.css'`. v2 `src/layouts/v2/BaseLayout.astro` does `import '../../styles/v2/global.css'`. Both files coexist; pages import the layout they need; tokens never collide because of D-08.
- **Page routing**: pages stay in `src/pages/`. Each page imports its preferred layout. v1.3 pages keep importing `BaseLayout`; nothing in Phase 23 modifies any page.
- **Astro `<slot name="head">`**: v1 BaseLayout exposes a `head` slot. v2 BaseLayout MUST expose the same slot signature so later phases can pass JSON-LD, preload tags, etc.

</code_context>

<specifics>
## Specific Ideas

- v2 light-mode-only is a deliberate, non-negotiable scope decision (DARK-* explicitly deferred to v1.5+). Do not add `prefers-color-scheme` reads, `localStorage.theme` reads, `.dark` selectors, or any dark variant in v2 CSS — even speculatively.
- The Crito footer feels agency-team-sized; it gets visually consolidated to 2-column to read as solo-consultant (REQUIREMENTS Out of Scope explicitly rules out 4-column footer for "Sized for an agency").
- The hamburger menu MUST trap focus when open (axe-core gate, WCAG 2.4.3). This affects implementation — likely needs a small inline script or a focus-management pattern, since Astro is server-rendered. Plan should call this out.

</specifics>

<deferred>
## Deferred Ideas

- Dark mode support for v2 (palette, toggle, FOUC script) — explicitly deferred to v1.5 per REQUIREMENTS DARK-01..03.
- Newsletter signup integration — deferred (REQUIREMENTS CNT-04, v1.5+).
- `/about` standalone page — deferred (REQUIREMENTS ABOUT-01..02, v1.5+).
- v2 versions of Button/Card/Input/Badge primitives — Phase 24 work, NOT this phase.
- Pen-factored components for primitives, hero, stats strip, services card, project card, blog card — added to `design/design-system.pen` in subsequent phases as those components ship in code (D-16).
- Page migrations (FAQ/Thank-you/404, blog, projects, services, contact, homepage) — Phases 25–29.
- v1 deletion + Playwright selector audit — Phase 30 only.

</deferred>

---

*Phase: 23-design-system-foundation*
*Context gathered: 2026-05-14*

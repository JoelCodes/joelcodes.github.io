# Phase 23: Design System Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-14
**Phase:** 23-design-system-foundation
**Areas discussed:** v2 file organization, Token naming convention, HeaderV2 behavior details, Pen file scope for Phase 23

---

## v2 File Organization

### Q1: Where should v2 components live in src/?

| Option | Description | Selected |
|--------|-------------|----------|
| src/components/v2/* mirror | Mirror existing structure under v2/ namespace; clean cleanup target for Phase 30 | ✓ |
| Sibling files (HeaderV2.astro next to Header.astro) | V2 suffix on each filename in existing dirs; matches ROADMAP wording literally; harder cleanup | |
| Hybrid — v2/ dir + V2 suffix | Both directory namespace AND filename suffix | |

**User's choice:** v2/ namespace mirror — cleaner cleanup target.

### Q2: BaseLayoutV2 + v2.css — same v2/ namespace, or root?

| Option | Description | Selected |
|--------|-------------|----------|
| v2/ namespace everywhere | src/layouts/v2/BaseLayout.astro and src/styles/v2/global.css | ✓ |
| V2 suffix at root | src/layouts/BaseLayoutV2.astro and src/styles/v2.css (matches ROADMAP wording) | |
| Mixed | Components under v2/, layouts/styles at root with V2 suffix | |

**User's choice:** v2/ namespace everywhere — symmetric Phase 30 cleanup.

**Notes:** Decision means CONTEXT.md must explicitly call out that ROADMAP/REQUIREMENTS path wording is superseded (D-02).

---

## Token Naming Convention

### Q1: Which token-naming scheme for v2 CSS variables?

| Option | Description | Selected |
|--------|-------------|----------|
| Semantic role-based | --color-primary, --color-surface, --color-text, etc. Crito palette maps to roles. Easiest palette swap. | ✓ |
| Tailwind-style numeric scale | --color-neutral-50..900, --color-brand-500. Familiar but couples components to palette. | |
| Hybrid — semantic + scale escape hatch | Semantic primaries + numeric scale fallback. Most flexible, more surface. | |

**User's choice:** Semantic role-based.

### Q2: Same semantic approach for typography & spacing?

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — semantic everywhere | --text-display, --text-h1, --space-xs..2xl t-shirt scale | ✓ |
| Hybrid — semantic colors, t-shirt sizes for type & space | Keep --text-base..2xl Tailwind-style; --space-1..8 numeric | |

**User's choice:** Semantic everywhere.

### Q3: Collision avoidance with v1 — how strict?

| Option | Description | Selected |
|--------|-------------|----------|
| Different namespace, no overlap | v2 token names entirely distinct from v1; pure delete in Phase 30 | ✓ |
| Allow shared neutrals if values match | Smaller CSS but creates hidden v1↔v2 dependency | |
| Decide as I go | No upfront rule — risky | |

**User's choice:** Strict no-overlap.

---

## HeaderV2 Behavior Details

### Q1: Where should the "Let's Talk" CTA in HeaderV2 link to?

| Option | Description | Selected |
|--------|-------------|----------|
| /#contact anchor | Same v1 pattern; works as scroll on /, navigate from elsewhere | ✓ |
| /contact route | More stable if homepage anchor moves; adds redirect hop | |
| Smart — anchor on homepage, route elsewhere | Effectively same as /#contact (browser handles both behaviors) | |

**User's choice:** /#contact anchor.

### Q2: Mobile hamburger pattern?

| Option | Description | Selected |
|--------|-------------|----------|
| Full-screen overlay | Modern agency default; large taps; focus trap; ESC + backdrop close | ✓ |
| Slide-in side drawer | Common but more complex z-index; overkill for 4 links | |
| Dropdown panel under header | Simplest; less immersive | |

**User's choice:** Full-screen overlay.

### Q3: Build fresh v2 mobile nav, or adapt existing MobileNav.astro?

| Option | Description | Selected |
|--------|-------------|----------|
| Fresh component in v2/ | Built for full-screen overlay, uses v2 tokens, no legacy code | ✓ |
| Copy and adapt existing MobileNav.astro | Faster start; risks inheriting legacy patterns | |

**User's choice:** Fresh component.

### Q4: Active-link state on HeaderV2?

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — underline or color accent | Detect Astro.url.pathname; set aria-current; visual cue | ✓ |
| No — hover only | Simpler, weaker a11y signal | |
| You decide | Defer to planner | |

**User's choice:** Yes, with aria-current.

---

## Pen File Scope for Phase 23

### Q1: How much should design/design-system.pen contain at end of Phase 23?

| Option | Description | Selected |
|--------|-------------|----------|
| Tokens + Header/Footer factored | Tokens + factored Header/Footer (since this phase ships them in code); other components added in later phases | ✓ |
| Tokens only — component factoring deferred | Phase 23 .pen has only the variable mapping; components stay as raw Crito frames | |
| Full factoring upfront | Factor every Crito component into .pen now; .pen leads code | |

**User's choice:** Tokens + Header/Footer factored. Pen file grows alongside code.

### Q2: Where should the Pencil-variable → CSS-property mapping live?

| Option | Description | Selected |
|--------|-------------|----------|
| Inline in design-system.pen as a text frame | Single source of truth, lives next to the variables | ✓ |
| Separate markdown file | Easier to grep/diff; two places to maintain | |
| Both — .pen + auto-generated markdown | Most overhead, drift risk | |

**User's choice:** Inline in .pen.

### Q3: Capture Crito reference frame node IDs in CONTEXT.md now?

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — list specific Crito node IDs in CONTEXT.md | Inspect now via Pencil MCP; lock visual target | ✓ |
| Defer to research-phase | CONTEXT.md just says "reference Crito header/footer" | |

**User's choice:** Yes — captured ULZiU (Menu bar / header) and Y1ldm (Footer) in CONTEXT.md D-18.

### Q4: Confirm direction after seeing Crito's structure (6-link nav, 3-col footer) vs ours (4 links, 2-col)?

| Option | Description | Selected |
|--------|-------------|----------|
| Confirmed — adapt visually, override structure | Keep 4 links + 2-col per REQUIREMENTS; adapt Crito's visual treatment | ✓ |
| Discuss the footer column count | Revisit 2-col after seeing Crito 3-col | |

**User's choice:** Confirmed — adapt visually, override structure.

---

## Claude's Discretion

- Exact OKLCH values for color tokens (extracted from Crito during planning)
- Exact font family names + `@fontsource-variable/*` package names (confirmed during research)
- Border radius scale, shadow tokens, transition tokens, container/breakpoint values
- Specific visual style for active-link highlight (underline vs accent color vs weight bump)
- Whether `BaseLayoutV2` imports v2/global.css directly or via `<link>` in `<head>`
- FOUND-06 coexistence verification approach (manual visual check vs Lighthouse vs snapshot)

## Deferred Ideas

- Dark mode for v2 (DARK-* — v1.5)
- Newsletter signup (CNT-04 — v1.5)
- /about standalone page (ABOUT-01..02 — v1.5)
- Button/Card/Input/Badge primitives (Phase 24)
- Pen factoring for non-header/footer components (Phases 24–29 as each ships)
- Page migrations (Phases 25–29)
- v1 deletion + Playwright selector audit (Phase 30)

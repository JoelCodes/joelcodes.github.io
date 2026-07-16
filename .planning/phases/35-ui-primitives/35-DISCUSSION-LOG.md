# Phase 35: UI Primitives - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-15
**Phase:** 35-ui-primitives
**Areas discussed:** Scope edges, Component APIs, On-dark variants, Dev isolation page

---

## Scope edges

### Q1 — Where does Service Card get built? (COMP-02 lists it; success criteria omit it)

| Option | Description | Selected |
|--------|-------------|----------|
| Build it in 35 (Recommended) | COMP-02 → Phase 35 traceability wins; atomic presentational card like the others; Phase 36 stays focused on interactive pieces | ✓ |
| Defer to Phase 36 | Take success criteria as written; COMP-02 completion spans two phases | |
| You decide | Planner picks based on plan sizing | |

**User's choice:** Build it in 35

### Q2 — Retrofit SiteHeader's inline Book-a-call link with `<CTAButton>` this phase?

| Option | Description | Selected |
|--------|-------------|----------|
| Retrofit in 35 (Recommended) | Swap once CTAButton exists; must be pixel-neutral vs Phase 34-approved rendering | ✓ |
| Leave until Phase 37 | Phase 37 wires IA-03 BOOKING_URL anyway | |
| You decide | Locked intent: duplication doesn't survive past Phase 37 | |

**User's choice:** Retrofit in 35

### Q3 — Where do the new Wavelength primitives live?

| Option | Description | Selected |
|--------|-------------|----------|
| New src/components/wl/ dir (Recommended) | Mirrors --wl-* namespace isolation; old ui/ dies wholesale in Phase 41 | ✓ |
| Alongside in src/components/ui/ | Names don't collide; Phase 41 deletes selectively | |
| You decide | Constraint: old and new stay cleanly separable | |

**User's choice:** New src/components/wl/ dir

### Q4 — Rule for primitives found on Components page 36:5 beyond the COMP-01/02 list?

| Option | Description | Selected |
|--------|-------------|----------|
| Flag, don't build (Recommended) | Stick to the roster; extras flagged for roadmap triage | ✓ |
| Build small extras inline | Tiny dependencies built without ceremony | |
| You decide | Planner judges case by case | |

**User's choice:** Flag, don't build

---

## Component APIs

### Q1 — How should CTAButton props express the four Figma variants?

| Option | Description | Selected |
|--------|-------------|----------|
| variant, 1:1 Figma (Recommended) | 'solid' \| 'ghost' \| 'ghost-on-dark' \| 'small'; Small is a variant, not a size, matching Figma's model | ✓ |
| variant + size props | More conventional but invents a size axis Figma doesn't have | |
| You decide | Planner inspects the Figma variant structure | |

**User's choice:** variant, 1:1 Figma

### Q2 — How are calendar/mail icons passed in?

| Option | Description | Selected |
|--------|-------------|----------|
| icon name prop (Recommended) | icon="calendar" \| "mail"; SVGs baked in, geometry extracted from Figma (D-16 discipline); closed set | ✓ |
| Named `<slot>` | Max flexibility, looser fidelity guarantee | |
| You decide | Planner checks icon placement in the Figma component | |

**User's choice:** icon name prop

### Q3 — CTAButton element: `<a>`-only or polymorphic?

| Option | Description | Selected |
|--------|-------------|----------|
| `<a>`-only (Recommended) | href required; every known use is a link; zero client JS trivially true | ✓ |
| Polymorphic a/button | Future-proof but speculative | |
| You decide | Planner reads what Phases 36-39 need | |

**User's choice:** `<a>`-only

### Q4 — Content-passing convention for supporting primitives?

| Option | Description | Selected |
|--------|-------------|----------|
| Props for data, slot for prose (Recommended) | Structured fields as props; free-flowing text through the default slot; idiomatic Astro | ✓ |
| Props-only everywhere | Uniform but awkward for multi-line copy / italic emphasis | |
| You decide | Planner sets convention per component | |

**User's choice:** Props for data, slot for prose

---

## On-dark variants

### Q1 — How do components take on their on-dark (dark-surface) appearance?

| Option | Description | Selected |
|--------|-------------|----------|
| Explicit variant prop (Recommended) | variant="ghost-on-dark" / onDark, matching Figma names 1:1; predictable and greppable | ✓ |
| Context auto-adapt | Parent .on-dark class detection; invisible mechanism, breaks 1:1 traceability | |
| You decide | Planner counts on-dark variants on the Components page | |

**User's choice:** Explicit variant prop

### Q2 — Interaction with dark MODE (.dark token flip)?

| Option | Description | Selected |
|--------|-------------|----------|
| Footer precedent (Recommended) | Non-flippable values (literal/local custom properties) from Figma; stable across both themes; research verifies against 117:103 | ✓ |
| Flippable tokens anyway | Only correct if the dark mockup shows those sections changing | |
| You decide | Evidence over rule — extract what 117:103 shows | |

**User's choice:** Footer precedent

### Q3 — Add new on-dark contrast pairs to scripts/check-contrast.mjs?

| Option | Description | Selected |
|--------|-------------|----------|
| Extend the script (Recommended) | New text-on-background pairs join the matrix; D-10 re-runnable guarantee extends to components | ✓ |
| Manual check at gate | Lighter, but guarantee decays | |
| You decide | Planner weighs maintenance vs one-off | |

**User's choice:** Extend the script

---

## Dev isolation page

### Q1 — Shape of the temporary dev page?

| Option | Description | Selected |
|--------|-------------|----------|
| One page, Figma order (Recommended) | Single route rendering everything in Components-page order; screenshot comparison near-mechanical | ✓ |
| One section per primitive | Prop-permutation grids; better exhaustiveness, looser Figma mapping | |
| You decide | Planner serves both axe run and screenshot gate | |

**User's choice:** One page, Figma order

### Q2 — How are both themes verified?

| Option | Description | Selected |
|--------|-------------|----------|
| OS toggle + dark strips (Recommended) | prefers-color-scheme emulation for dark mode; ink-background strips for on-dark variants | ✓ |
| Side-by-side forced panels | Scoped .dark wrapper could misrepresent the global token flip | |
| You decide | Planner keeps the gate honest with system-only dark mode | |

**User's choice:** OS toggle + dark strips

### Q3 — Deletion/prod-safety mechanics?

| Option | Description | Selected |
|--------|-------------|----------|
| DEV-gate + delete (Recommended) | import.meta.env.DEV gate while alive (blog-gate pattern); final commit deletes; grep prod build to verify | ✓ |
| Delete only | Simpler, but nothing protects an accidental mid-phase merge | |
| You decide | Belt-and-suspenders vs simplicity | |

**User's choice:** DEV-gate + delete

### Q4 — What happens to axe coverage after deletion?

| Option | Description | Selected |
|--------|-------------|----------|
| Temp test, dies with page (Recommended) | Playwright+axe spec deleted with the page; durable coverage via Phases 37-39 page tests + QUAL-01 sweep | ✓ |
| Keep a component-level axe suite | Durable isolation coverage but unrequested infrastructure | |
| You decide | Planner wires the axe run | |

**User's choice:** Temp test, dies with page

---

## Claude's Discretion

- Hover/focus/active states where Figma's static frames don't spec them (derive from chrome conventions, flag inventions)
- Breadcrumb/Step aria structure (standard WAI-ARIA, axe-verified)
- Exact dev-page route name and internal layout
- ServiceCard highlight variant prop shape (mirror Figma variant structure)
- Plan sizing/split across COMP-01 vs COMP-02

## Deferred Ideas

None — discussion stayed within phase scope.

# Phase 24: v2 Primitive Library + Design System Page - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-14
**Phase:** 24-v2-primitive-library-design-system-page
**Areas discussed:** Button surface area, Card composition strategy, Badge semantics, Design-system page scope, Cross-cutting primitive concerns

---

## Area Selection

| Area | Selected |
|------|----------|
| Button surface area | ✓ |
| Card composition strategy | ✓ |
| Badge semantics | ✓ |
| Design-system page scope | ✓ |

User selected all four offered gray areas.

---

## Button Surface Area

### Variants

| Option | Description | Selected |
|--------|-------------|----------|
| 3 variants (primary / ghost / link) | Recommended. Covers Crito's CTA, HOME-01 dual CTA, and recurring "Read more →" / "Let's talk →" arrow links. | ✓ |
| 2 variants (primary / ghost) | Inline arrow links become plain `<a>` with utility classes — inconsistent usage. | |
| 4 variants (primary / secondary / ghost / link) | Adds a secondary filled style with no documented v1.4 use case. | |

### Sizes

| Option | Description | Selected |
|--------|-------------|----------|
| 2 sizes (sm + md) | Recommended. Drops v1's rarely-used `lg`. | |
| Single size (md only) | Forces visual consistency, no judgment calls. | |
| 3 sizes (sm + md + lg) | Matches v1; useful if hero CTAs ever want oversized treatment. | ✓ |

**User's choice:** 3 sizes — kept v1 parity despite the recommendation.

### Polymorphic href

| Option | Description | Selected |
|--------|-------------|----------|
| Polymorphic href → `<a>` | Recommended. Matches v1 + existing v2 Header.astro "Let's Talk" pattern. | ✓ |
| Strict `<button>` only | Caller wraps `<a>` around `<Button>`. More verbosity at every CTA. | |

### Icons

| Option | Description | Selected |
|--------|-------------|----------|
| Built-in iconLeft + iconRight props | Recommended. Button handles spacing, sizing, currentColor. `link` variant defaults iconRight=ArrowRight. | ✓ |
| Composition via default slot | Maximum flexibility but every caller re-implements icon→label gap. | |
| No icon support | Cleaner primitive but offloads pattern to callers. | |

**Notes:** User accepted recommendations on variants, polymorphic href, and icons. Deliberately kept 3 sizes despite recommendation of 2.

---

## Card Composition Strategy

### Structural Model

| Option | Description | Selected |
|--------|-------------|----------|
| Compositional base + sub-components | Recommended. `<Card>` + `<CardHeader>` + `<CardBody>` + `<CardFooter>`. Feature cards (ProjectCard, StatCard, ServiceCard) wrap Card. | ✓ |
| Fixed variants (`variant='stat' | 'project' | ...`) | Simpler call site but bloats the primitive. | |
| Single Card + slot only | Smallest primitive; every feature card re-implements internal spacing. | |

### Visual Variants

| Option | Description | Selected |
|--------|-------------|----------|
| One visual treatment | Recommended. Single uniform Crito-style card; feature cards add accents via slots. | |
| Two visuals: default + elevated | Optional `elevated` prop adds shadow on top of base outlined treatment. | ✓ |
| Three visuals: outlined / elevated / flat | Most expressive but agrees on three styles before Phases 27–29 prove what's needed. | |

**User's choice:** Two visuals — chose flexibility over minimalism.

### File Organization

| Option | Description | Selected |
|--------|-------------|----------|
| Separate files in `ui/` | Recommended. Four .astro files; each imported separately. Matches Astro idioms. | ✓ |
| `card/index.ts` barrel | Single-line import; more setup. | |
| Slot-based instead of sub-components | Avoids multiple components but verbose at call sites. | |

### Hover Behavior

| Option | Description | Selected |
|--------|-------------|----------|
| `interactive` prop on Card | Recommended. Reusable hover/focus pattern; ProjectCard consumes it for PROJ-04 hover overlay. | ✓ |
| ProjectCard implements its own hover | Cleaner Card primitive but each feature card re-implements lift + focus-visible. | |
| Defer to Phase 27 | Lower YAGNI risk; small replanning cost later. | |

---

## Badge Semantics

### Semantic Role

| Option | Description | Selected |
|--------|-------------|----------|
| Small chip/tag | Recommended. Serves PROJ-05 "Featured", possible service/blog tags. HOME-03/PROJ-02 stat strips become Card + typography. | ✓ |
| v1-style metric block | Keeps v1 `label/value/description` semantics; PROJ-05 chip becomes a separate primitive. | |
| Build both Badge + Stat | Two primitives in Phase 24; expands scope beyond 4 documented primitives. | |

### Variants

| Option | Description | Selected |
|--------|-------------|----------|
| 2 variants (accent + muted) | Recommended. Smallest API surface covering all known v1.4 uses. | |
| 3 variants (accent + muted + outline) | Adds a quieter outline style — useful for blog tag rows. | ✓ |
| Single variant | Loses ability to draw attention to featured items. | |

### Icon Support

| Option | Description | Selected |
|--------|-------------|----------|
| Optional iconLeft prop | Matches Button icon pattern. | ✓ |
| No icon support | Recommended. Keeps primitive minimal; add later when a phase needs it. | |

**Notes:** User chose 3 variants (more flexibility) and icon support (consistency with Button) over the more-minimal recommendations.

---

## Design-System Page Scope

### Page Sections

| Option | Description | Selected |
|--------|-------------|----------|
| Tokens + Primitives + Usage (code snippets) | Recommended. Three sections; skips Patterns since page-specific layouts live in actual pages. | ✓ |
| Tokens + Primitives only | Smallest page; live demos act as the only docs. | |
| Full reference (Tokens + Primitives + Usage + A11y notes) | Most thorough; public-showcase quality. | |

### `/design-system.json` Shape

| Option | Description | Selected |
|--------|-------------|----------|
| Flat semantic shape | Recommended. Matches v2 token naming; one `{cssVar, value}` per leaf. | ✓ |
| Preserve v1's nested shape | Back-compat with v1 endpoint; no external consumers documented. | |
| Drop the JSON endpoint | Minimal maintenance if no machine-readable token consumer is needed. | |

### Input Demo States

| Option | Description | Selected |
|--------|-------------|----------|
| Default + focused + error + disabled (+ textarea + select) | Recommended. Covers WCAG-relevant states and full polymorphic API. | ✓ |
| Default + error only | Minimum required by COMP-03 wording. | |
| Full state matrix | + required + helper-text — largest demo footprint. | |

### Plan 24-03 Test Target

| Option | Description | Selected |
|--------|-------------|----------|
| Test against `/design-system` page itself | Recommended. Single target, real BaseLayoutV2 integration. | ✓ |
| Isolated test routes per primitive | Smaller blast radius but adds non-shipped routes. | |
| Component-level tests via `@astrojs/test-utils` | Fastest feedback; doesn't catch integration issues. | |

---

## Cross-Cutting Primitive Concerns (follow-up round)

### Focus-Ring Style

| Option | Description | Selected |
|--------|-------------|----------|
| 2px accent outline + offset | Recommended. Single recognizable cue; satisfies WCAG ≥3:1 contrast on white surface. | ✓ |
| Browser default `:focus-visible` | Zero custom code; loses design consistency. | |
| Box-shadow ring (no outline) | Softer visual; doesn't affect layout. | |

### Token Consumption Pattern

| Option | Description | Selected |
|--------|-------------|----------|
| Tailwind v4 auto-generated utilities | Recommended. `class='bg-primary text-surface'` works because of `@theme` block. | ✓ |
| Scoped `<style>` with `var()` | Doubles styling source; risk of drift. | |
| Mixed (utilities + scoped style for token-driven visuals) | Pragmatic but harder to audit. | |

### CheckboxGroup Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Defer to Phase 28 | Recommended. Implementation-coupled to contact form's 8-field layout. | ✓ |
| Include in Phase 24 | Larger scope; requires roadmap COMP-* expansion. | |
| Build as part of Input polymorphism | Crowded Input API; bad fit for checkbox-group layout semantics. | |

---

## Claude's Discretion

- Exact padding values per primitive — derived from Crito visual reference during planning.
- Exact typography weights for label/error/helper text — derived from Crito and locked tokens.
- Input border thickness and focused-state border color (vs the outline focus ring) — derived from Crito.
- Card shadow value when `elevated=true` — derive from Crito; optionally add a `--shadow-md` token to the v2 stylesheet if more than one primitive needs it.
- Hover-lift magnitude on Card with `interactive` — derive from Crito or use a small `translateY(-2px)`.
- TypeScript signatures for icon props (Lucide types vs `any`) — implementer's choice.

## Deferred Ideas

- v2 CheckboxGroup → Phase 28.
- Feature cards (ProjectCard, StatCard, ServiceCard, BlogCard) → Phases 26 / 27 / 29.
- `/design-system.json` external consumer integration → future.
- Dark-mode variants → v1.5+.
- Storybook → not planned (design-system page serves the docs role).
- Stat primitive → explicitly NOT built; stats use Card + typography.
- Additional Button / Badge variants → only if later phases need them.

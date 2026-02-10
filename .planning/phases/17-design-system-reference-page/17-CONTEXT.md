# Phase 17: Design System Reference Page - Context

**Gathered:** 2026-02-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Internal design system documentation page exists with all components, tokens, and utilities. Developer (Joel or AI agents) can view Button, Card, Input, Badge variants, OKLCH color palette, typography scale, and isometric utilities on /design-system page.

</domain>

<decisions>
## Implementation Decisions

### Page Structure
- Sidebar navigation with persistent nav on desktop, content scrolls
- Hidden but accessible: not in main nav, but /design-system URL works
- Mobile behavior: Claude's discretion

### Section Order
- Claude's discretion: pick logical order based on developer workflow

### Code Examples
- "View code" toggle button reveals/hides snippet for each component
- Copy-to-clipboard button on each code block
- Static examples (no live props toggles)
- Syntax highlighting matches site theme (existing expressive-code setup from blog)

### Token Display
- Color swatches showing OKLCH + fallback hex values
- Follow site theme for dark/light mode (no separate toggle)
- Typography: both font specimens (character sets, weights) AND practical scale examples
- Isometric utilities (iso-shadow, iso-glow, iso-rotate): visual before/after examples

### Developer Workflow
- Primary audience: Joel and AI coding agents working on the site
- Add instruction to CLAUDE.md telling agents to check design system first
- Semantic HTML with clear section IDs for easy AI parsing
- JSON export at /design-system.json with tokens/components data for programmatic access

### Claude's Discretion
- Exact section order
- Mobile sidebar behavior (hamburger vs tabs)
- Level of "when to use" guidelines per component
- Code block styling details

</decisions>

<specifics>
## Specific Ideas

- AI agents should be explicitly instructed via CLAUDE.md to consult /design-system and use existing components before creating new ones
- JSON export enables AI agents to programmatically understand available tokens/components

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 17-design-system-reference-page*
*Context gathered: 2026-02-10*

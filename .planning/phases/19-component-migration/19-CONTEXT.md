# Phase 19: Component Migration - Context

**Gathered:** 2026-02-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Migrate CRITICAL and HIGH severity component inconsistencies so all production pages use design system components (Button, Card, Input, Badge) consistently. The audit in .planning/AUDIT.md defines the 16 findings to address.

</domain>

<decisions>
## Implementation Decisions

### Migration order
- Page-by-page approach (complete one page fully before moving to next)
- Start with Contact page (highest user interaction, most WCAG gaps)
- Batch filter buttons (Portfolio index + Blog index) in single commit since they share identical pattern
- Atomic commits per page for easier rollback

### Component adaptation
- Add props to components when raw HTML has features component doesn't support (design system grows)
- Create new "outline" variant for Button to distinguish inactive filter buttons from active (solid = active, outline = inactive)
- FAQ accordion: keep custom styling, don't wrap in Card (unique enough, MEDIUM priority deferred)

### Filter button behavior
- Button component accepts onclick prop and forwards to underlying element
- Refactor setActiveButton JavaScript to variant toggling (JS toggles data-variant attribute, CSS handles rest)
- Solid variant = active filter, outline variant = inactive filter
- Keep existing filter logic, just modernize the integration pattern

### Testing approach
- Manual browser check after each page migration (dev server visual verification)
- Verify both light + dark mode after each migration (catch class overrides that break dark mode)
- Run axe-core accessibility testing once at end of phase (not per-page)
- Run Lighthouse CI checks at end of phase to ensure 90%+ thresholds maintained

### Claude's Discretion
- Loading state implementation for form submission (disabled + loading props, or disabled-only with custom spinner)
- Exact outline variant styling (border treatment, background, hover state)
- Minor LOW priority items (back navigation links, Badge usage for metrics) - address if time permits

</decisions>

<specifics>
## Specific Ideas

- Contact page is priority because it's the lead generation funnel endpoint
- Filter buttons pattern affects 2 pages, so fixing once is high leverage
- Dark mode verification is important because shadow→glow transformation relies on correct component usage

</specifics>

<deferred>
## Deferred Ideas

- FAQ accordion Card wrapper — keeping custom styling per discussion (MEDIUM priority)
- LOW priority items from audit may be addressed if time permits:
  - Back navigation links as Button components
  - Badge component for hero metrics

</deferred>

---

*Phase: 19-component-migration*
*Context gathered: 2026-02-10*

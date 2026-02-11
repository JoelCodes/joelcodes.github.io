# Phase 22: Footer Enhancement - Context

**Gathered:** 2026-02-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Add social icons (Instagram, Substack) and secondary navigation to the footer. Icons must have 44x44px touch targets and proper aria-labels. Navigation mirrors header (Blog, Projects, FAQ, Contact). WCAG 2.2 AA accessibility required.

</domain>

<decisions>
## Implementation Decisions

### Social Icons Layout
- Position: Top of footer, first visual element above navigation
- Arrangement: Side by side, horizontally centered
- Style: Plain icons matching text color (no containers or backgrounds)
- Spacing: Generous gap (24-32px) between icons for clear separation

### Footer Navigation Structure
- Layout: Horizontal row of links, consistent with header pattern
- Order: Same as header — Blog, Projects, FAQ, Contact
- Separators: Bullet/dot separators between links (e.g., "Blog · Projects · FAQ · Contact")
- Contact link: Plain styling like other links, navigates to /#contact

### Visual Hierarchy
- Primary focus: Social icons are most prominent (encourages follows)
- Icon color: Match footer text color for subtle, unified appearance
- Copyright: Smallest text, positioned at bottom with minimal visual weight
- Section separation: Vertical spacing only, no divider lines

### Claude's Discretion
- Exact pixel values for icon sizes (must meet 44x44px minimum)
- Specific spacing values between footer sections
- Hover state styling (consistent with site patterns)
- Focus indicator implementation (must pass axe-core)
- Responsive behavior on mobile

</decisions>

<specifics>
## Specific Ideas

No specific references — open to standard approaches within the neobrutalist design system.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 22-footer-enhancement*
*Context gathered: 2026-02-10*

# Phase 3: Portfolio & Case Studies - Context

**Gathered:** 2026-01-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Display Joel's work with business-outcome focused case studies. Includes portfolio grid page, individual case study pages with screenshots, problem/solution narratives, and results metrics. Testimonials section and homepage portfolio preview are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Portfolio Grid Layout
- 3 cards per row on desktop (responsive to fewer on mobile)
- Minimal card content: title + thumbnail only (encourages click-through)
- Thumbnails are screenshots inside browser/device mockups for polished presentation
- Subtle lift + shadow hover effect on cards

### Case Study Page Structure
- Opens with title + problem statement (story-first, hook with the challenge)
- Section order: Problem → Solution → Screenshots → Results
- Screenshots in dedicated gallery section (not inline with text)
- Simple "Back to Portfolio" link (no prev/next or related projects)

### Content Presentation
- Business results displayed in summary box (grouped metrics in highlighted callout)
- Tech stack in separate "Built With" section at bottom
- Story-driven narrative tone ("When Sarah's bakery was drowning in manual orders...")
- Include client testimonial quote block if available, skip if not

### Navigation & Discovery
- Portfolio lives on separate /portfolio page
- Filter buttons by service type: Web Apps / Automation / AI Development (matches services)
- Fade/animate transition when filtering (non-matching cards fade, matching reflow)

### Claude's Discretion
- Exact card dimensions and spacing
- Gallery implementation (lightbox vs inline gallery)
- Mobile breakpoint behavior for grid
- Summary box styling details
- Animation timing for filter transitions

</decisions>

<specifics>
## Specific Ideas

- Device mockups should feel professional — similar to Dribbble portfolio presentations
- Story-driven narratives should be relatable to small business owners, not technical jargon
- Filter categories match the three services from Phase 2 (Web Apps, Automation, AI Development)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-portfolio-case-studies*
*Context gathered: 2026-01-26*

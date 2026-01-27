# Phase 5: Blog & Content Marketing - Context

**Gathered:** 2026-01-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Build blog listing and post pages with MDX support and category filtering. Users can browse posts, filter by tags, and read full articles. Blog serves thought leadership and SEO content marketing goals.

</domain>

<decisions>
## Implementation Decisions

### Post layout & reading experience
- Narrow reading width (65ch) for optimal long-form readability
- Syntax highlighted code blocks with language label and copy button
- Sticky sidebar table of contents that highlights current section
- Images break out to full width with centered captions below

### Blog listing & discovery
- Card grid layout (2-3 columns), matching portfolio visual pattern
- Each card shows: title, date, excerpt, category tag, featured image
- Default sort: newest first (chronological)
- "Load more" button for pagination (start with subset, reveal more on click)

### Categories & filtering
- Open-ended tags (not fixed categories) — free-form per post
- Multiple tags per post allowed
- Horizontal tag pills above grid (matches portfolio filter pattern)
- Dedicated tag pages exist (e.g., /blog/tag/ai) for SEO and shareability

### Content structure
- Reading time displayed on cards and post header ("5 min read")
- Excerpts auto-generated from first ~160 characters of post body
- No author display (personal blog, author implicit)
- Featured images required for all posts

### Claude's Discretion
- Exact code syntax highlighting theme
- TOC generation implementation details
- Load more button batch size
- Tag page layout specifics

</decisions>

<specifics>
## Specific Ideas

- Tag pill filter UI should match the portfolio page pattern for consistency
- Card grid visual style should feel cohesive with portfolio cards
- Sticky TOC similar to documentation sites (visible while scrolling, highlights active section)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-blog-content-marketing*
*Context gathered: 2026-01-27*

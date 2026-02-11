# Phase 21: Navigation Cleanup - Context

**Gathered:** 2026-02-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Simplify site navigation by removing redundant homepage section links from header, implementing a permanent redirect from /contact to /#contact, and removing the FAQ accordion from footer. The dedicated /faq page remains; Phase 22 handles footer social icons.

</domain>

<decisions>
## Implementation Decisions

### Header link selection
- Keep only: Blog, Projects, FAQ, Contact
- Remove: About, Services, Process, Tech (homepage section links)
- Contact link targets /#contact (anchor), not /contact page
- FAQ link targets /faq (dedicated page)
- Mobile nav mirrors desktop exactly: Blog, Projects, FAQ, Contact

### Redirect behavior
- HTTP 301 permanent redirect from /contact to /#contact
- Use Astro redirects config in astro.config.mjs
- Delete /contact.astro entirely (no archive)
- Trust Phase 20 work — homepage form already has all 8 fields and webhook integration

### Footer simplification
- Remove FAQ accordion entirely (duplicate of /faq page content)
- Remove standalone FAQ link
- No replacement FAQ reference link needed — header nav covers it
- Keep everything else in footer (copyright, existing content, social placeholders)

### Transition UX
- Smooth scroll when clicking Contact in header
- Standard browser anchor behavior for redirect landing (no custom scroll)
- No visual indicator/highlight on arrival
- Add scroll-margin-top offset on #contact section to account for sticky header

### Claude's Discretion
- Exact scroll-margin-top value based on header height
- Smooth scroll implementation method (CSS vs JS)
- How to configure Astro redirects for hash anchor

</decisions>

<specifics>
## Specific Ideas

- Header should feel cleaner — only pages that lead somewhere distinct
- Mobile nav stays simple — no "Home" link, logo tap is sufficient
- FAQ content already preserved on /faq (Phase 16) — accordion removal is safe

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 21-navigation-cleanup*
*Context gathered: 2026-02-11*

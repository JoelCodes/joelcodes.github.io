# Phase 4: Contact & Conversion - Context

**Gathered:** 2026-01-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Enable visitors to contact Joel via a form with clear success/failure feedback. Includes social links in footer. This phase does NOT include booking/scheduling, CRM integration, or analytics.

</domain>

<decisions>
## Implementation Decisions

### Form Layout & Fields
- Dedicated /contact page (not embedded on homepage)
- Fields: Name (required), Email (required), Project Type dropdown (optional), Message (required)
- Project Type options: Web App, Automation, AI Development, Other
- Include headline + intro text with response time promise ("I'll get back to you within 48 hours")

### Success & Error States
- Inline success message replaces form after submission (no redirect)
- Success message includes what to expect: "Thanks! I'll email you within 48 hours with next steps."
- Validation errors shown inline per field (red text below invalid field)
- Formspree failure shows error with email fallback: "Oops! Email me directly at joel@..."

### Trust Signals
- Brief privacy reassurance near form: "Your info stays between us. No spam, ever."
- Alternative contact methods visible: email address + LinkedIn profile link
- No additional credibility section needed (homepage establishes this)
- Hero CTA on homepage already links to /contact page

### Social Links
- Footer only (not header)
- Platforms: LinkedIn + GitHub
- Minimal outline icons (consistent with site's clean aesthetic)
- Links open in new tab

### Claude's Discretion
- Exact form styling and spacing
- Icon library choice (Heroicons, Lucide, etc.)
- Footer layout arrangement
- Submit button text and loading state

</decisions>

<specifics>
## Specific Ideas

- Response time promise is important: "48 hours" sets clear expectations
- Email fallback on error prevents lost leads if Formspree has issues
- Keep the page focused — no need for extra credibility content

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-contact-conversion*
*Context gathered: 2026-01-27*

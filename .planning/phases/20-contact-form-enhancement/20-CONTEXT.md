# Phase 20: Contact Form Enhancement - Context

**Gathered:** 2026-02-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Optimize contact form for lead generation with n8n webhook integration. Enhance existing form with additional fields that help qualify leads and provide better submission feedback. Creating new n8n workflows or CRM integrations are separate concerns.

</domain>

<decisions>
## Implementation Decisions

### Form field design
- Fields: Name (required), Email (required), Company (optional), Message (required)
- Add "What challenges do you need help with?" open text field (optional) — comes before solutions
- Add "What kinds of solutions do you think you'll need?" multi-select checkboxes:
  - AI, Automations, Web Apps, Consultation, Not Sure
  - Optional (no selection required)
  - Non-exclusive ("Not Sure" can be selected alongside others)
- Message field: no minimum character requirement
- Message placeholder: guiding questions like "What challenge are you facing? What's your timeline?"

### Lead qualification
- Budget dropdown (optional): Under $2K / $2K-5K / $5K-10K / $10K-25K / $25K+
- Timeline dropdown (optional): This week / This month / This quarter / Flexible
- Both optional to reduce friction

### Submission feedback
- Success: redirect to /thank-you page
- Thank you page includes: confirmation message, expected response time, calendar booking link (Calendly or similar placeholder)
- Validation errors: inline per field (error message below each invalid field)
- Network failure: error message + email fallback ("Couldn't send. Email me directly at...")

### Claude's Discretion
- Exact field order/layout (group related fields logically)
- Checkbox styling consistent with design system
- Thank you page design and content tone
- Calendar link placeholder implementation
- Error message wording

</decisions>

<specifics>
## Specific Ideas

- Message placeholder should include guiding questions: "What challenge are you facing? What's your timeline?"
- Solutions checkboxes match the three service categories from the homepage (AI, Automations, Web Apps) plus Consultation and Not Sure
- Challenges field comes before solutions checkboxes (problem before solution)
- Thank you page should include a Calendly-style booking link

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 20-contact-form-enhancement*
*Context gathered: 2026-02-10*

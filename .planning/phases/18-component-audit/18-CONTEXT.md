# Phase 18: Component Consistency Audit - Context

**Gathered:** 2026-02-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Systematically inventory all UI component usage across the site and categorize inconsistencies by severity. Output a prioritized audit document that Phase 19 will use to execute fixes. This phase is about discovery and documentation, not fixing.

</domain>

<decisions>
## Implementation Decisions

### Inconsistency criteria
- Check for component usage AND props (not just whether components are used)
- Full WCAG accessibility check: color contrast, touch targets, screen reader text, focus states, ARIA attributes
- Dark mode issues are bundled with visual inconsistencies (not a separate category)
- Flag raw HTML/Tailwind even if it visually matches — component usage is the goal

### Severity classification
- **CRITICAL**: Anything blocking users — broken functionality, missing focus states, WCAG violations
- **HIGH**: Brand impact — looks unprofessional, obvious visual breaks
- **MEDIUM**: Minor styling differences, slightly off visuals
- **LOW**: Minor visual/UX differences only (not code hygiene — no prop ordering, etc.)
- Same inconsistency on multiple pages = one finding with pages listed

### Audit output format
- Group findings by page (Homepage, Portfolio, Blog, etc.)
- Summary at top: counts by severity + key themes
- Each finding includes brief fix suggestion
- File location: `.planning/AUDIT.md` (planning root for easy reference)

### Migration scoping
- Phase 19 addresses ALL findings (CRITICAL + HIGH + MEDIUM + LOW)
- Issues outside component usage (content bugs, broken links) marked as INFO severity
- Migration plan is a section within the audit doc (not separate file)
- Priority within same severity: by page traffic (Homepage first, then major pages)

### Claude's Discretion
- Exact audit document structure and formatting
- How to handle edge cases not clearly covered above
- Specific wording of fix suggestions

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 18-component-audit*
*Context gathered: 2026-02-10*

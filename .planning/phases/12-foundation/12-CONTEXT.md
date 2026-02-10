# Phase 12: Foundation - Context

**Gathered:** 2026-02-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Performance and design system foundation for isometric enhancements. Migrate icon library for bundle size reduction, add isometric CSS utilities with dark mode glow support. This is infrastructure — no user-visible features, but enables Phases 13-15.

</domain>

<decisions>
## Implementation Decisions

### Icon Migration
- Migrate lucide-static → @lucide/astro in a single PR (all at once, not incremental)
- Standardize icon sizes to 5-tier scale: xs (12px), sm (16px), md (20px), lg (24px), xl (32px)
- Icons inherit color from text (currentColor), no explicit icon color classes

### Isometric Utility Organization
- Add utilities to existing global.css (not separate file)
- Use `iso-` prefix for all isometric classes (iso-container, iso-shadow, iso-rotate, etc.)
- Include 2-3 rotation angle presets (standard isometric + subtle tilt options)
- Include basic hover states: iso-hover-lift, iso-hover-glow for interactive elements

### Dark Mode Glow Behavior
- Medium glow intensity — clearly visible but not distracting
- Glow color derived from the element's own color (not fixed accent)
- Glow spread larger than shadow offset for softer effect
- 3 intensity levels: iso-glow-subtle, iso-glow, iso-glow-strong

### Testing Strategy
- Playwright screenshot tests for icon verification on all main pages (homepage, portfolio index, blog index, a project page, a blog post)
- Informal bundle size check (note reduction, don't enforce as test)
- Create hidden /test-isometric page showing all utility examples before use

### Claude's Discretion
- Exact rotation angle values (within the 2-3 preset guideline)
- CSS implementation details for preserve-3d transforms
- How to organize utilities within global.css

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches for CSS utility implementation.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 12-foundation*
*Context gathered: 2026-02-09*

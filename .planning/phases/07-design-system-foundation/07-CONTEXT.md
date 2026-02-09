# Phase 7: Design System Foundation - Context

**Gathered:** 2026-02-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish neobrutalist design tokens — colors, shadows, borders, typography — that all components will consume. This phase creates the foundational CSS variables and Tailwind @theme configuration. Component implementation is Phase 8.

</domain>

<decisions>
## Implementation Decisions

### Color Palette
- **Yellow:** Bright/electric yellow (#FFE500 range) — high energy, attention-grabbing
- **Turquoise:** Bright cyan-leaning (#00D4FF range) — electric, modern feel
- **Magenta:** Berry/raspberry (#E91E63 range) — warmer, slightly red-shifted
- **Usage:** Rotate by section — each homepage section gets a different primary color
- Dark mode: Colors may need 10-20% desaturation to reduce eye strain (Claude's discretion on exact values)

### Typography
- **Headings:** Bricolage Grotesque — geometric with quirky letterforms, variable weight/width
- **Body:** DM Sans — geometric, slightly friendlier than Inter
- **Weights:** Mix by heading level — H1 extra bold (800-900), H2-H3 bold (700), descending
- **Case:** H1 only in ALL CAPS, rest normal case

### Shadow & Border System
- **Shadow offset:** Medium (5-6px) — classic neobrutalist, clear visual separation
- **Shadow color:** Match accent color — yellow element gets yellow shadow, etc.
- **Border thickness:** 3-4px throughout — bold, clearly neobrutalist
- **Dark mode shadows:** Colored glow effect — shadows become colored glows (more futuristic feel)

### Density Guidelines
- **Overall target:** 3/10 — distinctive but not overwhelming
- **Bold zones:** Hero + CTAs only get maximum neobrutalist treatment
- **Content areas:** Subtle accents (3/10) — light borders, minimal shadows, some visual interest
- **Blog posts:** Heading accents only (2/10) — H1/H2 styled, body text clean for readability
- **Whitespace:** Moderate — balanced spacing, not too tight or loose

### Claude's Discretion
- Exact hex/OKLCH values that achieve the described character while passing WCAG
- Dark mode color desaturation percentages
- Specific shadow blur values (if any) for glow effects
- Typography size scale
- Spacing/padding scale values

</decisions>

<specifics>
## Specific Ideas

- Colors rotate by homepage section — creates visual journey through the page
- Dark mode shadows as glows rather than inverted shadows — gives futuristic feel that contrasts with the "raw" neobrutalist aesthetic
- H1 in ALL CAPS with Bricolage Grotesque should feel bold and confident
- Berry/raspberry magenta chosen over hot pink for warmth and approachability

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 07-design-system-foundation*
*Context gathered: 2026-02-09*

# Phase 1: Foundation & Design System - Context

**Gathered:** 2026-01-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Set up Astro/Tailwind project infrastructure with a responsive design system matching brand guidelines. This phase delivers the technical foundation and visual building blocks that all subsequent phases will use. Content, pages, and features are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Color Palette & Accents
- Yellow is the primary accent color — CTAs, links, key highlights
- Teal is the complementary accent — secondary buttons, variety from yellow in certain sections
- Support dark mode from day one — build both light and dark themes
- Pure contrast backgrounds — white in light mode, near-black in dark mode

### Typography System
- Heading vibe: Bold & friendly — rounded sans-serif, approachable but professional
- Use different font families for headings and body text (pairing, not single family)
- Headings scale moderately on mobile — noticeable but not dramatic reduction
- Use Google Fonts only for easy loading and zero licensing concerns

### Mobile Navigation
- Hamburger menu that triggers slide-in panel from right
- Full-screen takeover — menu covers entire screen when open
- Smooth slide animation (~200-300ms transition)
- Hamburger icon animates/morphs to X when open

### Photography Treatment
- B&W effect via CSS filter (grayscale) — store color images, display as B&W
- No hover-to-color effect — photos stay black and white always
- Thin border (1-2px) around images
- Sharp corners — no border-radius on images (crisp, editorial feel)

### Claude's Discretion
- Exact font choices within "bold & friendly" direction (Google Fonts)
- Specific color hex values for yellow and teal accents
- Precise animation timing and easing curves
- Type scale ratios and spacing system values
- Border color choice (dark vs subtle)

</decisions>

<specifics>
## Specific Ideas

- Design should feel professional but approachable — targeting small business owners who may be intimidated by "techy" sites
- Pure contrast backgrounds (white/near-black) will make the B&W photography and color accents pop
- Editorial sharp corners on images aligns with professional feel

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-design-system*
*Context gathered: 2026-01-26*

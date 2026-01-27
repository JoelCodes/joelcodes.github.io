---
phase: 02-core-content-positioning
plan: 01
type: execution-summary
subsystem: content
tags: [hero, services, value-proposition, homepage, astro-components]
requires: [01-01, 01-02, 01-03]
provides: [Hero.astro, Services.astro]
affects: [02-02, 02-03]
tech-stack:
  added: []
  patterns: [semantic-html, problem-first-messaging, service-card-grid]
key-files:
  created:
    - src/components/Hero.astro
    - src/components/Services.astro
  modified: []
decisions:
  - id: hero-above-fold
    what: Hero section minimum height 80vh to ensure CTA visible without scrolling
    why: Above-fold visibility critical for conversion, per landing page best practices
    alternatives: [Fixed pixel height, Full 100vh]
    trade-offs: 80vh balances visibility with allowing users to see content below
  - id: service-cards-equal-weight
    what: Three service cards with equal visual weight and no pricing
    why: Custom work requires conversation, no pricing per CONTEXT.md decision
    alternatives: [Feature comparison table, Tiered pricing cards]
    trade-offs: No pricing may require more discovery calls, but avoids sticker shock
metrics:
  duration: 1min
  completed: 2026-01-26
---

# Phase 2 Plan 1: Hero and Services Components Summary

**One-liner:** Problem-first hero with "Tired of off-the-shelf tools?" headline and three equal service cards (Web Apps, Automation, AI Development)

## What Was Built

Created two foundational homepage components implementing the value proposition and service overview:

### Hero Component (src/components/Hero.astro)
- **Problem-first headline:** "Tired of off-the-shelf tools that don't fit?"
- **Value-focused subheadline:** "Custom web apps, automation, and AI integration for small businesses that need exactly what they need."
- **Primary CTA button:** "Start a Conversation" linking to /contact
- **Above-fold layout:** min-h-[80vh] ensures headline and CTA visible without scrolling
- **Responsive typography:** text-4xl → text-5xl (md) → text-6xl (lg) scaling
- **Design system integration:** Uses font-heading, font-body, accent-yellow, and dark mode tokens

### Services Component (src/components/Services.astro)
- **Three equal service cards:**
  1. Web Apps - "Custom applications built for your exact workflow" (example: custom CRM)
  2. Automation - "Connect your tools and eliminate manual work" (example: order syncing)
  3. AI Development - "Intelligent features that enhance your product" (example: document processing)
- **Semantic structure:** section → h2 → article cards → h3 titles (proper heading hierarchy)
- **Responsive grid:** 1 column mobile → 3 columns desktop (grid-cols-1 md:grid-cols-3)
- **Illustrative examples:** Each card includes italicized example to clarify service scope
- **No pricing information:** Per CONTEXT.md decision, custom quotes require conversation

## Decisions Made

### Above-Fold Hero Height
- **Decision:** Set hero section to min-h-[80vh] for above-fold visibility
- **Rationale:** Primary CTA must be visible without scrolling for optimal conversion. 80vh balances visibility with hint that content exists below.
- **Alternatives considered:** 100vh (full viewport), fixed pixel height
- **Trade-offs:** 80vh allows slight peek at content below, encouraging scroll exploration

### Equal Service Card Weight
- **Decision:** Three cards with equal visual hierarchy, no pricing tiers
- **Rationale:** Custom work doesn't fit tiered pricing. Equal weight positions all services as equally valuable.
- **Alternatives considered:** Feature comparison table, tiered service packages
- **Trade-offs:** No pricing means more discovery calls needed, but avoids inappropriate price anchoring for custom work

### Illustrative Examples Pattern
- **Decision:** Include concrete examples ("Like a custom CRM") in each service card
- **Rationale:** Helps non-technical decision makers understand abstract services through familiar scenarios
- **Alternatives considered:** Technical feature lists, abstract descriptions only
- **Trade-offs:** Examples are illustrative not exhaustive, may set incorrect scope expectations if not managed

## Technical Approach

### Semantic HTML Structure
Both components follow semantic HTML5 patterns from RESEARCH.md:
- `<section>` for thematic groupings
- `<article>` for self-contained service cards
- Proper heading hierarchy (h1 for hero, h2 for section, h3 for cards)
- No div soup - semantic elements used throughout

### Design System Integration
Components fully integrate with Phase 1 design system:
- **Typography:** font-heading (Poppins) for titles, font-body (Inter) for content
- **Colors:** accent-yellow for CTA button, text-light/dark for text, muted for examples
- **Dark mode:** All elements support dark: variants using custom-variant pattern
- **Responsive spacing:** Tailwind classes for mobile-first responsive design

### Component Architecture
- **Standalone components:** Hero and Services are independent, composable units
- **Content in code:** Service data array in component frontmatter (simple, no CMS needed for 3 items)
- **No client-side JS:** Pure Astro components, zero JavaScript shipped to browser
- **Props-ready:** Components can accept props if needed for future flexibility

## Deviations from Plan

### Auto-fixed Issues
None - plan executed exactly as written.

### Implementation Notes
- Used Tailwind v4 classes directly (bg-accent-yellow) rather than arbitrary values
- Added subtle border to service cards (border-text-muted-light/20) for visual separation in both themes
- Centered hero content for visual balance and prominence

## Testing & Verification

### Build Verification
```
npm run build
✓ Completed successfully
1 page(s) built in 557ms
```

### Component Checklist
- [x] Hero.astro exists at src/components/Hero.astro
- [x] Services.astro exists at src/components/Services.astro
- [x] Both use semantic HTML (section, article, proper heading hierarchy)
- [x] Both use design system tokens (fonts, colors, dark mode)
- [x] Both are responsive (mobile-first with md: breakpoints)
- [x] Hero contains h1, subheadline, CTA button with href="/contact"
- [x] Services contains 3 article cards with h3 titles, descriptions, examples
- [x] Grid layout responsive: 1 col mobile, 3 cols desktop
- [x] No syntax errors (build succeeds)

### Manual Verification Needed (Next Plan)
- Visual appearance on mobile and desktop viewports
- Dark mode color contrast and readability
- CTA button hover states and clickability
- Overall positioning and tone alignment with brand

## Next Phase Readiness

### What's Ready
- **Value proposition foundation:** Hero clearly states problem and solution
- **Service positioning:** Three service offerings defined with examples
- **CTA path:** Button links to /contact (form to be built in Phase 4)
- **Semantic structure:** Proper HTML for accessibility and SEO

### What's Needed Next
1. **Process component:** 5-step collaborative workflow (Plan 02-02)
2. **FAQ component:** Common questions and objections (Plan 02-02)
3. **About component:** Personal story with credibility signals (Plan 02-03)
4. **Homepage composition:** Assemble all components into index.astro (Plan 02-03)
5. **Human verification:** Visual review of positioning and tone (Plan 02-04)

### Integration Notes
These components are ready to be imported and used in src/pages/index.astro:
```astro
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
// ... then use in <main> element
```

### Known Limitations
- **Content is static:** Service cards data in component code (acceptable for 3 items)
- **No interactivity:** Pure static components (intentional, matches Astro zero-JS pattern)
- **/contact route doesn't exist yet:** Will be created in Phase 4

## Files Changed

### Created
- `src/components/Hero.astro` (20 lines)
- `src/components/Services.astro` (43 lines)

### Modified
None

## Commits

| Hash    | Message                                                |
|---------|--------------------------------------------------------|
| 87c3e40 | feat(02-01): create Hero component with value proposition |
| f891574 | feat(02-01): create Services component with three service cards |

## Team Communication

### For Next Developer
These components are ready for composition into the homepage. They follow semantic HTML patterns and use the design system from Phase 1. The CTA links to /contact which doesn't exist yet - that will be built in Phase 4.

The problem-first headline "Tired of off-the-shelf tools that don't fit?" is per CONTEXT.md user decision. If tone feels off during human verification (Plan 02-04), that's the place to adjust.

### Dependencies for Future Phases
- **Phase 4 (Contact):** /contact route needed for Hero CTA button
- **Phase 6 (Performance):** These components may benefit from image optimization if photos added

---

*Summary completed: 2026-01-26*
*Duration: <1 minute*
*Status: Components ready for homepage composition*

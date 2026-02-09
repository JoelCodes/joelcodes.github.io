# Feature Landscape: Neobrutalist Design & Narrative Homepage

**Domain:** Portfolio Website Design (Neobrutalism + Narrative Structure)
**Researched:** 2026-02-09
**Context:** Subsequent milestone adding neobrutalist design to existing portfolio site
**Confidence:** HIGH

## Executive Summary

This research focuses on the NEW features needed for v1.1: transforming an existing minimalist portfolio site into a distinctive neobrutalist design with narrative homepage structure. The existing site already has core functionality (blog, projects, contact, dark mode). This analysis catalogs only the visual design patterns and narrative elements needed for the redesign.

**Key findings:**
- Neobrutalism is defined by thick borders (2-4px), hard offset shadows (4-6px, zero blur), high contrast colors, and asymmetric layouts
- Implementation via Tailwind is straightforward using border-*, shadow-*, and transform utilities
- Narrative homepage structure follows problem → solution → process → results pattern
- Critical risk: balancing bold aesthetics with accessibility (contrast ratios, readable typography)

## Table Stakes Features

Features users expect from neobrutalist design. Missing these = design feels incomplete or fake.

| Feature | Why Expected | Complexity | Dependencies | Notes |
|---------|--------------|------------|--------------|-------|
| **Thick borders (2-4px)** | Core neobrutalist visual identifier | LOW | Tailwind `border-2`, `border-4` | BLACK borders standard, color accents optional |
| **Hard offset shadows** | Creates depth without gradients | LOW | Tailwind custom shadow config | Typical: `4px 4px 0 0 #000`, zero blur |
| **High contrast color palette** | Defines neobrutalism vs minimalism | LOW | Tailwind color tokens | Already have yellow/teal/magenta |
| **Bold, chunky typography** | Visual weight matches border heaviness | MEDIUM | Font selection, weight classes | Need 700-900 weights |
| **Asymmetric layouts** | Breaks traditional grid, adds personality | MEDIUM | Flexbox/grid with intentional breaks | Avoids perfect symmetry |
| **Raw, unpolished aesthetic** | Rejects smooth minimalism | LOW | Remove gradients, rounded corners | May keep slight radius for readability |
| **Interactive hover effects** | Tactile feedback (shadow removal, transform) | LOW | Tailwind hover: utilities | Classic: remove shadow + translate on hover |
| **Color blocks for sections** | Visual separation without subtlety | LOW | Background color utilities | Yellow/teal/magenta on white/black |
| **Monospace or geometric fonts** | Reinforces brutalist vibe | LOW | Font family configuration | Consider for headings or accents |

## Differentiators

Features that make this portfolio stand out. Not expected, but highly valued for neobrutalist sites.

| Feature | Value Proposition | Complexity | Dependencies | Notes |
|---------|-------------------|------------|--------------|-------|
| **Narrative homepage structure** | Tells story of working together vs static sections | MEDIUM | Content restructure + component refactor | Solutions → Process (cyclical) → Tech → About → Contact |
| **Isometric/45° shadows** | More sophisticated than flat offset | MEDIUM | Custom shadow angles, transform tricks | Creates depth illusion, distinctive look |
| **Stacked/layered card effects** | 3D paper stack illusion | MEDIUM | Multiple shadows or pseudo-elements | Reinforces tangible, physical metaphor |
| **Animated "pressed" button states** | Simulates physical interaction | LOW | Transform + shadow transition | Remove shadow + translate(2px, 2px) |
| **Quirky micro-interactions** | Adds personality without clutter | MEDIUM | CSS animations or light JS | Hover wiggles, bounces, rotations |
| **Mixed-case or ALL CAPS headings** | Reinforces bold, unpolished vibe | LOW | Text-transform utilities | Use sparingly for hierarchy |
| **Retro UI elements** | 90s nostalgia (Windows 98 buttons, etc.) | MEDIUM | Custom component styling | Skip bars, fake dropdowns for visual interest |
| **Offset/overlapping elements** | Creates visual tension and depth | MEDIUM | Negative margins, z-index | Cards overlapping sections, images breaking boundaries |
| **Narrative case study format** | Problem → constraints → solution → results | MEDIUM | Content templates for projects page | Already have case studies, just need narrative polish |
| **Process as cyclical diagram** | Shows iteration, not linear workflow | HIGH | SVG or CSS diagram | Differentiates from typical step-by-step |

## Anti-Features

Features to explicitly NOT build. Common mistakes in neobrutalism.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Excessive color combinations** | Overwhelming, reduces contrast effectiveness | Stick to 2-3 bold colors + black/white. Yellow/teal/magenta is already pushing it. |
| **Unreadable text contrast** | Accessibility failure, violates WCAG | Always test yellow on white, magenta on black. Use contrast checker. |
| **Cluttered asymmetry** | Chaos ≠ asymmetry. Looks messy, not bold. | Asymmetry should be intentional, with clear focal points and whitespace. |
| **Rounded corners on everything** | Softens brutalist aesthetic | Use `rounded-none` or minimal `rounded-sm` (2-4px max). Avoid pill shapes. |
| **Soft gradients or blur** | Contradicts raw, unpolished principle | Solid colors only. Shadows have zero blur. |
| **Over-animation** | Distracts from content, feels gimmicky | Limit to hover states and 1-2 signature interactions. |
| **Breaking usability for aesthetics** | Navigation confusion, cognitive overload | Bold ≠ unusable. Maintain clear CTAs, readable body text, logical flow. |
| **Ignoring dark mode** | Existing feature users expect | Adapt neobrutalism for dark mode (invert shadows, adjust colors). |
| **Tiny body text** | Bold headings need readable body copy | Headings can be huge/bold, but body must be 16px+ with good line height. |
| **Skipping mobile responsiveness** | Neobrutalism still needs to work on small screens | Simplify layouts on mobile, reduce shadow sizes, maintain borders. |

## Feature Dependencies

```
Neobrutalist Design System (foundation)
├── Color tokens (yellow, teal, magenta, black, white)
├── Border utilities (2px, 4px solid)
├── Shadow utilities (4px/6px offset, zero blur)
└── Typography scale (700-900 weights for headings)
    │
    ├──> Component Styling (depends on design system)
    │    ├── Buttons (borders + shadows + hover effects)
    │    ├── Cards (borders + shadows + color blocks)
    │    ├── Inputs (thick borders, high contrast)
    │    └── Navigation (bold, clear, accessible)
    │
    └──> Layout Patterns (depends on design system)
         ├── Asymmetric grids (intentional breaks)
         ├── Color block sections (background colors)
         └── Overlapping elements (negative margins, z-index)

Narrative Homepage (content structure)
├── Solutions section (problem-focused intro)
├── Process section (cyclical diagram)
├── Tech section (capabilities showcase)
├── About section (personality + credentials)
└── Contact section (CTA + form)
    │
    └──> Depends on: Existing content, neobrutalist card components

Projects Page Narrative Format
├── Problem statement (business context)
├── Constraints (timeline, budget, tech)
├── Solution (what was built, why)
├── Results (metrics, outcomes)
└── Tradeoffs (what was deferred, why)
    │
    └──> Depends on: Existing portfolio data, card components
```

## MVP Definition

### Launch With (v1.1 — This Milestone)

For v1.1 milestone, prioritize in this order:

#### Phase 1: Design System Foundation (Week 1)
1. **Tailwind config** for neobrutalist tokens (colors, shadows, borders)
2. **Typography scale** with bold weights (Poppins 700-900 for headings)
3. **Base component styles** (buttons, cards, inputs)
4. **Dark mode adaptation** (inverted shadows, adjusted colors)

#### Phase 2: Core Visual Elements (Week 1-2)
5. **Button components** with pressed hover effect
6. **Card components** with borders + shadows + color blocks
7. **Section color blocks** for homepage structure
8. **Asymmetric layout patterns** for key sections

#### Phase 3: Narrative Homepage (Week 2)
9. **Solutions section** (problem-focused hero)
10. **Process section** (cyclical diagram or narrative flow)
11. **Tech section** (capabilities with visual interest)
12. **About + Contact** sections (personality + CTA)

#### Phase 4: Projects & Blog Styling (Week 2-3)
13. **Projects page** with narrative case study format
14. **Blog index** with neobrutalist card grid
15. **Tag pages** restyled to match
16. **FAQ relocation** to footer or separate page

### Defer to Post-v1.1

Features that are nice-to-have but not critical for this milestone:

- **Isometric shadows** - Nice-to-have, medium complexity
- **Cyclical process diagram** - High complexity, narrative text flow works for MVP
- **Retro UI elements** - Low priority, could feel gimmicky
- **Advanced micro-interactions** - Polish after core design is validated
- **Stacked card effects** - Visual flourish, not critical for MVP

## Complexity Assessment

| Feature Category | CSS Complexity | Content Complexity | Testing Complexity | Total |
|------------------|----------------|--------------------|--------------------|-------|
| Design system tokens | LOW | None | Medium (contrast checks) | LOW-MEDIUM |
| Border + shadow styles | LOW | None | Low | LOW |
| Button/card components | LOW | None | Medium (accessibility) | LOW-MEDIUM |
| Asymmetric layouts | MEDIUM | None | Medium (responsive) | MEDIUM |
| Narrative homepage | LOW (styling) | MEDIUM (restructure) | Medium (flow testing) | MEDIUM |
| Projects narrative format | LOW (styling) | MEDIUM (content templates) | Low | MEDIUM |
| Dark mode adaptation | MEDIUM | None | Medium (visual QA) | MEDIUM |
| Hover interactions | LOW | None | Low | LOW |

**Overall milestone complexity: MEDIUM**

Most features are straightforward Tailwind CSS implementations. The main complexity is:
1. Content restructuring for narrative flow
2. Ensuring accessibility with bold colors
3. Responsive behavior of asymmetric layouts

## Implementation Notes

### Tailwind Configuration

```js
// tailwind.config.js additions
theme: {
  extend: {
    boxShadow: {
      'brutal-sm': '2px 2px 0 0 #000',
      'brutal': '4px 4px 0 0 #000',
      'brutal-lg': '6px 6px 0 0 #000',
      'brutal-yellow': '4px 4px 0 0 #ffef6a',
      'brutal-teal': '4px 4px 0 0 oklch(0.7 0.15 200)',
    },
    borderWidth: {
      '3': '3px',
    },
  }
}
```

### Button Pattern

```html
<button class="
  bg-yellow-400
  border-4 border-black
  shadow-brutal
  px-6 py-3
  font-bold
  hover:shadow-none
  hover:translate-x-1
  hover:translate-y-1
  transition-all
">
  Get Started
</button>
```

### Card Pattern

```html
<div class="
  bg-white
  border-4 border-black
  shadow-brutal-lg
  p-8
  relative
">
  <h3 class="font-black text-3xl mb-4">Title</h3>
  <p class="text-lg">Content...</p>
</div>
```

### Dark Mode Adaptation

- Invert shadow colors: `dark:shadow-[4px_4px_0_0_#fff]`
- Adjust border colors: `dark:border-white`
- Maintain contrast: test all color combinations

## Accessibility Checklist

- [ ] All text meets WCAG AA contrast (4.5:1 for body, 3:1 for large text)
- [ ] Yellow text never on white background without border/shadow
- [ ] Buttons have clear focus states (not just hover)
- [ ] Navigation remains logical despite asymmetric layout
- [ ] Body text is 16px+ with 1.5+ line height
- [ ] Color is not the only indicator (borders + text labels)
- [ ] Dark mode maintains contrast ratios
- [ ] Hover effects don't rely solely on color change

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Thick borders | HIGH | LOW | P1 |
| Hard offset shadows | HIGH | LOW | P1 |
| Bold typography | HIGH | MEDIUM | P1 |
| High contrast colors | HIGH | LOW | P1 |
| Pressed button states | HIGH | LOW | P1 |
| Color block sections | HIGH | LOW | P1 |
| Card components | HIGH | LOW | P1 |
| Dark mode adaptation | HIGH | MEDIUM | P1 |
| Narrative homepage structure | HIGH | MEDIUM | P1 |
| Asymmetric layouts | MEDIUM | MEDIUM | P2 |
| Projects narrative format | MEDIUM | MEDIUM | P2 |
| Blog restyling | MEDIUM | LOW | P2 |
| Overlapping elements | MEDIUM | MEDIUM | P2 |
| Quirky micro-interactions | LOW | MEDIUM | P3 |
| Isometric shadows | LOW | MEDIUM | P3 |
| Retro UI elements | LOW | MEDIUM | P3 |
| Cyclical process diagram | LOW | HIGH | P3 |

**Priority key:**
- **P1: Must have for v1.1** — Core neobrutalist visual identity
- **P2: Should have, add when possible** — Enhances design but not blocker
- **P3: Nice to have, future consideration** — Polish/differentiation features

## Narrative Homepage Structure

Based on research, a compelling narrative homepage for a developer portfolio follows this pattern:

### Solutions Section (Hero)
**Purpose:** Lead with client problems, not developer capabilities
**Structure:**
- Headline: Client pain point ("Drowning in manual work?")
- Subhead: Solution promise ("I build automation that saves 15+ hours/week")
- Visual: Bold graphic or screenshot with neobrutalist treatment
- CTA: "See How It Works" (scroll to process)

### Process Section (Cyclical)
**Purpose:** Show collaborative, iterative approach (not waterfall)
**Structure:**
- 5 steps in circular or S-curve layout
- Emphasis on "prototype before commitment" (Joel's differentiator)
- Each step has icon + short description
- Visual treatment: Color blocks, borders, asymmetric positioning

### Tech Section (Capabilities)
**Purpose:** Establish technical credibility without jargon
**Structure:**
- 3 service categories (Web Apps, Automation, AI)
- Each as a card with icon, title, business benefit
- Avoid tech stack details, focus on outcomes
- Neobrutalist cards with shadows and bold colors

### About Section (Personality)
**Purpose:** Build trust, show person behind the work
**Structure:**
- Photo with neobrutalist border treatment
- Story: Why I help small businesses
- Credentials (brief, relevant)
- CTA: "Ready to talk? Let's chat."

### Contact Section (CTA)
**Purpose:** Remove friction for initial outreach
**Structure:**
- Form with 4 fields (name, email, project type, message)
- Multiple contact options (form, email, phone)
- FAQ below form (address objections)
- Neobrutalist form styling with thick borders

## Sources

### Neobrutalism Design Principles
- [Neobrutalism: Definition and Best Practices - NN/G](https://www.nngroup.com/articles/neobrutalism/)
- [Neubrutalism - UI Design Trend That Wins The Web - Bejamas](https://bejamas.com/blog/neubrutalism-web-design-trend)
- [Neo Brutalism UI Design Trend - Onething Design](https://www.onething.design/post/neo-brutalism-ui-design-trend)
- [Brutalism vs Neubrutalism in UI Design - CC Creative](https://www.cccreative.design/blogs/brutalism-vs-neubrutalism-in-ui-design)
- [Neo Brutalism: Your Guide to the Design Trend - HubSpot](https://blog.hubspot.com/website/neo-brutalism)
- [Neo Brutalism in Higher Ed Web UX - ColorWhistle](https://colorwhistle.com/neo-brutalism-higher-education-web-ux/)

### Implementation & Components
- [Neobrutalism Components - Tailwind CSS](https://www.neobrutalism.dev/)
- [ekmas/neobrutalism-components - GitHub](https://github.com/ekmas/neobrutalism-components)
- [Neobrutalism UI Kit - Tailkits](https://tailkits.com/components/neobrutalism/)

### Narrative Homepage Structure
- [Storytelling in Web Design - Ironistic](https://www.ironistic.com/insights/storytelling-in-web-design/)
- [Immersive Storytelling Websites Guide - Utsubo](https://www.utsubo.com/blog/immersive-storytelling-websites-guide)
- [Portfolio Website Examples - Figma](https://www.figma.com/resource-library/portfolio-website-examples/)
- [Crafting a Narrative - Dribbble](https://dribbble.com/stories/2024/03/18/crafting-a-narrative-mastering-storytelling-in-your-design-portfolio)
- [Portfolio & Agency Website Templates - Webflow](https://webflow.com/templates/category/portfolio-and-agency-websites)

### Developer Portfolio Best Practices
- [Impact-First Storytelling - Medium](https://medium.com/@sarahscussel/impact-first-storytelling-in-your-product-design-portfolio-9f122f747ee8)
- [Web Developer Portfolio Examples - Middlehost](https://middlehost.com/blog/web-developer-portfolio-examples/)
- [15 Best Web Developer Portfolio Examples - ZEGOCLOUD](https://www.zegocloud.com/blog/web-developer-portfolio)
- [27 Inspiring Web Developer Portfolio Examples - Elementor](https://elementor.com/blog/inspiring-web-developer-portfolio-examples/)

### CSS Implementation Details
- [CSS Box Shadow - CSS-Tricks](https://css-tricks.com/almanac/properties/b/box-shadow/)
- [Designing Beautiful Shadows - Josh W. Comeau](https://www.joshwcomeau.com/css/designing-shadows/)

### Accessibility & Best Practices
- [Neo brutalism: The falsely accused UI design trend - Medium](https://medium.com/@pallavimitra432/neo-brutalism-the-falsely-accused-ui-design-trend-d2f06377297b)
- [Principles of Neo Brutalism in Design - Nestify](https://nestify.io/blog/neo-brutalism-in-design/)

---
*Feature research for: Joel Shinness Portfolio v1.1 — Neobrutalist Design & Narrative Homepage*
*Researched: 2026-02-09*
*Confidence: HIGH (verified via NN/G, Tailwind libraries, multiple design sources)*

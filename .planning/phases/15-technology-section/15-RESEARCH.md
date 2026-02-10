# Phase 15: Technology Section - Research

**Researched:** 2026-02-10
**Domain:** Service offering sections, isometric illustration design, responsive card grids
**Confidence:** HIGH

## Summary

This research investigates how to design an effective technology/service offering section that distinguishes three service categories (AI, Automations, Web Apps) with clear descriptions and isometric illustrations. The established pattern from Phase 14 provides a proven foundation: simple geometric SVG illustrations using `currentColor` for CSS theming, opacity-based depth, and the `iso-shadow-sm` utility for visual enhancement.

The standard approach in 2026 prioritizes clarity over complexity: 1-2 sentence descriptions that address user intent directly, responsive grid layouts using Tailwind's mobile-first utilities (`grid-cols-1 md:grid-cols-3`), and consistent spacing tokens to maintain visual hierarchy. The neobrutalist design system already established in this codebase (thick borders, bold colors, offset shadows) aligns perfectly with current best practices.

**Primary recommendation:** Reuse the established illustration pattern from Phase 14 (3-5 geometric shapes, `currentColor`, `<1KB file size`) and apply it to three new technology category illustrations. Implement with Astro 5's native SVG component imports and Tailwind's responsive grid system for minimal code and maximum consistency.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.7+ | SVG component imports | Native .svg import support with prop forwarding (no plugins required) |
| Tailwind CSS | 4.x | Responsive grid layout | Mobile-first utility classes (`grid-cols-1 md:grid-cols-3`) eliminate custom media queries |
| currentColor | CSS3 | SVG theming | Single SVG adapts to any color context via CSS inheritance |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| SVGO/SVGOMG | Latest | SVG optimization | Reduce file size 40-80% by removing metadata, simplifying paths |
| iso-shadow-sm | Custom utility | Visual depth | Already proven effective in Phase 14 for 64px illustrations |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| SVG components | Icon library (Iconify, etc.) | Library adds bundle weight; custom SVGs are <1KB each |
| Tailwind grid | CSS Grid manually | Tailwind reduces code and ensures responsive consistency |
| currentColor | Hard-coded colors | Multiple SVG variants needed per theme (doubles files) |

**Installation:**
```bash
# All dependencies already installed in project
# Astro 5.7+ includes native SVG import support
# Tailwind CSS 4.x via @tailwindcss/vite plugin
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── illustrations/       # Established in Phase 14
│   │   ├── TechAI.svg      # NEW: AI category illustration
│   │   ├── TechAutomations.svg # NEW: Automations illustration
│   │   └── TechWebApps.svg # NEW: Web Apps illustration
│   └── homepage/
│       └── TechSection.astro # MODIFY: Update with new structure
```

### Pattern 1: SVG Component with currentColor Theming
**What:** Import SVG as Astro component and apply color via CSS text color classes
**When to use:** All decorative illustrations that should adapt to theme
**Example:**
```astro
---
// Source: Astro 5.7+ official docs
// https://docs.astro.build/en/reference/experimental-flags/svg/
import TechAI from '../illustrations/TechAI.svg';
---

<div class="text-yellow iso-shadow-sm rounded">
  <TechAI class="w-12 h-12 md:w-16 md:h-16" />
</div>
```

**Key benefits:**
- SVG automatically inlines into HTML (no HTTP request)
- `fill="currentColor"` in SVG inherits from parent `.text-yellow`
- Width/height props passed to component override SVG defaults
- Single SVG file works for light and dark themes

### Pattern 2: Responsive Grid with Mobile-First Utilities
**What:** Tailwind CSS grid that stacks on mobile (1 column) and spreads on desktop (3 columns)
**When to use:** Card layouts, service grids, feature lists
**Example:**
```astro
<!-- Source: Tailwind CSS official docs
     https://tailwindcss.com/docs/grid-template-columns -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
  <article>Category 1</article>
  <article>Category 2</article>
  <article>Category 3</article>
</div>
```

**Responsive behavior:**
- Mobile (<768px): Single column, vertical stack
- Desktop (≥768px): Three equal columns
- Gap adjusts: 24px mobile, 32px desktop for breathing room

### Pattern 3: Service Description Structure
**What:** 1-2 sentence descriptions focusing on user benefit, not technical jargon
**When to use:** Service categories, feature explanations, value propositions
**Example:**
```astro
<!-- Source: NN/G neobrutalism best practices
     https://www.nngroup.com/articles/neobrutalism/ -->
<h3 class="font-heading text-2xl font-semibold mb-3">AI Solutions</h3>
<p class="text-text-muted-light dark:text-text-muted-dark leading-relaxed max-w-xl">
  Custom AI tools that automate your workflows and surface insights from your data,
  without requiring a data science team.
</p>
```

**Key elements:**
- **H3 heading:** Service category name (2xl size, semibold weight)
- **Description paragraph:** 1-2 sentences, max-w-xl constraint (prevents overly long lines)
- **User focus:** "Your workflows" not "AI capabilities"
- **Clarity:** Active voice, plain language, no jargon

### Pattern 4: Illustration Positioning in Cards
**What:** Illustration placed above heading with consistent sizing and spacing
**When to use:** Service cards, process steps, feature highlights
**Example:**
```astro
<article class="p-6">
  <!-- Illustration wrapper with color and shadow -->
  <div class="text-yellow iso-shadow-sm rounded mb-4 inline-block">
    <TechAI class="w-12 h-12 md:w-16 md:h-16" />
  </div>

  <!-- Heading and description -->
  <h3 class="font-heading text-2xl font-semibold mb-3">AI Solutions</h3>
  <p class="leading-relaxed max-w-xl">Description here</p>
</article>
```

**Layout principles:**
- Illustration at top creates visual hierarchy (eye flows down to text)
- `inline-block` on wrapper prevents full-width stretch
- `mb-4` (16px) provides breathing room before heading
- Responsive sizing maintains recognizability (48px mobile, 64px desktop)

### Anti-Patterns to Avoid
- **Too much text:** Dense paragraphs reduce scannability; stick to 1-2 sentences per category
- **Competing visual hierarchy:** Every element demanding attention confuses users; use size/weight variation to guide
- **Inconsistent spacing:** Ad-hoc margins break visual flow; use spacing tokens (4/6/8/12/16/24/32px)
- **Hard-coded SVG colors:** Theme changes require manual updates; use `currentColor` for automatic adaptation
- **Complex illustrations at small sizes:** 10+ shapes become unrecognizable at 64px; limit to 3-5 shapes

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SVG color theming | Multiple SVG files per theme | `currentColor` CSS variable | Single file adapts automatically; saves 50%+ file count |
| Responsive grid breakpoints | Custom `@media` queries | Tailwind responsive utilities | Mobile-first pattern tested across devices; reduces CSS |
| SVG optimization | Manual path simplification | SVGO/SVGOMG tools | Automated reduction of 40-80% file size without quality loss |
| Icon library | Custom SVG management | Astro 5.7+ native imports | Zero-config import, prop forwarding, inlining handled automatically |
| Dark mode shadows | Separate light/dark classes | `.dark` selector in utilities | Theme-aware transforms (offset shadow → glow) with single class |

**Key insight:** The combination of Astro's SVG imports, Tailwind's responsive utilities, and CSS custom properties eliminates the need for build tools, icon libraries, or theme-specific file variants. The codebase already has proven patterns from Phase 14—reusing them ensures consistency and reduces complexity.

## Common Pitfalls

### Pitfall 1: Text Overload in Service Descriptions
**What goes wrong:** Designers cram 4-5 sentences into service cards, creating dense blocks of text that users skip
**Why it happens:** Fear that brevity sacrifices detail; desire to explain every feature
**How to avoid:**
- Limit to 1-2 sentences per category (30-40 words max)
- Focus on user benefit first, technical detail second
- Use active voice ("Automate your workflows") not passive ("Workflows can be automated")
**Warning signs:**
- Descriptions require scrolling on mobile
- Users skip directly to contact without reading services

**Source:** [Why Most Websites Fail at Visual and Structural Communication](https://thevisualcommunicationguy.com/2026/02/02/why-most-websites-fail-at-visual-and-structural-communication/)

### Pitfall 2: Illustration Complexity at Small Sizes
**What goes wrong:** Detailed illustrations (10+ shapes, gradients, fine lines) become muddy at 64x64px and unrecognizable at 48x48px
**Why it happens:** Designers create at large canvas size (500x500px) and don't test at deployment size
**How to avoid:**
- Design at final size (64x64px canvas in design tool)
- Limit to 3-5 simple geometric shapes
- Test on actual mobile device (375px viewport)
- Use opacity for depth, not color variation
**Warning signs:**
- Shapes merge together at small size
- Illustration requires "squinting" to identify
- File size >2KB for simple icon

**Source:** Phase 14 research + [18 Popular Icon Design Styles for 2026](https://theinklusive.com/blog/popular-icon-design-styles/)

### Pitfall 3: Weak Visual Hierarchy in Grid Layouts
**What goes wrong:** All cards same size/color/weight means users don't know where to look first
**Why it happens:** Desire for symmetry overrides hierarchy needs
**How to avoid:**
- Vary illustration colors across categories (yellow, turquoise, magenta)
- Use consistent but distinct sizing (all 64px but different colors)
- Apply color-matched shadows (`text-yellow` + `iso-shadow-sm` inherits yellow)
- Consider primary service as larger/first card if applicable
**Warning signs:**
- Eye doesn't naturally flow through content
- Users ask "which service should I choose?"
- Analytics show equal attention across all services (no differentiation)

**Source:** [Visual Hierarchy in UX: Expert-Backed Tips and Examples](https://www.eleken.co/blog-posts/visual-hierarchy-in-ux)

### Pitfall 4: Hard-Coded SVG Colors Breaking Theme Switching
**What goes wrong:** SVGs with `fill="#FFE600"` don't change in dark mode; illustrations disappear or clash
**Why it happens:** Exporting from design tools includes hard-coded colors by default
**How to avoid:**
- Strip `fill` attributes from SVG source
- Add `fill="currentColor"` to paths/shapes
- Test theme toggle before committing
- Verify in browser DevTools that `currentColor` computes correctly
**Warning signs:**
- Illustrations invisible in dark mode
- Colors clash with theme (yellow on yellow background)
- Multiple SVG variants needed (Light_Icon.svg, Dark_Icon.svg)

**Source:** [Color for SVG icons and elements with currentColor](https://mayashavin.com/articles/svg-icons-currentcolor)

### Pitfall 5: Inconsistent Spacing Tokens
**What goes wrong:** Ad-hoc spacing (15px here, 18px there) creates visual tension and breaks grid alignment
**Why it happens:** Developers eyeball spacing instead of using design system tokens
**How to avoid:**
- Stick to spacing scale: 8/12/16/24/32/64px (already defined in `global.css`)
- Use Tailwind spacing utilities (`gap-6`, `mb-4`, `p-6`) not arbitrary values
- Reference existing components (Process.astro uses `pl-24 md:pl-32` pattern)
- Verify spacing matches neobrutalist aesthetic (24-32px margins for breathing room)
**Warning signs:**
- Elements feel "off" but unclear why
- Grid columns don't align vertically
- Mobile layout feels cramped despite responsive classes

**Source:** [Neobrutalism: Definition and Best Practices - NN/G](https://www.nngroup.com/articles/neobrutalism/)

## Code Examples

Verified patterns from official sources:

### Complete Service Category Card
```astro
---
// Source: Established Phase 14 pattern + Tailwind docs
import TechAI from '../illustrations/TechAI.svg';
---

<article class="relative">
  <!-- Illustration wrapper -->
  <div class="text-yellow iso-shadow-sm rounded mb-4 inline-block">
    <TechAI class="w-12 h-12 md:w-16 md:h-16" aria-hidden="true" />
  </div>

  <!-- Category heading -->
  <h3 class="font-heading text-2xl font-semibold text-text-light dark:text-text-dark mb-3">
    AI Solutions
  </h3>

  <!-- Category description (1-2 sentences, user-focused) -->
  <p class="text-text-muted-light dark:text-text-muted-dark leading-relaxed max-w-xl">
    Custom AI tools that automate your workflows and surface insights from your data,
    without requiring a data science team.
  </p>
</article>
```

### Responsive Three-Column Grid
```astro
<!-- Source: https://tailwindcss.com/docs/grid-template-columns -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
  <!-- Three service category cards -->
  <article>AI Solutions...</article>
  <article>Automations...</article>
  <article>Web Apps...</article>
</div>
```

### SVG Illustration Template (AI Category Example)
```svg
<!-- Source: Phase 14 established pattern
     File: TechAI.svg
     Concept: Brain/neural network with connecting nodes -->
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- Central node (brain/processor) -->
  <circle cx="50" cy="50" r="18" fill="currentColor" opacity="0.85"/>

  <!-- Top connecting node -->
  <circle cx="50" cy="20" r="8" fill="currentColor" opacity="0.7"/>
  <line x1="50" y1="28" x2="50" y2="32" stroke="currentColor" stroke-width="3" opacity="0.7"/>

  <!-- Right connecting node -->
  <circle cx="75" cy="50" r="8" fill="currentColor" opacity="0.7"/>
  <line x1="67" y1="50" x2="68" y2="50" stroke="currentColor" stroke-width="3" opacity="0.7"/>

  <!-- Bottom connecting node -->
  <circle cx="50" cy="80" r="8" fill="currentColor" opacity="0.7"/>
  <line x1="50" y1="68" x2="50" y2="72" stroke="currentColor" stroke-width="3" opacity="0.7"/>
</svg>
```

**Key SVG characteristics:**
- `viewBox="0 0 100 100"` enables responsive scaling
- `fill="currentColor"` inherits CSS text color
- `aria-hidden="true"` marks as decorative (description in adjacent text)
- Opacity layers (0.7, 0.85) create isometric depth
- 3-5 simple shapes keep file <1KB

### Full Section Integration
```astro
---
// Source: Current TechSection.astro + Phase 14 patterns
import TechAI from '../illustrations/TechAI.svg';
import TechAutomations from '../illustrations/TechAutomations.svg';
import TechWebApps from '../illustrations/TechWebApps.svg';
---

<section
  id="tech"
  aria-labelledby="tech-heading"
  class="py-24 md:py-32 bg-bg-light dark:bg-bg-dark"
>
  <div class="container mx-auto px-6 md:px-12">
    <h2
      id="tech-heading"
      class="font-heading font-bold text-3xl md:text-4xl uppercase mb-12 text-text-light dark:text-text-dark"
    >
      What I Build
    </h2>

    <!-- Three-column responsive grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
      <!-- AI Category -->
      <article class="relative">
        <div class="text-yellow iso-shadow-sm rounded mb-4 inline-block">
          <TechAI class="w-12 h-12 md:w-16 md:h-16" />
        </div>
        <h3 class="font-heading text-2xl font-semibold text-text-light dark:text-text-dark mb-3">
          AI Solutions
        </h3>
        <p class="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
          Custom AI tools that automate your workflows and surface insights from your data.
        </p>
      </article>

      <!-- Automations Category -->
      <article class="relative">
        <div class="text-turquoise iso-shadow-sm rounded mb-4 inline-block">
          <TechAutomations class="w-12 h-12 md:w-16 md:h-16" />
        </div>
        <h3 class="font-heading text-2xl font-semibold text-text-light dark:text-text-dark mb-3">
          Automations
        </h3>
        <p class="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
          Connect your tools and eliminate repetitive tasks so your team can focus on high-value work.
        </p>
      </article>

      <!-- Web Apps Category -->
      <article class="relative">
        <div class="text-magenta iso-shadow-sm rounded mb-4 inline-block">
          <TechWebApps class="w-12 h-12 md:w-16 md:h-16" />
        </div>
        <h3 class="font-heading text-2xl font-semibold text-text-light dark:text-text-dark mb-3">
          Web Apps
        </h3>
        <p class="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
          Modern, fast web applications built with proven technologies that scale with your business.
        </p>
      </article>
    </div>
  </div>
</section>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Icon libraries (FontAwesome, Feather) | Custom SVG components | Astro 5.7 (2025) | Zero bundle overhead; SVGs inline automatically |
| Multiple SVG files per theme | `currentColor` theming | CSS3 widespread (2015+) | 50% fewer files; automatic theme adaptation |
| Custom media queries | Tailwind responsive utilities | Tailwind 2.0+ (2020) | Faster development; mobile-first by default |
| Text-heavy service descriptions | 1-2 sentence clarity | 2026 AI/scanning era | Higher engagement; better mobile UX |
| Complex gradient illustrations | Simple geometric shapes | 2024+ neobrutalism trend | Better small-size recognition; faster performance |

**Deprecated/outdated:**
- **Icon font libraries:** Modern bundlers inline SVGs more efficiently than font files; accessibility improved with semantic SVG
- **Separate light/dark SVG variants:** `currentColor` + CSS variables eliminate need for duplicate files
- **Plugin-based SVG imports (astro-icon, etc.):** Astro 5.7+ includes native import; plugins add unnecessary complexity
- **Desktop-first responsive design:** Mobile traffic dominates (60%+ in 2026); mobile-first is standard
- **Feature-list descriptions:** Users scan for benefits, not feature checklists; concise value props win

## Open Questions

Things that couldn't be fully resolved:

1. **Optimal service category count**
   - What we know: Research shows 3-5 categories maintain scannability
   - What's unclear: Whether "AI, Automations, Web Apps" sufficiently covers all services or if subcategories needed
   - Recommendation: Start with 3 main categories as specified in requirements; expand only if user feedback indicates confusion

2. **Illustration metaphor effectiveness**
   - What we know: Geometric shapes at 64px must be immediately recognizable; complex metaphors fail
   - What's unclear: Which specific geometric concepts best represent each category (e.g., "brain" for AI vs. "network" vs. "lightbulb")
   - Recommendation: Test 2-3 concepts per category in implementation; choose most recognizable at 48px mobile size

3. **Card vs. plain layout for categories**
   - What we know: Current TechSection.astro uses Card component with offset shadows
   - What's unclear: Whether Card component adds necessary visual weight or if simpler layout (like Process.astro) suffices
   - Recommendation: Remove Card wrapper for consistency with Process section; apply `iso-shadow-sm` to illustrations only (not full card)

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS Grid Template Columns - Official Docs](https://tailwindcss.com/docs/grid-template-columns) - Responsive grid patterns
- [Astro Experimental SVG Components - Official Docs](https://docs.astro.build/en/reference/experimental-flags/svg/) - SVG import API
- [Neobrutalism: Definition and Best Practices - NN/G](https://www.nngroup.com/articles/neobrutalism/) - Design system best practices
- [Color for SVG icons and elements with currentColor - Maya Shavin](https://mayashavin.com/articles/svg-icons-currentcolor) - SVG theming pattern

### Secondary (MEDIUM confidence)
- [Mastering Responsive Layouts with Tailwind Grid](https://codeparrot.ai/blogs/mastering-responsive-layouts-with-tailwind-grid-in-react) - Implementation patterns
- [Icon Design Trends 2026 - Envato Elements](https://elements.envato.com/learn/icon-design-trends) - Isometric design trends
- [18 Popular Icon Design Styles for 2026 - INKLUSIVE](https://theinklusive.com/blog/popular-icon-design-styles/) - Icon simplicity best practices
- [How to import SVG files as components in Astro](https://astrothem.es/blog/astro-svg-components/) - Community implementation guide

### Tertiary (LOW confidence)
- [Top Web Development Trends 2026: AI, Automation & Beyond](https://www.appstechy.com/top-web-development-trends-for-2026-ai-automation-and-beyond/) - Service category trends (WebSearch only)
- [The 8 best AI automation tools in 2026 - Zapier](https://zapier.com/blog/ai-automation-tools/) - Market category examples (WebSearch only)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Astro 5.7+ and Tailwind CSS official documentation verified
- Architecture: HIGH - Patterns established in Phase 14 and validated with official docs
- Pitfalls: MEDIUM - Neobrutalism best practices from NN/G (authoritative) but service-specific pitfalls extrapolated from general UX research

**Research date:** 2026-02-10
**Valid until:** 2026-03-10 (30 days - stable technologies, unlikely to change)

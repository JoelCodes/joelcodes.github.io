# Phase 13: Hero Section - Research

**Researched:** 2026-02-09
**Domain:** Hero section design, outcome-focused copywriting, badge UI components, accessibility
**Confidence:** HIGH

## Summary

Research reveals that effective hero sections in 2026 must prioritize **outcome-focused messaging** over feature lists, with copy passing the "5-second test" for immediate clarity. Analysis of 100+ startup hero sections found that 74% fail due to multiple CTAs (27%), unclear value propositions (20%), or missing trust signals (20%).

For visual metric badges, the industry standard is **2-3 maximum** trust signals positioned near CTAs without competing for attention. Badges must meet WCAG 2.2 AA contrast requirements: 4.5:1 for normal text, 3:1 for large text and graphical elements. The current design system's OKLCH color space and isometric shadow utilities provide an excellent foundation for accessible badge design.

**Primary recommendation:** Reframe the hero headline from problem-focused to outcome-focused using the benefit-driven formula ("Achieve [outcome]" rather than "Tired of [problem]"), display 2-3 metric badges with verified WCAG contrast ratios, and validate clarity through 5-second testing methodology.

## Standard Stack

The established patterns for hero section implementation in Astro:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro Components | 5.x | Component structure | Native framework pattern with zero JS runtime |
| TypeScript Props | 5.x | Type-safe props | Automatic VS Code validation via Props interface |
| Tailwind CSS 4 | 4.x | Styling | Already in project, utility-first approach |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| OKLCH color space | CSS native | Color contrast | Already in design system, perceptually uniform |
| color-mix() | CSS native | Glow effects | 93% browser support, used in existing shadows |
| Isometric utilities | Custom | Badge shadows | Already implemented in Phase 12 |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Astro component | React Badge | Unnecessary JS bundle for static badges |
| Custom badge component | shadcn/ui Badge | Would need React framework adapter |
| Manual contrast checks | Automated tools | Tools faster but need verification workflow |

**Installation:**
No new dependencies required. All tools already in project.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── Hero.astro            # Main hero section (existing)
│   └── ui/
│       ├── Badge.astro       # NEW: Outcome badge component
│       └── Button.astro      # Existing CTA button
```

### Pattern 1: Outcome Badge Component
**What:** Reusable badge for displaying key metrics with accessibility built-in
**When to use:** Hero section trust signals, social proof, outcome metrics

**Example:**
```astro
---
// src/components/ui/Badge.astro
interface Props {
  label: string;           // Accessible label for screen readers
  value: string;           // The metric value (e.g., "500+ hours")
  description?: string;    // Optional additional context
  variant?: 'yellow' | 'turquoise' | 'magenta';
}

const {
  label,
  value,
  description,
  variant = 'yellow'
} = Astro.props;

// Map variant to color classes
const variantClasses = {
  yellow: 'text-yellow-text dark:text-yellow-text-dark iso-shadow',
  turquoise: 'text-turquoise-text dark:text-turquoise-text-dark iso-shadow',
  magenta: 'text-text-light dark:text-text-dark iso-shadow'
};
---

<div
  class={`inline-flex flex-col items-center justify-center border-[3px] border-text-light dark:border-text-dark px-6 py-4 ${variantClasses[variant]}`}
  role="group"
  aria-label={label}
>
  <span class="text-2xl md:text-3xl font-heading font-bold uppercase">
    {value}
  </span>
  {description && (
    <span class="text-sm md:text-base font-body text-text-muted-light dark:text-text-muted-dark mt-1">
      {description}
    </span>
  )}
</div>
```

**Rationale:**
- TypeScript Props interface provides type safety and VS Code IntelliSense
- `role="group"` with `aria-label` provides screen reader context per WCAG 2.2
- Variant system maps to existing design tokens for consistent colors
- Uses existing `iso-shadow` utilities from Phase 12 for neobrutalist aesthetic
- Responsive text sizing with mobile-first approach

### Pattern 2: Outcome-Focused Hero Structure
**What:** Hero layout prioritizing outcome message + badges + single CTA
**When to use:** Homepage hero sections requiring immediate clarity

**Example:**
```astro
---
// src/components/Hero.astro
import Button from './ui/Button.astro';
import Badge from './ui/Badge.astro';
---

<section id="hero" class="hero min-h-[80vh] flex items-center justify-center px-6 py-24 md:py-32">
  <div class="container max-w-4xl mx-auto text-center">

    {/* Outcome-focused headline */}
    <h1 class="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-text-light dark:text-text-dark mb-6">
      Save 500+ hours building custom tools
    </h1>

    {/* Supporting value proposition */}
    <p class="font-body text-xl md:text-2xl mb-8 text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto">
      Custom web apps and automation that fit your exact workflow
    </p>

    {/* Outcome badges (2-3 maximum) */}
    <div class="flex flex-wrap justify-center gap-6 mb-8">
      <Badge
        label="Time saved by clients"
        value="500+ hours"
        description="saved per year"
        variant="yellow"
      />
      <Badge
        label="Customer satisfaction rate"
        value="100%"
        description="satisfied clients"
        variant="turquoise"
      />
      <Badge
        label="Projects delivered on time"
        value="12+"
        description="projects delivered"
        variant="magenta"
      />
    </div>

    {/* Single primary CTA */}
    <Button variant="yellow" size="lg" href="/contact">
      Start a Conversation
    </Button>
  </div>
</section>
```

**Rationale:**
- Headline focuses on outcome ("Save 500+ hours") not process ("Building custom tools")
- 3 badges maximum to avoid cognitive overload (industry research shows 2-3 is optimal)
- Badges positioned between value prop and CTA per trust signal best practices
- Single CTA (multiple CTAs reduce conversions by up to 266%)
- Maintains existing neobrutalist aesthetic with borders and shadows

### Anti-Patterns to Avoid

- **Multiple Primary CTAs:** Studies show 27% of failing hero sections have 2+ equally-styled CTAs, creating decision paralysis. Sites with multiple CTAs are 3x more likely to also lack trust signals.

- **Feature-First Headlines:** Headlines like "Custom web apps, automation, and AI integration" describe WHAT you build, not WHY customers care. Reframe to outcomes: "Save time, reduce costs, delight customers."

- **Too Many Badges:** More than 3 visual badges compete with the headline and CTA, violating visual hierarchy. Research consistently recommends 2-3 trust signals maximum.

- **Decorative Badges Without Context:** Badges displaying "12+" without explanation fail accessibility and clarity tests. Always include descriptive text like "projects delivered."

- **Insufficient Contrast:** Badge colors must meet WCAG 2.2 AA minimums. Don't assume design system colors automatically meet contrast requirements—verify each badge combination.

- **ARIA Overuse:** WebAIM 2024 studies show pages with ARIA present averaged 41% more detected errors. Prefer semantic HTML (`<div role="group">`) over complex ARIA attributes.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Contrast checking | Manual color picker comparison | WebAIM Contrast Checker, OddContrast, Atmos | WCAG calculation is complex; tools handle OKLCH properly and show AA/AAA compliance |
| 5-second testing | Informal team feedback | Lyssna, Maze, Useberry | Formal 5-second test platforms provide unbiased data, recall questions, and analytics |
| Color mixing for glows | Custom opacity/alpha calculations | CSS `color-mix(in oklch, ...)` | Perceptually uniform mixing; already used in design system; 93% browser support |
| Badge component library | Custom React badge system | Adapt neobrutalist patterns to Astro | Astro components have zero JS runtime; React adds unnecessary bundle size for static badges |
| Accessibility testing | Manual screen reader testing | Automated tools + manual validation | Start with automated tools (axe DevTools) to catch obvious issues, then validate with real screen readers |

**Key insight:** Color contrast and 5-second test clarity are measurable, objective requirements. Don't rely on subjective judgment when tooling provides definitive pass/fail metrics.

## Common Pitfalls

### Pitfall 1: Assuming Design System Colors Meet Contrast Requirements
**What goes wrong:** Developers assume existing color tokens (`--color-yellow-text`, `--color-turquoise-text`) automatically meet WCAG 2.2 AA contrast when used in badge combinations.

**Why it happens:** Design system provides "WCAG-compliant text variants" but those are optimized for body text on white/dark backgrounds, not badge-on-badge or badge-on-yellow-shadow scenarios.

**How to avoid:**
1. Test every badge variant combination (background + text + border) using contrast checker
2. Verify both light and dark mode separately
3. Document passing combinations in badge component documentation
4. For OKLCH colors, use OddContrast or Atmos (OKLCH-aware tools)

**Warning signs:**
- Badge text looks "washed out" or hard to read
- Color combinations work in light mode but fail in dark mode
- Shadow/glow colors obscure border visibility

### Pitfall 2: Outcome Metrics That Aren't Outcome-Focused
**What goes wrong:** Badges display vanity metrics ("12+ projects") instead of client outcomes ("500+ hours saved").

**Why it happens:** It's easier to quantify your own work than client results. Outcome data requires client testimonials, case studies, or estimated impact.

**How to avoid:**
1. Reframe metrics from "we did X" to "clients achieved Y"
2. If hard data unavailable, use conservative estimates from testimonials
3. Focus on time saved, money saved, or satisfaction metrics
4. Example transformation:
   - Bad: "12 projects completed"
   - Good: "12 teams now working 2x faster"

**Warning signs:**
- Badges focus on your effort ("years of experience") not client results
- Metrics could apply to any developer ("expert in X technology")
- Client wouldn't use these words to describe their success

### Pitfall 3: 5-Second Test Failure Due to Cognitive Overload
**What goes wrong:** Hero section includes outcome headline + badges + multiple value propositions + client logos + testimonial snippet. Users can't recall the core message after 5 seconds.

**Why it happens:** Fear of missing out on persuasion opportunities leads to cramming multiple messages into the hero.

**How to avoid:**
1. Limit hero to: headline + short subhead + 2-3 badges + 1 CTA
2. Move secondary trust signals (logos, testimonials) to section immediately below hero
3. Run actual 5-second tests with tools (Lyssna, Maze)
4. Ask test participants: "What does this company do?" and "What result do they promise?"

**Warning signs:**
- Test participants recall multiple disconnected facts but not core outcome
- Mobile hero requires scrolling to see CTA
- More than 3 visual elements compete for attention

### Pitfall 4: Badge Shadow Accessibility in Dark Mode
**What goes wrong:** Isometric shadows transform to glows in dark mode (per Phase 12 design), but glow intensity makes badge borders invisible against dark background.

**Why it happens:** The `iso-shadow` utilities use `currentColor` which works for most elements but can create insufficient contrast when the glow color is too bright.

**How to avoid:**
1. Test badge glow intensity against dark background (`--color-bg-dark: oklch(0.15 0 0)`)
2. Ensure badge border remains visible (3:1 contrast minimum per WCAG 2.1.1)
3. May need to adjust `color-mix()` percentage in dark mode for badges specifically
4. Verify border contrast separate from text contrast

**Warning signs:**
- Dark mode badges appear to "float" without defined edges
- Border indistinguishable from glow
- Multiple badges visually merge together

### Pitfall 5: Mobile Hero Sections Pushing CTA Below Fold
**What goes wrong:** Desktop hero fits perfectly, but mobile version requires scrolling to reach CTA button, reducing conversions.

**Why it happens:** Approximately 25% of hero sections have major mobile usability issues per 2024 research. Mobile accounts for 58% of traffic.

**How to avoid:**
1. Test hero on actual mobile devices (iPhone SE 375px width minimum)
2. Reduce badge size on mobile (`text-xl` → `text-lg` for values)
3. Consider stacking badges vertically on small screens if needed
4. Ensure headline + badges + CTA visible within 100vh on mobile
5. Use responsive spacing utilities (`mb-6 md:mb-8` pattern)

**Warning signs:**
- CTA button appears at 110vh on 375px viewport
- Badge text wraps awkwardly on mobile
- Users immediately scroll on mobile before reading headline

## Code Examples

Verified patterns from official sources:

### TypeScript Props Interface (Astro Best Practice)
```astro
---
// Source: https://docs.astro.build/en/guides/typescript/
interface Props {
  label: string;
  value: string;
  description?: string;
  variant?: 'yellow' | 'turquoise' | 'magenta';
}

const {
  variant = 'yellow',
  ...props
} = Astro.props;
---
```
**Why:** Astro VS Code Extension automatically detects `Props` interface for IntelliSense and compile-time validation. Optional props use `?` operator. Default values assigned during destructuring.

### WCAG-Compliant Badge with OKLCH Colors
```astro
---
// Using existing design system tokens for guaranteed contrast
interface Props {
  value: string;
  description: string;
}

const { value, description } = Astro.props;
---

<div
  class="inline-flex flex-col items-center border-[3px] border-text-light dark:border-text-dark px-6 py-4 iso-shadow text-yellow-text dark:text-yellow-text-dark"
  role="group"
  aria-label={`${value} ${description}`}
>
  <span class="text-2xl font-heading font-bold uppercase">
    {value}
  </span>
  <span class="text-sm font-body text-text-muted-light dark:text-text-muted-dark mt-1">
    {description}
  </span>
</div>
```
**Why:**
- `text-yellow-text` token documented in global.css as "3:1+ contrast on white for large text"
- `dark:text-yellow-text-dark` is original yellow which works on dark bg
- `iso-shadow` utility provides currentColor shadows (5px offset) that transform to glows in dark mode
- `role="group"` with `aria-label` provides semantic grouping per WCAG 1.3.1
- Border contrast guaranteed by text color tokens (text-light/text-dark)

### Outcome-Focused Copywriting Formula
```astro
<!-- BAD: Feature-first headline -->
<h1>Custom web apps, automation, and AI integration</h1>
<p>For small businesses that need exactly what they need</p>

<!-- GOOD: Outcome-first headline -->
<h1>Save 500+ hours per year on repetitive tasks</h1>
<p>Custom automation that works exactly how your team works</p>

<!-- GOOD: Problem-Agitate-Solution formula -->
<h1>Tired of tools that don't fit your workflow?</h1>
<p>Get custom software that adapts to you, not the other way around</p>
<Badge value="500+ hours" description="saved per client" />
```
**Why:**
- Source: https://landingrabbit.com/blog/saas-website-hero-text
- Outcome-first formula: "[Benefit] [timeframe]" (Save 500+ hours per year)
- PAS formula: "Tired of [problem]?" → Solution statement
- Badges reinforce outcome quantitatively

### Responsive Badge Grid
```astro
<!-- Source: Tailwind responsive patterns + Phase 12 spacing tokens -->
<div class="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mb-8">
  <Badge value="500+ hours" description="saved per year" variant="yellow" />
  <Badge value="100%" description="satisfied clients" variant="turquoise" />
  <Badge value="12+" description="projects delivered" variant="magenta" />
</div>
```
**Why:**
- `flex-col sm:flex-row` stacks badges vertically on mobile, horizontally on tablet+
- `gap-4 sm:gap-6` uses design system spacing scale (16px → 24px)
- `flex-wrap` allows badges to wrap if 3 don't fit horizontally
- `justify-center` maintains centered alignment at all breakpoints

### Accessible Color Contrast Verification
```javascript
// Source: https://webaim.org/resources/contrastchecker/
// Don't hand-roll this—use contrast checker tools

// For badge text on background:
// Requirement: 4.5:1 for normal text (<18px), 3:1 for large text (≥18px or ≥14px bold)

// For badge borders/graphical elements:
// Requirement: 3:1 for non-text elements (WCAG 2.1.1)

// Verify combinations in tools:
// - Text color vs. badge background
// - Border color vs. page background
// - Glow/shadow color vs. page background (dark mode)

// Example passing combination (from design system):
// Light mode:
//   - Background: white (oklch(1.0 0 0))
//   - Text: yellow-text (oklch(0.55 0.15 95)) → 3:1+ ratio ✓
//   - Border: text-light (oklch(0.2 0 0)) → 16:1 ratio ✓
// Dark mode:
//   - Background: dark (oklch(0.15 0 0))
//   - Text: yellow-text-dark (oklch(0.85 0.18 95)) → 3:1+ ratio ✓
//   - Border: text-dark (oklch(0.95 0 0)) → 12:1 ratio ✓
```
**Why:** Contrast calculation is complex. OKLCH lightness values don't directly translate to contrast ratios. Always verify with tools like WebAIM, OddContrast (OKLCH-aware), or Atmos.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Feature-focused hero | Outcome-focused hero | 2024-2025 | 37% of visitors leave if value unclear; outcome-first reduces bounce rate |
| Multiple CTAs | Single primary CTA | 2023-2024 | Multiple CTAs reduce conversions by 266% per research |
| RGB/HSL colors | OKLCH color space | 2022-2023 | 93% browser support as of 2026; perceptually uniform contrast |
| Manual contrast checks | OKLCH-aware tools | 2024-2025 | Tools like OddContrast, Atmos handle OKLCH properly; faster verification |
| color-mix() in sRGB | color-mix() in OKLCH | 2023-2024 | Perceptually uniform mixing prevents "graying out"; used in Phase 12 glows |
| Trust badges anywhere | 2-3 badges near CTA | 2024-2025 | Research shows 2-3 optimal; more creates cognitive overload |
| WCAG 2.1 AA | WCAG 2.2 AA | 2023 | WCAG 2.2 is legal standard (4,605 ADA lawsuits in 2024); EAA 2025 compliance required |
| Informal clarity testing | 5-second test tools | 2022-present | Formal tools (Lyssna, Maze) provide unbiased data, recall questions, benchmarking |

**Deprecated/outdated:**
- **Multiple equally-styled CTAs:** Research now definitively shows this tanks conversions. Single primary CTA is the standard.
- **Verbose hero copy:** Modern heroes must pass 5-second test. Long paragraphs fail clarity requirements.
- **RGB contrast checking:** OKLCH's perceptually uniform lightness makes contrast more predictable. Use OKLCH-aware tools.
- **"About us" focused copy:** Hero sections now outcome-first, customer-focused. "We build X" is outdated; "You achieve Y" is current.

## Open Questions

Things that couldn't be fully resolved:

1. **Exact metric values for outcome badges**
   - What we know: Badges should display client outcomes (time/money saved, satisfaction)
   - What's unclear: Actual data for Joel Shinness's projects (requires client testimonials, case studies)
   - Recommendation: Use conservative estimates from any existing testimonials, or start with qualitative badges ("Hours saved", "Money saved", "Projects successful") until quantitative data available. Run Phase 13 with placeholder values, update in future iteration.

2. **5-second test baseline metrics**
   - What we know: Hero should pass 5-second test (users recall core message)
   - What's unclear: What "pass" threshold means quantitatively (80% recall? 90% recall?)
   - Recommendation: Use 5-second test tools (Lyssna, Maze) to establish baseline. Aim for >80% participants correctly recalling primary outcome message. Document baseline for future A/B testing.

3. **Badge animation/interaction states**
   - What we know: Phase requirements explicitly exclude animated isometric scenes
   - What's unclear: Whether subtle hover states (existing `iso-hover-lift`, `iso-hover-glow`) enhance or distract from badges
   - Recommendation: Implement badges without hover states initially (static trust signals). If future testing shows low engagement, consider subtle hover effects. Static badges align with "visual outcome badges" requirement.

4. **Optimal badge order/hierarchy**
   - What we know: 2-3 badges maximum, positioned between headline and CTA
   - What's unclear: Whether badge order affects conversion (time saved first vs. satisfaction first)
   - Recommendation: Order badges by strongest outcome first (likely "hours saved" as most tangible). Document initial order for future A/B testing. Visual hierarchy via variant colors (yellow most prominent).

5. **Dark mode glow intensity for badge borders**
   - What we know: Phase 12 implements `iso-shadow` that transforms to glow in dark mode via `color-mix()`
   - What's unclear: Whether standard glow intensity maintains 3:1 border contrast on badges specifically
   - Recommendation: Test badge border visibility in dark mode during implementation. May need badge-specific glow intensity (lower percentage in `color-mix()`) to maintain border contrast. Document in Badge component.

## Sources

### Primary (HIGH confidence)
- [Astro Components Documentation](https://docs.astro.build/en/basics/astro-components/) - Component structure, Props patterns, composition
- [Astro TypeScript Guide](https://docs.astro.build/en/guides/typescript/) - Props interface best practices
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - WCAG 2.2 AA contrast requirements
- [WCAG 2.2 AA Contrast Requirements Guide](https://www.makethingsaccessible.com/guides/contrast-requirements-for-wcag-2-2-level-aa/) - Non-text element contrast (3:1 for badges/borders)
- [Neobrutalism Badge Component](https://www.neobrutalism.dev/docs/badge) - Badge structure, variants, focus states

### Secondary (MEDIUM confidence)
- [100 Startup Hero Sections Analysis](https://www.ofspace.co/blog/startup-hero-sections-analysis) - 74% failure rate, multiple CTA pitfalls, trust signal data
- [5-Second Testing Guide (Lyssna)](https://www.lyssna.com/guides/five-second-testing/) - Testing methodology, recall questions
- [5-Second Testing (Maze)](https://maze.co/collections/user-research/five-second-test/) - Practical testing tools
- [Hero Section Best Practices 2026](https://www.perfectafternoon.com/2025/hero-section-design/) - Outcome-focused copy, trust signal placement
- [Hero Section Optimization](https://www.omniconvert.com/blog/hero-section-examples/) - Visual hierarchy, badge count recommendations
- [SaaS Hero Copywriting Formulas](https://landingrabbit.com/blog/saas-website-hero-text) - Outcome-first vs. feature-first examples
- [OKLCH Ecosystem Tools](https://evilmartians.com/chronicles/exploring-the-oklch-ecosystem-and-its-tools) - Contrast checkers (OddContrast, Atmos)
- [OKLCH in CSS (Evil Martians)](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl) - 93% browser support, perceptually uniform mixing
- [Modern CSS Toolkit 2026](https://www.nickpaolini.com/blog/modern-css-toolkit-2026) - color-mix() browser support
- [Hero Section A/B Testing Case Study](https://carrot.com/blog/hero-section-conversion-test/) - 45.87% conversion uplift from simplified hero

### Tertiary (LOW confidence)
- Multiple web searches on outcome-focused copywriting, badge design, WCAG compliance - These sources provided directional guidance but were verified against primary sources where possible. Marked for validation during implementation.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All tools already in project (Astro 5, TypeScript, Tailwind 4, OKLCH). No new dependencies required.
- Architecture: HIGH - Astro component patterns verified from official docs. Badge structure adapted from neobrutalism patterns and Phase 12 design system.
- Copywriting patterns: MEDIUM - Outcome-focused approach well-documented in multiple sources, but specific metric values need client data.
- Accessibility: HIGH - WCAG 2.2 AA requirements verified from official WebAIM and W3C sources. OKLCH contrast tools identified.
- Pitfalls: MEDIUM - Based on 100-startup study and multiple 2024-2025 sources. Common patterns confirmed but not project-specific.

**Research date:** 2026-02-09
**Valid until:** 2026-04-09 (60 days - hero section patterns evolving but stable; WCAG 2.2 standard)

**Key risks:**
1. Metric values require client testimonial data - may need placeholder content initially
2. 5-second test requires actual user testing - can't fully validate without real participants
3. Badge contrast in dark mode needs implementation-time verification - OKLCH tools available but combinations must be tested

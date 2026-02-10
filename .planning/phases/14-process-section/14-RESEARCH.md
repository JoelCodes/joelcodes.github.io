# Phase 14: Process Section - Research

**Researched:** 2026-02-09
**Domain:** Process workflow visualization with isometric mini-illustrations
**Confidence:** HIGH

## Summary

This phase adds visual process step descriptions to the existing Process.astro component. The standard approach combines concise, user-focused copywriting (1-2 sentences per step) with small, inline isometric SVG illustrations optimized to under 20KB each. The codebase already has isometric CSS utilities (phase 12) and neobrutalist design tokens, providing the foundation for consistent illustration styling.

Research shows that successful process sections use simple, empathetic language focused on outcomes rather than technical details. For illustrations, the proven pattern is inline SVG (not `<img>` tags) to eliminate HTTP requests and enable CSS-based theming. Astro 5.x natively supports importing `.svg` as components, with experimental SVGO optimization reducing file sizes by 60-80% at build time.

**Primary recommendation:** Use inline SVG components for illustrations (Astro's native `.svg` import), optimize with SVGO preset-default, write 1-2 sentence descriptions focused on user experience, and apply existing iso-shadow utilities for automatic dark mode transformation.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| SVGO | 3.x | SVG optimization | Industry standard for SVG minification, reduces file size 60-80% while preserving quality |
| Astro SVG Import | Native 5.x | SVG as components | Eliminates HTTP requests, enables props/styling, automatic inlining |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| SVGOMG | Web tool | Visual SVG optimization | Manual pre-optimization before committing, visual feedback on compression |
| Vecta Nano | Web tool | Aggressive SVG compression | When SVGO alone doesn't reach <20KB target |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Inline SVG | `<img>` tags | Caching benefit, but loses CSS theming, adds HTTP requests, can't use props |
| Manual SVG | Icon library | Faster implementation, but generic look, heavier bundle, doesn't match custom brand |
| Astro Image API | N/A | Image API doesn't process SVG as components, only for raster images |

**Installation:**
```bash
# SVGO (if manual optimization needed)
npm install -D svgo

# OR enable Astro's experimental SVGO
# In astro.config.mjs:
# experimental: { svgo: true }
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── Process.astro           # Existing component
│   └── illustrations/           # NEW: SVG illustration components
│       ├── ProcessDiscovery.svg
│       ├── ProcessPrototype.svg
│       ├── ProcessProposal.svg
│       ├── ProcessBuild.svg
│       └── ProcessHandover.svg
```

### Pattern 1: Inline SVG Component with Props
**What:** Import `.svg` files as Astro components, pass width/height/color as props
**When to use:** All process illustrations (ensures consistency, enables theming)
**Example:**
```astro
---
// In Process.astro
import ProcessDiscovery from './illustrations/ProcessDiscovery.svg';
---

<article class="process-step">
  <div class="illustration-wrapper text-yellow">
    <ProcessDiscovery width={80} height={80} />
  </div>
  <h3>Discovery</h3>
  <p>We start by understanding your specific challenges...</p>
</article>

<style>
  .illustration-wrapper {
    /* iso-shadow utility applies currentColor from text-yellow */
    @apply iso-shadow;
  }
</style>
```
**Source:** [Astro Images Documentation](https://docs.astro.build/en/guides/images/)

### Pattern 2: SVGO Build-Time Optimization
**What:** Enable Astro's experimental SVGO flag for automatic SVG optimization
**When to use:** Always (production builds only, no dev slowdown)
**Example:**
```javascript
// astro.config.mjs
export default defineConfig({
  experimental: {
    svgo: {
      multipass: true,
      plugins: [
        'preset-default',
        { name: 'removeViewBox', active: false } // Keep viewBox for scaling
      ]
    }
  }
});
```
**Source:** [Astro SVG Optimization Docs](https://docs.astro.build/en/reference/experimental-flags/svg-optimization/)

### Pattern 3: User-Focused Process Descriptions
**What:** 1-2 sentence descriptions using conversational, outcome-focused language
**When to use:** All process step descriptions
**Example:**
```
✓ GOOD: "We start by understanding your specific workflow challenges and business goals through a collaborative discovery session."

✗ BAD: "This phase involves a comprehensive analysis of requirements gathering using our proprietary methodology."
```
**Why:** UX research shows users respond better to conversational, benefit-focused copy under 20 words per sentence.
**Source:** [UX Writing Guide 2026](https://uxplaybook.org/articles/ux-writing-guide-2026)

### Anti-Patterns to Avoid
- **Base64-encoded SVGs:** Bloats HTML, prevents caching, harder to maintain than component imports
- **External `<img>` tags for mini-illustrations:** Adds HTTP requests, breaks currentColor theming, can't use props
- **Overly detailed illustrations:** Complex SVGs bloat file size and lose clarity at small sizes (aim for 3-5 shapes max)
- **Technical jargon in descriptions:** "Requirements gathering phase" → "Discovery session to understand your goals"

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SVG optimization | Custom minification script | SVGO or Astro's experimental.svgo | Handles edge cases (viewBox preservation, path simplification, decimal precision) that custom scripts miss |
| Icon positioning/sizing | Manual width/height inline styles | SVG component props (width/height) | Props are type-safe, documented, and work with Astro's optimization |
| Dark mode SVG theming | Duplicate SVG files or JS color swapping | currentColor + iso-shadow utility | Existing utility handles shadow→glow transformation automatically |
| Responsive SVG sizing | Media query SVG swapping | Single SVG with viewBox + CSS sizing | ViewBox makes SVGs scale naturally, no need for multiple files |

**Key insight:** SVG optimization has dozens of edge cases (preserving necessary attributes while removing cruft). SVGO has 50+ plugins handling these nuances—hand-rolling leads to broken viewBoxes, stripped accessibility attributes, or minimal compression.

## Common Pitfalls

### Pitfall 1: Illustrations Too Complex for Small Viewports
**What goes wrong:** Designer creates detailed isometric scene (15+ shapes), looks great at 400px but illegible at 80px mobile size
**Why it happens:** Illustrations designed at desktop size without mobile testing
**How to avoid:**
- Design at target mobile size first (80x80px)
- Limit to 3-5 simple geometric shapes per illustration
- Test readability at 375px viewport (mobile)
**Warning signs:** File size >10KB before optimization, shapes smaller than 16px, text within SVG

### Pitfall 2: Missing or Removed ViewBox Attribute
**What goes wrong:** SVGO removes `viewBox`, breaking SVG scaling—illustration appears tiny or crops incorrectly
**Why it happens:** Default SVGO config includes `removeViewBox` plugin
**How to avoid:** Disable removeViewBox plugin in SVGO config: `{ name: 'removeViewBox', active: false }`
**Warning signs:** SVG renders at fixed size regardless of width/height props, illustrations don't scale responsively

### Pitfall 3: Poor Alt Text for Screen Readers
**What goes wrong:** Alt text says "illustration" or "isometric graphic" instead of describing the step
**Why it happens:** Treating illustrations as decorative when they're informative
**How to avoid:**
- For informative illustrations: Describe the workflow step, not the visual ("Step 1: Discovery session where we understand your goals")
- Keep under 150 characters
- Don't say "image of" or "illustration of"
- Test with screen reader (VoiceOver on Mac)
**Warning signs:** Alt text focuses on visual details ("yellow isometric cube") instead of meaning
**Source:** [W3C WAI Image Tutorial](https://www.w3.org/WAI/tutorials/images/)

### Pitfall 4: LCP Regression from Inline SVG Bloat
**What goes wrong:** Inlining 5 unoptimized SVGs adds 100KB to HTML, delaying LCP by 300ms+
**Why it happens:** Assuming inline is always faster without measuring file size impact
**How to avoid:**
- Optimize SVGs to <5KB each (target 3-4KB)
- Keep total inline SVG budget under 20KB for above-the-fold content
- Use Astro's SVGO experimental flag for automatic optimization
- Monitor Lighthouse LCP before/after adding illustrations
**Warning signs:** Unoptimized SVGs >10KB, LCP increase >200ms from baseline
**Source:** [Inline SVG vs IMG Tag Performance](https://www.svgai.org/blog/inline-svg-vs-img-tag)

### Pitfall 5: Hard-Coded Colors Breaking Dark Mode
**What goes wrong:** SVG has `fill="#FFE600"` hard-coded, doesn't adapt to dark mode theme
**Why it happens:** Exporting from design tools with hard-coded colors instead of currentColor
**How to avoid:**
- Remove `fill` and `stroke` attributes from SVG before importing
- Let CSS `currentColor` inherit from parent `.text-{color}` class
- Use iso-shadow utility for automatic shadow→glow transformation
- Test in both light and dark mode before committing
**Warning signs:** Illustration colors don't change when toggling dark mode, contrast issues in dark mode

## Code Examples

Verified patterns from official sources:

### Example 1: Import and Use SVG Component
```astro
---
// src/components/Process.astro
import ProcessDiscovery from './illustrations/ProcessDiscovery.svg';
import ProcessPrototype from './illustrations/ProcessPrototype.svg';
// ... other imports
---

<section id="process" aria-labelledby="process-heading" class="py-24 md:py-32 px-4">
  <div class="container mx-auto max-w-4xl">
    <h2 id="process-heading" class="font-heading text-4xl font-bold text-text-light dark:text-text-dark mb-12 text-center">
      How We Work Together
    </h2>

    <div class="flex flex-col gap-8">
      <!-- Step 1: Discovery -->
      <article class="relative pl-12 pb-8 border-l-[4px] border-turquoise">
        <div class="absolute left-[-40px] top-4 text-yellow iso-shadow">
          <ProcessDiscovery width={64} height={64} aria-hidden="true" />
        </div>
        <h3 class="font-heading text-2xl font-semibold text-text-light dark:text-text-dark mb-4">
          Discovery
        </h3>
        <p class="text-text-muted-light dark:text-text-muted-dark">
          We start by understanding your specific workflow challenges and business goals through a collaborative discovery session.
        </p>
      </article>

      <!-- Repeat for other steps... -->
    </div>
  </div>
</section>
```
**Source:** Astro native SVG component pattern + existing Process.astro structure

### Example 2: Minimal Optimized SVG Structure
```svg
<!-- ProcessDiscovery.svg - Simple isometric cube representing discovery -->
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Front face -->
  <path d="M50 30 L80 45 L80 75 L50 90 Z" fill="currentColor" opacity="0.9"/>
  <!-- Top face -->
  <path d="M20 45 L50 30 L80 45 L50 60 Z" fill="currentColor" opacity="1"/>
  <!-- Side face -->
  <path d="M20 45 L20 75 L50 90 L50 60 Z" fill="currentColor" opacity="0.7"/>
</svg>
```
**Why this works:**
- ViewBox enables scaling without quality loss
- currentColor inherits from parent text color
- 3 shapes (front/top/side) = simple isometric form
- Opacity differentiates faces (creates 3D depth)
- ~300 bytes unminified, ~200 bytes optimized

### Example 3: Enable Astro SVGO Optimization
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  experimental: {
    svgo: {
      multipass: true,
      floatPrecision: 2,
      plugins: [
        'preset-default',
        { name: 'removeViewBox', active: false },
        { name: 'removeDimensions', active: true }
      ]
    }
  }
});
```
**Source:** [Astro Experimental SVG Optimization](https://docs.astro.build/en/reference/experimental-flags/svg-optimization/)

### Example 4: UX Writing Pattern for Process Steps
```markdown
✓ GOOD Process Description Examples:

1. Discovery (15 words)
   "We start by understanding your specific workflow challenges and business goals through a collaborative discovery session."

2. Prototype (13 words)
   "You'll see a working demo of the solution to validate the approach before building."

3. Proposal (14 words)
   "We outline the project scope, timeline, and investment so you can make an informed decision."

4. Build (12 words)
   "Your solution takes shape with regular updates keeping you in the loop."

5. Handover (13 words)
   "We deploy your solution and provide training so you feel confident using it."

Pattern:
- Start with benefit/outcome ("You'll see", "We deploy")
- Keep under 15 words per sentence
- Use conversational "we/you" language
- Focus on user experience, not technical process
```
**Source:** [UX Writing Guide 2026](https://uxplaybook.org/articles/ux-writing-guide-2026) principles applied to process workflow

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Font icons (Font Awesome) | SVG components | 2020-2021 | Better accessibility, no FOIT/FOUT, tree-shaking |
| Base64 inline SVG | Native `.svg` import | Astro 2.x (2023) | Cleaner code, props support, easier maintenance |
| Manual SVGO CLI | Astro experimental.svgo | Astro 4.x (2024) | Automatic optimization, no build step needed |
| `<img>` for illustrations | Inline SVG with currentColor | 2023-2024 | Theme-aware without JS, no HTTP requests |

**Deprecated/outdated:**
- **lucide-static:** Replaced with `@lucide/astro` (phase 12-01) for tree-shaking
- **Fragment set:html for SVG:** Replaced with native `.svg` import in Astro 5.x
- **External SVG sprites:** Inline components preferred for mini-illustrations (<20KB total)

## Open Questions

Things that couldn't be fully resolved:

1. **Illustration Design Source**
   - What we know: Need 5 isometric mini-illustrations following neobrutalist style (45° light, flat colors, 3-5 shapes each)
   - What's unclear: Will illustrations be created from scratch, use a template library, or adapt existing graphics?
   - Recommendation: Create simple geometric SVGs by hand (cube, document, gears, etc.) or use tools like iiisometric (https://www.fffuel.co/iiisometric/) for quick isometric shape generation

2. **Performance Budget Verification**
   - What we know: Success criteria requires LCP increase <200ms from baseline
   - What's unclear: Current LCP baseline not documented in codebase
   - Recommendation: Run Lighthouse before starting phase to establish baseline, then compare after adding illustrations

3. **Mobile Illustration Sizing**
   - What we know: Success criteria requires illustrations "recognizable on mobile (375px viewport)"
   - What's unclear: Exact pixel size for mobile illustrations (current design shows numbered circles, not illustrations)
   - Recommendation: Start with 48x48px mobile, 64x64px desktop; test with actual SVGs and adjust based on clarity

## Sources

### Primary (HIGH confidence)
- [Astro Images Documentation](https://docs.astro.build/en/guides/images/) - SVG as components pattern
- [Astro SVG Optimization](https://docs.astro.build/en/reference/experimental-flags/svg-optimization/) - Experimental SVGO configuration
- [W3C WAI Images Tutorial](https://www.w3.org/WAI/tutorials/images/) - Accessibility guidelines for alt text
- Existing codebase: `src/styles/global.css` (iso-shadow utilities), `src/components/ui/Badge.astro` (iso-shadow usage pattern)

### Secondary (MEDIUM confidence)
- [UX Playbook: Mastering UX Writing 2026](https://uxplaybook.org/articles/ux-writing-guide-2026) - Verified with multiple UX writing sources
- [Linearity: Isometric Design Guide](https://www.linearity.io/blog/isometric-design/) - Design principles verified with 99designs and Envato
- [SVG AI: Inline SVG vs IMG Tag](https://www.svgai.org/blog/inline-svg-vs-img-tag) - Performance comparison verified with CloudFour stress test

### Tertiary (LOW confidence)
- [NN/g: Neobrutalism Definition](https://www.nngroup.com/articles/neobrutalism/) - Visual style definition (marked LOW because prior phase already established neobrutalist patterns)
- [Quixy: Workflow Guide 2026](https://quixy.com/blog/what-is-workflow-an-in-depth-overview/) - Workflow communication patterns (marked LOW because focused on internal workflows, not client-facing)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Astro's native SVG import and SVGO are documented, proven patterns
- Architecture: HIGH - Pattern verified in official Astro docs and existing codebase (iso-shadow utility already in use)
- Pitfalls: MEDIUM - ViewBox and LCP pitfalls documented in multiple sources; alt text and dark mode pitfalls based on WCAG standards and existing codebase patterns

**Research date:** 2026-02-09
**Valid until:** 2026-03-09 (30 days - stable domain, Astro 5.x established, SVG patterns mature)

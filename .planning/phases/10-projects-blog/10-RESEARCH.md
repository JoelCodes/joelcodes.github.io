# Phase 10: Projects & Blog - Research

**Researched:** 2026-02-09
**Domain:** Content-heavy neobrutalist design, Astro routing and redirects, case study presentation patterns, blog typography readability
**Confidence:** HIGH

## Summary

Phase 10 applies the neobrutalist design system (established in Phases 7-8) to content-rich sections: projects portfolio and blog. The critical challenge is balancing bold neobrutalist aesthetics with readability in long-form content. Research identifies three key implementation domains:

1. **URL Structure Migration**: Rename /portfolio to /projects with 301 redirects. Astro's `redirects` config provides clean declarative redirects, but GitHub Pages limitations mean these compile to `<meta http-equiv="refresh">` HTML redirects rather than true HTTP 301s at the server level.

2. **Card Grid Layouts**: Apply neobrutalist Card primitives (from Phase 8) to project and blog indexes. The CSS `gap` property is the 2026 standard for grid spacing (24px recommended for card grids). Use `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` responsive pattern with `auto-fit` or `auto-fill` for fluid layouts.

3. **Typography Hierarchy for Readability**: Neobrutalist typography best practice pairs bold, quirky headings (Bricolage Grotesque, weight 700-800) with clean body fonts (DM Sans, weight 400). The key insight: reserve decorative treatment for headings only, keep body text neutral for reading comfort. This two-tier approach maintains visual identity without overwhelming readers.

**Primary recommendation:** Create separate ProjectCard and update BlogCard components extending the Phase 8 Card primitive. Use neobrutalist styling (thick borders, offset shadows) for interactive cards on index pages. For individual project/blog pages, apply 2/10 density (headings only) to preserve readability. Configure astro.config.mjs redirects for /portfolio → /projects migration. Structure project JSON data to support Problem-Solution-Results case study format.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro Content Collections | 5.x | Blog post management | Type-safe frontmatter with Zod validation, already configured in project |
| Astro Routing | 5.x | URL structure and redirects | File-based routing with declarative redirect config |
| Existing Phase 8 Cards | - | Neobrutalist card primitives | Thick borders, offset shadows, variant colors already implemented |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| projects.json | Native | Project data storage | Simple static data; Astro getStaticPaths for dynamic routes |
| CSS Grid + Gap | Native | Card grid layouts | Modern spacing approach; 24px gap for card grids per 2026 best practices |
| reading-time-estimator | Installed | Blog reading time | Already in use for blog cards; provides UX value |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| projects.json | Astro Content Collections for projects | Content Collections add complexity for structured project data; JSON works well for case study format with problem/solution/results fields |
| Astro redirects | Client-side redirects | Astro config redirects compile to HTML meta refresh on GitHub Pages (static hosting limitation); functionally equivalent for end users |
| Custom card components | Reuse Phase 8 Card directly | Project/blog cards need specialized layouts (image, metadata); extending Card primitive is cleaner than conditionals |

**Installation:**
```bash
# No additional dependencies needed
# All required features already available:
# - Astro 5.x routing and redirects
# - Phase 8 Card/Button primitives
# - Content Collections configured
# - reading-time-estimator installed
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── pages/
│   ├── projects/              # Renamed from portfolio
│   │   ├── index.astro        # Projects index with card grid
│   │   └── [slug].astro       # Individual project case studies
│   ├── blog/
│   │   ├── index.astro        # Blog index with card grid (existing)
│   │   ├── tags/[tag].astro   # Tag pages (existing)
│   │   └── [slug].astro       # Blog posts (existing)
│   └── portfolio.astro        # Meta refresh redirect page (fallback)
├── data/
│   └── projects.json          # Project data with case study structure
├── components/
│   ├── ui/
│   │   ├── Card.astro         # Base Card primitive (Phase 8)
│   │   ├── Button.astro       # Base Button primitive (Phase 8)
│   │   └── Input.astro        # Base Input primitive (Phase 8)
│   ├── ProjectCard.astro      # Extends Card for project display
│   └── BlogCard.astro         # Extends Card for blog display (existing)
└── content/blog/              # MDX blog posts (existing)
```

### Pattern 1: Astro Redirect Configuration

**What:** Use `redirects` config in astro.config.mjs for permanent URL redirects.

**When to use:** Renaming routes, consolidating URLs, SEO-friendly permanent moves.

**Example:**
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://joelshinness.com',
  redirects: {
    '/portfolio': '/projects',           // Main redirect
    '/portfolio/[slug]': '/projects/[slug]'  // Dynamic route redirect
  }
});
```

**How it works on GitHub Pages:**
- Astro generates HTML files with `<meta http-equiv="refresh" content="0;url=/projects">`
- Not true HTTP 301, but functionally equivalent for users and search engines
- File-based routes take precedence, so delete old /portfolio directory after redirect setup

**Source:** [Astro Routing Documentation](https://docs.astro.build/en/guides/routing/), [Astro SSG Redirects on GitHub Pages](https://puf.io/posts/astro-ssg-redirects/)

### Pattern 2: Case Study Data Structure (Problem-Solution-Results)

**What:** Structure project data to support narrative case study format with clear sections.

**When to use:** Portfolio projects that tell a story of solving real problems.

**Example:**
```json
{
  "slug": "bakery-order-system",
  "title": "Bakery Order Automation",
  "category": "web-apps",
  "categoryLabel": "Web Apps",
  "thumbnail": "/images/portfolio/bakery-thumb.jpg",
  "problem": "Sarah's bakery was receiving orders through 5 different channels: phone, SMS, Facebook, Instagram, and email. She spent 4-5 hours daily just transcribing orders...",
  "solution": "We built a custom order management system that consolidated all order channels into a single dashboard. Customers can now place orders through a simple web form...",
  "results": [
    { "metric": "85%", "label": "Time reduction in order processing" },
    { "metric": "20hrs", "label": "Saved per week" },
    { "metric": "Zero", "label": "Missed orders since launch" }
  ],
  "technologies": ["React", "Node.js", "PostgreSQL", "Twilio API"],
  "screenshots": [
    { "src": "/images/portfolio/bakery-dashboard.jpg", "alt": "Order management dashboard" }
  ],
  "testimonial": {
    "quote": "This system gave me my evenings back...",
    "author": "Sarah Johnson",
    "role": "Owner, Sweet Delights Bakery"
  }
}
```

**Why this structure:**
- **Problem**: Sets context, creates emotional connection with reader
- **Solution**: Demonstrates problem-solving approach, technical decisions
- **Results**: Quantifiable impact (metrics prioritize outcomes over process)
- **Testimonial**: Social proof, human element

**Source:** [UX Case Study Template 2026](https://blog.uxfol.io/ux-case-study-template/), [Case Study Storytelling](https://indeed.design/article/the-art-of-storytelling-for-case-studies/)

### Pattern 3: Responsive Card Grid with CSS Gap

**What:** Use CSS Grid with `gap` property for consistent spacing between cards.

**When to use:** Blog index, project index, tag pages - any card-based layout.

**Example:**
```astro
<!-- projects/index.astro -->
<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {projects.map((project) => (
    <ProjectCard
      title={project.title}
      slug={project.slug}
      thumbnail={project.thumbnail}
      category={project.categoryLabel}
      problem={project.problem}
    />
  ))}
</section>
```

**CSS Grid spacing best practices (2026):**
- **gap: 24px (1.5rem / gap-6)** - Standard for card grids, provides visual separation without feeling sparse
- **Responsive columns**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` adapts to viewport width
- **Alternative fluid approach**: `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))` for automatic column count
- **Why gap over margins**: Gap applies spacing between items only, no special-casing for edge items

**Source:** [CSS Gap Best Practices 2026](https://thelinuxcode.com/the-css-gap-property-practical-spacing-for-grid-flexbox-and-modern-responsive-ui/), [Tailwind Gap Utility Guide](https://tailkits.com/blog/tailwind-gap-utility-guide/)

### Pattern 4: Two-Tier Typography for Readability

**What:** Apply neobrutalist styling to headings while keeping body text neutral and readable.

**When to use:** Blog posts, project case studies, any long-form content.

**Example:**
```css
/* Blog post prose styling (already exists in global.css) */
.prose h1 {
  font-family: var(--font-heading);        /* Bricolage Grotesque */
  font-size: var(--text-4xl);              /* 36px */
  font-weight: var(--font-weight-h1);      /* 800 */
  text-transform: uppercase;               /* Neobrutalist accent */
  letter-spacing: -0.02em;
  color: var(--color-text-light);
}

.prose h2 {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);              /* 30px */
  font-weight: var(--font-weight-h2);      /* 700 */
  /* Normal case - not uppercase */
  color: var(--color-text-light);
}

.prose h3 {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);              /* 24px */
  font-weight: var(--font-weight-h3);      /* 600 */
  color: var(--color-text-light);          /* Standard color - no accent */
}

.prose p {
  font-family: var(--font-body);           /* DM Sans */
  font-weight: var(--font-weight-body);    /* 400 */
  line-height: 1.75;                       /* Generous spacing for readability */
  margin-bottom: 1rem;
}
```

**Key principles:**
- **H1 only**: ALL CAPS, maximum weight (800), can use accent color
- **H2**: Bold (700) but normal case, subtle neobrutalist character
- **H3+**: Progressively lighter, standard colors
- **Body**: Clean, neutral font, generous line-height (1.75), no decorative elements
- **Whitespace**: 24-32px margins around typography blocks prevent overwhelming density

**Source:** [Neobrutalism Typography Best Practices - NN/G](https://www.nngroup.com/articles/neobrutalism/), [Neobrutalist Fonts Guide](https://blog.kristi.digital/p/my-favourite-fonts-for-neobrutalist-web-design)

### Pattern 5: Content Collections with Zod Validation

**What:** Use Astro's Content Collections for type-safe blog post frontmatter validation.

**When to use:** Blog posts, documentation, any Markdown/MDX content requiring schema validation.

**Example (already configured in project):**
```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    featuredImage: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

**Benefits:**
- **Build-time validation**: Catches missing/incorrect frontmatter before deployment
- **TypeScript inference**: Auto-complete for post data in templates
- **Error messages**: Clear feedback when schema doesn't match
- **Astro 5 performance**: 5x faster builds, 50% less memory vs. legacy approach

**Source:** [Astro Content Collections 2026 Guide](https://inhaq.com/blog/getting-started-with-astro-content-collections.html), [Astro Content Collections API](https://docs.astro.build/en/reference/modules/astro-content/)

### Anti-Patterns to Avoid

- **Neobrutalist body text:** Do NOT apply thick borders, shadows, or decorative fonts to paragraph text. Readability trumps aesthetics in long-form content. Reserve brutalism for headings only.
- **Uniform card density:** Interactive cards (clickable) need visual affordance (shadows, hover states). Static content cards should be lighter (borders only, no shadows).
- **Tight card grid spacing:** Cards with thick borders and shadows need breathing room. Use minimum 24px gap. Tight spacing (8-12px) causes visual crowding with neobrutalist elements.
- **Missing reading time estimates:** Blog cards without reading time reduce UX. Users want to gauge time investment before clicking.
- **Ignoring case study narrative flow:** Don't present projects as feature lists. Use Problem → Solution → Results structure to tell a story and demonstrate impact.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| URL redirects | Custom redirect logic | Astro `redirects` config | Declarative, build-time compilation, handles dynamic routes |
| Card grid spacing | Manual margin calculations | CSS `gap` property | Automatically handles edge cases, responsive, cleaner markup |
| Reading time estimation | Custom word counting | `reading-time-estimator` package | Handles edge cases (code blocks, lists), already installed |
| Blog post validation | Manual frontmatter checks | Astro Content Collections + Zod | Build-time validation, type safety, clear error messages |
| Dynamic tag pages | Manual tag aggregation | Astro `getStaticPaths()` pattern | Pre-renders all tag pages at build, SEO-friendly, performant |
| Case study layout structure | Custom HTML for each project | JSON data + Astro template | Consistent structure, easier to maintain, scalable |

**Key insight:** Astro's routing, Content Collections, and static generation handle content management edge cases (validation, performance, SEO) better than custom solutions. Focus implementation effort on visual design and UX, not infrastructure.

## Common Pitfalls

### Pitfall 1: Overwhelming Neobrutalist Density in Long-Form Content

**What goes wrong:** Applying thick borders, colored shadows, and decorative fonts to blog post body text creates visual fatigue and reduces reading comprehension.

**Why it happens:** Designer applies the same 10/10 density used in hero sections to all content. Without hierarchy, everything competes for attention and nothing stands out.

**How to avoid:**
1. Follow density guidelines: Blog content is 2/10 (headings only)
2. Use two-tier typography: bold headings + clean body
3. Reserve colored accents for H1/H2 only
4. Keep body text: standard font, no borders, no shadows, generous line-height (1.75)
5. Test readability with real content (not Lorem Ipsum) - aim for 200+ word paragraphs

**Warning signs:**
- Users report difficulty reading blog posts
- High bounce rate on blog pages (users leave quickly)
- Accessibility tools flag contrast issues in body text
- Text feels cramped or cluttered

**Verification:** Read a full blog post on mobile. If any paragraph feels visually overwhelming or hard to track, reduce density.

### Pitfall 2: GitHub Pages Redirect Limitations Misunderstood

**What goes wrong:** Developer expects HTTP 301 redirects but GitHub Pages doesn't support server-side status codes. Users and search engines still get redirected, but analytics may show unexpected behavior.

**Why it happens:** Astro `redirects` config documentation describes 301 status codes, but this only applies to SSR deployments or platforms supporting server-side redirects. GitHub Pages is static hosting.

**How to avoid:**
1. Understand GitHub Pages generates `<meta http-equiv="refresh">` HTML redirects
2. These are functionally equivalent for users (instant redirect) and search engines (Google treats as 301)
3. Delete old /portfolio files after redirect setup to prevent file-route precedence
4. Monitor Google Search Console to verify redirect recognition
5. Consider adding canonical tags if needed for SEO clarity

**Warning signs:**
- Old /portfolio URLs still accessible after redirect setup
- Google Search Console shows duplicate content warnings
- Analytics show traffic to /portfolio instead of /projects

**Verification:** Check `/portfolio` in browser - should immediately redirect. Verify no actual portfolio directory exists in build output.

### Pitfall 3: Card Grid Layout Breaks with Variable Content Heights

**What goes wrong:** CSS Grid cards with different content heights create misaligned rows. Short cards create awkward whitespace next to tall cards.

**Why it happens:** Grid auto-placement doesn't equalize row heights within a grid track. Each card's height is independent.

**How to avoid:**
1. Use `align-items: start` on grid container (default behavior)
2. Accept height variation - it's natural and doesn't harm UX
3. Alternatively, truncate card descriptions to fixed line count (`line-clamp-3`)
4. Use consistent card structure (image + title + description + metadata)
5. Avoid mixing card types (some with images, some without) in same grid

**Warning signs:**
- Grid rows look "jagged" or uneven
- Designer requests "equal height cards"
- Excessive vertical whitespace below short cards

**Verification:** Grid with variable content is acceptable. If visual balance is critical, use `line-clamp-3` on descriptions to limit height variance.

### Pitfall 4: Missing Accessibility in Interactive Cards

**What goes wrong:** Project/blog cards are clickable divs with hover effects but lack proper semantics, breaking keyboard navigation and screen readers.

**Why it happens:** Developer wraps entire card in `<div>` with `onclick` handler instead of using semantic link element.

**How to avoid:**
1. Wrap card content in `<a>` tag, not `<div onclick>`
2. Entire card is one clickable link (better UX than "Read more" button)
3. Use descriptive link text or `aria-label` on card link
4. Ensure focus state visible (Phase 8 focus ring styles)
5. Test with keyboard navigation (Tab key should move between cards)

**Warning signs:**
- Automated accessibility tools report "clickable div" issues
- Keyboard navigation skips cards
- Screen readers don't announce card links
- Users can't open cards in new tabs (right-click context menu missing)

**Verification:** Tab through card grid with keyboard. Each card should be focusable and activatable with Enter key.

### Pitfall 5: Case Study Structure Missing Narrative Flow

**What goes wrong:** Project pages list features and technologies without explaining why they matter. Readers don't understand the problem being solved or the impact achieved.

**Why it happens:** Developer treats projects as technical showcases instead of stories. Focus on "what was built" rather than "what problem was solved."

**How to avoid:**
1. Always start with Problem section: who was affected, what pain points existed
2. Solution section explains approach and key decisions (why this solution, not alternatives)
3. Results section quantifies impact with metrics (time saved, revenue increased, errors eliminated)
4. Include testimonial for human element (optional but powerful)
5. Lead with strongest results ("Start with your biggest wins" - case study best practice)

**Warning signs:**
- Projects feel like technical documentation
- No clear "before and after" narrative
- Metrics buried or missing
- Readers don't understand project value

**Verification:** Ask non-technical reader to summarize project. If they can't explain the problem and impact, narrative structure needs work.

## Code Examples

Verified patterns from official sources:

### Project Card Component (Extends Phase 8 Card)

```astro
---
// src/components/ProjectCard.astro
interface Props {
  title: string;
  slug: string;
  thumbnail: string;
  category: string;
  problem: string; // Excerpt from problem section
}

const { title, slug, thumbnail, category, problem } = Astro.props;

// Truncate problem to 160 chars for card display
const excerpt = problem.length > 160 ? problem.slice(0, 157) + '...' : problem;
---

<article class="project-card">
  <a
    href={`/projects/${slug}`}
    class="block group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-lg overflow-hidden border-4 border-black dark:border-white bg-white dark:bg-gray-900"
  >
    <!-- Thumbnail with 16:9 aspect ratio -->
    <div class="relative w-full bg-gray-100 dark:bg-gray-800 overflow-hidden" style="aspect-ratio: 16/9;">
      <img
        src={thumbnail}
        alt={title}
        class="absolute inset-0 w-full h-full object-cover"
        width="640"
        height="360"
        loading="lazy"
      />
    </div>

    <!-- Card content -->
    <div class="p-6 shadow-neo-yellow dark:shadow-none">
      <!-- Category badge -->
      <div class="mb-3">
        <span class="inline-block px-3 py-1 text-sm font-bold rounded-full bg-yellow-300 text-gray-900 border-2 border-black">
          {category}
        </span>
      </div>

      <!-- Title -->
      <h3 class="font-heading text-xl font-bold mb-3 group-hover:text-yellow-500 transition-colors">
        {title}
      </h3>

      <!-- Problem excerpt -->
      <p class="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
        {excerpt}
      </p>
    </div>
  </a>
</article>
```

**Source:** Extends Phase 8 Card pattern, neobrutalist styling from Phase 7 design system

### Individual Project Page (Case Study Layout)

```astro
---
// src/pages/projects/[slug].astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import projects from '../../data/projects.json';

export function getStaticPaths() {
  return projects.map((project) => ({
    params: { slug: project.slug },
    props: { project },
  }));
}

const { project } = Astro.props;
---

<BaseLayout title={`${project.title} - Case Study | Joel Shinness`} description={project.problem}>
  <article class="py-16 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Back navigation -->
      <nav class="mb-8">
        <a
          href="/projects"
          class="text-turquoise hover:text-turquoise-dark flex items-center gap-2 transition-colors"
        >
          ← Back to Projects
        </a>
      </nav>

      <!-- Header -->
      <header class="mb-12">
        <h1 class="font-heading text-4xl md:text-5xl font-bold mb-4 uppercase">
          {project.title}
        </h1>
        <span class="inline-block px-4 py-2 text-sm font-bold rounded-full bg-yellow-300 text-gray-900 border-3 border-black">
          {project.categoryLabel}
        </span>
      </header>

      <!-- Problem section -->
      <section class="mb-12">
        <h2 class="font-heading text-2xl md:text-3xl font-bold mb-4 border-l-4 border-yellow-400 pl-4">
          The Challenge
        </h2>
        <p class="text-lg leading-relaxed">
          {project.problem}
        </p>
      </section>

      <!-- Solution section -->
      <section class="mb-12">
        <h2 class="font-heading text-2xl md:text-3xl font-bold mb-4 border-l-4 border-turquoise pl-4">
          The Solution
        </h2>
        <p class="text-lg leading-relaxed">
          {project.solution}
        </p>
      </section>

      <!-- Results section (neobrutalist accent box) -->
      <section class="mb-12">
        <div class="bg-yellow-100 dark:bg-yellow-900/20 border-4 border-black dark:border-yellow-500 p-8 rounded-lg shadow-neo-yellow">
          <h2 class="font-heading text-2xl md:text-3xl font-bold mb-6 uppercase">
            Results
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.results.map((result) => (
              <div class="text-center">
                <div class="text-5xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                  {result.metric}
                </div>
                <div class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {result.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <!-- Testimonial (if exists) -->
      {project.testimonial && (
        <section class="mb-12">
          <blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-6 italic text-lg">
            <p class="mb-4">"{project.testimonial.quote}"</p>
            <footer class="text-sm text-gray-600 dark:text-gray-400 not-italic">
              — {project.testimonial.author}, {project.testimonial.role}
            </footer>
          </blockquote>
        </section>
      )}

      <!-- Technologies -->
      <section class="mb-12">
        <h2 class="font-heading text-2xl font-bold mb-4">
          Built With
        </h2>
        <div class="flex flex-wrap gap-3">
          {project.technologies.map((tech) => (
            <span class="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm border-2 border-black dark:border-white">
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  </article>
</BaseLayout>
```

**Source:** Case study structure from [UX Case Study Template 2026](https://blog.uxfol.io/ux-case-study-template/)

### Astro Config with Redirects

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  site: 'https://joelshinness.com',

  // 301 redirects for portfolio → projects rename
  redirects: {
    '/portfolio': '/projects',
    '/portfolio/[slug]': '/projects/[slug]'
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    expressiveCode(),
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    robotsTxt({
      sitemap: true,
      policy: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    }),
  ],
});
```

**Source:** [Astro Routing Documentation](https://docs.astro.build/en/guides/routing/)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual margin spacing on cards | CSS `gap` property | CSS Grid Level 1 (2017), widespread adoption by 2024 | Cleaner markup, automatic edge case handling, responsive-friendly |
| Custom redirect logic | Astro `redirects` config | Astro 2.0 (2023) | Declarative, build-time compilation, supports dynamic routes |
| Manual frontmatter validation | Content Collections + Zod | Astro 2.0 (2023), enhanced in 5.0 (2025) | Type safety, build-time errors, 5x faster builds in Astro 5 |
| Uniform brutalist styling everywhere | Two-tier typography (bold headings + clean body) | 2024-2026 neobrutalist maturity | Better readability, accessibility, professional appearance |
| Feature-list projects | Problem-Solution-Results case studies | 2020s UX portfolio evolution | Storytelling > technical specs, demonstrates impact |

**Deprecated/outdated:**
- **Manual margin-based card grids:** CSS `gap` is standard. Using margins requires complex selectors (`:not(:last-child)`) and breaks with dynamic content.
- **Client-side redirects with JavaScript:** Astro config redirects compile to HTML meta refresh, functionally equivalent without JavaScript dependency.
- **Manual tag page generation:** Astro's `getStaticPaths()` with Content Collections handles this automatically and efficiently.

## Open Questions

Things that couldn't be fully resolved:

1. **Optimal card grid gap for mobile vs desktop**
   - What we know: 24px (gap-6) is standard for desktop card grids
   - What's unclear: Whether mobile viewports benefit from tighter spacing (16px) to fit more content
   - Recommendation: Start with uniform gap-6 across breakpoints. Test on mobile - if cards feel too sparse, use `gap-4 md:gap-6` for responsive gap.

2. **Case study testimonial placement**
   - What we know: Testimonials add social proof and human element
   - What's unclear: Best placement - after Results section, in sidebar, or interspersed throughout
   - Recommendation: Place after Results section (reinforces impact). Test A/B placement if conversion tracking available.

3. **Project category taxonomy depth**
   - What we know: Current projects use simple categories ("Web Apps", "Automation")
   - What's unclear: Whether multi-level categories (e.g., "Web Apps > E-commerce") provide value or complexity
   - Recommendation: Start with single-level categories. Add sub-categories only if project count exceeds 15 and filtering becomes necessary.

4. **Blog card image aspect ratio**
   - What we know: 16:9 is current standard, matches video/screen content
   - What's unclear: Whether 4:3 or 3:2 provides better visual rhythm in card grids
   - Recommendation: Keep 16:9 for consistency with project cards and modern content. Change only if visual testing shows clear improvement.

5. **Reading time accuracy expectations**
   - What we know: `reading-time-estimator` uses 265 WPM default
   - What's unclear: Whether technical blog content (code examples, diagrams) needs adjusted WPM rate
   - Recommendation: Current 265 WPM is reasonable. Monitor user feedback - if reading times feel inaccurate, adjust to 200 WPM for technical content.

## Sources

### Primary (HIGH confidence)
- [Astro Routing Documentation](https://docs.astro.build/en/guides/routing/) - Official redirect configuration
- [Neobrutalism Typography Best Practices - NN/G](https://www.nngroup.com/articles/neobrutalism/) - Two-tier typography approach
- [Astro Content Collections 2026 Guide](https://inhaq.com/blog/getting-started-with-astro-content-collections.html) - Zod validation patterns
- [CSS Gap Best Practices 2026](https://thelinuxcode.com/the-css-gap-property-practical-spacing-for-grid-flexbox-and-modern-responsive-ui/) - Grid spacing standards
- [UX Case Study Template 2026](https://blog.uxfol.io/ux-case-study-template/) - Problem-Solution-Results structure

### Secondary (MEDIUM confidence)
- [Astro SSG Redirects on GitHub Pages](https://puf.io/posts/astro-ssg-redirects/) - HTML meta refresh behavior
- [Case Study Storytelling - Indeed Design](https://indeed.design/article/the-art-of-storytelling-for-case-studies/) - Narrative techniques
- [Neobrutalist Fonts Guide](https://blog.kristi.digital/p/my-favourite-fonts-for-neobrutalist-web-design) - Typography recommendations
- [Tailwind Gap Utility Guide](https://tailkits.com/blog/tailwind-gap-utility-guide/) - Responsive gap patterns
- [Astro Dynamic Routes Guide](https://www.rainsberger.ca/blog/dynamic-routing-tag-pages-in-astro/) - getStaticPaths patterns

### Tertiary (LOW confidence - needs validation)
- WebSearch results for "neobrutalist blog readability 2026" - General principles but need user testing
- WebSearch results for "portfolio case study best practices 2026" - Multiple sources agree on Problem-Solution-Results but implementation varies
- Various blog posts on card grid layouts - Consensus on gap property but specific values vary by use case

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Astro features and existing Phase 8 components verified via official docs and project inspection
- Architecture: HIGH - Routing, Content Collections, and grid patterns verified via official Astro documentation
- Pitfalls: MEDIUM-HIGH - Density issues verified via NN/G research, redirect limitations documented in community guides, accessibility patterns from WCAG standards
- Code examples: HIGH - Based on existing project patterns (BlogCard, projects.json structure) and verified Astro techniques

**Research date:** 2026-02-09
**Valid until:** Approximately 90 days (May 2026) - Astro 5.x is stable, CSS Grid is mature standard, Content Collections API is finalized. Neobrutalist design patterns may evolve but core readability principles remain constant. Case study structure is timeless UX pattern.

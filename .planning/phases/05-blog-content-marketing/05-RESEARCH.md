# Phase 5: Blog & Content Marketing - Research

**Researched:** 2026-01-27
**Domain:** Astro content collections, MDX processing, blog architecture
**Confidence:** HIGH

## Summary

Phase 5 implements a blog using Astro's Content Layer API (v5.0+) with MDX support for rich content authoring. The standard stack centers on Astro's built-in content collections with Zod schema validation, Expressive Code for syntax highlighting with copy buttons, and vanilla JavaScript for filtering (matching the existing portfolio pattern from Phase 4).

Astro 5.0 introduced the Content Layer API, a complete rewrite of content collections that delivers 5x faster Markdown builds, 2x faster MDX, and 25-50% less memory usage compared to previous versions. The loader-based approach replaces the old `type: "content"` declaration with `loader: glob()` patterns, and the config file moved from `src/content/config.ts` to `src/content.config.ts`.

The architecture follows established content marketing patterns: narrow reading width (65ch is optimal per typography research), sticky TOC with Intersection Observer for section highlighting, tag-based filtering with dedicated tag pages for SEO, and "load more" pagination for progressive content disclosure.

**Primary recommendation:** Use Astro's built-in content collections with the Content Layer API, add Expressive Code integration for code blocks (includes copy button and language labels by default), implement sticky TOC with Intersection Observer, and reuse the portfolio's vanilla JS filtering pattern for category tags.

## Standard Stack

The established libraries/tools for Astro blog implementation:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro Content Collections | 5.0+ | Type-safe content management | Built into Astro, provides schema validation, auto-generated types, performance optimized |
| @astrojs/mdx | Latest | MDX processing | Official Astro integration, enables React components in Markdown |
| Zod | Latest | Schema validation | Required for content collections, provides type safety and frontmatter validation |
| astro-expressive-code | 0.41+ | Syntax highlighting | Zero-dependency, includes copy buttons, language labels, VS Code themes, terminal frames |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| reading-time-estimator | Latest | Calculate reading time | Simple word count calculation, supports multiple languages |
| github-slugger | Built-in | Generate heading IDs | Astro uses this internally for heading slugs, no install needed |
| Intersection Observer API | Native | TOC active section tracking | Browser API, no library needed, excellent support |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Expressive Code | Shiki + custom components | Manual work for copy buttons, language labels; Shiki is lower-level |
| Expressive Code | Prism + custom CSS | Requires manual styling, no built-in features, older approach |
| Content Collections | File-based routing only | Lose type safety, schema validation, performance gains |
| Zod schemas | Runtime validation | Schema validation at build time catches errors earlier |

**Installation:**
```bash
# MDX integration (if not already installed)
npx astro add mdx

# Expressive Code (must come BEFORE mdx in integrations array)
npx astro add astro-expressive-code

# Reading time calculation (optional helper)
npm install reading-time-estimator
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── content/
│   └── blog/               # Blog post MDX files
│       ├── post-1.mdx
│       ├── post-2.mdx
│       └── images/         # Post-specific images (relative paths)
├── content.config.ts       # Collection schemas (NEW location in Astro 5)
├── pages/
│   ├── blog/
│   │   ├── index.astro     # Blog listing page
│   │   ├── [slug].astro    # Individual post pages
│   │   └── tags/
│   │       └── [tag].astro # Tag-specific listing pages
│   └── ...
├── components/
│   ├── BlogCard.astro      # Reusable blog card component
│   ├── BlogPost.astro      # Post layout wrapper
│   ├── TableOfContents.astro
│   └── LoadMoreButton.astro
└── layouts/
    └── BlogLayout.astro    # Reading experience layout
```

### Pattern 1: Content Collections with Content Layer API (Astro 5.0+)

**What:** Define blog collection with loader-based schema in `src/content.config.ts`

**When to use:** All blog implementations in Astro 5.0+

**Example:**
```typescript
// Source: https://docs.astro.build/en/guides/content-collections/
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    featuredImage: z.string(), // Required per user decisions
    tags: z.array(z.string()).default([]), // Open-ended tags, multiple allowed
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

**CRITICAL:** Always run `npx astro sync` after schema changes to regenerate TypeScript types.

### Pattern 2: Dynamic Tag Pages with getStaticPaths

**What:** Generate individual pages for each tag (e.g., `/blog/tags/ai`)

**When to use:** When implementing tag filtering with SEO-friendly URLs

**Example:**
```typescript
// Source: https://docs.astro.build/en/guides/routing/
// File: src/pages/blog/tags/[tag].astro
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const allPosts = await getCollection('blog', ({ data }) => !data.draft);

  // Get unique tags
  const uniqueTags = [...new Set(allPosts.flatMap(post => post.data.tags))];

  return uniqueTags.map(tag => ({
    params: { tag },
    props: {
      posts: allPosts.filter(post => post.data.tags.includes(tag))
    }
  }));
}

const { tag } = Astro.params;
const { posts } = Astro.props;
```

### Pattern 3: Sticky TOC with Intersection Observer

**What:** Table of contents that highlights current section as user scrolls

**When to use:** Long-form blog posts with multiple sections

**Example:**
```javascript
// Source: https://css-tricks.com/table-of-contents-with-intersectionobserver/
const headings = document.querySelectorAll('article h2, article h3');
const tocLinks = document.querySelectorAll('.toc a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const tocLink = document.querySelector(`.toc a[href="#${id}"]`);

      if (entry.isIntersecting) {
        tocLinks.forEach(link => link.classList.remove('active'));
        tocLink?.classList.add('active');
      }
    });
  },
  { rootMargin: '-80px 0px -80% 0px' } // Trigger when heading is near top
);

headings.forEach(heading => observer.observe(heading));
```

**CSS:**
```css
.toc {
  position: sticky;
  top: 6rem; /* Below fixed header */
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
}

.toc a.active {
  font-weight: 600;
  color: var(--color-accent);
}
```

### Pattern 4: Load More Button (Progressive Disclosure)

**What:** Display subset of posts initially, reveal more on button click

**When to use:** Blog listing pages with many posts

**Example:**
```javascript
// Client-side vanilla JS (matching portfolio pattern)
const INITIAL_COUNT = 9; // Show 9 posts initially
const LOAD_MORE_COUNT = 6; // Load 6 more each click

let currentCount = INITIAL_COUNT;
const allCards = document.querySelectorAll('.blog-card');
const loadMoreBtn = document.querySelector('#load-more');

// Initially hide cards beyond INITIAL_COUNT
allCards.forEach((card, index) => {
  card.style.display = index < INITIAL_COUNT ? 'block' : 'none';
});

loadMoreBtn?.addEventListener('click', () => {
  const nextCount = currentCount + LOAD_MORE_COUNT;

  allCards.forEach((card, index) => {
    if (index < nextCount) {
      card.style.display = 'block';
    }
  });

  currentCount = nextCount;

  // Hide button if all cards shown
  if (currentCount >= allCards.length) {
    loadMoreBtn.style.display = 'none';
  }
});
```

### Pattern 5: Reading Time Calculation

**What:** Display estimated reading time on cards and post headers

**When to use:** All blog posts

**Example:**
```typescript
// Simple implementation - 265 WPM (Medium's standard)
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 265;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Or use reading-time-estimator package
import { readingTime } from 'reading-time-estimator';

const stats = readingTime(content, 265); // { minutes: 5, words: 1325 }
```

### Pattern 6: Excerpt Auto-Generation

**What:** Extract first ~160 characters from post body for previews

**When to use:** Blog listing cards

**Example:**
```typescript
function generateExcerpt(content: string, maxLength: number = 160): string {
  // Strip markdown/HTML, get plain text
  const plainText = content
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
    .replace(/<[^>]+>/g, '') // Remove HTML
    .replace(/[#*_]/g, '') // Remove markdown formatting
    .trim();

  if (plainText.length <= maxLength) return plainText;

  // Cut at word boundary
  const truncated = plainText.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return truncated.slice(0, lastSpace) + '...';
}
```

### Anti-Patterns to Avoid

- **Don't query collections on every render:** Use `getStaticPaths()` to generate pages at build time, not runtime
- **Don't skip schema validation:** Always define schemas; they catch errors before deployment
- **Don't use `client:load` on TOC:** Use `client:visible` or vanilla JS to avoid unnecessary hydration
- **Don't hand-code slug generation:** Use Astro's built-in `slug` from collection entries
- **Don't put images in `public/`:** Use `src/` for local images so Astro can optimize them
- **Don't forget to run `astro sync`:** Type errors will cascade without regenerated types

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Syntax highlighting | Custom code parser | Expressive Code or Shiki | Copy buttons, language detection, VS Code themes, accessibility, line highlighting built-in |
| Content validation | Manual frontmatter checks | Zod schemas via content collections | Build-time validation, auto-generated TypeScript types, clear error messages |
| Image optimization | Manual resize/format | Astro `<Image />` component | Automatic optimization, format conversion, lazy loading, prevents layout shift |
| Heading ID generation | Custom slugify function | Astro built-in (github-slugger) | Consistent with TOC, auto-applied, handles duplicates |
| Reading time | Custom word counter | reading-time-estimator package | Handles multiple languages, tested edge cases, configurable WPM |
| Excerpt generation from MDX | Regex-based extraction | Use description in frontmatter OR strip-markdown package | MDX components make regex unreliable; frontmatter is explicit |

**Key insight:** Astro's content collections and MDX integration handle 90% of blog needs out-of-the-box. The remaining 10% (filtering, TOC, load more) are simple enough for vanilla JS and don't justify framework dependencies.

## Common Pitfalls

### Pitfall 1: Config File Location Confusion (Astro 4 vs 5)

**What goes wrong:** Developers put content config in `src/content/config.ts` (Astro 4 location) instead of `src/content.config.ts` (Astro 5 location), causing collection definitions not to load.

**Why it happens:** Astro 5.0 changed the config file location as part of the Content Layer API rewrite. Documentation and tutorials written for Astro 4 still reference the old location.

**How to avoid:** Use `src/content.config.ts` (root of `src/`) for Astro 5.0+. The migration guide explicitly states this change.

**Warning signs:** Collections not appearing in IntelliSense, `getCollection()` errors, TypeScript types not generating.

### Pitfall 2: Forgetting to Run `astro sync` After Schema Changes

**What goes wrong:** Schema changes don't reflect in TypeScript types, causing type errors or missing IntelliSense for new fields.

**Why it happens:** Content collections generate `.astro/types.d.ts` only when `astro sync` runs. Developers modify schemas and expect instant updates.

**How to avoid:** Run `npx astro sync` after every schema change. Add it to your development workflow.

**Warning signs:** TypeScript errors for valid frontmatter fields, IntelliSense not showing new schema properties, outdated type definitions.

### Pitfall 3: Integration Order - Expressive Code Must Come Before MDX

**What goes wrong:** Code blocks don't get Expressive Code features (copy button, syntax highlighting) if `mdx()` processes files before `expressiveCode()`.

**Why it happens:** Integrations process in array order. MDX needs to receive already-processed code blocks from Expressive Code.

**How to avoid:** In `astro.config.mjs`, always place `expressiveCode()` before `mdx()` in the integrations array.

**Warning signs:** Code blocks render but lack copy buttons, language labels missing, default Shiki styling instead of Expressive Code themes.

```javascript
// CORRECT
integrations: [expressiveCode(), mdx()]

// WRONG
integrations: [mdx(), expressiveCode()]
```

### Pitfall 4: Schema Validation Errors Don't Surface in `astro check`

**What goes wrong:** Silent failures during `astro check` when schema validation errors exist. Developers think types are valid but build fails.

**Why it happens:** Known bug in Astro tooling (Issue #12724) where `astro check` exits silently without reporting collection schema errors.

**How to avoid:** Run `astro sync` explicitly to surface schema validation errors before running `astro check` or building.

**Warning signs:** Build fails with cryptic errors, `astro check` passes but build doesn't, frontmatter errors not caught in development.

### Pitfall 5: Using Enums for Tags (Too Restrictive)

**What goes wrong:** Defining tags as `z.enum(['ai', 'design', 'code'])` locks you into predefined tags, making it impossible to add new tags without schema updates.

**Why it happens:** Developers want validation but apply it too strictly. Per user decisions, tags should be "open-ended" and "free-form per post."

**How to avoid:** Use `z.array(z.string())` for tags, not enums. Trust content authors to use consistent naming.

**Warning signs:** Schema validation errors when adding new tags, inability to experiment with new categories, build failures for typos.

### Pitfall 6: Image Paths in Content Collections

**What goes wrong:** Using absolute paths like `/images/post.jpg` instead of relative paths, breaking Astro's image optimization.

**Why it happens:** Developers familiar with `public/` directory patterns apply same logic to content collections.

**How to avoid:** Store images in `src/content/blog/images/` and reference with relative paths: `./images/post.jpg`. Use `image()` helper in schema for validation.

**Warning signs:** Images don't optimize, no automatic format conversion, layout shift on page load.

```typescript
// CORRECT
schema: z.object({
  featuredImage: z.string(), // Relative path: ./images/hero.jpg
})

// Alternative with validation
import { image } from 'astro:content';
schema: z.object({
  featuredImage: image(), // Validates image exists and provides optimization
})
```

### Pitfall 7: Massive Memory Usage with Too Many MDX Files

**What goes wrong:** Build process crashes or slows to a crawl when compiling hundreds of MDX files simultaneously.

**Why it happens:** Bundlers aren't designed to compile hundreds of MDX files at once. Memory usage scales poorly.

**How to avoid:**
- Use on-demand compilation with SSG (Astro renders pages individually)
- Keep MDX file count reasonable (< 100 for optimal performance)
- Consider splitting content across multiple collections
- Enable MDX `optimize` option for large sites

**Warning signs:** Build taking 5+ minutes, memory errors during build, development server sluggish.

### Pitfall 8: Not Filtering Draft Posts in Production

**What goes wrong:** Draft posts appear on production site, leaking unfinished content.

**Why it happens:** Forgetting to filter `draft: true` posts when querying collections.

**How to avoid:** Always filter in production:

```typescript
const publishedPosts = await getCollection('blog', ({ data }) => {
  return import.meta.env.PROD ? !data.draft : true;
});
```

**Warning signs:** Incomplete posts visible on live site, embarrassing content exposure.

## Code Examples

Verified patterns from official sources:

### Querying Content Collections (Astro 5.0+)

```typescript
// Source: https://docs.astro.build/en/guides/content-collections/
---
import { getCollection } from 'astro:content';

// Get all blog posts, filter drafts in production
const allPosts = await getCollection('blog', ({ data }) => {
  return import.meta.env.PROD ? !data.draft : true;
});

// Sort by date, newest first
const sortedPosts = allPosts.sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
---
```

### Rendering MDX with Custom Components

```astro
// Source: https://docs.astro.build/en/guides/integrations-guide/mdx/
---
import { getEntry } from 'astro:content';
import CustomHeading from '../components/CustomHeading.astro';
import CodeBlock from '../components/CodeBlock.astro';

const entry = await getEntry('blog', 'my-post');
const { Content, headings } = await entry.render();
---

<Content
  components={{
    h1: CustomHeading,
    pre: CodeBlock,
  }}
/>
```

### Getting Headings for TOC

```astro
// Source: https://docs.astro.build/en/guides/markdown-content/
---
import { getEntry } from 'astro:content';

const post = await getEntry('blog', Astro.params.slug);
const { Content, headings } = await post.render();

// headings: { depth: number; slug: string; text: string }[]
// Build nested TOC structure from flat array
const toc = headings.filter(h => h.depth <= 3); // Only show h2 and h3
---

<aside class="toc">
  <nav>
    <ul>
      {toc.map(heading => (
        <li class={`toc-${heading.depth}`}>
          <a href={`#${heading.slug}`}>{heading.text}</a>
        </li>
      ))}
    </ul>
  </nav>
</aside>
```

### Tag Filtering with Client-Side JavaScript

```javascript
// Reuse portfolio pattern - vanilla JS, no dependencies
const filterButtons = document.querySelectorAll('[data-tag]');
const blogCards = document.querySelectorAll('.blog-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedTag = button.dataset.tag;

    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Filter cards
    blogCards.forEach(card => {
      const cardTags = card.dataset.tags.split(',');
      const shouldShow = selectedTag === 'all' || cardTags.includes(selectedTag);

      // Use CSS animations (per user decision)
      if (shouldShow) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.3s ease-out';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
```

### Featured Image in Frontmatter

```mdx
---
title: "My Blog Post"
description: "Post description"
pubDate: 2026-01-27
featuredImage: ./images/hero.jpg  # Relative path from content file
tags: ["astro", "web-dev"]
---

Content here...
```

```astro
---
// In blog card component
import { Image } from 'astro:assets';

const { post } = Astro.props;
const imagePath = `/src/content/blog/${post.slug}/${post.data.featuredImage}`;
---

<div class="blog-card">
  <Image
    src={post.data.featuredImage}
    alt={post.data.title}
    width={600}
    height={400}
    loading="lazy"
  />
  <h3>{post.data.title}</h3>
  <p>{post.data.description}</p>
</div>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `src/content/config.ts` | `src/content.config.ts` | Astro 5.0 (Oct 2024) | Config file moved to root of `src/`, easier to find |
| `type: 'content'` | `loader: glob()` | Astro 5.0 (Oct 2024) | Loader-based API, content can live anywhere, not just `src/content/` |
| Pre-compile all MDX | On-demand compilation | Astro 5.0 (Oct 2024) | 5x faster Markdown, 2x faster MDX, 25-50% less memory |
| Shiki + manual features | Expressive Code | 2023-2024 | Copy buttons, language labels, frames built-in |
| Remark plugins for features | Built-in Astro features | Astro 3.0+ | Image optimization, heading IDs, syntax highlighting included |
| Manual image optimization | `<Image />` component | Astro 3.0 (Aug 2023) | Automatic optimization, lazy loading, format conversion |

**Deprecated/outdated:**
- **Collections API v2.0:** Legacy approach still works but Astro docs recommend migrating to Content Layer API
- **Prism for syntax highlighting:** Still supported but Shiki is default; Expressive Code is recommended for advanced features
- **MDX custom components via `components` export:** Still works but `render()` with components prop is cleaner
- **Image fields as strings without validation:** Use `image()` helper in schema for type-safe image paths

## Open Questions

Things that couldn't be fully resolved:

1. **Optimal batch size for "load more" button**
   - What we know: Common patterns show 6-12 items per load
   - What's unclear: Performance impact on filtering when hundreds of cards are in DOM but hidden
   - Recommendation: Start with initial 9 cards, load 6 more per click. Monitor DOM size and filter performance.

2. **Syntax highlighting theme for dark mode**
   - What we know: Expressive Code supports dual themes (light/dark) like Shiki
   - What's unclear: Which specific theme aligns with user's OKLCH color system
   - Recommendation: Start with `github-dark` (default), customize colors via CSS variables if needed. Expressive Code themes are customizable.

3. **TOC display breakpoint**
   - What we know: Sticky sidebar TOC works best on desktop (1024px+)
   - What's unclear: Mobile fallback pattern (inline TOC? Dropdown? Skip entirely?)
   - Recommendation: Show sticky TOC at 1024px+, hide on mobile or show inline TOC at top of article on tablet/mobile.

## Sources

### Primary (HIGH confidence)
- [Astro Content Collections Documentation](https://docs.astro.build/en/guides/content-collections/) - Content Layer API, loader syntax, schema validation
- [Astro MDX Integration Documentation](https://docs.astro.build/en/guides/integrations-guide/mdx/) - MDX setup, custom components, configuration
- [Astro Syntax Highlighting Documentation](https://docs.astro.build/en/guides/syntax-highlighting/) - Shiki and Prism configuration
- [Astro Markdown Documentation](https://docs.astro.build/en/guides/markdown-content/) - getHeadings() function, heading properties
- [Astro Routing Documentation](https://docs.astro.build/en/guides/routing/) - Dynamic routes, getStaticPaths()
- [Expressive Code Official Site](https://expressive-code.com/) - Features, installation, integration details

### Secondary (MEDIUM confidence)
- [Astro Content Collections: The Complete Guide (2026)](https://inhaq.com/blog/getting-started-with-astro-content-collections/) - Astro 5.0 changes, best practices
- [CSS-Tricks: Table of Contents with IntersectionObserver](https://css-tricks.com/table-of-contents-with-intersectionobserver/) - TOC implementation pattern
- [CSS-Tricks: Sticky Table of Contents with Scrolling Active States](https://css-tricks.com/sticky-table-of-contents-with-scrolling-active-states/) - Sticky positioning with Intersection Observer
- [Hygraph: Lazy Load Content with Astro Pagination](https://hygraph.com/blog/lazy-load-content-astro-hygraph-pagination) - Load more button pattern
- [Creating Individual Tag Pages in Astro via Dynamic Routes](https://www.rainsberger.ca/blog/dynamic-routing-tag-pages-in-astro/) - Tag page implementation
- [Baymard: Readability - The Optimal Line Length](https://baymard.com/blog/line-length-readability) - 50-75 characters (65ch) research
- [UXPin: Optimal Line Length for Readability](https://www.uxpin.com/studio/blog/optimal-line-length-for-readability/) - Typography best practices
- [Astro Images Documentation](https://docs.astro.build/en/guides/images/) - Image optimization, featured images

### Tertiary (LOW confidence)
- [MDX Performance Optimization](https://www.fumadocs.dev/docs/mdx/performance) - Build time optimization strategies
- [Calculate Reading Time (DEV Community)](https://dev.to/michaelburrows/calculate-the-estimated-reading-time-of-an-article-using-javascript-2k9l) - Reading time implementation examples

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official Astro documentation and integrations, verified with Content Layer API changes
- Architecture: HIGH - Patterns from official docs and established community practices
- Pitfalls: HIGH - Verified from official error documentation, GitHub issues, and multiple community sources

**Research date:** 2026-01-27
**Valid until:** ~2026-02-27 (30 days - Astro is stable, but v6 expected early 2026)

**Notes:**
- Astro 6 beta is available; early 2026 release expected with redesigned dev server and performance improvements
- Content Layer API is current as of Astro 5.0+; legacy v2.0 collections API still works but migration recommended
- All code examples tested against Astro 5.0+ documentation
- User decisions from CONTEXT.md successfully integrated (narrow reading width, sticky TOC, tag filtering, featured images required)

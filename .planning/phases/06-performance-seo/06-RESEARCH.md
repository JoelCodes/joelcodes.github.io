# Phase 6: Performance & SEO - Research

**Researched:** 2026-01-27
**Domain:** Web Performance Optimization, SEO, and CI/CD Deployment
**Confidence:** HIGH

## Summary

This phase focuses on optimizing the Astro site for performance and search engine discoverability, then automating deployment to GitHub Pages with performance enforcement. The research covers image optimization with WebP/JPEG fallbacks, responsive images, SEO meta tags with JSON-LD structured data, sitemap/robots.txt generation, Lighthouse CI integration for performance budgeting, and GitHub Actions deployment workflows.

Astro provides robust built-in support for image optimization through its `<Image />` and `<Picture />` components, with automatic WebP conversion, responsive srcset generation, and lazy loading. For SEO, the `@astrojs/sitemap` integration handles sitemap generation, while several community packages (like `astro-seo`) simplify meta tag management. GitHub Actions deployment is streamlined via Astro's official `withastro/action@v5`, and Lighthouse CI can enforce performance budgets with configurable assertions.

The user has locked in key decisions: WebP with JPEG fallback (no AVIF), native lazy loading, 80% quality setting, responsive srcset for multiple viewports, critical CSS inlining, font preloading, and a Lighthouse score threshold of 90+ on mobile enforced in CI.

**Primary recommendation:** Use Astro's built-in image optimization components with quality=80, implement `astro-seo` for meta tags with JSON-LD, configure `@astrojs/sitemap` and `astro-robots-txt` for search engine discovery, set up Lighthouse CI with `treosh/lighthouse-ci-action` to block deploys below 90 score, and deploy via `withastro/action@v5` to GitHub Pages.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro `<Image />` / `<Picture />` | Built-in | Image optimization with WebP conversion, responsive srcset, lazy loading | Official Astro components with Sharp image service, automatic format conversion and responsive generation |
| `@astrojs/sitemap` | Latest | Automatic sitemap.xml generation | Official Astro integration, auto-generates sitemap-index.xml and numbered sitemaps |
| `astro-seo` | Latest | SEO meta tags component | Community standard for simplifying meta tag management in Astro |
| `astro-robots-txt` | Latest | robots.txt generation | Popular package that auto-syncs sitemap location with robots.txt |
| Lighthouse CI | `@lhci/cli@0.15.x` | Performance testing and regression prevention | Official Google Chrome tool for automated performance auditing in CI |
| `withastro/action` | v5 | GitHub Pages deployment | Official Astro GitHub Action, auto-detects package manager and Node version |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `treosh/lighthouse-ci-action` | Latest | GitHub Actions Lighthouse integration | Simpler than official LHCI for basic assertion workflows |
| `astro-seo-schema` | Latest | JSON-LD structured data generation | Typed schema generation with TypeScript support |
| `astro-critical-css` | Latest | Critical CSS extraction and inlining | Automated critical CSS during build (integrates with Critical package) |
| `rossjrw/pr-preview-action` | Latest | PR preview deployments to GitHub Pages | Similar to Netlify/Vercel preview deploys, native GitHub Pages |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `astro-seo` | Manual meta tags | Manual gives more control but requires boilerplate in every layout |
| `treosh/lighthouse-ci-action` | Official `@lhci/cli` directly | Official LHCI offers more features (server, historical tracking) but more complex setup |
| `astro-robots-txt` | Static `public/robots.txt` | Static file is simpler but requires manual updates when sitemap location changes |
| GitHub Pages | Netlify/Vercel | Commercial hosts offer more features (edge functions, forms) but GitHub Pages is free and simpler |

**Installation:**
```bash
npm install @astrojs/sitemap astro-seo astro-robots-txt astro-seo-schema
npm install --save-dev @lhci/cli
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   └── SEO.astro          # Reusable SEO component with meta tags
├── layouts/
│   └── BaseLayout.astro   # Include SEO component in head
├── images/                # Source images (auto-optimized by Astro)
└── pages/
    └── robots.txt.ts      # Optional: dynamic robots.txt endpoint

public/
├── og-image.jpg           # Static OpenGraph image (1200x630)
└── CNAME                  # Optional: custom domain configuration

.github/
└── workflows/
    ├── deploy.yml         # Production deploy on main branch push
    └── pr-preview.yml     # PR preview deploys

lighthouserc.json          # Lighthouse CI assertions configuration
```

### Pattern 1: Image Optimization with WebP Fallback
**What:** Use Astro's `<Picture />` component to generate WebP with JPEG fallback, responsive srcset
**When to use:** All images except simple icons/SVGs
**Example:**
```astro
---
// Source: https://docs.astro.build/en/guides/images/
import { Picture } from 'astro:assets';
import heroImage from '../images/hero.jpg';
---

<!-- Hero image: eager loading for above-the-fold -->
<Picture
  src={heroImage}
  formats={['webp', 'jpeg']}
  widths={[640, 768, 1024, 1280, 1920]}
  sizes="100vw"
  quality={80}
  alt="Joel Shinness portfolio hero"
  loading="eager"
  fetchpriority="high"
/>

<!-- Portfolio images: lazy loading -->
<Picture
  src={portfolioImage}
  formats={['webp', 'jpeg']}
  widths={[320, 640, 960, 1280]}
  sizes="(min-width: 768px) 50vw, 100vw"
  quality={80}
  alt="Project screenshot"
  loading="lazy"
/>
```

### Pattern 2: SEO Meta Tags Component
**What:** Centralized SEO component with OpenGraph, Twitter Card, and JSON-LD
**When to use:** Include in all layouts
**Example:**
```astro
---
// Source: https://github.com/jonasmerlin/astro-seo
import { SEO } from "astro-seo";

interface Props {
  title: string;
  description: string;
  canonical?: string;
}

const { title, description, canonical } = Astro.props;
const siteUrl = 'https://joelshinness.com';
const fullTitle = `${title} | Joel Shinness`;
---

<SEO
  title={fullTitle}
  description={description}
  canonical={canonical || Astro.url.href}
  openGraph={{
    basic: {
      title: fullTitle,
      type: "website",
      image: `${siteUrl}/og-image.jpg`,
      url: canonical || Astro.url.href,
    },
  }}
  twitter={{
    card: "summary_large_image",
    title: fullTitle,
    description: description,
    image: `${siteUrl}/og-image.jpg`,
  }}
  extend={{
    link: [
      { rel: "icon", href: "/favicon.ico" },
    ],
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }}
/>

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Joel Shinness",
  "url": "https://joelshinness.com",
  "sameAs": [
    "https://www.linkedin.com/in/joelshinness",
    "https://github.com/joelshinness"
  ]
}
</script>
```

### Pattern 3: Lighthouse CI Assertions Configuration
**What:** Configure performance score thresholds to block deploys
**When to use:** In all projects with performance requirements
**Example:**
```json
// lighthouserc.json
// Source: https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "settings": {
        "preset": "desktop",
        "onlyCategories": ["performance", "accessibility", "seo"]
      }
    },
    "assert": {
      "preset": "lighthouse:no-pwa",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["warn", { "minScore": 0.9 }],
        "categories:seo": ["warn", { "minScore": 0.9 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "interaction-to-next-paint": ["error", { "maxNumericValue": 200 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

### Pattern 4: GitHub Actions Deployment with Lighthouse CI
**What:** Deploy to GitHub Pages with performance enforcement
**When to use:** Production deployment workflow
**Example:**
```yaml
# .github/workflows/deploy.yml
# Source: https://docs.astro.build/en/guides/deploy/github/
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: treosh/lighthouse-ci-action@v12
        with:
          configPath: './lighthouserc.json'
          uploadArtifacts: true
          temporaryPublicStorage: true

  build:
    needs: lighthouse
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: withastro/action@v5
        with:
          node-version: 20

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
```

### Pattern 5: Critical CSS Inlining
**What:** Extract and inline above-the-fold CSS to improve First Contentful Paint
**When to use:** After initial CSS implementation, as optimization step
**Example:**
```javascript
// astro.config.mjs
// Source: https://github.com/rumaan/astro-critical-css
import { defineConfig } from 'astro/config';
import criticalCss from 'astro-critical-css';

export default defineConfig({
  integrations: [
    criticalCss({
      // Critical CSS options
      inline: true,
      minify: true,
      extract: true,
      dimensions: [
        { width: 375, height: 667 },   // Mobile
        { width: 1920, height: 1080 }  // Desktop
      ]
    })
  ]
});
```

### Pattern 6: Font Preloading
**What:** Preload critical fonts to prevent FOIT/FOUT and improve LCP
**When to use:** For custom web fonts used in hero/header sections
**Example:**
```astro
---
// In <head> section of BaseLayout.astro
// Source: https://web.dev/articles/font-best-practices
---

<head>
  <!-- Preload critical fonts -->
  <link
    rel="preload"
    href="/fonts/inter-variable.woff2"
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />

  <style>
    @font-face {
      font-family: 'Inter';
      src: url('/fonts/inter-variable.woff2') format('woff2');
      font-display: swap;
      font-weight: 100 900;
    }
  </style>
</head>
```

### Anti-Patterns to Avoid
- **Loading all images eagerly:** Only hero/above-the-fold images should use `loading="eager"`, rest should be lazy
- **Preloading too many fonts:** Preload only critical fonts (1-2 max), others load normally
- **Setting Lighthouse thresholds too high:** Start with current scores, then incrementally improve
- **Ignoring real-user metrics:** Lighthouse uses simulated data; monitor real Core Web Vitals with analytics
- **Inline all CSS:** Only inline critical above-the-fold CSS; load rest asynchronously
- **Missing sizes attribute:** When using srcset with widths, always provide sizes for proper browser selection

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom Sharp scripts, manual WebP conversion | Astro `<Image />` / `<Picture />` | Handles format conversion, responsive srcset, lazy loading, and caching automatically |
| Responsive breakpoints | Manual srcset calculations | Astro `widths` prop or Cloudinary Breakpoints Generator | Optimal breakpoint selection is algorithmic, not intuitive; standard widths: 320, 640, 960, 1280, 1920, 2560 |
| Critical CSS extraction | Manual CSS splitting | `astro-critical-css` or Critters | Complex to identify truly critical CSS; automated tools analyze render paths |
| Sitemap generation | Custom XML generation | `@astrojs/sitemap` | Handles pagination, filtering, changefreq, priority automatically |
| Lighthouse scoring | Manual performance audits | Lighthouse CI in GitHub Actions | Automated regression prevention; manual audits miss incremental degradation |
| Performance budgets | Manual file size checks | Lighthouse CI performance budgets | Holistic approach covering metrics beyond just file size (LCP, CLS, INP) |
| Meta tag management | Manual meta tags in every page | `astro-seo` component | DRY principle; centralized defaults with per-page overrides |
| JSON-LD schema | Hand-written JSON | `astro-seo-schema` | Type-safe schema generation prevents invalid markup |

**Key insight:** Performance optimization involves many interdependent factors (network, parsing, rendering, interaction). Integrated tools like Lighthouse provide holistic measurements that manual approaches miss. Image optimization similarly involves format selection, quality tuning, responsive sizing, and lazy loading—all handled by Astro's built-in components.

## Common Pitfalls

### Pitfall 1: Lighthouse Score Gaming vs. Real Performance
**What goes wrong:** Perfect Lighthouse scores but poor real-user experience
**Why it happens:** Lighthouse uses simulated throttling and synthetic tests; doesn't reflect real network variance, device diversity, or user interaction patterns
**How to avoid:**
- Treat Lighthouse as development baseline, not production metric
- Monitor real Core Web Vitals with RUM (Real User Monitoring) via analytics
- Test on actual devices with real network conditions
- Focus on Core Web Vitals thresholds: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1
**Warning signs:** Lighthouse 100 score but users report slow loading; good lab metrics but poor field data in Search Console

### Pitfall 2: Over-Preloading Resources
**What goes wrong:** Preloading fonts, images, CSS causes bandwidth competition and slows down critical resources
**Why it happens:** Misunderstanding preload priority—preload steals bandwidth from parser-discovered resources
**How to avoid:**
- Preload only 1-2 critical fonts (fonts used in hero/header sections)
- Never preload more than 2-3 resources total
- Consider `font-display: swap` instead of preloading
- Monitor for "preload not used within a few seconds" warnings
**Warning signs:** Lighthouse warning about unused preloads; LCP regression after adding preloads

### Pitfall 3: Missing or Incorrect sizes Attribute
**What goes wrong:** Browser downloads wrong image size despite correct srcset
**Why it happens:** Without `sizes`, browser defaults to 100vw even if image is smaller
**How to avoid:**
- Always pair `widths` with `sizes` attribute
- Use media queries in sizes: `(min-width: 768px) 50vw, 100vw`
- Test with DevTools to verify correct source selected
- Use Astro's `layout` prop to auto-generate sizes
**Warning signs:** Large images loading on mobile despite srcset; wasted bandwidth

### Pitfall 4: Blocking Deploys on Unrealistic Thresholds
**What goes wrong:** All deploys blocked because Lighthouse threshold set too high
**Why it happens:** Setting `minScore: 0.9` without measuring current baseline
**How to avoid:**
- Run Lighthouse locally multiple times to get baseline scores
- Set thresholds slightly above (0.05) current performance
- Incrementally increase thresholds as you optimize
- Use "warn" level for aspirational goals, "error" for regressions
**Warning signs:** CI failures on every deploy; team disabling Lighthouse checks

### Pitfall 5: Layout Shift from Images Without Dimensions
**What goes wrong:** High CLS scores despite optimized images
**Why it happens:** Forgetting to set width/height attributes or using incorrect aspect ratios
**How to avoid:**
- Always specify `width` and `height` on `<Image />` components
- Use Astro's automatic inference with imported images
- Reserve space with aspect-ratio CSS for dynamic images
- Test with "Emulate a focused page" in DevTools to catch layout shifts
**Warning signs:** CLS score >0.1; visible content jumping during page load

### Pitfall 6: Outdated Font Preloads After Font Changes
**What goes wrong:** Loading both old and new fonts, performance regression
**Why it happens:** Preload references in HTML not updated when fonts change
**How to avoid:**
- Document all font preload references
- Check preload URLs match actual font files in build output
- Monitor for unused preload warnings in Lighthouse
- Consider using font subsetting to avoid frequent font file changes
**Warning signs:** Multiple font files loading; Lighthouse "preload not used" warning

### Pitfall 7: Forgetting Canonical URLs
**What goes wrong:** Duplicate content penalties; poor SEO
**Why it happens:** Missing canonical meta tags or incorrect URLs (trailing slashes, http vs https)
**How to avoid:**
- Always set canonical URL in SEO component
- Use site config for domain to avoid hardcoding
- Ensure trailing slash consistency (Astro defaults to no trailing slash)
- Test with Google Search Console for duplicate content issues
**Warning signs:** Same page appearing multiple times in search results; Search Console warnings

## Code Examples

Verified patterns from official sources:

### Responsive Image with Solid Color Placeholder
```astro
---
// Source: https://docs.astro.build/en/guides/images/
import { Picture } from 'astro:assets';
import portfolioImage from '../images/portfolio-item.jpg';
---

<div class="image-wrapper" style="background-color: #e5e5e5;">
  <Picture
    src={portfolioImage}
    formats={['webp', 'jpeg']}
    widths={[320, 640, 960, 1280]}
    sizes="(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 100vw"
    quality={80}
    alt="Portfolio project screenshot"
    loading="lazy"
    class="responsive-image"
  />
</div>

<style>
  .image-wrapper {
    position: relative;
    overflow: hidden;
  }

  .responsive-image {
    width: 100%;
    height: auto;
    display: block;
  }
</style>
```

### Sitemap and Robots.txt Configuration
```javascript
// astro.config.mjs
// Source: https://docs.astro.build/en/guides/integrations-guide/sitemap/
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  site: 'https://joelshinness.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/draft/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    robotsTxt({
      sitemap: true,  // Automatically adds Sitemap: https://joelshinness.com/sitemap-index.xml
      policy: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/draft/', '/admin/'],
        },
      ],
    }),
  ],
});
```

### JSON-LD Person Schema
```astro
---
// Source: https://schema.org/Person
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Joel Shinness",
  "url": "https://joelshinness.com",
  "jobTitle": "Web Developer",
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "University Name"
  },
  "sameAs": [
    "https://www.linkedin.com/in/joelshinness",
    "https://github.com/joelshinness",
    "https://twitter.com/joelshinness"
  ],
  "knowsAbout": ["Web Development", "JavaScript", "React", "Node.js"]
};
---

<script type="application/ld+json" set:html={JSON.stringify(personSchema)} />
```

### PR Preview Deployment Action
```yaml
# .github/workflows/pr-preview.yml
# Source: https://github.com/rossjrw/pr-preview-action
name: Deploy PR Preview

on:
  pull_request:
    types: [opened, synchronize, reopened, closed]

permissions:
  contents: write
  pull-requests: write

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm ci
      - run: npm run build

      - uses: rossjrw/pr-preview-action@v1
        with:
          source-dir: ./dist
          preview-branch: gh-pages
          umbrella-dir: pr-preview
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JPEG/PNG only | WebP with JPEG fallback | 2020-2021 | 30% smaller file sizes; WebP support now >97% browsers |
| Manual srcset | Astro automatic srcset generation | Astro 3.0 (2023) | Eliminated manual calculation errors; responsive by default |
| FID (First Input Delay) | INP (Interaction to Next Paint) | March 2024 | More accurate responsiveness measurement; stricter threshold (200ms vs 100ms) |
| Time to Interactive (TTI) | Removed from Lighthouse | Lighthouse 10 (2023) | TTI was unreliable metric; focus shifted to INP and TBT |
| External CSS files | Critical CSS inline + async rest | 2020-2023 | Faster FCP/LCP by eliminating render-blocking CSS |
| WOFF fonts | WOFF2 | 2016-2020 | 30% better compression; universal browser support |
| `font-display: auto` | `font-display: swap` | 2019-2020 | Prevents FOIT (Flash of Invisible Text); better perceived performance |
| AVIF support push | WebP remains standard | 2023-2024 | AVIF encoding too slow for build times; WebP sufficient for most cases |

**Deprecated/outdated:**
- **AVIF format:** Too slow to encode at build time; marginal file size improvement vs. WebP doesn't justify 5-10x slower builds
- **First Input Delay (FID):** Replaced by INP as Core Web Vital in March 2024; no longer tracked
- **Time to Interactive (TTI):** Removed from Lighthouse 10; use Total Blocking Time (TBT) instead
- **WOFF format:** Use WOFF2 exclusively (30% better compression, universal browser support since 2020)
- **Separate mobile/desktop builds:** Responsive images with srcset handle all viewports in single build

## Open Questions

Things that couldn't be fully resolved:

1. **Optimal placeholder color choice**
   - What we know: Neutral grays (#e5e5e5, #f0f0f0) are standard; some sites use dominant color extraction
   - What's unclear: Whether brand color or gray performs better for Joel's site aesthetics
   - Recommendation: Start with light gray (#e5e5e5), test brand color if gray looks out of place

2. **PR preview implementation: GitHub Pages vs. external service**
   - What we know: `rossjrw/pr-preview-action` provides GitHub Pages PR previews; Netlify/Vercel offer richer features
   - What's unclear: Whether GitHub Pages PR previews are sufficient or if limitations justify external service
   - Recommendation: Start with `pr-preview-action` (free, native to GitHub); migrate to Netlify only if limitations hit

3. **Font subsetting scope**
   - What we know: Subsetting can reduce font files 70-79%; Google Fonts auto-subsets; tools like glyphhanger available
   - What's unclear: What character ranges Joel's site needs (English only? Special symbols? Latin extended?)
   - Recommendation: If using Google Fonts, rely on their auto-subsetting; if self-hosting, subset to English only unless specific need identified

4. **Lighthouse CI run count for stability**
   - What we know: Official docs suggest 3-5 runs; more runs = more stable but slower CI
   - What's unclear: Whether 3 runs sufficient for stable scores or need 5+ for consistency
   - Recommendation: Start with 3 runs (recommended by official examples); increase to 5 if scores vary >5 points between runs

## Sources

### Primary (HIGH confidence)
- [Astro Images Official Guide](https://docs.astro.build/en/guides/images/) - Image optimization features
- [Astro Assets API Reference](https://docs.astro.build/en/reference/modules/astro-assets/) - Image/Picture component API
- [Astro GitHub Pages Deployment](https://docs.astro.build/en/guides/deploy/github/) - Official deployment guide
- [Astro Sitemap Integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/) - Official sitemap package
- [Lighthouse CI GitHub Repository](https://github.com/GoogleChrome/lighthouse-ci) - Official LHCI docs
- [Lighthouse CI Configuration](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md) - Assertions config
- [Web.dev Core Web Vitals](https://web.dev/articles/vitals) - Official Google thresholds
- [Web.dev Font Best Practices](https://web.dev/articles/font-best-practices) - Official font optimization guide

### Secondary (MEDIUM confidence)
- [Complete Guide to Astro SEO Optimization](https://astrojs.dev/articles/astro-seo-optimization/) - Community guide, comprehensive
- [Astro SEO Complete Guide (2025)](https://eastondev.com/blog/en/posts/dev/20251202-astro-seo-complete-guide/) - Recent, detailed meta tag guidance
- [Lighthouse CI Action by Treosh](https://github.com/treosh/lighthouse-ci-action) - Popular GitHub Action wrapper
- [astro-seo GitHub Repository](https://github.com/jonasmerlin/astro-seo) - De facto standard SEO component
- [Responsive Images Best Practices (2025)](https://dev.to/razbakov/responsive-images-best-practices-in-2025-4dlb) - Current guidance
- [JSON-LD for SEO (2026)](https://qtonix.com/blog/how-to-add-json-ld-schema-markup/) - Recent structured data guide
- [OG Image Size Guide (2026)](https://myogimage.com/blog/og-image-size-meta-tags-complete-guide) - Current OpenGraph standards
- [Core Web Vitals 2026 Guide](https://nitropack.io/blog/most-important-core-web-vitals-metrics/) - Current threshold documentation

### Tertiary (LOW confidence - marked for validation)
- [Font subsetting performance impact](https://rovity.io/reduce-web-font-size/) - Specific 70-79% reduction claim needs validation
- [PR Preview Action](https://github.com/rossjrw/pr-preview-action) - Community tool, not battle-tested at scale
- [Skeleton loading color recommendations](https://mobbin.com/glossary/skeleton) - UX best practices, not performance-critical

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official Astro integrations and Google tools well-documented
- Architecture: HIGH - Patterns verified with official documentation and examples
- Pitfalls: MEDIUM - Based on community experience and Lighthouse docs, some anecdotal

**Research date:** 2026-01-27
**Valid until:** 2026-02-27 (30 days - web performance tooling stable, Lighthouse scoring algorithm changes rare)

**User decision constraints applied:**
- WebP format with JPEG fallback (no AVIF) ✓
- Native lazy loading via loading="lazy" ✓
- Solid color placeholder (gray or brand color) ✓
- Responsive images with srcset ✓
- Hero image eager loading ✓
- 80% quality setting ✓
- GitHub Actions on main branch push ✓
- PR preview deploys ✓
- Lighthouse 90+ enforcement ✓
- Node.js 20 LTS ✓
- Critical CSS inlined ✓
- Primary fonts preloaded ✓

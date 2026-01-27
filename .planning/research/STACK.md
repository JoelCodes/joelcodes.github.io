# Stack Research

**Domain:** Developer portfolio/services website (static, GitHub Pages)
**Researched:** 2025-01-26
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Astro | 5.16.15 | Static site generator | **Best-in-class for static sites.** Zero JavaScript by default, 50-70% smaller bundles than React alternatives, ships fully static HTML for SEO. Native GitHub Pages support, perfect for content-heavy portfolio sites. Islands Architecture allows adding interactivity only where needed. |
| TypeScript | 5.9.3 | Type-safe JavaScript | Industry standard for production code. Catches errors at compile time, provides better IDE support, demonstrates professional code quality to potential clients. |
| Tailwind CSS | 4.1.18 | Utility-first CSS framework | v4.0+ is 5x faster with 100x faster incremental builds. Zero configuration required, automatic content detection eliminates manual setup. Industry standard for rapid UI development in 2025. |
| Node.js | 20 LTS | JavaScript runtime | Long-term support version ensures stability. Required for build tooling and local development. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @astrojs/tailwind | Latest | Tailwind integration for Astro | Required to use Tailwind CSS with Astro. Built-in integration handles configuration automatically. |
| @astrojs/mdx | Latest | MDX support for Astro | For case studies and blog-style project descriptions. Allows embedding components in markdown for rich content. |
| sharp | Latest | Image optimization | Built-in with Astro. Handles WebP/AVIF conversion, responsive images, and lazy loading automatically. Critical for portfolio with case study images. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint | TypeScript linting | Use @typescript-eslint/parser and @typescript-eslint/eslint-plugin. Enforce code quality standards. |
| Prettier | Code formatting | Use eslint-config-prettier to avoid conflicts. Enforces consistent formatting across project. |
| GitHub Actions | CI/CD for GitHub Pages | Astro provides official GitHub Action. Commit lockfile so action detects package manager automatically. |

### Form Handling (Contact Form)

| Service | Pricing | Purpose | Why |
|---------|---------|---------|-----|
| Formspree | Free tier (50/mo) | Contact form backend | Simple integration, no backend code required. Most popular for static sites. Free tier sufficient for portfolio contact forms. |
| Un-static Forms | Varies | Alternative form handler | Second choice if Formspree doesn't meet needs. Popular with GitHub Pages users. |

### Analytics (Optional)

| Service | Pricing | Purpose | Why |
|---------|---------|---------|-----|
| Plausible | $9/month or self-host | Privacy-friendly analytics | GDPR-compliant, cookie-free, <1KB script. Better privacy story to show clients. |
| Umami | Free (self-host) or $9/mo | Alternative analytics | Same benefits as Plausible, free if you self-host. Uses PostgreSQL, lighter than Plausible's ClickHouse. |

## Installation

```bash
# Initialize new Astro project
npm create astro@latest

# Core dependencies (installed automatically)
# astro@5.16.15
# typescript@5.9.3

# Add Tailwind CSS integration
npx astro add tailwind

# Add MDX for rich content
npx astro add mdx

# Dev dependencies for code quality
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier eslint-plugin-prettier
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Astro | Next.js (static export) | If you need dynamic data, server-side rendering, or plan to add authentication later. Next.js is overkill for pure static portfolios. |
| Astro | Jekyll | Never. Jekyll is the GitHub Pages default but uses Ruby, has slower builds, and less modern DX than Astro. Only use if you must avoid Node.js. |
| Astro | Hugo | If you have thousands of pages and need sub-second builds. Hugo is faster but harder to customize, poor DX for interactive components. |
| Tailwind CSS | Custom CSS | If you have strong design opinions and CSS architecture experience. For rapid development, Tailwind is superior. |
| Formspree | Google Forms | Never for a professional portfolio. Google Forms looks unprofessional and doesn't match site design. |
| Formspree | Self-hosted backend | Only if you want to demonstrate full-stack skills. Adds complexity and hosting costs for minimal benefit on a portfolio site. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Create React App | Deprecated in 2023, no longer maintained | Astro for static sites, Next.js if you need React with SSR |
| Gatsby | Heavy runtime, complex setup, losing popularity | Astro (similar DX, better performance, simpler) |
| Vue-based SSG (VitePress, Nuxt static) | Astro supports Vue components if needed, no need for Vue-specific SSG | Astro with Vue integration if you prefer Vue |
| Webpack (standalone) | Replaced by Vite in modern tooling | Vite (bundled with Astro, 100x faster HMR) |
| Google Analytics | Privacy concerns, bloated script, GDPR complexity | Plausible or Umami (privacy-friendly, lightweight) |
| jQuery | Outdated, unnecessary with modern frameworks | Vanilla JS or Astro components for interactivity |

## Stack Patterns by Use Case

**If showcasing React expertise to potential clients:**
- Add `@astrojs/react` integration
- Use React for interactive portfolio components (project filters, animations)
- Keep most pages pure Astro (static) for performance
- Demonstrates modern React skills while maintaining static site benefits

**If targeting enterprise clients:**
- Add TypeScript strict mode (`"strict": true` in tsconfig.json)
- Include ESLint + Prettier configuration in repo
- Add GitHub Actions for automated testing/deployment
- Shows commitment to code quality and professional practices

**If emphasizing performance expertise:**
- Add Lighthouse CI to GitHub Actions
- Implement WebP/AVIF images with fallbacks
- Use Astro's View Transitions API for SPA-like navigation
- Display performance scores on site as credibility signal

**If building blog/thought leadership:**
- Use Astro Content Collections for type-safe blog posts
- Add RSS feed generation (`@astrojs/rss`)
- Implement reading time estimates and SEO meta tags
- Add MDX for rich, interactive blog content

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| Astro 5.x | Vite 6.x | Astro 5.0+ ships with Vite 6. No manual configuration needed. |
| Tailwind CSS 4.x | Astro 5.x | Full compatibility. Use @astrojs/tailwind integration. |
| TypeScript 5.9.3 | Astro 5.x | Recommended version. Astro supports TS 5.x natively. |
| Node.js 20 LTS | All above | Minimum Node.js 18, but 20 LTS recommended for stability. |
| Sharp (latest) | Astro 5.x | Auto-installed with Astro. Handles image optimization out of box. |

## GitHub Pages Configuration

### Required Setup

```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://joel-shinness.github.io', // Your GitHub Pages URL
  base: '/repo-name', // Only if NOT using username.github.io repo
  // If using username.github.io repo, omit 'base' entirely
  integrations: [tailwind(), mdx()],
})
```

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Critical:** Commit your `package-lock.json` so GitHub Actions detects npm as your package manager.

### Repository Settings

1. Go to Settings → Pages
2. Source: **GitHub Actions** (not "Deploy from branch")
3. Enforce HTTPS (enabled by default)

## Image Optimization Strategy

For a portfolio with case study images, proper image optimization is critical:

### Format Priority (2025)
1. **AVIF** - Best compression (50% smaller than JPEG, 20% smaller than WebP)
2. **WebP** - Excellent compression, universal browser support
3. **JPEG/PNG** - Fallback for ancient browsers

### Astro's Built-in Solution

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/project-hero.jpg';
---

<Image
  src={heroImage}
  alt="Project screenshot"
  widths={[400, 800, 1200]}
  formats={['avif', 'webp', 'jpg']}
  loading="lazy"
/>
```

Astro automatically:
- Converts to WebP/AVIF
- Generates responsive srcset
- Optimizes file sizes
- Handles lazy loading
- Serves appropriate format based on browser support

### Performance Impact
- 50-80% reduction in image payload
- Critical for Core Web Vitals (SEO ranking factor in 2025)
- Faster page loads = better first impression for potential clients

## Development Workflow

```bash
# Local development
npm run dev

# Build for production (GitHub Actions does this automatically)
npm run build

# Preview production build locally
npm run preview

# Lint and format
npm run lint
npm run format
```

## Sources

**HIGH Confidence (Official Documentation):**
- [Astro 5.16.15 Release](https://github.com/withastro/astro/releases) - Official GitHub releases page
- [Astro GitHub Pages Deployment](https://docs.astro.build/en/guides/deploy/github/) - Official Astro documentation
- [Tailwind CSS v4.1.18](https://github.com/tailwindlabs/tailwindcss/releases) - Official Tailwind releases
- [TypeScript 5.9.3 Release](https://devblogs.microsoft.com/typescript/announcing-typescript-5-9/) - Official Microsoft blog

**MEDIUM Confidence (Multiple Credible Sources):**
- [Astro vs Next.js Comparison 2025](https://pagepro.co/blog/astro-nextjs/) - Detailed technical comparison
- [Static Site Generators Best Practices 2025](https://cloudcannon.com/blog/the-top-five-static-site-generators-for-2025-and-when-to-use-them/) - Industry analysis
- [Image Optimization Techniques 2025](https://www.frontendtools.tech/blog/modern-image-optimization-techniques-2025) - WebP/AVIF implementation guide
- [Privacy-Friendly Analytics Comparison](https://vemetric.com/blog/plausible-vs-umami) - Plausible vs Umami analysis
- [Contact Form Solutions for Static Sites](https://un-static.com/how-to/add-github-pages-contact-form) - Formspree integration guide

**LOW Confidence (WebSearch Only - Verify During Implementation):**
- ESLint + Prettier configuration patterns - Multiple 2025 sources agree on approach but verify with official docs during setup

---
*Stack research for: Joel Shinness Developer Portfolio*
*Researched: 2025-01-26*
*Target: GitHub Pages static hosting, small business clients*

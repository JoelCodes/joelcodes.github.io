# Phase 6: Performance & SEO - Context

**Gathered:** 2026-01-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Optimize the site for performance and search engine discoverability, then deploy to GitHub Pages. This includes image optimization, SEO meta tags, sitemap/robots.txt, and CI/CD pipeline with Lighthouse enforcement.

</domain>

<decisions>
## Implementation Decisions

### Image optimization
- WebP format with JPEG fallback (no AVIF)
- Native lazy loading via `loading="lazy"` attribute
- Solid color placeholder while images load (gray or brand color)
- Responsive images with srcset for multiple viewport sizes
- Hero image loads eagerly (no lazy loading for above-the-fold)
- 80% quality setting for all images
- About section photo auto-filtered to black & white via CSS

### SEO meta strategy
- Title format: "Page Title | Joel Shinness"
- One default OpenGraph image for all pages (single branded image)
- Basic Person/Organization JSON-LD structured data
- Canonical domain: joelshinness.com

### Deployment configuration
- GitHub Actions triggered on push to main branch
- PR preview deploys for pull requests
- Lighthouse CI check enforced — block deploy if score drops below 90
- Node.js 20 LTS for build environment

### Performance targets
- Lighthouse 90+ on mobile (enforced in CI)
- All Core Web Vitals equally prioritized (LCP, CLS, FID)
- Critical CSS inlined in head
- Primary fonts preloaded
- Target: under 2 seconds load time on 3G

### Claude's Discretion
- Specific placeholder color choice
- Exact srcset breakpoints
- Lighthouse CI tool choice (lighthouse-ci vs other)
- PR preview implementation details
- Font subsetting approach

</decisions>

<specifics>
## Specific Ideas

- "Under 2 seconds on 3G" — aggressive mobile performance target
- Enforce Lighthouse in CI to prevent performance regressions
- PR previews for testing before merge

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 06-performance-seo*
*Context gathered: 2026-01-27*

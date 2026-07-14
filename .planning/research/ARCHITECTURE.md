# Architecture Research

**Domain:** Static portfolio/services site — visual layer rebuild in place
**Researched:** 2026-07-14
**Confidence:** HIGH (grounded in repo read; no assumptions)

---

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Build Layer (Astro 5 SSG)               │
├──────────────────────┬──────────────────────────────────────┤
│     Pages (routes)   │         Layouts                       │
│  index, /showcase,   │  BaseLayout.astro                     │
│  /blog/*, /services/ │  (HTML shell, SEO, fonts, dark mode)  │
│  /areas/, 404,       │                                       │
│  thank-you           │                                       │
├──────────────────────┴──────────────────────────────────────┤
│                    Component Layer                            │
│  ┌──────────┐  ┌────────────┐  ┌──────────┐  ┌──────────┐  │
│  │  ui/     │  │  layout/   │  │ sections/│  │ content/ │  │
│  │ (tokens) │  │ SiteHeader │  │ Landing  │  │ showcase │  │
│  │          │  │ SiteFooter │  │ sections │  │ cards    │  │
│  └──────────┘  └────────────┘  └──────────┘  └──────────┘  │
├─────────────────────────────────────────────────────────────┤
│                      Data Layer                              │
│  ┌──────────────────┐  ┌──────────────────────────────────┐ │
│  │ content/blog/    │  │ data/projects.json (v2)          │ │
│  │ *.mdx            │  │ (or content collection)          │ │
│  │ (content coll.)  │  │                                  │ │
│  └──────────────────┘  └──────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│              Infrastructure (unchanged)                       │
│  SEO.astro  sitemap  robots.txt  n8n webhook  GH Actions     │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. Component Structure for New Design System

### Proposed src/components Layout

The v2 system (Badge, Button, Card, Input, CheckboxGroup) gets completely replaced. The Figma component set maps as follows:

```
src/components/
├── ui/                        # Atomic design-system primitives
│   ├── CTAButton.astro        # NEW — replaces Button.astro
│   ├── Eyebrow.astro          # NEW — uppercase label above headings
│   ├── Tag.astro              # NEW — replaces inline badge spans in blog
│   ├── Callout.astro          # NEW — highlighted aside/note block
│   └── LinkCard.astro         # NEW — bordered link tile (blog, resources)
│
├── layout/                    # Chrome components (keep folder, replace files)
│   ├── SiteHeader.astro       # REPLACES Header.astro (keep filename or rename)
│   ├── SiteFooter.astro       # REPLACES Footer.astro
│   └── MobileNav.astro        # REPLACES MobileNav.astro (rewire to new nav links)
│
├── content/                   # Domain content components
│   ├── ServiceCard.astro      # NEW — card for /services section and landing
│   ├── Step.astro             # NEW — replaces Process.astro inline articles
│   ├── ProjectCard.astro      # REPLACES ProjectCard.astro (expandable behavior)
│   ├── FAQItem.astro          # NEW — replaces <details> inline in faq.astro
│   ├── BlogCard.astro         # REPLACES BlogCard.astro (restyled)
│   └── Breadcrumb.astro       # NEW — for /services/* and /areas/* sub-pages
│
└── homepage/                  # Landing-page-specific section assemblies
    ├── HeroSection.astro      # REPLACES Hero.astro
    ├── ServicesSection.astro  # REPLACES Services.astro
    ├── ProcessSection.astro   # REPLACES Process.astro
    ├── AboutSection.astro     # REPLACES About.astro
    └── ContactSection.astro   # REPLACES homepage/ContactSection.astro
```

**Rationale for this layout:**
- `ui/` stays as pure tokens (no data, no copy) — only CTAButton, Eyebrow, Tag, Callout, LinkCard go here because they are generic across all pages
- `content/` holds components that know about domain shape (project data, FAQ data, steps) but are not page-specific
- `layout/` is chrome only — SiteHeader/SiteFooter know the nav links but nothing else
- `homepage/` is the one place where section-level assemblies can hold their own copy inline without needing external data files

### Components Removed Entirely

These current components have **no counterpart** in the new design system and are purely deleted:

| File | Why Removed |
|------|-------------|
| `src/components/ui/Badge.astro` | Design-system concept gone; Tag.astro replaces the functional use |
| `src/components/ui/Card.astro` | Neobrutalist card variant scheme gone; per-component styling instead |
| `src/components/ui/Input.astro` | Form inputs restyled inline or into a new FormInput.astro if reused |
| `src/components/ui/CheckboxGroup.astro` | Same — form-specific, inline into contact section |
| `src/components/illustrations/*.svg` | All five Process SVGs and three Tech SVGs — replaced by Figma assets |
| `src/components/design-system/` (entire folder) | Design system page itself is deleted; these components only served it |
| `src/components/FAQ.astro` | Replaced by FAQItem.astro + inline rendering in service pages |
| `src/components/About.astro` | Copy moves to AboutSection.astro in homepage/ |
| `src/components/TableOfContents.astro` | Keep for now — blog post template retains TOC; only visual restyle needed |
| `src/components/BlogCard.astro` | Replaced by restyled version at same path |

---

## 2. Content Modeling

### Showcase Projects: projects.json v2 vs Content Collection

**Recommendation: stay with projects.json, promote it to v2 schema.**

Rationale:
- The expandable-card pattern (closed = summary, expanded = full case study) is a JS interaction on a single `/showcase` page, not a separate URL per project. There are no dedicated `/showcase/[slug]` pages in the Figma spec.
- Content Collections shine when you need per-entry URLs with `getStaticPaths`. Since `/projects/[slug]` is being retired (not replaced with `/showcase/[slug]`), the collection machinery is not needed.
- JSON is editable without MDX authoring tooling, and the existing two entries need migration not reimagination.
- If a full case-study detail page is wanted later, it is straightforward to migrate to a content collection at that point — it does not need to happen in v3.0.

**v2 schema additions needed in projects.json:**

```json
{
  "slug": "bakery-order-system",
  "title": "Bakery Order Automation",
  "category": "web-apps",
  "categoryLabel": "Web Apps",
  "status": "published",

  // Card closed state
  "tagline": "Short hook sentence for the card title area",
  "thumbnailAlt": "...",

  // Card expanded state (new)
  "expandedSummary": "One paragraph for the expanded panel",
  "results": [...],          // already exists
  "technologies": [...],     // already exists
  "testimonial": {...},      // already exists

  // Remove: thumbnail (file path likely wrong anyway), screenshots (no detail page)
  // Remove: draft (replaced by status field)
  // Remove: problem/solution at top level (move into expandedSummary)
}
```

The `ProjectCard.astro` component manages the open/closed toggle via a small vanilla `<script>` block — no framework needed. The closed card renders from `title` + `tagline`; the expanded panel renders the rest.

### Landing Copy: Inline vs Data Files

**Recommendation: inline in section components, not data files.**

The five homepage sections (Hero, Services, Process, About, Contact) each have tightly coupled copy and structure. Abstracting copy into a separate data file (`src/data/landing.json`) adds a lookup indirection without benefit — there is no CMS, no i18n, and no reuse of this copy elsewhere. Keep copy inline in the section `.astro` files. The exception is if the Services section copy is also needed verbatim in `/services/web`, in which case extract only that service list to `src/data/services.json`.

---

## 3. Dev-Hidden Pages

### The Problem

Two pages need to exist in the build but not be promoted: `/services/web` and `/areas/abbotsford`. "Dev-hidden" has three distinct interpretations:
1. Only visible in local dev (excluded from production HTML entirely)
2. Built and deployed but noindexed + excluded from sitemap
3. Built but 404 in production (not a real option on GH Pages static hosting)

### Mechanism Comparison

| Mechanism | Dev-only | Prod noindex | Sitemap excluded | Complexity |
|-----------|----------|--------------|-----------------|------------|
| `import.meta.env.DEV` conditional in `getStaticPaths` | Yes — page omitted from prod build | n/a (not built) | Yes (not built) | Low |
| `noindex` meta + sitemap filter | No — built in prod | Yes | Yes (configurable) | Medium |
| Astro redirects config | No — just redirects | n/a | n/a | Does not apply |

**Recommendation: build the pages in both environments, but add noindex meta + exclude from sitemap.**

Reasoning:
- GH Pages static hosting cannot conditionally serve different HTML per environment. If a page is not in `dist/`, it cannot be accessed by URL — but there is no server to enforce that. Anyone who guesses the URL in prod would get a 404 from GH Pages, not a 302. This is fine for a "hidden" page, but it means the page is genuinely inaccessible in prod if excluded from the build.
- However: if the page is excluded from the build, you cannot preview it on a PR preview deploy (which is a production-mode build). That makes the whole point of building it early moot.
- The better approach: build it, serve it in both environments, mark it noindex + exclude from sitemap. It is effectively invisible to search engines and not linked from anywhere. A person who manually finds the URL in dev will reach a real page; the same person in prod will also reach it (acceptable for internal review).

**Implementation:**

In the page frontmatter for `/services/web` and `/areas/abbotsford`:

```astro
---
// pages/services/web.astro
const isDevHidden = true; // flag for sitemap exclusion
---
<BaseLayout title="..." description="...">
  <meta slot="head" name="robots" content="noindex, nofollow" />
  ...
</BaseLayout>
```

In `astro.config.mjs`, add a sitemap filter:

```js
sitemap({
  filter: (page) =>
    !page.includes('/services/web') &&
    !page.includes('/areas/abbotsford'),
  changefreq: 'weekly',
  priority: 0.7,
  lastmod: new Date(),
}),
```

The `@astrojs/sitemap` integration supports a `filter` function that receives each page URL. This is HIGH confidence — the filter option is documented in the official Astro sitemap integration docs.

**Do not use `import.meta.env.DEV` in `getStaticPaths`** for these pages. That pattern (used correctly in `blog/[slug].astro` and `blog/tags/[tag].astro` for draft filtering) works for draft content, but it means PR preview builds — which run `npm run build` (PROD mode) — will not build the pages, defeating the purpose of building them early for review.

---

## 4. Old-URL Strategy

### GitHub Pages Redirect Reality

Astro's `redirects` config generates redirect HTML files at the source URL (a `<meta http-equiv="refresh">` page) when building for a static adapter. The current config in `astro.config.mjs` uses this for `/portfolio` → `/projects`. This is how GH Pages static hosting works: there is no server-side 301; the "redirect" is a client-side refresh from an HTML file Astro writes to `dist/portfolio/index.html`.

This approach works but has SEO consequences: meta-refresh redirects are not treated as 301s by Google. For a personal portfolio site this is acceptable. For the specific redirects needed:

**Redirect map for v3.0:**

```js
// astro.config.mjs redirects section
redirects: {
  // Keep existing (don't break /portfolio/* links already in the wild)
  '/portfolio': '/projects',
  '/portfolio/[slug]': '/projects/[slug]',
  '/contact': '/#contact',

  // New for v3.0
  '/projects': '/showcase',
  '/projects/[slug]': '/showcase',   // individual project slugs land at showcase (no detail page)
  '/faq': '/',                        // or '/#faq' if FAQ section exists on landing
},
```

**Important caveat on GH Pages redirects for dynamic segments:**
Astro's static redirect for `/projects/[slug]` → `/showcase` generates an HTML file for each slug that exists in the current `projects.json`. Both current entries are `draft: true`, meaning `getStaticPaths` in the current `projects/[slug].astro` builds them anyway (draft filter is only on the index listing). So the redirect HTML files will be generated for those two slugs. Any slug not in `projects.json` will simply 404 on GH Pages — there is no catch-all redirect possible in a static build. This is acceptable since there are only two slugs and both are covered.

**For `/faq`:** The page content (five FAQ items) moves into service pages per Figma. The current `faq.astro` has its own FAQPage JSON-LD schema. When `/faq` is deleted:
- Add the `FAQPage` JSON-LD schema to the service pages that absorb the content
- The `redirects` entry for `/faq` → `/` prevents hard 404s for any inbound links

### Astro Redirects on GH Pages — Summary

| Scenario | Works on GH Pages? | Notes |
|----------|-------------------|-------|
| `/old-path` → `/new-path` | Yes | Astro writes `dist/old-path/index.html` with meta-refresh |
| `/old-path/[slug]` → `/new-path` | Partially | Only generates HTML for slugs in `getStaticPaths`; unknown slugs 404 |
| Server-side 301 | No | GH Pages has no server config |
| `_redirects` file (Netlify) | No | Netlify-specific |

---

## 5. Deletion Map

### Files to Delete

These files have no role in v3.0 and should be deleted outright:

```
src/pages/faq.astro                           — content moves to service pages
src/pages/design-system.astro                 — internal tooling page, retired
src/pages/design-system.json.ts               — API endpoint for design system page
src/pages/component-demo.astro                — internal tooling page, retired
src/pages/test-isometric.astro                — experiment page, retired
src/pages/projects/index.astro                — superseded by /showcase
src/pages/projects/[slug].astro               — no detail pages in v3.0

src/components/ui/Badge.astro                 — design system change
src/components/ui/Card.astro                  — design system change
src/components/ui/Input.astro                 — design system change
src/components/ui/CheckboxGroup.astro         — design system change
src/components/design-system/                 — entire folder (4 files)
src/components/FAQ.astro                      — replaced by FAQItem.astro
src/components/About.astro                    — replaced by AboutSection.astro
src/components/Hero.astro                     — replaced by HeroSection.astro
src/components/Services.astro                 — replaced by ServicesSection.astro
src/components/Process.astro                  — replaced by ProcessSection.astro
src/components/ProjectCard.astro              — replaced by content/ProjectCard.astro
src/components/BlogCard.astro                 — replaced by content/BlogCard.astro
src/components/illustrations/ProcessBuild.svg
src/components/illustrations/ProcessDiscovery.svg
src/components/illustrations/ProcessHandover.svg
src/components/illustrations/ProcessProposal.svg
src/components/illustrations/ProcessPrototype.svg
src/components/illustrations/TechAI.svg
src/components/illustrations/TechAutomations.svg
src/components/illustrations/TechWebApps.svg
```

### Files to Replace (rewrite in place)

Same path, entirely new implementation:

```
src/layouts/BaseLayout.astro                  — new tokens, fonts, dark mode behavior
src/styles/global.css                         — all @theme tokens replaced
src/components/layout/Header.astro            — becomes SiteHeader (or rename)
src/components/layout/Footer.astro            — becomes SiteFooter (or rename)
src/components/layout/MobileNav.astro         — rewire nav links, new styling
src/pages/index.astro                         — new section composition
src/pages/thank-you.astro                     — restyle, keep n8n redirect
src/pages/404.astro (new file)                — create; currently no 404 page
src/pages/blog/index.astro                    — restyle
src/pages/blog/[slug].astro                   — restyle (keep TOC, keep MDX logic)
src/pages/blog/tags/[tag].astro               — restyle
src/data/projects.json                        — promote to v2 schema
```

### Files to Keep Unchanged

These survive v3.0 without modification:

```
src/content.config.ts                         — blog collection schema stays
src/content/blog/*.mdx                        — blog content unchanged
src/components/SEO.astro                      — SEO plumbing unchanged
src/components/TableOfContents.astro          — keep; restyle only if needed
astro.config.mjs                              — add sitemap filter + new redirects
.github/workflows/deploy.yml                  — unchanged
.github/workflows/pr-preview.yml             — unchanged
lighthouserc.json                             — unchanged
```

### New Files (net additions)

```
src/pages/showcase.astro                      — replaces /projects
src/pages/services/web.astro                  — dev-hidden
src/pages/areas/abbotsford.astro              — dev-hidden
src/pages/404.astro                           — new
src/components/ui/CTAButton.astro
src/components/ui/Eyebrow.astro
src/components/ui/Tag.astro
src/components/ui/Callout.astro
src/components/ui/LinkCard.astro
src/components/layout/SiteHeader.astro        — or rename Header.astro in place
src/components/layout/SiteFooter.astro        — or rename Footer.astro in place
src/components/content/ServiceCard.astro
src/components/content/Step.astro
src/components/content/ProjectCard.astro
src/components/content/FAQItem.astro
src/components/content/BlogCard.astro
src/components/content/Breadcrumb.astro
src/components/homepage/HeroSection.astro
src/components/homepage/ServicesSection.astro
src/components/homepage/ProcessSection.astro
src/components/homepage/AboutSection.astro
src/components/homepage/ContactSection.astro  — rewrite in place
```

---

## 6. Suggested Build Order

### Phase Structure

```
Phase 1: Foundation
  → global.css token replacement (all OKLCH values, font families, spacing)
  → BaseLayout.astro (new fonts in <head>, dark mode toggle behavior if changed)
  → Verify: npm run build passes, Lighthouse still green
  ↳ Nothing else can be correctly styled until tokens are done

Phase 2: Chrome Components
  → SiteHeader.astro (new nav links: Landing, Showcase, Contact CTA)
  → SiteFooter.astro (new links, new copy)
  → MobileNav.astro (new nav links)
  → Verify: every existing page renders with correct chrome
  ↳ Depends on Phase 1 tokens

Phase 3: UI Primitives
  → CTAButton.astro
  → Eyebrow.astro
  → Tag.astro
  → Callout.astro
  → LinkCard.astro
  ↳ Other components depend on these; build before content components
  ↳ Can write and test in isolation; create a simple /test-components dev page
    (delete it before merge)

Phase 4: Content Components
  → ProjectCard.astro (with expand/collapse behavior)
  → ServiceCard.astro
  → Step.astro
  → FAQItem.astro
  → BlogCard.astro (restyled)
  → Breadcrumb.astro
  ↳ Depends on Phase 3 primitives

Phase 5: Page Templates — Landing
  → HeroSection.astro
  → ServicesSection.astro
  → ProcessSection.astro
  → AboutSection.astro
  → ContactSection.astro (restyle, keep n8n webhook)
  → src/pages/index.astro (compose sections)
  ↳ Highest-visibility page; build last so all components are ready

Phase 6: Page Templates — Showcase + Blog
  → projects.json v2 schema migration
  → src/pages/showcase.astro
  → src/pages/blog/index.astro (restyle)
  → src/pages/blog/[slug].astro (restyle)
  → src/pages/blog/tags/[tag].astro (restyle)

Phase 7: Utility Pages
  → src/pages/thank-you.astro (restyle)
  → src/pages/404.astro (new)
  → src/pages/services/web.astro (dev-hidden, noindex)
  → src/pages/areas/abbotsford.astro (dev-hidden, noindex)

Phase 8: URL Strategy + Cleanup
  → Update astro.config.mjs redirects (/projects → /showcase, /faq → /)
  → Add sitemap filter for dev-hidden pages
  → Delete all retired files (faq, design-system, component-demo, test-isometric,
    projects/index, projects/[slug], old ui/ components, illustrations/)
  → Final Lighthouse run; verify no regressions
```

### Dependency Graph (critical path)

```
global.css tokens
    → BaseLayout.astro
        → SiteHeader + SiteFooter
            → All page templates
                → Final cleanup

                    (parallel track)
CTAButton / Eyebrow / Tag
    → ServiceCard / ProjectCard / Step / FAQItem / BlogCard
        → Section assemblies (Hero, Services, Process, About, Contact)
            → index.astro (landing)
```

---

## Integration Points

### Existing Systems That Must Not Break

| System | Where It Lives | Integration Risk |
|--------|---------------|-----------------|
| n8n contact webhook | `ContactSection.astro` script block, `PUBLIC_N8N_WEBHOOK_URL` env var, GH secret | LOW — just preserve the `fetch()` call and redirect to `/thank-you` |
| Blog MDX + content collection | `src/content/blog/`, `src/content.config.ts`, `blog/[slug].astro` | LOW — schema is unchanged; only the template visual changes |
| `import.meta.env.PROD` draft filtering | `blog/[slug].astro`, `blog/index.astro`, `blog/tags/[tag].astro` | LOW — pattern is already correct; preserve it verbatim |
| SEO JSON-LD (Person schema) | `SEO.astro` | LOW — no changes needed |
| FAQPage JSON-LD | Currently in `faq.astro` | MEDIUM — page is deleted; schema must be replanted in service pages |
| Dark mode toggle (localStorage + class) | Inline `<script is:inline>` in `BaseLayout.astro`, toggle in `Header.astro` + `MobileNav.astro` | LOW — copy script block verbatim to new files |
| Lighthouse CI thresholds | `lighthouserc.json`, `deploy.yml` | MEDIUM — new design must maintain 90% performance; font changes and new JS (expand/collapse) can regress LCP |
| PR preview build | `pr-preview.yml` uses `ASTRO_BASE` env, builds in PROD mode | LOW — no changes needed; dev-hidden pages will be built and noindexed |

### Component Boundary Summary

| Old Component | Communicates With | New Equivalent |
|--------------|------------------|---------------|
| `Header.astro` | `MobileNav.astro` (import) | `SiteHeader.astro` + `MobileNav.astro` |
| `BaseLayout.astro` | `Header`, `Footer`, `SEO.astro` (imports) | Same structure, new tokens |
| `ContactSection.astro` | `ui/Input`, `ui/Button`, `ui/Card`, `ui/CheckboxGroup` (imports) | Self-contained, inline form elements or new FormInput.astro |
| `projects/[slug].astro` | `projects.json`, `ui/Badge` | Deleted; `showcase.astro` + `content/ProjectCard.astro` |
| `blog/[slug].astro` | `TableOfContents.astro`, `astro:content` | Keep import; restyle template |

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Converting projects.json to a Content Collection prematurely

**What:** Moving showcase projects to `src/content/showcase/*.mdx` because "content collections are the Astro way"
**Why wrong:** Requires `getStaticPaths` + per-project URLs (`/showcase/bakery-order-system`), which the Figma design does not call for. Adds MDX authoring complexity for content that is structured data, not prose.
**Do this instead:** Keep `projects.json`; upgrade the schema in place. Migrate to a content collection only when per-URL project pages are needed.

### Anti-Pattern 2: Using import.meta.env.DEV to exclude dev-hidden pages from production build

**What:** Adding `if (import.meta.env.PROD) return []` in `getStaticPaths` for `/services/web`
**Why wrong:** PR preview deploys run `npm run build` (PROD mode), so the page would not build in previews, defeating the ability to review it. Also, Astro's `import.meta.env.DEV` is `true` only during `astro dev`, not during any build.
**Do this instead:** Build the page always; mark it `noindex` via meta tag; exclude from sitemap via filter function.

### Anti-Pattern 3: Putting the dark mode toggle script inside new component files instead of BaseLayout

**What:** Moving the dark mode `<script is:inline>` from `BaseLayout.astro` into `SiteHeader.astro`
**Why wrong:** The script must run before `<body>` renders to prevent FOUC. Moving it to a component that renders inside `<body>` causes a flash of the wrong theme on every hard load.
**Do this instead:** Keep the FOUC-prevention `<script is:inline>` in `<head>` inside `BaseLayout.astro`. The toggle handler (which fires on click) can safely live in `SiteHeader.astro`.

### Anti-Pattern 4: Inline expanding ProjectCard behavior with CSS-only :has() or details/summary

**What:** Attempting to implement the expand/collapse card with pure CSS `:has(input:checked)` patterns or `<details>/<summary>`
**Why wrong:** The card expansion likely needs height animation, content fade-in, and possibly scroll behavior — none of which work reliably with `<details>` across browsers. CSS-only solutions for arbitrary height transitions are fragile.
**Do this instead:** Small vanilla JS in a `<script>` block inside `ProjectCard.astro`. Toggle a class on the card, animate `max-height` or use the WAAPI. Keep it zero-dependency — no framework needed.

### Anti-Pattern 5: Applying new tokens piecemeal across pages before global.css is complete

**What:** Restyling individual components before `global.css` is fully replaced
**Why wrong:** Old token names (e.g., `--color-yellow`) and new token names may collide during transition, causing unpredictable rendering. Components that import both old and new tokens will be hard to debug.
**Do this instead:** Replace `global.css` completely in Phase 1 before touching any component. Align every token name change at once. This is a hard boundary: no component work starts until tokens are final.

---

## Sources

- Repo read: all files in `src/`, `astro.config.mjs`, `.github/workflows/`, `lighthouserc.json` — HIGH confidence
- Astro sitemap integration filter option: https://docs.astro.build/en/guides/integrations-guide/sitemap/ — verified via official docs (filter is a first-class option)
- Astro static redirects behavior: https://docs.astro.build/en/guides/routing/#redirects — meta-refresh for static builds is documented behavior
- GH Pages static hosting constraints: no server-side redirect support is a well-established platform limitation — HIGH confidence

---

*Architecture research for: v3.0 Wavelength Rebrand — rebuild-in-place, Astro 5 + Tailwind 4*
*Researched: 2026-07-14*

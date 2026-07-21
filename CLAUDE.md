# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build production site to ./dist/
npm run preview  # Preview built site locally
npm run astro check  # Run Astro's TypeScript checker
```

## Git Workflow

When starting new work:
1. Create a new branch from `main` (e.g., `feature/add-contact-form`, `fix/header-styling`)
2. Commit changes to that branch
3. When ready to merge, create a PR to `main`

Do not commit directly to `main`.

## Architecture Overview

This is a **portfolio and service site with a dev-only blog** built with Astro 5 and Tailwind CSS 4. It deploys to GitHub Pages.

### Key Technologies
- **Astro 5** - Static site generator with file-based routing
- **Tailwind CSS 4** - Styling via `@tailwindcss/vite` plugin
- **MDX** - Blog posts with syntax highlighting via `astro-expressive-code`
- **TypeScript** - Strict mode enabled

### Directory Structure

```
/src
├── /components
│   ├── /wl           # v3.0 Wavelength component set (see Components section)
│   ├── /layout       # SiteHeader.astro, SiteFooter.astro
│   ├── WaveMark.astro
│   ├── SEO.astro
│   └── TableOfContents.astro
├── /pages
│   ├── index.astro          # Landing page (only always-prod page besides 404)
│   ├── showcase.astro       # Showcase page — dev-only (prod-excluded)
│   ├── 404.astro
│   ├── /blog                # Blog index + [slug].astro — dev-only (prod-excluded)
│   ├── /services            # web.astro — dev-only (noindex + sitemap-filtered)
│   └── /areas               # abbotsford.astro — dev-only (noindex + sitemap-filtered)
├── /layouts          # BaseLayout.astro (HTML shell, SiteHeader + SiteFooter + SEO)
├── /content/blog     # MDX blog posts
├── /data             # projects.json (showcase data)
├── /lib              # constants.ts (BOOKING_URL, CONTACT_EMAIL)
└── /styles           # global.css (Tailwind @theme with --wl-* tokens + fonts)
```

### Information Architecture

Nav: **Services** (landing anchor) / **Showcase** / **About** (landing anchor) / **Book a call** (Calendly CTA)

**Prod-only pages (reachable in production):** `/` and `/404`.

**Dev-only (prod-excluded) pages:**
- `/showcase` — guarded by `if (import.meta.env.PROD) return Astro.redirect('/')` in showcase.astro
- `/blog` and `/blog/[slug]` — same prod redirect guard; blog is reachable by URL in dev only and is NOT in the nav
- `/services/web` and `/areas/abbotsford` — dev-only (noindex meta + sitemap-filtered); same prod redirect guard; reachable by URL in dev only

**Removed routes (do not recreate):** the old neobrutalist portfolio route, the old FAQ page, `/projects/*`, `/thank-you`. Redirects configured: `/projects → /showcase`.

### Content System

**Blog posts** use Astro Content Collections with Zod validation:
- Location: `/src/content/blog/*.mdx`
- Schema defined in `/src/content.config.ts`
- Required frontmatter: `title`, `description`, `pubDate`, `featuredImage`
- Optional: `tags` (array), `draft` (boolean), `updatedDate`

**Showcase projects** are stored as JSON in `/src/data/projects.json` and loaded via Astro Content Collections (`file()` loader). Key schema fields: `slug`, `section` (`client-work` | `craft-experiments`), `title`, `eyebrow`, `outcome`, `summary`, `tags`, `problem`, `built`, `result`, `thumbLabel`, plus optional per-card label overrides (`problemLabel`, `builtLabel`, `resultLabel`).

**Shared constants** in `/src/lib/constants.ts`: `BOOKING_URL` (Calendly) and `CONTACT_EMAIL`.

### Styling

Tokens and theme defined in `/src/styles/global.css` using Tailwind CSS 4's `@theme` directive:

**Token prefix: `--wl-*`** (Wavelength v3.0 namespace)

Light-mode palette:
- `--color-wl-ink` (#12333B) — primary text
- `--color-wl-sub` (#35525A) — secondary text
- `--color-wl-accent` (#0E7078) — interactive accent
- `--color-wl-accent-soft` (#5AA9A5) — softer accent
- `--color-wl-sea-glass` (#E6F1F1) — light teal surface
- `--color-wl-paper` (#F6FBFA) — near-white surface
- `--color-wl-line` — tinted divider
- `--color-wl-on-ink` (#EAF6F3) — text on dark/ink backgrounds

All dark-mode flips are declared in the `.dark` class block (NOT in `@theme`), enabling runtime class toggling.

**Fonts (self-hosted via `@fontsource-variable`):**
- Headings: **Fraunces Variable** (`--font-wl-heading`)
- Body: **Hanken Grotesk Variable** (`--font-wl-body`)
- Code: **Roboto Mono Variable** (`--font-wl-mono`) — used in blog prose only

**Dark mode:** System-only. `prefers-color-scheme` sets the `.dark` class on `<html>`. No localStorage theme toggle.

**Design source of truth:** Figma file `1tg8wIPcvOVC5tPZ8pkGO2` — Components page `36:5`; Landing `12:2` (light) / `117:103` (dark); Showcase `12:3`; Service Web `85:103`; Area Abbotsford `85:104`.

### Components

**Do not create new components** for functionality already covered by the `wl/` set. All live pages import from `src/components/wl/`.

**`src/components/wl/` — v3.0 Wavelength component set:**

| Component | Purpose |
|-----------|---------|
| `AuthorCard` | Blog post author bio block |
| `BlogCard` | Blog index entry (title, date, tags, description) |
| `Breadcrumb` | Page breadcrumb trail |
| `CTAButton` | Primary call-to-action button (ink + accent variants) |
| `Callout` | Highlighted information block |
| `Eyebrow` | Small all-caps label above headings |
| `FAQItem` | Expandable FAQ entry (`<details>`/`<summary>`) |
| `FeaturedPostCard` | Blog featured post highlight |
| `FrequencyWave` | SVG waveform decorative element |
| `LinkCard` | Text/icon link card |
| `ProjectCard` | Expandable showcase project card |
| `ServiceCard` | Service offering card |
| `Step` | Numbered process step |
| `Tag` | Taxonomy/category tag badge |

**Chrome (site-wide):**
- `src/components/WaveMark.astro` — brand mark SVG (bare strokes in light; circle-badge in dark)
- `src/components/SEO.astro` — meta tags, OpenGraph, Twitter Card, JSON-LD
- `src/components/layout/SiteHeader.astro` — sticky header, nav, mobile menu
- `src/components/layout/SiteFooter.astro` — always-dark footer with Calendly CTA

### CI/CD

- **GitHub Actions** deploys to GitHub Pages on push to `main`
- **Lighthouse CI** runs on builds with these thresholds: 90%+ for performance, accessibility, best practices, and SEO; URL set is `/` and `/404` only (all other pages are prod-excluded)
- PR preview deployments via `.github/workflows/pr-preview.yml`

### SEO

Automatic sitemap and robots.txt generation via Astro integrations. `/blog`, `/showcase`, `/services/*`, `/areas/*` are filtered from the sitemap. Custom SEO component at `/src/components/SEO.astro` handles meta tags and JSON-LD.

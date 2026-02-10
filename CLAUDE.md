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

This is a **static portfolio/blog site** built with Astro 5 and Tailwind CSS 4. It deploys to GitHub Pages.

### Key Technologies
- **Astro 5** - Static site generator with file-based routing
- **Tailwind CSS 4** - Styling via `@tailwindcss/vite` plugin
- **MDX** - Blog posts with syntax highlighting via `astro-expressive-code`
- **TypeScript** - Strict mode enabled

### Directory Structure

```
/src
├── /components        # Reusable Astro components
│   └── /layout       # Header, Footer, MobileNav
├── /pages            # File-based routing
│   ├── /blog         # Blog index and [slug].astro for posts
│   └── /portfolio    # Portfolio index and [slug].astro
├── /layouts          # BaseLayout.astro (HTML shell)
├── /content/blog     # MDX blog posts
├── /data             # projects.json (portfolio data)
└── /styles           # global.css (Tailwind theme)
```

### Content System

**Blog posts** use Astro Content Collections with Zod validation:
- Location: `/src/content/blog/*.mdx`
- Schema defined in `/src/content.config.ts`
- Required frontmatter: `title`, `description`, `pubDate`, `featuredImage`
- Optional: `tags` (array), `draft` (boolean), `updatedDate`

**Portfolio projects** are stored as JSON in `/src/data/projects.json`.

### Styling

Custom theme defined in `/src/styles/global.css`:
- Dark mode via `.dark` class with localStorage persistence
- Accent colors: yellow (#ffef6a), teal (oklch)
- Fonts: Poppins (headings), Inter (body)

See `/design-system` for full token reference.

### Design System

**Before creating new UI elements:**
1. Check `/design-system` page for existing components
2. Use existing Button, Card, Input, Badge components from `/src/components/ui/`
3. Reference `/design-system.json` for available tokens and component props

**Available components:**
- `Button` - Neobrutalist buttons (variants: yellow, turquoise, magenta; sizes: sm, md, lg)
- `Card` - Container with colored shadow (variants + stacked option)
- `Input` - Form inputs with labels and validation
- `Badge` - Metric display badges

**Design tokens:**
- Colors: yellow, turquoise, magenta (OKLCH-based with dark mode variants)
- Typography: Bricolage Grotesque (headings), DM Sans (body)
- Isometric utilities: iso-shadow, iso-glow, iso-rotate

**Do not create new components** for functionality that existing components already provide.

### CI/CD

- **GitHub Actions** deploys to GitHub Pages on push to `main`
- **Lighthouse CI** runs on builds with these thresholds: 90%+ for performance, accessibility, best practices, and SEO
- PR preview deployments via `.github/workflows/pr-preview.yml`

### SEO

Automatic sitemap and robots.txt generation via Astro integrations. Custom SEO component at `/src/components/SEO.astro` handles meta tags and JSON-LD.

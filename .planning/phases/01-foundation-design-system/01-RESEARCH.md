# Phase 1: Foundation & Design System - Research

**Researched:** 2026-01-26
**Domain:** Astro + Tailwind CSS static site with design system
**Confidence:** HIGH

## Summary

This phase establishes project infrastructure using Astro (currently at v6 beta, v5 stable) with Tailwind CSS v4 via the Vite plugin, deployed to GitHub Pages using the official withastro/action. The design system implements the brand guidelines: black & white photography, yellow/teal accents, playful typography, and mobile-responsive layout with hamburger navigation.

Astro v6 beta was released January 13, 2026, but the stable v5 branch remains production-ready. Tailwind CSS v4 uses a CSS-first configuration model with the `@theme` directive replacing the old JavaScript config for design tokens. The official integration (@astrojs/tailwind) is deprecated for Tailwind v4 - use `@tailwindcss/vite` instead.

**Primary recommendation:** Use Astro v5 (stable) with Tailwind CSS v4 via `@tailwindcss/vite`, configure design tokens with `@theme` directive in CSS, and deploy via withastro/action@v5.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.x (stable) | Static site framework | Content-focused, zero JS by default, excellent build performance |
| Tailwind CSS | 4.x | Utility-first CSS | CSS-first config, native CSS variables, optimal for design systems |
| @tailwindcss/vite | 4.x | Tailwind/Astro integration | Official Vite plugin, replaces deprecated @astrojs/tailwind |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @tailwindcss/typography | 0.5.x | Prose styling | For blog/article content sections |
| sharp | 0.33.x | Image optimization | Bundled with Astro, automatic image processing |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tailwind v4 | Tailwind v3 | v3 has JavaScript config, more tutorials available, but v4 is current and CSS-first |
| Astro v5 | Astro v6 beta | v6 has unified dev/prod server, but still in beta |

**Installation:**
```bash
npm create astro@latest joel-shinness-website
cd joel-shinness-website
npm install tailwindcss @tailwindcss/vite
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/         # Reusable UI components
│   ├── common/        # Buttons, cards, etc.
│   └── layout/        # Header, Footer, MobileNav
├── layouts/           # Page templates (BaseLayout.astro)
├── pages/             # Route pages (index.astro, etc.)
├── styles/            # CSS files
│   └── global.css     # Tailwind imports + @theme tokens
└── assets/            # Images processed by Astro
public/                # Static assets (fonts, favicons)
.github/
└── workflows/
    └── deploy.yml     # GitHub Pages deployment
```

### Pattern 1: CSS-First Design Tokens
**What:** Define all brand colors, fonts, and spacing in `@theme` directive
**When to use:** Always for design system values
**Example:**
```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  /* Brand Colors */
  --color-accent-yellow: oklch(0.85 0.18 85);
  --color-accent-teal: oklch(0.65 0.15 180);
  --color-bg-light: #ffffff;
  --color-bg-dark: #0a0a0a;
  --color-text-light: #0a0a0a;
  --color-text-dark: #fafafa;

  /* Typography */
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
}

/* Dark mode custom variant */
@custom-variant dark (&:where(.dark, .dark *));
```
Source: https://tailwindcss.com/docs/theme

### Pattern 2: BaseLayout with Dark Mode Support
**What:** Single layout that handles both light/dark themes
**When to use:** All pages
**Example:**
```astro
---
// src/layouts/BaseLayout.astro
import "../styles/global.css";

interface Props {
  title: string;
  description?: string;
}

const { title, description = "Joel Shinness - Technology Partner" } = Astro.props;
---
<!DOCTYPE html>
<html lang="en" class="">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
    <script is:inline>
      // Prevent FOUC - runs before page renders
      document.documentElement.classList.toggle(
        "dark",
        localStorage.theme === "dark" ||
          (!("theme" in localStorage) &&
           window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    </script>
  </head>
  <body class="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
    <slot />
  </body>
</html>
```
Source: https://tailwindcss.com/docs/dark-mode

### Pattern 3: Mobile Hamburger Menu
**What:** Slide-in navigation panel with animated hamburger icon
**When to use:** Mobile viewport navigation
**Example:**
```astro
---
// src/components/layout/MobileNav.astro
---
<nav class="md:hidden">
  <button
    id="menu-toggle"
    class="p-2 min-w-[44px] min-h-[44px]"
    aria-label="Menu"
    aria-expanded="false"
  >
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
  </button>

  <div
    id="mobile-menu"
    class="fixed inset-0 bg-bg-light dark:bg-bg-dark transform translate-x-full transition-transform duration-300 ease-in-out z-50"
  >
    <button id="menu-close" class="absolute top-4 right-4 p-2" aria-label="Close menu">
      <!-- X icon -->
    </button>
    <ul class="flex flex-col items-center justify-center h-full gap-8 text-2xl">
      <li><a href="/" class="hover:text-accent-yellow">Home</a></li>
      <li><a href="/about" class="hover:text-accent-yellow">About</a></li>
      <li><a href="/portfolio" class="hover:text-accent-yellow">Portfolio</a></li>
      <li><a href="/contact" class="hover:text-accent-yellow">Contact</a></li>
    </ul>
  </div>
</nav>

<style>
  .hamburger-line {
    @apply block w-6 h-0.5 bg-current transition-all duration-200;
  }
  .hamburger-line + .hamburger-line {
    @apply mt-1.5;
  }
  [aria-expanded="true"] .hamburger-line:nth-child(1) {
    @apply rotate-45 translate-y-2;
  }
  [aria-expanded="true"] .hamburger-line:nth-child(2) {
    @apply opacity-0;
  }
  [aria-expanded="true"] .hamburger-line:nth-child(3) {
    @apply -rotate-45 -translate-y-2;
  }
</style>

<script>
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const close = document.getElementById('menu-close');

  toggle?.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isExpanded));
    menu?.classList.toggle('translate-x-full');
    menu?.classList.toggle('translate-x-0');
  });

  close?.addEventListener('click', () => {
    toggle?.setAttribute('aria-expanded', 'false');
    menu?.classList.add('translate-x-full');
    menu?.classList.remove('translate-x-0');
  });
</script>
```
Source: Community best practices for accessible hamburger menus

### Anti-Patterns to Avoid
- **Over-hydrating components:** Don't add `client:load` to components that don't need interactivity. Use static Astro components by default.
- **@astrojs/tailwind for v4:** This integration is deprecated. Use `@tailwindcss/vite` directly.
- **JavaScript config for Tailwind v4:** Don't create tailwind.config.js. Use `@theme` directive in CSS instead.
- **Accessing window/document in component body:** Framework components render server-side. Use lifecycle hooks or `client:` directives.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom resize scripts | Astro's built-in `<Image />` | Handles WebP/AVIF, lazy loading, sizing |
| Dark mode toggle | Custom CSS variables | Tailwind `dark:` variant + class strategy | Consistent, tested, handles edge cases |
| Responsive breakpoints | Custom media queries | Tailwind responsive prefixes (`md:`, `lg:`) | Standardized, maintainable |
| Type scale | Custom font-size values | Tailwind `text-*` utilities | Consistent scaling, tested readability |
| Icon system | Custom SVG management | @iconify/astro or astro-icon | Tree-shakable, consistent API |
| Deployment workflow | Custom GitHub Actions | withastro/action | Maintained, handles edge cases |

**Key insight:** Astro and Tailwind provide comprehensive solutions for common web patterns. Custom implementations create maintenance burden and miss edge cases these tools have already solved.

## Common Pitfalls

### Pitfall 1: Flash of Unstyled Content (FOUC) with Dark Mode
**What goes wrong:** Page briefly flashes light theme before dark mode applies
**Why it happens:** JavaScript runs after HTML renders
**How to avoid:** Add inline script in `<head>` that runs before body renders (see BaseLayout pattern above)
**Warning signs:** Visible flash when loading in dark mode preference

### Pitfall 2: Using Deprecated @astrojs/tailwind with Tailwind v4
**What goes wrong:** Build fails or styles don't apply correctly
**Why it happens:** Old integration doesn't support Tailwind v4's CSS-first approach
**How to avoid:** Use `@tailwindcss/vite` plugin in astro.config.mjs
**Warning signs:** Error messages about PostCSS or missing config

### Pitfall 3: Missing Tailwind Import in Layout
**What goes wrong:** No Tailwind classes work anywhere
**Why it happens:** Forgot to import global.css in BaseLayout
**How to avoid:** Always import `../styles/global.css` in BaseLayout.astro frontmatter
**Warning signs:** Classes like `text-xl` have no effect

### Pitfall 4: GitHub Pages Base Path Misconfiguration
**What goes wrong:** Assets 404, links broken after deploy
**Why it happens:** Repository isn't at root domain (username.github.io/repo-name)
**How to avoid:** Set `base: '/repo-name'` in astro.config.mjs if not using custom domain
**Warning signs:** Works locally, breaks on GitHub Pages

### Pitfall 5: Non-Accessible Hamburger Menu
**What goes wrong:** Screen readers can't use navigation, keyboard users stuck
**Why it happens:** Using `<div>` instead of `<button>`, missing aria attributes
**How to avoid:** Use `<button>` with `aria-label`, `aria-expanded`, minimum 44x44px touch target
**Warning signs:** Can't tab to menu button, no screen reader announcement

### Pitfall 6: Grayscale Filter on Wrong Element
**What goes wrong:** Filter affects child text or breaks layout
**Why it happens:** Applied grayscale to container instead of image
**How to avoid:** Apply `grayscale` class directly to `<img>` element only
**Warning signs:** Text inside image containers appears gray

## Code Examples

Verified patterns from official sources:

### Astro Configuration with Tailwind v4
```javascript
// astro.config.mjs
// Source: https://tailwindcss.com/docs/installation/framework-guides/astro
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: 'https://username.github.io',
  // base: '/repo-name', // Uncomment if not using custom domain
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Global CSS with Design Tokens
```css
/* src/styles/global.css */
/* Source: https://tailwindcss.com/docs/theme */
@import "tailwindcss";

@theme {
  /* Yellow accent - warm, energetic for CTAs */
  --color-accent-yellow: oklch(0.85 0.18 85);
  --color-accent-yellow-hover: oklch(0.80 0.20 85);

  /* Teal accent - calm, complementary */
  --color-accent-teal: oklch(0.65 0.15 180);
  --color-accent-teal-hover: oklch(0.60 0.17 180);

  /* Backgrounds - pure contrast */
  --color-bg-light: #ffffff;
  --color-bg-dark: #0a0a0a;

  /* Text colors */
  --color-text-light: #171717;
  --color-text-dark: #fafafa;
  --color-text-muted-light: #525252;
  --color-text-muted-dark: #a3a3a3;

  /* Typography - bold & friendly headings, readable body */
  --font-heading: 'Poppins', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
}

/* Dark mode variant for class-based toggle */
@custom-variant dark (&:where(.dark, .dark *));
```

### B&W Photography with Border
```astro
---
// Source: https://tailwindcss.com/docs/filter-grayscale
---
<figure class="border border-text-light dark:border-text-dark">
  <img
    src="/images/project.jpg"
    alt="Project screenshot"
    class="grayscale w-full h-auto"
  />
</figure>
```

### Responsive Typography
```astro
---
// Moderate scaling on mobile per CONTEXT.md decision
---
<h1 class="font-heading font-bold text-3xl md:text-4xl lg:text-5xl">
  Headline Text
</h1>
<p class="font-body text-base md:text-lg leading-relaxed">
  Body text with good line height for readability.
</p>
```

### GitHub Actions Workflow
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
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v5
      - name: Build with Astro
        uses: withastro/action@v5

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

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| @astrojs/tailwind integration | @tailwindcss/vite plugin | Tailwind v4 (2024) | Must use Vite plugin, not Astro integration |
| tailwind.config.js | @theme directive in CSS | Tailwind v4 (2024) | Design tokens in CSS, not JavaScript |
| darkMode: 'class' in config | @custom-variant in CSS | Tailwind v4 (2024) | Dark mode configured in CSS |
| Zod 3 for schemas | Zod 4 | Astro v6 beta (Jan 2026) | Content collections use Zod 4 |
| Separate dev/prod servers | Unified dev server | Astro v6 beta (Jan 2026) | More consistent behavior |

**Deprecated/outdated:**
- **@astrojs/tailwind:** Deprecated for Tailwind v4. Use @tailwindcss/vite.
- **tailwind.config.js:** Still works but CSS-first @theme is the v4 standard.
- **Node 18/20:** Astro v6 requires Node 22+ (v5 still supports Node 18+).

## Open Questions

Things that couldn't be fully resolved:

1. **Exact yellow/teal hex values**
   - What we know: CONTEXT.md specifies yellow as primary accent, teal as secondary
   - What's unclear: Client hasn't provided specific brand colors
   - Recommendation: Start with oklch values shown in examples, adjust based on visual review

2. **Specific Google Font selection**
   - What we know: Need "bold & friendly" rounded sans-serif for headings, readable body font
   - What's unclear: Final font choice is Claude's discretion per CONTEXT.md
   - Recommendation: Use Poppins (headings) + Inter (body) - both Google Fonts, well-paired, match requirements

3. **Astro v5 vs v6 beta**
   - What we know: v6 beta released Jan 13, 2026 with improved dev server
   - What's unclear: Timeline for v6 stable
   - Recommendation: Use v5 stable for production; v6 is safe but still beta

## Sources

### Primary (HIGH confidence)
- https://docs.astro.build/en/getting-started/ - Astro setup and structure
- https://docs.astro.build/en/guides/deploy/github/ - GitHub Pages deployment
- https://tailwindcss.com/docs/installation/framework-guides/astro - Tailwind + Astro integration
- https://tailwindcss.com/docs/theme - Tailwind v4 theme variables
- https://tailwindcss.com/docs/dark-mode - Dark mode configuration
- https://tailwindcss.com/docs/filter-grayscale - Grayscale filter utilities

### Secondary (MEDIUM confidence)
- https://astro.build/blog/astro-6-beta/ - Astro v6 beta announcement
- https://github.com/withastro/action - Official GitHub Action documentation
- https://www.landingpageflow.com/post/google-font-pairings-for-websites - Font pairing recommendations

### Tertiary (LOW confidence)
- WebSearch results on hamburger menu accessibility patterns - community best practices
- WebSearch results on Astro troubleshooting - aggregated common issues

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official documentation verified for all tools
- Architecture: HIGH - Patterns from official docs and verified guides
- Pitfalls: MEDIUM - Mix of official troubleshooting and community experience

**Research date:** 2026-01-26
**Valid until:** 2026-02-26 (Astro/Tailwind are fast-moving; re-verify if delayed)

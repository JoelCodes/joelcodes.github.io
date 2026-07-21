# Stack Research

**Domain:** Static portfolio/agency site — full visual design overhaul (v1.4)
**Researched:** 2026-05-14
**Confidence:** HIGH (all critical claims verified against official Astro docs, Tailwind v4 docs, npm registry, or motion.dev official site)

---

## Context

This is a SUBSEQUENT MILESTONE research document. The base stack is locked and not re-researched. The questions answered here are strictly about what to ADD or CHANGE to support the v1.4 design overhaul of an existing Astro 5.16 / Tailwind CSS 4.1 site.

**Locked base stack (verified in package.json):**
- `astro@^5.16.15` + `@tailwindcss/vite@^4.1.18` + `tailwindcss@^4.1.18`
- `@astrojs/mdx`, `astro-expressive-code`, `@astrojs/sitemap`, `astro-robots-txt`
- `@lucide/astro`, `simple-icons-astro`, TypeScript strict
- Playwright + `@axe-core/playwright` for CI accessibility testing
- GitHub Pages (static-only, no SSR)

**Crito typography note:** The Crito .pen file must be inspected via Pencil MCP during the design system phase (Phase 23) to confirm exact font names before installing @fontsource packages. The analysis below documents the recommended strategy and likely candidates based on the agency template category; font names are flagged as MEDIUM confidence.

---

## Recommended Additions for v1.4

### 1. Font Hosting

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| `@fontsource-variable/*` | latest | Self-hosted variable fonts | Zero CDN round-trip, GDPR safe, version-locked, works at build time for GitHub Pages static output |
| `@fontsource/*` | latest | Self-hosted static fonts (fallback if variable not available) | Same benefits; use only when variable font unavailable on Fontsource |

**Recommended strategy: `@fontsource-variable/*` packages, NOT the Astro experimental Fonts API.**

Rationale: The Astro Fonts API was introduced as **experimental** in Astro 5.7 (April 2025). It reached **stable** only in Astro 6.0 (March 2026), which requires Node 22 and Vite 7 — a breaking upgrade from the current stack. Using the experimental flag on Astro 5.x for a production site with 100% Lighthouse targets is inadvisable. `@fontsource-variable/*` packages achieve the same outcome (fonts self-hosted from `node_modules`, served via the `_astro/` output path) without the experimental risk. They are used by the Fontsource provider inside the Astro Fonts API anyway.

**Likely Crito fonts (MEDIUM confidence — verify in .pen file before installing):**
- Display/heading: `@fontsource-variable/plus-jakarta-sans` — geometric sans-serif common in contemporary agency templates
- Body: `@fontsource-variable/inter` or `@fontsource/dm-sans` — both common clean body pairings in this category
- Serif accent (if used): `@fontsource/dm-serif-display` — popular display serif in Figma agency templates

**Import pattern in `src/layouts/BaseLayout.astro` (or a shared Head component):**
```ts
import "@fontsource-variable/plus-jakarta-sans";        // wght axis, all weights
import "@fontsource-variable/inter";                     // wght axis, all weights
```

**CSS variable declaration in `src/styles/global.css` under `@theme`:**
```css
@theme {
  --font-heading: 'Plus Jakarta Sans Variable', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'Inter Variable', ui-sans-serif, system-ui, sans-serif;
}
```

**No new Astro integrations needed** — fontsource packages are standard npm imports; Astro's Vite pipeline bundles the CSS automatically.

---

### 2. Component Library Coexistence (v1 + v2 namespacing)

**No new packages needed.** This is a directory + CSS token convention problem, solved entirely within the existing Tailwind v4 + Astro setup.

**Approach: Dual `@theme` namespace with v2-prefixed tokens**

Tailwind v4's `@theme` directive emits all token variables to `:root`. Old and new tokens coexist without collision as long as variable names differ. The clean approach:

```css
/* src/styles/global.css — existing v1 tokens stay untouched */
@theme {
  --color-yellow: oklch(0.85 0.18 95);   /* v1 — kept until migration complete */
  --font-heading: 'Bricolage Grotesque', ...;

  /* v2 tokens added alongside — new namespace prefix */
  --color-v2-primary: oklch(...);
  --color-v2-neutral-900: oklch(...);
  --font-v2-heading: 'Plus Jakarta Sans Variable', ...;
  --font-v2-body: 'Inter Variable', ...;
}
```

v2 Tailwind utility classes are generated automatically: `bg-v2-primary`, `text-v2-neutral-900`, `font-v2-heading`.

**Component directory convention:**
```
src/components/
  ui/             # v1 components (Button, Card, Input, Badge) — untouched
  v2/             # New v2 components built to new design system
    Button.astro
    Card.astro
    ...
```

Pages migrate one at a time. When a page imports from `src/components/v2/`, it uses v2 tokens. When it imports from `src/components/ui/`, it uses v1. No Tailwind scoping plugins needed — the prefix approach is sufficient.

**`@theme inline` for cross-token references (Tailwind v4 pattern):**
```css
@theme inline {
  --font-v2-heading: var(--font-plus-jakarta-sans);  /* references fontsource-injected var */
}
```
Use `@theme inline` when a theme variable references another CSS variable — this prevents resolution failures in nested contexts.

**Deletion phase:** After all pages migrate to v2, a single PR removes the `--color-yellow`, `--color-turquoise`, `--color-magenta` etc. block from `@theme`, and deletes `src/components/ui/`. The `--v2-` prefix can be dropped in the same PR via a find-and-replace.

**CSS `@scope` — NOT recommended for this use case.** `@scope` is useful for shadow-DOM-like isolation in embedded widgets, not for a migration where components are co-authored. It adds complexity without benefit here. Tailwind v4's `@layer` has no awareness of component scope either — layers are a cascade ordering mechanism, not a component isolation mechanism.

---

### 3. Image Optimization for Agency Layouts

**No new packages needed.** Astro 5.10 shipped responsive images as stable. The existing `astro:assets` pipeline covers everything.

**Stable features in current Astro 5.16.x (verified):**

| Feature | API | Notes |
|---------|-----|-------|
| Responsive srcset + sizes | `<Image layout="full-width" />` | Stable since 5.10; generates srcset/sizes automatically |
| LCP priority | `<Image priority />` | Sets `loading="eager"`, `decoding="sync"`, `fetchpriority="high"` |
| Multi-format output | `<Picture formats={['avif', 'webp']} />` | Use for hero images; AVIF ~50% smaller than WebP |
| Sharp default service | Built-in | No configuration needed; sharp is Astro's default image service |

**Recommended pattern for hero images (LCP element):**
```astro
---
import { Image } from 'astro:assets';
import heroImg from '../assets/hero.jpg';
---
<Image
  src={heroImg}
  alt="..."
  layout="full-width"
  priority
  widths={[640, 1024, 1440, 1920]}
/>
```

**For project showcase galleries:**
```astro
<Picture
  src={projectImg}
  formats={['avif', 'webp']}
  alt="..."
  layout="constrained"
  width={800}
  widths={[400, 800]}
/>
```

**Blur-up / LQIP placeholders:** Astro 5.x has no built-in LQIP. The `placeholder="blur"` option does NOT exist in `astro:assets` as of Astro 5.16 (confirmed: not in official docs). External options exist (`thumbhash` + inline script, ~2.5kb overhead) but add JS complexity. Recommendation: skip LQIP for v1.4 given existing 100% Lighthouse scores. Re-evaluate if scores drop after adding hero imagery.

**Sharp configuration:** No custom `sharp` config needed. Astro's defaults (quality 80, format conversion) are appropriate. If fine-tuning is needed later, `astro.config.mjs` accepts an `image.service` option, but this is not needed for v1.4.

**No new image packages to install.** `sharp` ships as an Astro dependency.

---

### 4. Animation and Interaction

**Recommendation: CSS-first with native Intersection Observer. No Motion/GSAP.**

Rationale: Adding Motion (formerly Framer Motion) requires its React flavor to need `@astrojs/react` integration (+React runtime cost), or its vanilla JS flavor (`motion` package, 18kb gzipped for hybrid `animate()`). Either approach conflicts with the Lighthouse 90+ constraint and adds JS weight to a currently zero-framework static site.

**What to use instead:**

| Technique | Mechanism | Cost | Use For |
|-----------|-----------|------|---------|
| CSS `@starting-style` + `transition` | Native CSS | 0kb | Fade-in on mount, panel reveals |
| CSS `animation` + `@keyframes` | Native CSS | 0kb | Hero text entrance, hover micro-interactions |
| Intersection Observer API (inline `<script>`) | ~0.5kb per usage | Per-component | Scroll-reveal sections |
| Astro View Transitions (`@view-transition { navigation: auto; }`) | CSS only, native browser | 0kb | Page-to-page transitions |
| `prefers-reduced-motion` media query | Native CSS | 0kb | Accessibility compliance |

**View Transitions implementation for v1.4 (CSS-only, stable):**
```css
/* In src/layouts/BaseLayout.astro <style is:global> */
@view-transition {
  navigation: auto;
}
```
Browser support: Chrome 126+, Edge 126+, Safari 18+ (85%+ global). Graceful degradation — unsupported browsers get standard navigation.

**Scroll-reveal pattern (Intersection Observer, no framework):**
```astro
<!-- In any Astro component -->
<div class="reveal-on-scroll opacity-0 translate-y-4 transition-all duration-500">
  ...
</div>

<script>
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.remove('opacity-0', 'translate-y-4');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
</script>
```

**`prefers-reduced-motion` pattern (required for WCAG 2.3.3):**
```css
@media (prefers-reduced-motion: reduce) {
  .reveal-on-scroll {
    transition: none;
    opacity: 1;
    transform: none;
  }
}
```

**`@starting-style` (Tailwind v4 compatible, Chrome 117+, Safari 17.5+):**
```css
.card {
  transition: opacity 0.3s, transform 0.3s;
  @starting-style {
    opacity: 0;
    transform: translateY(8px);
  }
}
```
Applies only at initial paint — no JS needed for mount animations.

**What NOT to add:** Motion/Framer Motion (React dependency or 18kb vanilla), GSAP (39kb+), AOS library (adds JS + CSS, reinvents Intersection Observer), Anime.js. All add payload that competes with Lighthouse performance budget.

---

### 5. CSS Design Token System for v1.4

**No new packages needed.** Tailwind v4's `@theme` directive is the complete solution.

**v1.4 token architecture — three-layer pattern:**

```
Layer 1: Raw values (--primitive-*)     → Exact color/size values, not semantic
Layer 2: Semantic tokens (--color-*)    → Tailwind utility class generators, --v2- prefix during migration
Layer 3: Component aliases (in @layer)  → .btn-primary { @apply bg-v2-primary ... }
```

**Recommended `@theme` structure for v1.4:**

```css
@theme {
  /* === EXISTING v1 TOKENS — left untouched until migration === */
  --color-yellow: oklch(0.85 0.18 95);
  /* ... all current v1 tokens ... */

  /* === v2 PRIMITIVE VALUES === */
  --primitive-v2-neutral-50:  oklch(0.98 0 0);
  --primitive-v2-neutral-900: oklch(0.12 0 0);
  --primitive-v2-accent-hue:  oklch(0.60 0.18 240);  /* actual values from .pen file */

  /* === v2 SEMANTIC TOKENS (generate Tailwind utilities) === */
  --color-v2-bg:        var(--primitive-v2-neutral-50);
  --color-v2-text:      var(--primitive-v2-neutral-900);
  --color-v2-accent:    var(--primitive-v2-accent-hue);

  /* === v2 TYPOGRAPHY === */
  --font-v2-heading: 'Plus Jakarta Sans Variable', ui-sans-serif, system-ui, sans-serif;
  --font-v2-body:    'Inter Variable', ui-sans-serif, system-ui, sans-serif;

  /* === v2 SPACING (if different from Tailwind defaults) === */
  --spacing-v2-section: 6rem;   /* agency-style generous section padding */
}
```

**Why this structure satisfies the three design goals:**

| Goal | How Met |
|------|---------|
| Parity with .pen file variables | Primitive layer mirrors .pen variable names directly |
| Future dark mode without restructuring | Add `@custom-variant dark (&:where(.dark, .dark *));` (already in global.css) and add `--color-v2-bg-dark:` etc. alongside light tokens — no restructuring needed |
| Clean alongside-old-tokens transition | `--v2-` prefix prevents collision; deletion is a single `@theme` block removal after migration |

**After migration complete:** rename pass removes `--v2-` prefix (find-and-replace in `global.css` and all `v2/` components), deletes old v1 `@theme` block.

**`@theme inline` for font variable references:**
```css
@theme inline {
  --font-v2-heading: var(--font-plus-jakarta-sans);
}
```
Use `inline` when the theme variable's value is itself a CSS variable (prevents broken lookups in nested selector contexts).

---

## Full Installation Summary

```bash
# Fonts — install AFTER confirming exact font names from .pen file in Phase 23
npm install @fontsource-variable/plus-jakarta-sans
npm install @fontsource-variable/inter

# Optional if serif display accent font used in Crito:
npm install @fontsource/dm-serif-display

# No other new packages needed for v1.4
```

**No changes to `astro.config.mjs`** — fontsource packages are CSS imports handled by Vite, not Astro integrations.

---

## Alternatives Considered

| Recommended | Alternative | Why Not |
|-------------|-------------|---------|
| `@fontsource-variable/*` | Astro experimental Fonts API | Experimental in Astro 5.x; stable only in Astro 6.0 (requires Node 22 + Vite 7 upgrade — too risky for v1.4) |
| `@fontsource-variable/*` | Google Fonts CDN | Extra DNS round-trip, no privacy guarantee, cache partitioning eliminated CDN sharing benefit in modern browsers |
| CSS Intersection Observer | Motion (vanilla JS) | 18kb gzip for hybrid animate(); conflicts with Lighthouse perf budget on a static site |
| CSS Intersection Observer | GSAP | 39kb+ gzip; overkill for scroll reveals and hover effects |
| CSS Intersection Observer | AOS library | Reinvents native Intersection Observer; ~6kb JS + CSS for no extra benefit |
| `--v2-` token prefix in `@theme` | CSS `@scope` for component isolation | `@scope` is for embedded/injected widgets; adds complexity without benefit in a co-authored migration |
| `astro:assets` `<Image layout>` | `@unpic/astro` | `@unpic/astro` adds an external dependency for something Astro 5.10 handles natively; use core features first |
| `astro:assets` `<Image layout>` | `astro-imagetools` | Unmaintained; last commit 2022; superseded by `astro:assets` |
| View Transitions CSS `@view-transition` | `<ViewTransitions />` component | The component-based approach requires JS injection; zero-JS CSS approach works for static MPA with no `transition:persist` needs |

---

## What NOT to Add

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `@astrojs/react` | Adds React runtime to a zero-framework static site; destroys Lighthouse perf budget | Astro components for all v2 UI |
| Motion / Framer Motion | Requires React or 18kb vanilla JS; animation complexity not justified by Crito reference | CSS `@starting-style` + `transition` + Intersection Observer |
| GSAP | 39kb+ gzip; enterprise animation library for hover effects on a portfolio site is massive overkill | CSS keyframes + `transition` |
| Astro experimental Fonts API (`experimental.fonts`) | Still experimental in Astro 5.x; stable only after Node 22 upgrade (Astro 6.0) | `@fontsource-variable/*` npm packages |
| `@tailwindcss/typography` plugin | v1.4 design has custom prose styles; the plugin generates opinionated defaults that conflict with agency aesthetics and require significant overrides | Custom `@layer components` prose rules |
| Any CSS-in-JS library | Static site context; all styling is build-time | Tailwind utilities + custom `@layer` rules |
| Dark mode tooling (next-themes, etc.) | Dark mode explicitly deferred to v1.5+ | Deferred; `@custom-variant dark` already in global.css for when needed |
| CMS or headless content layer | Static-only hosting; Joel edits code directly | Content collections (already in place) |

---

## Version Compatibility Notes

| Package | Current Version | Compatibility Notes |
|---------|-----------------|---------------------|
| `astro` | ^5.16.15 | Responsive images stable (5.10+), Fonts API experimental — do NOT upgrade to 6.0 in v1.4 |
| `tailwindcss` | ^4.1.18 | `@theme`, `@layer`, `@theme inline` all stable |
| `@tailwindcss/vite` | ^4.1.18 | Must match `tailwindcss` version exactly |
| `@fontsource-variable/*` | latest | No Astro version dependency; pure CSS npm packages |
| `@fontsource/*` | latest | Same as above |

---

## Sources

- Official Astro docs: https://docs.astro.build/en/guides/images/ — Image/Picture component, `layout` prop, `priority` prop, stable in 5.10 (Verified 2026-05-14)
- Astro 5.10 blog: https://astro.build/blog/astro-5100/ — responsive images stable, `priority` prop confirmed (Verified 2026-05-14)
- Astro 6.0 blog: https://astro.build/blog/astro-6/ — Fonts API stable in 6.0, requires Node 22 + Vite 7 (Verified 2026-05-14)
- Astro experimental Fonts API docs: https://docs.astro.build/en/reference/experimental-flags/fonts/ — config syntax, Font component, caching behavior (Verified 2026-05-14)
- Zero-JS View Transitions blog: https://astro.build/blog/future-of-astro-zero-js-view-transitions/ — `@view-transition { navigation: auto }` pattern, browser support (Verified 2026-05-14)
- Tailwind v4 @theme docs: https://tailwindcss.com/docs/theme — namespace conventions, `@theme inline`, migration patterns (Verified 2026-05-14)
- Fontsource install docs: https://fontsource.org/docs/getting-started/install — `@fontsource-variable/*` import pattern (Verified 2026-05-14)
- motion.dev: https://motion.dev/ — vanilla JS support confirmed, hybrid animate() = 18kb gzip (Verified 2026-05-14)
- LQIP in Astro (Pinelab.studio): https://pinelab.studio/blog/implementing-low-quality-image-placeholders-lqip-in-astro/ — ThumbHash pattern, ~2.5kb inline script (MEDIUM confidence — single source)
- Fontsource @fontsource-variable/plus-jakarta-sans on npm: https://www.npmjs.com/package/@fontsource-variable/plus-jakarta-sans
- Fontsource @fontsource-variable/inter on npm: https://www.npmjs.com/package/@fontsource-variable/inter

---
*Stack research for: v1.4 Design Overhaul — Joel Shinness Website*
*Researched: 2026-05-14*

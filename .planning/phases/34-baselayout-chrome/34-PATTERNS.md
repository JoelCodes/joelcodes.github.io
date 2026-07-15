# Phase 34: BaseLayout + Chrome - Pattern Map

**Mapped:** 2026-07-15
**Files analyzed:** 10 new/modified files
**Analogs found:** 10 / 10

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/components/layout/SiteHeader.astro` | component | request-response | `src/components/layout/Header.astro` | role-match |
| `src/components/layout/SiteFooter.astro` | component | request-response | `src/components/layout/Footer.astro` | role-match |
| `src/layouts/BaseLayout.astro` | config | request-response | `src/layouts/BaseLayout.astro` (self — edit existing) | self |
| `src/styles/global.css` | config | transform | `src/styles/global.css` (self — append to existing) | self |
| `astro.config.mjs` | config | transform | `astro.config.mjs` (self — edit existing) | self |
| `src/pages/blog/[slug].astro` | route | request-response | `src/pages/blog/tags/[tag].astro` | exact |
| `src/pages/blog/index.astro` | route | request-response | `src/pages/blog/index.astro` (self — add guard) | self |
| `src/pages/blog/tags/[tag].astro` | route | request-response | `src/pages/blog/[slug].astro` | exact |
| `tests/accessibility/dark-mode.spec.ts` | test | request-response | `tests/accessibility/axe-tests.spec.ts` | role-match |
| `src/pages/faq.astro` (delete) | route | request-response | n/a — file is deleted | n/a |

---

## Pattern Assignments

### `src/components/layout/SiteHeader.astro` (component, request-response)

**Analog:** `src/components/layout/Header.astro`

The old Header is the closest structural analog: `<header>` landmark, sticky positioning, Tailwind utilities for height/layout, desktop nav + mobile treatment, and a `<script>` block. Phase 34 strips the `<script>` entirely (no toggle, no hamburger) and replaces all old tokens with `--wl-*` tokens.

**Imports pattern** (Header.astro lines 1–3 — the component frontmatter structure):
```astro
---
import WaveMark from '../WaveMark.astro';
const BOOKING_URL = '#book'; // placeholder until Phase 37 wires IA-03
const isDev = import.meta.env.DEV;
---
```
Note: `WaveMark` replaces the old `MobileNav` import. No `<script>` block follows the template.

**Core component structure** (Header.astro lines 5–48 — adapt this skeleton):
```astro
<header class="sticky top-0 z-30 h-[60px] bg-bg-light ...">
  <div class="container mx-auto px-4 h-full flex items-center justify-between">
    <!-- Logo / home link -->
    <a href="/" class="...">Joel Shinness</a>

    <!-- Desktop navigation -->
    <nav class="hidden md:flex items-center space-x-6">
      <a href="/blog" class="...">Blog</a>
      ...
    </nav>

    <!-- Mobile navigation -->
    <MobileNav />
  </div>
</header>
```

**What changes for SiteHeader:** Replace old values with the Figma-extracted spec from 34-UI-SPEC.md:

| Old Header | New SiteHeader |
|-----------|---------------|
| `h-[60px]` | `h-16` (64px) |
| `bg-bg-light dark:bg-bg-dark` | `bg-wl-sea-glass` (no `dark:` prefix — token flips automatically) |
| `border-b-[3px] border-text-light dark:border-text-dark` | `border-b border-wl-accent` (1px, full accent, per node 42:29) |
| `container mx-auto px-4` | `max-w-[1440px] mx-auto` with responsive padding: `px-[160px]` desktop / `px-5` mobile |
| `<MobileNav />` | No mobile nav component — mobile handled inline by hiding wordmark + showing only Showcase + CTA |
| `hidden md:flex items-center space-x-6` | `flex items-center` with `gap-[26px]` desktop nav, `gap-[18px]` mobile nav |
| `font-heading font-bold text-text-light` | `.wl-nav-link text-wl-ink` |
| `hover:text-accent-yellow` | `hover:text-wl-accent` |
| Dark mode toggle `<button id="theme-toggle">` | **Removed entirely** (D-05) |

**Wordmark pattern** (new — no existing analog):
```astro
<!-- Desktop: mark + wordmark. Mobile: mark only per D-02 -->
<a href="/" class="flex items-center gap-[10px]" aria-label="Joel Shinness Solutions — home">
  <WaveMark size={30} class="text-wl-accent" />
  <span class="hidden sm:inline wl-wordmark text-wl-ink">Joel Shinness Solutions</span>
</a>
```
- `gap-[10px]` — extracted from Figma node 42:13 (mark-to-wordmark gap)
- `hidden sm:inline` — wordmark visible ≥ 640px, hidden below (Claude's Discretion per CONTEXT.md)
- `aria-label` on the `<a>` required: text is hidden at mobile, keyboard users need description

**Mobile nav pattern** (D-01 — NO hamburger, bar IS the mobile navigation):
```astro
<!-- Desktop nav (≥ sm) — all links + CTA -->
<nav aria-label="Primary navigation"
     class="hidden sm:flex items-center gap-[26px]">
  <a href="/#services" class="wl-nav-link text-wl-ink hover:text-wl-accent">Services</a>
  <a href="/showcase" class="wl-nav-link text-wl-ink hover:text-wl-accent">Showcase</a>
  <a href="/#about" class="wl-nav-link text-wl-ink hover:text-wl-accent">About</a>
  {isDev && <a href="/blog" class="wl-nav-link text-wl-sub hover:text-wl-accent">Blog</a>}
  <!-- CTA: pre-COMP-01 inline-styled <a>; replace with <CTAButton> in Phase 35 -->
  <a href={BOOKING_URL} class="wl-cta-label"
     style="background: var(--color-wl-ink); color: var(--wl-on-ink); padding: 9px 17px; border-radius: 10px; text-decoration: none;">
    Book a call
  </a>
</nav>

<!-- Mobile nav (< sm) — mark + Showcase + CTA only per Figma 42:47 -->
<nav aria-label="Primary navigation"
     class="flex sm:hidden items-center gap-[18px]">
  <a href="/showcase" class="wl-nav-link text-wl-ink hover:text-wl-accent">Showcase</a>
  <a href={BOOKING_URL} class="wl-cta-label"
     style="background: var(--color-wl-ink); color: var(--wl-on-ink); padding: 9px 17px; border-radius: 10px; text-decoration: none;">
    Book a call
  </a>
</nav>
```

**No `<script>` block.** The new SiteHeader has zero client JS (no toggle, no hamburger per D-01/D-05).

**Token safety rule (from CONTEXT.md):** No old tokens (`bg-bg-light`, `font-heading`, `text-text-light`, `dark:bg-bg-dark`, `border-text-light`, `accent-yellow`) may appear in SiteHeader. Use only `wl-*` classes and `var(--color-wl-*)`.

**Focus ring pattern** (from Footer.astro lines 17–28 — adapt for new tokens):
```astro
class="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent"
```
Old header used `focus:shadow-[...]` with old token values. New chrome uses `focus-visible:outline-*` with `--wl-accent`.

---

### `src/components/layout/SiteFooter.astro` (component, request-response)

**Analog:** `src/components/layout/Footer.astro`

The old Footer shows the structural skeleton: `<footer>` landmark, `<nav aria-label="Footer navigation">`, `currentYear` build-time variable, `target="_blank" rel="noopener noreferrer"` on external links, and copyright `<p>`. All token references are replaced.

**Imports / frontmatter pattern** (Footer.astro lines 1–6):
```astro
---
import WaveMark from '../WaveMark.astro';
const currentYear = new Date().getFullYear();
const isDev = import.meta.env.DEV;
---
```
`currentYear` pattern is directly reusable. `WaveMark` replaces the old `Substack` import.

**Core footer structure** (Footer.astro lines 8–74 — adapt this skeleton):
```astro
<footer class="...bg... py-8 mt-auto">
  <div class="container mx-auto px-4">
    <!-- Social icons (old) → mark + wordmark + taglines (new) -->
    <!-- Nav links section with aria-label="Footer navigation" -->
    <!-- Copyright section -->
  </div>
</footer>
```

**What changes for SiteFooter:** The footer is a DARK-BACKGROUND component in both themes (never flips). All colors are local values centralized as CSS custom properties.

**Background and layout** (from 34-UI-SPEC.md):
```astro
<footer style="background-color: var(--wl-footer-bg);">
  <div class="max-w-[1440px] mx-auto"
       style="padding: 45px 160px 29px; /* desktop */ ">
    <!-- Desktop: flex row (space-between); Mobile: flex col -->
  </div>
</footer>
```
Responsive padding uses Tailwind arbitrary values:
- Desktop: `px-[160px]` (extracted from node 42:77)
- Mobile: `px-6` (24px, extracted from node 42:104)
- Vertical: `pt-[45px] pb-[29px]` (extracted from nodes 42:77/42:65)

**Top section: mark + taglines** (new pattern, no old analog):
```astro
<div class="flex flex-col gap-2">
  <a href="/" aria-label="Joel Shinness Solutions — home">
    <WaveMark size={32} class="text-wl-on-ink" />
    <span class="wl-wordmark" style="color: var(--wl-on-ink);">Joel Shinness Solutions</span>
  </a>
  <p class="wl-footer-tagline" style="color: var(--wl-footer-tagline-color);">On your wavelength.</p>
  <p class="wl-footer-body" style="color: var(--wl-footer-text-secondary);">
    Solutions for small businesses — web, automations, and AI that save you time and money.
  </p>
</div>
```
- Left column vertical gap: 8px (node 42:77 extraction)
- Tagline "On your wavelength." is Fraunces italic — uses `.wl-footer-tagline` utility (new, 17px/400/italic/lh1.6)

**Nav links section** (Footer.astro lines 33–61 — adapt pattern):
```astro
<!-- Old: -->
<nav aria-label="Footer navigation" class="flex items-center justify-center gap-4 flex-wrap mb-6">
  <a href="/blog" class="font-heading font-bold text-text-light dark:text-text-dark hover:text-accent-yellow ...">Blog</a>
  <span aria-hidden="true" class="text-text-muted-light dark:text-text-muted-dark">·</span>
  ...
</nav>

<!-- New: no separator spans, use CSS gap, footer-local colors -->
<nav aria-label="Footer navigation" class="flex flex-col gap-2">
  <a href="/#services" class="wl-footer-link" style="color: var(--wl-footer-text-link);">Services</a>
  <a href="/showcase" class="wl-footer-link" style="color: var(--wl-footer-text-link);">Showcase</a>
  <a href="/#about" class="wl-footer-link" style="color: var(--wl-footer-text-link);">About</a>
  {isDev && <a href="/blog" class="wl-footer-link" style="color: var(--wl-footer-text-muted);">Blog</a>}
</nav>
```
Footer nav is a vertical stack in both desktop and mobile (Figma right-column pattern from node 42:77).

**Divider pattern** (new — from 34-UI-SPEC.md):
```astro
<!-- Spacer 27px above divider, 24px below (nodes 42:65) -->
<hr style="border: none; border-top: 1px solid rgba(255,255,255,0.09); margin: 27px 0 24px;" />
```

**Bottom row: email · GitHub + copyright** (Footer.astro lines 63–74 — adapt pattern):
```astro
<!-- Old: -->
<div class="flex flex-col md:flex-row items-center justify-between gap-4">
  <p class="text-text-muted-light dark:text-text-muted-dark text-sm ...">
    &copy; {currentYear} Joel Shinness. All rights reserved.
  </p>
  <p ...>Built with <a href="https://astro.build"...>Astro</a></p>
</div>

<!-- New: email · GitHub row + copyright. "All rights reserved" and Astro credit drop per D-10 -->
<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[22px]">
  <p>
    <a href="mailto:contact@joelshinness.com" class="wl-footer-link"
       style="color: var(--wl-footer-text-link);">contact@joelshinness.com</a>
    <span aria-hidden="true" style="color: var(--wl-footer-text-link);"> · </span>
    <a href="https://github.com/JoelCodes" target="_blank" rel="noopener noreferrer"
       class="wl-footer-link" style="color: var(--wl-footer-text-link);">GitHub</a>
  </p>
  <p class="wl-footer-link" style="color: var(--wl-footer-text-muted);">
    &copy; {currentYear} Joel Shinness
  </p>
</div>
```
- `gap-[22px]` — foot-links gap extracted from node 42:65
- Interpunct is U+00B7 (middle dot) with spaces: ` · `
- `target="_blank" rel="noopener noreferrer"` on GitHub link — from Footer.astro line 13–15, exact pattern

**No `<script>` block.** SiteFooter has zero client JS.

---

### `src/layouts/BaseLayout.astro` (config, request-response)

**Analog:** self — the existing `src/layouts/BaseLayout.astro`

**Current imports block** (lines 1–5 — what to replace):
```astro
---
import '../styles/global.css';
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
import SEO from '../components/SEO.astro';
```

**New imports block** — swap Header/Footer for SiteHeader/SiteFooter:
```astro
---
import '../styles/global.css';
import SiteHeader from '../components/layout/SiteHeader.astro';
import SiteFooter from '../components/layout/SiteFooter.astro';
import SEO from '../components/SEO.astro';
```
Font preload imports (lines 9–11) are untouched.

**Current FOUC script** (lines 62–69 — what to replace):
```astro
<!-- Dark mode script - runs before body renders to prevent FOUC -->
<script is:inline>
  document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
       window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
</script>
```

**New FOUC script** — system-only, clears stale localStorage per D-05/D-06:
```astro
<!-- CRITICAL: must remain in <head>, before <body> — prevents dark-mode FOUC.
     System-only per D-05/D-06. Clears stale localStorage.theme from v1.x/v2.x toggle. -->
<script is:inline>
  if ('theme' in localStorage) {
    delete localStorage.theme;
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  }
</script>
```
Critical constraints: must stay `is:inline`, must stay in `<head>` (before `<body>`), CRITICAL comment must survive every edit. The Google Fonts block (lines 41–59) is untouched this phase (removal is Phase 41).

**Current `<body>` tag** (line 71 — partial change):
```astro
<body class="font-body bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark min-h-screen flex flex-col">
  <Header />
  ...
  <Footer />
```

**New `<body>` usage** — import swap only; `<body>` classes stay for old page compatibility:
```astro
<body class="font-body bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark min-h-screen flex flex-col">
  <SiteHeader />
  <main class="flex-grow">
    <slot />
  </main>
  <SiteFooter />
```

---

### `src/styles/global.css` (config, transform)

**Analog:** self — the existing `src/styles/global.css`

**Existing `@theme` WL block pattern** (lines 13–37 — the block to extend):
```css
@theme {
  /* Wavelength Palette — light values */
  --color-wl-ink:             #12333B;
  --color-wl-sub:             #35525A;
  --color-wl-accent:          #0E7078;
  --color-wl-accent-soft:     #5AA9A5;
  --color-wl-sea-glass:       #E6F1F1;
  --color-wl-sea-glass-deep:  #D2E7E7;
  --color-wl-paper:           #F6FBFA;
  --color-wl-line:            color-mix(in oklch, #0E7078 16%, transparent);
  --color-wl-accent-soft-text: #347E7B;
  /* ... font families ... */
}
```

**New token to ADD to the `@theme` WL block** (insert after `--color-wl-accent-soft-text`):
```css
  /* On-ink text — participates in Figma variable system (node 42:27 --on-ink) */
  /* Used for: CTA button label on ink bg, footer wordmark. Light value #EAF6F3. */
  --color-wl-on-ink: #EAF6F3;
```
Dark mode value: verify from Figma variable dark mode during implementation; likely stays `#EAF6F3` (already a light color designed for dark surfaces).

**Existing `.dark {}` flip block** (lines 41–50 — pattern for extending):
```css
.dark {
  --color-wl-ink:              #EAF6F3;
  --color-wl-sub:              #A9C9C7;
  --color-wl-accent:           #4FB3B8;
  --color-wl-accent-soft:      #7FC4C0;
  --color-wl-sea-glass:        #123640;
  --color-wl-paper:            #0C2228;
  --color-wl-line:             #5AA9A538;
  --color-wl-accent-soft-text: #7FC4C0;
}
```
Add `--color-wl-on-ink` dark value after verifying from Figma.

**Footer-local tokens — add OUTSIDE @theme and OUTSIDE .dark** (static values, never flip):
```css
/* Footer-local color tokens — always dark-background, do NOT flip with .dark.
   Not part of the 8-token --wl-* palette (designer intent: local values per 34-UI-SPEC.md). */
:root {
  --wl-footer-bg:             #0D2A31;
  --wl-footer-tagline-color:  #5AA9A5;
  --wl-footer-text-secondary: #7FA4A2;
  --wl-footer-text-link:      #CDE6E5;
  --wl-footer-text-muted:     #8FB4B2;
  --wl-footer-divider:        rgba(255, 255, 255, 0.09);
}
```
These go in `:root` (not `@theme`) so they are never overridden by the `.dark` block.

**Existing `scroll-margin-top` rule** (line 147 — single value change):
```css
/* Current: */
section[id] {
  scroll-margin-top: 60px;
}

/* New: header height updated from 60px to 64px */
section[id] {
  scroll-margin-top: 64px;
}
```

**New chrome utility classes to ADD to the existing `@layer utilities` block** (after line 712 of current file, following the `.wl-accent-kicker` pattern at lines 700–712):

Pattern template from existing `.wl-accent-kicker` (lines 700–712):
```css
/* ---- Accent / Kicker ---- */
/* specced: 1440=20 only; not observed at 390/768/1920; italic Fraunces */
.wl-accent-kicker {
  font-family: var(--font-wl-heading);
  font-size: 20px;
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0;
  font-style: italic;
  font-variation-settings: "SOFT" 0, "WONK" 1;
}
```

New chrome utilities to add (following this exact commenting + property pattern):
```css
/* ============================================================
   WL CHROME UTILITIES (Phase 34 — header + footer type)
   All sizes extracted from Figma nodes; fidelity gate verifies.
   ============================================================ */

/* ---- Chrome / Wordmark (header + footer) ---- */
/* extracted: 18.4px / Fraunces 400 Regular / node 42:29 */
/* No match in Phase 33 ramp — authoring new chrome-scoped utility */
.wl-wordmark {
  font-family: var(--font-wl-heading);
  font-size: 18.4px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0;
  font-style: normal;
  font-variation-settings: "SOFT" 0, "WONK" 1;
}

/* ---- Chrome / Nav Link (header nav) ---- */
/* extracted: 15px / Hanken Grotesk 500 Medium / node 42:29 */
/* Phase 33 .wl-label-button is 16px/600 — wrong size AND weight; not reused */
.wl-nav-link {
  font-family: var(--font-wl-body);
  font-size: 15px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0;
  font-style: normal;
}

/* ---- Chrome / CTA Label (Book a call button) ---- */
/* extracted: 14px / Hanken Grotesk 600 SemiBold / node 39:30 */
/* Phase 33 .wl-label-button is 16px/600 — wrong size; not reused */
.wl-cta-label {
  font-family: var(--font-wl-body);
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0;
  font-style: normal;
}

/* ---- Chrome / Footer Tagline (On your wavelength.) ---- */
/* extracted: 17px / Fraunces 400 italic / node 42:77 */
/* No match in Phase 33 ramp — .wl-accent-kicker is 20px; authoring new utility */
.wl-footer-tagline {
  font-family: var(--font-wl-heading);
  font-size: 17px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0;
  font-style: italic;
  font-variation-settings: "SOFT" 0, "WONK" 1;
}

/* ---- Chrome / Footer Body (supporting line) ---- */
/* extracted: 14px / Hanken Grotesk 400 Regular / node 42:77 */
/* Phase 33 .wl-text-body is 16px — wrong size; authoring new utility */
.wl-footer-body {
  font-family: var(--font-wl-body);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0;
  font-style: normal;
}

/* ---- Chrome / Footer Link (nav + bottom row) ---- */
/* extracted: 14px / Hanken Grotesk 400 Regular / node 42:77 */
.wl-footer-link {
  font-family: var(--font-wl-body);
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0;
  font-style: normal;
}
```

---

### `astro.config.mjs` (config, transform)

**Analog:** self — the existing `astro.config.mjs`

**Existing `redirects` object** (lines 73–77 — the pattern to extend):
```js
redirects: {
  '/portfolio': '/projects',
  '/portfolio/[slug]': '/projects/[slug]',
  '/contact': '/#contact',
},
```

**New entry to add** (Phase 34 only; `/projects` redirect waits for Phase 40 per RESEARCH.md Pitfall 6):
```js
redirects: {
  '/portfolio': '/projects',           // keep existing
  '/portfolio/[slug]': '/projects/[slug]',  // keep existing
  '/contact': '/#contact',             // keep existing
  '/faq': '/',                         // NEW — safe: faq.astro deleted this phase
},
```
The `/faq` redirect generates a meta-refresh HTML stub at `dist/faq/index.html` on static build. Works on GitHub Pages. `src/pages/faq.astro` must be deleted for the redirect to work cleanly (Pitfall 6 — file vs redirect conflict).

**Existing `sitemap()` integration** (lines 97–101 — the pattern to modify):
```js
sitemap({
  changefreq: 'weekly',
  priority: 0.7,
  lastmod: new Date(),
}),
```

**Updated `sitemap()` with blog filter** (add `filter` as first key):
```js
sitemap({
  filter: (page) => !page.includes('/blog'),
  changefreq: 'weekly',
  priority: 0.7,
  lastmod: new Date(),
}),
```
The `filter` function receives the full URL string (e.g., `https://joelshinness.com/blog/my-post`). The `.includes('/blog')` check excludes all blog pages. Verified against `@astrojs/sitemap` official docs.

---

### `src/pages/blog/[slug].astro` (route, request-response)

**Analog:** `src/pages/blog/tags/[tag].astro` — exact role match (dynamic route with `getStaticPaths`)

**Existing `getStaticPaths` pattern in [tag].astro** (lines 7–24 — this is the pattern to modify):
```astro
export async function getStaticPaths() {
  const allPosts = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  const uniqueTags = [...new Set(allPosts.flatMap(post => post.data.tags))];

  return uniqueTags.map(tag => ({
    params: { tag },
    props: { tag, posts: allPosts.filter(...) }
  }));
}
```

**Existing `getStaticPaths` in [slug].astro** (lines 7–16 — what to replace):
```astro
export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
}
```

**New prod-guard pattern** — insert `if (import.meta.env.PROD) return [];` as the first line inside `getStaticPaths`, before any `getCollection` call:
```astro
export async function getStaticPaths() {
  if (import.meta.env.PROD) return [];  // No blog pages in production (D-13)
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
}
```
Rest of the file (frontmatter, template) is untouched.

---

### `src/pages/blog/tags/[tag].astro` (route, request-response)

**Analog:** `src/pages/blog/[slug].astro` — exact role match (same pattern, same change)

**Existing `getStaticPaths` in [tag].astro** (lines 7–24 — what to modify):
```astro
export async function getStaticPaths() {
  const allPosts = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });
  const uniqueTags = [...new Set(allPosts.flatMap(post => post.data.tags))];
  return uniqueTags.map(tag => ({
    params: { tag },
    props: { tag, posts: allPosts.filter(...) }
  }));
}
```

**New prod-guard pattern** — same `if (import.meta.env.PROD) return [];` insertion:
```astro
export async function getStaticPaths() {
  if (import.meta.env.PROD) return [];  // No blog pages in production (D-13)
  const allPosts = await getCollection('blog', ({ data }) => !data.draft);
  const uniqueTags = [...new Set(allPosts.flatMap(post => post.data.tags))];
  return uniqueTags.map(tag => ({
    params: { tag },
    props: {
      tag,
      posts: allPosts
        .filter(post => post.data.tags.includes(tag))
        .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    }
  }));
}
```

---

### `src/pages/blog/index.astro` (route, request-response)

**Analog:** self — the existing `src/pages/blog/index.astro`

`index.astro` is NOT a dynamic route — there is no `getStaticPaths` to gate. The prod guard uses `Astro.redirect` in the page frontmatter.

**Existing frontmatter start** (lines 1–25 — what to prepend to):
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BlogCard from '../../components/BlogCard.astro';
// ...
const allPosts = await getCollection('blog', ({ data }) => {
  return import.meta.env.PROD ? !data.draft : true;
});
```

**New prod-redirect guard** — add as the very first statement in frontmatter, before any imports:
```astro
---
if (import.meta.env.PROD) {
  return Astro.redirect('/');  // No blog index in production (D-13)
}

import BaseLayout from '../../layouts/BaseLayout.astro';
// ... rest of imports and page logic unchanged
---
```
On static build, `Astro.redirect('/')` generates a meta-refresh HTML file at `dist/blog/index.html` pointing to `/`. The sitemap filter also removes `/blog` from the sitemap. Both gates required per RESEARCH.md Pitfall 3.

---

### `tests/accessibility/dark-mode.spec.ts` (test, request-response)

**Analog:** `tests/accessibility/axe-tests.spec.ts` — role match (Playwright + axe-core test suite)

**Existing test structure in axe-tests.spec.ts** (lines 1–51 — the clean baseline pattern):
```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('Page Accessibility Tests', () => {
  test('Homepage should not have accessibility violations', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);
  });
  // ... repeat per page
});
```

**Current dark-mode.spec.ts broken pattern** (lines 12–32 — what to replace):
```typescript
// BROKEN — #theme-toggle does not exist after Phase 34
test('Homepage in dark mode ...', async ({ page }) => {
  await page.goto('/');
  const themeToggle = page.locator('#theme-toggle');
  await themeToggle.click();          // will throw — element not found
  await page.waitForTimeout(500);     // also remove — waitForTimeout is bad practice
  const html = page.locator('html');
  await expect(html).toHaveClass(/dark/);
  // ...
});
```

**New pattern** — use `browser.newContext({ colorScheme: 'dark' })` instead of DOM toggle. This is the Playwright-idiomatic pattern for testing OS-preference-based dark mode:
```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('Dark Mode Accessibility', () => {
  // All tests use colorScheme browser context — no #theme-toggle exists (D-05)
  test('Homepage in dark mode should not have accessibility violations', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    await page.goto('/');

    // Verify FOUC script set .dark class from OS preference
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();
    expect(results.violations).toEqual([]);
    await context.close();
  });

  test('Projects page in dark mode should not have accessibility violations', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    await page.goto('/projects');
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
    await context.close();
  });

  // Blog test removed: /blog returns 404 in prod; test suite runs against prod build
  // If dev-only test coverage is desired for blog, add a separate dev test block

  test('Homepage in light mode should not have accessibility violations', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'light' });
    const page = await context.newPage();
    await page.goto('/');
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
    await context.close();
  });
});
```
Key changes from old dark-mode.spec.ts:
- `{ page }` fixture → `{ browser }` fixture (to control context)
- `page.locator('#theme-toggle').click()` → `browser.newContext({ colorScheme: 'dark' })`
- `page.waitForTimeout(500)` removed (no transition animation; FOUC script is synchronous)
- Blog dark-mode test removed (blog is 404 in prod; the test target is the prod build)
- `await context.close()` added after each test to release browser resources

---

## Shared Patterns

### WL Token Usage Rule
**Source:** `src/styles/global.css` lines 13–50 + 34-UI-SPEC.md Color Contract
**Apply to:** `SiteHeader.astro`, `SiteFooter.astro`
```
Rule: Use only --wl-* tokens in new chrome. Old tokens (--color-yellow, --color-bg-light,
--color-text-light, etc.) MUST NOT appear in SiteHeader.astro or SiteFooter.astro.
Tailwind classes referencing old tokens (bg-bg-light, text-text-light, font-heading) also banned.

Dark mode: tokens flip automatically via the .dark { --color-wl-* } block in global.css.
No dark: prefix pairs needed in chrome components.
```

### WaveMark Component Usage
**Source:** `src/components/WaveMark.astro` (entire file — 23 lines)
```astro
---
interface Props {
  class?: string;
  size?: number;
}
const { class: className = '', size = 32 } = Astro.props;
---
<svg width={size} height={size} viewBox="0 0 104 104" fill="none" class={className}
     aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  <path d="..." stroke="currentColor" ... />
  ...
</svg>
```
Usage: `<WaveMark size={30} class="text-wl-accent" />` in header; `<WaveMark size={32} class="text-wl-on-ink" />` in footer (note: footer uses `--wl-on-ink` not `--wl-accent` because background is `#0D2A31`).

### `aria-label` on Hidden-Text Logo Links
**Source:** 34-UI-SPEC.md Interaction Contract + 34-RESEARCH.md accessibility checklist
**Apply to:** Both SiteHeader.astro and SiteFooter.astro logo links
```astro
<!-- Required: wordmark text is hidden at mobile; logo <a> must have accessible name -->
<a href="/" aria-label="Joel Shinness Solutions — home">
  <WaveMark ... />
  <span class="hidden sm:inline ...">Joel Shinness Solutions</span>
</a>
```

### `<nav aria-label>` Landmark Differentiation
**Source:** `src/components/layout/Footer.astro` line 33 — `aria-label="Footer navigation"`
**Apply to:** SiteHeader.astro and SiteFooter.astro
```astro
<!-- Header: -->
<nav aria-label="Primary navigation">

<!-- Footer: -->
<nav aria-label="Footer navigation">
```
Two `<nav>` landmarks on same page require distinct `aria-label` values (WCAG 2.4.1 — bypass blocks).

### External Link Pattern
**Source:** `src/components/layout/Footer.astro` lines 13–15
**Apply to:** GitHub link in SiteFooter.astro
```astro
target="_blank" rel="noopener noreferrer"
```

### Focus-Visible Ring Pattern (New Token Version)
**Source:** `src/components/layout/Footer.astro` lines 17–18 (old pattern to update)
**Apply to:** All interactive elements in SiteHeader.astro and SiteFooter.astro

Old pattern (do NOT copy):
```astro
focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--color-bg-light),0_0_0_6px_var(--color-text-light)]
```

New pattern (use this):
```astro
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent
```

### `import.meta.env.DEV` Blog Link Gate
**Source:** 34-RESEARCH.md Code Examples + 34-CONTEXT.md D-11/D-12
**Apply to:** Blog nav link in SiteHeader.astro and SiteFooter.astro
```astro
{isDev && <a href="/blog" class="wl-nav-link text-wl-sub ...">Blog</a>}
```
`isDev` is defined as `const isDev = import.meta.env.DEV;` in component frontmatter.

---

## No Analog Found

No files in this phase lack a close codebase analog. All patterns have existing matches as detailed above.

---

## Metadata

**Analog search scope:** `src/components/layout/`, `src/components/WaveMark.astro`, `src/layouts/`, `src/styles/global.css`, `astro.config.mjs`, `src/pages/blog/`, `tests/accessibility/`
**Files scanned:** 12
**Pattern extraction date:** 2026-07-15

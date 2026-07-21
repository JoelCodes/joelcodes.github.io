# Phase 34: BaseLayout + Chrome — Research

**Researched:** 2026-07-15
**Domain:** Astro 5 site chrome — header, footer, dark-mode FOUC, blog prod-exclusion, static redirects
**Confidence:** HIGH

---

## Summary

Phase 34 delivers the Wavelength chrome (SiteHeader + SiteFooter) to every page via `BaseLayout.astro`, eliminates FOUC, and absorbs two adjacent tasks: gating the blog out of production builds and adding minimal redirects for `/projects` and `/faq`. The phase is heavily grounded in already-completed work — tokens (`--wl-*`), fonts (self-hosted, preloaded), `WaveMark.astro`, and the exact FOUC pattern all exist from Phase 33. The net-new code is Astro component authoring against Figma-extracted specs.

The key technical fact: **no new npm packages are required for this phase**. The header has zero client JS (no hamburger, no toggle). The footer has zero client JS. The FOUC script simplifies from toggle-aware to system-only (two-line edit). Blog exclusion uses the well-documented `getStaticPaths` empty-return in prod pattern, plus a `sitemap()` filter string. Redirects use Astro's `redirects` config and produce meta-refresh HTML stubs on GitHub Pages — acceptable for this site, consistent with the existing `/portfolio` → `/projects` redirect already in `astro.config.mjs`.

The single largest planning risk is **Figma spec extraction for the header and footer**: spacing values, exact colors, and the footer's dark-background treatment must come from the Figma frames (listed in CONTEXT.md) before implementation begins. The Phase 33 FIGMA-EXTRACTION.md contains a head start: footer background in the light mockup is `#0D2A31` (a dark ink tone, not the standard `--wl-paper`), detached text colors `#EAF6F3`/`#7FA4A2`/`#CDE6E5`/`#8FB4B2`, and link size 14px. This is the most important design fact about the footer: **it renders on a dark ink background in both light and dark themes** — there is no light-paper footer.

**Primary recommendation:** Use new `SiteHeader.astro` and `SiteFooter.astro` files (don't edit the old Header.astro/Footer.astro in place) so the old components remain dead-but-intact until Phase 41 cleanup. The `BaseLayout.astro` import swap is the single integration point.

---

## Standard Stack

### Core (unchanged — no new packages)

| Tool | Version | Purpose | Status |
|------|---------|---------|--------|
| Astro 5 | 5.16.x | Static site, file-based routing, `redirects` config | Already installed |
| Tailwind 4 via `@tailwindcss/vite` | 4.1.x | `--wl-*` token utilities, dark mode via `.dark` class | Already installed |
| `@astrojs/sitemap` | current | Sitemap with `filter()` for blog exclusion | Already installed |
| `@axe-core/playwright` | current | Accessibility validation | Already installed |
| Playwright | current | E2E tests, dark-mode testing | Already installed |

### Components Reused From Phase 33

| Asset | Location | How Used |
|-------|---------|---------|
| `WaveMark.astro` | `src/components/WaveMark.astro` | Drop into header left, footer left |
| `--wl-*` tokens | `src/styles/global.css` | All chrome styling — never use old tokens |
| `.wl-*` type ramp classes | `src/styles/global.css` | Nav link text, footer tagline, footer body text |
| Self-hosted font preloads | `BaseLayout.astro` | Already present — do not touch |
| `@custom-variant dark` | `global.css` line ~124 | Dark class mechanism — do not touch |

### No Alternatives Needed

This phase produces two new Astro components and edits three files. No package decisions remain.

---

## Architecture Patterns

### Recommended Component Strategy

Create **new** files; keep old files alive:

```
src/components/layout/
├── SiteHeader.astro      ← NEW (Phase 34)
├── SiteFooter.astro      ← NEW (Phase 34)
├── Header.astro          ← OLD — dead code, untouched until Phase 41
├── Footer.astro          ← OLD — dead code, untouched until Phase 41
└── MobileNav.astro       ← OLD — dead code, untouched until Phase 41
```

`BaseLayout.astro` frontmatter changes its imports:
```astro
// OLD (remove these two lines):
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';

// NEW (add these two lines):
import SiteHeader from '../components/layout/SiteHeader.astro';
import SiteFooter from '../components/layout/SiteFooter.astro';
```

`BaseLayout.astro` body changes its usage:
```astro
// OLD:
<Header />
...
<Footer />

// NEW:
<SiteHeader />
...
<SiteFooter />
```

All pages inherit the new chrome automatically — no page-level changes needed.

### FOUC Script Pattern (Simplified)

The existing FOUC script in `BaseLayout.astro` head reads `localStorage.theme`. D-05/D-06 lock out the toggle and require clearing stale localStorage values. The new script:

```html
<!-- CRITICAL: must remain in <head>, before <body> — prevents dark-mode FOUC.
     D-05: system-only. D-06: clears stale localStorage.theme from old site. -->
<script is:inline>
  // Clear any stale localStorage.theme from v2.x (which had a toggle)
  if ('theme' in localStorage) {
    delete localStorage.theme;
  }
  // Set .dark purely from OS preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  }
</script>
```

Key constraints on this script:
- Must remain `is:inline` in `<head>` (not `defer`, not `type="module"`)
- Must remain BEFORE `<body>` (before any element renders)
- No live `matchMedia` listener needed (load-time evaluation is sufficient per D-06)
- Comment must survive edits — FOUC bugs are silent and hard to detect

### Dark Mode Transition Flash Guard

The existing codebase has NO unconditional `body { transition: background-color }` in `global.css` — verified by reading `src/styles/global.css`. No action needed for Pitfall 6. Do not add transitions to chrome components without a `.transitions-enabled` parent gate.

### SiteHeader Structure (Figma-derived)

The Figma header is **64px tall** at both 1440 and 390px breakpoints. Desktop (1440): mark + wordmark left, nav links + CTA button right. Mobile (390, D-02): mark only (wordmark hidden), Showcase link, Book-a-call button.

```astro
---
// SiteHeader.astro
import WaveMark from '../WaveMark.astro';
// BOOKING_URL is a placeholder — IA-03 concern, Phase 37 wires it
const BOOKING_URL = '#book';
const isDev = import.meta.env.DEV;
---

<header class="sticky top-0 z-30 h-16 bg-wl-paper border-b border-wl-line">
  <div class="max-w-[1440px] mx-auto px-[EXTRACT] h-full flex items-center justify-between">

    <!-- Logo: mark + wordmark (wordmark hidden at mobile per D-02) -->
    <a href="/" class="flex items-center gap-[EXTRACT]" aria-label="Joel Shinness Solutions — home">
      <WaveMark size={32} class="text-wl-accent" />
      <span class="hidden sm:block wl-[EXTRACT-type-class] text-wl-ink">Joel Shinness Solutions</span>
    </a>

    <!-- Desktop nav -->
    <nav aria-label="Primary navigation" class="flex items-center gap-[EXTRACT]">
      <a href="/#services" class="wl-label-button text-wl-ink hover:text-wl-accent">Services</a>
      <a href="/showcase" class="wl-label-button text-wl-ink hover:text-wl-accent">Showcase</a>
      <a href="/#about" class="wl-label-button text-wl-ink hover:text-wl-accent">About</a>
      {isDev && <a href="/blog" class="wl-label-button text-wl-sub hover:text-wl-accent">Blog</a>}
      <!-- Book a call CTA button — COMP-01 not built yet; use inline styles for now -->
      <a href={BOOKING_URL} class="[CTA button styles from Figma EXTRACT]">Book a call</a>
    </nav>

    <!-- Mobile nav (D-01: NO hamburger — this bar IS the mobile nav) -->
    <!-- At mobile width the same <nav> collapses to Showcase + CTA; wordmark hidden per D-02 -->
  </div>
</header>
```

**EXTRACT points that need Figma data (resolved during planning, not implementation):**
- Horizontal padding at 1440 and 390 breakpoints
- Gap between nav links
- Wordmark type style (`.wl-heading-h3`? `.wl-label-button`? needs inspection of node `42:29`)
- Exact breakpoint where wordmark drops (Figma specifies 390; gap to 1440 is planner's discretion per D-02)
- Mobile nav structure — which links survive at 390px (Figma `42:47`: mark + Showcase + Book a call)

### SiteFooter Structure (Figma-derived)

The footer is **dark-background in both light and dark themes**. The Phase 33 FIGMA-EXTRACTION.md documents this from mockup node `22:759`:

- Background: `#0D2A31` (a dark sea-glass ink tone — NOT `--wl-paper`, NOT `--wl-ink`; standalone value)
- Primary text: `#EAF6F3` (= `--wl-ink` dark value)
- Secondary text: `#7FA4A2` (between `--wl-sub` dark and `--wl-accent-soft` dark)
- Light text: `#CDE6E5`
- Muted text: `#8FB4B2`
- Link size: 14px (close to `.wl-text-small` at 15px; verify against Figma node `42:77`)

Footer copy (verbatim from CONTEXT.md specifics):
- Tagline line 1: `"On your wavelength."` (italic Fraunces — `.wl-accent-kicker`)
- Tagline line 2: `"Solutions for small businesses — web, automations, and AI that save you time and money."`
- Bottom row: `contact@joelshinness.com · GitHub`
- Copyright: `© {currentYear} Joel Shinness`
- GitHub URL: `https://github.com/JoelCodes` (from git remote)

```astro
---
// SiteFooter.astro
import WaveMark from '../WaveMark.astro';
const currentYear = new Date().getFullYear();
const isDev = import.meta.env.DEV;
---

<footer style="background-color: #0D2A31;">
  <!-- EXTRACT full layout from Figma node 42:77 (desktop) and 42:104 (mobile) -->
  <!-- Desktop: 1440×261, Mobile: 390×279 -->

  <div class="max-w-[1440px] mx-auto px-[EXTRACT] py-[EXTRACT]">
    <!-- Top: mark + wordmark + taglines -->
    <div>
      <a href="/" aria-label="Joel Shinness Solutions — home">
        <WaveMark size={32} class="[EXTRACT text color for this bg]" />
      </a>
      <p class="wl-accent-kicker" style="color: #EAF6F3;">On your wavelength.</p>
      <p class="wl-text-body" style="color: #7FA4A2;">Solutions for small businesses — web, automations, and AI that save you time and money.</p>
    </div>

    <!-- Nav links — mirror header nav -->
    <nav aria-label="Footer navigation">
      <a href="/#services" style="color: #CDE6E5; font-size: 14px;">Services</a>
      <a href="/showcase" style="color: #CDE6E5; font-size: 14px;">Showcase</a>
      <a href="/#about" style="color: #CDE6E5; font-size: 14px;">About</a>
      {isDev && <a href="/blog" style="color: #8FB4B2; font-size: 14px;">Blog</a>}
    </nav>

    <!-- Bottom row: email · GitHub and copyright -->
    <div>
      <p>
        <a href="mailto:contact@joelshinness.com" style="color: #CDE6E5;">contact@joelshinness.com</a>
        <span aria-hidden="true"> · </span>
        <a href="https://github.com/JoelCodes" target="_blank" rel="noopener noreferrer" style="color: #CDE6E5;">GitHub</a>
      </p>
      <p style="color: #8FB4B2;">&copy; {currentYear} Joel Shinness</p>
    </div>
  </div>
</footer>
```

**Planning task:** Resolve all `[EXTRACT]` values from Figma nodes `42:77` (desktop) and `42:104` (mobile) before writing the plan tasks.

### Blog Prod-Exclusion Pattern

**For dynamic routes** (`src/pages/blog/[slug].astro` and `src/pages/blog/tags/[tag].astro`): return empty array from `getStaticPaths` in prod.

```astro
// src/pages/blog/[slug].astro
export async function getStaticPaths() {
  if (import.meta.env.PROD) return [];  // No blog pages in production
  const posts = await getCollection('blog');
  return posts.map(post => ({ params: { slug: post.slug } }));
}
```

**For the blog index** (`src/pages/blog/index.astro`): use a prod guard that returns a 404-equivalent (the simplest approach is `Astro.redirect('/', 301)` or returning 404 from the page body, but for a static build, the cleanest approach is to wrap the export in `getStaticPaths` — except `index.astro` is not a dynamic route. The cleanest static-build solution is to wrap the page content in an `import.meta.env.PROD` guard:

```astro
---
// src/pages/blog/index.astro
if (import.meta.env.PROD) {
  return Astro.redirect('/');
}
// ... rest of page
---
```

Note: `Astro.redirect()` in page frontmatter of a static site generates a meta-refresh HTML page, not an HTTP redirect. This is acceptable — it means `/blog` in production silently redirects to `/`, which is correct behavior.

**Alternatively** (simpler for static build): rename `blog/index.astro` to produce no output in prod by using a `getStaticPaths` trick — but since `index.astro` is not a dynamic route, the cleanest approach without route-manipulation hacks is the `Astro.redirect` guard.

**For the sitemap**: filter all `/blog*` URLs:

```javascript
// astro.config.mjs
sitemap({
  filter: (page) => !page.includes('/blog'),
  changefreq: 'weekly',
  priority: 0.7,
  lastmod: new Date(),
}),
```

**Verified**: `@astrojs/sitemap` `filter()` function takes full URL string and returns boolean. Source: official Astro docs.

### Static Redirects Pattern

Add to `astro.config.mjs` `redirects` object:

```javascript
redirects: {
  '/portfolio': '/projects',         // existing — keep
  '/portfolio/[slug]': '/projects/[slug]',  // existing — keep
  '/contact': '/#contact',           // existing — keep
  '/projects': '/',                  // NEW (D-03 — /showcase doesn't exist until Phase 38)
  '/projects/[slug]': '/',           // NEW (project detail pages → home for now)
  '/faq': '/',                       // NEW (D-03)
},
```

**Why `/projects` → `/` and not `/showcase`:** The CONTEXT.md D-03 locks the intent but leaves sequencing to the planner. Since `/showcase` does not exist until Phase 38, pointing `/projects` there now would produce a 404 loop. Pointing to `/` is safe immediately. Update the redirect target to `/showcase` in Phase 38 (when the page lands) without touching the source route.

**Output behavior**: Astro's static build generates an HTML file at `dist/projects/index.html` with `<meta http-equiv="refresh" content="0;url=/">`. GitHub Pages serves this file. No HTTP 301 is possible. The generated HTML also includes `<meta name="robots" content="noindex">` automatically. Confirmed from official Astro docs and community sources.

**Known limitation**: Astro static redirects cannot redirect a dynamic route to a non-matching pattern. `/projects/[slug]` → `/` requires that the `projects/[slug]` route still has a `getStaticPaths`. Since `src/pages/projects/[slug].astro` will still exist during Phase 34, this redirect will conflict unless the file is handled. Options:
1. Leave `projects/[slug].astro` in place (it still generates slugged pages — acceptable during migration)
2. Or add the redirect at the `astro.config.mjs` level but the file will prevent the redirect from generating for matched paths

**Recommendation**: Do not add `/projects/[slug]` → `/` redirect in Phase 34. The file still exists. Add it in Phase 40 (URL Cleanup) when the file is deleted. For Phase 34, redirect only `/projects` → `/` and `/faq` → `/`.

### Google Fonts Removal

CONTEXT.md notes this is at planner's discretion. The Google Fonts block (`BaseLayout.astro` lines 41-59) loads Bricolage Grotesque + DM Sans for old pages. Since the new chrome will use `--wl-*` tokens and `font-wl-body`/`font-wl-heading`, and the body `@layer base` already sets Hanken Grotesk, the Google Fonts block is not needed for the new chrome — but IS still needed for old page bodies (which reference `font-body` utility tied to old tokens).

**Recommendation**: Leave the Google Fonts block in place for Phase 34. Remove in Phase 41. The render-blocking-insight audit is already set to `"off"` in `lighthouserc.json` specifically for this coexistence period.

### Redirect Target Sequencing

```
Phase 34: /faq → /,  /projects → /   (safe immediately)
Phase 38: update /projects → /showcase  (when /showcase lands)
Phase 40: /projects/[slug] → /showcase  (when project detail files deleted)
```

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Dark mode at load time | Custom FOUC logic | The existing `is:inline` script pattern (modified) | Already working; any rewrite risks introducing FOUC |
| Blog route exclusion | Complex integration plugin | `getStaticPaths` empty return + `sitemap()` filter | Two lines of code; no custom integration needed |
| Static redirects | Separate redirect pages | Astro `redirects` config in `astro.config.mjs` | Already used for `/portfolio`; consistent pattern |
| WaveMark SVG | Re-author SVG geometry | `WaveMark.astro` — already built in Phase 33 | Path data is from Figma extraction; never hand-author |
| CTA Button styles | New Button component | Inline styles referencing `--wl-*` tokens as a placeholder | COMP-01 (CTAButton) is Phase 35; Phase 34 uses simple `<a>` with inline token styles for the header CTA |
| Icon fonts or SVG icon systems | Custom icon setup | None needed — footer uses text links only (D-09) | Figma spec: "contact@joelshinness.com · GitHub" as text, no icons |

---

## Common Pitfalls

### Pitfall 1: Moving the FOUC Script Out of `<head>`
**What goes wrong:** During BaseLayout.astro editing, the `<script is:inline>` block gets moved to `<body>` or given `defer`. Dark-mode users see a white flash on every page load.
**Prevention:** The CRITICAL comment on the script must be present. Verify placement after every BaseLayout edit: `grep -n "is:inline" src/layouts/BaseLayout.astro` must show a line number in the `<head>` section (before ~line 70).
**Warning sign:** White flash on hard reload with dark OS preference.

### Pitfall 2: Footer Dark Background Not Using Token
**What goes wrong:** Footer background `#0D2A31` is hardcoded as hex in HTML; later phases need to update it, can't find it.
**Prevention:** Either define a dedicated CSS custom property (e.g., `--wl-footer-bg: #0D2A31` in `global.css`) or use a named Tailwind class derived from that token. Do not scatter the hex literal across multiple elements.
**Note:** `#0D2A31` does NOT directly map to any of the 8 `--wl-*` tokens. It is observed in the mockup fill but not in the Figma variable definitions. It may be a mode-specific override or a detached fill. The planner must verify against Figma `42:77` during planning.

### Pitfall 3: Blog Pages Still Appearing in Production Sitemap
**What goes wrong:** `getStaticPaths` returns empty in prod so no HTML is generated, but `@astrojs/sitemap` still includes any URL that was previously generated or uses its own route discovery.
**Prevention:** The `filter` function in `sitemap()` config is the only reliable gate. Both gates are required: empty `getStaticPaths` (no HTML generated) AND `filter` (not in sitemap). The sitemap filter uses the full URL string — use `.includes('/blog')` not a path-only comparison.
**Verification:** After `npm run build`, `grep -r "blog" dist/sitemap.xml` must return nothing.

### Pitfall 4: stale `localStorage.theme` Causes Immediate FOUC on Returning Visitors
**What goes wrong:** The old site's Header.astro set `localStorage.theme = 'light'` or `'dark'` when users clicked the toggle. If the old FOUC script reads localStorage first (which it does), and a returning user has `localStorage.theme = 'light'`, they get a forced-light experience even on a dark-OS preference.
**Prevention:** The new FOUC script (D-06) explicitly deletes `localStorage.theme` before evaluating the OS preference. This runs on every page load, clearing any stale value.
**Code pattern:** `if ('theme' in localStorage) { delete localStorage.theme; }` — runs unconditionally at page load before the OS-preference check.

### Pitfall 5: Axe-Core Tests Break Because They Reference `#theme-toggle`
**What goes wrong:** `tests/accessibility/dark-mode.spec.ts` line 14 does `page.locator('#theme-toggle').click()` to toggle dark mode before running the axe scan. That element will not exist in the new chrome (D-05: no toggle).
**Prevention:** Update the dark-mode spec. Since the toggle is gone, the dark-mode test must emulate OS dark preference instead. Use Playwright's `colorScheme` browser context option.
**Pattern:** 
```typescript
// Instead of clicking #theme-toggle:
const context = await browser.newContext({ colorScheme: 'dark' });
const page = await context.newPage();
```
**Files to update:** `tests/accessibility/dark-mode.spec.ts` — all four tests.

### Pitfall 6: Redirect Conflict — `astro.config.mjs` Redirect vs. Existing `.astro` File
**What goes wrong:** If `/projects` is in `redirects` AND `src/pages/projects/index.astro` still exists, Astro may warn or silently prefer the file over the redirect. The current codebase has `src/pages/projects/index.astro`.
**Prevention:** For Phase 34, only add `/faq` → `/` to redirects (the `faq.astro` file still exists but is getting redirected out). For `/projects`, the existing file is not being deleted in Phase 34, so the redirect in `astro.config.mjs` will conflict. Do not add a `/projects` redirect in this phase — that is Phase 40's job (when the file is deleted). Add only `/faq` → `/` now.
**Verified:** Astro issue #12036 confirms "misleading missing getStaticPaths error with configured redirects and dynamic routes."

**Revised redirect plan for Phase 34:**
```javascript
redirects: {
  '/portfolio': '/projects',         // keep existing
  '/portfolio/[slug]': '/projects/[slug]',  // keep existing
  '/contact': '/#contact',           // keep existing
  '/faq': '/',                       // NEW — safe because faq.astro is the file to replace
},
```
The `/faq` route will continue to exist as an HTML file but the new redirect will take precedence (or the file needs to be deleted — either approach works; deleting it is cleaner).

### Pitfall 7: `import.meta.env.DEV` Guard on Blog Index Not Working for Static Build
**What goes wrong:** `src/pages/blog/index.astro` is not a dynamic route, so there's no `getStaticPaths` to gate. A prod build will still include it unless the page explicitly redirects or errors.
**Prevention:** Use `Astro.redirect('/')` in the page frontmatter when `import.meta.env.PROD` is true. This generates a meta-refresh HTML at `/blog/` that redirects to `/` in prod — which is acceptable (and the sitemap filter removes it from the index anyway).
**Alternatively:** If the goal is truly "no `/blog/` file in dist", the only option is to delete the file from `src/pages/blog/index.astro` and restore it when the blog comes back. Given that Phase 38 will need to restyle it in dev, keeping the file and using the redirect guard is preferable.

---

## Figma Extraction Required (Before Planning Tasks Are Written)

These values are NOT available from Phase 33 extraction and must be pulled from Figma during planning:

| Data Point | Figma Node | What to Extract |
|-----------|-----------|----------------|
| Header desktop padding | `42:29` | Horizontal padding px, gap between nav items, gap between logo and wordmark |
| Header mobile layout | `42:47` | Which elements survive at 390px, their horizontal spacing |
| Wordmark type style | `42:29` | Which `.wl-*` class to use for "Joel Shinness Solutions" text |
| Header background | `42:29`/`42:47` | Confirm `--wl-paper` or sea-glass variant |
| Header bottom border | `42:29` | Border width and color (confirm `--wl-line`) |
| CTA button styles | `39:15`/`39:30` | Background, text color, padding, radius for "Book a call" (until COMP-01 exists) |
| Footer desktop layout | `42:77` | Column arrangement, spacing, exact vertical rhythm (1440×261) |
| Footer mobile layout | `42:104` | Single-column arrangement (390×279) |
| Footer exact text colors | `42:77` | Verify `#EAF6F3`/`#7FA4A2`/`#CDE6E5`/`#8FB4B2` against named token in Figma |
| Footer background | `42:77` | Confirm `#0D2A31` is correct; check if Figma has a variable for it |
| Nav link type style | `42:29` | Which `.wl-*` class for header nav links |
| Footer link type style | `42:77` | Confirm 14px links match `.wl-text-small` (15px) or are a detached size |
| Footer nav items | `42:77` | Exact list of links in footer nav (desktop) |
| Footer tagline layout | `42:77` | Is tagline one element or two? Inline or block? |

**Known data from Phase 33 extraction (do not re-extract):**

| Data Point | Value | Source |
|-----------|-------|--------|
| `--wl-ink` | `#12333B` light / `#EAF6F3` dark | 33-FIGMA-EXTRACTION.md |
| `--wl-accent` | `#0E7078` light / `#4FB3B8` dark | 33-FIGMA-EXTRACTION.md |
| `--wl-paper` | `#F6FBFA` light / `#0C2228` dark | 33-FIGMA-EXTRACTION.md |
| Footer bg | `#0D2A31` (light mockup) | 33-FIGMA-EXTRACTION.md node `22:759` |
| Footer text colors | `#EAF6F3`/`#7FA4A2`/`#CDE6E5`/`#8FB4B2` | 33-FIGMA-EXTRACTION.md |
| Tagline copy | `"On your wavelength."` + `"Solutions for small businesses..."` | 33-FIGMA-EXTRACTION.md / CONTEXT.md |
| WaveMark SVG paths | See `src/components/WaveMark.astro` | Already built |
| GitHub URL | `https://github.com/JoelCodes` | `git remote get-url origin` |
| Contact email | `contact@joelshinness.com` | CONTEXT.md D-07 |
| Copyright | `© {currentYear} Joel Shinness` | CONTEXT.md D-10 |

---

## Code Examples

### FOUC Script (simplified — verified working pattern)

```html
<!-- CRITICAL: must remain in <head>, before <body> — prevents dark-mode FOUC.
     System-only per D-05/D-06. Clears stale localStorage.theme from v2.x. -->
<script is:inline>
  if ('theme' in localStorage) {
    delete localStorage.theme;
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  }
</script>
```

### Blog Exclusion — Dynamic Route

```astro
// src/pages/blog/[slug].astro
export async function getStaticPaths() {
  if (import.meta.env.PROD) return [];
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map(post => ({ params: { slug: post.slug } }));
}
```

### Blog Exclusion — Index Page

```astro
---
// src/pages/blog/index.astro  (top of frontmatter)
if (import.meta.env.PROD) {
  return Astro.redirect('/');
}
---
```

### Blog Exclusion — Tags Page

```astro
// src/pages/blog/tags/[tag].astro
export async function getStaticPaths() {
  if (import.meta.env.PROD) return [];
  const posts = await getCollection('blog');
  const tags = [...new Set(posts.flatMap(post => post.data.tags ?? []))];
  return tags.map(tag => ({ params: { tag } }));
}
```

### Sitemap Filter

```javascript
// astro.config.mjs
sitemap({
  filter: (page) => !page.includes('/blog'),
  changefreq: 'weekly',
  priority: 0.7,
  lastmod: new Date(),
}),
```

### Playwright Dark Mode Test (updated — no toggle)

```typescript
// tests/accessibility/dark-mode.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('Dark Mode Accessibility', () => {
  // All tests use colorScheme context option — no #theme-toggle exists
  test('Homepage in dark mode should not have accessibility violations', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    await page.goto('/');

    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
    await context.close();
  });
  // ... repeat pattern for other pages
});
```

### `scroll-margin-top` for new 64px header

The existing `global.css` has `section[id] { scroll-margin-top: 60px; }`. The new header is 64px tall. Update this value:

```css
section[id] {
  scroll-margin-top: 64px;
}
```

---

## Validation Architecture

Nyquist validation is enabled for this project (`config.json: "nyquist_validation": true`).

### Automated Validation

| Check | Tool | When | What Passes |
|-------|------|------|-------------|
| Axe zero violations — homepage (light) | Playwright + axe-core | `npm run test` after phase | 0 violations |
| Axe zero violations — homepage (dark, OS) | Playwright + axe-core (colorScheme context) | `npm run test` after phase | 0 violations |
| No blog pages in prod build | `grep -r "blog" dist/sitemap.xml` | After `npm run build` | 0 matches |
| No blog routes in dist | `ls dist/blog/` | After `npm run build` | directory missing or empty |
| Redirect HTML exists | `cat dist/faq/index.html \| grep refresh` | After `npm run build` | meta-refresh found |
| FOUC script in `<head>` | `grep -n "is:inline" src/layouts/BaseLayout.astro` | Before commit | line number < 70 |
| No `localStorage.theme` reference in new FOUC script | `grep "localStorage.theme" src/layouts/BaseLayout.astro` | After edit | 0 occurrences |
| Old token leak in new components | `grep -r "bg-yellow\|font-heading\|bg-bg-light\|text-text-light" src/components/layout/SiteHeader.astro src/components/layout/SiteFooter.astro` | Before commit | 0 matches |
| `scroll-margin-top` updated | `grep "scroll-margin-top" src/styles/global.css` | After edit | 64px |
| Lighthouse score ≥ 90 all categories | `lhci collect` | After `npm run build` | All categories pass |

### Fidelity Gate (Required Before Phase Is Done)

Per the milestone discipline (v1.4 lesson):

1. **Header screenshot comparison**: Capture rendered header at 1440px viewport, compare against Figma frame `42:29` (desktop). Accept only pixel-matched spacing and typography.
2. **Footer screenshot comparison**: Capture rendered footer at 1440px viewport, compare against Figma frame `42:77` (desktop).
3. **Mobile header screenshot**: Capture at 390px, compare against Figma frame `42:47`.
4. **Dark mode check**: Both header and footer in dark OS preference — confirm dark class active, confirm footer bg unchanged (footer is always dark, no flip).

**Approved deviations** (per CONTEXT.md specifics — document in REVIEW.md):
- No theme toggle (Figma never had one — this is matching Figma)
- Mobile wordmark hidden (D-02 deviation from Figma — user-approved due to overflow at 390px)

### Accessibility Checklist (CHROME-04 partial)

- `<header>` has no `role` (implicit landmark — do not add `role="banner"` redundantly unless needed for IE11, which is out of scope)
- `<nav>` elements have `aria-label` to differentiate header nav from footer nav
- Logo `<a>` has `aria-label="Joel Shinness Solutions — home"` (text is hidden at mobile; without this, keyboard users have no description)
- Footer email `<a href="mailto:...">` has visible text — no additional aria-label needed
- Footer GitHub link has `target="_blank"` + `rel="noopener noreferrer"` — no need to add aria-label about "opens in new tab" unless Joel specifically requests it (the pattern is common enough to not require explicit labeling per WCAG 2.2)
- Focus ring: new chrome elements should use `focus-visible:outline-2 focus-visible:outline-wl-accent` or equivalent — no old `shadow-[...]` hack needed now that the old tokens are not being used

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| Dark mode via `localStorage.theme` toggle | System-only via `prefers-color-scheme`, clear stale localStorage | D-05/D-06; simpler script |
| `#theme-toggle` button in header | No toggle in header | Dark mode test must use `colorScheme` browser context |
| Hamburger slide-in MobileNav | No hamburger; mobile bar is literal Figma spec | MobileNav.astro becomes dead code |
| Blog link in nav | Blog link in dev builds only | `import.meta.env.DEV` gate |
| LinkedIn + Substack icons in footer | Text links only: email + GitHub | D-09; simplifies footer |
| Old Header.astro/Footer.astro | SiteHeader.astro/SiteFooter.astro | In-place swap via BaseLayout.astro imports |

**Deprecated/obsolete after Phase 34:**
- `MobileNav.astro` — no successor; dead code until Phase 41 deletion
- Old `Header.astro` / `Footer.astro` — dead code until Phase 41 deletion
- `#theme-toggle` DOM element — gone; update axe tests that reference it
- `localStorage.theme` — cleared and never re-written by the new chrome

---

## Open Questions

1. **Footer background token vs. hardcoded hex**
   - What we know: `#0D2A31` observed in Phase 33 mockup extraction (node `22:759`)
   - What's unclear: Whether Figma has a named variable for this value (possible `--on-paper` or custom footer bg)
   - Recommendation: Pull from Figma `42:77` during planning. If no variable, define `--color-wl-footer-bg: #0D2A31` in `global.css` (add to the `--wl-*` block) so it can be referenced by name.

2. **Header CTA button styles before COMP-01**
   - What we know: COMP-01 (CTAButton) is Phase 35; Phase 34 needs a Book-a-call button
   - What's unclear: Whether to stub with inline styles or skip and note it as "pending COMP-01"
   - Recommendation: Implement the header CTA as a minimal inline-styled `<a>` using `--wl-*` token values. It will be replaced by the real CTAButton in Phase 35 (or Phase 37 when landing page is assembled). Flag it in code as `<!-- TODO: replace with <CTAButton> in Phase 35 -->`.

3. **Exact breakpoint for wordmark hiding**
   - What we know: Figma specifies mobile at 390 and desktop at 1440; user approved hiding wordmark at mobile breakpoint
   - What's unclear: The exact CSS breakpoint (`sm:` = 640px? or a custom value?)
   - Recommendation: Use Tailwind's `sm:` breakpoint (640px) as the wordmark show/hide threshold — above 640 show wordmark, below hide. Verify against actual header overflow during dev testing. If the Figma mobile spec at 390 clips the wordmark, hiding it at `sm:` (640px) provides comfortable margin.

4. **`/faq` file deletion vs. redirect coexistence**
   - What we know: The redirect `/faq` → `/` is added to `astro.config.mjs`
   - What's unclear: If `src/pages/faq.astro` still exists, does the redirect apply?
   - Recommendation: Delete `src/pages/faq.astro` in Phase 34. It's a standalone HTML-shell page (not using BaseLayout) with content that's moving to the landing page in Phase 37. Deleting it now means the `/faq` redirect in astro.config.mjs generates the meta-refresh HTML correctly. The FAQPage JSON-LD from `faq.astro` is deferred to Phase 37 (no SEO urgency since the blog exclusion already sacrifices some SEO from this phase).

---

## Sources

### Primary (HIGH confidence)

- `src/layouts/BaseLayout.astro` — FOUC script lines 62-69; Google Fonts block lines 41-59; existing structure
- `src/components/layout/Header.astro` — existing chrome; `#theme-toggle` DOM element confirmed
- `src/components/layout/Footer.astro` — existing chrome; social icons, nav structure
- `src/components/layout/MobileNav.astro` — existing hamburger; confirmed dead-code after Phase 34
- `src/styles/global.css` — `--wl-*` tokens confirmed present; `.dark {}` flip confirmed; `@custom-variant dark` confirmed; no unconditional `body { transition }` present
- `astro.config.mjs` — existing `redirects` object confirmed; `sitemap()` integration confirmed
- `tests/accessibility/dark-mode.spec.ts` — `#theme-toggle` reference confirmed; needs updating
- `tests/accessibility/axe-tests.spec.ts` — pages tested: `/`, `/projects`, `/blog`, `/about`
- `.planning/phases/33-token-foundation-fonts/33-FIGMA-EXTRACTION.md` — footer bg `#0D2A31`, text colors, all `--wl-*` token values confirmed
- `src/components/WaveMark.astro` — component exists, props interface confirmed
- `git remote get-url origin` → `https://github.com/JoelCodes/joelcodes.github.io.git` — GitHub URL for footer confirmed
- Official Astro docs (via WebFetch): `@astrojs/sitemap` `filter()` API confirmed; static redirects produce meta-refresh HTML confirmed; `import.meta.env.PROD` isolated scope in `getStaticPaths` confirmed

### Secondary (MEDIUM confidence)

- Phase 33 FIGMA-EXTRACTION.md footer bg observation — `#0D2A31` from mockup node `22:759`; requires confirmation against `42:77` during planning
- Astro static redirect behavior on GitHub Pages — WebSearch confirmed meta-refresh; no HTTP 301 available
- Astro roadmap discussion #1188 — blog page exclusion feature request; community pattern of `getStaticPaths` empty return in prod is the de-facto standard

### Tertiary (LOW confidence)

- Exact header/footer Figma specs (spacing, padding, breakpoints) — NOT YET EXTRACTED; must be pulled from Figma nodes `42:29`/`42:47`/`42:77`/`42:104` during planning before tasks are written

---

## Metadata

**Confidence breakdown:**

| Area | Level | Reason |
|------|-------|--------|
| FOUC simplification pattern | HIGH | Existing script read; exact change defined |
| Blog prod-exclusion mechanics | HIGH | Verified against official Astro docs |
| Static redirect mechanics | HIGH | Verified against official Astro docs; existing redirect in codebase |
| Component file strategy | HIGH | Code read; pattern clear |
| Footer dark bg value | MEDIUM | From Phase 33 mockup observation; needs Figma node `42:77` confirmation |
| Header/footer exact spacing | LOW | Not yet extracted from Figma; planning prerequisite |
| CTA button placeholder styles | MEDIUM | Pattern clear but exact Figma values not yet extracted |

**Research date:** 2026-07-15
**Valid until:** 2026-08-15 (30 days — stable technology; Figma extraction is the expiry risk, not library churn)

**Pre-planning prerequisite:** Figma extraction of nodes `42:29`, `42:47`, `42:77`, `42:104`, `39:15`, `39:30` must occur before plan tasks are written. Without those values, the plan tasks would have `[EXTRACT]` placeholders that make them unactionable.

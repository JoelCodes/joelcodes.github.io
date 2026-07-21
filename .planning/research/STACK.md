# Stack Research

**Domain:** Static portfolio/consulting site — v3.0 Wavelength visual rebuild
**Researched:** 2026-07-14
**Confidence:** HIGH for fonts and Tailwind patterns; MEDIUM for Astro Fonts API (experimental, active breaking changes)

---

## Existing Validated Stack (unchanged)

| Technology | Version | Notes |
|------------|---------|-------|
| Astro | ^5.16.15 | Static SSG, file-based routing |
| Tailwind CSS | ^4.1.18 | via @tailwindcss/vite (no postcss config file) |
| @tailwindcss/vite | ^4.1.18 | Vite plugin, not PostCSS |
| @astrojs/mdx | ^4.3.13 | Blog posts |
| astro-expressive-code | ^0.41.6 | Code block syntax highlighting |
| @astrojs/sitemap | ^3.7.0 | SEO |
| astro-robots-txt | ^1.0.0 | SEO |
| @lucide/astro | ^0.563.0 | Icons |
| TypeScript | ^5.9.3 | Strict mode |
| Playwright + @axe-core/playwright | latest | A11y testing |

Do not re-research these. They stay.

---

## Stack Changes for v3.0 Wavelength Rebuild

### 1. Font Self-Hosting

**Decision: @fontsource-variable packages, NOT the Astro experimental Fonts API.**

**Why not the Astro Fonts API:**
The experimental Fonts API shipped in Astro 5.7 (April 2025) and remains experimental as of 5.16.x. It had a FontProvider type breaking change in 5.16.9 (impacting third-party unifont providers), and as of February 2026, users on 5.17.1+ report "Unrecognized key(s) in object: 'variants'" and "Invalid FontProvider object" errors (GitHub issue #15515, opened 2026-02-14, status: in review, no resolution). The API does not graduate to stable until Astro v6. Using it on a Lighthouse 90+ performance budget site means riding an API that is actively breaking across patch versions. Skip it for this milestone.

**Recommended packages:**

| Package | Version (verified 2026-07-14) | Purpose |
|---------|-------------------------------|---------|
| @fontsource-variable/fraunces | ^5.2.9 | Headings — variable with opsz, wght, SOFT, WONK, ital axes |
| @fontsource-variable/hanken-grotesk | ^5.2.8 | Body/UI — variable with wght axis (100-900) |

**Fraunces axes confirmed:** ital (0-1), opsz (9-144), wght (100-900), SOFT (0-100), WONK (0-1). This is a display-grade variable font with true optical sizing and genuine italic glyphs (not synthesized oblique).

**Import strategy — two imports total, no bloat:**

```js
// In BaseLayout.astro or global.css
import '@fontsource-variable/fraunces/wght.css';          // upright, wght axis only
import '@fontsource-variable/fraunces/wght-italic.css';    // italic, wght axis only
import '@fontsource-variable/hanken-grotesk/wght.css';     // body, wght axis only
```

**Why wght.css, not full.css:**
`full.css` loads all axes simultaneously (opsz + SOFT + WONK + wght in one file), producing a significantly larger font file. For this site, opsz and SOFT/WONK are decorative niceties, not core to the type system. Load wght.css for upright and wght-italic.css for italic. Control opsz, SOFT, and WONK via `font-variation-settings` inline on specific elements that need them (hero display type only). This loads two font files instead of one massive one.

**If you later need the custom axes on hero type:**
```css
.hero-display {
  font-family: 'Fraunces Variable', serif;
  font-variation-settings: 'opsz' 144, 'SOFT' 0, 'WONK' 0;
}
```

**Font family names after import:**
- `'Fraunces Variable'` (upright via wght.css)
- `'Fraunces Variable'` with `font-style: italic` (via wght-italic.css)
- `'Hanken Grotesk Variable'` (via wght.css)

Fontsource registers upright and italic as the same family name; `font-style: italic` triggers the correct file automatically.

---

### 2. Tailwind CSS 4 Theming Pattern

**No new packages needed.** The existing `@tailwindcss/vite ^4.1.18` handles everything. The pattern is purely a CSS authoring change in `src/styles/global.css`.

**Pattern: Replace @theme block wholesale.**

The existing global.css already uses the correct Tailwind 4 structure: `@import "tailwindcss"` at top, `@theme { ... }` block, and `@custom-variant dark (&:where(.dark, .dark *))`. This structure is kept exactly as-is. Only the token values change.

**Tailwind 4 @theme mechanics (confirmed):**
- `@theme` tokens become CSS custom properties on `:root` AND generate utility classes automatically. `--color-ink: #12333B` generates `bg-ink`, `text-ink`, `border-ink`, `ring-ink`, etc.
- Use `@theme` (not `@theme inline`) for color tokens so the CSS variable lives in the cascade. This lets `.dark` override the variable value at runtime without regenerating utilities.
- `@custom-variant dark (&:where(.dark, .dark *))` is already present and correct — keep it exactly as-is.

**Token replacement strategy (no collision risk):**
Delete the entire existing `@theme { }` block and replace with the new token set. Tailwind 4 generates utilities from whatever is currently in `@theme` — there is no residual v3 config file to conflict with. Old token names (`--color-yellow`, `--color-turquoise`, etc.) simply disappear when removed from `@theme`.

**Proposed token structure for Wavelength palette:**

```css
@theme {
  /* Brand palette */
  --color-ink:           #12333B;    /* primary text, dark bg */
  --color-sub:           #35525A;    /* secondary text */
  --color-accent:        #0E7078;    /* interactive elements */
  --color-accent-soft:   #5AA9A5;    /* hover states, secondary accent */
  --color-sea-glass:     #E6F1F1;    /* light bg, cards */
  --color-sea-glass-deep:#D2E7E7;    /* deeper bg variant */
  --color-paper:         #F6FBFA;    /* page background light */
  --color-line:          color-mix(in oklch, #0E7078 16%, transparent); /* borders */

  /* Dark theme surfaces — override via .dark on <html> */
  /* (define as semantic tokens, then override in .dark selector) */

  /* Typography */
  --font-heading: 'Fraunces Variable', 'Georgia', serif;
  --font-body:    'Hanken Grotesk Variable', ui-sans-serif, system-ui, sans-serif;

  /* Type scale — Figma sizes */
  --text-display:  4.75rem;   /* 76px */
  --text-h1:       3.8125rem; /* 61px */
  --text-h2:       3.125rem;  /* 50px */
  --text-h3:       1.3125rem; /* 21px */
  --text-body-lg:  1.3125rem; /* 21px */
  --text-body:     1rem;      /* 16px */
  --text-ui:       0.8125rem; /* 13px */
}

/* Dark theme overrides — use CSS variable override, not a second @theme block */
.dark {
  --color-paper:         #0B2228;
  --color-sea-glass:     #112D34;
  --color-sea-glass-deep:#0D2429;
  --color-ink:           #E6F1F1;
  --color-sub:           #A8C8C6;
  --color-line:          color-mix(in oklch, #5AA9A5 16%, transparent);
}
```

**Why override in `.dark` selector, not a second @theme block:**
`@theme` registers tokens at `:root` with high specificity. A `.dark` selector on `<html>` overrides those variables for the entire subtree at lower specificity but higher cascade position. This is the official Tailwind 4 pattern for class-based dark mode. Do not add `@theme inline` — that bakes values into utility class definitions, preventing runtime override.

---

### 3. Expandable Cards and FAQ Accordion

**Decision: Native HTML `<details>`/`<summary>` with CSS animation. Zero JavaScript, zero libraries.**

**Why native:**
- The `<details>` element gives keyboard interaction, ARIA semantics (`role="group"`, `aria-expanded`), and toggle behavior for free
- `::details-content` pseudo-element reached Baseline Newly Available status in September 2025 and ships in current Chrome, Firefox (130+), and Safari
- `interpolate-size: allow-keywords` (or `calc-size()`) enables height: auto animation — no JS height measurement needed
- `name` attribute on sibling `<details>` elements creates exclusive accordion behavior (only one open at a time) natively
- Zero bundle cost, no island, no hydration

**Browser support as of July 2026:** Chrome, Firefox 130+, Safari — aligns with the site's target browsers and Lighthouse CI requirements.

**Animation pattern (pure CSS, no JS):**

```css
/* Enable height-to-auto animation */
:root {
  interpolate-size: allow-keywords;
}

details::details-content {
  height: 0;
  overflow: hidden;
  transition: height 300ms ease, content-visibility 300ms ease allow-discrete;
}

details[open]::details-content {
  height: auto;
}
```

**For FAQ accordion (exclusive — one open at a time):**
```html
<details name="faq">
  <summary>Question one</summary>
  <p>Answer one</p>
</details>
<details name="faq">
  <summary>Question two</summary>
  <p>Answer two</p>
</details>
```

**For expandable project cards (independent — each toggles independently):**
Omit the `name` attribute. Use `<details>` without grouping. The closed/expanded card states map directly to `details` / `details[open]`.

**Styling summary elements:**
```css
summary { list-style: none; }        /* remove disclosure triangle */
summary::-webkit-details-marker { display: none; } /* Safari */
```
Then style `summary` freely as a card header or FAQ question row.

---

### 4. What NOT to Add

| Do Not Add | Why | Use Instead |
|------------|-----|-------------|
| React / Preact / Solid island for theme toggle | Zero-client-framework is a core constraint; adding a framework island for a single toggle adds 15-40 KB JS | Vanilla JS in a `<script>` tag in BaseLayout.astro (already working) |
| Headless UI / Radix UI accordion | Requires a JS framework; overkill for a static site | Native `<details>`/`<summary>` with CSS |
| Google Fonts CDN | Sends user IP to Google; blocks render until DNS resolves; fails privacy-conscious users; fails offline | @fontsource-variable self-hosted packages |
| Astro experimental Fonts API | Actively breaking across patch versions (5.16.9 type change, 5.17.x config schema errors, GitHub #15515 open Feb 2026); not stable until Astro v6 | @fontsource-variable direct imports |
| @tailwindcss/typography (prose plugin) | Adds ~20 KB of generated CSS; existing site hand-styles `.prose` in global.css already | Keep the existing .prose styles, update for Wavelength tokens |
| tailwind.config.js / tailwind.config.ts | Tailwind 4 is CSS-first; a JS config file alongside @theme creates conflicts | @theme in global.css only |
| CSS preprocessors (Sass/Less) | Tailwind 4 + PostCSS handles everything; adding Sass creates a double-compilation layer | Native CSS with @theme tokens |
| `@theme inline` for color tokens | Bakes the value into utility definitions, preventing .dark variable override at runtime | `@theme` (no inline) for colors |
| Adobe Fonts / Typekit CDN | External dependency, latency, content blocking | @fontsource-variable |

---

## Installation Commands

```bash
# Add font packages
npm install @fontsource-variable/fraunces @fontsource-variable/hanken-grotesk
```

That's the only `npm install` needed. Everything else is CSS authoring changes.

---

## Version Compatibility

| Package | Version | Compatible With | Notes |
|---------|---------|-----------------|-------|
| @fontsource-variable/fraunces | ^5.2.9 | Astro 5.x, Tailwind 4.x, Vite | Imported in layout or global.css; Vite bundles and fingerprints the woff2 files |
| @fontsource-variable/hanken-grotesk | ^5.2.8 | Astro 5.x, Tailwind 4.x, Vite | Same as above |
| Tailwind 4.1.x @theme | 4.1.18 | Existing @tailwindcss/vite setup | No config file needed; CSS-only |
| native `<details>` + `::details-content` | N/A (browser) | All modern browsers | Baseline Newly Available Sep 2025 |

---

## Alternatives Considered

| Recommended | Alternative | Why Not |
|-------------|-------------|---------|
| @fontsource-variable direct import | Astro experimental Fonts API | API is experimental with active breaking changes as of 5.16.9 and 5.17.x; not stable until Astro v6 |
| @fontsource-variable/fraunces wght.css + wght-italic.css | @fontsource-variable/fraunces full.css | full.css loads all axes (opsz + SOFT + WONK + wght) as a single large file; wght-only files are smaller and axes can be set via font-variation-settings only where needed |
| @fontsource-variable | @fontsource (static) | Static packages load one file per weight per style (e.g., 7 weight × 2 style = 14 files vs 2 variable files); variable is strictly better for a design using multiple weights |
| Native `<details>`/`<summary>` | Alpine.js / htmx for accordions | Adds JS payload; native HTML provides semantics and behavior for free since Sep 2025 Baseline |
| @theme token replacement | Incremental token rename | Old token names leak into class names; clean replacement avoids collision |

---

## Sources

- npm registry (verified 2026-07-14): @fontsource-variable/fraunces@5.2.9, @fontsource-variable/hanken-grotesk@5.2.8
- [Fontsource variable fonts documentation](https://fontsource.org/docs/getting-started/variable) — import paths, axes, standard vs full
- [Fontsource Fraunces font page](https://fontsource.org/fonts/fraunces) — confirmed axes: ital, opsz, wght, SOFT, WONK
- [Fontsource Hanken Grotesk font page](https://fontsource.org/fonts/hanken-grotesk) — confirmed axes: ital, wght (100-900)
- [Astro 5.7 release blog](https://astro.build/blog/astro-570/) — experimental Fonts API launch, providers supported
- [Astro experimental fonts changelog entry, 5.16.9](https://astro-changelog.netlify.app/releases/re_kwdofl76q84qc71g/) — FontProvider type breaking change (third-party unifont providers)
- [GitHub withastro/astro issue #15515](https://github.com/withastro/astro/issues/15515) — "Experimental Fonts API dead?" opened 2026-02-14, status in review; confirms breakage on 5.17.1+
- [Astro experimental fonts docs](https://docs.astro.build/en/reference/experimental-flags/fonts/) — configuration API reference
- [Tailwind CSS v4 dark mode docs](https://tailwindcss.com/docs/dark-mode) — @custom-variant syntax verified
- [Tailwind v4 @theme inline vs default discussion](https://dev.to/forrestmiller/tailwind-v4-dark-mode-the-theme-vs-theme-inline-gotcha-that-broke-my-contrast-tests-3p3o) — cascade override pattern for dark mode
- [CSS-only animated accordions, Builder.io](https://www.builder.io/blog/animated-css-accordions) — ::details-content, interpolate-size, name attribute
- [Accordion in 2026 (Patrick Brosset)](https://patrickbrosset.com/lab/accordion/) — confirms Baseline Newly Available Sep 2025 for ::details-content

---

*Stack research for: v3.0 Wavelength Rebrand — visual rebuild of joel-shinness-website*
*Researched: 2026-07-14*

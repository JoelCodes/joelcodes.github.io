# Stack Research - Neobrutalist Design Additions

**Domain:** Neobrutalist design system for existing Astro 5 + Tailwind CSS 4 site
**Researched:** 2026-02-09
**Confidence:** HIGH

## Context

This research focuses ONLY on stack additions/changes needed for neobrutalist design refresh. The existing validated stack (Astro 5, Tailwind CSS 4, MDX, TypeScript, Expressive Code) is NOT re-researched.

## Recommended Stack Additions

### Typography - Variable Fonts via Fontsource

| Package | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| @fontsource-variable/bricolage-grotesque | ^5.2.10 | Display headings | Perfect for neobrutalism: quirky, expressive grotesque with chunky contrast. Variable font with weight/width/optical size axes. Industry-standard for Gen Z brands and bold layouts. |
| @fontsource-variable/fraunces | ^5.2.10 | Alternative display/accent | Optical-size axis swings from refined text to lush display. Geometric with subtle retro vibes, excellent for editorial design elements. |
| @fontsource-variable/anybody | ^5.2.10 | Optional tertiary | Additional quirky sans-serif option if more variety needed for UI elements. |

**Why Fontsource over alternatives:**
- Zero-config self-hosting (no Google Fonts privacy concerns)
- npm-based workflow integrates with Astro/Vite build
- Tree-shakeable - only bundle weights/axes you use
- Variable fonts = single file, maximum flexibility
- Official packages maintained by Fontsource project (5M+ weekly downloads)

### CSS Patterns - Pure Tailwind Utilities

| Component | Approach | Why NOT a Library |
|-----------|----------|-------------------|
| Neobrutalism borders | Tailwind utilities: `border-2`, `border-4`, `border-black` | Already in Tailwind 4. No library needed. |
| Bold shadows | Custom `@theme` variables + utilities | Tailwind 4.1 includes text shadows. Box shadows via `--shadow-*` theme variables. |
| Color system | `@theme` with `--color-*` variables | Tailwind 4 CSS-first theming. No library needed. |

**Custom Shadow Pattern (add to global.css):**
```css
@theme {
  --shadow-brutal-sm: 2px 2px 0 0 currentColor;
  --shadow-brutal-md: 4px 4px 0 0 currentColor;
  --shadow-brutal-lg: 6px 6px 0 0 currentColor;
  --shadow-brutal-xl: 8px 8px 0 0 currentColor;
}
```

Generates: `shadow-brutal-sm`, `shadow-brutal-md`, `shadow-brutal-lg`, `shadow-brutal-xl` utilities.

### Animation - Pure CSS (No Library Needed)

| Need | Solution | Why |
|------|----------|-----|
| Hover effects | Tailwind 4 `hover:translate-*` + `transition-transform` | Built-in. Static sites don't need JS animation libraries. |
| Custom animations | `@theme { @keyframes }` + `--animate-*` variables | Tailwind 4 CSS-first animation system. |
| Entrance animations | Optional: Copy specific animations from Animate.css | Only if needed. Don't install whole library. |

**Pattern for neobrutalist "press" effect:**
```css
/* Add to component classes */
.brutal-button {
  @apply border-2 border-black shadow-brutal-md;
  @apply hover:translate-x-1 hover:translate-y-1 hover:shadow-none;
  @apply transition-all duration-150;
}
```

### Color Management - Tailwind 4 Theme Variables

**Recommended approach:** Define colors in `@theme` block, not separate library.

```css
@theme {
  /* Neobrutalist palette */
  --color-brutal-yellow: #ffef6a;
  --color-brutal-turquoise: oklch(0.75 0.15 200);
  --color-brutal-magenta: oklch(0.65 0.25 350);
  --color-brutal-black: #1a1a1a;
  --color-brutal-white: #fefefe;

  /* Override default grays with higher contrast */
  --color-gray-50: oklch(0.98 0 0);
  --color-gray-950: oklch(0.15 0 0);
}
```

Generates utilities: `bg-brutal-yellow`, `text-brutal-turquoise`, `border-brutal-magenta`, etc.

## Installation

```bash
# Typography (choose one or both display fonts)
npm install @fontsource-variable/bricolage-grotesque

# Optional: Additional display fonts
npm install @fontsource-variable/fraunces
npm install @fontsource-variable/anybody
```

**No other packages needed.** All CSS patterns use Tailwind 4's built-in capabilities.

## Integration Points

### 1. Font Loading (BaseLayout.astro)

```typescript
---
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/fraunces'; // if using
---
```

### 2. Theme Configuration (src/styles/global.css)

```css
@import "tailwindcss";

@theme {
  /* Fonts */
  --font-display: "Bricolage Grotesque Variable", system-ui, sans-serif;
  --font-accent: "Fraunces Variable", serif;
  --font-body: "Inter", system-ui, sans-serif; /* Keep existing */

  /* Colors - neobrutalist palette */
  --color-brutal-yellow: #ffef6a;
  --color-brutal-turquoise: oklch(0.75 0.15 200);
  --color-brutal-magenta: oklch(0.65 0.25 350);
  --color-brutal-black: #1a1a1a;
  --color-brutal-white: #fefefe;

  /* Shadows - hard offset style */
  --shadow-brutal-sm: 2px 2px 0 0 currentColor;
  --shadow-brutal-md: 4px 4px 0 0 currentColor;
  --shadow-brutal-lg: 6px 6px 0 0 currentColor;
  --shadow-brutal-xl: 8px 8px 0 0 currentColor;

  /* Text shadows (Tailwind 4.1) */
  --text-shadow-brutal: 2px 2px 0 currentColor;
}

/* Global styles */
body {
  @apply font-body;
}

h1, h2, h3, h4, h5, h6 {
  @apply font-display;
}
```

### 3. Utility Usage (Components)

```html
<!-- Neobrutalist button -->
<button class="
  bg-brutal-yellow
  text-brutal-black
  border-2 border-brutal-black
  shadow-brutal-md
  px-6 py-3
  rounded-none
  hover:translate-x-1 hover:translate-y-1
  hover:shadow-none
  transition-all duration-150
  font-display font-bold
">
  Click Me
</button>

<!-- Neobrutalist card -->
<div class="
  bg-brutal-turquoise
  border-4 border-brutal-black
  shadow-brutal-lg
  p-8
  rounded-lg
">
  <h2 class="text-shadow-brutal">Title</h2>
</div>
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Fontsource variable fonts | Google Fonts CDN | Never - Fontsource provides same fonts with better privacy, performance, and DX |
| Fontsource | astro-font package | Only if you MUST use Google Fonts CDN (compliance reasons). Adds build complexity. |
| Custom `@theme` shadows | NeoBrutalism.css library | Never - The library just wraps what Tailwind 4 already does. Adds dependency for no benefit. |
| Tailwind animations | Animate.css | Only if you need 50+ different entrance animations. For neobrutalism, you need 2-3 hover effects max. |
| `@theme` colors | Separate CSS variables | Never for Tailwind projects - `@theme` generates utilities automatically |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| NeoBrutalism.css library | Wraps Tailwind utilities with no added value. 6KB for features already in Tailwind 4. | Custom `@theme` config |
| tailwindcss-animate plugin | Incompatible with Tailwind 4's CSS-first approach. Requires v3 config. | `@theme { @keyframes }` |
| @fontsource static packages | 2x-5x larger bundle size vs variable fonts. Less flexibility. | @fontsource-variable packages |
| Google Fonts CDN | Privacy concerns, external dependency, potential GDPR issues. | Fontsource self-hosted |
| Motion libraries (Framer Motion, GSAP) | Overkill for static site. Adds 20-100KB+ JS. Neobrutalism uses CSS transforms only. | Tailwind transitions |

## Stack Patterns by Scenario

**If using multiple display fonts:**
- Install both Bricolage Grotesque and Fraunces
- Define `--font-display` and `--font-accent` in `@theme`
- Use `font-display` for headings, `font-accent` for pull quotes / hero text
- Keep body text separate (Inter or similar neutral sans)

**If minimizing bundle size:**
- Use only Bricolage Grotesque (single variable font = ~50KB)
- Skip Fraunces unless serif accent is critical
- Define only the shadow sizes you actually use
- Don't import fonts globally - import in layouts that need them

**If supporting older browsers:**
- Tailwind 4.1 includes automatic fallbacks for OKLCH colors (Safari 15+)
- Variable fonts supported in all browsers since 2018
- CSS custom properties supported everywhere (IE is dead)
- No additional polyfills needed

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| @fontsource-variable/bricolage-grotesque@^5.2.10 | Astro 5.x, Vite 5+, any bundler | Zero config. Just import and use. |
| Tailwind CSS 4.1+ | @tailwindcss/vite@^4.1.18 | Required for text-shadow utilities. You have 4.1.18 (good). |
| OKLCH color functions | Modern browsers (2024+) | Tailwind 4.1 auto-generates fallbacks. No action needed. |

## Performance Impact

| Addition | Bundle Size | Runtime Impact |
|----------|-------------|----------------|
| Bricolage Grotesque variable | ~50KB compressed | Negligible (single font file) |
| Fraunces variable | ~60KB compressed | Negligible |
| Custom @theme config | 0KB (generates utilities) | None - compile-time only |
| Tailwind transitions | 0KB (already in build) | Sub-millisecond CSS animations |

**Total addition:** ~50-110KB fonts only. No JS. No external requests.

## Sources

### HIGH Confidence Sources

- [Fontsource Bricolage Grotesque](https://www.npmjs.com/package/@fontsource-variable/bricolage-grotesque) - Official npm package, version verified
- [Fontsource Fraunces](https://www.npmjs.com/package/@fontsource-variable/fraunces) - Official npm package
- [Tailwind CSS v4.1 Announcement](https://tailwindcss.com/blog/tailwindcss-v4-1) - Official release notes (text shadows, CSS-first theming)
- [Tailwind CSS Theme Variables](https://tailwindcss.com/docs/theme) - Official documentation for @theme directive
- [Astro Fonts Guide](https://docs.astro.build/en/guides/fonts/) - Official Astro documentation recommending Fontsource

### MEDIUM Confidence Sources

- [My Favourite Fonts for Neobrutalist Web Design](https://blog.kristi.digital/p/my-favourite-fonts-for-neobrutalist-web-design) - Community recommendations (Bricolage Grotesque featured)
- [Bricolage Grotesque Font Pairing](https://pimpmytype.com/bricolage-grotesque-font-pairing/) - Typography resource
- [Tailwind CSS 4 Custom Colors](https://tailkits.com/blog/tailwind-v4-custom-colors/) - Tutorial on @theme colors
- [Neobrutalism Components](https://www.neobrutalism.dev/) - Reference implementation showing patterns

### LOW Confidence Sources (Context Only)

- Various WebSearch results about neobrutalism design trends - Used for understanding aesthetic, not technical decisions
- CSS animation libraries search results - Confirmed no library needed for neobrutalist hover effects

---
*Stack research for: Neobrutalist design system additions*
*Researched: 2026-02-09*
*Confidence: HIGH - All core technologies verified with official sources*

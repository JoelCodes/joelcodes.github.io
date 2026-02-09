# Phase 7: Design System Foundation - Research

**Researched:** 2026-02-09
**Domain:** Design tokens, OKLCH color space, variable fonts, neobrutalist design patterns
**Confidence:** HIGH

## Summary

Phase 7 establishes the foundational design tokens for a neobrutalist design system using Tailwind CSS 4's new `@theme` directive. The primary challenge is balancing neobrutalist boldness (bright colors, thick borders, colored shadows) with accessibility requirements (WCAG AA contrast ratios, readable typography, dark mode support).

The research identified that Tailwind CSS 4 introduces a CSS-first configuration approach where all design tokens are defined directly in CSS using the `@theme` directive rather than JavaScript configuration files. This approach enables runtime theming, smaller bundle sizes, and better integration with Astro.

OKLCH color space emerges as the optimal choice for this design system because it provides perceptual uniformity, making it significantly easier to maintain consistent contrast ratios across light and dark modes. Unlike HSL, OKLCH doesn't suffer from saturation drops and hue shifts when adjusting lightness values.

**Primary recommendation:** Define all design tokens in `/src/styles/global.css` using Tailwind CSS 4's `@theme` directive with OKLCH colors, implement colored shadows via custom utilities, and use Google Fonts API to load Bricolage Grotesque and DM Sans as variable fonts with appropriate fallbacks.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS | 4.1.18 | Design token system | Already installed; v4 introduces CSS-first `@theme` directive |
| @tailwindcss/vite | 4.1.18 | Vite integration | Replaces deprecated @astrojs/tailwind for Tailwind v4 |
| OKLCH color space | CSS native | Color definition | Perceptual uniformity ensures consistent contrast across modes |
| Google Fonts API | N/A | Font loading | Free, reliable, optimized font delivery |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Bricolage Grotesque | Latest | Heading font | Variable font with weight (200-800), width, optical size axes |
| DM Sans | Latest | Body font | Variable font with weight (100-900), optical size (9-40) axes |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| OKLCH | HSL | HSL causes saturation drops and hue shifts in dark mode; OKLCH maintains perceptual consistency |
| Google Fonts | Self-hosted fonts | Google Fonts provides CDN, automatic optimization, and format selection; self-hosting requires manual optimization |
| CSS-first config | tailwind.config.js | JavaScript config deprecated in Tailwind v4; CSS-first is more portable and enables runtime theming |

**Installation:**
```bash
# Already installed in package.json
# @tailwindcss/vite: ^4.1.18
# tailwindcss: ^4.1.18

# No additional dependencies needed
# Fonts loaded via Google Fonts API in HTML <head>
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── styles/
│   └── global.css          # @theme tokens + custom utilities
├── layouts/
│   └── BaseLayout.astro    # Font preconnect + Google Fonts API
└── components/
    └── (component files consume design tokens via Tailwind utilities)
```

### Pattern 1: CSS-First Design Tokens via @theme

**What:** Define all design tokens in CSS using `@theme` directive rather than JavaScript configuration files.

**When to use:** Always for Tailwind CSS 4 projects. This is the standard approach as of v4.0.

**Example:**
```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  /* Colors - OKLCH format for perceptual uniformity */
  --color-yellow: oklch(0.85 0.18 95);
  --color-yellow-dark: oklch(0.80 0.16 95);
  --color-turquoise: oklch(0.70 0.15 195);
  --color-turquoise-dark: oklch(0.65 0.13 195);
  --color-magenta: oklch(0.65 0.20 350);
  --color-magenta-dark: oklch(0.60 0.18 350);

  /* Typography */
  --font-heading: 'Bricolage Grotesque', system-ui, sans-serif;
  --font-body: 'DM Sans', system-ui, sans-serif;

  /* Font weights for heading hierarchy */
  --font-weight-h1: 800;
  --font-weight-h2: 700;
  --font-weight-h3: 600;

  /* Borders - neobrutalist thickness */
  --border-neo: 3px;
  --border-neo-thick: 4px;

  /* Spacing scale - 4pt grid base */
  --spacing-neo-xs: 0.5rem;  /* 8px */
  --spacing-neo-sm: 1rem;    /* 16px */
  --spacing-neo-md: 1.5rem;  /* 24px */
  --spacing-neo-lg: 2rem;    /* 32px */
  --spacing-neo-xl: 3rem;    /* 48px */
}
```

**Source:** [Tailwind CSS Theme Documentation](https://tailwindcss.com/docs/theme)

### Pattern 2: OKLCH Colors for Dark Mode

**What:** Use OKLCH color space for all colors, adjusting only lightness (L) for dark mode to maintain saturation and hue consistency.

**When to use:** All color definitions, especially when supporting dark mode.

**Example:**
```css
@theme {
  /* Light mode base colors */
  --color-yellow: oklch(0.85 0.18 95);      /* L: 85%, C: 0.18 */
  --color-turquoise: oklch(0.70 0.15 195);  /* L: 70%, C: 0.15 */
  --color-magenta: oklch(0.65 0.20 350);    /* L: 65%, C: 0.20 */

  /* Dark mode variants - reduce L and slightly reduce C */
  --color-yellow-dark: oklch(0.80 0.16 95);      /* -5% L, -0.02 C */
  --color-turquoise-dark: oklch(0.65 0.13 195);  /* -5% L, -0.02 C */
  --color-magenta-dark: oklch(0.60 0.18 350);    /* -5% L, -0.02 C */
}

/* Dark mode variant using custom-variant */
@custom-variant dark (&:where(.dark, .dark *));
```

**Why this works:** OKLCH maintains perceptual uniformity - adjusting L alone changes brightness without causing saturation drops or hue shifts that plague HSL. The slight chroma reduction (10-20%) prevents eye strain on dark backgrounds while maintaining color vibrancy.

**Source:** [OKLCH Ultimate Guide](https://oklch.org/posts/ultimate-oklch-guide)

### Pattern 3: Colored Shadows with Hard Offsets

**What:** Create neobrutalist shadows using `box-shadow` with hard offsets (no blur) that match the element's accent color.

**When to use:** Cards, buttons, and interactive elements where depth and playfulness are desired.

**Example:**
```css
/* Custom utilities for colored shadows */
@layer utilities {
  .shadow-neo-yellow {
    box-shadow: 5px 5px 0 oklch(0.85 0.18 95);
  }

  .shadow-neo-turquoise {
    box-shadow: 5px 5px 0 oklch(0.70 0.15 195);
  }

  .shadow-neo-magenta {
    box-shadow: 5px 5px 0 oklch(0.65 0.20 350);
  }

  /* Dark mode: Convert shadows to glows */
  .dark .shadow-neo-yellow {
    box-shadow: 0 0 20px oklch(0.80 0.16 95 / 0.6);
  }

  .dark .shadow-neo-turquoise {
    box-shadow: 0 0 20px oklch(0.65 0.13 195 / 0.6);
  }

  .dark .shadow-neo-magenta {
    box-shadow: 0 0 20px oklch(0.60 0.18 350 / 0.6);
  }

  /* Hover effect: "pressed" state */
  .shadow-neo-yellow:hover {
    transform: translate(2px, 2px);
    box-shadow: 3px 3px 0 oklch(0.85 0.18 95);
  }
}
```

**Key insight:** Hard offset shadows (no blur radius) are the signature neobrutalist effect. In dark mode, convert to soft glows (0 offset, 15-25px blur) for better visibility and futuristic feel.

**Source:** [Josh Comeau - Designing Beautiful Shadows](https://www.joshwcomeau.com/css/designing-shadows/)

### Pattern 4: Variable Font Loading

**What:** Load variable fonts from Google Fonts API with display=swap and appropriate fallbacks.

**When to use:** Always for web fonts. Variable fonts reduce HTTP requests while providing flexible weight/width control.

**Example:**
```html
<!-- In <head> of BaseLayout.astro -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=DM+Sans:opsz,wght@9..40,100..900&display=swap" rel="stylesheet">
```

```css
@theme {
  --font-heading: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
}
```

**Why variable fonts:**
- Bricolage Grotesque supports weight (200-800), width, and optical size axes - provides quirky geometric forms perfect for neobrutalism
- DM Sans supports weight (100-900) and optical size (9-40) - geometric but friendly, excellent readability
- `display=swap` prevents invisible text flash
- Single font file per family reduces HTTP requests vs. multiple weight files

**Source:** [Google Fonts - Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque), [Variable Fonts Guide](https://fonts.google.com/variablefonts)

### Pattern 5: Typography Scale with Heading Weight Hierarchy

**What:** Use modular scale (1.25 ratio) for font sizes and descending weights for heading hierarchy.

**When to use:** All typography systems. Creates visual rhythm and clear information hierarchy.

**Example:**
```css
@theme {
  /* Font size scale - 1.25 ratio (major third) */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.25rem;    /* 20px */
  --text-xl: 1.5625rem;  /* 25px */
  --text-2xl: 1.953rem;  /* 31.25px */
  --text-3xl: 2.441rem;  /* 39px */
  --text-4xl: 3.052rem;  /* 48.8px */

  /* Heading weights - descending by level */
  --font-weight-h1: 800;  /* Extra bold */
  --font-weight-h2: 700;  /* Bold */
  --font-weight-h3: 600;  /* Semibold */
  --font-weight-h4: 500;  /* Medium */
}
```

```css
/* Heading styles */
.prose h1 {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: var(--font-weight-h1);
  text-transform: uppercase; /* H1 only in ALL CAPS */
  letter-spacing: -0.02em;   /* Tighter for large sizes */
}

.prose h2 {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-h2);
}

.prose h3 {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-h3);
}
```

**Source:** [Design Systems Typography Guide](https://www.designsystems.com/typography-guides/)

### Anti-Patterns to Avoid

- **Defining colors in HSL for dark mode:** HSL causes saturation drops and hue shifts when adjusting lightness. Use OKLCH instead for consistent perceptual adjustments.
- **Using JavaScript config for Tailwind v4:** The `tailwind.config.js` approach is deprecated in v4. Use `@theme` directive in CSS for better portability and runtime theming.
- **Mixing blur with hard shadows:** Neobrutalist shadows should have 0 blur radius for crisp, graphic edges. Only use blur in dark mode glow effects.
- **Inconsistent border thickness:** Pick 3px or 4px and use it everywhere. Mixing 2px, 3px, 4px, 5px borders breaks visual consistency.
- **Overloading with color:** The 3/10 density constraint exists for good reason. Too many bright colors and heavy borders overwhelm users and hurt accessibility.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Color contrast validation | Manual contrast checker | Online WCAG tools + OKLCH calculators | WCAG math is complex; OKLCH's linear lightness helps but still requires precise testing against multiple backgrounds |
| Variable font loading | Custom @font-face rules | Google Fonts API | Handles format selection (woff2, woff, ttf), subsetting, browser compatibility, and CDN optimization automatically |
| Dark mode color adjustment | Hand-tuning each color | OKLCH formula: reduce L by 5-10%, reduce C by 0.02-0.04 | Systematic approach prevents inconsistency; maintains perceptual relationships between colors |
| Typography scale | Arbitrary sizes | Modular scale (1.125, 1.25, 1.333, or 1.5 ratio) | Ensures mathematical harmony and visual rhythm; prevents awkward size jumps |
| Responsive spacing | Breakpoint-specific values | Fluid spacing with clamp() | Smooth transitions between breakpoints; reduces CSS verbosity |

**Key insight:** Neobrutalist design appears simple (flat colors, hard edges, thick borders) but balancing accessibility, readability, and brand personality requires systematic token systems. Don't improvise - establish clear rules and follow them consistently.

## Common Pitfalls

### Pitfall 1: Bright Colors Failing WCAG Contrast

**What goes wrong:** Bright yellow (#FFE500), turquoise (#00D4FF), and magenta (#E91E63) often fail WCAG AA contrast (4.5:1 for normal text, 3:1 for large text and UI components) against both white and black backgrounds.

**Why it happens:** Bright colors have high luminance and saturation, making it difficult to achieve sufficient contrast with pure white or black. Yellow is notoriously problematic - it can be too light for white backgrounds and too bright for comfortable reading.

**How to avoid:**
1. Test all accent colors using WCAG contrast checkers (WebAIM, Accessible Colors)
2. For bright colors, use them for decorative elements (borders, shadows) rather than backgrounds
3. If using as background, pair with pure black (#000000) or pure white (#FFFFFF) text only
4. For UI components, reduce lightness in OKLCH until contrast passes: `oklch(0.45 0.15 180)` is safer than `oklch(0.70 0.15 195)` for text backgrounds
5. Document which color combinations are allowed vs. forbidden

**Warning signs:**
- Color looks washed out or hard to read
- Users squint or strain to read text
- Automated accessibility tools flag contrast failures
- Color blindness simulators show low differentiation

**Sources:** [WebAIM Contrast Article](https://webaim.org/articles/contrast/), [OKLCH Color Contrast Guide](https://medium.com/@vyakymenko/color-contrast-with-oklch-prefers-reduced-motion-and-motion-design-ethics-089c0c8897d0)

### Pitfall 2: Over-Saturated Colors in Dark Mode

**What goes wrong:** Colors that look vibrant in light mode become garish and cause eye strain when used at the same saturation in dark mode.

**Why it happens:** Dark-adapted eyes are more sensitive to bright, saturated colors. What feels energetic in light mode feels aggressive and uncomfortable in dark mode.

**How to avoid:**
1. Reduce chroma (C) by 10-20% for dark mode colors: `oklch(0.70 0.15 195)` → `oklch(0.65 0.13 195)`
2. Test on actual devices with OLED screens - colors appear more saturated than on LCD
3. View in dark environment (not bright office lighting) to simulate real usage
4. Consider user preference: some users use dark mode specifically to reduce visual intensity
5. For SDR screens, limit C ≤ 0.32 to prevent over-saturation

**Warning signs:**
- Colors feel "hot" or uncomfortable to look at for extended periods
- Halos or bleeding effects around colored elements on OLED screens
- Users report headaches or eye strain
- Colors look different on phone vs. desktop (OLED vs. LCD)

**Source:** [OKLCH Ultimate Guide - Dark Mode](https://oklch.org/posts/ultimate-oklch-guide)

### Pitfall 3: Overwhelming Users with Neobrutalist Elements

**What goes wrong:** Every element has thick borders, colored shadows, and bright colors - the design becomes chaotic and hard to use. This is the most common failure mode for neobrutalist designs.

**Why it happens:** Neobrutalist elements are bold and attention-grabbing. When overused, nothing stands out and visual hierarchy collapses. The 3/10 density constraint exists specifically to prevent this.

**How to avoid:**
1. **Establish clear hierarchy:** Hero + CTAs get maximum treatment (10/10), content areas get subtle accents (3/10), body text stays clean (2/10)
2. **Use whitespace generously:** Bold elements need breathing room
3. **Limit color palette:** Rotate between 3 accent colors by section, don't use all three simultaneously
4. **Choose battles:** If a section has thick borders, reduce shadow intensity. If it has colored shadows, use thinner borders.
5. **Test with real content:** Lorem ipsum looks fine; actual paragraphs reveal readability issues

**Warning signs:**
- Eyes don't know where to look first
- Important actions (CTAs, forms) don't stand out
- Users describe site as "busy," "noisy," or "overwhelming"
- Bounce rates increase after redesign
- Accessibility advocates criticize design as hostile to users with cognitive disabilities

**Source:** [NN/G - Neobrutalism Best Practices](https://www.nngroup.com/articles/neobrutalism/), [HubSpot - Neo Brutalism Guide](https://blog.hubspot.com/website/neo-brutalism)

### Pitfall 4: Dark Mode Shadows Becoming Invisible

**What goes wrong:** Hard offset shadows (5px 5px 0 #000) that work in light mode disappear against dark backgrounds, breaking the neobrutalist effect.

**Why it happens:** Dark shadows require lighter backgrounds for contrast. Black shadows on dark gray/black backgrounds have insufficient contrast.

**How to avoid:**
1. Convert shadows to glows in dark mode: `box-shadow: 0 0 20px color / 0.6` (0 offset, 15-25px blur)
2. Use colored glows that match the accent color: yellow element → yellow glow
3. Reduce glow opacity to 0.4-0.6 to prevent overwhelming effect
4. Test on OLED screens where glows appear more intense
5. Provide escape hatch: some users may prefer no shadows/glows in dark mode

**Warning signs:**
- Elements look flat and lose depth in dark mode
- Design lacks visual interest compared to light mode
- Can't distinguish card boundaries in dark mode
- Glow effects cause halos or performance issues

**Source:** [CSS Glow Effects 2026](https://blog.stackfindover.com/css-glowing-effect/)

### Pitfall 5: Variable Font Axes Not Configured Properly

**What goes wrong:** Variable fonts load but don't provide expected weight or width control; or fonts flash/jump during load.

**Why it happens:**
- Incorrect Google Fonts API URL (missing axes or weight ranges)
- No `display=swap` causes invisible text flash
- Missing fallback fonts causes layout shift
- Not declaring `font-variation-settings` in CSS when using non-standard axes

**How to avoid:**
1. Use Google Fonts interface to generate correct API URL with all axes: `Bricolage+Grotesque:opsz,wght@12..96,200..800`
2. Always include `display=swap` parameter: `&display=swap`
3. Declare fallback fonts with similar metrics: `'Bricolage Grotesque', system-ui, sans-serif`
4. Use `@font-face` with `font-display: swap` if self-hosting
5. Test in network throttling mode to catch FOUT (Flash of Unstyled Text)

**Warning signs:**
- Text invisible for 1-3 seconds on page load
- Font weights look wrong (all weights look the same)
- Layout shifts after font loads
- Fonts don't load on slow connections

**Source:** [Google Fonts Variable Fonts Guide](https://fonts.google.com/variablefonts)

## Code Examples

Verified patterns from official sources:

### Complete global.css with Design Tokens

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  /* ============================================
     COLORS - OKLCH for perceptual uniformity
     ============================================ */

  /* Accent Colors - Light Mode */
  --color-yellow: oklch(0.85 0.18 95);          /* Bright electric yellow */
  --color-turquoise: oklch(0.70 0.15 195);      /* Bright cyan-leaning blue */
  --color-magenta: oklch(0.65 0.20 350);        /* Berry/raspberry pink */

  /* Accent Colors - Dark Mode */
  --color-yellow-dark: oklch(0.80 0.16 95);     /* -5% L, -0.02 C */
  --color-turquoise-dark: oklch(0.65 0.13 195); /* -5% L, -0.02 C */
  --color-magenta-dark: oklch(0.60 0.18 350);   /* -5% L, -0.02 C */

  /* Neutral Colors */
  --color-bg-light: oklch(1.0 0 0);             /* Pure white */
  --color-bg-dark: oklch(0.15 0 0);             /* Near black */
  --color-text-light: oklch(0.2 0 0);           /* Near black */
  --color-text-dark: oklch(0.95 0 0);           /* Near white */
  --color-text-muted-light: oklch(0.5 0 0);     /* Mid gray */
  --color-text-muted-dark: oklch(0.7 0 0);      /* Light gray */

  /* ============================================
     TYPOGRAPHY
     ============================================ */

  /* Font Families */
  --font-heading: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'DM Sans', ui-sans-serif, system-ui, sans-serif;

  /* Font Size Scale - 1.25 ratio (major third) */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.25rem;      /* 20px */
  --text-xl: 1.5625rem;    /* 25px */
  --text-2xl: 1.953rem;    /* 31.25px */
  --text-3xl: 2.441rem;    /* 39px */
  --text-4xl: 3.052rem;    /* 48.8px */

  /* Font Weights - Heading hierarchy */
  --font-weight-h1: 800;   /* Extra bold */
  --font-weight-h2: 700;   /* Bold */
  --font-weight-h3: 600;   /* Semibold */
  --font-weight-h4: 500;   /* Medium */
  --font-weight-body: 400; /* Regular */

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;

  /* ============================================
     BORDERS & SHADOWS
     ============================================ */

  /* Border Widths */
  --border-neo: 3px;
  --border-neo-thick: 4px;

  /* Border Radius - mostly sharp corners, some slight rounding */
  --radius-none: 0;
  --radius-sm: 0.25rem;    /* 4px - minimal rounding */
  --radius-md: 0.5rem;     /* 8px - moderate rounding */

  /* ============================================
     SPACING - 4pt grid base
     ============================================ */

  --spacing-neo-xs: 0.5rem;   /* 8px */
  --spacing-neo-sm: 1rem;     /* 16px */
  --spacing-neo-md: 1.5rem;   /* 24px */
  --spacing-neo-lg: 2rem;     /* 32px */
  --spacing-neo-xl: 3rem;     /* 48px */
  --spacing-neo-2xl: 4rem;    /* 64px */
}

/* ============================================
   DARK MODE VARIANT
   ============================================ */
@custom-variant dark (&:where(.dark, .dark *));

/* ============================================
   CUSTOM UTILITIES - Colored Shadows
   ============================================ */
@layer utilities {
  /* Light Mode - Hard Offset Shadows */
  .shadow-neo-yellow {
    box-shadow: 5px 5px 0 var(--color-yellow);
  }

  .shadow-neo-turquoise {
    box-shadow: 5px 5px 0 var(--color-turquoise);
  }

  .shadow-neo-magenta {
    box-shadow: 5px 5px 0 var(--color-magenta);
  }

  /* Dark Mode - Colored Glows */
  .dark .shadow-neo-yellow {
    box-shadow: 0 0 20px oklch(0.80 0.16 95 / 0.5);
  }

  .dark .shadow-neo-turquoise {
    box-shadow: 0 0 20px oklch(0.65 0.13 195 / 0.5);
  }

  .dark .shadow-neo-magenta {
    box-shadow: 0 0 20px oklch(0.60 0.18 350 / 0.5);
  }

  /* Hover Effects - "Pressed" State */
  .shadow-neo-yellow:hover {
    transform: translate(2px, 2px);
    box-shadow: 3px 3px 0 var(--color-yellow);
  }

  .shadow-neo-turquoise:hover {
    transform: translate(2px, 2px);
    box-shadow: 3px 3px 0 var(--color-turquoise);
  }

  .shadow-neo-magenta:hover {
    transform: translate(2px, 2px);
    box-shadow: 3px 3px 0 var(--color-magenta);
  }
}

/* ============================================
   EXISTING ANIMATIONS (preserve)
   ============================================ */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.portfolio-card, .blog-card {
  display: none;
  opacity: 0;
}

.portfolio-card.show, .blog-card.show {
  display: block;
  animation: fadeInScale 300ms ease-in-out forwards;
}
```

**Source:** Compiled from [Tailwind CSS Theme Docs](https://tailwindcss.com/docs/theme), [OKLCH Guide](https://oklch.org/posts/ultimate-oklch-guide)

### Font Loading in BaseLayout.astro

```astro
---
// src/layouts/BaseLayout.astro
const { title, description } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content={description}>

  <!-- Font Loading - Preconnect + Google Fonts API -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=DM+Sans:opsz,wght@9..40,100..900&display=swap"
    rel="stylesheet"
  >

  <!-- Global styles with design tokens -->
  <link rel="stylesheet" href="/src/styles/global.css">
</head>
<body>
  <slot />
</body>
</html>
```

**Source:** [Google Fonts Variable Fonts](https://fonts.google.com/variablefonts)

### Example Component Using Design Tokens

```astro
---
// src/components/Button.astro
interface Props {
  variant?: 'yellow' | 'turquoise' | 'magenta';
  href?: string;
}

const { variant = 'yellow', href } = Astro.props;
const Tag = href ? 'a' : 'button';
---

<Tag
  href={href}
  class={`
    inline-block
    px-6 py-3
    font-[family-name:var(--font-heading)]
    font-bold
    text-lg
    bg-${variant}
    dark:bg-${variant}-dark
    text-[color:var(--color-text-light)]
    border-[width:var(--border-neo-thick)]
    border-[color:var(--color-text-light)]
    shadow-neo-${variant}
    transition-all
    duration-200
    hover:translate-x-[2px]
    hover:translate-y-[2px]
  `}
>
  <slot />
</Tag>
```

**Note:** The example shows how to consume design tokens. Actual component implementation will be refined in Phase 8.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| tailwind.config.js | @theme directive in CSS | Tailwind v4.0 (2024) | Design tokens now portable, runtime theming enabled, smaller bundles |
| HSL colors | OKLCH colors | CSS Color Module Level 4 (2023) | Perceptual uniformity solves dark mode saturation/hue shift issues |
| Multiple weight font files | Variable fonts | Widespread support (2023+) | Single file per family, flexible weight control, reduced HTTP requests |
| @astrojs/tailwind | @tailwindcss/vite | Tailwind v4 + Astro (2024) | Direct Vite integration, better performance, CSS-first workflow |
| Manual WCAG testing | OKLCH + automated tools | Ongoing (2025-2026) | Linear lightness makes contrast prediction easier, but tools still required |

**Deprecated/outdated:**
- **JavaScript config (tailwind.config.js):** Still works in Tailwind v3 but deprecated in v4. Migrate to @theme for future compatibility.
- **HSL for theming:** Causes saturation drops and hue shifts in dark mode. OKLCH solves this mathematically.
- **Separate font weight files:** Variable fonts provide better performance and flexibility. Only use separate files for legacy browser support (<2% usage).

## Open Questions

Things that couldn't be fully resolved:

1. **Exact WCAG contrast ratios for chosen colors**
   - What we know: Bright yellow (#FFE500), turquoise (#00D4FF), and magenta (#E91E63) often fail WCAG AA (4.5:1) against white/black
   - What's unclear: Exact OKLCH values that pass WCAG AA for all use cases (text on background, UI components)
   - Recommendation: During planning, define specific test cases (yellow background + black text, turquoise border + white background, etc.) and validate with WebAIM contrast checker. Budget time for color adjustment iterations. Consider documenting "safe" combinations (yellow for borders/shadows only, not backgrounds).

2. **Optimal glow blur radius for dark mode**
   - What we know: 15-25px blur creates visible glow effect without overwhelming; 0.4-0.6 opacity prevents over-saturation
   - What's unclear: Best radius varies by element size and screen type (OLED vs LCD); no authoritative guidance found
   - Recommendation: Start with 20px blur at 0.5 opacity, then user-test on multiple devices (iPhone OLED, Android LCD, desktop). Consider size-based scaling: small elements (buttons) use 15px, large elements (cards) use 25px.

3. **Typography scale for mobile vs. desktop**
   - What we know: 1.25 ratio (major third) works for desktop; tighter ratios (1.125-1.2) often better for mobile
   - What's unclear: Whether single scale can serve both contexts or responsive scales needed
   - Recommendation: Start with single 1.25 scale, test on iPhone SE (smallest target device). If headings feel too large on mobile, introduce responsive scale using Tailwind breakpoints: base scale for mobile, 1.25 for desktop.

4. **Density constraint enforcement mechanism**
   - What we know: 3/10 overall density with section-specific targets (hero 10/10, content 3/10, blog 2/10)
   - What's unclear: How to systematically enforce during implementation; no tooling found for density validation
   - Recommendation: Create visual checklist during Phase 8 component building. Define concrete rules per density level (e.g., 2/10 = heading accents only, no borders; 3/10 = borders + minimal shadows; 10/10 = all effects). Review each component against targets before merging.

5. **Color rotation strategy for homepage sections**
   - What we know: Each section should use different primary color (yellow → turquoise → magenta rotation)
   - What's unclear: Optimal rotation sequence for narrative flow; whether to repeat for long homepages
   - Recommendation: Defer to Phase 9 (Homepage) planning. Test sequence options against narrative structure (Solutions → Process → Tech → About → Contact). Consider emotional mapping: yellow (energy) for hero, turquoise (calm) for process, magenta (warmth) for contact.

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS Theme Documentation](https://tailwindcss.com/docs/theme) - Official docs for @theme directive, verified current
- [Tailwind CSS v4.0 Blog Post](https://tailwindcss.com/blog/tailwindcss-v4) - Overview of CSS-first approach and Oxide engine
- [OKLCH Ultimate Guide](https://oklch.org/posts/ultimate-oklch-guide) - Comprehensive OKLCH technical reference with dark mode guidance
- [Google Fonts - Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) - Official font specimen page
- [GitHub - Bricolage Grotesque](https://github.com/ateliertriay/bricolage) - Font repository with axis documentation
- [WebAIM Contrast Requirements](https://webaim.org/articles/contrast/) - WCAG 2.0 AA/AAA standards

### Secondary (MEDIUM confidence)
- [Tailkits - Astro + Tailwind v4 Setup](https://tailkits.com/blog/astro-tailwind-setup/) - 2026 integration guide, verified approach matches official docs
- [Josh Comeau - Designing Beautiful Shadows](https://www.joshwcomeau.com/css/designing-shadows/) - CSS shadow best practices, not neobrutalist-specific but solid fundamentals
- [NN/G - Neobrutalism Best Practices](https://www.nngroup.com/articles/neobrutalism/) - UX research firm guidance on accessibility and usability
- [OKLCH in CSS (LogRocket)](https://blog.logrocket.com/oklch-css-consistent-accessible-color-palettes) - Practical implementation guide with accessibility focus
- [Frontend Tools - Tailwind Best Practices](https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns) - 2025-2026 patterns, verified against official docs

### Tertiary (LOW confidence - needs validation)
- WebSearch results for "CSS glow effects 2026" - General patterns found but need device testing for optimal blur radius
- WebSearch results for "neobrutalist spacing typography scale" - Community patterns, not authoritative standards
- Multiple blog posts on OKLCH dark mode desaturation - Agree on 10-20% C reduction but specific values vary by source

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Tailwind CSS 4 @theme verified via official docs; OKLCH verified via spec and tooling; Google Fonts API proven approach
- Architecture: HIGH - All patterns verified via official Tailwind docs, OKLCH guides, and established CSS practices
- Pitfalls: MEDIUM - Accessibility issues verified via NN/G and WebAIM; over-saturation and density issues verified via design critiques; specific OKLCH contrast values need validation
- Code examples: HIGH - Based on official Tailwind CSS 4 documentation and OKLCH technical specifications

**Research date:** 2026-02-09
**Valid until:** Approximately 30 days (March 2026) - Tailwind CSS 4 and OKLCH are stable technologies, but best practices for neobrutalist design continue evolving. Color contrast validation should be performed during implementation regardless of research age.

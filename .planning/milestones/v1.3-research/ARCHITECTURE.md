# Architecture Research

**Domain:** Design System Reference Pages for Astro Static Sites
**Researched:** 2026-02-10
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     User Navigation Layer                    │
│  (Header with links to design system reference page)        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   Design System Reference Page (/design/components)  │   │
│  │                                                       │   │
│  │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │   │
│  │   │  Component  │  │  Component  │  │  Component  │ │   │
│  │   │  Showcase   │  │  Showcase   │  │  Showcase   │ │   │
│  │   │  Section    │  │  Section    │  │  Section    │ │   │
│  │   └─────────────┘  └─────────────┘  └─────────────┘ │   │
│  │                                                       │   │
│  │   ┌───────────────────────────────────────────────┐  │   │
│  │   │       Design Tokens Display Section          │  │   │
│  │   │  (Colors, Typography, Spacing, Shadows)      │  │   │
│  │   └───────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                    Component Layer                          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│  │ Button  │  │  Card   │  │  Input  │  │  Badge  │       │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘       │
│       │            │            │            │             │
├───────┴────────────┴────────────┴────────────┴─────────────┤
│                    Design Tokens Layer                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              global.css (@theme block)              │   │
│  │  Colors • Typography • Spacing • Borders • Shadows  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Design System Reference Page | Single source of truth for all UI components and design tokens | Astro page at `src/pages/design/components.astro` |
| Component Showcase Sections | Display all variants/states of a component with live examples | Wrapper divs containing multiple component instances |
| Design Token Display | Visual reference for CSS custom properties (colors, spacing, etc.) | HTML sections rendering token values from global.css |
| UI Primitives (Button, Card, Input, Badge) | Reusable components with variant props | Astro components in `src/components/ui/` |
| BaseLayout | HTML shell with dark mode, fonts, Header/Footer | Used by all pages including design reference |

## Recommended Project Structure

**Current Structure (Existing):**
```
src/
├── components/
│   ├── ui/                # Primitive components
│   │   ├── Button.astro   # Multi-variant button with neobrutalist styling
│   │   ├── Card.astro     # Card with offset shadows/glows
│   │   ├── Input.astro    # Form input with error states
│   │   └── Badge.astro    # Isometric shadow badge
│   └── layout/            # Layout components
│       ├── Header.astro   # Site header with nav
│       ├── Footer.astro   # Site footer
│       └── MobileNav.astro
├── layouts/
│   └── BaseLayout.astro   # HTML shell wrapper
├── pages/
│   ├── index.astro        # Homepage
│   ├── component-demo.astro # EXISTING component demo (basic)
│   ├── blog/              # Blog pages
│   ├── portfolio/         # Portfolio pages
│   ├── faq.astro
│   └── contact.astro
└── styles/
    └── global.css         # Design tokens in @theme block
```

**New Additions for Design System Reference:**
```
src/
├── components/
│   ├── design-system/     # NEW: Design system-specific components
│   │   ├── ColorSwatch.astro        # Display color tokens
│   │   ├── TypographyExample.astro  # Display typography scales
│   │   ├── SpacingGrid.astro        # Visualize spacing tokens
│   │   └── ComponentVariants.astro  # Wrapper for showing variants
│   └── ui/                # (Existing - may need modifications)
├── pages/
│   ├── design/            # NEW: Design system pages
│   │   └── components.astro  # Main design reference page
│   └── component-demo.astro  # MODIFY: Add redirect to /design/components
└── data/                  # NEW: Design token data
    └── design-tokens.json # Structured token data for display
```

### Structure Rationale

- **`src/components/design-system/`**: Separates documentation/display components from production UI components. These are for showing design tokens visually, not for use in actual pages.

- **`src/pages/design/components.astro`**: Single comprehensive reference page following industry patterns (Material Design, Carbon, Fluent all use similar approaches). Using `/design/components` path instead of `/component-demo` for better SEO and discoverability.

- **`src/data/design-tokens.json`**: Extracting token data into JSON allows programmatic display without parsing CSS. Makes it easy to generate color swatches, spacing visualizations, etc.

- **Redirect from `/component-demo` to `/design/components`**: Preserves any existing links while moving to better-named route.

## Architectural Patterns

### Pattern 1: File-Based Routing for Reference Pages

**What:** Astro uses directory structure in `src/pages/` to automatically generate routes. No routing configuration needed.

**When to use:** Always for static documentation pages. For this milestone, creating `src/pages/design/components.astro` automatically creates the `/design/components` route.

**Trade-offs:**
- **Pro:** Zero configuration, intuitive URL structure
- **Pro:** Easy to add more design system pages later (`/design/tokens`, `/design/guidelines`)
- **Con:** Must create files for each route (but this is desired for static docs)

**Example:**
```typescript
// src/pages/design/components.astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Button from '../../components/ui/Button.astro';
import Card from '../../components/ui/Card.astro';
---

<BaseLayout title="Component Reference" description="Complete design system reference">
  <div class="max-w-7xl mx-auto px-6 py-12">
    <h1>Component Library</h1>

    <section id="buttons">
      <h2>Buttons</h2>
      <Button variant="yellow">Yellow</Button>
      <Button variant="turquoise">Turquoise</Button>
      <Button variant="magenta">Magenta</Button>
    </section>
  </div>
</BaseLayout>
```

### Pattern 2: Static Redirects via Astro Config

**What:** Astro config `redirects` object creates HTML meta-refresh redirects for static sites (no server required).

**When to use:** When renaming routes or creating URL aliases. For this milestone, redirect `/component-demo` → `/design/components`.

**Trade-offs:**
- **Pro:** Works on static hosts (GitHub Pages, Netlify, Vercel)
- **Pro:** No server-side configuration needed
- **Pro:** Generates actual HTML files at old paths
- **Con:** Uses meta-refresh (not true 301), slightly slower than server redirects
- **Con:** Search engines see these as permanent but may take time to update

**Example:**
```javascript
// astro.config.mjs
export default defineConfig({
  redirects: {
    '/component-demo': '/design/components',
  },
});
```

This generates `dist/component-demo.html`:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0;url=/design/components">
  </head>
</html>
```

### Pattern 3: Component Variant Display Pattern

**What:** Display all variants/states of a component in organized sections with descriptive headers and context.

**When to use:** On design system reference pages to show designers/developers all available options.

**Trade-offs:**
- **Pro:** Single source of truth for component capabilities
- **Pro:** Visual regression testing (screenshot before/after changes)
- **Con:** Must manually update when adding new variants (but this is intentional - forces documentation)

**Example:**
```typescript
<section id="buttons">
  <h2>Buttons</h2>
  <p>Hover to see lift effect, click for press effect, tab for focus ring</p>

  <div>
    <h3>Sizes</h3>
    <div class="flex gap-4">
      <Button variant="yellow" size="sm">Small</Button>
      <Button variant="yellow" size="md">Medium</Button>
      <Button variant="yellow" size="lg">Large</Button>
    </div>
  </div>

  <div>
    <h3>Variants</h3>
    <div class="flex gap-4">
      <Button variant="yellow">Yellow</Button>
      <Button variant="turquoise">Turquoise</Button>
      <Button variant="magenta">Magenta</Button>
    </div>
  </div>
</section>
```

### Pattern 4: CSS Custom Property Token Display

**What:** Parse or manually list design tokens from `global.css` and display them with visual examples.

**When to use:** When building a design system reference that shows colors, typography, spacing, etc.

**Trade-offs:**
- **Pro:** Designers/developers see exact values used in code
- **Pro:** Easy to update (tokens live in one place)
- **Con:** CSS custom properties can't be read at build time without tooling
- **Con:** Manual approach requires keeping JSON in sync with CSS

**Example (Manual Approach):**
```typescript
// src/data/design-tokens.json
{
  "colors": {
    "yellow": {
      "value": "oklch(0.85 0.18 95)",
      "usage": "Primary CTA buttons, highlights"
    },
    "turquoise": {
      "value": "oklch(0.70 0.15 195)",
      "usage": "Secondary actions, links"
    }
  }
}

// src/pages/design/components.astro
---
import tokens from '../../data/design-tokens.json';
---
<section id="colors">
  <h2>Colors</h2>
  {Object.entries(tokens.colors).map(([name, { value, usage }]) => (
    <div>
      <div style={`background: ${value}; width: 100px; height: 100px;`} />
      <p><code>{name}</code>: {value}</p>
      <p>{usage}</p>
    </div>
  ))}
</section>
```

### Pattern 5: Existing Component Modification (Not Replacement)

**What:** When improving the design system, modify existing components with new features rather than replacing them entirely.

**When to use:** When components are already in use across the site. For this milestone, existing Button, Card, Input, Badge components should be enhanced with better documentation but not rewritten.

**Trade-offs:**
- **Pro:** No breaking changes to existing pages
- **Pro:** Gradual improvement path
- **Con:** May accumulate technical debt if old patterns linger
- **Con:** Must test all existing usages after modifications

**Example:**
```typescript
// DON'T: Create Button2.astro with new features
// DO: Enhance Button.astro with backward-compatible additions

// Before:
interface Props {
  variant?: 'yellow' | 'turquoise' | 'magenta';
  size?: 'sm' | 'md' | 'lg';
}

// After (adding disabled state):
interface Props {
  variant?: 'yellow' | 'turquoise' | 'magenta';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;  // NEW - backward compatible
}
```

## Data Flow

### Request Flow (Static Site)

```
User navigates to /design/components
    ↓
Astro SSG pre-rendered HTML served
    ↓
Browser loads: BaseLayout → Header + Main Content + Footer
    ↓
Component examples render with inline styles (scoped CSS)
    ↓
Dark mode JS reads localStorage, toggles .dark class
    ↓
CSS custom properties update via :root selectors
```

### Design Token Flow

```
[global.css] → Design Tokens defined in @theme block
    ↓
[Component CSS] → References tokens via var(--token-name)
    ↓
[Runtime] → Browser resolves CSS variables to computed values
    ↓
[Dark Mode Toggle] → .dark class switches token values
```

### Component Import Flow

```
[Page: design/components.astro]
    ↓
import Button from '../../components/ui/Button.astro'
import Card from '../../components/ui/Card.astro'
    ↓
<Button variant="yellow">Click me</Button>
    ↓
[Button.astro] renders with scoped CSS
    ↓
CSS uses var(--color-yellow) from global.css
```

## Integration Points

### New Component: `src/pages/design/components.astro`

**Purpose:** Main design system reference page

**Integrates with:**
- `BaseLayout.astro` - Wraps page with site header/footer
- All `src/components/ui/*` components - Imports and displays them
- `global.css` - Displays design tokens visually
- `Header.astro` - Should add link to /design/components in nav

**Data dependencies:**
- Optional: `src/data/design-tokens.json` for structured token display
- CSS custom properties from `global.css`

**Build order:**
1. Create `design-tokens.json` (if using token display)
2. Create helper components in `src/components/design-system/` (ColorSwatch, etc.)
3. Create `src/pages/design/components.astro`
4. Test all component variants render correctly
5. Add link to Header navigation

### Modified Component: `Header.astro`

**Changes needed:**
- Add navigation link to `/design/components` (probably in a dropdown or "Resources" section)

**Integration points:**
- No breaking changes to existing navigation
- Should work on mobile nav as well (`MobileNav.astro`)

### Redirect Configuration: `astro.config.mjs`

**Changes needed:**
```javascript
redirects: {
  '/component-demo': '/design/components',  // NEW
  '/portfolio': '/projects',                // EXISTING
  '/portfolio/[slug]': '/projects/[slug]',  // EXISTING
}
```

**Integration points:**
- Build process generates redirect HTML files
- No impact on other routes
- Static hosting (GitHub Pages) serves meta-refresh redirects

### Optional New Components: `src/components/design-system/`

**Purpose:** Helper components for visualizing design tokens

**Possible components:**
- `ColorSwatch.astro` - Shows color value with visual swatch
- `TypographyExample.astro` - Displays font scale with examples
- `SpacingGrid.astro` - Visualizes spacing tokens
- `ShadowExample.astro` - Shows shadow/glow effects

**Integration:**
- Only used on design reference pages
- Import design tokens from `design-tokens.json` or hard-code references
- Use same styling patterns as existing UI components

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 1-10 components | Single page (`/design/components`) with sections for each component. Current approach. |
| 10-30 components | Consider splitting into categories: `/design/components` (index), `/design/buttons`, `/design/forms`, etc. Astro file-based routing makes this trivial. |
| 30+ components | Use dynamic routing with `[component].astro` and `getStaticPaths()` to generate pages from component metadata. Consider Storybook or dedicated docs framework. |

### Scaling Priorities

1. **First bottleneck:** Page becomes too long to scroll (20+ component sections). **Solution:** Split into category pages (`/design/buttons`, `/design/forms`).

2. **Second bottleneck:** Too many category pages to maintain manually. **Solution:** Use Astro Content Collections or dynamic routing with component metadata JSON.

3. **Third bottleneck:** Need interactive examples (state management demos). **Solution:** Add Astro islands with React/Vue/Svelte for interactive components.

## Anti-Patterns

### Anti-Pattern 1: Duplicating Components for Documentation

**What people do:** Create separate `Button-Showcase.astro` alongside `Button.astro` just for the design system page.

**Why it's wrong:**
- Two sources of truth - showcase can drift from actual component
- Doubles maintenance burden
- Showcase can't test real component behavior

**Do this instead:**
- Import and use the actual `Button.astro` component on the design reference page
- If showcase needs special behavior, use wrapper components in `design-system/` folder that import real components

### Anti-Pattern 2: Hardcoding Token Values in Display

**What people do:**
```html
<div style="background: oklch(0.85 0.18 95)">Yellow</div>
```

**Why it's wrong:**
- Token value in global.css can change, making display inaccurate
- Can't show dark mode variant automatically
- Not using the same tokens as actual components

**Do this instead:**
```html
<div style="background: var(--color-yellow)" class="dark:bg-[--color-yellow-dark]">
  Yellow: <code>var(--color-yellow)</code>
</div>
```
Or extract tokens to JSON and reference both CSS and display from the same source.

### Anti-Pattern 3: Creating Separate Dark Mode Examples

**What people do:** Render two versions of each component side-by-side (light and dark).

**Why it's wrong:**
- Can't test dark mode toggle behavior
- Doubles page size and maintenance
- User can't easily see their preferred theme

**Do this instead:**
- Single set of examples that respect the site's dark mode toggle
- Add note: "Toggle dark mode in header to see dark variants"
- If side-by-side comparison needed, use Astro islands with `client:only` to force theme on specific sections

### Anti-Pattern 4: Server-Side Redirects on Static Hosts

**What people do:** Try to configure nginx/Apache redirects for Astro static sites hosted on GitHub Pages.

**Why it's wrong:**
- GitHub Pages doesn't support server configuration
- Overcomplicates deployment
- Static site generation is the strength - use it

**Do this instead:**
- Use Astro's `redirects` config for meta-refresh redirects
- If true server redirects needed, use Netlify `_redirects` file or Vercel config
- For GitHub Pages, Astro meta-refresh is the correct approach

### Anti-Pattern 5: Separate Design System Site

**What people do:** Build a completely separate Astro site for design system docs at a different domain.

**Why it's wrong:**
- For small portfolios with 5-10 components, this is overkill
- Doubles deployment complexity
- Components can drift between main site and docs site
- Search engines index them separately

**Do this instead:**
- Single site with `/design` path for design system pages
- Share same components, tokens, and deployment
- Only split to separate site if design system serves multiple projects

## Build Order Recommendations

Based on dependencies and integration points, recommended build order:

### Phase 1: Data Layer (if using token display)
1. Create `src/data/design-tokens.json` with color, typography, spacing tokens
2. Validate JSON structure matches actual global.css values

### Phase 2: Helper Components (if needed)
3. Create `src/components/design-system/ColorSwatch.astro`
4. Create `src/components/design-system/ComponentVariants.astro` wrapper

### Phase 3: Main Reference Page
5. Create `src/pages/design/components.astro`
6. Import and display existing UI components (Button, Card, Input, Badge)
7. Add token display sections using helper components
8. Test all variants render correctly in light and dark mode

### Phase 4: Navigation Updates
9. Modify `src/components/layout/Header.astro` to add link to /design/components
10. Modify `src/components/layout/MobileNav.astro` if needed

### Phase 5: Redirects
11. Update `astro.config.mjs` with redirect from `/component-demo` to `/design/components`
12. Build and verify redirect works

### Phase 6: Documentation & Cleanup
13. Consider deprecating or removing old `/component-demo` page content
14. Update internal links across site to point to `/design/components`
15. Add metadata/SEO for design system page

## Sources

**Astro Documentation:**
- [Configuration Reference - Astro Docs](https://docs.astro.build/en/reference/configuration-reference/) - Redirects configuration syntax
- [Routing - Astro Docs](https://docs.astro.build/en/guides/routing/) - File-based routing patterns

**Design System Patterns:**
- [Best Practices for Scalable Component Libraries | UXPin](https://www.uxpin.com/studio/blog/best-practices-for-scalable-component-libraries/) - Component organization
- [3 Best Ways to Organize & Maintain Your Design System](https://www.insaim.design/blog/3-best-ways-to-organize-maintain-your-design-system) - Governance and structure
- [Design tokens | Design good practices](https://goodpractices.design/articles/design-tokens) - Token implementation
- [Tailwind CSS Best Practices 2025-2026: Design Tokens, Typography & Responsive Patterns | FrontendTools](https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns) - Token organization for Tailwind

**Redirect Patterns:**
- [Static Site Redirects With Astro (or Any Static Site Builder) - Lloyd Atkinson](https://www.lloydatkinson.net/posts/2022/static-site-redirects-with-astro/) - Meta-refresh redirect patterns
- [How to Fix Astro Redirect Settings When They Don't Work [Static Site SEO] - Nao](https://naonao-na.com/en/posts/astro-redirect-seo/) - Troubleshooting static redirects
- [Static Page Redirects using AstroJS](https://friedrichkurz.me/posts/2025-01-11/) - Implementation examples

**Component Showcase Patterns:**
- [10 Best Design System Examples for 2026 | DesignRush](https://www.designrush.com/best-designs/websites/trends/design-system-examples) - Industry examples
- [GitHub - jordienr/astro-design-system](https://github.com/jordienr/astro-design-system) - Astro design system starter
- [Building the Ultimate Design System: A Complete Architecture Guide for 2026 | Medium](https://medium.com/@padmacnu/building-the-ultimate-design-system-a-complete-architecture-guide-for-2026-6dfcab0e9999) - Complete architecture patterns

---
*Architecture research for: Design System Reference Pages in Astro*
*Researched: 2026-02-10*
*Confidence: HIGH*

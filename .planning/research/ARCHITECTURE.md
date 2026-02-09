# Architecture Research: Neobrutalist Design System

**Domain:** Neobrutalist design system for portfolio/blog site
**Researched:** 2026-02-09
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Design Token Layer                        │
│         (Tailwind 4 @theme directive in global.css)          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │  Colors  │ │ Shadows  │ │ Borders  │ │ Typography│       │
│  │  --color │ │ --shadow │ │ --radius │ │  --font   │       │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘        │
│       └────────────┴─────────────┴────────────┘              │
├─────────────────────────────────────────────────────────────┤
│                   Component Layer                            │
│      (Astro components using Tailwind utilities)             │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────┐  ┌───────────┐  ┌───────────┐                │
│  │  Button   │  │   Card    │  │   Form    │                │
│  │  Border   │  │  Shadow   │  │   Input   │                │
│  │  Hover    │  │  Layout   │  │  Focus    │                │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘                │
│        │               │               │                     │
├────────┴───────────────┴───────────────┴─────────────────────┤
│                    Page Layer                                │
│       (Existing layouts + pages consume components)          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐   │
│  │            BaseLayout.astro                           │   │
│  │    (Dark mode toggle, font loading, SEO)              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **Design Tokens** | Define color, spacing, shadow, border values | Tailwind 4 `@theme` directive with CSS custom properties |
| **Primitive Components** | Button, Card, Input with neobrutalist styling | Astro components with Tailwind utility classes |
| **Layout Components** | Header, Footer, Hero with updated styling | Modified existing components with new design tokens |
| **Theme Provider** | Dark mode toggle, localStorage persistence | Inline script in BaseLayout.astro (existing pattern) |

## Recommended Project Structure

### Integration with Existing Structure

```
src/
├── styles/
│   └── global.css              # MODIFY: Add @theme tokens, keep existing utilities
├── components/
│   ├── primitives/             # NEW: Neobrutalist base components
│   │   ├── Button.astro       # NEW: Button with border-2, shadow-brutal
│   │   ├── Card.astro         # NEW: Card with shadow-brutal, rounded-brutal
│   │   ├── Input.astro        # NEW: Form input with focus states
│   │   └── Badge.astro        # NEW: Tag/badge component
│   ├── layout/                # MODIFY: Update existing components
│   │   ├── Header.astro       # MODIFY: Apply neobrutalist button styles
│   │   ├── Footer.astro       # MODIFY: Update with new design tokens
│   │   └── MobileNav.astro    # MODIFY: Update styling
│   ├── Hero.astro             # MODIFY: Update CTA button
│   ├── BlogCard.astro         # MODIFY: Add shadow-brutal, border-2
│   ├── Services.astro         # MODIFY: Update card styling
│   ├── FAQ.astro              # MODIFY: Update accordion styling
│   ├── Process.astro          # MODIFY: Update card styling
│   └── About.astro            # MODIFY: Update styling
├── layouts/
│   └── BaseLayout.astro       # MODIFY: Update font imports (Poppins/Inter → quirky/readable)
└── pages/                     # NO CHANGES: Pages consume updated components
```

### Structure Rationale

- **`primitives/` folder:** NEW folder for reusable neobrutalist components. Separates design system primitives from composed components (Hero, Services, etc.). Follows Astro community pattern of organizing by abstraction level.

- **Modified existing components:** Leverage existing component structure, update with new Tailwind classes. Avoid wholesale rewrites—apply neobrutalist tokens via class swaps.

- **`global.css` as single source of truth:** Tailwind 4's `@theme` directive makes this file both the token definition and utility generator. No separate config file needed.

## Architectural Patterns

### Pattern 1: CSS-First Design Tokens with Tailwind 4 @theme

**What:** Define all design tokens (colors, shadows, borders, typography) in `global.css` using Tailwind 4's `@theme` directive. Tokens become both CSS custom properties and Tailwind utility classes.

**When to use:** For the entire design system—this is the foundation pattern for neobrutalism.

**Trade-offs:**
- **Pro:** Single source of truth, no JavaScript config, runtime CSS variables for dynamic theming
- **Pro:** Smaller build output, easier dark mode with semantic color names
- **Con:** Requires Tailwind 4 (project already uses this via `@tailwindcss/vite`)

**Example:**
```css
/* global.css */
@import "tailwindcss";

@theme {
  /* Neobrutalist color palette - high contrast */
  --color-yellow: oklch(0.90 0.15 95);
  --color-yellow-dark: oklch(0.85 0.18 95);
  --color-turquoise: oklch(0.70 0.15 190);
  --color-magenta: oklch(0.65 0.25 330);

  /* Semantic color mapping */
  --color-primary: var(--color-yellow);
  --color-secondary: var(--color-turquoise);
  --color-accent: var(--color-magenta);

  /* Neobrutalist shadows - solid, offset */
  --shadow-brutal: 4px 4px 0 0 rgb(0 0 0);
  --shadow-brutal-lg: 6px 6px 0 0 rgb(0 0 0);
  --shadow-brutal-inset: inset 4px 4px 0 0 rgb(0 0 0 / 0.1);

  /* Dark mode shadows - lighter color */
  --shadow-brutal-dark: 4px 4px 0 0 rgb(255 255 255 / 0.2);
  --shadow-brutal-lg-dark: 6px 6px 0 0 rgb(255 255 255 / 0.2);

  /* Borders - thick and bold */
  --radius-brutal: 0.5rem;  /* rounded-brutal */

  /* Typography */
  --font-heading: 'Space Grotesk', system-ui, sans-serif;  /* Example quirky font */
  --font-body: 'Inter', system-ui, sans-serif;  /* Keeps existing readable font */
}

/* Dark mode variant */
@custom-variant dark (&:where(.dark, .dark *));
```

### Pattern 2: Component Hover State with Shadow Translation

**What:** Neobrutalist buttons/cards have a distinctive "press" effect: on hover, the element translates to match the shadow offset, and the shadow disappears, creating the illusion of the element being pressed into the page.

**When to use:** Buttons, interactive cards, clickable elements.

**Trade-offs:**
- **Pro:** Distinctive kinetic feedback, maintains brutalist aesthetic, accessible (visible state change)
- **Con:** More CSS than simple opacity change, requires coordinated translation values

**Example:**
```astro
<!-- Button.astro -->
<button
  class="
    border-2 border-black dark:border-white
    shadow-brutal dark:shadow-brutal-dark
    bg-primary text-black
    rounded-brutal
    px-6 py-3
    font-heading font-bold
    transition-all duration-150
    hover:translate-x-1 hover:translate-y-1
    hover:shadow-none
    active:translate-x-1 active:translate-y-1
    active:shadow-none
  "
>
  <slot />
</button>
```

### Pattern 3: Dark Mode with High-Contrast Semantic Colors

**What:** Use semantic color tokens (`--color-primary`, `--color-bg`) that reference different base colors in light vs. dark mode. Neobrutalism requires higher contrast in dark mode to maintain the bold aesthetic.

**When to use:** All color decisions in components—never hardcode color values, always use semantic tokens.

**Trade-offs:**
- **Pro:** Easy mode switching, accessible contrast ratios, maintainable
- **Con:** Requires careful color selection to meet WCAG AA (4.5:1 text, 3:1 UI elements)

**Example:**
```css
@theme {
  /* Light mode colors */
  --color-bg: #ffffff;
  --color-text: #0a0a0a;
  --color-border: #0a0a0a;

  /* Dark mode requires custom properties + variant */
}

/* Approach 1: Dark mode override in @theme */
@custom-variant dark (&:where(.dark, .dark *));

/* Then in components, use dark: prefix */
.card {
  @apply bg-bg text-text border-border;
  @apply dark:bg-[#1a1a1a] dark:text-[#fafafa] dark:border-[#fafafa];
}

/* Approach 2: CSS custom properties with fallback (more flexible) */
:root {
  --color-bg-light: #ffffff;
  --color-bg-dark: #1a1a1a;
}

.dark {
  --color-bg: var(--color-bg-dark);
}

:root:not(.dark) {
  --color-bg: var(--color-bg-light);
}
```

### Pattern 4: Astro Component Composition with Tailwind Utilities

**What:** Build primitive components (Button, Card, Input) as Astro components that accept props for variants (size, color) but default to neobrutalist styling. Compose into larger components (Hero, BlogCard).

**When to use:** All neobrutalist components—keep them as Astro components (server-rendered) unless interactivity requires client-side JavaScript.

**Trade-offs:**
- **Pro:** Astro's zero-JS by default, props for flexibility, TypeScript for safety
- **Con:** No runtime state (use client:* directives if needed, e.g., for accordions)

**Example:**
```astro
---
// primitives/Button.astro
interface Props {
  variant?: 'primary' | 'secondary' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  class?: string;
}

const {
  variant = 'primary',
  size = 'md',
  href,
  class: className = ''
} = Astro.props;

const variantClasses = {
  primary: 'bg-primary text-black border-black dark:border-white',
  secondary: 'bg-secondary text-black border-black dark:border-white',
  neutral: 'bg-bg text-text border-border'
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
};

const baseClasses = `
  inline-flex items-center justify-center
  font-heading font-bold
  border-2 rounded-brutal
  shadow-brutal dark:shadow-brutal-dark
  transition-all duration-150
  hover:translate-x-1 hover:translate-y-1 hover:shadow-none
  active:translate-x-1 active:translate-y-1 active:shadow-none
  ${variantClasses[variant]}
  ${sizeClasses[size]}
  ${className}
`;

const Element = href ? 'a' : 'button';
---

<Element href={href} class={baseClasses}>
  <slot />
</Element>
```

### Pattern 5: Progressive Enhancement for Dark Mode

**What:** Use the existing inline script pattern in BaseLayout.astro to prevent FOUC (flash of unstyled content), setting dark mode class before page renders based on localStorage and system preference.

**When to use:** Keep the existing pattern—it works and is accessible.

**Trade-offs:**
- **Pro:** No flash, respects system preference, persists choice
- **Con:** Inline script (not a real con for this use case)

**Example (existing pattern to KEEP):**
```astro
<!-- BaseLayout.astro -->
<script is:inline>
  document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
       window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
</script>
```

## Data Flow

### Design Token Flow

```
@theme in global.css
    ↓
Tailwind generates utilities (bg-primary, shadow-brutal, etc.)
    ↓
Astro components use utilities in class attributes
    ↓
HTML rendered with inline styles (for static site)
    ↓
CSS custom properties available at runtime (for dynamic theming)
```

### Component Composition Flow

```
Primitive Component (Button.astro)
    ↓ props: variant, size
Component uses props to conditionally apply Tailwind classes
    ↓ compiles to
Static HTML with classes
    ↓
Browser renders with Tailwind CSS
```

### Dark Mode State Flow

```
Page Load → Inline Script Runs (before render)
    ↓
Check localStorage.theme or system preference
    ↓
Add/remove .dark class on <html>
    ↓
Tailwind dark: variant utilities activate
    ↓
CSS custom properties reference dark mode values
    ↓
User clicks theme toggle → localStorage updates → class toggles → CSS updates
```

### Key Data Flows

1. **Token definition to usage:** Tokens defined once in `@theme`, consumed via Tailwind utilities everywhere. No prop drilling, no JavaScript state for colors/shadows.

2. **Component variants:** Props select which Tailwind classes to apply. Composition at template time (Astro build), not runtime (JavaScript).

3. **Dark mode:** Class-based (.dark on html element), controlled by localStorage + script, CSS custom properties respond to class.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Current project (portfolio/blog) | Static site generation with Astro is perfect. No backend, no database, no scaling concerns. Design system complexity should remain low. |
| 10-50 pages | Same architecture. Tailwind purging keeps CSS small. Component library grows slowly. |
| 100+ components | Consider documenting components with Storybook or similar. May want to extract primitives to separate package if reused across multiple sites. |

### Scaling Priorities

1. **First bottleneck:** Build time as components increase. **Solution:** Astro's partial hydration and fast dev server should handle this. If needed, use client:visible for below-fold components.

2. **Second bottleneck:** Design token management if colors/shadows proliferate. **Solution:** Maintain discipline—limit palette to 5-7 colors, 3 shadow variants. Delete unused tokens.

## Anti-Patterns

### Anti-Pattern 1: Inline Styles or Style Tags

**What people do:** Define component-specific styles in `<style>` tags within Astro components or use inline `style=""` attributes for colors/shadows.

**Why it's wrong:**
- Breaks the design system—tokens defined in `@theme` aren't used
- Can't leverage Tailwind's purging or dark mode utilities
- Creates inconsistency across components

**Do this instead:** Always use Tailwind utility classes referencing design tokens. If you need a one-off style, extend `@theme` with a new token or use Tailwind's arbitrary values (`bg-[#abcdef]`) sparingly.

### Anti-Pattern 2: Over-Componentizing Primitives

**What people do:** Create separate Button.astro, PrimaryButton.astro, SecondaryButton.astro, LargeButton.astro, SmallButton.astro, etc.

**Why it's wrong:**
- Explosion of files for simple variants
- Hard to maintain, easy to drift in styling
- Loses the benefit of props for configuration

**Do this instead:** Single `Button.astro` component with props for `variant` and `size`. Use TypeScript interfaces to constrain valid values.

### Anti-Pattern 3: Hardcoding Shadow Offsets in Components

**What people do:** Write `translate-x-[4px] translate-y-[4px]` in component classes to match shadow offset.

**Why it's wrong:**
- If shadow offset changes in `@theme`, all components break
- Magic numbers scattered across codebase
- Not DRY

**Do this instead:**
**Option A:** Use Tailwind's default translate utilities that match your shadow offsets (e.g., if shadow is 4px, use `translate-x-1 translate-y-1` which is 0.25rem = 4px at base font size).

**Option B (better):** Define custom translate utilities in `@theme`:
```css
@theme {
  --spacing-brutal-offset: 4px;
  --spacing-brutal-offset-lg: 6px;
}
```
Then use `translate-x-brutal-offset translate-y-brutal-offset` (requires extending Tailwind with custom utilities, which is more complex—Option A is simpler).

**Recommended:** Stick with Option A using Tailwind's default spacing scale aligned to shadow offsets.

### Anti-Pattern 4: Using Client-Side JavaScript for Static Theming

**What people do:** Import React/Vue components with useState for buttons, cards, or other non-interactive elements just to get styled components.

**Why it's wrong:**
- Ships JavaScript for static content
- Breaks Astro's zero-JS philosophy
- Slower page loads, worse Lighthouse scores

**Do this instead:** Keep components as Astro (.astro) files. Only use `client:*` directives for truly interactive components (modals, carousels, form validation).

### Anti-Pattern 5: Skipping Accessibility for Aesthetics

**What people do:** Use color combinations that look bold but fail WCAG contrast ratios (e.g., yellow text on white background, or magenta on black failing 4.5:1).

**Why it's wrong:**
- Unusable for users with visual impairments
- Fails Lighthouse accessibility audit
- Legal/compliance issues for some projects

**Do this instead:**
- Test all color combinations with a contrast checker (WebAIM, Chrome DevTools)
- Yellow on black: GOOD (high contrast)
- Yellow on white: BAD (low contrast)—use yellow background with black text instead
- For dark mode, desaturate bright colors slightly to reduce eye strain while maintaining contrast
- Document contrast ratios in FEATURES.md or PITFALLS.md

## Integration Points

### With Existing Codebase

| Component | Integration Strategy | Notes |
|-----------|---------------------|-------|
| **global.css** | MODIFY: Replace existing `@theme` block, keep custom utilities (.prose, .toc, etc.) | Existing animations (fadeInScale) can stay—they're orthogonal to design system |
| **BaseLayout.astro** | MODIFY: Update font imports from Poppins/Inter to new heading/body fonts | Keep dark mode script as-is—it works |
| **Header.astro** | MODIFY: Replace button/link classes with primitive Button component or updated utility classes | Navigation links get neobrutalist hover states |
| **BlogCard.astro** | MODIFY: Add `border-2`, `shadow-brutal`, `rounded-brutal` classes | Keep existing props (title, slug, etc.)—only change styling |
| **Hero.astro** | MODIFY: CTA button becomes `<Button variant="primary">` | Keep existing layout structure |

### External Dependencies

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **Google Fonts** | Update font URLs in BaseLayout.astro | Example: Replace Poppins with Space Grotesk or DM Sans |
| **Tailwind CSS 4** | Already integrated via `@tailwindcss/vite` | Verify version is 4.x in package.json |
| **Astro Expressive Code** | NO CHANGES | Syntax highlighting for blog posts—keep existing theme |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| **Design Tokens ↔ Components** | Tailwind utility classes | One-way: tokens defined in CSS, consumed by components |
| **Primitives ↔ Composed Components** | Astro component imports and slots | Hero imports Button, BlogCard imports Card primitive |
| **Dark Mode ↔ All Components** | CSS class (.dark on html) + Tailwind dark: variant | Global toggle affects all components via CSS cascade |

## Build Order Recommendation

Based on dependency analysis, implement in this order:

### Phase 1: Foundation (Design Tokens)
1. Update `global.css` with neobrutalist `@theme` tokens (colors, shadows, borders, typography)
2. Update `BaseLayout.astro` with new font imports
3. Test dark mode still works with new tokens

**Rationale:** All components depend on tokens. Must be first.

### Phase 2: Primitives (Reusable Components)
4. Create `Button.astro` in `components/primitives/`
5. Create `Card.astro` in `components/primitives/`
6. Create `Input.astro` in `components/primitives/`

**Rationale:** Composed components (Hero, BlogCard) will use these. Build bottom-up.

### Phase 3: Update Existing Components
7. Modify `Hero.astro` to use `<Button>`
8. Modify `BlogCard.astro` to use neobrutalist classes
9. Modify `Header.astro` navigation and theme toggle
10. Modify other components (Services, FAQ, Process, About)

**Rationale:** Top-level components depend on primitives and tokens.

### Phase 4: Validation
11. Visual regression testing (manual or automated with Percy/Chromatic)
12. Lighthouse CI—verify accessibility scores stay ≥90
13. Dark mode testing

**Rationale:** Catch regressions before considering complete.

## Sources

### High Confidence (Official Documentation)
- [Tailwind CSS v4 @theme Documentation](https://tailwindcss.com/docs/theme) - Theme variables and token syntax
- [Astro Components Documentation](https://docs.astro.build/en/basics/astro-components/) - Component patterns and props
- [Astro Template Directives](https://docs.astro.build/en/reference/directives-reference/) - Client directives and hydration

### Medium Confidence (Verified Community Resources)
- [Neobrutalism Components GitHub](https://github.com/ekmas/neobrutalism-components) - Component patterns (note: no longer maintained but patterns valid)
- [Neobrutalism.dev Documentation](https://www.neobrutalism.dev/) - Shadow, border, and hover patterns
- [NN/G Neobrutalism Article](https://www.nngroup.com/articles/neobrutalism/) - Definition and best practices
- [Tailwind CSS Best Practices 2025-2026](https://www.frontendtools.front/blog/tailwind-css-best-practices-design-system-patterns) - Design token patterns

### Context (Design Philosophy)
- [Neubrutalism Web Design Trend - Bejamas](https://bejamas.com/blog/neubrutalism-web-design-trend) - Feature overview
- [Dark Mode Best Practices 2026](https://www.tech-rz.com/blog/dark-mode-design-best-practices-in-2026/) - High contrast and accessibility
- [Dark Mode UI Best Practices](https://www.designstudiouiux.com/blog/dark-mode-ui-design-best-practices/) - Contrast standards and color desaturation

---
*Architecture research for: Neobrutalist Design System*
*Researched: 2026-02-09*
*Confidence: HIGH (Tailwind 4 patterns verified with official docs, neobrutalist component patterns cross-referenced across multiple sources)*

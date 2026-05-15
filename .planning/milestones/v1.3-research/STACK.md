# Stack Research

**Domain:** Design system reference page and component documentation
**Researched:** 2026-02-10
**Confidence:** HIGH

## Executive Summary

For adding a design system reference page with component documentation and navigation cleanup to an existing Astro 5 portfolio, **NO new dependencies are required**. The existing stack (Astro 5.16.15, astro-expressive-code 0.41.6, @astrojs/mdx 4.3.13, TypeScript) already provides all necessary capabilities. Redirect handling is already configured in astro.config.mjs.

This milestone is a **pure implementation task** using existing tools, not a technology addition task.

## Existing Stack Capabilities (Already Validated)

### Core Technologies

| Technology | Current Version | Latest Version | Purpose | Capabilities for New Features |
|------------|-----------------|----------------|---------|-------------------------------|
| Astro | 5.16.15 | 5.17.1 | Static site generator | ✅ File-based routing for /design-system page<br/>✅ TypeScript props documentation via Props interface<br/>✅ Redirect configuration built-in<br/>✅ Component composition |
| @astrojs/mdx | 4.3.13 | 4.3.13 (current) | MDX processing | ✅ Component documentation in markdown<br/>✅ Import components into .mdx files<br/>✅ Embed live examples |
| astro-expressive-code | 0.41.6 | 0.41.6 (current) | Syntax highlighting | ✅ Fenced code blocks with syntax highlighting<br/>✅ Inline code via CSS selectors (`p > code`)<br/>✅ 100+ languages including Astro, TypeScript, HTML<br/>✅ Powers official Astro docs |
| TypeScript | Installed | - | Type safety | ✅ Component Props interface auto-detection<br/>✅ HTMLAttributes type for HTML element mirroring<br/>✅ Polymorphic component support via HTMLTag |
| @lucide/astro | 0.563.0 | - | Icon system | ✅ Already integrated and used |
| Tailwind CSS | 4.1.18 | - | Styling | ✅ Design tokens already defined in global.css |

### Redirect Handling

| Capability | Status | Implementation |
|-----------|--------|----------------|
| Astro redirects config | ✅ Already configured | `astro.config.mjs` lines 14-17 |
| Static site redirects | ✅ Generates `<meta http-equiv="refresh">` | Built-in for `output: static` mode |
| Route priority | ✅ Understood | Redirects lower precedence than actual files |
| Dynamic route redirects | ✅ Supported | Same parameters required for dynamic routes |

## What NOT to Add

| Avoid | Why | Existing Alternative |
|-------|-----|---------------------|
| Storybook | Overkill for 4 components, requires build tooling, separate dev server | Astro page with component showcase |
| react-live | Requires React runtime, client-side JavaScript bundle | Static examples with astro-expressive-code |
| Docusaurus | Separate framework, documentation-specific, too heavy | Astro with MDX already handles this |
| Sandpack | Client-side code playground, unnecessary JavaScript weight | Pre-rendered examples sufficient |
| Component library extractors (react-docgen, etc.) | Not needed for Astro components | Manual Props interface documentation |
| Additional syntax highlighters (Shiki, Prism standalone) | Redundant | astro-expressive-code already uses Shiki |

## Implementation Patterns for New Features

### 1. Design System Page Structure

**Pattern:** Single Astro page at `/src/pages/design-system.astro`

```typescript
// No new dependencies needed
import BaseLayout from '../layouts/BaseLayout.astro';
import Button from '../components/ui/Button.astro';
import Card from '../components/ui/Card.astro';
import { Code } from 'astro:components';
```

### 2. Component Documentation Pattern

**Pattern:** TypeScript Props interface + usage examples

```typescript
// Already supported - Props interface auto-detected
interface Props extends HTMLAttributes<'button'> {
  variant?: 'yellow' | 'turquoise' | 'magenta';
  size?: 'sm' | 'md' | 'lg';
}
```

**Display:** Show props table using TypeScript definitions, not automatic extraction.

### 3. Code Examples Pattern

**Pattern:** Fenced code blocks with astro-expressive-code + live component examples

```astro
<!-- Code example with syntax highlighting -->
```astro
<Button variant="yellow" size="lg">
  Click me
</Button>
\`\`\`

<!-- Live example right below -->
<div class="example-container">
  <Button variant="yellow" size="lg">
    Click me
  </Button>
</div>
```

**Inline code:** Styled with `p > code` CSS selector (already in global.css lines 417-426).

### 4. Redirect Handling

**Status:** Already configured in `astro.config.mjs`

```javascript
redirects: {
  '/portfolio': '/projects',
  '/portfolio/[slug]': '/projects/[slug]',
}
```

**For navigation cleanup:** Add redirects as needed, no library required.

### 5. Component Variant Showcase

**Pattern:** Grid layout with component instances

```astro
<!-- No JavaScript runtime needed -->
<div class="variant-grid">
  <Button variant="yellow">Yellow</Button>
  <Button variant="turquoise">Turquoise</Button>
  <Button variant="magenta">Magenta</Button>
</div>
```

**Interactive:** Components are interactive by default (CSS hover/active states).

## Version Compatibility

All existing packages are compatible and current:

| Package | Current | Latest | Action |
|---------|---------|--------|--------|
| astro | 5.16.15 | 5.17.1 | Optional: Update to 5.17.1 for latest features |
| @astrojs/mdx | 4.3.13 | 4.3.13 | ✅ Current |
| astro-expressive-code | 0.41.6 | 0.41.6 | ✅ Current |
| @tailwindcss/vite | 4.1.18 | - | ✅ Current |

**Recommendation:** Stay on current versions unless specific bug fixes are needed. Astro 5.17.1 is a minor patch release.

## Architecture Considerations

### Design System Page Organization

```
/src/pages/design-system.astro          # Main design system page
/src/components/design-system/
  ├── ComponentShowcase.astro           # Reusable component demo wrapper
  └── PropsTable.astro                  # Props documentation table
```

**Why this structure:**
- Keeps design system code separate from production components
- ComponentShowcase can wrap any component with example container
- PropsTable is reusable for all component documentation sections

### Component Documentation Approach

**Manual documentation** (recommended for 4 components):
- Define props in TypeScript Props interface
- Document in PropsTable component manually
- Show usage examples with code + live preview

**Why not automated:**
- Only 4 components to document (Button, Card, Input, Badge)
- Astro components don't have runtime prop extraction
- Manual documentation is clearer and more controlled
- No additional build complexity

## Integration Points

### With Existing Design System

**Color tokens:** Already defined in `/src/styles/global.css` lines 3-68
- Use CSS custom properties for color swatches
- No need to parse/extract programmatically

**Typography tokens:** Already defined in `/src/styles/global.css` lines 43-67
- Display using existing CSS variables
- No additional tools needed

**Components:** Import from `/src/components/ui/`
- Button, Card, Input, Badge already built
- Import and render directly in design system page

### With Navigation

**Current navigation:** `/src/components/layout/Header.astro`
- Add "Design System" link to nav array
- No routing library needed (file-based routing)

**Redirects:** Configured in `astro.config.mjs`
- Add new redirects as needed
- Static site generates `<meta>` redirects automatically

## Best Practices for Implementation

### 1. Code Example Pattern

```astro
<section class="component-section">
  <h2>Button Component</h2>

  <!-- Props documentation -->
  <PropsTable component="Button" props={buttonProps} />

  <!-- Code example -->
  <div class="code-example">
    <Code code={`<Button variant="yellow">Click me</Button>`} lang="astro" />
  </div>

  <!-- Live preview -->
  <div class="live-preview">
    <Button variant="yellow">Click me</Button>
  </div>
</section>
```

### 2. Variant Showcase Pattern

```astro
<!-- Show all variants in a grid -->
<div class="variant-showcase">
  {['yellow', 'turquoise', 'magenta'].map(variant => (
    <div class="variant-demo">
      <Button variant={variant}>{variant}</Button>
      <span class="variant-label">{variant}</span>
    </div>
  ))}
</div>
```

### 3. Design Token Display Pattern

```astro
<!-- Show color tokens -->
<div class="color-grid">
  <div class="color-swatch" style="background: var(--color-yellow)">
    <span>--color-yellow</span>
    <code>oklch(0.85 0.18 95)</code>
  </div>
</div>
```

## Sources

### Official Documentation (HIGH confidence)
- [Astro Components Documentation](https://docs.astro.build/en/basics/astro-components/) — Component composition and usage
- [Astro TypeScript Guide](https://docs.astro.build/en/guides/typescript/) — Props interface and type checking
- [Astro Syntax Highlighting](https://docs.astro.build/en/guides/syntax-highlighting/) — Code block configuration
- [Astro Routing Documentation](https://docs.astro.build/en/guides/routing/) — File-based routing and redirects
- [Astro Configuration Reference](https://docs.astro.build/en/reference/configuration-reference/) — Redirect configuration

### Package Verification (HIGH confidence)
- npm registry: astro@5.17.1 (latest), astro-expressive-code@0.41.6 (current), @astrojs/mdx@4.3.13 (current)

### Design System Patterns (MEDIUM confidence)
- [Building the Ultimate Design System: Architecture Guide for 2026](https://medium.com/@padmacnu/building-the-ultimate-design-system-a-complete-architecture-guide-for-2026-6dfcab0e9999) — Modern architecture approaches
- [The Design System Guide](https://thedesignsystem.guide/documentation) — Documentation best practices
- [Backlight: Design System Documentation Best Practices](https://backlight.dev/blog/design-system-documentation-best-practices) — Documentation patterns

### Astro Design System Examples (MEDIUM confidence)
- [Astro Design System Theme](https://astro.build/themes/details/astro-design-system-docs/) — Reference implementation
- [GitHub: astro-design-system by jordienr](https://github.com/jordienr/astro-design-system) — Starter template pattern
- [What's new in Astro - January 2026](https://astro.build/blog/whats-new-january-2026/) — Latest features and integrations

### Code Examples and Syntax Highlighting (MEDIUM confidence)
- [Expressive Code Documentation](https://expressive-code.com/key-features/syntax-highlighting/) — Syntax highlighting features
- [Astro Starlight: Code Component](https://starlight.astro.build/components/code/) — Code component usage patterns
- [Add inline syntax highlighting to Astro](https://camdecoster.dev/posts/add-inline-syntax-highlighting-to-astro/) — Inline code patterns

---
*Stack research for: Design system reference page and component documentation*
*Researched: 2026-02-10*
*Confidence: HIGH — All capabilities verified in existing dependencies*

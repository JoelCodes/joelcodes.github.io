# Phase 17: Design System Reference Page - Research

**Researched:** 2026-02-10
**Domain:** Internal design system documentation page with component showcase and JSON API
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Page Structure:**
- Sidebar navigation with persistent nav on desktop, content scrolls
- Hidden but accessible: not in main nav, but /design-system URL works
- Mobile behavior: Claude's discretion

**Section Order:**
- Claude's discretion: pick logical order based on developer workflow

**Code Examples:**
- "View code" toggle button reveals/hides snippet for each component
- Copy-to-clipboard button on each code block
- Static examples (no live props toggles)
- Syntax highlighting matches site theme (existing expressive-code setup from blog)

**Token Display:**
- Color swatches showing OKLCH + fallback hex values
- Follow site theme for dark/light mode (no separate toggle)
- Typography: both font specimens (character sets, weights) AND practical scale examples
- Isometric utilities (iso-shadow, iso-glow, iso-rotate): visual before/after examples

**Developer Workflow:**
- Primary audience: Joel and AI coding agents working on the site
- Add instruction to CLAUDE.md telling agents to check design system first
- Semantic HTML with clear section IDs for easy AI parsing
- JSON export at /design-system.json with tokens/components data for programmatic access

### Claude's Discretion

- Exact section order
- Mobile sidebar behavior (hamburger vs tabs)
- Level of "when to use" guidelines per component
- Code block styling details

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope

</user_constraints>

## Summary

Phase 17 requires building an internal design system documentation page at `/design-system` with a sidebar navigation, component showcases with code examples, design token displays, and a JSON API endpoint. **No new dependencies are required**—the existing Astro 5 + astro-expressive-code + Tailwind CSS 4 stack provides all necessary capabilities.

The project already has established patterns for:
- Client-side interactivity (dark mode toggle, TOC active state tracking)
- Syntax highlighting (expressive-code with theme matching)
- Component documentation (component-demo.astro)
- Design tokens (global.css with CSS custom properties)

**Primary recommendation:** Use Astro's native features for everything—file-based routing for pages, `.json.ts` endpoints for JSON API, inline `<script>` tags for client-side interactivity (toggle/copy), and existing expressive-code integration for syntax highlighting.

## Standard Stack

### Core (Already Installed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.16.15 | Static site generator | ✅ File-based routing (`/src/pages/design-system.astro`)<br/>✅ JSON endpoints (`/src/pages/design-system.json.ts`)<br/>✅ Component imports for live examples<br/>✅ Inline scripts for client-side interactivity |
| astro-expressive-code | 0.41.6 | Syntax highlighting | ✅ Already powers blog code blocks<br/>✅ Theme-aware highlighting (matches site theme)<br/>✅ 100+ languages including Astro, TypeScript, HTML<br/>✅ No configuration needed—works out of box |
| Tailwind CSS | 4.1.18 | Styling framework | ✅ Design tokens already defined in `global.css`<br/>✅ Utility classes for layout (grid, flex, sticky)<br/>✅ Dark mode via `.dark` class |
| TypeScript | Strict mode | Type safety | ✅ Component Props interfaces for documentation<br/>✅ Type-safe JSON endpoint responses |

### Supporting (No Installation Required)

| API/Feature | Purpose | When to Use | Browser Support |
|-------------|---------|-------------|-----------------|
| Navigator Clipboard API | Copy code to clipboard | `navigator.clipboard.writeText()` with async/await | Modern browsers (2026: universal support) |
| Intersection Observer API | Active TOC link tracking | Already used in `TableOfContents.astro` | Modern browsers (already proven in codebase) |
| CSS Custom Properties | Design token extraction | Read computed styles for token display | Universal support |
| Details/Summary elements | Code toggle (alternative) | Native HTML collapsible (if JS fails) | Universal support |

### Installation Commands

**No new packages required.** All capabilities exist in current stack.

```bash
# No npm install needed
# Verify existing setup:
npm run astro check  # TypeScript validation
npm run build        # Ensure expressive-code works
```

## Architecture Patterns

### Recommended Project Structure

```
/src
├── /pages
│   ├── design-system.astro          # Main documentation page
│   └── design-system.json.ts        # JSON API endpoint
├── /components
│   ├── /ui                          # Components being documented (existing)
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Input.astro
│   │   └── Badge.astro
│   └── /design-system               # Documentation-specific components (new)
│       ├── ComponentShowcase.astro  # Wrapper for component demos
│       ├── CodeBlock.astro          # Code example with toggle + copy
│       ├── TokenSwatch.astro        # Color token display
│       └── DesignSystemNav.astro    # Sidebar navigation
└── /styles
    └── global.css                   # Design tokens source of truth (existing)
```

**Why this structure:**
- Documentation components isolated from production UI components
- JSON endpoint co-located with page (both `/design-system/*`)
- Design tokens remain in `global.css` (single source of truth)
- No duplication of component definitions

### Pattern 1: Persistent Sidebar Navigation (Desktop)

**What:** Sticky sidebar that stays visible while content scrolls, common in design system documentation (Material UI, GitLab Pajamas, Wave Design System).

**When to use:** Desktop viewports (lg breakpoint and above)

**Example:**
```astro
<!-- Three-column grid (matches blog post layout pattern) -->
<div class="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
  <!-- Sidebar: sticky, scrollable -->
  <aside class="hidden lg:block">
    <nav class="sticky top-[76px] max-h-[calc(100vh-92px)] overflow-y-auto">
      <DesignSystemNav />
    </nav>
  </aside>

  <!-- Main content: scrolls independently -->
  <main>
    <section id="colors"><!-- ... --></section>
    <section id="typography"><!-- ... --></section>
    <section id="components"><!-- ... --></section>
  </main>
</div>
```

**Source:** Pattern verified in existing `blog/[slug].astro` (lines 43-111), [GitLab Pajamas](https://design.gitlab.com/usability/navigation-sidebar/), [Wave Design System](https://wave.volue.com/components/sidebar-navigation)

### Pattern 2: Code Toggle with Copy-to-Clipboard

**What:** Toggle button reveals/hides code snippet, copy button uses Clipboard API with success feedback.

**When to use:** Every component example section

**Example:**
```astro
<!-- CodeBlock.astro component -->
---
interface Props {
  code: string;
  lang?: string;
  title?: string;
}
const { code, lang = 'astro', title } = Astro.props;
---

<div class="code-block-wrapper">
  {title && <h4 class="code-title">{title}</h4>}

  <div class="code-controls">
    <button class="toggle-code" data-target="code-{Math.random()}">
      View Code
    </button>
  </div>

  <div class="code-content hidden" id="code-{Math.random()}">
    <button class="copy-button" data-code={code}>
      Copy
    </button>
    <Code code={code} lang={lang} />
  </div>
</div>

<script>
  // Toggle code visibility
  document.querySelectorAll('.toggle-code').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const codeBlock = document.getElementById(targetId);
      codeBlock?.classList.toggle('hidden');
      btn.textContent = codeBlock?.classList.contains('hidden')
        ? 'View Code'
        : 'Hide Code';
    });
  });

  // Copy to clipboard with feedback
  document.querySelectorAll('.copy-button').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.code);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('success');
        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('success');
        }, 2000);
      } catch (err) {
        console.error('Copy failed:', err);
        btn.textContent = 'Failed';
      }
    });
  });
</script>
```

**Sources:**
- Clipboard API: [MDN Clipboard.writeText()](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText) (updated 2026-01-23)
- Design patterns: [Carbon Design System](https://carbondesignsystem.com/components/code-snippet/usage/), [Helios CodeBlock](https://helios.hashicorp.design/components/code-block)
- Project pattern: Inline `<script>` tags verified in `Header.astro` (lines 65-80) and `TableOfContents.astro` (lines 30-49)

### Pattern 3: JSON API Endpoint for Design Tokens

**What:** Static JSON endpoint at `/design-system.json` providing programmatic access to all tokens and component metadata.

**When to use:** AI agents and tooling need to query available design system resources

**Example:**
```typescript
// src/pages/design-system.json.ts
export async function GET() {
  const tokens = {
    colors: {
      yellow: {
        oklch: 'oklch(0.85 0.18 95)',
        hex: '#ffef6a',
        dark: { oklch: 'oklch(0.80 0.16 95)', hex: '#f5e03b' }
      },
      turquoise: {
        oklch: 'oklch(0.70 0.15 195)',
        hex: '#4dd4c0',
        dark: { oklch: 'oklch(0.65 0.13 195)', hex: '#2dbfaa' }
      },
      // ... more colors
    },
    typography: {
      families: {
        heading: 'Bricolage Grotesque',
        body: 'DM Sans'
      },
      scale: {
        xs: '0.75rem',   // 12px
        sm: '0.875rem',  // 14px
        base: '1rem',    // 16px
        // ... more sizes
      }
    },
    components: {
      Button: {
        variants: ['yellow', 'turquoise', 'magenta'],
        sizes: ['sm', 'md', 'lg'],
        props: {
          variant: { type: 'string', default: 'yellow', options: ['yellow', 'turquoise', 'magenta'] },
          size: { type: 'string', default: 'md', options: ['sm', 'md', 'lg'] },
          href: { type: 'string', optional: true }
        }
      },
      // ... more components
    }
  };

  return new Response(JSON.stringify(tokens, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

**Sources:**
- [Astro Endpoints Documentation](https://docs.astro.build/en/guides/endpoints/)
- [Design Tokens Format Module 2025.10](https://www.designtokens.org/tr/drafts/format/)
- [Style Dictionary patterns](https://didoo.medium.com/how-to-manage-your-design-tokens-with-style-dictionary-98c795b938aa)

### Pattern 4: OKLCH Color Swatches with Hex Fallback

**What:** Display color tokens showing both OKLCH (modern) and hex (universal) values, with visual swatch.

**When to use:** Color token documentation section

**Example:**
```astro
<!-- TokenSwatch.astro -->
---
interface Props {
  name: string;
  oklch: string;
  hex: string;
}
const { name, oklch, hex } = Astro.props;
---

<div class="token-swatch">
  <div
    class="swatch-preview"
    style={`background: ${oklch}`}
    aria-hidden="true"
  ></div>
  <div class="swatch-details">
    <h4 class="token-name">{name}</h4>
    <div class="token-values">
      <code class="token-oklch">{oklch}</code>
      <code class="token-hex">{hex}</code>
    </div>
  </div>
</div>

<style>
  .swatch-preview {
    width: 100%;
    height: 80px;
    border: 3px solid var(--color-text-light);
    border-radius: 0.5rem;
    /* OKLCH with hex fallback */
    background: var(--fallback-hex);
    background: var(--oklch-value);
  }
</style>
```

**Note on conversion:** OKLCH values in `global.css` are already defined. For hex fallbacks in JSON export, use CSS computed styles or manual mapping (small number of colors makes manual mapping acceptable).

**Sources:**
- [OKLCH in CSS (Evil Martians)](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
- [OKLCH Color Picker](https://oklch.org)
- Existing implementation: `global.css` lines 3-29

### Pattern 5: Semantic HTML with Section IDs

**What:** Use semantic `<section>` elements with descriptive `id` attributes for anchor links and AI parsing.

**When to use:** All major content sections

**Example:**
```astro
<main>
  <section id="introduction" aria-labelledby="intro-heading">
    <h2 id="intro-heading">Introduction</h2>
    <!-- ... -->
  </section>

  <section id="colors" aria-labelledby="colors-heading">
    <h2 id="colors-heading">Color Tokens</h2>
    <div id="color-primary"><!-- Yellow, Turquoise, Magenta --></div>
    <div id="color-neutral"><!-- Text, Background --></div>
  </section>

  <section id="typography" aria-labelledby="typography-heading">
    <h2 id="typography-heading">Typography</h2>
    <div id="typography-families"><!-- Font specimens --></div>
    <div id="typography-scale"><!-- Size examples --></div>
  </section>

  <section id="components" aria-labelledby="components-heading">
    <h2 id="components-heading">Components</h2>
    <div id="component-button"><!-- Button variants --></div>
    <div id="component-card"><!-- Card variants --></div>
    <div id="component-input"><!-- Input variants --></div>
    <div id="component-badge"><!-- Badge variants --></div>
  </section>

  <section id="utilities" aria-labelledby="utilities-heading">
    <h2 id="utilities-heading">Isometric Utilities</h2>
    <div id="utility-shadow"><!-- iso-shadow examples --></div>
    <div id="utility-glow"><!-- iso-glow examples --></div>
    <div id="utility-rotate"><!-- iso-rotate examples --></div>
  </section>
</main>
```

**Benefits:**
- Clear document structure for screen readers
- Anchor links for sidebar navigation (`href="#colors"`)
- AI agents can easily find specific sections by ID
- Follows WCAG 2.1 best practices for landmarks

**Sources:**
- [MDN: HTML Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp)
- [Accessible Anchor Links (Amber Wilson)](https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/)
- [CivicActions Accessibility: Semantic HTML](https://accessibility.civicactions.com/guide/semantic-html)

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Syntax highlighting | Custom code highlighter with RegEx | astro-expressive-code (already installed) | Already integrated, theme-aware, supports 100+ languages, maintained by Astro team |
| Color conversion (OKLCH to hex) | JavaScript color space converter | Manual mapping (only 6 colors) OR CSS computed styles | Small color palette makes runtime conversion unnecessary |
| Clipboard interaction | `document.execCommand('copy')` (deprecated) | `navigator.clipboard.writeText()` async API | Modern standard, better error handling, works with HTTPS/localhost |
| Component prop extraction | AST parser for Astro components | Manual documentation from Props interface | Only 4 components, TypeScript Props already serve as documentation |
| Code toggle state | Complex state management library | Vanilla JavaScript with `classList.toggle()` | Simple show/hide needs no framework, matches existing patterns in `Header.astro` |
| Mobile navigation | Custom drawer component | `<details>` + `<summary>` HTML elements OR simple `.hidden` toggle | Accessibility built-in, progressive enhancement, matches Tailwind approach |

**Key insight:** This project already has proven patterns for client-side interactivity without frameworks (dark mode toggle, TOC observer). Continue that pattern—vanilla JS in `<script>` tags keeps bundle size minimal and code easy to understand.

## Common Pitfalls

### Pitfall 1: Expressive Code Not Working in Non-MDX Context

**What goes wrong:** Trying to use fenced code blocks (`` ```astro ``) directly in `.astro` files doesn't trigger syntax highlighting—expressive-code only processes MDX and Markdown.

**Why it happens:** Expressive-code is an Astro integration that hooks into the MDX/Markdown rendering pipeline, not the Astro component renderer.

**How to avoid:** Use Astro's built-in `<Code>` component from `astro:components` for syntax highlighting in `.astro` files.

**Correct pattern:**
```astro
---
import { Code } from 'astro:components';

const buttonExample = `<Button variant="yellow">Click me</Button>`;
---

<Code code={buttonExample} lang="astro" />
```

**Warning signs:** Code blocks render as plain text without syntax highlighting in Astro component pages.

**Sources:**
- [Astro Code Component Documentation](https://docs.astro.build/en/reference/api-reference/#code-)
- Verified in existing codebase: no manual code highlighting components exist

### Pitfall 2: Clipboard API Requires Secure Context

**What goes wrong:** `navigator.clipboard.writeText()` fails silently or throws security errors in non-HTTPS contexts (except localhost).

**Why it happens:** Clipboard API is restricted to secure contexts (HTTPS) to prevent malicious sites from reading/writing clipboard without user consent.

**How to avoid:**
1. Development: Astro dev server runs on `localhost` (secure context ✅)
2. Production: GitHub Pages uses HTTPS (secure context ✅)
3. Add try/catch for graceful error handling

**Correct pattern:**
```javascript
async function copyCode(text) {
  try {
    await navigator.clipboard.writeText(text);
    showSuccessFeedback();
  } catch (err) {
    console.error('Clipboard write failed:', err);
    fallbackCopyMethod(text); // Optional: show manual copy instructions
  }
}
```

**Warning signs:** Copy button works in dev but fails in production (check HTTPS), or throws `SecurityError` in console.

**Sources:**
- [MDN: Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
- [web.dev: Unblocking Clipboard Access](https://web.dev/articles/async-clipboard)

### Pitfall 3: JSON Endpoint Returns HTML Instead of JSON

**What goes wrong:** Visiting `/design-system.json` in browser shows HTML page instead of JSON, or content-type header is wrong.

**Why it happens:** Astro's JSON endpoints require explicit `Content-Type: application/json` header in Response, and file must end in `.json.ts` (not `.ts`).

**How to avoid:**
1. Use `.json.ts` extension (Astro strips `.ts`, leaving `.json`)
2. Set correct content-type header in Response
3. Export `GET` function that returns `Response` object

**Correct pattern:**
```typescript
// src/pages/design-system.json.ts (not .ts!)
export async function GET() {
  const data = { /* ... */ };

  return new Response(
    JSON.stringify(data, null, 2),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}
```

**Warning signs:** JSON endpoint serves HTML, or JSON downloads as file instead of displaying inline.

**Sources:**
- [Astro Endpoints Documentation](https://docs.astro.build/en/guides/endpoints/)
- [Testing Astro Endpoints](https://allpointsburnes.com/blog/2024-01-23-testing-dynamic-astro-endpoints/)

### Pitfall 4: Sticky Sidebar Overlaps Header or Footer

**What goes wrong:** Sidebar sticks to top of viewport but overlaps with site header, or extends below viewport on short screens.

**Why it happens:** `position: sticky` with `top: 0` doesn't account for header height, and `max-height: 100vh` doesn't account for header + padding.

**How to avoid:**
1. Set `top` value to header height + gap (e.g., `top: 76px` for 60px header + 16px gap)
2. Use `max-height: calc(100vh - header_height - gap)` for scrollable area
3. Test on short viewports (laptop screens, browser with dev tools open)

**Correct pattern:**
```astro
<!-- Matches existing TableOfContents.astro pattern -->
<nav class="sticky top-[76px] max-h-[calc(100vh-92px)] overflow-y-auto">
  <!-- Navigation links -->
</nav>
```

**Warning signs:** Sidebar overlaps header, content cut off on short screens, vertical scroll doesn't work inside sidebar.

**Sources:** Pattern verified in existing `TableOfContents.astro` (line 12), common design system issue

### Pitfall 5: Missing Noindex Meta Tag Causes SEO Issues

**What goes wrong:** Internal design system page appears in Google search results, creating duplicate content or exposing internal tooling.

**Why it happens:** Forgetting to add `<meta name="robots" content="noindex, follow">` to page `<head>`.

**How to avoid:**
1. Add noindex meta tag to design system page
2. Do NOT block in `robots.txt` (prevents Google from seeing noindex tag)
3. Use "follow" to allow link equity flow (if linking to production pages)

**Correct pattern:**
```astro
---
// src/pages/design-system.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Design System" description="Internal design system reference">
  <Fragment slot="head">
    <meta name="robots" content="noindex, follow" />
  </Fragment>

  <!-- Page content -->
</BaseLayout>
```

**Alternative:** Extend SEO component to accept `noindex` prop if page uses it.

**Warning signs:** Design system page appears in Google search results, Google Search Console shows indexing warnings.

**Sources:**
- [Google: Block Search Indexing with Noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing) (updated 2026-02-04)
- [MDN: Meta Robots Tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/robots)

## Code Examples

Verified patterns from official sources and existing codebase:

### Client-Side Script Pattern (Matches Existing Codebase)

```astro
<!-- Inline script in Astro component (proven pattern from Header.astro) -->
<button id="my-button">Click me</button>

<script>
  const button = document.getElementById('my-button');

  button?.addEventListener('click', () => {
    // Event handler logic
  });
</script>
```

**Source:** `Header.astro` lines 65-80, `TableOfContents.astro` lines 30-49

### Syntax Highlighting with Astro Code Component

```astro
---
import { Code } from 'astro:components';

const examples = {
  button: `<Button variant="yellow" size="md">
  Click me
</Button>`,
  card: `<Card variant="turquoise">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</Card>`
};
---

<h3>Button Example</h3>
<Code code={examples.button} lang="astro" />

<h3>Card Example</h3>
<Code code={examples.card} lang="astro" />
```

**Source:** [Astro Code Component API](https://docs.astro.build/en/reference/api-reference/#code-)

### Grid Layout with Sticky Sidebar (Matches Blog Pattern)

```astro
<!-- Proven pattern from blog/[slug].astro -->
<div class="container mx-auto px-4 py-12">
  <div class="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
    <!-- Sidebar: sticky, hidden on mobile -->
    <aside class="hidden lg:block">
      <nav class="sticky top-[76px] max-h-[calc(100vh-92px)] overflow-y-auto">
        <ul>
          <li><a href="#colors">Colors</a></li>
          <li><a href="#typography">Typography</a></li>
          <li><a href="#components">Components</a></li>
        </ul>
      </nav>
    </aside>

    <!-- Main content: scrolls independently -->
    <main class="max-w-none">
      <section id="colors"><!-- ... --></section>
      <section id="typography"><!-- ... --></section>
      <section id="components"><!-- ... --></section>
    </main>
  </div>
</div>
```

**Source:** `blog/[slug].astro` lines 43-111 (TableOfContents sidebar pattern)

### Live Component Example + Code Display

```astro
---
import Button from '../components/ui/Button.astro';
import { Code } from 'astro:components';

const buttonCode = `<Button variant="yellow">Yellow Button</Button>
<Button variant="turquoise">Turquoise Button</Button>
<Button variant="magenta">Magenta Button</Button>`;
---

<section id="component-button">
  <h2>Button Component</h2>

  <!-- Live examples (user can interact) -->
  <div class="component-demo">
    <Button variant="yellow">Yellow Button</Button>
    <Button variant="turquoise">Turquoise Button</Button>
    <Button variant="magenta">Magenta Button</Button>
  </div>

  <!-- Code example (collapsible with JS) -->
  <details>
    <summary>View Code</summary>
    <Code code={buttonCode} lang="astro" />
  </details>
</section>
```

**Source:** Pattern from `component-demo.astro` (lines 20-58) + HTML5 `<details>` element

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Storybook for component docs | Astro page with live imports | 2024-2025 | No separate build tool, no React dependency, faster builds |
| document.execCommand('copy') | navigator.clipboard.writeText() | 2020 (deprecated), fully replaced 2024+ | Async/await pattern, better error handling, HTTPS-only security |
| RGB/HSL colors | OKLCH colors | 2023-2024 (CSS Color Level 4) | Perceptually uniform, easier dark mode variants, P3 gamut support |
| Manual color conversion scripts | CSS custom properties + computed styles | 2024+ | Browser handles color space conversion, no build step |
| Separate design token management tools (Style Dictionary) | CSS custom properties as source of truth | 2024+ for small projects | No build step, works natively in browser, simpler for 4 components |
| robots.txt blocking | noindex meta tag | Always, but 2026 emphasis on meta tags | Allows Google to see noindex directive, better for internal pages |

**Deprecated/outdated:**
- `document.execCommand('copy')`: Use Clipboard API instead
- Parsing CSS with RegEx for token extraction: Use CSS custom properties directly
- RGB color values in design tokens: OKLCH provides better consistency across light/dark modes
- Separate documentation site (like Storybook): Astro supports inline component documentation natively

## Open Questions

### 1. Should we use `<details>` + `<summary>` or JavaScript toggle for code examples?

**What we know:**
- HTML `<details>` works without JavaScript (progressive enhancement)
- JavaScript toggle allows custom animations and state management
- User requested "View code" toggle button (suggests interactive element)

**What's unclear:**
- User preference for accessibility vs. styled interaction
- Whether "toggle button" implies custom styling over native HTML element

**Recommendation:**
- **Use JavaScript toggle** to match user's "toggle button" language
- Add `<noscript>` fallback showing all code examples expanded
- Allows custom styling to match design system aesthetic (neobrutalist buttons)

**Validation approach:** Implement JS toggle, test with JS disabled to verify graceful degradation

### 2. How should we handle OKLCH to hex conversion for JSON export?

**What we know:**
- Only 6 color tokens (yellow, turquoise, magenta × 2 modes)
- OKLCH values defined in `global.css` as CSS custom properties
- Browsers support OKLCH natively, but JSON consumers may not

**What's unclear:**
- Whether JSON API consumers (AI agents) can parse OKLCH format
- If runtime conversion via computed styles is worth complexity for 6 colors

**Recommendation:**
- **Manual mapping for JSON export** (6 colors = trivial to maintain)
- Include both OKLCH and hex in JSON response for maximum compatibility
- Document both formats in UI with code examples showing fallback pattern

**Validation approach:** Test JSON response with Claude Code (primary AI consumer) to verify OKLCH parsing

### 3. What section order best serves developer workflow?

**What we know:**
- Developers typically need: colors → typography → components → utilities
- Tokens (colors, typography) are building blocks for components
- Components depend on tokens for variants

**What's unclear:**
- Whether developers prefer "building blocks first" or "common tasks first" ordering
- If isometric utilities should be grouped with components or separate

**Recommendation:**
- **Section order:** Introduction → Colors → Typography → Components → Utilities
- Rationale: Matches dependency hierarchy (tokens → components → advanced features)
- Sidebar navigation makes order less critical (easy to jump anywhere)

**Validation approach:** Joel's feedback after first use, adjust if workflow doesn't match

## Sources

### Primary (HIGH confidence)

**Astro Documentation (Official):**
- [Astro Endpoints](https://docs.astro.build/en/guides/endpoints/) — JSON API routes
- [Astro Code Component](https://docs.astro.build/en/reference/api-reference/#code-) — Syntax highlighting
- [Astro Components](https://docs.astro.build/en/basics/astro-components/) — Component patterns

**Web Standards (MDN, Official Specs):**
- [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) — Copy to clipboard (updated 2026-01-23)
- [Clipboard.writeText()](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText) — Async copy method
- [Meta Robots Tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/robots) — Noindex implementation
- [Google: Block Search Indexing](https://developers.google.com/search/docs/crawling-indexing/block-indexing) — Noindex best practices (updated 2026-02-04)

**Design Tokens Standards:**
- [Design Tokens Format Module 2025.10](https://www.designtokens.org/tr/drafts/format/) — JSON token spec

**Existing Codebase (Project-Specific):**
- `/src/components/layout/Header.astro` (lines 65-80) — Client-side script pattern
- `/src/components/TableOfContents.astro` (lines 12, 30-49) — Sticky nav + Intersection Observer
- `/src/pages/blog/[slug].astro` (lines 43-111) — Three-column grid with sticky sidebar
- `/src/pages/component-demo.astro` (all) — Component showcase pattern
- `/src/styles/global.css` (lines 1-232) — Design tokens source of truth

### Secondary (MEDIUM confidence)

**Design System Examples:**
- [Design System Documentation Best Practices (UXPin)](https://www.uxpin.com/studio/blog/design-system-documentation-guide/)
- [7 Best Practices for Design System Documentation (UXPin)](https://www.uxpin.com/studio/blog/7-best-practices-for-design-system-documentation/)
- [Backlight: Design System Documentation Best Practices](https://backlight.dev/blog/design-system-documentation-best-practices)
- [The Design System Guide](https://thedesignsystem.guide/documentation)

**Design System Component Patterns:**
- [Carbon Design System: Code Snippet](https://carbondesignsystem.com/components/code-snippet/usage/) — Copy button patterns
- [Helios (HashiCorp): Code Block](https://helios.hashicorp.design/components/code-block) — Code display with copy
- [Material UI: Drawer](https://mui.com/material-ui/react-drawer/) — Persistent navigation
- [GitLab Pajamas: Navigation Sidebar](https://design.gitlab.com/usability/navigation-sidebar/) — Sidebar patterns
- [Wave Design System: Sidebar Navigation](https://wave.volue.com/components/sidebar-navigation) — Hierarchical nav

**OKLCH Color Resources:**
- [OKLCH in CSS (Evil Martians)](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl) — OKLCH benefits
- [OKLCH Color Picker](https://oklch.org) — Conversion tools

**Accessibility Resources:**
- [Accessible Anchor Links (Amber Wilson)](https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/)
- [CivicActions: Semantic HTML](https://accessibility.civicactions.com/guide/semantic-html)
- [MDN: HTML Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp)

**Web APIs:**
- [web.dev: Unblocking Clipboard Access](https://web.dev/articles/async-clipboard)
- [web.dev: How to Copy Text](https://web.dev/patterns/clipboard/copy-text)

### Tertiary (LOW confidence - not used for recommendations)

None — all research findings verified through primary or secondary sources.

## Metadata

**Confidence breakdown:**
- Standard stack: **HIGH** — All capabilities verified in existing `package.json`, `astro.config.mjs`, and working codebase
- Architecture patterns: **HIGH** — Patterns proven in existing files (`Header.astro`, `TableOfContents.astro`, `blog/[slug].astro`)
- Code examples: **HIGH** — Direct from official Astro docs and verified in codebase
- Design system best practices: **MEDIUM** — Sourced from reputable design systems (Carbon, Material UI, GitLab) but not project-specific
- OKLCH conversion: **MEDIUM** — Browser support verified, but project-specific implementation not tested yet

**Research date:** 2026-02-10
**Valid until:** 2026-03-12 (30 days — Astro is stable, web standards are stable)

---

**Next step:** Planning agent can use this research to create detailed PLAN.md tasks with specific file paths, code patterns, and validation steps. All recommendations are implementation-ready with no additional investigation required.

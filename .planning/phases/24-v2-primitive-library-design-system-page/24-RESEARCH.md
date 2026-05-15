# Phase 24: v2 Primitive Library + Design System Page — Research

**Researched:** 2026-05-14
**Domain:** Astro 5 component authoring, Tailwind CSS 4 utility-first primitives, WCAG 2.2 AA accessibility, @lucide/astro icon-as-prop pattern
**Confidence:** HIGH (all findings verified against actual codebase artifacts and installed packages)

---

## Summary

Phase 24 builds four hand-authored Astro primitive components (Button, Card composition, Input, Badge) on the already-shipped Phase 23 token foundation, then replaces `src/pages/design-system.astro` in place with a live-demo page on `BaseLayoutV2`. All decisions are locked in CONTEXT D-01..D-21 and UI-SPEC. This research verifies the Phase 23 foundation is complete, audits the installed package surface, confirms the concrete Astro patterns for icon-as-prop and polymorphic tags, and documents every constraint the executor must respect.

The Phase 23 foundation is confirmed complete: `src/styles/v2/global.css` has 33 tokens across 5 categories (8 colors, 6 spacing, 4 radii, 8 type sizes, 2 fonts + 3 weights + 2 line-heights); `src/layouts/v2/BaseLayout.astro` exists and renders light-only; `src/components/v2/layout/{Header,Footer,MobileNav}.astro` exist and follow the utility-first, scoped-style-only pattern. The `src/components/v2/ui/` directory does not exist yet — Phase 24 creates it.

**Primary recommendation:** Follow the Header.astro pattern exactly — Tailwind utility classes for all layout/spacing/color, scoped `<style>` block ONLY for `:focus-visible` outline rule and any transition that cannot be expressed as a single utility. Zero `is:global` blocks, zero dark: utilities, zero direct `--font-heading`/`--font-body` references.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | ^5.16.15 | Component authoring, SSG | Project foundation; v2 components are `.astro` files |
| Tailwind CSS | ^4.1.18 | Utility classes from `@theme` tokens | `@theme` block auto-generates utilities from v2 custom properties; already verified in Phase 23 |
| @lucide/astro | ^0.563.0 | Icon components passed as props | Already installed; used in MobileNav.astro for Menu/X icons; `AstroComponent` type exported |
| @axe-core/playwright | ^4.11.1 | WCAG 2.2 AA automated scanning | Already installed; pattern established in `tests/accessibility/v2-layout.spec.ts` |
| @playwright/test | ^1.58.2 | Test runner for accessibility spec | Already installed; playwright.config.ts configured with `baseURL: 'http://localhost:4321'` |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @fontsource-variable/plus-jakarta-sans | ^5.2.8 | Display font | Already loaded via `@import` in v2/global.css; access via `font-display` utility |
| @fontsource-variable/inter | ^5.2.8 | Text font | Already loaded; access via `font-text` utility |
| simple-icons-astro | ^16.1.0 | Branded icons | Footer only — NOT used in Phase 24 primitives |

### No New Packages Required

Phase 24 requires zero new npm installs. Every dependency is already in `package.json`. The `src/components/v2/ui/` directory is the only thing that does not exist yet.

**Installation:**
```bash
# No new packages — all dependencies already installed
```

---

## Architecture Patterns

### Confirmed v2 Directory Structure (Phase 23 output)

```
src/
├── styles/v2/global.css          # 33 tokens in @theme block — LOCKED, do not modify
├── layouts/v2/
│   └── BaseLayout.astro          # Light-only layout shell — LOCKED
└── components/v2/
    ├── layout/
    │   ├── Header.astro           # Reference pattern for utility-first authoring
    │   ├── Footer.astro           # Reference pattern for SimpleIcons usage
    │   └── MobileNav.astro        # Reference pattern for focus-trap + focus-visible
    └── ui/                        # Phase 24 CREATES this directory
        ├── Button.astro
        ├── Card.astro
        ├── CardHeader.astro
        ├── CardBody.astro
        ├── CardFooter.astro
        ├── Input.astro
        └── Badge.astro
```

Pages modified in place:
```
src/pages/
├── design-system.astro    # REPLACED in place (v1 → v2)
└── design-system.json.ts  # REPLACED in place (v1 → v2 flat shape)
```

Tests added:
```
tests/accessibility/
└── v2-primitives.spec.ts  # NEW — targets /design-system route
```

### Pattern 1: Polymorphic Tag (href → `<a>`, else `<button>`)

This pattern is already established in Header.astro's "Let's Talk" CTA. The v1 Button.astro also uses it. For v2 Button:

```typescript
// Source: established pattern — v1 Button.astro + Header.astro header CTA
const Tag = href ? 'a' : 'button';
```

The v2 Button must also conditionally apply `type={!href ? type : undefined}` (inherited from v1 pattern) so `<a>` elements don't receive a `type` attribute.

### Pattern 2: Tailwind v4 Utility Classes from @theme Tokens

The `@theme` block in `src/styles/v2/global.css` automatically generates Tailwind utility classes. Verified working in Phase 23 components:

```
Token declared:        --color-accent:  oklch(0.79 0.184 148.5);
Generated utilities:   bg-accent, text-accent, border-accent, fill-accent, etc.

Token declared:        --space-sm:  1rem;
Generated utilities:   p-sm, px-sm, py-sm, gap-sm, m-sm, mx-sm, my-sm, etc.

Token declared:        --radius-md:  0.625rem;
Generated utilities:   rounded-md

Token declared:        --font-display: "Plus Jakarta Sans Variable", ...
Generated utilities:   font-display

Token declared:        --font-weight-text-bold:  500;
Generated utilities:   font-text-bold (NOTE: verify this generates correctly — see Open Questions)
```

Verified usage in Header.astro: `class="bg-accent text-text font-text font-semibold rounded-md px-5 py-2.5"`. Note that `px-5 py-2.5` uses Tailwind's built-in numeric scale (20px / 10px), not the `--space-*` tokens, because there is no token at that exact value. This is the established precedent for Button sm padding (12px vertical = `py-3` literal).

### Pattern 3: Scoped `<style>` for Focus Ring

The `:focus-visible` rule cannot be cleanly expressed as a Tailwind utility because `outline-offset` requires two properties together and `outline-color: var(--color-accent)` has cross-browser quirks in pure utility form. Established precedent from v1 and v2 layout components:

```astro
<!-- Source: MobileNav.astro focus pattern + D-18 rule -->
<style>
  .btn:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
</style>
```

This is the ONLY valid reason for a scoped `<style>` block in v2 primitives. Transitions (e.g., `transition-colors`, `transition-opacity`) are fine as Tailwind utilities. The hover-lift `translateY(-2px)` on interactive Card may need a `transition` in a scoped block if the utility form is awkward; use `transition-transform duration-200 ease-in-out` utilities first.

### Pattern 4: Lucide Icon as Prop (`iconLeft`, `iconRight`)

This is the key new pattern for Phase 24. Lucide icons are `AstroComponentFactory` instances (confirmed from `createLucideIcon.ts`). The library exports `AstroComponent` as a type alias: `type AstroComponent = (_props: IconProps) => any`.

The correct TypeScript type for an icon prop is `import type { AstroComponent } from '@lucide/astro'`. Rendering at the call site:

```astro
---
// Source: @lucide/astro/src/types.ts — AstroComponent type
import type { AstroComponent } from '@lucide/astro';

interface Props {
  iconLeft?: AstroComponent;
  iconRight?: AstroComponent;
}
const { iconLeft: IconLeft, iconRight: IconRight } = Astro.props;
---

{IconLeft && <IconLeft size={16} aria-hidden="true" class="shrink-0" />}
```

The pattern: destructure to a capitalized local variable, then use as a JSX-style component tag. This is required because Astro (like JSX) only treats capitalized identifiers as components. The `size` and `aria-hidden` props are passed inline at render time.

For Button's `link` variant ArrowRight default, import `ArrowRight` at the top of Button.astro and set it as the prop default:

```astro
---
import { ArrowRight } from '@lucide/astro';
import type { AstroComponent } from '@lucide/astro';

interface Props {
  iconRight?: AstroComponent | null; // null explicitly suppresses the default
}
const { iconRight = ArrowRight } = Astro.props;
// But only render for 'link' variant:
const resolvedIconRight = variant === 'link' ? (iconRight ?? ArrowRight) : iconRight;
---
```

Callers can pass `iconRight={null}` to suppress the ArrowRight default on `link` variant (per D-04).

### Pattern 5: Astro Composition — Card Sub-components

Astro has no React-style namespaced exports (i.e., `Card.Header` is not possible). Each sub-component is a separate import at the call site:

```astro
---
// Source: D-05, Astro documentation — no namespace exports
import Card from '../components/v2/ui/Card.astro';
import CardHeader from '../components/v2/ui/CardHeader.astro';
import CardBody from '../components/v2/ui/CardBody.astro';
import CardFooter from '../components/v2/ui/CardFooter.astro';
---
<Card elevated>
  <CardHeader>Default card</CardHeader>
  <CardBody>Content here</CardBody>
  <CardFooter>Footer action</CardFooter>
</Card>
```

Each sub-component uses `<slot />` to render its children. The `Card.astro` wrapper renders its children via `<slot />` as well — no named slots required for the basic composition.

### Pattern 6: Input Polymorphism with `as` Prop

Established in v1 Input.astro. v2 version follows the same pattern but uses v2 tokens and adds `role="alert"` on the error element:

```astro
---
const Tag = as === 'textarea' ? 'textarea' : as === 'select' ? 'select' : 'input';
const errorId = error ? `${id}-error` : undefined;
---
<div>
  <label for={id}>
    {label}{required && <span aria-hidden="true"> *</span>}
  </label>
  <Tag
    id={id}
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={errorId}
    disabled={disabled}
    {...rest}
  >
    {as === 'select' && <slot />}
  </Tag>
  {error && (
    <p id={errorId} role="alert" class="...">
      {error}
    </p>
  )}
</div>
```

The `role="alert"` on the error paragraph ensures screen readers announce it dynamically when the error prop changes. `aria-describedby` links the input to the error element by ID.

### Pattern 7: Playwright + axe-core Test (established in v2-layout.spec.ts)

```typescript
// Source: tests/accessibility/v2-layout.spec.ts
import AxeBuilder from '@axe-core/playwright';
const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test('zero axe-core violations', async ({ page }) => {
  await page.goto('/design-system');
  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
  expect(results.violations).toEqual([]);
});
```

The new test file lives at `tests/accessibility/v2-primitives.spec.ts`. It targets `/design-system` (the rebuilt page, not a throwaway smoke route) per D-20.

### Anti-Patterns to Avoid

- **`is:global` blocks:** Zero tolerance in v2 components. v1 Button.astro uses `:global(.dark)` everywhere — do NOT copy this.
- **`dark:` Tailwind utilities:** Forbidden in v2 primitives (D-19 / D-08 carry-forward). v1 Badge.astro uses `dark:bg-yellow-dark` — do NOT copy.
- **`--font-heading` / `--font-body` references:** v1 collision names. v2 uses `--font-display` / `--font-text`. v1 Input.astro uses `font-family: var(--font-heading)` — do NOT copy.
- **Scoped style for everything:** Only `:focus-visible` rules and un-expressible transitions belong in scoped `<style>`. All color, spacing, typography → Tailwind utilities.
- **Random ID generation:** v1 Input.astro uses `Math.random()` for fallback IDs. v2 must require `id` as a required prop (or use `crypto.randomUUID()` if Astro exposes it — but just require it since the design-system page controls all demo instances).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Icon components | Custom SVG inline code | `@lucide/astro` (already installed) | Tree-shaken, consistent stroke-width, `aria-hidden` auto-applied |
| WCAG axe scanning | Manual contrast checkers | `@axe-core/playwright` (already installed) | Automated, reproducible, CI-gateable |
| Font loading | CSS `@font-face` blocks | `@fontsource-variable` + existing `@import` in v2/global.css | Already installed and imported; adding more imports causes duplication |
| Token collision detection | Manual audit | `tests/check-token-collision.cjs` (already exists) | Phase 23 Wave-0 guard; run it when adding any new CSS custom properties |
| Shadow token | New literal box-shadow string | Either promote `--shadow-md` to `src/styles/v2/global.css` OR use a scoped literal in Card.astro | Token promotion is preferred if any other primitive needs shadows; otherwise one scoped literal in Card is acceptable |

**Key insight:** This phase is build-only, not discovery-only. Every infrastructure piece (tokens, layout, fonts, test framework, icon library, collision guard) already exists. The executor's job is to compose primitives from the established foundation.

---

## Common Pitfalls

### Pitfall 1: Lucide Icon Prop Rendering Without Capitalization

**What goes wrong:** `const { iconLeft } = Astro.props; <iconLeft />` — Astro treats lowercase as an HTML element, renders nothing or throws.
**Why it happens:** JSX/Astro convention — component tags must be capitalized.
**How to avoid:** Always destructure to a capitalized alias: `const { iconLeft: IconLeft } = Astro.props; {IconLeft && <IconLeft />}`.
**Warning signs:** No icon renders at all even though prop is passed.

### Pitfall 2: Focus Ring on `<a>` Button Fails in Safari

**What goes wrong:** `outline: 2px solid var(--color-accent)` works on `<button>` but Safari sometimes requires `display: inline-flex` + explicit `outline-offset` to render correctly on `<a>` elements.
**Why it happens:** Safari historically had quirks with `outline` on inline-level elements.
**How to avoid:** Button wrapper renders as `inline-flex` (confirmed in Header.astro: `inline-flex items-center`). Keep the focus rule scoped to `:focus-visible` rather than `:focus` to avoid spurious rings on click.
**Warning signs:** axe-core passes but manual keyboard test shows ring missing in Safari.

### Pitfall 3: `aria-describedby` on Input Referencing Non-Existent Element

**What goes wrong:** If `error` prop is falsy, the error element is not rendered, but if `aria-describedby` still points to the error ID, screen readers will announce nothing or error.
**Why it happens:** Conditional rendering of the error element not synchronized with `aria-describedby`.
**How to avoid:** Only set `aria-describedby={errorId}` when `errorId` is defined (i.e., when `error` is truthy). v1 Input.astro handles this correctly — replicate the pattern.
**Warning signs:** axe-core reports "aria-describedby references element that does not exist".

### Pitfall 4: Card `interactive` Focus Ring Conflicts with Card Border

**What goes wrong:** `outline: 2px solid var(--color-accent); outline-offset: 2px` renders the accent green ring outside the card border. If Card has `border-radius: var(--radius-lg)` (16px), the outline must also be rounded. Browsers handle this via `border-radius` inheritance on `outline` in modern browsers — but it must be verified.
**Why it happens:** `outline` follows `border-radius` in Chrome/Firefox/Safari 16.4+. The project's Lighthouse target is modern browsers only.
**How to avoid:** Apply `:focus-visible` rule on the Card wrapper element (the `<div>` or `<article>`). Modern browsers (Chrome 94+, Firefox 85+, Safari 16.4+) correctly round the outline.
**Warning signs:** Focus ring appears as a rectangle over a rounded card.

### Pitfall 5: `design-system.json.ts` Returns v1 Token Values After Replacement

**What goes wrong:** The v1 shape has nested `colors.primary.yellow.cssVar` vs. v2's flat `colors.primary.cssVar`. If the replacement is incomplete, some keys remain from v1.
**Why it happens:** Partial replacement of the 115-line v1 file.
**How to avoid:** Replace the entire file content in Plan 24-04. The new shape is fully specified in D-16 and UI-SPEC. Verify the JSON response by fetching `/design-system.json` in the test suite.
**Warning signs:** Success criterion #3 fails — JSON contains `--color-yellow` instead of `--color-primary`.

### Pitfall 6: Tailwind Font-Weight Utilities Not Generated

**What goes wrong:** `--font-weight-text-bold: 500` declared in `@theme` may or may not generate a `font-text-bold` utility class. Tailwind v4 generates `font-{name}` from `--font-{name}` tokens but the `font-weight` mapping uses `fontWeight` keys.
**Why it happens:** Tailwind v4 maps `--font-weight-{name}` to `font-{name}` utilities — but this needs verification against Tailwind v4.1.x behavior.
**How to avoid:** Verify which utility class `--font-weight-text-bold: 500` generates. Safe fallback: use `font-medium` (Tailwind built-in for 500) for all medium-weight text. Header.astro already does this: `font-semibold` (600 from Tailwind's built-in scale) is used rather than a custom token utility. Similarly, Button labels should use `font-medium` (500) rather than relying on a custom `font-text-bold` utility.
**Warning signs:** Text renders at wrong weight; Tailwind CSS output missing the expected class.

### Pitfall 7: `select` Tag with Slot in Astro

**What goes wrong:** In Astro, `<select {...rest}><slot /></select>` does not work the same as React's children pattern. Astro slot inside a polymorphic element needs careful handling.
**Why it happens:** The v1 Input.astro uses `{as === 'select' && <slot />}` inside the Tag — this works because the slot content is the `<option>` elements, which are valid select children.
**How to avoid:** Copy the v1 pattern exactly: `{as === 'select' && <slot />}` inside the polymorphic `<Tag>`. Verify in the design-system demo that the select renders with its three options.
**Warning signs:** Select renders empty (no options visible).

---

## Code Examples

Verified patterns from the existing codebase:

### Button (polymorphic tag + Tailwind utilities only)

```astro
---
// Source: established from v1 Button.astro polymorphic pattern + Header.astro utility pattern
import { ArrowRight } from '@lucide/astro';
import type { AstroComponent } from '@lucide/astro';

interface Props {
  variant?: 'primary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  iconLeft?: AstroComponent;
  iconRight?: AstroComponent | null;
  disabled?: boolean;
}

const {
  variant = 'primary',
  size = 'md',
  href,
  iconLeft: IconLeft,
  iconRight: IconRightProp,
  disabled = false,
  ...rest
} = Astro.props;

const Tag = href ? 'a' : 'button';
// ArrowRight default only for 'link' variant; null suppresses it
const IconRight = variant === 'link'
  ? (IconRightProp === null ? null : (IconRightProp ?? ArrowRight))
  : IconRightProp;

const sizeClasses = {
  sm: 'px-sm py-3 text-small',   // 16px / 12px (12px = py-3 literal, see UI-SPEC)
  md: 'px-5 py-sm text-body',    // 20px / 16px (Crito [16, 20] verified — px-5=20px, py-sm=16px)
  lg: 'px-lg py-5 text-body',    // 32px / 20px (py-5=20px literal)
};
---

<Tag
  class:list={[
    'inline-flex items-center gap-xs font-display font-text-bold rounded-md transition-opacity',
    variant === 'primary' && 'bg-accent text-text hover:opacity-90',
    variant === 'ghost' && 'bg-transparent text-text border border-border hover:bg-surface-muted',
    variant === 'link' && 'bg-transparent text-text hover:text-accent',
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
  ]}
  href={href}
  type={!href ? 'button' : undefined}
  disabled={!href ? disabled : undefined}
  aria-disabled={href && disabled ? 'true' : undefined}
  {...rest}
>
  {IconLeft && <IconLeft size={size === 'sm' ? 14 : 16} aria-hidden="true" class="shrink-0" />}
  <slot />
  {IconRight && <IconRight size={size === 'sm' ? 14 : 16} aria-hidden="true" class="shrink-0" />}
</Tag>

<style>
  /* Only focus-visible rule cannot be expressed cleanly as utilities */
  a:focus-visible,
  button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
  /* link variant hover arrow nudge */
  .link-variant:hover .lucide {
    transform: translateX(2px);
    transition: transform 150ms ease;
  }
</style>
```

### Card composition (wrapper only)

```astro
---
// Source: D-05, D-06, D-07
interface Props {
  elevated?: boolean;
  interactive?: boolean;
  class?: string;
}
const { elevated = false, interactive = false, class: className = '' } = Astro.props;
---
<div
  tabindex={interactive ? 0 : undefined}
  class:list={[
    'bg-surface border border-border rounded-lg',
    elevated && 'shadow-card',        // either a token utility or literal in scoped style
    interactive && 'cursor-pointer transition-transform duration-200 hover:-translate-y-0.5',
    className,
  ]}
>
  <slot />
</div>

<style>
  div:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
  /* If no --shadow-card token, use literal: */
  .shadow-card {
    box-shadow: 0 4px 6px -1px oklch(0 0 0 / 0.1), 0 2px 4px -2px oklch(0 0 0 / 0.1);
  }
</style>
```

Note: `hover:-translate-y-0.5` is `translateY(-2px)` in Tailwind (0.5 = 0.125rem = 2px). Verify this generates from the built-in scale, not the `--space-*` tokens.

### Playwright keyboard test (new file pattern)

```typescript
// Source: tests/accessibility/v2-layout.spec.ts — adapted for /design-system
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('v2 Primitives Accessibility (Phase 24)', () => {
  test('/design-system has zero axe-core violations', async ({ page }) => {
    await page.goto('/design-system');
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });

  test('keyboard reaches all Buttons on /design-system', async ({ page }) => {
    await page.goto('/design-system');
    // Tab through; verify at least one Button variant gets focus
    const buttons = page.getByRole('button');
    const links = page.getByRole('link');
    // Count interactive elements — design-system has ~9 button/link demos + nav links
    const count = await buttons.count() + await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('no #theme-toggle in DOM on /design-system', async ({ page }) => {
    await page.goto('/design-system');
    expect(await page.locator('#theme-toggle').count()).toBe(0);
  });
});
```

### `/design-system.json.ts` v2 flat shape

```typescript
// Source: D-16 specification
export async function GET() {
  const tokens = {
    colors: {
      primary:      { cssVar: '--color-primary',      value: 'oklch(0.225 0.044 264.6)' },
      primaryHover: { cssVar: '--color-primary-hover', value: 'oklch(0.286 0.054 264.6)' },
      surface:      { cssVar: '--color-surface',       value: 'oklch(1 0 0)' },
      surfaceMuted: { cssVar: '--color-surface-muted', value: 'oklch(0.985 0 0)' },
      text:         { cssVar: '--color-text',          value: 'oklch(0.225 0.044 264.6)' },
      textMuted:    { cssVar: '--color-text-muted',    value: 'oklch(0.395 0.011 274.7)' },
      border:       { cssVar: '--color-border',        value: 'oklch(0.864 0.005 286.3)' },
      accent:       { cssVar: '--color-accent',        value: 'oklch(0.79 0.184 148.5)' },
    },
    spacing: {
      xs:  { cssVar: '--space-xs',  value: '0.5rem'  },
      sm:  { cssVar: '--space-sm',  value: '1rem'    },
      md:  { cssVar: '--space-md',  value: '1.5rem'  },
      lg:  { cssVar: '--space-lg',  value: '2rem'    },
      xl:  { cssVar: '--space-xl',  value: '3rem'    },
      '2xl': { cssVar: '--space-2xl', value: '5rem'  },
    },
    radii: {
      sm:   { cssVar: '--radius-sm',   value: '0.375rem' },
      md:   { cssVar: '--radius-md',   value: '0.625rem' },
      lg:   { cssVar: '--radius-lg',   value: '1rem'     },
      full: { cssVar: '--radius-full', value: '9999px'   },
    },
    typography: {
      display: { cssVar: '--text-display', value: '3rem'    },
      h1:      { cssVar: '--text-h1',      value: '2.25rem' },
      h2:      { cssVar: '--text-h2',      value: '1.875rem'},
      h3:      { cssVar: '--text-h3',      value: '1.5rem'  },
      h4:      { cssVar: '--text-h4',      value: '1.25rem' },
      body:    { cssVar: '--text-body',    value: '1rem'    },
      small:   { cssVar: '--text-small',   value: '0.875rem'},
      caption: { cssVar: '--text-caption', value: '0.75rem' },
    },
  };

  return new Response(JSON.stringify(tokens, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
```

---

## State of the Art

| Old Approach (v1) | Current Approach (v2) | Locked By | Impact |
|-------------------|-----------------------|-----------|--------|
| Neobrutalist Button with 2-layer offset-shadow | Clean rounded button, 3 variants using v2 tokens | D-01..D-04 | Simpler HTML, no pseudo-element tricks |
| Card with `box-shadow` colored offset | Card with 1px border + optional drop shadow | D-05..D-07 | Composition model enables Phase 26-29 feature cards |
| Badge as metric block (`label/value/description`) | Badge as chip/tag (pill, single text, optional icon) | D-09..D-11 | Hero metrics move to Card + typography (D-08) |
| `is:global .dark` selectors in every component | Zero dark-mode code in v2; scoped styles only | D-19 + Phase 23 D-08 | No v1/v2 style bleed |
| v1 design-system.json nested per-palette shape | Flat semantic shape per D-16 | D-16 | Simpler for downstream consumers |
| v1 design-system page with dark-mode toggle | v2 page on BaseLayoutV2, no toggle | D-17 | First real page served by v2 layout |

**Deprecated/outdated:**
- `--font-heading` / `--font-body`: v1 collision names. Use `--font-display` / `--font-text` in v2.
- `var(--color-yellow)` / `var(--color-turquoise)` / `var(--color-magenta)`: v1 palette. v2 uses `--color-accent` (green).
- `iso-shadow`, `iso-glow`, `iso-rotate` utilities: v1 isometric system. Not used in v2.
- `--border-neo` / `--border-neo-thick`: v1 neobrutalist border tokens. v2 uses `--color-border` with `border` class.

---

## Open Questions

### 1. Tailwind v4 Font-Weight Utility Generation

**What we know:** `--font-weight-text-bold: 500` is declared in `@theme`. Tailwind v4 generates utilities from `@theme` tokens, but the exact utility name for font-weight tokens depends on the Tailwind v4.1.x `@theme` mapping rules.

**What's unclear:** Does `--font-weight-text-bold: 500` generate `font-text-bold`? Or does Tailwind v4 map font-weight tokens differently?

**Recommendation:** During Plan 24-01 (Button), test `class="font-text-bold"` on a Button label and inspect the computed style. If it doesn't generate, fall back to Tailwind's built-in `font-medium` (500). Header.astro precedent uses `font-semibold` (600) rather than a custom token utility — suggests the custom font-weight utilities may not be relied upon. Safe default: `font-medium` for 500-weight labels.

### 2. Card Shadow Token vs. Literal

**What we know:** No `--shadow-md` token exists in `src/styles/v2/global.css`. The `elevated` Card prop needs a drop shadow.

**What's unclear:** Should Plan 24-02 add `--shadow-md` to `global.css` (token promotion), or use a scoped literal `box-shadow` in Card.astro?

**Recommendation:** Check if any other Phase 24 primitive needs a shadow. Badge and Button do not. Input does not. Only Card `elevated` needs it. If it's one use, use a scoped literal. Token promotion makes sense only if Phase 25+ feature cards also need the same shadow value. The executor should make this call during Plan 24-02 and document it in a code comment.

### 3. `hover:-translate-y-0.5` Utility for Card Interactive

**What we know:** Tailwind's default scale maps `-translate-y-0.5` to `translateY(-0.125rem)` = `-2px`. This matches the D-07 spec "small `translateY(-2px)`".

**What's unclear:** Whether `hover:-translate-y-0.5` is the correct Tailwind v4 syntax for this utility.

**Recommendation:** Use `hover:-translate-y-0.5` (standard Tailwind v4 negative translate utility). If it doesn't render correctly, fall back to a scoped `<style>` transition block. Verify during Plan 24-02 implementation.

---

## Sources

### Primary (HIGH confidence)

- `src/styles/v2/global.css` — complete 33-token v2 system, verified by direct file read
- `src/layouts/v2/BaseLayout.astro` — confirmed light-only, no theme-toggle, slot structure verified
- `src/components/v2/layout/Header.astro` — utility-first pattern reference, verified by direct read
- `src/components/v2/layout/MobileNav.astro` — focus-trap + `@lucide/astro` import pattern, verified
- `node_modules/@lucide/astro/src/types.ts` — `AstroComponent` type definition confirmed
- `node_modules/@lucide/astro/src/createLucideIcon.ts` — `AstroComponentFactory` confirmed
- `node_modules/@lucide/astro/src/Icon.astro` — `size`, `aria-hidden` prop handling confirmed
- `tests/accessibility/v2-layout.spec.ts` — established axe-core test pattern, verified
- `package.json` — all package versions verified: Astro 5.16.15, Tailwind 4.1.18, @lucide/astro 0.563.0, @axe-core/playwright 4.11.1, @playwright/test 1.58.2
- `tests/check-token-collision.cjs` — collision guard exists and operates on both CSS files

### Secondary (MEDIUM confidence)

- v1 `src/components/ui/Button.astro` — polymorphic tag pattern reference (API only, styles discarded)
- v1 `src/components/ui/Input.astro` — `as` polymorphism, `aria-describedby`, slot-for-select patterns
- `playwright.config.ts` — `baseURL: 'http://localhost:4321'`, `testDir: './tests'` confirmed

### Tertiary (LOW confidence)

- Tailwind v4 font-weight utility generation behavior — inferred from pattern inspection of Header.astro (which avoids custom weight utilities), not directly verified against Tailwind v4.1.x docs. Flagged as Open Question #1.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified in package.json, versions confirmed
- Architecture: HIGH — Phase 23 outputs verified by direct file reads; patterns extracted from actual code
- Pitfalls: HIGH for items derived from existing code; MEDIUM for browser-specific focus-ring behavior
- Lucide icon-as-prop pattern: HIGH — types verified from node_modules source

**Research date:** 2026-05-14
**Valid until:** 2026-06-14 (stable stack; main risk is Tailwind v4 minor version behavior changes)

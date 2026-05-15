# Phase 24: v2 Primitive Library + Design System Page — Pattern Map

**Mapped:** 2026-05-14
**Files analyzed:** 10 (7 new, 2 modified in-place, 1 new test)
**Analogs found:** 10 / 10

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/components/v2/ui/Button.astro` | component/primitive | request-response | `src/components/v2/layout/Header.astro` (CTA shape) + `src/components/ui/Button.astro` (API) | exact (v2 pattern + API) |
| `src/components/v2/ui/Card.astro` | component/primitive | request-response | `src/components/ui/Card.astro` (API shape) | role-match (same role, styles replaced) |
| `src/components/v2/ui/CardHeader.astro` | component/sub-primitive | request-response | `src/components/v2/layout/Header.astro` (slot + utility pattern) | role-match |
| `src/components/v2/ui/CardBody.astro` | component/sub-primitive | request-response | `src/components/v2/layout/Footer.astro` (interior content with token padding) | role-match |
| `src/components/v2/ui/CardFooter.astro` | component/sub-primitive | request-response | `src/components/v2/layout/Footer.astro` (slot + utility pattern) | role-match |
| `src/components/v2/ui/Input.astro` | component/primitive | request-response | `src/components/ui/Input.astro` (polymorphic `as`, aria pattern) | exact (API) + role-match (styles replaced) |
| `src/components/v2/ui/Badge.astro` | component/primitive | request-response | `src/components/v2/layout/Header.astro` (utility-only, inline-flex pattern) | role-match |
| `src/pages/design-system.astro` | page | request-response | `src/pages/design-system.astro` (v1 — structure reference only) | structure-reference (styles replaced entirely) |
| `src/pages/design-system.json.ts` | API endpoint | request-response | `src/pages/design-system.json.ts` (v1 — route pattern only) | structure-reference (content replaced entirely) |
| `tests/accessibility/v2-primitives.spec.ts` | test | request-response | `tests/accessibility/v2-layout.spec.ts` | exact |

---

## Pattern Assignments

### `src/components/v2/ui/Button.astro` (component/primitive, request-response)

**Primary analog:** `src/components/v2/layout/Header.astro` (v2 utility pattern + existing CTA shape)
**Secondary analog:** `src/components/ui/Button.astro` (polymorphic `href`→`<a>` API — structure only, styles discarded)

**Imports pattern** — copy from `src/components/v2/layout/MobileNav.astro` lines 1-2 for Lucide import style:
```typescript
import { Menu, X } from '@lucide/astro';
```
For Button, adapt to:
```typescript
import { ArrowRight } from '@lucide/astro';
import type { AstroComponent } from '@lucide/astro';
```

**Polymorphic tag pattern** — copy from `src/components/ui/Button.astro` lines 20, 32-33:
```typescript
const Tag = href ? 'a' : 'button';
// ...
href={href}
type={!href ? type : undefined}
```

**v2 utility-first CTA shape** — copy from `src/components/v2/layout/Header.astro` lines 41-47:
```astro
<a
  href="/#contact"
  class="inline-flex items-center px-5 py-2.5 rounded-md bg-accent text-text font-text font-semibold hover:opacity-90 transition-opacity"
>
  Let's Talk
</a>
```
This is the locked verified shape for `variant='primary' size='md'`. The v2 Button reproduces this exactly for that case.

**class:list pattern** — copy from `src/components/v2/layout/MobileNav.astro` lines 51-54:
```astro
class:list={[
  'font-display text-2xl font-semibold text-text hover:text-accent',
  { 'text-accent underline underline-offset-[6px]': active },
]}
```
Adapt: use `class:list` with array — string literals for always-on classes, conditional expressions for variant/size branches.

**Icon rendering pattern** — from RESEARCH Pattern 4 (verified from `node_modules/@lucide/astro`):
```astro
---
const { iconLeft: IconLeft, iconRight: IconRightProp } = Astro.props;
---
{IconLeft && <IconLeft size={16} aria-hidden="true" class="shrink-0" />}
```
Critical: destructure to capitalized alias. Lowercase identifiers are not treated as components by Astro/JSX.

**Focus ring scoped style** — copy the scoped `<style>` block approach (NOT `is:global`) used throughout v2 layout components. The only valid scoped rule for Button:
```css
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

**Anti-patterns to avoid from v1 analog:**
- `src/components/ui/Button.astro` lines 87-193: DO NOT copy any `:global(.dark)` selectors, `--btn-offset` pseudo-element layering, `var(--font-heading)`, or `var(--color-yellow)` references.

---

### `src/components/v2/ui/Card.astro` (component/primitive, request-response)

**Primary analog:** `src/components/v2/layout/Header.astro` (v2 utility-first structure)
**Secondary analog:** `src/components/ui/Card.astro` lines 1-18 (API shape — `class` passthrough, slot)

**Props interface** — copy class-passthrough pattern from `src/components/ui/Card.astro` lines 1-13:
```typescript
interface Props {
  variant?: 'yellow' | 'turquoise' | 'magenta';
  stacked?: boolean;
  class?: string;
}
const { variant = 'yellow', stacked = false, class: className = '' } = Astro.props;
```
Adapt to v2: replace variant names with `elevated?: boolean; interactive?: boolean; class?: string`.

**Wrapper element pattern** — copy from `src/components/ui/Card.astro` lines 15-19:
```astro
<div class={`card card-${variant} ...`}>
  <slot />
</div>
```
Adapt: use `class:list` with Tailwind utility array instead of CSS class string. Base classes: `bg-surface border border-border rounded-lg`.

**tabindex for interactive cards** — no direct analog in codebase; use `tabindex={interactive ? 0 : undefined}` per RESEARCH Pattern 3. The `MobileNav.astro` overlay `<div>` uses `role="dialog"` as the closest model for a non-button element receiving programmatic focus.

**Focus ring scoped style** — same approach as Button; place on the wrapper element selector:
```css
div:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

**Anti-patterns to avoid from v1 analog:**
- `src/components/ui/Card.astro` lines 22-92: DO NOT copy `:global(.dark)`, `--card-shadow`, pseudo-element stacking (`.card-stacked::before/::after`), `var(--border-neo-thick)`, or `var(--color-bg-light)`.

---

### `src/components/v2/ui/CardHeader.astro` (component/sub-primitive, request-response)

**Analog:** `src/components/v2/layout/Header.astro` — interior slot + utility class pattern

**Full component structure** — these sub-components are simple slot wrappers. Model the frontmatter + slot pattern from `src/components/v2/layout/Header.astro` lines 1-18 (how it imports and composes), but the actual template is just:
```astro
---
interface Props {
  class?: string;
}
const { class: className = '' } = Astro.props;
---
<div class:list={['px-md pt-md', className]}>
  <slot />
</div>
```
Token choices (`px-md pt-md` = 24px) are per UI-SPEC spacing scale; see CONTEXT D-05 and UI-SPEC CardHeader/CardBody/CardFooter section. No scoped `<style>` needed — all utility-expressible.

---

### `src/components/v2/ui/CardBody.astro` (component/sub-primitive, request-response)

**Analog:** `src/components/v2/layout/Footer.astro` — interior content layout with token-driven padding (lines 8-9: `class="container mx-auto px-4 py-12 grid..."`)

Same slot-wrapper structure as CardHeader. Padding: `p-md` (24px) default per UI-SPEC. No scoped style.

---

### `src/components/v2/ui/CardFooter.astro` (component/sub-primitive, request-response)

**Analog:** `src/components/v2/layout/Footer.astro` lines 47-55 — bottom-border divider + content section pattern:
```astro
<div class="border-t border-border">
  <div class="container mx-auto px-4 py-6 flex ...">
```
Adapt: `border-t border-border px-md pb-md pt-sm` (mirror of CardHeader, bottom-weighted). No scoped style.

---

### `src/components/v2/ui/Input.astro` (component/primitive, request-response)

**Primary analog:** `src/components/ui/Input.astro` — API is copied exactly (polymorphic `as`, label, error, aria pattern). Styles completely replaced.

**Imports pattern** — from `src/components/ui/Input.astro` line 1:
```typescript
import type { HTMLAttributes } from 'astro/types';
```
Retain this import for spreading native HTML attributes.

**Props interface** — copy structure from `src/components/ui/Input.astro` lines 2-23, replace with v2 API:
```typescript
interface Props extends Omit<HTMLAttributes<'input'>, 'class'> {
  as?: 'input' | 'textarea' | 'select';
  label: string;         // required in v2 (no default)
  id: string;            // required in v2 (no Math.random() fallback)
  error?: string;
  helper?: string;
  disabled?: boolean;
  required?: boolean;
  class?: string;
}
```
Key v2 difference: `id` is required (no `Math.random()` fallback — RESEARCH Anti-Patterns).

**Polymorphic tag + error ID pattern** — copy from `src/components/ui/Input.astro` lines 25-26:
```typescript
const errorId = error ? `${id}-error` : undefined;
const Tag = as === 'textarea' ? 'textarea' : as === 'select' ? 'select' : 'input';
```

**Template structure with aria** — copy from `src/components/ui/Input.astro` lines 29-50:
```astro
<div class={`input-wrapper ${className}`}>
  {label && (
    <label for={id} class="input-label">{label}</label>
  )}
  <Tag
    id={id}
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={errorId}
    rows={as === 'textarea' ? rows : undefined}
    {...rest}
  >
    {as === 'select' && <slot />}
  </Tag>
  {error && (
    <p id={errorId} class="input-error-message">{error}</p>
  )}
</div>
```
Key v2 additions: add `role="alert"` to the error `<p>` (RESEARCH Pattern 6), add `required` asterisk in label, add `disabled` bg/cursor classes, add `helper` text element. Replace all `input-*` CSS class names with Tailwind utilities. Replace `className` string with `class:list`.

**Focus ring scoped style** — same pattern: `<style>` block only for `:focus-visible` rule on the field element:
```css
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

**Anti-patterns to avoid from v1 analog:**
- `src/components/ui/Input.astro` lines 52-153: DO NOT copy `:global(.dark)`, `var(--font-body)`, `var(--font-heading)`, `var(--border-neo)`, `Math.random()` ID fallback, or the red OKLCH error color (`oklch(0.55 0.22 25)`). v2 error state uses no color signal (UI-SPEC Color section "Destructive" gap).

---

### `src/components/v2/ui/Badge.astro` (component/primitive, request-response)

**Primary analog:** `src/components/v2/layout/Header.astro` lines 41-47 — `inline-flex items-center` pill pattern with token utilities
**Secondary analog:** `src/components/ui/Badge.astro` lines 1-25 — variant/class pattern (API shape only; semantic contract is entirely different)

**CRITICAL SEMANTIC DIFFERENCE:** v1 Badge (`src/components/ui/Badge.astro`) is a metric block with `label/value/description` props. v2 Badge is a chip/tag. DO NOT copy any props beyond `variant` name convention.

**Imports pattern** — same Lucide icon-as-prop pattern as Button:
```typescript
import type { AstroComponent } from '@lucide/astro';
interface Props {
  variant?: 'accent' | 'muted' | 'outline';
  iconLeft?: AstroComponent;
  class?: string;
}
const { iconLeft: IconLeft } = Astro.props;
```

**Variant class map pattern** — copy structure from `src/components/ui/Badge.astro` lines 21-25:
```typescript
const variantClasses = {
  yellow: 'bg-yellow text-text-light ...',
  ...
};
```
Adapt to v2 tokens:
```typescript
const variantClasses = {
  accent:  'bg-accent text-text',
  muted:   'bg-surface-muted text-text-muted',
  outline: 'bg-transparent text-text border border-border',
};
```

**inline-flex pill template** — model on Header.astro CTA shape but simplified (no hover needed, Badge is non-interactive):
```astro
<span class:list={[
  'inline-flex items-center gap-xs',
  'px-3 py-1',               // 12px / 4px — UI-SPEC specified literals
  'rounded-full',
  'text-caption font-medium', // font-medium = 500 (safe fallback per RESEARCH Pitfall 6)
  variantClasses[variant],
  className,
]}>
  {IconLeft && <IconLeft size={12} aria-hidden="true" class="shrink-0" />}
  <slot />
</span>
```
Note: `px-3` (12px) is a UI-SPEC-documented literal exception to the token scale (between xs=8 and sm=16 for visual balance). `py-1` (4px) is also a micro-literal. Both documented in UI-SPEC Spacing Exceptions.

No scoped `<style>` needed — Badge is non-interactive, no `:focus-visible` required.

**Anti-patterns to avoid from v1 analog:**
- `src/components/ui/Badge.astro` lines 1-49: DO NOT copy `role="group"`, `aria-label={label}`, `label/value/description` props, `text-2xl font-bold uppercase`, `dark:bg-*`, or `iso-shadow`. Badge in v2 is a `<span>`, not a `<div role="group">`.

---

### `src/pages/design-system.astro` (page, request-response)

**Primary analog:** `src/layouts/v2/BaseLayout.astro` — the layout shell this page imports
**Secondary analog:** `src/pages/design-system.astro` (v1) lines 1-11 — import block structure only; all content and layout is replaced

**Layout import pattern** — copy from `src/layouts/v2/BaseLayout.astro` lines 1-6 (how it imports its own dependencies) and adapt for the page consumer:
```astro
---
import BaseLayout from '../layouts/v2/BaseLayout.astro';
import Button from '../components/v2/ui/Button.astro';
import Card from '../components/v2/ui/Card.astro';
import CardHeader from '../components/v2/ui/CardHeader.astro';
import CardBody from '../components/v2/ui/CardBody.astro';
import CardFooter from '../components/v2/ui/CardFooter.astro';
import Input from '../components/v2/ui/Input.astro';
import Badge from '../components/v2/ui/Badge.astro';
import { ArrowRight } from '@lucide/astro';
---
```

**BaseLayout wrapper pattern** — copy from v1 `src/pages/design-system.astro` lines 14-15:
```astro
<BaseLayout title="Design System | Joel Shinness" description="...">
  <meta slot="head" name="robots" content="noindex, follow" />
```
The `noindex` slot is carried forward — design system is an internal page.

**Section background alternation pattern** — from RESEARCH Pattern 2 and UI-SPEC page structure:
- Tokens section: `bg-surface-muted`
- Primitives section: `bg-surface`
- Usage section: `bg-surface-muted`
This matches the established v2 footer/header surface pattern in `src/components/v2/layout/Footer.astro` line 7 (`class="border-t border-border bg-surface mt-auto"`).

**Container + padding pattern** — copy from `src/components/v2/layout/Footer.astro` line 8:
```astro
<div class="container mx-auto px-4 py-12 ...">
```
For full sections on design-system page, the vertical rhythm is `py-2xl` (80px) per UI-SPEC.

**Anti-patterns to avoid from v1 design-system.astro:**
- `src/pages/design-system.astro` lines 1-11: DO NOT import `DesignSystemNav`, `TokenSwatch`, `ComponentShowcase`, `CodeBlock`, `CheckboxGroup` from v1. DO NOT import v1 `BaseLayout`.
- DO NOT copy the dark-mode toggle, the sidebar navigation grid, or any neobrutalist class names.
- DO NOT copy `id="introduction"` section or the v1 structure — replace entirely with the three-section model from UI-SPEC (Tokens / Primitives / Usage).

---

### `src/pages/design-system.json.ts` (API endpoint, request-response)

**Primary analog:** `src/pages/design-system.json.ts` (v1) — route convention and `GET()` export pattern only
**Source of truth for content:** CONTEXT D-16 + RESEARCH Code Examples section

**GET function pattern** — copy from v1 `src/pages/design-system.json.ts` lines 1-2:
```typescript
export async function GET() {
  const tokens = { ... };
  return new Response(JSON.stringify(tokens, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
```
The `GET()` export name and `Response` constructor approach is the Astro SSG API endpoint convention. The entire content object is replaced.

**V2 flat shape** — per RESEARCH Code Examples (verified against CONTEXT D-16):
```typescript
const tokens = {
  colors: {
    primary:      { cssVar: '--color-primary',       value: 'oklch(0.225 0.044 264.6)' },
    primaryHover: { cssVar: '--color-primary-hover',  value: 'oklch(0.286 0.054 264.6)' },
    surface:      { cssVar: '--color-surface',        value: 'oklch(1 0 0)' },
    surfaceMuted: { cssVar: '--color-surface-muted',  value: 'oklch(0.985 0 0)' },
    text:         { cssVar: '--color-text',           value: 'oklch(0.225 0.044 264.6)' },
    textMuted:    { cssVar: '--color-text-muted',     value: 'oklch(0.395 0.011 274.7)' },
    border:       { cssVar: '--color-border',         value: 'oklch(0.864 0.005 286.3)' },
    accent:       { cssVar: '--color-accent',         value: 'oklch(0.79 0.184 148.5)' },
  },
  spacing: {
    xs:    { cssVar: '--space-xs',   value: '0.5rem' },
    sm:    { cssVar: '--space-sm',   value: '1rem'   },
    md:    { cssVar: '--space-md',   value: '1.5rem' },
    lg:    { cssVar: '--space-lg',   value: '2rem'   },
    xl:    { cssVar: '--space-xl',   value: '3rem'   },
    '2xl': { cssVar: '--space-2xl',  value: '5rem'   },
  },
  radii: {
    sm:   { cssVar: '--radius-sm',   value: '0.375rem' },
    md:   { cssVar: '--radius-md',   value: '0.625rem' },
    lg:   { cssVar: '--radius-lg',   value: '1rem'     },
    full: { cssVar: '--radius-full', value: '9999px'   },
  },
  typography: {
    display: { cssVar: '--text-display', value: '3rem'     },
    h1:      { cssVar: '--text-h1',      value: '2.25rem'  },
    h2:      { cssVar: '--text-h2',      value: '1.875rem' },
    h3:      { cssVar: '--text-h3',      value: '1.5rem'   },
    h4:      { cssVar: '--text-h4',      value: '1.25rem'  },
    body:    { cssVar: '--text-body',    value: '1rem'     },
    small:   { cssVar: '--text-small',   value: '0.875rem' },
    caption: { cssVar: '--text-caption', value: '0.75rem'  },
  },
};
```
All 8 colors, 6 spacing, 4 radii, 8 type sizes sourced directly from `src/styles/v2/global.css` lines 11-68. Token values verified against that file.

---

### `tests/accessibility/v2-primitives.spec.ts` (test, request-response)

**Primary analog:** `tests/accessibility/v2-layout.spec.ts` — exact pattern to copy

**Full import + tag pattern** — copy from `tests/accessibility/v2-layout.spec.ts` lines 1-4:
```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
```

**axe-core violation test** — copy from `tests/accessibility/v2-layout.spec.ts` lines 7-11:
```typescript
test.describe('v2 Layout Accessibility (Phase 23)', () => {
  test('v2 smoke page has zero axe-core violations', async ({ page }) => {
    await page.goto('/v2-smoke');
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });
```
Adapt: rename describe block to `'v2 Primitives Accessibility (Phase 24)'`, change route to `'/design-system'`.

**Locator + count assertion pattern** — copy from `tests/accessibility/v2-layout.spec.ts` lines 13-17:
```typescript
test('v2 smoke page contains no #theme-toggle in DOM', async ({ page }) => {
  await page.goto('/v2-smoke');
  const count = await page.locator('#theme-toggle').count();
  expect(count).toBe(0);
});
```
Adapt for keyboard count assertion (CONTEXT D-20): use `page.getByRole('button')` and `page.getByRole('link')` locators. The `count()` pattern is established here.

**Attribute assertion pattern** — copy from `tests/accessibility/v2-layout.spec.ts` lines 19-24:
```typescript
const overlay = page.locator('#mobile-menu-overlay');
await expect(overlay).toHaveAttribute('hidden', '');
```
Adapt: no overlay in design-system context. Use `toHaveAttribute` pattern for verifying `aria-expanded`, `aria-invalid`, `aria-current` states as needed.

---

## Shared Patterns

### V2 Component Structure (all 7 component files)
**Source:** `src/components/v2/layout/Header.astro` (entire file, 51 lines)
**Apply to:** `Button.astro`, `Card.astro`, `CardHeader.astro`, `CardBody.astro`, `CardFooter.astro`, `Input.astro`, `Badge.astro`

Rules extracted:
1. No `import` of CSS files — `global.css` is imported once in `BaseLayout.astro`
2. Tailwind utility classes for ALL color, spacing, typography, radius decisions
3. Scoped `<style>` block ONLY for `:focus-visible` rules that cannot be expressed as utilities
4. Zero `is:global` blocks
5. Zero `dark:` utility prefixes
6. Zero references to `--font-heading`, `--font-body`, `--color-yellow`, `--color-turquoise`, `--color-magenta`, `var(--border-neo*)`

### Focus Ring (all interactive primitives)
**Source:** RESEARCH Pattern 3 + CONTEXT D-18
**Apply to:** `Button.astro`, `Card.astro` (when `interactive=true`), `Input.astro`

Scoped `<style>` block content (exact):
```css
/* element-selector */:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```
Use element selector matching the root rendered tag:
- Button: `a:focus-visible, button:focus-visible`
- Card (interactive): `div:focus-visible`
- Input: `input:focus-visible, textarea:focus-visible, select:focus-visible`

### Lucide Icon-as-Prop (Button, Badge)
**Source:** RESEARCH Pattern 4 + `node_modules/@lucide/astro/src/types.ts` (verified)
**Apply to:** `Button.astro`, `Badge.astro`

```typescript
import type { AstroComponent } from '@lucide/astro';
// Destructure to capitalized alias — required for Astro/JSX component rendering:
const { iconLeft: IconLeft } = Astro.props;
// Render:
{IconLeft && <IconLeft size={16} aria-hidden="true" class="shrink-0" />}
```

### `class:list` Multi-class Conditional Pattern
**Source:** `src/components/v2/layout/MobileNav.astro` lines 51-54 and `src/components/v2/layout/Header.astro` lines 33-36
**Apply to:** All primitive components with variant props

```astro
class:list={[
  'base-classes always-applied',
  variant === 'primary' && 'variant-specific-classes',
  size === 'sm' && 'size-specific-classes',
  disabled && 'disabled-classes',
  className,
]}
```

### `inline-flex items-center` Base Shape
**Source:** `src/components/v2/layout/Header.astro` line 43, `src/components/v2/layout/MobileNav.astro` line 22
**Apply to:** `Button.astro`, `Badge.astro`

```astro
class="inline-flex items-center ..."
```
Header.astro uses `inline-flex items-center` for both the CTA and touch-target icon buttons. This is the established v2 interactive element base class.

### `font-text font-semibold` / `font-medium` Weight Pattern
**Source:** `src/components/v2/layout/Header.astro` line 43 (`font-text font-semibold`)
**Apply to:** `Button.astro` (use `font-medium` for 500-weight labels per RESEARCH Pitfall 6 — `font-semibold` is 600 from Tailwind built-in; `font-medium` is 500)

Header.astro's precedent of using Tailwind built-in weight utilities (`font-semibold`, `font-medium`) rather than custom `--font-weight-*` token utilities is the established safe pattern. For Button and Badge labels (500 weight per UI-SPEC), use `font-medium`.

### `container mx-auto px-4` Layout Container
**Source:** `src/components/v2/layout/Header.astro` line 20, `src/components/v2/layout/Footer.astro` line 8
**Apply to:** `src/pages/design-system.astro` section containers

```astro
<div class="container mx-auto px-4 py-2xl">
```

### Slot-for-Select Pattern
**Source:** `src/components/ui/Input.astro` line 43
**Apply to:** `src/components/v2/ui/Input.astro`

```astro
{as === 'select' && <slot />}
```
This is the only correct way to render `<option>` children inside the polymorphic `<Tag>` in Astro. Verified as working in v1.

---

## No Analog Found

All Phase 24 files have analogs. No files require falling back to RESEARCH-only patterns — every pattern is grounded in existing codebase files.

| File | Note |
|------|------|
| `src/components/v2/ui/CardHeader.astro` | Closest analog is any v2 slot-wrapper (`Header.astro` import block); pattern is trivially simple — `<div class:list><slot /></div>`. No dedicated analog needed. |
| `src/components/v2/ui/CardBody.astro` | Same as CardHeader — simple slot wrapper with padding token. |
| `src/components/v2/ui/CardFooter.astro` | Footer.astro `border-t border-border` provides the top-divider pattern for CardFooter's separator treatment. |

---

## Metadata

**Analog search scope:**
- `src/components/v2/layout/` — all 3 files read
- `src/components/ui/` — Button, Card, Input, Badge read
- `src/layouts/v2/BaseLayout.astro` — read
- `src/styles/v2/global.css` — read (33 token values extracted)
- `tests/accessibility/v2-layout.spec.ts` — read

**Files scanned:** 10 source files read directly
**Pattern extraction date:** 2026-05-14

# Phase 35: UI Primitives — Pattern Map

**Mapped:** 2026-07-15
**Files analyzed:** 12 (8 wl/ components, 1 isolation page, 1 axe spec, 1 contrast script extension, 1 SiteHeader retrofit)
**Analogs found:** 12 / 12

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `src/components/wl/CTAButton.astro` | component | request-response | `src/components/layout/SiteHeader.astro` (lines 48–68) | exact — is the inline CTA this component replaces |
| `src/components/wl/Eyebrow.astro` | component | transform | `src/components/WaveMark.astro` | role-match — same boolean-prop variant pattern |
| `src/components/wl/Tag.astro` | component | transform | `src/components/WaveMark.astro` | role-match — single-slot presentational component |
| `src/components/wl/Callout.astro` | component | transform | `src/components/WaveMark.astro` | role-match — slot-driven static presentational |
| `src/components/wl/LinkCard.astro` | component | request-response | `src/components/layout/SiteHeader.astro` (nav links, lines 31–46) | role-match — interactive `<a>` with focus ring |
| `src/components/wl/Breadcrumb.astro` | component | transform | `src/components/layout/SiteHeader.astro` (nav pattern, lines 29–55) | role-match — `<nav>` + ordered link list |
| `src/components/wl/Step.astro` | component | transform | `src/components/WaveMark.astro` | role-match — number prop + slot, zero JS |
| `src/components/wl/ServiceCard.astro` | component | transform | `src/components/WaveMark.astro` | role-match — boolean/enum variant via prop |
| `src/pages/dev/primitives.astro` | page (DEV-only) | request-response | `src/pages/blog/index.astro` (lines 1–10) | exact — same `import.meta.env.PROD` redirect gate |
| `tests/accessibility/primitives.spec.ts` | test | event-driven | `tests/accessibility/dark-mode.spec.ts` | exact — same axe + colorScheme pattern |
| `scripts/check-contrast.mjs` (extend PAIRS) | utility | batch | `scripts/check-contrast.mjs` (lines 131–179) | self-extension — same PAIRS array format |
| `src/components/layout/SiteHeader.astro` (retrofit) | component | request-response | itself (lines 48–68) — inline CTA replaced by CTAButton | self-modification |

---

## Pattern Assignments

### `src/components/wl/CTAButton.astro` (component, request-response)

**Analog:** `src/components/layout/SiteHeader.astro` lines 48–68 — this inline `<a>` IS the pixel specification for the `small` variant (and likely `solid`).

**Imports pattern** (model from WaveMark.astro lines 1–14):
```astro
---
interface Props {
  href: string;
  variant?: 'solid' | 'ghost' | 'ghost-on-dark' | 'small';
  icon?: 'calendar' | 'mail';
  class?: string;
}

const { href, variant = 'solid', icon, class: className = '' } = Astro.props;
---
```

**Core pattern — inline CTA specification** (SiteHeader.astro lines 48–54, the pixel reference for D-02):
```astro
<!-- Desktop CTA — both instances are the specification for the CTAButton 'small' variant -->
<a
  href={BOOKING_URL}
  class="wl-cta-label inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent"
  style="background: var(--color-wl-ink); color: var(--color-wl-on-ink); padding: 9px 17px; border-radius: 10px; text-decoration: none; min-height: 44px;"
>Book a call</a>
```

**Core pattern — variant dispatch with class:list** (adapt from WaveMark.astro boolean-branch pattern, lines 20–55):
```astro
<a
  href={href}
  class:list={[
    'wl-cta-label inline-flex items-center gap-[Xpx]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent',
    'text-decoration-none',
    {
      // solid — flippable tokens; --wl-on-ink flips in dark mode (correct for page-level surfaces)
      'bg-wl-ink text-wl-on-ink rounded-[10px] py-[9px] px-[17px] min-h-[44px]': variant === 'solid',
      // ghost — transparent bg, ink text+border (FIDELITY-GAP: border-width/color from Figma 39:31)
      'bg-transparent text-wl-ink border border-wl-ink rounded-[10px] min-h-[44px]': variant === 'ghost',
      // ghost-on-dark — NON-FLIPPABLE values (D-10); use inline style= or :root local property
      // FIDELITY-GAP: extract from dark mockup 117:103; DO NOT use var(--color-wl-on-ink)
      'rounded-[10px] min-h-[44px]': variant === 'ghost-on-dark',
      // small — same ink bg as SiteHeader inline CTA; pixel-neutral against existing header (D-02)
      'bg-wl-ink text-wl-on-ink rounded-[10px] py-[9px] px-[17px] min-h-[44px]': variant === 'small',
    },
    className
  ]}
>
  {icon === 'calendar' && (
    <!-- FIDELITY-GAP: extract exact SVG paths from Figma node 39:31 via get_design_context -->
    <svg aria-hidden="true" ...><!-- calendar paths --></svg>
  )}
  {icon === 'mail' && (
    <!-- FIDELITY-GAP: extract exact SVG paths from Figma node 39:31 -->
    <svg aria-hidden="true" ...><!-- mail paths --></svg>
  )}
  <slot />
</a>
```

**On-dark non-flippable style pattern** (from SiteFooter.astro lines 24–29 — footer-local precedent):
```astro
<!-- ghost-on-dark: use inline style= with non-flippable literals, like footer does -->
<!-- Source: src/components/layout/SiteFooter.astro line 28 -->
style="color: var(--wl-footer-wordmark-color);"
<!-- Equivalent for on-dark CTA: -->
style="color: #EAF6F3; border: 1px solid #EAF6F3;"
<!-- FIDELITY-GAP: replace literals with Figma 117:103 extracted values before implementing -->
```

**SVG baking pattern** (WaveMark.astro lines 20–55 — inline SVG, aria-hidden, hardcoded fill on dark surfaces):
```astro
<!-- From WaveMark.astro lines 32–38 — SVG on dark surface uses non-flippable hex, NOT currentColor -->
<svg width={size} height={size} viewBox="0 0 104 104" fill="none"
     class={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  <circle cx="52" cy="52" r="52" fill="#EAF6F3" />
  <path d="..." stroke="#12333B" stroke-width="6" stroke-linecap="round"/>
</svg>
<!-- For calendar/mail icons: extract viewBox + paths from Figma; set aria-hidden="true" -->
```

**Focus ring pattern** (SiteHeader.astro line 18, used on ALL interactive elements):
```
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent
```

**Type class** (global.css line 774 — confirmed extracted from Figma node 39:30):
```
.wl-cta-label  →  14px / 600 / Hanken Grotesk / line-height: normal / letter-spacing: 0
```

---

### `src/components/wl/Eyebrow.astro` (component, transform)

**Analog:** `src/components/WaveMark.astro` lines 1–14 — boolean prop interface; `src/components/layout/SiteHeader.astro` for `text-wl-accent` usage on interactive elements.

**Imports pattern** (WaveMark.astro lines 1–14):
```astro
---
interface Props {
  onDark?: boolean;
  class?: string;
}

const { onDark = false, class: className = '' } = Astro.props;
---
```

**Core pattern:**
```astro
<p class:list={[
  'wl-label-eyebrow',
  // on-light: flippable token — #0E7078 light / #4FB3B8 dark; AA on paper (4.78:1 light)
  !onDark && 'text-wl-accent',
  // on-dark: FIDELITY-GAP — non-flippable literal from Figma 117:103 (D-10)
  // Use inline style= following footer-local precedent (SiteFooter.astro line 32)
  className
]}>
  <slot />
</p>
```

**On-dark non-flippable style** (SiteFooter.astro line 32 — exact footer precedent):
```astro
<!-- Footer precedent for non-flippable on-dark text: -->
<p class="wl-footer-tagline" style="color: var(--wl-footer-tagline-color);">
<!-- Eyebrow on-dark equivalent (FIDELITY-GAP: extract hex from 117:103): -->
<p class:list={['wl-label-eyebrow', className]}
   style={onDark ? 'color: #XXXXXX;' : undefined}>
```

**Type class** (global.css lines 693–700):
```
.wl-label-eyebrow  →  13px / 600 / Hanken Grotesk / line-height: 1 / letter-spacing: 0.22em
```

---

### `src/components/wl/Tag.astro` (component, transform)

**Analog:** `src/components/WaveMark.astro` lines 1–14 — single-slot presentational, no interactivity.

**Imports pattern:**
```astro
---
interface Props {
  class?: string;
}

const { class: className = '' } = Astro.props;
---
```

**Core pattern:**
```astro
<!-- Rendering: <span> or <div> per UI-SPEC accessibility contract -->
<!-- All fill/text/padding/border-radius values: FIDELITY-GAP — extract from Figma 36:5 Tag node -->
<!-- Type class: FIDELITY-GAP — likely .wl-text-small (15px/400) or .wl-text-note (13px/400) -->
<span class:list={[
  'FIDELITY-GAP-type-class',
  className
]}>
  <slot />
</span>
```

**Anti-pattern to avoid** — no `dark:` color pairs (from RESEARCH.md anti-patterns):
```
// WRONG: dark:bg-wl-sea-glass — tokens flip automatically via .dark block
// CORRECT: bg-wl-sea-glass only (Tag fill likely uses a sea-glass surface — verify in Figma)
```

---

### `src/components/wl/Callout.astro` (component, transform)

**Analog:** `src/components/WaveMark.astro` — slot-driven static component. `SiteFooter.astro` lines 35–36 for body text pattern on a card-like surface.

**Imports pattern:**
```astro
---
interface Props {
  class?: string;
}

const { class: className = '' } = Astro.props;
---
```

**Core pattern:**
```astro
<!-- Semantic: <div> or <aside>; if important notice: role="note" (UI-SPEC) -->
<!-- Background fill, padding, border-radius, border: FIDELITY-GAP from Figma 36:5 -->
<!-- Type class for body text: likely .wl-text-body (16px/400/1.6) -->
<div class:list={[
  'FIDELITY-GAP-type-class',
  className
]}>
  <slot />
</div>
```

---

### `src/components/wl/LinkCard.astro` (component, request-response)

**Analog:** `src/components/layout/SiteHeader.astro` lines 31–46 — `<a>` element with `text-wl-ink hover:text-wl-accent` and the full focus-ring class chain; `SiteFooter.astro` lines 22–29 for full-card link pattern with `flex items-center`.

**Imports pattern:**
```astro
---
interface Props {
  href: string;
  title: string;
  class?: string;
}

const { href, title, class: className = '' } = Astro.props;
---
```

**Core pattern — full-card `<a>` with focus ring** (adapted from SiteHeader.astro line 15–19 brand lockup link):
```astro
<!-- Full card renders as <a> for card-level link behavior (D-07 principle) -->
<!-- Background, padding, border-radius, border: FIDELITY-GAP from Figma 36:5 -->
<a
  href={href}
  class:list={[
    'block',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent',
    'hover:text-wl-accent',
    className
  ]}
>
  <p class="FIDELITY-GAP-type-class text-wl-ink">{title}</p>
  <!-- Optional arrow/chevron: FIDELITY-GAP — extract SVG from Figma 36:5 if present -->
  <slot />
</a>
```

**Hover convention** (SiteHeader.astro line 32 — nav link hover):
```astro
class="wl-nav-link text-wl-ink hover:text-wl-accent focus-visible:outline-2 ..."
```

---

### `src/components/wl/Breadcrumb.astro` (component, transform)

**Analog:** `src/components/layout/SiteHeader.astro` lines 29–55 — `<nav aria-label>` landmark + link list; `SiteFooter.astro` lines 39–72 for nav with focused links.

**Imports pattern:**
```astro
---
interface Props {
  items: Array<{ label: string; href?: string }>;
  class?: string;
}

const { items, class: className = '' } = Astro.props;
---
```

**Core a11y pattern** (RESEARCH.md Pattern 5 + UI-SPEC accessibility contract):
```astro
<!-- WAI-ARIA breadcrumb: nav landmark + ol + aria-current on last item -->
<nav aria-label="Breadcrumb" class={className}>
  <ol class="flex items-center">
    {items.map((item, i) => {
      const isLast = i === items.length - 1;
      return (
        <li>
          {isLast ? (
            <!-- Last item: non-link, aria-current="page" -->
            <span aria-current="page" class="FIDELITY-GAP-type-class text-wl-ink">
              {item.label}
            </span>
          ) : (
            <a
              href={item.href}
              class="FIDELITY-GAP-type-class text-wl-ink hover:text-wl-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent"
            >{item.label}</a>
          )}
          <!-- Separator: FIDELITY-GAP — extract from Figma 36:5 (character or SVG) -->
          {!isLast && <span aria-hidden="true"> / </span>}
        </li>
      );
    })}
  </ol>
</nav>
```

**Type class candidate** (global.css line 682 — `.wl-text-note`, 13px/400):
FIDELITY-GAP: confirm against Figma 36:5 Breadcrumb node.

---

### `src/components/wl/Step.astro` (component, transform)

**Analog:** `src/components/WaveMark.astro` lines 1–14 — `number` prop + slot, zero JS, static presentational. WaveMark's two-branch render (`badge ? ... : ...`) maps to Step's number-circle + prose layout.

**Imports pattern:**
```astro
---
interface Props {
  number: number;
  class?: string;
}

const { number, class: className = '' } = Astro.props;
---
```

**Core pattern** (semantic: li-compatible content per RESEARCH.md Pattern 6):
```astro
<!-- Step renders div content safe to use inside <ol><li>...</li></ol> in parent -->
<!-- Number circle dimensions, bg color, text color: FIDELITY-GAP from Figma 36:5 -->
<!-- Body type class: FIDELITY-GAP — likely .wl-text-body or .wl-text-body-large -->
<div class:list={['flex gap-[Xpx]', className]}>
  <!-- Number circle: decorative, aria-hidden -->
  <span aria-hidden="true" class="FIDELITY-GAP-circle-styles">
    {number}
  </span>
  <!-- Step prose: primary content -->
  <div class="FIDELITY-GAP-type-class">
    <slot />
  </div>
</div>
```

---

### `src/components/wl/ServiceCard.astro` (component, transform)

**Analog:** `src/components/WaveMark.astro` lines 1–14 — boolean/enum variant prop dispatches to distinct visual treatments; WaveMark's `badge ? ... : ...` branch maps directly to `variant === 'highlight' ? ... : ...`.

**Imports pattern:**
```astro
---
interface Props {
  variant?: 'default' | 'highlight';
  class?: string;
}

const { variant = 'default', class: className = '' } = Astro.props;
---
```

**Core pattern — variant via class:list** (WaveMark.astro conditional render pattern, lines 20–55):
```astro
<!-- Semantic: <div> or <article> per UI-SPEC; default to <div> -->
<!-- All fill colors, padding, border-radius, highlight treatment: FIDELITY-GAP from Figma 36:5 -->
<div class:list={[
  'FIDELITY-GAP-base-styles',
  {
    'FIDELITY-GAP-default-styles': variant === 'default',
    'FIDELITY-GAP-highlight-styles': variant === 'highlight',
  },
  className
]}>
  <slot />
</div>
```

**Type class candidates** (global.css lines 613–628 for heading, 660–669 for body):
```
.wl-heading-h3  →  21px / 400 / Fraunces (18px responsive) — ServiceCard title candidate
.wl-text-body   →  16px / 400 / Hanken / 1.6 line-height — ServiceCard body candidate
```
Both are FIDELITY-GAP until Figma 36:5 ServiceCard node extraction confirms.

---

### `src/pages/dev/primitives.astro` (page, DEV-only, request-response)

**Analog:** `src/pages/blog/index.astro` lines 1–10 — exact same `import.meta.env.PROD` redirect guard. This is the only DEV-gate pattern in the codebase.

**DEV-gate pattern** (blog/index.astro lines 8–10 — copy verbatim):
```astro
---
if (import.meta.env.PROD) {
  return Astro.redirect('/');  // No isolation page in production (D-14)
}
import BaseLayout from '../../layouts/BaseLayout.astro';
import CTAButton from '../../components/wl/CTAButton.astro';
import Eyebrow from '../../components/wl/Eyebrow.astro';
import Tag from '../../components/wl/Tag.astro';
import Callout from '../../components/wl/Callout.astro';
import LinkCard from '../../components/wl/LinkCard.astro';
import Breadcrumb from '../../components/wl/Breadcrumb.astro';
import Step from '../../components/wl/Step.astro';
import ServiceCard from '../../components/wl/ServiceCard.astro';
---
```

**Page structure pattern** (mirrors Figma Components page 36:5 order per D-12):
```astro
<BaseLayout title="Dev: Primitives — Phase 35">
  <!-- Ordered by Figma Components page 36:5 layout (D-12) -->
  <!-- Order: CTAButton set (all variants) → Eyebrow → Tag → Callout → LinkCard → Breadcrumb → Step → ServiceCard -->

  <!-- Light-surface section: components on paper bg -->
  <section style="background: var(--color-wl-paper); padding: 48px;">
    <!-- CTAButton solid, ghost, small variants -->
    <!-- Eyebrow on-light -->
    <!-- Tag, Callout, LinkCard, Breadcrumb, Step -->
    <!-- ServiceCard default + highlight -->
  </section>

  <!-- Ink strip: on-dark variants (D-13 — NOT a forced .dark wrapper) -->
  <!-- Use non-flippable literal or --wl-footer-bg to avoid semantic flip contamination -->
  <section style="background: #12333B; padding: 48px;">
    <!-- CTAButton ghost-on-dark -->
    <!-- Eyebrow onDark -->
  </section>
</BaseLayout>
```

**Deletion gate** (RESEARCH.md Pitfall 3):
```bash
npm run build && grep -r "primitives" dist/
# Must return zero results after the file is deleted
```

---

### `tests/accessibility/primitives.spec.ts` (test, event-driven — TEMPORARY)

**Analog:** `tests/accessibility/dark-mode.spec.ts` lines 1–71 — exact same structure. Copy the file and adapt the route and describe block name.

**Full pattern** (dark-mode.spec.ts lines 1–34, direct copy-adapt):
```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { settleAnimations } from './helpers';

// Source: tests/accessibility/dark-mode.spec.ts
const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('Primitives isolation page — Phase 35 (TEMPORARY — delete with isolation page)', () => {
  test('light mode — zero axe violations', async ({ page }) => {
    await page.goto('/dev/primitives');
    await settleAnimations(page);
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });

  test('dark mode — zero axe violations', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    await page.goto('/dev/primitives');
    // Verify FOUC script set .dark class from OS preference (pattern from dark-mode.spec.ts line 22)
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
    await settleAnimations(page);
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
    await context.close();
  });
});
```

**Helper** (helpers.ts lines 9–17 — import as-is, do not copy the implementation):
```typescript
// From tests/accessibility/helpers.ts — already installed, import only
import { settleAnimations } from './helpers';
// settleAnimations waits for requestAnimationFrame + all finite animations to settle
// Use before EVERY .analyze() call to prevent flaky contrast failures (Pitfall 4)
```

---

### `scripts/check-contrast.mjs` — PAIRS extension (utility, batch)

**Analog:** `scripts/check-contrast.mjs` lines 79–179 — extend the existing PAIRS array following the exact format already established. Never re-implement the formula.

**PAIRS row format** (lines 131–134 — copy this pattern):
```javascript
// Format: [foreground_hex, background_hex, 'descriptive label', threshold, textUse]
//   threshold: 4.5 = normal text AA, 3 = large text AA
//   textUse: true → failure exits with code 1; false → logged only (informational)
[L_INK, L_PAPER, 'light: ink on paper (body text)', 4.5, true],
```

**Phase 35 constant additions** (add near existing constants, lines 79–119):
```javascript
// ── Phase 35 additions — on-ink / on-dark surfaces ──────────────────────────
// CTAButton solid/small: on-ink text pairs (--wl-on-ink is #EAF6F3 light / #12333B dark)
const L_ON_INK = '#EAF6F3';  // --color-wl-on-ink light value (on ink bg in light mode)
const D_ON_INK = '#12333B';  // --color-wl-on-ink dark value (on ink bg in dark mode)
// Ghost-on-dark, Eyebrow on-dark: FIDELITY-GAP constants (replace #XXXXXX after Figma extraction)
// const ON_DARK_FG = '#XXXXXX';  // non-flippable foreground from Figma 117:103
// const ON_DARK_BG = '#12333B';  // ink surface (non-flippable)
// Tag fill + text: FIDELITY-GAP
// Callout fill + text: FIDELITY-GAP
// ServiceCard default/highlight fill + text: FIDELITY-GAP
```

**Phase 35 PAIRS rows to add** (append to PAIRS array after existing rows, lines 131–179):
```javascript
// ── PHASE 35 ADDITIONS ────────────────────────────────────────────────────
// CTAButton solid: on-ink text on ink bg (light theme)
[L_ON_INK, L_INK, 'light: on-ink on ink (CTAButton solid/small text on bg)', 4.5, true],
// CTAButton solid: reversed in dark theme (--wl-on-ink becomes #12333B on #EAF6F3 ink)
[D_ON_INK, D_INK, 'dark: on-ink on ink (CTAButton solid/small text on bg)', 4.5, true],
// CTAButton ghost: ink text on paper bg (effective — transparent bg on paper surface)
[L_INK, L_PAPER, 'light: ink on paper (CTAButton ghost text on paper)', 4.5, true],  // already in matrix; confirm label
[D_INK, D_PAPER, 'dark: ink on paper (CTAButton ghost text on paper)', 4.5, true],   // already in matrix; confirm label
// Eyebrow on-light: accent on paper (already verifiable from existing tokens)
[L_ACCENT, L_PAPER, 'light: accent on paper (Eyebrow on-light)', 4.5, true],         // already in matrix
[D_ACCENT, D_PAPER, 'dark: accent on paper (Eyebrow on-dark flip token)', 4.5, true], // already in matrix
// Ghost-on-dark + Eyebrow on-dark: FIDELITY-GAP rows (add after Figma 117:103 extraction)
// [ON_DARK_FG, ON_DARK_BG, 'non-flippable: ghost-on-dark text on ink surface', 4.5, true],
// [ON_DARK_FG, ON_DARK_BG, 'non-flippable: eyebrow on-dark on ink surface', 4.5, true],
// Tag fill+text: FIDELITY-GAP (add after Figma 36:5 extraction)
// Callout fill+text: FIDELITY-GAP (add after Figma 36:5 extraction)
// ServiceCard default fill+text: FIDELITY-GAP
// ServiceCard highlight fill+text: FIDELITY-GAP
```

---

### `src/components/layout/SiteHeader.astro` — CTA retrofit (component modification)

**Analog:** itself. The two inline `<a>` CTA instances (lines 50–54 desktop, lines 64–68 mobile) are the pixel specification. Replace both with `<CTAButton>`.

**Before** (lines 48–54 and 63–68 — the inline pattern to remove):
```astro
<!-- CTA: pre-COMP-01 inline-styled <a>; replace with <CTAButton> in Phase 35 -->
<!-- min-h-[44px] + inline-flex ensure WCAG 2.5.5 44px touch target -->
<a
  href={BOOKING_URL}
  class="wl-cta-label inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent"
  style="background: var(--color-wl-ink); color: var(--color-wl-on-ink); padding: 9px 17px; border-radius: 10px; text-decoration: none; min-height: 44px;"
>Book a call</a>
```

**After — import + replace** (retrofit pattern):
```astro
---
import WaveMark from '../WaveMark.astro';
import CTAButton from '../wl/CTAButton.astro';  // ADD this import
const BOOKING_URL = '/#book';
const isDev = import.meta.env.DEV;
---

<!-- Replace the inline <a> CTA with: -->
<CTAButton href={BOOKING_URL} variant="small">Book a call</CTAButton>
<!-- Apply to BOTH desktop nav (line ~54) and mobile nav (line ~68) -->
```

**Pixel-neutral constraint** (35-CONTEXT.md D-02 + 35-UI-SPEC.md SiteHeader Retrofit Contract):
The `CTAButton variant="small"` MUST reproduce exactly:
- `background: var(--color-wl-ink)` / `color: var(--color-wl-on-ink)`
- `padding: 9px 17px` / `border-radius: 10px` / `min-height: 44px`
- class `wl-cta-label` (14px/600/Hanken) / `inline-flex items-center`
- `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent`

---

## Shared Patterns

### 1. Token-Only Styling (All wl/ components)

**Source:** `src/styles/global.css` lines 13–42 (`@theme` block) + lines 44–58 (`.dark` flip)
**Apply to:** Every file in `src/components/wl/`

```css
/* @theme block — Tailwind utilities generated from these */
--color-wl-ink:             #12333B;   /* bg-wl-ink, text-wl-ink, border-wl-ink */
--color-wl-sub:             #35525A;   /* text-wl-sub */
--color-wl-accent:          #0E7078;   /* text-wl-accent, outline-wl-accent */
--color-wl-sea-glass:       #E6F1F1;   /* bg-wl-sea-glass */
--color-wl-paper:           #F6FBFA;   /* bg-wl-paper */
--color-wl-on-ink:          #EAF6F3;   /* text-wl-on-ink (FLIPS in dark) */

/* .dark block — automatic semantic flip; no dark: classes needed in components */
.dark {
  --color-wl-ink: #EAF6F3;
  --color-wl-on-ink: #12333B;
  /* ... all tokens flip ... */
}
```

**Rule:** No `dark:` color overrides in any `wl/` component. Tokens flip automatically. Only on-dark surface variants (D-10) use non-flippable values.

### 2. Focus Ring (All interactive wl/ components)

**Source:** `src/components/layout/SiteHeader.astro` line 18, 32, 44, 52, 59, 65 — applied to every interactive element in the codebase.
**Apply to:** `CTAButton.astro`, `LinkCard.astro`, Breadcrumb links

```
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent
```

### 3. Non-Flippable On-Dark Values (on-dark variant components)

**Source:** `src/components/layout/SiteFooter.astro` lines 9–29 + `src/styles/global.css` lines 60–77
**Apply to:** `CTAButton` ghost-on-dark variant, `Eyebrow` onDark prop

```astro
<!-- Pattern: :root custom properties scoped to always-dark context -->
<!-- From global.css lines 65–76 (footer-local tokens): -->
:root {
  --wl-footer-bg: #0D2A31;
  --wl-footer-wordmark-color: #EAF6F3;  /* explicit light value, not flippable token */
}
<!-- Usage in SiteFooter.astro line 28: -->
style="color: var(--wl-footer-wordmark-color);"

<!-- Phase 35 on-dark variant equivalent: -->
<!-- Define :root { --wl-ondark-text: #XXXXXX; } in global.css after Figma extraction -->
<!-- Use inline style= in components: style={onDark ? 'color: var(--wl-ondark-text);' : undefined} -->
```

**Critical rule:** Never use `var(--color-wl-on-ink)` on always-dark surfaces — it flips to `#12333B` (ink) in dark mode, causing near-zero contrast against the dark surface (Pitfall 2).

### 4. Zero Client JS (All wl/ components)

**Source:** `src/components/layout/SiteHeader.astro` — entire 73-line file has no `<script>` tag.
**Apply to:** All 8 `src/components/wl/` components

No `<script>` tags, no `is:inline`, no `client:*` directives. All Phase 35 primitives are static Astro components.

### 5. Prop Interface Shape (All wl/ components)

**Source:** `src/components/WaveMark.astro` lines 1–14 — the prop interface convention: TypeScript `interface Props {}`, destructure with defaults in one line, `class?: string` passthrough for consumer layout overrides.

```astro
---
interface Props {
  // ... typed props ...
  class?: string;
}

const { propA, propB = 'default', class: className = '' } = Astro.props;
---
```

### 6. Old Token Zero-Tolerance Guard

**Source:** CONTEXT.md D-03, RESEARCH.md Anti-Patterns section
**Apply to:** All `src/components/wl/` files

Verification command after implementing each component:
```bash
grep -r "bg-yellow\|text-turquoise\|shadow-neo\|border-neo\|--color-yellow\|font-heading\|text-turquoise" src/components/wl/
# Must return zero results
```

---

## No Analog Found

All files have a direct or role-match analog in the codebase. No file requires falling back to RESEARCH.md patterns alone.

---

## Metadata

**Analog search scope:** `src/components/`, `src/pages/`, `tests/accessibility/`, `scripts/`
**Files scanned:** 8 (SiteHeader, SiteFooter, WaveMark, blog/index.astro, dark-mode.spec.ts, axe-tests.spec.ts, helpers.ts, check-contrast.mjs) + global.css
**Pattern extraction date:** 2026-07-15

### FIDELITY-GAP Summary (values required from Figma before implementation)

All FIDELITY-GAPs must be extracted via figma-desktop MCP before writing CSS for the affected component. Do not invent values.

| Gap | Source Node | Blocked Components |
|-----|-------------|-------------------|
| Ghost button border-width + border-color | Figma `39:31` | CTAButton ghost |
| Ghost-on-dark text + border colors | Figma `117:103` dark mockup | CTAButton ghost-on-dark, Eyebrow onDark |
| Calendar icon SVG paths + viewBox | Figma `39:31` child node | CTAButton icon="calendar" |
| Mail icon SVG paths + viewBox | Figma `39:31` child node | CTAButton icon="mail" |
| Eyebrow on-dark text color | Figma `117:103` | Eyebrow onDark |
| Tag: fill, text, padding, radius, border | Figma `36:5` Tag node | Tag |
| Callout: fill, text, padding, radius, border | Figma `36:5` Callout node | Callout |
| LinkCard: fill, text colors, padding, radius, hover, arrow icon | Figma `36:5` LinkCard node | LinkCard |
| Breadcrumb: separator, type class, gap, link+current colors | Figma `36:5` Breadcrumb node | Breadcrumb |
| Step: number circle size/fill/text, gap, body type class | Figma `36:5` Step node | Step |
| ServiceCard: both variant fills, texts, padding, radius, highlight treatment | Figma `36:5` ServiceCard node | ServiceCard |
| icon-to-label gap in CTAButton | Figma `39:15` / `39:30` | CTAButton all variants |
| Which CTAButton variant (solid vs small) matches SiteHeader CTA | Figma `39:15` + `39:30` comparison | SiteHeader retrofit D-02 |

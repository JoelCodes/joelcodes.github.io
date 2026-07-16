# Phase 35: UI Primitives - Research

**Researched:** 2026-07-15
**Domain:** Astro atomic components — CTAButton, Eyebrow, Tag, Callout, LinkCard, Breadcrumb, Step, ServiceCard; dev isolation page; SiteHeader CTA retrofit
**Confidence:** HIGH

---

## Summary

Phase 35 builds all atomic UI primitives from the Figma Components page (`36:5`) as individual Astro components in `src/components/wl/`, using `--wl-*` tokens exclusively, and exercises them on a temporary DEV-gated isolation page (`/dev/primitives`) before deletion.

The stack is identical to Phases 33–34: Astro 5 static components, Tailwind 4 `--wl-*` token utilities, inline SVG for icons, zero client JS. All patterns have direct analogs in the already-completed Phase 34 chrome components (`SiteHeader.astro`, `SiteFooter.astro`, `WaveMark.astro`). No new npm packages are needed.

The primary complexity is Figma extraction fidelity, on-dark variant handling (non-flippable local values per D-10), and the SiteHeader pixel-neutral CTA retrofit (D-02). The dev isolation page uses the same `import.meta.env.DEV` guard + `getStaticPaths` empty-in-prod pattern already live in `src/pages/blog/`.

**Primary recommendation:** All research is from direct codebase reads of Phases 33–34 artifacts. No new tooling needed. Extract Figma component values via figma-desktop MCP before implementing any component; never eyeball.

---

## Standard Stack

### Core

| Library / Tool | Version | Purpose | Why Standard |
|----------------|---------|---------|--------------|
| Astro | 5.16.15 | Static component authoring | Existing stack; no change |
| Tailwind CSS 4 | 4.1.18 | `--wl-*` token utilities via `@tailwindcss/vite` | Existing; `@theme` block already populated with all 8 palette tokens + companion |
| @axe-core/playwright | 4.11.1 | axe-core a11y assertions on isolation page | Already installed; used in `tests/accessibility/` |
| @playwright/test | 1.58.2 | Test harness for axe spec | Already installed and configured |

### Supporting

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `scripts/check-contrast.mjs` | WCAG AA ratio verification for new text-on-background pairs | Extend pair matrix with every new component color pair; run before merging |
| figma-desktop MCP (`get_design_context`, `get_screenshot`, `get_variable_defs`) | Extract exact geometry, colors, spacing from Figma nodes | All Figma values must be extracted here first; no eyeballing |
| `import.meta.env.DEV` | Astro build-time env flag for dev-only routes | Isolation page guard; same pattern used in blog pages |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|---------|
| Inline SVG for calendar/mail icons | `@lucide/astro` (already installed) | Lucide icons are not Figma-extracted; closed-set enforcement means baking the exact Figma SVG paths (D-06). Lucide not used. |
| Explicit `variant` prop | Size + style as separate props | D-05 locks variant 1:1 to Figma names. Single `variant` prop wins. |

**Installation:** No new packages required. All dependencies already in `package.json`.

---

## Architecture Patterns

### Recommended Project Structure

```
src/components/wl/          # NEW — all Phase 35 primitives (D-03)
├── CTAButton.astro          # variants: solid, ghost, ghost-on-dark, small
├── Eyebrow.astro            # variants: on-light, on-dark (onDark prop)
├── Tag.astro
├── Callout.astro
├── LinkCard.astro
├── Breadcrumb.astro
├── Step.astro
└── ServiceCard.astro        # variants: default, highlight (D-01)

src/pages/dev/
└── primitives.astro         # DEV-gated isolation page (D-12–D-14) — DELETED at phase end

scripts/
└── check-contrast.mjs       # extend PAIRS matrix with new component pairs (D-11)

tests/accessibility/
└── primitives.spec.ts       # temporary axe spec targeting /dev/primitives — DELETED at phase end
```

### Pattern 1: Astro Component with Typed Variant Prop (CTAButton)

**What:** Props-typed `.astro` component; variant selects a pre-built CSS class set; all styles use `--wl-*` tokens only; renders `<a>` with `href` required.

**When to use:** All primitive components in `src/components/wl/`.

**Example — CTAButton skeleton (based on Phase 34 SiteHeader inline CTA):**
```astro
---
// Source: 35-CONTEXT.md D-05, D-06, D-07; pixel-neutral to SiteHeader inline CTA (D-02)
interface Props {
  href: string;
  variant?: 'solid' | 'ghost' | 'ghost-on-dark' | 'small';
  icon?: 'calendar' | 'mail';
  class?: string;
}

const { href, variant = 'solid', icon, class: className = '' } = Astro.props;
---

<a
  href={href}
  class:list={[
    'wl-cta-label inline-flex items-center gap-2',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent',
    {
      // Solid: ink bg, on-ink text — non-decorative, flippable token (--wl-on-ink flips in dark)
      'bg-wl-ink text-wl-on-ink rounded-[10px]': variant === 'solid',
      // Ghost: transparent bg, ink text, ink border
      'bg-transparent text-wl-ink border border-wl-ink rounded-[10px]': variant === 'ghost',
      // Ghost-on-dark: non-flippable local values (D-10 — extract from Figma 117:103)
      // DO NOT use --wl-ink here; use literal or local custom property
      '...': variant === 'ghost-on-dark',
      // Small: same ink bg as solid but smaller padding/size
      'bg-wl-ink text-wl-on-ink rounded-[10px]': variant === 'small',
    },
    className
  ]}
>
  {icon === 'calendar' && <CalendarIcon />}
  {icon === 'mail' && <MailIcon />}
  <slot />
</a>
```

**Critical constraint:** The `solid` variant must reproduce `SiteHeader.astro`'s inline CTA exactly:
- `padding: 9px 17px`
- `border-radius: 10px`
- `background: var(--color-wl-ink)` / `color: var(--color-wl-on-ink)`
- `min-height: 44px` (WCAG 2.5.5 touch target)
- `wl-cta-label` type class (14px/600/Hanken Grotesk)

The `small` variant maps to Figma node `39:30` — extract all values from Figma; do not assume they match solid.

### Pattern 2: On-Dark Variants — Non-Flippable Local Values (D-10)

**What:** Ghost-on-dark and Eyebrow on-dark use hardcoded color values (or scoped CSS custom properties) that do NOT change between light and dark modes. Matches footer-local-value precedent.

**Why:** Dark surface sections (ink-background strips on the page) appear in BOTH light and dark mode. The component's appearance must be stable regardless of the global `.dark` class.

**Example — Eyebrow with onDark prop:**
```astro
---
interface Props {
  onDark?: boolean;
  class?: string;
}
const { onDark = false, class: className = '' } = Astro.props;
---

<p class:list={[
  'wl-label-eyebrow',
  // on-light: uses flippable token → correct in both themes
  !onDark && 'text-wl-accent',
  // on-dark: non-flippable; verify exact color from Figma 117:103 (D-10)
  // Use inline style or a :root-defined --wl-eyebrow-ondark custom property
  className
]}>
  <slot />
</p>
```

**Rule:** On-dark colors must be extracted from Figma dark Landing mockup `117:103`. If the dark mockup shows no change for a dark-surface section component, document as "stable across themes" — do NOT invent a dark-mode variant.

### Pattern 3: DEV-Gated Isolation Page (D-14)

**What:** A `/dev/primitives` route that exists in dev builds only; produces no static pages in production.

**When to use:** Phase 35 isolation page only. Pattern is identical to blog pages.

**Example — `src/pages/dev/primitives.astro`:**
```astro
---
// DEV-gated isolation page — Phase 35 only; DELETED before phase branch merges (D-14)
if (import.meta.env.PROD) {
  return Astro.redirect('/');
}
import BaseLayout from '../../layouts/BaseLayout.astro';
import CTAButton from '../../components/wl/CTAButton.astro';
// ... import all primitives
---
<BaseLayout title="Dev: Primitives">
  <!-- Ordered by Figma Components page 36:5 layout (D-12) -->
  <!-- Solid ink strips for on-dark variants (D-13) -->
</BaseLayout>
```

**Production safety check:** After deleting the file, run `npm run build` and `grep -r "primitives" dist/` — should return zero results.

### Pattern 4: Temporary Axe Spec (D-15)

**What:** A Playwright spec targeting `/dev/primitives` with both light and dark theme coverage. Deleted alongside the isolation page.

**Example — `tests/accessibility/primitives.spec.ts`:**
```typescript
// Source: tests/accessibility/dark-mode.spec.ts (exact pattern reuse)
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { settleAnimations } from './helpers';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('Primitives isolation page', () => {
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
    await settleAnimations(page);
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
    await context.close();
  });
});
```

**Critical:** The webServer in `playwright.config.ts` runs `npm run dev` — `/dev/primitives` is accessible only in dev builds, which is what the test runner uses. No special configuration needed.

### Pattern 5: Breadcrumb a11y (Claude's Discretion)

**Standard WAI-ARIA pattern:**
```astro
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/services">Services</a></li>
    <li aria-current="page">Web Development</li>
  </ol>
</nav>
```

- `<nav aria-label="Breadcrumb">` for landmark
- `<ol>` for ordered list semantics (Step also uses `<ol>` when in sequence)
- `aria-current="page"` on last item (not a link)

### Pattern 6: Step Semantics (Claude's Discretion)

When Steps appear in a sequence (How-it-Works section), use `<ol>`:
```astro
<!-- When Steps form an ordered process: ol container in the parent, li items -->
<!-- When Steps are standalone: div with step number as decorative text -->
```

The Phase 35 component itself should be `<li>`-safe (can be used inside an `<ol>`) but need not mandate it — the parent page assembly decides context.

### Anti-Patterns to Avoid

- **Old token leak:** No reference to `bg-yellow`, `text-turquoise`, `font-heading`, `--color-yellow`, `border-neo`, `shadow-neo`, or any non-`wl-*` token in any `src/components/wl/` file. Zero tolerance.
- **`dark:` color pairs on wl tokens:** `dark:text-wl-ink` is WRONG — tokens flip automatically via the `.dark { --color-wl-* }` block. Only on-dark variants (D-10) use non-flippable values.
- **Eyeballing geometry:** Every radius, padding, gap, and font size must be Figma-extracted. "Looks like 8px" is a fidelity violation.
- **`<button>` for CTAButton:** D-07 locks to `<a>` only. Never render a `<button>` variant without a new explicit decision.
- **Consumer-injected icons:** D-06 closes the icon set. Only `'calendar' | 'mail' | undefined` are valid values for the `icon` prop.
- **Isolation page surviving merge:** The isolation page file and its spec MUST be deleted in the phase's final commit. Grep the production build to verify.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| WCAG contrast verification | Manual ratio math | Extend `scripts/check-contrast.mjs` PAIRS matrix | Script already implements W3C formula correctly; reuse avoids formula errors |
| Dark-mode axe testing | `page.evaluate(() => document.body.classList.add('dark'))` | `browser.newContext({ colorScheme: 'dark' })` | Playwright colorScheme emulation drives the FOUC script's `prefers-color-scheme` check correctly; class manipulation bypasses it |
| SVG icon geometry | Redraw calendar/mail icons from scratch | Copy exact SVG paths from Figma via `get_design_context` MCP or "Copy as SVG" in Figma desktop | Re-authored geometry will differ from brand assets; fidelity gate will flag it |
| Focus ring styles | Custom box-shadow approach | `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent` | Phase 34 established this as the project-wide focus ring pattern; SiteHeader uses it identically |
| Animation settle in axe tests | `page.waitForTimeout(500)` | `settleAnimations(page)` helper (already in `tests/accessibility/helpers.ts`) | Timeout is flaky; the helper waits for actual animation completion |

**Key insight:** Every pattern in this phase is already implemented somewhere in the codebase. `SiteHeader.astro` IS the CTAButton's reference implementation. `WaveMark.astro` IS the SVG-baking pattern for icons. `dark-mode.spec.ts` IS the axe test pattern. The planner should copy-adapt, not author from scratch.

---

## Common Pitfalls

### Pitfall 1: SiteHeader CTA Pixel Drift After Retrofit (D-02)

**What goes wrong:** `<CTAButton variant="small">` (or whichever variant matches) is swapped into `SiteHeader.astro` but a style value differs from the currently approved inline CTA — different padding, radius, or font size.

**Why it happens:** The inline CTA in `SiteHeader.astro` uses `style=""` with exact extracted values. The new component might use Tailwind arbitrary values that round differently, or might omit `min-height: 44px`.

**How to avoid:** The inline CTA in `SiteHeader.astro` is the specification:
- `background: var(--color-wl-ink)`, `color: var(--color-wl-on-ink)`
- `padding: 9px 17px`
- `border-radius: 10px`
- `min-height: 44px`
- `wl-cta-label` type class (14px, 600 weight)

The `CTAButton` component must reproduce these exactly. Verify by taking a screenshot of the header CTA before and after the retrofit — zero pixel delta is the requirement.

**Warning signs:** Any visual difference in the header CTA after replacing the inline `<a>` with `<CTAButton>`.

### Pitfall 2: On-Dark Token Collision with Semantic Flip (D-09, D-10)

**What goes wrong:** A ghost-on-dark component uses `text-wl-on-ink` which IS `--color-wl-on-ink`. In dark mode, this token flips from `#EAF6F3` to `#12333B`. An always-dark ink strip that uses `text-wl-on-ink` will show dark ink text in dark mode instead of the light text it needs.

**Why it happens:** `--wl-on-ink` looks like the right token for "text on ink background" but it participates in the semantic flip.

**How to avoid:** On-dark variants MUST use non-flippable values — either:
- A literal hex (e.g., `color: #EAF6F3`) documented with a source comment
- A `:root`-scoped CSS custom property (like `--wl-footer-wordmark-color: #EAF6F3` from Phase 34)
- NOT: `var(--color-wl-on-ink)` which flips

Verify each on-dark color against the dark Landing mockup `117:103` via Figma MCP. If the dark mockup shows the dark-surface section unchanged in dark mode (same as light mode), it confirms the non-flip requirement.

**Warning signs:** On-dark variant looks wrong when OS dark mode is active.

### Pitfall 3: Isolation Page Surviving Production Build

**What goes wrong:** The dev guard `if (import.meta.env.PROD) { return Astro.redirect('/'); }` generates a redirect HTML stub in `dist/dev/primitives/index.html` pointing to `/`. The page doesn't serve primitives in production, but the route EXISTS and is potentially crawlable.

**Why it happens:** The redirect stub is a side effect of Astro's static output mode when `Astro.redirect()` is called. Slightly different from the blog's `getStaticPaths` pattern which generates NO file.

**How to avoid:** For the isolation page (a static route, not dynamic), use `getStaticPaths` returning an empty array in production is NOT applicable to `/dev/primitives.astro` (it's not a dynamic route). The correct approach is the `Astro.redirect` pattern from `src/pages/blog/index.astro`. An even cleaner option: gate the entire file with `export const prerender = false` and a server-side check — but since this is a static site, simply deleting the file is the cleanest gate. The `Astro.redirect` guard prevents accidental content leakage if the branch is ever merged before deletion.

Verify: after the final commit deletes the file, run `npm run build && grep -r "primitives" dist/` — expect zero results.

### Pitfall 4: axe Color-Contrast Flakiness from Unsettled Transitions

**What goes wrong:** axe-core samples colors while a CSS transition is mid-animation and reports a false contrast failure.

**Why it happens:** Any `transition: color` or `transition: background-color` on components is mid-transition when axe runs.

**How to avoid:** Use `settleAnimations(page)` from `tests/accessibility/helpers.ts` before every axe `.analyze()` call (same as existing `dark-mode.spec.ts` and `axe-tests.spec.ts`). Do not use `page.waitForTimeout()`.

### Pitfall 5: Missing Pair Coverage in `check-contrast.mjs` (D-11)

**What goes wrong:** A new component introduces a text-on-background pair not in the PAIRS matrix. The contrast gate passes because the pair was never in scope, but the actual pair fails WCAG AA.

**Why it happens:** Only pairs already in the matrix are checked. New components routinely introduce new pairs (tag fill, callout background, ghost border color, etc.).

**How to avoid:** For every new text-on-background combination introduced by Phase 35 components, add a corresponding row to `scripts/check-contrast.mjs`'s PAIRS array. Run the script after extending it. Pairs to add minimally:
- Ghost button: `--wl-ink` text on transparent (use `--wl-paper` as effective background)
- Ghost-on-dark: extracted foreground on extracted ink background
- Eyebrow on-dark: extracted foreground on extracted ink background
- Tag: fill background → text color pair
- Callout: fill background → text color pair
- ServiceCard highlight: any non-standard text-on-background

---

## Code Examples

Verified patterns from Phase 33/34 artifacts (HIGH confidence — direct codebase reads):

### Component Token Usage (DO — from SiteHeader.astro)

```astro
<!-- Source: src/components/layout/SiteHeader.astro lines 50-54 -->
<!-- This IS the CTA button before COMP-01 ships — use it as the spec -->
<a
  href={BOOKING_URL}
  class="wl-cta-label inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent"
  style="background: var(--color-wl-ink); color: var(--color-wl-on-ink); padding: 9px 17px; border-radius: 10px; text-decoration: none; min-height: 44px;"
>Book a call</a>
```

### Focus Ring (DO — from SiteHeader.astro)

```astro
<!-- Source: src/components/layout/SiteHeader.astro (all interactive elements) -->
class="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent"
```

### WaveMark Badge Prop Pattern — model for variant-via-prop (DO)

```astro
<!-- Source: src/components/WaveMark.astro -->
<!-- Both variants rendered in HTML; CSS visibility toggles which shows -->
<!-- Phase 35 components do NOT need this pattern (no CSS-toggle variants) -->
<!-- But the prop-interface shape is the model: badge?: boolean -->
{badge ? (
  <svg ...><!-- badge variant --></svg>
) : (
  <svg ...><!-- default variant --></svg>
)}
```

### DEV-Gate Pattern for Static Routes (DO — from src/pages/blog/index.astro)

```astro
<!-- Source: src/pages/blog/index.astro (Phase 34 DEV-gate) -->
---
if (import.meta.env.PROD) {
  return Astro.redirect('/');
}
// rest of frontmatter imports...
---
```

### Dark Mode axe Test Pattern (DO — from tests/accessibility/dark-mode.spec.ts)

```typescript
// Source: tests/accessibility/dark-mode.spec.ts lines 16-34
test('dark mode axe', async ({ browser }) => {
  const context = await browser.newContext({ colorScheme: 'dark' });
  const page = await context.newPage();
  await page.goto('/dev/primitives');
  await settleAnimations(page);
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
  await context.close();
});
```

### Contrast Script Extension (DO — from scripts/check-contrast.mjs)

```javascript
// Source: scripts/check-contrast.mjs lines 131-179 (PAIRS array)
// Add new pairs following this exact format:
// [foreground_hex, background_hex, 'label for the pair', threshold, textUse_boolean]
export const PAIRS = [
  // ... existing pairs ...
  // PHASE 35 ADDITIONS:
  // [L_INK, '#XXXXXX', 'light: ink on tag-fill (Tag component)', 4.5, true],
  // [L_INK, '#XXXXXX', 'light: ink on callout-fill (Callout component)', 4.5, true],
  // Add extracted hex values from Figma for each new surface
];
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `src/components/ui/` neobrutalist primitives | `src/components/wl/` Wavelength primitives | Phase 35 (this phase) | Old components untouched until Phase 41; wl/ is the new namespace |
| Inline CTA `<a>` in SiteHeader | `<CTAButton variant="small">` (or matched variant) | Phase 35 (this phase) | Pixel-neutral swap; header appearance preserved |
| axe tested on main routes only | axe also on `/dev/primitives` during phase | Phase 35 (temporary) | Spec deleted at phase end; coverage moves to per-page tests in Phase 37–39 |

**Deprecated/outdated in this phase's context:**
- `src/components/ui/Button.astro`, `Card.astro`, `Badge.astro` — these still exist but must NOT be referenced in any new `wl/` component. They die in Phase 41.

---

## Validation Architecture

### Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright 1.58.2 + `@axe-core/playwright` 4.11.1 + plain-node `check-contrast.mjs` |
| **Config file** | `playwright.config.ts` — `testDir: './tests'`, `testIgnore: 'tests/build/**'`, webServer runs `npm run dev` on `http://localhost:4321` |
| **Quick run command** | `npm run test:a11y` (`playwright test tests/accessibility`) |
| **Full suite command** | `npx playwright test && npm run build && npm run test:build` |
| **Estimated runtime** | ~60 seconds (Playwright ~10s + build ~30s + build assertions <1s) — same as Phase 34 |

### What Gets Validated per Requirement

| Requirement | Gate | Command / Method |
|-------------|------|-----------------|
| COMP-01 — CTAButton variants axe-clean, AA contrast both themes | Temporary `tests/accessibility/primitives.spec.ts` (light + dark axe), `node scripts/check-contrast.mjs` extended with new pairs | `npm run test:a11y` + `node scripts/check-contrast.mjs` |
| COMP-02 — each primitive exists, only `--wl-*` tokens, zero old-token refs | `grep -r "bg-yellow\|text-turquoise\|shadow-neo\|border-neo\|--color-yellow" src/components/wl/` returns zero | Manual grep in task verify step |
| Isolation page axe coverage | `tests/accessibility/primitives.spec.ts` — 2 specs (light/dark) against `/dev/primitives` via dev server | `npm run test:a11y` |
| Contrast script extension (new pairs) | `node scripts/check-contrast.mjs` exits 0 after adding Phase 35 pairs to PAIRS matrix | `node scripts/check-contrast.mjs` |
| Prod-build isolation page absent | `npm run build && grep -r "primitives" dist/` returns zero after final deletion commit | `npm run build` + grep |
| SiteHeader pixel-neutral retrofit | Screenshot diff before/after `<CTAButton>` swap — zero visual delta | Manual Playwright screenshot or Figma compare |

### Sampling Rate

- **After every task commit:** `npm run build` (Astro/TS errors surface immediately; keeps build green throughout)
- **After every wave:** Full suite — `npx playwright test && npm run build && npm run test:build`
- **Before `/gsd:verify-work`:** Full suite must be green; isolation page and its spec must be deleted; prod-build grep must return zero

### Wave 0 Needs

No Wave 0 setup required. All tooling (`@playwright/test`, `@axe-core/playwright`, `playwright.config.ts`, `tests/accessibility/helpers.ts`) is already installed and passing from Phase 34. The only additions this phase writes are the temporary `tests/accessibility/primitives.spec.ts` (created during Wave 1, deleted in the final wave) and new PAIRS rows in `check-contrast.mjs`.

---

## Figma Extraction Requirements

The following values MUST be extracted from Figma before implementation begins. These cannot be determined from the codebase alone.

### CTA Button (nodes 39:31, 39:15, 39:30)

| Value | Extract From | Notes |
|-------|-------------|-------|
| Solid padding (top/bottom, left/right) | Node 39:15 | Currently known: 9px/17px from Phase 34; VERIFY against 39:15 |
| Solid border-radius | Node 39:15 | Currently known: 10px; VERIFY |
| Ghost border width + color | Node 39:31 or 39:15 | Unknown — must extract |
| Ghost-on-dark colors (text, border) | Node 39:31 + dark mockup 117:103 | Unknown — non-flippable; use dark mockup |
| Small variant padding + dimensions | Node 39:30 | Unknown beyond type class |
| Calendar icon SVG paths | Figma icon node (find via get_design_context on 39:31) | Inline SVG, not a library icon |
| Mail icon SVG paths | Figma icon node | Inline SVG, not a library icon |

### Eyebrow (find on Components page 36:5)

| Value | Extract From | Notes |
|-------|-------------|-------|
| On-light color | Components page 36:5 Eyebrow node | Likely `--wl-accent` (verify) |
| On-dark color | Dark mockup 117:103 | Non-flippable; must be a literal or local property |
| Spacing/layout | Components page 36:5 | Gap between eyebrow and heading if specced |

### Tag, Callout, LinkCard, Breadcrumb, Step, ServiceCard

For each: extract fill colors, text colors, border colors, padding, border-radius, and any icon assets from the Components page `36:5` node. Check the dark mockup `117:103` for dark-surface variants. Flag any value not found in Figma — do not invent.

### ServiceCard (D-01 — in scope for Phase 35)

| Value | Extract From | Notes |
|-------|-------------|-------|
| Default variant styles | Components page 36:5 ServiceCard node | Background, text, border |
| Highlight variant styles | Same node, highlight variant | Different fill; contrast check required |
| ServiceCard `variant` prop name | CONTEXT.md D-01 says default/highlight | Prop: `variant?: 'default' \| 'highlight'` |

---

## Open Questions

1. **Which CTAButton variant matches the SiteHeader "Book a call" CTA?**
   - What we know: SiteHeader uses ink bg, on-ink text, 9px/17px padding, 10px radius, 14px/600 label, min-h-[44px]
   - What's unclear: Figma models `solid` (39:15) and `small` (39:30) as distinct variants; need to verify which Figma node the SiteHeader CTA corresponds to
   - Recommendation: Extract both 39:15 and 39:30 from Figma; compare dimensions. The header CTA likely maps to `small` (per the 34-CONTEXT.md reference to node 39:30 for the header CTA label). Verify pixel-neutrality after identification.

2. **On-dark ghost-on-dark colors**
   - What we know: Non-flippable values sourced from Figma dark Landing mockup `117:103` (D-10)
   - What's unclear: The exact hex values; these are unknown until Figma MCP extraction during planning
   - Recommendation: Extract during plan step; add to contrast script before implementation

3. **ServiceCard layout structure**
   - What we know: Two variants (default/highlight); COMP-02 traceability
   - What's unclear: Whether ServiceCard has a slot for icon/image, how the highlight variant differs visually (background? border? accent?)
   - Recommendation: Extract from Components page `36:5` ServiceCard nodes via Figma MCP

4. **Step component standalone vs. sequence semantics**
   - What we know: Claude's Discretion per CONTEXT.md; standard WAI-ARIA applies
   - What's unclear: Whether the Step component is always used in a numbered sequence or may appear standalone
   - Recommendation: Default to a component that works inside `<ol>` (renders as `<li>`-compatible content); the Landing page's How-it-Works section will determine final usage context in Phase 37

---

## Sources

### Primary (HIGH confidence)

- Direct codebase read: `src/components/layout/SiteHeader.astro` — CTA inline spec (pixel reference for D-02)
- Direct codebase read: `src/styles/global.css` — all `--wl-*` tokens, `.wl-*` type ramp classes, `.dark` flip block, footer-local `:root` properties
- Direct codebase read: `src/components/WaveMark.astro` — inline SVG + badge prop pattern
- Direct codebase read: `scripts/check-contrast.mjs` — PAIRS matrix format, extension protocol
- Direct codebase read: `tests/accessibility/dark-mode.spec.ts` + `helpers.ts` — axe test patterns, `settleAnimations` helper
- Direct codebase read: `playwright.config.ts` — webServer uses `npm run dev`; axe specs run against dev server
- Direct codebase read: `package.json` — confirmed `@axe-core/playwright@4.11.1`, `@playwright/test@1.58.2` installed; no new deps needed
- Direct read: `.planning/phases/35-ui-primitives/35-CONTEXT.md` — all locked decisions D-01 through D-15
- Direct read: `.planning/phases/33-token-foundation-fonts/33-CONTEXT.md` — token naming discipline (D-02), SVG extraction (D-16), contrast companion policy (D-09/D-10)
- Direct read: `.planning/phases/34-baselayout-chrome/34-CONTEXT.md` — footer local-value precedent, zero client JS, DEV-gate mechanics
- Direct read: `.planning/phases/34-baselayout-chrome/34-PATTERNS.md` — blog `import.meta.env.PROD` redirect pattern verbatim

### Secondary (MEDIUM confidence)

- `.planning/research/SUMMARY.md` — fidelity-drift discipline, sea-glass contrast failure history
- `.planning/research/PITFALLS.md` — P1 (eyeballing), P2 (no screenshot comparison), P8 (sea-glass contrast), P9 (old token leak)
- `.planning/REQUIREMENTS.md` — COMP-01, COMP-02 exact wording; ServiceCard confirmed in Phase 35 per CONTEXT.md amendment

---

## Metadata

**Confidence breakdown:**

| Area | Level | Reason |
|------|-------|--------|
| Standard stack | HIGH | Direct package.json + codebase reads; no new npm packages needed |
| Architecture patterns | HIGH | All patterns directly adapted from Phase 34 artifacts (SiteHeader, dark-mode.spec.ts, blog DEV-gate) |
| On-dark variant handling | HIGH | Footer-local-value precedent fully documented in global.css + 34-PATTERNS.md |
| Component API shape | HIGH | Locked by D-05 through D-08; no discretion in prop names |
| Figma-extracted values | LOW until extracted | Pixel values for ghost, on-dark, icon geometry unknown until MCP extraction |
| Contrast pair coverage | MEDIUM | Pattern is HIGH confidence; specific new pairs are unknown until Figma extraction |

**Research date:** 2026-07-15
**Valid until:** 2026-08-15 (stable stack; no fast-moving dependencies)

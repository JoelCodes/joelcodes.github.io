# Phase 25: Leaf Page Migrations (FAQ, Thank-You, 404) - Research

**Researched:** 2026-05-15
**Domain:** Astro 5 page migration on top of a locked v2 design system; static `404.html` emission for GitHub Pages; axe-core + Playwright accessibility validation; JSON-LD slot injection.
**Confidence:** HIGH

---

## Summary

Phase 25 is a **migration-only phase with zero invention surface**. The v2 token system, `BaseLayoutV2`, every primitive used (`Button`, `Card`, `CardBody`), and every icon (`ChevronDown`, `MailCheck`) are already shipped and locked from Phases 23 and 24. The UI design contract (`25-UI-SPEC.md`) is already pre-resolved with copy, spacing, motion, and Button variants — including the two CONTEXT discretion items (FAQ lede, 404 body). This research therefore does NOT explore alternatives; it confirms the locked stack, documents the three behavioral verification techniques (axe-core spec pattern, JSON-LD parse assertion, Astro static-404 build), and surfaces the legacy-cleanup landmines specific to the most-stale file on the codebase (`/faq`).

**Primary recommendation:** Implement Plans 25-01 and 25-02 as direct file-replacement against the locked UI-SPEC composition blocks. Add `tests/accessibility/v2-leaf-pages.spec.ts` mirroring the exact pattern of `tests/accessibility/v2-primitives.spec.ts` (Test 1 — axe full-page scan), extended with a fetched-HTML JSON-LD parse assertion for `/faq`. No new tokens, no new primitives, no new packages, no config changes — Astro auto-detects `src/pages/404.astro` and emits `dist/404.html` which GitHub Pages serves automatically without `astro.config.mjs` edits.

---

## Standard Stack

The stack is **fully locked** by Phase 23/24 outputs. This phase adds zero dependencies.

### Core (locked, already installed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `astro` | 5.16.15 | Static site generator; routes from `src/pages/*.astro`; auto-emits `404.html` from `src/pages/404.astro` | Project baseline; Phase 23 chose `BaseLayoutV2` shell on it |
| `tailwindcss` | 4.1.18 | Utility CSS engine via `@tailwindcss/vite` plugin; tokens from `@theme` block in `src/styles/v2/global.css` | Phase 23 token system source of truth |
| `@lucide/astro` | 0.563.0 | Source of `ChevronDown` (FAQ disclosure indicator, D-02) and `MailCheck` (thank-you success icon, D-15) | Already a v2 pattern in `Button.astro` (`ArrowRight`) and `design-system.astro` (`Sparkles`, `Mail`) |
| `@fontsource-variable/plus-jakarta-sans` | 5.2.8 | Display font, preloaded by `BaseLayoutV2` line 25 | Self-hosted (zero Google Fonts blocking) — Phase 23 deliverable |
| `@fontsource-variable/inter` | 5.2.8 | Body font, imported via CSS in v2 `global.css` line 3 | Self-hosted; Phase 23 deliverable |

### Supporting (testing — already installed)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@playwright/test` | 1.58.2 | E2E test runner; Chromium project; baseURL `http://localhost:4321` | Required by `tests/accessibility/v2-leaf-pages.spec.ts` (new file) |
| `@axe-core/playwright` | 4.11.1 | `AxeBuilder` for in-browser WCAG audit | Used by every axe-core spec — Tests 1 in `v2-primitives.spec.ts` is the canonical pattern |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Native `<details>/<summary>` for FAQ accordions | JS-driven accordion (e.g. Radix Accordion) | Native is JS-free, accessible by default, satisfies "accordion behavior unchanged" (D-01). Rejected — adds a runtime dependency and risks Lighthouse perf regression. |
| Slot-injected `<script type="application/ld+json">` | A reusable `FAQSchema.astro` component | FAQ is the only page emitting `FAQPage` schema in v1.4 (D-08). Building a single-consumer component is over-abstraction. Rejected. |
| Astro middleware-based 404 redirect | Static `src/pages/404.astro` (D-09) | Middleware requires an SSR adapter; this site is static-only and ships to GitHub Pages. Rejected — static file is the canonical pattern. |

**Installation:** none required — all packages are already in `package.json` and committed to `package-lock.json`.

---

## Architecture Patterns

### Project Structure (the files touched and created)

```
src/
├── pages/
│   ├── faq.astro          # OVERWRITE in place (Plan 25-01)
│   ├── thank-you.astro    # OVERWRITE in place (Plan 25-02)
│   └── 404.astro          # CREATE new (Plan 25-02)
└── layouts/v2/
    └── BaseLayout.astro   # LOCKED — every page imports this

tests/accessibility/
└── v2-leaf-pages.spec.ts  # CREATE new (Plan 25-01 starts it; Plan 25-02 extends it)
```

Untouched (by contract): `src/components/v2/ui/*`, `src/components/v2/layout/*`, `src/styles/v2/global.css`, `astro.config.mjs`, every v1 file.

### Pattern 1: BaseLayoutV2 Page Shell (every page in this phase)

**What:** Import the v2 layout, pass `title` + `description` props (consumed by `SEO.astro` inside the layout), use `<slot name="head">` for per-page `<meta>` / JSON-LD, render content in the default slot.

**When to use:** Always, for every page in this phase. D-17 locks this — no v1 layout imports survive in any of the 3 files post-migration.

**Example (canonical — verified from `src/pages/design-system.astro` lines 11, 45-50):**
```astro
---
import BaseLayout from '../layouts/v2/BaseLayout.astro';
import Button from '../components/v2/ui/Button.astro';
import Card from '../components/v2/ui/Card.astro';
import CardBody from '../components/v2/ui/CardBody.astro';
---

<BaseLayout title="…" description="…">
  <meta slot="head" name="robots" content="noindex, follow" />
  <!-- page content -->
</BaseLayout>
```

### Pattern 2: Named-Slot Head Injection (FAQ JSON-LD + 404 noindex)

**What:** `BaseLayoutV2` line 29 exposes `<slot name="head" />`. Pages inject `<meta>`, `<link>`, or `<script type="application/ld+json">` via the `slot="head"` attribute. The slot content lands inside `<head>` between `<SEO />` and `</head>`.

**Verified pattern (in-codebase, HIGH confidence):**
- `src/pages/design-system.astro` line 49: `<meta slot="head" name="robots" content="noindex, follow" />` — empirically proves slot-based meta injection works on the live v2 layout.
- `src/pages/faq.astro` line 62 (v1, being replaced): `<script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />` — proves `set:html` correctly emits raw JSON inside a script tag without escaping issues.

**Phase 25 application:**
```astro
<!-- /faq -->
<script type="application/ld+json" set:html={JSON.stringify(faqSchema)} slot="head" />

<!-- /404 -->
<meta slot="head" name="robots" content="noindex, follow" />
```

The two patterns combine cleanly — `set:html` and `slot="head"` are independent directives.

### Pattern 3: Centered-Card "Recovery / Confirmation" Composition (FAQ CTA, thank-you, 404)

**What:** A consistent visual family for the three centered-Card moments on these pages.

**When to use:** Any leaf-page surface that's a single-action recovery / confirmation / handoff moment.

**Canonical wireframe (from `25-UI-SPEC.md` Component Composition — locked):**
```astro
<div class="container mx-auto px-lg py-xl min-h-[70vh] flex items-center justify-center">
  <Card elevated={true} class="max-w-2xl w-full text-center">
    <CardBody>
      <div class="flex flex-col items-center gap-md">
        <!-- optional icon (thank-you: MailCheck; 404: none) -->
        <h1 class="font-display text-h1 font-bold text-text">…</h1>
        <p class="font-text text-body text-text max-w-md">…</p>
        <Button variant="primary" size="md|lg" href="…">…</Button>
        <!-- optional secondary link (thank-you only) -->
      </div>
    </CardBody>
  </Card>
</div>
```

`min-h-[70vh]` is the ONE permitted arbitrary value in this phase (UI-SPEC Spacing Scale Exceptions). All other dimensions resolve from token utilities.

### Pattern 4: Native `<details>` FAQ Rows with `group-open` Indicator

**What:** Each FAQ item is a native `<details class="group">` with `<summary>` containing the question + Lucide `ChevronDown` icon that rotates via `group-open:rotate-180`. No JS.

**When to use:** Any disclosure pattern where a single-row toggle is needed and you don't require multi-select or programmatic open/close — exactly the FAQ case.

**Verified utility behavior (HIGH confidence):** Tailwind v4's `group-open:*` variant maps to the `[open]` attribute selector on the parent `.group` element. When `<details>` is open, the `open` attribute is set and the child's `rotate-180` applies. This is native browser behavior; no JS toggle needed.

**Locked composition (from UI-SPEC):**
```astro
<details class="group border border-border rounded-lg p-md bg-surface">
  <summary class="font-display text-h3 font-bold text-text cursor-pointer list-none flex items-center justify-between gap-md">
    <span>{faq.question}</span>
    <ChevronDown
      size={24}
      aria-hidden="true"
      class="shrink-0 transition-transform duration-200 ease-out group-open:rotate-180"
    />
  </summary>
  <div class="mt-md font-text text-body text-text">
    {faq.answer}
  </div>
</details>
```

`list-none` on `<summary>` suppresses the native disclosure triangle (browsers vary in default rendering). `aria-hidden="true"` on the chevron keeps the accessible name attached to the visible question text per D-02.

### Anti-Patterns to Avoid

- **Re-introducing `<html>` / `<head>` / `<body>` scaffold in `/faq`** — the current v1 file has its own inline scaffold (lines 49-93); this is DELETED per D-18. `BaseLayoutV2` owns the document shell.
- **Re-introducing dark-mode boot script (`<script is:inline>` in `/faq` lines 85-92)** — Phase 23 D-08 locks light-mode-only. Any `prefers-color-scheme`, `localStorage.theme`, `.dark` selector, or `dark:` utility in these three files breaks the invariant. DELETE in migration; do not re-add.
- **Re-introducing Google Fonts `<link>` tags (`/faq` lines 64-82)** — fonts are owned by `BaseLayoutV2` (preload of Plus Jakarta Sans line 25 + CSS @import for both fonts in `src/styles/v2/global.css` lines 2-3). Inline Google Fonts links would double-load fonts and regress LCP.
- **Wrapping a `<Card>` around each FAQ row** — D-01 explicitly rejects this; rows are `border border-border rounded-lg p-md`, NOT a `<Card>`. Visually closer to Crito's clean FAQ row pattern.
- **Importing `BaseLayout` from `'../layouts/BaseLayout.astro'`** — that is the v1 layout. The v2 import path is `'../layouts/v2/BaseLayout.astro'`. This phase removes the last v1 layout imports from `/faq` and `/thank-you`.
- **Using `text-accent` for any text node** (H1, H3, body, lede, link, Button label) — fails WCAG AA 4.5:1 (24-03 STATE entry). `text-accent` is ONLY valid for the thank-you `MailCheck` icon (non-text per WCAG 1.4.3) and primitive-owned focus rings.
- **Hand-coding inline `<a class="btn">`** for the FAQ CTA, 404 home, or thank-you buttons — D-17 mandates v2 `<Button>` primitive imports. The Button primitive renders polymorphic `<a>` when `href` is present (Button.astro line 29).
- **Adding tokens to `src/styles/v2/global.css`** — UI-SPEC Cross-Cutting Contract row 8: zero new tokens this phase. `tests/check-token-collision.cjs` (Phase 23 Wave-0 guard) is green by default; new tokens would re-trigger it.
- **Folding the Calendly URL swap into this phase** — D-16 is explicit: the placeholder `https://calendly.com/joelshinness` is preserved verbatim. The real URL swap is a separately tracked v1.3 STATE.md todo.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| FAQ accordion behavior | Custom JS toggle handler on a `<div>` + ARIA roles | Native `<details>/<summary>` | JS-free, keyboard-operable by default (Enter/Space toggles), screen-reader-supported across all modern browsers, satisfies D-01. Custom JS would add bundle weight and an axe-core attack surface. |
| Disclosure indicator | Inline `+` glyph (current v1 line 108) or text "▼" | Lucide `ChevronDown` from `@lucide/astro` | Consistent v2 icon vocabulary (Header uses Lucide; Button defaults to `ArrowRight`; design-system page uses `Sparkles`/`Mail`). `+` and Unicode triangles look amateur and don't tree-shake. D-02 locks ChevronDown. |
| Success-state visual cue on `/thank-you` | New `turquoise` Card variant ported from v1 | v2 elevated Card + Lucide `MailCheck` icon (text-accent) | v2 has no turquoise variant by design (UI-SPEC Color contract). Semantic green check icon carries the "received" affordance without inventing new tokens. D-14, D-15. |
| 404 page emission for GitHub Pages | Custom rewrite rule, redirect handler, or `_redirects` file | `src/pages/404.astro` (Astro static-build auto-emits `dist/404.html`) | Astro 5 documents this: "This will build to a `404.html` page" — GitHub Pages serves `404.html` from the root for unmatched routes automatically. No `astro.config.mjs` change, no GitHub Actions config. D-09. |
| Centered-Card layout on thank-you/404 | New `Centered.astro` or `Hero.astro` wrapper component | Inline composition with `<div class="container mx-auto px-lg py-xl min-h-[70vh] flex items-center justify-center">` | Used 3 times across the phase (FAQ CTA, thank-you, 404). Extracting it would obscure the locked UI-SPEC contract and add a primitive that other phases (29 Homepage) might fork anyway. |
| Per-page title/description meta tags | Hand-rolled `<title>` and `<meta name="description">` | Pass `title` + `description` props to `<BaseLayout>` (SEO.astro renders both) | `BaseLayoutV2` line 27 already wires `<SEO title={title} description={description} />`. Duplicating manually would emit two `<title>` tags. |

**Key insight:** Every "build this" temptation in this phase is already satisfied by a Phase 23 or Phase 24 deliverable. The phase's job is composition, not invention.

---

## Common Pitfalls

### Pitfall 1: Leaving dark-mode artifacts in the migrated FAQ file

**What goes wrong:** The current `/faq` (`src/pages/faq.astro`) has `dark:bg-bg-dark`, `dark:text-text-dark`, `dark:border-text-dark`, and `localStorage.theme` references on EVERY content node (lines 94, 99, 105-110). A literal "edit in place" risks leaving fragments behind.

**Why it happens:** The file is 122 lines, the v1 patterns are deeply interleaved, and the legacy scaffold is easy to miss in a partial rewrite.

**How to avoid:**
1. **Do not edit in place** — rewrite the file from scratch using the locked UI-SPEC composition block as the source of truth.
2. After writing, grep the new file: `grep -E 'dark:|localStorage|prefers-color|theme-toggle|<html|<head|<body|fonts.googleapis|font-body|bg-bg-|text-text-light' src/pages/faq.astro` — must return zero matches.
3. The legacy v1 elements DELETED are:
   - Inline `<html>`, `<head>`, `<body>` scaffold (lines 49-93)
   - Google Fonts preconnect + preload + noscript (lines 64-82)
   - `<script is:inline>` dark-mode boot (lines 85-92)
   - v1 `Header` / `Footer` imports (lines 3-4)
   - All `dark:` utilities
   - `font-body`, `font-heading` legacy classes (replaced by `font-text` / `font-display`)
   - `text-text-light` / `bg-bg-light` legacy color utilities (replaced by `text-text` / `bg-surface`)
   - The `+` glyph disclosure indicator (line 108) → ChevronDown

**Warning signs:** Any `dark:` substring in the rewrite; any reference to `font-body` or `font-heading`; any `bg-bg-*` or `text-text-light` utility; any `<html>` tag in the page file.

### Pitfall 2: Slotted JSON-LD not landing in `<head>`

**What goes wrong:** Writing `<script type="application/ld+json">...</script>` inside the default slot (page body) instead of `slot="head"`. The script becomes valid in DOM but appears in `<body>`, which is technically permitted by HTML5 but discouraged for JSON-LD and may not be picked up by some search-engine crawlers per Schema.org's Google Rich Results best-practice.

**Why it happens:** The `slot="head"` attribute is easy to forget — Astro doesn't warn if you omit it.

**How to avoid:**
- Verify the rendered HTML in dev: `curl http://localhost:4321/faq | grep -A2 'application/ld+json'` — the `<script>` must appear between `<head>` and `</head>`, not after `<body>`.
- The test pattern (D-19) implicitly verifies this — `tests/accessibility/v2-leaf-pages.spec.ts` should locate the script via `page.locator('head script[type="application/ld+json"]')` to assert it lives in `<head>`.

**Warning signs:** Lighthouse SEO category warning about structured data location; manual grep shows the script after `</head>`.

### Pitfall 3: `set:html` JSON escaping when the FAQ answer contains characters

**What goes wrong:** Embedding a JSON object into a `<script>` via `set:html={JSON.stringify(faqSchema)}` works for plain ASCII strings, but if a future answer contains `</script>` (highly unlikely for FAQ copy but possible) the closing tag prematurely terminates the script element. Also: HTML special chars (`<`, `>`, `&`) inside the JSON string need no escaping because `set:html` treats the value as raw HTML and JSON's serialization is already valid JS string content.

**Why it happens:** Astro `set:html` is documented to bypass HTML escaping (`<script set:html>` writes the value verbatim). For JSON-LD, this is the correct directive (we WANT raw JSON inside the script), but downstream content edits could introduce a `</script>` substring.

**How to avoid:**
- The current v1 file uses `set:html={JSON.stringify(faqSchema)}` (line 62) and has shipped without incident for 3 months — D-04 preserves the 5-answer content verbatim, so the migrated file inherits the same safety profile. HIGH confidence safe for this phase.
- Future-proofing (out of scope for this phase, document as a follow-up): if FAQ copy is ever edited, sanitize `</script>` → `<\/script>` in the JSON string before emission. Not needed for the 5 known answers.

**Warning signs:** Lighthouse "no JSON-LD detected" failure on `/faq`; Rich Results test failing; visible JSON markup leaking into the page body.

### Pitfall 4: 404 page leaks into the sitemap and gets indexed

**What goes wrong:** Without `<meta name="robots" content="noindex, follow">`, the 404 page is technically a valid Astro route and `@astrojs/sitemap` may include it in `sitemap.xml`. Even if not indexed, that's noise and an SEO smell.

**Why it happens:** The sitemap integration (astro.config.mjs line 26) auto-discovers all routes from `src/pages/`. Astro itself doesn't mark 404 specially.

**How to avoid:**
- D-13 mandates `<meta slot="head" name="robots" content="noindex, follow" />` on `/404` — same pattern as `/design-system` line 49.
- Verify in dev: `curl http://localhost:4321/sitemap-index.xml` (or `sitemap-0.xml`) and grep for `/404` — should NOT appear. If it does, add to sitemap exclusion in `astro.config.mjs` integrations (not currently configured, but `@astrojs/sitemap` supports a `filter` callback).
- The noindex meta is the canonical fix; sitemap filtering is belt-and-suspenders and likely unnecessary because the 404 page filename in `dist/` is `404.html` (not a routable slug), so the sitemap generator may already skip it.
- **Verification step recommended in planning:** Plan 25-02 should grep the generated `dist/sitemap-*.xml` after `npm run build` to confirm `/404` is absent — if present, add a filter in `astro.config.mjs` as a follow-up.

**Warning signs:** `/404` appears in `dist/sitemap-0.xml`; Google Search Console reports the 404 URL as indexed.

### Pitfall 5: Astro polymorphic Button vs. native `<a>` — `aria-disabled` confusion

**What goes wrong:** All three Button uses in this phase are anchor-rendered (href is present on each). The Button primitive (Button.astro lines 62-64) correctly suppresses the `disabled` HTML attribute on `<a>` and sets `aria-disabled="true"` instead. None of this phase's Buttons pass `disabled={true}` — so this is informational, but if planning ever introduces a "disabled CTA" pattern, the primitive handles it.

**How to avoid:** Don't pass `disabled={true}` on a Button with `href` unless intentionally disabling the link — the primitive already does the right thing.

**Warning signs:** A native HTML `disabled` attribute on an `<a>` tag (invalid HTML); axe-core warning about disabled link.

### Pitfall 6: Header/Footer touch in this phase

**What goes wrong:** A temptation to "polish" Header (`src/components/v2/layout/Header.astro`) or Footer at the same time as the leaf-page migration — touching `/faq` link styling or adding a "Return home" affordance in Footer.

**Why it happens:** The pages compose with the Header/Footer; the boundary feels artificial.

**How to avoid:** D-17 + UI-SPEC "Cross-Cutting Contract" row 9 explicitly forbid Header/Footer edits this phase. The Header already links to `/faq` (line 7); after migration the URL resolves to the new v2 FAQ page with no Header change required.

**Warning signs:** Diff includes `src/components/v2/layout/*` — should be empty for this phase.

---

## Code Examples

Verified patterns from in-codebase sources. Every snippet below is pulled or composed from files already shipped in Phases 23/24.

### Example 1: BaseLayoutV2 import + named-slot head injection

```astro
---
// Source: src/pages/design-system.astro lines 11, 45-50 (verified shipped Phase 24)
import BaseLayout from '../layouts/v2/BaseLayout.astro';
---

<BaseLayout
  title="Design System (v2) | Joel Shinness"
  description="…"
>
  <meta slot="head" name="robots" content="noindex, follow" />
  <!-- page body content -->
</BaseLayout>
```

### Example 2: JSON-LD slot injection (FAQ-specific, Phase 25 application)

```astro
---
// Composed from: src/pages/faq.astro line 62 (v1 set:html pattern, verified shipped v1.2)
//                src/pages/design-system.astro line 49 (slot="head" pattern, verified shipped Phase 24)
import BaseLayout from '../layouts/v2/BaseLayout.astro';
import Button from '../components/v2/ui/Button.astro';
import Card from '../components/v2/ui/Card.astro';
import CardBody from '../components/v2/ui/CardBody.astro';
import { ChevronDown } from '@lucide/astro';

// Pulled VERBATIM from current src/pages/faq.astro lines 11-32 per D-04
const faqs = [ /* 5 entries */ ];

// Pulled VERBATIM from current src/pages/faq.astro lines 35-46 per D-04, D-08
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({ /* ... */ })),
};
---

<BaseLayout title="…" description="…">
  <script
    type="application/ld+json"
    set:html={JSON.stringify(faqSchema)}
    slot="head"
  />
  <!-- FAQ content -->
</BaseLayout>
```

### Example 3: Centered-Card composition (canonical pattern for thank-you and 404)

```astro
<!-- Source: 25-UI-SPEC.md Component Composition — locked composition block -->
<!-- Verified primitive APIs: src/components/v2/ui/{Card,CardBody,Button}.astro -->
<div class="container mx-auto px-lg py-xl min-h-[70vh] flex items-center justify-center">
  <Card elevated={true} class="max-w-2xl w-full text-center">
    <CardBody>
      <div class="flex flex-col items-center gap-md">
        <MailCheck size={64} class="text-accent" aria-hidden="true" />
        <h1 class="font-display text-h1 font-bold text-text">Thanks for reaching out!</h1>
        <p class="font-text text-body text-text max-w-md">
          I'll email you within 48 hours with next steps. Looking forward to learning more about your project!
        </p>
        <Button variant="primary" size="lg" href="https://calendly.com/joelshinness">
          Skip the wait — book a call
        </Button>
        <Button variant="link" size="sm" href="/">Return to homepage</Button>
      </div>
    </CardBody>
  </Card>
</div>
```

### Example 4: Native `<details>` FAQ row with ChevronDown indicator

```astro
<!-- Source: 25-UI-SPEC.md Component Composition — locked FAQ row block -->
{faqs.map(faq => (
  <details class="group border border-border rounded-lg p-md bg-surface">
    <summary class="font-display text-h3 font-bold text-text cursor-pointer list-none flex items-center justify-between gap-md">
      <span>{faq.question}</span>
      <ChevronDown
        size={24}
        aria-hidden="true"
        class="shrink-0 transition-transform duration-200 ease-out group-open:rotate-180"
      />
    </summary>
    <div class="mt-md font-text text-body text-text">
      {faq.answer}
    </div>
  </details>
))}
```

### Example 5: axe-core full-page test (canonical pattern for new spec)

```typescript
// Source: tests/accessibility/v2-primitives.spec.ts lines 18, 25-31 (verified shipped Phase 24)
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('v2 Leaf Pages Accessibility (Phase 25)', () => {
  test('/faq has zero axe-core violations (WCAG 2.2 AA)', async ({ page }) => {
    await page.goto('/faq');
    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('/thank-you has zero axe-core violations (WCAG 2.2 AA)', async ({ page }) => {
    await page.goto('/thank-you');
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });

  test('/404 has zero axe-core violations (WCAG 2.2 AA)', async ({ page }) => {
    // Note: Astro dev server returns the configured 404 page for unmatched routes.
    // Test by navigating to a deliberately non-existent route.
    await page.goto('/this-route-does-not-exist-for-testing');
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });
});
```

**Note on `/404` testing:** Astro's dev server (`npm run dev`) serves `src/pages/404.astro` for any unmatched route at runtime. The `page.goto('/this-route-does-not-exist')` pattern is the canonical way to load the 404 page in Playwright. Alternative: `page.goto('/404')` may also work since the file exists as a route. Both should be acceptable — pick whichever the planner prefers (the bogus-route version more closely mirrors real user experience).

### Example 6: JSON-LD parse + assertion (D-19 behavioral check)

```typescript
// Composed from D-19 contract; new pattern in this phase.
// Verified mechanism: <script type="application/ld+json" set:html=...> emits
//   raw JSON text as the script element's text content (innerHTML / textContent).
//   Playwright reads it via locator.textContent() or page.evaluate().
test('/faq emits valid FAQPage JSON-LD with 5 questions', async ({ page }) => {
  await page.goto('/faq');

  // Locate the JSON-LD script inside <head>. The "head " prefix on the
  // locator is important — it verifies the script lives in <head>, not <body>.
  const jsonLdScript = page.locator('head script[type="application/ld+json"]');
  await expect(jsonLdScript).toHaveCount(1);

  const jsonText = await jsonLdScript.textContent();
  expect(jsonText).toBeTruthy();

  const parsed = JSON.parse(jsonText as string);

  expect(parsed['@type']).toBe('FAQPage');
  expect(Array.isArray(parsed.mainEntity)).toBe(true);
  expect(parsed.mainEntity).toHaveLength(5);

  // Spot-check that each entry is a well-formed Question with an Answer
  for (const entry of parsed.mainEntity) {
    expect(entry['@type']).toBe('Question');
    expect(typeof entry.name).toBe('string');
    expect(entry.name.length).toBeGreaterThan(0);
    expect(entry.acceptedAnswer['@type']).toBe('Answer');
    expect(typeof entry.acceptedAnswer.text).toBe('string');
    expect(entry.acceptedAnswer.text.length).toBeGreaterThan(0);
  }
});
```

### Example 7: Astro 404.astro file (canonical static-build behavior)

```astro
---
// File: src/pages/404.astro (NEW — Plan 25-02)
// Astro auto-detects and emits dist/404.html for static builds.
// GitHub Pages serves 404.html for any unmatched route — zero config required (D-09).
import BaseLayout from '../layouts/v2/BaseLayout.astro';
import Button from '../components/v2/ui/Button.astro';
import Card from '../components/v2/ui/Card.astro';
import CardBody from '../components/v2/ui/CardBody.astro';
---

<BaseLayout
  title="Page not found | Joel Shinness"
  description="The page you're looking for doesn't exist or has moved."
>
  <meta slot="head" name="robots" content="noindex, follow" />

  <div class="container mx-auto px-lg py-xl min-h-[70vh] flex items-center justify-center">
    <Card elevated={true} class="max-w-2xl w-full text-center">
      <CardBody>
        <div class="flex flex-col items-center gap-md">
          <h1 class="font-display text-h1 font-bold text-text">Page not found</h1>
          <p class="font-text text-body text-text max-w-md">
            This page doesn't exist or has moved. Head back home to find what you're looking for.
          </p>
          <Button variant="primary" size="md" href="/">Return home</Button>
        </div>
      </CardBody>
    </Card>
  </div>
</BaseLayout>
```

---

## Validation Architecture

This phase's validation strategy is straightforward and entirely covered by existing CI infrastructure + one new Playwright spec. Document it explicitly so `VALIDATION.md` (step 5.5) can be generated mechanically.

### Validation Dimensions

| Dimension | What it validates | Gate type |
|-----------|-------------------|-----------|
| **D1 — WCAG 2.2 AA Accessibility** | All three pages (`/faq`, `/thank-you`, `/404`) emit zero axe-core violations across the standard WCAG 2.x tag set | Hard merge gate |
| **D2 — Structured Data Integrity** | `/faq` JSON-LD `<script>` is present in `<head>`, parses as valid JSON, has `@type === "FAQPage"`, `mainEntity.length === 5`, and every entry is a well-formed Question/Answer pair | Hard merge gate (LEAF-01) |
| **D3 — Lighthouse Quality Floor** | All three pages score ≥ 90 in Performance, Accessibility, Best Practices, SEO via the existing Lighthouse CI workflow | Hard merge gate (already wired in `.github/workflows/deploy.yml` lines 31-37) |
| **D4 — Build & Type Safety** | `npm run build` completes with zero errors; `npm run astro check` reports zero TypeScript errors | Hard merge gate |
| **D5 — Light-Mode Invariant** | None of the 3 page files contain `prefers-color-scheme`, `localStorage.theme`, `.dark` selectors, or `dark:` utility classes (Phase 23 D-08 carry-forward) | Hard merge gate (grep-based check) |
| **D6 — Layout Migration Completeness** | None of the 3 page files import from v1 `src/layouts/BaseLayout.astro` or v1 `src/components/ui/*` (D-17) | Hard merge gate (grep-based check) |
| **D7 — Static 404 Emission** | `dist/404.html` exists after `npm run build`; file is non-empty; renders the v2 layout shell | Hard merge gate |
| **D8 — Calendly URL Preservation** | `/thank-you` Button `href` equals `https://calendly.com/joelshinness` verbatim (D-16) | Hard merge gate (grep-based check) |

### Validation Signals

| Dimension | Signal | Verification command | Pass condition |
|-----------|--------|---------------------|----------------|
| D1 | axe-core scan via Playwright | `npx playwright test tests/accessibility/v2-leaf-pages.spec.ts` | All 3 axe tests report `violations.length === 0` |
| D2 | JSON-LD parse via Playwright | `npx playwright test -g "JSON-LD"` (subset of v2-leaf-pages spec) | Parse succeeds; `@type === "FAQPage"`; `mainEntity.length === 5` |
| D3 | Lighthouse CI on the built `dist/` | `.github/workflows/deploy.yml` step "Run Lighthouse CI" (treosh/lighthouse-ci-action@v12, `runs: 3`, asserts via `lighthouserc.json`) | All four categories ≥ 0.9 minScore on every page |
| D4 | Astro build + check | `npm run build && npm run astro check` | Both exit code 0 |
| D5 | Light-mode grep | `grep -rE 'dark:\|localStorage\\.theme\|prefers-color-scheme\|\\.dark[^a-z]' src/pages/{faq,thank-you,404}.astro` | Zero matches |
| D6 | v1 import grep | `grep -E "from ['\"]\\.\\./layouts/BaseLayout\\.astro['\"]" src/pages/{faq,thank-you,404}.astro` and `grep -E "from ['\"]\\.\\./components/ui/" src/pages/{faq,thank-you,404}.astro` | Both return zero matches |
| D7 | dist 404 file check | `npm run build && test -s dist/404.html && grep -q 'Page not found' dist/404.html` | Both checks exit 0 |
| D8 | Calendly URL grep | `grep -F 'https://calendly.com/joelshinness' src/pages/thank-you.astro` | Exactly one match |

### Gating Thresholds

| Threshold | Value | Source | Notes |
|-----------|-------|--------|-------|
| axe-core violation count | 0 | Phase 23 24-03 STATE entry; D-19 | Across all 3 pages, all 5 WCAG tag categories |
| Lighthouse score (each category) | ≥ 90 (`minScore: 0.9`) | `lighthouserc.json` line 12 | Performance is an `error` gate; Accessibility/Best-Practices/SEO are `warn` gates per existing config — but the project-level success criterion in ROADMAP Phase 25 is "Lighthouse 90+ across all categories", so executor MUST verify all four pass even though only Performance hard-fails the CI by default |
| FAQPage `mainEntity.length` | exactly 5 | D-04 (5 questions verbatim from v1) + D-19 | Must be `=== 5`, not `>= 5`, to catch accidental additions |
| JSON-LD `@type` | exactly `"FAQPage"` | D-08; Schema.org spec | Must match string equality |
| TypeScript errors | 0 | `npm run astro check` exit code | CLAUDE.md requirement |
| Build errors | 0 | `npm run build` exit code | CLAUDE.md requirement |
| `dist/404.html` size | > 0 bytes | `test -s` shell check | Verifies Astro emitted the file |
| `dist/404.html` content marker | contains "Page not found" | grep check | Verifies the v2 page content is in the emitted file, not a fallback shell |

### Validation Sequencing

The natural execution order within the phase:

1. **Build-time validation** (during executor implementation, before commit)
   - D4 (build + check)
   - D5, D6, D8 (grep checks — fast, fail-fast feedback)

2. **Test-time validation** (`npm run test:a11y` on the dev server)
   - D1 (axe-core)
   - D2 (JSON-LD parse)

3. **CI-time validation** (PR check)
   - D3 (Lighthouse CI on the built `dist/`)
   - D7 (implicit — `dist/404.html` must exist for the build to succeed and Lighthouse to scan it)

4. **Manual UAT** (post-merge sanity check — optional but recommended for the first leaf-page migration)
   - Visit `/faq`, `/thank-you`, and a deliberately broken URL on the deployed PR preview; visually confirm the centered-Card moments and FAQ accordion behavior; confirm no dark-mode FOUC on first paint.

### Non-Validation Items (explicitly out of scope)

- Visual regression / screenshot diffing — none configured for this project; Phase 24 omitted them; Phase 25 does not introduce them.
- E2E form submission test — Phase 28 (CONT-05) covers this for ContactSection; not relevant to leaf pages.
- Webhook integration test — Phase 28 owns; the thank-you page is a static success target, not a webhook consumer.

---

## State of the Art

The patterns this phase uses are mature and stable. No emerging-vs-deprecated tradeoffs surface inside the phase boundary.

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Inline `<html>` scaffold per page (current v1 `/faq`) | Single `BaseLayout.astro` owns the document shell; pages import it | Phase 23 (v2) | DELETE the inline scaffold in `/faq` migration per D-18 |
| `+` glyph for disclosure indicator (current v1 `/faq`) | Lucide `ChevronDown` from `@lucide/astro` | This phase (D-02) | Consistent v2 icon vocabulary |
| Google Fonts `<link>` tags with FOUT mitigation script | Self-hosted variable fonts via `@fontsource-variable/*` packages, CSS-imported in v2 `global.css` | Phase 23 | Eliminates render-blocking Google Fonts request; preload of Plus Jakarta Sans handled in `BaseLayoutV2` line 25 |
| Dark-mode `<script is:inline>` boot script | Light-mode only (no script, no localStorage, no FOUC) | Phase 23 (D-08) | Simpler markup; no FOUC risk; smaller HTML payload |
| v1 `Card variant="turquoise"` for `/thank-you` success state | v2 elevated Card + Lucide `MailCheck` icon (text-accent) | This phase (D-14, D-15) | No new variants; visual cue carried by semantic icon |
| v1 `Card variant="turquoise"` only-route to "this is success" | Icon + Card-elevated convention scales to all confirmation/recovery surfaces | This phase | Reusable for future similar pages (purchase confirmation, password reset, etc.) without new tokens |

**Deprecated/outdated** (carried-forward from prior phases, not undone by this phase):

- v1 `src/layouts/BaseLayout.astro` — still exists for other un-migrated pages (home, blog, projects, services); deletion is Phase 30 scope.
- v1 `src/components/ui/*` (Card, Button, Input, CheckboxGroup, Badge) — still imported by un-migrated pages; deletion is Phase 30 scope.
- v1 dark-mode boot script + `#theme-toggle` element — already removed from Header v2; still present in v1 layout's pages until they migrate.

---

## Open Questions

Items where the locked CONTEXT/UI-SPEC contract leaves a small implementation surface:

1. **Plan 25-02 ordering of axe tests within the shared spec file.**
   - What we know: Plan 25-01 creates `tests/accessibility/v2-leaf-pages.spec.ts` with the `/faq` axe test + JSON-LD assertion. Plan 25-02 extends it with `/thank-you` and `/404` axe tests.
   - What's unclear: Whether 25-02 should `test.describe.serial` the tests or rely on Playwright's default parallel execution. The Phase 24 `v2-primitives.spec.ts` uses no `.serial` — tests run in parallel within a single browser context per spec file by default, but `fullyParallel: true` in `playwright.config.ts` line 4 also enables file-level parallelism. None of these tests share state, so default (parallel) is correct.
   - Recommendation: Use plain `test()` declarations, no `.serial`, no shared fixtures. Matches Phase 24 convention.

2. **Whether to add a sitemap exclusion filter for `/404`.**
   - What we know: `<meta name="robots" content="noindex, follow">` (D-13) prevents search indexing.
   - What's unclear: Whether `@astrojs/sitemap` (configured in `astro.config.mjs` lines 24-29) automatically excludes `404.html` from the generated sitemap (the integration documentation suggests it operates on routes, not on static file names — so behavior depends on whether Astro registers `/404` as a route).
   - Recommendation: Plan 25-02 should include a single shell-grep step after `npm run build` to confirm `/404` is not in `dist/sitemap-*.xml`. If it IS present, add a `filter: (page) => !page.endsWith('/404')` callback to the sitemap integration as a follow-up. This is a 2-line fix and not a planning blocker.

3. **Playwright route to test the 404 page.**
   - What we know: Astro dev server serves `src/pages/404.astro` for any unmatched route.
   - What's unclear: Whether `page.goto('/404')` or `page.goto('/this-does-not-exist')` is the more idiomatic way to load the 404 view in Playwright. Both should work; the former tests the file as a named route, the latter tests the actual "user typed wrong URL" path.
   - Recommendation: Use `page.goto('/this-route-does-not-exist-for-testing')` — closer to real user experience and verifies Astro's dev fallback behavior. If that causes Playwright to flag a navigation error on response status, fall back to `page.goto('/404')`.

None of these block planning. All have safe defaults; the planner can lock them into Plan 25-01 / 25-02 as written.

---

## Sources

### Primary (HIGH confidence)

- `src/layouts/v2/BaseLayout.astro` lines 16-36 — empirical proof of `<slot name="head" />` mechanism, light-mode `<body>`, Plus Jakarta Sans preload, SEO component invocation.
- `src/pages/design-system.astro` line 49 — empirical proof that `<meta slot="head" ...>` works on the v2 layout (in-codebase verification of slot-based head injection).
- `src/pages/faq.astro` lines 11-46 — verbatim source of the `faqs` array and `faqSchema` object that ship into the new file per D-04, D-08.
- `src/pages/faq.astro` line 62 — empirical proof that `<script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />` correctly emits raw JSON inside a script tag.
- `src/pages/thank-you.astro` lines 1-58 — verbatim source of the message copy and Calendly placeholder URL per D-16.
- `src/components/v2/ui/Button.astro` lines 1-87 — locked Props API: `variant` × `size`, polymorphic `href`, iconLeft/iconRight, `aria-disabled` wiring, scoped focus ring.
- `src/components/v2/ui/Card.astro` lines 1-37 — locked Props API: `elevated`, `interactive`, scoped focus ring.
- `src/components/v2/ui/CardBody.astro` lines 1-12 — locked: `px-md py-md` default padding wrapper.
- `src/styles/v2/global.css` lines 1-108 — locked token system: 9 colors, 6 spacing, 5 max-widths, 4 radii, 8 type sizes, 2 fonts, 3 weights, 2 leadings, 1 shadow.
- `tests/accessibility/v2-primitives.spec.ts` lines 18-31 — canonical axe-core test pattern (`wcagTags`, `AxeBuilder({ page }).withTags(wcagTags).analyze()`, `expect(results.violations).toEqual([])`).
- `tests/accessibility/v2-layout.spec.ts` lines 6-44 — Phase 23 test pattern reference for the v2 layout's axe gates.
- `package.json` — locked dependency versions: Astro 5.16.15, Tailwind 4.1.18, `@lucide/astro` 0.563.0, `@playwright/test` 1.58.2, `@axe-core/playwright` 4.11.1.
- `astro.config.mjs` lines 1-39 — confirms no special 404 configuration is needed; static-only build (no SSR adapter); sitemap + robots integrations in place.
- `.github/workflows/deploy.yml` lines 31-37 — empirical Lighthouse CI wiring: `treosh/lighthouse-ci-action@v12`, `configPath: ./lighthouserc.json`, `staticDistDir: ./dist`, `runs: 3`.
- `lighthouserc.json` lines 10-30 — locked Lighthouse assertions: `categories:performance` `error` at `minScore: 0.9`; A11y/BP/SEO `warn` at 0.9.
- `.planning/phases/25-leaf-page-migrations-faq-thank-you-404/25-CONTEXT.md` — locked decisions D-01..D-20.
- `.planning/phases/25-leaf-page-migrations-faq-thank-you-404/25-UI-SPEC.md` — locked design contract with resolved discretion items.

### Secondary (MEDIUM confidence)

- Astro 5 official docs — `https://docs.astro.build/en/basics/astro-pages/` — confirmed: `src/pages/404.astro` "will build to a `404.html` page" automatically; "most deploy services will find and use it". Confirms D-09 design assumption.
- Astro 5 official docs — `https://docs.astro.build/en/basics/astro-components/#named-slots` — confirmed mechanism: `<slot name="head" />` in layout + `slot="head"` attribute on child elements. (Set:html behavior with slotted elements: not explicitly documented but verified empirically in this codebase.)

### Tertiary (LOW confidence)

- None. Every load-bearing claim in this research is either verified in-codebase (HIGH) or confirmed by Astro official docs (MEDIUM). No claim depends on a single uncorroborated WebSearch source.

---

## Metadata

**Confidence breakdown:**

- **Standard stack:** HIGH — every library is already installed at a pinned version; version compatibility is verified by the in-codebase Phase 23/24 deliverables that exercise the same APIs.
- **Architecture patterns:** HIGH — every pattern is either (a) already shipped in `src/pages/design-system.astro` (BaseLayoutV2 import, slot="head" meta injection, Card+CardBody composition) or (b) explicitly locked in the UI-SPEC composition blocks (centered-Card layout, native `<details>` FAQ rows, JSON-LD slot injection).
- **Pitfalls:** HIGH — Pitfall 1 (dark-mode legacy in `/faq`) is directly observable in the current 122-line file; Pitfalls 2-5 are verified by inspecting Phase 23/24 outputs and Astro 5 official documentation; Pitfall 6 (Header/Footer scope drift) is explicitly forbidden by D-17 and UI-SPEC cross-cutting contract.
- **Validation architecture:** HIGH — axe-core spec pattern is verbatim from the shipped Phase 24 spec; Lighthouse CI is empirically wired in `deploy.yml`; grep-based light-mode and v1-import gates are mechanically verifiable.

**Research date:** 2026-05-15
**Valid until:** 2026-06-14 (30 days — stack is stable, no fast-moving dependencies in scope; phase is migration-only, not exploration)

# Phase 25: Leaf Page Migrations (FAQ, Thank-You, 404) - Pattern Map

**Mapped:** 2026-05-15
**Files analyzed:** 4 (3 pages + 1 spec)
**Analogs found:** 4 / 4 (every new/modified file has at least one in-codebase exact analog)

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/pages/faq.astro` (rewrite) | page (Astro static route) | request-response (static HTML render) + structured-data emission (inline JSON-LD) | `src/pages/design-system.astro` (BaseLayoutV2 + slot="head" + Card composition) + current `src/pages/faq.astro` (verbatim `faqs` array + `faqSchema` literal per D-04) | exact (composite — composition from design-system.astro, content from current v1 faq.astro) |
| `src/pages/thank-you.astro` (rewrite) | page (Astro static route) | request-response (post-form-submit confirmation surface) | `src/pages/design-system.astro` (BaseLayoutV2 + Card composition) + current `src/pages/thank-you.astro` (verbatim copy + Calendly URL per D-16, `min-h-[70vh]` container) | exact (composite — v2 primitives via design-system.astro, copy/URL/container from current v1 thank-you.astro) |
| `src/pages/404.astro` (NEW) | page (Astro static route — auto-emits dist/404.html) | request-response (fallback for unmatched routes) | `src/pages/design-system.astro` (slot="head" noindex meta — verbatim pattern) + the locked thank-you v2 composition (centered-Card moment) | exact (no in-codebase 404 file exists, but every composition piece is shipped: BaseLayoutV2 + Card + CardBody + Button + slot="head" meta) |
| `tests/accessibility/v2-leaf-pages.spec.ts` (NEW) | test (Playwright + axe-core integration spec) | request-response (HTTP fetch of dev-server pages) + DOM/JSON parse assertions | `tests/accessibility/v2-primitives.spec.ts` (Test 1 — canonical axe pattern, lines 18-31) + `tests/accessibility/v2-layout.spec.ts` (multi-test describe block pattern, lines 6-44) | exact (both Phase 23 and Phase 24 axe specs are direct shape templates) |

**No "no analog found" files in this phase.** Every file has a strong exact match — Phase 25 is composition, not invention.

---

## Pattern Assignments

### `src/pages/faq.astro` (page, request-response + structured-data)

**Primary analog:** `src/pages/design-system.astro` (composition shell + slot="head" injection)
**Content analog:** `src/pages/faq.astro` (current v1 — verbatim source for `faqs` array lines 11-32 and `faqSchema` lines 35-46 per D-04, D-08)

#### Imports pattern

Copy from `src/pages/design-system.astro` lines 11-19 (verbatim block — only the icon list changes):

```astro
---
import BaseLayout from '../layouts/v2/BaseLayout.astro';
import Button from '../components/v2/ui/Button.astro';
import Card from '../components/v2/ui/Card.astro';
import CardBody from '../components/v2/ui/CardBody.astro';
import { ChevronDown } from '@lucide/astro';
---
```

Notes:
- Import path `'../layouts/v2/BaseLayout.astro'` — the v2 layout (NOT v1 `'../layouts/BaseLayout.astro'`).
- Import primitives separately (`Card`, `CardBody`) per Phase 24 D-05 — no barrel.
- `@lucide/astro` named import — same shape as `design-system.astro` line 19 `import { ArrowRight, Sparkles, Mail } from '@lucide/astro';`. Phase 25 uses only `ChevronDown` here.
- Discard the v1 `import '../styles/global.css';` (line 2 of current `faq.astro`) — `BaseLayoutV2` line 2 already imports `src/styles/v2/global.css`.
- Discard v1 `Header` / `Footer` / `SEO` imports (lines 3-5 of current `faq.astro`) — `BaseLayoutV2` lines 4-6 already render all three.

#### Verbatim content carry-over (D-04)

Copy verbatim from current `src/pages/faq.astro` lines 11-46 — both the `faqs` array (5 entries) and the `faqSchema` object literal:

```typescript
// VERBATIM from current src/pages/faq.astro lines 11-32 — D-04
const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "Every project is different. Discovery and prototyping usually take 1-2 weeks, then we'll outline a timeline in the proposal based on scope."
  },
  // ... 4 more entries (rows 2-5) — copy lines 16-31 verbatim, no edits, no reordering
];

// VERBATIM from current src/pages/faq.astro lines 35-46 — D-04, D-08
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};
```

#### Layout shell + slot="head" pattern

Copy from `src/pages/design-system.astro` lines 45-51 (verbatim shape — only the head-slot child element changes):

```astro
<BaseLayout
  title="Frequently Asked Questions | Joel Shinness"
  description="Frequently asked questions about working with Joel Shinness — process, timelines, scope changes, and what happens after handover."
>
  <script
    type="application/ld+json"
    set:html={JSON.stringify(faqSchema)}
    slot="head"
  />

  <!-- page content -->
</BaseLayout>
```

Mechanism notes:
- `<BaseLayout>` props `title` and `description` flow through to `<SEO>` inside `BaseLayoutV2` line 27 — pages MUST NOT manually emit `<title>` or `<meta name="description">`.
- `slot="head"` is the named-slot mechanism exposed by `BaseLayoutV2` line 29. Verified working in `design-system.astro` line 49 (`<meta slot="head" name="robots" content="noindex, follow" />`).
- `set:html={JSON.stringify(faqSchema)}` is the verified `set:html` pattern from current `src/pages/faq.astro` line 62 — emits raw JSON inside the `<script>` element without HTML escaping. Combining `slot="head"` with `set:html` is independent — both directives co-exist on one element.

#### FAQ row pattern (native `<details>` + ChevronDown)

Use the locked composition block from `25-UI-SPEC.md` Component Composition (verbatim — this is the design-contract output):

```astro
<section class="py-2xl px-lg">
  <div class="container mx-auto max-w-3xl">

    <h1 class="font-display text-h1 font-bold text-text mb-md text-center">
      Frequently Asked Questions
    </h1>
    <p class="font-text text-body text-text-muted mb-xl text-center">
      Common questions about working together. If yours isn't here, let's talk.
    </p>

    <div class="flex flex-col gap-sm mb-xl">
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
    </div>

    <!-- CTA Card — see next section -->
  </div>
</section>
```

Pattern provenance:
- `border border-border rounded-lg p-md bg-surface` mirrors the typography-token row container at `src/pages/design-system.astro` line 92 (`border border-border rounded-lg p-md bg-surface`). Same visual vocabulary across v2 pages.
- `flex items-center justify-between gap-md` on `<summary>` — same flex grammar used in the design-system page typography row at line 94 (`flex items-baseline gap-md`).
- `list-none` on `<summary>` removes the native disclosure triangle (browser-default ► chevron). Required because we replace it with the Lucide `ChevronDown` per D-02.
- `group` on `<details>` + `group-open:rotate-180` on the chevron — Tailwind v4's `group-open:*` variant is the `[open]` attribute selector on the parent `.group`. Native browser semantics, no JS.
- `transition-transform duration-200 ease-out` — duration matches the v2 Card hover transition at `src/components/v2/ui/Card.astro` line 22 (`transition-transform duration-200`). Single motion vocabulary.

#### CTA Card pattern (Card + CardBody + Button — same composition family as thank-you/404)

Use the canonical centered-Card composition. Pattern provenance is `src/pages/design-system.astro` lines 178-191 (Composed card with CardHeader+CardBody+CardFooter), simplified to CardBody-only here:

```astro
<Card elevated={true} class="max-w-2xl mx-auto text-center">
  <CardBody>
    <h2 class="font-display text-h3 font-bold text-text mb-md">Still have questions?</h2>
    <p class="font-text text-body text-text-muted mb-md">
      Tell me about your project — I usually respond within 48 hours.
    </p>
    <Button variant="primary" size="md" href="/#contact">Let's talk</Button>
  </CardBody>
</Card>
```

Notes:
- `elevated={true}` adds `shadow-md` per `src/components/v2/ui/Card.astro` line 21 (`elevated && 'shadow-md'`).
- `max-w-2xl mx-auto text-center` constrains width and centers — `max-w-2xl` (672px) resolves from the `--max-width-2xl` token added in Phase 24 Plan 24-05.
- `<CardBody>` already has `px-md py-md` baked in (`src/components/v2/ui/CardBody.astro` line 9). Pages MUST NOT override CardBody padding.
- `Button` with `href` renders `<a class="btn">` polymorphically (`src/components/v2/ui/Button.astro` line 29 — `const Tag = href ? 'a' : 'button';`).

#### Error handling

N/A — static page render, no try/catch surface. Astro handles render-time errors at the framework level.

#### Validation pattern

Schema/validation happens at the test layer (`tests/accessibility/v2-leaf-pages.spec.ts` JSON-LD parse assertion). No runtime validation in the .astro file.

---

### `src/pages/thank-you.astro` (page, request-response)

**Primary analog:** `src/pages/design-system.astro` (BaseLayoutV2 import + Card+CardBody composition)
**Content analog:** `src/pages/thank-you.astro` (current v1 — verbatim copy, Calendly URL, `min-h-[70vh]` container per D-16)

#### Imports pattern

Same shape as `src/pages/design-system.astro` lines 11-19 — substitute the icon:

```astro
---
import BaseLayout from '../layouts/v2/BaseLayout.astro';
import Button from '../components/v2/ui/Button.astro';
import Card from '../components/v2/ui/Card.astro';
import CardBody from '../components/v2/ui/CardBody.astro';
import { MailCheck } from '@lucide/astro';
---
```

Discard from current v1 `src/pages/thank-you.astro` lines 1-5:
- `import BaseLayout from '../layouts/BaseLayout.astro';` (v1 layout — replace with v2 path).
- `import Card from '../components/ui/Card.astro';` (v1 Card with `variant="turquoise"` — replace with v2 Card primitive).
- `import Button from '../components/ui/Button.astro';` (v1 Button — replace with v2 Button primitive).
- `import { CheckCircle2 } from '@lucide/astro';` — replace with `MailCheck` per D-15.

#### Verbatim content carry-over (D-16)

Pull verbatim from current `src/pages/thank-you.astro`:
- Page `title="Thanks! | Joel Shinness"` (line 9)
- Page `description="Thank you for reaching out. I'll respond within 48 hours."` (line 10)
- H1 text `"Thanks for reaching out!"` (line 22)
- Paragraph `"I'll email you within 48 hours with next steps. Looking forward to learning more about your project!"` (lines 26-28)
- Button `href="https://calendly.com/joelshinness"` (line 35) — **PRESERVED VERBATIM per D-16; the real URL swap is a separately tracked v1.3 STATE.md todo and is OUT OF SCOPE for this phase.**
- Button label `"Skip the wait — book a call"` (line 38) — note the em-dash is preserved verbatim (the current v1 uses a hyphen; D-16 + UI-SPEC line 138 specify em-dash, which is the locked contract; treat the locked spec as authoritative).
- Secondary "Return to homepage" link label (line 47) — pull verbatim, but render via `Button variant="link"` per UI-SPEC D-14 RESOLVED.
- Container utility `min-h-[70vh] flex items-center justify-center` (line 12) — pull verbatim per D-14.

Discard from current v1:
- Inline `<style>.container { max-width: 1280px; }</style>` block (lines 54-58) — Tailwind v4's default `container` class handles this; no need for the override.
- All `dark:` utilities (lines 16, 21, 26, 45) — light-mode invariant per Phase 23 D-08.
- All v1 `font-heading` / `font-body` / `text-text-light` / `bg-bg-*` / `text-turquoise` utilities — replaced by v2 `font-display` / `font-text` / `text-text` / `bg-surface` / `text-accent`.
- `Card variant="turquoise"` — v2 has no turquoise variant; replaced by `Card elevated={true}` per D-14.

#### Centered-Card composition pattern

Use the locked composition block from `25-UI-SPEC.md` Component Composition (verbatim):

```astro
<BaseLayout title="Thanks! | Joel Shinness" description="Thank you for reaching out. I'll respond within 48 hours.">
  <div class="container mx-auto px-lg py-xl min-h-[70vh] flex items-center justify-center">
    <Card elevated={true} class="max-w-2xl w-full text-center">
      <CardBody>
        <div class="flex flex-col items-center gap-md">
          <MailCheck size={64} class="text-accent" aria-hidden="true" />
          <h1 class="font-display text-h1 font-bold text-text">
            Thanks for reaching out!
          </h1>
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
</BaseLayout>
```

Pattern provenance:
- `<Card elevated={true}>` — `elevated` prop verified at `src/components/v2/ui/Card.astro` line 2 (`elevated?: boolean`) and line 21 (`elevated && 'shadow-md'`).
- `<CardBody>` — empty wrapper with `px-md py-md` baked in (`src/components/v2/ui/CardBody.astro` line 9). Same use as `design-system.astro` lines 183-187.
- `MailCheck size={64} class="text-accent" aria-hidden="true"` — Lucide icon import shape matches `design-system.astro` line 19 + line 139 (`<Button variant="primary" iconLeft={Sparkles}>`); inline icon usage like `<CheckCircle2 size={64} strokeWidth={2} />` from current v1 line 17 — except `class="text-accent"` on the icon (the ONE permitted text-accent use per UI-SPEC Color contract — icons are non-text per WCAG 1.4.3).
- `Button variant="link" size="sm"` for "Return to homepage" — D-14 RESOLVED. The link variant auto-renders `<a class="btn">` because `href` is present, and auto-injects `ArrowRight` as `iconRight` per `src/components/v2/ui/Button.astro` lines 32-35:
  ```typescript
  const IconRight =
    variant === 'link'
      ? (IconRightProp === null ? null : (IconRightProp ?? ArrowRight))
      : IconRightProp;
  ```
  Pages do NOT need to import `ArrowRight` themselves.

#### Error handling

N/A — static page render. Calendly external link is a plain `<a>`-rendered Button; user-agent handles the network.

#### Validation pattern

Test layer covers this — `tests/accessibility/v2-leaf-pages.spec.ts` axe-core test for `/thank-you`.

---

### `src/pages/404.astro` (page, request-response — NEW)

**Primary analog:** `src/pages/design-system.astro` (slot="head" noindex meta — verbatim line 49) + the locked thank-you v2 composition (sibling — same centered-Card moment per D-12).

There is no in-codebase 404 file yet; this is a NEW file. However, every composition piece is already shipped — this is pure assembly, not invention.

#### Imports pattern

Same shape as the thank-you.astro pattern above — minus the icon (D-12: "No icon"):

```astro
---
import BaseLayout from '../layouts/v2/BaseLayout.astro';
import Button from '../components/v2/ui/Button.astro';
import Card from '../components/v2/ui/Card.astro';
import CardBody from '../components/v2/ui/CardBody.astro';
---
```

#### Layout shell + slot="head" noindex pattern

Copy verbatim from `src/pages/design-system.astro` line 49 — substitute the `BaseLayout` props:

```astro
<BaseLayout
  title="Page not found | Joel Shinness"
  description="The page you're looking for doesn't exist or has moved."
>
  <meta slot="head" name="robots" content="noindex, follow" />

  <!-- centered-Card composition — see below -->
</BaseLayout>
```

Mechanism notes:
- `<meta slot="head" name="robots" content="noindex, follow" />` — verbatim from `src/pages/design-system.astro` line 49. Lands inside `<head>` between `<SEO />` and `</head>` via the `<slot name="head" />` at `src/layouts/v2/BaseLayout.astro` line 29. **Pattern verified shipped in Phase 24.**
- `noindex, follow` — exact same string as `/design-system`. Prevents search-engine indexing per D-13. `follow` allows link-juice flow through internal links (e.g. the "Return home" Button).

#### Centered-Card composition (identical to thank-you, minus icon)

Use the locked composition block from `25-UI-SPEC.md` Component Composition for `/404` (verbatim):

```astro
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
```

Pattern provenance — every utility class and prop has shipped precedent:
- Outer container with `min-h-[70vh] flex items-center justify-center` — same as thank-you (current v1 line 12 + locked UI-SPEC line 280).
- `<Card elevated={true} class="max-w-2xl w-full text-center">` — identical pattern to thank-you above (D-12: "Visual layout matches the thank-you pattern").
- `<CardBody>` — identical to thank-you and design-system Card composition.
- `flex flex-col items-center gap-md` — identical inner stack to thank-you.
- `<Button variant="primary" size="md" href="/">` — D-12 RESOLVED to `variant="primary"` (UI-SPEC line 300). Same primitive call shape as `<Button variant="primary" size="md">Primary md</Button>` at `src/pages/design-system.astro` line 116.

#### Astro static-build behavior (canonical)

No code change needed in `astro.config.mjs` — Astro 5 auto-detects `src/pages/404.astro` and emits `dist/404.html` for static builds. GitHub Pages serves `404.html` from the root for any unmatched route. **D-09 — verified by Astro 5 official docs at `https://docs.astro.build/en/basics/astro-pages/`.**

#### Error handling

N/A — this IS the error page.

#### Validation pattern

Test layer — `tests/accessibility/v2-leaf-pages.spec.ts` axe-core test for `/404`. The Playwright test navigates to a deliberately non-existent route (e.g. `/this-route-does-not-exist-for-testing`) so the dev server falls back to the 404 page; alternatively `page.goto('/404')` works because the file IS a named route.

---

### `tests/accessibility/v2-leaf-pages.spec.ts` (test, request-response + DOM/JSON parse — NEW)

**Primary analog:** `tests/accessibility/v2-primitives.spec.ts` Test 1 (lines 18-31 — canonical axe-core full-page-scan pattern shipped in Phase 24).
**Secondary analog:** `tests/accessibility/v2-layout.spec.ts` (lines 6-44 — multi-test describe block shape from Phase 23).

#### Imports pattern

Copy verbatim from `tests/accessibility/v2-primitives.spec.ts` lines 1-2 (and also `v2-layout.spec.ts` lines 1-2 — identical):

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
```

#### WCAG tags constant

Copy verbatim from `tests/accessibility/v2-primitives.spec.ts` line 18 (also `v2-layout.spec.ts` line 4 — identical):

```typescript
const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
```

#### Test describe + axe full-page scan pattern

Copy the shape of `tests/accessibility/v2-primitives.spec.ts` lines 20-31 (Test 1 — the canonical axe pattern):

```typescript
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
    // Astro dev server serves src/pages/404.astro for any unmatched route.
    await page.goto('/this-route-does-not-exist-for-testing');
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });

});
```

Pattern provenance:
- `test.describe(...)` block grouping with phase tag in the name — same shape as `v2-layout.spec.ts` line 6 (`test.describe('v2 Layout Accessibility (Phase 23)', () => {`) and `v2-primitives.spec.ts` line 20 (`test.describe('v2 Primitives Accessibility (Phase 24)', () => {`).
- `await page.goto('/path')` + `new AxeBuilder({ page }).withTags(wcagTags).analyze()` + `expect(results.violations).toEqual([])` — verbatim from `v2-primitives.spec.ts` lines 26-30.
- No `.serial`, no shared fixtures — matches Phase 24 convention. Tests in this spec file are independent and can run in parallel. `playwright.config.ts` `fullyParallel: true` already wired.

#### JSON-LD parse + assertion (D-19 — new pattern in this phase)

This is the only Phase 25 spec pattern that doesn't have a verbatim in-codebase analog. The mechanism (locator on `head script[type="application/ld+json"]` → `textContent()` → `JSON.parse` → field assertions) is composed from D-19 and verified by inspecting:
- `src/pages/faq.astro` line 62 — `<script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />` empirically emits raw JSON as the script element's textContent.
- Playwright API — `locator.textContent()` returns the inner text of the located element, which for `<script>` is its raw inner text.

```typescript
test('/faq emits valid FAQPage JSON-LD with 5 questions in <head>', async ({ page }) => {
  await page.goto('/faq');

  // Locator scoped to "head " — verifies the script lives in <head>, not <body>.
  // Lighthouse SEO and Google Rich Results best-practice both prefer JSON-LD in <head>.
  const jsonLdScript = page.locator('head script[type="application/ld+json"]');
  await expect(jsonLdScript).toHaveCount(1);

  const jsonText = await jsonLdScript.textContent();
  expect(jsonText).toBeTruthy();

  const parsed = JSON.parse(jsonText as string);

  expect(parsed['@type']).toBe('FAQPage');
  expect(Array.isArray(parsed.mainEntity)).toBe(true);
  expect(parsed.mainEntity).toHaveLength(5);

  // Spot-check well-formedness of each Question/Answer entry
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

#### Error handling

N/A — Playwright handles assertion failures and navigation errors at the framework level. Test failure → red CI gate.

#### Validation pattern

Tests ARE the validation. The spec runs via `npx playwright test tests/accessibility/v2-leaf-pages.spec.ts` and gates merge on zero violations.

---

## Shared Patterns

### Pattern 1: BaseLayoutV2 import + named-slot head injection

**Source:** `src/pages/design-system.astro` lines 11, 45-50 (verified shipped Phase 24).
**Apply to:** All 3 page files (`faq.astro`, `thank-you.astro`, `404.astro`).

```astro
---
import BaseLayout from '../layouts/v2/BaseLayout.astro';
// ...other v2 primitive imports
---

<BaseLayout title="..." description="...">
  <!-- Head-slot children land in <head> via <slot name="head" /> at BaseLayout.astro line 29 -->
  <meta slot="head" name="robots" content="noindex, follow" />              <!-- 404 -->
  <script type="application/ld+json" set:html={...} slot="head" />          <!-- faq -->
  <!-- (thank-you has no head-slot children) -->

  <!-- default-slot content lands in <main> via <slot /> at BaseLayout.astro line 33 -->
</BaseLayout>
```

**Locked invariants** (Phase 23 D-08 carry-forward + UI-SPEC Cross-Cutting Contract):
- Zero v1 layout imports — never `'../layouts/BaseLayout.astro'`.
- Zero `prefers-color-scheme`, zero `localStorage.theme`, zero `.dark` selectors, zero `dark:` utility classes.
- Zero `<script is:inline>` blocks (the v1 `/faq` had a dark-mode boot script — DELETED in migration).
- Zero inline Google Fonts `<link>` tags (v1 `/faq` had these — DELETED; `BaseLayoutV2` line 25 preloads Plus Jakarta Sans via `@fontsource-variable`).
- Zero inline `<html>/<head>/<body>` scaffold (v1 `/faq` had its own — DELETED; `BaseLayoutV2` lines 17-36 owns the document shell).
- Zero `is:global` style blocks (Phase 24 D-19 carry-forward).

### Pattern 2: Centered-Card "recovery / confirmation" composition

**Source:** `src/pages/design-system.astro` lines 178-191 (Card composition demo) + locked UI-SPEC composition blocks.
**Apply to:** FAQ CTA card (bottom of `/faq`), entire `/thank-you` page body, entire `/404` page body.

```astro
<div class="container mx-auto px-lg py-xl min-h-[70vh] flex items-center justify-center">
  <Card elevated={true} class="max-w-2xl w-full text-center">
    <CardBody>
      <div class="flex flex-col items-center gap-md">
        {/* optional icon — only thank-you uses it */}
        <h1 class="font-display text-h1 font-bold text-text">...</h1>
        <p class="font-text text-body text-text max-w-md">...</p>
        <Button variant="primary" size="md|lg" href="...">...</Button>
        {/* optional secondary link Button — only thank-you uses it */}
      </div>
    </CardBody>
  </Card>
</div>
```

**Notes:**
- `min-h-[70vh]` is the ONLY arbitrary `[…]` value permitted in this phase (UI-SPEC Spacing Scale Exceptions).
- `max-w-2xl` (672px) resolves from `--max-width-2xl` (Phase 24 24-05 token).
- `<CardBody>` already has `px-md py-md` (`src/components/v2/ui/CardBody.astro` line 9) — pages MUST NOT override.
- `flex flex-col items-center gap-md` inner stack pattern — same vertical rhythm token (`gap-md` = 24px) used across all three pages for icon/heading/paragraph/Button stacking.

### Pattern 3: v2 Button polymorphic href

**Source:** `src/components/v2/ui/Button.astro` lines 29 (`const Tag = href ? 'a' : 'button';`) + lines 32-35 (link variant auto-injects `ArrowRight`).
**Apply to:** Every Button in this phase — all 4 instances are href-bearing (`/#contact`, `https://calendly.com/joelshinness`, `/`, `/`).

```astro
<!-- Renders <a class="btn ...">label<svg/></a> because href is present -->
<Button variant="primary" size="md" href="/#contact">Let's talk</Button>

<!-- Renders <a class="btn ...">label<ArrowRight/></a> — link variant auto-adds iconRight -->
<Button variant="link" size="sm" href="/">Return to homepage</Button>
```

**Notes:**
- Pages do NOT import `ArrowRight` directly — the Button primitive handles it.
- Pages MUST NOT pass `disabled={true}` on a Button with href (handled by Button primitive lines 62-64 — sets `aria-disabled` instead of HTML `disabled`).
- Pages MUST NOT override Button padding via `class` — pass `size` instead (`size="sm" | "md" | "lg"`).

### Pattern 4: Lucide icon usage

**Source:** `src/pages/design-system.astro` line 19 (`import { ArrowRight, Sparkles, Mail } from '@lucide/astro';`) + line 139 (`<Button variant="primary" iconLeft={Sparkles}>`) + current v1 `src/pages/thank-you.astro` line 17 (`<CheckCircle2 size={64} strokeWidth={2} />`).
**Apply to:** FAQ ChevronDown indicator + thank-you MailCheck icon.

```astro
---
import { ChevronDown } from '@lucide/astro';   // FAQ
import { MailCheck } from '@lucide/astro';     // thank-you
---

<!-- FAQ: aria-hidden because <summary> text carries the accessible name -->
<ChevronDown
  size={24}
  aria-hidden="true"
  class="shrink-0 transition-transform duration-200 ease-out group-open:rotate-180"
/>

<!-- thank-you: text-accent stroke (the ONE permitted text-accent use — icons are non-text per WCAG 1.4.3) -->
<MailCheck size={64} class="text-accent" aria-hidden="true" />
```

**Notes:**
- All Lucide icons in this phase carry `aria-hidden="true"` — accessible name lives in adjacent text (the `<summary>` for FAQ, the `<h1>` for thank-you).
- `class="text-accent"` on the MailCheck icon is the ONLY permitted text-accent application on these 3 pages — text-accent fails WCAG AA on text nodes (Phase 24 24-03 STATE entry).

### Pattern 5: Playwright + axe-core test scaffold

**Source:** `tests/accessibility/v2-primitives.spec.ts` lines 1-2, 18, 20-31 (canonical Phase 24 axe pattern) + `tests/accessibility/v2-layout.spec.ts` lines 1-2, 4, 6-11 (Phase 23 axe pattern).
**Apply to:** `tests/accessibility/v2-leaf-pages.spec.ts` — every axe-core test in the new spec follows this exact shape.

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('v2 Leaf Pages Accessibility (Phase 25)', () => {
  test('/some-route has zero axe-core violations (WCAG 2.2 AA)', async ({ page }) => {
    await page.goto('/some-route');
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });
});
```

**Notes:**
- `playwright.config.ts` `baseURL: 'http://localhost:4321'` already wired — `page.goto('/faq')` resolves to the dev server.
- `fullyParallel: true` is already set in `playwright.config.ts` — no `.serial` needed; tests in this spec run in parallel safely (no shared state).

---

## No Analog Found

**None.** Every file in this phase has at least one strong in-codebase analog:

| File | Analog status |
|------|---------------|
| `src/pages/faq.astro` | Composite analog: composition shape from `src/pages/design-system.astro` (shipped Phase 24); content from current v1 `src/pages/faq.astro` (verbatim per D-04). |
| `src/pages/thank-you.astro` | Composite analog: v2 primitives via `src/pages/design-system.astro`; copy + Calendly URL + container from current v1 `src/pages/thank-you.astro` (verbatim per D-16). |
| `src/pages/404.astro` (NEW) | Composition pattern from sibling `/thank-you` migration (this phase) + slot="head" noindex meta verbatim from `src/pages/design-system.astro` line 49. No 404 file pre-exists, but every primitive is shipped. |
| `tests/accessibility/v2-leaf-pages.spec.ts` (NEW) | Direct shape analog: `tests/accessibility/v2-primitives.spec.ts` Test 1 (axe full-page scan, lines 18-31) + `tests/accessibility/v2-layout.spec.ts` describe-block shape (lines 6-44). The JSON-LD parse assertion is composed from D-19 contract (no in-codebase precedent — first instance in this phase). |

The JSON-LD parse-and-assert test pattern is the only "new" pattern surface in this phase. Its mechanism is well-grounded: Playwright's `locator.textContent()` returns the inner text of the located element, which for `<script type="application/ld+json">` is the raw JSON string emitted by Astro's `set:html`. `JSON.parse(...)` + field assertions is standard JavaScript.

---

## Metadata

**Analog search scope:**
- `src/pages/` (4 files inspected: design-system.astro, faq.astro [v1 source], thank-you.astro [v1 source], 404.astro [non-existent — new])
- `src/layouts/v2/` (BaseLayout.astro inspected)
- `src/components/v2/ui/` (7 primitives discovered; Button.astro, Card.astro, CardBody.astro inspected for API shape)
- `tests/accessibility/` (4 spec files discovered; v2-primitives.spec.ts and v2-layout.spec.ts inspected for shape)

**Files scanned:** 9 (4 pages, 1 layout, 3 v2 ui primitives, 2 test specs).

**Reads performed:** 9 single-pass reads (no re-reads, no overlapping ranges). Every analog was read once in full or once with a targeted range.

**Pattern extraction date:** 2026-05-15

**Phase:** 25 — Leaf Page Migrations (FAQ, Thank-You, 404)
**Phase directory:** `.planning/phases/25-leaf-page-migrations-faq-thank-you-404`

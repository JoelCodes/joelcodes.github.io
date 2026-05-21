# Phase 25: Leaf Page Migrations (FAQ, Thank-You, 404) - Pattern Map

**Mapped:** 2026-05-21
**Files analyzed:** 6 (3 page rewrites/new, 1 new test, 1 workflow edit, 1 .pen edit)
**Analogs found:** 5 / 6 (the `.pen` edit uses Pencil MCP tools, not a file analog)

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/pages/faq.astro` (REWRITE) | page (static, content-heavy) | request-response (SSG) | `src/pages/blog/index.astro` (banner) + v1 `src/pages/faq.astro` (data + JSON-LD) | exact (composite — two analogs) |
| `src/pages/thank-you.astro` (REWRITE) | page (static, single-card confirmation) | request-response (SSG) | v1 `src/pages/thank-you.astro` (copy + icon) + `src/components/homepage/ContactSection.astro` line 214 (env-var pattern) | exact (composite — two analogs) |
| `src/pages/404.astro` (NEW) | page (system-state, recovery) | request-response (SSG, served on 404) | `src/components/v2/feature/BlogCard.astro` (anchor-wraps-Card) + `src/pages/design-system.astro` line 48 (`<meta slot="head">`) | role-match (composed from primitives) |
| `tests/accessibility/v2-leaf.spec.ts` (NEW) | test (e2e + a11y) | request-response | `tests/accessibility/v2-blog.spec.ts` | exact |
| `.github/workflows/deploy.yml` (MODIFY) | config (CI) | build-time env | existing `PUBLIC_N8N_WEBHOOK_URL` env line (36) | exact (sibling addition) |
| `design/design-system.pen` (MODIFY) | design source (binary, Pencil MCP) | not applicable | none — uses Pencil MCP `batch_design` per Phase 23 D-16 | n/a (tool-based, no code analog) |

---

## Pattern Assignments

### `src/pages/faq.astro` — REWRITE (page, request-response)

**Analog 1 (banner chrome):** `src/pages/blog/index.astro` lines 1–4, 27–44, 168–214
**Analog 2 (FAQ data + JSON-LD):** v1 `src/pages/faq.astro` lines 11–46, 62
**Component primitives:** Phase 24 `Button` (CTA)

**Imports pattern** (compose from `src/pages/blog/index.astro` lines 1–4 — strip v1 imports from v1 faq.astro):
```astro
---
import BaseLayout from '../layouts/v2/BaseLayout.astro';
import Button from '../components/v2/ui/Button.astro';
import { ChevronDown } from '@lucide/astro';
---
```

**FAQ data + JSON-LD pattern** (verbatim from v1 `src/pages/faq.astro` lines 11–46):
```typescript
const faqs = [
  { question: "How long does a typical project take?",
    answer: "Every project is different. Discovery and prototyping usually take 1-2 weeks, then we'll outline a timeline in the proposal based on scope." },
  { question: "Do you work with clients outside your area?",
    answer: "Absolutely. Most client communication happens over video calls and email. Location doesn't matter." },
  { question: "What if I'm not sure exactly what I need?",
    answer: "That's what discovery is for. We'll talk through your challenges and I'll help clarify what solution makes sense." },
  { question: "How do you handle changes during the project?",
    answer: "Small adjustments are normal. Larger scope changes are discussed together and may adjust the timeline or investment." },
  { question: "What happens after handover?",
    answer: "You get documentation and training. I'm available for questions and can provide ongoing support if needed." }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
  }))
};
```

**Page-header banner pattern** (verbatim from `src/pages/blog/index.astro` lines 32–44 — string swap "Blog"→"FAQ", drop subtitle):
```astro
<section class="page-hero">
  <div class="container mx-auto px-4 py-12 lg:py-16">
    <nav class="page-hero__breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li aria-hidden="true">/</li>
        <li aria-current="page">FAQ</li>
      </ol>
    </nav>
    <h1 class="page-hero__title">Frequently Asked Questions</h1>
  </div>
</section>
```

**Banner `<style>` pattern** (verbatim from `src/pages/blog/index.astro` lines 168–214 — rename class prefix `blog-hero` → `page-hero` since `/projects` index in Phase 27 will reuse):
```css
.page-hero {
  background-color: var(--color-surface-muted);
  border-bottom: 1px solid var(--color-border);
}
.page-hero__breadcrumbs ol {
  list-style: none; padding: 0; margin: 0 0 1rem 0;
  display: flex; gap: 0.5rem; justify-content: center;
  font-family: var(--font-text); font-size: 0.875rem;
  color: var(--color-text-muted);
}
.page-hero__breadcrumbs a { color: var(--color-text-muted); text-decoration: none; }
.page-hero__breadcrumbs a:hover { color: var(--color-primary); }
.page-hero__title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--color-primary);
  text-align: center;
  margin: 0 0 0.75rem 0;
}
```

**JSON-LD injection pattern** (verbatim from v1 `src/pages/faq.astro` line 62, adapted for v2 `<slot name="head">`):
```astro
<BaseLayout title="FAQ" description="Frequently asked questions about working with Joel Shinness">
  <script slot="head" type="application/ld+json" set:html={JSON.stringify(faqSchema)} />
  ...
</BaseLayout>
```

**Accordion divider-list pattern** (new — hand-authored per D-25-04/05/06; canonical recipe in 25-RESEARCH §Pattern 3):
```astro
{faqs.map(faq => (
  <details class="faq-row">
    <summary>
      <span class="faq-row__question">{faq.question}</span>
      <ChevronDown class="faq-row__chevron" size={20} aria-hidden="true" />
    </summary>
    <div class="faq-row__answer">{faq.answer}</div>
  </details>
))}

<style>
  .faq-row { border-bottom: 1px solid var(--color-border); }
  .faq-row:last-child { border-bottom: none; }
  .faq-row > summary {
    list-style: none;
    cursor: pointer;
    display: flex; align-items: center; justify-content: space-between;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) 0;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: var(--text-h3);
    color: var(--color-primary);
  }
  .faq-row > summary::-webkit-details-marker { display: none; }
  .faq-row > summary::marker { display: none; }
  .faq-row__chevron {
    color: var(--color-text-muted);
    transition: transform 200ms ease, color 200ms ease;
    flex-shrink: 0;
  }
  .faq-row[open] > summary .faq-row__chevron {
    transform: rotate(180deg);
    color: var(--color-primary);
  }
  .faq-row__answer {
    padding: 0 0 var(--spacing-md) 0;
    font-family: var(--font-text);
    font-size: var(--text-body);
    color: var(--color-text);
    line-height: var(--leading-text);
  }
  .faq-row > summary:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
</style>
```

**Bottom CTA banner pattern** (new — same banner-band treatment as top; Button primary CTA per D-25-02):
```astro
<section class="page-hero">
  <div class="container mx-auto px-4 py-12 lg:py-16 text-center">
    <h2 class="page-hero__title">Still have questions? Let&rsquo;s talk.</h2>
    <Button variant="primary" size="lg" href="/#contact">Get in touch</Button>
  </div>
</section>
```

**Anti-patterns to drop** (compared against v1 `src/pages/faq.astro` lines 49–94):
- Drop entire inline `<!doctype html><html><head>...</head><body>...</body></html>` boilerplate — `BaseLayout` (v2) owns it.
- Drop Google Fonts CDN `<link rel="preconnect">` + `<link rel="preload">` chain (v1 lines 64–82).
- Drop dark-mode FOUC `<script is:inline>` (v1 lines 84–92).
- Drop `body class="font-body bg-bg-light dark:bg-bg-dark ..."` (v1 line 94) — `BaseLayoutV2` body sets `font-text bg-surface text-text`.
- Drop v1 imports: `import Header`, `import Footer`, `import SEO` from v1 paths (v1 lines 3–5).
- Drop neobrutalist accordion chrome: `border-[3px] border-text-light dark:border-text-dark rounded p-4` (v1 line 105), the `+` symbol with `group-open:rotate-45` (v1 line 108), `border-t-[3px]` divider inside answer (v1 line 110).

---

### `src/pages/thank-you.astro` — REWRITE (page, request-response)

**Analog 1 (copy + icon import):** v1 `src/pages/thank-you.astro` lines 1–52
**Analog 2 (env-var pattern):** `src/components/homepage/ContactSection.astro` line 214
**Component primitives:** Phase 24 `Card`, `CardBody`, `Button`

**Imports pattern** (swap v1 paths to v2 + preserve `CheckCircle2`):
```astro
---
import BaseLayout from '../layouts/v2/BaseLayout.astro';
import Card from '../components/v2/ui/Card.astro';
import CardBody from '../components/v2/ui/CardBody.astro';
import Button from '../components/v2/ui/Button.astro';
import { CheckCircle2 } from '@lucide/astro';

const calendlyUrl = import.meta.env.PUBLIC_CALENDLY_URL || 'https://calendly.com/joelshinness';
---
```

**Env-var pattern** (verbatim from `src/components/homepage/ContactSection.astro` line 214 — re-keyed for Calendly):
```typescript
// Source line: `const webhookURL = import.meta.env.PUBLIC_N8N_WEBHOOK_URL || 'https://n8n.srv1313363.hstgr.cloud/webhook/contact-form';`
const calendlyUrl = import.meta.env.PUBLIC_CALENDLY_URL || 'https://calendly.com/joelshinness';
```

**Centered Card composition** (composed from v1 layout pattern + Phase 24 Card/CardBody primitives — see 25-RESEARCH Example 2 for full markup):
```astro
<BaseLayout title="Thanks!" description="Thank you for reaching out. I'll respond within 48 hours.">
  <div class="min-h-[70vh] flex items-center justify-center container mx-auto px-md">
    <Card elevated={true} class="max-w-2xl w-full">
      <CardBody class="flex flex-col items-center text-center gap-md px-lg py-xl">
        <CheckCircle2 size={64} strokeWidth={2} class="text-accent" aria-hidden="true" />
        <h1 class="font-display font-bold text-display text-text">
          Thanks for reaching out!
        </h1>
        <p class="font-text text-body text-text max-w-md">
          I&rsquo;ll email you within 48 hours with next steps. Looking forward to learning more about your project!
        </p>
        <Button variant="primary" size="lg" href={calendlyUrl} target="_blank" rel="noopener noreferrer">
          Skip the wait &mdash; book a call
        </Button>
        <a href="/" class="font-text text-small text-text-muted underline underline-offset-2 hover:text-accent transition-colors">
          Return to homepage
        </a>
      </CardBody>
    </Card>
  </div>
</BaseLayout>
```

**Anti-patterns to drop** (compared against v1 `src/pages/thank-you.astro`):
- `BaseLayout` v1 import (line 2) → swap to `../layouts/v2/BaseLayout.astro`.
- `Card` v1 import (line 3) → swap to v2 `Card` + `CardBody`.
- `Button` v1 import (line 4) → swap to v2.
- `title="Thanks! | Joel Shinness"` (line 9) → `title="Thanks!"` (SEO.astro line 30 appends the suffix; passing pre-suffixed string produces double-suffix per RESEARCH Pitfall 2).
- `Card variant="turquoise"` (line 13) → `<Card elevated={true}>`.
- `text-turquoise dark:text-turquoise-dark` (line 16) → `class="text-accent"` on the icon.
- `font-heading ... uppercase tracking-tight text-text-light dark:text-text-dark` (line 21) → `font-display font-bold text-display text-text` (drop `uppercase` per D-26-04 / D-25-09).
- `font-body text-lg text-text-light dark:text-text-dark` (line 26) → `font-text text-body text-text`.
- `Button variant="turquoise"` (line 33) → `Button variant="primary"`.
- Hardcoded Calendly URL (line 35) → `href={calendlyUrl}`.
- `text-sm text-text-muted-light dark:text-text-muted-dark hover:text-turquoise dark:hover:text-turquoise-dark` (line 45) → `text-small text-text-muted hover:text-accent`.
- `<style>{ .container { max-width: 1280px; } }` (lines 54–58) → DROP (redundant under v2 container utility).

---

### `src/pages/404.astro` — NEW (page, request-response)

**Analog 1 (anchor-wraps-Card pattern):** `src/components/v2/feature/BlogCard.astro` lines 29–67 + outer `<a>` style block (lines 73–89)
**Analog 2 (`<meta slot="head">` noindex pattern):** `src/pages/design-system.astro` line 48
**Component primitives:** Phase 24 `Card` (interactive), `CardBody`, `Button` (link variant)

**Imports pattern**:
```astro
---
import BaseLayout from '../layouts/v2/BaseLayout.astro';
import Card from '../components/v2/ui/Card.astro';
import CardBody from '../components/v2/ui/CardBody.astro';
import Button from '../components/v2/ui/Button.astro';

const destinations = [
  { href: '/',         label: 'Home',     desc: 'Back to the start.' },
  { href: '/projects', label: 'Projects', desc: "See work I've shipped." },
  { href: '/blog',     label: 'Blog',     desc: 'Read recent posts.' },
  { href: '/faq',      label: 'FAQ',      desc: 'Common questions, answered.' },
];
---
```

**noindex meta pattern** (verbatim from `src/pages/design-system.astro` line 48):
```astro
<BaseLayout title="Page not found" description="The page you're looking for has wandered off.">
  <meta slot="head" name="robots" content="noindex" />
  ...
</BaseLayout>
```

**Anchor-wraps-Card pattern** (verbatim from `src/components/v2/feature/BlogCard.astro` lines 29–67 with own outer `<a>` styles):
```astro
{destinations.map(d => (
  <a href={d.href} class="dest-card" aria-label={`Go to ${d.label}`}>
    <Card>
      <CardBody>
        <h3 class="font-display font-bold text-h3 text-text">{d.label}</h3>
        <p class="font-text text-small text-text-muted mt-xs">{d.desc}</p>
      </CardBody>
    </Card>
  </a>
))}
```

**Critical:** Per BlogCard CR-02 (lines 73–89 of `BlogCard.astro`), the inner Card does NOT use `interactive={true}` — that would create double-tabindex. The outer `<a>` owns both the focus ring and hover-lift:

```css
/* From BlogCard.astro lines 73–89, adapted for .dest-card */
.dest-card {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 200ms ease;
}
.dest-card:hover {
  transform: translateY(-2px);
}
.dest-card:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 0.5rem; /* match Card's rounded-lg */
}
```

**Note on UI-SPEC vs BlogCard discrepancy:** UI-SPEC line 222–223 says `interactive={true}` and 25-RESEARCH Open Question 4 flags double-focus risk. **The shipped BlogCard pattern (post-CR-02) has already resolved this by dropping `interactive` from the inner Card.** Planner should follow the BlogCard precedent (no `interactive` on inner Card; outer `<a>` carries hover-lift + focus ring) — this is the proven pattern.

**Hero numeral + tagline pattern** (new — per D-25-14):
```astro
<section class="mt-2xl text-center">
  <h1 class="font-display font-bold text-8xl md:text-9xl text-primary leading-none">404</h1>
  <h2 class="mt-md font-display font-bold text-h2 text-text">This page wandered off.</h2>
</section>
```

**Contact CTA — Button link variant** (per D-25-16; the `ArrowRight` icon auto-renders from `Button.astro` lines 31–35 default):
```astro
<div class="mt-xl mb-2xl text-center">
  <Button variant="link" href="/#contact">Or get in touch</Button>
</div>
```

---

### `tests/accessibility/v2-leaf.spec.ts` — NEW (test, request-response)

**Analog:** `tests/accessibility/v2-blog.spec.ts` (lines 1–4 setup + lines 59–117 v2 index page suite)

**Imports + wcagTags constant** (verbatim from `tests/accessibility/v2-blog.spec.ts` lines 1–4):
```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
```

**Per-route smoke + axe pattern** (verbatim from `tests/accessibility/v2-blog.spec.ts` lines 63–73):
```typescript
test('/faq renders on BaseLayoutV2 with zero axe violations', async ({ page }) => {
  await page.goto('/faq');
  const h1 = page.locator('h1');
  await expect(h1).toContainText('Frequently Asked Questions');
  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
  expect(results.violations).toEqual([]);
});
```

**Test categories required** (from 25-VALIDATION matrix; full scaffolds in 25-RESEARCH Example 4):
- Category A — `/faq`: render, JSON-LD shape (5 questions, `@type === 'FAQPage'`), keyboard accordion toggle, chevron rotation, CTA href `/#contact`
- Category B — `/thank-you`: render, copy preservation, no-uppercase check (D-25-09), Calendly href + `target="_blank"`, secondary link `href="/"`
- Category C — `/404`: render (h1 "404" + h2 tagline), 4 destination hrefs in declared order, noindex meta present, link-variant Button with auto-`ArrowRight` SVG

**Note on locator nuance** — Blog test uses `page.locator('h1')` + `toContainText`. For `/404` where h1 is just "404", prefer:
```typescript
await expect(page.locator('h1')).toContainText('404');
await expect(page.locator('h2')).toContainText('wandered off');
```

---

### `.github/workflows/deploy.yml` — MODIFY (config, build-time env)

**Analog:** existing `PUBLIC_N8N_WEBHOOK_URL` line at `.github/workflows/deploy.yml` line 36

**Sibling addition pattern** (insert directly under line 36):
```yaml
# Current state (lines 33–36):
      - name: Build site
        run: npm run build
        env:
          PUBLIC_N8N_WEBHOOK_URL: ${{ secrets.PUBLIC_N8N_WEBHOOK_URL }}

# Target state (line 37 added):
      - name: Build site
        run: npm run build
        env:
          PUBLIC_N8N_WEBHOOK_URL: ${{ secrets.PUBLIC_N8N_WEBHOOK_URL }}
          PUBLIC_CALENDLY_URL: ${{ secrets.PUBLIC_CALENDLY_URL }}
```

**No other workflow files require changes** (verified: only `deploy.yml` has a build-step env block; no `pr-preview.yml` build-env exists with relevant secrets).

---

### `design/design-system.pen` — MODIFY (design source, Pencil MCP)

**Tool:** Pencil MCP (`batch_design`, `find_empty_space_on_canvas`, `snapshot_layout`, etc.). Do NOT use `Read` or `Grep` on `.pen` files — they are encrypted.

**Required additions per D-25-22:**
1. `/404` page frame (numeral "404" + tagline "This page wandered off." + 2×2 destination Card grid + "Or get in touch" link Button)
2. FAQ accordion-row variant (one borderless row showing summary + chevron + open-state answer body)

**Workflow:**
1. `pencil__open_document` → load `design/design-system.pen`
2. `pencil__find_empty_space_on_canvas` → locate insertion point
3. `pencil__batch_design` → create frames per Phase 23 D-16 (grow .pen lockstep with shipped code)
4. `pencil__snapshot_layout` → verify layout
5. End-of-phase consolidation acceptable per 25-RESEARCH Open Question 3

**No file-content code excerpt applies — this is a tool-driven design-source edit.**

---

## Shared Patterns

### Pattern 1: BaseLayoutV2 Consumption

**Source:** `src/layouts/v2/BaseLayout.astro` (props lines 8–13; head slot line 29)

**Apply to:** All three pages (`/faq`, `/thank-you`, `/404`)

```astro
// BaseLayout (v2) accepts:
interface Props {
  title: string;             // SEO.astro auto-appends ' | Joel Shinness' — pass BARE titles
  description?: string;      // defaults to 'Web apps, automation, and AI development for small businesses'
}
// Exposes <slot name="head" /> on line 29 for per-page meta/script additions.
```

**CRITICAL — title-suffix bug (RESEARCH Pitfall 2):** SEO.astro line 30 (`const fullTitle = \`${title} | ${SITE_NAME}\`;`) auto-appends. Pass bare:
- `/faq` → `title="FAQ"` (NOT `"FAQ | Joel Shinness"`)
- `/thank-you` → `title="Thanks!"` (NOT `"Thanks! | Joel Shinness"`)
- `/404` → `title="Page not found"` (NOT `"Page not found · Joel Shinness"`)

### Pattern 2: Focus-Ring (Phase 24 D-18)

**Source:** `src/components/v2/ui/Button.astro` lines 72–78; `Card.astro` lines 30–35; `BlogCard.astro` lines 84–89

**Apply to:** Every interactive surface on every page (Buttons, summary rows, dest-card anchors, breadcrumb anchors, secondary links)

```css
/* The canonical focus-ring CSS — appears in Button, Card, BlogCard, faq-row, dest-card */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

### Pattern 3: Token-Driven Styling (Phase 23 D-19)

**Source:** `src/styles/v2/global.css` `@theme` block

**Apply to:** All inline `<style>` blocks on all three pages. NO v1 token references (`text-turquoise`, `bg-bg-light`, `font-heading`, etc.) — grep-gated by `tests/check-token-collision.cjs`.

Use:
- Colors: `--color-primary`, `--color-text`, `--color-text-muted`, `--color-surface`, `--color-surface-muted`, `--color-accent`, `--color-border`
- Typography: `--font-display`, `--font-text`, `--text-display`, `--text-h2`, `--text-h3`, `--text-body`, `--text-small`, `--leading-text`, `--leading-display`
- Spacing: `--spacing-xs/sm/md/lg/xl/2xl`
- Or equivalent Tailwind v4 utilities (`text-text`, `bg-surface-muted`, `font-display`, `text-h2`, `px-md`, etc.) generated from the `@theme` block.

### Pattern 4: Env-Var with Placeholder Fallback

**Source:** `src/components/homepage/ContactSection.astro` line 214

**Apply to:** `/thank-you` (Calendly URL only — no other Phase 25 page uses env vars)

```typescript
const X = import.meta.env.PUBLIC_VARNAME || 'placeholder-value';
```

Astro 5 inlines `PUBLIC_*` env vars at build time (no runtime lookup). Fallback fires silently when env var is unset in CI — this is intentional for local dev; Phase 28 gates `PUBLIC_N8N_WEBHOOK_URL` as required, `PUBLIC_CALENDLY_URL` is NOT gated in Phase 25 (deployment-owner action).

### Pattern 5: Anti-Patterns Applied Across All Three Pages

**Apply to:** `/faq`, `/thank-you`, `/404` (REWRITES strip these from v1; `/404` never introduces them):

- NO `dark:` Tailwind utilities anywhere (Phase 23 D-22 light-mode-only invariant)
- NO `prefers-color-scheme`, `.dark` selectors, or `localStorage.theme` FOUC scripts
- NO Google Fonts CDN `<link>` tags (BaseLayoutV2 self-hosts via `@fontsource-variable`)
- NO `uppercase` text-transform on h1/h2/h3 (Phase 26 D-26-04)
- NO v1 imports: `src/components/ui/`, `src/components/layout/`, `src/layouts/BaseLayout.astro`
- NO v1 token classes (`text-turquoise`, `font-heading`, `font-body`, `bg-bg-light`, `text-text-light`, etc.)
- NO `outline: none` anywhere (focus rings required on every interactive surface)
- NO pre-suffixed `title` props to BaseLayoutV2 (SEO.astro double-suffixes)

---

## No Analog Found

Files with no close match in the codebase:

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `design/design-system.pen` (MODIFY) | design source | n/a | `.pen` files are encrypted; edited only via Pencil MCP tool API, not file system. No code analog applies. |

The `404.astro` divider-list accordion CSS recipe (suppressing `::-webkit-details-marker` + `::marker`) and the page-header banner are both verified in shipped code — listed under role-match in the classification table, not no-analog.

---

## Metadata

**Analog search scope:** `src/pages/`, `src/components/v2/`, `src/layouts/v2/`, `src/styles/v2/`, `tests/accessibility/`, `.github/workflows/`
**Files scanned (Read):** 11 (3 phase docs + 8 source/test/config files)
**Pattern extraction date:** 2026-05-21

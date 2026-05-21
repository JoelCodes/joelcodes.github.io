# Phase 25: Leaf Page Migrations (FAQ, Thank-You, 404) - Research

**Researched:** 2026-05-21
**Domain:** Astro 5 page authoring + v2 BaseLayout migration + native accordion + JSON-LD preservation + axe-core / Lighthouse validation
**Confidence:** HIGH (all critical claims verified against in-repo source; LOW only where flagged inline)

## Summary

Phase 25 is a tightly-scoped page migration. Every visual decision is already locked by 25-CONTEXT.md (D-25-01..D-25-22) and 25-UI-SPEC.md; every primitive API is already locked by Phase 24 (verified by direct read of `src/components/v2/ui/{Button,Card,CardBody}.astro`). The only unknowns the planner needs surfaced are (a) the exact implementation patterns to copy from the existing `/blog` index and `/design-system` pages, (b) the `<details>/<summary>` chevron + marker-hiding recipe that Tailwind v4 does NOT ship by default, (c) the `<meta slot="head">` syntax for the `noindex` directive on `/404`, and (d) the env-var-with-fallback wiring proven by `ContactSection.astro`.

The single non-trivial technical risk is the **Card composition pattern mismatch**: 25-UI-SPEC.md repeatedly references "Card polymorphic per Phase 24 D-05" for `/404` destination cards, but the actual `src/components/v2/ui/Card.astro` does NOT accept an `href` prop — it renders a `<div tabindex={0}>` when `interactive=true`. The verified pattern (read directly from `src/components/v2/feature/BlogCard.astro` lines 28–30) is **`<a href={...} class="..."> <Card interactive={true}> ... </Card> </a>`** — outer anchor wraps the Card. The planner MUST use this pattern, not pass `href` to `<Card>`.

**Primary recommendation:** Plan 25-01 = `/faq` (banner + accordion + CTA banner, three distinct CSS pieces, JSON-LD preserved). Plan 25-02 = `/thank-you` (single-card migration, env-var wiring) + `/404` (new file, hero + 2×2 grid, `<meta slot="head">` noindex). Both plans copy markup verbatim from `src/pages/blog/index.astro` (banner CSS) and `src/components/v2/feature/BlogCard.astro` (anchor-wraps-Card). Single new test file `tests/accessibility/v2-leaf.spec.ts` covers all three routes with the existing axe-core invocation pattern.

## Standard Stack

### Core (already installed — verified in `package.json`)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `astro` | ^5.16.15 | SSG framework | Project framework; `/404.astro` convention auto-builds to `404.html` and is served by GitHub Pages on missing routes |
| `@astrojs/mdx` | ^4.3.13 | MDX support | Already used by /blog; irrelevant to /faq /thank-you /404 |
| `tailwindcss` | ^4.1.18 | Styling | v4 `@theme` tokens defined in `src/styles/v2/global.css`; utility classes drive almost all styling |
| `@tailwindcss/vite` | ^4.1.18 | Tailwind v4 plugin | Already wired in `astro.config.mjs` |
| `@lucide/astro` | ^0.563.0 | Icons | `CheckCircle2` (thank-you), `ChevronDown` (FAQ), `ArrowRight` (auto-rendered by Button `link` variant on /404). Already in use across v2 primitives |
| `@fontsource-variable/plus-jakarta-sans` | ^5.2.8 | Display font | Self-hosted; BaseLayoutV2 preloads it (line 25 of `src/layouts/v2/BaseLayout.astro`) |
| `@fontsource-variable/inter` | ^5.2.8 | Body font | Self-hosted; imported by `src/styles/v2/global.css` line 2 |

### Testing (already installed — verified in `package.json`)

| Library | Version | Purpose |
|---------|---------|---------|
| `@playwright/test` | ^1.58.2 | e2e + a11y harness |
| `@axe-core/playwright` | ^4.11.1 | WCAG 2.x AA validation |

### Alternatives Considered (and rejected — covered by 25-CONTEXT.md / 25-UI-SPEC.md)

| Instead of | Could Use | Why Rejected |
|------------|-----------|--------------|
| Native `<details>/<summary>` | Headless UI / Radix accordion | React-only; project explicitly excludes `@astrojs/react` (REQUIREMENTS Out of Scope). D-25-03 locks native markup |
| Custom v2 Accordion primitive | New `src/components/v2/ui/Accordion.astro` | Single consumer (`/faq`); violates "build primitives when more than one consumer exists" rule (D-25-20, Phase 24 D-21 precedent) |
| `@tailwindcss/typography` plugin | Prose plugin for FAQ answer styling | REQUIREMENTS Out of Scope; conflicts with agency aesthetic. Phase 26 D-26-01 already ports the prose ruleset manually |
| GSAP / Motion for accordion animation | JS-driven height transition | JS weight conflicts with Lighthouse perf budget; CSS-only `interpolate-size` not stable enough across browsers (D-25 Claude's Discretion accepts instant open/close) |

**Installation:** No new packages. Phase 25 ships zero `npm install` operations.

## Architecture Patterns

### Project File Structure (changes for this phase)

```
src/
├── pages/
│   ├── faq.astro              # REWRITTEN in place (was 121 lines / v1; ~150 lines / v2 expected)
│   ├── thank-you.astro        # REWRITTEN in place (was 58 lines / v1; ~50 lines / v2 expected)
│   └── 404.astro              # NEW (Astro auto-routing convention; ~80 lines expected)
├── layouts/v2/BaseLayout.astro      # already exists — wraps every Phase 25 page
├── components/v2/
│   ├── ui/{Button,Card,CardBody}.astro    # already exist — consumed unchanged
│   └── layout/{Header,Footer,MobileNav}.astro  # already exist — auto-included by BaseLayoutV2
└── styles/v2/global.css        # already exists — zero new tokens added (per CONTEXT)

tests/accessibility/
└── v2-leaf.spec.ts             # NEW (a11y + content assertions for /faq /thank-you /404)

.github/workflows/
└── deploy.yml                  # MODIFIED — add PUBLIC_CALENDLY_URL env line (sibling to line 36)

design/
└── design-system.pen           # EXTENDED — /404 page frame + FAQ accordion-row variant (D-25-22, Pencil MCP only)
```

### Pattern 1: BaseLayoutV2 Consumption (locked — verified at `src/layouts/v2/BaseLayout.astro`)

**Props the layout accepts:** `title: string` (required), `description?: string` (defaults to site description).

**Head slot mechanics:** Line 29 of BaseLayoutV2 exposes `<slot name="head" />`. Per-page additions to `<head>` use the `slot="head"` attribute directly on the element — NOT a `<Fragment>` wrapper. Verified in `src/pages/design-system.astro` line 48:

```astro
<BaseLayout title="..." description="...">
  <meta slot="head" name="robots" content="noindex, follow" />
  <!-- ...page content... -->
</BaseLayout>
```

**Title pattern (CRITICAL — title-suffix bug in repo):** `BaseLayoutV2` passes `title` directly into `SEO.astro`, which **appends ` | Joel Shinness`** automatically (line 30 of `src/components/SEO.astro`: `const fullTitle = \`${title} | ${SITE_NAME}\`;`). Therefore:

- ✅ CORRECT (verified in `src/pages/blog/[slug].astro` line 45): `title={post.data.title}` → renders `"My Post | Joel Shinness"`
- ❌ DOUBLE-SUFFIX (existing repo bug — `src/pages/blog/index.astro` line 28, `src/pages/thank-you.astro` line 9, `src/pages/design-system.astro` line 45): `title="Blog | Joel Shinness"` → renders `"Blog | Joel Shinness | Joel Shinness"`

The 25-UI-SPEC.md Copywriting Contract specifies `<title>` strings WITH the `| Joel Shinness` suffix already included. **Planner must reconcile this in Plan 25-01 / 25-02:** either (a) match the existing buggy pattern (pass title with suffix, accept double-suffix in `<title>` element output to match `/blog`/`/design-system`/v1 `/thank-you`), or (b) fix-as-you-touch (pass title WITHOUT suffix, accept that the rendered `<title>` differs from v1 by one fewer suffix). **Recommendation: fix-as-you-touch** because the v1 `/faq` used the SEO component correctly (passed bare `title = 'FAQ'`, line 7) — Phase 25 should preserve that correctness, not regress it. Flag explicitly in the plan so it's not a surprise.

### Pattern 2: Page-Header Banner (verbatim copy from `src/pages/blog/index.astro` lines 32–44 + 168–214)

```astro
<!-- D-25-01: Crito-faithful banner. Copy verbatim, swap "Blog"→"FAQ" -->
<section class="blog-hero">
  <div class="container mx-auto px-4 py-12 lg:py-16">
    <nav class="blog-hero__breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li aria-hidden="true">/</li>
        <li aria-current="page">FAQ</li>
      </ol>
    </nav>
    <h1 class="blog-hero__title">Frequently Asked Questions</h1>
  </div>
</section>

<style>
  .blog-hero {
    background-color: var(--color-surface-muted);
    border-bottom: 1px solid var(--color-border);
  }
  .blog-hero__breadcrumbs ol {
    list-style: none; padding: 0; margin: 0 0 1rem 0;
    display: flex; gap: 0.5rem; justify-content: center;
    font-family: var(--font-text); font-size: 0.875rem;
    color: var(--color-text-muted);
  }
  .blog-hero__breadcrumbs a { color: var(--color-text-muted); text-decoration: none; }
  .blog-hero__breadcrumbs a:hover { color: var(--color-primary); }
  .blog-hero__title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700; color: var(--color-primary);
    text-align: center; margin: 0 0 0.75rem 0;
  }
</style>
```

**Rename note:** The class name `blog-hero` is technically scoped (Astro auto-scopes `<style>` blocks per-file). The planner may keep the class name as-is for consistency with `/blog/tags/[tag].astro` (which also uses `blog-hero`), or rename to `page-hero` / `faq-hero`. Either is fine — Astro's class-scoping means there is no global collision. Prefer `page-hero` if the plan intends to reuse the chrome for `/projects` (Phase 27).

UI-SPEC notes the breadcrumb separator should be `›` (U+203A), but `src/pages/blog/index.astro` uses `/` literally. Either matches "Crito-faithful" — but for visual consistency with the existing rendered `/blog` page, **use `/`** to avoid a per-page divergence. (D-26-08 specifies `›` in the abstract; the implementation chose `/`. Pencil mirror should follow shipped code.)

### Pattern 3: `<details>/<summary>` Accordion (HAND-AUTHORED in Plan 25-01)

**Critical Tailwind v4 gap:** Tailwind v4 does NOT reset the default `<summary>` disclosure marker (verified via `tailwindlabs/tailwindcss` Discussion #13614). Two marker sources must be suppressed:

1. The standard `list-style` marker (Firefox, modern Chrome).
2. The WebKit `::-webkit-details-marker` pseudo-element (Safari, older Chrome).

**Recipe (locked baseline, paste-ready):**

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
  /* D-25-04: divider-list, no Card per row */
  .faq-row {
    border-bottom: 1px solid var(--color-border);
  }
  .faq-row:last-child { border-bottom: none; }

  /* Hide both marker variants (Firefox + WebKit) */
  .faq-row > summary {
    list-style: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) 0;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: var(--text-h3);
    color: var(--color-primary);
  }
  .faq-row > summary::-webkit-details-marker { display: none; }
  .faq-row > summary::marker { display: none; } /* Firefox fallback when list-style:none isn't honored on summary */

  /* D-25-05: chevron rotation + color */
  .faq-row__chevron {
    color: var(--color-text-muted);
    transition: transform 200ms ease, color 200ms ease;
    flex-shrink: 0;
  }
  .faq-row[open] > summary .faq-row__chevron {
    transform: rotate(180deg);
    color: var(--color-primary);
  }

  /* D-25-06: open-state answer wrapper */
  .faq-row__answer {
    padding: 0 0 var(--spacing-md) 0;
    font-family: var(--font-text);
    font-size: var(--text-body);
    color: var(--color-text);
    line-height: var(--leading-text);
  }

  /* D-18 focus ring */
  .faq-row > summary:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
</style>
```

**Accessibility (verified against axe-core 4.10 rule list):**
- Native `<details>` auto-exposes `aria-expanded`; screen readers announce "collapsed/expanded" — no extra ARIA wiring needed.
- `<summary>` is keyboard-focusable by default (Enter / Space toggle).
- The Lucide `ChevronDown` icon component is decorative — mark `aria-hidden="true"`. The text inside the `<span class="faq-row__question">` carries the accessible name.
- `cursor: pointer` on `<summary>` is a UX nicety; not required for a11y.

**Pencil mirror note (D-25-22):** Add an FAQ accordion-row variant (closed + open state) to `design/design-system.pen` via Pencil MCP. End-of-phase consolidation acceptable.

### Pattern 4: Anchor-Wraps-Card (verified in `src/components/v2/feature/BlogCard.astro` line 28)

**The 25-UI-SPEC.md says "Card polymorphic per Phase 24 D-05" — but `src/components/v2/ui/Card.astro` does NOT take an `href` prop.** The card renders as `<div tabindex={interactive ? 0 : undefined}>`. The verified pattern (from shipped Phase 26 code) is:

```astro
<!-- Outer <a> carries the destination; Card carries the chrome -->
<a href="/projects" class="dest-card" aria-label="Go to Projects">
  <Card interactive={true}>
    <CardBody>
      <h3 class="dest-card__label">Projects</h3>
      <p class="dest-card__desc">See work I've shipped.</p>
    </CardBody>
  </Card>
</a>
```

**Why this works:**
- The `<a>` makes the whole card area a click target.
- `Card interactive={true}` adds `tabindex=0`, hover-lift (`hover:-translate-y-0.5`), and the accent focus ring CSS.
- Both the `<a>` and the inner `<div>` are focusable; this is benign (the `<a>` is the semantic affordance, the Card's tabindex provides the visual focus ring).

**Plan-level decision required:** The double-focusable element (a + tabindex div) is a minor a11y consideration. The shipped `BlogCard.astro` precedent says this is acceptable. If the planner wants a cleaner tab order on `/404`, they MAY set `interactive={false}` on the wrapped Card and add equivalent hover/focus styles to the outer `<a>` directly — but the BlogCard pattern is the proven choice and matches D-25-15. Recommend: **match the BlogCard pattern verbatim** on `/404` destination cards.

### Pattern 5: Env-Var with Placeholder Fallback (verified in `src/components/homepage/ContactSection.astro` line 214)

```astro
---
// D-25-11: Calendly URL — env var with placeholder fallback
const calendlyUrl = import.meta.env.PUBLIC_CALENDLY_URL || 'https://calendly.com/joelshinness';
---

<Button
  variant="primary"
  size="lg"
  href={calendlyUrl}
  target="_blank"
  rel="noopener noreferrer"
>
  Skip the wait — book a call
</Button>
```

**Astro 5 env-var semantics (verified at <https://docs.astro.build/en/guides/environment-variables/>):**
- `PUBLIC_*` prefix is required for `import.meta.env` to expose the variable to client-side AND server-side code (without prefix, only server-side).
- Astro 5.1.3+ has known regressions on non-PUBLIC vars; PUBLIC vars are unaffected — verified working in repo via `ContactSection.astro`.
- The variable is **inlined at build time** by Vite; the runtime `<a href={...}>` carries the resolved string, NOT a runtime lookup.
- In `npm run dev` (no env file present, no env var set), `import.meta.env.PUBLIC_CALENDLY_URL` is `undefined` → falsy → fallback `'https://calendly.com/joelshinness'` is used. Verified pattern.
- In GitHub Actions build with `PUBLIC_CALENDLY_URL` unset in env block, the same fallback applies — silently (matches the `PUBLIC_N8N_WEBHOOK_URL` behavior already documented in `PITFALLS.md`).

**CI wiring required (D-25-11, ROADMAP cross-ref Phase 28 success criterion #4):** Add one line under `env:` in `.github/workflows/deploy.yml` at line 36:

```yaml
env:
  PUBLIC_N8N_WEBHOOK_URL: ${{ secrets.PUBLIC_N8N_WEBHOOK_URL }}
  PUBLIC_CALENDLY_URL: ${{ secrets.PUBLIC_CALENDLY_URL }}
```

The actual Calendly URL value being set in GitHub Secrets is a Joel-action (one of the three `STATE.md > Pending Todos`), not a Phase 25 code deliverable. Planner should ship the workflow change but not gate the phase on the secret existing.

### Pattern 6: JSON-LD Preservation (verbatim from v1 `/faq` lines 34–46 + 62)

```astro
---
const faqs = [
  { question: "...", answer: "..." },
  // ...4 more entries verbatim from v1 lines 11–32...
];

// FAQPage JSON-LD schema — preserved verbatim from v1 (D-25-21)
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
---

<BaseLayout title="FAQ" description="...">
  <script slot="head" type="application/ld+json" set:html={JSON.stringify(faqSchema)} />
  <!-- ...page body... -->
</BaseLayout>
```

**Validation tools (for QUAL-07 audit in Phase 30, but worth setting up during 25-01):**
- **Schema.org Validator** (generic): <https://validator.schema.org/> — accepts pasted JSON-LD; validates structure against schema.org definitions.
- **Google Rich Results Test**: <https://search.google.com/test/rich-results> — Google-specific; FAQ rich results were deprecated May 2026 (the `FAQPage` type is still a valid markup; only the SERP rich-result feature was removed). Validation still works for structural correctness.
- **Inline build-time check** (recommended for the plan): the existing pattern in v1 uses `JSON.stringify(faqSchema)` inside `set:html` — this is parser-safe Astro and prevents `</script>` injection. No additional escaping needed. The Plan 25-01 verification step is to (1) build the page, (2) view-source on `dist/faq/index.html`, (3) confirm the `<script type="application/ld+json">` block exists with all 5 questions, (4) optionally paste into Schema.org Validator.

### Anti-Patterns to Avoid (in this phase specifically)

- **`<a>` inside `<a>` inside Card** — flat tags only. `/404` destination cards wrap the WHOLE Card in `<a>`; do NOT also put `<a>` tags inside CardBody.
- **`outline: none` anywhere** — Phase 24 D-18 / D-25 keyboard contract require focus rings on every interactive surface.
- **Passing pre-suffixed title to BaseLayoutV2** — the SEO component appends ` | Joel Shinness` automatically (see Pattern 1 title note).
- **Importing v1 components** (`src/components/ui/{Card,Button}.astro`, `src/components/layout/{Header,Footer}.astro`, `src/layouts/BaseLayout.astro`) — verified all v1 imports must be dropped from `/faq` and `/thank-you` during rewrite. `/404` is new and never imports them.
- **`dark:` Tailwind utilities, `prefers-color-scheme`, `.dark` selectors** — Phase 23 D-22 light-mode-only invariant. v1 `/faq` is full of these; strip every one during the rewrite.
- **FOUC script (`document.documentElement.classList.toggle('dark', ...)`)** — v1 `/faq` lines 84–92. Drop entirely; `BaseLayoutV2` does not include it.
- **Google Fonts CDN `<link>` tags** — v1 `/faq` lines 64–82. Drop; `BaseLayoutV2` self-hosts via `@fontsource-variable`.
- **`uppercase` text-transform on h1** — v1 `/thank-you` line 21 has `uppercase`. Drop per D-26-04 / D-25-09.
- **`text-turquoise` and `text-bg-light` v1 token classes** — drop; v2 uses `--color-accent`, `--color-surface`, etc.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Accordion expand/collapse logic | Custom JS click-handler + ARIA state machine | Native `<details>/<summary>` | Built-in keyboard a11y, focus, `aria-expanded` exposure — zero JS, zero bugs |
| Disclosure-marker hiding | Setting `display: none` on `<summary>` | `list-style: none` + `::-webkit-details-marker { display: none; }` + `::marker { display: none; }` | `display: none` on `<summary>` breaks the disclosure semantic; the three-line CSS recipe is the standard pattern |
| Chevron rotation animation | JS toggling a class on click | CSS `details[open] > summary .chevron { transform: rotate(180deg); }` | The browser sets the `open` attribute natively; CSS selector picks it up instantly. Zero JS |
| Page-header banner | New `<PageHeader>` component | Inline `<section class="...">` + scoped `<style>` (matches `/blog/index.astro`) | Single consumer (`/faq`) in Phase 25; `/projects` index in Phase 27 will be the second consumer that justifies factoring. Premature abstraction violates Phase 24 D-21 deferral rule |
| 404-page click navigation | Custom JS router fallback | Astro `src/pages/404.astro` → built `404.html` → GitHub Pages auto-serve | Web platform convention; verified at <https://docs.astro.build/en/basics/astro-pages/> |
| Calendly URL hardcoding | Inline `'https://calendly.com/...'` literal | `import.meta.env.PUBLIC_CALENDLY_URL \|\| fallback` | Deployment-time configurability without rebuild; pattern proven by `PUBLIC_N8N_WEBHOOK_URL` |
| FAQPage JSON-LD generation | Custom schema string concatenation | `JSON.stringify(faqSchema)` + `set:html` | Astro's recommended pattern (already shipped in v1 `/faq` line 62); parser-safe; no `</script>` injection risk |
| `noindex` meta on `/404` | New `BaseLayoutV2` prop `noindex={boolean}` | `<meta slot="head" name="robots" content="noindex">` | Single consumer of `noindex` (besides `/design-system`); existing `<slot name="head" />` pattern handles it without new layout API |

**Key insight:** Phase 25 is a composition phase. Every primitive (`Card`, `CardBody`, `Button`, `BaseLayoutV2`, `Header`, `Footer`) ships from Phase 23/24. Every pattern (banner, anchor-wraps-Card, env-var fallback, JSON-LD) ships from Phase 26 or earlier. The only NEW code is the `<details>/<summary>` divider-list styling on `/faq` and the `/404` page layout. Everything else is copy-paste-and-rename from an existing shipped file.

## Common Pitfalls

### Pitfall 1: WebKit details-marker leaks on Safari

**What goes wrong:** Without the `::-webkit-details-marker` reset, Safari and older Chromium render a small disclosure triangle (▶) inside `<summary>` even when `list-style: none` is set. The triangle competes visually with the ChevronDown icon and breaks the divider-list aesthetic.
**Why it happens:** WebKit uses a non-standard pseudo-element for the marker that pre-dates the CSS standard. `list-style: none` only addresses the standard marker; WebKit ignores it.
**How to avoid:** Always include both rules:
```css
summary { list-style: none; }
summary::-webkit-details-marker { display: none; }
```
Some refs also recommend `::marker { display: none; }` as a Firefox fallback — include it defensively (it's a no-op where unsupported).
**Warning signs:** Manual test on Safari (or `playwright --project=webkit` if added later); search the rendered DOM for a `summary::before` or visible triangle. The shipped Pattern 3 recipe handles this.

### Pitfall 2: `<title>` double-suffix from BaseLayoutV2 + SEO interaction

**What goes wrong:** Passing `title="Thanks! | Joel Shinness"` to `BaseLayoutV2` produces `<title>Thanks! | Joel Shinness | Joel Shinness</title>`. The `SEO.astro` component (line 30) blindly appends ` | Joel Shinness` to whatever it receives.
**Why it happens:** Inconsistent enforcement in the repo. The v1 `/faq` correctly passed `title = 'FAQ'`; v1 `/thank-you` passed `title="Thanks! | Joel Shinness"` (already-suffixed); shipped `/blog/index.astro` does the same.
**How to avoid:** Pass bare titles (`'FAQ'`, `'Thanks!'`, `'Page not found'`) to `BaseLayoutV2`. The SEO component appends the suffix.
**Warning signs:** After build, search `dist/faq/index.html` for `<title>`. If it contains `| Joel Shinness | Joel Shinness`, fix the page source. Recommended fix-as-you-touch in 25-01/25-02. The UI-SPEC Copywriting Contract specifies `<title>` strings WITH the suffix (e.g. `"FAQ | Joel Shinness"`) — this is the FINAL rendered string after SEO's auto-append, NOT the raw value to pass into BaseLayoutV2. Treat UI-SPEC titles as the expected `<title>` output, not the prop value.

### Pitfall 3: Card href doesn't exist on the v2 Card primitive

**What goes wrong:** Planner writes `<Card interactive href="/blog">` expecting polymorphic rendering (as Button has). Astro silently ignores unknown props on the `<div>` element (or warns; depends on the rest path). The card renders but is not navigable.
**Why it happens:** `Card.astro` line 17 renders a `<div>`, not a polymorphic tag. The `...rest` spread passes `href` to the `<div>`, which is invalid HTML and a no-op.
**How to avoid:** Wrap the Card in an outer `<a href="...">` (verified pattern in `BlogCard.astro` line 28).
**Warning signs:** Click the destination card in `npm run dev`; if it doesn't navigate, you've passed `href` to `<Card>` instead of an outer `<a>`.

### Pitfall 4: Astro 5 + GitHub Pages 404 routing edge cases

**What goes wrong:**
1. `astro build` produces `dist/404.html` (verified at <https://docs.astro.build/en/basics/astro-pages/>) — GitHub Pages auto-serves this on missing routes. Works.
2. **However:** in `astro dev`, hitting an undefined route shows Astro's built-in dev-error overlay, NOT your `404.astro` page. Verified in withastro/astro issue #7179. To preview the `/404` page during development, navigate directly to `http://localhost:4321/404`.
3. The Astro `redirects` config in `astro.config.mjs` (`/portfolio → /projects`, `/contact → /#contact`) is processed BEFORE 404 routing. Any path matching a redirect goes through redirect, not 404. (Not a problem in Phase 25 — listed for awareness.)
4. **GitHub Pages 404 caveat:** GH Pages serves `/404.html` as the 404 response for ANY missing route under the same domain. This is correct behavior for Phase 25's typographic 404 page.
**Why it happens:** Astro's dev server prioritizes its own error UI for unmatched routes; production static hosting follows the `404.html` convention.
**How to avoid:** Test `/404` rendering by navigating directly to `http://localhost:4321/404` in dev. The Playwright test `await page.goto('/404')` works correctly because Playwright treats `/404` as an explicit URL request, not an undefined-route fallback.
**Warning signs:** Planner reports "the 404 page doesn't show up" — confirm they're testing via direct URL, not via a deliberately-missing path.

### Pitfall 5: Env-var fallback masks missing CI secret

**What goes wrong:** `PUBLIC_CALENDLY_URL` is not set in GitHub Secrets / workflow env. `import.meta.env.PUBLIC_CALENDLY_URL` resolves to `undefined`. The `|| 'https://calendly.com/joelshinness'` fallback kicks in. Production deploys the placeholder URL silently.
**Why it happens:** Same pattern as `PUBLIC_N8N_WEBHOOK_URL` — Astro inlines the resolved value at build time; the fallback is intentional for local dev but acts as a silent failover in CI.
**How to avoid:** The Phase 28 success criterion (CONT-03 / criterion #4) gates `PUBLIC_N8N_WEBHOOK_URL` as a required CI variable. Phase 25 does NOT gate `PUBLIC_CALENDLY_URL` — it's deployment configuration, owned by Joel post-merge. Document this clearly in the plan; do not block the phase on it.
**Warning signs:** Manual check: `grep PUBLIC_CALENDLY_URL .github/workflows/deploy.yml` — confirms the workflow line exists; manual GitHub UI check confirms the secret value is set.

### Pitfall 6: axe-core "page-has-heading-one" / "heading-order" on /404

**What goes wrong:** Concern that `/404` with only an h1 (`404`) and h2 (`This page wandered off.`) might fire axe-core best-practice rules.
**Why it doesn't happen (verified at <https://dequeuniversity.com/rules/axe/4.10>):**
- `page-has-heading-one`: Best Practice rule, NOT WCAG. The existing test invocation (`tests/accessibility/v2-layout.spec.ts` line 4, `tests/accessibility/v2-blog.spec.ts` line 4) uses `withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])` — this filter EXCLUDES best-practice rules.
- `heading-order`: Also best-practice, excluded.
- `empty-heading`: Best-practice, excluded. (Wouldn't fire anyway — both headings have text.)
- A 404 page with h1+h2 satisfies all these rules anyway.

**How to avoid:** Use the same `wcagTags` constant from the existing test files. Don't widen to `withTags(['best-practice'])` in Plan 25-01/25-02. If the planner wants belt-and-suspenders, an additional assertion `expect(h1Count).toBe(1)` is cheap.
**Warning signs:** axe-core report includes violations from rule IDs `page-has-heading-one`, `heading-order`, or `empty-heading` → indicates the test was invoked without the standard `wcagTags` filter.

### Pitfall 7: Lighthouse CI runs against `staticDistDir`, NOT live dev server

**What goes wrong:** Planner runs Lighthouse against `localhost:4321` (`npm run dev`) and the score looks fine, but CI fails on `dist/` because the build differs.
**Why it happens:** `lighthouserc.json` line 9 sets `"staticDistDir": "./dist"` — Lighthouse CI serves the BUILT static files from `dist/`. Dev mode includes HMR, unminified JS, dev overlay — none of which are in `dist/`.
**How to avoid:** Verify locally by running `npm run build && npx lhci autorun` (if Joel has LHCI installed) OR commit, push to a PR branch, and check `.github/workflows/deploy.yml` Lighthouse step output.
**Warning signs:** Local dev mode passes 90+ but CI fails. Always validate against `npm run build && npm run preview`, not `npm run dev`.

## Code Examples

### Example 1: Complete `/faq` page-header banner section (verbatim copy-paste)

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

Source: `src/pages/blog/index.astro` lines 32–44 (verbatim with "Blog"→"FAQ" string swap).

### Example 2: Complete `/thank-you` centered Card

```astro
---
import BaseLayout from '../layouts/v2/BaseLayout.astro';
import Card from '../components/v2/ui/Card.astro';
import CardBody from '../components/v2/ui/CardBody.astro';
import Button from '../components/v2/ui/Button.astro';
import { CheckCircle2 } from '@lucide/astro';

const calendlyUrl = import.meta.env.PUBLIC_CALENDLY_URL || 'https://calendly.com/joelshinness';
---

<BaseLayout
  title="Thanks!"
  description="Thank you for reaching out. I'll respond within 48 hours."
>
  <div class="min-h-[70vh] flex items-center justify-center container mx-auto px-md">
    <Card elevated={true} class="max-w-2xl w-full">
      <CardBody class="flex flex-col items-center text-center gap-md px-lg py-xl">
        <CheckCircle2 size={64} strokeWidth={2} class="text-accent" aria-hidden="true" />
        <h1 class="font-display font-bold text-display text-text">
          Thanks for reaching out!
        </h1>
        <p class="font-text text-body text-text max-w-md">
          I'll email you within 48 hours with next steps. Looking forward to learning more about your project!
        </p>
        <Button
          variant="primary"
          size="lg"
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Skip the wait — book a call
        </Button>
        <a href="/" class="font-text text-small text-text-muted underline underline-offset-2 hover:text-accent transition-colors">
          Return to homepage
        </a>
      </CardBody>
    </Card>
  </div>
</BaseLayout>
```

Source: composed from v1 `/thank-you` (copy + icon import) + Phase 24 Card/Button/CardBody primitives + Pattern 5 env-var fallback. NB: `text-accent` Tailwind v4 utility comes from the `--color-accent` token in the `@theme` block.

### Example 3: Complete `/404` page skeleton

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

<BaseLayout title="Page not found" description="The page you're looking for has wandered off.">
  <meta slot="head" name="robots" content="noindex" />

  <div class="container mx-auto px-md">
    <!-- Hero: numeral + tagline -->
    <section class="mt-2xl text-center">
      <h1 class="font-display font-bold text-8xl md:text-9xl text-primary leading-none">404</h1>
      <h2 class="mt-md font-display font-bold text-h2 text-text">This page wandered off.</h2>
    </section>

    <!-- 2×2 destination grid -->
    <div class="mt-xl mx-auto max-w-4xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
        {destinations.map(d => (
          <a href={d.href} class="dest-card" aria-label={`Go to ${d.label}`}>
            <Card interactive={true}>
              <CardBody>
                <h3 class="font-display font-bold text-h3 text-text">{d.label}</h3>
                <p class="font-text text-small text-text-muted mt-xs">{d.desc}</p>
              </CardBody>
            </Card>
          </a>
        ))}
      </div>
    </div>

    <!-- Soft 5th destination -->
    <div class="mt-xl mb-2xl text-center">
      <Button variant="link" href="/#contact">Or get in touch</Button>
    </div>
  </div>
</BaseLayout>

<style>
  .dest-card { display: block; text-decoration: none; color: inherit; }
  .dest-card:focus-visible { outline: none; }  /* outer <a> defers to inner Card focus ring */
</style>
```

**`text-primary` note:** The `--color-primary` token generates the `text-primary` Tailwind v4 utility. Verified that `BlogCard.astro` and `Card.astro` use these directly (e.g., `bg-surface`, `border-border`, `bg-accent`, `text-text`, `text-text-muted`). The phase-25 markup can use the same utility class style throughout.

### Example 4: Playwright + axe-core test scaffold

```typescript
// tests/accessibility/v2-leaf.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('v2 /faq (Plan 25-01)', () => {
  test('renders on BaseLayoutV2 with zero axe violations', async ({ page }) => {
    await page.goto('/faq');
    const h1 = page.locator('h1');
    await expect(h1).toContainText('Frequently Asked Questions');
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });

  test('FAQPage JSON-LD is present and structurally valid', async ({ page }) => {
    await page.goto('/faq');
    const jsonLdScript = await page.locator('script[type="application/ld+json"]').nth(1).textContent();
    expect(jsonLdScript).toBeTruthy();
    const data = JSON.parse(jsonLdScript!);
    expect(data['@type']).toBe('FAQPage');
    expect(data['@context']).toBe('https://schema.org');
    expect(data.mainEntity).toHaveLength(5);
    expect(data.mainEntity[0]['@type']).toBe('Question');
    expect(data.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
  });

  test('accordion: summary toggles open via keyboard (Enter)', async ({ page }) => {
    await page.goto('/faq');
    const firstSummary = page.locator('details summary').first();
    await firstSummary.focus();
    await page.keyboard.press('Enter');
    const firstDetails = page.locator('details').first();
    await expect(firstDetails).toHaveAttribute('open', '');
  });

  test('chevron rotates 180deg when details is open', async ({ page }) => {
    await page.goto('/faq');
    const firstSummary = page.locator('details summary').first();
    await firstSummary.click();
    const chevron = firstSummary.locator('.faq-row__chevron');
    const transform = await chevron.evaluate(el => window.getComputedStyle(el).transform);
    // matrix(-1, 0, 0, -1, 0, 0) == 180deg rotation
    expect(transform).toContain('matrix');
  });

  test('CTA Button links to /#contact', async ({ page }) => {
    await page.goto('/faq');
    const ctaBtn = page.getByRole('link', { name: 'Get in touch' });
    await expect(ctaBtn).toHaveAttribute('href', '/#contact');
  });
});

test.describe('v2 /thank-you (Plan 25-02)', () => {
  test('renders on BaseLayoutV2 with zero axe violations', async ({ page }) => {
    await page.goto('/thank-you');
    await expect(page.locator('h1')).toContainText('Thanks for reaching out!');
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });

  test('h1 is not uppercase (D-25-09)', async ({ page }) => {
    await page.goto('/thank-you');
    const h1 = page.locator('h1');
    const textTransform = await h1.evaluate(el => window.getComputedStyle(el).textTransform);
    expect(textTransform).toBe('none');
  });

  test('primary CTA renders with calendly href (fallback) and external attrs', async ({ page }) => {
    await page.goto('/thank-you');
    const btn = page.getByRole('link', { name: /Skip the wait/ });
    await expect(btn).toHaveAttribute('href', /calendly\.com/);
    await expect(btn).toHaveAttribute('target', '_blank');
    await expect(btn).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('secondary link returns to home', async ({ page }) => {
    await page.goto('/thank-you');
    const link = page.getByRole('link', { name: 'Return to homepage' });
    await expect(link).toHaveAttribute('href', '/');
  });
});

test.describe('v2 /404 (Plan 25-02)', () => {
  test('renders on BaseLayoutV2 with zero axe violations', async ({ page }) => {
    await page.goto('/404');
    await expect(page.locator('h1')).toContainText('404');
    await expect(page.locator('h2')).toContainText('This page wandered off');
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });

  test('noindex meta is present', async ({ page }) => {
    await page.goto('/404');
    const robotsMeta = page.locator('meta[name="robots"]');
    await expect(robotsMeta).toHaveAttribute('content', /noindex/);
  });

  test('all 4 destination cards are keyboard-reachable and navigate', async ({ page }) => {
    await page.goto('/404');
    const cards = page.locator('a.dest-card');
    await expect(cards).toHaveCount(4);
    const hrefs = await cards.evaluateAll(els => els.map(el => (el as HTMLAnchorElement).getAttribute('href')));
    expect(hrefs).toEqual(['/', '/projects', '/blog', '/faq']);
  });

  test('contact CTA link variant renders with auto ArrowRight', async ({ page }) => {
    await page.goto('/404');
    const link = page.getByRole('link', { name: /Or get in touch/ });
    await expect(link).toHaveAttribute('href', '/#contact');
    // ArrowRight is auto-rendered by Button link variant (Phase 24 D-04)
    await expect(link.locator('svg')).toHaveCount(1);
  });
});
```

Source: scaffold derived from `tests/accessibility/v2-blog.spec.ts` (Phase 26 deliverable, same `wcagTags` import). Test count: 13 assertions across 12 test cases. Plan 25-01 ships /faq tests; Plan 25-02 ships /thank-you + /404 tests.

## State of the Art

| Old Approach (v1) | Current Approach (v2) | When Changed | Impact |
|-------------------|------------------------|--------------|--------|
| `<head>` Google Fonts CDN `<link rel="preconnect">` chain | `@fontsource-variable/*` self-hosted + `<link rel="preload">` via BaseLayoutV2 line 25 | Phase 23 | Zero render-blocking external requests; Lighthouse perf scores improved |
| `font-heading` / `font-body` token utilities | `font-display` / `font-text` utilities (D-08 collision-safe rename) | Phase 23 | v1.4 pages do not contaminate v1 pages; dual-layout strategy works |
| `dark:` Tailwind utilities + FOUC script | Light-mode-only invariant (D-22) | Phase 23 | Predictable rendering; no theme-toggle flash; less JS |
| `Card variant="turquoise"` (v1 neobrutalist) | `Card elevated={true}` + `interactive={true}` props | Phase 24 | Crito-faithful aesthetic; smaller variant matrix; composable |
| `Button variant="turquoise"` (v1 neobrutalist) | `Button variant="primary" \| "ghost" \| "link"` | Phase 24 | Standard nomenclature; `link` variant ships auto `ArrowRight` (D-04) |
| Plus rotate (`+ → 45°`) on FAQ accordion | ChevronDown rotate (`▾ → 180°`) on `details[open]` | Phase 25 (D-25-05) | Crito-faithful; matches modern accordion vernacular |
| Calendly URL hardcoded | `PUBLIC_CALENDLY_URL` env var w/ fallback | Phase 25 (D-25-11) | Deployment-time configurability; mirrors webhook pattern |
| No `/404` page (default browser 404) | Custom `/404` on BaseLayoutV2 with recovery grid | Phase 25 (LEAF-03) | Brand-consistent error UX; LEAF-03 requirement satisfied |
| `text-turquoise` accent color | `--color-accent` (Crito green) | Phase 23/24 | Single accent in v2; reserved for the 5 use sites listed in 25-UI-SPEC §Color |

**Deprecated/outdated in 2026 (web-search verified, MEDIUM confidence):**
- **Google FAQ Rich Results** — deprecated May 2026. The `FAQPage` JSON-LD markup itself is still valid (D-25-21 preserves it); only the SERP rich-result display was dropped. Phase 25 preserves the schema regardless (semantic value remains; non-FAQ tools may still consume it).
- **Astro experimental Fonts API** — stable only in Astro 6.0 (REQUIREMENTS Out of Scope). Phase 25 sticks with `@fontsource-variable` per Phase 23 decision.

## Validation Architecture (Nyquist Dimension 8)

This section defines the test categories and assertions that prove Phase 25's four Success Criteria. Used to derive `25-VALIDATION.md` in step 5.5.

### Success Criteria → Test Coverage Matrix

| SC # | Criterion (from ROADMAP) | Test Category | Assertion |
|------|--------------------------|---------------|-----------|
| #1 | `/faq` renders on BaseLayoutV2 with accordion unchanged; FAQPage JSON-LD validates; CTA appears | A1: Page render; A2: JSON-LD; A3: Accordion behavior; A4: CTA presence | `expect(h1).toContainText('Frequently Asked Questions')`; `expect(data['@type']).toBe('FAQPage')` + 5 questions; keyboard Enter toggles `[open]`; chevron transform; CTA `<a>` href `/#contact` |
| #2 | `/thank-you` renders on BaseLayoutV2; post-submission message intact; Calendly URL functional | B1: Page render; B2: Content preservation; B3: Calendly link; B4: D-25-09 no-uppercase | `expect(h1).toContainText('Thanks for reaching out!')`; body p contains "48 hours"; CTA href matches `/calendly\.com/`; `text-transform === 'none'` |
| #3 | `/404` renders on BaseLayoutV2 with navigation back to home + key pages | C1: Page render; C2: Destination grid; C3: Contact CTA; C4: noindex | `expect(h1).toContainText('404')` + h2 tagline; 4 cards with hrefs `['/', '/projects', '/blog', '/faq']`; link Button href `/#contact`; `meta[name="robots"]` contains `noindex` |
| #4 | All three pages pass axe-core 0 violations + Lighthouse 90+ | D1: axe-core /faq; D2: axe-core /thank-you; D3: axe-core /404; D4: Lighthouse CI thresholds | `expect(results.violations).toEqual([])` for each route; `lighthouserc.json` thresholds maintained (perf error≥0.9; a11y/best/SEO warn≥0.9) |

### Test Categories

**Category A — `/faq` Functional (Plan 25-01)**
- A1 Page-render smoke: route resolves; correct h1; layout chrome present
- A2 JSON-LD shape: `application/ld+json` script exists; valid JSON; `@type === 'FAQPage'`; 5 mainEntity entries; each has Question + acceptedAnswer
- A3 Accordion behavior: native `<details>` toggles via Enter/Space/Click; chevron rotates on `[open]`; multiple rows independently toggleable
- A4 CTA banner: H2 "Still have questions? Let's talk."; primary Button with href `/#contact`; banner uses `--color-surface-muted` background

**Category B — `/thank-you` Functional (Plan 25-02)**
- B1 Page-render smoke: route resolves; centered Card visible; CheckCircle2 icon present
- B2 Copy preservation: H1 "Thanks for reaching out!" (sentence case, NOT uppercase); body paragraph contains "48 hours" and "Looking forward"
- B3 Calendly CTA: primary Button href matches `/calendly\.com/`; `target="_blank"`; `rel="noopener noreferrer"`; reads from `PUBLIC_CALENDLY_URL` env var with fallback
- B4 Secondary link: "Return to homepage" `<a href="/">`; visible underline; hover transitions to accent
- B5 No-uppercase compliance (D-25-09): computed `text-transform` on H1 is `none`

**Category C — `/404` Functional (Plan 25-02)**
- C1 Page-render smoke: `page.goto('/404')` succeeds; H1 contains "404"; H2 contains "wandered off"
- C2 Destination grid: 4 `<a class="dest-card">` elements; hrefs in declared order `['/', '/projects', '/blog', '/faq']`; each wraps a Card with hover-lift + focus ring
- C3 Contact CTA: link-variant Button with href `/#contact`; auto-rendered ArrowRight SVG present
- C4 noindex meta: `meta[name="robots"][content*="noindex"]` exists in `<head>`
- C5 No banner chrome (D-25-17): no `.page-hero` or `.blog-hero` section on `/404`

**Category D — Accessibility & Performance (both plans)**
- D1/D2/D3 axe-core: zero violations on each of the three routes with `wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']`
- D4 Keyboard traversal: focus rings render via `:focus-visible` accent outline on every interactive surface (summary, Buttons, dest-card anchors, breadcrumb anchors); tab order matches visual order
- D5 Lighthouse CI: existing `lighthouserc.json` thresholds maintained when CI runs against `dist/`; LCP < 2500ms, CLS < 0.1

**Category E — Cross-Cutting Compliance (both plans)**
- E1 No v1 imports: `grep -rn "components/ui/\|components/layout/\|layouts/BaseLayout" src/pages/faq.astro src/pages/thank-you.astro src/pages/404.astro` returns 0 matches
- E2 No `dark:` utilities: `grep -n "dark:" src/pages/faq.astro src/pages/thank-you.astro src/pages/404.astro` returns 0 matches
- E3 No v1 token references: `tests/check-token-collision.cjs` continues to pass
- E4 No FOUC script: no `<script is:inline>` referencing `localStorage.theme` or `prefers-color-scheme` in any of the three pages
- E5 Build succeeds: `npm run build` exits 0; `dist/faq/index.html`, `dist/thank-you/index.html`, `dist/404.html` all exist
- E6 Workflow env: `.github/workflows/deploy.yml` includes `PUBLIC_CALENDLY_URL: ${{ secrets.PUBLIC_CALENDLY_URL }}` under the build step `env:`

### Verification Steps (Plan-to-Spec)

For Plan 25-01 (`/faq`):
1. Build: `npm run build` exits 0
2. View-source `dist/faq/index.html`: confirm JSON-LD block, no Google Fonts CDN, no dark FOUC script
3. Browser smoke: `npm run dev` → `localhost:4321/faq` → manual click + keyboard test on each accordion row
4. Playwright: `npm run test:a11y -- tests/accessibility/v2-leaf.spec.ts -g "/faq"` → 0 violations
5. Token collision: `node tests/check-token-collision.cjs` exits 0
6. Optional: paste JSON-LD into <https://validator.schema.org/> → no errors

For Plan 25-02 (`/thank-you` + `/404`):
1. Build: `npm run build` exits 0; both `dist/thank-you/index.html` and `dist/404.html` exist
2. Browser smoke: `localhost:4321/thank-you` and `localhost:4321/404` (direct URL) render correctly
3. Playwright: full `v2-leaf.spec.ts` suite → 0 violations
4. Env-var fallback: with no `PUBLIC_CALENDLY_URL` set, `/thank-you` Button href === `https://calendly.com/joelshinness`
5. Workflow check: `git diff .github/workflows/deploy.yml` shows the added line for `PUBLIC_CALENDLY_URL`
6. Pencil mirror (D-25-22): `design/design-system.pen` extended via Pencil MCP with `/404` frame + FAQ accordion-row variant (end-of-phase consolidation)

## Open Questions

1. **Banner CSS class naming — `blog-hero` vs `page-hero`**
   - What we know: Shipped `/blog/index.astro` and `/blog/tags/[tag].astro` both use `.blog-hero`. The same chrome will land on `/projects` index (Phase 27).
   - What's unclear: Whether to keep `blog-hero` (consistency with shipped code, but semantically incorrect on `/faq`) or rename to `page-hero` (cleaner semantic; requires touching the blog pages too if consistency matters).
   - Recommendation: **Keep `blog-hero` on `/faq` for Phase 25** (don't touch blog pages — Phase 26 work is locked). Rename to `page-hero` in Phase 27 when `/projects` index needs the same chrome and a sweep makes sense. Document as a known-cosmetic-debt in 25-RESEARCH if planner prefers. Astro's scoped styles mean there's NO functional collision either way.

2. **Title double-suffix — fix-as-you-touch or match-existing-pattern?**
   - What we know: SEO.astro auto-appends `| Joel Shinness`. Some pages (blog/index, thank-you v1, design-system) pass pre-suffixed titles → double suffix in rendered `<title>`. Others (blog/[slug], faq v1) pass bare titles → correct.
   - What's unclear: Which pattern Phase 25 should follow.
   - Recommendation: **Pass bare titles** (`'FAQ'`, `'Thanks!'`, `'Page not found'`). This regresses the rendered double-suffix on `/thank-you` (acceptable improvement) and continues the correct pattern on `/faq`. UI-SPEC Copywriting Contract `<title>` strings ARE the expected RENDERED output, NOT the prop value to pass. Document this explicitly in the plan so the implementer doesn't paste the UI-SPEC string verbatim into the prop.

3. **Pencil mirror timing — per-plan or end-of-phase?**
   - What we know: D-25-22 says "treat as a 25-02 sub-task or end-of-phase consolidation per planner discretion."
   - What's unclear: Whether Pencil work blocks plan completion or rolls into a Phase-25-final consolidation step.
   - Recommendation: **End-of-phase consolidation**, in a final "Wave 3" or "post-25-02 cleanup" task. Pencil changes are low-risk and don't affect code. Bundling them keeps plan tasks focused on code deliverables.

4. **Outer `<a>` vs Card `interactive` double-focus on `/404` destination cards**
   - What we know: BlogCard pattern uses `<a><Card interactive={true}></Card></a>` — both the `<a>` and the Card's `<div tabindex=0>` are focusable.
   - What's unclear: Whether this causes a perceptible double-tab on `/404`. (Anecdotally: in `BlogCard.astro`, the Card's `interactive` adds tabindex but the OUTER `<a>` is what tabs land on first; the inner div is then reached on subsequent tab. May result in 4 cards × 2 tabs = 8 stops.)
   - Recommendation: **Verify in Plan 25-02 implementation.** If the keyboard tab order on `/404` includes 8 stops instead of 4, set `interactive={false}` on the wrapped Card AND apply hover/focus styles directly to `.dest-card`. Test E2E with Playwright `page.keyboard.press('Tab')` count assertion.

## Sources

### Primary (HIGH confidence — Read from in-repo source)

- `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/src/pages/faq.astro` (v1, 121 lines) — copy / JSON-LD source-of-truth
- `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/src/pages/thank-you.astro` (v1, 58 lines) — copy / icon source-of-truth
- `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/src/pages/blog/index.astro` (Phase 26, shipped) — page-header banner pattern verbatim
- `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/src/pages/blog/tags/[tag].astro` (Phase 26, shipped) — secondary banner reference
- `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/src/components/v2/feature/BlogCard.astro` (Phase 26, shipped) — anchor-wraps-Card pattern verbatim
- `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/src/layouts/v2/BaseLayout.astro` (Phase 23) — head-slot mechanics + title-prop contract
- `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/src/components/v2/ui/{Button,Card,CardBody,CardHeader,CardFooter}.astro` (Phase 24) — primitive APIs
- `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/src/components/SEO.astro` — title-suffix behavior (line 30)
- `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/src/components/homepage/ContactSection.astro` line 214 — env-var fallback pattern verified
- `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/src/pages/design-system.astro` line 48 — `<meta slot="head">` pattern verified
- `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/src/styles/v2/global.css` — token definitions (colors, spacing, fonts)
- `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/tests/accessibility/v2-{layout,blog}.spec.ts` — Playwright + axe-core test patterns
- `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/.github/workflows/deploy.yml` — current CI env block
- `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/lighthouserc.json` — Lighthouse CI thresholds
- `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/package.json` — dependencies + scripts
- `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/astro.config.mjs` — Astro 5 configuration

### Secondary (HIGH confidence — Official documentation)

- [Astro 5 Pages Documentation](https://docs.astro.build/en/basics/astro-pages/) — `404.astro` convention, static build behavior
- [Astro 5 Environment Variables](https://docs.astro.build/en/guides/environment-variables/) — `PUBLIC_*` prefix, build-time inlining
- [Deque axe-core 4.10 Rules](https://dequeuniversity.com/rules/axe/4.10) — `page-has-heading-one`, `heading-order`, `empty-heading` classified as Best Practice (not WCAG AA)
- [tailwindlabs/tailwindcss Discussion #13614](https://github.com/tailwindlabs/tailwindcss/discussions/13614) — `<summary>` marker reset recipe (list-style + ::-webkit-details-marker)

### Tertiary (MEDIUM confidence — WebSearch verified)

- [Schema.org Validator](https://validator.schema.org/) — JSON-LD validation tool
- [Google: FAQPage Structured Data](https://developers.google.com/search/docs/appearance/structured-data/faqpage) — FAQPage schema definition (markup still valid; rich result deprecated May 2026)
- [Astro Issue #7179](https://github.com/withastro/astro/issues/7179) — dev-server 404 routing (not a problem in production)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — every library version + presence verified directly in `package.json` and source files
- Architecture patterns: HIGH — every pattern (banner, anchor-wraps-Card, env-var fallback, JSON-LD, head-slot) verified by reading shipped code in the repo
- Don't hand-roll list: HIGH — driven by Phase 24 D-21 deferral rule + verified primitive APIs
- Common pitfalls: HIGH for Pitfalls 1-3 (verified in source); MEDIUM for Pitfall 4 (Astro issue tracker, dev-mode behavior may differ across Astro 5.x patch versions); HIGH for Pitfall 5 (matches `PUBLIC_N8N_WEBHOOK_URL` shipped pattern); HIGH for Pitfall 6 (verified against Deque rule list); HIGH for Pitfall 7 (verified in `lighthouserc.json`)
- Code examples: HIGH — all snippets are either verbatim copies from shipped code or direct compositions of verified primitives
- Validation architecture: HIGH — derived directly from ROADMAP Success Criteria + existing test invocation patterns
- Title-suffix bug analysis (Pitfall 2 + Open Question 2): HIGH — read both code paths directly

**Research date:** 2026-05-21
**Valid until:** 2026-06-20 (30-day shelf — patterns are stable; Astro 5 minor versions could shift env-var behavior; FAQ rich-result deprecation is fixed history)

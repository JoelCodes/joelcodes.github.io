# Phase 39: Utility Pages + Dev-Hidden Pages — Research

**Researched:** 2026-07-20
**Domain:** Astro static pages, SEO/sitemap mechanism, JSON-LD injection, wl/ component composition, axe testing, fidelity gate tooling
**Confidence:** HIGH (all findings verified from live source files)

---

## Summary

Phase 39 builds three static Astro pages: `/404` (public, branded), `/services/web` (dev-hidden), and `/areas/abbotsford` (dev-hidden with ProfessionalService JSON-LD). All three pages compose exclusively from existing `src/components/wl/` components shipped in Phases 35–36. No new npm dependencies, no new components.

The dev-hide mechanism is purely additive: `SEO.astro` gains one optional `noindex?: boolean` prop (or the two hidden pages inject the robots meta via `BaseLayout`'s `<slot name="head" />`), and `astro.config.mjs` gets two more `&&` clauses in the existing `filter()`. The showcase's `if (import.meta.env.PROD) return Astro.redirect('/')` pattern is NOT used — these pages ship into the production build unredirected.

Frames `85:103` (Service Web) and `85:104` (Area Abbotsford) are not yet fully designed. They must be drafted in the brand Figma file via the `use_figma` MCP (requires reading the `/figma-use` skill first), approved by Joel at a hard checkpoint, then extracted for the page build. The `/404` page has locked copy (D-05) and no Figma frame; it builds in parallel with frame drafting.

**Primary recommendation:** Wire `noindex` via the `<slot name="head" />` approach (simpler — no change to SEO.astro signature needed) unless the planner prefers the cleaner prop interface on SEO.astro. Both are valid per CONTEXT D-01. The sitemap filter extension is a one-line diff to the existing `filter()`.

---

## Standard Stack

All libraries and tooling already installed. No new packages this phase.

### Core (already in project)

| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| Astro | 5.x | Static site framework, file-based routing | `src/pages/404.astro` is the built-in 404 convention |
| `@astrojs/sitemap` | installed | Generates `dist/sitemap-0.xml` + `dist/sitemap-index.xml` | `filter()` already excludes `/blog` and `/showcase` |
| `@axe-core/playwright` | installed | Accessibility spec runner | Pattern: `tests/accessibility/landing.spec.ts` |
| Playwright | installed | Browser automation for fidelity screenshots and axe tests | Pattern: `scripts/blog-fidelity-screenshots.mjs` |
| figma-desktop MCP | project tool | Read frames, `get_screenshot`, `get_design_context` | Used for all prior extraction phases |
| `use_figma` (claude.ai Figma MCP) | project tool | WRITE frames to Figma; requires `/figma-use` skill read first | Used for frame drafting (D-07) |

### No New Dependencies

`package.json` is unchanged this phase. Zero new installs.

---

## Architecture Patterns

### RQ-1: Sitemap Filter — Current State and Exact Diff

**Verified from `astro.config.mjs` line 148:**

```js
// CURRENT (Phase 38):
filter: (page) => !page.includes('/blog') && !page.includes('/showcase'),
```

**Required diff (Phase 39):**

```js
// Phase 39 — add /services/ and /areas/ exclusions:
filter: (page) =>
  !page.includes('/blog') &&
  !page.includes('/showcase') &&
  !page.includes('/services/') &&
  !page.includes('/areas/'),
```

`filter()` receives the full URL string (e.g. `https://joelshinness.com/services/web/`). The `page.includes('/services/')` pattern safely matches `/services/web/` and any future `/services/automations/` without over-matching.

**Sitemap output structure (verified from `dist/`):** `@astrojs/sitemap` produces exactly two files:
- `dist/sitemap-index.xml` — top-level index pointing to `sitemap-0.xml`
- `dist/sitemap-0.xml` — the URL list (all pages not filtered)

**Verification gate command:**
```bash
npm run build && grep -r "services/web\|areas/abbotsford" dist/sitemap-*.xml
```
Must return zero output (exit code 1 from grep = no match = PASS).

### RQ-2: noindex Meta Wiring — Two Valid Options

**Verified from `src/components/SEO.astro` (props: `title`, `description`, `canonical?`, `type?`) and `src/layouts/BaseLayout.astro` (`<slot name="head" />` at line 38).**

**Option A — head slot injection (no SEO.astro change):**

```astro
<BaseLayout title="..." description="...">
  <meta slot="head" name="robots" content="noindex, nofollow" />
  ...
</BaseLayout>
```

`BaseLayout.astro` renders `<slot name="head" />` AFTER `<SEO ...>` (line 38), so the injected meta appears after the canonical link. `<link rel="canonical">` is unaffected — it lives inside SEO.astro and is always rendered. This pattern is confirmed working by Phase 34 precedent.

**Option B — SEO.astro noindex prop:**

Add to `SEO.astro` Props interface:
```typescript
interface Props {
  title: string;
  description: string;
  canonical?: string;
  type?: string;
  noindex?: boolean;  // new
}
```

And in the template:
```astro
{noindex && <meta name="robots" content="noindex, nofollow" />}
```

`BaseLayout.astro` passes props through: it would need a `noindex` prop added to its own `Props` interface and forwarded to `<SEO>`, OR the page uses `<meta slot="head">` alongside `<SEO noindex={true}>` inside BaseLayout's head slot (complex).

**Recommendation:** Option A (head slot injection) is simpler — zero changes to existing components, zero risk of regressions. Option B is cleaner long-term but requires coordinated edits to both `SEO.astro` and `BaseLayout.astro`. Planner decides; either satisfies the contract.

### RQ-3: BaseLayout Head Slot and JSON-LD Injection

**Verified from `src/layouts/BaseLayout.astro`:**

`<slot name="head" />` is at line 38, between `<SEO ...>` and the font preload links. Anything slotted with `slot="head"` renders inside `<head>`. This is the correct injection point for:
1. `<meta name="robots" content="noindex, nofollow">` (Option A above)
2. `<script type="application/ld+json">` for ProfessionalService JSON-LD

**Exact ProfessionalService JSON-LD injection pattern** (mirrors `SEO.astro` line 75):

```astro
---
const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Joel Shinness Solutions",
  "url": "https://joelshinness.com",
  "areaServed": "Abbotsford, BC",
  "serviceType": "Web Development",
  "provider": {
    "@type": "Person",
    "name": "Joel Shinness"
  }
};
---

<BaseLayout title="..." description="...">
  <meta slot="head" name="robots" content="noindex, nofollow" />
  <script slot="head" type="application/ld+json" set:html={JSON.stringify(professionalServiceSchema)} />
  ...
</BaseLayout>
```

`set:html` is the Astro directive for injecting pre-serialized content into a script tag without HTML-escaping. This is the established pattern in `SEO.astro` (line 75: `<script type="application/ld+json" set:html={JSON.stringify(personSchema)} />`).

**Verification:** JSON-LD appears in `npm run build` output (in the static HTML file at `dist/areas/abbotsford/index.html`). Check with:
```bash
grep -l "ProfessionalService" dist/areas/abbotsford/index.html
```

### RQ-4: Astro 404.astro Convention

**Verified by project structure + Astro 5 static mode behavior (HIGH confidence from Astro docs):**

- File: `src/pages/404.astro` — this file does NOT exist yet (confirmed by `src/pages/` directory listing)
- Astro's built-in convention: any file at `src/pages/404.astro` is built to `dist/404.html` and served with HTTP 404 status by static hosts and `npm run preview`
- **No config required** — the `404.astro` convention is zero-config in Astro 5 static mode
- `npm run preview` (Astro's built-in preview server) correctly serves `dist/404.html` with HTTP 404 status when any unmatched URL is requested
- The page uses `BaseLayout.astro` normally — chrome (header + footer) wraps the content

**No `noindex` on `/404`** — 404 pages are never crawled by bots hitting unknown URLs; no robots meta needed. Copy is locked (D-05): `<h1>Page not found</h1>`, lead paragraph, "Back to home" CTA.

### RQ-5: wl/ Component APIs

**Verified from source files. All components in `src/components/wl/`:**

| Component | Key Props | Notes |
|-----------|-----------|-------|
| `ServiceCard` | `variant?: 'default'\|'highlight'`, `kicker?`, `benefit?`, `title?`, `headingLevel?: 2\|3\|4` (default 3), `body?`, `class?` | Slots: `icon`, default. Renders `<div>`, not a heading container |
| `CTAButton` | `href` (required), `variant?: 'solid'\|'ghost'\|'ghost-on-dark'\|'small'` (default solid), `icon?: 'calendar'\|'mail'`, `class?`, `target?`, `rel?` | Always renders `<a>` — never `<button>` (D-07 from Phase 35) |
| `Eyebrow` | `onDark?: boolean` (default false), `class?` | Slot: default text. On-dark uses literal `#5AA9A5` |
| `Step` | (inspect if needed — not extracted in this research pass; used in How-it-works landing) | |
| `Callout` | (inspect if needed) | |
| `LinkCard` | (inspect if needed) | |
| `FrequencyWave` | `class?` (passthrough for sizing/positioning) | Inline SVG, stroke via CSS var, aria-hidden decoration. Props: just `class` |
| `Breadcrumb` | `items: Array<{ label: string; href?: string }>`, `class?` | WAI-ARIA nav pattern; last item = current page span |

**Page-shell gutter pattern** (verified from `src/pages/index.astro` line 58 and `src/pages/showcase.astro`):
```
px-[24px] sm:px-[32px] lg:px-[160px] min-[1920px]:px-[400px]
```
Standard section vertical padding: `112px` top + bottom. Content max-width: `1120px`, centered. These are LOCKED from Phase 37 gate.

**Dark gradient pattern** (Rule 1 — verified from `src/pages/index.astro` line 49):
```html
class="[background:linear-gradient(to_bottom,#E6F1F1,#D2E7E7)] dark:[background:linear-gradient(to_bottom,#123640,#0C2228)]"
```
Never `style=` for gradient backgrounds — `style` inline beats class specificity and breaks dark override.

### RQ-6: Figma MCP Tool Split for Frame Drafting

**Based on CONTEXT.md canonical refs and memory notes:**

| Task | Tool | Prerequisite |
|------|------|-------------|
| Draft frames `85:103` / `85:104` in Figma | `use_figma` (claude.ai Figma MCP) | Must read `/figma-use` skill FIRST (mandatory per MCP instructions); also read `/figma-generate-design` skill |
| Read frame geometry / design context | `figma-desktop` MCP `get_design_context` | — |
| Screenshot frames for fidelity comparison | `figma-desktop` MCP `get_screenshot` | — |
| Export PNG fidelity artifacts | Manual in Figma editor (export_nodes is broken per memory) | — |

**Figma brand file:** `1tg8wIPcvOVC5tPZ8pkGO2`
**Frame IDs to draft:** `85:103` (Service Web), `85:104` (Area Abbotsford)
**Scope:** 1440 + 390 per page (D-09); 768/1920 responsive

The `/figma-use` skill is available as `skill://figma/figma-use/SKILL.md` (fallback per MCP instructions). The `/figma-generate-design` skill is available as `skill://figma/figma-generate-design/SKILL.md`.

**Critical sequencing:** Frames must be drafted AND Joel-approved (hard checkpoint) before any `/services/web` or `/areas/abbotsford` code is written. `/404` has no frame dependency and builds in parallel.

### RQ-7: Test and Verification Scaffolding

**Pattern verified from `tests/accessibility/` and `scripts/`:**

**Axe spec structure** (clone of `landing.spec.ts` / `showcase.spec.ts`):
- Import `AxeBuilder` from `@axe-core/playwright`
- Import `settleAnimations` from `./helpers`
- Light test: `page.goto('/route')` → `settleAnimations` → `AxeBuilder.withTags(wcagTags).analyze()`
- Dark test: `browser.newContext({ colorScheme: 'dark' })` → verify `html.dark` class → `settleAnimations` → axe
- Tags constant: `['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']`
- `settleAnimations` waits for all finite animations to complete (prevents flaky contrast failures)

**New axe specs needed:**
- `tests/accessibility/404.spec.ts` — light + dark, route `/404` (or any unmatched URL)
- `tests/accessibility/services-web.spec.ts` — light + dark, route `/services/web`
- `tests/accessibility/areas-abbotsford.spec.ts` — light + dark, route `/areas/abbotsford`

Note: Dev-hidden pages are reachable in dev (no redirect), so axe tests run against `npm run dev` server normally.

**Fidelity screenshot script pattern** (clone of `scripts/blog-fidelity-screenshots.mjs`):
- Uses `chromium` from `@playwright/test`
- `browser.newContext({ viewport: { width, height: 900 }, colorScheme })`
- `page.goto(BASE_URL + route, { waitUntil: 'networkidle' })`
- Dark: `waitForFunction(() => document.documentElement.classList.contains('dark'))`
- Wait: `document.fonts.ready` + `requestAnimationFrame` + settled animations
- `page.screenshot({ path: outPath, fullPage: true })`
- Store to `.planning/phases/39-utility-pages-dev-hidden-pages/fidelity/`

**Contrast script:** `scripts/check-contrast.mjs` — add new bg/text pairs for any net-new literal backgrounds extracted from `85:103` / `85:104`. Existing pairs (ink/sub on paper, ink/sub on sea-glass, accent on sea-glass) already covered. Run: `node scripts/check-contrast.mjs`.

### RQ-8: Sitemap Output Filename Pattern

**Verified from `dist/` directory:**
- `dist/sitemap-index.xml` — top-level index
- `dist/sitemap-0.xml` — the URL list

The glob `dist/sitemap-*.xml` matches BOTH files. The verification command:
```bash
npm run build && grep -r "services/web\|areas/abbotsford" dist/sitemap-*.xml
```
…must return zero results. `grep` returns exit code 1 (no match) when the pages are correctly excluded.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| noindex meta tag | Custom SEO override mechanism | `<meta slot="head" name="robots" content="noindex, nofollow" />` | BaseLayout's head slot is the established injection point |
| JSON-LD in head | Separate endpoint or client-side injection | `<script slot="head" type="application/ld+json" set:html={JSON.stringify(schema)} />` | Matches SEO.astro's existing pattern exactly; static, no JS runtime |
| Sitemap exclusion | robots.txt Disallow (insufficient — doesn't prevent sitemap listing) | `filter()` in `@astrojs/sitemap` config | The filter prevents the URL from appearing in the generated sitemap XML |
| 404 page routing | Custom redirect logic | `src/pages/404.astro` convention | Astro 5 built-in; zero config needed |
| Frame content | Deriving page structure from patterns | Extract verbatim from `85:103` / `85:104` after Joel approves | v1.4 lesson — never invent values |
| Fidelity PNG export | `export_nodes` MCP tool | Manual PNG export in Figma editor | `export_nodes` is broken (memory note) |

---

## Common Pitfalls

### Pitfall 1: Using the Phase 38 PROD redirect pattern for dev-hidden pages

**What goes wrong:** The `39-UI-SPEC.md` Interaction Contracts table still contains a "Dev gate redirect" row referencing `if (import.meta.env.PROD) return Astro.redirect('/')`. If the executor follows the UI-SPEC row without reading CONTEXT.md D-02, they add this redirect and the pages disappear from the prod build entirely — violating ROADMAP SC-2 ("reachable by direct URL") and SC-3 ("JSON-LD present in build output").

**How to avoid:** CONTEXT D-01/D-02 supersede the UI-SPEC dev-gate row. No `import.meta.env.PROD` check in `/services/web` or `/areas/abbotsford`. The ONLY hiding mechanisms are: unlinked in nav + noindex meta + sitemap filter.

**Warning signs:** Page returns 301 to `/` in production preview; JSON-LD absent from `dist/areas/abbotsford/index.html`.

### Pitfall 2: noindex breaks canonical

**What goes wrong:** Replacing or wrapping the canonical link when adding noindex, causing `<link rel="canonical">` to be absent or incorrect.

**How to avoid:** The canonical URL in `SEO.astro` is always rendered regardless of noindex state. If using Option A (head slot), the `<meta name="robots">` sits after the canonical in the `<head>` — no interference. If using Option B (SEO.astro prop), the conditional only adds the meta, never removes canonical.

### Pitfall 3: Gradient background in inline style

**What goes wrong:** Using `style="background: linear-gradient(...)"` on a section — inline style beats class specificity and `dark:[background:...]` Tailwind utility never fires, leaving the section wrong-colored in dark mode.

**How to avoid:** All gradient backgrounds go in `class` via arbitrary-value syntax: `class="[background:linear-gradient(...)] dark:[background:linear-gradient(...)]"` (Phase 38 Rule 1 — verified from `src/pages/index.astro` line 49).

### Pitfall 4: Building service/area pages before frame approval

**What goes wrong:** Claude drafts frames and immediately builds pages without the hard checkpoint. Joel sees wrong pages at the fidelity gate — requires rework of both Figma and code.

**How to avoid:** The planner must include an explicit HARD CHECKPOINT plan (same pattern as 38-04-PLAN.md) that gates all `/services/web` and `/areas/abbotsford` build work. The 404 page build is NOT gated and must be in a parallel wave.

### Pitfall 5: Sitemap filter matching too broadly or too narrowly

**What goes wrong:** A pattern like `!page.includes('/services')` (no trailing slash) could in theory match a future `/services-something` URL. A pattern like `page === 'https://joelshinness.com/services/web/'` is too narrow for future service pages.

**How to avoid:** Use `!page.includes('/services/')` (with trailing slash). This matches `/services/web/`, `/services/automations/`, etc., without false positives.

### Pitfall 6: 404 spec testing wrong URL

**What goes wrong:** `page.goto('/404')` returns the 404 page content but with HTTP 200 in Astro dev server (the file `src/pages/404.astro` IS a valid route — it matches `/404`). The real 404 behavior triggers on an unmatched route like `/this-does-not-exist`.

**How to avoid:** For axe testing, `page.goto('/404')` works fine — the page renders correctly for accessibility testing regardless of HTTP status. For HTTP status verification, use `npm run build && npm run preview` and request an unmatched URL.

---

## Code Examples

### Sitemap filter extension

```js
// astro.config.mjs — minimal diff to extend Phase 38 filter
sitemap({
  filter: (page) =>
    !page.includes('/blog') &&
    !page.includes('/showcase') &&
    !page.includes('/services/') &&
    !page.includes('/areas/'),
  changefreq: 'weekly',
  priority: 0.7,
  lastmod: new Date(),
}),
```

### noindex + JSON-LD in head slot (areas/abbotsford.astro)

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
// ... other imports

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Joel Shinness Solutions",
  "url": "https://joelshinness.com",
  "areaServed": "Abbotsford, BC",
  "serviceType": "Web Development",
  "provider": {
    "@type": "Person",
    "name": "Joel Shinness"
  }
};
---

<BaseLayout title="Web Development in Abbotsford, BC | Joel Shinness Solutions" description="...">
  <meta slot="head" name="robots" content="noindex, nofollow" />
  <script slot="head" type="application/ld+json" set:html={JSON.stringify(professionalServiceSchema)} />

  <!-- page content -->
</BaseLayout>
```

### Axe spec template (new pages)

```typescript
// tests/accessibility/404.spec.ts (clone of landing.spec.ts)
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { settleAnimations } from './helpers';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('404 Page Accessibility', () => {
  test('404 page in light mode should not have accessibility violations', async ({ page }) => {
    await page.goto('/404');
    await settleAnimations(page);
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });

  test('404 page in dark mode should not have accessibility violations', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    try {
      await page.goto('/404');
      await expect(page.locator('html')).toHaveClass(/dark/);
      await settleAnimations(page);
      const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
      expect(results.violations).toEqual([]);
    } finally {
      await context.close();
    }
  });
});
```

### 404 page layout recipe

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import CTAButton from '../components/wl/CTAButton.astro';
// Optional: import FrequencyWave from '../components/wl/FrequencyWave.astro';
---

<BaseLayout title="Page Not Found | Joel Shinness Solutions" description="This page has moved or doesn't exist.">
  <section
    class="px-[24px] sm:px-[32px] lg:px-[160px] min-[1920px]:px-[400px]"
    style="padding-top: 112px; padding-bottom: 112px; background: var(--color-wl-paper);"
  >
    <div style="max-width: 640px; margin: 0 auto; text-align: center;">
      <h1 class="wl-heading-h1-interior" style="color: var(--color-wl-ink);">
        Page not found
      </h1>
      <p class="wl-text-lead" style="color: var(--color-wl-sub); margin-top: 16px; margin-bottom: 32px;">
        This page has moved or doesn't exist. Head back to the homepage to find what you're looking for.
      </p>
      <CTAButton href="/" variant="solid">Back to home</CTAButton>
    </div>
  </section>
</BaseLayout>
```

---

## State of the Art

| Area | Current State | Notes |
|------|--------------|-------|
| Sitemap filter | Excludes `/blog` and `/showcase` | Phase 38 shipped; extend to add `/services/` and `/areas/` |
| SEO.astro props | `title`, `description`, `canonical?`, `type?` | No noindex prop yet; add or use head slot |
| BaseLayout head slot | `<slot name="head" />` exists at line 38 | Confirmed working; Phase 34 precedent |
| JSON-LD pattern | `set:html={JSON.stringify(schema)}` in SEO.astro | Direct model for ProfessionalService block |
| 404 page | Does not exist yet | Create `src/pages/404.astro` |
| /services/ | No directory or file exists | Create `src/pages/services/web.astro` |
| /areas/ | No directory or file exists | Create `src/pages/areas/abbotsford.astro` |
| Figma frames 85:103 / 85:104 | Not fully designed (D-07) | Must draft via `use_figma` + Joel approval before build |

---

## Open Questions

1. **noindex wiring approach (Claude's discretion per CONTEXT)**
   - What we know: Both Option A (head slot) and Option B (SEO.astro prop) are valid
   - What's unclear: Planner preference for long-term maintainability vs. zero-change-to-existing-components
   - Recommendation: Option A for this phase (simpler, no regression risk); Option B can be a future cleanup in Phase 41 if desired

2. **FrequencyWave on 404 (Claude's discretion per D-06)**
   - What we know: Include if the page feels barren, omit if it feels complete; no new SVG decoration either way
   - What's unclear: Resolved only at render time (visual judgment call)
   - Recommendation: Include it — a single centered column of text at 640px max-width on a full-viewport page will feel sparse without a background texture. Place it absolutely behind the content (same pattern as landing hero).

3. **Frames 85:103 / 85:104 content**
   - What we know: These frames exist in Figma file `1tg8wIPcvOVC5tPZ8pkGO2` but are not fully designed; they are drafted in Wave 1 of this phase
   - What's unclear: Section count, component types used, copy — all are FIDELITY-GAP until extraction
   - Recommendation: Planner should schedule the frame drafting + HARD CHECKPOINT as Wave 1; no `/services/web` or `/areas/abbotsford` build work until approval

---

## Sources

### Primary (HIGH confidence — verified from source files)

- `astro.config.mjs` — current sitemap `filter()` implementation (lines 148–149)
- `src/components/SEO.astro` — full prop interface and JSON-LD `set:html` pattern
- `src/layouts/BaseLayout.astro` — `<slot name="head" />` location (line 38), head structure
- `src/components/wl/ServiceCard.astro` — full prop interface with `headingLevel`, `variant`, slots
- `src/components/wl/CTAButton.astro` — full prop interface, all four variants
- `src/components/wl/Eyebrow.astro` — `onDark` prop, literal vs. token color behavior
- `src/components/wl/Breadcrumb.astro` — `items` prop, WAI-ARIA pattern
- `src/components/wl/FrequencyWave.astro` — `class` passthrough, inline SVG behavior
- `src/pages/index.astro` — gutter class string and gradient class pattern (lines 49, 58)
- `src/pages/showcase.astro` — page structure, BaseLayout usage, PROD redirect pattern (superseded for Phase 39)
- `dist/sitemap-0.xml` + `dist/sitemap-index.xml` — confirmed filename pattern of `@astrojs/sitemap` output
- `tests/accessibility/landing.spec.ts` + `showcase.spec.ts` — axe spec pattern
- `tests/accessibility/helpers.ts` — `settleAnimations` helper
- `scripts/blog-fidelity-screenshots.mjs` — fidelity screenshot script pattern
- `scripts/check-contrast.mjs` — contrast gate structure

### Secondary (HIGH confidence — from planning documents)

- `.planning/phases/39-utility-pages-dev-hidden-pages/39-CONTEXT.md` — locked decisions D-01 through D-10
- `.planning/phases/39-utility-pages-dev-hidden-pages/39-UI-SPEC.md` — design contract (with D-02 correction)
- `.planning/REQUIREMENTS.md` — PAGE-03, PAGE-04, PAGE-05, IA-02
- `.planning/ROADMAP.md` Phase 39 success criteria

---

## Metadata

**Confidence breakdown:**

- Sitemap filter semantics: HIGH — verified from live `astro.config.mjs` and `dist/` output
- head slot noindex injection: HIGH — verified from `BaseLayout.astro` structure
- JSON-LD set:html pattern: HIGH — verified from `SEO.astro` existing implementation
- 404.astro Astro convention: HIGH — Astro 5 documented built-in, confirmed by project structure
- wl/ component APIs: HIGH — verified from source files
- Figma MCP tool split: HIGH — confirmed by CONTEXT.md and memory notes
- Frame content (85:103/85:104): LOW — not yet designed; FIDELITY-GAP at extraction
- axe spec structure: HIGH — verified from existing specs

**Research date:** 2026-07-20
**Valid until:** 2026-09-01 (stable tooling; sitemap/Astro APIs do not change frequently)

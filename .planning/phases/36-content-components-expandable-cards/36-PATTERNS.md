# Phase 36: Content Components + Expandable Cards - Pattern Map

**Mapped:** 2026-07-16
**Files analyzed:** 10 (3 new components, 1 data rewrite, 1 config edit, 2 page deletions, 1 config edit, 1 script extension, 2 temporary files)
**Analogs found:** 9 / 10

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/components/wl/ProjectCard.astro` | component | request-response | `src/components/wl/ServiceCard.astro` | exact |
| `src/components/wl/FAQItem.astro` | component | event-driven | `src/components/wl/Callout.astro` | role-match |
| `src/components/wl/FrequencyWave.astro` | component | transform | `src/components/WaveMark.astro` | exact |
| `src/data/projects.json` | config | CRUD | `src/data/projects.json` (v1, same file) | exact |
| `src/content.config.ts` | config | CRUD | `src/content.config.ts` blog collection | exact |
| `src/pages/projects/index.astro` | route | — | — | DELETED (no analog needed) |
| `src/pages/projects/[slug].astro` | route | — | — | DELETED (no analog needed) |
| `astro.config.mjs` | config | — | `astro.config.mjs` existing `/faq` redirect | exact |
| `scripts/check-contrast.mjs` | utility | transform | `scripts/check-contrast.mjs` Phase 35 additions | exact |
| `src/pages/dev/content-components.astro` | page (temp) | request-response | `src/pages/dev/primitives.astro` (git: 549332f) | exact |
| `tests/accessibility/content-components.spec.ts` | test (temp) | request-response | `tests/accessibility/primitives.spec.ts` (git: 549332f) | exact |

---

## Pattern Assignments

### `src/components/wl/ProjectCard.astro` (component, request-response)

**Analog:** `src/components/wl/ServiceCard.astro`

**Header comment pattern** (lines 1–66 of ServiceCard):
```astro
---
/**
 * ProjectCard — COMP-03 ProjectCard component
 *
 * Expandable project showcase card using native <details>/<summary>.
 * Whole closed card is the <summary> (D-01). Cards open independently
 * — no name attribute (D-03). Zero client JS.
 *
 * All geometry sourced from Figma extraction — nodes 36:5, 12:3.
 * FIDELITY-GAPs: border-radius, padding, gaps, toggle indicator SVG,
 * hover state — all require Wave 1 extraction before CSS is written.
 *
 * Card token reuse from ServiceCard:
 *   Background:    --wl-card-bg  (#FFFFFF light / #12333B dark)
 *   Shadow:        --wl-card-shadow
 *   Border-radius: FIDELITY-GAP (36:5) — likely 18px per ServiceCard precedent
 *   Padding:       FIDELITY-GAP (36:5)
 *   Border:        FIDELITY-GAP (36:5) — likely 1px solid var(--color-wl-line)
 *
 * Props:
 *   eyebrow?:      string
 *   title:         string (required)
 *   outcome?:      string
 *   summary?:      string
 *   tags?:         string[]
 *   problem?:      string
 *   built?:        string
 *   result?:       string
 *   headingLevel?: 2 | 3 | 4 (default: 3) — WR-09 heading outline contract
 *   class?:        string — passthrough
 *
 * Zero old-token references. No <script> tag.
 */
```

**Props interface pattern** (lines 68–86 of ServiceCard):
```astro
interface Props {
  eyebrow?: string;
  title: string;
  outcome?: string;
  summary?: string;
  tags?: string[];
  problem?: string;
  built?: string;
  result?: string;
  headingLevel?: 2 | 3 | 4;
  class?: string;
}

const {
  eyebrow,
  title,
  outcome,
  summary,
  tags = [],
  problem,
  built,
  result,
  headingLevel = 3,
  class: className = ''
} = Astro.props;

// Dynamic heading tag (WR-09): visual style stays .wl-heading-h3 regardless of level
const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4';
```

**Card container pattern** (lines 95–116 of ServiceCard — copy the style array approach, swap card contents):
```astro
<details
  class:list={[className]}
  style={[
    'background: var(--wl-card-bg);',
    'border-radius: FIDELITY-GAP;',   /* extract from 36:5 */
    'padding: FIDELITY-GAP;',         /* extract from 36:5 */
    'box-shadow: var(--wl-card-shadow);',
    'border: FIDELITY-GAP;',          /* extract from 36:5 */
  ].join(' ')}
>
  <summary
    class="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent"
    style="list-style: none; cursor: pointer;"
  >
    {/* Eyebrow, Heading, outcome, summary, tags, chevron — all inside summary (D-01) */}
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <Heading class="wl-heading-h3" style="display: inline; color: var(--color-wl-ink); margin: 0;">
      {title}
    </Heading>
    {/* ... outcome, summary, tags, toggle indicator ... */}
  </summary>
  {/* Expanded panel: problem, built, result sections */}
</details>
```

**Token references to reuse** (ServiceCard lines 103–116):
- `background: var(--wl-card-bg)` — Phase 35 card token, flips light (#FFFFFF) / dark (#12333B)
- `box-shadow: var(--wl-card-shadow)` — Phase 35 shadow token, flips opacity in dark
- `border: 1px solid var(--color-wl-line)` — default card border (confirm via Figma 36:5)
- `border-radius: 18px` — ServiceCard precedent; verify against 36:5 before committing

**Child primitive imports** (from ServiceCard's inline usage, confirmed by Eyebrow/Tag reads):
```astro
import Eyebrow from './Eyebrow.astro';
import Tag from './Tag.astro';
```

---

### `src/components/wl/FAQItem.astro` (component, event-driven)

**Analog:** `src/components/wl/Callout.astro` (role-match: container with slot prose) + `src/components/wl/ServiceCard.astro` (data flow: same `<details>` pattern)

**Props interface pattern** (from Callout lines 30–32, adapted):
```astro
interface Props {
  question: string;
  groupName: string;
  class?: string;
}

const { question, groupName, class: className = '' } = Astro.props;
```

**Exclusive-open `name` attribute pattern** (distinct from ProjectCard — FAQItem uses `name`):
```astro
<details
  name={groupName}
  class:list={[className]}
  style={[
    /* Surface fill: FIDELITY-GAP — extract from Figma 36:5 */
    /* Padding: FIDELITY-GAP — extract from Figma 36:5 */
    /* Border/radius: FIDELITY-GAP — extract from Figma 36:5 */
  ].join(' ')}
>
  <summary
    class="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent"
    style="list-style: none; cursor: pointer;"
  >
    {/* Question text — type class FIDELITY-GAP (36:5): confirm .wl-text-body-large vs .wl-heading-h3 */}
    <span style="color: var(--color-wl-ink);">{question}</span>
    {/* Toggle indicator SVG — FIDELITY-GAP: share chevron path with ProjectCard if same */}
  </summary>
  {/* Answer prose via default slot — .wl-text-body pattern from Callout */}
  <div class="wl-text-body" style="color: var(--color-wl-sub);">
    <slot />
  </div>
</details>
```

**Slot pattern for answer prose** (Callout lines 37–58 — the `<slot />` inside a styled container):
```astro
<aside
  class:list={['wl-text-body', className]}
  style="color: var(--color-wl-sub);"
>
  <slot />
</aside>
```
FAQItem follows the same slot-for-prose convention: the `<slot />` receives the answer text; the `question` prop drives the `<summary>` text.

---

### `src/components/wl/FrequencyWave.astro` (component, transform)

**Analog:** `src/components/WaveMark.astro` (exact match: inline SVG with CSS custom property strokes)

**Full file pattern** (WaveMark.astro lines 1–55 — copy the structure exactly, swap paths):
```astro
---
interface Props {
  class?: string;
}

const { class: className = '' } = Astro.props;
---

<svg
  aria-hidden="true"
  class:list={[className]}
  xmlns="http://www.w3.org/2000/svg"
  viewBox="FIDELITY-GAP"   <!-- extract from Figma 12:2 -->
  fill="none"
>
  <!-- 5 path elements — FIDELITY-GAP: all path data from Figma 12:2 -->
  <!-- stroke="var(--color-wl-accent)" — flips #0E7078 light / #4FB3B8 dark via .dark block -->
  <!-- stroke-width: FIDELITY-GAP — extract from Figma 12:2 -->
  <!-- stroke-linecap="round" — matches WaveMark convention -->
  <path d="FIDELITY-GAP" stroke="var(--color-wl-accent)" stroke-width="FIDELITY-GAP" stroke-linecap="round"/>
  <path d="FIDELITY-GAP" stroke="var(--color-wl-accent)" stroke-width="FIDELITY-GAP" stroke-linecap="round"/>
  <path d="FIDELITY-GAP" stroke="var(--color-wl-accent)" stroke-width="FIDELITY-GAP" stroke-linecap="round"/>
  <path d="FIDELITY-GAP" stroke="var(--color-wl-accent)" stroke-width="FIDELITY-GAP" stroke-linecap="round"/>
  <path d="FIDELITY-GAP" stroke="var(--color-wl-accent)" stroke-width="FIDELITY-GAP" stroke-linecap="round"/>
</svg>
```

**Key divergence from WaveMark:** WaveMark has a `badge` variant with a `size` prop and uses `currentColor` / `#12333B` literal strokes for badge vs. bare modes. FrequencyWave is simpler — one presentation, always `var(--color-wl-accent)` stroke. No badge variant. No `size` prop. Keep the class passthrough only.

**Dark-mode behavior** (WaveMark line 51 — `currentColor` vs FrequencyWave's explicit token):
WaveMark bare mode uses `stroke="currentColor"` — FrequencyWave uses `stroke="var(--color-wl-accent)"` explicitly so the token flip from global.css applies regardless of surrounding text color.

---

### `src/data/projects.json` (config, CRUD)

**Analog:** Same file (v1 → v2 rewrite). V1 structure extracted from lines 1–26 of current file.

**V1 fields (being dropped):** `slug`, `title`, `category`, `categoryLabel`, `thumbnail`, `problem`, `solution`, `results` (array of metric objects), `technologies`, `screenshots`, `testimonial`, `draft`

**V2 required structure** (per RESEARCH.md Pattern 4):
```json
[
  {
    "id": "bakery-order-system",
    "slug": "bakery-order-system",
    "section": "client-work",
    "eyebrow": "[from Figma 12:3 — D-09 placeholder]",
    "title": "[from Figma 12:3]",
    "outcome": "[from Figma 12:3]",
    "summary": "[from Figma 12:3]",
    "tags": ["tag1", "tag2"],
    "problem": "[from Figma 12:3]",
    "built": "[from Figma 12:3]",
    "result": "[from Figma 12:3]"
  }
]
```

**Critical requirement:** Every entry MUST have `"id"` (the `file()` loader key). Use the slug value as the id. Both `id` and `slug` fields are present. Content is placeholder: Figma `12:3` expanded card copy duplicated across all entries (D-09).

---

### `src/content.config.ts` (config, CRUD)

**Analog:** `src/content.config.ts` blog collection (same file, lines 1–17)

**Existing pattern to extend** (lines 1–17):
```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    featuredImage: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

**New projects collection to add** (add `file` import, define `projects`, extend export):
```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { file } from 'astro/loaders';   // ADD

const blog = defineCollection({ /* unchanged */ });

const projects = defineCollection({
  loader: file('src/data/projects.json'),
  schema: z.object({
    // NOTE: 'id' is the loader key — Astro exposes as entry.id, NOT entry.data.id
    slug: z.string(),
    section: z.enum(['client-work', 'craft-experiments']),
    eyebrow: z.string().optional(),
    title: z.string(),
    outcome: z.string().optional(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    problem: z.string().optional(),
    built: z.string().optional(),
    result: z.string().optional(),
  }),
});

export const collections = { blog, projects };   // EXTEND
```

---

### `astro.config.mjs` redirects (config)

**Analog:** Existing `/faq` redirect in `astro.config.mjs` (lines 73–78)

**Current state** (lines 73–78):
```js
redirects: {
  '/portfolio': '/projects',
  '/portfolio/[slug]': '/projects/[slug]',
  '/contact': '/#contact',
  '/faq': '/',
},
```

**Target state** (repoint `/portfolio*` to `/`, keep others unchanged):
```js
redirects: {
  '/portfolio': '/',
  '/portfolio/[slug]': '/',
  '/contact': '/#contact',
  '/faq': '/',
},
```

Note: The old `/projects` routes 404 after page deletion — correct per D-06. No self-redirect entry to clean up (none present in current file).

---

### `scripts/check-contrast.mjs` PAIRS extension (utility, transform)

**Analog:** Existing Phase 35 additions block in `scripts/check-contrast.mjs` (lines 220–283)

**Palette constants already defined** that Phase 36 pairs reuse:
- `L_INK = '#12333B'`, `D_INK = '#EAF6F3'`
- `L_SUB = '#35525A'`, `D_SUB = '#A9C9C7'`
- `L_ACCENT = '#0E7078'`, `D_ACCENT = '#4FB3B8'`
- `CARD_WHITE = '#FFFFFF'`, `CARD_DARK = '#12333B'`

**Addition format** (copy Phase 35 additions block pattern at lines 220–283):
```js
// ── PHASE 36 ADDITIONS ───────────────────────────────────────────────────
// Source: .planning/phases/36-content-components-expandable-cards/36-UI-SPEC.md
//
// ProjectCard: ink/sub/accent text on white card surfaces (same as ServiceCard pairs above,
// but documented specifically for the ProjectCard component)
{ label: 'ProjectCard title: ink on card-bg (light)', fg: L_INK, bg: CARD_WHITE, type: 'text' },
// ... (see UI-SPEC contrast table for full pair list)
// FAQItem pairs: FIDELITY-GAP until Figma 36:5 confirms surface fill color
// Add FAQItem pairs here once surface fill hex is extracted from Figma 36:5
```

**How to add entries** (the PAIRS array uses array literals, not object literals):
```js
// Array format: [fg_hex, bg_hex, label_string, threshold_number, textUse_boolean]
[L_INK, CARD_WHITE, 'light: ProjectCard title ink on card-bg', 4.5, true],
[D_INK, CARD_DARK,  'dark: ProjectCard title ink on card-bg',  4.5, true],
```

---

### `src/pages/dev/content-components.astro` (page, temporary)

**Analog:** `src/pages/dev/primitives.astro` (git commit 549332f — retrieved from history)

**Complete file structure pattern** (primitives.astro from 549332f):
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import ProjectCard from '../../components/wl/ProjectCard.astro';
import FAQItem from '../../components/wl/FAQItem.astro';
import FrequencyWave from '../../components/wl/FrequencyWave.astro';

if (import.meta.env.PROD) {
  return Astro.redirect('/');  // DEV-gate: isolation page never ships to prod (D-14/T-01)
}
---

<BaseLayout title="Dev: Content Components - Phase 36" description="DEV-only isolation page for Phase 36 content component verification.">
  <main>

    <section style="background: var(--color-wl-paper); padding: 64px 48px;">
      <div style="max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 48px;">

        <h2 style="font-family: var(--font-wl-body); font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-wl-sub); margin: 0; padding-bottom: 8px; border-bottom: 1px solid var(--color-wl-line);">
          Phase 36 Content Components — Figma 36:5 order
        </h2>

        <!-- Component order must mirror Figma 36:5 (isolation page spec per UI-SPEC.md) -->
        <!-- ProjectCard closed state -->
        <!-- ProjectCard expanded state -->
        <!-- FAQItem group (exclusive-open via name attribute) -->
        <!-- FrequencyWave -->

      </div>
    </section>

  </main>
</BaseLayout>
```

**Section label pattern** (primitives.astro — the 11px uppercase section dividers):
```astro
<p style="font-family: var(--font-wl-body); font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-wl-sub); margin: 0 0 16px 0;">
  ProjectCard — closed state
</p>
```

**DELETE instruction** (from primitives.spec.ts header comment):
Delete both `src/pages/dev/content-components.astro` AND `tests/accessibility/content-components.spec.ts` in the final commit of the phase. Verify: `npm run build && grep -r "content-components" dist/` returns zero results.

---

### `tests/accessibility/content-components.spec.ts` (test, temporary)

**Analog:** `tests/accessibility/primitives.spec.ts` (git commit 549332f)

**Complete file structure** (primitives.spec.ts from 549332f):
```typescript
/**
 * Content components isolation page accessibility test — Phase 36 (TEMPORARY)
 *
 * DELETE this file in the final Phase 36 commit (simultaneously with src/pages/dev/content-components.astro).
 * Leaving it after deletion causes CI failure on a 404.
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { settleAnimations } from './helpers';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('Content components isolation page — Phase 36 (TEMPORARY — delete with isolation page)', () => {

  test('light mode — zero axe violations on /dev/content-components', async ({ page }) => {
    await page.goto('/dev/content-components');
    await settleAnimations(page);
    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('dark mode — zero axe violations on /dev/content-components', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    await page.goto('/dev/content-components');
    // Verify FOUC script applied .dark class (pattern: dark-mode.spec.ts line 22)
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
    await settleAnimations(page);
    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();
    expect(results.violations).toEqual([]);
    await context.close();
  });

});
```

**axe-tests.spec.ts update required:** Remove the `/projects` test at line 26–37 of `tests/accessibility/axe-tests.spec.ts` when deleting the old pages (RESEARCH.md Pitfall 6). Also remove the `/projects` dark-mode test from `dark-mode.spec.ts` (line 36–50).

---

## Shared Patterns

### Card container tokens
**Source:** `src/components/wl/ServiceCard.astro` lines 103–116
**Apply to:** `ProjectCard.astro` (same white-card surface)
```astro
style={[
  'background: var(--wl-card-bg);',
  'box-shadow: var(--wl-card-shadow);',
  'border-radius: 18px;',    /* FIDELITY-GAP: verify 36:5 matches ServiceCard */
  'padding: 32px 27px;',     /* FIDELITY-GAP: verify 36:5 */
  'border: 1px solid var(--color-wl-line);',  /* FIDELITY-GAP: verify 36:5 */
].join(' ')}
```
The `--wl-card-bg` and `--wl-card-shadow` local tokens are defined in `src/styles/global.css` `:root` + `.dark` blocks (Phase 35). No additional token definitions needed.

### Focus ring on interactive summary
**Source:** `src/components/wl/CTAButton.astro` (Tailwind focus-visible pattern, Phase 35)
**Apply to:** `<summary>` element in both `ProjectCard.astro` and `FAQItem.astro`
```astro
class="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent"
```

### `::details-content` animation CSS
**Source:** RESEARCH.md Pattern 1 (verified against Chrome Dev docs + MDN)
**Apply to:** `src/styles/global.css` (Claude's discretion — global vs. per-component `<style>`)
```css
/* Set on :root for progressive enhancement — ignored by FF/Safari (D-07) */
:root {
  interpolate-size: allow-keywords;
}

/* Baseline 2025: Chrome 131+, Firefox 143+, Safari 18.4+ */
details::details-content {
  height: 0;
  overflow: hidden;
  transition:
    height 0.3s ease,
    content-visibility 0.3s ease allow-discrete;
}

details[open]::details-content {
  height: auto;
}

@media (prefers-reduced-motion: reduce) {
  details::details-content {
    transition: none;
  }
  details .wl-toggle-indicator {
    transition: none;
  }
}
```

### Toggle indicator rotation (chevron)
**Source:** RESEARCH.md Pattern 2 (D-08: ships independently of `::details-content`)
**Apply to:** Both `ProjectCard.astro` and `FAQItem.astro` toggle indicator SVG
```css
details .wl-toggle-indicator {
  transition: transform 0.3s ease;
}
details[open] .wl-toggle-indicator {
  transform: rotate(180deg);
}
/* prefers-reduced-motion covered by shared block above */
```

### `list-style: none` on `<summary>` (cross-browser)
**Apply to:** Both `ProjectCard.astro` and `FAQItem.astro`
```astro
<summary style="list-style: none; cursor: pointer;">
```
Safari requires `list-style: none` on `<summary>` to suppress the native disclosure triangle (the `::marker` approach alone is insufficient in WebKit).

### Heading inside `<summary>` — `display: inline`
**Source:** RESEARCH.md Pattern 6 + Hassell Inclusion guidance
**Apply to:** `ProjectCard.astro` `<Heading>` inside `<summary>`
```astro
<Heading class="wl-heading-h3" style="display: inline; color: var(--color-wl-ink); margin: 0;">
  {title}
</Heading>
```

### Zero old-token constraint
**Source:** `src/components/wl/ServiceCard.astro` line 65 ("Zero old-token references (D-03). No `<script>` tag.")
**Apply to:** All three new `wl/` components. The fidelity gate greps for old neobrutalist tokens — include the comment in each component's header block.

### Inline SVG `aria-hidden` + no `<title>`
**Source:** `src/components/WaveMark.astro` line 29 (`aria-hidden="true"`)
**Apply to:** `FrequencyWave.astro` and the toggle indicator SVG inside `ProjectCard`/`FAQItem`
Decorative SVGs must be `aria-hidden="true"` with no `<title>` element; screen readers skip them entirely.

### DEV-gate redirect
**Source:** `src/pages/dev/primitives.astro` (git 549332f), frontmatter lines 11–13
**Apply to:** `src/pages/dev/content-components.astro`
```astro
if (import.meta.env.PROD) {
  return Astro.redirect('/');  // DEV-gate: isolation page never ships to production
}
```

---

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `src/pages/projects/index.astro` (DELETE) | route | — | No analog needed — pure deletion, no pattern to copy |
| `src/pages/projects/[slug].astro` (DELETE) | route | — | No analog needed — pure deletion, no pattern to copy |

---

## FIDELITY-GAP Summary for Planner

All geometry values marked `FIDELITY-GAP` below MUST be extracted from Figma via Wave 1 MCP tasks before any component CSS is written. Do NOT substitute ServiceCard values without Figma confirmation.

| Component | Gap | Figma Node |
|-----------|-----|------------|
| ProjectCard | border-radius | `36:5` |
| ProjectCard | padding (closed) | `36:5` |
| ProjectCard | summary row gaps | `36:5` |
| ProjectCard | expanded section padding-top | `36:5` |
| ProjectCard | border (color/style) | `36:5` |
| ProjectCard | toggle indicator SVG path | `36:5` |
| ProjectCard | hover state | No Figma spec (derive from ServiceCard per Phase 35 precedent) |
| FAQItem | question type class | `36:5` |
| FAQItem | question color | `36:5` |
| FAQItem | surface fill | `36:5` |
| FAQItem | padding | `36:5` |
| FAQItem | divider between items | `36:5` |
| FAQItem | toggle indicator SVG path | `36:5` |
| FrequencyWave | viewBox | `12:2` |
| FrequencyWave | all 5 path `d` values | `12:2` |
| FrequencyWave | stroke-width per line | `12:2` |
| ProjectCard v2 placeholder content | all 8 text fields | `12:3` (one entry, duplicated per D-09) |

---

## Metadata

**Analog search scope:** `src/components/wl/`, `src/components/`, `src/content.config.ts`, `astro.config.mjs`, `scripts/`, `tests/accessibility/`, `src/pages/dev/` (git history)
**Files read:** 12 (9 live files + 2 from git history via `git show 549332f`)
**Pattern extraction date:** 2026-07-16

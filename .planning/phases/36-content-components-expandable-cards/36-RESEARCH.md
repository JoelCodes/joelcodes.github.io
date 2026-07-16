# Phase 36: Content Components + Expandable Cards - Research

**Researched:** 2026-07-16
**Domain:** Native HTML `<details>`/`<summary>`, CSS `::details-content` animation, Astro 5 `file()` content loader, inline SVG theming
**Confidence:** HIGH (all critical technical claims verified via MDN, Astro official docs, caniuse)

---

## Summary

Phase 36 builds three Astro components (`ProjectCard`, `FAQItem`, `FrequencyWave`) and promotes `projects.json` to a v2 schema with a new Astro Content Collection. Every interaction mechanism is native HTML (`<details>`/`<summary>` with CSS animation) — zero JavaScript. The CSS `::details-content` pseudo-element reached Baseline 2025 status in September 2025 (Chrome 131, Firefox 143, Safari 18.4), so the progressive-enhancement strategy decided in D-07 is correct: modern browsers animate, unsupported browsers get instant open/close. Height-to-`auto` animation on `::details-content` additionally requires `interpolate-size: allow-keywords` or `calc-size()`, which is Chrome/Edge-only as of July 2026 — Firefox 143 and Safari 18.4 only partially support the combination. The correct approach is: set `interpolate-size: allow-keywords` (Chrome gains smooth height animation), rely on `content-visibility` + `allow-discrete` for the visibility transition in all supporting browsers, accept instant snap in browsers without full `interpolate-size` support.

The Astro `file()` loader for JSON arrays requires an explicit `id` field on every array object. The current `projects.json` has no `id` field (only `slug`) — this must be added to every entry during the v2 rewrite. The `slug` field does NOT auto-serve as `id` for the `file()` loader (only the `glob()` loader infers IDs from filenames). The v2 schema should carry both `id` (for the loader) and `slug` (for URL use by Phase 38).

Headings inside `<summary>` are valid per the HTML spec. Screen readers (NVDA/Firefox, VoiceOver iOS) announce heading level through the summary; TalkBack on Android does not. This matches D-02's "accept native AT flattening" decision and is not an axe-core violation — axe 4.10+ introduced a new rule for the summary element but heading-inside-summary is not flagged as a violation.

**Primary recommendation:** Follow all locked decisions (D-01 through D-10) without deviation. The one critical implementation detail not fully specified in CONTEXT.md: every `projects.json` v2 entry MUST include an `"id"` field for the Astro `file()` loader to work. Use the slug value as the id (e.g., `"id": "bakery-order-system"`).

---

## Standard Stack

### Core

| Library / Feature | Version / Status | Purpose | Why Standard |
|-------------------|-----------------|---------|--------------|
| Native `<details>`/`<summary>` | HTML living spec | Expand/collapse interactivity | Zero JS; keyboard accessible by default; axe-clean |
| `details[name]` attribute | Baseline (Chrome 120, Safari 17.2, FF 130) | Exclusive accordion for FAQItem | Native browser enforcement; no JS |
| CSS `::details-content` | Baseline 2025 (Chrome 131, FF 143, Safari 18.4) | Animate expand/collapse height | The spec-correct approach; supersedes all hacks |
| Astro `file()` loader | Astro 5 (shipped) | Single-file data collection from `projects.json` | Matches blog's `glob()` pattern; Zod schema; typed `getCollection()` |
| Inline SVG | HTML standard | FrequencyWave component | CSS `var()` strokes resolve at render; mandatory per COMP-05 |

### Supporting

| Library / Feature | Version / Status | Purpose | When to Use |
|-------------------|-----------------|---------|-------------|
| `interpolate-size: allow-keywords` | Chrome/Edge only (2026) | Enable height-to-auto animation in `::details-content` | Set on `:root` for progressive enhancement; unsupported browsers snap |
| `transition-behavior: allow-discrete` | Baseline (Chrome 117, FF 117, Safari 17.4) | Keep content visible during closing animation | Required alongside `content-visibility` transition |
| Phase 35 primitives: `Eyebrow`, `Tag` | Shipped Phase 35 | Compose into ProjectCard | Already extracted, tested, axe-clean |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `::details-content` + CSS | `max-height` hack | max-height hack requires arbitrary ceiling value; easing is wrong on close; D-07 says no fallback |
| `file()` loader | Custom inline loader | More boilerplate; no upside for a static JSON file |
| Inline SVG for FrequencyWave | `<img src>` or `<object>` | `<img>` cannot pick up CSS `var()` strokes — mandatory inline per COMP-05/SC-3 |

**Installation:** No new npm packages this phase. All dependencies are built into Astro 5 and the browser.

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── components/wl/
│   ├── ProjectCard.astro      # NEW — COMP-03
│   ├── FAQItem.astro          # NEW — COMP-04
│   └── FrequencyWave.astro    # NEW — COMP-05
├── data/
│   └── projects.json          # REWRITTEN — v1 → v2 schema
├── content.config.ts          # ADD projects collection with file() loader
└── pages/
    ├── dev/
    │   └── content-components.astro  # NEW (temp, deleted in final commit)
    └── projects/
        ├── index.astro        # DELETE (D-06)
        └── [slug].astro       # DELETE (D-06)
```

### Pattern 1: `<details>` Expand/Collapse with `::details-content`

**What:** CSS-only animation using the `::details-content` pseudo-element. The `content-visibility` property ensures the content stays visible during the closing animation; `interpolate-size: allow-keywords` enables smooth height-to-auto on Chromium.

**When to use:** Both ProjectCard and FAQItem.

**Correct CSS (add to `global.css` or component `<style>` block):**

```css
/* Baseline 2025: Chrome 131+, Firefox 143+, Safari 18.4+ */
/* Height 0→auto requires interpolate-size (Chrome/Edge) or snaps (FF/Safari) */
:root {
  interpolate-size: allow-keywords;
}

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
}
```

**Why `interpolate-size` on `:root`:** Global scope is safe because Chromium respects it
selectively per-transition; other browsers ignore it. This is the MDN/Chrome Developers
recommended progressive enhancement pattern.

**Why `content-visibility` in the transition:** Without it, the content immediately
disappears when a `<details>` closes — no closing animation is visible. This is
`transition-behavior: allow-discrete` behavior applied to a discrete property.

**What browsers get:**
- Chrome 131+ / Edge 131+: smooth height animation + smooth close
- Firefox 143+, Safari 18.4+: instant height snap, but `content-visibility` transition
  still provides a graceful visible-during-close (no jarring flash)
- Older browsers: instant open/close (functional, D-07 progressive enhancement)

### Pattern 2: Toggle Indicator Chevron Rotation

**What:** CSS `transform: rotate()` transition on an SVG `.wl-toggle-indicator` element,
triggered by `details[open]` attribute selector. Works in all browsers independently
of `::details-content` support (D-08).

```css
details .wl-toggle-indicator {
  transition: transform 0.3s ease;
}

details[open] .wl-toggle-indicator {
  transform: rotate(180deg);
}

@media (prefers-reduced-motion: reduce) {
  details .wl-toggle-indicator {
    transition: none;
  }
}
```

### Pattern 3: Exclusive-Open FAQ via `name` Attribute

**What:** All `<FAQItem>` instances on a page share a `groupName` prop; the consuming
page passes one string value. Browser enforces exclusive-open natively. Support: Chrome 120,
Safari 17.2, Firefox 130 — all major engines, safe to use without fallback.

```astro
<!-- FAQItem.astro -->
<details name={groupName}>
  <summary>...</summary>
  <slot />
</details>
```

```astro
<!-- Consuming page -->
<FAQItem question="..." groupName="faq-main">answer prose</FAQItem>
<FAQItem question="..." groupName="faq-main">answer prose</FAQItem>
```

### Pattern 4: Astro `file()` Loader for projects.json

**CRITICAL:** The `file()` loader requires an `id` field on every array object. The current
`projects.json` has no `id` field (only `slug`). The v2 rewrite MUST add `"id"` to every
entry. Using `slug` as the id value is the right call (slug is already URL-safe and unique).

```typescript
// src/content.config.ts — add this collection
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { file } from 'astro/loaders';  // import file loader

const projects = defineCollection({
  loader: file('src/data/projects.json'),
  schema: z.object({
    // id is the loader key — carry it through for reference
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

export const collections = { blog, projects };
```

```json
// src/data/projects.json v2 — array with id field on every entry
[
  {
    "id": "bakery-order-system",
    "slug": "bakery-order-system",
    "section": "client-work",
    "eyebrow": "...",
    "title": "...",
    ...
  }
]
```

**`getCollection()` usage (Phase 38 preview):**
```typescript
const projects = await getCollection('projects');
// Each entry: { id: string, data: { slug, section, title, ... } }
```

### Pattern 5: FrequencyWave Inline SVG

**What:** SVG rendered directly in the HTML document (not via `<img>`). CSS custom property
strokes resolve at paint time, giving automatic dark-mode adaptation via the `.dark` flip.

```astro
<!-- FrequencyWave.astro -->
---
interface Props { class?: string; }
const { class: className = '' } = Astro.props;
---
<svg
  aria-hidden="true"
  class:list={[className]}
  xmlns="http://www.w3.org/2000/svg"
  viewBox="..."  <!-- FIDELITY-GAP: extract from Figma 12:2 -->
>
  <!-- 5 path elements with stroke="var(--color-wl-accent)" fill="none" -->
  <!-- FIDELITY-GAP: all path data, stroke-width, line gaps from Figma extraction -->
</svg>
```

**Dark mode:** `var(--color-wl-accent)` flips from `#0E7078` (light) to `#4FB3B8` (dark)
via the `.dark` block in `global.css`. No JS, no additional dark-mode handling needed.

### Pattern 6: heading inside `<summary>`

**What:** An `<h3>` inside a `<summary>` is valid HTML per the spec ("Phrasing content or
one element of Heading content"). The heading should have `display: inline` (or `inline-block`)
applied to prevent layout conflicts with the native disclosure triangle.

**Axe behavior:** Not flagged as a violation. The `<summary>` element receives `role="button"`
from the browser's accessibility mapping; the heading inside is flattened into the accessible
label. NVDA/Firefox and VoiceOver announce heading level; TalkBack does not — this matches
D-02 "accept native AT flattening."

```astro
<!-- Inside ProjectCard.astro <summary> -->
<Eyebrow>{eyebrow}</Eyebrow>
<Heading class="wl-heading-h3" style="display: inline; color: var(--color-wl-ink); margin: 0;">
  {title}
</Heading>
```

### Pattern 7: Dev Isolation Page (DEV-gate + delete)

Reuse exact Phase 34/35 pattern:

```astro
---
// src/pages/dev/content-components.astro
if (import.meta.env.PROD) {
  return Astro.redirect('/');
}
---
```

Delete both `src/pages/dev/content-components.astro` and
`tests/accessibility/content-components.spec.ts` in the final commit of the phase.
Verify: `npm run build && grep -r "content-components" dist/` returns zero results.

### Pattern 8: Old `/projects` Pages Deletion (D-06)

**Sequence:** Delete the old pages BEFORE writing the v2 `projects.json` (or in the
same commit). This unblocks the v2 rewrite because the old pages import v1 fields that
won't exist in v2.

1. Delete `src/pages/projects/index.astro` and `src/pages/projects/[slug].astro`
2. Repoint `astro.config.mjs` redirects: `/portfolio` → `/` and `/portfolio/[slug]` → `/`
   (same treatment as `/faq → /`)
3. Also remove the stale `'/projects': '/projects'` self-redirect if present
4. Verify build is green before proceeding to v2 data work

Current redirects in `astro.config.mjs`:
```js
redirects: {
  '/portfolio': '/projects',      // repoint to '/'
  '/portfolio/[slug]': '/projects/[slug]',  // repoint to '/'
  '/contact': '/#contact',
  '/faq': '/',
},
```

After:
```js
redirects: {
  '/portfolio': '/',
  '/portfolio/[slug]': '/',
  '/contact': '/#contact',
  '/faq': '/',
},
```

Note: The old `/projects` routes themselves will 404 after page deletion — that is correct
per D-06. `/portfolio` now redirects to `/` until Phase 38 when `/showcase` exists.

### Anti-Patterns to Avoid

- **`max-height` hack for details animation:** Don't add it as a fallback. D-07 is firm:
  progressive enhancement, instant-snap is the fallback.
- **`role` overrides on `<summary>` or `<details>`:** Native roles are correct; manual
  `role="button"` etc. breaks axe-core rules.
- **`<img src="wave.svg">` for FrequencyWave:** The SVG must be inline; `<img>` cannot
  resolve CSS `var()` strokes.
- **`slug` as the `file()` loader's entry ID:** Only works if the field is literally named
  `"id"`. The `slug` field is carried separately but cannot substitute for `id`.
- **`@supports (interpolate-size: allow-keywords)` wrapping the whole animation block:**
  The Chrome Developers guide recommends setting `interpolate-size` on `:root` globally
  rather than using `@supports`, because `@supports` on interpolate-size is unreliable.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Expand/collapse toggle | JS click handler + class swap | Native `<details>`/`<summary>` | Zero JS; keyboard; AT; D-07 |
| Exclusive accordion (one-open) | JS to close siblings | `<details name="...">` | Native browser; Chrome 120/Safari 17.2/FF 130 |
| Accordion animation height | max-height hack / JS scrollHeight | CSS `::details-content` with `height: 0 → auto` | Spec-correct; no magic numbers |
| Dark-mode SVG color swap | Two SVG files / JS class check | Inline SVG + `stroke="var(--color-wl-accent)"` | Token flips automatically via `.dark` |
| JSON schema validation | Manual JS checking | Astro Zod schema in `content.config.ts` | Build-time; typed `getCollection()` |
| Focus ring on summary | Custom JS focus management | `focus-visible:outline-*` CSS | Native focus works on `<summary>`; no JS |

**Key insight:** Every interaction in this phase is achievable with HTML + CSS alone.
Introducing any JavaScript violates the zero-client-JS constraint established in Phase 34.

---

## Common Pitfalls

### Pitfall 1: Missing `id` Field in projects.json v2

**What goes wrong:** The `file()` loader silently fails or throws a build error because
none of the array entries have an `id` key. Unlike the `glob()` loader (which infers IDs
from filenames), `file()` requires explicit `id` fields.

**Why it happens:** The v1 `projects.json` uses `slug`, not `id`. The CONTEXT.md refers
to "v2 schema" without explicitly calling out this field rename requirement.

**How to avoid:** Add `"id"` to every entry in the v2 JSON. Using the slug value as the id
is correct (already unique, URL-safe). Also include `"slug"` as a separate field for Phase 38
URL generation — both fields should be present.

**Warning signs:** `ContentLoaderInvalidDataError` at build time; `getCollection('projects')`
returns an empty array.

### Pitfall 2: `::details-content` Height Animation Only Works Fully in Chromium

**What goes wrong:** The height transition (0 → auto) appears broken in Firefox and Safari
testing — elements snap open/close without animation even in supported browser versions.

**Why it happens:** `height: auto` animation requires `interpolate-size: allow-keywords`,
which as of July 2026 is only implemented in Chrome/Edge. Firefox 143 and Safari 18.4
support `::details-content` but do NOT yet support `interpolate-size`.

**How to avoid:** This is expected behavior per D-07's progressive enhancement policy.
Do NOT add a `max-height` fallback. The `content-visibility` + `allow-discrete` transition
keeps content visible during close in all supporting browsers. Document in component comment
that height snap in FF/Safari is intentional.

**Warning signs:** QA testing in Firefox/Safari reports "no animation" — this is correct,
not a bug.

### Pitfall 3: `<summary>` Heading Needs `display: inline`

**What goes wrong:** The `<h3>` inside `<summary>` renders as a block element, breaking
the layout — the disclosure triangle ends up on a separate line or the card layout breaks.

**Why it happens:** Headings are block-level by default. Inside a flex or grid `<summary>`,
the block flow conflicts with the expected inline flow.

**How to avoid:** Apply `display: inline` (or `inline-block`) directly on the heading
element inside summary. Add a comment referencing the Hassell Inclusion guidance.

### Pitfall 4: Old `/projects` Pages Break Build After v2 JSON Schema Change

**What goes wrong:** `npm run build` fails because `src/pages/projects/index.astro` and
`[slug].astro` reference v1 fields (`category`, `draft`, `technologies`, etc.) that no
longer exist after the v2 rewrite.

**Why it happens:** The deletion of old pages must happen before or in the same commit as
the v2 JSON write.

**How to avoid:** Delete old pages first (or in the same commit). Sequence: (1) delete
old pages + repoint redirects, (2) confirm build green, (3) write v2 JSON + content
collection, (4) confirm build green again.

### Pitfall 5: FrequencyWave SVG Rendered as `<img>` Instead of Inline

**What goes wrong:** Dark-mode stroke color never changes — the wave stays the same color
in both themes.

**Why it happens:** When an SVG is loaded via `<img src>`, CSS custom properties in the
browser's rendering context do not reach inside the SVG document. `var(--color-wl-accent)`
evaluates to empty.

**How to avoid:** FrequencyWave.astro must embed the SVG path data directly in its template,
not reference an external file. This is a hard requirement from SC-3 and COMP-05.

### Pitfall 6: Stale axe Test Targeting `/projects` Route

**What goes wrong:** The existing `tests/accessibility/axe-tests.spec.ts` has a test for
`/projects`. After the old pages are deleted, this test will 404 and the axe run will fail
(or pass vacuously — depending on axe-core behavior on 404 pages).

**How to avoid:** Remove or update the `/projects` test in `axe-tests.spec.ts` as part of
the old-pages deletion task. The isolation page spec (`content-components.spec.ts`) covers
Phase 36 components and is deleted at phase end.

### Pitfall 7: `getCollection()` Schema Strips the `id` Field from `data`

**What goes wrong:** `entry.data.id` is undefined — you expect it because the JSON has an
`id` field, but Astro strips it from the schema data.

**Why it happens:** The `id` field is the loader's entry identifier. Astro exposes it as
`entry.id`, NOT as `entry.data.id`. It is not part of the Zod schema.

**How to avoid:** Use `entry.id` (not `entry.data.id`) when you need the identifier.
Keep `slug` as a separate schema field if you need URL-safe slugs in `data`.

---

## Code Examples

Verified patterns from official sources and Phase 35 codebase:

### `::details-content` Animation (recommended production CSS)

Source: Chrome for Developers blog + MDN, verified 2026-07-16

```css
/* Set on :root for progressive enhancement — ignored by FF/Safari */
:root {
  interpolate-size: allow-keywords;
}

/* Baseline 2025 — Chrome 131, Firefox 143, Safari 18.4 */
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

### Astro Content Collection — `file()` Loader Pattern

Source: Astro official docs, verified 2026-07-16

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { file } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({ /* ... */ }),
});

const projects = defineCollection({
  loader: file('src/data/projects.json'),
  schema: z.object({
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

export const collections = { blog, projects };
```

### projects.json v2 Minimum Structure

```json
[
  {
    "id": "bakery-order-system",
    "slug": "bakery-order-system",
    "section": "client-work",
    "eyebrow": "Client Work",
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

### ProjectCard Props Interface

Source: 36-UI-SPEC.md (locked)

```typescript
interface Props {
  eyebrow?: string;
  title: string;
  outcome?: string;
  summary?: string;
  tags?: string[];
  problem?: string;
  built?: string;
  result?: string;
  headingLevel?: 2 | 3 | 4;  // default 3
  class?: string;
}
```

### FAQItem Props Interface

Source: 36-UI-SPEC.md (locked)

```typescript
interface Props {
  question: string;
  groupName: string;
  class?: string;
}
// default slot: answer prose
```

### Contrast Script Extension Pattern

Source: `scripts/check-contrast.mjs` Phase 35 (existing codebase)

```js
// Add before the PAIRS array close in check-contrast.mjs:
// Phase 36: ProjectCard pairs
{ label: 'ProjectCard title: ink on card-bg (light)', fg: L_INK, bg: CARD_WHITE, type: 'text' },
{ label: 'ProjectCard title: ink on card-bg (dark)', fg: D_INK, bg: CARD_DARK, type: 'text' },
{ label: 'ProjectCard body: sub on card-bg (light)', fg: L_SUB, bg: CARD_WHITE, type: 'text' },
{ label: 'ProjectCard body: sub on card-bg (dark)', fg: D_SUB, bg: CARD_DARK, type: 'text' },
// FAQItem pairs: FIDELITY-GAP until Figma extraction confirms surface fill
```

### Temporary axe Spec Pattern

Source: Phase 35 isolation page pattern + existing axe-tests.spec.ts

```typescript
// tests/accessibility/content-components.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { settleAnimations } from './helpers';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('Content Components Accessibility (Phase 36)', () => {
  test('light mode: zero axe violations', async ({ page }) => {
    await page.goto('/dev/content-components');
    await settleAnimations(page);
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });

  test('dark mode: zero axe violations', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    await page.goto('/dev/content-components');
    await settleAnimations(page);
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
    await context.close();
  });
});
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|-----------------|--------------|--------|
| `max-height` hack for details animation | CSS `::details-content` height 0→auto | September 2025 (Baseline 2025) | No more magic ceiling values; spec-correct |
| JS accordion for exclusive-open | `<details name="...">` | Chrome 120 / Safari 17.2 / FF 130 (2023-2024) | Zero JS exclusive accordion |
| Astro v4 `slug` field inference | Astro v5 `id` field (explicit, required) | Astro 5.0 (2024) | Must add `id` to every JSON array entry |
| `role="button"` on `<summary>` | No ARIA override needed | Ongoing spec clarification | Browser already exposes `role=button`; manual override breaks axe |

**Deprecated/outdated in this codebase:**

- v1 `projects.json` fields: `category`, `categoryLabel`, `thumbnail`, `screenshots`, `testimonial`, `technologies`, `results` (array), `solution`, `draft` — all dropped in v2 rewrite
- `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro` — deleted this phase (D-06)
- `'/portfolio': '/projects'` redirect — repointed to `'/'` this phase

---

## Open Questions

1. **`::details-content` closing animation in Firefox/Safari**
   - What we know: FF 143 and Safari 18.4 support `::details-content` but not `interpolate-size`. The content will snap open/close for height.
   - What's unclear: Whether `content-visibility` + `allow-discrete` alone (without smooth height) gives an acceptable UX, or if the snap is jarring enough to reconsider.
   - Recommendation: Test in Firefox during implementation. D-07 is explicit that snap is acceptable. If Joel disagrees after seeing it, height could be transitioned with a fixed fallback value instead — but this reopens the max-height discussion.

2. **All geometry FIDELITY-GAPSs**
   - What we know: ProjectCard border-radius, padding, gap values; FAQItem surface fill, indicator SVG; FrequencyWave viewBox and path data — all declared FIDELITY-GAP in 36-UI-SPEC.md.
   - What's unclear: Exact values (by design — must be extracted from Figma nodes 36:5, 12:3, 12:2).
   - Recommendation: Wave 1 of the plan must be Figma extraction tasks. Do not proceed to component implementation without extracted values.

3. **`file()` loader and the `schema` `id` field exclusion**
   - What we know: `entry.id` is available but is NOT in `entry.data` (Astro strips the loader key from the schema).
   - What's unclear: Whether downstream Phase 38 `getCollection()` calls need `id` available in `data` for URL generation.
   - Recommendation: Include `slug` as a separate schema field (already in v2 schema above). Phase 38 uses `entry.data.slug` for URL construction, not `entry.id`.

---

## FIDELITY-GAP Inventory

All of these require Figma MCP extraction in Wave 1 before any component CSS is written:

| Gap | Source Node | What to Extract |
|-----|-------------|----------------|
| ProjectCard border-radius | `36:5` Project Card closed | Radius value (likely 18px per ServiceCard precedent, but must confirm) |
| ProjectCard border | `36:5` Project Card closed | Line token or literal |
| ProjectCard closed padding | `36:5` Project Card closed | Top/right/bottom/left padding |
| ProjectCard summary row gaps | `36:5` | Gap between eyebrow, title, outcome, tags, chevron |
| ProjectCard expanded section padding-top | `36:5` expanded | Top padding of expanded panel |
| ProjectCard section divider | `36:5` expanded | `1px solid var(--color-wl-line)` assumed — confirm |
| ProjectCard section label type class | `36:5` expanded | Likely `.wl-label-eyebrow` — confirm |
| ProjectCard toggle indicator SVG | `36:5` | Path data for chevron/indicator; confirm down-closed/up-open |
| ProjectCard hover state | No Figma hover spec | Derive from ServiceCard (Joel approved derived hover at Phase 35 gate) |
| FAQItem question type class | `36:5` FAQ Item | Confirm `.wl-text-body-large` (17px) vs `.wl-heading-h3` (21px) |
| FAQItem question color | `36:5` | `var(--color-wl-ink)` assumed — confirm |
| FAQItem surface fill | `36:5` | Paper, sea-glass, or dedicated fill |
| FAQItem padding | `36:5` | Top/right/bottom/left of closed and expanded states |
| FAQItem divider | `36:5` | Color/style between items |
| FAQItem toggle indicator SVG | `36:5` | Chevron path data — may share with ProjectCard |
| FrequencyWave viewBox | `12:2` landing section | viewBox dimensions |
| FrequencyWave path data | `12:2` | All 5 line paths |
| FrequencyWave stroke-width | `12:2` | Line weight |
| FrequencyWave line spacing | `12:2` | Gap between the 5 lines |
| Isolation page component order | `36:5` | Render order to match Figma layout |
| ProjectCard content (v2 placeholder) | `12:3` expanded state | All 8 text fields verbatim (D-09: one entry's copy duplicated across all) |

---

## Sources

### Primary (HIGH confidence)

- MDN `::details-content` — https://developer.mozilla.org/en-US/docs/Web/CSS/::details-content — browser support (Baseline 2025), CSS syntax
- Chrome for Developers — https://developer.chrome.com/blog/styling-details — `interpolate-size` + `content-visibility allow-discrete` pattern
- Astro Content Collections official docs — https://docs.astro.build/en/guides/content-collections/ — `file()` loader id requirement
- Astro Content Loader API reference — https://docs.astro.build/en/reference/content-loader-reference/ — explicit `id` field docs
- MDN `interpolate-size` — https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size — Chrome/Edge only as of 2026
- Caniuse `interpolate-size` — https://caniuse.com/mdn-css_properties_interpolate-size_allow-keywords — Firefox/Safari not supported
- Existing codebase: `scripts/check-contrast.mjs`, `tests/accessibility/helpers.ts`, `src/components/wl/ServiceCard.astro`, `src/components/wl/Tag.astro`, `src/components/wl/Eyebrow.astro`, `src/content.config.ts`, `astro.config.mjs`

### Secondary (MEDIUM confidence)

- modern-css.com `::details-content` animation guide — https://modern-css.com/animating-details-without-javascript-height/ — Chrome 131 / FF 143 / Safari 18.4 version numbers; confirmed by MDN Baseline date
- Hassell Inclusion accessible accordions — https://hassellinclusion.com/blog/accessible-accordions-part-2-using-details-summary/ — heading-inside-summary screen reader behavior (NVDA/VoiceOver announce level; TalkBack doesn't)
- Vaihe blog — https://vaihe.com/blog/can-html-summary-by-heading-element/ — heading in summary is valid HTML spec; display:inline needed
- MDN `details[name]` blog — https://developer.mozilla.org/en-US/blog/html-details-exclusive-accordions — exclusive accordion browser support confirmed

### Tertiary (LOW confidence)

- Astro GitHub issue #13536 — https://github.com/withastro/astro/issues/13536 — `file()` loader JSON schema bug (P3 minor, schema type `object` vs `array`). Flagged as potential gotcha but not a blocking issue for normal use.

---

## Metadata

**Confidence breakdown:**
- `::details-content` animation: HIGH — MDN + Chrome Dev docs, September 2025 Baseline
- `interpolate-size` limits (FF/Safari): HIGH — caniuse data verified July 2026
- `details[name]` exclusive accordion: HIGH — MDN confirmed; Chrome 120/Safari 17.2/FF 130
- `file()` loader `id` requirement: HIGH — Astro official docs explicit
- Heading-inside-summary a11y: MEDIUM — testing documented in Hassell Inclusion; no axe rule found, but behavior inconsistent across ATs
- FIDELITY-GAP values (all geometry): Not researchable — require Figma extraction at execution

**Research date:** 2026-07-16
**Valid until:** 2026-08-16 (stable browser APIs; Astro API unlikely to change in 30 days)

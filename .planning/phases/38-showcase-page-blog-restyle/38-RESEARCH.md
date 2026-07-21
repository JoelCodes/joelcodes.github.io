# Phase 38: Showcase Page + Blog Restyle - Research

**Researched:** 2026-07-18
**Domain:** Astro page assembly, astro-expressive-code theming, blog prose styling, dev-gate patterns, Figma frame drafting mechanics
**Confidence:** HIGH — all findings verified from actual source files or official documentation

---

## Summary

Phase 38 assembles two surfaces on top of a complete component library. The Showcase page (`/showcase`) consumes the already-built `ProjectCard.astro` and the existing `projects.json` content collection — both are ready; the page itself does not yet exist. The blog restyle replaces all neobrutalist tokens/components in three existing pages (`blog/index.astro`, `blog/[slug].astro`, `blog/tags/[tag].astro`) with Wavelength brand styles, and adds a new `BlogCard`-equivalent component (the "blog list entry" for D-11's single-column editorial layout) that does not yet exist in `src/components/wl/`.

A critical sequencing constraint governs this phase: blog frames do not exist in Figma. The phase begins with a `use_figma` task to draft blog frames (index + post at 1440/390), which then awaits Joel's approval before any blog build work proceeds. Showcase work runs concurrently while frames are reviewed.

The landing page (`src/pages/index.astro`) is the authoritative precedent for every structural pattern in this phase: section backgrounds, dark gradient recipe, gutter/padding conventions, token usage, the inline-style-vs-class rule for dark overrides, and the copy-gap protocol.

**Primary recommendation:** Build the showcase first (frame `12:3` is the spec, component library is complete). Draft blog frames via `use_figma` in the same early task batch. Gate blog build on Joel's Figma approval. Restyle blog pages in-place; replace `.prose` scope with `.wl-prose`; configure expressive-code `themes`/`themeCssSelector`/`useDarkModeMediaQuery` to follow the `.dark` class.

---

## Standard Stack

### Core (already installed — no new dependencies)

| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| `astro` | 5.x | Page routing, `getCollection()`, `getStaticPaths()` | Already used |
| `astro-expressive-code` | 0.41.6 | MDX code block rendering | Already installed; needs config change |
| `@astrojs/mdx` | current | MDX rendering for blog posts | Already wired |
| `astro:content` | built-in | `getCollection('projects')`, `getCollection('blog')` | Already configured |
| `reading-time-estimator` | current | Blog post reading time | Already used in blog pages |

### No new packages needed

All component and styling primitives exist. The blog list entry component is a new `.astro` file in `src/components/wl/` using existing design tokens — no library required.

**`@tailwindcss/typography` is NOT present and NOT needed.** The `.wl-prose` scope is a hand-authored CSS class in `global.css` following the same pattern as the current `.prose` class. This matches D-13 and preserves namespace isolation.

**Installation:**
No new installs. All dependencies are present.

---

## Architecture Patterns

### Dev-gate pattern (HIGH confidence — verified from source)

**Exact pattern used for blog (Phase 34 D-13), to be replicated for `/showcase`:**

**Page-level guard** (for pages without `getStaticPaths`):
```typescript
// src/pages/showcase.astro
if (import.meta.env.PROD) {
  return Astro.redirect('/');
}
```

**Dynamic routes** (`getStaticPaths`-based):
```typescript
export async function getStaticPaths() {
  if (import.meta.env.PROD) return [];
  // ... rest
}
```

**Sitemap filter** (already in `astro.config.mjs` line ~100):
```javascript
sitemap({
  filter: (page) => !page.includes('/blog'),
  // Add showcase:
  filter: (page) => !page.includes('/blog') && !page.includes('/showcase'),
})
```

**Nav link gate** (verified pattern from `SiteHeader.astro`):
```typescript
const isDev = import.meta.env.DEV;
// Then in template:
{isDev && <a href="/showcase">Showcase</a>}
// Or for non-blog nav link that currently shows in prod:
// The Showcase link is currently ungated — D-02 requires gating it
```

**IMPORTANT:** The `/showcase` link is currently ungated in `SiteHeader.astro` (it renders in prod pointing at a non-existent page). D-02 requires adding `{isDev && ...}` around the Showcase link in both desktop and mobile navs. This removes the dead prod link immediately.

### Showcase page structure (HIGH confidence — verified from CONTEXT.md D-01/D-03/D-16)

```
src/pages/showcase.astro          ← new page (dev-gated)
src/components/wl/ProjectCard.astro ← already built, not modified
src/data/projects.json             ← extend to Figma card count (D-03)
src/content.config.ts              ← unchanged
```

**Data loading pattern** (from `content.config.ts` + Phase 36 D-05):
```typescript
import { getCollection } from 'astro:content';

const projects = await getCollection('projects');
const clientWork = projects.filter(p => p.data.section === 'client-work');
const craftExperiments = projects.filter(p => p.data.section === 'craft-experiments');
```

Note: `entry.id` is the file-loader key; `entry.data.slug` is the slug field from JSON. The `getStaticPaths` guard pattern uses `if (import.meta.env.PROD) return [];` — but `showcase.astro` is not a dynamic route, so it uses the `return Astro.redirect('/')` page-level guard instead.

### Showcase section backgrounds / dark recipe (HIGH confidence — from landing source)

Per D-04, showcase sections mirror the landing dark recipe extracted from frame `117:103`. The landing's section background pairs (verified from `src/pages/index.astro`):

| Section type | Light | Dark (Tailwind class) |
|---|---|---|
| Sea-glass gradient | `linear-gradient(to_bottom,#E6F1F1,#D2E7E7)` | `linear-gradient(to_bottom,#123640,#0C2228)` |
| Sea-glass subtle gradient | `linear-gradient(to_bottom,#EFF7F6,#E6F1F1)` | `linear-gradient(to_bottom,#10303A,#0E2B33)` |
| Paper (token) | `var(--color-wl-paper)` | flips via token |
| Always-dark ink strip | `#12333B` | `#16343C` |

**Rule:** Background must be a `class` (not `style`) so `dark:` can override — inline style beats class specificity (Rule 1 from landing source). Pattern: `class="[background:...] dark:[background:...]"`.

### Blog restyle pattern (HIGH confidence — from source files)

All three blog pages restyle in-place (no URL changes, no file moves). The restyle:

1. Replace `import BlogCard from '../../components/BlogCard.astro'` with the new `src/components/wl/BlogCard.astro` (name subject to D-11/D-13 — "blog list entry" component, new in this phase)
2. Replace all old neobrutalist token classes (`text-turquoise`, `font-heading`, `text-text-muted-light`, etc.) with `wl-*` equivalents
3. Replace `class="prose"` on the MDX content wrapper in `[slug].astro` with `class="wl-prose"`
4. Fix `loading="lazy"` → `loading="eager"` on featured image in `[slug].astro` line 89
5. Remove the tag filter JS and neobrutalist `Button` import from `blog/index.astro` — D-11's editorial list needs no JS filter
6. Remove `TableOfContents` import from `[slug].astro` — not part of the Wavelength blog design (not in Figma frames; when frames are approved, follow frames)

**Current neobrutalist imports in blog pages (verified):**
- `blog/index.astro`: `BlogCard` (old), `Button` (old `ui/Button.astro`), `reading-time-estimator`
- `blog/[slug].astro`: `TableOfContents`, `reading-time-estimator`; has `loading="lazy"` LCP bug at line 89
- `blog/tags/[tag].astro`: `BlogCard` (old)

All three pages already have `if (import.meta.env.PROD) return [];` / `Astro.redirect('/')` guards from Phase 34 — do not remove these.

### `.wl-prose` scope for MDX content (HIGH confidence — from global.css)

The existing `.prose` class (lines ~489–640 of `global.css`) is an entirely neobrutalist scope using old tokens (`var(--color-accent-teal)`, `var(--font-heading)`, `var(--color-text-muted-light)`). It must NOT be edited (Phase 41 cleanup). Create a new `.wl-prose` scope below it.

**Pattern from landing source** — follow the same inline-style-as-class pattern from other wl components. The `.wl-prose` scope handles:
- `h2`, `h3`, `h4` — Fraunces via `var(--font-wl-heading)`, sizes from `.wl-heading-*` values
- `p` — Hanken Grotesk via `var(--font-wl-body)`, `var(--color-wl-sub)`
- `a` — `var(--color-wl-accent)` with underline, hover darkens
- `blockquote` — left border `var(--color-wl-accent)`, italic
- `ul`/`ol`/`li` — standard indentation
- `strong` — ink color, weight 600
- `code` (inline) — `var(--color-wl-sea-glass)` background tint
- `hr` — `1px solid var(--color-wl-line)`
- `img` — radius 8px, margin

Dark mode: follow the semantic dark flip pattern — each `--wl-*` token already flips in `.dark`, so no separate `dark:` overrides needed for token-based properties. Only literal color values need `.dark .wl-prose ...` rules.

**No `@tailwindcss/typography` plugin.** The project does not use it; D-13 explicitly describes the inline `.wl-prose` scope approach.

### expressive-code theming for `.dark` class (HIGH confidence — verified from official docs)

Current config in `astro.config.mjs` line 97: `expressiveCode()` — no options, uses default `github-dark` + `github-light` with `prefers-color-scheme` media query.

The site uses class-based dark mode (`.dark` on `<html>`), not `prefers-color-scheme`. The current expressive-code config is mismatched — code blocks switch on system preference, not on the `.dark` class toggle.

**Fix:**
```javascript
// astro.config.mjs
expressiveCode({
  themes: ['github-light', 'github-dark'],
  themeCssSelector: (theme) => {
    return theme.name === 'github-dark' ? '.dark' : ':not(.dark)'
  },
  useDarkModeMediaQuery: false,
}),
```

This makes code blocks respond to the same `.dark` class that controls all other site theming.

**For brand-custom themes:** The `themes` option accepts `ExpressiveCodeTheme` objects with custom color maps. If visual fidelity requires brand colors (D-13: "rethemed to the brand palette"), a custom theme object can be constructed. However, the minimal correct fix is aligning the selector first; brand palette theming is additive.

The `customizeTheme` callback can adjust hue/chroma on an existing theme without full theme authorship:
```javascript
customizeTheme: (theme) => {
  // Optionally adjust theme colors toward brand palette
  return theme;
},
```

Source: https://expressive-code.com/guides/themes/ + https://expressive-code.com/reference/configuration/#themecssroot

### Blog list entry component (HIGH confidence — from CONTEXT.md D-11/D-13)

**Does not exist yet.** `src/components/BlogCard.astro` (old, root `components/`) is the neobrutalist predecessor — it renders a card grid item with neobrutalist tokens. The new component goes in `src/components/wl/` per Phase 35 D-03 convention.

**From D-11:** Single-column editorial list entry, not a card grid. Props per Phase 35 D-08 convention (props-for-data, slot-for-prose):
```typescript
interface Props {
  title: string;          // post title
  slug: string;           // for href="/blog/{slug}"
  pubDate: Date;          // formatted display date
  description: string;    // lede text
  tags?: string[];        // tag pills using <Tag> component
  featuredImage?: string; // small thumbnail (optional per D-11)
  readingTime?: number;   // minutes
}
```

Component uses `<Tag>` from `src/components/wl/Tag.astro` for tag pills. Breadcrumb back-link uses `<Breadcrumb>`. Heading level: `h2` since it's a list item within a `<section>` headed by an `<h1>`. Full component name TBD from Figma frame approval — CONTEXT.md refers to "blog list entry" and notes LinkCard as nearest existing primitive.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Dev/prod page exclusion | Custom build plugin | `import.meta.env.PROD` guard + empty `getStaticPaths()` | Already proven in Phase 34; the exact pattern is in the blog pages |
| Sitemap exclusion | Manual robots.txt edits | `sitemap({ filter: ... })` in `astro.config.mjs` | Already used for blog; extend filter |
| Dark mode code block theming | CSS overrides on `.ec-*` selectors | `themeCssSelector` + `useDarkModeMediaQuery: false` in expressive-code config | The config option is designed for exactly this use case |
| Tag display | Custom styled spans | `<Tag>` from `src/components/wl/Tag.astro` | Already built and fidelity-gated in Phase 36 |
| Back-to-blog navigation | Custom styled anchor | `<Breadcrumb>` from `src/components/wl/Breadcrumb.astro` | Built in Phase 35 |
| CTA buttons | New button component | `<CTAButton>` from `src/components/wl/CTAButton.astro` | Built in Phase 35 with all variants |
| Eyebrow labels | Custom styled spans | `<Eyebrow>` (light and `onDark` prop) | Built in Phase 35 |
| Typography prose styling | `@tailwindcss/typography` | Hand-authored `.wl-prose` in `global.css` | Maintains namespace isolation; plugin not installed |

---

## Common Pitfalls

### Pitfall 1: Inline style blocking dark: class override (Rule 1)

**What goes wrong:** Setting `background` as an inline `style` attribute means `dark:[background:...]` Tailwind classes cannot override it — inline styles have higher specificity than class-based styles.

**Why it happens:** Writing `style="background: ..."` feels natural; the dark override fails silently.

**How to avoid:** For any property that needs a dark mode override, use the `class` attribute with arbitrary value syntax: `class="[background:...] dark:[background:...]"`. This is the established pattern throughout `src/pages/index.astro`.

**Warning signs:** Dark mode section backgrounds showing light colors; code review finding `style="background:` with no corresponding dark treatment.

### Pitfall 2: Showcase `/showcase` link is currently ungated in production

**What goes wrong:** `SiteHeader.astro` renders the `/showcase` link unconditionally (no `isDev` guard on lines 38-42 desktop + lines 60-62 mobile). This is a dead link in prod. D-02 requires gating it dev-only.

**How to avoid:** The first task touching `SiteHeader.astro` must wrap the Showcase `<a>` elements in `{isDev && ...}`. Pattern already demonstrated for the Blog link (lines 46-51).

### Pitfall 3: `loading="lazy"` on featured image at LCP position

**What goes wrong:** `src/pages/blog/[slug].astro` line 89 has `loading="lazy"` on the featured image. This is the LCP element (largest content paint). Lazy-loading the LCP image defers it, hurting Lighthouse LCP score.

**How to avoid:** Change to `loading="eager"`. This is Roadmap Criterion 3 and is explicitly called out in FOUND-04 (Lighthouse `lcp-lazy-loaded` audit re-enabled). The fix is one attribute change.

### Pitfall 4: expressive-code media query mismatch

**What goes wrong:** Default `expressiveCode()` generates `@media (prefers-color-scheme: dark)` for dark code blocks. The site uses `class="dark"` on `<html>`, not system preference. Code blocks display the wrong theme.

**How to avoid:** Set `themeCssSelector` and `useDarkModeMediaQuery: false` in the expressive-code config. Verified from official docs.

### Pitfall 5: `entry.id` vs `entry.data.slug` confusion

**What goes wrong:** The `projects` collection uses `file()` loader. Per `content.config.ts` note: `id` is the file-loader key exposed as `entry.id`, NOT `entry.data.id`. The URL slug field is `entry.data.slug`. Phase 38 uses `entry.data.slug` for any URL construction.

**How to avoid:** Use `entry.data.slug` for hrefs. Use `entry.id` only for collection-internal keying. This pitfall is documented in `content.config.ts` lines 18-20.

### Pitfall 6: BlogCard name collision

**What goes wrong:** `src/components/BlogCard.astro` already exists (old neobrutalist, in root `components/`). Creating `src/components/wl/BlogCard.astro` with the same name in a different folder can cause import confusion.

**How to avoid:** The new component lives in `src/components/wl/` per Phase 35 convention. Imports in the restyled blog pages use the `wl/` path explicitly. The old `src/components/BlogCard.astro` is a Phase 41 cleanup target — leave it untouched this phase.

### Pitfall 7: Blog frames approved before build starts (hard checkpoint)

**What goes wrong:** Starting blog build work without Joel's Figma approval violates D-05/D-06/D-08. The plan must surface a human-approval checkpoint that blocks blog tasks.

**How to avoid:** The plan must place an explicit APPROVAL CHECKPOINT task after the frame-drafting task and before any blog page/component build tasks. The checkpoint is a hard stop in the plan chain — `--chain` continues on showcase work only.

---

## Code Examples

### Dev-gate for a non-dynamic page (`showcase.astro`)
```typescript
// Source: blog/index.astro (Phase 34 D-13 pattern — verified)
if (import.meta.env.PROD) {
  return Astro.redirect('/');
}
```

### getCollection for showcase sections
```typescript
// Source: content.config.ts + Phase 36 D-05 schema
import { getCollection } from 'astro:content';

const projects = await getCollection('projects');
const clientWork = projects.filter(p => p.data.section === 'client-work');
const craftExperiments = projects.filter(p => p.data.section === 'craft-experiments');
```

### ProjectCard usage (no modification needed)
```astro
<!-- Source: src/components/wl/ProjectCard.astro props interface (verified) -->
<ProjectCard
  eyebrow={project.data.eyebrow}
  title={project.data.title}
  outcome={project.data.outcome}
  summary={project.data.summary}
  tags={project.data.tags}
  problem={project.data.problem}
  built={project.data.built}
  result={project.data.result}
  thumbLabel={project.data.thumbLabel}
  headingLevel={3}
/>
```

### expressive-code config with `.dark` class alignment
```javascript
// Source: https://expressive-code.com/reference/configuration/#themecssroot
// astro.config.mjs
expressiveCode({
  themes: ['github-light', 'github-dark'],
  themeCssSelector: (theme) => {
    return theme.name === 'github-dark' ? '.dark' : ':not(.dark)';
  },
  useDarkModeMediaQuery: false,
}),
```

### SiteHeader Showcase link gate (D-02)
```astro
<!-- Source: SiteHeader.astro line 46-51 Blog link pattern (verified) -->
<!-- Desktop nav: -->
{isDev && (
  <a
    href="/showcase"
    aria-current={currentPath === '/showcase' ? 'page' : undefined}
    class="wl-nav-link text-wl-ink hover:text-wl-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent"
  >Showcase</a>
)}
<!-- Same gate needed in mobile nav -->
```

### Featured image LCP fix
```astro
<!-- Source: src/pages/blog/[slug].astro line 89 (verified bug location) -->
<!-- BEFORE (bug): -->
<img loading="lazy" ... />
<!-- AFTER (fix): -->
<img loading="eager" ... />
```

### Sitemap filter extension
```javascript
// Source: astro.config.mjs lines 99-104 (verified)
sitemap({
  filter: (page) => !page.includes('/blog') && !page.includes('/showcase'),
  // ... rest unchanged
}),
```

### Section with dark gradient (landing precedent)
```astro
<!-- Source: src/pages/index.astro Hero section (verified Rule 1 pattern) -->
<section
  style="position: relative; min-height: 840px; ..."
  class="[background:linear-gradient(to_bottom,#E6F1F1,#D2E7E7)] dark:[background:linear-gradient(to_bottom,#123640,#0C2228)]"
>
```

---

## State of the Art

| Old Approach | Current Approach | Status | Impact |
|---|---|---|---|
| `class="prose"` in blog post | Replace with `class="wl-prose"` | Phase 38 task | New scope in global.css, old prose scope untouched until Phase 41 |
| `expressiveCode()` bare (prefers-color-scheme) | `expressiveCode({ themes, themeCssSelector, useDarkModeMediaQuery: false })` | Phase 38 task | Aligns code blocks with .dark class |
| `loading="lazy"` on LCP image | `loading="eager"` | Phase 38 task | Fixes Lighthouse lcp-lazy-loaded audit |
| Old neobrutalist `BlogCard.astro` | New `src/components/wl/BlogCard.astro` (Figma-derived, single-column editorial) | Phase 38 task | Matches Wavelength brand; old file is Phase 41 cleanup |
| Showcase nav link ungated in prod | Showcase link dev-only via `{isDev && ...}` | Phase 38 first task | Removes dead prod link immediately |

**Deprecated items in blog pages (replaced in Phase 38, deleted in Phase 41):**
- `src/components/BlogCard.astro`: Old neobrutalist card grid component — replaced by new wl/ component
- `src/components/TableOfContents.astro`: Used in `[slug].astro` — not part of Wavelength blog design; removed in restyle
- Filter buttons JS block in `blog/index.astro`: Neobrutalist tag-filter interaction — D-11's editorial list has no JS filtering
- Old `Button` import in `blog/index.astro`: The `ui/Button.astro` component from Phase 34/35's old layer

---

## Open Questions

1. **Figma frame `12:3` card count per section**
   - What we know: Two placeholder entries in `projects.json` — one `client-work`, one `craft-experiments`. D-03 says duplicate to match Figma card count.
   - What's unclear: The exact count in each section requires reading frame `12:3` via figma-desktop MCP before the showcase plan task.
   - Recommendation: The plan should include a Figma extraction task for frame `12:3` section structure/card count as the first showcase task.

2. **Blog frame component structure**
   - What we know: D-11 specifies single-column editorial — title, date, description, tags, possibly thumbnail. D-13 requires Fraunces/Hanken and wl-accent links. CONTEXT.md says frames don't exist yet.
   - What's unclear: Exact layout geometry, thumbnail size, whether date is styled as eyebrow/small, spacing — all awaits frame approval.
   - Recommendation: Plan should gate all blog component sizing decisions on approved frames. Use `[COPY GAP]` / `[DESIGN GAP]` markers for any geometry not derivable from the approved frames.

3. **Blog post layout: TOC removal**
   - What we know: `[slug].astro` currently has a 3-column layout (TOC sticky left, article center, empty right). D-12 specifies "title-first, image below, then prose." No TOC in Figma.
   - What's unclear: Whether to completely remove TOC or hide it — since frames don't exist yet, the approved frame is the authority.
   - Recommendation: Remove TOC and the 3-column grid in the restyle; the Wavelength post layout is column-centric (article max-width, no sidebar). Flag for approval at fidelity gate.

4. **`use_figma` + figma-use skill prerequisite**
   - What we know: CONTEXT.md canonical refs state frame writing needs the claude.ai Figma MCP (`use_figma` + "mandatory figma-use skill prerequisite"). The system prompt shows this MCP is available.
   - What's unclear: Whether the figma-use skill is loaded via `skill://figma/figma-use/SKILL.md` or a local file. No skills directory found in project.
   - Recommendation: The plan task for drafting blog frames must include "Read figma-use skill via `skill://figma/figma-use/SKILL.md` before calling `use_figma`" as its first step, per the MCP server instructions.

---

## Sources

### Primary (HIGH confidence)
- `src/pages/blog/index.astro` — current prod-exclusion guard, old component imports, filter JS structure
- `src/pages/blog/[slug].astro` — `loading="lazy"` bug at line 89, TOC usage, 3-column layout, old prose scope
- `src/pages/blog/tags/[tag].astro` — `getStaticPaths` guard, BlogCard usage
- `src/components/layout/SiteHeader.astro` — isDev pattern, current ungated Showcase link, Blog link gate model
- `src/components/wl/ProjectCard.astro` — full props interface, component behavior, heading level contract
- `src/data/projects.json` — current 2-entry structure, section values, all v2 schema fields
- `src/content.config.ts` — projects collection schema with `file()` loader, blog schema, `entry.id` pitfall documented
- `src/styles/global.css` — full `.wl-*` type ramp, `.prose` scope location, token definitions, dark flip mechanism
- `astro.config.mjs` — current `expressiveCode()` bare call (line 97), sitemap filter pattern (lines 99-104), full redirect map
- `src/pages/index.astro` — landing page precedents for section backgrounds, dark gradient literals, Rule 1 pattern, always-dark section, BOOKING_URL usage
- `https://expressive-code.com/reference/configuration/#themecssroot` — `themeCssSelector`, `useDarkModeMediaQuery` options
- `https://expressive-code.com/guides/themes/` — class-based dark mode configuration pattern

### Secondary (MEDIUM confidence)
- `.planning/phases/38-showcase-page-blog-restyle/38-CONTEXT.md` — locked decisions D-01 through D-16
- `.planning/phases/36-content-components-expandable-cards/36-CONTEXT.md` — ProjectCard contracts, content collection conventions
- `.planning/phases/37-landing-page/37-CONTEXT.md` — landing dark recipe source (D-04 authority)
- `.planning/phases/34-baselayout-chrome/34-CONTEXT.md` — blog gate D-11/D-12/D-13 authoritative source

### Tertiary (LOW confidence — training knowledge, no external verification)
- `@tailwindcss/typography` absence confirmed by `package.json` grep — not an alternative to consider

---

## Metadata

**Confidence breakdown:**
- Dev-gate mechanics: HIGH — verified from actual source files that implement the pattern
- Showcase page structure: HIGH — ProjectCard props and collection schema verified from source
- expressive-code theming: HIGH — verified from official docs with code example
- Blog restyle scope: HIGH — all three blog pages read; neobrutalist tokens identified line-by-line
- `.wl-prose` scope approach: HIGH — existing `.prose` pattern read; no `@tailwindcss/typography` in package.json
- Dark recipe values: HIGH — literal gradient values verified from `src/pages/index.astro`
- Blog frames / Figma write mechanics: LOW (frames don't exist yet; `use_figma` skill mechanics depend on skill file content)

**Research date:** 2026-07-18
**Valid until:** 2026-08-15 (stable Astro/expressive-code APIs; design decisions locked in CONTEXT.md)

# Phase 38: Showcase Page + Blog Restyle — Pattern Map

**Mapped:** 2026-07-18
**Files analyzed:** 9 new/modified files
**Analogs found:** 9 / 9

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `src/pages/showcase.astro` | page | request-response (getCollection) | `src/pages/index.astro` + `src/pages/blog/index.astro` | exact (gated collection page) |
| `src/components/wl/BlogCard.astro` | component | transform (props → HTML) | `src/components/wl/LinkCard.astro` | role-match (wl/ card primitive, same prop-for-data API) |
| `src/pages/blog/index.astro` | page (restyle) | request-response (getCollection) | self (current file is the direct before) + `src/pages/index.astro` (wl section pattern) | self-analog |
| `src/pages/blog/[slug].astro` | page (restyle) | request-response (getStaticPaths + render) | self (current file is the direct before) | self-analog |
| `src/pages/blog/tags/[tag].astro` | page (restyle) | request-response (getStaticPaths) | self (current file is the direct before) | self-analog |
| `src/components/layout/SiteHeader.astro` | component (edit) | request-response | self (isDev pattern for Blog link already at lines 46–51) | self-analog (one-pattern copy) |
| `src/styles/global.css` (.wl-prose scope) | utility (new scope) | transform | `src/styles/global.css` lines 489–642 (`.prose` scope) | exact (same file, parallel scope) |
| `astro.config.mjs` (expressiveCode + sitemap) | config (edit) | — | self (lines 97–104 contain both patterns to extend) | self-analog |
| `scripts/check-contrast.mjs` (PAIRS extension) | utility (edit) | — | self (PAIRS array, lines 171–277) | self-analog |

---

## Pattern Assignments

---

### `src/pages/showcase.astro` (page, request-response)

**Primary analog:** `src/pages/blog/index.astro` (dev-gate pattern)
**Secondary analog:** `src/pages/index.astro` (wl section structure, dark-gradient class pattern)

**Dev-gate pattern** (`src/pages/blog/index.astro` lines 8–10):
```astro
if (import.meta.env.PROD) {
  return Astro.redirect('/');  // No blog index in production (D-13)
}
```
Copy verbatim for showcase — same guard, same redirect target `/`.

**Imports pattern** (`src/pages/index.astro` lines 20–27):
```astro
import BaseLayout from '../layouts/BaseLayout.astro';
import { BOOKING_URL, CONTACT_EMAIL } from '../lib/constants';
import CTAButton from '../components/wl/CTAButton.astro';
import Eyebrow from '../components/wl/Eyebrow.astro';
```
For showcase, replace with:
```astro
import BaseLayout from '../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';
import ProjectCard from '../components/wl/ProjectCard.astro';
import Eyebrow from '../components/wl/Eyebrow.astro';
import CTAButton from '../components/wl/CTAButton.astro';
import { BOOKING_URL } from '../lib/constants';
```

**getCollection + section-filter pattern** (from `src/content.config.ts` + RESEARCH.md):
```typescript
const projects = await getCollection('projects');
const clientWork = projects.filter(p => p.data.section === 'client-work');
const craftExperiments = projects.filter(p => p.data.section === 'craft-experiments');
```
Use `entry.data.slug` for any URL construction; `entry.id` only for React-key-equivalent keying (RESEARCH Pitfall 5).

**Section background + dark-gradient class pattern** (`src/pages/index.astro` lines 39–49):
```astro
<section
  style={[
    'position: relative;',
    'min-height: 840px;',
    'overflow: hidden;',
    'display: flex;',
    'align-items: center;',
  ].join(' ')}
  class="[background:linear-gradient(to_bottom,#E6F1F1,#D2E7E7)] dark:[background:linear-gradient(to_bottom,#123640,#0C2228)]"
>
```
Rule 1 (CR-01): background goes in `class`, not `style`, so `dark:` can override. The exact gradients for each showcase section are FIDELITY-GAP from frame `12:3` extraction — use the light→dark mapping table from RESEARCH.md:

| Light | Dark |
|---|---|
| `linear-gradient(to_bottom,#E6F1F1,#D2E7E7)` | `linear-gradient(to_bottom,#123640,#0C2228)` |
| `linear-gradient(to_bottom,#EFF7F6,#E6F1F1)` | `linear-gradient(to_bottom,#10303A,#0E2B33)` |
| `linear-gradient(to_bottom,#E6F1F1,#DCEDEC)` | `linear-gradient(to_bottom,#0E2B33,#0D262E)` |
| `var(--color-wl-paper)` (paper sections) | flips via token |

**Section content inner structure pattern** (`src/pages/index.astro` lines 127–129):
```astro
<section
  style="background: var(--color-wl-paper); padding-top: 112px; padding-bottom: 112px;"
  class="px-[24px] sm:px-[32px] lg:px-[160px] min-[1920px]:px-[400px]"
>
  <div style="max-width: 1120px; margin: 0 auto;">
    <Eyebrow>SECTION LABEL</Eyebrow>
    <div style="height: 21px;"></div>
    <h2 class="wl-heading-h2" style="color: var(--color-wl-ink); margin: 0;">...</h2>
  </div>
</section>
```

**Heading hierarchy contract:**
- Page `<h1>` — `class="wl-heading-h1-interior"` (61px, FIDELITY-GAP extract exact from `12:3`)
- Section `<h2>` for "Client Work" / "Craft & Experiments" — FIDELITY-GAP (confirm whether eyebrow vs h2)
- `ProjectCard` receives `headingLevel={3}`

**ProjectCard usage pattern** (from `src/components/wl/ProjectCard.astro` props interface, lines 50–60):
```astro
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
All cards ship with NO `open` attribute — D-16, all closed on load.

**Focus treatment** (project-wide convention from SiteHeader.astro line 21):
```
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent
```

---

### `src/components/wl/BlogCard.astro` (component, transform)

**Analog:** `src/components/wl/LinkCard.astro`

**Props interface pattern** (`src/components/wl/LinkCard.astro` lines 59–73 + RESEARCH.md D-11 spec):
```typescript
interface Props {
  title: string;       // post title — renders as <h2> (under page <h1>)
  slug: string;        // href="/blog/{slug}"
  pubDate: Date;       // formatted for display; raw ISO for <time datetime>
  description: string; // lede / excerpt text
  tags?: string[];     // tag pills via <Tag> primitive
  featuredImage?: string; // optional small thumbnail (size FRAME-PENDING)
  readingTime?: number;   // minutes — from reading-time-estimator
  class?: string;         // passthrough
}
```
Phase 35 D-08 convention: props-for-data, slot-for-prose. This component has no slot (all data via props).

**Import pattern** (follow LinkCard.astro structure + wl/ primitives):
```astro
import Tag from './Tag.astro';
```
Use `<Tag>` for each tag pill — no custom spans. No `<Breadcrumb>` inside the card (back-nav is page-level, not card-level).

**Wrapper element pattern** (`src/components/wl/LinkCard.astro` lines 76–104):
```astro
<article class:list={[
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent',
  className
]}>
  <a
    href={`/blog/${slug}`}
    class="block no-underline group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent"
  >
    <!-- content -->
  </a>
</article>
```
Note: avoid nested-interactive violations — if the whole entry is a link, `<article>` should NOT also be focusable. Follow `<article>` wrapping `<a>` pattern; `<article>` has no `href`/`tabindex`. The entry title `<a>` is the primary click target; whole-entry click area only if approved frame implies it (D-11 / UI-SPEC interaction contract, FRAME-PENDING).

**Title element** (`src/components/wl/LinkCard.astro` lines 116–124): title text uses Fraunces but renders as `<h2>` (real heading, not `<p>` like LinkCard's title — blog index heading hierarchy requires `h2` per accessibility contract):
```astro
<h2
  class="wl-heading-h3 text-wl-ink group-hover:text-wl-accent transition-colors"
  style="margin: 0 0 8px 0;"
>
  {title}
</h2>
```
`wl-heading-h3` gives the Fraunces visual weight; element is `<h2>` for correct heading outline. Color via `class` (not inline) so `group-hover` can win (WR-02 precedent from LinkCard).

**Date pattern** (from `src/components/BlogCard.astro` lines 58–60 — copy semantic structure, replace tokens):
```astro
<time
  datetime={pubDate.toISOString()}
  class="wl-text-note"
  style="color: var(--color-wl-sub);"
>
  {pubDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
</time>
```
Exact meta-row styling is FRAME-PENDING.

**Tag row pattern** (use `<Tag>` primitive from `src/components/wl/Tag.astro`):
```astro
{tags && tags.length > 0 && (
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    {tags.map((tag) => (
      <Tag>{tag}</Tag>
    ))}
  </div>
)}
```

**Dark mode:** `--wl-card-bg`, `--wl-sub`, `--wl-ink`, `--wl-accent` all flip via token — no `dark:` overrides needed for token-based properties. No literal color values in this component.

---

### `src/pages/blog/index.astro` (page restyle, request-response)

**Analog:** self (current file at lines 1–180 — the before state). Plus `src/pages/index.astro` for wl section structure.

**Preserve unchanged** (lines 6–10):
```astro
if (import.meta.env.PROD) {
  return Astro.redirect('/');  // No blog index in production (D-13)
}
```
Do NOT remove this guard.

**Preserve unchanged** (lines 13–28): getCollection + sorting logic is correct — keep as-is. Remove only the `readingTime` map (move that to BlogCard or keep per FRAME-PENDING decision on whether to display it).

**Remove entirely:**
- Line 4: `import Button from '../../components/ui/Button.astro';` — no JS filter buttons in D-11 editorial list
- Lines 22–22: `const allTags = [...]` — tag filter state removed (no JS filtering)
- Lines 47–67: entire filter buttons block (`<div id="filter-container">...`)
- Lines 70–83: replace `<section id="blog-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">` with single-column editorial list
- Lines 86–96: Load more button block — removed (editorial list, no pagination this phase)
- Lines 100–179: entire `<script is:inline>` block — zero JS in D-11 editorial list

**Replace import** (line 3):
```astro
// REMOVE: import BlogCard from '../../components/BlogCard.astro';
// ADD:
import BlogCard from '../../components/wl/BlogCard.astro';
```

**New section structure** (replace grid section with single-column list, following index.astro section pattern):
```astro
<main class="px-[24px] sm:px-[32px] lg:px-[160px] min-[1920px]:px-[400px]"
      style="background: var(--color-wl-paper); padding-top: 112px; padding-bottom: 112px;">
  <div style="max-width: 1120px; margin: 0 auto;">
    <!-- Page header: h1, intro — copy verbatim from approved Figma frame (FRAME-PENDING) -->
    <h1 class="wl-heading-h1-interior" style="color: var(--color-wl-ink);">Blog</h1>

    <!-- Editorial list: ul role="list" per accessibility contract -->
    <ul role="list" style="list-style: none; margin: 0; padding: 0;">
      {postsWithMeta.map((post) => (
        <li>
          <BlogCard
            title={post.data.title}
            slug={post.id}
            pubDate={post.data.pubDate}
            description={post.data.description}
            featuredImage={post.data.featuredImage}
            tags={post.data.tags}
            readingTime={post.readingTime}
          />
        </li>
      ))}
    </ul>
  </div>
</main>
```
Exact entry gaps, padding, and header geometry are FRAME-PENDING.

---

### `src/pages/blog/[slug].astro` (page restyle, request-response)

**Analog:** self (current file at lines 1–115 — the before state).

**Preserve unchanged** (lines 7–8):
```typescript
export async function getStaticPaths() {
  if (import.meta.env.PROD) return [];  // No blog pages in production (D-13)
```
Do NOT remove this guard.

**Preserve unchanged** (lines 19–30): `Astro.props`, `render(post)`, `readingTime`, date formatting.

**Fix LCP bug** (line 89):
```astro
<!-- BEFORE (bug): -->
<img loading="lazy" ... />
<!-- AFTER (fix — roadmap criterion 3): -->
<img loading="eager" ... />
```

**Remove entirely:**
- Line 4: `import TableOfContents from '../../components/TableOfContents.astro';`
- Line 20: `headings` from the `render()` destructure (not needed without TOC)
- Lines 44–48: the 3-column grid wrapper `<div class="grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] gap-8 lg:gap-12">`
- Lines 46–49: TOC `<aside>` block
- Lines 110–112: empty right column `<div class="hidden lg:block"></div>`

**Replace back-link** (lines 36–42 and 101–107) with `<Breadcrumb>` primitive:
```astro
import Breadcrumb from '../../components/wl/Breadcrumb.astro';

// In template:
<Breadcrumb items={[
  { label: 'Blog', href: '/blog' },
  { label: post.data.title }
]} />
```

**Replace tag pills** (lines 70–79) with `<Tag>` primitive:
```astro
import Tag from '../../components/wl/Tag.astro';

// Replace neobrutalist anchor tags:
{post.data.tags?.map((tag: string) => (
  <a href={`/blog/tags/${tag}`}>
    <Tag>{tag}</Tag>
  </a>
))}
```

**Replace prose wrapper** (line 95):
```astro
<!-- BEFORE: -->
<div class="prose">
<!-- AFTER: -->
<div class="wl-prose">
```

**New layout order** (D-12: title-first, image below, then prose — single centered column):
```astro
<article style="max-width: 65ch; margin: 0 auto;">
  <header>
    <h1 class="wl-heading-h1-interior" style="color: var(--color-wl-ink);">{post.data.title}</h1>
    <!-- date + tags meta row -->
    <!-- featured image with loading="eager" -->
  </header>
  <div class="wl-prose"><Content /></div>
</article>
```
Exact article column width and image treatment are FRAME-PENDING.

**Replace neobrutalist tokens** — every class using old tokens must switch:

| Old | New |
|---|---|
| `font-heading` | `var(--font-wl-heading)` via ramp class |
| `text-turquoise` / `dark:text-turquoise-dark` | `text-wl-accent` (single token, flips) |
| `text-text-muted-light dark:text-text-muted-dark` | `style="color: var(--color-wl-sub);"` |
| `border-turquoise dark:border-turquoise-dark` | `style="border-color: var(--color-wl-accent);"` |
| `bg-turquoise/10 dark:bg-turquoise-dark/10` | remove or use `--wl-sea-glass` |
| `text-3xl font-bold uppercase` | wl ramp class (`.wl-heading-h1-interior` or per frame) |

---

### `src/pages/blog/tags/[tag].astro` (page restyle, request-response)

**Analog:** self (current file lines 1–97) + `src/pages/blog/index.astro` (derived surface = index layout + filtered heading).

**Preserve unchanged** (lines 7–9):
```typescript
export async function getStaticPaths() {
  if (import.meta.env.PROD) return [];  // No blog pages in production (D-13)
```

**Preserve unchanged** (lines 9–35): getCollection + tag filtering + postsWithMeta calculation + displayTag formatting — all correct logic.

**Replace import** (line 3):
```astro
// REMOVE: import BlogCard from '../../../components/BlogCard.astro';
// ADD:
import BlogCard from '../../../components/wl/BlogCard.astro';
```

**Add Breadcrumb import:**
```astro
import Breadcrumb from '../../../components/wl/Breadcrumb.astro';
```

**New page structure** (derive from index layout — D-10 "index layout + filtered heading"):
- Page heading: "Posts tagged '{displayTag}'" or wording from approved index frame heading pattern
- Back-link: `<Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: displayTag }]} />`
- Posts list: same `<ul role="list">` structure as restyled blog/index.astro
- Replace 3-column grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`) with single-column stack
- Remove neobrutalist tokens: `text-turquoise`, `font-heading`, `text-text-muted-light dark:text-text-muted-dark`, `font-bold uppercase`

---

### `src/components/layout/SiteHeader.astro` (component edit, one-pattern copy)

**Analog:** self (line 46–51 — the Blog link gate is the exact pattern to copy for Showcase).

**Existing Blog link gate pattern** (lines 46–51):
```astro
{isDev && (
  <a
    href="/blog"
    class="wl-nav-link text-wl-sub hover:text-wl-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent"
  >Blog</a>
)}
```

**Apply same gate to desktop Showcase link** (currently lines 38–41, ungated):
```astro
<!-- BEFORE (ungated — dead link in prod): -->
<a
  href="/showcase"
  aria-current={currentPath === '/showcase' ? 'page' : undefined}
  class="wl-nav-link text-wl-ink hover:text-wl-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent"
>Showcase</a>

<!-- AFTER (dev-only gate — D-02): -->
{isDev && (
  <a
    href="/showcase"
    aria-current={currentPath === '/showcase' ? 'page' : undefined}
    class="wl-nav-link text-wl-ink hover:text-wl-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent"
  >Showcase</a>
)}
```

**Apply same gate to mobile nav Showcase link** (currently lines 59–62, also ungated):
```astro
<!-- BEFORE (ungated): -->
<a
  href="/showcase"
  class="wl-nav-link text-wl-ink hover:text-wl-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent"
>Showcase</a>

<!-- AFTER (dev-only gate — D-02): -->
{isDev && (
  <a
    href="/showcase"
    class="wl-nav-link text-wl-ink hover:text-wl-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent"
  >Showcase</a>
)}
```

`isDev` is already declared at line 5: `const isDev = import.meta.env.DEV;` — no new variable needed.

---

### `src/styles/global.css` — `.wl-prose` scope (utility, new scope)

**Analog:** `src/styles/global.css` lines 489–642 (the `.prose` scope).

**Structural pattern** (copy the CSS scope structure from the existing `.prose`, replace tokens):

The `.prose` scope (lines 489–642) is the exact structural template. The `.wl-prose` scope is authored **below line 642** (below the last `.dark .prose hr` rule). It must not modify the `.prose` scope above it (Phase 41 cleanup).

**Selector pattern to follow** (from lines 490–642):
```css
/* === NEW: Wavelength prose scope for MDX blog post content === */
/* Authored below untouched .prose scope (Phase 41 will delete .prose) */
/* Token-based properties flip automatically in .dark — no dark: pairs needed */
/* Only literal values get .dark .wl-prose overrides */

.wl-prose h2 {
  font-family: var(--font-wl-heading);
  font-size: 50px; /* .wl-heading-h2 value — verify at frame approval */
  font-weight: 400;
  line-height: 1.06;
  letter-spacing: -1.5px;
  font-variation-settings: "SOFT" 0, "WONK" 1;
  color: var(--color-wl-ink);  /* token flips in .dark automatically */
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.wl-prose h3 {
  font-family: var(--font-wl-heading);
  font-size: 21px; /* .wl-heading-h3 value — verify at frame approval */
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -1.5px;
  font-variation-settings: "SOFT" 0, "WONK" 1;
  color: var(--color-wl-ink);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.wl-prose p {
  font-family: var(--font-wl-body);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-wl-sub);  /* token flips */
  margin-bottom: 1rem;
}

.wl-prose a {
  color: var(--color-wl-accent);  /* token flips */
  text-decoration: underline;
}

.wl-prose a:hover {
  /* slightly darken — token approach: use wl-ink on hover */
  color: var(--color-wl-ink);
}

.wl-prose a:focus-visible {
  outline: 2px solid var(--color-wl-accent);
  outline-offset: 2px;
}

.wl-prose strong {
  color: var(--color-wl-ink);  /* token flips */
  font-weight: 600;
}

.wl-prose blockquote {
  border-left: 4px solid var(--color-wl-accent);  /* token flips */
  padding-left: 1rem;
  font-family: var(--font-wl-heading);
  font-style: italic;
  font-variation-settings: "SOFT" 0, "WONK" 1;
  color: var(--color-wl-sub);  /* token flips */
  margin: 1.5rem 0;
}

.wl-prose ul,
.wl-prose ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  color: var(--color-wl-sub);
}

.wl-prose ul { list-style-type: disc; }
.wl-prose ol { list-style-type: decimal; }

.wl-prose li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* Inline code: sea-glass tint (token-based — flips in dark) */
.wl-prose code:not(pre code) {
  background-color: var(--color-wl-sea-glass);  /* token flips: #E6F1F1 light / #123640 dark */
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-size: 0.875em;
  font-family: var(--font-wl-body);
}

/* Code blocks: handled by expressive-code, just set margin */
.wl-prose pre {
  margin: 1.5rem 0;
  border-radius: 8px;
}

.wl-prose img {
  width: 100%;
  border-radius: 8px;  /* confirm at frame approval — UI-SPEC says "radius 8px default" */
  margin: 1.5rem 0;
}

.wl-prose hr {
  border: none;
  border-top: 1px solid var(--color-wl-line);  /* token flips */
  margin: 2rem 0;
}
```

**Dark mode:** All values above use `--wl-*` tokens which flip via the `.dark` block at lines 44–57 of global.css. No separate `.dark .wl-prose` rules are needed UNLESS a literal value is introduced. Exact heading sizes confirm at approved post frame (FRAME-PENDING) — use ramp values as defaults, override as a local size with a source-node comment (ProjectCard precedent, `src/components/wl/ProjectCard.astro` line 28: "NOT .wl-heading-h3 (21px); local 22px").

---

### `astro.config.mjs` — expressiveCode retheme + sitemap extension (config edit)

**Analog:** self (lines 97–104).

**Current expressiveCode call** (line 97):
```javascript
expressiveCode(),
```

**Replace with** (two-step from RESEARCH.md + UI-SPEC):
```javascript
expressiveCode({
  // Step 1: align with class-based .dark toggle (not prefers-color-scheme)
  themes: ['github-light', 'github-dark'],
  themeCssSelector: (theme) => {
    return theme.name === 'github-dark' ? '.dark' : ':not(.dark)';
  },
  useDarkModeMediaQuery: false,
  // Step 2 (additive — brand palette): styleOverrides toward --wl-sea-glass family
  // Light bg: #E6F1F1 (--wl-sea-glass), Dark bg: #123640 (--wl-sea-glass dark)
  // Border toward --wl-line. Syntax token colors from base themes unless post frame says otherwise.
  // All final literals recorded with WCAG AA check before commit (accessibility contract).
  styleOverrides: {
    // Populated after confirmed values from frame approval or post-build review
  },
}),
```

**Current sitemap filter** (lines 99–104):
```javascript
sitemap({
  filter: (page) => !page.includes('/blog'),
  changefreq: 'weekly',
  priority: 0.7,
  lastmod: new Date(),
}),
```

**Replace filter line only** (D-01 — add `/showcase` exclusion):
```javascript
sitemap({
  filter: (page) => !page.includes('/blog') && !page.includes('/showcase'),
  changefreq: 'weekly',
  priority: 0.7,
  lastmod: new Date(),
}),
```

---

### `scripts/check-contrast.mjs` — PAIRS matrix extension (utility edit)

**Analog:** self (lines 171–277, PAIRS array).

**Pattern to follow** (lines 220–277): add new pairs in a clearly labelled `// ── PHASE 38 ADDITIONS` block after the last existing pair, before the closing `];`. Each row follows:
```javascript
[foreground_hex, background_hex, 'descriptive label', threshold, textUse_boolean],
```

**New pairs to add for Phase 38** (per accessibility contract from UI-SPEC):

```javascript
// ── PHASE 38 ADDITIONS ────────────────────────────────────────────────────────
// Source: Phase 38 UI-SPEC accessibility contract

// .wl-prose link (accent) on paper
[L_ACCENT, L_PAPER, 'light: wl-prose link accent on paper (blog post)', 4.5, true],
[D_ACCENT, D_PAPER, 'dark: wl-prose link accent on dark paper (blog post)', 4.5, true],

// Inline code text on sea-glass background tint (token-based flip)
// Light: --wl-sub (#35525A) on --wl-sea-glass (#E6F1F1)
[L_SUB, L_SEA_GLASS, 'light: inline-code text (sub) on sea-glass tint (wl-prose)', 4.5, true],
// Dark: --wl-sub dark (#A9C9C7) on --wl-sea-glass dark (#123640)
[D_SUB, D_SEA_GLASS, 'dark: inline-code text (sub) on sea-glass tint dark (wl-prose)', 4.5, true],

// Showcase section backgrounds — FIDELITY-GAP: add pairs extracted from frame 12:3
// (literal gradient stop colors, once extraction is complete)
// Placeholder: sea-glass gradient stops already in matrix as L_INK/L_SUB on L_SEA_GLASS above
// Add any new extracted showcase-section-specific pairs here after extraction
```

Note: expressive-code block background pairs are added once the `styleOverrides` literals are finalized (FRAME-PENDING for exact values from approved post frame). Add after retheme is confirmed.

---

## Shared Patterns

### Dev-gate (`import.meta.env.PROD`)
**Source:** `src/pages/blog/index.astro` lines 8–10; `src/pages/blog/[slug].astro` lines 7–8
**Apply to:** `src/pages/showcase.astro` (page-level redirect guard); `astro.config.mjs` sitemap filter; `SiteHeader.astro` nav link gates

**Page-level redirect guard:**
```typescript
if (import.meta.env.PROD) {
  return Astro.redirect('/');
}
```

**Dynamic route guard:**
```typescript
export async function getStaticPaths() {
  if (import.meta.env.PROD) return [];
  // ...
}
```

**Nav link gate:**
```astro
const isDev = import.meta.env.DEV;
// ...
{isDev && <a href="/target">Link</a>}
```

---

### Wavelength token usage (semantic dark flip — zero `dark:` pairs for wl tokens)
**Source:** `src/styles/global.css` lines 44–57 (`.dark` block); `src/components/wl/LinkCard.astro` lines 91–100
**Apply to:** `src/components/wl/BlogCard.astro`, `.wl-prose` scope in `global.css`, `src/pages/showcase.astro` sections

Each `--color-wl-*` token flips automatically in `.dark`. Use tokens via `style="color: var(--color-wl-ink);"` or via class utilities like `text-wl-ink`. Only literal hex values need explicit `dark:` class pairs (Rule 1 — CR-01).

Token flip table (for reference):

| Token | Light | Dark |
|---|---|---|
| `--color-wl-ink` | `#12333B` | `#EAF6F3` |
| `--color-wl-sub` | `#35525A` | `#A9C9C7` |
| `--color-wl-accent` | `#0E7078` | `#4FB3B8` |
| `--color-wl-sea-glass` | `#E6F1F1` | `#123640` |
| `--color-wl-paper` | `#F6FBFA` | `#0C2228` |
| `--color-wl-line` | accent@16% | `#5AA9A538` |

---

### Background gradient class rule (Rule 1 / CR-01)
**Source:** `src/pages/index.astro` lines 48–49; RESEARCH Pitfall 1
**Apply to:** All showcase sections with gradient backgrounds; any blog page section backgrounds

Gradient backgrounds go in `class` (arbitrary-value syntax), NOT inline `style`, so `dark:` can override:
```astro
class="[background:linear-gradient(to_bottom,#E6F1F1,#D2E7E7)] dark:[background:linear-gradient(to_bottom,#123640,#0C2228)]"
```
If a property uses a `--wl-*` token (paper, etc.) that flips automatically, `style` is fine for that property since no dark override is needed.

---

### Focus treatment (project-wide convention)
**Source:** `src/components/layout/SiteHeader.astro` line 21; `src/components/wl/LinkCard.astro` lines 79–81
**Apply to:** Every interactive element in every new/restyled file

```
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent
```

---

### Gutter + section padding (landing precedent — carry over verbatim)
**Source:** `src/pages/index.astro` lines 127–129; `src/pages/index.astro` line 58
**Apply to:** `src/pages/showcase.astro`, restyled blog pages

```astro
class="px-[24px] sm:px-[32px] lg:px-[160px] min-[1920px]:px-[400px]"
style="padding-top: 112px; padding-bottom: 112px;"
```
Content column max-width: `max-width: 1120px; margin: 0 auto;`

---

### wl/ component inner prop/style pattern (inline-style for geometry, class for interactive states)
**Source:** `src/components/wl/LinkCard.astro` lines 91–104; `src/components/wl/Tag.astro` lines 37–57
**Apply to:** `src/components/wl/BlogCard.astro`

Geometry (padding, border-radius, shadow, border) goes in `style` as an array join. Color that participates in hover/focus goes in `class` so Tailwind variants can override (WR-02 pattern: `class="text-wl-ink group-hover:text-wl-accent"`, not `style="color: ..."`).

---

### Prose scope structure (neobrutalist `.prose` → wl `.wl-prose`)
**Source:** `src/styles/global.css` lines 489–642
**Apply to:** `src/pages/blog/[slug].astro` (switch wrapper class); new `.wl-prose` scope in `global.css`

Structural model: per-element CSS rules under the scope selector, with literal `.dark .scope selector { }` rules ONLY when a literal (non-token) color is used. The `.wl-prose` scope uses tokens throughout, so the `.dark .wl-prose` override block may be empty or absent.

---

### Breadcrumb back-navigation pattern
**Source:** `src/components/wl/Breadcrumb.astro` lines 39–117
**Apply to:** `src/pages/blog/[slug].astro` (replace custom back-link SVG pattern); `src/pages/blog/tags/[tag].astro`

```astro
import Breadcrumb from '../../components/wl/Breadcrumb.astro';

<Breadcrumb items={[
  { label: 'Blog', href: '/blog' },
  { label: post.data.title },  // last item = current page, no href
]} />
```

---

### Axe accessibility test pattern
**Source:** `tests/accessibility/landing.spec.ts` lines 1–93
**Apply to:** New `tests/accessibility/showcase.spec.ts` and `tests/accessibility/blog.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { settleAnimations } from './helpers';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('Showcase Page Accessibility', () => {
  test('Showcase page in light mode should not have accessibility violations', async ({ page }) => {
    await page.goto('/showcase');
    await settleAnimations(page);
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });

  test('Showcase page in dark mode should not have accessibility violations', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    try {
      await page.goto('/showcase');
      const html = page.locator('html');
      await expect(html).toHaveClass(/dark/);
      await settleAnimations(page);
      const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
      expect(results.violations).toEqual([]);
    } finally {
      await context.close();
    }
  });
});
```
Blog spec follows the same pattern at `/blog` and `/blog/{first-post-slug}`. Tests run in dev server context (showcase and blog are dev-only; tests assert DEV pages, not prod build output).

---

## No Analog Found

All files in Phase 38 have close analogs in the codebase. No new patterns without precedent.

---

## FIDELITY-GAP / FRAME-PENDING Items

These items have pattern structure established above but require frame extraction before final values:

| Item | Pattern Structure | Pending |
|---|---|---|
| Showcase page h1 / intro geometry | `wl-heading-h1-interior` class + gutter pattern | Exact node copy from `12:3` Wave 1 extraction |
| Showcase section labels (Eyebrow vs h2 vs both) | `<Eyebrow>` or `<h2 class="wl-heading-h2">` | Which treatment per `12:3` |
| Showcase card count per section | `projects.json` duplicate entries | Exact count from `12:3` |
| Showcase section background pairs | gradient class pattern from above | Which section gets which gradient pair |
| Blog index h1 / intro copy & geometry | page header pattern from index.astro | Approved blog index frame |
| BlogCard exact entry geometry | tag/time/description layout from above | Approved blog index frame |
| Blog post article column width | `max-width: 65ch` placeholder | Approved blog post frame |
| Blog post blockquote exact size | Fraunces italic, `--wl-accent` border | Approved blog post frame |
| expressive-code styleOverrides literals | structurally established in config | Approved blog post frame or post-build review |
| Phase 38 contrast matrix additions for showcase bands | PAIRS pattern above | Literals from `12:3` extraction |

---

## Metadata

**Analog search scope:** `src/pages/`, `src/components/wl/`, `src/components/layout/`, `src/styles/`, `scripts/`, `astro.config.mjs`, `tests/accessibility/`
**Files read:** 16
**Pattern extraction date:** 2026-07-18

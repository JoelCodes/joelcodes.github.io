---
phase: 38-showcase-page-blog-restyle
reviewed: 2026-07-19T00:00:00Z
depth: deep
files_reviewed: 16
files_reviewed_list:
  - src/pages/showcase.astro
  - src/pages/blog/index.astro
  - src/pages/blog/[slug].astro
  - src/pages/blog/tags/[tag].astro
  - src/components/wl/BlogCard.astro
  - src/components/wl/FeaturedPostCard.astro
  - src/components/wl/AuthorCard.astro
  - src/components/wl/ProjectCard.astro
  - src/components/layout/SiteHeader.astro
  - src/components/layout/SiteFooter.astro
  - src/styles/global.css
  - astro.config.mjs
  - src/content.config.ts
  - src/data/projects.json
  - src/lib/reading-time.ts
  - src/layouts/BaseLayout.astro
findings:
  critical: 1
  warning: 5
  info: 4
  total: 10
status: resolved
resolution: |
  2026-07-19 — All 1 critical + 5 warnings addressed (info items IN-01..IN-04 deferred to
  Phase 40/41 as noted). Commit for the fixes: see "fix(38): apply code-review findings".
  - CR-01: removed the no-op `dark:featured-post-card__art--dark` class; commented the
    `:global(.dark)` rule as the intentional dark handler.
  - WR-01: removed the dead `PROD ? !draft : true` branch in [slug] getStaticPaths (guard
    above already returns [] in PROD); documented draft-preview intent.
  - WR-02: removed orphaned `resultLabel: "Book a call"` on the "Your Project Here" card
    (no result body — a real COPY GAP; label was dead data).
  - WR-03: added `target="_blank" rel="noopener"` to AuthorCard's Book-a-call (was same-tab).
    NOTE: did NOT add `noreferrer` to the showcase/blog Calendly links — `rel="noopener"`
    (without noreferrer) is the deliberate site-wide D-06 convention (landing/header/footer
    all match); adding noreferrer would have introduced the inconsistency, not removed it.
  - WR-04: corrected the false "uses entry.data.slug for URL construction" comment in
    content.config.ts (blog routes use entry.id; projects `slug` is carried for future
    detail pages).
  - WR-05: removed the site-wide Roboto Mono `<link rel=preload>` — the @font-face stays in
    global.css and loads on demand for the rare, below-fold, dev-only blog code blocks.
  - IN-01..IN-04 (reading-time doc, SITE_URL duplication, redundant projects `slug`,
    breakpoint inconsistency): informational — deferred to Phase 40/41 per the reviewer's note.
---

# Phase 38: Code Review Report

**Reviewed:** 2026-07-19
**Depth:** deep
**Files Reviewed:** 16
**Status:** issues_found

## Summary

Phase 38 adds a dev-gated showcase page, a full blog surface (index, post, tag), new
components (FeaturedPostCard, AuthorCard, BlogCard grid/mini), and the wl-prose canonical
prose scope. The dev-gate mechanism is structurally sound: PROD guards are correctly
placed in top-level frontmatter for page files and in getStaticPaths for dynamic routes,
and the sitemap filter excludes /blog and /showcase.

One critical defect was found: the `getStaticPaths` draft filter in `[slug].astro` contains
dead code that obscures intentional behaviour, but more concretely the filter in
`[slug].astro` includes ALL posts (including drafts) in dev mode while the index, tag, and
related listings exclude drafts — this split is intentional for draft preview, but the dead
`import.meta.env.PROD` branch inside the already-PROD-early-returned function is confusing
and a trap for future maintainers.

A more concrete critical finding is the `dark:featured-post-card__art--dark` Tailwind class
on the FeaturedPostCard art panel — it generates a CSS selector for a class that does not
exist in the scoped stylesheet, so in dark mode the art panel **does not receive its dark
gradient**. The `:global(.dark)` rule handles it correctly, making the Tailwind class
harmless but also meaning the intended dark treatment works by accident of rule specificity,
not intent.

The most actionable HIGH finding is that `your-project-here` in `projects.json` supplies a
`resultLabel` of "Book a call" but omits the `result` body field entirely; the label is
dead data and the "Book a call" prompt never renders. This is a copy-gap placeholder
correctly noted in showcase.astro comments but the JSON inconsistency is actionable.

---

## Critical Issues

### CR-01: Dead Tailwind dark-variant class on FeaturedPostCard art panel

**File:** `src/components/wl/FeaturedPostCard.astro:120`
**Issue:** The art panel has `class="featured-post-card__art dark:featured-post-card__art--dark"`.
Tailwind 4 generates a selector `.dark .dark\:featured-post-card__art--dark { }` — but there
is no CSS rule for `.featured-post-card__art--dark` anywhere, so this Tailwind utility is a
no-op. The dark gradient is actually applied by `:global(.dark) .featured-post-card__art`
defined in the scoped style block (line 158), which does work. However the declared intent on
line 120 is misleading: anyone reading it will assume the dark mode swap is handled by the
Tailwind `dark:` prefix, and may delete the `:global(.dark)` rule during cleanup, breaking
dark mode entirely.

Additionally, if the `:global(.dark)` rule ever needs a specificity bump (e.g., after a
refactor), relying on it instead of an explicit variant class is fragile.

**Fix:** Remove the no-op `dark:featured-post-card__art--dark` class and keep only the
`:global(.dark)` rule which is correct. Add a comment explaining why `:global` is needed
instead of Tailwind's `dark:` prefix for Astro scoped styles:

```astro
<!-- Line 120 — remove the dark: variant that does nothing -->
<div class="featured-post-card__art">

<!-- In <style>, keep exactly what is there — the :global(.dark) rule IS the dark handler -->
/* Dark art panel — cannot use Tailwind dark: prefix on scoped class names in Astro;
   :global(.dark) is the correct mechanism here. */
:global(.dark) .featured-post-card__art {
  background: linear-gradient(to bottom, #123640, #0C2228);
}
```

---

## Warnings

### WR-01: Dead `import.meta.env.PROD` branch inside already-PROD-gated `getStaticPaths`

**File:** `src/pages/blog/[slug].astro:39-42`
**Issue:** `getStaticPaths` early-returns `[]` when `PROD` on line 39. The `getCollection`
filter on line 41 therefore only runs in DEV — but the filter body is
`import.meta.env.PROD ? !data.draft : true`. In DEV, `PROD` is always false, so this
evaluates to `true` for every post (including drafts). The dead `PROD ? !draft : true`
branch was presumably intended to mirror the `!draft` filter from the index and tag pages,
but it never fires because of the early return. The current behaviour — draft posts get
pages in dev but not in the listings — is presumably intentional for draft preview, but the
dead branch makes it look like drafts are excluded in both envs when they are not.

**Fix:** Remove the inner PROD check and add a comment explaining the intentional
dev-only draft preview behaviour:

```ts
export async function getStaticPaths() {
  if (import.meta.env.PROD) return [];
  // In dev: ALL posts get pages (including drafts) so draft preview works
  // at /blog/[slug]. Drafts are excluded from index/tag/related listings only.
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
}
```

### WR-02: `your-project-here` has `resultLabel: "Book a call"` but no `result` body field

**File:** `src/data/projects.json:54-68`
**Issue:** The "Your Project Here" entry supplies `resultLabel: "Book a call"` without a
corresponding `result` field. `ProjectCard` renders the result section only when `result` is
present (guarded by `{result && ...}`), so `resultLabel` is dead data and the "Book a call"
CTA text never renders. Showcase.astro's comment calls this a "COPY GAP", but the JSON
inconsistency could confuse maintainers who add a `result` value later and discover a
pre-wired but unexpected label.

**Fix:** Either add the missing `result` body text (to make the card section appear), or
remove `resultLabel` from the JSON to make the gap explicit:

```json
// Option A: add the missing result body so the section renders
"result": "Book a free call — tell me what's slow or manual and I'll tell you what it'd take.",
"resultLabel": "Book a call"

// Option B: remove the orphaned label to keep the gap obvious
// (delete the "resultLabel": "Book a call" line)
```

### WR-03: `rel="noopener"` without `noreferrer` on external BOOKING_URL links

**File:** `src/pages/showcase.astro:337`, `src/pages/blog/index.astro:269`, `src/components/wl/AuthorCard.astro:90`
**Issue:** All three `target="_blank"` links to `BOOKING_URL` (Calendly, an external domain)
use only `rel="noopener"`. `noopener` prevents reverse tabnabbing but does **not** strip the
`Referer` header, so the full page URL is sent to Calendly. `rel="noopener noreferrer"` is
the standard for external links that should not leak the referrer. The footer GitHub link
already correctly uses `rel="noopener noreferrer"` (SiteFooter.astro:101), making these
links inconsistent.

Note: AuthorCard's "Book a call" button (line 90) does not have `target="_blank"` at all —
so the booking URL opens in the same tab from the author band, which is inconsistent with
every other "Book a call" button on the site.

**Fix:**
```astro
<!-- showcase.astro, blog/index.astro CTAButton -->
<CTAButton href={BOOKING_URL} variant="solid" icon="calendar" target="_blank" rel="noopener noreferrer">

<!-- AuthorCard.astro — add target and correct rel -->
<CTAButton href={BOOKING_URL} variant="solid" icon="calendar" target="_blank" rel="noopener noreferrer">
```

### WR-04: Inaccurate comment in `content.config.ts` — blog URLs use `post.id`, not `entry.data.slug`

**File:** `src/content.config.ts:20`
**Issue:** The comment reads: `"Phase 38 uses entry.data.slug for URL construction."` This is
false. All three blog pages (`index.astro`, `[slug].astro`, `tags/[tag].astro`) construct
URLs with `post.id` (the glob loader's file-based id), not `entry.data.slug`. The `slug`
field does exist in the `projects` schema but the projects collection has no routed pages at
all — slug is currently unused for routing. A future maintainer adding blog URL logic who
reads this comment will look for `data.slug` and not find it.

**Fix:** Replace the comment with an accurate description:
```ts
// NOTE: 'id' is the file() loader key — Astro exposes as entry.id, NOT entry.data.id.
// Do not declare 'id' in the schema (Pitfall 7 — 36-RESEARCH.md).
// Blog pages use post.id (glob-loader file-based id) for URL construction.
// The 'slug' field in the projects schema is defined for potential future use
// but is not currently used for routing (no project detail pages in Phase 38).
const projects = defineCollection({
```

### WR-05: Roboto Mono Variable preloaded on every page regardless of whether code blocks are present

**File:** `src/layouts/BaseLayout.astro:14, 44`
**Issue:** `robotoMonoWoff2` is imported and `<link rel="preload">` is emitted on every
page in the site, including the landing page and portfolio pages that contain no code blocks
and will never use `--font-wl-mono`. Preloading unused resources wastes bandwidth and
generates browser console warnings ("Resource was preloaded using link preload but not used
within a few seconds"). The brand fonts (Fraunces, Hanken Grotesk) are used on all pages and
warrant global preloading; Roboto Mono is blog-only.

**Fix:** Move the Roboto Mono preload to `BaseLayout.astro` via a named slot override from
blog page layouts, or create a `BlogLayout.astro` that extends `BaseLayout` and adds the
mono preload. Simplest short-term fix is a conditional prop:
```astro
<!-- BaseLayout.astro: accept a prop -->
interface Props {
  title: string;
  description?: string;
  preloadMonoFont?: boolean;
}
const { title, description = '...', preloadMonoFont = false } = Astro.props;

<!-- In <head> -->
{preloadMonoFont && (
  <link rel="preload" as="font" type="font/woff2" href={robotoMonoWoff2} crossorigin="anonymous" />
)}
```

Then blog pages pass `preloadMonoFont={true}`.

---

## Info

### IN-01: `wordCount("")` returns 0; `readingMinutes` minimum-1 guard handles it correctly

**File:** `src/lib/reading-time.ts:17-18`
**Issue:** When called with an empty string, `"".trim().split(/\s+/)` returns `[""]`, and
`.filter(Boolean)` reduces that to `[]` with length 0. `Math.ceil(0/200)` = 0.
`Math.max(1, 0)` = 1. The guard is correct and the function behaves as documented ("minimum
1"). However the `wordCount` export returns 0 for empty input, which could surprise callers
who use it directly without the `readingMinutes` wrapper.

No code change required; this is informational. If `wordCount` is ever used elsewhere,
consider documenting the "returns 0 for empty/whitespace-only input" behaviour.

### IN-02: `content.config.ts` `featuredImage` is a required string, not a relative image import

**File:** `src/content.config.ts:12`
**Issue:** `featuredImage: z.string()` stores an absolute-path string (e.g.
`"/images/blog/im-pivoting.jpg"`). In `[slug].astro` this is concatenated with a hardcoded
`SITE_URL` constant to build the `og:image` URL. Astro's image pipeline (with
`@astrojs/image` or built-in `<Image />`) cannot optimize these images because they are not
imported assets. This is documented design intent (featuredImage is for OG meta only), but
the hardcoded `SITE_URL = 'https://joelshinness.com'` at line 92 of `[slug].astro` is a
second source of truth for the canonical domain alongside `astro.config.mjs`'s `site`
field.

No immediate fix required. When featuredImage usage expands, centralise the domain to a
single import from a constants file.

### IN-03: `src/data/projects.json` — `slug` field duplicates `id` in all 6 entries

**File:** `src/data/projects.json` (all entries)
**Issue:** Every entry has both `"id": "chat-safety-pipeline"` and
`"slug": "chat-safety-pipeline"` with identical values. The `slug` field was added to the
schema in Phase 38 as a future routing key, but since `id` is the loader key and
`entry.id` is what Astro exposes, the `slug` field is redundant data. It's harmless but
doubles the maintenance surface.

No fix required for Phase 38. Track for cleanup in Phase 41 or when project detail pages
are added.

### IN-04: `blog-grid` and `tag-grid` media query breakpoints differ from standard Tailwind breakpoints used elsewhere

**File:** `src/pages/blog/index.astro:292-300`, `src/pages/blog/tags/[tag].astro:154-164`
**Issue:** The blog post grids use `max-width: 768px` (2-col) and `max-width: 500px` (1-col)
as breakpoints. The showcase card grids use Tailwind's `sm:grid-cols-2` (640px). This means
the blog grid collapses from 3→2 columns at 769px width but showcase collapses from 2→1 at
641px — different breakpoints on the same site. Both breakpoints are intentional (Figma
source for blog was 768px) but the inconsistency is worth flagging for the Phase 40 IA
pass.

No fix required for Phase 38. Note for Phase 40.

---

_Reviewed: 2026-07-19_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: deep_

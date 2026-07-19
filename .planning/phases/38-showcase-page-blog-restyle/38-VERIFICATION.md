---
phase: 38-showcase-page-blog-restyle
verified: 2026-07-19T22:30:26Z
status: passed
score: 9/9 must-haves verified
re_verification: false
---

# Phase 38: Showcase Page + Blog Restyle Verification Report

**Phase Goal:** The Showcase page delivers the full project-card experience and the blog is restyled to the new brand — both without touching blog URLs or breaking existing post SEO.
**Verified:** 2026-07-19T22:30:26Z
**Status:** PASSED
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|---------|
| 1 | `/showcase` renders Client Work (4) + Craft & Experiments (2) sections composing ProjectCard, cards closed by default, dev-gated | VERIFIED | `showcase.astro` 348 lines; `if (import.meta.env.PROD)` redirect at line 41; `getCollection('projects')` + two `.filter(p.data.section === ...)` calls; `headingLevel={3}` at lines 173, 252; no `open` attribute |
| 2 | SiteHeader and SiteFooter gate the /showcase link dev-only | VERIFIED | SiteHeader: both desktop and mobile `/showcase` anchors inside `{isDev && (…)}` blocks; SiteFooter: `/showcase` anchor inside `{isDev && (…)}` at line 45 |
| 3 | `astro.config.mjs` sitemap filter excludes /showcase AND /blog | VERIFIED | Line 148: `filter: (page) => !page.includes('/blog') && !page.includes('/showcase')` |
| 4 | Blog pages (index, [slug], tags/[tag]) restyled to wl brand, PROD guards intact, URLs unchanged, drafts excluded from listings, empty sections hidden | VERIFIED | All three pages: `import.meta.env.PROD` guards confirmed; `wl/BlogCard.astro` imported in index + tags; `FeaturedPostCard`, `AuthorCard` imported in index and slug; `!data.draft` filter on all listing queries; `gridPosts.length > 0` and `relatedPosts.length > 0` section guards |
| 5 | `[slug].astro` renders no above-fold featured image — structural LCP fix (no `loading=` attribute on any img) | VERIFIED | `grep -c 'loading=' [slug].astro` → 0; comment at line 21: "no featured `<img>` renders on the post page at all"; `featuredImage` used for `og:image` meta only |
| 6 | `.wl-prose` scope in global.css; Roboto Mono self-hosted; expressive-code rethemed to `.dark` class | VERIFIED | `.wl-prose` selectors at global.css line 665+; `@import '@fontsource-variable/roboto-mono/wght.css'` at line 10; `expressiveCode({ themeCssSelector, useDarkModeMediaQuery: false, themes: ['github-light','github-dark'], styleOverrides })` in astro.config.mjs lines 97–141 |
| 7 | New wl components: FeaturedPostCard, AuthorCard, BlogCard (grid/mini variants) | VERIFIED | All three files exist and are substantive (BlogCard: 213 lines, FeaturedPostCard: 239 lines, AuthorCard: 167 lines); each has `interface Props`; BlogCard imports and renders `<Tag>`; FeaturedPostCard composes `FrequencyWave`; AuthorCard wires `BOOKING_URL` + `CONTACT_EMAIL` |
| 8 | Zero old neobrutalist tokens in new/restyled blog + showcase files | VERIFIED | `grep -E "text-turquoise\|font-heading\|text-text-muted\|bg-turquoise"` across all 7 phase 38 files → 0 matches; old tokens in global.css are confined to the pre-existing `.prose` neobrutalist scope (Phase 41 cleanup target) |
| 9 | /showcase and /blog* absent from prod sitemap; blog URLs all return 200 in dev (confirmed by axe specs) | VERIFIED | Sitemap filter confirmed; `tests/accessibility/blog.spec.ts` covers `/blog` and `/blog/im-pivoting` light + dark (4 tests); `tests/accessibility/showcase.spec.ts` covers `/showcase` light + dark |

**Score:** 9/9 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/pages/showcase.astro` | Dev-gated showcase composing ProjectCard | VERIFIED | 348 lines; PROD redirect guard; getCollection + section filters; two sections; headingLevel={3}; no `open` |
| `src/components/layout/SiteHeader.astro` | Showcase nav link dev-only (desktop + mobile) | VERIFIED | Both link instances inside `{isDev && (…)}` |
| `src/components/layout/SiteFooter.astro` | Showcase nav link dev-only | VERIFIED | Showcase link inside `{isDev && (…)}` at line 45 (note: 38-01-SUMMARY incorrectly stated footer was not gated — it is) |
| `astro.config.mjs` | Sitemap excludes /showcase AND /blog | VERIFIED | Line 148 confirmed |
| `src/data/projects.json` | 4 client-work + 2 craft-experiments entries, unique slugs | VERIFIED | Counts: client-work=4, craft-experiments=2; all 6 slugs distinct |
| `src/content.config.ts` | Optional problemLabel/builtLabel/resultLabel Zod fields | VERIFIED | Lines 38–40; additive-only change |
| `src/pages/blog/index.astro` | Wavelength editorial list using FeaturedPostCard + BlogCard grid | VERIFIED | 308 lines; imports FeaturedPostCard, BlogCard from wl/; PROD guard; draft exclusion; length guard on grid section |
| `src/pages/blog/[slug].astro` | Title-in-hero, .wl-prose, Breadcrumb, no above-fold img | VERIFIED | 338 lines; Breadcrumb → meta → h1 wave hero (canonical 195:211 layout); `class="wl-prose"` at line 197; no `loading=` attribute anywhere |
| `src/pages/blog/tags/[tag].astro` | Restyled tag page with Breadcrumb + BlogCard grid | VERIFIED | 169 lines; imports wl/BlogCard + wl/Breadcrumb; PROD guard at line 29 |
| `src/components/wl/BlogCard.astro` | Editorial entry: h2 title, `<time>`, Tag pills, focus treatment | VERIFIED | 213 lines; `<article>` wrapper; `<a>` with `focus-visible:outline-wl-accent`; `<h2>` title; `<time datetime={pubDate.toISOString()}>` |
| `src/components/wl/FeaturedPostCard.astro` | "Start here." feature card component | VERIFIED | 239 lines; `interface Props`; imports Tag, FrequencyWave |
| `src/components/wl/AuthorCard.astro` | Author card with Book-a-call + Email CTAs | VERIFIED | 167 lines; BOOKING_URL + CONTACT_EMAIL wired |
| `src/lib/reading-time.ts` | Read-time utility for computed min-read | VERIFIED | 28 lines |
| `src/styles/global.css` | `.wl-prose` scope; Roboto Mono import; `.prose` untouched | VERIFIED | `.wl-prose` at line 665+; `@import roboto-mono` at line 10; old `.prose` at line 498 unchanged |
| `astro.config.mjs` expressiveCode | `themeCssSelector` + `useDarkModeMediaQuery: false` | VERIFIED | Lines 97–141 confirmed |
| `tests/accessibility/showcase.spec.ts` | axe spec for /showcase light + dark | VERIFIED | Covers `/showcase` in both contexts |
| `tests/accessibility/blog.spec.ts` | axe spec for /blog + /blog/{slug} light + dark | VERIFIED | 4 tests covering index + post, light + dark |
| `scripts/check-contrast.mjs` | PHASE 38 additions block | VERIFIED | Block at line 385; breadcrumb pairs also added |
| `.planning/phases/38-showcase-page-blog-restyle/38-EXTRACTION.md` | Frame 12:3 extraction | VERIFIED | 257 lines |
| `.planning/phases/38-showcase-page-blog-restyle/38-BLOG-EXTRACTION.md` | Canonical 195:* extraction | VERIFIED | 296 lines |
| `.planning/phases/38-showcase-page-blog-restyle/38-BLOG-FRAMES.md` | Approval APPROVED (re-baselined) | VERIFIED | "Approval status: APPROVED (re-baselined) — Joel, 2026-07-19"; canonical node IDs 195:103 / 195:211 |
| Fidelity screenshots | Showcase (all breakpoints light/dark) + Blog (1440/390 light/dark) | VERIFIED | 35 files in `fidelity/`; showcase closed/expanded at 390/768/1440/1920 light+dark; blog index/post at 1440/390 light+dark; blog tag 1440 light |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `showcase.astro` | `getCollection('projects')` | `getCollection('projects')` + `.filter(p.data.section === ...)` | WIRED | Lines 45–47 |
| `showcase.astro` | `ProjectCard.astro` | import + `<ProjectCard headingLevel={3} .../>` per entry | WIRED | Lines 34, 172, 252 |
| `showcase.astro` | prod exclusion | `if (import.meta.env.PROD) { return Astro.redirect('/'); }` | WIRED | Line 41 |
| `SiteHeader.astro` | dev-only showcase link | `{isDev && (…)}` wrapping both desktop + mobile anchors | WIRED | Lines 37–44, 61–65 |
| `SiteFooter.astro` | dev-only showcase link | `{isDev && (…)}` at line 45 | WIRED | Line 45 |
| `blog/index.astro` | `wl/FeaturedPostCard.astro` | import + `<FeaturedPostCard …/>` for latest post | WIRED | Lines 25, 151 |
| `blog/index.astro` | `wl/BlogCard.astro` | import + map to `<BlogCard …/>` in 3-col grid | WIRED | Lines 24, 201 |
| `blog/[slug].astro` | `.wl-prose` scope | `<div class="wl-prose">` wrapping `<Content />` | WIRED | Line 197 |
| `blog/[slug].astro` | `wl/Breadcrumb.astro` | import + `<Breadcrumb items={[…]}/>` in hero | WIRED | Lines 30, 131–136 |
| `blog/[slug].astro` | `wl/AuthorCard.astro` | import + `<AuthorCard />` after prose | WIRED | Lines 34, 216 |
| `blog/tags/[tag].astro` | `wl/BlogCard.astro` | import + map to `<BlogCard …/>` | WIRED | Lines 22, 129 |
| `expressiveCode config` | `.dark` class toggle | `themeCssSelector: (theme) => theme.name === 'github-dark' ? '.dark' : ':not(.dark)'` + `useDarkModeMediaQuery: false` | WIRED | astro.config.mjs lines 102–105 |
| `.wl-prose` scope | `--wl-*` tokens | `color: var(--color-wl-accent)` on links, `var(--color-wl-ink)` on headings, etc. | WIRED | global.css lines 730, 665+ |

### Requirements Coverage

| Requirement | Status | Notes |
|-------------|--------|-------|
| PAGE-02 | SATISFIED | Showcase page dev-gated, Client Work (4) + Craft & Experiments (2) sections, ProjectCard closed by default, expandable, frame 12:3 geometry, all breakpoints; fidelity gate approved by Joel |
| PAGE-06 | SATISFIED | Blog index/post/tag restyled to Wavelength brand; URLs unchanged; PROD guards intact; drafts excluded; LCP fix structural (no above-fold `<img>` → no `loading=` attr); code blocks follow `.dark` class; fidelity gate approved by Joel 2026-07-19. "posts stay in sitemap" superseded by Phase 34 D-13 prod exclusion per documented amendment |

### Anti-Patterns Found

No blocker anti-patterns detected. Observations:

| File | Pattern | Severity | Impact |
|------|---------|----------|--------|
| `showcase.astro`, `[slug].astro` | Local inline styles for ramp-mismatch headings (e.g. `style="font-size: 64px"`) with source-node comments | Info | Intentional per Phase 36 precedent; flagged at fidelity gate; Joel-approved |
| `src/styles/global.css` | Old neobrutalist tokens (`--font-heading`, `.text-turquoise-text`) in `.prose` scope | Info | Pre-existing scope; Phase 41 CLEAN-02 cleanup target; entirely outside phase 38 new code |
| `38-01-SUMMARY.md` | States "SiteFooter Showcase link NOT gated" | Info | Incorrect: footer IS gated (`{isDev && (…)}` at line 45 of SiteFooter.astro) — summary was written before footer was wired, subsequent plans completed it |

### Human Verification Required

The following items cannot be verified programmatically and have already been satisfied by Joel's approvals during execution:

1. **Showcase fidelity gate (frame 12:3 vs rendered)** — Approved by Joel in Plan 03 (fidelity screenshots in `fidelity/` directory; closed + expanded at 390/768/1440/1920 light; dark derived per D-04).

2. **Blog fidelity gate (canonical 195:103 / 195:211 vs rendered)** — Approved by Joel on 2026-07-19 per 38-06-SUMMARY.md. Accepted FIDELITY-GAPs: hero heights, feature-art wave crops, author glyph vector, table dark thead border, no-frame h3/h4/ol/inline-code-bg fallbacks, h1/h2/h3 tracking deltas, all dark values derived.

3. **Blog frame re-baseline approval** — Joel confirmed canonical pages are "Site · Blog" (195:103) and "Site · Blog Post" (195:211); supersedes the 2026-07-18 Claude-drafted frames (deleted from Figma); recorded in `38-BLOG-FRAMES.md` with "APPROVED (re-baselined)".

### Gaps Summary

No gaps. All 9 observable truths verified. All required artifacts exist, are substantive, and are wired. Both requirement IDs (PAGE-02, PAGE-06) are satisfied with their documented scope amendments applied. The one discrepancy found (38-01-SUMMARY claiming SiteFooter was not gated) is a stale summary note — the actual code has the footer gated correctly.

---

*Verified: 2026-07-19T22:30:26Z*
*Verifier: Claude (gsd-verifier)*

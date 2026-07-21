---
phase: 38-showcase-page-blog-restyle
plan: 06
status: complete
requirements: [PAGE-06]
key-files:
  created:
    - src/lib/reading-time.ts
  modified:
    - src/pages/blog/index.astro
    - src/pages/blog/[slug].astro
    - src/pages/blog/tags/[tag].astro
    - scripts/check-contrast.mjs
    - tests/accessibility/blog.spec.ts
    - scripts/blog-fidelity-screenshots.mjs
commits:
  - "87fcde6 / ad21275: initial blog page restyles (draft-based — superseded)"
  - "6c0c49c: blog axe spec + contrast additions"
  - "daa0bb7: rebuild all three blog pages against canonical 195:103 / 195:211"
  - "d6e7f51: verification + fidelity screenshots"
  - "dcbbded: exclude drafts from listings, hide empty sections (Joel keep-draft decision)"
completed: 2026-07-19
---

# Plan 38-06 Summary — Blog Page Restyles + Fidelity Gate (RE-BASELINED)

## What shipped

All three blog surfaces rebuilt against Joel's canonical Figma pages (Site · Blog `195:103`,
Site · Blog Post `195:211`) — replacing an initial draft-based build (211:x, deleted). URLs
unchanged; PROD dev-gate guards intact on all three pages.

- **`/blog`** (§1–4): wave-field sea-glass hero (Breadcrumb "Home / Blog", Eyebrow "PLAIN ANSWERS,
  WRITTEN DOWN", h1 "Notes on web, automations, and AI — minus the jargon", verbatim lead) →
  "LATEST / Start here." **FeaturedPostCard** (latest post, computed read-time) → "ALL POSTS /
  Everything so far." 3-col **BlogCard grid** (remaining posts) → "GET IN TOUCH / Prefer answers to
  articles?" CTA band. All chrome copy verbatim from the frame.
- **`/blog/[slug]`** (§5–8): wave hero band (3-level Breadcrumb, Tag + date + `·` + "{N} min read"
  meta, local Fraunces-54 h1, description lead) — **no top featured image** (title lives in the
  hero; `featuredImage` retained for `og:image` meta only) → `.wl-prose` article at 735px →
  **AuthorCard** (verbatim bio + Book-a-call/Email CTAs) → "KEEP READING / Related posts." mini-cards.
- **`/blog/tags/[tag]`**: derived surface — wave hero + 3-col BlogCard grid.

## Content mapping (Joel, 2026-07-19)

- Featured = latest published post; grid = the rest. Drafts are **excluded from all listings** in
  every environment (Joel's "keep draft, hide empty sections" call). With one published post today
  ("I'm Pivoting"), the "Everything so far." grid and "Related posts." rail are **omitted entirely**
  (heading included) rather than rendering empty — via `length > 0` guards. The draft "Getting
  Started with Business Automation" stays unpublished and off the listings; its page is still
  reachable by direct URL in dev for preview.

## LCP (roadmap criterion 3)

The `loading="lazy"` bug is resolved structurally: the canonical post layout has **no featured
`<img>` at all** — the wave hero (text) is the LCP element. `[slug].astro` renders no `loading=`
attribute above the fold.

## Verification

- `npx playwright test tests/accessibility/blog.spec.ts` → **4/4 pass** (index + post, light + dark).
- `node scripts/check-contrast.mjs` → exit 0 (added: `#CDE6E5`/`#0D2A31` 11.52:1; breadcrumb-on-hero
  light 4.53:1; dark 7.29:1).
- `npm run astro check` → only the 2 pre-existing errors (index.astro, thank-you.astro).
- `npm run build` → `/blog`, `/blog/[slug]`, `/blog/tags/[tag]` are redirect-only stubs in prod;
  absent from `dist`; sitemap excludes them. Blog resolves in dev.

## Fidelity gate — APPROVED (design) by Joel 2026-07-19

Design/layout against canonical `195:103` / `195:211` approved. Empty-section issue resolved by the
keep-draft/hide-empty fix (dcbbded) and re-captured screenshots. Accepted FIDELITY-GAPs (derived,
non-blocking): hero heights, feature-art/figure wave crops, author glyph vector, table dark thead
border, no-frame h3/h4/ol/inline-code-bg fallbacks, h1/h2/h3 tracking deltas, all dark values
derived (no dark blog frames exist).

## Canonical refs

`38-BLOG-EXTRACTION.md` (297-line spec, all values sourced to 195:* node ids) is the durable design
record; `38-BLOG-FRAMES.md` holds the re-baseline + approval + content-mapping decisions.

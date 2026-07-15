---
phase: 34-baselayout-chrome
plan: "03"
subsystem: routing
tags: [blog-exclusion, sitemap, redirects, astro-config, prod-guard]
one-liner: "Prod-exclude blog via empty getStaticPaths + Astro.redirect guard + sitemap filter; /faq → / redirect with faq.astro deleted (D-13 both gates, D-03 shipping subset)"

dependency-graph:
  requires:
    - "33-token-foundation-fonts (infrastructure)"
  provides:
    - "Blog absent from prod HTML and sitemap (D-13)"
    - "/faq → / redirect via meta-refresh (D-03 subset)"
  affects:
    - "Phase 38: blog restyle will work in dev; prod exclusion stays"
    - "Phase 40: /projects redirect deferred here, ships there"

tech-stack:
  added: []
  patterns:
    - "getStaticPaths empty return in PROD for dynamic blog routes"
    - "Astro.redirect('/') in page frontmatter for static index prod-guard"
    - "sitemap() filter function excluding /blog URLs"
    - "Astro redirects config generating meta-refresh HTML stubs"

file-tracking:
  created: []
  modified:
    - "src/pages/blog/[slug].astro"
    - "src/pages/blog/tags/[tag].astro"
    - "src/pages/blog/index.astro"
    - "astro.config.mjs"
  deleted:
    - "src/pages/faq.astro"

decisions:
  - id: "D-13-gate-1"
    description: "Empty getStaticPaths in PROD for [slug].astro and [tag].astro"
    rationale: "No blog post or tag HTML generated in prod build"
  - id: "D-13-gate-2"
    description: "sitemap filter: (page) => !page.includes('/blog')"
    rationale: "Both gates required per Pitfall 3 — getStaticPaths alone does not remove from sitemap"
  - id: "D-13-gate-3"
    description: "Astro.redirect('/') guard in blog/index.astro frontmatter (after imports)"
    rationale: "index.astro is not a dynamic route so getStaticPaths gate unavailable; redirect generates meta-refresh stub"
  - id: "D-03-ships"
    description: "/faq → / in astro.config.mjs redirects; faq.astro deleted"
    rationale: "File must be deleted to avoid redirect-vs-file conflict (RESEARCH Pitfall 6)"
  - id: "D-03-deferred"
    description: "/projects → / redirect NOT added in Phase 34"
    rationale: "src/pages/projects/ files still exist; adding redirect causes conflict (Pitfall 6). Deferred to Phase 40 when those files are deleted."

metrics:
  duration: "~5 minutes"
  completed: "2026-07-15"
  tasks-completed: 2
  tasks-total: 2
---

# Phase 34 Plan 03: Blog Prod-Exclusion + Redirects Summary

**One-liner:** Prod-exclude blog via empty getStaticPaths + Astro.redirect guard + sitemap filter; /faq → / redirect with faq.astro deleted (D-13 both gates, D-03 shipping subset)

## What Was Built

Both gates required by D-13 to exclude the blog from production:

1. **Gate 1 — No HTML generated:** `if (import.meta.env.PROD) return [];` inserted as first statement in `getStaticPaths` for `src/pages/blog/[slug].astro` and `src/pages/blog/tags/[tag].astro`. In production builds, these dynamic routes emit zero HTML files.

2. **Gate 2 — Not in sitemap:** `filter: (page) => !page.includes('/blog')` added as first key in the `sitemap()` integration call in `astro.config.mjs`. Confirmed: `grep -r "blog" dist/sitemap*.xml` returns zero matches.

3. **Blog index redirect:** `Astro.redirect('/')` guard added to `src/pages/blog/index.astro` frontmatter (after imports, per Astro's requirement that imports precede executable code). Generates a meta-refresh HTML stub at `dist/blog/index.html` pointing to `/` in production.

4. **D-03 /faq redirect:** `'/faq': '/'` added to the `redirects` object in `astro.config.mjs`. `src/pages/faq.astro` deleted to avoid file-vs-redirect conflict. `dist/faq/index.html` confirmed to contain `meta http-equiv="refresh"` pointing to `/`.

5. **D-03 deferred items recorded:** `/projects → /showcase` and `/projects/[slug]` redirects are NOT added. The `src/pages/projects/` files still exist in Phase 34; adding these redirects would conflict per RESEARCH Pitfall 6. These ship in Phase 40 when those files are deleted.

## Commits

| Hash | Description | Files |
|------|-------------|-------|
| `4a00eff` | feat(34-03): prod-exclude blog dynamic routes and index | [slug].astro, [tag].astro, index.astro |
| `6b3115f` | feat(34-03): sitemap blog filter, /faq redirect, delete faq.astro | astro.config.mjs, faq.astro (deleted) |

## Verification Results

All plan verification checks passed:

- `npm run build` exits 0
- `grep -r "blog" dist/sitemap*.xml` → 0 matches (PASS)
- `dist/faq/index.html` contains `http-equiv="refresh"` pointing to `/` (PASS)
- `dist/blog/` contains only `index.html` — no post slug directories (PASS)
- No `/projects` source redirect added to `astro.config.mjs` (PASS)

## Dev Behavior (Documented)

Dev builds (`npm run dev`) keep the blog fully functional:
- `/blog` index serves the full blog listing with filter UI
- `/blog/[slug]` serves individual post pages
- `/blog/tags/[tag]` serves tag-filtered post pages
- The `if (import.meta.env.PROD)` guards are false in dev, so all code paths execute normally
- Blog link will appear in header/footer in dev builds when `isDev` gate is added in Plans 01/02

This dev behavior is required so Phase 38 can restyle the blog without needing to undo prod exclusion.

## Deviations from Plan

None — plan executed exactly as written.

The only note: `import.meta.env.PROD` guard in `blog/index.astro` was initially placed before imports (matching the PATTERNS.md spec), which caused an esbuild "Unterminated string literal" error. Moved guard to after imports (Astro requires imports first in frontmatter). The PATTERNS.md example showed this placement but noted "as the very first statement in the frontmatter, before the imports" — this was a spec ambiguity resolved by Astro's runtime requirement. The guard now sits immediately after imports and before any page logic, achieving the same effect.

## D-03 Shipping vs. Deferred Summary

| Route | Status | Phase |
|-------|--------|-------|
| `/faq` → `/` | SHIPPED | Phase 34 (this plan) |
| `/projects` → `/showcase` | DEFERRED | Phase 40 (after projects files deleted) |
| `/projects/[slug]` → `/showcase` | DEFERRED | Phase 40 |

## Next Phase Readiness

- Phase 38 (Blog Restyle): blog is fully accessible in dev; prod exclusion stays in place throughout
- Phase 40 (URL Strategy): `/projects` redirect is the primary outstanding item from D-03
- No blockers for Plans 01/02/04 in Phase 34 (this plan is file-isolated)

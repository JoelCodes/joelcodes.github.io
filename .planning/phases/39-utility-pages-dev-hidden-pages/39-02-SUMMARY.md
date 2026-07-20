---
phase: 39
plan: "02"
subsystem: pages
tags: [404, sitemap, a11y, wavelength, astro]
one-liner: "Branded 404 page with FrequencyWave + sitemap filter extended to /services/ and /areas/"

dependency-graph:
  requires:
    - "38-01 (BaseLayout chrome, wl/ component set, gradient pattern)"
    - "36-04 (FrequencyWave component)"
    - "35-01 (CTAButton component)"
    - "33-01 (Wavelength tokens: --color-wl-ink, --color-wl-sub, --color-wl-paper, --color-wl-accent)"
  provides:
    - "src/pages/404.astro — branded not-found page, publicly reachable, HTTP 404 convention"
    - "astro.config.mjs — sitemap filter extended with /services/ and /areas/ exclusions (IA-02 sitemap half)"
    - "tests/accessibility/404.spec.ts — axe WCAG 2.2 AA spec, light + dark, zero violations"
  affects:
    - "39-04 (dev-hidden pages noindex meta — SEO half of IA-02)"
    - "39-05 (definitive sitemap grep gate after /services/web and /areas/abbotsford are built)"

tech-stack:
  added: []
  patterns:
    - "Astro 404.astro zero-config convention — builds to dist/404.html, HTTP 404 from preview"
    - "Four-clause sitemap filter: /blog + /showcase + /services/ + /areas/ (trailing slash = future-safe)"
    - "FrequencyWave absolutely positioned behind 640px content column (D-06 resolution: include)"
    - "Gradient background in class arbitrary-value syntax, not inline style (Phase 38 Rule 1 reaffirmed)"

key-files:
  created:
    - src/pages/404.astro
    - tests/accessibility/404.spec.ts
  modified:
    - astro.config.mjs

decisions:
  - id: D-06-resolution
    description: "FrequencyWave included on 404 (D-06 was Claude's discretion). A 640px text column at full viewport height on a paper/gradient background feels sparse without texture. Wave placed absolutely behind content, same pattern as landing hero."
    rationale: "Visual completeness — single centered column on full viewport benefits from background depth."
  - id: sitemap-filter-clause
    description: "Filter: !page.includes('/services/') && !page.includes('/areas/') — trailing slash prevents false-positives on hypothetical /services-something paths."
    rationale: "RESEARCH Pitfall 5 — trailing slash = matches /services/web/ and future sub-pages without over-matching."
  - id: noindex-on-404
    description: "404 page carries NO noindex meta. 404.astro is a public page by definition; only /services/web and /areas/abbotsford need noindex (handled in 39-04)."
    rationale: "CONTEXT D-05 and RESEARCH RQ-4 — 404 must stay publicly reachable."

metrics:
  duration: "~2 minutes"
  completed: "2026-07-20"
  tasks: 3
  deviations: 0
---

# Phase 39 Plan 02: 404 Page + Sitemap Filter Summary

## What Was Built

**Task 1: astro.config.mjs sitemap filter extended**

The existing Phase 38 sitemap filter (`!page.includes('/blog') && !page.includes('/showcase')`) was extended with two additional clauses to exclude future `/services/` and `/areas/` URLs from the generated sitemap XML. The trailing slash form (`/services/`) was used per RESEARCH Pitfall 5 to safely match `/services/web/` and any future sub-pages without false-positives on hypothetical `/services-something` paths.

Verification: `npm run build && grep -r "services/web\|areas/abbotsford" dist/sitemap-*.xml` returns exit code 1 (zero matches). This is the IA-02 sitemap-half gate; the definitive grep gate (after actual /services/web and /areas/abbotsford pages are built in 39-03/39-04) runs in 39-05.

**Task 2: src/pages/404.astro created**

Branded not-found page using BaseLayout chrome, Wavelength tokens, and verbatim locked copy (D-05). Key implementation decisions:

- No `import.meta.env.PROD` or `Astro.redirect` — 404 must stay publicly reachable per D-05.
- FrequencyWave included per D-06 discretion (see Decisions section below).
- Gradient background in Tailwind arbitrary-value class syntax, not inline `style` — prevents dark: override failure (Phase 38 Rule 1 / Pitfall 3).
- No `slot="head"` noindex — 404 pages are public and not dev-hidden.
- Astro zero-config convention: builds to `dist/404.html`, served with HTTP 404 by `npm run preview` on unmatched URLs.

Locked copy verified verbatim (D-05):
- h1: "Page not found"
- lead: "This page has moved or doesn't exist. Head back to the homepage to find what you're looking for."
- CTA: "Back to home" with `href="/"`

**Task 3: tests/accessibility/404.spec.ts created**

Exact clone of `tests/accessibility/showcase.spec.ts` with route changed to `/404`. Light-mode test and dark-mode test (with `colorScheme: 'dark'` context and `html.dark` class assertion) both pass zero axe violations at WCAG 2.2 AA tags.

## Decisions Made

### D-06 Resolution: FrequencyWave included on 404

**Decision:** Include FrequencyWave on the 404 page.

**Rationale:** A single 640px text column (h1 + lead paragraph + CTA button) on a full-viewport page with a flat gradient background feels visually sparse without a background texture. The FrequencyWave provides the same depth that it provides on the landing hero section (index.astro). It is placed absolutely behind the content column (`position: relative; overflow: hidden` on section, `<FrequencyWave class="absolute pointer-events-none">` before content, content wrapper `relative z-10`), following the exact landing hero pattern.

No new SVG decoration was invented — this is the existing approved FrequencyWave component.

### Sitemap Filter: Trailing Slash Pattern

`!page.includes('/services/')` and `!page.includes('/areas/')` use trailing slashes. This matches `/services/web/` and any future `/services/automations/` without false-positives on hypothetical `/services-something` paths (RESEARCH Pitfall 5).

## Deviations from Plan

None — plan executed exactly as written.

## Verification Results

| Check | Command | Result |
|-------|---------|--------|
| Build success | `npm run build` | PASS — 8 pages built |
| Sitemap filter gate | `grep -r "services/web\|areas/abbotsford" dist/sitemap-*.xml` | PASS — exit code 1 (zero matches) |
| 404 stays public | `grep -c "import.meta.env.PROD\|Astro.redirect" src/pages/404.astro` | PASS — returns 0 |
| axe light mode | `npm run test:a11y -- --grep 404` | PASS — zero violations |
| axe dark mode | `npm run test:a11y -- --grep 404` | PASS — zero violations |

## Commits

| Task | Commit | Message |
|------|--------|---------|
| Task 1 | ed21c6d | chore(39-02): extend sitemap filter to exclude /services/ and /areas/ |
| Task 2 | 4ff44b2 | feat(39-02): create branded 404 page with locked copy and FrequencyWave |
| Task 3 | 707fd25 | test(39-02): add 404 page axe accessibility spec in light + dark |

## Next Phase Readiness

- **39-03** (Figma frame drafting for service/area pages) — unblocked, no dependencies on this plan.
- **39-04** (noindex wiring for service/area pages) — unblocked; follows Option A head-slot pattern documented in RESEARCH RQ-2.
- **39-05** (definitive sitemap grep gate) — waits for 39-03/39-04 to build the actual /services/web and /areas/abbotsford pages; then runs the full `grep -r "services/web\|areas/abbotsford" dist/sitemap-*.xml` gate.

No blockers. IA-02 sitemap half is done.

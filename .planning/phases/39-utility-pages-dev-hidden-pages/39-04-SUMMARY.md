---
phase: 39-utility-pages-dev-hidden-pages
plan: "04"
subsystem: ui
tags: [astro, tailwind, accessibility, axe, seo, json-ld, noindex, breadcrumb, faq, service-card, link-card]

requires:
  - phase: 39-02
    provides: sitemap filter excluding /services/ and /areas/ already in place
  - phase: 39-03
    provides: 39-EXTRACTION.md with verbatim copy authority for both frames
  - phase: 37-landing-page
    provides: page-shell patterns (gutters, 112px padding, 1120px max-width, BOOKING_URL)
  - phase: 35-ui-primitives
    provides: wl/ component library (ServiceCard, CTAButton, Eyebrow, LinkCard, Breadcrumb, FAQItem, FrequencyWave)

provides:
  - src/pages/services/web.astro — 6-section Service Web dev-hidden page (PAGE-03)
  - src/pages/areas/abbotsford.astro — 6-section Area page + ProfessionalService JSON-LD (PAGE-04)
  - tests/accessibility/services-web.spec.ts — axe spec (light + dark)
  - tests/accessibility/areas-abbotsford.spec.ts — axe spec (light + dark)
  - noindex half of IA-02 complete (sitemap half done in 39-02)

affects:
  - 39-05 (fidelity gate — these pages are the gate subjects)
  - 40-url-strategy (when nav link is added for /services/web, flip noindex)
  - FUT-03 (Abbotsford publish path: drop noindex, add sitemap, GBP NAP)

tech-stack:
  added: []
  patterns:
    - "noindex via BaseLayout head slot: <meta slot='head' name='robots' content='noindex, nofollow' />"
    - "ProfessionalService JSON-LD via <script slot='head' type='application/ld+json' set:html={JSON.stringify(schema)} />"
    - "Dev-hidden = ship to prod + noindex + sitemap filter + unlinked nav (Strategy A, D-01/D-02)"
    - "COPY GAP marker: <span style='background:yellow; outline:2px solid red;'>[COPY GAP: ...]</span>"

key-files:
  created:
    - src/pages/services/web.astro
    - src/pages/areas/abbotsford.astro
    - tests/accessibility/services-web.spec.ts
    - tests/accessibility/areas-abbotsford.spec.ts
  modified: []

key-decisions:
  - "Strategy A confirmed (D-01/D-02): no PROD redirect on either page — noindex + sitemap + unlinked is the full hiding mechanism"
  - "ProfessionalService JSON-LD minimal (D-04): areaServed=Abbotsford BC, no address/telephone"
  - "4 FAQ answers are [COPY GAP] — rendered as yellow-bg/red-outline markers (logged in 39-COPY-GAPS.md)"
  - "No net-new contrast pairs added — all page bg literals already covered by Phases 37/38 additions"
  - "Curly quotes in JSX body= prop fixed via template literal syntax (build-time error)"

patterns-established:
  - "Interior page template: Breadcrumb → Eyebrow → h1 → lead → CTAs, FrequencyWave behind hero"
  - "Numbered list items rendered as <ol> with list-style:none + accent numbered spans (no Step component)"

duration: 25min
completed: 2026-07-20
---

# Phase 39 Plan 04: Service Web + Area Abbotsford Dev-Hidden Pages Summary

**Two dev-hidden interior pages built from verbatim Figma extraction — /services/web (6 sections, 4 FAQ copy-gap markers) and /areas/abbotsford (6 sections, minimal ProfessionalService JSON-LD) — noindexed via head slot, excluded from sitemap, zero axe violations light + dark.**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-07-20T21:35:00Z
- **Completed:** 2026-07-20T22:00:00Z
- **Tasks:** 3 (Tasks 2–4; Task 1 extraction done prior)
- **Files created:** 4

## Accomplishments

- Built `src/pages/services/web.astro` — 6 sections (Hero, Kinds, Proper, FAQ, Paired, Final CTA) composited from wl/ components with verbatim copy from 39-EXTRACTION.md PAGE A; FAQ answers rendered as [COPY GAP] markers
- Built `src/pages/areas/abbotsford.astro` — 6 sections (Hero, Local, Ops, Promise, Make, Final CTA) with SCAFFOLD copy verbatim from 39-EXTRACTION.md PAGE B; minimal ProfessionalService JSON-LD injected via head slot (no address/telephone per D-04)
- Added axe specs `tests/accessibility/services-web.spec.ts` and `tests/accessibility/areas-abbotsford.spec.ts` — 4 tests total, all passing (light + dark, zero violations)
- Verified: noindex in both rendered `<head>`; canonical present; sitemap grep zero; no PROD redirect; JSON-LD with `areaServed: "Abbotsford, BC"` in built output

## Task Commits

1. **Task 2+3: Build /services/web and /areas/abbotsford** — `76a379e` (feat)
2. **Task 4: Add axe specs for both pages** — `2ebf6e5` (test)

## Files Created

- `src/pages/services/web.astro` — Service Web page (6 sections, noindex, no PROD redirect)
- `src/pages/areas/abbotsford.astro` — Area page (6 sections, noindex, ProfessionalService JSON-LD)
- `tests/accessibility/services-web.spec.ts` — axe spec light + dark
- `tests/accessibility/areas-abbotsford.spec.ts` — axe spec light + dark

## Decisions Made

- **No PROD redirect (D-01/D-02 confirmed):** Both pages ship to `dist/` and are reachable by direct URL. Hiding mechanism is: noindex meta + sitemap filter + unlinked nav. The `if (import.meta.env.PROD) return Astro.redirect('/')` pattern from showcase.astro is explicitly NOT used here.
- **ProfessionalService JSON-LD minimal (D-04):** Injected `name`, `url`, `areaServed: "Abbotsford, BC"`, `serviceType`, `provider` (Person: Joel Shinness). No `address`, no `telephone`. Deferred to FUT-03.
- **FAQ answers as [COPY GAP] markers:** 4 answers not in Figma frame 85:103. Yellow-bg/red-outline markers rendered in-place; logged in 39-COPY-GAPS.md entries #1–4.
- **No net-new contrast pairs:** Both pages use only bg literals already validated — `#E6F1F1`/`#D2E7E7` gradient (Phase 37), `#EFF7F6`/`#E6F1F1` gradient (Phase 38), `var(--color-wl-paper)` (base pairs). `scripts/check-contrast.mjs` unchanged.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Curly quotes in JSX body prop caused build failure**

- **Found during:** Task 2 (build attempt)
- **Issue:** Extraction copy for ServiceCard "Websites" body contained curly/typographic double quotes `"get in touch"` inside a double-quoted JSX attribute (`body="..."`). esbuild raised parse error `Expected ":" but found "\":true,\""` at line 80.
- **Fix:** Changed the `body=""` attribute to `body={...}` template literal syntax for the Websites ServiceCard, preserving the verbatim extraction copy.
- **Files modified:** `src/pages/services/web.astro`
- **Verification:** `npm run build` succeeded on next attempt; built HTML confirmed correct quote rendering.
- **Committed in:** `76a379e` (part of Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - build-blocking parse error from JSX quote conflict)
**Impact on plan:** Minor — copy preserved verbatim, only attribute syntax changed. No scope creep.

## Issues Encountered

None beyond the JSX quote issue documented above (auto-fixed in-line).

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Both dev-hidden pages are ready for the fidelity gate (Plan 39-05): `src/pages/services/web.astro` and `src/pages/areas/abbotsford.astro` are built, accessible, and locally reviewable at `npm run dev`
- [COPY GAP] items (FAQ answers #1–4) are rendered as yellow-bg markers awaiting Joel's copy at the gate
- SCAFFOLD copy on `/areas/abbotsford` (D-03) visible and flagged — not final for publish
- Dark treatment is derived (no dark frames for 85:103/85:104) — Phase 38 D-04 recipe applied; flagged for gate comparison
- No blockers for 39-05 fidelity gate

---
*Phase: 39-utility-pages-dev-hidden-pages*
*Completed: 2026-07-20*

---
phase: 25-leaf-page-migrations-faq-thank-you-404
plan: 01
subsystem: ui
tags: [astro, tailwind-v4, baselayout-v2, accordion, json-ld, faqpage, axe-core, playwright]

# Dependency graph
requires:
  - phase: 23-design-system-foundation
    provides: v2 tokens (src/styles/v2/global.css), BaseLayoutV2, light-mode-only invariant, --font-display / --font-text
  - phase: 24-v2-primitive-library-design-system-page
    provides: Button (variant=primary, polymorphic href), D-18 focus-ring rule, D-19 token-driven styling
  - phase: 26-blog-migration-post-layout-index-tag-pages
    provides: page-header banner pattern (D-26-08 — .blog-hero / .blog-hero__breadcrumbs / .blog-hero__title), wcagTags constant pattern (tests/accessibility/v2-blog.spec.ts)
provides:
  - /faq page rewritten on BaseLayoutV2 with Crito-faithful page-header banner, native <details>/<summary> divider-list accordion, and bottom CTA banner
  - FAQPage JSON-LD schema preserved verbatim and injected via <script slot="head">
  - tests/accessibility/v2-leaf.spec.ts (Wave 0 scaffold) with /faq Category A coverage (A1-A4 + A3b chevron rotation)
  - Reusable .blog-hero banner reuse pattern (verbatim from /blog index, no rename) — sets precedent for /projects index in Phase 27
affects:
  - Phase 25 Plan 25-02 (consumes v2-leaf.spec.ts as Wave 0 dependency for /thank-you and /404 tests)
  - Phase 27 (/projects index — may reuse .blog-hero banner pattern; rename to .page-hero deferred pending second consumer)
  - Phase 30 cleanup (v1 components no longer consumed by /faq)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Crito-faithful page-header banner reused on a leaf page (D-25-01) — .blog-hero class names kept verbatim per RESEARCH OQ-1; rename deferred to second consumer"
    - "Native <details>/<summary> divider-list accordion with WebKit + Firefox marker suppression (::-webkit-details-marker + ::marker) and CSS-only ChevronDown rotation via details[open] selector (D-25-03..06)"
    - "FAQPage JSON-LD injection via <script slot=\"head\" type=\"application/ld+json\" set:html={JSON.stringify(schema)} /> — slot=\"head\" targets BaseLayoutV2 line 29"
    - "Wave 0 a11y spec scaffold with single-route describe block, populated incrementally per plan (25-01 ships /faq describe, 25-02 will append /thank-you + /404)"

key-files:
  created:
    - tests/accessibility/v2-leaf.spec.ts
  modified:
    - src/pages/faq.astro

key-decisions:
  - "Kept .blog-hero class names verbatim (no rename to .page-hero) per RESEARCH OQ-1 — Phase 27 can revisit when /projects index reuses the same chrome and a multi-file sweep makes sense"
  - "Passed bare title=\"FAQ\" to BaseLayoutV2 (matches v1 correct pattern; SEO.astro auto-appends ' | Joel Shinness'); RESEARCH Pitfall 2 / OQ-2 resolution = fix-as-you-touch toward correct pattern"
  - "JSON-LD locator in test uses .nth(1) because SEO.astro emits a Person schema at index 0 (BaseLayoutV2 places <slot name=\"head\"> after <SEO />); FAQPage is the second JSON-LD script in DOM order"
  - "Used Tailwind utility (mb-6) for the bottom-CTA h2 extra margin rather than a CSS variant class (.blog-hero__title--cta) — keeps the scoped <style> block lean and removes a third blog-hero__title selector"
  - "Did not factor a v2 accordion primitive (D-25-20 single-consumer rule) — divider-list CSS lives inline on /faq only"

patterns-established:
  - "page-header banner reuse: copy .blog-hero markup + scoped <style> from src/pages/blog/index.astro verbatim, string-swap the page label, do NOT rename the class prefix in this phase"
  - "native disclosure-marker suppression recipe: list-style: none on summary + ::-webkit-details-marker { display: none } + ::marker { display: none } — the three-line idiom required for cross-browser parity (Tailwind v4 does not reset by default)"
  - "JSON-LD injection in v2 layout: <script slot=\"head\" type=\"application/ld+json\" set:html={JSON.stringify(schema)} /> as first child inside <BaseLayout> — exploits the existing <slot name=\"head\" /> on BaseLayoutV2 line 29 without adding a layout prop"
  - "Plan-25 a11y test category A pattern: A1 page render + axe, A2 JSON-LD shape (5 mainEntity, FAQPage type, Question + Answer types), A3 keyboard accordion toggle (Enter both opens and closes), A3b chevron rotation via computed transform contains 'matrix', A4 CTA href"

requirements-completed:
  - LEAF-01

# Metrics
duration: ~11 min
completed: 2026-05-21
---

# Phase 25 Plan 01: /faq migration to BaseLayoutV2 + Wave 0 a11y scaffold

**Rewrote `/faq` on `BaseLayoutV2` with the Crito-faithful page-header banner, a native `<details>/<summary>` divider-list accordion (ChevronDown rotation, WebKit + Firefox marker suppression, FAQPage JSON-LD preserved verbatim), and a symmetric bottom CTA banner → `/#contact`; shipped `tests/accessibility/v2-leaf.spec.ts` (Wave 0 dependency) with 5 passing /faq Category A tests covering render + axe, JSON-LD shape, keyboard toggle, chevron rotation, and CTA href.**

## Performance

- **Duration:** ~11 min
- **Started:** 2026-05-21T19:56:00Z (approx — context load + execution start)
- **Completed:** 2026-05-21T20:07:25Z
- **Tasks:** 2 (both `type="auto"`)
- **Files modified:** 1 (src/pages/faq.astro rewritten)
- **Files created:** 1 (tests/accessibility/v2-leaf.spec.ts)

## Accomplishments

- `/faq` migrated off v1 chrome onto BaseLayoutV2: dropped the inline `<!doctype>` shell, the dark-mode FOUC `<script is:inline>`, the Google Fonts CDN preconnect/preload chain, the `dark:` utilities, and the neobrutalist `border-[3px]` accordion border.
- Three composed sections inside `<BaseLayout title="FAQ" description="...">`:
  1. Top page-header banner (D-25-01) — surface-muted band, breadcrumbs `Home / FAQ`, centered display-font `<h1>Frequently Asked Questions</h1>`.
  2. Native `<details>/<summary>` divider-list accordion (D-25-03..06) — 5 question/answer pairs, 1px `--color-border` bottom rules between rows, no Card per row, Lucide ChevronDown that rotates 180° on `[open]` via CSS, color shifts `--color-text-muted` → `--color-primary` on open.
  3. Bottom CTA banner (D-25-02) — symmetric surface-muted band, `<h2>Still have questions? Let's talk.</h2>`, primary v2 Button labeled "Get in touch" with `href="/#contact"`.
- FAQPage JSON-LD schema preserved verbatim from v1 (5 mainEntity Questions with acceptedAnswer Answers) and injected via `<script slot="head" type="application/ld+json" set:html={JSON.stringify(faqSchema)} />`.
- Native disclosure markers suppressed for Safari/WebKit (`::-webkit-details-marker { display: none }`) and Firefox (`::marker { display: none }`) so only the ChevronDown icon renders.
- New file `tests/accessibility/v2-leaf.spec.ts` patterned on `tests/accessibility/v2-blog.spec.ts` — same `wcagTags = ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']` constant + AxeBuilder pattern. Single `test.describe('v2 /faq (Plan 25-01)')` block with 5 tests (A1, A2, A3, A3b, A4) — all 5 pass with zero axe violations.

## Task Commits

Each task was committed atomically on `worktree-agent-a4315fbe60f7cc178`:

1. **Task 1: Rewrite /faq on BaseLayoutV2 with banner + accordion + CTA + JSON-LD** — `23139b2` (feat)
2. **Task 2: Create tests/accessibility/v2-leaf.spec.ts (Wave 0) with /faq Category A tests** — `a0ab9a6` (test)

## Files Created/Modified

- `src/pages/faq.astro` — REWRITTEN in place (180 lines after rewrite vs. 121 lines before). v1 imports stripped (Header/Footer/SEO/BaseLayout v1 dropped). Composes BaseLayoutV2 + ChevronDown + v2 Button. Scoped `<style>` block contains both the banner CSS (verbatim from `src/pages/blog/index.astro` lines 168-214) and the new divider-list accordion CSS (D-25-04..06 recipe + Phase 24 D-18 focus ring).
- `tests/accessibility/v2-leaf.spec.ts` — NEW. 80 lines. Imports + wcagTags constant + single `test.describe('v2 /faq (Plan 25-01)')` block with 5 tests. No /thank-you or /404 describe blocks (Plan 25-02 appends those).

## Decisions Made

- **Kept `.blog-hero` class names verbatim** (no rename to `.page-hero`) per the plan's `read_first` directive and 25-RESEARCH OQ-1. Astro's per-file scoped styles mean there is no global collision with `src/pages/blog/index.astro`. Phase 27 may revisit when `/projects` index becomes the second consumer of the banner chrome.
- **Passed bare `title="FAQ"`** (not the pre-suffixed `"FAQ | Joel Shinness"`) — `SEO.astro` line 30 (`const fullTitle = \`${title} | ${SITE_NAME}\`;`) auto-appends the suffix. RESEARCH Pitfall 2 / OQ-2 resolution = fix-as-you-touch toward the correct pattern (v1 `/faq` already used the correct shape).
- **Test uses `.nth(1)` for the FAQPage JSON-LD locator** — verified at build that `dist/faq/index.html` contains two `<script type="application/ld+json">` tags: index 0 is the Person schema emitted by `SEO.astro` line 77, index 1 is the FAQPage schema emitted by `faq.astro` via `<slot name="head">`. BaseLayoutV2 places `<slot name="head" />` on line 29 immediately AFTER `<SEO />` on line 27, so the order is deterministic.
- **Used `mb-6` Tailwind utility on the CTA h2** rather than introducing a CSS modifier class (`.blog-hero__title--cta`). Keeps the scoped `<style>` block lean. The bottom CTA needs slightly more space below the headline (for the button below) than the top banner needs below the h1; a single utility handles this cleanly.
- **Did NOT factor a v2 accordion primitive** — D-25-20 single-consumer rule. Accordion CSS lives inline on `/faq.astro` only. Re-evaluate when a second accordion location ships in v1.5+.

## Deviations from Plan

### Documentation-only deviation (literal vs. semantic acceptance criterion)

**1. [Documented in plan, not a Rule 1-4 fix] `grep -c "blog-hero__title"` returns 3, plan expected 2**
- **Found during:** Task 1 (initial verification grep)
- **Issue:** Plan acceptance criterion stated `grep -c "blog-hero__title" src/pages/faq.astro returns 2 (banner h1 + CTA h2 both carry the class; confirms the class prefix was NOT renamed to page-hero)`. The literal `grep -c` counts every line containing the string, and a CSS selector for the class (`.blog-hero__title { ... }`) is required for the heading to render with the Crito-faithful styling. The intent (h1 + h2 markup both carrying the class to confirm no rename) is fully satisfied with 2 markup occurrences; the third occurrence is the CSS selector.
- **Fix:** Refactored to use a Tailwind `mb-6` utility on the CTA h2 instead of a `.blog-hero__title--cta` modifier class — removed one CSS selector line. Final count is 3 (h1 markup, h2 markup, single CSS selector line) which is the minimum achievable while keeping the class on both heading elements and rendering the banner styling. The reference `src/pages/blog/index.astro` also has 2 `blog-hero__title` lines (1 h1 markup + 1 CSS selector) — adding a second markup usage on faq.astro pushes the count to 3 inherently.
- **Files modified:** src/pages/faq.astro
- **Verification:** `grep -n "blog-hero__title" src/pages/faq.astro` shows exactly: line 61 (h1 markup), line 81 (h2 markup), line 116 (`.blog-hero__title {` selector). Both heading elements carry the class — class prefix was NOT renamed (intent satisfied).
- **Committed in:** 23139b2 (Task 1 commit)
- **Note:** This is a *documentation-only* deviation — the plan's literal grep contract was unreachable as written; the semantic intent ("verifies class-prefix was NOT renamed") is fully met. No Rule 1-4 trigger.

---

**Total deviations:** 1 documentation-only (literal-vs-semantic acceptance-criterion reconciliation)
**Impact on plan:** Zero functional impact. All `must_haves.truths`, `must_haves.artifacts`, and `must_haves.key_links` from the plan frontmatter remain satisfied. All other verify steps and acceptance criteria pass literally.

## Issues Encountered

- **Stale astro check warnings on first run:** First `npm run astro check` after rewriting faq.astro reported two warnings pointing at line numbers that did not exist in the rewritten file (referenced `onload="this.media='all'"` which is v1-only). Re-running astro check immediately afterward returned `0 warnings`, suggesting an incremental-cache hiccup. No fix required — confirmed clean on second invocation. Pre-existing 6 errors (5 in `src/components/design-system/CodeBlock.astro`, 1 in v1 `src/pages/thank-you.astro` referencing `strokeWidth` instead of `stroke-width`) are unchanged by this plan.
- **`grep -c "application/ld+json" dist/faq/index.html` returns 1, not 2:** Initially seemed wrong (expected 2 JSON-LD scripts: Person + FAQPage). Investigation showed Astro emits both scripts on the same minified HTML line, so line-based `grep -c` returns 1 but `grep -o ... | wc -l` returns 2. Built page has both scripts in DOM order: `[Person, FAQPage]`. This drove the `.nth(1)` decision for the JSON-LD locator in the test (verified passing).

## User Setup Required

None — no external service configuration required for this plan. Phase 28 will gate `PUBLIC_N8N_WEBHOOK_URL` and Plan 25-02 will add the `PUBLIC_CALENDLY_URL` env-var wiring; neither concerns /faq.

## Next Phase Readiness

**Ready for Plan 25-02:**
- `tests/accessibility/v2-leaf.spec.ts` exists with the `wcagTags` constant and a single `test.describe('v2 /faq')` block. Plan 25-02 can append `test.describe('v2 /thank-you (Plan 25-02)')` and `test.describe('v2 /404 (Plan 25-02)')` blocks without restructuring.
- The `.blog-hero` banner pattern reuse (D-25-01) is now demonstrated on a second page (`/faq`). Phase 27 will be the third consumer (`/projects` index) — that's when a class-prefix rename to `.page-hero` and a sweep across `/blog/index.astro` / `/blog/tags/[tag].astro` / `/faq.astro` becomes worth the churn.
- All `must_haves` from the plan frontmatter are true:
  - `truths` 1-11: all confirmed via grep + build + playwright
  - `artifacts`: both `src/pages/faq.astro` and `tests/accessibility/v2-leaf.spec.ts` exist with the specified `contains` / `contains_also` strings
  - `key_links` 1-4: all pattern grep regexes match

**No blockers or concerns for Plan 25-02.**

**Plan 25-02 inputs ready:**
- Wave 0 spec scaffold (`v2-leaf.spec.ts`) populated and proven (5 passing tests).
- Banner reuse pattern documented and shipped (`.blog-hero` verbatim from `/blog/index.astro` — string-swap the page label, do not rename the class prefix).
- JSON-LD `<slot name="head">` injection pattern proven (necessary for `/404`'s `<meta name="robots" content="noindex">`).

---
*Phase: 25-leaf-page-migrations-faq-thank-you-404*
*Plan: 01*
*Completed: 2026-05-21*

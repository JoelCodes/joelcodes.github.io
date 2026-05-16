---
phase: 25-leaf-page-migrations-faq-thank-you-404
plan: 01
subsystem: leaf-page-migration

tags: [astro, tailwind-v4, base-layout-v2, lucide, faqpage-jsonld, axe-core, playwright, native-details, slot-injection]

# Dependency graph
requires:
  - phase: 23-design-system-foundation
    provides: BaseLayoutV2 (slot=\"head\" mechanism, light-mode invariant, Plus Jakarta Sans preload)
  - phase: 24-v2-primitive-library-design-system-page
    provides: Button + Card + CardBody primitives, --max-width-* tokens, --shadow-md token, focus-ring scoped style on every interactive primitive

provides:
  - "v2 /faq page on BaseLayoutV2 with bordered <details> rows + ChevronDown indicator"
  - "FAQPage JSON-LD shipped via slot=\"head\" mechanism (D-08)"
  - "Centered elevated CTA Card composition (re-used by /thank-you and /404 in Plan 25-02)"
  - "tests/accessibility/v2-leaf-pages.spec.ts (4 tests, 1 describe — Wave-0 dependency for Plan 25-02)"
  - "Most-legacy file in the codebase (122-line v1 faq.astro with inline <html>, Google Fonts, dark-mode boot, v1 imports) eliminated"

affects:
  - 25-02 (depends on tests/accessibility/v2-leaf-pages.spec.ts existing — handoff complete; spec file already covers /thank-you and /404 axe tests, 25-02 only edits page files)
  - 26-blog-migration (centered-Card CTA composition pattern reusable as a blog-post end-of-article CTA)
  - 27-services-projects-migration (slot=\"head\" JSON-LD pattern reusable for project schema markup)

# Tech tracking
tech-stack:
  added: []  # zero new packages — every dependency was already shipped in Phase 23/24
  patterns:
    - "Native <details>/<summary> accordion with group-open:rotate-180 ChevronDown indicator (JS-free, accessible, single motion vocabulary at duration-200ms matching v2 Card hover)"
    - "FAQPage JSON-LD via <script type=\"application/ld+json\" set:html={JSON.stringify(...)} slot=\"head\"> — ships structured data into <head> through BaseLayoutV2's named-slot mechanism"
    - "Centered elevated CTA Card composition: <Card elevated={true} class=\"max-w-2xl mx-auto text-center\"><CardBody>...<Button variant=\"primary\" size=\"md\" href=\"/#contact\">...</Button></CardBody></Card> — visual family for thank-you and 404"
    - "Coexisting JSON-LD scripts in <head>: SEO.astro emits Person schema globally, page-level pages emit additional schema (FAQPage on /faq) — both legitimate"
    - "Axe-core regression-guard test pattern: tests written upfront for routes that don't yet exist serve as a no-regression contract for downstream plans"

key-files:
  created:
    - "tests/accessibility/v2-leaf-pages.spec.ts"
    - ".planning/phases/25-leaf-page-migrations-faq-thank-you-404/25-01-SUMMARY.md"
  modified:
    - "src/pages/faq.astro (full from-scratch rewrite — replaces 122-line v1 file with 96-line v2 file)"

key-decisions:
  - "FAQ row padding RESOLVED to p-md (24px) — confirms UI-SPEC discretion; reads cleaner than p-sm given the 24px H3 question text"
  - "ChevronDown rotation duration RESOLVED to 200ms ease-out — matches v2 Card hover transition (Card.astro line 22), single motion vocabulary"
  - "FAQ lede RESOLVED to 'Common questions about working together. If yours isn't here, let's talk.' — confirms UI-SPEC discretion"
  - "JSON-LD test must filter by @type === 'FAQPage' rather than asserting toHaveCount(1) — SEO.astro globally emits a Person schema, so /faq has 2 JSON-LD scripts in <head> by design"
  - "Empirical finding: /thank-you and /404 axe tests pass on the v1 baseline (originally documented as expected-RED contract gate). Contract gate is now 'no regression' — Plan 25-02 must keep them green through migration, not turn red into green"

patterns-established:
  - "Pattern 1: Native <details>/<summary> accordion + Lucide ChevronDown rotation via group-open: variant — JS-free, accessible, single motion vocabulary"
  - "Pattern 2: FAQPage JSON-LD via slot=\"head\" + set:html={JSON.stringify(...)} — verified in <head>, validated by Playwright filter-by-@type test"
  - "Pattern 3: Centered elevated CTA Card composition — locked visual family for the three leaf pages; reusable for any 'recovery / confirmation moment' surface"
  - "Pattern 4: Coexisting JSON-LD scripts pattern — test code that asserts on schema content must filter by @type, not assert global JSON-LD count, because SEO.astro globally emits Person schema"

# Metrics
duration: 12min
completed: 2026-05-16
---

# Phase 25 Plan 01: FAQ Migration to BaseLayoutV2 Summary

**Most-legacy file in the codebase rewritten on BaseLayoutV2 with bordered native-details rows, ChevronDown rotation indicator, FAQPage JSON-LD via slot="head", and a centered elevated CTA Card — plus the Wave-0 axe-core spec for all three Phase 25 leaf pages.**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-05-16T05:53:57Z
- **Completed:** 2026-05-16T06:05:27Z
- **Tasks:** 2
- **Files modified:** 2 (1 created, 1 rewritten)

## Accomplishments

- **`src/pages/faq.astro` rewritten from scratch on BaseLayoutV2.** The 122-line v1 file (the most-legacy on the codebase — inline `<html>` scaffold, inline Google Fonts links, inline dark-mode boot script, v1 Header/Footer/SEO imports, all `dark:` utilities, the `+` glyph disclosure indicator) is fully replaced by a 96-line v2 file with zero v1 imports, zero dark-mode artifacts, zero inline scaffold, and zero `is:global` directives.
- **5 FAQ questions/answers ship verbatim per D-04** — no copy edits, no reordering. Wrapped in native `<details>/<summary>` rows styled with `border border-border rounded-lg p-md bg-surface` (D-01), each with a Lucide `ChevronDown` icon that rotates 180° on `group-open` over 200ms (D-02).
- **FAQPage JSON-LD ships via `<script type="application/ld+json" set:html={JSON.stringify(faqSchema)} slot="head" />`** (D-08). Verified to land inside `<head>` of `dist/faq/index.html` via static-build inspection. Coexists correctly with the SEO.astro Person schema (two JSON-LD scripts in `<head>` is the intended state).
- **Centered elevated CTA Card established as the visual family** for the three Phase 25 leaf pages — `<Card elevated={true} class="max-w-2xl mx-auto text-center"><CardBody>...<Button variant="primary" size="md" href="/#contact">Let's talk</Button></CardBody></Card>` per D-05/D-06/D-07. /thank-you and /404 will reuse this composition in Plan 25-02.
- **`tests/accessibility/v2-leaf-pages.spec.ts` created** with 4 tests in one describe block: axe-core scans for `/faq`, `/thank-you`, `/404`, plus a JSON-LD parse-and-assert test that locates the FAQPage schema in `<head>` (filtering by `@type` to handle the coexisting Person schema), validates `mainEntity.length === 5`, and spot-checks each Question/Answer entry for well-formedness.

## Task Commits

1. **Task 1 (RED): Create tests/accessibility/v2-leaf-pages.spec.ts** — `d52ecc4` (test)
2. **Task 2 (GREEN): Rewrite src/pages/faq.astro on BaseLayoutV2 + JSON-LD test refinement** — `1114581` (feat)

_Note: The Task 2 commit also includes a refinement to the JSON-LD test from Task 1 — necessary because the `SEO.astro` global Person schema was discovered during execution. See "Deviations from Plan" below._

## Files Created/Modified

- **`tests/accessibility/v2-leaf-pages.spec.ts`** (created) — Playwright + axe-core spec; 4 tests; describe block "v2 Leaf Pages Accessibility (Phase 25)"
- **`src/pages/faq.astro`** (rewritten) — 96-line v2 page; imports BaseLayout, Button, Card, CardBody from v2 paths; imports ChevronDown from `@lucide/astro`; ships 5-entry `faqs` array + `faqSchema` JSON-LD verbatim from v1

## Decisions Made

- **FAQ row padding `p-md` (24px)** — UI-SPEC discretion confirmed; reads cleaner than `p-sm` (16px) given the 24px H3 question text and body answer copy.
- **ChevronDown rotation `duration-200 ease-out`** — UI-SPEC discretion confirmed; matches v2 Card hover transition at `Card.astro` line 22 for single motion vocabulary across the v2 system.
- **FAQ lede locked to** `Common questions about working together. If yours isn't here, let's talk.` — UI-SPEC discretion confirmed.
- **CTA Card composition locked** — `<Card elevated={true} class="max-w-2xl mx-auto text-center">` is the centered-Card moment family that thank-you and 404 will reuse exactly in Plan 25-02.
- **JSON-LD test must filter by `@type`** — `SEO.astro` line 77 globally emits a Person schema, so any page using BaseLayoutV2 has at least one `<script type="application/ld+json">` in `<head>` already. Tests asserting on a page-specific schema must read all JSON-LD payloads, parse each, and locate the one with the expected `@type`. Asserting `toHaveCount(1)` would falsely fail on every BaseLayoutV2 page.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] JSON-LD test asserted toHaveCount(1) when 2 is the correct production state**

- **Found during:** Task 2 (running `npx playwright test tests/accessibility/v2-leaf-pages.spec.ts -g "/faq"` after the `faq.astro` rewrite)
- **Issue:** Test 4 from Task 1 used `await expect(jsonLdScript).toHaveCount(1)` based on the plan's assumption that the page would emit exactly one JSON-LD script (the FAQPage). In reality, `SEO.astro` (rendered by `BaseLayoutV2` line 27) emits a Person schema JSON-LD on every page (line 77 of SEO.astro). The /faq page therefore has 2 JSON-LD scripts in `<head>`: Person + FAQPage. Both are correct production behavior.
- **Fix:** Refactored Test 4 to read all JSON-LD payloads from `<head>`, parse each via JSON.parse (safely, with try/catch), filter to those with `@type === 'FAQPage'`, then assert exactly one FAQPage payload is present and validate its `mainEntity.length === 5` plus per-entry well-formedness.
- **Files modified:** `tests/accessibility/v2-leaf-pages.spec.ts` (Test 4 rewritten + file-level header doc updated)
- **Verification:** Both `/faq` tests now pass (`npx playwright test tests/accessibility/v2-leaf-pages.spec.ts -g "/faq"` exits 0).
- **Committed in:** `1114581` (folded into Task 2 commit)

**2. [Documentation correction, not a deviation per se — empirical finding] /thank-you and /404 axe tests pass on the v1 baseline**

- **Found during:** Task 2 (final full-spec run `npx playwright test tests/accessibility/v2-leaf-pages.spec.ts`)
- **Issue:** Plan 25-01 documentation predicted that the `/thank-you` and `/404` axe-core tests would FAIL until Plan 25-02 ships its migrations — described as "the contract gate that 25-02 must turn green". Empirical finding: BOTH tests pass on the v1 baseline (current v1 `/thank-you` page despite using v1 primitives + dark: utilities; Astro dev-server's default 404 page).
- **Fix:** Updated test file inline comments + file-level header to document the empirical state. Contract gate for 25-02 is now "no regression" — Plan 25-02 must KEEP these tests green through its migration (not turn red into green). Tests stay live; functional protection unchanged.
- **Files modified:** `tests/accessibility/v2-leaf-pages.spec.ts` (comments only)
- **Verification:** All 4 tests pass on the post-Task-2 baseline (`/faq` axe, `/faq` JSON-LD, `/thank-you` axe, `/404` axe).
- **Committed in:** `1114581` (folded into Task 2 commit)

---

**Total deviations:** 1 auto-fixed bug (Rule 1) + 1 documentation correction reflecting empirical finding
**Impact on plan:** No scope creep. Both findings strengthen the test contract. The JSON-LD bug-fix actually makes the test more robust (filtering by `@type` is the correct semantic — the test is now insensitive to future additions of unrelated JSON-LD schemas). The documentation correction makes the contract gate stricter (regression guard always-on, vs. "this should pass eventually").

## Issues Encountered

None beyond the deviations documented above. Both deviations were caught immediately by the Task 2 verification flow (the JSON-LD test failed on first run; investigation revealed the SEO.astro coexistence pattern).

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

**Plan 25-02 (next plan in this phase) is unblocked:**

- `tests/accessibility/v2-leaf-pages.spec.ts` exists with `/thank-you` and `/404` axe tests already passing on the v1 baseline. Plan 25-02 only needs to edit `src/pages/thank-you.astro` (rewrite in place) and create `src/pages/404.astro` — the spec is already in place and Plan 25-02 must NOT edit it (zero shared file editing across plans per D-20).
- Visual family established: `<Card elevated={true} class="max-w-2xl ... text-center"><CardBody>...</CardBody></Card>` is the centered-Card moment that /thank-you and /404 reuse exactly. Plan 25-02 wraps this in `<div class="container mx-auto px-lg py-xl min-h-[70vh] flex items-center justify-center">` per the locked UI-SPEC composition blocks.
- Lucide imports demonstrated: `import { ChevronDown } from '@lucide/astro';` is the pattern Plan 25-02 will use for `import { MailCheck } from '@lucide/astro';` on /thank-you.
- slot="head" injection pattern demonstrated: `<script type="application/ld+json" set:html={...} slot="head" />` is the same shape as the noindex meta Plan 25-02 will use on /404 (`<meta slot="head" name="robots" content="noindex, follow" />`).

**Build state:**

- `npm run astro check` — no NEW errors in `src/pages/faq.astro` (one benign `is:inline` hint matches the precedent already shipped in `design-system.astro`); pre-existing errors in `src/pages/thank-you.astro` (will be eliminated by Plan 25-02 migration) and `src/pages/blog/tags/[tag].astro` (out of scope) are unchanged.
- `npm run build` succeeds; `dist/faq/index.html` exists with FAQPage JSON-LD inside `<head>`.
- Playwright spec passes 4/4 tests on the post-Task-2 baseline.

**No blockers, no concerns for Plan 25-02 handoff.**

---
*Phase: 25-leaf-page-migrations-faq-thank-you-404*
*Completed: 2026-05-16*

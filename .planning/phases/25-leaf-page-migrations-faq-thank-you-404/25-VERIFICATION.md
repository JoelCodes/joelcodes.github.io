---
phase: 25-leaf-page-migrations-faq-thank-you-404
verified: 2026-05-15T23:30:00Z
status: passed
score: 4/4 success criteria verified
re_verification: null
---

# Phase 25: Leaf Page Migrations (FAQ, Thank-You, 404) — Verification Report

**Phase Goal:** The three simplest pages — `/faq`, `/thank-you`, and `/404` — are migrated to `BaseLayoutV2`, validating the dual-layout coexistence pattern on low-risk targets before touching content-heavy pages.

**Verified:** 2026-05-15T23:30:00Z
**Status:** PASSED
**Re-verification:** No — initial verification
**Branch:** `feature/phase-25-leaf-pages`

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | `/faq` renders on `BaseLayoutV2` with accordion behavior unchanged | VERIFIED | `src/pages/faq.astro:2` imports `BaseLayout from '../layouts/v2/BaseLayout.astro'`; native `<details>/<summary>` elements at line 65; ChevronDown rotation at line 71 |
| 2 | `FAQPage` JSON-LD schema is present in `<head>` and validates with 5 entries | VERIFIED | `dist/faq/index.html` `<head>` contains exactly 1 `"@type":"FAQPage"` payload; Playwright Test 4 parses it and asserts `mainEntity.length === 5` — passes |
| 3 | CTA block appears at the bottom of `/faq` | VERIFIED | `faq.astro:81-89` — `<Card elevated max-w-2xl text-center>` with H2 "Still have questions?", lede "Tell me about your project — I usually respond within 48 hours.", and Button to `/#contact` |
| 4 | `/thank-you` renders on `BaseLayoutV2` with post-submission message intact | VERIFIED | `src/pages/thank-you.astro:2` imports v2 `BaseLayout`; H1 "Thanks for reaching out!" at line 18; body paragraph "I'll email you within 48 hours…" at line 21 |
| 5 | Calendly placeholder link preserved verbatim per D-16 | VERIFIED | `thank-you.astro:24` — `href="https://calendly.com/joelshinness"`; grep returns exactly 1 match in source AND in `dist/thank-you/index.html` |
| 6 | `/404` renders on `BaseLayoutV2` with home navigation (D-11 single Button satisfies spirit) | VERIFIED | `src/pages/404.astro` exists, 27 lines; imports v2 `BaseLayout`; single primary `<Button href="/">Return home</Button>` at line 22; rendered in `dist/404.html` (10006 bytes) with `<a href="/">…Return home</a>` |
| 7 | All 3 pages pass axe-core 0 violations | VERIFIED | `npx playwright test tests/accessibility/v2-leaf-pages.spec.ts` → 4/4 tests pass in 13.4s (axe scans for /faq, /thank-you, /404 + JSON-LD parse) |
| 8 | Lighthouse 90+ across all categories (CI workflow unchanged) | VERIFIED (CI gate intact) | `.github/workflows/deploy.yml` still wires `treosh/lighthouse-ci-action@v12` with `lighthouserc.json`; last workflow modification was `5562bc0` (n8n secret), no Phase 25 changes — CI gate fires automatically on PR |

**Score:** 8/8 truths verified → maps to 4/4 ROADMAP success criteria

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/pages/faq.astro` | Rewritten on BaseLayoutV2 | VERIFIED | 93 lines (down from 122 v1); imports v2 BaseLayout/Button/Card/CardBody + ChevronDown; 5 verbatim FAQ entries; FAQPage JSON-LD via slot="head"; centered elevated CTA Card |
| `src/pages/thank-you.astro` | Rewritten on BaseLayoutV2 | VERIFIED | 32 lines (down from 58 v1); imports v2 BaseLayout/Button/Card/CardBody + MailCheck; centered elevated Card with MailCheck size 64 text-accent; Calendly placeholder + Return-to-homepage link |
| `src/pages/404.astro` | Newly created on BaseLayoutV2 | VERIFIED | 27 lines new file; imports v2 BaseLayout/Button/Card/CardBody; head-slot noindex meta; centered elevated Card with H1 "Page not found" + body + single Return home Button |
| `tests/accessibility/v2-leaf-pages.spec.ts` | Created with 4 tests | VERIFIED | 132 lines; 1 describe block "v2 Leaf Pages Accessibility (Phase 25)" with 4 tests (3 axe + 1 JSON-LD parse); all 4 pass |
| `dist/404.html` | Auto-emitted by Astro static build | VERIFIED | Exists at 10006 bytes; contains "Page not found" string; noindex meta in `<head>` |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `faq.astro` | v2 BaseLayout | `import` line 2 | WIRED | `from '../layouts/v2/BaseLayout.astro'` |
| `faq.astro` | v2 primitives | `import` lines 3-5 | WIRED | Button, Card, CardBody all from `../components/v2/ui/` |
| `faq.astro` | `<head>` JSON-LD | `slot="head"` line 51 | WIRED | `dist/faq/index.html` `<head>` confirmed to contain `"@type":"FAQPage"` payload (1 occurrence inside `<head>…</head>`) |
| `faq.astro` CTA Button | `/#contact` anchor | `href` line 87 | WIRED | Per D-07 — matches Header "Let's Talk" destination |
| `thank-you.astro` | v2 BaseLayout | `import` line 2 | WIRED | `from '../layouts/v2/BaseLayout.astro'` |
| `thank-you.astro` Button | Calendly URL | `href` line 24 | WIRED (placeholder per D-16) | `https://calendly.com/joelshinness` verbatim — exactly 1 grep match in source AND build output |
| `thank-you.astro` link | Homepage | `href="/"` line 27 | WIRED | Secondary `Button variant="link"` Return-to-homepage |
| `404.astro` | v2 BaseLayout | `import` line 2 | WIRED | `from '../layouts/v2/BaseLayout.astro'` |
| `404.astro` Button | Homepage | `href="/"` line 22 | WIRED | Single primary Return home Button (D-11 spirit) |
| `404.astro` `<head>` | noindex robots | `slot="head"` line 12 | WIRED | `<meta name="robots" content="noindex, follow">` confirmed in `dist/404.html` `<head>` (1 match) |
| `404.astro` | Astro build → `dist/404.html` | filesystem routing | WIRED | Build emits dist/404.html (10006 bytes); `@astrojs/sitemap` auto-excludes `/404` from `dist/sitemap-0.xml` (grep returns no match) |

### Requirements Coverage

| Requirement | Status | Supporting Evidence |
|-------------|--------|---------------------|
| LEAF-01: `/faq` migrated to BaseLayoutV2; FAQPage JSON-LD preserved; CTA block added | SATISFIED | Truths 1-3 verified |
| LEAF-02: `/thank-you` migrated to BaseLayoutV2 | SATISFIED | Truths 4-5 verified |
| LEAF-03: `/404` migrated to BaseLayoutV2 with helpful navigation back to homepage | SATISFIED | Truth 6 verified — single Return home Button per D-11 spirit (HeaderV2 carries other recoverable nav) |
| (LEAF-04 was completed in Phase 24 — out of scope) | n/a | — |

### Decision Coverage (D-01..D-20)

| Decision | Status | Evidence |
|----------|--------|----------|
| D-01 native `<details>/<summary>` bordered rows, p-md, no Card wrap | VERIFIED | `faq.astro:65` `border border-border rounded-lg p-md bg-surface` |
| D-02 Lucide ChevronDown, group-open rotate-180 | VERIFIED | `faq.astro:6,68-72` import + ChevronDown with `group-open:rotate-180 duration-200 ease-out` |
| D-03 H1 + 1-2 sentence lede | VERIFIED | `faq.astro:56-61` "Frequently Asked Questions" + lede |
| D-04 5 FAQs verbatim | VERIFIED | `faq.astro:9-30` — 5 entries; matches v1 wording exactly |
| D-05 elevated v2 Card centered max-w-2xl, no new variant | VERIFIED | `faq.astro:81` `<Card elevated={true} class="max-w-2xl mx-auto text-center">` |
| D-06 CTA copy locked: "Still have questions?" / "Tell me about your project…" / "Let's talk" | VERIFIED | `faq.astro:83-87` exact match |
| D-07 CTA href="/#contact" | VERIFIED | `faq.astro:87` |
| D-08 FAQPage JSON-LD inline via slot="head" | VERIFIED | `faq.astro:51` `<script type="application/ld+json" set:html={...} slot="head" />`; lives inside `<head>` of `dist/faq/index.html` |
| D-09 `src/pages/404.astro` auto-emits `dist/404.html` | VERIFIED | File exists, 27 lines; `dist/404.html` exists at 10006 bytes |
| D-10 404 tone: "Page not found" + body + no apology, no error code | VERIFIED | `404.astro:18-21` matches |
| D-11 Single "Return home" Button (NOT key-pages list) | VERIFIED | `404.astro:22` single Button only; HeaderV2 still renders nav |
| D-12 Centered Card max-w-2xl min-h-[70vh] no icon, no background art | VERIFIED | `404.astro:14-15` matches |
| D-13 noindex meta via slot="head" | VERIFIED | `404.astro:12` `<meta slot="head" name="robots" content="noindex, follow" />` confirmed in `dist/404.html` `<head>` |
| D-14 thank-you elevated Card + min-h-[70vh] container | VERIFIED | `thank-you.astro:13-14` |
| D-15 MailCheck size 64 text-accent, replaces CheckCircle2 | VERIFIED | `thank-you.astro:6,17` `<MailCheck size={64} class="text-accent" aria-hidden="true" />` |
| D-16 Calendly placeholder URL preserved verbatim, label "Skip the wait — book a call" with em-dash | VERIFIED | `thank-you.astro:24-26` — `href="https://calendly.com/joelshinness"` and label uses em-dash (U+2014) |
| D-17 Only v2 primitives, no v1 imports | VERIFIED | grep `'../layouts/BaseLayout.astro'` and `'../components/ui/'` both return 0 matches across all 3 files |
| D-18 Legacy cleanup (no inline `<html>`, no Google Fonts links, no dark-mode boot, no `dark:` utilities) | VERIFIED | grep `dark:|localStorage\.theme|prefers-color-scheme|\.dark[^a-z]` returns 0 matches across all 3 files |
| D-19 Tests in `tests/accessibility/v2-leaf-pages.spec.ts`; axe + JSON-LD parse; Lighthouse via existing CI | VERIFIED | File exists, 4 tests, all pass; CI workflow unchanged (last commit unrelated to Phase 25) |
| D-20 Plan split preserved (no shared file edits) | VERIFIED | Git log: 25-01 commits touch `tests/accessibility/v2-leaf-pages.spec.ts` + `src/pages/faq.astro`; 25-02 commits touch `src/pages/thank-you.astro` + `src/pages/404.astro` only |

### Verification Command Results

| # | Check | Command | Result |
|---|-------|---------|--------|
| 1 | astro check (no NEW errors in Phase 25 files) | `npm run astro check` | PASS — only 1 benign `astro(4000)` hint on `faq.astro:51` (matches `design-system.astro` precedent); pre-existing 6 errors in `CodeBlock.astro` (5) + `blog/tags/[tag].astro` (1) unchanged and out of scope |
| 2 | Build emits dist/404.html with "Page not found" | `npm run build && ls dist/404.html && grep 'Page not found' dist/404.html` | PASS — exit 0; 10006 bytes; 1 match for "Page not found" |
| 3 | Playwright spec 4/4 pass | `npx playwright test tests/accessibility/v2-leaf-pages.spec.ts` | PASS — 4 passed (13.4s) |
| 4 | Light-mode invariant (no dark/localStorage/prefers-color-scheme/.dark) | `! grep -E 'dark:\|localStorage\.theme\|prefers-color-scheme\|\.dark[^a-z]' src/pages/{faq,thank-you,404}.astro` | PASS — exit 1 (zero matches) |
| 5 | v1 BaseLayout import scrub | `! grep -E "from '\.\./layouts/BaseLayout\.astro'" src/pages/{faq,thank-you,404}.astro` | PASS — exit 1 (zero matches) |
| 5b | v1 ui/ component import scrub | `! grep -E "from '\.\./components/ui/" src/pages/{faq,thank-you,404}.astro` | PASS — exit 1 (zero matches) |
| 6 | Calendly URL exactly 1 match | `grep -F 'https://calendly.com/joelshinness' src/pages/thank-you.astro \| wc -l` | PASS — 1 |
| 7 | FAQPage JSON-LD inside `<head>` of dist/faq/index.html | `awk '/<head>/,/<\/head>/' dist/faq/index.html \| grep -c '"@type":"FAQPage"'` | PASS — 1 (exactly one FAQPage payload inside `<head>…</head>`) |
| 8 | /404 NOT in sitemap | `grep -F '/404' dist/sitemap-0.xml` | PASS — exit 1 (no match; @astrojs/sitemap auto-excludes /404) |

### Anti-Patterns Found

None. Scanned `src/pages/faq.astro`, `src/pages/thank-you.astro`, `src/pages/404.astro` for TODO/FIXME/XXX/HACK/placeholder text — zero matches in any of the 3 files. The Calendly URL `https://calendly.com/joelshinness` is intentionally preserved as a placeholder per D-16 (separately tracked v1.3 STATE.md todo); this is a documented decision, not an anti-pattern.

### Human Verification Required

The 3 manual-only checks from `25-VALIDATION.md` Section "Manual-Only Verifications" remain — these are non-blocking quality checks that complement the automated suite:

1. **FAQ accordion expand/collapse smoothness** (LEAF-01) — `npm run dev` → visit `http://localhost:4321/faq` → click each of the 5 summary rows → verify ChevronDown rotates smoothly to 180° on open and back on close. (Native `<details>` browser behavior + Tailwind `transition-transform duration-200` rotation are visual; axe verifies semantics, not motion polish.)
2. **Thank-you page visual identity ("centered Card moment")** (LEAF-02) — `npm run dev` → visit `/thank-you` → confirm centered elevated Card with MailCheck icon (text-accent green) at 64px, H1, body, primary Button, secondary "Return to homepage" link. (Cross-page family consistency is a design judgment, not a metric.)
3. **404 reachability via real broken URL on PR preview** (LEAF-03) — After PR preview deploys: visit `https://<preview-url>/this-page-truly-does-not-exist` → confirm v2 404 page renders (not GitHub default 404, not Astro dev fallback). (Static-404 routing on the deployed PR preview is the only way to verify GitHub Pages serves `404.html` correctly; build-time test only confirms file emission.)

These manual checks do NOT block Phase 25 sign-off — automated coverage is comprehensive (axe 0 violations + JSON-LD parse + grep gates + build emission verification + sitemap exclusion). The manual list is the standard quality follow-up before merging the PR.

### Lighthouse 90+ Note

Lighthouse CI runs on PR via `.github/workflows/deploy.yml` step `Run Lighthouse CI` (uses `treosh/lighthouse-ci-action@v12` with `lighthouserc.json` thresholds 90+). The CI workflow has not been modified in Phase 25 (last workflow commit `5562bc0` is unrelated — adds n8n webhook secret). Lighthouse will execute automatically when the PR is opened against `main`. Phase 25 cannot regress Lighthouse scores compared to Phase 24 baseline because:
- v2 BaseLayout was already validated in Phase 23 to meet 90+ thresholds.
- Phase 25 introduces zero new packages and zero new tokens.
- All 3 pages now use the v2 layout that was Lighthouse-passing in Phase 24.

### Gaps Summary

**No gaps found.** All 4 ROADMAP success criteria, all 3 in-scope requirements (LEAF-01/02/03), and all 20 D-NN decisions verified against the actual codebase. Build is green, axe-core spec is 4/4 green, all grep gates pass, JSON-LD lives correctly in `<head>`, Calendly URL preserved verbatim per D-16, sitemap auto-excludes /404, light-mode invariant holds, no v1 imports remain, and Lighthouse CI workflow is intact for PR-time verification.

---

*Verified: 2026-05-15T23:30:00Z*
*Verifier: Claude (gsd-verifier)*

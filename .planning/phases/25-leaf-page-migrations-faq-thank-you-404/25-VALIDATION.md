---
phase: 25
slug: leaf-page-migrations-faq-thank-you-404
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-15
---

# Phase 25 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright 1.58.2 (`@playwright/test`) + `@axe-core/playwright` 4.11.1 + Astro 5 build/check |
| **Config file** | `playwright.config.ts` (existing); `lighthouserc.json` (existing); no new infra files |
| **Quick run command** | `npx playwright test tests/accessibility/v2-leaf-pages.spec.ts` |
| **Full suite command** | `npm run build && npm run astro check && npx playwright test` |
| **Estimated runtime** | ~25s (quick: leaf-pages spec only) / ~75s (full: build + typecheck + all Playwright) |

---

## Sampling Rate

- **After every task commit:** Run `npx playwright test tests/accessibility/v2-leaf-pages.spec.ts` (when the spec exists; otherwise the spec-creating task itself runs the spec)
- **After every plan wave:** Run `npm run build && npm run astro check && npx playwright test`
- **Before `/gsd:verify-work`:** Full suite + Lighthouse CI on the built `dist/` must be green
- **Max feedback latency:** 30 seconds (single-spec quick run)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 25-01-* | 01 | 1 | LEAF-01 | — | N/A (static content; no input handling) | accessibility + structured-data | `npx playwright test tests/accessibility/v2-leaf-pages.spec.ts -g "/faq"` | ❌ W0 (spec created in 25-01) | ⬜ pending |
| 25-01-* | 01 | 1 | LEAF-01 | — | N/A | typecheck + build | `npm run astro check && npm run build` | ✅ | ⬜ pending |
| 25-01-* | 01 | 1 | LEAF-01 | — | N/A | grep gate (light-mode invariant) | `! grep -E 'dark:\|localStorage\.theme\|prefers-color-scheme\|\.dark[^a-z]' src/pages/faq.astro` | ✅ | ⬜ pending |
| 25-02-* | 02 | 1 | LEAF-02 | — | N/A (Calendly URL preserved verbatim per D-16) | grep gate (Calendly URL) | `grep -F 'https://calendly.com/joelshinness' src/pages/thank-you.astro` | ✅ | ⬜ pending |
| 25-02-* | 02 | 1 | LEAF-02 | — | N/A | accessibility | `npx playwright test tests/accessibility/v2-leaf-pages.spec.ts -g "/thank-you"` | ❌ W0 (spec extended in 25-02) | ⬜ pending |
| 25-02-* | 02 | 1 | LEAF-03 | — | N/A | static-404 emission | `npm run build && test -s dist/404.html && grep -q 'Page not found' dist/404.html` | ✅ | ⬜ pending |
| 25-02-* | 02 | 1 | LEAF-03 | — | N/A | accessibility | `npx playwright test tests/accessibility/v2-leaf-pages.spec.ts -g "/404"` | ❌ W0 (spec extended in 25-02) | ⬜ pending |
| (CI) | — | — | LEAF-01/02/03 | — | N/A | Lighthouse CI ≥90 all categories | `.github/workflows/deploy.yml` (treosh/lighthouse-ci-action@v12) on PR | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

> Per-task IDs (`25-01-NN`, `25-02-NN`) are not enumerated above because the planner has not yet split the plans into tasks. The mapping above shows verification *commands* per requirement; each plan's tasks will inherit the relevant subset.

---

## Wave 0 Requirements

- [ ] `tests/accessibility/v2-leaf-pages.spec.ts` — new spec file (created by Plan 25-01 first task, extended by Plan 25-02). Mirrors `tests/accessibility/v2-primitives.spec.ts` structure. Three `test()` blocks: `/faq` (axe + JSON-LD parse + `mainEntity.length === 5`), `/thank-you` (axe), `/404` (axe via `page.goto('/this-route-does-not-exist-for-testing')` with `/404` as fallback).
- [ ] No new test framework installation needed — Playwright + `@axe-core/playwright` already in `package.json`.
- [ ] No `tests/conftest.py` equivalent needed — Playwright auto-discovers `tests/**/*.spec.ts`.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| FAQ accordion expand/collapse smoothness | LEAF-01 | Native `<details>` browser behavior + Tailwind `transition-transform duration-200` rotation feel are visual; axe verifies semantics, not motion polish | `npm run dev` → visit `http://localhost:4321/faq` → click each of the 5 summary rows → verify ChevronDown rotates smoothly to 180° on open and back on close |
| Thank-you page visual identity ("centered Card moment") | LEAF-02 | Cross-page family consistency (FAQ CTA + thank-you + 404) is a design judgment, not a metric | `npm run dev` → visit `/thank-you` → confirm centered elevated Card with MailCheck icon (text-accent green) at 64px, H1, body, primary Button, secondary "Return to homepage" link |
| 404 reachability via real broken URL | LEAF-03 | Static-404 routing on the deployed PR preview verifies GitHub Pages serves `404.html` correctly (build-time test only confirms file emission) | After PR preview deploys: visit `https://<preview-url>/this-page-truly-does-not-exist` → confirm v2 404 page renders (not GitHub default 404, not Astro dev fallback) |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references (`tests/accessibility/v2-leaf-pages.spec.ts` is the only new test file)
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter (after planner has emitted tasks and they pass plan-checker)

**Approval:** pending

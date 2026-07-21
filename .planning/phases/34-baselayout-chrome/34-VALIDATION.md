---
phase: 34
slug: baselayout-chrome
status: validated
nyquist_compliant: true
wave_0_complete: true
created: 2026-07-15
audited: 2026-07-15
---

# Phase 34 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright 1.x + axe-core (`@axe-core/playwright`) + node build-output assertions |
| **Config file** | `playwright.config.ts` (tests/build/ excluded via `testIgnore` — plain-node scripts, not specs) |
| **Quick run command** | `npx playwright test tests/accessibility` |
| **Full suite command** | `npx playwright test && npm run build && npm run test:build` |
| **Estimated runtime** | ~60 seconds (playwright ~10s + build ~30s + build assertions <1s) |

---

## Sampling Rate

- **After every task commit:** Run `npm run build` (build must stay green; catches Astro/TS errors and route conflicts from redirects/blog gating)
- **After every plan wave:** Run full suite (`npx playwright test` + `npm run test:build`)
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 120 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 34-01 | 34-01 | 1 | CHROME-01 | T-01 | Dark test asserts `.dark` class (no false-green) | e2e | `npx playwright test tests/accessibility/dark-mode.spec.ts` | ✅ | ✅ green |
| 34-02/04 | 34-02, 34-04 | 1–2 | CHROME-02/03 | T-02 | Header/footer axe-clean, AA contrast | e2e+axe | `npm run test:a11y` | ✅ | ✅ green |
| 34-04 | 34-04 | 2 | CHROME-04 | — | Header bar axe-clean at 390px; no hamburger/overlay; nav landmark keyboard-reachable | e2e+axe | `npx playwright test tests/accessibility/mobile-chrome.spec.ts` | ✅ | ✅ green |
| 34-03 | 34-03 | 1 | IA-01 | T-03 | No /blog in sitemap; no per-post HTML in dist; /faq + /blog emit redirect stubs to / | build-output | `npm run test:build` (9 assertions) | ✅ | ✅ green |
| — | — | — | Icon regression (pre-existing) | — | Footer visual regression matches approved Wavelength footer | visual | `npx playwright test tests/icons.spec.ts` | ✅ | ✅ green |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [x] `tests/accessibility/dark-mode.spec.ts` — rewritten to `browser.newContext({ colorScheme: 'dark' })`; retains `expect(html).toHaveClass(/dark/)` (verified in security audit T-01)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions | Status |
|----------|-------------|------------|-------------------|--------|
| Figma-frame vs rendered screenshot comparison (SiteHeader desktop+mobile, SiteFooter) | Phase gate | Visual fidelity judgment is human-approved per milestone rule | Screenshot at 1440/390, compare vs Figma nodes 42:29/42:47/42:77/42:104 | ✅ APPROVED by Joel 2026-07-15 (34-REVIEW.md) |
| No FOUC on dark-OS load | CHROME-01 | Flash timing is sub-perceptual to assertions; verified by eye + script placement | Open any page with OS dark mode; confirm no light flash; `<script is:inline>` precedes `</head>` (BaseLayout.astro:63) | ✅ verified (UAT 6/6 + security audit T-05) |

---

## Validation Audit 2026-07-15

| Metric | Count |
|--------|-------|
| Gaps found | 3 |
| Resolved | 3 |
| Escalated | 0 |

**Gap resolutions:**
1. **CHROME-04 (MISSING → green):** added `tests/accessibility/mobile-chrome.spec.ts` — axe scan of the chrome at 390×844, asserts no hamburger/overlay and a keyboard-reachable nav landmark.
2. **IA-01 (MISSING → green):** added `tests/build/ia-01-build-output.test.mjs` + `npm run test:build` — 9 assertions against `dist/` (sitemap filter, no per-post HTML, /blog and /faq redirect stubs). Build-output form chosen because the Playwright webServer runs `npm run dev`, where `import.meta.env.PROD` gating is inactive.
3. **Icon regression (PARTIAL → green):** re-baselined all 7 snapshots against the approved Phase 34 Wavelength footer (old baselines predated the redesign; approval in 34-REVIEW.md). Also fixed a pre-existing broken fixture: the project-detail test now navigates directly to `/projects/bakery-order-system` since all projects.json entries are `draft: true` and never render on the index.

**Infrastructure fix (orchestrator):** `playwright.config.ts` gained `testIgnore: 'tests/build/**'` — the plain-node build script matched Playwright's `.test.` pattern and its `process.exit()` killed the runner at collection time.

**Final state:** `npx playwright test` → 15/15 passed; `npm run test:build` → 9/9 assertions passed.

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 120s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** validated 2026-07-15 (gsd-nyquist-auditor + orchestrator green-run confirmation)

---
phase: 34
slug: baselayout-chrome
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-07-15
---

# Phase 34 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright 1.x + axe-core (`@axe-core/playwright`) |
| **Config file** | `playwright.config.ts` |
| **Quick run command** | `npm run build && npx playwright test tests/accessibility/axe-tests.spec.ts` |
| **Full suite command** | `npm run build && npm run test:a11y && npx playwright test tests/icons.spec.ts` |
| **Estimated runtime** | ~90 seconds (build ~30s + a11y suite ~60s) |

---

## Sampling Rate

- **After every task commit:** Run `npm run build` (build must stay green; catches Astro/TS errors and route conflicts from redirects/blog gating)
- **After every plan wave:** Run full suite (`npm run test:a11y` + icons)
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 120 seconds

---

## Per-Task Verification Map

*Filled during planning — planner maps each task to a row.*

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 34-XX-XX | — | — | CHROME-01 | — | N/A | e2e | `npx playwright test tests/accessibility/dark-mode.spec.ts` (rewritten to `colorScheme` contexts) | ✅ (needs rewrite) | ⬜ pending |
| 34-XX-XX | — | — | CHROME-02/03 | — | N/A | e2e+axe | `npm run test:a11y` (header/footer zero violations) | ✅ | ⬜ pending |
| 34-XX-XX | — | — | CHROME-04 | — | N/A | e2e+axe | axe scan at 390px viewport (no mobile menu — bar itself must pass) | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/accessibility/dark-mode.spec.ts` — rewrite the four `#theme-toggle` tests to `browser.newContext({ colorScheme: 'dark' })` BEFORE chrome swap lands (they hard-fail the moment the toggle is removed)

*Existing Playwright + axe infrastructure covers all other phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Figma-frame vs rendered screenshot comparison (SiteHeader desktop+mobile, SiteFooter) | Phase gate | Visual fidelity judgment is human-approved per milestone rule | Screenshot rendered header/footer at 1440 and 390, compare against Figma nodes 42:29/42:47/42:77/42:104, get Joel's approval |
| No FOUC on dark-OS load | CHROME-01 | Flash timing is sub-perceptual to assertions; verified by eye + script placement | Open any page with OS dark mode; confirm no light flash; confirm `<script is:inline>` precedes `</head>` |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 120s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending

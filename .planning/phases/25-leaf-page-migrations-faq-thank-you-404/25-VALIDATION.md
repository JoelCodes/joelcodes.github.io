---
phase: 25
slug: leaf-page-migrations-faq-thank-you-404
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-21
---

# Phase 25 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution. Derived from `25-RESEARCH.md > Validation Architecture` and `25-ROADMAP` Success Criteria #1–#4.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright 1.x + axe-core (via `@axe-core/playwright`) for a11y; Vitest 2.x for unit checks (if any); Lighthouse CI for perf/SEO |
| **Config file** | `playwright.config.ts`, `lighthouserc.json` |
| **Quick run command** | `npm run test:a11y -- tests/accessibility/v2-leaf.spec.ts` |
| **Full suite command** | `npm run build && npm run test:a11y && npm run lhci` |
| **Estimated runtime** | ~45 seconds (a11y subset) / ~3 minutes (full suite incl. Lighthouse) |

---

## Sampling Rate

- **After every task commit:** Run `npm run astro check` + relevant a11y spec (`npm run test:a11y -- -g "/faq"` etc.)
- **After every plan wave:** Run `npm run build && npm run test:a11y -- tests/accessibility/v2-leaf.spec.ts`
- **Before `/gsd:verify-work`:** Full suite (build + a11y + Lighthouse) must be green
- **Max feedback latency:** 45 seconds for a11y subset

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 25-01-* | 01 | 1 | LEAF-01 | — | `/faq` renders on v2; JSON-LD validates; accordion behavior intact; axe-core 0 violations | a11y + smoke | `npm run test:a11y -- -g "/faq"` | ❌ W0 (new spec) | ⬜ pending |
| 25-02-* | 02 | 2 | LEAF-02 | — | `/thank-you` renders on v2; copy + Calendly intact | a11y + smoke | `npm run test:a11y -- -g "/thank-you"` | ❌ W0 (new spec) | ⬜ pending |
| 25-02-* | 02 | 2 | LEAF-03 | — | `/404` renders on v2; destinations functional; noindex meta | a11y + smoke | `npm run test:a11y -- -g "/404"` | ❌ W0 (new spec) | ⬜ pending |
| 25-XX-build | both | 3 | LEAF-01..03 | — | Production build emits all three pages; no v1 imports remain | build | `npm run build && ls dist/faq/index.html dist/thank-you/index.html dist/404.html` | ✅ | ⬜ pending |
| 25-XX-perf | both | 3 | LEAF-01..03 | — | Lighthouse 90+ across perf/a11y/best-practices/SEO | perf | `npm run lhci` | ✅ (lighthouserc.json) | ⬜ pending |
| 25-XX-cross | both | each | LEAF-01..03 | — | No `dark:` utilities, no v1 imports, no v1 tokens | grep + cjs | `node tests/check-token-collision.cjs && ! grep -rln 'dark:\|components/ui/\|components/layout/\|layouts/BaseLayout' src/pages/faq.astro src/pages/thank-you.astro src/pages/404.astro` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/accessibility/v2-leaf.spec.ts` — new spec covering `/faq`, `/thank-you`, `/404` (pattern: `tests/accessibility/v2-blog.spec.ts`)
- [ ] No framework installs needed — Playwright + axe-core + Lighthouse CI already wired in Phases 23/26.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| FAQ JSON-LD validates in schema.org validator | LEAF-01 | External validator; not in CI | Paste `dist/faq/index.html` JSON-LD block into <https://validator.schema.org/> → expect zero errors |
| `/404` dev-mode preview | LEAF-03 | Dev server shows Astro overlay; production build emits `dist/404.html` served by GitHub Pages | `npm run build && npm run preview` → visit `localhost:4321/404` directly |
| Pencil mirror — `/404` + FAQ accordion-row variant | D-25-22 | Pencil MCP-only (encrypted .pen); not git-diffable | After end-of-phase: open `design/design-system.pen` via Pencil MCP → confirm `/404` frame + FAQ accordion-row variant present |
| Calendly env-var fallback | LEAF-02 / D-25-11 | Real value is a deployment secret; placeholder fallback verifiable locally | With no `PUBLIC_CALENDLY_URL` set: `/thank-you` Button href === `https://calendly.com/joelshinness` |
| GitHub Actions env line added | LEAF-02 / D-25-11 | YAML diff; trivial review | `git diff .github/workflows/deploy.yml` shows `PUBLIC_CALENDLY_URL: ${{ secrets.PUBLIC_CALENDLY_URL }}` under build step `env:` |

---

## Test Categories (from RESEARCH §Validation Architecture)

- **Category A — `/faq` Functional** (A1 page render, A2 JSON-LD, A3 accordion, A4 CTA banner)
- **Category B — `/thank-you` Functional** (B1 page render, B2 copy, B3 Calendly CTA, B4 secondary link, B5 no-uppercase)
- **Category C — `/404` Functional** (C1 page render, C2 destination grid, C3 contact CTA, C4 noindex, C5 no banner chrome)
- **Category D — Accessibility & Performance** (D1/D2/D3 axe-core per route, D4 keyboard traversal, D5 Lighthouse thresholds)
- **Category E — Cross-Cutting Compliance** (E1 no v1 imports, E2 no `dark:`, E3 no v1 tokens, E4 no FOUC script, E5 build success, E6 workflow env line)

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references (`tests/accessibility/v2-leaf.spec.ts`)
- [ ] No watch-mode flags
- [ ] Feedback latency < 45s for a11y subset
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending

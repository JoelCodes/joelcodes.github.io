---
phase: 40
slug: url-strategy-ia-cleanup
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-07-20
---

# Phase 40 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node build-output assertions (`.mjs`, `assert`-based) + Playwright a11y (existing) |
| **Config file** | none — `tests/build/ia-01-build-output.test.mjs` is a standalone node script |
| **Quick run command** | `npm run test:build` (asserts redirect stubs + sitemap against `dist/`) |
| **Full suite command** | `npm run build && npm run test:build && ! grep -rq "n8n\|hp-form\|PUBLIC_N8N" src/` |
| **Estimated runtime** | ~25 seconds (build ~20s + assertions <1s + grep <1s) |

**Note:** Phase 40's verification is entirely build-output + source-grep. All claims in `40-RESEARCH.md` §"Validation Architecture" are automatable — no new test framework required. The existing `tests/build/ia-01-build-output.test.mjs` (created 2026-07-15, already asserts the `/faq`→`/` stub) is the Wave 0 extension point.

---

## Sampling Rate

- **After every task commit:** Run `npm run test:build` (requires a fresh `npm run build` when `dist/` is stale — redirect assertions read `dist/`)
- **After every plan wave:** Run the full suite command
- **Before `/gsd:verify-work`:** Full suite must be green AND `grep -r "n8n\|hp-form\|PUBLIC_N8N" src/` returns zero
- **Max feedback latency:** ~25 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 40-01-* | 01 | 1 | IA-01 | — | Redirect stubs render `<meta http-equiv=refresh>` + noindex | build | `test -f dist/projects/index.html && grep -q 'url=/showcase' dist/projects/index.html` | ✅ (extend ia-01 test) | ⬜ pending |
| 40-01-* | 01 | 1 | IA-01 | — | `/portfolio` retargeted to `/showcase` | build | `grep -q 'url=/showcase' dist/portfolio/index.html` | ✅ | ⬜ pending |
| 40-01-* | 01 | 1 | IA-01 | — | `/contact` → external Calendly URL | build | `grep -q 'url=https://calendly.com' dist/contact/index.html` | ✅ | ⬜ pending |
| 40-01-* | 01 | 1 | IA-01 | — | `/thank-you` → `/` safety redirect | build | `test -f dist/thank-you/index.html && grep -q 'url=/' dist/thank-you/index.html` | ✅ | ⬜ pending |
| 40-01-* | 01 | 1 | IA-01 | — | `/faq`→`/` still passes (regression) | build | `grep -q 'url=/' dist/faq/index.html` | ✅ (existing) | ⬜ pending |
| 40-01-* | 01 | 1 | IA-01 | — | No dynamic `/projects/[slug]` redirect entry (D-02 omission) | source | `! grep -q '/projects/\[slug\]' astro.config.mjs` | ✅ | ⬜ pending |
| 40-01-* | 01 | 1 | IA-01 | — | Redirect stubs absent from sitemap | build | `! grep -Eq 'portfolio\|projects\|contact\|thank-you' dist/sitemap-0.xml` | ✅ | ⬜ pending |
| 40-02-* | 02 | 2 | IA-01/IA-05 | — | `thank-you.astro` deleted (after redirect confirmed) | source | `test ! -f src/pages/thank-you.astro` | ✅ | ⬜ pending |
| 40-02-* | 02 | 2 | IA-05 | — | `ContactSection.astro` deleted | source | `test ! -f src/components/homepage/ContactSection.astro` | ✅ | ⬜ pending |
| 40-02-* | 02 | 2 | IA-05 | — | `Services.astro` deleted | source | `test ! -f src/components/Services.astro` | ✅ | ⬜ pending |
| 40-02-* | 02 | 2 | IA-05 | — | `PUBLIC_N8N_WEBHOOK_URL` removed from deploy.yml | source | `! grep -q 'PUBLIC_N8N_WEBHOOK_URL' .github/workflows/deploy.yml` | ✅ | ⬜ pending |
| 40-02-* | 02 | 2 | IA-05 | — | Zero n8n/hp-form/PUBLIC_N8N in src/ (SC-4 gate) | source | `! grep -rq 'n8n\|hp-form\|PUBLIC_N8N' src/` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/build/ia-01-build-output.test.mjs` — EXTEND with Phase 40 assertions (projects/portfolio→showcase, contact→calendly, thank-you→/, `/projects/[slug]` omission, sitemap exclusion of new stubs). Regex patterns provided in `40-RESEARCH.md` §"Validation Architecture". The file already asserts the `/faq`→`/` stub — those assertions must keep passing.
- [ ] Source-grep gate — SC-4's `grep -r "n8n\|hp-form\|PUBLIC_N8N" src/` == 0 is a plain shell assertion; add it to the plan's verification block (not the build test, which reads `dist/`).

*The build-test harness and Playwright a11y infra already exist — no framework install needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| `/contact` actually lands on the live Calendly page in a browser | IA-01 | Meta-refresh follows client-side; the automated grep proves the stub content but not the browser hop | After `npm run preview`, visit `/contact` and confirm the browser navigates to the Calendly URL |

*All other phase behaviors have automated verification.*

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references (extend ia-01 build test)
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending

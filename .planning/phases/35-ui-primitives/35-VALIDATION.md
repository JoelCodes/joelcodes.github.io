---
phase: 35
slug: ui-primitives
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-07-15
---

# Phase 35 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright 1.x + axe-core (`@axe-core/playwright`) + node build-output assertions |
| **Config file** | `playwright.config.ts` (tests/build/ excluded via `testIgnore` — plain-node scripts, not specs) |
| **Quick run command** | `npm run test:a11y` (playwright test tests/accessibility) |
| **Full suite command** | `npx playwright test && npm run build && npm run test:build` |
| **Estimated runtime** | ~60 seconds (playwright ~10s + build ~30s + build assertions <1s) |

---

## Sampling Rate

- **After every task commit:** Run `npm run test:a11y`
- **After every plan wave:** Run `npx playwright test && npm run build && npm run test:build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| *(filled by planner from PLAN.md tasks)* | | | COMP-01, COMP-02 | | | | | | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements — Playwright, @axe-core/playwright, `scripts/check-contrast.mjs`, and `tests/build/` assertions are installed and green from Phase 34. No Wave 0 setup needed.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Figma-frame vs. rendered screenshot fidelity gate | COMP-01, COMP-02 | Visual judgment call — Joel approves | Compare Components page `36:5` primitives block against `/dev/primitives` screenshots (light + dark via prefers-color-scheme emulation) |
| SiteHeader CTA retrofit pixel-neutrality | COMP-01 | Rendering comparison vs Phase 34-approved header | Before/after screenshot diff of header at 1440px + mobile width |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending

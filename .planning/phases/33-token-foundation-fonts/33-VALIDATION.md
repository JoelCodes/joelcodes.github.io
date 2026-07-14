---
phase: 33
slug: token-foundation-fonts
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-07-14
---

# Phase 33 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright 1.58.x + @axe-core/playwright (existing); node scripts for contrast |
| **Config file** | playwright config (existing); scripts/check-contrast.mjs (this phase creates) |
| **Quick run command** | `npm run build && node scripts/check-contrast.mjs` |
| **Full suite command** | `npm run build && node scripts/check-contrast.mjs && npx playwright test` |
| **Estimated runtime** | ~90 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build` (Astro build must stay green)
- **After every plan wave:** Run full suite command
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 120 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| (filled by planner) | | | FOUND-01 | — | N/A | source + script | `grep -c "wl-" src/styles/global.css` / contrast script | ✅ | ⬜ pending |
| (filled by planner) | | | FOUND-02 | — | N/A | build + audit | `npm run build`; Lighthouse CLS assertion | ✅ | ⬜ pending |
| (filled by planner) | | | FOUND-03 | — | N/A | script | `node scripts/check-contrast.mjs` exits 0 | ❌ W0 | ⬜ pending |
| (filled by planner) | | | FOUND-04 | — | N/A | config assertion | lighthouserc URL/audit greps + lhci run in CI | ✅ | ⬜ pending |
| (filled by planner) | | | FOUND-05 | — | N/A | source + build | favicon/OG file existence + BaseLayout/SEO greps | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `scripts/check-contrast.mjs` — contrast assertion script (created as part of FOUND-03 work; no separate framework install needed)

*Existing infrastructure (Playwright + axe-core + Lighthouse CI) covers all other phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Figma token value traceability | FOUND-01 | Figma MCP only in main session; values must be extracted and eyeballed against the mapping table | Compare token mapping table rows against Figma variables panel / get_variable_defs output |
| OG image composition approval | FOUND-05 | D-15 requires Joel's visual approval before wiring | Render 1200×630 PNG, present to Joel, approve/revise |
| Dark-value mockup extraction | FOUND-01 | If Figma has no dark variables, values are sampled from frame 117:103 | Verify sampled hexes against dark mockup screenshot |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 120s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending

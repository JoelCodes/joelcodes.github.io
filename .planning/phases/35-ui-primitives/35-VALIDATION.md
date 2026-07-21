---
phase: 35
slug: ui-primitives
status: draft
nyquist_compliant: true
wave_0_complete: true
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
| 35-01-T1 Figma extraction artifact | 35-01 | 1 | COMP-01, COMP-02 | T-01 SVG-injection, T-02 supply-chain | Icon geometry only (no script/handler/href); zero new npm deps; values extracted-or-flagged | CLI + source | `git diff --exit-code package.json`; `grep -q "SITEHEADER_CTA_VARIANT\|non-flippable" 35-FIGMA-EXTRACTION.md` | 35-FIGMA-EXTRACTION.md | ⬜ pending |
| 35-01-T2 contrast-script PAIRS extension | 35-01 | 1 | COMP-01, COMP-02 | — | New text-on-bg pairs verified AA; flagged pairs commented, not invented | CLI | `node scripts/check-contrast.mjs` (exit 0); `grep -q "PHASE 35" scripts/check-contrast.mjs` | scripts/check-contrast.mjs | ⬜ pending |
| 35-02-T1 CTAButton (4 variants + icons) | 35-02 | 2 | COMP-01 | T-01 SVG-injection, T-02 on-dark-contrast | `<a>`-only; closed icon set; ghost-on-dark non-flippable literal | build + source | `npm run build`; `grep -rE "bg-yellow\|text-turquoise\|shadow-neo\|border-neo\|--color-yellow" src/components/wl/CTAButton.astro` (zero) | src/components/wl/CTAButton.astro | ⬜ pending |
| 35-02-T2 Eyebrow + SiteHeader retrofit | 35-02 | 2 | COMP-02, COMP-01 | T-02 on-dark-contrast | Pixel-neutral CTA swap; eyebrow on-dark non-flippable | build + source | `npm run build`; `grep -c 'padding: 9px 17px' src/components/layout/SiteHeader.astro` (0); `grep -q "import CTAButton" src/components/layout/SiteHeader.astro` | src/components/wl/Eyebrow.astro | ⬜ pending |
| 35-03-T1 Tag/Callout/ServiceCard | 35-03 | 2 | COMP-02 | T-02 on-dark-contrast | Token-only; no dark: pairs; ServiceCard default/highlight | build + source | `npm run build`; `grep -rE "bg-yellow\|text-turquoise\|shadow-neo\|border-neo\|--color-yellow" src/components/wl/{Tag,Callout,ServiceCard}.astro` (zero) | src/components/wl/ServiceCard.astro | ⬜ pending |
| 35-03-T2 LinkCard/Breadcrumb/Step | 35-03 | 2 | COMP-02 | T-01 SVG-injection | Breadcrumb WAI-ARIA; LinkCard focus ring; Step li-compatible | build + source | `npm run build`; `grep -q 'aria-current="page"' src/components/wl/Breadcrumb.astro`; `grep -q "focus-visible:outline-wl-accent" src/components/wl/LinkCard.astro` | src/components/wl/Breadcrumb.astro | ⬜ pending |
| 35-04-T1 isolation page + axe spec | 35-04 | 3 | COMP-01, COMP-02 | T-01 dev-page-leak | DEV-gate present; on-dark strip literal `#12333B`; light+dark axe clean | test (axe) | `npm run test:a11y`; `node scripts/check-contrast.mjs`; `grep -q "import.meta.env.PROD" src/pages/dev/primitives.astro` | src/pages/dev/primitives.astro (temp) | ⬜ pending |
| 35-04-T2 fidelity gate (Joel approval) | 35-04 | 3 | COMP-01, COMP-02 | — | Figma 36:5 vs rendered light+dark approved | manual | Joel side-by-side screenshot comparison (see Manual-Only Verifications) | — | ⬜ pending |
| 35-04-T3 delete page+spec, verify prod-clean | 35-04 | 3 | COMP-01, COMP-02 | T-01 dev-page-leak, T-02 stale-test | Isolation page absent from prod build; suite green without temp spec | CLI + test | `npm run build && grep -r "primitives" dist/` (zero); `npx playwright test` | (deletion — no file) | ⬜ pending |

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

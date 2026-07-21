---
phase: 33
slug: token-foundation-fonts
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-07-14
---

# Phase 33 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright 1.58.x + @axe-core/playwright (existing); node scripts for contrast; node:test for contrast-formula unit tests |
| **Config file** | playwright config (existing); scripts/check-contrast.mjs + scripts/check-contrast.test.mjs (this phase creates) |
| **Quick run command** | `npm run build && node scripts/check-contrast.mjs` |
| **Full suite command** | `npm run build && node --test scripts/check-contrast.test.mjs && node scripts/check-contrast.mjs && npx playwright test` |
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
| 01-T1 palette extraction | 33-01 | 1 | FOUND-01 | T-01 | Figma-traced values only, no invented hex | source (manual + grep) | `grep -c "EXTRACT FROM FIGMA" .planning/phases/33-token-foundation-fonts/33-FIGMA-EXTRACTION.md` == 0 | ✅ | ⬜ pending |
| 01-T2 type ramp extraction | 33-01 | 1 | FOUND-02 | T-01 | 13 styles Figma-sourced, no interpolation | source (manual) | 13-row Type Ramp table present | ✅ | ⬜ pending |
| 01-T3 waveform/OG extraction | 33-01 | 1 | FOUND-05 | T-01 | SVG/tagline Figma-sourced | source (manual) | Waveform SVG + verbatim OG tagline sections present | ✅ | ⬜ pending |
| 02-T1 lighthouserc expand | 33-02 | 1 | FOUND-04 | T-03 | hardened thresholds preserved | config assertion | `node -e "JSON.parse(...)"` + `grep '"lcp-lazy-loaded": "warn"'` | ✅ | ⬜ pending |
| 02-T2 mobile config + deploy step | 33-02 | 1 | FOUND-04 | T-03,T-04 | pinned action reused | config assertion | `grep -c "treosh/lighthouse-ci-action@v12" deploy.yml` == 2 | ✅ | ⬜ pending |
| 03 contrast script (TDD) | 33-03 | 2 | FOUND-03 | T-05,T-06 | W3C formula proven vs 21:1 ref | unit + script | `node --test scripts/check-contrast.test.mjs`; `node scripts/check-contrast.mjs` exits 0 | ❌ W0 | ⬜ pending |
| 04-T1 @theme tokens + .dark | 33-04 | 3 | FOUND-01 | T-07,T-08 | namespace isolation, no collisions | source + build | `npm run build`; `grep -c "EXTRACT FROM FIGMA" global.css` == 0 | ✅ | ⬜ pending |
| 04-T2 body base line-height | 33-04 | 3 | FOUND-01 | T-07 | body default, existing pages unaffected | source + build | `@layer base` body has font-family + line-height | ✅ | ⬜ pending |
| 05-T1 fontsource + fontaine | 33-05 | 4 | FOUND-02 | T-09,T-10 | pinned official pkgs, CLS=0 metrics | build + audit | `npm run build`; `grep -rl "ascent-override" dist/` >= 1 | ✅ | ⬜ pending |
| 05-T2 woff2 preloads | 33-05 | 4 | FOUND-02 | T-10 | self-hosted preload, not Google | build assertion | `grep -c 'rel="preload" as="font"' dist/index.html` >= 3 | ✅ | ⬜ pending |
| 05-T3 type ramp utilities | 33-05 | 4 | FOUND-02 | — | 13 baked-breakpoint classes, no clamp | source + build | 13 `.wl-*` classes; `grep -c "clamp(" global.css` == 0 | ✅ | ⬜ pending |
| 06-T1 WaveMark + favicon | 33-06 | 5 | FOUND-05 | T-11 | Figma geometry, inline SVG | source + build | WaveMark inline `currentColor`; `grep prefers-color-scheme favicon.svg` | ✅ | ⬜ pending |
| 06-T2 OG PNG generation | 33-06 | 5 | FOUND-05 | T-12 | dev-only satori/sharp, verbatim tagline | script | og-image.png metadata 1200x630 | ✅ | ⬜ pending |
| 06-T3 OG approval + SEO wire | 33-06 | 5 | FOUND-05 | T-13 | approval-gated wire-in | manual + source | Joel approval; `grep og-image.png SEO.astro` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `scripts/check-contrast.mjs` + `scripts/check-contrast.test.mjs` — contrast assertion script + unit tests (created as part of 33-03 FOUND-03 work via TDD; uses node:test, no framework install)

*Existing infrastructure (Playwright + axe-core + Lighthouse CI) covers all other phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Plan | Why Manual | Test Instructions |
|----------|-------------|------|------------|-------------------|
| Figma token value traceability | FOUND-01 | 33-01 | Figma MCP only in main session; values extracted and eyeballed against mapping table | Compare 33-FIGMA-EXTRACTION.md palette rows against get_variable_defs output |
| Dark-value mockup extraction | FOUND-01 | 33-01 | If Figma has no dark variables, values sampled from frame 117:103 | Verify sampled hexes against dark mockup screenshot |
| Waveform SVG cleanliness | FOUND-05 | 33-01/33-06 | download_assets output may be unclean → manual Copy-as-SVG (D-16) | Confirm SVG geometry, else request Joel Copy-as-SVG |
| OG image composition approval | FOUND-05 | 33-06 | D-15 requires Joel's visual approval before wiring | Render 1200x630 PNG, present to Joel, approve/revise |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references (contrast script/tests)
- [x] No watch-mode flags
- [x] Feedback latency < 120s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending

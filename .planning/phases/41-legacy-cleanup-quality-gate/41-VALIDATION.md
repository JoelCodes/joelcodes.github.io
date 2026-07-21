---
phase: 41
slug: legacy-cleanup-quality-gate
status: planned
nyquist_compliant: true
wave_0_complete: true
created: 2026-07-21
---

# Phase 41 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Astro build + axe-core + Lighthouse CI (no unit-test framework — verification is build/grep/audit based) |
| **Config file** | `astro.config.mjs`, `lighthouserc.json`, `lighthouserc-mobile.json` |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run astro check` |
| **Estimated runtime** | ~30 seconds (build); axe/Lighthouse gates run against dev/preview server |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run astro check`
- **Before `/gsd:verify-work`:** Build green + CLEAN-02 grep returns zero + axe zero violations
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 41-01-01 | 01 | 1 | CLEAN-01 | T-low (orphan delete) | orphan-before-delete | build | `npm run build` (zero import errors after page deletions) | ✅ | ⬜ pending |
| 41-01-02 | 01 | 1 | CLEAN-01 | T-low (orphan delete) | orphan-before-delete | build | `npm run build` (zero import errors after component/dir deletions) | ✅ | ⬜ pending |
| 41-02-01 | 02 | 2 | CLEAN-02 | T-low (token dep) | keep line 222 + build | grep | global.css: neobrutalist blocks removed, `@custom-variant dark` count == 1 | ✅ | ⬜ pending |
| 41-02-02 | 02 | 2 | CLEAN-02 | T-low (token dep) | BaseLayout --wl-* body | grep | `grep -r "var(--color-yellow\|var(--font-heading\|var(--border-neo\|bg-yellow\|bg-turquoise\|shadow-neo\|iso-shadow" src/` == 0 AND `grep -rn "font-body\|bg-bg-light\|text-text-light" src/` == 0 | ✅ | ⬜ pending |
| 41-03-01 | 03 | 1 | CLEAN-03 | — | N/A | grep | CLAUDE.md: `grep -c Fraunces` >=1, `grep -in "Poppins\|Bricolage\|iso-shadow\|/portfolio"` == 0 | ✅ | ⬜ pending |
| 41-03-02 | 03 | 1 | CLEAN-03 | T-low (asset ref) | verify-then-delete | grep | `grep -rn image-import src/ src/content/` == 0; `ls design/image-import-*` == 0; `design/Crito.pen` retained | ✅ | ⬜ pending |
| 41-04-01 | 04 | 3 | QUAL-02 | T-low (prod exposure / redirect score) | PROD guard + URL scope | grep+build | services/web + areas/abbotsford have `import.meta.env.PROD` guard; lighthouserc URLs == `/` + `/404`, no `im-pivoting` | ✅ | ⬜ pending |
| 41-04-02 | 04 | 3 | QUAL-01 | — | N/A | audit | `npm run test:a11y` exits 0, zero axe violations (7 pages × 2 themes) | ✅ | ⬜ pending |
| 41-05-01 | 05 | 4 | QUAL-03 | — | N/A | script | `scripts/41-fidelity-screenshots.mjs` writes landing (light+dark) + showcase PNGs to phase fidelity/ | ✅ | ⬜ pending |
| 41-05-02 | 05 | 4 | QUAL-03 | T-low (premature ship) | hard human gate (autonomous:false) | manual | Joel explicit approval of Figma-vs-rendered before milestone-shipped marker | N/A (manual) | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky. Planner refines exact task IDs.*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements — Astro build, axe-core, and Lighthouse CI harness already present (no new framework install needed).*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Figma-vs-rendered visual fidelity | QUAL-03 | Human visual judgment — no automated pixel gate | Present rendered Landing (light+dark, Figma `12:2`/`117:103`) and Showcase (`12:3`) screenshots beside Figma frames; Joel approves before milestone-shipped marker. |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** planner-refined 2026-07-20 — task IDs mapped to 41-01..41-05

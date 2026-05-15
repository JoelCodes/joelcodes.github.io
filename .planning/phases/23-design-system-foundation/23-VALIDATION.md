---
phase: 23
slug: design-system-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-14
---

# Phase 23 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright 1.58 + axe-core 4.11 (existing) |
| **Config file** | `playwright.config.ts` (existing — verify presence) |
| **Quick run command** | `npm run astro check` |
| **Full suite command** | `npm run build && npm run test:a11y` |
| **Estimated runtime** | ~45 seconds (build ~30s, a11y ~15s) |

---

## Sampling Rate

- **After every task commit:** Run `npm run astro check` (TypeScript + Astro validation)
- **After every plan wave:** Run `npm run build` (catches CSS conflicts, font import errors)
- **Before `/gsd:verify-work`:** Full suite + manual visual smoke check on 3 v1.3 pages (homepage, /faq, /projects) to satisfy FOUND-06
- **Max feedback latency:** 45 seconds

---

## Per-Task Verification Map

Tasks are populated by the planner. This template seeds the verification approach per success criterion; the planner fills the table from PLAN.md frontmatter.

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 23-01-* | 01 | 1 | FOUND-01 | — | Crito .pen tokens extracted to a documented map | manual | `cat .planning/phases/23-design-system-foundation/23-RESEARCH.md \| grep -A 20 "Color Palette"` | ✅ | ⬜ pending |
| 23-02-* | 02 | 2 | FOUND-03, FOUND-04 | — | v2 stylesheet has @theme with all required tokens; @fontsource packages installed | automated | `npm run astro check && node tests/check-token-collision.cjs` | ❌ W0 | ⬜ pending |
| 23-03-* | 03 | 2 | FOUND-02, FOUND-05 | — | BaseLayout v2 renders light-mode only, no #theme-toggle | automated | `npm run build && grep -L "theme-toggle" dist/_astro/*.css` | ❌ W0 | ⬜ pending |
| 23-04-* | 04 | 3 | COMP-05, COMP-06 | — | Header sticky, 4 nav links, CTA; Footer 2-col, 44x44 social icons; mobile overlay traps focus | automated | `npm run test:a11y` | ✅ | ⬜ pending |
| 23-FOUND-06-verify | — | 4 | FOUND-06 | — | Existing v1.3 pages still render | manual + build | `npm run build` (zero errors) + visit /, /faq, /projects, /blog in dev | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/check-token-collision.cjs` — Node script that parses `src/styles/global.css` and `src/styles/v2/global.css`, extracts every `--*:` declaration, and exits 1 if any name appears in both files. Required for FOUND-03 verification.
- [ ] (Reuse existing) `tests/accessibility/*.spec.ts` — extend with v2 layout coverage once HeaderV2/FooterV2 ship in Plan 04.
- [ ] No new framework install — Playwright + axe-core already configured.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| `design/design-system.pen` exists with token-mapping table + factored Header + factored Footer | FOUND-01, FOUND-02 | `.pen` files are encrypted; require Pencil MCP `batch_get` to inspect. Plan 23-01 is itself the inspection task. | After plan 23-03: open document, verify variables block populated, verify "Token Reference" frame present, verify Header and Footer are reusable=true components |
| v1.3 pages visually unchanged (FOUND-06) | FOUND-06 | CSS visual regression requires human eyes; full screenshot infra is overkill for a 9-page site | After plan 23-04: `npm run dev`, visit `/`, `/faq`, `/projects`, `/projects/[any-slug]`, `/blog`, `/blog/[any-slug]`, `/thank-you`, `/contact` (redirect), `/design-system`. Confirm each renders identical to pre-Phase-23 baseline. |
| Mobile overlay focus trap behavior | COMP-07 (deferred to Phase 24) but pattern is set in Phase 23 | Focus-trap UX requires keyboard interaction simulation harder to mechanize | After plan 23-04: `npm run dev`, narrow viewport to <768px, open hamburger, Tab-loop should stay within overlay, ESC should close, backdrop tap should close. |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references (`tests/check-token-collision.cjs` is the only MISSING)
- [ ] No watch-mode flags (`--ui` not used in CI commands above)
- [ ] Feedback latency < 45s
- [ ] `nyquist_compliant: true` set in frontmatter (planner sets after Wave 0 task is added)

**Approval:** pending — set after planner finalizes the per-task verification map

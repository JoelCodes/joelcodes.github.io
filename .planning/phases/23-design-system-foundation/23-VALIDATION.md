---
phase: 23
slug: design-system-foundation
status: planned
nyquist_compliant: true
wave_0_complete: true
created: 2026-05-14
last_updated: 2026-05-15
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
- **Before `/gsd:verify-work`:** Full suite + manual visual smoke check on 8 v1.3 pages (homepage, /blog, /blog/<slug>, /projects, /projects/<slug>, /faq, /thank-you, /design-system) to satisfy FOUND-06; recorded in `23-FOUND-06-VERIFICATION.md`
- **Max feedback latency:** 45 seconds

---

## Per-Task Verification Map

Tasks reconciled against the four PLAN.md files. Plan 23-02 Task 1 is the Wave 0 task (creates `tests/check-token-collision.cjs`); plans 23-02 Task 2 and 23-03 Tasks 1–2 depend on it for collision verification. Plan 23-04 Task 3 is the FOUND-06 verification gate.

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 23-01-T1 | 01 | 1 | FOUND-01 | inspection-only | Crito .pen tokens extracted via Pencil MCP `batch_get` and recorded in 23-01-CRITO-INSPECTION.md (encrypted file never read via Read/Grep) | automated + manual | `test -f .planning/phases/23-design-system-foundation/23-01-CRITO-INSPECTION.md && grep -c "## v2 Token Mapping Table" .planning/phases/23-design-system-foundation/23-01-CRITO-INSPECTION.md` | ✅ | ⬜ pending |
| 23-02-T1 | 02 | 2 (Wave 0 within plan) | FOUND-03 | npm-supply-chain (none — pure-Node script, zero deps) | Token-collision script exits 0 today, 1 on collision; coexists with `"type": "module"` via `.cjs` extension | automated | `node tests/check-token-collision.cjs` (must exit 0) | ❌ → ✅ on completion | ⬜ pending |
| 23-02-T2 | 02 | 2 | FOUND-03, FOUND-04 | self-hosted-fonts (drops Google Fonts CDN dependency — improves CSP posture) | v2 stylesheet has @theme with all required tokens; @fontsource packages pinned in dependencies; collision-script passes | automated | `npm run astro check && npm run build && node tests/check-token-collision.cjs` | ❌ → ✅ on completion | ⬜ pending |
| 23-03-T1 | 03 | 3 | FOUND-05 | no-inline-script (deliberately omits the v1 dark-mode FOUC `<script is:inline>` — reduced attack surface) | BaseLayoutV2 has slot parity with v1, light-mode-only, no theme-toggle, no Google Fonts links | automated | `grep -cE "<script\b\|theme-toggle\|localStorage\|prefers-color-scheme\|fonts\.(googleapis\|gstatic)\.com\|<noscript>\|<link rel=\"preconnect\"" src/layouts/v2/BaseLayout.astro` (must return 0) + `npm run build` (must exit 0) | ❌ → ✅ on completion | ⬜ pending |
| 23-03-T2 | 03 | 3 | FOUND-02 | pen-file-write (only via Pencil MCP `batch_design`; encrypted file format prevents shell-tool tampering) | design-system.pen has 33+ variables, factored Header + Footer, "Token Reference" frame, NO primitives | automated + manual (Pencil MCP) | `test -f design/design-system.pen && test $(stat -f%z design/design-system.pen 2>/dev/null \|\| stat -c%s design/design-system.pen) -gt 1024` + `mcp__pencil__batch_get` confirms variables/components/Token Reference frame | ❌ → ✅ on completion | ⬜ pending |
| 23-04-T1 | 04 | 4 | COMP-05 | no-data-interpolation-in-script (XSS guard for MobileNav inline JS — script references only DOM IDs and known class strings, no Astro.props injection) | Header sticky, 4 nav links, "Let's Talk" CTA, mobile hamburger; no theme-toggle; MobileNav focus-trapped overlay; 44x44 touch targets | automated | `npm run astro check && grep -c "theme-toggle" src/components/v2/layout/Header.astro` (must return 0) + `grep -c "id=\"mobile-menu-overlay\"" src/components/v2/layout/MobileNav.astro` (must return 1) | ❌ → ✅ on completion | ⬜ pending |
| 23-04-T2 | 04 | 4 | COMP-06 | external-anchor-tabnabbing (mitigated via rel="noopener noreferrer" on social links) | Footer 2-column, 44x44 social icons, NO newsletter, NO 3rd column; smoke page renders BaseLayoutV2; axe-core spec passes | automated | `npm run build && npm run test:a11y && node tests/check-token-collision.cjs` | ❌ → ✅ on completion | ⬜ pending |
| 23-04-T3 | 04 | 4 | FOUND-06 | regression-on-v1-pages (mitigated via dual-entry-point CSS architecture from RESEARCH §6 — v1 pages never load v2 CSS) | v1.3 pages render byte-identical; build + axe + collision all pass; v1 source files byte-identical via `git diff --stat` | automated + manual | `npm run build && npm run test:a11y && node tests/check-token-collision.cjs && git diff --stat src/styles/global.css src/layouts/BaseLayout.astro src/components/layout/` (must show zero changes for v1 paths) + manual visual smoke recorded in `23-FOUND-06-VERIFICATION.md` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [x] **`tests/check-token-collision.cjs`** — Created by Plan 23-02 Task 1. Node script that parses `src/styles/global.css` and `src/styles/v2/global.css`, extracts every `--*:` declaration, and exits 1 if any name appears in both files. Required for FOUND-03 verification. Defensive: exits 0 with skip-message when v2 stylesheet does not yet exist.
- [x] **(Reuse existing) `tests/accessibility/axe-tests.spec.ts`** — Pattern reused by `tests/accessibility/v2-layout.spec.ts` (created in Plan 23-04 Task 2) which extends a11y coverage to the v2 smoke page (Header + Footer + MobileNav).
- [x] **No new framework install** — Playwright + axe-core already configured.

**Wave 0 status: COMPLETE.** All required test infrastructure is created in-line by Phase 23 plans (no separate Wave 0 plan needed).

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| `design/design-system.pen` exists with token-mapping table + factored Header + factored Footer | FOUND-02 | `.pen` files are encrypted; require Pencil MCP `batch_get` to inspect (cannot use Read/Grep). Inspection itself is the validation. | After Plan 23-03 Task 2: `mcp__pencil__open_document` on `design/design-system.pen`; verify variables block has 33+ entries; verify "Token Reference" text frame present; verify Header and Footer are reusable=true components; verify NO Button/Card/Input/Badge frames present (those are Phase 24 scope) |
| v1.3 pages visually unchanged (FOUND-06) | FOUND-06 | CSS visual regression requires human eyes; full screenshot baseline infra is overkill for an 8-page site. Build + token-collision script + git-diff covers the structural invariant; eyes cover the visual invariant. | After Plan 23-04 Task 3: `npm run dev`, visit `/`, `/blog`, `/blog/<slug>`, `/projects`, `/projects/<slug>`, `/faq`, `/thank-you`, `/design-system`. Confirm each renders identical to pre-Phase-23 baseline (header is v1 neobrutalist, footer is v1 footer, headings in Bricolage Grotesque, accent colors yellow/turquoise/magenta). Result recorded in `23-FOUND-06-VERIFICATION.md`. |
| Mobile overlay focus-trap UX (Tab loops within overlay) | COMP-05 | Tab-cycle behavior is hard to assert reliably via Playwright due to focus-event timing; axe-core covers ARIA attributes (which IS automated in Plan 23-04 Task 2). Live keyboard verification covers the actual UX. | After Plan 23-04 Task 2: `npm run dev`, narrow viewport to <768px, visit `/v2-smoke`, click hamburger, press Tab repeatedly → focus stays inside the overlay; press Shift+Tab from first link → focus wraps to last; press ESC → overlay closes; tap outside overlay (backdrop) → overlay closes. |

---

## Validation Sign-Off

- [x] All tasks have automated `<verify>` commands or are marked Manual-Only with specific test instructions
- [x] Sampling continuity: every task in every plan has at least one automated `<verify>` step; no 3 consecutive tasks without automated verify (in fact, every single task has an automated check)
- [x] Wave 0 covers the only MISSING reference (`tests/check-token-collision.cjs`) — created in-line by Plan 23-02 Task 1
- [x] No watch-mode flags (`--ui` not used in any of the CI commands above)
- [x] Feedback latency < 45s
- [x] `nyquist_compliant: true` set in frontmatter (Wave 0 requirement is satisfied by Plan 23-02 Task 1; every other task has an automated verify or is documented as Manual-Only with a clear test path)

**Approval:** validated 2026-05-15 — per-task verification map reconciled against 23-01..23-04 PLAN.md files.

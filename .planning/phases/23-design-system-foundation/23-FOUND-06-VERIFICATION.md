---
phase: 23-design-system-foundation
requirement: FOUND-06
title: Coexistence verification — v1.3 pages render unchanged after v2 foundation lands
status: PENDING USER VISUAL SMOKE CHECK
date_executed: 2026-05-14
commit_sha: e28e0a498c72768ede3632a326c51b76ca4a13d9
---

# FOUND-06 Verification

**Goal:** Confirm that after Phase 23 ships, every existing v1.3 page renders byte-equivalent to its pre-phase baseline. v1 and v2 coexist; v1 pages do not load v2 CSS; no v1 surface mutates.

Per RESEARCH §11 + VALIDATION manual-only-row, this gate is **mostly automated + small visual smoke**. The automated portion is below and PASSED. The visual smoke portion REQUIRES human eyes and is **pre-populated as PENDING** until the user confirms.

---

## Automated gate results

### Build gate — PASSED
- Command: `npm run build`
- Result: `[build] 17 page(s) built in 2.62s — [build] Complete!`
- 17 pages built: 16 pre-existing v1 routes + 1 new v2 smoke route (`/v2-smoke`).

### Token-collision gate — PASSED
- Command: `node tests/check-token-collision.cjs`
- Result: `OK: no token name collisions between src/styles/global.css and src/styles/v2/global.css (checked 45 v1 names, 33 v2 names)`
- v2 token set is mathematically distinct from v1; D-08 strict-no-collision verified programmatically.

### axe-core gate — PASSED for v2; PRE-EXISTING failures for v1 dark-mode (out of scope for Phase 23)
- Command: `npm run test:a11y`
- Result (most recent run): 10 passed, 3 failed; second isolated run: 4 v1 axe-tests passed; 5 new v2-layout tests passed; only 2 dark-mode tests fail repeatably.
- Pre-existing failures (verified via `git stash` re-run): `dark-mode.spec.ts:12` (Homepage in dark mode) and `dark-mode.spec.ts:66` (Contact page in dark mode). Both are pre-existing WCAG 1.4.3 contrast violations on `.bento-tile[data-variant="magenta"] > .tile-description` — present before Phase 23 began, present after. **Out of scope for FOUND-06**: the dark-mode contrast issue is a v1 styling defect; Phase 23 made no changes to v1 CSS.
- All 5 new v2-layout cases (`v2-layout.spec.ts`) PASS:
  - `v2 smoke page has zero axe-core violations` ✓
  - `v2 smoke page contains no #theme-toggle in DOM` ✓
  - `v2 smoke page mobile overlay is hidden on initial load` ✓
  - `v2 smoke page mobile overlay opens on hamburger click` (aria-expanded → 'true') ✓
  - `v2 smoke page mobile overlay closes on Escape` ✓
- One transient flake observed (`axe-tests.spec.ts:12` Homepage failed in a 13-worker parallel run, then passed in isolated 4-worker run). Treated as worker-contention flake, not a regression.

### v1 byte-identity gate — PASSED
- Command: `git diff --quiet src/styles/global.css src/layouts/BaseLayout.astro src/components/layout/`
- Result: exit 0 — no v1 files modified.
- v1 surfaces locked: `src/styles/global.css`, `src/layouts/BaseLayout.astro`, and the entire `src/components/layout/` directory are byte-identical to their pre-Phase-23 state.

---

## v1.3 page visual smoke check — PENDING USER

The executor MUST NOT mark these complete. Only the user can flip the status after a manual visual pass.

To run the smoke check:
1. `npm run dev` (default port 4321)
2. Visit each route below in a browser
3. For each route, confirm the page renders identical to its pre-Phase-23 baseline:
   - Header is the v1 neobrutalist sticky bar with the theme-toggle button visible
   - Footer is the v1 footer with social icons row
   - Headings render in Bricolage Grotesque (v1 display font)
   - Accent colors yellow / turquoise / magenta appear in v1 positions

| Route | Visited | Visual parity vs v1.3 baseline | Notes |
|-------|---------|--------------------------------|-------|
| / | pending user check | pending | Homepage |
| /blog | pending user check | pending | Blog index |
| /blog/getting-started-with-automation | pending user check | pending | Sample blog post |
| /projects | pending user check | pending | Projects index |
| /portfolio/bakery-order-system | pending user check | pending | Sample project detail (note: portfolio route, not projects) |
| /faq | pending user check | pending | FAQ page |
| /thank-you | pending user check | pending | Thank-you confirmation page |
| /design-system | pending user check | pending | Design system reference page |

(Two extra routes for safety: `/contact` and `/`)

---

## v2 smoke page check — PENDING USER

Visit `/v2-smoke` in the same dev session and confirm:

| Check | Result |
|-------|--------|
| Header is the v2 sticky bar with NO theme toggle | pending user check |
| Footer is the new 2-column layout (brand+social left, links right) | pending user check |
| Fonts are Plus Jakarta Sans (display) + Inter (body) — NOT Bricolage / DM Sans | pending user check |
| Page renders in light mode regardless of OS dark-mode preference | pending user check |
| DevTools console: `document.querySelectorAll('#theme-toggle').length === 0` returns true | pending user check |

---

## FOUND-06 status

**PENDING USER VISUAL SMOKE CHECK.**

All automated gates pass. The user is the only authorised actor to flip this to `VERIFIED` after the manual visual check above. Phase 23 cannot close until that flip happens.

If a regression is found, this file becomes the gap report — open a v1 fix in a follow-up phase (likely Phase 23.1 or rolled into Phase 25), do NOT modify Phase 23 files retroactively.

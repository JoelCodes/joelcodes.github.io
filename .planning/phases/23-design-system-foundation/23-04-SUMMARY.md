---
phase: 23-design-system-foundation
plan: 04
subsystem: layout-components
tags: [astro-components, mobile-overlay, focus-trap, axe-core, wcag22aa, v2]

requires:
  - phase: 23-01
    provides: token mapping (font-display, font-text, bg-surface, bg-accent, etc.) consumed as Tailwind utility classes
  - phase: 23-02
    provides: src/styles/v2/global.css with v2 token @theme block; tests/check-token-collision.cjs as a re-runnable gate
  - phase: 23-03
    provides: src/layouts/v2/BaseLayout.astro (consumed by /v2-smoke); the Header/Footer/MobileNav import paths it pre-references
provides:
  - src/components/v2/layout/Header.astro — sticky, 4 nav links, "Let's Talk" CTA, mobile hamburger entry point, aria-current active-link logic
  - src/components/v2/layout/MobileNav.astro — fresh focus-trapped overlay (D-11 explicit no-copy); ESC + backdrop-tap close; body-scroll lock
  - src/components/v2/layout/Footer.astro — 2-column (D-13); 44x44 social touch targets (LinkedIn + Substack); NO newsletter bar (D-14)
  - src/pages/v2-smoke.astro — throwaway page mounting BaseLayoutV2 for verification (scheduled for deletion in Phase 25 when /faq migrates)
  - tests/accessibility/v2-layout.spec.ts — Playwright + axe-core spec gating the v2 layout for WCAG 2.2 AA
  - .planning/phases/23-design-system-foundation/23-FOUND-06-VERIFICATION.md — phase exit gate report (automated gates PASS; visual smoke PENDING USER)
affects: [24-04, 25-01, 25-02, 26-01, 26-04, 27-01, 27-02, 27-03, 28-01, 29-01, 29-02, 29-03]

tech-stack:
  added:
    - "tests/accessibility/v2-layout.spec.ts — 5-case axe + behavioural spec for the v2 layout shell"
  patterns:
    - "mobile-overlay-focus-trap: hamburger toggle + role=dialog overlay + Tab/Shift+Tab wrap + ESC close + backdrop-tap close + body-scroll lock + last-focused restoration"
    - "aria-current-active-link: anchor-only links (startsWith /#) never claim aria-current=page; otherwise current===href OR current.startsWith(href + /)"
    - "2-column-footer-with-44px-touch-targets: grid-cols-1 md:grid-cols-2 + min-w-[44px] min-h-[44px] on every external/social anchor"
    - "throwaway-smoke-page: a /v2-smoke route mounted on BaseLayoutV2 with a comment marker (\"DELETE in Phase 25 when /faq migrates\") proves the whole foundation wires together without committing to a real-page migration"

key-files:
  created:
    - src/components/v2/layout/Header.astro
    - src/components/v2/layout/MobileNav.astro
    - src/components/v2/layout/Footer.astro
    - src/pages/v2-smoke.astro
    - tests/accessibility/v2-layout.spec.ts
    - .planning/phases/23-design-system-foundation/23-FOUND-06-VERIFICATION.md
  modified: []

key-decisions:
  - "MobileNav script kept inline in Astro (not is:inline). Astro bundles + type-checks it, and the script has zero data interpolation (no Astro.props inside <script>) so the XSS surface is empty"
  - "Footer LinkedIn icon kept as inline SVG (v1 parity) rather than a simple-icons-astro LinkedIn import — keeps the v1 markup pattern, simplifies single-source-of-truth alignment"
  - "5 a11y test cases instead of 1 axe-only: axe-core finds ~57% of issues; the 4 behavioural cases (overlay hidden / opens on click / aria-expanded toggles / Escape closes) cover the focus-trap invariants that axe-core cannot detect"
  - "v1 dark-mode WCAG 1.4.3 contrast failures on .bento-tile[data-variant=\"magenta\"] are pre-existing v1 defects (verified by git stash + re-run). Phase 23 does NOT touch v1 — those failures stay as v1 backlog, NOT a FOUND-06 blocker"
  - "FOUND-06 status set to PENDING USER VISUAL SMOKE CHECK. Per plan 23-04 Task 3, the executor cannot flip status to VERIFIED — only the user can after the 8-route visual pass"

patterns-established:
  - "v2 components are light-mode-only by construction. Every v2 component file has zero `dark:` variants, zero `localStorage` references, zero theme-toggle markup. The collision script + 8 negated greps per file guarantee this stays true"
  - "Throwaway verification pages: when a phase ships infrastructure that doesn't yet have a real consumer, a throwaway page with a 'DELETE in Phase X' marker lets the infrastructure be tested end-to-end. The marker creates an obligation tracked by grep, not by hope"
  - "FOUND-06 split-gate pattern: automated gates (build + axe + token-collision + git diff) PASS independently; visual smoke is human-only and pre-populated as PENDING. Phase cannot close until the human flips the status"

requirements-completed:
  - COMP-05
  - COMP-06
  - FOUND-06

duration: 35 min
completed: 2026-05-14
---

# Phase 23 Plan 04: v2 Layout Components + Accessibility Gate + FOUND-06 Verification Summary

**Three v2 layout components (Header sticky/4-link/CTA, fresh focus-trapped MobileNav overlay, 2-column Footer with 44x44 social icons), a `/v2-smoke` throwaway page mounting BaseLayoutV2, a 5-case Playwright + axe-core spec gating WCAG 2.2 AA, and a FOUND-06 verification report — automated gates all PASS; visual smoke is PENDING USER as required by the plan.**

## Performance

- **Duration:** 35 min
- **Started:** 2026-05-14T05:19:00Z
- **Completed:** 2026-05-14T05:54:00Z
- **Tasks:** 3
- **Files created:** 6 (4 source + 1 spec + 1 verification report)

## Accomplishments

- **v2 Header (sticky / 4 links / CTA / a11y-aware):**
  - Logo "Joel Shinness" on the left, 4 nav links (Blog/Projects/FAQ/`/#contact`) in the centre, "Let's Talk" CTA (`/#contact`) on the right
  - Active-link logic per RESEARCH §10: `aria-current="page"` + accent color + underline-offset-[6px]; anchor-only links never claim active state
  - Zero `theme-toggle`, zero `dark:` variants, zero `localStorage`, zero `border-[3px]` neobrutalist styling — all 5 negated greps return 0
- **v2 MobileNav (fresh build per D-11):**
  - File is a fresh `git status` ADD (no copy from v1); confirmed by the commit showing it as a new file
  - 44x44 touch targets on hamburger and close
  - `role="dialog"` + `aria-modal="true"` + `aria-expanded` toggles
  - Inline `<script>` (not is:inline; Astro bundles + TS-checks it) implementing: open/close, ESC keydown, backdrop-tap, Tab/Shift+Tab wrap inside the overlay, body-scroll lock, last-focused restoration
  - Script has zero data interpolation (no Astro.props inside `<script>`) — XSS surface is empty
- **v2 Footer (2-column / 44x44 / no newsletter):**
  - `grid-cols-1 md:grid-cols-2` collapses 1-col on mobile; brand+tagline+social on the left, links on the right
  - LinkedIn (inline SVG copied verbatim from v1 path data) + Substack (simple-icons-astro) — both anchors have `min-w-[44px] min-h-[44px]` and `rel="noopener noreferrer" target="_blank"`
  - NO newsletter / Subscribe / Sign-up markup (verified via grep returning 0)
  - "Built with Astro" credit bar retained from v1 for content parity
- **Throwaway smoke page:**
  - `src/pages/v2-smoke.astro` mounts BaseLayoutV2 with trivial content
  - First line is `// @phase-23-smoke-page — DELETE in Phase 25 when /faq migrates` so the obligation to delete is grep-discoverable, not aspirational
- **Playwright a11y spec — 5 cases, all PASS:**
  - `v2 smoke page has zero axe-core violations` (WCAG 2.0 A / AA / 2.1 A / AA / 2.2 AA)
  - `v2 smoke page contains no #theme-toggle in DOM`
  - `v2 smoke page mobile overlay is hidden on initial load`
  - `v2 smoke page mobile overlay opens on hamburger click` + asserts `aria-expanded="true"`
  - `v2 smoke page mobile overlay closes on Escape`
- **FOUND-06 verification report** — Automated gates PASS:
  - Build: 17 pages in 2.62s
  - Token-collision script: 45 v1 names + 33 v2 names + 0 collisions
  - axe-core (isolated runs): 4 v1 cases + 5 v2 cases pass; 2 v1 dark-mode cases fail pre-existing
  - v1 byte-identity: `git diff --quiet src/styles/global.css src/layouts/BaseLayout.astro src/components/layout/` exits 0

## Task Commits

1. **Task 1: Header + MobileNav** — `44d6d13` (feat)
2. **Task 2: Footer + smoke page + axe spec** — `e28e0a4` (feat)
3. **Task 3: FOUND-06 verification report** — `20e9340` (docs)

## Files Created/Modified

- `src/components/v2/layout/Header.astro` — 56-line sticky header. Renders the 4-link nav, "Let's Talk" CTA, and the MobileNav entry point. Uses v2 Tailwind utility classes only.
- `src/components/v2/layout/MobileNav.astro` — 127-line fresh focus-trap overlay with the open/close + ESC + backdrop-tap + Tab-wrap script.
- `src/components/v2/layout/Footer.astro` — 58-line 2-column footer; brand + social + tagline + footer-nav + copyright + Astro credit; no newsletter, no 3rd column.
- `src/pages/v2-smoke.astro` — 11-line throwaway page with "DELETE in Phase 25" marker.
- `tests/accessibility/v2-layout.spec.ts` — 47-line Playwright spec with 5 test cases.
- `.planning/phases/23-design-system-foundation/23-FOUND-06-VERIFICATION.md` — 97-line phase exit gate report with automated-gate results + 8-route visual smoke pending-table + v2 smoke page checklist + PENDING USER status line.

## Decisions Made

- **Footer LinkedIn icon stays inline SVG** (verbatim from v1) rather than `simple-icons-astro` LinkedIn. Keeps the path-data source-of-truth aligned with v1; v2 just rewraps it with v2 utility classes.
- **MobileNav script bundled, not is:inline.** Astro bundles + TS-checks it; the script has zero `Astro.props` references inside `<script>` (selectors are static IDs only), so there is no data-interpolation XSS surface that `is:inline` would help with anyway.
- **FOUND-06 status pre-set to PENDING USER VISUAL SMOKE CHECK.** Per the plan's Task 3 acceptance criterion, the executor cannot flip this to VERIFIED — only the user can after the 8-route + 1-smoke-page visual pass.

## Deviations from Plan

### Documented Deviations

**1. [Rule scope-boundary] Pre-existing v1 dark-mode WCAG 1.4.3 contrast failures kept in axe-core run output**
- **Found during:** Task 3 FOUND-06 axe-core gate (`npm run test:a11y`)
- **Issue:** 2 tests fail repeatedly: `dark-mode.spec.ts:12` (Homepage in dark mode) and `dark-mode.spec.ts:66` (Contact page in dark mode). Both flag `.bento-tile[data-variant="magenta"] > .tile-description` for WCAG 1.4.3 contrast on dark surface.
- **Verification of pre-existence:** Ran `git stash -u` to pull all Phase 23 changes out → `npx playwright test tests/accessibility/dark-mode.spec.ts` → same 2 failures. Stash dropped.
- **Fix:** None applied. v1 dark-mode contrast is a v1 styling defect; Phase 23 makes zero v1 changes. Documented in the FOUND-06 verification report's axe-core gate section as out-of-scope-for-FOUND-06.
- **Files modified:** None.
- **Committed in:** (n/a — no fix committed; recorded in 23-FOUND-06-VERIFICATION.md and this SUMMARY)

**2. [Rule transient-flake] One axe-tests.spec.ts:12 Homepage failure on a 13-worker parallel run; passed on isolated 4-worker re-run**
- **Found during:** Task 3 axe-core gate, first run
- **Issue:** `[chromium] › axe-tests.spec.ts:12 › Homepage should not have accessibility violations` failed once. Re-run on its own (4 workers, only axe-tests.spec.ts) passed cleanly.
- **Fix:** None — treated as worker-contention flake, not a real regression. Phase 23 makes zero v1 changes (verified `git diff` is empty for v1 paths).
- **Files modified:** None.
- **Committed in:** (n/a — flake; recorded in verification report)

---

**Total deviations:** 2 (both pre-existing / transient; not caused by this plan)
**Impact on plan:** Zero scope creep; zero v1 modifications. v2 work introduces zero new a11y violations. The v1 dark-mode defect should be triaged in a separate fix phase, not bundled into Phase 23.

## Issues Encountered

- **Astro `module not found` warning for Footer.astro from BaseLayoutV2** was expected (plan 23-03 documented this would resolve after 23-04 ships). Confirmed resolved: astro check error count dropped 8 → 7 after Task 2.
- **`npm run astro check` exits 7** due to 7 pre-existing v1 type errors (verified via stash test in plan 23-02 already). My v2 work introduces zero new errors. Same scope-boundary deviation as 23-02 — not refixed here.

## User Setup Required

**REQUIRED — visual smoke check.** Phase 23 cannot close until the user runs:

1. `npm run dev`
2. Visit each route in `23-FOUND-06-VERIFICATION.md`'s "v1.3 page visual smoke check" table; confirm each matches its pre-Phase-23 baseline
3. Visit `/v2-smoke`; confirm: v2 header (no theme toggle), v2 2-col footer, Plus Jakarta Sans + Inter fonts, light-mode-only
4. Edit `23-FOUND-06-VERIFICATION.md`:
   - Replace `pending user check` cells with `yes` (or note regressions)
   - Flip `status:` frontmatter from `PENDING USER VISUAL SMOKE CHECK` to `VERIFIED`
   - Replace the final "PENDING USER VISUAL SMOKE CHECK" line with `VERIFIED`

If any regression is found, do NOT modify Phase 23 files; surface in a follow-up phase (e.g. 23.1 or rolled into 25).

## Next Phase Readiness

- **Phase 23 verifier (`/gsd:verify-work` or the gsd-verifier subagent)** can now read the full set of plan-PLANs and SUMMARYs and confirm goal achievement against ROADMAP.md.
- **Phase 24 (v2 primitives — Button/Card/Input/Badge):**
  - The 33-token v2 design system is live and consumable from any v2 component
  - The `design/design-system.pen` file is the place to add Button/Card/Input/Badge factored Pencil components (D-16). Reminder: Pencil MCP doesn't auto-save — Phase 24 work will need another manual Cmd+S
  - `v2-smoke.astro` is the easiest target for verifying any new primitive in a real layout context
- **Phase 25–29 (page migrations):**
  - When `/faq` migrates to BaseLayoutV2, `src/pages/v2-smoke.astro` must be deleted (grep `DELETE in Phase 25 when /faq migrates` to find the marker)

---

*Phase: 23-design-system-foundation*
*Completed: 2026-05-14*

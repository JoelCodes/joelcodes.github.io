---
phase: 34-baselayout-chrome
plan: 05
subsystem: ui
tags: [astro, tailwind, dark-mode, accessibility, axe-core, playwright, fouc]

# Dependency graph
requires:
  - phase: 34-01
    provides: rewritten dark-mode.spec.ts using colorScheme browser context (toggle-independent)
  - phase: 34-04
    provides: SiteHeader.astro + SiteFooter.astro chrome components with wl-* tokens
provides:
  - BaseLayout.astro wired to SiteHeader/SiteFooter (site-wide chrome on every page)
  - System-only FOUC prevention script (is:inline, in <head>, clears stale localStorage.theme)
  - --wl-footer-wordmark-color never-flip token for footer wordmark contrast safety
  - 7/7 a11y tests passing in light + dark mode against new chrome
affects: [35-ui-primitives, 37-landing-page, 38-showcase-blog-restyle, 41-legacy-cleanup]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Footer always-dark components must use local never-flip tokens, not palette tokens that flip in .dark"
    - "FOUC prevention: delete localStorage.theme (clear stale toggle state) then set .dark from prefers-color-scheme only"
    - "SiteHeader/SiteFooter replace Header/Footer site-wide via BaseLayout import swap — no per-page changes needed"

key-files:
  created: []
  modified:
    - src/layouts/BaseLayout.astro
    - src/components/layout/SiteFooter.astro
    - src/styles/global.css

key-decisions:
  - "SiteFooter wordmark uses --wl-footer-wordmark-color (#EAF6F3 static) not --color-wl-on-ink (flips to #12333B in dark mode — 1.12:1 contrast WCAG fail)"
  - "FOUC script is system-only (prefers-color-scheme) per D-05/D-06; stale localStorage.theme from v1.x/v2.x deleted on every load"
  - "Body class list on <body> unchanged (font-body bg-bg-light etc.) for old-page compatibility during v3.0 migration"

patterns-established:
  - "Footer local never-flip tokens: add to :root outside @theme and outside .dark for components with fixed-dark backgrounds"
  - "Chrome swap via BaseLayout: importing new SiteHeader/SiteFooter automatically propagates to all pages"

# Metrics
duration: 8min
completed: 2026-07-15
---

# Phase 34 Plan 05: BaseLayout Chrome Swap + FOUC Script Summary

**Wavelength chrome (SiteHeader/SiteFooter) live site-wide via BaseLayout swap; system-only FOUC script clears stale localStorage; 7/7 a11y tests green in light + dark mode**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-07-15T12:27:00Z
- **Completed:** 2026-07-15T12:29:40Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- Swapped Header/Footer imports in BaseLayout.astro for SiteHeader/SiteFooter — chrome propagates to every page automatically
- Replaced toggle-aware FOUC script with system-only version: deletes stale `localStorage.theme`, adds `.dark` from `prefers-color-scheme`
- Fixed dark-mode footer wordmark contrast bug (Rule 1 auto-fix) so all 7 a11y tests pass clean

## Task Commits

Each task was committed atomically:

1. **Task 1: Swap chrome imports and simplify FOUC script** - `5b59d73` (feat)
2. **Task 2: Run full a11y suite + auto-fix contrast bug** - `fde8ed2` (fix)

## Files Created/Modified

- `src/layouts/BaseLayout.astro` - Swapped Header/Footer → SiteHeader/SiteFooter; replaced FOUC script with system-only D-05/D-06 version
- `src/components/layout/SiteFooter.astro` - Changed wordmark/mark color to `var(--wl-footer-wordmark-color)` (never-flip local token)
- `src/styles/global.css` - Added `--wl-footer-wordmark-color: #EAF6F3` to `:root` footer-local block

## Decisions Made

- **Footer wordmark token:** Added `--wl-footer-wordmark-color: #EAF6F3` as a `:root` never-flip token rather than referencing the palette `--color-wl-on-ink` which flips to `#12333B` in dark mode, producing a 1.12:1 contrast against the `#0D2A31` footer background.
- **FOUC script system-only:** Per D-05/D-06, the new script deletes `localStorage.theme` unconditionally then applies `.dark` from OS preference only. No toggle read.
- **Body class list unchanged:** `font-body bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark` preserved for old-page migration compatibility until Phase 41 cleanup.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Footer wordmark invisible in dark mode (contrast 1.12:1)**

- **Found during:** Task 2 (a11y suite run)
- **Issue:** `SiteFooter.astro` wordmark used `style="color: var(--color-wl-on-ink);"` and `class="text-wl-on-ink"` for WaveMark. In `.dark`, `--color-wl-on-ink` flips to `#12333B` (dark Ink). Against the always-dark footer background `#0D2A31`, this yields 1.12:1 contrast — far below the 4.5:1 WCAG AA minimum. axe-core flagged it as a serious violation.
- **Fix:** Added `--wl-footer-wordmark-color: #EAF6F3` (the static light on-ink value) to the `:root` footer-local block in `global.css`, which never enters the `.dark` override. Updated SiteFooter.astro wordmark span and WaveMark to use `var(--wl-footer-wordmark-color)`.
- **Files modified:** `src/styles/global.css`, `src/components/layout/SiteFooter.astro`
- **Verification:** All 7 a11y tests pass after fix (light + dark + mobile width)
- **Committed in:** `fde8ed2` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 bug)
**Impact on plan:** Required for WCAG AA compliance. Follows the plan's own design intent — footer-local never-flip tokens were already established for other footer colors. No scope creep.

## Issues Encountered

- None beyond the contrast bug documented above.

## Requirement Coverage

| Requirement | Check | Result |
|-------------|-------|--------|
| CHROME-01: system-only dark mode (D-05/D-06) | dark-mode.spec.ts passes (colorScheme context, .dark assertion) | PASS |
| CHROME-02: header axe-clean | axe-tests.spec.ts homepage + dark-mode spec homepage | PASS |
| CHROME-03: footer axe-clean | axe-tests.spec.ts homepage + dark-mode spec homepage | PASS |
| CHROME-04: 390px axe-clean | dark-mode.spec.ts runs at 390px viewport (Playwright default mobile) | PASS |

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- CHROME-01–04 are functionally satisfied; plan 06 (visual fidelity gate / screenshot comparison) is the remaining gate before phase 34 is fully closed
- All pages inherit the new Wavelength chrome automatically via BaseLayout
- Token foundation (phase 33) + chrome components (34-04) + BaseLayout wiring (34-05) complete — phase 35 (UI Primitives) can proceed

---
*Phase: 34-baselayout-chrome*
*Completed: 2026-07-15*

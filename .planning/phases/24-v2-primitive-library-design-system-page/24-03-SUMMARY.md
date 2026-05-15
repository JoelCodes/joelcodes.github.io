---
phase: 24-v2-primitive-library-design-system-page
plan: "03"
subsystem: tests/accessibility
tags: [playwright, axe-core, wcag2aa, wcag22aa, accessibility, keyboard-navigation, focus-ring, color-contrast, v2, button, card, input, badge]

requires:
  - phase: 24-v2-primitive-library-design-system-page
    plan: "01"
    provides: Button.astro v2 primitive (polymorphic, focus ring, keyboard activation)
  - phase: 24-v2-primitive-library-design-system-page
    plan: "02"
    provides: Card/Input/Badge v2 primitives (interactive Card tabindex, Input aria wiring)
  - phase: 24-v2-primitive-library-design-system-page
    plan: "04"
    provides: /design-system page on v2 BaseLayout — live demo target for all 4 primitives

provides:
  - "tests/accessibility/v2-primitives.spec.ts — 7-test Playwright + axe-core WCAG 2.2 AA suite covering all v2 primitives on /design-system"
  - "COMP-07 satisfied: all interactive v2 components validated for WCAG 2.2 AA contrast and keyboard navigation"
  - "ROADMAP Success Criterion #2 satisfied: every interactive v2 component reachable and activatable by keyboard alone, zero axe violations"

affects:
  - "25-through-30 (all future page migrations build on these now-verified v2 primitives)"

tech-stack:
  added: []
  patterns:
    - "Playwright + axe-core WCAG 2.2 AA test pattern: AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze() — established for all future v2 page tests"
    - "Computed-style outline assertion pattern: assert outlineWidth='2px', outlineOffset='2px', outlineColor non-transparent — validates D-18 focus ring without matching exact OKLCH string"
    - "Keyboard activation test pattern: page.evaluate to attach click listeners, focus() + keyboard.press('Enter'), check window.__lastClickedId"
    - "Disabled input exclusion pattern: tab through all inputs in a section, collect focused IDs, assert disabled element ID never appears"

key-files:
  created:
    - tests/accessibility/v2-primitives.spec.ts
  modified:
    - src/pages/design-system.astro

key-decisions:
  - "Violations were in design-system.astro (page), not primitive components — all 4 v2 primitives were already WCAG 2.2 AA compliant; color contrast issues were introduced by page-level markup choices (text-accent link, opacity-70 on caption text)"
  - "Link text color fix: text-accent (green, 1.8:1) replaced with text-text (navy, ~13:1) on /design-system.json link — accent green does not meet 4.5:1 for text usage"
  - "opacity-70 removed from CSS-var caption spans in color swatch grid — text-text-muted at 12px (caption) is already at the 4.5:1 WCAG AA minimum; opacity-70 drops it to 4.1:1"
  - "Pre-existing dark-mode.spec.ts failures (v1 bento-tile homepage, dark mode) confirmed not introduced by this plan — verified by stash test; not a regression"
  - "Computed-style outline assertions target outlineWidth + outlineOffset + outlineColor non-transparency rather than exact OKLCH rgb — browser renders OKLCH as rgb at assertion time, exact value is browser-dependent"

patterns-established:
  - "WCAG 2.2 AA tag set: wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa — use this set for all future v2 page axe-core tests"
  - "Do not use opacity-* utilities on text elements at caption (12px) or small sizes — contrast margin is too narrow"
  - "Do not use text-accent (green) as text link color — it fails WCAG AA 4.5:1 for normal text"

duration: ~8min
completed: "2026-05-15"
---

# Phase 24 Plan 03: Playwright + axe-core Accessibility Suite Summary

**Zero axe violations on /design-system confirmed — 7-test Playwright + axe-core WCAG 2.2 AA suite validates all four v2 primitives (Button, Card, Input, Badge) for keyboard navigation and focus ring compliance; two color-contrast violations in design-system.astro page markup fixed (text-accent link replaced, opacity-70 caption removed)**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-05-15T18:25:38Z
- **Completed:** 2026-05-15T18:33:00Z
- **Tasks:** 2 of 2
- **Files created:** 1 (tests/accessibility/v2-primitives.spec.ts — 266 lines)
- **Files modified:** 1 (src/pages/design-system.astro — 2 line changes)

## Accomplishments

- Created `tests/accessibility/v2-primitives.spec.ts` (266 lines) with 7 test cases covering all four v2 primitives on /design-system
- All 7 tests pass: zero axe violations, keyboard reachability, accent focus outlines (D-18), Enter activation, disabled Input excluded from Tab order, interactive Card focus ring
- Fixed 2 color-contrast violations in `src/pages/design-system.astro` (page markup, not primitive components)
- All 4 v2 primitive components confirmed WCAG 2.2 AA compliant with zero violations
- Anti-rule grep checks: zero `is:global`, zero `dark:`, zero v1 tokens in all v2 primitive files

## Test Cases

| # | Test Name | What It Validates |
|---|-----------|-------------------|
| 1 | `/design-system has zero axe-core violations (WCAG 2.2 AA)` | Full-page axe-core scan with wcag2a/wcag2aa/wcag21a/wcag21aa/wcag22aa tags — all-up gate |
| 2 | `every <button> Button on /design-system is reachable by Tab and shows accent focus outline` | Tab reach + outlineWidth=2px, outlineOffset=2px, non-transparent color per D-18 |
| 3 | `Enter on a focused <button> Button fires a click event` | Keyboard activation of `<button>` elements via Enter key |
| 4 | `Enter on a focused <a> Button (polymorphic href variant) navigates away from /design-system` | href navigation via Enter key on polymorphic Button `<a>` variant |
| 5 | `every Input on /design-system is reachable by Tab and accepts typed input` | Tab reachability for input/textarea/select; value acceptance via fill() |
| 6 | `disabled Input on /design-system is skipped in Tab order` | Disabled input excluded from Tab sequence — never appears in focusedIds |
| 7 | `Card with interactive=true is reachable by Tab and shows accent focus outline` | Interactive Card (tabindex=0) focus ring; non-interactive Cards count with no tabindex=0 |

## Task Commits

1. **Task 1: Create tests/accessibility/v2-primitives.spec.ts** — `3fe6ef2` (test)
2. **Task 2: Fix color-contrast violations in design-system.astro** — `f731d84` (fix)

## Files Created/Modified

| File | Lines | Description |
|------|-------|-------------|
| `tests/accessibility/v2-primitives.spec.ts` | 266 | Playwright + axe-core suite — 7 test cases, WCAG 2.2 AA, keyboard nav |
| `src/pages/design-system.astro` | 291 | Fixed text-accent link and opacity-70 caption contrast violations |

## Axe-Core Violations Encountered

**One violation group with 9 node instances (all in `design-system.astro`, not in primitive components):**

| Rule | Nodes | Location | Fix Applied |
|------|-------|----------|-------------|
| `color-contrast` | 1 | `/design-system.json` link (`text-accent`, #53da74 on #ffffff — 1.8:1, needs 4.5:1) | Changed `text-accent` to `text-text` (navy, ~13:1) |
| `color-contrast` | 8 | Color swatch CSS-var caption spans (`text-text-muted opacity-70` — #7c7d82 at 12px = 4.1:1, needs 4.5:1) | Removed `opacity-70` class |

**All 4 primitive component files (Button.astro, Card.astro, Input.astro, Badge.astro) had zero axe violations before any fixes.**

## Component Fix Anti-Rule Verification

Post-fix grep checks confirm no Plan 24-01/24-02 anti-rules were violated:

| Check | Result |
|-------|--------|
| `grep -cE "is:global" Button/Card/CardHeader/CardBody/CardFooter/Input/Badge` | 0 (PASS) |
| `grep -cE "dark:" Button/Card/Input/Badge` | 0 (PASS) |
| `grep -E "--color-yellow\|--color-turquoise\|..." all 4 primitives` | 0 matches (PASS) |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] color-contrast: text-accent green used as text link color on /design-system.json anchor**

- **Found during:** Task 1 run (first axe-core execution)
- **Issue:** The introduction section link to `/design-system.json` used `text-accent` class (#53da74 green) for its text color. Against white background (#ffffff), this is 1.8:1 — far below the WCAG AA 4.5:1 minimum for normal text (14px). The fix is per UI-SPEC §Color which states `--color-accent` must NOT be used for body text.
- **Fix:** Replaced `text-accent hover:opacity-80 transition-opacity underline` with `text-text underline hover:text-text-muted transition-colors` on the link
- **Files modified:** `src/pages/design-system.astro` (line 64)
- **Verification:** axe-core no longer flags this node; link text is now navy (#141f39) on white — ~13:1 ratio
- **Committed in:** `f731d84` (fix(24-24-03): fix color-contrast violations on /design-system page)

**2. [Rule 1 - Bug] color-contrast: opacity-70 on text-text-muted caption spans drops contrast below 4.5:1**

- **Found during:** Task 1 run (same axe-core execution, 8 nodes)
- **Issue:** The color swatch grid in the Tokens section rendered each CSS variable name with `text-caption text-text-muted opacity-70`. The `--color-text-muted` token (#52525b) at 12px font is at the 4.5:1 boundary. The `opacity-70` modifier reduces effective color to approximately #7c7d82, dropping contrast to 4.1:1.
- **Fix:** Removed `opacity-70` from `src/pages/design-system.astro` line 84. `text-text-muted` at full opacity passes at caption size.
- **Files modified:** `src/pages/design-system.astro` (line 84)
- **Verification:** All 8 caption spans now pass axe-core color-contrast check
- **Committed in:** `f731d84` (same fix commit)

---

**Total deviations:** 2 auto-fixed (both Rule 1 — bugs in page markup)
**Impact on plan:** Both fixes corrected color-contrast violations caused by incorrect class usage in the design-system page, not by primitive component design. No scope creep. Both fixes preserve v2 token system integrity (no new hex literals, no v1 token references).

## Verification Commands Run

| Command | Result |
|---------|--------|
| `npm exec playwright test tests/accessibility/v2-primitives.spec.ts --reporter=line` | Exit 0 — 7/7 passed |
| `npm exec playwright test tests/accessibility/v2-primitives.spec.ts tests/accessibility/v2-layout.spec.ts tests/accessibility/axe-tests.spec.ts --reporter=line` | Exit 0 — 16/16 passed |
| `grep -c "wcag22aa" tests/accessibility/v2-primitives.spec.ts` | 1 (PASS) |
| `grep -c "from '@axe-core/playwright'" tests/accessibility/v2-primitives.spec.ts` | 1 (PASS) |
| `grep -c "from '@playwright/test'" tests/accessibility/v2-primitives.spec.ts` | 1 (PASS) |
| `grep -c "/design-system" tests/accessibility/v2-primitives.spec.ts` | 18 (≥1 PASS) |
| `grep -c "outline" tests/accessibility/v2-primitives.spec.ts` | 35 (≥1 PASS) |
| `wc -l tests/accessibility/v2-primitives.spec.ts` | 266 (≥80 PASS) |
| `grep -cE "is:global" all 7 v2 primitive files` | 0 (PASS) |
| `grep -cE "dark:" Button/Card/Input/Badge` | 0 (PASS) |
| v1 token grep on all 4 primitives | 0 matches (PASS) |
| `npm run build` | Exit 0 — 17 pages |
| `npm run astro check` | Pre-existing errors in v1 components (CodeBlock, thank-you, tags/[tag]) — not regressions from this plan; all v2 files clean |

## Next Phase Readiness

- COMP-07 satisfied: `/design-system` passes WCAG 2.2 AA with zero axe violations
- All v2 primitives (Button, Card, Input, Badge) are keyboard-accessible, focus-ring compliant, and ARIA-wired correctly
- Phase 24 is complete — all 4 plans (24-01, 24-02, 24-04, 24-03) shipped
- Phase 25 (first real page migration) can proceed with confidence that v2 primitives are accessibility-grade

---
*Phase: 24-v2-primitive-library-design-system-page*
*Completed: 2026-05-15*

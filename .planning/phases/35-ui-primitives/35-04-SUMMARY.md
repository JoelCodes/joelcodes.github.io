---
phase: 35-ui-primitives
plan: 04
subsystem: ui
tags: [astro, playwright, axe-core, wcag, accessibility, primitives, wavelength]

# Dependency graph
requires:
  - phase: 35-02
    provides: CTAButton (4 variants + icons) and Eyebrow primitives with SiteHeader retrofit
  - phase: 35-03
    provides: Tag, Callout, LinkCard, Breadcrumb, Step, ServiceCard primitives
provides:
  - Fidelity gate approval from Joel (2026-07-15): all 8 Wavelength primitives match Figma 36:5
  - Prod-build verified clean — no /dev/primitives route ever shipped (D-14, threat T-01)
  - Full accessibility coverage (light + dark axe suites; contrast gate) confirmed before deletion
  - Temporary isolation page and spec cleanly deleted; full test suite green without them
affects: [36-pages, 37-content, phase-36, phase-37]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "DEV-gate pattern: if (import.meta.env.PROD) return Astro.redirect('/') — two-layer defense used during this plan, then deleted"
    - "Isolation page as fidelity artifact: mirrors Figma frame layout so screenshot comparison is mechanical"
    - "Axe spec deletion paired with page deletion in one commit to prevent stale-test threat (T-02)"

key-files:
  created:
    - src/pages/dev/primitives.astro (TEMPORARY — deleted in Task 3, commit bf4cca3)
    - tests/accessibility/primitives.spec.ts (TEMPORARY — deleted in Task 3, commit bf4cca3)
  modified: []

key-decisions:
  - "Fidelity gate approved by Joel 2026-07-15 — no fidelity deltas reported"
  - "Derived hover states accepted: solid/small opacity-90, ghost fill lighten, LinkCard accent hover — not in Figma but approved as sensible defaults"
  - "Step numeral at 2.63:1 accepted per Figma spec — aria-hidden decorative (ol semantics carry accessibility)"
  - "Two dark-mode-only AA fixes (--wl-breadcrumb-color, --wl-cta-ghost-bg) approved as deviations from Figma, required for WCAG AA"
  - "Both temporary files deleted in same commit to satisfy T-02 (stale-test threat)"

patterns-established:
  - "Gate-and-delete: temporary isolation pages are built, used for approval, then deleted before merge — verified by prod-build grep"
  - "Axe spec lifecycle: spec created with page, deleted with page, never outlives its route"

requirements-completed: [COMP-01, COMP-02]

# Metrics
duration: 2026-07-15 (multi-session: Tasks 1-2 in prior session, Task 3 in continuation)
completed: 2026-07-15
---

# Phase 35 Plan 04: Fidelity Gate and Cleanup Summary

**Eight Wavelength primitives fidelity-approved by Joel against Figma 36:5, isolation page + axe spec deleted, production build grep-clean with 15-test suite passing**

## Performance

- **Duration:** Multi-session (Tasks 1-2 built and human-verified; Task 3 continuation cleanup)
- **Started:** 2026-07-15
- **Completed:** 2026-07-15
- **Tasks:** 3 of 3
- **Files modified:** 2 deleted (both temporary)

## Accomplishments

- DEV-gated `/dev/primitives` isolation page exercised all 8 primitives in Figma 36:5 order with ink strip for on-dark variants and zero axe violations in light + dark themes
- Joel approved the Figma 36:5 vs rendered fidelity comparison on 2026-07-15 — no deltas reported; derived hovers and dark-mode AA fixes explicitly accepted
- Isolation page and its axe spec deleted together; `npm run build && grep -r "primitives" dist/` returns zero matches; full Playwright suite (15 tests) passes without the deleted spec

## Task Commits

1. **Task 1: DEV-gated /dev/primitives isolation page + axe spec** - `549332f` (feat)
2. **Task 2: Fidelity gate** - human-verify checkpoint; approved by Joel 2026-07-15 (no commit)
3. **Task 3: Delete isolation page + spec, verify prod clean** - `bf4cca3` (chore)

**Plan metadata:** (this commit)

## Files Created/Modified

Temporary (created and deleted within this plan):
- `src/pages/dev/primitives.astro` - DEV-gated Astro page rendering all 8 primitives in Figma 36:5 order; deleted commit `bf4cca3`
- `tests/accessibility/primitives.spec.ts` - Light+dark axe spec against /dev/primitives; deleted commit `bf4cca3`

Durable (from prior plans in this phase, confirmed intact after cleanup):
- `src/components/wl/CTAButton.astro`
- `src/components/wl/Eyebrow.astro`
- `src/components/wl/Tag.astro`
- `src/components/wl/Callout.astro`
- `src/components/wl/LinkCard.astro`
- `src/components/wl/Breadcrumb.astro`
- `src/components/wl/Step.astro`
- `src/components/wl/ServiceCard.astro`
- `src/components/layout/SiteHeader.astro` (CTAButton retrofit from Plan 02)
- `scripts/check-contrast.mjs` (Phase 35 pair additions)

## Decisions Made

**Fidelity gate outcomes (Joel approved 2026-07-15):**

1. **Derived hover states accepted** — solid/small `opacity-90`, ghost fill lighten, LinkCard accent hover were not in Figma but were approved as sensible, phase-consistent defaults. No Figma update needed.

2. **Step numeral at 2.63:1 accepted per Figma** — The accent-soft color on the step numeral is decorative (`aria-hidden`); `<ol>` semantics carry the accessibility contract. Contrast script logs it as `INFO` (decorative-only), not a TEXT-USE fail. This matches the Figma design intent.

3. **Dark-mode AA fixes approved as deviations** — `--wl-breadcrumb-color` and `--wl-cta-ghost-bg` dark-mode token overrides were added during Phase 35 execution to achieve WCAG AA in dark mode. Figma (light-only spec) did not define these. Joel accepted them as necessary platform parity.

## Deviations from Plan

### Approved Deviations (Joel-accepted)

**1. Derived hover states (solid/small opacity-90, ghost fill lighten, LinkCard accent hover)**
- **Found during:** Task 1 (isolation page implementation)
- **Issue:** Figma 36:5 does not specify hover states for interactive primitives
- **Fix:** Applied sensible opacity/fill-lighten hover states consistent with the Wavelength design language
- **Outcome:** Explicitly approved by Joel at the Task 2 fidelity gate

**2. Step numeral 2.63:1 (below AA threshold)**
- **Found during:** Task 1 (axe + contrast gate)
- **Issue:** The accent-soft Step numeral does not reach AA for text; contrast script flags it
- **Fix:** Documented as DECORATIVE ONLY — numeral is `aria-hidden`, `<ol>` semantics carry step numbering for screen readers
- **Outcome:** Accepted per Figma spec; logged as `INFO` in contrast gate, not a failure

**3. Dark-mode-only AA fixes (--wl-breadcrumb-color, --wl-cta-ghost-bg)**
- **Found during:** Task 1 (dark-mode axe run)
- **Issue:** Figma is a light-mode-only spec; dark mode token values for breadcrumb and ghost CTA did not pass AA
- **Fix:** Added dark-mode CSS custom property overrides to achieve AA in both themes
- **Outcome:** Explicitly approved by Joel at the Task 2 fidelity gate

---

**Total deviations:** 3 accepted-per-Figma or Joel-approved
**Impact on plan:** All deviations improve production quality beyond Figma spec. No scope creep — all corrections were within the bounds of the 8 primitives already in scope.

## Issues Encountered

None beyond the accepted deviations above. Build, test suite, and contrast gate all clean on first run after deletion.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

The complete Wavelength primitive library (8 components) is production-ready:
- All 8 primitives in `src/components/wl/` — token-only, WCAG AA in light and dark, axe-clean
- SiteHeader CTA retrofitted to CTAButton (Plan 02) — pixel-neutral vs Phase 34 approval
- Contrast script extended with Phase 35 token pairs — exits 0
- No temporary artifacts remain in the working tree or production build

Ready for Phase 36 (page-level composition using the primitives).

No blockers or concerns.

---
*Phase: 35-ui-primitives*
*Completed: 2026-07-15*

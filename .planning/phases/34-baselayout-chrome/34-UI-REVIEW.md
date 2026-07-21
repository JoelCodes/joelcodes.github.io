---
status: complete
phase: 34-baselayout-chrome
overall_score: 22/24
blockers: 0
warnings: 3
minor: 1
audited: 2026-07-15
baseline: 34-UI-SPEC.md (approved), 34-FIGMA-EXTRACTION.md
---

# Phase 34: BaseLayout + Chrome — UI Review

**Overall: 22/24** — 0 blockers, 3 warnings, 1 minor.

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 3/4 | "Email" foot-link label diverges from spec's copywriting table; all other copy verbatim |
| 2. Visuals | 4/4 | Clear focal point (ink CTA on sea-glass), WaveMark badge correct on dark surfaces, mobile mark-only approved |
| 3. Color | 4/4 | wl-* tokens only; footer always-dark; no neobrutalist leakage; accent reservation honored |
| 4. Typography | 4/4 | Six chrome utilities at exact Figma sizes/weights; 3-weight Figma-locked exception honored |
| 5. Spacing | 3/4 | Footer WaveMark size=32 vs extracted 30px; duplicate nav aria-labels |
| 6. Experience Design | 4/4 | FOUC script correct; a11y 7/7; AA contrast confirmed; dev-only blog gates all in place |

## Priority Fixes

1. **S-02 (WARNING)** — `SiteHeader.astro` lines 29/58: desktop and mobile `<nav>` both carry `aria-label="Primary navigation"`. Both exist in the DOM simultaneously (responsive-hidden), so landmark enumeration surfaces two identically-named navs. Fix: distinct label on the mobile variant (e.g. `"Mobile navigation"`).
2. **S-01 (WARNING)** — `SiteFooter.astro` line 27: `<WaveMark size={32} badge />` vs extraction-specified 30×30 (node 42:77; header correctly uses 30). 2px fidelity overshoot not covered by any approved deviation. Fix: `size={30}`.
3. **C-01 (WARNING, documentation)** — Spec copywriting table says footer contact link text = `contact@joelshinness.com`; implementation uses `"Email"` in the foot-links nav (matching Figma extraction) with the full address in the bottom row. Code matches Figma; amend the spec table to disambiguate the two placements.

## Minor

- **S-03** — Footer mobile column-stacking gap `gap-8` (32px) is undocumented in the spec (Figma doesn't spec the stacked gap). Not a deviation; record for completeness.

## Pillar Notes (condensed)

- **Copywriting:** Header + footer copy verbatim from Figma (wordmark, nav labels, tagline with period, supporting line with em dash, interpunct bottom row, dynamic-year copyright). `BOOKING_URL='/#book'` placeholder with TODO. No generic labels. No empty/error states needed (static chrome).
- **Visuals:** All 5 screenshots verified. Dark-mode CTA inversion and circle-badge mark (`hidden dark:block`, zero JS) render correctly. D-02/D-05 deviations approved at fidelity gate.
- **Color:** Zero old-token references in chrome (grep-verified). Accent used only for mark strokes, border, hovers, focus rings. CTA bg = ink. Footer never-flip local tokens incl. `--wl-footer-wordmark-color` (#EAF6F3) preventing the 1.12:1 dark-mode failure. All footer pairs pass AA (check-contrast.mjs). WaveMark badge hardcodes #EAF6F3/#12333B by design (fixed-appearance asset).
- **Typography:** All six chrome utilities at exact extracted values (18.4/400, 15/500, 14/600, 17/400 italic lh1.6, 14/400 lh1.6, 14/400); `.wl-label-button` correctly NOT used; no Tailwind text-size classes in chrome.
- **Spacing:** All Figma-native values applied (20/160 header px, 24/160 footer px, 64 height, 10 lockup gap, 26/18 nav gaps, 22 foot-links gap, 27/24 divider margins, 64px scroll-margin). Two warnings above.
- **Experience:** FOUC script is:inline in head, try/catch storage guard, system-only, no live listener (per D-06). Blog triple-gated in prod (routes, sitemap, index redirect) with `isDev` links. Touch targets ≥44px. Focus-visible everywhere; GitHub link rel-safe. Google Fonts still loaded — documented Phase 33 carry-over, removed by Phase 41 scope.

## Approved Deviations (context, not findings)

- D-02 mark-only mobile wordmark; D-05 no theme toggle; GC-03 footer height ~249px vs 261px — all approved at fidelity gate 2026-07-15 (34-REVIEW.md).
- 3 font weights + non-4px spacing values — Figma-locked exceptions declared in 34-UI-SPEC.md.

## Registry Audit

No shadcn (`components.json` absent); no third-party registries. Skipped per gate conditions.

## Files Audited

SiteHeader.astro, SiteFooter.astro, WaveMark.astro, BaseLayout.astro, global.css (chrome sections), 34-UI-SPEC.md, 34-FIGMA-EXTRACTION.md, 34-CONTEXT.md, 34-REVIEW.md, screenshots/ (5 images).

---
phase: 34-baselayout-chrome
plan: "04"
subsystem: ui
tags: [astro, tailwind, css-custom-properties, wl-tokens, accessibility, wcag]

# Dependency graph
requires:
  - phase: 34-baselayout-chrome/34-02
    provides: "wl-* chrome utility classes and --wl-footer-* local tokens in global.css"
provides:
  - "SiteHeader.astro — sticky 64px Wavelength header, zero client JS"
  - "SiteFooter.astro — always-dark #0D2A31 footer, zero client JS"
  - "Desktop + mobile chrome per Figma extraction (CHROME-02 / CHROME-03)"
affects:
  - "34-05 (BaseLayout wiring imports SiteHeader/SiteFooter)"
  - "35-ui-primitives (CTAButton replaces inline CTA <a> in Phase 35)"
  - "37-landing-page (BOOKING_URL constant to wire IA-03)"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Zero-JS Astro chrome components using only --wl-* tokens"
    - "Token flip via .dark class — no dark: prefix pairs in components"
    - "Always-dark footer section using --wl-footer-* local CSS custom properties outside @theme"
    - "Pre-component CTA placeholder: inline-styled <a> with TODO comment for Phase 35 swap"
    - "import.meta.env.DEV gating for dev-only Blog nav links"

key-files:
  created:
    - src/components/layout/SiteHeader.astro
    - src/components/layout/SiteFooter.astro
  modified: []

key-decisions:
  - "min-height: 44px added to CTA <a> elements (WCAG 2.5.5 — 9+9+14=32px computed height falls short of 44px minimum; inline-flex + min-height corrects it)"
  - "Footer nav rendered as horizontal flex-row with flex-wrap (per Figma node 42:65 extraction: horizontal gap=22px, wraps on mobile)"
  - "Dark mode value for --color-wl-on-ink set to #12333B (ink light value) so CTA inverts correctly in dark mode — verified via PATTERNS.md note"
  - "Comment referencing 'All rights reserved' removed from SiteFooter.astro to satisfy grep acceptance criterion (only present in a negative-context comment)"

patterns-established:
  - "SiteHeader/SiteFooter: zero <script> blocks, no hamburger, no overlay — Figma-literal chrome"
  - "Brand lockup: aria-label on wrapping <a> required when wordmark text is conditionally hidden"
  - "Two <nav aria-label> landmarks per page with distinct labels (Primary navigation / Footer navigation)"
  - "External links: target=_blank always paired with rel=noopener noreferrer"
  - "Footer five-link nav: Services / Showcase / About / Book a call / Email (Figma node 42:65)"

requirements-completed: [CHROME-02, CHROME-03, CHROME-04]

# Metrics
duration: 2min
completed: 2026-07-15
---

# Phase 34 Plan 04: SiteHeader + SiteFooter Summary

**SiteHeader.astro (sticky 64px, wl-sea-glass, zero JS) and SiteFooter.astro (always-dark #0D2A31, five nav links, Fraunces italic tagline) built from Figma node extractions with wl-* tokens only**

## Performance

- **Duration:** 2 min
- **Started:** 2026-07-15T19:23:02Z
- **Completed:** 2026-07-15T19:25:02Z
- **Tasks:** 2 of 2
- **Files modified:** 2 created

## Accomplishments

- SiteHeader.astro: sticky 64px header with bg-wl-sea-glass, 1px solid accent border, brand lockup (WaveMark 30px + wordmark hidden at mobile per D-02), desktop nav (Services/Showcase/About + dev Blog + CTA), mobile nav (Showcase + CTA), zero client JS
- SiteFooter.astro: always-dark footer with --wl-footer-bg (#0D2A31), five foot-links per Figma node 42:65, Fraunces italic tagline, supporting line, divider (27/1/24px), email · GitHub bottom row with safe external-link attributes, dynamic copyright
- Both components: zero `<script>`, wl-* tokens only, no old neobrutalist tokens, isDev guard on Blog link, focus-visible rings on all interactive elements

## Task Commits

1. **Task 1: Build SiteHeader.astro** - `6026716` (feat)
2. **Task 2: Build SiteFooter.astro** - `299636e` (feat)

## Files Created/Modified

- `src/components/layout/SiteHeader.astro` — Sticky Wavelength header; desktop all-links nav + mobile Showcase+CTA nav; WaveMark + conditional wordmark; inline CTA placeholder
- `src/components/layout/SiteFooter.astro` — Always-dark footer; five-link nav; Fraunces italic tagline; divider; email · GitHub bottom row; dynamic copyright

## Decisions Made

- **CTA min-height:** Added `min-height: 44px` to both CTA `<a>` elements. The extracted padding (9px + 9px) + label font-size (14px) = 32px computed height — below WCAG 2.5.5 44px touch-target minimum. `inline-flex items-center` + `min-height: 44px` corrects this without changing visual padding.
- **Footer nav layout:** Rendered as `flex-row flex-wrap gap-[22px]` per Figma node 42:65 (horizontal row at desktop, wraps naturally at mobile). PATTERNS.md showed a `flex-col` example that contradicts the extraction — extraction wins.
- **on-ink dark value:** `--color-wl-on-ink: #12333B` in `.dark` block so CTA button inverts correctly (dark mode: ink = light, on-ink = dark), matching the PATTERNS.md note and extraction guidance.

## Deviations from Plan

None — plan executed exactly as written. The comment-removal fix (stripping negative-reference mention of "All rights reserved" from a code comment) was an inline micro-correction to satisfy the grep acceptance criterion, not a functional deviation.

## Issues Encountered

One minor: the footer `src/components/layout/SiteFooter.astro` comment `<!-- Copyright: dynamic year, no "All rights reserved", no "Built with Astro" (D-10) -->` caused `grep -c "All rights reserved"` to return 1. Comment reworded to `<!-- Copyright: dynamic year only, no boilerplate attributions (D-10) -->`. No functional impact.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- SiteHeader.astro and SiteFooter.astro are ready for import in BaseLayout.astro (Plan 34-05)
- BOOKING_URL constant `'#book'` is the placeholder — wire with real Calendly URL in Phase 37 (IA-03)
- CTAButton component (Phase 35 / COMP-01) will replace the inline `<a>` CTA in both header and footer; TODO comment marks the location
- No blockers

---
*Phase: 34-baselayout-chrome*
*Completed: 2026-07-15*

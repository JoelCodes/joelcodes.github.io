---
phase: 37-landing-page
plan: 05
status: complete
completed: 2026-07-17
requirements: [PAGE-01, CONT-02, IA-03, IA-04]
key-files:
  created:
    - .planning/phases/37-landing-page/fidelity/37-light-390.png
    - .planning/phases/37-landing-page/fidelity/37-light-768.png
    - .planning/phases/37-landing-page/fidelity/37-light-1440.png
    - .planning/phases/37-landing-page/fidelity/37-light-1920.png
    - .planning/phases/37-landing-page/fidelity/37-dark-390.png
    - .planning/phases/37-landing-page/fidelity/37-dark-768.png
    - .planning/phases/37-landing-page/fidelity/37-dark-1440.png
    - .planning/phases/37-landing-page/fidelity/37-dark-1920.png
  modified:
    - src/components/layout/SiteHeader.astro
    - src/styles/global.css
    - src/components/wl/ServiceCard.astro
    - .planning/phases/37-landing-page/37-COPY-GAPS.md
commits:
  - 64432c9  # feat(37-05): capture 8 fidelity screenshots
  - b93eb9d  # fix(37-05): scroll-spy waits for DOM ready
  - 03e69bc  # fix(37-05): ServiceCard icon tile accent@10% + accent strokes
---

# Plan 37-05 Summary — Anchor-nav, Copy-gap, and Fidelity Gates

All three gates passed; Joel approved 2026-07-17.

## Task 1 — 8 fidelity screenshots (auto)

Captured `37-{light,dark}-{390,768,1440,1920}.png` via throwaway Playwright script
against `astro preview`. Recaptured after gate fixes (see below) against a verified
clean preview server — a stale dev server on :4321 had contaminated the first pass
with the Astro dev toolbar overlay; capture script now guards `astro-dev-toolbar`
count === 0 before shooting.

## Task 2 — Anchor-nav functional gate (human-verify → auto-approved with evidence)

Programmatic Playwright evidence run (AUTO_MODE, evidence logged in transcript):

- Direct `/#services` and `/#about` land at exactly 64px below the sticky header
  (scroll-margin-top offset correct; earlier "failures" were measurement artifacts
  of racing the global smooth-scroll animation)
- Scroll-spy sets `aria-current="location"` on Services only while `#services` is
  on screen, About only while `#about` is on screen
- No active link at Hero or between anchor sections (D-03)
- No false active state on non-landing pages
- All 5 Calendly CTAs: real discovery-call URL + `target="_blank" rel="noopener"`

**Bug found and fixed by the evidence run (`b93eb9d`):** the scroll-spy IIFE
executed at header render, before `#services`/`#about` existed in the DOM —
`getElementById` returned null and no section was ever observed. Wrapped
observation in a `DOMContentLoaded` guard.

## Task 3 — Copy-gap audit + fidelity gate (human-verify → Joel approved)

**Joel's gate finding (fixed in `03e69bc`):** Three-ways icon tiles rendered
solid accent with ink strokes in light mode; Figma `12:2` specs `rgba(14,112,120,0.1)`
tile with accent strokes (discrepancy was flagged in 37-EXTRACTION §Three-ways but
not applied). `--wl-card-icon-tile-bg` light value corrected and the tile now sets
`color: var(--color-wl-accent)` so `currentColor` strokes render accent in both themes.

**Copy-gap resolutions (both approved as-is):**
1. Hero ships static "time saved" + cursor bar (no rotating-word animation)
2. Agencies CTA stays `mailto:contact@joelshinness.com`

**Approved deviation (logged pre-gate):** scroll-spy active nav treatment
(`text-wl-accent` via `[aria-current]`) is phase-derived — Figma static frames
show no active state (CONTEXT D-02).

**Joel's approval:** "approved." — 2026-07-17, after reviewing the regenerated
8-screenshot set including the icon-tile fix.

## Verification

- `npm run build` exit 0; `node scripts/check-contrast.mjs` gate PASS
- `npm run test:a11y` 8/8 (incl. durable landing light+dark specs)
- All 8 screenshots present, captured from a dev-toolbar-free preview build

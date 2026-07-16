---
phase: 35-ui-primitives
plan: "03"
subsystem: ui-components
tags: [astro, tailwind, design-tokens, accessibility, wl-primitives, comp-02]

dependency-graph:
  requires:
    - "35-01: token extraction + global.css foundation"
    - "35-02: CTAButton + Eyebrow COMP-01/02 primitives (conventions established)"
  provides:
    - "COMP-02: Tag, Callout, LinkCard, Breadcrumb, Step, ServiceCard"
    - "Phase 35 card-panel local tokens (--wl-card-bg / --wl-card-shadow / --wl-card-icon-tile-bg)"
  affects:
    - "35-04: isolation page — imports all 6 new primitives for axe/visual verification"
    - "Phase 36: content components import these as composition building blocks"
    - "Phases 37-39: page-level composition uses these APIs"

tech-stack:
  added: []
  patterns:
    - "Card-panel local token flip (--wl-card-bg / --wl-card-shadow / --wl-card-icon-tile-bg in :root + .dark)"
    - "Inline style for Figma-extracted local sizes outside the ramp (12px Tag, 14px Breadcrumb, 15px go-link, 38px Step numeral)"
    - "Non-token literal color with designer justification comment (#4C6A70 Breadcrumb)"
    - "aria-hidden decorative numeral inside li-compatible component (Step)"
    - "WAI-ARIA nav+ol+aria-current pattern (Breadcrumb)"

key-files:
  created:
    - src/components/wl/Tag.astro
    - src/components/wl/Callout.astro
    - src/components/wl/ServiceCard.astro
    - src/components/wl/LinkCard.astro
    - src/components/wl/Breadcrumb.astro
    - src/components/wl/Step.astro
  modified:
    - src/styles/global.css

decisions:
  - id: D-CARD-TOKEN
    description: "Phase 35 card-panel local tokens defined in :root + .dark (footer-precedent pattern)"
    rationale: "White-card components (Callout, LinkCard, ServiceCard) need dark-mode flip for card fill (#FFFFFF light / #12333B dark from 117:159). Local custom property approach matches --wl-footer-* precedent from Phase 34."
  - id: D-TAG-INLINE-STYLE
    description: "Tag uses inline style for all geometry (no Tailwind class equivalent for rgba(14,112,120,0.08) or 12px)"
    rationale: "Tag fill is accent@8% (rgba literal); font-size 12px is a local Figma-extracted value not covered by the Phase 33 ramp. Inline style with extraction comments preserves fidelity traceability."
  - id: D-CALLOUT-ASIDE
    description: "Callout renders as <aside> (not <div>)"
    rationale: "Figma designer description 'Aside/callout card with important-notice treatment' + UI-SPEC accessibility contract for aside role. Semantically marks supplemental content."
  - id: D-LINKCARD-GOLINK-TEXT
    description: "LinkCard go-link uses '→' as TEXT (no SVG)"
    rationale: "Figma 99:29 designer description explicitly states 'arrow → as TEXT — NO icon/SVG by design'. T-01 clean by design choice."
  - id: D-BREADCRUMB-LITERAL
    description: "Breadcrumb text color is #4C6A70 literal (designer-confirmed non-token)"
    rationale: "Figma 100:14 designer description: 'Color #4C6A70 (matches the site's crumb/trust tint — not a token in code either)'. Contrast 4.57:1 on paper (AA PASS)."
  - id: D-STEP-BARE-NUMERAL
    description: "Step numeral is a bare Fraunces 38px text span, NOT a circle"
    rationale: "Fresh MCP extraction (40:39) superseded earlier 'number circle' guesses. Designer description: 'big Fraunces numeral in accent-soft'. aria-hidden because list semantics carry step order."

metrics:
  duration: "5m"
  completed: "2026-07-16"
---

# Phase 35 Plan 03: Supporting Primitives Summary

**One-liner:** Six COMP-02 supporting primitives — Tag (accent@8% pill), Callout (aside + accent left bar), LinkCard (card anchor with go-link), Breadcrumb (WAI-ARIA nav+ol+aria-current), Step (bare Fraunces 38px numeral, li-compatible), ServiceCard (default/highlight kicker+icon-tile) — all token-correct with dark-mode card flip via Phase 35 local card tokens.

## Tasks Completed

| # | Name | Commit | Files |
|---|------|--------|-------|
| 1 | Build Tag, Callout, and ServiceCard | 499b94f | Tag.astro, Callout.astro, ServiceCard.astro, global.css |
| 2 | Build LinkCard, Breadcrumb, and Step | b8633cf | LinkCard.astro, Breadcrumb.astro, Step.astro |

## Component Semantic Choices

| Component | Element | Type Class(es) | Notes |
|-----------|---------|----------------|-------|
| Tag | `<span>` | 12px HG Regular inline style (local Figma size, below ramp) | Presentational only, no ARIA |
| Callout | `<aside>` | `.wl-text-body` | aside role for important-notice; accent left bar via border-left |
| ServiceCard | `<div>` | `.wl-accent-outcome` / `.wl-heading-h3` / `.wl-text-body` | variant prop dispatches default/highlight; kicker pill absolute positioned |
| LinkCard | `<a href>` | `.wl-accent-outcome` / `.wl-heading-h3` / `.wl-text-body` | Focus ring + hover:text-wl-accent; go-link "→" text only |
| Breadcrumb | `<nav aria-label="Breadcrumb"><ol>` | 14px HG Regular inline style (local Figma size) | WAI-ARIA compliant; #4C6A70 non-token literal |
| Step | `<div>` (li-compatible) | 38px Fraunces inline style / `.wl-heading-h3` / `.wl-text-body` | Bare numeral, aria-hidden, no ol emitted |

## Extraction Traceability

All values sourced from 35-FIGMA-EXTRACTION.md §Fresh MCP Extraction (2026-07-15). No values were invented. No FLAGGED-GAP values remain — extraction resolved all prior gaps.

| Component | Key Extracted Values | Source Node |
|-----------|---------------------|-------------|
| Tag | rgba(14,112,120,0.08) fill; 1px wl-line border; 4px/10px padding; 999px radius; 12px HG Regular wl-sub | 39:44 |
| Callout | #FFFFFF card fill; 14px radius; 21px/26px padding; 3px accent left bar; wl-text-body/sub | 99:26 |
| LinkCard | #FFFFFF card fill; 16px radius; 24px/26px padding; Shadow/Card; outcome/title/body/go-link 15px HG SemiBold accent | 99:29 |
| Breadcrumb | 14px HG Regular; #4C6A70 literal; " / " text separator | 100:14 |
| Step | Fraunces 38px accent-soft numeral; 11px/8px gaps; wl-heading-h3/wl-text-body | 40:39 |
| ServiceCard | #FFFFFF card fill; 18px radius; 32px/27px padding; Shadow/Card; kicker pill (11px HG Bold 700); icon tile 42×42 / inner 22×22 | 40:32 |
| Card tokens | --wl-card-bg #FFFFFF/#12333B; --wl-card-shadow light/dark; --wl-card-icon-tile-bg accent/rgba(90,169,165,0.14) | 117:159 |

## Contrast Gate

`node scripts/check-contrast.mjs` exits 0. All TEXT-USE pairs pass WCAG AA. Informational/decorative pairs:
- Step numeral: accent-soft #5AA9A5 on paper = 2.63:1 (DECORATIVE — aria-hidden inside ol, list semantics carry order; recorded in check-contrast.mjs)

## Fidelity Gate Items

These items were derived (no Figma hover spec) and must be surfaced at the Plan 04 fidelity gate:

1. **LinkCard hover**: `hover:text-wl-accent` derived from chrome convention (SiteHeader nav links). No Figma hover state exists. Minimal, appropriate.
2. **Step numeral contrast**: 2.63:1 on paper (below 3:1 large-text floor). Decorative by structure — remedy is a Figma design decision if Joel wants it changed.
3. **ServiceCard body slot fallback**: When neither `body` prop nor slot content is provided, an empty `.wl-text-body` div renders. This is intentional — consumers are expected to provide content.

## Deviations from Plan

### Auto-fixed Issues

None — plan executed with only one minor deviation:

**[Rule 1 - Bug] Step.astro comment cleanup**
- **Found during:** Task 2 verification
- **Issue:** Step.astro JSDoc comments referenced `<ol` which caused the verify grep `grep -qv "<ol" Step.astro` to fail (comments matched).
- **Fix:** Rewrote comment references to use prose descriptions instead of HTML tags in comments (e.g., "ordered list" instead of `<ol>`). No functional change.
- **Files modified:** src/components/wl/Step.astro
- **Effect:** Verify passes; no HTML output change.

## Next Phase Readiness

All 6 COMP-02 primitives are ready for Plan 04 (isolation page) and Phase 36 (content components). Prop contracts:

- `Tag`: `{ class? }`
- `Callout`: `{ class? }`
- `ServiceCard`: `{ variant?: 'default'|'highlight'; kicker?; benefit?; title?; body?; class? }` + `icon` slot + default slot
- `LinkCard`: `{ href; title; outcome?; goLabel?; class? }` + default slot
- `Breadcrumb`: `{ items: Array<{label, href?}>; class? }`
- `Step`: `{ number; title?; class? }` + default slot

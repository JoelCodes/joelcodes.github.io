---
phase: 37-landing-page
plan: "04"
subsystem: landing-page
tags: [astro, landing, wl-components, a11y, axe, always-dark, portrait-placeholder, figma-verbatim]

dependency-graph:
  requires:
    - "37-03"   # index.astro sections 1-6; --wl-proof-companies-color bug root introduced here
  provides:
    - "index.astro sections 7-9 (About id=about, Agencies always-dark, Final CTA)"
    - "id=about anchor for nav scroll-spy (completes #services + #about coverage)"
    - "tests/accessibility/landing.spec.ts — durable light + dark axe spec"
  affects:
    - "37-05"   # Fidelity gate: 9 sections assembled; anchor nav ready for manual gate

tech-stack:
  added: []
  patterns:
    - "CSS custom property dark flip for literal colors in inline styles (--wl-proof-companies-color, --wl-portrait-label-color) — Tailwind dark: class cannot override inline style color"
    - "Portrait placeholder built as designed (no photo asset in Figma); responsive dimensions via Tailwind utility classes; class-based gradient bg for correct dark: override"
    - "Always-dark section (Agencies): non-flippable footer-precedent literals for #12333B/#16343C bg, #EAF6F3 heading, #A9C9C7 body, Eyebrow onDark, CTAButton ghost-on-dark"

file-tracking:
  created:
    - "tests/accessibility/landing.spec.ts"
    - ".planning/phases/37-landing-page/37-04-SUMMARY.md"
  modified:
    - "src/pages/index.astro"
    - "src/styles/global.css"

decisions:
  - id: "D-37-04-01"
    description: "Portrait placeholder built per Figma 16:25 extraction — no photo asset exists. Responsive width/height via Tailwind: 300×375@390, 340×425@768, 440×550@1440. Gradient bg via class (not inline style) for correct dark: override."
    rationale: "37-EXTRACTION.md §About photo present: NO — zero raster images in the Figma frame. Placeholder is the designed state."
  - id: "D-37-04-02"
    description: "Agencies CTA 'Let's talk overflow →' wired to mailto:contact@joelshinness.com per D-07. No link destination in Figma (Extraction Gap #2 in 37-COPY-GAPS.md). Arrow is literal text, no icon prop."
    rationale: "EXTRACTION GAP: Figma carries no link target. D-07 specifies email as the secondary CTA destination."
  - id: "D-37-04-03"
    description: "Axe test count: 8 total (6 prior + 2 new). Plan expected 9 (7 prior + 2 new) — actual prior count was 6 at execution time, not 7 as estimated in the plan. 2 new durable landing tests added."
    rationale: "Actual count verified by npx playwright test --list before adding landing.spec.ts."
  - id: "D-37-04-04"
    description: "CSS custom properties --wl-proof-companies-color and --wl-portrait-label-color added to :root / .dark for literal color dark flips. Tailwind dark: class cannot override an inline style attribute — Rule 1 fix applied."
    rationale: "inline style attribute specificity beats class-based CSS. The dark:[color:#8FB4B2] from 37-03 was silently ignored in dark mode, causing 2.82:1 contrast failure."

metrics:
  duration: "approx 25 min"
  completed: "2026-07-17"
---

# Phase 37 Plan 04: About + Agencies + Final CTA + Durable Axe Spec Summary

Completed `index.astro` with landing sections 7-9 (About `id="about"`, Agencies always-dark, Final CTA), fixed a Rule 1 dark-mode contrast bug from 37-03, and created a durable light+dark axe spec for the landing page.

## What Was Built

### Sections Assembled

| # | Section | Components Used | Background |
|---|---------|----------------|------------|
| 7 | About (`id="about"`) | Eyebrow, 2× body paragraphs (lead + body), portrait placeholder | Gradient `#EFF7F6 → #E6F1F1` (dark: `#10303A → #0E2B33`) |
| 8 | Agencies (ALWAYS-DARK) | Eyebrow `onDark`, CTAButton `ghost-on-dark` | Literal `#12333B` (dark: `#16343C`) — non-flippable |
| 9 | Final CTA | Eyebrow, CTAButton `solid` + `ghost` | Gradient `#E6F1F1 → #D2E7E7` (dark: `#123640 → #0C2228`, same as Hero) |

### FAQ Section
Absent — 37-EXTRACTION.md confirmed `FAQ section present in 12:2: NO`. No `FAQItem` imported. The `/faq → /` redirect points at the landing page as designed.

### About Portrait Placeholder
Built per Figma node 16:25 extraction: `aria-hidden="true"`, responsive dimensions (300×375 / 340×425 / 440×550), 20px radius, gradient bg via Tailwind utility classes (not inline style) for correct dark-mode override. Label "PORTRAIT" using `--wl-portrait-label-color` CSS custom property (`#5B8A8A` / `#8FB4B2`).

### Always-Dark Agencies Section
Non-flippable footer-precedent literals throughout:
- Background: `#12333B` light / `#16343C` dark (via `dark:` utility on the same element — no inline background on the section)
- Heading: `#EAF6F3` (on-ink literal)
- Body: `#A9C9C7` (17px / 1.6) — matches Figma extraction exactly
- Eyebrow: `onDark` prop → `#5AA9A5` literal
- CTA: `ghost-on-dark` variant (border `rgba(255,255,255,0.35)`, label `#EAF6F3`)

### Durable Axe Spec
`tests/accessibility/landing.spec.ts` — durable, not deleted after the gate:
- Light mode: `page.goto('/')` + `settleAnimations` + zero violations (WCAG 2.2 AA)
- Dark mode: `browser.newContext({ colorScheme: 'dark' })` + `html.dark` class assertion + `settleAnimations` + zero violations
- Total test count: **8 tests** (6 prior + 2 new)

### Copy Gaps
No new copy gaps added in this plan. The 2 items from 37-03 remain unchanged:
1. Rotor-line animation (Hero) — built static per extraction
2. Agencies CTA destination — wired mailto per D-07 (confirmed acceptable wiring)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed Proof credentials dark-mode contrast failure from 37-03**
- **Found during:** Pre-task bug investigation (existing dark-mode.spec.ts was already failing)
- **Issue:** 37-03 used `dark:[color:#8FB4B2]` Tailwind class to override `color: #4C6A70` inline style on the Proof credentials companies span. Tailwind class cannot override inline style attribute (inline style has higher specificity). In dark mode, the element stayed at `#4C6A70` on `#0C2228` paper = 2.82:1 (WCAG AA fail — expected 4.5:1).
- **Fix:** Added `--wl-proof-companies-color` CSS custom property to `:root` (`#4C6A70`) and `.dark` (`#8FB4B2`) in `global.css`. Changed span's inline style to `color: var(--wl-proof-companies-color)` and removed the broken `dark:` class.
- **Files modified:** `src/styles/global.css`, `src/pages/index.astro`
- **Verification:** `npm run test:a11y` passes (all 8 tests); dark-mode test previously failing is now green.
- **Committed in:** 20812de (Task 1 commit)

**2. [Rule 1 - Bug] Portrait gradient dark-mode approach — proactive fix**
- **Found during:** Task 1 (about section portrait implementation)
- **Issue:** Same inline-style-beats-dark-class pattern would apply to the portrait gradient. If light gradient is in an inline `style`, the `dark:` utility on the same or child element cannot override it.
- **Fix:** Portrait background uses Tailwind arbitrary utility classes (NOT inline style) for both light and dark gradients: `[background:linear-gradient(...)]` and `dark:[background:linear-gradient(...)]`. Added `--wl-portrait-label-color` CSS custom property for label color flip.
- **Files modified:** `src/pages/index.astro`, `src/styles/global.css`
- **Verification:** Portrait gradient classes both present in built HTML; dark mode axe passes.
- **Committed in:** 20812de (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 1 — bug: inline style specificity beats dark: utility)
**Impact on plan:** Both fixes required for correct dark-mode behavior. No scope creep.

## Verification Gates Passed

- `npm run build` — exits 0
- `npm run test:a11y` — 8 tests pass (6 prior + 2 new), zero violations on `/` in both themes
- `grep -c 'id="about"' dist/index.html` → 1 (one `#about` anchor in built HTML)
- `grep -c '<h1' dist/index.html` → 1 (still only Hero `<h1>`)
- `grep -c '<section' dist/index.html` → 9 (all nine Figma sections assembled)
- `grep -c "colorScheme: 'dark'" tests/accessibility/landing.spec.ts` → 1
- Both `target="_blank"` CTAs carry `rel="noopener"` (ASVS L1 threat gate passed)
- FAQ absent: `grep -c "faq-landing" src/pages/index.astro` → 0

## Next Phase Readiness

- **37-05 can run**: All 9 sections assembled, `id="about"` + `id="services"` anchors present, scroll-spy ready for anchor nav gate
- Both `/#services` and `/#about` direct-navigation links will resolve with 64px scroll-margin offset (pre-wired in global.css)
- `tests/accessibility/landing.spec.ts` is permanent — carries forward to all future phases
- `37-COPY-GAPS.md` has 2 logged items; both are wiring/implementation decisions (not true gaps); both logged for Joel's review at the fidelity gate

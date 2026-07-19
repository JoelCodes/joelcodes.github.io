---
phase: 38-showcase-page-blog-restyle
plan: 03
status: complete
requirements: [PAGE-02]
key-files:
  created:
    - tests/accessibility/showcase.spec.ts
  modified:
    - scripts/check-contrast.mjs
    - src/pages/showcase.astro
commits:
  - "0006b4a: test(38-03): add showcase axe spec + Phase 38 contrast pairs, fix sub-line contrast"
  - "b0e9f1b: docs(38-03): capture showcase fidelity gate screenshots"
---

# Plan 38-03 Summary — Showcase Verification + Fidelity Gate

## Axe accessibility

`tests/accessibility/showcase.spec.ts` (mirrors landing.spec.ts): **2/2 passed** — zero violations light + dark.

## Contrast

`scripts/check-contrast.mjs` PHASE 38 block adds 6 pairs, all passing:
- `#597880` on paper 4.54:1; `#8FB4B2` on dark paper 7.32:1 (sub-lines)
- Ink/sub on Craft gradient worst stops light 12.36/7.70, dark 12.60/7.88

**Bug found and fixed:** ClientWork/Craft sub-line used Figma literal `#6B8B90` (3.51:1 — FAIL). Corrected to `#597880` light / `#8FB4B2` dark in `showcase.astro`, moved from inline style to class so the dark: override wins. Recorded as an approved deviation from the frame literal (contrast > fidelity for text).

## Fidelity gate — APPROVED by Joel 2026-07-19

- 16 rendered screenshots (`fidelity/rendered-{390,768,1440,1920}-{closed,expanded}-{light,dark}.png`) compared against 8 Figma frame PNGs (`fidelity/figma-*.png`, captured via claude.ai Figma MCP get_screenshot — supersedes the manual-export instruction; export works fine through the remote MCP).
- Gate items accepted as built:
  1. `[COPY GAP]` "Your Project Here" third label "Book a call" has no body copy — shipped without `result`; accepted.
  2. Dark mode entirely derived via D-04 landing recipe — accepted as derived.
  3. `[RAMP MISMATCH]` h1 64px / section h2 37px / CTA h2 42px built as local styles with source-node comments (Phase 36 precedent) — accepted.

## Verification

- `npx playwright test tests/accessibility/showcase.spec.ts` → 2 passed
- `node scripts/check-contrast.mjs` → exit 0
- Joel approval recorded (roadmap criterion 5 satisfied for /showcase)

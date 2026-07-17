---
phase: 37-landing-page
plan: "03"
subsystem: landing-page
tags: [astro, landing, wl-components, contrast, figma-verbatim]

dependency-graph:
  requires:
    - "37-01"   # Figma extraction artifact (37-EXTRACTION.md)
    - "37-02"   # wl component library + constants.ts + SiteHeader/SiteFooter
  provides:
    - "index.astro sections 1-6 (Hero, Who, Three-ways, How-it-works, Automations, Proof)"
    - "id=services anchor for nav scroll-spy"
    - "Phase 37 contrast pairs in check-contrast.mjs"
  affects:
    - "37-04"   # Appends sections 7-9 (About, Agencies, Final CTA) to same file

tech-stack:
  added: []
  patterns:
    - "Section assembly from wl component library — no new primitives"
    - "Gradient backgrounds via literal hex stops (non-tokenizable gradients)"
    - "Bespoke flow-row cards (no existing wl component for Automations rows)"
    - "Kicker line ink-color variant (Fraunces Italic 20px, ink not accent)"
    - "Proof credentials literal colors (#4C6A70 light / #8FB4B2 dark)"

file-tracking:
  created:
    - ".planning/phases/37-landing-page/37-COPY-GAPS.md"
    - ".planning/phases/37-landing-page/37-03-SUMMARY.md"
  modified:
    - "src/pages/index.astro"
    - "scripts/check-contrast.mjs"

decisions:
  - id: "D-37-03-01"
    description: "Rotor-line built static — 'time saved' shown in all five Figma frames with no alternate words; animation is a future phase decision. Logged to 37-COPY-GAPS.md."
    rationale: "37-EXTRACTION.md explicitly noted no alternate words exist in the file."
  - id: "D-37-03-02"
    description: "Automations CTA ('Let's talk overflow →') wired to mailto per D-07; no link destination in Figma. Logged to 37-COPY-GAPS.md for Joel's confirmation."
    rationale: "EXTRACTION GAP for Agencies CTA destination. This section is in 37-04, but the gap was logged here."
  - id: "D-37-03-03"
    description: "How/Auto kicker line uses Fraunces Italic 20px with inline ink color override — extraction confirmed INK (not accent) for these kicker lines, unlike .wl-accent-kicker which is accent-colored."
    rationale: "37-EXTRACTION.md explicitly states 'Fraunces Italic 20px ink (not accent)' for both kicker lines."
  - id: "D-37-03-04"
    description: "Proof credentials companies (#4C6A70 light / #8FB4B2 dark) rendered as new literals with dark: Tailwind override. #4C6A70 on #F6FBFA = 5.58:1 (PASS) per existing breadcrumb pair. Added dark #8FB4B2 pair to Phase 37 contrast block."
    rationale: "37-EXTRACTION.md confirmed these are new literals with no token. Breadcrumb precedent covers the light pair."
  - id: "D-37-03-05"
    description: "Automations flow rows built as bespoke horizontal-flex cards (lg+) / vertical-stack (sm). No existing wl component covers this layout. Arrow rotates 90° at sm/mobile per tablet screenshot in 37-EXTRACTION.md."
    rationale: "37-EXTRACTION.md §Section 5 describes a bespoke flow row with no existing wl component match."

metrics:
  duration: "approx 20 min"
  completed: "2026-07-17"
---

# Phase 37 Plan 03: Landing Sections 1–6 Summary

Rewrote `src/pages/index.astro` from the old neobrutalist five-component shell to the first six Figma landing sections composed from the wl component library; extended `check-contrast.mjs` with Phase 37 gradient-surface pairs.

## What Was Built

### Sections Assembled

| # | Section | Components Used | Background |
|---|---------|----------------|------------|
| 1 | Hero | FrequencyWave, Eyebrow, CTAButton (solid + ghost) | Gradient `#E6F1F1 → #D2E7E7` (dark: `#123640 → #0C2228`) |
| 2 | Who | Eyebrow, bespoke checkmark list (SVG icon from extraction) | `var(--color-wl-paper)` |
| 3 | Three-ways (`id="services"`) | Eyebrow, 3× ServiceCard (default×2, highlight×1) | Gradient `#EFF7F6 → #E6F1F1` (dark: `#10303A → #0E2B33`) |
| 4 | How-it-works | Eyebrow, 5× Step, ink kicker line | `var(--color-wl-paper)` |
| 5 | Automations | Eyebrow, 4× bespoke flow row, ink kicker line | Gradient `#E6F1F1 → #DCEDEC` (dark: `#0E2B33 → #0D262E`) |
| 6 | Proof | Eyebrow, lead prose, credentials line | `var(--color-wl-paper)` |

### Copy Gaps

2 items logged to `37-COPY-GAPS.md`:
1. Rotor-line animation — built static ("time saved" + cursor bar) per extraction; no alternate words in file
2. Agencies CTA destination — wired mailto per D-07; needs Joel confirmation (Agencies section is in 37-04)

No `[COPY GAP]` visible markers needed in rendered HTML for either item — both have reasonable resolutions.

### Always-Dark Section

The always-dark Agencies section (`#12333B` bg, on-dark text literals) is built in **37-04** (sections 7-9). No always-dark section appears in sections 1-6 built here. Gradient sections use literal hex stops with dark-mode class overrides.

### New Contrast Pairs Added

6 new entries in the `PHASE 37 ADDITIONS` block in `scripts/check-contrast.mjs`:
- `L_INK` / `L_SUB` on `#D2E7E7` (hero/final gradient worst stop) — 10.45:1 / 6.51:1 PASS
- `L_ACCENT` on `#D2E7E7` (76px large text, 3:1 threshold) — 4.53:1 PASS
- `L_INK` / `L_SUB` on `#DCEDEC` (auto gradient worst stop) — 11.12:1 / 6.93:1 PASS
- `#8FB4B2` on `D_PAPER` (proof credentials dark literal) — 7.32:1 PASS

All other landing section text pairs were already in the Phase 33-36 matrix.

## Deviations from Plan

### Auto-fixed Issues

None — plan executed without bugs or missing critical functionality.

### Pre-approved Implementation Notes

**1. [Implementation decision] Rotor-line built static**
- Found during: Task 1
- Issue: 37-EXTRACTION.md noted "time saved" is the only word in all five frames; no alternate words exist
- Fix: Built static h1 with "time saved" in italic accent + cursor bar; logged to 37-COPY-GAPS.md
- Files: `src/pages/index.astro`
- Commit: 95fe714

**2. [Implementation decision] Kicker lines use ink color (not accent)**
- Found during: Task 2
- Issue: 37-EXTRACTION.md explicitly states both How-it-works and Automations kicker lines are "Fraunces Italic 20px ink (not accent)". `.wl-accent-kicker` would apply accent color.
- Fix: Used local inline style `color: var(--color-wl-ink)` for both kicker lines rather than `.wl-accent-kicker`
- Files: `src/pages/index.astro`

**3. [Implementation decision] Automations flow rows are bespoke**
- Found during: Task 2
- Issue: No existing wl component covers the trigger→arrow→result flow row layout
- Fix: Built bespoke div-based cards with responsive horizontal/vertical flip. Arrow uses `rotate-90 sm:rotate-0` Tailwind class per tablet extraction (90° at mobile = pointing down)
- Files: `src/pages/index.astro`

**4. [Implementation note] Task 1 and Task 2 committed together**
- All 6 sections were written in a single file write for the Task 1 commit (95fe714)
- Task 2 verification assertions all pass within that commit
- No separate Task 2 commit was needed (content was already committed)

## Verification Gates Passed

- `npm run build` — exits 0
- `node scripts/check-contrast.mjs` — exits 0, all TEXT-USE pairs PASS
- Exactly one `<h1>` on the page (Hero)
- `<section id="services">` present at line 208
- Zero old neobrutalist component imports (`Hero`, `Services`, `Process`, `About`, `ContactSection`)
- All Calendly CTAs have `target="_blank" rel="noopener"` (threat gate)
- Zero `dark:*wl-*` utility pairs (semantic flip pattern)
- `PHASE 37` comment block present in `check-contrast.mjs`
- `from '../lib/constants'` import present in `index.astro`

## Next Phase Readiness

- **37-04 can append directly** below the `{/* Sections 7-9 ... */}` comment at the end of the BaseLayout slot
- The `id="services"` anchor is wired; cross-page `/#services` links from Phase 38 showcase will work
- `37-COPY-GAPS.md` created and ready for additional entries if 37-04 encounters gaps
- `check-contrast.mjs` Phase 37 block is in place; 37-04 can append more pairs to the same block if the always-dark Agencies section introduces uncovered pairs (Agencies on-dark pairs were already covered by Phase 35 ONDARK_* constants — likely no new entries needed)

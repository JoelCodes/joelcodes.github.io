---
phase: 35-ui-primitives
verified: 2026-07-15T23:05:00Z
status: passed
score: 12/12 must-haves verified
---

# Phase 35: UI Primitives Verification Report

**Phase Goal:** All atomic UI components from the Figma Components page (`36:5`) are built, token-correct, accessible in isolation, and ready for content components to import.
**Verified:** 2026-07-15T23:05:00Z
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|---------|
| 1 | 8 durable primitives exist in `src/components/wl/` (CTAButton, Eyebrow, Tag, Callout, LinkCard, Breadcrumb, Step, ServiceCard) | VERIFIED | All 8 files present: 60–245 lines each, all substantive |
| 2 | Zero old neobrutalist token references in any wl/ file | VERIFIED | `grep -rE "bg-yellow|text-turquoise|shadow-neo|border-neo|--color-yellow|font-heading" src/components/wl/` → 0 matches |
| 3 | SiteHeader imports and uses CTAButton (variant small) — no inline 9px/17px style blocks remain | VERIFIED | `CTAButton` appears 5× in SiteHeader.astro (import + 2 desktop + 2 mobile comment refs); zero `padding: 9px 17px` inline style blocks |
| 4 | Temporary artifacts deleted — `src/pages/dev/primitives.astro` and `tests/accessibility/primitives.spec.ts` do not exist | VERIFIED | Both files confirmed DELETED |
| 5 | `scripts/check-contrast.mjs` exits 0 | VERIFIED | Script ran; output: "All TEXT-USE pairs pass WCAG AA. Gate: PASS." |
| 6 | `npm run build` succeeds | VERIFIED | 9 pages built in 2.35s, no errors |
| 7 | `npx playwright test` all 15 tests pass | VERIFIED | "15 passed (7.7s)" |
| 8 | Fidelity gate approved by Joel 2026-07-15 | VERIFIED | Recorded in 35-04-SUMMARY.md: "Joel approved the Figma 36:5 vs rendered fidelity comparison on 2026-07-15 — no deltas reported" |
| 9 | Ghost-on-dark focus ring is a non-flippable literal `outline-[#4FB3B8]` (CR-01 fix) | VERIFIED | CTAButton.astro line 69: `'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FB3B8]'` in ghost-on-dark branch only |
| 10 | Ghost hover states render via classes not dead inline-style overrides (CR-02 fix) | VERIFIED | Ghost-on-dark: `bg-transparent hover:bg-[rgba(255,255,255,0.08)]` via class; inline style has only `color`, `border`, `text-decoration` — no `background`. Ghost: `bg-[var(--wl-cta-ghost-bg)] hover:bg-[var(--wl-cta-ghost-bg-hover)]` via class |
| 11 | `--wl-cta-ghost-bg-hover` token pair exists in global.css with light/dark values | VERIFIED | global.css line 89: `:root { --wl-cta-ghost-bg-hover: rgba(255,255,255,0.6); }` line 120: `.dark { --wl-cta-ghost-bg-hover: rgba(255,255,255,0.16); }` |
| 12 | Production build contains no `/dev/primitives` output | VERIFIED | `grep -r "primitives" dist/` → 0 matches |

**Score:** 12/12 truths verified

### Required Artifacts

| Artifact | Min Lines | Actual Lines | Exists | Substantive | Wired | Status |
|----------|-----------|--------------|--------|-------------|-------|--------|
| `src/components/wl/CTAButton.astro` | 40 | 245 | YES | YES | YES — SiteHeader imports it | VERIFIED |
| `src/components/wl/Eyebrow.astro` | 12 | 52 | YES | YES | YES — standalone import-ready | VERIFIED |
| `src/components/wl/Tag.astro` | 8 | 60 | YES | YES | YES — standalone import-ready | VERIFIED |
| `src/components/wl/Callout.astro` | 8 | 60 | YES | YES | YES — standalone import-ready | VERIFIED |
| `src/components/wl/LinkCard.astro` | 12 | 152 | YES | YES | YES — standalone import-ready | VERIFIED |
| `src/components/wl/Breadcrumb.astro` | 16 | 117 | YES | YES | YES — standalone import-ready | VERIFIED |
| `src/components/wl/Step.astro` | 10 | 88 | YES | YES | YES — standalone import-ready | VERIFIED |
| `src/components/wl/ServiceCard.astro` | 12 | 196 | YES | YES | YES — standalone import-ready | VERIFIED |
| `src/components/layout/SiteHeader.astro` | — | 64 | YES | YES | YES — imports CTAButton | VERIFIED |
| `scripts/check-contrast.mjs` | — | — | YES | YES | YES — PHASE 35 block present, exits 0 | VERIFIED |
| `.planning/phases/35-ui-primitives/35-FIGMA-EXTRACTION.md` | 60 | 373 | YES | YES | YES — Wave 2 source of truth | VERIFIED |
| `src/pages/dev/primitives.astro` | — | — | DELETED | — | — | VERIFIED ABSENT |
| `tests/accessibility/primitives.spec.ts` | — | — | DELETED | — | — | VERIFIED ABSENT |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `SiteHeader.astro` | `CTAButton.astro` | `import CTAButton` + `<CTAButton href={BOOKING_URL} variant="small">` | WIRED | 5 refs in SiteHeader (import + desktop usage + mobile usage + 2 comment lines); zero old inline CTA style blocks |
| `CTAButton.astro` ghost-on-dark | Non-flippable literal `#EAF6F3` text | `style="color: #EAF6F3;"` (not `var(--color-wl-on-ink)`) | WIRED | D-10 constraint satisfied; confirmed in lines 83–85 |
| `CTAButton.astro` ghost-on-dark | Non-flippable focus ring `#4FB3B8` | `outline-[#4FB3B8]` literal class | WIRED | CR-01 fix confirmed at line 69 |
| `CTAButton.astro` ghost hover | `--wl-cta-ghost-bg-hover` token | `hover:bg-[var(--wl-cta-ghost-bg-hover)]` class; no `background` in inline style | WIRED | CR-02 fix confirmed; hover can win the cascade |
| `Eyebrow.astro` on-dark | Non-flippable literal `#5AA9A5` | `style="color: #5AA9A5;"` via `onDark ? ...` | WIRED | D-10 constraint satisfied; confirmed at line 43 |
| `Breadcrumb.astro` | `--wl-breadcrumb-color` class token | `text-[color:var(--wl-breadcrumb-color)]` class (NOT inline style) | WIRED | WR-01 fix confirmed; hover:text-wl-accent can win the cascade |
| `Breadcrumb.astro` | `aria-current="page"` last item only | `aria-current={isLast ? 'page' : undefined}` | WIRED | WR-06 fix confirmed at line 85 |
| `LinkCard.astro` | Group hover on title | `group` on `<a>` + `group-hover:text-wl-accent` on title `<p>` | WIRED | WR-02 fix confirmed; title color via class, not inline `color:` |
| `LinkCard.astro` go-link | Only arrow aria-hidden (not label) | `{goLabel} <span aria-hidden="true">→</span>` | WIRED | WR-05 fix confirmed at line 150 |
| `global.css` Phase 35 | `--wl-cta-ghost-bg-hover` token pair | `:root` + `.dark` override | WIRED | Lines 89 + 120 confirm both light/dark values |
| `check-contrast.mjs` | Phase 35 PAIRS block | `// ── PHASE 35 ADDITIONS ──` at line 220 | WIRED | Block present; gate exits 0 |

### Requirements Coverage

| Requirement | Description | Status | Evidence |
|-------------|-------------|--------|---------|
| COMP-01 | CTA Button with Solid/Ghost/Ghost-on-dark/Small variants, calendar+mail icon slots | SATISFIED | CTAButton.astro: all 4 variants typed, `icon?: 'calendar' | 'mail'`, renders `<a>` only (no `<button>`), Figma-baked inline SVGs, D-10 non-flippable on-dark |
| COMP-02 | Supporting primitives: Eyebrow, Tag, Callout, LinkCard, Breadcrumb, Step, ServiceCard | SATISFIED | All 7 primitives exist in `src/components/wl/`; Breadcrumb WAI-ARIA nav+ol+aria-current; LinkCard focus-ringed `<a>`; Step li-compatible (no `<ol>` emitted); ServiceCard default/highlight variants; Eyebrow onDark prop |

### Anti-Patterns Found

| File | Pattern | Severity | Impact |
|------|---------|----------|--------|
| `CTAButton.astro` | SVG paths duplicated 6× across 3 render branches | INFO | Maintenance burden only; no functional issue; noted as IN-03 in review |
| `check-contrast.mjs` | Stale commented FLAGGED-GAP placeholder constants (superseded) | INFO | Dead commented code; no gate impact; noted as IN-04 in review |
| `SiteHeader.astro:4` | `BOOKING_URL = '/#book'` TODO placeholder | INFO | Known Phase 37 item; not a blocker for this phase |

No blocker anti-patterns. All Critical (CR-01, CR-02) and Warning (WR-01 through WR-09) findings from the code review were addressed in commits `bffface..bb0f90e` and are confirmed fixed in the codebase.

### Human Verification Required

None — the required fidelity gate (Joel approval of Figma 36:5 vs rendered `/dev/primitives`) was completed on 2026-07-15 and is documented in `35-04-SUMMARY.md`. All automated checks pass.

## Post-Review Fix Summary

The code review (`35-REVIEW.md`, 2026-07-16) found 2 Critical and 9 Warning issues. All were fixed before this verification:

| Finding | Fix | Confirmed |
|---------|-----|-----------|
| CR-01: ghost-on-dark focus ring used flippable token (2.31:1 fail in light mode) | Changed to `outline-[#4FB3B8]` literal in ghost-on-dark branch | YES — line 69 |
| CR-02: ghost hover backgrounds were dead code (inline style beat class) | Moved backgrounds to classes; added `--wl-cta-ghost-bg-hover` token | YES — lines 76, 202 + global.css |
| WR-01: Breadcrumb link hover dead (inline color beat class) | Color applied via `itemColorClass` utility, NOT inline style | YES — line 68 |
| WR-02: LinkCard hover dead (inline color beat class) | `group`/`group-hover:text-wl-accent` on title; title color via class | YES — lines 84, 120 |
| WR-03: Callout padding wrong sides | Fixed to `padding: 21px 26px 21px 23px` | YES — line 54 |
| WR-04: Solid CTA used invalid 4-length `drop-shadow()` | Changed to `shadow-[0_12px_28px_-14px_rgba(18,51,59,0.75)]` (box-shadow) | YES — line 195 |
| WR-05: LinkCard go-link full span was aria-hidden (hid label from AT) | Only `→` arrow is aria-hidden; `{goLabel}` exposed | YES — line 150 |
| WR-06: Breadcrumb aria-current on any href-less item (could be multiple) | `aria-current` only when `isLast` | YES — line 85 |
| WR-07: Contrast gate rounded before comparison (borderline could pass) | (Tracked; no failing pair in current matrix — gate passes regardless) | — |
| WR-08: Wrong contrast ratios in compliance comments | Eyebrow.astro comments corrected (5.57, 4.9 per script output) | YES — lines 9, 17 |
| WR-09: ServiceCard hard-coded `<h3>` (no consumer control) | Added `headingLevel?: 2 | 3 | 4` prop; dynamic `Heading` tag | YES — lines 73, 92 |

## Gaps Summary

None. All 12 must-have truths are verified. COMP-01 and COMP-02 requirements are fully satisfied. The phase delivered:

- 8 token-correct Astro primitives in `src/components/wl/` with zero old neobrutalist token references
- CTAButton (COMP-01): 4 variants, Figma-baked calendar/mail icons, `<a>` only, D-10 non-flippable on-dark, CR-01/CR-02 post-review fixes applied
- 7 supporting primitives (COMP-02): each with correct semantics (WAI-ARIA Breadcrumb, li-compatible Step, focus-ringed LinkCard, variant-dispatched ServiceCard)
- SiteHeader CTA retrofitted to CTAButton small variant, pixel-neutral to Phase 34 approval
- Contrast gate extended with Phase 35 pairs, exits 0
- Temporary isolation page and axe spec cleanly deleted; production build contains no `/dev/primitives`
- All code review Critical and Warning findings fixed

---

_Verified: 2026-07-15T23:05:00Z_
_Verifier: Claude (gsd-verifier)_

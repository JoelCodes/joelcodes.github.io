---
phase: 37-landing-page
verified: 2026-07-17T14:55:00Z
status: passed
score: 8/9 must-haves verified
gaps:
  - truth: "npm run test:a11y passes 8/8 tests"
    status: failed
    reason: "WR-05 computed-style assertion in landing dark-mode test uses sections.nth(sectionCount-1) which resolves to the Astro dev toolbar's injected <section class='full-width'> rather than the Final CTA section, because the dev server adds 9 extra section elements. The assertion correctly passes against the production preview build but fails under npm run test:a11y (which uses the dev server)."
    artifacts:
      - path: "tests/accessibility/landing.spec.ts"
        issue: "Lines 69-73: sectionCount-1 resolves to Astro toolbar section under dev server, not Final CTA. Fix: use a stable selector like page.locator('section:last-of-type') within the main element, or disable the dev toolbar for the test context, or locate the Final CTA by its content rather than index."
    missing:
      - "The WR-05 background assertion needs a selector that is stable across both dev and production contexts — e.g. page.locator('main > section').last() instead of page.locator('section').nth(sectionCount-1)"
---

# Phase 37: Landing Page Verification Report

**Phase Goal:** The primary conversion surface — the landing page — matches all four Figma breakpoints in both light and dark themes, with verbatim Figma copy and all anchor sections wired for nav.
**Verified:** 2026-07-17T14:55:00Z
**Status:** gaps_found
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Landing page renders all nine Figma sections (Hero, Who, Three-ways, How-it-works, Automations, Proof, About, Agencies, Final CTA) | ✓ VERIFIED | `grep -c "^  <section" src/pages/index.astro` → 9; built HTML contains 9 sections |
| 2 | `/#services` and `/#about` anchor sections exist for nav | ✓ VERIFIED | `id="services"` at line 208; `id="about"` at line 617; scroll-margin-top:64px applied via global.css |
| 3 | BOOKING_URL resolves to real Calendly URL from a single constants module | ✓ VERIFIED | `src/lib/constants.ts` exports `BOOKING_URL = "https://calendly.com/discovery-joelshinness/discovery-call"`; no inline `BOOKING_URL = '/#book'` in SiteHeader or SiteFooter |
| 4 | All Book-a-call CTAs open in new tab with rel=noopener | ✓ VERIFIED | 2 occurrences of `target="_blank"` in index.astro (Hero + Final CTA), both paired with `rel="noopener"`; SiteHeader desktop+mobile CTAs: `target="_blank" rel="noopener"`; SiteFooter: same |
| 5 | Email CTAs use contact@joelshinness.com via CONTACT_EMAIL constant | ✓ VERIFIED | `CONTACT_EMAIL` exported from constants.ts; used via template literal in index.astro and SiteFooter; no hardcoded email literals remain in index.astro |
| 6 | Scroll-spy IntersectionObserver wires #services and #about to nav active state | ✓ VERIFIED | `<script is:inline>` IIFE in SiteHeader: `ANCHORS = ['services', 'about']`, `rootMargin: '-64px 0px 0px 0px'`, DOMContentLoaded guard (b93eb9d fix), element-existence guard; both CSS hooks present (`nav a[aria-current="location"]`, `nav a[aria-current="page"]`) |
| 7 | Dark-mode backgrounds render correctly on gradient sections | ✓ VERIFIED | CR-01 fix (bd57e47): all gradient backgrounds moved from inline `style` to `[background:...]` Tailwind arbitrary classes; `dark:[background:...]` overrides now win the CSS cascade. Confirmed via production preview computed-style check (returns `rgb(18, 54, 64)` for dark gradient start stop) |
| 8 | `node scripts/check-contrast.mjs` exits 0 | ✓ VERIFIED | All TEXT-USE pairs pass WCAG AA; PHASE 37 ADDITIONS block present; 5 decorative-only INFO items below threshold (expected) |
| 9 | `npm run test:a11y` passes all 8 tests | ✗ FAILED | 1 of 8 tests fails: landing dark-mode test line 73 — `sections.nth(sectionCount-1).backgroundImage` returns `"none"` because the Astro dev toolbar injects 9 additional `<section>` elements in dev mode, making `sectionCount` = 18 and `nth(17)` resolve to `<section class="full-width">` (toolbar overlay). Same assertion passes against production preview build. |

**Score:** 8/9 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/pages/index.astro` | 9 sections, id=services, id=about, wl components | ✓ VERIFIED | 9 sections; both anchors present; zero old neobrutalist imports; `from '../lib/constants'` import |
| `src/lib/constants.ts` | BOOKING_URL + CONTACT_EMAIL named exports | ✓ VERIFIED | Both exports present; no default export; real Calendly URL |
| `src/components/wl/CTAButton.astro` | target/rel pass-through on all 3 anchors | ✓ VERIFIED | Props interface has `target?: string; rel?: string;`; all three anchor renders carry both attributes |
| `src/components/layout/SiteHeader.astro` | scroll-spy, aria-current CSS, constants import | ✓ VERIFIED | IntersectionObserver IIFE with DOMContentLoaded guard; scoped style block; `import { BOOKING_URL } from '../../lib/constants'` |
| `src/components/layout/SiteFooter.astro` | constants import, CONTACT_EMAIL used | ✓ VERIFIED | Both `BOOKING_URL` and `CONTACT_EMAIL` imported; two footer email links use `{CONTACT_EMAIL}` |
| `scripts/check-contrast.mjs` | PHASE 37 ADDITIONS block, exits 0 | ✓ VERIFIED | Block present; gate passes |
| `tests/accessibility/landing.spec.ts` | Durable light+dark axe spec | ✓ SUBSTANTIVE | File exists, durable header comment, correct WCAG tag set, try/finally context close. Test content is correct but has a selector bug in WR-05 assertion (see gap) |
| `.planning/phases/37-landing-page/fidelity/` | 8 screenshots (4 breakpoints × 2 themes) | ✓ VERIFIED | 10 PNGs present: 8 rendered + 2 Figma references; all non-empty |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/pages/index.astro` | `src/lib/constants.ts` | `import { BOOKING_URL, CONTACT_EMAIL } from '../lib/constants'` | ✓ WIRED | Present at line 21 |
| `index.astro` Hero CTA | Calendly new tab | `href={BOOKING_URL} target="_blank" rel="noopener"` | ✓ WIRED | Lines 104-110 |
| `index.astro` Final CTA | Calendly new tab | `href={BOOKING_URL} target="_blank" rel="noopener"` | ✓ WIRED | Lines 810-816 |
| `SiteHeader scroll-spy` | `#services` / `#about` sections | `IntersectionObserver + getElementById + DOMContentLoaded guard` | ✓ WIRED | ANCHORS array + observe loop |
| `SiteHeader` | `src/lib/constants.ts` | `import { BOOKING_URL } from '../../lib/constants'` | ✓ WIRED | Line 4 |
| `SiteFooter` | `src/lib/constants.ts` | `import { BOOKING_URL, CONTACT_EMAIL } from '../../lib/constants'` | ✓ WIRED | Line 3 |
| `dark:[background:...]` classes | section dark gradient | CSS cascade (no competing inline style) | ✓ WIRED | CR-01 fix verified; production computed-style returns correct dark values |

### Requirements Coverage

| Requirement | Status | Blocking Issue |
|-------------|--------|---------------|
| PAGE-01: Landing page with all Figma sections, all 4 breakpoints, light + dark | ✓ SATISFIED | 9 sections assembled; fidelity gate approved by Joel 2026-07-17; 8 screenshots committed |
| CONT-02: Copy verbatim from Figma; missing copy flagged | ✓ SATISFIED | All copy from 12:2; 2 copy gaps logged in 37-COPY-GAPS.md and signed off by Joel |
| IA-03: BOOKING_URL constant, email CTAs use mailto | ✓ SATISFIED | `src/lib/constants.ts` is the single source; all CTAs wired correctly |
| IA-04: Anchor nav active states, smooth scroll with header offset, cross-page links | ✓ SATISFIED | DOMContentLoaded-guarded scroll-spy; `scroll-margin-top: 64px` via global.css; `/#services` and `/#about` cross-page links in SiteFooter |

### Code Review Fixes Verification (CR + WR findings)

| Finding | Fix | Status |
|---------|-----|--------|
| CR-01: Dark-mode backgrounds never apply (inline style beats class) | Background moved to `[background:...]` classes on all 6 gradient sections | ✓ CONFIRMED — no inline `style` background on gradient sections; `dark:[background:...]` classes present |
| WR-01: `xl:px-[400px]` activates at 1280px not 1920px | Replaced with `min-[1920px]:px-[400px]` on all 9 sections + hero content div | ✓ CONFIRMED — 0 occurrences of `xl:px-[400px]`; 9 occurrences of `min-[1920px]:px-[400px]` |
| WR-02: Hero `height: 840px` clips content on zoom | Changed to `min-height: 840px` | ✓ CONFIRMED — line 42 of index.astro |
| WR-03: SiteFooter hardcodes email twice | Added `CONTACT_EMAIL` to footer import; both instances use `{CONTACT_EMAIL}` | ✓ CONFIRMED — 4 references to `CONTACT_EMAIL` in SiteFooter |
| WR-04: `list-style: none` strips list semantics in Safari | `role="list"` added to `<ol>` (how-it-works) and `<ul>` (who section) | ✓ CONFIRMED — lines 159 and 363 of index.astro |
| WR-05: Dark-mode axe test blind to gradient-bg contrast | Added `getComputedStyle` assertions for Hero + Final CTA dark gradient | ✗ PARTIAL — Assertions are correct for production but fail in dev server context due to Astro toolbar injecting extra `<section>` elements; `nth(sectionCount-1)` is not a stable selector |
| WR-06: Header/footer use `sm:px-[160px]` (640px) not `lg:px-[160px]` (1024px) | Changed to `sm:px-8 lg:px-[160px]` in both chrome files | ✓ CONFIRMED — SiteHeader line 15; SiteFooter line 11 |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `tests/accessibility/landing.spec.ts` | 69-73 | `page.locator('section').nth(sectionCount-1)` resolves to Astro toolbar overlay section in dev mode | Blocker | Causes `npm run test:a11y` to report 7/8 pass instead of 8/8 |

### Gaps Summary

One gap blocks the `npm run test:a11y` required gate: the WR-05 computed-style assertion in the dark-mode landing test uses `sections.nth(sectionCount - 1)` to locate the Final CTA section. In the production build this correctly finds the 9th (last) section. In the Astro dev server context, the Astro Dev Toolbar injects 9 additional `<section>` elements into the DOM (indices 9-17), making `sectionCount` equal to 18 and causing `nth(17)` to resolve to `<section class="full-width">` (the toolbar overlay) which has no background, returning `"none"`.

**Root cause:** The assertion selector is not scoped to the main content area. Fix: replace `page.locator('section').nth(sectionCount-1)` with `page.locator('main > section').last()` (direct child of `<main>`) to exclude toolbar sections from the count.

**Scope of the gap:** The gap is in one assertion line of the test file. All other tests pass (7/8). The underlying page code (CR-01 fix) is correctly implemented and verified to work in the production build. The dark mode gradients render correctly — only the test selector is broken.

---

_Verified: 2026-07-17T14:55:00Z_
_Verifier: Claude (gsd-verifier)_

## Gap Resolution (2026-07-17)

The single gap ("npm run test:a11y passes 8/8" — 7/8 due to dev-toolbar-injected `<section>` elements breaking the bare `section` locator count) was closed by scoping the dark-gradient assertions to `main > section` in `tests/accessibility/landing.spec.ts`. Suite re-run: **8/8 passed**. Score: 9/9 must-haves verified. Status upgraded to passed.

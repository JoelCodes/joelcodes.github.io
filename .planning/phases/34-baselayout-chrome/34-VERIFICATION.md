---
phase: 34-baselayout-chrome
verified: 2026-07-15T21:45:46Z
status: passed
score: 8/8 must-haves verified
---

# Phase 34: BaseLayout Chrome Verification Report

**Phase Goal:** Every page in the site has the correct Wavelength header, footer, and dark-mode infrastructure — without FOUC or transition flash on load.
**Verified:** 2026-07-15T21:45:46Z
**Status:** passed
**Re-verification:** No — initial verification

---

## Must-Haves (Derived from PLAN Frontmatter + Amended Context)

The following must-haves were extracted from the per-plan `must_haves` frontmatter blocks in
34-01-PLAN through 34-06-PLAN, filtered through the amendments in 34-CONTEXT.md.

**Truths to verify:**

1. Dark-mode a11y spec drives dark mode via `prefers-color-scheme` (not a DOM toggle) — `colorScheme` Playwright context
2. FOUC script in BaseLayout `<head>` is system-only: clears stale localStorage.theme, adds `.dark` from `matchMedia`; tolerates storage-blocked browsers
3. SiteHeader.astro exists, is substantive, is imported by BaseLayout and renders site-wide
4. SiteFooter.astro exists, is substantive, is imported by BaseLayout and renders site-wide
5. Chrome token/utility layer in global.css: `--color-wl-on-ink` (light+dark), 7 `--wl-footer-*` locals (non-flipping `:root`), 6 `.wl-*` type utilities, `scroll-margin-top: 64px`
6. Blog prod-exclusion: `/blog` pages absent from prod HTML and sitemap; dev builds keep blog working; blog link gated to `isDev` in header and footer
7. `/faq` redirect to `/` in astro.config.mjs; `faq.astro` deleted (no redirect conflict)
8. Fidelity gate: `34-REVIEW.md` gate verdict APPROVED by Joel (2026-07-15); approved deviations D-02 and D-05 documented

---

## Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Dark-mode a11y spec uses `colorScheme` context, not DOM toggle | VERIFIED | `grep -c "theme-toggle" dark-mode.spec.ts` → 0; `grep -c "colorScheme"` → 5; `toHaveClass(/dark/)` assertion present |
| 2 | FOUC script is system-only, storage-error-safe | VERIFIED | `BaseLayout.astro` lines 63-74: `try { delete localStorage.theme; } catch(e) {}` then `matchMedia('prefers-color-scheme: dark')` runs outside the try/catch |
| 3 | SiteHeader.astro is live site-wide | VERIFIED | File exists at `src/components/layout/SiteHeader.astro` (73 lines), imported and used in `BaseLayout.astro` lines 3 and 77 |
| 4 | SiteFooter.astro is live site-wide | VERIFIED | File exists at `src/components/layout/SiteFooter.astro` (105 lines), imported and used in `BaseLayout.astro` lines 4 and 81 |
| 5 | Chrome tokens/utilities layer in global.css | VERIFIED | `--color-wl-on-ink` at lines 34 and 57 (count=4 incl. comments); 7 `--wl-footer-*` tokens at lines 66-76; 6 `.wl-*` utilities at lines 749-820+; `scroll-margin-top: 64px` at line 174 |
| 6 | Blog prod-excluded; link is dev-only | VERIFIED | `getStaticPaths` returns `[]` in PROD for `[slug].astro` and `[tag].astro`; `blog/index.astro` redirects to `/` in PROD; `isDev` gates in both SiteHeader and SiteFooter; sitemap `filter` excludes `/blog` |
| 7 | `/faq` redirect shipped; `faq.astro` deleted | VERIFIED | `'/faq': '/'` in `astro.config.mjs` redirects map; `src/pages/faq.astro` does not exist |
| 8 | Fidelity gate approved by Joel | VERIFIED | `34-REVIEW.md` front-matter: `status: APPROVED`, `approved: 2026-07-15`; all GC items resolved or accepted |

**Score:** 8/8 truths verified

---

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `tests/accessibility/dark-mode.spec.ts` | colorScheme-driven, no toggle refs | VERIFIED | 0 `theme-toggle` refs, 5 `colorScheme` occurrences, `toHaveClass(/dark/)` assertion present, no `/blog` route tests |
| `src/layouts/BaseLayout.astro` | FOUC script + SiteHeader/SiteFooter wired | VERIFIED | 84 lines; `is:inline` script in `<head>`; SiteHeader at line 77, SiteFooter at line 81 |
| `src/components/layout/SiteHeader.astro` | Wavelength header, 64px, wl-* tokens | VERIFIED | 73 lines; sticky h-16 (64px) header; wl-sea-glass bg; WaveMark (bare + badge); wordmark hidden at mobile; desktop nav (Services/Showcase/About/CTA); mobile nav (Showcase/CTA); `isDev` Blog gate |
| `src/components/layout/SiteFooter.astro` | Always-dark footer, Figma-correct | VERIFIED | 105 lines; `--wl-footer-bg` background; badge WaveMark; Fraunces italic tagline; supporting line; 5 foot-links; divider; copyright LEFT / `contact@joelshinness.com · GitHub` RIGHT |
| `src/components/WaveMark.astro` | badge prop for dark surfaces | VERIFIED | `badge` boolean prop renders circle-badge SVG (`#EAF6F3` disc, `#12333B` strokes); bare-stroke variant for light surfaces |
| `src/styles/global.css` | Chrome token+utility layer | VERIFIED | `--color-wl-on-ink` in `@theme` (line 34) and `.dark` (line 57); 7 `--wl-footer-*` in non-flipping `:root` block; 6 `.wl-*` type utilities; `scroll-margin-top: 64px` at line 174 |
| `astro.config.mjs` | `/faq` redirect + blog sitemap filter | VERIFIED | `'/faq': '/'` in redirects; `filter: (page) => !page.includes('/blog')` in sitemap integration |
| `src/pages/blog/*.astro` | Prod-gated | VERIFIED | `[slug].astro` and `tags/[tag].astro` return `[]` from `getStaticPaths` in PROD; `index.astro` calls `Astro.redirect('/')` in PROD |
| `.planning/phases/34-baselayout-chrome/34-REVIEW.md` | Fidelity gate record + Joel sign-off | VERIFIED | 181 lines; APPROVED status; all 5 comparison rows; approved deviations D-02 and D-05; GC-01/02/03 resolved |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `BaseLayout.astro` | `SiteHeader.astro` | `import` + `<SiteHeader />` | WIRED | Line 3 import, line 77 usage |
| `BaseLayout.astro` | `SiteFooter.astro` | `import` + `<SiteFooter />` | WIRED | Line 4 import, line 81 usage |
| `SiteHeader.astro` | `WaveMark.astro` | `import` + bare+badge props | WIRED | `dark:hidden` bare mark + `hidden dark:block` badge mark |
| `SiteFooter.astro` | `WaveMark.astro` | `import` + `badge` prop | WIRED | Always-badge for always-dark footer surface |
| `FOUC script` | `html.dark class` | `matchMedia` → `classList.add('dark')` | WIRED | `is:inline` script runs before `<body>`; `try/catch` isolates localStorage errors; `matchMedia` runs unconditionally |
| `SiteHeader isDev gate` | Blog link | `import.meta.env.DEV` conditional | WIRED | `{isDev && <a href="/blog">Blog</a>}` in both desktop nav and footer nav |
| `blog/[slug].astro getStaticPaths` | Prod exclusion | `if (import.meta.env.PROD) return []` | WIRED | First statement in `getStaticPaths` |
| `astro.config.mjs sitemap filter` | Blog absent from sitemap | `!page.includes('/blog')` | WIRED | Both gates required per plan; both present |
| `astro.config.mjs redirects` | `/faq` → `/` | `'/faq': '/'` entry | WIRED | `faq.astro` deleted to avoid conflict (RESEARCH Pitfall 6) |
| `footer focus outline` | WCAG 1.4.11 contrast | `--wl-footer-wordmark-color` (#EAF6F3 on #0D2A31) | WIRED | WR-01 fixed: `outline-[var(--wl-footer-wordmark-color)]` — ratio ~13.6:1, well above 3:1 minimum |

---

## Requirements Coverage

All four CHROME requirements are mapped to Phase 34 in REQUIREMENTS.md.

| Requirement | Amended Scope | Status | Evidence |
|-------------|--------------|--------|----------|
| CHROME-01: BaseLayout dark-mode infrastructure | Theme toggle clause DEFERRED (D-05); system-only `prefers-color-scheme`; FOUC-safe `is:inline` script | SATISFIED | FOUC script in BaseLayout `<head>`; `dark-mode.spec.ts` uses `colorScheme` context; 7/7 a11y tests green |
| CHROME-02: Site Header per Figma | Blog link dev-only (D-11/D-13); mark-only mobile (D-02) | SATISFIED | `SiteHeader.astro`: wl-sea-glass bg, WaveMark, wordmark, Services/Showcase/About/CTA desktop nav, Showcase/CTA mobile nav, `isDev` Blog gate |
| CHROME-03: Site Footer per Figma | Blog link dev-only; email `contact@joelshinness.com`; copyright `© {year} Joel Shinness`; GitHub link | SATISFIED | `SiteFooter.astro`: correct tagline, supporting line, 5 foot-links, divider, copyright left / email·GitHub right, dynamic year |
| CHROME-04: Mobile navigation matches Figma mobile header | No hamburger (D-01); literal mobile bar: mark + Showcase + Book a call; keyboard accessible | SATISFIED | Mobile `<nav class="flex sm:hidden">` with Showcase + CTA; `focus-visible` outlines; `aria-label="Primary navigation"` |

**Note on CHROME-04:** The amended criterion (D-01) removes "opens/closes" requirement — the mobile bar is literal Figma, no overlay. The implementation matches. The `aria-label` on both nav landmarks distinguishes them for AT.

**Note on CHROME-01 toggle deferral:** The REQUIREMENTS.md still says "theme toggle usable in both header states" but 34-CONTEXT.md explicitly amends this away for Phase 34. The toggle clause carries to a future phase. CHROME-01 is satisfied for what was scoped.

**Adjacent requirements touched but not owned by Phase 34:**

| Requirement | Phase | Phase 34 contribution | Status |
|-------------|-------|-----------------------|--------|
| IA-01: `/faq` → `/` redirect | Phase 40 (full); Phase 34 (partial) | `/faq` redirect shipped; `/projects` deferred per D-03 | Partial — expected |

---

## Anti-Patterns Found

Per the code review (34-REVIEW-CODE.md), all critical and assigned-to-this-phase warnings were resolved in commit `294ba0a`. The remaining items are pre-existing old-design debt explicitly deferred:

| Issue | Severity | Resolution | Files |
|-------|----------|------------|-------|
| CR-01: BOOKING_URL bare `#book` fragment | Critical | Fixed in `294ba0a` — `'/#book'` root-relative in both SiteHeader and SiteFooter | Closed |
| WR-01: Footer focus outline contrast 2.6:1 | Warning | Fixed in `294ba0a` — `outline-[var(--wl-footer-wordmark-color)]` (13.6:1) | Closed |
| WR-02: FOUC script storage-error abort | Warning | Fixed in `294ba0a` — `try/catch` wraps only localStorage; `matchMedia` runs unconditionally | Closed |
| WR-04: Wrong comment about test webServer target | Warning | Fixed in `294ba0a` — comment corrected in `dark-mode.spec.ts` | Closed |
| WR-05: axe-tests hits `/about` (never existed) | Warning (pre-existing) | Deferred to Phase 41 — old design debt | Accepted |
| WR-06: Blog pagination dead code | Warning (pre-existing) | Deferred to Phase 38 blog restyle | Accepted |
| WR-07: `--color-accent-teal` undefined | Warning (pre-existing) | Deferred to Phase 41 cleanup | Accepted |
| WR-08: `font-body` on BaseLayout `<body>` | Warning (pre-existing) | Deferred to Phase 41 — old-page compat intentional during migration | Accepted |

No blocker anti-patterns remain in Phase 34 scope.

**One minor residual note (non-blocking):** The FOUC script uses `delete localStorage.theme` rather than `localStorage.removeItem('theme')` (the WR-02 fix recommendation used `removeItem` in the suggested snippet). The actual fix addressed the root cause (the try/catch now isolates the storage block so `matchMedia` always runs). The `delete` vs `removeItem` distinction is advisory and does not affect correctness — `delete` on a storage property falls back to standard object deletion which browsers handle. Not a gap.

---

## Fidelity Gate Status

`34-REVIEW.md` records Joel's gate decision:

- **Gate verdict:** APPROVED (2026-07-15)
- **Comparison rows:** 5 (header desktop light, header mobile light, header desktop dark, footer desktop light, footer desktop dark)
- **Gate items resolved:** GC-01 (circle-badge dark header), GC-02 (circle-badge footer), GC-03 (footer height delta ~12px accepted)
- **Approved deviations documented:** D-02 (mark-only mobile wordmark) and D-05 (no toggle — matches Figma exactly)

---

## Human Verification Required

None blocking phase closure. The fidelity gate (the only human-required check for this phase) was completed and approved by Joel on 2026-07-15.

Items that would benefit from spot-checking at next dev session (non-blocking, no gaps):

- Confirm `/#book` CTA resolves correctly once Phase 37 adds the anchor (pre-emptive, not a Phase 34 gap)
- Confirm `/projects` → `/showcase` redirect when Phase 40 ships (tracked deferred)
- The dark `--color-wl-on-ink: #12333B` assumption was flagged for Figma dark-variable confirmation; the fidelity gate visual comparison accepted the output without reopening this, so it is closed for Phase 34

---

## Gaps Summary

None. All 8 truths verified. All 9 required artifacts pass existence, substantive, and wiring checks. All 4 CHROME requirements are satisfied within their amended scope. The fidelity gate is approved. Post-execution code review findings CR-01/WR-01/WR-02/WR-04 were fixed before phase close; WR-05/06/07/08 are pre-existing old-design debt accepted as known and deferred to Phases 38 and 41.

Phase 34 goal achieved: every page in the site carries the correct Wavelength header, footer, and system-only dark-mode infrastructure without FOUC.

---

*Verified: 2026-07-15T21:45:46Z*
*Verifier: Claude (gsd-verifier)*

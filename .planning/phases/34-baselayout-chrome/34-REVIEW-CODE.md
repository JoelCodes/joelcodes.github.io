---
phase: 34-baselayout-chrome
reviewed: 2026-07-15T21:40:19Z
depth: standard
files_reviewed: 12
files_reviewed_list:
  - src/components/WaveMark.astro
  - src/components/layout/SiteFooter.astro
  - src/components/layout/SiteHeader.astro
  - src/layouts/BaseLayout.astro
  - src/pages/blog/[slug].astro
  - src/pages/blog/index.astro
  - src/pages/blog/tags/[tag].astro
  - src/styles/global.css
  - tests/accessibility/dark-mode.spec.ts
  - tests/accessibility/axe-tests.spec.ts
  - tests/accessibility/helpers.ts
  - astro.config.mjs
findings:
  critical: 1
  warning: 8
  info: 6
  total: 15
status: issues_found
---

# Phase 34: Code Review Report (BaseLayout Chrome)

**Reviewed:** 2026-07-15T21:40:19Z
**Depth:** standard
**Files Reviewed:** 12
**Status:** issues_found

## Narrative Findings (AI reviewer)

## Summary

Reviewed the new Wavelength chrome (SiteHeader, SiteFooter, WaveMark), the BaseLayout swap + FOUC simplification, the blog PROD gating, sitemap/redirect config, and the accessibility test suite. The new chrome components are token-clean (wl-* only, no old neobrutalist tokens inside SiteHeader/SiteFooter/WaveMark) and zero-client-JS as designed.

Key concerns: (1) every primary nav target in the new chrome is currently dead — `/showcase` 404s, `/#services` and `/#about` have no matching ids on the current homepage, and the `Book a call` CTA uses a bare `#book` fragment that will never work from non-home pages even after Phase 37; (2) the footer's focus-visible outline fails WCAG 1.4.11 non-text contrast in light system mode; (3) the test suite contains a factually wrong premise (tests run against `npm run dev`, not a prod build) that drove a coverage-removal decision, plus a test against a route (`/about`) that has never existed.

## Critical Issues

### CR-01: All primary navigation targets in the new chrome are dead; CTA fragment is wrong even for its future target

**File:** `src/components/layout/SiteHeader.astro:3,31,35,39,51,60,65` and `src/components/layout/SiteFooter.astro:5,41,46,51,56`
**Issue:** As of this phase, every non-brand link in the new chrome points at nothing:
- `/showcase` — no `src/pages/showcase.astro` (or directory) exists; header and footer links 404.
- `/#services` and `/#about` — the current `src/pages/index.astro` contains no `id="services"` or `id="about"` (verified by grep); links silently no-op.
- `BOOKING_URL = '#book'` — no `id="book"` exists anywhere. Worse, the bare fragment is a latent bug independent of phasing: `href="#book"` resolves against the *current* page, so even after Phase 37 adds a booking target on the homepage, "Book a call" clicked from `/showcase`, `/projects`, or any blog page will still do nothing. The primary conversion CTA is a no-op site-wide.

If this branch merges to `main` before Phases 35–37 land, the deployed site ships with fully broken primary navigation.
**Fix:**
```js
// SiteHeader.astro / SiteFooter.astro — root-relative fragment works from every page
const BOOKING_URL = '/#book'; // still swap for Calendly in Phase 37
```
Additionally: record a hard ship-gate that this branch must not merge before `/showcase` and the homepage `#services`/`#about`/`#book` anchors exist, or temporarily point Showcase at `/projects`.

## Warnings

### WR-01: Footer focus indicator fails WCAG 1.4.11 non-text contrast in light mode

**File:** `src/components/layout/SiteFooter.astro:24,42,47,52,57,62,68,89,97`
**Issue:** All footer links use `focus-visible:outline-wl-accent`. The footer background is always-dark `#0D2A31` (does not flip), but `--color-wl-accent` is `#0E7078` when the OS is in light mode. Computed contrast of `#0E7078` on `#0D2A31` is ~2.6:1 — below the 3:1 non-text contrast minimum for focus indicators. (In dark mode the accent flips to `#4FB3B8`, which passes.) Axe cannot detect this (focus styles aren't sampled), so the Playwright suite will not catch it.
**Fix:** Use a footer-local outline color that does not flip, e.g. add `--wl-footer-focus: #4FB3B8;` (ratio ~7:1 on `#0D2A31`) to the `:root` footer block in `global.css` and apply `style="outline-color: var(--wl-footer-focus)"` (or a small utility) instead of `outline-wl-accent` inside the footer.

### WR-02: FOUC script has no error handling — storage-blocked browsers lose dark mode entirely

**File:** `src/layouts/BaseLayout.astro:63-70`
**Issue:** `'theme' in localStorage` throws `SecurityError` in browsers where storage is blocked (e.g. Chrome "Block all cookies", some embedded webviews). Because the `matchMedia` dark-class line runs *after* the localStorage access, the exception aborts the whole script and dark-scheme users get a light page with no dark class at all. Also, `delete localStorage.theme` works but is nonstandard; `removeItem` is the defined API.
**Fix:**
```html
<script is:inline>
  try { localStorage.removeItem('theme'); } catch (e) {}
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  }
</script>
```

### WR-03: Nested `<main>` landmarks on blog index and tag pages

**File:** `src/pages/blog/index.astro:35` and `src/pages/blog/tags/[tag].astro:43`
**Issue:** `BaseLayout.astro:74` wraps the slot in `<main class="flex-grow">`. Both blog pages render their own `<main>` inside that slot, producing nested `<main>` elements — invalid HTML (a `main` must not be a descendant of another `main`) and duplicate main landmarks for AT. The axe suite hits `/blog` in dev but won't fail because `landmark-no-duplicate-main` is a best-practice rule, not in the wcag-tag set used.
**Fix:** Change the page-level `<main>` to `<div>` (or a `<section>` with a heading) in both files; the layout owns the `main` landmark.

### WR-04: Test suite premise is factually wrong — coverage removed based on it, and remaining coverage is inconsistent

**File:** `tests/accessibility/dark-mode.spec.ts:52-53`, `tests/accessibility/axe-tests.spec.ts:39-50`, `playwright.config.ts`
**Issue:** The comment says "Blog test removed: /blog returns 404 in prod; test suite runs against prod build." Both claims are false: (1) `playwright.config.ts` `webServer` runs `npm run dev`, so the suite always executes against the dev server where blog pages exist; (2) in prod, `/blog` is not a 404 — `blog/index.astro` emits an `Astro.redirect('/')` meta-refresh stub. Meanwhile `axe-tests.spec.ts` still tests `/blog` (light mode) — so blog has light-mode axe coverage but its dark-mode coverage was deleted on a wrong premise. Blog dark-mode contrast regressions (a real risk given old tokens remain until Phase 41) are now untested.
**Fix:** Restore the blog dark-mode test (it runs against dev where `/blog` exists) and correct the comment, or if blog coverage is intentionally dropped, also remove the `/blog` test from `axe-tests.spec.ts` so the two specs agree — and fix the comment either way.

### WR-05: Axe test targets `/about`, a route that has never existed

**File:** `tests/accessibility/axe-tests.spec.ts:52-63`
**Issue:** There is no `src/pages/about.astro` (git history confirms it never existed on this branch). `page.goto('/about')` loads the Astro dev-server 404 page; `goto` does not throw on 404 status, so axe analyzes the framework's 404 UI. The test provides zero coverage of project code and its pass/fail state depends on Astro's internal 404 markup — a flaky, misleading assertion.
**Fix:** Delete the test, or repoint it at a real route (`/projects`, `/thank-you`), or assert `response.status() === 200` first so a missing route fails loudly:
```ts
const response = await page.goto('/about');
expect(response?.status()).toBe(200);
```

### WR-06: Blog index "Load More" pagination is entirely non-functional

**File:** `src/pages/blog/index.astro:100-179`
**Issue:** Two compounding logic bugs: (1) `filterSelection()` adds `.show` to every matching card regardless of `visiblePosts` — the counter is never used to limit rendered cards, so all posts always display; (2) `loadMorePosts()` increments `visiblePosts` then calls `filterSelection()`, which immediately resets `visiblePosts = INITIAL_POSTS` (line 123), so the counter can never advance and `updateLoadMoreVisibility()` never hides the button. Latent today (only 2 posts exist; the button renders at >9), but the feature is dead code that will misbehave the moment a 10th post is published.
**Fix:** In `filterSelection`, only add `.show` to the first `visiblePosts` matching cards; in `loadMorePosts`, apply visibility without resetting the counter (extract an `applyVisibility()` that does not touch `visiblePosts`).

### WR-07: `--color-accent-teal` / `--color-accent-teal-hover` referenced but never defined

**File:** `src/styles/global.css:380,475,480,488`
**Issue:** `.toc a:hover/.active`, `.prose a`, `.prose a:hover`, and `.prose blockquote` reference `var(--color-accent-teal)` / `var(--color-accent-teal-hover)`, but no `--color-accent-teal*` token is defined anywhere in the file (only `--color-turquoise*` exists). The declarations are invalid at computed-value time: TOC hover/active states and prose link colors silently fall back to inherited text color, and the blockquote border falls back to `currentColor`. Blog-only (dev-gated), but it means TOC active-state highlighting and prose link coloring are broken right now.
**Fix:** Either define aliases in the old-token `@theme` block (`--color-accent-teal: var(--color-turquoise); --color-accent-teal-hover: var(--color-turquoise-hover);`) or replace the references with the existing turquoise tokens.

### WR-08: `font-body` on BaseLayout `<body>` makes the D-08 Wavelength body-font default unreachable on every page

**File:** `src/layouts/BaseLayout.astro:72` (interacts with `src/styles/global.css:153-160`)
**Issue:** `global.css` sets `body { font-family: var(--font-wl-body) }` in `@layer base` as the D-08 Wavelength default, with a comment claiming "old pages unaffected" because the `font-body` utility wins. But `font-body` (DM Sans) sits on the shared `BaseLayout` body, so the utility wins on *every* page — the base rule is dead code site-wide, not just on old pages. The new chrome is unaffected only because every text node carries an explicit `wl-*` utility; any Phase 35+ content that relies on the documented body default will silently render in DM Sans. The body also carries old `bg-bg-light`/`text-text-light` tokens on the layout that hosts the new chrome.
**Fix:** Remove `font-body` from the BaseLayout body now (old pages that need DM Sans should opt in locally), or at minimum correct the misleading comment and add a tracked task so Phase 35 page work doesn't build on a default that never applies.

## Info

### IN-01: Dead PROD ternaries and unreachable empty state after PROD gating

**File:** `src/pages/blog/[slug].astro:10`, `src/pages/blog/tags/[tag].astro:10,82-94`, `src/pages/blog/index.astro:14`
**Issue:** After `if (import.meta.env.PROD) return []` / the index redirect, the `import.meta.env.PROD ? !data.draft : true` filters can only ever evaluate the `true` branch — the draft-filtering intent is now dead, meaning drafts would leak if the PROD gate is ever removed without restoring the filter. The tag-page empty state (lines 82-94) is also unreachable since `getStaticPaths` only emits tags with ≥1 post.
**Fix:** Simplify filters to `() => true` with a comment noting draft filtering must return when the D-13 gate is lifted, or leave the draft filter and drop the early-return duplication.

### IN-02: Sitemap filter uses broad substring match; `lastmod` stamps every page on every build

**File:** `astro.config.mjs:99,102`
**Issue:** `!page.includes('/blog')` would also exclude any future route containing that substring (e.g. `/blogroll`). `lastmod: new Date()` marks all pages modified at each build, which defeats the purpose of lastmod for crawlers.
**Fix:** `filter: (page) => !new URL(page).pathname.startsWith('/blog')`; consider dropping the global `lastmod`.

### IN-03: WaveMark badge duplicates token values as hardcoded hex

**File:** `src/components/WaveMark.astro:33-37`
**Issue:** Badge fill `#EAF6F3` and stroke `#12333B` are hardcoded while comments claim correspondence to `--wl-footer-wordmark-color` / ink; a future token change will silently desync the mark. Also the line-17 comment says "Badge circle = full 30px box" but the viewBox is 104 units.
**Fix:** Use `fill="var(--wl-footer-wordmark-color)"` / `stroke="var(--color-wl-ink-static, #12333B)"` or add a comment that these are intentionally frozen brand constants; fix the 30px/104-unit comment.

### IN-04: Blog tag values with spaces flow unencoded into URLs

**File:** `src/pages/blog/[slug].astro:72`, `src/pages/blog/tags/[tag].astro:16-17`
**Issue:** Content contains tags like `"Career pivot"` and `"AI and automation"`. `href={\`/blog/tags/${tag}\`}` emits raw spaces, relying on browser percent-encoding to round-trip to Astro's space-containing static paths. Works in dev today but is fragile across hosts and produces ugly `%20` URLs.
**Fix:** Slugify tags for params/hrefs (`tag.toLowerCase().replace(/\s+/g, '-')`) and keep the display string separate, or `encodeURIComponent(tag)` in hrefs at minimum.

### IN-05: `BOOKING_URL` constant duplicated across header and footer

**File:** `src/components/layout/SiteHeader.astro:3`, `src/components/layout/SiteFooter.astro:5`
**Issue:** The same TODO constant is declared in two files; Phase 37 must remember to update both or the header and footer CTAs will diverge.
**Fix:** Hoist to a shared module, e.g. `src/data/site.ts` exporting `BOOKING_URL`.

### IN-06: Old chrome components are now orphaned

**File:** `src/components/layout/Header.astro`, `src/components/layout/Footer.astro`, `src/components/layout/MobileNav.astro`
**Issue:** After the BaseLayout swap, nothing imports the old Header/Footer (MobileNav is referenced only by the orphaned Header). Retention until Phase 41 appears intentional, but they contain the only remaining dark-mode-toggle code paths (whose `localStorage.theme` the new FOUC script now actively deletes).
**Fix:** Confirm these are listed in the Phase 41 cleanup manifest so they are deleted rather than rediscovered.

---

_Reviewed: 2026-07-15T21:40:19Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_

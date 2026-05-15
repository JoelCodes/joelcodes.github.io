---
phase: 23-design-system-foundation
reviewed: 2026-05-14T00:00:00Z
depth: standard
files_reviewed: 8
files_reviewed_list:
  - src/styles/v2/global.css
  - src/layouts/v2/BaseLayout.astro
  - src/components/v2/layout/Header.astro
  - src/components/v2/layout/Footer.astro
  - src/components/v2/layout/MobileNav.astro
  - src/pages/v2-smoke.astro
  - tests/check-token-collision.cjs
  - tests/accessibility/v2-layout.spec.ts
findings:
  critical: 0
  warning: 6
  info: 5
  total: 11
status: issues_found
---

# Phase 23: Code Review Report

**Reviewed:** 2026-05-14
**Depth:** standard
**Files Reviewed:** 8
**Status:** issues_found

## Summary

Phase 23 lays the v2 design-system foundation: token sheet, light-mode-only BaseLayout, fresh Header/Footer/MobileNav, a throwaway smoke page, and two test artefacts (a Node collision guard plus a Playwright/axe spec). The three stated invariants verify cleanly:

- **D-08 (no token collisions):** `node tests/check-token-collision.cjs` reports `OK ... 45 v1 names, 33 v2 names`.
- **FOUND-05 (no dark-mode artefacts in v2):** zero matches for `dark|localStorage|theme-toggle|prefers-color-scheme|@custom-variant` across all v2 files.
- **FOUND-06 (v1 surfaces byte-identical):** `git diff --quiet HEAD -- src/styles/global.css src/layouts/BaseLayout.astro src/components/layout/` returns 0.

No BLOCKER-class defects were found. The MobileNav script is sound and the focus-trap is implemented correctly for the happy paths the spec exercises. The findings below are robustness, accessibility-edge-case, and dead-code concerns — most should be addressed before v2 expands beyond the smoke page in Phase 24+.

## Critical Issues

None.

## Warnings

### WR-01: MobileNav overlay does not close on in-page anchor clicks

**File:** `src/components/v2/layout/MobileNav.astro:99-108`
**Issue:** The script attaches click handlers to `toggle`, `closeBtn`, and `overlay` (backdrop only — line 107 `e.target === overlay` excludes children). There is no click handler on the nav `<a>` elements inside the overlay. When the user taps a link, two cases:

1. Cross-page links (`/blog`, `/projects`, `/faq`): browser navigates → fresh page load → overlay state reset. OK.
2. **Same-page anchor `/#contact` from a v2 page**: browser scrolls to `#contact` but the overlay remains visible (full-viewport `fixed inset-0 z-50 bg-surface`) and `document.body.style.overflow = 'hidden'` stays applied — the user sees the still-open overlay covering everything and cannot scroll the body.

For Phase 23 the only v2 page is `/v2-smoke`, which has no `#contact` target, and `/#contact` redirects to v1 `/`. So this is latent — but it ships into Phase 24+ unchanged unless fixed now.

**Fix:** Attach a delegated click handler that closes the overlay before the link fires:
```ts
overlay?.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((a) => {
  a.addEventListener('click', () => close());
});
```
Or simpler/safer with event delegation:
```ts
overlay?.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target === overlay) { close(); return; }
  if (target.closest('a[href]')) close();
});
```

### WR-02: MobileNav overlay can remain visible after viewport resize to ≥md

**File:** `src/components/v2/layout/MobileNav.astro:28-67, 99-108`
**Issue:** The hamburger toggle is `md:hidden`, but the overlay container has no responsive visibility class — only its `hidden` attribute, toggled by JS. If the user opens the overlay on mobile, then resizes (or rotates a tablet) past the `md` breakpoint, the toggle disappears but the overlay stays open with `position:fixed inset-0 z-50`, covering the entire desktop view. The user has no visible affordance to close it (the X button is still there, but the desktop layout looks broken until they find it).

**Fix:** Either add a `matchMedia` resize listener that calls `close()` when crossing into desktop, or render the overlay container with `md:hidden`:
```ts
const mq = window.matchMedia('(min-width: 768px)');
mq.addEventListener('change', (e) => { if (e.matches) close(); });
```

### WR-03: No visible focus styles defined for v2 interactive elements

**File:** `src/components/v2/layout/Header.astro:21-46`, `src/components/v2/layout/Footer.astro:15-34`, `src/components/v2/layout/MobileNav.astro:17-66`
**Issue:** No `:focus-visible` or `focus:` utility is applied to any v2 link or button. The components rely on the user-agent default focus ring, which (a) varies between browsers, (b) can be near-invisible against `bg-accent` (green CTA) for low-vision keyboard users, and (c) is not part of the verified token system. axe-core does not catch missing-focus-style by default, so `tests/accessibility/v2-layout.spec.ts` will not flag this — yet WCAG 2.4.7 (AA) requires a visible focus indicator.

**Fix:** Add a focus utility to interactive elements, e.g.:
```html
class="... focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
```
Or define a global rule in `src/styles/v2/global.css`:
```css
a:focus-visible, button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### WR-04: Toggle button `aria-label` never reflects expanded state

**File:** `src/components/v2/layout/MobileNav.astro:17-26`
**Issue:** The hamburger button has a static `aria-label="Open navigation menu"`. When the overlay is open, the button itself is hidden under the `z-50` overlay, but screen-reader users navigating by landmarks/buttons may still encounter it and hear "Open navigation menu" while it is in fact toggled to close. `aria-expanded` is updated correctly, but the label is contradictory.

**Fix:** Update the label in `open()` / `close()`:
```ts
toggle.setAttribute('aria-label', 'Close navigation menu'); // in open()
toggle.setAttribute('aria-label', 'Open navigation menu');  // in close()
```
Alternatively, swap the icon as well so the visual matches.

### WR-05: No skip-to-main-content link in v2 BaseLayout

**File:** `src/layouts/v2/BaseLayout.astro:31-35`
**Issue:** `<body>` opens with `<Header />` followed by `<main>`. Keyboard users must tab through every header link (logo + 4 nav links + CTA = 6 stops) on every page before reaching content. WCAG 2.4.1 (Level A) requires a bypass mechanism. v1's BaseLayout has the same gap (so this is parity, not a regression), but Phase 23 is the right moment to fix it since v2 is fresh ground.

**Fix:** Add a skip link as the first body child:
```astro
<a href="#main"
   class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:text-surface focus:px-4 focus:py-2 focus:rounded-md">
  Skip to main content
</a>
<Header />
<main id="main" class="flex-grow"><slot /></main>
```

### WR-06: `isActive('/', '')` returns false when path is the site root

**File:** `src/components/v2/layout/Header.astro:11-16`, `src/components/v2/layout/MobileNav.astro:9-14`
**Issue:** `Astro.url.pathname.replace(/\/$/, '')` collapses `/` to `''`. The current link list does not include `/` (Home), so the bug is latent — but the moment a v2 home link is added in Phase 24+, it will never display as active on the homepage. The active-link logic should normalise consistently on both sides of the comparison.

**Fix:** Either keep the trailing slash on both sides, or treat the root as a special case:
```ts
const path = Astro.url.pathname === '/' ? '/' : Astro.url.pathname.replace(/\/$/, '');
function isActive(href: string, current: string): boolean {
  if (href.startsWith('/#')) return false;
  if (href === '/') return current === '/';
  return current === href || current.startsWith(href + '/');
}
```

## Info

### IN-01: Many v2 design tokens are defined but unused in Phase 23 components

**File:** `src/styles/v2/global.css:11-68`
**Issue:** The token sheet declares 33 names. Phase 23 components (Header/Footer/MobileNav/v2-smoke) consume only a subset: `--color-surface`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-border`, `--font-display`, `--font-text`, and `--text-h1`/`--text-body` (smoke page only). Untouched in Phase 23: `--color-primary`, `--color-primary-hover`, `--color-surface-muted`, `--space-{xs,sm,md,lg,xl,2xl}`, `--radius-{sm,lg,full}`, `--text-{display,h2,h3,h4,small,caption}`, `--font-weight-{display,text,text-bold}`, `--leading-{display,text}`. This is expected — these tokens are intentionally the design API for Phases 24+ — but worth tracking so Wave 1+ phases explicitly reference and exercise them, and so unused tokens are not silently pruned later.

**Fix:** No code change required for Phase 23. Add a verification step in Phase 24+ planning that every v2 token has at least one downstream consumer before milestone close, or accept some intentionally as "available primitives."

### IN-02: Tailwind defaults are used in place of v2 font-weight / spacing tokens

**File:** `src/components/v2/layout/Header.astro:23,34,43`, `Footer.astro:10,39,49,50`, `MobileNav.astro:52,62`, `v2-smoke.astro:7`
**Issue:** Components use `font-bold` (Tailwind 700), `font-semibold` (600), `font-medium` (500) — yet the v2 sheet defines `--font-weight-display: 700`, `--font-weight-text: 400`, `--font-weight-text-bold: 500`. The component utilities do not reference the v2 weight tokens. Same pattern for spacing: components use `gap-4`, `gap-6`, `px-4`, `py-12`, `py-16` — none of which map to `--space-{xs..2xl}`. This is not wrong per se (Tailwind defaults are well-defined), but it means the v2 token system is *not* the source of truth for component styling — the Tailwind defaults are.

**Fix:** Either (a) document this as intentional ("v2 tokens cover semantic colors + display sizes; everything else inherits Tailwind defaults"), or (b) align tokens with utilities and replace ad-hoc utilities with token-bound classes. Resolve before Phase 24 if v2 components claim to be "token-driven."

### IN-03: `eslint-disable` blanket at top of token-collision test

**File:** `tests/check-token-collision.cjs:1`
**Issue:** `/* eslint-disable */` disables every rule for the entire file. The file is short (65 lines) and the only plausible reason is the CommonJS `require()` style in a project with `"type": "module"`. A narrower disable comment is clearer:

**Fix:**
```js
/* eslint-disable @typescript-eslint/no-var-requires, no-undef */
```
or scope per-line if even more specific.

### IN-04: Smoke-page deletion contract is documented in a comment, not enforced

**File:** `src/pages/v2-smoke.astro:2`
**Issue:** `// @phase-23-smoke-page — DELETE in Phase 25 when /faq migrates to BaseLayoutV2.` is the only signal that this file is throwaway. If Phase 25 is delayed or split, this page may ship to production indefinitely. The smoke page exposes a `<h1>v2 Layout Smoke Test</h1>` which would appear in the auto-generated sitemap (via `@astrojs/sitemap` integration) and could be indexed.

**Fix:** Either (a) exclude `/v2-smoke` from the sitemap and add `noindex` in the page's SEO frontmatter, or (b) gate the route on `import.meta.env.DEV` so it never builds for production. Lowest-effort fix:
```astro
---
import BaseLayout from '../layouts/v2/BaseLayout.astro';
---
<BaseLayout title="v2 Smoke Test"
            description="...">
  <slot name="head" slot="head">
    <meta name="robots" content="noindex,nofollow" />
  </slot>
  ...
```

### IN-05: Inter variable font is imported but never `<link rel="preload">`'d

**File:** `src/layouts/v2/BaseLayout.astro:3,25`, `src/styles/v2/global.css:3`
**Issue:** Only Plus Jakarta Sans is preloaded (line 25). Inter is imported via `@fontsource-variable/inter/wght.css` (line 3 of the stylesheet) but not preloaded. Body copy (`font-text`) will swap on first paint while the browser discovers Inter through the CSS chain. This is a tradeoff (preloading both costs more bytes upfront) — but worth documenting the choice so Phase 24+ does not "fix" it without context, or worth preloading Inter too if body-copy FOUT is observed in CI Lighthouse runs.

**Fix:** Either add an explicit comment in `BaseLayout.astro` explaining why only Jakarta is preloaded, or add Inter preload:
```astro
import interUrl from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
...
<link rel="preload" href={interUrl} as="font" type="font/woff2" crossorigin />
```

---

_Reviewed: 2026-05-14_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_

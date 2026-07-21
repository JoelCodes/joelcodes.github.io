# Phase 41: Legacy Cleanup + Quality Gate — Research

**Researched:** 2026-07-20
**Domain:** Deletion safety, CSS purge, axe-core harness, Lighthouse CI, visual fidelity gate
**Confidence:** HIGH — all findings verified against the ACTUAL `gsd/v3.0-milestone` working tree

---

## Summary

Phase 41 is the milestone-close phase for v3.0. It is purely subtractive and verification. Research verified every deletion target against the actual working tree, mapped every line of global.css, confirmed the complete axe/Playwright harness that already exists, identified the Lighthouse CI constraint that blocks adding showcase to the URL set, and catalogued every stale claim in CLAUDE.md.

The three main surprises versus prior context:

1. **BaseLayout still carries old-token classes** — the `<body>` tag in `src/layouts/BaseLayout.astro` uses `font-body bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark`. After the old `@theme` block is deleted these utilities will have no values. They must be updated in BaseLayout as part of CLEAN-02. The CLEAN-02 grep as written (`var(--color-yellow|var(--font-heading|bg-yellow|...`) does NOT catch this — the grep pattern must be supplemented or BaseLayout must be updated first.

2. **Showcase + blog are PROD-excluded — cannot be in Lighthouse CI URL set** — `lighthouserc.json` uses `staticDistDir: ./dist` (production build). `/showcase` returns `Astro.redirect('/')` in PROD (line 41 of `showcase.astro`). `/blog/*` are also PROD-excluded. The current URL list (`/` and `/blog/im-pivoting/`) already has a stale entry. The Phase 41 plan must update `lighthouserc.json` and `lighthouserc-mobile.json` to replace `/blog/im-pivoting/` with a real prod URL (e.g. `/404` or `/services/web` or just `/`).

3. **The axe harness for all seven required pages is already fully built** — separate, durable spec files exist for every required page. Phase 41 just needs to run them all together and confirm zero violations.

**Primary recommendation:** Execute in order: (1) verify + delete orphaned files, (2) purge global.css old blocks AND update BaseLayout body classes simultaneously, (3) update lighthouserc.json for prod URLs, (4) run `npm run build` gate, (5) run axe `npm run test:a11y`, (6) push to CI for Lighthouse, (7) capture QUAL-03 screenshots + halt for Joel sign-off.

---

## Deletion Target Verification (D-01)

All orphan statuses verified by `grep -rn import` against the actual tree on this branch.

### Confirmed Orphaned — Safe to Delete

| File/Directory | Status | Evidence |
|----------------|--------|----------|
| `src/components/ui/Badge.astro` | ORPHANED | Only importer: `design-system.astro` (itself orphaned) |
| `src/components/ui/Button.astro` | ORPHANED | Importers: `Hero.astro` (orphaned), `design-system.astro` (orphaned), `component-demo.astro` (orphaned) |
| `src/components/ui/Card.astro` | ORPHANED | Importers: `design-system.astro`, `component-demo.astro` (both orphaned) |
| `src/components/ui/CheckboxGroup.astro` | ORPHANED | Only importer: `design-system.astro` (orphaned) |
| `src/components/ui/Input.astro` | ORPHANED | Importers: `design-system.astro`, `component-demo.astro` (both orphaned) |
| `src/components/illustrations/` (all 8 SVGs) | ORPHANED | Only importers: `Process.astro` (orphaned) and `test-isometric.astro` (orphaned) |
| `src/components/design-system/CodeBlock.astro` | ORPHANED | Only importer: `design-system.astro` (orphaned) |
| `src/components/design-system/ComponentShowcase.astro` | ORPHANED | Only importer: `design-system.astro` (orphaned) |
| `src/components/design-system/DesignSystemNav.astro` | ORPHANED | Only importer: `design-system.astro` (orphaned) |
| `src/components/design-system/TokenSwatch.astro` | ORPHANED | Only importer: `design-system.astro` (orphaned) |
| `src/components/About.astro` | ORPHANED | Zero importers found |
| `src/components/FAQ.astro` | ORPHANED | Zero live importers (services/web uses `wl/FAQItem.astro`) |
| `src/components/Hero.astro` | ORPHANED | Zero importers found (imports `ui/Button.astro` which is also orphaned) |
| `src/components/Process.astro` | ORPHANED | Zero importers found (imports illustrations/) |
| `src/components/ProjectCard.astro` | ORPHANED | Live pages use `wl/ProjectCard.astro` instead |
| `src/components/BlogCard.astro` | ORPHANED | Live pages use `wl/BlogCard.astro` instead |
| `src/components/layout/Header.astro` | ORPHANED | Zero importers (only `layout/Header.astro` imports `layout/MobileNav.astro`) |
| `src/components/layout/MobileNav.astro` | ORPHANED | Only importer: `layout/Header.astro` (itself orphaned) |
| `src/components/layout/Footer.astro` | ORPHANED | Zero importers — `BaseLayout.astro` imports `layout/SiteFooter.astro`, not this |
| `src/pages/component-demo.astro` | ORPHANED | Imports only orphaned ui/* components |
| `src/pages/test-isometric.astro` | ORPHANED | Imports only orphaned illustrations/ |
| `src/pages/design-system.astro` | ORPHANED | Imports only orphaned ui/* and design-system/* components |
| `src/pages/design-system.json.ts` | ORPHANED | No live page or route depends on it |

### NOT in scope / Already gone (do not plan to delete)

| File | Status | Note |
|------|--------|-------|
| `src/pages/thank-you.astro` | ALREADY DELETED (Phase 40) | Absent from working tree |
| `src/components/Services.astro` | ALREADY DELETED (Phase 40) | Absent from working tree |
| `src/components/homepage/ContactSection.astro` | ALREADY DELETED (Phase 40) | Absent from working tree |
| `src/pages/faq.astro` | ALREADY DELETED (Phase 34) | Absent from working tree |
| `src/pages/projects/` | ALREADY DELETED (Phase 40) | Absent from working tree |
| `src/pages/design-system/` (folder) | ALREADY GONE | SC mentions this but it's absent |

### KEEP — Live components (do not touch)

| File | Why |
|------|-----|
| `src/components/WaveMark.astro` | Imported by `layout/SiteHeader.astro`, `layout/SiteFooter.astro`, `wl/AuthorCard.astro` |
| `src/components/SEO.astro` | Imported by `layouts/BaseLayout.astro` |
| `src/components/TableOfContents.astro` | Not imported anywhere — BUT it does not carry old tokens; leave it as-is (it's a harmless stale file, not a deletion target per CONTEXT.md D-01) |
| `src/components/layout/SiteHeader.astro` | Live — imported by BaseLayout |
| `src/components/layout/SiteFooter.astro` | Live — imported by BaseLayout |
| All `src/components/wl/*` | v3.0 component set — untouched |

### Deletion Order (topological)

Delete pages before components they depend on, to avoid import-resolution errors during any intermediate `astro check` runs:

1. **Pages first** (they import orphaned components):
   - `src/pages/component-demo.astro`
   - `src/pages/test-isometric.astro`
   - `src/pages/design-system.astro`
   - `src/pages/design-system.json.ts`

2. **Root components** (after their only importers are gone):
   - `src/components/ui/` (entire directory)
   - `src/components/illustrations/` (entire directory)
   - `src/components/design-system/` (entire directory)
   - `src/components/About.astro`
   - `src/components/FAQ.astro`
   - `src/components/Hero.astro`
   - `src/components/Process.astro`
   - `src/components/ProjectCard.astro`
   - `src/components/BlogCard.astro`

3. **Orphaned layout components** (last, no interdependencies between them):
   - `src/components/layout/Header.astro`
   - `src/components/layout/MobileNav.astro`
   - `src/components/layout/Footer.astro`

---

## global.css Purge Map (D-02)

File is exactly 1268 lines on this branch. Below is a verified keep/cut map.

### Section Map (line ranges)

| Lines | Content | Action | Reason |
|-------|---------|--------|--------|
| 1–10 | `@import` statements (tailwindcss, fontsource fonts) | **KEEP** | Foundation |
| 12–50 | `@theme` block — `--wl-*` palette + font tokens | **KEEP** | v3.0 token system |
| 52–66 | `.dark` block — WL dark-mode flip | **KEEP** | Dark mode |
| 68–126 | `:root` block — `--wl-footer-*`, `--wl-cta-*`, `--wl-breadcrumb-*`, `--wl-proof-*`, `--wl-portrait-*`, `--wl-card-*` | **KEEP** | Live wl/ components depend on these |
| 128–148 | `.dark` block — card panel + ghost button dark flip | **KEEP** | Live wl/ components |
| 150–219 | `@theme` OLD NEOBRUTALIST block — `--color-yellow*`, `--color-turquoise*`, `--color-magenta*`, `--color-bg-*`, `--color-text-*`, `--border-neo*`, `--spacing-neo*`, `--font-heading`, `--font-body`, `--font-weight-*`, `--text-*`, `--leading-*` | **DELETE** | Old token system — no live page uses any of these after file deletion |
| **221–222** | `@custom-variant dark (&:where(.dark, .dark *));` | **KEEP — MANDATORY** | Tailwind 4 `dark:` utilities depend on this line. Deleting it breaks all `dark:` class variants across the entire site. |
| 224–231 | `@layer base { body { font-family: var(--font-wl-body); ... } }` | **KEEP** | v3.0 body font |
| 233–236 | `html { scroll-behavior: smooth; }` | **KEEP** | Site-wide UX |
| 238–279 | `details::details-content` animation + `prefers-reduced-motion` block | **KEEP** | wl/ProjectCard + wl/FAQItem use `::details-content` |
| 277–279 | `section[id] { scroll-margin-top: 64px }` | **KEEP** | Landing page scroll-spy |
| 281–425 | `@layer utilities` — `.text-yellow-text`, `.shadow-neo-*`, `.iso-*` utilities | **DELETE** | Old neobrutalist utilities — zero live references after orphaned files deleted |
| 427–458 | `.project-card` / `.blog-card` animation classes + `@keyframes fadeInScale` | **DELETE** | Only `src/components/BlogCard.astro` (root, orphaned) carries `.blog-card`; `wl/BlogCard.astro` uses its own scoped CSS. `wl/ProjectCard.astro` uses `.wl-project-card-*` scoped classes, not `.project-card`. |
| 460–496 | `.toc` block | **DELETE** | `TableOfContents.astro` has zero live importers; `.toc` is unused |
| 497–651 | `.prose` block (old blog post styling) | **DELETE** | `src/pages/blog/[slug].astro` uses `class="wl-prose"` at line 198, NOT `.prose`. No live page uses `.prose`. |
| 652–995 | `.wl-prose` block (v3.0 blog styling) | **KEEP** | Blog post template uses this |
| 997–1268 | WL TYPE RAMP + WL CHROME UTILITIES (`@layer utilities`) | **KEEP** | Live pages and wl/ components use `.wl-display-hero`, `.wl-heading-*`, `.wl-text-*`, `.wl-label-*`, `.wl-wordmark`, `.wl-nav-link`, `.wl-footer-*`, etc. |

### CRITICAL: BaseLayout body must be updated simultaneously

`src/layouts/BaseLayout.astro` line 80:
```html
<body class="font-body bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark min-h-screen flex flex-col">
```

These Tailwind utilities (`font-body`, `bg-bg-light`, `bg-bg-dark`, `text-text-light`, `text-text-dark`) are generated by the old `@theme` block being deleted. After deletion they produce no CSS. They must be updated in BaseLayout as part of CLEAN-02:

| Old utility | v3.0 replacement | Reasoning |
|-------------|-----------------|-----------|
| `font-body` | Remove (or replace with `font-wl-body`) | Body font is already set in `@layer base` at line 228 via `--font-wl-body`; the class is redundant |
| `bg-bg-light` | `bg-wl-paper` | `--color-wl-paper: #F6FBFA` light / `#0C2228` dark |
| `dark:bg-bg-dark` | `dark:bg-wl-paper` | Same token flips automatically in `.dark` |
| `text-text-light` | `text-wl-ink` | `--color-wl-ink` light/dark flip |
| `dark:text-text-dark` | `dark:text-wl-ink` | Same token |

Tailwind 4 auto-generates utility classes for every `@theme` variable: `--color-wl-paper` → `bg-wl-paper`, `text-wl-paper`; `--color-wl-ink` → `text-wl-ink`, etc. These utilities already work (confirmed by SiteHeader's use of `text-wl-ink`, `bg-wl-sea-glass`).

### CLEAN-02 Grep — SUPPLEMENTED

The SC-2 grep as defined in CONTEXT.md:
```bash
grep -r "var(--color-yellow\|var(--font-heading\|var(--border-neo\|bg-yellow\|bg-turquoise\|shadow-neo\|iso-shadow" src/
```

This DOES NOT catch:
- `font-body`, `bg-bg-light`, `bg-bg-dark`, `text-text-light`, `text-text-dark` (BaseLayout body)
- `--color-accent-teal` (appears only in `.toc` and `.prose` which are being deleted)
- The old `--text-*`, `--leading-*`, `--spacing-neo-*` variables in files being deleted

**Recommendation:** Run the SC-2 grep AND additionally verify with `npm run build` (which will fail if any live page references a deleted Tailwind utility). The build gate is the authoritative verification that CLEAN-02 is complete.

False-positive risk: `global.css` itself currently contains `var(--color-yellow*)` etc. (the old utilities). After deleting lines 150–219 and 281–458, the grep will return zero for `global.css`. The grep correctly returns zero only after BOTH the file deletions AND the global.css purge.

---

## axe-Core Harness (QUAL-01)

**Confidence:** HIGH — verified against actual test files.

### What exists

The axe harness is fully built. All seven required pages have durable spec files:

| Page | Spec file | Light | Dark |
|------|-----------|-------|------|
| `/` (landing) | `tests/accessibility/landing.spec.ts` | YES | YES (colorScheme: dark context) |
| `/showcase` | `tests/accessibility/showcase.spec.ts` | YES | YES |
| `/blog` (index) | `tests/accessibility/blog.spec.ts` | YES | YES |
| `/blog/im-pivoting` (post) | `tests/accessibility/blog.spec.ts` | YES | YES |
| `/404` | `tests/accessibility/404.spec.ts` | YES | YES |
| `/services/web` | `tests/accessibility/services-web.spec.ts` | YES | YES |
| `/areas/abbotsford` | `tests/accessibility/areas-abbotsford.spec.ts` | YES | YES |

Additional specs: `axe-tests.spec.ts` (landing + blog, older), `dark-mode.spec.ts` (landing light + dark), `mobile-chrome.spec.ts` (CHROME-04 mobile viewport).

**Run command:**
```bash
npm run test:a11y
# Resolves to: playwright test tests/accessibility
```

### Dark-mode mechanism in tests

All dark-mode tests use `browser.newContext({ colorScheme: 'dark' })`. This triggers the FOUC script in `BaseLayout.astro` which calls `window.matchMedia('(prefers-color-scheme: dark)').matches` and adds the `.dark` class to `<html>`. Tests then verify `html.dark` class is present.

**Key reconciliation:** `global.css` line 222 uses `@custom-variant dark (&:where(.dark, .dark *))` — this is class-based, NOT `prefers-color-scheme`. But the Playwright `colorScheme: 'dark'` browser context causes the FOUC script to add `.dark` to `<html>`. So the Playwright context drives the class-based system correctly. The `@custom-variant dark` line MUST be preserved for this to work.

### Playwright config

- `testDir: ./tests`
- `testIgnore: tests/build/**`
- `baseURL: http://localhost:4321`
- `webServer: npm run dev` (dev server — this is required because showcase + blog are dev-only)
- Chromium only, Desktop Chrome device profile

**Important:** The axe suite runs against `npm run dev` (NOT `npm run build`). This is by design — showcase and blog are dev-only. All seven pages are reachable in dev.

### settleAnimations helper

All specs import `settleAnimations(page)` from `tests/accessibility/helpers.ts`. It waits for all finite animations to complete before running axe, preventing false color-contrast failures from mid-transition states.

### Expected behavior after deletion

Deleting `design-system.astro`, `component-demo.astro`, `test-isometric.astro` removes routes that currently pass axe because they import old components. After deletion, the dev server has fewer routes but all tested routes remain intact. No axe spec file references any of the deleted pages.

---

## Lighthouse CI (QUAL-02)

**Confidence:** HIGH — verified against actual lighthouserc.json files and GitHub Actions workflow.

### Current state

Two config files exist:
- `lighthouserc.json` — desktop preset
- `lighthouserc-mobile.json` — no `settings.preset`, defaults to mobile

Both are identical in content: they test `/` and `/blog/im-pivoting/`, with a comment "showcase/ activates in Phase 38 when that route is built."

### CRITICAL: Showcase and blog cannot be in the PROD Lighthouse URL set

`lighthouserc.json` uses `staticDistDir: ./dist` — this is the **production build**. In the production build:
- `/showcase` → redirects to `/` (PROD guard at showcase.astro line 41)
- `/blog/*` → redirects (PROD blog exclusion)

If `/blog/im-pivoting/` stays in the URL list, LHCI follows the redirect to `/` and scores the landing page a second time. This is not a CLEAN-02 issue but it is misleading.

**Phase 41 must update `lighthouserc.json` and `lighthouserc-mobile.json` to remove `/blog/im-pivoting/` and replace with a prod-accessible URL.** Options:
- Replace with `/404` (the 404 page is in prod at `dist/404.html`)
- Replace with `/services/web` (in prod, just noindex)
- Keep just `/` (simplest — landing is the primary conversion page)

The SC-5 phrase "landing, showcase, one blog post" predates the PROD-exclusion architecture. The plan should reconcile this and update accordingly.

### `@lhci/cli` is NOT installed locally

`@lhci/cli` is not in `node_modules/.bin/`. Lighthouse CI runs exclusively via `treosh/lighthouse-ci-action@v12` in GitHub Actions (`.github/workflows/deploy.yml`). There is no local `lhci` command.

**Run command (CI only):** Push to `gsd/v3.0-milestone` branch and merge to `main` — GitHub Actions runs Lighthouse CI automatically. Or trigger a PR to `main` which runs the PR preview build.

For local pre-verification, use Playwright Lighthouse integration or the Chrome DevTools Lighthouse panel manually.

### Thresholds

All four categories at ≥90 (`minScore: 0.9`), set as `"warn"` level (not blocking `"error"` for accessibility/best-practices/SEO, but performance is `"error"`).

`lcp-lazy-loaded` and `prioritize-lcp-image` are both `"warn"` — they were re-enabled in Phase 33-02 (FOUND-04).

---

## Visual Fidelity Gate (QUAL-03)

**Confidence:** HIGH — verified against existing scripts and fidelity directories.

### Existing screenshot tooling

The pattern is established from Phases 38 and 39:
- `scripts/fidelity-screenshots.mjs` — Phase 39 script (3 pages × 2 widths × 2 modes = 12 shots)
- `scripts/blog-fidelity-screenshots.mjs` — Phase 38 blog script

Both use `chromium.launch()` from `@playwright/test`, `colorScheme: 'dark'|'light'` browser context, `document.fonts.ready` + `settleAnimations` pattern, and `page.screenshot({ fullPage: true })`.

### For QUAL-03

Phase 41 needs a new fidelity script targeting Landing + Showcase after the cleanup:

```
pages: /, /showcase
widths: 1440, 390 (minimum for milestone gate)
modes: light, dark
output: .planning/phases/41-legacy-cleanup-quality-gate/fidelity/
```

Run against `npm run dev` server (showcase is dev-only).

### Existing Figma frame exports

| Frame | Location | Present? |
|-------|----------|---------|
| 12:2 (Landing light) | `.planning/phases/37-landing-page/fidelity/37-figma-12-2.png` | YES |
| 117:103 (Landing dark) | `.planning/phases/37-landing-page/fidelity/37-figma-117-103.png` | YES |
| 12:3 (Showcase) | `.planning/phases/38-showcase-page-blog-restyle/fidelity/figma-{1440,1920,768,390}-{closed,expanded}.png` | YES (multi-breakpoint) |

The Figma frames are already exported. The QUAL-03 gate only needs new RENDERED screenshots (post-cleanup) to place beside them for Joel's approval.

### Pencil MCP constraint

`export_nodes` is broken per project memory. PNG exports are manual. This applies only if new Figma frame captures are needed — they are NOT needed since the frames are already exported.

### QUAL-03 is `autonomous: false`

Per D-03, execution halts at QUAL-03 and presents screenshots side-by-side with Figma frames for Joel's sign-off. This is the milestone-close gate. The plan task for this step MUST have `autonomous: false`.

---

## Validation Architecture

This section defines the observable signals that prove each gate passed (Nyquist-safe — no ambiguity, no silent failures).

### QUAL-01: axe-core Zero Violations

**Command:** `npm run test:a11y`

**Observable signal that it passed:**
```
✓  Landing Page Accessibility > Landing page in light mode ...
✓  Landing Page Accessibility > Landing page in dark mode ...
✓  Showcase Page Accessibility > Showcase page in light mode ...
✓  Showcase Page Accessibility > Showcase page in dark mode ...
✓  Blog Page Accessibility > Blog index in light mode ...
✓  Blog Page Accessibility > Blog index in dark mode ...
✓  Blog Page Accessibility > Blog post in light mode ...
✓  Blog Page Accessibility > Blog post in dark mode ...
✓  404 Page Accessibility > 404 page in light mode ...
✓  404 Page Accessibility > 404 page in dark mode ...
✓  Service Web Page Accessibility > Service Web page in light mode ...
✓  Service Web Page Accessibility > Service Web page in dark mode ...
✓  Area Abbotsford Page Accessibility > Area Abbotsford page in light mode ...
✓  Area Abbotsford Page Accessibility > Area Abbotsford page in dark mode ...
```
Exit code 0. Playwright HTML report shows 0 failed tests in `tests/accessibility/`.

**Failure signal:** Any line containing `violations` array with items. Playwright marks test as FAILED. Do not auto-fix; report to Joel.

### QUAL-02: Lighthouse CI ≥90

**Command:** Push to CI (GitHub Actions `deploy.yml`). Lighthouse runs autonomously on the push to `main`.

**Observable signal that it passed:** GitHub Actions check `Run Lighthouse CI` and `Run Lighthouse CI (mobile)` both show green. Lighthouse CI uploads results to temporary-public-storage; links appear in the Actions log.

**LHCI assert levels:** Performance failures are `"error"` (blocking CI). Accessibility, best-practices, SEO are `"warn"` (flagged but not blocking). Phase 41 plan should note if any `warn` categories fall below 90 and whether to escalate to `error`.

**Failure signal:** GitHub Actions step `Run Lighthouse CI` turns red. Do not auto-fix the score; report to Joel.

### QUAL-03: Visual Fidelity Sign-off

**Command:** `node scripts/41-fidelity-screenshots.mjs` (script to be created, following existing pattern). Requires dev server at `localhost:4321`.

**Observable signal that it passed:** Joel explicitly writes "approved" (or equivalent) in response to the screenshot comparison. The milestone-shipped marker is NOT set until this response is received.

**Protocol:** Claude presents rendered screenshots beside the stored Figma frames from `.planning/phases/37-landing-page/fidelity/` (12:2, 117:103) and `.planning/phases/38-showcase-page-blog-restyle/fidelity/` (12:3 closed + expanded). All four are compared: landing light, landing dark, showcase closed, showcase expanded (at minimum 1440px).

---

## CLEAN-01 Verification Gate

**Command:**
```bash
npm run build
# Then confirm exit code 0 and zero import errors in output
```

**Observable signal that CLEAN-01 passed:** Build completes with no `[ERROR]` lines. No Astro "failed to resolve import" messages. `dist/` does NOT contain `design-system/`, `component-demo/`, or `test-isometric/` folders.

**Supplemental check:**
```bash
# No deleted page in dist
ls dist/ | grep -E "design-system|component-demo|test-isometric"
# Should return empty
```

---

## CLEAN-02 Verification Gate

**Step 1 — SC-2 grep (as defined in CONTEXT.md):**
```bash
grep -r "var(--color-yellow\|var(--font-heading\|var(--border-neo\|bg-yellow\|bg-turquoise\|shadow-neo\|iso-shadow" src/
# Must return zero results
```

**Step 2 — Supplemental (catches BaseLayout utilities not in Step 1):**
```bash
grep -rn "font-body\|bg-bg-light\|bg-bg-dark\|text-text-light\|text-text-dark" src/
# Must return zero results after BaseLayout body is updated
```

**Step 3 — Build gate confirms no broken utilities:**
```bash
npm run build
# If BaseLayout still uses old token classes, build succeeds but classes produce no CSS.
# The visual gate (QUAL-03) catches any visual regression.
```

---

## design/ Cleanup (D-05)

**Status:** Verified safe to delete.

```bash
ls design/image-import-*.{png,jpg} | wc -l  # 80 files
grep -rn "image-import" src/                  # Returns zero
grep -rn "image-import" src/content/          # Returns zero
```

All 80 `design/image-import-*.{png,jpg}` files at the repo root `design/` directory are:
- Untracked (shown as `??` in `git status`)
- Not referenced by any `src/` import or content collection
- Duplicated in `design/images/` (the tracked originals)

Delete all 80 with `rm design/image-import-*.png design/image-import-*.jpg`.

### Crito archive note

`design/Crito.pen` and the `.fig` files (`Alliatus – Mastermind Landing Page Template.fig`, `finesse-ui.fig`, `Consulting & Agency Website Template I Crito.fig`) are retained. Add a brief `design/ARCHIVE.md` (or inline `design/README.md`) marking:
- `Crito.pen` — v2.0 design system (abandoned 2026-07-14). Archive lives on branch `feature/phase-32-fidelity-sweep-handoff`.
- `.fig` files — template references imported during v2.0 phase. Not in active use.

---

## CLAUDE.md Rewrite (D-04)

Current `CLAUDE.md` is entirely v1/v2. Every major section needs rewriting.

### Stale claims and v3.0 targets

| Current claim (line) | v3.0 target |
|---------------------|-------------|
| "Fonts: Poppins (headings), Inter (body)" (line 63) | "Fonts: Fraunces Variable (headings), Hanken Grotesk Variable (body), Roboto Mono Variable (code)" |
| "Typography: Bricolage Grotesque (headings), DM Sans (body)" (line 82) | Same as above — both lines need correction |
| "Accent colors: yellow (#ffef6a), teal (oklch)" (line 63) | "Token prefix: `--wl-*` (palette: Ink/Sub/Accent/Sea-glass/Paper/Line in light + dark)" |
| "See `/design-system` for full token reference" (line 65) | Remove — page deleted |
| `Button`, `Card`, `Input`, `Badge` from `src/components/ui/` (lines 71–79) | Replace with wl/ component set (CTAButton, Eyebrow, Tag, Callout, Breadcrumb, Step, ServiceCard, ProjectCard, FAQItem, BlogCard, FeaturedPostCard, FrequencyWave, LinkCard, AuthorCard, WaveMark) |
| "Isometric utilities: iso-shadow, iso-glow, iso-rotate" (line 84) | Remove — deleted |
| "Reference `/design-system.json` for available tokens and component props" (line 72) | Remove — `design-system.json.ts` deleted |
| Directory: `│   └── /portfolio  # Portfolio index and [slug].astro` (line 41) | Remove `/portfolio` — deleted; add no new directory since showcase.astro is at root level |
| Directory: `├── /data  # projects.json (portfolio data)` (line 44) | Update: `src/data/projects.json` (v2 schema with section, thumbLabel, expanded story fields) |
| "static portfolio/blog site" (line 25) | Update to "portfolio and service site with blog (dev-only)" |
| IA: no mention of /faq redirect, /projects redirect | Add: redirects for `/projects→/showcase`, `/faq→/`, `/contact→Calendly` |
| Blog: "Blog posts use Astro Content Collections" — implies blog is public | Clarify: blog is dev-only (prod-excluded via `import.meta.env.PROD` guard in blog/index.astro and [slug].astro) |
| Portfolio section: `/src/pages/portfolio/` | Remove — doesn't exist |
| Dark mode: "via `.dark` class with localStorage persistence" (line 63) | Update: "via `.dark` class set by `prefers-color-scheme` only (localStorage theme cleared — system-only)" |

### New sections to add

- Design source of truth: Figma `1tg8wIPcvOVC5tPZ8pkGO2`
- wl/ component list with prop summaries
- Dev-hidden pages: `/services/web`, `/areas/abbotsford` (noindex + sitemap filter, reachable by URL)
- Blog prod-exclusion mechanism (import.meta.env.PROD guard)
- v3.0 constants: `BOOKING_URL` and `CONTACT_EMAIL` in `src/lib/constants.ts`

---

## Build Integrity Considerations

### astro.config.mjs interactions with deletion

After deleting `src/pages/design-system.json.ts`, Astro will no longer generate a `/design-system.json` API route. This is safe — nothing in `astro.config.mjs` references it.

After deleting orphaned pages, the `sitemap filter()` in `astro.config.mjs` continues to exclude `/blog`, `/showcase`, `/services/`, `/areas/` — no changes needed.

The redirects block already handles `/faq→/`, `/projects→/showcase`, `/thank-you→/` — all these source pages are already absent. No redirect changes needed.

### Blog PROD guard

`src/pages/blog/index.astro` and `src/pages/blog/[slug].astro` use `import.meta.env.PROD` to return redirect stubs. This is NOT affected by Phase 41 deletions.

### Post-deletion build command

```bash
npm run build
```

This is the primary gate after each deletion wave. Run it after Step 1 (pages deleted) and again after Step 2 (components deleted) to catch any missed import references.

---

## Common Pitfalls

### Pitfall 1: Deleting global.css line 222

Line 222: `@custom-variant dark (&:where(.dark, .dark *));`

This line registers the `dark:` variant for Tailwind 4. If deleted, every `dark:` utility class across every page and wl/ component stops working. The old `@theme` block immediately precedes it (lines 150–219). The delete operation MUST stop at line 219 and preserve line 221 onward.

**How to avoid:** Use explicit line-range deletion; verify build passes after purge.

### Pitfall 2: Forgetting BaseLayout body classes

Deleting the old `@theme` block (lines 150–219) removes the Tailwind-generated utilities `font-body`, `bg-bg-light`, `bg-bg-dark`, `text-text-light`, `text-text-dark`. The site builds without error (Tailwind just omits unknown tokens), but the `<body>` gets default browser styling instead of the v3.0 palette. QUAL-03 visual gate catches this if not caught sooner.

**How to avoid:** Update BaseLayout body classes in the same commit as the global.css purge.

### Pitfall 3: Running CLEAN-02 grep before deleting orphaned files

The current `src/components/Hero.astro`, `About.astro`, etc. contain `var(--color-yellow)`, `shadow-neo-*` etc. These files will cause the CLEAN-02 grep to return non-zero until THEY are deleted. Run the grep only AFTER all D-01 deletions.

### Pitfall 4: Adding /showcase or /blog to lighthouserc.json

In the production build, both routes redirect to `/`. LHCI scores the redirect destination, not the showcase/blog content. The current `lighthouserc.json` already has a stale `/blog/im-pivoting/` entry that does this. Remove it and replace with a real prod URL.

### Pitfall 5: Treating design/image-import-* as tracked

All 80 `design/image-import-*` files are `??` (untracked) in `git status`. They were never committed. `git rm` won't work — use `rm` directly.

### Pitfall 6: ComponentShowcase.astro vs Component file naming

`src/components/design-system/ComponentShowcase.astro` is distinct from the wl component set. It is only imported by the orphaned `design-system.astro` page. It is safe to delete.

---

## Standard Stack (What Already Exists)

No new libraries are needed for Phase 41. All tooling is pre-installed.

| Tool | Version | Already installed | Purpose |
|------|---------|------------------|---------|
| `@axe-core/playwright` | ^4.11.1 | YES (devDep) | QUAL-01 axe testing |
| `@playwright/test` | ^1.58.2 | YES (devDep) | Test runner for axe |
| `treosh/lighthouse-ci-action` | v12 | CI-only | QUAL-02 Lighthouse |
| `astro` | ^5.16.15 | YES | Build gate |
| `tailwindcss` | ^4.1.18 | YES | CSS build |

---

## Open Questions

1. **QUAL-02 URL set** — The SC says "landing, showcase, one blog post." Research confirms showcase + blog are PROD-excluded. The planner must decide: update lighthouserc.json to remove `/blog/im-pivoting/` and whether to add `/404` or `/services/web`. Recommendation: Replace `/blog/im-pivoting/` with `/404` (also a real prod page, different content from landing).

2. **QUAL-03 screenshot scope** — Existing rendered screenshots from Phase 37 (`37-light-1440.png`, `37-dark-1440.png`) and Phase 38 (`rendered-1440-closed-light.png` etc.) could be reused for comparison, but they predate the cleanup. The plan should capture fresh rendered screenshots AFTER deletion to confirm no visual regressions from the token purge. Minimal set: landing 1440 light, landing 1440 dark, showcase 1440 closed light.

3. **BaseLayout `font-body` vs `font-wl-body`** — After the old `@theme` is purged, `font-body` produces no output. The `@layer base` block at lines 224–231 already sets `font-family: var(--font-wl-body)` on `body`. So removing `font-body` from the BaseLayout class list has no visual effect (the base rule fires regardless). The cleaner fix is to remove the class; the equivalent fix is to add `font-wl-body` class instead.

---

## Sources

### Primary (HIGH confidence)

- Actual working tree `gsd/v3.0-milestone` — `grep -rn` import verification across all src/ files
- `src/styles/global.css` — read in full (1268 lines), line-by-line mapping
- `src/layouts/BaseLayout.astro` — read for FOUC script and body class
- `tests/accessibility/` directory — all spec files read
- `lighthouserc.json` and `lighthouserc-mobile.json` — read in full
- `.github/workflows/deploy.yml` — read for CI configuration
- `package.json` — read for installed dependencies and npm scripts
- `playwright.config.ts` — read for test configuration
- `scripts/fidelity-screenshots.mjs` and `scripts/blog-fidelity-screenshots.mjs` — read for screenshot tooling pattern
- `astro.config.mjs` — read in full for redirects and sitemap filter
- `.planning/phases/41-legacy-cleanup-quality-gate/41-CONTEXT.md` — authority for scope
- `.planning/REQUIREMENTS.md` — CLEAN/QUAL requirement definitions
- `.planning/ROADMAP.md` §Phase 41 — success criteria

### Secondary (MEDIUM confidence)

- `.planning/STATE.md` — accumulated context on prior phase decisions
- Phase 37 and 38 fidelity directories — confirmed existing screenshot artifacts

---

## Metadata

**Confidence breakdown:**
- Deletion safety (D-01): HIGH — every file verified with grep
- global.css keep/cut map (D-02): HIGH — every line range read and analyzed
- CLEAN-02 grep coverage: HIGH — supplemental grep identified BaseLayout gap
- axe-core harness (QUAL-01): HIGH — all spec files read and confirmed
- Lighthouse CI (QUAL-02): HIGH — confirmed lhci not local, CI-only, URL constraint identified
- Visual fidelity tooling (QUAL-03): HIGH — script pattern verified, Figma frames confirmed present
- CLAUDE.md stale claims (D-04): HIGH — compared against actual tree
- design/ cleanup (D-05): HIGH — all 80 files untracked, zero src/ references

**Research date:** 2026-07-20
**Valid until:** 2026-08-20 (stable domain — Astro/Tailwind versions locked)

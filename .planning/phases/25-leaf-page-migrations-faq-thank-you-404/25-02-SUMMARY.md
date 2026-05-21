---
phase: 25-leaf-page-migrations-faq-thank-you-404
plan: 02
subsystem: ui
tags: [astro, tailwind-v4, baselayout-v2, env-var, calendly, lucide, noindex, axe-core, playwright, github-actions]

# Dependency graph
requires:
  - phase: 23-design-system-foundation
    provides: v2 tokens (src/styles/v2/global.css), BaseLayoutV2 with <slot name="head" />, light-mode-only invariant, --font-display / --font-text, --color-accent / --color-primary
  - phase: 24-v2-primitive-library-design-system-page
    provides: Button (variant=primary/link, polymorphic href, link-variant auto ArrowRight), Card (elevated + interactive props), CardBody
  - phase: 25-leaf-page-migrations-faq-thank-you-404-plan-01
    provides: tests/accessibility/v2-leaf.spec.ts scaffold with wcagTags constant + existing /faq describe block (appended-to, NOT modified)
  - phase: 26-blog-migration-post-layout-index-tag-pages
    provides: D-26-04 no-uppercase headings rule; BlogCard.astro anchor-wraps-Card CR-02 precedent (outer <a> carries focus ring + hover-lift; inner Card is NOT interactive)
provides:
  - /thank-you rewritten on BaseLayoutV2 with elevated centered Card, env-var Calendly URL, no-uppercase h1
  - /404 brand-new page on BaseLayoutV2 with typographic hero, 2x2 destination grid (Home/Projects/Blog/FAQ), link-variant contact CTA, <meta slot="head"> noindex
  - tests/accessibility/v2-leaf.spec.ts extended with /thank-you (Category B, 4 tests) + /404 (Category C, 5 tests) describe blocks — full suite 14 tests passing with 0 axe violations
  - .github/workflows/deploy.yml wired with PUBLIC_CALENDLY_URL secret reference alongside PUBLIC_N8N_WEBHOOK_URL
  - Closes LEAF-02 (/thank-you) + LEAF-03 (/404) and completes Phase 25
affects:
  - Phase 27 (/projects index — same anchor-wraps-Card pattern available for service/portfolio cards)
  - Phase 28 (Contact reskin — Calendly URL wiring already in place via PUBLIC_CALENDLY_URL)
  - Phase 30 cleanup (v1 components no longer consumed by any leaf page after this plan)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Env-var with placeholder fallback (D-25-11) — `const calendlyUrl = import.meta.env.PUBLIC_CALENDLY_URL || 'https://calendly.com/joelshinness';` mirrors PUBLIC_N8N_WEBHOOK_URL pattern; build-time inlined by Vite"
    - "Anchor-wraps-Card with outer focus ring (RESEARCH OQ-4 resolution; BlogCard CR-02 precedent) — outer `<a class=\"dest-card\">` carries hover-lift + accent focus ring; inner `<Card>` is NOT interactive (avoids double-tabindex)"
    - "<meta slot=\"head\"> for per-page noindex — D-25-18 uses BaseLayoutV2 line 29 `<slot name=\"head\" />` without adding a new layout prop"
    - "Bare title prop to BaseLayoutV2 (RESEARCH Pitfall 2 / OQ-2 fix-as-you-touch) — SEO.astro auto-appends ' | Joel Shinness'; passing pre-suffixed v1 title was the double-suffix bug now fixed on /thank-you"
    - "v2 leaf-page test category pattern (B for /thank-you, C for /404) — render+axe / no-uppercase / CTA href+target+rel / secondary link / destination order / noindex / no banner chrome"

key-files:
  created:
    - src/pages/404.astro
  modified:
    - src/pages/thank-you.astro
    - tests/accessibility/v2-leaf.spec.ts
    - .github/workflows/deploy.yml

key-decisions:
  - "Passed bare titles to BaseLayoutV2 ('Thanks!' on thank-you, 'Page not found' on 404) — SEO.astro appends ' | Joel Shinness' automatically (line 30). Fix-as-you-touch per RESEARCH OQ-2 — the v1 /thank-you double-suffix bug ('Thanks! | Joel Shinness | Joel Shinness' in rendered <title>) is now corrected"
  - "Used `stroke-width` kebab-case (NOT `strokeWidth` camelCase) on CheckCircle2 — @lucide/astro IconProps types require kebab-case; the camelCase form in RESEARCH Example 2 produced a real ts(2322) error caught during Task 2 verification (Rule 1 fix, committed separately as c6a7cfd)"
  - "Inner /404 destination Card has NO `interactive={true}` prop — overrides UI-SPEC line 222-223 per RESEARCH OQ-4 resolution and PATTERNS critical note. BlogCard CR-02 precedent: outer anchor carries focus ring + hover-lift; inner Card stays bare. Avoids the double-tabindex stop"
  - "Used `<meta slot=\"head\" name=\"robots\" content=\"noindex\">` (exact attrs) — NOT `noindex, follow` which design-system.astro uses. A true 404 should fully suppress indexing per D-25-18"
  - "Used `&mdash;` HTML entity for em-dash in 'Skip the wait &mdash; book a call' Button label — renders identically to literal U+2014 character; entity form is more portable across editor encodings"
  - "Deferred Sub-task 3C (Pencil mirror) — Pencil MCP tools (`pencil__open_document`, `pencil__batch_design`, etc.) were announced in the executor environment but not exposed as callable functions to this agent; flagged for manual completion per plan's contingency clause"

patterns-established:
  - "v2 thank-you / confirmation page pattern: centered elevated Card with success icon → display h1 → text body → primary Button → secondary text link. Reusable for any future 'form submitted' / 'action complete' pages"
  - "v2 typographic system-state page pattern (404): large numeral in --color-primary, sentence-case h2 tagline, destination grid using anchor-wraps-Card (NOT interactive Card), link-variant CTA. No banner chrome (system-state page invariant per D-25-17)"
  - "deploy.yml env block extension: add new PUBLIC_* secret references directly under existing siblings in the `Build site` step env block; preserve YAML indentation; no other workflow files touched"

requirements-completed:
  - LEAF-02
  - LEAF-03

# Metrics
duration: ~16 min
completed: 2026-05-21
---

# Phase 25 Plan 02: /thank-you + /404 migration to BaseLayoutV2

**Rewrote `/thank-you` on `BaseLayoutV2` (elevated centered Card + env-var Calendly URL + bare title fixing v1 double-suffix bug + no uppercase h1) and created brand-new `/404` page (text-8xl→md:text-9xl numeral, 2x2 anchor-wraps-Card destination grid with no double-tabindex, link-variant contact CTA, `<meta slot="head">` noindex); appended Category B (/thank-you, 4 tests) + Category C (/404, 5 tests) describe blocks to `tests/accessibility/v2-leaf.spec.ts` for a 14-test green suite; wired `PUBLIC_CALENDLY_URL` into `.github/workflows/deploy.yml` build env alongside `PUBLIC_N8N_WEBHOOK_URL`; Pencil mirror (Sub-task 3C) deferred — MCP tools not exposed as callable functions in executor environment.**

## Performance

- **Duration:** ~16 min
- **Tasks:** 3 (`type="auto"`)
- **Files created:** 2 (`src/pages/404.astro`, `.planning/phases/25-.../25-02-SUMMARY.md`)
- **Files modified:** 3 (`src/pages/thank-you.astro` — rewrite + lucide prop fix; `tests/accessibility/v2-leaf.spec.ts` — appended 9 tests; `.github/workflows/deploy.yml` — one env line)
- **Net code change:** +185 lines / −39 lines
- **Commits:** 4 (3 task commits + 1 fix-as-you-touch commit)

## Accomplishments

### /thank-you migration to BaseLayoutV2 (LEAF-02)

- Rewrote `src/pages/thank-you.astro` in place (39 v1 lines → 41 v2 lines). Dropped v1 BaseLayout + v1 Card + v1 Button imports, `text-turquoise`, `font-heading`, `font-body`, `text-text-light`/`text-text-dark`, `Card variant="turquoise"`, `Button variant="turquoise"`, hardcoded Calendly URL, the trailing `.container { max-width: 1280px; }` `<style>` block, and the `uppercase` class on the h1.
- Imports now point at v2 paths: `BaseLayout` from `../layouts/v2/BaseLayout.astro`; `Card`, `CardBody`, `Button` from `../components/v2/ui/`; `CheckCircle2` from `@lucide/astro`.
- Env-var wiring: `const calendlyUrl = import.meta.env.PUBLIC_CALENDLY_URL || 'https://calendly.com/joelshinness';` — mirrors `PUBLIC_N8N_WEBHOOK_URL` pattern from `ContactSection.astro` line 214.
- Layout: `min-h-[70vh] flex items-center justify-center` outer wrapper preserves v1 vertical-center behavior; `<Card elevated={true} class="max-w-2xl w-full">` provides the moment-of-confirmation depth (D-25-07); CardBody centers its children with `flex flex-col items-center text-center gap-md`.
- Composition top-to-bottom: CheckCircle2 (size 64, `--color-accent`, decorative `aria-hidden="true"`) → h1 "Thanks for reaching out!" (display font, NOT uppercase, sentence case per D-26-04) → body p with "48 hours" and "Looking forward" copy → primary Button (size lg, env-var Calendly href, target/rel external attrs) → "Return to homepage" text link styled via token utilities (text-text-muted → text-accent hover).
- Bare `title="Thanks!"` (NOT pre-suffixed `"Thanks! | Joel Shinness"`) — SEO.astro line 30 appends ` | Joel Shinness` automatically. Rendered `<title>Thanks! | Joel Shinness</title>` (single suffix). The v1 file's pre-suffixed title would have rendered as `Thanks! | Joel Shinness | Joel Shinness` — that latent bug is now fixed.

### /404 new page on BaseLayoutV2 (LEAF-03)

- Created `src/pages/404.astro` (74 lines). Astro auto-builds to `dist/404.html` which GitHub Pages serves on any missing route.
- Imports: BaseLayout/Card/CardBody/Button from v2 paths. **Zero icon imports** — the link-variant Button auto-renders `ArrowRight` per Phase 24 D-04, so no `@lucide/astro` import is needed at the page level.
- `<meta slot="head" name="robots" content="noindex">` (D-25-18) — uses BaseLayoutV2's existing `<slot name="head" />` (line 29) without adding a new layout prop. Content is `noindex` only, NOT `noindex, follow` (which design-system.astro uses); a true 404 should fully suppress indexing.
- Hero numeral: `<h1 class="font-display font-bold text-8xl md:text-9xl text-primary leading-none">404</h1>` — responsive scale (96px mobile → 128px md+). H2 tagline "This page wandered off." in `--color-text` (NOT muted — readable hierarchy per D-25-14).
- 2x2 destination grid: `grid grid-cols-1 md:grid-cols-2 gap-md` inside `max-w-4xl` container. 4 destinations in declared order (D-25-15): `/` (Home), `/projects` (Projects), `/blog` (Blog), `/faq` (FAQ). Each cell uses the **anchor-wraps-Card** pattern from BlogCard CR-02: outer `<a href={d.href} class="dest-card" aria-label="Go to ...">` carries the click target + focus ring + hover-lift; inner `<Card>` (NO `interactive` prop) carries the visual chrome; `<CardBody>` contains an `<h3>` label and a one-line `<p>` description.
- Contact CTA: `<Button variant="link" href="/#contact">Or get in touch</Button>` (D-25-16) — link variant auto-renders the ArrowRight icon (Phase 24 D-04 default). Acts as a soft 5th destination beneath the grid.
- Scoped `<style>` block adapted from BlogCard.astro lines 73-89: `.dest-card { display: block; text-decoration: none; color: inherit; transition: transform 200ms ease; border-radius: 0.5rem; }` + `:hover { transform: translateY(-2px); }` + `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }`. Border-radius matches Card's `rounded-lg` so the focus ring traces the right shape.
- **No banner chrome** (D-25-17): no `.blog-hero`, no `.page-hero`, no breadcrumbs. The numeral itself is the page chrome. Verified by C5 test asserting `page.locator('.blog-hero, .page-hero')` has count 0.

### Test spec extension (Sub-task 3A)

- Appended two new describe blocks to `tests/accessibility/v2-leaf.spec.ts` AFTER the existing `/faq` describe from Plan 25-01. The 25-01 block was not modified.
- `test.describe('v2 /thank-you (Plan 25-02)')` — 4 tests:
  - **B1 render + axe:** h1 contains "Thanks for reaching out!"; AxeBuilder with `wcagTags = ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']` yields empty violations array.
  - **B5 no-uppercase (D-25-09):** computed `text-transform` on h1 is `'none'` exactly.
  - **B3 Calendly CTA:** `getByRole('link', { name: /Skip the wait/ })` → href matches `/calendly\.com/`, target `_blank`, rel `noopener noreferrer`.
  - **B4 secondary link:** `getByRole('link', { name: 'Return to homepage' })` → href `/`.
- `test.describe('v2 /404 (Plan 25-02)')` — 5 tests:
  - **C1 render + axe:** h1 contains "404", first h2 contains "wandered off", AxeBuilder yields empty violations.
  - **C4 noindex:** `meta[name="robots"]` content attribute matches `/noindex/`.
  - **C2 destination grid:** `a.dest-card` count is 4; hrefs (in DOM order via `evaluateAll`) equal `['/', '/projects', '/blog', '/faq']`.
  - **C3 contact CTA:** `getByRole('link', { name: /Or get in touch/ })` → href `/#contact`; `link.locator('svg')` count is 1 (auto-rendered ArrowRight).
  - **C5 no banner chrome (D-25-17):** `page.locator('.blog-hero, .page-hero')` count is 0.
- Full 14-test suite passes (5 /faq + 4 /thank-you + 5 /404) with **zero axe-core violations** across all three routes. See "Issues Encountered" for the dev-server gotcha that initially showed 6 failures.

### Workflow env wiring (Sub-task 3B)

- Single-line addition to `.github/workflows/deploy.yml` under the `Build site` step `env:` block, directly below `PUBLIC_N8N_WEBHOOK_URL`:
  ```yaml
  PUBLIC_CALENDLY_URL: ${{ secrets.PUBLIC_CALENDLY_URL }}
  ```
- YAML indentation preserved exactly (10 spaces — same column as `PUBLIC_N8N_WEBHOOK_URL`).
- YAML validity confirmed via `node -e "yaml.load(...)"` (js-yaml).
- `pr-preview.yml` and other workflow files NOT touched (per RESEARCH — only `deploy.yml` has a build-step env block requiring this variable).
- **Action item for Joel post-merge:** Set the `PUBLIC_CALENDLY_URL` secret value in GitHub UI (Settings → Secrets → Actions). Until set, the env var resolves to `undefined` in CI and the fallback `https://calendly.com/joelshinness` is silently used (matches `PUBLIC_N8N_WEBHOOK_URL` behavior). This closes the source-code side of one of the three STATE.md `Pending Todos`.

## Task Commits

Each task was committed atomically on `worktree-agent-a174d0480e1b69bfb`:

1. **Task 1: Rewrite /thank-you on BaseLayoutV2 with elevated Card + env-var Calendly** — `fe255ce` (feat)
2. **Task 2: Create /404 page on BaseLayoutV2 with destination grid + noindex** — `d589933` (feat)
3. **Bug-fix discovered during Task 2 verification: stroke-width kebab-case on CheckCircle2** — `c6a7cfd` (fix) — Rule 1 deviation, separately committed
4. **Task 3: Extend v2-leaf.spec.ts + wire deploy.yml + (deferred) Pencil mirror** — `c642508` (test)

## Files Created/Modified

- **`src/pages/thank-you.astro`** — REWRITTEN in place (39 v1 lines → 41 v2 lines). v1 imports stripped; v2 BaseLayout/Card/CardBody/Button imported; `CheckCircle2` retained from `@lucide/astro` with kebab-case `stroke-width`. Frontmatter declares `calendlyUrl` from `import.meta.env.PUBLIC_CALENDLY_URL` with placeholder fallback. Single Card-based body section, no scoped `<style>` (all visuals via Tailwind utilities backed by v2 @theme tokens).
- **`src/pages/404.astro`** — NEW. 74 lines. Frontmatter declares `destinations` array (4 entries in declared order). Body has 3 sections: hero numeral + tagline, 2x2 destination grid, link-variant contact CTA. Scoped `<style>` block carries the `.dest-card` rules (block layout, hover-lift, focus ring per WCAG 2.4.7 / D-18).
- **`tests/accessibility/v2-leaf.spec.ts`** — EXTENDED (+85 lines). Pre-existing 80-line /faq describe block UNCHANGED. Appended two describe blocks: `'v2 /thank-you (Plan 25-02)'` (4 tests) and `'v2 /404 (Plan 25-02)'` (5 tests). Re-uses the existing `wcagTags` constant.
- **`.github/workflows/deploy.yml`** — MODIFIED (+1 line). Inserted `PUBLIC_CALENDLY_URL: ${{ secrets.PUBLIC_CALENDLY_URL }}` directly below `PUBLIC_N8N_WEBHOOK_URL` in the `Build site` step `env:` block. No other changes.

## Decisions Made

- **Bare title prop (RESEARCH OQ-2 fix-as-you-touch).** Passed `title="Thanks!"` (NOT `"Thanks! | Joel Shinness"`) and `title="Page not found"` (NOT `"Page not found | Joel Shinness"`) to BaseLayoutV2. The SEO component automatically appends ` | Joel Shinness` (line 30). Verified at build: `dist/thank-you/index.html` contains `<title>Thanks! | Joel Shinness</title>` (single suffix). The v1 `/thank-you` had the pre-suffixed pattern which would render as `Thanks! | Joel Shinness | Joel Shinness` — that latent bug is now corrected.

- **Inner Card NOT interactive on /404 destination grid (overrides UI-SPEC).** UI-SPEC line 222-223 says "Card polymorphic per Phase 24 D-05" / "interactive={true}". RESEARCH OQ-4 resolved this against the verified BlogCard precedent (CR-02 fix): outer anchor owns the focus ring + hover-lift; inner Card stays bare to avoid a double-tabindex stop. Implementation matches BlogCard.astro lines 29 + 73-89 verbatim (adapted from `.blog-card` to `.dest-card`). This is the only documented "deviation from UI-SPEC" in this plan.

- **stroke-width kebab-case on CheckCircle2.** `@lucide/astro` `IconProps` types require `stroke-width` (kebab-case), NOT `strokeWidth` (camelCase as React/JSX convention would suggest). RESEARCH Example 2 used `strokeWidth` which produced a real `ts(2322)` astro check error on Task 1's commit. Caught during Task 2 verification and fixed with a separate `fix(25-02)` commit (Rule 1 deviation). Result: astro check now reports 5 errors (all pre-existing in `CodeBlock.astro`, none in any phase-25 file) vs 6 errors before the fix.

- **`<meta slot="head" name="robots" content="noindex">` for /404 (NOT `noindex, follow`).** Design-system.astro line 48 uses `content="noindex, follow"` — that's correct for a non-public design-system page that should still let crawlers follow internal links. A true 404 should fully suppress indexing AND not signal "follow my links" since the page is a system-state error. Per D-25-18.

- **`&mdash;` HTML entity for em-dash.** Used `&mdash;` in `"Skip the wait &mdash; book a call"` Button label rather than the literal U+2014 character. Renders identically; entity form is more portable across editor encodings and grep-friendly.

- **Sub-task 3C deferred — Pencil MCP tools not invocable.** The system reminder announces the Pencil MCP server (with tools like `pencil__open_document`, `pencil__batch_design`, `pencil__snapshot_layout`), but those tool names are not exposed as callable functions in this executor agent's tool schema. The only tools available are `Read`, `Write`, `Edit`, `Bash`. Per the plan's explicit contingency clause ("If Pencil MCP is unavailable in the execution environment, log the omission in the SUMMARY.md and flag for manual completion; do not block the phase"), Sub-task 3C is deferred. Flagged below in "Pending Manual Completion".

## Deviations from Plan

### Rule 1 — Bug fix discovered during Task 2 verification

**1. [Rule 1 — Bug] CheckCircle2 stroke-width camelCase produced ts(2322) error**

- **Found during:** Task 2 verification (`npm run astro check` after building with new /404 page)
- **Issue:** Task 1 commit `fe255ce` used `<CheckCircle2 size={64} strokeWidth={2} ... />` per RESEARCH Example 2 markup. @lucide/astro `IconProps` types require kebab-case `stroke-width`. astro check error: `ts(2322): Property 'strokeWidth' does not exist on type 'IntrinsicAttributes & IconProps'. Did you mean ''stroke-width''?` The build still succeeded (Astro/Vite passes through unknown attrs), but the type error is real.
- **Fix:** Changed `strokeWidth={2}` to `stroke-width={2}` (single attribute character swap).
- **Files modified:** `src/pages/thank-you.astro` (line 19)
- **Verification:** `npm run astro check` error count went from 6 → 5; the 5 remaining errors are all in `src/components/design-system/CodeBlock.astro` (pre-existing per 25-01 SUMMARY) and unrelated to phase 25. No phase-25 file has any astro check error.
- **Committed in:** `c6a7cfd` (separate `fix(25-02)` commit per atomic-commit protocol)
- **No checkpoint needed** — Rule 1 auto-fix.

### Deferred sub-task (documented per plan contingency)

**2. [Documented — not a Rule 1-4 trigger] Sub-task 3C Pencil mirror deferred**

- **Found during:** Task 3 — when about to invoke `pencil__open_document`
- **Issue:** The Pencil MCP server is announced in the system reminder, but the tool functions (`pencil__open_document`, `pencil__find_empty_space_on_canvas`, `pencil__batch_design`, `pencil__snapshot_layout`, `pencil__get_editor_state`, etc.) are NOT exposed as callable functions in this executor agent's tool schema. The only tools available are: Read, Write, Edit, Bash. Attempting to use Read/Grep on the encrypted `.pen` file would violate the MCP server's instructions ("never use Read or Grep on .pen files").
- **Fix:** Per the plan's explicit contingency clause ("If Pencil MCP is unavailable in the execution environment, log the omission in the SUMMARY.md and flag for manual completion; do not block the phase"), Sub-task 3C is deferred. Code-side deliverables (Sub-task 3A test spec + Sub-task 3B deploy.yml) are complete.
- **Files affected:** `design/design-system.pen` (unchanged from before this plan)
- **Pending manual work:** See "Pending Manual Completion" section below.
- **No commit needed** — no code change.

### Deviation from UI-SPEC (documented in plan, pre-approved)

**3. [Pre-approved — RESEARCH OQ-4 resolution] /404 inner Card is NOT `interactive={true}`**

- **Found during:** Task 2 (consulted PATTERNS critical note + BlogCard.astro implementation)
- **Issue:** UI-SPEC line 222-223 says inner Card uses `interactive={true}`. PATTERNS critical note + RESEARCH OQ-4 explicitly override this: BlogCard CR-02 fix removed `interactive={true}` from the inner Card in favor of the outer anchor carrying the focus ring + hover-lift, to avoid the double-tabindex stop inside the `<a>`.
- **Fix:** Implemented per BlogCard precedent verbatim — inner Card is bare, outer `<a class="dest-card">` carries `.dest-card:focus-visible { outline: 2px solid var(--color-accent); }` and `.dest-card:hover { transform: translateY(-2px); }`.
- **Files affected:** `src/pages/404.astro`
- **Verification:** C2 test asserts 4 `a.dest-card` elements (1 tab stop per card, NOT 2). All 14 tests pass.
- **No commit needed for the deviation itself** — landed naturally in Task 2 commit `d589933`. Documented here per output `<output>` directive in the plan.

---

**Total deviations:** 1 Rule 1 (bug fix, separately committed), 1 deferred (contingency-clause-allowed), 1 pre-approved UI-SPEC override (documented in plan ahead of time).
**Impact on plan:** Zero functional impact on shipped pages. All `must_haves.truths`, `must_haves.artifacts`, and `must_haves.key_links` from the plan frontmatter remain satisfied. All other verify steps and acceptance criteria pass.

## Issues Encountered

### Stale dev server on port 4321 caused 6 initial Playwright failures (resolved)

- **Symptom:** First `npx playwright test tests/accessibility/v2-leaf.spec.ts` run reported 6 failures across /thank-you and /404 tests. All 5 /faq tests passed. /thank-you errors showed v1 markup (`class="btn btn-turquoise inline-block"`, `bg-bg-light dark:bg-bg-dark`) — meaning the tests were hitting the OLD code, not my freshly-rewritten file.
- **Root cause:** A pre-existing `npm run dev` process (PID 67267) had been running since 11:08 AM (before this worktree was created) against the **main project root** at `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/src/pages/`, NOT this worktree's `.claude/worktrees/agent-a174d0480e1b69bfb/src/pages/`. Astro dev's HMR can't pick up files in a different working tree. Playwright's `webServer.reuseExistingServer: true` (config line 33) saw the running server on 4321 and used it as-is, serving the stale v1 code. The /faq tests passed because /faq.astro in the main project root was already migrated to v2 (Plan 25-01 commits landed on the main branch before this worktree was created).
- **Fix:** Started a fresh `npx astro preview --port 4322` from the worktree (after `npm run build`), wrote an ephemeral `playwright.config.temp.ts` overriding `baseURL: 'http://localhost:4322'` and removing the `webServer` block, then `npx playwright test --config=playwright.config.temp.ts`. **All 14 tests passed (3.6s).** Then cleaned up: deleted `playwright.config.temp.ts` and killed the preview process.
- **No deviation classification:** This is a worktree/dev-server isolation issue, not a code bug. The shipped tests work correctly when run in CI (where `reuseExistingServer` is false and Playwright always starts a fresh dev server) or in a standalone environment.
- **Recommendation for future executor agents in worktrees:** Either (a) the plan's verify step should explicitly use `astro preview` on a non-default port, or (b) the executor framework should arrange isolated dev-server lifecycle. Documented for awareness; not blocking.

### Pre-existing astro check errors in CodeBlock.astro unchanged

- `npm run astro check` reports 5 errors, all in `src/components/design-system/CodeBlock.astro` (TypeScript narrowing issues on `CodeLanguage` and `Element.style`). Identical count and locations as noted in 25-01 SUMMARY (which reported 6 — the extra 6th was the `thank-you.astro strokeWidth` error I introduced in Task 1 and fixed in `c6a7cfd`). Not a phase-25 file; unchanged by this plan.

## User Setup Required

### Pending Manual Completion

**1. Set `PUBLIC_CALENDLY_URL` secret in GitHub Settings (Joel-action)**

The code-side wiring is now complete (`deploy.yml` references `${{ secrets.PUBLIC_CALENDLY_URL }}` in the build env). Until the secret is set in GitHub UI → Settings → Secrets and variables → Actions, the env var resolves to `undefined` in CI and `/thank-you` deploys with the placeholder fallback URL `https://calendly.com/joelshinness`. Same behavior as `PUBLIC_N8N_WEBHOOK_URL` before its secret was set.

This closes the source-code side of one of the three `STATE.md > Pending Todos`. The actual Calendly URL value (Joel's real booking page) remains a deployment-time configuration action, NOT a code deliverable for any future phase.

**2. Pencil mirror (D-25-22) — `design/design-system.pen` extension**

Sub-task 3C deferred because Pencil MCP tools are not callable in this executor environment. Manual completion required:

- Open `design/design-system.pen` via Pencil app (or via Pencil MCP in an environment where it's exposed as callable functions).
- Add **`/404` page frame**: render the shipped `src/pages/404.astro` visual — large "404" numeral in display font (~text-8xl scale), tagline "This page wandered off." below, 2x2 grid of 4 cards (Home / Projects / Blog / FAQ with description sub-lines), and "Or get in touch →" link-style button at bottom. Use existing Pencil variables only (`--color-primary`, `--color-text`, `--color-text-muted`, `--color-surface`, `--color-accent`, `--font-display`, `--font-text`).
- Add **FAQ accordion-row variant**: one borderless `<details>` row in two states — closed (question + ChevronDown right-aligned) and open (question + ChevronDown rotated 180deg + answer body below). 1px `--color-border` bottom divider visible.
- Do NOT introduce new Pencil variables (D-25-22 explicit: Phase 25 ships zero new tokens).

**Effort estimate:** ~10-15 minutes via Pencil app or Pencil MCP in a properly-tooled environment.

## Next Phase Readiness

**Phase 25 status: ALL 3 LEAF requirements complete.**

- ✅ LEAF-01 (Plan 25-01): `/faq` migrated to BaseLayoutV2 with Crito-faithful banner + divider-list accordion + FAQPage JSON-LD
- ✅ LEAF-02 (Plan 25-02): `/thank-you` migrated to BaseLayoutV2 with elevated Card + env-var Calendly URL
- ✅ LEAF-03 (Plan 25-02): `/404` created on BaseLayoutV2 with hero numeral + destination grid + noindex

**All Phase 25 routes (/faq, /thank-you, /404) pass axe-core with zero WCAG 2.x AA violations (Phase success criterion #4).** Lighthouse 90+ thresholds will be validated by CI on PR merge (success criterion #4 second half — deferred to CI per standard practice).

**Plan 25-02 must_haves all satisfied:**
- `truths` 1-11: all confirmed via grep + build + playwright + dist inspection
- `artifacts`: `src/pages/thank-you.astro`, `src/pages/404.astro`, `tests/accessibility/v2-leaf.spec.ts`, `.github/workflows/deploy.yml` all exist with the specified `contains` / `contains_also` strings
- `key_links` 1-5: all pattern grep regexes match (Calendly env var, Calendly button attrs, noindex meta, dest-card destinations, contact CTA, deploy.yml secret reference)

**Truth 11 (`design/design-system.pen` extension) NOT satisfied** — Sub-task 3C deferred per contingency clause. Flagged for manual completion above.

**No blockers for Phase 27 (/projects index + service pages).** The anchor-wraps-Card pattern is now triple-proven (BlogCard, dest-card on /404) and ready for the projects card grid. The `.blog-hero` page-header banner pattern is now used on /blog index + /blog tags + /faq — a 4th consumer in Phase 27 would justify the rename to `.page-hero` discussed in RESEARCH OQ-1.

**Open Pending Todos (STATE.md):**
- Configure n8n webhook — `PUBLIC_N8N_WEBHOOK_URL` env var (still pending; Phase 28 concern)
- ✅ **Calendly URL code-side wiring** — closed by this plan (workflow env line + env-var-with-fallback in /thank-you source)
- Calendly URL value setting — Joel-action, pending (see "Pending Manual Completion" above)
- Add real social links (Instagram, Substack URLs) — still pending (Phase 28 concern)

---
*Phase: 25-leaf-page-migrations-faq-thank-you-404*
*Plan: 02*
*Completed: 2026-05-21*

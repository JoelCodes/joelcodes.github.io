# Pitfalls Research

**Domain:** Full visual overhaul + parallel component-library migration on Astro 5 / Tailwind v4 static site
**Researched:** 2026-05-14
**Confidence:** HIGH (grounded in actual codebase, verified against Astro 5 / Tailwind v4 behavior)

---

## Critical Pitfalls

### Pitfall 1: Color Contrast Regression in New Palette

**What goes wrong:**
The new Crito-derived palette replaces the OKLCH system in `global.css` (yellow/turquoise/magenta at verified contrast ratios). If v2 tokens ship before contrast is checked, every page that migrates may silently fail WCAG 1.4.3 (4.5:1 for normal text, 3:1 for large text) and 1.4.11 (3:1 for UI components and focus indicators). The current Button focus ring uses `var(--color-text-light)` as the ring color — if the new palette doesn't define an equivalent high-contrast neutral, every interactive element on migrated pages loses its WCAG 2.4.13-compliant focus ring at once.

**Why it happens:**
Designers pick palette colors in isolation against a white frame in Pencil/Figma. The Crito reference was a Figma community template — contrast compliance was never a design requirement for it. When the token file lands in `global.css`, there is no build-time enforcement; axe-core only catches it after the page renders with real content.

**How to avoid:**
Before writing a single v2 component, run every new palette color through a contrast checker against the intended backgrounds (white for light mode). Define a companion token set equivalent to the current `--color-yellow-text` / `--color-turquoise-text` pattern: one perceptually-tuned value for decorative use, one WCAG-adjusted value for text use. Enforce ratios in the token-definition phase, not after component build.

**Warning signs:**
- axe-core violation: `color-contrast` rule fires on any migrated page
- New palette uses saturated mid-lightness colors (L ~0.55–0.70 in OKLCH) as body text color
- New heading color on white background doesn't pass `wcagcontrast.com` at 4.5:1

**Phase to address:**
Design System Foundation phase (the token-definition phase) — contrast must be validated before any v2 component is written.

---

### Pitfall 2: Focus States Disappearing During Component Migration

**What goes wrong:**
The v1.3 Button has a carefully constructed `focus-visible` ring via `box-shadow` on `.btn-front` (the inner span). This technique exists because the outer `.btn` wrapper is the focusable element but the inner span is what's visually styled. When v2 Button is built from the Crito structure (which almost certainly uses a simpler single-element button), the two-layer architecture changes. If the v2 Button's focus ring is implemented naively as `outline` on the button element without verifying the visual layer, the ring either disappears on custom backgrounds or fails the 3:1 contrast requirement (WCAG 2.4.13). The same applies to Input, Select, Textarea, and CheckboxGroup — all have variant-aware focus states that must be rebuilt explicitly.

**Why it happens:**
Focus state is often the last thing implemented when building a new component. The component "looks right" in a demo where keyboard navigation is never tested. axe-core catches missing `outline` but does not catch a present `outline: none` with an insufficient custom replacement.

**How to avoid:**
Every v2 interactive component must have a focus-visible spec written before implementation: what color, what width, what offset, what contrast ratio against what background. Test each component in isolation with keyboard-only navigation before it's used in a page. Add a Playwright test that tabs to every interactive element and asserts a visible focus indicator.

**Warning signs:**
- Component demo page shows buttons/inputs with no visible focus indicator during tab navigation
- `outline: none` present in v2 component CSS without a compensating `box-shadow` or `:focus-visible` ring
- axe-core passes but manual keyboard test shows no visible ring

**Phase to address:**
v2 Component Library Build phase — each component must be individually tested for keyboard accessibility before page migration begins.

---

### Pitfall 3: Tailwind v4 `@theme` Token Collision Between v1 and v2

**What goes wrong:**
The current `global.css` defines tokens in a single `@theme` block: `--color-yellow`, `--color-turquoise`, `--color-magenta`, `--font-heading`, `--font-body`, `--border-neo`, `--spacing-neo-*`. If v2 tokens are added to the same `@theme` block using overlapping names (e.g. renaming `--font-heading` to a new typeface while v1 components still reference it), every v1 component on unmigrated pages silently picks up the new value. This is the most dangerous single failure mode in the parallel-library strategy: one edit to `global.css` breaks all existing pages at once.

**Why it happens:**
In Tailwind v4, `@theme` is a global CSS custom property namespace. There is no scoping — all tokens are available everywhere. The natural impulse is to update the token file "to the new values" as the first step of the overhaul, but this is a big-bang approach disguised as token management.

**How to avoid:**
Introduce v2 tokens under a distinct namespace (`--v2-color-*`, `--v2-font-*`, or a short prefix matching the new brand name). Keep ALL v1 tokens unchanged in `global.css` until every page has migrated. Remove v1 tokens as a single cleanup commit after the last page migration is verified. This is not aesthetic — it is structural to the parallel-library strategy.

**Warning signs:**
- `--font-heading` in `@theme` points to a new font family while `/projects` still uses v1 components
- Any `@theme` change that touches a token name already used by v1 components
- Homepage migrates first; visiting `/blog` shows wrong fonts

**Phase to address:**
Design System Foundation phase — establish the v2 namespace convention before the first token is written. Cleanup (removing v1 tokens) happens in a dedicated "v1 component deletion" phase at the end of v1.4.

---

### Pitfall 4: Dual Font Loading Bloating CLS and Network Budget

**What goes wrong:**
The current `BaseLayout.astro` loads Bricolage Grotesque + DM Sans via a `print`-to-`all` swap technique (non-render-blocking). When v2 introduces a new font pair, both pairs get loaded simultaneously during the transition period — there are pages on v1 (Bricolage + DM Sans) and pages on v2 (new fonts) rendered in the same layout shell. If the new fonts are also loaded in `BaseLayout.astro`, every page carries both font payloads until migration completes. Each Google Fonts `link` request can add 50-150ms to first paint and multiple FOUT events if swap timing diverges.

**Why it happens:**
The impulse is to add the new font link to `BaseLayout.astro` early so v2 components render correctly on any page. But this penalizes every unmigrated page.

**How to avoid:**
Either (a) add the new font link only to migrated pages via a `<slot name="head" />` override until all pages migrate, then move it to `BaseLayout.astro`, or (b) complete font migration as one of the final steps by updating `BaseLayout.astro` only after all pages are on v2. Option (a) is preferable — it prevents any page from ever carrying both font stacks. Use `font-display: optional` for the new fonts during transition to avoid FOUT entirely.

**Warning signs:**
- Network tab shows 4+ font requests on any single page
- CLS score drops from 0 after font addition
- Lighthouse flags render-blocking resources pointing to two distinct Google Fonts origins

**Phase to address:**
v2 Component Library Build phase — establish the font-loading strategy before any page migrates. BaseLayout update happens in the final cleanup phase.

---

### Pitfall 5: Header/Footer Migrated at Different Times Creating Frankenstein Pages

**What goes wrong:**
The layout shell (`BaseLayout.astro`) imports `Header.astro` and `Footer.astro` from `src/components/layout/`. If the Header is migrated to v2 while some pages still use v1 components below it, every page becomes a visual mismatch: new nav style with old page body. Worse, if the Header migration changes the `#theme-toggle` button ID or removes it, the dark-mode Playwright tests that reference `page.locator('#theme-toggle')` silently break — the test will find no element and may fail to click anything rather than error.

**Why it happens:**
Header/Footer feel like "shared infrastructure" and are tempting early wins. But they are the highest-impact migration targets because they appear on every page.

**How to avoid:**
Header and Footer must be the LAST components migrated, after every page body is on v2. During the transition period, keep the v1 Header/Footer unchanged. If the new Header needs to be prototyped, create it as `src/components/v2/layout/Header.astro` and test it on a single page via layout override before swapping globally.

**Warning signs:**
- Any PR that modifies `src/components/layout/Header.astro` while unmigrated pages still exist
- Visual screenshot diff showing nav style mismatch with page content
- Playwright `#theme-toggle` locator failing to find element

**Phase to address:**
Navigation/Layout Migration phase — explicitly scheduled after all page-body migrations are verified. This phase should be its own checklist item, not bundled into the first page refactor.

---

### Pitfall 6: v1 Selectors in Playwright Tests Silently Passing After Migration

**What goes wrong:**
The axe-core tests in `tests/accessibility/axe-tests.spec.ts` test pages by URL and run axe against whatever is rendered — they will correctly catch new violations. However, `tests/accessibility/dark-mode.spec.ts` uses `page.locator('#theme-toggle')` to click the toggle before running axe. If v2 navigation removes or renames this element, the test will either (a) fail with `locator not found`, which is visible, or (b) silently skip the click because of a `waitForSelector` timeout, then run axe in light mode and report zero violations — giving a false pass in dark-mode coverage. Additionally, if v1.3 tests exist that target v1-specific CSS classes (e.g. `.btn-turquoise`, `.shadow-neo-yellow`), those tests will fail with `locator found 0 elements` after migration — but if tests used `.btn` as the selector, they pass on both v1 and v2 even if v2 Button has no accessible focus ring.

**Why it happens:**
Tests written for v1 components are too tightly coupled to implementation details. As v2 replaces v1, the tests don't fail loudly — they either fail for the wrong reason or continue to pass without testing the right thing.

**How to avoid:**
Before migrating each page, audit existing Playwright tests that target that page and identify selectors that will break or become vacuous. Write v2-aware selectors using ARIA roles (`page.getByRole('button', {name: 'Send Message'})`) rather than CSS classes or ID prefixes. Update the dark-mode test to use `page.getByRole('button', {name: /toggle theme/i})` or a `data-testid` that is stable across v1/v2. After migration, run tests against the migrated page and verify they test what they claim to test.

**Warning signs:**
- `page.locator('#theme-toggle').click()` — ID that lives inside a component being replaced
- Any test selector using `.btn-turquoise`, `.shadow-neo-*`, `hp-*` ID prefix, or other v1-specific tokens
- Test suite shows 0 failures during migration of a page that broke known interactions

**Phase to address:**
Each page migration phase — test update must be part of the definition of done for that phase, not deferred to a later cleanup.

---

### Pitfall 7: /design-system Page Showing v1 Components While Pages Use v2

**What goes wrong:**
The `/design-system` reference page (`src/pages/design-system.astro`) currently documents the v1.3 component library. During parallel migration, production pages will use v2 components while the design-system page still renders v1 Button, Card, Input, Badge, CheckboxGroup. This is low-stakes visually but creates a misleading reference that causes confusion when building v2 components: a developer checking the design system page sees v1 examples and may inadvertently copy v1 patterns. Additionally, the `design-system.json.ts` API endpoint exports v1 token data; if any external tooling or the Pencil MCP reads this endpoint, it gets stale data.

**Why it happens:**
The design-system page is low traffic and not part of the migration critical path. It gets deferred until "after everything else."

**How to avoid:**
Rebuild the `/design-system` page as part of the v2 component library phase — immediately after v2 components are built, not after pages are migrated. A design system page that demonstrates the new components is also a live integration test: if the v2 Button renders correctly on `/design-system`, it will render correctly anywhere.

**Warning signs:**
- `/design-system` shows old font (Bricolage Grotesque) while `/projects` shows new font
- `design-system.json` endpoint returns `--color-yellow` while code uses `--v2-color-primary`
- Someone building a v2 component copies the wrong variant name from the design-system reference

**Phase to address:**
v2 Component Library Build phase — `/design-system` rebuild is the final step of that phase, before any page migration begins.

---

### Pitfall 8: Contact Form Behavior Broken by Visual Reskin

**What goes wrong:**
The `homepage-contact-form` submit handler in `ContactSection.astro` queries DOM elements by ID: `hp-name`, `hp-email`, `hp-message`, `hp-form-error`, etc. The `validationConfig` object hardcodes these IDs. If the v2 ContactSection changes the ID prefix (e.g. from `hp-*` to `contact-*` to match v2 naming), the `document.getElementById('hp-name')` calls return `null`, the TypeScript casts `as HTMLInputElement` hide the null, and the form submits without validation — or the validation event listeners throw silent errors and form submission falls through to an unhandled state. The n8n webhook URL is read from `import.meta.env.PUBLIC_N8N_WEBHOOK_URL` at build time; if this environment variable is not set in the GitHub Actions workflow, the form silently uses the hardcoded fallback URL.

**Why it happens:**
The contact form is a high-priority functional element that everyone agrees "just needs to be reskinned." The instinct is to copy the visual structure from Crito and attach the existing JS. But DOM ID coupling means the JS must match the HTML exactly.

**How to avoid:**
Keep the existing `hp-*` IDs unchanged in the v2 ContactSection, OR update the JS and IDs together as a single atomic change with a Playwright end-to-end test that submits the form (mocked webhook) and asserts the `/thank-you` redirect. Never change IDs without updating all JS references in the same commit. Verify the `PUBLIC_N8N_WEBHOOK_URL` env var is present in the GitHub Actions build step.

**Warning signs:**
- Any v2 ContactSection HTML that removes or renames `id="hp-name"`, `id="hp-email"`, `id="hp-message"`, `id="hp-form-error"`, `id="homepage-contact-form"`
- `submitButton` TypeScript cast silently returning `null` (no TypeScript error because of the `as` cast)
- Form "submits" without triggering any feedback state (neither error nor redirect)

**Phase to address:**
Contact/Thank-You Migration phase — form behavior must be verified end-to-end before the phase is considered complete.

---

### Pitfall 9: SEO Component Orphaned When Pages Are Rewritten

**What goes wrong:**
`SEO.astro` is used via `BaseLayout.astro`, which means every page gets it automatically — but only the `title`, `description`, `canonical`, and `type` props. Pages that have additional structured data (the FAQ page has `FAQPage` JSON-LD injected via `<slot name="head" />`; the blog posts likely have `Article` schema) carry that extra schema in page-level slots. When page templates are rewritten, the `<slot name="head" />` override that contains the page-specific JSON-LD may be silently dropped. The `og:image` currently points to `/og-image.svg`; if v1.4 adds real photography, this token needs updating or all social shares still show the old placeholder.

**Why it happens:**
`BaseLayout.astro` handles the common case automatically, which makes it easy to forget the per-page `head` slot overrides. When copying a page from Crito structure, there's no Crito equivalent of the FAQPage schema — so it doesn't come along.

**How to avoid:**
For each page being migrated, explicitly audit the current `<slot name="head">` contents before starting the migration. Build a checklist: (1) page-specific JSON-LD present, (2) canonical prop passed correctly, (3) `og:type` set correctly for article vs. website. The FAQ page must retain its `FAQPage` JSON-LD. Blog post layout must retain `Article` schema if it exists. After migration, verify with Google's Rich Results Test or `astro check`.

**Warning signs:**
- `<head>` slot missing from a migrated page template that previously had one
- Google Search Console shows loss of FAQ rich results 2-4 weeks after launch
- `og:image` still shows `.svg` extension after photography is added

**Phase to address:**
Each page migration phase — SEO audit is part of the definition of done, not a separate cleanup.

---

### Pitfall 10: astro-expressive-code Config Lost During Blog Post Layout Migration

**What goes wrong:**
`astro-expressive-code` is configured in `astro.config.mjs` as an integration (`expressiveCode()`) and applies styles globally to all `<pre>` code blocks in MDX files. The `.prose pre` override in `global.css` adds `border-radius` on top of Expressive Code's own chrome. When the blog post layout (`[slug].astro`) is migrated to v2, two failure modes occur: (1) if the new post layout wraps content in a container that doesn't inherit the Expressive Code CSS injection, code blocks may render unstyled; (2) the `.prose` class name is used throughout `global.css` for all blog prose styles — if the v2 post layout uses a different class name or no wrapper class, ALL prose styling (h2 border-left, blockquote, inline code background) disappears at once.

**Why it happens:**
The prose styles in `global.css` are hardcoded to `.prose` — this is a convention from `@tailwindcss/typography` but in this codebase it's implemented manually. The class name is an implicit contract that nothing enforces.

**How to avoid:**
Keep the `.prose` wrapper class on whatever element wraps MDX content in the v2 post layout. If the class name needs to change, it must be a find-and-replace across `global.css` and the layout simultaneously. Test all blog prose elements (h2, h3, blockquote, inline code, code block, image, figcaption, hr) on a real post after migration. Also test the sticky TOC — it uses `.toc` class and `position: sticky` which is sensitive to ancestor overflow settings.

**Warning signs:**
- Code blocks render as unstyled monospace after layout migration
- Blog post headings lose the turquoise left-border accent
- TOC stops being sticky (ancestor element has `overflow: hidden` or `overflow: auto`)

**Phase to address:**
Blog Index + Post Layout Migration phase — must include a dedicated prose/code/TOC visual verification pass.

---

### Pitfall 11: CLS from Undeclared Image Dimensions

**What goes wrong:**
If v1.4 introduces real photography (hero, project screenshots, about photo), images without explicit `width` and `height` attributes cause Cumulative Layout Shift as they load. The current site is 100% Lighthouse because it uses no raster images in layout-critical positions. Adding a hero background image or a card thumbnail without proper sizing will immediately drop CLS from 0. The `<Image>` component from `astro:assets` handles this when used correctly, but raw `<img>` tags in MDX (blog post content) or in Astro component `<img>` elements do not get automatic sizing.

**Why it happens:**
Photography is often added late in a design phase ("just drop in the image"). The designer provides a URL or file; the developer writes `<img src="...">` without dimensions. The Lighthouse score looks fine on a fast connection but fails at simulated 3G.

**How to avoid:**
Use `<Image>` from `astro:assets` for all local images (it enforces `width`/`height` at build time). For external images or MDX-embedded images, always add `width` and `height` attributes. Add explicit `aspect-ratio` CSS to image containers as a CLS fallback. Hero images above the fold must be `fetchpriority="high"` to be the LCP element; without this, a smaller above-fold element may be LCP and the hero becomes an untracked CLS source.

**Warning signs:**
- Lighthouse CLS > 0.1 after adding any image
- `astro check` warnings about missing `width`/`height` on `<img>` elements
- LCP element in Lighthouse report is "text" rather than "image" when a hero image is present

**Phase to address:**
Any phase that introduces photography — also address in the Design System Foundation phase by establishing an image usage convention.

---

### Pitfall 12: LCP Regression from Hero Image Lazy Loading

**What goes wrong:**
Hero section images are the LCP element on most pages. If the hero image uses `loading="lazy"` (browser default for `<img>` outside viewport), the browser won't fetch it until layout is complete, adding 200-500ms to LCP on typical connections. `astro:assets` `<Image>` component defaults to `loading="lazy"` and `decoding="async"` — correct for below-fold images but wrong for the first above-fold image on every page.

**Why it happens:**
Lazy loading became "best practice" broadly, and developers apply it globally. `<Image loading="lazy" />` in a hero is a common mistake in Astro projects.

**How to avoid:**
The LCP image (hero image, project detail hero, blog post featured image when above fold) must have `loading="eager"` and `fetchpriority="high"` explicitly. Add a `<link rel="preload" as="image">` in `<head>` for the hero image on the homepage (static, always the same image). Use Astro's `<Image>` component with explicit `widths` and `sizes` for responsive images.

**Warning signs:**
- Lighthouse LCP > 2.5s after adding hero images
- DevTools Network tab shows hero image starting to download after first paint
- Lighthouse "Preload LCP image" opportunity appears in diagnostics

**Phase to address:**
Homepage Migration phase — must include an explicit LCP image audit. Same check in each subsequent page migration phase.

---

### Pitfall 13: Animation Libraries Inflating TBT

**What goes wrong:**
The Crito template (a Figma community design) may imply animations that feel natural to implement with a library like AOS, GSAP, or Framer Motion. Any JS animation library added to an Astro static site adds to Total Blocking Time because the library initializes on the main thread. The current site achieves 0 TBT by using CSS transitions only (`animation: fadeInScale 300ms ease-in-out` in `global.css`, CSS `transition` on buttons). Adding even a small animation library can move TBT to 50-150ms and drop Lighthouse Performance from 100 to 90-95.

**Why it happens:**
Scroll-triggered animations are a defining visual feature of agency-style templates. The impulse is to use a library to reproduce them "properly."

**How to avoid:**
Use CSS `@keyframes` + `animation-timeline: scroll()` (Scroll-Driven Animations, supported in modern browsers) or Intersection Observer + CSS classes for scroll animations. Reserve JavaScript for interactivity, not animation. If a JS animation library is genuinely needed, use a budget: run Lighthouse TBT before and after each library addition. TBT must stay below 50ms.

**Warning signs:**
- `package.json` gaining AOS, GSAP, animate.css, or framer-motion
- Lighthouse TBT > 50ms after a phase addition
- Lighthouse "Minimize main-thread work" diagnostic pointing to animation code

**Phase to address:**
v2 Component Library Build phase — animation strategy must be defined before components are built, not added retroactively.

---

### Pitfall 14: Pencil-to-Code Token Name Drift Over Multiple Phases

**What goes wrong:**
Pencil stores design tokens as variables in the `.pen` file. Code stores tokens as CSS custom properties in `global.css`. As the milestone spans multiple phases, the names diverge: the Pencil file has `color/primary/500`, the code has `--v2-color-primary`. By Phase 3 of v1.4, no one remembers the mapping. New components are built from screenshots instead of token references, leading to hardcoded hex values in component CSS ("close enough to the design"). By the time the /design-system page is rebuilt, the documented tokens don't match what components actually use.

**Why it happens:**
There is no enforcement mechanism linking Pencil variables to CSS custom properties. The mapping lives in someone's head.

**How to avoid:**
Create a token mapping document (a table in ARCHITECTURE.md or a dedicated `TOKENS.md` in `.planning/`) that maps every Pencil variable name to its CSS custom property name before implementation begins. Treat this mapping as binding: if the Pencil file uses `color/surface/base`, the CSS token must be `--v2-color-surface-base`. Any discrepancy is a bug, not a style choice. Include this mapping in phase verification criteria.

**Warning signs:**
- Hardcoded hex or OKLCH values appearing in component `<style>` blocks instead of var() references
- PR review shows a color value that doesn't appear in `global.css` `@theme`
- Pencil `.pen` file updated but `global.css` not updated in the same commit

**Phase to address:**
Design System Foundation phase — token mapping table established before any component is built.

---

### Pitfall 15: Scope Creep — "While We're In There" Expansion

**What goes wrong:**
Each page migration creates a context switch into that page's code. Common expansions: "while migrating the Projects index, let me also add real project screenshots" (now Projects migration depends on photography production); "while rebuilding Contact, let me redesign the 8-field form layout" (now Contact migration is both visual and functional); "while migrating the Blog index, let me add pagination" (now Blog migration requires a new data-loading pattern). Each expansion adds dependencies, changes the scope of verification, and risks the accessibility and Lighthouse bars.

**Why it happens:**
Page migration is an opportunity moment. The code is open, the context is loaded, the improvement is obvious. These additions feel trivial but each one adds a non-trivial decision surface.

**How to avoid:**
Each phase has a strict scope: migrate the visual presentation to the v2 library, carry content and functionality unchanged. If an enhancement is genuinely valuable, it goes on the v1.5 backlog. Use a "parking lot" note in the phase plan: "Enhancement considered but deferred to v1.5: [description]". The definition of done for each phase explicitly includes "no new functionality added."

**Warning signs:**
- Phase plan has more than 5 tasks for a single-page migration
- Phase introduces a dependency on a non-code asset (photography, copy)
- A page migration phase includes the word "redesign" rather than "migrate"

**Phase to address:**
Every migration phase — each phase definition must include an explicit scope boundary.

---

### Pitfall 16: Dark Mode Dead Code Left Active During v1.4

**What goes wrong:**
`global.css` contains extensive dark mode utilities: `@custom-variant dark (&:where(.dark, .dark *))`, `.dark` prefixed selectors throughout, the dark mode FOUC prevention script in `BaseLayout.astro`, and the `#theme-toggle` button in the Header. v1.4 is explicitly light-mode only, but none of this code is removed. Dark mode token variants (`--color-yellow-dark`, etc.) continue to compile into the CSS bundle. Users who have OS-level dark mode preference will get a dark-mode toggle that applies v1 dark styles to v2 pages until the toggle is removed — creating visual corruption that's hard to debug because it only affects users with dark OS preference.

**Why it happens:**
Removing dark mode infrastructure feels out of scope for a visual overhaul. "We'll clean it up when we add dark mode back in v1.5." But the dark mode script runs before body render and adds `.dark` to `<html>` — so v2 pages get dark styles applied on first paint for ~30% of users.

**How to avoid:**
In the Design System Foundation phase, explicitly remove (or disable) the dark mode script from `BaseLayout.astro` and the `#theme-toggle` from Header. Remove the `@custom-variant dark` line from `global.css`. Keep the v1 dark mode token definitions in place during transition (they're needed for unmigrated pages), but gate them: wrap them in a feature flag comment and remove them in the v1 component cleanup phase.

**Warning signs:**
- A user with OS dark preference reports pages looking "broken" or "mixed"
- Playwright dark-mode tests running against v2 pages — they toggle a toggle that shouldn't exist
- `@custom-variant dark` still in `global.css` after all pages have migrated

**Phase to address:**
Design System Foundation phase — dark mode infrastructure removal is a first-pass task, not last.

---

### Pitfall 17: Astro Scoped Style Collisions Between v1 and v2 Components

**What goes wrong:**
Astro scopes component styles using a data attribute (`data-astro-cid-*`). When v1 and v2 components coexist on the same page (e.g., v2 hero with v1 contact form in the same page template), their CSS is both injected into the page. If v2 uses a class name that also exists in v1 (e.g., both define `.btn-front` in `<style>` blocks), one component's scoped style may unintentionally match the other in edge cases. The more likely issue: v2 components using `<style is:global>` or `:global()` selectors will leak into v1 components on the same page.

**Why it happens:**
Scoped styles feel safe, so developers become relaxed about class name uniqueness. Adding `:global()` is a quick fix for "my styles aren't applying" without understanding the leak surface.

**How to avoid:**
Never use `<style is:global>` in v2 components. Use `:global()` sparingly and only for intentional overrides (e.g., reaching inside `slot` content). Prefer CSS custom properties for cross-component theming over class-based overrides. During the transition period when v1 and v2 coexist, run a visual regression check on each page after adding a v2 component to verify no v1 element visual changed.

**Warning signs:**
- `<style is:global>` appearing in any v2 component file
- `:global()` selector in a v2 component that targets a v1 component's class name
- v1 Button visual changing on a page that was not modified in the current PR

**Phase to address:**
v2 Component Library Build phase — style isolation rules established as a component authoring standard.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcode hex values in v2 component styles | Faster to implement | Token drift; can't change palette later | Never |
| Skip axe-core test update during page migration | Less test-writing time | False confidence in accessibility coverage | Never |
| Add new v2 fonts to BaseLayout immediately | v2 pages look right everywhere | All unmigrated pages carry dual font payload | Never |
| Reuse v1 component inside a v2 page temporarily | Faster page migration | Frankenstein visual; unclear migration status | Only if visually isolated and explicitly temporary (named in phase plan) |
| Copy ContactSection HTML from Crito without the JS | Fast structure | Form completely non-functional | Never |
| Leave dark mode script active during v1.4 light-mode-only period | Less upfront work | v2 pages break for dark-OS users | Never |
| Use `document.querySelector('.btn')` instead of specific IDs | Looks like clean refactor | Breaks if v1 and v2 components coexist on the page | Never during parallel migration |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| n8n webhook | Remove `hp-*` ID prefix from form fields during visual cleanup | Keep all `hp-*` IDs unchanged OR update all JS references in same commit + e2e test |
| n8n webhook | Forget to verify `PUBLIC_N8N_WEBHOOK_URL` env var in GitHub Actions | Check `.github/workflows/*.yml` explicitly; test with a form submission in staging |
| Google Fonts | Load both v1 and v2 font families in BaseLayout during transition | Load new fonts only on migrated pages via `<slot name="head">` until all pages migrate |
| astro-expressive-code | Remove `.prose` wrapper class from blog post layout | Keep `.prose` class or update all 30+ `.prose` selectors in global.css atomically |
| Astro sitemap integration | Sitemap still generates even if canonical URLs break | Verify `<link rel="canonical">` on each migrated page resolves correctly; check sitemap.xml after build |
| GitHub Pages / GitHub Actions | `PUBLIC_N8N_WEBHOOK_URL` secret not added to build step | Confirm secret exists in repo Settings → Secrets; confirm workflow passes it to `astro build` |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Hero image without `fetchpriority="high"` | LCP > 2.5s in Lighthouse | `<Image fetchpriority="high" loading="eager">` on first above-fold image | Any page with photography above the fold |
| JS animation library (AOS, GSAP, etc.) | TBT > 50ms; Lighthouse Performance < 95 | CSS-only animations; Intersection Observer + class toggle | Any page importing an animation package |
| Dual Google Fonts loading | CLS from font swap; extra network requests | Fonts added to BaseLayout only after all pages migrate | During parallel migration period |
| Undeclared image dimensions in MDX | CLS > 0.1 in blog posts with images | Always specify width/height on `<img>` in .mdx files | Any blog post with inline images |
| `<Image loading="lazy">` on LCP element | Delayed LCP; Lighthouse opportunity warning | Explicit `loading="eager"` on above-fold images | Homepage hero, blog post featured image |

---

## "Looks Done But Isn't" Checklist

- [ ] **v2 Token namespace**: All v2 tokens use a distinct namespace prefix that doesn't collide with `--color-yellow`, `--font-heading`, `--border-neo-*`, `--spacing-neo-*` — verify in `global.css`
- [ ] **Focus states**: Every v2 interactive component (Button, Input, Select, Textarea, CheckboxGroup, nav links) has a visible focus ring tested with keyboard-only navigation
- [ ] **Contact form IDs**: `hp-name`, `hp-email`, `hp-message`, `hp-form-error`, `homepage-contact-form` are present in v2 ContactSection (or JS is updated to match new IDs)
- [ ] **FAQ JSON-LD**: `FAQPage` structured data in `/faq` page head slot survived template migration
- [ ] **Blog prose wrapper**: `.prose` class on MDX content wrapper in v2 blog post layout — or `global.css` prose selectors updated to match new class name
- [ ] **Sticky TOC**: TOC still sticks after layout change — no ancestor with `overflow: hidden`
- [ ] **Dark mode removed**: `document.documentElement.classList.toggle("dark")` script and `#theme-toggle` button removed from BaseLayout/Header for v1.4 light-mode pages
- [ ] **axe-core tests updated**: All Playwright test selectors updated to ARIA roles or stable `data-testid` attributes — no v1 CSS class selectors remaining
- [ ] **No hardcoded colors**: Zero hex or OKLCH literal values in v2 component `<style>` blocks — only `var(--v2-*-*)` references
- [ ] **LCP image preloaded**: Homepage hero has `fetchpriority="high"` or `<link rel="preload" as="image">` in `<head>`
- [ ] **Sitemap canonical**: `astro.config.mjs` `site` property unchanged (`https://joelshinness.com`), canonical resolves correctly on every migrated page
- [ ] **`PUBLIC_N8N_WEBHOOK_URL`**: GitHub Actions workflow passes this env var to the build step — verify in `.github/workflows/`

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Token collision broke all v1 pages | HIGH | `git revert` the `@theme` change; re-introduce tokens under namespaced names; re-migrate affected pages |
| Focus states missing from v2 components discovered post-launch | MEDIUM | Add `focus-visible` CSS to each affected component; redeploy; re-run axe suite |
| Contact form broken (IDs changed) | HIGH (lead-gen impact) | Hotfix: restore original `hp-*` IDs to v2 ContactSection; deploy immediately; do not attempt JS refactor under pressure |
| LCP regression from hero image | LOW | Add `fetchpriority="high"` and `loading="eager"` to hero image; one-line fix; redeploy |
| Dual font loading performance regression | MEDIUM | Move new font `<link>` tags from BaseLayout to per-page `<slot name="head">` overrides; redeploy |
| FAQ JSON-LD dropped | MEDIUM (SEO impact appears 2-4 weeks later) | Re-add `<script type="application/ld+json">` to FAQ page head slot; verify with Google Rich Results Test |
| Dark mode corrupting v2 pages for OS-dark users | MEDIUM | Remove dark-mode FOUC script from BaseLayout; remove `#theme-toggle`; remove `@custom-variant dark`; redeploy |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Color contrast regression | Design System Foundation | Run WebAIM contrast checker on all new tokens before writing first component |
| Focus state loss | v2 Component Library Build | Keyboard-only tab test on component demo page; axe-core scan on /design-system |
| `@theme` token collision | Design System Foundation | `grep -r 'var(--color-yellow\|--font-heading\|--border-neo\|--spacing-neo'` finds no v2 component using v1 token names |
| Dual font loading | v2 Component Library Build | Single-page Network tab shows only one Google Fonts request during transition |
| Frankenstein Header/Footer | Navigation/Layout Migration (last phase) | No Header/Footer changes in any page migration PR |
| Test selector rot | Each page migration phase | Test suite passes AND tests actually click/verify v2 elements (audit selectors) |
| /design-system showing v1 | v2 Component Library Build | `/design-system` updated as final step before page migrations start |
| Contact form IDs broken | Contact/Thank-You Migration phase | Playwright e2e form submission test passes (mocked webhook → /thank-you redirect) |
| SEO/JSON-LD dropped | Each page migration phase | `astro check` + manual `<head>` audit checklist for each page |
| Expressive Code / prose lost | Blog Migration phase | Render a real blog post and visually verify h2 accent, blockquote, code block, TOC |
| CLS from undeclared image dimensions | Any phase introducing photography | Lighthouse CLS = 0 after each phase with images |
| LCP from lazy hero image | Homepage Migration phase | Lighthouse LCP < 2.5s; `fetchpriority="high"` present on hero image element |
| Animation library TBT | v2 Component Library Build | Lighthouse TBT < 50ms; `package.json` audit for animation libraries |
| Token name drift | Design System Foundation | Token mapping table in planning doc; `grep` for hardcoded values in v2 component styles |
| Scope creep | Every phase | Phase definition includes explicit "not in scope" list; any addition requires milestone owner approval |
| Dark mode dead code | Design System Foundation | `grep -r 'localStorage.theme\|prefers-color-scheme'` returns zero results in BaseLayout after removal |
| Scoped style collisions | v2 Component Library Build | `grep -r 'is:global'` in v2 component files returns zero results |

---

## Sources

- Codebase direct inspection: `src/components/homepage/ContactSection.astro`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/ui/Button.astro`, `src/content.config.ts`, `src/components/SEO.astro`, `tests/accessibility/axe-tests.spec.ts`, `tests/accessibility/dark-mode.spec.ts`
- Project planning files: `.planning/PROJECT.md`, `.planning/MILESTONES.md`
- Astro 5 documentation: scoped styles behavior, `<Image>` component API, content collections, `<slot name="head">` pattern
- Tailwind v4 documentation: `@theme` as global custom property namespace, no scoping between `@theme` blocks
- WCAG 2.2 criteria: 1.4.3 (contrast minimum), 1.4.11 (non-text contrast), 2.4.7 (focus visible), 2.4.13 (focus appearance), 2.5.5 (target size)
- Lighthouse Core Web Vitals: CLS < 0.1, LCP < 2.5s, TBT < 50ms thresholds for green scores

---
*Pitfalls research for: v1.4 Design Overhaul — full visual reskin + parallel component migration on Astro 5 / Tailwind v4*
*Researched: 2026-05-14*

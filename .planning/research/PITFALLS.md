# Pitfalls Research

**Domain:** Full visual rebuild in place — Figma-sourced rebrand on an existing Astro 5 / Tailwind 4 static site with Lighthouse CI gates and live SEO
**Researched:** 2026-07-14
**Confidence:** HIGH — every pitfall is grounded in the actual codebase (`src/`, `global.css`, `BaseLayout.astro`, `astro.config.mjs`, `lighthouserc.json`) and cross-referenced against this project's documented failure history (v1.4 abandoned 2026-05-31, v2.0 abandoned 2026-07-14)

---

## Critical Pitfalls

### Pitfall 1: Design-Fidelity Drift — Eyeballing Figma Instead of Extracting Values

**What goes wrong:**
Implementation approximates the Figma design instead of transcribing it. Spacing becomes "looks like 24px," colors become "close enough," and Fraunces italic at 76px gets substituted with whatever the font-size token happens to be. Each individual approximation seems minor; the cumulative effect is a site that looks "generic" — the exact verdict that killed v1.4.

The specific failure mode for this site: `global.css` already has an `@theme` block with spacing tokens (`--spacing-neo-xs: 8px`, `--spacing-neo-sm: 12px`, etc.) and color tokens in OKLCH. When replacing them, the developer reads the Figma design and estimates values rather than copying the exact Figma variable values. The new tokens look plausible but are wrong by 4–16px on spacing and 5–15 OKLCH lightness units on colors.

**Why it happens:**
Reading the Figma source directly (via MCP or Figma desktop inspect panel) requires deliberate effort. Eyeballing is faster and feels accurate. Hover states, muted text colors, and border widths are particularly vulnerable because they fall below the perceptual threshold during visual review.

**How to avoid:**
Every color, spacing, and typography value in the new `@theme` block must be extracted from Figma variables, not approximated visually. Figma file ID `1tg8wIPcvOVC5tPZ8pkGO2` is the source of truth. Use the Figma MCP or Figma desktop inspect panel for exact OKLCH/hex values. Before implementation begins, write a token mapping document that lists: Figma variable name → CSS custom property name → numeric value. This mapping is the check against which each `@theme` definition is verified.

For hover states and dark mode variants not explicitly shown in Figma: flag the gap and ask Joel rather than inventing. This is the v1.4 lesson carried forward.

**Warning signs:**
- `@theme` values are multiples of 8 that weren't explicitly extracted (coincidence, not source)
- A color defined in `@theme` cannot be traced to a specific Figma frame and variable
- Spacing feels "about right" rather than "matches the number in Figma"
- Any hardcoded hex or OKLCH literal in a component `<style>` block instead of a `var()` reference

**Phase to address:**
Token Foundation phase (first phase of v3.0) — extraction methodology and token mapping table established before any component is written.

---

### Pitfall 2: "Close Enough" Visual Review — No Screenshot Comparison Workflow

**What goes wrong:**
Implementation is reviewed by looking at the browser and the Figma side-by-side informally. The developer says "looks right" and marks the phase done. Subtle drift accumulates across phases. By the time the full page is assembled, the type scale is off, the section spacing is wrong, and the wave background doesn't match — but no individual phase produced an obvious failure.

This is the documented v1.4 pattern: phases 23 and 24 implemented BaseLayoutV2, primitives, and a design-system page from best-guesses; fidelity was checked only at integration, at which point "didn't look like what was in the pencil file." Revert, two phases lost.

**Why it happens:**
There is no systematic comparison checkpoint in the phase definition. Approval is based on the phase plan being complete, not on a confirmed visual match.

**How to avoid:**
Every phase that produces visible UI must end with a side-by-side screenshot check: Figma frame exported at the same viewport width as the browser implementation, placed next to a browser screenshot, examined by Joel. This is not optional review — it is a required gate before the phase is marked done. The Figma MCP `get_screenshot` tool can extract frames directly. Use the Figma file Showcase page (`12:3`) and Landing page (`12:2`, dark variant `117:103`) as the comparison targets.

For components, compare the component in isolation on the `/design-system` page against the Figma Components frame (`36:5`).

**Warning signs:**
- A phase plan has no verification step that names a specific Figma frame to compare against
- Joel approved a plan but hasn't seen a side-by-side artifact
- Implementation was marked done after only a "looks good" comment in the phase log

**Phase to address:**
Every phase that produces visible UI — bake the comparison checkpoint into the definition of done, not the definition of "nice to have."

---

### Pitfall 3: Tailwind 4 `@theme` Token Collision — New Tokens Overwrite Old Before All Pages Migrate

**What goes wrong:**
The current `global.css` `@theme` block defines tokens with names like `--color-yellow`, `--color-turquoise`, `--font-heading`, `--font-body`, `--border-neo`, `--spacing-neo-*`. If v3.0 replaces these names with new values (Fraunces + Hanken Grotesk, sea-glass colors) while any page still references the old token names, those pages get the new token values the moment `global.css` is updated.

This is not hypothetical — the current site has multiple pages that use these tokens directly: `Hero.astro` uses `var(--color-yellow)` in `<style>` blocks, `BlogCard.astro` and `ProjectCard.astro` use Tailwind classes like `bg-yellow`, `border-text-light`. The moment `--color-yellow` becomes the new sea-glass color, every one of these renders wrong.

In Tailwind 4, `@theme` is a global CSS custom property namespace with no scoping. There is no "local @theme." One file, one namespace, everything affected simultaneously.

**Why it happens:**
The natural impulse is to update the token file as the first step of the rebrand. This feels like setting up the foundation. It is actually a big-bang change disguised as infrastructure.

**How to avoid:**
Introduce v3.0 tokens under a distinct namespace prefix — `--wl-` (Wavelength) or `--v3-` — and keep all existing v1/v2 tokens unchanged in `@theme` until every page and component has been migrated to the new namespace. Remove old tokens only in a dedicated cleanup phase after the last page migration is verified. The test: `grep -r "var(--color-yellow\|var(--font-heading\|var(--border-neo\|var(--spacing-neo" src/` returning zero results before old tokens are deleted.

**Warning signs:**
- Any `@theme` change that modifies a token already referenced in `src/` components
- `/blog` or `/projects` pages displaying wrong fonts after homepage migrates to new tokens
- `--font-heading` in `@theme` pointing to Fraunces while `Hero.astro` still uses `var(--font-heading)` for the old heading style

**Phase to address:**
Token Foundation phase — establish the namespace convention before the first v3.0 token is written. Token cleanup (deleting old tokens) is a named final phase, executed only after all pages are confirmed migrated.

---

### Pitfall 4: Fraunces Variable Font CLS from Optical Size Axis at 76px Display

**What goes wrong:**
Fraunces is a variable font with an optical size (`opsz`) axis in addition to weight and italic. At 76px display sizes (the Figma hero headline), the optical size axis shifts letterforms significantly — the font at `opsz=144` looks visually different from `opsz=12`. If the font is loaded without specifying the `opsz` range in the `@font-face` source or if the optical size doesn't activate because the CSS `font-optical-sizing: auto` is missing, the headline renders at the wrong optical variant.

More critically: if Fraunces is loaded from Google Fonts without the correct axis range query parameter, the font file served may not include the display-optical range, and the browser falls back to system font for the first 76px headline render, causing a significant FOUT. At 76px, a FOUT is visually jarring and measurable as CLS.

**Why it happens:**
Variable font axis parameters are easy to omit from the Google Fonts URL. The common pattern `family=Fraunces:ital,wght@0,300..900;1,300..900` does not include the optical size axis. The display looks "close" at standard zoom but the opsz behavior is missing.

**How to avoid:**
The Google Fonts URL must include the `opsz` axis range: `family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900`. Self-hosting is strongly preferred: download the variable font from Google Fonts, place it in `public/fonts/`, serve with `Cache-Control: max-age=31536000`, and write an `@font-face` declaration with `font-display: swap` and the full axis range. This avoids the third-party network dependency entirely and allows aggressive preloading via `<link rel="preload" as="font">`.

For the 76px hero headline specifically: add `font-optical-sizing: auto` in CSS (or explicitly set `font-variation-settings: 'opsz' 76`) on the element. Preload the Fraunces woff2 file in `BaseLayout.astro`'s `<head>` with `crossorigin`.

**Warning signs:**
- Google Fonts URL for Fraunces does not include `opsz` in the axis list
- Hero headline shows FOUT on first load (system font briefly visible before Fraunces loads)
- Lighthouse CLS > 0 on the homepage after Fraunces is added
- The headline at 76px looks optically heavier or lighter than the Figma design

**Phase to address:**
Token Foundation / Font Loading phase — self-hosting and preload strategy established before any component uses Fraunces.

---

### Pitfall 5: FOUC on GitHub Pages — Dark Mode Script Must Fire Before `<body>`

**What goes wrong:**
The current `BaseLayout.astro` already handles this correctly: the dark-mode FOUC prevention script is `is:inline` in `<head>`, runs before `<body>` renders, and adds `.dark` to `<html>` before any content is painted. This must be preserved exactly in v3.0.

The risk: during the token swap (Pitfall 3), a developer updates `BaseLayout.astro` to add the new `<link>` tags for Fraunces/Hanken Grotesk and accidentally moves the dark-mode script, wraps it in a condition, or converts it to a deferred script. The `.dark` class then fires after first paint, causing a flash from light to dark for all dark-mode users.

A second risk specific to this rebuild: `faq.astro` currently does NOT use `BaseLayout.astro` — it has its own full HTML shell (lines 49–121) with the dark-mode script duplicated inline. When `/faq` is removed from the site (the v3.0 IA replaces it with anchor navigation), this duplication becomes irrelevant. But if `/faq` survives in any form, this orphaned HTML shell is the source of future FOUC bugs because it's not updated when `BaseLayout.astro` changes.

**Why it happens:**
The dark-mode script's placement is a timing dependency that isn't documented visually. It looks like "just a script tag" and gets moved during refactoring. The `faq.astro` full-HTML-shell pattern exists because someone added the FAQPage JSON-LD schema outside the normal SEO component flow — a workaround that left a maintenance hazard.

**How to avoid:**
Add a comment in `BaseLayout.astro` immediately above the dark-mode script: `<!-- CRITICAL: must remain in <head>, before <body> — prevents dark-mode FOUC -->`. Any PR that moves this script must explicitly justify the move. For `faq.astro`: if the page survives into v3.0, convert it to use `BaseLayout.astro` and pass the FAQPage JSON-LD via `<slot name="head">`. If the page is removed, delete the file entirely — do not leave an orphaned HTML shell.

Test dark mode FOUC after every phase that modifies `BaseLayout.astro`: hard reload on a dark-mode OS preference and observe whether there is a white flash before the dark background appears.

**Warning signs:**
- The dark-mode script is in `<body>` or has `defer` or `type="module"`
- `faq.astro` still exists and has its own `<html>/<head>/<body>` structure while `BaseLayout.astro` was updated
- Playwright dark-mode test reports flash between light and dark on page load

**Phase to address:**
BaseLayout / Font Loading phase — any modification to `BaseLayout.astro` must preserve script placement; `faq.astro` handled in the IA/Navigation phase.

---

### Pitfall 6: Transition Flash When Adding Dark-Mode Color Transitions

**What goes wrong:**
A common "polish" step is adding `transition: background-color 200ms ease, color 200ms ease` to `body` so the dark/light toggle feels smooth. This looks correct in normal use. The bug: the transition fires on the initial page load too — so a dark-mode user sees the page render in light mode (before the FOUC script fires and adds `.dark`) and then animate to dark in 200ms. The transition turns a fast FOUC into a slow, visible, 200ms animated flash. On GitHub Pages (no server-side rendering), this is unavoidable if the transition is unconditional.

**Why it happens:**
The transition is added in global CSS on `body` without thinking about the initial load sequence. It works correctly when the toggle button is clicked because the class already exists. It misbehaves on first load because the transition is active before the class is applied.

**How to avoid:**
Do not add a `transition` on `body` for background/color changes in unconditional CSS. The correct pattern is to add the transition class only after the page has loaded: in the dark-mode toggle script, after `document.addEventListener('DOMContentLoaded', ...)` fires, add a `transitions-enabled` class to `<html>` which enables the transition. The CSS rule becomes `.transitions-enabled body { transition: background-color 200ms ease, color 200ms ease; }`. This ensures the transition only fires on user-initiated toggle, not on initial load.

**Warning signs:**
- `body { transition: background-color ... }` in `global.css` without a parent class gate
- Dark-mode users report a visible light-to-dark animation on page load
- Playwright test recording shows a color animation in the first 300ms of page load

**Phase to address:**
Dark Mode Implementation phase — establish the gated-transition pattern before any component-level color transitions are added.

---

### Pitfall 7: SVG Wave Background Not Adapting to Dark Mode

**What goes wrong:**
The hero's five-line SVG "frequency field" wave background uses stroke colors. In light mode the strokes are dark on light background; in dark mode they need to be light on dark background. If the SVG strokes are hardcoded as hex colors in the SVG markup (either inline or as an `<img src>` external file), the dark-mode variant has no way to change them.

Compounding this: if the SVG is loaded as `<img src="wave.svg">`, CSS `currentColor` and CSS custom properties inside the SVG are not accessible — they're treated as opaque images. The SVG strokes are completely inert to the site's dark mode class.

**Why it happens:**
SVG backgrounds created in Figma or generated programmatically often use explicit hex stroke colors. The developer exports the SVG and drops it in as `<img>` for simplicity.

**How to avoid:**
The wave SVG must be inline (rendered as SVG markup inside the Astro component, not as an `<img>` tag) so that its stroke colors can reference CSS custom properties: `stroke="var(--color-wave-line)"` where `--color-wave-line` is defined for both light and dark modes in `global.css`. Alternatively, use `currentColor` for strokes and set `color` on the container element via CSS. Never use `<img src="wave.svg">` for any SVG that needs theme adaptation.

Test the wave on both themes: light mode strokes must have 3:1 contrast against the light background; dark mode strokes must have 3:1 contrast against the dark background (WCAG 1.4.11 for graphical objects).

**Warning signs:**
- SVG wave loaded as `<img src="...svg">` in the Hero component
- SVG markup has hardcoded `stroke="#1A1A1A"` or any literal hex/rgb
- Wave is invisible or blends into the background in dark mode
- No `--color-wave-*` tokens in `global.css`

**Phase to address:**
Hero / Wave Background phase — inline SVG approach and theme-aware stroke tokens established from the start, not retrofitted.

---

### Pitfall 8: Sea-Glass Palette Contrast Failures with Axe-Core

**What goes wrong:**
Sea-glass and teal palettes use mid-lightness saturated colors (typically OKLCH L 0.55–0.70) that look vivid and fresh against white but fail WCAG 1.4.3 contrast at 4.5:1 for body text and 3:1 for large text. The current codebase already has evidence of this problem: `global.css` has `--color-turquoise-text: oklch(0.45 0.12 195)` noted as "4.5:1+ contrast on white for normal text" — meaning the display-level turquoise (`oklch(0.70 0.15 195)`) cannot be used for body text on white.

The new palette introduces a fresh set of sea-glass colors from the Figma design. Each one must be verified before being used as text color. Axe-core catches this, but only after the component is built and rendered. Building 8 components with wrong contrast ratios, then discovering the issue at the axe-core phase, means reworking all 8.

**Why it happens:**
Colors are picked for aesthetics in Figma, where they're typically shown as decorative elements (backgrounds, borders, badges) not as text colors. When translating to code, the same color gets used for text too because it "matches the design."

**How to avoid:**
For every color in the new palette that will be used as text, border on a light background, or UI component boundary, run the WCAG contrast ratio check before writing the first `@theme` definition. Use the `oklch()` values from Figma and check against the intended background. Define companion "text-safe" variants where needed (the `--color-*-text` pattern already established in `global.css`). Add axe-core to the definition of done for the Token Foundation phase, not as a later audit.

**Warning signs:**
- Any sea-glass color with OKLCH L > 0.60 used as text color on a white background
- axe-core `color-contrast` violation on any page after token swap
- Figma mockup shows a mid-saturation teal used for paragraph text

**Phase to address:**
Token Foundation phase — contrast check is part of token definition, not a post-build audit. Each token flagged as "text use" must have a verified contrast ratio in the token mapping document.

---

### Pitfall 9: Half-Migrated State — Old Tokens Leaking Into New Pages

**What goes wrong:**
Component migration happens page by page. After 3 of 6 pages are migrated, the site has a mixture: some pages use the new Fraunces/Hanken Grotesk stack and sea-glass palette, some still use Bricolage Grotesque/DM Sans and the neobrutalist palette. The Header and Footer (shared across all pages via `BaseLayout.astro`) become visually inconsistent: the new Header nav font doesn't match the body text on unmigrated pages.

Beyond aesthetics: the `global.css` in this period has both old and new token namespaces active. Any Tailwind utility class that maps to an old token (e.g., `bg-yellow`, `text-turquoise`) still resolves to old values. If a developer writes a new component and uses `bg-yellow` out of habit, they get the old color, not the new one.

**Why it happens:**
Parallel migration is the right strategy — it avoids big-bang changes — but requires rigorous tracking of which components are migrated and which aren't. Without that tracking, "is `bg-yellow` old or new in this context?" becomes ambiguous.

**How to avoid:**
Keep a migration status ledger (a simple table in the phase CONTEXT file or REQUIREMENTS) listing every component and page with status: MIGRATED / IN PROGRESS / PENDING. New components must only use the `--wl-*` (v3.0) namespace. Old components must not be modified except to migrate them. Header and Footer are migrated last, after all page bodies are on v3.0 tokens.

Linting check: `grep -r "bg-yellow\|bg-turquoise\|bg-magenta\|text-yellow\|shadow-neo" src/` — any result in a v3.0 component is a leak.

**Warning signs:**
- A new v3.0 component uses `bg-yellow` or `font-heading` (old tokens)
- The Header nav font looks different from the body text on the same page
- A page is marked "migrated" but grep shows old token references in its component files

**Phase to address:**
Every migration phase — the migration ledger is updated as part of each phase's completion criteria, not retroactively.

---

### Pitfall 10: Dead CSS/Components Left Behind After Migration

**What goes wrong:**
After all pages are migrated to v3.0, the old components (`Button.astro`, `Card.astro`, `Badge.astro`, `Input.astro`, `CheckboxGroup.astro` in `src/components/ui/`) still exist in the repository. The old `global.css` utilities (`shadow-neo-yellow`, `iso-shadow-*`, `shadow-neo-turquoise-hover`, etc.) still compile into every page's CSS bundle. The old `faq.astro` page still generates a route. The `/design-system` page (if not rebuilt) shows old components. All of this is dead code that increases bundle size, confuses future developers, and pollutes the CSS namespace.

The current `global.css` is 458 lines; much of it is v1.x-specific (`.project-card { display: none; }`, `.blog-card { display: none; }`, `@keyframes fadeInScale`, `.toc`, `.prose h1` with old font references). These will conflict with v3.0 styles if not removed.

**Why it happens:**
Deleting working code feels risky. "We might need it later" reasoning leads to permanent retention of dead code. The cost is invisible (it's not breaking anything) so the cleanup keeps getting deferred.

**How to avoid:**
Define a dedicated "v1 Component Deletion" phase at the end of the migration sequence. This phase's only job is deleting the old `src/components/ui/` components, removing old `global.css` utilities, and deleting orphaned pages. The deletion phase cannot start until every page is verified on v3.0 components. The test: after deletion, run `npm run build` with no errors, and `grep -r "var(--color-yellow\|var(--font-heading\|shadow-neo\|iso-shadow" src/` returns zero.

**Warning signs:**
- `src/components/ui/Button.astro` still exists after the homepage is migrated to v3.0 Button
- `global.css` still has `.iso-shadow` and `.shadow-neo-*` utilities after the last migration phase
- `src/pages/faq.astro` still generates a `/faq` route after the IA removes the page from nav
- CSS bundle size is similar before and after migration (dead CSS wasn't removed)

**Phase to address:**
Dedicated v1 Token/Component Cleanup phase — explicitly scheduled as the penultimate or final migration phase, not bundled into individual page migrations.

---

### Pitfall 11: Expandable Project Cards — Missing ARIA and Keyboard Traps

**What goes wrong:**
The v3.0 design calls for expandable project cards (the current `ProjectCard.astro` links to `/projects/[slug]`; the new design has in-place expansion). An expandable card without correct ARIA is an accessibility failure on axe-core and a keyboard usability disaster.

Specific failures:
- Card expand trigger missing `aria-expanded="true/false"`
- Expanded content panel missing `id` and the trigger missing `aria-controls="[panel-id]"`
- Expanded content is `display:none` or `visibility:hidden` rather than `hidden` attribute — axe-core still reports the content as hidden but the browser may include it in the accessibility tree inconsistently
- Tab focus gets trapped inside the expanded card and doesn't flow to the next card
- Card used as a `<div>` with a click handler instead of a `<button>` or `<details>` — not keyboard focusable without `tabindex="0"` and explicit `keydown` handler

The current `ProjectCard.astro` navigates to a slug page, so these issues don't exist yet. They will exist the moment the expandable pattern is implemented.

**Why it happens:**
Expandable components feel like "just CSS" — add `max-height: 0` on collapse, `max-height: auto` on expand, done. The accessibility layer (ARIA state, focus management) is treated as optional.

**How to avoid:**
Use the `<details>/<summary>` HTML element for the expand/collapse mechanism. It provides `aria-expanded` semantics natively, is keyboard focusable without extra work, and requires no JavaScript for basic show/hide. Add `<summary>` as the visible trigger with the card title; the expanded body is the `<details>` content. For animated expansion (CSS height transition), the `<details>` approach requires one JS line to sync the open state with a CSS class — still far less code than a full ARIA implementation from scratch.

If `<details>/<summary>` doesn't match the design (it has limited styling control for the marker triangle), use a `<button>` trigger with explicit `aria-expanded` and `aria-controls`, and ensure focus management: when the card collapses, focus returns to the trigger button.

SEO note: search engine crawlers do read content inside `<details>` elements. Do not use JavaScript-only expansion if SEO for project content matters.

**Warning signs:**
- Expandable card trigger is a `<div>` with an `onclick` attribute
- `aria-expanded` is missing or hardcoded to `"false"` without JavaScript updating it
- Tab navigation skips over the expanded content or gets stuck inside it
- axe-core reports `button-name` violation on the expand trigger

**Phase to address:**
Project Showcase / Expandable Cards phase — ARIA implementation is part of the component spec, not an accessibility review afterthought.

---

### Pitfall 12: IA Change — Removed Pages Breaking Inbound Links and Sitemap

**What goes wrong:**
v3.0 IA removes `/faq` from nav. The plan is "nav is Services / Showcase / About / Book a call." The question is whether `/faq` still exists as a routable page. Currently `src/pages/faq.astro` generates a `/faq` route; it has a FAQPage JSON-LD schema that generates FAQ rich results in Google Search. If the route is deleted without a redirect, any external link to `/faq` (including existing Google Search indexed results) gets a 404.

Similarly, if `/projects` is replaced by a Showcase section (anchor navigation on the landing page), `src/pages/projects/index.astro` and `src/pages/projects/[slug].astro` must either redirect or be preserved. The current `astro.config.mjs` already has a redirect from `/portfolio` to `/projects` — but Astro's `redirects` config produces `<meta http-equiv="refresh">` redirects for static output, not HTTP 301 redirects. GitHub Pages serves static files and cannot issue proper 301s; only the path-to-path redirects Astro generates work client-side.

The Astro sitemap integration (`@astrojs/sitemap`) will automatically include any new dev-hidden pages (Service Web `85:103`, Area Abbotsford `85:104`) if they are generated routes but not marked with `noindex`. A dev-hidden page in the sitemap and indexed by Google creates a permanent SEO mess.

**Why it happens:**
Route removal feels like a code deletion task, not an SEO task. Developers delete the `.astro` file and move on. The sitemap and redirect implications are invisible until Google Search Console flags 404s weeks later.

**How to avoid:**
For `/faq`: do not delete the page file. Instead, either keep the page with a canonical pointing to the landing page FAQ anchor, or add a meta-redirect page that sends users to `/#faq`. Preserve the FAQPage JSON-LD. Blog URLs (`/blog/*`) must not be touched — the migration context is clear that blog URLs must not break.

For `/projects` and `/projects/[slug]`: keep the routes as-is or add Astro redirects. If project detail pages move to a different path, add explicit redirects in `astro.config.mjs` before deleting the old pages.

For dev-hidden pages: exclude them from the sitemap explicitly using `@astrojs/sitemap`'s `filter` option. Add `<meta name="robots" content="noindex">` to each dev-hidden page as a belt-and-suspenders measure.

**Warning signs:**
- `src/pages/faq.astro` deleted without a redirect or preserved canonical
- `astro.config.mjs` `redirects` not updated before deleting any routed page
- `sitemap.xml` in the build output contains `/service-web` or `/area-abbotsford`
- Google Search Console reports new 404s 2–4 weeks after launch

**Phase to address:**
IA / Navigation phase — redirect and sitemap strategy must be defined before any page route is deleted. Dev-hidden pages must have sitemap exclusion written before they're built.

---

### Pitfall 13: Lighthouse CI False Pass — Performance Gate Tests Only Desktop Homepage

**What goes wrong:**
`lighthouserc.json` tests only `http://localhost/` (the homepage) with `preset: "desktop"`. It also has several audits disabled: `lcp-lazy-loaded: off`, `prioritize-lcp-image: off`, `render-blocking-insight: off`. This means:

1. A 76px Fraunces headline on the blog post page (`/blog/[slug]`) could have FOUT-induced CLS that Lighthouse never sees
2. The wave SVG background could block rendering on mobile without triggering any CI failure
3. The expandable project cards could have TBT from JavaScript that only appears on the showcase page, not the homepage
4. `loading="lazy"` on the blog post featured image (already present in `[slug].astro` line 89) would be caught by `lcp-lazy-loaded` but that audit is disabled

The CI gate gives a false sense of complete coverage.

**Why it happens:**
`lighthouserc.json` was configured for the original MVP site where the homepage was essentially the whole product. It hasn't been updated as the site grew.

**How to avoid:**
Update `lighthouserc.json` to test at minimum: homepage, one blog post URL, and the showcase page. Add mobile preset alongside desktop. Re-enable `lcp-lazy-loaded` and `prioritize-lcp-image` audits — the image rules were disabled because there were no images; v3.0 will have images. Each new page in v3.0 should be added to the `url` array in `lighthouserc.json` as part of its migration phase.

Also: the blog post `[slug].astro` already has `loading="lazy"` on the featured image at line 89 — this is a real LCP bug that the disabled audit is hiding right now. Fix it in the blog migration phase.

**Warning signs:**
- `lighthouserc.json` URL list contains only `http://localhost/`
- Any new page with images has `loading="lazy"` on the above-fold image
- Lighthouse scores are 100 on CI but slower in manual testing on other pages

**Phase to address:**
Token Foundation / Setup phase — update `lighthouserc.json` before migration begins. Per-page: add each new page to the URL list as part of its migration phase completion criteria.

---

### Pitfall 14: CLAUDE.md and Planning Docs Drift After Rebuild

**What goes wrong:**
`CLAUDE.md` currently documents the old stack: "Fonts: Poppins (headings), Inter (body)" (note: actually Bricolage Grotesque + DM Sans in code, but the CLAUDE.md was never updated). After v3.0, the fonts become Fraunces + Hanken Grotesk, the color system changes from yellow/turquoise/magenta to sea-glass palette, the IA changes from `[Home, Blog, Projects, FAQ, Contact]` to `[Services, Showcase, About, Book a call]`, and the UI components are replaced wholesale.

If `CLAUDE.md` is not updated, future Claude sessions will generate code using the old font names, old color tokens, and old component props — defeating the point of the rebrand.

The design-system page (`/design-system.astro`) documents v1.x components. If it's not rebuilt as part of v3.0, it becomes a trap: a developer checking the design system reference sees v1.x Button and copies its API.

**Why it happens:**
Docs are updated last, when energy is low and the work feels done. "The code is right, the docs can wait." In this project, each Claude session bootstraps from `CLAUDE.md` — stale docs are immediately harmful, not eventually harmful.

**How to avoid:**
`CLAUDE.md` must be updated in the same phase that completes the last migration. The update checklist: fonts, colors, IA, available components and their props, design token naming convention. The `/design-system` page rebuild is part of the Token Foundation / Component Library phase — it is used as a live integration test, not deferred to cleanup.

A specific check: the `CLAUDE.md` section "Available components" must list the v3.0 component names and their props. If a component is renamed (`Card` → `ProjectCard`), or removed, or added, `CLAUDE.md` must reflect it.

**Warning signs:**
- `CLAUDE.md` still mentions Poppins, Inter, Bricolage Grotesque, or DM Sans after fonts are changed
- `CLAUDE.md` "Available components" section lists `Button` variants as `yellow`, `turquoise`, `magenta` after the palette changes
- `/design-system` page shows components with old visual style while the live site uses new components
- A future phase plan recommends using `bg-yellow` class (old token) because `CLAUDE.md` wasn't updated

**Phase to address:**
v1 Cleanup phase (final phase) — CLAUDE.md and design-system page updated as a milestone gate before the milestone is marked complete.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Eyeball spacing from Figma instead of extracting exact values | Faster token setup | Fidelity drift; Joel rejects the visual; another overhaul abandonment | Never |
| Load Fraunces from Google Fonts without specifying `opsz` axis range | Less setup | Wrong optical variant at display sizes; FOUT more likely | Never |
| Hardcode hex values in component `<style>` blocks | One less step | Token drift; can't change palette later; grep finds nothing | Never |
| Add dark-mode color transition to `body` unconditionally | Smooth toggle UX | 200ms animated flash on page load for dark-OS users | Never |
| Use `<img src="wave.svg">` for the wave background | Simpler markup | Wave strokes can't adapt to dark mode via CSS | Never |
| Leave `/faq` route deleted without redirect | Clean file tree | Google Search Console 404s; loss of FAQ rich results | Never |
| Keep old `src/components/ui/` components after all pages migrate | Safety net | Confusion about which component to use; dead code in bundle | Only during active migration period; delete in final cleanup phase |
| Put dev-hidden pages in nav-excluded but not sitemap-excluded | Pages accessible by URL | Pages indexed by Google prematurely | Never |
| Keep `lighthouserc.json` testing only homepage | CI passes quickly | LCP/CLS bugs on inner pages invisible until post-launch | Never — update per page added |
| Defer CLAUDE.md update to "after everything else" | Less work now | Next Claude session generates wrong tokens and component names | Never |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Google Fonts / Fraunces | URL missing `opsz` axis range | `family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900` — or self-host |
| Google Fonts | Both old and new font families in `BaseLayout.astro` during migration | New fonts via `<slot name="head">` on migrated pages only; move to `BaseLayout.astro` in final cleanup |
| Astro sitemap integration | Dev-hidden pages auto-included in sitemap | Add `filter` function to `@astrojs/sitemap` config; add `<meta name="robots" content="noindex">` to each hidden page |
| Astro `redirects` config | Assumes HTTP 301 is generated | GitHub Pages is static; Astro redirects produce client-side meta-refresh. Works but isn't a real 301. Never rely on it for SEO-critical redirects |
| Lighthouse CI | `lighthouserc.json` URL list is homepage-only | Add each new page to `url` array when its migration phase completes |
| n8n webhook | Contact form DOM IDs (`hp-name`, `hp-email`, etc.) changed during visual reskin | Keep `hp-*` IDs unchanged or update all JS references in the same atomic commit + e2e test |
| axe-core via Playwright | Dark-mode test uses `#theme-toggle` ID — if Header v3.0 renames the button, test silently breaks | Use `page.getByRole('button', { name: /toggle/i })` or a stable `data-testid` |
| `@astrojs/sitemap` | Removes `lastmod` accuracy when `new Date()` is used | Acceptable for this site; if exact lastmod matters, use file mtime instead |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Fraunces `opsz` axis missing from font URL | Display headline FOUT; CLS on hero | Include `opsz` in axis params; self-host with full range | First page load with Fraunces above the fold |
| Inline SVG wave with unsimplified paths | TBT from SVG rendering; large HTML payload | Simplify SVG paths in SVGO before inlining; keep under 5KB | When the wave has 100+ path nodes |
| `font-display: swap` without preload for Fraunces | FOUT at every page load | `<link rel="preload" as="font" crossorigin>` for the woff2 | Every first-visit page load |
| Both old and new font families loading simultaneously | 4+ font requests per page; CLS from dual swap | Load new fonts on migrated pages only until cleanup phase | During migration period |
| JS-based expandable cards (not `<details>`) with custom animation | TBT from expand JS; Lighthouse marks interaction-blocking | Use `<details>/<summary>` for semantics; CSS for animation | Any page with multiple expandable cards |
| `loading="lazy"` on blog post featured image | LCP > 2.5s; Lighthouse LCP opportunity (currently hidden by disabled audit) | Change to `loading="eager"` on first above-fold image | Already present bug in `[slug].astro` line 89 |
| CSS `background-color` transition on `body` without load gating | 200ms animated flash for dark-mode users on every page load | Gate transition with `.transitions-enabled` class added post-load | First page load for all dark-mode OS users |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Anchor nav active state not updating on scroll | User loses sense of position on single-page layout | Intersection Observer on each section; update nav `aria-current="page"` as sections enter viewport |
| Expandable card keyboard trap | Keyboard users can't navigate past open card | `<details>` semantics; explicit focus management on collapse |
| Book-a-call Calendly placeholder not wired before launch | Clicks on primary CTA go nowhere | Gate launch on Calendly URL configured; verify before any phase that adds the CTA button |
| Wave SVG invisible in dark mode | Hero looks broken for dark-mode users | Inline SVG with CSS-variable strokes; test dark mode explicitly in every UI review |
| Blog tag pages (`/blog/tags/[tag]`) not covered in navigation audit | Tag pages 404 after IA change if path structure changed | Blog URL paths must be explicitly preserved in the IA/Navigation phase scope |

---

## "Looks Done But Isn't" Checklist

- [ ] **Fraunces `opsz` axis**: Google Fonts URL includes `opsz` range OR font is self-hosted with full axis — verify the `@font-face` or URL before any page uses Fraunces at display sizes
- [ ] **Dark mode FOUC script**: `BaseLayout.astro` dark-mode script is `is:inline` in `<head>` before any `<link>` or `<style>` tags — verify script position after any `BaseLayout.astro` change
- [ ] **Transition flash gating**: No unconditional `transition: background-color` on `body` — verify `global.css` and component `<style>` blocks
- [ ] **Wave SVG inline**: Wave background is inline SVG (not `<img src>`) with `stroke="var(--wl-color-wave)"` tokens — verify in Hero component source
- [ ] **Dark mode wave contrast**: Wave strokes in both light and dark mode have 3:1 contrast against their respective backgrounds — verify with contrast checker at the stroke OKLCH value
- [ ] **Token namespace isolation**: All v3.0 tokens use `--wl-` (or chosen prefix) — `grep -r "var(--color-yellow\|var(--font-heading\|var(--border-neo" src/` returns zero for v3.0 components
- [ ] **Expandable card ARIA**: Expand trigger has `aria-expanded` updated by JS; panel has matching `id` and trigger has `aria-controls` — verify in browser accessibility tree
- [ ] **`/faq` redirect**: `/faq` either still exists with a canonical redirect or has an Astro redirect entry — verify `astro.config.mjs` and `npm run build` output for `/faq`
- [ ] **Dev-hidden pages excluded from sitemap**: `sitemap.xml` in build output does not contain `/service-web` or `/area-abbotsford` — verify with `grep` on `dist/sitemap.xml`
- [ ] **Blog post featured image**: `[slug].astro` featured image has `loading="eager"` not `loading="lazy"` — fix the existing bug at line 89
- [ ] **Lighthouse CI URL coverage**: `lighthouserc.json` `url` array includes homepage, a blog post, and the showcase page — verify before any page migration phase is considered complete
- [ ] **CLAUDE.md current**: Font names, color token names, IA, and component names in `CLAUDE.md` match the v3.0 implementation — verify in the final cleanup phase
- [ ] **Contact form DOM IDs**: `hp-name`, `hp-email`, `hp-message`, `hp-form-error`, `homepage-contact-form` present in v3.0 ContactSection (or JS updated to match) — verify form submits and redirects to `/thank-you`
- [ ] **axe-core zero violations**: Run axe-core on every page in both light and dark mode — no `color-contrast`, `button-name`, `aria-required-attr`, or `aria-hidden-focus` violations
- [ ] **Old components deleted**: `src/components/ui/Button.astro` (v1), `Card.astro` (v1), `Badge.astro` (v1), `Input.astro` (v1), `CheckboxGroup.astro` (v1) deleted after final migration — verify `src/components/ui/` contains only v3.0 components

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Token collision broke v1 pages | HIGH | `git revert` the `@theme` change; re-introduce tokens under `--wl-` namespace; re-migrate affected pages |
| FOUC detected post-launch | LOW | Move dark-mode script back to `<head>` in `BaseLayout.astro`; deploy; verify with hard reload on dark-OS device |
| Transition flash detected | LOW | Add `.transitions-enabled` gate in `global.css`; add class in dark-mode toggle script post-DOMContentLoaded |
| `/faq` returns 404 post-launch | MEDIUM (SEO recovers slowly) | Add Astro redirect in `astro.config.mjs`; rebuild; deploy; submit updated sitemap to Search Console |
| Dev-hidden page indexed by Google | MEDIUM | Add `noindex` meta to page; exclude from sitemap; request removal in Search Console |
| axe-core contrast violations in new palette | MEDIUM | Define `-text` companion tokens at lowered L/C; update all text-color usages; re-run axe |
| Wave SVG doesn't adapt to dark mode | MEDIUM | Convert `<img src="wave.svg">` to inline SVG; replace hardcoded strokes with CSS variable; re-test both themes |
| Blog post featured image LCP regression | LOW | Change `loading="lazy"` to `loading="eager"` on featured image; one-line fix; deploy |
| Expandable card accessibility failure | MEDIUM | Replace `<div>` + click handler with `<details>/<summary>`; add `aria-expanded` if custom; re-run axe |
| Fraunces FOUT / CLS | MEDIUM | Add `<link rel="preload" as="font">` for woff2; consider self-hosting; set `font-display: optional` during transition |
| Contact form broken (DOM IDs renamed) | HIGH (lead-gen impact) | Restore `hp-*` IDs immediately; do not refactor under pressure; deploy hotfix |
| CLAUDE.md not updated | MEDIUM (accumulates) | Update `CLAUDE.md` in a dedicated commit; re-read it in the next session to verify accuracy |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Eyeballed tokens vs. Figma extraction (P1) | Token Foundation | Token mapping doc: Figma variable name → CSS custom property → verified numeric value |
| No screenshot comparison workflow (P2) | Every UI phase | Each phase plan names the Figma frame to compare against; Joel reviews side-by-side before phase marked done |
| `@theme` token collision (P3) | Token Foundation | `grep -r "var(--color-yellow\|var(--font-heading\|var(--border-neo" src/` returns zero for v3.0 components |
| Fraunces `opsz` FOUT/CLS (P4) | Font Loading phase | `@font-face` or Google Fonts URL includes `opsz` axis; Lighthouse CLS = 0 on homepage |
| Dark mode FOUC script placement (P5) | BaseLayout phase | Hard reload on dark-OS device shows no white flash before dark background |
| Transition flash (P6) | Dark Mode Implementation | Dark-mode users see no animation on first page load; only on toggle click |
| SVG wave not dark-mode-aware (P7) | Hero / Wave phase | Wave visible in both themes; strokes pass 3:1 contrast in both modes |
| Sea-glass contrast failures (P8) | Token Foundation | Every text-use color passes WCAG contrast before first component is built |
| Old tokens leaking into new pages (P9) | Every migration phase | Migration ledger updated per phase; grep finds no old tokens in v3.0 components |
| Dead CSS/components left behind (P10) | v1 Cleanup phase | `npm run build` succeeds; `grep` for old tokens returns zero; `src/components/ui/` contains only v3.0 |
| Expandable card ARIA (P11) | Project Showcase phase | axe-core zero violations on showcase page; keyboard-only navigation test passes |
| Removed pages breaking links (P12) | IA / Navigation phase | `/faq` has redirect; sitemap excludes dev-hidden pages; no 404s on previously-linked URLs |
| Lighthouse CI false pass (P13) | Setup phase | `lighthouserc.json` URL list expanded; disabled audits reviewed and re-enabled where appropriate |
| CLAUDE.md drift (P14) | v1 Cleanup phase (final) | CLAUDE.md reviewed line-by-line against v3.0 implementation; any stale reference corrected |

---

## Sources

- Direct codebase inspection: `src/styles/global.css` (458 lines, v1.x token system), `src/layouts/BaseLayout.astro` (dark-mode FOUC script), `src/pages/faq.astro` (orphaned full HTML shell), `src/pages/blog/[slug].astro` (line 89: `loading="lazy"` bug), `src/components/Hero.astro` (bento grid, no SVG wave yet), `src/components/ProjectCard.astro` (link-to-slug pattern, not expandable), `astro.config.mjs` (sitemap, redirects), `lighthouserc.json` (desktop-only, homepage-only, disabled audits)
- Project history: `.planning/STATE.md` (v1.4 abandoned 2026-05-31, v2.0 abandoned 2026-07-14; root causes documented)
- Prior pitfalls research: `.planning/milestones/v1.4-research/PITFALLS.md` (17 pitfalls grounded in code-side parallel migration); `.planning/milestones/v2.0-research/PITFALLS.md` (design-file reconstruction risks)
- Figma file context: `.planning/STATE.md` — file `1tg8wIPcvOVC5tPZ8pkGO2`, frames Landing `12:2`, dark Landing `117:103`, Showcase `12:3`, Components `36:5`, Service Web `85:103`, Area Abbotsford `85:104`
- WCAG 2.2 criteria: 1.4.3 (color contrast 4.5:1 normal / 3:1 large), 1.4.11 (non-text contrast 3:1), 4.1.2 (aria-expanded on state-bearing widgets), 2.4.11 (focus not obscured), 2.4.13 (focus appearance)
- Tailwind v4 behavior: `@theme` is a global CSS custom property namespace; no scoping between `@theme` blocks
- Astro 5 behavior: static output; `redirects` config generates client-side meta-refresh (not HTTP 301); `is:inline` scripts run synchronously in document order

---
*Pitfalls research for: v3.0 Wavelength Rebrand — full visual rebuild in place on Astro 5 / Tailwind 4*
*Researched: 2026-07-14*

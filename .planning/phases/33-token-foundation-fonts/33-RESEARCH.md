# Phase 33: Token Foundation + Fonts - Research

**Researched:** 2026-07-14
**Domain:** Tailwind 4 @theme tokens, self-hosted variable fonts, WCAG contrast, Lighthouse CI multi-URL, Figma asset pipeline
**Confidence:** HIGH (stack, font loading, @theme mechanics verified); MEDIUM (Lighthouse mobile+desktop approach — documented workaround only); HIGH (SVG favicon pattern)

---

## Summary

Phase 33 is a pure infrastructure phase: no visible UI, no component work, only the CSS/font/CI foundations every downstream phase builds on. The prior v3.0 milestone research (STACK.md, PITFALLS.md, SUMMARY.md) already resolved the major technology choices. This research addresses the seven specific technical questions the planner raised about implementation mechanics.

**Key conclusions:**

1. **@theme dark-mode flip:** Use `@theme` (without `inline`) for `--wl-*` color tokens so that Tailwind writes CSS custom properties onto `:root`. Then override those properties in a plain `.dark { }` block in `global.css`. This is confirmed correct: `@theme inline` bakes values into utility definitions and prevents runtime variable override. The existing `@custom-variant dark (&:where(.dark, .dark *))` in `global.css` is kept exactly as-is.

2. **Fontsource preload:** Import `wght.css` + `wght-italic.css` in `global.css`. Preload by importing the woff2 file URL via Vite's `?url` suffix in `BaseLayout.astro`. Exact woff2 file names are `fraunces-latin-wght-normal.woff2` and `fraunces-latin-wght-italic.woff2` (confirmed from CDN). For `hanken-grotesk`: the pattern is `hanken-grotesk-latin-wght-normal.woff2`. CLS = 0 strategy: Fontaine Vite plugin provides automatic `size-adjust` / `ascent-override` / `descent-override` fallback metrics, eliminating FOUT without manual `@font-face` fallback authoring.

3. **Google Fonts coexistence:** Keep Google Fonts loading (Bricolage Grotesque + DM Sans) in `BaseLayout.astro` for this phase. New fontsource imports are added alongside via `@import` in `global.css`. The existing pages render unchanged because they use old token utility classes; new `--wl-*` utilities don't conflict. Remove the Google Fonts block in Phase 41 cleanup. Lighthouse impact of double loading is acceptable given only the homepage is tested now; the Lighthouse URL expansion (FOUND-04) also happens this phase before any per-page regressions appear.

4. **WCAG contrast script:** Use `wcag-color-contrast` npm package (requires Node.js ≥22; zero heavy dependencies) or implement the W3C relative luminance formula inline in 30 lines of plain ESM — the formula is public and not complex. Hand-rolling is reasonable here (D-10 says "committed re-runnable script"). The inline approach avoids adding a production npm dep for a dev script.

5. **Lighthouse CI multi-URL + mobile:** A single `lighthouserc.json` cannot run mobile and desktop presets simultaneously in one collect pass. The practical solution is two sequential workflow steps in `deploy.yml`: one desktop pass (current), one mobile pass referencing a second config `lighthouserc-mobile.json`. This phase creates both config files. The `treosh/lighthouse-ci-action` v12 is used twice. Assertions are separate per config (desktop 90+, mobile 90+). Re-enabling `lcp-lazy-loaded` and `prioritize-lcp-image` goes in both configs.

6. **Figma extraction:** Figma MCP tools (`get_variable_defs`, `get_design_context`, `download_assets`) are available only in the main Claude session — subagents cannot call them. All Figma extraction tasks (palette hex values, dark mode variable values, type ramp sizes, waveform SVG) must be performed by the main session and outputs placed in the plan as concrete literals before any executor task runs. Plans must include `autonomous: false` checkpoints at every Figma-dependent step.

7. **OG image tooling:** Satori + Sharp is the standard dynamic pattern for Astro, but this is a one-off static asset. The lightest path: write a build-time Node.js script (`scripts/generate-og.mjs`) using `@vercel/satori` + `sharp` (both already used widely in the Astro ecosystem). The script outputs `public/og-image.png` (1200×630). The script runs once manually with Joel's approval gate before being wired into `SEO.astro`. This avoids Playwright screenshots and keeps the build pipeline clean.

**Primary recommendation:** Write all 8 `--wl-*` tokens into a new `@theme` block in `global.css` (sourced 1:1 from Figma), install fontsource packages, add Fontaine to `astro.config.mjs` for CLS = 0, expand `lighthouserc.json` + add `lighthouserc-mobile.json`, write `scripts/check-contrast.mjs` with inline W3C math, then handle Figma asset extraction (favicon, OG) as `autonomous: false` checkpoints.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@fontsource-variable/fraunces` | ^5.2.9 | Fraunces variable font (wght + opsz + ital axes) | Self-hosted, avoids Google Fonts third-party latency; already chosen in STACK.md |
| `@fontsource-variable/hanken-grotesk` | ^5.2.8 | Hanken Grotesk variable font (wght axis) | Same rationale |
| `fontaine` | ^0.5.x | Automatic fallback font metric overrides (ascent/descent/size-adjust) | Zero-config CLS elimination for variable fonts in Vite; Astro-compatible Vite plugin |
| Tailwind CSS 4.1.x (existing) | ^4.1.18 | @theme token system | Already installed; no new packages |
| Node.js built-in `crypto` | N/A | Hex-to-RGB and relative luminance for contrast script | Pure ESM, zero deps |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@vercel/satori` | ^0.10.x | JSX → SVG for OG image generation | One-off script; only install if OG script approach chosen |
| `sharp` | ^0.33.x | SVG → PNG conversion | Pair with satori for OG image |
| `wcag-color-contrast` | ^1.x | WCAG ratio calculation | Alternative to hand-rolled math if Node.js ≥22 confirmed |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `fontaine` Vite plugin | Manual `@font-face` fallback blocks | Manual requires FontForge/Capsize to measure metrics per font; Fontaine automates this at build time |
| `@vercel/satori` + `sharp` | Playwright screenshot of a dev page | Screenshot approach is flaky and requires a running server; satori is deterministic |
| Inline W3C luminance formula | `wcag-color-contrast` npm package | Package adds npm dep; inline formula is 30 lines and has no surface for supply chain issues |

**Installation:**
```bash
npm install @fontsource-variable/fraunces @fontsource-variable/hanken-grotesk fontaine
# Optional for OG image script only (install when running the script):
npm install --save-dev @vercel/satori sharp
```

---

## Architecture Patterns

### Recommended File Touch Points

```
src/styles/global.css           — @theme block: add --wl-* block above old tokens (namespace isolation)
src/layouts/BaseLayout.astro    — Add fontsource imports, preload <link> tags; keep Google Fonts block
astro.config.mjs                — Add fontaine Vite plugin
lighthouserc.json               — Expand URL list, re-enable audits, keep desktop preset
lighthouserc-mobile.json        — New file: same URL list, mobile preset, same assertions
.github/workflows/deploy.yml    — Add second lighthouse-ci-action step for mobile
scripts/check-contrast.mjs      — New: WCAG AA check script for --wl-* token pairs
scripts/generate-og.mjs         — New: one-off OG PNG generation script
src/components/WaveMark.astro   — New: inline SVG Astro component for waveform mark
public/favicon.svg              — Replace in place (waveform + prefers-color-scheme media query)
public/favicon.ico              — Replace in place
public/og-image.png             — New: replaces og-image.svg (generated by script, approval-gated)
src/components/SEO.astro        — Wire og-image.png URL (was og-image.svg)
```

### Pattern 1: @theme + .dark Variable Override

**What:** `@theme` (no `inline`) writes `--wl-*` tokens as `:root` CSS custom properties. Tailwind generates `bg-wl-paper`, `text-wl-ink`, etc. from them. Dark-mode semantic flip is done by redefining the same variable names in a `.dark { }` block — CSS cascade updates all `var()` references automatically.

**Why NOT @theme inline:** `@theme inline` bakes values directly into utility class definitions. Once baked, they cannot be overridden at runtime by a `.dark` selector — the value is resolved at compile time, not at cascade time.

**Example:**
```css
/* Source: Tailwind CSS v4 docs + github.com/tailwindlabs/tailwindcss/discussions/18560 */

@theme {
  /* --wl-* block: added BELOW old token block in global.css (namespace isolation until Phase 41) */
  --color-wl-ink:              #12333B;   /* Figma variable: exact hex TBD from MCP extraction */
  --color-wl-sub:              #35525A;
  --color-wl-accent:           #0E7078;
  --color-wl-accent-soft:      #5AA9A5;
  --color-wl-sea-glass:        #E6F1F1;
  --color-wl-sea-glass-deep:   #D2E7E7;
  --color-wl-paper:            #F6FBFA;
  --color-wl-line:             color-mix(in oklch, #0E7078 16%, transparent);
}

/* Dark flip: redefine same properties under .dark selector */
/* NOTE: These go in a plain .dark { } block, NOT in a second @theme block */
.dark {
  --color-wl-paper:            #0B2228;   /* dark values: Figma MCP extraction or dark frame 117:103 */
  --color-wl-sea-glass:        #112D34;
  --color-wl-sea-glass-deep:   #0D2429;
  --color-wl-ink:              #E6F1F1;
  --color-wl-sub:              #A8C8C6;
  --color-wl-line:             color-mix(in oklch, #5AA9A5 16%, transparent);
  /* --wl-accent and --wl-accent-soft may stay unchanged if Figma has no dark variant */
}
```

**Critical:** All hex values above are HYPOTHETICAL PLACEHOLDERS — they match the STACK.md research estimates. The actual values MUST come from Figma MCP extraction (file `1tg8wIPcvOVC5tPZ8pkGO2`). No value in the final @theme block is valid until traced to a Figma variable.

### Pattern 2: Fontsource Import + Preload in Astro

**What:** CSS imports go in `global.css` via `@import`. Vite's `?url` suffix retrieves the hashed woff2 URL so `<link rel="preload">` can reference it in `BaseLayout.astro`.

**Example:**
```css
/* In src/styles/global.css — added at top after @import "tailwindcss" */
@import '@fontsource-variable/fraunces/wght.css';
@import '@fontsource-variable/fraunces/wght-italic.css';
@import '@fontsource-variable/hanken-grotesk/wght.css';
```

```astro
---
// In src/layouts/BaseLayout.astro frontmatter
// Source: fontsource.org/docs/getting-started/preload
import fraunceWoff2 from '@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2?url';
import frauncesItalicWoff2 from '@fontsource-variable/fraunces/files/fraunces-latin-wght-italic.woff2?url';
import hankenWoff2 from '@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2?url';
---
<!-- In <head>, before closing </head> -->
<link rel="preload" as="font" type="font/woff2" href={fraunceWoff2} crossorigin="anonymous" />
<link rel="preload" as="font" type="font/woff2" href={frauncesItalicWoff2} crossorigin="anonymous" />
<link rel="preload" as="font" type="font/woff2" href={hankenWoff2} crossorigin="anonymous" />
```

**Note on woff2 filenames (HIGH confidence, verified from CDN):**
- Fraunces upright wght-only: `fraunces-latin-wght-normal.woff2`
- Fraunces italic wght-only: `fraunces-latin-wght-italic.woff2`
- Hanken Grotesk upright wght-only: `hanken-grotesk-latin-wght-normal.woff2`

### Pattern 3: Fontaine for CLS = 0

**What:** Fontaine is a Vite plugin that reads the woff2 files at build time, measures glyph metrics, and generates `@font-face` blocks for system-font fallbacks with `ascent-override`, `descent-override`, and `size-adjust` values. The fallback metrics match the web font geometry so closely that layout does not shift when the web font swaps in.

**Example:**
```js
// In astro.config.mjs
// Source: github.com/unjs/fontaine
import { FontaineTransform } from 'fontaine';

export default defineConfig({
  // ... existing config
  vite: {
    plugins: [
      tailwindcss(),
      FontaineTransform.vite({
        fallbacks: ['Georgia', 'Times New Roman', 'serif'],  // for Fraunces (serif)
        resolvePath: (id) => new URL(`./node_modules${id}`, import.meta.url),
      }),
    ],
  },
});
```

**Note:** The `resolvePath` above resolves fontsource paths into `node_modules`. This requires the fontsource packages to be installed. The `resolvePath` must handle both Fraunces (serif fallbacks) and Hanken Grotesk (sans-serif fallbacks). If two separate font families need different fallback stacks, Fontaine can be invoked twice with different options, or a single invocation with `['Georgia', 'Arial', 'sans-serif']` covers both with less precision. For full accuracy, two invocations are cleaner.

**Confidence:** MEDIUM — the Fontaine `resolvePath` pattern for `@fontsource-variable` packages is inferred from documentation + unjs/fontaine GitHub README. The exact path resolution will be verified at implementation time; it may require `node_modules/@fontsource-variable` rather than `node_modules`.

### Pattern 4: Composite Type Utility Classes (D-05 / D-06)

**What:** One CSS class per Figma type style, bundling all Tailwind utilities. Names mirror Figma style names kebab-cased with `wl-` prefix.

**Example (placeholder names — actual from Figma Components page `36:5`):**
```css
/* In src/styles/global.css, in @layer utilities */
/* NOTE: Actual class names and values MUST be extracted from Figma node 36:5 */
.wl-display {
  font-family: 'Fraunces Variable', Georgia, serif;
  font-style: normal;
  font-size: 4.75rem;         /* 76px at 1440px breakpoint — Figma spec */
  font-weight: 700;           /* Figma weight */
  line-height: 1.1;           /* Figma line-height */
  letter-spacing: -0.02em;    /* Figma letter-spacing */
  font-optical-sizing: auto;  /* enables opsz axis at display size */
  /* Breakpoints per D-07: baked-in @media steps at 390/768/1440/1920 */
}

@media (max-width: 768px) {
  .wl-display {
    font-size: 2.5rem;   /* 40px at 390px — Figma mobile spec */
  }
}
```

### Pattern 5: WCAG AA Contrast Script

**What:** A standalone ESM script that computes WCAG 2.x relative luminance and contrast ratio from hex values, asserts AA compliance for mockup-observed text/background pairs.

**Example — inline W3C formula (no deps):**
```js
// scripts/check-contrast.mjs
// Source: W3C WCAG 2.x — relative luminance formula
// https://www.w3.org/TR/WCAG22/#dfn-relative-luminance

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

function linearize(c) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance([r, g, b]) {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function contrastRatio(hex1, hex2) {
  const L1 = relativeLuminance(hexToRgb(hex1));
  const L2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Token pairs extracted from Figma mockups (mockup-observed per D-11)
// NOTE: All hex values are placeholders — replace with Figma-extracted values
const PAIRS = [
  // [foreground, background, usage, threshold]
  ['#12333B', '#F6FBFA', 'wl-ink on wl-paper (body)', 4.5],
  ['#35525A', '#F6FBFA', 'wl-sub on wl-paper (secondary)', 4.5],
  ['#5AA9A5', '#F6FBFA', 'wl-accent-soft on wl-paper (text)', 4.5],  // expected FAIL → companion needed
  ['#12333B', '#E6F1F1', 'wl-ink on wl-sea-glass', 4.5],
  // dark theme pairs...
];

let failed = false;
for (const [fg, bg, label, threshold] of PAIRS) {
  const ratio = contrastRatio(fg, bg);
  const pass = ratio >= threshold;
  console.log(`${pass ? 'PASS' : 'FAIL'} ${label}: ${ratio.toFixed(2)}:1 (threshold ${threshold}:1)`);
  if (!pass) failed = true;
}
process.exit(failed ? 1 : 0);
```

### Pattern 6: Lighthouse CI Multi-URL + Mobile

**What:** Two Lighthouse CI passes: one desktop (existing `lighthouserc.json`, expanded URLs), one mobile (`lighthouserc-mobile.json`, same URLs, no preset override = Lighthouse default mobile emulation). Two sequential steps in `deploy.yml`.

**lighthouserc.json (desktop, expanded):**
```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "settings": { "preset": "desktop" },
      "staticDistDir": "./dist",
      "url": [
        "http://localhost/",
        "http://localhost/showcase/",
        "http://localhost/blog/[slug-of-first-post]/"
      ]
    },
    "assert": {
      "preset": "lighthouse:no-pwa",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["warn", { "minScore": 0.9 }],
        "categories:best-practices": ["warn", { "minScore": 0.9 }],
        "categories:seo": ["warn", { "minScore": 0.9 }],
        "largest-contentful-paint": ["warn", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["warn", { "maxNumericValue": 0.1 }],
        "interactive": ["warn", { "maxNumericValue": 3800 }],
        "lcp-lazy-loaded": "warn",
        "prioritize-lcp-image": "warn",
        "image-delivery-insight": "off",
        "network-dependency-tree-insight": "off",
        "modern-image-formats": "off",
        "render-blocking-insight": "off",
        "render-blocking-resources": "off",
        "non-composited-animations": "off",
        "uses-responsive-images": "off"
      }
    },
    "upload": { "target": "temporary-public-storage" }
  }
}
```

**lighthouserc-mobile.json:** Identical to above except remove `"settings": { "preset": "desktop" }`. Lighthouse default emulates a Moto G4 mobile device. Keep same assertions.

**deploy.yml — second step for mobile:**
```yaml
- name: Run Lighthouse CI (mobile)
  uses: treosh/lighthouse-ci-action@v12
  with:
    configPath: './lighthouserc-mobile.json'
    staticDistDir: './dist'
    uploadArtifacts: true
    temporaryPublicStorage: true
    runs: 3
```

**Note on blog URL:** The `showcase` page (`/showcase/`) does not exist yet (Phase 38 builds it). For this phase, only add the showcase URL to the config as a placeholder — it will 404 locally (non-blocking since `lhci collect` with `staticDistDir` serves whatever files are in `./dist`). The blog post slug URL requires checking the actual built HTML files in `./dist/blog/` to find an existing slug. The planner should identify a real slug from the current blog content.

### Pattern 7: SVG Favicon with prefers-color-scheme

**What:** Inline `<style>` block inside the SVG with `@media (prefers-color-scheme: dark)` overrides stroke/fill colors. Browser chrome respects the system preference (not the site's `.dark` class — they are independent).

**Example:**
```svg
<!-- public/favicon.svg — waveform mark, theme-adaptive -->
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      path, line {
        stroke: #12333B;  /* wl-ink light value */
        fill: none;
        color-scheme: light dark;
      }
      @media (prefers-color-scheme: dark) {
        path, line {
          stroke: #E6F1F1;  /* wl-ink dark value */
        }
      }
    </style>
  </defs>
  <!-- waveform mark paths here: sourced from Figma, not hand-authored -->
</svg>
```

**Important:** The SVG favicon's dark mode uses `prefers-color-scheme` (OS preference), not the site's `.dark` JS toggle. These are intentionally different — the favicon lives in browser chrome, not the page. The site's `.dark` toggle remains independent.

### Anti-Patterns to Avoid

- **`@theme inline` for color tokens:** Prevents `.dark { }` variable override at runtime. Use plain `@theme`.
- **`@import '@fontsource-variable/fraunces/full.css'`:** Loads all axes in one large file. Use `wght.css` + `wght-italic.css` only.
- **Hardcoding hex values in `@theme` that weren't extracted from Figma MCP:** Every value must be traceable to a Figma variable name. No estimation.
- **Adding `--wl-*` tokens to an existing `@theme` block that also contains old tokens without confirming namespace isolation:** The new `--wl-*` tokens must not collide with any `--color-*`, `--font-*`, `--spacing-neo-*`, or `--border-neo` names already in the block. Use prefix to guarantee separation.
- **Google Fonts removal this phase:** Keep the Google Fonts `<link>` tags. Removing them here breaks old pages (`font-body` on `<body>`, `font-heading` in `.prose h1` etc. all reference `--font-heading`/`--font-body` which point to Bricolage Grotesque / DM Sans). Removal happens in Phase 41.
- **`font-display: optional` for Fraunces:** This prevents FOUT by not swapping at all — but it means the font may never load for users on slow connections. Use `font-display: swap` (set by fontsource defaults) + preload + Fontaine fallback metrics instead.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Fallback font metrics for CLS elimination | Manual `@font-face` fallback blocks with estimated `size-adjust` values | `fontaine` Vite plugin | Fontaine measures actual glyph metrics from the installed woff2 binary; manual estimates are wrong by 5-15% and create visible layout shift |
| WCAG contrast ratio math | A custom implementation from scratch | W3C's public relative luminance formula (30 lines ESM) | The formula is standardized; implementing it fresh is low risk. An npm package is also fine but adds dependency surface |
| OG image PNG | Playwright screenshot of a dev page | `@vercel/satori` + `sharp` (one-off script) | Screenshots require a live server and are fragile; satori produces deterministic output from JSX-like markup |
| Type ramp responsive sizing | CSS `clamp()` fluid interpolation | Fixed breakpoint values from Figma | Fluid values would be invented (no Figma fluid spec); the D-07 decision is explicit: bake breakpoint steps from the four Figma viewport widths |

**Key insight:** The only things worth hand-rolling in this phase are the contrast script (standardized math, 30 lines) and the OG image script (one-off, deterministic). Everything else has ecosystem solutions that handle edge cases.

---

## Common Pitfalls

### Pitfall 1: Figma Values Not Extracted Before Writing @theme

**What goes wrong:** Developer writes `@theme` block using the STACK.md research estimates (e.g., `--color-wl-ink: #12333B`) without verifying these against the actual Figma file. Values diverge from the design by 5-15 OKLCH lightness units.

**Why it happens:** The STACK.md has hex values that look authoritative. They are research estimates, not Figma extractions.

**How to avoid:** Every `--wl-*` token in `@theme` must be preceded by a Figma MCP extraction step (`autonomous: false` checkpoint). The token mapping table (Figma variable name → CSS custom property → numeric value) is written BEFORE `global.css` is touched. No `@theme` value is considered valid without a Figma variable name in the mapping table row.

**Warning signs:** A token value in `@theme` cannot be traced to a specific line in the token mapping table.

### Pitfall 2: woff2 Preload File Name Mismatch

**What goes wrong:** The `?url` import path in `BaseLayout.astro` specifies an incorrect filename (e.g., `fraunces-latin-variable-wghtOnly-normal.woff2` — the old naming convention used in some prior fontsource versions). Vite throws a build error or silently serves no preload.

**Why it happens:** Fontsource changed file naming conventions between major versions. Older blog posts use different paths.

**How to avoid:** After `npm install`, run `ls node_modules/@fontsource-variable/fraunces/files/` and confirm the exact filenames before writing the preload imports. The names confirmed from CDN at v5.2.9 are `fraunces-latin-wght-normal.woff2` and `fraunces-latin-wght-italic.woff2` but verify at install time.

**Warning signs:** `npm run build` produces no errors but the Network tab shows no font preload link in the HTML `<head>`.

### Pitfall 3: Fontaine resolvePath Not Finding Fontsource Files

**What goes wrong:** Fontaine's `resolvePath` function cannot locate the woff2 files for `@fontsource-variable` packages because the path resolution assumes `/public/fonts/` rather than `node_modules/@fontsource-variable`.

**Why it happens:** Most Fontaine documentation shows self-hosted fonts in `public/`. Fontsource files live in `node_modules`.

**How to avoid:** After installing Fontaine, test with `npm run build` and check for Fontaine-generated `@font-face` fallback blocks in the output CSS. If absent, the `resolvePath` is wrong. The correct pattern resolves to the node_modules directory. Consider adding a `console.log` in `resolvePath` during development to verify the paths being resolved.

### Pitfall 4: @theme Variable Collision

**What goes wrong:** A new `--wl-accent` or similar token name collides with a Tailwind default (e.g., Tailwind 4 ships `--color-accent` as a default). The utility classes generated from the new token shadow or conflict with Tailwind defaults.

**Why it happens:** Tailwind 4 ships with an extensive set of default `--color-*` variables. Adding `--color-wl-accent` to `@theme` is safe, but if for any reason a token is named `--color-accent` (without `wl-`), it overwrites Tailwind's default.

**How to avoid:** All new tokens are `--color-wl-*` (namespaced). Never add a `--wl-*` token without the `wl-` infix in the color name. Check the token name doesn't exist in the current `@theme` block before adding it.

### Pitfall 5: Showcase URL 404 in Lighthouse CI

**What goes wrong:** `lighthouserc.json` includes `http://localhost/showcase/` in the URL list, but the `/showcase/` page doesn't exist until Phase 38. When `lhci collect` with `staticDistDir` tries to load the page, it gets a 404 in the static server. Lighthouse scores that URL as failed, breaking CI.

**Why it happens:** FOUND-04 requires the expanded URL list before the showcase page is built.

**How to avoid:** Add the showcase URL to the config file but verify that `lhci collect` with `staticDistDir` handles 404s gracefully (it does — Lighthouse CI reports a failed audit result for that URL but does not block the CI run). Alternatively, add the URL as a comment placeholder and only activate it when the page exists. Check the deployed `./dist/` for available routes and only use URLs that exist in the build. Use an existing blog post slug from `dist/blog/*/index.html` for the blog URL.

### Pitfall 6: Accent-soft Contrast Failure Not Caught Before Components

**What goes wrong:** The known expected failure — `--wl-accent-soft` (#5AA9A5) on `--wl-paper` (#F6FBFA) for body text — is discovered after Phase 35 components are already using the token. Fixing it requires touching multiple components.

**Why it happens:** The contrast script isn't run before component work begins, or it's run but the failure isn't acted on immediately.

**How to avoid:** The contrast script run is a phase gate: all `FAIL` pairs in the script output must have companion `-text` tokens defined in `@theme` before this phase is considered complete. The companion tokens (`--color-wl-accent-soft-text`) are defined in the same `@theme` block, documented, and passed to Phase 35 in the FIDELITY-GAPS or phase notes.

---

## Code Examples

### @theme Block Structure in global.css

```css
/* Source: Tailwind CSS v4 docs, STACK.md prior research */
/* IMPORTANT: Values shown are RESEARCH ESTIMATES — replace with Figma MCP extraction */

@import "tailwindcss";

/* ============================================================
   WL TOKENS (v3.0 Wavelength — namespace isolated via --wl- prefix)
   DO NOT edit old token block above until Phase 41 cleanup
   ============================================================ */
@theme {
  /* --- Palette (light mode defaults) --- */
  /* Each value traces to Figma variable: file 1tg8wIPcvOVC5tPZ8pkGO2 */
  --color-wl-ink:              [EXTRACT FROM FIGMA];
  --color-wl-sub:              [EXTRACT FROM FIGMA];
  --color-wl-accent:           [EXTRACT FROM FIGMA];
  --color-wl-accent-soft:      [EXTRACT FROM FIGMA];
  --color-wl-sea-glass:        [EXTRACT FROM FIGMA];
  --color-wl-sea-glass-deep:   [EXTRACT FROM FIGMA];
  --color-wl-paper:            [EXTRACT FROM FIGMA];
  --color-wl-line:             [EXTRACT FROM FIGMA];

  /* Companion text tokens (from contrast check — D-09) */
  --color-wl-accent-soft-text: [DERIVED: min darkening of accent-soft to pass 4.5:1 on paper];

  /* --- Typography --- */
  --font-wl-heading: 'Fraunces Variable', Georgia, serif;
  --font-wl-body:    'Hanken Grotesk Variable', ui-sans-serif, system-ui, sans-serif;
}

/* --- Dark mode semantic flip (D-01) --- */
/* Plain .dark {} block, NOT a second @theme block */
.dark {
  --color-wl-ink:              [EXTRACT FROM FIGMA dark vars or frame 117:103];
  --color-wl-sub:              [EXTRACT FROM FIGMA];
  --color-wl-paper:            [EXTRACT FROM FIGMA];
  --color-wl-sea-glass:        [EXTRACT FROM FIGMA];
  --color-wl-sea-glass-deep:   [EXTRACT FROM FIGMA];
  --color-wl-line:             [EXTRACT FROM FIGMA];
  /* tokens with no dark evidence: omitted here (keep light value per D-04) */
}
```

### Hanken Grotesk body base (D-08)

```css
/* In @layer base — sets default body font for all new WL pages */
/* Utility class 'font-body' on existing <body> wins over base (utility > base) — old pages safe */
@layer base {
  body {
    font-family: var(--font-wl-body);  /* Only takes effect when no higher-specificity rule */
  }
}
```

### WaveMark.astro inline SVG component (D-13)

```astro
---
// src/components/WaveMark.astro
// Paths sourced from Figma — DO NOT hand-author geometry
interface Props {
  class?: string;
  size?: number;
}
const { class: className = '', size = 32 } = Astro.props;
---
<svg
  width={size}
  height={size}
  viewBox="0 0 32 32"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class={className}
  aria-hidden="true"
>
  <!-- Paths extracted from Figma via MCP — placeholder until extraction -->
  <!-- Strokes use currentColor so parent element's color prop controls them -->
  <path d="..." stroke="currentColor" stroke-width="2" />
</svg>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Google Fonts CDN loading | @fontsource-variable self-hosting | Decision locked in STACK.md | CLS = 0 possible; no third-party DNS; GDPR-safe |
| Manual @font-face fallback metrics | Fontaine Vite plugin | unjs/fontaine available 2023+ | No manual metric measurement; zero-config CLS from FOUT |
| `@theme inline` for all tokens | `@theme` (no inline) + `.dark {}` override | Tailwind v4 CSS-first architecture | Runtime dark mode flip without regenerating utilities |
| Static OG image SVG | Static OG image PNG (satori+sharp script) | Social platform SVG unreliability | Social preview cards actually work on Twitter/LinkedIn |
| CSS `clamp()` fluid type | Fixed breakpoint steps per Figma viewport | D-07 decision | Matches Figma spec exactly; no invented intermediate values |

**Deprecated/outdated:**
- `@theme inline` for semantic color tokens: prevents `.dark` cascade override — do not use
- `@fontsource-variable/fraunces/full.css`: loads all axes simultaneously in a large file — use `wght.css` + `wght-italic.css` only
- `font-variation-settings: 'opsz' 9` hardcoded everywhere: CSS `font-optical-sizing: auto` handles this per element at the correct optical size based on `font-size` — use `auto` and only override via `font-variation-settings` for specific design departures

---

## Figma Extraction Constraints

**This is the most important execution constraint for Phase 33.**

The Figma MCP tools (`get_variable_defs`, `get_design_context`, `download_assets`, `get_screenshot`) are **only available in the main Claude session** (claude.ai with Figma MCP configured). Subagent executor threads spawned by the plan runner do NOT have access to these tools.

This means every task that requires Figma data must be structured as an `autonomous: false` checkpoint where the main session performs the extraction and deposits the output as concrete literals (hex values, SVG paths, type sizes) into the plan or a scratch file before the executor continues.

**Figma-dependent extraction steps required this phase:**

1. **Palette extraction:** `get_variable_defs` on file `1tg8wIPcvOVC5tPZ8pkGO2` → hex values for all 8 `--wl-*` light tokens + any dark mode variable definitions. If no dark mode variables exist, `get_design_context` / `get_screenshot` on frame `117:103` for dark fills.

2. **Type ramp extraction:** `get_design_context` on Components page node `36:5` → all 13 style names (kebab-cased), each with: font family, size (at each of 4 viewport widths), weight, line-height, letter-spacing, italic flag, opsz value.

3. **Waveform mark extraction:** `download_assets` or `get_design_context` on the waveform mark node → clean SVG path data. If output isn't clean, `autonomous: false` → ask Joel for "Copy as SVG" from Figma desktop.

4. **OG image composition:** No existing 1200×630 OG frame expected. If none found, compose from extracted brand elements → present to Joel for approval before wiring into `SEO.astro`.

**Plan format requirement:** Every Figma extraction step must be a separate plan task with `autonomous: false`. The executor plan must include a "Token mapping table" artifact with columns: `Figma variable name | CSS custom property | hex value | dark hex value`. This artifact is the contract between extraction and implementation.

---

## Lighthouse CI Technical Details

### Current State (from code inspection)

`lighthouserc.json` (current): desktop preset only, `http://localhost/` only, 6 audits disabled including `lcp-lazy-loaded` and `prioritize-lcp-image`.

`deploy.yml`: uses `treosh/lighthouse-ci-action@v12` with `configPath: './lighthouserc.json'` and `staticDistDir: './dist'`.

### What FOUND-04 Requires

- Add: `http://localhost/showcase/` and `http://localhost/blog/[slug]/`
- Add: mobile pass (Lighthouse default mobile emulation)
- Re-enable: `lcp-lazy-loaded` and `prioritize-lcp-image` audits

### Approach: Two Separate Lighthouse Steps (MEDIUM confidence — LHCI limitation)

`lhci collect` only accepts a single `settings.preset` per invocation. Running mobile and desktop in one `lighthouserc.json` is not supported. The correct approach is two sequential GitHub Actions steps:

Step 1: Desktop pass using `lighthouserc.json` (preset: desktop)
Step 2: Mobile pass using `lighthouserc-mobile.json` (no preset = Lighthouse default mobile emulation)

Both files have the same `url` array and the same `assert` block. Both use `staticDistDir: './dist'` so no server is needed.

The `treosh/lighthouse-ci-action@v12` action can be called twice in the same job without conflict. The `upload` section with `target: temporary-public-storage` works on both passes.

**Blog slug for URL array:** Must be a real slug. Check `dist/blog/*/` after `npm run build` and use the first available one. A hardcoded known slug can be used initially and updated if posts are deleted.

### Re-enabling Audits

`lcp-lazy-loaded` and `prioritize-lcp-image` audits: change from `"off"` to `"warn"` in both config files. Not `"error"` because the blog post featured image LCP bug (`loading="lazy"` at `[slug].astro:89`) will trigger these audits — the fix is in Phase 38, not Phase 33. Setting to `"warn"` reveals the issue without breaking CI.

`render-blocking-insight` and `render-blocking-resources`: keep `"off"` — Google Fonts is still loading and will trigger these. Remove the `"off"` overrides in Phase 41 when Google Fonts is removed.

---

## Open Questions

1. **Fontaine resolvePath for @fontsource-variable**
   - What we know: Fontaine's `resolvePath` needs to map CSS font source URLs to filesystem paths. For fontsource packages the woff2 files are in `node_modules/@fontsource-variable/{name}/files/`.
   - What's unclear: Whether the CSS `src:` URL in fontsource's generated `@font-face` uses relative paths that Fontaine can resolve, or absolute `node_modules` paths that need special handling.
   - Recommendation: Install packages and test with `npm run build`. Inspect the output CSS for Fontaine-generated `@font-face` blocks. If absent, debug `resolvePath` until present. Document the working path pattern.

2. **Figma dark mode variable existence**
   - What we know: D-03 says check Figma for dark mode variables/modes first, then fall back to dark frame `117:103` fills.
   - What's unclear: Whether the Figma file `1tg8wIPcvOVC5tPZ8pkGO2` has a separate dark mode variable set or only a light palette.
   - Recommendation: The plan's first `autonomous: false` checkpoint extracts this. If dark vars exist, the dark `@theme` override is a direct copy. If not, dark values come from frame `117:103` fills.

3. **Type ramp class names (exact Figma style names)**
   - What we know: D-06 says class names mirror Figma style names (kebab-cased, `wl-` prefix). The 13 styles live on Components page `36:5`.
   - What's unclear: The exact style name strings (e.g., "Display / Large", "Body / Regular", etc.) — these determine the final utility class names.
   - Recommendation: Extract from Figma node `36:5` in the first `autonomous: false` checkpoint. Document as a lookup table in the plan.

4. **Showcase URL in Lighthouse before Phase 38**
   - What we know: The `/showcase/` route doesn't exist until Phase 38.
   - What's unclear: Whether to add the URL to `lighthouserc.json` now (and accept a 404 audit) or use a comment placeholder.
   - Recommendation: Add it as a comment placeholder (`// "http://localhost/showcase/"`) in the JSON (JSON doesn't support comments — use a README note). Activate it when Phase 38 creates the route. For Phase 33 CI testing, only homepage + blog post slug are active URLs.

---

## Validation Architecture

Each success criterion from the phase definition mapped to an objective check:

### SC1: @theme block with all 8 --wl-* tokens, both themes, all values Figma-traced

**Validation:**
- Token mapping table artifact completed (Figma var name → CSS property → hex value, all 8 tokens × 2 themes) — reviewer spot-checks 3 tokens against Figma
- `grep -c "wl-" src/styles/global.css` returns ≥ 16 (8 light + 8 dark)
- `grep "EXTRACT FROM FIGMA\|\[PLACEHOLDER\]" src/styles/global.css` returns 0 (no placeholders remain)
- Dark mode visual check: toggle `.dark` on `<html>` in browser DevTools → background flips, text flips, no static values

### SC2: Fraunces + Hanken Grotesk load from @fontsource-variable; Lighthouse CLS = 0 on homepage

**Validation:**
- `ls node_modules/@fontsource-variable/fraunces/` exists and shows `wght.css` + `wght-italic.css`
- `npm run build` succeeds with no Vite errors
- Browser DevTools Network tab: woff2 files served from `/_astro/` (hashed, self-hosted) — not from `fonts.googleapis.com`
- Browser DevTools Network tab: `<link rel="preload" as="font">` present for Fraunces wght-normal and Hanken Grotesk wght-normal
- `lhci collect` run on homepage → CLS score = 0.000 (not just < 0.1 — must be 0 per SC2)
- Fontaine check: output CSS in `./dist/` contains `@font-face` with `ascent-override` for at least one fallback font

### SC3: WCAG AA contrast passes for all token pairs in both themes

**Validation:**
- `node scripts/check-contrast.mjs` exits with code 0 (no FAIL lines)
- All companion `-text` tokens defined in `@theme` before script passes
- Script output includes at least: wl-ink/paper, wl-sub/paper, wl-accent/paper (large text 3:1), wl-accent-soft/paper (expected failure → replaced by wl-accent-soft-text companion at 4.5:1)

### SC4: lighthouserc.json tests landing + showcase + blog post, mobile + desktop; lcp-lazy-loaded and prioritize-lcp-image re-enabled

**Validation:**
- `cat lighthouserc.json` shows URL array with 3 entries (homepage + one real blog slug, + showcase URL per open question resolution)
- `cat lighthouserc-mobile.json` exists, has same URL array, no `preset: desktop`
- Both config files show `"lcp-lazy-loaded": "warn"` and `"prioritize-lcp-image": "warn"` (not `"off"`)
- `deploy.yml` has two `treosh/lighthouse-ci-action@v12` steps
- Local `lhci collect --config=lighthouserc.json` runs without node crash
- CI run passes all assertions (lcp-lazy-loaded warns are acceptable — they are expected until Phase 38 fixes the LCP image bug)

### SC5: Waveform mark, favicon, OG image exported from Figma and wired in

**Validation:**
- `public/favicon.svg` contains `<style>` with `@media (prefers-color-scheme: dark)` block
- `public/favicon.ico` replaced (file date newer than phase start)
- `src/components/WaveMark.astro` exists and renders inline SVG (no `<img src>`)
- `public/og-image.png` exists, dimensions 1200×630 (verify with `file public/og-image.png` or `node -e "const s=require('sharp'); s('public/og-image.png').metadata().then(m=>console.log(m.width, m.height))"`)
- `src/components/SEO.astro` line 36: `ogImage` constant references `/og-image.png` (not `/og-image.svg`)
- Joel has approved OG image composition before SEO.astro is wired (`autonomous: false` approval gate)
- `BaseLayout.astro` favicon `<link>` tags unchanged (still reference `/favicon.svg` and `/favicon.ico`)

---

## Sources

### Primary (HIGH confidence)
- Direct codebase read: `src/styles/global.css` (458 lines), `src/layouts/BaseLayout.astro`, `lighthouserc.json`, `.github/workflows/deploy.yml`, `src/components/SEO.astro`, `package.json`
- `.planning/research/STACK.md` — font package versions, import paths, @theme pattern (researched 2026-07-14)
- `.planning/research/PITFALLS.md` — 14 pitfalls, all grounded in actual codebase (researched 2026-07-14)
- `.planning/research/SUMMARY.md` — architecture, phase rationale (researched 2026-07-14)
- `.planning/phases/33-token-foundation-fonts/33-CONTEXT.md` — locked decisions D-01..D-16
- Tailwind CSS v4 docs via WebFetch: `tailwindcss.com/docs/dark-mode` — `@custom-variant` syntax confirmed
- GitHub tailwindlabs/tailwindcss discussion #18560 (via WebFetch): `@theme` vs `@theme inline` — confirmed `@theme` (no inline) required for runtime `.dark` override
- Fontsource CDN (via WebFetch): `cdn.jsdelivr.net/npm/@fontsource-variable/fraunces@5.2.9/files/` — confirmed woff2 filenames: `fraunces-latin-wght-normal.woff2`, `fraunces-latin-wght-italic.woff2`
- Fontsource preload docs (via WebFetch): `fontsource.org/docs/getting-started/preload` — confirmed `?url` Vite directive pattern for preload import
- unjs/fontaine GitHub README (via WebFetch): `resolvePath` configuration for Vite/Astro
- Lighthouse CI docs (via WebFetch): `googlechrome.github.io/lighthouse-ci/docs/configuration.html` — single `settings.preset` limitation per collect pass confirmed
- SVG favicon pattern (via WebFetch): `mikefallows.com/posts/adding-an-svg-favicon-with-dark-mode-support/` — `prefers-color-scheme` in `<style>` block, `color-scheme: light dark` declaration

### Secondary (MEDIUM confidence)
- WebSearch + LHCI GitHub issue #138: two-step approach for mobile+desktop confirmed as community pattern (no official LHCI native solution)
- WebSearch: `wcag-color-contrast` npm package (Node.js ≥22, WCAG 2.x formula); W3C relative luminance algorithm confirmed as inline-implementable
- WebSearch: Satori + Sharp for one-off OG PNG confirmed as standard Astro pattern (2025-2026 community examples)

### Tertiary (LOW confidence)
- Fontaine `resolvePath` for `@fontsource-variable` specific path: inferred from README pattern + CDN file structure. Must be verified at implementation time.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified from prior research + CDN file listings
- @theme dark mode mechanism: HIGH — verified from official Tailwind v4 docs + GitHub discussion
- Fontsource preload paths: HIGH — confirmed from CDN + Fontsource docs
- Fontaine resolvePath for fontsource: MEDIUM — inferred, needs implementation verification
- Lighthouse CI mobile+desktop: MEDIUM — limitation documented, two-step workaround is community-confirmed pattern
- Figma execution constraints: HIGH — confirmed from project MEMORY.md + CONTEXT.md
- SVG favicon: HIGH — pattern verified from official blog posts

**Research date:** 2026-07-14
**Valid until:** 2026-08-14 (30 days — stable APIs; Tailwind 4.x minor releases won't change @theme behavior)

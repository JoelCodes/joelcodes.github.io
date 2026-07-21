# Phase 33: Token Foundation + Fonts - Pattern Map

**Mapped:** 2026-07-14
**Files analyzed:** 13 new/modified files
**Analogs found:** 11 / 13

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/styles/global.css` | config | transform | `src/styles/global.css` (self — add to existing) | self |
| `src/layouts/BaseLayout.astro` | config | request-response | `src/layouts/BaseLayout.astro` (self — add to existing) | self |
| `astro.config.mjs` | config | transform | `astro.config.mjs` (self — add plugin to existing) | self |
| `lighthouserc.json` | config | batch | `lighthouserc.json` (self — expand existing) | self |
| `lighthouserc-mobile.json` | config | batch | `lighthouserc.json` | exact |
| `.github/workflows/deploy.yml` | config | event-driven | `.github/workflows/deploy.yml` (self — add step) | self |
| `scripts/check-contrast.mjs` | utility | batch | `.claude/worktrees/agent-a174d0480e1b69bfb/tests/check-token-collision.cjs` | role-match |
| `scripts/generate-og.mjs` | utility | batch | `.claude/worktrees/agent-a174d0480e1b69bfb/tests/check-token-collision.cjs` | role-match |
| `src/components/WaveMark.astro` | component | request-response | `src/components/design-system/TokenSwatch.astro` | role-match |
| `public/favicon.svg` | config | transform | `public/favicon.svg` (self — replace in place) | self |
| `public/favicon.ico` | config | transform | `public/favicon.ico` (self — replace in place) | self |
| `public/og-image.png` | config | batch | `public/og-image.svg` (predecessor asset) | partial |
| `src/components/SEO.astro` | component | request-response | `src/components/SEO.astro` (self — one-line swap) | self |

---

## Pattern Assignments

### `src/styles/global.css` — Token block additions (config, transform)

**Analog:** self — the existing `src/styles/global.css`

**Existing @theme block pattern** (lines 1–68 of current file):
```css
@import "tailwindcss";

@theme {
  /* Primary accent colors */
  --color-yellow: oklch(0.85 0.18 95);
  /* ... more tokens ... */
  --font-heading: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
}
```

**Existing dark mode flip pattern** (lines 70–71):
```css
/* Dark mode variant for class-based toggle */
@custom-variant dark (&:where(.dark, .dark *));
```

**Existing @layer utilities pattern** (lines 89–232):
```css
@layer utilities {
  .text-yellow-text {
    color: var(--color-yellow-text);
  }
  .dark .text-yellow-text {
    color: var(--color-yellow-text-dark);
  }
  /* ... more utility classes ... */
}
```

**Existing dark-mode companion token pattern** (lines 17–21 — the WCAG-compliant text variant precedent):
```css
  /* WCAG-compliant text variants for accessibility */
  --color-yellow-text: oklch(0.55 0.15 95); /* 3:1+ contrast on white for large text */
  --color-turquoise-text: oklch(0.45 0.12 195); /* 4.5:1+ contrast on white for normal text */
```

**NEW code to insert — placement and structure:**

1. Fontsource @import lines go at the very top of the file, immediately after `@import "tailwindcss"`:
```css
@import '@fontsource-variable/fraunces/wght.css';
@import '@fontsource-variable/fraunces/wght-italic.css';
@import '@fontsource-variable/hanken-grotesk/wght.css';
```

2. New `@theme` block goes ABOVE the existing `@theme` block, with an isolation comment:
```css
/* ============================================================
   WL TOKENS (v3.0 Wavelength — namespace isolated via --wl- prefix)
   DO NOT edit old token block below until Phase 41 cleanup
   ============================================================ */
@theme {
  /* Palette (light mode defaults) — all values EXTRACTED FROM FIGMA */
  --color-wl-ink:              [FIGMA VALUE];
  --color-wl-sub:              [FIGMA VALUE];
  --color-wl-accent:           [FIGMA VALUE];
  --color-wl-accent-soft:      [FIGMA VALUE];
  --color-wl-sea-glass:        [FIGMA VALUE];
  --color-wl-sea-glass-deep:   [FIGMA VALUE];
  --color-wl-paper:            [FIGMA VALUE];
  --color-wl-line:             [FIGMA VALUE];
  /* Companion text token (contrast gate output — D-09) */
  --color-wl-accent-soft-text: [DERIVED — min darkening to 4.5:1 on wl-paper];
  /* Font family tokens */
  --font-wl-heading: 'Fraunces Variable', Georgia, serif;
  --font-wl-body:    'Hanken Grotesk Variable', ui-sans-serif, system-ui, sans-serif;
}

/* Dark mode semantic flip (D-01) — plain .dark {} block, NOT a second @theme */
.dark {
  --color-wl-ink:            [FIGMA DARK VALUE or frame 117:103];
  --color-wl-sub:            [FIGMA DARK VALUE];
  --color-wl-paper:          [FIGMA DARK VALUE];
  --color-wl-sea-glass:      [FIGMA DARK VALUE];
  --color-wl-sea-glass-deep: [FIGMA DARK VALUE];
  --color-wl-line:           [FIGMA DARK VALUE];
  /* --color-wl-accent and --color-wl-accent-soft omitted if no dark Figma evidence (D-04) */
}
```

3. Body default goes inside a NEW `@layer base` block (the file has no existing `@layer base`):
```css
@layer base {
  body {
    font-family: var(--font-wl-body);
  }
}
```

4. Type ramp utilities go inside the existing `@layer utilities` block, appended after existing utility classes. Follow the same inline @media breakpoint pattern used in the project:
```css
/* WL Type Ramp — composite classes per Figma node 36:5 */
.wl-{style-name} {
  font-family: var(--font-wl-heading);  /* or --font-wl-body per Figma style */
  font-size: [Figma 1440px value];
  font-weight: [Figma value];
  line-height: [Figma value];
  letter-spacing: [Figma value];
  font-optical-sizing: auto;  /* for Fraunces styles */
}
@media (max-width: 1920px) { .wl-{style-name} { font-size: [Figma 1920px value]; } }
@media (max-width: 768px)  { .wl-{style-name} { font-size: [Figma 768px value]; } }
@media (max-width: 390px)  { .wl-{style-name} { font-size: [Figma 390px value]; } }
```

**Critical rule from existing file:** The file does NOT use `@theme inline` anywhere. The existing `@theme` block proves the pattern: plain `@theme` (no `inline`) so values remain runtime-overridable CSS custom properties. The new `--wl-*` block must follow the same pattern.

---

### `src/layouts/BaseLayout.astro` — Fontsource preload additions (config, request-response)

**Analog:** self — the existing `src/layouts/BaseLayout.astro`

**Existing Google Fonts loading pattern** (lines 31–48 — the pattern to keep AND the preload technique to emulate):
```astro
<!-- Google Fonts - preconnect for initial connection, dns-prefetch as fallback -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="dns-prefetch" href="https://fonts.gstatic.com" />
<!-- Non-render-blocking font loading with print media swap -->
<link
  rel="preload"
  as="style"
  href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:..."
/>
```

**Existing FOUC-prevention inline script pattern** (lines 51–58 — KEEP UNCHANGED):
```astro
<!-- Dark mode script - runs before body renders to prevent FOUC -->
<script is:inline>
  document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
       window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
</script>
```

**Existing favicon link tags** (lines 19–20 — KEEP TAGS UNCHANGED, files replace in place):
```astro
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" href="/favicon.ico" />
```

**NEW code to insert in frontmatter** (after existing imports, before closing `---`):
```astro
---
import '../styles/global.css';
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
import SEO from '../components/SEO.astro';

// Fontsource preload — ?url suffix resolves to hashed Vite asset URL
// Filenames verified from CDN at v5.2.9; re-verify after npm install
import fraunceWoff2 from '@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2?url';
import frauncesItalicWoff2 from '@fontsource-variable/fraunces/files/fraunces-latin-wght-italic.woff2?url';
import hankenWoff2 from '@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2?url';
---
```

**NEW `<link rel="preload">` tags to insert in `<head>`** (before closing `</head>`, after the SEO component, before existing Google Fonts block):
```astro
<!-- Self-hosted font preloads (fontsource-variable) -->
<link rel="preload" as="font" type="font/woff2" href={fraunceWoff2} crossorigin="anonymous" />
<link rel="preload" as="font" type="font/woff2" href={frauncesItalicWoff2} crossorigin="anonymous" />
<link rel="preload" as="font" type="font/woff2" href={hankenWoff2} crossorigin="anonymous" />
```

**DO NOT REMOVE** the existing Google Fonts block (lines 30–48). It stays for this phase; removal is Phase 41.

---

### `astro.config.mjs` — Fontaine plugin addition (config, transform)

**Analog:** self — the existing `astro.config.mjs`

**Existing Vite plugins pattern** (lines 3 and 21–23):
```js
import tailwindcss from '@tailwindcss/vite';

// ...
vite: {
  plugins: [tailwindcss()],
},
```

**Existing integrations pattern** (lines 25–44) — shows how multiple plugins are added in sequence:
```js
integrations: [
  expressiveCode(),
  mdx(),
  sitemap({ changefreq: 'weekly', priority: 0.7, lastmod: new Date() }),
  robotsTxt({ sitemap: true, policy: [{ userAgent: '*', allow: '/' }] }),
],
```

**NEW code to insert** — add Fontaine after tailwindcss() in the `vite.plugins` array:
```js
import { FontaineTransform } from 'fontaine';

// ...
vite: {
  plugins: [
    tailwindcss(),
    // Two invocations: different fallback stacks per font family
    FontaineTransform.vite({
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],  // Fraunces (serif)
      resolvePath: (id) => new URL(`./node_modules${id}`, import.meta.url),
    }),
    FontaineTransform.vite({
      fallbacks: ['Arial', 'Helvetica Neue', 'sans-serif'],  // Hanken Grotesk (sans-serif)
      resolvePath: (id) => new URL(`./node_modules${id}`, import.meta.url),
    }),
  ],
},
```

**Note:** The `resolvePath` pattern must be verified at implementation time — see RESEARCH.md Pitfall 3. Add a `console.log` in `resolvePath` during dev to verify. The correct path may require `./node_modules/@fontsource-variable` rather than `./node_modules`.

---

### `lighthouserc.json` — Expand existing config (config, batch)

**Analog:** self — the existing `lighthouserc.json`

**Current full structure** (all 36 lines):
```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "settings": { "preset": "desktop" },
      "staticDistDir": "./dist",
      "url": ["http://localhost/"]
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
        "image-delivery-insight": "off",
        "network-dependency-tree-insight": "off",
        "modern-image-formats": "off",
        "render-blocking-insight": "off",
        "render-blocking-resources": "off",
        "lcp-lazy-loaded": "off",
        "non-composited-animations": "off",
        "prioritize-lcp-image": "off",
        "uses-responsive-images": "off"
      }
    },
    "upload": { "target": "temporary-public-storage" }
  }
}
```

**Changes required:**
- `url` array: expand from `["http://localhost/"]` to `["http://localhost/", "http://localhost/blog/{real-slug}/"]`. The `{real-slug}` must be discovered by running `npm run build` and checking `dist/blog/*/` — identify the actual directory name.
- `lcp-lazy-loaded`: change from `"off"` to `"warn"`
- `prioritize-lcp-image`: change from `"off"` to `"warn"`
- `render-blocking-insight`: keep `"off"` (Google Fonts still loading)
- `render-blocking-resources`: keep `"off"` (same reason)
- All other assertions: unchanged

---

### `lighthouserc-mobile.json` — New file (config, batch)

**Analog:** `lighthouserc.json` (exact role match — identical structure, only `preset` removed)

**Copy pattern from** `lighthouserc.json` (all lines), then apply this single structural change: remove `"settings": { "preset": "desktop" }` from the `collect` block entirely. Lighthouse default = mobile emulation (Moto G4). All other fields including the `url` array and `assert` block are identical to the updated `lighthouserc.json`.

```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "staticDistDir": "./dist",
      "url": ["http://localhost/", "http://localhost/blog/{real-slug}/"]
    },
    "assert": {
      /* IDENTICAL to lighthouserc.json assert block */
    },
    "upload": { "target": "temporary-public-storage" }
  }
}
```

---

### `.github/workflows/deploy.yml` — Add mobile Lighthouse step (config, event-driven)

**Analog:** self — the existing `.github/workflows/deploy.yml`

**Existing Lighthouse CI step pattern** (lines 38–45 — copy this step and change the configPath):
```yaml
- name: Run Lighthouse CI
  uses: treosh/lighthouse-ci-action@v12
  with:
    configPath: './lighthouserc.json'
    staticDistDir: './dist'
    uploadArtifacts: true
    temporaryPublicStorage: true
    runs: 3
```

**NEW step to insert** immediately after the existing Lighthouse step (before "Upload build artifact"):
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

The YAML indentation, `uses` version pin, and field names must match the existing step exactly.

---

### `scripts/check-contrast.mjs` — New utility (utility, batch)

**Analog:** `.claude/worktrees/agent-a174d0480e1b69bfb/tests/check-token-collision.cjs`

This is the closest existing analog — a standalone dev script that reads project data, checks conditions against a rule set, reports PASS/FAIL per item, and exits with code 0 (pass) or 1 (fail). It is the structural template for the contrast script.

**Script structure pattern from analog:**
```js
// Read source files / data
// Define the rule set (collision names there; token pair matrix here)
// Loop over each item
//   Check the condition
//   console.log PASS/FAIL + details
//   if fail: set failed = true
// process.exit(failed ? 1 : 0)
```

**Concrete analog** (`check-token-collision.cjs` lines 1–65):
```js
// Header comment: phase, purpose, format note (CommonJS vs ESM)
const fs = require('fs');
const path = require('path');

// Define constants
const TOKEN_RE = /--([a-zA-Z][a-zA-Z0-9-]*)\s*:/g;

// Pure functions for data extraction
function extractTokenNames(filePath) { ... }
function fileExists(p) { ... }

// Guard clauses with early exit
if (!hasV1) { console.log('...'); process.exit(0); }

// Main assertion loop
const collisions = [];
for (const name of v2Names) {
  if (v1Names.has(name)) collisions.push(name);
}

// Report + exit
if (collisions.length > 0) {
  for (const name of collisions) { console.error('COLLISION: --' + name); }
  console.error('Total collisions: ' + collisions.length);
  process.exit(1);
}
console.log('OK: ...');
process.exit(0);
```

**New file adapts this pattern for contrast checking** — ESM (`.mjs`) because `package.json` is `"type": "module"`:
```js
// scripts/check-contrast.mjs
// W3C WCAG 2.x relative luminance formula — inline, no deps

// Pure utility functions
function hexToRgb(hex) { ... }
function linearize(c) { ... }
function relativeLuminance([r, g, b]) { ... }
function contrastRatio(hex1, hex2) { ... }

// Token pair matrix — mockup-observed pairs only (D-11)
// All hex values filled in from Figma extraction (no placeholders in final file)
const PAIRS = [
  // [foreground, background, usage label, threshold]
  ['#...', '#...', 'wl-ink on wl-paper (body)', 4.5],
  // ... full matrix for both themes
];

// Assertion loop — same pattern as analog
let failed = false;
for (const [fg, bg, label, threshold] of PAIRS) {
  const ratio = contrastRatio(fg, bg);
  const pass = ratio >= threshold;
  console.log(`${pass ? 'PASS' : 'FAIL'} ${label}: ${ratio.toFixed(2)}:1 (threshold ${threshold}:1)`);
  if (!pass) failed = true;
}
process.exit(failed ? 1 : 0);
```

---

### `scripts/generate-og.mjs` — New utility (utility, batch)

**Analog:** `.claude/worktrees/agent-a174d0480e1b69bfb/tests/check-token-collision.cjs` (role-match: dev script that reads inputs, produces output, exits cleanly)

**Script structure pattern** (same one-time-execution + clean-exit form as check-token-collision.cjs):
```js
// scripts/generate-og.mjs
// One-off script. Run manually: node scripts/generate-og.mjs
// Requires: npm install --save-dev @vercel/satori sharp

import satori from '@vercel/satori';
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';

// Inputs: brand elements from Figma extraction (placed in plan before this runs)
const WL_PAPER = '#...';  // Filled from Figma extraction
const WL_INK   = '#...';  // Filled from Figma extraction

// Satori JSX-like markup (React-style objects, not JSX syntax)
const svg = await satori(/* element tree */, {
  width: 1200,
  height: 630,
  fonts: [
    { name: 'Fraunces', data: readFileSync('./node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2'), style: 'normal' },
  ],
});

// Convert SVG to PNG with sharp
const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync('./public/og-image.png', png);
console.log('OG image written to public/og-image.png (1200x630)');
```

---

### `src/components/WaveMark.astro` — New component (component, request-response)

**Analog:** `src/components/design-system/TokenSwatch.astro`

TokenSwatch is the closest existing analog — a small, purely-presentational Astro component with typed Props interface, direct `Astro.props` destructuring, no slot, and inline style usage.

**Props interface pattern from TokenSwatch** (lines 1–11):
```astro
---
export interface Props {
  name: string;
  cssVar: string;
  oklch: string;
  hex: string;
  darkOklch?: string;
  darkHex?: string;
}

const { name, cssVar, oklch, hex, darkOklch, darkHex } = Astro.props;
---
```

**Inline SVG with style prop pattern from TokenSwatch** (lines 14–20):
```astro
<div
  class="token-swatch ..."
  style={`background: var(${cssVar});`}
  aria-hidden="true"
>
```

**WaveMark.astro adapts this pattern:**
```astro
---
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
  <!-- Path data extracted from Figma via MCP — DO NOT hand-author -->
  <path d="[FIGMA SVG PATH DATA]" stroke="currentColor" stroke-width="2" />
</svg>
```

**Pattern notes:**
- `interface Props` (not `export interface Props`) matches the non-exported pattern used in `SEO.astro` and `Button.astro` — both use un-exported `interface Props`
- `class: className` rename (to avoid reserved word) is the same pattern as `Button.astro` line 5: `class?: string` + line 17: `class: className = ''`
- `aria-hidden="true"` — decorative SVG, same as TokenSwatch `aria-hidden`
- `stroke="currentColor"` — inherits parent's `color` CSS property, theme-adaptive without any `.dark` CSS needed

---

### `public/favicon.svg` — Replace in place (config, transform)

**Analog:** self — the existing `public/favicon.svg`

**Current file structure** (7 lines — shows the prefers-color-scheme pattern already present in this project):
```svg
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 128 128">
    <path d="M50.4 78.5a75.1 75.1 0 0 0-28.5 6.9l24.2-65.7..." />
    <style>
        path { fill: #000; }
        @media (prefers-color-scheme: dark) {
            path { fill: #FFF; }
        }
    </style>
</svg>
```

**The existing favicon.svg already uses the exact pattern required by D-14.** The replacement file copies this structure:
- Outer `<svg>` with `xmlns`, `fill="none"`, `viewBox`
- `<path>` element(s) with path data from Figma
- `<style>` block with:
  - Default stroke/fill using `--wl-ink` light hex value
  - `@media (prefers-color-scheme: dark)` block using `--wl-ink` dark hex value

**New replacement structure:**
```svg
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
  <style>
    path, line { stroke: [WL-INK LIGHT HEX]; fill: none; }
    @media (prefers-color-scheme: dark) {
      path, line { stroke: [WL-INK DARK HEX]; }
    }
  </style>
  <!-- Waveform mark path data from Figma extraction -->
  <path d="[FIGMA PATH DATA]" stroke-width="2" />
</svg>
```

---

### `src/components/SEO.astro` — One-line OG image swap (component, request-response)

**Analog:** self — the existing `src/components/SEO.astro`

**Target line** (line 36 in current file):
```astro
const ogImage = `${SITE_URL}/og-image.svg`;
```

**After change:**
```astro
const ogImage = `${SITE_URL}/og-image.png`;
```

No other changes to this file. All Props, meta tags, JSON-LD, and Twitter Card tags remain identical. This change is gated behind Joel's OG image approval (`autonomous: false`).

---

## Shared Patterns

### Dark Mode Class Toggle
**Source:** `src/styles/global.css` lines 70–71 and `src/layouts/BaseLayout.astro` lines 51–58
**Apply to:** All new `.dark { }` blocks in global.css
```css
/* This is the existing variant — DO NOT duplicate or modify */
@custom-variant dark (&:where(.dark, .dark *));
```
The new `--wl-*` dark flip goes in a plain `.dark { }` block (not another `@custom-variant`). It hooks into this existing mechanism automatically.

### FOUC Prevention Script
**Source:** `src/layouts/BaseLayout.astro` lines 51–58
**Apply to:** No changes — this script stays exactly as-is. New `.dark { --color-wl-* }` block in global.css is picked up automatically by the existing mechanism.

### Astro Props Interface Pattern
**Source:** `src/components/SEO.astro` lines 11–16, `src/components/ui/Button.astro` lines 2–9
**Apply to:** `src/components/WaveMark.astro`
```astro
---
interface Props {
  class?: string;
  size?: number;
}
const { class: className = '', size = 32 } = Astro.props;
---
```
Both existing components use un-exported `interface Props` in the component frontmatter (no `export`). WaveMark follows this convention.

### GitHub Actions Step Structure
**Source:** `.github/workflows/deploy.yml` lines 20–45
**Apply to:** New mobile Lighthouse CI step in `deploy.yml`
```yaml
- name: Step Name
  uses: action/name@vN
  with:
    key: value
```
Field order: `name`, `uses`, `with` block. Indentation: 6 spaces for step properties, 8 for `with` sub-keys. Match exactly.

### Dev Script Structure (ESM)
**Source:** `.claude/worktrees/agent-a174d0480e1b69bfb/tests/check-token-collision.cjs` (adapted to ESM)
**Apply to:** `scripts/check-contrast.mjs`, `scripts/generate-og.mjs`

Note: The analog is CommonJS (`.cjs`) because it was written before clarifying `package.json "type": "module"`. New scripts in `scripts/` must be `.mjs` (ESM). Pattern: pure functions at top, constants next, main logic as top-level `await`-free sync code or `async` IIFE, `process.exit(code)` at end.

---

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `public/favicon.ico` | config | transform | ICO binary format — no analog exists; must be generated from the SVG using `sharp` or an ICO tool. The existing `public/favicon.ico` is itself the predecessor but has no generation script to reference. |
| `public/og-image.png` | config | batch | No PNG generation script exists in the codebase. `scripts/generate-og.mjs` is the generation mechanism; the asset itself has no analog beyond the existing `public/og-image.svg` (predecessor, different format). |

---

## Metadata

**Analog search scope:** `src/styles/`, `src/layouts/`, `src/components/`, `.github/workflows/`, `public/`, `lighthouserc.json`, `astro.config.mjs`, `package.json`, `.claude/worktrees/*/tests/`
**Files scanned:** 20
**Pattern extraction date:** 2026-07-14

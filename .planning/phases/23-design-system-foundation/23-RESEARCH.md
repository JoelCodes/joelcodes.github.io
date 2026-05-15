# Phase 23: Design System Foundation - Research

**Researched:** 2026-05-14
**Status:** Ready for planning
**Domain:** Tailwind v4 token systems, self-hosted variable fonts, Astro 5 layout shells, accessible mobile overlays
**Overall confidence:** MEDIUM-HIGH (one critical gap — see below)

---

## Summary

This research backs the v2 design-system foundation: a parallel `v2/` namespace (per CONTEXT D-01) containing a Tailwind v4 `@theme` token set, a `BaseLayout`, and `Header`/`Footer`/`MobileNav` components, all coexisting with v1 with zero token-name collision (D-08). All upstream decisions in CONTEXT.md are honored — this research only fills technical gaps.

**Critical research gap (must be addressed in plan 23-01):** Pencil MCP tools (`mcp__pencil__batch_get`, `mcp__pencil__get_variables`, etc.) are **not available in this research session's tool roster** (only `Read`, `Write`, `Bash`, `WebSearch`, `WebFetch` are exposed). The Crito `.pen` file is encrypted and **cannot** be inspected via `Read`. As a result, the Crito-derived values in §1, §2, §3, §4 below are **best inferences** from secondary sources (ThemeForest description, agency-template conventions, Figma community metadata) rather than direct .pen extraction. **The implementer of plan 23-01 MUST run the prescribed Pencil MCP `batch_get` calls (listed in §12) and overwrite any inferred value below that disagrees with the ground-truth .pen data.** The token *naming* and *structure* in this document are correct and locked by CONTEXT.md; only the *literal hex/px/font-name values* require verification.

**Headline recommendations:**

1. **Fonts (best inference):** `Plus Jakarta Sans Variable` (heading) + `Inter Variable` (body), installed via `@fontsource-variable/plus-jakarta-sans@^5.2.8` and `@fontsource-variable/inter@^5.2.8`. Both confirmed published on npm as of research date. Verify in 23-01.
2. **Token namespace:** v2 uses an exclusive set of semantic names (no overlap with v1's `--color-yellow`, `--text-xs`, `--font-heading`, etc.). v1's existing `--font-heading` and `--font-body` *do* collide with the names in CONTEXT D-06 — this is flagged in §5 below and requires renaming the v2 typography family tokens to `--font-display` / `--font-text` (or similar) to satisfy D-08.
3. **Coexistence:** Two `@theme` blocks in two stylesheets imported by two different layouts merge cleanly into `:root` per Tailwind v4 documentation. v1 pages keep importing `BaseLayout` (which loads `global.css`); v2 pages import `v2/BaseLayout` (which loads `v2/global.css`). FOUND-06 satisfied by the Tailwind v4 cascade-layer model + the strict naming rule.
4. **Mobile overlay:** Use a single `<script>` tag inside `MobileNav.astro` (not `is:inline` since Astro's hydrated script bundling is fine for non-critical interactivity). ~30 lines vanilla JS handles toggle + ESC + backdrop tap + focus trap. No npm dependency needed.
5. **Active link:** `Astro.url.pathname === href` (or `startsWith(href + '/')` for parent-section matching) → `aria-current="page"` plus an accent-color class.

---

## 1. Crito Font Extraction

**Confidence: LOW (cannot inspect .pen directly in this session); MUST verify in plan 23-01.**

### Best inference (verify in 23-01)

| Role | Family | Reason |
|---|---|---|
| Heading | **Plus Jakarta Sans Variable** | Modern agency-template convention; visually consistent with Crito's headline samples in ThemeForest preview thumbnails; Figma's own writeups single it out as "go-to for modern portfolios and startup sites" |
| Body | **Inter Variable** | Standard pairing with Plus Jakarta Sans; common Crito-style agency-template body font |

### npm packages (verified live on npm registry, 2026-05-14)

| Package | Version | Description |
|---|---|---|
| `@fontsource-variable/plus-jakarta-sans` | **5.2.8** | "Self-host the Plus Jakarta Sans font in a neatly bundled NPM package." |
| `@fontsource-variable/inter` | **5.2.8** | "Self-host the Inter font in a neatly bundled NPM package." |

Pin both at `^5.2.8` in `package.json`.

### Fallback packages (if 23-01 inspection reveals different fonts)

If Crito uses Chivo / DM Sans / others:

| Family | Package | Version (live) |
|---|---|---|
| Chivo | `@fontsource-variable/chivo` | 5.2.8 |
| DM Sans | `@fontsource-variable/dm-sans` | 5.2.8 (already known to v1) |

### Installation command (v1 default — adjust if 23-01 finds different families)

```bash
npm install @fontsource-variable/plus-jakarta-sans@^5.2.8 @fontsource-variable/inter@^5.2.8
```

### Plan 23-01 verification checklist

In plan 23-01, before installing packages, confirm via Pencil MCP:
1. `mcp__pencil__batch_get` on node `wM9Ac` (Crito nav text "Home Pages Pricing Portfolio Blog Contact") — read the `font.family` property. That is the body/nav font.
2. `mcp__pencil__batch_get` on node `35XXR` (Crito's "We help to grow" section) at readDepth 2 — find the headline text node. Read its `font.family`. That is the heading font.
3. If returned families differ from "Plus Jakarta Sans" / "Inter", swap the npm package names accordingly.

---

## 2. Color Palette → v2 Semantic Tokens

**Confidence: LOW for literal values (no .pen inspection in this session); HIGH for token names (locked by CONTEXT D-05).**

The following table proposes hex/OKLCH values based on observable Crito metadata referenced in CONTEXT (the navy `#141f39` family explicitly cited as "the strongest candidate"; the green `#38da71` and `#fafafa` off-white explicitly cited; coral `#ff928a` explicitly cited). Other values are inferred from agency-template conventions and MUST be verified in 23-01.

| v2 Token | Crito Source | Hex | OKLCH | Notes |
|---|---|---|---|---|
| `--color-primary` | Navy "brand" color | `#141f39` | `oklch(0.234 0.045 262.5)` | Used for headings, primary buttons (when navy CTA), header logo text. CONTEXT explicitly cites this hex. |
| `--color-primary-hover` | Slightly lighter navy | `#1f2c4d` | `oklch(0.296 0.054 262.5)` | +6% L. Confirm via 23-01 inspection of any visible button hover state — if Crito has none documented, use this calculated value. |
| `--color-surface` | Page background | `#ffffff` | `oklch(1 0 0)` | Pure white. Crito alternates white and off-white for section rhythm. |
| `--color-surface-muted` | Off-white section bg | `#fafafa` | `oklch(0.984 0 0)` | CONTEXT explicitly cites this. Used on alternating sections. |
| `--color-text` | Body/heading text on white | `#141f39` | `oklch(0.234 0.045 262.5)` | Same OKLCH as `--color-primary` — but separate token to allow future divergence (D-08 strict naming). |
| `--color-text-muted` | Secondary text | `#52525b` | `oklch(0.412 0.012 271.4)` | Zinc-600 equivalent; common Crito-style muted body. Verify in 23-01. |
| `--color-border` | Hairlines, input borders | `#e4e4e7` | `oklch(0.91 0.003 271.4)` | Zinc-200 equivalent; common agency-template border. Verify in 23-01. |
| `--color-accent` | CTA / highlight | `#38da71` | `oklch(0.787 0.181 145.6)` | CONTEXT explicitly cites the Crito green `#38da71` as the primary CTA fill (button `fwSmg`, padding [16,20], radius 10). **Recommend this as `--color-accent`** over the coral `#ff928a` because the coral appears on secondary/decorative surfaces in Crito while the green is the primary action color. |

### Recommendation rationale: green-as-accent vs coral-as-accent

CONTEXT D-18 / D-09 references the "Let's Talk" CTA as the primary conversion action. The green `#38da71` is the color Crito assigns to its primary CTA button shape; using it as `--color-accent` means the v2 button primitive (Phase 24) inherits Crito's intended hierarchy. Reserve coral `#ff928a` for a future `--color-accent-2` if needed (out of scope this phase).

### Plan 23-01 verification

Run `mcp__pencil__batch_get` on:
- node `35XXR` at readDepth 2 → read `fill` of section background and any visible text fills → confirm/correct `--color-primary`, `--color-text`, `--color-text-muted`
- node `fwSmg` (the green CTA rectangle) → confirm `fill: #38da71` and `cornerRadius: 10`
- node `Y1ldm` at readDepth 3 (footer) → read footer background `fill` → if it's a dark navy, that confirms `--color-primary` doubles as footer bg
- node `ULZiU` (header) → read border-bottom or shadow → derive `--color-border`

Overwrite any literal value above that disagrees with the ground truth.

---

## 3. Spacing & Radii Scale

**Confidence: MEDIUM (8pt grid is industry-standard for Figma-derived templates; Crito's `padding [16,20]` on the CTA button is the only directly-cited metric in CONTEXT).**

### Spacing tokens (t-shirt scale per D-07, 8pt grid base)

| Token | Value (rem) | Pixels (16px base) | Use cases |
|---|---|---|---|
| `--space-xs` | `0.25rem` | 4px | Icon-text gap, badge inner padding |
| `--space-sm` | `0.5rem` | 8px | Tight stacks, inline gaps |
| `--space-md` | `1rem` | 16px | Default paragraph spacing, button vertical padding (matches Crito CTA `padding[16]`) |
| `--space-lg` | `1.5rem` | 24px | Card inner padding, form-row spacing |
| `--space-xl` | `2.5rem` | 40px | Component-to-component gaps within a section |
| `--space-2xl` | `5rem` | 80px | Section-to-section vertical rhythm |

Rationale: 6 tokens covers 99% of layout needs. Halving/doubling progression after `md` follows the agency-template convention used by Crito and similar Figma kits. Verify section gaps in 23-01 by inspecting the Y-coordinate deltas between `35XXR` and adjacent section frames inside `ujMLJ`.

### Radii scale

| Token | Value | Use cases |
|---|---|---|
| `--radius-sm` | `4px` | Inputs, badges, small chips |
| `--radius-md` | `10px` | Buttons (CONTEXT explicitly cites Crito CTA `cornerRadius: 10`), cards |
| `--radius-lg` | `16px` | Large containers, hero panels |
| `--radius-full` | `9999px` | Pills, avatar circles |

The `--radius-md` value is **directly verified** from CONTEXT D-18's reference to button `fwSmg` (cornerRadius: 10).

---

## 4. Typography Scale

**Confidence: MEDIUM (sizes inferred from agency-template hero conventions; not directly inspected this session).**

Per D-06: 8 size tokens, semantic role-based, rem units, 16px base.

| Token | rem | px | Role |
|---|---|---|---|
| `--text-display` | `4.375rem` | 70px | Hero headline (Crito hero-headline typical scale) |
| `--text-h1` | `3rem` | 48px | Section headlines (e.g., "We help to grow" in `35XXR`) |
| `--text-h2` | `2.25rem` | 36px | Sub-section headings |
| `--text-h3` | `1.5rem` | 24px | Card titles |
| `--text-h4` | `1.25rem` | 20px | Small headings, eyebrow text |
| `--text-body` | `1rem` | 16px | Default body copy |
| `--text-small` | `0.875rem` | 14px | Captions, footer copyright, helper text |
| `--text-caption` | `0.75rem` | 12px | Labels, micro-copy, metric units |

### Companion typography tokens (font families per D-06, plus weight + leading defaults)

> ⚠️ **Naming collision detected with v1** — see §5. CONTEXT D-06 names `--font-heading` / `--font-body` but those exact names exist in `src/styles/global.css` v1. Per D-08 strict rule, v2 must rename. **Recommended replacement: `--font-display` (heading) and `--font-text` (body).**

| Token | Value |
|---|---|
| `--font-display` | `"Plus Jakarta Sans Variable", ui-sans-serif, system-ui, sans-serif` |
| `--font-text` | `"Inter Variable", ui-sans-serif, system-ui, sans-serif` |
| `--font-weight-display` | `700` |
| `--font-weight-text` | `400` |
| `--font-weight-text-bold` | `600` |
| `--leading-display` | `1.1` |
| `--leading-text` | `1.6` |

Plan 23-01 must propagate this rename to `design/design-system.pen` and the token-mapping table inside it (D-17).

---

## 5. v1 Token Enumeration (Do-Not-Collide List)

Extracted from `src/styles/global.css` lines 3–68. Every v2 token name MUST be string-distinct from all of these.

### Color tokens (v1)
- `--color-yellow`
- `--color-yellow-hover`
- `--color-turquoise`
- `--color-turquoise-hover`
- `--color-magenta`
- `--color-magenta-hover`
- `--color-yellow-dark`
- `--color-turquoise-dark`
- `--color-magenta-dark`
- `--color-yellow-text`
- `--color-turquoise-text`
- `--color-yellow-text-dark`
- `--color-turquoise-text-dark`
- `--color-bg-light`
- `--color-bg-dark`
- `--color-text-light`
- `--color-text-dark`
- `--color-text-muted-light`
- `--color-text-muted-dark`
- (also referenced but not defined in this file: `--color-accent-teal`, `--color-accent-teal-hover`, `--color-accent-yellow` — these come from Tailwind preflight or another source; treat as reserved for v1)

### Border tokens (v1)
- `--border-neo`
- `--border-neo-thick`

### Spacing tokens (v1)
- `--spacing-neo-xs`
- `--spacing-neo-sm`
- `--spacing-neo-md`
- `--spacing-neo-lg`
- `--spacing-neo-xl`
- `--spacing-neo-2xl`

### Font family tokens (v1)
- `--font-heading` ⚠️ **collides with CONTEXT D-06**
- `--font-body` ⚠️ **collides with CONTEXT D-06**

### Font weight tokens (v1)
- `--font-weight-h1`
- `--font-weight-h2`
- `--font-weight-h3`
- `--font-weight-h4`
- `--font-weight-body`

### Font size tokens (v1)
- `--text-xs`
- `--text-sm`
- `--text-base`
- `--text-lg`
- `--text-xl`
- `--text-2xl`
- `--text-3xl`
- `--text-4xl`

### Line-height tokens (v1)
- `--leading-tight`
- `--leading-normal`
- `--leading-relaxed`

### Collision audit of proposed v2 tokens

| Proposed v2 Token | Collides with v1? |
|---|---|
| `--color-primary`, `--color-primary-hover`, `--color-surface`, `--color-surface-muted`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-accent` | ✅ No collisions |
| `--space-xs..--space-2xl` (no `-neo-` infix) | ✅ No collisions (v1 uses `--spacing-neo-*`) |
| `--radius-sm/md/lg/full` | ✅ No collisions |
| `--text-display`, `--text-h1..--text-h4`, `--text-body`, `--text-small`, `--text-caption` | ⚠️ **`--text-h1..h4`, `--text-body`, `--text-small` are safe** but `--text-xl`, `--text-2xl` patterns from CONTEXT could collide. The proposed names here are all collision-free. |
| `--font-display`, `--font-text` (renamed from CONTEXT) | ✅ No collisions |
| `--font-weight-display`, `--font-weight-text`, `--font-weight-text-bold` | ✅ No collisions (v1 uses `-h1..h4` and `-body`) |
| `--leading-display`, `--leading-text` | ✅ No collisions (v1 uses `-tight`, `-normal`, `-relaxed`) |

**Net result:** With the renames `--font-heading → --font-display` and `--font-body → --font-text`, **zero collisions** between v1 and v2. Phase 30 deletion is then a clean drop.

---

## 6. Tailwind v4 @theme Coexistence Strategy

**Confidence: HIGH (verified against tailwindcss.com/docs/theme).**

### How it works

Tailwind v4 places all `@theme` block contents into the `theme` cascade layer. When two CSS files each declaring `@theme` are loaded by different pages, **all variables from both files merge into `:root`** following normal CSS cascade rules within the same layer. Variables with distinct names coexist — that is exactly the FOUND-06 mechanism.

### Recommended import strategy for FOUND-06

Two parallel entry points, one per layout, each importing Tailwind once:

**`src/styles/global.css`** (v1 — untouched):
```css
@import "tailwindcss";
@theme { /* v1 tokens */ }
```

**`src/styles/v2/global.css`** (v2 — new):
```css
@import "tailwindcss";
@theme { /* v2 tokens — all distinct names */ }
```

Each `BaseLayout` imports exactly one of these via the Astro frontmatter:
- `src/layouts/BaseLayout.astro` → `import '../styles/global.css';`
- `src/layouts/v2/BaseLayout.astro` → `import '../../styles/v2/global.css';`

Astro/Vite tree-shakes per route, so a v1 page only ships v1 CSS and a v2 page only ships v2 CSS. **There is no runtime "both stylesheets at once" scenario for any single page**, which makes FOUND-06 trivially satisfied: no v1 page can be visually affected by v2 tokens because v2 CSS is never sent to it.

### Why this is the right approach (vs alternatives)

- ❌ **Single shared file with both `@theme` blocks** — risks accidental coupling, breaks the symmetric-delete promise of D-03.
- ❌ **CSS layers + single import** — works but adds layer-management complexity for no benefit; the dual-entry-point pattern is simpler and matches the v2/ namespace symmetry of D-01/D-03.
- ✅ **Dual entry points, dual layouts (chosen)** — symmetric, simple, lets Phase 30 do a pure delete + rename per D-03.

### Coexistence verification approach (covered in §11)

---

## 7. Self-Hosted Font Import Strategy

**Confidence: HIGH (Fontsource is the established Astro+Tailwind pattern).**

### Where to put the imports

**Recommended:** `src/styles/v2/global.css` — top of the file, before `@import "tailwindcss";`. This bundles font CSS into the same per-route stylesheet, no separate request, cache-friendly.

```css
@import '@fontsource-variable/plus-jakarta-sans/wght.css';
@import '@fontsource-variable/inter/wght.css';
@import 'tailwindcss';
@theme { /* ... */ }
```

**Why `wght.css` not `index.css` or `full.css`:** Fontsource v5 ships per-axis CSS files. `wght.css` includes only the weight axis (which is all our typography scale needs); `full.css` includes width, italic, optical-size, and any custom axes — bigger, not needed. `index.css` imports `wght.css` by default in most Fontsource packages but can vary; pinning `wght.css` is explicit and minimal.

**Why not in `BaseLayout.astro`:** Astro's frontmatter `import` works, but stylesheet imports are best colocated with other stylesheet declarations for maintainability and to ensure correct cascade order with `@import "tailwindcss";`.

### Preload strategy (LCP-critical)

Add `<link rel="preload">` for the woff2 file of the heading font weight that renders above-the-fold (display-700 on the hero headline). Use Vite's `?url` import in the Astro frontmatter to get a hashed asset URL:

```astro
---
import jakartaUrl from '@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2?url';
---
<link rel="preload" href={jakartaUrl} as="font" type="font/woff2" crossorigin />
```

Only preload **one** woff2 (the hero font weight). Per Fontsource docs and Astro best practice: over-preloading regresses Core Web Vitals.

For Inter (body), do **not** preload — body text renders below-the-fold and the swap fallback is acceptable.

### Cleanup of v1 Google Fonts CDN

CRITICAL: When removing dark-mode FOUC script from BaseLayoutV2 (per D-05/D-15 of CONTEXT), **also drop the Google Fonts `<link rel="preconnect">` and stylesheet links** from BaseLayoutV2 — fonts are self-hosted in v2. Leaving the preconnects in would waste a connection on every v2 page.

---

## 8. BaseLayoutV2 Structure

**Confidence: HIGH.**

### Keep from v1
- `<!doctype html>`, `<html lang="en">`, `<head>`, `<body>` skeleton
- `<meta charset>`, `<meta viewport>`, `<meta generator>`
- `<link rel="icon">` for favicon
- `<SEO>` component (CONTEXT confirms it carries forward)
- `<slot name="head">` with **identical signature** to v1 (CONTEXT integration-points note: required for downstream phases passing JSON-LD, preload tags)
- `<main>` wrapper around the default `<slot />`

### Drop from v1
- ❌ Dark-mode `is:inline` `<script>` (lines 50–58 of v1 BaseLayout.astro) — entire `localStorage.theme` / `prefers-color-scheme` block
- ❌ Google Fonts CDN preconnect + preload + stylesheet links (lines 30–48 of v1 BaseLayout.astro) — v2 self-hosts via Fontsource
- ❌ Tailwind `dark:` utility classes from `<body>` element (`dark:bg-bg-dark`, `dark:text-text-dark`)
- ❌ Reference to v1 `<Header>` and `<Footer>` (replace with `v2/layout/Header` and `v2/layout/Footer`)

### Add to v2
- ✅ `import '../../styles/v2/global.css';` in frontmatter
- ✅ `import jakartaUrl from '@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2?url';` (preload single critical font weight)
- ✅ `<link rel="preload" href={jakartaUrl} as="font" type="font/woff2" crossorigin />` in `<head>` BEFORE the `<slot name="head" />` so SEO slot consumers can override if needed
- ✅ `<body>` class uses v2 utilities only (`bg-surface text-text font-text`) — no `dark:` variants

### File outline (`src/layouts/v2/BaseLayout.astro`)

```astro
---
import '../../styles/v2/global.css';
import jakartaUrl from '@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2?url';
import Header from '../../components/v2/layout/Header.astro';
import Footer from '../../components/v2/layout/Footer.astro';
import SEO from '../../components/SEO.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Web apps, automation, and AI development for small businesses' } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <link rel="preload" href={jakartaUrl} as="font" type="font/woff2" crossorigin />
    <SEO title={title} description={description} />
    <slot name="head" />
  </head>
  <body class="font-text bg-surface text-text min-h-screen flex flex-col">
    <Header />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

Note the **deliberate absence** of any `<script>` tag — no dark-mode logic, no FOUC prevention needed (light-mode-only is the design intent per FOUND-05).

---

## 9. Mobile Full-Screen Overlay Pattern

**Confidence: HIGH.**

### Recommendation: option (a) — vanilla JS in a regular `<script>` tag inside `MobileNav.astro`

Astro processes `<script>` tags by default (TypeScript, bundling, scoped to the component). For interactivity that doesn't depend on DOM-state inheritance during the initial paint, this is correct. Reserve `is:inline` for true FOUC-prevention scripts that must run before any HTML parses (which v2 deliberately doesn't have).

**Why not Astro Islands (React/Vue):** Adds a framework runtime to satisfy ~30 lines of vanilla JS — violates the "zero-framework static site" principle in REQUIREMENTS Out of Scope (`@astrojs/react` explicitly excluded).

**Why not `is:inline`:** No FOUC concern (overlay starts hidden via CSS); Astro's default `<script>` bundling gives us TypeScript checking and minification for free.

### Focus-trap pseudocode (no npm dependency needed — ~25 lines)

```js
// Inside <script> in MobileNav.astro
const button = document.getElementById('mobile-menu-toggle');
const overlay = document.getElementById('mobile-menu-overlay');
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

let lastFocused = null;

function open() {
  lastFocused = document.activeElement;
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  button.setAttribute('aria-expanded', 'true');
  const focusables = overlay.querySelectorAll(FOCUSABLE);
  focusables[0]?.focus();
}

function close() {
  overlay.hidden = true;
  document.body.style.overflow = '';
  button.setAttribute('aria-expanded', 'false');
  lastFocused?.focus();
}

button.addEventListener('click', () => overlay.hidden ? open() : close());
overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); }); // backdrop tap

document.addEventListener('keydown', (e) => {
  if (overlay.hidden) return;
  if (e.key === 'Escape') return close();
  if (e.key !== 'Tab') return;

  const focusables = Array.from(overlay.querySelectorAll(FOCUSABLE));
  const first = focusables[0], last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
  else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
});
```

### Markup contract that script depends on

```html
<button id="mobile-menu-toggle" aria-expanded="false" aria-controls="mobile-menu-overlay">
  <!-- hamburger icon from @lucide/astro -->
</button>

<div id="mobile-menu-overlay" hidden class="fixed inset-0 z-50 bg-surface flex flex-col items-center justify-center">
  <!-- nav links here, all keyboard-focusable -->
</div>
```

`hidden` attribute (not `class="hidden"`) is the correct semantic for "not in the a11y tree" — screen readers correctly skip it; CSS can still style for transitions via `[hidden] { display: none; }` overridden during animation if motion is added later.

**WCAG verification at COMP-07 / Phase 24:** axe-core gate confirms `aria-expanded`, focus-trap behavior, ESC handling. Plan 23 is responsible only for the structure being correct; the WCAG sign-off is Phase 24's COMP-07 work.

---

## 10. Active Link Detection Pattern

**Confidence: HIGH.**

### Pattern

In `Header.astro` (and `MobileNav.astro`):

```astro
---
const path = Astro.url.pathname.replace(/\/$/, ''); // strip trailing slash for safety
const links = [
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/faq', label: 'FAQ' },
  { href: '/#contact', label: 'Contact' },
];

function isActive(href: string, current: string): boolean {
  if (href.startsWith('/#')) return false; // anchor-only links never "active"
  if (href === '/') return current === '';
  // section match: /blog matches /blog, /blog/foo, /blog/tags/x
  return current === href || current.startsWith(href + '/');
}
---

{links.map(link => {
  const active = isActive(link.href, path);
  return (
    <a
      href={link.href}
      aria-current={active ? 'page' : undefined}
      class:list={['nav-link', { 'nav-link--active': active }]}
    >
      {link.label}
    </a>
  );
})}
```

### Edge case rules

| Path | Active link |
|---|---|
| `/blog` | Blog ✅ |
| `/blog/post-slug` | Blog ✅ (startsWith match) |
| `/blog/tags/ai` | Blog ✅ |
| `/projects/case-study` | Projects ✅ |
| `/` | none of the nav links — homepage isn't in nav |
| `/#contact` (homepage with anchor) | Contact: ❌ active state unreliable for anchor-only links; deliberately excluded above |

### Trailing-slash handling

Astro's default `trailingSlash: 'ignore'` config can produce both `/blog` and `/blog/` in production depending on `site` and `build.format`. The `.replace(/\/$/, '')` normalization handles both. Verify in plan 23-04 by manually visiting both URL forms and confirming the active highlight appears.

### Visual styling for active state (CONTEXT D-12: pick during planning)

Recommend an **accent-color underline** approach (CSS-only, no extra DOM): `[aria-current="page"] { color: var(--color-accent); text-decoration: underline; text-underline-offset: 6px; }`. Mobile overlay uses the same selector for consistency.

---

## 11. FOUND-06 Coexistence Verification

**Confidence: HIGH (CONTEXT explicitly defers approach choice to implementer; recommend the lightest credible option).**

### Recommended verification: 2-step gate

1. **Build success:** `npm run build` exits 0. Astro/Vite would fail on duplicate `@theme` declarations or CSS import errors before runtime.

2. **Visual smoke check via dev server:** Start `npm run dev`, then visit each existing v1.3 page in a browser tab and visually confirm no regression:
   - `/` (homepage)
   - `/blog`
   - `/blog/[any-existing-slug]`
   - `/projects`
   - `/projects/[any-existing-slug]`
   - `/faq`
   - `/thank-you`
   - `/design-system`

   For each page, confirm: header looks identical, footer looks identical, headings render in Bricolage Grotesque (v1 font), accent colors (yellow/turquoise/magenta) appear correctly. **No screenshot diff needed** — the test is binary: does it look like v1.3 looked yesterday?

### What NOT to do (over-engineered)

- ❌ Lighthouse CI on every v1.3 page — adds 5+ minutes per phase work, no signal beyond visual smoke
- ❌ Playwright visual regression with screenshots — requires baseline capture infrastructure; over-engineered for "did we accidentally break v1?"
- ❌ Manual axe-core run — pages didn't change; their accessibility didn't change

### Why this is sufficient

The token-collision rule (D-08) is enforced **before** verification by the §5 enumeration check. With zero name overlap, the only way v2 CSS could break v1 is by being loaded into a v1 page — which the dual-entry-point strategy in §6 makes impossible. Verification is therefore confirming the obvious, not searching for surprises.

### Optional automated supplement (if user wants belt + suspenders)

Add a Node script `scripts/check-token-collision.mjs` that parses both `global.css` and `v2/global.css`, extracts every `--*:` declaration name, computes their intersection, and exits 1 if non-empty. Run as a pre-build hook. **Recommend deferring this to Phase 30 cleanup** unless implementer wants paranoia early.

---

## 12. design/design-system.pen Creation Sequence

**Confidence: MEDIUM (sequence is correct; specific tool-call payloads depend on Pencil MCP semantics not directly observable in this session).**

Per CONTEXT D-15, the Phase 23 .pen file contains:
1. Variable definitions for the full token set
2. Factored Header and Footer components (only — primitives come in Phase 24)
3. Inline "Token Reference" frame with the Pencil-variable → CSS-custom-property table

### Recommended Pencil MCP call sequence

The orchestrator/implementer (with Pencil MCP available in the planning agent's tool roster) should invoke roughly the following sequence. Exact payloads inferred from the pencil server instructions in CLAUDE.md context.

1. **Open new document**
   ```
   mcp__pencil__open_document with filePathOrNew: "new"
   ```
   Then save as `design/design-system.pen` (using `batch_design` save semantics).

2. **Get guidelines for design-system style**
   ```
   mcp__pencil__get_guidelines with topic: "design-system"
   ```
   This returns conventions for organizing token frames and component frames in Pencil.

3. **Create document variables for all v2 tokens**
   ```
   mcp__pencil__batch_design with operations: [
     { create variable, name: "color/primary", value: "#141f39" },
     { create variable, name: "color/primary-hover", value: "#1f2c4d" },
     { create variable, name: "color/surface", value: "#ffffff" },
     { create variable, name: "color/surface-muted", value: "#fafafa" },
     { create variable, name: "color/text", value: "#141f39" },
     { create variable, name: "color/text-muted", value: "#52525b" },
     { create variable, name: "color/border", value: "#e4e4e7" },
     { create variable, name: "color/accent", value: "#38da71" },
     { create variable, name: "space/xs", value: 4 },
     { create variable, name: "space/sm", value: 8 },
     { create variable, name: "space/md", value: 16 },
     { create variable, name: "space/lg", value: 24 },
     { create variable, name: "space/xl", value: 40 },
     { create variable, name: "space/2xl", value: 80 },
     { create variable, name: "radius/sm", value: 4 },
     { create variable, name: "radius/md", value: 10 },
     { create variable, name: "radius/lg", value: 16 },
     { create variable, name: "radius/full", value: 9999 },
     { create variable, name: "font/display", value: "Plus Jakarta Sans Variable" },
     { create variable, name: "font/text", value: "Inter Variable" },
     { create variable, name: "text/display", value: 70 },
     { create variable, name: "text/h1", value: 48 },
     { create variable, name: "text/h2", value: 36 },
     { create variable, name: "text/h3", value: 24 },
     { create variable, name: "text/h4", value: 20 },
     { create variable, name: "text/body", value: 16 },
     { create variable, name: "text/small", value: 14 },
     { create variable, name: "text/caption", value: 12 }
   ]
   ```

4. **Create "Token Reference" frame** with a 2-column table mapping each Pencil variable name (e.g. `color/primary`) → CSS custom property name (e.g. `--color-primary`). Single text frame per row, or use a Pencil table primitive if available via the design-system guidelines.

5. **Factor Header component frame**
   - Inspect Crito header `ULZiU` via `batch_get` (children `9cyrs`, `wM9Ac`, `7BoiG`)
   - Re-create as a Pencil component: logo (left), 4-link nav (center), CTA button (right)
   - Apply v2 variables for colors, spacing, font
   - Adapt Crito's 6-link nav down to our 4 links
   - Replace Crito's CTA copy with "Let's Talk"

6. **Factor Footer component frame**
   - Inspect Crito footer `Y1ldm` via `batch_get` (children `gAmiq`, `iHrsm`, `8Kx6s`)
   - Re-create as a Pencil component: 2-column layout (brand+social left, links right) per D-13
   - Drop the Crito newsletter bar per D-14
   - Drop the 3rd column; consolidate Crito's 3 link subgroups into one

7. **Save and close**

### What NOT to add to the .pen file in Phase 23

Per CONTEXT D-16: NO Button/Card/Input/Badge primitive frames yet — those land in Phase 24.

### Plan 23-01 should also include

After step 1, BEFORE creating the v2 variables, the implementer must inspect the **Crito** .pen file to verify all the literal values listed above (fonts, colors, sizes). Update the variable creation payloads in step 3 with any corrected values from the .pen ground truth.

---

## Validation Architecture

This section triggers `VALIDATION.md` scaffolding for the planner.

### Boundaries

- **B1: v1 page render** — any existing v1.3 page (e.g. `/`, `/blog/[slug]`, `/projects`, `/design-system`) renders byte-for-byte the same as it did before Phase 23. Only `BaseLayout.astro` and `global.css` (v1) on its render path.
- **B2: v2 layout render** — A throwaway test page (or the future `/design-system` page in Phase 24) on `BaseLayoutV2` renders with v2 tokens and self-hosted fonts. Header, Footer, and MobileNav render without console errors.
- **B3: Token namespace isolation** — string-set intersection of v1 token names and v2 token names is empty.
- **B4: Mobile overlay open/close lifecycle** — clicking hamburger opens overlay; ESC closes; clicking backdrop closes; body scroll locks while open; focus moves to first focusable on open and back to hamburger on close.
- **B5: Mobile overlay focus trap** — Tab from last focusable inside overlay wraps to first; Shift+Tab from first wraps to last.
- **B6: Active link semantics** — visiting `/blog` causes the Blog nav link to carry `aria-current="page"`; visiting `/blog/some-post` does the same; visiting `/faq` does NOT mark Blog as current.
- **B7: Light-mode-only enforcement** — no `#theme-toggle` element anywhere in `src/components/v2/`; no `localStorage.theme` reference anywhere in `src/{components,layouts}/v2/`; no `.dark` class selector anywhere in `src/styles/v2/global.css`.
- **B8: design/design-system.pen exists** — file is present at the documented path and contains both Header and Footer factored components plus the variable set.
- **B9: Build success** — `npm run build` exits 0 with both v1 and v2 stylesheets present.

### Observable Behaviors

- No FOUC on v2 pages (since there's no theme JS to cause one)
- No `.dark` class is ever applied to `<html>` on v2 pages
- v2 page font-display is `"Plus Jakarta Sans Variable"` (or the corrected family from 23-01) — visible via DevTools computed styles
- v1 pages still render in Bricolage Grotesque (unchanged)
- Mobile overlay is `hidden` (not in a11y tree) on initial load
- Sticky header stays at `top: 0` on scroll
- Footer social links present 44x44px touch targets (computed bounding box)

### Test Commands per Success Criterion

| SC (from ROADMAP Phase 23) | Verification command |
|---|---|
| **SC-1**: light-mode only on BaseLayoutV2 | `! grep -r "#theme-toggle\|localStorage.theme\|prefers-color-scheme" src/components/v2/ src/layouts/v2/ src/styles/v2/` (must exit 1 = nothing found) |
| **SC-1 (DOM-level)**: no `#theme-toggle` in v2 page DOM | Manual: open any v2 page, run `document.querySelectorAll('#theme-toggle').length === 0` in console |
| **SC-2**: token namespace isolation | Node script: read both CSS files, extract `--*` names via regex, compute intersection, assert empty. Or `comm -12 <(grep -oE '\-\-[a-z][a-z0-9-]*' src/styles/global.css \| sort -u) <(grep -oE '\-\-[a-z][a-z0-9-]*' src/styles/v2/global.css \| sort -u)` must produce no output. |
| **SC-2**: both files coexist with no v1 visual regression | `npm run build` exits 0 + manual visit of v1 page set per §11 |
| **SC-3**: design-system.pen exists with token-mapping table | `test -f design/design-system.pen` + Pencil MCP `batch_get` on the file confirms a "Token Reference" frame and Header + Footer component frames |
| **SC-3**: font packages match Crito-extracted names | `grep -E '"@fontsource-variable/' package.json` lists the families confirmed in plan 23-01's Pencil inspection |
| **SC-4**: HeaderV2 sticky + 4 links + CTA + no theme toggle | Build + manual: 4 anchor tags with hrefs `/blog`, `/projects`, `/faq`, `/#contact`; one button/anchor with text "Let's Talk" → `/#contact`; sticky behavior on scroll; `! grep "theme-toggle" src/components/v2/layout/Header.astro` |
| **SC-4**: FooterV2 2-column + 44x44 social icons | Manual: DevTools confirms 2-column grid at md+ breakpoints; each social icon's bounding box ≥ 44×44px |
| **SC-5**: v1.3 pages render unchanged | Per §11 — `npm run build` succeeds + visual smoke check on the 8 listed routes |
| **B5 (focus trap, supports SC-4)**: keyboard cycle in overlay | Manual: open mobile overlay, press Tab repeatedly → focus cycles within overlay only; Shift+Tab from first → wraps to last; ESC closes |
| **B6 (active link)**: aria-current correctness | Manual: visit `/blog`, inspect Blog link → `aria-current="page"`; visit `/blog/somepost`, same; visit `/faq` → Blog link has no aria-current |

---

## Sources

### HIGH confidence
- npm registry API (`registry.npmjs.org/@fontsource-variable/*/latest`) — verified 5.2.8 for plus-jakarta-sans, inter, dm-sans, chivo
- Tailwind CSS v4 official docs — [Theme variables / cascade-layer behavior](https://tailwindcss.com/docs/theme)
- v1 source files inspected directly (`src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/layout/{Header,Footer,MobileNav}.astro`, `package.json`)
- CONTEXT.md decisions D-01 through D-19 (locked by user)
- ROADMAP Phase 23 success criteria

### MEDIUM confidence
- [Astro routing docs (active link patterns)](https://docs.astro.build/en/guides/routing/) and [Astro `Astro.url` reference](https://www.cyishere.dev/blog/astro-active-nav-item)
- [Fontsource Preloading guide](https://fontsource.org/docs/getting-started/preload) — preload pattern for woff2
- Focus-trap pattern — vanilla JS, established a11y pattern (multiple sources agree on the Tab/Shift+Tab cycle implementation)
- Tailwind v4 multi-theme strategy — [simonswiss.com](https://simonswiss.com/posts/tailwind-v4-multi-theme), [GitHub discussion #15600](https://github.com/tailwindlabs/tailwindcss/discussions/15600)

### LOW confidence — REQUIRES verification in plan 23-01
- **Crito font families** — best inferred as Plus Jakarta Sans + Inter; Pencil MCP `batch_get` on nodes `wM9Ac` (nav text) and `35XXR` (section headline) is the authoritative source
- **Crito color values for `--color-text-muted`, `--color-border`, `--color-primary-hover`** — agency-template convention; navy `#141f39`, off-white `#fafafa`, green `#38da71`, coral `#ff928a` are explicitly cited in CONTEXT D-18 and considered HIGH within the LOW-overall section
- **Crito spacing rhythm beyond the cited button padding [16,20]** — derived from 8pt-grid agency convention
- **Crito typography sizes (display 70, h1 48, body 16)** — agency-template convention; Pencil `batch_get` on hero/section headlines is authoritative
- ThemeForest [Crito product page](https://themeforest.net/item/crito-consulting-agency-website-figma-template/42007456) and [Figma Community page](https://www.figma.com/community/file/1267782953785365129/consulting-agency-website-template-i-crito) — neither publishes the literal token values

---

## Open Questions

These cannot be resolved without Pencil MCP access (which this research session lacks) and MUST be resolved at the start of plan 23-01:

1. **Q: What heading and body font does Crito actually use?**
   - What we know: It's a modern agency template using Google Fonts (per ThemeForest); my inference is Plus Jakarta Sans + Inter.
   - What's unclear: The actual `font.family` strings inside the .pen file.
   - Recommendation: Plan 23-01 first task is `mcp__pencil__batch_get` on `wM9Ac` and `35XXR`; if families differ, swap the `@fontsource-variable/*` package selection accordingly.

2. **Q: What is `--color-primary-hover` on Crito buttons?**
   - What we know: Primary navy is `#141f39` (per CONTEXT D-18).
   - What's unclear: Whether Crito documents a hover state at all, or whether the button uses opacity/scale on hover.
   - Recommendation: If no documented hover, use computed `oklch(0.296 0.054 262.5)` (+6% L) as proposed.

3. **Q: Does Crito use coral `#ff928a` anywhere structural?**
   - What we know: It's mentioned in CONTEXT as a candidate accent color.
   - What's unclear: Whether it's a primary surface color, an accent on a single section, or a decorative element.
   - Recommendation: Reserve for `--color-accent-2` later; confirm during 23-01 inspection of `35XXR` and adjacent section frames.

4. **Q: What is the exact section padding rhythm in Crito?**
   - What we know: CTA button padding is [16,20] per CONTEXT D-18.
   - What's unclear: The vertical section gap between major frames (likely 80px or 120px based on agency convention).
   - Recommendation: 23-01 inspection should sample Y-coordinate deltas between section frames inside `ujMLJ`; adjust `--space-2xl` from `5rem` to `7.5rem` if Crito uses 120px.

---

## Metadata

**Confidence breakdown:**
- Standard stack (Tailwind v4, Fontsource, Astro 5 layout): **HIGH** — official docs cross-referenced
- Architecture (dual entry points, namespace coexistence): **HIGH** — verified against Tailwind v4 docs
- Mobile overlay pattern: **HIGH** — established a11y pattern, multiple sources
- Active link pattern: **HIGH** — Astro docs + community confirm
- Pitfalls (font over-preload, dark-mode contamination, token collision on `--font-heading`/`--font-body`): **HIGH** — collision detected directly via v1 file read
- Crito-specific values (fonts, colors, sizes): **LOW** — see Open Questions; plan 23-01 has the verification protocol

**Research date:** 2026-05-14
**Valid until:** 2026-06-14 (30 days; Tailwind v4, Astro 5, Fontsource v5 are stable; if Crito .pen turns out to use unfamiliar fonts, only the §1/§4 npm-package recommendations need refresh)

## RESEARCH COMPLETE

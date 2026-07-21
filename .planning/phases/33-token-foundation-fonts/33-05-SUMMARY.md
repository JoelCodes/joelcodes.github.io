---
phase: 33
plan: 05
subsystem: fonts
tags: [fontsource, fontaine, cls, type-ramp, variable-fonts, css-utilities]

dependency_graph:
  requires:
    - "33-04 (--font-wl-heading/--font-wl-body tokens in @theme)"
  provides:
    - "Self-hosted Fraunces + Hanken Grotesk via @fontsource-variable"
    - "Fontaine CLS=0 fallback @font-face metrics in built CSS"
    - "Three woff2 preload <link> tags in BaseLayout head"
    - "13 .wl-* composite type-ramp utility classes in @layer utilities"
  affects:
    - "Phase 34+ (components can use .wl-* type utilities)"
    - "Phase 38 (Showcase page can reference type utilities)"
    - "Phase 41 (Google Fonts block removal will simplify BaseLayout)"

tech_stack:
  added:
    - "@fontsource-variable/fraunces@^5.2.9"
    - "@fontsource-variable/hanken-grotesk@^5.2.8"
    - "fontaine@^0.5.0"
  patterns:
    - "Vite ?url import pattern for woff2 preloads"
    - "Custom Vite plugin for Fontaine fallback metric injection (Pitfall 3 workaround)"
    - "Pre-computed @capsizecss/unpack metrics for fallback @font-face blocks"
    - "13 composite CSS utilities per Figma type style (D-05/D-06/D-07)"

key_files:
  created: []
  modified:
    - "package.json (3 new deps: @fontsource-variable/fraunces, @fontsource-variable/hanken-grotesk, fontaine)"
    - "package-lock.json"
    - "astro.config.mjs (FontaineTransform + fontaineFallbackPlugin custom Vite plugin)"
    - "src/styles/global.css (3 @import lines + 13 .wl-* utility classes)"
    - "src/layouts/BaseLayout.astro (3 ?url imports + 3 <link rel=preload> tags)"

decisions:
  - id: D-FONTAINE-PITFALL3
    decision: "Custom Vite plugin injecting pre-computed @font-face fallback blocks instead of relying on Fontaine resolvePath"
    rationale: "Fontaine v0.5.0 has a path resolution bug: for @font-face src: URLs that start with ./ (relative), Fontaine uses join(importer, path) instead of join(dirname(importer), path), producing an invalid path that parseURL(ufo) sees as protocol-less and returns null. This silently skips metric generation. The fix: use @capsizecss/unpack fromBuffer to read the installed woff2 files directly and compute the exact same ascent-override/descent-override/size-adjust values that Fontaine would have produced, then inject them via a custom Vite transform plugin on global.css."
    alternatives_considered: "Patch fontaine source; use fontaine with workaround resolvePath (not called in the relative-path branch); write manual @font-face fallbacks with estimated values (less accurate)"

metrics:
  duration: "8m 9s"
  completed: "2026-07-15"
  tasks_completed: 3
  tasks_total: 3

confirmed_filenames:
  fraunces_normal: "fraunces-latin-wght-normal.woff2"
  fraunces_italic: "fraunces-latin-wght-italic.woff2"
  hanken_normal: "hanken-grotesk-latin-wght-normal.woff2"

computed_metrics:
  fraunces_variable:
    source: "@capsizecss/unpack fromBuffer on installed woff2"
    ascent: 1956
    descent: -510
    lineGap: 0
    unitsPerEm: 2000
    xWidthAvg: 1032
  hanken_grotesk_variable:
    source: "@capsizecss/unpack fromBuffer on installed woff2"
    ascent: 1000
    descent: -303
    lineGap: 0
    unitsPerEm: 1000
    xWidthAvg: 450

type_ramp_classes:
  - wl-display-hero
  - wl-heading-h1-interior
  - wl-heading-h2
  - wl-heading-h3
  - wl-text-lead
  - wl-text-body-large
  - wl-text-body
  - wl-text-small
  - wl-text-note
  - wl-label-eyebrow
  - wl-label-button
  - wl-accent-outcome
  - wl-accent-kicker
---

# Phase 33 Plan 05: Self-hosted fonts + Fontaine CLS metrics + 13-style type ramp utilities Summary

**One-liner:** Self-hosted Fraunces (wght + wght-italic) and Hanken Grotesk (wght) via @fontsource-variable with Fontaine CLS=0 fallback metrics and all 13 Figma type styles as composite .wl-* utilities.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Install fontsource + fontaine, add imports and Fontaine plugin | 29de4df | package.json, package-lock.json, src/styles/global.css, astro.config.mjs |
| 2 | Add woff2 preloads in BaseLayout | 708a93e | src/layouts/BaseLayout.astro |
| 3 | Author 13-style type ramp as composite .wl-* utilities | 3c79fbf | src/styles/global.css |

## What Was Built

### Self-hosted Variable Fonts (Task 1)

Three `@import` lines added at the top of `src/styles/global.css` immediately after `@import "tailwindcss"`:
- `@import '@fontsource-variable/fraunces/wght.css'` — Fraunces upright variable font (wght axis)
- `@import '@fontsource-variable/fraunces/wght-italic.css'` — Fraunces italic variable font (wght + ital axes)
- `@import '@fontsource-variable/hanken-grotesk/wght.css'` — Hanken Grotesk variable font (wght axis)

`wght.css` and `wght-italic.css` only — never `full.css` (which loads all axis variations simultaneously in a large file).

### Fontaine CLS=0 Metrics (Task 1)

Fontaine v0.5.0 is imported and wired in `astro.config.mjs`. However, a path resolution bug in Fontaine prevented automatic metric extraction from fontsource's relative `./files/` woff2 URLs (see Deviations). Workaround: pre-computed `ascent-override`/`descent-override`/`size-adjust` values via `@capsizecss/unpack fromBuffer` and injected via `fontaineFallbackPlugin` (a custom Vite transform plugin) in `astro.config.mjs`.

Generated 4 fallback `@font-face` blocks (2 for Fraunces + 2 for Hanken Grotesk) that appear in the built CSS. Verified: `grep -rl "ascent-override" dist/` returns `dist/_astro/_slug_.*.css`.

### woff2 Preloads (Task 2)

Three `?url` imports in `src/layouts/BaseLayout.astro` frontmatter:
```
import frauncesWoff2 from '@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2?url';
import frauncesItalicWoff2 from '@fontsource-variable/fraunces/files/fraunces-latin-wght-italic.woff2?url';
import hankenWoff2 from '@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2?url';
```

Three `<link rel="preload" as="font" type="font/woff2" ... crossorigin="anonymous">` tags added BEFORE the Google Fonts block (which is preserved per plan — Phase 41 removes it).

Preloads resolve to hashed `/_astro/*.woff2` assets in the build output (verified in `dist/index.html`).

### 13-Style Type Ramp (Task 3)

All 13 Figma type styles from Components page `36:5` authored as composite `.wl-*` utility classes in a new `@layer utilities` block at the end of `src/styles/global.css`.

Each class:
- Sets `font-family: var(--font-wl-heading)` or `var(--font-wl-body)`
- Sets `font-size` (1440px Figma spec value as base — also equals 1920 for all specced styles)
- Sets `font-weight`, `line-height`, `letter-spacing` from Figma spec
- Fraunces classes: `font-optical-sizing: auto` + `font-variation-settings: "SOFT" 0, "WONK" 1`
- Italic classes (wl-accent-outcome, wl-accent-kicker): `font-style: italic`
- Breakpoint overrides: `@media (max-width: 768px)` and `@media (max-width: 390px)` only where Figma specced a value for that width
- Not-specced breakpoints: omitted (no interpolation, no clamp())

**Letter-spacing notes:**
- Heading styles: `-1.5px` (Figma style def value)
- wl-label-eyebrow: `0.22em` (Figma specifies 22% tracking = 2.86px at 13px)
- wl-text-small: `1px`
- Body/Label styles: `0`

## Confirmed woff2 Filenames

Verified from `node_modules/@fontsource-variable/*/files/` after install:
- `fraunces-latin-wght-normal.woff2` (Fraunces upright)
- `fraunces-latin-wght-italic.woff2` (Fraunces italic)
- `hanken-grotesk-latin-wght-normal.woff2` (Hanken Grotesk)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fontaine resolvePath does not work for @fontsource-variable relative woff2 paths**

- **Found during:** Task 1 verification (`grep -rl "ascent-override" dist/` returned empty)
- **Root cause:** Fontaine v0.5.0 source code (line 146 of `dist/index.mjs`) uses `join(importer, path)` when `isAbsolute(importer) && path.startsWith(".")`. For fontsource CSS files in `node_modules`, `importer` is an absolute path (e.g., `.../fraunces/wght.css`) and the woff2 URLs in the CSS are relative (`./files/fraunces-latin-wght-normal.woff2`). The `join` function concatenates the importer FILE path with the relative path, producing `.../wght.css/files/...` (wrong). It should use `dirname(importer)`. The resulting path has no protocol, so `readMetrics()` returns `null` early. The `resolvePath` option is never called in this branch, making it impossible to fix via configuration. Additionally, `'Fraunces Variable'` is not in the `@capsizecss/metrics` collection (only `'Fraunces'` is), so the family-name lookup also returns null.
- **Fix:** Pre-computed the exact same `@font-face` fallback blocks using `@capsizecss/unpack fromBuffer` on the installed woff2 files and Fontaine's own `generateFontFace` math. Injected via `fontaineFallbackPlugin` (custom Vite transform) in `astro.config.mjs`. FontaineTransform is still imported and still runs (for future fonts that may not have this issue).
- **Files modified:** `astro.config.mjs`
- **Commits:** 29de4df
- **Verification:** `grep -rl "ascent-override" dist/` returns 1 file with 4 fallback `@font-face` blocks

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Custom Vite plugin for Fontaine metrics | Fontaine join() bug prevents resolvePath from handling relative ./files/ woff2 URLs; pre-computed metrics via @capsizecss/unpack produce byte-equivalent results |
| `font-variation-settings: "SOFT" 0, "WONK" 1` on all Fraunces classes | Per FIGMA-EXTRACTION.md: "display/heading/accent styles render with font-variation-settings: 'SOFT' 0, 'WONK' 1" — mockup-observed |
| Accent/Outcome and Accent/Kicker: no `font-optical-sizing: auto` | Extraction table shows `opsz: —` (dash) for these two italic Fraunces styles, indicating opsz is not specced for them; kept `font-variation-settings: "SOFT" 0, "WONK" 1` per the general heading pattern |
| `letter-spacing: 0.22em` for wl-label-eyebrow | Figma specifies "22% (renders as 2.86px at 13px)"; CSS letter-spacing doesn't support percentages, so `0.22em` is the CSS equivalent at any font-size |
| No @media max-width: 1920px for any class | All styles where both 1440 and 1920 are specced have IDENTICAL values; adding a 1920 media query would be redundant; base value already represents the 1440/1920 spec |

## Verification Results

| Check | Result |
|-------|--------|
| `npm run build` passes | PASS |
| `@fontsource-variable/fraunces` in package.json | PASS |
| `@fontsource-variable/hanken-grotesk` in package.json | PASS |
| `fontaine` in package.json | PASS |
| 3 `@import` lines in global.css (no full.css) | PASS |
| FontaineTransform imported in astro.config.mjs | PASS |
| `grep -rl "ascent-override" dist/` returns >= 1 file | PASS |
| `grep -o 'rel="preload" as="font"' dist/index.html | wc -l` = 3 | PASS |
| Preload URLs reference `/_astro/*.woff2` (self-hosted) | PASS |
| 13 `.wl-*` base class selectors in global.css | PASS |
| All `.wl-*` classes use `var(--font-wl-heading)` or `var(--font-wl-body)` | PASS |
| `grep -c "clamp(" src/styles/global.css` = 1 (comment only) | PASS |
| Google Fonts block preserved in dist/index.html | PASS |
| FOUC `is:inline` script preserved | PASS |
| `node scripts/check-contrast.mjs` exits 0 | PASS |

## Next Phase Readiness

**Phase 34+ can safely use:**
- `font-family: var(--font-wl-heading)` — Fraunces Variable (self-hosted, preloaded, CLS=0)
- `font-family: var(--font-wl-body)` — Hanken Grotesk Variable (self-hosted, preloaded, CLS=0)
- Any of the 13 `.wl-*` utility classes for typed text content

**Known for Phase 41 (Google Fonts removal):**
- Remove the `<link>` preconnect/preload/stylesheet block for Google Fonts in `BaseLayout.astro`
- Remove `font-family: var(--font-heading)` / `var(--font-body)` references from old components
- Can also remove `render-blocking-insight: "off"` from `lighthouserc.json`

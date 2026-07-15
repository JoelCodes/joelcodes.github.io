---
phase: 33-token-foundation-fonts
plan: "06"
subsystem: ui
tags: [brand-assets, svg, favicon, og-image, figma, wavemark, seo]

dependency_graph:
  requires:
    - phase: "33-01"
      provides: "Figma extraction artifact — waveform SVG geometry (node 4:80), --wl-ink hexes, OG frame check (node 5:41), verbatim tagline"
    - phase: "33-04"
      provides: "--wl-ink light/dark hex values confirmed in global.css tokens"
  provides:
    - "WaveMark.astro — theme-adaptive inline SVG waveform mark component"
    - "public/favicon.svg — waveform favicon with prefers-color-scheme dark support"
    - "public/favicon.ico — regenerated multi-size (16/32/48) ICO from the new mark"
    - "public/og-image.png — Joel-approved 1200x630 Figma-exported OG image"
    - "SEO.astro ogImage wired to /og-image.png (og-image.svg deleted)"
  affects:
    - "phase-34 (header/footer — WaveMark consumed in site chrome)"
    - "phase-41 (cleanup — no og-image.svg remnants to remove)"

tech-stack:
  added:
    - "sharp@^0.33.0 (devDependency — favicon.ico rasterization only, not shipped)"
  patterns:
    - "Inline SVG component with stroke=currentColor for token-driven theme flip (no .dark CSS needed)"
    - "Favicon prefers-color-scheme <style> block with hardcoded --wl-ink light/dark hexes"

key-files:
  created:
    - src/components/WaveMark.astro
    - public/og-image.png
  modified:
    - public/favicon.svg
    - public/favicon.ico
    - src/components/SEO.astro
    - package.json
    - package-lock.json
  deleted:
    - public/og-image.svg

key-decisions:
  - "OG image sourced by direct Figma frame export (node 5:41) instead of the plan's satori+sharp compose script — strictly more faithful, D-15 'every ingredient Figma-sourced' satisfied by construction"
  - "generate-og.mjs NOT written; @vercel/satori NOT installed (compose contingency obsolete once the Figma OG frame was found)"
  - "public/og-image.svg deleted after wire-in (zero references remained in src/, public/, or built HTML)"

metrics:
  duration: "~15m active (checkpoint pause between Task 2 and Task 3)"
  completed: "2026-07-14"
---

# Phase 33 Plan 06: Brand Assets (WaveMark, Favicon, OG Image) Summary

**Figma-sourced waveform mark as inline-SVG WaveMark.astro + theme-adaptive favicon (SVG/ICO) + Joel-approved 1200x630 Figma-exported OG PNG wired into SEO meta**

## Performance

- **Duration:** ~15 min active work (paused at OG approval checkpoint)
- **Completed:** 2026-07-14
- **Tasks:** 3 (2 auto + 1 human-verify checkpoint)
- **Files:** 2 created, 5 modified, 1 deleted

## Accomplishments

- `src/components/WaveMark.astro`: inline SVG (never `<img>`), viewBox `0 0 104 104`, three waveform paths with `stroke="currentColor"` and per-stroke opacities 0.45/1.0/0.65, widths 5/6/5, `stroke-linecap="round"`, `aria-hidden="true"`. Geometry copied verbatim from 33-FIGMA-EXTRACTION.md (Figma node 4:80 via MCP `download_assets` — **no manual Copy-as-SVG was needed**, D-16 MCP path). Frame background rect excluded per the extraction note. Component follows the Button/TokenSwatch analog: un-exported `interface Props { class?: string; size?: number }`, `class: className = ''`, default size 32.
- `public/favicon.svg`: replaced in place with the waveform mark; `<style>` block strokes `#12333B` (--wl-ink light) by default and `#EAF6F3` (--wl-ink dark) under `@media (prefers-color-scheme: dark)`; includes `color-scheme: light dark`. BaseLayout `<link>` tags untouched.
- `public/favicon.ico`: regenerated from the new SVG via sharp at 16/32/48 px (PNG-in-ICO, hand-assembled ICONDIR — 2256 bytes).
- `public/og-image.png`: 1200x630 PNG exported directly from Figma frame node 5:41 ("06 · OG image — 1200×630") — waveform mark, "Joel Shinness Solutions" wordmark in Fraunces, verbatim tagline "On your wavelength.", joelshinness.com. Dimensions verified programmatically via sharp metadata.
- `src/components/SEO.astro`: `ogImage` constant now `${SITE_URL}/og-image.png`; stale "replace og-image.svg with a real JPG" comments removed; all other lines (Props, meta tags, JSON-LD, Twitter Card) unchanged. `public/og-image.svg` deleted (zero remaining references).

## OG Approval Record

**Approved by Joel via checkpoint on 2026-07-14** (resume signal "approved"). The SEO.astro wire-in was performed only after this approval, per D-15. Built HTML verified post-wire-in: `og:image` and `twitter:image` both emit `https://joelshinness.com/og-image.png`; zero `og-image.svg` references in dist.

## Waveform SVG Provenance

MCP path (D-16): the 33-01 extraction obtained clean SVG via Figma `download_assets` from node 4:80 — no manual Copy-as-SVG from Joel was required. No geometry was hand-authored anywhere in this plan.

## OG Composition Approach

**Exported frame, not composed.** The 33-01 OG Frame Check found an existing 1200x630 Figma frame (node 5:41), so the plan's compose contingency (satori + sharp script) did not apply. The orchestrator exported the frame from Figma; this executor copied it to `public/og-image.png` and verified 1200x630.

## Task Commits

1. **Task 1: WaveMark.astro + favicon assets** — `4c2a0fb` (feat)
2. **Task 2: Figma-exported 1200x630 OG image** — `de34663` (feat)
3. **Task 3: Wire approved og-image.png into SEO** — `ef93d0e` (feat)

## Deviations from Plan

### Auto-adjusted (orchestrator-directed)

**1. [OG source] Direct Figma export replaced the generate-og.mjs compose script**

- **Found during:** Task 2
- **Issue:** Plan Task 2 called for writing `scripts/generate-og.mjs` (@vercel/satori + sharp composition). The plan itself noted: "If 33-01's OG Frame Check found an existing 1200x630 Figma frame, prefer exporting that frame directly instead of composing" — and the frame exists (node 5:41).
- **Resolution:** Used the orchestrator-provided direct Figma export of frame 5:41. `generate-og.mjs` was NOT written and `@vercel/satori` was NOT installed. `sharp` was still installed (devDependency) for favicon.ico rasterization and OG dimension verification.
- **Files affected:** public/og-image.png (created), scripts/generate-og.mjs (never created)
- **Commit:** de34663

### Minor cleanup

**2. [Cleanup] Deleted public/og-image.svg after wire-in**

- **Found during:** Task 3
- **Rationale:** After the SEO wire-in, zero references to the SVG placeholder remained in src/, public/, or built HTML; keeping it would ship a dead asset. Deletion confirmed with orchestrator.
- **Commit:** ef93d0e

## Issues Encountered

- `sharp` install scripts were blocked by npm allow-scripts policy on first install; resolved with `npm approve-scripts sharp` + reinstall. Documented as normal tooling flow, not a deviation.

## Verification

- `npm run build`: PASS (16 pages, zero errors) — run after each task
- WaveMark.astro: inline `<svg>` with `stroke="currentColor"`, no `<img`, geometry matches 33-FIGMA-EXTRACTION.md exactly: PASS
- `grep "prefers-color-scheme" public/favicon.svg`: PASS
- `public/favicon.ico` regenerated (mtime 2026-07-14, newer than phase start): PASS
- og-image.png dimensions via sharp metadata: 1200x630 exact: PASS
- `grep "og-image.png" src/components/SEO.astro`: matches; `grep "og-image.svg" src/components/SEO.astro`: nothing: PASS
- Built HTML: `og:image` / `twitter:image` = `https://joelshinness.com/og-image.png`: PASS
- BaseLayout favicon `<link>` tags unchanged: PASS

## Next Phase Readiness

- FOUND-05 satisfied: mark, favicon, and OG image all delivered from Figma-sourced elements, no hand-authored geometry, approval on record
- Phase 34 (site chrome) can import `WaveMark.astro` directly for header/footer branding (`currentColor` inherits any `text-wl-*` utility)
- No blockers

---
*Phase: 33-token-foundation-fonts*
*Completed: 2026-07-14*

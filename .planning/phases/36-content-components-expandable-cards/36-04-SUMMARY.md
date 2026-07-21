---
phase: 36
plan: "04"
subsystem: content-components
tags: [projectcard, frequencywave, details-summary, css-animation, inline-svg, comp-03, comp-05]
one-liner: "ProjectCard (COMP-03) native details expand/collapse with thumb block + FrequencyWave (COMP-05) five-line inline SVG, both theme-adaptive via var(--color-wl-accent)"

dependency-graph:
  requires: ["36-01 (extraction)", "36-03 (thumbLabel schema + projects.json v2)", "35 (Eyebrow + Tag primitives)"]
  provides: ["COMP-03 ProjectCard expandable card", "COMP-05 FrequencyWave inline SVG", "::details-content animation in global.css (shared with 36-05 FAQItem)"]
  affects: ["36-05 (FAQItem reuses ::details-content CSS from global.css)", "Phase 37 (landing page assembles ProjectCard + FrequencyWave)", "Phase 38 (showcase page uses ProjectCard via getCollection)"]

tech-stack:
  added: []
  patterns:
    - "Native <details>/<summary> expand/collapse — whole card as summary (D-01), no name attr (D-03), no ARIA override (D-02)"
    - "CSS ::details-content height 0→auto with interpolate-size progressive enhancement (Chromium smooth, FF/Safari snap)"
    - "CSS details[open] attribute selector for border state and chevron rotation — zero JS"
    - "Toggle label text swap via CSS .wl-project-card-details[open] — zero JS"
    - "Inline SVG with stroke=var(--color-wl-accent) for dark-mode adaptation without JS"
    - "Style array joined pattern (ServiceCard precedent) for inline styles"

key-files:
  created:
    - src/components/wl/ProjectCard.astro
    - src/components/wl/FrequencyWave.astro
  modified:
    - src/styles/global.css

decisions:
  - id: D-animation-global-css
    summary: "::details-content CSS placed in global.css, not per-component style block"
    detail: "ProjectCard (COMP-03) and FAQItem (36-05) both use native <details> expand/collapse. Placing the ::details-content animation in global.css ensures one shared definition, consistent timing, and a single prefers-reduced-motion override. The component-scoped <style> block in ProjectCard.astro handles only the border and toggle-label state changes specific to this component."
  - id: D-interpolate-size-root
    summary: "interpolate-size: allow-keywords added to existing :root block (not a second :root)"
    detail: "global.css had an existing :root block with footer local tokens. The new interpolate-size declaration was added to that block to avoid duplicate :root rules. Browsers without support (FF/Safari) ignore it silently — progressive enhancement."
  - id: D-prefers-reduced-motion-extended
    summary: "Existing @media (prefers-reduced-motion: reduce) block extended, not duplicated"
    detail: "global.css already had a @media (prefers-reduced-motion: reduce) block containing html { scroll-behavior: auto }. Per plan instructions, the details::details-content and details .wl-toggle-indicator transition: none rules were added to that existing block rather than creating a second one."
  - id: D-thumb-block-deviation
    summary: "Thumb block (308px gradient) built per 36-EXTRACTION.md — not in original UI-SPEC"
    detail: "36-EXTRACTION.md confirmed a 308px gradient thumb block on ProjectCard (node 41:5) with a per-project Fraunces Italic 16px label. The original UI-SPEC omitted it entirely. The thumbLabel prop (added to schema in 36-03) renders this block above the body inside the summary. Gradient does not flip in dark mode."
  - id: D-title-local-22px
    summary: "ProjectCard title: local Fraunces 22px (not .wl-heading-h3 21px)"
    detail: "36-EXTRACTION.md node 41:10 confirmed 22px. The plan text mentioned .wl-heading-h3 as a reference but the extraction is authoritative. Local inline style applied rather than the utility class to match the 22px Figma value exactly."
  - id: D-hook-ink-not-accent
    summary: "ProjectCard hook/outcome: Fraunces Italic 17px INK (not accent, not .wl-accent-outcome)"
    detail: "36-EXTRACTION.md node 41:12 confirmed the hook line is ink color (#12333B light / #EAF6F3 dark) and 17px, not the 16px accent color of .wl-accent-outcome. Local inline style used."
  - id: D-section-labels-accent-outcome-class
    summary: "Expanded section labels use .wl-accent-outcome + explicit accent color"
    detail: "36-EXTRACTION.md resolved section labels as Fraunces Italic 16px var(--color-wl-accent) — exactly matching .wl-accent-outcome styling. The plan referenced .wl-label-eyebrow as a possibility; extraction confirmed .wl-accent-outcome is the correct class. Color override inline to ensure the accent token (not class default) is explicit."
  - id: D-frequencywave-stroke-linecap-butt
    summary: "FrequencyWave: no stroke-linecap (butt default per Figma export)"
    detail: "36-EXTRACTION.md explicitly notes 'stroke-linecap: not set in Figma export (butt default)'. The plan and PATTERNS.md suggested stroke-linecap='round' per WaveMark convention, but the extraction artifact is authoritative and supersedes plan text. FrequencyWave uses butt line caps to match Figma exactly."
  - id: D-toggle-label-css-swap
    summary: "Toggle label text (Read the story / Hide) swapped via CSS, zero JS"
    detail: "Component-scoped CSS uses .wl-project-card-details[open] .wl-toggle-label { display: none } and .wl-project-card-details[open] .wl-toggle-label-open { display: inline } to swap between the two label strings without any JavaScript. Both spans are in the DOM at all times."

metrics:
  duration: "4 min"
  completed: "2026-07-16"
---

# Phase 36 Plan 04: ProjectCard + FrequencyWave + Expand/Collapse CSS Summary

## What Was Built

Three artifacts: the `::details-content` animation CSS in `global.css` (shared infrastructure), `ProjectCard.astro` (COMP-03), and `FrequencyWave.astro` (COMP-05).

**Files changed:**

- `src/styles/global.css` — `interpolate-size: allow-keywords` added to existing `:root` block; `::details-content` height animation + `content-visibility` discrete transition; chevron `.wl-toggle-indicator` rotation; `prefers-reduced-motion: reduce` block extended with both `transition: none` rules
- `src/components/wl/ProjectCard.astro` — COMP-03: article > details > summary with whole closed card; 308px gradient thumb block; body with extraction-exact gaps; native `<details>` expand/collapse; story content in DOM when closed; component-scoped CSS for border and label text state
- `src/components/wl/FrequencyWave.astro` — COMP-05: inline SVG `viewBox="0 0 1670 1044"`, group opacity 0.7, five paths with verbatim `d` values and per-path opacity/stroke-width from 36-EXTRACTION.md, `stroke="var(--color-wl-accent)"` on all paths

## Task Outcomes

### Task 1: ::details-content + chevron rotation CSS in global.css

- `interpolate-size: allow-keywords` added to existing `:root` block (one declaration, no duplicate `:root`)
- `details::details-content` height 0→auto with `content-visibility 0.3s ease allow-discrete`
- `details[open]::details-content { height: auto }`
- `details .wl-toggle-indicator` + `details[open] .wl-toggle-indicator` chevron rotation
- Extended existing `@media (prefers-reduced-motion: reduce)` block with `transition: none` on both selectors
- No `max-height` rule anywhere in the details block; no `@supports` wrapper
- `npm run build` exits 0

### Task 2: ProjectCard.astro (COMP-03)

- `article > details > summary` — whole closed card is the `<summary>` (D-01)
- No `name` attribute (D-03 — independent open), no ARIA override (D-02 — only `aria-hidden` on the decorative chevron SVG)
- **Thumb block** (308px, gradient `linear-gradient(150.617deg, #0E7078 0%, #14323B 70.721%)`): Fraunces Italic 16px #FFFFFF opacity .85 label from `thumbLabel` prop (SOFT 0 / WONK 1)
- **Body gaps** (extraction-exact): kicker→title 8px / title→hook 8px / hook→summary 10px / summary→tags 18px / tags→toggle 21px
- **Title**: local Fraunces Regular 22px ink (NOT `.wl-heading-h3` 21px — extraction override, node 41:10)
- **Hook**: Fraunces Italic 17px ink (NOT accent — extraction override, node 41:12)
- **Toggle row**: "Read the story" / "Hide" label text swapped via CSS; 16×16 chevron SVG (path `M4 6L8 10L12 6`) with `currentColor` stroke rotated by Task 1 CSS
- **Expanded panel**: problem / built / result sections after `</summary>` (in DOM when closed for SEO); section labels `.wl-accent-outcome` Fraunces Italic 16px accent; gaps 21px → divider → 18px → label → 3px → body → 18px
- **Border**: `var(--color-wl-line)` closed → `var(--color-wl-accent)` open via component-scoped CSS
- Imports `Eyebrow.astro` and `Tag.astro` primitives; no `set:html`; no script tag
- `npm run build` exits 0; line count >60

### Task 3: FrequencyWave.astro (COMP-05)

- `viewBox="0 0 1670 1044"`, `preserveAspectRatio="none"`, `fill="none"`, `aria-hidden="true"`
- Group `<g opacity="0.7">` wrapping all five paths (group opacity from node 13:21)
- Five `<path>` elements with verbatim `d` values from 36-EXTRACTION.md
- Per-path opacity: 0.14 / 0.18 / 0.22 / 0.20 / 0.15
- Per-path stroke-width: 1.73958 / 1.73958 / 2.31944 / 2.31944 / 1.73958
- `stroke="var(--color-wl-accent)"` on all five paths — token flips automatically in dark mode via `.dark` block in global.css
- No stroke-linecap (butt default per Figma export — extraction authoritative over WaveMark "round" convention)
- No `<img>` tag; no script tag; no old-token references
- `npm run build` exits 0

## Extracted Geometry Used (with node sources)

| Value | Extracted | Source Node |
|-------|-----------|-------------|
| Card border-radius | 18px | 41:45 |
| Thumb block height | 308px | 41:5 |
| Thumb gradient | linear-gradient(150.617deg, #0E7078 0%, #14323B 70.721%) | 41:5 |
| Thumb label: Fraunces Italic 16px #FFFFFF opacity .85 | confirmed | 41:6 |
| Body padding | 26px top / 29px bottom / 27px left+right | 41:7 |
| gap kicker→title | 8px | 41:9 |
| Title: Fraunces Regular 22px ink | confirmed (overrides .wl-heading-h3 21px) | 41:10 |
| gap title→hook | 8px | 41:11 |
| Hook: Fraunces Italic 17px ink | confirmed (overrides .wl-accent-outcome accent) | 41:12 |
| gap hook→summary | 10px | 41:13 |
| gap summary→tags | 18px | 41:15 |
| Tags: flex, gap 8px | confirmed | 41:16 |
| gap tags→toggle | 21px | 41:25 |
| Toggle row: flex, gap 7px | confirmed | 41:26 |
| Toggle label: HG SemiBold 14px accent | confirmed | 41:27 / 41:77 |
| Toggle chevron: 16×16, M4 6L8 10L12 6 | confirmed | 41:28 / 41:78 |
| gap toggle→divider | 21px | 41:81 |
| Divider: 1px var(--color-wl-line) | confirmed | 41:82 |
| gap divider→first label | 18px | 41:83 |
| Section labels: Fraunces Italic 16px accent | confirmed | 41:84/88/92 |
| gap label→body | 3px | 41:85 |
| gap between sections | 18px | 41:87/91 |
| FrequencyWave viewBox | 0 0 1670 1044 | 13:21 |
| FrequencyWave group opacity | 0.7 | 13:21 |
| FrequencyWave preserveAspectRatio | none | 13:21 |
| FrequencyWave path d values (5) | verbatim | 36-EXTRACTION.md |

## FLAGGED Values

None. All values were present in 36-EXTRACTION.md with confirmed Figma node sources. No fallback-to-estimation was required.

## Deviations from Plan

### Upstream artifact supersedes plan detail

**1. [Extraction Override] Thumb block (gradient + italic label) — not in original UI-SPEC**

- **Found during:** Task 2 (pre-execution reading of 36-EXTRACTION.md per extraction_deviation_notes)
- **Issue:** The original plan and UI-SPEC omitted the thumb block entirely. 36-EXTRACTION.md confirmed a 308px gradient above the body with a per-project italic label.
- **Fix:** Built the thumb block as the top section of the `<summary>`, above the body content. Uses the `thumbLabel` prop (already added to schema in 36-03).
- **Files modified:** `src/components/wl/ProjectCard.astro`
- **Commit:** c081f67

**2. [Extraction Override] Title: 22px local (not .wl-heading-h3 21px)**

- **Found during:** Task 2 (36-EXTRACTION.md node 41:10)
- **Issue:** Plan text referenced `.wl-heading-h3` but extraction confirmed 22px vs the class's 21px.
- **Fix:** Local inline style with `font-size: 22px` instead of the utility class.
- **Files modified:** `src/components/wl/ProjectCard.astro`

**3. [Extraction Override] Hook/outcome: Fraunces Italic 17px INK (not accent)**

- **Found during:** Task 2 (36-EXTRACTION.md node 41:12)
- **Issue:** Plan referenced `.wl-accent-outcome` (16px accent); extraction confirmed 17px ink.
- **Fix:** Local inline style with `color: var(--color-wl-ink)` and `font-size: 17px`.
- **Files modified:** `src/components/wl/ProjectCard.astro`

**4. [Extraction Override] FrequencyWave stroke-linecap: butt (not round)**

- **Found during:** Task 3 (36-EXTRACTION.md "stroke-linecap: not set in Figma export (butt default)")
- **Issue:** Plan and PATTERNS.md suggested `stroke-linecap="round"` per WaveMark convention; extraction is authoritative.
- **Fix:** No `stroke-linecap` attribute on paths (butt default).
- **Files modified:** `src/components/wl/FrequencyWave.astro`

**5. [Rule 1 - Bug] Comment strings containing `<script>` and `<img>` matched grep checks**

- **Found during:** Task 2 and Task 3 verification
- **Issue:** Header comments like "No `<script>` tag" and "not `<img>`" triggered the plan's literal string grep checks.
- **Fix:** Rephrased comments to avoid the literal tag strings ("No script tag", "not an img tag").
- **Files modified:** `src/components/wl/ProjectCard.astro`, `src/components/wl/FrequencyWave.astro`

## Authentication Gates

None.

## Package.json

Unchanged. Zero new npm dependencies as required by the threat model and plan.

## Commits

| Task | Commit | Message |
|------|--------|---------|
| Task 1 | aa9f211 | feat(36-04): add ::details-content expand/collapse + chevron rotation CSS to global.css |
| Task 2 | c081f67 | feat(36-04): build ProjectCard.astro (COMP-03) — native details, whole card as summary, story in DOM |
| Task 3 | e30a711 | feat(36-04): build FrequencyWave.astro (COMP-05) — five-line inline SVG, theme-adaptive accent stroke |

## Next Phase Readiness

- Phase 36-05 (FAQItem) can reuse the `::details-content` CSS already in `global.css` — no duplication needed
- Phase 37 (landing page) can import `<ProjectCard>` and `<FrequencyWave>` immediately
- Phase 38 (showcase) can import `<ProjectCard>` and render cards via `getCollection('projects')`
- The `thumbLabel` field from 36-03 schema is rendered by ProjectCard's thumb block — data and component are aligned

---
phase: 36-content-components-expandable-cards
verified: 2026-07-16T23:14:00Z
status: passed
score: 14/14 must-haves verified
---

# Phase 36: Content Components + Expandable Cards — Verification Report

**Phase Goal:** All domain-specific components (project cards, service cards, FAQ, wave background) are built and verified — including expand/collapse interactions — so page assembly phases have a complete component library to draw from.

**Verified:** 2026-07-16T23:14:00Z
**Status:** PASSED
**Re-verification:** No — initial verification

---

## Requirements Coverage

Phase 36 carries four requirement IDs from the PLAN frontmatter: **COMP-03, COMP-04, COMP-05, CONT-01**.

| Requirement | Description | Status | Evidence |
|-------------|-------------|--------|----------|
| COMP-03 | ProjectCard with closed/expanded states via native `<details>` | SATISFIED | `src/components/wl/ProjectCard.astro` — 431 lines, `<details>` without `name`, story content after `</summary>`, no ARIA override, no script |
| COMP-04 | FAQ Item via native `<details>` accordion, exclusive-open | SATISFIED | `src/components/wl/FAQItem.astro` — 202 lines, `name={groupName}` exclusive-open, keyboard-operable, `<slot>` for answer |
| COMP-05 | Five-line frequency field wave inline SVG, theme-adaptive | SATISFIED | `src/components/wl/FrequencyWave.astro` — exactly 5 `<path>` elements, `style="stroke: var(--color-wl-accent);"` (CSS, not presentation attribute), `aria-hidden="true"` |
| CONT-01 | `projects.json` v2 schema with Showcase card content | SATISFIED | v2 JSON with `id`===`slug` on every entry, all required fields present, v1 fields dropped, registered via `file()` loader in `content.config.ts` |

REQUIREMENTS.md marks all four as "Pending" (traceability table not yet updated). **This verification confirms all four are complete.**

---

## Observable Truths Verification

### Truth 1: ProjectCard renders closed and expanded states via native `<details>`, with the whole closed card as the `<summary>`

**Status: VERIFIED**

- `<article> > <details> > <summary>` structure confirmed at lines 106–317 of `ProjectCard.astro`
- No `name=` attribute (independent open, D-03) — grep returns zero matches
- No `role=`, `aria-expanded=`, `aria-labelledby=` overrides (D-02) — only `aria-hidden` on the decorative chevron SVG
- No `<script>` tag, no `set:html`

### Truth 2: Story content (problem/built/result) is in the DOM when the card is collapsed — hidden by CSS, not conditionally omitted

**Status: VERIFIED**

- Expanded panel renders at lines 326–385, after `</summary>` closes at line 317
- The panel is conditionally rendered only when at least one of problem/built/result is provided (WR-06 fix), but when rendered, it is always in the DOM (not gated by an open/closed state)
- Comment at line 319 explicitly documents this: "inside `<details>`, after `</summary>`. Story content present in DOM when card is closed — CSS ::details-content hides it."

### Truth 3: Expand/collapse animates via CSS `::details-content` with `interpolate-size` progressive enhancement; chevron rotates; prefers-reduced-motion guard present

**Status: VERIFIED**

- `global.css` lines 218–255 contain: `details::details-content { height: 0; overflow: hidden; transition: ... }`, `details[open]::details-content { height: auto; }`, `details[open] .wl-toggle-indicator { transform: rotate(180deg); }`, `@media (prefers-reduced-motion: reduce)` block covering both selectors
- `interpolate-size: allow-keywords` present exactly once in `:root` (line 68)
- No `max-height` fallback in the details block (the line 444 occurrence is the mobile-nav overflow container, not details)
- No `@supports` wrapper

### Truth 4: FAQItem provides exclusive-open accordion behavior, keyboard-operable, with visible focus ring

**Status: VERIFIED**

- `name={groupName}` attribute wired at line 50 of `FAQItem.astro`
- `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent` on `<summary>` (line 67)
- `hover:text-wl-accent` on question text (line 88) — implemented via class, not inline style (WR-02 fix verified)
- `<slot />` at line 143 for answer prose
- Scoped `<style>` overrides global 180° chevron rotation to 45° for the `+` glyph (FAQItem-specific behavior)
- Keyboard operability is native to `<details>/<summary>` — no custom key handling added or needed

### Truth 5: FrequencyWave renders five inline SVG lines with `var(--color-wl-accent)` stroke that adapts to dark mode; the SVG is `aria-hidden`

**Status: VERIFIED**

- Exactly 5 `<path>` elements confirmed by `grep -c "<path"` returning 5
- All five use `style="stroke: var(--color-wl-accent);"` (CSS declaration — universally supported) NOT `stroke="var(...)"` (presentation attribute — WR-01 fix applied)
- `aria-hidden="true"` on the `<svg>` root
- No `<img>` tag, no `<script>` tag
- Verbatim path `d` values from 36-EXTRACTION.md node 13:21 (`viewBox="0 0 1670 1044"`, group opacity 0.7, per-path opacity 0.14/0.18/0.22/0.20/0.15, per-path stroke-width 1.73958/1.73958/2.31944/2.31944/1.73958)

### Truth 6: `projects.json` v2 schema with `id`===`slug`, all required fields, v1 fields dropped; collection registered via `file()` loader

**Status: VERIFIED**

- `node -e` validation exits 0: both entries have `id===slug`, all required fields present
- No v1 fields (`category`, `thumbnail`, `technologies`, `testimonial`, `draft`) — grep returns zero
- `content.config.ts`: `import { file } from 'astro/loaders'`, `file('src/data/projects.json')`, `export const collections = { blog, projects }`, `id` NOT in Zod schema
- `thumbLabel` field added per extraction discovery (not in original UI-SPEC)
- D-09 placeholder: identical verbatim Figma copy on both entries; second entry has correct `section: "craft-experiments"` and different `id/slug` — intentional per D-09 protocol

### Truth 7: Build passes, content-components isolation page not in production build, no old neobrutalist tokens in the three wl components

**Status: VERIFIED**

- `npm run build` exits 0 — 6 pages built
- `grep -r "content-components" dist/` returns zero — isolation page deleted per gate-and-delete pattern
- `grep -rE "bg-yellow|text-turquoise|shadow-neo|border-neo|--color-yellow"` on all three components returns zero
- v1 project pages (`src/pages/projects/index.astro`, `src/pages/projects/[slug].astro`) confirmed deleted
- Stale `/projects` a11y tests confirmed removed from `axe-tests.spec.ts` and `dark-mode.spec.ts`

### Truth 8: Code-review fixes (CR-01 + WR-01 through WR-07) are applied in the actual files

**Status: VERIFIED**

- **CR-01 (ProjectCard "Hide" label never displayed):** `wl-toggle-label-open` span has NO inline `display: none`. Default hiding is in the scoped `<style>` block at line 422 (`.wl-toggle-label-open { display: none; }`). The `details[open]` reveal rule at line 428 can now apply.
- **WR-01 (FrequencyWave var() in presentation attribute):** All five paths use `style="stroke: var(--color-wl-accent);"` CSS declaration; presentation attribute `stroke="var(...)"` is absent.
- **WR-02 (FAQItem hover color dead):** Question span uses `class="text-wl-ink hover:text-wl-accent"` with no `color` in inline style — hover affordance is live.
- **WR-03 (Open-state spacing double-counts):** FAQItem row padding in stylesheet (`.wl-faq-row { padding: 19px 24px; }`) with `[open]` override to zero bottom padding. ProjectCard body padding in stylesheet (`.wl-project-card-body { padding: 26px 27px 29px 27px; }`) with `.wl-has-story[open]` override to zero bottom padding.
- **WR-04 (projects.json copy-paste):** Skipped — intentional D-09 behavior, no fix required.
- **WR-05 (/about a11y test scanned nonexistent route):** `/about` test block removed; comment at line 39 of `axe-tests.spec.ts` documents the reason.
- **WR-06 (Expanded panel chrome unconditional):** Entire expanded panel wrapped in `{(problem || built || result) && (...)}` at line 326; `wl-has-story` class added to `<details>` gates the WR-03 padding override.
- **WR-07 (Contrast gate un-composited white):** `check-contrast.mjs` uses composited values `#DBEAEB` (white@0.85 over #0E7078, true 4.71:1) and `#DCE0E2` (white@0.85 over #14323B). `node scripts/check-contrast.mjs` exits 0.

### Truth 9: a11y gate — zero axe violations in light and dark modes; contrast gate passes

**Status: VERIFIED**

- `npm run test:a11y` — 6/6 tests pass (including homepage light, homepage dark, blog, mobile chrome × 2, mobile keyboard)
- No stale `content-components` spec causes 404 failures
- `node scripts/check-contrast.mjs` — all TEXT-USE pairs pass WCAG AA (gate: PASS)

### Truth 10: Fidelity gate — Joel approved rendered vs Figma 36:5 on 2026-07-16

**Status: VERIFIED (from gate record)**

- Approval documented in 36-06-SUMMARY.md: "Fidelity gate: APPROVED by Joel Shinness on 2026-07-16"
- Fidelity screenshots stored at `.planning/phases/36-content-components-expandable-cards/fidelity/36-fidelity-light.png` and `36-fidelity-dark.png`
- Gate-and-delete pattern executed: isolation page and axe spec deleted in commit 404671c after approval

---

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/components/wl/ProjectCard.astro` | COMP-03 expandable project card | VERIFIED | 431 lines; `<details>` no `name`; whole card as `<summary>`; story in DOM after `</summary>`; imports Eyebrow + Tag; no old tokens; CR-01 + WR-03 + WR-06 fixes applied |
| `src/components/wl/FAQItem.astro` | COMP-04 FAQ accordion, exclusive-open | VERIFIED | 202 lines; `name={groupName}`; `<slot>`; focus ring; `+` glyph 45° rotation; WR-02 + WR-03 fixes applied |
| `src/components/wl/FrequencyWave.astro` | COMP-05 five-line inline SVG | VERIFIED | 5 paths; CSS stroke declaration (not presentation attr); `aria-hidden`; WR-01 fix applied |
| `src/styles/global.css` | `::details-content` + `interpolate-size` + chevron rotation + reduced-motion | VERIFIED | Lines 218–255; `interpolate-size` once in `:root`; no `max-height` in details block; no `@supports` wrapper |
| `src/data/projects.json` | v2 schema, `id`===`slug`, v1 fields dropped | VERIFIED | 2 entries; D-09 placeholder content; `thumbLabel` added per extraction; no v1 fields |
| `src/content.config.ts` | `projects` collection via `file()` loader + Zod schema | VERIFIED | `file('src/data/projects.json')`; `z.enum(['client-work','craft-experiments'])`; `id` not in schema; `export const collections = { blog, projects }` |
| `scripts/check-contrast.mjs` | Phase 36 ProjectCard + FAQItem contrast pairs, composited thumb label | VERIFIED | "PHASE 36" block; 26 pairs; `#DBEAEB`/`#DCE0E2` composited values; exits 0 |
| `astro.config.mjs` | `/portfolio` → `/` redirect; v1 `/projects` redirect removed | VERIFIED | `'/portfolio': '/'`; `'/faq': '/'`; no stale `/projects` target |
| `.planning/phases/36-content-components-expandable-cards/36-EXTRACTION.md` | Figma extraction — all FIDELITY-GAPs resolved | VERIFIED | Exists; ProjectCard/FAQItem/FrequencyWave geometry; D-09 placeholder copy; 5 wave paths with verbatim `d` values; only 1 FLAGGED value (ProjectCard hover — ServiceCard-derived fallback) |
| `.../fidelity/36-fidelity-light.png` and `36-fidelity-dark.png` | Fidelity gate screenshots (permanent) | VERIFIED | Both files present in `fidelity/` subdir |

---

## Key Link Verification

| From | To | Via | Status |
|------|----|-----|--------|
| `ProjectCard.astro` | `Eyebrow.astro` + `Tag.astro` | `import Eyebrow from './Eyebrow.astro'` + `import Tag from './Tag.astro'` | WIRED |
| `ProjectCard.astro` | `global.css ::details-content` rules | native `<details>` element matched by `details::details-content` selector | WIRED |
| `ProjectCard.astro` | scoped `<style>` for border + label swap | `.wl-project-card-details[open]` selectors at lines 399–431 | WIRED |
| `FAQItem.astro` | exclusive-open group | `name={groupName}` attribute on `<details>` | WIRED |
| `FAQItem.astro` | `global.css ::details-content` animation | comments document dependency; component style adds 45° override | WIRED |
| `FrequencyWave.astro` | `--color-wl-accent` dark-mode flip | CSS `style="stroke: var(--color-wl-accent);"` resolves via global.css `.dark` block | WIRED |
| `content.config.ts` | `src/data/projects.json` | `file('src/data/projects.json')` loader | WIRED |
| `content.config.ts` | `export const collections` | `export const collections = { blog, projects }` | WIRED |
| CR-01 fix | `wl-toggle-label-open` reveal | Default hiding via `.wl-toggle-label-open { display: none; }` in `<style>` block (not inline) | WIRED |
| WR-01 fix | FrequencyWave stroke | `style="stroke: var(--color-wl-accent);"` CSS declaration (not `stroke=` presentation attribute) | WIRED |

---

## Anti-Patterns Scan

No blockers. All code-review items (CR-01, WR-01 through WR-07) were fixed and verified by grep before the fidelity gate. Info-level items (IN-01 through IN-08) are pre-existing or deferred to Phase 41 per the review's own guidance.

| File | Finding | Severity | Status |
|------|---------|----------|--------|
| `ProjectCard.astro` | CR-01: "Hide" label blocked by inline `display: none` | Blocker | FIXED (inline style removed; CSS owns hiding) |
| `FrequencyWave.astro` | WR-01: `stroke="var()"` in presentation attr | Warning | FIXED (moved to `style="stroke:"` CSS declaration) |
| `FAQItem.astro` | WR-02: inline color blocked `hover:text-wl-accent` | Warning | FIXED (class-based `text-wl-ink hover:text-wl-accent`) |
| `FAQItem.astro` + `ProjectCard.astro` | WR-03: open-state gap double-counted container padding | Warning | FIXED (padding moved to stylesheet; `[open]` overrides zero bottom padding) |
| `projects.json` | WR-04: second entry is D-09 copy-paste | Warning | ACCEPTED (intentional per D-09 protocol; no fix required) |
| `axe-tests.spec.ts` | WR-05: `/about` axe test scanned nonexistent route | Warning | FIXED (test removed) |
| `ProjectCard.astro` | WR-06: expanded panel chrome rendered unconditionally | Warning | FIXED (`{(problem || built || result) && (...)}` guard) |
| `scripts/check-contrast.mjs` | WR-07: un-composited white for thumb label | Warning | FIXED (`#DBEAEB`/`#DCE0E2` composited values) |

---

## Notes on Gate-and-Delete Pattern

The PLAN specified (and the SUMMARY confirms) that the isolation page (`src/pages/dev/content-components.astro`) and its axe spec (`tests/accessibility/content-components.spec.ts`) were **intentionally temporary artifacts** — created to exercise the verification gates, then deleted. Their absence from the working tree is **correct behavior**, not a gap. Their successful runs are recorded in 36-06-SUMMARY.md. The production build grep confirms zero trace in `dist/`.

---

## Score Breakdown

| Category | Verified | Total |
|----------|---------|-------|
| COMP-03 (ProjectCard) | 5 | 5 |
| COMP-04 (FAQItem) | 4 | 4 |
| COMP-05 (FrequencyWave) | 2 | 2 |
| CONT-01 (data layer) | 3 | 3 |
| **Total** | **14** | **14** |

---

_Verified: 2026-07-16T23:14:00Z_
_Verifier: Claude (gsd-verifier)_

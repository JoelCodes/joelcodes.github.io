---
phase: 38-showcase-page-blog-restyle
plan: "05"
subsystem: ui
tags: [astro, css, wl-prose, expressive-code, blog-card, dark-mode, figma, wcag]

# Dependency graph
requires:
  - phase: 33-token-foundation-fonts
    provides: --wl-* token palette, Fraunces/Hanken font stacks, 13-style type ramp
  - phase: 35-ui-primitives
    provides: Tag.astro primitive, LinkCard.astro analog (props-for-data, WR-02 pattern)
  - phase: 38-showcase-page-blog-restyle
    provides: 38-BLOG-FRAMES.md (approved frames 211:3/211:4/211:5/211:6 — D-08 gate cleared in 38-04)
provides:
  - ".wl-prose scope in global.css: token-based MDX prose styling with automatic dark flip"
  - "expressive-code rethemed: code blocks follow the .dark class (not prefers-color-scheme) with brand sea-glass chrome"
  - "src/components/wl/BlogCard.astro: single-column editorial blog list entry (h2 title, time, description, Tag pills)"
affects:
  - phase-38-plan-06 (blog page restyles import all three foundations)
  - phase-41 (cleanup — old .prose scope + old BlogCard.astro deletion)
  - phase-38-fidelity-gate (local sizes + deferred gaps flagged for review)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "expressive-code class-based dark: themeCssSelector returning '.dark'/':not(.dark)' + useDarkModeMediaQuery: false"
    - "styleOverrides per-theme functions: ({ theme }) => theme.name === 'github-dark' ? darkHex : lightHex"
    - "Frame-nested styleOverrides: frameBackground does not exist — use frames.editorTabBarBackground / frames.terminalTitlebarBackground"
    - "Parallel prose scope: .wl-prose authored below untouched .prose; token-based rules need zero .dark overrides"
    - "Local Fraunces size in scoped <style> when a media query is needed (BlogCard 28px/24px@390)"

key-files:
  created:
    - src/components/wl/BlogCard.astro
    - .planning/phases/38-showcase-page-blog-restyle/38-05-SUMMARY.md
  modified:
    - src/styles/global.css
    - astro.config.mjs

key-decisions:
  - "38-05: .wl-prose h2 = local 34px/26px@390 and blockquote = local 22px/19px@390 per frame 211:5/211:6 — no ramp match; blockquote left bar is 3px (frame-recorded), not the UI-SPEC's earlier 4px placeholder"
  - "38-05: .wl-prose h3 defaults to .wl-heading-h3 ramp value (21px) and h4 to local 18px — approved frames specify no h3/h4; flagged for gate"
  - "38-05: inline code font set to JetBrains Mono stack per frame 211:5 code treatment; pre radius 12px per frame"
  - "38-05: expressive-code frameBackground property does not exist in 0.41.6 — frame chrome mapped via nested frames.editorTabBarBackground/terminalTitlebarBackground/terminalBackground"
  - "38-05: syntax token colors kept from base github-light/github-dark themes — frame 211:5 specifies chrome only; all four chrome pairs measured AA-passing"
  - "38-05: BlogCard click target = whole-entry link (article > block a) — approved frame draws no per-element affordance; follows LinkCard/ProjectCard whole-surface precedent; Tag spans are non-interactive so no nested-interactive violations"
  - "38-05: BlogCard does NOT render featuredImage/readingTime (props accepted for API completeness) — frame 211:3 entries show title + date/tags meta + description only"
  - "38-05: entry hairline dividers are page-level list styling (Plan 06), not part of BlogCard"

patterns-established:
  - "Scoped <style> for local frame sizes needing breakpoint overrides (vs inline style for constant sizes)"
  - "Contrast literals measured and recorded inline in astro.config.mjs comments"

requirements-completed: []

# Metrics
duration: ~30min (including connection-error resume)
completed: 2026-07-19
---

# Phase 38 Plan 05: Blog Build Foundations Summary

**Token-based .wl-prose scope, expressive-code rethemed to the .dark class with AA-verified sea-glass chrome, and the wl/BlogCard editorial entry component (Fraunces 28 local title, whole-entry link) — the three foundations Plan 06's blog page restyles import**

## Performance

- **Duration:** ~30 min (session interrupted by a connection error after Task 1; resumed cleanly from committed state)
- **Completed:** 2026-07-19
- **Tasks:** 3/3 completed
- **Files modified:** 3 (2 modified, 1 created)

## Accomplishments

- Authored the `.wl-prose` scope (160 lines) below the byte-unchanged `.prose` scope — token-based throughout, zero `.dark .wl-prose` overrides needed
- Rethemed `astro-expressive-code` from bare defaults to class-based dark switching with brand sea-glass chrome; verified in dev that emitted `ec.css` uses `:root.dark` scoping with zero `prefers-color-scheme` queries
- Built `wl/BlogCard.astro` per approved frame 211:3/211:4: h2 title (local Fraunces 28/24), date + Tag meta row, `.wl-text-body` description, whole-entry link with group-hover accent title

## Task Commits

1. **Task 1: Author the .wl-prose scope in global.css** - `f784e18` (feat)
2. **Task 2: Retheme expressive-code to .dark class + brand palette** - `6c4be91` (feat)
3. **Task 3: Build src/components/wl/BlogCard.astro** - `04b7631` (feat)

## .wl-prose selectors authored

| Selector | Treatment | Source |
|---|---|---|
| `h2` | Fraunces 34px (26 @390), ink | LOCAL — node 211:5/211:6, no ramp match |
| `h3` | Fraunces 21px, ink | `.wl-heading-h3` ramp value (no h3 in frame) |
| `h4` | Fraunces 18px, ink | LOCAL — no h4 in frame; conservative below h3 |
| `p`, `li` | HG 16px/1.6, sub | frame 211:5 body |
| `a` | accent underlined, hover→ink, focus-visible 2px accent outline | UI-SPEC contract |
| `strong` | ink, 600 | UI-SPEC contract |
| `blockquote` | 3px accent left bar, Fraunces Italic 22px (19 @390), sub | node 211:5/211:6 (3px frame-recorded) |
| `code:not(pre code)` | sea-glass bg, 4px radius, JetBrains Mono stack | UI-SPEC + frame 211:5 mono treatment |
| `pre` | margin + 12px radius | node 211:5 code block radius |
| `img` | 8px radius, block margin | UI-SPEC default (featured image 18px handled at page level) |
| `hr` | 1px `--wl-line` | UI-SPEC contract |

All colors via `--wl-*` tokens — dark flips automatically; zero `.dark .wl-prose` rules exist.

## expressive-code literals chosen (+ AA results)

Measured 2026-07-19 via WCAG relative-luminance formula (base theme foregrounds: github-light `#24292e`, github-dark `#e1e4e8`):

| Setting | Light | Dark | Contrast (L/D) |
|---|---|---|---|
| `codeBackground` | `#E6F1F1` (--wl-sea-glass) | `#123640` (--wl-sea-glass dark) | 12.72:1 / 10.12:1 ✓ AA |
| `frames.editorTabBarBackground` + `terminalTitlebarBackground` | `#D2E7E7` (--wl-sea-glass-deep) | `#0C2228` (--wl-paper dark) | 11.40:1 / 12.91:1 ✓ AA |
| `frames.terminalBackground` | `#E6F1F1` | `#123640` | same as codeBackground |
| `borderColor` | `rgba(14,112,120,0.16)` (--wl-line family) | `rgba(90,169,165,0.22)` | n/a (non-text) |
| `borderRadius` | `12px` (frame 211:5) | — | — |

Syntax token colors kept from base themes. No pair required falling back to base-theme backgrounds — all chosen brand values pass 4.5:1 by wide margins. Plan 06's contrast pass can add these to `scripts/check-contrast.mjs` PAIRS.

## BlogCard API + click-target decision

```typescript
interface Props {
  title: string;        // renders as <h2> under page <h1>
  slug: string;         // href = /blog/{slug}
  pubDate: Date;        // <time datetime={iso}> — "Mon D, YYYY" display
  description: string;  // .wl-text-body / sub
  tags?: string[];      // <Tag> pills (no custom spans)
  featuredImage?: string; // accepted, NOT rendered (frame 211:3 has no thumbnail)
  readingTime?: number;   // accepted, NOT rendered (frame meta row = date + tags only)
  class?: string;
}
```

**Click target (frame-approval decision):** whole-entry link — `<article>` (no href/tabindex) wraps one block `<a>` containing title/meta/description. The approved frame draws no per-element affordance, so the LinkCard/ProjectCard whole-surface precedent applies. `<Tag>` is a `<span>` — no nested-interactive violations. Title color lives in class (`text-wl-ink group-hover:text-wl-accent`) so hover wins the cascade (WR-02).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] `styleOverrides.frameBackground` does not exist in astro-expressive-code 0.41.6**

- **Found during:** Task 2 (`npm run astro check` failed with ts(2353) + a consequent implicit-any error)
- **Issue:** The plan/UI-SPEC described frame chrome overrides generically; `frameBackground` is not a valid `CoreStyleSettings` property
- **Fix:** Frame chrome mapped via the nested `frames` plugin settings (`editorTabBarBackground`, `terminalTitlebarBackground`, `terminalBackground`) verified against `@expressive-code/plugin-frames` type definitions
- **Files modified:** astro.config.mjs
- **Commit:** 6c4be91

### Notes

- `npm run astro check` reports 2 pre-existing errors in `src/pages/index.astro` and `src/pages/thank-you.astro` (untouched by this plan, present at HEAD before execution). All plan-touched files check clean.
- Session was interrupted by a connection error after Task 1's commit; resumed from disk state with no rework.

## Next Phase Readiness

- All three Plan 06 imports exist: `.wl-prose` (global.css), rethemed code blocks (astro.config.mjs), `wl/BlogCard.astro`
- Flag for fidelity gate: `.wl-prose` h3 (ramp 21px) / h4 (local 18px) have no frame authority; BlogCard entry gaps (12px title→meta→description) are 8-point family values deferred to gate review
- Plan 06 contrast pass should add the expressive-code pairs above to `scripts/check-contrast.mjs`

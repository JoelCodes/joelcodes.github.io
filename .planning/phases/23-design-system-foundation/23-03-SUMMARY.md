---
phase: 23-design-system-foundation
plan: 03
subsystem: layout-shell
tags: [astro-layout, pencil-mcp, design-tokens, slot-parity, self-hosted-fonts, v2]

requires:
  - phase: 23-01
    provides: verified Crito token ground truth + mapping table consumed for both the BaseLayout font-preload slug and the .pen variable definitions
  - phase: 23-02
    provides: src/styles/v2/global.css (imported by BaseLayoutV2) + the @fontsource-variable packages (whose woff2 the layout preloads)
provides:
  - src/layouts/v2/BaseLayout.astro — light-mode-only HTML shell with slot signature parity to v1
  - design/design-system.pen — Pencil source of truth: 33 variables + Header component + Footer component + inline Token Reference frame (D-15/D-16/D-17)
  - Self-hosted preload pattern for the heading font (plus-jakarta-sans-latin-wght-normal.woff2) via Vite ?url import
affects: [23-04, 24-04, 25-01, 25-02, 26-01, 26-04, 27-01, 27-02, 27-03, 28-01, 29-01, 29-02, 29-03]

tech-stack:
  added:
    - "src/layouts/v2/BaseLayout.astro — the import target every v2 page will use"
    - "design/design-system.pen — Pencil design source of truth (14 KB on disk)"
  patterns:
    - "Slot signature parity with v1: <slot /> for page content + <slot name=\"head\" /> for per-page extensions (JSON-LD, route-specific preloads)"
    - "Single critical-font preload via Vite ?url import (no Google Fonts CDN, no preconnect, no noscript fallback, no <script is:inline> FOUC tag)"
    - "Pencil design tokens use slash-namespace names (color/primary, font/display) that map 1:1 to the v2 CSS custom properties (--color-primary, --font-display)"
    - "Pencil reusable components encode v2 design intent in a designer-readable form; variable bindings (e.g. fill: \"$color/accent\") prevent raw hex/px from sneaking into the design source"

key-files:
  created:
    - src/layouts/v2/BaseLayout.astro
    - design/design-system.pen
  modified: []

key-decisions:
  - "Header/Footer/MobileNav imports in BaseLayout.astro point at paths plan 23-04 will create; Astro tolerates forward import declarations as long as nothing consumes the layout — and no v2 page imports it in Phase 23 (verified via grep), so the build stays green"
  - "Critical font preload covers Plus Jakarta Sans only (heading). Inter (body) is acceptable to font-swap below the fold per RESEARCH §7"
  - "design-system.pen contains Header + Footer reusable components ONLY (D-15) — Button/Card/Input/Badge primitives are Phase 24 scope per D-16 and were verified absent via pattern search"
  - "Footer is 2-column (D-13) not Crito's 3-column. No newsletter bar (D-14)"
  - ".pen save semantics: Pencil MCP holds operations in memory and persists to disk only via the GUI app's Cmd+S (no MCP save tool). One manual save was required after the in-memory build completed"

patterns-established:
  - "v2 layout self-hosting: woff2 imported via Vite ?url, preloaded with <link rel=preload>, no third-party font CDN reachable from the rendered HTML"
  - "v2 design-source file pattern: a single design-system.pen grows phase-by-phase with the components that ship in code (Phase 23 adds Header + Footer; Phase 24 will add primitives; Phase 26+ will add section components)"
  - "Variable binding discipline in .pen: no raw hex or px values inside components — every styling property resolves to a $-prefixed variable reference"

requirements-completed:
  - FOUND-02
  - FOUND-05

duration: 22 min
completed: 2026-05-14
---

# Phase 23 Plan 03: v2 BaseLayout + design-system.pen Summary

**Light-mode-only `src/layouts/v2/BaseLayout.astro` with v1-parity slot signature (default + `<slot name="head" />`) and zero dark-mode artefacts, paired with `design/design-system.pen` (14 KB) containing 33 v2 variables, reusable Header + Footer components, and an inline 33-line Token Reference frame — both bind back to the values verified in plan 23-01.**

## Performance

- **Duration:** 22 min
- **Started:** 2026-05-14T04:57:00Z
- **Completed:** 2026-05-14T05:19:00Z
- **Tasks:** 2
- **Files modified:** 2 (both created)

## Accomplishments

- `src/layouts/v2/BaseLayout.astro` ships with the exact structure spec'd in RESEARCH §8 / CONTEXT FOUND-05:
  - Imports `../../styles/v2/global.css` (from Plan 23-02) and the heading-font woff2 via Vite `?url`
  - Renders a clean `<!doctype html><html lang="en">` shell with `<head>`, viewport meta, favicons, generator meta, single `<link rel="preload">` for Plus Jakarta Sans, `<SEO>` component pass-through, and `<slot name="head" />`
  - Body class: `font-text bg-surface text-text min-h-screen flex flex-col` — v2 utilities only, no v1 token references, no `dark:` variants
  - 8 negated greps pass (no `<script>`, no `localStorage`, no `prefers-color-scheme`, no `theme-toggle`, no `dark:`, no Google Fonts URL, no `<noscript>`, no `<link rel="preconnect">`)
- `design/design-system.pen` built via Pencil MCP (variables → batch_design × 3 → Cmd+S save):
  - 33 document variables in slash-namespace form (8 colors + 6 spacing + 4 radii + 8 sizes + 2 font families + 3 weights + 2 leadings)
  - Variable types corrected mid-flight: font-weight/* were re-declared as string-type after Pencil rejected number→string fontWeight binding (Pencil's TextStyle.fontWeight is StringOrVariable). Switched via `set_variables` with `replace: true`
  - Reusable Header component: logo + 4 nav links + "Let's Talk" CTA, all colors/sizes/spacing bound to variables
  - Reusable Footer component: 2-column (brand+social left, links right) + copyright row with top border, no newsletter, no 3rd column
  - Inline Token Reference frame with title, subtitle, and 33-line monospace mapping (`color/primary → --color-primary`, etc.)
  - Zero primitive component frames (Button/Card/Input/Badge confirmed absent via pattern search — empty array returned)
- `npm run build` exits 0 (16 pages built in 2.29s)
- v1 BaseLayout.astro, v1 global.css, and Crito reference .pen all byte-identical to pre-phase state (`git diff --stat` shows no changes)
- No v2 page yet imports BaseLayoutV2 — confirmed via grep — so Header/Footer/MobileNav forward imports don't cause build failures

## Task Commits

1. **Task 1: v2 BaseLayout (light-mode-only shell)** — `7959043` (feat)
2. **Task 2: design-system.pen via Pencil MCP** — `6346061` (feat)

## Files Created/Modified

- `src/layouts/v2/BaseLayout.astro` — 36-line Astro layout. Imports v2 stylesheet + heading-font woff2 + Header + Footer + SEO. Single `<slot />` and `<slot name="head" />` for v1 parity. No FOUC script, no Google Fonts, no dark mode.
- `design/design-system.pen` — 14,239-byte Pencil document. 3 top-level frames (Header, Footer, Token Reference); 2 reusable components (Header `1IcIM`, Footer `O08uK`); 33 document variables; ~12 nested text/frame children inside the components.

## Decisions Made

- **Pencil MCP saves require GUI `Cmd+S`.** The MCP server holds operations in memory; no `save` / `save_as` tool is exposed. Spent one human-in-the-loop step (manual save via Pencil desktop app) to land the file on disk. Documented as a Pencil-MCP integration constraint to remember in Phase 24+ when adding primitives.
- **Forward imports of Header/Footer in BaseLayout don't fail the build** because no v2 page imports the layout yet. Wave 4 (plan 23-04) creates the components and they "click into place" at build time. Verified via `grep -rE "layouts/v2/BaseLayout" src/pages/` returning 0 matches.
- **Single critical-font preload** (Plus Jakarta Sans only). Inter is acceptable to font-swap because body copy renders below-the-fold for any v2 page using BaseLayoutV2.
- **font-weight variables stored as strings** (`"700"`, `"400"`, `"500"`), not numbers. Pencil's TextStyle schema requires StringOrVariable for fontWeight, so numeric variables would have failed binding. The semantic equivalence with CSS `font-weight: 700` is preserved.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug fix] font-weight/* Pencil variable types changed number → string**
- **Found during:** Task 2, first batch_design call when binding header logo's `fontWeight: "$font-weight/display"` to a number-type variable
- **Issue:** Pencil rejected the binding: `Error: Variable 'font-weight/display' has type 'number' (expected 'string')`. Pencil's TextStyle schema (`fontWeight?: StringOrVariable`) requires the bound variable to be string-typed.
- **Fix:** Re-declared the 3 font-weight variables via `mcp__pencil__set_variables` with `replace: true` and `type: "string"` (values `"700"`, `"400"`, `"500"`). Initial merge-mode call had created theme variants instead of changing types; `replace: true` was required.
- **Files modified:** `design/design-system.pen` (variables only — not nodes; the second batch_design then succeeded)
- **Verification:** Subsequent batch_design with fontWeight bindings succeeded; `get_variables` shows all 3 as `type: string`.
- **Committed in:** `6346061`

**2. [Rule 4 - architectural / human-in-the-loop] Pencil MCP file save required GUI step**
- **Found during:** Task 2 verification (`test -f design/design-system.pen` failed despite all operations succeeding)
- **Issue:** Pencil MCP holds document operations in-memory; there is no `save` / `save_as` tool. The .pen file did not land on disk until the user pressed Cmd+S in the Pencil desktop app.
- **Fix:** Surfaced via `AskUserQuestion`; user saved manually; orchestrator polled with `until [ -f ... ]; do sleep 2; done`; file landed at 14,239 bytes.
- **Files modified:** `design/design-system.pen` (saved by GUI, owned by Pencil app process)
- **Verification:** `ls -la design/design-system.pen` shows file present, > 1KB. `mcp__pencil__batch_get` confirms all 33 vars + 2 reusable components + Token Reference frame readable from disk.
- **Committed in:** `6346061`

---

**Total deviations:** 2 (1 auto-fixed bug, 1 documented integration constraint)
**Impact on plan:** No scope creep; both deviations were tool-integration friction (Pencil MCP variable typing + manual save). Will likely repeat in Phase 24 when adding primitives — pre-flag for that phase's plan.

## Issues Encountered

- **Pencil MCP variable merge semantics (set_variables without `replace: true`)** silently constructed a theme-variant array on the existing number variables instead of changing their types. Easy to miss without inspecting `get_variables` afterwards. Documented above; future variable-type changes use `replace: true` from the start.
- **Pencil reports "invalid font family" warnings** for `$font/display`, `$font/text`, and `monospace`. These are non-blocking: Pencil's font registry doesn't recognise the "Variable" suffix or the CSS keyword `monospace` as a known system font, but the variable bindings still resolve in the rendered design and the CSS file (which is the source of truth for actual page rendering) uses fully-qualified font stacks.

## User Setup Required

None — provided the Pencil desktop app remains installed for future plan 24+ edits to `design/design-system.pen`. Future plans that touch the .pen file may again require a manual Cmd+S; this is a Pencil-MCP integration constraint, not a project setup gap.

## Next Phase Readiness

- **Plan 23-04 (Header/Footer/MobileNav code + a11y spec):**
  - `src/layouts/v2/BaseLayout.astro` exists and references the three component paths Plan 23-04 will create
  - `design/design-system.pen` Header/Footer Pencil components are the visual specification 23-04's Astro components match against
  - v2 token utility classes (`font-text`, `bg-surface`, `text-text`, `bg-accent`, `rounded-md`) are already auto-generated by Tailwind v4 from the @theme block in `src/styles/v2/global.css`
- **Phase 24 and beyond:**
  - Adding primitives (Button/Card/Input/Badge) to `design/design-system.pen` will require another Pencil MCP session and another manual Cmd+S
  - The Token Reference frame inside the .pen file must be kept in sync each time new tokens are added — flagged for Phase 24+ planning

---

*Phase: 23-design-system-foundation*
*Completed: 2026-05-14*

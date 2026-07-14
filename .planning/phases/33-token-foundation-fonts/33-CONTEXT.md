# Phase 33: Token Foundation + Fonts - Context

**Gathered:** 2026-07-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Every downstream component gets correct, Figma-extracted design foundations to build against: the eight `--wl-*` sea-cool palette tokens in light **and** dark themes (FOUND-01), self-hosted Fraunces + Hanken Grotesk with the 13-style type ramp as utilities (FOUND-02), a WCAG AA contrast gate passed before any component is authored (FOUND-03), the expanded Lighthouse CI net (FOUND-04), and the waveform mark / favicon / OG-image assets wired into `BaseLayout.astro` / `SEO.astro` (FOUND-05). No components, no chrome, no page changes — existing neobrutalist pages keep rendering unchanged via namespace isolation (`--wl-` prefix; old tokens untouched until Phase 41).

</domain>

<decisions>
## Implementation Decisions

### Dark theme tokens
- **D-01:** **Semantic flip mechanism.** One token set — values redefined under the `.dark` class. Components use each token once (`bg-wl-paper`), no `dark:` variant pairs. Dark fidelity lives in one place: `global.css`. (Rejected the v1 suffixed-pair pattern.)
- **D-02:** **Figma palette names 1:1.** Tokens are named after the Figma palette vocabulary: `--wl-ink`, `--wl-sub`, `--wl-accent`, `--wl-accent-soft`, `--wl-sea-glass`, `--wl-sea-glass-deep`, `--wl-paper`, `--wl-line`. No semantic-role rename layer, no alias layer — zero translation between mockups and code.
- **D-03:** **Dark value sourcing: Figma variables first, dark mockup fallback.** Check the Figma file for dark-mode variables/modes via MCP. If none exist, extract values from the dark Landing mockup frame `117:103` fills. Nothing is invented either way.
- **D-04:** **Dark gaps: flag and ship light value.** If a token has no dark evidence anywhere in Figma (not in variables, not visible in `117:103`), it keeps its light value in dark mode and the gap goes on a FIDELITY-GAPS list for Joel to resolve. The phase does not block.

### Type ramp delivery
- **D-05:** **Composite utility classes** — one class per Figma type style bundling family, size, weight, line-height, letter-spacing, and italic/`opsz` where specced. A single class applies the full style; no per-use re-assembly from primitive utilities.
- **D-06:** **Class names mirror Figma style names**, kebab-cased with the `wl-` prefix (actual names extracted from the Components page `36:5` during research/planning). Same 1:1 principle as color tokens.
- **D-07:** **Breakpoints baked into the utilities.** Each type utility carries media-query steps matching the sizes extracted from the four mockup widths (390/768/1440/1920). No `clamp()`/fluid interpolation — intermediate values would be invented and screenshot gates only verify at Figma widths.
- **D-08:** **Body default + explicit classes.** `body` gets the Hanken Grotesk base body style in `@layer base` (existing pages are unaffected — their `font-body` utility class wins over base layer). All other ramp styles are applied via explicit `.wl-*` classes. Blog/MDX prose element-mapping is deferred to the blog restyle phase (38).

### Contrast failure policy
- **D-09:** **Companion `-text` tokens for AA failures.** When a Figma-specced text/background pair fails WCAG AA (e.g., Accent-soft `#5AA9A5` on Paper), add a darker companion token (e.g., `--wl-accent-soft-text`) for text use; the original stays for decorative/large use. Every substitution is flagged in the phase output.
- **D-10:** **Committed re-runnable script** (e.g., `scripts/check-contrast.mjs`) that asserts AA ratios over the token pair matrix — re-run whenever token values change. Not wired into CI (rejected CI gate as over-plumbing; rejected one-time doc as unverifiable later).
- **D-11:** **Coverage = mockup-observed pairs.** The script checks every text-on-background combination that actually appears in the Figma mockups/Components page, in both themes, documented as an explicit pair matrix. Not all 8×8 combos.
- **D-12:** **No approval gate on companions.** Derive each companion by minimally darkening the original at the same hue until AA passes (documented method); report before/after values + ratios in the phase output for Joel's async review. Nothing blocks. Real-context judgment happens at the Phase 37/38 screenshot gates anyway.

### Brand asset pipeline
- **D-13:** **Waveform mark = inline SVG Astro component** (e.g., `WaveMark.astro`) with strokes bound to `currentColor`/`--wl-*` tokens — theme-adaptive, crisp at all sizes. Same inline-SVG treatment research prescribes for the wave background (COMP-05, later phase).
- **D-14:** **Favicon: replace in place.** Swap the existing `public/favicon.svg` + `public/favicon.ico` with waveform versions; the SVG favicon carries a `prefers-color-scheme` media query for dark browser chrome. No apple-touch/manifest expansion this milestone.
- **D-15:** **OG image: compose from brand, approval-gated.** The Figma file likely has no 1200×630 OG frame. If none exists, compose a static 1200×630 PNG from Figma-sourced brand elements only (waveform mark + wordmark + tagline on a palette background, ramp typography) and present it to Joel for approval **before** wiring into `SEO.astro`. Replaces the placeholder `og-image.svg` (SVG is unreliable on social platforms).
- **D-16:** **SVG extraction: MCP first, manual fallback.** Try extracting the mark's vector data via the Figma MCP (`get_design_context`/`download_assets` on the mark node). If the output isn't clean, ask Joel for a manual "Copy as SVG" from Figma desktop. Never re-author geometry by eye.

### Claude's Discretion
- Google Fonts removal timing vs. coexistence during migration (old pages still reference Bricolage Grotesque / DM Sans from Google Fonts in `BaseLayout.astro:30-47` — planner decides how fonts coexist while keeping Lighthouse green and CLS = 0)
- Fraunces preload strategy and `opsz` handling at display sizes (research: preload + `font-optical-sizing: auto`)
- `lighthouserc.json` mechanics for the expanded URL set (mobile + desktop runs, re-enabling `lcp-lazy-loaded`/`prioritize-lcp-image`)
- Exact contrast-ratio math library/implementation for the check script
- Where the FIDELITY-GAPS list lives (phase artifact vs. planning doc)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design source of truth
- Figma file `1tg8wIPcvOVC5tPZ8pkGO2` "Joel Shinness Solutions — Brand Exploration" — palette variables, type ramp (Components page node `36:5`), dark Landing mockup (node `117:103`), waveform mark. Access via Figma MCP (file open in Figma desktop; claude.ai Figma server has `download_assets`).
- `.planning/PROJECT.md` — fixed palette hex values, type pairing, node map, constraints (gaps flagged never invented; fonts self-hosted; Lighthouse 90+ maintained)

### Requirements & research
- `.planning/REQUIREMENTS.md` — FOUND-01…05 exact wording
- `.planning/research/SUMMARY.md` — stack decisions (fontsource packages, Astro Fonts API ruled out), critical pitfalls #1-4 (fidelity drift, token collision, Fraunces CLS, dark FOUC)
- `.planning/research/STACK.md` — font package versions and import specifics (`wght.css` + `wght-italic.css` only for Fraunces)
- `.planning/research/PITFALLS.md` — full 14-pitfall list incl. sea-glass contrast failures and Lighthouse false-pass

### Files this phase touches
- `src/styles/global.css` — existing `@theme` block (old tokens stay; `--wl-*` block added)
- `src/layouts/BaseLayout.astro` — Google Fonts loading (lines 30-47), FOUC script (`is:inline`, lines 51-58), favicon links (lines 19-20)
- `src/components/SEO.astro` — OG image wiring (placeholder `og-image.svg`, line 36)
- `lighthouserc.json` — currently desktop homepage only; several audits disabled that FOUND-04 re-enables

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Dark-mode infrastructure: `.dark` class toggle + `@custom-variant dark` in `global.css:71` + FOUC `is:inline` script in `BaseLayout.astro` — the `--wl-*` dark flip builds on this, no new mechanism needed
- `public/favicon.svg` + `favicon.ico` wiring in `BaseLayout.astro:19-20` — replace files in place, tags unchanged

### Established Patterns
- Tailwind 4 CSS-first `@theme` in `src/styles/global.css` — new `--wl-*` block is added alongside the old tokens (namespace isolation until Phase 41)
- Old pages set fonts via utility classes bound to old tokens (`font-body` on `<body>`) — a new `@layer base` body default will not override them (utility > base), which is what makes D-08 safe

### Integration Points
- `global.css` `@theme` block — token insertion point
- `BaseLayout.astro` `<head>` — fontsource imports land here (or in global.css imports); Google Fonts block eventually removed (timing at planner's discretion)
- `SEO.astro` — OG image constant
- `lighthouserc.json` — URL list + audit re-enables

</code_context>

<specifics>
## Specific Ideas

- Contrast example the user confirmed as the expected failure case: Accent-soft `#5AA9A5` on Paper `#F6FBFA` for body text → companion `--wl-accent-soft-text` is the anticipated remedy
- OG composition must use only Figma-sourced ingredients (mark, wordmark, tagline, palette, ramp type) — the *arrangement* is the only new creative act, and it gets explicit approval before shipping

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 33-token-foundation-fonts*
*Context gathered: 2026-07-14*

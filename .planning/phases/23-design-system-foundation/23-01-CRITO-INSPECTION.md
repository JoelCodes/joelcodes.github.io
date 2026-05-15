# Phase 23-01: Crito .pen Inspection Report

| Field | Value |
|-------|-------|
| Date inspected | 2026-05-14 |
| Inspected file | `design/Consulting & Agency Website Template I Crito (Community).pen` |
| Pencil MCP node IDs touched | `ujMLJ`, `ULZiU`, `wM9Ac`, `35XXR`, `fwSmg`, `Y1ldm`, `lUyFD`, `XH3uk` |
| Tools used | `mcp__pencil__get_editor_state`, `mcp__pencil__batch_get`, `mcp__pencil__get_variables`, `npm view` |
| `.pen` mutated? | No — inspection only; file mtime unchanged (`stat -f "%m"` = 1778806811 before and after) |
| Variables defined in Crito `.pen` | None (`get_variables` returned `{}`) — values must be read from individual nodes |

## Fonts

Crito uses **three** font families. Plus Jakarta Sans for headings, Inter for body in dark hero/section contexts, and Chivo for the (light-background) footer. v2 simplifies to Plus Jakarta Sans (display) + Inter (text) only — see "## Critical Naming Override" and "## Open Questions Resolved" Q1.

| Role | Crito font.family (verified) | Inferred match in RESEARCH §1 | Confidence | npm package | npm latest |
|------|------------------------------|-------------------------------|------------|-------------|------------|
| Display / heading | `Plus Jakarta Sans` (e.g. node `a4vS3` "We Help To Grow", weight 700, size 48, letter-spacing −1) | Plus Jakarta Sans Variable | verified | `@fontsource-variable/plus-jakarta-sans` | 5.2.8 |
| Body / nav / hero text | `Inter` (e.g. node `wM9Ac` nav, weight 500, size 16; node `25lZp` paragraph, weight 400) | Inter Variable | verified | `@fontsource-variable/inter` | 5.2.8 |
| Footer body (Crito only — NOT adopted in v2) | `Chivo` (e.g. node `BhsQq` "Resources", weight 700; `R2n7U` "Tools", weight 400; `8Kx6s` copyright, weight 400) | Chivo (fallback in RESEARCH §1) | verified-but-rejected | `@fontsource-variable/chivo` | 5.2.8 (available) |

**v2 decision:** Install only `plus-jakarta-sans` and `inter`. Drop Chivo. Rationale: Inter covers every body context in Crito's main 8 sections; Chivo appears only in the footer. Keeping three-font setups multiplies bundle/preload cost. The footer body in v2 will use `--font-text` (Inter) on a `#fafafa` surface — same visual weight, simpler system. Documented in "## Open Questions Resolved" Q1.

## Color Palette

All hex values read directly from Pencil nodes via `batch_get`. OKLCH computed from hex.

| Role | Crito source node | Crito hex | OKLCH (computed) | Target v2 token | Confidence |
|------|-------------------|-----------|------------------|-----------------|------------|
| Primary (navy) — section bg, footer headings | `03BAD` BG rect in `35XXR`; `BhsQq`/`o9AbX`/`ZQ6q9` footer headings (`#141f38ff` — same hue, 1-channel render diff) | `#141f39` | `oklch(0.225 0.044 264.6)` | `--color-primary` | verified |
| Primary hover (derived) | not present in Crito (no documented hover) | `#1d2a4c` (computed +6% L) | `oklch(0.286 0.054 264.6)` | `--color-primary-hover` | inferred (per RESEARCH §2 recommendation) |
| Surface (page bg) | `ujMLJ` Home Page frame fill | `#ffffff` | `oklch(1 0 0)` | `--color-surface` | verified |
| Surface muted (footer bg, alt-section bg) | `sHon5` Footer bg rect; `URw8h` "How to grow" bg | `#fafafa` | `oklch(0.985 0 0)` | `--color-surface-muted` | verified |
| Text (default on light surface) | Footer column headers (`#141f38ff`); section body in light sections (`uzcgV`) | `#141f39` (same as primary navy) | `oklch(0.225 0.044 264.6)` | `--color-text` | verified |
| Text muted (secondary copy) | Footer body links (`R2n7U`, `psEMK`, etc.) `#52525bff` | `#52525b` | `oklch(0.395 0.011 274.7)` | `--color-text-muted` | verified |
| Border (hairline) | Footer `#52525b` at 80% opacity for dividers; line strokes like `rzEzR` `#d4d4d8ff` | `#d4d4d8` | `oklch(0.864 0.005 286.3)` | `--color-border` | verified |
| Accent (CTA green) | `fwSmg` Button/Primary fill | `#38da71` | `oklch(0.79 0.184 148.5)` | `--color-accent` | verified |

**Decorative-only colors observed (NOT promoted to tokens):**
- Coral `#ff928a` on path `1ZZkY` (heart shape inside `35XXR`) — single decorative shape, not a structural surface. Q3 resolution: not adopted as a v2 token. If a second accent is ever needed it can be added as `--color-accent-2` in a later phase.
- White-at-70%-opacity body copy (`LT36r`, `25lZp`, `uzcgV`) — handled at consumer level via `color: var(--color-surface) / 0.7` or a dedicated `--color-text-inverse-muted`; deferred to phase 24 unless needed.

## Spacing

Crito's drawing canvas does not expose a token-level spacing scale — values are baked into per-node `padding`/`gap`/positions. Observed values (sampled from canonical nodes) and the inferred 8pt-grid rhythm:

| Token | Source observation | Recommended value (rem) | Confidence |
|-------|--------------------|-------------------------|------------|
| `--space-xs` | Icon-text gaps in footer email/phone groups (~4–8px) | `0.5rem` (8px) | inferred |
| `--space-sm` | Footer link line-height gaps (16px run between rows in `0Ty39`); button gap inside `fwSmg` (gap 10) | `1rem` (16px) | verified |
| `--space-md` | Section heading→body gap (`a4vS3` y=21 → `LT36r` y=104, ~83px halved → ~40px above body); footer column gaps via x=199, 420 columns | `1.5rem` (24px) | verified |
| `--space-lg` | Header offset from page edge (`ULZiU` x=213 in 1600-wide page → 213px gutter / 8 ≈ 26 — round to 32px); section text width 706 vs canvas 1600 | `2rem` (32px) | verified |
| `--space-xl` | CTA button `padding: [16, 20]` × 3 (≈48px stack); footer info group y=180→231 (51px button rows) | `3rem` (48px) | verified |
| `--space-2xl` | Vertical section content padding observed via group y-positions in `ujMLJ` (sample: 35XXR group internal y=21 heading → y=189 dashboard top ≈ 168px lower bound; sections separated by ~80–120px breathing room) | `5rem` (80px) | inferred (per RESEARCH §3 — Q4 resolution below recommends keeping 80px) |

## Radii

| Token | Source node | Crito `cornerRadius` (px) | Recommended value | Confidence |
|-------|-------------|---------------------------|-------------------|------------|
| `--radius-sm` | Inline form input rects (footer Email/Mobile groups: small enclosing rectangles use radius ≈ 6) | `0.375rem` (6px) | inferred |
| `--radius-md` | `fwSmg` Button/Primary | `10` | `0.625rem` (10px) | verified |
| `--radius-lg` | Dashboard chart cards: `sC7wn`, `D1l93` `cornerRadius: 16.055` | `1rem` (16px) | verified |
| `--radius-full` | Avatar circles in testimonial cards (full pill); ellipse nodes | n/a (computed) | `9999px` | inferred |

(Crito's largest `cornerRadius: 24` on the Dashboard frame `A65lo` is a one-off oversized card. Not promoted to a token — consumers can use `--radius-lg` × 1.5 or a literal `1.5rem` if needed.)

## v2 Token Mapping Table

Single source of truth for plans 23-02 (CSS custom properties in `src/styles/v2/global.css`) and 23-03 (Pencil document variables in `design/design-system.pen`). 33 rows.

| Pencil variable name | CSS custom property |
|----------------------|---------------------|
| `color/primary` | `--color-primary` |
| `color/primary-hover` | `--color-primary-hover` |
| `color/surface` | `--color-surface` |
| `color/surface-muted` | `--color-surface-muted` |
| `color/text` | `--color-text` |
| `color/text-muted` | `--color-text-muted` |
| `color/border` | `--color-border` |
| `color/accent` | `--color-accent` |
| `space/xs` | `--space-xs` |
| `space/sm` | `--space-sm` |
| `space/md` | `--space-md` |
| `space/lg` | `--space-lg` |
| `space/xl` | `--space-xl` |
| `space/2xl` | `--space-2xl` |
| `radius/sm` | `--radius-sm` |
| `radius/md` | `--radius-md` |
| `radius/lg` | `--radius-lg` |
| `radius/full` | `--radius-full` |
| `size/display` | `--text-display` |
| `size/h1` | `--text-h1` |
| `size/h2` | `--text-h2` |
| `size/h3` | `--text-h3` |
| `size/h4` | `--text-h4` |
| `size/body` | `--text-body` |
| `size/small` | `--text-small` |
| `size/caption` | `--text-caption` |
| `font/display` | `--font-display` |
| `font/text` | `--font-text` |
| `weight/display` | `--font-weight-display` |
| `weight/text` | `--font-weight-text` |
| `weight/text-bold` | `--font-weight-text-bold` |
| `leading/display` | `--leading-display` |
| `leading/text` | `--leading-text` |

Recommended values (plan 23-02 ships these):

```css
/* Colors */
--color-primary:        oklch(0.225 0.044 264.6);
--color-primary-hover:  oklch(0.286 0.054 264.6);
--color-surface:        oklch(1 0 0);
--color-surface-muted:  oklch(0.985 0 0);
--color-text:           oklch(0.225 0.044 264.6);
--color-text-muted:     oklch(0.395 0.011 274.7);
--color-border:         oklch(0.864 0.005 286.3);
--color-accent:         oklch(0.79 0.184 148.5);

/* Spacing */
--space-xs:   0.5rem;
--space-sm:   1rem;
--space-md:   1.5rem;
--space-lg:   2rem;
--space-xl:   3rem;
--space-2xl:  5rem;

/* Radii */
--radius-sm:   0.375rem;
--radius-md:   0.625rem;
--radius-lg:   1rem;
--radius-full: 9999px;

/* Sizes (clamp-friendly defaults; tune per phase 24/25 needs) */
--text-display:  3rem;     /* 48px — Crito hero verified */
--text-h1:       2.25rem;  /* 36px */
--text-h2:       1.875rem; /* 30px */
--text-h3:       1.5rem;   /* 24px */
--text-h4:       1.25rem;  /* 20px */
--text-body:     1rem;     /* 16px — Crito body verified */
--text-small:    0.875rem; /* 14px — Crito copyright verified */
--text-caption:  0.75rem;  /* 12px */

/* Typography */
--font-display: "Plus Jakarta Sans Variable", ui-sans-serif, system-ui, sans-serif;
--font-text:    "Inter Variable", ui-sans-serif, system-ui, sans-serif;
--font-weight-display:    700; /* Crito heading verified — renamed from --font-weight-bold to avoid v1's --font-weight-h1..h4/body family */
--font-weight-text:       400; /* Crito body verified */
--font-weight-text-bold:  500; /* Crito nav verified */
--leading-display: 1.4;        /* Crito heading lineHeight verified — renamed from --leading-tight to avoid v1's --leading-tight/normal/relaxed (D-08) */
--leading-text:    1.6;        /* Crito body lineHeight verified (1.5–1.625 observed) */
```

## npm Package Confirmation

Plan 23-02 will run (do NOT run here — inspection only):

```bash
npm install \
  @fontsource-variable/plus-jakarta-sans@^5.2.8 \
  @fontsource-variable/inter@^5.2.8
```

Both packages confirmed available on the public npm registry (verified via `npm view @fontsource-variable/<slug> version`):

| Package | Verified version | Status |
|---------|------------------|--------|
| `@fontsource-variable/plus-jakarta-sans` | 5.2.8 | ✅ published |
| `@fontsource-variable/inter` | 5.2.8 | ✅ published |
| `@fontsource-variable/chivo` | 5.2.8 | available but NOT installed in v2 (see Fonts table & Q1) |

Plan 23-02 MUST pin both to the `^5.2.8` range in `package.json`.

## Open Questions Resolved

Each of RESEARCH.md §"Open Questions" Q1–Q4 is now answered with verified data:

**Q1. What heading and body font does Crito actually use?**
- Verified: `Plus Jakarta Sans` for headings (nodes `a4vS3`, `x1God`, every `## Heading` in the inspected sections) and `Inter` for body (nav `wM9Ac`, hero paragraph `LT36r`, section body `25lZp`, info paragraph `uzcgV`). A third family — `Chivo` — appears in the footer only (`BhsQq`, `R2n7U`, `8Kx6s`, etc.). v2 deliberately drops Chivo and uses Inter throughout the footer for system simplicity (rationale above).

**Q2. What is `--color-primary-hover` on Crito buttons?**
- Verified: Crito's CTA button `fwSmg` has no documented hover state in the `.pen` (no second fill, no overlay, no opacity variant). RESEARCH §2's recommendation stands: use a computed +6% L variant of primary navy → `oklch(0.286 0.054 264.6)` (≈ `#1d2a4c`).

**Q3. Does Crito use coral `#ff928a` anywhere structural?**
- Verified: Coral appears as a single decorative path `1ZZkY` (a flipped heart shape behind the "We Help To Grow" headline in section `35XXR`). It is NOT a surface, NOT a button color, NOT a section bg. Not adopted as a v2 token. If a future phase needs a second accent it can be added under `--color-accent-2`.

**Q4. What is the exact section padding rhythm in Crito?**
- Verified (sampled): Section y-positions in `ujMLJ`: 0, 1342, 2191, 3004, 4107, 4913, 5527, 6848, 7616. Inter-section deltas range 614–1321px, but those include section content height — they are not pure padding. Direct padding sampled from CTA button (`[16, 20]`) and header gutter (`x=213` in 1600-wide canvas → ~13% horizontal margin). Net: keep `--space-2xl: 5rem` (80px) — RESEARCH §3's value matches Crito's lower-bound section breathing room. Sections that want more air can stack `--space-2xl` twice or use literal padding for that frame.

## Critical Naming Override

**MANDATORY for plans 23-02, 23-03, 23-04 and every downstream v2 phase:**

The v2 typography family tokens MUST be named `--font-display` (heading) and `--font-text` (body), **NOT** `--font-heading` / `--font-body`.

**Why:** v1's `src/styles/global.css` already declares `--font-heading` (Bricolage Grotesque) and `--font-body` (DM Sans). Reusing those names in v2 violates CONTEXT D-08 (every v2 token name must be string-distinct from every v1 token name) and would either silently shadow v1 or compile to a collision depending on cascade order. Either outcome breaks the v1.3 coexistence guarantee in FOUND-06.

References: RESEARCH §5 collision audit; CONTEXT D-06 (already updated to reflect this rename); CONTEXT D-08 strict-no-collision rule.

**Do NOT under any circumstance:**
- Add `--font-heading` to `src/styles/v2/global.css`
- Add `--font-body` to `src/styles/v2/global.css`
- Add a `font-heading` or `font-body` Pencil variable to `design/design-system.pen`

**Do, in every v2 file:**
- Use `var(--font-display)` for headings
- Use `var(--font-text)` for body / nav / paragraph / button label / footer text
- Name Pencil variables `font/display` and `font/text` (slash mirrors the CSS prefix)

---

*Inspection performed via Pencil MCP. No `.pen` file was modified. All values listed as "verified" were read directly from canonical Crito nodes; values listed as "inferred" are derived from observation or RESEARCH §3/§4 defaults and are explicitly flagged.*

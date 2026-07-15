# Phase 33 — Figma Extraction Artifact

**Extracted:** 2026-07-14
**Source file:** Figma `1tg8wIPcvOVC5tPZ8pkGO2` "Joel Shinness Solutions — Brand Exploration"
**Method:** figma-desktop MCP `get_variable_defs` (palette, text styles) + claude.ai Figma MCP `get_design_context`/`get_metadata` (breakpoint sizes) + `download_assets` (waveform SVG)

This artifact is the execution contract for plans 33-02..33-06. No downstream task may use a
design value that does not trace to a row in this file.

---

## Palette Token Mapping

| Figma variable name | CSS custom property | Light hex | Dark hex | Dark source |
|---|---|---|---|---|
| `--ink` | `--color-wl-ink` | `#12333B` | `#EAF6F3` | figma-var |
| `--sub` | `--color-wl-sub` | `#35525A` | `#A9C9C7` | figma-var |
| `--accent` | `--color-wl-accent` | `#0E7078` | `#4FB3B8` | figma-var |
| `--accent-soft` | `--color-wl-accent-soft` | `#5AA9A5` | `#7FC4C0` | figma-var |
| `--sea-glass` | `--color-wl-sea-glass` | `#E6F1F1` | `#123640` | figma-var |
| `--sea-glass-deep` (no var binding observed; palette sheet node 4:25) | `--color-wl-sea-glass-deep` | `#D2E7E7` | keep light (see FIDELITY-GAPS) | keep-light |
| `--paper` | `--color-wl-paper` | `#F6FBFA` | `#0C2228` | figma-var |
| `--line` | `--color-wl-line` | `#0E707829` (= `#0E7078` @ 16%) | `#5AA9A538` (= `#5AA9A5` @ 22%) | figma-var |

**Provenance notes:**
- Light values for ink/sub/accent/accent-soft/sea-glass/line extracted from Figma variables consumed by Components page `36:5`, Showcase `12:3`, and light Landing frame `13:2`. All match the fixed palette documented on the Overview page (`0:1`, swatch nodes `4:9`–`4:31`) and PROJECT.md exactly.
- Dark values extracted from Figma variables resolved in dark-mode context on frame `117:103` ("Landing / Desktop · 1440 · Dark") — **Figma has a dark variable mode**; no mockup fill-sampling was needed for any dark value except sea-glass-deep (which has no evidence anywhere, see FIDELITY-GAPS).
- `--paper` light `#F6FBFA`: variable exists (dark mode observed as `#0C2228`), light binding not directly returned by variable queries, but the light value is documented on the palette sheet (node `4:28`) AND observed as the literal section background fill (`bg-[#f6fbfa]`) in light mockup sections (Who `22:572`/`22:311`/`22:50`). Figma-traced, not invented.
- **Bonus variable (not in the 8-token contract):** `--on-ink` = `#EAF6F3` in BOTH modes (figma-var). This is the text-on-dark/on-accent color. Note dark-mode `--ink` equals `--on-ink` (`#EAF6F3`).

## FIDELITY-GAPS

- Token `--wl-sea-glass-deep`: no dark value found in Figma (not in the dark variable mode resolved on `117:103`, not observed in the dark mockup, and not bound as a variable in any inspected light frame — light value comes from the palette spec sheet node `4:25`). Keeping light value `#D2E7E7` in dark mode per D-04. Needs Figma review.

---

## Type Ramp

Canonical style definitions from Components page `36:5` text styles (= the 1440 values). Breakpoint
sizes observed on Landing frames: 390 (`22:524`), 768 (`22:263`), 1440 (`13:2`), 1920 (`22:2`).
Sizes in px. "not specced" = no instance of the style observed at that width; do NOT interpolate.

| Figma style name | .wl-class | font-family | size@390 | size@768 | size@1440 | size@1920 | weight | line-height | letter-spacing | italic | opsz |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Display / Hero | `wl-display-hero` | `--font-wl-heading` | 42 | 46 | 76 | 76 | 400 | 1.06 | -1.5 (style def; mockup instances render no explicit tracking) | n | auto |
| Heading / H1 Interior | `wl-heading-h1-interior` | `--font-wl-heading` | not specced | not specced | 61 | not specced | 400 | 1.06 | -1.5 | n | auto |
| Heading / H2 | `wl-heading-h2` | `--font-wl-heading` | 32 | 34 | 50 | 50 | 400 | 1.06 | -1.5 | n | auto |
| Heading / H3 | `wl-heading-h3` | `--font-wl-heading` | 18 | 18 | 21 | 21 | 400 | 1.2 | -1.5 | n | auto |
| Text / Lead | `wl-text-lead` | `--font-wl-body` | 18 | 18 | 21 | 21 | 400 | 1.6 | 0 | n | — |
| Text / Body Large | `wl-text-body-large` | `--font-wl-body` | 17 | 17 | 17 | 17 | 400 | 1.6 | 0 | n | — |
| **Text / Body** ← D-08 base body style (`@layer base body`) | `wl-text-body` | `--font-wl-body` | 16 | 16 | 16 | 16 | 400 | 1.6 | 0 | n | — |
| Text / Small | `wl-text-small` | `--font-wl-body` | not specced | not specced | 15 | not specced | 400 | 1.5 | 1 | n | — |
| Text / Note | `wl-text-note` | `--font-wl-body` | not specced | not specced | 13 | not specced | 400 | 1.5 | 0 | n | — |
| Label / Eyebrow | `wl-label-eyebrow` | `--font-wl-body` | 13 | 13 | 13 | 13 | 600 | 1 | 22% (renders as 2.86px at 13px) | n | — |
| Label / Button | `wl-label-button` | `--font-wl-body` | 16 | 16 | 16 | 16 | 600 | 1.3 | 0 | n | — |
| Accent / Outcome | `wl-accent-outcome` | `--font-wl-heading` | 16 | 16 | 16 | 16 | 400 | 1.25 | 0 | y | — |
| Accent / Kicker | `wl-accent-kicker` | `--font-wl-heading` | not specced | not specced | 20 | not specced | 400 | 1.3 | 0 | y | — |

**Observation evidence for the scaling styles:**
- Display / Hero: `22:553` (390 → 42px), `22:292` (768 → 46px), `13:31` (1440 → 76px via style def + node height 81 = 76×1.06), `22:31` (1920 → height 81 = 76px)
- Heading / H2: `22:577` (390 → 32px), `22:316` (768 → 34px), `22:55` (1920 → 50px), 1440 = style def 50
- Heading / H3 (service-card titles): `22:616` (390 → 18px), `22:355` (768 → height 22 = 18×1.2), `14:46` (1440 → height 26 = 21×1.2), `22:2` Make card titles height 26 (1920 → 21)
- Text / Lead: `22:579` (390 → 18px), `22:318` (768 → 18px), `22:57` (1920 → 21px), 1440 = style def 21
- Constant styles observed at mobile: Body Large 17 (`22:585`), Body 16 (`22:618`), Eyebrow 13/2.86px (`22:575`), Outcome italic 16 (`22:614`), Button 16 (geometry: `22:565` text height 21 = 16×1.3)

**Fraunces variation axes (from mockup renders):** display/heading/accent styles render with
`font-variation-settings: "SOFT" 0, "WONK" 1` — carry this into the `.wl-*` heading utilities.

**Not-specced styles rationale:** H1 Interior appears only on desktop-only interior mockups
(`85:103`, `85:104`); Small/Note/Kicker were not observed in any Landing breakpoint frame
(likely used on Showcase/interior pages, which are desktop-specced only in Figma).

---

## Waveform Mark SVG

Source: page `2:3` "B · Waveform mark", node `4:80` "Mark master — B" (104×104), exported via
`download_assets` as SVG. Output was clean — **no manual Copy-as-SVG needed** (D-16 MCP path).

viewBox: `0 0 104 104`

```svg
<path d="M14 36C30 24 46 44 62 34C74 27 84 38 90 32" stroke="#0E7078" stroke-opacity="0.45" stroke-width="5" stroke-linecap="round"/>
<path d="M10 54C28 40 48 64 68 52C80 44 90 56 96 50" stroke="#0E7078" stroke-width="6" stroke-linecap="round"/>
<path d="M14 72C30 62 48 80 64 70C76 63 86 72 90 68" stroke="#0E7078" stroke-opacity="0.65" stroke-width="5" stroke-linecap="round"/>
```

Notes:
- The export includes a `<rect width="104" height="104" fill="#F5F5F5"/>` frame background — this is the master-frame fill, NOT part of the mark. Exclude it from `WaveMark.astro` and favicon.
- Stroke color is the accent (`#0E7078` = `--wl-accent`); for the token-bound component use `currentColor`/`var(--color-wl-accent)` with per-stroke opacities 0.45 / 1.0 / 0.65 and widths 5 / 6 / 5, `stroke-linecap="round"` (D-13).
- Real-size reference frames on page `2:3`: 128px (`4:101`), 64px (`4:106`), 32px dark (`4:111`), 32px light (`4:116`), 16px favicon (`4:121`).

## OG Tagline

> On your wavelength.

Verbatim from Figma (OG frame text node `5:47`; also Overview page node `4:6` "Tagline candidate…"
and footer tagline node `68:616`). Punctuation included — ends with a period.

## OG Frame Check

**A 1200×630 OG frame EXISTS in Figma: node `5:41` "06 · OG image — 1200×630" on page `2:3`.**

Contents: Mark master — B (100×100 at x=550,y=116), "Joel Shinness Solutions" wordmark
(Fraunces, node `5:46`), tagline "On your wavelength." (node `5:47`), "joelshinness.com"
(node `5:48`).

**Consequence for 33-06 / D-15:** the "compose from brand elements" contingency does NOT apply —
export/reproduce frame `5:41` directly as the 1200×630 PNG. Joel's approval gate before wiring
into SEO.astro still applies.

---

## Bonus Observed Tokens (non-contractual — for later phases)

| Token | Value | Source |
|---|---|---|
| `--radius-card` | 18 | figma-var (36:5, 12:3) |
| `--radius-pill` | 999 | figma-var (36:5, 12:3) |
| `--space-sm` | 12 | figma-var (36:5) |
| Shadow / Card | drop-shadow `0 20px 40px -30px #12333B80` | figma effect style |
| Shadow / CTA | drop-shadow `0 12px 28px -14px #12333BBF` | figma effect style |
| Make section bg gradient | `#EFF7F6 → #E6F1F1` (top→bottom) | mockup fill `22:598` |
| Footer bg (light mockup) | `#0D2A31` with detached text colors `#EAF6F3`/`#7FA4A2`/`#CDE6E5`/`#8FB4B2`, 14px links | mockup `22:759` (footer is Phase 34 scope) |
| Tag pill (AI card) | Hanken Bold ~12px equiv (9.6px at mobile), tracking 9%, `#0E7078` | mockup `62:154` (component detail, Phase 35 scope) |

# Phase 34 — Figma Extraction: Site Header + Site Footer

**Extracted:** 2026-07-15 via figma-desktop MCP (`get_design_context`, `get_variable_defs`, `get_screenshot`)
**File:** `1tg8wIPcvOVC5tPZ8pkGO2` "Joel Shinness Solutions — Brand Exploration"
**Nodes:** Header desktop `42:29`, header mobile `42:47`, footer desktop `42:77`, footer mobile `42:104`, dark header instance `117:104` (in dark Landing `117:103`), dark footer instance `117:278`

This file resolves the FIGMA-GAP items (FG-01…FG-12) flagged in `34-UI-SPEC.md`. All values below are extracted, not estimated.

---

## Component descriptions (authored in Figma — binding guidance)

- **Site Header (`42:50`):** "Sticky site header. Mobile hides Services/About and shrinks the wordmark. Brand lockup is baked (glyph + Fraunces text). CTA is a nested CTA Button (Small)."
  - → **Sticky is designer-specified.** Header scroll behavior discretion is resolved: `position: sticky; top: 0`.
  - → Figma mobile *shrinks* the wordmark (15px); the user-approved deviation (CONTEXT D-02) drops it entirely at mobile in favor of mark-only. D-02 wins; note in screenshot-gate approval.
- **CTA Button (`39:31`):** "Solid = primary (shadow), Ghost = secondary on light, Ghost on dark = agencies strip, Small = header nav. **Radius 13/10 intentionally local (not a token).**"
- **Site Footer (`42:105`):** "Site footer on deep-ink (**#0D2A31 — deliberately not a token; matches mockup CSS**). **Muted link tints are local values.**"
  - → Confirms RESEARCH open question 1: `#0D2A31` is a detached local fill by design. Muted footer text colors are also local values, not variables. Implementation may still centralize them as CSS custom properties for maintainability, but they are NOT part of the 8-token palette and do NOT flip with theme (footer is always-dark).

## Figma variables used by chrome (light-mode values)

| Figma variable | Value (light) | Existing code token |
|---|---|---|
| `--sea-glass` | `#E6F1F1` | `--wl-sea-glass` |
| `--accent` | `#0E7078` | `--wl-accent` |
| `--ink` | `#12333B` | `--wl-ink` |
| `--on-ink` | `#EAF6F3` | **⚠ NOT in Phase 33 token set** — new token needed (e.g. `--wl-on-ink`). Used for CTA label on ink, footer wordmark. |

Dark values come from the Figma variable modes already extracted in Phase 33 (`global.css` `.dark` block). Chrome uses the same variable names; no per-component dark overrides except the always-dark footer (local values, no flip).

---

## Site Header — Desktop (`42:29`, 1440×64)

- **Container:** height `64px`, width full (1440 frame), horizontal padding `160px` (page gutter at 1440), `display:flex; align-items:center; justify-content:space-between`, background `var(--sea-glass)`, border-bottom `1px solid var(--accent)` (full accent, NOT the 16% `--wl-line` tint), content clipped.
- **Brand lockup** (left, gap `10px`, items centered):
  - Waveform mark: `30×30` box (bare wave strokes in accent — use existing `WaveMark.astro`)
  - Wordmark: "Joel Shinness Solutions" — Fraunces Regular `18.4px`, `line-height: normal`, color `var(--ink)`, `font-variation-settings: "SOFT" 0, "WONK" 1`, no wrap
- **Nav** (right, gap `26px`, items centered):
  - Links "Services", "Showcase", "About" — Hanken Grotesk Medium `15px`, `line-height: normal`, color `var(--ink)`, no wrap
  - **CTA Button (Small variant `39:30`):** "Book a call" — background `var(--ink)`, padding `17px` horizontal / `9px` vertical, border-radius `10px` (intentionally local, not a token), label Hanken Grotesk SemiBold `14px`, color `var(--on-ink)` `#EAF6F3`

## Site Header — Mobile (`42:47`, 390×64)

- **Container:** height `64px`, horizontal padding `20px`, same bg/border as desktop.
- **Brand lockup:** same 30px mark + wordmark at `15px` (Figma shrinks it; **CONTEXT D-02 overrides: mark only, wordmark hidden** — approved deviation).
- **Nav:** gap `18px`; only "Showcase" link (15px Hanken Medium) + CTA Button Small (identical specs to desktop). Services/About hidden per Figma.

## Site Header — Dark mode (instance `117:104` in `117:103`)

- Same structure and variable names; values flip via dark variable mode (Phase 33 `.dark` block): background = dark sea-glass value, text = dark ink value (light).
- **CTA inverts via tokens:** bg `var(--ink)` (light value in dark mode), label rendered `#12333B`-on-light in the dark mockup — i.e. the token flip handles it; verify rendered CTA in dark = light button with dark text.
- **Mark on dark:** rendered inside a light circular badge (different asset treatment than bare strokes on light). Flag: WaveMark needs a "circled" presentation for dark header if fidelity gate demands it — confirm against screenshot at gate time.

---

## Site Footer — Desktop (`42:77`, 1440×261) — ALWAYS DARK (both themes)

- **Container:** width full, padding top `45px` / bottom `29px` / horizontal `160px`, background `#0D2A31` (local, not a token, no theme flip), column flex.
- **Top row** (`justify-content: space-between`):
  - **Left column** (vertical, gap `8px`):
    - Brand lockup: gap `10px` — mark `30×30` (light circle badge treatment) + wordmark "Joel Shinness Solutions" Fraunces Regular `18.4px` color `var(--on-ink)` `#EAF6F3`, SOFT 0 / WONK 1
    - Tagline: "On your wavelength." — Fraunces **Italic** `17px`, line-height `1.6`, color `#5AA9A5` (= accent-soft; rendered on #0D2A31 so the Phase 33 paper-only `-text` caveat doesn't apply — verify contrast on dark: 4.0:1-ish, check)
    - Supporting line (two rendered lines, line-height `1.6`): "Solutions for small businesses — web, automations," / "and AI that save you time and money." — Hanken Grotesk Regular `14px`, color `#7FA4A2` (local muted tint)
  - **Right: foot-links** (horizontal, gap `22px`): "Services", "Showcase", "About", "Book a call", "Email" — Hanken Grotesk Regular `14px`, color `#CDE6E5` (local muted tint)
- **Spacer** `27px`, then **divider**: full-width `1px` rule, `rgba(255,255,255,0.09)`, then spacer `24px`
- **Bottom row** (`justify-content: space-between`, Hanken Grotesk Regular `14px`):
  - Left: "© 2026 Joel Shinness" — color `#8FB4B2` (CONTEXT D-10: year is dynamic `{currentYear}`)
  - Right: "contact@joelshinness.com · GitHub" — color `#CDE6E5` (email is a mailto link; GitHub is a text link; interpunct `·` separator)

## Site Footer — Mobile (`42:104`, 390×279)

- Same content and colors; horizontal padding `24px`, same `45/29px` vertical padding.
- Top row stacks (`flex-direction: column`) — left column then foot-links row below (links row keeps 22px gap, wraps under brand block).
- Divider + bottom row identical; bottom row items sit on one line (may wrap naturally at 390).

## Footer color inventory (all LOCAL values — no theme flip)

| Use | Hex |
|---|---|
| Footer background | `#0D2A31` |
| Wordmark / brightest text | `#EAF6F3` (= `--on-ink` variable) |
| Tagline (Fraunces italic) | `#5AA9A5` |
| Supporting line | `#7FA4A2` |
| Nav links + email/GitHub row | `#CDE6E5` |
| Copyright | `#8FB4B2` |
| Divider | `rgba(255,255,255,0.09)` |

Recommendation (implementation freedom): define these as `--wl-footer-*` custom properties in one place (outside the theme-flip blocks) rather than scattering hex literals — the Figma description explicitly blesses them as local values, so this is a code-organization choice, not a fidelity question.

---

## Resolved discretion items

1. **Header scroll behavior:** sticky (Figma component description — designer-specified).
2. **CTA radius 10px + padding 17/9:** hardcode locally; Figma says intentionally not a token.
3. **Footer bg + muted tints:** local values by design; centralizing as CSS custom properties is fine.
4. **New token needed:** `--on-ink` `#EAF6F3` participates in the variable system (used on both header CTA and footer wordmark). Add as `--wl-on-ink` with its dark-mode value from the Figma variable modes (check `get_variable_defs` dark mode during implementation; light value `#EAF6F3`).

## Remaining flags for the screenshot gate

- Mark-only mobile wordmark (approved deviation from Figma's 15px shrink — CONTEXT D-02)
- No theme toggle anywhere (matches Figma; amends CHROME-01 per CONTEXT D-05)
- Dev-only Blog link absent from these frames (correct — prod chrome matches Figma exactly)
- Dark-header mark circle-badge treatment — compare rendered vs `117:104` screenshot at gate

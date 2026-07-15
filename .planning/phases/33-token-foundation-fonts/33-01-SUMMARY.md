---
phase: 33-token-foundation-fonts
plan: 01
status: complete
requirements: [FOUND-01, FOUND-02, FOUND-05]
key-files:
  created:
    - .planning/phases/33-token-foundation-fonts/33-FIGMA-EXTRACTION.md
  modified: []
commits:
  - "docs(33-01): extract Figma palette, type ramp, waveform SVG, OG artifacts"
---

# Plan 33-01 Summary — Figma Extraction

**One-liner:** All Figma-sourced values (8-token palette light+dark, 13-style type ramp with breakpoint steps, waveform SVG geometry, OG tagline + existing OG frame) extracted into the committed `33-FIGMA-EXTRACTION.md` contract.

## What was extracted, and from where

- **Palette (light):** Figma variables via figma-desktop MCP `get_variable_defs` on nodes `36:5`, `13:2`, `12:3`. All 8 values match PROJECT.md exactly. `--paper`/`--sea-glass-deep` light values corroborated by the palette spec sheet (page `0:1`) and mockup section fills.
- **Palette (dark):** **Figma HAS a dark variable mode** — the dark Landing frame `117:103` resolved a full dark set (`figma-var` source for 7 of 8 tokens). No mockup color-sampling was needed.
- **Type ramp:** 13 canonical style defs from `36:5`; per-breakpoint sizes observed on the four Landing frames via targeted `get_design_context`/`get_metadata` probes. Scaling styles: Display 42/46/76/76, H2 32/34/50/50, H3 18/18/21/21, Lead 18/18/21/21. Constant: Body Large 17, Body 16 (D-08 base body), Eyebrow 13, Button 16, Outcome 16. Not specced at non-1440 widths: H1-Interior 61, Small 15, Note 13, Kicker 20. Fraunces renders with `"SOFT" 0, "WONK" 1`.
- **Waveform SVG:** `download_assets` (svg) on Mark master `4:80` returned clean geometry — 3 stroked wave paths, viewBox 0 0 104 104. **MCP path succeeded; no manual Copy-as-SVG needed** (D-16).
- **OG:** Tagline "On your wavelength." verbatim (node `5:47`). **Surprise finding: a 1200×630 OG frame already exists in Figma (node `5:41`)** — 33-06 should export/reproduce it rather than composing from scratch (D-15 composition contingency not needed; approval gate still applies).

## FIDELITY-GAPS raised

1. `--wl-sea-glass-deep` has no dark-mode evidence anywhere in Figma → ships light value `#D2E7E7` in dark mode, flagged for Joel's Figma review (D-04).

## Deviations

- figma-desktop MCP `get_design_context` timed out (2× 300s) — switched to the claude.ai Figma MCP for design-context/metadata reads. Variable extraction stayed on figma-desktop MCP.
- All three tasks write the same artifact and were executed in one inline pass (main session, Figma MCP required), so the plan is committed as a single atomic commit rather than three.
- Bonus non-contractual observations recorded for later phases (radius/spacing/shadow vars, Make gradient, footer detached palette, `--on-ink` variable).

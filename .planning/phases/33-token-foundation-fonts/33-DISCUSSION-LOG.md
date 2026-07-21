# Phase 33: Token Foundation + Fonts - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-14
**Phase:** 33-token-foundation-fonts
**Areas discussed:** Dark theme tokens, Type ramp delivery, Contrast failure policy, Brand asset pipeline

---

## Dark theme tokens

### Q1: How should the --wl-* tokens flip between light and dark themes?

| Option | Description | Selected |
|--------|-------------|----------|
| Semantic flip (Recommended) | One token set; values redefined under `.dark`; components use each token once | ✓ |
| Suffixed pairs (v1 pattern) | Separate `-dark` tokens; `dark:` variants on every element | |
| You decide | Claude picks during planning | |

**User's choice:** Semantic flip

### Q2: How should the tokens be named?

| Option | Description | Selected |
|--------|-------------|----------|
| Figma palette names (Recommended) | `--wl-ink`, `--wl-sub`, `--wl-accent`, `--wl-accent-soft`, `--wl-sea-glass`, `--wl-sea-glass-deep`, `--wl-paper`, `--wl-line` — 1:1 with Figma | ✓ |
| Semantic role names | `--wl-text-primary`, `--wl-bg`, etc. with a mapping layer | |
| Both layers | Palette tokens + semantic aliases | |

**User's choice:** Figma palette names

### Q3: Where should the dark theme values come from?

| Option | Description | Selected |
|--------|-------------|----------|
| Figma vars, mockup fallback (Recommended) | Check Figma variables/modes first; extract from dark Landing mockup 117:103 if absent | ✓ |
| Mockup extraction only | Pull straight from the 117:103 frame | |
| Flag and pause | Joel confirms every dark value before tokens are written | |

**User's choice:** Figma vars, mockup fallback

### Q4: What happens when a token has no dark-mode evidence anywhere in Figma?

| Option | Description | Selected |
|--------|-------------|----------|
| Flag, ship light value (Recommended) | Light value ships in dark mode; gap goes on FIDELITY-GAPS list | ✓ |
| Flag and block | Phase can't complete until Joel supplies the value | |
| Derive by rule | Documented transformation — but invents values | |

**User's choice:** Flag, ship light value

---

## Type ramp delivery

### Q1: How should the 13 Figma type styles be delivered as code?

| Option | Description | Selected |
|--------|-------------|----------|
| Composite utilities (Recommended) | One class per Figma style bundling family/size/weight/leading/tracking/italic | ✓ |
| Tailwind @theme sizes | Sizes as `--text-*` tokens, composed per use | |
| You decide | Claude picks during planning | |

**User's choice:** Composite utilities

### Q2: How should the 13 utility classes be named?

| Option | Description | Selected |
|--------|-------------|----------|
| Mirror Figma names (Recommended) | Kebab-cased exact Figma style names with `wl-` prefix | ✓ |
| Semantic/HTML names | `.wl-heading-1` style naming with mapping table | |
| You decide | Claude picks after extracting actual style names | |

**User's choice:** Mirror Figma names

### Q3: How should the type ramp handle the four breakpoints?

| Option | Description | Selected |
|--------|-------------|----------|
| Breakpoints baked in (Recommended) | Media-query steps per utility from the 390/768/1440/1920 mockups | ✓ |
| Fluid clamp() | Interpolated sizes — invented intermediate values | |
| Desktop-only now | 1440 values only; responsive steps in page phases | |

**User's choice:** Breakpoints baked in

### Q4: Should base HTML elements get type-ramp defaults?

| Option | Description | Selected |
|--------|-------------|----------|
| Body default + explicit (Recommended) | `body` gets Hanken Grotesk base style; everything else explicit `.wl-*` classes | ✓ |
| Full element defaults | h1–h6/p mapped in @layer base — leaks into un-migrated pages | |
| Utilities only | No defaults at all | |

**User's choice:** Body default + explicit

---

## Contrast failure policy

### Q1: When a Figma-specced pair fails WCAG AA, what's the remedy?

| Option | Description | Selected |
|--------|-------------|----------|
| Companion -text tokens (Recommended) | Darker companion for text use; original stays decorative; flagged | ✓ |
| Flag and wait | Failures block until Joel adjusts Figma or approves substitutes | |
| Restrict usage | Failing pairs documented as large-text/decorative only | |

**User's choice:** Companion -text tokens

### Q2: What form should the contrast check take?

| Option | Description | Selected |
|--------|-------------|----------|
| Committed script (Recommended) | Re-runnable `scripts/check-contrast.mjs` asserting AA on the pair matrix | ✓ |
| One-time documented check | CONTRAST.md table, computed once | |
| Script + CI gate | Same script wired into GitHub Actions | |

**User's choice:** Committed script

### Q3: Which token pairs does the check cover?

| Option | Description | Selected |
|--------|-------------|----------|
| Mockup-observed pairs (Recommended) | Every text/bg combo actually in the mockups/Components page, both themes | ✓ |
| All combinations | Full 8×8 in both themes — noisy | |
| Text pairs + UI 3:1 | Adds non-text UI elements at 3:1 per WCAG 1.4.11 | |

**User's choice:** Mockup-observed pairs

### Q4: Do companion -text tokens need visual approval before use?

| Option | Description | Selected |
|--------|-------------|----------|
| Report, no approval gate (Recommended) | Minimal same-hue darkening; before/after + ratios reported for async review | ✓ |
| Swatch approval gate | Phase pauses on rendered swatches for approval | |
| Fold into fidelity gate | Judged implicitly at Phase 37/38 screenshot comparisons | |

**User's choice:** Report, no approval gate

---

## Brand asset pipeline

### Q1: How should the waveform logo mark exist in the codebase?

| Option | Description | Selected |
|--------|-------------|----------|
| Inline SVG component (Recommended) | `WaveMark.astro` with strokes bound to currentColor/--wl-* tokens | ✓ |
| Static SVG files | public/ files via <img>; needs duplicate light/dark exports | |
| You decide | Claude picks during planning | |

**User's choice:** Inline SVG component

### Q2: How far should the favicon set go?

| Option | Description | Selected |
|--------|-------------|----------|
| Replace in place (Recommended) | Swap favicon.svg + favicon.ico; SVG gets prefers-color-scheme query | ✓ |
| Full modern set | + apple-touch-icon + manifest icons | |
| You decide | Claude picks during planning | |

**User's choice:** Replace in place

### Q3: If no dedicated OG-image frame exists in Figma, what happens?

| Option | Description | Selected |
|--------|-------------|----------|
| Compose from brand, show me (Recommended) | 1200×630 PNG from Figma-sourced elements only; Joel approves before wiring | ✓ |
| Flag and keep placeholder | Keep og-image.svg until an OG frame exists in Figma | |
| I'll design it in Figma | Joel adds a 1200×630 frame; phase extracts it | |

**User's choice:** Compose from brand, show me

### Q4: How should the waveform SVG paths get out of Figma?

| Option | Description | Selected |
|--------|-------------|----------|
| MCP first, manual fallback (Recommended) | Figma MCP extraction; manual Copy-as-SVG from Figma desktop if unclean | ✓ |
| Manual export only | Joel exports and drops in repo | |
| Recreate from geometry | Re-author paths in code from MCP-read geometry | |

**User's choice:** MCP first, manual fallback

---

## Claude's Discretion

- Google Fonts removal timing / coexistence during migration
- Fraunces preload strategy and opsz handling at display sizes
- lighthouserc.json mechanics for the expanded URL set
- Contrast-ratio math implementation for the check script
- Where the FIDELITY-GAPS list lives

## Deferred Ideas

None — discussion stayed within phase scope.

---
phase: 34-baselayout-chrome
plan: 06
type: fidelity-review
status: awaiting-approval
captured: 2026-07-15
---

# Phase 34 Fidelity Gate Review

> Figma-frame vs. rendered-screenshot comparison for SiteHeader + SiteFooter.
> This document must receive Joel's sign-off before Phase 34 is marked done.
> (v1.4 milestone discipline — every UI phase ends with an approved fidelity comparison.)

**Figma file:** `1tg8wIPcvOVC5tPZ8pkGO2`
**Render method:** Production build (`npm run build && npm run preview`) captured via Playwright at exact viewport widths.
**Screenshot directory:** `.planning/phases/34-baselayout-chrome/screenshots/`

---

## Comparison Table

### Row 1 — SiteHeader Desktop, Light Mode

| Field | Value |
|-------|-------|
| Figma node | `42:29` (1440×64) |
| Viewport | 1440px |
| Color scheme | Light |
| Rendered screenshot | `screenshots/header-desktop-1440-light.png` |

**Observations:**
- Background `--wl-sea-glass` (`#E6F1F1`) renders correctly as pale teal.
- Bottom border: 1px solid `--wl-accent` (`#0E7078`) visible as a teal rule.
- Brand lockup (left): WaveMark 30×30 + "Joel Shinness Solutions" in Fraunces Regular at the extracted size; `gap-[10px]` visually confirmed.
- Nav links (right): "Services", "Showcase", "About" in Hanken Grotesk Medium 15px; gap `26px` between items.
- CTA "Book a call": ink-dark background (`#12333B`), light text (`#EAF6F3`), `border-radius: 10px`, Hanken Grotesk SemiBold 14px.
- Desktop `px-[160px]` gutter applied; content stays within frame.

---

### Row 2 — SiteHeader Mobile, Light Mode

| Field | Value |
|-------|-------|
| Figma node | `42:47` (390×64) |
| Viewport | 390px |
| Color scheme | Light |
| Rendered screenshot | `screenshots/header-mobile-390-light.png` |

**Observations:**
- Mark-only brand lockup (left): wordmark hidden below 640px breakpoint — **approved deviation D-02** applied.
- Nav (right): "Showcase" link + "Book a call" CTA only; gap `18px` between items.
- Services and About links correctly absent from mobile header.
- Height 64px preserved at mobile.
- Mobile `px-5` (20px) gutter applied.

---

### Row 3 — SiteHeader Desktop, Dark Mode

| Field | Value |
|-------|-------|
| Figma node | `117:104` (dark header instance in dark Landing `117:103`) |
| Viewport | 1440px |
| Color scheme | Dark (`prefers-color-scheme: dark` via Playwright `colorScheme`) |
| Rendered screenshot | `screenshots/header-desktop-1440-dark.png` |

**Observations:**
- Background flips to dark `--wl-sea-glass` (`#123640`) — deep teal; renders correctly.
- Wordmark and nav links render in `--wl-ink` (dark mode value `#EAF6F3`) — light text on dark bg.
- CTA button: background = `--wl-ink` dark value (`#EAF6F3`), text = `--wl-on-ink` light value (`#12333B`) — token inversion produces a light button with dark text in dark mode. This is consistent with the Figma extraction note: "CTA inverts via tokens."
- WaveMark renders as bare wave strokes against the dark bg (accent color flips to `#4FB3B8`).

**Gate checklist item — DARK HEADER WAVEMARK (requires Joel's decision):**
The Figma dark header instance `117:104` (dark Landing `117:103`) renders the WaveMark inside a **light circular badge**. The current implementation renders bare wave strokes only (no circular badge).

Questions for Joel:
1. Does the WaveMark need a light circular badge container on the dark header to match Figma's `117:104`? If yes, a new `WaveMarkCircle` variant would be needed (architectural — Rule 4).
2. Is the bare-stroke WaveMark on the dark header acceptable as a simplification?

---

### Row 4 — SiteFooter Desktop, Light Mode (renders always-dark)

| Field | Value |
|-------|-------|
| Figma node | `42:77` (1440×261) |
| Viewport | 1440px |
| Color scheme | Light (footer renders identically — always dark, no theme flip) |
| Rendered screenshot | `screenshots/footer-desktop-1440-light.png` |

**Observations:**
- Background `#0D2A31` via `--wl-footer-bg` — deep ink green, correct.
- Brand lockup (left): WaveMark bare strokes + "Joel Shinness Solutions" in Fraunces `18.4px`, `#EAF6F3` (`--wl-on-ink`). Lockup gap `10px`.
- Tagline "On your wavelength." in Fraunces Italic `17px`, `#5AA9A5` — renders in accent-soft italic. ✓
- Supporting line: "Solutions for small businesses — web, automations, and AI that save you time and money." Hanken Grotesk Regular 14px, `#7FA4A2`. ✓
- Foot-links (right): "Services", "Showcase", "About", "Book a call", "Email" — Hanken Grotesk 14px, `#CDE6E5`, `gap-[22px]`. ✓
- Divider: full-width `rgba(255,255,255,0.09)` `1px` rule visible as very subtle separator.
- Bottom row: "contact@joelshinness.com · GitHub" (left) + "© 2026 Joel Shinness" (right). Both `#CDE6E5` / `#8FB4B2` respectively.
- Padding: `45px` top, `29px` bottom, `160px` horizontal at desktop.
- Rendered height: ~249px. Figma specifies 261px. Delta: ~12px. This is within normal rendering variance (line-height and wrapping differences). Flagged for Joel's review.

**Gate checklist item — FOOTER WAVEMARK CIRCLE-BADGE:**
Figma node `42:77` footer brand lockup shows the WaveMark inside a **light circular badge** (matching the dark header treatment). The current implementation renders bare wave strokes. This is the same question as the dark header — does the footer mark need the circle-badge variant?

---

### Row 5 — SiteFooter Desktop, Dark Mode (footer always-dark; visually identical)

| Field | Value |
|-------|-------|
| Figma node | `42:77` (dark; footer does not flip) |
| Viewport | 1440px |
| Color scheme | Dark |
| Rendered screenshot | `screenshots/footer-desktop-1440-dark.png` |

**Observations:**
- Visually identical to Row 4 (footer is always-dark — no `.dark` class effect). ✓
- Confirms the always-dark footer contract is correctly implemented (no token flip on footer).

---

## Approved Deviations

These deviations from the Figma design are **pre-approved** per `34-CONTEXT.md` decisions and do not require Joel's re-approval here — they are listed for the record only.

### D-02 — Mobile wordmark hidden (mark-only at < 640px)

- **What Figma specifies:** Wordmark "Joel Shinness Solutions" shrinks to `15px` at 390px mobile.
- **What is implemented:** Wordmark is hidden entirely below 640px; WaveMark mark only is shown.
- **Why approved:** At 390px the 18.4px wordmark + 30px mark + 20px padding creates visible overflow. User-approved deviation in 34-CONTEXT.md.
- **D-reference:** D-02

### D-05 — No theme toggle anywhere

- **What Figma specifies:** Figma never included a theme toggle in the chrome.
- **What is implemented:** No theme toggle. Dark mode via `prefers-color-scheme` only.
- **Why this MATCHES Figma:** D-05 clarifies that no toggle was ever in the design. This is not a deviation from Figma — it confirms the implementation matches Figma exactly.
- **D-reference:** D-05

---

## Gate Checklist (requires Joel's input)

### Item GC-01 — Dark header WaveMark circle-badge

**Question:** Figma dark header instance `117:104` renders the WaveMark inside a light circular badge container (different from the bare-stroke mark used in the light header). The rendered dark header uses bare strokes (same asset as light mode, just color-flipped via tokens).

- [ ] **Option A (strict fidelity):** Implement a circle-badge variant of WaveMark for dark header and dark footer. Requires a new component / asset variant (architectural deviation — Rule 4).
- [ ] **Option B (simplification accepted):** Bare-stroke WaveMark on dark surfaces is acceptable. The circle-badge is a Figma detail we are consciously omitting.

**Confirm also:** Does the rendered dark `--wl-on-ink` value (`#12333B` — dark text on light CTA) match Joel's expectation? The token inversion (light button, dark text in dark mode) is the intended behavior per Figma extraction.

### Item GC-02 — Footer WaveMark circle-badge

**Question:** Figma footer brand lockup (node `42:77`) also uses the circle-badge mark treatment. Same resolution as GC-01 applies — circle-badge or bare strokes accepted?

**Note:** The footer circle-badge would be on the always-dark `#0D2A31` background (same aesthetic context as the dark header). The decision can be the same for both GC-01 and GC-02.

### Item GC-03 — Footer rendered height delta

**Question:** Footer renders at ~249px vs. Figma spec of 261px (node `42:77`: 1440×261). Delta: ~12px. Likely attributable to line-height / wrapping differences in Hanken Grotesk at 14px vs. the variable font Figma uses. Is this acceptable, or should padding/spacing be adjusted to match exactly?

---

## Sign-Off

**Joel's decision on GC-01 (dark header WaveMark):**
> _[Pending]_

**Joel's decision on GC-02 (footer WaveMark):**
> _[Pending]_

**Joel's decision on GC-03 (footer height delta):**
> _[Pending]_

**Joel's fidelity approval:**
> _[Pending — type "approved" to close the gate, or describe deltas to fix]_

---

_Captured 2026-07-15 by plan executor (34-06 Task 1). Screenshots in `.planning/phases/34-baselayout-chrome/screenshots/`._

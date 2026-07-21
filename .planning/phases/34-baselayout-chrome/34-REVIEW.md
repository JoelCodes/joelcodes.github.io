---
phase: 34-baselayout-chrome
plan: 06
type: fidelity-review
status: APPROVED
captured: 2026-07-15
approved: 2026-07-15
gate-verdict: APPROVED by Joel (2026-07-15)
---

# Phase 34 Fidelity Gate Review

> Figma-frame vs. rendered-screenshot comparison for SiteHeader + SiteFooter.
> **GATE STATUS: APPROVED by Joel (2026-07-15).** Phase 34 may close.
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
- Brand lockup (left): bare-stroke WaveMark 30×30 (accent color) + "Joel Shinness Solutions" in Fraunces Regular at the extracted size; `gap-[10px]` visually confirmed.
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

**Observations (post-fix):**
- Background flips to dark `--wl-sea-glass` (`#123640`) — deep teal; renders correctly.
- Wordmark and nav links render in `--wl-ink` (dark mode value `#EAF6F3`) — light text on dark bg.
- CTA button: background = `--wl-ink` dark value (`#EAF6F3`), text = `--wl-on-ink` light value (`#12333B`) — token inversion produces a light button with dark text in dark mode. Confirmed matching Figma extraction note.
- **WaveMark: circle-badge presentation active** — light `#EAF6F3` disc with `#12333B` ink wave strokes. Matches Figma 117:104 treatment. Implemented via `badge` prop toggle via CSS `dark:hidden` / `hidden dark:block` — zero client JS.

**GC-01 RESOLVED:** Circle-badge fix applied (commit 71b9929). Gate item closed.

---

### Row 4 — SiteFooter Desktop, Light Mode (renders always-dark)

| Field | Value |
|-------|-------|
| Figma node | `42:77` (1440×261) |
| Viewport | 1440px |
| Color scheme | Light (footer renders identically — always dark, no theme flip) |
| Rendered screenshot | `screenshots/footer-desktop-1440-light.png` |

**Observations (post-fix):**
- Background `#0D2A31` via `--wl-footer-bg` — deep ink green, correct.
- Brand lockup (left): **circle-badge WaveMark** (light `#EAF6F3` disc, `#12333B` ink strokes) + "Joel Shinness Solutions" in Fraunces `18.4px`, `#EAF6F3` (`--wl-on-ink`). Matches Figma `42:77` treatment. Lockup gap `10px`.
- Tagline "On your wavelength." in Fraunces Italic `17px`, `#5AA9A5` — renders in accent-soft italic. ✓
- Supporting line: "Solutions for small businesses — web, automations, and AI that save you time and money." Hanken Grotesk Regular 14px, `#7FA4A2`. ✓
- Foot-links (right): "Services", "Showcase", "About", "Book a call", "Email" — Hanken Grotesk 14px, `#CDE6E5`, `gap-[22px]`. ✓
- Divider: full-width `rgba(255,255,255,0.09)` `1px` rule visible as very subtle separator.
- **Bottom row (post-fix):** `© 2026 Joel Shinness` on LEFT, `contact@joelshinness.com · GitHub` on RIGHT — matches Figma node `42:74`. ✓
- Padding: `45px` top, `29px` bottom, `160px` horizontal at desktop.
- Rendered height: ~249px. Figma specifies 261px. Delta: ~12px. **ACCEPTED deviation — see GC-03 below.**

**GC-02 RESOLVED:** Circle-badge fix applied (commit 71b9929). Gate item closed.
**Footer bottom-row RESOLVED:** Order swapped to match Figma 42:74 (commit 71b9929).

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

These deviations from the Figma design are approved. Pre-approved deviations (D-02, D-05) were confirmed by Joel at the fidelity gate checkpoint.

### D-02 — Mobile wordmark hidden (mark-only at < 640px)

- **What Figma specifies:** Wordmark "Joel Shinness Solutions" shrinks to `15px` at 390px mobile.
- **What is implemented:** Wordmark is hidden entirely below 640px; WaveMark mark only is shown.
- **Why approved:** At 390px the 18.4px wordmark + 30px mark + 20px padding creates visible overflow. User-approved deviation in 34-CONTEXT.md. Reconfirmed by Joel at gate checkpoint.
- **D-reference:** D-02

### D-05 — No theme toggle anywhere

- **What Figma specifies:** Figma never included a theme toggle in the chrome.
- **What is implemented:** No theme toggle. Dark mode via `prefers-color-scheme` only.
- **Why this MATCHES Figma:** D-05 clarifies that no toggle was ever in the design. This is not a deviation from Figma — it confirms the implementation matches Figma exactly. Reconfirmed by Joel at gate checkpoint.
- **D-reference:** D-05

### GC-03 — Footer rendered height delta (~249px vs. 261px Figma spec)

- **What Figma specifies:** Footer height 261px (node `42:77`: 1440×261).
- **What is rendered:** ~249px (~12px shorter).
- **Why accepted:** Delta attributable to line-height and text wrapping differences between Hanken Grotesk variable font rendering in browser vs. Figma's internal font engine. No padding/spacing adjustment required. **Accepted as-is per Joel's gate approval (2026-07-15).**
- **D-reference:** GC-03 (accepted gate deviation)

---

## Gate Checklist — Resolved

### Item GC-01 — Dark header WaveMark circle-badge — RESOLVED

**Resolution:** Implemented circle-badge variant via `badge` prop on `WaveMark.astro`. In `SiteHeader.astro`, bare-stroke mark is hidden in dark mode (`dark:hidden`) and badge mark is shown (`hidden dark:block`). Zero client JS — CSS-only via Tailwind dark: variant. Commit 71b9929.

### Item GC-02 — Footer WaveMark circle-badge — RESOLVED

**Resolution:** Same `badge` prop used in `SiteFooter.astro` always (footer is always-dark). Circle-badge with `#EAF6F3` fill and `#12333B` wave strokes matches Figma 42:77. Commit 71b9929.

### Item GC-03 — Footer rendered height delta — ACCEPTED

**Resolution:** Accepted as-is per Joel's approval. Documented as GC-03 approved deviation above.

---

## Sign-Off

**Joel's decision on GC-01 (dark header WaveMark):**
> APPROVED FIX — circle-badge mark on dark surfaces (2026-07-15). Implemented and verified.

**Joel's decision on GC-02 (footer WaveMark):**
> APPROVED FIX — circle-badge mark on dark surfaces, including footer (2026-07-15). Implemented and verified.

**Joel's decision on GC-03 (footer height delta):**
> ACCEPTED as-is — record as approved deviation, no code change (2026-07-15).

**Joel's fidelity approval:**
> **Approve with selected fixes** — GC-01/GC-02 circle-badge and footer bottom-row swap applied and re-verified. Gate APPROVED. Phase 34 may close.

---

_Captured 2026-07-15 by plan executor (34-06 Task 1). Updated 2026-07-15 after fidelity gate fixes (34-06 continuation). Screenshots in `.planning/phases/34-baselayout-chrome/screenshots/`._

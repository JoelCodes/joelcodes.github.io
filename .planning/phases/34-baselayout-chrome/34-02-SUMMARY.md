---
phase: 34
plan: 02
subsystem: design-tokens
tags: [css, tokens, typography, wcag, dark-mode, footer, chrome]
requires:
  - "33-05: WL type ramp and --wl-accent-soft-text companion token"
provides:
  - "--color-wl-on-ink token (light + dark, theme-flipping)"
  - "6 always-dark footer-local CSS custom properties (--wl-footer-*)"
  - "6 chrome-scoped .wl-* type utilities"
  - "scroll-margin-top updated to 64px for new header height"
affects:
  - "34-03: SiteHeader + SiteFooter components consume these tokens + utilities"
  - "35+: All chrome-consuming phases depend on these utilities being present"
tech-stack:
  added: []
  patterns:
    - ":root block outside @theme/@layer for always-dark footer locals"
    - "chrome-scoped @layer utilities following Phase 33 commenting pattern"
key-files:
  created: []
  modified:
    - "src/styles/global.css"
decisions:
  - id: "D-dark-on-ink"
    decision: "--color-wl-on-ink dark value is #12333B (ink), not #EAF6F3"
    rationale: "In dark mode --wl-ink flips to #EAF6F3 (light); CTA button bg becomes light; label must be dark. FIGMA-EXTRACTION.md confirms: 'label rendered #12333B-on-light in the dark mockup — token flip handles it.'"
    flag: "Confirm at fidelity gate against Figma dark variable mode for node 42:27"
metrics:
  duration: "3 minutes"
  completed: "2026-07-15"
---

# Phase 34 Plan 02: Chrome Token + Utility Foundation Summary

**One-liner:** Added `--wl-on-ink` semantic token (light `#EAF6F3` / dark `#12333B`), six always-dark `--wl-footer-*` local tokens in a non-flipping `:root` block, six chrome-scoped `.wl-*` type utilities at exact Figma sizes/weights, and updated `scroll-margin-top` to 64px.

---

## Tasks Completed

| Task | Name | Commit | Key Changes |
|------|------|--------|-------------|
| 1 | Add --wl-on-ink token and always-dark footer-local color tokens | `7775b1f` | `--color-wl-on-ink` in `@theme` + `.dark`; 6 `--wl-footer-*` in standalone `:root` |
| 2 | Add six chrome-scoped .wl-* type utilities and update scroll-margin-top | `96b79fa` | `.wl-wordmark`, `.wl-nav-link`, `.wl-cta-label`, `.wl-footer-tagline`, `.wl-footer-body`, `.wl-footer-link`; 60px→64px scroll offset |
| 3 | Verify footer-tint contrast | (no file change) | All 5 pairs pass AA — ratios recorded below |

---

## Decisions Made

### --wl-on-ink dark value: #12333B

**Question:** What is the correct dark-mode value for `--color-wl-on-ink`?

**Decision:** `#12333B` (dark ink color).

**Rationale:** In dark mode, `--color-wl-ink` flips to `#EAF6F3` (light). The CTA button background uses `var(--color-wl-ink)`, which means the button is now light in dark mode. The `--wl-on-ink` token is text ON the ink background — so it must be dark too. `34-FIGMA-EXTRACTION.md` confirms: "CTA inverts via tokens: bg var(--ink) (light value in dark mode), label rendered #12333B-on-light in the dark mockup."

**Flag:** Confirm against `get_variable_defs` dark mode output at fidelity gate. The comment in global.css records this assumption.

### Footer-local tokens use :root, not @theme

**Decision:** Footer-local tokens (`--wl-footer-*`) are placed in a plain `:root {}` block outside both the `@theme` block and the `.dark {}` block.

**Rationale:** The footer is always-dark (never flips with theme). Placing tokens in `@theme` would expose them to Tailwind's token system unnecessarily. Placing them in `.dark` would invert them. A standalone `:root` makes them static constants — visible to all elements, never overridden.

---

## Footer Contrast Report (Task 3)

All five footer text colors on `#0D2A31` computed via `scripts/check-contrast.mjs` `contrastRatio()`:

| Color | Token | Hex | Ratio | AA (4.5:1)? |
|-------|-------|-----|-------|-------------|
| Wordmark / primary | `--wl-on-ink` value | `#EAF6F3` | **13.63:1** | PASS |
| Nav links | `--wl-footer-text-link` | `#CDE6E5` | **11.52:1** | PASS |
| Tagline (Fraunces italic) | `--wl-footer-tagline-color` | `#5AA9A5` | **5.50:1** | PASS |
| Supporting line | `--wl-footer-text-secondary` | `#7FA4A2` | **5.55:1** | PASS |
| Copyright / muted | `--wl-footer-text-muted` | `#8FB4B2` | **6.71:1** | PASS |

**Gate result: PASS — all pairs exceed WCAG AA 4.5:1.**

Note: The UI-SPEC estimated the `#8FB4B2` copyright pair as "BORDERLINE ~3.2:1" — this was a significant underestimate. The actual ratio is 6.71:1, comfortably passing. No Figma-locked hex values were altered.

---

## Verification

- `npm run build` exits 0 (confirmed on both commits)
- `--color-wl-on-ink` present in both `@theme` (line 34) and `.dark` (line 57): count = 2
- Six `.wl-*` chrome utilities present: `.wl-wordmark`, `.wl-nav-link`, `.wl-cta-label`, `.wl-footer-tagline`, `.wl-footer-body`, `.wl-footer-link` (count = 6)
- `scroll-margin-top: 64px` confirmed; `60px` returns 0 matches
- All `--wl-footer-*` tokens in standalone `:root` block (lines 65–72), outside `@theme` and `.dark`
- No old neobrutalist tokens modified in the diff

---

## Deviations from Plan

None — plan executed exactly as written.

The dark mode value for `--color-wl-on-ink` was not explicitly specified in the plan ("verify from Figma dark variable mode"). The FIGMA-EXTRACTION.md evidence was sufficient to determine `#12333B` with confidence. This is documented as an assumption for gate confirmation, per the plan's own instruction to "record 'dark --wl-on-ink assumed; confirm at fidelity gate' in the summary."

---

## Next Phase Readiness

**Plan 34-03** (SiteHeader + SiteFooter components) can now consume:
- `var(--color-wl-on-ink)` — CTA label color, footer wordmark color
- `var(--wl-footer-bg)`, `var(--wl-footer-tagline-color)`, etc. — all footer-local tokens
- `.wl-wordmark`, `.wl-nav-link`, `.wl-cta-label`, `.wl-footer-tagline`, `.wl-footer-body`, `.wl-footer-link` — all chrome type utilities
- `section[id]` anchor offset is 64px — matches new header height

No blockers for Plan 34-03.

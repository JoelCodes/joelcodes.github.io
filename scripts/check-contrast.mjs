/**
 * WCAG AA Contrast Gate — Phase 33-03
 *
 * Re-runnable ESM script that verifies WCAG 2.x AA contrast ratios over the
 * --wl-* token pair matrix. Exits 0 when all TEXT-use pairs pass; exits 1 on
 * any TEXT-use FAIL. Decorative/large-text pairs are reported but do NOT
 * contribute to the exit code (D-09: companion tokens handle text-use only).
 *
 * Run:  node scripts/check-contrast.mjs
 * Test: node --test scripts/check-contrast.test.mjs
 *
 * DO NOT wire this script into CI or package.json test scripts (D-10).
 * Re-run manually whenever token values in src/styles/global.css change.
 *
 * Formula source: https://www.w3.org/TR/WCAG21/#relative-luminance
 * Zero runtime dependencies — inline W3C formula only (node:url is stdlib).
 */

import { pathToFileURL } from 'node:url';

// ── Pure formula functions (exported for tests) ──────────────────────────────

/**
 * Parse a 6-character hex colour string (with or without leading #) to {r,g,b}.
 * @param {string} hex  e.g. '#5AA9A5' or '5AA9A5'
 * @returns {{ r: number, g: number, b: number }}
 */
export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

/**
 * Convert an 8-bit sRGB channel value (0–255) to a linear-light value.
 * W3C formula: if sRGB <= 0.04045 → sRGB/12.92 else ((sRGB+0.055)/1.055)^2.4
 * @param {number} channel  Integer 0–255
 * @returns {number}  Linear value 0–1
 */
export function linearize(channel) {
  const srgb = channel / 255;
  return srgb <= 0.04045 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
}

/**
 * Compute the W3C relative luminance of a hex colour.
 * L = 0.2126 R + 0.7152 G + 0.0722 B  (linear-light channels)
 * @param {string} hex  e.g. '#F6FBFA'
 * @returns {number}  0 (black) … 1 (white)
 */
export function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/**
 * Compute the WCAG contrast ratio between two hex colours.
 * ratio = (L_lighter + 0.05) / (L_darker + 0.05)
 * Order-independent; returns a value in [1, 21].
 * UNROUNDED (WR-07): rounding here let borderline failures pass the gate
 * (e.g. a true 4.4951 rounds to 4.50 >= 4.5). Threshold comparisons use the
 * exact value; callers round for DISPLAY only.
 * @param {string} hex1
 * @param {string} hex2
 * @returns {number}  Exact ratio (not rounded)
 */
export function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ── Palette constants (from 33-FIGMA-EXTRACTION.md) ─────────────────────────
//
// Light theme — Figma variables extracted 2026-07-14 from file 1tg8wIPcvOVC5tPZ8pkGO2
const L_INK              = '#12333B';  // --color-wl-ink         (body text, headings)
const L_SUB              = '#35525A';  // --color-wl-sub         (secondary text)
const L_ACCENT           = '#0E7078';  // --color-wl-accent      (CTAs, links)
const L_ACCENT_SOFT      = '#5AA9A5';  // --color-wl-accent-soft (decorative only — fails 3:1 on paper, see below)
const L_SEA_GLASS        = '#E6F1F1';  // --color-wl-sea-glass   (section bg)
const L_SEA_GLASS_DEEP   = '#D2E7E7';  // --color-wl-sea-glass-deep (nested card bg)
const L_PAPER            = '#F6FBFA';  // --color-wl-paper       (page bg — dominant surface)

// Dark theme — Figma dark variable mode, resolved on frame 117:103 (2026-07-14)
const D_INK              = '#EAF6F3';  // --color-wl-ink (dark)
const D_SUB              = '#A9C9C7';  // --color-wl-sub (dark)
const D_ACCENT           = '#4FB3B8';  // --color-wl-accent (dark)
const D_ACCENT_SOFT      = '#7FC4C0';  // --color-wl-accent-soft (dark; decorative)
const D_SEA_GLASS        = '#123640';  // --color-wl-sea-glass (dark)
const D_PAPER            = '#0C2228';  // --color-wl-paper (dark)

// ── Companion tokens (REFACTOR — D-09 minimal same-hue darkening) ────────────
//
// --wl-accent-soft-text (light): minimally darkened accent-soft (#5AA9A5) at
// the same OKLCH hue until contrastRatio(companion, L_PAPER) >= 4.5:1.
//
// Derivation: sequential same-hue darkening (OKLCH h≈186°, C held, L reduced):
//   #5AA9A5 on #F6FBFA → 2.63:1  FAIL (even fails 3:1 large-text threshold)
//   #36807D on #F6FBFA → 4.43:1  FAIL
//   #357F7C on #F6FBFA → 4.49:1  FAIL
//   #347E7B on #F6FBFA → 4.55:1  PASS  ← chosen (minimum darkening to clear 4.5:1)
//
// Before: #5AA9A5 → 2.63:1  (FAIL — original accent-soft, decorative use only)
// After:  #347E7B → 4.55:1  (PASS — companion for text use; minimum darkening)
//
// ⚠ PAPER-ONLY RESTRICTION (WR-02): --wl-accent-soft-text is validated for
// --wl-paper backgrounds ONLY. It FAILS WCAG AA on sea-glass (4.12:1) and
// sea-glass-deep (3.7:1). The mockups use accent-soft text exclusively on
// paper (D-09/D-12: minimal same-hue darkening for the pairs actually used).
// Do NOT place companion-token text on sea-glass surfaces without further
// darkening + re-running this gate. Informational rows below document this.
const L_ACCENT_SOFT_TEXT = '#347E7B';  // --color-wl-accent-soft-text (light) — PAPER ONLY

// --wl-accent-soft-text (dark): dark accent-soft #7FC4C0 on dark paper #0C2228
// #7FC4C0 on #0C2228 → 8.28:1  PASS  (dark theme naturally high contrast)
const D_ACCENT_SOFT_TEXT = '#7FC4C0';  // --color-wl-accent-soft-text (dark) = same as D_ACCENT_SOFT

// ── Phase 35 additions — on-ink / on-dark surfaces ──────────────────────────
//
// CTAButton solid/small: on-ink text pairs (--wl-on-ink is #EAF6F3 light / #12333B dark)
// L_ON_INK: text on ink bg in light mode (same hex as D_INK)
// D_ON_INK: text on ink bg in dark mode (same hex as L_INK) — tokens flip
const L_ON_INK = '#EAF6F3';  // --color-wl-on-ink light value (text on ink bg, light theme)
const D_ON_INK = '#12333B';  // --color-wl-on-ink dark value (text on ink bg, dark theme)
// Ghost-on-dark, Eyebrow on-dark: non-flippable literals (D-10), extracted from
// Figma component variants 39:27 / 39:40 + dark mockup 117:103 (2026-07-15 fresh MCP session)
const ONDARK_LABEL   = '#EAF6F3';            // ghost-on-dark label literal (39:27)
const ONDARK_EYEBROW = '#5AA9A5';            // eyebrow on-dark text/dash literal (39:40)
const ONDARK_SURFACE = '#12333B';            // always-dark ink strip surface
const ONDARK_FOCUS   = '#4FB3B8';            // ghost-on-dark focus ring literal (non-flippable, D-10 — CR-01 fix)
const ONDARK_BORDER_EFFECTIVE = '#657A80';   // rgba(255,255,255,0.35) composited over #12333B
// White-card components (Callout 99:26, LinkCard 99:29, ServiceCard 40:32) — light mode
const CARD_WHITE     = '#FFFFFF';            // card fill literal (light)
const CARD_DARK      = '#12333B';            // card panel fill in dark mockup (117:159)
const TAG_FILL_LIGHT = '#ECF4F4';            // accent @8% composited over white (39:44)
const BREADCRUMB     = '#4C6A70';            // breadcrumb literal light (designer-confirmed non-token, 100:14)
const BREADCRUMB_DARK = '#A9C9C7';           // breadcrumb dark-mode flip (--wl-breadcrumb-color .dark value)
                                             // #4C6A70 on #0C2228 = 2.82:1 FAIL -- dark flip required (Rule 1 fix)
// CTAButton ghost hover (--wl-cta-ghost-bg-hover, CR-02 fix) — effective composited surfaces:
const GHOST_HOVER_LIGHT_EFF  = '#FBFDFD';    // rgba(255,255,255,0.6) over light paper #F6FBFA
const GHOST_HOVER_DARK_EFF   = '#33454A';    // rgba(255,255,255,0.16) over dark paper #0C2228
const ONDARK_HOVER_EFF       = '#25434B';    // rgba(255,255,255,0.08) over ink strip #12333B (ghost-on-dark hover)
// const ONDARK_BG = '#12333B';  // ink surface (always-dark, non-flippable)
// Tag fill + text: FLAGGED-GAP (requires Figma 36:5 Tag node inspection)
// const L_TAG_FILL = '#XXXXXX'; // FLAGGED-GAP: Tag fill color from 36:5
// const L_TAG_TEXT = '#XXXXXX'; // FLAGGED-GAP: Tag text color from 36:5
// Callout fill + text: FLAGGED-GAP (requires Figma 36:5 Callout node inspection)
// const L_CALLOUT_FILL = '#XXXXXX'; // FLAGGED-GAP: Callout fill from 36:5
// const L_CALLOUT_TEXT = '#XXXXXX'; // FLAGGED-GAP: Callout text from 36:5
// ServiceCard default/highlight fill + text: FLAGGED-GAP (requires Figma 36:5 inspection)
// const L_SC_DEFAULT_FILL = '#XXXXXX'; // FLAGGED-GAP: ServiceCard default fill from 36:5
// const L_SC_DEFAULT_TEXT = '#XXXXXX'; // FLAGGED-GAP: ServiceCard default text from 36:5
// const L_SC_HIGHLIGHT_FILL = '#XXXXXX'; // FLAGGED-GAP: ServiceCard highlight fill from 36:5
// const L_SC_HIGHLIGHT_TEXT = '#XXXXXX'; // FLAGGED-GAP: ServiceCard highlight text from 36:5

// ── Pair matrix ─────────────────────────────────────────────────────────────
//
// Format: [foreground, background, label, threshold, textUse]
//   threshold: 4.5 = normal text (AA), 3 = large text (AA large)
//   textUse: true  → pair is a TEXT-USE pair; failure → exit 1
//             false → pair is DECORATIVE/informational; failure logged but NOT exit 1
//
// Covers every mockup-observed text-on-background combination per D-11
// (UI-SPEC pair matrix, both light and dark themes).

export const PAIRS = [
  // ── LIGHT THEME ─────────────────────────────────────────────────────────
  // Body text / headings on page background
  [L_INK,    L_PAPER,     'light: ink on paper (body text)',                         4.5, true],
  [L_SUB,    L_PAPER,     'light: sub on paper (secondary text)',                    4.5, true],
  [L_ACCENT, L_PAPER,     'light: accent on paper (link text)',                      4.5, true],

  // Companion token — accent-soft-TEXT on paper (small body text, text use)
  [L_ACCENT_SOFT_TEXT, L_PAPER, 'light: accent-soft-text on paper (companion, text use)', 4.5, true],

  // Decorative accent-soft on paper — informational only (original token, not text-use)
  // NOTE: #5AA9A5 on #F6FBFA is 2.63:1 — fails even the 3:1 large-text threshold.
  // This row is INFORMATIONAL (textUse: false); accent-soft is for decorative/illustration
  // use only. Any text use MUST use --wl-accent-soft-text companion above.
  [L_ACCENT_SOFT, L_PAPER, 'light: accent-soft on paper [DECORATIVE ONLY — not for text]', 3, false],

  // Companion token on sea-glass surfaces — DOCUMENTED RESTRICTIONS (WR-02).
  // These combinations are NOT approved for use: the companion is derived for
  // paper only (see PAPER-ONLY RESTRICTION note above). Informational rows
  // (textUse: false) so the documented failure is visible on every run without
  // failing the gate — the mockups never place companion text on sea-glass.
  [L_ACCENT_SOFT_TEXT, L_SEA_GLASS,      'light: accent-soft-text on sea-glass [NOT APPROVED — paper-only token]',      4.5, false],
  [L_ACCENT_SOFT_TEXT, L_SEA_GLASS_DEEP, 'light: accent-soft-text on sea-glass-deep [NOT APPROVED — paper-only token]', 4.5, false],

  // Text on sea-glass section backgrounds
  [L_INK,    L_SEA_GLASS, 'light: ink on sea-glass (section bg)',                   4.5, true],
  [L_SUB,    L_SEA_GLASS, 'light: sub on sea-glass (secondary)',                    4.5, true],
  [L_ACCENT, L_SEA_GLASS, 'light: accent on sea-glass (link)',                      4.5, true],

  // Text on sea-glass-deep (card/nested surfaces)
  [L_INK, L_SEA_GLASS_DEEP, 'light: ink on sea-glass-deep (card body)',             4.5, true],

  // ── DARK THEME ──────────────────────────────────────────────────────────
  // Body text / headings on dark page background
  [D_INK,    D_PAPER,     'dark: ink on paper (body text)',                          4.5, true],
  [D_SUB,    D_PAPER,     'dark: sub on paper (secondary text)',                     4.5, true],
  [D_ACCENT, D_PAPER,     'dark: accent on paper (link text)',                       4.5, true],

  // Dark companion token — accent-soft-text on dark paper
  [D_ACCENT_SOFT_TEXT, D_PAPER, 'dark: accent-soft-text on paper (companion, text use)', 4.5, true],

  // Decorative accent-soft on dark paper — informational
  [D_ACCENT_SOFT, D_PAPER, 'dark: accent-soft on paper [DECORATIVE ONLY — not for text]', 3, false],

  // Text on dark sea-glass section background
  [D_INK,    D_SEA_GLASS, 'dark: ink on sea-glass (section bg)',                    4.5, true],
  [D_SUB,    D_SEA_GLASS, 'dark: sub on sea-glass (secondary)',                     4.5, true],
  [D_ACCENT, D_SEA_GLASS, 'dark: accent on sea-glass (link)',                       4.5, true],

  // ── PHASE 35 ADDITIONS ───────────────────────────────────────────────────
  // Source: .planning/phases/35-ui-primitives/35-FIGMA-EXTRACTION.md
  //
  // CTAButton solid/small: on-ink text on ink bg (EXTRACTED — D-02/COMP-01)
  // L_ON_INK (#EAF6F3) on L_INK (#12333B) — light theme: 12.14:1 PASS
  [L_ON_INK, L_INK, 'light: on-ink on ink (CTAButton solid/small label on bg)', 4.5, true],
  // D_ON_INK (#12333B) on D_INK (#EAF6F3) — dark theme: 12.14:1 PASS
  [D_ON_INK, D_INK, 'dark: on-ink on ink (CTAButton solid/small label on bg)',  4.5, true],

  // CTAButton ghost: ink text on ghost bg (--wl-cta-ghost-bg flips for dark mode AA)
  // Light: rgba(255,255,255,0.4) over paper (#F6FBFA) -> effective ~#FAFDFC; ink text = clear PASS
  // Dark: rgba(255,255,255,0.08) over dark paper (#0C2228) -> effective #1F3439; D_INK (#EAF6F3) text
  // Ghost light effective bg approximation: use paper (transparent bg over paper is safe)
  [L_INK, L_PAPER, 'light: ink on paper (CTAButton ghost text on light bg)',    4.5, true],
  // Ghost dark: rgba(255,255,255,0.08) over #0C2228 -- D_INK #EAF6F3 on the composite
  // Exact hex: R=0.08*255+0.92*12=31.44, G=0.08*255+0.92*34=51.68, B=0.08*255+0.92*40=57.2 -> #1F3439
  // Using D_PAPER as conservative proxy: #EAF6F3 on #0C2228 = 14.88:1 >> 4.5:1 PASS
  [D_INK, D_PAPER, 'dark: ink on paper (CTAButton ghost text on dark bg, conservative)',     4.5, true],

  // CTAButton ghost hover (--wl-cta-ghost-bg-hover flips 0.6 light / 0.16 dark — CR-02 fix)
  [L_INK, GHOST_HOVER_LIGHT_EFF, 'light: ink on ghost hover bg (0.6 white over paper)',      4.5, true],
  [D_INK, GHOST_HOVER_DARK_EFF,  'dark: ink on ghost hover bg (0.16 white over dark paper)', 4.5, true],
  // CTAButton ghost-on-dark hover (0.08 white over always-dark ink strip)
  [ONDARK_LABEL, ONDARK_HOVER_EFF, 'non-flippable: ghost-on-dark label on hover bg (0.08 white over ink)', 4.5, true],

  // Eyebrow on-light: accent on paper (already in matrix with "link text" label; confirming Phase 35 pair)
  [L_ACCENT, L_PAPER, 'light: accent on paper (Eyebrow on-light)',              4.5, true],
  [D_ACCENT, D_PAPER, 'dark: accent on paper (Eyebrow on-light, dark flip)',    4.5, true],

  // CTAButton ghost-on-dark + Eyebrow on-dark: non-flippable literals on the
  // always-dark ink strip (D-10; Figma 39:27 / 39:40, verified against 117:103)
  [ONDARK_LABEL,   ONDARK_SURFACE, 'non-flippable: ghost-on-dark label on ink surface (39:27)',        4.5, true],
  [ONDARK_BORDER_EFFECTIVE, ONDARK_SURFACE, 'non-flippable: ghost-on-dark border on ink [DECORATIVE — 1.4.11 boundary]', 3, false],
  [ONDARK_EYEBROW, ONDARK_SURFACE, 'non-flippable: eyebrow on-dark text on ink surface (39:40)',       4.5, true],
  // Focus indicator (non-text): WCAG 1.4.11 requires 3:1. Non-flippable literal —
  // the flippable accent token would resolve to #0E7078 = 2.31:1 in light mode (CR-01).
  [ONDARK_FOCUS,   ONDARK_SURFACE, 'non-flippable: ghost-on-dark focus ring on ink [1.4.11 non-text]', 3,   true],

  // Tag (39:44): sub text on accent@8% fill composited over white card
  [L_SUB, TAG_FILL_LIGHT, 'light: tag text (sub) on tag fill (accent 8% over white)',                  4.5, true],

  // White-card components (Callout 99:26, LinkCard 99:29, ServiceCard 40:32) — light mode
  [L_INK,    CARD_WHITE, 'light: ink on white card (titles)',                                          4.5, true],
  [L_SUB,    CARD_WHITE, 'light: sub on white card (body)',                                            4.5, true],
  [L_ACCENT, CARD_WHITE, 'light: accent on white card (outcome / go-link / kicker)',                   4.5, true],

  // Dark-mode card panel #12333B (dark mockup 117:159) — dark token values on card fill
  [D_INK,    CARD_DARK, 'dark: ink on card panel (titles, 117:159)',                                   4.5, true],
  [D_SUB,    CARD_DARK, 'dark: sub on card panel (body, 117:159)',                                     4.5, true],
  [D_ACCENT, CARD_DARK, 'dark: accent on card panel (outcome / links, 117:159)',                       4.5, true],

  // Breadcrumb literal (100:14, designer-confirmed non-token)
  // Light: #4C6A70 (--wl-breadcrumb-color :root value)
  [BREADCRUMB,      L_PAPER,    'light: breadcrumb #4C6A70 on paper (100:14)',                         4.5, true],
  [BREADCRUMB,      CARD_WHITE, 'light: breadcrumb #4C6A70 on white (100:14)',                         4.5, true],
  // Dark: #A9C9C7 (--wl-breadcrumb-color .dark value -- flip added for dark-mode AA; Rule 1 fix)
  // #4C6A70 on dark paper (#0C2228) = 2.82:1 FAIL -- hence the dark flip to #A9C9C7
  [BREADCRUMB_DARK, D_PAPER,    'dark: breadcrumb #A9C9C7 on dark paper (--wl-breadcrumb-color dark)', 4.5, true],

  // Step numeral (40:39): accent-soft 38px numeral — DECORATIVE by structure
  // (rendered aria-hidden inside <ol>; list semantics carry the step order).
  // 2.63:1 fails even the 3:1 large-text floor — surfaced at the fidelity gate for Joel.
  [L_ACCENT_SOFT, L_PAPER, 'light: step numeral accent-soft on paper [DECORATIVE — aria-hidden, ol semantics; fidelity-gate item]', 3, false],

  // ── PHASE 36 ADDITIONS ───────────────────────────────────────────────────
  // Source: .planning/phases/36-content-components-expandable-cards/36-EXTRACTION.md
  //         Figma nodes 41:45 (ProjectCard closed), 41:95 (expanded), 99:14/99:24 (FAQItem)
  //
  // Card surface: CARD_WHITE (#FFFFFF light) / CARD_DARK (#12333B dark) — confirmed extraction.
  // FAQItem surface: also white card (same token — Figma 99:14 confirmed #FFFFFF, not a
  // divider-list; FIDELITY-GAP resolved in 36-EXTRACTION.md).

  // ProjectCard: title (Fraunces Regular 22px) — ink on card-bg
  [L_INK,    CARD_WHITE, 'light: ProjectCard title ink on card-bg (22px)',                      4.5, true],
  [D_INK,    CARD_DARK,  'dark: ProjectCard title ink on card-bg (22px)',                       4.5, true],

  // ProjectCard: hook/outcome (Fraunces Italic 17px) — ink on card-bg
  // Extraction note: outcome is INK color (not accent) at 17px (not 16px as UI-SPEC assumed)
  [L_INK,    CARD_WHITE, 'light: ProjectCard hook/outcome ink on card-bg (17px italic)',        4.5, true],
  [D_INK,    CARD_DARK,  'dark: ProjectCard hook/outcome ink on card-bg (17px italic)',         4.5, true],

  // ProjectCard: kicker/eyebrow (Hanken Grotesk Bold 12px) — accent on card-bg
  [L_ACCENT, CARD_WHITE, 'light: ProjectCard kicker accent on card-bg (12px bold)',             4.5, true],
  [D_ACCENT, CARD_DARK,  'dark: ProjectCard kicker accent on card-bg (12px bold)',              4.5, true],

  // ProjectCard: toggle label "Read the story"/"Hide" (HG SemiBold 14px) — accent on card-bg
  [L_ACCENT, CARD_WHITE, 'light: ProjectCard toggle label accent on card-bg (14px semibold)',   4.5, true],
  [D_ACCENT, CARD_DARK,  'dark: ProjectCard toggle label accent on card-bg (14px semibold)',    4.5, true],

  // ProjectCard: body summary (HG Regular 16px) — sub on card-bg
  [L_SUB,    CARD_WHITE, 'light: ProjectCard body sub on card-bg (16px)',                       4.5, true],
  [D_SUB,    CARD_DARK,  'dark: ProjectCard body sub on card-bg (16px)',                        4.5, true],

  // ProjectCard: expanded section labels (Fraunces Italic 16px) — accent on card-bg
  [L_ACCENT, CARD_WHITE, 'light: ProjectCard expanded section label accent on card-bg (16px italic)', 4.5, true],
  [D_ACCENT, CARD_DARK,  'dark: ProjectCard expanded section label accent on card-bg (16px italic)',  4.5, true],

  // ProjectCard: expanded body prose (HG Regular 16px) — sub on card-bg (same as summary)
  [L_SUB,    CARD_WHITE, 'light: ProjectCard expanded prose sub on card-bg (16px)',             4.5, true],
  [D_SUB,    CARD_DARK,  'dark: ProjectCard expanded prose sub on card-bg (16px)',              4.5, true],

  // FAQItem: question (Fraunces Regular 18px) — ink on card-bg
  // Extraction: FAQItem is a white card (99:14), not a divider-list row; radius 14px.
  [L_INK,    CARD_WHITE, 'light: FAQItem question ink on card-bg (18px)',                       4.5, true],
  [D_INK,    CARD_DARK,  'dark: FAQItem question ink on card-bg (18px)',                        4.5, true],

  // FAQItem: answer prose (HG Regular 16px) — sub on card-bg
  [L_SUB,    CARD_WHITE, 'light: FAQItem answer sub on card-bg (16px)',                         4.5, true],
  [D_SUB,    CARD_DARK,  'dark: FAQItem answer sub on card-bg (16px)',                          4.5, true],

  // FAQItem: toggle indicator "+" glyph (HG Regular 21px — LARGE TEXT) — accent on card-bg
  // 21px qualifies as large text (WCAG: 18pt+ or 14pt bold+); threshold 3:1.
  [L_ACCENT, CARD_WHITE, 'light: FAQItem toggle "+" accent on card-bg (21px large-text)',       3,   true],
  [D_ACCENT, CARD_DARK,  'dark: FAQItem toggle "+" accent on card-bg (21px large-text)',        3,   true],

  // Thumb block label (Fraunces Italic 16px, #FFFFFF @ opacity 0.85) on gradient bg.
  // Gradient stops: #0E7078 (0%) → #14323B (70%). WCAG measures the RENDERED colour:
  // an element-level `opacity: 0.85` composites the glyphs over the background, so the
  // alpha MUST be flattened before computing the ratio (WR-07 — testing raw #FFFFFF
  // overstated the margin: 5.82:1 instead of the true ≈4.71:1 on the light stop).
  // Composite per channel: c = 0.85*255 + 0.15*bg_c
  //   white @0.85 over #0E7078 → #DBEAEB (≈4.71:1 — passes 4.5:1 by 0.21, not 1.32)
  //   white @0.85 over #14323B → #DCE0E2 (comfortably above 4.5:1)
  // Worst case is the lightest stop (#0E7078); both stops tested.
  // Gradient does not flip in dark mode (thumb design is consistent across themes).
  // If the label opacity or gradient stops ever change, recompute these composites.
  ['#DBEAEB', '#0E7078', 'thumb label: white@0.85 composited, on gradient light stop #0E7078 (worst case)', 4.5, true],
  ['#DCE0E2', '#14323B', 'thumb label: white@0.85 composited, on gradient dark stop #14323B',               4.5, true],

  // ── PHASE 37 ADDITIONS ────────────────────────────────────────────────────
  // Source: .planning/phases/37-landing-page/37-EXTRACTION.md §Contrast-pair additions
  //         .planning/phases/37-landing-page/37-UI-SPEC.md §Contrast Script Extension table
  //
  // Sections 1–6 introduce gradient-surface backgrounds not already in the matrix.
  // Pairs already covered (no new entry needed):
  //   - ink/sub/accent on sea-glass (#E6F1F1 / #123640): covered above (Section 3 Make worst light stop = sea-glass ✓)
  //   - ink/sub on paper (#F6FBFA / #0C2228): covered above (Section 2 Who, 4 How, 6 Proof ✓)
  //   - on-ink Agencies strip (ONDARK_SURFACE #12333B): covered Phase 35 block ✓
  //   - D_INK/D_SUB on dark paper #0C2228: covered above ✓
  //   - L_ACCENT on CARD_WHITE (tag-pill): covered Phase 35 ✓
  //   - L_INK on CARD_WHITE (flow result ink on card): covered Phase 35 ✓
  //   - L_ACCENT on paper (kicker, eyebrow): covered above ✓
  //   - Proof credentials #4C6A70 on paper: same hex as BREADCRUMB on L_PAPER — covered Phase 35 ✓
  //
  // NEW: Hero/Final gradient worst stop #D2E7E7 (sea-glass-deep) — not in matrix.
  // Source: 37-EXTRACTION.md §Hero background "vertical gradient #E6F1F1 → #D2E7E7"
  // Worst stop for text contrast is the lightest (#D2E7E7 = sea-glass-deep, bottom stop).
  [L_INK,    L_SEA_GLASS_DEEP, 'phase37: ink on hero/final gradient worst stop #D2E7E7',                     4.5, true],
  [L_SUB,    L_SEA_GLASS_DEEP, 'phase37: sub on hero/final gradient worst stop #D2E7E7',                     4.5, true],
  // Accent italic "time saved" 76px on gradient worst stop — LARGE TEXT (76px >> 18pt threshold)
  [L_ACCENT, L_SEA_GLASS_DEEP, 'phase37: accent italic "time saved" 76px on hero gradient (large-text 3:1)', 3,   true],

  // NEW: Automations section gradient worst stop #DCEDEC (bottom literal, new surface).
  // Source: 37-EXTRACTION.md §Section 5 Auto "vertical gradient #E6F1F1 → #DCEDEC"
  // Bottom stop #DCEDEC is lighter than #E6F1F1 (sea-glass), so it is the worst case.
  // Adding #DCEDEC as a new surface: ink and sub on it.
  [L_INK,    '#DCEDEC', 'phase37: ink on auto gradient worst stop #DCEDEC',                                  4.5, true],
  [L_SUB,    '#DCEDEC', 'phase37: sub on auto gradient worst stop #DCEDEC',                                  4.5, true],

  // NEW: Proof credentials companies literal #8FB4B2 in dark mode on dark paper.
  // Source: 37-EXTRACTION.md §Section 6 Proof "16:13 HG Regular #4C6A70 light / #8FB4B2 dark"
  // #4C6A70 on L_PAPER is the BREADCRUMB pair already in the matrix — no new entry needed for light.
  // #8FB4B2 on D_PAPER is new (D_SUB is #A9C9C7; this is a different, lighter teal-grey literal).
  ['#8FB4B2', D_PAPER, 'phase37: proof credentials #8FB4B2 on dark paper (new literal)',                     4.5, true],

  // ── PHASE 38 ADDITIONS ────────────────────────────────────────────────────
  // Source: .planning/phases/38-showcase-page-blog-restyle/38-EXTRACTION.md
  //         Figma frame 12:3 — showcase section-band text/background pairs.
  //
  // Pairs ALREADY COVERED by earlier blocks (no new entry needed):
  //   - L_INK / L_SUB on L_SEA_GLASS (#E6F1F1): PageHero + CTA band worst gradient stop
  //     (gradient #E6F1F1 → #D2E7E7; worst is #D2E7E7 = L_SEA_GLASS_DEEP, Phase 37 block ✓)
  //   - L_INK / L_SUB on L_SEA_GLASS_DEEP (#D2E7E7): covered phase37 block ✓
  //   - L_INK / L_SUB on L_PAPER (#F6FBFA): Client Work section bg = var(--color-wl-paper) ✓
  //   - D_INK / D_SUB on D_SEA_GLASS (#123640): PageHero/CTA band dark gradient worst stop ✓
  //   - D_INK / D_SUB on D_PAPER (#0C2228): Client Work dark bg ✓
  //   - All ProjectCard / Eyebrow / CTAButton text pairs: covered Phase 35/36 blocks ✓
  //
  // NEW: Client Work section sub-line literal (non-token, dev-note treatment).
  //   Source: frame 27:35 — HG Italic 14px / 1.6.
  //   Light: Figma literal #6B8B90 on paper. Original #6B8B90 → 3.51:1 FAIL at 4.5:1 AA normal-text
  //   threshold (14px italic is not large-text). Rule 1 fix: darkened to #597880 → 4.544:1 PASS.
  //   showcase.astro updated to use #597880 (minimum darkening to clear 4.5:1).
  //   Dark: #8FB4B2 (derived per 38-01 — landing small-literal precedent, 38-01-SUMMARY decision).
  //   #8FB4B2 on D_PAPER → 7.32:1 PASS (no adjustment needed in dark mode).
  ['#597880', L_PAPER, 'phase38: showcase ClientWork sub-line on paper (light, 14px italic, min-darken fix)', 4.5, true],
  ['#8FB4B2', D_PAPER, 'phase38: showcase ClientWork sub-line on dark paper (dark, derived #8FB4B2)',         4.5, true],

  // NEW: Craft & Experiments section — gradient #EFF7F6 → #E6F1F1 (source: 31:2 fill).
  //   The worst (lightest) stop is #EFF7F6. #E6F1F1 = L_SEA_GLASS, already in matrix.
  //   Check ink and sub on #EFF7F6 (the unlisted lighter stop):
  //   L_INK on #EFF7F6 → 12.36:1 PASS; L_SUB on #EFF7F6 → 7.70:1 PASS.
  [L_INK, '#EFF7F6', 'phase38: showcase Craft gradient worst stop #EFF7F6 — ink',                             4.5, true],
  [L_SUB, '#EFF7F6', 'phase38: showcase Craft gradient worst stop #EFF7F6 — sub (wl-text-lead)',              4.5, true],

  // NEW: Craft & Experiments dark gradient #10303A → #0E2B33 (source: D-04 derived / index.astro #services).
  //   Worst (lightest) dark stop is #10303A. D_INK / D_SUB on #10303A:
  //   D_INK on #10303A → 12.60:1 PASS; D_SUB on #10303A → 7.88:1 PASS.
  [D_INK, '#10303A', 'phase38: showcase Craft dark gradient worst stop #10303A — dark ink',                   4.5, true],
  [D_SUB, '#10303A', 'phase38: showcase Craft dark gradient worst stop #10303A — dark sub',                   4.5, true],

  // ── PHASE 38 BLOG ADDITIONS (Plan 06) ────────────────────────────────────────
  // Source: .planning/phases/38-showcase-page-blog-restyle/38-05-SUMMARY.md
  //         (expressive-code literals measured 2026-07-19) + 38-UI-SPEC.md §Contrast additions
  //
  // .wl-prose link (accent underlined) on paper — already covered by "accent on paper (link text)"
  // and "accent on paper (Eyebrow on-light)" above. Adding blog-explicit label for traceability.
  [L_ACCENT, L_PAPER, 'phase38-blog: wl-prose accent link on paper (light, blog post)',                       4.5, true],
  [D_ACCENT, D_PAPER, 'phase38-blog: wl-prose accent link on dark paper (dark, blog post)',                   4.5, true],

  // Inline code: --wl-sub text on --wl-sea-glass background tint.
  // Already covered by "sub on sea-glass (secondary)" rows above; adding blog-explicit labels.
  [L_SUB, L_SEA_GLASS, 'phase38-blog: inline-code text (wl-sub) on sea-glass tint (light)',                  4.5, true],
  [D_SUB, D_SEA_GLASS, 'phase38-blog: inline-code text (wl-sub) on sea-glass tint (dark)',                   4.5, true],

  // expressive-code block text vs rethemed block background literals.
  // Source: 38-05-SUMMARY §"expressive-code literals chosen (+ AA results)"
  //   Light: github-light foreground #24292e on codeBackground #E6F1F1 — measured 12.72:1 ✓ AA
  //   Dark: github-dark foreground #e1e4e8 on codeBackground #123640 — measured 10.12:1 ✓ AA
  // Using uppercase-normalised hex to match the script's hexToRgb (both forms parse identically).
  ['#24292e', '#E6F1F1', 'phase38-blog: ec code text (github-light #24292e) on block bg #E6F1F1 (light)',     4.5, true],
  ['#e1e4e8', '#123640', 'phase38-blog: ec code text (github-dark #e1e4e8) on block bg #123640 (dark)',       4.5, true],

  // ── PHASE 38-06 ADDITIONS (blog page rebuild) ─────────────────────────────
  // Source: .planning/phases/38-showcase-page-blog-restyle/38-BLOG-EXTRACTION.md §6.2 (pre block)
  //         and §5 / §2 (hero/feature meta row on gradient band).
  //
  // NEW: .wl-prose pre block — always-dark surface (footer-precedent: --wl-footer-bg #0D2A31).
  //   Text: #CDE6E5 = --wl-footer-text-link (always-light-on-dark, source 199:1061).
  //   No dark-flip needed: surface is always-dark. Measured 11.52:1 AAA PASS.
  ['#CDE6E5', '#0D2A31', 'phase38-blog: pre block text #CDE6E5 on always-dark bg #0D2A31 (source 199:1061)', 4.5, true],

  // NEW: Breadcrumb / meta date / meta read-time (--wl-breadcrumb-color) on hero gradient band.
  //   Light: BREADCRUMB #4C6A70 on hero gradient worst stop #D2E7E7 (sea-glass-deep).
  //   BREADCRUMB on paper and white are already in matrix; this adds the gradient band surface.
  //   4.53:1 — passes 4.5:1 AA (barely; noted in contrast log).
  [BREADCRUMB, L_SEA_GLASS_DEEP, 'phase38-blog: breadcrumb #4C6A70 on hero gradient worst stop #D2E7E7 (light)', 4.5, true],

  // NEW: Dark breadcrumb #A9C9C7 on dark hero gradient worst stop #123640 (dark sea-glass).
  //   Derived dark pair for the hero band (D-04 recipe: dark gradient = #123640 → #0C2228;
  //   worst/lightest dark stop is #123640). Measured 7.29:1 PASS.
  [BREADCRUMB_DARK, D_SEA_GLASS, 'phase38-blog: breadcrumb #A9C9C7 on dark hero gradient worst stop #123640 (dark)', 4.5, true],

  // NOTE: accent-soft separator "·" on hero band is DECORATIVE (aria-hidden="true" in post-meta-sep);
  //   #5AA9A5 on #E6F1F1 = 2.38:1 — same token pair as existing decorative row above. No new entry.
];

// ── Main loop (runs only when executed directly, not when imported) ──────────

// pathToFileURL handles percent-encoding, Windows drive letters, etc. — a raw
// `file://${process.argv[1]}` comparison silently fails open on paths with
// spaces/non-ASCII (WR-01).
const isMain = Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  let textFailed = 0;
  let decorativeFailed = 0;

  console.log('\n  WCAG AA Contrast Gate — --wl-* token pair matrix');
  console.log('  ' + '─'.repeat(68));

  for (const [fg, bg, label, threshold, textUse] of PAIRS) {
    // Compare the UNROUNDED ratio to the threshold (WR-07); round for display only.
    const ratio = contrastRatio(fg, bg);
    const pass = ratio >= threshold;
    if (!pass) {
      if (textUse) textFailed++;
      else decorativeFailed++;
    }
    const status = pass ? '\x1b[32mPASS\x1b[0m' : (textUse ? '\x1b[31mFAIL\x1b[0m' : '\x1b[33mINFO\x1b[0m');
    console.log(`  ${status}  ${label}: ${Math.round(ratio * 100) / 100}:1 (threshold ${threshold}:1)`);
  }

  console.log('  ' + '─'.repeat(68));

  if (decorativeFailed > 0) {
    console.log(`\x1b[33m  Note: ${decorativeFailed} decorative pair(s) below threshold (informational — not text use).\x1b[0m`);
  }

  if (textFailed === 0) {
    console.log('\x1b[32m  All TEXT-USE pairs pass WCAG AA. Gate: PASS.\x1b[0m\n');
  } else {
    console.log(`\x1b[31m  ${textFailed} TEXT-USE pair(s) FAILED WCAG AA. Gate: FAIL.\x1b[0m\n`);
  }

  process.exit(textFailed ? 1 : 0);
}

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
 * @param {string} hex1
 * @param {string} hex2
 * @returns {number}  Rounded to 2 decimal places
 */
export function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Math.round(ratio * 100) / 100;
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
// Ghost-on-dark, Eyebrow on-dark: FLAGGED-GAP constants (D-10 non-flippable)
// Replace #XXXXXX with values from Figma dark mockup 117:103 once extracted
// const ONDARK_FG = '#XXXXXX';  // FLAGGED-GAP: non-flippable foreground from 117:103
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

  // CTAButton ghost: ink text on paper bg (transparent bg, effective surface = paper)
  // These pairs already exist above with generic labels; adding Phase 35 specific entries
  // to confirm coverage even if foreground/background hex matches an existing row.
  [L_INK, L_PAPER, 'light: ink on paper (CTAButton ghost text on paper bg)',    4.5, true],
  [D_INK, D_PAPER, 'dark: ink on paper (CTAButton ghost text on paper bg)',     4.5, true],

  // Eyebrow on-light: accent on paper (already in matrix with "link text" label; confirming Phase 35 pair)
  [L_ACCENT, L_PAPER, 'light: accent on paper (Eyebrow on-light)',              4.5, true],
  [D_ACCENT, D_PAPER, 'dark: accent on paper (Eyebrow on-light, dark flip)',    4.5, true],

  // CTAButton ghost-on-dark: FLAGGED-GAP — non-flippable literal from Figma 117:103 (D-10)
  // Uncomment and replace #XXXXXX once extracted from dark mockup 117:103
  // [ONDARK_FG, ONDARK_BG, 'non-flippable: ghost-on-dark label on ink surface',  4.5, true],
  // [ONDARK_FG, ONDARK_BG, 'non-flippable: ghost-on-dark border on ink surface', 4.5, false],

  // Eyebrow on-dark: FLAGGED-GAP — non-flippable literal from Figma 117:103 (D-10)
  // [ONDARK_FG, ONDARK_BG, 'non-flippable: eyebrow on-dark text on ink surface', 4.5, true],

  // Tag text on Tag fill: FLAGGED-GAP (requires Figma 36:5 Tag node inspection)
  // [L_TAG_TEXT, L_TAG_FILL, 'light: tag text on tag fill (Tag component)',       4.5, true],

  // Callout text on Callout fill: FLAGGED-GAP (requires Figma 36:5 Callout inspection)
  // [L_CALLOUT_TEXT, L_CALLOUT_FILL, 'light: callout text on callout fill',       4.5, true],

  // ServiceCard default text on default fill: FLAGGED-GAP (requires Figma 36:5 inspection)
  // [L_SC_DEFAULT_TEXT, L_SC_DEFAULT_FILL, 'light: servicecard default text on bg', 4.5, true],

  // ServiceCard highlight text on highlight fill: FLAGGED-GAP (requires Figma 36:5 inspection)
  // [L_SC_HIGHLIGHT_TEXT, L_SC_HIGHLIGHT_FILL, 'light: servicecard highlight text on bg', 4.5, true],
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
    const ratio = contrastRatio(fg, bg);
    const pass = ratio >= threshold;
    if (!pass) {
      if (textUse) textFailed++;
      else decorativeFailed++;
    }
    const status = pass ? '\x1b[32mPASS\x1b[0m' : (textUse ? '\x1b[31mFAIL\x1b[0m' : '\x1b[33mINFO\x1b[0m');
    console.log(`  ${status}  ${label}: ${ratio}:1 (threshold ${threshold}:1)`);
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

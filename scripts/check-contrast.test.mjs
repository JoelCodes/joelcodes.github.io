/**
 * W3C WCAG 2.x relative-luminance contrast formula — unit tests
 * Run: node --test scripts/check-contrast.test.mjs
 *
 * Phase 33-03 TDD RED phase: these tests are written BEFORE the implementation.
 * They prove the contrast math against known W3C reference values.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  hexToRgb,
  linearize,
  relativeLuminance,
  contrastRatio,
} from './check-contrast.mjs';

// ── hexToRgb ────────────────────────────────────────────────────────────────

test('hexToRgb: parses 6-char hex with # prefix', () => {
  const { r, g, b } = hexToRgb('#FFFFFF');
  assert.strictEqual(r, 255);
  assert.strictEqual(g, 255);
  assert.strictEqual(b, 255);
});

test('hexToRgb: parses lowercase hex', () => {
  const { r, g, b } = hexToRgb('#000000');
  assert.strictEqual(r, 0);
  assert.strictEqual(g, 0);
  assert.strictEqual(b, 0);
});

test('hexToRgb: parses mid-tone grey', () => {
  // #767676 → 118, 118, 118
  const { r, g, b } = hexToRgb('#767676');
  assert.strictEqual(r, 118);
  assert.strictEqual(g, 118);
  assert.strictEqual(b, 118);
});

// ── linearize ───────────────────────────────────────────────────────────────

test('linearize: sRGB 0 (black channel) → 0', () => {
  assert.strictEqual(linearize(0), 0);
});

test('linearize: sRGB 255 (white channel) → 1', () => {
  assert.strictEqual(linearize(255), 1);
});

test('linearize: sRGB mid-tone value rounds correctly', () => {
  // linearize(128/255): sRGB = 128/255 ≈ 0.50196
  // 0.50196 > 0.04045, so: ((0.50196 + 0.055) / 1.055)^2.4
  const val = linearize(128);
  assert.ok(val > 0.2 && val < 0.22, `expected ~0.216, got ${val}`);
});

// ── relativeLuminance ────────────────────────────────────────────────────────

test('relativeLuminance: white (#FFFFFF) → 1.0', () => {
  assert.strictEqual(relativeLuminance('#FFFFFF'), 1.0);
});

test('relativeLuminance: black (#000000) → 0.0', () => {
  assert.strictEqual(relativeLuminance('#000000'), 0.0);
});

test('relativeLuminance: returns a value between 0 and 1 for mid-tones', () => {
  const lum = relativeLuminance('#767676');
  assert.ok(lum > 0 && lum < 1, `expected 0 < lum < 1, got ${lum}`);
});

// ── contrastRatio ────────────────────────────────────────────────────────────

test('contrastRatio: black on white → 21:1 (W3C reference)', () => {
  const ratio = contrastRatio('#000000', '#FFFFFF');
  // W3C spec: (1 + 0.05) / (0 + 0.05) = 1.05 / 0.05 = 21
  assert.strictEqual(ratio, 21);
});

test('contrastRatio: white on white → 1:1 (identical colors)', () => {
  assert.strictEqual(contrastRatio('#FFFFFF', '#FFFFFF'), 1);
});

test('contrastRatio: black on black → 1:1 (identical colors)', () => {
  assert.strictEqual(contrastRatio('#000000', '#000000'), 1);
});

test('contrastRatio: order-independent (A,B === B,A)', () => {
  const ab = contrastRatio('#000000', '#FFFFFF');
  const ba = contrastRatio('#FFFFFF', '#000000');
  assert.strictEqual(ab, ba);
});

test('contrastRatio: #767676 on white → ~4.54:1 (canonical AA boundary grey)', () => {
  // W3C example: #777777 ≈ 4.48, #767676 ≈ 4.54 — the exact AA pass boundary
  const ratio = contrastRatio('#767676', '#FFFFFF');
  // Accept 4.5..4.6 to be robust to floating-point rounding
  assert.ok(ratio >= 4.5 && ratio <= 4.6, `expected ~4.54, got ${ratio}`);
});

test('contrastRatio: accent-soft (#5AA9A5) on paper (#F6FBFA) → below 4.5:1', () => {
  // This is the KNOWN FAIL: accent-soft does not meet WCAG AA for small body text on paper.
  const ratio = contrastRatio('#5AA9A5', '#F6FBFA');
  assert.ok(ratio < 4.5, `expected ratio < 4.5 (WCAG AA fail), got ${ratio}`);
});

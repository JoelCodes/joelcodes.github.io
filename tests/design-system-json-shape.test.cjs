/**
 * test(24-24-04): design-system.json.ts flat semantic shape assertion
 *
 * This static parse test verifies that src/pages/design-system.json.ts emits
 * a v2 flat semantic shape before the implementation is complete.
 * It reads the source file as text and checks for required structural markers.
 *
 * Run with: node tests/design-system-json-shape.test.cjs
 * Exit 0 = PASS, Exit 1 = FAIL
 */

'use strict';

const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../src/pages/design-system.json.ts');
const src = fs.readFileSync(srcPath, 'utf-8');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log('  PASS:', message);
    passed++;
  } else {
    console.error('  FAIL:', message);
    failed++;
  }
}

console.log('\ndesign-system.json.ts — v2 flat semantic shape test\n');

// Top-level flat shape keys (must be present as object keys, not nested)
assert(src.includes("'Content-Type'") || src.includes('"Content-Type"'), 'Returns Content-Type header');
assert(src.includes('export async function GET'), 'Exports GET handler');

// v2 flat top-level keys
assert(/colors\s*:/.test(src), 'Has top-level "colors" key');
assert(/spacing\s*:/.test(src), 'Has top-level "spacing" key');
assert(/radii\s*:/.test(src), 'Has top-level "radii" key');
assert(/typography\s*:/.test(src), 'Has top-level "typography" key');
assert(/fonts\s*:/.test(src), 'Has top-level "fonts" key');

// v2 color token names (flat — not nested per-palette)
assert(src.includes('primary-hover'), 'Has primary-hover color token');
assert(src.includes('surface-muted'), 'Has surface-muted color token');
assert(src.includes("'accent'") || src.includes('"accent"') || /accent\s*:/.test(src), 'Has accent color token');

// v2 font names
assert(src.includes('Plus Jakarta Sans'), 'Has Plus Jakarta Sans font');
assert(src.includes('Inter Variable'), 'Has Inter Variable font');

// v2 radius value
assert(src.includes('0.625rem'), 'Has --radius-md = 0.625rem');

// Zero v1 token references
assert(!src.includes('yellow'), 'No v1 yellow token');
assert(!src.includes('turquoise'), 'No v1 turquoise token');
assert(!src.includes('magenta'), 'No v1 magenta token');
assert(!src.includes('--font-heading'), 'No v1 --font-heading');
assert(!src.includes('--font-body'), 'No v1 --font-body');

// Must NOT have nested per-palette structure (v1 shape)
// v1 had primary: { yellow: {...}, turquoise: {...}, magenta: {...} }
// v2 has flat primary: { cssVar: '...', oklch: '...' }
assert(!src.includes('primary.yellow') && !src.includes("yellow:") && !src.includes("turquoise:") && !src.includes("magenta:"), 'No nested v1 per-palette structure (yellow/turquoise/magenta keys absent)');

console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);

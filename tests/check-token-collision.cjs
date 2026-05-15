/* eslint-disable */
// Phase 23 Wave 0 — D-08 strict-no-collision guard.
// Fails build if any CSS custom-property name appears in BOTH
// src/styles/global.css (v1) and src/styles/v2/global.css (v2).
// CommonJS (.cjs) because package.json declares "type": "module".

const fs = require('fs');
const path = require('path');

const V1_PATH = path.resolve(__dirname, '..', 'src', 'styles', 'global.css');
const V2_PATH = path.resolve(__dirname, '..', 'src', 'styles', 'v2', 'global.css');

const TOKEN_RE = /--([a-zA-Z][a-zA-Z0-9-]*)\s*:/g;

function extractTokenNames(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const names = new Set();
  let match;
  while ((match = TOKEN_RE.exec(source)) !== null) {
    names.add(match[1]);
  }
  return names;
}

function fileExists(p) {
  try { fs.accessSync(p, fs.constants.R_OK); return true; } catch { return false; }
}

const hasV1 = fileExists(V1_PATH);
const hasV2 = fileExists(V2_PATH);

if (!hasV1) {
  console.log('v1 stylesheet not present at ' + V1_PATH + ' — nothing to check.');
  process.exit(0);
}

if (!hasV2) {
  console.log('v2 stylesheet not yet present at ' + V2_PATH + ' — skipping collision check (no-op pass).');
  process.exit(0);
}

const v1Names = extractTokenNames(V1_PATH);
const v2Names = extractTokenNames(V2_PATH);

const collisions = [];
for (const name of v2Names) {
  if (v1Names.has(name)) collisions.push(name);
}
collisions.sort();

if (collisions.length > 0) {
  for (const name of collisions) {
    console.error('COLLISION: --' + name);
  }
  console.error('Total collisions: ' + collisions.length);
  console.error('D-08 strict-no-collision rule violated. Rename the offending v2 token(s).');
  process.exit(1);
}

console.log(
  'OK: no token name collisions between src/styles/global.css and src/styles/v2/global.css ' +
  '(checked ' + v1Names.size + ' v1 names, ' + v2Names.size + ' v2 names)'
);
process.exit(0);

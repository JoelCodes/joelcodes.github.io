/**
 * IA-01 Build Output Assertions
 *
 * Verifies that the production build correctly:
 *   1. Excludes /blog URLs from the sitemap (astro.config.mjs sitemap filter)
 *   2. Has no blog content pages under dist/blog/ (only a redirect stub may exist)
 *   3. Has a /faq -> / redirect stub in dist/faq/index.html
 *
 * IMPORTANT: This script runs against dist/ (production build output).
 * The Playwright webServer runs `npm run dev`, where /blog still renders.
 * Prod-gating behavior (import.meta.env.PROD) CANNOT be verified via dev-server e2e tests.
 *
 * Usage:
 *   npm run build   # must run first
 *   node tests/build/ia-01-build-output.test.mjs
 *
 * Exit codes:
 *   0 — all assertions pass
 *   1 — one or more assertions fail (or dist/ is missing)
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const projectRoot = resolve(__dirname, '..', '..');
const distDir = join(projectRoot, 'dist');

// ── Helpers ──────────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;
const failures = [];

function assert(label, condition, detail = '') {
  if (condition) {
    console.log(`  PASS  ${label}`);
    passed++;
  } else {
    console.error(`  FAIL  ${label}${detail ? `\n        ${detail}` : ''}`);
    failures.push(label);
    failed++;
  }
}

// ── Pre-flight: dist/ must exist ─────────────────────────────────────────────

if (!existsSync(distDir)) {
  console.error('ERROR: dist/ directory not found.');
  console.error('Run `npm run build` before this script.');
  process.exit(1);
}

console.log('\nIA-01 Build Output Assertions\n');

// ── Assertion 1: sitemap contains no /blog URLs ───────────────────────────────

const sitemapPath = join(distDir, 'sitemap-0.xml');
assert(
  'dist/sitemap-0.xml exists',
  existsSync(sitemapPath),
  `Expected file: ${sitemapPath}`
);

if (existsSync(sitemapPath)) {
  const sitemapContent = readFileSync(sitemapPath, 'utf-8');
  const hasBlogUrl = /\/blog/.test(sitemapContent);
  assert(
    'sitemap-0.xml contains no /blog URLs (sitemap filter active)',
    !hasBlogUrl,
    hasBlogUrl
      ? `Found /blog reference in sitemap:\n        ${
          sitemapContent
            .split('\n')
            .filter(l => l.includes('/blog'))
            .join('\n        ')
        }`
      : ''
  );
}

// ── Assertion 2: no blog content pages under dist/blog/ ──────────────────────
//
// A redirect stub at dist/blog/index.html is EXPECTED (blog/index.astro emits
// Astro.redirect('/') in prod, producing a meta-refresh). What must NOT exist:
// per-slug post directories (e.g. dist/blog/my-first-post/).

const blogDir = join(distDir, 'blog');
assert(
  'dist/blog/ directory exists (redirect stub is expected)',
  existsSync(blogDir),
  `Expected a redirect stub at dist/blog/index.html from blog/index.astro`
);

if (existsSync(blogDir)) {
  const blogEntries = readdirSync(blogDir, { withFileTypes: true });
  const slugDirectories = blogEntries.filter(e => e.isDirectory());

  assert(
    'dist/blog/ has no per-post subdirectories (blog content excluded from prod)',
    slugDirectories.length === 0,
    slugDirectories.length > 0
      ? `Found unexpected blog post directories: ${slugDirectories.map(d => d.name).join(', ')}`
      : ''
  );

  // The index.html redirect stub must exist and contain a meta-refresh to /
  const blogIndexPath = join(blogDir, 'index.html');
  if (existsSync(blogIndexPath)) {
    const blogIndexContent = readFileSync(blogIndexPath, 'utf-8');
    const hasMetaRefresh = /meta[^>]+http-equiv=["']refresh["']/i.test(blogIndexContent);
    const redirectsToRoot = /url=\/["'>]/.test(blogIndexContent);

    assert(
      'dist/blog/index.html is a meta-refresh redirect stub (not a content page)',
      hasMetaRefresh,
      hasMetaRefresh ? '' : 'Expected <meta http-equiv="refresh"> not found'
    );
    assert(
      'dist/blog/index.html redirect stub points to / (not a blog content route)',
      redirectsToRoot,
      redirectsToRoot ? '' : 'Expected redirect target url=/ not found in meta-refresh'
    );
  } else {
    assert(
      'dist/blog/index.html exists (blog/index.astro prod redirect stub)',
      false,
      `Missing: ${blogIndexPath}`
    );
  }
}

// ── Assertion 3: /faq redirect stub exists and redirects to / ────────────────

const faqDir = join(distDir, 'faq');
const faqIndexPath = join(faqDir, 'index.html');

assert(
  'dist/faq/ directory exists (/faq redirect declared in astro.config.mjs)',
  existsSync(faqDir),
  `Expected: ${faqDir}`
);

if (existsSync(faqIndexPath)) {
  const faqContent = readFileSync(faqIndexPath, 'utf-8');
  const hasMetaRefresh = /meta[^>]+http-equiv=["']refresh["']/i.test(faqContent);
  const redirectsToRoot = /url=\/["'>]/.test(faqContent);

  assert(
    'dist/faq/index.html is a meta-refresh redirect stub',
    hasMetaRefresh,
    hasMetaRefresh ? '' : 'Expected <meta http-equiv="refresh"> not found'
  );
  assert(
    'dist/faq/index.html redirect points to / (astro.config redirects "/faq": "/")',
    redirectsToRoot,
    redirectsToRoot ? '' : 'Expected redirect target url=/ not found'
  );
} else {
  assert(
    'dist/faq/index.html exists',
    false,
    `Missing: ${faqIndexPath}`
  );
}

// ── Summary ───────────────────────────────────────────────────────────────────

console.log(`\n${passed + failed} assertions: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  console.error('FAILED assertions:');
  failures.forEach(f => console.error(`  - ${f}`));
  process.exit(1);
} else {
  console.log('All IA-01 build output assertions passed.');
  process.exit(0);
}

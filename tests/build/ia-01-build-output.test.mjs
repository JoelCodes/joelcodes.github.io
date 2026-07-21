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

// ── Phase 40 Assertions: IA-01 redirect stubs + sitemap exclusion ─────────────
//
// Verifies five redirect stubs emitted by the updated astro.config.mjs redirects block.
// All stubs must carry <meta http-equiv="refresh"> with the correct url= destination
// and <meta name="robots" content="noindex"> (auto-added by Astro for redirect stubs).
// Redirect stubs must NOT appear in dist/sitemap-0.xml.

console.log('\n[Phase 40] IA-01 redirect stubs\n');

// Helper: read a file if it exists, return null otherwise
function readIfExists(filePath) {
  return existsSync(filePath) ? readFileSync(filePath, 'utf-8') : null;
}

// /portfolio → /showcase
const portfolioIndexPath = join(distDir, 'portfolio', 'index.html');
const portfolioContent = readIfExists(portfolioIndexPath);
assert(
  '[40] dist/portfolio/index.html exists',
  portfolioContent !== null,
  `Expected: ${portfolioIndexPath}`
);
assert(
  '[40] dist/portfolio/index.html redirects to /showcase',
  portfolioContent !== null && /url=\/showcase/.test(portfolioContent),
  portfolioContent !== null ? 'Expected url=/showcase not found' : 'File missing'
);
assert(
  '[40] dist/portfolio/index.html has noindex',
  portfolioContent !== null && /noindex/.test(portfolioContent),
  portfolioContent !== null ? 'Expected noindex not found' : 'File missing'
);

// /projects → /showcase (new entry — previously not in config)
const projectsIndexPath = join(distDir, 'projects', 'index.html');
const projectsContent = readIfExists(projectsIndexPath);
assert(
  '[40] dist/projects/index.html exists',
  projectsContent !== null,
  `Expected: ${projectsIndexPath}`
);
assert(
  '[40] dist/projects/index.html redirects to /showcase',
  projectsContent !== null && /url=\/showcase/.test(projectsContent),
  projectsContent !== null ? 'Expected url=/showcase not found' : 'File missing'
);
assert(
  '[40] dist/projects/index.html has noindex',
  projectsContent !== null && /noindex/.test(projectsContent),
  projectsContent !== null ? 'Expected noindex not found' : 'File missing'
);

// /contact → Calendly BOOKING_URL (external URL redirect, Astro ≥ 5.2.0)
const contactIndexPath = join(distDir, 'contact', 'index.html');
const contactContent = readIfExists(contactIndexPath);
assert(
  '[40] dist/contact/index.html exists',
  contactContent !== null,
  `Expected: ${contactIndexPath}`
);
assert(
  '[40] dist/contact/index.html redirects to calendly.com',
  contactContent !== null && /url=https:\/\/calendly\.com/.test(contactContent),
  contactContent !== null ? 'Expected url=https://calendly.com not found' : 'File missing'
);

// /thank-you → / (safety redirect; source page deleted in Plan 02)
const thankYouIndexPath = join(distDir, 'thank-you', 'index.html');
const thankYouContent = readIfExists(thankYouIndexPath);
assert(
  '[40] dist/thank-you/index.html exists',
  thankYouContent !== null,
  `Expected: ${thankYouIndexPath}`
);
assert(
  '[40] dist/thank-you/index.html redirects to /',
  thankYouContent !== null && /url=\/["'>]/.test(thankYouContent),
  thankYouContent !== null ? 'Expected url=/ not found' : 'File missing'
);

// /faq → / (regression — must still pass; existing redirect unchanged)
// (already asserted in Assertion 3 above; this block confirms it in Phase 40 context)
const faqContent40 = readIfExists(faqIndexPath);
assert(
  '[40] dist/faq/index.html still redirects to / (regression check)',
  faqContent40 !== null && /url=\/["'>]/.test(faqContent40),
  faqContent40 !== null ? 'Expected url=/ not found' : 'File missing'
);

// D-02 gate: /projects/[slug] and /portfolio/[slug] must NOT produce redirect stubs
// (Astro static mode raises GetStaticPathsRequired for dynamic→fixed redirects)
// We verify by confirming there is NO projects/ subdirectory beyond the root stub.
const projectsDir = join(distDir, 'projects');
if (existsSync(projectsDir)) {
  const projectsEntries = readdirSync(projectsDir, { withFileTypes: true });
  const slugDirs = projectsEntries.filter(e => e.isDirectory());
  assert(
    '[40] dist/projects/ has no per-slug subdirectories (D-02: no dynamic redirect entry)',
    slugDirs.length === 0,
    slugDirs.length > 0 ? `Found unexpected subdirs: ${slugDirs.map(d => d.name).join(', ')}` : ''
  );
}

// Sitemap exclusion: redirect stubs must NOT appear in dist/sitemap-0.xml
if (existsSync(sitemapPath)) {
  const sitemapContent40 = readFileSync(sitemapPath, 'utf-8');
  const hasPortfolioInSitemap = /\/portfolio/.test(sitemapContent40);
  const hasProjectsInSitemap = /\/projects/.test(sitemapContent40);
  const hasContactInSitemap = /\/contact/.test(sitemapContent40);
  const hasThankYouInSitemap = /\/thank-you/.test(sitemapContent40);
  assert(
    '[40] sitemap-0.xml excludes /portfolio redirect stub',
    !hasPortfolioInSitemap,
    hasPortfolioInSitemap ? 'Found /portfolio in sitemap — redirect stubs should be excluded' : ''
  );
  assert(
    '[40] sitemap-0.xml excludes /projects redirect stub',
    !hasProjectsInSitemap,
    hasProjectsInSitemap ? 'Found /projects in sitemap — redirect stubs should be excluded' : ''
  );
  assert(
    '[40] sitemap-0.xml excludes /contact redirect stub',
    !hasContactInSitemap,
    hasContactInSitemap ? 'Found /contact in sitemap — redirect stubs should be excluded' : ''
  );
  assert(
    '[40] sitemap-0.xml excludes /thank-you redirect stub',
    !hasThankYouInSitemap,
    hasThankYouInSitemap ? 'Found /thank-you in sitemap — redirect stubs should be excluded' : ''
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

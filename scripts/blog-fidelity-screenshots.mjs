/**
 * Blog fidelity gate screenshot capture — Plan 38-06
 *
 * Captures 9 screenshots:
 *   Blog index:  1440 light, 1440 dark, 390 light, 390 dark
 *   Blog post:   1440 light, 1440 dark, 390 light, 390 dark
 *   Tag page:    1440 light  (derived surface, 1 shot per plan)
 *
 * Naming convention per Phase 38 precedent:
 *   rendered-blog-{index|post}-{width}-{light|dark}.png
 *   rendered-blog-tag-1440-light.png
 *
 * Run from project root: node scripts/blog-fidelity-screenshots.mjs
 * Requires dev server running at localhost:4321
 */

import { chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FIDELITY_DIR = path.resolve(
  __dirname,
  '../.planning/phases/38-showcase-page-blog-restyle/fidelity'
);
const BASE_URL = 'http://localhost:4321';
const POST_SLUG = 'im-pivoting';

// First tag from the "I'm Pivoting" post — must match exactly (URL-encoded as needed)
const FIRST_TAG = 'Entrepreneurship';

const shots = [
  // Blog index — light
  { url: '/blog', width: 1440, dark: false, name: 'rendered-blog-index-1440-light.png' },
  { url: '/blog', width: 390,  dark: false, name: 'rendered-blog-index-390-light.png' },
  // Blog index — dark
  { url: '/blog', width: 1440, dark: true,  name: 'rendered-blog-index-1440-dark.png' },
  { url: '/blog', width: 390,  dark: true,  name: 'rendered-blog-index-390-dark.png' },
  // Blog post — light
  { url: `/blog/${POST_SLUG}`, width: 1440, dark: false, name: 'rendered-blog-post-1440-light.png' },
  { url: `/blog/${POST_SLUG}`, width: 390,  dark: false, name: 'rendered-blog-post-390-light.png' },
  // Blog post — dark
  { url: `/blog/${POST_SLUG}`, width: 1440, dark: true,  name: 'rendered-blog-post-1440-dark.png' },
  { url: `/blog/${POST_SLUG}`, width: 390,  dark: true,  name: 'rendered-blog-post-390-dark.png' },
  // Tag page — light (1 shot, derived surface)
  { url: `/blog/tags/${encodeURIComponent(FIRST_TAG)}`, width: 1440, dark: false, name: 'rendered-blog-tag-1440-light.png' },
];

async function capture() {
  const browser = await chromium.launch();

  for (const shot of shots) {
    const colorScheme = shot.dark ? 'dark' : 'light';
    const context = await browser.newContext({
      viewport: { width: shot.width, height: 900 },
      colorScheme,
    });
    const page = await context.newPage();
    await page.goto(BASE_URL + shot.url, { waitUntil: 'networkidle' });

    // If dark mode, wait for the FOUC script to apply the .dark class
    if (shot.dark) {
      await page.waitForFunction(
        () => document.documentElement.classList.contains('dark'),
        { timeout: 5000 }
      );
    }

    // Wait for fonts + animations to settle
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise(requestAnimationFrame);
      const finite = document
        .getAnimations()
        .filter((a) => a.effect?.getTiming().iterations !== Infinity);
      await Promise.allSettled(finite.map((a) => a.finished));
    });

    const outPath = path.join(FIDELITY_DIR, shot.name);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log('  captured:', shot.name);

    await context.close();
  }

  await browser.close();
  console.log('\nAll 9 screenshots captured to .planning/phases/38-showcase-page-blog-restyle/fidelity/');
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});

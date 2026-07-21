/**
 * Phase 39 fidelity gate screenshot capture — Plan 39-05
 *
 * Captures rendered screenshots of the three Phase 39 pages for the
 * Figma-vs-rendered comparison at the fidelity gate:
 *   /services/web       1440 + 390, light + dark
 *   /areas/abbotsford   1440 + 390, light + dark
 *   /404                1440 + 390, light + dark
 *
 * The two dev-hidden pages are reachable by direct URL (Strategy A — no PROD
 * redirect), so they render normally under `npm run preview` / `npm run dev`.
 *
 * Naming: rendered-{services-web|areas-abbotsford|404}-{width}-{light|dark}.png
 *
 * Run from project root (needs a server at localhost:4321):
 *   npm run preview &  (or npm run dev)
 *   node scripts/fidelity-screenshots.mjs
 */

import { chromium } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIDELITY_DIR = path.resolve(
  __dirname,
  '../.planning/phases/39-utility-pages-dev-hidden-pages/fidelity'
);
const BASE_URL = process.env.BASE_URL || 'http://localhost:4321';

fs.mkdirSync(FIDELITY_DIR, { recursive: true });

const pages = [
  { url: '/services/web', slug: 'services-web' },
  { url: '/areas/abbotsford', slug: 'areas-abbotsford' },
  { url: '/404', slug: '404' },
];
const widths = [1440, 390];
const modes = [false, true];

const shots = [];
for (const p of pages)
  for (const w of widths)
    for (const dark of modes)
      shots.push({
        url: p.url,
        width: w,
        dark,
        name: `rendered-${p.slug}-${w}-${dark ? 'dark' : 'light'}.png`,
      });

async function capture() {
  const browser = await chromium.launch();
  for (const shot of shots) {
    const context = await browser.newContext({
      viewport: { width: shot.width, height: 900 },
      colorScheme: shot.dark ? 'dark' : 'light',
    });
    const page = await context.newPage();
    await page.goto(BASE_URL + shot.url, { waitUntil: 'networkidle' });
    if (shot.dark) {
      await page
        .waitForFunction(() => document.documentElement.classList.contains('dark'), { timeout: 5000 })
        .catch(() => {});
    }
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise(requestAnimationFrame);
      const finite = document.getAnimations().filter((a) => a.effect?.getTiming().iterations !== Infinity);
      await Promise.allSettled(finite.map((a) => a.finished));
    });
    await page.screenshot({ path: path.join(FIDELITY_DIR, shot.name), fullPage: true });
    console.log('  captured:', shot.name);
    await context.close();
  }
  await browser.close();
  console.log(`\n${shots.length} screenshots captured to .planning/phases/39-utility-pages-dev-hidden-pages/fidelity/`);
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});

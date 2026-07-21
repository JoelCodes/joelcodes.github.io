/**
 * Phase 41 QUAL-03 fidelity gate screenshot capture — Plan 41-05
 *
 * Captures post-cleanup rendered screenshots for the milestone-close visual
 * sign-off gate. Targets pages in their post-cleanup state (after CLEAN-01/02/03)
 * so Joel can confirm the token purge introduced no visual regression.
 *
 * Captured:
 *   /          (Landing)  1440, light + dark
 *   /showcase             1440, light (showcase is always light)
 *
 * Showcase expanded state: script clicks the first <details> element to open it,
 * waits for the animation to settle, then captures the expanded screenshot.
 *
 * Output dir: .planning/phases/41-legacy-cleanup-quality-gate/fidelity/
 * Naming: rendered-landing-1440-{light|dark}.png
 *         rendered-showcase-1440-closed.png
 *         rendered-showcase-1440-expanded.png
 *
 * Run from project root (needs dev server at localhost:4321):
 *   npm run dev &
 *   node scripts/41-fidelity-screenshots.mjs
 */

import { chromium } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIDELITY_DIR = path.resolve(
  __dirname,
  '../.planning/phases/41-legacy-cleanup-quality-gate/fidelity'
);
const BASE_URL = process.env.BASE_URL || 'http://localhost:4321';

fs.mkdirSync(FIDELITY_DIR, { recursive: true });

async function settle(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise(requestAnimationFrame);
    const finite = document.getAnimations().filter((a) => a.effect?.getTiming().iterations !== Infinity);
    await Promise.allSettled(finite.map((a) => a.finished));
  });
}

async function capture() {
  const browser = await chromium.launch();

  // --- Landing light ---
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' });
    const page = await ctx.newPage();
    await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
    await settle(page);
    const out = path.join(FIDELITY_DIR, 'rendered-landing-1440-light.png');
    await page.screenshot({ path: out, fullPage: true });
    console.log('  captured: rendered-landing-1440-light.png');
    await ctx.close();
  }

  // --- Landing dark ---
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
    const page = await ctx.newPage();
    await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
    // Wait for the dark class (injected by theme script)
    await page
      .waitForFunction(() => document.documentElement.classList.contains('dark'), { timeout: 5000 })
      .catch(() => {});
    await settle(page);
    const out = path.join(FIDELITY_DIR, 'rendered-landing-1440-dark.png');
    await page.screenshot({ path: out, fullPage: true });
    console.log('  captured: rendered-landing-1440-dark.png');
    await ctx.close();
  }

  // --- Showcase closed (light) ---
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' });
    const page = await ctx.newPage();
    await page.goto(BASE_URL + '/showcase', { waitUntil: 'networkidle' });
    await settle(page);
    const out = path.join(FIDELITY_DIR, 'rendered-showcase-1440-closed.png');
    await page.screenshot({ path: out, fullPage: true });
    console.log('  captured: rendered-showcase-1440-closed.png');

    // --- Showcase expanded: click first <details> to open ---
    const firstDetails = page.locator('details').first();
    const isOpen = await firstDetails.evaluate((el) => el.open);
    if (!isOpen) await firstDetails.click();
    // Wait for expand animation
    await page.waitForTimeout(600);
    await settle(page);
    const outExp = path.join(FIDELITY_DIR, 'rendered-showcase-1440-expanded.png');
    await page.screenshot({ path: outExp, fullPage: true });
    console.log('  captured: rendered-showcase-1440-expanded.png');

    await ctx.close();
  }

  await browser.close();
  console.log('\n4 screenshots captured to .planning/phases/41-legacy-cleanup-quality-gate/fidelity/');
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});

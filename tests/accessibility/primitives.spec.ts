/**
 * Primitives isolation page accessibility test — Phase 35 (TEMPORARY)
 *
 * DELETE this file in Plan 35-04 Task 3 (simultaneously with src/pages/dev/primitives.astro).
 * Leaving it after deletion causes CI failure on a 404 (threat T-02).
 *
 * Tests axe on /dev/primitives in both light and dark mode (colorScheme emulation).
 * Adapted directly from tests/accessibility/dark-mode.spec.ts pattern.
 *
 * The page under test: src/pages/dev/primitives.astro — exercises all 8 Phase 35
 * primitives (CTAButton, Eyebrow, Tag, Callout, LinkCard, Breadcrumb, Step, ServiceCard)
 * in Figma 36:5 order per D-12.
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { settleAnimations } from './helpers';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('Primitives isolation page — Phase 35 (TEMPORARY — delete with isolation page)', () => {

  test('light mode — zero axe violations on /dev/primitives', async ({ page }) => {
    await page.goto('/dev/primitives');

    // Wait for all animations to settle before axe samples colors
    // (prevents flaky contrast failures from mid-transition states)
    await settleAnimations(page);

    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('dark mode — zero axe violations on /dev/primitives', async ({ browser }) => {
    // colorScheme: 'dark' triggers the FOUC script to set .dark class on <html>
    // — same mechanism as dark-mode.spec.ts; toggle-independent (D-05/D-06)
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();

    await page.goto('/dev/primitives');

    // Verify FOUC script applied .dark class from OS preference
    // (pattern: dark-mode.spec.ts line 22)
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // Wait for animations before axe color sampling
    await settleAnimations(page);

    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);

    await context.close();
  });

});

/**
 * Landing Page Accessibility — DURABLE SPEC
 *
 * This file is NOT deleted after the Phase 37 gate. Unlike the Phase 35/36 isolation
 * specs (which were temporary), this spec provides permanent light + dark axe coverage
 * for the landing page at /.
 *
 * Tests:
 *   1. Light mode — page.goto('/') with system default context; zero axe violations.
 *   2. Dark mode — browser.newContext with colorScheme dark; verifies html.dark class
 *      set by the FOUC script; zero axe violations.
 *
 * Tags: wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa (WCAG 2.2 AA full set).
 * Helper: settleAnimations(page) called before every .analyze() to avoid flaky contrast
 *   failures from mid-transition entrance animations.
 *
 * Phase: 37-landing-page — Plan 37-04
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { settleAnimations } from './helpers';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('Landing Page Accessibility', () => {
  test('Landing page in light mode should not have accessibility violations', async ({ page }) => {
    await page.goto('/');

    await settleAnimations(page);

    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('Landing page in dark mode should not have accessibility violations', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    await page.goto('/');

    // Verify the FOUC script applied .dark class from OS dark-mode preference
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    await settleAnimations(page);

    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);
    await context.close();
  });
});

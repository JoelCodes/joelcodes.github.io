/**
 * Showcase Page Accessibility — DURABLE SPEC
 *
 * This file provides permanent light + dark axe coverage for the /showcase page.
 * The page is dev-only (PROD guard redirects to /); tests run against the dev server.
 *
 * Tests:
 *   1. Light mode — page.goto('/showcase') with system default context; zero axe violations.
 *   2. Dark mode — browser.newContext with colorScheme dark; verifies html.dark class
 *      set by the FOUC script; zero axe violations.
 *
 * Tags: wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa (WCAG 2.2 AA full set).
 * Helper: settleAnimations(page) called before every .analyze() to avoid flaky contrast
 *   failures from mid-transition entrance animations.
 *
 * Phase: 38-showcase-page-blog-restyle — Plan 38-03
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { settleAnimations } from './helpers';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('Showcase Page Accessibility', () => {
  test('Showcase page in light mode should not have accessibility violations', async ({ page }) => {
    await page.goto('/showcase');

    await settleAnimations(page);

    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('Showcase page in dark mode should not have accessibility violations', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    try {
      await page.goto('/showcase');

      // Verify the FOUC script applied .dark class from OS dark-mode preference
      const html = page.locator('html');
      await expect(html).toHaveClass(/dark/);

      await settleAnimations(page);

      const results = await new AxeBuilder({ page })
        .withTags(wcagTags)
        .analyze();

      expect(results.violations).toEqual([]);
    } finally {
      await context.close();
    }
  });
});

/**
 * 404 Page Accessibility — DURABLE SPEC
 *
 * Provides permanent light + dark axe coverage for the /404 page.
 * The page is publicly reachable (no PROD redirect — D-05); tests run against dev server.
 *
 * Note on route: page.goto('/404') hits the src/pages/404.astro file directly,
 * which returns HTTP 200 in dev (it IS a valid Astro route). For HTTP 404 status
 * verification, use npm run build && npm run preview with an unmatched URL instead
 * (RESEARCH Pitfall 6). Axe accessibility testing does not require HTTP 404 status.
 *
 * Tests:
 *   1. Light mode — page.goto('/404') with system default context; zero axe violations.
 *   2. Dark mode — browser.newContext with colorScheme dark; verifies html.dark class
 *      set by the FOUC script; zero axe violations.
 *
 * Tags: wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa (WCAG 2.2 AA full set).
 * Helper: settleAnimations(page) called before every .analyze() to avoid flaky contrast
 *   failures from mid-transition entrance animations (FrequencyWave has no finite animation,
 *   but settleAnimations is included per the spec template for future-proof consistency).
 *
 * Phase: 39-utility-pages-dev-hidden-pages — Plan 39-02
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { settleAnimations } from './helpers';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('404 Page Accessibility', () => {
  test('404 page in light mode should not have accessibility violations', async ({ page }) => {
    await page.goto('/404');

    await settleAnimations(page);

    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('404 page in dark mode should not have accessibility violations', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    try {
      await page.goto('/404');

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

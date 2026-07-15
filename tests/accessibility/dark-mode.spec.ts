import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { settleAnimations } from './helpers';

/**
 * Dark mode accessibility test suite.
 * Drives dark mode via Playwright colorScheme browser context (Wave 0 requirement: D-05/D-06).
 * Toggle-independent — tests stay green when the dark mode toggle is removed from chrome.
 */

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('Dark Mode Accessibility', () => {
  // All tests use colorScheme browser context (D-05/D-06)

  test('Homepage in dark mode should not have accessibility violations', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    await page.goto('/');

    // Verify FOUC script set .dark class from OS preference
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    await settleAnimations(page);


    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);
    await context.close();
  });

  test('Projects page in dark mode should not have accessibility violations', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    await page.goto('/projects');

    await settleAnimations(page);


    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);
    await context.close();
  });

  // Blog test removed: /blog returns 404 in prod; test suite runs against prod build
  // If dev-only test coverage is desired for blog, add a separate dev test block

  test('Homepage in light mode should not have accessibility violations', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'light' });
    const page = await context.newPage();
    await page.goto('/');

    await settleAnimations(page);


    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);
    await context.close();
  });
});

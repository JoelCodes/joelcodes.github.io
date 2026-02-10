import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Dark mode accessibility test suite.
 * Verifies that toggling dark mode doesn't introduce color contrast regressions.
 */

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('Dark Mode Accessibility', () => {
  test('Homepage in dark mode should not have accessibility violations', async ({ page }) => {
    await page.goto('/');

    // Toggle dark mode via theme button
    const themeToggle = page.locator('#theme-toggle');
    await themeToggle.click();

    // Wait for dark mode transition to complete
    await page.waitForTimeout(500);

    // Verify dark mode is active
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // Run axe scan in dark mode
    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('Projects page in dark mode should not have accessibility violations', async ({ page }) => {
    await page.goto('/projects');

    // Toggle dark mode
    const themeToggle = page.locator('#theme-toggle');
    await themeToggle.click();
    await page.waitForTimeout(500);

    // Run axe scan
    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('Blog page in dark mode should not have accessibility violations', async ({ page }) => {
    await page.goto('/blog');

    // Toggle dark mode
    const themeToggle = page.locator('#theme-toggle');
    await themeToggle.click();
    await page.waitForTimeout(500);

    // Run axe scan
    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('Contact page in dark mode should not have accessibility violations', async ({ page }) => {
    await page.goto('/contact');

    // Toggle dark mode
    const themeToggle = page.locator('#theme-toggle');
    await themeToggle.click();
    await page.waitForTimeout(500);

    // Run axe scan
    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);
  });
});

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { settleAnimations } from './helpers';

/**
 * Accessibility test suite using axe-core to detect WCAG 2.2 AA violations.
 * These tests catch ~57% of accessibility issues automatically.
 */

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('Page Accessibility Tests', () => {
  test('Homepage should not have accessibility violations', async ({ page }) => {
    await page.goto('/');

    await settleAnimations(page);


    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('Blog page should not have accessibility violations', async ({ page }) => {
    await page.goto('/blog');

    await settleAnimations(page);


    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  // WR-05: the former "/about" test was removed — no /about route has ever existed
  // (About is a homepage component, not a page). page.goto('/about') does not fail
  // on 404, so axe was silently scanning the dev-server 404 page and passing.
  // If an About page ships later, add a test that asserts response.ok() first.
});

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('v2 Layout Accessibility (Phase 23)', () => {
  test('v2 smoke page has zero axe-core violations', async ({ page }) => {
    await page.goto('/v2-smoke');
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });

  test('v2 smoke page contains no #theme-toggle in DOM', async ({ page }) => {
    await page.goto('/v2-smoke');
    const count = await page.locator('#theme-toggle').count();
    expect(count).toBe(0);
  });

  test('v2 smoke page mobile overlay is hidden on initial load', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/v2-smoke');
    const overlay = page.locator('#mobile-menu-overlay');
    await expect(overlay).toHaveAttribute('hidden', '');
  });

  test('v2 smoke page mobile overlay opens on hamburger click', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/v2-smoke');
    await page.locator('#mobile-menu-toggle').click();
    const overlay = page.locator('#mobile-menu-overlay');
    await expect(overlay).not.toHaveAttribute('hidden', '');
    const toggle = page.locator('#mobile-menu-toggle');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  test('v2 smoke page mobile overlay closes on Escape', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/v2-smoke');
    await page.locator('#mobile-menu-toggle').click();
    await page.keyboard.press('Escape');
    const overlay = page.locator('#mobile-menu-overlay');
    await expect(overlay).toHaveAttribute('hidden', '');
  });
});

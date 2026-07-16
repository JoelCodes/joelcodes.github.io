import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { settleAnimations } from './helpers';

/**
 * CHROME-04: Mobile-viewport axe scan.
 * The Wavelength header bar at 390px has no hamburger menu and no mobile overlay —
 * only the mark, Showcase link, and Book-a-call CTA. The bar itself must be axe-clean.
 *
 * Requirement: "Chrome nav landmarks are keyboard-reachable and axe-clean at 390px
 * with no mobile menu (CHROME-04)" — 34-04-PLAN.md
 */

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('Mobile Chrome Accessibility (CHROME-04)', () => {
  test('Homepage header bar is axe-clean at 390px mobile viewport', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();

    await page.goto('/');
    await settleAnimations(page);

    // The site header landmark (banner role) must be present — no hamburger, no overlay
    const header = page.getByRole('banner');
    await expect(header).toBeVisible();

    // Confirm there is no mobile menu button (the bar itself is the mobile chrome)
    const hamburger = page.locator('button[aria-expanded], #mobile-menu-toggle');
    await expect(hamburger).toHaveCount(0);

    // Run axe on the full page at mobile viewport — zero violations required
    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);
    await context.close();
  });

  test('Homepage header has keyboard-reachable nav landmarks at 390px', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();

    await page.goto('/');

    // Mobile nav must be present and visible (not hidden behind a toggle)
    const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
    await expect(mobileNav).toBeVisible();

    // The mobile nav must contain at least one focusable link
    const focusableLinks = mobileNav.locator('a');
    const count = await focusableLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);

    await context.close();
  });
});

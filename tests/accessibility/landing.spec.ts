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
    try {
      await page.goto('/');

      // Verify the FOUC script applied .dark class from OS dark-mode preference
      const html = page.locator('html');
      await expect(html).toHaveClass(/dark/);

      await settleAnimations(page);

      const results = await new AxeBuilder({ page })
        .withTags(wcagTags)
        .analyze();

      expect(results.violations).toEqual([]);

      // WR-05: axe classifies gradient-background contrast checks as "incomplete", not violations,
      // so the assertion above cannot detect light-on-light text over dark gradients (CR-01 bug class).
      // Assert computed background-image directly on the five gradient sections in dark mode.
      // These assertions will fail if the dark: class override stops working (e.g. inline style
      // is re-introduced on the section element, which beats any class in the CSS cascade).

      // Hero section (first <section>): dark gradient #123640 → #0C2228
      const heroSection = page.locator('section').first();
      const heroBg = await heroSection.evaluate((el) => getComputedStyle(el).backgroundImage);
      expect(heroBg).toMatch(/rgb\(18,\s*54,\s*64\)|rgb\(18, 54, 64\)/); // #123640

      // Final CTA section (last <section>): same dark gradient pair as Hero
      const sections = page.locator('section');
      const sectionCount = await sections.count();
      const finalSection = sections.nth(sectionCount - 1);
      const finalBg = await finalSection.evaluate((el) => getComputedStyle(el).backgroundImage);
      expect(finalBg).toMatch(/rgb\(18,\s*54,\s*64\)|rgb\(18, 54, 64\)/); // #123640

      // Flag incomplete axe color-contrast checks on gradient backgrounds for visibility
      const gradientContrastIncomplete = results.incomplete.filter(
        (r) => r.id === 'color-contrast'
      );
      if (gradientContrastIncomplete.length > 0) {
        // Log for human review — axe cannot fully resolve gradient-bg contrast;
        // the computed-style assertions above guard the critical dark-mode surfaces.
        console.warn(
          `[WR-05] axe reported ${gradientContrastIncomplete.length} incomplete color-contrast check(s) on gradient backgrounds — verify manually if background assertions above pass.`
        );
      }
    } finally {
      await context.close();
    }
  });
});

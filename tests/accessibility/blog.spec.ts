/**
 * Blog Page Accessibility — DURABLE SPEC
 *
 * This file is NOT deleted after the Phase 38 gate. Provides permanent light + dark
 * axe coverage for the blog index and a blog post.
 *
 * Tests:
 *   1. Blog index light mode — page.goto('/blog'); zero axe violations.
 *   2. Blog index dark mode — browser.newContext colorScheme dark; html.dark class;
 *      zero axe violations.
 *   3. Blog post light mode — page.goto('/blog/im-pivoting'); zero axe violations.
 *   4. Blog post dark mode — browser.newContext colorScheme dark; html.dark class;
 *      zero axe violations.
 *
 * Pages are dev-gated (import.meta.env.PROD returns []) — tests run against dev server.
 * Playwright config baseURL = http://localhost:4321 (dev server).
 *
 * Tags: wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa (WCAG 2.2 AA full set).
 * Helper: settleAnimations(page) called before every .analyze() (see landing.spec.ts
 * precedent — avoids flaky contrast failures from mid-transition animations).
 *
 * Phase: 38-showcase-page-blog-restyle — Plan 38-06
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { settleAnimations } from './helpers';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

// The non-draft post slug used for post-page tests.
// "im-pivoting" is the only non-draft post (draft: false) in src/content/blog/.
const FIRST_POST_SLUG = 'im-pivoting';

test.describe('Blog Page Accessibility', () => {

  // ── Blog Index ──────────────────────────────────────────────────────────────

  test('Blog index in light mode should not have accessibility violations', async ({ page }) => {
    await page.goto('/blog');

    await settleAnimations(page);

    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('Blog index in dark mode should not have accessibility violations', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    try {
      await page.goto('/blog');

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

  // ── Blog Post ───────────────────────────────────────────────────────────────

  test('Blog post in light mode should not have accessibility violations', async ({ page }) => {
    await page.goto(`/blog/${FIRST_POST_SLUG}`);

    await settleAnimations(page);

    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('Blog post in dark mode should not have accessibility violations', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    try {
      await page.goto(`/blog/${FIRST_POST_SLUG}`);

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

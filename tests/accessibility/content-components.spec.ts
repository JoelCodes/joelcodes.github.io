/**
 * Content components isolation page accessibility test -- Phase 36 (TEMPORARY)
 *
 * DELETE this file in the final Phase 36 commit (simultaneously with
 * src/pages/dev/content-components.astro). Leaving it after the page is
 * deleted causes CI axe runs to 404 and fail (threat T-02 / stale-test-404).
 *
 * Tests:
 *   1. Light mode -- zero axe violations on /dev/content-components
 *   2. Dark mode -- zero axe violations (colorScheme: 'dark' + .dark class assertion)
 *   3. Keyboard-only FAQ exclusive-open -- Tab/Enter only, no mouse/click
 *
 * Tags: wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa (ROADMAP SC-1, SC-2)
 * Keyboard: SC-2 -- FAQItem exclusive-open group is keyboard-operable
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { settleAnimations } from './helpers';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('Content components isolation page -- Phase 36 (TEMPORARY -- delete with isolation page)', () => {

  test('light mode -- zero axe violations on /dev/content-components', async ({ page }) => {
    await page.goto('/dev/content-components');

    // Wait for all animations to settle before axe samples colors
    // (prevents flaky contrast failures from mid-transition states)
    await settleAnimations(page);

    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('dark mode -- zero axe violations on /dev/content-components', async ({ browser }) => {
    // colorScheme: 'dark' triggers the FOUC script to set .dark class on <html>
    // -- same mechanism as dark-mode.spec.ts; toggle-independent (D-05/D-06)
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();

    await page.goto('/dev/content-components');

    // Verify FOUC script applied .dark class from OS colorScheme preference
    // (pattern: dark-mode.spec.ts line 22)
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // Wait for animations to settle before axe color sampling
    await settleAnimations(page);

    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(results.violations).toEqual([]);

    await context.close();
  });

  test('keyboard-only -- FAQ exclusive-open: Tab/Enter only (no mouse), opening item 2 closes item 1', async ({ page }) => {
    // COMP-04 SC-2: keyboard-only operation of FAQItem exclusive-open group.
    // Uses NO page.click() or mouse calls -- only keyboard input.
    await page.goto('/dev/content-components');
    await settleAnimations(page);

    // Tab forward until the first FAQ summary element receives focus.
    // The page has several interactive elements before the FAQ group (ProjectCard summaries, etc.).
    // We tab until we find a summary that belongs to a details[name="faq-dev-demo"] element.
    let found = false;
    for (let i = 0; i < 30; i++) {
      await page.keyboard.press('Tab');
      const isFaqSummary = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return false;
        const details = el.closest('details');
        return details ? details.getAttribute('name') === 'faq-dev-demo' : false;
      });
      if (isFaqSummary) {
        found = true;
        break;
      }
    }
    expect(found).toBe(true);

    // Open the first FAQ item with Enter.
    // The active element is the first FAQItem summary.
    await page.keyboard.press('Enter');

    // Assert the first FAQ details element now has [open] attribute.
    const firstDetails = page.locator('details[name="faq-dev-demo"]').first();
    await expect(firstDetails).toHaveAttribute('open', '');

    // Tab to the second FAQItem summary.
    // Each FAQItem summary gets focus sequentially within the group.
    await page.keyboard.press('Tab');

    // Confirm focus is now on a summary inside a faq-dev-demo details element.
    const focusedIsFaqSummary = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return false;
      const details = el.closest('details');
      return details ? details.getAttribute('name') === 'faq-dev-demo' : false;
    });
    expect(focusedIsFaqSummary).toBe(true);

    // Open the second FAQ item with Enter -- exclusive-open should close the first.
    await page.keyboard.press('Enter');

    // Assert the second details is now open.
    const secondDetails = page.locator('details[name="faq-dev-demo"]').nth(1);
    await expect(secondDetails).toHaveAttribute('open', '');

    // Assert the first details is now closed (exclusive-open via shared name attribute).
    // Note: the first card uses the .dev-force-open CSS wrapper which is a separate div --
    // not a FAQItem. The FAQ items are the three details[name="faq-dev-demo"] elements.
    await expect(firstDetails).not.toHaveAttribute('open');
  });

});

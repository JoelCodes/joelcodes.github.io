import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('v2 /faq (Plan 25-01)', () => {
  test('A1: renders on BaseLayoutV2 with zero axe violations', async ({ page }) => {
    await page.goto('/faq');

    const h1 = page.locator('h1');
    await expect(h1).toContainText('Frequently Asked Questions');

    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });

  test('A2: FAQPage JSON-LD is present and structurally valid', async ({ page }) => {
    await page.goto('/faq');

    // Index 0 = Person schema (emitted by SEO.astro line 77).
    // Index 1 = FAQPage schema (emitted by faq.astro via <slot name="head">).
    // BaseLayoutV2 line 29 places the head slot AFTER <SEO /> on line 27.
    const ldText = await page
      .locator('script[type="application/ld+json"]')
      .nth(1)
      .textContent();
    expect(ldText).toBeTruthy();

    const data = JSON.parse(ldText!);
    expect(data['@context']).toBe('https://schema.org');
    expect(data['@type']).toBe('FAQPage');
    expect(data.mainEntity).toHaveLength(5);
    expect(data.mainEntity[0]['@type']).toBe('Question');
    expect(data.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
  });

  test('A3: accordion summary toggles open/closed via keyboard (Enter)', async ({ page }) => {
    await page.goto('/faq');

    const firstSummary = page.locator('details.faq-row summary').first();
    const firstDetails = page.locator('details.faq-row').first();

    // Initially closed
    await expect(firstDetails).not.toHaveAttribute('open', '');

    // Focus + Enter → opens
    await firstSummary.focus();
    await page.keyboard.press('Enter');
    await expect(firstDetails).toHaveAttribute('open', '');

    // Enter again → closes (toggle works in both directions)
    await page.keyboard.press('Enter');
    await expect(firstDetails).not.toHaveAttribute('open', '');
  });

  test('A3b: chevron rotates 180deg when row is open', async ({ page }) => {
    await page.goto('/faq');

    const firstRow = page.locator('details.faq-row').first();
    const firstSummary = firstRow.locator('summary');
    const firstChevron = firstRow.locator('.faq-row__chevron');

    // Open the row
    await firstSummary.click();
    await expect(firstRow).toHaveAttribute('open', '');

    // Computed transform of rotate(180deg) resolves to matrix(-1, 0, 0, -1, 0, 0)
    const transform = await firstChevron.evaluate(
      (el) => window.getComputedStyle(el).transform,
    );
    expect(transform).toContain('matrix');
  });

  test('A4: CTA Button links to /#contact', async ({ page }) => {
    await page.goto('/faq');

    const cta = page.getByRole('link', { name: 'Get in touch' });
    await expect(cta).toHaveAttribute('href', '/#contact');
  });
});

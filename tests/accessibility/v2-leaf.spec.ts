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

test.describe('v2 /thank-you (Plan 25-02)', () => {
  test('B1: renders on BaseLayoutV2 with zero axe violations', async ({ page }) => {
    await page.goto('/thank-you');

    const h1 = page.locator('h1');
    await expect(h1).toContainText('Thanks for reaching out!');

    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });

  test('B5: h1 is not uppercase (D-25-09 / D-26-04)', async ({ page }) => {
    await page.goto('/thank-you');

    const h1 = page.locator('h1');
    const textTransform = await h1.evaluate(
      (el) => window.getComputedStyle(el).textTransform,
    );
    expect(textTransform).toBe('none');
  });

  test('B3: primary CTA links to Calendly with target=_blank + rel=noopener noreferrer', async ({ page }) => {
    await page.goto('/thank-you');

    const cta = page.getByRole('link', { name: /Skip the wait/ });
    await expect(cta).toHaveAttribute('href', /calendly\.com/);
    await expect(cta).toHaveAttribute('target', '_blank');
    await expect(cta).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('B4: secondary link returns to homepage', async ({ page }) => {
    await page.goto('/thank-you');

    const link = page.getByRole('link', { name: 'Return to homepage' });
    await expect(link).toHaveAttribute('href', '/');
  });
});

test.describe('v2 /404 (Plan 25-02)', () => {
  test('C1: renders on BaseLayoutV2 with zero axe violations', async ({ page }) => {
    await page.goto('/404');

    await expect(page.locator('h1')).toContainText('404');
    await expect(page.locator('h2').first()).toContainText('wandered off');

    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });

  test('C4: noindex meta is present', async ({ page }) => {
    await page.goto('/404');

    const robotsMeta = page.locator('meta[name="robots"]');
    await expect(robotsMeta).toHaveAttribute('content', /noindex/);
  });

  test('C2: 4 destination cards link in declared order', async ({ page }) => {
    await page.goto('/404');

    const cards = page.locator('a.dest-card');
    await expect(cards).toHaveCount(4);

    const hrefs = await cards.evaluateAll((els) =>
      els.map((el) => (el as HTMLAnchorElement).getAttribute('href')),
    );
    expect(hrefs).toEqual(['/', '/projects', '/blog', '/faq']);
  });

  test('C3: contact CTA link variant renders with auto ArrowRight', async ({ page }) => {
    await page.goto('/404');

    const link = page.getByRole('link', { name: /Or get in touch/ });
    await expect(link).toHaveAttribute('href', '/#contact');
    // ArrowRight is auto-rendered by Button link variant (Phase 24 D-04)
    await expect(link.locator('svg')).toHaveCount(1);
  });

  test('C5: no banner chrome (D-25-17 — 404 is a system-state page)', async ({ page }) => {
    await page.goto('/404');

    const banners = page.locator('.blog-hero, .page-hero');
    await expect(banners).toHaveCount(0);
  });
});

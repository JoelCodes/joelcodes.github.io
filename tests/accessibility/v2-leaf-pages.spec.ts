import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Playwright + axe-core accessibility suite for Phase 25 v2 leaf pages.
 *
 * Validates the three migrated leaf pages (/faq, /thank-you, /404) against
 * WCAG 2.2 AA, plus a behavioral assertion that /faq emits a valid FAQPage
 * JSON-LD <script> in <head> with exactly 5 mainEntity Question/Answer
 * entries (D-08, D-19).
 *
 * Plan 25-01 (this file): creates the spec; /faq tests turn green after the
 * /faq rewrite (Task 2). The /thank-you and /404 axe tests are EXPECTED to
 * fail until Plan 25-02 lands — that failure is the contract gate 25-02 must
 * turn green. DO NOT add .skip / .fixme — the failing tests are the gate.
 *
 * Plan: 25-01 | Phase: 25-leaf-page-migrations-faq-thank-you-404
 */

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('v2 Leaf Pages Accessibility (Phase 25)', () => {

  // -------------------------------------------------------------------------
  // Test 1: /faq — axe-core full-page scan (WCAG 2.2 AA gate)
  // -------------------------------------------------------------------------
  test('/faq has zero axe-core violations (WCAG 2.2 AA)', async ({ page }) => {
    await page.goto('/faq');
    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();
    expect(results.violations).toEqual([]);
  });

  // -------------------------------------------------------------------------
  // Test 2: /thank-you — axe-core full-page scan (WCAG 2.2 AA gate)
  //
  // EXPECTED RED until Plan 25-02 migrates /thank-you to BaseLayoutV2. The
  // current v1 page contains dark: utilities and v1 primitive imports that
  // axe-core flags. Plan 25-02 turns this green.
  // -------------------------------------------------------------------------
  test('/thank-you has zero axe-core violations (WCAG 2.2 AA)', async ({ page }) => {
    await page.goto('/thank-you');
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });

  // -------------------------------------------------------------------------
  // Test 3: /404 — axe-core full-page scan (WCAG 2.2 AA gate)
  //
  // We navigate to a deliberately non-existent route so the dev server falls
  // back to the 404 page — this is closer to real user experience than a
  // direct goto('/404') (RESEARCH Open Question 3). EXPECTED RED until Plan
  // 25-02 creates src/pages/404.astro; until then Astro returns a default
  // error page that may have axe violations.
  // -------------------------------------------------------------------------
  test('/404 has zero axe-core violations (WCAG 2.2 AA)', async ({ page }) => {
    await page.goto('/this-route-does-not-exist-for-testing');
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });

  // -------------------------------------------------------------------------
  // Test 4: /faq emits valid FAQPage JSON-LD with 5 questions in <head>
  //
  // The 'head ' prefix on the locator is load-bearing — it verifies the
  // <script> lives in <head>, not <body> (Lighthouse SEO + Google Rich
  // Results both prefer JSON-LD in <head>; RESEARCH Pitfall 2).
  // -------------------------------------------------------------------------
  test('/faq emits valid FAQPage JSON-LD with 5 questions in <head>', async ({ page }) => {
    await page.goto('/faq');

    const jsonLdScript = page.locator('head script[type="application/ld+json"]');
    await expect(jsonLdScript).toHaveCount(1);

    const jsonText = await jsonLdScript.textContent();
    expect(jsonText).toBeTruthy();

    const parsed = JSON.parse(jsonText as string);

    expect(parsed['@type']).toBe('FAQPage');
    expect(Array.isArray(parsed.mainEntity)).toBe(true);
    expect(parsed.mainEntity).toHaveLength(5);

    // Spot-check well-formedness of each Question/Answer entry
    for (const entry of parsed.mainEntity) {
      expect(entry['@type']).toBe('Question');
      expect(typeof entry.name).toBe('string');
      expect(entry.name.length).toBeGreaterThan(0);
      expect(entry.acceptedAnswer['@type']).toBe('Answer');
      expect(typeof entry.acceptedAnswer.text).toBe('string');
      expect(entry.acceptedAnswer.text.length).toBeGreaterThan(0);
    }
  });

});

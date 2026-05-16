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
 * Plan 25-01 (this file): creates the spec. The /faq tests turn green after
 * the /faq rewrite (Task 2). Documentation predicted the /thank-you and /404
 * axe tests would be RED until Plan 25-02; empirical finding during 25-01
 * execution is that BOTH pass on the v1 baseline (dev-server default 404
 * page passes axe; v1 thank-you also passes). The contract gate for 25-02
 * is therefore "no regression" — 25-02 must keep these green through its
 * own migration of /thank-you and creation of src/pages/404.astro. DO NOT
 * add .skip / .fixme — the regression-guard tests stay live.
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
  // Plan 25-01 documentation predicted this would fail until Plan 25-02
  // migrates /thank-you to BaseLayoutV2. EMPIRICAL FINDING during 25-01
  // execution: the current v1 /thank-you page already passes axe-core
  // (the v1 dark: utilities and Card variant="turquoise" don't produce
  // any WCAG violations on their own). Plan 25-02 must KEEP this green
  // through the migration — the contract gate is now "no regression",
  // not "turn red into green".
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
  // direct goto('/404') (RESEARCH Open Question 3).
  //
  // Plan 25-01 documentation predicted this would fail until Plan 25-02
  // creates src/pages/404.astro. EMPIRICAL FINDING during 25-01 execution:
  // Astro's dev-server default 404 page passes axe-core. Plan 25-02 must
  // KEEP this green when it ships the real /404 file.
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
  //
  // Note: BaseLayoutV2's SEO.astro already emits a Person schema JSON-LD in
  // <head> on every page. The /faq page additionally emits a FAQPage schema
  // via slot="head" (D-08). The presence of two <script type="application/
  // ld+json"> tags in <head> is therefore expected and correct; we filter to
  // the one whose parsed content has @type === 'FAQPage'.
  // -------------------------------------------------------------------------
  test('/faq emits valid FAQPage JSON-LD with 5 questions in <head>', async ({ page }) => {
    await page.goto('/faq');

    // All JSON-LD scripts in <head>. There may be multiple (Person from SEO,
    // FAQPage from this page). Both must live in <head>, not <body>.
    const jsonLdScripts = page.locator('head script[type="application/ld+json"]');
    const count = await jsonLdScripts.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Read every JSON-LD payload, parse, and locate the one with @type === 'FAQPage'.
    const payloads: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await jsonLdScripts.nth(i).textContent();
      if (text) payloads.push(text);
    }

    const faqPayloads = payloads
      .map((p) => {
        try {
          return JSON.parse(p);
        } catch {
          return null;
        }
      })
      .filter((parsed) => parsed && parsed['@type'] === 'FAQPage');

    // Exactly one FAQPage JSON-LD must be present in <head>.
    expect(faqPayloads).toHaveLength(1);
    const parsed = faqPayloads[0];

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

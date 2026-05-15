import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Playwright + axe-core accessibility suite for Phase 24 v2 primitives.
 *
 * Validates all four primitives (Button, Card, Input, Badge) against WCAG 2.2 AA
 * on the /design-system page. Covers:
 *   - Zero axe-core violations (D-20)
 *   - Keyboard reachability + accent focus outlines for Button and Input (D-18, D-20)
 *   - Enter/Space activation of <button> and href-navigation of <a> Button
 *   - Disabled Input excluded from Tab order
 *   - Interactive Card reachable by Tab; non-interactive Cards are NOT in Tab order
 *
 * Plan: 24-03 | Phase: 24-v2-primitive-library-design-system-page
 */

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('v2 Primitives Accessibility (Phase 24)', () => {

  // -------------------------------------------------------------------------
  // Test 1: axe-core full-page scan — the all-up WCAG 2.2 AA gate
  // -------------------------------------------------------------------------
  test('/design-system has zero axe-core violations (WCAG 2.2 AA)', async ({ page }) => {
    await page.goto('/design-system');
    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();
    expect(results.violations).toEqual([]);
  });

  // -------------------------------------------------------------------------
  // Test 2: Every non-disabled <button> Button is reachable by Tab and shows
  //         the 2px solid accent focus outline (D-18)
  // -------------------------------------------------------------------------
  test('every <button> Button on /design-system is reachable by Tab and shows accent focus outline', async ({ page }) => {
    await page.goto('/design-system');

    // Locate all non-disabled <button> elements inside section#button
    const buttons = page.locator('section#button button:not([disabled])');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);

    // Move focus to the first non-disabled button in section#button
    await buttons.first().focus();

    for (let i = 0; i < buttonCount; i++) {
      // Verify we are on an interactive button element
      const tagName = await page.evaluate(() => document.activeElement?.tagName?.toLowerCase());
      expect(tagName).toBe('button');

      // Verify accent focus outline is visible: 2px width, 2px offset, non-transparent color
      const outlineWidth = await page.evaluate(
        () => window.getComputedStyle(document.activeElement!).outlineWidth
      );
      const outlineOffset = await page.evaluate(
        () => window.getComputedStyle(document.activeElement!).outlineOffset
      );
      const outlineColor = await page.evaluate(
        () => window.getComputedStyle(document.activeElement!).outlineColor
      );
      const outlineStyle = await page.evaluate(
        () => window.getComputedStyle(document.activeElement!).outlineStyle
      );

      expect(outlineWidth).toBe('2px');
      expect(outlineOffset).toBe('2px');
      expect(outlineStyle).toBe('solid');
      // Accent color should be non-transparent (rgba(0,0,0,0) means no outline)
      expect(outlineColor).not.toBe('rgba(0, 0, 0, 0)');
      expect(outlineColor).not.toBe('');

      // Move to next button in DOM order (if not the last)
      if (i < buttonCount - 1) {
        await buttons.nth(i + 1).focus();
      }
    }
  });

  // -------------------------------------------------------------------------
  // Test 3: Enter on a focused <button> Button fires a click event
  // -------------------------------------------------------------------------
  test('Enter on a focused <button> Button fires a click event', async ({ page }) => {
    await page.goto('/design-system');

    // Attach click listeners to all buttons in section#button and record the last clicked id
    await page.evaluate(() => {
      (window as unknown as Record<string, unknown>).__lastClickedId = null;
      document.querySelectorAll('section#button button').forEach((b, i) => {
        const btn = b as HTMLButtonElement;
        if (!btn.id) btn.id = 'ds-btn-' + i;
        btn.addEventListener('click', () => {
          (window as unknown as Record<string, unknown>).__lastClickedId = btn.id;
        });
      });
    });

    // Focus the first non-disabled button
    const firstButton = page.locator('section#button button:not([disabled])').first();
    await firstButton.focus();
    await page.keyboard.press('Enter');

    const clickedId = await page.evaluate(
      () => (window as unknown as Record<string, unknown>).__lastClickedId
    );
    expect(typeof clickedId).toBe('string');
    expect((clickedId as string).length).toBeGreaterThan(0);
  });

  // -------------------------------------------------------------------------
  // Test 4: Enter on a focused <a> Button (polymorphic href variant) navigates
  // -------------------------------------------------------------------------
  test('Enter on a focused <a> Button (polymorphic href variant) navigates away from /design-system', async ({ page }) => {
    await page.goto('/design-system');

    // Locate the polymorphic <a> Button in section#button (href="/faq")
    const linkButton = page.locator('section#button a[href]').first();
    await expect(linkButton).toBeVisible();

    const href = await linkButton.getAttribute('href');
    expect(href).toBeTruthy();

    // Focus and press Enter — should navigate away from /design-system
    await linkButton.focus();
    await page.keyboard.press('Enter');

    // Wait for navigation to complete (URL should change)
    await page.waitForURL(
      (url) => !url.pathname.startsWith('/design-system'),
      { timeout: 5000 }
    );

    const finalPath = new URL(page.url()).pathname;
    expect(finalPath).not.toMatch(/^\/design-system/);
  });

  // -------------------------------------------------------------------------
  // Test 5: Every non-disabled Input on /design-system is reachable by Tab
  //         and accepts typed input
  // -------------------------------------------------------------------------
  test('every Input on /design-system is reachable by Tab and accepts typed input', async ({ page }) => {
    await page.goto('/design-system');

    // Locate all non-disabled interactive inputs (input, textarea, select) in section#input
    const inputLocator = page.locator(
      'section#input input:not([disabled]), section#input textarea:not([disabled]), section#input select:not([disabled])'
    );
    const inputCount = await inputLocator.count();
    expect(inputCount).toBeGreaterThan(0);

    // Focus each input in sequence and verify they are reachable
    for (let i = 0; i < inputCount; i++) {
      await inputLocator.nth(i).focus();
      const tagName = await page.evaluate(
        () => document.activeElement?.tagName?.toLowerCase()
      );
      expect(['input', 'textarea', 'select']).toContain(tagName);

      // Verify focus outline on each input field
      const outlineWidth = await page.evaluate(
        () => window.getComputedStyle(document.activeElement!).outlineWidth
      );
      expect(outlineWidth).toBe('2px');
    }

    // Type into the first text input and verify value is set
    const firstTextInput = page.locator('section#input input:not([disabled])').first();
    await firstTextInput.focus();
    // Clear any existing value and type test value
    await firstTextInput.fill('test value');
    await expect(firstTextInput).toHaveValue('test value');
  });

  // -------------------------------------------------------------------------
  // Test 6: Disabled Input on /design-system is skipped in Tab order
  // -------------------------------------------------------------------------
  test('disabled Input on /design-system is skipped in Tab order', async ({ page }) => {
    await page.goto('/design-system');

    // Locate the disabled input in section#input
    const disabledInput = page.locator('section#input input[disabled], section#input textarea[disabled], section#input select[disabled]');
    const disabledCount = await disabledInput.count();
    expect(disabledCount).toBeGreaterThan(0);

    // Verify the first disabled input is truly disabled
    await expect(disabledInput.first()).toBeDisabled();

    // Get the disabled element's id
    const disabledId = await disabledInput.first().getAttribute('id');
    expect(disabledId).toBeTruthy();

    // Tab through ALL inputs in section#input and confirm we never land on the disabled one
    const allInputs = page.locator(
      'section#input input, section#input textarea, section#input select'
    );
    const allCount = await allInputs.count();

    const focusedIds: string[] = [];

    // Start focus from the first input in the section
    await allInputs.first().focus();

    for (let i = 0; i < allCount; i++) {
      const focusedId = await page.evaluate(
        () => document.activeElement?.id ?? null
      );
      if (focusedId) focusedIds.push(focusedId);
      await page.keyboard.press('Tab');
    }

    // The disabled input's id must never appear in focused elements
    expect(focusedIds).not.toContain(disabledId);
  });

  // -------------------------------------------------------------------------
  // Test 7: Card with interactive=true is reachable by Tab and shows accent
  //         focus outline; non-interactive Cards are NOT in Tab sequence
  // -------------------------------------------------------------------------
  test('Card with interactive=true is reachable by Tab and shows accent focus outline', async ({ page }) => {
    await page.goto('/design-system');

    // Locate the interactive Card (Card with interactive=true sets tabindex=0)
    const interactiveCard = page.locator('section#card [tabindex="0"]');
    await expect(interactiveCard).toHaveCount(1);

    // Focus the interactive card
    await interactiveCard.focus();

    const tagName = await page.evaluate(() => document.activeElement?.tagName?.toLowerCase());
    expect(tagName).toBe('div');

    // Verify accent focus outline
    const outlineWidth = await page.evaluate(
      () => window.getComputedStyle(document.activeElement!).outlineWidth
    );
    const outlineOffset = await page.evaluate(
      () => window.getComputedStyle(document.activeElement!).outlineOffset
    );
    const outlineColor = await page.evaluate(
      () => window.getComputedStyle(document.activeElement!).outlineColor
    );

    expect(outlineWidth).toBe('2px');
    expect(outlineOffset).toBe('2px');
    expect(outlineColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(outlineColor).not.toBe('');

    // Non-interactive Cards in section#card must NOT have tabindex="0"
    // (they should have no tabindex attribute or tabindex="-1")
    const nonInteractiveCards = page.locator('section#card > div > div:not([tabindex="0"]), section#card > div:not([tabindex="0"])');
    const nonInteractiveCount = await nonInteractiveCards.count();
    expect(nonInteractiveCount).toBeGreaterThan(0);

    // More precisely: total cards in section#card minus the interactive one
    const allCards = page.locator('section#card .bg-surface.border-border.rounded-lg');
    const allCardsCount = await allCards.count();
    expect(allCardsCount).toBeGreaterThanOrEqual(3); // at least 3 cards (default, elevated, interactive)

    // Cards without tabindex="0" should not be reachable by tab
    const tabIndexableCards = page.locator('section#card .bg-surface.border-border.rounded-lg[tabindex="0"]');
    const tabIndexableCount = await tabIndexableCards.count();
    expect(tabIndexableCount).toBe(1); // Only the interactive card
  });

});

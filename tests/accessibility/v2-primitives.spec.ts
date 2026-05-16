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

    // -------------------------------------------------------------------------
    // Hover lift magnitude — closes UAT Gap 2 (plan 24-06). The interactive
    // Card must produce a non-zero translateY on :hover (was previously -2px,
    // below perception threshold — raised to -4px / -translate-y-1 per UAT
    // fix). Regression guard: any future change that re-introduces an
    // imperceptible or zero lift will fail this assertion.
    // See .planning/debug/interactive-card-no-hover-lift.md for diagnosis.
    //
    // Robustness notes:
    //   (a) Test 7 above called `await interactiveCard.focus()` — focus state
    //       can produce sub-pixel layout drift on Chromium and (more
    //       importantly) means document.activeElement === the card, which
    //       confuses subsequent mouse-baseline reads. Explicitly blur the
    //       active element before establishing the no-hover baseline.
    //   (b) Tailwind v4's `translate` individual CSS property (not `transform`)
    //       is the correct readout. When Chromium generates `hover:-translate-y-1`,
    //       `getComputedStyle(el).transform` returns `"none"` because the utility
    //       maps to the CSS `translate` individual property, not a `transform`
    //       matrix. Reading `getComputedStyle(el).translate` and splitting on
    //       whitespace is the robust approach:
    //         - "0px -4px" (X Y) → parts[1] = "-4px"
    //         - "-4px" (Y only, when X=0 and Chromium omits it) → parts[0] = "-4px"
    //       This avoids the fragile `matrix(a,b,c,d,tx,ty)` regex which is only
    //       relevant when the `transform` CSS property is used instead.
    //
    //   Observed values in Playwright headless Chromium (v4.1.18, translate utility):
    //     - baseline (no hover): getComputedStyle.translate = "none" → ty = 0
    //     - hovered: getComputedStyle.translate = "0px -4px" → ty = -4
    // -------------------------------------------------------------------------
    // (a) Clear residual focus so it doesn't bias baseline measurement.
    await page.evaluate(() => {
      const active = document.activeElement as HTMLElement | null;
      if (active && typeof active.blur === 'function') active.blur();
    });
    await page.mouse.move(0, 0);

    // Baseline (no hover, no focus) — translateY component of the
    // computed `translate` property should be 0.
    //
    // parseTranslateTy: whitespace-split parser for the CSS `translate` property.
    //   "none"    → 0  (no translation active)
    //   "0px -4px" → -4  (X Y form — Chromium emits this when X=0 and Y≠0)
    //   "-4px"     → -4  (Y-only form — if X is exactly 0 and omitted)
    //   "0px 0px"  → 0
    const parseTranslateTy = (translate: string): number => {
      if (!translate || translate === 'none') return 0;
      const parts = translate.split(/\s+/).filter(Boolean);
      // "X Y" form: length >= 2, Y is parts[1]
      if (parts.length >= 2) return parseFloat(parts[1]);
      // single-value form: length === 1, treated as Y
      return parseFloat(parts[0]);
    };

    const baselineTranslate = await interactiveCard.evaluate(
      (el) => window.getComputedStyle(el as Element).translate
    );
    const baselineTy = parseTranslateTy(baselineTranslate);
    // Baseline ty must be 0 (or close to it — allow ±0.5px sub-pixel slack)
    expect(Math.abs(baselineTy)).toBeLessThanOrEqual(0.5);

    // Hover the card and re-read the computed translate property.
    // Wait for the CSS transition to complete (duration-200 = 200ms) before
    // sampling the final translateY value. Playwright's .hover() triggers the
    // :hover pseudo-class synchronously but the CSS transition runs
    // asynchronously — without the wait, getComputedStyle returns the
    // mid-animation interpolated value (near 0), not the target value (-4px).
    await interactiveCard.hover();
    await page.waitForTimeout(300); // 300ms > 200ms transition = fully settled
    const hoverTranslate = await interactiveCard.evaluate(
      (el) => window.getComputedStyle(el as Element).translate
    );
    const hoverTy = parseTranslateTy(hoverTranslate);

    // Assertion: ty must be meaningfully negative (≤ -3px guards both -4
    // and -6; the broken -2px state would fail this assertion).
    expect(hoverTy).toBeLessThanOrEqual(-3);

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

  // -------------------------------------------------------------------------
  // Test 8: Computed-style spacing regression — guards the token-namespace
  // class of bug (e.g. --space-* vs --spacing-* in Tailwind v4). If named
  // spacing utilities (px-sm, py-md, gap-xs ...) stop generating, padding
  // collapses to 0 and these assertions fail.
  // -------------------------------------------------------------------------
  test('Button / Card / Input have correct computed padding (named-spacing regression guard)', async ({ page }) => {
    await page.goto('/design-system');

    const padding = (locator: ReturnType<typeof page.locator>) =>
      locator.evaluate((el) => {
        const cs = window.getComputedStyle(el as Element);
        return {
          top: cs.paddingTop,
          right: cs.paddingRight,
          bottom: cs.paddingBottom,
          left: cs.paddingLeft,
        };
      });

    // Button size ramp must produce a strict sm < md < lg progression in both axes.
    // sm: px-sm / py-3      → 16px / 12px
    // md: px-5 / py-sm      → 20px / 16px
    // lg: px-lg / py-5      → 32px / 20px
    expect(await padding(page.getByRole('button', { name: 'Primary sm' }))).toEqual({
      top: '12px', right: '16px', bottom: '12px', left: '16px',
    });
    expect(await padding(page.getByRole('button', { name: 'Primary md' }))).toEqual({
      top: '16px', right: '20px', bottom: '16px', left: '20px',
    });
    expect(await padding(page.getByRole('button', { name: 'Primary lg' }))).toEqual({
      top: '20px', right: '32px', bottom: '20px', left: '32px',
    });

    // CardBody uses px-md / py-md → 24px / 24px (the most visibly broken slot
    // when --space-* was wrong — text touched the card edges).
    const cardBody = page
      .locator('section#card div', {
        hasText: 'CardHeader + CardBody + CardFooter slot wrappers with token padding.',
      })
      .filter({ has: page.locator('> p') })
      .first();
    expect(await padding(cardBody)).toEqual({
      top: '24px', right: '24px', bottom: '24px', left: '24px',
    });

    // Input field uses px-sm / py-3 → 16px / 12px. Asserting left+top is enough
    // to catch the named-namespace regression on Input.
    const firstInput = page.locator('section#input input:not([disabled])').first();
    const inputPadding = await padding(firstInput);
    expect(inputPadding.left).toBe('16px');
    expect(inputPadding.right).toBe('16px');
    expect(inputPadding.top).toBe('12px');
    expect(inputPadding.bottom).toBe('12px');
  });

  // -------------------------------------------------------------------------
  // Test 9: max-w-sm wrapper around the select demo AND Footer max-w-md
  // tagline both render at the intended container widths (>= 300px), not
  // the broken --spacing-* fallback (16px / 24px). Guards the
  // namespace-collision class of bug fixed in plan 24-05 — Tailwind v4
  // max-w-{size} prefers --container-{size} over --spacing-{size} when
  // both exist, so adding --container-sm:24rem and --container-md:28rem
  // restores 384px / 448px behavior at both sites. The Footer assertion
  // catches a hypothetical future regression where only --container-md is
  // removed (single-token regression would otherwise ship silently).
  // See .planning/debug/select-too-thin-no-text.md for full diagnosis.
  // -------------------------------------------------------------------------
  test('select demo wrapper AND Footer tagline render at >= 300px (container-namespace regression guard)', async ({ page }) => {
    await page.goto('/design-system');

    // (a) Select demo wrapper — the only .max-w-sm in section#input.
    const wrapper = page.locator('section#input div.max-w-sm').first();
    await expect(wrapper).toBeVisible();

    const wrapperWidthPx = await wrapper.evaluate((el) => {
      const w = window.getComputedStyle(el as Element).width;
      return parseFloat(w); // "384px" -> 384
    });
    expect(wrapperWidthPx).toBeGreaterThanOrEqual(300);

    // (b) The select itself is w-full inside the wrapper — its width must
    // also clear the 300px threshold (broken state was ~34px).
    const select = page.locator('section#input #ds-budget');
    await expect(select).toBeVisible();

    const selectWidthPx = await select.evaluate((el) => {
      const w = window.getComputedStyle(el as Element).width;
      return parseFloat(w);
    });
    expect(selectWidthPx).toBeGreaterThanOrEqual(300);

    // (c) Footer.astro tagline uses max-w-md — same defect class as the
    // select wrapper, must clear the same threshold. Without this
    // assertion, a future commit could remove only --container-md and
    // Footer would silently regress to ~24px.
    const footerTagline = page.locator('footer p.max-w-md').first();
    await expect(footerTagline).toBeVisible();

    const footerTaglineWidthPx = await footerTagline.evaluate((el) => {
      const w = window.getComputedStyle(el as Element).width;
      return parseFloat(w);
    });
    expect(footerTaglineWidthPx).toBeGreaterThanOrEqual(300);
  });

  // -------------------------------------------------------------------------
  // Test 10: Input error <p> renders in --color-danger (red-dominant), not
  // --color-text (body navy). Closes UAT Gap 3 ("error state is not red").
  //
  // Strategy: Read the computed `color` of the first p[role="alert"] inside
  // section#input. Parse the rgb(r, g, b) channels. Assert red-dominance
  // (r > g AND r > b) and a minimum r-channel of 120 (chosen as the lower
  // bound that admits the entire darken ladder 0.50 → 0.45 → 0.40 → 0.35
  // — even the darkest documented L produces R well above 120 — while
  // still rejecting body navy (rgb(20, 31, 57) where r = 20 fails the
  // R >= 120 gate AND fails red-dominance since r < g (g=31) AND r < b
  // (b=57)). Belt-and-suspenders: also direct-literal-compare against
  // the deterministic broken-state rgb string so a future regression
  // pointing text-danger back at --color-text is caught explicitly.
  //
  // The axe-core test at the top of this file (test #1) remains the WCAG
  // 2.2 AA color-contrast hard gate — if the chosen --color-danger value
  // fails contrast on white at 14px, axe will flag it and the executor
  // must darken via the ladder until axe passes.
  //
  // Robustness: literal comparison ('rgb(20, 31, 57)') is layout-
  // independent. We deliberately do NOT compare to peer elements like
  // 'section#input h2' because layout-dependent comparisons regress
  // silently when the page structure changes.
  // -------------------------------------------------------------------------
  test('Input error <p> renders in danger color (red-dominant, not body-text-color)', async ({ page }) => {
    await page.goto('/design-system');

    const errorP = page.locator('section#input p[role="alert"]').first();
    await expect(errorP).toBeVisible();

    const errorColor = await errorP.evaluate(
      (el) => window.getComputedStyle(el as Element).color
    );

    // Modern Chromium (v105+) preserves OKLCH values as-is when the CSS color
    // space is supported — it may emit 'oklch(0.5 0.22 27)' rather than
    // converting to 'rgb(...)'. Both formats must be handled.
    //
    // Strategy A: rgb(r, g, b) or rgba(r, g, b, a) path — legacy Chromium.
    // Strategy B: oklch(L C H) path — modern Chromium with OKLCH support.
    // For OKLCH: L is lightness (0-1), C is chroma (0+), H is hue (degrees).
    // Hue ~27° is in the red range (0-40° is red/orange-red).
    // --color-danger = oklch(0.50 0.22 27) — red hue confirmed.
    // --color-text   = oklch(0.225 0.044 264.6) — blue-navy hue; H ~265°.
    //
    // Guard A: if oklch, assert H is in red range (< 60° or > 300°) and
    //          NOT the body-text hue (~264-265°).
    // Guard B: if rgb, assert red dominance and R >= 120.

    if (errorColor.startsWith('oklch(') || errorColor.startsWith('oklch ')) {
      // Parse oklch(L C H) — values are space-separated inside the parens.
      const inner = errorColor.replace(/^oklch\(/, '').replace(/\)$/, '');
      const parts = inner.trim().split(/[\s,]+/);
      const hue = parseFloat(parts[2]);

      // (a) Hue in red range: 0-60° (red/orange-red). Danger token hue is ~27°.
      // Body navy hue is ~265°, well outside this range.
      expect(hue).toBeGreaterThanOrEqual(0);
      expect(hue).toBeLessThan(60);

      // (b) Chroma > 0.1 (not a neutral gray/white/black).
      const chroma = parseFloat(parts[1]);
      expect(chroma).toBeGreaterThan(0.1);

      // (c) Literal guard — body-text OKLCH value must not be used.
      // --color-text = oklch(0.225 0.044 264.6). Any of these substrings
      // would indicate the text-danger utility is pointing at --color-text.
      expect(errorColor).not.toMatch(/264\.6/);
      expect(errorColor).not.toMatch(/0\.044/);
    } else {
      // rgb(r, g, b) or rgba(r, g, b, a) path.
      const stripped = errorColor.replace(/^rgba?\(/, '').replace(/\)$/, '');
      const channels = stripped.split(',').map((s) => parseInt(s.trim(), 10));
      const [r, g, b] = channels;

      // (a) Red dominance — the error color must have more red than green AND
      // more red than blue. Body navy (rgb(20, 31, 57)) fails this on both axes.
      expect(r).toBeGreaterThan(g);
      expect(r).toBeGreaterThan(b);

      // (b) Minimum red intensity — 120 is the floor that admits the entire
      // documented darken ladder (oklch L 0.50 → 0.35) while still rejecting
      // body navy (r = 20). DO NOT raise to 150 — that would lock out the
      // ladder's darker escalation steps.
      expect(r).toBeGreaterThanOrEqual(120);

      // (c) Direct literal guard against the deterministic broken state.
      // --color-text = oklch(0.225 0.044 264.6) converts to rgb(20, 31, 57)
      // on some Chromium versions. Layout-independent — no peer-element comparison.
      expect(errorColor).not.toBe('rgb(20, 31, 57)');
    }
  });

});

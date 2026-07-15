import type { Page } from '@playwright/test';

/**
 * Wait for all running animations to finish before running axe.
 * Entrance animations (e.g. Hero bento tiles with --delay up to 1.25s) leave
 * text mid-transition when axe samples colors, producing flaky color-contrast
 * failures that don't exist in the settled page.
 */
export async function settleAnimations(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await new Promise(requestAnimationFrame);
    const finite = document
      .getAnimations()
      .filter((a) => a.effect?.getTiming().iterations !== Infinity);
    await Promise.allSettled(finite.map((a) => a.finished));
  });
}

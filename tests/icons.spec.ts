import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for icon migration (lucide-static -> @lucide/astro).
 *
 * These tests capture footer icons on all main pages to ensure icons render
 * correctly after migration. First run generates baseline screenshots.
 *
 * Run: npx playwright test tests/icons.spec.ts
 * Update baselines: npx playwright test tests/icons.spec.ts --update-snapshots
 */

test.describe('Icon visual regression', () => {

  test('Homepage footer icons', async ({ page }) => {
    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Capture footer section
    const footer = page.locator('footer');
    await expect(footer).toHaveScreenshot('homepage-footer.png');
  });

  test('Projects page footer icons', async ({ page }) => {
    await page.goto('/projects');
    await page.waitForLoadState('networkidle');

    const footer = page.locator('footer');
    await expect(footer).toHaveScreenshot('projects-footer.png');
  });

  test('Blog page footer icons', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    const footer = page.locator('footer');
    await expect(footer).toHaveScreenshot('blog-footer.png');
  });

  test('Contact page icons', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Capture loading button area (contains Loader2 icon when loading)
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toHaveScreenshot('contact-submit-button.png');

    // Also capture footer
    const footer = page.locator('footer');
    await expect(footer).toHaveScreenshot('contact-footer.png');
  });

  test('Project detail page footer icons', async ({ page }) => {
    // Visit first project (any project works for footer verification)
    await page.goto('/projects');
    await page.waitForLoadState('networkidle');

    // Click first project card to navigate to detail page
    const firstProject = page.locator('.project-card.show').first();
    await firstProject.click();
    await page.waitForLoadState('networkidle');

    // Use role='contentinfo' to target main footer (not blockquote footer)
    const footer = page.getByRole('contentinfo');
    await expect(footer).toHaveScreenshot('project-detail-footer.png');
  });

  test('Blog post page footer icons', async ({ page }) => {
    // Visit first blog post (any post works for footer verification)
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Click first blog card to navigate to post
    const firstPost = page.locator('.blog-card.show').first();
    await firstPost.click();
    await page.waitForLoadState('networkidle');

    const footer = page.locator('footer');
    await expect(footer).toHaveScreenshot('blog-post-footer.png');
  });

});

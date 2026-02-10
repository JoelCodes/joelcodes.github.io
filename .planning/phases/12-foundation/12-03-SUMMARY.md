---
phase: 12-foundation
plan: 03
subsystem: testing
tags: [visual-regression, playwright, screenshots, icons, testing]
requires:
  - "12-01: Icon migration (@lucide/astro components)"
  - "v1.1: Accessibility test infrastructure (Playwright setup)"
provides:
  - "Visual regression tests for icon rendering"
  - "Baseline screenshots for all pages with icons"
  - "Snapshot tolerance configuration (maxDiffPixels: 100)"
affects:
  - "Future icon changes: Tests will catch visual regressions"
  - "CI/CD: Screenshot tests ensure icons render consistently"
tech-stack:
  added: []
  removed: []
  patterns:
    - "Visual regression testing with toHaveScreenshot API"
    - "Baseline snapshots stored in git for CI consistency"
    - "Role-based selectors (contentinfo) for semantic targeting"
key-files:
  created:
    - path: "tests/icons.spec.ts"
      impact: "6 visual regression tests for icon verification"
    - path: "tests/icons.spec.ts-snapshots/*.png"
      impact: "7 baseline screenshots (6 footers + 1 submit button)"
  modified:
    - path: "playwright.config.ts"
      impact: "Added snapshot tolerance for visual regression tests"
decisions:
  - id: "12-03-snapshot-tolerance"
    choice: "maxDiffPixels: 100 for anti-aliasing tolerance"
    rationale: "Allows minor rendering differences while catching significant regressions"
    alternatives: ["Pixel-perfect (0 diff)", "Higher tolerance (500+)"]
  - id: "12-03-footer-selector"
    choice: "Use role='contentinfo' for main footer on project pages"
    rationale: "Project detail pages have multiple <footer> elements (blockquote + main)"
    alternatives: ["CSS selectors", "data-testid attributes"]
metrics:
  duration: "2m 57s"
  tasks: 3
  commits: 3
  files_modified: 2
  files_created: 8
  tests_added: 6
  tests_passing: "6/6 icon visual regression tests"
completed: "2026-02-09"
---

# Phase 12 Plan 03: Icon Visual Regression Tests Summary

**One-liner:** Created Playwright visual regression tests with baseline screenshots to verify icon rendering after @lucide/astro migration.

## What Was Built

Visual regression test suite for icon verification using Playwright's screenshot comparison. Tests capture footer icons on all main pages (homepage, projects, blog, contact, project detail, blog post) plus the contact submit button spinner. Baseline screenshots stored in git ensure consistent icon rendering across environments and detect future regressions.

**Test coverage:**
- 6 test cases covering all pages with icons
- 7 baseline screenshots (6 footers + 1 submit button)
- Snapshot tolerance configured (100px diff) for anti-aliasing
- Tests pass consistently on re-run

## Tasks Completed

| # | Task | Commit | Result |
|---|------|--------|--------|
| 1 | Add snapshot config | 0213af9 | playwright.config.ts updated with maxDiffPixels: 100 |
| 2 | Create icon tests | 73e6cda | tests/icons.spec.ts with 6 test cases created |
| 3 | Generate baselines | a829507 | 7 baseline screenshots generated, all tests pass |

**Per-task details:**

### Task 1: Add snapshot configuration (0213af9)
- Added `expect.toHaveScreenshot.maxDiffPixels: 100` to playwright.config.ts
- Allows minor anti-aliasing differences between test runs
- Verified config is valid with `npm run build` and `npx playwright test --list`
- Config loads correctly, no TypeScript errors

### Task 2: Create icon screenshot tests (73e6cda)
- Created tests/icons.spec.ts with 6 test cases
- Tests cover: homepage, projects, blog, contact, project detail, blog post
- Each test waits for `networkidle` before capturing screenshot
- Contact page test captures both submit button (Loader2) and footer
- Tests use footer locator for main footer icons
- Playwright recognizes all 6 tests correctly

### Task 3: Generate baseline screenshots (a829507)
- Ran `npx playwright test tests/icons.spec.ts --update-snapshots`
- Generated 7 baseline screenshots in tests/icons.spec.ts-snapshots/
- Fixed project detail test to use `role='contentinfo'` (strict mode violation - multiple footer elements)
- All 6 tests pass on re-run with baselines
- Screenshots are OS-specific (chromium-darwin) for consistency

## Technical Changes

### Playwright Config Changes
```diff
+ expect: {
+   toHaveScreenshot: {
+     maxDiffPixels: 100,
+   },
+ },
```

### Test Structure
```typescript
test('Homepage footer icons', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const footer = page.locator('footer');
  await expect(footer).toHaveScreenshot('homepage-footer.png');
});
```

### Baseline Screenshots Generated
- `blog-footer-chromium-darwin.png` (39K)
- `blog-post-footer-chromium-darwin.png` (39K)
- `contact-footer-chromium-darwin.png` (39K)
- `contact-submit-button-chromium-darwin.png` (333B)
- `homepage-footer-chromium-darwin.png` (39K)
- `project-detail-footer-chromium-darwin.png` (39K)
- `projects-footer-chromium-darwin.png` (39K)

## Verification Results

### Config Verification
- ✅ playwright.config.ts has `expect.toHaveScreenshot.maxDiffPixels: 100`
- ✅ Config is valid TypeScript
- ✅ Playwright loads config correctly

### Test File Verification
- ✅ tests/icons.spec.ts exists with 6 test cases
- ✅ Tests cover all pages with icons (per user decision)
- ✅ Playwright recognizes all 6 tests

### Baseline Verification
- ✅ tests/icons.spec.ts-snapshots/ contains 7 PNG files
- ✅ All tests pass: `npx playwright test tests/icons.spec.ts`
- ✅ Screenshots committed to git for CI consistency

### Regression Detection
- ✅ Tests verify icon rendering matches baselines
- ✅ If icons change, tests will fail with visual diff
- ✅ Use `--update-snapshots` flag to accept intentional changes

## Decisions Made

### Snapshot Tolerance: 100px maxDiffPixels
**Context:** Screenshot tests can have minor pixel differences from font rendering, anti-aliasing, etc.

**Options considered:**
1. Pixel-perfect (0 diff) → Too strict, fails on minor rendering differences
2. maxDiffPixels: 100 → **Selected**
3. Higher tolerance (500+) → Too lenient, might miss real regressions

**Rationale:** 100px difference allows for anti-aliasing and minor rendering variations while still catching significant visual changes. Based on Playwright best practices.

### Footer Selector: role='contentinfo' for project pages
**Context:** Project detail pages have multiple `<footer>` elements (blockquote footer for testimonials + main page footer).

**Options considered:**
1. Generic `page.locator('footer')` → Fails with strict mode violation
2. CSS class selector `.border-t-[3px]` → Fragile, tied to styling
3. `page.getByRole('contentinfo')` → **Selected**
4. Add data-testid attributes → Over-engineering for this case

**Rationale:** Semantic role selector targets the main footer reliably without adding test-specific markup. More maintainable than CSS selectors.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed project detail footer selector for strict mode**
- **Found during:** Task 3 (baseline generation)
- **Issue:** Project detail page has 2 `<footer>` elements (blockquote + main), causing strict mode violation
- **Fix:** Changed from `page.locator('footer')` to `page.getByRole('contentinfo')` for semantic targeting
- **Files modified:** tests/icons.spec.ts
- **Commit:** a829507 (included in Task 3 commit)

**Root cause:** Blockquote elements in testimonials use `<footer>` tag for attribution, which conflicts with main page footer. Playwright's strict mode correctly caught this ambiguity.

## Known Issues

None. All tests pass, screenshots captured correctly.

## Next Phase Readiness

**Ready for Phase 12 completion:** Visual regression tests ensure icon migration (12-01) maintains rendering quality across all pages. Tests will catch any future icon rendering issues.

**CI/CD considerations:**
- Screenshot tests are OS-specific (chromium-darwin)
- If GitHub Actions uses different OS, screenshots may need regeneration
- Playwright's `maxDiffPixels: 100` provides some cross-platform tolerance
- Consider using `toMatchSnapshot({ threshold: 0.2 })` if cross-platform issues arise

**Baseline update process:**
```bash
# When icons intentionally change:
npx playwright test tests/icons.spec.ts --update-snapshots

# Verify new baselines:
npx playwright test tests/icons.spec.ts

# Commit updated screenshots:
git add tests/icons.spec.ts-snapshots/
git commit -m "test: update icon baseline screenshots"
```

**Future icon additions:**
- New icons will automatically be tested via existing page tests
- No new tests needed unless new pages are added
- Baselines capture full footer, so new icons appear in existing screenshots

## Blockers

None.

## Dependencies for Future Work

**Visual regression infrastructure established:**
- Pattern can be extended for other visual elements (isometric illustrations, etc.)
- Snapshot configuration applies to all future screenshot tests
- CI pipeline should run icon tests on every PR

**For Phase 14-15 (Isometric Illustrations):**
- Can add visual regression tests for illustration rendering
- Same snapshot tolerance (100px) appropriate for SVG illustrations
- Consider separate test files for illustration-specific tests

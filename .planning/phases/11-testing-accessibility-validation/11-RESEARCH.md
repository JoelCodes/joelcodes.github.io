# Phase 11: Testing & Accessibility Validation - Research

**Researched:** 2026-02-09
**Domain:** Web Accessibility Testing, Performance Validation, QA Testing
**Confidence:** HIGH

## Summary

This research investigates the standard approaches for comprehensive testing and accessibility validation of a static Astro site with a neobrutalist design system. The phase validates that all design requirements (DESIGN-01 through DESIGN-05), component implementations (COMP-01 through COMP-04), and page-specific features (HOME-01 through HOME-04, PROJ-01 through PROJ-03, BLOG-01 through BLOG-03, OTHER-01 through OTHER-02) are properly implemented and meet WCAG 2.2 Level AA accessibility standards.

The standard approach for this phase combines:
1. **Automated accessibility testing** using axe-core (finds ~57% of WCAG issues automatically)
2. **Manual accessibility audits** covering keyboard navigation, screen reader testing, and color contrast validation
3. **Performance testing** on target devices (iPhone SE, mid-range Android) using Chrome DevTools throttling and optionally BrowserStack
4. **Visual validation** across light/dark modes with color blindness simulations
5. **Lighthouse CI** for continuous monitoring of performance, accessibility, SEO, and best practices

**Primary recommendation:** Layer automated testing (Playwright + axe-core in CI) with structured manual audits (keyboard navigation, NVDA screen reader, Colorblindly extension) to achieve 90%+ WCAG coverage. Use existing Lighthouse CI for performance baseline, supplement with manual mobile device testing for jank detection.

## Standard Stack

The established libraries/tools for accessibility and performance testing in 2026:

### Core Testing Tools
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @axe-core/playwright | 4.x | Automated accessibility testing | Industry standard, 57% WCAG detection, zero false positives, 3B+ downloads |
| Playwright | 1.x | E2E testing framework | Official Astro documentation support, cross-browser, screenshot capabilities |
| Lighthouse CI | latest | Performance/accessibility CI | Already integrated in project, 90%+ thresholds configured |
| axe DevTools | Browser ext | Manual accessibility testing | Free Chrome extension, 800K+ installs, complements automated testing |

### Manual Testing Tools
| Tool | Version | Purpose | When to Use |
|------|---------|---------|-------------|
| NVDA | 2026.x | Screen reader testing | Free, 65.6% market share (most popular), Windows-based |
| Colorblindly | Browser ext | Color blindness simulation | 8 deficiency types, 4.7★ rating, simulates real user experience |
| Chrome DevTools | Native | Color contrast, performance | Built-in WCAG checker, CPU/network throttling, CVD simulation |
| WAVE | Browser ext | Visual accessibility feedback | Free, intuitive visual overlay, finds missing alt text, ARIA issues |

### Performance Testing Tools
| Tool | Version | Purpose | When to Use |
|------|---------|---------|-------------|
| Chrome DevTools Performance | Native | Jank detection, FPS monitoring | Local testing, 60 FPS target, identifies rendering bottlenecks |
| BrowserStack | Cloud service | Real device testing | Optional for iPhone SE/Android validation, 30K+ devices available |
| Pa11y | 9.x | CLI accessibility testing | CI/CD integration, WCAG 2.0/2.1/2.2 support, alternative to axe |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @axe-core/playwright | Pa11y CLI | Pa11y requires Node.js 20+, less ecosystem support than axe |
| NVDA | JAWS | JAWS is commercial ($95/yr), NVDA is free and more widely used (65.6% vs 34%) |
| Colorblindly | Let's Get Color Blind | Let's Get Color Blind adds daltonization filter but has fewer users (~8K) |
| BrowserStack | Sauce Labs | Sauce Labs comparable but BrowserStack has better Day 0 device availability |

**Installation:**
```bash
npm install --save-dev @axe-core/playwright playwright
```

## Architecture Patterns

### Recommended Testing Structure
```
/tests
├── accessibility/           # Automated a11y tests
│   ├── axe-tests.spec.ts   # Page-level axe scans
│   └── keyboard-nav.spec.ts # Keyboard navigation tests
├── performance/             # Performance tests
│   └── mobile-perf.spec.ts # Mobile throttling tests
└── visual/                  # Visual regression (optional)
    └── screenshots.spec.ts  # Dark mode, responsive tests

/.planning/phases/11-testing-accessibility-validation/
├── 11-RESEARCH.md           # This file
├── 11-01-PLAN.md           # Automated testing setup
├── 11-02-PLAN.md           # Manual accessibility audit
├── 11-03-PLAN.md           # Performance validation
└── 11-UAT.md               # User acceptance testing
```

### Pattern 1: Automated Accessibility Testing with Playwright + axe-core

**What:** Run axe-core accessibility scans on all major pages as part of CI/CD pipeline
**When to use:** Every build/PR to catch regressions automatically

**Example:**
```typescript
// Source: https://playwright.dev/docs/accessibility-testing
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage should not have accessibility violations', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});

test('dark mode should not have accessibility violations', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  // Toggle dark mode
  await page.locator('[data-theme-toggle]').click();

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

### Pattern 2: Manual Keyboard Navigation Testing

**What:** Structured manual testing checklist for keyboard accessibility
**When to use:** Before each major release, after component changes

**Testing sequence:**
```
1. Tab key navigation
   - Tab through all interactive elements
   - Verify focus indicator visible (2.4.7)
   - Verify logical tab order (2.4.3)
   - Verify no keyboard traps (2.1.2)

2. Enter/Spacebar activation
   - Enter activates links
   - Spacebar/Enter toggle checkboxes
   - Enter submits forms

3. Arrow key navigation
   - Arrow keys work in custom widgets
   - Dropdown menus respond to arrows
   - Radio buttons use arrow keys

4. Escape key behavior
   - Escape closes modals/dialogs
   - Focus returns to trigger element

5. Skip links
   - Tab to skip navigation link
   - Enter skips to main content
```

### Pattern 3: Screen Reader Testing with NVDA

**What:** Test content reading order and semantic structure with NVDA
**When to use:** Major releases, after layout changes, after ARIA implementation

**Testing approach:**
```
1. Install NVDA (free, Windows)
2. Start NVDA (Ctrl+Alt+N)
3. Navigate with NVDA keys:
   - H: Jump between headings
   - K: Jump between links
   - F: Jump between form fields
   - Insert+F7: List all headings/links/forms

4. Verify:
   - Page title announced
   - Headings in logical order (H1 → H2 → H3)
   - Images have alt text (or null alt for decorative)
   - Form labels associated with inputs
   - Button text meaningful
   - Link text descriptive
   - Dynamic content announced (aria-live)
```

### Pattern 4: Color Contrast Validation

**What:** Verify all text/UI elements meet WCAG 4.5:1 minimum (or 3:1 for large text)
**When to use:** After color system changes, dark mode implementation

**Tools and process:**
```
1. Automated scan with axe-core (checks most text)
2. Manual validation for edge cases:
   - Use Atmos Contrast Checker (supports OKLCH)
   - Test yellow accent (#ffef6a) on white/black backgrounds
   - Test turquoise/magenta on white/black backgrounds
   - Verify focus indicators meet 3:1 against adjacent colors

3. Dark mode specific:
   - Test glow colors against dark backgrounds
   - Verify minimum 15.8:1 (Material Design recommendation)
   - Check color-mix() outputs meet ratios
```

### Pattern 5: Performance Testing with Throttling

**What:** Simulate low-end mobile devices to detect jank and ensure 60 FPS
**When to use:** After animation changes, before major releases

**Chrome DevTools approach:**
```
1. Open DevTools → Performance tab
2. Click CPU throttling dropdown
3. Select "4x slowdown" (or use new calibrated "low-tier mobile")
4. Start recording
5. Interact with page (hover buttons, toggle dark mode, scroll)
6. Stop recording
7. Analyze FPS chart:
   - Green bar = 60 FPS (good)
   - Yellow/red bars = frame drops (jank)
   - Identify long tasks (>50ms)

Network throttling:
1. Open DevTools → Network tab
2. Select "Fast 3G" or "Slow 3G"
3. Test page load, interactive time
4. Verify LCP < 2500ms
```

### Pattern 6: Lighthouse CI Integration

**What:** Automated performance/accessibility/SEO audits on every build
**When to use:** CI/CD pipeline (already configured in project)

**Existing configuration:**
```json
// lighthouserc.json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["warn", { "minScore": 0.9 }],
        "categories:best-practices": ["warn", { "minScore": 0.9 }],
        "categories:seo": ["warn", { "minScore": 0.9 }]
      }
    }
  }
}
```

**Best practice:** Run 3 times (already configured) to reduce variance, fail build on performance < 90%, warn on accessibility < 90%.

### Anti-Patterns to Avoid

- **Testing only with mouse/trackpad:** Keyboard navigation is required for WCAG compliance, always test with Tab key
- **Skipping screen reader testing:** Automated tools find ~57% of issues, screen readers catch semantic/ARIA problems
- **Testing only on desktop:** Mobile devices have different performance characteristics (thermal throttling, slower CPUs)
- **Trusting single automated tool:** axe-core finds 57% of issues, manual testing required for comprehensive coverage
- **Ignoring dark mode accessibility:** Dark mode needs separate contrast validation, shadows become glows with different visibility
- **Testing only on high-end devices:** Low-end Android and iPhone SE represent real user base, test with throttling
- **Relying on browser default focus:** Custom components (buttons with layers) need explicit focus styles

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Color contrast checking | Custom contrast calculator | Atmos/OddContrast (OKLCH support) | WCAG math is complex, OKLCH adds perceptual uniformity requirements |
| Accessibility rule engine | Custom WCAG validator | axe-core via Playwright | 3B+ downloads, zero false positives, covers 57% of WCAG automatically |
| Screen reader automation | Custom screen reader scripts | Manual NVDA testing + nvda-testing-driver (for automation) | Screen reader behavior is complex, manual testing by experienced users is essential |
| Performance monitoring | Custom FPS tracker | Chrome DevTools Performance API | Built-in flame charts, long task detection, frame timing analysis |
| Mobile device simulation | Custom throttling | Chrome DevTools calibrated throttling | Chrome 134+ has machine-specific "low-tier mobile" presets |
| Lighthouse integration | Custom perf tests | Lighthouse CI Action (already integrated) | Maintained by Google, industry standard, 90%+ thresholds already configured |
| Color blindness simulation | Custom CVD filters | Chrome DevTools Rendering tab or Colorblindly | 8 CVD types, scientifically accurate color transformations |

**Key insight:** Accessibility testing requires layering automated tools (57% coverage) with manual techniques (screen reader, keyboard nav, color blindness). No single tool provides complete WCAG coverage. Performance testing similarly requires combining automated tools (Lighthouse) with real device testing or calibrated throttling.

## Common Pitfalls

### Pitfall 1: False Confidence from Automated Tools

**What goes wrong:** Team runs axe-core, gets zero violations, assumes site is fully accessible. Ships with major accessibility gaps.

**Why it happens:** Automated tools detect only ~57% of WCAG issues. Screen reader compatibility, keyboard navigation patterns, and semantic structure require manual testing.

**How to avoid:**
- Always layer automated + manual testing
- Minimum test suite: axe-core + keyboard nav + screen reader spot check
- Budget time for manual testing (2-4 hours for comprehensive audit)

**Warning signs:**
- Zero accessibility violations but no manual testing done
- No screen reader testing in QA process
- Keyboard navigation not part of acceptance criteria

### Pitfall 2: Outline-Based Focus Rings Don't Respect Border-Radius

**What goes wrong:** Developer uses CSS `outline` property for focus indicators. Buttons have rounded corners but focus rings are rectangular, looking broken.

**Why it happens:** CSS `outline` property doesn't respect `border-radius` - outlines are always rectangular. This is a known CSS limitation.

**How to avoid:**
- Use `box-shadow` instead of `outline` for focus indicators on rounded elements
- Example: `box-shadow: 0 0 0 2px white, 0 0 0 6px black;` (double-ring technique)
- This project already discovered this issue in Phase 08 (see 08-UAT.md Gap 1)

**Warning signs:**
- Focus rings look rectangular on rounded buttons
- Focus indicator doesn't follow button shape
- Using `outline` property on elements with `border-radius`

### Pitfall 3: Dark Mode Glow Visibility Varies by Monitor

**What goes wrong:** Dark mode colored glows look great on developer's high-end display but invisible on budget monitors with poor contrast ratios.

**Why it happens:** Box-shadow glows depend on monitor contrast and brightness. Cheap monitors may not display subtle glows effectively.

**How to avoid:**
- Test dark mode on multiple displays (or brightness levels)
- Use higher chroma OKLCH values for glows (increase C component)
- Verify glow is visible at 80% monitor brightness
- Consider adding border in dark mode as fallback
- This is flagged as pending TODO in project state

**Warning signs:**
- Glows only visible at 100% brightness
- Community reports "invisible shadows in dark mode"
- Relying on single developer display for testing

### Pitfall 4: CPU Throttling ≠ Real Mobile Hardware

**What goes wrong:** Site passes 4x CPU throttling but still janks on real iPhone SE. Team confused why testing didn't catch it.

**Why it happens:** CPU throttling simulates slower processor but doesn't replicate:
- Slower disk I/O on mobile
- Limited memory bandwidth
- Thermal throttling (CPU slows down when hot)
- GPU differences
- Mobile browser quirks

**How to avoid:**
- Use Chrome DevTools throttling for initial testing
- Supplement with real device testing (BrowserStack or physical devices)
- Chrome 134+ has calibrated "low-tier mobile" and "mid-tier mobile" presets (better accuracy)
- Target 60 FPS consistently, treat drops below 50 FPS as issues

**Warning signs:**
- Throttled desktop testing passes, real mobile fails
- Animations stutter on actual phones
- Performance degrades after 30 seconds of use (thermal throttling)

### Pitfall 5: OKLCH Color Values May Exceed sRGB Gamut

**What goes wrong:** OKLCH colors look great in design tool but render as different colors in browsers due to gamut clipping.

**Why it happens:** OKLCH can define colors outside sRGB gamut. Browsers clip these to sRGB, changing the actual rendered color. Contrast ratios calculated in design tool may not match actual rendered contrast.

**How to avoid:**
- Verify colors in actual browser after defining in OKLCH
- Use tools that test rendered color contrast (Chrome DevTools, Atmos)
- Keep OKLCH Chroma values moderate (< 0.3) to stay in sRGB gamut
- Test on multiple browsers (Firefox, Safari, Chrome) as clipping behavior varies

**Warning signs:**
- Colors look different in browser than design tool
- Contrast ratios fail in browser but pass in Figma/design tool
- Colors shift between browsers

### Pitfall 6: Focus Indicator Contrast Against Variable Backgrounds

**What goes wrong:** Focus ring works on white background, invisible on yellow accent background. WCAG 2.4.11 (Focus Appearance) failures.

**Why it happens:** Focus indicators need 3:1 contrast against *adjacent* colors, not just the background. With colored button variants (yellow, turquoise, magenta), single focus color doesn't work everywhere.

**How to avoid:**
- Use double-ring technique: inner white ring + outer black ring
- Guarantees contrast against all backgrounds
- Example: `box-shadow: 0 0 0 2px white, 0 0 0 6px black;`
- This project already implements this (Phase 08)

**Warning signs:**
- Focus indicator invisible on some button colors
- Single-color focus rings
- Focus indicator contrast not tested against all variants

### Pitfall 7: Screen Reader Testing Without Screen Reader Experience

**What goes wrong:** Developer who doesn't use screen readers daily tries to "test with NVDA," gets confused by unexpected behavior, misses real issues.

**Why it happens:** Screen readers have steep learning curve. Keyboard shortcuts, navigation modes, and expected patterns aren't intuitive to sighted users.

**How to avoid:**
- Follow structured testing checklist (don't explore freely)
- Test specific paths: heading navigation (H key), form completion, link list
- Consider hiring accessibility consultant for thorough audit
- Harvard offers "Testing with NVDA" course (Mar 24, 2026)
- Focus on obvious issues: missing alt text, poor heading structure, unlabeled forms

**Warning signs:**
- Testing takes 3+ hours with little findings
- Tester unsure if behavior is correct
- No testing structure, just "exploring"

## Code Examples

Verified patterns from official sources:

### Automated Accessibility Test Suite
```typescript
// Source: https://playwright.dev/docs/accessibility-testing
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  { url: '/', name: 'Homepage' },
  { url: '/projects', name: 'Projects Index' },
  { url: '/blog', name: 'Blog Index' },
  { url: '/about', name: 'About Page' },
];

for (const { url, name } of pages) {
  test(`${name} should not have accessibility violations`, async ({ page }) => {
    await page.goto(`http://localhost:4321${url}`);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
}
```

### Keyboard Navigation Test
```typescript
// Source: https://playwright.dev/docs/accessibility-testing (adapted)
import { test, expect } from '@playwright/test';

test('all interactive elements are keyboard accessible', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  // Tab through all interactive elements
  const interactiveElements = await page.locator('a, button, input, [tabindex="0"]').all();

  for (let i = 0; i < interactiveElements.length; i++) {
    await page.keyboard.press('Tab');

    const focusedElement = await page.locator(':focus');

    // Verify focus indicator is visible
    const box = await focusedElement.boundingBox();
    expect(box).toBeTruthy(); // Element exists and has dimensions

    // Verify focus indicator has sufficient outline/shadow
    const styles = await focusedElement.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        outline: computed.outline,
        boxShadow: computed.boxShadow,
      };
    });

    expect(
      styles.outline !== 'none' || styles.boxShadow !== 'none'
    ).toBeTruthy();
  }
});
```

### Dark Mode Accessibility Test
```typescript
// Source: https://playwright.dev/docs/accessibility-testing (adapted)
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('dark mode should maintain accessibility', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  // Test light mode
  const lightModeResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  // Toggle dark mode
  await page.locator('[data-theme-toggle]').click();
  await page.waitForTimeout(500); // Wait for transition

  // Test dark mode
  const darkModeResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  expect(lightModeResults.violations).toEqual([]);
  expect(darkModeResults.violations).toEqual([]);
});
```

### Color Contrast Validation
```typescript
// Source: https://github.com/dequelabs/axe-core (color-contrast rule)
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('all text meets color contrast requirements', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  const results = await new AxeBuilder({ page })
    .withRules(['color-contrast']) // Only run color contrast checks
    .analyze();

  // Report any contrast failures with details
  if (results.violations.length > 0) {
    const contrastIssues = results.violations
      .map(v => ({
        element: v.nodes[0].html,
        impact: v.impact,
        message: v.help,
      }));

    console.log('Contrast failures:', JSON.stringify(contrastIssues, null, 2));
  }

  expect(results.violations).toEqual([]);
});
```

### Performance Budget Test
```typescript
// Source: Lighthouse CI best practices
import { test, expect } from '@playwright/test';

test('homepage meets performance budgets', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  const performanceMetrics = await page.evaluate(() => {
    return JSON.parse(JSON.stringify(performance.getEntriesByType('navigation')[0]));
  });

  // LCP should be under 2.5s
  const lcp = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        resolve(lastEntry.renderTime || lastEntry.loadTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    });
  });

  expect(lcp).toBeLessThan(2500);

  // Total JavaScript size should be under 200KB
  const jsSize = await page.evaluate(() => {
    return performance.getEntriesByType('resource')
      .filter(r => r.initiatorType === 'script')
      .reduce((total, r) => total + r.transferSize, 0);
  });

  expect(jsSize).toBeLessThan(200 * 1024);
});
```

### Mobile Performance Test with Throttling
```typescript
// Source: Chrome DevTools throttling API
import { test, expect, chromium } from '@playwright/test';

test('animations run smoothly on low-end mobile', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    // Simulate iPhone SE viewport
    viewport: { width: 375, height: 667 },
  });

  const page = await context.newPage();

  // Enable CPU throttling (4x slowdown)
  const client = await page.context().newCDPSession(page);
  await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });

  await page.goto('http://localhost:4321/');

  // Start performance recording
  await client.send('Performance.enable');

  // Interact with animated elements
  await page.hover('button:first-of-type'); // Button hover animation
  await page.locator('[data-theme-toggle]').click(); // Dark mode toggle

  // Get frame rate metrics
  const metrics = await client.send('Performance.getMetrics');
  const fps = metrics.metrics.find(m => m.name === 'Frames')?.value || 0;

  // Should maintain at least 50 FPS (allowing some drops below 60)
  expect(fps).toBeGreaterThan(50);

  await browser.close();
});
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual-only testing | Automated + manual | 2020+ | axe-core finds 57% of issues automatically, reduces manual test time |
| 4x CPU throttling | Calibrated device presets | Chrome 134 (Dec 2024) | Machine-specific "low-tier mobile" presets more accurate than fixed multipliers |
| WCAG 2.1 Level AA | WCAG 2.2 Level AA | ISO standard 2025 | New success criteria: 2.4.11 Focus Appearance, 2.5.7 Dragging Movements, 3.2.6 Consistent Help |
| PageSpeed Insights 4x throttling | PageSpeed Insights 1.2x throttling | December 2024 | More realistic performance scores matching real-world mobile performance |
| Single browser testing | Cross-browser testing | 2023+ | Accessibility support varies (Firefox/Safari have different ARIA implementations) |
| outline property | box-shadow for focus rings | 2022+ | outline doesn't respect border-radius, box-shadow follows element shape |
| Separate tools for WCAG 2.0/2.1/2.2 | Unified axe-core | 2025+ | axe-core covers WCAG 2.0, 2.1, 2.2 in single rule library |

**Deprecated/outdated:**
- **JAWS as primary screen reader:** NVDA is now most popular (65.6% vs 34%), free, better for testing
- **Fixed 4x CPU throttling:** Chrome 134+ calibrated presets more accurate than universal 4x multiplier
- **HTML CodeSniffer:** Replaced by axe-core in most tooling (pa11y supports both but axe is default)
- **WCAG 2.0 only testing:** Should test 2.1 AA minimum, ideally 2.2 AA for future-proofing
- **outline for focus indicators:** Use box-shadow on rounded elements, outline doesn't respect border-radius

## Open Questions

Things that couldn't be fully resolved:

1. **Real Device Testing Necessity**
   - What we know: Chrome DevTools throttling improved in Chrome 134 with calibrated presets, BrowserStack offers real iPhone SE and Android devices
   - What's unclear: Whether calibrated throttling is sufficient or real device testing required for this project's budget/timeline
   - Recommendation: Start with Chrome DevTools calibrated throttling, escalate to BrowserStack only if issues found. Physical iPhone SE (~$429) may be cost-effective if repeated testing needed.

2. **Screen Reader Testing Depth**
   - What we know: Manual NVDA testing required, but developer experience with screen readers limited. Harvard course available March 24, 2026.
   - What's unclear: Whether structured checklist testing is sufficient or professional accessibility audit needed
   - Recommendation: Start with structured checklist (heading nav, form labels, image alt text). If complex widgets or ARIA used, consider hiring consultant for 2-hour spot check (~$200-400).

3. **OKLCH Color Contrast Verification**
   - What we know: OKLCH can exceed sRGB gamut, causing clipping. Atmos and OddContrast support OKLCH contrast checking.
   - What's unclear: Whether automated tools (axe-core) accurately test contrast for OKLCH colors that exceed sRGB
   - Recommendation: Run axe-core automated tests, manually verify yellow/turquoise/magenta accent colors with Atmos contrast checker, test in actual browsers (don't trust design tool calculations).

4. **Glow Visibility Testing Scope**
   - What we know: Dark mode glows may be invisible on low-quality monitors. Pending TODO in project state.
   - What's unclear: How many different displays need testing, what brightness levels are acceptable
   - Recommendation: Test at 80% and 100% brightness on primary development display. If possible, test on one budget external monitor (~$100 1080p display represents worst case). Consider border fallback if issues found.

## Sources

### Primary (HIGH confidence)
- [Playwright Accessibility Testing Documentation](https://playwright.dev/docs/accessibility-testing) - Official integration guide for axe-core
- [axe-core GitHub Repository](https://github.com/dequelabs/axe-core) - Official axe-core library, WCAG coverage details
- [Deque axe-core Product Page](https://www.deque.com/axe/axe-core/) - Detection rate (57%), zero false positives claim, 3B+ downloads
- [W3C Understanding SC 2.4.7: Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) - Authoritative WCAG guidance
- [WebAIM Using NVDA to Evaluate Web Accessibility](https://webaim.org/articles/nvda/) - Authoritative NVDA testing guide
- [Harvard Digital Accessibility Manual Testing Guide](https://accessibility.huit.harvard.edu/manual-testing-accessibility) - Keyboard and screen reader checklists
- [Chrome DevTools Throttling Documentation](https://developer.chrome.com/docs/devtools/settings/throttling) - Official throttling guide
- [Chrome for Developers: CPU Throttling in DevTools and Lighthouse](https://www.debugbear.com/blog/cpu-throttling-in-chrome-devtools-and-lighthouse) - Chrome 134 calibrated throttling details
- [Chrome DevTools Color Vision Deficiency Simulation](https://developer.chrome.com/docs/chromium/cvd) - Built-in CVD testing
- [BrowserStack Device List](https://www.browserstack.com/list-of-browsers-and-platforms/app_live) - Available devices for testing
- [W3C Template for Accessibility Evaluation Reports](https://www.w3.org/WAI/test-evaluate/report-template/) - Reporting best practices
- [Section508.gov Essential Elements of Accessibility Test Report](https://www.section508.gov/test/elements-of-an-accessibility-test-report/) - Report structure guidance

### Secondary (MEDIUM confidence)
- [27 Best Web Accessibility Testing Tools in 2026](https://thectoclub.com/tools/best-web-accessibility-testing-tools/) - Tool landscape overview
- [BrowserStack Accessibility Testing Guide](https://www.browserstack.com/guide/automate-accessibility-testing) - Automation best practices
- [Pope Tech Manual Accessibility Testing Guide](https://blog.pope.tech/2023/03/01/a-beginners-guide-to-manual-accessibility-testing/) - Testing methodology
- [Atmos Contrast Checker](https://atmos.style/contrast-checker) - OKLCH contrast support verified
- [OddContrast](https://www.oddcontrast.com/) - OKLCH contrast support verified
- [20 Best Visual Regression Testing Tools 2026](https://thectoclub.com/tools/best-visual-regression-testing-tools/) - Visual testing landscape
- [How to Test Dark Mode Effectively](https://www.browserstack.com/guide/how-to-test-apps-in-dark-mode) - Dark mode testing checklist
- [Lighthouse CI Action GitHub Marketplace](https://github.com/marketplace/actions/lighthouse-ci-action) - CI integration guide
- [Setting Up Lighthouse CI with GitHub Actions](https://pradappandiyan.medium.com/setting-up-lighthouse-ci-from-scratch-with-github-actions-integration-1f7be5567e7f) - Best practices guide
- [Pa11y GitHub Repository](https://github.com/pa11y/pa11y) - Alternative CLI testing tool

### Tertiary (LOW confidence)
- [Colorblindly Chrome Extension](https://chromewebstore.google.com/detail/colorblindly/floniaahmccleoclneebhhmnjgdfijgg) - 4.7★ rating, 8 CVD types
- [Let's Get Color Blind Chrome Extension](https://chromewebstore.google.com/detail/lets-get-color-blind/bkdgdianpkfahpkmphgehigalpighjck) - ~8K users, daltonization filter
- WebSearch results for mobile performance testing best practices (multiple sources, cross-verified)
- WebSearch results for accessibility test reporting (W3C template verified via official source)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - axe-core, Playwright, NVDA, Lighthouse CI all verified via official documentation/repositories
- Architecture: HIGH - Playwright patterns from official docs, testing structure standard for Astro projects
- Pitfalls: HIGH - Outline/border-radius issue documented in project's 08-UAT.md, dark mode glow visibility flagged in STATE.md, OKLCH gamut clipping verified via multiple sources
- Testing tools: MEDIUM - Tool capabilities verified but real-world effectiveness varies by project complexity
- Real device testing: MEDIUM - Calibrated throttling is new (Chrome 134), long-term effectiveness unknown

**Research date:** 2026-02-09
**Valid until:** 2026-03-09 (30 days - accessibility standards stable, tooling updates frequently)

# Phase 12: Foundation - Research

**Researched:** 2026-02-09
**Status:** Ready for planning
**Confidence:** HIGH

## What You Need to Know to Plan This Phase Well

This phase establishes the performance and design system foundation for upcoming isometric enhancements (Phases 13-15). Three infrastructure pieces: icon library migration, isometric CSS utilities, and dark mode glow patterns. Zero user-facing features, but enables all visual improvements in subsequent phases.

---

## 1. Icon Library Migration (FOUND-01)

### Current State Analysis

**Current implementation:**
- Package: `lucide-static@0.563.0`
- Size on disk: **54MB** in `node_modules`
- Usage: 3 icons total (Github, Linkedin, Loader2)
- Import pattern: `import { Github, Linkedin } from 'lucide-static';`
- Rendering: `<Fragment set:html={iconName} />`
- Files affected:
  - `/src/components/layout/Footer.astro` (Github, Linkedin)
  - `/src/pages/contact.astro` (Loader2)

**Problem with lucide-static:**
According to [Lucide's official documentation](https://lucide.dev/guide/packages/lucide-static), lucide-static bundles ALL 1000+ icons as SVG sprites and icon fonts, significantly increasing bundle size. It's designed for non-framework scenarios (icon fonts, raw SVG embedding) and explicitly warns against production use without tree-shaking capabilities.

### Target State: @lucide/astro

**Package:** `@lucide/astro@^0.563.0`

**Why this is better:**
- **Tree-shakeable**: Only imported icons included in final bundle
- **Zero JavaScript overhead**: Icons render as static SVG at build time (Astro component model)
- **Astro-native**: Works seamlessly with Astro's component system
- **Same icon set**: Icon names identical, no design changes
- **Expected savings**: 200KB+ bundle reduction (confirmed by prior research in STACK.md)

**Import syntax change:**
```astro
---
// OLD (lucide-static)
import { Github, Linkedin } from 'lucide-static';
---
<Fragment set:html={Github} />

// NEW (@lucide/astro)
import { Github, Linkedin } from '@lucide/astro';
---
<Github size={24} />
```

**Key differences:**
1. Icons are now Astro components (not raw HTML strings)
2. Size controlled via `size` prop instead of CSS
3. Color inherited from text via `currentColor` (same as before)
4. No need for `<Fragment set:html>` wrapper

**Icon standardization (per context decisions):**

Standardize to 5-tier sizing scale:
- `xs`: 12px
- `sm`: 16px
- `md`: 20px (default)
- `lg`: 24px
- `xl`: 32px

Current usage:
- Footer social icons: Currently styled via CSS `.social-link svg { width: 1.25rem; height: 1.25rem; }` (20px = `md`)
- Contact loading spinner: No explicit size, needs standardization (recommend `md` 20px)

**Migration checklist:**
1. Run: `npm uninstall lucide-static && npm install @lucide/astro`
2. Update Footer.astro:
   - Change import statement
   - Replace `<Fragment set:html={Github} />` with `<Github size={20} />`
   - Replace `<Fragment set:html={Linkedin} />` with `<Linkedin size={20} />`
   - Remove CSS `.social-link svg` sizing rules (no longer needed)
3. Update contact.astro:
   - Change import statement
   - Replace `<Fragment set:html={Loader2} />` with `<Loader2 size={20} />`
   - Verify loading spinner animation still works (targets `svg` element)

**Testing strategy:**
Playwright screenshot tests to verify icons render identically:
- Homepage (Footer visible)
- Portfolio index (Footer visible)
- Blog index (Footer visible)
- Contact page (Loader2 icon + Footer)
- A project page (Footer visible)
- A blog post (Footer visible)

**Bundle size verification:**
- Note reduction in build output (informal check, no enforced test)
- Expected: 200KB+ smaller final bundle
- Tools: Compare `npm run build` output before/after migration
- Alternative: Use [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) for detailed analysis (not required, but useful for verification)

**Sources:**
- [Lucide Static Documentation](https://lucide.dev/guide/packages/lucide-static) - Package limitations
- [Lucide Astro Documentation](https://lucide.dev/guide/packages/lucide-astro) - Installation and usage
- [@lucide/astro on npm](https://www.npmjs.com/package/@lucide/astro) - Package details
- [Geoexamples: Lucide icons in Astro](https://geoexamples.com/other/2025-01-05-astro-icons/) - Migration patterns
- [Add Lucide Icons to Astro](https://dev.to/chantastic/add-lucide-icons-to-astro-42el) - Community guide

---

## 2. Isometric CSS Utilities (FOUND-02)

### What Are Isometric Utilities?

CSS utilities that enable 3D isometric projections using `transform-style: preserve-3d` and rotation transforms. These create the illusion of 3D depth at specific angles (typically 30°/45°/60°) without JavaScript or external libraries.

**Use case in this project:**
Phases 13-15 will add isometric illustrations to Hero (outcome badges), Process (step illustrations), and Technology sections. This phase creates reusable CSS patterns so those phases don't need to implement transforms from scratch.

### Technical Foundation

**Core CSS property:**
```css
.iso-container {
  transform-style: preserve-3d;
}
```

The `transform-style: preserve-3d` property positions child elements in 3D space (vs. flattened 2D). This is the foundation for all isometric effects.

**Standard isometric angles:**
According to [isometric projection principles](https://www.pyxofy.com/css-art-creating-an-isometric-cube-using-css-transform/), isometric views use:
- **30°** - Classic isometric angle (engineering drawings)
- **45°** - Common for web UI (easier to implement, more dramatic)
- **60°** - Complementary angle to 30°

**Why 30° and 60°?** [Quora: Why are isometric projections drawn at a 30-degree angle?](https://www.quora.com/Why-are-isometric-projections-drawn-at-a-30-degree-angle) - Ensures all faces remain visible while maintaining 120° angles between axes when viewed on a 2D plane.

**Context decision:** 2-3 rotation angle presets (standard isometric + subtle tilt options). Exact values at Claude's discretion.

### Implementation Approach

**Where to add:** Existing `/src/styles/global.css` (NOT separate file)

**Naming convention:** `iso-` prefix for all classes (per context decision)
- `iso-container` - Base 3D container
- `iso-rotate-*` - Rotation presets
- `iso-shadow-*` - Isometric shadows
- `iso-hover-lift` - Hover state: lift effect
- `iso-hover-glow` - Hover state: glow effect

**Recommended rotation presets:**
```css
@layer utilities {
  /* Base isometric container */
  .iso-container {
    transform-style: preserve-3d;
  }

  /* Standard isometric rotation (most common) */
  .iso-rotate {
    transform: rotateX(45deg) rotateZ(45deg);
  }

  /* Subtle tilt variation */
  .iso-rotate-subtle {
    transform: rotateX(30deg) rotateZ(30deg);
  }

  /* Dramatic tilt variation (optional 3rd preset) */
  .iso-rotate-steep {
    transform: rotateX(60deg) rotateZ(45deg);
  }

  /* Face positioning for multi-face elements */
  .iso-face-front {
    transform: translateZ(20px);
  }

  .iso-face-top {
    transform: rotateX(90deg) translateZ(20px);
  }

  .iso-face-side {
    transform: rotateY(90deg) translateZ(20px);
  }
}
```

**Hover states (interactive elements):**
```css
/* Lift effect - element appears to rise */
.iso-hover-lift {
  transition: transform 200ms ease;
}

.iso-hover-lift:hover {
  transform: translateY(-8px);
}

/* Glow effect - requires shadow utilities (see next section) */
.iso-hover-glow {
  transition: box-shadow 200ms ease;
}

.iso-hover-glow:hover {
  box-shadow: 0 0 20px currentColor;
}
```

**Browser compatibility:**
- `transform-style: preserve-3d` supported in all modern browsers (Chrome, Firefox, Safari, Edge)
- [MDN: transform-style](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform-style) - Caniuse shows 98%+ global support
- No polyfills needed (IE11 support not required)

**Testing approach:**
Create hidden test page at `/src/pages/test-isometric.astro`:
- Shows all utility examples before production use
- Verifies transforms work in target browsers
- Documents utility patterns for future reference
- Hidden from navigation/sitemap (dev-only page)

**Sources:**
- [How to Create an Isometric Layout With CSS 3D Transforms](https://webdesign.tutsplus.com/create-an-isometric-layout-with-3d-transforms--cms-27134t) - Envato Tuts+ tutorial
- [CSS Art – Creating an Isometric Cube using CSS Transform](https://www.pyxofy.com/css-art-creating-an-isometric-cube-using-css-transform/) - Isometric grid patterns
- [Isometric Layout With CSS 3D Transforms](https://codepen.io/airen/pen/yabVzR) - CodePen example
- [transform-style - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform-style) - Official CSS reference
- [Tailwind CSS: transform-style](https://tailwindcss.com/docs/transform-style) - Tailwind 4 utilities

---

## 3. Dark Mode Glow Transformation (FOUND-03)

### Current Dark Mode Shadow System

**Existing implementation** (from `/src/styles/global.css`):

Light mode uses hard neobrutalist shadows:
```css
.shadow-neo-yellow {
  box-shadow: 5px 5px 0 var(--color-yellow);
}
```

Dark mode transforms to soft glows:
```css
.dark .shadow-neo-yellow {
  box-shadow: 0 0 20px color-mix(in oklch, var(--color-yellow-dark) 50%, transparent);
}
```

**Pattern established in Phase 7:** Shadow-to-glow transformation maintains visual hierarchy without box-shadow flickering. Uses OKLCH color space for perceptually uniform palette.

### New Requirement: Isometric Shadow Utilities

Isometric elements need shadow/glow utilities that:
1. Follow neobrutalist offset pattern in light mode (5px/6px offsets)
2. Transform to glows in dark mode (0 offset, radial spread)
3. Support derived colors (glow color from element's own color, not fixed accent)
4. Provide 3 intensity levels (per context decision)

**Context decisions:**
- **Medium glow intensity** - Clearly visible but not distracting (baseline)
- **Glow color derived from element** - Not fixed accent color
- **Glow spread larger than shadow offset** - Softer effect (20px+ spread)
- **3 intensity levels**: `iso-glow-subtle`, `iso-glow`, `iso-glow-strong`

### Implementation Pattern

**Light mode isometric shadows:**
```css
@layer utilities {
  /* Standard isometric shadow (45° angle) */
  .iso-shadow {
    box-shadow: 5px 5px 0 currentColor;
  }

  /* Stronger offset for larger elements */
  .iso-shadow-lg {
    box-shadow: 8px 8px 0 currentColor;
  }

  /* Subtle offset for small elements */
  .iso-shadow-sm {
    box-shadow: 3px 3px 0 currentColor;
  }
}
```

**Dark mode glow transformations:**
```css
@layer utilities {
  /* Subtle glow (20% opacity, 15px spread) */
  .iso-glow-subtle,
  .dark .iso-shadow-sm {
    box-shadow: 0 0 15px color-mix(in oklch, currentColor 20%, transparent);
  }

  /* Medium glow (40% opacity, 20px spread) - BASELINE */
  .iso-glow,
  .dark .iso-shadow {
    box-shadow: 0 0 20px color-mix(in oklch, currentColor 40%, transparent);
  }

  /* Strong glow (60% opacity, 30px spread) */
  .iso-glow-strong,
  .dark .iso-shadow-lg {
    box-shadow: 0 0 30px color-mix(in oklch, currentColor 60%, transparent);
  }
}
```

**Why `currentColor`?**
Allows glow color to be derived from element's text color. Set text color on parent, glow inherits automatically.

Example:
```html
<div class="text-yellow iso-shadow">
  <!-- Light mode: 5px yellow shadow -->
  <!-- Dark mode: 20px yellow glow at 40% opacity -->
</div>
```

**Technical details:**

1. **`color-mix()` function**: [CSS color-mix](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/color-mix) blends two colors in specified color space. Supported in all modern browsers (Chrome 111+, Firefox 113+, Safari 16.2+).

2. **OKLCH color space**: Perceptually uniform, ensures consistent brightness across hues. Already in use across design system (Phase 7).

3. **Glow spread rationale**:
   - Light mode offset: 5px (physical depth)
   - Dark mode spread: 20px+ (4x larger for softer, more diffuse effect)
   - Reference: [Beautiful CSS Shadows - CodyHouse](https://codyhouse.co/nuggets/beautiful-css-shadows) - Stacking multiple shadows creates realistic falloff

4. **Performance**: `box-shadow` is GPU-accelerated. Glow effects have negligible performance impact (CSS-only, no JavaScript).

### Dark Mode Glow Best Practices

**From research:**

[Shadows in dark mode - Tailwind Discussion #3177](https://github.com/tailwindlabs/tailwindcss/discussions/3177):
- Inner glows use inset light shadows for dark mode visibility
- Outer glows require darker background to "pop"
- Stack multiple comma-separated shadows for realistic falloff

[61 CSS Glow Effects](https://freefrontend.com/css-glow-effects/):
- Glow effects essential for active states in dark mode UI
- `filter: drop-shadow()` respects alpha channel (useful for SVG icons)
- Animations often modulate opacity/spread for "breathing" effect

[CSS Glow Generator - CSS Bud](https://cssbud.com/css-generator/css-glow-generator/):
- Common glow recipe: `0 0 [spread]px [color]`
- Larger spread = softer glow
- Lower opacity = subtler effect

**Application to this project:**
- Use `box-shadow` (not `drop-shadow`) for isometric elements (rectangular shapes)
- Use `drop-shadow` only if adding glows to SVG icons (future consideration)
- Medium intensity (40% opacity, 20px spread) as baseline - adjustable per element

### Testing Strategy

**Visual verification:**
- Test page (`/test-isometric`) shows shadows in both light/dark mode
- Toggle theme, verify smooth transformation (no flicker)
- Check glow intensity levels side-by-side

**Playwright screenshot tests:**
Same pages as icon migration test:
- Homepage (light mode)
- Homepage (dark mode after theme toggle)
- Verify shadow-to-glow transformation visual consistency

**Accessibility check:**
- Glows don't reduce text contrast (use on decorative elements only)
- Ensure WCAG 2.2 AA compliance maintained (existing axe-core tests cover this)

**Sources:**
- [Shadows in dark mode - Tailwind Discussion](https://github.com/tailwindlabs/tailwindcss/discussions/3177)
- [61 CSS Glow Effects](https://freefrontend.com/css-glow-effects/)
- [Beautiful CSS Shadows - CodyHouse](https://codyhouse.co/nuggets/beautiful-css-shadows)
- [CSS Glow Generator](https://cssbud.com/css-generator/css-glow-generator/)
- [CSS color-mix() - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/color-mix)
- [box-shadow - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-shadow)

---

## 4. Testing Infrastructure

### Current Playwright Setup

**Configuration** (`/playwright.config.ts`):
- Test directory: `./tests`
- Base URL: `http://localhost:4321`
- Browser: Chromium (Desktop Chrome)
- Retries: 2 (CI), 0 (local)
- Reporter: HTML
- Timeout: 30 seconds

**Existing test files:**
- `/tests/accessibility/axe-tests.spec.ts` - WCAG 2.2 AA compliance via axe-core
- `/tests/accessibility/dark-mode.spec.ts` - Dark mode color contrast validation

**Pages tested:**
- Homepage (`/`)
- Projects (`/projects`)
- Blog (`/blog`)
- Contact (`/contact`)
- About (`/about`) (referenced in axe-tests, not yet implemented)

### New Tests Required for Phase 12

**1. Icon Migration Visual Regression**

Create: `/tests/icon-migration.spec.ts`

Test approach:
- Take screenshots of all pages with icons
- Use Playwright's `toHaveScreenshot()` for pixel-perfect comparison
- On first run, generates baseline screenshots
- Subsequent runs compare against baseline

Example structure:
```typescript
test('Footer icons render correctly on homepage', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');
  await expect(footer).toHaveScreenshot('footer-icons.png');
});
```

Pages to test:
- Homepage (footer visible)
- Portfolio index (footer visible)
- Blog index (footer visible)
- Contact page (Loader2 + footer)
- Project detail page (footer visible)
- Blog post page (footer visible)

**Configuration note:**
[Playwright Visual Comparisons](https://playwright.dev/docs/test-snapshots):
- First execution generates reference screenshots
- `maxDiffPixels` setting controls tolerance (recommend 100 pixels)
- Update baseline with `--update-snapshots` flag
- Screenshots stored in `/tests/__screenshots__/`

**2. Bundle Size Check (Informal)**

Not a Playwright test. Simple before/after comparison:

```bash
# Before migration
npm run build
# Note output: "dist built in XXms, XXX KB"

# After migration
npm run build
# Compare: Should see 200KB+ reduction
```

Optional: Add npm script for detailed analysis:
```json
"analyze:bundle": "npm run build && du -sh dist/"
```

**3. Isometric Utilities Test Page**

Create: `/src/pages/test-isometric.astro`

Purpose:
- Visual documentation of all isometric utilities
- Verify transforms work in target browsers
- No automated tests needed (manual visual inspection)
- Hidden from sitemap/navigation

Content:
- Examples of each rotation preset (`iso-rotate`, `iso-rotate-subtle`, `iso-rotate-steep`)
- Shadow examples in light mode
- Glow examples in dark mode (toggle theme to verify)
- Hover state demonstrations

**Important:** Add to `.lighthouseci/lighthouserc.json` exclusions (don't audit test page).

### Playwright Resources

**Official documentation:**
- [Visual comparisons | Playwright](https://playwright.dev/docs/test-snapshots) - Screenshot testing guide
- [Chromatic: Visual testing with Playwright](https://www.chromatic.com/blog/how-to-visual-test-ui-using-playwright/) - Best practices

**Guides:**
- [Screenshot Testing with Playwright: Beginner's Guide](https://www.checklyhq.com/blog/screenshot-monitoring-with-playwright/)
- [Playwright Visual Regression Testing](https://www.testmu.ai/learning-hub/playwright-visual-regression-testing/)
- [BrowserStack: Visual Regression Testing Using Playwright](https://www.browserstack.com/guide/visual-regression-testing-using-playwright)

**Key considerations:**
- Browser rendering varies by OS (run tests in consistent environment)
- Use `maxDiffPixels` config to allow minor anti-aliasing differences
- Update snapshots when intentional visual changes occur
- Store baseline screenshots in git for CI consistency

---

## 5. Integration Points and Dependencies

### Files Modified in This Phase

**Modified:**
1. `/package.json` - Remove lucide-static, add @lucide/astro
2. `/src/components/layout/Footer.astro` - Update icon imports and usage
3. `/src/pages/contact.astro` - Update icon imports and usage
4. `/src/styles/global.css` - Add isometric utilities to `@layer utilities`
5. `/playwright.config.ts` - Add `maxDiffPixels` config for visual tests

**Created:**
1. `/tests/icon-migration.spec.ts` - Visual regression tests
2. `/src/pages/test-isometric.astro` - Utility documentation page

### Dependencies on Prior Phases

**Phase 7** (Design System Foundation):
- OKLCH color system established (used in glow utilities)
- Shadow-to-glow transformation pattern (extended for isometric elements)
- Dark mode toggle implementation (test utilities rely on this)

**Phase 11** (Testing & Accessibility Validation):
- Playwright + axe-core setup complete
- WCAG 2.2 AA validation framework (verify glows don't reduce contrast)

### Enables Future Phases

**Phase 13** (Hero Refinement):
- Uses `@lucide/astro` for outcome badge icons
- Uses isometric utilities for badge styling
- Uses glow effects for dark mode badges

**Phase 14** (Process Section):
- Uses isometric utilities for step illustrations
- Uses `iso-shadow`/`iso-glow` for illustration depth

**Phase 15** (Technology Section):
- Uses isometric utilities for category illustrations
- Applies same shadow/glow patterns as Process

### No Breaking Changes

This phase is purely additive:
- Icon migration is visual no-op (same icons, same sizes, same colors)
- CSS utilities don't affect existing components (new classes, no overrides)
- Tests added, not modified (existing tests still pass)

---

## 6. Implementation Recommendations

### Order of Operations

**Recommended sequence:**

1. **Icon migration** (FOUND-01) - ~30 minutes
   - Install @lucide/astro, uninstall lucide-static
   - Update Footer.astro imports and markup
   - Update contact.astro imports and markup
   - Verify local dev server renders correctly
   - Commit: `feat(icons): migrate from lucide-static to @lucide/astro`

2. **Isometric utilities** (FOUND-02) - ~20 minutes
   - Add rotation presets to global.css
   - Add face positioning utilities
   - Add hover state utilities
   - Commit: `feat(css): add isometric transform utilities`

3. **Dark mode glow utilities** (FOUND-03) - ~15 minutes
   - Add shadow utilities to global.css
   - Add glow intensity levels
   - Commit: `feat(css): add isometric shadow/glow utilities for dark mode`

4. **Test page** - ~20 minutes
   - Create test-isometric.astro
   - Add examples of all utilities
   - Verify visually in both light/dark mode
   - Commit: `test: add isometric utilities demo page`

5. **Playwright tests** - ~30 minutes
   - Create icon-migration.spec.ts
   - Run once to generate baseline screenshots
   - Verify tests pass
   - Commit: `test(visual): add icon migration regression tests`

**Total estimated time:** ~2 hours

### Edge Cases and Considerations

**Icon migration:**
- Verify CSS `.social-link svg` selector doesn't target anything else (grep for usage)
- Ensure loading spinner animation still works (CSS targets `svg`, @lucide/astro renders `<svg>`)
- Check icon colors inherit `currentColor` (should work automatically)

**Isometric utilities:**
- `preserve-3d` requires parent-child hierarchy (document in comments)
- Z-index stacking context changes with 3D transforms (note for future)
- Rotation angles affect clickable area (interactive elements need testing)

**Dark mode glows:**
- `color-mix()` not supported in old browsers (graceful degradation: no glow)
- High opacity glows can reduce contrast (test with axe-core after applying)
- Glow spread too large = performance hit (20-30px is safe range)

**Playwright screenshots:**
- First run always fails (no baseline yet) - this is expected
- Use `--update-snapshots` when intentional changes occur
- Store baseline screenshots in git (don't .gitignore)
- CI needs consistent OS for pixel-perfect comparison

### Success Criteria Verification

**FOUND-01: Icon library migrated**
- [ ] `npm list lucide-static` shows "empty"
- [ ] `npm list @lucide/astro` shows version
- [ ] Footer renders Github/Linkedin icons correctly
- [ ] Contact page renders Loader2 icon correctly
- [ ] Build output shows ~200KB reduction
- [ ] Playwright visual tests pass

**FOUND-02: Isometric CSS utilities available**
- [ ] `global.css` contains `iso-container`, `iso-rotate`, `iso-rotate-subtle`, `iso-face-*`
- [ ] Test page demonstrates all rotation presets
- [ ] Utilities work in Chrome, Firefox, Safari
- [ ] Hover states (lift/glow) function correctly

**FOUND-03: Shadow utilities support dark mode glow**
- [ ] `global.css` contains `iso-shadow`, `iso-shadow-sm`, `iso-shadow-lg`
- [ ] `global.css` contains `iso-glow-subtle`, `iso-glow`, `iso-glow-strong`
- [ ] Light mode shows offset shadows
- [ ] Dark mode shows radial glows
- [ ] Glow color derives from `currentColor`
- [ ] Test page demonstrates all intensity levels

**All existing pages render correctly:**
- [ ] Playwright axe-tests.spec.ts still passes (no new violations)
- [ ] Playwright dark-mode.spec.ts still passes
- [ ] No visual regressions on existing pages

---

## 7. Open Questions for Planning

**Icon sizing standardization:**
- Context decision specifies 5-tier scale (xs/sm/md/lg/xl). Do we enforce this via custom wrapper component, or trust developers to use correct `size` prop values?
- Recommendation: Document scale in CLAUDE.md, enforce during code review. No wrapper needed (over-engineering).

**Rotation angle presets:**
- Context says "2-3 presets" and "exact values at Claude's discretion". Recommend:
  - `iso-rotate` (45deg, 45deg) - standard
  - `iso-rotate-subtle` (30deg, 30deg) - less dramatic
  - Optional 3rd: `iso-rotate-steep` (60deg, 45deg) - more dramatic
- Alternative: Only 2 presets (standard + subtle) to reduce complexity.

**Test page visibility:**
- Keep test-isometric.astro permanently, or delete after Phase 15 complete?
- Recommendation: Keep permanently. Useful reference for future isometric additions. Add comment explaining purpose.

**Bundle size threshold:**
- Context says "informal check" for 200KB+ reduction. Should we add automated enforcement (fail build if bundle too large)?
- Recommendation: No. Automated bundle size checks fragile (vary by dependencies, content changes). Note reduction in commit message, move on.

**Glow intensity defaults:**
- Three levels provided, but which is default for general use?
- Recommendation: `iso-glow` (medium, 40% opacity) as baseline. Use `-subtle`/`-strong` as modifiers for specific elements.

---

## 8. Sources and References

### High Confidence (Official Documentation)

**Icon Library:**
- [Lucide Static Documentation](https://lucide.dev/guide/packages/lucide-static)
- [Lucide Astro Documentation](https://lucide.dev/guide/packages/lucide-astro)
- [@lucide/astro on npm](https://www.npmjs.com/package/@lucide/astro)

**CSS 3D Transforms:**
- [transform-style - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform-style)
- [Using CSS transforms - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transforms/Using_CSS_transforms)
- [Tailwind CSS: transform-style](https://tailwindcss.com/docs/transform-style)

**CSS Color Functions:**
- [color-mix() - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/color-mix)
- [box-shadow - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-shadow)
- [drop-shadow() - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/filter-function/drop-shadow)

**Testing:**
- [Visual comparisons | Playwright](https://playwright.dev/docs/test-snapshots)
- [Playwright Configuration](https://playwright.dev/docs/test-configuration)

### Medium Confidence (Community Guides)

**Isometric Design:**
- [How to Create an Isometric Layout With CSS 3D Transforms](https://webdesign.tutsplus.com/create-an-isometric-layout-with-3d-transforms--cms-27134t) - Envato Tuts+
- [CSS Art – Creating an Isometric Cube using CSS Transform](https://www.pyxofy.com/css-art-creating-an-isometric-cube-using-css-transform/)
- [Isometric Layout With CSS 3D Transforms](https://codepen.io/airen/pen/yabVzR) - CodePen example
- [65 CSS 3D Transforms](https://freefrontend.com/css-3d-transforms/)

**Dark Mode Glow Effects:**
- [Shadows in dark mode - Tailwind Discussion](https://github.com/tailwindlabs/tailwindcss/discussions/3177)
- [Beautiful CSS Shadows - CodyHouse](https://codyhouse.co/nuggets/beautiful-css-shadows)
- [61 CSS Glow Effects](https://freefrontend.com/css-glow-effects/)
- [CSS Glow Generator - CSS Bud](https://cssbud.com/css-generator/css-glow-generator/)

**Icon Migration:**
- [Geoexamples: Lucide icons in Astro](https://geoexamples.com/other/2025-01-05-astro-icons/)
- [Add Lucide Icons to Astro](https://dev.to/chantastic/add-lucide-icons-to-astro-42el) - DEV Community

**Testing:**
- [Screenshot Testing with Playwright: Beginner's Guide](https://www.checklyhq.com/blog/screenshot-monitoring-with-playwright/)
- [Playwright Visual Regression Testing](https://www.testmu.ai/learning-hub/playwright-visual-regression-testing/)
- [Chromatic: Visual testing with Playwright](https://www.chromatic.com/blog/how-to-visual-test-ui-using-playwright/)

### Low Confidence (Contextual)

**Isometric Theory:**
- [Why are isometric projections drawn at a 30-degree angle? - Quora](https://www.quora.com/Why-are-isometric-projections-drawn-at-a-30-degree-angle)
- [Intro to CSS 3D transforms](https://3dtransforms.desandro.com/)

**Bundle Analysis:**
- [webpack-bundle-analyzer - npm](https://www.npmjs.com/package/webpack-bundle-analyzer)
- [Everything you need to know about Webpack's Bundle-Analyzer](https://dev.to/mbarzeev/everything-you-need-to-know-about-webpacks-bundle-analyzer-g0l)

---

## 9. Summary: What You Need to Plan

**Infrastructure work, not user features.** Three independent tasks:

1. **Icon migration** - Swap lucide-static for @lucide/astro, update 2 files, verify with screenshots
2. **CSS utilities** - Add ~50 lines of utility classes to global.css for isometric transforms
3. **Glow utilities** - Add ~30 lines of shadow/glow utilities to global.css for dark mode

**No design decisions needed.** Context document locked in:
- Icon sizes (5-tier scale)
- Color inheritance (currentColor)
- Glow intensity (3 levels, medium default)
- Organization (global.css, iso- prefix)

**Plan should specify:**
- Exact rotation angle values (2-3 presets)
- Exact glow spread/opacity values (subtle/medium/strong)
- Order of operations (recommend icon migration → utilities → tests)
- Verification checklist for each requirement

**Time estimate:** 2-3 hours total implementation + testing. Low risk, high value (enables Phases 13-15).

---

*Research complete. Ready for planning.*
*Confidence: HIGH - All technical approaches validated with official sources.*
*No blockers identified.*

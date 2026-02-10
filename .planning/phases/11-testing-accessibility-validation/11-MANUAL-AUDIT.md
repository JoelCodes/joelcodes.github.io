# Manual Accessibility & Validation Audit

**Phase:** 11-testing-accessibility-validation
**Plan:** 02
**Date:** 2026-02-09
**Auditor:** _________

---

## Purpose

Automated accessibility testing (axe-core) catches approximately 57% of WCAG violations. This manual audit covers the remaining 43% that require human judgment: keyboard navigation patterns, screen reader compatibility, color perception testing, mobile performance, and visual density validation.

## Test Environment

- **Browser:** Chrome (latest)
- **Screen Reader:** VoiceOver (Mac) or NVDA (Windows)
- **Dev Server:** http://localhost:4321
- **Test Date:** _________

---

## 1. Keyboard Navigation Audit

**How to test:**
1. Use Tab key to navigate forward through interactive elements
2. Use Shift+Tab to navigate backward
3. Use Enter/Space to activate buttons and links
4. Ensure you can navigate without using a mouse at all

**Test Items:**

- [ ] **PASS / FAIL** — Tab through all interactive elements on homepage
  Notes: ___________

- [ ] **PASS / FAIL** — Focus indicator visible on every focusable element (buttons, links, inputs)
  Notes: ___________

- [ ] **PASS / FAIL** — Logical tab order (left-to-right, top-to-bottom flow)
  Notes: ___________

- [ ] **PASS / FAIL** — No keyboard traps (can Tab away from any element)
  Notes: ___________

- [ ] **PASS / FAIL** — Enter/Spacebar activate all buttons and links correctly
  Notes: ___________

- [ ] **PASS / FAIL** — Mobile nav: Hamburger opens with Enter, X closes with Enter, links activate with Enter
  Notes: ___________

- [ ] **PASS / FAIL** — FAQ accordion: Enter/Space toggles open/close
  Notes: ___________

- [ ] **PASS / FAIL** — Theme toggle button works with Enter/Space
  Notes: ___________

- [ ] **PASS / FAIL** — Can navigate to /projects page and tab through project cards
  Notes: ___________

- [ ] **PASS / FAIL** — Can navigate to /blog page and tab through blog posts
  Notes: ___________

- [ ] **PASS / FAIL** — Can navigate to /contact page and tab through form fields
  Notes: ___________

**Overall Keyboard Navigation:** PASS / FAIL

---

## 2. Screen Reader Testing

**How to test:**
- **Mac:** Enable VoiceOver with Cmd+F5
  - Navigate headings: VO+Cmd+H
  - Navigate links: VO+Cmd+L
  - Navigate forms: VO+Cmd+J
- **Windows:** Download NVDA (free at nvaccess.org)
  - Navigate headings: H key
  - Navigate links: K key
  - Navigate forms: F key

**Test Items:**

- [ ] **PASS / FAIL** — Page titles announced correctly on each page
  Notes: ___________

- [ ] **PASS / FAIL** — Headings in logical hierarchy (H1 → H2 → H3, no skips)
  Notes: ___________

- [ ] **PASS / FAIL** — Images have meaningful alt text (or null alt="" for decorative)
  Notes: ___________

- [ ] **PASS / FAIL** — Form labels associated with inputs (screen reader announces label when focused)
  Notes: ___________

- [ ] **PASS / FAIL** — Button text is descriptive (no "click here" or vague text)
  Notes: ___________

- [ ] **PASS / FAIL** — Link text is descriptive (tells where link goes)
  Notes: ___________

- [ ] **PASS / FAIL** — Mobile nav state announced when opened/closed
  Notes: ___________

- [ ] **PASS / FAIL** — FAQ accordion state announced (expanded/collapsed)
  Notes: ___________

- [ ] **PASS / FAIL** — Theme toggle announces current state (light/dark)
  Notes: ___________

- [ ] **PASS / FAIL** — Content reads in logical order (matches visual order)
  Notes: ___________

**Overall Screen Reader Testing:** PASS / FAIL

---

## 3. Color Contrast Validation

**How to test:**
1. Open Chrome DevTools
2. Inspect element with accent color
3. Check Computed styles for color and background-color
4. Use contrast checker tool (e.g., WebAIM Contrast Checker)
5. WCAG AA requires 4.5:1 for body text, 3:1 for large text (18px+)

**Test Items:**

- [ ] **PASS / FAIL** — Yellow accent (#ffef6a or equivalent) on white background meets 4.5:1
  Measured ratio: ___________
  Notes: ___________

- [ ] **PASS / FAIL** — Turquoise accent on white background meets 4.5:1
  Measured ratio: ___________
  Notes: ___________

- [ ] **PASS / FAIL** — Magenta accent on white background meets 4.5:1
  Measured ratio: ___________
  Notes: ___________

- [ ] **PASS / FAIL** — Dark mode body text on dark background meets 4.5:1
  Measured ratio: ___________
  Notes: ___________

- [ ] **PASS / FAIL** — Dark mode glows visible at 80% screen brightness
  Notes: ___________

- [ ] **PASS / FAIL** — Dark mode glows visible at 100% screen brightness
  Notes: ___________

- [ ] **PASS / FAIL** — Focus indicators have 3:1 contrast against adjacent colors
  Measured ratio: ___________
  Notes: ___________

- [ ] **PASS / FAIL** — Badge text readable on badge background (meets 4.5:1)
  Measured ratio: ___________
  Notes: ___________

**Overall Color Contrast:** PASS / FAIL

---

## 4. Color Blindness Simulation

**How to test:**
1. Open Chrome DevTools → Rendering tab
2. Scroll to "Emulate vision deficiencies"
3. Select each deficiency type
4. Navigate through site and verify UI elements remain distinguishable

**Test Items:**

- [ ] **PASS / FAIL** — Protanopia (red-blind): Can distinguish all UI elements, buttons, and sections
  Notes: ___________

- [ ] **PASS / FAIL** — Deuteranopia (green-blind): Can distinguish all UI elements, buttons, and sections
  Notes: ___________

- [ ] **PASS / FAIL** — Tritanopia (blue-blind): Can distinguish all UI elements, buttons, and sections
  Notes: ___________

- [ ] **PASS / FAIL** — Achromatopsia (total color blindness): Can distinguish all UI elements, buttons, and sections
  Notes: ___________

- [ ] **PASS / FAIL** — All interactive elements identifiable without color alone (shape, text, icons used)
  Notes: ___________

**Overall Color Blindness Testing:** PASS / FAIL

---

## 5. Dark Mode Validation

**How to test:**
1. Start in light mode
2. Click theme toggle button
3. Navigate to each page
4. Refresh page
5. Return to homepage and toggle back to light mode

**Test Items:**

- [ ] **PASS / FAIL** — Toggle button works on homepage
  Notes: ___________

- [ ] **PASS / FAIL** — Toggle button works on /projects page
  Notes: ___________

- [ ] **PASS / FAIL** — Toggle button works on /blog page
  Notes: ___________

- [ ] **PASS / FAIL** — Toggle button works on /contact page
  Notes: ___________

- [ ] **PASS / FAIL** — All homepage sections render correctly in dark mode
  Notes: ___________

- [ ] **PASS / FAIL** — Shadows become glows in dark mode (visual inspection)
  Notes: ___________

- [ ] **PASS / FAIL** — All text remains readable in dark mode
  Notes: ___________

- [ ] **PASS / FAIL** — No flash of unstyled content (FOUC) on page load
  Notes: ___________

- [ ] **PASS / FAIL** — Dark mode persists across page navigation
  Notes: ___________

- [ ] **PASS / FAIL** — Dark mode persists on page refresh
  Notes: ___________

**Overall Dark Mode:** PASS / FAIL

---

## 6. Mobile Performance Testing

**How to test:**
1. Open Chrome DevTools → Performance tab
2. Click gear icon → CPU: 4x slowdown
3. Enable "Screenshots" and "FPS" in Performance settings
4. Start recording
5. Perform interactions (scroll, hover, click)
6. Stop recording and analyze FPS chart (should stay above 60fps)

**Test Items:**

- [ ] **PASS / FAIL** — Homepage scroll is smooth (no jank, 60fps maintained)
  Notes: ___________

- [ ] **PASS / FAIL** — Button hover animations smooth at 60 FPS
  Notes: ___________

- [ ] **PASS / FAIL** — Button active states animate smoothly
  Notes: ___________

- [ ] **PASS / FAIL** — Dark mode toggle animation smooth (no frame drops)
  Notes: ___________

- [ ] **PASS / FAIL** — Mobile nav open animation smooth
  Notes: ___________

- [ ] **PASS / FAIL** — Mobile nav close animation smooth
  Notes: ___________

- [ ] **PASS / FAIL** — No layout shift during interactions (buttons don't jump)
  Notes: ___________

- [ ] **PASS / FAIL** — FAQ accordion open/close smooth
  Notes: ___________

**Overall Mobile Performance:** PASS / FAIL

---

## 7. Density Audit (3/10 Constraint)

**How to test:**
Visually inspect each homepage section and evaluate:
- Whitespace around elements (breathing room)
- Number of elements per section
- Visual hierarchy (not cluttered or overwhelming)
- **Target:** 3/10 density for most sections (Hero can be 10/10)

**Test Items:**

- [ ] **PASS / FAIL** — Hero section: Appropriate visual weight (can be 10/10 for impact)
  Notes: ___________

- [ ] **PASS / FAIL** — Solutions section: Not overcrowded, 3/10 density maintained
  Notes: ___________

- [ ] **PASS / FAIL** — Process section: Clean layout with adequate spacing
  Notes: ___________

- [ ] **PASS / FAIL** — Tech section: Not too many tech items, appropriate spacing
  Notes: ___________

- [ ] **PASS / FAIL** — About section: Balanced content, not text-heavy
  Notes: ___________

- [ ] **PASS / FAIL** — Contact section: Clear focus, not cluttered
  Notes: ___________

- [ ] **PASS / FAIL** — FAQ accordion: Questions well-spaced, not cramped
  Notes: ___________

- [ ] **PASS / FAIL** — Projects page: Card grid has adequate gutters
  Notes: ___________

- [ ] **PASS / FAIL** — Blog page: Post cards not too dense
  Notes: ___________

**Overall Density:** PASS / FAIL

---

## Summary

**Total Tests:** 78
**Passed:** _____
**Failed:** _____
**Pass Rate:** _____%

### Critical Issues Found

(List any FAIL items that need immediate attention)

1.
2.
3.

### Non-Critical Issues Found

(List any FAIL items that are nice-to-fix but not blockers)

1.
2.
3.

### Recommendations

(Additional observations or suggestions for improvement)

1.
2.
3.

---

## Sign-off

**Auditor:** _________
**Date Completed:** _________
**Overall Result:** PASS / FAIL

**Ready for deployment?** YES / NO

If NO, describe blockers: ___________

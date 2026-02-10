---
phase: 09
plan: 01
subsystem: navigation
tags: [neobrutalist, layout, header, footer, mobile-nav, faq, accessibility]
requires: [08-03]
provides: [neobrutalist-navigation-chrome, faq-accordion]
affects: [09-02, 09-03]
tech-stack:
  added: []
  patterns: [native-html-details-summary, smooth-scroll]
key-files:
  created: []
  modified:
    - src/components/layout/Header.astro
    - src/components/layout/Footer.astro
    - src/components/layout/MobileNav.astro
    - src/styles/global.css
decisions:
  - slug: smooth-scroll-behavior
    title: Smooth scroll with accessibility
    rationale: Added HTML smooth scroll behavior with prefers-reduced-motion support for accessibility compliance
  - slug: faq-footer-location
    title: FAQ relocated to footer
    rationale: Moves FAQ content from homepage to footer accordion to prevent disrupting narrative flow while keeping content accessible
  - slug: native-details-summary
    title: Native HTML accordion
    rationale: Use details/summary elements for FAQ accordion instead of JavaScript solution for better accessibility and simplicity
metrics:
  duration: 3min
  completed: 2026-02-10
---

# Phase 9 Plan 1: Navigation Chrome Update Summary

**One-liner:** Neobrutalist navigation chrome with 3px borders, sticky header, and FAQ accordion in footer.

## What Was Built

Updated site-wide navigation components with consistent neobrutalist styling:

1. **Header** - Sticky header with 3px bottom border, 60px height constraint, neobrutalist dark mode toggle with focus rings, bold font-heading on nav links
2. **Footer** - 3px top border, FAQ accordion with 5 collapsible questions using native details/summary elements, updated social link hover colors
3. **Mobile Navigation** - 3px borders on hamburger button, close button, and slide-in panel, thicker hamburger lines (3px), dark mode toggle added to mobile nav
4. **Smooth Scroll** - Added HTML smooth scroll behavior with scroll-margin-top offset and prefers-reduced-motion support

## Files Modified

### Components
- `src/components/layout/Header.astro` - Neobrutalist header with 60px height and 3px border
- `src/components/layout/Footer.astro` - Neobrutalist footer with FAQ accordion section
- `src/components/layout/MobileNav.astro` - Neobrutalist mobile nav with dark mode toggle

### Styles
- `src/styles/global.css` - Added smooth scroll behavior with accessibility support

## Decisions Made

### 1. Smooth Scroll with Accessibility
**Context:** Navigation links need smooth scrolling to section anchors.

**Decision:** Added CSS smooth scroll behavior with:
- `scroll-behavior: smooth` on html element
- `@media (prefers-reduced-motion: reduce)` override to `auto`
- `scroll-margin-top: 60px` on sections to offset sticky header

**Rationale:** Provides polished UX while respecting user accessibility preferences. The 60px offset prevents content from hiding behind the sticky header.

### 2. FAQ Relocated to Footer
**Context:** FAQ section was on homepage, potentially disrupting narrative flow.

**Decision:** Moved FAQ content from FAQ.astro component to footer as collapsible accordion.

**Rationale:** Keeps FAQ content accessible across all pages while preventing it from disrupting homepage storytelling. Footer is expected location for secondary information.

### 3. Native HTML Accordion
**Context:** FAQ needs collapsible UI without adding JavaScript complexity.

**Decision:** Use native HTML `<details>` and `<summary>` elements for FAQ accordion.

**Rationale:**
- Zero JavaScript required for core functionality
- Better accessibility out of the box
- Browser-native behavior is reliable and performant
- Reduced bundle size

## Technical Approach

### Neobrutalist Styling Applied
Consistent styling across all navigation components:
- **Borders:** 3px solid borders using `border-[3px]` utility
- **Focus rings:** Double-ring technique from 08-02 (2px gap + 4px outer ring) using box-shadow
- **Typography:** font-heading font-bold on all navigation links
- **Height constraint:** 60px max height on header to prevent mobile overflow
- **Dark mode toggle:** Neobrutalist border, yellow hover background, and focus ring

### FAQ Accordion Structure
```html
<details class="group border-[3px] ...">
  <summary class="font-heading font-bold ...">
    <span>Question</span>
    <span class="text-2xl transition-transform group-open:rotate-45">+</span>
  </summary>
  <div class="mt-4 pt-4 border-t-[3px] ...">
    Answer content
  </div>
</details>
```

Features:
- 5 FAQ items with questions from FAQ.astro
- Rotating + icon (becomes ×) on open using `group-open:rotate-45`
- Internal separator border on expanded answer
- Neobrutalist 3px borders throughout

## Deviations from Plan

None - plan executed exactly as written.

## Commits

| Commit | Type | Description |
|--------|------|-------------|
| b1a72cf | feat | Update Header with neobrutalist styling |
| 9304830 | feat | Update Footer with neobrutalist styling and FAQ accordion |
| b50de7a | feat | Update MobileNav with neobrutalist styling |

## Testing Results

### Build Verification
✓ `npm run build` completed successfully
✓ All 12 pages generated without errors
✓ No TypeScript errors

### Pattern Verification
✓ Header has `border-b-[3px]` (1 match)
✓ Header has `h-[60px]` (1 match)
✓ Footer has `border-t-[3px]` (7 matches: main + separator + 5 FAQ items)
✓ Footer has 5 `<details>` elements
✓ Footer has 5 `<summary>` elements
✓ MobileNav has `border-[3px]` (3 matches: hamburger, close, theme toggle)
✓ MobileNav has `h-[3px]` (3 matches: hamburger lines)
✓ MobileNav has `mobile-theme-toggle` (2 matches: button + script)
✓ global.css has `scroll-behavior: smooth` (1 match)

### Success Criteria Met
✓ Header has 3px bottom border, 60px height, neobrutalist dark mode toggle
✓ Footer has 3px top border and FAQ accordion with 5 collapsible items
✓ Mobile nav has neobrutalist borders and includes dark mode toggle
✓ Smooth scroll is enabled with scroll-margin-top for section offsets
✓ All focus states meet WCAG 2.4.13 requirements (double-ring technique from 08-02)
✓ Build passes with no errors

## Next Phase Readiness

**Ready for 09-02 (Hero Section Updates):**
- ✓ Navigation chrome provides consistent branded experience
- ✓ Sticky header height (60px) documented for scroll offset calculations
- ✓ Smooth scroll behavior in place for anchor link navigation
- ✓ FAQ moved to footer frees up homepage for narrative sections

**Integration Notes for 09-02:**
- Hero section can leverage smooth scroll for CTA anchor links
- Use `scroll-margin-top: 60px` pattern for any new section IDs
- Header height (60px) should be considered for hero section top spacing

**No blockers identified.**

## Performance Notes

- Native HTML details/summary requires zero JavaScript for accordion functionality
- Focus ring implementation uses box-shadow (hardware accelerated) instead of outline
- Smooth scroll respects prefers-reduced-motion for accessibility
- Total bundle size unchanged (no new dependencies)

## Lessons Learned

1. **Native HTML patterns win** - details/summary provides accordion behavior with zero JavaScript, better accessibility, and smaller bundle size than custom implementation.

2. **Consistent border thickness** - Using 3px borders across all navigation chrome creates cohesive neobrutalist identity.

3. **Mobile parity** - Adding dark mode toggle to mobile nav ensures feature parity and prevents user frustration.

4. **Accessibility by default** - prefers-reduced-motion support for smooth scroll shows how CSS can respect user preferences without JavaScript detection.

---

*Summary created: 2026-02-10*
*Phase: 09 (Homepage Navigation)*
*Plan: 01 of 03*

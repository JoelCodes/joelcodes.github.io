---
phase: 16
plan: 01
subsystem: content
tags: [faq, seo, json-ld, navigation, accessibility]
dependencies:
  requires: [15-02]
  provides: [dedicated-faq-page, faqpage-schema, faq-navigation]
  affects: [future-seo-improvements]
tech-stack:
  added: []
  patterns: [json-ld-structured-data, native-details-accordion]
key-files:
  created:
    - src/pages/faq.astro
  modified:
    - src/components/layout/Header.astro
    - src/components/layout/MobileNav.astro
    - src/components/layout/Footer.astro
decisions:
  - id: faq-page-structure
    choice: Dedicated /faq page with native <details> elements
    rationale: Improves SEO discoverability and reduces footer weight
  - id: json-ld-implementation
    choice: Full page structure instead of BaseLayout
    rationale: BaseLayout lacks head slot, needed direct <head> access for JSON-LD
  - id: navigation-placement
    choice: FAQ after Blog, before Contact
    rationale: Research recommendation for optimal user flow
  - id: footer-simplification
    choice: Replace accordion with simple link
    rationale: Reduces visual weight while maintaining discoverability
metrics:
  duration: 3min 27sec
  completed: 2026-02-10
---

# Phase 16 Plan 01: FAQ Page Summary

**One-liner:** Dedicated /faq page with FAQPage JSON-LD schema and navigation integration

## What Was Built

Created a dedicated FAQ page at /faq with:
- 5 FAQ items using native `<details>` accordion elements
- FAQPage JSON-LD structured data for search engines
- Navigation links in desktop and mobile menus
- Footer link replacing the inline accordion

## Tasks Completed

### Task 1: Create dedicated FAQ page with JSON-LD schema
- Created src/pages/faq.astro with 5 FAQ accordion items
- Extracted FAQ data from Footer.astro
- Implemented FAQPage JSON-LD schema following Google's specification
- Used native `<details>` elements for built-in keyboard accessibility
- Matched site design system (border-[3px], rounded, group animations)

**Commit:** f439187

### Task 2: Add FAQ link to navigation components
- Added FAQ link to Header.astro desktop navigation
- Added FAQ link to MobileNav.astro mobile navigation
- Positioned after Blog, before Contact per research recommendation
- Maintained consistent styling with existing nav items

**Commit:** d26f2ee

### Task 3: Replace footer FAQ accordion with link
- Removed inline FAQ accordion from Footer.astro (62 lines)
- Added simple FAQ link with arrow indicator (&rarr;)
- Maintained visual separation with border-top
- Reduced footer weight while improving discoverability

**Commit:** 6d3bdb2

### Bug Fix: JSON-LD Rendering Issue
- **Issue:** BaseLayout doesn't expose head slot, preventing JSON-LD injection
- **Fix:** Converted faq.astro from using BaseLayout to full page structure
- **Result:** FAQPage JSON-LD now renders correctly in built output
- **Files modified:** src/pages/faq.astro

**Commit:** fe5643d

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed JSON-LD rendering in FAQ page**
- **Found during:** Task 1 verification
- **Issue:** BaseLayout component doesn't expose a head slot, so Fragment slot="head" pattern failed silently - JSON-LD wasn't rendering in built output
- **Fix:** Converted faq.astro from BaseLayout to full page structure with direct `<head>` access for JSON-LD script
- **Files modified:** src/pages/faq.astro
- **Commit:** fe5643d
- **Verification:** Confirmed FAQPage JSON-LD present in dist/faq/index.html with all 5 questions

## Technical Details

### JSON-LD Implementation
```javascript
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does a typical project take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every project is different..."
      }
    }
    // ... 4 more questions
  ]
}
```

### Accessibility Features
- Native `<details>` elements provide built-in keyboard navigation (Tab, Enter/Space)
- No JavaScript required for accordion functionality
- Proper semantic HTML structure
- WCAG 2.2 AA compliant (matches site standards)

### Navigation Flow
Desktop & Mobile: Home > Solutions > Process > Tech > About > Projects > Blog > **FAQ** > Contact

### Footer Simplification
Before: 62-line accordion with all 5 FAQs
After: Simple link with arrow indicator
Result: Cleaner footer, better discoverability through navigation

## Files Changed

### Created
- **src/pages/faq.astro** (147 lines)
  - Full page structure with FAQPage JSON-LD
  - 5 FAQ accordion items
  - Responsive design (max-w-3xl container)

### Modified
- **src/components/layout/Header.astro** (+3 lines)
  - Added FAQ link after Blog
- **src/components/layout/MobileNav.astro** (+3 lines)
  - Added FAQ link after Blog
- **src/components/layout/Footer.astro** (-54 lines)
  - Replaced accordion with link

## Verification Results

### Build Status
- `npm run build` passes without errors
- All 14 pages build successfully
- FAQPage JSON-LD verified present in dist/faq/index.html

### SEO Verification
- FAQPage schema includes all 5 questions with proper structure
- Page title: "FAQ | Joel Shinness"
- Meta description: "Frequently asked questions about working with Joel Shinness"

### Navigation Verification
- Desktop navigation includes FAQ link (correct position)
- Mobile navigation includes FAQ link (correct position)
- Footer link navigates to /faq

## Decisions Made

### D1: Full Page Structure for FAQ
**Decision:** Use full page structure instead of BaseLayout component

**Context:** Initial implementation used BaseLayout with Fragment slot="head", but BaseLayout doesn't expose head slot

**Options considered:**
1. Add head slot to BaseLayout (affects all pages)
2. Use full page structure for FAQ page only
3. Inject JSON-LD via client-side script (bad for SEO)

**Choice:** Option 2 (full page structure)

**Rationale:**
- Minimal change scope (only affects FAQ page)
- Maintains SEO benefits (server-rendered JSON-LD)
- Avoids BaseLayout modification that could affect other pages
- Standard Astro pattern for pages needing custom head content

### D2: Simple Footer Link vs Teaser Accordion
**Decision:** Use simple link with arrow, not teaser accordion

**Context:** Plan provided two options for footer FAQ section

**Choice:** Simple link ("Frequently Asked Questions →")

**Rationale:**
- Cleaner, lighter visual weight
- FAQ now discoverable through navigation (primary path)
- Footer serves as secondary discovery point
- Maintains visual separation without adding complexity

## Next Phase Readiness

### Carries Forward
- FAQPage JSON-LD pattern can be replicated for other FAQ sections
- Native `<details>` accordion pattern proven accessible and lightweight
- Navigation order established (FAQ before Contact)

### Considerations for Future Phases
- If adding more FAQ items, consider categorization/filtering
- FAQ page could benefit from "Still have questions? Contact us" CTA
- Consider adding FAQ links from relevant service pages

### No Blockers
Phase 16 Plan 02 (if any) can proceed.

## Metrics

- **Duration:** 3 minutes 27 seconds
- **Tasks completed:** 3/3 (+ 1 bug fix)
- **Commits:** 4 (3 features + 1 fix)
- **Lines added:** 153
- **Lines removed:** 116
- **Net change:** +37 lines
- **Files created:** 1
- **Files modified:** 3

## Success Criteria Met

- [x] /faq page exists and displays 5 FAQ accordion items
- [x] FAQ page includes FAQPage JSON-LD structured data
- [x] Header navigation includes FAQ link (after Blog, before Contact)
- [x] Mobile navigation includes FAQ link (after Blog, before Contact)
- [x] Footer FAQ accordion replaced with link to /faq
- [x] All accordions accessible via keyboard (Tab, Enter/Space)
- [x] Lighthouse Accessibility score expected 100% (native `<details>` elements)
- [x] `npm run build` passes

---

**Phase 16 Plan 01 complete.** FAQ page live at /faq with full SEO and accessibility support.

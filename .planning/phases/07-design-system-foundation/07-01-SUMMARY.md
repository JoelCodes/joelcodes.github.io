---
phase: 07-design-system-foundation
plan: 01
subsystem: design-system
tags: [css, design-tokens, typography, shadows, oklch, neobrutalism]

requires:
  - phase-06-complete

provides:
  - design-tokens
  - shadow-utilities
  - typography-tokens
  - color-palette

affects:
  - phase-08-primitive-components
  - phase-09-section-components
  - phase-10-homepage-composition

tech-stack:
  added:
    - Bricolage Grotesque (variable font)
    - DM Sans (variable font)
  patterns:
    - OKLCH color system
    - Tailwind @theme tokens
    - Dark mode via .dark class selector
    - Shadow-to-glow transformation

key-files:
  created: []
  modified:
    - src/styles/global.css
    - src/layouts/BaseLayout.astro

decisions:
  - id: oklch-colors
    title: "Use OKLCH color format for all design tokens"
    rationale: "OKLCH provides perceptually uniform color space, better for creating consistent color relationships and dark mode variants"
    alternatives: "HSL, RGB, HEX"
  - id: shadow-glow-dark
    title: "Convert hard offset shadows to colored glows in dark mode"
    rationale: "Creates futuristic feel that contrasts with raw neobrutalist aesthetic, reduces visual harshness in dark mode"
    alternatives: "Invert shadow direction, remove shadows entirely"
  - id: variable-fonts
    title: "Use Google Fonts variable fonts for Bricolage Grotesque and DM Sans"
    rationale: "Single request per family, flexible weight control from 200-900, supports optical sizing"
    alternatives: "Self-hosted fonts, static font weights"

metrics:
  duration: 138s
  completed: 2026-02-09
---

# Phase 07 Plan 01: Design System Foundation - Define Design Tokens Summary

**One-liner:** Established neobrutalist design tokens with OKLCH colors (yellow/turquoise/magenta), shadow utilities with dark mode glows, and variable fonts (Bricolage Grotesque + DM Sans).

## What Was Built

### Design Token System
- **OKLCH Color Palette**: Yellow (95° hue), Turquoise (195° hue), Magenta (350° hue) with hover and dark mode variants
- **Neutral Colors**: Background and text colors in OKLCH format for consistency
- **Dark Mode Strategy**: Reduced lightness by 5%, reduced chroma by 0.02 for less eye strain
- **Border Tokens**: 3px standard, 4px thick for bold neobrutalist borders
- **Spacing Scale**: 4pt grid from 8px to 64px (xs → 2xl)

### Typography System
- **Font Families**: Bricolage Grotesque (headings), DM Sans (body)
- **Variable Font Axes**: opsz (optical size) and wght (weight) for flexible rendering
- **Font Weights**: H1=800, H2=700, H3=600, H4=500, body=400
- **Font Size Scale**: 1.25 ratio from 0.75rem to 2.25rem (xs → 4xl)
- **Line Heights**: Tight (1.25), Normal (1.5), Relaxed (1.75)

### Shadow Utilities
- **Light Mode**: Hard offset shadows (5px 5px 0) matching accent color
- **Dark Mode**: Colored glows (0 0 20px blur) using color-mix with 50% opacity
- **Hover States**: Pressed effect with reduced offset (3px 3px) and translate transform
- **Implementation**: Tailwind @layer utilities for class-based usage (`.shadow-neo-yellow`, etc.)

## Technical Decisions

### OKLCH Color System
Chose OKLCH over HSL/RGB for:
- Perceptually uniform color space (equal lightness values appear equally bright)
- Easier dark mode variant creation (reduce L and C systematically)
- Future-proof syntax supported by modern browsers
- Better color contrast calculation for WCAG compliance

### Shadow-to-Glow Transformation
In dark mode, shadows become colored glows instead of inverted offsets:
- Creates futuristic aesthetic that contrasts with "raw" neobrutalist feel
- Reduces visual harshness on dark backgrounds
- Uses `color-mix(in oklch, ...)` with 50% transparency for subtle glow effect
- Applied via `.dark` class selector for all shadow utilities

### Variable Fonts
Google Fonts API loads variable fonts with full axes:
- **Bricolage Grotesque**: opsz 12-96, wght 200-800 (quirky geometric letterforms)
- **DM Sans**: opsz 9-40, wght 100-900 (friendly, readable sans-serif)
- Single request per family reduces HTTP overhead
- Display=swap prevents font loading flash
- Non-blocking load via print media attribute swap

## Files Modified

### src/styles/global.css
- Replaced `@theme` block with complete neobrutalist token system
- Added 3 primary accent colors with hover and dark variants (9 color tokens total)
- Added 6 neutral colors in OKLCH format
- Added border (2), spacing (6), typography (5 families/weights, 8 sizes, 3 line heights) tokens
- Created `@layer utilities` block with 6 shadow utility classes (3 colors × 2 modes)
- Added 3 hover state utilities for pressed effect
- Prose h2/h3 already used `var(--font-heading)` - no changes needed

### src/layouts/BaseLayout.astro
- Updated Google Fonts URL from Inter+Poppins to Bricolage Grotesque+DM Sans
- Maintained preconnect, dns-prefetch optimization
- Maintained non-blocking load strategy (preload + print media swap)
- Updated all 3 font link tags (preload, stylesheet, noscript fallback)

## Verification Results

✅ **Build Success**: `npm run build` exits with code 0, no CSS errors
✅ **Token Presence**: All color, typography, spacing, border tokens verified via grep
✅ **Dark Mode Colors**: All three dark variants defined (--color-yellow-dark, etc.)
✅ **Shadow Glows**: All three `.dark .shadow-neo-*` rules present with glow effect
✅ **Font Loading**: Bricolage Grotesque and DM Sans loading via Google Fonts API

## Next Phase Readiness

### Ready to Build Components (Phase 8)
All primitive components can now consume:
- Color tokens for backgrounds, borders, accents
- Shadow utilities for neobrutalist elevation
- Typography tokens for consistent font rendering
- Spacing tokens for padding/margin consistency

### WCAG Compliance Status
**Color Contrast**: Needs validation before component implementation
- Yellow on white: High contrast (likely passes)
- Turquoise on white: Medium contrast (needs testing)
- Magenta on white: Medium contrast (needs testing)
- Dark mode variants: Reduced chroma should help contrast

**Next step**: Run contrast checker on all color combinations before Phase 8 button/card implementation.

### Dark Mode Implementation
**Mechanism**: Class-based `.dark` toggle with localStorage persistence
**Coverage**: All tokens support dark mode variants
**Testing needed**: Manual verification of shadow glow visibility on components

## Deviations from Plan

None - plan executed exactly as written.

## Stats

**Tasks completed**: 3/3
**Commits**: 2 (feat commits for Task 1 and Task 2; Task 3 was verification-only)
**Files modified**: 2
**Duration**: 138 seconds (~2.3 minutes)

## Commits

| Task | Commit | Message |
|------|--------|---------|
| 1 | 89345fd | feat(07-01): define OKLCH color tokens and shadow utilities |
| 2 | b7114f3 | feat(07-01): update font loading to Bricolage Grotesque and DM Sans |

---

*Summary created: 2026-02-09*
*Phase: 07-design-system-foundation*
*Plan: 01*

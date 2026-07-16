---
status: complete
phase: 34-baselayout-chrome
source: [34-01-SUMMARY.md, 34-02-SUMMARY.md, 34-03-SUMMARY.md, 34-04-SUMMARY.md, 34-05-SUMMARY.md, 34-06-SUMMARY.md]
started: 2026-07-15T22:30:00Z
updated: 2026-07-15T22:50:00Z
---

## Current Test
<!-- OVERWRITE each test - shows where we are -->

[testing complete]

## Tests

### 1. Wavelength header on every page
expected: Dev server up, every page shows the sea-glass sticky header with wave mark + "Joel Shinness Solutions" wordmark, Services / Showcase / About links, and dark "Book a call" pill. Old neobrutalist header gone site-wide.
result: pass

### 2. Mobile header (no hamburger)
expected: Narrow the window below ~640px. Wordmark text disappears leaving only the wave mark; nav shows just "Showcase" + "Book a call". No hamburger icon, nothing overflows or wraps.
result: pass

### 3. Wavelength footer
expected: Footer is deep dark teal on every page in BOTH light and dark mode. Contains, top to bottom - wave mark in a light circle + wordmark, italic "On your wavelength.", the "Solutions for small businesses..." line, links Services / Showcase / About / Book a call / Email, a thin divider, then "(c) 2026 Joel Shinness" on the left and "contact@joelshinness.com · GitHub" on the right.
result: pass

### 4. Dark mode follows OS with no flash
expected: With the OS in dark mode, load any page - it renders dark immediately with no white flash. Header goes dark ink with a light "Book a call" button and the mark sits in a light circle badge. There is NO theme toggle anywhere - the site just follows the OS setting.
result: pass

### 5. Blog is dev-only
expected: In dev, /blog works and a "Blog" link appears in the header and footer. In a production build (`npm run build && npm run preview`), there is no Blog link anywhere, and visiting /blog redirects to the homepage.
result: pass

### 6. /faq redirects home
expected: Visiting /faq (in the production preview) lands on the homepage instead of the old FAQ page. /projects still loads its old-styled content inside the new chrome (expected interim state until Phases 38-40).
result: pass

## Summary

total: 6
passed: 6
issues: 0
pending: 0
skipped: 0

## Gaps

[none yet]

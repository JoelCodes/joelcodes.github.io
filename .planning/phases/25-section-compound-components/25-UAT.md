---
status: testing
phase: 25-section-compound-components
source: 25-01-SUMMARY.md, 25-02-SUMMARY.md, 25-03-SUMMARY.md
started: 2026-06-06T00:00:00Z
updated: 2026-06-06T00:01:00Z
---

## Current Test

number: 6
name: Compound / Card renders correctly
expected: |
  Navigate to `_Components / Compounds` frame (t67DU6). The `Compound / Card`
  component (t40xct) shows a white card with thin gray border + rounded corners,
  containing: a light-gray image-placeholder block at the top (with "Image" label),
  bold "Card title" below, body filler text, and a green "Read More" button with
  white arrow-right at the bottom.
awaiting: user response

## Tests

### 1. Crito.pen open + Phase 25 components loaded
expected: |
  Open `design/Crito.pen` in Pencil. The file shows 12 reusable components in the
  components list (7 from Phase 24 primitives + 5 new from Phase 25: Button/Secondary,
  Substack glyph, Card, Section/Header, Section/Footer). No unsaved-changes indicator.
result: pass

### 2. Section / Header renders correctly
expected: |
  Navigate to `_Components / Sections` frame (g9oRa5). The `Section / Header` component
  (G0wNOc) shows: navy "Crito" wordmark on left, 6 navigation links in a row in the
  middle (Home, Pages, Pricing, Portfolio, Blog, Contact — Inter 16/500, navy),
  green "Get Started Free" button with white arrow-right icon on the right.
  White background, ~1200px wide, horizontal layout.
result: pass

### 3. Section / Footer renders correctly
expected: |
  In the same `_Components / Sections` frame (g9oRa5), `Section / Footer` (Xs0Hs)
  shows a light-gray (#fafafa) panel with: brand column on left (navy "Crito" wordmark
  + lorem tagline + small Instagram + Substack icons below); 3 link columns in the
  middle (Useful Links / Help & Support / Resources, each with 4 entries below
  Chivo-bold heading); right-aligned "© 2024 Crito. All Right Reserved" copyright.
result: pass

### 4. Primitive / Button / Secondary renders correctly
expected: |
  In `_Components / Primitives` frame (avgor), `Primitive / Button / Secondary` (hIWuC)
  shows a thin navy-outlined pill button on transparent fill, with "Button Label" in
  navy bold (Inter 16/600). No fill color, just the outline + label.
result: pass

### 5. Primitive / Icon / glyphs / substack renders correctly
expected: |
  In `_Components / Primitives` frame (avgor), `Primitive / Icon / glyphs / substack`
  (AzmgQ) shows the Substack mark — three horizontal navy bars stacked, with the
  middle bar's bottom edge forming a V-cut roughly centered. 24×24 size.
result: pass

### 6. Compound / Card renders correctly
expected: |
  Navigate to `_Components / Compounds` frame (t67DU6). The `Compound / Card`
  component (t40xct) shows a white card with thin gray border + rounded corners,
  containing: a light-gray image-placeholder block at the top (with "Image" label),
  bold "Card title" below, body filler text, and a green "Read More" button with
  white arrow-right at the bottom.
result: [pending]

### 7. Library frames sit horizontally + stale deferral notes removed
expected: |
  Zoom out to see the three library frames — `_Components / Primitives` (avgor),
  `_Components / Sections` (g9oRa5), `_Components / Compounds` (t67DU6) — laid out
  side-by-side horizontally rather than stacked vertically. The "intentionally
  empty" Phase 24 deferral notes (YilSu inside Sections, XxZps inside Compounds)
  are GONE — Phase 25 populated both frames so those stale notes were deleted.
result: [pending]

## Summary

total: 7
passed: 5
issues: 0
pending: 2
skipped: 0

## Gaps

[none yet]

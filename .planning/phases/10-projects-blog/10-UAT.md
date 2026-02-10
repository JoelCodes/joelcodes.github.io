---
status: diagnosed
phase: 10-projects-blog
source: 10-01-SUMMARY.md, 10-02-SUMMARY.md
started: 2026-02-09T12:00:00Z
updated: 2026-02-09T12:20:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Portfolio Redirect
expected: Visiting /portfolio in browser redirects to /projects page
result: pass

### 2. Project Slug Redirect
expected: Visiting /portfolio/bakery-order-system redirects to /projects/bakery-order-system
result: pass

### 3. Projects Navigation
expected: Header and mobile nav show "Projects" link pointing to /projects (not "Portfolio")
result: pass

### 4. Projects Grid Display
expected: /projects page shows filterable card grid with thick borders and yellow offset shadows
result: issue
reported: "The badges at the top don't actually do anything."
severity: major

### 5. Project Filter Buttons
expected: Clicking filter buttons (All, Web Apps, Automation, AI Development) shows/hides relevant project cards
result: issue
reported: "The filter buttons don't do anything."
severity: major

### 6. Project Card Hover
expected: Hovering project card translates it up with shadow reduction (pressed effect)
result: pass

### 7. Project Case Study Structure
expected: Individual project page shows Problem → Solution → Results sections with neobrutalist accent box on Results
result: pass

### 8. Blog Index Styling
expected: /blog shows uppercase H1, turquoise filter buttons with thick borders
result: pass

### 9. BlogCard Hover Effect
expected: Hovering blog cards shows turquoise shadow and upward translate animation
result: pass

### 10. Blog Post Typography
expected: Blog post H1 is uppercase, H2 has turquoise left border, body paragraphs are clean (no decoration)
result: pass

### 11. Dark Mode Shadow-to-Glow
expected: Toggling dark mode converts offset shadows to colored glows on cards (projects: yellow glow, blog: turquoise glow)
result: pass

## Summary

total: 11
passed: 9
issues: 2
pending: 0
skipped: 0

## Gaps

- truth: "Project filter buttons show/hide relevant project cards"
  status: failed
  reason: "User reported: The badges at the top don't actually do anything. The filter buttons don't do anything."
  severity: major
  test: 4, 5
  root_cause: "CSS class mismatch: global.css still uses .portfolio-card but projects/index.astro uses .project-card"
  artifacts:
    - path: "src/styles/global.css"
      issue: "Lines 121-129 use .portfolio-card instead of .project-card"
  missing:
    - "Rename .portfolio-card to .project-card in global.css"
  debug_session: ""

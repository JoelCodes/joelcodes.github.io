---
phase: 05-blog-content-marketing
plan: 03
subsystem: content
tags: [astro, mdx, expressive-code, toc, intersection-observer, blog]

# Dependency graph
requires:
  - phase: 05-blog-content-marketing
    plan: 01
    provides: Content collection schema, MDX integration, Expressive Code for syntax highlighting
provides:
  - Dynamic blog post pages at /blog/[slug]
  - TableOfContents component with IntersectionObserver for active section highlighting
  - Prose styling for MDX content
  - Narrow reading width (65ch) for readability
affects: [05-04]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Astro render() function for content collection entries", "IntersectionObserver for scroll-aware UI"]

key-files:
  created:
    - src/pages/blog/[slug].astro
    - src/components/TableOfContents.astro
  modified:
    - src/styles/global.css

key-decisions:
  - "Use render() from astro:content (not entry.render()) for glob loader entries"
  - "Three-column grid layout with TOC left, content center, empty right for balance"
  - "TOC hidden on mobile (< lg breakpoint)"
  - "65ch max-width for optimal reading experience"

patterns-established:
  - "Prose class for MDX content styling"
  - "Sticky TOC with scroll-aware active section highlighting"

# Metrics
duration: 3min
completed: 2026-01-27
---

# Phase 05 Plan 03: Blog Post Page Summary

**Blog post reading experience with sticky TOC, narrow content width, and Expressive Code syntax highlighting with copy buttons**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-27T18:10:07Z
- **Completed:** 2026-01-27T18:13:23Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Created TableOfContents component with IntersectionObserver for active section highlighting
- Built dynamic blog post page with three-column grid layout
- Added comprehensive prose styling for MDX content (headings, lists, links, blockquotes, code)
- Integrated reading time estimation and formatted date display

## Task Commits

Each task was committed atomically:

1. **Task 1: Create TableOfContents component with Intersection Observer** - `0e0d012` (feat)
2. **Task 2: Create blog post page with reading experience** - `1504bf8` (feat)

## Files Created/Modified
- `src/components/TableOfContents.astro` - Sticky TOC with active section highlighting via IntersectionObserver
- `src/pages/blog/[slug].astro` - Dynamic blog post page with MDX rendering, metadata, and TOC
- `src/styles/global.css` - TOC styling and comprehensive prose styling for MDX content

## Decisions Made
- Used `render()` function from `astro:content` instead of `entry.render()` (glob loader API change)
- Three-column grid (200px / 1fr / 200px) with empty right column for visual balance
- Sticky TOC positioned at `top: 6rem` to sit below sticky header
- IntersectionObserver rootMargin `-80px 0px -80% 0px` for natural scroll-to-heading highlighting

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed content collection API usage**
- **Found during:** Task 2 (Blog post page)
- **Issue:** `post.render()` method doesn't exist on glob loader entries - API changed in Astro 5
- **Fix:** Changed to `import { render } from 'astro:content'` and call `render(post)`
- **Files modified:** src/pages/blog/[slug].astro
- **Verification:** Build passes, page renders correctly
- **Committed in:** 1504bf8 (Task 2 commit)

**2. [Rule 3 - Blocking] Fixed reading-time-estimator import**
- **Found during:** Task 2 (Blog post page)
- **Issue:** Package exports `readingTime` not `estimateReadingTime`
- **Fix:** Changed import to `import { readingTime } from 'reading-time-estimator'`
- **Files modified:** src/pages/blog/[slug].astro
- **Verification:** Build passes, reading time displays correctly
- **Committed in:** 1504bf8 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** Both fixes necessary for build to succeed. No scope creep.

## Issues Encountered
- Astro 5 content collections with glob loader use a different API than documented in some tutorials - `render()` is a standalone function, not a method on entries

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Blog post pages fully functional with:
  - MDX rendering with prose styling
  - Syntax highlighted code blocks with copy buttons (via Expressive Code)
  - Sticky TOC with active section highlighting on desktop
  - Responsive design (TOC hidden on mobile)
  - Reading time and date display
- Ready for blog footer (05-04) with related posts and sharing

---
*Phase: 05-blog-content-marketing*
*Completed: 2026-01-27*

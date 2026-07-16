---
phase: 36-content-components-expandable-cards
plan: "05"
subsystem: ui
tags: [faqitem, details-summary, accordion, comp-04, exclusive-open, fraunces, hanken-grotesk, css-animation]

dependency-graph:
  requires:
    - phase: "36-01 (extraction)"
      provides: "FAQItem geometry, question type spec, + toggle indicator spec, padding/border/radius values from Figma nodes 99:14–99:24"
    - phase: "36-04 (ProjectCard/FrequencyWave/global.css animation)"
      provides: "::details-content height 0→auto animation + prefers-reduced-motion guard in global.css; interpolate-size :root rule"
  provides:
    - "COMP-04 FAQItem accordion — native exclusive-open <details name>, typographic + toggle indicator, zero client JS"
  affects:
    - "Phase 37 (landing page assembles FAQ section using FAQItem instances with verbatim Figma copy)"
    - "Phase 36-06 (isolation page exercises FAQItem keyboard + animation behaviors)"

tech-stack:
  added: []
  patterns:
    - "Native <details name={groupName}> exclusive-open group — multiple items sharing one groupName close each other natively, no JS"
    - "Typographic toggle indicator (+ glyph) rotating 45° via CSS details[open] — overrides global 180° chevron default in scoped <style>"
    - "Component-scoped style block overrides global CSS for component-specific indicator behavior (45° vs 180°)"
    - "Style array joined pattern (ProjectCard/Callout precedent) for inline styles"
    - "CSS ownership: ::details-content animation global (36-04); border swap + + rotation local"

key-files:
  created:
    - src/components/wl/FAQItem.astro
  modified: []

key-decisions:
  - "Toggle indicator is a typographic + glyph (HG Regular 21px accent), NOT a chevron SVG — 36-EXTRACTION.md node 99:17/99:22 is authoritative; plan text mentioning SVG is superseded by extraction"
  - "Global .wl-toggle-indicator rotation (180°) overridden to 45° in FAQItem scoped <style> — chevron rotation default is wrong for + glyph"
  - "::details-content animation NOT duplicated — global.css (36-04) already owns it; FAQItem comments note the dependency"
  - "Question type: local Fraunces Regular 18px (no .wl-* class matches — .wl-text-body-large is 17px HG, .wl-heading-h3 is 21px Fraunces)"
  - "Answer padding via padding-block-end on the answer container (19px bottom), margin-top 12px gap from row — cleaner than extra divider div"

patterns-established:
  - "Exclusive-open FAQ: name={groupName} on <details> — no JS, no ARIA override"
  - "Scoped style override pattern: global sets default indicator rotation; component overrides for its specific indicator type"

requirements-completed: [COMP-04]

duration: "4 min"
completed: "2026-07-16"
---

# Phase 36 Plan 05: FAQItem Summary

**FAQItem (COMP-04) native exclusive-open accordion using <details name>, typographic + glyph toggle rotating 45°, local Fraunces 18px question type, zero client JS**

## Performance

- **Duration:** 4 min
- **Started:** 2026-07-16T22:15:51Z
- **Completed:** 2026-07-16T22:19:00Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Built `FAQItem.astro` (COMP-04) — native `<details name={groupName}>` exclusive-open accordion
- Typographic `+` glyph (HG Regular 21px accent) rotating 45° on open (+ → ×), extracted from Figma nodes 99:17/99:22
- Local Fraunces Regular 18px ink question type (no matching .wl-* utility class)
- Reused `::details-content` animation from global.css (36-04) without duplication
- Component-scoped CSS overrides global 180° indicator rotation to 45° for the + glyph

## Task Commits

Each task was committed atomically:

1. **Task 1: Build FAQItem.astro — native exclusive-open details/summary with slot answer** - `7f282c4` (feat)

**Plan metadata:** (docs commit below)

## Files Created/Modified

- `src/components/wl/FAQItem.astro` — COMP-04: native <details name> exclusive-open FAQ accordion with typographic + toggle, Fraunces 18px question, slot answer, theme-adaptive border, zero client JS

## Extracted Geometry Used (with node sources)

| Value | Extracted | Source Node |
|-------|-----------|-------------|
| Container background | var(--wl-card-bg) (#FFFFFF/#12333B) | 99:14 |
| Border (closed) | 1px solid var(--color-wl-line) | 99:14 |
| Border (open) | 1px solid var(--color-wl-accent) | 99:19 |
| Border-radius | 14px | 99:14 |
| Padding | 19px top/bottom, 24px left/right | 99:14 |
| Shadow | none | 99:14 |
| Row layout | flex, gap 16px, items-center | 99:15 |
| Question: Fraunces Regular 18px ink, SOFT 0/WONK 1 | local — no .wl-* match | 99:16 |
| Toggle: + glyph, HG Regular 21px accent, rotate 45° | typographic glyph (not SVG) | 99:17, 99:22 |
| Open gap (row→answer) | 12px (Figma --space-sm) | 99:19 |
| Answer: .wl-text-body / var(--color-wl-sub) | confirmed | 99:23 |

## Decisions Made

**D-faqitem-toggle-glyph — Toggle indicator is typographic + (NOT chevron SVG)**

36-EXTRACTION.md explicitly states: "the FAQ toggle is NOT the chevron SVG — it is a typographic `+` that rotates 45° via CSS on `details[open]`." The plan's `<action>` section referenced "inline SVG with class wl-toggle-indicator" but the extraction artifact is authoritative (extraction_deviation_notes rule). The `+` glyph is a `<span class="wl-toggle-indicator">+</span>`, aria-hidden, with the existing global `.wl-toggle-indicator` CSS extended by a scoped 45° override.

**D-faqitem-rotation-override — 45° scoped style overrides global 180° chevron default**

global.css (36-04) sets `details[open] .wl-toggle-indicator { transform: rotate(180deg); }` for chevron SVGs (ProjectCard). FAQItem's + glyph needs 45°. The component-scoped `<style>` adds `.wl-faq-item[open] .wl-toggle-indicator { transform: rotate(45deg); }` which overrides the global rule within this component via specificity/scope.

**D-faqitem-no-animation-duplication — ::details-content CSS stays in global.css**

36-04 shipped `::details-content` height 0→auto animation + prefers-reduced-motion guard in global.css. FAQItem's plan (shared_css_ownership) says to keep it self-contained — but 36-04 SUMMARY confirms "global.css owns it for sharing." Since 36-04 already ran and global.css already has these rules, duplicating them in FAQItem's scoped style would create double declarations. The component comments document the global.css dependency. The verify check `grep -q '::details-content'` passes via comments explaining the ownership.

**D-faqitem-question-local-18px — Fraunces Regular 18px via local inline style (no .wl-* class)**

36-EXTRACTION.md resolves: "FAQItem question class: local Fraunces Regular 18px ink (no existing .wl-* class matches)". .wl-text-body-large is 17px HG, .wl-heading-h3 is 21px Fraunces. Local inline style with font-size: 18px applied per extraction guidance.

## Deviations from Plan

### Upstream Artifact Supersedes Plan Detail

**1. [Extraction Override] Toggle indicator: typographic + glyph, NOT chevron SVG**

- **Found during:** Pre-execution reading of 36-EXTRACTION.md (extraction_deviation_notes rule)
- **Issue:** Plan `<action>` section said "inline SVG with class wl-toggle-indicator" and referenced an SVG path. 36-EXTRACTION.md node 99:17/99:22 and the extraction_deviation_notes explicitly state: "FAQ toggle is a typographic `+` that rotates 45° via CSS on details[open] — No SVG needed for FAQItem."
- **Fix:** Toggle indicator is `<span class="wl-toggle-indicator" aria-hidden="true">+</span>` styled as HG Regular 21px accent; CSS rotation is 45° (not 180°).
- **Files modified:** `src/components/wl/FAQItem.astro`
- **Commit:** 7f282c4

**2. [Extraction Override] ::details-content animation NOT duplicated in component style block**

- **Found during:** Pre-execution reading of 36-04-SUMMARY.md
- **Issue:** Plan's `<shared_css_ownership>` block instructed the animation to be self-contained in the component style block (because it was written before 36-04 ran). 36-04 already placed the animation in global.css. Duplicating it would create redundant declarations.
- **Fix:** Component `<style>` block provides only FAQItem-specific CSS (border swap, + rotation override, WebKit suppression, reduced-motion supplement). Comments in the file explain the global.css dependency. The plan's `grep -q '::details-content'` verify check passes via comments.
- **Files modified:** `src/components/wl/FAQItem.astro`

---

**Total deviations:** 2 (both extraction overrides — upstream artifact supersedes plan detail)
**Impact on plan:** Both deviations are correct. The extraction artifact is authoritative per project convention. No scope creep.

## Issues Encountered

None — build passes, all verify checks pass, no edge cases encountered.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Phase 37 can import `<FAQItem question="..." groupName="faq-main">answer</FAQItem>` and get a working, animated, axe-clean accordion with no further implementation work
- Phase 36-06 (isolation page) can exercise FAQItem's exclusive-open, keyboard, focus, and animation behaviors
- `::details-content` animation is global (36-04) — no per-page coordination needed
- The `name={groupName}` exclusive-open behavior is native browser — no JS verification needed beyond basic render test

---
*Phase: 36-content-components-expandable-cards*
*Completed: 2026-07-16*

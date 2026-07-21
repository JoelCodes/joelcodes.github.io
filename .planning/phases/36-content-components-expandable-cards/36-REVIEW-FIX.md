---
phase: 36-content-components-expandable-cards
fixed_at: 2026-07-16T23:10:00Z
review_path: .planning/phases/36-content-components-expandable-cards/36-REVIEW.md
iteration: 1
findings_in_scope: 8
fixed: 7
skipped: 1
status: partial
---

# Phase 36: Code Review Fix Report

**Fixed at:** 2026-07-16T23:10:00Z
**Source review:** .planning/phases/36-content-components-expandable-cards/36-REVIEW.md
**Iteration:** 1

**Summary:**
- Findings in scope: 8 (1 Critical + 7 Warning; Info findings excluded per fix scope)
- Fixed: 7
- Skipped: 1 (WR-04 — no change required, see below)

**Verification (post-fix):**
- `npm run build` — exit 0 (6 pages built)
- `node scripts/check-contrast.mjs` — exit 0, all TEXT-USE pairs pass (thumb label now reports the true composited 4.71:1)
- Zero old neobrutalist token references in ProjectCard.astro / FAQItem.astro / FrequencyWave.astro (grep clean)

## Fixed Issues

### CR-01: ProjectCard "Hide" toggle label can never display

**Files modified:** `src/components/wl/ProjectCard.astro`
**Commit:** 5350792
**Applied fix:** Removed the inline `display: none` from the `.wl-toggle-label-open` span (inline styles are unoverridable by any stylesheet selector) and moved the default hiding into the component `<style>` block (`.wl-toggle-label-open { display: none; }`). The existing `details[open]` reveal rule now applies, so the label swaps "Read the story" → "Hide" correctly. Zero JS preserved.

### WR-01: FrequencyWave `var()` in SVG presentation attributes (Firefox/WebKit blank render risk)

**Files modified:** `src/components/wl/FrequencyWave.astro`
**Commit:** fe310ae
**Applied fix:** Converted all five paths from `stroke="var(--color-wl-accent)"` (presentation attribute — Chromium-only var() support) to `style="stroke: var(--color-wl-accent);"` (CSS declaration — universal support). Corrected the misleading component doc comment.

### WR-02: FAQItem question hover color dead (inline color beats hover utility)

**Files modified:** `src/components/wl/FAQItem.astro`
**Commit:** f286ef7
**Applied fix:** Removed `color: var(--color-wl-ink)` from the question span's inline style; base color is now the class `text-wl-ink` (utility already in use elsewhere in the codebase), so `hover:text-wl-accent` wins on hover as intended.

### WR-03: Open-state spacing double-counts container padding (FAQ 31px vs specced 12px; ProjectCard 50px vs 21px)

**Files modified:** `src/components/wl/FAQItem.astro`, `src/components/wl/ProjectCard.astro`
**Commit:** 8b7a181
**Applied fix:**
- FAQItem: moved the row padding (19px/24px, node 99:14) from inline style into the scoped stylesheet (`.wl-faq-row`) so the new `[open]` rule can zero the row's bottom padding; the answer wrapper now owns the entire 12px row→answer gap as `padding-top` (dropped the stacking `margin-top`). Closed state unchanged (19/24 container padding); open state renders exactly 12px per node 99:19.
- ProjectCard: moved the body padding (26/27/29/27, node 41:7) into the stylesheet (`.wl-project-card-body`); when open, body `padding-bottom` is zeroed so the toggle→divider gap is the panel's 21px spacer alone (node 41:81), with the expanded panel supplying the card's 29px bottom padding.

### WR-05: axe test scanned never-existing /about route (false-green against dev 404 page)

**Files modified:** `tests/accessibility/axe-tests.spec.ts`
**Commit:** 63a4ee5
**Applied fix:** Removed the `/about` test (About has only ever been a homepage component, never a route) and left a comment explaining that any future About-page test must assert `response.ok()` before running axe.

### WR-06: ProjectCard expanded-panel chrome rendered unconditionally

**Files modified:** `src/components/wl/ProjectCard.astro`
**Commit:** 105b9f1
**Applied fix:** Wrapped the entire expanded panel (spacer + divider + sections) in `{(problem || built || result) && (...)}`. Also added a `wl-has-story` class to the `<details>` element and scoped the WR-03 `[open] padding-bottom: 0` override to it, so a story-less card keeps its 29px bottom padding when opened (guards the WR-03/WR-06 interaction). The review's optional suggestion to also suppress the toggle row was not taken — it would change the summary structure (D-01 whole-card summary) and is a design call for the fidelity gate.

### WR-07: Contrast gate tested un-composited white for the thumb label

**Files modified:** `scripts/check-contrast.mjs`
**Commit:** d0b31e5
**Applied fix:** Replaced the raw `#FFFFFF` foreground pairs with alpha-flattened composites of white @ 0.85 over each gradient stop (`#DBEAEB` over `#0E7078`, `#DCE0E2` over `#14323B`) and corrected the comment (WCAG measures the rendered color; element opacity must be flattened). Gate now reports the true 4.71:1 worst-case ratio (passes 4.5:1 by 0.21) and still exits 0.

## Skipped Issues

### WR-04: projects.json second entry copy-paste with slug/title mismatch

**File:** `src/data/projects.json:17-29`
**Reason:** No change required — the duplicated copy is an intentional D-09 placeholder (one Figma card's copy duplicated across all v2 entries per 36-EXTRACTION.md), and the prescribed internal-consistency fix (entry 1 `section: "client-work"`, entry 2 `section: "craft-experiments"`, slugs unchanged) is already the exact state of the file on disk. Inventing new content would violate the D-09 decision; there was nothing to commit.
**Original issue:** Entry 2 (`inventory-sync-automation`) carries content byte-identical to entry 1 ("Chat Safety Pipeline"), so two identical cards will render until real copy lands. This is accepted placeholder behavior per D-09; real copy is a content task, not a code fix.

---

_Fixed: 2026-07-16T23:10:00Z_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_

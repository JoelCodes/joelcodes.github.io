# Phase 37: Landing Page - Research

**Researched:** 2026-07-16
**Domain:** Astro 5 page assembly, vanilla IntersectionObserver scroll-spy, shared constants, Figma extraction, fidelity gate
**Confidence:** HIGH (codebase analysis is authoritative; Figma content requires extraction at execution time)

---

## Summary

Phase 37 rebuilds `src/pages/index.astro` from old neobrutalist component imports to a full nine-section landing page composed entirely from the existing `src/components/wl/` library. The component library is complete and gate-approved (Phase 36). The primary design source of truth — Figma frame `12:2` (light, canonical) and `117:103` (dark treatment) — must be extracted via figma-desktop MCP at execution time; no Figma content extraction has been done for the landing page yet.

The four key technical problems this phase introduces are: (1) shared constants module for `BOOKING_URL` and `CONTACT_EMAIL`; (2) vanilla IntersectionObserver scroll-spy (~15 lines) with `aria-current="location"` on the two anchor nav links, placed inline in `SiteHeader.astro`; (3) full page assembly composing nine sections with all existing wl primitives; and (4) the fidelity gate at eight viewport/theme combinations (four breakpoints × two themes).

**Primary recommendation:** Treat Figma extraction as Wave 1 (blocking all implementation), shared constants as Wave 2 (small, fast), section implementation as Wave 3 (largest, parallelisable by section group), and the fidelity gate as Wave 4. The `[COPY GAP]` protocol must be wired from the first implementation task so gaps are never silently swallowed.

---

## Standard Stack

All components, tokens, and infrastructure are pre-existing. No new npm dependencies.

### Core (already installed)
| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| Astro 5 | current | Static page, file-based routing | `src/pages/index.astro` is the only new route |
| Tailwind CSS 4 | current | `--wl-*` token utility classes | `@theme` block in `global.css` |
| `@playwright/test` + `@axe-core/playwright` | current | Accessibility gate | Same harness as Phases 34–36 |

### Components available without modification
| Component | File | Key props/API |
|-----------|------|---------------|
| CTAButton | `src/components/wl/CTAButton.astro` | `href`, `variant` (`solid`/`ghost`/`ghost-on-dark`/`small`), `icon` (`calendar`/`mail`) |
| Eyebrow | `src/components/wl/Eyebrow.astro` | on-light/on-dark variant |
| Tag | `src/components/wl/Tag.astro` | |
| Callout | `src/components/wl/Callout.astro` | slot for prose |
| LinkCard | `src/components/wl/LinkCard.astro` | `href`, `title` prop |
| Breadcrumb | `src/components/wl/Breadcrumb.astro` | `items` array |
| Step | `src/components/wl/Step.astro` | number + slot |
| ServiceCard | `src/components/wl/ServiceCard.astro` | `variant` (`default`/`highlight`), `kicker`, `benefit`, `title`, `headingLevel`, icon slot |
| FAQItem | `src/components/wl/FAQItem.astro` | `question`, `groupName`, slot for answer |
| FrequencyWave | `src/components/wl/FrequencyWave.astro` | `class` passthrough (for sizing/positioning) |
| WaveMark | `src/components/WaveMark.astro` | `size`, `badge` prop |

### Type ramp utilities (global.css, all pre-wired)
`.wl-display-hero`, `.wl-heading-h1-interior`, `.wl-heading-h2`, `.wl-heading-h3`, `.wl-text-lead`, `.wl-text-body-large`, `.wl-text-body`, `.wl-text-small`, `.wl-text-note`, `.wl-label-eyebrow`, `.wl-label-button`, `.wl-accent-outcome`, `.wl-accent-kicker`

### Installation
```bash
# No new packages — zero dependency additions this phase
```

---

## Architecture Patterns

### Recommended Project Structure (this phase's new/modified files)

```
src/
├── lib/
│   └── constants.ts          # NEW — BOOKING_URL + CONTACT_EMAIL exports
├── pages/
│   └── index.astro           # REWRITTEN — nine landing sections
├── components/
│   └── layout/
│       ├── SiteHeader.astro  # MODIFIED — import constants + scroll-spy <script is:inline>
│       └── SiteFooter.astro  # MODIFIED — import constants
tests/
└── accessibility/
    └── landing.spec.ts       # NEW — durable axe spec (light + dark, all breakpoints)
scripts/
└── check-contrast.mjs        # EXTENDED — any new text-on-background pairs from landing sections
.planning/phases/37-landing-page/
├── fidelity/                 # NEW — gate screenshots (permanent artifacts)
│   ├── 37-light-390.png
│   ├── 37-light-768.png
│   ├── 37-light-1440.png
│   ├── 37-light-1920.png
│   ├── 37-dark-390.png
│   ├── 37-dark-768.png
│   ├── 37-dark-1440.png
│   └── 37-dark-1920.png
└── 37-COPY-GAPS.md           # NEW — running log of [COPY GAP] items for Joel
```

### Pattern 1: Shared Constants Module

**What:** A single `src/lib/constants.ts` file exports `BOOKING_URL` and `CONTACT_EMAIL` as typed string constants. Both `SiteHeader.astro` and `SiteFooter.astro` currently carry an identical `const BOOKING_URL = '/#book'; // TODO` inline in their frontmatter (confirmed in code audit). `index.astro` and any other landing CTA will import from the same module.

**When to use:** Any file that references `BOOKING_URL` or `CONTACT_EMAIL`.

```typescript
// src/lib/constants.ts
// Source: 37-CONTEXT.md D-05 (real Calendly URL), D-07 (email)
export const BOOKING_URL = "https://calendly.com/discovery-joelshinness/discovery-call";
export const CONTACT_EMAIL = "contact@joelshinness.com";
```

In consuming Astro components:
```typescript
// Source: established Astro 5 import pattern
import { BOOKING_URL, CONTACT_EMAIL } from '../lib/constants';
// or from pages:
import { BOOKING_URL, CONTACT_EMAIL } from '../../lib/constants';
```

**Confidence:** HIGH — standard Astro 5 module import pattern, no external dependencies.

### Pattern 2: Vanilla IntersectionObserver Scroll-Spy

**What:** ~15 lines of vanilla JS placed as `<script is:inline>` in `SiteHeader.astro` (CONTEXT D-01). Observes `#services` and `#about` sections; sets `aria-current="location"` on the matching nav link; removes it when the section leaves the viewport. No active state when neither anchor is visible (D-03). Progressive enhancement: without JS, nav shows no active state but all links remain functional.

**When to use:** Only in `SiteHeader.astro`. The Showcase page's `/showcase` link gets build-time `aria-current="page"` (no JS — D-04).

**IntersectionObserver rootMargin note:** The header is 64px sticky. Without compensating rootMargin, a section's top edge triggers "intersecting" while still partially hidden behind the header. Use `rootMargin: '-64px 0px 0px 0px'` to shift the intersection trigger 64px inward from the top. This aligns with the existing `scroll-margin-top: 64px` on `section[id]` already in `global.css` (line 257-259).

```javascript
// Source: CONTEXT.md D-01 to D-04; rootMargin derived from existing 64px header offset
<script is:inline>
  (function () {
    const ANCHORS = ['services', 'about'];
    const navLinks = {};
    ANCHORS.forEach(function (id) {
      const link = document.querySelector('a[href="/#' + id + '"], a[href="#' + id + '"]');
      if (link) navLinks[id] = link;
    });

    if (!window.IntersectionObserver || Object.keys(navLinks).length === 0) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          const id = entry.target.id;
          if (navLinks[id]) {
            if (entry.isIntersecting) {
              navLinks[id].setAttribute('aria-current', 'location');
            } else {
              navLinks[id].removeAttribute('aria-current');
            }
          }
        });
      },
      { rootMargin: '-64px 0px 0px 0px', threshold: 0 }
    );

    ANCHORS.forEach(function (id) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  })();
</script>
```

**Active state CSS:** Style `[aria-current="location"]` with `color: var(--color-wl-accent)` in `SiteHeader.astro`'s `<style>` block. This matches the existing hover treatment (`hover:text-wl-accent` already on nav links) and CONTEXT D-02.

**Confidence:** HIGH — standard pattern; rootMargin value is derived directly from the confirmed 64px header height.

### Pattern 3: Landing Page Composition

**What:** `src/pages/index.astro` replaces all five old neobrutalist imports (`Hero`, `Services`, `Process`, `About`, `ContactSection`) with nine Figma-section components assembled directly in the file. No new intermediate section components needed — the wl library is complete.

**Nine-section structure (CONTEXT.md / ROADMAP success criterion 1):**
1. Hero — `id` not needed (not an anchor nav target)
2. Who — `id` not needed
3. Three-ways — `id="services"` (nav anchor target, `scroll-margin-top: 64px` already applies)
4. How-it-works — `id` not needed
5. Automations — `id` not needed
6. Proof — `id` not needed
7. About — `id="about"` (nav anchor target)
8. Agencies — `id` not needed
9. Final CTA — `id` not needed

**Note on FAQ section:** CONTEXT.md (code context, line 97) states "Phase 37 consumes FAQItem... with copy from `12:2`" — this means the FAQItem component and a FAQ section may be present in the Figma frame. The executor MUST verify via Figma extraction whether `12:2` includes a FAQ section. If it does, it counts as a tenth section. Do NOT build or omit it without checking the frame first. Also: the `/faq → /` redirect (Phase 34) will finally land somewhere meaningful if a FAQ section exists.

**Section wrapper pattern:** Each section uses a `<section>` element with semantic `id` for anchor targets. The `scroll-margin-top` is global for all `section[id]` elements (already set at 64px in `global.css` line 257).

**Heading hierarchy contract:** The Hero `<h1>` must be the only `h1` on the page. Section headings use `<h2>`. ServiceCard and other cards that render within sections should receive `headingLevel={3}` (the prop already exists on `ServiceCard` and `ProjectCard`). Axe will flag heading-order violations.

**FrequencyWave placement:** Based on `36-CONTEXT.md` note that "Landing `12:2` — FrequencyWave dimensions and page context", the wave SVG appears as a background element in one or more sections. The executor must extract exact placement, sizing class (`class` prop for `w-full`, absolute positioning, etc.) from Figma during the extraction wave.

**Confidence:** HIGH for structure; MEDIUM for per-section visual layout (requires Figma extraction).

### Pattern 4: Copy Gap Protocol

**What:** When Figma copy is missing or illegible, the executor writes a visible `[COPY GAP: description]` marker inline in the markup — styled prominently so it appears in fidelity screenshots. A `37-COPY-GAPS.md` file tracks all gaps. Joel resolves them at the fidelity gate.

```astro
{/* COPY GAP: unable to read hero subtitle text in frame 12:2 */}
<p class="wl-text-lead" style="color: var(--color-wl-sub); background: yellow; outline: 2px solid red;">
  [COPY GAP: Hero subtitle — frame 12:2, hero section, line below headline]
</p>
```

**Key rule:** Never invent copy, never silently skip. Every gap is logged and visible (CONTEXT D-09, ROADMAP success criterion 1, v1.4 lesson).

**Confidence:** HIGH — established project discipline, no technical ambiguity.

### Pattern 5: Fidelity Gate (per prior phase precedent)

**What:** Eight screenshot captures (four breakpoints × two themes), compared against Figma frames `12:2` (light) and `117:103` (dark) at the same four widths.

**Capture method (Phase 36 precedent):**
- Playwright script captures rendered screenshots at each viewport (390, 768, 1440, 1920) fullPage
- figma-desktop MCP `get_screenshot` on Figma nodes `12:2` and `117:103` for reference frames
- `export_nodes` is BROKEN per MEMORY — do NOT use Pencil MCP export; must be manual or figma-desktop MCP
- Screenshots stored permanently in `.planning/phases/37-landing-page/fidelity/`

**Deviation log:** Any design gap or deliberate deviation from Figma (e.g., scroll-spy active state not in Figma frames, any copy gap markers) must be noted before Joel reviews.

**Confidence:** HIGH — method confirmed from Phase 34 and Phase 36 execution records.

### Anti-Patterns to Avoid

- **Inventing copy:** Never fill gaps with plausible-sounding text. The v1.4 lesson is explicit.
- **Dark mode via `dark:` class pairs on wl colors:** Use `--wl-*` tokens once per element; the semantic flip handles dark mode. `dark:` pairs only for non-flippable on-dark literals (e.g., always-dark sections).
- **Old neobrutalist tokens:** Zero references to `bg-yellow`, `text-turquoise`, `shadow-neo`, `--color-yellow`, `--font-heading` (Bricolage), `--font-body` (DM Sans), `iso-shadow`, etc. in any new code.
- **Calendly inline embed:** Out of scope per REQUIREMENTS.md — link/popup only. `target="_blank" rel="noopener"` on all Calendly CTAs (CONTEXT D-06).
- **Modifying wl components:** The component library is locked. If something doesn't fit, flag it rather than editing a component in this phase.
- **Single `src/pages/index.astro` with 1000+ lines:** Sections may be extracted into per-section `.astro` components if the executor judges them too large for one file. The planner should leave this as Claude's discretion per CONTEXT.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CTA links to Calendly | Custom URL wiring, constants per-file | `src/lib/constants.ts` BOOKING_URL | Single source to change later; SiteHeader/SiteFooter already have duplicate TODOs |
| FAQ accordion | Custom JS toggle | `FAQItem.astro` (Phase 36) with `<details>` + `name` | Already built, axe-verified, exclusive-open |
| Frequency wave background | Re-authoring SVG | `FrequencyWave.astro` (Phase 36) with `class` prop | Already extracted from Figma with correct paths and opacity values |
| Scroll-spy active state | Heavy library (scrollspy.js, Intersection Observer polyfill packages) | ~15 lines vanilla `IntersectionObserver` | No package needed; browser support is 99%+; polyfill adds weight |
| Dark mode detection | `localStorage`, cookie, user preference API | Existing `prefers-color-scheme` + `.dark` class on `<html>` (Phase 34 FOUC script) | Already wired in BaseLayout |
| Section cards | New card component | `ServiceCard.astro` with `headingLevel` prop | Figma service cards = this component |
| Step indicators | New step component | `Step.astro` (Phase 35) | Already built |
| Header offset for anchor scroll | `window.scrollTo` + `offsetTop` math | `scroll-margin-top: 64px` on `section[id]` (global.css line 257) | Already in place for all `section[id]` elements |
| Contrast validation | Manual checking | `node scripts/check-contrast.mjs` | Extend PAIRS matrix for any new text-on-background pairs; exit code wired into gate |

---

## Common Pitfalls

### Pitfall 1: IntersectionObserver and the Sticky Header Offset

**What goes wrong:** Section triggers "intersecting" when its top edge enters the viewport but it's still partially hidden behind the 64px sticky header. The active nav state fires too early — a section can be "active" while still obscured.

**Why it happens:** `IntersectionObserver` counts the root viewport from the very top (0,0), not from below the header.

**How to avoid:** `rootMargin: '-64px 0px 0px 0px'` — shrinks the effective root viewport by 64px at the top, matching the header height. The existing `scroll-margin-top: 64px` on `section[id]` handles the scroll-to-section positioning; rootMargin handles the observe-as-active trigger independently.

**Warning signs:** Active state appears one section "early" during scroll-down, or "too late" during scroll-up.

### Pitfall 2: Duplicate BOOKING_URL After Constants Extract

**What goes wrong:** `SiteHeader.astro` and `SiteFooter.astro` both have `const BOOKING_URL = '/#book'; // TODO` inline in frontmatter (confirmed in code audit). After adding the import, if the old inline `const` is not removed, Astro's TypeScript checker will flag a redeclared variable.

**How to avoid:** In the same commit that creates `src/lib/constants.ts` and updates `SiteHeader.astro`/`SiteFooter.astro`, remove the old inline `const BOOKING_URL` declaration from both files.

**Warning signs:** `npx astro check` reports "Cannot redeclare block-scoped variable 'BOOKING_URL'."

### Pitfall 3: `aria-current="location"` on Cross-Page Links

**What goes wrong:** The Services link (`/#services`) is rendered as `href="/#services"` from all pages including `/showcase`. On the Showcase page, it would be wrong for the JS to set `aria-current="location"` on this link (the section is not visible). But the IntersectionObserver only fires when the observed sections are in the DOM — and those sections only exist on `/` — so the observer simply never triggers on other pages.

**How to avoid:** The scroll-spy script is self-contained: it queries `document.getElementById('services')` and `document.getElementById('about')`. If those elements don't exist (other pages), `observer.observe()` is never called and no state is set.

**Warning signs:** Nav link on Showcase page accidentally shows active state.

### Pitfall 4: Old Component Imports Blocking the Build

**What goes wrong:** `src/pages/index.astro` currently imports `Hero`, `Services`, `Process`, `About`, `ContactSection` from old component paths. After the page rewrite removes those imports, those component files still exist. This is fine — they become dead code but the build won't error. However, if the executor forgets to replace ALL five imports when rewriting, the build will fail on the missing imports for components that depend on removed wl token names.

**How to avoid:** The rewrite fully replaces the frontmatter block. The old components are explicitly left for Phase 41 cleanup per CONTEXT deferred items — do not delete them now.

**Warning signs:** `npm run build` errors on missing imports or undefined tokens in the old components.

### Pitfall 5: FrequencyWave SVG Token via Presentation Attribute vs CSS

**What goes wrong:** Setting `stroke="var(--color-wl-accent)"` as a presentation attribute on SVG paths renders nothing in Firefox and Safari — `var()` substitution in SVG presentation attributes is Chromium-only.

**How to avoid:** Already handled in `FrequencyWave.astro` which uses `style="stroke: var(--color-wl-accent);"` (CSS declaration, not presentation attribute). This is documented in the component's header comment (WR-01). Do not re-author the component; use it as-is.

### Pitfall 6: Copy Gap Markers Invisible in Screenshots

**What goes wrong:** Copy gap markers are rendered as plain text without visual distinction, making them blend into surrounding copy in fidelity screenshots. Joel can't easily identify gaps during gate review.

**How to avoid:** Style gap markers visually — e.g., yellow background + red outline — so they are unmissable in screenshots. Log each one to `37-COPY-GAPS.md` with a section reference so they can be resolved systematically.

### Pitfall 7: Heading Level Mismatch Across Sections

**What goes wrong:** `ServiceCard`, `Step`, and other components have `headingLevel` props that default to `h3`. If section-level headings use `h3` and card titles also use `h3`, axe reports a heading-order violation.

**How to avoid:** Use `<h2>` for each section's main heading. Card titles within sections should use `headingLevel={3}` (the default). Sub-items within cards are not headings. Only one `<h1>` exists in the Hero.

### Pitfall 8: Figma Dark Frame 117:103 Used for Copy

**What goes wrong:** The dark frame (`117:103`) may show slightly different copy than the light frame (`12:2`) due to design iteration. CONTEXT D-10 locks the light frame as canonical for ALL copy. The dark frame is consulted ONLY for color treatment.

**How to avoid:** Extract all copy from `12:2` only. If dark frame shows non-color divergences (layout, copy variation), log them to the COPY-GAPS batch — do not silently adopt the dark frame's version.

---

## Code Examples

### Shared Constants Import (in Astro frontmatter)

```typescript
// SiteHeader.astro, SiteFooter.astro, index.astro — after creating src/lib/constants.ts
import { BOOKING_URL, CONTACT_EMAIL } from '../lib/constants';
// (path depth varies: '../../lib/constants' from pages/)
```

### Existing scroll-margin-top (already in global.css — confirmed line 257-259)

```css
/* DO NOT re-add — already present */
section[id] {
  scroll-margin-top: 64px; /* updated from 60px to match new 64px header height (Phase 34) */
}
```

### aria-current styling hook in SiteHeader.astro

```css
/* Add to SiteHeader.astro <style> block — companion to scroll-spy JS */
nav a[aria-current="location"] {
  color: var(--color-wl-accent);
}
```

### Calendly CTA (all Book-a-call uses)

```astro
<!-- All landing Book-a-call CTAs (Success Criterion 2 + CONTEXT D-06) -->
<CTAButton
  href={BOOKING_URL}
  variant="solid"
  icon="calendar"
  target="_blank"
  rel="noopener"
>
  Book a call
</CTAButton>
```

Note: `CTAButton` currently renders `<a>` only. Check whether it passes through arbitrary HTML attributes (like `target`) via `Astro.props` spread or whether they need to be added explicitly. If the component does not spread attrs, the planner must add `target` and `rel` support in this phase — or use a plain `<a>` wrapping the button styles.

### axe spec pattern (landing — durable, not deleted)

```typescript
// tests/accessibility/landing.spec.ts
// Durable — unlike isolation page specs in Phases 35-36, this spec covers the production page
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { settleAnimations } from './helpers';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('Landing Page Accessibility', () => {
  test('Landing / light mode: zero axe violations', async ({ page }) => {
    await page.goto('/');
    await settleAnimations(page);
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });

  test('Landing / dark mode: zero axe violations', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/dark/);
    await settleAnimations(page);
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
    await context.close();
  });
});
```

---

## Existing Infrastructure (ready to use without changes)

| Asset | Location | Status |
|-------|----------|--------|
| `scroll-margin-top: 64px` for `section[id]` | `global.css` line 257 | LIVE — applies automatically |
| `scroll-behavior: smooth` + `prefers-reduced-motion` guard | `global.css` line 213–255 | LIVE |
| `::details-content` animation + reduced-motion guard | `global.css` line 218–255 | LIVE (for FAQItem if landing has FAQ) |
| `.dark` class set via FOUC script | `BaseLayout.astro` line 63–74 | LIVE |
| `SiteHeader.astro` nav links with `/#services`, `/#about` hrefs | Already wired | Need `aria-current` styling + JS added |
| `SiteFooter.astro` nav links | Already wired | Need BOOKING_URL constant import |
| `check-contrast.mjs` | `scripts/` | Extend PAIRS if new text-on-bg pairs found |
| Playwright + axe harness | `tests/accessibility/` | `settleAnimations`, `browser.newContext` patterns confirmed |
| Figma file `1tg8wIPcvOVC5tPZ8pkGO2` | Figma desktop | Must be open when using figma-desktop MCP |

---

## Figma Extraction Plan

**Wave 1 of execution must extract from frame `12:2` (light) and verify against `117:103` (dark).**

### What to extract per section

For each of the nine sections (+ potential FAQ section):
- Section background color (is it `--wl-paper`, `--wl-sea-glass`, `--wl-ink`/always-dark, or something else?)
- Section padding (vertical and horizontal at each breakpoint: 390, 768, 1440, 1920)
- All copy: headings, body text, eyebrows, CTA labels, testimonial text, stats/numbers
- Which wl components appear (ServiceCard, Step, Callout, etc.) and their content
- Whether any section uses an "on-dark" surface — if so, which on-dark component variants apply (CTAButton ghost-on-dark, Eyebrow on-dark, etc.)
- FrequencyWave: which section(s) it appears in, its sizing class (full-bleed, fixed height, absolute positioned?)
- FAQ section presence: does frame `12:2` include a FAQ section below the nine listed?

### MCP tools to use
- `get_design_context` on node `12:2` for full structure
- `get_screenshot` on `12:2` and `117:103` for reference images
- `get_metadata` for specific node IDs when geometry values are needed
- Do NOT use `export_nodes` (broken per MEMORY: pencil-export-nodes-broken)

### Output artifact
Create `37-EXTRACTION.md` (analogous to `36-EXTRACTION.md`) to record all extracted values with Figma node references. This artifact becomes the source of truth for implementation.

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| `index.astro` imports `Hero`, `Services`, `Process`, `About`, `ContactSection` | Replaced with nine `wl/` component sections per Figma `12:2` | All five old components become dead code (Phase 41 cleanup) |
| `const BOOKING_URL = '/#book'` inline in SiteHeader + SiteFooter | Single `src/lib/constants.ts` with real Calendly URL | One place to update; eliminates TODO duplication |
| No active nav state | `aria-current="location"` via IntersectionObserver | First client JS of v3.0; progressive enhancement |
| BaseLayout `<body>` uses old `bg-bg-light dark:bg-bg-dark` classes | Still present — these are old token classes | This phase DOES NOT fix the body classes (Phase 41 cleanup); the page sections define their own backgrounds |

**Deprecated/outdated in this phase's scope:**
- `const BOOKING_URL = '/#book'` in `SiteHeader.astro` (line 4) and `SiteFooter.astro` (line 5) — replaced by module import
- `src/pages/index.astro` neobrutalist body (lines 2-16) — replaced wholesale

---

## Validation Architecture

Phase 37 uses Nyquist validation. The following gates are required before the phase is marked complete:

### Gate 1: Contrast Gate (automated)
```bash
node scripts/check-contrast.mjs
```
- Extend `PAIRS` matrix for any new text-on-background combinations the landing sections introduce (e.g., ink text on sea-glass section, sub text on paper, on-dark text on ink section if landing has one)
- Must exit 0

### Gate 2: Accessibility Gate (automated, durable spec)
```bash
npm run test:a11y
```
- `tests/accessibility/landing.spec.ts` — light mode axe, dark mode axe (colorScheme:'dark' + `.dark` class assertion), WCAG 2.2 AA tag set
- This spec is NOT temporary — it persists as durable coverage (unlike Phases 35–36 isolation specs)
- Baseline: Phase 36 left 7 passing tests; Phase 37 adds 2 more (light + dark landing) for 9 total
- The existing `axe-tests.spec.ts` homepage test also covers `/` but tests light mode only via `page.goto` (not `browser.newContext`); both specs can coexist

### Gate 3: Build Cleanliness Gate (automated)
```bash
npm run build
grep -rE "bg-yellow|text-turquoise|shadow-neo|border-neo|--color-yellow|/#book" src/pages/index.astro src/components/layout/SiteHeader.astro src/components/layout/SiteFooter.astro
```
- Old neobrutalist token grep returns zero in modified files
- Old `/#book` placeholder returns zero (replaced by constants import)
- Build exits 0

### Gate 4: Anchor Nav Functional Gate (manual verification)
- Navigate to `/#services` directly — confirm page scrolls to the Three-ways section with correct header offset
- Navigate to `/#about` directly — confirm page scrolls to the About section
- Scroll through the page — confirm Services nav link gets `aria-current="location"` while in the services section
- Scroll through the page — confirm About nav link gets `aria-current="location"` while in the about section
- Confirm no active state when in Hero, How-it-works, Proof, or Final CTA sections (D-03)
- Verify cross-page anchor: navigate to `/showcase`, click Services nav link → should land at `/#services` with correct offset

### Gate 5: Copy Gap Audit (manual, blocking)
- Review `37-COPY-GAPS.md` — Joel resolves all items before fidelity gate proceeds
- Any remaining `[COPY GAP]` markers in the rendered page must have Joel sign-off to ship as-is or be replaced with resolved copy

### Gate 6: Fidelity Gate (manual, Joel approval required — blocking)
**Screenshots required: 8 total (4 breakpoints × 2 themes)**

Breakpoints: 390, 768, 1440, 1920 (viewport width, `fullPage: true`)

Capture method:
```javascript
// Playwright throwaway script (not committed)
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('/');
await settleAnimations(page);
await page.screenshot({ path: '.planning/phases/37-landing-page/fidelity/37-light-1440.png', fullPage: true });
// Repeat for each breakpoint; use browser.newContext({ colorScheme: 'dark' }) for dark
```

Figma reference via figma-desktop MCP `get_screenshot` on `12:2` (light) and `117:103` (dark).

**Approved deviations to log before Joel reviews:**
1. Scroll-spy active state on nav links — Figma's static frames show no active state; the derived `text-wl-accent` style is a phase decision (CONTEXT D-02), not a Figma spec
2. Any `[COPY GAP]` markers still present at gate time
3. Any FrequencyWave sizing or positioning delta between Figma and rendered if noted

**Joel's approval signal:** "approved" or specific gap descriptions to resolve in a follow-up. Gate is blocking — phase cannot be marked complete without approval.

---

## Open Questions

1. **Does Figma frame `12:2` include a FAQ section?**
   - What we know: `36-CONTEXT.md` (code context) says "Phase 37 consumes FAQItem... with copy from `12:2`", and `37-CONTEXT.md` mentions "FAQItem component was built in Phase 36 and 36-CONTEXT says Phase 37 consumes it with copy from `12:2`"
   - What's unclear: The nine sections listed in the roadmap (Hero, Who, Three-ways, How-it-works, Automations, Proof, About, Agencies, Final CTA) don't include FAQ, but FAQItem exists specifically to be consumed here
   - Recommendation: Extraction Wave 1 resolves this definitively. If frame `12:2` contains a FAQ section, build it; if not, FAQItem is deferred to a later page. Never build a section that isn't in the Figma frame.

2. **Does `CTAButton.astro` pass through `target` and `rel` attributes?**
   - What we know: The component renders `<a href={href} class:list={[...]}>` with explicit classes; it does not appear to spread `...Astro.props` to the anchor element
   - What's unclear: Whether the executor needs to add `target`/`rel` support to the component (minor modification) or use a `<a>` directly for external links
   - Recommendation: Check the component file before planning; if it does not pass through HTML attrs, add `target` and `rel` as explicit optional props to CTAButton. This is a small, safe modification since the component is a wl component owned by this codebase.

3. **Are any landing sections "always-dark" (ink-background) surfaces?**
   - What we know: The footer uses an always-dark surface (`--wl-footer-bg: #0D2A31`) with non-flippable local tokens; CTAButton has a `ghost-on-dark` variant for always-dark contexts
   - What's unclear: Whether any landing sections (e.g., the Final CTA section) use an ink/dark background that requires the non-flippable on-dark treatment (Phase 35 D-09/D-10)
   - Recommendation: Extraction Wave 1 clarifies this. If any section has an always-dark background, it must use non-flippable literal values like the footer, not the semantic `--wl-*` tokens.

4. **Does the Showcase link in the nav need `aria-current="page"` on the Showcase page?**
   - What we know: CONTEXT D-04 says the Showcase link gets build-time `aria-current="page"` on `/showcase` with the same accent styling — no JS
   - What's unclear: Whether this is implemented in `SiteHeader.astro` Phase 37 or deferred to Phase 38 when the Showcase page itself is built
   - Recommendation: Wire it in Phase 37 since the scroll-spy changes SiteHeader anyway. Add `const currentPath = Astro.url.pathname;` frontmatter and conditionally add `aria-current="page"` to the Showcase link. This requires the same `[aria-current]` CSS rule, so the infrastructure is shared.

---

## Sources

### Primary (HIGH confidence)
- Codebase audit — `src/pages/index.astro`, `src/components/layout/SiteHeader.astro`, `src/components/layout/SiteFooter.astro`, `src/components/wl/*`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `astro.config.mjs`, `src/content.config.ts`, `scripts/check-contrast.mjs`, `tests/accessibility/` — all read directly
- `.planning/phases/37-landing-page/37-CONTEXT.md` — locked decisions (D-01 through D-10)
- `.planning/phases/36-content-components-expandable-cards/36-06-SUMMARY.md` — confirmed fidelity gate mechanics (Playwright + figma-desktop MCP `get_screenshot`; `export_nodes` broken)
- `.planning/phases/34-baselayout-chrome/34-CONTEXT.md` — scroll-margin-top precedent, DEV-gate pattern
- `.planning/REQUIREMENTS.md` — PAGE-01, CONT-02, IA-03, IA-04

### Secondary (MEDIUM confidence)
- `.planning/ROADMAP.md` Phase 37 success criteria — cross-referenced with CONTEXT amendments
- `.planning/phases/36-content-components-expandable-cards/36-PATTERNS.md` — isolation page and spec file patterns
- `.planning/phases/35-ui-primitives/35-CONTEXT.md` — component API contracts (D-05 through D-11)

### Not yet available (requires execution-time research)
- Figma frame `12:2` content — section-by-section copy, background colors, layout geometry, FAQ presence — MUST be extracted in Wave 1 of execution via figma-desktop MCP `get_design_context` + `get_screenshot`
- Figma frame `117:103` — dark treatment colors for always-dark sections (if any)

---

## Metadata

**Confidence breakdown:**
- Standard Stack: HIGH — all components confirmed in codebase
- Architecture / constants + scroll-spy: HIGH — standard Astro 5 + 15-line vanilla pattern
- Figma content (sections, copy, layout): LOW until extraction — this is the primary unknown
- Pitfalls: HIGH — derived from code audit + prior phase lessons
- Fidelity gate mechanics: HIGH — confirmed from Phase 36 execution record

**Research date:** 2026-07-16
**Valid until:** 2026-08-16 (stable infrastructure; Figma content remains unknown until extraction)

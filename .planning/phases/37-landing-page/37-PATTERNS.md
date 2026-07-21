# Phase 37: Landing Page - Pattern Map

**Mapped:** 2026-07-16
**Files analyzed:** 7 (2 new files, 4 modified files, 1 extended script)
**Analogs found:** 7 / 7

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `src/lib/constants.ts` | utility | transform | `src/content.config.ts` (typed TS export module) | role-match |
| `src/pages/index.astro` | page | request-response | `src/pages/thank-you.astro` + `src/layouts/BaseLayout.astro` | role-match |
| `src/components/layout/SiteHeader.astro` | layout | request-response | `src/components/layout/SiteHeader.astro` (self — modify) | exact (self) |
| `src/components/layout/SiteFooter.astro` | layout | request-response | `src/components/layout/SiteFooter.astro` (self — modify) | exact (self) |
| `src/components/wl/CTAButton.astro` | component | request-response | `src/components/wl/CTAButton.astro` (self — modify) | exact (self) |
| `tests/accessibility/landing.spec.ts` | test | request-response | `tests/accessibility/dark-mode.spec.ts` | exact |
| `scripts/check-contrast.mjs` | utility | transform | `scripts/check-contrast.mjs` Phase 36 additions block | exact |

---

## Pattern Assignments

### `src/lib/constants.ts` (utility, transform)

**Analog:** `src/content.config.ts` — the only other typed TypeScript module in `src/` that exports named values consumed by Astro components via frontmatter import.

**No existing `src/lib/` directory** — create the directory alongside the file. This is the first file in the `lib/` namespace; all prior constants were inlined per-file.

**Module export pattern** (from `src/content.config.ts` lines 1–38):
```typescript
// Named exports only — no default export (Astro convention in this codebase)
export const BOOKING_URL = "https://calendly.com/discovery-joelshinness/discovery-call";
export const CONTACT_EMAIL = "contact@joelshinness.com";
```

**Consuming pattern in Astro component frontmatter** (from `src/components/layout/SiteHeader.astro` lines 1–5 — existing inline `const` that MUST be replaced):
```typescript
// Before (both SiteHeader and SiteFooter carry this — REMOVE both):
const BOOKING_URL = '/#book'; // TODO: replace with real Calendly URL when Phase 37 wires IA-03

// After (SiteHeader depth: one level from components/layout/ to lib/):
import { BOOKING_URL, CONTACT_EMAIL } from '../../lib/constants';

// After (index.astro depth: one level from pages/ to lib/):
import { BOOKING_URL, CONTACT_EMAIL } from '../lib/constants';
```

**Pitfall:** `SiteHeader.astro` line 4 and `SiteFooter.astro` line 5 both declare `const BOOKING_URL`. The import and the inline `const` cannot coexist — Astro's TS checker reports "Cannot redeclare block-scoped variable". Remove the inline `const` in the same task that adds the import. (RESEARCH.md Pitfall 2.)

---

### `src/pages/index.astro` (page, request-response)

**Analog:** The current `src/pages/index.astro` (lines 1–16) for the shell pattern; `src/layouts/BaseLayout.astro` confirms `<slot />` consumption. The file is a complete rewrite — the import list is the only structural anchor.

**Current file to rewrite** (`src/pages/index.astro` lines 1–16 — FULL file, already read):
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
import Process from '../components/Process.astro';
import About from '../components/About.astro';
import ContactSection from '../components/homepage/ContactSection.astro';
---

<BaseLayout title="Joel Shinness | Custom Software for Small Business">
  <Hero />
  <Services />
  <Process />
  <About />
  <ContactSection />
</BaseLayout>
```

**Replacement import pattern** (old five imports die; new wl imports take their place):
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { BOOKING_URL, CONTACT_EMAIL } from '../lib/constants';
import CTAButton from '../components/wl/CTAButton.astro';
import Eyebrow from '../components/wl/Eyebrow.astro';
import ServiceCard from '../components/wl/ServiceCard.astro';
import Step from '../components/wl/Step.astro';
import FrequencyWave from '../components/wl/FrequencyWave.astro';
// Add FAQItem if Figma frame 12:2 extraction confirms FAQ section exists:
// import FAQItem from '../components/wl/FAQItem.astro';
// Add other wl/ components as Figma extraction demands (Callout, LinkCard, Tag...)
---
```

**Page shell pattern** (BaseLayout wrapping — same as current file):
```astro
<BaseLayout title="Joel Shinness Solutions | On Your Wavelength">
  <!-- Nine sections assembled here — no intermediate section components
       unless a section exceeds ~150 lines (executor discretion, CONTEXT "Claude's Discretion") -->
</BaseLayout>
```

**Section element pattern with anchor id** (for `#services` and `#about` — the two nav targets):
```astro
<!-- scroll-margin-top: 64px applies automatically via global.css line 257 for all section[id] -->
<section id="services">
  <!-- Three-ways section content -->
</section>

<section id="about">
  <!-- About section content -->
</section>
```

**Sections WITHOUT anchor id** (Hero, Who, How-it-works, Automations, Proof, Agencies, Final CTA):
```astro
<!-- Plain section — no id, no scroll-margin overhead -->
<section>
  <!-- section content -->
</section>
```

**Heading hierarchy contract** (axe enforcement — one `h1` total):
```astro
<!-- Hero: one h1 on the page -->
<h1 class="wl-display-hero" style="color: var(--color-wl-ink);">
  [COPY GAP: Hero headline — frame 12:2]
</h1>

<!-- All section headings: h2 -->
<h2 class="wl-heading-h2" style="color: var(--color-wl-ink);">
  [Section heading from 12:2]
</h2>

<!-- ServiceCard/Step titles: headingLevel={3} (the default — do not override) -->
<ServiceCard headingLevel={3} title="..." />
```

**CTA button pattern — Calendly** (CONTEXT D-05, D-06; requires CTAButton `target`/`rel` props added first):
```astro
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

**CTA button pattern — email**:
```astro
<CTAButton href={`mailto:${CONTACT_EMAIL}`} variant="ghost" icon="mail">
  Send an email
</CTAButton>
```

**Copy gap marker pattern** (CONTEXT D-09 — must be visually unmissable in screenshots):
```astro
{/* COPY GAP: [description of missing copy] */}
<p class="wl-text-lead" style="background: yellow; outline: 3px solid red; padding: 4px; color: #000;">
  [COPY GAP: Hero subtitle — frame 12:2, hero section, second text block]
</p>
```

**Section background pattern** (semantic flip — paper vs. sea-glass alternating; actual per-section assignments require Wave 1 Figma extraction):
```astro
<!-- Paper surface (dominant): bg-wl-paper or no explicit bg (page default) -->
<section style="background: var(--color-wl-paper);">...</section>

<!-- Sea-glass surface (secondary): -->
<section style="background: var(--color-wl-sea-glass);">...</section>

<!-- Always-dark surface (FIDELITY-GAP — only if Figma 12:2 shows ink bg section):
     Use non-flippable literal values like SiteFooter, NOT semantic wl tokens -->
<section style="background-color: var(--wl-footer-bg);">...</section>
```

---

### `src/components/layout/SiteHeader.astro` (layout, request-response)

**Analog:** Self-modification. Full file already read (lines 1–65). Two distinct changes:
1. Replace inline `BOOKING_URL` const with module import + add `CONTACT_EMAIL`
2. Add scroll-spy `<script is:inline>` and `[aria-current]` CSS rule
3. Add build-time `aria-current="page"` on Showcase link

**Current frontmatter to replace** (lines 1–6 — remove inline `const`, add imports):
```astro
---
import WaveMark from '../WaveMark.astro';
import CTAButton from '../wl/CTAButton.astro';
const BOOKING_URL = '/#book'; // TODO: replace with real Calendly URL when Phase 37 wires IA-03
const isDev = import.meta.env.DEV;
---
```

**New frontmatter**:
```astro
---
import WaveMark from '../WaveMark.astro';
import CTAButton from '../wl/CTAButton.astro';
import { BOOKING_URL } from '../../lib/constants';
const isDev = import.meta.env.DEV;
const currentPath = Astro.url.pathname;  // for build-time aria-current="page" on Showcase link
---
```

**Build-time aria-current on Showcase link** (replaces existing Showcase `<a>` at line 36):
```astro
<!-- Before (line 36-40 of SiteHeader.astro): -->
<a
  href="/showcase"
  class="wl-nav-link text-wl-ink hover:text-wl-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent"
>Showcase</a>

<!-- After: -->
<a
  href="/showcase"
  aria-current={currentPath === '/showcase' ? 'page' : undefined}
  class="wl-nav-link text-wl-ink hover:text-wl-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent"
>Showcase</a>
```

**Scoped style block** (add to SiteHeader — aria-current CSS hooks for both scroll-spy and build-time page):
```astro
<style>
  /* Scroll-spy active state (CONTEXT D-02 — derived; APPROVED-DEVIATION at fidelity gate) */
  nav a[aria-current="location"] {
    color: var(--color-wl-accent);
  }
  /* Build-time current page link (CONTEXT D-04) */
  nav a[aria-current="page"] {
    color: var(--color-wl-accent);
  }
</style>
```

**Scroll-spy script** (add as `<script is:inline>` at bottom of `<header>`, before `</header>` close tag; CONTEXT D-01 through D-04, RESEARCH Pattern 2):
```astro
<script is:inline>
  (function () {
    var ANCHORS = ['services', 'about'];
    var navLinks = {};
    ANCHORS.forEach(function (id) {
      var link = document.querySelector('a[href="/#' + id + '"], a[href="#' + id + '"]');
      if (link) navLinks[id] = link;
    });

    if (!window.IntersectionObserver || Object.keys(navLinks).length === 0) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var id = entry.target.id;
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
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  })();
</script>
```

**rootMargin rationale:** `-64px 0px 0px 0px` compensates for the sticky 64px header so a section is not counted "intersecting" while still obscured behind it. The existing `scroll-margin-top: 64px` on `section[id]` (global.css line 257) handles scroll-to-position; rootMargin handles observe-as-active independently. (RESEARCH Pitfall 1.)

**Script placement note:** `<script is:inline>` is placed INSIDE `<header>` at the bottom (before `</header>`), not in `<head>`. Astro's `is:inline` bypasses bundling — the script runs exactly once at parse time and does not need `defer`. The IIFE wrapper prevents global namespace pollution.

---

### `src/components/layout/SiteFooter.astro` (layout, request-response)

**Analog:** Self-modification. Full file already read (lines 1–104). Only one change: replace inline `BOOKING_URL` const with module import.

**Current frontmatter to replace** (lines 1–5):
```astro
---
import WaveMark from '../WaveMark.astro';
const currentYear = new Date().getFullYear();
const isDev = import.meta.env.DEV;
const BOOKING_URL = '/#book'; // TODO: replace with real Calendly URL when Phase 37 wires IA-03
---
```

**New frontmatter** (remove the inline const, add import):
```astro
---
import WaveMark from '../WaveMark.astro';
import { BOOKING_URL } from '../../lib/constants';
const currentYear = new Date().getFullYear();
const isDev = import.meta.env.DEV;
---
```

**The `{BOOKING_URL}` reference at line 56** stays unchanged — it already binds to the constant. No other markup changes needed in SiteFooter.

**External link pattern already in SiteFooter** (line 93–99 — GitHub link shows `target="_blank" rel="noopener noreferrer"` precedent):
```astro
<a
  href="https://github.com/JoelCodes"
  target="_blank"
  rel="noopener noreferrer"
  class="wl-footer-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wl-footer-wordmark-color)]"
  style="color: var(--wl-footer-text-link);"
>GitHub</a>
```

Note: The footer's "Book a call" link at line 56 uses `{BOOKING_URL}` but does NOT yet have `target="_blank"`. Calendly should open in a new tab (CONTEXT D-06) — add `target="_blank" rel="noopener"` to that link in this same task.

---

### `src/components/wl/CTAButton.astro` (component, request-response)

**Analog:** Self-modification. Full file already read (lines 1–246). Minimal targeted change: add `target` and `rel` as explicit optional props and thread them through to all three `<a>` element renders.

**Confirmed gap** (CTAButton.astro lines 37–44): The Props interface does NOT include `target` or `rel`. The component does not spread `...Astro.props` to the anchor element. External Calendly links require `target="_blank" rel="noopener"` (CONTEXT D-06). This is the only modification needed.

**Current Props interface** (lines 37–42):
```typescript
interface Props {
  href: string;
  variant?: 'solid' | 'ghost' | 'ghost-on-dark' | 'small';
  icon?: 'calendar' | 'mail';
  class?: string;
}
```

**New Props interface** (add `target` and `rel`):
```typescript
interface Props {
  href: string;
  variant?: 'solid' | 'ghost' | 'ghost-on-dark' | 'small';
  icon?: 'calendar' | 'mail';
  target?: string;
  rel?: string;
  class?: string;
}
```

**Destructuring update** (line 44 — add `target` and `rel`):
```typescript
const { href, variant = 'solid', icon, target, rel, class: className = '' } = Astro.props;
```

**Thread through to each `<a>` element** — there are three: ghost-on-dark (line 58), small (line 128), and solid/ghost (line 182). All three need `target={target}` and `rel={rel}` added to the element attributes. Example for solid/ghost variant (line 182):
```astro
<!-- Before (line 182): -->
<a
  href={href}
  class:list={[...]}
  style={...}
>

<!-- After: -->
<a
  href={href}
  target={target}
  rel={rel}
  class:list={[...]}
  style={...}
>
```

Astro renders `target` and `rel` as undefined (no attribute emitted) when not passed by the consumer — safe for internal links.

---

### `tests/accessibility/landing.spec.ts` (test, request-response)

**Analog:** `tests/accessibility/dark-mode.spec.ts` — exact structural match for the `browser.newContext` dark-mode axe pattern. This is a DURABLE spec (not deleted after the gate), unlike Phase 35/36 isolation specs.

**Key distinction from prior phase pattern:** Phase 35/36 used temporary isolation page specs (created and deleted in same phase). `landing.spec.ts` is permanent — it covers the production landing page and survives all future phases.

**Complete file pattern** (copy structure from `tests/accessibility/dark-mode.spec.ts` lines 1–55, adapt for landing route):

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { settleAnimations } from './helpers';

/**
 * Landing page accessibility spec — Phase 37 (DURABLE — do not delete after gate).
 * Covers the production landing page at '/' in both light and dark mode.
 * Complements axe-tests.spec.ts which also covers '/' but only in light mode.
 */

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
    // Verify FOUC script applied .dark class from OS colorScheme preference
    await expect(page.locator('html')).toHaveClass(/dark/);
    await settleAnimations(page);
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
    await context.close();
  });

});
```

**`settleAnimations` helper** (from `tests/accessibility/helpers.ts` lines 1–17 — already wired; import as shown above):
```typescript
// Imported from './helpers' — waits for all finite animations to complete before axe runs
// Prevents false color-contrast violations from mid-transition element states
export async function settleAnimations(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await new Promise(requestAnimationFrame);
    const finite = document
      .getAnimations()
      .filter((a) => a.effect?.getTiming().iterations !== Infinity);
    await Promise.allSettled(finite.map((a) => a.finished));
  });
}
```

**Coexistence note:** The existing `tests/accessibility/axe-tests.spec.ts` line 13–24 already tests `'Homepage should not have accessibility violations'` in light mode via `page.goto('/')`. Both specs can coexist — they test different things (one is light-only via `page` fixture; `landing.spec.ts` explicitly tests both themes via `browser.newContext`). No deduplication needed.

---

### `scripts/check-contrast.mjs` (utility, transform)

**Analog:** Existing Phase 35 and Phase 36 additions blocks in `scripts/check-contrast.mjs` (lines 220–348) — exact pattern to extend.

**Palette constants already defined** (from lines 81–151 of the file — all reusable):
- `L_INK = '#12333B'`, `D_INK = '#EAF6F3'`
- `L_SUB = '#35525A'`, `D_SUB = '#A9C9C7'`
- `L_ACCENT = '#0E7078'`, `D_ACCENT = '#4FB3B8'`
- `L_SEA_GLASS = '#E6F1F1'`, `D_SEA_GLASS = '#123640'`
- `L_PAPER = '#F6FBFA'`, `D_PAPER = '#0C2228'`
- `CARD_WHITE = '#FFFFFF'`, `CARD_DARK = '#12333B'`

**Many landing pairs are already in the matrix** (verified in lines 171–348): ink/sub/accent on paper (light + dark), ink/sub/accent on sea-glass (light + dark), white card text pairs. The Phase 37 extension only needs to add NEW pairs that the landing sections introduce beyond what already exists.

**Addition format** (copy from Phase 36 block, lines 284–348):
```js
// ── PHASE 37 ADDITIONS ────────────────────────────────────────────────────
// Source: .planning/phases/37-landing-page/37-UI-SPEC.md contrast table
//         Wave 1 Figma extraction resolves FIDELITY-GAP pairs
//
// Most landing section text pairs are already covered (paper/sea-glass surfaces).
// Add below ONLY for new surfaces confirmed by Wave 1 extraction:

// [FIDELITY-GAP — conditional on Figma 12:2 showing always-dark section]
// If landing has an ink-background section (non-flippable literals):
// const LANDING_DARK_BG = '#0D2A31';  // or the actual extracted hex
// [ONDARK_LABEL, LANDING_DARK_BG, 'non-flippable: on-dark text on landing ink section', 4.5, true],

// Accent on sea-glass (scroll-spy nav active state — header bg is sea-glass):
// Already present at lines 198-199 as 'light: accent on sea-glass (link)' / dark equivalent.
// No new entry needed unless nav header bg differs from --wl-sea-glass.
```

**How to add new text-use pair** (array format, matching lines 171–348):
```js
// [foreground_hex, background_hex, 'label string', threshold_number, textUse_boolean]
[L_INK, L_PAPER, 'light: ink on paper (hero heading)', 4.5, true],
```

**Gate command** (unchanged — same script, extend only):
```bash
node scripts/check-contrast.mjs
# Must exit 0 before any landing section ships
```

---

## Shared Patterns

### Constants Import (all consuming files)
**Source:** `src/lib/constants.ts` (new — created this phase)
**Apply to:** `src/pages/index.astro`, `src/components/layout/SiteHeader.astro`, `src/components/layout/SiteFooter.astro`
```typescript
// From components/layout/ (one level up to src/, then into lib/):
import { BOOKING_URL, CONTACT_EMAIL } from '../../lib/constants';

// From pages/ (one level up to src/, then into lib/):
import { BOOKING_URL, CONTACT_EMAIL } from '../lib/constants';
```

### Focus Ring on Interactive Elements
**Source:** `src/components/layout/SiteHeader.astro` lines 19, 33, 37, 41; `src/components/wl/CTAButton.astro` (all variants)
**Apply to:** All `<a>` links in `index.astro`; any `<summary>` in FAQItem usage; all CTAButton uses already implement this internally
```astro
class="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wl-accent"
```
Exception: For always-dark surfaces (if any landing section is ink-bg), use non-flippable literal `focus-visible:outline-[#4FB3B8]` — same pattern as `CTAButton` ghost-on-dark (CTAButton.astro line 69).

### Semantic Dark Flip — Use Token Once
**Source:** Phase 33 convention; enforced throughout all `wl/` components
**Apply to:** All `index.astro` section styles
```astro
<!-- CORRECT: one token per property; .dark block in global.css handles the flip -->
<section style="background: var(--color-wl-paper); color: var(--color-wl-ink);">

<!-- WRONG: dark: utility pairs on wl colors -->
<section class="bg-wl-paper dark:bg-[#0C2228]">  <!-- NEVER do this -->
```

### Zero Old-Token Constraint
**Source:** `src/components/wl/ServiceCard.astro` line 65; enforced at Gate 3
**Apply to:** All code written in this phase
```bash
# Gate 3 grep — must return zero in touched files:
grep -rE "bg-yellow|text-turquoise|shadow-neo|border-neo|--color-yellow|/#book|BOOKING_URL = '/#book'" \
  src/pages/index.astro \
  src/components/layout/SiteHeader.astro \
  src/components/layout/SiteFooter.astro
```

### `aria-hidden` on Decorative SVG
**Source:** `src/components/WaveMark.astro` line 37 (`aria-hidden="true"`); `src/components/wl/CTAButton.astro` lines 93, 107
**Apply to:** `FrequencyWave` usage in `index.astro` (component already implements this internally); any inline SVG added directly in `index.astro`
```astro
<svg aria-hidden="true" ...>
  <!-- No <title> element on decorative SVGs -->
</svg>
```

### External Link Safety
**Source:** `src/components/layout/SiteFooter.astro` lines 93–99 (GitHub link)
**Apply to:** All Calendly CTAs; the footer's "Book a call" link (add `target`/`rel` in this phase)
```astro
target="_blank"
rel="noopener"
<!-- Note: "noreferrer" also suppresses referrer — use "noopener" only for Calendly (consistent with CONTEXT D-06) -->
```

---

## No Analog Found

No files in this phase lack a codebase analog. All patterns are derived from existing Phase 33–36 shipped artifacts.

| File | Note |
|------|------|
| `src/lib/constants.ts` | No existing `src/lib/` directory — this is the first file. Pattern modeled on `src/content.config.ts` (typed named exports consumed via frontmatter import). |

---

## Critical Implementation Notes for Planner

1. **Wave sequencing is load-bearing.** `src/lib/constants.ts` must be created BEFORE any file that imports it (`SiteHeader`, `SiteFooter`, `index.astro`) or the build fails. This is the only hard task dependency.

2. **CTAButton `target`/`rel` mod must precede `index.astro` assembly.** If `index.astro` references `target="_blank"` on `CTAButton` before the prop exists, `astro check` will pass (HTML attrs are not type-checked on Astro components by default) but the attribute will be silently dropped. Modify CTAButton first.

3. **Figma Wave 1 extraction is prerequisite for all section content.** The planner should make Wave 1 (Figma extraction) the first action group. Section background colors, padding, copy, and layout are ALL FIDELITY-GAPs. No `index.astro` section can be written without extraction output.

4. **`[COPY GAP]` log file.** Create `.planning/phases/37-landing-page/37-COPY-GAPS.md` on first gap encountered. Format established in UI-SPEC lines 419–430.

5. **Scroll-spy scoping.** The `<script is:inline>` queries by `href="/#services"` and `href="#services"` (both forms) and by `getElementById`. It is self-contained — harmless on any page where the anchor sections don't exist (RESEARCH Pitfall 3). No cross-page impact.

6. **`axe-tests.spec.ts` coexistence.** `tests/accessibility/axe-tests.spec.ts` line 13 already tests the homepage (`/`) in light mode. `landing.spec.ts` adds explicit light AND dark coverage via `browser.newContext`. Both specs coexist without conflict — they use different Playwright fixtures (`page` vs. `browser`).

---

## Metadata

**Analog search scope:** `src/pages/`, `src/components/layout/`, `src/components/wl/`, `src/layouts/`, `src/content.config.ts`, `scripts/`, `tests/accessibility/`, `.planning/phases/36-content-components-expandable-cards/36-PATTERNS.md`
**Files read:** 13 live files + Phase 36 PATTERNS.md (for prior phase pattern precedents)
**Pattern extraction date:** 2026-07-16

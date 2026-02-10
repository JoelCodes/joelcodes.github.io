# Project Research Summary

**Project:** Homepage Refinement (v1.2)
**Domain:** Professional portfolio website with neobrutalist design
**Researched:** 2026-02-09
**Confidence:** HIGH

## Executive Summary

This is an incremental enhancement to an existing neobrutalist portfolio site built with Astro 5 and Tailwind CSS 4. The site already has established design system foundations (OKLCH colors, shadow-to-glow dark mode, WCAG 2.2 AA compliance, 3/10 neobrutalist density). This milestone adds outcome-focused messaging, isometric illustrations, and improved FAQ discoverability to the homepage without architectural changes.

The recommended approach is conservative: leverage existing components (Card, Button, FAQ), maintain strict design system constraints, and avoid introducing new dependencies. All enhancements are static content/markup changes. The critical technical decision is migrating from lucide-static to @lucide/astro for tree-shaking benefits (200KB+ savings), and establishing an isometric illustration style guide before implementation to prevent inconsistency. Performance must be protected through SVG optimization (20KB file size limit per illustration).

Key risks center on design system compliance rather than technical complexity. Over-stylization (exceeding 3/10 density), WCAG contrast failures from bold color combinations, and dark mode shadow transformation breakage are the primary pitfalls. The existing site has strong foundations—this milestone succeeds by adhering to them rather than introducing new patterns.

## Key Findings

### Recommended Stack

No new architectural dependencies are needed. All enhancements use existing Astro 5 + Tailwind CSS 4 foundations with pure CSS techniques. The one critical stack change is migrating icon libraries for performance.

**Core technologies (existing, reused):**
- **Astro 5** — Static site generation with file-based routing, already in use
- **Tailwind CSS 4** — CSS-first theming via @theme directive, isometric utilities added to global.css
- **@lucide/astro** — Tree-shakeable icon library (MIGRATION REQUIRED from lucide-static) — saves 200KB+ bundle size

**New typography (optional):**
- **@fontsource-variable/bricolage-grotesque** — Display font for neobrutalist headings, variable font for flexibility

**What NOT to add:**
- **astro-seo-schema** — Manual JSON-LD is simpler for FAQ page schema markup
- **Pre-built isometric SVG libraries** — Won't match custom neobrutalist palette/style
- **Animation libraries** — Pure CSS transforms sufficient for static site

### Expected Features

**Must have (table stakes):**
- Outcome-focused hero headline — Small business clients need "what's in it for me" within 3 seconds
- Visual outcome badges/metrics — ROI thinking (time saved, money saved, results delivered)
- Process section clarity — Risk-averse clients need workflow transparency before committing
- FAQ discoverability — Dedicated /faq page instead of buried footer accordion
- Service differentiation — Non-technical clients need to distinguish AI vs Automation vs Web Apps

**Should have (competitive differentiation):**
- Isometric mini-illustrations per process step — Makes abstract workflow concrete and memorable
- Outcome badges with visual hierarchy — Transforms generic "I build stuff" into measurable business value
- Technology-specific illustrations — Helps clients distinguish service types visually
- Neobrutalist FAQ page design — Transforms boring support page into on-brand experience

**Defer (v2+):**
- Pricing calculator — Custom work varies too much, creates false expectations
- Animated isometric scenes — File size bloat, accessibility issues, static aesthetic is on-brand
- Real-time chat widget — Overkill for freelance, contact form + FAQ covers communication
- Auto-playing video background — Performance killer, accessibility nightmare

**Anti-features (avoid):**
- Multiple CTAs in hero — Reduces conversions by 266% when competing actions present
- Decorative display fonts in body text — Severe legibility issues, unprofessional
- Complex interactive elements — Breaks mobile, adds JS complexity to static site

### Architecture Approach

This is an incremental enhancement to existing homepage sections, not a full site rebuild. All changes are component modifications or new page creation within established patterns.

**Integration points:**
1. **Hero.astro (MODIFY)** — Add outcome-focused messaging, visual badges below headline, maintain Button.astro dependency
2. **Process.astro (MODIFY)** — Add detailed descriptions, integrate isometric illustrations with existing vertical timeline
3. **TechSection.astro (MODIFY)** — Reorganize from 4 categories to 3 (AI, Automations, Web Apps), add illustrations, adjust grid
4. **FAQ page (NEW)** — Create /src/pages/faq.astro, import existing FAQ.astro component, add to navigation
5. **Footer.astro (MODIFY)** — Remove or abbreviate FAQ section, add link to /faq page

**Major components reused:**
- **Card.astro** — Technology cards, FAQ page layout
- **Button.astro** — Hero CTA, FAQ page CTAs
- **FAQ.astro** — Dedicated page imports existing accordion component

**Data flow:** No changes. All content remains static (hardcoded in components). Illustration assets served from /public/images/ directory.

### Critical Pitfalls

1. **WCAG Contrast Failures with Bold Colors** — Vibrant neobrutalist yellow/cyan/magenta can fail WCAG 2.0 AA despite looking striking. Test EVERY color combination with WebAIM Contrast Checker before implementation. Restrict yellow accent to dark backgrounds or very dark text.

2. **Dark Mode Shadow-to-Glow Transformation Breaking** — New components bypass design system by hardcoding box-shadow values. Always use .shadow-neo-yellow, .shadow-neo-turquoise, .shadow-neo-magenta utilities. Create dedicated .shadow-iso-* utilities for isometric illustrations before implementation.

3. **Isometric Illustration Style Inconsistency** — Illustrations from different sources use different lighting angles, color palettes, detail levels. Establish style guidelines BEFORE creating any illustrations: light source direction (top-left 45°), color palette (existing yellow/turquoise/magenta), detail level (bold shapes, flat colors).

4. **SVG Performance Degradation** — Unoptimized isometric SVGs with thousands of path points cause render jank, especially on mobile. Enable Astro SVG optimization, set 20KB per file limit, reduce path precision from 6 decimals to 2, lazy load below-fold illustrations.

5. **Outcome Badges Overwhelming Hero** — Adding 6+ badges creates visual clutter, fails "5-second test." Maximum 3 badges in hero, positioned as secondary elements (never competing with headline or CTA). Test with target audience (small business owners), not just design peers.

## Implications for Roadmap

Based on research, this milestone should be broken into 5 phases with strict ordering to prevent pitfalls.

### Phase 1: Icon Library Migration + Design System Extensions
**Rationale:** Must establish performance foundation and design system utilities before adding content. Icon migration saves 200KB+ bundle, isometric utilities ensure dark mode transformation works from start.

**Delivers:**
- Migration from lucide-static to @lucide/astro (tree-shaking)
- Isometric CSS utilities in global.css (transform-style: preserve-3d patterns)
- Shadow utilities for isometric elements (.shadow-iso-yellow, .shadow-iso-turquoise)
- Optional: Install @fontsource-variable/bricolage-grotesque for display headings

**Addresses:** Pitfall #2 (dark mode transformation), Pitfall #4 (SVG performance foundation)

**Success criteria:** Bundle size reduction verified, isometric utilities tested in both light/dark modes

### Phase 2: Hero Section Refinement
**Rationale:** Hero is highest-impact element (first impression). Get messaging and outcome badges right before moving to lower-priority sections. Simple markup changes, low risk.

**Delivers:**
- Outcome-focused headline copy (problem-to-outcome reframe)
- Visual outcome badges (maximum 3, using design system utilities)
- Trust indicators positioned strategically (below CTA, not competing)
- Maintained Button.astro usage for single primary CTA

**Addresses:** Pitfall #6 (badge clutter), Pitfall #1 (WCAG contrast on badges)

**Uses:** @lucide/astro for badge icons, existing shadow-neo-* utilities

**Success criteria:** "5-second test" passes, WCAG contrast verified, target audience validates clarity

### Phase 3: Process Section Enhancement
**Rationale:** Dependent on Phase 1 isometric utilities. Requires illustration asset preparation before implementation. Medium complexity due to layout adjustments for illustrations.

**Delivers:**
- Enhanced process descriptions (1-2 sentences per step)
- Isometric mini-illustrations for 5 process steps
- Layout adjustment for illustration placement (flexbox/grid for side-by-side desktop, stacked mobile)

**Addresses:** Pitfall #3 (establish isometric style guidelines FIRST), Pitfall #4 (SVG optimization), Pitfall #2 (shadow transformation on illustrations)

**Illustration requirements:**
- 5 SVG files: /public/images/process/step-{1-5}.svg
- Style guide established: light angle (top-left 45°), color palette (yellow/turquoise/magenta), flat colors, thick borders
- Each file <20KB after SVGO optimization
- Descriptive alt text for screen readers

**Success criteria:** Illustrations consistent style, recognized on mobile (375px), performance maintained (LCP increase <200ms)

### Phase 4: Technology Section Redesign
**Rationale:** Builds on isometric style guide from Phase 3. Reorganizes existing component rather than creating new patterns. Medium complexity.

**Delivers:**
- 3-category structure (AI, Automations, Web Apps)
- Isometric illustration per category (matching style from Phase 3)
- Grid layout adjustment (grid-cols-1 md:grid-cols-3)
- Philosophy text maintained or repositioned

**Uses:** Existing Card.astro component, isometric style guide from Phase 3

**Addresses:** Feature differentiation for non-technical clients

**Illustration requirements:**
- 3 SVG files: /public/images/tech/{ai|automations|web-apps}.svg
- Same style as process illustrations (consistency critical)
- Visual metaphors: AI (brain/neural network), Automation (gears/connections), Web Apps (browser/interface)

**Success criteria:** Services visually distinct, illustrations match process style, grid responsive

### Phase 5: FAQ Page Creation
**Rationale:** Independent of other phases, can be done anytime. Low complexity, standard Astro page creation pattern. Requires manual accessibility testing.

**Delivers:**
- Dedicated /src/pages/faq.astro page
- Imports existing FAQ.astro component (or inlines content)
- Manual JSON-LD structured data for FAQ schema
- Footer.astro modified (remove or abbreviate FAQ, add link to /faq)
- Navigation link added to FAQ page

**Addresses:** Pitfall #7 (keyboard accessibility), Pitfall #10 (accessibility testing beyond Lighthouse)

**Accessibility requirements:**
- Keyboard navigation (Enter/Space toggle, Tab moves between questions)
- ARIA attributes (aria-expanded, aria-controls, aria-labelledby)
- Focus indicators visible against neobrutalist borders
- Screen reader testing (VoiceOver/NVDA)

**Success criteria:** Manual keyboard test passes, screen reader announces state correctly, Lighthouse 100%

### Phase Ordering Rationale

**Why this order:**
1. **Phase 1 MUST come first** — Design system foundation prevents pitfalls in all subsequent phases. Icon migration immediately improves performance baseline.
2. **Phase 2 before 3/4** — Hero has highest user impact. Get messaging right before investing in illustration creation.
3. **Phase 3 before Phase 4** — Establish isometric style guide with 5 process illustrations before creating 3 technology illustrations. Prevents inconsistency pitfall.
4. **Phase 5 independent** — FAQ page has no dependencies on other phases, can be implemented anytime or in parallel.

**Why this grouping:**
- **Design system setup isolated** (Phase 1) — Critical foundation, must be solid before content changes
- **Content enhancements grouped by complexity** — Hero (simple), Process (medium), Technology (medium)
- **FAQ standalone** — Different component type (page vs homepage section), different testing requirements

**How this avoids pitfalls:**
- Phase 1 establishes dark mode utilities → prevents Pitfall #2 (shadow transformation)
- Phase 3 establishes isometric guidelines → prevents Pitfall #3 (style inconsistency)
- Phase 3 includes SVG optimization → prevents Pitfall #4 (performance degradation)
- Phase 2 tests badge count → prevents Pitfall #6 (hero clutter)
- Phase 5 requires manual accessibility testing → prevents Pitfall #7 (keyboard failures)

### Research Flags

**Phases with standard patterns (skip research-phase):**
- **Phase 1:** Icon library migrations well-documented, Tailwind CSS custom utilities established pattern
- **Phase 2:** Hero section enhancements standard web design pattern, extensive research already completed
- **Phase 5:** FAQ page creation standard Astro pattern, JSON-LD implementation documented

**Phases needing validation during implementation (no deep research needed, but careful testing):**
- **Phase 3:** Isometric illustration style guide requires design decisions, performance testing critical
- **Phase 4:** Extends Phase 3 patterns, validate illustration consistency

**No phases require `/gsd:research-phase`** — domain is well-understood, all patterns documented, existing site provides architectural guidance.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | No new dependencies. Icon migration well-documented. Pure CSS approach validated. |
| Features | HIGH | Outcome-focused hero, isometric illustrations, FAQ pages are established patterns with extensive 2026 research. |
| Architecture | HIGH | Incremental changes to existing components. File-based routing patterns clear. Integration points documented. |
| Pitfalls | HIGH | Neobrutalist design pitfalls extensively researched. WCAG compliance, dark mode transformation, SVG optimization all documented. |

**Overall confidence:** HIGH

### Gaps to Address

**Design decisions requiring client input:**
- **Outcome badge content** — Which 3 metrics to highlight in hero (time saved? money saved? customers satisfied?). Research shows maximum 3 badges, but content needs client validation.
- **Process step descriptions** — Expand existing "You/Joel" format with 1-2 sentences context. Requires copywriting with client input.
- **Isometric illustration complexity** — Balance between simple/recognizable and detailed/impressive. Needs design iteration with feedback.

**Validation during implementation:**
- **Yellow accent WCAG compliance** — Existing #ffef6a must be tested against all new contexts (outcome badges, illustration backgrounds). May need fallback color for contrast failures.
- **Mobile illustration recognition** — Isometric illustrations must be tested at 375px viewport. If unrecognizable, simplify or create mobile variants.
- **FAQ question prioritization** — Current 5 questions work, but if FAQ grows, needs categorization strategy.

**Performance monitoring:**
- **Bundle size after icon migration** — Verify 200KB+ reduction from lucide-static removal
- **LCP impact from illustrations** — Process and Technology sections add 8 illustrations. Must verify LCP increase <200ms total.
- **Mobile scroll performance** — Test on mid-range device (not just dev machine). Watch for render jank when illustrations enter viewport.

## Sources

### Primary (HIGH confidence)

**Stack Research:**
- [Lucide Static Documentation](https://lucide.dev/guide/packages/lucide-static) — Package limitations and use cases
- [Lucide Astro Documentation](https://lucide.dev/guide/packages/lucide-astro) — Installation, usage, tree-shaking benefits
- [Tailwind CSS v4.1 Announcement](https://tailwindcss.com/blog/tailwindcss-v4-1) — Official release notes (text shadows, CSS-first theming)
- [Astro Fonts Guide](https://docs.astro.build/en/guides/fonts/) — Official Astro documentation recommending Fontsource
- [Fontsource Bricolage Grotesque](https://www.npmjs.com/package/@fontsource-variable/bricolage-grotesque) — Official npm package

**Architecture Research:**
- Existing codebase analysis: /src/pages/index.astro, /src/components/*.astro — Component patterns, integration points
- [Astro Documentation](https://docs.astro.build) — File-based routing, component patterns

**Pitfalls Research:**
- [Neobrutalism: Definition and Best Practices - Nielsen Norman Group](https://www.nngroup.com/articles/neobrutalism/) — Authoritative UX research
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/) — Accessibility requirements
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — Color contrast validation
- [Astro Experimental SVG optimization](https://docs.astro.build/en/reference/experimental-flags/svg-optimization/) — Official documentation

### Secondary (MEDIUM confidence)

**Features Research:**
- [Hero Section Design: Best Practices & Examples for 2026](https://www.perfectafternoon.com/2025/hero-section-design/) — Industry patterns
- [Website Hero Section Best Practices + Examples](https://prismic.io/blog/website-hero-section) — Design patterns
- [Hero Section Test That Led To A 50% Increase In Conversions](https://carrot.com/blog/hero-section-conversion-test/) — A/B testing data
- [Isometric websites - 28+ Best Isometric Web Design Ideas 2026](https://99designs.com/inspiration/websites/isometric) — Design inspiration
- [20 Best FAQ Pages (+ How To Create Your Own) (2026)](https://www.shopify.com/blog/120928069-how-to-create-faq-page) — FAQ patterns

**Pitfalls Research:**
- [My Favourite Fonts for Neobrutalist Web Design](https://blog.kristi.digital/p/my-favourite-fonts-for-neobrutalist-web-design) — Typography recommendations
- [IBM Design Language – Isometric Style](https://www.ibm.com/design/language/illustration/isometric-style/design/) — Lighting consistency patterns
- [7 Ways to Optimize SVGs: Reduce File Size by 80%](https://www.frontendtools.tech/blog/optimizing-svgs-web-performance-scalability) — Performance optimization
- [Dark Mode Design Best Practices in 2026](https://www.tech-rz.com/blog/dark-mode-design-best-practices-in-2026/) — Shadow-to-glow patterns

### Tertiary (LOW confidence)

**Context only:**
- [Search Engine Land: FAQ Schema Rise and Fall](https://searchengineland.com/faq-schema-rise-fall-seo-today-463993) — Current state of FAQ rich results (2023 restrictions)
- Various WebSearch results about neobrutalism design trends — Used for understanding aesthetic, not technical decisions

---
*Research completed: 2026-02-09*
*Ready for roadmap: yes*

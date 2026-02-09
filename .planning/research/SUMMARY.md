# Project Research Summary

**Project:** Joel Shinness Portfolio — Neobrutalist Design System v1.1
**Domain:** Portfolio/Blog Site Design Refresh
**Researched:** 2026-02-09
**Confidence:** HIGH

## Executive Summary

This research covers adding a neobrutalist design system to an existing Astro 5 + Tailwind CSS 4 portfolio site. The site already has core functionality (blog with MDX, portfolio projects, contact form, dark mode), so this milestone focuses exclusively on visual refresh with narrative homepage restructure. The recommended approach is CSS-first using Tailwind 4's @theme directive for design tokens, with implementation constrained to 3/10 aesthetic density to maintain professional trust while adding distinctive personality.

The core technical approach is straightforward: install 1-2 variable fonts via Fontsource, define neobrutalist tokens (colors, shadows, borders) in global.css using @theme, build primitive components (Button, Card, Input) as Astro components, then update existing components with new styling. No JavaScript libraries needed—all neobrutalist patterns (thick borders, hard shadows, hover effects) are pure CSS via Tailwind utilities. The existing dark mode implementation stays intact but requires careful adaptation since neobrutalist shadows need inverted colors in dark mode to maintain depth.

The primary risk is over-stylization undermining professional trust. The target audience is small business owners seeking lead generation, not design portfolio viewers. Research shows 3/10 density constraint is critical: apply bold neobrutalism to headers/CTAs/cards, but preserve generous whitespace and readable body text (especially blog posts). Secondary risks include WCAG contrast failures with bold colors (yellow on white backgrounds), dark mode color inversion breaking visual hierarchy, and box-shadow animation performance on mobile. All are preventable with testing discipline established in Phase 1 (Design System Foundation).

## Key Findings

### Recommended Stack

**No major stack changes needed.** The existing Astro 5 + Tailwind CSS 4 + MDX foundation is ideal for this design refresh. Only additions are typography packages—everything else uses built-in Tailwind 4 capabilities.

**Core additions:**
- **@fontsource-variable/bricolage-grotesque** (^5.2.10) — Quirky grotesque display font perfect for neobrutalist headings, variable font with weight/width/optical axes
- **@fontsource-variable/fraunces** (optional) — Alternative display/accent font with optical size axis, good for editorial elements
- **Tailwind 4 @theme directive** — Define all design tokens (colors, shadows, borders) in global.css, generates utilities automatically
- **Pure CSS patterns** — No animation libraries, no component libraries. Tailwind 4 includes everything needed (text shadows in 4.1, box shadows, transitions)

**Why no libraries:** NeoBrutalism.css and similar libraries just wrap what Tailwind 4 already provides. Adding dependencies creates bloat with zero benefit. Custom @theme configuration is more maintainable and generates smaller builds.

**Performance impact:** ~50-110KB for fonts only (self-hosted via Fontsource). Zero JavaScript added. No external requests.

### Expected Features

**Must have (table stakes for neobrutalism):**
- Thick borders (2-4px solid) on interactive elements
- Hard offset shadows (4-6px, zero blur) for depth
- High contrast color palette (yellow/teal/magenta already exist)
- Bold typography (700-900 weights for headings)
- Pressed button hover effects (translate + remove shadow)
- Color block sections for visual separation
- Dark mode adaptation (inverted shadows, adjusted colors)

**Should have (differentiators):**
- Narrative homepage structure (Solutions → Process → Tech → About → Contact)
- Asymmetric layouts with intentional breaks
- Projects page with narrative case study format (Problem → Solution → Results)
- Stacked/layered card effects for 3D illusion
- Offset/overlapping elements for visual tension

**Defer to post-v1.1:**
- Isometric shadows (45° angles, medium complexity)
- Cyclical process diagram (high complexity, narrative text works for MVP)
- Retro UI elements (Windows 98 style, could feel gimmicky)
- Advanced micro-interactions beyond hover states
- Quirky animation library (low priority for professional site)

**Anti-features (explicitly avoid):**
- Excessive color combinations (stick to 3 bold colors max)
- Unreadable text contrast (test all combinations with WCAG checker)
- Cluttered asymmetry (chaos ≠ intentional asymmetry)
- Soft gradients or blur (contradicts raw aesthetic)
- Over-animation (exhausting, distracts from content)
- Breaking usability for aesthetics (maintain clear CTAs, readable text)

### Architecture Approach

**CSS-first design tokens with component composition.** All neobrutalist styles defined once in global.css @theme block, consumed via Tailwind utilities in Astro components. No runtime JavaScript for theming—everything compiles to static HTML + CSS.

**Major components:**
1. **Design Token Layer** — @theme in global.css defines colors (--color-brutal-yellow), shadows (--shadow-brutal-md), borders, typography. Generates Tailwind utilities automatically.
2. **Primitive Components** — Button.astro, Card.astro, Input.astro with props for variants (primary/secondary, sm/md/lg). Server-rendered Astro components using Tailwind classes.
3. **Modified Existing Components** — Update Header.astro, BlogCard.astro, Hero.astro, Services.astro with new design tokens. Leverage existing structure, swap classes.
4. **Theme Provider** — Keep existing inline script in BaseLayout.astro for dark mode (localStorage + system preference). Adapt tokens for dark mode via CSS custom properties.

**Key patterns:**
- Hover state: `hover:translate-x-1 hover:translate-y-1 hover:shadow-none` (creates press effect)
- Dark mode: Semantic color tokens reference different values per mode, shadows inverted for visibility
- Component composition: Build primitives with props, compose into larger components (Hero imports Button)
- Progressive enhancement: Zero JavaScript for static elements, client:* directives only for interactive components

**Integration with existing:**
- Create new `components/primitives/` folder for Button, Card, Input
- Modify existing components in place (Header, Footer, BlogCard, etc.)
- Update global.css @theme block, keep existing utilities (.prose, .toc, animations)
- Update BaseLayout.astro font imports, keep dark mode script unchanged

### Critical Pitfalls

1. **WCAG contrast failures with bold colors** — Yellow/teal/magenta can visually "pop" but fail 4.5:1 ratio. Test EVERY color combination with WebAIM checker before implementation. Yellow only on dark backgrounds or with near-black text. Lighthouse CI enforces 90%+ accessibility, but manual testing required (automated tools miss subjective issues).

2. **Sacrificing readability for aesthetic boldness** — Applying decorative fonts to body text kills legibility, especially in blog posts. Strict hierarchy: bold display fonts (Poppins/Bricolage Grotesque) for H1/H2 ONLY, neutral body fonts (Inter) for paragraphs. Minimum 16px body text, 1.75 line height. Test with real blog content, not Lorem Ipsum.

3. **Dark mode color inversion breaking visual hierarchy** — Naively flipping bg-white → bg-black destroys carefully crafted hierarchy. Shadows in dark mode need LIGHTER colors (not darker) to create depth. Bold colors may need 10-20% desaturation to reduce eye strain. Design both modes simultaneously, test every component in both modes during development.

4. **Box-shadow animation performance degradation** — Animating box-shadow directly triggers expensive paint operations, causing jank on mobile (60fps → 20-30fps). NEVER animate box-shadow. Use pseudo-element technique: create ::after with shadow at opacity: 0, animate only opacity on hover. Combine with transform on parent for lift effect. Test on iPhone SE with DevTools Performance.

5. **Over-stylization undermining professional trust** — Pushing neobrutalism to 10/10 density creates experimental look that small business owners interpret as "unprofessional" or "not ready for serious work." Enforce 3/10 density rigorously: headers/hero at 7/10, core content at 2/10, blog posts at 1/10. Use neobrutalist elements as accents, not entire design language. Test with target audience (small business owners), not just design peers.

6. **Inconsistent spacing creating visual chaos** — Random spacing between thick borders/shadows makes layout feel haphazard instead of intentionally raw. Establish spacing scale: minimum 24px gap between bordered elements, 24-32px padding inside bordered containers, shadow-offset + 8px margin around shadow elements. Document spacing rules in design system.

7. **Accessibility testing theater** — Passing 100% Lighthouse while failing actual users. Lighthouse can't evaluate subjective experience (eye strain from vibrating colors, invisible focus indicators that technically pass contrast, screen reader confusion despite ARIA labels). Manual testing non-negotiable: keyboard navigation, screen reader (VoiceOver/NVDA), color blindness simulation, bright sunlight testing.

## Implications for Roadmap

Based on research, recommended 5-phase structure with clear dependencies:

### Phase 1: Design System Foundation
**Rationale:** All components depend on tokens. Must establish accessible color palette, shadow system, typography scale before building anything. Prevents rework if contrast fails Lighthouse later.

**Delivers:**
- Tailwind @theme config with neobrutalist tokens (colors, shadows, borders, typography)
- Font imports in BaseLayout.astro (Bricolage Grotesque + Inter)
- Dark mode token variants tested and working
- Density guidelines documented (3/10 constraint with per-section targets)
- Accessibility baseline (WCAG contrast checked, documented for all color combinations)

**Addresses:**
- Table stakes: high contrast palette, bold typography scale, thick borders, hard shadows
- Pitfalls: WCAG contrast failures, dark mode color inversion, inconsistent spacing
- Stack: Fontsource variable fonts installed and loaded

**Avoids:**
- Rework from inaccessible colors discovered late
- Dark mode broken after component implementation
- Inconsistent token usage across components

**Research needed:** None. Standard Tailwind 4 patterns, well-documented.

---

### Phase 2: Primitive Components
**Rationale:** Build reusable building blocks (Button, Card, Input) that composed components (Hero, BlogCard) will consume. Bottom-up implementation prevents duplicate styling logic.

**Delivers:**
- Button.astro with variants (primary/secondary/neutral), sizes (sm/md/lg), hover press effect
- Card.astro with shadow-brutal, border-2, rounded-brutal, color block variants
- Input.astro for forms with focus states and accessibility
- Badge.astro for tags/labels
- All primitives tested in both light and dark modes

**Uses:**
- Design tokens from Phase 1
- Tailwind utilities: border-*, shadow-brutal-*, hover:translate-*, transition-all
- Astro component props for configuration

**Implements:**
- Architecture pattern: component composition with props
- Hover state pattern: translate + shadow-none
- Dark mode: semantic color tokens with dark: prefix

**Avoids:**
- Box-shadow animation performance (use pseudo-element technique)
- Over-componentization (single Button with props, not PrimaryButton/SecondaryButton/etc.)
- Client-side JavaScript for static styling

**Research needed:** None. Standard Astro component patterns.

---

### Phase 3: Component Updates & Homepage Narrative
**Rationale:** With primitives available, update existing components and restructure homepage. Homepage is highest-traffic page, narrative structure is key differentiator for lead generation.

**Delivers:**
- Hero.astro updated with narrative "Solutions" messaging (problem-focused, not capability-focused)
- Process.astro with cyclical/iterative workflow structure (MVP: narrative text, defer diagram to post-v1.1)
- Services.astro (Tech section) using Card primitive, business benefit focus
- About.astro with personality + credentials
- Header.astro navigation with Button primitive
- Footer.astro updated styling
- Contact form with Input primitive, neobrutalist styling

**Addresses:**
- Narrative homepage structure (Solutions → Process → Tech → About → Contact)
- Asymmetric layouts with intentional breaks
- Color block sections for visual separation
- Table stakes: pressed button states, card components

**Implements:**
- Primitives from Phase 2 composed into larger components
- Narrative content structure from FEATURES.md research

**Avoids:**
- Typography readability issues (test Hero CTA + About section with target audience)
- Professional trust undermining (apply 7/10 density to hero, 2/10 to content areas)

**Research needed:** None for implementation. May need content strategy validation with target audience during testing.

---

### Phase 4: Projects & Blog Styling
**Rationale:** Projects and blog consume primitives built in Phase 2. Blog styling is lower priority than homepage since traffic flows Homepage → Projects → Contact for lead generation.

**Delivers:**
- BlogCard.astro updated with Card primitive, shadow-brutal, border-2
- Blog index page with neobrutalist card grid
- Blog post template with subtle neobrutalist accents (headings only, preserve readable body)
- Tag pages restyled to match
- Portfolio projects page with narrative case study format (Problem → Solution → Results)
- Individual project pages updated

**Addresses:**
- Blog restyling (P2 priority)
- Projects narrative format (P2 priority)
- Table stakes: dark mode adaptation for all blog components

**Avoids:**
- Typography readability issues (critical test: read full blog post >1000 words on mobile)
- Over-styling code blocks (astro-expressive-code should shine, subtle borders max)
- Applying neobrutalist density to body text (1/10 density in blog posts)

**Research needed:** None. Standard component updates.

---

### Phase 5: Testing, Refinement & Accessibility Validation
**Rationale:** Comprehensive testing catches issues before launch. Manual accessibility testing is critical since Lighthouse can pass while failing actual users. Target audience validation ensures professional trust isn't undermined.

**Delivers:**
- Manual accessibility audit (keyboard navigation, VoiceOver/NVDA screen reader, color blindness simulation)
- Performance testing on target devices (iPhone SE, mid-range Android)
- Dark mode QA pass across all pages
- Target audience user testing (small business owners, not design community)
- Density audit (verify 3/10 constraint enforced per section)
- Spacing consistency audit (no one-off values, all use spacing scale)
- Lighthouse CI validation (≥90% all metrics)
- Conversion rate baseline established for post-launch monitoring

**Addresses:**
- All critical pitfalls (WCAG, readability, dark mode, performance, over-stylization, spacing, accessibility theater)
- Professional trust validation with target audience
- Mobile responsiveness validation

**Avoids:**
- Launching with passing Lighthouse but failing users
- Over-stylization reducing conversions (discovered post-launch)
- Box-shadow jank on mobile undetected

**Research needed:** None. Standard QA processes with neobrutalist-specific checklists.

---

### Phase Ordering Rationale

**Why this order:**
1. **Tokens first (Phase 1):** Foundation dependency. All components consume tokens. Accessibility baseline prevents late rework.
2. **Primitives second (Phase 2):** Building blocks for composed components. Bottom-up prevents duplicate styling logic.
3. **Homepage third (Phase 3):** Highest-traffic page, key differentiator for lead generation. Benefits from primitives being stable.
4. **Blog/Projects fourth (Phase 4):** Lower priority than homepage for conversion funnel. Can iterate post-launch.
5. **Testing last (Phase 5):** Validates complete system. Manual accessibility catches what Lighthouse misses.

**How this avoids pitfalls:**
- Phase 1 prevents WCAG contrast failures, dark mode issues, inconsistent spacing (foundational discipline)
- Phase 2 prevents box-shadow animation performance issues (primitives enforce performant patterns)
- Phase 3-4 risk over-stylization but Phase 5 target audience testing catches before launch
- Phase 5 prevents accessibility testing theater (manual audit required)

**Dependencies:**
- Phase 2 depends on Phase 1 (tokens)
- Phase 3-4 depend on Phase 2 (primitives)
- Phase 5 depends on Phase 3-4 (complete system to test)

Linear flow, no circular dependencies.

### Research Flags

**Phases with standard patterns (skip /gsd:research-phase):**
- **Phase 1:** Tailwind 4 @theme configuration is well-documented, neobrutalist token patterns established
- **Phase 2:** Astro component composition with props is standard pattern
- **Phase 4:** Blog styling is standard component updates

**Phases likely needing validation (not research, but testing):**
- **Phase 3:** Content strategy for narrative homepage may need stakeholder/target audience validation during planning (not technical research)
- **Phase 5:** Manual accessibility testing process may need tooling setup (VoiceOver, NVDA, simulation tools)

**No phases need /gsd:research-phase.** All technical patterns are established and verified in research. Implementation is straightforward application of known patterns.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Fontsource packages verified on npm, Tailwind 4 @theme documented officially, no libraries needed reduces risk |
| Features | HIGH | Neobrutalism patterns verified via NN/G (authoritative UX source), table stakes identified from multiple design sources, narrative structure from portfolio best practices |
| Architecture | HIGH | Tailwind 4 CSS-first theming verified in official docs, Astro component patterns verified in official docs, no novel integration points |
| Pitfalls | HIGH | WCAG accessibility standards are specification, box-shadow performance issues verified with technical articles, over-stylization risk validated from multiple professional context sources |

**Overall confidence: HIGH**

All core technical recommendations verified with official documentation (Tailwind 4, Astro, Fontsource, WCAG). Design patterns cross-referenced across multiple authoritative sources (NN/G for neobrutalism definition, multiple portfolio best practice sources for narrative structure). No experimental technologies or unproven patterns.

### Gaps to Address

**Minor gaps (won't block implementation):**
- **Exact color values for dark mode:** Need to desaturate bold colors by 10-20% for dark mode to reduce eye strain. Research identifies need but exact OKLCH values require design iteration during Phase 1 implementation. Not a blocker—can test and adjust.

- **Shadow offset coordination with translate values:** Research recommends using Tailwind's default spacing (translate-x-1 = 0.25rem = 4px) aligned to shadow offsets. If shadow is 6px, may need custom translate utility. Can resolve during Phase 1 token definition.

- **Density guidelines per component type:** Research establishes 3/10 overall constraint and per-section targets (hero 7/10, content 2/10, blog 1/10), but specific components (button, card, input) need density interpretation. Document during Phase 1 with examples.

- **Target audience preferences for narrative structure:** Research identifies problem-focused hero structure as best practice, but Joel's specific target audience (small business owners) may have preferences. Validate with user testing in Phase 5, but shouldn't block Phase 3 implementation (worst case: adjust messaging, structure stays).

**No critical gaps.** All gaps are implementation details resolvable during respective phases, not blockers requiring additional research.

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS v4.1 Documentation](https://tailwindcss.com/docs/theme) — @theme directive, shadow syntax, dark mode
- [Tailwind CSS v4.1 Announcement](https://tailwindcss.com/blog/tailwindcss-v4-1) — Text shadows, CSS-first theming features
- [Astro Components Documentation](https://docs.astro.build/en/basics/astro-components/) — Component patterns, props, slots
- [Astro Fonts Guide](https://docs.astro.build/en/guides/fonts/) — Fontsource recommendations
- [Fontsource Bricolage Grotesque](https://www.npmjs.com/package/@fontsource-variable/bricolage-grotesque) — Package verification, version compatibility
- [WCAG Color Contrast Requirements](https://webaim.org/articles/contrast/) — Accessibility standards (4.5:1 text, 3:1 UI)
- [NN/G: Neobrutalism Definition and Best Practices](https://www.nngroup.com/articles/neobrutalism/) — Authoritative UX source on design pattern

### Secondary (MEDIUM confidence)
- [Neobrutalism.dev Components](https://www.neobrutalism.dev/) — Shadow patterns, hover effects (reference implementation)
- [Bejamas: Neubrutalism Web Design Trend](https://bejamas.com/blog/neubrutalism-web-design-trend) — Feature overview, best practices
- [Tobias Ahlin: Animating Box-Shadow Performance](https://tobiasahlin.com/blog/how-to-animate-box-shadow/) — Pseudo-element technique for performant shadows
- [Kristi.Digital: Fonts for Neobrutalist Design](https://blog.kristi.digital/p/my-favourite-fonts-for-neobrutalist-web-design) — Typography recommendations (Bricolage Grotesque featured)
- [HubSpot: Neo Brutalism Guide](https://blog.hubspot.com/website/neo-brutalism) — Professional context for business sites
- [Manuel Matuzovic: Building Inaccessible Sites with Perfect Lighthouse Scores](https://www.matuzo.at/blog/building-the-most-inaccessible-site-possible-with-a-perfect-lighthouse-score/) — Accessibility testing limitations

### Tertiary (Context only)
- Multiple portfolio website examples (Figma, Webflow, Dribbble) — Narrative structure patterns (context for Phase 3 content structure)
- CSS-Tricks box-shadow guide — General CSS reference (not neobrutalism-specific)
- Various neobrutalism design showcases — Visual inspiration (not technical guidance)

---
*Research completed: 2026-02-09*
*Ready for roadmap: YES*
*Confidence: HIGH across all research areas*

# Roadmap: Joel Shinness Website

## Milestones

- ✅ **v1.0 MVP** - Phases 1-6 (shipped 2026-01-27)
- 🚧 **v1.1 Design Updates** - Phases 7-11 (in progress)
- 📋 **v1.2 Enhancements** - Future phases (planned)

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1-6) - SHIPPED 2026-01-27</summary>

Complete lead-generation focused portfolio website with responsive design, blog platform, portfolio showcase, contact form, and Lighthouse 90+ performance.

**Stats:** 24 source files, 2,052 lines, 23 plans, 90 commits, 2-day build (Jan 26-27, 2026)

**Key accomplishments:**
- Responsive Astro/Tailwind foundation with dark mode and mobile navigation
- Homepage with value proposition, services, process, FAQ, and about section
- Portfolio with filterable case study grid and detailed project pages
- Contact form with validation and Formspree integration
- Blog platform with MDX, syntax highlighting, sticky TOC, and tag filtering
- SEO meta tags, JSON-LD structured data, and CI/CD pipeline

</details>

### 🚧 v1.1 Design Updates (In Progress)

**Milestone Goal:** Transform the site from generic minimalist to distinctive neobrutalist, with a narrative homepage that tells the story of working with Joel. Target small business owners with competence, confidence, personality, and approachability while maintaining 3/10 aesthetic density.

**Key features:**
- Neobrutalist design system (yellow/turquoise/magenta, quirky typography, bold borders)
- Narrative homepage structure (Solutions → Process → Tech → About → Contact)
- Projects page with narrative format
- Restyled blog index and tag pages
- FAQ relocated from homepage

#### Phase 7: Design System Foundation
**Goal**: Establish accessible neobrutalist design tokens that all components will consume
**Depends on**: Phase 6 (v1.0 complete)
**Requirements**: DESIGN-01, DESIGN-02, DESIGN-03, DESIGN-04, DESIGN-05
**Success Criteria** (what must be TRUE):
  1. Site uses yellow/turquoise/magenta color palette with WCAG-compliant contrast ratios
  2. All design tokens (colors, shadows, borders, typography) defined in Tailwind @theme
  3. Dark mode adapts colors and inverts shadows without breaking visual hierarchy
  4. Typography uses quirky display font for headings and readable font for body text
  5. Density guidelines documented with per-section targets (3/10 overall constraint)
**Plans**: 2 plans

Plans:
- [x] 07-01-PLAN.md — Define OKLCH color tokens, shadow utilities, and load new fonts
- [x] 07-02-PLAN.md — Document density guidelines and finalize prose typography

#### Phase 8: Primitive Components
**Goal**: Build reusable neobrutalist UI components that compose into larger features
**Depends on**: Phase 7
**Requirements**: COMP-01, COMP-02, COMP-03, COMP-04
**Success Criteria** (what must be TRUE):
  1. Button component has pressed hover effect (translate + shadow removal)
  2. Card component has thick borders and offset shadows
  3. Input component has bold focus states that meet WCAG visibility requirements
  4. Card component supports stacked/layered effects for 3D illusion
  5. All primitives work in both light and dark modes
**Plans**: TBD

Plans:
- [ ] 08-01: TBD
- [ ] 08-02: TBD

#### Phase 9: Homepage & Navigation
**Goal**: Transform homepage into narrative journey and update header/footer with neobrutalist styling
**Depends on**: Phase 8
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, OTHER-01, OTHER-02
**Success Criteria** (what must be TRUE):
  1. Homepage follows narrative structure from Solutions through Contact
  2. Homepage sections use bold borders, shadows, and asymmetric layouts
  3. Contact form has neobrutalist styling with accessible focus states
  4. FAQ relocated from homepage to footer or separate page
  5. Header and footer use neobrutalist elements while maintaining navigation clarity
**Plans**: TBD

Plans:
- [ ] 09-01: TBD
- [ ] 09-02: TBD
- [ ] 09-03: TBD

#### Phase 10: Projects & Blog
**Goal**: Apply neobrutalist styling to portfolio and blog while maintaining readability
**Depends on**: Phase 9
**Requirements**: PROJ-01, PROJ-02, PROJ-03, BLOG-01, BLOG-02, BLOG-03
**Success Criteria** (what must be TRUE):
  1. Portfolio renamed to Projects in URL and navigation
  2. Projects page uses neobrutalist card grid with thick borders and shadows
  3. Individual project pages use narrative case study format (Problem → Solution → Results)
  4. Blog index and tag pages use neobrutalist card grid
  5. Blog post headings have subtle neobrutalist accents while body text remains readable
**Plans**: TBD

Plans:
- [ ] 10-01: TBD
- [ ] 10-02: TBD

#### Phase 11: Testing & Accessibility Validation
**Goal**: Validate complete neobrutalist redesign meets performance, accessibility, and business goals
**Depends on**: Phase 10
**Requirements**: None (validation phase)
**Success Criteria** (what must be TRUE):
  1. Manual accessibility audit passes (keyboard navigation, screen reader, color blindness simulation)
  2. Performance testing on target devices (iPhone SE, mid-range Android) shows no jank
  3. Dark mode works correctly across all pages and components
  4. Density audit confirms 3/10 constraint enforced per section
  5. Lighthouse CI validation achieves ≥90% across all metrics
**Plans**: TBD

Plans:
- [ ] 11-01: TBD

### 📋 v1.2 Enhancements (Planned)

**Milestone Goal:** Add advanced differentiators and engagement features (isometric shadows, cyclical process diagram, testimonials section, newsletter signup).

Details TBD after v1.1 ships.

## Progress

**Execution Order:**
Phases execute in numeric order: 7 → 8 → 9 → 10 → 11

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Project Setup | v1.0 | 3/3 | Complete | 2026-01-26 |
| 2. Homepage Foundation | v1.0 | 4/4 | Complete | 2026-01-26 |
| 3. Portfolio System | v1.0 | 5/5 | Complete | 2026-01-27 |
| 4. Contact & SEO | v1.0 | 3/3 | Complete | 2026-01-27 |
| 5. Blog Platform | v1.0 | 6/6 | Complete | 2026-01-27 |
| 6. Performance & Deploy | v1.0 | 2/2 | Complete | 2026-01-27 |
| 7. Design System Foundation | v1.1 | 2/2 | Complete | 2026-02-09 |
| 8. Primitive Components | v1.1 | 0/2 | Not started | - |
| 9. Homepage & Navigation | v1.1 | 0/3 | Not started | - |
| 10. Projects & Blog | v1.1 | 0/2 | Not started | - |
| 11. Testing & Accessibility | v1.1 | 0/1 | Not started | - |

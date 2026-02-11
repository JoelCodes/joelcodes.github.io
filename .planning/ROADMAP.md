# Roadmap: Joel Shinness Website

## Milestones

- ✅ **v1.0 MVP** — Phases 1-6 (shipped 2026-01-27)
- ✅ **v1.1 Design Updates** — Phases 7-11 (shipped 2026-02-10)
- ✅ **v1.2 Homepage Refinement** — Phases 12-16 (shipped 2026-02-10)
- 🚧 **v1.3 Design System & Navigation Cleanup** — Phases 17-22 (in progress)

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1-6) — SHIPPED 2026-01-27</summary>

Complete lead-generation focused portfolio website with responsive design, blog platform, portfolio showcase, contact form, and Lighthouse 90+ performance.

**Stats:** 24 source files, 2,052 lines, 23 plans, 90 commits, 2-day build (Jan 26-27, 2026)

**Key accomplishments:**
- Responsive Astro/Tailwind foundation with dark mode and mobile navigation
- Homepage with value proposition, services, process, FAQ, and about section
- Portfolio with filterable case study grid and detailed project pages
- Contact form with validation and Formspree integration
- Blog platform with MDX, syntax highlighting, sticky TOC, and tag filtering
- SEO meta tags, JSON-LD structured data, and CI/CD pipeline

See: `.planning/milestones/v1.0-ROADMAP.md` for full details.

</details>

<details>
<summary>✅ v1.1 Design Updates (Phases 7-11) — SHIPPED 2026-02-10</summary>

Distinctive neobrutalist design transformation with narrative homepage, WCAG 2.2 AA accessibility compliance, and 3/10 aesthetic density.

**Stats:** 37 source files, 3,139 lines, 14 plans, ~100 commits, 2-day build (Feb 9-10, 2026)

**Key accomplishments:**
- OKLCH neobrutalist design system with shadow-to-glow dark mode transformation
- Button, Card, and Input primitives with WCAG 2.4.13 focus states
- Narrative homepage (Solutions -> Process -> Tech -> About -> Contact)
- Projects and Blog with neobrutalist cards and two-tier typography
- Playwright/axe-core accessibility testing with 98.7% manual audit pass rate
- FAQ relocated to footer accordion

See: `.planning/milestones/v1.1-ROADMAP.md` for full details.

</details>

<details>
<summary>✅ v1.2 Homepage Refinement (Phases 12-16) — SHIPPED 2026-02-10</summary>

Enhanced homepage sections with outcome-focused messaging, isometric illustrations, and improved FAQ discoverability for small business clients.

**Stats:** 34 source files, 3,649 lines, 10 plans, 1-day build (Feb 10, 2026)

**Key accomplishments:**
- Icon library migrated to @lucide/astro with tree-shaking (200KB+ bundle reduction)
- Hero section reframed with outcome-focused messaging and 3 visual trust badges
- Process section enhanced with 5 isometric illustrations and user-focused descriptions
- Technology section restructured into 3 categories (AI, Automations, Web Apps) with illustrations
- Dedicated FAQ page with FAQPage JSON-LD schema for SEO rich results
- Isometric CSS utilities (iso-shadow, iso-glow, iso-rotate) with dark mode glow transformation

See: `.planning/milestones/v1.2-ROADMAP.md` for full details.

</details>

### 🚧 v1.3 Design System & Navigation Cleanup (In Progress)

**Milestone Goal:** Consolidate design system into a reference page, ensure consistent component usage across all pages, and streamline navigation for cleaner user experience.

#### Phase 17: Design System Reference Page
**Goal**: Internal design system documentation page exists with all components, tokens, and utilities
**Depends on**: Nothing (first phase of milestone)
**Requirements**: DS-01, DS-02, DS-03, DS-04, DS-05, DS-06, DS-07, DS-08, DS-09
**Success Criteria** (what must be TRUE):
  1. Developer can view all Button variants (primary, secondary, turquoise, disabled) on /design-system page
  2. Developer can view all Card, Input, and Badge component variants with examples
  3. Developer can view OKLCH color palette with hex/oklch values for both light and dark modes
  4. Developer can view typography scale (Bricolage Grotesque, DM Sans) with size examples
  5. Developer can view isometric utilities (iso-shadow, iso-glow, iso-rotate) with visual examples
**Plans**: 5 plans in 3 waves
**Completed**: 2026-02-10

Plans:
- [x] 17-01-PLAN.md — Page infrastructure (layout, sidebar nav, code toggle/copy)
- [x] 17-02-PLAN.md — Design tokens (colors, typography sections)
- [x] 17-03-PLAN.md — Components (Button, Card, Input, Badge documentation)
- [x] 17-04-PLAN.md — Utilities (isometric utilities, JSON endpoint, CLAUDE.md update)
- [x] 17-05-PLAN.md — UAT gap closure (CodeBlock padding, Card stacked isolation, Badge colors)

#### Phase 18: Component Consistency Audit
**Goal**: Complete inventory of component usage across all pages with severity-tiered findings
**Depends on**: Phase 17
**Requirements**: AUDIT-01, AUDIT-02, AUDIT-03
**Success Criteria** (what must be TRUE):
  1. Developer can read audit document listing all component usage inconsistencies
  2. Audit findings are categorized by severity (CRITICAL/HIGH/MEDIUM/LOW)
  3. Prioritized migration plan exists identifying which findings to address
**Plans**: 1 plan in 1 wave
**Completed**: 2026-02-10

Plans:
- [x] 18-01-PLAN.md — Component inventory, page verification, and audit documentation

#### Phase 19: Component Migration (Tiered)
**Goal**: CRITICAL and HIGH severity inconsistencies resolved, components match design system
**Depends on**: Phase 18
**Requirements**: AUDIT-02 (migration execution)
**Success Criteria** (what must be TRUE):
  1. All CRITICAL accessibility inconsistencies are fixed (focus states, ARIA attributes)
  2. All HIGH visual inconsistencies are fixed (shadow offsets, border widths, color variants)
  3. All pages use components that match design system reference
**Plans**: 6 plans in 4 waves
**Completed**: 2026-02-11

Plans:
- [x] 19-01-PLAN.md — Component extension (Button outline variant, Input textarea/select support)
- [x] 19-02-PLAN.md — Contact page migration (form inputs, submit button)
- [x] 19-03-PLAN.md — Filter buttons migration (Portfolio index, Blog index)
- [x] 19-04-PLAN.md — Remaining HIGH items (portfolio badges, ContactSection textarea)
- [x] 19-05-PLAN.md — Blog tag border fix (MEDIUM priority)
- [x] 19-06-PLAN.md — Final verification (axe-core, Lighthouse CI, visual QA)

#### Phase 20: Contact Form Enhancement
**Goal**: Contact form optimized for lead generation with n8n webhook integration
**Depends on**: Phase 17 (design system exists for form components)
**Requirements**: FORM-01, FORM-02, FORM-03, FORM-04
**Success Criteria** (what must be TRUE):
  1. User can submit contact form and receive clear success/error feedback
  2. Form submits to n8n webhook (placeholder URL, configurable)
  3. Form fields are optimized based on freelance developer lead generation best practices
**Plans**: 3 plans in 3 waves
**Completed**: 2026-02-11

Plans:
- [x] 20-01-PLAN.md — Foundation components (CheckboxGroup component, thank-you page)
- [x] 20-02-PLAN.md — Contact form enhancement (new fields, webhook integration, redirect)
- [x] 20-03-PLAN.md — Homepage sync and verification (ContactSection update, design system docs)

#### Phase 21: Navigation Cleanup
**Goal**: Simplified header navigation and contact page redirect implemented
**Depends on**: Phase 19 (component consistency complete)
**Requirements**: NAV-01, NAV-02, NAV-03
**Success Criteria** (what must be TRUE):
  1. User sees only Blog, Projects, FAQ, Contact links in header (homepage section links removed)
  2. User visiting /contact is automatically redirected to /#contact
  3. Footer FAQ standalone link is removed
**Plans**: 1 plan in 1 wave

Plans:
- [ ] 21-01-PLAN.md — Navigation simplification (header, mobile nav, footer, redirect, delete contact page)

#### Phase 22: Footer Enhancement
**Goal**: Footer contains social icons and secondary navigation
**Depends on**: Phase 21
**Requirements**: NAV-04, NAV-05, NAV-06, NAV-07
**Success Criteria** (what must be TRUE):
  1. User can see Instagram and Substack social icons in footer with 44x44px touch targets
  2. User can navigate to Blog, Projects, FAQ, Contact from footer (mirrors header)
  3. Screen reader users hear "Follow Joel on Instagram" and "Follow Joel on Substack" (proper aria-labels)
  4. All social icons pass WCAG 2.2 AA accessibility (axe-core validation)
**Plans**: TBD

Plans:
- [ ] 22-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> ... -> 16 -> 17 -> 18 -> 19 -> 20 -> 21 -> 22

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Project Setup | v1.0 | 3/3 | Complete | 2026-01-26 |
| 2. Homepage Foundation | v1.0 | 4/4 | Complete | 2026-01-26 |
| 3. Portfolio System | v1.0 | 5/5 | Complete | 2026-01-27 |
| 4. Contact & SEO | v1.0 | 3/3 | Complete | 2026-01-27 |
| 5. Blog Platform | v1.0 | 6/6 | Complete | 2026-01-27 |
| 6. Performance & Deploy | v1.0 | 2/2 | Complete | 2026-01-27 |
| 7. Design System Foundation | v1.1 | 2/2 | Complete | 2026-02-09 |
| 8. Primitive Components | v1.1 | 3/3 | Complete | 2026-02-09 |
| 9. Homepage & Navigation | v1.1 | 4/4 | Complete | 2026-02-09 |
| 10. Projects & Blog | v1.1 | 2/2 | Complete | 2026-02-09 |
| 11. Testing & Accessibility | v1.1 | 3/3 | Complete | 2026-02-10 |
| 12. Foundation | v1.2 | 3/3 | Complete | 2026-02-10 |
| 13. Hero Section | v1.2 | 1/1 | Complete | 2026-02-10 |
| 14. Process Section | v1.2 | 3/3 | Complete | 2026-02-10 |
| 15. Technology Section | v1.2 | 2/2 | Complete | 2026-02-10 |
| 16. FAQ Page | v1.2 | 1/1 | Complete | 2026-02-10 |
| 17. Design System Reference Page | v1.3 | 5/5 | Complete | 2026-02-10 |
| 18. Component Consistency Audit | v1.3 | 1/1 | Complete | 2026-02-10 |
| 19. Component Migration (Tiered) | v1.3 | 6/6 | Complete | 2026-02-11 |
| 20. Contact Form Enhancement | v1.3 | 3/3 | Complete | 2026-02-11 |
| 21. Navigation Cleanup | v1.3 | 0/1 | Not started | - |
| 22. Footer Enhancement | v1.3 | 0/? | Not started | - |

---
*Roadmap initialized: 2026-01-26 for v1.0*
*Last updated: 2026-02-11 after Phase 21 planning*

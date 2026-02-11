# Roadmap: Joel Shinness Website

## Milestones

- ✅ **v1.0 MVP** — Phases 1-6 (shipped 2026-01-27)
- ✅ **v1.1 Design Updates** — Phases 7-11 (shipped 2026-02-10)
- ✅ **v1.2 Homepage Refinement** — Phases 12-16 (shipped 2026-02-10)
- ✅ **v1.3 Design System & Navigation Cleanup** — Phases 17-22 (shipped 2026-02-11)

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

<details>
<summary>✅ v1.3 Design System & Navigation Cleanup (Phases 17-22) — SHIPPED 2026-02-11</summary>

Consolidated design system into reference page, achieved 100% component consistency, streamlined navigation to 4 links, enhanced contact form for lead generation.

**Stats:** 40+ source files, 5,498 lines, 17 plans, 2-day build (Feb 10-11, 2026)

**Key accomplishments:**
- Design system reference page at /design-system with JSON API endpoint
- Component consistency audit with 16 findings resolved (zero raw HTML forms/buttons)
- CheckboxGroup component for multi-select form fields
- Enhanced 8-field contact form with n8n webhook integration
- Simplified header navigation (Blog, Projects, FAQ, Contact only)
- Footer with Instagram/Substack social icons (44x44px touch targets)
- Zero axe-core accessibility violations across all pages
- 100% Lighthouse scores (Performance, Accessibility, Best Practices, SEO)

See: `.planning/milestones/v1.3-ROADMAP.md` for full details.

</details>

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
| 21. Navigation Cleanup | v1.3 | 1/1 | Complete | 2026-02-10 |
| 22. Footer Enhancement | v1.3 | 1/1 | Complete | 2026-02-11 |

---
*Roadmap initialized: 2026-01-26 for v1.0*
*Last updated: 2026-02-11 after v1.3 milestone shipped*

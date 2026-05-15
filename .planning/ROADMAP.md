# Roadmap: Joel Shinness Website

## Milestones

- ✅ **v1.0 MVP** — Phases 1-6 (shipped 2026-01-27)
- ✅ **v1.1 Design Updates** — Phases 7-11 (shipped 2026-02-10)
- ✅ **v1.2 Homepage Refinement** — Phases 12-16 (shipped 2026-02-10)
- ✅ **v1.3 Design System & Navigation Cleanup** — Phases 17-22 (shipped 2026-02-11)
- 🚧 **v1.4 Design Overhaul** — Phases 23-30 (in progress)

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

### 🚧 v1.4 Design Overhaul (In Progress)

**Milestone goal:** Replace the neobrutalist visual language with the Crito agency template's structure and aesthetic across the entire site, built on a fresh component library and Pencil-documented design system, while preserving lead-gen positioning and all existing content.

**Phase ordering rationale:** Phase 23 is the gating dependency — tokens, `BaseLayoutV2`, and layout components must exist before any page can migrate. Phase 24 builds the v2 primitive library and proves it on the design-system page (live integration test). Phases 25-27 migrate pages in order of increasing complexity and business risk (leaf pages → blog → projects/services). Phase 28 isolates the contact form reskin (unique e2e testing requirements). Phase 29 migrates the homepage last — it has the most sections and highest business risk. Phase 30 is deletion-only: removes v1 dead code after 100% migration is confirmed.

---

#### Phase 23: Design System Foundation
**Goal:** The v2 design token system, `src/layouts/v2/BaseLayout.astro`, and the global Header/Footer components (`src/components/v2/layout/Header.astro`, `Footer.astro`) exist and are validated — every subsequent phase can build on them without risk of v1/v2 token collision or dark-mode contamination.
**Depends on:** Phase 22 (all v1.3 work complete)
**Requirements:** FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, COMP-05, COMP-06
**Success Criteria** (what must be TRUE):
  1. Visiting any page on `src/layouts/v2/BaseLayout.astro` renders in light mode regardless of OS dark-mode preference — no flash of dark styles, no `#theme-toggle` in the DOM
  2. `src/styles/v2/global.css` declares a complete v2 token set using semantic names (e.g. `--color-primary`, `--color-surface`) that share no names with v1 tokens in `global.css`; both files coexist without visual interference on any v1.3 page
  3. `design/design-system.pen` exists with a token-mapping table (Pencil variable → CSS custom property) derived from inspecting the Crito `.pen` file; font packages installed match the names extracted from that inspection
  4. `src/components/v2/layout/Header.astro` renders a sticky nav with 4 links (Blog, Projects, FAQ, Contact) and a "Let's Talk" CTA with no dark mode toggle; `src/components/v2/layout/Footer.astro` renders a 2-column layout with social icons that meet 44x44px touch targets
  5. All existing v1.3 pages continue to render correctly (zero visual regression on the v1.3 page set)
**Plans:** 4 plans

Plans:
- [ ] 23-01-PLAN.md *(Wave 1)* — Inspect Crito `.pen` via Pencil MCP; record fonts/palette/spacing/radii into 23-01-CRITO-INSPECTION.md; confirm `@fontsource-variable/*` package names on npm; resolve `--font-heading`/`--font-body` v1 collision via `--font-display`/`--font-text` rename
- [ ] 23-02-PLAN.md *(Wave 2, blocked on 23-01)* — Create `src/styles/v2/global.css` with full `@theme` block (semantic tokens, no v1 name collisions); install pinned `@fontsource-variable/*` packages; ship `tests/check-token-collision.cjs` Wave 0 guard
- [ ] 23-03-PLAN.md *(Wave 3, blocked on 23-01 + 23-02)* — Create `src/layouts/v2/BaseLayout.astro` (light-mode-only, no FOUC script, no theme-toggle, self-hosted-font preload); create `design/design-system.pen` with 33+ variables, factored Header + Footer, and inline Token Reference frame
- [ ] 23-04-PLAN.md *(Wave 4, blocked on 23-02 + 23-03)* — Build `src/components/v2/layout/{Header,Footer,MobileNav}.astro` (sticky header + 4 links + CTA, focus-trapped overlay, 2-column footer with 44x44 social icons); add `tests/accessibility/v2-layout.spec.ts`; verify FOUND-06 v1.3 coexistence as final gate

---

#### Phase 24: v2 Primitive Library + Design System Page
**Goal:** The four v2 primitive components (Button, Card, Input, Badge) exist with WCAG 2.2 AA validation, and the `/design-system` page is rebuilt on `BaseLayoutV2` to document and live-demo them — proving the dual-layout strategy works before any real page migration begins.
**Depends on:** Phase 23
**Requirements:** COMP-01, COMP-02, COMP-03, COMP-04, COMP-07, LEAF-04
**Success Criteria** (what must be TRUE):
  1. `/design-system` renders on `BaseLayoutV2` with live demos of all four v2 primitives (Button variants, Card variants, Input with error state, Badge); the v1 design system page with neobrutalist components is replaced
  2. Every interactive v2 component (Button, Input) can be reached and activated by keyboard alone; all pass axe-core with zero violations
  3. `/design-system.json` endpoint returns v2 token values (colors, fonts, spacing) — not v1 values
  4. No `is:global` Astro style blocks appear in any v2 component; all component styles are scoped or use Tailwind utility classes
**Plans:** TBD

Plans:
- [ ] 24-01: Build v2 Button primitive (all variants, keyboard focus, WCAG contrast)
- [ ] 24-02: Build v2 Card, Input, and Badge primitives (variants, accessible labels, error states)
- [ ] 24-03: Run Playwright keyboard navigation + axe-core tests against all interactive v2 components; fix any violations
- [ ] 24-04: Rebuild `/design-system` page on `BaseLayoutV2` with live component demos; update `/design-system.json` endpoint to v2 token values

---

#### Phase 25: Leaf Page Migrations (FAQ, Thank-You, 404)
**Goal:** The three simplest pages — `/faq`, `/thank-you`, and `/404` — are migrated to `BaseLayoutV2`, validating the dual-layout coexistence pattern on low-risk targets before touching content-heavy pages.
**Depends on:** Phase 24
**Requirements:** LEAF-01, LEAF-02, LEAF-03
**Success Criteria** (what must be TRUE):
  1. `/faq` renders on `BaseLayoutV2` with the accordion behavior unchanged; `FAQPage` JSON-LD schema is present and validates; a CTA block appears at the bottom of the page
  2. `/thank-you` renders on `BaseLayoutV2` with the post-submission message and Calendly placeholder link intact
  3. `/404` renders on `BaseLayoutV2` with navigation links back to the homepage and key pages
  4. All three pages pass axe-core with zero violations and Lighthouse 90+ across all categories
**Plans:** TBD

Plans:
- [ ] 25-01: Migrate `/faq` to `BaseLayoutV2`; add CTA block; verify FAQPage JSON-LD; axe-core pass
- [ ] 25-02: Migrate `/thank-you` and `/404` to `BaseLayoutV2`; verify content and navigation intact; axe-core pass

---

#### Phase 26: Blog Migration (Post Layout, Index, Tag Pages)
**Goal:** All three blog surfaces — post detail, index, and tag pages — are migrated to `BaseLayoutV2`, with the prose rendering pipeline (Expressive Code, sticky TOC, `.prose` wrapper) verified on a real post before the index and tag pages are touched.
**Depends on:** Phase 25
**Requirements:** BLOG-01, BLOG-02, BLOG-03, BLOG-04, BLOG-05, BLOG-06, BLOG-07
**Success Criteria** (what must be TRUE):
  1. A blog post renders on `BaseLayoutV2` with correct `.prose` typography: headings, blockquotes, inline code, and fenced code blocks (with syntax highlighting and copy button from Expressive Code) all display correctly
  2. The sticky TOC remains functional on blog posts — it scrolls with the page and does not break due to any ancestor `overflow` constraint introduced by the v2 layout shell
  3. A sidebar appears on blog post pages showing 2-3 related posts derived statically from the content collection (filtered by shared tags)
  4. Share buttons (LinkedIn + copy-URL) appear on blog posts and function without JavaScript errors
  5. Blog index (`/blog`) and tag pages (`/blog/tags/[tag]`) render on `BaseLayoutV2` with the existing tag-filter behavior preserved
**Plans:** TBD

Plans:
- [ ] 26-01: Migrate blog post layout (`/blog/[slug]`) to `BaseLayoutV2`; audit ancestor `overflow` for TOC; verify Expressive Code and `.prose` styles
- [ ] 26-02: Add right sidebar with related-posts component (static, from content collection)
- [ ] 26-03: Add share buttons (LinkedIn + copy-URL) to blog post layout
- [ ] 26-04: Migrate blog index (`/blog`) and tag pages (`/blog/tags/[tag]`) to `BaseLayoutV2`; verify filter behavior

---

#### Phase 27: Projects + Services Migration
**Goal:** All project pages (detail and index) are migrated to `BaseLayoutV2` with v2 visual treatments (stat-card results strip, hover overlay, inline CTA), and the new `/services` page is created — both using the v2 Card component already proven in Phase 24.
**Depends on:** Phase 26
**Requirements:** PROJ-01, PROJ-02, PROJ-03, PROJ-04, PROJ-05, PROJ-06, SERV-01, SERV-02, SERV-03, SERV-04
**Success Criteria** (what must be TRUE):
  1. Project detail pages render on `BaseLayoutV2` with results displayed as a clean stat-card strip (large numerals, no neobrutalist bordered boxes); an inline CTA strip ("Ready to solve a similar problem? Let's talk →") appears at the bottom of every case study
  2. Project images use `astro:assets <Image>` with explicit width/height; no CLS is measurable on any project page
  3. The projects index renders on `BaseLayoutV2`; hovering a project card reveals a result-metric overlay; the `featured` boolean is added to `projects.json` schema (existing project data unchanged)
  4. `/services` exists as a standalone page on `BaseLayoutV2` with longer-form descriptions of AI, Automations, and Web Apps; `FAQPage`-appropriate JSON-LD or equivalent structured data is present; contact CTAs appear throughout the page
  5. `/services` is discoverable from the header navigation (whether as a standalone link or via a grouped pattern defined during implementation)
**Plans:** TBD

Plans:
- [ ] 27-01: Add `featured` field to projects schema; migrate project detail pages (`/projects/[slug]`) to `BaseLayoutV2`; implement stat-card results strip and inline CTA strip
- [ ] 27-02: Migrate projects index (`/projects`) to `BaseLayoutV2`; implement hover result-metric overlay on ProjectCard; audit all project images for width/height
- [ ] 27-03: Create `/services` page on `BaseLayoutV2`; write longer-form service descriptions; add JSON-LD and contact CTAs; update HeaderV2 navigation to surface /services

---

#### Phase 28: Contact Reskin
**Goal:** The contact section is visually reskinned to the Crito 2-column layout with trust micro-copy, the n8n webhook integration is verified end-to-end in CI, and a mandatory Playwright e2e test gates the merge.
**Depends on:** Phase 27
**Requirements:** CONT-01, CONT-02, CONT-03, CONT-04, CONT-05
**Success Criteria** (what must be TRUE):
  1. The contact section renders as a 2-column layout (form left, trust signals right) with trust micro-copy near the submit button
  2. Submitting the contact form with valid data triggers the n8n webhook and redirects to `/thank-you` — verified by a Playwright e2e test that is wired into CI as a required merge gate
  3. All `hp-*` DOM IDs are either preserved exactly as they were in v1.3 OR renamed atomically (IDs and all JavaScript handler references updated in a single commit); no orphaned `document.getElementById` calls remain
  4. `PUBLIC_N8N_WEBHOOK_URL` is confirmed present in the GitHub Actions build step; the CI build does not fall back to the placeholder URL silently
**Plans:** TBD

Plans:
- [ ] 28-01: Reskin ContactSection to 2-column Crito layout; preserve or atomically rename `hp-*` IDs; add trust micro-copy near submit
- [ ] 28-02: Write Playwright e2e test for form submission → `/thank-you` redirect; verify `PUBLIC_N8N_WEBHOOK_URL` in CI environment; confirm webhook payload intact

---

#### Phase 29: Homepage Migration
**Goal:** The homepage — the highest-traffic, highest-business-risk page on the site — is migrated to `BaseLayoutV2` with the full Crito-adapted section set: Hero, Stats Strip, Services, Process, Why-Choose-Us, About, and Contact.
**Depends on:** Phase 28
**Requirements:** HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07, HOME-08
**Success Criteria** (what must be TRUE):
  1. The homepage hero renders as a split layout: headline + dual CTA (primary + ghost) left, Joel's portrait right; the portrait loads with `loading="eager"` and `fetchpriority="high"`; a `<link rel="preload" as="image">` is present in `<head>`; LCP does not regress below 90 on Lighthouse
  2. A stats strip below the hero displays key trust metrics (e.g. 15+ years, 200+ students, 3 domains) in a clean typographic row
  3. Services are presented as a 3-card grid (AI, Automations, Web Apps); the process section uses a numbered 2x2 grid for Steps 1-4 with Step 5 as a standalone block; neither section uses isometric illustrations
  4. A Why-Choose-Us section is present between Process and About with a headline, 4 differentiator bullets, and an adjacent photo
  5. The About section renders with the existing copy unchanged; the contact section matches the 2-column reskin delivered in Phase 28
  6. The homepage bento-grid hero and all v1.1/v1.2 isometric illustrations are absent; the page has no dark mode toggle
**Plans:** TBD

Plans:
- [ ] 29-01: Build Hero section component (split layout, portrait with eager loading/preload, dual CTA, stats strip)
- [ ] 29-02: Build Services (3-card grid), Process (numbered 2x2 grid + standalone Step 5), and Why-Choose-Us sections
- [ ] 29-03: Assemble homepage on `BaseLayoutV2` with all sections; verify LCP, axe-core, and Lighthouse 90+ across all categories

---

#### Phase 30: v1 Component Cleanup + Final QA
**Goal:** All v1.3 design system code is deleted, Playwright selectors are migrated to ARIA roles, and CLAUDE.md is updated — leaving a clean codebase with zero dead code and a complete accessibility and SEO sign-off.
**Depends on:** Phase 29
**Requirements:** QUAL-01, QUAL-02, QUAL-03, QUAL-04, QUAL-05, QUAL-06, QUAL-07
**Success Criteria** (what must be TRUE):
  1. `src/components/ui/` and `src/components/layout/` (v1.3 directories) are deleted; `BaseLayout.astro` is deleted; `src/styles/global.css` (v1) is deleted; `v2.css` is renamed to `global.css` — the build completes with zero errors after all deletions
  2. No Playwright test file contains `#theme-toggle`, `.btn-turquoise`, or any other v1-only selector; all selectors use ARIA roles or v2-specific data attributes
  3. Zero axe-core violations across all pages in the final CI run; Lighthouse CI passes 90+ thresholds on Performance, Accessibility, Best Practices, and SEO on every page
  4. CLAUDE.md accurately describes the v2 component library location (`src/components/v2/`), token system (`global.css` after rename), and design system page reference (`/design-system`)
  5. A `<head>` slot audit confirms: `Article` JSON-LD on all blog posts, `FAQPage` JSON-LD on `/faq`, canonical URLs, sitemap, and robots.txt all present and unchanged
**Plans:** TBD

Plans:
- [ ] 30-01: Audit and update all Playwright test selectors to ARIA roles; run full test suite green
- [ ] 30-02: Delete `src/components/ui/`, `src/components/layout/`, `BaseLayout.astro`, `global.css` (v1); rename `v2.css` to `global.css`; verify build passes
- [ ] 30-03: Run final axe-core + Lighthouse CI sweep; perform `<head>` slot SEO audit; update CLAUDE.md

---

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> ... -> 22 -> 23 -> 24 -> 25 -> 26 -> 27 -> 28 -> 29 -> 30

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
| 23. Design System Foundation | v1.4 | 0/4 | Not started | - |
| 24. v2 Primitive Library + Design System Page | v1.4 | 0/4 | Not started | - |
| 25. Leaf Page Migrations | v1.4 | 0/2 | Not started | - |
| 26. Blog Migration | v1.4 | 0/4 | Not started | - |
| 27. Projects + Services Migration | v1.4 | 0/3 | Not started | - |
| 28. Contact Reskin | v1.4 | 0/2 | Not started | - |
| 29. Homepage Migration | v1.4 | 0/3 | Not started | - |
| 30. v1 Component Cleanup + Final QA | v1.4 | 0/3 | Not started | - |

---
*Roadmap initialized: 2026-01-26 for v1.0*
*Last updated: 2026-05-14 — v1.4 Design Overhaul phases 23-30 added*

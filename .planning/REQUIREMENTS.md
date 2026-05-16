# Requirements: Joel Shinness Website — v1.4 Design Overhaul

**Defined:** 2026-05-14
**Core Value:** Small business owners can understand what Joel does, trust his process, and easily reach out to start a conversation.

**Milestone goal:** Replace the neobrutalist visual language with the Crito agency template's structure and aesthetic across the entire site, built on a fresh component library and Pencil-documented design system, while preserving lead-gen positioning and all existing content.

## v1.4 Requirements

Requirements for this milestone. Each maps to roadmap phases.

### Foundation — Design System

- [x] **FOUND-01**: Crito `.pen` file inspected via Pencil MCP; exact fonts, OKLCH palette, spacing, and radii extracted and recorded
- [x] **FOUND-02**: `design/design-system.pen` file created with extracted variables and factored reusable components
- [x] **FOUND-03**: `src/styles/v2/global.css` declares the full v2 token system using Tailwind v4 `@theme` with semantic, collision-safe names (no overlap with `global.css` v1 tokens)
- [x] **FOUND-04**: Self-hosted variable fonts installed via `@fontsource-variable/*` packages (names confirmed after Pencil inspection)
- [x] **FOUND-05**: `src/layouts/v2/BaseLayout.astro` created with no dark-mode FOUC script, no `localStorage.theme` code, no `#theme-toggle` element — v2 pages render light-mode only regardless of OS preference
- [x] **FOUND-06**: v1.3 pages and `BaseLayout.astro` continue to render unchanged during the transition (parallel libraries coexist without collision)

### Components — v2 Library

- [ ] **COMP-01**: v2 Button primitive with keyboard-accessible focus states meeting WCAG 2.2 AA (Crito visual language)
- [ ] **COMP-02**: v2 Card primitive with documented variants matching Crito patterns
- [ ] **COMP-03**: v2 Input primitive with accessible labels, error states, and consistent typography
- [ ] **COMP-04**: v2 Badge primitive
- [x] **COMP-05**: `src/components/v2/layout/Header.astro` with 4 nav links (Blog, Projects, FAQ, Contact), "Let's Talk" CTA, sticky positioning, mobile hamburger; no theme toggle
- [x] **COMP-06**: `src/components/v2/layout/Footer.astro` with 2-column layout, social icons (44x44 touch targets), secondary nav; no newsletter bar
- [ ] **COMP-07**: All interactive v2 components validated for WCAG 2.2 AA color contrast and keyboard navigation

### Homepage

- [ ] **HOME-01**: Split-layout hero replaces the bento-grid: headline + dual CTA (primary + ghost) + 1 trust stat left, Joel's portrait right
- [ ] **HOME-02**: Hero portrait image loads with `loading="eager"` + `fetchpriority="high"` + `<link rel="preload" as="image">` to preserve LCP
- [ ] **HOME-03**: Stats strip below hero presents key trust metrics (e.g. 15+ years, 200+ students, 3 domains)
- [ ] **HOME-04**: Services rendered as a 3-card grid (AI, Automations, Web Apps); no inflation to 8 cards
- [ ] **HOME-05**: Process section uses numbered grid layout (Steps 1–4 in a 2x2 grid, Step 5 as standalone CTA-adjacent block) with simple line icons (`@lucide/astro`)
- [ ] **HOME-06**: Why-Choose-Us section added between Process and About — headline + 4 bullets (factored from existing About copy) + photo
- [ ] **HOME-07**: About section preserved with new visual treatment; copy unchanged
- [ ] **HOME-08**: ContactSection reskinned to 2-column layout (form left, trust signals right); all form behavior preserved

### Services Page (new)

- [ ] **SERV-01**: `/services` route created with dedicated landing page on `BaseLayoutV2`
- [ ] **SERV-02**: 3 service offerings presented (AI, Automations, Web Apps) with longer-form descriptions than the homepage card grid
- [ ] **SERV-03**: Page includes JSON-LD structured data appropriate for a services page and contact CTAs throughout
- [ ] **SERV-04**: HeaderV2 navigation updated to surface /services discoverably (TBD in design: standalone link vs grouped)

### Projects

- [ ] **PROJ-01**: Project detail pages (`/projects/[slug]`) migrated to `BaseLayoutV2` with Problem → Solution → Results → Testimonial narrative preserved
- [ ] **PROJ-02**: Results displayed as a stat-card strip (large numerals) replacing the v1.3 neobrutalist bordered metric boxes
- [ ] **PROJ-03**: Inline CTA strip ("Ready to solve a similar problem? Let's talk →") rendered at the bottom of every case study
- [ ] **PROJ-04**: Projects index (`/projects`) migrated; ProjectCard reveals result metric overlay on hover
- [ ] **PROJ-05**: `featured` boolean field added to project schema; existing projects.json content otherwise unchanged
- [ ] **PROJ-06**: All project images use `astro:assets <Image>` with explicit width/height (zero CLS)

### Blog

- [ ] **BLOG-01**: Blog post layout (`/blog/[slug]`) migrated to `BaseLayoutV2`; `.prose` wrapper class preserved so all MDX prose styles render
- [ ] **BLOG-02**: Astro Expressive Code blocks render correctly (syntax highlighting, copy button) on migrated post layout
- [ ] **BLOG-03**: Sticky TOC continues to function on blog posts (ancestor `overflow` audit performed)
- [ ] **BLOG-04**: Blog index (`/blog`) migrated to `BaseLayoutV2`
- [ ] **BLOG-05**: Blog tag pages (`/blog/tags/[tag]`) migrated to `BaseLayoutV2`
- [ ] **BLOG-06**: Blog post pages display a sidebar with related posts derived statically from content collections
- [ ] **BLOG-07**: Blog post pages include share buttons (LinkedIn + copy-URL)

### Standalone Pages

- [ ] **LEAF-01**: `/faq` migrated to `BaseLayoutV2`; FAQPage JSON-LD schema preserved; CTA block added at bottom
- [ ] **LEAF-02**: `/thank-you` migrated to `BaseLayoutV2`
- [ ] **LEAF-03**: `/404` migrated to `BaseLayoutV2` with helpful navigation back to homepage and key pages
- [ ] **LEAF-04**: `/design-system` page rebuilt to document all v2 components with live demos; `/design-system.json` endpoint values updated to v2 tokens

### Contact Flow

- [ ] **CONT-01**: ContactSection visually reskinned to Crito 2-column pattern with trust micro-copy near submit
- [ ] **CONT-02**: All `hp-*` DOM IDs preserved OR renamed atomically with JavaScript handler updates in a single commit
- [ ] **CONT-03**: n8n webhook integration (`PUBLIC_N8N_WEBHOOK_URL`) verified working post-migration; payload filtering preserved
- [ ] **CONT-04**: Successful submission still redirects to `/thank-you`
- [ ] **CONT-05**: Playwright e2e test verifies form submission → /thank-you redirect; this test is a mandatory merge gate for the contact reskin

### Cleanup + Quality

- [ ] **QUAL-01**: v1.3 components in `src/components/ui/` and `src/components/layout/` deleted after all pages migrated
- [ ] **QUAL-02**: `BaseLayout.astro` (v1) deleted; `src/styles/global.css` (v1) deleted; `v2.css` renamed to `global.css`
- [ ] **QUAL-03**: All Playwright test selectors audited and migrated to ARIA roles — no remaining `#theme-toggle`, `.btn-turquoise`, or other v1-only selectors
- [ ] **QUAL-04**: Zero axe-core violations across all pages (WCAG 2.2 AA)
- [ ] **QUAL-05**: Lighthouse CI passes 90+ thresholds across Performance, Accessibility, Best Practices, SEO on every page
- [ ] **QUAL-06**: CLAUDE.md updated to document the new v2 design system (component library location, token system, design system page reference)
- [ ] **QUAL-07**: SEO audit confirms `<head>` slot inventory unchanged — `Article` schema on blog posts, `FAQPage` on /faq, canonical URLs, sitemap, robots.txt all preserved

## v1.5+ Requirements

Deferred to future releases. Tracked but not in current roadmap.

### About Page

- **ABOUT-01**: Dedicated `/about` page with bio, photo, credentials, manifesto, social proof
- **ABOUT-02**: Homepage About section either kept or condensed if /about ships

### Dark Mode

- **DARK-01**: Dark mode design language defined for the v2 system
- **DARK-02**: Dark mode tokens added alongside light tokens in `global.css`
- **DARK-03**: Dark mode toggle in HeaderV2 + FOUC-prevention script

### Content

- **CNT-01**: Real project screenshots replace placeholder SVGs in projects.json
- **CNT-02**: Expanded project dataset (5–10 projects) for credibility
- **CNT-03**: Testimonials section with real client quotes
- **CNT-04**: Newsletter signup integration

## Out of Scope

Explicitly excluded from v1.4. Reasons documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Dark mode | Deferred — build light first; revisit after the new design lands |
| Editing copy, projects.json data, MDX posts | v1.4 is visual-only; content is carried over unchanged |
| /about page | Stretch goal moved to v1.5; v1.4 already covers 9 pages |
| Team members section | Joel is a solo consultant; fabricated team grid is dishonest |
| Utility bar above nav | Team-agency signal; wrong for solo consultant |
| 4-column footer | Sized for an agency; 2-column is correctly sized |
| Newsletter bar above footer | No newsletter configured; false promise if shipped without backend |
| 8-cell services catalog | Joel has 3 services; 8 implies capabilities he doesn't offer |
| Auto-rotating testimonial carousel | Dark pattern; WCAG 1.4.13 risk |
| Stock photography | Destroys trust for a solo consultant; personal relationship is the product |
| Multi-CTA clusters (3+ buttons per section) | Decision fatigue; one primary CTA per section |
| Over-animated hero entrance | ≤1 hero animation, ≤400ms; Crito-style clean entrance |
| Astro experimental Fonts API | Stable only in Astro 6.0 (requires Node 22 upgrade); too risky for 100% Lighthouse site |
| Motion / GSAP / AOS libraries | JS weight conflicts with Lighthouse performance budget; CSS-only animation strategy |
| `@astrojs/react` | Adds React runtime to a zero-framework static site |
| `@tailwindcss/typography` | Generates opinionated defaults that conflict with agency aesthetics |
| Neobrutalist palette / isometric SVGs / Bricolage Grotesque + DM Sans / shadow-to-glow dark mode | Explicitly being replaced by v1.4 |
| Booking/calendar integration, CMS backend, pricing pages | Already out of scope at the project level |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 23 | Complete |
| FOUND-02 | Phase 23 | Complete |
| FOUND-03 | Phase 23 | Complete |
| FOUND-04 | Phase 23 | Complete |
| FOUND-05 | Phase 23 | Complete |
| FOUND-06 | Phase 23 | Complete |
| COMP-01 | Phase 24 | Pending |
| COMP-02 | Phase 24 | Pending |
| COMP-03 | Phase 24 | Pending |
| COMP-04 | Phase 24 | Pending |
| COMP-05 | Phase 23 | Complete |
| COMP-06 | Phase 23 | Complete |
| COMP-07 | Phase 24 | Pending |
| HOME-01 | Phase 29 | Pending |
| HOME-02 | Phase 29 | Pending |
| HOME-03 | Phase 29 | Pending |
| HOME-04 | Phase 29 | Pending |
| HOME-05 | Phase 29 | Pending |
| HOME-06 | Phase 29 | Pending |
| HOME-07 | Phase 29 | Pending |
| HOME-08 | Phase 29 | Pending |
| SERV-01 | Phase 27 | Pending |
| SERV-02 | Phase 27 | Pending |
| SERV-03 | Phase 27 | Pending |
| SERV-04 | Phase 27 | Pending |
| PROJ-01 | Phase 27 | Pending |
| PROJ-02 | Phase 27 | Pending |
| PROJ-03 | Phase 27 | Pending |
| PROJ-04 | Phase 27 | Pending |
| PROJ-05 | Phase 27 | Pending |
| PROJ-06 | Phase 27 | Pending |
| BLOG-01 | Phase 26 | Pending |
| BLOG-02 | Phase 26 | Pending |
| BLOG-03 | Phase 26 | Pending |
| BLOG-04 | Phase 26 | Pending |
| BLOG-05 | Phase 26 | Pending |
| BLOG-06 | Phase 26 | Pending |
| BLOG-07 | Phase 26 | Pending |
| LEAF-01 | Phase 25 | Pending |
| LEAF-02 | Phase 25 | Pending |
| LEAF-03 | Phase 25 | Pending |
| LEAF-04 | Phase 24 | Pending |
| CONT-01 | Phase 28 | Pending |
| CONT-02 | Phase 28 | Pending |
| CONT-03 | Phase 28 | Pending |
| CONT-04 | Phase 28 | Pending |
| CONT-05 | Phase 28 | Pending |
| QUAL-01 | Phase 30 | Pending |
| QUAL-02 | Phase 30 | Pending |
| QUAL-03 | Phase 30 | Pending |
| QUAL-04 | Phase 30 | Pending |
| QUAL-05 | Phase 30 | Pending |
| QUAL-06 | Phase 30 | Pending |
| QUAL-07 | Phase 30 | Pending |

**Coverage:**
- v1.4 requirements: 54 total (6 FOUND + 7 COMP + 8 HOME + 4 SERV + 6 PROJ + 7 BLOG + 4 LEAF + 5 CONT + 7 QUAL)
- Mapped to phases: 54 ✓
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-14*
*Last updated: 2026-05-14 — traceability table filled after roadmap creation*

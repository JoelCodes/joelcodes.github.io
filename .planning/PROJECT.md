# Joel Shinness Website

## What This Is

A lead-generation focused portfolio website for Joel Shinness targeting small business clients. The site communicates expertise in web apps, automation, and AI development through distinctive neobrutalist design with isometric illustrations, outcome-focused messaging, and clear calls to action.

**Current state:** v1.3 shipped. v1.4 Design Overhaul in planning — full visual refresh adopting the Crito agency template structure on a new component library.

## Core Value

Small business owners can understand what Joel does, trust his process, and easily reach out to start a conversation.

## Current Milestone: v1.4 Design Overhaul

**Goal:** Replace the neobrutalist visual language with the Crito agency template's structure and aesthetic across the entire site, built on a fresh component library and Pencil-documented design system, while preserving lead-gen positioning and all existing content.

**Reference design:** `design/Consulting & Agency Website Template I Crito (Community).pen` (converted from Figma; inspected via the Pencil MCP).

**Target outcomes:**
- New Pencil-documented design system (.pen file) defining tokens, typography, and reusable components factored from the Crito reference
- New code component library built alongside v1.3 components (`src/components/v2/` or similar namespace), enabling per-page migration without breaking existing pages
- Every page refactored onto the new library: Homepage, Projects (index + detail), Blog (index + post + tag), FAQ, Contact, Thank-you, Design system reference page, 404
- v1.3 design system components deleted after all pages migrate
- Lead-gen contact flow (8-field n8n webhook form + /thank-you redirect) preserved with reskinned visual presentation
- WCAG 2.2 AA + Lighthouse 90+ thresholds maintained across all refactored pages

**Key context:**
- Crito reference .pen contains 15 page frames but zero reusable components (Figma → Pen conversion flattened them); the v1.4 design system phase factors the components ourselves
- Crito page structure does not map 1:1 to current site (e.g. Crito has separate Service / About Me / Information / View More pages; ours embeds About in homepage and uses Projects for service showcase) — page-structure mapping resolved during requirements
- Build-alongside-then-swap strategy keeps existing v1.3 components functional until each page is migrated (no big-bang break)
- Dark mode deferred — light-mode only for v1.4, revisit after the new design lands
- Phase numbering continues from v1.3 → starts at **Phase 23**

## Requirements

### Validated

*Shipped in v1.0:*

- ✓ Homepage with clear value proposition and services overview — v1.0
- ✓ Services section explaining web apps, automation, and AI development — v1.0
- ✓ Process section showing 5-step workflow — v1.0
- ✓ Portfolio with case study format (screenshots, problem, solution, results) — v1.0
- ✓ About section on homepage — v1.0
- ✓ Blog with MDX, tag filtering, and syntax highlighting — v1.0
- ✓ FAQ section addressing common objections — v1.0
- ✓ Contact form with Formspree integration — v1.0
- ✓ Responsive design (mobile, tablet, desktop) — v1.0
- ✓ Dark mode with persistence — v1.0
- ✓ SEO meta tags and JSON-LD structured data — v1.0
- ✓ Lighthouse 90+ performance — v1.0 (achieved 92)

*Shipped in v1.1:*

- ✓ Neobrutalist design system (yellow/turquoise/magenta OKLCH palette) — v1.1
- ✓ Quirky typography with Bricolage Grotesque headings — v1.1
- ✓ Hard offset shadows with shadow-to-glow dark mode transformation — v1.1
- ✓ Homepage narrative structure (Solutions → Process → Tech → About → Contact) — v1.1
- ✓ Projects page with neobrutalist cards and case study format — v1.1
- ✓ Blog index and tag pages with turquoise accents — v1.1
- ✓ WCAG 2.2 AA accessibility compliance (98.7% manual audit) — v1.1

*Shipped in v1.2:*

- ✓ Hero section with outcome-focused messaging and 3 visual trust badges — v1.2
- ✓ Process section with detailed descriptions (1-2 sentences per step) — v1.2
- ✓ Process section with 5 isometric mini-illustrations — v1.2
- ✓ Technology section split into AI, Automations, Web Apps with illustrations — v1.2
- ✓ Dedicated /faq page with JSON-LD FAQPage schema — v1.2
- ✓ Isometric CSS utilities (iso-shadow, iso-glow, iso-rotate) — v1.2
- ✓ Icon library tree-shaking (@lucide/astro migration) — v1.2

*Shipped in v1.3:*

- ✓ Design system reference page at /design-system with JSON API — v1.3
- ✓ Component consistency audit with 16 findings resolved — v1.3
- ✓ All pages using design system components (Button, Input, Badge, Card) — v1.3
- ✓ CheckboxGroup component for multi-select form fields — v1.3
- ✓ Enhanced contact form with 8 lead qualification fields — v1.3
- ✓ n8n webhook integration for contact form submissions — v1.3
- ✓ Simplified header navigation (Blog, Projects, FAQ, Contact) — v1.3
- ✓ /contact page redirect to /#contact section — v1.3
- ✓ Footer with Instagram/Substack social icons (44x44px touch targets) — v1.3
- ✓ Footer secondary navigation mirroring header — v1.3
- ✓ Zero axe-core accessibility violations across all pages — v1.3
- ✓ 100% Lighthouse scores (Performance, Accessibility, Best Practices, SEO) — v1.3

### Active

*v1.4 Design Overhaul scope:*

- [ ] Design system .pen file with reusable components factored from Crito reference
- [ ] New visual brand tokens (palette, typography, spacing) replacing neobrutalist OKLCH system
- [ ] New code component library (built alongside v1.3 in a separate namespace)
- [ ] Homepage refactored to new design (Hero, Services, Process, Technology, About, Contact sections)
- [ ] Projects index + project detail pages refactored
- [ ] Blog index + post layout + tag pages refactored
- [ ] FAQ page refactored
- [ ] Contact + /thank-you pages refactored (form behavior preserved)
- [ ] /design-system reference page rebuilt to document the new library
- [ ] 404 page refactored
- [ ] v1.3 design system components deleted after migration completes
- [ ] WCAG 2.2 AA validated across all refactored pages (zero axe-core violations)
- [ ] Lighthouse 90+ across all categories maintained

*Future enhancements (carry-over candidates for v1.5+):*

- [ ] Testimonials section with client quotes
- [ ] Newsletter signup integration
- [ ] Real project screenshots (replace placeholders)
- [ ] Dark mode for the new design (deferred from v1.4)

### Out of Scope

- Booking/calendar integration — contact form sufficient
- Pricing information — custom work requires conversation
- CMS backend — Joel can edit code directly
- Dark mode redesign in v1.4 — deferred to a later milestone; light-mode only for this overhaul
- Changing form behavior or contact flow — only visual presentation reskinned in v1.4
- Editing copy or projects.json content — content carried over unchanged in v1.4
- Adopting Crito page set wholesale (View More, Information, Free Design Sample pages) — Joel's existing page architecture is retained
- Neobrutalist palette / isometric illustrations / Bricolage Grotesque + DM Sans / shadow-to-glow dark mode — explicitly being replaced by v1.4

## Context

- **Target audience:** Small businesses (non-technical decision makers) needing web apps, automation, or AI solutions
- **Primary goal:** Lead generation for freelance/consulting work
- **Differentiator:** Low-risk process with prototype before full commitment
- **Tech stack:** Astro 5.x, Tailwind CSS 4.x, MDX, TypeScript
- **Hosting:** GitHub Pages (static, free)
- **Current LOC:** 5,498 lines across 40+ source files
- **Design system:** Neobrutalism — yellow/turquoise/magenta OKLCH palette, isometric illustrations, shadow-to-glow dark mode

## Constraints

- **Hosting:** GitHub Pages — static-only, no server-side processing
- **Stack:** Astro/JAMstack — all pages pre-rendered at build time
- **Design:** Neobrutalism — yellow/turquoise/magenta palette, quirky headings, bold borders
- **Forms:** Formspree (50 submissions/month free tier)
- **Accessibility:** WCAG 2.2 AA compliant (validated by Playwright/axe-core)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static site over CMS | Joel can edit code; simpler hosting | ✓ Good — works well |
| Contact form over booking | Lower friction for initial contact | ✓ Good — simple UX |
| Astro + Tailwind v4 | Modern stack, fast builds, great DX | ✓ Good — 1.2s builds |
| MDX for blog | Rich content with code blocks | ✓ Good — Expressive Code works |
| Homepage About section | Single-page feel, no separate page | ✓ Good — removed nav link |
| Formspree for forms | No backend needed, free tier sufficient | — Pending config |
| OKLCH color system | Perceptually uniform, easy dark mode variants | ✓ Good — v1.1 |
| Shadow-to-glow dark mode | Futuristic feel, maintains hierarchy | ✓ Good — v1.1 |
| 3-layer button technique | Hardware-accelerated, 60 FPS on mobile | ✓ Good — v1.1 |
| Playwright + axe-core | Automated WCAG validation in CI | ✓ Good — v1.1 |
| Two-tier typography | Neobrutalist headings, readable body | ✓ Good — v1.1 |
| Native HTML accordion (FAQ) | Zero JS, built-in accessibility | ✓ Good — v1.1 |
| Outcome-focused hero badges | Trust signals with quantified metrics | ✓ Good — v1.2 |
| Isometric currentColor SVGs | Single SVG works with any color, <1KB each | ✓ Good — v1.2 |
| Dedicated FAQ page | SEO-friendly with JSON-LD, reduces footer weight | ✓ Good — v1.2 |
| @lucide/astro tree-shaking | 200KB+ bundle reduction vs lucide-static | ✓ Good — v1.2 |
| Design system reference page | Internal docs for components and tokens | ✓ Good — v1.3 |
| Component consistency migration | All pages use design system components | ✓ Good — v1.3 |
| 8-field lead qualification form | Better leads without overwhelming users | ✓ Good — v1.3 |
| n8n webhook over Formspree | More control, better automation options | ✓ Good — v1.3 |
| simple-icons-astro for social | Maintained brand icons, tree-shakeable | ✓ Good — v1.3 |
| 44x44px touch targets | WCAG 2.5.5 compliance for mobile | ✓ Good — v1.3 |

## Shipped: v1.3 Design System & Navigation Cleanup

**Delivered:** 2026-02-11

Consolidated design system into reference page, achieved 100% component consistency, streamlined navigation to 4 links, enhanced contact form for lead generation.

**Key accomplishments:**
- Design system reference page with component documentation and JSON API
- All pages using design system components (zero raw HTML forms/buttons)
- Zero axe-core accessibility violations
- 100% Lighthouse scores across all categories
- Enhanced 8-field contact form with n8n webhook integration
- Footer with Instagram/Substack social icons and secondary navigation

**Pending deployment tasks:**
- Configure PUBLIC_N8N_WEBHOOK_URL environment variable
- Update Calendly placeholder URL on /thank-you page
- Add real social profile URLs (Instagram, Substack)

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-14 after v1.4 milestone started*

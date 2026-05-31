# Joel Shinness Website

## What This Is

A lead-generation focused portfolio website for Joel Shinness targeting small business clients. The site communicates expertise in web apps, automation, and AI development through distinctive neobrutalist design with isometric illustrations, outcome-focused messaging, and clear calls to action.

**Current state:** v1.3 shipped. v1.4 Design Overhaul **abandoned** after both attempted foundation phases (23 and 24) were reverted — the .pen file's mostly-flat raster sections forced "best guesses" in code that came out generic and lost the design's vibe. v2.0 starts fresh by reconstructing the .pen file itself before any code work.

## Core Value

Small business owners can understand what Joel does, trust his process, and easily reach out to start a conversation.

## Current Milestone: v2.0 Prep Crito Design File

**Goal:** Transform the Crito `.pen` file from mostly-flat raster exports into a high-fidelity, fully factored design source — every page section recreated as editable Pencil components with proper tokens — so downstream code milestones can build pages that actually match the design vibe instead of guessing from flat images.

**Reference design:** `design/Consulting & Agency Website Template I Crito (Community).pen` (converted from Figma; most page sections are baked-in raster images rather than editable components).

**Target outcomes:**
- Audit of the current `.pen` file: catalogue every page section as flat-image vs. already-editable
- Each flat section recreated as editable Pencil components (typography styles, color tokens, spacing, layout structure visible and editable)
- Token foundation defined inside the `.pen` (colors, typography, spacing, radii) and consumed by the recreated components
- Original Crito source consulted as ground truth to fill in details the flattened exports don't reveal
- Spot-check validation that recreated sections match the original visual fidelity

**Key context:**
- v1.4 Design Overhaul abandoned: phases 23 (v2 token system + BaseLayoutV2 + v2 layout components) and 24 (v2 primitive library + design-system page) both reverted on 2026-05-31 because the implementations drifted from the intended design — root cause was the flat-image .pen forcing "best-guess" interpretations
- "Jurassic Park" framing: reconstruct from incomplete DNA, using whatever is editable plus the original design as reference
- v2.0 is Pencil-MCP-centric — minimal code changes; code-side migration is a future milestone built on top of this reconstructed `.pen`
- Phase numbering continues from v1.3 → starts at **Phase 23** (v1.4 phase numbers are free since nothing shipped)
- Dark mode still deferred — out of scope for v2.0 as well

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

*Attempted in v1.4 (abandoned, all reverted 2026-05-31):*

- ✗ Phase 23 (Design System Foundation) — v2 tokens, BaseLayoutV2, v2 Header/Footer/MobileNav, design-system.pen seed, font packages. Reverted.
- ✗ Phase 24 (v2 Primitive Library) — Button/Card/Input/Badge primitives, design-system page rebuild. Reverted.
- *Root cause:* flat-image .pen forced best-guess code interpretations that didn't capture the design vibe. v2.0 fixes the .pen first.

### Active

*v2.0 Prep Crito Design File scope (Phase 23 onward):*

- [ ] Inventory the Crito `.pen` — every page section catalogued as flat-image vs. editable
- [ ] Reusable token foundation defined inside the `.pen` (colors, typography, spacing, radii)
- [ ] Flat homepage sections recreated as editable Pencil components
- [ ] Flat secondary-page sections (Service, About, Project, FAQ, Blog, etc.) recreated as editable components
- [ ] Component library factored in the `.pen` — shared primitives (buttons, cards, inputs) usable across page frames
- [ ] Spot-check validation that reconstructed sections match original visual fidelity (side-by-side with the Figma original)

*Deferred to future code milestones (will build on v2.0 .pen):*

- [ ] v2 code component library (code-side primitives)
- [ ] Page migrations (Homepage, Projects, Blog, FAQ, Contact, Thank-you, Design system, 404)
- [ ] WCAG 2.2 AA validation across refactored pages
- [ ] Lighthouse 90+ thresholds maintained

*Future enhancements (carry-over candidates):*

- [ ] Testimonials section with client quotes
- [ ] Newsletter signup integration
- [ ] Real project screenshots (replace placeholders)
- [ ] Dark mode for the new design

### Out of Scope

- Booking/calendar integration — contact form sufficient
- Pricing information — custom work requires conversation
- CMS backend — Joel can edit code directly
- Code changes in v2.0 — this milestone is `.pen`-file-only; code-side migration is a future milestone built on top of v2.0
- Dark mode — still deferred (was deferred in v1.4; remains out of scope for v2.0)
- Changing form behavior or contact flow — code-side behavior untouched in v2.0
- Editing copy or projects.json content — content untouched in v2.0
- Adopting Crito page set wholesale (View More, Information, Free Design Sample pages) — Joel's existing page architecture is retained
- Neobrutalist palette / isometric illustrations / Bricolage Grotesque + DM Sans / shadow-to-glow dark mode — still planned to be replaced when code milestones run on top of v2.0

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
*Last updated: 2026-05-31 — v1.4 abandoned (phases 23 + 24 reverted), v2.0 "Prep Crito Design File" started*

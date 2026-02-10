# Joel Shinness Website

## What This Is

A lead-generation focused portfolio website for Joel Shinness targeting small business clients. The site communicates expertise in web apps, automation, and AI development through distinctive neobrutalist design, narrative storytelling, and clear calls to action.

**Current state:** v1.1 shipped. Neobrutalist design complete with WCAG 2.2 AA accessibility compliance.

## Core Value

Small business owners can understand what Joel does, trust his process, and easily reach out to start a conversation.

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
- ✓ FAQ relocated to footer accordion — v1.1
- ✓ WCAG 2.2 AA accessibility compliance (98.7% manual audit) — v1.1

### Active

*v1.2 Enhancements (planned):*

- [ ] Isometric shadows (45° angles) for advanced depth effect
- [ ] Cyclical process diagram (visual, not just text)
- [ ] Testimonials section with client quotes
- [ ] Newsletter signup integration

### Out of Scope

- Booking/calendar integration — contact form sufficient
- Pricing information — custom work requires conversation
- CMS backend — Joel can edit code directly
- Individual blog post redesign — two-tier typography works well
- Color block sections — asymmetric layouts preferred

## Context

- **Target audience:** Small businesses (non-technical decision makers) needing web apps, automation, or AI solutions
- **Primary goal:** Lead generation for freelance/consulting work
- **Differentiator:** Low-risk process with prototype before full commitment
- **Tech stack:** Astro 5.x, Tailwind CSS 4.x, MDX, TypeScript
- **Hosting:** GitHub Pages (static, free)
- **Current LOC:** 3,139 lines across 37 source files
- **Design system:** Neobrutalism — yellow/turquoise/magenta palette, 3/10 density, quirky headings, bold borders

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

---
*Last updated: 2026-02-10 after v1.1 milestone*

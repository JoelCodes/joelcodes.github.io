# Joel Shinness Website

## What This Is

A lead-generation focused portfolio website for Joel Shinness targeting small business clients. The site communicates expertise in web apps, automation, and AI development through clear positioning, case study showcase, and blog content.

**Current state:** v1.0 shipped. Live at GitHub Pages (pending deployment).

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
- ✓ B&W photography with yellow/teal accents — v1.0
- ✓ SEO meta tags and JSON-LD structured data — v1.0
- ✓ Lighthouse 90+ performance — v1.0 (achieved 92)

### Active

(None — define in next milestone)

### Out of Scope

- Booking/calendar integration — contact form sufficient
- Pricing information — custom work requires conversation
- CMS backend — Joel can edit code directly
- Testimonials section — deferred to v1.1 (need real client quotes)
- Newsletter signup — deferred to v1.1

## Context

- **Target audience:** Small businesses (non-technical decision makers) needing web apps, automation, or AI solutions
- **Primary goal:** Lead generation for freelance/consulting work
- **Differentiator:** Low-risk process with prototype before full commitment
- **Tech stack:** Astro 5.x, Tailwind CSS 4.x, MDX, TypeScript
- **Hosting:** GitHub Pages (static, free)
- **Current LOC:** 2,052 lines across 24 source files

## Constraints

- **Hosting:** GitHub Pages — static-only, no server-side processing
- **Stack:** Astro/JAMstack — all pages pre-rendered at build time
- **Design:** B&W photography + yellow/teal accents + Poppins/Inter typography
- **Forms:** Formspree (50 submissions/month free tier)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static site over CMS | Joel can edit code; simpler hosting | ✓ Good — works well |
| Contact form over booking | Lower friction for initial contact | ✓ Good — simple UX |
| Start with 1 portfolio project | Ship faster, add more later | ✓ Good — can expand |
| Astro + Tailwind v4 | Modern stack, fast builds, great DX | ✓ Good — 1.2s builds |
| MDX for blog | Rich content with code blocks | ✓ Good — Expressive Code works |
| Homepage About section | Single-page feel, no separate page | ✓ Good — removed nav link |
| Formspree for forms | No backend needed, free tier sufficient | — Pending config |

---
*Last updated: 2026-01-27 after v1.0 milestone*

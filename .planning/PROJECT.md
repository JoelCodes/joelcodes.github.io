# Joel Shinness Website

## What This Is

A lead-generation consulting site for **Joel Shinness Solutions** — web development, automations, and AI for small businesses in Abbotsford, Vancouver, and the Fraser Valley (plus remote). The site follows the "On your wavelength" brand: calm sea-cool palette, Fraunces + Hanken Grotesk typography, wave/frequency motif, and a Landing / Showcase / Book-a-call structure aimed at non-technical SMB owners.

**Current state:** v3.0 rebuild starting. The site currently renders the v1.3 neobrutalist design; v3.0 replaces it in place with the new Figma brand. v2.0 (Crito `.pen` reconstruction) was completed but abandoned unconsumed — direction changed.

## Core Value

Small business owners can understand what Joel does, trust his process, and easily reach out to start a conversation.

## Current Milestone: v3.0 Wavelength Rebrand

**Goal:** Rebuild the site in place to the "Joel Shinness Solutions" Figma brand exploration — new tokens, components, and pages — replacing the neobrutalist design entirely while keeping the Astro/Tailwind infrastructure, CI, SEO plumbing, and blog content.

**Design source of truth:** Figma file "Joel Shinness Solutions — Brand Exploration" (`1tg8wIPcvOVC5tPZ8pkGO2`):
- **Palette (fixed):** Ink `#12333B`, Sub `#35525A`, Accent `#0E7078`, Accent soft `#5AA9A5`, Sea glass `#E6F1F1`, Sea glass deep `#D2E7E7`, Paper `#F6FBFA`, Line `#0E7078 @16%`
- **Type (fixed):** Fraunces (headings/brand/numbers, italic accents), Hanken Grotesk (body/UI/labels) — 13-style type ramp specced on the Components page
- **Mark:** Waveform mark (stacked wave strokes) + "Joel Shinness Solutions" wordmark in Fraunces
- **Components page (`36:5`):** CTA Button (Solid/Ghost/Ghost-on-dark/Small), Eyebrow, Tag, Service Card, Step, Project Card (closed/expanded), Site Header + Footer (desktop/mobile), FAQ Item, Callout, Link Card, Breadcrumb
- **Page mockups:** Landing (`12:2`, 4 breakpoints: 390/768/1440/1920 + dark mode `117:103`), Showcase (`12:3`, 4 breakpoints, closed+expanded card states), Service Web (`85:103`, desktop), Area Abbotsford (`85:104`, desktop)

**Target features:**
- Design tokens, self-hosted fonts, and light + dark themes from the Figma spec
- Component library matching the Figma Components page
- Landing page at all four breakpoints with `#services` / `#about` anchor sections
- Showcase page with client work + craft/experiments project cards (expandable)
- Service Web and Area Abbotsford pages built but dev-hidden (not linked/indexed in production yet)
- Blog restyled to the new brand, dev-only until it returns (excluded from prod builds and sitemap — Phase 34 decision)
- Crito/neobrutalist artifact cleanup (components, design-system pages, illustrations, CLAUDE.md)

## Requirements

### Validated

*The v1.x requirement history is preserved in `.planning/milestones/` archives. What carries forward as validated infrastructure:*

- ✓ Astro 5 + Tailwind 4 static site on GitHub Pages with CI/CD — v1.0
- ✓ Blog platform with MDX, tag filtering, syntax highlighting — v1.0
- ✓ SEO meta tags, JSON-LD, sitemap, robots.txt — v1.0
- ✓ Playwright + axe-core accessibility testing in CI — v1.1
- ✓ Lighthouse CI thresholds (90+ all categories) — v1.0-v1.3
- ✓ n8n webhook contact form flow — v1.3 (webhook URL still unconfigured)
- ✓ Sea-cool token foundation (light + dark) in Tailwind 4 `@theme` — v3.0 Phase 33 (dark values from Figma variable mode; one FIDELITY-GAP: sea-glass-deep keeps light value in dark)
- ✓ Fraunces + Hanken Grotesk self-hosted fonts — v3.0 Phase 33 (fontsource-variable + Fontaine fallback metrics, 13-style `.wl-*` type ramp, WCAG AA contrast gate script, waveform mark/favicon/OG assets)
- ✓ Wavelength chrome site-wide — v3.0 Phase 34 (SiteHeader/SiteFooter per Figma with circle-badge mark on dark, zero client JS, system-only FOUC-safe dark mode, blog gated out of prod, /faq → / redirect, fidelity gate approved 2026-07-15; validates CHROME-01..04)
- ✓ UI primitive library — v3.0 Phase 35 (8 components in `src/components/wl/`: CTAButton ×4 variants + calendar/mail icons, Eyebrow, Tag, Callout, LinkCard, Breadcrumb, Step, ServiceCard; Figma-extracted values, D-10 non-flippable on-dark literals, `--wl-card-*` dark panel tokens, SiteHeader CTA retrofit; fidelity gate approved 2026-07-15, code review fixed 11 findings, verification 12/12; validates COMP-01..02)

### Active

*v3.0 scope — detailed in `.planning/REQUIREMENTS.md` once defined:*

- [x] Component library per Figma Components page — primitives done (Phase 35); interactive pieces (Project Card, FAQ, wave bg) in Phase 36
- [ ] Landing page (responsive, all 4 Figma breakpoints, dark mode)
- [ ] Showcase page (responsive, expandable project cards)
- [ ] Service Web + Area Abbotsford pages (dev-hidden)
- [ ] Nav/IA: Services (anchor) / Showcase / About (anchor) / Book a call (Calendly placeholder)
- [ ] Blog restyled (dev-only in prod as of Phase 34; Phase 38 restyles against dev builds)
- [ ] Legacy design cleanup + CLAUDE.md update

### Out of Scope

- Real Calendly URL — placeholder `BOOKING_URL` constant until Joel supplies it
- Publishing Service Web / Area Abbotsford — built dev-only this milestone
- New blog content — content untouched, only restyled
- CMS backend — Joel edits code directly
- Crito design system — abandoned with v2.0; `design/Crito.pen` and its branch are archives

## Context

- **Target audience:** Small businesses (non-technical decision makers) needing websites, custom web apps, automations, or AI
- **Positioning:** "On your wavelength" — local (Abbotsford/Fraser Valley), plain-language, musician/wave identity
- **Primary goal:** Lead generation → discovery call bookings
- **Tech stack:** Astro 5.x, Tailwind CSS 4.x, MDX, TypeScript (unchanged)
- **Hosting:** GitHub Pages (static, free)
- **Copy:** Real copy exists in the Figma mockups — use it verbatim, don't invent
- **v2.0 archive:** complete Crito reconstruction on unmerged branch `feature/phase-32-fidelity-sweep-handoff`

## Constraints

- **Hosting:** GitHub Pages — static-only, no server-side processing
- **Design:** The Figma file is the single source of truth — gaps get flagged, not filled with invented style (v1.4 lesson)
- **Fonts:** Fraunces + Hanken Grotesk must be self-hosted (performance + GDPR)
- **Accessibility:** WCAG 2.2 AA (Playwright/axe-core validated)
- **Performance:** Lighthouse 90+ all categories maintained through the rebuild
- **Blog URLs:** REVERSED in Phase 34 (Joel's explicit call) — blog pages are excluded from prod builds while dev-only; `/blog/*` 404s in prod and posts left the sitemap. SEO value knowingly sacrificed until the blog returns.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static site over CMS | Joel can edit code; simpler hosting | ✓ Good |
| Astro + Tailwind v4 | Modern stack, fast builds, great DX | ✓ Good |
| MDX for blog | Rich content with code blocks | ✓ Good |
| Abandon Crito direction (v2.0) | New Figma brand supersedes it; work archived on branch | — 2026-07-14 |
| Rebuild in place (not fresh scaffold) | Infra (CI, SEO, blog wiring) isn't design-flavored; keep it | — Pending |
| v3.0 from Figma via MCP | Live design source with real tokens/copy beats raster interpretation (v1.4/v2.0 lesson) | — Pending |
| Blog fully dev-only (link + pages out of prod) | Joel reversed "URLs stable" in Phase 34 discussion; one coherent dev-only gate | ✓ Shipped in 34 |
| contact@joelshinness.com site-wide | Figma copy shipped verbatim; Joel sets up the alias before launch (amends Phase 37's me@ criterion) | — 2026-07-15 |
| No theme toggle in v3.0 chrome | Figma specs none; site follows prefers-color-scheme; toggle deferred (design in Figma first) | ✓ Shipped in 34 |
| Service/Area pages dev-hidden | Fully designed, but Joel wants them unpublished for now | — Pending |
| Calendly placeholder constant | Real URL not yet chosen; single `BOOKING_URL` to swap later | — Pending |
| Dark mode from Figma dark mockup | Landing dark variant exists (`117:103`); system-only (toggle deferred per Phase 34) | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

---
*Last updated: 2026-07-16 — Phase 35 (UI Primitives) complete*

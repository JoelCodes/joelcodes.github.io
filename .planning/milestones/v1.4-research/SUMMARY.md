# Project Research Summary

**Project:** Joel Shinness Website — v1.4 Design Overhaul
**Domain:** Static lead-gen portfolio — full visual redesign via parallel component library migration
**Researched:** 2026-05-14
**Confidence:** HIGH (stack verified against official docs; architecture grounded in codebase inspection; pitfalls verified against actual code)

## Executive Summary

The v1.4 overhaul replaces the neobrutalist visual language (yellow/turquoise/magenta OKLCH, Bricolage Grotesque, isometric illustrations, shadow-to-glow dark mode) with the Crito agency template's aesthetic — clean typography, generous whitespace, editorial photography, and a neutral-toned professional palette. The migration is executed via a parallel component library strategy: a new `src/components/v2/` tree and `src/styles/v2.css` token file are built alongside the untouched v1.3 system, pages are flipped one at a time onto `BaseLayoutV2`, and v1.3 is deleted as a final cleanup commit. All four research streams independently confirm that the Design System Foundation phase (Phase 23) is the mandatory gating dependency — tokens, `BaseLayoutV2`, and the v2 primitive library must all exist before a single page can migrate, because every subsequent phase depends on them.

The recommended approach uses no new framework dependencies: `@fontsource-variable/*` for self-hosted fonts (GDPR-safe, no CDN round-trip), Astro's native `<Image>` component for responsive photography (stable since 5.10), CSS-only scroll animations via Intersection Observer (zero JS weight), and Tailwind v4's `@theme` with a separate `v2.css` file to isolate token namespaces during transition. Critically, the exact Crito font names and exact palette values are MEDIUM confidence until the Pencil MCP inspects the `.pen` file in Phase 23 — the plan-phase must not pre-commit specific `@fontsource-variable/*` package names or OKLCH values before that inspection occurs.

The Crito reference is a team-agency template and roughly one-third of its sections are wrong for a solo consultant. Features to adopt: split hero with portrait, services grid, stats strip, why-choose-us bullets, case study cards, numbered process grid, 2-column contact layout, clean nav. Features to omit: team members section, multi-homepage variants, utility bar (phone/email strip above nav), 4-column footer, newsletter bar above footer, multi-section blog grouping, and any stock photography. The biggest credibility risk is using placeholder or template content for a site where the personal relationship is the product.

## Key Findings

### Recommended Stack

The base stack (Astro 5.16, Tailwind CSS 4.1, MDX, TypeScript strict, Playwright + axe-core) is locked and needs no changes. The v1.4 additions are minimal: `@fontsource-variable/*` packages for self-hosted variable fonts (install after Phase 23 Pencil inspection confirms font names), and no other new packages. The Astro experimental Fonts API is explicitly not recommended — it only reached stable in Astro 6.0, which requires a Node 22 + Vite 7 upgrade that is too risky for a 100% Lighthouse site. Motion, GSAP, and AOS are all ruled out on the same grounds (18–39kb JS weight against the Lighthouse performance budget). The entire animation strategy is CSS-first: `@keyframes`, `@starting-style`, and Intersection Observer with class toggles.

**Core technologies for v1.4:**
- `@fontsource-variable/*` (exact packages TBD in Phase 23): self-hosted variable fonts — zero CDN round-trip, GDPR-safe, version-locked
- `astro:assets` `<Image layout="full-width" priority>`: hero/project photography — Astro 5.10+ stable, generates responsive srcsets + WebP automatically; no new package needed
- Tailwind v4 `@theme` with `src/styles/v2.css`: parallel token namespace — clean isolation from v1 tokens; delete file on cleanup
- CSS `@starting-style` + Intersection Observer: scroll-reveal animations — zero JS weight; browser-native
- `@view-transition { navigation: auto }`: page-to-page transitions — zero JS, ~85% browser support with graceful degradation

**Do NOT add:**
- Astro experimental Fonts API (`experimental.fonts`) — stable only in Astro 6.0; requires Node 22 upgrade
- Motion / GSAP / AOS — JS weight conflicts with Lighthouse performance budget
- `@astrojs/react` — adds React runtime to a zero-framework static site
- `@tailwindcss/typography` — generates opinionated defaults that conflict with agency aesthetics

### Expected Features

**Crito patterns to ADOPT (direct mapping to Joel's context):**

| Section | Crito Pattern | Joel Adaptation |
|---------|--------------|-----------------|
| Hero | Split layout: headline + dual CTA left, portrait right | Joel's photo (selfie.jpg); "15+ years" trust stat below CTAs |
| Social proof zone | Client logo strip below hero | Outcome stats strip (15+ years / 200+ students / 3 domains) — Joel cannot show client logos |
| Services | 4-card grid with category label, title, description, arrow | 3 cards (AI, Automations, Web Apps) — no inflation to 8 |
| Process | Numbered 2x2 grid (4 steps) | Steps 1–4 in grid; Step 5 as standalone CTA-adjacent block |
| Why choose us | Headline + 4 bullets left, photo right | Extract from existing About copy (plain-language, listen-first, prototype approach) |
| Case studies | Tabbed filter + card grid | Existing filter JS + new ProjectCard v2 |
| Nav | Logo left, links center, CTA right | Keep 4 links (Blog, Projects, FAQ, Contact); CTA = "Let's Talk" |
| Contact | 2-column: form left, trust signals right | Preserve all hp-* IDs and n8n webhook; visual reskin only |
| Footer | 2–3 column | Keep 2 columns; skip newsletter bar |

**Must have (table stakes):**
- Single editorial headline with one primary CTA per section
- Hero split layout with Joel's portrait (personal trust for a solo consultant)
- Stats strip (15+ years / 200+ students) in social proof zone
- Named service cards with arrow affordance
- Numbered process steps with simple line icons (@lucide/astro already installed)
- Case study narrative: Problem → Solution → Results → Testimonial
- Metrics display on project results (large numbers, not neobrutalist bordered boxes)
- FAQ accordion with FAQPage JSON-LD preserved
- Sticky header; mobile hamburger; no dark mode toggle
- Clean 2-column footer (nav + social)

**Should have (competitive differentiators):**
- Why-choose-us section (new homepage section factored from existing About copy)
- Dedicated `/services` page for SEO (low effort; card component already needed for homepage)
- Project card hover showing result metric overlay
- Inline CTA strip at bottom of each case study ("Ready to solve a similar problem? Let's talk →")
- Right sidebar on blog posts with related posts (static, from content collections)
- Share links (LinkedIn + copy-URL) on blog posts

**Defer to v1.5+:**
- `/about` page (homepage About section sufficient; adds scope to already-large v1.4)
- Newsletter signup bar (no newsletter configured; false promise if shipped without backend)
- Dark mode (explicitly deferred per PROJECT.md)
- Testimonials section (no client quote data currently in projects.json)
- Blog section grouping (Latest / Featured / Popular) — requires editorial decisions not in scope

**Crito patterns to EXPLICITLY OMIT:**
- Team members section — Joel is solo; fabricated team grid is dishonest
- Utility bar above nav (phone/email/hours) — team-agency signal, wrong for solo consultant
- 4-column footer — sized for an agency; 2-column is correctly sized for Joel
- Newsletter bar above footer — deferred; no newsletter configured
- 8-cell services catalog — Joel has 3 services; 8 implies capabilities he doesn't offer
- Auto-rotating testimonial carousel — dark pattern; WCAG 1.4.13 risk
- Stock photography — destroys trust for a solo consultant; personal relationship is the product
- Multi-CTA clusters (3+ buttons per section) — decision fatigue; one primary CTA per section
- Over-animated hero (5+ staggered entrance animations) — Crito-style clean entrance means ≤1 hero animation, ≤400ms

### Architecture Approach

The migration uses a Dual Layout Shell pattern throughout v1.4: `BaseLayout.astro` (v1) and `BaseLayoutV2.astro` (v2) are separate files; each page imports exactly one; the CSS file, Header, and Footer are all determined by which layout the page uses. New code lives in `src/components/v2/{layout,ui,sections}/` and new tokens in `src/styles/v2.css` with a separate `@theme` block. The two token systems never share a file during transition; v2 uses semantic token names (`--color-primary`, `--color-surface`) that deliberately differ from v1's descriptive names (`--color-yellow`, `--color-turquoise`) to prevent silent cross-contamination. Pages migrate in order from simplest to most complex; Header and Footer migrate as part of `BaseLayoutV2` in Phase 23 and are never visible in a partially-migrated state.

**Major components:**
1. `BaseLayoutV2.astro` + `src/styles/v2.css` — gating foundation; every migrated page depends on this
2. `src/components/v2/layout/` (HeaderV2, FooterV2) — global shell, ships with `BaseLayoutV2` in Phase 23
3. `src/components/v2/ui/` (Button, Card, Input, Badge) — primitive library; built before page migrations begin
4. `src/components/v2/sections/` (Hero, Services, Process, Stats, WhyChooseUs, About, ContactSection) — page sections; assembled per-page during migration phases
5. `design/design-system.pen` — canonical source of truth for tokens and component specs; referenced by all v2 component builds

**Page migration order (leaf pages first, homepage last):**
/design-system → /faq → /thank-you → /blog/[slug] → /blog/index → /blog/tags/[tag] → /projects/[slug] → /projects/index → /404 → Homepage → cleanup

### Critical Pitfalls

1. **`@theme` token collision between v1 and v2** — if any v1 token name is reused in `v2.css` with a new value, every unmigrated page silently picks up the wrong value. Use a separate `src/styles/v2.css` file (never add v2 tokens to `global.css`) and use semantic names that do not overlap with v1's descriptive names. Delete `global.css` only after the last page migrates.

2. **Dark mode dead code corrupting v2 pages for OS-dark users** — the existing dark mode FOUC-prevention script in `BaseLayout.astro` runs before body render and applies `.dark` to `<html>`. OS-dark users (~30%) will get v1 dark styles applied on v2 pages on first paint. In Phase 23, explicitly remove the `localStorage.theme` script from `BaseLayoutV2`, remove `#theme-toggle` from HeaderV2, and omit `@custom-variant dark` from `v2.css`.

3. **Contact form broken by ID rename** — `ContactSection.astro` submit handler queries DOM elements by hardcoded IDs (`hp-name`, `hp-email`, `hp-form-error`, etc.). If the v2 version changes the `hp-*` prefix, all JS references silently return `null` (TypeScript `as` casts hide the null) and the form stops validating or submitting. Keep `hp-*` IDs unchanged in v2 ContactSection, or update JS and IDs in a single atomic commit with a Playwright e2e test verifying submission → `/thank-you` redirect.

4. **Crito token names unknown until Phase 23 Pencil inspection** — exact font names and OKLCH palette values in the `.pen` file are MEDIUM confidence. If plan-phase pre-commits to specific `@fontsource-variable/*` packages, a wrong bet wastes a phase task. Phase 23 must begin with a Pencil MCP inspection step that extracts variable values before any package is installed or any OKLCH values are written to `v2.css`.

5. **SEO JSON-LD dropped during page template rewrites** — `FAQPage` JSON-LD is injected via `<slot name="head">` on the FAQ page; blog posts may have `Article` schema. Crito structure has no equivalent; these slots are silently absent unless explicitly checked. Per-page SEO audit (`<head>` slot inventory) is part of the definition of done for every migration phase.

6. **LCP regression from lazy-loaded hero image** — `astro:assets` `<Image>` defaults to `loading="lazy"`, correct for below-fold images but wrong for the hero portrait (the LCP element). Hero image must have `loading="eager"` and `fetchpriority="high"` explicitly. Add `<link rel="preload" as="image">` in `<head>` for the homepage hero.

7. **Scope creep in page migrations** — each open page invites additions. Every page migration phase has exactly one job: swap visual presentation to v2 components; carry content and behavior unchanged. Enhancements go on the v1.5 parking lot.

## Implications for Roadmap

### Phase 23: Design System Foundation
**Rationale:** Gating dependency confirmed independently by STACK, ARCHITECTURE, and PITFALLS research. Zero v2 pages can be built before this exists. The riskiest phase because exact Crito tokens are MEDIUM confidence until `.pen` inspection.
**Delivers:** `design/design-system.pen` with extracted token variables; `src/styles/v2.css` with verified OKLCH values and font family declarations; `@fontsource-variable/*` packages installed (post-inspection); `src/components/v2/layout/` (HeaderV2, FooterV2); `BaseLayoutV2.astro`; dark mode infrastructure removed from v2 path; token mapping table (Pencil variable → CSS custom property)
**Must include:** Pencil MCP inspection of the Crito `.pen` file to extract exact font names and color values BEFORE writing `v2.css` or installing font packages
**Avoids:** Token collision (separate file), dark mode FOUC on v2 pages (script removed in this phase), color contrast regression (contrast checked at token definition time, not after component build), Pencil-to-code name drift (mapping table established here)
**Research flag:** NEEDS Pencil MCP inspection — exact Crito tokens (fonts, palette) are MEDIUM confidence until the `.pen` file is read; do not pre-commit font package names in phase plan

### Phase 24: v2 Primitive Library + Design System Page
**Rationale:** Pages cannot migrate until the components they'll use exist. Building and immediately documenting them on a rebuilt `/design-system` page creates a live integration test and visual reference for all subsequent phases.
**Delivers:** `src/components/v2/ui/` (Button, Card, Input, Badge); `src/components/v2/sections/` skeleton components; rebuilt `/design-system` page on `BaseLayoutV2`; updated `design-system.json.ts` endpoint with v2 token values; Playwright keyboard + axe-core tests for every v2 interactive element
**Avoids:** Focus state loss (each interactive component tested in isolation before page use), animation library TBT risk (CSS-only animation strategy locked in here), scoped style collisions (`is:global` banned in v2 components), `/design-system` showing v1 components while pages use v2
**Research flag:** Standard patterns — well-documented Tailwind v4 component authoring; no additional research needed

### Phase 25: Leaf Page Migrations (FAQ, Thank-You, 404)
**Rationale:** Simplest pages first validates the dual-layout strategy on low-risk targets before touching complex pages. `/faq` is the most verification-dense (FAQPage JSON-LD, accordion, focus states); `/thank-you` is the shortest page on the site; `/404` is isolated.
**Delivers:** `/faq`, `/thank-you`, `/404` on `BaseLayoutV2`; FAQPage JSON-LD confirmed preserved; CTA block added to bottom of FAQ
**Avoids:** SEO JSON-LD dropped (explicit head-slot audit), scope creep (FAQ content and accordion JS unchanged)
**Research flag:** Standard patterns

### Phase 26: Blog Migration (Post Layout → Index → Tag Pages)
**Rationale:** Blog has the most prose-specific complexity (`.prose` wrapper class, Expressive Code code blocks, sticky TOC) that must be verified on a real post before the index/tag pages are touched.
**Delivers:** Blog `[slug].astro` on `BaseLayoutV2`; blog index + tag pages migrated; `.prose` wrapper class preserved in v2 post layout; Expressive Code code blocks rendering correctly; sticky TOC working; right sidebar with related posts; share links; `featured` boolean added to content schema
**Avoids:** Expressive Code + prose class lost (explicit visual verification pass: h2, blockquote, inline code, code block, TOC), CLS from blog post inline images (width/height on all MDX img elements)
**Research flag:** Standard patterns; TOC sticky behavior requires ancestor overflow audit during implementation

### Phase 27: Projects Migration (Detail → Index)
**Rationale:** Project detail migrates first (single template, heaviest static data). Index migrates second because it reuses the ProjectCard component proven on the detail page.
**Delivers:** `/projects/[slug]` on `BaseLayoutV2` (stat-card strip for results, testimonial repositioned above results, inline CTA strip at bottom); `/projects/index` on `BaseLayoutV2`; project card hover showing result metric; `featured` field added to `projects.json`
**Avoids:** LCP regression (project hero images get `fetchpriority="high"`), scope creep (no new screenshots or copy — content unchanged per PROJECT.md)
**Research flag:** Standard patterns

### Phase 28: Contact Reskin
**Rationale:** Contact form is the highest-risk page for functional regression (n8n webhook, `hp-*` DOM IDs, Playwright e2e test). Isolated phase with mandatory end-to-end test before merge.
**Delivers:** `ContactSection.astro` on `BaseLayoutV2`; 2-column layout (form left, trust signals right); trust micro-copy near submit; `PUBLIC_N8N_WEBHOOK_URL` env var verified in GitHub Actions
**Avoids:** Contact form broken by ID rename (hp-* IDs unchanged or updated atomically with JS), n8n webhook env var missing from CI build
**Research flag:** Standard patterns; e2e form submission test is a mandatory merge gate

### Phase 29: Homepage Migration
**Rationale:** Homepage last — most sections (Hero, Stats, Services, Process, Why-Choose-Us, About, Contact), highest business risk, depends on every v2 section component. By Phase 29, every component pattern is battle-tested.
**Delivers:** Homepage on `BaseLayoutV2`; full Crito-adapted section set; hero portrait with `fetchpriority="high"` and `<link rel="preload">`; stats strip; services 3-card grid; numbered process grid; why-choose-us section (bullets from existing About copy); bento-grid hero removed
**Must omit:** Team members section, utility bar above nav, newsletter bar above footer, multi-CTA clusters, over-animated hero entrance
**Avoids:** LCP regression (hero preloaded), scope creep (no new content — PROJECT.md explicitly defers copy changes)
**Research flag:** Hero portrait asset (selfie.jpg) must be confirmed available; hero layout choice (portrait-in-hero vs photo-in-About-only) needs a requirements decision before this phase is planned in detail

### Phase 30: v1 Component Cleanup + Final QA
**Rationale:** All pages migrated. This is the single deletion commit that removes v1 dead code with zero risk of breaking live pages.
**Delivers:** `src/components/ui/` deleted; `src/components/layout/` deleted; `global.css` deleted; `BaseLayout.astro` deleted; `v2.css` renamed to `global.css`; all Playwright test selectors updated to ARIA roles (no remaining `#theme-toggle`, `.btn-turquoise`, or `hp-*` selectors); CLAUDE.md updated to reflect new design system
**Avoids:** Playwright test selector rot (all selectors audited here), dead code confusion in future maintenance
**Research flag:** Standard patterns; deletion-only phase

### Phase Ordering Rationale

- Phase 23 before all others: `BaseLayoutV2` and `v2.css` are required by every subsequent phase
- Phase 24 before any page migration: pages cannot be assembled without v2 components to use
- Leaf pages (25) before blog (26) before projects (27) before homepage (29): complexity and business risk increase in that order; each phase proves patterns used by the next
- Contact (28) isolated from homepage: form has unique e2e testing requirements that deserve a dedicated phase, not bundled into homepage migration
- Homepage (29) after all other pages: highest risk, maximum component reuse, last to migrate
- Cleanup (30) after homepage: final deletion of v1 dead code once all pages are confirmed on v2

### Research Flags

Phases needing deeper research or external inspection during planning:
- **Phase 23:** Pencil MCP inspection of `design/Consulting & Agency Website Template I Crito (Community).pen` is required before writing `v2.css`. Font names and exact palette values are MEDIUM confidence until inspection. Do not name specific `@fontsource-variable/*` packages in the phase plan; phrase the task as "inspect `.pen` file, confirm fonts, then install."

Phases with standard patterns (skip additional research):
- **Phases 24–30:** All use well-documented Astro 5 / Tailwind v4 patterns; architecture is grounded in the existing codebase; no novel integrations required

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All claims verified against official Astro 5 / Tailwind v4 docs, npm registry, motion.dev as of 2026-05-14 |
| Features | HIGH | Crito template directly inspected via design/images exports; solo-consultant context grounded in multiple industry sources |
| Architecture | HIGH | Based on direct codebase inspection — actual file paths, component names, CSS token names, DOM IDs all verified |
| Pitfalls | HIGH | Each pitfall cites a specific file, class name, or DOM ID in the actual codebase; failure modes are concrete |
| Crito exact tokens | MEDIUM | Font family names and OKLCH palette values are inferred from template category; confirmed only after Phase 23 Pencil MCP inspection |

**Overall confidence:** HIGH, with one bounded MEDIUM-confidence gap (Crito token values) that is explicitly addressed as the first task of Phase 23.

### Gaps to Address

- **Exact Crito font names** (MEDIUM): Likely Plus Jakarta Sans + Inter or DM Sans based on template category, but this is inference. Phase 23 must inspect the `.pen` file via Pencil MCP and confirm before any `@fontsource-variable/*` package is installed. Plan-phase should phrase the font task as "inspect `.pen` file and install confirmed fonts" rather than naming specific packages.

- **Exact Crito color palette** (MEDIUM): OKLCH values for primary, surface, and accent colors are unknown until `.pen` inspection. Phase 23 includes this as its first substantive task. All downstream component builds depend on it.

- **Hero layout decision** (open requirement): FEATURES.md flags the question of whether Joel's portrait appears in the hero or only in the About section — this significantly affects hero component structure. Needs a requirements decision before Phase 29 is planned in detail. Recommendation: portrait in hero (Crito pattern; solo consultant trust signal is strongest with face present from first scroll position).

- **Stats strip content** (open requirement): FEATURES.md suggests 15+ years / 200+ students / 3 domains, but asks whether project completion counts or time-saved metrics are available. This only affects copy, not structure; Phase 29 can proceed with placeholder and finalize during build.

- **`/services` page scope** (open requirement): FEATURES.md recommends adding `/services` as a new page in v1.4 (Low complexity; SEO value; card component already built for homepage). PROJECT.md does not mention it explicitly. Recommend treating as a stretch goal within Phase 27 — if card component is already built, the page itself is one day of work.

## Sources

### Primary (HIGH confidence)
- Official Astro docs (docs.astro.build) — Image/Picture component, layout prop, priority prop, stable in 5.10; Fonts API experimental in Astro 5.x, stable in 6.0 requiring Node 22 + Vite 7
- Astro 5.10 blog (astro.build/blog/astro-5100) — responsive images stable confirmation
- Astro 6.0 blog (astro.build/blog/astro-6) — Fonts API stable in 6.0, Node 22 required
- Zero-JS View Transitions blog (astro.build) — `@view-transition { navigation: auto }` pattern, browser support
- Tailwind v4 `@theme` docs (tailwindcss.com/docs/theme) — namespace conventions, `@theme inline`, migration patterns
- Fontsource install docs (fontsource.org/docs) — `@fontsource-variable/*` import pattern
- motion.dev — vanilla JS support confirmed; hybrid animate() = 18kb gzip
- Direct codebase inspection — `ContactSection.astro` (hp-* IDs verified), `global.css` (token names verified), `BaseLayout.astro` (dark mode FOUC script verified), `Button.astro` (focus ring technique verified), `content.config.ts`, `SEO.astro`, all Playwright test files

### Secondary (MEDIUM confidence)
- Crito template inspection (design/images/ exports, images 3–15) — page structures, section patterns, visual treatment
- logotio.com — solo consultant website trust elements
- melisaliberman.com — consulting website examples
- knapsackcreative.com — consulting About page research (second most visited page type)
- perfectafternoon.com — hero section best practices 2026
- kontra.agency — web design trends 2026
- revenuehero.io — form vs scheduler conversion research

### Tertiary (LOW confidence)
- pinelab.studio — LQIP/ThumbHash in Astro (single source; LQIP deferred from v1.4 anyway)

---
*Research completed: 2026-05-14*
*Ready for roadmap: yes*

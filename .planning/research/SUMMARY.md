# Project Research Summary

**Project:** v3.0 Wavelength Rebrand — Joel Shinness Solutions
**Domain:** Solo-consultant lead-generation site — full visual layer rebuild in place
**Researched:** 2026-07-14
**Confidence:** HIGH (stack, architecture, pitfalls grounded in repo read); MEDIUM (local SEO, blog-out-of-nav SEO tradeoffs)

---

## Executive Summary

The v3.0 Wavelength Rebrand is a full visual layer swap of an existing Astro 5 / Tailwind 4 static site. The core framework stack stays unchanged; the work is entirely in design tokens, typography, component replacement, information architecture, and page content. Figma file `1tg8wIPcvOVC5tPZ8pkGO2` is the authoritative source of truth for every color, spacing, type size, and component shape. The most important structural constraint is that this is a rebuild-in-place on a live site with Lighthouse CI gates (90+) and indexed URLs — neither the CI nor the URL structure can break at any phase boundary.

The recommended approach is a strict layered migration: tokens first, chrome second, primitives third, content components fourth, page assembly fifth, secondary pages sixth, and cleanup last. This order is non-negotiable because Tailwind 4's `@theme` is a global CSS custom property namespace with no scoping — a token change touches every page simultaneously. The research consensus across all four files is to introduce v3.0 tokens under a distinct namespace prefix (`--wl-`) and keep v1/v2 tokens intact until every component is migrated, then delete the old tokens in a dedicated cleanup phase. This is the single most important sequencing decision for the entire milestone.

The dominant project-level risk is design fidelity drift: the failure mode that killed v1.4 (abandoned 2026-05-31) and v2.0 (abandoned 2026-07-14). Every color, spacing value, and type size must be extracted from Figma variables, not eyeballed. A screenshot comparison gate (Figma frame vs. browser) must be a required checkpoint in every phase that produces visible UI — not optional review. Secondary risks are Fraunces variable font CLS at the 76px hero display size, dark-mode FOUC if the inline head script is moved during refactoring, and SEO breakage if redirects and sitemap filters are not in place before page routes are deleted.

---

## Key Findings

### Recommended Stack

The existing stack (Astro 5.16.x, Tailwind 4.1.x via `@tailwindcss/vite`, MDX, TypeScript strict, Playwright + axe-core) is unchanged and correct. The only npm additions for v3.0 are two font packages: `@fontsource-variable/fraunces` (^5.2.9) and `@fontsource-variable/hanken-grotesk` (^5.2.8). Everything else is CSS authoring changes.

The Astro experimental Fonts API is explicitly ruled out — it has active breaking changes as of 5.16.9 and confirmed user breakage on 5.17.x (GitHub issue #15515, opened 2026-02-14, unresolved). Self-hosted variable fonts via `@fontsource-variable` are strictly superior for a Lighthouse 90+ site. For accordion and expandable card interactions, native `<details>`/`<summary>` with CSS `::details-content` animation (Baseline Newly Available Sep 2025) is the correct choice — zero JavaScript, full keyboard and ARIA semantics for free.

**Core technologies:**
- **Astro 5 (unchanged):** Static SSG, file-based routing — no upgrade
- **Tailwind 4 via @tailwindcss/vite (unchanged):** `@theme` CSS-first token system; entire v1 token block replaced wholesale with `--wl-` prefixed v3.0 tokens in the final cleanup phase
- **@fontsource-variable/fraunces ^5.2.9:** Headings — variable with opsz, wght, SOFT, WONK, ital axes; import `wght.css` + `wght-italic.css` only (not `full.css`)
- **@fontsource-variable/hanken-grotesk ^5.2.8:** Body/UI — variable with wght axis (100-900)
- **Native `<details>`/`<summary>`:** Expandable project cards and FAQ accordion — zero JS, CSS `::details-content` for height animation
- **Playwright + axe-core (unchanged):** A11y CI; axe-core added to definition of done for Token Foundation phase, not a post-build audit

### Expected Features

The v3.0 scope is a lead-generation site for a non-technical SMB audience (web, automation, AI consulting in the Fraser Valley / remote market). Design source is Figma file `1tg8wIPcvOVC5tPZ8pkGO2`.

**Must have (table stakes for v3.0 launch):**
- Sea-glass token foundation + Fraunces / Hanken Grotesk fonts — everything depends on this
- Landing page — hero, services, process (5-step), about, contact; all 4 breakpoints (390/768/1440/1920); real Figma copy
- Calendly booking CTA (link, not embed) — single `BOOKING_URL` constant; placeholder until Joel supplies the real URL
- Expandable case study cards with ARIA — problem / what-I-built / result format; SEO content in DOM when collapsed
- Anchor nav with active state via IntersectionObserver — Services / Showcase / About / Book a call
- Showcase page — expandable project cards, Craft & Experiments section
- Blog restyled with new tokens; removed from nav; `/blog` + `/blog/[slug]` URLs preserved
- Dev-hidden pages (Service Web, Area Abbotsford) — built, noindex meta, excluded from sitemap
- Legacy component cleanup — neobrutalist components, design-system page, Crito artifacts removed
- Dark mode — apply new tokens to existing infrastructure; toggle behavior unchanged

**Should have (competitive differentiators):**
- Automations example table — concretely answers "what can automations do for me?" for non-technical visitors
- Agencies overflow-dev band — second audience segment without confusing the primary SMB audience
- LocalBusiness JSON-LD on Area Abbotsford page (hidden; schema in place for when published)
- Footer link to `/blog` and one contextual landing-body link (compensates for blog removed from nav)

**Defer to post-launch / v4+:**
- Real Calendly URL — swap `BOOKING_URL` when Joel configures it
- n8n webhook URL — `PUBLIC_N8N_WEBHOOK_URL` env var configured in deployment
- Real social links (Instagram, Substack) in footer
- Service Web page published — remove noindex when Joel is ready
- Area Abbotsford page published — only after Joel supplies genuinely unique local copy
- Additional local landing pages (Chilliwack, Langley) — only with unique content per city
- Email newsletter signup — only if Joel commits to a publication schedule
- Inline Calendly embed or `/book` dedicated page — defer until conversion data supports it

**Anti-features (do not build):**
- Inline full Calendly calendar on landing (performance cost; pushes booking before trust is established)
- Blog in main nav (cognitive load; competes with booking CTA)
- Multiple CTAs per section (paradox of choice)
- Social media feed embeds (performance; broken accounts are worse than no widget)
- Thin location pages for every Fraser Valley city (Google doorway-page penalty)

### Architecture Approach

The v3.0 architecture is a rebuild-in-place on the existing Astro 5 file-based routing structure. No new build tools, no new frameworks, no new data layers. The component tree is reorganized into four folders: `ui/` (atomic primitives), `layout/` (SiteHeader, SiteFooter, MobileNav), `content/` (domain components — ProjectCard, ServiceCard, Step, FAQItem, BlogCard, Breadcrumb), and `homepage/` (Landing section assemblies). The old `ui/` folder (Badge, Button, Card, Input, CheckboxGroup) and all `design-system/` components are deleted in the final cleanup phase. Showcase projects remain in `projects.json` (promoted to a v2 schema with `tagline`, `expandedSummary`, and `status` fields) — no migration to a Content Collection is needed because there are no per-project detail pages in the Figma spec.

**Major components:**
1. **`BaseLayout.astro`** — HTML shell; new font imports in `<head>`; dark-mode FOUC script must stay `is:inline` in `<head>` before `<body>`; wraps all pages
2. **`SiteHeader.astro` + `SiteFooter.astro` + `MobileNav.astro`** — chrome; migrated after all page bodies are on v3.0 tokens
3. **UI primitives (CTAButton, Eyebrow, Tag, Callout, LinkCard)** — built before content components; no domain data, no page coupling
4. **Content components (ProjectCard, ServiceCard, Step, FAQItem, BlogCard, Breadcrumb)** — depend on primitives; ProjectCard uses native `<details>` for expand/collapse
5. **Homepage sections (HeroSection, ServicesSection, ProcessSection, AboutSection, ContactSection)** — copy inline in Astro files; assembled in `index.astro`
6. **`showcase.astro`** — replaces `/projects`; expandable ProjectCard components; projects.json v2 data
7. **Dev-hidden pages (`services/web.astro`, `areas/abbotsford.astro`)** — built always; `noindex` meta; excluded from `@astrojs/sitemap` via `filter()` in `astro.config.mjs`

**Critical path:**
```
global.css tokens
  → BaseLayout.astro (fonts, dark mode)
    → SiteHeader + SiteFooter
      → All page templates
        → Cleanup (token deletion, file deletion, CLAUDE.md)

UI primitives (CTAButton, Eyebrow, Tag, ...)
  → Content components (ProjectCard, ServiceCard, ...)
    → Section assemblies (HeroSection, ServicesSection, ...)
      → index.astro (landing)
```

### Critical Pitfalls

Research identified 14 named pitfalls. The five highest-risk that must be prevented at the phase level:

1. **Design fidelity drift (eyeballing Figma instead of extracting values)** — every `@theme` value must be extracted from Figma variables via the Figma MCP or inspect panel; establish a token mapping document (Figma variable → CSS custom property → numeric value) before writing the first token; screenshot comparison gate required at every UI phase before the phase is marked done
2. **`@theme` token collision during migration** — introduce all v3.0 tokens under `--wl-` prefix; keep v1/v2 tokens unchanged in `@theme` until every component is migrated; run `grep -r "var(--color-yellow\|var(--font-heading\|var(--border-neo" src/` before deleting old tokens; token deletion is a named final phase only
3. **Fraunces variable font CLS at 76px display** — self-host via `@fontsource-variable/fraunces` (`wght.css` + `wght-italic.css`); add `<link rel="preload" as="font" crossorigin>` in `BaseLayout.astro`; set `font-optical-sizing: auto` or `font-variation-settings: 'opsz' 76` on the hero headline; verify Lighthouse CLS = 0 after font phase
4. **Dark mode FOUC from script movement** — the `<script is:inline>` FOUC prevention script in `BaseLayout.astro` must remain in `<head>` before `<body>`; add a prominent code comment; dark-mode color transitions on `body` must be gated with a `.transitions-enabled` class added post-DOMContentLoaded (prevents 200ms animated flash on page load for dark-OS users)
5. **IA change breaking inbound links and sitemap** — `/faq` must have an Astro redirect entry before the page file is deleted; dev-hidden pages must have both `noindex` meta and `@astrojs/sitemap` `filter()` exclusion before they appear in any build; add each new page to `lighthouserc.json` URL list as part of its phase completion criteria

Additional pitfalls for phase planning:
- **Sea-glass contrast failures** — run WCAG contrast check on every text-use color before writing the first `@theme` token; define `-text` companion tokens at lowered L for any mid-lightness accent color
- **SVG wave dark-mode blindness** — wave must be inline SVG (not `<img src="wave.svg">`); strokes use `var(--wl-color-wave-line)` CSS variable; test wave contrast in both themes
- **Lighthouse CI false pass** — `lighthouserc.json` currently tests only desktop homepage; update to include showcase + one blog post URL; re-enable `lcp-lazy-loaded` audit (currently disabled, hiding an existing `loading="lazy"` bug on blog post featured images at `[slug].astro` line 89)
- **CLAUDE.md drift** — update `CLAUDE.md` in the final cleanup phase as a milestone gate; stale CLAUDE.md causes future Claude sessions to generate wrong token names and component APIs

---

## Implications for Roadmap

Phases start at 33 per milestone convention. The architecture research provides an 8-phase build order; the pitfalls research identifies which phases carry the highest risk.

### Phase 33: Token Foundation + Font Setup

**Rationale:** Every downstream component depends on correct tokens. A token change touches all pages simultaneously in Tailwind 4. This phase must be complete and verified before any component work begins — this is a hard block, not a suggested order.

**Delivers:** New `@theme` block with `--wl-` prefixed tokens (sea-glass palette, Fraunces/Hanken Grotesk type scale, spacing); self-hosted font packages installed and imported in `BaseLayout.astro`; dark-mode overrides in `.dark` selector; Lighthouse CLS = 0 for fonts; WCAG contrast verified for all text-use tokens; `lighthouserc.json` updated to add showcase + blog post URLs; existing v1/v2 tokens remain untouched in `@theme`

**Addresses:** FEATURES.md — token foundation P1 requirement

**Avoids:** Pitfall 1 (fidelity drift — token mapping doc required), Pitfall 3 (token collision — `--wl-` namespace), Pitfall 4 (Fraunces CLS — preload + opsz), Pitfall 8 (sea-glass contrast — verify before coding), Pitfall 13 (Lighthouse CI false pass — update URL list)

**Research flag:** Standard patterns; no additional research needed.

---

### Phase 34: BaseLayout + Chrome Components

**Rationale:** SiteHeader, SiteFooter, and MobileNav appear on every page. Migrating chrome after tokens but before page content ensures no page body is assembled with mixed chrome states.

**Delivers:** `BaseLayout.astro` updated with new font `<link>` tags; dark-mode FOUC script preserved in `<head>`; dark-mode color transition gated behind `.transitions-enabled` class; `SiteHeader.astro` with new nav (Services / Showcase / About / Book a call); `SiteFooter.astro` with footer links including `/blog`; `MobileNav.astro` rewired to new nav links

**Avoids:** Pitfall 5 (FOUC — script stays in `<head>`), Pitfall 6 (transition flash — `.transitions-enabled` gate)

**Research flag:** Standard patterns; FOUC prevention is existing working code to preserve, not invent.

---

### Phase 35: UI Primitives

**Rationale:** Content components import primitives. Primitives must exist before content components can be written.

**Delivers:** `CTAButton.astro`, `Eyebrow.astro`, `Tag.astro`, `Callout.astro`, `LinkCard.astro`; all use `--wl-*` tokens; all pass axe-core; tested in isolation on a temporary dev page (deleted before merge)

**Avoids:** Pitfall 9 (old token leak — new components use only `--wl-*`)

**Research flag:** Standard patterns.

---

### Phase 36: Content Components + Expandable Cards

**Rationale:** Content components are the highest-complexity Figma-to-code translation. ProjectCard's expand/collapse behavior carries accessibility and animation risk. Isolating these before page assembly allows axe-core verification per component.

**Delivers:** `ProjectCard.astro` (native `<details>` expand/collapse with CSS `::details-content` animation; keyboard navigable; verified with axe-core); `ServiceCard.astro`; `Step.astro`; `FAQItem.astro`; `BlogCard.astro` (restyled); `Breadcrumb.astro`; `projects.json` promoted to v2 schema (`tagline`, `expandedSummary`, `status` fields added)

**Avoids:** Pitfall 11 (expandable card ARIA — `<details>` provides semantics natively)

**Research flag:** Standard patterns for `<details>`/`<summary>`; no additional research needed.

---

### Phase 37: Landing Page

**Rationale:** The landing page is the primary conversion surface and the most complex composition. All primitives and content components must be ready before landing page assembly.

**Delivers:** `HeroSection.astro` (inline SVG wave with `var(--wl-color-wave-line)` strokes, dark-mode aware); `ServicesSection.astro`; `ProcessSection.astro`; `AboutSection.astro`; `ContactSection.astro` (n8n webhook preserved, `hp-*` DOM IDs unchanged); `index.astro` composed from sections; anchor IDs on `#services` and `#about`; all 4 breakpoints (390/768/1440/1920); Figma frame `12:2` (light) and `117:103` (dark) screenshot comparison gate before phase marked done

**Avoids:** Pitfall 1 (fidelity drift — screenshot gate required), Pitfall 2 (no visual review — Figma frames named in phase plan), Pitfall 7 (SVG wave not dark-mode aware — inline SVG)

**Research flag:** SVG wave path complexity unknown until Figma export — may need SVGO simplification step during phase planning if path count is high.

---

### Phase 38: Showcase Page + Blog Restyle

**Rationale:** Showcase and Blog share the content component foundation built in Phase 36. Building together is efficient; they have no mutual dependency.

**Delivers:** `showcase.astro` (expandable ProjectCards, Craft & Experiments section); anchor nav active state via IntersectionObserver; cross-page anchor links (`/showcase` → `/#services`); blog `index.astro`, `[slug].astro`, `tags/[tag].astro` restyled; blog removed from main nav; footer link to `/blog` present; `loading="lazy"` bug fixed on blog featured image (change to `loading="eager"` at `[slug].astro` line 89); Figma frame `12:3` screenshot comparison for Showcase

**Avoids:** Pitfall 12 (blog URLs must not change), Pitfall 13 (showcase URL added to `lighthouserc.json`)

**Research flag:** IntersectionObserver anchor-nav pattern is standard; `rootMargin` offset for sticky header height is worth a quick reference during phase planning.

---

### Phase 39: Utility Pages + Dev-Hidden Pages

**Rationale:** Utility pages (404, thank-you) and dev-hidden pages (Service Web, Area Abbotsford) have no dependencies on the landing or showcase pages and can be built after Phase 38.

**Delivers:** `thank-you.astro` restyled; `404.astro` created (currently missing from the repo); `services/web.astro` (dev-hidden, `noindex` meta, excluded from sitemap); `areas/abbotsford.astro` (dev-hidden, `noindex` meta, excluded from sitemap, `LocalBusiness` JSON-LD with `ProfessionalService` subtype and `areaServed: "Abbotsford, BC"`)

**Avoids:** Pitfall 12 (dev-hidden pages indexed — `noindex` meta + sitemap filter both required)

**Research flag:** Standard patterns.

---

### Phase 40: URL Strategy, Redirects + IA Cleanup

**Rationale:** Redirect and sitemap changes must be applied before any old page routes are deleted. Deleting files without redirects causes 404s on indexed URLs.

**Delivers:** `astro.config.mjs` redirects updated (`/projects` → `/showcase`, `/projects/[slug]` → `/showcase`, `/faq` → `/`, `/contact` → `/#contact`); sitemap filter added for dev-hidden pages; `FAQPage` JSON-LD moved from `faq.astro` to service pages; `src/pages/faq.astro` deleted after redirect is verified in build output; `projects/index.astro` and `projects/[slug].astro` deleted after redirects verified

**Avoids:** Pitfall 12 (IA change breaking inbound links — redirects in place before file deletion)

**Research flag:** GitHub Pages meta-refresh redirect behavior is well-documented; no HTTP 301 possible on static hosting; acceptable SEO tradeoff for this site.

---

### Phase 41: v1 Component + Token Cleanup

**Rationale:** Dead code deletion is a named phase, not a side effect of migration. Old components and tokens remain throughout migration to avoid big-bang risk; they are removed only after every page is verified on v3.0.

**Delivers:** Old `src/components/ui/` components deleted (Badge, Button, Card, Input, CheckboxGroup); `design-system/` folder deleted; all Process and Tech SVGs deleted; old v1/v2 token block removed from `global.css` (only `--wl-*` tokens remain); `grep -r "var(--color-yellow\|var(--font-heading\|var(--border-neo\|bg-yellow\|bg-turquoise\|shadow-neo\|iso-shadow" src/` returns zero; `npm run build` clean; `CLAUDE.md` updated (fonts, colors, IA, component names); full Lighthouse CI pass

**Avoids:** Pitfall 10 (dead code left behind), Pitfall 14 (CLAUDE.md drift — updated as milestone gate)

**Research flag:** No research needed. Pure deletion and verification.

---

### Phase Ordering Rationale

- **Tokens before everything** — Tailwind 4's `@theme` is a global namespace; any component written before tokens are final must be re-checked after the token change
- **`--wl-` namespace isolation throughout migration** — prevents the v1 token collision failure mode; eliminates multi-page visual regressions at the cost of one grep step per phase
- **Chrome after tokens, before page bodies** — Header and Footer appear on every page; migrating them after page bodies would leave all pages with mixed chrome/body versions for the entire migration window
- **Primitives before content components** — hard build dependency; content components import primitives
- **Landing before Showcase** — Landing is the highest-priority conversion surface; Showcase follows because it shares content components from Phase 36
- **Utility pages last among page builds** — lowest priority; no component dependencies not already built
- **URL/redirect changes before file deletion** — redirect must exist in the build output before the source file disappears
- **Cleanup as a named final phase** — ensures it happens and is not perpetually deferred; CLAUDE.md update is a milestone gate in this phase

### Research Flags

Phases where deeper research during planning would add value:
- **Phase 37 (Landing / Hero SVG wave):** Wave SVG path complexity is unknown until the Figma asset is exported. If path count is high, SVGO simplification settings need to be established to keep inline SVG under 5KB. Flag for a 15-minute research step during phase planning.
- **Phase 38 (Showcase / IntersectionObserver anchor nav):** The `rootMargin` offset calculation for a sticky header requires knowing the exact header height at each breakpoint. Worth a quick reference during phase planning.

Phases with fully standard patterns (skip research-phase):
- **Phase 33 (Tokens):** Token extraction from Figma + `@theme` authoring is well-documented
- **Phase 34 (BaseLayout/Chrome):** FOUC prevention and dark mode toggle are existing working code; preserve, do not reinvent
- **Phase 35 (Primitives):** Atomic Astro component patterns are standard
- **Phase 36 (Expandable Cards):** Native `<details>`/`<summary>` with `::details-content` is Baseline Newly Available Sep 2025
- **Phase 39 (Utility Pages):** `noindex` + sitemap filter is documented Astro behavior
- **Phase 40 (URL Strategy):** Astro redirects on GH Pages behavior is known and documented
- **Phase 41 (Cleanup):** Deletion + grep verification; no new patterns

---

## Conflicts Between Research Files

The four files are consistent on all major decisions. Two minor tensions to resolve during planning:

**Tension 1: `<details>` vs. custom JS for ProjectCard expand/collapse**

STACK.md recommends native `<details>`/`<summary>` for expandable cards. ARCHITECTURE.md Anti-Pattern 4 warns against `<details>` if the design requires height animation or scroll behavior, and suggests "small vanilla JS in a `<script>` block" instead. PITFALLS.md recommends `<details>` first, noting that "for animated expansion, the `<details>` approach requires one JS line to sync the open state with a CSS class — still far less code than a full ARIA implementation from scratch."

**Resolution:** Use native `<details>` as the base mechanism with one JS line to sync a CSS class for animation. Only fall back to a fully custom button + ARIA implementation if the Figma animation spec cannot be satisfied with `<details>` + CSS `::details-content`. This is a Phase 36 decision point; verify against the Figma component spec (`36:5`) before implementation begins.

**Tension 2: Token namespace strategy during migration**

PITFALLS.md recommends a `--wl-` prefix for v3.0 tokens during migration, keeping old tokens alive until cleanup. STACK.md and ARCHITECTURE.md both describe replacing the `@theme` block "wholesale," implying a clean cut.

**Resolution:** The `--wl-` prefix approach is correct for a multi-phase migration. "Wholesale replacement" in STACK.md and ARCHITECTURE.md describes the final state after cleanup — Phase 41 removes the `--wl-` prefix convention and old tokens together. During the migration period (Phases 33–40), new components use `--wl-*`; old components keep old token references until they are migrated or deleted.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All decisions grounded in verified npm registry versions (2026-07-14), official Astro docs, confirmed browser support (::details-content Baseline Sep 2025); Astro Fonts API exclusion backed by open GitHub issue #15515 |
| Features | HIGH (table stakes + anti-features), MEDIUM (SEO) | Table stakes and anti-features are well-sourced; blog-out-of-nav SEO tradeoff and local SEO ranking signals are MEDIUM — real but context-dependent on traffic volume |
| Architecture | HIGH | Grounded in direct repo read of all `src/` files, `astro.config.mjs`, `.github/workflows/`, `lighthouserc.json`; no assumptions |
| Pitfalls | HIGH | Every pitfall cites specific file paths and line numbers in the actual codebase; cross-referenced against documented v1.4 and v2.0 abandonment root causes in STATE.md |

**Overall confidence:** HIGH

### Gaps to Address

- **Calendly URL:** `BOOKING_URL` constant is a placeholder. Every phase that adds a CTA button must note this. Gate launch on Joel supplying the real URL, not on the code being ready.
- **n8n webhook URL:** `PUBLIC_N8N_WEBHOOK_URL` is a deployment secret. Contact form smoke test requires the real URL in the deployment environment; cannot be fully verified in CI without it.
- **Real social links:** Footer social links (Instagram, Substack) are flagged as "pending" in STATE.md. Footer implementation must use placeholder or empty state; do not hard-code broken social URLs.
- **Area Abbotsford copy:** The page can be built and the schema can be in place, but it must remain dev-hidden until Joel supplies genuinely unique local copy. A thin doorway page actively damages the domain.
- **Wave SVG path complexity:** The Figma wave asset complexity is unknown until exported. If path count is high, SVGO simplification will be needed. Flag this in Phase 37 planning.
- **Hover states and dark mode variants not explicit in Figma:** PITFALLS.md notes that hover states and muted text colors may not be explicitly designed in every Figma frame. Policy: flag the gap to Joel rather than inventing values; document any invented values explicitly in the phase notes.

---

## Sources

### Primary (HIGH confidence)
- Direct codebase read: all files in `src/`, `astro.config.mjs`, `.github/workflows/`, `lighthouserc.json`, `src/styles/global.css` (458 lines), `.planning/STATE.md`
- npm registry (verified 2026-07-14): `@fontsource-variable/fraunces@5.2.9`, `@fontsource-variable/hanken-grotesk@5.2.8`
- Astro docs: sitemap `filter()` option, `redirects` config static behavior, experimental Fonts API reference
- W3C WAI APG: Accordion Pattern; WCAG 2.2 criteria 1.4.3, 1.4.11, 4.1.2
- Tailwind CSS v4 docs: `@theme` dark mode, `@custom-variant` syntax
- Project history: `.planning/STATE.md` — v1.4 abandoned 2026-05-31, v2.0 abandoned 2026-07-14; root causes documented

### Secondary (MEDIUM confidence)
- Builder.io: CSS-only animated accordions with `::details-content`, `interpolate-size`, `name` attribute
- Patrick Brosset: Baseline Newly Available Sep 2025 confirmation for `::details-content`
- Astro changelog entry 5.16.9: FontProvider type breaking change
- GitHub withastro/astro issue #15515: Experimental Fonts API breakage on 5.17.1+
- Search Engine Land: blog nav removal SEO impact, service area pages guidance
- Calendly Help: embed options comparison
- Consulting Success: solo consultant site conversion best practices

### Tertiary (LOW confidence, needs validation)
- Local SEO ranking factors for service-area businesses without a physical storefront — real but highly context-dependent; defer to Joel's Google Business Profile strategy
- Blog-out-of-nav PageRank impact — real signal but magnitude depends on blog traffic volume (currently low)

---
*Research completed: 2026-07-14*
*Ready for roadmap: yes*

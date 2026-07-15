# Requirements: v3.0 Wavelength Rebrand

**Defined:** 2026-07-14
**Core Value:** Small business owners can understand what Joel does, trust his process, and easily reach out to start a conversation.
**Design source of truth:** Figma `1tg8wIPcvOVC5tPZ8pkGO2` — copy in mockups is real, use verbatim; gaps get flagged, never invented (v1.4 lesson).

## v3.0 Requirements

### Foundation

- [x] **FOUND-01**: Tailwind 4 `@theme` token set covering the full sea-cool palette (Ink/Sub/Accent/Accent-soft/Sea-glass/Sea-glass-deep/Paper/Line) in light **and** dark themes, namespaced `--wl-*` during migration so old tokens keep rendering existing pages until cleanup
- [x] **FOUND-02**: Fraunces + Hanken Grotesk self-hosted via `@fontsource-variable` (Fraunces upright + italic with correct `opsz` axis at display sizes); 13-style type ramp from the Figma Components page available as utilities
- [x] **FOUND-03**: WCAG AA contrast verified for the token pairs of both themes before any component is built
- [x] **FOUND-04**: Lighthouse CI expanded before page migration: landing + showcase + one blog post URLs, mobile + desktop, `lcp-lazy-loaded`/`prioritize-lcp-image` audits re-enabled
- [x] **FOUND-05**: Waveform logo mark, favicon, and OG-image assets exported from Figma and wired into the layout/SEO plumbing

### Site Chrome

- [x] **CHROME-01**: BaseLayout carries the new fonts, FOUC-safe dark-mode script in `<head>`, and a theme toggle usable in both header states
- [x] **CHROME-02**: Site Header per Figma (desktop + mobile): waveform mark + wordmark, nav Services (`/#services`) / Showcase / About (`/#about`) / Book-a-call CTA; Blog link included dev-only
- [x] **CHROME-03**: Site Footer per Figma (desktop + mobile): tagline, nav links, contact email, copyright; Blog link included dev-only
- [x] **CHROME-04**: Mobile navigation matches the Figma mobile header breakpoint and is keyboard/screen-reader accessible

### Component Library

- [ ] **COMP-01**: CTA Button component with Figma variants (Solid / Ghost / Ghost-on-dark / Small) incl. calendar + mail icon slots
- [ ] **COMP-02**: Supporting primitives per Figma Components page: Eyebrow (on-light/on-dark), Tag, Callout, Link Card, Breadcrumb, Step, Service Card (default/highlight)
- [ ] **COMP-03**: Project Card with closed/expanded states via native `<details>` (aria-correct, animated per Figma, expanded story content indexed)
- [ ] **COMP-04**: FAQ Item (closed/open) via native `<details>` accordion, exclusive-open behavior
- [ ] **COMP-05**: Five-line "frequency field" wave background as inline SVG that adapts to both themes

### Pages

- [ ] **PAGE-01**: Landing page (`/`) rebuilt with every Figma section (Hero, Who, Three-ways `#services`, How-it-works, Automations, Proof, About `#about`, Agencies, Final CTA) — verbatim Figma copy, all 4 breakpoints, light + dark verified against frames `12:2`/`117:103`
- [ ] **PAGE-02**: Showcase page (`/showcase`) with Client Work + Craft & Experiments sections using expandable Project Cards — all 4 breakpoints, verified against frame `12:3`
- [ ] **PAGE-03**: Service Web page (`/services/web`) built from frame `85:103` — dev-hidden (noindex, out of sitemap, unlinked in prod)
- [ ] **PAGE-04**: Area Abbotsford page (`/areas/abbotsford`) built from frame `85:104` with ProfessionalService JSON-LD (areaServed) — dev-hidden until copy is confirmed locally unique
- [ ] **PAGE-05**: 404 page restyled to the new brand
- [ ] **PAGE-06**: Blog index/post/tag pages restyled to the new brand — URLs unchanged, posts stay in sitemap, featured-image `loading="lazy"` LCP bug fixed

### IA & URLs

- [ ] **IA-01**: Redirects: `/projects` + `/projects/[slug]` → `/showcase`; `/faq` → `/`; `/thank-you` removed (form dropped)
- [ ] **IA-02**: Dev-hidden mechanism: `noindex` prop on SEO.astro + sitemap `filter()` excluding dev-hidden URLs; verified in the production build output
- [ ] **IA-03**: All Book-a-call CTAs wired to a single `BOOKING_URL` constant (Calendly placeholder); Email CTAs use `mailto:` to Joel's address
- [ ] **IA-04**: Anchor nav behaves correctly: active states, smooth scroll with header offset, cross-page `/#services` links work from Showcase/blog
- [ ] **IA-05**: Contact form + n8n webhook flow removed (design has no form); no dead form code remains

### Content

- [ ] **CONT-01**: `projects.json` v2 schema carrying the Showcase card content (eyebrow, title, outcome line, summary, tags, expanded problem/built/result story) — populated verbatim from Figma
- [ ] **CONT-02**: Landing/service/area copy sourced verbatim from the Figma mockups; any missing copy flagged to Joel, not invented

### Cleanup & Quality

- [ ] **CLEAN-01**: Retired surfaces deleted: `/faq`, `/design-system` (+ JSON endpoint), `/component-demo`, `/test-isometric`, `/projects/*`, `/thank-you`, old ui/ components, illustrations/, design-system/ components
- [ ] **CLEAN-02**: Old neobrutalist tokens removed from `global.css`; `--wl-*` prefix finalized; zero references to old tokens/fonts remain
- [ ] **CLEAN-03**: CLAUDE.md rewritten for the new design system; `design/` folder cleanup (delete duplicate `image-import-*` at root; Crito artifacts noted as archive)
- [ ] **QUAL-01**: axe-core zero violations on all pages in both themes
- [ ] **QUAL-02**: Lighthouse ≥90 all categories on the expanded URL set
- [ ] **QUAL-03**: Visual fidelity gate: Figma-frame vs. rendered-page screenshot comparison approved by Joel for Landing (light + dark) and Showcase before milestone close

## Future Requirements (deferred)

- **FUT-01**: Real Calendly URL replacing `BOOKING_URL` placeholder
- **FUT-02**: Publish Service Web page (+ Services nav treatment revisit)
- **FUT-03**: Publish Area Abbotsford page (needs locally-unique copy + GBP-consistent NAP)
- **FUT-04**: Additional service pages (Automations, AI) on the Service Web template
- **FUT-05**: Blog back into public nav (flip dev-only links)
- **FUT-06**: Real social profile links
- **FUT-07**: "Your Project Here" showcase slot replaced with a real case study

## Out of Scope

| Feature | Reason |
|---------|--------|
| Contact form / n8n webhook | New design uses Book-a-call + Email CTAs; form dropped with its /thank-you flow |
| New blog content | Content untouched; restyle only |
| Calendly inline embed | Link/popup converts better and protects Lighthouse scores (research) |
| CMS backend | Joel edits code directly |
| Crito design system | Abandoned with v2.0; archived on branch `feature/phase-32-fidelity-sweep-handoff` |
| React/Alpine/JS frameworks | Native `<details>`, CSS, and small vanilla scripts cover all interactions |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 33 | Complete |
| FOUND-02 | Phase 33 | Complete |
| FOUND-03 | Phase 33 | Complete |
| FOUND-04 | Phase 33 | Complete |
| FOUND-05 | Phase 33 | Complete |
| CHROME-01 | Phase 34 | Complete |
| CHROME-02 | Phase 34 | Complete |
| CHROME-03 | Phase 34 | Complete |
| CHROME-04 | Phase 34 | Complete |
| COMP-01 | Phase 35 | Pending |
| COMP-02 | Phase 35 | Pending |
| COMP-03 | Phase 36 | Pending |
| COMP-04 | Phase 36 | Pending |
| COMP-05 | Phase 36 | Pending |
| CONT-01 | Phase 36 | Pending |
| PAGE-01 | Phase 37 | Pending |
| CONT-02 | Phase 37 | Pending |
| IA-03 | Phase 37 | Pending |
| IA-04 | Phase 37 | Pending |
| PAGE-02 | Phase 38 | Pending |
| PAGE-06 | Phase 38 | Pending |
| PAGE-03 | Phase 39 | Pending |
| PAGE-04 | Phase 39 | Pending |
| PAGE-05 | Phase 39 | Pending |
| IA-02 | Phase 39 | Pending |
| IA-01 | Phase 40 | Pending |
| IA-05 | Phase 40 | Pending |
| CLEAN-01 | Phase 41 | Pending |
| CLEAN-02 | Phase 41 | Pending |
| CLEAN-03 | Phase 41 | Pending |
| QUAL-01 | Phase 41 | Pending |
| QUAL-02 | Phase 41 | Pending |
| QUAL-03 | Phase 41 | Pending |

**Coverage:**

- v3.0 requirements: 33 total
- Mapped to phases: 33
- Unmapped: 0 ✓

*Note: The requirements file initially stated 29 total. A recount of the defined requirement IDs yields 33 (FOUND ×5, CHROME ×4, COMP ×5, PAGE ×6, IA ×5, CONT ×2, CLEAN ×3, QUAL ×3). All 33 are mapped.*

---
*Requirements defined: 2026-07-14*
*Last updated: 2026-07-14 — traceability table populated after roadmap creation*

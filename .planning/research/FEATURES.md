# Feature Research

**Domain:** Solo-consultant lead-generation site (web/automation/AI, non-technical SMB audience)
**Researched:** 2026-07-14
**Confidence:** HIGH (booking CTAs, accessibility patterns, Astro sitemap), MEDIUM (local SEO ranking signals, blog-out-of-nav SEO tradeoffs)

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features that non-technical SMB visitors assume any professional consulting site has. Missing or broken = instant credibility loss.

| Feature | Why Expected | Complexity | Dependency / Notes |
|---------|--------------|------------|--------------------|
| Single clear booking CTA (Calendly) | Visitors expect one obvious "next step" — no CTA = dead end | LOW | `BOOKING_URL` constant already in codebase; Calendly link (not embed) is sufficient for nav + hero CTAs |
| Mobile-first responsive layout | 70%+ of web traffic is mobile; non-mobile site loses SMB owners browsing on phones | MEDIUM | Figma has 4 breakpoints (390/768/1440/1920); must implement all |
| Services described in plain language | Non-technical audience cannot evaluate "full-stack developer"; needs outcome language ("time saved") | LOW | Copy exists verbatim in Figma — use it; do not rewrite |
| Social proof / client credentials | Visitors need trust signals before booking; EA · Unity · lululemon credits are the differentiator here | LOW | Already in Figma "proof section"; existing portfolio data in `projects.json` |
| Contact / outreach path | Some visitors won't book cold; need a lower-friction option | LOW | Existing 8-field n8n form; scope for v3.0 is restyling only, not replacement |
| Fast page load (<3 s) | 1 s delay = 7-10% conversion drop; SMB owners on mobile may be on slower connections | LOW | Astro static site is inherently fast; Lighthouse 90+ CI gate already enforced |
| Accessible keyboard + screen reader nav | WCAG 2.2 AA required; accessibility now a direct Google ranking signal (2025 algo update) | LOW | axe-core + Playwright CI already in place; new components must pass |
| Dark mode | Already built (v1.x) and carried forward; Figma dark mockup exists (`117:103`) | LOW | Toggle behavior is existing infrastructure; v3.0 applies new tokens only |
| SEO meta + JSON-LD | Sitemap, robots.txt, structured data already generate; must survive token/component rebuild | LOW | Existing `SEO.astro` component; do not break during rebuild |

### Differentiators (Competitive Advantage)

Features that make this site stand out among solo-dev freelancer sites in the Fraser Valley / remote market. Not expected, but make the difference between "seems competent" and "I want to hire this person."

| Feature | Value Proposition | Complexity | Dependency / Notes |
|---------|-------------------|------------|--------------------|
| 5-step "what working together looks like" process section | Reduces anxiety for non-technical buyers who fear being lost or ignored; differentiates from portfolios that just show work | LOW | Content in Figma; component is `Step` on Components page |
| Expandable case study cards (problem / what-I-built / result) | Story-format proof converts better than screenshot galleries; "result" framing speaks to SMB owners, not technical evaluators | MEDIUM | `ProjectCard` component (closed + expanded states) in Figma; accessibility and SEO requirements below |
| Automations example table | Concretely answers "what can automations actually do for me?" without jargon; rare on developer sites | LOW | Real table in Figma Landing mockup; static HTML table is sufficient |
| "Agencies — need reliable overflow dev?" band | Opens a second audience segment without confusing primary (SMB) audience; agencies are often higher-value, longer-term clients | LOW | Separate band/section in Landing Figma; one extra anchor or section |
| Local identity (Abbotsford / Fraser Valley) | Non-technical SMB owners often prefer local; "On your wavelength" brand reinforces approachability | LOW | Mention in hero copy; Area Abbotsford page for SEO (dev-hidden this milestone) |
| Waveform / musician identity mark | Memorable visual differentiator; signals "creative but technical"; sticks in memory after the visit | LOW | Design token / SVG asset; self-hosted fonts (Fraunces + Hanken Grotesk) |
| "Craft & Experiments" section in Showcase | Generative art / interactive sketches demonstrate technical depth and creative range without requiring case-study format | LOW | Figma Showcase page has closed + expanded states for this section too |
| Anchor-based nav with active state tracking | Feels like a focused one-page experience even though site is multi-page; reduces "where am I?" confusion | MEDIUM | IntersectionObserver pattern on Landing page; cross-page anchors for links from Showcase back to Landing (#services, #about) |

### Anti-Features (Deliberately NOT Building)

Features that commonly appear on freelancer/consultant sites but harm conversion, add complexity, or do not fit this specific context.

| Anti-Feature | Why Requested | Why Problematic | Alternative |
|--------------|---------------|-----------------|-------------|
| Inline full Calendly calendar embed on landing page | "Reduces friction" — visitor can book without leaving | Calendly inline widget is heavy (loads full scheduling UI); hurts Lighthouse score; also pushes booking too early before trust is established — non-technical SMBs need to read proof and process first | Link opens Calendly in a new tab or popup text; inline embed reserved for a dedicated /book page if Joel adds one post-launch |
| Blog in main nav | "Content marketing builds authority" | Blog is a distraction from the single conversion goal (discovery call); SMB visitors who want to learn, not buy, are lower-intent; nav clutter increases cognitive load | Blog stays reachable by URL + sitemap; internal links from landing copy or a footer link serve inbound traffic without competing with booking CTA for nav space |
| Multiple competing CTAs per section | "Gives users choices" | Paradox of choice — too many options = no action; consultant sites with 3+ CTAs per fold convert worse than sites with one | One CTA per section (always "Book a call" / Calendly); contact form as secondary path for users who need lower-friction first touch |
| Services index / sub-pages in nav | "SEO depth and clarity" | Service Web page is specced but dev-hidden this milestone; adding it to nav half-built is worse than not having it; nav items without real pages = broken trust | Service detail page built but excluded from nav + sitemap; promoted when copy and design are complete in a future milestone |
| Chatbot / live chat widget | "Always-on engagement" | Adds weight, creates maintenance burden, and for a solo operator is either offline most of the time (embarrassing) or requires AI integration (scope creep) | Single clear booking path (Calendly) handles real-time scheduling; contact form handles async inquiries |
| Social media feed embeds | "Shows I'm active" | Third-party embeds hurt performance; social accounts flagged as "pending" in STATE.md (Instagram, Substack URLs not yet configured); broken social presence is worse than no social widget | Footer links once accounts are active; not embedded feeds |
| Email newsletter signup | "Builds an owned audience" | Requires a newsletter platform, ongoing content, list management; violates "minimum viable lead gen" principle for a solo dev in a local market | The existing blog + stable URLs provides this value passively via search; add if Joel launches a consistent newsletter in a future milestone |
| Thin location pages for every Fraser Valley city | "More local SEO pages = more ranking opportunity" | Google penalizes doorway pages where content is copied with only the city name swapped; thin pages damage the whole domain's quality signals | One genuinely substantive Area Abbotsford page (dev-hidden) with real local copy, local case studies, and `LocalBusiness` schema; expand to other cities only with genuinely unique content |

---

## Feature Dependencies

```
[Anchor nav active state]
    └──requires──> [Landing page #services / #about sections with IDs]
    └──requires──> [IntersectionObserver JS or scroll-position listener]

[Cross-page anchor links (Showcase → Landing #services)]
    └──requires──> [Landing sections with stable IDs]
    └──enhances──> [Anchor nav active state]

[Expandable case study cards]
    └──requires──> [ProjectCard component (closed + expanded states)]
    └──requires──> [aria-expanded + aria-controls ARIA implementation]
    └──enhances──> [Showcase page SEO — content in DOM even when collapsed]

[Local SEO (Area Abbotsford)]
    └──requires──> [LocalBusiness schema (ProfessionalService subtype)]
    └──requires──> [Unique local copy (not duplicate of landing)]
    └──requires──> [sitemap filter to exclude page until ready]
    └──conflicts──> [Thin-city-pages anti-feature]

[Blog out of nav, URLs stable]
    └──requires──> [Internal links from footer or landing body copy]
    └──requires──> [Sitemap still includes /blog/* URLs]
    └──conflicts──> [Blog-in-nav table stakes (deliberately removed)]

[Calendly booking CTA]
    └──requires──> [BOOKING_URL constant (placeholder until Joel supplies real URL)]
    └──conflicts──> [Inline full calendar embed anti-feature]

[Dev-hidden pages (Service Web, Area Abbotsford)]
    └──requires──> [sitemap filter() exclusion in astro.config]
    └──requires──> [noindex meta tag on each page as belt-and-suspenders]
    └──conflicts──> [nav links to these pages]
```

### Dependency Notes

- **Expandable cards require ARIA:** Without `aria-expanded` toggling on the trigger button and `aria-controls` pointing to the panel ID, screen readers cannot convey state. The W3C APG accordion pattern is the authoritative reference. Use `<details>`/`<summary>` as a native HTML fallback if the Figma interaction can be satisfied with it.
- **Blog out of nav requires compensating internal links:** Navigation link equity is real. Removing the blog from nav reduces crawl depth signal. Compensate with: (a) footer link to `/blog`, (b) one or two contextual links from landing copy (e.g., "Read my thoughts on automation →"), (c) sitemap includes all `/blog/*` slugs. This is MEDIUM confidence — a blog with low-traffic, long-tail SEO value probably loses little from nav removal; a blog driving primary SEO traffic would lose significantly more.
- **Dev-hidden pages need both sitemap exclusion AND noindex:** Static sites cannot rely on Robots.txt `Disallow` alone — Googlebot may still discover and index pages via external links. Belt-and-suspenders: filter page URL from sitemap using Astro's `filter()` config option; add `<meta name="robots" content="noindex, nofollow">` in the page's `<head>`. Do not use password protection or build-time exclusion unless the page should literally not be served at any URL.
- **Local SEO page requires genuine uniqueness:** The single biggest risk with Area Abbotsford page is duplicate content. It must have: a locally-specific headline, a mention of the area (not just city name injection), at minimum one local case study or local reference, and `ProfessionalService` JSON-LD schema with `areaServed` property pointing to "Abbotsford, BC". If Joel cannot supply unique local content, defer this page entirely — a thin doorway page does more damage than no page.

---

## MVP Definition

This is a subsequent milestone (v3.0), not a greenfield project. "MVP" here means minimum to ship the visual rebrand.

### Launch With (v3.0 Scope)

- [x] Sea-cool token foundation + Fraunces / Hanken Grotesk fonts (all content hangs on this)
- [x] Component library from Figma Components page (CTA Button, Card, Step, ProjectCard, Header, Footer, etc.)
- [x] Landing page — all 4 breakpoints, dark mode, real Figma copy
- [x] Showcase page — expandable project cards, Craft & Experiments section
- [x] Nav: Services (anchor) / Showcase / About (anchor) / Book a call (Calendly link)
- [x] Anchor nav with active state tracking via IntersectionObserver
- [x] Blog restyled with new tokens; removed from nav; `/blog` + `/blog/[slug]` URLs preserved
- [x] Service Web + Area Abbotsford pages: built, noindex meta, excluded from sitemap
- [x] Legacy component cleanup (neobrutalist components, design-system page, Crito artifacts)

### Add After Validation (Post-Launch)

- [ ] Real Calendly URL — swap `BOOKING_URL` constant when Joel configures it
- [ ] n8n webhook URL — `PUBLIC_N8N_WEBHOOK_URL` env var in deployment
- [ ] Real social links (Instagram, Substack) in footer
- [ ] Publish Service Web page — remove noindex + add to nav when Joel is ready
- [ ] Publish Area Abbotsford page — only after Joel supplies genuinely unique local content

### Future Consideration (v4+)

- [ ] Additional local landing pages (Chilliwack, Langley, etc.) — only with unique content per city
- [ ] Email newsletter signup — if Joel commits to a regular publication schedule
- [ ] /book dedicated page with inline Calendly embed — if conversion data shows users want to book but are leaving before clicking the CTA link

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Token foundation + fonts | HIGH (everything depends on it) | LOW | P1 |
| Landing page — hero + services | HIGH (primary conversion surface) | MEDIUM | P1 |
| Calendly CTA (link) | HIGH (primary conversion action) | LOW | P1 |
| Expandable project cards with ARIA | HIGH (proof + accessibility) | MEDIUM | P1 |
| Anchor nav + active state | MEDIUM (UX polish, trust) | MEDIUM | P1 |
| Blog restyled + nav removed | MEDIUM (existing content value) | LOW | P1 |
| Dev-hidden pages (Service Web, Area Abbotsford) | LOW for users now, MEDIUM SEO future | LOW (build + noindex) | P1 |
| "What working together looks like" process section | HIGH (reduces purchase anxiety) | LOW | P1 |
| Automations example table | MEDIUM (clarity for non-technical) | LOW | P2 |
| Agencies band | MEDIUM (second audience segment) | LOW | P2 |
| Dark mode (token application) | LOW (nice to have, Figma has it) | LOW | P2 |
| LocalBusiness schema on Area Abbotsford | LOW now (page hidden), HIGH future | LOW | P2 |
| Inline Calendly embed | LOW (see anti-features) | MEDIUM | P3 / never |
| Newsletter signup | LOW | HIGH (requires platform) | P3 |

---

## Implementation Notes by Feature

### Booking CTAs — Link vs Embed

**Recommendation: Calendly link (opens in new tab), not inline embed.**

For landing + nav CTAs, a plain link to Calendly outperforms an inline embed because:
- The inline embed loads before trust is established (visitors haven't read the proof section yet)
- The embed widget is performance-heavy; risks failing Lighthouse 90+ CI threshold
- For a solo operator with one event type, the standard Calendly page carries enough brand context

A popup-text or popup-widget variant (where the calendar opens in an overlay) is a reasonable middle ground for the hero CTA if Joel wants the "stays on site" feel without the full inline penalty. This can be A/B tested post-launch with zero code changes (Calendly popup embed uses the same `BOOKING_URL` value).

**Implementation:** Single `BOOKING_URL` constant in codebase (already exists). All CTAs reference it. Swap once when Joel supplies the real URL.

### Expandable Case Study Cards — Accessibility + SEO

**Accessibility (HIGH confidence — W3C APG):**

The trigger element (card header or "expand" button) requires:
- `aria-expanded="true|false"` toggled by JavaScript on click
- `aria-controls="panel-id"` pointing to the panel element
- The panel element gets a matching `id` attribute
- Optional: `role="region"` + `aria-labelledby` on the panel (omit if >6 cards — excessive region landmarks harm screen reader navigation)
- Keyboard: Enter or Space activates; Tab/Shift+Tab navigate between cards

Native `<details>`/`<summary>` provides all of this for free and requires no JavaScript. Reach for it first. Use custom ARIA only if the Figma design requires animation or styling that `<details>` cannot accommodate.

**SEO (MEDIUM confidence — mixed real-world results):**

Google indexes content in collapsed elements when it is present in the DOM on page load (not lazy-loaded or injected by JS after interaction). For Astro static output, the `problem / what-I-built / result` copy inside each card will be in the HTML and therefore indexable. Make the result/outcome copy prominent in the collapsed (visible) state — this is the most valuable SEO text and the hook that makes users open the card.

**Summary:** Lead with 1-2 sentences visible in closed state (result language for SEO + hook). Full story in expanded content (also indexable). ARIA accordion pattern for accessibility.

### Anchor Nav — Active States + Cross-Page Anchors

**Same-page (Landing):**

Use IntersectionObserver to toggle an `aria-current="page"` or active CSS class on nav links as sections scroll into view. `scroll-behavior: smooth` in CSS handles the scroll; no JS needed for the scroll itself. Set `scroll-margin-top` on anchored sections to account for sticky header height.

**Cross-page (Showcase → Landing #services):**

Standard HTML anchor: `href="/` + `#services"`. Browser lands on the page and jumps to the hash target. Smooth scroll will not animate cross-page jumps (the page loads fresh); this is expected behavior and does not require a workaround. The active state for "Services" will not trigger on Showcase page (correct — user is not viewing the Landing services section).

**Active state when on Showcase page:**

The "Showcase" nav item should show active. This is a separate concern from anchor-tracking: use Astro's `Astro.url.pathname` to set `aria-current="page"` on the matching nav link at build time.

### Blog — Out of Nav, URLs Stable

**SEO implications (MEDIUM confidence):**

Removing the blog from the main nav reduces the amount of PageRank flowing from the homepage to blog posts via navigation links. For a blog with posts that rank for long-tail queries, this is a real but modest signal reduction. Compensate with:
1. Footer link to `/blog` index (this re-establishes the crawl path)
2. One contextual link from the landing page body copy into the blog (e.g., "Read about how automations changed this client's workflow →")
3. All `/blog/*` URLs remain in the sitemap (already generated by `@astrojs/sitemap`)
4. No `noindex` on blog pages — they should stay indexed and discoverable

The architectural risk the research surfaces is "orphaned island" — a blog with no logical connection to services. Internal linking from the blog to service anchors (and vice versa) on the landing page forms the topical cluster that maintains this connection.

**Blog restyling:** Content unchanged. Only token/component application. URLs must not change — this is enforced by Astro's file-based routing as long as `src/content/blog/` slugs stay unchanged.

### Dev-Hidden Pages (Service Web, Area Abbotsford)

**Recommended approach: build + noindex + sitemap exclusion.**

Do NOT exclude from the Astro build (the pages should be served at their URLs for manual QA and future publication). Instead:

1. Add `<meta name="robots" content="noindex, nofollow">` in each page's `<head>` via the existing `SEO.astro` component — add a `noindex` prop that outputs this tag when true
2. Exclude the URLs from the generated sitemap using Astro sitemap's `filter()` option in `astro.config.*`:
   ```js
   filter: (page) =>
     !page.includes('/services/web') &&
     !page.includes('/area/abbotsford')
   ```
3. Do NOT link to these pages from any nav or internal links (robots.txt Disallow is optional belt-and-suspenders but Google may still find them via direct URL guessing)

This approach means: the pages exist and can be previewed at their real URLs, but Google will not index them, and they won't appear in sitemaps sent to Search Console. When Joel is ready to publish, remove the `noindex` prop and the sitemap filter in a single commit.

### Local SEO — Area Abbotsford Page

**What makes it rank (MEDIUM confidence):**

For a service-area business (no physical storefront), organic local rankings rely on:
- Page-specific `LocalBusiness` JSON-LD with `ProfessionalService` type (closest schema.org subtype for a web/automation consultant), `areaServed: "Abbotsford, BC"`, NAP consistent with Google Business Profile
- Unique, locally-specific copy — not just city name injection. At minimum: one client story from Abbotsford or the Fraser Valley, explicit mention of serving the local community, local geography references
- Title tag following pattern: "Web Development & Automation for Abbotsford Small Businesses | Joel Shinness Solutions"

**Honest constraint:** Service-area businesses without a storefront have harder local pack rankings than brick-and-mortar. The organic ranking opportunity (not local pack) is more realistic for Joel. The page's SEO value is real but modest until Joel builds local citations and a Google Business Profile.

**Dev-hidden until Joel supplies unique local copy.** A thin doorway page does more damage than no page.

---

## Competitor Feature Analysis

Context: Solo-dev freelancer sites in BC / remote Canadian market, targeting non-technical SMB owners.

| Feature | Typical Solo Dev Site | Joel's Site (v3.0 Target) |
|---------|----------------------|--------------------------|
| Hero CTA | "Contact me" or email link | "Book a call" (Calendly) + sub-CTA (contact form) |
| Portfolio / proof | Screenshot gallery, job list | Expandable case studies with problem / built / result |
| Process explanation | "Here's my stack" | "What working together actually looks like" 5-step |
| Local identity | Generic "available for remote work" | Abbotsford / Fraser Valley + local SEO page |
| Service description | Technical jargon ("React, Node.js, REST APIs") | Outcome language ("time saved", "automations") |
| Blog | In nav, updated sporadically | Out of nav, stable URLs, internal links maintain SEO |
| Agency pitch | Not present | Dedicated "overflow dev" band |

---

## Sources

- Calendly embed options and conversion: [Calendly Help — Embed options overview](https://calendly.com/help/embed-options-overview), [Top 10 Costly Mistakes for Calendly Integration](https://calendlyconsulting.com/top-10-costly-mistakes-for-calendly-integration/)
- Collapsible content SEO: [Collapsible Content Best Practices — Arc Intermedia](https://www.arcintermedia.com/shoptalk/collapsible-content-best-practices-does-hidden-content-affect-seo-aeo-geo/), [Accordions in SEO — SEO Examples](https://www.seoexamples.com/p/hidden-content-in-seo-unmasking-the), [Accordion/Tab SEO — OuterBox](https://www.outerboxdesign.com/articles/seo/should-i-use-tabbed-and-accordion-content-for-seo/)
- Accordion accessibility: [W3C WAI APG — Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/), [Accessible Accordions — theWCAG](https://www.thewcag.com/examples/accordions)
- Anchor nav + scroll behavior: [CSS-Tricks — Sticky Smooth Active Nav](https://css-tricks.com/sticky-smooth-active-nav/), [WCAG G128 — highlighting current nav item](https://www.w3.org/TR/WCAG20-TECHS/G128.html)
- Local SEO landing pages: [Service Area Pages — Search Engine Land](https://searchengineland.com/guide/service-area-pages), [LocalBusiness Schema — Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- Blog out of nav + site architecture: [Site Architecture SEO — Search Engine Land](https://searchengineland.com/guide/website-structure), [Navigation SEO Impact — OFP Marketing](https://ofpmarketing.com/the-overlooked-seo-impact-of-navigation-menus/)
- Dev-hidden pages / noindex: [Hiding Pages from Indexation — Link Assistant](https://www.link-assistant.com/news/hiding-pages-from-indexation.html), [Astro Sitemap integration — Astro Docs](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- Solo consultant website best practices: [10 Steps to a Client-Generating Consulting Website — Consulting Success](https://www.consultingsuccess.com/consulting-website), [Consultant website mistakes — Logotio](https://logotio.com/blog/consultant-website-mistakes-fix/)

---
*Feature research for: Joel Shinness Solutions — v3.0 Wavelength Rebrand*
*Researched: 2026-07-14*

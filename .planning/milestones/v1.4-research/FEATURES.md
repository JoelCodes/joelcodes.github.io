# Feature Landscape: v1.4 Design Overhaul

**Domain:** Solo consultant lead-gen portfolio — web apps, automation, AI for small businesses
**Researched:** 2026-05-14
**Scope:** Visual redesign only; content, copy, form behavior, and data preserved unchanged

---

## Context: What the Crito Template Shows

From direct inspection of the Crito reference design (images 8, 12–15):

**Homepage (Business Consulting variant):**
- Clean top navigation: logo left, links center, CTA button right — no dark mode toggle, no utility links
- Hero: large editorial headline ("We Provide Best Business Solutions"), single portrait photo right, two CTA buttons (primary + secondary "Learn More"), star rating + client count trust signal below buttons
- Client logo strip immediately below hero — 5-6 greyscale logos
- Social proof hook ("Less Accounting is trusted by thousands of companies") with a supporting Learn More link
- Services grid: 4-col card grid with category label, title, description, arrow icon — no illustrations, no color variants
- Split section: image left, value statement + 4 bullet points with icons right
- Stats strip: 4 numbers in a row (5310 each — placeholder) — clean, typography-only
- Why-choose-us: headline + 4 bulleted differentiators left, single editorial photo right
- Projects/case studies: tabbed filter row, 2x2 masonry grid, "All Recent Projects" button
- Team members: horizontal scrolling cards with name/title
- Testimonials: 3-column card carousel with stars, quote, name
- Latest news/blog: 3-col card strip, "Browse All" button
- Newsletter signup bar above footer
- Footer: 4-column layout (brand description, Company links, Help links, Resources/Links)

**Services page (05_Service):**
- Breadcrumb header with page title
- "We Provide The Best Service For Consulting" headline + description
- 8-card grid with category label, title, description, arrow CTA — one card highlighted yellow
- Why-choose-us split section with photo
- Stats strip
- Projects grid with category tabs
- Newsletter bar + footer

**Service Details page (06_Service Details = Crito's equivalent of project/case study):**
- Breadcrumb header
- Split opener: photo left, "Why choose [service]?" headline + 2-para body right
- "How We Works for Your Service" — 4-step numbered grid (Analysis, Strategy, Performance, Improvements)
- Second split section: headline + 2 feature bullets with icons
- 2-column content blocks with accordion-style benefit lists
- CTA strip: "Get Business Consulting Service" + request free consultation button
- Footer

**About Me page (Crito's 04_About):**
- Breadcrumb header
- Split opener: image left with floating stat card overlay, headline + CTA right
- Why-choose-us bullet list
- Stats strip (4 numbers)
- Full-width editorial image section
- Team members horizontal scroll
- Newsletter bar + footer

**Blog index (07_Blog):**
- "Latest Articles" section (3-col grid)
- "Featured Articles" section (3-col grid)
- "Popular Articles" section (mixed 3-col and 4-col grid)
- Pagination at bottom
- Newsletter bar + footer

**Blog detail (08_Blog Details):**
- Left column: article content with pullquote, tags, comments form
- Right sidebar: search, recent posts, categories, social follow
- Comments section with avatar + reply structure

**Contact page:** Standard form page (visible in nav but not shown in inspected images)

---

## 1. Hero Section

### Table Stakes

| Feature | Why Expected | Complexity | Static-only? | Dependencies |
|---------|--------------|------------|--------------|--------------|
| Large editorial headline, single main CTA | Visitors form impression in 8 seconds; single CTA is conversion best practice | Low | Yes | None |
| Readable subhead / supporting copy | Explains what Joel does and for whom | Low | Yes | None |
| Trust signal below CTA (years, projects, reviews, or client count) | Reduces first-impression skepticism; Crito uses star rating + client count | Low | Yes | None |
| Responsive layout (stacked on mobile) | Non-negotiable in 2026 | Low | Yes | None |
| Neutral/warm off-white background | Crito's aesthetic; replaces yellow/turquoise | Low | Yes | New token system |

**What the current hero does that maps to table stakes:**
The current bento-grid with outcome tiles expresses *what* Joel delivers. The CTA tile drives to `#contact`. These structural goals carry over; only the visual execution changes.

### Differentiators

| Feature | Value Proposition | Complexity | Static-only? | Dependencies |
|---------|-------------------|------------|--------------|--------------|
| Single authentic portrait (Joel) in hero | Consulting is a people business; photo builds personal trust faster than any copy | Low | Yes (static image) | Real headshot asset |
| One specific trust number below CTA | "15+ years" or "20+ projects" is more credible than generic trust badges | Low | Yes | None |
| Dual CTA pattern: primary + ghost | "Get Consulting" primary + "Learn More" ghost gives earlier-funnel visitors an escape hatch without diluting primary action | Low | Yes | None |

**Recommendation:** Adopt Crito's split-hero pattern — headline + subhead + dual CTA left, editorial portrait right. Drop the bento-grid entirely; it was a v1.1 neobrutalist device, not a timeless pattern. Trust signal (star rating chip or "15+ years" stat) sits beneath the CTA pair.

**Question for requirements:** Use Joel's actual selfie in the hero, or keep hero photo-free and use photo only in About section? Answer affects hero layout structure significantly.

---

## 2. Client Logo Strip / Social Proof Hook

### Table Stakes

| Feature | Why Expected | Complexity | Static-only? | Dependencies |
|---------|--------------|------------|--------------|--------------|
| Trust-signal zone immediately below hero | Anchors credibility before user scrolls; Crito places client logos here | Low | Yes | Real client logos or credible alternatives |
| Greyscale treatment | Consistent with premium agency standard; reduces visual noise | Low | Yes | None |

### Differentiators

| Feature | Value Proposition | Complexity | Static-only? | Dependencies |
|---------|-------------------|------------|--------------|--------------|
| "Trusted by" stat inline with logos | Adds weight — "15+ clients over 15 years" works even without brand logos | Low | Yes | None |
| Outcome-stat strip as substitute | If real client logos are unavailable (likely for a solo consultant), a "15+ years / 20+ projects / 3 domains" stats strip serves the same trust function | Low | Yes | None |

**Recommendation:** Joel likely cannot show client logos publicly (NDA, small business clients). Use an outcome-stats strip in this zone instead (format: large number + label, 3–4 stats in a row). Crito's stats strip pattern (4 numbers in a row) is the right model. This is a visual-only change — no new data needed, current About section already has 15+ years and 200+ students.

**Question for requirements:** What stats should appear? Current candidates: 15+ years experience, 200+ students/mentees, 3 service domains. Are there project completion counts or time-saved metrics available?

---

## 3. Services / Solutions Section

### Table Stakes

| Feature | Why Expected | Complexity | Static-only? | Dependencies |
|---------|--------------|------------|--------------|--------------|
| Named service categories visible on homepage | Visitors must understand the offering without clicking away | Low | Yes | Existing content (AI, Automations, Web Apps) |
| Brief per-service description | Scan-readable; lets prospects self-identify | Low | Yes | Existing copy |
| Arrow or link affordance on service cards | Invites deeper exploration; Crito uses arrow icon per card | Low | Yes | None |

### Differentiators

| Feature | Value Proposition | Complexity | Static-only? | Dependencies |
|---------|-------------------|------------|--------------|--------------|
| Dedicated /services page | SEO: a /services page can rank for "[service] consultant [city]" queries a homepage section cannot; also gives social-media / email link destinations | Low | Yes (static) | None new — builds on existing Services component |
| Category label above card title (Crito pattern: small orange label like "Our Services" above section heading) | Increases scan-ability, establishes visual hierarchy | Low | Yes | New token for label color |
| Grid of 4+ service cards vs 3-column | Mirrors Crito's Services page (8-card grid); exposes more granularity — e.g. could split "AI" into "AI Chatbots" and "AI Research" | Med | Yes | Content decisions |

**Services-page-or-embedded decision:**

Keep the homepage section (table stakes — users need to see services without clicking). *Also add a /services page* for SEO and link-worthy destinations. The homepage section becomes a 3–4 card summary with "View All Services" linking to /services. Complexity: Low — it is a new static page consuming the same service data, styled with the new component library.

**Important caveat for v1.4:** The /services page is a new page not currently in the site. It is in scope if the design system refactor creates the card component anyway — the page itself is trivial to assemble. Flag for requirements: is adding /services in v1.4 scope, or deferred to v1.5?

---

## 4. Process / How We Work Section

### Table Stakes

| Feature | Why Expected | Complexity | Static-only? | Dependencies |
|---------|--------------|------------|--------------|--------------|
| Numbered steps (1–N) | Makes the engagement feel concrete and low-risk; standard on all consulting/agency sites | Low | Yes | Existing 5-step copy |
| Step label + short description | Scan-readable explanation of each step | Low | Yes | Existing copy |
| Visual connector or implied sequence | Communicates order — line, numbered circles, or vertical layout | Low | Yes | None |

### Differentiators

| Feature | Value Proposition | Complexity | Static-only? | Dependencies |
|---------|-------------------|------------|--------------|--------------|
| Numbered 2x2 grid (Crito's 06_Service Details pattern: Analysis 01, Strategy 02, Performance 03, Improvements 04) | More compact than a linear vertical list; feels professional rather than bullet-list-ish | Low | Yes | None |
| Icon per step (simple line icons, not isometric) | Replaces the isometric SVGs being dropped; Crito uses simple line icons from Lucide or similar | Low | Yes | @lucide/astro (already installed) |
| "Low-risk prototype" messaging callout | Joel's actual differentiator is the prototype-before-contract step; a subtle highlight box or accent on Step 2 communicates this visually | Low | Yes | None |

**Replacing isometric SVGs:**
Crito uses simple outlined icons (4–6px stroke, minimal detail) against a white or light-grey background circle. No illustrations. This is the correct replacement pattern — isometric CSS illustrations were a neobrutalist device. @lucide/astro is already installed; use `FileSearch`, `Lightbulb`, `FileCheck`, `Hammer`, `Handshake` or similar. The icon should be decorative support, not the visual centrepiece.

**Process layout recommendation:** Adopt Crito's numbered 2x2 grid for steps 1–4, with step 5 (Handoff & Support) spanning full width or treated as a standalone CTA-adjacent block. This is more compact than the current vertical stack.

---

## 5. Why-Choose-Us / Differentiators Section

Crito's homepage has a dedicated "Reasons Why We are Best Business Consulting Agency" split section that does not have a direct equivalent in the current site. The current site embeds these points implicitly in the Hero tiles.

### Table Stakes

| Feature | Why Expected | Complexity | Static-only? | Dependencies |
|---------|--------------|------------|--------------|--------------|
| Named differentiators with icons | Converts generic "about me" into scannable competitive reasons | Low | Yes | New copy bullets; existing About copy as source |
| Image adjacent to bullet list | Crito pattern: photo right, bullets left; human element adds trust | Low | Yes | Real photo asset |

### Differentiators

| Feature | Value Proposition | Complexity | Static-only? | Dependencies |
|---------|-------------------|------------|--------------|--------------|
| Process Excellence, Listening, Plain-Language Communication, Small-Business Focus | Joel's actual differentiators as identified in his About copy — translating these into scan-worthy bullets rather than paragraphs | Low | Yes | Existing copy in About.astro |

**Recommendation:** Extract the differentiator bullets from the About narrative (15+ years breadth, plain-language communication, listen-first approach, low-risk prototype) and place them in a dedicated homepage section between Process and About. Keep the About section for the full personal story + photo. This mirrors Crito's pattern without requiring new content.

---

## 6. About Section (Homepage vs Dedicated Page)

### Table Stakes

| Feature | Why Expected | Complexity | Static-only? | Dependencies |
|---------|--------------|------------|--------------|--------------|
| Professional photo | Consulting is a people business; the face of the consultant is critical trust signal | Low | Yes | Joel's selfie (already in assets) |
| Credibility stats (years, volume) | Social proof; current 15+/200+ stat display is correct pattern | Low | Yes | Existing data |
| Personal narrative (brief version for homepage) | Contextualizes who Joel is for prospects who need it | Low | Yes | Existing copy |

### Differentiators for Dedicated /about Page

About pages for solo consultants are reportedly the second most-visited page after the homepage. Crito has a dedicated About Me page with: opener split (image + headline + CTA), why-choose-us bullets, stats strip, full editorial image, team section.

For Joel, the "team section" is irrelevant (solo). The relevant blocks are:

| Content Block | Purpose | Complexity | Static-only? | Dependencies |
|---------------|---------|------------|--------------|--------------|
| Full portrait (not cropped thumbnail) | Warm, human; bigger than homepage treatment | Low | Yes | selfie.jpg |
| Origin story (why Joel started this, who he helps) | Story creates empathy per research | Low | Yes | Existing paragraphs |
| Credentials + years stat (prominent display) | Authority proof | Low | Yes | Existing data |
| Differentiator bullets (plain language, listen-first) | Makes credentials concrete | Low | Yes | Existing copy |
| Hobby/personality section (kayaking, music) | Approachability; differentiates from corporate consultant | Low | Yes | Existing copy |
| CTA to contact | Closes the loop | Low | Yes | None |

**About-page-or-embedded decision:**

The current site embeds About in the homepage. The current decision log records this as "Good — removed nav link." For v1.4, keep the homepage About section (it's already there and working for scroll conversion) *and* consider adding a dedicated /about page for users who arrived via search or social and want deeper background. The /about page is a new page not in the current site.

**Flag for requirements:** Is /about page in v1.4 scope or deferred to v1.5? Adding it is Low complexity (reuses existing copy + photo). Argument for deferring: v1.4 already has many pages to migrate; /about adds a new build on top of all the refactors. Argument for including: the Crito template explicitly has it, and the research confirms it's the second most visited page type on consultant sites. Recommend flagging as a stretch goal for v1.4.

---

## 7. Case Study / Project Detail Layout

### Table Stakes

| Feature | Why Expected | Complexity | Static-only? | Dependencies |
|---------|--------------|------------|--------------|--------------|
| Problem → Solution → Results narrative flow | Prospects skip to results first (63% per research); the structure must deliver them in order | Low | Yes | Existing projects.json shape |
| Named section headers | "The Challenge", "The Solution", "The Results" — removes ambiguity | Low | Yes | Already in [slug].astro |
| Metrics display (large numbers) | 78% of decision-makers trust case studies with specific metrics — current results array is the right data | Low | Yes | Existing results[] in projects.json |
| Screenshots/image gallery | Visual proof of the work | Low | Yes | Existing screenshots[] |
| Technology stack list | Credibility signal for technical buyers | Low | Yes | Existing technologies[] |
| Back-to-projects navigation | Standard UX | Low | Yes | Existing |

### Differentiators

| Feature | Value Proposition | Complexity | Static-only? | Dependencies |
|---------|-------------------|------------|--------------|--------------|
| Testimonial blockquote above results (not below) | Puts the client voice next to proof; current layout buries testimonial after the results grid | Low | Yes | Existing testimonial{} in projects.json |
| Results as a visually isolated "stat card" strip (not inside a bordered box) | Crito's projects section uses clean typographic number treatments; the current yellow-bordered results box is neobrutalist and must change | Low | Yes | New Card component |
| Project category tag as styled chip at top | Sets context before reading; current Badge component does this | Low | Yes | Existing Badge component → new v2 chip |
| Inline CTA strip at bottom of case study | "Ready to solve a similar problem? Let's talk →" | Low | Yes | None new |

**Crito's 06_Service Details pattern adapted for case studies:**
Crito doesn't have case studies in the traditional sense — its "Service Details" page is a service description page, not a client story. The 2x2 numbered process grid from that page is useful for the Process section (see above) but doesn't map to Joel's case study format. Joel's existing Problem→Solution→Results→Testimonial→Tech structure is *stronger* than Crito's approach for a portfolio site. Keep the narrative structure; change only the visual presentation.

---

## 8. Projects Index Page

### Table Stakes

| Feature | Why Expected | Complexity | Static-only? | Dependencies |
|---------|--------------|------------|--------------|--------------|
| Category filter tabs | Lets visitors self-select by service type; current implementation works | Low | Yes | Existing filter JS |
| Card grid (2 or 3 columns) | Standard portfolio layout | Low | Yes | Existing ProjectCard component → new v2 |
| Card: thumbnail, title, category chip, teaser | Scan-readable; existing shape is correct | Low | Yes | Existing |
| Empty-state message | Current implementation handles "no projects yet" case | Low | Yes | Existing |

### Differentiators

| Feature | Value Proposition | Complexity | Static-only? | Dependencies |
|---------|-------------------|------------|--------------|--------------|
| Featured/highlight card (larger, top of grid) | Draws attention to Joel's best case study first | Med | Yes | Requires knowing which project to feature; projects.json would need a `featured` field |
| Project card hover state showing result metric | "85% time reduction →" as overlay on hover | Low | Yes | New CSS only |

---

## 9. Blog Index Page

### Table Stakes

| Feature | Why Expected | Complexity | Static-only? | Dependencies |
|---------|--------------|------------|--------------|--------------|
| Category/tag filter | Currently implemented with filter buttons | Low | Yes | Existing |
| Reading time per post | Currently calculated via reading-time-estimator | Low | Yes | Existing |
| 3-col card grid | Standard; current implementation | Low | Yes | Existing |
| Featured image per card | Current BlogCard uses featuredImage | Low | Yes | Existing |
| Pagination or load-more | Current "Load More" button handles this | Low | Yes | Existing JS |

### Crito Blog Pattern (from image-import-14)

Crito's blog index groups posts into **Latest Articles**, **Featured Articles**, and **Popular Articles** sections — three separate labeled groups rather than one filtered grid. Each group is a 3-col card row. Cards show: date stamp with colored background, category label, title, short description.

| Feature | Value Proposition | Complexity | Static-only? | Dependencies |
|---------|-------------------|------------|--------------|--------------|
| Section grouping (Latest / Featured) instead of flat tag-filtered grid | Gives editorial structure; "Featured" surfacing is a editorial decision, not algorithmic | Med | Yes | Requires `featured` boolean in content schema |
| Date stamp chip on card image | Crito pattern: colored overlay chip top-left of card image with day + abbreviated month | Low | Yes | New BlogCard styling |
| Category label below date | Replaces the neobrutalist tag chips | Low | Yes | New styling |

**Recommendation on blog grouping:** The Crito multi-section approach adds editorial value but requires content decisions (which posts are "featured"?). For v1.4, simplify: Latest/All posts grid with the existing tag filter. Add a `featured` flag to the content schema as a stretch goal so a "Featured Post" hero card can be added above the grid without a layout rebuild.

### Differentiators

| Feature | Value Proposition | Complexity | Static-only? | Dependencies |
|---------|-------------------|------------|--------------|--------------|
| Author surface (photo + name) on cards | For a solo consultant, the author IS the brand; putting Joel's face on posts connects blog to personal brand | Low | Yes | Static — author data in BaseLayout or config |
| "Subscribe" or newsletter prompt within blog index | Converts blog readers into leads; currently no capture mechanism on blog | Med | Yes (static form → webhook) | Newsletter destination (not yet configured) |

---

## 10. Blog Post Detail

### Table Stakes

| Feature | Why Expected | Complexity | Static-only? | Dependencies |
|---------|--------------|------------|--------------|--------------|
| Readable typography at comfortable line length | max-width ~65ch on body text | Low | Yes | New typography tokens |
| Date, reading time, tags in byline | Standard metadata; existing blog [slug].astro has these | Low | Yes | Existing |
| Syntax highlighting | Already implemented via astro-expressive-code | Low | Yes | Existing |
| Sticky TOC (table of contents) | Already implemented in v1.0; check if still present | Low | Yes | Existing |

### From Crito's 08_Blog Details (image-import-13)

Crito shows: article left column (~65%), right sidebar (~35%) with search, recent posts, categories, social follow, comments form below article. For a static site with no server-side search or comments, most sidebar elements are irrelevant. What is relevant:

| Feature | Value Proposition | Complexity | Static-only? | Dependencies |
|---------|-------------------|------------|--------------|--------------|
| Right sidebar with related posts | Keeps readers on site; can be static (Astro getCollection filtered by tag) | Med | Yes | Existing content collection |
| Pullquote styling | Editorial credibility; Crito shows this in the article body | Low | Yes | MDX prose styles |
| "Share" links (LinkedIn, copy-URL) | Easy for solo consultant content; LinkedIn is primary for B2B | Low | Yes (static JS) | None |

---

## 11. FAQ Page

### Table Stakes

| Feature | Why Expected | Complexity | Static-only? | Dependencies |
|---------|--------------|------------|--------------|--------------|
| Accordion/disclosure pattern | Reduces page length; native HTML `<details>` already implemented | Low | Yes | Existing |
| FAQPage JSON-LD schema | Already implemented; important for SEO rich results | Low | Yes | Existing |
| Readable Q&A typography | Clear visual hierarchy between question and answer | Low | Yes | New tokens |

### Differentiators

| Feature | Value Proposition | Complexity | Static-only? | Dependencies |
|---------|-------------------|------------|--------------|--------------|
| CTA at bottom of FAQ ("Still have questions? Let's talk.") | Converts FAQ visitors directly into leads; not currently present | Low | Yes | None new |
| Grouping FAQs by topic | If FAQ grows beyond 5 questions, grouped sections (Process, Pricing, Tech) aid scan-ability | Low | Yes | Content decision |

---

## 12. Contact Section / Page

### Table Stakes

| Feature | Why Expected | Complexity | Static-only? | Dependencies |
|---------|--------------|------------|--------------|--------------|
| Name, email, message at minimum | Standard form fields | Low | Yes (webhook) | Existing n8n webhook |
| Clear submit button | Non-negotiable | Low | Yes | Existing |
| /thank-you redirect after submission | Confirms form worked; existing flow | Low | Yes | Existing |
| Trust signal adjacent to form | Research confirms trust signals near forms increase conversion | Low | Yes | None new |

### Current Form State

The current form has 8 lead-qualification fields (from v1.3): name, email, business type, project type (multi-select), budget range, timeline, message. The n8n webhook integration is built. v1.4 is visual-reskin only — no field changes.

### Visual Pattern Recommendations

| Pattern | What Changes | Complexity | Static-only? |
|---------|-------------|------------|--------------|
| Two-column layout: form left, contact info + trust signals right | Crito's contact pages typically place contact info and social proof alongside the form | Low | Yes |
| Inline error + success states | Replace any neobrutalist validation styling with clean inline feedback | Low | Yes |
| Trust micro-copy near submit button ("No spam. Typically reply within 24 hours.") | Reduces friction at the moment of commitment | Low | Yes |

**Form vs scheduler:** Research shows hybrid (form + scheduler link) converts best. The /thank-you page currently has a placeholder Calendly link — this is the right hybrid pattern. After the form submits, the /thank-you page surfaces the Calendly link. No change to v1.4 scope — this is already the design intent.

---

## 13. Navigation & Header

### Table Stakes

| Feature | Why Expected | Complexity | Static-only? | Dependencies |
|---------|--------------|------------|--------------|--------------|
| Logo left, links center, CTA button right | Crito pattern; standard 2026 agency layout | Low | Yes | Existing Header.astro |
| 4-5 nav links maximum | Current: Blog, Projects, FAQ, Contact — correct count | Low | Yes | Existing |
| Sticky header | Expected on content-heavy sites | Low | Yes | CSS only |
| Mobile hamburger → drawer | Current mobile nav exists; reskin only | Low | Yes | Existing MobileNav.astro |
| No dark mode toggle | v1.4 is light-mode only; toggle removed | Low | Yes | Decision per PROJECT.md |

### Differentiators

| Feature | Value Proposition | Complexity | Static-only? | Dependencies |
|---------|-------------------|------------|--------------|--------------|
| Header contact info strip (Crito shows phone + email + hours at very top) | Signals accessibility; Crito's top utility bar | Low | Yes | Joel's contact info |

**Flag for requirements:** Crito's header includes a top utility bar (phone, email, hours, social icons). This is a team-agency pattern. For a solo consultant, it may look overwrought. Recommend omitting the utility bar; keep just logo + nav + CTA button in header. The contact info lives on the contact form.

---

## 14. Footer

### Table Stakes

| Feature | Why Expected | Complexity | Static-only? | Dependencies |
|---------|--------------|------------|--------------|--------------|
| Brand + description column | Standard; Crito pattern | Low | Yes | Existing Footer.astro |
| Navigation columns (Company, links) | Existing footer has secondary nav; reskin only | Low | Yes | Existing |
| Social icons | Already implemented with simple-icons-astro | Low | Yes | Existing |
| Copyright line | Standard | Low | Yes | Existing |

### Differentiators from Crito

| Feature | Value Proposition | Complexity | Static-only? | Dependencies |
|---------|-------------------|------------|--------------|--------------|
| Newsletter signup bar above footer | Crito places a full-width "Get update by signup newsletter" bar above the footer on every page | Med | Yes (static form → webhook/service) | Newsletter service (not yet configured) |
| 4-column footer layout (Company / Help / Resources / Links) | Crito's full 4-col footer; for a solo consultant, 2–3 columns is enough | Low | Yes | Content decision |

**Recommendation:** Skip the newsletter bar in v1.4 (newsletter integration is deferred to v1.5+ per PROJECT.md). Footer: 2 columns (nav links + social). Crito's 4-column footer is sized for an agency with many pages; Joel's current footer is right-sized.

---

## Decision Summary: Open Questions for Requirements

| Decision | Options | Recommended | Rationale |
|----------|---------|-------------|-----------|
| /services page in v1.4? | Add new page vs keep homepage-only | Add, Low complexity | SEO value; card component already needed |
| /about page in v1.4? | Add new page vs keep homepage section | Stretch goal / defer to v1.5 | v1.4 already has 10+ pages to refactor; /about is additive new work |
| Hero with Joel's photo? | Portrait in hero vs photo in About only | Portrait in hero | Crito pattern; solo consultant trust signal |
| Stats strip vs client logo strip? | Real logos (unavailable) vs stats (15+ years / 200+ mentees) | Stats strip | Joel is a solo consultant without B2B client logos |
| Newsletter bar above footer? | Include vs omit | Omit in v1.4 | Newsletter not configured; defer to v1.5 |
| Blog grouping (Latest/Featured/Popular)? | Crito multi-section vs current tag-filtered grid | Tag-filtered grid (current) + featured boolean for future | Multi-section requires editorial decisions not in scope |
| Utility bar in header? | Phone/email/hours strip vs clean logo+nav | Omit | Solo consultant, not a team agency |

---

## Anti-Features

Features to explicitly avoid in v1.4. These are agency-template clichés that actively harm a solo consultant's credibility or conversion.

### 1. Generic Stock Photography (Critical)

**What:** Team-in-conference-room photos, handshakes, diverse-group-at-whiteboard, laptop-on-desk. Crito's design images (image-import-16) show exactly this pattern.
**Why avoid:** Stock photos are widely recognized as inauthentic. For a solo consultant where the personal relationship is the product, stock photos destroy trust. 80%+ of prospects visit the website before doing business; a stock-heavy site signals "I don't take this seriously."
**Instead:** Joel's own photo in the hero and About section. For case studies, real screenshots of the work. For decorative sections, use abstract illustrations, clean typography, or subtle geometric patterns rather than generic photography.

### 2. Team Members Section

**What:** Crito includes an "Experience Team Members" section with 4 headshots.
**Why avoid:** Joel is a solo consultant. A team section with placeholder/stock faces is dishonest and creates confusion about who the client is actually hiring.
**Instead:** The About section with Joel's story IS the "team" section. If Joel needs to signal capacity, use a "trusted network of specialists" sentence in copy, not a fabricated team grid.

### 3. "Lorem Ipsum" or Placeholder Case Studies

**What:** Launching with empty case study shells or placeholder projects that go to a "Coming Soon" state.
**Why avoid:** Projects index currently shows "Coming Soon" because all projects have `draft: true`. A "Coming Soon" portfolio page signals inexperience, not growth. It's worse than having no portfolio page at all.
**Instead:** Launch with 1–2 real (even anonymized) case studies with real outcomes. If client confidentiality prevents publication, Joel's 200+ students/mentees and 15+ years provide enough material for at least one generalized case study. Alternatively, remove the /projects link from nav until cases are ready.

### 4. Over-Animated Hero

**What:** Entrance animations on every element, cascading stagger delays, particles or background video.
**Why avoid:** The current bento-grid hero has 5 separately-animated tiles with opacity 0 entrance animations. This is appropriate for the current neobrutalist design, but for the Crito-inspired clean aesthetic it reads as trying too hard. Animation creates cognitive load when the goal is immediate clarity.
**Instead:** One subtle entrance animation on the headline + subhead (fade-in, ≤ 400ms). The portrait can slide in gently. Everything else renders at full opacity. Respect `prefers-reduced-motion` (already wired up in the codebase).

### 5. Multi-CTA Button Clusters

**What:** Three or more CTA buttons in the hero or section footers (Get Started, Learn More, See Portfolio, Book a Call, Subscribe).
**Why avoid:** Decision fatigue. Each additional CTA reduces the probability any of them get clicked. Research consensus is one primary CTA per viewport.
**Instead:** One primary CTA per section. Use a secondary ghost/outline button only in the hero (where dual-CTA is justified by funnel stage diversity). All other sections: single CTA.

### 6. Testimonial Carousels with Auto-Rotation

**What:** Testimonials that auto-advance on a timer.
**Why avoid:** Auto-rotating carousels are a dark pattern — they remove user control, can cause WCAG failures (1.4.13 — content that disappears automatically is a problem for users with disabilities), and research consistently shows static testimonials outperform carousels for credibility.
**Instead:** Static testimonial cards, max 3 visible on desktop. If more testimonials exist in future, a user-controlled carousel (no auto-rotation) is acceptable.

### 7. The Services Catalog Dump

**What:** Listing every possible service variation in a 8-cell grid (Crito's 05_Service page has Business Advice, Startup Business, Financial Advice, Risk Management, and 4 more variants).
**Why avoid:** Joel has 3 service domains. An 8-cell grid implies 8 services he may not actually offer, and forces prospects to figure out which applies to them. For a solo consultant, more services = more confusion, not more credibility.
**Instead:** Keep 3 service cards matching actual capabilities (AI, Automations, Web Apps). The Services page, if added, can expand with 2–3 sub-items per category, but the card count stays tight.

### 8. Vanity Metrics

**What:** Counters like "5310 / 5310 / 5310 / 5310" (Crito's stats strip placeholder). Or "100+ projects" when the portfolio has 2 live case studies.
**Why avoid:** Sophisticated buyers cross-check claims. Inflated numbers are immediately spotted.
**Instead:** Only claim metrics that can be defended: 15+ years, 200+ students, specific project outcomes from projects.json.

### 9. Dark Mode Toggle in v1.4

**What:** Keeping the existing dark mode toggle in the header.
**Why avoid:** Dark mode is explicitly deferred in v1.4 per PROJECT.md. Shipping a broken or half-implemented toggle is worse than removing it.
**Instead:** Remove the toggle completely in v1.4. Add it back as a v1.5 feature when the new design has a validated dark mode variant.

### 10. Newsletter Signup Without a Newsletter

**What:** Crito puts a newsletter signup bar above the footer. Including this in v1.4 with no newsletter configured.
**Why avoid:** A subscribe form that either does nothing or emails Joel with no automation creates a false promise. Small business clients who sign up and receive nothing lose trust.
**Instead:** Omit until the newsletter is configured. The form widget is a one-day implementation when ready.

---

## Feature Dependencies Map

```
New token system (colors, typography, spacing)
  └── All v2 components
      ├── Hero v2 → hero portrait asset
      ├── Services v2 → existing services copy
      ├── Stats Strip → existing About credibility numbers
      ├── Process v2 → existing 5-step copy, @lucide/astro icons
      ├── Differentiators section → extracted from existing About copy
      ├── About v2 → selfie.jpg, existing narrative copy
      ├── ProjectCard v2 → projects.json (unchanged)
      ├── ProjectDetail v2 → projects.json (unchanged)
      ├── BlogCard v2 → content collection (unchanged)
      ├── BlogPost layout v2 → MDX files (unchanged)
      ├── FAQ v2 → existing faqs[] array + JSON-LD
      ├── ContactSection v2 → n8n webhook (unchanged)
      └── /thank-you v2 → existing Calendly placeholder
```

**No backend changes required for any table-stakes features.** All features are static-site compatible (Astro + Tailwind). The n8n webhook form behavior is preserved unchanged. The blog content collection is unchanged.

---

## Sources

- Crito template inspection (direct images from `/design/images/`, images 3–15)
- [Consultant website trust elements — logotio.com](https://logotio.com/blog/consultant-website-trust-elements-essential-pages)
- [Consulting website examples — melisaliberman.com](https://www.melisaliberman.com/blog/consulting-website-examples)
- [About page for consultants — knapsackcreative.com](https://knapsackcreative.com/blog-industry/consulting-about-page)
- [Hero section best practices 2026 — perfectafternoon.com](https://www.perfectafternoon.com/2025/hero-section-design/)
- [Web design trends 2026 — kontra.agency](https://kontra.agency/top-web-design-trends-for-2026/)
- [Form vs scheduler — revenuehero.io](https://www.revenuehero.io/blog/form-vs-scheduler)
- WebSearch: solo consultant hero patterns, services page SEO, case study layouts, blog design patterns, agency anti-patterns (2025–2026 queries)

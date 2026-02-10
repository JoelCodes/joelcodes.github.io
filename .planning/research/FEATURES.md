# Feature Research: Homepage Refinement (v1.2)

**Domain:** Lead-generation portfolio website (neobrutalist design)
**Researched:** 2026-02-09
**Confidence:** HIGH

## Feature Landscape

This research focuses on the INCREMENTAL features being added to an existing neobrutalist portfolio site. The base site is already built with homepage sections, blog, portfolio, contact form, and neobrutalist design system.

### Table Stakes (Users Expect These)

Features users assume exist in outcome-focused portfolio sites targeting small business clients.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Outcome-focused headline | Users want to know "what's in it for me" within 3 seconds | LOW | Hero already exists, needs reframe from problem to outcome |
| Clear value metrics | Small business clients think in ROI terms (time, money, customers) | LOW | Visual badges/icons with metrics (already have border/shadow system) |
| Process transparency | Risk-averse clients need to understand workflow before committing | LOW | Process component exists, needs descriptive text enhancement |
| Service differentiation | Clients need to understand what each service type solves | MEDIUM | Services component exists as 3 cards, needs expansion with illustrations |
| FAQ discoverability | Common questions should be easy to find and scan | LOW | FAQ exists in footer accordion, needs dedicated page |
| Trust indicators | Portfolio sites need social proof elements near CTA | LOW | Can use outcome badges, client count, testimonial snippets |
| Mobile-first layout | 60%+ traffic is mobile for service businesses | LOW | Base responsive design exists, illustrations need mobile optimization |

### Differentiators (Competitive Advantage)

Features that set this portfolio apart from generic developer sites.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Isometric mini-illustrations per process step | Makes abstract workflow concrete and memorable | MEDIUM | Neobrutalist aesthetic with thick borders, flat colors, 30-degree angles |
| Outcome badges with visual hierarchy | Transforms generic "I build stuff" into measurable business value | LOW | Leverage existing shadow-neo system, add icons/numbers |
| Technology-specific illustrations | Helps non-technical clients distinguish AI vs Automation vs Web Apps | MEDIUM | Three distinct visual metaphors with 1-2 sentence descriptions |
| Prototype-first positioning | Differentiates from "pay upfront" competitors, reduces client risk | LOW | Already in process, needs emphasis in hero/CTA |
| Neobrutalist FAQ page design | Transforms boring support page into on-brand experience | LOW | Apply existing Card/Button components with accordion interactions |
| Process narrative with "You/Joel" dialogue | Personalizes workflow, shows collaborative vs transactional approach | LOW | Already implemented in Process component, adding illustrations enhances |
| Dedicated FAQ page vs footer accordion | Improves SEO, allows richer content, better UX for multiple questions | LOW | Move existing FAQ.astro to /faq page, add navigation link |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems for lead-generation portfolio sites.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Pricing calculator | Clients want instant quotes | Custom work varies too much, creates false expectations | FAQ about pricing process, emphasize custom proposals |
| Animated isometric scenes | "Make illustrations pop" | File size bloat, accessibility issues, neobrutalist aesthetic is static | Static isometric illustrations with hover state color shifts |
| Multiple CTAs in hero | "Give users options" | Reduces conversions by 266% when competing actions present | Single primary CTA ("Start a Conversation"), secondary links in nav |
| Real-time chat widget | "Be more accessible" | Interrupts UX, adds maintenance burden, overkill for freelance | Contact form + FAQ page covers async communication |
| Interactive process timeline | "Make it engaging" | Adds JS complexity, breaks on mobile, accessibility concerns | Clean vertical timeline with illustrations (current approach works) |
| Auto-playing video background | "Show work visually" | Performance killer, accessibility nightmare, distracts from message | Static hero with outcome badges, portfolio link for visual work |
| Overly detailed service pages | "Explain everything" | Overwhelming for small business clients, delays contact | 1-2 sentence descriptions with illustrations, details in discovery call |

## Feature Dependencies

```
[Outcome badges in Hero]
    └──requires──> [Icon/illustration system]
                       └──requires──> [Neobrutalist visual style guide]

[Process illustrations] ──requires──> [Isometric design system]
                                          └──requires──> [30-degree angle consistency]
                                          └──requires──> [Brand color palette]

[Technology section] ──requires──> [Service differentiation content]
                                      └──requires──> [Illustration per tech type]

[FAQ page] ──enhances──> [SEO for support queries]
              └──requires──> [Accordion component (already exists)]

[Outcome metrics] ──enhances──> [Trust indicators]
                     └──supports──> [Conversion optimization]

[Visual illustrations] ──conflicts──> [Text-heavy descriptions]
                          (balance needed: 1-2 sentences + visual)
```

### Dependency Notes

- **Outcome badges require icon system:** Leverage existing neobrutalist border/shadow system, add simple geometric icons (time clock, dollar sign, customer avatars, rocket, lightbulb)
- **Process illustrations require isometric design system:** Maintain 30-degree angles across all five steps, use brand colors (yellow/turquoise/magenta), ensure visual consistency
- **Technology section requires service differentiation:** Build on existing Services component structure (3 cards), add illustrations that visually distinguish AI (brain/neural network), Automation (gears/connections), Web Apps (browser/interface)
- **FAQ page enhances SEO:** Dedicated /faq URL allows indexing support queries, improves discoverability vs buried footer accordion
- **Visual illustrations conflict with text-heavy descriptions:** Neobrutalist aesthetic favors bold visuals over walls of text; keep descriptions to 1-2 sentences per item

## MVP Definition for v1.2

This is a SUBSEQUENT milestone adding features to an existing v1.1 site. Focus is homepage refinement, NOT full site rebuild.

### Launch With (v1.2)

Minimum viable additions to improve homepage conversion and clarity.

- [ ] Hero section with 5 outcome badges (time saved, money saved, customers satisfied, opportunities captured, solutions delivered) — Essential for reframing value proposition
- [ ] Outcome badge design: geometric icons + short label + neobrutalist border/shadow — Leverages existing design system
- [ ] Process section enhanced descriptions (1-2 sentences per step, not just "You/Joel" format) — Adds clarity without overwhelming
- [ ] Technology section with 3 service cards (AI, Automations, Web Apps) + simple illustrations — Helps non-technical clients distinguish offerings
- [ ] FAQ moved to dedicated /faq page with navigation link — Improves discoverability and SEO
- [ ] FAQ page styling with neobrutalist accordion (reuse existing FAQ.astro structure) — Maintains brand consistency

### Add After Validation (v1.2.x)

Features to add once core refinements are validated.

- [ ] Isometric mini-illustrations for process steps (5 illustrations) — HIGH value but MEDIUM complexity, defer if timeline tight
- [ ] Refined technology illustrations (upgrade from simple to isometric style) — Once isometric design system is established
- [ ] Trust indicators in hero (client count, years experience, project count) — After collecting metrics
- [ ] Testimonial snippet near primary CTA — Once client testimonials are collected
- [ ] Enhanced FAQ categories (group by topic: Process, Pricing, Technical, Post-Project) — If FAQ grows beyond 5 questions
- [ ] Mobile-optimized illustration variants — If performance metrics show mobile issues

### Future Consideration (v2+)

Features to defer until homepage refinement is complete and validated.

- [ ] Interactive FAQ search — Low priority, current count is manageable
- [ ] Animated outcome counters (numbers incrementing on scroll) — Gimmicky, doesn't align with neobrutalist aesthetic
- [ ] Video testimonials in hero — Requires client video collection, performance concerns
- [ ] Expanded service detail pages (/services/ai, /services/automation, /services/web-apps) — Overkill for freelance, details in discovery call
- [ ] Multi-step contact form (wizard style) — Current single-page form works well, don't over-complicate

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Outcome badges in hero | HIGH (core value prop) | LOW (reuse design system) | P1 |
| Enhanced process descriptions | HIGH (reduces uncertainty) | LOW (just copy) | P1 |
| FAQ to dedicated page | MEDIUM (discoverability) | LOW (move component) | P1 |
| Technology section with illustrations | HIGH (service clarity) | MEDIUM (3 illustrations) | P1 |
| Simple geometric icons for badges | MEDIUM (visual interest) | LOW (SVG shapes) | P1 |
| Isometric process illustrations | MEDIUM (memorability) | MEDIUM (5 illustrations, design system) | P2 |
| Isometric technology illustrations | MEDIUM (visual upgrade) | MEDIUM (3 illustrations) | P2 |
| Trust indicators (metrics) | MEDIUM (social proof) | LOW (data + display) | P2 |
| FAQ categories/grouping | LOW (current count is 5) | LOW (markup change) | P3 |
| Mobile illustration optimization | LOW (mobile works) | MEDIUM (variants) | P3 |
| Interactive FAQ search | LOW (5 questions) | MEDIUM (JS required) | P3 |

**Priority key:**
- P1: Must have for v1.2 launch (addresses core milestone goals)
- P2: Should have, add when possible (enhances but not critical)
- P3: Nice to have, future consideration (optimize existing first)

## Implementation Best Practices from Research

### Outcome-Focused Hero Sections

Based on 2026 industry research, high-converting hero sections follow these patterns:

**Messaging Strategy:**
- Headlines should answer "What is this, and why should I care?" in under 3 seconds
- Focus on outcomes and benefits, not features: "Save 10 hours/week" not "Powerful automation tools"
- Single clear CTA reduces conversion friction (multiple CTAs decrease conversions by up to 266%)

**Trust Elements:**
- Trust badges, client logos, or key statistics near CTA boost credibility
- Social proof formats: "500+ happy clients" or "Featured in [Publication]"
- Outcome metrics work as trust signals: "Saved clients $2M+" or "Built 50+ solutions"

**Visual Hierarchy:**
- "Less is more" approach: slimmed-down hero versions showed 45.87% conversion uplift
- Avoid walls of text, graphics, and competing elements
- Use visual badges/icons to communicate value at a glance

**Testing Recommendations:**
- A/B test headline variations (benefit-driven vs. problem-focused)
- Track bounce rate, click-through rate, scroll depth, time on page
- Run quarterly optimization tests

### Isometric Illustration Implementation

Based on 2026 design trends and neobrutalist aesthetic:

**Design Principles:**
- Maintain consistent 30-degree angles across all illustrations for visual coherence
- Use brand colors (yellow/turquoise/magenta) strategically within illustrations
- Keep illustrations purposeful and simple, not decorative fluff
- Pair accent-colored backgrounds with simple black line illustrations for balance

**Tools & Resources:**
- Adobe Illustrator remains industry standard for isometric vector creation
- Isometric grid feature ensures proper angle consistency
- For neobrutalist style: thick borders, flat colors, no gradients, 100% opacity black shadows

**Accessibility Considerations:**
- Decorative illustrations should have empty alt text (alt="") to avoid screen reader clutter
- WCAG 2.2 requires alt="" for pure decoration (aesthetic purpose only, no information)
- If illustration conveys process information, use descriptive alt text
- Ensure illustrations don't rely solely on color to convey meaning

**Use Cases:**
- Process visualization (5-step workflow)
- Service differentiation (AI vs Automation vs Web Apps)
- Workflow tools and SaaS products benefit most from isometric style
- Spatial or process visualization makes abstract concepts concrete

### Process Step Visualization

Based on workflow design research:

**Content Strategy:**
- Use 1-2 sentences per step to provide context without overwhelming
- Number steps clearly (1-5) with visual hierarchy
- Show progression with vertical timeline, not horizontal (mobile-friendly)
- Include "You/Joel" dialogue format to personalize collaborative nature

**Visual Enhancements:**
- Isometric mini-illustrations per step make workflow memorable
- Use consistent visual language (same angle, style, color palette)
- Show characters or objects "progressing" through steps if using illustrations
- Avoid animated timelines (accessibility issues, mobile problems)

**Process Infographic Patterns:**
- Circular layouts work for iterative processes (not applicable here)
- Flow charts work for multiple paths (not applicable for linear 5-step)
- Vertical timeline with illustrations works best for mobile-first sequential processes

### Technology/Service Differentiation

Based on portfolio design trends:

**Organization Strategies:**
- Group services into distinct categories with visual separation
- Use subheaders and icons/illustrations to aid navigation
- No more than 7 items per category for scannability
- Each service needs 1-2 sentence description + visual metaphor

**Portfolio-Specific Recommendations:**
- Show tech stack used in projects (transparency builds trust)
- Case studies should explain: problem → approach → technologies → results
- Lead with strongest work (first 30 seconds are critical)
- "View Live" and "View Code" CTAs above the fold for each project

**Service Card Design:**
- Three-column grid for desktop (already implemented)
- Stack vertically on mobile
- Consistent visual treatment (neobrutalist Cards with yellow accents)
- Illustration + title + short description + example format works well

### FAQ Page Design

Based on 2026 FAQ best practices:

**Layout Strategy:**
- Accordion format keeps content organized and space-efficient
- Group similar questions with subheaders if count exceeds 7
- Link most popular questions to top of page
- Allow multiple accordion items open simultaneously (user control)

**Placement Recommendations:**
- Dedicated /faq page better than buried footer for discoverability
- Include in main navigation or support/contact page links
- FAQ pages improve SEO for support queries
- Better to reveal all content if users need most answers vs clicking each item

**Content Organization:**
- Current 5 questions is manageable without categories
- Add categories when question count exceeds 7-10
- Common categories: Billing, Process, Technical, Timeline, Post-Project
- Keep answers concise (1-2 paragraphs max)

**Interaction Patterns:**
- Native HTML `<details>` accordion is zero-JS, accessible
- Avoid auto-closing previous item (frustrating when comparing)
- Use accordions when users need 1-2 answers, not when they need all content
- For small question count (5), expanded view could work instead of accordion

## Neobrutalist Design Constraints

Existing design system constraints that inform feature implementation:

**Visual Language:**
- Yellow (#ffef6a), turquoise, magenta OKLCH palette
- 3/10 density (white space, not crowded)
- Quirky headings (Bricolage Grotesque)
- Bold 3px borders on everything
- Hard offset shadows (no blur)
- Shadow-to-glow transformation in dark mode

**Component System:**
- Cards with border + shadow-neo variants
- Buttons with 3-layer hardware-accelerated technique
- Native HTML accordions (FAQ)
- Typography: two-tier (neobrutalist headings, readable body)

**Illustration Guidelines for Neobrutalism:**
- Raw, unrefined shapes (rectangles, circles, polygons)
- Thick borders, flat icons, vibrant colors
- Black shadows at 100% opacity
- No gradients, no soft shadows, no blur effects
- Intentionally loud and saturated with bold accents
- Simple black line illustrations on accent-colored backgrounds

**Accessibility Compliance:**
- WCAG 2.2 AA compliant (98.7% manual audit in v1.1)
- Playwright + axe-core automated validation in CI
- Color contrast ratios meet AA standards
- Keyboard navigation support
- Screen reader compatible

## Dependencies on Existing Features

These new features build on the existing v1.1 foundation:

| Existing Feature | How v1.2 Uses It |
|------------------|------------------|
| Hero component | Reframe messaging from problem-first to outcome-first, add badges |
| Services component (3 cards) | Expand to Technology section, add illustrations |
| Process component (5-step timeline) | Add detailed descriptions, optionally add isometric illustrations |
| FAQ component (footer accordion) | Move to dedicated /faq page, keep accordion structure |
| Card component | Use for technology cards, FAQ page layout |
| Button component | Use for FAQ page CTAs |
| Border/shadow system | Apply to outcome badges, maintain visual consistency |
| Dark mode system | Ensure illustrations work in both light/dark modes |
| Responsive grid | Technology section uses existing 3-column grid |
| Typography system | Apply to new content (hero outcomes, process descriptions) |

**Integration Notes:**
- All new features use existing Astro components (Card, Button)
- Illustrations must work with shadow-to-glow dark mode transformation
- Color palette constrained to yellow/turquoise/magenta
- No new design patterns needed, only content/illustration additions

## Sources

**Outcome-Focused Hero Sections:**
- [Hero Section Design: Best Practices & Examples for 2026](https://www.perfectafternoon.com/2025/hero-section-design/)
- [Website Hero Section Best Practices + Examples](https://prismic.io/blog/website-hero-section)
- [I've Studied 50+ Hero Section Examples: Here Are the Best](https://thrivethemes.com/hero-section-examples/)
- [Hero Section Test That Led To A 50% Increase In Conversions](https://carrot.com/blog/hero-section-conversion-test/)
- [High-Converting SaaS Landing Pages: 2026 Best Practices](https://www.saashero.net/design/enterprise-landing-page-design-2026/)

**Isometric Illustration Design:**
- [Isometric websites - 28+ Best Isometric Web Design Ideas 2026](https://99designs.com/inspiration/websites/isometric)
- [8 Inspiring Examples of Isometric Illustrations in Web Design](https://speckyboy.com/isometric-illustrations-web-design/)
- [The Complete Guide to Website Illustrations: A 2026 Strategic Toolkit](https://getillustrations.com/blog/the-complete-guide-to-website-illustrations-a-2026-strategic-toolkit/)
- [What is Isometric Design? A Web Designer's Guide](https://elements.envato.com/learn/isometric-design-trend-web-design)

**Process Visualization:**
- [28 Process Infographic Examples with Design Tips](https://venngage.com/blog/process-infographic-examples/)
- [The Complete Guide to Website Illustrations: A 2026 Strategic Toolkit](https://getillustrations.com/blog/the-complete-guide-to-website-illustrations-a-2026-strategic-toolkit/)

**Service Differentiation:**
- [19 Best Portfolio Design Trends (In 2026)](https://colorlib.com/wp/portfolio-design-trends/)
- [How to Build a Strong Tech Portfolio in 2026](https://rkycareers.com/blog/how-to-build-strong-tech-portfolio-2026/)

**FAQ Design:**
- [20 Best FAQ Pages (+ How To Create Your Own) (2026)](https://www.shopify.com/blog/120928069-how-to-create-faq-page)
- [9 FAQ website examples: Designs that improve support and conversions](https://webflow.com/blog/faq-pages)
- [How To Implement Accordion UI Design: Pros, Cons, and Tips (2026)](https://www.shopify.com/blog/accordion-ui-design)
- [How to Design a Better FAQ Page: 5 Best Practices](https://www.orbitmedia.com/blog/faq-page-design-best-practices/)

**Neobrutalist Design:**
- [Neobrutalism: Definition and Best Practices - Nielsen Norman Group](https://www.nngroup.com/articles/neobrutalism/)
- [Trend Deep Dive: Neo-brutalism](https://author.envato.com/hub/trend-deep-dive-neo-brutalism/)
- [How can I design in the Neo Brutalism style?](https://medium.com/@sepidy/how-can-i-design-in-the-neo-brutalism-style-d85c458042de)

**Accessibility:**
- [Decorative Images - Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/tutorials/images/decorative/)
- [An alt Decision Tree - Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/tutorials/images/decision-tree/)
- [Image Alt Text for Better Accessibility](https://www.wcag.com/blog/good-alt-text-bad-alt-text-making-your-content-perceivable/)

---
*Feature research for: Homepage Refinement (v1.2)*
*Researched: 2026-02-09*

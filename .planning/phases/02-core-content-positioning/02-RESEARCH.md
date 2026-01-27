# Phase 2: Core Content & Positioning - Research

**Researched:** 2026-01-26
**Domain:** Content strategy, copywriting, and information architecture for developer service websites
**Confidence:** MEDIUM

## Summary

This phase focuses on implementing homepage content sections (value proposition, services, process, FAQ, about) with effective copywriting and visual hierarchy. The research covered content strategy patterns for service provider websites, copywriting formulas (particularly problem-first approaches), semantic HTML structure, and Astro component organization.

The standard approach combines **semantic HTML5 structure** (`<main>`, `<section>`, `<article>`) with **proven copywriting frameworks** (PAS formula: Problem-Agitate-Solve) and **clear visual hierarchy** (above-the-fold CTA, scannable sections, credibility signals). For Astro implementation, this means creating reusable components in `src/components/` that compose into sections on the homepage.

**Primary recommendation:** Structure the homepage with semantic HTML sections, use the PAS copywriting formula for the hero section, implement collaborative language ("we" not "you vs. me") in the process section, and place credibility signals (numbers, experience) strategically in the about section. Keep all content scannable with clear headings and concise copy.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.x | Static site framework | Zero-JS by default, component-based architecture, semantic HTML support |
| Semantic HTML5 | N/A | Document structure | Accessibility, SEO, screen reader support - MDN verified best practice |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| TypeScript | 5.x | Type safety for props | Recommended for all Astro components per official docs |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Semantic HTML | All `<div>` elements | Loses accessibility, SEO benefits - not recommended |
| Astro components | Framework components (React/Vue) | Adds unnecessary client-side JS for static content |

**Installation:**
Already installed in Phase 1. No additional dependencies needed for content implementation.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── Hero.astro           # Value proposition + CTA
│   ├── Services.astro       # Three-column service cards
│   ├── Process.astro        # Vertical timeline steps
│   ├── FAQ.astro           # Question/answer accordion or list
│   └── About.astro         # Personal story + credibility
├── layouts/
│   └── Layout.astro        # Already exists from Phase 1
└── pages/
    └── index.astro         # Composes all sections
```

### Pattern 1: Semantic Section Components
**What:** Each homepage section is an Astro component that uses semantic HTML elements and accepts props for content.
**When to use:** For all major content sections (Hero, Services, Process, FAQ, About).
**Example:**
```astro
---
// src/components/Hero.astro
interface Props {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref: string;
}

const { headline, subheadline, ctaText, ctaHref } = Astro.props;
---

<section class="hero">
  <div class="container">
    <h1>{headline}</h1>
    <p class="subheadline">{subheadline}</p>
    <a href={ctaHref} class="cta-button">{ctaText}</a>
  </div>
</section>
```
**Source:** [Astro Components Documentation](https://docs.astro.build/en/basics/astro-components/)

### Pattern 2: Component Composition in Pages
**What:** Pages import and compose section components with content passed as props.
**When to use:** For the homepage (index.astro) assembling all sections.
**Example:**
```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
import Process from '../components/Process.astro';
import FAQ from '../components/FAQ.astro';
import About from '../components/About.astro';
---

<Layout title="Joel Shinness - Full-Stack Developer">
  <main>
    <Hero
      headline="Tired of off-the-shelf tools that don't fit?"
      subheadline="Custom web apps, automation, and AI integration for small businesses"
      ctaText="Start a Conversation"
      ctaHref="/contact"
    />
    <Services />
    <Process />
    <FAQ />
    <About />
  </main>
</Layout>
```
**Source:** [Astro Project Structure](https://docs.astro.build/en/basics/project-structure/)

### Pattern 3: Semantic HTML Structure
**What:** Use `<main>` for primary content, `<section>` for thematic groupings, `<article>` for self-contained content, with proper heading hierarchy.
**When to use:** For all content markup within components.
**Example:**
```html
<main>
  <section class="hero">
    <h1>Main Headline</h1>
    <p>Supporting text</p>
  </section>

  <section class="services">
    <h2>Services</h2>
    <div class="card-grid">
      <article class="service-card">
        <h3>Web Apps</h3>
        <p>Description</p>
      </article>
      <!-- More cards -->
    </div>
  </section>

  <section class="about">
    <h2>About</h2>
    <p>Story content</p>
  </section>
</main>
```
**Source:** [MDN Semantic HTML Structure](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents)

### Anti-Patterns to Avoid
- **Generic `<div>` soup:** Using `<div>` instead of semantic elements like `<section>`, `<article>`, `<header>`. Harms accessibility and SEO.
- **Multiple `<main>` elements:** Only one `<main>` per page. MDN explicitly states this.
- **Buried CTAs:** Placing primary call-to-action below the fold or at bottom of page. Users should see it immediately.
- **Resume dump in About:** Listing every job/skill chronologically. Instead, weave narrative with specific credibility signals.
- **Vague value propositions:** Generic headlines like "Quality Solutions" don't communicate specific value.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Content management | Custom CMS/database | Astro Content Collections (if needed later) | Built-in type safety, schema validation, 5x faster builds per Astro docs |
| Copywriting formulas | Ad-hoc persuasive writing | PAS formula (Problem-Agitate-Solve) | Proven framework with emotional journey, multiple verified examples |
| Visual hierarchy | Random font sizes/colors | Design system from Phase 1 (Tailwind, OKLCH) | Consistent spacing, color contrast, accessibility |
| Accessibility | Manual ARIA attributes | Semantic HTML first | Screen readers understand semantic elements natively, per MDN |

**Key insight:** Content strategy and copywriting have established patterns that work. The PAS formula (Problem-Agitate-Solve) is documented across multiple sources as effective for service provider websites. Don't invent new persuasive patterns—use proven frameworks.

## Common Pitfalls

### Pitfall 1: Content Below the Fold
**What goes wrong:** Primary value proposition, headline, or CTA placed where users must scroll to see it.
**Why it happens:** Designers prioritize visual aesthetics over conversion hierarchy.
**How to avoid:** Hero section should occupy 60-100% of viewport height on desktop, 50-70% on mobile. Headline, subheadline, and CTA must all be visible without scrolling.
**Warning signs:** Bounce rate increases, CTA click-through decreases, users leave before scrolling.
**Source:** [Hero Section CTA Best Practices 2026](https://www.landingpageflow.com/post/best-cta-placement-strategies-for-landing-pages)

### Pitfall 2: Multiple Primary CTAs (Decision Fatigue)
**What goes wrong:** Homepage has many competing call-to-action buttons with equal visual weight.
**Why it happens:** Trying to give users "options" but actually creating decision paralysis.
**How to avoid:** One primary CTA per section. If secondary option needed, make it visually subordinate (outline vs. solid, smaller, less contrast).
**Warning signs:** Low conversion rates despite traffic, heatmaps show users clicking around but not converting.
**Source:** [CTA Button Design Best Practices](https://cieden.com/book/atoms/button/key-elements-of-cta-button-design)

### Pitfall 3: Vendor vs. Partner Language
**What goes wrong:** Copy uses "I/me" (vendor) and "you" (client) language instead of collaborative "we."
**Why it happens:** Default to transactional service provider framing.
**How to avoid:** Process section should show "what client does AND what Joel does" with collaborative framing. Use "we" when describing the working relationship.
**Warning signs:** Copy feels distant, transactional, or impersonal. Client perceives vendor relationship not partnership.
**Source:** [Collaborative Service Provider Language 2026](https://www.baytechconsulting.com/blog/how-to-choose-software-partner-in-2026)

### Pitfall 4: Inaccessible Semantic Structure
**What goes wrong:** Improper heading hierarchy (h1 → h3, skipping h2) or missing semantic landmarks.
**Why it happens:** Visual design doesn't match semantic structure.
**How to avoid:** Each section starts with appropriate heading level (h1 for page title, h2 for section headings, h3 for subsections). Screen reader users rely on this structure for navigation.
**Warning signs:** Accessibility audits fail, screen reader testing reveals poor navigation.
**Source:** [MDN Semantic Structure](https://developer.mozilla.org/en/docs/Learn_web_development/Core/Structuring_content/Structuring_documents)

### Pitfall 5: Over-Agitation in Problem-First Copy
**What goes wrong:** PAS formula agitation section becomes fear-mongering or too negative.
**Why it happens:** Misunderstanding "agitate" as "scare."
**How to avoid:** Balance is key. Agitate the problem enough to create urgency, but maintain credibility. Problem-first doesn't mean doom-and-gloom.
**Warning signs:** Copy feels manipulative, users express distrust, tone doesn't match brand.
**Source:** [PAS Copywriting Formula Examples](https://www.lucianoviterale.com/blog/copywriting/pas-copywriting-formula/)

### Pitfall 6: FAQ as Afterthought
**What goes wrong:** FAQ section has generic questions or misses actual client concerns.
**Why it happens:** Writing FAQs without researching real client objections and questions.
**How to avoid:** Base FAQs on actual client conversations, discovery call questions, and objections. Categories should include: process/timeline, pricing/budget, scope/fit, technical approach.
**Warning signs:** FAQ section doesn't reduce support questions, clients still ask the same things.
**Source:** [FAQ Page Best Practices](https://blog.hubspot.com/service/faq-page)

## Code Examples

Verified patterns from official sources:

### Three-Column Service Cards with Flexbox
```astro
---
// src/components/Services.astro
const services = [
  {
    title: "Web Apps",
    description: "Custom applications built for your exact workflow.",
    example: "Like a custom CRM for your sales team"
  },
  {
    title: "Automation",
    description: "Connect your tools and eliminate manual work.",
    example: "Like syncing orders to your fulfillment system"
  },
  {
    title: "AI Development",
    description: "Intelligent features that enhance your product.",
    example: "Like smart document processing for your team"
  }
];
---

<section class="services">
  <div class="container">
    <h2>Services</h2>
    <div class="service-grid">
      {services.map(service => (
        <article class="service-card">
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <p class="example">{service.example}</p>
        </article>
      ))}
    </div>
  </div>
</section>

<style>
  .service-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  @media (max-width: 768px) {
    .service-grid {
      grid-template-columns: 1fr;
    }
  }

  .service-card {
    padding: 2rem;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
  }
</style>
```
**Source:** Synthesized from [Card UI Design Best Practices](https://blog.logrocket.com/ux-design/ui-card-design/) and [Astro Components](https://docs.astro.build/en/basics/astro-components/)

### Vertical Process Timeline
```astro
---
// src/components/Process.astro
const steps = [
  {
    number: 1,
    title: "Discovery",
    client: "You share your challenges and goals",
    joel: "I ask questions and take notes"
  },
  {
    number: 2,
    title: "Prototype",
    client: "You provide feedback on initial concepts",
    joel: "I build a clickable demo of the solution"
  },
  {
    number: 3,
    title: "Proposal",
    client: "You review scope, timeline, and investment",
    joel: "I outline the project plan and pricing"
  },
  {
    number: 4,
    title: "Build",
    client: "You stay in the loop with regular updates",
    joel: "I develop, test, and refine your solution"
  },
  {
    number: 5,
    title: "Handover",
    client: "You receive training and documentation",
    joel: "I deploy and ensure you're confident using it"
  }
];
---

<section class="process">
  <div class="container">
    <h2>How We Work Together</h2>
    <div class="timeline">
      {steps.map(step => (
        <article class="step">
          <div class="step-number">{step.number}</div>
          <h3>{step.title}</h3>
          <div class="roles">
            <p><strong>You:</strong> {step.client}</p>
            <p><strong>Joel:</strong> {step.joel}</p>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>

<style>
  .timeline {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .step {
    padding: 1.5rem;
    border-left: 3px solid var(--accent-color);
    background: var(--card-background);
    position: relative;
  }

  .step-number {
    position: absolute;
    left: -1.5rem;
    top: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
    background: var(--accent-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
</style>
```
**Source:** Synthesized from [Workflow Visualization Best Practices](https://creately.com/guides/workflow-visualization/) and user requirements

### FAQ Accordion Pattern (Optional Enhancement)
```astro
---
// src/components/FAQ.astro
const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "Every project is different. Discovery and prototyping usually take 1-2 weeks, then we'll outline a timeline in the proposal based on scope."
  },
  {
    question: "Do you work with clients outside your area?",
    answer: "Absolutely. Most client communication happens over video calls and email. Location doesn't matter."
  },
  {
    question: "What if I'm not sure exactly what I need?",
    answer: "That's what discovery is for. We'll talk through your challenges and I'll help clarify what solution makes sense."
  },
  {
    question: "How do you handle changes during the project?",
    answer: "Small adjustments are normal. Larger scope changes are discussed together and may adjust the timeline or investment."
  }
];
---

<section class="faq">
  <div class="container">
    <h2>Common Questions</h2>
    <div class="faq-list">
      {faqs.map(faq => (
        <article class="faq-item">
          <h3 class="faq-question">{faq.question}</h3>
          <p class="faq-answer">{faq.answer}</p>
        </article>
      ))}
    </div>
  </div>
</section>

<style>
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .faq-item {
    padding: 1.5rem;
    background: var(--card-background);
    border-radius: 0.5rem;
  }

  .faq-question {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }
</style>
```
**Source:** Synthesized from [FAQ Page Examples](https://blog.hubspot.com/service/faq-page)

### About Section with Credibility Signals
```astro
---
// src/components/About.astro
---

<section class="about">
  <div class="container about-grid">
    <div class="about-image">
      <img src="/images/joel-working.jpg" alt="Joel working at desk with code visible on screen" />
    </div>
    <div class="about-content">
      <h2>About Joel</h2>
      <p>
        I've been building custom software for small businesses for over 10 years,
        working with 50+ clients to solve problems that off-the-shelf tools can't handle.
      </p>
      <p>
        Before going independent, I worked at [relevant experience]. Now I focus on
        helping businesses like yours get exactly what they need without the enterprise
        price tag.
      </p>
      <p>
        When I'm not coding, you'll find me [personal detail that humanizes].
      </p>
      <div class="credentials">
        <div class="stat">
          <strong>10+</strong>
          <span>Years Experience</span>
        </div>
        <div class="stat">
          <strong>50+</strong>
          <span>Projects Delivered</span>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 3rem;
    align-items: center;
  }

  @media (max-width: 768px) {
    .about-grid {
      grid-template-columns: 1fr;
    }
  }

  .credentials {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
  }

  .stat {
    display: flex;
    flex-direction: column;
  }

  .stat strong {
    font-size: 2rem;
    color: var(--accent-color);
  }
</style>
```
**Source:** Synthesized from [Developer Portfolio About Section Best Practices](https://brainstation.io/career-guides/how-to-build-a-web-developer-portfolio) and [Credibility Signals Research](https://thevisualcommunicationguy.com/2026/01/22/the-psychology-of-trust-what-makes-us-choose-one-service-provider-over-another/)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| jQuery-based interactive components | Zero-JS Astro components with optional progressive enhancement | Astro 2.0+ (2023) | Faster page loads, better SEO, simpler maintenance |
| Vendor/client transactional language | Collaborative partnership language ("we") | 2025-2026 trend | Positions developer as partner not commodity |
| Generic "quality solutions" copy | Problem-first value propositions (PAS formula) | Ongoing refinement | Higher engagement, clearer positioning |
| All `<div>` markup | Semantic HTML5 (`<main>`, `<section>`, `<article>`) | HTML5 spec (stable since 2014) | Better accessibility, SEO, screen reader support |
| Build-time only content | Astro Content Layer API with runtime fetching | Astro 5.0 (late 2025) | Flexibility for future dynamic content needs |

**Deprecated/outdated:**
- **jQuery for simple interactions:** Modern CSS and minimal vanilla JS handle most UI needs. Astro's zero-JS default is the standard.
- **"I do X for you" service framing:** Collaborative "we work together" language is the 2026 standard per multiple sources.
- **Resume-style About sections:** Narrative storytelling with specific credibility signals (numbers) performs better than chronological job lists.

## Open Questions

Things that couldn't be fully resolved:

1. **Optimal FAQ question count**
   - What we know: FAQs should address real client questions, organized by category
   - What's unclear: Ideal number of questions (too few = incomplete, too many = overwhelming)
   - Recommendation: Start with 4-6 core questions covering process, pricing, scope, and technical fit. Add more based on actual client questions post-launch.

2. **Image requirements for About section**
   - What we know: Working/candid photo preferred over headshot, code visible on screen
   - What's unclear: Specific image dimensions, aspect ratio, or whether stock photo acceptable if custom not available
   - Recommendation: Use 4:3 or 16:9 aspect ratio, minimum 800px width. Real photo strongly preferred but proceed with best available.

3. **Mobile-first vs. desktop-first component development**
   - What we know: Mobile responsiveness is critical, vertical stacking works well on mobile
   - What's unclear: Whether to design mobile-first or desktop-first for this specific project
   - Recommendation: Desktop-first is acceptable given existing Tailwind setup and target audience (small business decision-makers likely browsing on desktop during work hours). Ensure mobile works but optimize for desktop experience.

4. **Exact headline wording**
   - What we know: Problem-first approach works, PAS formula is effective, should avoid vague generics
   - What's unclear: Specific headline that balances problem-first with approachability
   - Recommendation: User's suggested "Tired of off-the-shelf tools that don't fit?" follows PAS problem statement. Test variations during implementation: "Tired of X?" vs "Struggling with X?" vs "X holding you back?"

## Sources

### Primary (HIGH confidence)
- [Astro Components Documentation](https://docs.astro.build/en/basics/astro-components/) - Component structure and best practices
- [Astro Project Structure](https://docs.astro.build/en/basics/project-structure/) - Recommended folder organization
- [MDN Semantic HTML Structure](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents) - Semantic elements usage and best practices

### Secondary (MEDIUM confidence)
- [Hero Section CTA Best Practices 2026](https://www.landingpageflow.com/post/best-cta-placement-strategies-for-landing-pages) - Above-fold positioning, single primary CTA
- [PAS Copywriting Formula Examples](https://www.lucianoviterale.com/blog/copywriting/pas-copywriting-formula/) - Problem-Agitate-Solve framework with real examples
- [Card UI Design Best Practices](https://blog.logrocket.com/ux-design/ui-card-design/) - Three-column layout, visual hierarchy
- [Developer Portfolio About Section Best Practices](https://brainstation.io/career-guides/how-to-build-a-web-developer-portfolio) - Humanizing, credibility signals, narrative approach
- [Workflow Visualization Best Practices](https://creately.com/guides/workflow-visualization/) - Vertical timeline, clear labels, visual flow
- [FAQ Page Best Practices](https://blog.hubspot.com/service/faq-page) - Question organization, addressing real concerns
- [Collaborative Service Provider Language 2026](https://www.baytechconsulting.com/blog/how-to-choose-software-partner-in-2026) - Partnership vs. vendor framing
- [Credibility Signals Research](https://thevisualcommunicationguy.com/2026/01/22/the-psychology-of-trust-what-makes-us-choose-one-service-provider-over-another/) - Trust factors, statistics, social proof

### Tertiary (LOW confidence - WebSearch only, flagged for validation)
- [Web Design Best Practices 2026](https://contentsquare.com/guides/web-design/best-practices/) - General web design principles
- [Value Proposition Examples](https://www.helpscout.com/blog/value-proposition-examples/) - Value prop frameworks
- [Astro Content Collections Guide 2026](https://inhaq.com/blog/getting-started-with-astro-content-collections/) - Content collections overview (future enhancement, not needed for this phase)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official Astro and MDN documentation verified
- Architecture: HIGH - Official Astro project structure and semantic HTML from MDN
- Pitfalls: MEDIUM - Derived from multiple 2026 web sources, cross-referenced but not single authoritative source
- Copywriting patterns: MEDIUM - PAS formula verified across multiple sources, but specific application to developer services is synthesis
- Code examples: MEDIUM - Synthesized from official docs and best practices, not verbatim from single source

**Research date:** 2026-01-26
**Valid until:** 60 days (content strategy and copywriting patterns evolve slowly, Astro framework is stable at v5.x)

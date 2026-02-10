# Architecture Research: Homepage Refinements Integration

**Domain:** Homepage enhancement for existing neobrutalist portfolio site
**Researched:** 2026-02-09
**Confidence:** HIGH

## Existing Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      BaseLayout.astro                        │
│  (HTML shell, SEO, fonts, dark mode, Header/Footer)         │
├─────────────────────────────────────────────────────────────┤
│                        Header.astro                          │
│  (Sticky nav, dark mode toggle, mobile menu)                 │
├─────────────────────────────────────────────────────────────┤
│                          MAIN                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              src/pages/index.astro                   │    │
│  │  (Imports and stacks homepage section components)   │    │
│  │                                                       │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │ Hero.astro                                   │    │    │
│  │  │ - Problem-first value prop                   │    │    │
│  │  │ - Uses Button.astro                          │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  │                                                       │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │ Services.astro                               │    │    │
│  │  │ - 3-card service overview                    │    │    │
│  │  │ - Uses Card.astro (yellow)                   │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  │                                                       │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │ Process.astro                                │    │    │
│  │  │ - 5-step vertical timeline                   │    │    │
│  │  │ - "You/Joel" collaborative format            │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  │                                                       │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │ homepage/TechSection.astro                   │    │    │
│  │  │ - 4-card tech stack grid                     │    │    │
│  │  │ - Uses Card.astro (magenta)                  │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  │                                                       │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │ About.astro                                  │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  │                                                       │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │ homepage/ContactSection.astro                │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│                       Footer.astro                           │
│  (Copyright, social links, FAQ accordion)                    │
└─────────────────────────────────────────────────────────────┘
```

### Component Location Patterns

| Pattern | Examples | Rationale |
|---------|----------|-----------|
| **Root components** | `Hero.astro`, `Services.astro`, `Process.astro`, `About.astro` | Reusable across multiple pages, generic |
| **Page-specific** | `homepage/TechSection.astro`, `homepage/ContactSection.astro` | Only used on homepage, more specific |
| **UI primitives** | `ui/Card.astro`, `ui/Button.astro`, `ui/Input.astro` | Reusable building blocks |
| **Layout** | `layout/Header.astro`, `layout/Footer.astro`, `layout/MobileNav.astro` | Site-wide structure |

### Current Component Dependencies

```
Hero.astro
  └── ui/Button.astro

Services.astro
  ├── ui/Card.astro (variant="yellow")
  └── ui/Button.astro

Process.astro
  └── (no dependencies, custom styled)

homepage/TechSection.astro
  └── ui/Card.astro (variant="magenta")

Footer.astro
  └── (FAQ accordion inline, lucide-static icons)
```

## Milestone Integration Points

### 1. Hero Section Enhancement (MODIFY Hero.astro)

**Current state:**
- Single bordered box with headline
- One-liner value prop
- Single CTA button

**Required changes:**
- Add outcome-focused messaging (modify headline + value prop)
- Add visual badges/trust indicators (new markup)
- Maintain existing Button.astro dependency

**Integration considerations:**
- **No new components needed** — Hero.astro already exists at correct level
- **Styling:** Use existing shadow utilities (`shadow-neo-yellow`, `shadow-neo-turquoise`)
- **Badges:** Can be inline SVG or new simple badge elements with Card.astro styling
- **Layout:** Existing container structure supports additional elements

**Modification scope:** MEDIUM
- Update headline copy
- Add badge container below/beside headline
- Possibly adjust layout from pure-center to accommodate badges

### 2. Process Section Enhancement (MODIFY Process.astro)

**Current state:**
- 5-step vertical timeline with turquoise line
- Numbered circle markers
- "You/Joel" dialogue boxes per step

**Required changes:**
- Add detailed descriptions (expand existing content)
- Add isometric illustrations per step (new asset integration)

**Integration considerations:**
- **No new components needed** — Process.astro already exists
- **Illustration assets:** Need to determine format and location
  - Recommended: `/public/images/process/step-{1-5}.svg` or `.png`
  - Reference via `/images/process/step-1.svg` in component
- **Layout adjustment:** Current `pl-12` (padding-left) for timeline content may need adjustment to accommodate illustrations
  - Could use flexbox/grid to place illustration beside content
  - Or stack illustration above "You/Joel" boxes on mobile, side-by-side on desktop

**Modification scope:** MEDIUM-HIGH
- Expand content copy within existing structure
- Add `<img>` tags per step
- Adjust layout CSS for illustration placement
- Responsive considerations for illustration sizing

### 3. Technology Section Redesign (MODIFY TechSection.astro)

**Current state:**
- Split layout: left philosophy text, right 4-card grid (Frontend, Backend, AI/ML, Infrastructure)
- All cards use Card.astro with magenta variant
- Technologies listed as bullet points within cards

**Required changes:**
- Reorganize into 3 categories: AI, Automations, Web Apps
- Add illustrations per category
- Maintain philosophy text or replace with new messaging

**Integration considerations:**
- **No new components needed** — TechSection.astro in `homepage/` already page-specific
- **Card.astro reuse:** Can continue using Card.astro component
- **Illustration assets:** Need to determine format
  - Recommended: `/public/images/tech/ai.svg`, `/public/images/tech/automations.svg`, `/public/images/tech/web-apps.svg`
- **Layout adjustment:** Current grid is `grid-cols-1 sm:grid-cols-2`
  - For 3 categories: `grid-cols-1 md:grid-cols-3` makes sense
  - Philosophy text could stay in same asymmetric layout, or move/remove

**Modification scope:** MEDIUM
- Restructure data from 4 categories to 3
- Add illustration `<img>` tags within or above cards
- Adjust grid columns
- Update content copy for new categorization

### 4. FAQ Dedicated Page (NEW PAGE + MODIFY Footer)

**Current state:**
- Footer.astro contains FAQ accordion with 5 questions
- FAQ.astro exists but is standalone component (not currently used)

**Required changes:**
- Create `/src/pages/faq.astro` as dedicated page
- Decide Footer FAQ fate: remove entirely, or keep abbreviated version with "See all FAQ" link

**Integration considerations:**
- **NEW: `/src/pages/faq.astro`** — Use BaseLayout, import FAQ.astro or inline accordion
- **MODIFY: `Footer.astro`** — Two options:
  - **Option A (Clean):** Remove FAQ section entirely, add simple link to /faq in footer nav
  - **Option B (Teaser):** Keep 2-3 questions, add "View All Questions" link to /faq
- **FAQ.astro reuse:** Existing FAQ.astro (src/components/FAQ.astro) can be imported by faq.astro page
  - Current FAQ.astro has same 5 questions as Footer, slightly different styling
  - Should consolidate into single FAQ component used by both page and footer (if keeping footer FAQ)

**New components needed:**
- **NONE** — `/src/pages/faq.astro` is a page file, not a component
- Can reuse existing `FAQ.astro` component

**Modification scope:** LOW-MEDIUM
- Create new page file (copy BaseLayout pattern from other pages)
- Modify Footer.astro to remove or abbreviate FAQ section
- Optionally refactor FAQ.astro to accept props (e.g., `limit` to show subset)

## Recommended Build Order

Based on dependencies and complexity:

### Phase 1: Asset Preparation (Prerequisite)
1. **Gather/create illustration assets:**
   - Process step illustrations (5 files): `/public/images/process/step-{1-5}.{svg|png}`
   - Technology category illustrations (3 files): `/public/images/tech/{ai|automations|web-apps}.{svg|png}`
   - Hero badges/trust indicators (if visual): `/public/images/hero/{badge-name}.{svg|png}`

2. **Decide asset format:**
   - **SVG recommended** for illustrations (scalable, smaller file size, theme-able)
   - **PNG acceptable** if illustrations are complex/photographic

### Phase 2: Simple Modifications (Low Risk)
1. **FAQ Page** — New page, no existing dependencies
   - Create `/src/pages/faq.astro`
   - Import existing `FAQ.astro` component or inline content
   - Test in isolation

2. **Hero Enhancement** — Modify existing component
   - Update copy/messaging
   - Add badge elements (minimal new markup)
   - Test visual hierarchy

### Phase 3: Layout-Heavy Modifications (Higher Risk)
3. **Technology Section Redesign** — Restructure existing component
   - Reorganize 4 categories → 3 categories
   - Add illustrations
   - Adjust grid layout
   - Test responsive behavior

4. **Process Section Enhancement** — Modify existing component with new layout
   - Add illustrations (requires layout adjustment for image placement)
   - Expand content copy
   - Test vertical timeline + image layout on mobile/desktop

### Phase 4: Integration & Cleanup
5. **Footer FAQ Decision** — Modify existing component
   - Remove or abbreviate footer FAQ based on decision
   - Add link to /faq page if needed
   - Test footer appearance

6. **Overall Testing:**
   - Visual hierarchy flow (Hero → Services → Process → Tech → About → Contact)
   - Mobile responsiveness for all modified sections
   - Dark mode appearance
   - Performance (image optimization)

## Data Flow Changes

### Current Data Flow
- **Static content:** All homepage sections have hardcoded content in component files
- **No external data sources** for homepage (blog uses Content Collections, portfolio uses projects.json)

### After Milestone
- **No data flow changes** — All enhancements remain static content
- **New static assets:** Illustration images loaded via public folder URLs

### Potential Future Consideration
If FAQ grows beyond 5-10 questions, consider:
- Moving FAQ data to `/src/data/faq.json` or Content Collection
- Would allow FAQ.astro to be data-driven, easier to maintain

## Component Structure Recommendations

### Hero.astro Enhancement Pattern

```astro
---
import Button from './ui/Button.astro';
---

<section id="hero" class="hero min-h-[80vh] flex items-center justify-center px-6 py-24 md:py-32">
  <div class="container max-w-4xl mx-auto text-center">
    <!-- Main headline box (existing) -->
    <div class="border-[3px] border-text-light dark:border-text-dark p-6 md:p-8 inline-block shadow-neo-yellow mb-8">
      <h1 class="...">
        [New outcome-focused headline]
      </h1>
    </div>

    <!-- Value prop (existing, update copy) -->
    <p class="...">
      [Updated value proposition]
    </p>

    <!-- NEW: Visual badges/trust indicators -->
    <div class="flex flex-wrap justify-center gap-4 mb-8">
      <!-- Option 1: Text badges with Card styling -->
      <div class="inline-flex items-center gap-2 px-4 py-2 border-[3px] border-text-light dark:border-text-dark shadow-neo-turquoise">
        <img src="/images/hero/icon-1.svg" alt="" class="w-6 h-6" />
        <span>Badge Text</span>
      </div>
      <!-- Repeat for additional badges -->
    </div>

    <!-- CTA (existing) -->
    <Button variant="yellow" size="lg" href="/contact">
      Start a Conversation
    </Button>
  </div>
</section>
```

### Process.astro Enhancement Pattern

```astro
<article class="relative pl-12 pb-8 border-l-[4px] border-turquoise">
  <!-- Step marker (existing) -->
  <div class="absolute left-0 top-0 -ml-4.5 w-8 h-8 ...">
    <span>1</span>
  </div>

  <!-- Step content with NEW illustration -->
  <div class="flex flex-col md:flex-row gap-6 items-start">
    <!-- NEW: Illustration -->
    <div class="w-full md:w-1/3 flex-shrink-0">
      <img
        src="/images/process/step-1.svg"
        alt="Discovery phase illustration"
        class="w-full h-auto"
      />
    </div>

    <!-- Existing content (title + dialogue boxes) -->
    <div class="flex-1">
      <h3 class="...">Discovery</h3>
      <div class="border-[3px] ... space-y-3">
        <div>
          <span class="font-semibold">You:</span>
          <span class="...">Share your challenges and goals</span>
        </div>
        <!-- etc -->
      </div>
    </div>
  </div>
</article>
```

### TechSection.astro Redesign Pattern

```astro
<section id="tech" ...>
  <div class="container mx-auto px-6 md:px-12">
    <h2 ...>How I Build</h2>

    <!-- Keep asymmetric layout or adjust to full-width for 3 cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- AI Card with illustration -->
      <Card variant="magenta">
        <img
          src="/images/tech/ai.svg"
          alt="AI illustration"
          class="w-full h-32 object-contain mb-4"
        />
        <h3 class="...">AI Integration</h3>
        <ul class="...">
          <li><span class="font-semibold">OpenAI</span> — Natural language</li>
          <!-- etc -->
        </ul>
      </Card>

      <!-- Automations Card -->
      <Card variant="turquoise">
        <!-- Similar pattern -->
      </Card>

      <!-- Web Apps Card -->
      <Card variant="yellow">
        <!-- Similar pattern -->
      </Card>
    </div>
  </div>
</section>
```

### FAQ Page Pattern

```astro
---
// /src/pages/faq.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import FAQ from '../components/FAQ.astro';
---

<BaseLayout
  title="Frequently Asked Questions | Joel Shinness"
  description="Common questions about working together on custom software projects"
>
  <div class="container mx-auto px-6 py-24 max-w-4xl">
    <h1 class="font-heading text-4xl md:text-5xl font-bold text-center mb-4">
      Frequently Asked Questions
    </h1>
    <p class="text-center text-text-muted-light dark:text-text-muted-dark mb-12">
      Everything you need to know about working together
    </p>

    <FAQ />
  </div>
</BaseLayout>
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Creating Unnecessary New Components

**What people do:** Create new components like `HeroBadge.astro`, `ProcessIllustration.astro` for simple markup
**Why it's wrong:** Over-abstraction for static content adds complexity without benefit
**Do this instead:** Keep illustrations and badges as simple `<img>` and `<div>` elements within parent components. Only create new components if they're reused 3+ times.

### Anti-Pattern 2: Inconsistent Component Location

**What people do:** Put new FAQ page in `/src/components/pages/FAQ.astro` instead of `/src/pages/faq.astro`
**Why it's wrong:** Breaks Astro's file-based routing convention, page won't be accessible
**Do this instead:** Pages go in `/src/pages/`, components go in `/src/components/`. Follow existing pattern.

### Anti-Pattern 3: Hardcoding Image Paths in Multiple Places

**What people do:** Write `/public/images/process/step-1.svg` instead of `/images/process/step-1.svg`
**Why it's wrong:** `/public/` is automatically root in Astro build, breaks in production
**Do this instead:** Reference public assets as `/images/...` without `/public/` prefix. Astro handles the path resolution.

### Anti-Pattern 4: Breaking Responsive Layout

**What people do:** Add illustrations with fixed widths that break mobile layout
**Why it's wrong:** Site becomes unusable on mobile, fails accessibility
**Do this instead:**
- Use responsive utilities (`w-full md:w-1/3`)
- Test on mobile viewport during development
- Use flexbox/grid with wrapping (`flex-col md:flex-row`)

## Integration Checklist

Before starting implementation:

- [ ] **Assets ready:** All illustration files created and placed in `/public/images/`
- [ ] **Image optimization:** SVGs minified, PNGs compressed (use ImageOptim or similar)
- [ ] **Copy ready:** New headlines, value props, detailed process descriptions written
- [ ] **Design decisions:** Badge style, illustration placement, FAQ footer treatment decided

During implementation:

- [ ] **Follow location patterns:** Homepage-specific components in `homepage/`, reusable in root
- [ ] **Maintain Card.astro usage:** Don't recreate card styling, use existing component
- [ ] **Test dark mode:** All new elements have dark mode styling
- [ ] **Test responsive:** Mobile, tablet, desktop breakpoints
- [ ] **Preserve accessibility:** alt text on images, semantic HTML, ARIA labels

After implementation:

- [ ] **Lighthouse CI:** Verify performance score stays 90%+
- [ ] **Visual regression:** Compare before/after screenshots
- [ ] **Content review:** Copy/messaging accuracy
- [ ] **Link validation:** /faq page linked from footer/nav

## Scaling Considerations

### Current Scale: Static Portfolio Site
- No database, no API calls
- All content compiled at build time
- Deployed to GitHub Pages (static hosting)

### This Milestone: No Architecture Impact
- All changes are static content/markup
- No new external dependencies
- No performance concerns (a few images won't impact Lighthouse scores if optimized)

### Future Considerations (Not This Milestone)
If site grows beyond 20-30 FAQ items or needs dynamic content:
- Consider Content Collections for FAQ (similar to blog)
- Would enable tagging, search, filtering
- Still builds to static, maintains performance

## Sources

- **Existing codebase:** `/src/pages/index.astro`, `/src/components/*.astro`
- **Astro documentation:** File-based routing, component patterns
- **Current milestone context:** Homepage refinement requirements

---
*Architecture research for: Homepage Refinements Integration*
*Researched: 2026-02-09*

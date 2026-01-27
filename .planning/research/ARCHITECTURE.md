# Architecture Research

**Domain:** Developer Portfolio/Services Website
**Researched:** 2026-01-26
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                        │
│  (Static HTML/CSS/JS - Pre-rendered at build time)          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │  Hero    │ │ Services │ │Portfolio │ │  About   │       │
│  │Component │ │Component │ │Component │ │Component │       │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘       │
│       │            │            │            │              │
│  ┌────┴────┐  ┌───┴───┐   ┌────┴────┐  ┌───┴───┐          │
│  │  Blog   │  │Testi- │   │ Contact │  │ Nav/  │          │
│  │Component│  │monials│   │ Form    │  │Footer │          │
│  └─────────┘  └───┬───┘   └────┬────┘  └───────┘          │
│                    │            │                           │
├────────────────────┴────────────┴───────────────────────────┤
│                     Data/Content Layer                       │
│  (Markdown files, JSON data, or static content)             │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Content    │  │   Portfolio  │  │    Site      │      │
│  │   Markdown   │  │     Data     │  │   Metadata   │      │
│  │   (Blog)     │  │    (JSON)    │  │   (config)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
├─────────────────────────────────────────────────────────────┤
│                  External Services Layer                     │
│  (Third-party APIs - called from client browser)            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Form API   │  │   Comments   │  │  Analytics   │      │
│  │ (Formspree/  │  │ (Optional:   │  │  (Optional)  │      │
│  │  FormBold)   │  │  Utterances) │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│              Deployment/Hosting Layer                        │
│  GitHub Pages (Static CDN hosting - HTTPS enabled)          │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Hero/Landing | First impression, value proposition, CTA | Full-viewport section with headline, tagline, primary CTA button |
| Services | Communicate expertise areas (web apps, automation, AI) | Grid or card layout with service descriptions |
| Portfolio | Showcase case studies with problem/solution narrative | Card grid linking to detailed case study pages |
| Case Study Page | Deep dive into specific project work | Standalone page with images, metrics, tech stack, outcomes |
| About | Build trust through personal story and expertise | Bio section with professional photo and background |
| Blog | Demonstrate expertise through written content | List of posts with pagination, individual post pages |
| Testimonials | Social proof from previous clients | Quote cards or carousel with client names/companies |
| Contact Form | Lead capture for potential clients | Form fields (name, email, project description) posting to API |
| Navigation | Site-wide orientation and access | Sticky header with links to all main sections |
| Footer | Secondary links, social proof, legal | Copyright, social links, email, additional navigation |

## Recommended Project Structure

### Option 1: Flat Structure (For Small Sites - Under 10 Pages)

```
joel-shinness-website/
├── index.html              # Home page with hero, services overview
├── about.html              # About page
├── services.html           # Detailed services page
├── portfolio.html          # Portfolio grid/list
├── blog.html               # Blog post list
├── contact.html            # Contact form
├── css/
│   ├── main.css            # Global styles
│   ├── components.css      # Reusable component styles
│   └── utilities.css       # Utility classes
├── js/
│   ├── main.js             # Global scripts (nav, mobile menu)
│   ├── form-handler.js     # Contact form submission logic
│   └── analytics.js        # Optional analytics initialization
├── images/
│   ├── portfolio/          # Project screenshots
│   ├── team/               # Personal photos
│   └── assets/             # Icons, logos
├── blog/
│   └── posts/              # Individual blog post HTML files
│       ├── post-1.html
│       └── post-2.html
└── case-studies/           # Individual case study pages
    ├── project-1.html
    └── project-2.html
```

### Option 2: Component-Based Structure (Recommended for Maintainability)

```
joel-shinness-website/
├── src/                    # Source files (if using build process)
│   ├── pages/              # Page templates
│   │   ├── index.html
│   │   ├── about.html
│   │   ├── portfolio.html
│   │   └── blog.html
│   ├── components/         # Reusable HTML fragments
│   │   ├── header.html     # Site navigation
│   │   ├── footer.html     # Site footer
│   │   ├── service-card.html
│   │   ├── portfolio-card.html
│   │   └── testimonial.html
│   ├── styles/
│   │   ├── base/           # Reset, typography, variables
│   │   │   ├── _reset.css
│   │   │   ├── _typography.css
│   │   │   └── _variables.css
│   │   ├── components/     # Component-specific styles
│   │   │   ├── _header.css
│   │   │   ├── _hero.css
│   │   │   ├── _service-card.css
│   │   │   └── _portfolio-card.css
│   │   ├── layouts/        # Page layout styles
│   │   │   ├── _home.css
│   │   │   └── _case-study.css
│   │   └── main.css        # Import all stylesheets
│   ├── scripts/
│   │   ├── components/     # Component-specific JS
│   │   │   ├── navigation.js
│   │   │   └── contact-form.js
│   │   └── main.js         # Entry point
│   └── data/               # Structured content data
│       ├── portfolio.json  # Portfolio projects metadata
│       ├── services.json   # Service offerings
│       └── testimonials.json
├── content/                # Markdown content (if using SSG)
│   └── blog/
│       ├── 2026-01-15-post-title.md
│       └── 2026-01-20-another-post.md
├── public/                 # Build output (what gets deployed)
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── images/
├── images/                 # Static assets
│   ├── portfolio/
│   ├── headshot.jpg
│   └── logo.svg
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Actions for automated deployment
```

### Structure Rationale

**Component-based organization** (Option 2) is recommended because:
- **Maintainability**: Changes to header/footer happen in one place, not across 10+ pages
- **Reusability**: Service cards, portfolio cards, testimonials use shared templates
- **Build optimization**: Enables minification, asset optimization, component bundling
- **Content management**: Separates content (data/markdown) from presentation (HTML/CSS)
- **Scalability**: Easy to add new sections without duplicating boilerplate

**Flat structure** (Option 1) works for:
- Very small sites (5-10 pages)
- No build process required
- Immediate editing and preview
- Learning/prototyping phase

**For this project**: Start with Option 1 for rapid prototyping, migrate to Option 2 when:
- Blog has 5+ posts
- Portfolio has 5+ case studies
- Adding interactive features (filtering, search)
- Team collaboration begins

## Architectural Patterns

### Pattern 1: JAMstack Architecture

**What:** JavaScript, APIs, and Markup - decouple the presentation layer from data and backend services

**When to use:** Static content sites (portfolios, marketing, blogs) where content doesn't change frequently

**Trade-offs:**
- **Pros**: Blazing fast load times (pre-rendered HTML), excellent SEO, free/cheap hosting, simple deployment, high security (no server to hack)
- **Cons**: Dynamic features require third-party APIs, content updates need rebuild/redeploy, no server-side logic without serverless functions

**Example:**
```html
<!-- Static HTML generated at build time -->
<section class="portfolio">
  <h2>Recent Projects</h2>
  <div class="portfolio-grid">
    <!-- This gets populated from portfolio.json at build time -->
    <article class="portfolio-card">
      <img src="/images/portfolio/project-1.jpg" alt="Project name">
      <h3>Project Name</h3>
      <p>Brief description...</p>
      <a href="/case-studies/project-1.html">Read case study</a>
    </article>
  </div>
</section>
```

### Pattern 2: Data-Driven Components

**What:** Separate content data (JSON/YAML/Markdown) from presentation templates, allowing content updates without touching HTML

**When to use:** When you have repeating content structures (portfolio items, blog posts, testimonials) that change frequently

**Trade-offs:**
- **Pros**: Content editors don't need HTML knowledge, consistent data structure, easy to add/remove items, can reuse data across pages
- **Cons**: Requires build process or JavaScript templating, adds complexity for simple sites, learning curve for non-developers

**Example:**
```json
// data/portfolio.json
{
  "projects": [
    {
      "id": "crm-automation",
      "title": "CRM Automation Platform",
      "client": "Acme Corp",
      "description": "Built custom automation workflows...",
      "tech": ["Python", "API Integration", "Webhooks"],
      "image": "/images/portfolio/crm.jpg",
      "metrics": {
        "timeSaved": "20 hours/week",
        "roi": "300%"
      }
    }
  ]
}
```

```javascript
// scripts/portfolio-renderer.js
async function renderPortfolio() {
  const response = await fetch('/data/portfolio.json');
  const { projects } = await response.json();

  const grid = document.querySelector('.portfolio-grid');
  grid.innerHTML = projects.map(project => `
    <article class="portfolio-card">
      <img src="${project.image}" alt="${project.title}">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="tech-stack">${project.tech.join(', ')}</div>
    </article>
  `).join('');
}
```

### Pattern 3: Progressive Enhancement

**What:** Build core functionality with HTML/CSS first, then enhance with JavaScript for interactivity

**When to use:** All static sites, especially for accessibility and SEO

**Trade-offs:**
- **Pros**: Works without JavaScript, excellent accessibility, better SEO, faster initial render, graceful degradation
- **Cons**: Requires more thoughtful architecture, some features harder to implement, potential duplicate logic

**Example:**
```html
<!-- Works without JavaScript: Static links to all pages -->
<nav class="main-nav">
  <ul>
    <li><a href="#services">Services</a></li>
    <li><a href="#portfolio">Portfolio</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="/blog.html">Blog</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>

<script>
  // Enhancement: Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
</script>
```

### Pattern 4: Third-Party Service Integration

**What:** Offload dynamic functionality (forms, comments, analytics) to specialized third-party APIs

**When to use:** Static sites that need dynamic features without backend infrastructure

**Trade-offs:**
- **Pros**: No backend to maintain, often free tier available, professional features (spam protection, email notifications), quick integration
- **Cons**: Vendor lock-in, external dependencies, potential privacy concerns, limited customization, may require paid tier at scale

**Example:**
```html
<!-- Contact form posting to Formspree -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="text" name="name" required placeholder="Your name">
  <input type="email" name="email" required placeholder="Your email">
  <textarea name="message" required placeholder="Tell me about your project"></textarea>
  <input type="hidden" name="_next" value="https://joelshinness.com/thank-you.html">
  <button type="submit">Send Message</button>
</form>
```

## Data Flow

### Build-Time Flow (Static Site Generation)

```
[Content Sources]
  ├── Markdown files (blog/*.md)
  ├── JSON data (data/*.json)
  └── Images (images/*)
         ↓
   [Build Process]
   (Optional: SSG like 11ty, Hugo, or simple HTML)
         ↓
    [Generate]
      ├── Parse markdown → HTML
      ├── Inject data into templates
      ├── Minify CSS/JS
      └── Optimize images
         ↓
   [Static Files]
   (public/ or docs/ directory)
         ↓
   [Git Push]
         ↓
[GitHub Pages Deployment]
   (Automatic via GitHub Actions)
         ↓
    [CDN Serving]
    (https://joelshinness.com)
```

### Runtime Flow (User Interaction)

```
[User Browser]
    ↓
[Request Page]
    ↓
[GitHub Pages CDN] → Serves static HTML/CSS/JS
    ↓
[Browser Renders]
    ↓
[User Fills Contact Form]
    ↓
[JavaScript Validates Input]
    ↓
[POST to Form API]
  (e.g., Formspree, FormBold)
    ↓
[API Processes]
  ├── Validates data
  ├── Checks for spam
  └── Sends email notification
    ↓
[Response to Browser]
    ↓
[Show Success/Error Message]
```

### Content Update Flow

```
[Content Author]
    ↓
[Edit File Locally]
  ├── Add blog post (blog/new-post.md)
  ├── Update portfolio (data/portfolio.json)
  └── Change copy (edit index.html)
    ↓
[Commit Changes]
    ↓
[Push to GitHub]
    ↓
[GitHub Actions Trigger]
  (if using build process)
    ↓
[Build Static Site]
    ↓
[Deploy to gh-pages]
    ↓
[Live Site Updates]
  (typically 30-60 seconds)
```

### Key Data Flows

1. **Portfolio Display Flow**: JSON data → JavaScript fetch → DOM manipulation → Rendered cards
2. **Blog Post Flow**: Markdown content → Build process → Static HTML pages → User navigation
3. **Contact Form Flow**: User input → Client-side validation → Third-party API → Email notification → Success message
4. **Navigation Flow**: User click → Smooth scroll (JS enhancement) OR page navigation (fallback)

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1,000 visitors/month | Basic static HTML/CSS/JS. GitHub Pages free tier is sufficient. Manual deployment acceptable. Single-page design or simple multi-page. |
| 1,000-10,000 visitors/month | Add build process for optimization (minification, image compression). Implement component-based structure for maintainability. Set up GitHub Actions for automated deployment. Consider basic analytics (Google Analytics or privacy-focused alternative). |
| 10,000-100,000 visitors/month | Implement aggressive caching strategies. Use CDN with edge locations (GitHub Pages already provides this). Optimize images with lazy loading and WebP format. Consider static site generator (Eleventy, Hugo) for better build performance. Monitor Core Web Vitals. |
| 100,000+ visitors/month | Consider migrating to Netlify, Vercel, or Cloudflare Pages for better DDoS protection and edge functions. Implement service worker for offline capability. Use advanced image optimization (responsive images, blur-up placeholders). Consider headless CMS for non-technical content updates. A/B testing infrastructure for conversion optimization. |

### Scaling Priorities

1. **First bottleneck: Page load speed**
   - **Symptom**: Slow initial load on mobile or slower connections
   - **Fix**: Optimize images (compress, lazy load, WebP format), minify CSS/JS, implement critical CSS, reduce third-party scripts
   - **Prevention**: Set performance budget (target: <100KB initial HTML, <2s LCP)

2. **Second bottleneck: Content management complexity**
   - **Symptom**: Difficult to add blog posts or portfolio items, fear of breaking site
   - **Fix**: Implement data-driven components with JSON/Markdown, consider basic SSG (Eleventy, 11ty)
   - **Prevention**: Separate content from presentation from day one

3. **Third bottleneck: Form submission volume**
   - **Symptom**: Contact form API rate limits hit, spam overwhelming inbox
   - **Fix**: Upgrade to paid form service tier, implement honeypot/CAPTCHA, set up form workflow automation
   - **Prevention**: Start with reputable form service with good spam protection

## Anti-Patterns

### Anti-Pattern 1: Over-Engineering with Framework Overkill

**What people do:** Use React/Vue/Angular for a simple portfolio site with mostly static content

**Why it's wrong:**
- Adds unnecessary complexity (build process, dependencies, learning curve)
- Slower initial load due to JavaScript bundle size
- Harder for non-developers to maintain
- Overkill for content that rarely changes
- SEO challenges if not using SSR/SSG correctly

**Do this instead:**
- Start with vanilla HTML/CSS/JS for truly static sections
- Use lightweight build tools (Eleventy, Hugo) if you need templating
- Reserve frameworks for genuinely interactive applications
- Ask: "Does this content change based on user interaction?" If no, it should be static HTML

### Anti-Pattern 2: Inline Contact Form Backend Logic

**What people do:** Try to implement form submission logic directly in the static site (PHP, Node.js endpoints) or store credentials in client-side code

**Why it's wrong:**
- GitHub Pages doesn't support server-side languages (no PHP, no Node.js server)
- Exposing API keys or email credentials in client JavaScript is a security vulnerability
- Creating your own backend defeats the purpose of static hosting (complexity, maintenance, security)

**Do this instead:**
- Use form-as-a-service providers (Formspree, FormBold, Netlify Forms, Web3Forms)
- These handle spam protection, email notifications, and data storage
- Keep your site fully static and secure
- Cost: Usually free for low volume, $10-20/month for higher tiers

**Example:**
```html
<!-- WRONG: Exposes credentials -->
<script>
  const API_KEY = "sk_live_abc123"; // Visible in browser source!
</script>

<!-- RIGHT: Use form service -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- No credentials needed in code -->
</form>
```

### Anti-Pattern 3: "Flat" HTML Duplication

**What people do:** Copy-paste the same header/footer/navigation HTML across every page manually

**Why it's wrong:**
- Updating navigation means editing 10+ files
- High risk of inconsistency (one page gets missed)
- Makes scaling to more pages painful
- Violates DRY (Don't Repeat Yourself) principle

**Do this instead:**
- **Option A (No build process)**: Use JavaScript to inject shared components
  ```javascript
  // components/header.js
  document.getElementById('header').innerHTML = `
    <nav>...</nav>
  `;
  ```
- **Option B (Recommended)**: Use simple static site generator (Eleventy, Hugo)
  ```liquid
  <!-- _includes/header.html (template) -->
  <nav>...</nav>

  <!-- index.html (uses template) -->
  {% include "header.html" %}
  ```
- **Option C**: Use server-side includes if your host supports it

### Anti-Pattern 4: Premature CMS Integration

**What people do:** Set up WordPress, Contentful, or other CMS for a portfolio site with 5 projects and 3 blog posts

**Why it's wrong:**
- Massive overkill for small amount of static content
- Adds complexity, maintenance burden, potential security issues (WordPress)
- Monthly costs for headless CMS subscriptions
- Slower development in early stages
- You're the only content author - GUI admin interface is unnecessary

**Do this instead:**
- Start with JSON files for structured data (portfolio, testimonials)
- Use Markdown files for blog posts
- Edit directly in VS Code or any text editor
- Graduate to CMS only when:
  - Multiple non-technical content authors
  - 20+ blog posts
  - Frequent content updates
  - Client handoff requires non-technical editing

### Anti-Pattern 5: Ignoring Build-Time Optimization

**What people do:** Deploy raw, unoptimized files to GitHub Pages (unminified CSS/JS, uncompressed images)

**Why it's wrong:**
- Slow page loads (especially mobile)
- Poor SEO rankings (Core Web Vitals matter)
- Wasted bandwidth
- Unprofessional user experience
- Easy wins left on table

**Do this instead:**
- Set up basic build pipeline:
  ```bash
  # Minify CSS/JS
  npm run build:css  # or use postcss, cssnano
  npm run build:js   # or use terser, esbuild

  # Optimize images
  npm run optimize:images  # or use sharp, imagemin
  ```
- Use GitHub Actions to automate build on every push
- Target performance budgets: <100KB initial HTML, <2s LCP
- Test with Lighthouse before deploying

### Anti-Pattern 6: Navigation Chaos

**What people do:** Inconsistent navigation across pages, unclear information architecture, or overly complex menu structures

**Why it's wrong:**
- Users can't find what they need (high bounce rate)
- Inconsistent UX damages credibility
- Common for portfolio sites to bury contact form or key services
- Mobile navigation often overlooked

**Do this instead:**
- **Keep it simple**: Home, Services, Portfolio, Blog, About, Contact (max 6-7 top-level items)
- **Consistency**: Same navigation on every page, same order
- **Clear CTAs**: Contact/Hire Me button prominently placed
- **Mobile-first**: Test hamburger menu, ensure touch targets are 44px minimum
- **Active states**: Show current page in navigation

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Form Backend (Formspree, FormBold) | HTML form action to API endpoint | Free tier: 50-100 submissions/month. Handles spam filtering, email notifications. No server-side code needed. |
| Analytics (Plausible, Fathom, Google Analytics) | JavaScript snippet in <head> | Privacy-focused alternatives to GA. Plausible: ~1KB script vs GA's 45KB+. |
| Comments (Utterances, Giscus) | GitHub Issues-based commenting | Free, uses GitHub OAuth. Good for developer blogs. Requires public repo. |
| Email Newsletter (ConvertKit, Buttondown) | Embedded signup form | Collect emails for content marketing. GDPR-compliant options available. |
| Social Proof (Testimonial.to) | Embedded widget or manual JSON | Video testimonials without building custom solution. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Page ↔ Shared Component | HTML import or JS injection | Header/footer/navigation should be centralized. Use templates or client-side includes. |
| Page ↔ Data Layer | Fetch JSON or build-time template injection | Portfolio items, testimonials, service listings should come from structured data. |
| Blog Posts ↔ Blog Index | Static generation or manual linking | SSG automatically creates index from posts. Manual approach: maintain list in blog.html. |
| Case Study ↔ Portfolio Grid | Direct HTML links | Each portfolio card links to dedicated case study page. Use consistent URL structure (/case-studies/project-name.html). |
| Contact Form ↔ Form API | AJAX POST or standard form submission | Standard submission: full page reload to thank-you page. AJAX: inline success message. |

## Build Order Dependencies

### Phase 1: Foundation (No dependencies)
- Set up project structure (folders, Git repo)
- Create base HTML template with semantic markup
- Implement global CSS (reset, typography, variables for colors/spacing)
- Build navigation and footer components
- Deploy basic "Hello World" to GitHub Pages

### Phase 2: Core Content (Depends on: Phase 1)
- Build hero section with value proposition
- Create About section/page
- Implement Services section with cards
- Add basic responsive design (mobile-first)

### Phase 3: Portfolio (Depends on: Phase 2)
- Create portfolio.json data structure
- Build portfolio card component
- Implement portfolio grid layout
- Create template for case study pages
- Add 1-2 example case studies

### Phase 4: Contact (Depends on: Phase 1)
- Design contact form UI
- Integrate form backend service (Formspree setup)
- Implement client-side validation
- Create thank-you page
- Test form submission end-to-end

### Phase 5: Blog (Depends on: Phase 1, ideally Phase 3)
- Design blog post list page
- Create blog post template (for individual posts)
- Write 1-2 initial posts
- Implement blog navigation/pagination (if needed)
- Optional: Add RSS feed

### Phase 6: Testimonials (Depends on: Phase 2)
- Create testimonials.json data structure
- Build testimonial component
- Add testimonials section to home page
- Collect and add real testimonials

### Phase 7: Polish (Depends on: All previous)
- Optimize images (compress, lazy load)
- Minify CSS/JS
- Implement advanced interactions (smooth scroll, animations)
- Set up analytics
- SEO optimization (meta tags, structured data)
- Cross-browser testing

### Dependency Notes

**Can be built in parallel:**
- Services section and About page (both content-focused)
- Portfolio and Blog (separate features)
- Contact form and Testimonials (independent features)

**Must be sequential:**
- Foundation → Everything else (base styles/structure needed first)
- Portfolio cards → Case study pages (design system should be consistent)
- Core content → Polish (can't optimize what doesn't exist)

**Recommended order for this project:**
1. Start with **Phase 1-2** (Foundation + Core Content) - establishes brand and messaging
2. Then **Phase 4** (Contact) - critical for lead capture early
3. Then **Phase 3** (Portfolio) - proves expertise
4. Then **Phase 5** (Blog) - ongoing content marketing
5. Finally **Phase 6-7** (Testimonials + Polish) - adds social proof and refinement

This order prioritizes getting a functional site live quickly (Phases 1-2-4) that can start generating leads, then builds out proof points (Portfolio, Blog, Testimonials) over time.

## Sources

- [The Complete Guide to Frontend Architecture Patterns in 2026 - DEV Community](https://dev.to/sizan_mahmud0_e7c3fd0cb68/the-complete-guide-to-frontend-architecture-patterns-in-2026-3ioo)
- [Research White Paper The Future of Web Architecture: Jamstack and SSGs (2025-2026)](https://www.keencomputer.com/solutions/software-engineering/880-research-white-paper-the-future-of-web-architecture-jamstack-and-static-site-generators-as-the-foundation-of-agile-digital-transformation-2025-2026)
- [What is Jamstack? - Umbraco](https://umbraco.com/knowledge-base/jamstack/)
- [JAMstack Official Site](https://jamstack.org/)
- [Frontend Development Best Practices: Code Structure and Organization - LinkedIn](https://www.linkedin.com/pulse/frontend-development-best-practices-code-structure-adekola-olawale)
- [20 Best Jamstack Contact Forms | Statichunt](https://statichunt.com/jamstack-forms)
- [Deploying a Static Site with GitHub Pages: Best Practices Guide - The Protec Blog](https://www.theprotec.com/blog/2025/deploying-a-static-site-with-github-pages-best-practices-guide/)
- [Configuring a publishing source for GitHub Pages - GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [A Static Site Folder Structure for Github Pages - mendo.zone](https://mendo.zone/web/github-pages-folder-structure/)
- [Anti-Patterns In Software Architecture - IT Architecture Insights](https://www.itar.pro/anti-patterns-in-software-architecture/)

---
*Architecture research for: Developer Portfolio/Services Website*
*Researched: 2026-01-26*

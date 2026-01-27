# Phase 3: Portfolio & Case Studies - Research

**Researched:** 2026-01-26
**Domain:** Static site portfolio implementation with responsive grids, image galleries, and case study pages
**Confidence:** HIGH

## Summary

This research investigated building a portfolio section with filterable case study cards and detailed case study pages for a static website using Tailwind CSS v4. The domain involves responsive CSS Grid layouts, image galleries with lightbox functionality, vanilla JavaScript filtering with animations, and SEO-optimized case study content structure.

The standard approach uses Tailwind CSS Grid utilities with responsive breakpoints for the portfolio grid, native HTML lazy loading for image optimization, and lightweight vanilla JavaScript solutions for filtering animations. For image galleries, simpleLightbox (sub-3KB) or lightGallery (full-featured) are the established libraries, both with no framework dependencies. Device mockups can be implemented using Tailwind CSS utility classes via Flowbite components or external mockup generators.

Case study pages should follow the story-first structure (Problem → Solution → Screenshots → Results) with Open Graph meta tags for social sharing. The key technical challenge is maintaining smooth grid reflow during filtering while avoiding accessibility issues with CSS order manipulation.

**Primary recommendation:** Use Tailwind CSS Grid with responsive breakpoints (grid-cols-1 md:grid-cols-2 lg:grid-cols-3), implement filtering with vanilla JavaScript class toggling and CSS transitions, use simpleLightbox for galleries, and structure case studies as static HTML pages with JSON/Markdown content source.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS | v4.0+ | Grid layout, transitions, responsive design | CSS-first configuration with @theme directive, built-in grid utilities, transition system |
| simpleLightbox | 2.x | Lightweight image gallery lightbox | Sub-3KB size, no dependencies, responsive, keyboard accessible |
| Vanilla JavaScript | ES6+ | Portfolio filtering logic | Zero dependencies, native performance, simple class manipulation |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lightGallery | 2.x+ | Advanced gallery features | Need video support, thumbnails, social sharing, or 120+ config options |
| Flowbite | Latest | Pre-built device mockup components | Need browser/phone/tablet mockups with Tailwind CSS |
| Screenshot.rocks | N/A (web tool) | Device mockup generation | One-off mockup creation without CSS implementation |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| simpleLightbox | lightGallery | More features (video, thumbnails) but 10x+ larger file size |
| Vanilla JS filtering | Filterizr/MixItUp libraries | Pre-built animations but adds 20KB+ dependencies |
| Flowbite mockups | Pure CSS mockups | Full control but must hand-code device frames |
| Static HTML | Jekyll/Eleventy SSG | Template reuse but adds build complexity |

**Installation:**
```bash
# For simpleLightbox
npm install simple-lightbox --save

# For lightGallery (if advanced features needed)
npm install lightgallery --save

# For Flowbite (if using pre-built components)
npm install flowbite --save
```

## Architecture Patterns

### Recommended Project Structure
```
portfolio/
├── index.html              # Portfolio grid page with filters
├── case-studies/
│   ├── project-1.html      # Individual case study pages
│   ├── project-2.html
│   └── project-3.html
├── data/
│   └── projects.json       # Portfolio metadata (optional)
├── images/
│   ├── thumbnails/         # Grid card thumbnails (optimized)
│   ├── mockups/            # Device mockup frames
│   └── screenshots/        # Full-size case study images
└── css/
    └── main.css            # Tailwind with @theme config
```

### Pattern 1: Responsive Grid with Tailwind CSS
**What:** Mobile-first 3-column grid that collapses to 1-2 columns on smaller screens
**When to use:** Portfolio grid, case study galleries, any card-based layout

**Example:**
```html
<!-- Source: https://tailwindcss.com/docs/grid-template-columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="portfolio-card">
    <!-- Card content -->
  </div>
</div>
```

**CSS approach (alternative with auto-fit):**
```css
/* For truly responsive grids without fixed breakpoints */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

### Pattern 2: Vanilla JavaScript Portfolio Filtering
**What:** Class-based filtering with CSS transitions for smooth show/hide
**When to use:** Portfolio filters, category toggles, content filtering

**Example:**
```javascript
// Source: https://www.w3schools.com/howto/howto_js_portfolio_filter.asp
function filterSelection(category) {
  const items = document.getElementsByClassName("portfolio-card");

  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("show");

    if (category === "all" || items[i].classList.contains(category)) {
      items[i].classList.add("show");
    }
  }
}

// Update active button state
function setActiveButton(btn) {
  const buttons = document.getElementsByClassName("filter-btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }
  btn.classList.add("active");
}
```

**CSS for smooth transitions:**
```css
.portfolio-card {
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
  display: none;
}

.portfolio-card.show {
  opacity: 1;
  transform: scale(1);
  display: block;
}
```

### Pattern 3: Image Lazy Loading
**What:** Native lazy loading for below-the-fold images
**When to use:** Portfolio thumbnails, case study screenshots, any images not immediately visible

**Example:**
```html
<!-- Source: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading -->
<!-- Above-the-fold: Load immediately -->
<img src="hero.jpg" alt="Hero image">

<!-- Below-the-fold: Lazy load -->
<img src="screenshot-1.jpg" alt="Project screenshot" loading="lazy">
```

### Pattern 4: Aspect Ratio Preservation
**What:** Modern CSS aspect-ratio property for consistent card dimensions
**When to use:** Portfolio card thumbnails, maintaining image proportions in grid

**Example:**
```css
/* Source: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_sizing/Aspect_ratios */
.portfolio-thumbnail {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  overflow: hidden;
}

/* For square cards */
.portfolio-card {
  aspect-ratio: 1;
  min-height: 0;
}
```

### Pattern 5: Device Mockup Implementation
**What:** Tailwind CSS utility classes creating device frames for screenshots
**When to use:** Portfolio thumbnails, case study presentation

**Example:**
```html
<!-- Source: https://flowbite.com/docs/components/device-mockups/ -->
<!-- Browser mockup -->
<div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800
     border-[8px] rounded-t-xl h-[500px] max-w-[800px]">
  <div class="rounded-lg overflow-hidden h-[484px]">
    <img src="screenshot.jpg" class="h-full w-full object-cover" alt="Project">
  </div>
</div>

<!-- Phone mockup -->
<div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800
     border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
  <div class="rounded-[2rem] overflow-hidden h-[572px]">
    <img src="mobile-screenshot.jpg" class="h-full w-full" alt="Mobile view">
  </div>
</div>
```

### Pattern 6: simpleLightbox Integration
**What:** Lightweight lightbox for image galleries with zero dependencies
**When to use:** Case study screenshot galleries, portfolio image viewing

**Example:**
```javascript
// Source: https://dbrekalo.github.io/simpleLightbox/
// Installation: npm install simple-lightbox

import SimpleLightbox from "simple-lightbox";
import "simple-lightbox/dist/simpleLightbox.min.css";

// Initialize with default options
new SimpleLightbox({elements: '.gallery a'});

// Or with custom configuration
new SimpleLightbox({
  elements: '.case-study-gallery a',
  animationSpeed: 250,
  loop: true,
  showCounter: true,
  enableKeyboard: true
});
```

**HTML structure:**
```html
<div class="gallery">
  <a href="images/screenshot-1-large.jpg">
    <img src="images/screenshot-1-thumb.jpg" alt="Screenshot 1" loading="lazy">
  </a>
  <a href="images/screenshot-2-large.jpg">
    <img src="images/screenshot-2-thumb.jpg" alt="Screenshot 2" loading="lazy">
  </a>
</div>
```

### Pattern 7: Open Graph Meta Tags for Case Studies
**What:** Social sharing meta tags for proper preview cards
**When to use:** Every case study page, portfolio page

**Example:**
```html
<!-- Source: https://ogp.me/ -->
<head>
  <!-- Required OG tags -->
  <meta property="og:title" content="Case Study: Bakery Order Automation" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://joelshinness.com/portfolio/bakery-automation" />
  <meta property="og:image" content="https://joelshinness.com/images/bakery-og.jpg" />

  <!-- Recommended OG tags -->
  <meta property="og:description" content="How we reduced manual order processing time by 85% for a local bakery" />
  <meta property="og:site_name" content="Joel Shinness - Web Development" />
  <meta property="og:locale" content="en_US" />

  <!-- Image details (recommended for best display) -->
  <meta property="og:image:secure_url" content="https://joelshinness.com/images/bakery-og.jpg" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Dashboard showing automated bakery order system" />

  <!-- Standard meta tags -->
  <meta name="description" content="How we reduced manual order processing time by 85% for a local bakery" />
  <title>Case Study: Bakery Order Automation | Joel Shinness</title>
</head>
```

### Anti-Patterns to Avoid

- **Using display: none for filtering without transitions:** Creates jarring experience. Use opacity + transform with transitions for smooth fade effects.
- **grid-auto-flow: dense for filtering:** Creates accessibility issues by changing visual order from DOM order. Screen readers follow DOM, not visual layout.
- **Lazy loading above-the-fold images:** Delays LCP (Largest Contentful Paint) and causes layout shifts. Only lazy load below-the-fold content.
- **Setting both width and height with aspect-ratio:** aspect-ratio is ignored when both dimensions are explicit. Only set one dimension.
- **Heavy gallery libraries for simple needs:** lightGallery is 10x+ larger than simpleLightbox. Use simpleLightbox unless you need video/thumbnails/social features.
- **Reloading page for filter changes:** Prevents animation, breaks UX. Use JavaScript to toggle visibility without page refresh.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image lightbox/modal | Custom modal with prev/next logic | simpleLightbox (3KB) or lightGallery | Keyboard navigation, touch gestures, accessibility, edge cases (ESC key, focus trap, body scroll lock) |
| Device mockups | SVG frames or manual borders | Flowbite components or Screenshot.rocks | Pixel-perfect device details (notches, buttons, shadows), dark mode support, maintenance burden |
| Portfolio filtering | Custom category system | W3Schools vanilla JS pattern | Well-tested, simple, accessible, handles edge cases (multiple categories, "all" button) |
| Lazy loading images | Intersection Observer custom code | Native loading="lazy" attribute | Browser-optimized, automatic threshold calculation, better performance |
| Responsive grid breakpoints | Custom media queries for each layout | Tailwind grid-cols-{n} with breakpoints | Consistent spacing, tested responsive behavior, utility-first maintenance |
| Image aspect ratios | padding-bottom percentage hack | CSS aspect-ratio property | Modern standard, cleaner code, better browser support (2021+) |

**Key insight:** Portfolio features feel simple ("just show/hide some divs") but production-ready implementations handle keyboard navigation, screen readers, touch gestures, reduced motion preferences, focus management, and dozens of edge cases. Using established libraries and patterns saves weeks of debugging.

## Common Pitfalls

### Pitfall 1: Grid Layout Holes During Filtering
**What goes wrong:** When hiding portfolio items, CSS Grid leaves empty spaces ("holes") where filtered items were positioned, creating broken layouts with gaps.

**Why it happens:** CSS Grid's auto-placement doesn't collapse hidden items by default. Setting display: none removes items from flow but grid maintains track sizing.

**How to avoid:**
- Option 1: Use display: none (removes from flow completely, no holes)
- Option 2: If using visibility or opacity, add `grid-auto-flow: dense` to parent
- IMPORTANT: `dense` has accessibility issues - changes visual order from DOM order

**Warning signs:**
- Empty gaps appearing in portfolio grid after filtering
- Items jumping to unexpected positions
- Grid becoming shorter/taller than expected

**Recommended solution:**
```css
/* Use display: none for filtered items */
.portfolio-card {
  display: none;
  opacity: 0;
  transition: opacity 300ms ease-in-out;
}

.portfolio-card.show {
  display: block;
  animation: fadeIn 300ms ease-in-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
```

### Pitfall 2: Lazy Loading Above-the-Fold Images
**What goes wrong:** Adding loading="lazy" to hero images or portfolio thumbnails visible on page load causes delayed rendering, layout shifts, and poor Core Web Vitals (LCP).

**Why it happens:** Developers add lazy loading globally to all images without considering viewport position. Browser delays loading until image enters viewport, but above-fold images are already visible.

**How to avoid:**
- Only lazy load images below the fold (after initial scroll)
- First 3-6 portfolio cards (depending on screen size) should NOT be lazy loaded
- Hero images, logos, navigation icons: NO lazy loading
- Case study screenshots in galleries: YES lazy loading

**Warning signs:**
- Lighthouse warns "Largest Contentful Paint element was lazily loaded"
- Images "pop in" after page appears loaded
- Cumulative Layout Shift (CLS) score increases

**Example:**
```html
<!-- Portfolio grid - first row loads immediately -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <!-- First 3 cards: NO lazy loading -->
  <div class="portfolio-card">
    <img src="thumbnail-1.jpg" alt="Project 1">
  </div>
  <div class="portfolio-card">
    <img src="thumbnail-2.jpg" alt="Project 2">
  </div>
  <div class="portfolio-card">
    <img src="thumbnail-3.jpg" alt="Project 3">
  </div>

  <!-- Remaining cards: YES lazy loading -->
  <div class="portfolio-card">
    <img src="thumbnail-4.jpg" alt="Project 4" loading="lazy">
  </div>
  <div class="portfolio-card">
    <img src="thumbnail-5.jpg" alt="Project 5" loading="lazy">
  </div>
</div>
```

### Pitfall 3: Missing Aspect Ratio Causes Layout Shifts
**What goes wrong:** Images without defined aspect ratios cause layout to "jump" as images load, pushing content down the page. This creates poor CLS (Cumulative Layout Shift) scores.

**Why it happens:** Browser doesn't know image dimensions until loaded, so reserves 0 height. When image loads, browser recalculates layout causing shift.

**How to avoid:**
- Use CSS aspect-ratio property on image containers
- Alternatively, set width and height attributes on `<img>` tags
- Use object-fit to control how image fills container

**Warning signs:**
- Content "jumps" as images load
- High CLS score in Lighthouse/PageSpeed
- Janky scrolling during image load

**Solution:**
```css
/* Define aspect ratio for containers */
.portfolio-thumbnail {
  aspect-ratio: 16 / 9;
  width: 100%;
  overflow: hidden;
}

.portfolio-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

Or use HTML attributes:
```html
<!-- Browser can calculate aspect ratio before image loads -->
<img src="thumbnail.jpg" alt="Project" width="1600" height="900" loading="lazy">
```

### Pitfall 4: Lightbox Keyboard Navigation & Focus Trapping
**What goes wrong:** Custom lightbox implementations trap users without keyboard controls (ESC to close, arrow keys to navigate) or fail to manage focus properly, breaking accessibility for keyboard-only users.

**Why it happens:** Developers focus on click/touch interactions and forget keyboard users. Focus management (returning focus to trigger element on close) requires explicit code.

**How to avoid:**
- Use established lightbox libraries (simpleLightbox, lightGallery) with built-in keyboard support
- If custom: Implement ESC key close, arrow key navigation, Tab focus trap
- Return focus to thumbnail that opened lightbox when closing

**Warning signs:**
- Cannot close lightbox with ESC key
- Tab key focuses elements behind lightbox
- Focus lost when lightbox closes
- No way to navigate images with keyboard

**Required keyboard behaviors:**
```javascript
// Essential keyboard controls for accessibility
document.addEventListener('keydown', (e) => {
  if (!lightboxOpen) return;

  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') previousImage();
  if (e.key === 'ArrowRight') nextImage();
});

// Focus management
function openLightbox(triggerElement) {
  lastFocusedElement = triggerElement; // Store for return
  lightbox.showModal(); // Use <dialog> or trap focus
}

function closeLightbox() {
  lightbox.close();
  lastFocusedElement.focus(); // Return focus to trigger
}
```

### Pitfall 5: Filter Animation Only Works on First Interaction
**What goes wrong:** Fade transitions work when filtering from "all" to category, but switching between categories shows instant changes without animation.

**Why it happens:** CSS transitions only animate when properties change. If items are already display: none, toggling to display: block shows them instantly. Need two-step animation: unhide then fade in.

**How to avoid:**
- Use CSS animations (keyframes) instead of transitions
- Or implement two-step JavaScript: change display, then trigger opacity change after reflow
- Ensure transition properties include all changing values (opacity, transform, etc.)

**Warning signs:**
- First filter click animates, subsequent clicks don't
- Items "blink" instead of fading
- Smooth animation only in one direction (show vs hide)

**Solution:**
```css
/* Use CSS animations instead of transitions */
.portfolio-card {
  display: none;
}

.portfolio-card.show {
  display: block;
  animation: fadeInScale 300ms ease-in-out;
}

.portfolio-card.hide {
  animation: fadeOutScale 300ms ease-in-out;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeOutScale {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

### Pitfall 6: Open Graph Images Missing Dimensions
**What goes wrong:** Social media platforms (Facebook, LinkedIn, Twitter) display broken or incorrectly sized preview cards when sharing case study pages.

**Why it happens:** OG image tags without width/height metadata force platforms to download and analyze images, often timing out or rendering incorrectly. Recommended size is 1200x630px.

**How to avoid:**
- Always include og:image:width (1200) and og:image:height (630)
- Add og:image:type (image/jpeg or image/png)
- Use og:image:alt for accessibility
- Test with Facebook Debugger or LinkedIn Post Inspector

**Warning signs:**
- Shared links show generic icons instead of images
- Images cropped incorrectly in social previews
- "Missing image" warnings in social media debuggers

**Complete implementation:**
```html
<meta property="og:image" content="https://example.com/case-study-image.jpg" />
<meta property="og:image:secure_url" content="https://example.com/case-study-image.jpg" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Dashboard showing 85% time reduction in order processing" />
```

## Code Examples

Verified patterns from official sources:

### Tailwind CSS v4 @theme Configuration
```css
/* Source: https://tailwindcss.com/blog/tailwindcss-v4 */
/* In your main.css file */
@import "tailwindcss";

@theme {
  /* Custom breakpoints for portfolio grid */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;

  /* Custom colors for portfolio categories */
  --color-web-apps: #3b82f6;
  --color-automation: #10b981;
  --color-ai-dev: #8b5cf6;

  /* Custom spacing for portfolio grid */
  --spacing-card-gap: 1.5rem;
}
```

### Responsive Portfolio Grid with Hover Effects
```html
<!-- Source: Tailwind CSS docs + industry patterns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <article class="portfolio-card web-apps show group cursor-pointer
                  transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
    <div class="relative aspect-[16/9] overflow-hidden rounded-lg">
      <img src="images/thumbnails/project-1.jpg"
           alt="Bakery order automation system"
           class="w-full h-full object-cover">
    </div>
    <div class="mt-4">
      <h3 class="text-xl font-semibold">Bakery Order Automation</h3>
      <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">Web Apps</p>
    </div>
  </article>
</div>
```

### Complete Filter System with Active States
```html
<!-- Filter buttons -->
<div class="flex flex-wrap gap-3 mb-8">
  <button class="filter-btn active px-6 py-2 rounded-full
                 transition-colors duration-200
                 bg-blue-600 text-white hover:bg-blue-700"
          onclick="filterSelection('all'); setActiveButton(this)">
    All Projects
  </button>
  <button class="filter-btn px-6 py-2 rounded-full
                 transition-colors duration-200
                 bg-gray-200 text-gray-800 hover:bg-gray-300
                 dark:bg-gray-700 dark:text-gray-200"
          onclick="filterSelection('web-apps'); setActiveButton(this)">
    Web Apps
  </button>
  <button class="filter-btn px-6 py-2 rounded-full
                 transition-colors duration-200
                 bg-gray-200 text-gray-800 hover:bg-gray-300
                 dark:bg-gray-700 dark:text-gray-200"
          onclick="filterSelection('automation'); setActiveButton(this)">
    Automation
  </button>
  <button class="filter-btn px-6 py-2 rounded-full
                 transition-colors duration-200
                 bg-gray-200 text-gray-800 hover:bg-gray-300
                 dark:bg-gray-700 dark:text-gray-200"
          onclick="filterSelection('ai-dev'); setActiveButton(this)">
    AI Development
  </button>
</div>

<script>
function filterSelection(category) {
  const cards = document.getElementsByClassName('portfolio-card');

  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove('show');

    if (category === 'all' || cards[i].classList.contains(category)) {
      cards[i].classList.add('show');
    }
  }
}

function setActiveButton(btn) {
  const buttons = document.getElementsByClassName('filter-btn');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active', 'bg-blue-600', 'text-white');
    buttons[i].classList.add('bg-gray-200', 'text-gray-800', 'dark:bg-gray-700', 'dark:text-gray-200');
  }
  btn.classList.remove('bg-gray-200', 'text-gray-800', 'dark:bg-gray-700', 'dark:text-gray-200');
  btn.classList.add('active', 'bg-blue-600', 'text-white');
}

// Show all on page load
filterSelection('all');
</script>
```

### Case Study Page Structure
```html
<!-- Complete case study page template -->
<!DOCTYPE html>
<html lang="en" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Case Study: Bakery Order Automation | Joel Shinness</title>

  <!-- Open Graph tags -->
  <meta property="og:title" content="Case Study: Bakery Order Automation" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://joelshinness.com/portfolio/bakery-automation" />
  <meta property="og:image" content="https://joelshinness.com/images/bakery-og.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:description" content="How we reduced manual order processing time by 85% for a local bakery" />
</head>
<body>
  <!-- Back navigation -->
  <nav class="mb-8">
    <a href="/portfolio" class="text-blue-600 hover:text-blue-700 flex items-center gap-2">
      ← Back to Portfolio
    </a>
  </nav>

  <!-- Title + Problem Statement -->
  <header class="mb-12">
    <h1 class="text-4xl font-bold mb-4">Bakery Order Automation</h1>
    <p class="text-xl text-gray-600 dark:text-gray-400">
      When Sarah's bakery was drowning in manual orders from phone calls,
      text messages, and social media DMs, we built a centralized system
      that saved her 20 hours per week.
    </p>
  </header>

  <!-- Problem Section -->
  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-4">The Problem</h2>
    <p class="text-gray-700 dark:text-gray-300 mb-4">
      Sarah's bakery was receiving orders through 5 different channels:
      phone, SMS, Facebook, Instagram, and email. She spent 4-5 hours daily
      just transcribing orders into her notebook, leading to errors and
      missed opportunities.
    </p>
    <p class="text-gray-700 dark:text-gray-300">
      Peak seasons meant working until midnight to organize next day's baking
      schedule. There was no way to track inventory, predict demand, or
      prevent overbooking.
    </p>
  </section>

  <!-- Solution Section -->
  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-4">The Solution</h2>
    <p class="text-gray-700 dark:text-gray-300 mb-4">
      We built a custom order management system that consolidated all order
      channels into a single dashboard. Customers can now place orders through
      a simple web form, and the system automatically organizes them by pickup
      date and bakery schedule.
    </p>
    <p class="text-gray-700 dark:text-gray-300">
      The dashboard shows real-time inventory needs, prevents overbooking,
      and generates daily baking schedules automatically. Sarah receives
      instant notifications for new orders and can approve/modify them with
      one click.
    </p>
  </section>

  <!-- Screenshots Gallery -->
  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6">Screenshots</h2>
    <div class="gallery grid grid-cols-1 md:grid-cols-2 gap-6">
      <a href="images/screenshots/dashboard-full.jpg">
        <img src="images/screenshots/dashboard-thumb.jpg"
             alt="Order management dashboard"
             loading="lazy"
             class="rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      </a>
      <a href="images/screenshots/calendar-full.jpg">
        <img src="images/screenshots/calendar-thumb.jpg"
             alt="Automated baking schedule calendar"
             loading="lazy"
             class="rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      </a>
    </div>
  </section>

  <!-- Results Summary Box -->
  <section class="mb-12">
    <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 rounded-r-lg">
      <h2 class="text-2xl font-bold mb-4">Results</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div class="text-4xl font-bold text-blue-600">85%</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Time reduction in order processing</div>
        </div>
        <div>
          <div class="text-4xl font-bold text-blue-600">20hrs</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Saved per week</div>
        </div>
        <div>
          <div class="text-4xl font-bold text-blue-600">Zero</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Missed orders since launch</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonial (if available) -->
  <section class="mb-12">
    <blockquote class="border-l-4 border-gray-300 pl-6 italic text-gray-700 dark:text-gray-300">
      "This system gave me my evenings back. I used to stay up until midnight
      organizing orders. Now everything's done automatically, and I can focus
      on baking."
      <footer class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        — Sarah Johnson, Owner, Sweet Delights Bakery
      </footer>
    </blockquote>
  </section>

  <!-- Built With Section -->
  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-4">Built With</h2>
    <div class="flex flex-wrap gap-3">
      <span class="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
        React
      </span>
      <span class="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
        Node.js
      </span>
      <span class="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
        PostgreSQL
      </span>
      <span class="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
        Twilio API
      </span>
    </div>
  </section>

  <script type="module">
    import SimpleLightbox from 'simple-lightbox';
    new SimpleLightbox('.gallery a', {
      animationSpeed: 250,
      loop: true
    });
  </script>
</body>
</html>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| padding-bottom percentage hack for aspect ratios | CSS aspect-ratio property | 2021 (wide support) | Cleaner code, easier maintenance, better performance |
| jQuery-based filtering libraries | Vanilla JavaScript class toggling | 2020+ | Zero dependencies, smaller bundle, native performance |
| tailwind.config.js for theming | @theme directive in CSS | Tailwind v4.0 (2024) | CSS-first configuration, runtime CSS variables, simpler setup |
| Intersection Observer for lazy loading | Native loading="lazy" attribute | 2019 (wide support) | Browser-optimized, automatic threshold, better UX |
| Heavy lightbox libraries (Fancybox, ColorBox) | simpleLightbox or native &lt;dialog&gt; | 2020+ | Sub-3KB vs 50KB+, modern APIs, better accessibility |
| Fixed grid breakpoints | auto-fit/auto-fill with minmax() | CSS Grid Level 2 | Truly responsive without media queries |
| JPG/PNG only | WebP/AVIF with JPG fallback | 2020+ (WebP), 2023+ (AVIF) | 30-50% smaller file sizes, better quality |

**Deprecated/outdated:**
- **grid-template-columns: 1fr 1fr 1fr** for 3 columns: Use `grid-cols-3` utility or `repeat(3, 1fr)`
- **jQuery plugins for filtering**: Use vanilla JavaScript patterns
- **Isotope/Masonry for simple grids**: CSS Grid handles most use cases
- **Custom lazy loading with Intersection Observer**: Use native `loading="lazy"` unless need custom threshold
- **Facebook-specific OG tags (fb:app_id)**: Only needed if using Facebook SDK features

## Open Questions

Things that couldn't be fully resolved:

1. **Optimal thumbnail image dimensions for portfolio cards**
   - What we know: 16:9 aspect ratio is industry standard, images should be optimized for display size
   - What's unclear: Exact pixel dimensions depend on max card width in design (need to calculate from grid breakpoints)
   - Recommendation: Generate thumbnails at 800x450px (2x for retina), use srcset for responsive sizing

2. **Best practice for project data storage**
   - What we know: Options include JSON files, Markdown with frontmatter, or inline HTML
   - What's unclear: No strong consensus for static sites; depends on content editing workflow
   - Recommendation: Start with inline HTML (simplest), migrate to JSON if scaling beyond 5-10 projects or need to reuse data

3. **Filter animation timing values**
   - What we know: Tailwind default is 150ms, research shows 250-300ms common for fade effects
   - What's unclear: Optimal timing for grid reflow animations (too fast feels jarring, too slow feels sluggish)
   - Recommendation: Test with users, start with 300ms ease-in-out, adjust based on feedback

4. **Device mockup maintenance overhead**
   - What we know: Flowbite provides Tailwind components, Screenshot.rocks generates static images
   - What's unclear: Whether maintaining CSS mockups vs generating images one-time is better long-term
   - Recommendation: Use Screenshot.rocks for initial implementation (faster), migrate to Flowbite if needing programmatic generation

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS v4.0 Documentation](https://tailwindcss.com/blog/tailwindcss-v4) - @theme directive, CSS-first configuration
- [Tailwind CSS Grid Template Columns](https://tailwindcss.com/docs/grid-template-columns) - Grid utilities, responsive breakpoints
- [Tailwind CSS Transition Property](https://tailwindcss.com/docs/transition-property) - Transition utilities, timing values
- [MDN: CSS aspect-ratio property](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_sizing/Aspect_ratios) - Modern aspect ratio implementation
- [MDN: Lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading) - Native lazy loading best practices
- [Open Graph Protocol](https://ogp.me/) - Required/optional OG tags, complete specification
- [Flowbite Device Mockups](https://flowbite.com/docs/components/device-mockups/) - Tailwind CSS device components
- [simpleLightbox Documentation](https://dbrekalo.github.io/simpleLightbox/) - Features, API, usage patterns
- [W3Schools Portfolio Filter Tutorial](https://www.w3schools.com/howto/howto_js_portfolio_filter.asp) - Vanilla JS filtering pattern

### Secondary (MEDIUM confidence)
- [WebAIM: Keyboard Accessibility](https://webaim.org/techniques/keyboard/) - Lightbox keyboard navigation requirements (verified with MDN)
- [CSS-Tricks: Aspect Ratios for Grid Items](https://css-tricks.com/aspect-ratios-grid-items/) - Grid aspect ratio patterns (verified with MDN)
- [Request Metrics: Image Optimization Guide 2026](https://requestmetrics.com/web-performance/high-performance-images/) - WebP/AVIF recommendations, lazy loading best practices
- [Elementor: How to Optimize Images 2026](https://elementor.com/blog/how-to-optimize-images/) - Image format recommendations, compression strategies
- [UXfol.io: UX Case Study Template 2026](https://blog.uxfol.io/ux-case-study-template/) - Case study structure, storytelling patterns
- [Uplift Content: Case Study Results Best Practices](https://www.upliftcontent.com/blog/case-study-results/) - Metrics presentation, callout box design
- [Freshy Sites: Open Graph SEO Case Study](https://freshysites.com/resources/open-graph-structured-data-seo-case-study/) - OG image dimensions (1200x630), missing metadata issues

### Tertiary (LOW confidence - marked for validation)
- Search results about "portfolio filter animation pitfalls" - Limited 2026-specific content, mostly older tutorials
- Generic portfolio filtering tutorials (Queness, GeeksforGeeks) - Patterns appear standard but need validation in practice
- Device mockup tool comparisons - Features confirmed but usage preferences vary by developer

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Tailwind CSS v4, simpleLightbox, and vanilla JS patterns verified through official documentation and multiple sources
- Architecture: HIGH - Grid patterns, filtering logic, and lazy loading verified with MDN and Tailwind docs; aspect-ratio and @theme directive are current standards
- Pitfalls: MEDIUM-HIGH - Layout holes, lazy loading, and aspect ratio issues verified with official docs; keyboard accessibility and filter animation timing based on multiple community sources

**Research date:** 2026-01-26
**Valid until:** 2026-02-26 (30 days for stable web standards; Tailwind CSS v4 is current major version)

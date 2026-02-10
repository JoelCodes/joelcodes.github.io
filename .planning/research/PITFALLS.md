# Pitfalls Research

**Domain:** Neobrutalist Design Implementation for Professional Portfolio Site
**Researched:** 2026-02-09
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Failing WCAG Contrast Requirements with Bold Color Palettes

**What goes wrong:**
Designers pair vibrant neobrutalist colors (yellow, cyan, bright pink) that visually "pop" but fail WCAG 2.0 AA contrast ratios of 4.5:1 for normal text and 3:1 for large text. This causes Lighthouse accessibility failures and excludes users with visual impairments.

**Why it happens:**
Neobrutalism's defining characteristic is bold, saturated colors. Designers assume "high contrast = accessible," but vibrant hue combinations (yellow + cyan, hot pink + orange) can have insufficient luminance contrast even when visually striking. The existing yellow accent (#ffef6a) on this site may fail contrast tests against light backgrounds.

**How to avoid:**
- Run **every** color combination through WCAG contrast checker before implementation
- For yellow accent, only use on dark backgrounds or with very dark text (near-black)
- Never use brand colors as exception—WCAG applies universally, including to corporate visual guidelines
- Test with WebAIM Contrast Checker or Coolors contrast tool during design phase, not after implementation
- Restrict palette to 2-3 bold colors maximum to reduce combinations requiring testing

**Warning signs:**
- Lighthouse accessibility score drops below 90%
- Text feels "vibrating" or hard to focus on
- Colors look great in design tool but feel harsh on actual site
- Squinting required to read body text in any lighting condition

**Phase to address:**
Phase 1 (Design System Foundation) — establish accessible color tokens before building components. Block implementation of any color combination that fails WCAG AA.

---

### Pitfall 2: Sacrificing Typography Readability for Aesthetic Boldness

**What goes wrong:**
Applying decorative, condensed, or quirky display fonts to body text creates severe legibility issues. Users struggle to read content, bounce rate increases, and the site feels unprofessional despite looking "designed." Long-form blog posts become painful to read.

**Why it happens:**
Neobrutalism showcases bold, unconventional typography as a primary design element. Designers extend the aesthetic to all text, forgetting that readability is non-negotiable for a lead-generation portfolio site targeting non-technical small business owners.

**How to avoid:**
- **Strict font hierarchy:** Bold display fonts (Bricolage Grotesque) for H1/H2 only, neutral body fonts (DM Sans) for paragraphs
- Never use condensed or decorative fonts for text blocks longer than 2 lines
- Minimum body text size: 16px (1rem) for desktop, 18px for mobile
- Line height: 1.75 for body text (already implemented in `.prose p`)
- Test all blog post content with actual copy, not Lorem Ipsum—real content reveals readability issues

**Warning signs:**
- User testing shows visitors skimming instead of reading
- Contact form submissions decrease after redesign
- Text feels cramped despite generous whitespace elsewhere
- Blog post reading time analytics drop significantly
- Complaints about "hard to read" or "straining eyes"

**Phase to address:**
Phase 1 (Design System Foundation) — Define type scale with readability constraints. Phase 4 (Blog Integration) — validate all typography with real blog content before launch.

---

### Pitfall 3: Dark Mode Shadow-to-Glow Transformation Breaking with New Elements

**What goes wrong:**
New isometric illustrations, outcome badges, and FAQ components don't inherit the shadow-to-glow transformation properly in dark mode. Shadows remain hard and dark (invisible on dark backgrounds), or glows become harsh and "radioactive." The carefully designed shadow-to-glow system breaks down, making dark mode look buggy and inconsistent.

**Why it happens:**
The existing system uses specific utilities like `.shadow-neo-yellow` and `.shadow-neo-turquoise` that automatically transform from hard offset shadows in light mode to soft glows in dark mode. New components (isometric illustrations, outcome badges, FAQ accordions) get built with hardcoded shadow values or inline styles, bypassing the design system. The transformation relies on CSS custom properties and the `.dark` class modifier, which require explicit implementation for each new component.

**How to avoid:**
- **Never use hardcoded `box-shadow` values**—always use design system utilities (`.shadow-neo-yellow`, `.shadow-neo-turquoise`, `.shadow-neo-magenta`)
- For isometric illustrations, create dedicated shadow utilities that transform properly: `.shadow-iso-yellow`, `.shadow-iso-turquoise` with both light (hard) and dark (glow) variants
- Document the shadow-to-glow pattern explicitly in component guidelines: "All shadows must use design system utilities to ensure dark mode transformation"
- Test every new component in both light and dark mode during development, not as final QA step
- For SVG illustrations, use CSS filters for glows rather than SVG `<feGaussianBlur>` to maintain consistency with design system
- Outcome badges should use the same shadow transformation as buttons/cards, not custom implementations

**Warning signs:**
- New components look great in light mode but broken in dark mode
- Shadows disappear or become invisible in dark mode
- Glows feel harsh, neon, or "radioactive" compared to existing components
- User toggles dark mode and new sections stand out as visually inconsistent
- DevTools inspection shows inline `box-shadow` values instead of CSS custom properties

**Phase to address:**
Phase 1 (Hero Refinement) — Establish shadow utilities for outcome badges that inherit transformation. Phase 2 (Process Section Illustrations) — Create `.shadow-iso-*` utilities for isometric elements before implementing illustrations. Phase 3 (FAQ Page) — Test accordion expand/collapse states in both modes.

---

### Pitfall 4: Isometric Illustration Style Inconsistency Across Components

**What goes wrong:**
Isometric illustrations in the process section use one lighting angle and color palette, while technology section illustrations use a different angle and palette. Illustration style clashes with existing neobrutalist elements (hard shadows, flat colors). The site feels like multiple designers worked independently without coordination, undermining professional trust.

**Why it happens:**
Isometric illustrations are sourced from different libraries (Undraw, unDraw alternatives, custom creation) without establishing unified style guidelines first. The key to isometric style is lighting consistency—keeping the direction or source of light consistent within illustrations creates a clear relationship between shapes and shadows. Without documented guidelines for isometric elements, each implementation makes independent choices about color saturation, lighting angle, level of detail, and how illustrations integrate with neobrutalist borders/shadows.

**How to avoid:**
- **Establish isometric style guidelines before creating any illustrations:**
  - Light source direction: Choose one angle (e.g., top-left at 45°) and use consistently
  - Color palette: Limit to existing accent colors (yellow, turquoise, magenta) + neutrals
  - Detail level: Match neobrutalist aesthetic—bold shapes, minimal texture, flat colors
  - Integration pattern: How illustrations interact with borders/shadows (inside bordered container? floating with own shadow?)
- Create or procure all illustrations from single source with consistent style
- If using illustration libraries, filter strictly by style characteristics
- Document illustration specifications in design system: lighting angle, color usage, border treatment
- For dark mode, adjust illustration brightness/saturation (don't create entirely new illustrations)
- Test illustrations together on same page before finalizing—they should feel like a family

**Warning signs:**
- Illustrations from different sections look like they came from different websites
- Some illustrations have soft shadows, others have hard shadows
- Color palettes vary between illustrations (one uses pastels, another uses saturated brights)
- Illustrations conflict visually with neobrutalist borders/shadows
- One illustration has 20 details, another has 3 (inconsistent complexity)
- Light appears to come from different directions across illustrations

**Phase to address:**
Phase 2 (Process Section Illustrations) — Establish isometric guidelines and create/procure first set. Validate style before proceeding to Phase 3 (Technology Section).

---

### Pitfall 5: Isometric SVG Performance Degradation from Complex Paths

**What goes wrong:**
High-detail isometric illustrations with thousands of SVG path points cause render jank, especially on mobile devices. Page load times increase significantly (LCP degrades), Lighthouse performance scores drop below 90%, and scrolling feels sluggish when illustrations are in viewport. The site becomes noticeably slower despite being a static site.

**Why it happens:**
Designers export isometric illustrations directly from design tools (Figma, Illustrator) without optimization. Unoptimized SVGs can significantly slow down rendering, increase bundle size, and impact Core Web Vitals. Complex isometric illustrations often contain excessive path precision (6 decimal places instead of 2), unnecessary metadata, hidden layers, and unmerged paths. Each illustration might be 50-200KB unoptimized when it should be 5-20KB.

**How to avoid:**
- **Optimize all SVG files before adding to project:**
  - Use SVGO or Astro's built-in SVG optimization (experimental flag: `svg-optimization`)
  - Reduce path coordinate precision from 6 decimals to 2 (40% file size reduction with no visual change)
  - Remove unnecessary metadata, comments, hidden layers
  - Merge paths where possible without losing editability
  - Simplify complex paths (40-80% size reduction possible)
- Set target file size limits: <20KB per illustration, <10KB ideal
- Use Astro's `<Image />` or `<Picture />` component for raster fallbacks if SVG complexity can't be reduced
- Lazy load illustrations below the fold using Astro's `loading="lazy"` attribute
- Test performance impact on mid-range mobile device (not just dev machine)
- Monitor bundle size during build—flag any SVG over 20KB for manual optimization

**Warning signs:**
- Lighthouse performance score drops when illustrations added to page
- LCP (Largest Contentful Paint) increases by >500ms
- Build output shows SVG files >20KB
- Scrolling feels janky when illustrations enter viewport
- Mobile devices (especially older iPhones) show noticeable lag
- DevTools Performance tab shows long paint times during scroll

**Phase to address:**
Phase 2 (Process Section Illustrations) — Establish SVG optimization pipeline before first illustration. Set up Astro SVG optimization and validate output sizes. Phase 6 (Performance Audit) — Verify no performance regressions from illustrations.

---

### Pitfall 6: Outcome Badges Creating Visual Clutter in Hero Section

**What goes wrong:**
Adding outcome-focused badges/icons to the hero section creates overwhelming visual density. Instead of clarifying value proposition, badges compete with headline, CTA, and hero image. Users don't know where to look first. The "5-second test" fails—visitors can't articulate what the site offers after 5 seconds of viewing.

**Why it happens:**
Best practices recommend trust signals (badges, icons, metrics) to boost credibility, and outcome-focused messaging to clarify value. However, cramming multiple messages, CTAs, excessive copy, and competing visuals into a single space is the most common hero section mistake. The existing site targets 10/10 neobrutalist density for hero sections, which already includes bold typography, thick borders, and colored shadows. Adding 4-6 outcome badges pushes density beyond usable levels.

**How to avoid:**
- **Strict badge hierarchy in hero:**
  - Maximum 3 outcome badges/icons in hero (not 6+)
  - Place badges as secondary elements—never competing with headline or CTA
  - Use subtle treatment for badges: small icons, minimal borders, no shadows
  - Position strategically: below CTA or to the side, never above headline
  - Test with "5-second test"—users should articulate value proposition in 5 seconds
- Consider moving some badges to pre/post-hero utility strip instead of cramming into hero
- Badges should reinforce primary message, not introduce new concepts
- Use consistent icon style (outline vs filled, size, color usage)
- Test badge count variations: 0, 2, 4, 6—find optimal without overwhelming

**Warning signs:**
- Hero feels cluttered despite generous spacing
- Users can't identify primary CTA in under 2 seconds
- Multiple elements compete for attention (nothing stands out)
- "5-second test" shows confusion about what site offers
- Heat maps show scattered attention instead of focused scan pattern
- Bounce rate increases after hero redesign
- Design peers love it but target audience (small business owners) finds it confusing

**Phase to address:**
Phase 1 (Hero Refinement) — Test badge count variations with target audience before implementing. Start with 2 badges, increase only if testing supports it.

---

### Pitfall 7: FAQ Accordions Losing WCAG 2.2 Keyboard Accessibility

**What goes wrong:**
FAQ accordion components look great and work with mouse clicks but fail keyboard navigation and screen reader testing. Users can't expand/collapse questions with Enter/Space keys, focus indicators are invisible, or ARIA attributes are missing/incorrect. The FAQ page passes Lighthouse automated checks but fails manual accessibility testing.

**Why it happens:**
Accordion components require complex keyboard interaction patterns and ARIA attributes beyond basic HTML. Developers implement visual accordion behavior (click to expand) without implementing full WCAG 2.2 keyboard accessibility requirements. Neobrutalist styling (thick borders, bold colors) can obscure focus indicators—a blue focus ring on a yellow-bordered button becomes hard to see. The project has Lighthouse CI enforcement but this tests only a subset of accessibility issues—manual testing is required for interactive components.

**How to avoid:**
- **Full accordion accessibility implementation:**
  - Keyboard support: Enter and Space to toggle, Tab to move between questions
  - ARIA attributes: `aria-expanded`, `aria-controls`, `aria-labelledby`
  - Focus indicators with sufficient contrast against both background AND bordered elements
  - Screen reader announces state: "Question 1, button, collapsed" / "expanded"
  - Focus management: Focus moves to expanded content or stays on button (document choice)
- Use `<details>` and `<summary>` HTML elements as foundation (native accessibility)
- Test with keyboard only—disconnect mouse and navigate entire FAQ page
- Test with screen reader (VoiceOver on Mac, NVDA on Windows)
- Design custom focus indicators that work with neobrutalist borders (consider glow effect or thick outline in contrasting color)
- Document accordion behavior in component guidelines with accessibility requirements

**Warning signs:**
- Lighthouse 100% but keyboard navigation doesn't work
- Focus indicators invisible or hard to see on bordered buttons
- Screen reader announces "button" but not expansion state
- Enter key doesn't toggle accordion (only click works)
- Tab order skips accordion content or behaves unexpectedly
- Users with disabilities report FAQ page is difficult to use

**Phase to address:**
Phase 4 (FAQ Page) — Implement full keyboard and screen reader support from start, not as afterthought. Manual accessibility testing before considering page complete.

---

### Pitfall 8: Over-Stylization Undermining Professional Trust

**What goes wrong:**
Pushing neobrutalism to 10/10 density creates a site that feels experimental, unfinished, or like a placeholder. Small business owners (target audience) interpret the aesthetic as "unprofessional," "not ready," or "too quirky for serious work." Lead generation drops instead of improving.

**Why it happens:**
Neobrutalism is inherently rebellious and anti-conventional. Designers see portfolio examples from creative agencies or design studios (who can push boundaries) and apply the same density to a professional services site. The project brief specifies "3/10 density — distinctive but not overwhelming," but excitement about the aesthetic leads to feature creep: every element gets thick borders, every shadow gets exaggerated, every font gets bolder.

**How to avoid:**
- **Establish and enforce the 3/10 density constraint rigorously:**
  - Headers/Hero: 7/10 neobrutalism (make a statement)
  - Core content areas: 2/10 neobrutalism (subtle accents only)
  - Blog posts: 1/10 neobrutalism (prioritize readability)
- Use neobrutalist elements as **accents**, not the entire design language
- Apply thick borders to CTAs and card components only, not every div
- Limit bold colors to accent elements: buttons, tags, highlights
- Preserve generous whitespace—neobrutalism without breathing room = chaos
- **Test with target audience** (small business owners) before launch, not just design peers
- Create "density guidelines" document showing do/don't examples per section

**Warning signs:**
- Design peers love it, but target audience focus group is confused/put off
- Multiple elements compete for attention (nothing stands out)
- Site feels overwhelming or exhausting to browse
- Users describe design as "loud," "aggressive," or "too much"
- Bounce rate increases compared to previous design
- Conversion rate drops despite improved visual interest

**Phase to address:**
Phase 1 (Design System Foundation) — define density constraints per component type. Phase 5 (Testing & Refinement) — user testing with actual target audience (small business owners), not design community.

---

### Pitfall 9: Inconsistent Spacing Creating Visual Chaos

**What goes wrong:**
Applying random or inconsistent spacing between neobrutalist elements (thick borders, bold shadows, large type) creates a layout that feels haphazard instead of intentionally raw. Elements collide visually, breathing room disappears, and the design feels amateurish rather than bold.

**Why it happens:**
Neobrutalism celebrates "unpolished" aesthetics, which designers misinterpret as "spacing doesn't matter." Without systematic spacing, thick borders touch or nearly touch, shadows overlap confusingly, and the intentional rawness becomes accidental mess. Tailwind's utility classes make it easy to apply spacing inconsistently (`p-4` here, `p-6` there, `p-8` elsewhere).

**How to avoid:**
- **Establish spacing scale for neobrutalist elements** (not just base Tailwind scale):
  - Minimum gap between bordered elements: 24px (2rem / `gap-6`)
  - Padding inside bordered containers: 24-32px (`p-6` or `p-8`)
  - Margin around shadow elements: shadow-offset + 8px minimum
- Use consistent shadow offset across similar elements (e.g., all cards use `8px 8px`)
- Document spacing rules in design system: "Neobrutalist cards require 32px vertical margin"
- Use Tailwind's `space-y-*` and `gap-*` utilities consistently
- Avoid one-off spacing values—stick to scale

**Warning signs:**
- Elements feel "too close" despite generous whitespace elsewhere
- Shadows overlap or touch adjacent elements
- Thick borders create unintended visual connections between unrelated elements
- Design feels cluttered despite minimal number of elements
- Responsive breakpoints cause spacing to collapse awkwardly

**Phase to address:**
Phase 1 (Design System Foundation) — define neobrutalist spacing scale and usage rules. Phase 3 (Page Templates) — apply spacing system consistently across all templates.

---

### Pitfall 10: Accessibility Testing Theater (Passing Lighthouse, Failing Humans)

**What goes wrong:**
Site achieves 100% Lighthouse accessibility score but remains difficult to use for people with disabilities. Color contrast passes automated checks but causes eye strain. Focus indicators are technically present but invisible. ARIA labels exist but don't help screen reader users navigate effectively.

**Why it happens:**
The project has Lighthouse CI enforcement with 90%+ thresholds, creating incentive to "pass the test" rather than "be accessible." Neobrutalism's high contrast can technically pass WCAG while still causing issues: vibrating colors, harsh contrasts, overwhelming visual density. Lighthouse can only test a subset of accessibility issues—it cannot evaluate subjective experience.

**How to avoid:**
- **Manual accessibility testing is non-negotiable:**
  - Keyboard-only navigation testing for every interactive element
  - Screen reader testing (VoiceOver on Mac, NVDA on Windows)
  - Color blindness simulation (Chrome DevTools, Stark plugin)
  - Test with actual users who have disabilities if possible
- Focus indicators must have sufficient contrast **against both background and element**
  - Blue ring on blue button = invisible, even if technically present
- Test in different lighting conditions (bright sunlight, dim room)
- Verify interactive elements are clearly distinguishable (neobrutalist flat aesthetic can make buttons look like decorative elements)
- Document accessibility beyond automated checks: "Tested with keyboard navigation, tested with VoiceOver, tested in bright sunlight"

**Warning signs:**
- 100% Lighthouse score but users report accessibility problems
- Focus indicators hard to see in practice despite passing contrast checks
- Interactive elements look like static design elements
- Screen reader announces everything but navigation is still confusing
- Colors pass WCAG but cause headaches or eye strain in real-world use

**Phase to address:**
Phase 5 (Testing & Refinement) — dedicated manual accessibility testing with multiple methods. Do not rely solely on Lighthouse CI passing.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Using same shadow values for all components | Faster implementation, consistent look | No visual hierarchy, everything same "weight" | Never—differentiate card shadows (8px) vs button shadows (4px) vs hero shadows (12px) |
| Hardcoding colors instead of CSS custom properties | Quick to write, no abstraction needed | Dark mode becomes painful, color changes require find/replace | Never—use Tailwind theme tokens from day one |
| Applying neobrutalist style to all elements | Impressive in screenshots, maximizes aesthetic | Overwhelming density, professional trust undermined | Never—use 3/10 density constraint |
| Skipping mobile testing of thick borders/shadows | Faster dev cycle, desktop looks great | Mobile feels cramped, borders too thick at small viewport | Never—test responsive behavior immediately |
| Copy-pasting shadow animation code across components | Fast, works in isolation | Performance issues accumulate, hard to optimize later | Only in prototype phase, refactor before production |
| Using yellow accent on light backgrounds | Matches brand colors, visually striking | Fails WCAG contrast, Lighthouse fails | Only for non-text decorative elements |
| Sourcing isometric illustrations from multiple libraries | More variety, faster to find "perfect" image | Inconsistent style undermines professional look | Only during prototyping to test concepts |
| Inline SVG without optimization | Easy to copy-paste from design tool | Massive file sizes, performance degradation | Only for quick prototypes, never production |
| Using generic accordion scripts without accessibility | Works with mouse, faster implementation | Fails keyboard users, screen readers, WCAG 2.2 | Never—build accessible from start |
| Adding 6+ outcome badges to hero for completeness | Showcases all value propositions at once | Visual clutter, fails 5-second test, overwhelms users | Never—maximum 3 badges in hero |

## Integration Gotchas

Common mistakes when integrating new components with existing neobrutalist system.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Isometric illustrations + neobrutalist borders | Illustration gets its own shadow that conflicts with container shadow | Place illustration inside bordered container with no shadow, OR give illustration shadow and remove container border |
| Outcome badges + hero section density | Adding badges without reducing other elements (hero now 13/10 density) | Hero stays at 10/10—if badges added, reduce headline size or remove secondary elements |
| FAQ accordions + dark mode | Accordion border/shadow hardcoded, doesn't transform to glow | Use `.shadow-neo-*` utilities so accordion inherits shadow-to-glow transformation |
| SVG illustrations + Astro build | SVGs imported without optimization enabled | Enable Astro experimental flag `svg-optimization` in config before adding illustrations |
| Outcome icons + OKLCH color system | Using generic icon colors (hex/rgb) that don't match design system | Extract icon colors from existing OKLCH tokens for consistency |
| New components + existing spacing scale | Applying Tailwind defaults without considering neobrutalist spacing needs | Use documented neobrutalist spacing scale (minimum 24px gap between bordered elements) |
| Isometric illustrations + mobile viewports | Illustrations too complex/detailed to be recognizable at small sizes | Test illustrations at 375px width, simplify or create alternate simplified version for mobile |
| FAQ page + blog typography | Using same `.prose` styling for FAQ that's optimized for blog content | Create separate `.faq-content` class with appropriate spacing/sizing for Q&A format |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Unoptimized isometric SVGs | LCP increases by 500ms+, Lighthouse performance drops | Enable Astro SVG optimization, set <20KB per file limit | First illustration added (if complex) |
| Multiple isometric illustrations on single page | Scrolling jank on mobile, long paint times | Lazy load below-fold illustrations, limit to 3-4 per page max | 4+ complex illustrations on same page |
| Animating box-shadow on multiple cards | Smooth on dev machine, janky on mobile | Use pseudo-element opacity technique for all shadow animations | 3+ animated shadows visible simultaneously |
| Outcome badge icons loaded as individual requests | Slower page load, multiple HTTP requests | Use SVG sprite or icon font for all hero icons | 6+ small icon files |
| FAQ accordions with complex SVG icons | Expand/collapse animations stutter | Use simple geometric icons or icon fonts for accordion indicators | 10+ FAQ items with SVG icons |
| Loading multiple neobrutalist display fonts | More font options, expressive typography | Restrict to 1 display font (Bricolage Grotesque), 1 body font (DM Sans) | Third font added (each font ~30-50kb) |
| High-resolution isometric PNGs as fallback | Better detail than optimized SVG | Use properly optimized SVG instead of raster fallback | Any PNG >50KB used |

## UX Pitfalls

Common user experience mistakes when adding outcome-focused messaging and interactive components.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Too many outcome badges in hero (6+) | Overwhelmed, can't identify primary value proposition | Maximum 3 badges, test with "5-second test" |
| All FAQ questions closed by default | Users must click each to find answer, high friction | Consider opening first 2-3 questions by default, or add search |
| Isometric illustrations without alt text | Screen reader users miss context, SEO impact | Descriptive alt text for each illustration: "Isometric illustration showing three-step process workflow" |
| Outcome badges using jargon or unclear metrics | Confusing to non-technical small business owners | Use plain language: "Save 10 hours/week" not "37% productivity gain" |
| FAQ questions in random order | Users can't predict where to find answers | Group by theme, order by frequency (most-asked first), or alphabetical |
| Process section with 8+ isometric steps | Cognitive overload, users skip reading | Maximum 5 steps in process, combine related steps if needed |
| Interactive elements indistinguishable from decorative | Users don't realize FAQ questions are clickable | Clear affordances: cursor change, hover state, "click to expand" hint |
| Outcome badges competing with CTA | Users read badges instead of clicking CTA, conversions drop | Badges secondary to CTA—smaller, positioned to not compete |
| Isometric illustrations too abstract | Users don't understand what illustration represents | Test comprehension—users should identify concept without explanation |
| FAQ answers too long (200+ words) | Users won't read long answers, defeats "quick reference" purpose | Keep answers under 100 words, link to blog post for details |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Isometric illustrations optimized:** Files under 20KB each, SVGO or Astro optimization applied
- [ ] **Illustration style consistency:** All illustrations use same light source angle, color palette, detail level
- [ ] **Dark mode shadow transformation:** All new components use `.shadow-neo-*` utilities, tested in dark mode
- [ ] **Outcome badges count tested:** Maximum 3 badges in hero, validated with "5-second test" and target audience
- [ ] **FAQ keyboard accessibility:** Enter/Space toggle works, Tab navigation correct, tested without mouse
- [ ] **FAQ screen reader support:** ARIA attributes correct, state announced properly, tested with VoiceOver/NVDA
- [ ] **Focus indicators on new components:** Visible against both background and bordered elements, tested manually
- [ ] **SVG alt text:** Every isometric illustration has descriptive alt text for screen readers and SEO
- [ ] **Mobile responsiveness:** Illustrations recognizable at 375px, badge layout doesn't break, FAQ accordions work on touch
- [ ] **Performance metrics maintained:** Lighthouse performance 90+, LCP increase <200ms, no scrolling jank
- [ ] **Spacing consistency:** New components follow neobrutalist spacing scale (24px minimum gap between bordered elements)
- [ ] **OKLCH color integration:** Outcome badges and illustrations use existing color tokens, not new arbitrary colors
- [ ] **Density compliance:** Each section measured against density guidelines (hero 10/10, content 3/10, etc.)
- [ ] **Target audience validation:** Tested with small business owners (not just design peers), value proposition clear

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| WCAG contrast failures discovered after implementation | MEDIUM | 1. Audit all color combinations with WebAIM checker 2. Create compliant color palette alternatives 3. Replace in CSS custom properties 4. Re-test Lighthouse 5. Manual QA all pages |
| Dark mode shadows don't transform properly | MEDIUM | 1. Audit all new components for hardcoded shadows 2. Replace with `.shadow-neo-*` utilities 3. Test every component in dark mode 4. Document shadow usage in component guidelines |
| Isometric illustrations inconsistent style | HIGH | 1. Document style guidelines (light angle, colors, detail) 2. Audit existing illustrations against guidelines 3. Recreate or heavily edit non-compliant illustrations 4. Establish single source for future illustrations |
| Unoptimized SVGs causing performance issues | LOW | 1. Run all SVGs through SVGO 2. Enable Astro SVG optimization 3. Rebuild and test bundle sizes 4. Verify Lighthouse performance restored |
| Outcome badges overwhelming hero section | MEDIUM | 1. User test variations with 0, 2, 3, 4 badges 2. Find optimal count (likely 2-3) 3. Move excess badges to utility strip or separate section 4. Retest "5-second test" |
| FAQ accordions fail keyboard accessibility | HIGH | 1. Implement full keyboard support (Enter, Space, Tab) 2. Add proper ARIA attributes 3. Design visible focus indicators 4. Test with keyboard only 5. Test with screen reader 6. Document for future components |
| Professional trust issues from over-stylization | HIGH | 1. Measure density across all sections 2. Reduce to documented targets (hero 10/10, content 3/10) 3. User test with target audience 4. A/B test if possible 5. Monitor conversion rates |
| Spacing inconsistencies across new components | MEDIUM | 1. Document spacing scale in design system 2. Audit all new components 3. Refactor using systematic spacing utilities 4. Create before/after examples for team reference |
| Isometric illustrations unrecognizable on mobile | MEDIUM | 1. Test each illustration at 375px 2. Simplify complex illustrations or create mobile variants 3. Consider replacing with simpler icons if simplification isn't enough 4. Retest comprehension |
| Body text readability issues in blog posts | LOW | 1. Create `.prose-readable` variant class 2. Apply to blog content only 3. Test with real blog posts 4. User testing with non-technical audience |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| WCAG contrast failures | Phase 1: Hero Refinement | WebAIM Contrast Checker on outcome badges, Lighthouse CI passes |
| Typography readability | Phase 1: Hero Refinement | Target audience can articulate value prop in 5 seconds |
| Dark mode shadow transformation breaking | Phase 1: Hero Refinement, Phase 2: Process Section, Phase 4: FAQ Page | Every new component tested in both light and dark modes |
| Isometric illustration style inconsistency | Phase 2: Process Section Illustrations (establish guidelines before implementation) | All illustrations use same light angle, color palette, detail level |
| SVG performance degradation | Phase 2: Process Section Illustrations, Phase 3: Technology Section | All SVGs <20KB, Lighthouse performance 90+, LCP increase <200ms |
| Outcome badges overwhelming hero | Phase 1: Hero Refinement | "5-second test" passes, maximum 3 badges, user testing validates clarity |
| FAQ keyboard accessibility failures | Phase 4: FAQ Page | Manual keyboard navigation test passes, screen reader test passes |
| Over-stylization undermining trust | All phases (enforce 3/10 density throughout) | User testing with small business owners, conversion rate maintained/improved |
| Inconsistent spacing | Phase 1: Hero Refinement (establish spacing for badges/icons) | Spacing audit shows consistent use of documented scale |
| Accessibility testing theater | Phase 5: Testing & Refinement | Manual accessibility tests completed (keyboard, screen reader, color blindness) |

## Sources

### Neobrutalism Design Principles
- [Neobrutalism: Definition and Best Practices - Nielsen Norman Group](https://www.nngroup.com/articles/neobrutalism/)
- [Neubrutalism - UI Design Trend That Wins The Web - Bejamas](https://bejamas.com/blog/neubrutalism-web-design-trend)
- [Brutalism vs Neubrutalism in UI Design - CC Creative](https://www.cccreative.design/blogs/brutalism-vs-neubrutalism-in-ui-design)
- [Consistency is key with branding - Neo Brutalism Design Scale](https://www.neobrutalism.dev/)

### Dark Mode & Shadow-to-Glow Implementation
- [Dark Mode Design Best Practices in 2026 - Tech-RZ](https://www.tech-rz.com/blog/dark-mode-design-best-practices-in-2026/)
- [Dark Mode Done Right: Best Practices for 2026 - Medium](https://medium.com/@social_7132/dark-mode-done-right-best-practices-for-2026-c223a4b92417)
- [Dark Mode Design Systems: A Practical Guide - Medium](https://medium.com/design-bootcamp/dark-mode-design-systems-a-practical-guide-13bc67e43774)
- [Dark Mode Design: Trends, Myths, and Common Mistakes - WebWave](https://webwave.me/blog/dark-mode-design-trends)
- [The Dark Side of Dark Mode: 7 UX Design Mistakes - SevenKoncepts](https://sevenkoncepts.com/blog/the-dark-side-of-dark-mode-design-mistakes/)

### Isometric Illustration Consistency & Performance
- [IBM Design Language – Isometric Style](https://www.ibm.com/design/language/illustration/isometric-style/design/)
- [7 Ways to Optimize SVGs: Reduce File Size by 80% - FrontendTools](https://www.frontendtools.tech/blog/optimizing-svgs-web-performance-scalability)
- [High Performance SVGs - CSS-Tricks](https://css-tricks.com/high-performance-svgs/)
- [SVG Performance Optimization for Modern Websites - SVG AI](https://www.svgai.org/blog/svg-performance-optimization)
- [How to improve page load speed with SVG optimization - Raygun](https://raygun.com/blog/improve-page-load-speed-svg-optimization/)

### Astro SVG Optimization
- [Experimental SVG optimization - Astro Docs](https://docs.astro.build/en/reference/experimental-flags/svg-optimization/)
- [How to optimize images in Astro: A step-by-step guide - Uploadcare](https://uploadcare.com/blog/how-to-optimize-images-in-astro/)
- [feat: add SVGO optimization support for SVG assets - Astro GitHub](https://github.com/withastro/astro/commit/1a2ed01c92fe93843046396a2c854514747f4df8)

### Hero Section & Outcome-Focused Messaging
- [Hero Section Design: Best Practices & Examples for 2026 - Perfect Afternoon](https://www.perfectafternoon.com/2025/hero-section-design/)
- [High-Impact Hero Sections That Don't Hurt Page Speed: A CRO Guide - GoStellar](https://www.gostellar.app/blog/high-impact-hero-sections-that-dont-hurt-page-speed)
- [Hero Section Optimization: Best Practices and Examples - Omniconvert](https://www.omniconvert.com/blog/hero-section-examples/)
- [Best Practices for SaaS Website Hero Sections - ALF Design Group](https://www.alfdesigngroup.com/post/saas-hero-section-best-practices)

### FAQ Page Accessibility (WCAG 2.2)
- [Designing Accessible Dark Mode: A WCAG-Compliant Interface Redesign - Medium](https://medium.com/@design.ebuniged/designing-accessible-dark-mode-a-wcag-compliant-interface-redesign-0e0225833aa4)
- [Dark Mode: Best Practices for Accessibility - DubBot](https://dubbot.com/dubblog/2023/dark-mode-a11y.html)
- [The Designer's Guide to Dark Mode Accessibility - Accessibility Checker](https://www.accessibilitychecker.org/blog/dark-mode-accessibility/)
- [Avoiding accessibility mistakes: 3 actions for 2026 - The Drum](https://www.thedrum.com/industry-insight/avoiding-accessibility-mistakes-three-actions-that-will-help-you-win-in-2026)

### Accessibility & OKLCH Color Contrast
- [OKLCH in CSS: Consistent, accessible color palettes - LogRocket](https://blog.logrocket.com/oklch-css-consistent-accessible-color-palettes)
- [Color Contrast for Accessibility: WCAG Guide (2026) - WebAbility](https://www.webability.io/blog/color-contrast-for-accessibility)
- [WCAG 2.2 color contrast validator with OKLCH support - GitHub](https://github.com/incluud/color-contrast-checker)
- [Offering a Dark Mode Doesn't Satisfy WCAG Contrast Requirements - BOIA](https://www.boia.org/blog/offering-a-dark-mode-doesnt-satisfy-wcag-color-contrast-requirements)

### Performance & Core Web Vitals
- [Optimize Astro.js with Static Site Generation - TillItsDone](https://tillitsdone.com/blogs/astro-js-performance-optimization/)
- [Boosting Web Performance: Astro JS Image & Speed Optimization - DEV](https://dev.to/benajaero/boosting-web-performance-how-we-supercharged-our-agencys-site-with-astro-js-image-speed-optimization-techniques-18mf)
- [How to animate box-shadow with silky smooth performance - Tobias Ahlin](https://tobiasahlin.com/blog/how-to-animate-box-shadow/)

---
*Pitfalls research for: Adding outcome-focused hero, isometric illustrations, and FAQ page to existing neobrutalist portfolio site*
*Researched: 2026-02-09*
*Context: Subsequent milestone adding features to site with existing OKLCH color system, shadow-to-glow dark mode, WCAG 2.2 AA compliance*

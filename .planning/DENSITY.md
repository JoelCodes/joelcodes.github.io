# Density Guidelines

**Purpose:** Maintain neobrutalist character without overwhelming users
**Overall Target:** 3/10 — Distinctive but restrained
**Phase:** 07-design-system-foundation

---

## Overview

Neobrutalism is characterized by bold colors, thick borders, and hard shadows. Without restraint, it becomes overwhelming and reduces usability. These guidelines ensure our design maintains the raw, confident aesthetic while preserving clarity and professional trust.

**Why restraint matters:**
- **Readability:** Heavy styling on everything makes content harder to scan
- **Hierarchy:** When everything is bold, nothing stands out
- **Professionalism:** Small business owners need to trust this looks intentional, not chaotic
- **Accessibility:** High contrast everywhere can cause visual fatigue

Our 3/10 target means the design should feel noticeably neobrutalist in hero sections and CTAs, but content areas should breathe with subtle accents.

---

## Density Scale

| Level | Name | When to Use | Visual Treatment |
|-------|------|-------------|------------------|
| 10/10 | Maximum | Hero sections, primary CTAs | Colored background + thick border + colored shadow + bold typography + ALL CAPS (H1 only) |
| 7/10  | Strong | Secondary CTAs, feature highlights, interactive cards | Thick border + colored shadow + hover effects |
| 5/10  | Moderate | Navigation active states, form inputs, buttons | 3px border + focus accent + minimal/no shadow |
| 3/10  | Subtle | Content sections, static cards, layout containers | Thin border (3px) + one accent color per section + generous whitespace |
| 2/10  | Minimal | Blog post body, long-form content | Styled headings only + clean body text + link accents |
| 0/10  | None | Pure text content, documentation | Standard typography, no decorative elements |

---

## Per-Section Targets

### Hero Section (10/10)
**Treatment:** Full neobrutalist impact
- Colored background (yellow, turquoise, or magenta)
- 4px thick border
- Colored shadow (5px offset)
- H1 in ALL CAPS, weight 800
- Primary CTA with full treatment

**Example:**
```
Hero container: border-4 + shadow-neo-yellow + bg-yellow
H1: ALL CAPS + weight-800 + text-4xl
CTA button: border-4 + shadow-neo-yellow + bg-yellow + hover:shadow-neo-yellow-hover
```

### Primary CTAs (10/10)
**Treatment:** Maximum interactive emphasis
- Colored background matching section accent
- 4px thick border
- Colored shadow
- Hover effect (pressed shadow + translate)
- Bold typography (weight 700)

**Implementation:**
```css
.btn-primary {
  border: var(--border-neo-thick) solid currentColor;
  box-shadow: 5px 5px 0 var(--color-yellow);
  transition: all 0.2s ease;
}
.btn-primary:hover {
  box-shadow: 3px 3px 0 var(--color-yellow);
  transform: translate(2px, 2px);
}
```

### Content Sections (3/10)
**Treatment:** Subtle structure with one accent
- Thin or no borders (3px max)
- Minimal shadows (only on interactive elements)
- One accent color per section (rotate: yellow → turquoise → magenta)
- Generous padding and whitespace

**Rules:**
- Choose one element to accent per section
- Use borders for structure, not decoration
- Keep backgrounds neutral (white/dark)
- Let content breathe with spacing

**Example:**
```
Section container: border-3 + py-12 + px-6
Section heading: color-yellow + weight-700 + normal case
Cards within: border-3 + no shadow unless interactive
```

### Cards (3/10)
**Treatment:** Structured but not heavy
- 3px border always
- Shadow only if interactive (clickable)
- Neutral background
- Hover state if interactive (lift or border color change)

**Interactive cards:**
```css
.card-interactive {
  border: var(--border-neo) solid currentColor;
  box-shadow: 3px 3px 0 var(--color-turquoise); /* Only on hover or always if critical CTA */
}
```

**Static cards:**
```css
.card-static {
  border: var(--border-neo) solid currentColor;
  /* No shadow */
}
```

### Blog Post Content (2/10)
**Treatment:** Reading-optimized with heading accents
- H1: ALL CAPS, weight 800, colored (yellow/turquoise/magenta)
- H2: Normal case, weight 700, colored
- H3: Normal case, weight 600, standard color
- Body: Clean, no borders, standard line-height 1.75
- Links: Underline + accent color

**Anti-pattern:** Do not add borders or shadows to blog content containers. Focus stays on typography.

### Form Inputs (5/10)
**Treatment:** Clear interactive affordance
- 3px border
- Focus state with accent color border
- No shadows (shadows imply button/CTA)
- Clear labels with weight 600

**Implementation:**
```css
input, textarea {
  border: var(--border-neo) solid var(--color-text-muted-light);
}
input:focus, textarea:focus {
  border-color: var(--color-turquoise);
  outline: none;
}
```

### Navigation (3/10)
**Treatment:** Subtle with active state accent
- No borders on nav container
- Active state: accent color text + optional underline
- No shadows
- Hover: smooth color transition

**Example:**
```css
nav a {
  color: var(--color-text-light);
  transition: color 0.2s;
}
nav a:hover, nav a.active {
  color: var(--color-turquoise);
}
```

---

## Implementation Rules

### 1. One Accent Per Section
Each section should have one dominant accent color. Don't mix yellow + turquoise in the same visual group.

**Good:**
```
Hero: Yellow accent
About section: Turquoise accent
Services section: Magenta accent
```

**Bad:**
```
Hero: Yellow heading + turquoise border + magenta CTA (too chaotic)
```

### 2. Shadows Imply Importance
Reserve colored shadows for interactive elements and hero sections. Static content shouldn't cast shadows.

**Shadow priority:**
1. Primary CTAs: Always
2. Hero elements: Always
3. Interactive cards: On hover or always if critical
4. Secondary buttons: Optional
5. Content containers: Never

### 3. Borders Everywhere, Shadows Selective
Borders provide structure without overwhelming. Use 3-4px borders liberally, but reserve shadows for emphasis.

**Pattern:**
- All cards: Border
- Hero + CTAs: Border + shadow
- Content sections: Border only
- Blog content: Neither (typography only)

### 4. Whitespace is Your Friend
Neobrutalist elements are visually heavy. Compensate with generous spacing.

**Spacing scale:**
- Between sections: 64px (--spacing-neo-2xl)
- Within sections: 32px (--spacing-neo-xl)
- Between elements: 24px (--spacing-neo-lg)
- Component padding: 16px (--spacing-neo-md)

### 5. Test with Real Content
Density that works with Lorem Ipsum may overwhelm with real text. Always test with production content before finalizing.

**Test checklist:**
- Long headings (40+ characters)
- Short paragraphs vs long paragraphs
- Lists with 10+ items
- Multiple cards in a grid
- Mobile viewport (density compounds on small screens)

---

## Anti-Patterns

### DON'T: Multiple accents in same group
```
❌ Bad: Card with yellow border + turquoise shadow + magenta background
✓ Good: Card with turquoise border + turquoise shadow
```

### DON'T: Shadows on non-interactive elements
```
❌ Bad: Blog post body container with shadow
✓ Good: Blog post heading with color accent, body with no shadow
```

### DON'T: Thick borders + colored shadows + bright background (pick two)
```
❌ Bad: Button with 4px border + shadow + yellow background + yellow text
✓ Good: Button with 4px border + shadow + white background + yellow text
```

### DON'T: Tight spacing with heavy styling
```
❌ Bad: Cards with 8px gap and thick borders + shadows
✓ Good: Cards with 24px gap and thick borders + shadows
```

### DON'T: ALL CAPS on anything except H1
```
❌ Bad: H2, H3, buttons, or body text in ALL CAPS
✓ Good: Only H1 in ALL CAPS for maximum impact
```

---

## Validation Checklist

Use these questions when reviewing components:

1. **Accent count:** Does this section use more than one accent color? (should be 1)
2. **Shadow justification:** Does every shadowed element deserve emphasis? (interactive or hero only)
3. **Whitespace ratio:** Is there at least 16px breathing room around heavy elements?
4. **Hierarchy clarity:** If I squint, can I still identify the most important element?
5. **Mobile test:** Does this density feel overwhelming on a 375px viewport?

If you answer "no" or "unsure" to any question, reduce density by one level and re-test.

---

## Quick Reference

| Section Type | Border | Shadow | Accent | Spacing |
|--------------|--------|--------|--------|---------|
| Hero | 4px | Yes | Full | xl (32px) |
| Primary CTA | 4px | Yes | Full | md (16px) padding |
| Content section | 3px | No | One per section | 2xl (64px) between |
| Card (interactive) | 3px | On hover | Match section | lg (24px) gap |
| Card (static) | 3px | No | Match section | lg (24px) gap |
| Blog content | None | No | H1/H2 only | Normal prose |
| Form input | 3px | No | On focus | md (16px) padding |
| Navigation | None | No | Active state | Normal |

---

*Phase: 07-design-system-foundation*
*Created: 2026-02-09*
*Usage: Reference this document when building Phase 8+ components*

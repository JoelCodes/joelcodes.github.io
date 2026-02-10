---
phase: 17
plan: 04
subsystem: documentation
tags: [design-system, utilities, json-api, documentation, ai-agents]
requires: [17-01, 17-02, 17-03]
provides:
  - Complete Utilities section with isometric shadow, glow, and rotate documentation
  - JSON API endpoint at /design-system.json with all tokens and components
  - CLAUDE.md design system instructions for AI agents
  - Visual before/after examples for dark mode transformations
  - Complete machine-readable design system reference
affects: [17-05, 18, 19, 20, 21, 22]
tech-stack:
  added: []
  patterns:
    - JSON API endpoint pattern for machine-readable design system export
    - Visual utility documentation with live examples
    - AI agent instruction pattern in CLAUDE.md
key-files:
  created:
    - src/pages/design-system.json.ts
  modified:
    - src/pages/design-system.astro
    - CLAUDE.md
decisions:
  - id: json-api-endpoint
    choice: Created /design-system.json as Astro GET endpoint returning JSON
    rationale: Provides machine-readable format for AI agents and tooling to query design tokens programmatically
    alternatives: ["GraphQL endpoint", "Static JSON file in public/", "No API endpoint"]
    impact: AI agents can fetch tokens dynamically, future tooling can integrate with design system
  - id: visual-utility-examples
    choice: Live visual examples with colored boxes showing shadow/glow/rotate effects
    rationale: Utilities are visual effects - showing them in action is more effective than just listing CSS values
    alternatives: ["Code-only documentation", "External CodePen examples", "Static images"]
    impact: Developers can see exact effect before using utilities, clear understanding of dark mode transformations
  - id: claude-md-design-system-section
    choice: Added dedicated Design System section to CLAUDE.md with explicit instructions
    rationale: Prevents AI agents from recreating existing components, ensures consistent use of design tokens
    alternatives: ["Rely on agents to discover /design-system page", "Separate AI-instructions.md file"]
    impact: AI agents check design system first before creating new UI, reduces duplication and inconsistency
metrics:
  duration: 3 minutes 9 seconds
  completed: 2026-02-10
---

# Phase 17 Plan 04: Design System Utilities & JSON API Summary

**One-liner:** Complete Utilities section with visual isometric shadow/glow/rotate examples, JSON API endpoint at /design-system.json, and CLAUDE.md AI agent instructions

## What Was Built

Finalized the design system documentation with utilities, programmatic access, and AI agent guidance:

### 1. **Isometric Shadow Utilities** (`src/pages/design-system.astro` - #utility-iso-shadow)

   **Visual Examples:**
   - Three size variants displayed with turquoise boxes: `iso-shadow-sm` (3px), `iso-shadow` (5px), `iso-shadow-lg` (8px)
   - Gray background demo area to show shadow offset clearly
   - Live examples that transform with dark mode toggle

   **Documentation:**
   - Classes table showing light mode (offset) vs dark mode (glow) values
   - Light mode: `box-shadow: 5px 5px 0 currentColor` (hard offset)
   - Dark mode: `box-shadow: 0 0 20px color-mix(in oklch, currentColor 40%, transparent)` (soft glow)
   - Technical explanation of shadow-to-glow transformation
   - Why it matters: Maintains visual hierarchy while creating futuristic dark mode feel

   **Code Example:**
   ```html
   <div class="border-3 border-turquoise iso-shadow text-turquoise">
     Shadow becomes glow in dark mode
   </div>
   ```

### 2. **Isometric Glow Utilities** (`src/pages/design-system.astro` - #utility-iso-glow)

   **Visual Examples:**
   - Three intensity variants with magenta boxes: `iso-glow-subtle` (15px, 20%), `iso-glow` (20px, 40%), `iso-glow-strong` (30px, 60%)
   - Always glow regardless of theme (unlike iso-shadow which adapts)

   **Use Cases Documented:**
   - Accent elements that should glow in both light and dark mode
   - Hover states (see .iso-hover-glow)
   - Decorative elements needing consistent glow
   - CTAs or highlights requiring extra visual emphasis

   **Code Example:**
   ```html
   <div class="iso-glow-strong text-magenta">
     Always glows
   </div>
   ```

### 3. **Isometric Rotate Utilities** (`src/pages/design-system.astro` - #utility-iso-rotate)

   **Visual Examples:**
   - Three rotation variants with yellow boxes and perspective: `iso-rotate-subtle` (30°), `iso-rotate` (45° standard), `iso-rotate-steep` (60°X, 45°Z)
   - Live 3D-transformed boxes showing actual rotation effect
   - Perspective container to show 3D depth

   **Face Positioning Classes Documented:**
   - `.iso-face-front` - translateZ(20px)
   - `.iso-face-top` - rotateX(90deg) translateZ(20px)
   - `.iso-face-side` - rotateY(90deg) translateZ(20px)
   - Table format for scannable reference

   **Hover Utilities:**
   - `.iso-hover-lift` - Lifts element -8px on hover with 200ms transition (interactive demo)
   - `.iso-hover-glow` - Adds glow on hover with 200ms transition (interactive demo)

   **Code Example:**
   ```html
   <div class="iso-container">
     <div class="iso-rotate iso-shadow bg-yellow w-24 h-24">
       Isometric box
     </div>
   </div>
   ```

### 4. **JSON API Endpoint** (`src/pages/design-system.json.ts`)

   **Astro GET Endpoint:**
   - Returns JSON with `Content-Type: application/json` header
   - Pretty-printed with 2-space indentation
   - Accessible at `/design-system.json`

   **Data Structure:**
   ```typescript
   {
     colors: {
       primary: { yellow, turquoise, magenta } // with OKLCH + hex + dark variants
       text: { yellowText, turquoiseText }
       neutral: { bgLight, bgDark, textLight, textDark }
     },
     typography: {
       families: { heading, body },
       scale: { xs, sm, base, lg, xl, 2xl, 3xl, 4xl },
       weights: { h1, h2, h3, h4, body }
     },
     components: {
       Button: { variants, sizes, props },
       Card: { variants, props },
       Input: { variants, props },
       Badge: { variants, props }
     },
     utilities: {
       shadow: ['iso-shadow-sm', 'iso-shadow', 'iso-shadow-lg'],
       glow: ['iso-glow-subtle', 'iso-glow', 'iso-glow-strong'],
       rotate: ['iso-rotate', 'iso-rotate-subtle', 'iso-rotate-steep'],
       hover: ['iso-hover-lift', 'iso-hover-glow']
     }
   }
   ```

   **Machine-Readable Format:**
   - All colors include OKLCH values for perceptual uniformity
   - Hex values for tooling compatibility
   - Component props with types and defaults
   - Complete utility class list

### 5. **CLAUDE.md AI Agent Instructions** (`CLAUDE.md`)

   **Design System Section Added:**
   - Positioned after Styling section for visibility
   - Three-step workflow: Check /design-system → Use existing components → Reference /design-system.json

   **Available Components List:**
   - Button - variants, sizes, use cases
   - Card - variants, stacked option
   - Input - variants, validation
   - Badge - metric display

   **Design Tokens Summary:**
   - Colors: yellow, turquoise, magenta (OKLCH with dark variants)
   - Typography: Bricolage Grotesque (headings), DM Sans (body)
   - Isometric utilities: iso-shadow, iso-glow, iso-rotate

   **Explicit Instruction:**
   - "Do not create new components for functionality that existing components already provide"
   - Prevents duplication and ensures consistency

## Deviations from Plan

None - plan executed exactly as written. All utilities documented with visual examples, JSON endpoint created with complete tokens, CLAUDE.md updated with AI agent instructions.

## Files Changed

| File | Type | Purpose |
|------|------|---------|
| `src/pages/design-system.astro` | Modified | Added complete Utilities section with visual examples for iso-shadow, iso-glow, iso-rotate |
| `src/pages/design-system.json.ts` | Created | JSON API endpoint with all design tokens, components, and utilities |
| `CLAUDE.md` | Modified | Added Design System section with AI agent instructions |

## Technical Decisions

### JSON API Endpoint Pattern

**Context:** Need machine-readable format for AI agents and tooling to access design tokens programmatically.

**Decision:** Created Astro GET endpoint at `/design-system.json` instead of static JSON file.

**Rationale:**
- Astro endpoints can be dynamically updated if needed (future: query params for filtering)
- Proper Content-Type header handling
- Integrated with Astro's build system (automatically includes in static output)
- Single source of truth: could import from TypeScript constants in future
- RESTful API pattern familiar to developers

**Alternatives Considered:**
- Static JSON file in `public/`: No build-time processing, harder to maintain consistency
- GraphQL endpoint: Overkill for simple token querying, adds complexity
- No API endpoint: Forces AI agents to parse HTML/CSS, error-prone

**Implementation:**
- Simple GET function returning Response object
- Hardcoded tokens for now (could import from shared constants later)
- Pretty-printed JSON for readability
- Includes all colors (OKLCH + hex), typography tokens, component metadata, utility classes

**Impact:** AI agents can `curl http://localhost:4321/design-system.json` to get complete design system data. Future tooling (design token exporters, Figma plugins, etc.) can integrate with single endpoint.

---

### Visual Utility Examples Over Code-Only Documentation

**Context:** Isometric utilities are visual effects (shadows, glows, rotations). Developers need to see what they do.

**Decision:** Live visual examples with colored boxes showing actual shadow/glow/rotate effects.

**Rationale:**
- "Show, don't tell" - utilities produce visual output, examples should be visual
- Dark mode transformation is complex (offset shadow → soft glow) - side-by-side comparison clarifies
- Rotation utilities use 3D transforms - static code doesn't convey depth effect
- Interactive demos (hover utilities) require live examples
- Developer can toggle dark mode and see transformation in real-time

**Alternatives Considered:**
- Code-only documentation: Clear for developers familiar with CSS, but doesn't show visual result
- External CodePen examples: Breaks user flow, examples can drift out of sync
- Static images: Don't respect dark mode, can't show interactive states

**Implementation:**
- Gray background demo area (bg-gray-100/bg-gray-900) to contrast with page background
- Colored boxes (turquoise for shadows, magenta for glows, yellow for rotations) to show effects clearly
- Grid layout for size/intensity variants
- Tables for scannable CSS values (light mode vs dark mode)
- Inline code examples immediately below each demo
- Perspective containers for rotation demos to show 3D depth

**Impact:** Developers can see exact visual effect before applying utility class. Clear understanding of shadow-to-glow transformation. Hover utilities demonstrate interactive behavior. Reduces trial-and-error development.

---

### CLAUDE.md Design System Section

**Context:** AI agents (like Claude Code) working on codebase may recreate existing components instead of using design system.

**Decision:** Added dedicated Design System section to CLAUDE.md with explicit instructions to check /design-system first.

**Rationale:**
- CLAUDE.md is read by AI agents at session start (per project instructions)
- Placing design system section early ensures agents see it before coding
- Explicit "Do not create new components" instruction prevents duplication
- Three-step workflow (check page → use components → reference JSON) guides agents to right resources
- Listing available components with variants helps agents make informed choices

**Alternatives Considered:**
- Rely on agents to discover /design-system page organically: No guarantee they'll find it before creating new components
- Separate AI-instructions.md file: Agents may not know to read it, fractures documentation
- Only reference in comments: Easy to miss, not indexed for AI session context

**Implementation:**
- Section positioned after Styling (related context) but before CI/CD
- Bold headings for scannability
- Numbered workflow for clarity
- Bullet list of components with variants and use cases
- Token summary (colors, typography, utilities)
- Explicit anti-pattern instruction at end

**Impact:** AI agents check design system first before creating new UI elements. Reduces component duplication. Ensures consistent use of design tokens. Future agents working on this codebase will automatically reference existing components.

## Verification Results

All verification criteria met:

- ✅ `npm run dev` - dev server starts successfully
- ✅ http://localhost:4321/design-system loads with Utilities section
- ✅ All isometric shadow sizes displayed with visual examples (sm, default, lg)
- ✅ All glow intensities displayed (subtle, default, strong)
- ✅ All rotation variants displayed with 3D perspective (subtle, standard, steep)
- ✅ Dark mode transformation clearly shown with side-by-side CSS examples
- ✅ Hover utilities (lift, glow) are interactive and demonstrate behavior
- ✅ http://localhost:4321/design-system.json returns valid JSON with `Content-Type: application/json`
- ✅ JSON includes all colors with OKLCH and hex values
- ✅ JSON includes all components (Button, Card, Input, Badge) with props and variants
- ✅ JSON includes all utilities (shadow, glow, rotate, hover arrays)
- ✅ CLAUDE.md Design System section exists with component list and token summary
- ✅ CLAUDE.md instructs agents to check /design-system before creating new components
- ✅ `npm run build` succeeds with no errors
- ✅ Built output includes `/dist/design-system.json` (4.4KB file)

## Next Phase Readiness

**Ready for Phase 17 Plan 05 (if exists) or Phase 18:** ✅

Design system documentation complete with:
- All tokens documented (colors, typography)
- All components documented (Button, Card, Input, Badge)
- All utilities documented (iso-shadow, iso-glow, iso-rotate)
- Machine-readable JSON API at /design-system.json
- AI agent instructions in CLAUDE.md

**No blockers.** Design system is now a complete reference for developers and AI agents building on this codebase.

## Task Completion

| # | Task | Commit | Duration |
|---|------|--------|----------|
| 1 | Document isometric utilities with visual examples | 77ebb01 | ~90s |
| 2 | Create JSON API endpoint at /design-system.json | a83ce28 | ~30s |
| 3 | Update CLAUDE.md with design system instructions | 0767e89 | ~30s |

**Total:** 3 minutes 9 seconds including verification and build.

## Patterns Established

1. **JSON API Endpoint Pattern:** Astro GET endpoints for machine-readable data exports (design tokens, config, etc.)
2. **Visual Utility Documentation Pattern:** Live examples with colored boxes and interactive demos for CSS utilities
3. **AI Agent Instruction Pattern:** Dedicated section in CLAUDE.md with explicit workflows and anti-patterns
4. **Shadow-to-Glow Transformation Documentation:** Side-by-side CSS examples showing light mode vs dark mode values
5. **Utility Class Categorization:** Shadow (adaptive), Glow (always-on), Rotate (3D transforms), Hover (interactions)

## Success Metrics

- [x] All must-have truths satisfied
  - [x] Developer can view isometric shadow utilities (iso-shadow-sm, iso-shadow, iso-shadow-lg) with visual examples
  - [x] Developer can view isometric glow utilities (iso-glow-subtle, iso-glow, iso-glow-strong) with visual examples
  - [x] Developer can view isometric rotation utilities (iso-rotate, iso-rotate-subtle, iso-rotate-steep) with visual examples
  - [x] Developer can view shadow-to-glow dark mode transformation examples with side-by-side CSS
  - [x] Developer can access JSON export at /design-system.json with all tokens and components
  - [x] AI agents see instruction in CLAUDE.md to check design system first before creating new UI
- [x] All must-have artifacts created with required functionality
  - [x] `src/pages/design-system.json.ts` exists with GET function exporting JSON
  - [x] `src/pages/design-system.astro` Utilities section contains #utility-iso-shadow, #utility-iso-glow, #utility-iso-rotate
  - [x] `CLAUDE.md` contains Design System section with /design-system reference
- [x] All key links established (GET endpoint, utility sections, CLAUDE.md instructions)
- [x] Build succeeds with no errors
- [x] Verification steps passed
- [x] No deviations from plan required

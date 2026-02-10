# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-09)

**Core value:** Small business owners can understand what Joel does, trust his process, and easily reach out to start a conversation.

**Current focus:** Phase 15 - Technology Section (v1.2 Homepage Refinement)

## Current Position

Phase: 15 of 16 (Technology Section)
Plan: 2 of ? in current phase
Status: In progress
Last activity: 2026-02-10 - Completed 15-02-PLAN.md (technology section restructure)

Progress: [███████████████████████░░░░░░░░░] 81% (56 of 69+ plans complete)

## Milestone History

| Version | Name | Phases | Shipped |
|---------|------|--------|---------|
| v1.0 | MVP | 1-6 | 2026-01-27 |
| v1.1 | Design Updates | 7-11 | 2026-02-10 |

See `.planning/MILESTONES.md` for full milestone details.
See `.planning/milestones/` for archived roadmaps and requirements.

## Performance Metrics

**Velocity:**
- Total plans completed: 47 (v1.0 + v1.1)
- Average duration: ~15-20 min/plan (estimated)
- Total execution time: ~13-16 hours across 2 milestones

**By Milestone:**

| Milestone | Phases | Plans | Status |
|-----------|--------|-------|--------|
| v1.0 MVP | 1-6 | 23 | Complete |
| v1.1 Design | 7-11 | 14 | Complete |
| v1.2 Refinement | 12-16 | 8/? | In progress |

**Recent Trend:**
- v1.1 velocity: Stable, 2-day milestone completion
- Quality maintained: WCAG 2.2 AA compliance achieved

*Will update per-phase metrics after v1.2 plans created*

## Accumulated Context

### Decisions

Key decisions are logged in PROJECT.md Key Decisions table.

Recent decisions affecting v1.2:
- **Phase 15-02**: Flat article layout (no Card component) for technology section improves scannability vs card-based layouts
- **Phase 15-02**: "What I Build" heading replaces "How I Build" for user-focused service offering messaging (vs tech stack)
- **Phase 15-02**: 3-column responsive grid (gap-8 md:gap-12) establishes service category structure: AI Solutions, Automations, Web Apps
- **Phase 15-01**: Technology illustration metaphors: neural network (AI), interlocking gears (automations), browser window (web apps) for instant category recognition
- **Phase 15-01**: Under-1KB optimization: Simplified TechAutomations from 8 to 4 gear teeth (739 bytes) while maintaining visual clarity
- **Phase 14-03**: Padding calculation pattern for illustrations: position + width + gap = required padding (validates proper spacing)
- **Phase 14-03**: Fixed illustration overlap with pl-24 md:pl-32 (was pl-16 md:pl-20) ensuring 16px/24px gaps
- **Phase 14-02**: Single paragraph descriptions (1-2 sentences) replace You:/Joel: boxes for improved scannability and user focus
- **Phase 14-02**: Color variety across process steps (yellow, turquoise, magenta) enhances visual differentiation and memorability
- **Phase 14-02**: Increased left padding (pl-16 md:pl-20) accommodates illustrations without overlapping step numbers (later refined in 14-03)
- **Phase 14-01**: Simple geometric shapes (3-5 per illustration) ensure clarity at 64x64px and keep files under 1KB
- **Phase 14-01**: currentColor enables CSS-based theming - single SVG works with any color without variants
- **Phase 14-01**: Opacity-based face differentiation (0.7, 0.85, 1.0) creates isometric depth without color complexity
- **Phase 13-01**: Badge variants use WCAG-compliant text tokens from global.css for automatic contrast compliance
- **Phase 13-01**: Badges use iso-shadow utility for automatic dark mode glow transformation
- **Phase 13-01**: Conservative placeholder metrics (500+ hours, 100%, 12+) for credibility - can update with real data later
- **Phase 12-03**: Visual regression tests use maxDiffPixels: 100 for anti-aliasing tolerance
- **Phase 12-03**: Role-based selectors (contentinfo) for main footer to avoid strict mode violations
- **Phase 12-02**: Isometric glow colors derive from currentColor (element's text color) for flexible per-element theming
- **Phase 12-02**: OKLCH color-mix for isometric glows ensures perceptually uniform results across hues
- **Phase 12-02**: Three rotation presets (subtle 30°, standard 45°, steep 60°) for different illustration styles
- **Phase 12-01**: Icon library migrated to @lucide/astro for tree-shaking, using direct component pattern with size props
- **v1.1 Phase 11**: WCAG 2.2 AA accessibility compliance validated via Playwright + axe-core (98.7% manual audit pass)
- **v1.1 Phase 9**: Narrative homepage structure (Solutions → Process → Tech → About → Contact)
- **v1.1 Phase 7**: Shadow-to-glow dark mode transformation maintains visual hierarchy without box-shadow flickering
- **v1.1 Phase 7**: OKLCH color system for perceptually uniform neobrutalist palette

### Pending Todos

**Before deployment:**
1. Configure Formspree form ID (replace `YOUR_FORM_ID` in ContactSection.astro)
2. Add real social links (LinkedIn, GitHub URLs)
3. Replace placeholder images with real content

**Nice to have:**
1. Add real project screenshots (currently using placeholder SVGs)
2. Expand project dataset to 5-10 projects for credibility
3. Add aria-pressed to filter buttons for screen reader state announcement
4. Update contact.astro to use Button/Input components with turquoise variant (discovered in 12-UAT)

### Blockers/Concerns

**Phase 12 considerations:**
- ✅ Icon migration completed (12-01): Pattern established for future icon usage
- ✅ Isometric utilities completed (12-02): Dark mode glow transformation working, test page at /test-isometric
- ✅ Icon visual regression tests (12-03): Baseline screenshots ensure icon rendering consistency

**Phase 14/15 considerations:**
- ✅ Phase 14 complete: Process section with 5 isometric illustrations, user-focused descriptions, and correct spacing
- ✅ Phase 15-01 complete: Technology illustrations created (AI, Automations, Web Apps) following established style guide
- ✅ Phase 15-02 complete: Technology section restructured with 3 service categories and illustrations
- ✅ Technology section layout validated: Flat article layout beats card-based layout for scannability
- ✅ Service category structure established: AI Solutions, Automations, Web Apps with user-focused descriptions
- ✅ Technology illustration metaphors validated: Neural network, gears, browser window are distinct and recognizable at 64x64px
- ✅ Isometric illustration style guide established (14-01): 3-5 shapes, currentColor, viewBox, opacity faces
- ✅ SVG size target validated (14-01, 15-01): All 8 illustrations under 1KB each, 5.74KB total
- ✅ Process integration validated (14-02): Responsive sizing, accessibility maintained, minimal LCP impact
- ✅ Illustration positioning pattern validated (14-03): Padding calculation ensures proper gaps at all viewports
- ✅ Color variety pattern proven: yellow/turquoise/magenta differentiation works across both Process and Tech sections
- iso-shadow-sm proven effective for 64px illustrations (used in both Process and Tech sections)

**Phase 16 considerations:**
- FAQ keyboard accessibility already validated in v1.1, should carry forward to dedicated page

**Phase 13 considerations:**
- ✅ Phase 13 complete: Badge component and outcome-focused hero with 3 trust badges
- Badge component pattern established for reuse in other sections

## Session Continuity

Last session: 2026-02-10
Stopped at: Completed 15-02-PLAN.md (technology section restructure)
Resume file: None
Next action: Continue Phase 15 or proceed to Phase 16

---
*State initialized: 2026-01-26*
*Last updated: 2026-02-10 (Phase 15-02 complete: Restructured TechSection.astro with 3 service categories - AI Solutions, Automations, Web Apps)*

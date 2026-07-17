# Phase 37: Landing Page - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-16
**Phase:** 37-landing-page
**Areas discussed:** Anchor nav active states, Book-a-call behavior, Proof/testimonial content, Copy-gap protocol

---

## Anchor nav active states

### Scroll-spy approach

| Option | Description | Selected |
|--------|-------------|----------|
| Tiny IntersectionObserver script | ~15 lines vanilla JS in SiteHeader; works everywhere; breaks zero-JS streak deliberately | ✓ |
| CSS scroll-driven animations | Zero JS but incomplete browser support; partial effect | |
| Drop active states | Amend criterion 3 to smooth scroll + offset only | |

**User's choice:** Tiny IntersectionObserver script (recommended option)

### Active link visual treatment

| Option | Description | Selected |
|--------|-------------|----------|
| Accent color, match hover | `text-wl-accent`, minimal invention, flagged as derived at gate | ✓ |
| Accent + underline | Distinguishes active from hovered sibling; more invention | |
| Check Figma first, then derive | Researcher confirms no active state specced before deriving | |

**User's choice:** Accent color, match hover (recommended option)

### Edge behavior between anchor sections

| Option | Description | Selected |
|--------|-------------|----------|
| No link highlighted | Active only while #services/#about actually in view | ✓ |
| Nearest section stays lit | Nav always shows rough position | |
| You decide | Planner/executor discretion | |

**User's choice:** No link highlighted (recommended option)

### Assistive tech exposure

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, aria-current on both | `aria-current="location"` via scroll-spy; `aria-current="page"` build-time on Showcase link | ✓ |
| Visual only | Class only, no ARIA | |
| You decide | Standard practice + axe verification | |

**User's choice:** Yes, aria-current on both (recommended option)

---

## Book-a-call behavior

### CTA destination pre-Calendly

| Option | Description | Selected |
|--------|-------------|----------|
| Scroll to Final CTA (#book) | Keep current placeholder behavior | |
| mailto: directly | Email until Calendly exists | |
| Placeholder Calendly URL | Risky dead-end external link | |

**User's choice:** Free-text — "I have a real Calendly URL: https://calendly.com/discovery-joelshinness/discovery-call"
**Notes:** Question rendered moot; the real URL ships this phase, resolving FUT-01.

### Tab behavior

| Option | Description | Selected |
|--------|-------------|----------|
| New tab | `target="_blank" rel="noopener"`; visitor keeps site open | ✓ |
| Same tab | Full handoff to Calendly | |

**User's choice:** New tab (recommended option)

### Email CTA role

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, keep email secondary | Calendly primary, mailto:contact@ secondary per Figma; both via constants | ✓ |
| Calendly only | Drop email CTAs, deviating from mockups | |

**User's choice:** Yes, keep email secondary (recommended option)

---

## Proof/testimonial content

### Proof section authenticity

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, ship verbatim | All Proof content is true and approved; no extra checks | ✓ |
| Verify at fidelity gate | Build verbatim + explicit truth sign-off at gate | |
| Some of it isn't real | Identify aspirational content and adapt/hold | |

**User's choice:** Yes, ship verbatim

### Blanket approval for all landing copy

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, all approved | Whole 12:2 frame is real, approved copy | ✓ |
| Approved except… | Specific call-outs | |

**User's choice:** Yes, all approved (recommended option)

---

## Copy-gap protocol

### Gap handling during --chain build

| Option | Description | Selected |
|--------|-------------|----------|
| Batch at fidelity gate | COPY-GAPS list + visible [COPY GAP] markers; resolve at gate | ✓ |
| Pause immediately | Every gap is a blocking checkpoint | |
| Hybrid by severity | Whole-section gaps pause; small gaps batch | |

**User's choice:** Batch at fidelity gate (recommended option)

### Light/dark frame divergence

| Option | Description | Selected |
|--------|-------------|----------|
| Light frame canonical | 12:2 truth for copy/structure/layout; 117:103 colors only | ✓ |
| Newest edit wins | Most recently edited frame is latest intent | |
| Always flag, no default | Every divergence goes to Joel with no build default | |

**User's choice:** Light frame canonical (recommended option)

---

## Claude's Discretion

- Shared constants module location and exports
- Scroll-spy mechanics (thresholds, rootMargin, script placement)
- index.astro composition: single file vs. per-section components
- Section `id` placement and any extra anchors the frame implies
- FrequencyWave placement/sizing; FAQItem usage if the frame includes FAQ
- Fidelity-gate screenshot mechanics (follow Phase 34–36 precedent)

## Deferred Ideas

- Old landing-body components (Hero, Services, Process, About, ContactSection) become dead code — deletion stays in Phase 41 (CLEAN-01)
- PROJECT.md/REQUIREMENTS.md evolution: FUT-01 resolved by the real Calendly URL — update at next evolution point

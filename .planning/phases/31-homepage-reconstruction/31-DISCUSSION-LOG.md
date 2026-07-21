# Phase 31: Homepage Reconstruction - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-11
**Phase:** 31-homepage-reconstruction
**Areas discussed:** Section topology (Crito 10 vs Joel 5), Joel-brand chrome (Header nav + logo), ContactSection treatment, Plan structure + calibration scope

---

## Area Selection (multi-select)

User selected all 4 gray areas presented:
- Section topology — Crito 10 vs Joel 5
- Joel-brand chrome — Header nav + logo
- ContactSection — keep on homepage or omit
- Plan structure + calibration scope

---

## Area 1: Section Topology — Crito 10 vs Joel 5

### Q1: Topology backbone

| Option | Description | Selected |
|--------|-------------|----------|
| Joel-shape, Crito-vocab (Recommended) | Honor Joel's 5-section v1.3 narrative (Hero → Services → Process → About → close) using Crito-vocab tokens and library components. v1.3 content authority. | ✓ |
| Crito-shape, Joel-content | Honor Crito's 10-section topology with Joel content mapped section-by-section. Strict Phase 29 D-129. | |
| Joel-shape + 1-2 Crito-only sections | Joel backbone + 1-2 Crito-only sections (e.g., Testimonial / 'Performance is the key' strip). | |
| Joel-shape, ignore Crito topology | Pure joel-only branch — treat ujMLJ as token-mining source only; no Crito pairing for calibration. | |

**User's choice:** Joel-shape, Crito-vocab (Recommended) → D-156

### Q2: Hero treatment

| Option | Description | Selected |
|--------|-------------|----------|
| Crito Hero layout, Joel copy (Recommended) | Follow Crito Hero structure (PJS 70 + Inter 18 + dual CTAs primary+Secondary + decorative anchor). Joel's v1.3 hero copy. Triggers OPEN-25-01 white-stroke override. | ✓ |
| Joel v1.3 bento-grid Hero | Reconstruct Joel's bento-grid (5 outcome tiles + center headline + bottom CTA). Departure from Crito; faithful to v1.3 layout (but visual chrome OUT-OF-SCOPE). | |
| Simplified Hero — headline + 1 CTA + visual | Strip to essentials: 1 headline + 1 subtitle + 1 Primary CTA + STUB visual. Lowest risk. | |
| STUB Hero — layout frame only | Punt Hero design to later phase. | |

**User's choice:** Crito Hero layout, Joel copy (Recommended) → D-157

### Q3: Services treatment

| Option | Description | Selected |
|--------|-------------|----------|
| 3-column Card grid, no new section component (Recommended) | Inline 3 Compound/Card (t40xct) instances. Matches Phase 28/29 card-grid pattern. No new section component per Pitfall O5/O6. | ✓ |
| New Section/ServicesGrid component | Factor as Section/ServicesGrid in Plan 31-00. Probably overkill (single-consumer). | |
| Inline 3-column with no Card library | Hand-roll service cards. Diverges from consistency pattern. | |

**User's choice:** 3-column Card grid, no new section component (Recommended) → D-158

### Q4a: Process treatment

| Option | Description | Selected |
|--------|-------------|----------|
| 5-step vertical timeline, inline composition (Recommended) | Inline vertical-stack of 5 step blocks (number + title + body). Step illustrations STUB. No new section component. | ✓ |
| 5 horizontal cards (Compound/Card × 5) | Reuse Compound/Card. Risk: 5 cards in one row at 1440 too narrow. | |
| Numbered step strip + sibling note | Custom strip with number markers + STUB illustrations. | |
| STUB Process — single placeholder block | Single STUB block with sibling note pointing to v1.3 Process.astro. | |

**User's choice:** 5-step vertical timeline, inline composition (Recommended) → D-159

### Q4b: About treatment

| Option | Description | Selected |
|--------|-------------|----------|
| 2-column About — headshot + bio + CTA (Recommended) | Inline 2-column: image-fill rectangle (headshot STUB) left, H2 + bio + Primary CTA right. | ✓ |
| Centered About — stacked vertical | Centered vertical stack: H2 + body + CTA. Drops headshot. | |
| Omit About on homepage | Drop the section entirely; defer to a /about route. Diverges from v1.3 narrative. | |

**User's choice:** 2-column About — headshot + bio + CTA (Recommended) → D-160

---

## Area 2: Joel-Brand Chrome — Header Nav + Logo

### Q1: Header nav override

| Option | Description | Selected |
|--------|-------------|----------|
| Override to Joel's 4-link nav on Homepage frame only (Recommended) | Descendants override on Phase 31 Homepage Section/Header instance: hide Home/About/Services, keep Blog/FAQ/Contact, add Projects. Other pages keep Crito 6-link defaults. | ✓ |
| Override to 4-link nav on ALL reconstructed pages | Apply override on Section/Header component itself (G0wNOc). Invasive; higher regression risk. | |
| Keep Crito-source 6-link nav verbatim | No override. Sibling note documents v1.3 4-link target. | |

**User's choice:** Override to Joel's 4-link nav on Homepage frame only (Recommended) → D-162

### Q2: Logo treatment

| Option | Description | Selected |
|--------|-------------|----------|
| Logo slot stays Crito placeholder + sibling note (Recommended) | Keep Crito placeholder in Header instance. Sibling Pencil note documents v1.3 'Joel Shinness' wordmark for code milestone. Honors PROJECT.md Out of Scope. | ✓ |
| Override logo slot with text wordmark 'Joel Shinness' | Descendants override: text node 'Joel Shinness' in PJS 700. Joel-identity at minimum visual cost. | |
| Drop logo slot entirely | Hide logo via enabled:false. Page reads as anonymous Crito-vocab surface. | |

**User's choice:** Logo slot stays Crito placeholder + sibling note (Recommended) → D-163

---

## Area 3: ContactSection / Bottom Close

### Q1: Homepage bottom close

| Option | Description | Selected |
|--------|-------------|----------|
| Section/CTA close — 'Let's talk' (Recommended) | Instance Phase 26 Section/CTA (Hs5rc): headline + body + Primary Button → /contact. Mirrors Phase 27 Thank-you close. Sibling note re v1.3 ContactSection on-homepage. SECOND cross-phase Section/CTA consumer. | ✓ |
| Embedded full ContactSection — instance Contact frame | Embed full 8-field form. Risk: duplicates work in two places; maintenance burden. | |
| Mini contact preview — name + email + Send | Minimal 2-field preview + sibling note linking to /contact full form. | |
| No bottom section — page ends at About | Skip closing section. Loses 'final CTA' moment that lead-gen homepages need. | |

**User's choice:** Section/CTA close — 'Let's talk' (Recommended) → D-161

---

## Area 4: Plan Structure + Calibration Scope

### Q1: Plan structure

| Option | Description | Selected |
|--------|-------------|----------|
| 31-00 foundation + 31-01 single-frame composition (Recommended) | Two plans, matches Phase 30 precedent. Foundation: probe descendants overrides + ujMLJ Hero subtree. Composition: full Homepage frame + single calibration gate. | ✓ |
| 31-00 foundation + 31-01 top half + 31-02 bottom half | Three plans. Composition split across two calibration gates (different branches). | |
| Roadmap's 3-plan split (31-01 hero+services, 31-02 process+about, 31-03 close) | Match existing ROADMAP placeholders. More calibration gates; heavier overhead than Phase 30. | |
| Single 31-01 plan, no foundation | Skip foundation. Breaks foundation-first chain; higher risk. | |

**User's choice:** 31-00 foundation + 31-01 single-frame composition (Recommended) → D-164

### Q2: Calibration branch

| Option | Description | Selected |
|--------|-------------|----------|
| Joel-only branch (§ 4) with Hero pairing exception (Recommended) | Default to § 4 joel-only token-usage vs RpGbe, EXCEPT Hero section gets § 3.4 step 4 side-by-side pairing against ujMLJ Hero subtree. PAGE-11 LOCK for sub-section Crito Hero illustration per § 3.3. | ✓ |
| Pure joel-only branch (§ 4) | No Hero side-by-side. ujMLJ becomes pure token-mining source. PAGE-11 INERT. | |
| Pure crito-source branch (§ 3) with ujMLJ as target | Side-by-side against ujMLJ as whole frame. Always shows 'mismatch by design' given Joel-shape topology. | |

**User's choice:** Joel-only branch (§ 4) with Hero pairing exception (Recommended) → D-155 + D-165

---

## Closing Check

**Q:** Phase 31 implementation choices are captured. Which gray areas remain unclear?

| Option | Description | Selected |
|--------|-------------|----------|
| I'm ready for context | Decisions sufficient. Write CONTEXT.md and auto-advance to plan-phase (chain mode). | ✓ |
| Explore more gray areas | Surface more decisions (Hero CTA labels, Services illustration treatment, Section/CTA copy, partner-logo strip inclusion, etc.). | |

**User's choice:** I'm ready for context

---

## Claude's Discretion

Carried over to CONTEXT.md `<decisions>` § "Claude's Discretion" — items that plan-execution selects at plan-time per documented defaults:

- Hero section internal layout (horizontal vs vertical-stack) — Plan 31-01 plan-execution decides per ujMLJ Hero subtree probe outcome
- Hero Secondary Button label (default candidates: "See how I work" / "View my projects" — plan-execution selects per Plan 31-00 Task 0 v1.3 audit; default lean: link to /projects)
- Services H2 wording ("Solutions" or "Services" — plan-execution selects from v1.3 verbatim)
- Process H2 wording + step orientation (vertical-stack default; horizontal-grid alternative)
- About bio length + CTA copy (v1.3 verbatim)
- Closing-CTA headline + body + button label (plan-execution selects from v1.3 ContactSection)
- Header descendants-override path for nav items (HIDE Home/About/Services + ADD Projects vs REPLACE one hidden slot's text) — Plan 31-00 Task 1 probe decides
- OPEN-25-01 white-stroke descendants-override exact child IDs — Plan 31-00 Task 2 probe identifies
- Crito Hero decorative shape treatment (Pencil-native ellipse vs sibling note) — default: ellipse
- About headshot STUB visual (solid-fill vs gradient vs placeholder-with-icon) — default: solid-fill
- Snapshot_layout discipline + cross-row stale-cache fallback (Tier-1/Tier-2 per § 6.4)
- Spacing rhythm between sections (default: `space-semantic-section-y`)
- Plan 31-01 calibration gate description ordering (section-by-section vs protocol-by-protocol) — default: section-by-section
- Cross-phase consistency call-out at calibration gate (Section/Header + Section/Footer cross-page proof)
- PEN-INVENTORY locked vs hidden vs partial status_counts schema choice — plan-execution decides at PEN-INVENTORY extension write-time

## Deferred Ideas

Carried over to CONTEXT.md `<deferred>` section — every idea explicitly noted as out-of-scope-for-Phase-31 or future-milestone:

- Crito 10-section topology adoption (partner-logo / We help to grow / Dashboard / Why will you choose / How to grow / Testimonial / Performance is the key / Ready to use our app sections)
- Joel's v1.3 Hero bento-grid layout + Joel-brand neobrutalist chrome (Bricolage Grotesque + uppercase + 3-layer shadow + variant colors)
- Joel-brand isometric illustrations (Services + Process + About headshot — STUBs in Phase 31; code milestone wires)
- Joel-brand wordmark / logo asset (D-163 deferral)
- Joel-brand fonts (Bricolage Grotesque + DM Sans)
- ContactSection.astro full 8-field form on Homepage frame (D-161 declined; full form lives at /contact n0QqTd)
- Header nav 4-link override propagation to other reconstructed pages (Phase 32 sweep optional back-propagation)
- Sticky positioning behavior (code milestone)
- Bottom contact preview (mini form) — Area 3 declined in favor of Section/CTA
- OPEN-23-09 Poppins token addition (RESOLVED — Joel doesn't need)
- `type-semantic-heading-5/-6` token additions (OPEN-23-10 long-tail; no Phase 31 consumer)
- `radius-semantic-pill` token addition (OPEN-23-12 long-tail; no Phase 31 consumer)
- Crito Hero illustration as Pencil-native composition (LOCK per D-155; code milestone reconstructs)
- `Section / SidebarNav` factoring (Phase 30 D-145; Homepage doesn't need)
- `Section / SecondaryLink` consolidation (Phase 27 D-99 + Phase 29 D-133; no Phase 31 third consumer surfaces)
- Phase 31 D-155 HYBRID sub-branch CALIBRATION-PROTOCOL promotion (Phase 32 evaluation)
- Code-milestone homepage rebuild (future code milestone scope)

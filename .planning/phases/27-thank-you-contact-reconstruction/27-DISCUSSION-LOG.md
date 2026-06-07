# Phase 27: Thank-you + Contact Reconstruction - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-07
**Phase:** 27-thank-you-contact-reconstruction
**Areas discussed:** Input variants, Calendly placeholder mechanic, Contact page layout shape, Thank-you composition + microcopy

---

## Input variants

### Q1: How should the 4 missing form-input types (textarea, select, checkbox, checkbox-group) be structured in the Pencil library?

| Option | Description | Selected |
|--------|-------------|----------|
| Hybrid (Recommended) | Textarea = variant on Primitive/Input (shares structure). Select = NEW sibling Primitive/Select (chevron icon makes it distinct). Checkbox = NEW sibling Primitive/Checkbox (totally different shape). CheckboxGroup = NEW Compound/CheckboxGroup composing N Checkbox instances. Each gets its own Default/Focus/Error trinity. | ✓ |
| Pure variants on Input | Everything joins Primitive/Input as variants. Conflates fundamentally different shapes. | |
| Pure sibling primitives + 1 compound | Primitive/Textarea, Primitive/Select, Primitive/Checkbox each shipped as siblings. Clean React-style taxonomy but adds 3 new primitives. | |

**User's choice:** Hybrid
**Notes:** Lands at D-89 — taxonomy by shape, not by form-element kinship.

### Q2: Minimum forward-state coverage for each new primitive?

| Option | Description | Selected |
|--------|-------------|----------|
| Default/Focus/Error trinity (Recommended) | Matches Phase 24 D-22; 8-field form actively exercises all three. Partially resolves OPEN-24-04/08/09. | ✓ |
| Default only | Smaller scope (4 variants total) but breaks Phase 24 D-22 forward-state discipline. Form can't validate visually without Error. | |
| Default/Focus/Error + Disabled | Adds Disabled to trinity. But Phase 24 didn't ship Disabled → inconsistency. | |

**User's choice:** Default/Focus/Error trinity
**Notes:** Lands at D-90 — Disabled deferred to a future state-coverage extension phase.

### Q3: How should the required-field indicator (red asterisk after label) render in the Pencil components?

| Option | Description | Selected |
|--------|-------------|----------|
| Slot mechanic on label (Recommended) | Add optional `required-mark` text node to Primitive/Input's label-slot; `enabled:true` for required, `enabled:false` for optional. Matches Phase 25 D-53 placeholder slot pattern. | ✓ |
| Descendants override at instance time | Each form instance adds red `*` as descendants override. Zero library change but less reusable. | |
| Skip required indicator entirely | Phase 27 doesn't ship required markers; deferred as OPEN-27-NN. | |

**User's choice:** Slot mechanic on label
**Notes:** Lands at D-91 — `color-semantic-text-error` reused for fill; new alias only if visual rendering needs distinct color.

### Q4: Selects (Budget + Timeline) have a dropdown popover state when opened. Does Pencil ship open-popover state, or closed-state only?

| Option | Description | Selected |
|--------|-------------|----------|
| Closed-state only (Recommended) | Primitive/Select chrome + chevron-down + placeholder text in Default/Focus/Error trinity. Matches Phase 26 D-59 (static design tool represents READING state). | ✓ |
| Closed + Open dropdown states | Ship both. Breaks D-59 precedent. | |
| Closed + Open as separate Compound | Closed-Select primitive + Open-SelectMenu compound. Still ships interaction state. | |

**User's choice:** Closed-state only
**Notes:** Lands at D-92 — D-59 precedent extended.

---

## Calendly placeholder mechanic

### Q1: ROADMAP success criterion 1 names a 'distinct slot/note so the future code milestone can wire a real Calendly link.' What's the mechanism?

| Option | Description | Selected |
|--------|-------------|----------|
| Section/CTA instance + sibling note (Recommended) | Reuse Phase 26 Section/CTA (Hs5rc, 3-slot: headline/body/actions). actions-slot holds Primitive/Button/Default 'Book a call'. Sibling Pencil note documents wiring. Composable, reuses Phase 26 work. | ✓ |
| Plain layout frame + sibling Pencil note | Just a vertical-stack frame + note. Lightweight but breaks consistency with Phase 31 future use. | |
| New Section/Calendly component | Build a reusable Section/Calendly. Single-consumer overkill per O5/O6. | |

**User's choice:** Section/CTA instance + sibling note
**Notes:** Lands at D-93 — first cross-phase consumer of Phase 26 Section/CTA; validates D-78 reusability claim.

### Q2: Where does the Calendly placeholder appear — only on Thank-you, or also on Contact?

| Option | Description | Selected |
|--------|-------------|----------|
| Both pages (Recommended) | v1.3 has Calendly on BOTH thank-you.astro AND ContactSection.astro sidebar Card. Single mechanism, two consumers. | ✓ |
| Thank-you only | Calendly only on Thank-you. Contact form-only. | |
| Contact only | Contact sidebar shows Calendly; Thank-you doesn't. Contradicts ROADMAP success criterion 1. | |

**User's choice:** Both pages
**Notes:** Lands at D-94 — two compositions (Section/CTA on Thank-you, Compound/Card on Contact), unified note convention.

### Q3: What does the Calendly sibling note actually document, and where does it live?

| Option | Description | Selected |
|--------|-------------|----------|
| Pencil text node sibling + PEN-INVENTORY row (Recommended) | Sibling Pencil text node next to each Section/CTA-Calendly + new PEN-INVENTORY `## Calendly Wiring Map (Phase 27)` section. Belt-and-suspenders per Phase 25 D-52. | ✓ |
| PEN-INVENTORY only | No sibling Pencil text node. Cleaner .pen but doesn't self-document. | |
| Section/CTA descendants override + comment | Use body-slot as designed comment. Loses ability to ship STUB body microcopy. | |

**User's choice:** Pencil text node sibling + PEN-INVENTORY row
**Notes:** Lands at D-93 (combined with Q1) — both URLs (calendly.com/joelshinness for Thank-you, calendly.com/me--juoi/discovery-call for Contact) documented in the Wiring Map section.

---

## Contact page layout shape

### Q1: cl8tt is flat raster (no structure). v1.3 ContactSection uses asymmetric 2:1 grid (form left, Calendly sidebar Card right). What's the /contact page composition?

| Option | Description | Selected |
|--------|-------------|----------|
| 2-col grid mirroring v1.3 (Recommended) | Header → page-intro → 2-col (form 2fr + Calendly sidebar 1fr) → Footer. Mirrors v1.3 UX intent. | ✓ |
| Single-column with Calendly below form | Single vertical stack. Contradicts v1.3 'shortcut' UX. | |
| Form-only, Calendly elsewhere | Contact is form-only; Calendly only on Thank-you / Header CTA. | |

**User's choice:** 2-col grid mirroring v1.3
**Notes:** Lands at D-95 — sidebar `flex-start` (top-aligned with form's first field) per v1.3 `items-start`.

### Q2: Contact sidebar 'Book a call' — native Compound/Card instance, or Section/CTA instance?

| Option | Description | Selected |
|--------|-------------|----------|
| Compound/Card instance (Recommended) | Sidebar = Compound/Card (Phase 25 t40xct): image disabled, title 'Ready to chat?', body 'Schedule a discovery call...', footer-actions Button 'Book a Call' + sibling note. Honest about sidebar's true shape. | ✓ |
| Section/CTA instance everywhere | Uniform mechanism but cramped at 1fr sidebar width (~480px) given row-shaped 3-slot signature. | |
| Plain inline layout frame | Loses Card visual chrome (border, padding, shadow). | |

**User's choice:** Compound/Card instance
**Notes:** Lands at D-96 — different composition from Thank-you's Section/CTA, unified note convention. First cross-phase consumer for Compound/Card outside Phase 25.

### Q3: Form field shape authority — Joel's 8-field v1.3 set vs whatever the cl8tt raster depicts?

| Option | Description | Selected |
|--------|-------------|----------|
| Joel's 8-field v1.3 set is authority | Field list verbatim from v1.3. cl8tt informs visual only. | |
| cl8tt raster shape is authority | Whatever cl8tt depicts ships; Joel's 8-field set becomes deferred. (User initially picked this — clarified at Q4.) | |
| Hybrid — Joel's set + cl8tt-derived ordering | Field LIST = Joel's; field ORDERING/grouping = cl8tt raster. | |

**User's initial choice:** cl8tt raster shape is authority — flagged as contradicting ROADMAP success criterion 2 ("8-field lead-qualification form").

### Q3 (clarifying): cl8tt is a FLAT RASTER (per OPEN-23-05) — 0 editable children. Confirm intent?

| Option | Description | Selected |
|--------|-------------|----------|
| Confirm cl8tt-authority; document ROADMAP supersession | Probe raster image; ship whatever Crito depicted. Most aligned with v2.0 fresh-in-Crito-vocab. | |
| Hybrid — cl8tt visual + Joel's 8 fields (Recommended) | Field LIST = Joel's 8 v1.3 fields; cl8tt = VISUAL calibration target. Matches ROADMAP success criterion 2 literally. | ✓ |
| Switch to Joel's 8-field set | Joel's shape is authority; cl8tt is calibration target. | |

**User's choice:** Hybrid — cl8tt visual + Joel's 8 fields
**Notes:** Lands at D-97 — field LIST + microcopy verbatim from v1.3; cl8tt raster informs spacing rhythm, page-intro presence, sidebar shape, button placement.

### Q4: Microcopy fidelity for Contact's text-bearing surfaces?

| Option | Description | Selected |
|--------|-------------|----------|
| v1.3 verbatim where it exists; STUB if new (Recommended) | All v1.3 truth ships verbatim (page-intro, field labels, placeholders, select options, sidebar Card, submit, privacy line). No new microcopy on Contact = no STUB. | ✓ |
| STUB all microcopy | Treat all as STUB. Contradicts D-82 (Phase 26 shipped FAQ Q+A verbatim). | |
| Verbatim labels; STUB body text | Splits content. Hairsplits unnecessarily. | |

**User's choice:** v1.3 verbatim where it exists; STUB if new
**Notes:** Lands at D-98 — all sections EXACT fidelity per D-83 reading.

---

## Thank-you composition + microcopy

### Q1: Thank-you page is joel-only-no-crito-ref. What's the section composition (between Header and Footer)?

| Option | Description | Selected |
|--------|-------------|----------|
| Hero-style success + Calendly CTA (Recommended) | Header → success-message section (icon + heading + body) → Section/CTA-Calendly → optional 'Return to homepage' secondary link → Footer. | ✓ |
| Single combined section | One section combining success + CTA. Conflates 'done' messaging with 'now do this' CTA. | |
| Reuse Section/NavBack from Phase 26 | Header → message section → Section/NavBack with overrides → Footer. Stretches NavBack beyond D-79 reserved scope. | |

**User's choice:** Hero-style success + Calendly CTA
**Notes:** Lands at D-99 — distinct success-message and Section/CTA-Calendly sections (matches v1.3 thank-you.astro's visual intent translated into Crito vocab).

### Q2: Success indicator on Thank-you — v1.3 uses lucide CheckCircle2 at size 64. Phase 24 Primitive/Icon ships size variants 16/20/24/32 only.

| Option | Description | Selected |
|--------|-------------|----------|
| lucide CheckCircle Pattern A + Icon/32 instance (Recommended) | lucide-native `circle-check` via Pattern A per Phase 24 D-44. Primitive/Icon/32 instance (largest existing variant). Visually smaller than v1.3 size 64 but stays inside existing Icon variant set. | ✓ |
| Add Icon/48 or Icon/64 variant in Phase 27 | Extend Phase 24 Primitive/Icon. Variant proliferation. | |
| Skip the icon entirely | Text-only success message. Loses visual success cue convention. | |

**User's choice:** lucide CheckCircle Pattern A + Icon/32 instance
**Notes:** Lands at D-100 — PEN-INVENTORY Variant Evidence row documents size-32 proxy for v1.3 size 64.

### Q3: Thank-you microcopy fidelity (heading, body, CTA button label, secondary link)?

| Option | Description | Selected |
|--------|-------------|----------|
| v1.3 verbatim per D-82 (Recommended) | v1.3 thank-you.astro has truth: 'Thanks for reaching out!' heading, '...within 48 hours...' body, 'Skip the wait - book a call' CTA, 'Return to homepage' secondary link. Ships verbatim. | ✓ |
| STUB all microcopy | Placeholder strings only. Contradicts D-82 (v1.3 IS truth here). | |
| Verbatim heading+body; STUB CTA + link | Splits content. Hairsplits unnecessarily. | |

**User's choice:** v1.3 verbatim per D-82
**Notes:** Lands at D-99 — all sections EXACT fidelity per D-83 reading. Mirrors Contact decision.

### Q4: Plan count + ordering for Phase 27?

| Option | Description | Selected |
|--------|-------------|----------|
| 3 plans, foundation-first (Recommended) | 27-00 (foundation: 4 primitives + Compound + label-slot mechanic + Calendly Wiring Map seed) → 27-01 (Thank-you joel-only) → 27-02 (Contact crito-source flat-raster). Sequential. | ✓ |
| 2 plans matching ROADMAP literal | 27-01 (Thank-you) + 27-02 (Contact with foundation folded). Each plan grows huge. | |
| 4 plans, foundation split | 27-00a + 27-00b + 27-01 + 27-02. Splits foundation by primitive vs compound. Arbitrary. | |

**User's choice:** 3 plans, foundation-first
**Notes:** Lands at D-101 — reverses Phase 26 D-85 "rich-then-simple" ordering; here it's foundation-first → simpler → richer.

---

## Done check

### Q: We've discussed all 4 areas. Which gray areas remain unclear?

| Option | Description | Selected |
|--------|-------------|----------|
| I'm ready for context (Recommended) | All major decisions captured. | ✓ |
| Explore more gray areas | Surface more (focus-ring contrast, Calendly URL canonicalization, sidebar vertical-align, secondary link styling, error-state demo). | |

**User's choice:** I'm ready for context
**Notes:** Several "Claude's Discretion" items intentionally left to plan-execution decisions (sidebar vertical-align, secondary link styling, page-intro alignment, CheckboxGroup horizontal-vs-vertical layout).

---

## Claude's Discretion

- Auto-layout vs absolute positioning at page-frame level — default auto-layout vertical-stack
- Exact `type-semantic-heading-2` vs `type-semantic-heading-1` for Thank-you success heading — default heading-1, downsize at calibration if oversized
- Optional secondary "Return to homepage" link styling — default plain text-link (body-sm + text-secondary), Button/Secondary upgrade if needed
- Page-intro alignment on Contact (center vs left) — cl8tt raster decides at plan execution
- Sidebar Card vertical-align — default `flex-start` (top-aligned) per v1.3 `items-start`
- Compound/CheckboxGroup horizontal-vs-vertical layout for 5 Solutions options — default vertical per v1.3 `space-y-3`
- Per-plan `snapshot_layout({ problemsOnly: true })` discipline at plan close — yes, with text-clipping false-positive caveat per Phase 24/25/26 precedent
- OPEN-26-02 stale-cache `get_screenshot` quirk — Tier-1/Tier-2 fallback path available per CALIBRATION-PROTOCOL § 4.4 step 9

## Deferred Ideas

- Disabled state for form primitives (Button + Input + Select + Checkbox) — future state-coverage extension phase
- Open-dropdown popover state for Select — future Phase 31 Homepage consumer may justify
- Embedded Calendly iframe representation in `.pen` — code-milestone wiring layer
- Joel-brand fonts + neobrutalist visual identity in Thank-you / Contact — PROJECT.md Out of Scope
- Joel's v1.3 4-link Header nav override — Phase 31 Homepage instance time per Phase 25 D-38 + Phase 26 D-77 carry-forward
- Joel-brand logo / wordmark in Header logo slot — Phase 25 D-40 deferred
- prose-link / prose-list / prose-inline-code semantic aliases — Phase 28 (Blog) per Phase 26 D-70 + D-73
- `type-semantic-heading-3 / -4 / -5 / -6` — Phase 28 / Phase 31 consumers
- `color-semantic-text-required` distinct from text-error — only if future consumer needs distinct semantics
- Code-milestone `/contact` and `/thank-you` route rewrites — out of v2.0 scope
- v1.3 Message field validation/label inconsistency — OPEN-27-NN for code-milestone resolution
- Verifying "provisional" flag on `type-semantic-prose-paragraph-*` — Phase 28 higher-confidence verifier
- Generalized form-field-row / fieldset / form-section components — Phase 31 Homepage form repeat may justify

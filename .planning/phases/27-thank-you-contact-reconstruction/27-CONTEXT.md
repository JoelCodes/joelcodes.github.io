# Phase 27: Thank-you + Contact Reconstruction - Context

**Gathered:** 2026-06-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Two new top-level page frames — `Thank-you` and `Contact` — are added to `design/Crito.pen` as editable compositions of Phase 23–26 tokens / primitives / compounds / sections, **plus** a foundation layer of new form primitives that the 8-field Contact form requires (Phase 24 shipped Default/Focus/Error single-line text Input only — textarea / select / checkbox / checkbox-group are NOT yet shipped).

Branch assignments per CALIBRATION-PROTOCOL.md § 2 branch decision tree:
- **Thank-you = `joel-only-no-crito-ref`** — no Crito source frame exists (Phase 23 audit catalogued no Thank-you frame); calibration is token-usage check vs `_Tokens & Foundations` (`RpGbe`) per § 4.
- **Contact = `crito-source-present`, flat-raster sub-case** — `cl8tt` (09_Contact) is a single image-import-*.jpg rectangle per OPEN-23-05; PAGE-11 ACTIVE — hide `cl8tt` via `enabled: false` after APPROVE per § 3.3. Calibration pairing uses the raster image-import-*.jpg per § 3.1.

Phase 27 also ships **5 new library entries** (one Input variant + three sibling primitives + one compound) and **one new PEN-INVENTORY section** (`## Calendly Wiring Map (Phase 27)`).

**Out of scope (already decided):**
- Per-page reconstruction for any other page (Phases 28–31)
- Mobile breakpoint reconstruction (PAGE-09 — desktop only for v2.0)
- Dark mode (TOKEN-07 + Phase 23 D-01)
- A new CALIBRATION-PROTOCOL — Phase 26 D-66 already shipped the unified protocol; Phase 27 inherits it
- A new shared `Section / Calendly` reusable component (single-pattern overkill per O5/O6 prevention)
- Open-dropdown popover state for Select (D-59 carry-forward: static design tool represents READING state, not interaction state)
- Disabled state for form primitives (Phase 24 didn't ship Disabled for Input/Button; adding for Phase 27 would create inconsistency)
- Joel's v1.3 4-link Header override (Phase 25 D-38 + Phase 26 D-77 carry-forward: defers to Phase 31 Homepage instance time)
- Joel-brand logo / wordmark in Section/Header logo slot (Phase 25 D-40 deferred)
- Joel's v1.3 src code (v2.0 milestone scope — `.pen` file only)

</domain>

<decisions>
## Implementation Decisions

### Input Variant Strategy (the foundation deliverable)

- **D-89:** **Hybrid library strategy — Textarea as Input variant, Select / Checkbox as sibling primitives, CheckboxGroup as compound.** Phase 24 shipped `Primitive / Input / Default / Focus / Error` (single-line text only). Phase 27 adds:
  - `Primitive / Input / Textarea` (new variant on existing Input) — shares the label/control/helper/errorSlot structure; vertical control area sized for multi-line content (v1.3 uses `rows={4}` and `rows={6}` — Pencil ships ONE Textarea variant with default-tall control; instance sizing is per-consumer)
  - `Primitive / Select` (NEW sibling primitive) — distinct shape (chevron-down Icon instance + closed-state-only popover representation per D-95)
  - `Primitive / Checkbox` (NEW sibling primitive) — small box + label, totally different shape from text inputs
  - `Compound / CheckboxGroup` (NEW compound) — composes N `Primitive / Checkbox` instances with a legend + horizontal/vertical layout option

  Lives in: `_Components / Primitives` (Phase 24 avgor) for the 3 primitives; `_Components / Compounds` (Phase 25 t67DU6) for the compound. Honest taxonomy — components grouped by shape, not by form-element kinship. Matches React-style component family while still letting Textarea reuse Input's structure.

- **D-90:** **Default/Focus/Error trinity for each new primitive.** Matches Phase 24 D-22 compositional-minimum forward states. New variant slots: Primitive/Input/Textarea (1 — reuses Input's Focus/Error variants if rendered consistently) + Primitive/Select × 3 + Primitive/Checkbox × 3 + Compound/CheckboxGroup × 1 (single shape; child Checkbox states cover focus/error inheritance). ~8 new Variant Evidence rows in PEN-INVENTORY's Variant Evidence table. The 8-field form actively exercises Focus (tab through fields) + Error (validation fail on Name/Email/Message per v1.3 ContactSection script). Partially resolves OPEN-24-04 + OPEN-24-08 + OPEN-24-09 (Phase 24 inferred focus/error variants — Phase 27 form is the first real consumer).

- **D-91:** **Required-field indicator via label-slot mechanic.** Extend `Primitive / Input`'s label slot signature with an optional `required-mark` text node — `enabled: true` for required fields (renders literal `*` in `color-semantic-text-error` fill), `enabled: false` for optional. Same pattern Phase 25 D-53 used for Card placeholders. No new variant proliferation. The label-slot extension is a Phase 24 Input UPDATE (mutation to existing primitive), not a new variant — PEN-INVENTORY Variant Evidence row added with `## Label-Slot Extension (Phase 27)` annotation. v1.3 form has 3 required fields (Name, Email, Message); Phase 27 instances mark Name + Email + Message with `required-mark: enabled:true`, others `enabled:false`. **Note:** if `color-semantic-text-error` is the right binding (vs a new `color-semantic-text-required` alias) is plan-execution-detail — default reuses `color-semantic-text-error` literal; raise OPEN-27-NN if visual rendering needs a distinct color.

- **D-92:** **Selects ship closed-state only.** `Primitive / Select` Default/Focus/Error variants render only the chrome + chevron-down + placeholder text. The open-dropdown popover (5 budget options for Budget select, 4 timeline options for Timeline select) is a code-side runtime concern — not the .pen file's job. D-59 carry-forward (Phase 26 FAQ accordion precedent: static design tool represents READING state, not interaction state). chevron-down Icon comes from lucide-native Pattern A per Phase 24 D-44 (proven for instagram + arrow-right; chevron-down already on Crito Home Page menu bar per PEN-INVENTORY line 502). Size 16 Icon instance is the chevron rendering — Primitive/Icon variant `16` per Phase 24 D-26.

### Calendly Placeholder Mechanism

- **D-93:** **Section/CTA instance + sibling Pencil text node + new PEN-INVENTORY `## Calendly Wiring Map (Phase 27)` section.** Reuses the Phase 26 Section/CTA component (Hs5rc inside g9oRa5; 3-slot signature: headline / body / actions per D-78). Instance composition on each page:
  - **Thank-you:** Section/CTA-Calendly is PRIMARY content section — headline "Skip the wait — book a call" (or similar; microcopy decision per D-99), body STUB-or-verbatim per D-99, actions-slot holds one `Primitive / Button / Default` instance with label "Skip the wait - book a call" (v1.3 verbatim per D-99). Sibling Pencil text node at the same canvas-y position documents wiring: "Calendly placeholder — code milestone wires actions-slot Button[0] `href` to https://calendly.com/joelshinness (v1.3 Thank-you Calendly URL); may replace body-slot with embedded Calendly iframe."
  - **Contact (sidebar):** uses `Compound / Card` (Phase 25 t40xct) NOT Section/CTA — see D-97 below for sidebar shape decision; Card sidebar holds the Book-a-call Button + its own sibling note.
  - **PEN-INVENTORY `## Calendly Wiring Map (Phase 27)` section** lists both URLs explicitly: `Thank-you: https://calendly.com/joelshinness`, `Contact sidebar: https://calendly.com/me--juoi/discovery-call`. Belt-and-suspenders per Phase 25 D-52 — `.pen` self-documents via sibling notes; PEN-INVENTORY is the durable cross-reference.

- **D-94:** **Calendly appears on BOTH pages.** v1.3 has Calendly on both `thank-you.astro` (turquoise Button) AND `ContactSection.astro` (sidebar Card "Book a call"). Phase 27 reconstructs both — Thank-you as PRIMARY post-submission conversion CTA, Contact as SECONDARY "skip the form" shortcut. Single mechanism (Calendly Wiring Map) with two consumers (Section/CTA on Thank-you, Compound/Card on Contact) — justifies the unified note convention.

### Contact Page Layout Shape

- **D-95:** **2-col asymmetric grid mirroring v1.3 — form left, Compound/Card Calendly sidebar right.** Contact page composition (top → bottom):
  1. `Section / Header` instance (G0wNOc) — Crito-source labels stay literal per D-77 carry-forward
  2. Page-intro section (full-width centered or left-aligned, plan-execution decides) — "Let's Talk" heading + "Tell me about your project and I'll get back to you within 48 hours." body (v1.3 verbatim per D-100)
  3. 2-col asymmetric grid: form (2fr / ~800px) left + sidebar (1fr / ~400px) right; gap from `space-semantic-section-y` or section-gap token
  4. `Section / Footer` instance (Xs0Hs)

  The 2-col asymmetric grid mirrors v1.3 ContactSection.astro's `md:grid-cols-[2fr_1fr]` layout. cl8tt raster is the visual calibration target (proven via probe of image-import-*.jpg at plan execution time — RESEARCH § Focus identifies the correct image-import-NN.jpg index). Sidebar vertical-align defaults to `flex-start` (top-aligned with form's first field) per v1.3's `items-start` Tailwind class.

- **D-96:** **Sidebar = `Compound / Card` (Phase 25 t40xct) instance, NOT Section/CTA.** Sidebar slot fill:
  - image-slot: `enabled: false` (no image in v1.3 sidebar Card)
  - title-slot: "Ready to chat?" (verbatim from v1.3 line 184)
  - body-slot: "Schedule a discovery call with me directly!" (verbatim from v1.3 line 187)
  - footer-actions-slot: `Primitive / Button / Default` instance with label "Book a Call" (verbatim from v1.3 line 196)
  - Sibling Pencil text node at the Card frame's canvas-y position: Calendly wiring note per D-93.

  Honest about the sidebar's true v1.3 shape (it IS a turquoise neobrutalist Card visually; Phase 27 swaps the turquoise/neobrutalist for Crito visual register per D-58 carry-forward). Different composition from Thank-you's Section/CTA, unified note convention. Resolves the apparent tension between "Section/CTA on Thank-you" (D-93) and "Card on Contact" — Thank-you's Calendly is a full-width section; Contact's Calendly is a sidebar card. Same wiring mechanism, different visual shape.

- **D-97:** **Field shape — Joel's 8 v1.3 fields verbatim; cl8tt raster = visual calibration target only.** Hybrid authority (NOT pure cl8tt source-wins). Ships verbatim from `src/components/homepage/ContactSection.astro`:
  1. **Name** (required, single-line) — `Primitive / Input / Default` instance, label "Name", required-mark enabled:true, placeholder "Your name"
  2. **Email** (required, single-line) — `Primitive / Input / Default`, label "Email", required-mark enabled:true, placeholder "you@example.com"
  3. **Company** (optional, single-line) — `Primitive / Input / Default`, label "Company", optional-mark "(optional)" rendered via descendants override (or label-slot supplemental text node — plan-execution decides), placeholder "Company name (if applicable)"
  4. **Challenges** (optional, textarea) — `Primitive / Input / Textarea`, label "What challenges are you facing?", optional marker, placeholder "What problems are slowing you down, causing headaches, or just keeping you from doing the work you love?"
  5. **Solutions** (optional, checkbox group) — `Compound / CheckboxGroup`, legend "What kinds of solutions do you think you'll need?", 5 Checkbox children: AI / Automations / Web Apps / Consultation / Not Sure
  6. **Budget** (optional, select) — `Primitive / Select`, label "Do you have a budget in mind?", placeholder "Select budget range (optional)", 5 options: Under $2K, $2K-5K, $5K-10K, $10K-25K, $25K+
  7. **Timeline** (optional, select) — `Primitive / Select`, label "Do you have a timeline in mind?", placeholder "Select timeline (optional)", 4 options: This week, This month, This quarter, Flexible
  8. **Message** (required in v1.3 validationConfig despite label "(optional)" — Phase 27 treats as required per the validation truth, marks label "(optional)" + required-mark anyway, raises OPEN-27-NN documenting the v1.3 inconsistency for code-milestone resolution) — `Primitive / Input / Textarea`, placeholder "Anything else you'd like to share about your project, goals, or how I can help?"

  Plus: Submit Button "Send Message" + privacy line "Your info stays between us. No spam, ever." at bottom of form.

  cl8tt raster is the VISUAL calibration target (spacing rhythm, page-intro vertical position, page-frame proportions, button-then-privacy-line ordering, sidebar Card visual chrome). Joel's 8-field SHAPE is the authority for what gets shipped. Matches ROADMAP success criterion 2 "8-field lead-qualification form is composed entirely of `Primitive / Input` instances" literally.

- **D-98:** **Contact microcopy — v1.3 verbatim across all text-bearing surfaces.** Per D-82 precedent (Phase 26 FAQ Q+A shipped verbatim from `src/pages/faq.astro`). All v1.3 truth ships verbatim:
  - Page-intro: "Let's Talk" heading + "Tell me about your project and I'll get back to you within 48 hours." body
  - 8 field labels (D-97 enumerates) + all placeholders + all select options
  - Sidebar Card: "Ready to chat?" title + "Schedule a discovery call with me directly!" body + "Book a Call" button
  - Submit Button: "Send Message"
  - Privacy line: "Your info stays between us. No spam, ever."

  No new microcopy on Contact = no STUB on Contact. Fidelity labels per D-83 reading: page-intro = EXACT, form-section = EXACT (token-bound + verbatim content), sidebar Card = EXACT, Header/Footer instances = EXACT (Phase 25 shipped). Single per-plan calibration gate (Plan 27-02) covers all sections per D-65.

### Thank-you Composition (joel-only fresh design in Crito vocab)

- **D-99:** **Thank-you composition — Hero-style success-message section + Section/CTA-Calendly + optional secondary nav-back link.** Composition (top → bottom):
  1. `Section / Header` instance (G0wNOc)
  2. Success-message section (joel-only fresh design):
     - Layout: vertical-stack, centered horizontally (1200 max-width content frame inside 1440 outer)
     - `Primitive / Icon` Size 32 instance — lucide `circle-check` glyph via Pattern A native per D-100 below
     - Heading: "Thanks for reaching out!" (v1.3 verbatim per `src/pages/thank-you.astro` line 22) — uses `type-semantic-heading-1` token (Phase 23 H1 48/700 from ujMLJ source)
     - Body: "I'll email you within 48 hours with next steps. Looking forward to learning more about your project!" (v1.3 verbatim per line 27) — uses `type-semantic-prose-paragraph-*` (Phase 23 token; FAQ proved load-bearing per D-71 carry-forward)
  3. `Section / CTA` instance (Hs5rc, Phase 26) — Calendly placeholder per D-93/D-94:
     - headline-slot: "Skip the wait — book a call" (or maps the v1.3 button label as headline — plan-execution decides; default ships v1.3 button label as the section headline)
     - body-slot: `enabled: false` (no body needed — the success-message section above carries the body context)
     - actions-slot: single `Primitive / Button / Default` instance with label "Skip the wait - book a call" (v1.3 verbatim per line 38)
     - Sibling Pencil text node: Calendly wiring note per D-93 + URL `https://calendly.com/joelshinness`
  4. Optional secondary "Return to homepage" link section — plain text-only nav-back link styled as `type-semantic-body-*` + `color-semantic-text-secondary` (per v1.3 lines 43–48 which uses small muted text). Renders as a simple text node, not a Button instance (Button would over-emphasize the secondary CTA). Sibling Pencil note: "Code milestone wires to `/` homepage."
  5. `Section / Footer` instance (Xs0Hs)

  All microcopy v1.3 verbatim per D-82 precedent (extended to Thank-you's surface). Fidelity labels per D-83: success-message = EXACT (token-bound + content verbatim), Section/CTA-Calendly = EXACT (token-bound + content verbatim), secondary-link = EXACT (token-bound + content verbatim), Header/Footer = EXACT (Phase 25 shipped). Single per-plan calibration gate (Plan 27-01) covers all sections.

- **D-100:** **Success indicator = lucide `circle-check` Pattern A native + `Primitive / Icon` Size 32 instance.** Phase 24 D-44 + Phase 25 D-45 + Phase 26 D-49 confirmed lucide-native Pattern A works in Pencil 2.13. CheckCircle / `circle-check` is in lucide; ships via Pattern A glyph swap inside a Primitive/Icon/32 instance. Size 32 is the largest existing variant — visually smaller than v1.3's size 64 but stays inside Phase 24's existing variant set. Justified by D-58 carry-forward (Crito's visual register isn't v1.3 hero-size icons). PEN-INVENTORY Variant Evidence row documents: `Thank-you / success-icon (xxx) | ref Primitive/Icon/32 + glyph: circle-check | Pattern A native per Phase 24 D-44; size-32 proxy for v1.3's CheckCircle2 size=64`. Larger sizes (48 / 64) NOT added in Phase 27 — defer to a future state-coverage extension phase if a real consumer needs them (Pitfall O5/O6 prevention).

### Plan Structure

- **D-101:** **Phase 27 ships 3 plans, foundation-first.** Plans:
  - **27-00 — Foundation:** ships `Primitive / Input / Textarea` variant + Primitive/Input label-slot `required-mark` mechanic update + `Primitive / Select` (Default/Focus/Error) + `Primitive / Checkbox` (Default/Focus/Error) + `Compound / CheckboxGroup` + seeds the PEN-INVENTORY `## Calendly Wiring Map (Phase 27)` section.
  - **27-01 — Thank-you page frame:** joel-only branch; ships per D-99 + D-100; PAGE-11 INERT per CALIBRATION-PROTOCOL § 4.3. FindEmptySpace with `nodeId: csXky` (Phase 26 404 frame) as anchor for right-of-csXky placement (Plan 26-02 contribution to CALIBRATION-PROTOCOL § 10.4).
  - **27-02 — Contact page frame:** crito-source flat-raster branch; ships per D-95 / D-96 / D-97 / D-98; PAGE-11 ACTIVE — hide `cl8tt` raster via `enabled: false` after APPROVE per CALIBRATION-PROTOCOL § 3.3. FindEmptySpace with `nodeId: <Thank-you-frame-id-from-27-01>` as anchor.

  Sequential, no waves. Foundation-first because 27-02 has the deepest primitive dependencies — building primitives last would block Plan 27-02's form composition. Thank-you before Contact because Thank-you exercises ONLY existing components (no new primitive consumers; tests Section/CTA + Icon size 32 in production) → establishes the joel-only branch's first per-page-phase outside Phase 26 → Contact then exercises the new primitives in the harder crito-source-flat-raster context.

- **D-102:** **Per-plan calibration gates — single AskUserQuestion at plan close.**
  - **Plan 27-00 closes WITHOUT a user gate** — pure foundation work (component additions); no per-page content to spot-check. Matches Phase 26 D-86 precedent (foundation plans agent-deterministic).
  - **Plan 27-01 closes WITH a single calibration gate** per D-65 + CALIBRATION-PROTOCOL § 4.5 (joel-only AskUserQuestion format) — covers success-message + Section/CTA-Calendly + secondary-link fidelity proposals.
  - **Plan 27-02 closes WITH a single calibration gate** per D-65 + CALIBRATION-PROTOCOL § 3.4 (crito-source AskUserQuestion format) — covers page-intro + form-section + sidebar-Card fidelity proposals + cl8tt raster pairing.

### Cross-Cutting / Carry-Forward

- **D-103:** **Pre-flight `mcp__pencil__get_editor_state` enforcement carries forward** from Phase 23 OPEN-23-14 → Phase 24 D-35 → Phase 25 D-54 → Phase 26 D-87. Every Phase 27 plan that calls `set_variables`, `batch_design`, `find_empty_space_on_canvas`, or any Pencil-mutating tool first calls `mcp__pencil__get_editor_state({ include_schema: false })` and asserts active editor == `design/Crito.pen`. Halt and surface to user on mismatch. No exceptions.

- **D-104:** **PEN-INVENTORY extension pattern carries forward** from Phase 23 D-18 / Phase 24 D-23 / Phase 25 D-56 / Phase 26 D-88. Phase 27 adds:
  - New rows for `Thank-you` and `Contact` to the Frames Inventory table (Thank-you: scope `joel-only-no-crito-ref`, joel_page_map `/thank-you`, status `reconstructed-PHASE-27`; Contact: scope `IN-SCOPE`, joel_page_map `/contact`, status moves from `flat:1` to `reconstructed-PHASE-27` after PAGE-11 ACTIVE branch hides `cl8tt` raster)
  - Variant Evidence rows for: Primitive/Input label-slot `required-mark` extension; Primitive/Input/Textarea variant; Primitive/Select Default/Focus/Error variants; Primitive/Checkbox Default/Focus/Error variants; Compound/CheckboxGroup composition
  - New section `## Calendly Wiring Map (Phase 27)` documenting both Calendly URLs
  - New section `## Open Flags — Phase 27 (OPEN-27-NN)` populated by any plan-surfaced flags (likely candidates: v1.3 Message field validation/label inconsistency per D-97 footnote; cl8tt raster image-import index identification at plan execution; focus-ring color contrast on green CTA per OPEN-24-04)
  - Updates to OPEN-24-04 (focus ring on real form consumer), OPEN-24-07 (input control padding semantic alias decision), OPEN-24-08 (Input/Focus real consumer), OPEN-24-09 (Input/Error real consumer)
  - PAGE-11 status update: `cl8tt` moves from flat to hidden-via-enabled:false in `status_counts`

### Claude's Discretion

- **Auto-layout vs absolute positioning at the page-frame level** — Phase 26's plan-execution lean was auto-layout vertical-stack at page level (per Phase 26 Claude's Discretion). Phase 27 carries forward.
- **Exact `type-semantic-heading-2` vs `type-semantic-heading-1` for Thank-you success-message heading** — D-99 says heading-1; if visual rendering at calibration looks oversized, plan-execution may downsize to heading-2 (Phase 26 D-72 ships heading-2 — Thank-you is a natural consumer).
- **Optional secondary "Return to homepage" link styling** — plain text-link with body-sm scale + text-secondary fill (default), OR Primitive/Button/Secondary instance (hIWuC per Phase 25-01) for stronger affordance. Default is plain text-link (matches v1.3 line 43–48 small muted link); plan-execution may upgrade if needed.
- **Page-intro heading center vs left alignment on Contact** — cl8tt raster determines (left-aligned likely matches Crito's agency-template register; centered would match a "hero-style" intro). Plan-execution probe-first per cl8tt raster image.
- **Sidebar Card vertical-align (top vs center vs sticky)** — D-95 default is `flex-start` (top-aligned, matching v1.3 `items-start`). Plan-execution may override if cl8tt raster shows a centered sidebar.
- **Compound/CheckboxGroup layout horizontal vs vertical for the 5 Solutions options** — v1.3 doesn't constrain (Tailwind defaults are vertical-stack via CheckboxGroup primitive). Plan-execution decides based on cl8tt raster shape; default vertical (matches v1.3 CheckboxGroup `space-y-3` Tailwind class observed).
- **Per-plan `snapshot_layout({ problemsOnly: true })` discipline at plan close** — matches Phase 24/25/26 plan-close discipline. Default: yes, runs at every plan-close, documented in 27-NN-SUMMARY.md with text-clipping false-positive caveat per Phase 24/25/26 precedent.
- **OPEN-26-02 stale-cache get_screenshot quirk** — CALIBRATION-PROTOCOL § 4.4 step 9 Tier-1/Tier-2 workarounds available; Phase 27 plans inherit the fallback path.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope + requirements (must-read)
- `.planning/PROJECT.md` — v2.0 milestone goal, v1.4 abandonment context, single-file strategy, desktop-only scope, "content untouched" boundary.
- `.planning/REQUIREMENTS.md` — Phase 27 requirements: PAGE-05 (Thank-you), PAGE-06 (Contact), PAGE-09 (desktop-only), PAGE-11 (raster-removal-only-after-verify — ACTIVE for Contact, INERT for Thank-you per CALIBRATION-PROTOCOL § 3.3 / § 4.3), VALID-01 (per-section fidelity labels — D-83 carry-forward), VALID-02 (calibration artifact — branch-redefined per CALIBRATION-PROTOCOL § 3.1 / § 4.1), VALID-03 (gap declaration).
- `.planning/ROADMAP.md` § "Phase 27" — Goal, Depends on (Phase 26), Success Criteria. **Important nuance:** Success criterion 2 names "8-field lead-qualification form" — D-97 confirms Joel's v1.3 8-field shape is authority; cl8tt raster is visual calibration target.
- `.planning/STATE.md` — current position: Phase 26 COMPLETE, Phase 27 ready to plan.

### CALIBRATION-PROTOCOL.md (definition-of-done framework — must-read at every per-page plan)
- `.planning/research/CALIBRATION-PROTOCOL.md` — Phase 26 Plan 26-03 codify-what-worked.
  - **§ 2 Branch Decision Tree** — Thank-you = joel-only-no-crito-ref; Contact = crito-source-present flat-raster sub-case.
  - **§ 3 crito-source-present branch protocol** — § 3.1 VALID-02 (side-by-side with image-import-*.jpg raster); § 3.3 PAGE-11 ACTIVE (hide `cl8tt` after APPROVE); § 3.4 per-step script for Contact.
  - **§ 4 joel-only-no-crito-ref branch protocol** — § 4.1 VALID-02 (token-usage check vs `RpGbe` `_Tokens & Foundations`); § 4.3 PAGE-11 INERT for Thank-you; § 4.4 per-step script for Thank-you; § 4.5 AskUserQuestion format for calibration gate.
  - **§ 6.4 OPEN-26-02 stale-cache workaround tiering** — Tier-1 (cross-row Update) + Tier-2 (user editor verification fallback).
  - **§ 10.4 FindEmptySpace `nodeId` anchor pattern** — Phase 27 plans use `nodeId: csXky` for Thank-you and `nodeId: <Thank-you-frame-id>` for Contact placement.

### Phase 26 carry-forward (Phase 27 inherits these decisions directly)
- `.planning/phases/26-faq-404-reconstruction-calibration-workflow-established/26-CONTEXT.md` — Phase 26 decisions D-58 through D-88. Especially **D-58** (fresh-in-Crito-vocab, not v1.3 visual mirror — Thank-you joel-only inherits; Contact crito-source has cl8tt raster as visual target instead), **D-65** (single calibration gate per plan — D-102 carry-forward), **D-72** (type-semantic-heading-2 token available for Thank-you/Contact headings), **D-77** (Crito-source Header/Footer labels stay literal — Phase 27 inherits; Joel 4-link override = Phase 31), **D-78** (Section/CTA 3-slot signature — Thank-you uses; D-93 documents both Calendly consumer instances), **D-79** (Section/NavBack narrow-purpose; D-99 considered Thank-you reuse and DECLINED — distinct consumer needs differ), **D-82** (v1.3 content verbatim where v1.3 has truth — D-98 + D-99 extended to Contact + Thank-you surfaces), **D-83** (per-section fidelity labels with LAYOUT/TEXT split allowed — D-95/D-97/D-99 inherit), **D-86** (foundation plans close without user gate; per-page plans close with calibration gate — D-102 carry-forward), **D-87** (pre-flight active-editor — D-103 carry-forward), **D-88** (PEN-INVENTORY extension pattern — D-104 carry-forward).
- `.planning/phases/26-faq-404-reconstruction-calibration-workflow-established/26-00-SUMMARY.md` — Section/CTA structural details: Hs5rc inside g9oRa5; 3-slot signature (headline / body / actions); `enabled:true` placeholder defaults pattern Thank-you Section/CTA instance inherits.
- `.planning/phases/26-faq-404-reconstruction-calibration-workflow-established/26-01-SUMMARY.md` — FAQ joel-only-branch execution; calibration spot-check format Phase 27 Thank-you inherits.
- `.planning/phases/26-faq-404-reconstruction-calibration-workflow-established/26-02-SUMMARY.md` — 404 joel-only-branch execution + Plan 26-02's FindEmptySpace nodeId anchor contribution (D-101 inherits — Thank-you anchors on csXky, Contact anchors on Thank-you frame).

### Phase 25 component library (Phase 27 instances these directly)
- `.planning/phases/25-section-compound-components/25-CONTEXT.md` — Phase 25 decisions D-38 through D-57. Especially **D-38** (Crito-source nav labels stay literal — informs D-95 Header instance), **D-52** (Pencil 2.13 typed-slot suggestion-only + sibling Pencil note belt-and-suspenders — D-93 Calendly note convention inherits), **D-53** (`enabled:true` slots with placeholders — D-89 Section/CTA inherits + D-99 Section/CTA instances inherit).
- `.planning/phases/25-section-compound-components/25-01-SUMMARY.md` — Section/Header structural details: G0wNOc inside g9oRa5; logo-slot id; 6 Crito-source nav labels (Phase 27 Header instances inherit these as-is per D-95); Primitive/Button/Secondary `hIWuC` available for Thank-you secondary CTA if D-99 plan-execution upgrades from plain text-link.
- `.planning/phases/25-section-compound-components/25-02-SUMMARY.md` — Section/Footer structural details: Xs0Hs inside g9oRa5; Phase 27 Footer instances inherit these as-is per D-95 + D-99.
- `.planning/phases/25-section-compound-components/25-03-SUMMARY.md` — Compound/Card structural details: t40xct inside t67DU6; 4-slot signature (image / title / body / footer-actions); Phase 27 Contact sidebar instance per D-96 uses image:enabled:false + title/body/footer-actions filled.

### Phase 24 primitive library (Phase 27 instances + extends these)
- `.planning/phases/24-layout-primitives-primitive-components/24-CONTEXT.md` — Phase 24 decisions D-21 through D-37. Especially **D-22** (Default/Focus/Error compositional minimum forward states — D-90 inherits for new Phase 27 primitives), **D-26** (source-driven glyph enumeration — D-100 chooses lucide circle-check per real consumer), **D-29** (Button iconLeading/iconTrailing slot pattern — Thank-you Section/CTA actions-slot Button may use iconTrailing for visual chevron-right per plan-execution), **D-33** (open token-extension policy — D-89 no new tokens needed since label-slot extension reuses existing semantic tokens), **D-35** (pre-flight active-editor — carry-forward D-103), **D-44** (lucide-native Pattern A glyph swap — D-100 inherits for CheckCircle).
- `.planning/phases/24-layout-primitives-primitive-components/24-03-SUMMARY.md` — Primitive/Input structural details: `Primitive / Input / Default` (nwJk7, label `oCeJP` + control `bhkR3` with placeholder `dbEyb` + helper `xmhXv` + errorSlot `uawpJ`). D-89 Textarea variant inherits this structure (taller control); D-91 label-slot `required-mark` mechanic extends `oCeJP` text node hierarchy.
- `.planning/phases/24-layout-primitives-primitive-components/24-05-SUMMARY.md` — primitive ids: Button/Default (M7eUr), Button/Secondary (hIWuC, Phase 25-01 addition), Input/Default (nwJk7), Icon/24 (u7NmaS — plus 16/20/32 variants). Phase 27 instances Button/Default for Thank-you Section/CTA action + Contact form submit + Contact sidebar Card footer-actions; Icon/16 for Select chevron; Icon/32 for Thank-you success-message indicator.

### Phase 23 token foundation (transitively referenced)
- `.planning/phases/23-audit-token-foundation/23-CONTEXT.md` — token-naming convention (D-12 flat-dash), components-reference-semantic-only (D-14 — D-89 new primitives inherit), OPEN-flag policy (D-09 — informs all OPEN-27-NN additions), PEN-INVENTORY plain-markdown discipline (D-18 — carry-forward chain).
- Phase 23 OPEN flags Phase 27 partially resolves:
  - **OPEN-23-05** — Phase 27 reconstructs `cl8tt` Contact frame (the largest of the flat-raster Crito IN-SCOPE frames); PAGE-11 ACTIVE — hide raster after APPROVE.
  - **OPEN-23-04** — Home Page-derived typography surface; Contact form is the first real consumer of `type-semantic-body-sm` (field labels) at production scale.
- Phase 24 OPEN flags Phase 27 partially resolves:
  - **OPEN-24-04** — Button focus ring on real form-CTA consumer (Send Message button + Book-a-call buttons get real focus testing in form context).
  - **OPEN-24-08** — Primitive/Input/Focus variant on real form-field consumer (8 fields × tab focus).
  - **OPEN-24-09** — Primitive/Input/Error variant on real form-validation consumer (Name + Email + Message error states).

### Audit / inventory source (read for every plan in Phase 27)
- `.planning/research/PEN-INVENTORY.md` — single source of truth. Phase 27 plans read:
  - Frame classifications: `cl8tt` IN-SCOPE flat:1 → status moves to `reconstructed-PHASE-27` after Plan 27-02 PAGE-11 ACTIVE branch
  - Token surface (101 tokens after Phase 26 D-72 heading-2 + heading-2-* family additions per Plan 26-00; Phase 27 adds NO new tokens — D-91 reuses `color-semantic-text-error` for required-mark)
  - Phase 24/25/26 Open Flags Phase 27 may resolve at calibration gates (listed above)
  - Phase 27 adds OPEN-27-NN rows per D-104
- `.planning/research/exports/v2.0/end-of-phase-26/id-inventory.json` — structural snapshot of `Crito.pen` after Phase 26. Plan 27-00 reads this to know primitive + section + compound ids to instance + baseline ids that must not be mutated. Includes csXky (404 frame for D-101 FindEmptySpace anchor on Plan 27-01).

### Ground-truth source files (Phase 27 reads these via Pencil MCP, not direct file I/O)
- `design/Crito.pen` — the work surface. Phase 27 mutates:
  - NEW: `Thank-you` page frame (D-99)
  - NEW: `Contact` page frame (D-95)
  - NEW: `Primitive / Input / Textarea` variant inside `_Components / Primitives` (avgor) (D-89)
  - UPDATE: `Primitive / Input / Default` label-slot extension for `required-mark` (D-91)
  - NEW: `Primitive / Select` Default/Focus/Error inside avgor (D-89)
  - NEW: `Primitive / Checkbox` Default/Focus/Error inside avgor (D-89)
  - NEW: `Compound / CheckboxGroup` inside `_Components / Compounds` (t67DU6) (D-89)
  - MUTATE: `cl8tt` raster — `enabled: false` after Plan 27-02 APPROVE (PAGE-11 ACTIVE per CALIBRATION-PROTOCOL § 3.3)
  - Existing frames (Phase 23–26 components + page frames + library parents) are read-only inputs.
- `design/images/image-import-*.jpg` — Phase 27 Plan 27-02 probe-first identifies which image-import-NN.jpg matches `cl8tt` (RESEARCH § Focus identifies the index); ships as `--side-by-side.png` calibration artifact identifier per CALIBRATION-PROTOCOL § 3.5.
- `src/components/homepage/ContactSection.astro` (lines 1–204) — Joel's v1.3 Contact form source. 8 fields + labels + placeholders + select options + sidebar Card content ship verbatim per D-97 + D-98. Read for content extraction only; NOT a visual style reference (D-58 carry-forward — cl8tt raster is the visual target).
- `src/pages/thank-you.astro` (lines 1–53) — Joel's v1.3 Thank-you page source. Heading + body + CTA button label + secondary link ship verbatim per D-99. Read for content extraction only; NOT a visual style reference (D-58 carry-forward — Thank-you is joel-only so the Crito visual register defines visual style, NOT v1.3's turquoise Card + CheckCircle2 size 64).

### v2.0 research (cross-cutting context)
- `.planning/research/SUMMARY.md` — themes T1 (variables-first — Phase 27 adds NO new tokens; reuses existing surface), T5 (don't repeat v1.4 — calibration gates enforce per-section labels), T6 (single-file strategy — Thank-you + Contact frames inside `Crito.pen`), T8 (component variants on-demand only — D-89 Hybrid strategy ships only the variants Joel's 8-field form needs; no pre-emptive Disabled state).
- `.planning/research/STACK.md` — Pencil MCP tool catalogue. `find_empty_space_on_canvas` with `nodeId` anchor (D-101 + CALIBRATION-PROTOCOL § 10.4), `get_screenshot` (calibration artifacts — inline-only per OPEN-23-01 substitution), `set_variables` (NOT used in Phase 27 — no new tokens), `batch_design` (5 new components + 2 page frames).
- `.planning/research/PITFALLS.md` — O5/O6 (premature token hierarchies + component-library bloat — D-89 ships only the 4 form primitive types Joel's form needs, NOT a generic full-form-component-family), F3 (no eyedropping from raster — D-95/D-97 cl8tt raster is visual calibration target, NOT a token-mining source; tokens come from Phase 23 surface).

### Pencil MCP guidance (consulted during execution, not pre-read at planning)
- `mcp__pencil__get_editor_state({ include_schema: false })` — call FIRST in every 27-NN plan per D-103.
- `mcp__pencil__get_guidelines({ topic: "design-system" })` — call at start of Plan 27-00 (new primitive authoring guidance, slot mechanics).
- `mcp__pencil__get_variables({})` — call to verify 101-token surface intact at Plan 27-00 start; re-call to verify NO token drift at every plan close (Phase 27 ships zero new tokens).
- `mcp__pencil__batch_get` — verify baseline IDs intact (Phase 23–26 components + page frames + library parents).
- `mcp__pencil__batch_design` — Plan 27-00 (5 new library entries), Plan 27-01 (Thank-you page frame + content), Plan 27-02 (Contact page frame + 8-field form composition + sidebar Card instance + Section/Header + Section/Footer instances).
- `mcp__pencil__find_empty_space_on_canvas` — Plan 27-01 + 27-02 page-frame placement per D-101 + CALIBRATION-PROTOCOL § 10.4 (nodeId anchor pattern).
- `mcp__pencil__get_screenshot` — calibration artifacts per CALIBRATION-PROTOCOL § 3.4 step 4 + § 4.4 step 9 (inline-only, NOT disk-written).
- `mcp__pencil__snapshot_layout({ problemsOnly: true })` — per-plan close per Phase 24/25/26 precedent.

### Outputs this phase produces (referenced by Phase 28+)
- 2 new page frames in `design/Crito.pen`: `Thank-you` (joel-only-no-crito-ref) + `Contact` (IN-SCOPE, PAGE-11 ACTIVE applied).
- 5 new library entries: `Primitive / Input / Textarea` (variant on existing Input), `Primitive / Input` label-slot `required-mark` mechanic (mutation to existing Input), `Primitive / Select` (sibling primitive), `Primitive / Checkbox` (sibling primitive), `Compound / CheckboxGroup` (compound composing Checkbox).
- `.planning/research/PEN-INVENTORY.md` extensions per D-104.
- `.planning/research/exports/v2.0/end-of-phase-27/id-inventory.json` — structural snapshot per OPEN-23-01 substitution pattern (matches Phase 23 / 24 / 25 / 26 precedent).

</canonical_refs>

<code_context>
## Existing Code Insights

**Phase 27 makes NO `src/` code changes.** v2.0 is `.pen`-file-only (per PROJECT.md + REQUIREMENTS.md Out of Scope). The code-side observations below are content-extraction context only — they do NOT shape Phase 27 visual decisions for the joel-only Thank-you branch (D-58 carry-forward: Crito visual register, not v1.3-mirror) or the crito-source Contact branch (cl8tt raster is visual target).

### Reusable Assets (content-only references, not visual references)
- `src/pages/thank-you.astro` (lines 1–53) — v1.3 Thank-you page. Content extraction per D-99: heading "Thanks for reaching out!" (line 22), body "I'll email you within 48 hours with next steps. Looking forward to learning more about your project!" (line 27), CTA button label "Skip the wait - book a call" (line 38), secondary link "Return to homepage" (line 47), Calendly URL `https://calendly.com/joelshinness` (line 35). Visual style (turquoise Card + CheckCircle2 size 64 + uppercase 4xl heading + neobrutalist) explicitly NOT inherited per D-58.
- `src/components/homepage/ContactSection.astro` (lines 1–204) — v1.3 homepage Contact section (Joel's actual deployed form; no separate /contact page route exists in v1.3 src — this section IS the contact functionality). Content extraction per D-97 + D-98: 8 field set (lines 30–162), labels + placeholders + select options + CheckboxGroup options, sidebar Card content (lines 184–198), Calendly URL `https://calendly.com/me--juoi/discovery-call` (line 191), submit button label "Send Message" (line 171), privacy line (line 175). Visual style (turquoise neobrutalist + Inter/Bricolage) explicitly NOT inherited.
- v1.3 has NO standalone `/contact` page route — `ContactSection.astro` is the homepage section. v2.0 Phase 27 reconstructs `Contact` as a DEDICATED page frame anyway (per ROADMAP PAGE-06 + Phase 23 PEN-INVENTORY joel_page_map `Contact`). Mismatch documented: code milestone will need to create `src/pages/contact.astro` to consume this page-frame design.

### Established Patterns (Pencil-side, ARE Phase 27 inputs)
- **Variables-first → primitives → compounds → sections → page frames** — Phase 23 tokens, Phase 24 primitives, Phase 25 compounds + sections, Phase 26 first per-page reconstruction phase, Phase 27 second per-page phase (and first foundation-extension phase since Phase 26 D-72 heading-2 token).
- **Single-file strategy** — everything in `design/Crito.pen`. Phase 27 page frames placed at the page-frame row (y ≈ −4111) via FindEmptySpace nodeId anchor pattern from CALIBRATION-PROTOCOL § 10.4.
- **OPEN-flag system** — Phase 27 extends with `OPEN-27-NN` rows per D-104.
- **Pre-flight active-editor assertion** — D-103 carries forward from Phase 26 D-87 / Phase 25 D-54 / Phase 24 D-35 / Phase 23 OPEN-23-14.
- **Plain-markdown audit trails** — Phase 23 D-18 / Phase 24 D-23 / Phase 25 D-56 / Phase 26 D-88 pattern. Phase 27 D-104 extends with new tables / rows / sections.
- **Probe-first within plans** — Phase 24/25/26 established. Phase 27 Plan 27-00 probes the existing Input slot-signature structure before extending the label-slot; Plan 27-02 probes which image-import-*.jpg corresponds to `cl8tt` before pairing.
- **Belt-and-suspenders sibling-note documentation** — Phase 25 D-52 / Phase 26 D-78 pattern. D-93 inherits for Calendly placeholder notes.
- **Per-section fidelity labels with LAYOUT/TEXT split** — D-83 (Phase 26) precedent. D-95/D-97/D-99 inherit; Phase 27 likely has no LAYOUT/TEXT splits (all content is v1.3 verbatim — Section labels collapse to single EXACT each).
- **CALIBRATION-PROTOCOL branch matrix** — Phase 26 D-66 establishes the joel-only vs crito-source decision tree; Phase 27 is the first phase to use BOTH branches in one phase (Thank-you joel-only + Contact crito-source flat-raster).

### Integration Points
- **CALIBRATION-PROTOCOL.md is the definition-of-done framework** — every Plan 27-NN consults it at plan-time to know which branch + script applies.
- **Phase 27 new primitives are the bridge** to Phase 28+ (Blog forms — none currently; Phase 31 Homepage Contact section — instances the same form composition). If Phase 31 reuses Joel's homepage ContactSection content, it inherits Phase 27's exact 8-field instance pattern.
- **Calendly Wiring Map** is the bridge to the future code milestone — the code-side roadmapper reads PEN-INVENTORY's `## Calendly Wiring Map (Phase 27)` section + the sibling Pencil notes to know what to wire.
- **Phase 26 Section/CTA component** is consumed for the first time outside its declaring phase (Thank-you Plan 27-01 instance). Validates the Phase 26 D-78 reusability claim.
- **Phase 25 Compound/Card** is consumed for the second time outside its declaring phase (Contact sidebar Plan 27-02 instance; first cross-phase consumer was Phase 26 indirectly via FAQ Q+A list). Continues validating Phase 25 D-49 reusability claim.

</code_context>

<specifics>
## Specific Ideas

- **The Hybrid library strategy (D-89) is the single most consequential Phase 27 decision** — it sets the precedent for how future per-page phases handle missing primitive types. The Hybrid principle: "If the new shape is structurally close to an existing primitive (Textarea ≈ Input), extend as variant. If structurally distinct (Select has chevron, Checkbox has box), build as sibling. If composed from siblings (CheckboxGroup composes Checkbox), build as compound." Phase 28+ should apply the same heuristic.
- **The 8-field form's mismatch with cl8tt raster (D-97) is the most subtle Phase 27 reading** — cl8tt is THE Crito Contact source per OPEN-23-05, but it's a flat raster with whatever Crito depicted (possibly 4–6 generic agency fields). Phase 27 reads the raster for VISUAL composition only (spacing, page-intro presence, sidebar shape) while shipping Joel's 8-field SHAPE per ROADMAP success criterion 2. The cl8tt raster CANNOT show "Solutions checkbox group with 5 specific options" — that's Joel's lead-qualification structure, not Crito's template default.
- **STUB-as-policy from Phase 26 (D-81/D-82) is NOT inherited for Phase 27 microcopy** — D-98 + D-99 invoke D-82 verbatim (ship v1.3 truth). Phase 27 has v1.3 truth for ALL microcopy surfaces (unlike Phase 26 404 which had no v1.3 source). No STUB labels on either page (success-message + Section/CTA-Calendly + Contact form/sidebar all EXACT per D-83 reading).
- **Per-section fidelity labels (D-83 carry-forward)** apply but Phase 27 has fewer mixed-fidelity sections than Phase 26 — most sections are EXACT (token-bound + content verbatim). The exception is the optional `Return to homepage` secondary link on Thank-you (Claude's Discretion: plain text-link default vs Button/Secondary upgrade). Fidelity defaults to EXACT either way.
- **Section/CTA outside Phase 26 (D-93) is the first real reusability test** — Phase 26 built Section/CTA for FAQ ("Still have questions?") + reserved Phase 31 Homepage as future consumer. Phase 27 Thank-you is the FIRST cross-phase consumer (Plan 27-01). Validates Phase 26 D-78 reusability claim.
- **Foundation-first plan ordering (D-101) reverses Phase 26's "rich-then-simple" plan-ordering reasoning (D-85)** — Phase 26 ordered FAQ (rich) before 404 (simpler) because rich-first teaches what calibration looks like. Phase 27 is different: Plan 27-00 IS the foundation work (5 new library entries); Plan 27-01 (Thank-you, simpler joel-only) THEN Plan 27-02 (Contact, richer crito-source-flat-raster + 8-field form). Reasoning: foundation must land first because 27-02 has the deepest primitive dependencies; Thank-you tests existing components in production before Contact stresses the new primitives.
- **Crito-source labels stay in Section/Header + Section/Footer instances on Thank-you + Contact (D-95 + D-99)** — Joel's v1.3 4-link override is deferred to Phase 31 Homepage instance time per Phase 25 D-38 + Phase 26 D-77 carry-forward. Phase 27 does NOT override labels; just instances the components as Phase 25 shipped them.

</specifics>

<deferred>
## Deferred Ideas

- **Disabled state for form primitives (Button + Input + Select + Checkbox)** — v1.3 form sets `submitButton.disabled = loading;` during async submission. Phase 24 didn't ship Disabled for Button/Input; Phase 27 maintains parity by NOT shipping Disabled either. Deferred to a future state-coverage extension phase. Adds 4 variants if/when revisited (Button/Input/Select/Checkbox × Disabled).
- **Open-dropdown popover state for Select** — D-92 ships closed-state only per D-59 precedent. If a future Phase 31 Homepage consumer (or any new consumer) needs to depict the open dropdown, build `Primitive / Select / Open` variant (or `Compound / SelectMenu`) then.
- **Embedded Calendly iframe representation in `.pen`** — D-93 sibling notes document the wiring, but the .pen file does NOT depict the embedded iframe shape (rectangle placeholder, "Calendly logo + Book a meeting" widget look). Deferred to code-milestone wiring layer.
- **Joel-brand fonts (Bricolage Grotesque, DM Sans, neobrutalist colors) in Thank-you / Contact** — PROJECT.md says these "still planned to be replaced when code milestones run on top of v2.0" (Out of Scope). Phase 27 explicitly NOT introducing them per D-58 carry-forward.
- **Joel's v1.3 4-link Header nav override (Blog / Projects / FAQ / Contact)** — Phase 25 D-38 deferred to Phase 31 Homepage instance time; Phase 26 D-77 confirmed deferral; Phase 27 inherits. Header instances on Thank-you + Contact use Crito-source 6-label nav as Phase 25 shipped.
- **Joel-brand logo / wordmark in the Header logo slot** — Phase 25 D-40 deferred; Phase 26 + Phase 27 do not address. Section/Header on Thank-you + Contact instances inherit the Crito-source logo placeholder.
- **prose-link / prose-list / prose-inline-code semantic aliases** — OPEN-23-11 re-pointed to Phase 28 (Blog) per Phase 26 D-70 + D-73. Phase 27 has no prose-link or prose-list consumer (form labels + Card body are plain prose; the Section/CTA-Calendly Button has its own Primitive/Button styling). No Phase 27 surface re-points back.
- **`type-semantic-heading-3 / -4 / -5 / -6`** — OPEN-23-10 partially resolved by Phase 26 D-72 (heading-2 added). Phase 27 has no heading-3+ consumer (Contact + Thank-you have at most 2 levels of headings: page-intro = heading-1, optional sub-headings = heading-2). heading-3+ remain open for Phase 28 (Blog post hierarchy) / Phase 31 (Homepage sub-section headings).
- **`color-semantic-text-required`** — D-91 reuses `color-semantic-text-error` for the required-mark fill (visual identity already red). If a future consumer needs distinct required-vs-error color semantics, add `color-semantic-text-required` then.
- **Code-milestone `/contact` and `/thank-you` route rewrites** — out of v2.0 scope. v1.3 has no `/contact` page (homepage section); v1.3 `/thank-you` keeps rendering on v1.3 code throughout v2.0. Code milestone must build a `/contact` page and refactor `/thank-you` to consume Phase 27's frames.
- **v1.3 Message field validation/label inconsistency (label "(optional)" but `validationConfig` includes `valueMissing`)** — D-97 ships with required-mark enabled:true AND optional-mark "(optional)" rendered both, raises OPEN-27-NN for code-milestone resolution.
- **Verifying the "provisional" flag on `type-semantic-prose-paragraph-*`** — Phase 26 D-71 carry-forward. Phase 27 Thank-you body + Contact page-intro body + Contact sidebar Card body are new consumers; if visual rendering looks wrong at calibration, raise OPEN-27-NN. Phase 28 (Blog) remains the higher-confidence verifier.
- **Generalized form-field-row / fieldset / form-section components** — Phase 27 considered + rejected (no second consumer; Plan 27-02 ships 8 fields as direct children of a vertical-stack layout frame, not via fieldset components). Stays deferred; Phase 31 Homepage form repeat may justify if/when it ships.

</deferred>

---

*Phase: 27-thank-you-contact-reconstruction*
*Context gathered: 2026-06-07*

# Phase 24: Layout Primitives + Primitive Components - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in 24-CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-31
**Phase:** 24-layout-primitives-primitive-components
**Areas discussed:** Variant matrix scope policy, Icon glyph-swap mechanism, Button icon-slot strategy, Badge radius — OPEN-23-12 resolution

---

## Variant matrix scope policy

### Q1: When Crito source depicts only the resting state, what variants does Phase 24 ship?

| Option | Description | Selected |
|--------|-------------|----------|
| Strict: ship only depicted states | Button gets exactly the variants Crito depicts. Hover/focus/disabled deferred. Maximum discipline. | |
| Pragmatic: ship depicted + minimum forward-needed states tagged OPEN | Phase 24 ships depicted + variants Phase 25/27 will literally need. Each forward-added carries OPEN flag with provenance. | ✓ |
| Forward-looking: ship the full COMP-01 matrix | Build all COMP-01 variants with OPEN flags for non-source. Downstream never has to come back. | |

**User's choice:** Pragmatic — D-21
**Notes:** Drives D-22 (which specific forward states) and D-23 (audit trail).

### Q2: Which "minimum forward-needed" states?

| Option | Description | Selected |
|--------|-------------|----------|
| Keyboard-accessibility minimum | Button + Input :focus; Input :error. Skip :hover and :disabled. | |
| Compositional minimum | Input :focus + :error (Phase 27); Button :focus + :hover (Phase 25 header CTA). Skip :disabled at primitive layer. | ✓ |
| Phase 27 form-driven set | Drive set from Phase 27 contact form needs only. Button :hover only. | |

**User's choice:** Compositional minimum — D-22

### Q3: Where does the per-variant audit trail live?

| Option | Description | Selected |
|--------|-------------|----------|
| PEN-INVENTORY.md § "Variant Evidence" addendum | New markdown section, greppable, matches Phase 23 D-18. | ✓ |
| Sibling Pencil note per component | Lives next to the design but requires opening encrypted .pen to read. Diff-hostile. | |
| Plan SUMMARY.md per-plan | Lightweight but evidence scattered across summaries; harder to grep at Phase 25+ time. | |

**User's choice:** PEN-INVENTORY.md addendum — D-23

### Q4: COMP-01 lists three Button purposes. If Crito shows only one, disposition?

| Option | Description | Selected |
|--------|-------------|----------|
| Source wins — ship depicted only, mark COMP-01 partially satisfied | The Crito-faithful approach; matches v1.4 lesson. | ✓ |
| Requirement wins — synthesize missing purposes as OPEN-flagged variants | Ship all three with OPEN flags for synthesized cells. | |
| Probe-then-decide — 24-02 first task is variant audit | One extra checkpoint per primitive. | |

**User's choice:** Source wins — D-24

---

## Icon glyph-swap mechanism

### Q1: Pencil slot model — instance-swap vs component-property?

| Option | Description | Selected |
|--------|-------------|----------|
| Instance-swap (per-glyph atomic components) | Each glyph is its own atomic component; Primitive/Icon is a Slot wrapper. Maps to Lucide model. | ✓ |
| Component-property (single component, glyph enum) | One Icon component with glyph property. Risks OPEN-23-13-style limitations. | |
| Mixed — atoms now + slot wrapper for future | Ship 2–3 essential atoms + Slot wrapper. Hybrid. | |

**User's choice:** Instance-swap — D-25

### Q2: Which glyphs does Phase 24 ship?

| Option | Description | Selected |
|--------|-------------|----------|
| Source-driven — enumerate via PEN-INVENTORY audit | Plan 24-04 first task is the enumeration. Source-bound. | ✓ |
| Empty-slot wrapper — zero glyphs | Wrapper only; downstream phases add glyphs as they need them. | |
| Forward-needed — ship Phase 25 + 26 set explicitly | Concrete forward set; downstream never blocks on missing glyphs. | |

**User's choice:** Source-driven — D-26

### Q3: COMP-04 sizes — variants vs compositional sizing?

| Option | Description | Selected |
|--------|-------------|----------|
| Wrapper as size-variant component — 4 variants | Icon/16, Icon/20, Icon/24, Icon/32. Discoverable in Pencil's variant picker. | ✓ |
| Single wrapper, no size variants — compositional | Wrapper auto-fills parent. Risks non-standard sizes leaking. | |
| Wrapper + size enum property | Single component with `size: 16|20|24|32` property. | |

**User's choice:** Wrapper as size-variant component — D-27

### Q4: Joel-brand vs Crito-source glyphs (Instagram + Substack tension)

| Option | Description | Selected |
|--------|-------------|----------|
| Strict source — ship only Crito-frame glyphs | Phase 25 owns Instagram/Substack as forward OPEN-25-XX. | ✓ |
| Joel-overlay — add Instagram + Substack with OPEN-24-XX flag | Bridges the tension between policies. | |
| Defer-decision — Phase 25 discuss re-opens the question | Same shipping behavior, explicit deferral. | |

**User's choice:** Strict source — D-28

---

## Button icon-slot strategy

### Q1: Where does the Crito CTA arrow live — in Button or composed?

| Option | Description | Selected |
|--------|-------------|----------|
| Button owns iconLeading + iconTrailing slots | Self-contained; matches v1.3 ergonomics. | ✓ |
| Compositional — Section uses auto-layout [Button][Icon] row | Cleaner primitive but every consumer re-authors composition. | |
| Single trailing slot only | Asymmetric; minimal. | |

**User's choice:** Button owns iconLeading + iconTrailing slots — D-29

### Q2: Empty slot behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Auto-collapse — empty slot becomes invisible, gap collapses | Cleanest consumer experience. Plan 24-02 verifies Pencil mechanic works. | ✓ |
| Persistent placeholder — slot stays as a sized blank | Predictable but Button-without-icons looks off-center. | |
| Two Button variants — label-only vs with-icons | Doubles variant count but sidesteps the mechanic dependency. | |

**User's choice:** Auto-collapse — D-30

### Q3: Label-icon gap token

| Option | Description | Selected |
|--------|-------------|----------|
| Reuse space-semantic-inline-sm | No new tokens; preserves Phase 23 closed surface. | ✓ |
| Probe Crito source first, then decide | Add `space-semantic-button-icon-gap` if existing tokens don't match. | |
| Add space-semantic-button-icon-gap token now | Cleaner naming but opens token-addition door for everything. | |

**User's choice:** Reuse space-semantic-inline-sm — D-31

---

## Badge radius — OPEN-23-12 resolution

### Q1: Pill radius — add token or reuse?

| Option | Description | Selected |
|--------|-------------|----------|
| Probe-first, then ship the right token | 24-03 audits Crito badges; ships token shape based on source. | ✓ |
| Assume pill — add radius-semantic-pill now | Faster but risks adding unneeded tokens. | |
| Reuse radius-semantic-button as proxy | Preserves closed surface but loses pill fidelity if needed. | |

**User's choice:** Probe-first — D-32

### Q2: Phase 24 token-extension policy

| Option | Description | Selected |
|--------|-------------|----------|
| Open extensions — log each in PEN-INVENTORY | Any 24-NN plan can add tokens when source demands. Audit trail in new addendum. | ✓ |
| Capped — only the OPEN-23-* forward flags | Strictest discipline; risks 24-NN stalling on small gaps. | |
| Pre-flight sweep — 24-01 audits all 4 primitives upfront | Single decision point; no mid-phase token drift. | |

**User's choice:** Open extensions — D-33

### Q3: Badge kind variants — single component or two variants?

| Option | Description | Selected |
|--------|-------------|----------|
| Single Badge component, content drives appearance | Simplest; only adds variant axis if source dictates. | |
| Two Badge variants: pill vs metric | Distinct padding/spacing per kind. | |
| Probe-first, decide based on Crito source | 24-03 audits hero + project-card badges; ships single or two based on structural distinctness. | ✓ |

**User's choice:** Probe-first — D-34

---

## Claude's Discretion

- PEN-INVENTORY § "Variant Evidence" + § "Token Extensions" layout — combined vs per-primitive tables (decided at plan-time)
- Order of Primitive builds within Phase 24 (24-02/03/04 may interleave if probes share dependencies)
- Pencil slot typing (typed vs untyped slot constraint) — Claude picks based on Pencil-mechanics during 24-02
- Variant Evidence row granularity (single-cell vs axis-group) per primitive
- Sibling library frame stub depth — title node + sibling Pencil note (D-37, but the note content is Claude's discretion)

## Deferred Ideas

- Instagram + Substack social glyphs → Phase 25 Section/Footer (forward OPEN-25-XX)
- Button :disabled state → Phase 27 Compound concern OR future primitive-extension phase
- Button :active (pressed) state → no current consumer; future phase if needed
- radius-semantic-pill formal addition → contingent on D-32 probe outcome
- Component-property glyph-swap → revisitable in a follow-up phase if instance-swap proves unwieldy at Phase 28+ scale
- Variant matrix completion for COMP-01 secondary / ghost purposes + Button sm/md/lg sizes → forward OPEN flags consumed by code milestone
- Token sync pipeline (.pen → CSS/Tailwind) → next code milestone
- Dark mode → still deferred per TOKEN-07 + Phase 23 D-01

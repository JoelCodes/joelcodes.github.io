# Phase 31: Homepage Reconstruction — Research

**Researched:** 2026-06-11
**Domain:** Pencil MCP `.pen` reconstruction — LAST per-page phase in v2.0; D-155 HYBRID joel-only-with-Hero-pairing-exception calibration sub-branch (NOVEL); cross-phase deferral chain closure
**Confidence:** HIGH on protocol mechanics, Phase 25-30 carry-forward decisions, and v1.3 content extraction; MEDIUM on Hero subtree structural detail and Header descendants-override path (probe deliverables in Plan 31-00); LOW on speculative library additions (default: none).

## Summary

Phase 31 reconstructs the Homepage as a **Joel-shape 5-section backbone in Crito-vocab tokens + Phase 23-30 library components** — the FINAL per-page reconstruction in v2.0. CONTEXT.md D-155 introduces a HYBRID calibration sub-branch that layers `§ 4 joel-only token-usage` over the entire page and `§ 3.4 step 4 Hero side-by-side pairing` for the Hero section only. This sub-branch is structurally NOVEL — Phase 31 is the first and only v2.0 phase where the Crito source frame (`ujMLJ`) is itself editable rather than flat raster.

CONTEXT.md is already prescriptive (D-155 through D-167 + ~13 Claude-discretion items). This research's job is to **operationalize** those decisions for the planner: enumerate the Pencil MCP probe sequences for Plan 31-00 (Header descendants override, hIWuC white-stroke override, ujMLJ Hero subtree), define the single AskUserQuestion gate description format that carries both calibration artifacts at Plan 31-01 close, document the PAGE-11 LOCK action verbatim (sibling note attaches to the Hero illustration node — sub-section-raster sub-rule per § 3.3), and surface the Pencil 2.13 ref-instance composition pattern (OPEN-30-07) the planner must use for all inline Hero/Services/Process/About composition.

**Primary recommendation:** Ship Phase 31 as **2 plans** matching CONTEXT D-164 exactly. Plan 31-00 is probe-only (zero mutations — Tasks 0/1/2/3 surface content + override paths + Hero subtree IDs). Plan 31-01 is the page-frame composition with a single AskUserQuestion at close carrying both protocol artifacts in one description. Library count stays 19 → 19; tokens stay 107 → 107 default.

## Standard Stack

The "stack" for Phase 31 is the **Pencil MCP tool surface** + Phase 23-30 library + CONTEXT.md D-155-D-167 + CALIBRATION-PROTOCOL.md. No npm packages, no code.

### Core Pencil MCP tools (used by Phase 31)

| Tool | Phase 31 use | Plan |
|------|--------------|------|
| `mcp__pencil__get_editor_state({ include_schema: false })` | Pre-flight per D-166; assert `activeEditor.file == design/Crito.pen` before every mutating batch | 31-00, 31-01 (every task that mutates) |
| `mcp__pencil__get_guidelines({ topic: "design-system" })` | Refresh `descendants:{<id>:{...}}` + `Insert/Update/Replace` semantics | 31-00 Task 0 |
| `mcp__pencil__get_variables({})` | Token-surface baseline + close-time drift check; default delta = 0 | 31-00 Task 1 baseline + 31-01 Task close |
| `mcp__pencil__batch_get` | Verify Phase 23-30 baseline IDs intact; **Plan 31-00 Task 3 reads `ujMLJ` subtree at `readDepth: 3`** | 31-00 Tasks 1/2/3; 31-01 Task 1 |
| `mcp__pencil__batch_design` | All inserts/updates: page frame, Hero/Services/Process/About inline composition, Section/Header + Section/CTA + Section/Footer instances + descendants overrides + sibling notes + LOCK note on `ujMLJ` Hero illustration | 31-01 Tasks 2-7 |
| `mcp__pencil__find_empty_space_on_canvas` | Plan 31-01 page-frame placement with `nodeId: a0gRv` anchor (Phase 30 Design system frame) per § 10.4 | 31-01 Task 2 |
| `mcp__pencil__snapshot_layout({ problemsOnly: true })` | Document-root sweep at plan close + per-frame sweeps; benign text-clipping false-positives per Pitfall 6 documented in 31-01-SUMMARY | 31-01 Task close |
| `mcp__pencil__get_screenshot` | Hero side-by-side pairing artifact + per-section token-usage inline renders for AskUserQuestion description | 31-01 Task close |

### Phase 23-30 component library (Phase 31 INSTANCES only — no additions per D-164)

| Source | ID | Purpose | Phase 31 use |
|--------|----|---------|--------------|
| Primitive / Button / Default | `M7eUr` | Primary CTA | Hero primary + About + closing-CTA |
| Primitive / Button / Secondary | `hIWuC` | Secondary CTA — navy stroke + navy label default (Phase 25 D-43) | Hero secondary CTA with white-stroke descendants override per D-157 + OPEN-25-01 RESOLUTION |
| Primitive / Icon (16/20/24/32) | `EQaMf` / `yRvGb` / `u7NmaS` / `dpO5Y` | lucide-native glyphs | `arrow-right` candidate on Hero Primary CTA per Phase 25 D-43 + Phase 27 D-99 Hero precedent |
| Compound / Card | `t40xct` | 4-slot Card: image-slot `FGdti` / title-slot `vGH3A` / body-slot `oTSwn` / footer-actions-slot `eNqxd` | Services 3-up grid (3 instances) per D-158 |
| Section / Header | `G0wNOc` (inside `g9oRa5`) | Logo + 6 nav links + 1 CTA | Top of Homepage with descendants override per D-162 (4-link nav) + logo placeholder per D-163 |
| Section / Footer | `Xs0Hs` (inside `g9oRa5`) | 3 link columns + brand + social + copyright | Bottom of Homepage, no override per D-77 |
| Section / CTA | `Hs5rc` (inside `g9oRa5`) | 3-slot: headline + body + actions per Phase 26 D-78 broad-scoping | Closing-CTA at bottom of Homepage with descendants overrides for content per D-161; SECOND cross-phase consumer after Phase 27 Plan 27-01 Thank-you |
| `_Tokens & Foundations` | `RpGbe` | Token reference frame at top-of-canvas | PRIMARY calibration target for joel-only § 4.5 token-usage check per D-62 |

### Source Crito frame (read-only — except LOCK note)

| Frame | ID | Status | Phase 31 use |
|-------|----|--------|--------------|
| Home Page | `ujMLJ` | IN-SCOPE, 10 editable group children, `status_counts: flat:0, partial:2, factored:8` | Hero subtree (per PEN-INVENTORY line 121: `0veF5 / Wx9kx / 7QsZc / HuBKK / LqPtn / ggx3v`) is the side-by-side pairing target per § 3.4 step 4. Other 9 sections token-mining only per OPEN-23-04 — NOT reconstructed. PAGE-11 LOCK applied to Hero illustration raster on APPROVE per § 3.3 sub-section-raster sub-rule. |
| `_Tokens & Foundations` | `RpGbe` | Token reference (Phase 23 plan 23-05) | PRIMARY calibration target for § 4.5 joel-only branch token-usage check per D-62 |
| Design system | `a0gRv` | Phase 30 reconstructed | `find_empty_space_on_canvas` `nodeId` anchor per CALIBRATION-PROTOCOL § 10.4 |

### Alternatives Considered (and rejected by CONTEXT)

| Instead of | Could Use | Why rejected |
|------------|-----------|--------------|
| 2 plans (foundation + composition) | 3 plans (Hero + Services/Process + About/close+chrome) | D-164 sets 2-plan default; matching Phase 30 D-151 + Phase 27 D-101 foundation-first chain |
| Joel-brand chrome (Bricolage, OKLCH, isometric illustrations) | Crito-vocab Plus Jakarta Sans + Inter + STUB rectangles | PROJECT.md "Joel-brand visual chrome" OUT-OF-SCOPE; D-156 + D-157 + D-158 + D-159 + D-160 + D-163 lock to Crito-vocab |
| Bento-grid Hero (v1.3 visual) | Crito Hero subtree pattern | D-157 selection — Crito Hero structure wins |
| Crito 10-section topology (`ujMLJ` whole-frame) | Joel-shape 5-section backbone | D-156 selection — Joel's narrative dominates |
| Factor Section/Services, Section/Process, Section/About | Inline composition | Pitfall O5/O6 + Phase 26 D-79 + Phase 28 D-116 + Phase 29 D-134 narrow-scoping chain + D-158/D-159/D-160 |
| Promote D-155 HYBRID to CALIBRATION-PROTOCOL.md | Document in CONTEXT only | CONTEXT D-155 — only Phase 31 consumer in v2.0; Phase 32 sweep evaluates promotion |

**Installation:** N/A. v2.0 is `.pen`-file-only.

## Architecture Patterns

### Plan 31-01 Recommended Page-Frame Structure

```
Homepage (top-level frame at 1440 width × fit_content height)
├── layout: vertical, gap: 0, padding: 0, alignItems: center
├── fill: color-semantic-bg-page (literal #ffffffff per D-58 + OPEN-23-13)
├── placeholder: true during build → false + height fit_content at close (Plan 26-02 Task 4 / Plan 30-01 pattern)
├── anchor: FindEmptySpace({ nodeId: "a0gRv", direction: "right", padding: 80 })
│
├── Section/Header instance (ref: G0wNOc) — descendants override for 4-link nav per D-162
│   └── sibling note (D-163): "v1.3 'Joel Shinness' wordmark deferred to code milestone..."
├── Hero section (inline composition, 1200w content per Phase 26-30 convention)
│   ├── dark-bg fill #141f39ff (color-semantic-bg-dark) per Crito Hero
│   ├── display headline (type-semantic-display: PJS 70/700/lh 1.2)
│   ├── subtitle (type-semantic-body-sm or type-semantic-prose-paragraph: Inter 18)
│   ├── dual CTAs: M7eUr Primary + hIWuC Secondary
│   │   └── hIWuC descendants override: {<strokeId>:{stroke:"#ffffffff"},<labelId>:{fill:"#ffffffff"}} per OPEN-25-01 + D-157
│   └── decorative shape: coral ellipse 286×225 (color-semantic-decorative-coral) + STUB illustration rectangle + sibling LOCK note pattern
├── Services section (inline composition, 1200w)
│   ├── H2 (type-semantic-heading-1 size 48 per PEN-INVENTORY line 170 Crito section-heading evidence)
│   └── 3-up horizontal grid of t40xct Compound/Card refs
│       └── per-card descendants overrides: image-slot STUB, title-slot, body-slot, footer-actions-slot (Secondary "Learn more" Button or text-link)
├── Process section (inline composition, 1200w)
│   ├── H2 (type-semantic-heading-1)
│   └── 5-step vertical-stack (default per D-159 Claude's Discretion; horizontal 2x3 alternative)
│       └── per-step: number marker or icon-slot STUB + step-title (heading-3 24px) + step-body (prose-paragraph)
├── About section (inline composition, 1200w)
│   ├── 2-column horizontal-layout
│   ├── left: headshot STUB (solid-fill rectangle per D-160 Claude's Discretion default)
│   └── right: H2 + bio paragraph (prose-paragraph) + Primary Button "Let's talk" → /contact (n0QqTd)
├── Section/CTA instance (ref: Hs5rc) — descendants overrides for headline + body + actions per D-161
│   └── sibling note (D-161): "v1.3 ContactSection.astro ships full 8-field form on-homepage..."
└── Section/Footer instance (ref: Xs0Hs) — no override per D-77

ujMLJ Hero illustration node (OUTSIDE the new Homepage frame; in original location)
└── + sibling Pencil note (Plan 31-01 close after APPROVE): "LOCKED — cross-reference for Phase 31 Homepage Hero per D-155"
    └── ujMLJ Hero illustration raster stays enabled:true (NOT hidden) per § 3.3 sub-section-raster sub-rule
```

### Pattern 1: Single AskUserQuestion gate carrying BOTH protocol artifacts (D-155 HYBRID)

**What:** D-155 layers § 4 joel-only token-usage over the whole Homepage with a § 3.4 step 4 Hero side-by-side pairing exception. The planner must NOT split this into two AskUserQuestion gates — Phase 26 D-65 + 27 D-102 + 28 D-124 + 29 D-139 + 30 D-152 chain enforces **one gate per plan** per CONTEXT D-165.

**When to use:** Plan 31-01 Task close.

**How (description structure — section-by-section ordering recommended per CONTEXT D Claude's Discretion):**

```markdown
**Calibration spot-check — Homepage page (D-155 HYBRID joel-only-with-Hero-pairing-exception per CONTEXT)**

This Homepage frame is the LAST per-page reconstruction in v2.0. It uses the standard § 4
joel-only token-usage check vs `_Tokens & Foundations` (RpGbe) for all sections, PLUS a
§ 3.4 step 4 Hero side-by-side pairing against the editable Crito Hero subtree inside
`ujMLJ`. Does this composition use the declared tokens correctly AND does the Hero match
the Crito source's structural vocabulary with declared deviations documented?

**Inline renders shown above:**
- Reconstructed Homepage page frame: <homepageFrameId>
- Reconstructed Hero section detail: <heroSectionId>
- Crito ujMLJ Hero subtree detail: <ujMLJ Hero subtree id from Plan 31-00 Task 3 probe>

### Section 1: Section/Header (overridden 4-link nav per D-162)
**Fidelity:** EXACT (descendants override only — base component unchanged)
**Token bindings:** color-semantic-bg-page / color-semantic-text-primary / type-semantic-body / space-semantic-* (Crito Menu bar gap + padding)
**Notes:** 4-link override SCOPED to Homepage instance per D-162; logo retains Crito placeholder per D-163 + sibling note documents v1.3 wordmark

### Section 2: Hero (§ 3.4 HERO SIDE-BY-SIDE pairing target per D-155)
**Fidelity:** APPROXIMATE
**Declared deviations from Crito source:**
- Decorative coral ellipse: Pencil-native ellipse (faithful to Crito coral 286×225)
- Hero illustration: STUB rectangle (Crito raster LOCKED in place per § 3.3 sub-section-raster sub-rule)
- Secondary Button stroke + label: white descendants override (#ffffffff) per OPEN-25-01 carve-out — RESTORES Crito-literal dark-bg appearance
**Token bindings:** type-semantic-display / type-semantic-body-sm / color-semantic-bg-dark / color-semantic-text-inverse / color-semantic-decorative-coral
**Content authority:** v1.3 verbatim per D-98 + D-157 (Hero.astro lines 71-73)

### Section 3: Services (inline composition per D-158)
**Fidelity:** EXACT layout + STUB illustrations
**Token bindings:** type-semantic-heading-1 / type-semantic-body / color-semantic-bg-surface / space-semantic-section-y
**Notes:** 3-up Compound/Card (t40xct) refs with image-slot STUB; Joel-brand isometrics deferred to code milestone per PROJECT.md

### Section 4: Process (inline composition per D-159)
**Fidelity:** EXACT layout + STUB illustrations
**Token bindings:** type-semantic-heading-1 / type-semantic-heading-3 (step titles) / type-semantic-prose-paragraph / space-semantic-*

### Section 5: About (inline composition per D-160)
**Fidelity:** EXACT layout + STUB headshot
**Token bindings:** type-semantic-heading-1 / type-semantic-prose-paragraph / space-semantic-*

### Section 6: Section/CTA closing (Hs5rc per D-161)
**Fidelity:** EXACT (descendants override for content only)
**Token bindings:** inherited from Hs5rc default + descendants override values resolve to type-semantic-* surface
**Notes:** SECOND cross-phase consumer of Hs5rc after Phase 27 Plan 27-01 Thank-you; sibling note documents v1.3 ContactSection on-homepage architecture

### Section 7: Section/Footer (no override per D-77)
**Fidelity:** EXACT

### Calibration targets:
- **§ 4.5 joel-only:** `_Tokens & Foundations` reference frame `RpGbe` shows the canonical visual register for these tokens.
- **§ 3.4 step 4 Hero:** Crito Hero subtree inside ujMLJ at `<subtreeId from Plan 31-00 probe>` — Hero pair shown above.

**Description identifiers (D-64 — inline only per OPEN-23-01, NOT disk-written):**
- 31-homepage--token-usage.png (whole-page joel-only artifact)
- 31-homepage-hero--side-by-side.png (Hero § 3.4 artifact)
```

**Options:**
- "APPROVE — token bindings correct + Hero matches Crito source with declared deviations; fidelity labels per D-83 as proposed"
- "REVISE — token mismatch OR Hero deviation not acceptable (free-text describe)"
- "GAP — composition reveals a missing token OR Hero needs a new structural element (raise OPEN-31-NN)"

### Pattern 2: PAGE-11 LOCK action (§ 3.3 sub-section-raster sub-rule)

**What:** The ujMLJ Hero illustration is one raster among 10 editable group children inside an editable Crito frame. Per § 3.3: "If the raster is one section among many in an editable Crito frame (e.g., a Hero illustration inside `ujMLJ`), **lock** (mark with a sibling Pencil note) and leave in place for cross-reference."

**When:** Plan 31-01 Task close, AFTER user APPROVE only (NEVER before — Pitfall 4). Run AS PART OF the post-APPROVE batch_design call.

**How (mechanic):**
1. Identify the Hero illustration node ID from Plan 31-00 Task 3 probe (`batch_get(["ujMLJ"], readDepth: 3)`). The Hero subtree includes IDs `0veF5 / Wx9kx / 7QsZc / HuBKK / LqPtn / ggx3v` per PEN-INVENTORY line 121 enumeration; one of these is the illustration node (probe identifies which — likely the rightmost decorative-anchor child of `HuBKK` per the Crito Hero pattern of content-column left + illustration right).
2. `batch_design` Insert a `note` sibling next to that node. **DO NOT modify the illustration node itself.** The raster stays `enabled: true`.

```javascript
// Plan 31-01 Task close, after AskUserQuestion APPROVE
Insert(<heroIllustrationParentId>, {
  type: "note",
  text: "LOCKED — cross-reference for Phase 31 Homepage Hero per D-155. Sub-section-raster sub-rule (CALIBRATION-PROTOCOL § 3.3): raster stays enabled:true; Phase 31 Homepage Hero section (in top-level Homepage frame) is the Crito-vocab reconstruction. Do not edit this raster — it is the visual pairing reference for Phase 31's APPROVE state.",
  width: 400, height: 80
})
```

**Sibling note attachment location:** As a sibling of the Hero illustration node (same parent in the `ujMLJ` Hero subtree). Plan 31-00 Task 3 probe confirms the exact parent — most likely `HuBKK` (Crito Hero outer container) or its direct content/decorative split. Recommended: attach to the illustration node's **direct parent** (sibling-to-raster) rather than to `ujMLJ` itself, so the LOCK association is spatially obvious in Pencil's editor.

**PEN-INVENTORY status_counts update:** `factored:8, partial:2 → factored:8, partial:1, locked:1` (per CONTEXT D-167 + Claude's Discretion). The exact key schema is plan-execution discretion at PEN-INVENTORY extension write-time — recommend introducing `locked:N` as a new status_counts key + 1-line documentation in PEN-INVENTORY § 2 status_counts logic block.

### Pattern 3: Header descendants-override for 4-link nav (D-162)

**Source structural data (proven mechanic from Phase 28 D-111):** Section/Header `G0wNOc` (inside `g9oRa5`) currently ships 6 Crito-source nav labels per Phase 25 Plan 25-01 build. Pencil 2.13 `batch_design` supports descendants overrides on ref instances via:

```javascript
Insert(<homepagePageFrameId>, {
  type: "ref", refId: "G0wNOc", name: "Section/Header (Homepage instance)",
  descendants: {
    "<homeNavItemId>": { enabled: false },
    "<aboutNavItemId>": { enabled: false },
    "<servicesNavItemId>": { enabled: false }
  }
})
```

**Plan 31-00 Task 1 probe deliverable:** `batch_get(["G0wNOc"], readDepth: 3)` to enumerate the 6 nav-item child IDs + their text-child IDs. Document each ID + its current text content + reachability via descendants override path. Probe also confirms whether `enabled: false` collapses the nav-item visually (Phase 24 D-30 + Phase 25 OPEN-24-06 RESOLUTION pattern confirms — yes, empty/disabled slots collapse).

**Two structural paths possible — probe-decided:**
- **Path A (HIDE + INSERT):** Hide Home + About + Services via descendants `enabled: false`, then **Insert a new "Projects" nav-item** as a child of the nav container. Question: does Pencil 2.13 allow `Insert(<refInstanceId>/<navContainerId>, {...})`? **Plan 30-00 OPEN-30-07 says NO** — Pencil 2.13 rejects inserting new children into descendants of ref instances. Error: "use U() to update properties, or R() to replace it."
- **Path B (HIDE + REPLACE one slot's text):** Hide Home + About; REPLACE the third hidden slot's text content via descendants override (e.g., descendants: `{<servicesTextChildId>: {text: "Projects"}, <servicesHrefId>: {href: "/projects"}}`). The nav-item frame stays; only its text label changes.
- **Path C (REPLACE ALL via children replacement):** Use OPEN-30-07's documented workaround: `descendants: { <navContainerId>: { children: [...] } }` — fully replaces the nav container's children at instance scope. This works but is structurally more invasive (every nav-item becomes consumer-provided rather than Crito-default-provided).

**Recommended path:** **Path B (HIDE + REPLACE one slot's text)** per Pencil 2.13 mechanics + minimum-surface change. Plan 31-00 Task 1 probe outcome may confirm or pivot to Path C if Path B is mechanically blocked.

**Mechanic to test in Plan 31-00 Task 1 probe (no mutations):** `get_guidelines({ topic: "design-system" })` to refresh descendants override semantics; `batch_get(["G0wNOc"], readDepth: 3)` to enumerate child IDs; document in `31-00-SUMMARY.md`.

### Pattern 4: Secondary Button white-stroke descendants override (D-157 + OPEN-25-01)

**Source structural data:** Primitive/Button/Secondary `hIWuC` (inside `avgor`) ships per Phase 25 Plan 25-01 Task 1 with:
- Component-level fill: transparent
- Component-level stroke: navy `#141f39ff` (light-bg default per Phase 25 D-43)
- Component-level strokeWidth: 0.5
- Component-level strokeAlignment: inner
- Component-level cornerRadius: 10
- Component-level padding: [16, 20]
- Component-level gap: 10
- Component-level label: Inter 16/600 navy `#141f39ff` (text-on-light)

**Phase 25 OPEN-25-01 anticipated carve-out:** "Phase 31 Hero instance applies descendants override on the Secondary instance: `{strokeId:{stroke:"#ffffffff"},labelId:{fill:"#ffffffff"}}` if Hero CTA pairing needs Crito-literal whites."

**Plan 31-00 Task 2 probe deliverable:** `batch_get(["hIWuC"], readDepth: 3)` to enumerate:
1. The stroke node ID (likely a `frame` child holding the stroke property — needs verification; Pencil 2.13 represents stroke at the frame level via `stroke: "#colorHex"`, so the "strokeId" may be the **frame ID itself** rather than a separate child)
2. The label text-child ID (the Inter 16/600 text node — labeled via descendants override)

**Anticipated mechanic at instance-time (Plan 31-01 Hero composition):**

```javascript
Insert(<heroDualCtaRowId>, {
  type: "ref", refId: "hIWuC", name: "Hero Secondary CTA",
  descendants: {
    "<hIWuC frame id or stroke-bearing node>": { stroke: "#ffffffff" },
    "<hIWuC label text-child id>": { fill: "#ffffffff" }
  }
})
```

**Single-level descendants override is sufficient.** Pencil 2.13's descendants map accepts top-level node IDs; the framework resolves them within the ref subtree. **Nested override is NOT required** for this case — frame-level `stroke` + text-level `fill` are both leaf properties.

**Probe outcome documented in 31-00-SUMMARY.md** — include the actual child IDs so Plan 31-01 Task references concrete IDs rather than placeholders.

### Pattern 5: Inline composition over factoring (D-158/D-159/D-160 + Pitfall O5/O6)

**Rule:** Services, Process, About, and the closing-CTA are all single-Homepage consumers. Per Phase 26 D-79 + Phase 28 D-116 + Phase 29 D-134 narrow-scoping chain + Pitfall O5/O6 single-consumer anti-pattern, **no new Section components are factored in Phase 31**. Library count stays 19 → 19. Phase 30 D-149 showcase-pattern departure is NOT inherited.

**Plan 31-00 Task 0 should evaluate the emerging-consumer rule** (Phase 30 D-145 noted: "if Phase 31 Homepage adds a third [Section/SecondaryLink] consumer, factor then per emerging-consumer rule"). v1.3 audit:
- Hero CTAs: dual Button (Primary + Secondary) — NOT SecondaryLink consumers
- Services Card footer-actions-slot: plan-execution decides Button vs text-link; default Button per Phase 25 Card slot defaults
- Process step actions: no secondary link in v1.3 Process.astro
- About CTA: Primary Button (default per D-160 Claude's Discretion) — NOT SecondaryLink
- Closing-CTA actions-slot: Button

**Default disposition:** DEFER Section/SecondaryLink consolidation to future phase or code milestone. No third consumer surfaces in Phase 31's v1.3 audit.

### Pattern 6: Pencil ref-instance composition (OPEN-30-07)

**Constraint discovered Plan 30-01:** Pencil 2.13 rejects `Insert(<refInstanceId>/<descendantId>, {...})` — error "use U() to update properties, or R() to replace it." Ref instances disallow inserting NEW children into descendant frames.

**Workaround pattern (Plan 30-01 production-proven):**

```javascript
Insert(<parentFrame>, {
  type: "ref", refId: "<componentId>", name: "<consumer name>",
  descendants: {
    "<containerNodeId>": { children: [
      { type: "frame", name: "child-1", ... },
      { type: "ref", refId: "<another component>", ... },
      ...
    ] }
  }
})
```

**Phase 31 applicability:**
- Section/Header `G0wNOc` instance: descendants override on nav container child to add/replace items (Path B or C above)
- Section/CTA `Hs5rc` instance: descendants override on headline + body + actions slots (3-slot per Phase 26 D-78)
- Compound/Card `t40xct` instances × 3 in Services: descendants override on image-slot (STUB rectangle) + title-slot + body-slot + footer-actions-slot (Button instance)

Anywhere Phase 31 needs to compose content INTO a ref instance, use the `descendants.<container>.children` pattern, NOT `Insert(<refInstance>/<descendant>, ...)`.

### Pattern 7: nodeId anchor on FindEmptySpace (§ 10.4)

**Rule:** Plan 31-01 page-frame placement uses `find_empty_space_on_canvas({ width: 1440, height: <estimate>, direction: "right", padding: 80, nodeId: "a0gRv" })` — `a0gRv` is the Phase 30 Design system frame ID (per PEN-INVENTORY line 77).

**Why the anchor matters:** Without `nodeId`, FindEmptySpace may pick the library-row Y (y ≈ −11711) rather than the page-frame row (y ≈ −4111). With the anchor on a known page-row frame, placement falls on the same row.

**Expected returned position:** Approximately `(32xxx, −4111.55)` — to the right of Phase 30 Design system frame `a0gRv` at `(31287.27, −4111.55)`, plus 80 padding + 1440 width.

**Page-frame height estimate:** Use `height: 4000` initial estimate then `Update(<homepageFrameId>, { placeholder: false, height: "fit_content" })` at Task 4-5 per Plan 26-02 + Plan 30-01 pattern. Avoid fixed final heights — `fit_content` is more flexible for future structural edits.

### Anti-Patterns to Avoid

- **Inserting children into ref descendants via `Insert(<ref>/<descendant>, ...)`** — rejected by Pencil 2.13 per OPEN-30-07. Use `descendants.<container>.children` pattern instead.
- **Hiding ujMLJ Hero illustration via `enabled: false`** — § 3.3 sub-section-raster sub-rule says LOCK (sibling note), NOT hide. Hiding is for whole-page rasters like `cl8tt` Contact.
- **Two AskUserQuestion gates at Plan 31-01 close** — CONTEXT D-165 + Phase 26-30 chain enforces one gate per plan. The hybrid sub-branch carries both protocol artifacts in a single description.
- **Adding new tokens, library components, or variant cells without source evidence** — Pitfall 1 + Pitfall 7. Default for Phase 31 is 0 net-new tokens, 0 net-new library entries.
- **PAGE-11 action before APPROVE** — Pitfall 4 carry-forward. The LOCK note attaches AFTER user APPROVE in the same close batch, not during composition.
- **Header descendants override propagating to other reconstructed page frames** — D-162 SCOPES the override to Homepage instance ONLY. Other page Header instances retain Crito 6-link defaults per Phase 25 D-77.
- **Joel-brand chrome reintroduction** — PROJECT.md "Joel-brand visual chrome" Out-of-Scope. Crito-vocab tokens (PJS + Inter + navy + coral) per D-156 + D-157 + D-158 + D-159 + D-160 + D-163.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Section/Services | A new Section/Services component | Inline composition: H2 + 3-up grid of `t40xct` Compound/Card refs with descendants overrides | Single-consumer (Homepage only); narrow-scoping chain (D-79/D-116/D-134); D-158 + Pitfall O5/O6 |
| Section/Process | A new Section/Process component | Inline composition: H2 + 5-step vertical-stack with number marker + title + body per step | Single-consumer; D-159 + narrow-scoping |
| Section/About | A new Section/About component | Inline composition: H2 + 2-column headshot-left + bio-right with Primary CTA | Single-consumer; D-160 + narrow-scoping |
| Closing-CTA section | A new Section/Homepage-CTA component | `Hs5rc` (Phase 26 Section/CTA, broad-scoping per D-78) — SECOND cross-phase consumer after Plan 27-01 Thank-you | D-161 validates Phase 26 D-78 broad-scoping prediction |
| 4-link Header nav | A new Section/Header/Homepage variant or new component | Descendants override on G0wNOc instance per D-162 | Scope deferral chain closure; component-level Crito-source defaults preserved for other reconstructed pages per D-77 |
| Hero white-stroke Secondary | A new Primitive/Button/Secondary/Inverse variant | Descendants override on hIWuC instance per OPEN-25-01 carve-out + D-157 | Phase 25 D-43 anticipated carve-out — variant-axis proliferation rejected per Pitfall 7 |
| Joel-brand wordmark + logo | New Pencil logo asset or wordmark text-frame | Crito-source placeholder + sibling note documenting v1.3 wordmark for code milestone (D-163) | PROJECT.md Joel-brand visual chrome Out-of-Scope + Phase 25 D-40 carry-forward |
| Hero illustration | Pencil-native vector reconstruction of Crito Hero illustration | STUB image-fill rectangle + sibling note documenting Crito source raster (LOCKED in place) | Custom illustration recreation OUT-OF-SCOPE per PROJECT.md + asset provenance Pitfall U5 |
| Services / Process / About illustrations + headshot | Joel-brand isometric / selfie reconstructions in Pencil | STUB image-fill rectangles + sibling notes documenting v1.3 source for code milestone | Joel-brand assets OUT-OF-SCOPE per PROJECT.md; D-158 + D-159 + D-160 STUB labeling |
| Bottom contact form (8-field) on Homepage frame | Reconstruct ContactSection.astro on Homepage | Section/CTA close → link to /contact n0QqTd (Phase 27) per D-161 | Single-source-of-truth at /contact; v1.3 on-homepage architecture documented as sibling note for code-milestone decision |

**Key insight:** Phase 31 is the **payoff** for Phases 23-30's library investment. Every new section is either (a) a ref instance of an existing library component with descendants overrides, or (b) inline composition justified by single-Homepage-consumer rule. **Adding ANY new library entry in Phase 31 default plan is a planning error** — the library is closed at 19 components.

## Common Pitfalls

### Pitfall 1: Two AskUserQuestion gates at Plan 31-01 close (HYBRID sub-branch trap)

**What goes wrong:** Planner sees § 4 joel-only + § 3.4 Hero-pairing and decides to ship two gates — one for token-usage check, one for Hero side-by-side. Plan-close ships 2 AskUserQuestion calls; user APPROVES the first, the second waits, conversation context drifts.

**Why it happens:** The two protocol artifacts feel structurally different (token-usage description vs image pair), so the impulse is to gate them separately. CONTEXT D-155 explicitly says "a SINGLE AskUserQuestion gate" but the planner reads § 4.5 + § 3.4 step 5 as two distinct gates.

**How to avoid:** Plan 31-01 has exactly one AskUserQuestion call at close. The description structure carries section-by-section bindings (joel-only § 4.5 format) PLUS a Hero side-by-side image pair (§ 3.4 step 4 artifact). One question, structured options matrix. See **Pattern 1** for the description template.

**Warning signs:** Plan 31-01 task list has two "AskUserQuestion" entries at close; or description has nested "Question 1 / Question 2" structure.

### Pitfall 2: PAGE-11 action before user APPROVE

**What goes wrong:** Plan 31-01 composition adds the LOCK sibling note on `ujMLJ` Hero illustration during the inline composition phase (Tasks 2-4), before the calibration gate fires. User REVISEs at gate; Hero illustration is already LOCKed; revision iterations either bypass the LOCK or have to undo it.

**Why it happens:** Pitfall 4 carry-forward — the LOCK feels structurally tied to the Hero composition, so it gets folded into the same batch. CONTEXT D-167 + § 3.3 + Phase 27 Plan 27-02 (cl8tt hide-on-APPROVE) + Phase 28 Plans 28-01/28-02 (DzqTm / w1m3x hide-on-APPROVE) + Phase 29 Plans 29-01/29-02 (Y2isa / cYlRH hide-on-APPROVE) production pattern: **PAGE-11 action is the LAST mutation in the plan, fires ONLY on APPROVE branch of the calibration gate, NEVER before.**

**How to avoid:** Plan 31-01 task list has the LOCK note as a Task close sub-step inside the APPROVE branch. Pattern:

```
Task N: AskUserQuestion calibration gate
  - APPROVE branch:
    - Insert LOCK sibling note on ujMLJ Hero illustration parent
    - Update PEN-INVENTORY: factored:8, partial:2 → factored:8, partial:1, locked:1
    - Add new Homepage frame row
    - OPEN-25-01 RESOLVED + OPEN-23-04 LAST-VISIT + OPEN-23-09 RESOLVED
  - REVISE branch: re-iterate batch_design Updates + re-gate
  - GAP branch: log OPEN-31-NN per § 7 + continue
```

**Warning signs:** LOCK note insert appears in Task 2-4 batch (Hero composition); or the close batch lacks branching by gate outcome.

### Pitfall 3: Header descendants-override path B mechanically blocked (Path A also blocked per OPEN-30-07)

**What goes wrong:** Planner specs Path A (Insert new "Projects" nav-item inside the ref instance's nav container). Pencil 2.13 rejects: "use U() to update properties, or R() to replace it." Plan 31-01 stalls mid-execution; user has to debug at the keyboard.

**Why it happens:** OPEN-30-07 (Plan 30-01 discovery) wasn't fully internalized when planning Phase 31. Pencil 2.13 disallows `Insert(<refInstance>/<descendant>, ...)`. Path A (HIDE + INSERT) is mechanically blocked at the Insert step.

**How to avoid:** Plan 31-00 Task 1 probe confirms whether Path B (REPLACE one hidden slot's text) is mechanically feasible before Plan 31-01 commits. If Path B fails, Plan 31-01 pivots to Path C (full children replacement via `descendants.<navContainer>.children`). Document the probe outcome in 31-00-SUMMARY.md with the actual child IDs.

**Warning signs:** Plan 31-01 spec uses `Insert(<homepageHeaderRefId>/<navContainerId>, { ... "Projects" })` syntax; Plan 31-00 Task 1 deliverable doesn't include OPEN-30-07 cross-reference.

### Pitfall 4: Hero illustration sibling note attaches to wrong parent

**What goes wrong:** LOCK note attaches to `ujMLJ` (frame root) rather than to the Hero subtree parent. The note is now spatially disconnected from the raster it locks — in Pencil's editor, the LOCK association is invisible because the note sits at the top of the Hero subtree at frame level rather than next to the illustration.

**Why it happens:** Plan 31-01 task list says "add sibling Pencil note on ujMLJ Hero illustration raster" but the executing agent reads "sibling note inside ujMLJ" and attaches it at root level.

**How to avoid:** Plan 31-00 Task 3 probe identifies the Hero illustration node ID AND its direct parent. Plan 31-01 spec uses the **direct parent** as the Insert target for the note. Example:

```
After Plan 31-00 Task 3, document in 31-00-SUMMARY.md:
- ujMLJ Hero subtree root: HuBKK (likely; confirm at probe)
- Hero content-column: <id>
- Hero decorative-anchor column (illustration container): <id>
- Hero illustration leaf node: <id>

Plan 31-01 close batch (APPROVE branch):
Insert(<illustration leaf node's direct parent — likely the decorative-anchor column>, {
  type: "note", text: "LOCKED — cross-reference for Phase 31 Homepage Hero per D-155...",
  ...
})
```

**Warning signs:** Plan 31-01 spec says `Insert("ujMLJ", { type: "note", ... })` — that's at frame root, not at illustration sibling.

### Pitfall 5: snapshot_layout text-clipping false-positives misread as real bugs

**What goes wrong:** Plan 31-01 close runs `snapshot_layout({ problemsOnly: true })` — gets benign text-clipping warnings on Hero headline (PJS 70 — large text), Services Card bodies, Process step bodies, About bio paragraph. Plan executor treats them as real bugs and pivots to fix-loops; plan stalls.

**Why it happens:** Pitfall 6 carry-forward — `snapshot_layout` reports multi-line text in auto-layout frames as "partially clipped" even when nothing visible is clipped. Phase 24-30 production established this is benign and not mitigated. Phase 31 Hero is the highest-magnitude case (display 70 + uppercase + leading 1.2).

**How to avoid:** Plan 31-01 close task spec includes Pitfall 6 carry-forward language: "snapshot_layout text-clipping warnings on the Hero display + Services/Process/About body text are documented as BENIGN false-positives per Phase 24-30 precedent; no mitigation applied." Document the specific warnings in 31-01-SUMMARY.md so future Phase 32 sweep + handoff readers don't relitigate.

**Warning signs:** Plan 31-01 close task spec says "iterate on snapshot_layout warnings until problemsOnly returns 'No layout problems'" — that's not achievable for text-heavy frames per established precedent.

### Pitfall 6: Cross-row stale-cache get_screenshot quirk on Plan 31-01 Hero side-by-side artifact

**What goes wrong:** Plan 31-01 close calls `get_screenshot(<reconstructedHeroId>)` for the Hero side-by-side pair (§ 3.4 step 4 artifact); returns blank-white image (OPEN-26-02 stale-cache quirk). Calibration gate has no usable Hero artifact; user can't visually compare to ujMLJ Hero subtree.

**Why it happens:** Newly-created subtrees in the active Pencil MCP session sometimes return blank-white from `get_screenshot`. Phase 26-30 production established Tier-1 (cross-row position Update) + Tier-2 (user-side editor verification) workarounds per § 6.4.

**How to avoid:** Plan 31-01 close task spec includes Tier-1 and Tier-2 fallback per CALIBRATION-PROTOCOL § 6.4:
- **Tier-1:** `Update(<homepageFrameId>, { x: <new-row-y>, y: <different-row-y> })` then move back. Cross-row Update clears the stale render cache (worked Plan 26-01 + 28-01 + 29-01 / 29-02).
- **Tier-2:** If Tier-1 fails, fall back to user editor verification at the gate (worked Plan 26-02 + 30-01). Structural verification via `batch_get` + `snapshot_layout` remains authoritative.

Phase 31 page frame is moderate density (~15-20 artifacts) compared to Plan 30-01's ~58 — Tier-1 expected sufficient.

**Warning signs:** Plan 31-01 close task spec assumes get_screenshot always succeeds; no Tier-1/Tier-2 fallback path.

### Pitfall 7: Inventing a third Section/SecondaryLink consumer to trigger emerging-consumer rule

**What goes wrong:** Plan 31-00 Task 0 v1.3 audit speculatively identifies a "Hero subtitle text-link" or "Services 'Learn more' as a text-link instead of Button" as a Section/SecondaryLink consumer, justifying factoring a new library component (third consumer rule per Phase 30 D-145). Library count goes 19 → 20; Pitfall 7 violation.

**Why it happens:** The "emerging-consumer rule" is tempting — it provides a justification for factoring that feels well-precedented. But the rule only fires when a real third consumer surfaces, not a speculative one.

**How to avoid:** Plan 31-00 Task 0 reads v1.3 source files literally (Hero.astro line 71-83, Services.astro, Process.astro, About.astro, ContactSection.astro) and documents the actual link/Button surface. Default disposition: DEFER Section/SecondaryLink consolidation per CONTEXT D-164 Plan 31-00 Section/SecondaryLink consideration. Mid-plan gate ONLY if a genuine third consumer surfaces in the audit (Hero CTAs are Buttons, About CTA is Button, Services footer-actions defaults to Button — no third SecondaryLink consumer surfaces).

**Warning signs:** Plan 31-00 Task spec says "factor Section/SecondaryLink based on Hero subtitle text-link"; or library count target moves from 19 to 20.

### Pitfall 8: Token surface bloat from speculative Hero spacing or coral-ellipse decorative tokens

**What goes wrong:** Plan 31-00 Task 3 probe finds the Crito Hero subtree spacing values (`10/20` Crito-specific half-step per OPEN-23-07) and the planner adds `space-semantic-hero-headline-y` / `space-semantic-hero-cta-gap` / `color-semantic-decorative-coral-light` tokens to "cover the Hero faithfully." Token surface goes 107 → 110+; D-164 default violated; Pitfall 1 + Pitfall 7 + premature abstraction.

**Why it happens:** Hero is the highest-stakes section and the temptation to "do it right" pulls toward over-tokenization. But Phase 23 already mined the Crito Hero subtree — every value Phase 31 needs should already be in the 107-token surface. New tokens require a real escalation, not speculative coverage.

**How to avoid:** Plan 31-00 Task 3 probe documents Hero subtree spacing values; Plan 31-01 instance-time bindings use existing semantic tokens. Mid-plan gate ONLY if a Hero value materially can't bind to an existing token AND the gap is structural (not aesthetic). Default: literal-with-Variant-Evidence-row dual-track per OPEN-23-13.

**Warning signs:** Plan 31-00 Task 3 surfaces "new token candidates"; or Plan 31-01 spec includes `set_variables` calls.

### Pitfall 9: Header descendants-override silent propagation to other reconstructed page Headers

**What goes wrong:** Plan 31-01 mutates the Section/Header component (G0wNOc) directly to ship 4-link nav, rather than applying descendants override at the Homepage instance ONLY. Result: every reconstructed page (FAQ b7Hgy / 404 csXky / Thank-you XsDab / Contact n0QqTd / Blog EDAf1 / Blog Post aQ8FL / Tag / Projects SCcln / Project s5k41l / Design system a0gRv) suddenly ships the Joel 4-link nav, breaking Phase 25 D-77 + Phase 26-30 carry-forward chain.

**Why it happens:** The natural Pencil mechanic for "change the Section/Header to show 4 links" is to mutate the component. But Phase 25 D-77 + Phase 26-30 chain + CONTEXT D-162 explicitly SCOPE the override to the Homepage instance.

**How to avoid:** Plan 31-01 spec uses `Insert(<homepagePageFrameId>, { type: "ref", refId: "G0wNOc", descendants: {...} })` — descendants attaches to the INSTANCE, not to G0wNOc itself. Phase 28 D-111 TagFilter active-pill override is the precedent — same descendants-on-ref mechanic.

**Warning signs:** Plan 31-01 spec includes `Update("G0wNOc", { ... 4 nav items ... })` — that mutates the component itself, propagating to all instances.

## Code Examples

Verified patterns from Phase 25-30 production. Source: Phase 30 Plan 30-01 + Phase 28 Plan 28-01 + Phase 26-27 plans.

### Page-frame creation with nodeId anchor (§ 10.4)

```javascript
// Plan 31-01 Task 2 — page frame chassis build
// Pre-flight: get_editor_state({ include_schema: false }) — assert design/Crito.pen

// Single batch_design call:
FindEmptySpace({
  width: 1440,
  height: 4000,  // estimate; fit_content at close
  direction: "right",
  padding: 80,
  nodeId: "a0gRv"  // Phase 30 Design system frame (page-frame row anchor)
})
// → returns position ≈ (32xxx, −4111.55)

Insert(document, {
  type: "frame",
  name: "Homepage",
  width: 1440,
  height: 4000,
  layout: "vertical",
  gap: 0,
  padding: 0,
  alignItems: "center",
  fill: "#ffffffff",  // literal per OPEN-23-13 (color-semantic-bg-page resolves to white)
  placeholder: true   // cleared at close
})
// → returns <homepageFrameId>
```

### Section/Header instance with 4-link nav descendants override (D-162, Path B example)

```javascript
// Plan 31-01 Task 3 — Header instance + sibling logo note
// (Assumes Plan 31-00 Task 1 probe identified nav-item child IDs.
//  Replace placeholders below with actual IDs from 31-00-SUMMARY.md.)

Insert(<homepageFrameId>, {
  type: "ref",
  refId: "G0wNOc",
  name: "Section/Header (Homepage instance)",
  descendants: {
    "<homeNavItemId>": { enabled: false },
    "<aboutNavItemId>": { enabled: false },
    // Hide "Services" slot; or REPLACE its text with "Projects" depending on probe outcome:
    "<servicesNavItemTextChildId>": { text: "Projects" }
    // (If Path B confirmed; if not, use Path C: descendants on nav container with children replacement)
  }
})
// → returns <headerInstanceId>

// Sibling Pencil note for logo deferral (D-163)
Insert(<homepageFrameId>, {
  type: "note",
  text: "v1.3 src/components/layout/Header.astro ships 'Joel Shinness' wordmark in logo slot (Bricolage Grotesque + uppercase + neobrutalist styling); code milestone wires Joel-brand wordmark + Joel-brand fonts at runtime. v2.0 .pen retains Crito-source logo placeholder per Phase 25 D-40 + PROJECT.md 'Joel-brand visual chrome — replaced when code milestones run on top of v2.0'.",
  width: 1200,
  height: 100
})
```

### Hero Secondary Button with white-stroke descendants override (D-157 + OPEN-25-01 RESOLUTION)

```javascript
// Plan 31-01 Task 4 — Hero section build
// (Plan 31-00 Task 2 probe identified hIWuC stroke-bearing node + label text-child IDs)

// Hero section frame
const heroSection = Insert(<homepageFrameId>, {
  type: "frame",
  name: "Hero",
  width: 1200,
  layout: "horizontal",  // OR "vertical" per Plan 31-00 Task 3 probe outcome (default Crito-source-evidenced)
  fill: "#141f39ff",  // color-semantic-bg-dark literal (Crito Hero dark-bg)
  padding: [80, 0],
  ...
})

// Hero content column with display headline + subtitle + dual CTA row
// (... headline, subtitle insertion ...)

// Dual CTA row
const ctaRow = Insert(<heroContentColumnId>, {
  type: "frame",
  name: "Hero CTA row",
  layout: "horizontal",
  gap: 20,
  ...
})

// Primary Button (Default)
Insert(<ctaRow>, {
  type: "ref",
  refId: "M7eUr",
  name: "Hero Primary CTA",
  descendants: {
    "<labelTextChildOfM7eUr>": { text: "Let's talk!" }
    // arrow-right via iconTrailing slot per Phase 25 D-44 pattern if Plan 31-01 plan-execution defaults yes:
    // "<iconTrailingSlotOfM7eUr>": { enabled: true }
    // + Insert child icon at path <primaryCtaInstance>/<iconTrailingSlot>
    // (verify Pencil 2.13 accepts this OR use descendants.<iconTrailingSlot>.children pattern per OPEN-30-07)
  }
})

// Secondary Button (white-stroke override per OPEN-25-01 + D-157)
Insert(<ctaRow>, {
  type: "ref",
  refId: "hIWuC",
  name: "Hero Secondary CTA (white-stroke override)",
  descendants: {
    // Replace placeholders with actual IDs from Plan 31-00 Task 2 probe:
    "<hIWuC stroke-bearing node — likely the frame itself or a direct child>": { stroke: "#ffffffff" },
    "<hIWuC label text-child id>": { fill: "#ffffffff", text: "See how I work" }
  }
})
```

### Compound/Card descendants override for Services card (D-158)

```javascript
// Plan 31-01 Task 5 — Services section build (3-up Card grid)

const servicesGrid = Insert(<servicesSectionId>, {
  type: "frame",
  name: "Services grid",
  layout: "horizontal",
  gap: 24,  // space-semantic-* (Pencil guideline § 12 — card grid 16-24)
  ...
})

// Card 1 (AI) — descendants override on 4 slots
Insert(<servicesGrid>, {
  type: "ref",
  refId: "t40xct",
  name: "Services Card — AI",
  descendants: {
    "FGdti": { enabled: true, fill: "#fafafaff" /* STUB image-fill rectangle */ },
    "vGH3A": { /* title-slot descendants — override text */ children: [
      { type: "text", text: "AI", fontFamily: "Plus Jakarta Sans", fontSize: 18, fontWeight: 700, fill: "#141f39ff" }
    ] },
    "oTSwn": { /* body-slot — verbatim v1.3 from Services.astro */ children: [
      { type: "text", text: "AI has a lot of promise, and a lot of hype. We find the best job for AI and the best way to use it—no AI slop or crazy API fees. AI will have a specific role, whether that's understanding unpredictable data, performing research, or building software that's safe and reliable.", fontFamily: "Inter", fontSize: 16, fill: "#141f39ff" }
    ] },
    "eNqxd": { /* footer-actions-slot — Secondary "Learn more" Button or text-link */ children: [
      { type: "ref", refId: "hIWuC", name: "Learn more (Secondary)", descendants: { "<hIWuC label>": { text: "Learn more" } } }
    ] }
  }
})

// Cards 2 (Automations) + 3 (Web Apps) follow same pattern with v1.3 verbatim content per D-158 + D-98
```

### Section/CTA closing-CTA instance (D-161, SECOND cross-phase consumer of Hs5rc)

```javascript
// Plan 31-01 Task 7 — closing CTA + sibling ContactSection deferral note

Insert(<homepageFrameId>, {
  type: "ref",
  refId: "Hs5rc",
  name: "Section/CTA closing (Homepage instance)",
  descendants: {
    // Hs5rc 3-slot signature: headline + body + actions (Phase 26 D-78)
    "<Hs5rc headline-slot id>": { /* descendants */ children: [
      { type: "text", text: "Ready to get started?", ... }  // v1.3 ContactSection or Hero CTA copy
    ] },
    "<Hs5rc body-slot id>": { children: [
      { type: "text", text: "Tell me about your project and I'll get back to you within 48 hours.", ... }  // v1.3 verbatim
    ] },
    "<Hs5rc actions-slot id>": { children: [
      { type: "ref", refId: "M7eUr", name: "Closing CTA — Let's talk", descendants: { "<M7eUr label>": { text: "Let's talk" } } }
    ] }
  }
})

// Sibling note documenting v1.3 ContactSection on-homepage architecture for code milestone (D-161)
Insert(<homepageFrameId>, {
  type: "note",
  text: "v1.3 src/components/homepage/ContactSection.astro ships full 8-field form on-homepage as #contact anchor section; code milestone decides whether to extract to /contact route (matching Phase 27 n0QqTd reconstructed Contact frame) OR keep as homepage section. v2.0 .pen ships marketing-close pattern only.",
  width: 1200,
  height: 100
})
```

### PAGE-11 LOCK action (§ 3.3 sub-section-raster sub-rule, post-APPROVE only per Pitfall 4)

```javascript
// Plan 31-01 Task close — APPROVE branch ONLY
// (Plan 31-00 Task 3 probe identified the ujMLJ Hero illustration node + its direct parent)

Insert(<heroIllustrationDirectParentId>, {
  type: "note",
  text: "LOCKED — cross-reference for Phase 31 Homepage Hero per D-155. CALIBRATION-PROTOCOL § 3.3 sub-section-raster sub-rule: raster stays enabled:true; Phase 31 Homepage Hero section (in top-level Homepage frame <homepageFrameId>) is the Crito-vocab reconstruction. Do not edit this raster — it is the visual pairing reference for Phase 31's APPROVE state.",
  width: 400,
  height: 100
})
// raster node itself UNTOUCHED — enabled stays true per § 3.3
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| § 3 crito-source-present whole-frame side-by-side | D-155 HYBRID joel-only-with-Hero-pairing-exception | Phase 31 (only consumer) | Resolves topology mismatch when Crito-source is editable but Joel-shape topology is chosen |
| `Insert(<refInstance>/<descendant>, ...)` | `descendants.<container>.children` replacement | Phase 30 Plan 30-01 OPEN-30-07 | All Phase 31 inline composition into ref instance subtrees uses the workaround |
| `enabled: false` PAGE-11 hide action | LOCK sibling note + raster stays enabled:true | CALIBRATION-PROTOCOL § 3.3 sub-section-raster sub-rule (codified Phase 26 Plan 26-03) | First v2.0 production use of LOCK is Phase 31 (all prior PAGE-11 ACTIVE uses were whole-page raster hide) |
| Two AskUserQuestion gates for branch-spanning calibration | Single gate carrying multiple artifacts | Phase 26 D-65 chain | CONTEXT D-155 + D-165 enforces single gate for HYBRID sub-branch |
| Set fixed `height` on page frame | `placeholder: true` during build → `placeholder: false, height: "fit_content"` at close | Plan 26-02 + 30-01 pattern | Phase 31 page frame uses fit_content at close per established precedent |

**Deprecated/outdated:**
- The original `Insert(<refInstance>/<descendant>, ...)` syntax for adding to ref-instance descendants — rejected by Pencil 2.13.
- The `mcp__pencil__export_nodes` tool for `.pen` files — broken per OPEN-23-01; not used by Phase 31. Calibration artifacts are inline-only.
- `search_all_unique_properties` tool — does not exist in current Pencil MCP build per OPEN-23-02; Phase 31 uses manual `batch_get` enumeration.

## Open Questions

Things that couldn't be fully resolved without Plan 31-00 probe execution:

1. **ujMLJ Hero subtree structural pattern (`0veF5 / Wx9kx / 7QsZc / HuBKK / LqPtn / ggx3v`)**
   - What we know: PEN-INVENTORY line 121 enumerates these 6 IDs as Hero subtree; line 129 mentions coral ellipse 286×225 as decorative shape; line 121 mentions Plus Jakarta Sans 70 + Inter 18; line 155-156 confirms PJS 70 for Hero headline; CONTEXT D-157 selects horizontal-or-vertical Crito-shape per probe outcome.
   - What's unclear: Which ID is the outer container vs content-column vs decorative-anchor column vs illustration node vs ellipse vs CTAs frame? Spacing values inside the subtree? Whether the Hero is horizontal-layout or vertical-stack at outer level?
   - Recommendation: Plan 31-00 Task 3 runs `batch_get(["ujMLJ"], readDepth: 3)` and documents the full subtree structure in 31-00-SUMMARY.md. CONTEXT Claude's Discretion sets vertical-stack OR horizontal-layout to plan-execution per probe; default Crito-source-evidenced.

2. **hIWuC stroke-bearing node + label text-child IDs**
   - What we know: hIWuC is the Phase 25 Plan 25-01 Secondary Button component with component-level navy stroke + navy Inter 16/600 label. PEN-INVENTORY OPEN-25-01 anticipates `{strokeId:{stroke:"#ffffffff"},labelId:{fill:"#ffffffff"}}` descendants override at Phase 31 Hero consumer.
   - What's unclear: Whether the stroke is a property of the hIWuC frame node itself (single-level override `hIWuC.stroke`) or carried by a child node (descendant-level override). Pencil 2.13 carries stroke at frame level typically, suggesting top-level.
   - Recommendation: Plan 31-00 Task 2 runs `batch_get(["hIWuC"], readDepth: 3)` and documents the actual override-target IDs. If the stroke is at the frame level, the override applies to `hIWuC` itself (which means the descendants map key is empty or absent and the override is at the ref instance level: `{ stroke: "#ffffffff" }` directly on the ref). If carried by a child, document the child ID for descendants override.

3. **Section/Header descendants-override mechanic — Path B or Path C?**
   - What we know: Phase 28 D-111 TagFilter active-pill override worked via descendants on a leaf property (text or fill). Phase 30 OPEN-30-07 blocks `Insert(<refInstance>/<descendantContainer>, ...)`. CONTEXT Claude's Discretion sets Path A (HIDE + INSERT new) or Path B (HIDE + REPLACE text) per probe.
   - What's unclear: Whether Pencil 2.13 supports per-child `enabled: false` + per-child `text` REPLACE simultaneously in one descendants map. Whether nav-item child IDs are addressable directly or require nested path.
   - Recommendation: Plan 31-00 Task 1 runs `batch_get(["G0wNOc"], readDepth: 3)` and ALSO runs a no-op probe of the descendants mechanic — try a `batch_get` returning the override-result hypothesis without mutation; document the path. If Path B is blocked, Plan 31-01 pivots to Path C (`descendants.<navContainer>.children`).

4. **Hero arrow-right iconTrailing slot wire-up**
   - What we know: Phase 25 D-44 wired arrow-right into Section/Header CTA iconTrailing slot via `{<iconTrailingSlotId>: {enabled: true}}` + child icon insertion at path. Phase 27 D-99 Thank-you Section/CTA continued the pattern. CONTEXT Claude's Discretion defaults to yes per the Phase 25 D-43 Header CTA + Phase 27 D-99 Thank-you precedent.
   - What's unclear: Whether child-icon insertion at path `<heroPrimaryCtaInstance>/<iconTrailingSlotId>` works given OPEN-30-07's restriction on inserting into ref descendants, OR whether the icon must be wired via `descendants.<iconTrailingSlotId>.children` replacement.
   - Recommendation: Plan 31-00 Task 0 or Plan 31-01 Task 4 attempts the Phase 25 D-44 path first (insert-at-path); on failure, pivot to descendants.children pattern. Document outcome.

5. **Hero illustration leaf node identification within ujMLJ subtree**
   - What we know: ujMLJ has 10 editable group children; Hero subtree contains the illustration. The illustration is the LOCK target per D-155 + § 3.3.
   - What's unclear: Whether the illustration is a single image-fill rectangle, a group of multiple raster fills, or contains both raster and editable vector elements.
   - Recommendation: Plan 31-00 Task 3 probe identifies the leaf illustration node + its direct parent for the LOCK note attachment per Pitfall 4.

## Validation Architecture (Nyquist Dimension 8)

Phase 31 is a `.pen` design phase — Dimension 8 validation maps to Pencil MCP structural + visual checks per CALIBRATION-PROTOCOL § 3.4 + § 4.4 + § 4.5. The planner translates these into task-level acceptance criteria.

### Per-task validation (Plan 31-00 + Plan 31-01)

| Dimension | Probe / Check | When |
|-----------|---------------|------|
| **Pre-flight active-editor (D-166)** | `get_editor_state({ include_schema: false })` returns `activeEditor.file == design/Crito.pen` | Before every `batch_design` mutation per Phase 23 OPEN-23-14 → 24 D-35 → 25 D-54 → 26 D-87 → 27 D-103 → 28 D-125 → 29 D-140 → 30 D-153 chain |
| **Baseline ID integrity** | `batch_get` on all 21 Phase 23-30 baseline component IDs (M7eUr, hIWuC, nwJk7, j0FxQZ, kJQmJ, EQaMf, yRvGb, u7NmaS, dpO5Y, t40xct, SW4cz, ZSxZU, DnsRs, G0wNOc, Xs0Hs, Hs5rc, N1jo3i, O1IwyS, etY5x, y4RORu, OLSa0, C8D21, qo5Vi, I45jZx) + 7 page frame IDs (csXky, b7Hgy, XsDab, n0QqTd, EDAf1, aQ8FL, SCcln, s5k41l, a0gRv) returns structurally UNCHANGED | Plan 31-00 Task 1 baseline + Plan 31-01 Task close regression |
| **Token surface drift** | `get_variables({})` returns 107 user-facing tokens at baseline + at close (default 0 net-new per D-164) | Plan 31-00 Task 1 + Plan 31-01 Task close |
| **Document-root layout integrity** | `snapshot_layout({ maxDepth: 0, problemsOnly: true })` returns `"No layout problems."` | Plan 31-01 Task close |
| **Page-frame layout** | `snapshot_layout({ parentId: <homepageFrameId>, problemsOnly: true })` — text-clipping false-positives on Hero display + Services/Process/About body documented as BENIGN per Pitfall 5 | Plan 31-01 Task close |
| **VALID-01 per-section fidelity labels (D-83)** | 7 labels proposed + APPROVED at gate: Header EXACT, Hero APPROXIMATE (with declared deviations), Services EXACT layout + STUB illustrations, Process EXACT layout + STUB illustrations, About EXACT layout + STUB headshot, closing-CTA EXACT, Footer EXACT | Plan 31-01 Task close calibration gate |
| **VALID-02 calibration artifact (D-155 HYBRID)** | (a) § 4.5 joel-only token-usage description for all 7 sections; (b) § 3.4 step 4 Hero side-by-side image pair (reconstructed Hero `get_screenshot` + ujMLJ Hero subtree `get_screenshot`). Both inline in a single AskUserQuestion description per OPEN-23-01 substitution. | Plan 31-01 Task close calibration gate |
| **VALID-03 gap declaration** | Any GAP outcome at gate → OPEN-31-NN flag added to PEN-INVENTORY per § 7 template. Anticipated OPEN-31 candidates: illustration STUB labeling (Services + Process), headshot STUB (About), Hero illustration STUB | Plan 31-01 Task close PEN-INVENTORY extension |
| **PAGE-11 status documentation** | ujMLJ Hero illustration LOCK note attached post-APPROVE; raster stays enabled:true per § 3.3 sub-section-raster sub-rule | Plan 31-01 Task close APPROVE branch |
| **OPEN flag closures** | OPEN-25-01 RESOLVED (Hero Secondary white-stroke override applied); OPEN-23-09 RESOLVED (Poppins not needed per v1.3 audit at Plan 31-00 Task 0); OPEN-23-04 LAST-VISIT (Home Page final per-page consumer) | Plan 31-01 Task close PEN-INVENTORY extension |
| **PEN-INVENTORY extensions (D-167)** | NEW `Homepage` frame row; UPDATE `Home Page` (ujMLJ) line 65 status_counts; Variant Evidence rows for Phase 31 bindings; OPEN-31-NN section | Plan 31-01 Task close |
| **Cross-page consistency proof (ROADMAP success criterion 3)** | Section/Header (G0wNOc) + Section/Footer (Xs0Hs) instanced at top + bottom of Homepage; descendants override SCOPED to Homepage instance only — base components unchanged across other reconstructed pages | Plan 31-01 Task close + calibration gate description includes consistency call-out per CONTEXT Claude's Discretion |

### Plan-close acceptance gates

| must_have | Plan 31-00 | Plan 31-01 |
|-----------|------------|------------|
| Pre-flight active-editor asserted | ✓ on every mutating task (NONE in 31-00 — probe-only) | ✓ on every mutating task |
| Token surface drift = 0 net-new (default per D-164) | ✓ no `set_variables` in 31-00 | ✓ `get_variables` returns 107 at close |
| Library count delta = 0 (default per D-164) | ✓ no `batch_design` Insert at library level | ✓ no library mutations |
| Baseline regression | ✓ `batch_get` confirms baseline intact after probe | ✓ `batch_get` confirms baseline intact at close |
| snapshot_layout document-root | (not required — no mutations) | ✓ returns `"No layout problems."` |
| Calibration gate at close | ✗ NONE per D-165 (foundation no-gate-at-close pattern) | ✓ single AskUserQuestion carrying both protocol artifacts |
| PAGE-11 action | (not applicable — no page-frame mutation) | ✓ LOCK sibling note attached AFTER user APPROVE only |
| PEN-INVENTORY extensions | ✓ Open Question outcomes documented in 31-00-SUMMARY.md (Path B/C decision, hIWuC override IDs, ujMLJ Hero subtree structure) | ✓ NEW Homepage row + UPDATE ujMLJ row + Variant Evidence + OPEN-31-NN + OPEN-25-01 RESOLVED + OPEN-23-09 RESOLVED |

### Cross-cutting validation (CONTEXT D-166 + D-167 + CALIBRATION-PROTOCOL § 8 carry-forward)

- Every mutating `batch_design` preceded by `get_editor_state` pre-flight assertion
- Every plan close updates PEN-INVENTORY per established extension pattern (Frames Inventory + Variant Evidence + OPEN flags)
- Single-file strategy preserved — Homepage frame at document root; library components untouched; tokens untouched
- Desktop-only (PAGE-09) — no mobile-breakpoint frames
- Gap declaration not gap filling (VALID-03) — any unresolved structural question becomes an OPEN-31-NN flag

## Sources

### Primary (HIGH confidence)

- `.planning/phases/31-homepage-reconstruction/31-CONTEXT.md` — D-155 through D-167 + Claude's Discretion + canonical refs (this is the prescriptive contract Phase 31 ships to)
- `.planning/research/CALIBRATION-PROTOCOL.md` — § 2 branch decision tree, § 3.3 PAGE-11 sub-section-raster sub-rule, § 3.4 crito-source per-step script, § 4 joel-only branch protocol, § 4.5 AskUserQuestion format, § 6.4 OPEN-26-02 stale-cache workaround tiering, § 10.4 FindEmptySpace nodeId anchor pattern
- `.planning/research/PEN-INVENTORY.md` — line 65 `Home Page` ujMLJ row, line 77 Phase 30 Design system a0gRv row (anchor target), line 121 Hero subtree IDs `0veF5 / Wx9kx / 7QsZc / HuBKK / LqPtn / ggx3v`, line 129 coral ellipse 286×225, lines 155-156 PJS 70 Hero headline, OPEN-23-04 / OPEN-23-09 / OPEN-25-01 / OPEN-25-07 / OPEN-30-07
- `.planning/phases/30-design-system-reference-reconstruction/30-01-SUMMARY.md` — OPEN-30-07 ref-instance composition pattern, FindEmptySpace nodeId anchor (s5k41l worked but drifted x), fit_content height pattern, Tier-2 fallback at calibration gate
- `.planning/phases/30-design-system-reference-reconstruction/30-00-SUMMARY.md` — foundation-no-gate pattern, library count 16→19, OPEN-30-04 + OPEN-30-05 + OPEN-30-07 discoveries
- `src/components/Hero.astro` (lines 1-130) — v1.3 Hero content extraction source: H1 lines 71-73 "Your business needs more than software, it needs..."; CTA "Let's talk!" line 80 + 117; subtitle "Ready to get started?" line 79 + 116; bento-grid layout NOT inherited per D-157
- `src/components/Services.astro` — v1.3 Services content: H2 "Solutions That Fit" line 37; 3 services AI/Automations/Web Apps with descriptions lines 11-30; "Discuss Your Project" Button line 63
- `src/components/Process.astro` — v1.3 Process content: H2 "How We Work Together" line 13; 5 steps Discovery Call / Prototype / Proposal / Building / Handoff & Support with 1-2-sentence bodies
- `src/components/About.astro` — v1.3 About content: H2 "About Me" line 9; 3 narrative paragraphs lines 42-52; credibility stats "15+ Years" + "200+ Students" lines 31-37
- `src/components/homepage/ContactSection.astro` — v1.3 ContactSection: 8-field form (Name/Email/Company/Challenges/Solutions/Budget/Timeline/Message); "Let's Talk" H2 line 17; 48-hour body line 22; Calendly link line 191
- `src/components/layout/Header.astro` — v1.3 Header: 4-link nav Blog/Projects/FAQ/Contact lines 14-25; "Joel Shinness" wordmark line 9

### Secondary (HIGH confidence — Phase 23-30 chain decisions)

- `.planning/phases/25-section-compound-components/25-CONTEXT.md` — D-38 Header nav override deferral, D-40 Joel-brand logo deferral, D-43 Secondary Button navy default + OPEN-25-01 carve-out, D-77 Section/Header no-override default
- `.planning/phases/26-faq-404-reconstruction-calibration-workflow-established/26-CONTEXT.md` — D-65 single calibration gate per plan, D-77 Section/Header no-override default, D-78 Section/CTA broad-scoping (Hs5rc), D-79 narrow-scoping precedent, D-83 per-section fidelity labels
- `.planning/phases/27-thank-you-contact-reconstruction/27-CONTEXT.md` — D-93 sibling-note belt-and-suspenders, D-98 v1.3 verbatim content extraction discipline, D-99 Section/SecondaryLink first consumer (Thank-you "Return to homepage")
- `.planning/phases/28-blog-reconstruction-index-post-tag-page/28-CONTEXT.md` — D-111 descendants override on Section/Header (TagFilter active-pill precedent), D-114 3-up Card grid (Phase 31 Services mirrors), D-116 narrow-scoping precedent
- `.planning/phases/29-projects-reconstruction-index-project-detail/29-CONTEXT.md` — D-129 Crito-shape Joel-content origin (Phase 31 D-156 adapts spirit), D-133 inline back-nav second consumer of Section/SecondaryLink, D-134 narrow-scoping precedent
- `.planning/research/STACK.md` — Pencil MCP tool catalogue
- `.planning/research/PITFALLS.md` — Pitfall 1 no inventing primitives, Pitfall 4 PAGE-11 NEVER hide raster before APPROVE, Pitfall 6 snapshot_layout text-clipping false-positive, Pitfall 7 no premature variants, Pitfall O5/O6 single-consumer anti-pattern

### Tertiary (HIGH confidence — supporting context)

- `.planning/ROADMAP.md` § Phase 31 — Depends on Phase 30, success criteria 1-4 with "highest scrutiny" in criterion 4
- `.planning/PROJECT.md` — v2.0 milestone goal, "Joel-brand visual chrome" Out-of-Scope, Key Decisions row "Homepage About section — single-page feel"
- `.planning/REQUIREMENTS.md` — PAGE-01 + PAGE-09 + PAGE-11 + VALID-01/-02/-03 for Phase 31
- `.planning/STATE.md` — Phase 30 COMPLETE, Phase 31 ready to plan, v2.0 at 80%

## Metadata

**Confidence breakdown:**

- D-155 HYBRID sub-branch operational details: HIGH — CONTEXT and CALIBRATION-PROTOCOL prescribe the mechanics; this research operationalizes them for the planner
- Section/Header descendants-override path (D-162): MEDIUM — Path B vs Path C decision deferred to Plan 31-00 Task 1 probe per CONTEXT Claude's Discretion; mechanic precedent (Phase 28 D-111 TagFilter) HIGH
- hIWuC white-stroke override (OPEN-25-01): MEDIUM — exact stroke-bearing node + label child IDs deferred to Plan 31-00 Task 2 probe; mechanic HIGH
- ujMLJ Hero subtree probe (D-157): MEDIUM — IDs enumerated by PEN-INVENTORY but per-ID role + spacing values deferred to Plan 31-00 Task 3 probe; structural pattern (PJS 70 + Inter 18 + dual CTAs + decorative shape) HIGH
- Inline composition over factoring (D-158/D-159/D-160 + Pitfall O5/O6): HIGH — narrow-scoping chain well-established
- Section/CTA Hs5rc SECOND cross-phase consumer (D-161): HIGH — Phase 27 Plan 27-01 Thank-you is the production precedent; mechanic identical
- Page-frame architecture + nodeId anchor (§ 10.4): HIGH — Plan 30-01 production-proven
- Token surface stability (D-164): HIGH — default 0 net-new tokens established by Phase 30 D-151 + Phase 27 D-91 chain
- snapshot_layout text-clipping false-positives (Pitfall 6): HIGH — Phase 24-30 chain precedent
- Validation Architecture (Dimension 8): HIGH — synthesis of CALIBRATION-PROTOCOL + Phase 26-30 production validation patterns

**Research date:** 2026-06-11
**Valid until:** Phase 31 close (estimated 1-2 days). Document is plan-execution-bound; Phase 32 sweep may evaluate D-155 HYBRID sub-branch protocol promotion.

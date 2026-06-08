---
phase: 28-blog-reconstruction-index-post-tag-page
plan: 00
status: complete
date: 2026-06-08
---

# Plan 28-00 Summary: Crito.pen Phase 28 Foundation (Prose Tokens + Section Components + Card Extension + Badge Variant)

Plan 28-00 is **autonomous** (no user-calibration gate per D-124 + D-86 carry-forward — foundation work is agent-deterministic). Ships 27 new tokens (100 → 127), 2 new Section components, 1 new Primitive variant, and 1 in-place Compound extension inside `design/Crito.pen` so Plans 28-01 (Blog Index), 28-02 (Blog Post — PRIMARY consumer), and 28-03 (Blog Tag) can compose them without inline markup or further token introduction.

## Pencil MCP Subagent-Tool-Inheritance Caveat

Executed INLINE by the main orchestrator per Phase 26 + 27 carry-forward (Pencil MCP tools unavailable to spawned `gsd-executor` subagents — agent's tool namespace is `Read, Write, Edit, Bash, Grep, Glob`, no `mcp__pencil__*`). Pre-flight discipline D-125 ensured active editor remained `design/Crito.pen` throughout. Note: Plan 28-00 was paused mid-Task-1 in a previous session per `28-00-RESUME.md` save-coordination caveat; resumed cleanly this session with Task 1 partial commit `e38fc97` as the launching baseline.

## Task 0: Pre-flight (read-only) — D-125 habit

- `mcp__pencil__get_editor_state({ include_schema: false })` confirmed active editor `design/Crito.pen` ✓ (executed in prior session per 28-00-RESUME.md; re-verified this session)
- `mcp__pencil__get_variables({})` returned exactly **100 tokens** at plan-open (Phase 27 baseline preserved); **111 tokens** at resume entry (Task 1 partial work persisted via commit e38fc97); **127 tokens** at plan close after Task 2
- `mcp__pencil__batch_get` confirmed all Phase 23-27 baseline IDs intact: avgor, g9oRa5, t67DU6, RpGbe, vGH3A, oTSwn, FGdti, eNqxd, M7eUr, hIWuC, t40xct, j0FxQZ, kI3bc, ATJK9, UbwMv
- Crito `.fig` consult per D-106 + D-107 + D-108: **FAIL** — `design/Consulting & Agency Website Template I Crito (Community).fig` does not exist; only `design/Alliatus – Mastermind Landing Page Template (Community).fig` is present. Recorded as OPEN-28-01. All prose token values shipped as interpolation defaults per Phase 26 OPEN-26-01 precedent (heading-2 interpolation default APPROVED at Plan 26-01 calibration gate is the precedent).
- Badge structure check confirmed D-119 + Focus 7 path: existing `Primitive / Badge` (j0FxQZ) is solid-fill cyan only — need to ship `Primitive / Badge / Outline` variant. Recorded as Task 6 requirement.

## Task 1: heading-3 + heading-4 + mono primitive (D-106 + D-108)

**Note:** Committed in prior session at `e38fc97` per 28-00-RESUME.md save-coordination protocol; this section documents what was shipped for archival purposes.

11 new tokens via `set_variables`:
- 2 NEW primitives: `type-primitive-size-20` (heading-4), `type-primitive-size-24` (heading-3)
- 1 NEW font primitive: `type-primitive-family-mono` = `'SF Mono', Menlo, Monaco, Consolas, monospace` per D-108 (system mono stack default since .fig not present)
- 4 NEW semantic aliases: `type-semantic-heading-3-{family,size,weight,lh}` = Plus Jakarta Sans 24/700/lh 1.4
- 4 NEW semantic aliases: `type-semantic-heading-4-{family,size,weight,lh}` = Plus Jakarta Sans 20/700/lh 1.4

Token surface 100 → 111. Interpolation defaults per OPEN-28-01 (.fig fallback). OPEN-23-10 PARTIAL RESOLUTION recorded (heading-5 / heading-6 remain — add only when a consumer surfaces the need per Pitfall 1).

## Task 2: Prose composite tokens (D-107 + D-108 + D-109)

16 new tokens via single `set_variables` batch:
- `type-semantic-prose-inline-code-{family,size,weight,lh}` = mono/14/400/lh 1.6 (D-108)
- `type-semantic-prose-code-block-{family,size,weight,lh}` = mono/14/400/lh 1.625 loose (D-108 — BONUS carve-out beyond OPEN-23-11 original scope)
- `type-semantic-prose-link-{family,size,weight,color}` = body/16/500/color text-accent (D-107 — color baked into token so links inherit brand-accent without per-instance override)
- `type-semantic-prose-list-{family,size,weight,lh}` = body/16/400/lh 1.625 loose (D-109)

Token surface 111 → 127. Verified via `get_variables({})`. Visual properties (link underline, list bullet style, inline-code bg + border + padding, code-block bg + padding + cornerRadius) deliberately NOT in token surface per established Phase 23-27 typography-only composite pattern — consumers wire them at instance time via descendants overrides. **OPEN-23-11 RESOLVED** (prose-link + prose-list + prose-inline-code shipped + bonus prose-code-block per D-108).

## Task 3: Compound/Card title-slot (vGH3A) extension per Focus 3 Path A

In-place mutation of existing Phase 25 baseline component (no breakage of Phase 27 sidebar Card consumer per T-28-04 mitigation):
- `Update(vGH3A, { layout: "vertical", gap: 4 })` — switched from default horizontal-fit_content to vertical-tight pairing
- `Insert(vGH3A, { type: "text", name: "metadata-caption", ... })` → new node `SoXch`
  - Content: `'DATE • READ TIME'` placeholder
  - Typography: `$type-semantic-body-sm-*` composite + `$color-semantic-text-secondary`
  - `enabled: true` default per D-53 (consumers override to false if metadata row not needed — Phase 27 sidebar Card consumer can set `{SoXch:{enabled:false}}` if visual collision surfaces)

Existing `kI3bc` title-text node preserved as first child unchanged. Layout switch is purely additive — Phase 25 + 27 sidebar Card consumers (which override `kI3bc.content`) continue to work.

## Task 4: Section / TagFilter component (D-115 broad-scoping + Focus 6 Sub-option A1 + D-117 + D-120)

NEW reusable component inside `_Components / Sections` (g9oRa5):
- `O1IwyS` = `Section / TagFilter` (reusable:true, vertical layout, gap 16, padding [32,0], width 1200, alignItems center)
- `iHWbI` = heading-slot (frame, slot:[], enabled:false default, vertical layout) — contains placeholder text `ggbXn` 'Browse by topic' using heading-2 token surface
- `CNqq9` = pills-row (frame, horizontal layout, gap 12, alignItems center, justifyContent center)
  - 10 paired-ref children per Focus 6 Sub-option A1 (5 positions × 2 refs each):
    - Position 1 (default-ACTIVE): `RxShj` (M7eUr ref, label "All Posts", cornerRadius 9999, enabled:true) + `z1aro` (hIWuC ref, label "All Posts", cornerRadius 9999, enabled:false)
    - Positions 2-5 (default-INACTIVE): each has M7eUr ref disabled + hIWuC ref enabled with labels `automation`, `small-business`, `productivity`, `ai`
    - All pills use cornerRadius 9999 instance-time override per D-120 (effective full-pill shape)
- `MGfOS` = sibling Pencil note documenting slot signature + paired-ref active-state mechanic + D-120 9999 rationale + OPEN-23-12 radius-semantic-pill candidate per D-52 belt-and-suspenders

**Active-state mechanic:** Consumers toggle `enabled` between the two refs at each position to switch which pill is active. Both refs hold the same label content so the toggle reads as a state-change, not a content-change. Pre-built shadows mean consumers can toggle without re-instantiating refs.

## Task 5: Section / RelatedPosts component (D-116 narrow-scoping + Focus 2 + D-114 + D-118)

NEW reusable component inside `_Components / Sections` (g9oRa5):
- `etY5x` = `Section / RelatedPosts` (reusable:true, vertical layout, gap 32, padding [32,0], width 1200, alignItems start)
- `W1edi` = heading-slot (frame, slot:[], enabled:true default, vertical layout, alignItems start) — contains heading text `uQJdO` 'Related posts' using heading-2 token surface
- `j9KOm` = cards-row (frame, slot:['t40xct'] TYPED per D-52 PREFERRED, horizontal layout, gap 24, alignItems start, width fill_container)
  - 3 Compound/Card refs (`HmMOm`, `mHWPU`, `olBLe`) using width:fill_container so cards distribute evenly per D-114 + D-118 default 3-card density
- `sUijx` = sibling Pencil note documenting slot signature + narrow-scope rationale + Card-ref 3-density default per D-52

**Narrow-scoping decision:** This component is for Blog Index + Blog Post consumers exclusively. Phase 29 Projects "related projects" needs different shape (different card style, different density) per Pitfall 1 — defer generalization until second consumer surfaces.

## Task 6: Primitive / Badge / Outline variant (D-119 + Focus 7)

NEW reusable variant inside `_Components / Primitives` (avgor):
- `kJQmJ` = `Primitive / Badge / Outline` (reusable:true, horizontal layout, alignItems center, justifyContent center, gap 8, padding [4,12])
  - fill `$color-semantic-bg-page` (white)
  - stroke `$color-semantic-border-default` (neutral-200)
  - strokeWidth 1, strokeAlignment inner (1-2px range per Focus 7; shipped 1 first per "ship-minimum-forward-variant" pattern)
  - cornerRadius `$radius-semantic-button` (10)
- `pENro` = Label text (Inter 14/500 #141f39ff lineHeight 1.5 — body-sm typography + weight-500 emphasis + text-primary navy on white)

Properties match Phase 24 Badge (j0FxQZ) baseline for layout + cornerRadius + padding + gap; only fill / stroke / strokeWidth / strokeAlignment + label color differ. Forward-state-only per Phase 24 D-22 + Hybrid library minimalism (no Outline/Hover or Outline/Focus until consumer surfaces need).

## Task 7: PEN-INVENTORY extension + plan-close sweep

- `mcp__pencil__snapshot_layout({ maxDepth: 0, problemsOnly: true })` returned `"No layout problems."` ✓
- `mcp__pencil__get_editor_state` confirmed reusable components count 22 → 25 (+3: kJQmJ Badge/Outline, O1IwyS TagFilter, etY5x RelatedPosts) ✓
- PEN-INVENTORY.md extended with NEW `## Token Extensions (Phase 28)` sub-section (10 token rows) + NEW `## Variant Evidence (Phase 28)` sub-section (17 evidence rows) + NEW `### Open Flags — Phase 28 (OPEN-28-NN)` section (OPEN-28-01 .fig not present) + OPEN-23-10 partial-resolution annotation (heading-3 + heading-4 shipped) + OPEN-23-11 RESOLVED annotation (prose tokens shipped + bonus code-block)

## OPEN flags raised

- OPEN-28-01 (source-attribution, notable): Crito .fig not present in `design/`; all Phase 28 prose token values shipped as interpolation defaults per OPEN-26-01 precedent. Verifier consumers Plans 28-01 / 28-02 / 28-03 at calibration gates.

## OPEN flags resolved/updated

- OPEN-23-10 → further-partial-resolution annotation (heading-3 + heading-4 shipped per D-106; heading-5/6 remain open pending consumer need)
- OPEN-23-11 → RESOLVED (prose-link + prose-list + prose-inline-code shipped + bonus prose-code-block per D-108)

## Token surface change

100 → 127 (+27 across Plan 28-00 Tasks 1 + 2 combined). 3 new primitives (`type-primitive-size-20` + `type-primitive-size-24` + `type-primitive-family-mono`) + 24 new semantic aliases (heading-3 + heading-4 + 4 prose composites at 4 vars each).

## Library count change

- `_Components / Primitives` (avgor): 15 → 16 reusable children (+1 Badge/Outline)
- `_Components / Compounds` (t67DU6): unchanged at 2 reusable children (Card extended in-place per Focus 3 Path A, not replaced)
- `_Components / Sections` (g9oRa5): 4 → 6 reusable children (+2: TagFilter, RelatedPosts)

## Baseline IDs intact

Verified via batch_get + post-mutation get_editor_state: avgor, g9oRa5, t67DU6, RpGbe, nwJk7, vGH3A (extended NOT replaced), oTSwn, FGdti, eNqxd, M7eUr, hIWuC, u7NmaS, G0wNOc, Xs0Hs, t40xct, Hs5rc, csXky, n0QqTd, j0FxQZ. Phase 26 + 27 ship-set unchanged.

## NO user calibration gate at plan close

Per D-124 + D-86 carry-forward — foundation plan is agent-deterministic. Mid-plan user gate would have fired ONLY if heading-3/-4 .fig consult had succeeded AND surfaced values materially different from interpolation defaults; .fig not present (OPEN-28-01) so interpolation defaults stood + no user gate needed.

## Next plans

- 28-01 (Blog Index Page) — broad-scoping consumer of TagFilter + Compound/Card (3-column grid)
- 28-02 (Blog Post Page) — PRIMARY validation consumer of heading-3/-4 + all 4 prose composites + RelatedPosts (at footer)
- 28-03 (Blog Tag Page) — consumer of TagFilter (with active tag pre-selected) + Compound/Card grid

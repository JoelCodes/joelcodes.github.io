# Phase 28 Research — Blog Reconstruction (Index + Post + Tag Page)

**Researched:** 2026-06-08
**Domain:** Pencil MCP `.pen`-file reconstruction — prose token surface + Section components + Card consumer-resolution + dual-branch calibration with PAGE-11 ACTIVE twice in one phase
**Confidence:** HIGH for carry-forward patterns (Phase 23–27 production-confirmed); HIGH for descendants-override mechanics (locked by Phase 25 D-52 + Phase 27 Plan 27-00 + 27-02 production); MEDIUM for prose-token interpolation defaults (Crito .fig confirmed unreadable per Plan 26-00 OPEN-26-01 — Phase 28 inherits the same fallback path); LOW for fenced-code-block native primitive (no prior consumer in v2.0 — Phase 28 is the first; expect text-frame composition).

## Summary

Phase 28 is the third per-page reconstruction phase and the largest foundation extension since Phase 23: it ships 7 new prose tokens (heading-3, heading-4, mono-primitive, inline-code, code-block, prose-link, prose-list), 2 new Section components (Section/TagFilter broad-scoping, Section/RelatedPosts narrow-scoping), and three new top-level page frames (`Blog`, `Blog Post`, `Tag`) that exercise 15 Compound/Card instances across 3 frames (resolving OPEN-25-07 at three concrete consumer sites). CONTEXT.md locks 22 decisions (D-105–D-126); the HOW is entirely about reusing carry-forward protocols rather than inventing new mechanics. Critical mechanics to validate at plan-execution time: (a) the Crito .fig fallback path is the same as Phase 26 (zipped binary unreadable → interpolation defaults + user gate if escalation needed); (b) descendants-override at Card instance time is **content+enabled only** based on Phase 27 Plan 27-02 production evidence — NOT net-new child insertion (D-111 needs a fallback path: either pre-create the caption child inside title-slot with `enabled:false` default, or use `body-slot` as the metadata holder); (c) PAGE-11 ACTIVE applies TWICE in one phase (DzqTm + w1m3x), each gated behind APPROVE — `Update({enabled:false})` NEVER fires before user gate per Pitfall 4; (d) `find_empty_space_on_canvas` nodeId-anchor chain works for all 3 page frames (28-01 anchors on n0QqTd; 28-02 anchors on 28-01 Blog frame; 28-03 anchors on 28-02 Blog Post frame); (e) get_screenshot stale-cache (OPEN-26-02) likely fires on all 3 new frames per Phase 26–27 precedent — Tier-1 (cross-row Update) and Tier-2 (user editor verification) workarounds available.

The planner's task is to translate D-105–D-126 into 4 plans (foundation → index → detail → tag) with these mechanics baked in; no new tools, no new protocols. The two HOW-questions that materially gate execution are the Card metadata-insertion mechanic (D-111) and the post-body fenced-code-block representation (D-108 + D-123).

## Focus 1: Crito .fig consult status + prose-token interpolation defaults

### Status: Crito .fig remains unreadable by executing agent (confirmed in production)

**Evidence (HIGH confidence):**
- Phase 26 Plan 26-00 Task 1 attempted Crito .fig consultation per Phase 23 D-04 fallback. Outcome: **zipped Figma binary unreadable by executing agent** (per Plan 26-00 SUMMARY line 21). User gate Option A selected — interpolation default. OPEN-26-01 raised, Phase 28 cited as verifier consumer.
- Phase 26 PEN-INVENTORY line 311 documents the OPEN-26-01 mechanic in full: heading-2 size 32 ships via new `type-primitive-size-32` primitive via interpolation between heading-1 (48) and body (16). Same mechanic available for heading-3 + heading-4.
- No Pencil 2.13 tool exists to unzip / parse / extract from a Figma binary; no new MCP tool has shipped since Phase 26.

### Phase 28 inherits this fallback path — interpolation defaults documented in CONTEXT.md

Per D-106 + D-107 + D-108, Plan 28-00 attempts a probe-first .fig consultation for prose-token values; failure outcome is interpolation defaults + user gate escalation per Phase 26 D-72 mechanic. Defaults from CONTEXT.md:

| Token | Default value | Source-evidence |
|---|---|---|
| `type-semantic-heading-3-size` | **24** (interpolation between heading-2 32 + body 16, biased toward heading-2) | D-106 — geometric/arithmetic midpoint of the two adjacent tiers; matches Crito agency-prose H3 visual rhythm in image-import-14.jpg blog raster |
| `type-semantic-heading-3-weight` | **700** | D-106 — matches heading-2 weight; Plus Jakarta Sans display family per Phase 23 (carry-forward from heading-1 + heading-2) |
| `type-semantic-heading-3-family` | `type-primitive-family-display` (Plus Jakarta Sans) | D-106 — Phase 23 + Phase 26 token-foundation chain |
| `type-semantic-heading-3-lh` | **1.4** (matches heading-1 + heading-2 lh-heading) | D-106 — Phase 23 lh primitive surface; consistent rhythm across heading hierarchy |
| `type-semantic-heading-4-size` | **20** (interpolation between heading-3 24 + body 16) | D-106 — future-proofing; sample MDX has no H4 consumer but a tutorial-style follow-up MDX likely will |
| `type-semantic-heading-4-weight` / `family` / `lh` | **700 / display / 1.4** | D-106 — mirrors heading-3 chain |
| `type-primitive-family-mono` | **`'SF Mono', Menlo, Monaco, Consolas, monospace`** (system mono stack) | D-108 — honest about not committing to a specific font face; agency raster typically doesn't depict code so no .fig source likely; matches PROJECT.md "code milestone wires real font" boundary |
| `type-semantic-prose-inline-code` | **mono family + body-sm size (14) + bg-surface-elevated + 1px border (neutral-200) + radius-card (4) + horizontal padding 4** | D-108 — chrome inferred from agency convention (inline-code reads as a "pill" against running prose); the syntax-highlight color is runtime concern per D-108 + astro-expressive-code |
| `type-semantic-prose-code-block` | **mono family + body-sm size (14) + bg-surface-elevated + 16px padding + radius-card + lh 1.6** | D-108 — block chrome from Pencil § 12 Spacing Reference + agency convention; lh 1.6 enables clear line distinction in fixed-width type |
| `type-semantic-prose-link` | **color-semantic-text-accent + underline-on-hover descriptor** | D-107 — accent-on-no-underline matches Crito agency register (dense prose); hover-underline doc'd via component-property descriptor per Phase 24 D-22 forward-state pattern |
| `type-semantic-prose-list` | **indent 24, item-gap 8, bullet-style disc, ordered-style decimal (single token, both list types)** | D-109 — Pencil § 12 "Inside lists" implicit + Phase 23 `space-semantic-stack-sm` (8) reuse for item-gap |

### Recommended Plan 28-00 .fig-consult flow

```
Step 1: Attempt Read on design/images/Consulting & Agency Website Template I Crito (Community).fig
  → expect: binary or zip header detected (Phase 26 outcome)

Step 2: If unreadable, no escalation needed — defaults above ship immediately (no AskUserQuestion gate by default per D-124)

Step 3: IF visual rendering at Plan 28-02 calibration looks wrong (e.g., heading-3 visually identical to heading-2):
  → Plan 28-02 REVISE iteration via Phase 26 D-72 mechanic (user gate)
  → Raise OPEN-28-NN per D-126

Step 4: Mid-plan user gate ONLY IF a token value is genuinely ambiguous AND the default position can't be justified
  → Per D-124 foundation-plan-no-gate exception; mid-plan gate is reserved for actual escalation
```

**Caveat (LOW confidence):** No Pencil 2.13 update has shipped that resolves the .fig-unreadable status. Phase 28 should NOT spend execution time re-attempting the .fig in elaborate ways (e.g., unzip + parse + extract); the Phase 26 outcome is dispositive.

## Focus 2: Pencil MCP slot-mechanics validation for new Section components

### Production-confirmed slot mechanics (HIGH confidence)

Phase 25 Plan 25-03 finalized the Pencil 2.13 slot model in production:

1. **Typed slots are suggestion-only, not enforcement** (per Phase 25 D-52 + Plan 25-03 Task 2). The schema `Frame.slot` field is `false | string[]` where the array entries are "IDs of recommended reusable child components." Pencil's picker uses the array to surface insertion suggestions but does NOT block other insertions. Phase 25 Card footer-actions-slot ships with `slot:['M7eUr','hIWuC']` + sibling note (belt-and-suspenders).

2. **Slot signature shape** (per Phase 25 D-49 production):
   - Outer frame: `type: 'frame'`, `slot: false | string[]`, `enabled: true | false`, layout/gap/padding/alignItems/width as needed
   - Default content as children (placeholders enabled-by-default per Phase 25 D-53)
   - Sibling Pencil note documenting slot signature in human-readable form (belt-and-suspenders per D-52)

3. **Slot disabled at instance time** via descendants override: `descendants: { '<slot-id>': { enabled: false } }` (per Phase 27 Plan 27-02 Sidebar Card production: `{FGdti: {enabled: false}}` to disable image-slot).

### Phase 28 Section/TagFilter slot signature (broad-scoping per D-115)

```
Section / TagFilter (NEW reusable inside _Components/Sections g9oRa5)
├── heading-slot: { type: 'frame', slot: [], enabled: false (default), layout: 'horizontal', alignItems: 'center' }
│     └── (empty default — Blog index + Tag page both have their own page-intro headings above the strip)
└── pills-row: { type: 'frame', slot: ['M7eUr', 'hIWuC'] (TYPED suggestion per D-52), enabled: true, layout: 'horizontal', gap: 12, alignItems: 'center' }
      ├── pill-1: ref M7eUr (Button/Default, active default — placeholder "All Posts")
      ├── pill-2: ref hIWuC (Button/Secondary, inactive default — placeholder "automation")
      ├── pill-3: ref hIWuC (placeholder "small-business")
      ├── pill-4: ref hIWuC (placeholder "productivity")
      └── pill-5: ref hIWuC (placeholder "ai")
└── (sibling Pencil note in g9oRa5 documenting slot signature + active-state mechanic per D-117)
```

**Sibling note text (verbatim convention per D-52):**
> "Section/TagFilter — 2 slots: heading-slot (enabled:false default; instance enable + content if page needs section heading), pills-row (horizontal row of Button refs; pill-1 defaults to Button/Default (active), pills 2-N default to Button/Secondary (inactive); instance overrides via descendants to change which pill is active + change content + override cornerRadius to 9999 per D-120). Phase 24 Button refs: M7eUr (Default), hIWuC (Secondary)."

### Phase 28 Section/RelatedPosts slot signature (narrow-scoping per D-116)

```
Section / RelatedPosts (NEW reusable inside _Components/Sections g9oRa5)
├── heading-slot: { type: 'frame', slot: [], enabled: true (default per D-53), layout: 'horizontal', alignItems: 'center' }
│     └── heading text node: "Related posts" (heading-2 token surface — Phase 26 D-72)
└── cards-row: { type: 'frame', slot: ['t40xct'] (TYPED suggestion per D-52), enabled: true, layout: 'horizontal', gap: 24, alignItems: 'start' }
      ├── card-1: ref t40xct (Compound/Card default placeholder)
      ├── card-2: ref t40xct
      └── card-3: ref t40xct
└── (sibling Pencil note documenting slot signature + 3-card density per D-114)
```

**Sibling note text (verbatim convention per D-52):**
> "Section/RelatedPosts — 2 slots: heading-slot (default 'Related posts'; instance override content if needed), cards-row (horizontal row of 3 Compound/Card refs; instances override per D-111 + D-112 + D-113 Card-consumer pattern). Phase 25 Card ref: t40xct."

### Landmines for Phase 28 plan-execution

| Landmine | Mitigation |
|---|---|
| Pencil picker discoverability requires `slot: [ids]` array, but Phase 25 finding shows it doesn't enforce — picker will still allow other inserts | Ship typed-suggestion + sibling note (D-52 PREFERRED). Don't rely on picker to prevent wrong inserts. |
| Heading-slot `enabled: false` default may cause Pencil layout/render quirks | Mitigation: pre-create heading text node inside slot, set slot `enabled: false`. Phase 27 Plan 27-00 used this exact pattern for Input optional-text qzrSZ. |
| `alignItems: baseline` not supported in Pencil 2.13 schema (per Phase 27 OPEN-27-02) | Use `alignItems: 'center'` for horizontal pill rows; `alignItems: 'start'` for vertical heading+cards layout. |
| Sibling note must be in `g9oRa5` (NOT inside the new Section component frame) | Per Phase 25 D-52 + Plan 26-00 Section/CTA pattern — sibling notes sit in the library parent at canvas-y next to the component. |
| Cross-row Update during stale-cache workaround may shuffle library parent children | Tier-1 workaround per § 6.4: apply to PAGE FRAMES only, not library frames. Don't shuffle g9oRa5 children to clear cache. |

## Focus 3: Compound/Card descendants override for metadata insertion

### Critical finding: descendants override is content+enabled only, NOT net-new child insertion (HIGH confidence)

**Production evidence (HIGH confidence — Phase 27 Plan 27-02 Sidebar Card):**

```
descendants: {
  FGdti: { enabled: false },                                  // toggle slot
  kI3bc: { content: "Ready to chat?" },                       // replace existing text
  ASA0X: { content: "Schedule a discovery call..." },         // replace existing text
  "k20bt/ATJK9": { content: "Book a Call" }                   // nested-ref path content
}
```

All descendants override targets resolve to **pre-existing** child node IDs. The override map cannot insert a brand-new sibling child at instance time — there is no "type: 'text'" or schema-creation key in the descendants override (per Phase 27 RESEARCH Tertiary source line 1130: "Pencil's descendants override insert-vs-toggle mechanic for adding NEW children at instance time — UNKNOWN, safer to design label-slot with all 3 children pre-created with enabled defaults").

**Phase 27's solution was to pre-create all variant children inside the slot with default `enabled` values, then toggle enabled at instance time** (e.g., Phase 27 Plan 27-00 label-slot has 3 children — label-text + required-mark + optional-text — pre-created; Required Input variant overrides `required-mark.enabled: true`).

### D-111 implication: Card title-slot needs a metadata caption pre-created

**D-111 reads: "Phase 28 BlogCard instances override Compound/Card title-slot via descendants to insert a sibling caption-tier text node below the title text."**

**INSERTING is not supported.** The planner needs one of two fallback paths:

#### Path A (RECOMMENDED): Extend title-slot in Plan 28-00 to pre-create the metadata caption child

Add to `Compound / Card` `title-slot` (vGH3A) at Plan 28-00 Task time:
1. Title text node (existing — `kI3bc`, default "Card title", Plus Jakarta Sans 18/700)
2. **NEW caption text node** (e.g., `xxxxxx`, default "JAN 27, 2026 • 5 MIN READ", body-sm or caption typography + `color-semantic-text-secondary` + `enabled: true (default)`)

Make title-slot layout `vertical` + gap `4` so the two text nodes stack.

At Card instance time:
- Override `kI3bc.content` to set title text (existing pattern)
- Override `<new-caption-id>.content` to set metadata text (new pattern, follows same content-replacement mechanism)

**This is the Phase 27 label-slot pattern applied to Card title-slot.** Forward-compat: future Card consumers that don't need metadata can override `<new-caption-id>.enabled: false`.

**Pattern is Phase 23 D-22 forward-state-only-on-real-consumer compliant** because Plan 28-01 + 28-02 + 28-03 are real consumers (15 Card instances across 3 frames).

#### Path B (FALLBACK): Use body-slot for metadata

If Path A surfaces unexpected issues at execution (e.g., title-slot layout becomes brittle, or vertical inside title-slot clashes with existing kI3bc width handling), fall back to:
- Title text in title-slot (no change)
- Metadata caption text in body-slot (oTSwn) — first child position, with line-height/spacing tuned
- Excerpt text in body-slot — second child position (NEW pre-created)

**Tradeoff:** body-slot composition becomes "caption + excerpt" rather than "just excerpt". Less clean than Path A.

**Recommendation for Plan 28-00:** Choose Path A (extend title-slot). Document the title-slot extension as a Phase 28 Variant Evidence row per D-126. This locks the Card consumer-resolution at a more honest place (title metadata IS conceptually titley, not bodyy).

### Critical: title-slot is currently a single text node, NOT a frame

**Phase 25 audit-trail (PEN-INVENTORY line 414):** title-slot `vGH3A` is a **frame** with `slot: []`, `enabled: true`, containing a single text-node child `kI3bc` ("Card title"). The slot is already a frame ready to accept multiple children.

**Plan 28-00 Task action for title-slot extension:**
```javascript
// In batch_design ops string:
Update("vGH3A", { layout: "vertical", gap: 4 })  // make slot stack children
Insert("vGH3A", { type: "text", name: "metadata-caption", content: "DATE • READ TIME",
                  fontFamily: "Inter", fontSize: 14, fontWeight: "normal",
                  fill: "#52525bff", lineHeight: 1.625, textGrowth: "fixed-width",
                  width: "fill_container", enabled: true })
```
(Literal hex per OPEN-23-13; PEN-INVENTORY Variant Evidence row binds `#52525bff` → `color-semantic-text-secondary`, fontFamily → `type-primitive-family-body`, fontSize 14 → `type-primitive-size-14` / `type-semantic-body-sm-size`.)

## Focus 4: PAGE-11 ACTIVE — DzqTm + w1m3x image-import-NN.jpg index identification

### Probe pattern (HIGH confidence — Phase 27 Plan 27-02 Task 0 precedent)

Phase 27 Plan 27-02 Task 0 probed `cl8tt` via:
```
batch_get(['cl8tt'], readDepth: 2)
  → returned: fill.url = "images/image-import-18.jpg"
  → recorded: design/images/image-import-18.jpg
```

Phase 28 plans 28-01 + 28-02 inherit this Task 0 probe pattern.

### Expected probe outcomes (MEDIUM confidence — based on Phase 25 raster-probe Variant Evidence)

| Phase 28 plan | Probe target | Expected image-import-NN.jpg | Source evidence |
|---|---|---|---|
| **Plan 28-01** | `DzqTm` (07_Blog) | **image-import-14.jpg** (likely) | Phase 25 D-49 + PEN-INVENTORY line 303 + line 333: Plan 25-03 Task 1 raster-probed `image-import-14.jpg` for Blog cards — same source frame logically maps to DzqTm Blog index |
| **Plan 28-02** | `w1m3x` (08_Blog Details) | UNKNOWN — probe-first required | No Phase 25 inventory row cites a specific image-import-NN.jpg for Blog Details (Card probe was for Blog INDEX raster, not detail). Plan 28-02 Task 0 probes via batch_get(['w1m3x'], readDepth: 2). Best guess: image-import-13.jpg or image-import-15.jpg (sequential to Blog index 14) — but **do not assume**; probe is authoritative. |

**Critical (Pitfall 4 enforcement):**
- Plan 28-01 Task 0: `batch_get(['DzqTm'], readDepth: 2)` → record image-import-NN.jpg → use as side-by-side calibration target identifier ONLY → defer `Update({enabled:false})` to post-APPROVE step
- Plan 28-02 Task 0: same pattern with `w1m3x`
- **NEVER call `Update(DzqTm, { enabled: false })` OR `Update(w1m3x, { enabled: false })` before user APPROVE at the calibration gate.** First production use of PAGE-11 ACTIVE multiply in one phase; carry-forward Phase 27 Plan 27-02 step ordering verbatim.

### Description identifier convention (CALIBRATION-PROTOCOL § 3.5)

- Plan 28-01: `28-blog-{section}--side-by-side.png` (paired with `design/images/image-import-NN.jpg` from Task 0 probe)
  - Sections likely: `page-intro`, `tag-filter`, `card-grid`, `full-page`
- Plan 28-02: `28-blog-post-{section}--side-by-side.png` (paired with `design/images/image-import-NN.jpg` from Task 0 probe)
  - Sections likely: `post-header`, `post-body`, `related-posts`, `full-page`

### Sequence of events (Plan 28-01; same for 28-02)

```
Task 0: Pre-flight + probe DzqTm raster image-import-NN.jpg (read-only)
Task 1-N: Construct Blog frame + content (no DzqTm mutation)
Task N+1: snapshot_layout + get_screenshot
Task N+2: AskUserQuestion calibration gate per § 3.4 step 5 (crito-source format)
Task N+3: ONLY ON APPROVE → Update(DzqTm, { enabled: false }) per § 3.4 step 7 + § 3.3
Task N+4: PEN-INVENTORY extension (status_counts flat:1 → hidden:1; OPEN-23-05 partial-resolution)
```

## Focus 5: Prose-token validation — how Pencil represents fenced code blocks

### Finding: Pencil has NO native fenced-code-block primitive (HIGH confidence)

**Evidence:**
- Pencil 2.13 schema vocabulary (per PEN-INVENTORY line 12 + Pencil guidelines): `frame, group, rectangle, ellipse, polygon, path, text, line, note, icon, script, ref`. No `code` or `code-block` schema type.
- Pencil 2.13 guidelines list common component patterns (Button, Input, Card, Sidebar, Table, Alert, Modal) — no Code or CodeBlock pattern listed.
- No Phase 23–27 work-in-canvas surfaced a code-block primitive need.
- Pencil is a static design tool — syntax-highlighting is inherently runtime (token classification + color application at render time). astro-expressive-code handles this at code-milestone time per D-108.

### Recommendation: Plan 28-02 ships code block as a styled text-frame composition

**Architecture (matches D-108 prose-code-block token chrome):**

```
post-body code-block instance (Plan 28-02 Task — post body section):
├── frame: { type: 'frame', name: 'code-block', layout: 'vertical', gap: 0, padding: 16,
│           fill: '#f2f2f7ff' (color-semantic-bg-surface-elevated),
│           cornerRadius: 10 (radius-semantic-card),
│           width: 'fill_container' }
└── text: { type: 'text', name: 'code-block-text',
            content: '// Pseudo-code for invoice automation\nconst overdueInvoices = invoices.filter(\n  inv => inv.dueDate < today && !inv.paid\n);\n\noverdueInvoices.forEach(invoice => {\n  sendReminderEmail(invoice.customer);\n  logActivity(`Reminder sent to ${invoice.customer.name}`);\n});',
            fontFamily: "'SF Mono', Menlo, Monaco, Consolas, monospace" (type-primitive-family-mono),
            fontSize: 14 (type-primitive-size-14),
            fontWeight: 'normal',
            fill: '#141f39ff' (color-semantic-text-primary),
            lineHeight: 1.6 (type-primitive-lh-body),
            textGrowth: 'fill_height',
            width: 'fill_container' }
```

**Key choices:**
- **No syntax highlighting in static design** — single uniform text fill matches D-108 + D-92 (static design = READING state); astro-expressive-code wires actual syntax-highlight colors at runtime
- **Use `\n` literal in content** — Pencil text nodes render `\n` as line breaks in fixed-width mono
- **lh 1.6** matches D-108 prose-code-block token surface
- **No copy-to-clipboard button, no language label** — per CONTEXT.md Deferred Ideas: "Embedded code-block copy-to-clipboard button — runtime interaction"

### Inline-code representation (HIGH confidence — same pattern as code-block, simpler)

**Inline-code mid-paragraph (e.g., `Backticks within sentence`):**

Pencil text nodes don't support per-character font runs by default (one text node = one fontFamily/size/etc.). For inline code WITHIN a paragraph, Plan 28-02 has two options:

**Option A (PREFERRED — clean): split paragraph into multiple text nodes inside a horizontal-wrap frame**
- Frame `inline-code-paragraph`: `layout: 'horizontal'`, `wrap: true (if Pencil 2.13 supports)`, `alignItems: 'baseline'` (or `'center'` per OPEN-27-02 — Pencil 2.13 schema lacks baseline)
- Text 1: "I love ", body family
- Text 2 (the inline-code): "console.log()", mono family + surface-elevated bg + 1px border + 4px h-pad + radius 4 (matches D-108 inline-code token)
- Text 3: " for debugging.", body family

**Option B (FALLBACK if horizontal-wrap is brittle): single text node with no inline-code chrome, document via sibling note**
- Plain paragraph text with inline backticks visible (e.g., "I love `console.log()` for debugging.")
- Sibling Pencil note documents: "Inline code styling per type-semantic-prose-inline-code token; static design depicts plain text with backticks for legibility; code milestone wires actual styled spans."

### Recommendation for Plan 28-02 post body section

Use Option A for inline-code (it's the more honest depiction). Use the text-frame composition above for fenced code blocks. **Lock these mechanics in Plan 28-02 RESEARCH-derived task scaffolding** so the executing agent doesn't re-derive at plan-time.

**Document both as Variant Evidence rows in PEN-INVENTORY per D-126:**
- `Blog Post / post-body / code-block-instance` row → binds frame literals to inline-code + prose-code-block tokens
- `Blog Post / post-body / inline-code-paragraph` row → binds horizontal-wrap frame + 3 text nodes to inline-code token

### Other prose-token sample-MDX consumers (mapping)

| MDX construct (line) | Phase 28 prose token | Pencil representation |
|---|---|---|
| `# Getting Started with Business Automation` (line 10) | heading-1 (Phase 23) | text node, display family 48/700 |
| `## Why Automate?` / `## Start Simple` / `## What's Next?` (lines 14, 23, 49) | heading-2 (Phase 26) | text node, display family 32/700 |
| `### Example: Invoice Follow-ups` (line 31) | heading-3 (D-106 NEW) | text node, display family 24/700 |
| Paragraph runs (lines 11, 15, 25, 33, 47) | prose-paragraph (Phase 23 provisional → D-110 verified) | text node, body family 16/normal lh 1.6 |
| Unordered list `- **Email responses**...` (lines 18-21) | prose-list (D-109 NEW) | frame layout:vertical + 4 text nodes with disc bullet prefix |
| Numbered list `1. Happens frequently` (lines 27-29) | prose-list (D-109 NEW) | frame layout:vertical + 3 text nodes with "1. " "2. " "3. " number prefix |
| Inline `` `code` `` (line 26 + others) | prose-inline-code (D-108 NEW) | horizontal-wrap frame per Focus 5 Option A |
| Fenced JavaScript code block (lines 35-45) | prose-code-block (D-108 NEW) | frame + text node per Focus 5 |
| Italic `*Have a process...*` (line 59) | prose-paragraph italic (Phase 23) | text node, body family italic style |
| Link `[Get in touch](/contact)` (line 59) | prose-link (D-107 NEW) | text node fragment, accent fill (no underline static) |
| Horizontal rule `---` (line 57) | NO TOKEN (per CONTEXT.md Deferred) | line node, 1px, color-semantic-border-divider, 24px vertical margin |

**Plan 28-02 Task scaffolding tip:** Build the post body section as a single vertical-layout frame with all these children in MDX order. Each child binds tokens per the table above. PEN-INVENTORY Variant Evidence rows per child or per prose-token-class (whichever is more economical).

## Focus 6: TagFilter active-state mechanic — descendants override or enabled:true/false?

### Finding: Pencil 2.13 descendants override CANNOT change a child's `ref` (HIGH confidence)

**Evidence:**
- Phase 25 Plan 25-03 Card uses `k20bt` as a Button ref (`ref: M7eUr` + descendants override for content). The `ref` field itself is fixed at Card-component-build-time; descendants override only modifies content+enabled+other-property values on the resolved instance.
- Phase 27 Plan 27-02 Sidebar Card descendants override modified `k20bt/ATJK9` (Button label content), but did NOT change `k20bt`'s ref to a different Button variant.
- Schema 2.13 (per PEN-INVENTORY line 12): `ref` nodes have a single `ref: <id>` field; no descendants-override mechanic exists for swapping refs.

### D-117 implication: TagFilter cannot toggle active/inactive by swapping ref M7eUr ↔ hIWuC at instance time

**The TagFilter pills must use a different mechanic to express active vs inactive states.**

### Recommended mechanic (HIGH confidence — Phase 24 D-22 + Phase 25 D-49 forward-state pattern)

**Option A (PREFERRED): Each pill is a pre-created ref with a hard-coded variant; instance time toggles via WHICH pill is the "active" one**

Concrete design:
- TagFilter pills-row contains N pre-created refs (e.g., 5 pills for Blog index)
- Pill-1: `ref: M7eUr` (Button/Default — solid fill, active visual)
- Pill-2 through Pill-5: `ref: hIWuC` (Button/Secondary — outline, inactive visual)

**Blog index instance time:** No descendants override needed — Pill-1 is "All Posts" + active, others are tag labels + inactive. The TagFilter ships pre-configured for the Blog index use case.

**Tag page instance time** (e.g., "automation" tag is active): The TagFilter component as-is has Pill-1 (M7eUr) at the "All Posts" position. For Tag page, the planner needs to:

**Sub-option A1 (RECOMMENDED): Build TagFilter with two `enabled`-swappable pills per position**

Each pills-row slot contains pairs of pre-created Button refs:
```
pills-row (cards-style — but with paired refs):
├── pill-1-active: ref M7eUr (enabled: true, label "All Posts")
├── pill-1-inactive: ref hIWuC (enabled: false, label "All Posts")
├── pill-2-active: ref M7eUr (enabled: false, label "automation")
├── pill-2-inactive: ref hIWuC (enabled: true, label "automation")
├── ... pattern continues for each pill
```

Instance time: descendants override toggles enabled per pair. For Tag page "automation": flip pill-1-active.enabled:false + pill-1-inactive.enabled:true + pill-2-active.enabled:true + pill-2-inactive.enabled:false.

**Tradeoff:** Doubles the component child count (10 pills physical, 5 visible). Honest but verbose.

**Sub-option A2 (FALLBACK — simpler but slightly less clean): Build TagFilter with all pills using inactive ref hIWuC; instance time uses descendants to override Button content + appearance**

But descendants can't change `ref` from hIWuC to M7eUr; this fails.

**Sub-option A3 (ALTERNATIVE — accept consumer-time override responsibility): Build TagFilter pills as direct frame compositions (NOT Button refs), with descendants override changing fill / stroke / text content**

Frame-based pill: outer frame `cornerRadius: 9999`, fill `#38da71ff` (active green/accent) or `transparent` (inactive outline), stroke `1px secondary-accent` (inactive only), text content overridable.

**Tradeoff:** Doesn't reuse Button primitive directly. Violates Hybrid library D-89 minimalism slightly. But each pill is fully overridable at instance time without ref-swap.

### Recommended path for Plan 28-00 plan-execution

**Use Sub-option A1 (paired pre-created refs).** Reasons:
1. Honors D-119 "instances Phase 24 Button/Default + Button/Secondary"
2. Matches Phase 24 D-22 forward-state-only-on-real-consumer compliance (each pre-created ref is a real consumer)
3. Same mechanic Phase 27 Plan 27-00 used for Input label-slot (3 children pre-created with default enabled, instances toggle)
4. Verbose but predictable — execution agent doesn't need to derive a creative override at plan-execution

**Document mechanic in sibling note + Variant Evidence row per D-126.**

### D-120 cornerRadius override at instance time

Per Phase 25 Plan 25-03 production: instance-time descendants override CAN modify cornerRadius on a ref (verified by Card k20bt instance receiving content override but inheriting Button cornerRadius 10). The override path:
```
descendants: { "<pill-id>": { cornerRadius: 9999 } }
```

This works for Sub-option A1 (override cornerRadius on each active/inactive pill ref individually) and is the recommended path. If 9999 reads visually hacky at calibration, raise OPEN-28-NN per D-120 default-position + add `radius-semantic-pill` token (resolves OPEN-23-12).

## Focus 7: Badge variant evaluation for Phase 28 consumers

### Phase 24 Badge surface (HIGH confidence — production audit-trail)

**Current Badge state (per Phase 24 Plan 24-03 SUMMARY + PEN-INVENTORY):**
- ID: `j0FxQZ` (note: Phase 24 SUMMARY line 62 cites this id; CONTEXT line 168 has "TBD from Phase 24" — production confirms `j0FxQZ`)
- Variants: **single Primitive/Badge component (no variants per D-34 Case I)**
- Visual: layout horizontal, gap 8, padding [4, 12], fill `#15bee3ff` (brand cyan), cornerRadius 10 (`radius-semantic-button` per D-32 Case B reuse), label child `xSve5` (Inter 14/500 white)
- **No outline variant exists**

### D-119 visual requirements for Phase 28 Badge consumers

| Consumer | D-119 requirement | Current Badge state | Variant needed? |
|---|---|---|---|
| Card tags (footer-actions-slot per D-112) | "outline-with-subtle-bg style" | Solid cyan fill | **YES** — needs outline variant (or new outline-bg-tinted style) |
| Post-detail tag row (per D-121) | "weak-navigation affordance — border + light bg, smaller than the filter strip" | Solid cyan fill | **YES** — same outline variant |

### Recommended path: ship `Primitive / Badge / Outline` variant in Plan 28-00

**Per D-119 plan-execution evaluation:** Phase 28 should ship a Badge/Outline variant because **both** Card tags and post-detail tags need it (two real consumers).

**Badge/Outline spec (RECOMMENDED based on v1.3 BlogCard.astro line 72 + [slug].astro line 72):**
- ID candidate: TBD at Plan 28-00 Task (sibling to j0FxQZ inside avgor)
- Visual: layout horizontal, gap 8, padding [4, 12] (same as Default), **fill `color-semantic-bg-page` (white) or accent-tinted-10%-alpha** (matching v1.3 turquoise/10), **stroke 1-2px `color-semantic-border-accent`** (matching v1.3 border-turquoise/50), cornerRadius 10 (or 9999 for fully-pill if D-120 token added)
- Label child: Inter 14/500 `color-semantic-text-primary` (NOT white, since fill is light)

**Pattern matches Phase 24 D-22 forward-state-only-on-real-consumer** — both consumers are immediate (Card tags + post-detail tags = 5+ Card instances × 3 tags each ≈ 15 Badge/Outline consumers at Plan 28-01; another ~3-4 at Plan 28-02).

### Alternative considered + rejected: descendants override at consumer site

**Why NOT use descendants to override the solid Badge fill at instance time:**
- Visual identity of "decorative tag chip" is a primary brand element across Card tags AND post-detail tags
- Per-consumer override would mean ~20+ instances duplicating the same descendants map
- Creating Badge/Outline as a variant is more honest (the visual IS a distinct state)
- Phase 24 D-22 forward-state-only specifically allows variants when real consumers justify

### Phase 24 Badge ID confirmation needed

Plan 28-00 Task 0 should `batch_get(['avgor'], readDepth: 2)` to confirm Badge ID. **Strong evidence the ID is `j0FxQZ`** (Plan 24-03 SUMMARY line 62 + line 66 explicitly). If different, the planner should use the actual ID from probe.

## Focus 8: stale-cache get_screenshot quirk — Tier-1/Tier-2 workarounds carry forward

### Status: OPEN-26-02 remains open in production (HIGH confidence)

**Carry-forward evidence:**
- Phase 26 Plan 26-01 (FAQ): Tier-1 worked (cross-row Update cleared cache)
- Phase 26 Plan 26-02 (404): Tier-1 FAILED, Tier-2 (user-editor verification) was the fallback
- Phase 27 Plan 27-01 (Thank-you): Quirk likely hit (per Phase 27 RESEARCH carry-forward); Tier-1/Tier-2 inheritance available
- Phase 27 Plan 27-02 (Contact): Same; PAGE-11 ACTIVE workflow proceeded via Tier-2 fallback path
- **No Pencil 2.13 update has shipped resolving this quirk** between Phase 26 and Phase 28
- CALIBRATION-PROTOCOL § 6.4 codifies both workarounds as production-proven

### Phase 28 ships 3 new page frames + 2 new Section components + multiple Card instances

**Likelihood: stale-cache surfaces on all 3 new page frames + likely on Section components inside g9oRa5** per Phase 26 + 27 precedent.

### Workaround tiering (CALIBRATION-PROTOCOL § 6.4 + § 4.4 step 9)

```
For each new subtree where get_screenshot returns blank-white:

Tier-1 — Cross-row position Update on PAGE FRAME (NOT library frames):
  Update(<page-frame-id>, { x: <current-x>, y: <different-row-y> })
  → screenshot
  → Update(<page-frame-id>, { x: <current-x>, y: <original-y> })
  Cleared cache: ~50% of cases (FAQ Plan 26-01)

Tier-2 — User-side editor verification at calibration gate:
  AskUserQuestion presents structural verification (batch_get + snapshot_layout) as authoritative
  + asks user to visually verify in Pencil's actual editor at the calibration gate
  Used: ~50% of cases (404 Plan 26-02 + likely Phase 27 Contact)
```

### Recommended Plan 28-XX Task patterns

Every Plan 28-01, 28-02, 28-03 SHOULD include in its calibration-gate task:

```
Task N: Capture per-section screenshots via get_screenshot
  - For each section needing spot-check:
    - get_screenshot({ nodeId: <section-id> })
    - If blank-white returned:
      - Try Tier-1 cross-row position Update (max 1 attempt)
      - If still blank: invoke Tier-2 fallback at calibration gate
  - Document outcome in scratch (Tier-1 cleared / Tier-2 fallback used)

Task N+1: AskUserQuestion calibration gate
  - Tier-1 success: present inline screenshots in description
  - Tier-2 fallback: present batch_get structural data + snapshot_layout
    + ask user to verify visually in Pencil editor at the specific frame's canvas position
```

### CRITICAL: Tier-1 cross-row Update applies to PAGE FRAMES only

**Don't apply Tier-1 to Section components or library frames.** Moving g9oRa5 children around shuffles the library and risks position drift. PAGE FRAMES live at the page-frame row (y ≈ −4111); cross-row Tier-1 moves to a different y temporarily then restores. Library frames stay put.

If a Section component inside g9oRa5 returns blank-white from get_screenshot, **skip directly to Tier-2** (user-editor verification).

## Focus 9: Validation Architecture (Nyquist dimensions for Phase 28)

**Phase 28 ships .pen mutations only — NO `src/` changes per PROJECT.md + REQUIREMENTS.md Out of Scope.** What's the validation surface for purely-Pencil work?

This section is consumed by Step 5.5 VALIDATION.md creation.

### What Phase 28 validates

1. **Token surface stability + growth** — `get_variables({})` count = 100 at Plan 28-00 open; = 107 at Plan 28-00 close (7 new prose tokens per D-105); = 107 at every subsequent plan open + close (Plans 28-01 + 28-02 + 28-03 add zero tokens).

2. **Baseline ID integrity** — `batch_get` verifies the Phase 23–27 baseline IDs intact at every plan open. Plan 28-00 may mutate Card title-slot `vGH3A` (extension per Focus 3 Path A) — documented as intentional. Plan 28-01 + 28-02 each mutate one Crito raster (DzqTm + w1m3x) `enabled: false` — intentional per PAGE-11 ACTIVE post-APPROVE only.

3. **New library entry presence** — `batch_get` verifies after Plan 28-00:
   - Section/TagFilter inside g9oRa5 (NEW per D-115)
   - Section/RelatedPosts inside g9oRa5 (NEW per D-116)
   - Badge/Outline inside avgor (NEW per D-119 plan-execution evaluation)
   - title-slot extension on Card t40xct (NEW metadata-caption child per Focus 3 Path A)

4. **Page-frame presence** — `batch_get` verifies after each per-page plan:
   - Blog frame at document root, page-frame row y ≈ −4111 (Plan 28-01)
   - Blog Post frame at document root, same row (Plan 28-02)
   - Tag frame at document root, same row (Plan 28-03)

5. **Layout sweep** — `snapshot_layout({ maxDepth: 0, problemsOnly: true })` at document level returns `"No layout problems."` at every plan close. Per-frame sweeps document text-clipping false-positives per Phase 24/25/26/27 precedent (NOT real clipping; NO mitigation). Plan 28-02 will likely have the highest text-clipping false-positive count due to multi-paragraph post body — document caveat.

6. **Zero raw values inside new tokens + components + page frames** — Per OPEN-23-13 dual-track, every literal hex/px/typography value appears in PEN-INVENTORY Variant Evidence rows binding to a semantic token. Phase 28 adds ~40-60 Variant Evidence rows total (7 token entries + 2 Section components + Badge/Outline if added + 3 page frames × ~10-15 rows each).

7. **Pre-flight active-editor compliance** — D-125 enforced before EVERY mutating call across all plans. 0 mismatch incidents target (matches Phase 23-27 carry-forward).

8. **Calibration gate APPROVE** — Plan 28-01 single user gate per § 3.4 (crito-source-flat-raster format). Plan 28-02 single user gate per § 3.4 (crito-source-flat-raster format, also covers prose-token validation per D-110 + D-123). Plan 28-03 single user gate per § 4.5 (joel-only token-usage format). Plan 28-00 closes WITHOUT a user gate per D-124 + Phase 26 D-86 carry-forward (mid-plan gate ONLY IF .fig escalation per D-106).

9. **PEN-INVENTORY extensions** — Per D-126: Frames Inventory rows for Blog + Blog Post + Tag; Variant Evidence rows for all new library entries + page-frame compositions; `## Token Extensions (Phase 28)` new sub-section; `## Variant Evidence (Phase 28)` new sub-section; `## Open Flags — Phase 28 (OPEN-28-NN)` new section; updates to OPEN-23-05 (DzqTm + w1m3x partial-resolution post-APPROVE); update to OPEN-23-10 (heading-3 + heading-4 partial-resolution); RESOLVE OPEN-23-11 (prose-link + prose-list + prose-inline-code shipped + bonus prose-code-block); RESOLVE OPEN-25-07 (Card consumer at 3 sites).

10. **PAGE-11 ACTIVE mutation timing — TWICE in one phase (Phase 28 first)** — Plan 28-01 Task N+3 fires `Update(DzqTm, {enabled: false})` AFTER Task N+2 user APPROVE only. Plan 28-02 Task N+3 fires `Update(w1m3x, {enabled: false})` AFTER Task N+2 user APPROVE only. Documented in respective SUMMARY.md files. **Failure mode (Pitfall 4):** firing PAGE-11 before APPROVE destroys the calibration target. Plan 28-00 Task scaffolding MUST enforce strict sequencing.

11. **id-inventory.json archival** — `.planning/research/exports/v2.0/end-of-phase-28/id-inventory.json` per OPEN-23-01 substitution pattern (matches Phase 23/24/25/26/27 precedent).

12. **Prose-token consumer validation (D-110 verifier)** — Plan 28-02 calibration gate is the higher-confidence verifier for the Phase 23 prose-paragraph 'provisional' flag per D-71 carry-forward. APPROVE → flag removed in PEN-INVENTORY. Plan 28-02 is also the first verifier for all 7 NEW Phase 28 prose tokens — calibration gate spot-checks every token in the sample MDX rendering.

13. **Cross-page Section consistency** — Section/Header + Section/Footer appear in all 3 new page frames (per ROADMAP success criterion 4 + carry-forward). `batch_get` verifies same ref IDs used across Blog + Blog Post + Tag frames (G0wNOc + Xs0Hs). Section/TagFilter appears in Blog index + Tag page (verifies broad-scoping per D-115). Section/RelatedPosts appears in Blog Post detail only (verifies narrow-scoping per D-116).

14. **15 Compound/Card instances total** — Blog index 6 + Tag page 6 + RelatedPosts 3 = 15 per D-114 + D-118. `batch_get` counts ref instances of t40xct across the 3 frames.

15. **Zero new src/ code changes** — `git diff --name-only src/` returns empty at every plan close.

### What Phase 28 does NOT validate

- **No HTML rendering / Playwright tests** — Phase 28 ships .pen mutations; no `src/` changes; no rendered HTML to test.
- **No axe / accessibility audits** — Accessibility is a code-milestone concern. Phase 28 documents focus-ring + prose-link affordance decisions in PEN-INVENTORY Variant Evidence; D-107 prose-link underline-on-hover is a static-design descriptor for runtime wiring.
- **No `npm run build` / `npm run astro check`** — No `src/` changes; build/typecheck unchanged. (If a planner anticipates a build step, it's defensive-only — there should be zero src diff post-phase.)
- **No Lighthouse / SEO checks** — No deployed pages changed.
- **No visual regression tooling beyond Pencil's `get_screenshot`** — Calibration is user-eye + protocol-driven, not automated. Stale-cache Tier-1/Tier-2 fallback per § 6.4.
- **No `export_nodes` PNG archival** — Per OPEN-23-01 (-32603 broken). Substituted by id-inventory.json structural snapshot.
- **No syntax-highlight color binding for code blocks** — Per D-108 + Deferred Ideas: runtime concern; static design ships chrome only.
- **No mobile-breakpoint validation** — Per PAGE-09 + Phase 26 D-66: desktop only for v2.0.

### VALIDATION.md command surface (when planner creates VALIDATION.md)

The planner's VALIDATION.md should list:

```bash
# Pencil MCP validation (interactive, per-plan close):
#   mcp__pencil__get_editor_state({ include_schema: false })  # pre-flight
#   mcp__pencil__get_variables({})                              # expect 100 → 107 after 28-00
#   mcp__pencil__batch_get({ nodeIds: <Phase 27 baseline IDs + Phase 28 additions> })
#   mcp__pencil__snapshot_layout({ maxDepth: 0, problemsOnly: true })  # expect "No layout problems."

# NO npm / playwright / axe / lighthouse commands — Phase 28 has no src/ surface.

# Defensive (optional, document zero-diff):
git diff --name-only src/  # expect empty
git diff --name-only design/Crito.pen  # expect modified
git diff --name-only .planning/research/PEN-INVENTORY.md  # expect modified
git diff --name-only .planning/research/exports/v2.0/end-of-phase-28/id-inventory.json  # expect new file
```

VALIDATION.md should also document:
- The OPEN-26-02 Tier-1/Tier-2 workaround as expected get_screenshot behavior, not a blocker.
- Text-clipping false-positive as expected snapshot_layout output, not a blocker (Plan 28-02 post-body will likely have the highest count).
- PAGE-11 ACTIVE strict sequencing (mutation AFTER APPROVE only) as a critical validation hand-rail.
- Pencil's runtime memory caveat — file on disk is stale until user Cmd+S saves design/Crito.pen.
- The .fig-unreadable status (OPEN-26-01 carry-forward) as expected; interpolation-default mechanism is production-proven.

## Focus 10: Plan ordering + dependency chain validation

### D-122 4-plan structure: 28-00 → 28-01 → 28-02 → 28-03 (strict sequential)

**Verified dependency chain (HIGH confidence):**

```
28-00 — Foundation (7 prose tokens + Section/TagFilter + Section/RelatedPosts + Badge/Outline)
  └─ BLOCKS 28-01: Plan 28-01 instances Section/TagFilter + 6 Card instances (need prose-paragraph
     + heading-1 already shipped, but Card title-slot extension per Focus 3 Path A must land in 28-00)
  └─ BLOCKS 28-02: Plan 28-02 exercises ALL 7 prose tokens (D-123 MDX validation) + instances
     Section/RelatedPosts (3 Card instances) — both must exist
  └─ BLOCKS 28-03: Plan 28-03 instances Section/TagFilter + 6 Card instances — same dependencies

28-01 — Blog index page frame
  └─ BLOCKS 28-02: Plan 28-02 FindEmptySpace nodeId anchor = Blog index frame from 28-01 (§ 10.4)
  └─ Does NOT block 28-03 directly, but 28-02 chain blocks 28-03 transitively

28-02 — Blog post detail page frame
  └─ BLOCKS 28-03: Plan 28-03 FindEmptySpace nodeId anchor = Blog post detail frame from 28-02 (§ 10.4)

28-03 — Tag page frame (joel-only branch)
  └─ Phase 28 close
```

### Parallelization opportunities — NONE recommended

**Why strict sequential:**
1. **FindEmptySpace nodeId anchor chain** (§ 10.4) requires each subsequent page frame to know the previous one's ID — sequential by construction
2. **28-02 prose-token validation is the highest-stakes gate** — saving it as second-to-last gives the protocol the most adaptive room per D-122
3. **28-03 joel-only branch validates** that Phase 28's tools work across BOTH branches in one phase — verifies the dual-branch carry-forward from Phase 27 (D-66 mechanic)
4. **PAGE-11 ACTIVE mutations are gated behind APPROVE** — parallelizing 28-01 + 28-02 would create non-deterministic ordering of two raster-hide mutations relative to two separate user gates

### Validated: 28-00 foundation-first ordering matches Phase 26 + Phase 27 precedent

- Phase 26: 26-00 foundation (Section/CTA + Section/NavBack + heading-2 token) → 26-01 (FAQ) → 26-02 (404) → 26-03 (calibration protocol codification)
- Phase 27: 27-00 foundation (form primitives + Compound/CheckboxGroup) → 27-01 (Thank-you joel-only) → 27-02 (Contact crito-source-flat-raster)
- Phase 28: 28-00 foundation (7 prose tokens + 2 Section components + Badge/Outline + Card title-slot extension) → 28-01 (Blog index crito-source-flat-raster) → 28-02 (Blog post crito-source-flat-raster) → 28-03 (Tag joel-only)

### Plan-execution ordering recommendation: index before detail before tag

**Honest rationale (CONTEXT.md D-122):**
- Index ships first because it's the simpler Card consumer (no prose body) — proves the Card-instance + TagFilter mechanic before the higher-stakes prose validation
- Detail ships second because the post body section is the heaviest prose-token validation surface (15 distinct prose-token consumers in one section per Focus 5 mapping table)
- Tag ships last as the joel-only contrast — validates dual-branch tooling in one phase

**Sequential, no waves.** Matches Phase 27 D-101 foundation-first ordering precedent.

### Pre-execution probe needed at Plan 28-00 Task 0

Before any mutation, Plan 28-00 should:

1. `mcp__pencil__get_editor_state({ include_schema: false })` — pre-flight active-editor per D-125
2. `mcp__pencil__get_guidelines({ topic: "design-system" })` — fresh-load Pencil guidance
3. `mcp__pencil__get_variables({})` — verify 100-token surface intact at phase start
4. `mcp__pencil__batch_get({ nodeIds: ['avgor', 't67DU6', 'g9oRa5', 'RpGbe', 't40xct', 'vGH3A', 'kI3bc', 'eNqxd', 'FGdti', 'oTSwn', 'j0FxQZ', 'M7eUr', 'hIWuC', 'G0wNOc', 'Xs0Hs', 'Hs5rc', 'N1jo3i', 'n0QqTd', 'b7Hgy', 'csXky', 'XsDab', 'DzqTm', 'w1m3x'], readDepth: 2 })` — verify Phase 23-27 baseline + Phase 28 mutation targets intact
5. `mcp__pencil__find_empty_space_on_canvas({ width: ..., height: ..., direction: "right", padding: 80, nodeId: "n0QqTd" })` — Plan 28-01 placement (Plan 28-00 itself doesn't place a page frame; this probe is for 28-01)

## Open Questions

The following HOW-questions surfaced during research; if they don't resolve at Plan 28-00 plan-execution, raise OPEN-28-NN per D-126.

### Open Q1: Card title-slot extension mechanic — Path A vs Path B (per Focus 3)

**Status:** Recommendation is Path A (extend title-slot with pre-created caption child). Risk: Pencil 2.13 may have an unexpected interaction between title-slot vertical layout + kI3bc width-handling.

**Plan 28-00 Task expectation:** Probe title-slot vGH3A actual structure at Task 0; if vertical-layout + pre-create works cleanly, proceed Path A; if breakage surfaces, fall back to Path B (body-slot composition).

**Surfacing trigger:** If Plan 28-00 Task action fails OR Plan 28-01 first Card instance reveals layout brittleness → fall back + raise OPEN-28-NN documenting which path was used + why.

### Open Q2: Plan 28-02 fenced code-block representation — wrap behavior (per Focus 5)

**Status:** Pencil 2.13 text node `\n` rendering inside fixed-width mono should work. Risk: width-handling of the code-block frame (fill_container vs fixed) may clip the longest code line.

**Plan 28-00 Task expectation:** No probe needed at Plan 28-00 since the code-block consumer is in Plan 28-02. Document the expected approach in Plan 28-02 Task scaffolding.

**Surfacing trigger:** If snapshot_layout reports clipping that's NOT a known false-positive → raise OPEN-28-NN documenting actual width constraints + adjusted approach.

### Open Q3: Inline-code horizontal-wrap frame support (per Focus 5)

**Status:** Pencil 2.13 frame `layout: horizontal` supports `wrap: true` — needs verification at Plan 28-02 Task time.

**Plan 28-02 Task expectation:** Probe at first inline-code consumer; if `wrap: true` works, use Option A; if not, fall back to Option B (plain text with backticks visible + sibling note).

**Surfacing trigger:** If horizontal-wrap doesn't render correctly OR causes layout problems → raise OPEN-28-NN + use Option B.

### Open Q4: TagFilter active-state — paired-pre-created-refs (Sub-option A1) vs frame-composition pills (Sub-option A3)

**Status:** Recommendation is Sub-option A1 (paired pre-created refs per pill position). Verbose but predictable.

**Plan 28-00 Task expectation:** Design TagFilter with paired refs (5 active + 5 inactive = 10 total pills, 5 visible at a time). Sibling note documents mechanic.

**Surfacing trigger:** If 10-pill density causes Pencil layout problems (e.g., width-overflow when all 10 are enabled accidentally) → fall back to Sub-option A3 (frame-composition pills) + raise OPEN-28-NN.

### Open Q5: heading-3 / heading-4 / mono interpolation defaults verification at calibration

**Status:** Per D-106 + D-108, defaults are 24/20 for heading-3/-4 + system mono stack. .fig-consult unlikely to add new info (OPEN-26-01 carry-forward).

**Plan 28-00 Task expectation:** Ship defaults; defer validation to Plan 28-02 calibration gate (D-110 mechanic).

**Surfacing trigger:** If user at Plan 28-02 calibration says "heading-3 looks visually identical to heading-2" → raise OPEN-28-NN + REVISE iteration with adjusted size (e.g., 22 or 26).

### Open Q6: image-import-NN.jpg index for w1m3x (Blog Details)

**Status:** UNKNOWN — Plan 28-02 Task 0 probes. Phase 25 raster-probe Variant Evidence cited image-import-14.jpg for Blog cards (likely DzqTm = Blog index); no audit-trail cites a specific raster for w1m3x = Blog Details.

**Plan 28-02 Task expectation:** `batch_get(['w1m3x'], readDepth: 2)` returns `fill.url` — record the index in 28-02-SUMMARY scratch.

**Surfacing trigger:** If probe returns unexpected (no image fill OR multiple image refs OR symlinked structure) → raise OPEN-28-NN documenting actual structure + fallback to manual identification by visual comparison.

### Open Q7: Badge ID confirmation

**Status:** Plan 24-03 SUMMARY cites `j0FxQZ`. CONTEXT.md note "TBD from Phase 24" suggests uncertainty. Plan 28-00 Task 0 confirms via batch_get(avgor).

**Plan 28-00 Task expectation:** If batch_get returns a different Badge ID, use the actual ID. Don't hard-code `j0FxQZ` in plan tasks.

**Surfacing trigger:** If no Badge component exists in avgor — escalate immediately + raise OPEN-28-NN (would indicate Phase 24 Plan 24-03 regression).

## Pitfalls Phase 28 must avoid

### Pitfall 1: NEVER call `Update(DzqTm, { enabled: false })` or `Update(w1m3x, { enabled: false })` before user APPROVE

**Severity:** BLOCKING (destroys the calibration target)

**Mechanism:** PAGE-11 ACTIVE per CALIBRATION-PROTOCOL § 3.3 fires AFTER calibration gate APPROVE only. Phase 27 Plan 27-02 Task 10 is the precedent (cl8tt hidden post-APPROVE). Phase 28 applies this twice in one phase — Plan 28-01 hides DzqTm, Plan 28-02 hides w1m3x.

**Mitigation:** Plan 28-01 + 28-02 task scaffolding MUST place `Update(<raster>, {enabled:false})` as a SEPARATE TASK that strictly depends on the prior calibration gate Task. Don't co-locate the mutation with construction tasks.

### Pitfall 2: Don't INVENT prose tokens beyond the 7 sample-MDX-justified ones

**Severity:** Notable (token bloat — Pitfall O5 + Phase 23 D-33 open-but-audit-trailed)

**Mechanism:** Phase 28 ships exactly 7 prose tokens because the sample MDX exercises exactly those 7 consumer surfaces. Inventing prose-blockquote, prose-figure, prose-strong, prose-em, prose-horizontal-rule "while we're at it" violates Pitfall 1 (no tokens without source-or-use evidence) + D-33 (open-token-extension policy requires real consumer).

**Mitigation:** Plan 28-00 Task ships exactly 7 tokens. PEN-INVENTORY Token Extensions row cites the sample MDX as source-evidence per token. Per CONTEXT.md Deferred Ideas: blockquote / figure / strong / em / horizontal-rule remain deferred until a future MDX consumes them.

### Pitfall 3: Don't depend on descendants override to INSERT net-new child nodes at instance time (D-111 Path A required)

**Severity:** Blocking for D-111 if not pre-planned

**Mechanism:** Phase 27 Plan 27-00 production confirmed: descendants override is content+enabled+other-property-on-existing-children only. Inserting brand-new sibling children at instance time isn't a supported descendants-map operation.

**Mitigation:** Plan 28-00 extends Card title-slot vGH3A to PRE-CREATE the metadata caption child (per Focus 3 Path A). Plan 28-01 + 28-02 + Section/RelatedPosts Card instances override `metadata-caption.content` (existing child) — not insert new children.

### Pitfall 4: Don't apply Tier-1 cross-row Update to library frames (avgor / t67DU6 / g9oRa5)

**Severity:** Notable (library position drift)

**Mechanism:** Tier-1 workaround per § 6.4 is designed for page frames at y ≈ −4111. Moving library frames (which sit at y ≈ −11711 per Phase 25 close) cross-row would shuffle their children's relative positions and may break the library-sibling-note layout convention.

**Mitigation:** Tier-1 applies to page frames ONLY. For Section/TagFilter or Section/RelatedPosts stale-cache, skip directly to Tier-2 (user-editor verification).

### Pitfall 5: Don't lose track of Phase 25 typed-slot-suggestion-only finding (D-52)

**Severity:** Minor (process drift)

**Mechanism:** Phase 25 D-52 codified that Pencil 2.13 `slot: [ids]` is suggestion-only, not enforcement. Phase 28 Section/TagFilter pills-row + Section/RelatedPosts cards-row both ship typed-slot suggestions. Without sibling notes per D-52 PREFERRED, downstream agents may not discover the slot signature via picker alone.

**Mitigation:** Plan 28-00 Section component construction includes sibling notes in g9oRa5 (matching Phase 26 Plan 26-00 Section/CTA + Section/NavBack note pattern). Sibling notes use verbatim convention from Phase 26 Plan 26-00.

### Pitfall 6: Don't conflate Section/RelatedPosts narrow-scoping with future broad-scoping ambitions

**Severity:** Minor (Pitfall O5 + O6 prevention)

**Mechanism:** D-116 explicitly narrow-scopes RelatedPosts to blog (single consumer). Phase 29 Projects builds its own Section/RelatedProjects if needed (per D-116 honest-vocabulary discipline). Building a generalized Section/RelatedContent in Phase 28 violates narrow-scoping + creates premature abstraction.

**Mitigation:** Plan 28-00 ships Section/RelatedPosts with heading default "Related posts" (literally — not "Related content"). Plan 28-02 instances it with no descendants override on the heading (carry-forward Phase 26 Plan 26-02 pure-ref instance pattern per § 10.7).

### Pitfall 7: Don't drop the sibling-note image-wiring documentation for Card image-slot (D-113 + D-93)

**Severity:** Minor (handoff loss)

**Mechanism:** Phase 27 D-93 established the belt-and-suspenders sibling-note convention for code-milestone wiring (Calendly iframe). D-113 extends the same convention to Card image-slot (post.data.featuredImage wiring). Forgetting the sibling note loses wiring documentation for the code milestone.

**Mitigation:** Plan 28-01 + 28-02 + 28-03 Card instances each get a sibling Pencil note in the page frame at the Card's canvas-y, with verbatim text: "Code milestone wires image-slot to `post.data.featuredImage` (frontmatter image path). Static design ships default light-gray placeholder per D-113."

### Pitfall 8: Don't skip pre-flight `get_editor_state` (D-125 enforcement)

**Severity:** BLOCKING (silently mutates the wrong .pen file if Cursor/VS Code switched editors)

**Mechanism:** Phase 23 OPEN-23-14 → Phase 24 D-35 → Phase 25 D-54 → Phase 26 D-87 → Phase 27 D-103 → Phase 28 D-125. Every Pencil-mutating call MUST be preceded by `get_editor_state` assertion that active editor == `design/Crito.pen`.

**Mitigation:** Plan 28-XX Task 0 ALWAYS starts with `get_editor_state({ include_schema: false })`. If active editor mismatches, HALT and surface to user. No exceptions. This is habit, not one-time check.

### Pitfall 9: Don't eyedrop from the image-import-NN.jpg rasters for token values (Pitfall F3)

**Severity:** BLOCKING (color drift from raster compression)

**Mechanism:** PEN-INVENTORY F3: raster JPGs have compression artifacts; color sampling from them produces wrong values. The Crito .fig is the source of truth for tokens (or interpolation if .fig unreadable).

**Mitigation:** Plan 28-00 prose-token values come from: (a) Phase 23 carry-forward (existing token surface), (b) interpolation per D-106 + D-107 + D-108 (defaults from CONTEXT.md), (c) system stack per D-108 (mono primitive). NEVER sample colors from image-import-14.jpg etc. The rasters are calibration TARGETS for layout/structure, not token-mining sources.

### Pitfall 10: Don't pre-emptively add `radius-semantic-pill` token before consumer demand (D-120 default-position)

**Severity:** Minor (token bloat)

**Mechanism:** D-120 ships descendants-override cornerRadius 9999 by default. Adding `radius-semantic-pill` token before plan-execution-evaluates-9999-as-hacky violates D-33 open-but-audit-trailed + Pitfall O5.

**Mitigation:** Plan 28-00 ships pill cornerRadius via instance-time descendants override (9999 literal). ONLY add `radius-semantic-pill` token if 9999 surfaces visual or maintainability concerns at Plan 28-01 calibration. Surface as OPEN-28-NN if added.

---

## Metadata

**Confidence breakdown:**

- Carry-forward patterns (CALIBRATION-PROTOCOL, PEN-INVENTORY extension, pre-flight enforcement): HIGH — Phase 23-27 production-confirmed
- Descendants-override mechanics (D-111 implication): HIGH — Phase 25 + Phase 27 production-confirmed; content+enabled only
- Prose-token interpolation defaults: MEDIUM — interpolation chain is sound but unverified-against-Crito-source (Phase 28 Plan 28-02 calibration verifies)
- Section component slot mechanics (D-115 + D-116): HIGH — Phase 25 D-52 + Phase 26 Plan 26-00 patterns extend directly
- TagFilter active-state mechanic (D-117 paired-pre-created-refs): MEDIUM — Sub-option A1 is the safest path but verbose; alternatives surface OPEN-28-NN
- Fenced code-block representation (D-108 + D-123): MEDIUM — text-frame composition is sound; Pencil 2.13 horizontal-wrap support for inline-code needs Plan 28-02 probe
- PAGE-11 ACTIVE multiply-in-one-phase ordering (Pitfall 1): HIGH — Phase 27 precedent + strict task sequencing in plan scaffolding
- Validation Architecture (Focus 9): HIGH — Phase 27 RESEARCH § Validation Architecture pattern directly inheritable

**Research date:** 2026-06-08
**Valid until:** 30 days (stable — protocol + carry-forward mechanics; re-validate if Pencil 2.13 schema updates land OR if Crito .fig becomes readable via new tooling)

## RESEARCH COMPLETE

Phase 28 inherits Phase 23–27 patterns wholesale; the two HOW-questions that materially gate execution are (a) Card title-slot extension via pre-created caption child (Path A, per Focus 3 — descendants cannot insert net-new children) and (b) Plan 28-02 fenced code-block representation via styled text-frame composition (per Focus 5 — Pencil 2.13 has no native code primitive); all other mechanics map directly to Phase 26 + 27 production-proven patterns with PAGE-11 ACTIVE applied twice in one phase as the only structurally new element.

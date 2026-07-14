# v2.0 FEATURES Research — Design-File Reconstruction Building Blocks

**Milestone:** v2.0 Prep Crito Design File
**Researched:** 2026-05-31
**Mode:** Ecosystem — what's the building-block landscape for factoring a flat Figma-export .pen into editable Pencil components
**Overall confidence:** MEDIUM-HIGH (Pencil concepts verified against docs.pencil.dev; general design-system reconstruction patterns verified against current Figma/DTCG guidance; .pen-specific node-type details deferred to phase-time `get_editor_state` calls)

---

## Context Recap (what makes this milestone unusual)

This is **not** a green-field design system. The .pen at `design/Crito.pen` was converted from a Figma community template, and that conversion flattened most page sections into raster images. v1.4 abandoned because code was authored from those flat images and the "best guesses" came out generic. v2.0 says: don't write code yet — reconstruct the .pen itself so downstream phases have ground truth.

Critical constraints that shape what counts as "table stakes" vs "anti-feature":

- **Single-site, single-consumer** — there is no second product, no shared library, no other team consuming this. Anything justified by "scale" or "multi-product reuse" is suspect.
- **Downstream is code, not more design work** — Joel's site is the only thing this .pen feeds. Optimizing for design-team handoff (annotations, prototyping flows, multi-page navigation prototypes) is wasted effort.
- **Reference is the original Figma Crito** — the source-of-truth for "what should this section look like" is the original Crito template (consult via Pencil MCP or the Figma community page). The flat raster in the current .pen is the *target appearance*, not the source.
- **15 page frames, ~0 reusable components today** — per STATE.md "Crito reference .pen contains 15 page frames but originally zero reusable components." So everything is "build, don't refactor."

> **Note on .pen inspection:** Per the milestone context, the roadmapper / phase-discussion agents should call `get_editor_state(include_schema: true)` then `batch_get` on top-level frames and `snapshot_layout` to confirm exactly which frames are flat raster vs. partially editable, then `get_variables` to see whether any tokens already exist. This FEATURES doc is grounded in the planning record (PROJECT.md, STATE.md) which is consistent on the "mostly flat, zero shared components" state, but per-frame triage is a Phase 23 deliverable.

---

## Table Stakes

These are the building blocks the reconstructed .pen **must** have for downstream code milestones to have a chance at high-fidelity output. Each one earns its keep by preventing a known v1.4-style "best guess" failure.

### TS-1. Token foundation: color, typography, spacing, radius variables
**What:** A defined set of Pencil `variables` (the .pen equivalent of design tokens) covering at minimum:
- **Color** — Crito's actual palette as named tokens (primary, secondary, neutral ramp, surface, text-on-*). Verified by inspecting the original Crito source via Pencil MCP.
- **Typography** — Font family, size, weight, line-height pairs as named text styles. At least: display, h1-h3, body, body-sm, caption.
- **Spacing** — A spacing scale (e.g. 4/8/12/16/24/32/48/64/96) used for padding/gaps.
- **Radius** — 2-4 named radii (sm, md, lg, pill) — Crito appears to use rounded corners consistently.

**Why table stakes:** Without named tokens, every recreated component would re-encode raw color hex / px values, and downstream code would have no signal about which values are "the same thing." This was the precise root cause of v1.4's drift.

**Complexity:** Low-Medium. The set is small; the work is in *deciding the names* and inspecting the original to extract exact values.

**Dependencies:** None — this is the foundation everything else binds to.

**Verification approach:** `get_variables` on the existing .pen to see what's there today; `get_screenshot` + visual comparison of original Crito sections to nail down values.

---

### TS-2. Audit / inventory of every page frame (flat vs editable)
**What:** A written catalogue (file or section in PROJECT.md / a new INVENTORY.md) listing each of the 15 page frames with:
- Frame name
- Sections within the frame
- Per-section status: flat raster | partially editable | already factored
- Priority / reconstruction order

**Why table stakes:** You cannot scope phases without knowing what's actually flat. This is also the only way to detect frames that are *already* editable and don't need reconstruction (saves work).

**Complexity:** Low. Mechanical — `batch_get` top-level frames, `snapshot_layout` each one, record findings.

**Dependencies:** None. Should happen first (Phase 23 candidate).

---

### TS-3. Layout primitives via auto-layout (Stack / Grid frames)
**What:** Every recreated section uses Pencil's auto-layout (flex) and CSS Grid frames rather than absolute-positioned children. At minimum:
- Vertical stacks (sections, card content)
- Horizontal stacks (nav bars, button rows, badge rows)
- Grid frames for card grids (project cards, blog cards, service cards)
- Padding/gap defined via spacing tokens (TS-1)

**Why table stakes:** Auto-layout is what makes a component "editable" rather than a frozen arrangement. Per current Figma/Pencil guidance, "components without auto-layout break when content changes length" — and downstream code generation reads layout structure from these primitives.

**Complexity:** Medium. Conceptually simple but tedious — every section needs its hierarchy decided (which axis stacks where, which children grow vs. hug, where padding lives).

**Dependencies:** TS-1 (so gaps/padding use tokens).

---

### TS-4. A small shared component library (the ~5-8 things that appear on every page)
**What:** Define as Pencil components, not copy-paste, the elements that recur across multiple page frames:
- **Button** — primary, secondary, ghost (variants for color + size + state)
- **Card** — the project/blog/service card shell with slots for content
- **Header / Nav** — top nav bar (logo + links + CTA)
- **Footer** — bottom footer (links + social + copyright)
- **Section wrapper** — the recurring "padded section with title" container
- **Input / Form field** — label + input + helper (for contact form on Contact page)
- **Badge** — small metric/label pill (used in hero, project cards)

**Why table stakes:** Without these as components, the same button gets redrawn 30 times with slightly different padding and the code can't tell which variations are intentional. Per current design-system guidance, "variants describe state, slots describe content" — a card with a slot for body content is one component, not 15 variants.

**Complexity:** Medium-High. Each component needs: variants for legitimate state differences (size, color), slots for content variation, auto-layout from TS-3, and token bindings from TS-1.

**Dependencies:** TS-1, TS-3. Should be built before page-level reconstruction starts because page sections will instance these.

---

### TS-5. Reconstructed page sections that consume tokens + components
**What:** Every flat raster section recreated using TS-1 (tokens), TS-3 (auto-layout), and TS-4 (shared components). Recreated sections should:
- Use color/spacing/typography tokens (no raw hex/px in section-level styles)
- Use instances of shared components (no copy-pasted buttons/cards)
- Match the original visually within ~95% (small spacing/font tweaks acceptable)

**Why table stakes:** This is the actual milestone deliverable. TS-1 through TS-4 exist to enable this.

**Complexity:** High. Bulk of the milestone work. Per-section work is conceptually similar (look at original → trace structure → assemble from primitives + components) but volume is large (~15 frames × multiple sections each).

**Dependencies:** TS-1, TS-2, TS-3, TS-4.

---

### TS-6. Side-by-side visual validation against original
**What:** For each recreated section, capture `get_screenshot` of the recreated frame and compare against the original Crito source (also via screenshot from the original .pen or the Figma community file). Validate:
- Hero composition
- Card layouts and spacing
- Typography hierarchy
- Color usage

Document any intentional deviations.

**Why table stakes:** The whole point of v2.0 is "downstream code has ground truth." If recreated sections silently drift from the original, the milestone solves nothing.

**Complexity:** Low (per section). Use Pencil MCP's `get_screenshot` + the original. Could be done as a check at the end of each reconstruction phase.

**Dependencies:** Each TS-5 deliverable.

---

## Differentiators

These would meaningfully improve downstream code fidelity but aren't strictly required to ship v2.0. Worth doing if Phase budget allows; safe to defer otherwise.

### D-1. Token tiering (primitive → semantic)
**What:** Two layers of tokens instead of one. Primitives like `color-yellow-500` defined once, semantic tokens like `color-bg-cta` referencing the primitive. Downstream code can mirror the same structure.

**Why differentiator:** Industry standard (W3C DTCG, current Figma practice). Makes future theme changes mechanical — change a primitive once, semantic tokens follow. Per DTCG: "Three tiers is the most common structure: primitive, semantic, and component" — but two tiers is the meaningful jump from zero.

**Complexity:** Low-Medium (additive on top of TS-1).

**Dependencies:** TS-1.

**Skip if:** Time-constrained. A flat token set with good semantic names ("color-cta-bg" not "yellow") gets 80% of the value.

---

### D-2. Slots-based composition for flexible components (Card, Section)
**What:** Use Pencil slots so that a single `Card` component handles project cards, blog cards, and service cards via slotted content — rather than three Card variants. Same for `Section` (slot for content area).

**Why differentiator:** "Slots create the most impact in places where structure stays consistent but content changes frequently" — exactly Crito's card-based sections. Reduces variant explosion. Per current guidance: "Variants handle the logic (state, size, type), while Slots handle the content."

**Complexity:** Medium. Requires understanding Pencil's slot model (verify via docs.pencil.dev and `get_editor_state` schema before relying on it).

**Dependencies:** TS-4.

**Skip if:** Pencil's slot support is immature or hard to use from MCP — fall back to variants + instance swap for cards.

---

### D-3. Typography styles with prose defaults (line-height, paragraph spacing, link styles)
**What:** Beyond TS-1's heading/body styles, define prose-level details: paragraph spacing, link color/underline, inline code styling, list bullet styles. Useful because the blog renders MDX.

**Why differentiator:** Blog and FAQ are content-heavy. Without prose tokens, downstream code rebuilds prose styles from scratch (drift risk).

**Complexity:** Low.

**Dependencies:** TS-1.

**Skip if:** Blog/FAQ frames in the Crito .pen don't include rich prose examples — defer to a later phase that adds them.

---

### D-4. Iconography token / icon component
**What:** Define an `Icon` component with size variants (16/20/24/32) and a way to swap the underlying glyph. Document the icon style (line weight, corner style) so downstream code picks the right Lucide / Heroicons / custom set.

**Why differentiator:** Icons appear in nav, buttons, cards, footer. Without an Icon primitive, sizing/spacing drifts.

**Complexity:** Low-Medium. Pencil's icon handling needs verification (does it have a glyph swap, or do you instance-swap an SVG?).

**Dependencies:** TS-1 (size = spacing token), TS-4.

**Skip if:** Crito uses very few icons, or icon style is unambiguous from the original.

---

### D-5. Responsive breakpoint frames (desktop + mobile per section)
**What:** For each reconstructed page, build the section at two widths (e.g. 1440 desktop, 375 mobile). Document how stacks collapse, what hides, how typography scales.

**Why differentiator:** The site is responsive. Without mobile frames, downstream code has to guess (which is exactly what v1.4 did, badly).

**Complexity:** Medium-High. Doubles the section count to recreate.

**Dependencies:** TS-5.

**Skip if:** The original Crito .pen only has desktop frames anyway — match what's available, defer mobile reconstruction to a later milestone or rely on auto-layout's responsive defaults.

---

### D-6. Component documentation / usage notes
**What:** In Pencil, annotate each shared component with a short note: "Use this Button for primary CTAs only" / "Card with image: use this variant." Or maintain a `COMPONENTS.md` alongside.

**Why differentiator:** Downstream code agents reading the .pen + the doc make fewer "which variant?" mistakes.

**Complexity:** Low.

**Dependencies:** TS-4.

**Skip if:** Components are self-explanatory once named clearly (often true at ~5-8 components).

---

## Anti-Features (Skip)

Tempting features that look like "real design system" work but burn time without improving downstream code fidelity for a single-site site.

### AF-1. Full multi-theme token system (light/dark/brand variants)
**Why skip:** Dark mode is **explicitly out of scope for v2.0** (per PROJECT.md). Building theme infrastructure now is speculative; revisit when dark mode becomes scope.

### AF-2. Prototyping flows / interactive states / hover animations in Pencil
**Why skip:** Downstream consumer is Astro code, not a clickable prototype. Hover/active state visuals can be defined as component variants without wiring interactive prototyping.

### AF-3. Page-frame "perfection" — pixel-exact reconstruction of every flat section
**Why skip:** Crito frames include pages Joel **isn't adopting** (per Out of Scope: "View More, Information, Free Design Sample"). Reconstructing those is pure waste. Inventory (TS-2) should explicitly mark which frames feed which Joel page; skip frames that map to nothing.

### AF-4. Adopting Crito's exact page architecture / IA
**Why skip:** PROJECT.md is explicit: "Joel's existing page architecture is retained." v2.0 is about the *visual/component vocabulary*, not the site map. Don't get sucked into restructuring the page set.

### AF-5. A formal component naming system (BEM-style, atomic design layers)
**Why skip:** With ~5-8 components, naming overhead exceeds value. "Button / Card / Header / Footer / Section / Input / Badge" is enough vocabulary. Skip atomic-design layering (atoms/molecules/organisms) — adds taxonomy without adding clarity at this scale.

### AF-6. Token sync to code / CSS variable export pipeline
**Why skip:** This is a code-side concern handled in the next milestone. The .pen needs *correct tokens*; how code consumes them (CSS vars, Tailwind config, design-tokens JSON) is a downstream decision. Don't build the bridge before v2.0 ships the design side.

### AF-7. Component variants for every legitimate-looking state
**Why skip:** Easy to make 20 Button variants (3 colors × 3 sizes × hover/active/disabled × icon-left/right/none). Most won't be used. Build variants on demand as recreated sections actually need them — additive, not pre-emptive.

### AF-8. Building components for the **current** neobrutalist v1.3 design
**Why skip:** v2.0 is reconstructing **Crito**, not preserving the current yellow/turquoise/magenta isometric look. Per PROJECT.md Out of Scope: "Neobrutalist palette / isometric illustrations / Bricolage Grotesque + DM Sans / shadow-to-glow dark mode — still planned to be replaced." Don't conflate "factor the current design system" with this milestone.

### AF-9. Reconstructing the Alliatus .fig file in design/
**Why skip:** There's a 38MB Alliatus Figma file in `design/` alongside Crito. Out of scope — Crito is the reference per PROJECT.md.

### AF-10. Custom illustration / asset reconstruction
**Why skip:** Crito uses photos, illustrations, and decorative graphics. Recreating these as vector in Pencil is enormous work for no code-fidelity gain — downstream code can reference image assets directly. Treat illustrations as opaque image slots in components.

---

## Feature Dependencies

Build order, with rationale:

```
Phase A: Foundation (must come first)
├── TS-2  Inventory          (no dependencies — pure read)
└── TS-1  Token foundation   (no dependencies — informed by TS-2 inspection)
         └── D-1 Token tiering (optional, additive on TS-1)

Phase B: Layout vocabulary
└── TS-3  Auto-layout primitives    (depends on TS-1 for spacing)

Phase C: Shared components
└── TS-4  Component library         (depends on TS-1 + TS-3)
         ├── D-2 Slots composition  (optional, refines TS-4)
         ├── D-4 Icon component     (optional)
         └── D-6 Doc annotations    (optional)

Phase D: Page section reconstruction (the bulk of the work)
└── TS-5  Recreated sections        (depends on TS-1 + TS-2 + TS-3 + TS-4)
         ├── D-3 Prose typography   (optional, when blog/FAQ sections reconstructed)
         └── D-5 Responsive frames  (optional, per section)

Phase E: Validation
└── TS-6  Side-by-side checks       (depends on TS-5, can run incrementally)
```

**Suggested phase grouping for the roadmapper:**
1. **Phase 23 — Inventory + Tokens** (TS-2 + TS-1, optionally D-1). Small, foundational, unblocks everything.
2. **Phase 24 — Shared component library** (TS-3 + TS-4, optionally D-4 + D-6). Builds the vocabulary used by all sections.
3. **Phases 25-N — Page section reconstruction** (TS-5), grouped by page (Homepage / Projects / Blog / FAQ / Contact / Thank-you / Design-system / 404). Each phase reconstructs the sections for one or two Joel pages, includes its own TS-6 validation pass.
4. **Phase N+1 — Final validation sweep + handoff doc** (TS-6 across all pages, plus a short "how the .pen is organized" note for the next milestone's roadmapper).

This ordering minimizes rework: tokens before components, components before sections, validation as a continuous check.

---

## Open Questions

Items the roadmapper and Joel should resolve before / during Phase 23:

1. **Which Joel pages are in scope?** PROJECT.md lists Homepage, Projects, Blog, FAQ, Contact, Thank-you, Design system, 404. Crito has 15 frames including pages Joel won't use. Confirmed mapping needed: which Crito frame(s) feed which Joel page, and which Crito frames are simply ignored.

2. **What's the exact state of the .pen today?** This research is grounded in PROJECT.md/STATE.md claims ("mostly flat raster, zero shared components"). Phase 23 should call `get_editor_state`, `batch_get`, `snapshot_layout`, and `get_variables` to confirm per-frame and surface any surprises (e.g. some frames may already be partially factored).

3. **How does Pencil model slots vs variants today?** Differentiator D-2 assumes Pencil supports slots in a way comparable to Figma. Verify via `get_editor_state(include_schema: true)` and docs.pencil.dev before depending on slots. If slots are immature, the fallback is variants + instance swap — still works, just more variant explosion.

4. **Is there a canonical "original Crito" reference available beyond the flat raster?** The raster *is* the appearance, but per-section spacing/typography values are easier to verify if the original Figma Crito source (Figma community link) is available alongside the .pen. If yes, the validation step (TS-6) uses both; if no, the raster is the only reference.

5. **Should the reconstructed .pen also include "design-system" frames (token gallery, component gallery)?** Useful for the design-system page Joel ships at `/design-system`, but adds work. Recommendation: defer — generate gallery frames as part of the future code-side `/design-system` page milestone, not v2.0.

6. **Component variant explosion threshold.** When should a property become a variant vs. a slot vs. an instance swap? Sensible default: state = variant (hover/disabled), structure = slot (card content area), distinct asset = instance swap (icon). Worth documenting up front to avoid relitigating per component.

7. **Asset handling for raster images** — Crito uses photos and illustrations. Confirm: are these stored as separate files in `design/images/` (looks like yes — 76 entries in the directory listing), and is the plan to keep referencing them rather than recreate? Almost certainly yes, but worth making explicit (AF-10).

---

## Confidence & Sources

**HIGH confidence** (consistent across PROJECT.md, STATE.md, and current docs):
- Token foundation + auto-layout + shared components are table stakes for any design-system reconstruction
- Dark mode / multi-theme / interactive prototyping are out of scope for v2.0
- Crito .pen is mostly flat with ~0 reusable components today

**MEDIUM confidence** (general design-system guidance, applies to Pencil by analogy):
- Two-tier primitive→semantic token structure is industry standard but Pencil-specific syntax needs verification
- Slots vs variants tradeoff — verified Figma practice, Pencil claims support but exact MCP affordances should be confirmed at phase time

**LOW confidence** (needs phase-time verification):
- Exact set of components in the current .pen and which frames are partially editable — must be confirmed via `get_editor_state` + `batch_get` + `snapshot_layout` in Phase 23
- Whether the original Crito Figma source is reachable for spot-check validation
- Pencil's exact slot mechanics from the MCP side

**Sources:**
- [Pencil .pen Files docs](https://docs.pencil.dev/core-concepts/pen-files)
- [Pencil AI Integration docs](https://docs.pencil.dev/getting-started/ai-integration)
- [Figma — Supercharge your Design System with Slots](https://www.figma.com/blog/supercharge-your-design-system-with-slots/)
- [Figma — Difference between slots, instance swaps, and variants](https://help.figma.com/hc/en-us/articles/38741465279895-The-difference-between-slots-instance-swaps-and-variants)
- [How to Build a Design System in Figma — Practical Guide 2026 (Muzli)](https://muz.li/blog/how-to-build-a-design-system-in-figma-a-practical-guide-2026/)
- [Figma Design System Best Practices 2026 (Atomize)](https://atomize.tools/blog/figma-design-system-best-practices/)
- [W3C DTCG — Design Tokens Specification Stable v2025.10](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)
- [DTCG Format Module](https://www.designtokens.org/tr/drafts/format/)
- [Essential Layout Components For Your Design System (Nayaab Khan)](https://dev.to/nayaabkhan/essential-layout-components-for-your-design-system-26p)
- [MVP Software Development 2026 (UXPin) — over-engineering risks](https://www.uxpin.com/studio/blog/mvp-software-development-how-to/)

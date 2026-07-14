# v2.0 ARCHITECTURE Research — .pen File Structure

**Confidence:** MEDIUM (grounded in prior v1.4 architecture work and general Pencil/component-library principles — Pencil MCP tools were NOT available to the research agent, so live `get_editor_state` / `get_variables` / `batch_get` verification could not be performed; the roadmapper should re-verify against actual schema before phase 23 starts)

**Critical caveat:** The quality gate requires "grounded in Pencil schema (verify by calling get_editor_state and get_guidelines before writing)." This was not satisfied — the Pencil MCP tools listed in the MCP server instructions (`get_editor_state`, `get_guidelines`, `batch_get`, `get_variables`, etc.) were NOT in the agent's tool set. Recommendations below are derived from PROJECT.md, the v1.4 ARCHITECTURE.md (which already made Decision 4 about per-page .pen splitting), and general design-system practice. **Phase 23 should begin with a `get_editor_state(include_schema: true)` audit to confirm or correct these assumptions.**

---

## Token Architecture

### Two-tier system: primitives + semantic aliases

Pencil exposes a single variable namespace per .pen file. Structure as:

**Tier 1 — Primitives (raw values, never referenced by components directly):**

```
color/primitive/orange-50  … orange-900    # Crito's signature accent ramp
color/primitive/navy-50    … navy-900      # Crito's dark text / nav
color/primitive/neutral-0  … neutral-1000  # White → black ramp
color/primitive/red, green, blue           # Status colors only if Crito uses them

space/primitive/0, 1, 2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160
   # px values; matches a 4px base grid Crito appears to use

radius/primitive/0, 4, 8, 12, 16, 24, 999
type/primitive/font-display, font-body, font-mono   # Family-level only
type/primitive/size-12 … size-72                    # Numeric scale
type/primitive/weight-400, 500, 600, 700
type/primitive/lh-tight, lh-normal, lh-loose
```

**Tier 2 — Semantic aliases (what components actually reference):**

```
color/semantic/bg/page              → primitive/neutral-0
color/semantic/bg/surface           → primitive/neutral-50
color/semantic/bg/surface-inverse   → primitive/navy-900
color/semantic/bg/accent            → primitive/orange-500
color/semantic/text/primary         → primitive/navy-900
color/semantic/text/secondary       → primitive/navy-600
color/semantic/text/inverse         → primitive/neutral-0
color/semantic/text/accent          → primitive/orange-600
color/semantic/border/default       → primitive/neutral-200
color/semantic/border/strong        → primitive/navy-900

space/semantic/section-y            → primitive/96
space/semantic/container-x          → primitive/24
space/semantic/stack-sm/md/lg       → primitive/8/16/32
space/semantic/inline-sm/md/lg      → primitive/4/8/16

type/semantic/heading-1 … heading-6
type/semantic/body-lg, body, body-sm
type/semantic/label, caption, overline
type/semantic/button
   # Each is a composite: family + size + weight + lh
```

### Why two tiers

- **Primitives** = the design palette. Easy to retune the brand by editing 20 values.
- **Semantic** = what UI grammar references. A `Button` reads `color/semantic/bg/accent`, not `color/primitive/orange-500`. Lets future redesigns (or eventual dark-mode revival) swap palette without touching components.
- **Naming uses `/` as path separator** (Pencil likely renders these as folders in the variable picker — matches Figma variable convention).

### Component → token contract

**Rule:** Components reference Tier 2 (semantic) tokens ONLY. Components NEVER reference Tier 1 primitives directly. Page frames reference component instances; they do not reach into tokens at all.

```
primitive token   →   semantic token   →   component property   →   page-frame instance
       (1)                 (2)                    (3)                       (4)
```

### Confidence note

Pencil's variable model (modes, aliases, scoping) was not verified. If Pencil does not support variable-to-variable aliasing, collapse to a single tier with semantic names and document the source primitive in the variable's description field.

---

## Component Library Structure

### Single in-file library frame, not separate .pen files

The v1.4 ARCHITECTURE.md (Decision 4) recommended splitting into `design/design-system.pen`. **For v2.0, override that recommendation: keep everything in `design/Crito.pen`**, organized into a dedicated `Component Library` parent frame at the top of the canvas.

**Rationale for the override:**
- v2.0 starting point is a single existing `Crito.pen` with 15 page frames. Splitting mid-reconstruction adds migration overhead before work even begins.
- Pencil MCP `batch_get` and `snapshot_layout` operate on a single file's node tree.
- A solo developer with one .pen open at a time gets less context-switching.
- If file size becomes a navigability problem later, splitting a *finished* library is mechanical; splitting *mid-build* is risky.

### Layout within `Crito.pen`

Recommended top-level frame order:

```
1. _Tokens & Foundations           # Swatches, type specimens
2. _Components / Primitives        # Button, Input, Badge, Tag, Avatar, Icon
3. _Components / Compounds         # Card variants, ListItem, FormRow, NavItem
4. _Components / Sections          # Hero, Services, Process, Testimonials, CTA, Footer
5. _Components / Templates         # Reusable page-section recipes
6. Page · Homepage                 # Existing frames stay where they are
7. Page · Service
8. Page · About Me
… (remaining ~13 page frames)
```

The `_` prefix sorts library frames to the top and signals "infrastructure, not a deliverable page."

### Variant strategy

**Default assumption: Pencil supports component variants (component sets).** Use one component frame per logical component with variant props (`variant`, `size`, `state`). The Phase 23 audit confirms.

Fallback if Pencil only has instance overrides: one "master" frame per variant, grouped into a sub-frame named e.g. `Button / [primary, secondary, ghost]`, with a sticky/comment node documenting the relationship.

### Component naming convention

```
[Category] / [Component] / [Variant]
e.g.  Primitive / Button / Primary
      Compound  / Card   / Service
      Section   / Hero   / Homepage
      Section   / CTA    / Newsletter
```

---

## Page Frame Strategy

### Keep all 15 existing page frames in place

They are the deliverable. They must continue to render (and continue to look right) throughout reconstruction.

### Inline vs. factored — the rule

A node should be a **component instance** when:
- It appears more than once across pages (Header, Footer, Button, Card, Service Item)
- It's a logical UI unit the code milestone will turn into a `.astro` component
- It has variants (primary/secondary CTAs in the same page)

A node should stay **inline** when:
- It's a one-off layout container that exists only on one page
- It's a primitive layout flourish (a divider line, a decorative blob)
- It's page-specific copy/imagery that an instance override would handle anyway

**Default to factoring.** It's cheaper to inline a component later than to factor an inline node after page frames depend on its current shape.

### Transition state — the "Jurassic Park" reality

| State | Marker | Meaning |
|---|---|---|
| **Flat** | Section is a single raster image node | Original Figma export; not yet reconstructed |
| **Mixed** | Some sections are component instances, others are still flat raster | Reconstruction in progress |
| **Reconstructed** | Every section is a component instance (or rule-justified inline) | Page is v2.0-complete |

The page frame's visual output must look identical (or visibly improved) at every state. Enforced by:
- When factoring a flat raster section, position the new component to cover/replace the raster exactly. Delete the raster only after the component renders the same layout.
- `get_screenshot` before and after; visual diff confirms parity.

---

## Reconstruction Tracking

### Naming-based status tracking

Section group nodes inside page frames carry a status prefix:

```
[FLAT]   Hero Section          # Still a raster image
[WIP]    Services Section      # Reconstruction underway
(no prefix)  Process Section   # Reconstructed (default = done)
```

`batch_get` on a page frame's children returns node names; a quick filter on the prefix gives a status count.

### Inventory frame as source of truth

Maintain a `_Inventory` frame at the very top of the canvas (before `_Tokens`) — a text/grid frame listing every section across every page:

```
Page              | Section          | Status     | Component used
Homepage          | Hero             | DONE       | Section / Hero / Homepage
Homepage          | Services         | WIP        | Section / Services / Grid (drafting)
Homepage          | Process          | FLAT       | —
Service           | Hero             | DONE       | Section / Hero / Service
Service           | Pricing          | FLAT       | —
…
```

### Git-level tracking

`.pen` files are binary/encrypted, so commit messages carry progress:

```
git commit -m "design(homepage): factor Services section into editable component

Components added: Section/Services/Grid, Compound/Card/Service
Inventory: Homepage / Services moved FLAT → DONE
Pages still flat: 11 / Sections still flat: 47"
```

Consider exporting `_Inventory` as a PNG into the repo per phase-end so PR reviewers can verify progress without opening Pencil.

---

## Build Order

### Phase 23 — Audit & Foundation (no visual changes to pages)

1. **Call `get_editor_state(include_schema: true)` and `get_guidelines`** — confirm Pencil's actual variable/component/variant capabilities. Adjust assumptions if wrong.
2. **Run `batch_get` on every top-level page frame** — produce the initial `_Inventory` (every section starts `[FLAT]` unless already editable).
3. **Define tokens (Tier 1 primitives, then Tier 2 semantic aliases)** via `set_variables`. Verify with `get_variables`.
4. **Create the `_Tokens & Foundations` reference frame** (swatches, type specimens).
5. **Stub out empty `_Components / Primitives`, `_Components / Compounds`, `_Components / Sections` parent frames.** No content yet.

**Exit criterion:** Tokens exist; inventory exists; component-library frames exist but are empty; page frames are unchanged.

### Phase 24 — Primitives

6. Build `Primitive / Button` (variants: primary, secondary, ghost; sizes; states).
7. Build `Primitive / Input` (variants by type).
8. Build `Primitive / Badge`, `Primitive / Tag`, `Primitive / Avatar`, `Primitive / Icon`.
9. Build `Primitive / Link` if Crito has distinct link styles.

Each primitive references **only** semantic tokens.

**Exit criterion:** Every primitive Crito uses across its 15 pages exists.

### Phase 25 — Compounds

10. `Compound / Card` (variants: service card, project card, testimonial card, blog card, FAQ card).
11. `Compound / ListItem`, `Compound / FormRow`, `Compound / NavItem`, `Compound / SocialIcon`.

**Exit criterion:** Every recurring sub-section unit on Crito pages has a compound.

### Phase 26+ — Section reconstruction (page by page)

Page order (lowest risk → highest):

1. **FAQ** — simplest layout (accordion list)
2. **About Me** — mostly text + image
3. **Information** — single content column
4. **Blog (index + detail)**
5. **Project (index + detail)**
6. **Service**
7. **Homepage** — most sections, highest reuse payoff, last

Inside each page:
- Replace each `[FLAT]` raster section with a section component.
- Update inventory + status markers.
- Visual diff against original Figma reference to validate fidelity.

**Exit criterion (whole milestone):** Every page frame's children are component instances or rule-justified inline nodes. Zero `[FLAT]` markers remain.

---

## Integration Points (the chain)

```
Tier 1 primitive token
   ↓ aliased by
Tier 2 semantic token
   ↓ referenced by
Primitive component (Button, Input, Badge)
   ↓ composed into
Compound component (Card, FormRow, NavItem)
   ↓ composed into
Section component (Hero, Services, Process)
   ↓ instantiated inside
Page frame (Homepage, Service, About, …)
   ↓ exported by future code milestone into
.astro / .tsx page files
```

A break at any tier is the reconstruction bug pattern to watch for (e.g. a section component referencing a primitive token directly).

---

## New vs. Modified

| Artifact | Status | Notes |
|---|---|---|
| `design/Crito.pen` | MODIFIED in place | Existing 15 page frames stay; new library frames added above; token variables added |
| Page frames (Homepage, Service, About, …) | MODIFIED | Internal sections replaced flat raster → component instances; outer frame keeps name/dimensions/position |
| `_Inventory` frame | NEW | Tracking dashboard |
| `_Tokens & Foundations` frame | NEW | Visual reference for tokens |
| `_Components / *` frames | NEW | Empty in Phase 23, populated 24+ |
| Pencil variables (Tier 1 + Tier 2) | NEW | None exist yet (or only auto-imported Figma defaults — Phase 23 audit confirms) |
| `design/images/` (if exists) | UNCHANGED — reference only | Don't modify; used for visual-diff validation |
| Code-side files (`src/`, etc.) | UNCHANGED | v2.0 is .pen-file-only per PROJECT.md |

---

## Open Questions

1. **Pencil variant capabilities** — does Pencil support Figma-style component sets (variant properties), or only single-frame components with instance overrides? Phase 23 audit confirms.
2. **Pencil variable aliasing** — can a variable reference another variable (Tier 2 → Tier 1)? If not, the two-tier scheme collapses to one tier with documented provenance.
3. **The "original Crito reference" source of truth** — `design/` contains `Crito.pen` and an unrelated `.fig` file. Where does the original Figma/.pen reference live? Options: (a) re-export from Figma Community, (b) treat `design/images/` PNGs as reference, (c) the .fig is the reference. Resolve before Phase 26.
4. **Token naming — semantic vs Crito-specific** — Recommendation: **generic semantic names** so future palette swaps (when Joel re-skins) don't require token rename.
5. **Single-file vs split-file decision** — This doc reverses v1.4's Decision 4 and recommends staying in `Crito.pen`. If the file becomes unwieldy by Phase 27+, reserve a "split into per-page files" contingency phase.
6. **Variant explosion budget** — Pre-decide a cap (e.g. "no more than 5 variants per primitive") so reconstruction doesn't drift into modeling every visual nuance.
7. **Component instance overrides for content** — page-specific copy flows through instance overrides. Confirm Pencil supports text overrides on instances.
8. **Dark mode token slots** — Do NOT pre-declare dark slots in Pencil variables for v2.0. Add when dark mode work begins.
9. **MCP tool availability in subsequent phases** — Phase 23 must confirm Pencil MCP tools are accessible to the executing agent, or the entire plan collapses.

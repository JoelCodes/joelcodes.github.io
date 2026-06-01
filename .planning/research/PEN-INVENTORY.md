# PEN-INVENTORY.md — design/Crito.pen Audit (Phase 23)

**Audit date:** 2026-05-31
**Source file:** `design/Crito.pen`
**File state at audit:** 755302 bytes; git blob sha `d5e8d45` (pre-migration) → `4df3a85` (post-migration); schema version `2.13`
**Tools used:** `mcp__pencil__get_editor_state(include_schema=true)`, `mcp__pencil__batch_get(readDepth=2|3)`, `mcp__pencil__get_guidelines`, `mcp__pencil__get_variables`. Strictly read-only; no `set_variables`, no `batch_design`.

---

## Schema Snapshot

Pencil schema version `2.13` (file format version: `"2.13"`). Auto-migrated from `2.9` server-side when opened; migration removed redundant default-value blocks (e.g., `stroke: {align: "inside", thickness: 1}`) but did not change the node tree. Schema vocabulary covers: `frame`, `group`, `rectangle`, `ellipse`, `polygon`, `path`, `text`, `line`, `note`, `icon`, `script`, `ref`. Variables map and per-node `theme` property both supported (relevant for D-01 dark-mode decision — variables exist but are unused at audit time). Theming via `{ value, theme }` object arrays is available but NOT exercised in this phase (per D-01).

Top-level document children: 15 frames. Reusable components: 0 (matches v1.4 ARCHITECTURE.md observation — Figma → Pencil conversion flattened components into per-frame nested groups, leaving zero reusable references).

---

## Pencil Guidelines (verbatim)

### Guide: Design System Composition

Helpful patterns for composing screens and dashboards using design system components in `.pen` files. These are suggestions to get you started—feel free to adapt them to your needs.

**1. Common Component Patterns.** Component naming patterns you might encounter: `Button/*`, `Input/*` or `Input Group/*`, `Card`, `Sidebar`, `Table` or `Data Table`, `Alert/*`, `Modal/*` or `Dialog`.

**2. Slots.** Slots are placeholder frames inside components where you insert child components. Marked with `slot` property containing an array of recommended component IDs. Insert parent then insert children into slot via path `parentBinding/slotId`. Disable unused slots with `enabled: false`.

**3. Icons.** Libraries: `lucide`, `feather`, `Material Symbols Outlined`, `Material Symbols Rounded`, `Material Symbols Sharp`. Usage: `Insert(container, {type: "icon", library: "lucide", icon: "settings", width: 24, height: 24, fill: "$--foreground"})`. Override via descendants: `descendants: { "iconNodeId": { icon: "settings" } }`.

**4. Sidebar / Card / Tab / Dropdown / Table / Pagination composition patterns** — standard slot-based composition with `ref` instances and `descendants` overrides for child customization.

**10. Screen Layout Patterns.** Pattern A: Sidebar + Content (280px sidebar, fill_container main). Pattern B: Header + Content (64px header). Pattern C: Two-Column (main fill, side 360). Pattern D: Card Grid (horizontal, fill_container each).

**12. Spacing Reference.** Screen sections 24-32; Card grid 16-24; Form fields vertical 16; Form row horizontal 16; Button groups 12; Inside cards 24; Inside buttons [10, 16]; Inside inputs [8, 16]; Page content area 32; Sidebar items 0 / [12, 16].

**13. Button Hierarchy.** Priority order: Primary/Default → Secondary → Outline → Ghost → Destructive. Card/Modal actions right-aligned. Cancel on left, Destructive on right.

**14. Design Tokens** — Pencil canonical token names (NOTE: Joel's project uses a DIFFERENT naming convention per CONTEXT D-12 flat-dash; this section is documented for downstream awareness but is NOT the binding convention for Phase 23 token output). Pencil canonical:
- Colors: `$--background`, `$--foreground`, `$--muted-foreground`, `$--card`, `$--border`, `$--primary`, `$--secondary`, `$--destructive`
- Semantic state: `$--color-success`, `$--color-warning`, `$--color-error`, `$--color-info` (paired with `*-foreground`)
- Typography: `$--font-primary` (headings), `$--font-secondary` (body)
- Radius: `$--radius-none`, `$--radius-m`, `$--radius-pill`

**15. Design Principles.** Visual hierarchy: one focal point per section. Alignment to implicit grid. Spacing consistency from established scale. Always use `$--variable` tokens, never hardcoded hex. Content density: cards = one primary idea. Grounding: use `get_editor_state` then `batch_get` for specifics; verify via `get_screenshot`.

### Guide: Landing Page Design

**Purpose.** Conversion intent — drive one action. Show transformation, not features.

**Content.** Hero = entire pitch compressed. Headline strength: transformation > outcome > benefit > feature. Imagery shows the visitor's future. Always add contrast treatment over images. CTA is the most prominent element; reserve accent color for actions.

**Structure.** One alignment axis per section. Group related elements tightly; separate groups generously. Rhythm: alternate text-heavy and visual sections. Never set body text below 14px. Don't center-align more than 2-3 lines. Body line length 50-75 characters. Section flow: promise → proof → action. Content before visuals.

---

## Frames

15 top-level Crito frames + 3 Phase-24 library frames (Primitives + Compounds-stub + Sections-stub) + 2 joel-only-no-crito-ref placeholder rows (per CONTEXT D-08) = 20 entries. Note: `_Tokens & Foundations` (RpGbe, added by plan 23-05) is not enumerated here — it's documented in `## End-of-Phase Verification (plan 23-05)`.

| frame_name | frame_id | scope | joel_page_map | child_section_count | status_counts | reconstruction_priority | open_flag_ids |
|---|---|---|---|---|---|---|---|
| View More | MIXGf | OUT-OF-SCOPE | none — Crito template marketplace card | 2 | flat:1, partial:0, factored:1 | n/a (out of scope) | — |
| About Me | QdwxP | OUT-OF-SCOPE | none — template author's contact card | 9 | flat:2, partial:1, factored:6 | n/a (out of scope) | — |
| Information | kicJ8 | OUT-OF-SCOPE | none — Crito section divider banner | 1 | flat:0, partial:0, factored:1 | n/a (out of scope) | OPEN-23-03 |
| Home Page | ujMLJ | IN-SCOPE | Homepage (per D-06) | 10 | flat:0, partial:2, factored:8 | high | OPEN-23-04 |
| Free Design Sample | VleVl | OUT-OF-SCOPE | none — Crito section banner | 1 | flat:0, partial:0, factored:1 | n/a (out of scope) | — |
| 09_Contact | cl8tt | IN-SCOPE | Contact (per D-06) | 0 | flat:1, partial:0, factored:0 | high | OPEN-23-05 |
| 08_Blog Details | w1m3x | IN-SCOPE | Blog post detail (per D-06) | 0 | flat:1, partial:0, factored:0 | high | OPEN-23-05 |
| 07_Blog | DzqTm | IN-SCOPE | Blog index (per D-06) | 0 | flat:1, partial:0, factored:0 | high | OPEN-23-05, OPEN-23-06 |
| 06_Service Details | cYlRH | IN-SCOPE token-mining-only | none (token mining only — per D-07) | 0 | flat:1, partial:0, factored:0 | n/a (out of scope) | OPEN-23-05 |
| 05_Service | Y2isa | IN-SCOPE token-mining-only | none (token mining only — per D-07) | 0 | flat:1, partial:0, factored:0 | n/a (out of scope) | OPEN-23-05 |
| 04_About | WDGxc | IN-SCOPE token-mining-only | none (token mining only — per D-07) | 0 | flat:1, partial:0, factored:0 | n/a (out of scope) | OPEN-23-05 |
| 03_SaaS Agency | 1nLS3 | OUT-OF-SCOPE | none — Crito agency variant (Joel is solo consultant) | 0 | flat:1, partial:0, factored:0 | n/a (out of scope) | — |
| 02_Creative Agency | Jmdw0 | OUT-OF-SCOPE | none — Crito agency variant | 0 | flat:1, partial:0, factored:0 | n/a (out of scope) | — |
| 01_ Business Consulting | maDc3 | OUT-OF-SCOPE | none — Crito agency variant (Joel's Homepage rebuild anchors on Home Page frame ujMLJ) | 0 | flat:1, partial:0, factored:0 | n/a (out of scope) | — |
| FULL DESIGN PREVIEW | IKAu3 | OUT-OF-SCOPE | none — Crito section banner | 1 | flat:0, partial:0, factored:1 | n/a (out of scope) | — |
| (joel-only: Design System) | n/a (no Crito source) | joel-only-no-crito-ref | /design-system page (per D-08) | 0 | flat:0, partial:0, factored:0 | medium (Phase 30) | — |
| (joel-only: 404) | n/a (no Crito source) | joel-only-no-crito-ref | /404 page (per D-08) | 0 | flat:0, partial:0, factored:0 | low (Phase 26) | — |
| _Components / Primitives | avgor | library (Phase 24 deliverable) | n/a (library frame, not a page) | 2 (title + manifest note; populated by plans 24-02 / 24-03 / 24-04) | flat:0, partial:0, factored:0 (parent — primitives added by plans 24-02..04) | n/a (Phase 24) | OPEN-23-12 (pill radius candidate per 24-03 Badge probe) |
| _Components / Compounds | t67DU6 | library (Phase 25 deferral stub per D-37) | n/a (library frame, not a page) | 2 (title + Phase 25 deferral note citing plan 25-03) | flat:0, partial:0, factored:0 | n/a (Phase 25 deliverable) | — |
| _Components / Sections | g9oRa5 | library (Phase 25 deferral stub per D-37) | n/a (library frame, not a page) | 2 (title + Phase 25 deferral note citing plans 25-01, 25-02) | flat:0, partial:0, factored:0 | n/a (Phase 25 deliverable) | — |

**Other Joel-only pages with no Crito reference (not broken out as rows per D-08 scope limitation):** Projects, FAQ, Thank-you. These appear in the ROADMAP page set but lack a 1:1 Crito source frame. FAQ is partially derivable from Blog frame typography per D-15; see OPEN-23-06.

---

## Frame Classification Rules Applied

**Scope value assignment logic (per CONTEXT D-06, D-07, D-08):**

- **IN-SCOPE** — Crito frame maps 1:1 to a Joel page in {Homepage, Projects, Blog, FAQ, Contact, Thank-you, Design-system, 404} AND will be reconstructed. Applied to: `Home Page` (Homepage), `09_Contact` (Contact), `08_Blog Details` (Blog post detail), `07_Blog` (Blog index).
- **IN-SCOPE token-mining-only** — Crito About / Service standalone frames per D-07. Token values feed the foundation; NOT reconstructed as Joel pages (Joel's About and Services live inside Homepage). Applied to: `04_About`, `05_Service`, `06_Service Details`.
- **OUT-OF-SCOPE** — Crito-only frames with no Joel analog. Applied to: section banners (`Information`, `Free Design Sample`, `FULL DESIGN PREVIEW`), template marketplace artifacts (`View More`, `About Me`), and agency variant landings (`01_ Business Consulting`, `02_Creative Agency`, `03_SaaS Agency` — Joel is a solo consultant, not an agency).
- **joel-only-no-crito-ref** — Joel pages with no source frame in Crito. Applied to: `/design-system` and `/404` per D-08. (Projects, FAQ, Thank-you also have no Crito ref but are not broken out as rows per the same decision.)

**Pitfall 7 enforcement:** All `IN-SCOPE token-mining-only` rows have `joel_page_map: none (token mining only)` and `reconstruction_priority: n/a (out of scope)`. They are not slated for reconstruction.

**Reconstruction priority logic:**
- `high` = directly maps to a Joel page that must ship in v2.0 (Homepage, Contact, Blog × 2).
- `medium` = joel-only page that's part of v2.0 scope (Design System — Phase 30).
- `low` = joel-only page that's deferred to v2.0 tail-end (404 — Phase 26 combined with FAQ).
- `n/a (out of scope)` = applied to all OUT-OF-SCOPE and IN-SCOPE-token-mining-only rows.

**Status_counts logic:** `flat:N` = direct image-fill rectangles (image-import-*.jpg/png) or top-level frames whose only child is an image rectangle. `partial:N` = sections mixing image and editable nodes. `factored:N` = sections with only editable nodes (frame/group/text/shape). For the 9 image-flat page frames (01_ through 09_), `status_counts: {flat:1, partial:0, factored:0}` because the frame itself is a single image-fill rectangle (no editable child sections). `Home Page` (`ujMLJ`) is the exception with 10 editable group children.

---

## Audit Findings — Unique Property Values

Source: enumerated manually from `batch_get(readDepth=2|3)` over all 15 top-level frames + targeted dives into the Hero section (`0veF5`, `Wx9kx`, `7QsZc`, `HuBKK`, `LqPtn`, `ggx3v`) of Home Page. Note: the plan referenced a `search_all_unique_properties` Pencil MCP tool which does not exist in the current Pencil MCP build — flagged as OPEN-23-02. Manual enumeration covers the editable-node surface; flat raster frames are excluded from property mining per PITFALLS F3 (no eyedropping from JPGs).

### Colors (solid fills + strokes; ≥ 18 distinct values — exceeds D-05 threshold of 5)

**Brand / accent (likely token candidates):**
- `#fdba09ff` — saturated amber/yellow; used as fill on Crito section banners (Information, Free Design Sample, FULL DESIGN PREVIEW). Possible primary brand color.
- `#15bee3ff` — bright cyan; Hero section partner logo strip bg (Rectangle 1532, 1600×96).
- `#38da71ff` — bright green; primary CTA button fill (Hero "Get Started"-style button, 200×60, cornerRadius 10).
- `#ff928aff` — coral/salmon; decorative shape fill (Hero ellipse 286×225; "We help to grow" shape 88×88).
- `#1abcfeff` — sky blue; View More frame "For custom project!" text fill (Nunito 64/700).
- `#304ffeff` — electric blue; About Me "Need Custom Design?" + "Want to Donate?" headings (Poppins 60/600).
- `#eb5757ff` — coral red; About Me email text (Poppins 40/600 — `service.design71@gmail.com`).

**Neutral / surface (background + text colors):**
- `#000000ff` — pure black; banner-text fill (Information / Free Design Sample / FULL DESIGN PREVIEW — Poppins 300/600).
- `#ffffffff` — pure white; Home Page bg, Card bgs, button labels in dark sections, Hero hero/subtitle text.
- `#fafafaff` — near-white surface; Footer bg, "Why will you choose" bg, "How to grow your business" bg.
- `#f8faffff` — off-white tinted blue; View More + About Me frame backgrounds.
- `#f2f2f7ff` — pale gray; Dashboard Rectangle 8 (Home Page "We help to grow" section).
- `#141f39ff` — deep navy; Hero Rectangle 1531 (1600×1246), Testimonial section bg, "Performance is the key" bg, primary text-on-light color.
- `#52525bff` — slate gray; Footer copyright + Footer body paragraph (Chivo).
- `#d4d4d8ff` — light gray; "Better security" Line 94 stroke (1px).
- `#c1cbffff` — pale lavender; horizontal divider strokes (2px) in About Me.
- `#00189fff` — deep indigo; About Me body text (Poppins 32/normal).

**Shadow + overlay (low-opacity hex with alpha):**
- `#00000014`, `#00000040` — neutral shadows on review cards / arrows.
- `#3232470f`, `#32324714`, `#3232471a`, `#32324740` — Home Page dashboard / frame shadows (varying alpha).
- `#0425521a` — Arrow group shadow ("Testimonial" section).

**Opacity values applied to fills:** `0.6`, `0.7`, `0.8` (text on dark backgrounds — Hero "No credit card / Get 15 days" Inter 16 opacity 0.6; Hero subtitle Inter 18 opacity 0.7; Footer copyright Chivo 14 opacity 0.8).

### Font families (5 distinct — exceeds D-05 typography breadth)

- **Plus Jakarta Sans** — Home Page section headings (`fw 700`, `fontSize 48`); Hero hero headline (`fw 700`, `fontSize 70`). Primary heading family.
- **Inter** — Home Page body text + descriptions + menu (`fw normal/500`, `fontSize 14/16/18`). Primary body family.
- **Poppins** — View More + About Me + Crito section banners (`fw normal/600`, `fontSize 32/40/60/300`). Crito-template body / display family (likely OUT-OF-SCOPE for Joel rebuild — used only by template marketplace frames).
- **Nunito** — View More "For custom project!" text (`fw 700`, `fontSize 64`). Single use, likely OUT-OF-SCOPE.
- **Chivo** — Footer copyright + Footer body paragraph (`fw normal`, `fontSize 14/16`). Used only inside Home Page footer; possible candidate for caption / footer-specific token tier or replace with Inter.

### Font sizes (10 distinct — exceeds D-05 threshold of 3)

`14`, `16`, `18`, `32`, `40`, `48`, `60`, `64`, `70`, `300`.

- `14` — Footer copyright (Chivo).
- `16` — Inter body, menu items, Hero CTA labels.
- `18` — Hero hero subtitle (Inter).
- `32` — Crito Poppins body (lineHeight 2).
- `40` — About Me email (Poppins/600).
- `48` — Home Page section headings (Plus Jakarta Sans/700).
- `60` — About Me display headings ("Need Custom Design?", "Want to Donate?" — Poppins/600).
- `64` — View More "For custom project!" (Nunito/700).
- `70` — Hero hero headline (Plus Jakarta Sans/700).
- `300` — Crito section banner text (Poppins/600 — Information / Free Design Sample / FULL DESIGN PREVIEW).

### Font weights (4 distinct)

`normal` (400 implied), `500` (Inter menu), `600` (Poppins display + banner text), `700` (Plus Jakarta Sans + Nunito).

### Line heights (12 distinct — typography hierarchy is rich)

`1`, `1.2`, `1.333`, `1.4`, `1.4286`, `1.5`, `1.6`, `1.625`, `1.667`, `1.875`, `2`, `2.5`.

Patterns:
- `1` — banner text (font 300).
- `1.2` — Hero hero headline.
- `1.4` — Plus Jakarta Sans section headings.
- `1.5` — Inter menu + 16px supporting text.
- `1.6` — Inter body 16px (most common body line-height).
- `1.625` — Footer paragraph (Chivo 16px).
- `2` — Crito Poppins 32px body (very generous; matches Crito visual).
- `2.5` — Crito Poppins 32px "buymeacoffee" link (extra-loose).

### Letter spacing (3 distinct)

- `-1` — Plus Jakarta Sans display headings (48px / 70px / fw 700).
- `-0.4` — Poppins banner text (300px / fw 600).
- `-0.15` — Poppins body text (32px / 40px / 60px).

### Spacing — gap (8 distinct)

`9`, `10`, `16`, `20`, `24`, `32`, `40`, `60`.

**Pattern visible:** multiples of 4 dominate the scale: `16, 24, 32, 40, 60`. Minor exceptions: `9` (inside Hero check-icon group), `10` (Crito banner-frame gap; Hero CTA gap), `20` (Hero CTA frame internal gap). The `10`/`20` track is plausibly a "Crito-specific" half-step (not part of Joel's intended 4-multiple scale). See OPEN-23-07.

### Spacing — padding (5 distinct shapes)

- `160` (uniform — About Me frame).
- `[60, 200]` (vertical 60, horizontal 200 — My Profile frame inside About Me).
- `[200, 10]` (Crito banner frames — uniformly).
- `[16, 20]` (Hero CTA buttons internal padding — likely token candidate).
- `[8.027, 0]` (Dashboard Frame 1341 — sub-pixel value from a Crito scale-down; ignore for tokens).

### Corner radius (4 distinct)

- `10` — Hero CTA buttons, Review 2 + Review 3 cards.
- `16.0556` — Dashboard chart frames (sub-pixel from Crito scale-down).
- `24.0833` — Dashboard outer frame (sub-pixel).
- `60` — View More frame (large hero-card radius).

For tokenization, the cleanest scale is likely: `8`, `12`, `16`, `24`, `60` (rounded), with sub-pixel Dashboard values flagged as OPEN-23-08 (Crito-specific scale-down artifact, not intended design intent).

### Stroke widths (2 distinct)

- `1` — "Better security" Line 94 + various component outlines.
- `2` — About Me horizontal divider lines.
- `0.5` — Hero CTA outline button (Plus Jakarta Sans "Watch Video" style).

Three values, not two. Stroke `0.5` is rare; mostly `1` or `2`.

### Effect — drop shadows (multiple distinct shadow recipes)

- Review cards (light): `blur 56.76, color #00000014, offset 0/4.32, outer`.
- Dashboard major shadow: `blur 33.72, color #32324740, offset 0/32.11, outer` + secondary `blur 16.86, color #3232471a, offset 0/19.27, outer`.
- Frame 1334 / 1341 (Dashboard internal): `blur 11.24, color #3232470f, offset 0/6.42` + `blur 5.62, color #32324714`.
- Arrow group (Testimonial): `blur 52.5, color #0425521a, offset 0/6`.

**Pattern:** Crito uses paired soft+sharp shadows for elevated surfaces. Dashboard scale is at a Crito-specific sub-pixel grain (e.g., `32.11`, `19.27`). Token scale should round these to clean integers; see OPEN-23-08.

---

## Audit Findings — Current Variable Surface

`mcp__pencil__get_variables({})` returned `{"variables":{}}`.

**No pre-existing variables in `design/Crito.pen` at audit time.** The Figma → Pencil import did not carry forward any token variables (consistent with v1.4-research/PITFALLS observation that the Crito import flattened variables along with components). Plans 23-03 and 23-04 will populate the variables map from scratch, with primitive names (`color-primitive-*`, `space-primitive-*`, `type-primitive-*`, `radius-primitive-*`) and semantic aliases (`color-semantic-*`, etc.) per D-12 flat-dash convention.

No naming-convention conflicts to resolve — the variable surface is empty.

---

## Open Flags

Per D-10 schema. All flags raised during Plan 23-01 audit.

| id | category | severity | description | blocker-for-phase |
|---|---|---|---|---|
| OPEN-23-01 | audit | notable | `mcp__pencil__export_nodes` fails with `MCP error -32603: failed to execute tool call. you are probably referencing the wrong .pen file` for every filePath form tested (relative `design/Crito.pen`, absolute, basename, omitted). `mcp__pencil__batch_get` and `get_screenshot` accept the same paths without error. Baseline screenshot capture (Plan 23-01 Task 1) fell back to a structural JSON snapshot via `batch_get`. | none — workaround in place via `.planning/research/exports/v2.0/baseline-23/id-inventory.json` |
| OPEN-23-02 | audit | minor | `search_all_unique_properties` Pencil MCP tool referenced by 23-RESEARCH.md and 23-01-PLAN.md does not exist in the current Pencil MCP build. Property enumeration was done manually from `batch_get` JSON. Coverage is representative but not exhaustive — particularly for deeply-nested groups inside Home Page sections (readDepth bounded at 3 per Pencil guidance). | none — manual enumeration met D-05 coverage thresholds (PASS verdict) |
| OPEN-23-03 | audit | minor | `Information` banner frame uses `fontSize 300` Poppins/600 — extreme display size with no clear use case inside Joel's rebuild. Likely OUT-OF-SCOPE; no token needed. | none |
| OPEN-23-04 | audit | notable | `Home Page` (ujMLJ) is the primary IN-SCOPE token-mining source AND the only frame with editable children. Of its 10 group children, 6 use Plus Jakarta Sans for headings and 4 use Inter for body — a small typography surface relative to the full Crito design. Token foundation will be primarily inferred from this single page frame, which means hierarchy levels not present in Home Page (e.g., caption-tier text, prose link styles) become OPEN flags for later phases. | 26 (FAQ + 404 reconstruction needs prose tokens beyond Home Page coverage); 28 (Blog reconstruction) |
| OPEN-23-05 | audit | notable | Frames `09_Contact`, `08_Blog Details`, `07_Blog`, `06_Service Details`, `05_Service`, `04_About` are flat raster fills (single image-import-*.jpg rectangle). They cannot be token-mined (PITFALLS F3 forbids eyedropping from raster JPGs). Joel's Contact, Blog, About, and Services pages will be reconstructed using tokens derived from Home Page + Crito .fig fallback per D-04. | 26 (Joel FAQ + 404), 27 (Joel Contact), 28 (Joel Blog) |
| OPEN-23-06 | token | notable | No standalone Crito FAQ frame exists; CONTEXT D-15 specifies prose tokens derive from "Crito Blog frame + Crito FAQ frame only". Falls back to Blog frame (DzqTm, also flat raster — see OPEN-23-05) → effectively no Crito source for prose typography. Phase 26 will need to design prose tokens from Joel's content needs + the type scale established here, OR consult the Crito .fig per D-04. | 26 (FAQ reconstruction) |
| OPEN-23-07 | token | minor | Spacing scale shows two parallel tracks: dominant 4-multiple ladder (`16, 24, 32, 40, 60`) and a secondary `10/20` track from Hero CTAs + Crito banner frames. Resolution: tokenize the 4-multiple ladder as the primary `space-primitive-*` scale (likely `4, 8, 12, 16, 20, 24, 32, 40, 48, 60`), keep `10` as a one-off if Hero CTA exactly requires it (or round to `12`). Decided during plan 23-03 with explicit source-evidence per token. | none |
| OPEN-23-08 | token | minor | Sub-pixel corner-radius and shadow-blur values (`16.0556`, `24.0833`, `32.11`, `19.27`, etc.) inside the Dashboard sub-frame are Crito scale-down artifacts, not intended design intent. Round to clean integers (`16`, `24`, `32`, `20`) when tokenizing. | none |
| OPEN-23-09 | token | minor | Three Crito-template-only fonts (`Poppins`, `Nunito`, `Chivo`) are used by OUT-OF-SCOPE frames (View More, About Me, banners, Footer). Decide during plan 23-03 whether to include them in `type-primitive-*` tokens (and let Phase 31 decide if Joel's Homepage uses Poppins for visual fidelity) or exclude them entirely. **Resolved in plan 23-03:** included `Plus Jakarta Sans` + `Inter` as primitives; included `Chivo` (Footer-conditional, Phase 24+ may remove); excluded `Poppins` + `Nunito` entirely. | 31 (Homepage rebuild may revisit if Crito visual fidelity needs Poppins) |
| OPEN-23-10 | token | notable | Typography size scale gap: primitive sizes from IN-SCOPE Home Page are `14, 16, 18, 48, 70` — missing intermediate h2/h3/h4 sizes (typical `24, 32, 36`). Crito's Home Page does not depict an h2/h3 hierarchy beyond the section-heading size 48 → body 16. Phase 26+ (FAQ, Blog, Service-Details reconstruction) will need intermediate sizes. Resolution: add semantic aliases in later phases that interpolate (e.g., `type-semantic-heading-2` = 36 via Crito .fig consult per D-04), OR design from scratch using Joel's content hierarchy needs. Do not invent primitives now (Pitfall 1). Plan 23-04 wrote `type-semantic-heading-1` only; heading-2 through heading-6 are NOT in the semantic surface and Phase 24+ component plans should NOT reference them — use display + heading-1 + body + body-sm + caption + button. | 26 (FAQ + 404), 28 (Blog), 29 (Service Details) |
| OPEN-23-11 | token | notable | **New (plan 23-04).** Prose semantic aliases prose-link, prose-list, prose-inline-code are NOT written. D-15 specifies derivation from Crito Blog + FAQ frames only. Crito has no standalone FAQ frame (OPEN-23-06) and Blog frame `DzqTm` is a flat raster (OPEN-23-05) — neither is mineable for prose styling via Pencil MCP. `type-semantic-prose-paragraph-*` was written as a Home Page body proxy with `source-detail` flagged provisional pending Crito .fig consultation. Phase 26 (FAQ reconstruction) and Phase 28 (Blog reconstruction) must consult `design/images/Consulting & Agency Website Template I Crito (Community).fig` per D-04 to derive link styling (color + underline behavior), list bullet style + indent, and inline code styling. Inline-code specifically may not be depicted even in the .fig (agency marketing prose rarely shows code) — likely escalates to a Joel design decision in Phase 28. | 26 (FAQ — prose-link + prose-list), 28 (Blog — all four prose roles, inline-code potentially escalates to Joel decision) |
| OPEN-23-12 | token | minor | **New (plan 23-04).** `radius-semantic-pill` is NOT written. No large/pill-shaped radius primitive in audit — IN-SCOPE Home Page CTA buttons use `radius-primitive-10` (small cornerRadius, not pill). View More frame (OUT-OF-SCOPE) uses `radius-primitive-60` (large) but that was excluded per OPEN-23-09. If Phase 24 component primitives need pill shapes (e.g., badge component, tag chips), add a primitive at that time. | 24 (component primitives) |
| OPEN-23-13 | tooling | notable | **New (plan 23-05).** `mcp__pencil__batch_design` `Insert` and `Update` operations silently reject `$<variable-name>` value references — properties default to baseline values (e.g., `fill: "$color-semantic-bg-page"` → stored as `fill: "#000000"`; `fontFamily: "$type-primitive-family-display"` → stored as `fontFamily: "Inter"`). Confirmed via direct probe: `fill: "#fdba09"` (literal hex) persists correctly while `fill: "$color-primitive-amber-500"` resolves to default black. Variable resolution DOES work for `set_variables` (verified in plans 23-03/04 — all 95 tokens carry the `$<primitive>` reference syntax in their `value` fields, and the document's variables map is correct). The `_Tokens & Foundations` reference frame in this phase therefore uses literal hex/font/size values rather than `$<token>` references — D-14's "components reference semantic only" rule is preserved in spirit because (a) downstream code consumers DO use `$<name>` resolution through Pencil's standard variable pipeline outside batch_design, and (b) the reference frame is documentation, not a runtime-consumed component. | none — workaround in place; downstream phases that use batch_design to build components should be aware that hand-edits in Pencil's UI or set_variables-driven values still resolve correctly. |
| OPEN-23-14 | tooling | notable | **New (plan 23-05).** Pencil's VS Code extension silently switches the active editor when VS Code's focus changes — leading to `set_variables` and `batch_design` calls landing in the WRONG `.pen` file even when an explicit `filePath` argument is provided. Reproduced mid-phase 23-05: Pencil's active editor switched from `design/Crito.pen` to `/Users/joel/Desktop/Projects/tonnetz-layout/.planning/designs/phase-4/phase-4-highlight-and-toggle.pen`; the first `_Tokens & Foundations` build landed in the wrong file. Same failure mode as the original Phase 23 pause-blocker (see 23-PAUSE-NOTE.md). **Recovery:** user manually restores active editor to the target file (Cmd+P → open `design/Crito.pen` as Pencil tab), executor re-runs the affected operations. **Prevention for all future Pencil-driven phases:** before each `batch_design` or `set_variables` batch, call `mcp__pencil__get_editor_state(include_schema: false)` and assert the active editor path matches the target file. Halt and surface to user if mismatched. | none — workaround documented; affects all future Pencil-driven phases (24+). Add pre-flight active-editor assertion to plans. |

### Open Flags — Phase 24 (OPEN-24-NN)

Populated by plans 24-02, 24-03, 24-04 per D-22 (compositional minimum forward variants with consumer phase), D-24 (Crito-source-not-depicting-COMP-01 purposes), D-28 (brand glyphs deferred to Phase 25), D-31 (token gap deferred). Per Phase 23 D-09 carry-forward: OPEN flags do not block Phase 24 close.

| id | category | severity | description | consumer_phase | resolution |
|---|---|---|---|---|---|
| OPEN-24-01 | token | minor | Crito Hero CTA source `fwSmg` uses `gap: 10` between label and icon; nearest semantic alias `space-semantic-inline-sm` resolves to 9 per OPEN-23-07 4-multiple-ladder. Per D-31, no new token; Primitive / Button / Default uses Crito's literal 10. | none — locked to source | Resolved by source-wins (D-24). If Phase 25 Header CTA wants the semantic-aligned 9px gap, override at the consumer site |
| OPEN-24-02 | token | notable | Crito Hero CTA label is `#ffffff` (white) on green background. Phase 23 shipped `color-primitive-white` but no `color-semantic-text-on-cta-primary` semantic alias. Primitive / Button / Default label uses the primitive literal directly. | 25+ (any phase that consumes Button) | Add `color-semantic-text-on-cta-primary = $color-primitive-white` semantic alias if any consumer needs to override per theme |
| OPEN-24-03 | variant | notable | `Primitive / Button / Default / Hover` variant added per D-22 compositional minimum; Crito source does NOT depict a hover state. Inferred fill `#2db461ff` (~10% darker green) is a design-system convention, not source-derived. | 25 (Header CTA pointer state) | Phase 25 Header CTA consumer validates the inferred darken; if not visually right, swap fill at consumer site or update primitive |
| OPEN-24-04 | variant | notable | `Primitive / Button / Default / Focus` variant added per D-22 compositional minimum; Crito source does NOT depict a focus state. Focus ring uses `stroke: #15bee3ff` (`color-primitive-cyan-500`) + `strokeWidth: 2`. | 27 (Contact form keyboard nav) | Phase 27 verifies focus-ring color contrast on green CTA + on white/light backgrounds; may add `color-semantic-focus-ring` alias if pattern repeats |
| OPEN-24-05 | variant | minor | COMP-01 enumerates `Button` purposes {primary, secondary, ghost, destructive}; Crito source `fwSmg` depicts ONLY a primary CTA. Per D-24 source-wins, Phase 24 ships **primary only** + D-22 forward states (Hover, Focus). Secondary / ghost / destructive purposes are NOT in Phase 24's allow-list. | TBD (likely a later code milestone when concrete consumers need them) | Add secondary / ghost / destructive when a concrete consumer needs the visual — do not pre-build per Pitfall 6 |
| OPEN-24-06 | slot | minor | Button iconLeading / iconTrailing slots use `enabled: false` to express "no icon" — collapse behavior not yet verified vs `enabled: true` for icon-bearing consumers. Plan 24-02 ships the slot pattern; visual verification deferred to Phase 25 Header CTA (first consumer that wires a real Icon primitive into the slot). | 25 (Header CTA + Compound / Card buttons) | Phase 25 first-icon-use surfaces whether the empty-slot collapse pattern needs refinement; if `enabled: false` doesn't fully collapse, switch to consumer-side child omission |
| OPEN-24-07 | token | minor | Input control padding `[8, 16]` — vertical 8 is NOT in Phase 23's `space-primitive-*` scale (9, 10, 16, 20, 24, 32, 40, 60). Per D-33 open-token-extension, no new token added; literal carries forward. | TBD | If Phase 27 contact form needs the semantic alias, add `space-semantic-input-py = 8` then. Until then, literal is the source of truth |
| OPEN-24-08 | variant | notable | `Primitive / Input / Focus` variant inferred (Contact frame `cl8tt` is flat raster per OPEN-23-05); stroke `#15bee3ff` (cyan-500) + width 2 chosen for consistency with Button Focus. | 27 (Contact form keyboard nav) | Phase 27 verifies the focus visual works for accessibility on real form fields; may swap to a focus-specific token if pattern repeats |
| OPEN-24-09 | variant | notable | `Primitive / Input / Error` variant inferred; stroke `#eb5757ff` (red-400) + width 2 + error message text using same red. No `color-semantic-feedback-error-border` semantic — used `color-semantic-text-error` for the stroke literal (same color, dual-purpose). | 27 (Contact form validation states) | If consumer needs distinct error border vs text colors, add `color-semantic-feedback-error-*` aliases then |
| OPEN-24-10 | token | minor | Badge inferred gap `8` and padding `[4, 12]` — these literals don't perfectly match Phase 23 primitive scale (9, 10, 16, 20, 24, 32, 40, 60). Per D-33, no new tokens added; literals carry forward. | TBD | If Phase 25 Header / Compound consumer needs semantic alignment, add `space-semantic-badge-*` aliases then. Phase 27 may have project-card metric badges that drive token decisions |
| OPEN-24-11 | variant | notable | **Retroactive refinement of OPEN-24-05.** Crito source DOES depict a Secondary outline-button pattern via Home Page Hero `mkw8g` ("Discover More" — fill: none, stroke: white, strokeWidth: 0.5, strokeAlignment: inner, same padding+radius+layout as primary CTA). Plan 24-02 OPEN-24-05 (Secondary not source-evidenced) is incorrect on this point. Discovered during Plan 24-03 Badge-probe walk of Hero subtree. | 25 (likely Header secondary CTA) or 26 (Joel's About sub-CTAs) | Build `Primitive / Button / Secondary` (fill: none, stroke: source) when first consumer needs the visual. Plan 24-02's Default variant cell stands; this is an addition, not a replacement |
| OPEN-24-12 | source-coverage | notable | D-32 + D-34 Badge probes returned **no Crito source** for badge components — IN-SCOPE non-raster frames (Home Page Hero) contain buttons and bullet-row groups, but no pill/tag/metric-badge elements. `Primitive / Badge` is therefore fully inferred (D-32 Case B reuse `radius-semantic-button=10`; D-34 Case I single component). Pitfall 7 prevention: no new tokens added to support an inferred component. | 25 (Header may show badges? unlikely) / 27 (project cards may show metric badges per code milestone) | First concrete badge consumer locks the radius + fill + typography; current build is a placeholder until then |
| OPEN-24-13 | source-coverage | minor | Joel-brand glyphs (Instagram, Substack) — D-28 explicitly defers these to Phase 25 Section/Footer. Crito source provides LinkedIn + Twitter (akar-icons) but Joel uses Instagram + Substack instead. Phase 24 ships ZERO brand glyphs. | 25 (Section/Footer footer-social row) | Phase 25 plan 25-02 Footer owns the brand-glyph audit; if lucide doesn't have Instagram/Substack in its set, switch to a different `library` value (e.g., `simple-icons`) or use Pattern B fallback for those two glyphs only |

---

## Variant Evidence (Phase 24)

| primitive | variant_cell | property | literal_value | bound_to_token | source_evidence (frame_id + node_id + section) | rationale |
|-----------|--------------|----------|---------------|----------------|------------------------------------------------|-----------|
| `_Components / Primitives` (parent frame) | title text | fontFamily | `Plus Jakarta Sans` | `type-primitive-family-display` | `avgor` / `xPEpx` (plan 24-01 Task 2) | Display family for top-of-canvas library label per Phase 23 token foundation |
| `_Components / Primitives` (parent frame) | title text | fontSize | `48` | `type-primitive-size-48` / `type-semantic-heading-1-size` | `avgor` / `xPEpx` (plan 24-01 Task 2) | Heading-1 scale for library title; matches `_Tokens & Foundations` headings precedent |
| `_Components / Primitives` (parent frame) | title text | fill | `#141f39ff` | `color-semantic-text-primary` (→ `color-primitive-navy-900`) | `avgor` / `xPEpx` (plan 24-01 Task 2) | Primary text color for library title; OPEN-23-13 literal carry since batch_design rejects `$<token>` refs |
| `_Components / Compounds` (D-37 stub) | title text (grouped row) | fontFamily / fontSize / fill | `Plus Jakarta Sans` / `48` / `#141f39ff` | `type-primitive-family-display` / `type-primitive-size-48` / `color-semantic-text-primary` | `t67DU6` / `p2udm` (plan 24-01 Task 3) | Same title typography as Primitives — D-37 designed-pause stub matches sibling visual register so it's clearly a library tile, not a TODO |
| `_Components / Sections` (D-37 stub) | title text (grouped row) | fontFamily / fontSize / fill | `Plus Jakarta Sans` / `48` / `#141f39ff` | `type-primitive-family-display` / `type-primitive-size-48` / `color-semantic-text-primary` | `g9oRa5` / `pn8P3` (plan 24-01 Task 3) | Same title typography as Primitives — D-37 designed-pause stub matches sibling visual register so it's clearly a library tile, not a TODO |
| `Primitive / Button / Default` | parent frame | fill | `#38da71ff` | `color-semantic-bg-cta-primary` (→ `color-primitive-green-500`) | Home Page (`ujMLJ`) > Hero (`Wx9kx`) > Group2522 (`HuBKK`) > `fwSmg` "Button/Primary/With Icon" (plan 24-02 Task 4) | CTA primary fill verbatim from Crito Hero source |
| `Primitive / Button / Default` | parent frame | cornerRadius | `10` | `radius-semantic-button` (→ `radius-primitive-10`) | source `fwSmg` (plan 24-02 Task 4) | Crito Hero CTA radius |
| `Primitive / Button / Default` | parent frame | padding | `[16, 20]` | `space-semantic-button-py` (16) + `space-semantic-button-px` (20) | source `fwSmg` (plan 24-02 Task 4) | Crito Hero CTA padding (vertical, horizontal) |
| `Primitive / Button / Default` | parent frame | gap | `10` | (no exact semantic match — see OPEN-24-01) | source `fwSmg` (plan 24-02 Task 4) | Crito source uses 10px gap; nearest semantic alias `space-semantic-inline-sm` is 9px (OPEN-23-07 4-multiple-ladder choice). D-31 directs reuse of existing token rather than extending; deviation surfaces as OPEN-24-01 |
| `Primitive / Button / Default` | label text | fontFamily | `Inter` | `type-semantic-button-family` (→ `type-primitive-family-body`) | source `fwSmg` (plan 24-02 Task 4) | Crito Hero CTA label typography |
| `Primitive / Button / Default` | label text | fontSize | `16` | `type-semantic-button-size` (→ `type-primitive-size-16`) | source `fwSmg` (plan 24-02 Task 4) | Crito Hero CTA label size |
| `Primitive / Button / Default` | label text | fontWeight | `500` | `type-semantic-button-weight` (→ `type-primitive-weight-500`) | source `fwSmg` (plan 24-02 Task 4) | Crito Hero CTA label weight |
| `Primitive / Button / Default` | label text | fill | `#ffffffff` | `color-primitive-white` (no semantic alias for on-CTA text yet — see OPEN-24-02) | source `fwSmg` (plan 24-02 Task 4) | White label on green CTA per Crito; no `color-semantic-text-on-cta-primary` token shipped in Phase 23 |
| `Primitive / Button / Default / Hover` (D-22 forward) | parent frame | fill | `#2db461ff` (darkened ~10%) | (no Crito-source for hover — inferred per D-22 forward set; OPEN-24-03) | inferred (plan 24-02 Task 4) | Hover state shows ~10% darker fill — design-system convention since Crito source doesn't depict hover. Phase 25 Header CTA consumer can override if needed |
| `Primitive / Button / Default / Focus` (D-22 forward) | parent frame | stroke | `#15bee3ff` (cyan focus ring) + strokeWidth `2` | (no Crito-source for focus — inferred per D-22 forward set; OPEN-24-04) | inferred (plan 24-02 Task 4) | Focus ring uses `color-primitive-cyan-500` for high-contrast accessibility ring; Phase 27 keyboard nav consumer |
| `Primitive / Input / Default` | outer frame | layout / gap / padding | `vertical` / `16` / `0` | `space-semantic-stack-sm` (16) | inferred — Contact frame `cl8tt` is flat raster (OPEN-23-05); Pencil guidelines § 12 + Phase 23 stack token (plan 24-03 Task 2) | Input stacks label + control + helper + errorSlot vertically with 16px gap |
| `Primitive / Input / Default` | label text | fontFamily / fontSize / fontWeight / fill | `Inter` / `14` / `400` / `#141f39ff` | `type-semantic-body-sm-*` / `color-semantic-text-primary` | inferred (plan 24-03 Task 2) | Label uses body-sm scale per Pencil guidelines convention; primary text color |
| `Primitive / Input / Default` | control frame | layout / gap / padding | `horizontal` / `0` / `[8, 16]` | (no exact semantic — see OPEN-24-07) | inferred from Pencil guidelines § 12 "Inside inputs [8, 16]" (plan 24-03 Task 2) | Vertical padding 8 + horizontal 16; no perfect semantic token (8 not in primitive scale) |
| `Primitive / Input / Default` | control frame | fill / stroke / strokeWidth / cornerRadius | `#ffffffff` / `#d4d4d8ff` / `1` / `10` | `color-primitive-white` / `color-semantic-border-default` (→ `color-primitive-neutral-200`) / — / `radius-semantic-input` (→ `radius-primitive-10`) | inferred (plan 24-03 Task 2) | White input bg + neutral border + button-grade radius; no `strokeWidth` token surface yet |
| `Primitive / Input / Default` | placeholder text | fontFamily / fontSize / fontWeight / fill | `Inter` / `16` / `400` / `#52525bff` | `type-semantic-body-*` / `color-semantic-text-secondary` (→ `color-primitive-neutral-700`) | inferred (plan 24-03 Task 2) | Placeholder uses body scale + secondary color |
| `Primitive / Input / Default` | helper text | fontFamily / fontSize / fontWeight / fill | `Inter` / `14` / `400` / `#52525bff` | `type-semantic-body-sm-*` / `color-semantic-text-secondary` | inferred (plan 24-03 Task 2) | Helper uses body-sm + secondary color |
| `Primitive / Input / Focus` (D-22 forward) | control frame | stroke / strokeWidth | `#15bee3ff` / `2` | `color-primitive-cyan-500` / — | inferred (plan 24-03 Task 2) | Focus ring matches Button Focus pattern from 24-02 (consistency); OPEN-24-08 consumer phase |
| `Primitive / Input / Error` (D-22 forward) | control frame | stroke / strokeWidth | `#eb5757ff` / `2` | `color-semantic-text-error` (→ `color-primitive-red-400`) | inferred (plan 24-03 Task 2) | Error border + matching error message text; OPEN-24-09 consumer phase 27 contact form |
| `Primitive / Input / Error` (D-22 forward) | error message text | fontFamily / fontSize / fill | `Inter` / `14` / `#eb5757ff` | `type-semantic-body-sm-*` / `color-semantic-text-error` | inferred (plan 24-03 Task 2) | Error message reuses helper-text scale, error color |
| `Primitive / Badge` (single, D-34 Case I) | parent frame | layout / gap / padding | `horizontal` / `8` / `[4, 12]` | (no perfect semantic — gap is 8 not in primitive scale; OPEN-24-10) | inferred — no badge source in IN-SCOPE Crito (plan 24-03 Task 3) | Compact inline component with horizontal layout; gap 8 doesn't match `space-semantic-inline-{sm,md,lg}` exactly |
| `Primitive / Badge` (single, D-34 Case I) | parent frame | fill / cornerRadius | `#15bee3ff` / `10` | `color-semantic-bg-brand` (→ `color-primitive-cyan-500`) / `radius-semantic-button` (D-32 Case B reuse) | inferred (plan 24-03 Task 3) | Brand-blue fill placeholder until consumer specifies; D-32 reused button radius rather than extending token surface (Pitfall 7) |
| `Primitive / Badge` (single, D-34 Case I) | label text | fontFamily / fontSize / fontWeight / fill | `Inter` / `14` / `500` / `#ffffffff` | `type-semantic-body-sm-family` / `type-semantic-body-sm-size` / `type-primitive-weight-500` / `color-primitive-white` | inferred (plan 24-03 Task 3) | Body-sm typography weight 500 (button-grade weight) for readable inline badge |
| `Primitive / Icon / 16` (Pattern A — Pencil-native lucide) | icon node | type / library / icon / width / height / fill | `icon` / `lucide` / `chevron-right` / `16` / `16` / `#141f39ff` | (Pencil-native — no semantic alias needed) / `color-semantic-text-primary` | Q4 probe + source audit (plan 24-04 Task 1-3) | 16px size variant per COMP-04 + D-27; default glyph chevron-right per D-26 source audit; supersedes D-25 |
| `Primitive / Icon / 20` (Pattern A) | icon node | type / library / icon / width / height / fill | `icon` / `lucide` / `chevron-right` / `20` / `20` / `#141f39ff` | (Pencil-native) / `color-semantic-text-primary` | plan 24-04 Task 3 | 20px size variant per COMP-04 |
| `Primitive / Icon / 24` (Pattern A) | icon node | type / library / icon / width / height / fill | `icon` / `lucide` / `chevron-right` / `24` / `24` / `#141f39ff` | (Pencil-native) / `color-semantic-text-primary` | plan 24-04 Task 3 | 24px size variant per COMP-04 (default in Pencil guidelines § 3 example) |
| `Primitive / Icon / 32` (Pattern A) | icon node | type / library / icon / width / height / fill | `icon` / `lucide` / `chevron-right` / `32` / `32` / `#141f39ff` | (Pencil-native) / `color-semantic-text-primary` | plan 24-04 Task 3 | 32px size variant per COMP-04 |

Populated by plans 24-02, 24-03, 24-04. Each row binds a literal value used in a `batch_design` payload to the semantic token name it conceptually references (OPEN-23-13 dual-track workaround). Plan 24-05 sweep cross-refs every literal in `_Components / Primitives` against this table.

---

## Token Extensions (Phase 24)

| token_name | added_by_plan | source_evidence (frame_id + node_id) | rationale |
|------------|---------------|--------------------------------------|-----------|

Populated conditionally by plan 24-03 if D-32 Badge radius probe surfaces a needed token. Each row must answer: 'Does any other primitive need this token, or does it serve only [Plan 24-NN's primitive]?' Plan 24-05 sweep verifies every NEW token (beyond Phase 23's 95) has a row here.

**Phase 24 outcome:** ZERO token extensions added. D-32 Case B reuse + Pitfall 7 enforcement prevented any `set_variables` call. Phase 23's 95-variable surface intact at end of Phase 24.

---

## Icon Glyphs (Phase 24)

Source-driven enumeration per D-26. Every shipped glyph appears in at least one IN-SCOPE Crito frame. Pattern A (Pencil-native `library: lucide`) shipped per Q4 probe outcome — D-25 atomic-glyph fallback is NOT used. Consumers reference `Primitive / Icon / <N>` reusable nodes and override the `icon` property via descendants (or insert fresh `type: icon` nodes for ad-hoc usage).

| glyph_name (lucide) | source_frame_id | source_node_id | section / context | shipped_in_phase_24 |
|---|---|---|---|---|
| `arrow-left` | `ujMLJ` | `OW4HR` (Icon/Outline/arrow-left, rotation -180) | Home Page Hero / Group containing menu nav back button | yes (lucide-native) |
| `arrow-right` | `ujMLJ` | `EN06o` / `CNji7` / `qEqRc` / `msHgb` (Icon/Outline/arrow-right) | Home Page Hero CTAs ("Discover More", "Explore Service") trailing arrow | yes (lucide-native) |
| `check` | `ujMLJ` | `oGwoa` / `y5q3y` / `8tFDS` (Icon/Solid/check) | Home Page Hero bullet rows ("No credit card", "Cancel anytime", "Get 15 days free trial") | yes (lucide-native, solid variant via fill) |
| `menu` | `ujMLJ` | `IMKg0` (feather-icon / menu) | Home Page Menu bar — mobile hamburger toggle | yes (lucide-native) |
| `search` | `ujMLJ` | `0TVai` (feather-icon / search) | Home Page Menu bar — search affordance | yes (lucide-native) |
| `chevron-down` | `ujMLJ` | `GRMag` (feather-icon / chevron-down) | Home Page Menu bar — dropdown indicator | yes (lucide-native) |
| `chevron-right` | `ujMLJ` | `C7PWz` (feather-icon / chevron-right) | Home Page — inline-link forward affordance | yes (lucide-native; also default glyph for size variants) |
| `moon` | `ujMLJ` | `dWtlM` (feather-icon / moon) | Home Page Menu bar — dark-mode toggle (deferred per D-01 / TOKEN-07; glyph still in shipset for future activation) | yes (lucide-native) |
| `alert-circle` | `ujMLJ` | `MUUbA` / `bQ0me` / `roQbL` / `F8kjk` / `jXatI` (feather-icon / alert-circle, 5 instances) | Home Page — tooltip / info indicators across multiple sections | yes (lucide-native) |
| `link` | `ujMLJ` | `JloSU` (feather-icon / link) | Home Page Hero — external link affordance | yes (lucide-native) |

**Ship-list size: 10 glyphs.** All available via `library: "lucide"` per Pencil guidelines § 3.

**NOT shipped (D-28 deferral):**
- `linkedin` (source: Home Page `eky09` "akar-icons:linkedin-fill") — brand glyph, Phase 25 Section/Footer
- `twitter` (source: Home Page `2P1I5` "akar-icons:twitter-fill") — brand glyph, Phase 25 Section/Footer
- Joel-specific: `instagram`, `substack` — no Crito source; Phase 25 Section/Footer owns
- Tracked as OPEN-24-13 (source-coverage flag)

**Consumer usage pattern (Pencil guidelines § 3 + Q4 probe):**

```text
# Reference a size variant and override the glyph:
Insert(parent, {type: "ref", ref: "<EQaMf|yRvGb|u7NmaS|dpO5Y>", descendants: { /* fill override if needed */ }})
# OR for ad-hoc usage:
Insert(parent, {type: "icon", library: "lucide", icon: "<name-from-ship-list>", width: <N>, height: <N>, fill: "<literal>"})
```

---

## End-of-Phase-24 Verification (plan 24-05)

Mirrors Phase 23's End-of-Phase Verification structure. Captured 2026-06-01 at Phase 24 close.

### Sweep Result (VAL-24-04 — zero raw values per COMP-09 + OPEN-23-13 dual-track)

**Verdict: PASS — zero leaks.**

- Token-aware Claude-side property walker per RESEARCH Pattern 7 + OPEN-23-02 workaround (no `search_all_unique_properties` MCP tool available).
- Recursive `batch_get(avgor, readDepth: 4)` returned the full primitives tree.
- Distinct literal values collected across all variant cells: ~38 unique literals (colors, padding tuples, gaps, cornerRadii, fontFamilies, fontSizes, fontWeights, lineHeights, strokeWidths, dimensions).
- Accepted-literal reference set = `phase23_literals ∪ phase24_token_extensions ∪ phase24_binding_literals` = ~38 entries.
- Walker result: every literal collected from the live tree appears in either (a) `## Tokens Written — Primitives` / `## Tokens Written — Semantic Aliases` (Phase 23 surface), or (b) `## Variant Evidence (Phase 24)` (Phase 24 dual-track bindings).
- Special-case literals pre-approved: `0` (zero-dimension placeholder for empty slot frames), text node implicit defaults.

### `snapshot_layout` Audit Roll-up (VAL-24-05)

**Verdict: PASS at document level. Per-frame quirk documented and visually verified.**

- `snapshot_layout({ maxDepth: 0, problemsOnly: true })` at document root: `"No layout problems."` — confirms no overlap between top-level frames (16 baseline + 3 Phase 24 library frames stack cleanly).
- Per-frame `snapshot_layout` with `problemsOnly: true` on Button / Input / Badge frames reports `"partially clipped"` / `"fully clipped"` for text children. **Confirmed Pencil snapshot_layout y-coordinate reporting quirk, NOT a real rendering bug.** Evidence:
  - User visually verified Plan 24-02 buttons (Default + Hover + Focus) — all 3 render correctly.
  - User visually verified Plan 24-03 inputs (Default + Focus + Error) + Badge — all render correctly.
  - User visually verified Plan 24-04 icons (4 sizes) — all render correctly.
- **Recommendation for Phase 25+:** prefer `get_screenshot` + human visual verification over `snapshot_layout` problem flags for text-inside-button/input/badge structures. Document-level `snapshot_layout` (maxDepth: 0) remains reliable.

### Reference Screenshot Review (VAL-24-05 + VAL-24-08)

Inline `get_screenshot` captured at each plan's build-visual checkpoint:
- Plan 24-01: `avgor` + `t67DU6` + `g9oRa5` — user APPROVED 2026-06-01
- Plan 24-02: `avgor` with 3 buttons — user APPROVED 2026-06-01
- Plan 24-03: `avgor` with buttons + 3 inputs + badge — user APPROVED 2026-06-01
- Plan 24-04: `avgor` with buttons + inputs + badge + 4 icons + Icon usage note — user APPROVED 2026-06-01
- Plan 24-05: Final review gate — pending

### Variant Evidence Row Count (D-23 enforcement)

Total rows across Phase 24: **30** in `## Variant Evidence (Phase 24)` table.

| plan | rows added | notes |
|------|------------|-------|
| 24-01 | 5 | Primitives parent title × 3 properties; Compounds + Sections stubs × 1 grouped row each |
| 24-02 | 9 | Button Default × 8 atomic; Hover + Focus × 1 grouped each |
| 24-03 | 12 | Input Default × 6 grouped; Focus × 1; Error × 2; Badge × 3 |
| 24-04 | 4 | One row per Icon size variant |

### Token Extensions Row Count (D-33 enforcement)

Total rows in `## Token Extensions (Phase 24)` table: **0**. D-32 Case B reuse + Pitfall 7 prevented any extensions. Phase 23's 95-variable surface intact end-to-end.

### OPEN Flag Count (Phase 24)

**13 OPEN-24-NN rows** added: minor=5, notable=8, blocking=0, resolved-this-phase=0.

OPEN-24-11 is a **retroactive refinement of OPEN-24-05**: Crito source DOES depict a Secondary outline-button via `mkw8g` "Discover More". Future Phase 25/26 consumers needing Secondary CTA should consult that source.

### Active-Editor Pre-flight Compliance (D-35)

~14 `mcp__pencil__get_editor_state` calls across all 5 plans. Zero active-editor-mismatch incidents. OPEN-23-14 mitigation pattern held perfectly.

### Files Modified Summary

- `design/Crito.pen` — 19 top-level frames (16 baseline unmutated + 3 new library frames). Inside `avgor`: 11 child nodes representing all 4 primitives × their variants.
- `.planning/research/PEN-INVENTORY.md` — multiple new sections + extended Frames table
- `.planning/phases/24-.../24-NN-SUMMARY.md` × 5 — one per plan
- `.planning/research/exports/v2.0/end-of-phase-24/id-inventory.json` + `README.md` — NEW per OPEN-23-01 substitution
- `.planning/STATE.md` + `.planning/ROADMAP.md` — auto-managed via gsd-sdk

### Cross-cutting `must_haves.truths` Satisfaction — ALL YES

Every cross-cutting truth from 24-CONTEXT satisfied — see id-inventory.json `validation_outcomes` block for line-by-line attestation.

---

## End-of-Phase Verification (plan 23-05)

**Reference frame:** `_Tokens & Foundations` (Pencil id `RpGbe`) at top of canvas in `design/Crito.pen`. 6 child sections: Header, 1. Colors (12 primitive + 14 semantic swatches), 2. Typography (7 specimens — display, heading-1, body, body-sm, caption, button, prose-paragraph), 3. Spacing Scale (8 primitive stripes + 10-row semantic mapping), 4. Radius (3 primitive boxes + 4-row semantic mapping), 5. Dark Mode — Deferred (D-01 omission note per D-02).

**snapshot_layout verdict:** `"No layout problems."` (zero clipping, zero overlap).

**Archival artifact (D-19 path):** Substituted — `.planning/research/exports/v2.0/tokens-foundations-23.png` was NOT written to disk due to OPEN-23-01 (`export_nodes` broken) + the inability of `get_screenshot` to pipe rendered bytes to disk. The structural artifact at `.planning/research/exports/v2.0/end-of-phase-23/id-inventory.json` serves the same verification purpose (anchors the diff against the pre-phase baseline). Visual readability of the reference frame was verified via inline `get_screenshot` during plan 23-05 execution; the rendered image showed correct token colors, type specimens, spacing stripes, and the dark-mode omission note.

**Zero-mutation diff result (VAL-23-05):** PASS. All 15 baseline Crito frames retain identical direct-child id sets per `.planning/research/exports/v2.0/end-of-phase-23/id-inventory.json` (matches `../baseline-23/id-inventory.json` exactly for the 15 baseline rows). One NEW top-level frame added: `_Tokens & Foundations` (`RpGbe`) — the only legitimate addition per plan 23-05 scope.

**Reference frame readability:** APPROVED by user (2026-05-31). Inline `get_screenshot` review confirmed every swatch labelled, every type specimen renders correctly, spacing stripes visually distinguishable, dark-mode note visible inside the frame, layout fits one screenshot.

**Zero-mutation diff status:** APPROVED by user (2026-05-31). Structural JSON diff at `.planning/research/exports/v2.0/end-of-phase-23/id-inventory.json` shows every baseline Crito frame's direct-child id set matches the pre-phase baseline; user confirmed acceptance via Task 3 spot-check.

---

## Coverage Checkpoint (23-01 end)

**Unique color values found via manual `batch_get` enumeration:** 18 solid-fill colors + 5 shadow colors with alpha = 23 distinct values (exceeds D-05 threshold of ≥5).
**Unique font sizes found:** 10 (`14, 16, 18, 32, 40, 48, 60, 64, 70, 300`) — exceeds D-05 threshold of ≥3.
**Unique font families found:** 5 (`Plus Jakarta Sans, Inter, Poppins, Nunito, Chivo`).
**Spacing scale pattern visible:** YES (multiples of 4) — primary ladder `16, 24, 32, 40, 60` with secondary `10/20` track (see OPEN-23-07).

**Verdict:** PASS

**Action:** Proceed to plan 23-02 / 23-03 / 23-04 / 23-05.

Coverage thresholds (per CONTEXT D-05: `N_colors ≥ 5 AND N_sizes ≥ 3 AND spacing pattern visible`) all met. Audit revealed nine OPEN flags (1 notable for export_nodes tooling, 3 notable for token-mining surface limitations, 5 minor for scale resolution decisions); none are blockers for Phase 23 close per D-09. Plans 23-03 and 23-04 will populate the primitive and semantic token tiers respectively, drawing primary evidence from Home Page (`ujMLJ`) editable nodes + this catalog. Crito .fig fallback per D-04 remains available if any specific token value needs ground-truth confirmation during 23-03 execution.

---

## Dark-Mode Omission Rationale (TOKEN-07 + D-01)

**Decision (CONTEXT D-01):** Omit dark slots entirely from the v2.0 token surface. No `@light,@dark` Pencil variable syntax. Tokens are single-theme for v2.0.

**Why this is not an oversight:** STACK.md originally recommended encoding `@light,@dark` at definition time with dark stubbed to mirror light (retrofitting later is more expensive). CONTEXT D-01 reverses that recommendation for v2.0 because:

- Pre-naming `--color-surface-dark` slots is a form of premature commitment (PITFALLS O3).
- Dark mode is explicitly deferred per TOKEN-07 and the v2.0 PROJECT.md scope.
- A future milestone will design dark values from scratch with fresh decisions — no pre-named slots.

**Forbidden token-name patterns in this milestone:**

- Anything containing `@dark`, `@light`, `-dark`, `-light` as a suffix or theme marker.
- Anything carrying a per-theme variant in the value field (no `{value, theme}` arrays in `set_variables` calls).

**For downstream readers (Phase 24+ planners, Phase 32 handoff writer, next code milestone):**

- The absence of dark token slots in `get_variables({})` is intentional and load-bearing.
- Do not add `@light,@dark` syntax retroactively in any v2.0 phase.
- Dark mode lives in a later milestone; pre-emptive slots in this one are out of scope.

**Cross-reference:** CONTEXT.md D-01 (decision), D-02 (this documentation requirement), TOKEN-07 (requirement), RESEARCH.md `## State of the Art` (the reversed STACK recommendation). Per D-02, this rationale also appears as a visible note inside the `_Tokens & Foundations` reference frame built by plan 23-05.

---

## Tokens Written — Primitives

**Written:** 2026-05-31 by plan 23-03 via `mcp__pencil__set_variables` (one probe call + one batch call; verified via `get_variables({})`).

**Source label convention (per VAL-23-04):** `source: search_all_unique_properties` refers to the manual `batch_get` enumeration that substituted for the missing Pencil tool (see OPEN-23-02). Every value traces to a specific frame documented in `## Audit Findings — Unique Property Values` above. `source: Crito .fig` would be used for values pulled from the fig fallback per D-04 (none in this batch — all values came from the live Pencil audit). `source: OPEN flag` would tag any token whose value is intentionally placeholder pending downstream phase resolution (none in this batch).

**Probe outcome:** Pencil `set_variables` argument shape is `{ "<token-name>": { "type": "color"|"number"|"string", "value": <hex|number|string> } }` per Pencil schema; merge-by-default (no `replace: true` flag needed). Probe token `color-primitive-amber-500 = "#fdba09"` written and verified before the batch call.

**Drift sanity check (RESEARCH Pitfall 1):** 39 primitives vs ~66 distinct unique-property values in `## Audit Findings`. Drift = 0.59× — well below the ~2× cap. In fact the primitive set is *smaller* than the audit's unique-property set because OPEN-23-09 culled Crito-template-marketplace-only fonts (Poppins, Nunito) and OPEN-23-03 culled the extreme display size (300).

| name | value | source | source-detail |
|---|---|---|---|
| color-primitive-amber-500 | `#fdba09` | search_all_unique_properties | Distinctive Crito brand color; appears as fill on 3 banner frames (Information, Free Design Sample, FULL DESIGN PREVIEW). Candidate primary brand color for Joel. |
| color-primitive-cyan-500 | `#15bee3` | search_all_unique_properties | Home Page Hero `Logo` group Rectangle 1532 (1600×96 partner-logo strip bg). |
| color-primitive-green-500 | `#38da71` | search_all_unique_properties | Home Page Hero primary CTA button fill (`Button/Primary/With Icon` 200×60 cornerRadius 10). |
| color-primitive-coral-400 | `#ff928a` | search_all_unique_properties | Home Page Hero `Ellipse 476` (286×225 decorative shape behind hero headline); also `We help to grow` shape (88×88). |
| color-primitive-red-400 | `#eb5757` | search_all_unique_properties | About Me email text (Poppins 40/600). OUT-OF-SCOPE-frame source but kept as universal error/destructive primitive. |
| color-primitive-navy-900 | `#141f39` | search_all_unique_properties | Home Page Hero `Rectangle 1531` (1600×1246 hero bg); Testimonial section bg; Performance is the key section bg; primary text-on-light color throughout Home Page. Primary surface-dark + text-primary value. |
| color-primitive-neutral-700 | `#52525b` | search_all_unique_properties | Home Page Footer body text (Chivo 16 / Chivo 14 copyright). Primary mid-tone neutral. |
| color-primitive-neutral-200 | `#d4d4d8` | search_all_unique_properties | Home Page "Better security" `Line 94` stroke (1px). Border/divider candidate. |
| color-primitive-neutral-100 | `#f2f2f7` | search_all_unique_properties | Home Page "We help to grow" Dashboard `Rectangle 8` (1156×722 light surface). |
| color-primitive-neutral-50 | `#fafafa` | search_all_unique_properties | Home Page Footer bg, "Why will you choose" bg, "How to grow your business" bg. Primary off-white surface. |
| color-primitive-white | `#ffffff` | search_all_unique_properties | Home Page bg, Card bgs throughout, hero/subtitle text on dark surfaces. |
| color-primitive-black | `#000000` | search_all_unique_properties | Crito banner text (Information / Free Design Sample / FULL DESIGN PREVIEW — Poppins 300). Universal pure black. |
| space-primitive-9 | `9` | search_all_unique_properties | Home Page Hero `Frame 1` check-icon-text group gap (CTA bullet items "No credit card", "Get 15 days free trial"). Crito-specific half-step per OPEN-23-07; kept for accurate primitive coverage. |
| space-primitive-10 | `10` | search_all_unique_properties | Home Page Hero CTA buttons gap; Crito section banner frame gap. Crito-specific half-step per OPEN-23-07. |
| space-primitive-16 | `16` | search_all_unique_properties | Home Page testimonial spacing (cards layout); Hero CTA frame stroke + inner gaps. Foundational 4-multiple. |
| space-primitive-20 | `20` | search_all_unique_properties | Home Page Hero CTA `Button/Primary/With Icon` internal padding-horizontal `[16, 20]`. |
| space-primitive-24 | `24` | search_all_unique_properties | Home Page Hero `Auto Layout Vertical` (gFfJG) gap (`My Profile` profile-text spacing). Common form-field + card-grid gap per Pencil guideline. |
| space-primitive-32 | `32` | search_all_unique_properties | About Me `Frame 2` ("Need Custom Design?" group) gap. Common screen-section gap per Pencil guideline. |
| space-primitive-40 | `40` | search_all_unique_properties | About Me `My Profile` profile gFfJG inner gap (40 between major child groups); `Frame 1` ("Want to Donate?") gap. |
| space-primitive-60 | `60` | search_all_unique_properties | Home Page Hero Menu bar gap; About Me top-level frame gap; My Profile horizontal-row gap. Large section-spacing value. |
| type-primitive-size-14 | `14` | search_all_unique_properties | Home Page Footer copyright text (Chivo 14 normal). Smallest text size in IN-SCOPE frames. |
| type-primitive-size-16 | `16` | search_all_unique_properties | Home Page Hero menu items (Inter 16/500); Home Page CTA bullet text (Inter 16/normal); Home Page Footer "Phasellus..." body (Chivo 16/normal). Primary body size. |
| type-primitive-size-18 | `18` | search_all_unique_properties | Home Page Hero subtitle (Inter 18/normal opacity 0.7). Sub-headline / large-body candidate. |
| type-primitive-size-48 | `48` | search_all_unique_properties | Home Page section headings (Plus Jakarta Sans 48/700 — "Why Will You Choose", "How To Grow Your Business", "Ready To Use Our App", "We Help To Grow Your Business"). Primary section-heading size. |
| type-primitive-size-70 | `70` | search_all_unique_properties | Home Page Hero headline "Smart-Thinking & Innovative Solution." (Plus Jakarta Sans 70/700). Display-tier size. |
| type-primitive-weight-400 | `"400"` | search_all_unique_properties | Inter body text (`fontWeight: "normal"` → 400); Chivo body text. Stored as string per Pencil schema. |
| type-primitive-weight-500 | `"500"` | search_all_unique_properties | Home Page Hero menu items (Inter 16/500). |
| type-primitive-weight-700 | `"700"` | search_all_unique_properties | Home Page Plus Jakarta Sans section headings + Hero headline (all 700). |
| type-primitive-family-display | `"Plus Jakarta Sans"` | search_all_unique_properties | Home Page section headings + Hero headline. Per OPEN-23-09: included. |
| type-primitive-family-body | `"Inter"` | search_all_unique_properties | Home Page body text + descriptions + menu + bullets + testimonial. Primary body family. Per OPEN-23-09: included. |
| type-primitive-family-footer | `"Chivo"` | search_all_unique_properties | Home Page Footer copyright + Footer paragraph. Per OPEN-23-09: included conditionally. Phase 24+ may decide to replace with Inter and remove this primitive — kept for now for fidelity. |
| type-primitive-lh-tight | `1.2` | search_all_unique_properties | Home Page Hero headline (Plus Jakarta Sans 70/700). |
| type-primitive-lh-heading | `1.4` | search_all_unique_properties | Home Page Plus Jakarta Sans section headings (`1.399999976158142` rounded). |
| type-primitive-lh-snug | `1.5` | search_all_unique_properties | Home Page Hero menu (Inter 16/500); various 16px supporting text. |
| type-primitive-lh-normal | `1.6` | search_all_unique_properties | Home Page Inter body text (`1.600000023841858` rounded). Default body line-height. |
| type-primitive-lh-loose | `1.625` | search_all_unique_properties | Home Page Footer body (Chivo 16/normal). |
| radius-primitive-10 | `10` | search_all_unique_properties | Home Page Hero CTA buttons (`Button/Primary/With Icon` 200×60); Testimonial Review 2 + Review 3 cards (416×250). |
| radius-primitive-16 | `16` | search_all_unique_properties | Home Page "We help to grow" Dashboard internal frames (`Frame 1334`, `Frame 1341`, `Frame 32`) — sub-pixel `16.0556` rounded to `16` per OPEN-23-08. |
| radius-primitive-24 | `24` | search_all_unique_properties | Home Page "We help to grow" Dashboard outer frame (`A65lo` 1156×722) — sub-pixel `24.0833` rounded to `24` per OPEN-23-08. |

**Count summary:** 12 color + 8 space + 5 type-size + 3 type-weight + 3 type-family + 5 type-lh + 3 radius = **39 primitives**.

**Zero-mutation spot-check (VAL-23-05 line 2):** Post-write `batch_get(readDepth=1)` on `MIXGf`, `ujMLJ`, `QdwxP` confirmed direct-child id sets match the baseline at `.planning/research/exports/v2.0/baseline-23/id-inventory.json` exactly. No existing Crito frame was modified by the `set_variables` call.

---

## Aliasing Strategy (resolved in plan 23-04 probe)

**Aliasing Path: NATIVE.** Pencil supports variable-to-variable aliasing using the `$<name>` reference syntax in the `value` field of `set_variables`. Probe call wrote `{"color-semantic-bg-accent": {"type": "color", "value": "$color-primitive-amber-500"}}` and `get_variables({})` returned the reference preserved verbatim (not flattened to `#fdba09`). All 56 semantic aliases use this shape; downstream phases can reference semantic names directly and Pencil resolves through to the primitive value at render time.

No DESCRIPTION-FALLBACK needed. RESEARCH Open Question 2 is resolved.

---

## Tokens Written — Semantic Aliases

**Written:** 2026-05-31 by plan 23-04 via `mcp__pencil__set_variables` (one probe call + one batch call of 55 aliases; verified via `get_variables({})`). Every alias uses NATIVE `$<primitive-name>` reference syntax. Per CONTEXT D-14, components in Phases 24-32 reference these semantic names only — primitives are not exposed to component-author plans.

| semantic_name | primitive_referenced | aliasing_path | source | source-detail |
|---|---|---|---|---|
| color-semantic-bg-page | color-primitive-white | NATIVE | search_all_unique_properties | Home Page outer frame `ujMLJ` fill (`#ffffffff`). |
| color-semantic-bg-surface | color-primitive-neutral-50 | NATIVE | search_all_unique_properties | Footer bg + "Why will you choose" + "How to grow your business" + "Why-will-you-choose" section backgrounds. |
| color-semantic-bg-surface-elevated | color-primitive-neutral-100 | NATIVE | search_all_unique_properties | Dashboard `Rectangle 8` (1156×722 light surface inside "We help to grow"). |
| color-semantic-bg-inverse | color-primitive-navy-900 | NATIVE | search_all_unique_properties | Hero `Rectangle 1531` (1600×1246); Testimonial section bg; Performance is the key section bg. Primary dark-surface role. |
| color-semantic-bg-accent | color-primitive-amber-500 | NATIVE | search_all_unique_properties | Crito banner accent (distinctive brand color). Probe alias from Task 1. |
| color-semantic-bg-brand | color-primitive-cyan-500 | NATIVE | search_all_unique_properties | Hero `Logo` group Rectangle 1532 (partner-logo strip bg). Secondary brand surface. |
| color-semantic-bg-cta-primary | color-primitive-green-500 | NATIVE | search_all_unique_properties | Hero `Button/Primary/With Icon` fill (200×60 primary CTA). |
| color-semantic-text-primary | color-primitive-navy-900 | NATIVE | search_all_unique_properties | Primary text color on light surfaces (Hero section headings, body text on white sections). |
| color-semantic-text-secondary | color-primitive-neutral-700 | NATIVE | search_all_unique_properties | Footer body text + copyright (Chivo); supporting/muted text role. |
| color-semantic-text-inverse | color-primitive-white | NATIVE | search_all_unique_properties | Hero headline + subtitle text on navy bg; menu items; CTA bullet text. |
| color-semantic-text-accent | color-primitive-amber-500 | NATIVE | search_all_unique_properties | Accent text role (rare use; reserved for highlight text against neutral surfaces). |
| color-semantic-text-error | color-primitive-red-400 | NATIVE | search_all_unique_properties | Error/destructive text role. |
| color-semantic-border-default | color-primitive-neutral-200 | NATIVE | search_all_unique_properties | Home Page "Better security" `Line 94` stroke (1px). |
| color-semantic-decorative-coral | color-primitive-coral-400 | NATIVE | search_all_unique_properties | Hero `Ellipse 476` decorative shape (286×225); "We help to grow" shape (88×88). |
| space-semantic-section-y | space-primitive-60 | NATIVE | search_all_unique_properties | Home Page Hero Menu bar gap; About Me top-level frame gap. Large section-spacing. |
| space-semantic-container-x | space-primitive-24 | NATIVE | search_all_unique_properties | Home Page Hero `Auto Layout Vertical` gap. Common container horizontal-padding role. |
| space-semantic-stack-sm | space-primitive-16 | NATIVE | search_all_unique_properties | Home Page testimonial cards layout + Hero CTA frame inner gaps. |
| space-semantic-stack-md | space-primitive-24 | NATIVE | search_all_unique_properties | Form-field-vertical-gap-equivalent + card-grid-gap-equivalent. |
| space-semantic-stack-lg | space-primitive-40 | NATIVE | search_all_unique_properties | About Me My Profile gFfJG inner gap; Frame 1 ("Want to Donate?") gap. |
| space-semantic-inline-sm | space-primitive-9 | NATIVE | search_all_unique_properties | Home Page Hero check-icon-text group gap ("No credit card", "Get 15 days free trial"). |
| space-semantic-inline-md | space-primitive-16 | NATIVE | search_all_unique_properties | Inline elements default gap. |
| space-semantic-inline-lg | space-primitive-20 | NATIVE | search_all_unique_properties | Hero CTA `Button/Primary/With Icon` internal horizontal padding (`[16, 20]` → horizontal=20). |
| space-semantic-button-px | space-primitive-20 | NATIVE | search_all_unique_properties | Hero CTA buttons horizontal padding. |
| space-semantic-button-py | space-primitive-16 | NATIVE | search_all_unique_properties | Hero CTA buttons vertical padding. |
| type-semantic-display-family | type-primitive-family-display | NATIVE | search_all_unique_properties | Hero headline "Smart-Thinking & Innovative Solution." (Plus Jakarta Sans). |
| type-semantic-display-size | type-primitive-size-70 | NATIVE | search_all_unique_properties | Hero headline 70px. |
| type-semantic-display-weight | type-primitive-weight-700 | NATIVE | search_all_unique_properties | Hero headline fw 700. |
| type-semantic-display-lh | type-primitive-lh-tight | NATIVE | search_all_unique_properties | Hero headline `1.2` line-height. |
| type-semantic-heading-1-family | type-primitive-family-display | NATIVE | search_all_unique_properties | Home Page section headings (Plus Jakarta Sans). |
| type-semantic-heading-1-size | type-primitive-size-48 | NATIVE | search_all_unique_properties | Home Page section headings 48px. |
| type-semantic-heading-1-weight | type-primitive-weight-700 | NATIVE | search_all_unique_properties | Home Page section headings fw 700. |
| type-semantic-heading-1-lh | type-primitive-lh-heading | NATIVE | search_all_unique_properties | Home Page section headings `1.4` line-height. |
| type-semantic-body-family | type-primitive-family-body | NATIVE | search_all_unique_properties | Home Page body text (Inter). |
| type-semantic-body-size | type-primitive-size-16 | NATIVE | search_all_unique_properties | Home Page body 16px (Inter). |
| type-semantic-body-weight | type-primitive-weight-400 | NATIVE | search_all_unique_properties | Home Page body fw normal/400. |
| type-semantic-body-lh | type-primitive-lh-normal | NATIVE | search_all_unique_properties | Home Page body `1.6` line-height. |
| type-semantic-body-sm-family | type-primitive-family-body | NATIVE | search_all_unique_properties | Home Page small body (Inter). |
| type-semantic-body-sm-size | type-primitive-size-14 | NATIVE | search_all_unique_properties | Home Page Footer copyright 14px / supporting text. |
| type-semantic-body-sm-weight | type-primitive-weight-400 | NATIVE | search_all_unique_properties | Home Page small body fw normal/400. |
| type-semantic-body-sm-lh | type-primitive-lh-snug | NATIVE | search_all_unique_properties | Home Page Footer Inter 16/1.5 + supporting 16px text. |
| type-semantic-caption-family | type-primitive-family-footer | NATIVE | search_all_unique_properties | Home Page Footer copyright (Chivo). |
| type-semantic-caption-size | type-primitive-size-14 | NATIVE | search_all_unique_properties | Home Page Footer copyright 14px. |
| type-semantic-caption-weight | type-primitive-weight-400 | NATIVE | search_all_unique_properties | Home Page Footer copyright fw normal/400. |
| type-semantic-caption-lh | type-primitive-lh-snug | NATIVE | search_all_unique_properties | Home Page Footer Chivo 14/1.4286 (rounded to lh-snug=1.5; exact 1.4286 deferred per OPEN-23-08-style sub-pixel). |
| type-semantic-button-family | type-primitive-family-body | NATIVE | search_all_unique_properties | Home Page Hero CTA labels + menu items (Inter). |
| type-semantic-button-size | type-primitive-size-16 | NATIVE | search_all_unique_properties | Hero CTA labels 16px. |
| type-semantic-button-weight | type-primitive-weight-500 | NATIVE | search_all_unique_properties | Hero menu items fw 500 (used here for button label hierarchy — Hero CTA labels are at fw 500 per audit). |
| type-semantic-button-lh | type-primitive-lh-snug | NATIVE | search_all_unique_properties | Hero menu lh 1.5; button labels follow same. |
| type-semantic-prose-paragraph-family | type-primitive-family-body | NATIVE | search_all_unique_properties (Home Page body proxy — see OPEN-23-11) | Home Page body Inter; provisional prose paragraph family pending Crito Blog frame consultation (OPEN-23-06: Blog frame is flat raster, so this provisional value will be confirmed via Crito .fig per D-04 during Phase 28). |
| type-semantic-prose-paragraph-size | type-primitive-size-16 | NATIVE | search_all_unique_properties (Home Page body proxy — see OPEN-23-11) | Home Page body 16px (provisional). |
| type-semantic-prose-paragraph-weight | type-primitive-weight-400 | NATIVE | search_all_unique_properties (Home Page body proxy — see OPEN-23-11) | Home Page body fw normal/400 (provisional). |
| type-semantic-prose-paragraph-lh | type-primitive-lh-normal | NATIVE | search_all_unique_properties (Home Page body proxy — see OPEN-23-11) | Home Page body `1.6` line-height (provisional). |
| radius-semantic-button | radius-primitive-10 | NATIVE | search_all_unique_properties | Hero `Button/Primary/With Icon` cornerRadius 10. |
| radius-semantic-card | radius-primitive-10 | NATIVE | search_all_unique_properties | Testimonial Review 2 + Review 3 cards cornerRadius 10. |
| radius-semantic-input | radius-primitive-10 | NATIVE | search_all_unique_properties (provisional — no input shown in Home Page; matches button radius by convention) | Default input radius proxied to button radius until Phase 24 component-primitive surface confirms. |
| radius-semantic-surface | radius-primitive-24 | NATIVE | search_all_unique_properties | Home Page "We help to grow" Dashboard outer frame (`A65lo` 1156×722 sub-pixel `24.0833` rounded). |

**Count summary:** 14 color + 10 space + 24 type (6 roles × 4 sub-properties) + 4 prose (paragraph only — link/list/inline-code OPEN per OPEN-23-11) + 4 radius = **56 semantic aliases**.

**Cumulative variables in `design/Crito.pen`:** 39 primitives + 56 semantic = **95**. Audit unique-property count was 66; total 95 / 66 = 1.44× — within drift cap.

**Coverage vs TOKEN-02..TOKEN-06 role checklist:**
- ✓ Color: bg-page, bg-surface, bg-surface-elevated, bg-inverse, bg-accent, bg-brand, bg-cta-primary, text-primary, text-secondary, text-inverse, text-accent, text-error, border-default, decorative-coral.
- ✓ Spacing: section-y, container-x, stack-{sm,md,lg}, inline-{sm,md,lg}, button-px, button-py.
- ✓ Typography: display, heading-1, body, body-sm, caption, button. ⚠ heading-2..heading-6 OPEN per OPEN-23-10 (no intermediate primitives).
- ✓ Prose paragraph (provisional). ⚠ prose-link, prose-list, prose-inline-code OPEN per OPEN-23-11.
- ✓ Radius: button, card, input, surface. ⚠ pill OPEN per OPEN-23-12.

**Zero-mutation spot-check (VAL-23-05 line 2):** Post-write `batch_get(readDepth=1)` on `ujMLJ` (10 children, IN-SCOPE Home Page), `cl8tt` (flat-raster Contact frame, 0 children), `maDc3` (flat-raster Business Consulting, 0 children) confirmed direct-child id sets unchanged from baseline. `set_variables` aliasing writes to the document-level variables map only.

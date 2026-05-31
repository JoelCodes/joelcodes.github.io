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

15 top-level Crito frames + 2 joel-only-no-crito-ref placeholder rows (per CONTEXT D-08) = 17 entries.

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
| OPEN-23-09 | token | minor | Three Crito-template-only fonts (`Poppins`, `Nunito`, `Chivo`) are used by OUT-OF-SCOPE frames (View More, About Me, banners, Footer). Decide during plan 23-03 whether to include them in `type-primitive-*` tokens (and let Phase 31 decide if Joel's Homepage uses Poppins for visual fidelity) or exclude them entirely. Provisional decision: include `Plus Jakarta Sans` and `Inter` as primitives; include `Chivo` if Footer copy needs it; exclude `Poppins` + `Nunito` (template-only). | 31 (Homepage rebuild) |

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

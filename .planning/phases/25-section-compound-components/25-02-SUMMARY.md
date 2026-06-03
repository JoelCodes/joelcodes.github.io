---
phase: 25-section-compound-components
plan: 25-02
type: summary
status: in_progress
wave: 2
started: 2026-06-03
---

# Plan 25-02 Summary — Section / Footer

**STATUS: Task 0 complete. Crito Footer source audited; key corrections to Phase 24 PEN-INVENTORY assumptions surfaced. Tasks 1-4 pending.**

This plan ships `Section / Footer` (COMP-06) inside `_Components / Sections` (g9oRa5), adds a Substack atomic-glyph component per D-46 Pattern B (resolves OPEN-24-13), and validates lucide Instagram Pattern A per D-45.

---

## Active-Editor Pre-flight Result (D-54)

`mcp__pencil__get_editor_state({ include_schema: false })` called at plan start. Active editor `/Users/joel/Desktop/Claude-Demos/joel-shinness-website/design/Crito.pen` confirmed. Reusable count = 9 (Phase 24 primitives + Plan 25-01's Secondary + Section/Header).

## Plan 25-01 Verification (Outputs Intact)

- `G0wNOc` Section/Header: present in g9oRa5, reusable:true ✓
- `hIWuC` Primitive/Button/Secondary: present in avgor, reusable:true ✓
- Phase 24 baselines: M7eUr, YJhRv, gQa2R, AvKtA, V4Dx4i, ATJK9 UNMUTATED ✓
- Plan 25-01 SUMMARY committed (`fb32ace`) ✓

## Crito Footer Source Audit (D-48, D-55 strict source-wins)

**Parent `Y1ldm` Footer (group)** at x:213, y:7616 inside `ujMLJ` Home Page.

**Background:** `sHon5` rectangle at (x:0, y:7537) of ujMLJ, fill `#fafafaff` (NOT navy as Plan 25-02 originally assumed — bound to `color-semantic-bg-surface` per token surface), width 1600, height 506.

**Footer structure (3 main children):**

### 1. `gAmiq` Information group (brand-column) at x:0, y:0

| sub_id | role | content / properties |
|---|---|---|
| `SyBkk` Logo group | Crito wordmark + multicolor vector icon | `KOmXC` "Crito" (DM Sans 36/700, navy `#141f39ff`, letterSpacing -0.72) + `LGZmB` multicolor vector group (NOT shippable — Crito-only brand icon; Joel-brand wordmark slot pattern from Header applies here) |
| `dPtB2` tagline text | Lorem ipsum filler | "Phasellus pulvinar porta turpis sit amet facilis sapien bibendum eu praesent massa." (Chivo 16/normal, `#52525bff`, lineHeight 1.625, width 341 fixed-width). Per D-48 strict source-wins, ship literal text at component level; Phase 31 overrides with Joel's actual tagline. |
| `8VArH` Mobile group | "(888) 1234-5678" with phone icon | Chivo 16/normal, `#52525bff` |
| `BOKsa` Email group | "info@example.com" with mail icon | Chivo 16/normal, `#52525bff` |
| `c5V2I` Button 01 (raster) | image fill `images/image-import-4.png` | NOT reconstructable — raster-baked. Likely App Store badge or similar. Skip per Pitfall 7 (don't pretend to ship inferred). |
| `1748d` Button 02 (raster) | image fill `images/image-import-2.png` | Same — raster-baked, skip. |
| `UVx0j` Social Media | 3 social icons | **`BhYOn` Instagram (bx:bxl-instagram-alt), `2P1I5` Twitter (akar-icons), `eky09` LinkedIn (akar-icons)** — Crito source HAS Instagram already; PEN-INVENTORY OPEN-24-13 incorrectly stated "LinkedIn + Twitter only". |

### 2. `iHrsm` Short Links group at x:588, y:25

**3 link columns** (not 4 as plan/RESEARCH assumed):

| column_id | heading text (Chivo 16/700, navy `#141f38ff`) | link list (Chivo 16/normal, `#52525bff`) |
|---|---|---|
| `0Ty39` Resources | "Resources" | "Tools" (R2n7U), "Guides and resources" (Ucknw), "Team" (It3fb), "Support" (psEMK) |
| `toAtb` Help & Support | "Help & Support" | "FAQ" (iHpii), "Blog" (ckdHQ), "Contact Us" (aXMv2), "Support" (LsT2d) |
| `TqQco` Useful Links | "Useful Links" | "Features" (sT19n), "About" (iX8FY), "Service" (DfI13), "Team" (KELgt) |

Per D-48 strict source-wins, component ships literal Crito text. Phase 31 Joel-brand instance overrides with Joel's actual link set.

### 3. `8Kx6s` Copyright text at x:960, y:327

Content: `"© 2024 Crito. All Right Reserved"` (Chivo 14/normal, `#52525bff`, opacity 0.8, textAlign right, textAlignVertical bottom).

## Decisions (Open Questions 4, 6 + new source corrections)

### Open Q4: Newsletter Subscribe input
**Resolved:** NOT shipped. Audit shows zero newsletter input in `Y1ldm` source. The 2 image-based buttons (`c5V2I`, `1748d`) are raster-baked and not reconstructable. Per Pitfall 7 (no inferred components without source), skip Newsletter at component level. Future Joel-side Newsletter section can be added in a later phase or at Phase 31 instance time as a separate component.

### Open Q6: Chivo token strategy
**Resolved:** Reference primitive directly (`type-primitive-family-chivo`) — no new semantic alias. Per RESEARCH Open Q6 default + Pitfall 7 (no premature token hierarchies). Phase 23's Chivo primitive earns its keep — all Footer typography uses Chivo per D-47.

### NEW: Source corrections (will seed OPEN-25-NN at Task 4)
- **Correction A:** Crito Footer actually HAS Instagram (`BhYOn` bx:bxl-instagram-alt) in addition to Twitter + LinkedIn. Phase 24 PEN-INVENTORY OPEN-24-13 description was incorrect.
- **Correction B:** Crito has 3 link columns, not 4 as RESEARCH § Recommended Footer Structure anticipated.
- **Confirmation:** Substack is NOT in Crito source (consistent with OPEN-24-13). Pattern B atomic-glyph still needed for Substack.

### Joel-brand glyph plan (per D-45/D-46 + user gate Plan 25-02 selection)
- **Instagram:** Ship via lucide Pattern A (Task 1 probe verifies availability). If lucide rejects Instagram, fall back to Pattern B atomic-glyph.
- **Substack:** Ship via Pattern B atomic-glyph using simpleicons canonical SVG (Task 2).
- **Twitter + LinkedIn:** NOT shipped at Joel's component level per Pitfall 7 — Joel uses Instagram + Substack. Phase 31 Hero/Homepage instance does NOT need to re-override the social row.

## Lucide Instagram Probe (Task 1 — D-45 verification)

**Outcome: Pattern A WORKS for Instagram.**

Inserted probe artifact `H3nL3` inside avgor: `{type: "icon", library: "lucide", icon: "instagram", width: 24, height: 24, fill: "#141f39ff"}`. Returned successfully with no errors and no rejection warnings. `batch_get` confirmed the icon node retained all expected properties. `get_screenshot` rendered (24×24 thumbnail).

RESEARCH § lucide#2792 deprecation note applies as documentation-only: glyph still ships from the lucide library in Pencil's current build. No fallback to Pattern B needed for Instagram.

Probe artifact deleted at task close (`Delete("H3nL3")`) per Phase 24 plan 24-04 probe-cleanup precedent.

**Resolution for Plan 25-02 Task 3:** Section/Footer social-row will insert Instagram via Pattern A `type:icon library:lucide icon:instagram`. Substack via Pattern B atomic-glyph (Task 2 deliverable).

## Substack Atomic-Glyph Build (Task 2 — D-46 Pattern B)

**Inserted as reusable component inside avgor:**

| id | role | properties |
|---|---|---|
| `AzmgQ` | parent frame | name `Primitive / Icon / glyphs / substack`, reusable:true, width:24, height:24, fill transparent (`enabled:false`) — wraps the path so consumers can `ref` it like Pattern A icons |
| `MSKR6` | path child | name "substack", viewBox `[0, 0, 24, 24]`, fill `#141f39ff` (navy default for light-bg Footer context — consumers can override via descendants) |

**SVG path provenance (D-46 source-citation discipline):**
- Source: simpleicons.org "Substack" canonical, verified 2026-06-01
- Original (absolute commands): `M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z`
- Pencil-stored (Pencil normalized absolute H/V/L → relative h/v/l forms): `M22.539 8.242h-21.079v-2.836h21.08v2.836z m-21.079 2.57v13.188l10.54-5.89 10.54 5.89v-13.188h-21.08z m21.08-10.812h-21.08v2.836h21.08v-2.836z`
- Equivalence: both forms render the identical Substack mark (3 horizontal newspaper-style bars with the middle bar's bottom forming a V at column-x ~12). Pencil's normalization is a syntactic transform, not a geometric change.

**Reusable count:** 10 (Phase 24's 7 + Plan 25-01's Secondary + Section/Header + Substack glyph).

## Next: Task 3 — build Section/Footer parent + children

Task 3 will:
1. Pre-flight.
2. Build Footer parent inside g9oRa5 (width 1200 matching Header, vertical layout, padded, bg `#fafafaff`/`color-semantic-bg-surface` per audit).
3. Build main-row (horizontal: brand-column + 3 link columns).
4. Build brand-column: logo-slot (Crito wordmark placeholder), tagline (Chivo 16/normal, source literal), social-row with Instagram (Pattern A lucide) + Substack (Pattern B ref to AzmgQ).
5. Build 3 link columns from Crito audit (Resources, Help & Support, Useful Links).
6. Build copyright-row with source literal "© 2024 Crito. All Right Reserved" (Chivo 14).
7. Capture screenshot.

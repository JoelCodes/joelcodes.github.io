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

## Next: Task 1 — lucide Instagram probe (D-45 Pattern A verification)

Task 1 will:
1. Pre-flight `get_editor_state`.
2. Probe-insert a test Instagram icon via `batch_design` Insert with `type: icon, library: "lucide", icon: "instagram"`.
3. Verify via `batch_get` whether the icon renders correctly.
4. Capture probe outcome + delete the test artifact.
5. CHECKPOINT — surface probe outcome to user before Task 2 Substack build.

If lucide Instagram works → Pattern A for Instagram in Section/Footer.
If lucide Instagram rejects/breaks → Pattern B fallback for Instagram alongside Substack.

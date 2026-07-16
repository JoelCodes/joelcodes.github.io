# Phase 36 — Figma Extraction Artifact

> Source of truth for all Phase 36 FIDELITY-GAP values. Extracted 2026-07-16 via figma-desktop MCP
> from file `1tg8wIPcvOVC5tPZ8pkGO2` "Joel Shinness Solutions — Brand Exploration".
> Nodes: Components page `36:5` (Project Card `41:104`: closed `41:45` / expanded `41:95`; FAQ Item `99:25`:
> closed `99:18` / open `99:24`), Landing `12:2` (hero `field` frame `13:21`), Showcase `12:3`
> (Chat Safety Pipeline instances incl. expanded `32:1026`).
> Values not present in Figma are marked `FLAGGED` with their fallback source.

---

## ProjectCard (nodes 41:45 closed / 41:95 expanded — confirms/overrides ServiceCard precedent)

### Card container
| Property | Value | vs ServiceCard precedent | Source |
|---|---|---|---|
| Background | `#FFFFFF` → use `var(--wl-card-bg)` | confirms | 41:45 |
| Border (closed) | `1px solid var(--line, rgba(14,112,120,0.16))` → `var(--color-wl-line)` | confirms | 41:45 |
| Border (expanded) | `1px solid var(--accent, #0E7078)` → `var(--color-wl-accent)` — **stronger border when open** | new | 41:95 |
| Border-radius | `18px` (Figma token `radius/card`) | confirms 18px | 41:45 |
| Shadow | `0 20px 40px -30px rgba(18,51,59,0.5)` (Shadow/Card) → `var(--wl-card-shadow)` | confirms | 41:45 |
| Card width (Figma frame) | 547px (fluid in grid — width is layout concern, not component) | — | 41:45 |
| Overflow | clip; column flex | — | 41:45 |

### Thumb block (NOT in UI-SPEC — present in Figma design; must be built)
| Property | Value | Source |
|---|---|---|
| Height | `308px` | 41:5 |
| Background | `linear-gradient(150.617deg, #0E7078 0%, rgb(20,50,59) 70.721%)` (#14323B) | 41:5 |
| Label | Fraunces Italic 16px, `#FFFFFF`, opacity 0.85, centered, `"SOFT" 0, "WONK" 1` | 41:6 |
| Label content | per-project string (`thumbLabel`) — e.g. "chat-safety pipeline" | 32:1028 |

**Schema impact:** v2 projects.json needs a `thumbLabel` (string) field the UI-SPEC schema lacked. Gradient is identical for all cards (no per-project imagery in Figma).

### Body (closed-state summary content)
| Property | Value | Source |
|---|---|---|
| Body padding | top `26px` / bottom `29px` / left+right `27px` | 41:7 |
| Kicker (eyebrow) | Hanken Grotesk **Bold 12px**, tracking `1.44px` (12%), `var(--color-wl-accent)`, uppercase content | 41:8 |
| gap kicker→title | `8px` | 41:9 |
| Title | **Fraunces Regular 22px** ink (`--wl-ink`), lh normal, SOFT 0 / WONK 1 — NOT `.wl-heading-h3` (21px); needs local 22px | 41:10 |
| gap title→hook | `8px` | 41:11 |
| Hook (outcome line) | **Fraunces Italic 17px, color INK** (not accent), lh normal — differs from `.wl-accent-outcome` (16px accent) | 41:12 |
| gap hook→summary | `10px` | 41:13 |
| Summary | Hanken Grotesk Regular 16px / lh 1.6 / `var(--color-wl-sub)` = `.wl-text-body` | 41:14 |
| gap summary→tags | `18px` | 41:15 |
| Tags row | flex, gap `8px`; Tag = Phase 35 `<Tag>` primitive (accent@8% fill, line border, pill radius, HG 12px sub, px 10px py 4px) | 41:16, 39:44 |
| gap tags→toggle | `21px` | 41:25 |
| Toggle row | flex, gap `7px`, items-center: label + chevron | 41:26 |
| Toggle label | Hanken Grotesk **SemiBold 14px** `var(--color-wl-accent)`; text `Read the story` (closed) / `Hide` (open) | 41:27 / 41:77 |
| Toggle chevron | 16×16 inline SVG (below); rotates 180° when open | 41:28 / 41:78 |

### Toggle indicator SVG (shared closed/open — open state is a 180° rotation)
```svg
<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```
Stroke color in Figma: `#0E7078` (accent) → bind to `var(--color-wl-accent)` / `currentColor`. Direction: chevron-down closed → chevron-up open (CSS `rotate(180deg)` on `details[open]`).

### Expanded detail block (inside body, after toggle)
| Property | Value | Source |
|---|---|---|
| gap toggle→divider | `21px` | 41:81 |
| Divider | `1px` full-width rect, `var(--color-wl-line)` | 41:82 |
| gap divider→first label | `18px` | 41:83 |
| Section labels | **Fraunces Italic 16px `var(--color-wl-accent)`**, SOFT 0 / WONK 1 — matches `.wl-accent-outcome`; NOT `.wl-label-eyebrow` | 41:84/88/92 |
| Label text (verbatim) | `The problem` · `What I built` · `The result` | 41:84/88/92 |
| gap label→body | `3px` | 41:85 |
| Section body | HG Regular 16px / 1.6 / sub = `.wl-text-body` | 41:86/90/94 |
| gap between sections | `18px` | 41:87/91 |

### Hover
`FLAGGED` — no Figma hover spec for ProjectCard. Fallback: ServiceCard-derived subtle treatment (Phase 35 precedent, Joel approved derived hover at Phase 35 gate). Chrome convention `hover:text-wl-accent` applies to links only.

---

## FAQItem (nodes 99:18 closed / 99:24 open)

**Surface resolution:** FAQItem is a **self-contained white card** (like ProjectCard), NOT a divider-list row. No separate divider between items — each item is its own bordered card.

| Property | Value | Source |
|---|---|---|
| Container background | `#FFFFFF` → `var(--wl-card-bg)` | 99:14 |
| Border (closed) | `1px solid var(--color-wl-line)` | 99:14 |
| Border (open) | `1px solid var(--color-wl-accent)` — accent tint when open | 99:19 |
| Border-radius | `14px` | 99:14 |
| Padding | `19px` top/bottom, `24px` left/right (both states) | 99:14 |
| Row layout | question + toggle: flex, gap `16px`, items-center | 99:15 |
| Question type | **Fraunces Regular 18px** `var(--color-wl-ink)`, SOFT 0 / WONK 1 — NEITHER `.wl-text-body-large` (17px HG) nor `.wl-heading-h3` (21px); needs local Fraunces 18px | 99:16 |
| Toggle indicator | Text glyph `+` — Hanken Grotesk Regular **21px** `var(--color-wl-accent)`; rotates **45°** when open (+ → ×) | 99:17 / 99:22 |
| Open gap (row→answer) | `12px` (Figma `--space-sm`) | 99:19 |
| Answer | HG Regular 16px / 1.6 / `var(--color-wl-sub)` = `.wl-text-body` | 99:23 |
| Shadow | none (no card shadow on FAQ items) | 99:14 |
| Item spacing in list | consuming page concern (Phase 37) — not part of component | — |

Note: the FAQ toggle is NOT the chevron SVG — it is a typographic `+` that rotates 45° via CSS on `details[open]`. No SVG needed for FAQItem.

---

## FrequencyWave (node 13:21 "field", Landing 12:2 hero)

| Property | Value | Source |
|---|---|---|
| viewBox | `0 0 1670 1044` | field SVG |
| Group opacity | `0.7` on the whole 5-line group | field SVG |
| Stroke color | `#0E7078` → `var(--color-wl-accent)` (token flips in dark mode) | field SVG |
| Fill | `none` | field SVG |
| preserveAspectRatio | `none` (stretches with container in Figma render) | field SVG |
| Context sizing | Figma frame 1670×1044 positioned x -115 / y -100 behind hero content (1440×840 hero) — full-bleed decorative background | 13:20/13:21 |

### The five paths (top→bottom; per-line opacity and stroke-width)
| # | opacity | stroke-width | d |
|---|---------|--------------|---|
| 1 | 0.14 | 1.73958 | `M-115.972 278.458C347.917 174.083 719.028 382.833 1090.14 266.861C1368.47 179.882 1577.22 348.042 1809.17 255.264` |
| 2 | 0.18 | 1.73958 | `M-115.972 382.833C347.917 278.458 719.028 487.208 1090.14 371.236C1368.47 284.257 1577.22 452.417 1809.17 359.639` |
| 3 | 0.22 | 2.31944 | `M-115.972 498.806C347.917 394.431 719.028 603.181 1090.14 487.208C1368.47 400.229 1577.22 568.389 1809.17 475.611` |
| 4 | 0.20 | 2.31944 | `M-115.972 626.375C347.917 522 719.028 730.75 1090.14 614.778C1368.47 527.799 1577.22 695.958 1809.17 603.181` |
| 5 | 0.15 | 1.73958 | `M-115.972 765.542C347.917 661.167 719.028 869.917 1090.14 753.944C1368.47 666.965 1577.22 835.125 1809.17 742.347` |

stroke-linecap: not set in Figma export (butt default). Line-to-line baseline spacing: 104.4 / 116.0 / 127.6 / 139.2px (progressively wider).

---

## Placeholder card copy — D-09 (Chat Safety Pipeline, verbatim from 41:95 master + 12:3 instance 32:1026)

Duplicated across ALL projects.json v2 entries. Every field verbatim Figma; none FLAGGED.

| Field | Verbatim value |
|---|---|
| eyebrow | `MMORPG · PLAYER SAFETY` |
| title | `Chat Safety Pipeline` |
| outcome | `Kept players safe from chat abuse — at scale.` |
| summary | `A real-time pipeline that flagged and filtered harmful chat across a live game, protecting a large player community without slowing conversation down.` |
| tags | `["Real-time", "Moderation", "Scale", "Pipelines"]` |
| problem | `A live game's chat exposed players — many of them young — to abuse faster than human moderators could keep up with.` |
| built | `A real-time pipeline that scored every message, filtered the worst instantly, and routed the tricky calls to moderators with the context they needed to decide.` |
| result | `Harmful messages caught before they landed, a safer community, and a moderation team freed up for judgment calls instead of endless triage.` |
| thumbLabel (schema addition) | `chat-safety pipeline` |

Entry ids/slugs carried from v1: `bakery-order-system`, `inventory-sync-automation` (each is both `id` AND `slug` per file()-loader requirement).

### Showcase section labels (12:3, verbatim)
- Section eyebrow 1: `CLIENT WORK` (heading: "Software people rely on.")
- Section eyebrow 2: `CRAFT & EXPERIMENTS` (heading: "What I make when no one's paying me.")
- `section` field values remain `client-work` / `craft-experiments` per UI-SPEC schema.

---

## Isolation page order (Components page 36:5, top→bottom by canvas y)

Phase 36 components in Figma order: **Project Card (closed, expanded) → FAQ Item (closed, open)**. FrequencyWave is not on the Components page (source: Landing hero field) — render it last, on both paper and sea-glass surface strips. Full page order for reference: Icons, CTA Button, Eyebrow, Tag, Service Card, Step, Project Card, Site Header, Site Footer, FAQ Item, Callout, Link Card, Breadcrumb, Type Ramp.

---

## Contrast-pair additions for scripts/check-contrast.mjs (from extracted values)

| Pair | Light | Dark (via token flips) | Target |
|---|---|---|---|
| ProjectCard title: ink on card-bg | `#12333B` on `#FFFFFF` | `#EAF6F3` on `#12333B` | 4.5:1 |
| ProjectCard hook: ink on card-bg (17px italic — same ink pair as title) | `#12333B` on `#FFFFFF` | `#EAF6F3` on `#12333B` | 4.5:1 |
| ProjectCard kicker: accent on card-bg (12px bold) | `#0E7078` on `#FFFFFF` | `#4FB3B8` on `#12333B` | 4.5:1 |
| ProjectCard toggle label: accent on card-bg (14px semibold) | `#0E7078` on `#FFFFFF` | `#4FB3B8` on `#12333B` | 4.5:1 |
| ProjectCard body/answer: sub on card-bg | `#35525A` on `#FFFFFF` | `#A9C9C7` on `#12333B` | 4.5:1 |
| Expanded section label: accent on card-bg (16px italic) | `#0E7078` on `#FFFFFF` | `#4FB3B8` on `#12333B` | 4.5:1 |
| FAQ question: ink on card-bg (18px) | `#12333B` on `#FFFFFF` | `#EAF6F3` on `#12333B` | 4.5:1 |
| FAQ toggle `+`: accent on card-bg (21px = large text) | `#0E7078` on `#FFFFFF` | `#4FB3B8` on `#12333B` | 3:1 (large) |
| Thumb label: white on gradient darkest/lightest stops | `#FFFFFF` @ .85 on `#0E7078` and on `#14323B` | same (gradient does not flip) | 4.5:1 |

---

## UI-SPEC FIDELITY-GAP resolution map

| UI-SPEC gap | Resolution |
|---|---|
| ProjectCard closed internal padding | 26/27/29/27 (body); thumb 308px above |
| ProjectCard expanded padding + section gaps | 21 → divider → 18 → label → 3 → body → 18 (repeat) |
| ProjectCard summary row gaps | 8 / 8 / 10 / 18 / 21 (kicker→title→hook→summary→tags→toggle) |
| ProjectCard border-radius / border | 18px; line (closed) / accent (expanded) |
| Section label type class | Fraunces Italic 16px accent (= `.wl-accent-outcome` styling; label text is content) |
| FAQItem question class | local Fraunces Regular 18px ink (no existing `.wl-*` class matches) |
| FAQItem surface | self-contained white card, radius 14px, padding 19/24 |
| FAQItem padding / divider | 19/24px; no inter-item divider (bordered cards) |
| Toggle indicator SVG + color | chevron `M4 6L8 10L12 6` 16×16 accent (ProjectCard); `+` glyph rotate 45° (FAQItem) |
| FrequencyWave viewBox/paths/stroke | `0 0 1670 1044`, 5 paths above, accent stroke, group opacity 0.7 |
| ProjectCard outcome contrast pair | ink-on-white (hook is ink, not accent) — see contrast table |
| ProjectCard hover | FLAGGED — ServiceCard-derived fallback (Phase 35 precedent) |
| Title type class | local Fraunces 22px (UI-SPEC assumed `.wl-heading-h3` 21px — overridden by extraction) |

**Deviations from UI-SPEC discovered in Figma (for executor deviation notes):**
1. Thumb block (gradient + italic label) exists on ProjectCard — UI-SPEC omitted it; `thumbLabel` joins the v2 schema.
2. Outcome/hook line is ink (not accent) and 17px (not 16px).
3. Card title is 22px (not 21px `.wl-heading-h3`).
4. FAQ toggle is a rotating `+` glyph, not a chevron SVG.
5. FAQItem is a bordered card (radius 14) — not a divided list row.
6. Toggle row ("Read the story"/"Hide" + chevron) is an explicit Figma affordance inside the card — include it inside the `<summary>` (D-01 whole-card summary stands; the row is visual, `aria-hidden` not needed since its text is real content).

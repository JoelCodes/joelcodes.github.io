# Phase 38 — Blog + Blog Post Extraction (canonical Figma pages 195:102 / 195:210)

> Extraction for the blog index (`/blog`) and blog post (`/blog/[slug]`) restyle. Source of truth:
> Figma file `1tg8wIPcvOVC5tPZ8pkGO2`, frame `Blog / Desktop · 1440` (**195:103**, page 195:102
> "Site · Blog") and frame `Blog Post / Desktop · 1440` (**195:211**, page 195:210 "Site · Blog Post").
> Extracted 2026-07-19 via claude.ai Figma MCP `get_design_context` on section nodes
> 195:105 / 197:58 / 198:61 / 195:197 (Blog) and 195:213 / 197:1017 / 200:1015 / 200:1043 (Blog Post).
> Every value carries its source node id. Dark values are all **DERIVED** via the D-04 landing recipe
> (`38-EXTRACTION.md` dark table + `src/pages/index.astro` gradient pairs + `global.css` token flips) —
> no dark blog frame exists in Figma. Gaps are marked `[FIDELITY-GAP]`; nothing invented.
>
> **The obsolete drafted page "Blog" (211:2, frames 211:3–211:6) was deleted 2026-07-19 (Joel-approved).
> Any prior artifact citing 211:x nodes (notably the shipped `.wl-prose` block in `global.css`) now
> points at deleted nodes — see §12 for the canonical-vs-shipped prose diff.**

---

## 1. Blog index — Hero (`195:105`)

| Element | Value | Source |
|---|---|---|
| Background (light) | `linear-gradient(to bottom, #E6F1F1, #D2E7E7)` | 195:105 fill |
| Background (dark) | `linear-gradient(to bottom, #123640, #0C2228)` — **DERIVED** (D-04 landing hero pair, `index.astro` L49) | recipe |
| Layout | column flex, `justify-center` (content vertically centered), px 160 @1440 | 195:105 |
| Section height | **500** @1440 (per prior whole-canvas metadata; design context reports `size-full` only) | 195:103 metadata |
| Wave field | node `195:106` "field": 1670 × 1044, offset left −115 / top −100, behind content — **identical geometry to landing hero field 13:21** (see §10) | 195:106 |
| Breadcrumb | `Home  /  Blog` — HG Regular 14px, `#4C6A70` (Breadcrumb component 100:14; existing `--wl-breadcrumb-color` token, dark flip `#A9C9C7` already shipped) | 195:112 / 100:15 |
| Breadcrumb → eyebrow gap | 20px | 195:113 spacer |
| Eyebrow | `PLAIN ANSWERS, WRITTEN DOWN` — Eyebrow instance (34px dash + HG SemiBold 13px, tracking 2.86px, accent `#0E7078`) → `.wl-label-eyebrow` exact match | 195:114 (via 39:35) |
| Eyebrow → h1 gap | 21px | 195:115 spacer |
| h1 copy | `Notes on web, automations, and AI — minus the jargon` | 195:116 |
| h1 style | Fraunces Regular **61px**, lh 1.06, `#12333B` ink, SOFT 0 / WONK 1, width 980 → **`.wl-heading-h1-interior` size/lh match** (see §11 tracking caveat) | 195:116 |
| h1 → lead gap | 26px | 195:117 spacer |
| Lead copy (FULL) | `Short, practical posts for people running a business, not a dev team: what things cost, when a spreadsheet has done its job, where AI actually pays off. The same straight answers you'd get on a call, free to read.` | 195:118 |
| Lead style | HG Regular 21px / 1.6, `#35525A` sub, width 700 → `.wl-text-lead` exact match | 195:118 |

---

## 2. Blog index — Featured (`197:58`)

| Element | Value | Source |
|---|---|---|
| Background (light) | `#F6FBFA` = `var(--color-wl-paper)` | 197:58 fill |
| Background (dark) | `#0C2228` — **DERIVED** (paper token flip, shipped in `global.css .dark`) | recipe |
| Padding / gap | py 96, px 160; section gap 42 (header → card) | 197:58 |
| Header | node 197:59, column gap 21: Eyebrow `LATEST` (197:60 instance) → h2 `Start here.` | 197:59 / 197:63 |
| Section h2 style | Fraunces Regular **50px**, lh 1.06, tracking **−0.75px**, ink → `.wl-heading-h2` size/lh match (ramp tracking is −1.5px — §11) | 197:63 |
| feature-card (197:64) | white bg (`--wl-card-bg`, dark `#12333B` DERIVED via shipped token), border 1px `--wl-line` (`rgba(14,112,120,0.16)`; dark `#5AA9A538` DERIVED), radius 18 (`--radius-card`), shadow `0 20px 40px −30px rgba(18,51,59,0.5)` (dark `0 20px 40px −30px rgba(0,0,0,0.8)` DERIVED via `--wl-card-shadow`) | 197:64 |
| Card split | body **672px** + art **448px** = 1120 content column ✓ | 197:65 / 197:75 |
| body (197:65) | pt 38 / px 38 / pb 35, column gap 14 | 197:65 |
| meta row (197:66) | gap 11: Tag pill `AUTOMATIONS` + date `July 10, 2026` + `·` + `6 min read` | 197:66 |
| Tag pill | component 39:44 — fill **accent @8%** (design-context's `bg-[var(--accent)]` is the raw var ref; the 8% alpha is authoritative per component description + shipped `Tag.astro`), border 1px `--wl-line`, radius pill, px 10 / py 4; text HG Regular **12px** `#35525A` sub (uppercase content) | 197:67 |
| Date / read-time text | HG Regular **14px** `#4C6A70` (crumb tint). Dark: `#A9C9C7` **DERIVED** — `--wl-breadcrumb-color` dark-flip precedent | 197:69 / 197:71 |
| Separator `·` | HG Regular 14px `#5AA9A5` accent-soft (dark `#7FC4C0` DERIVED, token flip) | 197:70 |
| Feature title | `The spreadsheet test: five signs your business has outgrown copy-paste` — Fraunces Regular **32px**, lh 1.12, tracking −0.48px, ink. **No ramp match** → local style | 197:72 |
| Feature description | `Spreadsheets are where good businesses start — and where growing ones quietly lose hours every week. Here are the five signs the handoff work is costing more than a fix would, and what the fix usually looks like.` — HG Regular **16px** / 1.6, sub → `.wl-text-body` match | 197:73 |
| Link | `Read the post →` — HG **SemiBold 16px**, accent, lh normal. Near `.wl-label-button` (16/600 but lh 1.3) — treat as local/link style | 197:74 |
| feature-art (197:75) | 448 wide, self-stretch; bg `linear-gradient(to bottom, #E6F1F1, #D2E7E7)` (dark `#123640 → #0C2228` DERIVED); waves node 197:76 = 480 × 360 at (−16, −10) — wave asset stretched over the art panel (§10) | 197:75 / 197:76 |

---

## 3. Blog index — Posts (`198:61`)

| Element | Value | Source |
|---|---|---|
| Background (light) | `linear-gradient(to bottom, #EFF7F6, #E6F1F1)` | 198:61 fill |
| Background (dark) | `linear-gradient(to bottom, #10303A, #0E2B33)` — **DERIVED** (landing #services pair, `index.astro` L210) | recipe |
| Padding / gap | py 96, px 160; gap 42 (header → grid) | 198:61 |
| Header | node 198:62, gap 21: Eyebrow `ALL POSTS` → h2 `Everything so far.` (Fraunces 50 / 1.06 / −0.75px, ink → `.wl-heading-h2`, same caveat) | 198:62 / 198:66 |
| post-grid (198:67) | column gap **22px**; 2 rows (198:68 h 242, 198:69 h 218) × 3 cards, row-internal gap **22px** → **3-col grid, 22px gap both axes (measured)**; card width = (1120 − 44)/3 ≈ **358.7** (flex 1) | 198:67–69 |
| post-card (198:70 anatomy) | white bg (`--wl-card-bg` dark `#12333B` DERIVED), border 1px `--wl-line`, radius 18 `--radius-card`, shadow Shadow/Card (dark flip DERIVED via `--wl-card-shadow`); pt 27 / px 26 / pb 24; column gap 14; equal-height (h-full) with a **flex-grow "push" spacer** (198:77) pinning `Read →` to the bottom | 198:70 |
| Card meta | gap 11: Tag pill (12px, as §2) + date (HG 14 `#4C6A70`) — **no read-time on grid cards** (read-time appears only on feature card + post hero) | 198:71 |
| Card title | Fraunces Regular **20px**, lh 1.18, ink. **No ramp match** (near `.wl-heading-h3` 21/1.2 but not equal) → local style | 198:75 |
| Card description | HG Regular **15.5px** / 1.6, sub. **No ramp match** → local style | 198:76 |
| Card link | `Read →` — HG **SemiBold 15px**, accent, lh normal. **No ramp match** (`.wl-text-small` is 400 wt + 1px ls) → local style | 198:78 |
| Reference card copy (ONE, as sample — placeholder content, real posts come from content collection) | node 198:70: tag `WEB`, date `July 3, 2026`, title `What a small-business website actually costs in 2026`, desc `Ranges, what moves the number, and the questions to ask any developer before you sign — including me.`, link `Read →` | 198:70 subtree |
| Other 5 cards | placeholder posts (198:79, 198:88, 199:66, 199:75, 199:84) — tags observed: WEB / AI / AUTOMATIONS / PROCESS; noted but intentionally not all recorded (D-09 placeholder content) | 198:67 |

---

## 4. Blog index — Final CTA (`195:197`)

| Element | Value | Source |
|---|---|---|
| Background (light) | `linear-gradient(to bottom, #E6F1F1, #D2E7E7)` | 195:197 fill |
| Background (dark) | `linear-gradient(to bottom, #123640, #0C2228)` — **DERIVED** (same pair as hero) | recipe |
| Padding / layout | py **112** (landing CTA padding, NOT the 96 of content sections), px 160, column flex **items-center / text-center** | 195:197 |
| Eyebrow | `GET IN TOUCH` | 195:198 instance |
| Eyebrow → h2 gap | 21px | 195:199 spacer |
| h2 copy | `Prefer answers to articles?` | 195:200 |
| h2 style | Fraunces Regular **50px** / 1.06, ink, centered, width 760 → `.wl-heading-h2` (no tracking on this node — §11) | 195:200 |
| h2 → sub gap | 18px | 195:201 spacer |
| Sub copy | `Bring the question these posts almost answered. If there's a solution that saves you time or money, I'll tell you what it'd take — and if there isn't, I'll tell you that too.` | 195:202 |
| Sub style | HG Regular 21px / 1.6, sub, centered, width 660 → `.wl-text-lead` | 195:202 |
| Sub → btns gap | 35px | 195:203 spacer |
| btns row (195:204) | gap 16; total 322 × 51 (per frame metadata) — matches landing/showcase CTA pair | 195:204 |
| Button 1 | CTA Button **Solid**: label `Book a call` + calendar icon 17px, ink fill `#12333B`, on-ink text `#EAF6F3` HG SemiBold 16, radius 13, px 27 / py 15, Shadow/CTA `0 12px 28px −14px rgba(18,51,59,0.75)` → existing `CTAButton variant="solid" icon="calendar"` + `BOOKING_URL` (landing precedent) | 195:205 (label I195:205;39:14) |
| Button 2 | CTA Button **Ghost**: label `Email me` + mail icon 17px, bg `rgba(255,255,255,0.4)` (`--wl-cta-ghost-bg`, dark 0.08 flip shipped), border 1.5px accent, ink text → existing `CTAButton variant="ghost" icon="mail"` + `mailto:` (D-07 precedent) | 195:206 (label I195:206;39:21) |

---

## 5. Blog post — Hero (`195:213`)

| Element | Value | Source |
|---|---|---|
| Background / field | identical treatment to index hero: sea-glass gradient `#E6F1F1 → #D2E7E7` (dark `#123640 → #0C2228` DERIVED); field 195:214 = 1670 × 1044 at (−115, −100) | 195:213 / 195:214 |
| Section height | **480** @1440 (prior metadata; `justify-center` content) | 195:211 metadata |
| Breadcrumb | `Home  /  Blog  /  The spreadsheet test` — **3 levels: Home / Blog / current-post short title** (index hero shows 2 levels: Home / Blog). Separator `  /  ` per component 100:14 | 195:220 |
| Breadcrumb → meta gap | 20px | 195:221 spacer |
| meta row (196:1091) | gap 11: Tag pill `AUTOMATIONS` (12px, §2 anatomy) + `July 10, 2026` (HG 14 `#4C6A70`) + `·` (HG 14 `#5AA9A5`) + `6 min read` (HG 14 `#4C6A70`) → **read-time meta format: "{Month D, YYYY} · {N} min read", separator "·" in accent-soft** | 196:1092–1096 |
| meta → h1 gap | 21px | 195:223 spacer |
| h1 copy | `The spreadsheet test: five signs your business has outgrown copy-paste` | 195:224 |
| h1 style | Fraunces Regular **54px**, lh 1.06, ink, width 980. **No ramp match** (61 interior / 50 h2) → local style + source-node comment (Phase 36 protocol) | 195:224 |
| h1 → lead gap | 26px | 195:225 spacer |
| Lead copy (FULL) | `Spreadsheets are where good businesses start. Here's how to tell when yours has quietly become a part-time job — and what the fix usually looks like.` | 195:226 |
| Lead style | HG Regular 21px / 1.6, sub, width 700 → `.wl-text-lead` | 195:226 |

---

## 6. Blog post — Article prose (`197:1017`)

Prose column width **735** (per frame metadata; confirmed by figure waves node 200:1007 = 735 wide).
Block gap **20px** between prose children; extra **28px spacer** before each h2 (197:1020 / 198:1036 / 199:1058).

### 6.1 Text styles

| Element | Style | Source |
|---|---|---|
| Body paragraph | HG Regular **17px / 1.6**, `#35525A` sub → `.wl-text-body-large` match. **⚠ shipped `.wl-prose p` is 16px — must change (§12)** | 197:1018 |
| Bold inline (strong) | HG **SemiBold**, `#12333B` ink (dark `#EAF6F3` DERIVED, ink token) | 197:1025 spans |
| Prose h2 | Fraunces Regular **34px**, lh **1.1**, tracking **−0.51px**, ink. No ramp match → local (shipped `.wl-prose h2` is 34px but lh 1.15 / ls −1.5px — §12) | 197:1021 |
| ul | column gap **9px**; li = flex row gap 8: bullet `•` in **accent** color + body text 17/1.6 sub (bold lead-in spans in ink SemiBold) | 197:1022–1037 |
| Callout label | `THE SHORT VERSION` — HG **SemiBold 11.5px**, tracking **2.07px** (= 18%), **accent**. No ramp match (eyebrow is 13px) → local | 198:1034 |
| Callout body | HG Regular **16px / 1.55**, sub | 198:1035 |
| Blockquote quote | Fraunces **Italic 20px / 1.4**, **ink**, SOFT 0 / WONK 1. Near `.wl-accent-kicker` (20 italic, lh 1.3) — lh differs → local (shipped `.wl-prose blockquote` is 22px sub-colored — §12) | 198:1042 |
| Blockquote attribution | `— A client, after week one` — HG Regular **14px**, `#4C6A70` (dark `#A9C9C7` DERIVED, breadcrumb-token precedent) | 198:1043 |
| Table header cell | HG **SemiBold 15.5px / 1.5**, ink | 199:1032 |
| Table body cell | HG Regular **15.5px / 1.5**, sub | 199:1039 |
| Code block text | **Roboto Mono Regular 14.5px / 1.55**, `#CDE6E5` | 199:1062 |
| Inline code | **Roboto Mono Regular 15px**, `#12333B` ink (dark ink-flip DERIVED) — no bg tint visible on the inline span in frame. **⚠ shipped `.wl-prose code` uses JetBrains Mono + sea-glass bg (from deleted 211:5) — canonical frame says Roboto Mono; §12** | 199:1063 span |
| Figure caption | HG Regular **14px**, `#4C6A70` (dark `#A9C9C7` DERIVED), centered | 200:1011 |

### 6.2 Block geometry & fills

| Block | Value | Source |
|---|---|---|
| Callout (198:1033) | bg `var(--sea-glass, #E6F1F1)` (dark `#123640` DERIVED, token flip); border-left **3px accent** (dark `#4FB3B8` DERIVED); radius **top-right/bottom-right 14** (left corners square); px 22 / py 18; internal gap 6 (label → body) | 198:1033 |
| Blockquote (198:1039) | row gap 22: bar 3px wide, self-stretch, **accent-soft `#5AA9A5`** (dark `#7FC4C0` DERIVED, token flip) + content column (gap 10, py 5): quote → attribution. No bg, no radius | 198:1039–1043 |
| Table (199:1029) | full-width (735); 3 columns × **245px** fixed cells; cell padding pt 10 / px 13 / pb 9; **thead border-bottom 2px `rgba(14,112,120,0.3)`** (accent @30% — stronger than line token; dark: no recipe entry → `[FIDELITY-GAP]`, suggest accent-soft @30% `#5AA9A54D` as derived-decision at gate); body rows border-bottom **1px `--wl-line`** (dark `#5AA9A538` DERIVED); no outer border, no header fill (transparent) | 199:1030–1057 |
| pre (199:1061) | bg **`#0D2A31`** = `--wl-footer-bg` (always-dark surface — **no dark flip needed**, matches footer precedent; text `#CDE6E5` = `--wl-footer-text-link`); radius **14**; px 24 / py 21; full-width | 199:1061 |
| figure (200:1005) | column gap 11, centered: frame 200:1006 = full-width × **245px**, radius **16**, border 1px `--wl-line`, bg sea-glass gradient `#E6F1F1 → #D2E7E7` (dark `#123640 → #0C2228` DERIVED); waves 200:1007 = 735 × 245 fill (§10); caption below | 200:1005–1011 |
| hr (200:1012) | wrapper py 14, centered; rule = **1px × 441px** `--wl-line` (centered, NOT full-width) | 200:1012 / 200:1013 |

### 6.3 Prose copy (placeholder demo article — reference only, real posts come from MDX)

Section h2s: `The five signs` (197:1021), `What the fix usually looks like` (198:1037), `A peek under the hood` (199:1059).
Callout: label `THE SHORT VERSION` + body `If your team spends more time moving information than acting on it, the spreadsheet has done its job — and finished it. What comes next doesn't have to be big.` (198:1034/198:1035).
Blockquote: `We didn't need new software. We needed the software we had to stop ignoring each other.` — `— A client, after week one` (198:1042/198:1043).
Table: header `Handoff | Before | After`; rows `Quote → job | Retyped, ~10 min each | One click`, `Job → invoice | End-of-week batch, error-prone | Automatic on completion`, `Lead follow-up | Memory and good intentions | Scheduled, every time` (199:1029).
Code block (199:1062, verbatim):

```
// when a quote is accepted, create the job — no retyping
onQuoteAccepted(async (quote) => {
  const job = await jobs.createFrom(quote);
  await calendar.scheduleFollowUp(job, { days: 3 });
});
```

Figure caption: `Placeholder figure — real posts drop in a diagram or screenshot here.` (200:1011).

---

## 7. Blog post — Author (`200:1015`)

| Element | Value | Source |
|---|---|---|
| Background (light) | `linear-gradient(to bottom, #E6F1F1, #D2E7E7)`; dark `#123640 → #0C2228` **DERIVED** | 200:1015 |
| Padding / layout | py **112**, px 160, items-center | 200:1015 |
| author-card (200:1016) | width **760**, row gap 26: glyph + content. **No bg / border / shadow on the card itself** — it sits directly on the gradient band (not a white card) | 200:1016 |
| glyph (200:1017) | 64 × 64 wave-mark glyph (vector export; circular-masked wave lines — reuse existing WaveMark/monogram asset; exact vector `[FIDELITY-GAP]` if no existing asset matches — verify against `src/components/wl` mark components at build time) | 200:1017–1024 |
| content (200:1025) | column gap 10: Eyebrow → name → bio → 12px spacer (200:1031) → btns | 200:1025 |
| Eyebrow | `WRITTEN BY` → `.wl-label-eyebrow` | 200:1026 instance |
| Name | `Joel Shinness` — Fraunces Regular **30px**, lh 1.1, tracking **−0.45px**, ink. **No ramp match** → local style | 200:1029 |
| Bio (verbatim) | `I build web apps, automations, and practical AI for small businesses — previously at EA, Unity, lululemon, and thatgamecompany. If this post sounded like your week, the next step is a free call, and it comes with a straight answer either way.` — HG Regular 16px / 1.6, sub → `.wl-text-body` | 200:1030 |
| btns (200:1032) | gap 16 — **identical pair to §4**: Solid `Book a call` (calendar icon, Shadow/CTA) 200:1033 + Ghost `Email me` (mail icon) 200:1038 → existing `CTAButton` variants + BOOKING_URL / mailto wiring | 200:1032–1038 |

---

## 8. Blog post — Related (`200:1043`)

| Element | Value | Source |
|---|---|---|
| Background (light) | `#F6FBFA` paper (dark `#0C2228` DERIVED, token) | 200:1043 |
| Padding / gap | py 96, px 160; gap **38** (header → cards; note: NOT the 42 used on index sections) | 200:1043 |
| Header | gap 21: Eyebrow `KEEP READING` → h2 `Related posts.` (Fraunces 50 / 1.06 / −0.75px → `.wl-heading-h2`) | 200:1044 / 200:1048 |
| mini row (200:1049) | 2 × mini-card, gap **22** → each **549px** (2 × 549 + 22 = 1120 ✓), self-stretch equal height | 200:1049 |
| mini-card (200:1050 anatomy) | white bg (`--wl-card-bg`, dark `#12333B` DERIVED), border 1px `--wl-line`, radius **16** (NOT the 18 card radius — local value), **no shadow** (differs from post-card); px 26 / py 24, column gap 11: meta (Tag 12px + date 14px `#4C6A70`) → title → desc → link | 200:1050 |
| Mini title | Fraunces Regular **21px / 1.2**, ink → **`.wl-heading-h3` size/lh exact match** (tracking caveat §11) | 200:1055 |
| Mini description | HG Regular **15.5px / 1.6**, sub (same local style as post-card desc) | 200:1056 |
| Link | `Read →` — HG SemiBold **15px**, accent (same local style as post-card link) | 200:1057 |
| Reference card copy | 200:1050: tag `AUTOMATIONS`, date `June 12, 2026`, title `The follow-up problem: why good leads go cold`, desc `Most lost leads aren't lost to competitors — they're lost to silence. What an automatic follow-up actually looks like.` (placeholder — real related posts computed from collection) | 200:1050 subtree |

---

## 9. Copy inventory — VERBATIM (with node ids)

| Surface | Copy | Node |
|---|---|---|
| Index hero eyebrow | `PLAIN ANSWERS, WRITTEN DOWN` | 195:114 |
| Index hero h1 | `Notes on web, automations, and AI — minus the jargon` | 195:116 |
| Index hero lead | (full text §1) | 195:118 |
| Index breadcrumb | `Home  /  Blog` | 195:112 |
| Featured eyebrow / h2 | `LATEST` / `Start here.` | 197:60 / 197:63 |
| Feature link | `Read the post →` | 197:74 |
| Posts eyebrow / h2 | `ALL POSTS` / `Everything so far.` | 198:63 / 198:66 |
| Post-card link | `Read →` | 198:78 (et al.) |
| CTA eyebrow / h2 / sub | `GET IN TOUCH` / `Prefer answers to articles?` / (full sub §4) | 195:198 / 195:200 / 195:202 |
| CTA buttons | `Book a call` (solid) / `Email me` (ghost) | I195:205;39:14 / I195:206;39:21 |
| Post breadcrumb | `Home  /  Blog  /  The spreadsheet test` | 195:220 |
| Post meta | `AUTOMATIONS` · `July 10, 2026` · `·` · `6 min read` | 196:1092–1096 |
| Post h1 / lead | (§5, full) | 195:224 / 195:226 |
| Callout label | `THE SHORT VERSION` | 198:1034 |
| Author eyebrow / name / bio | `WRITTEN BY` / `Joel Shinness` / (full bio §7) | 200:1026 / 200:1029 / 200:1030 |
| Author buttons | `Book a call` / `Email me` | I200:1033;39:14 / I200:1038;39:21 |
| Related eyebrow / h2 | `KEEP READING` / `Related posts.` | 200:1045 / 200:1048 |

Sample post titles/descriptions are **placeholder content** (D-09) — one reference card recorded per grid (§3, §8); do not hard-code the rest.

---

## 10. Wave-field vector treatment

- **Index + post hero fields (195:106 / 195:214):** 1670 × 1044 at offset (−115, −100) — **byte-identical geometry to the landing hero field (node 13:21)**, which is exactly what `src/components/wl/FrequencyWave.astro` implements: viewBox `0 0 1670 1044`, group opacity 0.7, 5 paths (per-path opacity 0.14/0.18/0.22/0.20/0.15, stroke-widths 1.74/1.74/2.32/2.32/1.74), stroke `var(--color-wl-accent)` (flips light/dark), `preserveAspectRatio="none"`. **→ FrequencyWave is REUSABLE as-is for both blog heros** (same absolute placement as the landing hero usage). Hero screenshot (195:105) visually confirms the multi-line frequency-field pattern.
- **feature-art waves (197:76, 480 × 360)** and **figure waves (200:1007, 735 × 245):** the MCP exports these as raster assets, so line count/stroke values cannot be read from the design context. Given the frame's pattern language they are almost certainly the same 5-line field component stretched to the panel (`preserveAspectRatio: none` reuse of FrequencyWave sized to the container). `[FIDELITY-GAP]` — exact per-path values of these two crops unverified; recommendation: reuse FrequencyWave stretched to the panel and compare against Figma screenshots at the fidelity gate.

---

## 11. Ramp-class mapping (global.css `.wl-*` audit)

| Frame style | Ramp verdict |
|---|---|
| Index hero h1 — Fraunces 61 / 1.06 | **`.wl-heading-h1-interior` MATCH** (61/1.06). ⚠ ramp class carries `letter-spacing: −1.5px`; frame node shows no tracking attr — same situation Phase 36 shipped with; accept ramp class |
| Post hero h1 — Fraunces 54 / 1.06 | **NO ramp match** (61 / 50) → local style + source comment (`195:224`) |
| Section h2 — Fraunces 50 / 1.06 / −0.75px | **`.wl-heading-h2` size/lh MATCH**; frame tracking −0.75px vs ramp −1.5px → minor; accept ramp class (frame-vs-ramp tracking delta logged for gate) |
| Hero lead / CTA sub — HG 21 / 1.6 | **`.wl-text-lead` EXACT** |
| Eyebrows — HG 13 / 600 / 2.86px | **`.wl-label-eyebrow` EXACT** (0.22em × 13 = 2.86) |
| Prose body — HG 17 / 1.6 | **`.wl-text-body-large` EXACT** (⚠ shipped `.wl-prose p` = 16px — must update, §12) |
| Feature desc / callout body / author bio — HG 16 / 1.6 | **`.wl-text-body` EXACT** (callout body lh 1.55 — negligible delta, log) |
| Feature title — Fraunces 32 / 1.12 / −0.48 | NO match → local (`197:72`) |
| Post-card title — Fraunces 20 / 1.18 | NO match (h3 is 21/1.2) → local (`198:75`) |
| Mini-card title — Fraunces 21 / 1.2 | **`.wl-heading-h3` size/lh EXACT** (tracking caveat as above) |
| Card desc — HG 15.5 / 1.6 | NO match → local (`198:76`) |
| `Read →` — HG 15 / 600 | NO match (`.wl-text-small` is 400 + 1px ls) → local (`198:78`) |
| `Read the post →` — HG 16 / 600 | near `.wl-label-button` (16/600, lh 1.3 vs normal) → acceptable reuse or local; gate call |
| Prose h2 — Fraunces 34 / 1.1 / −0.51 | NO ramp match → local (shipped `.wl-prose h2` needs value corrections, §12) |
| Blockquote — Fraunces Italic 20 / 1.4 ink | near `.wl-accent-kicker` (20 italic / 1.3) → local recommended (lh + color) |
| Callout label — HG 11.5 / 600 / 2.07px | NO match → local (`198:1034`) |
| Table cells — HG 15.5 / 1.5 | NO match → local |
| Code — Roboto Mono 14.5 / 1.55 (block), 15 (inline) | NO match → local; font family decision §12 |
| Author name — Fraunces 30 / 1.1 / −0.45 | NO match → local (`200:1029`) |
| Meta/date/caption/attribution — HG 14 `#4C6A70` | matches Breadcrumb treatment (`--wl-breadcrumb-color` + dark flip shipped); `.wl-footer-link` is same size/weight but chrome-scoped — prefer a shared local meta style |

---

## 12. ⚠ Shipped `.wl-prose` vs canonical frame (supersedes deleted 211:5/211:6 values)

The `.wl-prose` block in `global.css` (lines ~644–802) was authored from the now-**deleted** draft page
(211:5 / 211:6). Canonical 195:210 frame differs:

| Property | Shipped `.wl-prose` (211:5) | Canonical (195:210) |
|---|---|---|
| p / li size | 16px | **17px** (197:1018) |
| h2 | 34px / lh 1.15 / ls −1.5px | 34px / **lh 1.1 / ls −0.51px** (197:1021) |
| blockquote | Fraunces Italic 22px, sub color, 3px **accent** bar, no attribution style | **20px / 1.4, ink**, 3px **accent-soft** bar, + 14px `#4C6A70` attribution row (198:1039) |
| code font | JetBrains Mono | **Roboto Mono** (199:1062) |
| inline code | sea-glass bg tint | no bg tint on frame span; ink Roboto Mono 15px (199:1063) — bg-tint decision at gate |
| pre | radius 12, no bg spec | **radius 14, bg `#0D2A31`** (= `--wl-footer-bg`), text `#CDE6E5`, px24/py21 (199:1061) |
| hr | 1px `--wl-line` full-width | 1px `--wl-line` **441px centered**, py-14 wrapper (200:1012) |
| callout / table / figure | not covered | new styles needed (§6.2) |

Downstream plan must update `.wl-prose` to the canonical values (and note the frame has no `<ol>`, `<h3>`,
or `<h4>` exemplar — shipped fallbacks for those remain acceptable, log as `[FIDELITY-GAP]` no-frame-spec).

---

## 13. Dark-derivation & gap log (for the fidelity-gate batch)

1. ALL dark values in this doc are **DERIVED** (no dark blog frames exist): gradient pairs from `index.astro` (`#E6F1F1→#D2E7E7 ⇒ #123640→#0C2228`; `#EFF7F6→#E6F1F1 ⇒ #10303A→#0E2B33`), token flips from `global.css .dark` (paper ⇒ `#0C2228`, card bg ⇒ `#12333B`, line ⇒ `#5AA9A538`, accent ⇒ `#4FB3B8`, accent-soft ⇒ `#7FC4C0`, sub ⇒ `#A9C9C7`, ink text ⇒ `#EAF6F3`, card shadow ⇒ `rgba(0,0,0,0.8)`, ghost bg ⇒ 0.08 white, `#4C6A70` ⇒ `#A9C9C7` breadcrumb precedent).
2. `[FIDELITY-GAP]` table thead border `rgba(14,112,120,0.3)` — no dark recipe entry; suggested `#5AA9A54D` (accent-soft @30%) is a derived-decision, not frame-verified.
3. `[FIDELITY-GAP]` feature-art (197:76) and figure (200:1007) wave crops — raster export; per-path values unverified (recommend FrequencyWave stretch, §10).
4. `[FIDELITY-GAP]` author glyph (200:1017) exact vector — verify against existing WaveMark/monogram components before drawing a new asset.
5. `[FIDELITY-GAP]` hero heights 500 / 480 taken from prior whole-canvas metadata (design context reports `size-full`); re-verify in fidelity screenshots.
6. `[FIDELITY-GAP]` no `<ol>` / `<h3>` / `<h4>` / inline-code-bg exemplars in canonical prose frame — shipped fallback styling stays, flagged not frame-verified.
7. Tracking deltas frame-vs-ramp (−0.75 / 0 vs ramp −1.5px) on h1/h2/h3 reuse — logged, accepted per Phase 36 precedent unless gate rules otherwise.
8. Read-time only present on feature card + post hero meta (format `6 min read`, `·` separator); grid/mini cards show Tag + date only.

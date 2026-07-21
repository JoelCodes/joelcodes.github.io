# Phase 38 — Showcase Extraction (Figma frame 12:3)

> Wave 1 extraction for `/showcase` (PAGE-02). Source of truth: Figma file `1tg8wIPcvOVC5tPZ8pkGO2`,
> canvas `12:3` "Site · Showcase". Extracted 2026-07-18 via claude.ai Figma MCP `get_design_context`
> on section frames 27:20 / 27:28 / 31:2 / 31:90 and expanded card instances 52:523 / 52:568 /
> 52:609 / 52:650 / 52:692 / 52:733, plus `get_screenshot` on 32:331 (768) and 32:660 (390).
> Every value below carries its source node id. Nothing invented; gaps are marked `[COPY GAP]`.

---

## 1. Frame inventory (verified structure)

| Breakpoint | Closed | Expanded |
|---|---|---|
| Desktop 1440 | `27:2` | `31:134` |
| Full 1920 | `32:2` | `32:989` |
| Tablet 768 | `32:331` | `32:1318` |
| Mobile 390 | `32:660` | `32:1647` |

Sections within each frame (desktop node ids): PageHero `27:20`, ClientWork `27:28`, Craft `31:2`, CtaBand `31:90`.

**Card count per section (confirmed): client-work = 4, craft-experiments = 2.**
- ClientWork grid `29:3` (rows `29:4`, `30:2`): `50:46` Chat Safety Pipeline, `50:91` Design Systems, `50:160` Service Apps for Large Teams, `50:201` Your Project Here.
- Craft row `31:11`: `50:271` Code That Carves, `50:312` Interactive Sketches.
- Expanded twins (frame `31:134`): `52:523`, `52:568`, `52:609`, `52:650` (ClientWork grid `31:169`); `52:692`, `52:733` (Craft row `31:340`).

> **IMPORTANT NOTE for downstream tasks (supersedes naive D-03 duplication):** the frame shows
> **6 DISTINCT cards with distinct copy** — not duplicates of the Chat Safety card. `projects.json`
> must carry the per-card verbatim copy in §6 below (still D-09 placeholder / dev-only). The current
> `src/data/projects.json` has only 2 entries (the second a literal duplicate) — it must be replaced
> with the 6 entries in §6. The fidelity gate compares against these distinct cards.

---

## 2. Page header (PageHero `27:20`)

| Element | Value | Source node |
|---|---|---|
| Section height | 352 @1440/1920 · 319 @768 · 314 @390 | 27:20 + breakpoint frames (metadata) |
| Background (light) | `linear-gradient(to bottom, #E6F1F1, #D2E7E7)` | 27:20 fill |
| Background (dark, derived D-04) | `linear-gradient(to bottom, #123640, #0C2228)` — landing "sea-glass gradient" pair | 38-UI-SPEC dark recipe / `index.astro` hero |
| Padding | pt 88px · pb 72px · gutters (§8) | 27:20 (`pt-[88px] pb-[72px] px-[160px]`) |
| Eyebrow | `SHOWCASE` — Eyebrow instance, on-light (dash 34px + HG SemiBold 13px, tracking 2.86px, accent `#0E7078`) | 50:745 (text via component 39:35) |
| Eyebrow → h1 gap | 21px | 27:24 spacer |
| h1 copy | `Things I've built.` | 27:25 |
| h1 style | Fraunces Regular **64px**, lh 1.06, `#12333B` (ink), SOFT 0 / WONK 1 | 27:25 |
| h1 ramp mapping | **NO ramp class matches.** `.wl-heading-h1-interior` = 61px, `.wl-display-hero` = 76px (`global.css` verified). Frame is 64px (h=68 ✓ 64×1.06). → local style with source-node comment per Phase 36 precedent, or Joel call at gate. Do NOT silently use 61px. | 27:25 vs global.css |
| h1 → lead gap | 18px | 27:26 spacer |
| Lead copy | `A few problems I've solved — described by what they did for the people who used them. Click any project to read the story.` | 27:27 |
| Lead style | HG Regular 21px / 1.6, `#35525A` (sub), width 700px → `.wl-text-lead` exact match | 27:27 |
| Header → hero gap | PageHero is the first `<main>` section, flush under the fixed SiteHeader (frame shows section starting at page top under header; no extra gap node). | 27:2 structure |

---

## 3. Section: Client Work (`27:28`)

| Element | Value | Source node |
|---|---|---|
| Background (light) | `#F6FBFA` = `var(--color-wl-paper)` | 27:28 fill |
| Background (dark) | flips via token (`--color-wl-paper` → `#0C2228`) | UI-SPEC recipe "Paper" row |
| Padding | py 88px (NOT the landing 112px — frame-verbatim) | 27:28 (`py-[88px]`) |
| Eyebrow | `CLIENT WORK` (y=88, i.e. top padding) | 50:748 |
| Eyebrow → h2 gap | 21px | 27:32 spacer |
| h2 copy | `Software people rely on.` | 27:33 |
| h2 style | Fraunces Regular **37px**, lh 1.06, ink (h=39 ✓) — NOT `.wl-heading-h2` (50px). No ramp match → local style + source comment (same protocol as h1). | 27:33 vs global.css |
| h2 → sub gap | 12px | 27:34 spacer |
| Sub-line copy | `Placeholder content — swap in your real specifics, numbers, and any you'd rather feature.` | 27:35 |
| Sub-line style | HG **Italic 14px** / 1.6, `#6B8B90`, width 600 — a meta/dev-note treatment, distinct from Craft's lead sub. `#6B8B90` is a non-token literal; **no dark counterpart exists in the D-04 recipe** → flag as derived-value decision at gate (landing precedent for small literals: `#4C6A70`→`#8FB4B2`). Do not silently invent. | 27:35 |
| Sub → grid gap | 42px | 29:2 spacer |
| Grid | `29:3` (y=241 ✓ 88+17+21+39+12+22+42), width 1120; 2 rows (`29:4`, `30:2`) × 2 cards; card width 547; column gap 26px; row gap 26px | 29:3 / 29:4 / 30:2 |

**Section-label treatment (both content sections):** Eyebrow instance + heading (`<h2>`, Fraunces 37px) + sub-line, then 42px to the card grid. Node pattern: Eyebrow (50:748 / 50:751) → 21px → h2 (27:33 / 31:7) → 12px → sub (27:35 / 31:9) → 42px → grid/row (29:3 / 31:11).

---

## 4. Section: Craft & Experiments (`31:2`)

| Element | Value | Source node |
|---|---|---|
| Background (light) | `linear-gradient(to bottom, #EFF7F6, #E6F1F1)` | 31:2 fill |
| Background (dark, derived D-04) | `linear-gradient(to bottom, #10303A, #0E2B33)` — landing "sea-glass subtle" pair | UI-SPEC recipe / `index.astro` #services |
| Padding | py 88px | 31:2 |
| Eyebrow | `CRAFT & EXPERIMENTS` | 50:751 |
| Eyebrow → h2 gap | 21px | 31:6 spacer |
| h2 copy | `What I make when no one's paying me.` | 31:7 |
| h2 style | Fraunces Regular 37px / 1.06, ink (same as 27:33) | 31:7 |
| h2 → sub gap | 12px | 31:8 spacer |
| Sub copy | `The same puzzle-solving instinct, pointed at art. It's where I keep my hands sharp — and a decent hint at how I'll think about your project.` | 31:9 |
| Sub style | HG Regular 21px / 1.6, `#35525A`, width 700 → `.wl-text-lead` (NOTE: differs from ClientWork's italic-14 sub) | 31:9 |
| Sub → row gap | 42px | 31:10 spacer |
| Row | `31:11` single row, 2 cards × 547w, gap 26px | 31:11 |

**Craft & Experiments thumb treatment:** craft cards use the SAME gradient-thumb treatment as client
cards — 547×308 linear-gradient block with a centered Fraunces Italic 16px white (85% opacity) label.
No images, screenshots, or live canvases in the frame. (Verified from design context of 50:271 / 50:312:
`generative → CNC` on gradient rgb(127,198,198)→rgb(52,127,134); `interactive` on rgb(63,158,155)→rgb(14,112,120).)

---

## 5. Section: CTA band (`31:90`)

| Element | Value | Source node |
|---|---|---|
| Section height | 391 | 31:90 (metadata) |
| Background (light) | `linear-gradient(to bottom, #E6F1F1, #D2E7E7)` (same pair as PageHero) | 31:90 fill |
| Background (dark, derived D-04) | `linear-gradient(to bottom, #123640, #0C2228)` | UI-SPEC recipe |
| Padding / layout | py 88px; column flex, **items-center / text-center** (centered band — mirrors landing Final CTA) | 31:90 |
| Eyebrow | `GET IN TOUCH` | 50:754 |
| Eyebrow → h2 gap | 21px | 31:94 spacer |
| h2 copy | `Want something like this for your business?` | 31:95 |
| h2 style | Fraunces Regular **42px**, lh 1.06, ink, centered — a third heading size with no ramp match (h1 64 / section h2 37 / CTA 42). Same local-style protocol. | 31:95 |
| h2 → sub gap | 15px | 31:96 spacer |
| Sub copy | `Tell me what you're trying to do. If I can help, I'll tell you how and what it'd take.` | 31:97 |
| Sub style | HG Regular 21px / 1.6, `#35525A`, centered → `.wl-text-lead` | 31:97 |
| Sub → btns gap | 32px | 31:98 spacer |
| Buttons row | `31:99` — 2 CTA Button instances, gap 16px, total 322×51 (160 + 16 + 146) | 31:99 |
| Button 1 | **Solid** variant, label `Book a call`, calendar icon 17px, ink fill `#12333B`, on-ink text `#EAF6F3`, radius 13, px27/py15, Shadow/CTA `0 12 28 -14 rgba(18,51,59,0.75)` → existing `CTAButton variant="solid" icon="calendar"` + `BOOKING_URL` (landing precedent, IA-03) | 50:558 (label I50:558;39:14) |
| Button 2 | **Ghost** variant, label `Email me`, mail icon 17px, bg `rgba(255,255,255,0.4)`, border 1.5px accent, ink text → existing `CTAButton variant="ghost" icon="mail"` + `mailto:CONTACT_EMAIL` (D-07 precedent) | 50:563 (label I50:563;39:21) |

No link targets are encoded in Figma (never are) — destinations follow the locked landing wiring above; not a copy gap.

---

## 6. Per-card copy — VERBATIM, all 6 distinct cards (→ projects.json v2 fields)

Field names per `src/data/projects.json` v2: `slug, section, eyebrow, title, outcome, summary, tags, thumbLabel, problem, built, result`.
Closed-state copy from 50:46/50:91/50:160/50:201/50:271/50:312 is IDENTICAL to the expanded twins (verified both); node ids below cite the expanded instances (detail copy only exists there).

**SCHEMA NOTE (new finding):** the three detail-heading labels VARY per card — they are per-instance
text, not fixed "The problem / What I built / The result". projects.json needs the labels carried
per entry (e.g. `problemLabel/builtLabel/resultLabel` or a `detail: [{label, body}]` shape — downstream
plan decides), otherwise cards 4–6 cannot match the frame.

### 6.1 `chat-safety-pipeline` · section `client-work` · node 52:523 (closed 50:46)
- eyebrow: `MMORPG · PLAYER SAFETY` (I52:523;41:58)
- title: `Chat Safety Pipeline` (41:60)
- outcome: `Kept players safe from chat abuse — at scale.` (41:62)
- summary: `A real-time pipeline that flagged and filtered harmful chat across a live game, protecting a large player community without slowing conversation down.` (41:64)
- tags: `Real-time`, `Moderation`, `Scale`, `Pipelines` (41:96/98/100/102)
- thumbLabel: `chat-safety pipeline` (41:56); thumb gradient 150.62deg rgb(14,112,120)→rgb(20,50,59) (41:55)
- detail labels: `The problem` (41:84) / `What I built` (41:88) / `The result` (41:92)
- problem: `A live game's chat exposed players — many of them young — to abuse faster than human moderators could keep up with.` (41:86)
- built: `A real-time pipeline that scored every message, filtered the worst instantly, and routed the tricky calls to moderators with the context they needed to decide.` (41:90)
- result: `Harmful messages caught before they landed, a safer community, and a moderation team freed up for judgment calls instead of endless triage.` (41:94)

### 6.2 `design-systems` · section `client-work` · node 52:568 (closed 50:91)
- eyebrow: `EA & LULULEMON · DESIGN SYSTEMS` (I52:568;41:58)
- title: `Design Systems` (41:60)
- outcome: `One design language — so teams shipped faster.` (41:62)
- summary: `Built the shared components, tokens, and guidelines that let whole product teams move quickly and stay consistent, from AAA games to global e-commerce.` (41:64)
- tags: `React`, `TypeScript`, `Design tokens`, `Accessibility` (41:96/98/100/102)
- thumbLabel: `design systems` (41:56); thumb gradient rgb(63,158,155)→rgb(14,112,120) (41:55)
- detail labels: `The problem` / `What I built` / `The result` (41:84/88/92)
- problem: `Teams were rebuilding the same buttons, forms, and patterns over and over — slow, inconsistent, and drifting off-brand.` (41:86)
- built: `A shared library of components, design tokens, and guidelines with accessibility baked in, that any team could pull from with confidence.` (41:90)
- result: `Faster shipping, a consistent look across products, and designers and developers finally speaking the same language.` (41:94)

### 6.3 `service-apps-for-large-teams` · section `client-work` · node 52:609 (closed 50:160)
- eyebrow: `ENTERPRISE · INTERNAL TOOLS` (I52:609;41:58)
- title: `Service Apps for Large Teams` (41:60)
- outcome: `Turned messy manual processes into tools people liked using.` (41:62)
- summary: `Web applications that replaced spreadsheets and workarounds with something purpose-built — the same instinct I bring to small-business tools, at enterprise scale.` (41:64)
- tags: `Web`, `UX`, `Integrations` (41:96/98/100) — 3 tags
- thumbLabel: `service apps` (41:56); thumb gradient rgb(90,169,165)→rgb(44,110,117) (41:55)
- detail labels: `The problem` / `What I built` / `The result` (41:84/88/92)
- problem: `Big teams were running critical processes on spreadsheets and email threads — error-prone, slow, and painful to hand off.` (41:86)
- built: `Purpose-built web apps shaped around the actual workflow, replacing the manual steps with something that fit how people really worked.` (41:90)
- result: `Fewer mistakes, hours saved every week, and internal tools people actually reached for instead of dreading.` (41:94)

### 6.4 `your-project-here` · section `client-work` · node 52:650 (closed 50:201)
- eyebrow: `SMALL BUSINESS · COMING SOON` (I52:650;41:58)
- title: `Your Project Here` (41:60)
- outcome: `The next case study is a small business like yours.` (41:62)
- summary: `I'm actively taking on small-business work — web, automations, and AI. Want to be one of the first featured here?` (41:64)
- tags: `Web`, `Automations`, `AI` (41:96/98/100) — 3 tags
- thumbLabel: `your project` (41:56); thumb gradient rgb(20,106,114)→rgb(13,42,49) (41:55)
- detail labels: `A few ideas` (41:84) / `How it starts` (41:88) / `Book a call` (41:92)
- problem ("A few ideas"): `A booking system that fills your calendar. A customer portal that cuts the back-and-forth. An automation that hands you back a day a week. Whatever's slow or manual right now.` (41:86)
- built ("How it starts"): `A quick call where you tell me what's eating your time. If there's a solution worth building, I'll tell you what it'd take.` (41:90)
- result ("Book a call"): **`[COPY GAP: node I52:650;41:92 is a heading-style label "Book a call" with NO body paragraph after it (only the 3px spacer 41:93; detail block ends there). Reads as an inline CTA/link, but Figma encodes no link target. Do not invent body copy; treatment (accent-italic label as link to BOOKING_URL vs plain label) is a gate decision.]`**

### 6.5 `code-that-carves` · section `craft-experiments` · node 52:692 (closed 50:271)
- eyebrow: `GENERATIVE ART · FABRICATION` (I52:692;41:58)
- title: `Code That Carves` (41:60)
- outcome: `Generative art in Processing, machined into the real world.` (41:62)
- summary: `Algorithms that draw, then drive a CNC machine to cut the result into physical material — a loop from math to something you can hold.` (41:64)
- tags: `Processing`, `Generative`, `CNC` (41:96/98/100)
- thumbLabel: `generative → CNC` (41:56); thumb gradient rgb(127,198,198)→rgb(52,127,134) (41:55)
- detail labels: `The idea` (41:84) / `How it works` (41:88) / `Why I made it` (41:92)
- problem ("The idea"): `What if the same code that draws generative art could also carve it into wood or acrylic?` (41:86)
- built ("How it works"): `Processing generates the form, then exports toolpaths that drive a CNC machine to cut it physically.` (41:90)
- result ("Why I made it"): `I like closing the loop from math to a thing you can hold — and it keeps my problem-solving sharp for client work.` (41:94)

### 6.6 `interactive-sketches` · section `craft-experiments` · node 52:733 (closed 50:312)
- eyebrow: `INTERACTIVE · WEB` (I52:733;41:58)
- title: `Interactive Sketches` (41:60)
- outcome: `Playful experiments in SVG, Canvas, and code.` (41:62)
- summary: `Small interactive pieces built with SVG, the Canvas API, and CSS — the kind of tinkering that keeps the craft alive between projects.` (41:64)
- tags: `Canvas`, `SVG`, `CSS` (41:96/98/100)
- thumbLabel: `interactive` (41:56); thumb gradient rgb(63,158,155)→rgb(14,112,120) (41:55) — same gradient as 6.2 (intentional reuse in frame)
- detail labels: `The idea` / `How it works` / `Why I made it` (41:84/88/92)
- problem ("The idea"): `Small, playful experiments in the browser — motion, geometry, and interaction for their own sake.` (41:86)
- built ("How it works"): `Built with SVG, the Canvas API, and CSS. No frameworks — just the fundamentals, well used.` (41:90)
- result ("Why I made it"): `Tinkering between projects is how I stay fluent in the exact tools I build client work with.` (41:94)

---

## 7. Card internals (confirms 36-UI-SPEC ProjectCard contract — consume unchanged)

From 50:46 / 52:523 (identical across instances): card = white bg (`--wl-card-bg`), border 1px `--wl-line`
(closed) / 1px `--wl-accent` (expanded — "stronger border" per component 41:104 description), radius 18
(`--radius-card`), Shadow/Card `0 20 40 -30 rgba(18,51,59,0.5)`. Thumb 547×308 full-bleed top, gradient
150.62deg, Fraunces Italic 16px white @85% label. Body px27 / pt26 / pb29; internal stack: eyebrow (HG Bold
12, tracking 1.44, accent) →8→ title (Fraunces 22 ink) →8→ outcome (Fraunces Italic 17 ink) →10→ summary
(HG 16/1.6 sub) →18→ tags (gap 8; pill px10/py4, radius pill; Tag 39:44 fill = accent @8%, border line —
design-context's `bg-[var(--accent)]` is the raw variable ref, the 8% alpha is authoritative per component
description + shipped Tag.astro) →21→ toggle (HG SemiBold 14 accent: `Read the story` + 16px chevron, gap 7;
expanded: `Hide` + chevron rotated 180°). Expanded detail block (41:80): 21px → 1px divider `--wl-line`
(41:82) → 18px → [label Fraunces Italic 16 accent → 3px → body HG 16/1.6 sub] × 3, 18px between groups.

---

## 8. Breakpoint deltas

| Property | 390 | 768 | 1440 | 1920 | Source |
|---|---|---|---|---|---|
| Gutters | 24px | 32px | 160px | 400px | frame padding (27:20 px-160 verified; others landing-identical per metadata) |
| Hero height | 314 | 319 | 352 | 352 | 32:660 / 32:331 / 27:20 / 32:2 metadata |
| Card columns | **1-col stacked** | **2-col** | 2-col | 2-col | screenshots 32:660 (grid h=2277) and 32:331 (grid h=1189, 2×2 visible); 27:2 |
| Content column | full-width minus gutters | — | 1120px | 1120px | 29:3 |
| Card gap | 26px both axes (all breakpoints) | | | | 29:3 / 31:11 |
| Section py | 88px (all sections, all breakpoints observed) | | | | 27:20/27:28/31:2/31:90 |

Note: showcase sections use **py 88 (hero pb 72)**, not the landing's 112px — frame-verbatim wins.

---

## 9. Type-size confirmations (item 5) — RAMP MISMATCHES, flag at gate

| Surface | Expected (UI-SPEC) | Frame actual | Source |
|---|---|---|---|
| h1 | 61px `.wl-heading-h1-interior` | **64px** Fraunces / 1.06 | 27:25 |
| Section h2 | 50px `.wl-heading-h2` | **37px** Fraunces / 1.06 | 27:33, 31:7 |
| CTA h2 | 50px `.wl-heading-h2` | **42px** Fraunces / 1.06, centered | 31:95 |
| Lead / subs / card internals | `.wl-text-lead` 21px etc. | match ramp exactly | 27:27, 31:9, 31:97 |

Protocol: no guessed values — build the three heading sizes as local styles with source-node comments
(Phase 36 ProjectCard precedent) unless Joel rules the ramp should win; log in the gate's derived-value batch.

---

## 10. Copy-gap / derived-value log (for the fidelity-gate batch)

1. `[COPY GAP]` §6.4 — "Book a call" detail label (I52:650;41:92) has no body text and no link target.
2. Derived: all dark backgrounds (§2–§5) — D-04 landing recipe, no dark showcase frame exists.
3. Derived-decision needed: dark counterpart for ClientWork sub-line literal `#6B8B90` (27:35) — absent from the dark recipe table.
4. Ramp mismatches (§9) — 64 / 37 / 42px headings vs 61 / 50 ramp.

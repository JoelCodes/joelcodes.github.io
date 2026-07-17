# Phase 37 — Figma Extraction Artifact (Landing, frame family 12:2)

> Source of truth for all Phase 37 FIDELITY-GAP values. Extracted 2026-07-16 from file
> `1tg8wIPcvOVC5tPZ8pkGO2` "Joel Shinness Solutions — Brand Exploration", canvas `12:2` "Site · Landing".
> Frames: `13:2` Landing / Desktop · 1440 (CANONICAL, D-10), `22:2` Full · 1920, `22:263` Tablet · 768,
> `22:524` Mobile · 390, `117:103` Desktop · 1440 · Dark (dark colors ONLY, D-10).
>
> **Tooling note:** figma-desktop MCP `get_design_context` hung/timed out repeatedly mid-session
> (transport drop, then 300s idle timeouts on every retry) while `get_metadata`, `get_screenshot`,
> and `get_variable_defs` kept working. Geometry/copy structure was taken from the full
> `get_metadata` XML of canvas `12:2`; per-section fills/type/effects were extracted with the
> official claude.ai Figma MCP `get_design_context` against the same file/node ids. All copy below
> is from light frames on canvas `12:2` (never from `117:103`).

---

## Answers to the three open questions (explicit)

- **FAQ section present in 12:2: NO.** Every frame (13:2, 22:2, 22:263, 22:524, 117:103) contains
  exactly nine sections — Hero, Who, Make, How, Auto, Proof, About, Agencies, Final — plus chrome
  (Site Header / Site Footer). No FAQ section, no FAQItem instances anywhere on the canvas.
  `FAQItem` stays unused by Phase 37; the `/faq → /` redirect keeps pointing at `/`.
- **Always-dark (ink-bg) section present: YES — Agencies (`17:2`).** Literal background
  `#12333B` in the light frame (node 17:2), shifting to literal `#16343C` in the dark frame
  (node 117:260). Non-flippable footer-precedent literals apply. Text on it: heading `#EAF6F3`
  (on-ink), body `#A9C9C7`, Eyebrow on-dark variant (`--accent-soft` `#5AA9A5`),
  `CTAButton variant="ghost-on-dark"` (border `rgba(255,255,255,0.35)`, label `#EAF6F3`).
- **About photo present: NO.** The About section (`16:14`) has a **placeholder** block, not a photo:
  frame `16:25` "portrait", 440×550 at 1440 (right column), radius `20px`, border `var(--color-wl-line)`,
  fill `linear-gradient(128.66deg, rgb(205,230,229) 0%, rgb(169,210,210) 71.429%)`, centered label
  text `PORTRAIT` (HG Regular 13px, `#5B8A8A`, tracking 1.82px) — node 16:26. Dark (117:258):
  gradient `rgb(21,58,68) → rgb(14,43,51)`, label `#8FB4B2`. `download_assets` on the whole light
  frame returned **zero raster images** — there is no photo asset anywhere in the frame. Build the
  placeholder as designed; swapping in a real photo is a future content task.

## FrequencyWave placement + sizing

- **Placement: Hero only** (node `13:21` "field" inside Hero `13:20`). No other section on any
  breakpoint or in the dark frame contains the wave field. (Footer chrome has its own WaveMark —
  already shipped, out of scope.)
- **Sizing:** absolutely positioned decorative background, `left: -115px; top: -100px;
  width: 1670px; height: 1044px` behind an 840px-tall hero — i.e. it bleeds past the hero on all
  sides at 1440. **Identical fixed geometry at 1920/768/390** (nodes 22:21, 22:282, 22:543): the
  frame is anchored left at −115px and does NOT stretch to 1920 (not full-bleed at 1920; right edge
  sits at 1555px, leaving the rightmost ~365px of a 1920 viewport waveless in the Figma frame).
  Executor note: `preserveAspectRatio="none"` + a full-width container is the closest web
  equivalent; any stretch-to-viewport behavior at >1555px is an implementation decision to log at
  the fidelity gate.
- Paths/viewBox/opacities: unchanged from Phase 36 extraction (`0 0 1670 1044`, 5 paths, group
  opacity 0.7, stroke `var(--color-wl-accent)`). Dark frame uses the same field (117:106).

## External URLs found (beyond the Calendly CTA)

- **None in the nine landing sections.** No text node or link in `13:2`'s section bodies contains
  a URL. CTAs are "Book a call" (Calendly, wired in code per D-05/D-06), "Email me" (mailto,
  D-07), and "Let's talk overflow →" (Agencies — no destination in Figma; see gaps).
- Footer chrome instance (49:118 / 22:237) shows text `contact@joelshinness.com · GitHub` —
  the GitHub link is Phase 34 shipped chrome, not a Phase 37 surface.

---

## Global section shell (all sections except Hero)

| Property | 390 | 768 | 1440 | 1920 | Source |
|---|---|---|---|---|---|
| Vertical padding (top & bottom) | `112px` | `112px` | `112px` | `112px` | py-112 on every section node; verified against XML y-offsets on all four frames |
| Horizontal gutter | `24px` | `32px` | `160px` | `400px` | section px + child x on 22:524 / 22:263 / 13:2 / 22:2 |
| Content width | 342 (fluid) | 704 (fluid) | 1120 | 1120 | gutters above |
| **Content max-width** | — | — | **1120px** | **1120px (capped, centered)** | 22:2: content x=400 in 1920 frame |

Hero is the exception: **no vertical padding — fixed 840px section height** (below the 64px
header) with content vertically centered (`justify-center`), at every breakpoint (13:20, 22:20,
22:281, 22:542 all h=840).

Standard intra-section stack gaps (identical across sections, from spacer frames):
eyebrow→h2 `21px` · h2→lead `18px` (How: `45px` straight to steps; Agencies: `15px`) ·
lead→content block `32px` (Who/Proof) or `42px` (Make/Auto) · content→kicker `29px` (How/Auto) ·
lead→btns `35px` (Final) · hero: h1→lead `26px`, lead→btns `38px`.

## Shared primitives as they appear in the landing frame

### Eyebrow (instances of 39:36 on-light / 39:38 on-dark)
34px × 1px dash + HG SemiBold 13px, tracking 2.86px (22%), uppercase, gap 13px.
On-light: `var(--accent)` `#0E7078` (dash + text). On-dark (Agencies only): `var(--accent-soft)` `#5AA9A5`.

Eyebrow copy per section (verbatim): `SOLUTIONS FOR SMALL BUSINESSES` (49:164) ·
`WHO IT'S FOR` (49:167) · `WHAT I BUILD` (49:170) · `HOW IT WORKS` (49:173) ·
`WHAT THAT LOOKS LIKE` (49:176) · `WHY TRUST ME WITH IT` (49:179) ·
`WHO YOU'D WORK WITH` (49:182) · `FOR AGENCIES` (49:185) · `GET IN TOUCH` (49:188).

### CTAButton (instances of 39:31)
| Variant | Values (light) | Dark deltas | Source |
|---|---|---|---|
| solid | bg `var(--ink)` `#12333B`, radius 13, px 27 / py 15, gap 9, icon 17px, label HG SemiBold 16 `var(--on-ink)` `#EAF6F3`, shadow `0 12px 28px -14px rgba(18,51,59,0.75)` (style "Shadow / CTA") | tokens flip (bg `#EAF6F3`, label `#12333B`); shadow literal `rgba(0,0,0,0.8)` | 49:144 / 117:123 |
| ghost | bg `rgba(255,255,255,0.4)`, border 1.5px `var(--accent)`, radius 13, px 27 / py 15, label HG SemiBold 16 `var(--ink)`, icon 17px | bg literal `rgba(255,255,255,0.04)`; border accent flips | 49:148 / 117:124 |
| ghost-on-dark | border 1.5px `rgba(255,255,255,0.35)`, radius 13, px 27 / py 15, label HG SemiBold 16 `var(--on-ink)` `#EAF6F3`, no icon | identical in dark frame (117:267) | 49:162 |

All values match the Phase 35 shipped CTAButton contract — compose, don't modify (except the
`target`/`rel` prop addition already approved in UI-SPEC).

### Type observed vs Phase 33 ramp (heights cross-checked on all four frames)
| Element | Extracted | Ramp match |
|---|---|---|
| Hero h1 (both lines) | Fraunces 76px lh 1.06 (46px @768, 42px @390 per node heights) | `.wl-display-hero` ✓ |
| Section h2 | Fraunces 50px lh 1.06 (34px @768, 32px @390) | `.wl-heading-h2` ✓ |
| Lead paragraphs | HG 21px lh 1.6 `var(--sub)` (18px ≤768) | `.wl-text-lead` ✓ |
| Body prose / card body / step body | HG 16px lh 1.6 `var(--sub)` | `.wl-text-body` ✓ |
| Eyebrow | HG SemiBold 13px tracking 22% | `.wl-label-eyebrow` ✓ |
| CTA label | HG SemiBold 16px | `.wl-label-button` ✓ |
| Who list item | HG Regular **17px, line-height normal**, `var(--sub)` | `.wl-text-body-large` is 17px/1.6 — lh differs (normal ≈ 22px); use 17px with tight lh |
| How/Auto kicker line | **Fraunces Italic 20px, lh normal, color INK `#12333B`** (not accent) | `.wl-accent-kicker` is 20px italic but accent — needs ink-colored variant/local override |
| Step number | Fraunces 38px lh 1 `var(--accent-soft)` (all breakpoints) | Step component (Phase 35) ✓ |
| Step / card title | Fraunces 21px lh normal ink (18px ≤768) | `.wl-heading-h3` ✓ |
| ServiceCard kicker | Fraunces Italic 16px accent | matches `.wl-accent-outcome` sizing (16px) — NOT 20px `.wl-accent-kicker` as UI-SPEC guessed |
| Proof credentials line | HG **15px** lh normal: SemiBold ink prefix + Regular `#4C6A70` companies (dark `#8FB4B2`) | **new 15px size + new literal colors — not in ramp** |
| tag-pill label | HG Bold 11px tracking 1.54px accent | matches Tag-style scale; pill is bespoke (see Make) |
| PORTRAIT label | HG Regular 13px tracking 1.82px `#5B8A8A` (dark `#8FB4B2`) | placeholder-local |

---

## Section 1 — Hero (Figma "Hero", node 13:20)

| Property | Value | Source |
|---|---|---|
| Background | vertical gradient `#E6F1F1` (sea-glass) → `#D2E7E7` (sea-glass-deep) | 13:20 |
| Background (dark) | vertical gradient `#123640` (sea-glass dark) → `#0C2228` (paper dark) — bottom stop is paper-dark, NOT sea-glass-deep (which has no dark flip) | 117:105 |
| Height / padding | fixed 840px, content vertically centered; px 160/400/32/24 at 1440/1920/768/390 | 13:20, 22:20, 22:281, 22:542 |
| Components | FrequencyWave (13:21, see above) · Eyebrow (49:164) · CTAButton solid + ghost (49:144, 49:148) | |
| Anchor id | none (no nav target) | |

Copy (verbatim, light 1440):
- Eyebrow: `SOLUTIONS FOR SMALL BUSINESSES` (49:164)
- h1 line 1: `It's not just software.` (13:31) — Fraunces 76px ink
- h1 line 2 ("rotor-line" 13:32): `It's ` (13:33, Fraunces 76px ink) + `time saved` (13:34,
  **Fraunces Italic 76px `var(--accent)` `#0E7078`**) + cursor bar (13:35, 2.5×64px `#0E7078`)
- Lead (13:37, width 640): `I build websites, automations, and practical AI that do real work for your business — give you back hours, cut costs, and show you what's actually going on. All my services are sized to your business: scoped to fix the problem, priced to pay for itself fast. You tell me what's eating your week — I'll get you your week back.`
- CTA 1: `Book a call` (I49:144;39:14, solid + calendar icon) · CTA 2: `Email me` (I49:148;39:21, ghost + mail icon)

Stack gaps: eyebrow→h1 21 · h1→lead 26 · lead→btns 38 · btns gap 16 · bottom spacer 35.

`[EXTRACTION GAP: rotor-line animated behavior — the layer name "rotor-line" plus the text cursor
bar imply a rotating/typewriter word treatment, but the static frame shows only the single word
"time saved" in all five frames. No alternate words are recorded anywhere in the file. Build
static ("time saved" + cursor bar) per the light frame; any animation is a phase decision to log
at the fidelity gate.]`

## Section 2 — Who (Figma "Who", node 14:2)

| Property | Value | Source |
|---|---|---|
| Background | `#F6FBFA` → `var(--wl-paper)` (dark frame binds `var(--paper)` — clean token flip) | 14:2 / 117:127 |
| Padding | py 112 all breakpoints; standard gutters | 14:2, 22:50, 22:311, 22:572 |
| Components | Eyebrow (49:167); checkmark list (bespoke — no existing wl component; check icon SVG below) | |
| Anchor id | none | |

Copy (verbatim):
- Eyebrow: `WHO IT'S FOR` (49:167)
- h2 (14:7, w 700): `You've got a business to run. The software should run itself.`
- Lead (14:9, w 700): `You know your business better than any consultant ever will — what you haven't had is time to build its tools. If any of these sound familiar, we should talk:`
- List (14:11, column gap 14, row = 22px check + 13px gap + HG 17px `var(--sub)`):
  1. `You're tired of duct-taping spreadsheets and manual steps together.` (14:15)
  2. `Your website is out of date, or quietly working against you.` (14:19)
  3. `An agency quoted you enterprise prices for a small-business need.` (14:23)
  4. `You want one reliable person, not a revolving team.` (14:27)

Note: in the Figma 390 frame the list items keep `whitespace-nowrap` widths (up to 513px) that
overflow the 390 frame — an authoring artifact. Build with wrapping text at small widths and log
as a pre-approved deviation at the gate.

## Section 3 — Three-ways / Services (Figma "Make", node 14:28) — anchor `#services`

| Property | Value | Source |
|---|---|---|
| Background | vertical gradient `#EFF7F6` → `#E6F1F1` (sea-glass) — **top stop `#EFF7F6` is a new literal, not a token** | 14:28 |
| Background (dark) | vertical gradient `#10303A` → `#0E2B33` (custom dark literals) | 117:151 |
| Padding | py 112 all breakpoints | 14:28, 22:76, 22:337, 22:598 |
| Card grid | 3 equal columns, gap 22 at 1440/1920; stacked vertically, gap 22 at 768/390 | 14:37, 22:346, 22:607 |
| Components | Eyebrow (49:170); 3 × ServiceCard (Card / Web 14:38, Card / Automations 14:49, Card / AI 14:62 = highlight) | |

Copy (verbatim):
- Eyebrow: `WHAT I BUILD` (49:170)
- h2 (14:33): `Three ways I help.`
- Lead (14:35, w 700): `Named the way you'd ask for them — described by what they do for your business.`

ServiceCard values as instantiated here (default variant — 14:38, 14:49):
white bg (`--wl-card-bg`), border 1px `var(--color-wl-line)` `rgba(14,112,120,0.16)`, radius 18,
padding px 27 / py 32, shadow `0 20px 40px -30px rgba(18,51,59,0.5)` (`--wl-card-shadow`).
Icon tile: 42px, radius 12, bg `rgba(14,112,120,0.1)` light / `rgba(90,169,165,0.14)` dark, 22px
stroke icon inside. **Note:** light icon-tile bg here is `rgba(14,112,120,0.1)`, not the solid
accent the Phase 35 token table lists — flag to executor to verify against shipped ServiceCard.
Internal gaps: tile→kicker 18 · kicker→title 10 · title→body 8.
Dark card: bg `#12333B`, shadow `rgba(0,0,0,0.8)` (matches `--wl-card-*` dark tokens).

Highlight variant (Card / AI 14:62): border `rgba(14,112,120,0.4)` (dark: `rgba(90,169,165,0.5)`),
drop-shadow `0 20px 20px rgba(18,51,59,0.5)` (dark `rgba(0,0,0,0.8)`), plus **tag-pill** (61:614)
absolutely positioned top −13px: white bg (dark `#12333B`), same 0.4-alpha accent border, radius
999, px 13 / py 5, label `ALL THE HELP, NONE OF THE HYPE` (14:63) HG Bold 11px tracking 1.54
`var(--accent)`. Pill is horizontally **centered** at 1440 (14:62) but **left-aligned at x=27** in
the 1920/768/390 frames (62:116, 62:135, 62:154) — inconsistent across breakpoints; build centered
per canonical 1440 and log the divergence for Joel (D-10 batch).

Card copy (verbatim, kicker / title / body):
1. Web (14:44/14:46/14:48): `Win more customers` / `Web` / `From the site that earns their trust to the custom tools that run your day — booking, tracking, dashboards, portals — fast, modern, perfect on a phone, and built around how you actually work.`
2. Automations (14:57/14:59/14:61): `Get hours back, every week` / `Automations` / `The tools you already use, wired together so data moves itself — no copy-pasting between apps, no forgotten follow-ups, no busywork.`
3. AI (14:72/14:74/14:76): `The judgment work, handled` / `AI` / `Straight answers on where AI actually pays off in your business — and where it doesn't. Then I put it to work inside your workflow: reading, sorting, drafting, summarizing the stuff that used to need a person.`

## Section 4 — How-it-works (Figma "How", node 15:2)

| Property | Value | Source |
|---|---|---|
| Background | `#F6FBFA` → `var(--wl-paper)` (dark binds `var(--paper)`) | 15:2 / 117:196 |
| Padding | py 112 all breakpoints | 15:2, 22:125, 22:386, 22:647 |
| Steps layout | 5 equal columns, gap 26 at 1440/1920; stacked vertically, gap 26 at 768/390 | 15:9, 22:132, 22:393, 22:654 |
| Components | Eyebrow (49:173); 5 × Step (49:191/197/203, 61:600/606) | |

Copy (verbatim):
- Eyebrow: `HOW IT WORKS` (49:173)
- h2 (15:7): `What working together actually looks like.` (h2→steps gap 45, no lead)
- Steps (number / title / body):
  1. `Discovery call` — `We talk about what's top of mind — the problems costing you time and money right now.` (49:191)
  2. `Design meeting` — `We talk solutions. I bring options; you pick what fits how you actually work.` (49:197)
  3. `Proposal & pricing` — `You'll know what it costs before I start building — a clear scope, a real number, and the reasoning behind both. You decide with the full picture.` (49:203)
  4. `Development` — `Built in short cycles and shown to you working the whole way — not a slideshow, the real thing. You react, I adjust, we repeat until it does the job right.` (61:600)
  5. `Support mode` — `It's live and earning its keep. Need a change? You've got a person, not a ticket queue.` (61:606)
- Kicker line (61:613, gap 29 above, Fraunces Italic 20px **ink**): `And every conversation along the way carries a standing question: is there a new way I can make your life easier?`

## Section 5 — Automations (Figma "Auto", node 15:28)

| Property | Value | Source |
|---|---|---|
| Background | vertical gradient `#E6F1F1` → `#DCEDEC` — **bottom stop `#DCEDEC` is a new literal** | 15:28 |
| Background (dark) | vertical gradient `#0E2B33` → `#0D262E` (custom dark literals) | 117:209 |
| Padding | py 112 all breakpoints | 15:28, 22:151, 22:412, 22:673 |
| Flow list | full-width rows, column gap 16 | 15:37 |
| Components | Eyebrow (49:176); 4 × "flow" row (bespoke — no existing wl component) | |

Flow row (15:38 etc.): white card (`--wl-card-bg`; dark `#12333B`), border 1px `var(--color-wl-line)`,
radius 14, px 24 / py 18, horizontal flex gap 19, items-center:
trigger (HG Regular 16 lh 1.6 `var(--sub)`, flex-1) → arrow (24px SVG, accent stroke) → result
(HG **SemiBold** 16 lh 1.6 `var(--ink)`, flex-1).
At 768/390 the row content stacks vertically inside the card: trigger on top, arrow **rotated 90°
(pointing down)** below it at the left, result underneath (22:422 etc.; rotation read from tablet
screenshot).

Copy (verbatim):
- Eyebrow: `WHAT THAT LOOKS LIKE` (49:176)
- h2 (15:33, w 800): `If you do it by hand every week, it can probably do itself.`
- Lead (15:35, w 700): `The highest-value, least-glamorous work I do — quietly saving you time and money. A few real examples:`
- Flows (trigger → result):
  1. `A new enquiry comes in` → `Logged, sorted, and pinged to your phone — no lead slips through.` (15:39/15:42)
  2. `A customer books online` → `Calendar updated, confirmation sent, reminder scheduled — zero manual steps.` (15:44/15:47)
  3. `Month-end rolls around` → `Your numbers pulled into one clean summary — hours back, and a clearer picture of the business.` (15:49/15:52)
  4. `An invoice gets paid` → `Recorded, receipt sent, next step triggered — your books stay current on their own.` (15:54/15:57)
- Kicker (15:59, gap 29 above, Fraunces Italic 20px ink): `Tell me the thing you dread doing every week. That's usually the first one to solve.`

## Section 6 — Proof (Figma "Proof", node 16:2)

| Property | Value | Source |
|---|---|---|
| Background | `#F6FBFA` → `var(--wl-paper)` (dark binds `var(--paper)`) | 16:2 / 117:239 |
| Padding | py 112 all breakpoints | 16:2, 22:183, 22:444, 22:705 |
| Components | Eyebrow (49:179) only — **no stats, no testimonials, no Badge/Callout** (UI-SPEC's "stats/testimonial" guess does not exist in the frame) | |

Copy (verbatim):
- Eyebrow: `WHY TRUST ME WITH IT` (49:179)
- h2 (16:7): `I build solutions people rely on.`
- Lead (16:9, w 700, HG 21 lh 1.6 sub): `My career has been building things people depend on every day — from a chat-safety system protecting players in a live online game, to design systems used by international brands. I bring that same care to a five-page website or a one-off automation: built properly, tested rigorously, and ready for anything. And none of it is a black box: you'll understand what we've built together, and how it'll make running your business that much easier.`
- Credentials line (16:11, gap 32 above, gap 4 between spans, 15px, lh normal):
  `Previously built software at ` (16:12, HG SemiBold ink) + `EA · Unity · lululemon · thatgamecompany.`
  (16:13, HG Regular **`#4C6A70`** light / **`#8FB4B2`** dark — new literals, no token)

## Section 7 — About (Figma "About", node 16:14) — anchor `#about`

| Property | Value | Source |
|---|---|---|
| Background | vertical gradient `#EFF7F6` → `#E6F1F1` (same pair as Make) | 16:14 |
| Background (dark) | vertical gradient `#10303A` → `#0E2B33` (same as Make dark) | 117:249 |
| Padding | py 112 all breakpoints | 16:14, 22:195, 22:456, 22:717 |
| Layout | 2 columns at 1440/1920: text (flex-1) + portrait 440×550 fixed, gap 48, items-center. Stacked at 768 (portrait below text, 340×425) and 390 (300×375) | 16:15/16:25, 22:457/22:467, 22:718/22:728 |
| Components | Eyebrow (49:182); portrait placeholder (see "About photo" answer above) | |

Copy (verbatim):
- Eyebrow: `WHO YOU'D WORK WITH` (49:182)
- h2 (16:20): `Hi, I'm Joel.`
- Para 1 (16:22, `.wl-text-lead` 21px sub): `I'm a developer and designer who likes making complicated things feel simple. I've built for big companies and small ones, and the hard part is rarely the code — it's understanding what someone actually needs and getting it done without drama.`
- Para 2 (16:24, `.wl-text-body` 16px sub, gap 19 above): `Away from the keyboard I'm usually solving some other kind of puzzle — I play a stack of string instruments, and I make digital and CNC art. Same instinct, different medium: I like figuring out how things work and building something good with it. That's the enthusiasm you get on your project, too.`
- Portrait label (16:26): `PORTRAIT`

## Section 8 — Agencies (Figma "Agencies", node 17:2) — ALWAYS-DARK

| Property | Value | Source |
|---|---|---|
| Background | **literal `#12333B`** (light frame); **literal `#16343C`** (dark frame) — non-flippable footer-precedent literals, slightly lighter in dark so the strip still reads as a band | 17:2 / 117:260 |
| Padding | py 112 all breakpoints | 17:2, 22:208, 22:469, 22:730 |
| Layout | horizontal flex gap 32, items-center: text column (flex-1) + ghost-on-dark CTA right, at 1440/1920. CTA drops below text at 768 (y 337) / 390 (y 335) | 17:3/49:162, 22:470/22:478, 22:731/22:739 |
| Components | Eyebrow **on-dark** (49:185, accent-soft); CTAButton **ghost-on-dark** (49:162) | |

Copy (verbatim):
- Eyebrow: `FOR AGENCIES` (49:185)
- h2 (17:8, Fraunces 50 `#EAF6F3`, gap 15 to body): `Need reliable overflow dev?`
- Body (17:10, HG **17px** lh 1.6 **`#A9C9C7`**, w 620): `An extra pair of experienced hands — React, TypeScript, Next.js, and the messy integration and API work most people would rather not touch. Dependable, low-drama, and easy to brief.`
- CTA (I49:162;39:26): `Let's talk overflow →` (arrow is part of the label text)

`[EXTRACTION GAP: destination for "Let's talk overflow →" — the Figma frame carries no link
target. Likely mailto per D-07, but that is a wiring decision, not an extracted value.]`

## Section 9 — Final CTA (Figma "Final", node 17:13)

| Property | Value | Source |
|---|---|---|
| Background | vertical gradient `#E6F1F1` → `#D2E7E7` (same pair as Hero) | 17:13 |
| Background (dark) | vertical gradient `#123640` → `#0C2228` (same as Hero dark) | 117:268 |
| Padding | py 112 all breakpoints | 17:13, 22:219, 22:480, 22:741 |
| Layout | column, **center-aligned** (only centered section); lead w 660 centered | 17:13 |
| Components | Eyebrow (49:188); CTAButton solid + ghost (49:153, 49:157 — identical values to Hero CTAs) | |

Copy (verbatim):
- Eyebrow: `GET IN TOUCH` (49:188)
- h2 (17:18, centered): `Have something in mind?`
- Lead (17:20, w 660, centered): `Tell me what you're trying to do. If there's a solution that saves you time or money, I'll tell you what it'd take. If there isn't, I'll tell you that too.`
- CTA 1: `Book a call` (I49:153;39:14, solid + calendar) · CTA 2: `Email me` (I49:157;39:21, ghost + mail)

Gaps: eyebrow→h2 21 · h2→lead 18 · lead→btns 35 · btns gap 16.

---

## Icon SVGs extracted from the frame (verbatim paths, stroke → `currentColor`/token)

All stroke-based, `stroke-width="2"`; Figma stroke color noted. Downloaded from the frame's
asset exports 2026-07-16 (calendar/mail confirm the Phase 35 CTAButton set; check/arrow/card
icons are the landing's additions to the closed set).

| Icon | viewBox | Figma stroke | Path(s) |
|---|---|---|---|
| Check (Who list, 14:13) | `0 0 22 22` | `#0E7078` accent | `M18.3333 5.5L8.25 15.5833L3.66667 11` (round cap/join) |
| Arrow (Auto flow, 15:40) | `0 0 24 24` | `#0E7078` accent | `M5 12H19M13 18L19 12L13 6` (round cap/join) |
| Web card icon (14:40) | `0 0 22 22` | `#0E7078` | `M17.4167 3.66667H4.58333C3.57081 3.66667 2.75 4.48748 2.75 5.5V14.6667C2.75 15.6792 3.57081 16.5 4.58333 16.5H17.4167C18.4292 16.5 19.25 15.6792 19.25 14.6667V5.5C19.25 4.48748 18.4292 3.66667 17.4167 3.66667Z` + `M2.75 7.33333H19.25M6.41667 18.3333H15.5833` (round cap) |
| Automations card icon (14:66) | `0 0 22 22` | `#0E7078` | three 1.83-r circles at (4.58,5.5), (4.58,16.5), (17.42,11): `M4.58333 7.33333C5.59586 7.33333 6.41667 6.51252 6.41667 5.5C6.41667 4.48748 5.59586 3.66667 4.58333 3.66667C3.57081 3.66667 2.75 4.48748 2.75 5.5C2.75 6.51252 3.57081 7.33333 4.58333 7.33333Z` · `M4.58333 18.3333C5.59586 18.3333 6.41667 17.5125 6.41667 16.5C6.41667 15.4875 5.59586 14.6667 4.58333 14.6667C3.57081 14.6667 2.75 15.4875 2.75 16.5C2.75 17.5125 3.57081 18.3333 4.58333 18.3333Z` · `M17.4167 12.8333C18.4292 12.8333 19.25 12.0125 19.25 11C19.25 9.98748 18.4292 9.16667 17.4167 9.16667C16.4041 9.16667 15.5833 9.98748 15.5833 11C15.5833 12.0125 16.4041 12.8333 17.4167 12.8333Z` + connectors `M6.41667 5.5H10.0833C11.0558 5.5 11.9884 5.88631 12.6761 6.57394C13.3637 7.26158 13.75 8.19421 13.75 9.16667M6.41667 16.5H10.0833C11.0558 16.5 11.9884 16.1137 12.6761 15.4261C13.3637 14.7384 13.75 13.8058 13.75 12.8333` (round cap) |
| AI card icon (61:615) | `0 0 22 22` | `#0E7078` | `M11 2.75L12.742 7.883L17.875 9.625L12.742 11.367L11 16.5L9.258 11.367L4.125 9.625L9.258 7.883L11 2.75Z` + sparkle `M17.417 3.208V5.958M16.042 4.583H18.792` (round cap/join) |
| Calendar (CTA, I49:144;39:16) | `0 0 17 17` | `#EAF6F3` on-ink | `M5.66667 1.41667V3.54167M11.3333 1.41667V3.54167M2.125 6.375H14.875M3.54167 3.54167H13.4583C13.6462 3.54167 13.8264 3.61629 13.9592 3.74913C14.092 3.88197 14.1667 4.06214 14.1667 4.25V13.4583C14.1667 13.6462 14.092 13.8264 13.9592 13.9592C13.8264 14.092 13.6462 14.1667 13.4583 14.1667H3.54167C3.3538 14.1667 3.17364 14.092 3.0408 13.9592C2.90796 13.8264 2.83333 13.6462 2.83333 13.4583V4.25C2.83333 4.06214 2.90796 3.88197 3.0408 3.74913C3.17364 3.61629 3.3538 3.54167 3.54167 3.54167Z` (round cap/join) |
| Mail (CTA, I49:148;39:23) | `0 0 17 17` | `#12333B` ink | `M2.125 4.95833L8.5 9.20833L14.875 4.95833M2.125 4.25H14.875V12.75H2.125V4.25Z` (round cap/join) |

## Dark-mode contract findings (from 117:103 — colors only, D-10)

Dark ≠ pure semantic flip. Three classes of behavior:
1. **Token-flip sections** (Who, How, Proof): bg bound to `var(--paper)`; all text tokens flip.
   Existing `.dark` block covers these with zero new CSS.
2. **Gradient sections need dark-literal stops** (no token pair exists for gradients):
   - Hero & Final: `#E6F1F1→#D2E7E7` light ⇢ `#123640→#0C2228` dark
   - Make & About: `#EFF7F6→#E6F1F1` light ⇢ `#10303A→#0E2B33` dark
   - Auto: `#E6F1F1→#DCEDEC` light ⇢ `#0E2B33→#0D262E` dark
3. **Always-dark Agencies**: bg literal `#12333B` (light) / `#16343C` (dark) — the strip itself
   theme-shifts; text/CTA values identical in both themes.
   Extra literals: Proof credentials `#4C6A70`⇢`#8FB4B2`; portrait gradient
   `rgb(205,230,229)→rgb(169,210,210)` ⇢ `rgb(21,58,68)→rgb(14,43,51)` and label `#5B8A8A`⇢`#8FB4B2`;
   CTA solid shadow `rgba(18,51,59,0.75)`⇢`rgba(0,0,0,0.8)`; CTA ghost bg `rgba(255,255,255,0.4)`⇢
   `rgba(255,255,255,0.04)` (both already Phase 35 component-local); card shadows/tiles follow
   `--wl-card-*` dark tokens.

## Cross-breakpoint structural notes (from 12:2 metadata XML)

- Make cards, How steps: 3-col/5-col rows → single stacked column at 768/390 (same gaps 22/26).
- Auto flow rows: horizontal → internal vertical stack with 90°-rotated arrow at 768/390.
- About: portrait right column → below text at 768/390 (340×425 / 300×375).
- Agencies: CTA right → below text at 768/390.
- Final: centered at every breakpoint.
- Hero: 840px fixed height every breakpoint; type steps down per ramp (76→46→42).
- Header chrome at 390 (22:536): nav shows only `Showcase` + `Book a call` — `Services`/`About`
  links are absent on mobile in Figma. SiteHeader is Phase 34 shipped chrome; log divergence
  (if any) at the gate rather than modifying chrome beyond planned scroll-spy work.
- tag-pill alignment divergence (centered @1440, left @1920/768/390) — build per canonical 1440,
  log for Joel (D-10 batch).
- Who list nowrap overflow at 390 — authoring artifact; wrap in build.

## Contrast-pair additions for scripts/check-contrast.mjs

| Pair | Light | Dark | Target |
|---|---|---|---|
| Ink on hero/final gradient (worst stop `#D2E7E7`) | `#12333B` on `#D2E7E7` | `#EAF6F3` on `#0C2228` | 4.5:1 |
| Sub on hero/final gradient (worst stop `#D2E7E7`) | `#35525A` on `#D2E7E7` | `#A9C9C7` on `#0C2228` | 4.5:1 |
| Accent italic "time saved" 76px on gradient | `#0E7078` on `#E6F1F1`/`#D2E7E7` | `#4FB3B8` on `#123640`/`#0C2228` | 3:1 (large) |
| Ink/sub on Make/About gradient (worst stop `#E6F1F1`) | `#12333B` / `#35525A` on `#E6F1F1` | `#EAF6F3` / `#A9C9C7` on `#0E2B33` | 4.5:1 |
| Ink/sub on Auto gradient (worst stop `#DCEDEC`) | `#12333B` / `#35525A` on `#DCEDEC` | `#EAF6F3` / `#A9C9C7` on `#0D262E` | 4.5:1 |
| Agencies heading on-ink on strip | `#EAF6F3` on `#12333B` | `#EAF6F3` on `#16343C` | 4.5:1 |
| Agencies body on strip | `#A9C9C7` on `#12333B` | `#A9C9C7` on `#16343C` | 4.5:1 |
| Agencies eyebrow accent-soft on strip (13px SemiBold) | `#5AA9A5` on `#12333B` | `#5AA9A5` on `#16343C` | 4.5:1 |
| Agencies ghost-on-dark label | `#EAF6F3` on `#12333B` | `#EAF6F3` on `#16343C` | 4.5:1 |
| Proof credentials companies (15px) | `#4C6A70` on `#F6FBFA` | `#8FB4B2` on `#0C2228` | 4.5:1 |
| Flow result ink on card-bg | `#12333B` on `#FFFFFF` | `#EAF6F3` on `#12333B` | 4.5:1 (pre-existing pair) |
| tag-pill accent 11px bold on white | `#0E7078` on `#FFFFFF` | `#4FB3B8` on `#12333B` | 4.5:1 |
| PORTRAIT label on placeholder gradient | `#5B8A8A` on `rgb(205,230,229)` | `#8FB4B2` on `rgb(21,58,68)` | decorative placeholder — check anyway, flag if failing |

## Extraction gaps (complete list — 2)

1. `[EXTRACTION GAP: rotor-line animated behavior — layer name "rotor-line" + cursor bar imply a
   rotating word treatment; static frames show only "time saved". No alternate words exist in the
   file. Build static; animation is a phase decision.]` (Hero, 13:32)
2. `[EXTRACTION GAP: destination URL for Agencies CTA "Let's talk overflow →" — no link target in
   Figma. Wiring decision for 37-03/37-04 (likely mailto per D-07); log choice at gate.]` (49:162)

## Reference screenshots

Saved via Figma PNG export (claude.ai Figma MCP `download_assets`, scaled render 903×4096):
- `.planning/phases/37-landing-page/fidelity/37-figma-12-2.png` (light 1440 frame `13:2`)
- `.planning/phases/37-landing-page/fidelity/37-figma-117-103.png` (dark 1440 frame `117:103`)

These are working references; full-resolution gate captures (4 breakpoints × 2 themes vs
rendered site) still happen at the Wave 5 fidelity gate per plan.

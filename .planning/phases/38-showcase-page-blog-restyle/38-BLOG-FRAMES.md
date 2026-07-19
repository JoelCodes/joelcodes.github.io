# Phase 38 — Blog Frame Drafts (D-05–D-08)

> Drafted 2026-07-18 by Claude via claude.ai Figma MCP (`use_figma`), per plan 38-02.
> File key: `1tg8wIPcvOVC5tPZ8pkGO2` ("Joel Shinness Solutions — Brand Exploration").
> All four frames live on the NEW page **"Blog"** (page node `211:2`). LIGHT-ONLY per the
> UI-SPEC discretion call — dark is derived at build via the D-04 landing recipe.

**Approval status: APPROVED** — Joel, 2026-07-19. Approved as drafted, no edits.
Canonical build references: `Blog Index / 1440` (`211:3`), `Blog Index / 390` (`211:4`),
`Blog Post / 1440` (`211:5`), `Blog Post / 390` (`211:6`). COPY GAP resolved: **"WRITING"**
eyebrow label confirmed. Blog build work (Plans 05–06) is unlocked (D-08 gate cleared).

## Frames

| Frame | Node ID | Width | Composition |
|---|---|---|---|
| `Blog Index / 1440` | `211:3` | 1440 | Site Header instance (42:29) → PageHero (showcase 27:20 pattern: pt88/pb72/px160, sea-glass gradient, Eyebrow instance 39:36 "WRITING" → 21 → Fraunces 64 h1 → 18 → HG 21 lead) → editorial Post List (px160, 1120 column, 4 entries with Fraunces 28 titles, date + Tag instances (39:44) meta row, HG 16 description, 1px `color/line` hairline dividers) → Site Footer instance (42:77) |
| `Blog Index / 390` | `211:4` | 390 | Same structure at 24px gutters; Site Header/Footer Mobile instances (42:47 / 42:104); h1 40, entry titles 24, meta rows wrap |
| `Blog Post / 1440` | `211:5` | 1440 | Site Header (42:29) → Article (centered 720 column, title-first per D-12): Fraunces 52 h1 → meta row (date + 3 Tag instances) → FeaturedImage slot (720×405, sea-glass gradient + Fraunces Italic 16 white@85% label, radius 18, ProjectCard-thumb treatment) → Prose (paragraph, Fraunces 34 h2, accent underlined link, blockquote with 3px accent left bar + Fraunces Italic 22, bulleted list, dark JetBrains Mono code block on `color/ink` radius 12, closing paragraph) → Site Footer (42:77) |
| `Blog Post / 390` | `211:6` | 390 | Same article at 24px gutters; Mobile header/footer instances; h1 34, prose h2 26, quote 19, code 12, image 342×192 |

## Brand-system compliance

- Colors bound to local brand variables wherever paint-level binding is supported:
  `color/paper` (frame fills), `color/ink`, `color/sub`, `color/accent`, `color/line`, `color/on-ink`.
  Gradient hero/thumb fills are literals matching the extracted showcase values
  (`#E6F1F1→#D2E7E7` hero; `#0E7078→#14323B`-family thumb) — gradients can't bind stops to variables.
- Type: Fraunces Regular/Italic (headings, quote, image label) + Hanken Grotesk (body/meta),
  JetBrains Mono (code placeholder). 8-point spacing throughout (88/72/64/48/32/24/21/18/12 —
  21/18 gaps are frame-verbatim from the 38-EXTRACTION PageHero pattern).
- Components instanced, never modified: Site Header (42:29/42:47), Site Footer (42:77/42:104),
  Eyebrow (39:36 via set 39:41), Tag (39:44). Tag instance fills carry the component's accent@8%
  paint opacity (re-applied — instance creation dropped the 8% paint opacity; component untouched).

## Copy sources (nothing invented)

- Index h1 "Blog" + lead — verbatim from `src/pages/blog/index.astro` (title/description).
- Entries: real frontmatter from `im-pivoting.mdx` and `getting-started-with-automation.mdx`
  (titles, pubDates, descriptions, first 3 tags each). Entries 3–4 repeat the same two real
  posts for visual rhythm only — no invented posts.
- Post frame: "I'm Pivoting" title/meta/prose excerpts verbatim; blockquote sentence and code
  snippet verbatim from the automation post. Link/blockquote treatments are presentation of
  real copy (neither post contains a literal link or blockquote).

## [COPY GAP] log

1. `[COPY GAP]` Index eyebrow label — set to placeholder text **"WRITING"** (node `212:21` /
   `212:1132`); not derivable from the repo (no eyebrow exists on the current blog index).
   Joel to confirm or replace at approval.

## Notes

- Pre-existing pages **"Site · Blog" (195:102)** and **"Site · Blog Post" (195:210)** were found
  in the file containing an earlier, differently-scoped blog concept (invented sample posts,
  one 1440 frame each). They were NOT touched and are NOT part of this draft's scope — Joel may
  want to reconcile or delete them at review.
- No pre-existing node was modified: all created nodes live under new page `211:2`; verified via
  `get_metadata` (four frames only, correct names/widths 1440/390/1440/390).

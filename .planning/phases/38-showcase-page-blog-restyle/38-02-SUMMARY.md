---
phase: 38-showcase-page-blog-restyle
plan: 02
status: complete
requirements: [PAGE-06]
key-files:
  created:
    - .planning/phases/38-showcase-page-blog-restyle/38-BLOG-FRAMES.md
  modified: []
commits:
  - "docs(38-02): draft blog Figma frames and record node IDs"
---

# Plan 38-02 Summary — Blog Figma Frames Drafted

## What was built

Four light-only blog frames drafted in brand file `1tg8wIPcvOVC5tPZ8pkGO2` on a NEW page **"Blog" (`211:2`)** via the claude.ai Figma MCP `use_figma` (the mandatory `figma-use` + `figma-generate-design` skills were read in full before any write call). Executed by an MCP-capable orchestrator-dispatched agent because gsd-executor subagents have no MCP access.

| Frame | Node ID | Width |
|-------|---------|-------|
| `Blog Index / 1440` | `211:3` | 1440 |
| `Blog Index / 390` | `211:4` | 390 |
| `Blog Post / 1440` | `211:5` | 1440 |
| `Blog Post / 390` | `211:6` | 390 |

## Composition (D-06: from existing components/variables only)

- Chrome: Site Header (`42:29` desktop / `42:47` mobile), Site Footer (`42:77` / `42:104`) instances
- Primitives: Eyebrow (`39:36`), Tag (`39:44`) instances; colors bound to brand variables (`color/paper`, `ink`, `sub`, `accent`, `line`, `on-ink`)
- Index (D-11): PageHero pattern reused from 38-EXTRACTION.md (pt88/pb72, 160↔24 gutters, 1120 column) + single-column text-only editorial list, hairline dividers, Tag pills. Thumbnails omitted (discretion call: text-only reads cleaner and matches the editorial direction).
- Post (D-12): title-first — Fraunces h1 → date/tags meta → gradient featured-image slot (ProjectCard thumb treatment, italic Fraunces label) → 720px prose column demonstrating paragraph, h2, accent link, accent-bar blockquote, bullet list, dark JetBrains Mono code block.
- All entry/prose copy is verbatim from the two real MDX posts ("Getting Started with Automation", "I'm Pivoting") — zero invented post copy; repeat entries reuse real copy for rhythm.

## Light-only + derived dark

Frames are light-only per the UI-SPEC discretion call; dark treatment is derived at build time via the D-04 landing dark recipe. No dark frames drafted.

## COPY GAP log

1. Blog index eyebrow label **"WRITING"** — placeholder, not derivable from repo copy. Joel confirms or replaces at approval.

## Flags for Joel's review (Plan 04 checkpoint)

- **Pre-existing blog concept pages found in the file:** "Site · Blog" (`195:102`) and "Site · Blog Post" (`195:210`) — an earlier draft with invented copy. Untouched. Joel should reconcile: adopt the new `211:*` frames (this plan's, real copy, brand components) or merge ideas from the old pages.
- Tag instance fills initially dropped the component's 8% paint opacity on instantiation — re-applied at 8%; all four frames screenshot-verified.

## Gate status

**Approval status: PENDING JOEL (Plan 38-04 hard checkpoint).** These frames become canonical build references only after approval — no blog build work (Plans 05/06) may start before then (D-08).

## Deviations

- Plan executed by an orchestrator-dispatched MCP-capable agent instead of gsd-executor (executors lack MCP tool access — same constraint class as the recorded Pencil MCP limitation). Verification steps from the plan were all performed (frame list via get_metadata, no existing nodes modified).

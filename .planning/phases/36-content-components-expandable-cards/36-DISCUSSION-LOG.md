# Phase 36: Content Components + Expandable Cards - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-16
**Phase:** 36-content-components-expandable-cards
**Areas discussed:** ProjectCard toggle structure, projects.json data layer, Animation fallback policy, Figma content handling

---

## ProjectCard toggle structure

| Option | Description | Selected |
|--------|-------------|----------|
| Whole closed card | Entire closed-state content inside `<summary>` — click anywhere to expand | ✓ |
| Dedicated toggle row | Only a "Read the story" row + chevron is the summary | |
| Title + chevron only | The `<h3>` row is the summary; rest renders outside `<details>` | |

**User's choice:** Whole closed card (Recommended)

| Option | Description | Selected |
|--------|-------------|----------|
| Independent | Each card opens/closes on its own; no `name` attribute | ✓ |
| Exclusive-open | Opening one project collapses the others | |

**User's choice:** Independent (Recommended)

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, id from slug | `<article id={slug}>`, browser scrolls to card, no auto-expand | |
| Yes, and auto-expand | id + tiny inline script to open targeted details | |
| No anchors | Not URL-addressable; add later in Phase 38 if wanted | ✓ |

**User's choice:** No anchors

| Option | Description | Selected |
|--------|-------------|----------|
| Accept native flattening | Full card content announced as button label; no ARIA overrides | ✓ |
| Point the label at the title | `aria-labelledby` referencing the `<h3>` | |

**User's choice:** Accept native flattening (Recommended)

---

## projects.json data layer

| Option | Description | Selected |
|--------|-------------|----------|
| Content Collection | Astro Content Collection with Zod schema; matches blog pattern; typed getCollection() | ✓ |
| Plain JSON, keep current path | Rewrite in place, imported directly; no schema enforcement | |
| Plain JSON + TS type | Keep JSON + typed accessor module | |

**User's choice:** Content Collection (Recommended)

| Option | Description | Selected |
|--------|-------------|----------|
| Delete old pages now | Pull /projects/* deletion forward from Phase 41; repoint /portfolio redirects at / | ✓ |
| Keep v1 file alongside | Two project data sources until Phase 41 | |
| Patch old pages minimally | Patch dead pages just enough to build | |

**User's choice:** Delete old pages now (Recommended)
**Notes:** Discovered mid-discussion that `src/pages/projects/index.astro` and `[slug].astro` still import v1 projects.json — both entries draft:true, so prod listing already empty.

| Option | Description | Selected |
|--------|-------------|----------|
| Single JSON file | file() loader over one src/data/projects.json array | ✓ |
| One file per project | glob() loader over src/content/projects/*.json | |

**User's choice:** Single JSON file (Recommended)

---

## Animation fallback policy

| Option | Description | Selected |
|--------|-------------|----------|
| Progressive enhancement | Unsupported browsers get instant open/close; zero extra code | ✓ |
| max-height fallback | Universal max-height transition with generous ceiling | |
| interpolate-size + height:auto | Modern syntax, same support profile | |

**User's choice:** Progressive enhancement (Recommended)

| Option | Description | Selected |
|--------|-------------|----------|
| Ship independently | Chevron rotation animates everywhere, even where panel snaps | ✓ |
| Couple them | Same @supports guard for both effects | |

**User's choice:** Ship independently (Recommended)

---

## Figma content handling

| Option | Description | Selected |
|--------|-------------|----------|
| Ship what exists, flag gaps | Verbatim per-card copy; missing fields omitted + flagged | |
| Only complete cards | Card enters v2 only if every field has Figma copy | |
| Block and ask first | Extraction pauses with gap list before writing data | |
| Other (free text) | Dummy data + dev-gate showcase | ✓ |

**User's choice (free text):** "Let's make this dummy data. Give every project the data from the expanded version, and I'll fill it in with data later. Now that we're talking about this, we may want to hide the showcase link and page behind dev until I have full project data."
**Notes:** Clarified in follow-up: duplicate the one Figma expanded card's copy across ALL entries (same placeholder story everywhere); dev-gate BOTH the /showcase page and its nav link (blog treatment) until real project data exists — captured as a locked Phase 38 note.

---

## Claude's Discretion

- Zod schema field optionality/strictness (mirror UI-SPEC props contract)
- Collection name and file() loader mechanics in content.config.ts
- Whether ::details-content animation CSS lives in global.css or component styles
- FAQItem FIDELITY-GAPs (type class, surface, indicator SVG) — resolved by Figma extraction
- Isolation page internal layout (mirrors Figma 36:5 order per UI-SPEC)
- Sequencing of old-pages deletion within the phase (build green at every commit)

## Deferred Ideas

- **Phase 38: dev-gate /showcase + nav link** until Joel supplies real project data (blog-gate pattern); keep /portfolio redirects pointed at / until showcase goes live
- **ProjectCard URL anchors / deep-linking** — revisit in Phase 38 during showcase assembly

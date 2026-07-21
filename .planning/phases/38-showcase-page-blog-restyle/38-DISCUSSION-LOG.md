# Phase 38: Showcase Page + Blog Restyle - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-18 (resumed from 2026-07-17 checkpoint)
**Phase:** 38-showcase-page-blog-restyle
**Areas discussed:** Showcase publish state & data, Blog design authority, Blog structure & features, Showcase page behavior

---

## Showcase publish state & data (from 2026-07-17 session)

| Option | Description | Selected |
|--------|-------------|----------|
| I'll supply real data now | Joel provides real project stories to replace placeholders | |
| Keep dev-gated (Recommended) | Blog-gate pattern, honors Phase 36 lock; goes live later by flipping the gate | ✓ |
| Ship with one real story | Hybrid: one real entry, rest placeholder | |

**User's choice:** Keep dev-gated

| Option | Description | Selected |
|--------|-------------|----------|
| Gate the nav link too (Recommended) | Showcase link renders dev-only (isDev pattern like footer Blog link) | ✓ |
| Keep link, land on / | Link stays but redirects in prod | |
| Leave the dead link | Accept the 404 until launch | |

**User's choice:** Gate the nav link too

| Option | Description | Selected |
|--------|-------------|----------|
| Match Figma count (Recommended) | Duplicate placeholder entries until sections match frame 12:3 card counts | ✓ |
| Keep 2, accept mismatch | Fidelity gate compares fewer cards than the frame shows | |
| You decide | Claude's discretion | |

**User's choice:** Match Figma count

| Option | Description | Selected |
|--------|-------------|----------|
| Semantic flip, flag as derived (Recommended) | Let the token flip handle dark; flag at gate | |
| Mirror the landing dark recipe | Apply Phase 37's extracted 117:103 section treatments explicitly | ✓ |
| Ask me at the gate | Defer the call | |

**User's choice:** Mirror the landing dark recipe

---

## Blog design authority

| Option | Description | Selected |
|--------|-------------|----------|
| Derive from existing patterns (Recommended) | Compose blog from wl system; derived, flagged at gate | |
| Design blog frames in Figma first | Add blog mockups to the Figma file, keeping single-source-of-truth literal | ✓ |
| Minimal token swap only | Keep current layout, swap tokens/fonts only | |

**User's choice:** Design blog frames in Figma first
**Notes:** Declined the recommended derive-from-patterns path — Figma stays the complete record of the site.

| Option | Description | Selected |
|--------|-------------|----------|
| Claude drafts, Joel approves (Recommended) | Claude generates frames via Figma MCP from existing components; Joel reviews | ✓ |
| Joel designs them | Phase blocks until Joel produces frames | |
| Co-design live | Section-by-section MCP drafting with live feedback | |

**User's choice:** Claude drafts, Joel approves

| Option | Description | Selected |
|--------|-------------|----------|
| Index + post, desktop + mobile (Recommended) | Two mockups at 1440 + 390; tag pages derived; 768/1920 responsive | ✓ |
| Full 4-breakpoint parity | Index/post at all four breakpoints | |
| Desktop only | 1440 only, responsive derived at gate | |

**User's choice:** Index + post, desktop + mobile

| Option | Description | Selected |
|--------|-------------|----------|
| Showcase first, frames in parallel (Recommended) | Execution starts with Showcase; frames drafted early; approval checkpoint before blog build | ✓ |
| Frames before planning | Manual approval stop before plan-phase runs | |
| Checkpoint mid-execution | Frames as wave 1, checkpoint gates all build work | |

**User's choice:** Showcase first, frames in parallel

| Option | Description | Selected |
|--------|-------------|----------|
| Same gate as other pages (Recommended) | Frame-vs-rendered comparison at 1440/390, light + dark | ✓ |
| Lighter review pass | Eyeball in dev, no formal comparison | |
| You decide | Claude picks gate rigor during planning | |

**User's choice:** Same gate as other pages

---

## Blog structure & features

| Option | Description | Selected |
|--------|-------------|----------|
| Keep tag pages (Recommended) | Restyle as derived surface (index layout + filtered heading) | ✓ |
| Drop tag pages | Delete while dev-only; tags become non-clickable labels | |
| You decide | Claude picks during planning | |

**User's choice:** Keep tag pages

| Option | Description | Selected |
|--------|-------------|----------|
| Single-column list, editorial (Recommended) | Full-width stacked entries; writing-archive feel | ✓ |
| Card grid with featured images | 2–3 column image-led grid like v1.3 | |
| Minimal text index | Titles + dates only | |

**User's choice:** Single-column list, editorial

| Option | Description | Selected |
|--------|-------------|----------|
| Title-first, image below (Recommended) | Title + date/tags, then featured image, then prose; schema untouched | ✓ |
| Full-bleed image hero | Image above title like v1.3 | |
| Make featured image optional | Schema change; typography-led posts possible | |

**User's choice:** Title-first, image below

| Option | Description | Selected |
|--------|-------------|----------|
| wl prose styles + retheme code blocks (Recommended) | Full brand prose + expressive-code rethemed light/dark | ✓ |
| wl prose, keep default code theme | Stock syntax theme stays | |
| You decide | Claude picks theming depth | |

**User's choice:** wl prose styles + retheme code blocks

---

## Showcase page behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Skip until launch (Recommended) | No anchors while data is placeholder; slugs will change | ✓ |
| Anchors + auto-expand now | id per card + hash-open script | |
| Anchors only | ids for scrolling, no auto-expand | |

**User's choice:** Skip until launch

| Option | Description | Selected |
|--------|-------------|----------|
| Keep at / until launch (Recommended) | Repoint to /showcase in the same change that flips the gate | ✓ |
| Repoint to /showcase now | Dead redirect in prod until launch | |
| Env-conditional targets | Build-mode branching in astro.config.mjs | |

**User's choice:** Keep at / until launch

| Option | Description | Selected |
|--------|-------------|----------|
| All cards closed (Recommended) | Expanded frame is a state spec, not a default | ✓ |
| First card open per section | Lead card ships with open attribute | |
| Match the frame literally | Replicate whatever state 12:3's page mockup shows | |

**User's choice:** All cards closed

---

## Claude's Discretion

- Dev-gate mechanism for `/showcase` (mirror Phase 34 blog exclusion mechanics)
- Figma MCP frame-drafting mechanics (tooling, frame placement/naming, light-only vs light+dark drafts)
- Blog card component naming/API (Phase 35 conventions)
- expressive-code theming mechanics; wl prose delivery (global vs component styles)
- Showcase section composition beyond the two card sections (build what 12:3 shows)
- Fidelity-gate screenshot mechanics (Phase 34–37 precedent)

## Deferred Ideas

- Showcase launch bundle: un-gate page + nav link, repoint `/projects` + `/portfolio*` redirects, add deep-linking
- Blog relaunch bundle: restore prod pages + sitemap, un-gate Blog link (standing from Phase 34)
- Blog frames at 768/1920 — only if responsive derivation proves insufficient

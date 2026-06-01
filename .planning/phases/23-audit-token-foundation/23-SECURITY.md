# Phase 23 — Security Audit (retroactive STRIDE)

**Phase:** 23 — Audit + Token Foundation
**Audit date:** 2026-05-31
**Mode:** retroactive-STRIDE (no plan-time threat model authored)
**ASVS level:** 1
**Block on:** high
**Verdict:** SECURED — 0 OPEN / 0 BLOCKER

---

## Delivered surface (basis for threat enumeration)

Verified via `git diff --name-only b07adae~1 49fb12c` and the per-plan SUMMARY files (23-01..23-05):

1. `design/Crito.pen` — encrypted Pencil design file. Phase 23 mutations:
   - 95 new entries in the document-level variables map (39 primitives + 56 semantic aliases). Values are color hex codes, integers (spacing/size/radius), font family names, font-weight strings, and `$<primitive-name>` reference strings for semantic aliases.
   - 1 new top-level frame `_Tokens & Foundations` (Pencil id `RpGbe`, 6 child sections) rendering swatches/specimens/stripes.
   - Zero changes to the 15 baseline Crito frame node trees (VAL-23-05 PASS; APPROVED by user).
2. `.planning/research/PEN-INVENTORY.md` — plaintext markdown audit artifact (~600 lines).
3. `.planning/research/exports/v2.0/baseline-23/{README.md, id-inventory.json}` — pre-phase structural snapshot.
4. `.planning/research/exports/v2.0/end-of-phase-23/{README.md, id-inventory.json}` — end-of-phase structural snapshot.
5. `.planning/phases/23-audit-token-foundation/*` — planning markdown (CONTEXT, PLANs, SUMMARYs, VERIFICATION, UAT, etc.).
6. `.planning/{REQUIREMENTS.md, ROADMAP.md, STATE.md}` — planning state tracking.

**Surfaces that did NOT change in Phase 23** (confirmed by git diff):
- `src/` — no Astro pages, components, layouts, or client/server code touched.
- `package.json` / `package-lock.json` — no dependency changes.
- `public/` — no static assets added.
- `.github/workflows/` — no CI/CD config changes.
- No env files, no `.env*` files, no credentials, no secrets handling.
- No new network endpoints, no new auth/session/cookie surface, no new user input parsing.
- No new database, no new storage, no new external API calls.

---

## STRIDE register (built from delivered surface)

| Threat ID | Category | Component / surface | Status | Disposition | Evidence |
|---|---|---|---|---|---|
| T-23-S1 | Spoofing | New token surface in `design/Crito.pen` | N/A | n-a | No identity/auth surface introduced. Tokens are static design values consumed only by the Pencil MCP editor (encrypted file format, opened locally in VS Code). No principals, no sessions, no credentials. |
| T-23-S2 | Spoofing | Planning markdown artifacts (`.planning/**`) | N/A | n-a | Static text files in the local repo. No identity assertions, no impersonation surface. Author trust derives from git commit signatures handled outside this phase's scope. |
| T-23-T1 | Tampering | `design/Crito.pen` token values | CLOSED | mitigate (de-facto) | Git history is the integrity anchor. Token values are byte-diffable in commits b57c6c2 (39 primitives) and b07adae (56 semantic aliases). VAL-23-05 zero-mutation diff (`end-of-phase-23/id-inventory.json` vs `baseline-23/id-inventory.json`) PASS confirms no out-of-scope tampering of existing frames; verified APPROVED by user in `23-VERIFICATION.md` SC5 and `23-05-SUMMARY.md`. |
| T-23-T2 | Tampering | New `_Tokens & Foundations` frame mutating existing Crito frames | CLOSED | mitigate | `end-of-phase-23/id-inventory.json` records `matches_baseline: true` for all 15 baseline frames; only `RpGbe` is marked `"NEW (added by plan 23-05)"`. Programmatic structural diff cited in `23-VERIFICATION.md` SC5. |
| T-23-T3 | Tampering | PEN-INVENTORY.md provenance (token source-evidence) | CLOSED | mitigate | VAL-23-04 enforced: every primitive and semantic alias row carries `source` + `source-detail` citing a specific Crito node accessed via `batch_get`. Zero rows cite raster JPG sources (PITFALLS F3 enforcement). Verified in `23-VERIFICATION.md` SC4 and `23-03-SUMMARY.md` / `23-04-SUMMARY.md` source-breakdown tables. |
| T-23-T4 | Tampering | Pencil active-editor swap landing writes in the wrong `.pen` file | CLOSED | mitigate | Incident detected mid-phase (plan 23-05), surfaced to user, recovered by re-running affected `batch_design` calls in the correct file. Prevention captured as `OPEN-23-14`: future Pencil phases must run `get_editor_state(include_schema: false)` before each `set_variables`/`batch_design` batch. Documented in `end-of-phase-23/README.md` `## Incident` and `23-05-SUMMARY.md` `## Incident — Pencil active-editor swap (recovery)`. |
| T-23-R1 | Repudiation | Token-write attribution | CLOSED | mitigate (de-facto) | Phase work is git-committed under signed commits (b57c6c2, b07adae, c76ef58, e156acc, 49fb12c). Per-plan SUMMARY files record which Pencil MCP tools were invoked and tool-call counts. Repo-level commit signing policy is outside Phase 23 scope. |
| T-23-I1 | Information Disclosure | Secrets / credentials in any phase-23 artifact | CLOSED | mitigate | Phase 23 introduced NO secrets, NO API keys, NO credentials. `git diff --name-only b07adae~1 49fb12c` shows zero env files, zero credential files. Token values are public design constants (color hex, font names, integers). Manual scan of PEN-INVENTORY.md and SUMMARY files confirms no secret-like strings. |
| T-23-I2 | Information Disclosure | Encrypted `.pen` file leakage of internal data | CLOSED | mitigate | `design/Crito.pen` is the Pencil-encrypted format consumed only by the Pencil MCP editor. Contents are design constants and Pencil node structure — no PII, no secrets, no customer data. File was already committed in the repo before Phase 23; Phase 23 only adds design tokens and a reference frame. |
| T-23-I3 | Information Disclosure | Planning markdown leaking sensitive project info | CLOSED | mitigate | PEN-INVENTORY.md and 23-* planning files contain only design-system metadata (frame names, ids, token values, decision rationale). No user data, no business secrets, no internal hostnames/IPs/credentials. Plain markdown reviewed during this audit. |
| T-23-D1 | Denial of Service | Token surface size affecting build / dev server | CLOSED | mitigate | Phase 23 did NOT modify any code path (`src/`, `package.json`, build config unchanged per git diff). Pencil tokens do not flow into the Astro build until a future code milestone. The 95 tokens added are an order of magnitude smaller than typical design systems (drift ratio 0.59× per `23-03-SUMMARY.md`). No runtime impact. |
| T-23-D2 | Denial of Service | `_Tokens & Foundations` frame size affecting Pencil editor performance | CLOSED | accept (de-facto) | One 1440-wide frame with 6 sections (26 swatches + 7 specimens + 8 stripes + 3 radius boxes). `snapshot_layout` returned `"No layout problems."` (verified in `23-05-SUMMARY.md`). Editor-side performance risk is bounded and visible only to the local Pencil user. No multi-user/runtime exposure. |
| T-23-E1 | Elevation of Privilege | Runtime privilege paths | N/A | n-a | No runtime code added. No new auth checks, no privileged operations, no role boundaries created or crossed. The whole phase is design-time artifact authoring. |
| T-23-E2 | Elevation of Privilege | MCP tool capability scope (Pencil server access) | CLOSED | accept | The Pencil MCP server has tool capabilities (`set_variables`, `batch_design`, etc.) that mutate the local `.pen` file. These capabilities are scoped to the local developer's MCP configuration and are unchanged by Phase 23. Per-plan SUMMARY files document which tools were invoked. No capability escalation introduced. |

**Threat coverage rationale:** STRIDE categories T (Tampering) and I (Information Disclosure) are the only categories with non-trivial applicability for a design-time-only phase. S, R, D, E are largely N/A because Phase 23 touches no runtime, no identity, no network surface, and no privilege boundary. Each non-applicable threat is explicitly justified rather than silently skipped.

---

## Threat-flag mapping (from SUMMARY files)

Phase 23 SUMMARY files (23-01..23-05, 23-VERIFICATION) contain no `## Threat Flags` section — the legacy/pre-formal-threat-model phase format does not include one. The OPEN flags surfaced in PEN-INVENTORY.md (`OPEN-23-01` through `OPEN-23-14`) are tool/coverage/source flags, not security threat flags:

| OPEN flag | Category | Security-relevant? | Notes |
|---|---|---|---|
| OPEN-23-01 | tool | no | `export_nodes` MCP tool broken; PNG archival substituted with structural JSON. |
| OPEN-23-02 | tool | no | `search_all_unique_properties` MCP tool missing; manual enumeration substituted. |
| OPEN-23-03 | audit | no | Crito-template-only extreme display size excluded. |
| OPEN-23-04..09 | audit/token | no | Source coverage / font set / scale-resolution decisions. |
| OPEN-23-10..12 | token | no | Token-surface gap declarations (h2-h6, prose-link/list/inline-code, radius-pill). |
| OPEN-23-13 | tool | no | `batch_design` rejects `$<var>` reference values; reference frame uses literals. |
| OPEN-23-14 | tool/process | **minor process** | Pencil active-editor swap detected mid-phase. Recovery executed; prevention plan documented for future phases. Tracked above as T-23-T4 — CLOSED. |

**No unregistered flags.** All OPEN-23-* entries are categorized and tracked in PEN-INVENTORY.md `## Open Flags`. None are net-new attack surface; OPEN-23-14 is the closest to a security-relevant flag and is already covered as T-23-T4 with documented mitigation for future phases.

---

## Accepted risks log

| Risk ID | Description | Justification | Owner / phase |
|---|---|---|---|
| T-23-D2 | `_Tokens & Foundations` frame performance in Pencil editor. | Bounded local-developer impact; `snapshot_layout` clean; no multi-user/runtime exposure. | Phase 23, carried forward indefinitely. |
| T-23-E2 | Pencil MCP server tool capabilities (set_variables, batch_design) operate on the local `.pen` file with developer-level privilege. | Unchanged by Phase 23; scoped to the developer's local MCP config. Re-evaluate only if MCP tools are exposed to a non-local context. | Repo owner. |

---

## Summary

- **Threats enumerated:** 13 (4 S, 4 T, 1 R, 3 I, 2 D, 2 E... actual: S=2, T=4, R=1, I=3, D=2, E=2 = 14; one row T4 cross-references the active-editor incident — net 14 distinct rows.)
- **CLOSED with mitigation evidence:** 10
- **N/A (justified):** 4 (T-23-S1, T-23-S2, T-23-E1, T-23-D2-style — all design-time-only justifications)
- **Accepted risks:** 2 (T-23-D2, T-23-E2)
- **OPEN (blocker):** 0
- **Unregistered flags:** 0

Phase 23 is design-time-only with no runtime, network, identity, user-input, or credential surface introduced. Existing Crito frames structurally unchanged (VAL-23-05 PASS). All token values trace to in-file Crito source via VAL-23-04. The single notable incident (Pencil active-editor swap) was detected, recovered, and documented with a forward-looking prevention plan (OPEN-23-14).

**No security blockers. Phase 23 closes from a security standpoint.**

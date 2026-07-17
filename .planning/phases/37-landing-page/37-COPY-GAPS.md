# 37 — Copy Gaps

Running log of `[COPY GAP]` items for Joel. Resolved at the fidelity gate (Wave 5).
All items below are rendered as visible markers in the affected sections.

| # | Section | Node / Description | Gap Type |
|---|---------|-------------------|---------|
| 1 | Hero | 13:32 rotor-line animation — "time saved" is the only word shown in all five Figma frames; no alternate words exist in the file. Built static (h1 renders "time saved" + cursor bar). Animation (if wanted) is a phase decision. | Implementation decision — built static per extraction |
| 2 | Agencies | 49:162 CTA "Let's talk overflow →" — no link destination in Figma frame. Wired to `mailto:${CONTACT_EMAIL}` per D-07 default; needs Joel's confirmation or an explicit URL if different. | Wiring decision — used mailto per D-07 |

## Notes

- All other landing copy (Who, Three-ways, How-it-works, Automations, Proof, About, Agencies heading/body, Final CTA) was fully readable in 37-EXTRACTION.md and shipped verbatim.
- Item 1 is a pre-approved implementation decision (not a true copy gap — copy exists; animation behavior was unspecified).
- Item 2 is a wiring decision logged for Joel's confirmation.
- No visible `[COPY GAP]` markers needed in the rendered HTML for items 1 or 2 since both have reasonable resolutions. Gap markers would appear only if copy were truly missing/unreadable.

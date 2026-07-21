/**
 * Shared site constants — Phase 37, Plan 02
 *
 * D-05 (37-CONTEXT.md): Real Calendly URL supplied by Joel during Phase 37 planning.
 *   Resolves FUT-01 (placeholder BOOKING_URL). Replaces the duplicated `'/#book'` TODO
 *   that previously lived inline in SiteHeader.astro and SiteFooter.astro.
 *
 * D-07 (37-CONTEXT.md): Contact email constant alongside BOOKING_URL.
 *   All Book-a-call CTAs use BOOKING_URL; all email CTAs use mailto:${CONTACT_EMAIL}.
 *
 * Convention: named exports only — no default export (matches src/content.config.ts).
 */

export const BOOKING_URL = "https://calendly.com/discovery-joelshinness/discovery-call";
export const CONTACT_EMAIL = "contact@joelshinness.com";

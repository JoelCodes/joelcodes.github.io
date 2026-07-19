/**
 * Reading time utility — Phase 38 Plan 06 (PAGE-06)
 *
 * Computes an estimated reading time from raw text content.
 * Formula: ceil(wordCount / 200) — standard 200 wpm reading rate.
 *
 * Usage:
 *   import { readingMinutes } from '../lib/reading-time';
 *   const mins = readingMinutes(post.body);
 *
 * Returns: integer ≥ 1 (never 0 — a post always takes ≥1 minute).
 */

/**
 * Count words in a string (whitespace-split, no empty tokens).
 */
export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Compute reading time in minutes: ceil(words / 200).
 * @param text  Raw body text (MDX body string or any prose).
 * @returns     Integer minutes, minimum 1.
 */
export function readingMinutes(text: string): number {
  return Math.max(1, Math.ceil(wordCount(text) / 200));
}

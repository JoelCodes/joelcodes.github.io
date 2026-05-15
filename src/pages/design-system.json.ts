/**
 * GET /design-system.json
 *
 * Machine-readable v2 design token endpoint — flat semantic shape.
 * Five top-level keys: colors, spacing, radii, typography, fonts.
 * Values copied verbatim from src/styles/v2/global.css @theme block.
 *
 * Intended for: AI coding agents discovering v2 design tokens,
 * design tooling, and internal reference (noindex — not search-indexed).
 */

export async function GET() {
  const tokens = {
    colors: {
      primary: {
        cssVar: '--color-primary',
        oklch: 'oklch(0.225 0.044 264.6)',
      },
      'primary-hover': {
        cssVar: '--color-primary-hover',
        oklch: 'oklch(0.286 0.054 264.6)',
      },
      surface: {
        cssVar: '--color-surface',
        oklch: 'oklch(1 0 0)',
      },
      'surface-muted': {
        cssVar: '--color-surface-muted',
        oklch: 'oklch(0.985 0 0)',
      },
      text: {
        cssVar: '--color-text',
        oklch: 'oklch(0.225 0.044 264.6)',
      },
      'text-muted': {
        cssVar: '--color-text-muted',
        oklch: 'oklch(0.395 0.011 274.7)',
      },
      border: {
        cssVar: '--color-border',
        oklch: 'oklch(0.864 0.005 286.3)',
      },
      accent: {
        cssVar: '--color-accent',
        oklch: 'oklch(0.79 0.184 148.5)',
      },
    },

    spacing: {
      xs: { cssVar: '--spacing-xs', rem: '0.5rem' },
      sm: { cssVar: '--spacing-sm', rem: '1rem' },
      md: { cssVar: '--spacing-md', rem: '1.5rem' },
      lg: { cssVar: '--spacing-lg', rem: '2rem' },
      xl: { cssVar: '--spacing-xl', rem: '3rem' },
      '2xl': { cssVar: '--spacing-2xl', rem: '5rem' },
    },

    radii: {
      sm: { cssVar: '--radius-sm', value: '0.375rem' },
      md: { cssVar: '--radius-md', value: '0.625rem' },
      lg: { cssVar: '--radius-lg', value: '1rem' },
      full: { cssVar: '--radius-full', value: '9999px' },
    },

    typography: {
      display: { cssVar: '--text-display', rem: '3rem' },
      h1: { cssVar: '--text-h1', rem: '2.25rem' },
      h2: { cssVar: '--text-h2', rem: '1.875rem' },
      h3: { cssVar: '--text-h3', rem: '1.5rem' },
      h4: { cssVar: '--text-h4', rem: '1.25rem' },
      body: { cssVar: '--text-body', rem: '1rem' },
      small: { cssVar: '--text-small', rem: '0.875rem' },
      caption: { cssVar: '--text-caption', rem: '0.75rem' },
    },

    fonts: {
      display: {
        cssVar: '--font-display',
        stack: 'Plus Jakarta Sans Variable, ui-sans-serif, system-ui, sans-serif',
      },
      text: {
        cssVar: '--font-text',
        stack: 'Inter Variable, ui-sans-serif, system-ui, sans-serif',
      },
      weights: {
        display: 700,
        text: 400,
        textBold: 500,
      },
      leading: {
        display: 1.4,
        text: 1.6,
      },
    },
  };

  return new Response(JSON.stringify(tokens, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

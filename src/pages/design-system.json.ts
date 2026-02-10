export async function GET() {
  const tokens = {
    colors: {
      primary: {
        yellow: {
          cssVar: '--color-yellow',
          oklch: 'oklch(0.85 0.18 95)',
          hex: '#ffef6a',
          dark: {
            cssVar: '--color-yellow-dark',
            oklch: 'oklch(0.80 0.16 95)',
            hex: '#f5e03b'
          }
        },
        turquoise: {
          cssVar: '--color-turquoise',
          oklch: 'oklch(0.70 0.15 195)',
          hex: '#4dd4c0',
          dark: {
            cssVar: '--color-turquoise-dark',
            oklch: 'oklch(0.65 0.13 195)',
            hex: '#2dbfaa'
          }
        },
        magenta: {
          cssVar: '--color-magenta',
          oklch: 'oklch(0.65 0.20 350)',
          hex: '#d946ef',
          dark: {
            cssVar: '--color-magenta-dark',
            oklch: 'oklch(0.60 0.18 350)',
            hex: '#c026d3'
          }
        }
      },
      text: {
        yellowText: { cssVar: '--color-yellow-text', oklch: 'oklch(0.55 0.15 95)' },
        turquoiseText: { cssVar: '--color-turquoise-text', oklch: 'oklch(0.45 0.12 195)' }
      },
      neutral: {
        bgLight: { cssVar: '--color-bg-light', oklch: 'oklch(1.0 0 0)', hex: '#ffffff' },
        bgDark: { cssVar: '--color-bg-dark', oklch: 'oklch(0.15 0 0)', hex: '#1a1a1a' },
        textLight: { cssVar: '--color-text-light', oklch: 'oklch(0.2 0 0)', hex: '#1a1a1a' },
        textDark: { cssVar: '--color-text-dark', oklch: 'oklch(0.95 0 0)', hex: '#f5f5f5' }
      }
    },
    typography: {
      families: {
        heading: 'Bricolage Grotesque',
        body: 'DM Sans'
      },
      scale: {
        xs: { rem: '0.75rem', px: '12px' },
        sm: { rem: '0.875rem', px: '14px' },
        base: { rem: '1rem', px: '16px' },
        lg: { rem: '1.125rem', px: '18px' },
        xl: { rem: '1.25rem', px: '20px' },
        '2xl': { rem: '1.5rem', px: '24px' },
        '3xl': { rem: '1.875rem', px: '30px' },
        '4xl': { rem: '2.25rem', px: '36px' }
      },
      weights: {
        h1: 800, h2: 700, h3: 600, h4: 500, body: 400
      }
    },
    components: {
      Button: {
        variants: ['yellow', 'turquoise', 'magenta'],
        sizes: ['sm', 'md', 'lg'],
        props: {
          variant: { type: 'string', default: 'yellow' },
          size: { type: 'string', default: 'md' },
          href: { type: 'string', optional: true }
        }
      },
      Card: {
        variants: ['yellow', 'turquoise', 'magenta'],
        props: {
          variant: { type: 'string', default: 'yellow' },
          stacked: { type: 'boolean', default: false }
        }
      },
      Input: {
        variants: ['yellow', 'turquoise', 'magenta'],
        props: {
          variant: { type: 'string', default: 'yellow' },
          label: { type: 'string', optional: true },
          error: { type: 'string', optional: true }
        }
      },
      Badge: {
        variants: ['yellow', 'turquoise', 'magenta'],
        props: {
          label: { type: 'string', required: true },
          value: { type: 'string', required: true },
          description: { type: 'string', optional: true },
          variant: { type: 'string', default: 'yellow' }
        }
      }
    },
    utilities: {
      shadow: ['iso-shadow-sm', 'iso-shadow', 'iso-shadow-lg'],
      glow: ['iso-glow-subtle', 'iso-glow', 'iso-glow-strong'],
      rotate: ['iso-rotate', 'iso-rotate-subtle', 'iso-rotate-steep'],
      hover: ['iso-hover-lift', 'iso-hover-glow']
    }
  };

  return new Response(JSON.stringify(tokens, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

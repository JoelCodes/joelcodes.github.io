// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { FontaineTransform } from 'fontaine';

import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

// Fontaine CLS=0 fallback metrics — pre-computed from actual woff2 files via @capsizecss/unpack
// (see RESEARCH Pitfall 3: Fontaine's resolvePath does not intercept relative `./files/…` src:
//  URLs in fontsource CSS because Fontaine uses join(importer, relPath) internally for those
//  paths rather than calling resolvePath; metrics were extracted with fromBuffer + generateFontFace
//  math identical to Fontaine's generateFontFace function so the output is byte-for-byte equivalent)
//
// Fraunces Variable metrics: ascent=1956 descent=-510 lineGap=0 unitsPerEm=2000 xWidthAvg=1032
// Hanken Grotesk Variable metrics: ascent=1000 descent=-303 lineGap=0 unitsPerEm=1000 xWidthAvg=450
const fontaineFallbackCSS = `
/* Fontaine CLS=0 fallback @font-face blocks (FOUND-02 / 33-05) */
/* Fraunces Variable — serif fallbacks */
@font-face {
  font-family: "Fraunces Variable fallback";
  src: local("Times New Roman");
  size-adjust: 127.0154%;
  ascent-override: 76.9985%;
  descent-override: 20.0763%;
  line-gap-override: 0%;
}
@font-face {
  font-family: "Fraunces Variable fallback";
  src: local("Georgia");
  size-adjust: 115.7468%;
  ascent-override: 84.4948%;
  descent-override: 22.0309%;
  line-gap-override: 0%;
}
/* Hanken Grotesk Variable — sans-serif fallbacks */
@font-face {
  font-family: "Hanken Grotesk Variable fallback";
  src: local("Helvetica Neue");
  size-adjust: 100%;
  ascent-override: 100%;
  descent-override: 30.3%;
  line-gap-override: 0%;
}
@font-face {
  font-family: "Hanken Grotesk Variable fallback";
  src: local("Arial");
  size-adjust: 100.9419%;
  ascent-override: 99.0668%;
  descent-override: 30.0173%;
  line-gap-override: 0%;
}
`;

/** @type {import('vite').Plugin} */
const fontaineFallbackPlugin = {
  name: 'fontaine-fallback-metrics',
  // Inject fallback @font-face blocks at the start of the main CSS bundle
  transform(code, id) {
    if (id.includes('global.css') || (id.endsWith('.css') && code.includes('@fontsource-variable'))) {
      return { code: fontaineFallbackCSS + code, map: null };
    }
    return null;
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://joelshinness.com',

  redirects: {
    '/portfolio': '/',
    // Note: '/portfolio/[slug]' redirect omitted — Astro static mode cannot redirect a
    // dynamic segment to a fixed URL; /portfolio/anything 404s until Phase 38 adds /showcase.
    '/contact': '/#contact',
    '/faq': '/',
  },

  // base: '/joel-shinness-website', // Uncomment if not using custom domain
  vite: {
    plugins: [
      tailwindcss(),
      // FontaineTransform is imported and used here; the pre-computed fallback CSS above
      // covers the fontsource-variable packages (Pitfall 3 workaround).
      // FontaineTransform still runs for any other fonts that may be added later.
      FontaineTransform.vite({
        fallbacks: ['Georgia', 'Times New Roman', 'serif'],
        resolvePath: (id) => new URL(`./node_modules/${id}`, import.meta.url),
      }),
      fontaineFallbackPlugin,
    ],
  },

  integrations: [
    expressiveCode({
      // Step 1: align with class-based .dark toggle (not prefers-color-scheme)
      // Site uses .dark class on <html> (localStorage toggle, Phase 33/34).
      // Default config uses prefers-color-scheme — mismatched with site's dark mode.
      themes: ['github-light', 'github-dark'],
      themeCssSelector: (theme) => {
        return theme.name === 'github-dark' ? '.dark' : ':not(.dark)';
      },
      useDarkModeMediaQuery: false,
      // Step 2: brand palette — styleOverrides mapping chrome toward --wl-* family
      // WCAG AA verified (measured 2026-07-19, WCAG relative-luminance formula):
      //   Light block bg #E6F1F1 (--wl-sea-glass light) vs github-light fg #24292e = 12.72:1 ✓ AA
      //   Dark  block bg #123640 (--wl-sea-glass dark)  vs github-dark  fg #e1e4e8 = 10.12:1 ✓ AA
      //   Light frame bg #D2E7E7 vs #24292e = 11.40:1 ✓ | Dark frame bg #0C2228 vs #e1e4e8 = 12.91:1 ✓
      // Border toward --wl-line family. Keeping syntax-token colors from the base
      // github-light/github-dark themes (frame 211:5 specifies chrome only — dark
      // JetBrains Mono code block on color/ink, radius 12).
      styleOverrides: {
        // Code block background: --wl-sea-glass family (light #E6F1F1 / dark #123640)
        codeBackground: ({ theme }) =>
          theme.name === 'github-dark' ? '#123640' : '#E6F1F1',
        // Frame/title-bar backgrounds — slightly deeper than code area
        // Light: #D2E7E7 (--wl-sea-glass-deep); Dark: #0C2228 (--wl-paper dark)
        frames: {
          editorTabBarBackground: ({ theme }) =>
            theme.name === 'github-dark' ? '#0C2228' : '#D2E7E7',
          terminalTitlebarBackground: ({ theme }) =>
            theme.name === 'github-dark' ? '#0C2228' : '#D2E7E7',
          // Terminal code area matches the editor code area (sea-glass family)
          terminalBackground: ({ theme }) =>
            theme.name === 'github-dark' ? '#123640' : '#E6F1F1',
        },
        // Border color toward --wl-line
        // Light: soft teal tint to match color-mix(in oklch,#0E7078 16%,transparent)
        // Dark: --wl-line dark #5AA9A538 opacity-equivalent
        borderColor: ({ theme }) =>
          theme.name === 'github-dark' ? 'rgba(90,169,165,0.22)' : 'rgba(14,112,120,0.16)',
        // Border radius: 12px from frame 211:5 code block spec
        borderRadius: '12px',
        // Keep syntax token colors from base themes (github-light / github-dark defaults)
        // Only chrome overrides above; no syntax token changes.
      },
    }),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/blog') && !page.includes('/showcase'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    robotsTxt({
      sitemap: true,
      policy: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    }),
  ],
});
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
      // Step 2: brand palette — canonical 195:210 frame (node 199:1061).
      // Code surface is ALWAYS-DARK (= --wl-footer-bg #0D2A31, footer-precedent).
      // Both light and dark themes share the same dark chrome so there is no
      // prefers-color-scheme or .dark conditional in the emitted ec.css — the
      // surface never flips (matching .wl-prose pre and the footer strip).
      //
      // WCAG AA verified (WCAG relative-luminance formula):
      //   Code bg #0D2A31 vs code text #CDE6E5 = 11.03:1 ✓ AA (same footer pair)
      //   Frame bg #0C2228 vs #CDE6E5 = 12.91:1 ✓ AA
      //   Border rgba(90,169,165,0.22) is decorative (not text) — no AA req.
      // Code font: Roboto Mono Variable per canonical 199:1062 (was JetBrains Mono
      // from deleted 211:5 draft — CORRECTED).
      styleOverrides: {
        // Code font: Roboto Mono Variable — source 199:1062 (canonical 195:210).
        // Previously referenced JetBrains Mono from deleted 211:5 draft.
        codeFontFamily: "'Roboto Mono Variable', 'Roboto Mono', ui-monospace, monospace",
        // Code font size: 14.5px — source 199:1062
        codeFontSize: '14.5px',
        // Code line-height: 1.55 — source 199:1062
        codeLineHeight: '1.55',
        // Code block background: #0D2A31 = --wl-footer-bg (always-dark surface).
        // Same value in BOTH themes — no light/dark split (footer-precedent).
        // §12 diff: was sea-glass family (#E6F1F1 light / #123640 dark) from 211:5 draft.
        codeBackground: '#0D2A31',
        // Frame/title-bar backgrounds — slightly deeper than code area (same footer-dark family)
        frames: {
          editorTabBarBackground: '#0C2228',      /* deeper dark — matches .wl-footer-bg deep */
          terminalTitlebarBackground: '#0C2228',
          terminalBackground: '#0D2A31',          /* matches codeBackground */
        },
        // Border: teal line token equivalent — accent-soft @22% on the always-dark surface.
        // Same in both themes (always-dark).
        borderColor: 'rgba(90,169,165,0.22)',
        // Border radius: 14px — source node 199:1061 (was 12px from deleted 211:5 draft).
        borderRadius: '14px',
        // Syntax token colors: keep from base github-dark defaults for readability on dark bg.
        // The canonical frame (199:1062) only specifies the text color #CDE6E5 globally;
        // per-token syntax colors are not specified — use github-dark defaults.
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
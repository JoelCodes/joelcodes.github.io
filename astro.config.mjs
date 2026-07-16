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
    expressiveCode(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/blog'),
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
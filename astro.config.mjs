// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://joelshinness.com',

  // base: '/joel-shinness-website', // Uncomment if not using custom domain
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    expressiveCode(),
    mdx(),
    sitemap({
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
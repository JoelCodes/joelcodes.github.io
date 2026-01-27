// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://joel-shinness.github.io',
  // base: '/joel-shinness-website', // Uncomment if not using custom domain
  vite: {
    plugins: [tailwindcss()],
  },
});

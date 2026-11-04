// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Change this to the live domain before launch.
const SITE = 'https://hertablesociety.com';

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Utility pages stay out of the sitemap.
      filter: (page) =>
        !/\/(styleguide|thank-you|404|account|join|checkout)(\/|$)/.test(new URL(page).pathname),
    }),
  ],
  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { syncProjectMedia } from './scripts/sync-project-media';

export default defineConfig({
  site: 'https://m4elstr0m.github.io',
  integrations: [react(), sitemap(), syncProjectMedia()],
  vite: {
    plugins: [tailwindcss()],
  },
});

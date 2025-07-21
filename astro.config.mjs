// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), alpinejs()],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  server: {
    port: 4321,
    host: true
  }
});
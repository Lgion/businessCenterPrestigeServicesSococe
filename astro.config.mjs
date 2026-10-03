import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://lgion.github.io',
  base: '/businessCenterPrestigeServicesSococe',
  output: 'static',
  outDir: 'docs',
  server: {
    port: 4321,
    host: true
  }
});

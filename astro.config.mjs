import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import clerk from '@clerk/astro';
// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [clerk()],
  vite: {
    build: {
      rollupOptions: {
        external: ['cloudflare:workers']
      }
    },
    ssr: {
      external: ['cloudflare:workers']
    }
  },
  server: {
    port: 4321,
    host: true
  }
});

import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import clerk from '@clerk/astro';

const hasClerkKey = Boolean(process.env.PUBLIC_CLERK_PUBLISHABLE_KEY);

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: hasClerkKey ? [clerk()] : [],
  server: {
    port: 4321,
    host: true
  }
});

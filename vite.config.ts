import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { barberShopSchema, faqSchema } from './src/lib/seo';

const page = (name: string) => fileURLToPath(new URL(`./${name}.html`, import.meta.url));

/**
 * Injects JSON-LD into index.html at build time, generated from the same data
 * objects the page renders — so the markup can never drift from the content.
 */
function structuredData(): Plugin {
  return {
    name: '1up-structured-data',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        if (!ctx.path.endsWith('/index.html') && ctx.path !== '/') return html;
        const json = JSON.stringify([barberShopSchema(), faqSchema()]);
        return {
          html,
          tags: [
            {
              tag: 'script',
              attrs: { type: 'application/ld+json' },
              children: json,
              injectTo: 'head' as const,
            },
          ],
        };
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), structuredData()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: page('index'),
        privacy: page('privacy'),
        accessibility: page('accessibility'),
      },
    },
  },
});

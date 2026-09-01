/**
 * GitHub Pages serves static files only — it has no rewrite rule, so a direct
 * hit on /services would 404 instead of reaching the client router. Pages does
 * serve 404.html for any unmatched path, so shipping a copy of index.html under
 * that name boots the SPA and lets React Router resolve the URL.
 */
import { copyFile } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
await copyFile(new URL('index.html', dist), new URL('404.html', dist));
console.log('SPA fallback: dist/404.html written from dist/index.html');

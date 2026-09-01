/**
 * Renders the app to static HTML and bakes it into dist/index.html.
 * The client then hydrates that markup instead of building the DOM from scratch,
 * so the page is readable (and crawlable) before any JavaScript runs.
 */
import { build } from 'vite';
import { readFile, writeFile, rm, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const ssrOut = new URL('../dist-ssr/', import.meta.url);

await build({
  root,
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: 'dist-ssr', emptyOutDir: true, copyPublicDir: false },
});

const { render } = await import(new URL('entry-server.js', ssrOut).href);
const markup = render();

const indexPath = new URL('../dist/index.html', import.meta.url);
const html = await readFile(indexPath, 'utf8');

if (!html.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find the empty #root container in dist/index.html');
}

await writeFile(indexPath, html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`));

/* The single stylesheet is small enough to inline, which removes the only
   render-blocking request in front of first paint. */
const assetsDir = new URL('../dist/assets/', import.meta.url);
const cssFile = (await readdir(assetsDir)).find((f) => f.endsWith('.css'));
let inlined = 0;

if (cssFile) {
  const css = await readFile(new URL(cssFile, assetsDir), 'utf8');
  const linkPattern = new RegExp(`\\s*<link[^>]+href="[^"]*${cssFile}"[^>]*>`, 'g');

  for (const page of ['index.html', 'privacy.html', 'accessibility.html']) {
    const pagePath = new URL(`../dist/${page}`, import.meta.url);
    const source = await readFile(pagePath, 'utf8');
    if (!linkPattern.test(source)) continue;
    linkPattern.lastIndex = 0;
    await writeFile(pagePath, source.replace(linkPattern, `\n    <style>${css}</style>`));
    inlined += 1;
  }
}

await rm(ssrOut, { recursive: true, force: true });

console.log(
  `Prerendered dist/index.html (+${(markup.length / 1024).toFixed(1)} kB markup); inlined CSS into ${inlined} page(s)`,
);

/**
 * Resolves a public-folder path against the deploy base.
 *
 * The site ships to GitHub Pages under /1upbarbershop/, so a bare "/images/x.jpg"
 * would 404 there. Data files keep plain root-relative paths (they are also read
 * by vite.config.ts in Node, where import.meta.env does not exist); components
 * run every path through here at render time instead.
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

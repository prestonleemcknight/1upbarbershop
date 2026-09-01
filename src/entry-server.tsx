import { renderToString } from 'react-dom/server';
import App from './App';

/** Used only by scripts/prerender.mjs to bake the markup into dist/index.html. */
export function render(): string {
  return renderToString(<App />);
}

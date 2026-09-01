/**
 * Generates lightweight, clearly labeled photo placeholders.
 * Replace every generated .svg in /public/images with a real photograph
 * (same filename + .jpg/.webp, then update src/data/business.ts).
 */
import { mkdirSync, writeFileSync } from 'node:fs';

const OUT = new URL('../public/images/', import.meta.url);
mkdirSync(OUT, { recursive: true });

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function svg({ w, h, label, tone = 0 }) {
  const tones = [
    ['#12171F', '#0B0F14'],
    ['#161C25', '#0E131A'],
    ['#101820', '#0B0F14'],
  ];
  const [a, b] = tones[tone % tones.length];
  const fs = Math.round(Math.min(w, h) * 0.052);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(label)}">
<defs>
<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
<pattern id="p" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><line x1="0" y1="0" x2="0" y2="10" stroke="#ffffff" stroke-opacity="0.028" stroke-width="3"/></pattern>
</defs>
<rect width="${w}" height="${h}" fill="url(#g)"/>
<rect width="${w}" height="${h}" fill="url(#p)"/>
<rect x="0" y="${h - Math.round(h * 0.012)}" width="${Math.round(w * 0.34)}" height="${Math.round(h * 0.012)}" fill="#1B5CE0"/>
<g fill="#8C9AAB" font-family="Archivo, Segoe UI, Helvetica, Arial, sans-serif" font-size="${fs}" font-weight="600" text-anchor="middle">
<text x="${w / 2}" y="${h / 2 - fs * 0.5}">PHOTO PLACEHOLDER</text>
<text x="${w / 2}" y="${h / 2 + fs * 0.9}" font-size="${Math.round(fs * 0.62)}" font-weight="500" fill="#6E7B8B">${esc(label)}</text>
</g>
</svg>`;
}

const files = [
  ['1up-barbershop-shop-floor-shaenfield-san-antonio.svg', 1600, 900, 'Wide shot of the shop floor / chairs'],
  ['1up-barbershop-interior-barber-chairs.svg', 1200, 900, 'Interior detail — station, mirrors, tools'],
  ['1up-barbershop-skin-fade-san-antonio.svg', 1000, 1250, 'Skin fade, back of head'],
  ['1up-barbershop-mid-taper-fade.svg', 1000, 1250, 'Mid taper fade, side profile'],
  ['1up-barbershop-beard-shape-up-lineup.svg', 1000, 1250, 'Beard shape-up and lineup'],
  ['1up-barbershop-classic-scissor-cut.svg', 1000, 1250, 'Classic scissor cut, styled'],
  ['1up-barbershop-kids-first-haircut.svg', 1000, 1250, 'Kids cut in the chair'],
  ['1up-barbershop-loc-retwist-maintenance.svg', 1000, 1250, 'Loc retwist / maintenance'],
  ['1up-barbershop-hair-design-hard-part.svg', 1000, 1250, 'Hard part / hair design detail'],
  ['1up-barbershop-before-after-transformation.svg', 1000, 1250, 'Before + after transformation'],
  ['1up-barbershop-barber-portrait-1.svg', 900, 900, 'Barber portrait — at the station'],
  ['1up-barbershop-barber-portrait-2.svg', 900, 900, 'Barber portrait — at the station'],
  ['1up-barbershop-barber-portrait-3.svg', 900, 900, 'Barber portrait — at the station'],
];

files.forEach(([name, w, h, label], i) => {
  writeFileSync(new URL(name, OUT), svg({ w, h, label, tone: i }));
});

console.log(`Wrote ${files.length} placeholder images to public/images/`);

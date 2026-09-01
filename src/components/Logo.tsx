/**
 * 1UP Barbershop mark — a circular badge with the wordmark and a blue glow,
 * following the shop's Instagram logo.
 *
 * TODO: this is a faithful stand-in, not the shop's artwork. Drop the real
 * logo file into /public/images/ and swap it in here (see SETUP.md) — the
 * script lettering in the original cannot be reproduced from a screenshot.
 *
 * Rendered inline rather than as an <img> so the wordmark uses the page's
 * loaded Archivo face instead of falling back to a system font.
 */
export function Logo({ className = '', title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      style={{ filter: 'drop-shadow(0 0 5px rgba(43,110,255,0.55))' }}
    >
      {title && <title>{title}</title>}
      <circle cx="60" cy="60" r="56" fill="#0b0f14" />
      <circle cx="60" cy="60" r="56" fill="none" stroke="#2b6eff" strokeWidth="5" />
      <text
        x="60"
        y="60"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#ffffff"
        stroke="#2b6eff"
        strokeWidth="2"
        paintOrder="stroke"
        fontFamily="Archivo, ui-sans-serif, system-ui, Helvetica, Arial, sans-serif"
        fontSize="53"
        fontWeight="800"
        letterSpacing="-2.5"
        transform="skewX(-9) translate(9.5 0)"
      >
        1UP
      </text>
    </svg>
  );
}

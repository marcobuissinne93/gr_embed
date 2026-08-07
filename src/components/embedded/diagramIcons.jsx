/**
 * Shared 24×24 line icons for the four diagrams.
 *
 * Drawn on a 0 0 24 24 grid and rendered inside a <g> that translates them into
 * position, so every diagram gets the same optical weight. Stroke colour is
 * always `currentColor` so a node's hover/highlight state carries the icon with
 * it without extra plumbing.
 */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const icons = {
  phone: (
    <g {...base}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <path d="M10.6 5.6h2.8" />
    </g>
  ),
  car: (
    <g {...base}>
      <path d="M3 13.5 4.9 8.4A2 2 0 0 1 6.8 7h10.4a2 2 0 0 1 1.9 1.4L21 13.5" />
      <path d="M3 13.5h18v4.2a1 1 0 0 1-1 1h-1.6a1 1 0 0 1-1-1v-.9H6.6v.9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <path d="M6.4 16h1.4M16.2 16h1.4" />
    </g>
  ),
  cart: (
    <g {...base}>
      <path d="M2.6 3.2h2.2l2.3 10.4a1.6 1.6 0 0 0 1.6 1.3h7.7a1.6 1.6 0 0 0 1.6-1.2l1.4-5.8H6" />
      <circle cx="9.4" cy="19.4" r="1.5" />
      <circle cx="16.8" cy="19.4" r="1.5" />
    </g>
  ),
  shield: (
    <g {...base}>
      <path d="M12 2.6 20 5.6v5.9c0 4.6-3.2 8.2-8 9.9-4.8-1.7-8-5.3-8-9.9V5.6z" />
      <path d="m8.6 11.8 2.4 2.4 4.4-4.6" />
    </g>
  ),
  check: (
    <g {...base}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="m8 12.2 2.7 2.7L16 9.4" />
    </g>
  ),
  storefront: (
    <g {...base}>
      <path d="M3.4 9.2 4.8 4.3A1.6 1.6 0 0 1 6.4 3.2h11.2a1.6 1.6 0 0 1 1.6 1.1l1.4 4.9" />
      <path d="M3.4 9.2a2.9 2.9 0 0 0 5.7 0 2.9 2.9 0 0 0 5.8 0 2.9 2.9 0 0 0 5.7 0" />
      <path d="M4.9 11.6v8.2a1 1 0 0 0 1 1h12.2a1 1 0 0 0 1-1v-8.2" />
    </g>
  ),
  api: (
    <g {...base}>
      <path d="M8.4 3.4 3.2 8.6a2 2 0 0 0 0 2.8l5.2 5.2" />
      <path d="M15.6 20.6l5.2-5.2a2 2 0 0 0 0-2.8l-5.2-5.2" />
      <path d="m13.6 6.2-3.2 11.6" />
    </g>
  ),
  engine: (
    <g {...base}>
      <rect x="3" y="7.6" width="18" height="9.6" rx="1.8" />
      <path d="M7.4 7.6V4.8M16.6 7.6V4.8M7.4 20V17.2M16.6 20V17.2" />
      <path d="M7.8 12.4h8.4" />
    </g>
  ),
  licence: (
    <g {...base}>
      <path d="M5.2 2.8h9l4.6 4.6v13.8H5.2z" />
      <path d="M14 2.8v4.8h4.8" />
      <circle cx="12" cy="13.4" r="2.4" />
      <path d="m10.2 15.6-.6 3.4 2.4-1.3 2.4 1.3-.6-3.4" />
    </g>
  ),
  handshake: (
    <g {...base}>
      <path d="m12 7.4 2.4-1.8a2 2 0 0 1 2.3 0L21 8.8v5.4l-2.6 1.9" />
      <path d="m12 7.4-2.4-1.8a2 2 0 0 0-2.3 0L3 8.8v5.4l3.4 2.6" />
      <path d="m8 13.4 2.6 2.4 1.6-1.5 2.2 2 1.6-1.6" />
    </g>
  ),
  laptop: (
    <g {...base}>
      <rect x="3.6" y="4.6" width="16.8" height="11" rx="1.6" />
      <path d="M2 19.2h20" />
    </g>
  ),
  wallet: (
    <g {...base}>
      <path d="M3.4 7.4a2 2 0 0 1 2-2h11.2a2 2 0 0 1 2 2v9.2a2 2 0 0 1-2 2H5.4a2 2 0 0 1-2-2z" />
      <path d="M18.6 10.2h2.2a.8.8 0 0 1 .8.8v2a.8.8 0 0 1-.8.8h-2.2z" />
    </g>
  ),
  heart: (
    <g {...base}>
      <path d="M12 20.4S3.8 15.6 3.8 9.9a4.4 4.4 0 0 1 8.2-2.3 4.4 4.4 0 0 1 8.2 2.3c0 5.7-8.2 10.5-8.2 10.5z" />
    </g>
  ),
  flag: (
    <g {...base}>
      <path d="M5.6 21V3.4" />
      <path d="M5.6 4.4h11.8l-2.2 3.8 2.2 3.8H5.6z" />
    </g>
  ),
  plug: (
    <g {...base}>
      <path d="M9 3v5M15 3v5" />
      <path d="M6.4 8h11.2v3.4a5.6 5.6 0 0 1-11.2 0z" />
      <path d="M12 17v4" />
    </g>
  ),
  checklist: (
    <g {...base}>
      <rect x="4.2" y="3.4" width="15.6" height="17.2" rx="2" />
      <path d="m7.8 9 1.5 1.5 2.8-3" />
      <path d="m7.8 15.4 1.5 1.5 2.8-3" />
      <path d="M14.4 9.4h3M14.4 15.8h3" />
    </g>
  ),
};

/** Positions a 24×24 icon at (x, y) and scales it. */
export function Icon({ name, x = 0, y = 0, size = 24, className }) {
  const glyph = icons[name];
  if (!glyph) return null;
  const scale = size / 24;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className={className} aria-hidden="true">
      {glyph}
    </g>
  );
}

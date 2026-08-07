/**
 * The production Guardrisk lockup, served from the live site.
 *
 * The asset is a black wordmark + gold hexagons on transparency. That reads
 * correctly on the white header, but is invisible on the black footer — so the
 * `light` tone renders it as a reversed (solid white) mono lockup via a CSS
 * filter. That is a stopgap: it drops the gold from the hexagons. Ask the brand
 * team for the official reversed/white logo, and ideally an SVG — the site
 * currently ships only this raster version.
 *
 * On merge into the Guardrisk WordPress site, swap `LOGO_SRC` for the local
 * upload path (`/wp-content/uploads/2023/02/guardrisk-logo-1200x209-1.png`)
 * rather than fetching it cross-origin.
 */

const LOGO_SRC = 'https://guardrisk.co.za/wp-content/uploads/2023/02/guardrisk-logo-1200x209-1.png';

export default function GuardriskLogo({ tone = 'dark', alt = 'Guardrisk', className = '' }) {
  return (
    <img
      className={`gr-logo gr-logo--${tone}${className ? ` ${className}` : ''}`}
      src={LOGO_SRC}
      alt={alt}
      width="1200"
      height="209"
      decoding="async"
    />
  );
}

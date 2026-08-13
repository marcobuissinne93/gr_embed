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
 * The asset is served from this project's own `public/` rather than hotlinked
 * from guardrisk.co.za. It was hotlinked initially, but Cloudflare began
 * returning 403 for the image, which broke the logo in both the header and the
 * footer — a cross-origin asset behind a WAF is not a dependency a page should
 * carry. This copy is byte-identical in dimensions, transparency and colour.
 *
 * On merge into the Guardrisk WordPress site, point `LOGO_SRC` at the real
 * upload path (`/wp-content/uploads/2023/02/guardrisk-logo-1200x209-1.png`),
 * which will then be same-origin and unaffected.
 */

const LOGO_SRC = '/guardrisk-logo.png';

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

import { useId, useState } from 'react';
import useInView from '../../hooks/useInView';
import useMediaQuery from '../../hooks/useMediaQuery';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { Icon } from './diagramIcons';
import wrapText from './wrapText';

/* --------------------------------------------------------------------------
   Diagram B — Architecture stack  (SPEC §7, Diagram B)

   Every `detail` string below is drawn from Guardrisk's own published page copy
   (see SPEC §2 / §9) — no capability, licensing or endpoint claims are invented
   here. Per SPEC §7 the mono font is used ONLY for the layer indices; the live
   page publishes no API endpoint names, so none are shown rather than inventing
   `POST /policies`-style labels.

   Layer 3 is named by capability, not by vendor. SPEC §1 attributes the platform
   to the insurtech Root, but Root is not named anywhere on the live page and
   Marco has confirmed it should stay unnamed here.
   -------------------------------------------------------------------------- */

const LAYERS = [
  {
    id: 'surface',
    index: '01',
    icon: 'storefront',
    owner: 'You own this',
    ownerTone: 'partner',
    title: "Partner's digital surface",
    summary: 'Your checkout, app or marketplace.',
    detail:
      'Coverage is offered directly within your purchase flow, rather than redirecting the customer to an external insurer. The customer never leaves your brand.',
  },
  {
    id: 'api',
    index: '02',
    icon: 'api',
    owner: 'Integration point',
    ownerTone: 'accent',
    title: 'API integration layer',
    summary: 'Policy issuance, premium collection and claims initiation — in real time.',
    detail:
      'Designed for seamless integration at the checkout stage, enabling instant insurance activation with no manual intervention.',
  },
  {
    id: 'admin',
    index: '03',
    icon: 'engine',
    owner: 'Platform',
    ownerTone: 'platform',
    title: 'API-native policy administration',
    summary: 'The policy engine, built API-first rather than retrofitted.',
    detail:
      'Built from the ground up as an API-native system, the policy administration layer allows real-time policy issuance, premium collection and claims management.',
  },
  {
    id: 'licence',
    index: '04',
    icon: 'licence',
    owner: 'Guardrisk',
    ownerTone: 'platform',
    title: 'Guardrisk licence and capital',
    summary: 'Cell captive structure, insurance licence and reinsurance access.',
    detail:
      'Guardrisk is a proven leader in cell captive and alternative insurance structures, providing the licensed insurer and the capital standing behind every policy issued.',
  },
  {
    id: 'binder',
    index: '05',
    icon: 'handshake',
    owner: 'Guardrisk network',
    ownerTone: 'platform',
    title: 'Binder holders and administrators',
    summary: 'Claims handling and policy servicing.',
    detail:
      "Through Guardrisk's network of licensed outsource binders and administrators, we provide full binder, claims and policy administration capabilities, ensuring operational efficiency and regulatory compliance.",
  },
];

const DESKTOP = { w: 900, gutter: 62, bandH: 92, gap: 16, top: 34 };
const MOBILE = { w: 360, gutter: 40, bandH: 172, gap: 14, top: 30 };

export default function DiagramArchitectureStack() {
  const reduceMotion = usePrefersReducedMotion();
  const narrow = useMediaQuery('(max-width: 767px)');
  const [ref, inView] = useInView({ threshold: 0.15, disabled: reduceMotion });
  const [activeId, setActiveId] = useState(null);
  const titleId = useId();
  const descId = useId();

  const cfg = narrow ? MOBILE : DESKTOP;
  const bandX = cfg.gutter;
  const bandW = cfg.w - cfg.gutter * 2;
  const stackH = LAYERS.length * cfg.bandH + (LAYERS.length - 1) * cfg.gap;
  const height = stackH + cfg.top * 2;
  const drawn = inView || reduceMotion;

  const bandY = (i) => cfg.top + i * (cfg.bandH + cfg.gap);
  const activeIndex = LAYERS.findIndex((l) => l.id === activeId);
  const active = activeIndex === -1 ? null : LAYERS[activeIndex];

  /* The detail panel is pinned to the vertical centre of whichever band is
     active. Expressed as a FRACTION of the viewBox height rather than a pixel
     offset, so it stays correct at every rendered scale without measuring the
     DOM. Defaults to mid-stack when nothing is active. */
  const bandFrac =
    activeIndex === -1 ? 0.5 : (bandY(activeIndex) + cfg.bandH / 2) / height;

  const description = `A five layer stack. ${LAYERS.map(
    (l) => `Layer ${Number(l.index)}: ${l.title}. ${l.summary} ${l.detail}`,
  ).join(' ')} Policy issuance flows down the stack from the partner's checkout to the licensed insurer, while claims and policy data flow back up.`;

  return (
    <figure className="gr-diagram gr-diagram--b" ref={ref}>
      <div className="gr-stack-layout">
      <svg
        className={`gr-diagram__svg${drawn ? ' is-drawn' : ''}${active ? ' is-focused' : ''}`}
        viewBox={`0 0 ${cfg.w} ${height}`}
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <title id={titleId}>The Guardrisk embedded insurance architecture stack</title>
        <desc id={descId}>{description}</desc>

        <defs>
          <marker id="grArrowDown" viewBox="0 0 10 10" refX="5" refY="8" markerWidth="5.5" markerHeight="5.5" orient="auto">
            <path d="M1.5 0 5 8 8.5 0z" fill="var(--gr-diagram-flow)" />
          </marker>
          <marker id="grArrowUp" viewBox="0 0 10 10" refX="5" refY="8" markerWidth="5.5" markerHeight="5.5" orient="auto">
            <path d="M1.5 0 5 8 8.5 0z" fill="var(--gr-color-accent-dark)" />
          </marker>
        </defs>

        {/* Two single-direction arrows rather than one bidirectional arrow, so
            direction is unambiguous (SPEC §7 Diagram B). */}
        <g className="gr-rail" style={{ '--i': 6 }}>
          <path
            className="gr-rail__line gr-rail__line--down"
            d={`M ${narrow ? 14 : 26} ${cfg.top + 6} V ${cfg.top + stackH - 6}`}
            pathLength="1"
            markerEnd="url(#grArrowDown)"
          />
          <text
            className="gr-rail__label"
            x={narrow ? 14 : 26}
            y={cfg.top + stackH / 2}
            transform={`rotate(-90 ${narrow ? 14 : 26} ${cfg.top + stackH / 2})`}
            textAnchor="middle"
          >
            Policy issuance
          </text>
        </g>

        <g className="gr-rail" style={{ '--i': 6 }}>
          <path
            className="gr-rail__line gr-rail__line--up"
            d={`M ${cfg.w - (narrow ? 14 : 26)} ${cfg.top + stackH - 6} V ${cfg.top + 6}`}
            pathLength="1"
            markerEnd="url(#grArrowUp)"
          />
          <text
            className="gr-rail__label"
            x={cfg.w - (narrow ? 14 : 26)}
            y={cfg.top + stackH / 2}
            transform={`rotate(90 ${cfg.w - (narrow ? 14 : 26)} ${cfg.top + stackH / 2})`}
            textAnchor="middle"
          >
            Claims and policy data
          </text>
        </g>

        {LAYERS.map((layer, i) => {
          const y = bandY(i);
          const isActive = layer.id === activeId;
          const textX = bandX + (narrow ? 20 : 84);

          return (
            <g
              key={layer.id}
              className={`gr-node gr-layer${isActive ? ' is-active' : ''}`}
              style={{ '--i': i }}
              tabIndex={0}
              role="button"
              aria-pressed={isActive}
              aria-label={`${layer.title}. ${layer.summary} ${layer.detail}`}
              onMouseEnter={() => setActiveId(layer.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(layer.id)}
              onBlur={() => setActiveId(null)}
              onClick={() => setActiveId(isActive ? null : layer.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveId(isActive ? null : layer.id);
                }
              }}
            >
              <rect className="gr-layer__box" x={bandX} y={y} width={bandW} height={cfg.bandH} rx="12" />
              <rect className="gr-layer__spine" x={bandX} y={y} width="4" height={cfg.bandH} rx="2" />

              {!narrow && (
                <>
                  <circle className="gr-layer__disc" cx={bandX + 46} cy={y + cfg.bandH / 2} r="23" />
                  <g className="gr-layer__icon">
                    <Icon name={layer.icon} x={bandX + 33} y={y + cfg.bandH / 2 - 13} size={26} />
                  </g>
                </>
              )}

              {/* SVG text does not wrap, so on narrow layouts the title and
                  summary are broken onto their own lines against a character
                  budget sized to the band. Left unwrapped they run past the
                  viewBox and, because the svg is `overflow: visible`, drag the
                  whole page into horizontal scroll. */}
              {narrow ? (
                <>
                  <text className="gr-layer__index" x={textX} y={y + 26}>
                    {layer.index}
                  </text>
                  {wrapText(layer.title, 26, 2).map((line, li) => (
                    <text key={li} className="gr-layer__title" x={textX} y={y + 50 + li * 20}>
                      {line}
                    </text>
                  ))}
                  {wrapText(layer.summary, 40, 2).map((line, li) => (
                    <text
                      key={li}
                      className="gr-layer__summary"
                      x={textX}
                      y={y + 50 + wrapText(layer.title, 26, 2).length * 20 + 12 + li * 17}
                    >
                      {line}
                    </text>
                  ))}
                </>
              ) : (
                <>
                  <text className="gr-layer__index" x={textX} y={y + 36}>
                    {layer.index}
                  </text>
                  <text className="gr-layer__title" x={textX + 30} y={y + 36}>
                    {layer.title}
                  </text>
                  <text className="gr-layer__summary" x={textX} y={y + 62}>
                    {layer.summary}
                  </text>
                </>
              )}

              <g className={`gr-layer__owner gr-layer__owner--${layer.ownerTone}`}>
                <rect
                  x={narrow ? textX : bandX + bandW - 150}
                  y={narrow ? y + cfg.bandH - 38 : y + cfg.bandH / 2 - 13}
                  width="134"
                  height="26"
                  rx="13"
                />
                <text
                  x={(narrow ? textX : bandX + bandW - 150) + 67}
                  y={(narrow ? y + cfg.bandH - 38 : y + cfg.bandH / 2 - 13) + 17}
                  textAnchor="middle"
                >
                  {layer.owner}
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      {/* The "expanded description" of SPEC §7 lives in HTML rather than inside
            the SVG: it reflows properly at any width and is announced politely to
            screen readers without duplicating the <desc>.

            On wide screens it sits BESIDE the stack and glides to the vertical
            centre of the active band, so the description appears next to the
            layer you are pointing at instead of far below the diagram. */}
        {!narrow && (
          <div className="gr-stack-aside">
            <figcaption
              className={`gr-layer-detail${active ? ' is-open' : ''}`}
              style={{ '--band-frac': bandFrac }}
              aria-live="polite"
            >
              {active ? (
                <>
                  <span className="gr-layer-detail__title">{active.title}</span>
                  <span className="gr-layer-detail__body">{active.detail}</span>
                </>
              ) : (
                <span className="gr-layer-detail__hint">
                  Hover, tap or tab through a layer to see what it does.
                </span>
              )}
            </figcaption>
          </div>
        )}
      </div>

      {/* Narrow screens have no hover and no room for a side panel, so nothing
          is hidden behind an interaction: every layer's detail is listed in full
          below the diagram (same pattern as Diagram C's mobile legend). */}
      {narrow && (
        <figcaption className="gr-stack-legend">
          <dl>
            {LAYERS.map((layer) => (
              <div key={layer.id}>
                <dt>
                  <span className="gr-stack-legend__index">{layer.index}</span>
                  {layer.title}
                </dt>
                <dd>{layer.detail}</dd>
              </div>
            ))}
          </dl>
        </figcaption>
      )}
    </figure>
  );
}

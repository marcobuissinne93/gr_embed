import { useId } from 'react';
import useInView from '../../hooks/useInView';
import useMediaQuery from '../../hooks/useMediaQuery';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { Icon } from './diagramIcons';
import wrapText from './wrapText';

/* --------------------------------------------------------------------------
   Diagram C — Ecosystem / roles  (SPEC §7, Diagram C)

   Deliberately arrow-free: this diagram answers "who is responsible for what",
   not "what happens in which order". Adding direction here would misread as
   sequence.

   The four parties sit on a shared orbit around the partner's product, which is
   the point being made — nobody is upstream of anybody else, they each hold one
   responsibility and all four attach to the same thing. The distribution
   partner's node is the one picked out in gold: on a page written for that
   buyer, they should be able to find themselves in the diagram immediately.

   The technology node is named by capability, not by vendor. SPEC §1 attributes
   the platform to the insurtech Root, but Root is not named anywhere on the
   live page and Marco has confirmed it should stay unnamed here.
   -------------------------------------------------------------------------- */

const HUB = {
  eyebrow: 'THE PRODUCT',
  title: ['Your embedded', 'insurance product'],
  caption: 'Sold in your own checkout',
};

const ROLES = [
  {
    id: 'guardrisk',
    icon: 'licence',
    name: 'Guardrisk',
    tie: 'Licence and capital',
    detail: 'Licence, capital and regulatory oversight.',
    corner: 'tl',
  },
  {
    id: 'platform',
    icon: 'engine',
    name: 'Policy administration system',
    tie: 'Technology and API',
    detail: 'API-native, real-time policy administration.',
    corner: 'tr',
  },
  {
    id: 'binder',
    icon: 'handshake',
    name: 'Binder holders and administrators',
    tie: 'Claims and servicing',
    detail: 'Claims handling and policy servicing.',
    corner: 'bl',
  },
  {
    id: 'partner',
    icon: 'storefront',
    name: 'You, the distribution partner',
    tie: 'Customer and checkout',
    detail: 'Owns the customer and the point of sale.',
    corner: 'br',
    tone: 'partner',
  },
];

/* ---- Desktop geometry -----------------------------------------------------
   Sized so the connector labels land in the gap between a node and the hub
   without colliding with either. The orbit ellipse passes exactly through all
   four node centres, so the cards sit ON the ring rather than near it.        */
const W = 1120;
const H = 560;
const NODE = { w: 250, h: 148 };
const HUB_BOX = { w: 240, h: 150 };
const HUB_C = { x: 560, y: 280 };

const CORNERS = {
  tl: { x: 10, y: 30 },
  tr: { x: W - 10 - NODE.w, y: 30 },
  bl: { x: 10, y: H - 30 - NODE.h },
  br: { x: W - 10 - NODE.w, y: H - 30 - NODE.h },
};

const ORBIT = { rx: HUB_C.x - (CORNERS.tl.x + NODE.w / 2), ry: HUB_C.y - (CORNERS.tl.y + NODE.h / 2) };

/** Where a ray leaving a rect's centre in direction (dx, dy) crosses its edge. */
function edgePoint(cx, cy, w, h, dx, dy) {
  const sx = dx === 0 ? Infinity : w / 2 / Math.abs(dx);
  const sy = dy === 0 ? Infinity : h / 2 / Math.abs(dy);
  const s = Math.min(sx, sy);
  return { x: cx + dx * s, y: cy + dy * s };
}

export default function DiagramEcosystemRoles() {
  const reduceMotion = usePrefersReducedMotion();
  const narrow = useMediaQuery('(max-width: 860px)');
  const [ref, inView] = useInView({ threshold: 0.2, disabled: reduceMotion });
  const titleId = useId();
  const descId = useId();
  const drawn = inView || reduceMotion;

  const description = `${HUB.title.join(' ')} sits at the centre, ${HUB.caption.toLowerCase()}. Four parties connect to it, each holding one responsibility: ${ROLES.map(
    (r) => `${r.name} — ${r.tie.toLowerCase()}. ${r.detail}`,
  ).join(' ')}`;

  /* ---------------- Mobile: hub on top, roles hanging off one spine -------- */
  if (narrow) {
    const mW = 344;
    const hubH = 132;
    const cardH = 128;
    const gap = 18;
    const spineX = 18;
    const cardX = 40;
    const cardW = mW - cardX - 12;
    const firstY = hubH + 34;
    const cardY = (i) => firstY + i * (cardH + gap);
    const lastTie = cardY(ROLES.length - 1) + cardH / 2;
    const mH = cardY(ROLES.length - 1) + cardH + 12;

    return (
      <figure className="gr-diagram gr-diagram--c" ref={ref}>
        <svg
          className={`gr-diagram__svg${drawn ? ' is-drawn' : ''}`}
          viewBox={`0 0 ${mW} ${mH}`}
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <title id={titleId}>Who does what in a Guardrisk embedded insurance programme</title>
          <desc id={descId}>{description}</desc>

          <g className="gr-hub" style={{ '--i': 0 }}>
            <rect className="gr-hub__box" x="12" y="0" width={mW - 24} height={hubH} rx="14" />
            <rect className="gr-hub__bar" x={mW / 2 - 30} y="18" width="60" height="4" rx="2" />
            <text className="gr-hub__eyebrow" x={mW / 2} y="46" textAnchor="middle">
              {HUB.eyebrow}
            </text>
            {HUB.title.map((line, i) => (
              <text key={i} className="gr-hub__title" x={mW / 2} y={72 + i * 22} textAnchor="middle">
                {line}
              </text>
            ))}
            <text className="gr-hub__caption" x={mW / 2} y="116" textAnchor="middle">
              {HUB.caption}
            </text>
          </g>

          <path
            className="gr-tie gr-tie--spine"
            style={{ '--i': 1 }}
            pathLength="1"
            d={`M ${spineX} ${hubH + 4} V ${lastTie}`}
          />

          {ROLES.map((role, i) => {
            const y = cardY(i);
            return (
              <g
                key={role.id}
                className={`gr-node gr-role${role.tone ? ` gr-role--${role.tone}` : ''}`}
                style={{ '--i': i + 1 }}
              >
                <path className="gr-tie" pathLength="1" d={`M ${spineX} ${y + cardH / 2} H ${cardX}`} />
                <rect className="gr-role__box" x={cardX} y={y} width={cardW} height={cardH} rx="12" />
                <rect className="gr-role__spine" x={cardX} y={y} width="4" height={cardH} rx="2" />
                <circle className="gr-role__disc" cx={cardX + 40} cy={y + 38} r="19" />
                <g className="gr-role__icon">
                  <Icon name={role.icon} x={cardX + 27} y={y + 25} size={26} />
                </g>
                {wrapText(role.name, 21, 2).map((line, li) => (
                  <text key={li} className="gr-role__name" x={cardX + 70} y={y + 34 + li * 19}>
                    {line}
                  </text>
                ))}
                <g className="gr-role__tie-pill">
                  <rect x={cardX + 18} y={y + 84} width={cardW - 36} height="26" rx="13" />
                  <text x={cardX + 32} y={y + 101}>
                    {role.tie}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Full detail in HTML on mobile — SVG text cannot wrap, and truncating
            it in the drawing must not truncate the information. */}
        <figcaption className="gr-role-legend">
          <ul>
            {ROLES.map((role) => (
              <li key={role.id}>
                <strong>{role.name}</strong>
                <span>{role.detail}</span>
              </li>
            ))}
          </ul>
        </figcaption>
      </figure>
    );
  }

  /* ---------------- Desktop: four parties on a shared orbit ---------------- */
  const hubX = HUB_C.x - HUB_BOX.w / 2;
  const hubY = HUB_C.y - HUB_BOX.h / 2;

  return (
    <figure className="gr-diagram gr-diagram--c" ref={ref}>
      <svg
        className={`gr-diagram__svg${drawn ? ' is-drawn' : ''}`}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <title id={titleId}>Who does what in a Guardrisk embedded insurance programme</title>
        <desc id={descId}>{description}</desc>

        {/* Soft field + the shared orbit the four parties sit on */}
        <ellipse className="gr-field" cx={HUB_C.x} cy={HUB_C.y} rx={ORBIT.rx + 54} ry={ORBIT.ry + 44} />
        <ellipse
          className="gr-orbit"
          cx={HUB_C.x}
          cy={HUB_C.y}
          rx={ORBIT.rx}
          ry={ORBIT.ry}
          pathLength="1"
        />

        {/* Spokes, trimmed to the exact edges of both cards so the gaps read as
            intentional rather than as lines disappearing under boxes. */}
        {ROLES.map((role, i) => {
          const pos = CORNERS[role.corner];
          const cx = pos.x + NODE.w / 2;
          const cy = pos.y + NODE.h / 2;
          const dx = HUB_C.x - cx;
          const dy = HUB_C.y - cy;

          const from = edgePoint(cx, cy, NODE.w, NODE.h, dx, dy);
          const to = edgePoint(HUB_C.x, HUB_C.y, HUB_BOX.w, HUB_BOX.h, -dx, -dy);
          const mx = (from.x + to.x) / 2;
          const my = (from.y + to.y) / 2;
          const pillW = 140;

          return (
            <g key={`tie-${role.id}`} className="gr-tie-group" style={{ '--i': i }}>
              <path
                className="gr-tie"
                pathLength="1"
                d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
              />
              <circle className="gr-tie-dot" cx={from.x} cy={from.y} r="3.5" />
              <g className="gr-tie-pill">
                <rect x={mx - pillW / 2} y={my - 15} width={pillW} height="30" rx="15" />
                <text x={mx} y={my + 5} textAnchor="middle">
                  {role.tie}
                </text>
              </g>
            </g>
          );
        })}

        {/* Hub */}
        <g className="gr-hub" style={{ '--i': 4 }}>
          <rect
            className="gr-hub__box"
            x={hubX}
            y={hubY}
            width={HUB_BOX.w}
            height={HUB_BOX.h}
            rx="16"
          />
          <rect className="gr-hub__bar" x={HUB_C.x - 32} y={hubY + 20} width="64" height="4" rx="2" />
          <text className="gr-hub__eyebrow" x={HUB_C.x} y={hubY + 50} textAnchor="middle">
            {HUB.eyebrow}
          </text>
          {HUB.title.map((line, i) => (
            <text
              key={i}
              className="gr-hub__title"
              x={HUB_C.x}
              y={hubY + 76 + i * 22}
              textAnchor="middle"
            >
              {line}
            </text>
          ))}
          <text className="gr-hub__caption" x={HUB_C.x} y={hubY + 124} textAnchor="middle">
            {HUB.caption}
          </text>
        </g>

        {/* Role cards */}
        {ROLES.map((role, i) => {
          const pos = CORNERS[role.corner];
          return (
            <g
              key={role.id}
              className={`gr-node gr-role${role.tone ? ` gr-role--${role.tone}` : ''}`}
              style={{ '--i': i }}
            >
              <rect
                className="gr-role__box"
                x={pos.x}
                y={pos.y}
                width={NODE.w}
                height={NODE.h}
                rx="14"
              />
              <rect className="gr-role__spine" x={pos.x} y={pos.y} width="4" height={NODE.h} rx="2" />
              <circle className="gr-role__disc" cx={pos.x + 42} cy={pos.y + 42} r="20" />
              <g className="gr-role__icon">
                <Icon name={role.icon} x={pos.x + 29} y={pos.y + 29} size={26} />
              </g>
              {wrapText(role.name, 21, 2).map((line, li) => (
                <text key={li} className="gr-role__name" x={pos.x + 74} y={pos.y + 38 + li * 20}>
                  {line}
                </text>
              ))}
              {wrapText(role.detail, 33, 2).map((line, li) => (
                <text key={li} className="gr-role__detail" x={pos.x + 22} y={pos.y + 100 + li * 18}>
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

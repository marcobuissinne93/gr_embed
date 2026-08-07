import { useId, useState } from 'react';
import useInView from '../../hooks/useInView';
import useMediaQuery from '../../hooks/useMediaQuery';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { Icon } from './diagramIcons';

/* --------------------------------------------------------------------------
   Diagram A — "The moment of embedding"  (SPEC §7, Diagram A)

   Four-step purchase journey with the insurance step inserted at step 3. The
   two scenarios mirror the two examples already used in Guardrisk's own hero
   copy (phone screen cover / vehicle mechanical warranty) rather than
   introducing a new example.

   Titles are pre-split into lines because SVG <text> does not wrap.
   -------------------------------------------------------------------------- */

const SCENARIOS = [
  {
    id: 'phone',
    tab: 'Buying a phone',
    steps: [
      { icon: 'phone', title: ['Customer chooses', 'a smartphone'], caption: 'On your site or app' },
      { icon: 'cart', title: ['Adds to cart and', 'goes to checkout'], caption: 'Your existing flow' },
      {
        icon: 'shield',
        title: ['Device insurance is', 'offered inline'],
        caption: 'Priced in the page — no redirect',
        highlight: true,
      },
      { icon: 'check', title: ['Cover is active', 'immediately'], caption: 'Policy issued in real time' },
    ],
  },
  {
    id: 'car',
    tab: 'Buying a car',
    steps: [
      { icon: 'car', title: ['Customer configures', 'a vehicle'], caption: 'Dealer, OEM or marketplace' },
      { icon: 'cart', title: ['Moves to finance', 'and checkout'], caption: 'Your existing flow' },
      {
        icon: 'shield',
        title: ['Extended warranty', 'is added inline'],
        caption: 'Bundled with the purchase',
        highlight: true,
      },
      { icon: 'check', title: ['Cover is active', 'immediately'], caption: 'Policy issued in real time' },
    ],
  },
];

/* Desktop: four cards on a row, arrows between. */
const H = {
  viewBox: '0 0 1000 268',
  card: { w: 214, h: 178, y: 46 },
  lift: 18, // the highlighted card sits proud of the row
  gap: 48,
};

/* Mobile: same four cards stacked, arrows running down the left gutter. */
const V = {
  viewBox: '0 0 340 748',
  card: { w: 320, h: 148, x: 10 },
  gap: 52,
};

function stepPositions(vertical) {
  return SCENARIOS[0].steps.map((_, i) => {
    if (vertical) {
      return { x: V.card.x, y: i * (V.card.h + V.gap), w: V.card.w, h: V.card.h };
    }
    return {
      x: i * (H.card.w + H.gap) + 1,
      y: H.card.y,
      w: H.card.w,
      h: H.card.h,
    };
  });
}

export default function DiagramMomentOfEmbedding() {
  const reduceMotion = usePrefersReducedMotion();
  const vertical = useMediaQuery('(max-width: 767px)');
  const [ref, inView] = useInView({ threshold: 0.25, disabled: reduceMotion });
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  const titleId = useId();
  const descId = useId();

  const scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIOS[0];
  const positions = stepPositions(vertical);
  const drawn = inView || reduceMotion;

  const description = `A four step purchase journey for ${scenario.tab.toLowerCase()}. ${scenario.steps
    .map((step, i) => `Step ${i + 1}: ${step.title.join(' ')} — ${step.caption}.`)
    .join(' ')} Step 3 is the embedded insurance moment: the offer appears inside the purchase flow instead of sending the customer to a separate insurer.`;

  return (
    <figure className="gr-diagram gr-diagram--a" ref={ref}>
      <div className="gr-scenario-tabs" role="group" aria-label="Choose an example purchase">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`gr-scenario-tab${s.id === scenarioId ? ' is-active' : ''}`}
            aria-pressed={s.id === scenarioId}
            onClick={() => setScenarioId(s.id)}
          >
            {s.tab}
          </button>
        ))}
      </div>

      <svg
        className={`gr-diagram__svg${drawn ? ' is-drawn' : ''}`}
        viewBox={vertical ? V.viewBox : H.viewBox}
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <title id={titleId}>The moment of embedding: where insurance enters the purchase journey</title>
        <desc id={descId}>{description}</desc>

        <defs>
          <marker
            id="grArrowA"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 1.5 8.5 5 0 8.5z" fill="var(--gr-diagram-flow)" />
          </marker>
        </defs>

        {/* Connectors, drawn first so cards sit above them */}
        {positions.slice(0, -1).map((pos, i) => {
          const next = positions[i + 1];
          const highlightNext = scenario.steps[i + 1].highlight;
          const d = vertical
            ? `M ${pos.x + pos.w / 2} ${pos.y + pos.h + 10} L ${next.x + next.w / 2} ${next.y - 12}`
            : `M ${pos.x + pos.w + 10} ${pos.y + pos.h / 2} L ${next.x - 12} ${
                next.y + next.h / 2 - (highlightNext ? 0 : 0)
              }`;
          return (
            <path
              key={`arrow-${i}`}
              className="gr-flow-line"
              style={{ '--i': i }}
              d={d}
              pathLength="1"
              markerEnd="url(#grArrowA)"
            />
          );
        })}

        {/* Step cards */}
        {scenario.steps.map((step, i) => {
          const pos = positions[i];
          const lift = !vertical && step.highlight ? H.lift : 0;
          const y = pos.y - lift;
          const h = pos.h + lift;
          const cx = pos.x + pos.w / 2;

          return (
            <g
              key={`${scenario.id}-${i}`}
              className={`gr-node gr-node--step${step.highlight ? ' is-highlight' : ''}`}
              style={{ '--i': i }}
            >
              <rect className="gr-node__box" x={pos.x} y={y} width={pos.w} height={h} rx="14" />

              {step.highlight && (
                <rect
                  className="gr-node__flag"
                  x={pos.x}
                  y={y}
                  width={pos.w}
                  height="6"
                  rx="3"
                />
              )}

              {vertical ? (
                <>
                  <circle className="gr-node__disc" cx={pos.x + 44} cy={y + h / 2} r="24" />
                  <g className="gr-node__icon">
                    <Icon name={step.icon} x={pos.x + 30} y={y + h / 2 - 14} size={28} />
                  </g>
                  <text className="gr-node__step" x={pos.x + 84} y={y + 42}>
                    Step {i + 1}
                  </text>
                  {step.title.map((line, li) => (
                    <text key={li} className="gr-node__title" x={pos.x + 84} y={y + 68 + li * 21}>
                      {line}
                    </text>
                  ))}
                  <text className="gr-node__caption" x={pos.x + 84} y={y + 118}>
                    {step.caption}
                  </text>
                </>
              ) : (
                <>
                  <circle className="gr-node__disc" cx={cx} cy={y + 52} r="25" />
                  <g className="gr-node__icon">
                    <Icon name={step.icon} x={cx - 14} y={y + 38} size={28} />
                  </g>
                  <text className="gr-node__step" x={cx} y={y + 98} textAnchor="middle">
                    Step {i + 1}
                  </text>
                  {step.title.map((line, li) => (
                    <text
                      key={li}
                      className="gr-node__title"
                      x={cx}
                      y={y + 123 + li * 20}
                      textAnchor="middle"
                    >
                      {line}
                    </text>
                  ))}
                  <text className="gr-node__caption" x={cx} y={y + h - 16} textAnchor="middle">
                    {step.caption}
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* Label pinned to the highlighted step */}
        {!vertical && (
          <g className="gr-node gr-annotation" style={{ '--i': 4 }}>
            <text x={positions[2].x + positions[2].w / 2} y={18} textAnchor="middle">
              The embedded moment
            </text>
          </g>
        )}
      </svg>
    </figure>
  );
}

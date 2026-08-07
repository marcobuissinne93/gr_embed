import { useId } from 'react';
import useInView from '../../hooks/useInView';
import useMediaQuery from '../../hooks/useMediaQuery';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { Icon } from './diagramIcons';
import wrapText from './wrapText';

/* --------------------------------------------------------------------------
   Diagram D — Integration timeline  (SPEC §7, Diagram D)

   NOTE ON WEEK RANGES — deliberately omitted. SPEC §7 is explicit that a
   per-milestone week count must not be fabricated, because on a public page it
   reads as a commitment a buyer can hold Guardrisk to. The only speed claim
   Guardrisk actually publishes is "launch embedded insurance products in weeks,
   not months", which is carried by the section copy instead.

   → To add week ranges once Marco confirms them with the delivery team, add a
     `weeks` key to a milestone below; the marker renders it automatically.
   -------------------------------------------------------------------------- */

const MILESTONES = [
  {
    id: 'kickoff',
    icon: 'checklist',
    title: 'Kickoff and product selection',
    caption: 'Choose from the pre-configured product library.',
  },
  {
    id: 'integration',
    icon: 'plug',
    title: 'API integration in sandbox',
    caption: 'Build against the API and test the full journey.',
  },
  {
    id: 'compliance',
    icon: 'licence',
    title: 'Compliance and binder sign-off',
    caption: 'Binder, licensing and compliance confirmed.',
  },
  {
    id: 'golive',
    icon: 'flag',
    title: 'Go-live',
    caption: 'Cover is live at your checkout.',
    terminal: true,
  },
];

export default function DiagramIntegrationTimeline() {
  const reduceMotion = usePrefersReducedMotion();
  const narrow = useMediaQuery('(max-width: 767px)');
  const [ref, inView] = useInView({ threshold: 0.3, disabled: reduceMotion });
  const titleId = useId();
  const descId = useId();
  const drawn = inView || reduceMotion;

  const description = `A four milestone integration journey. ${MILESTONES.map(
    (m, i) => `Milestone ${i + 1}: ${m.title}. ${m.caption}`,
  ).join(' ')}`;

  /* ---------------- Mobile: vertical timeline ----------------------------- */
  if (narrow) {
    const w = 340;
    const railX = 32;
    const step = 126;
    const first = 40;
    const h = first + (MILESTONES.length - 1) * step + 74;

    return (
      <figure className="gr-diagram gr-diagram--d" ref={ref}>
        <svg
          className={`gr-diagram__svg${drawn ? ' is-drawn' : ''}`}
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <title id={titleId}>The integration journey, from kickoff to go-live</title>
          <desc id={descId}>{description}</desc>

          <path
            className="gr-rail__track"
            d={`M ${railX} ${first} V ${first + (MILESTONES.length - 1) * step}`}
          />
          <path
            className="gr-rail__progress"
            pathLength="1"
            d={`M ${railX} ${first} V ${first + (MILESTONES.length - 1) * step}`}
          />

          {MILESTONES.map((m, i) => {
            const y = first + i * step;
            return (
              <g
                key={m.id}
                className={`gr-node gr-milestone${m.terminal ? ' is-terminal' : ''}`}
                style={{ '--i': i }}
              >
                <circle className="gr-milestone__ring" cx={railX} cy={y} r="21" />
                <circle className="gr-milestone__dot" cx={railX} cy={y} r="15" />
                <g className="gr-milestone__icon">
                  <Icon name={m.icon} x={railX - 10} y={y - 10} size={20} />
                </g>
                <text className="gr-milestone__index" x={railX + 40} y={y - 16}>
                  {String(i + 1).padStart(2, '0')}
                </text>
                {wrapText(m.title, 26, 2).map((line, li) => (
                  <text key={li} className="gr-milestone__title" x={railX + 40} y={y + 4 + li * 19}>
                    {line}
                  </text>
                ))}
                {wrapText(m.caption, 32, 2).map((line, li) => (
                  <text key={li} className="gr-milestone__caption" x={railX + 40} y={y + 44 + li * 17}>
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

  /* ---------------- Desktop: horizontal timeline -------------------------- */
  const w = 1000;
  const h = 250;
  const railY = 84;
  const firstX = 118;
  const step = (w - firstX * 2) / (MILESTONES.length - 1);

  return (
    <figure className="gr-diagram gr-diagram--d" ref={ref}>
      <svg
        className={`gr-diagram__svg${drawn ? ' is-drawn' : ''}`}
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <title id={titleId}>The integration journey, from kickoff to go-live</title>
        <desc id={descId}>{description}</desc>

        <path className="gr-rail__track" d={`M 52 ${railY} H ${w - 52}`} />
        <path
          className="gr-rail__progress"
          pathLength="1"
          d={`M 52 ${railY} H ${w - 52}`}
        />

        {MILESTONES.map((m, i) => {
          const x = firstX + i * step;
          return (
            <g
              key={m.id}
              className={`gr-node gr-milestone${m.terminal ? ' is-terminal' : ''}`}
              style={{ '--i': i }}
            >
              <text className="gr-milestone__index" x={x} y={railY - 44} textAnchor="middle">
                {String(i + 1).padStart(2, '0')}
              </text>
              <circle className="gr-milestone__ring" cx={x} cy={railY} r="26" />
              <circle className="gr-milestone__dot" cx={x} cy={railY} r="19" />
              <g className="gr-milestone__icon">
                <Icon name={m.icon} x={x - 12} y={railY - 12} size={24} />
              </g>
              {wrapText(m.title, 22, 2).map((line, li) => (
                <text
                  key={li}
                  className="gr-milestone__title"
                  x={x}
                  y={railY + 52 + li * 20}
                  textAnchor="middle"
                >
                  {line}
                </text>
              ))}
              {wrapText(m.caption, 30, 3).map((line, li) => (
                <text
                  key={li}
                  className="gr-milestone__caption"
                  x={x}
                  y={railY + 100 + li * 17}
                  textAnchor="middle"
                >
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

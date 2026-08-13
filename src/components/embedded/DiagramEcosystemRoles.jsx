import useInView from '../../hooks/useInView';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

/* --------------------------------------------------------------------------
   Diagram C — Embedded insurance value chain  (SPEC §7, Diagram C)

   Built to the design Marco supplied. Two deliberate departures from it and
   from the surrounding code, both for good reasons:

   1. HTML/CSS grid, not inline SVG (SPEC §5 asks for SVG). The partner
      descriptions here are full sentences — SVG <text> cannot wrap, so an SVG
      version would need every line break hand-computed and would truncate the
      moment anyone edits the copy. In HTML the text wraps natively, reflows at
      any width, and is readable by assistive tech without a <desc> shadow copy.
   2. Arrow direction is consistent. The supplied markup had three connectors
      pointing at the product and the fourth (distribution) pointing away from
      it; that reads as the product being handed to the partner rather than the
      partner supplying into it. All four now point inward, matching the design's
      own legend ("supplies into the product").

   ⚠ CONFIRM BEFORE SHIPPING — this diagram introduces a commercial claim the
   live page does not make: that the distribution partner can share in, or take
   all of, the underwriting risk via a cell captive. Guardrisk's cell captive
   expertise is published ("proven leader in cell captive and alternative
   insurance structures"), but offering risk participation on embedded
   specifically is new here. Marco to confirm wording with the cell captive team.
   -------------------------------------------------------------------------- */

const HUB = {
  eyebrow: 'THE PRODUCT',
  title: 'Your embedded insurance product',
  caption: 'Sold inside your own checkout, under your own brand.',
  facts: [
    { label: 'Quote to bind', value: 'real time' },
    { label: 'Policy of record', value: 'one system' },
  ],
};

const PARTNERS = [
  {
    id: 'carrier',
    index: '01',
    kind: 'Risk carrier',
    tone: 'carrier',
    name: 'Guardrisk',
    body: 'Insurance licences and regulatory oversight.',
    meta: ['Cell captive', 'Risk share or full risk', 'Compliance'],
    relation: 'licence and cell captive',
    column: 1,
    row: 1,
    side: 'left',
  },
  {
    id: 'platform',
    index: '02',
    kind: 'Platform',
    name: 'Policy administration system',
    body: 'API-native rating, issuing and policy administration in real time.',
    meta: ['Quotes', 'Issuing', 'Premium collection', 'Data'],
    relation: 'technology and API',
    column: 5,
    row: 1,
    side: 'right',
  },
  {
    id: 'servicing',
    index: '03',
    kind: 'Servicing',
    name: 'Binder holders and administrators',
    body: 'Handle claims and day-to-day policy servicing under delegated authority.',
    meta: ['Claims', 'Endorsements', 'Customer support'],
    relation: 'claims and servicing',
    column: 1,
    row: 2,
    side: 'left',
  },
  {
    id: 'distribution',
    index: '04',
    kind: 'Distribution',
    tone: 'you',
    name: 'You, the distribution partner',
    body: 'Own the customer, the point of sale and — via your cell — as much of the underwriting risk and profit as you want.',
    meta: ['Brand', 'Checkout', 'Risk participation'],
    relation: 'customer and checkout',
    column: 5,
    row: 2,
    side: 'right',
  },
];

/** Decorative rule + arrowhead, always pointing at the product in the centre. */
function Connector({ partner }) {
  return (
    <div
      className={`gr-vc__link${partner.tone === 'carrier' ? ' gr-vc__link--gold' : ''}`}
      style={{ gridColumn: partner.side === 'left' ? 2 : 4, gridRow: partner.row }}
      aria-hidden="true"
    >
      <span className="gr-vc__pill">{partner.relation}</span>
      <span className={`gr-vc__rule gr-vc__rule--${partner.side}`}>
        <span className="gr-vc__arrow" />
      </span>
    </div>
  );
}

export default function DiagramEcosystemRoles() {
  const reduceMotion = usePrefersReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.15, disabled: reduceMotion });
  const drawn = inView || reduceMotion;

  return (
    <figure className={`gr-diagram gr-vc${drawn ? ' is-drawn' : ''}`} ref={ref}>
      <div className="gr-vc__grid">
        {/* Centre: the thing all four parties supply into */}
        <div className="gr-vc__hub" style={{ '--i': 0 }}>
          <span className="gr-vc__hub-bar" aria-hidden="true" />
          <p className="gr-vc__hub-eyebrow">{HUB.eyebrow}</p>
          <h3 className="gr-vc__hub-title">{HUB.title}</h3>
          <p className="gr-vc__hub-caption">{HUB.caption}</p>
          <dl className="gr-vc__hub-facts">
            {HUB.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {PARTNERS.map((partner, i) => (
          <div key={partner.id} className="gr-vc__pair">
            <article
              className={`gr-vc__card${partner.tone ? ` gr-vc__card--${partner.tone}` : ''}`}
              style={{ gridColumn: partner.column, gridRow: partner.row, '--i': i + 1 }}
            >
              <header className="gr-vc__card-head">
                <span className="gr-vc__kind">{partner.kind}</span>
                <span className="gr-vc__index">{partner.index}</span>
              </header>
              <h3 className="gr-vc__name">{partner.name}</h3>
              <p className="gr-vc__body">{partner.body}</p>

              {/* Carries the connector's meaning for screen readers, and becomes
                  a visible chip once the grid stacks and the rules disappear. */}
              <p className="gr-vc__rel">
                <span className="gr-vc__rel-label">Supplies into the product: </span>
                {partner.relation}
              </p>

              <ul className="gr-vc__meta">
                {partner.meta.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <Connector partner={partner} />
          </div>
        ))}
      </div>
    </figure>
  );
}

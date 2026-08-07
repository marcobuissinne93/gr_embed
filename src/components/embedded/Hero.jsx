import Container from '../shared/Container';
import SectionEyebrow from '../shared/SectionEyebrow';
import CheckoutIllustration from './CheckoutIllustration';

/* --------------------------------------------------------------------------
   Section 1 — Hero (SPEC §3). Split layout, no diagram.

   Copy provenance:
   • Lead paragraph and the example callout are VERBATIM from the live page.
   • The headline follows SPEC §9's proposed line. The live page's own H1 is
     "Guardrisk Embedded Insurance — Powering the Future of Embedded Insurance";
     kept here as the fallback if brand/marketing prefers the existing wording.
   -------------------------------------------------------------------------- */

const CREDENTIALS = [
  'API-native platform',
  'Access to our life-, no-life, and micro-insurance licences',
  'Library of Insurance Products',
  'Guardrisk adminstration partners',
];

export default function Hero() {
  return (
    <section className="gr-hero" id="top">
      <div className="gr-hero__grid-lines" aria-hidden="true" />
      <Container className="gr-hero__inner">
        <div className="gr-hero__copy">
          <SectionEyebrow tone="light">Embedded Insurance</SectionEyebrow>

          <h1 className="gr-hero__headline">
            Insurance, exactly where your customers already are.
          </h1>

          <p className="gr-hero__lead">
            A plug-and-play embedded insurance platform that enables marketplaces, e-commerce
            platforms and digital ecosystems to offer insurance products seamlessly at the point
            of sale.
          </p>

          <div className="gr-hero__actions">
            <a className="gr-btn gr-btn--accent" href="#contact">
              Talk to our embedded team
            </a>
            <a className="gr-btn gr-btn--ghost-light" href="#how-it-works">
              See how it works
              <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                <path
                  d="M8 3v10M4.5 9.5 8 13l3.5-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <ul className="gr-hero__credentials">
            {CREDENTIALS.map((item) => (
              <li key={item}>
                <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                  <path
                    d="m3.5 8.5 3 3 6-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <aside className="gr-hero__example" aria-label="Examples of embedded insurance">
          <p className="gr-hero__example-label">For example</p>
          <CheckoutIllustration />
          <p className="gr-hero__example-body">
            Imagine buying a smartphone online and adding screen protection at checkout, or
            purchasing a vehicle online and automatically receiving mechanical warranty cover —
            <em> that&rsquo;s the power of embedded insurance.</em>
          </p>
          <div className="gr-hero__example-foot">
            <span className="gr-hero__example-tag">Point of sale</span>
            <span className="gr-hero__example-tag">Real-time issuance</span>
          </div>
        </aside>
      </Container>
    </section>
  );
}

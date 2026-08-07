import Container from '../shared/Container';
import RevealOnScroll from '../shared/RevealOnScroll';
import SectionEyebrow from '../shared/SectionEyebrow';

/* Section 7 — Compliance & trust (SPEC §3). No diagram — a credibility strip.

   REASONS are verbatim from the live page's "Why Guardrisk Embedded Insurance?"
   list. LICENCES are lifted word-for-word from the site's footer legal notice —
   these are regulatory statements and must not be paraphrased, abbreviated or
   supplemented with FSP numbers that have not been confirmed by compliance
   (SPEC §9, §12). */

const REASONS = [
  'Proven leader in cell captive and alternative insurance structures',
  'End-to-end insurance solution — from product design to administration and compliance',
  'Tech-enabled and API-first approach',
  'Rapid go-to-market capability',
  'Support from a specialist insurer',
];

const LICENCES = [
  {
    entity: 'Guardrisk Insurance Company Limited',
    status: 'Licensed Non-Life insurer and authorised Financial Services Provider',
  },
  {
    entity: 'Guardrisk Life Limited',
    status: 'Licensed life insurer and authorised Financial Services Provider',
  },
  {
    entity: 'Guardrisk Microinsurance Limited',
    status: 'Composite Life and Non-Life licensed insurer and authorised Financial Services Provider',
  },
  {
    entity: 'Part of Momentum Group Limited',
    status: 'Guardrisk is part of Momentum Group Limited',
  },
];

export default function ComplianceTrustBar() {
  return (
    <section className="gr-section gr-section--dark" id="compliance">
      <Container>
        <RevealOnScroll className="gr-section__head gr-section__head--dark">
          <SectionEyebrow index="07" tone="light">
            Compliance and trust
          </SectionEyebrow>
          <h2 className="gr-section__title">Why Guardrisk embedded insurance</h2>
        </RevealOnScroll>

        <div className="gr-trust">
          <RevealOnScroll as="ul" className="gr-trust__reasons" delay={60}>
            {REASONS.map((reason) => (
              <li key={reason}>
                <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                  <path
                    d="m3.5 8.5 3 3 6-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {reason}
              </li>
            ))}
          </RevealOnScroll>

          <RevealOnScroll className="gr-trust__licences" delay={120}>
            <h3>Licensed and regulated</h3>
            <dl>
              {LICENCES.map((item) => (
                <div key={item.entity}>
                  <dt>{item.entity}</dt>
                  <dd>{item.status}</dd>
                </div>
              ))}
            </dl>
            {/* NOTE: FSP numbers are intentionally absent — they are not published
                on the pages consulted, and SPEC §9 forbids guessing them. */}
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}

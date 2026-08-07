import Container from '../shared/Container';
import RevealOnScroll from '../shared/RevealOnScroll';
import SectionEyebrow from '../shared/SectionEyebrow';
import CaseStudyCard from './CaseStudyCard';

/* Section 8 — Case study strip (SPEC §3).

   These are ILLUSTRATIVE EXAMPLES, not customer case studies — they make the two
   scenarios from Guardrisk's own hero copy tangible. No named client, volume or
   result is claimed. If real, signed-off customer stories become available they
   should replace these, and the section heading should change accordingly. */

const EXAMPLES = [
  {
    icon: 'phone',
    sector: 'Retail / e-commerce',
    title: 'Device insurance, added at checkout',
    body:
      'A customer buys a smartphone online. Screen and accidental damage cover is presented inline as part of the basket, priced for that device, and activated the moment the order is confirmed.',
    basket: 'Smartphone',
    addOn: 'Theft, comprehensive or accidental damage cover',
  },
  {
    icon: 'car',
    sector: 'Motor / OEM / dealer',
    title: 'Extended warranty, bundled with the vehicle',
    body:
      'A customer purchases a vehicle online. Mechanical warranty cover is bundled into the purchase and finance flow, so the vehicle leaves the dealership already covered.',
    basket: 'Vehicle purchase',
    addOn: 'Extended warranty cover',
  },
];

export default function CaseStudyStrip() {
  return (
    <section className="gr-section" id="examples">
      <Container>
        <RevealOnScroll className="gr-section__head">
          <SectionEyebrow index="08">In practice</SectionEyebrow>
          <h2 className="gr-section__title">Two ways this shows up for a customer</h2>
          <p className="gr-section__lead">
            Illustrative examples of the same mechanic in two very different purchase journeys.
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="gr-case-grid" delay={80}>
          {EXAMPLES.map((example) => (
            <CaseStudyCard key={example.title} {...example} />
          ))}
        </RevealOnScroll>
      </Container>
    </section>
  );
}

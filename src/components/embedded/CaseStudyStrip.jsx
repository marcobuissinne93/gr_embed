import Container from '../shared/Container';
import RevealOnScroll from '../shared/RevealOnScroll';
import SectionEyebrow from '../shared/SectionEyebrow';
import CaseStudyCard from './CaseStudyCard';

/* Section 8 — The two embedding models (SPEC §3).

   The point of this section is the DISTINCTION between the two integration
   models, not the two products:

     • Checkout integration — cover is offered as an option inside an existing
       purchase flow. The customer decides.
     • Fully embedded      — cover is built into the product itself. There is no
       decision at the point of sale; every customer is covered.

   The phone and vehicle scenarios are only the vehicle for that distinction, so
   each card leads with its model and the basket mock reflects the difference:
   one line reads "Added at checkout", the other "Included as standard".

   These remain ILLUSTRATIVE EXAMPLES, not customer case studies — no named
   client, volume or result is claimed. If real, signed-off customer stories
   become available they should replace these. */

const EXAMPLES = [
  {
    icon: 'phone',
    model: 'Checkout integration',
    modelTone: 'checkout',
    sector: 'Retail / e-commerce',
    title: 'Offered in the basket, the customer opts in',
    body:
      'A customer buys a smartphone online. Cover is presented inline as part of the basket, priced for that device, and activated the moment the order is confirmed. Your checkout gains one extra line — nothing else changes.',
    basket: 'Smartphone',
    addOn: 'Accidental damage cover',
    badge: 'Added at checkout',
  },
  {
    icon: 'car',
    model: 'Fully embedded',
    modelTone: 'embedded',
    sector: 'Motor / OEM / dealer',
    title: 'Built into the product, every customer covered',
    body:
      'A customer purchases a vehicle. An extended warranty is part of what is being sold rather than an add-on, so the vehicle leaves the dealership already covered and there is nothing to opt into.',
    basket: 'Vehicle purchase',
    addOn: 'Extended warranty cover',
    badge: 'Included as standard',
  },
];

export default function CaseStudyStrip() {
  return (
    <section className="gr-section" id="examples">
      <Container>
        <RevealOnScroll className="gr-section__head">
          <SectionEyebrow index="08">In practice</SectionEyebrow>
          <h2 className="gr-section__title">
            Offered at checkout, or built into the product
          </h2>
          <p className="gr-section__lead">
            There are two ways to embed. Cover can sit in your checkout as an option the customer
            chooses, or it can be part of the product itself, so every customer is covered without
            deciding anything. Both are delivered through the same platform.
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

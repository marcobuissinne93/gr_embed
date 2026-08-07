import Container from '../shared/Container';
import RevealOnScroll from '../shared/RevealOnScroll';
import SectionEyebrow from '../shared/SectionEyebrow';
import DiagramMomentOfEmbedding from './DiagramMomentOfEmbedding';

/* Section 2 — What is embedded insurance (SPEC §3) + Diagram A.
   Heading and body copy are the live page's, with one light copyedit: the
   original comma splice ("…within the purchase flow, relevant, timely, and
   frictionless.") is set with an em dash for readability. */

export default function WhatIsEmbedded() {
  return (
    <section className="gr-section" id="what-is-embedded">
      <Container>
        <RevealOnScroll className="gr-section__head">
          <SectionEyebrow index="01">What is embedded insurance</SectionEyebrow>
          <h2 className="gr-section__title">Embedding protection where it matters most</h2>
          <p className="gr-section__lead">
            Embedded insurance is the seamless integration of insurance into the customer journey
            of another product or service. Instead of redirecting customers to an external
            insurer, coverage is offered directly within the purchase flow — relevant, timely and
            frictionless.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <DiagramMomentOfEmbedding />
        </RevealOnScroll>

        {/* Text equivalent for the diagram, visible to everyone (SPEC §10) */}
        <RevealOnScroll className="gr-section__note" delay={120}>
          <p className="gr-section__note-eyebrow">In short</p>
          <p className="gr-section__note-body">
            The customer <strong>never leaves your checkout</strong>. The insurance offer appears
            inside your own purchase flow at step three, and cover is active the moment the
            purchase completes.
          </p>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

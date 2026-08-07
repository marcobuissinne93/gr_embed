import Container from '../shared/Container';
import RevealOnScroll from '../shared/RevealOnScroll';
import SectionEyebrow from '../shared/SectionEyebrow';
import DiagramArchitectureStack from './DiagramArchitectureStack';

/* Section 3 — How it works / architecture (SPEC §3) + Diagram B.
   Lead paragraph is verbatim from the live page's "API-Native Policy
   Administration System" block. */

export default function HowItWorks() {
  return (
    <section className="gr-section gr-section--alt" id="how-it-works">
      <Container>
        <RevealOnScroll className="gr-section__head">
          <SectionEyebrow index="02">How it works</SectionEyebrow>
          <h2 className="gr-section__title">What sits behind &ldquo;Guardrisk Embedded Insurance&rdquo;</h2>
          <p className="gr-section__lead">
            Built from the ground up as an API-native system, the policy administration layer
            allows real-time policy issuance, premium collection and claims management. Designed
            for seamless integration at the checkout stage, enabling instant insurance activation
            with no manual intervention.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <DiagramArchitectureStack />
        </RevealOnScroll>
      </Container>
    </section>
  );
}

import Container from '../shared/Container';
import RevealOnScroll from '../shared/RevealOnScroll';
import SectionEyebrow from '../shared/SectionEyebrow';
import DiagramIntegrationTimeline from './DiagramIntegrationTimeline';

/* Section 6 — Speed to market / integration journey (SPEC §3) + Diagram D.

   The four benefit cards that previously sat under the timeline now live in
   ComplianceTrustBar — they read as a standalone value proposition rather than
   as supporting detail for the integration timeline. */

export default function IntegrationJourney() {
  return (
    <section className="gr-section" id="integration">
      <Container>
        <RevealOnScroll className="gr-section__head">
          <SectionEyebrow index="05">Speed to market</SectionEyebrow>
          <h2 className="gr-section__title">Weeks, not months</h2>
          <p className="gr-section__lead">
            Launch embedded insurance products in weeks, not months, giving your business a
            competitive advantage and faster customer activation.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <DiagramIntegrationTimeline />
        </RevealOnScroll>
      </Container>
    </section>
  );
}

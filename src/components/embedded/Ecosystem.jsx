import Container from '../shared/Container';
import RevealOnScroll from '../shared/RevealOnScroll';
import SectionEyebrow from '../shared/SectionEyebrow';
import DiagramEcosystemRoles from './DiagramEcosystemRoles';

/* Section 5 — Ecosystem / who's involved (SPEC §3) + Diagram C.
   Lead paragraph is verbatim from the live page's "Binder and Administration
   Support" block. */

export default function Ecosystem() {
  return (
    <section className="gr-section gr-section--alt" id="ecosystem">
      <Container>
        <RevealOnScroll className="gr-section__head">
          <SectionEyebrow index="04">Ecosystem</SectionEyebrow>
          <h2 className="gr-section__title">Who does what</h2>
          <p className="gr-section__lead">
            Through Guardrisk&rsquo;s network of licensed outsource binders and administrators, we
            provide full binder, claims and policy administration capabilities, ensuring
            operational efficiency and regulatory compliance.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <DiagramEcosystemRoles />
        </RevealOnScroll>
      </Container>
    </section>
  );
}

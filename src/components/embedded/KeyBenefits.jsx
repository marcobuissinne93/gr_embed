import Container from '../shared/Container';
import RevealOnScroll from '../shared/RevealOnScroll';
import SectionEyebrow from '../shared/SectionEyebrow';

/* --------------------------------------------------------------------------
   Key benefits — its own section.

   These four cards are VERBATIM from the live page's "Four key benefits" block,
   as is the lead paragraph ("combines advanced technology with decades of
   insurance expertise…"). They previously sat under the integration timeline,
   where they read as supporting detail for a claim they were not actually
   about; as a standalone section they carry their own weight.
   -------------------------------------------------------------------------- */

const BENEFITS = [
  {
    title: 'Plug-and-Play API',
    body: 'Fast integration with flexible, API-native architecture enabling seamless embedding of insurance products into your existing digital platform.',
  },
  {
    title: 'Speed to Market',
    body: 'Launch embedded insurance products in weeks, not months, giving your business a competitive advantage and faster customer activation.',
  },
  {
    title: 'Revenue Growth',
    body: 'Unlock new income streams by offering insurance alongside core products, increasing transaction value and customer loyalty.',
  },
  {
    title: 'Customer Value',
    body: 'Provide customers with relevant, easy-to-access insurance products at the right moment, enhancing trust, satisfaction and brand value.',
  },
];

export default function KeyBenefits() {
  return (
    <section className="gr-section gr-section--alt" id="benefits">
      <Container>
        <RevealOnScroll className="gr-section__head">
          <SectionEyebrow index="06">Key benefits</SectionEyebrow>
          <h2 className="gr-section__title">Four key benefits</h2>
          <p className="gr-section__lead">
            Guardrisk Embedded Insurance combines advanced technology with decades of insurance
            expertise. Our scalable, API-native platform enables seamless, compliant and efficient
            embedded insurance integrations, supported by a comprehensive library of insurance
            products and end-to-end administration services.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <ul className="gr-benefit-grid">
            {BENEFITS.map((benefit, i) => (
              <li key={benefit.title} className="gr-benefit">
                <span className="gr-benefit__index">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="gr-benefit__title">{benefit.title}</h3>
                <p className="gr-benefit__body">{benefit.body}</p>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

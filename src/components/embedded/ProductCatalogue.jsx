import Container from '../shared/Container';
import RevealOnScroll from '../shared/RevealOnScroll';
import SectionEyebrow from '../shared/SectionEyebrow';
import ProductCard from './ProductCard';

/* Section 4 — Product catalogue (SPEC §3).

   The four product NAMES are the ones Guardrisk publishes ("from device cover to
   extended warranties, funeral, and credit protection").

   [PLACEHOLDER COPY] The one-line descriptions are SPEC §9 scaffolding, not
   published Guardrisk wording — confirm each against the real product sheets
   before shipping. The live page also describes the catalogue as "growing", so
   the list may be incomplete. */

const PRODUCTS = [
  {
    icon: 'phone',
    name: 'Device cover',
    description: 'Screen and accidental damage protection for phones, laptops and tablets.',
  },
  {
    icon: 'engine',
    name: 'Extended warranty',
    description: 'Mechanical and electronic warranty cover beyond the manufacturer term.',
  },
  {
    icon: 'heart',
    name: 'Funeral cover',
    description: 'Simplified funeral protection distributed through partner channels.',
  },
  {
    icon: 'wallet',
    name: 'Credit protection',
    description: 'Cover linked to loan or credit agreements.',
  },
];

export default function ProductCatalogue() {
  return (
    <section className="gr-section" id="products">
      <Container>
        <RevealOnScroll className="gr-section__head">
          <SectionEyebrow index="03">Product library</SectionEyebrow>
          <h2 className="gr-section__title">Pre-configured products, ready to deploy</h2>
          <p className="gr-section__lead">
            Access a growing catalogue of pre-configured, compliant insurance products — from
            device cover to extended warranties, funeral and credit protection — ready for digital
            deployment.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <ul className="gr-product-grid">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </ul>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

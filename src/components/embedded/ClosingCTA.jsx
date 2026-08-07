import Container from '../shared/Container';
import RevealOnScroll from '../shared/RevealOnScroll';

/* Section 9 — Closing CTA (SPEC §3). High-contrast closing band.
   Lead line is verbatim from the live page's closing band. */

export default function ClosingCTA() {
  return (
    <section className="gr-cta" id="contact">
      <Container>
        <RevealOnScroll className="gr-cta__inner">
          <div>
            <h2 className="gr-cta__title">Ready to embed insurance into your product?</h2>
            <p className="gr-cta__lead">
              Partner with Guardrisk and bring seamless embedded insurance to your customers today.
            </p>
          </div>
          <div className="gr-cta__actions">
            <a className="gr-btn gr-btn--accent gr-btn--lg" href="https://guardrisk.co.za/contact/">
              Get in touch
            </a>
            <p className="gr-cta__note">
              We&rsquo;ll route you to the embedded insurance team, not a general enquiries inbox.
            </p>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

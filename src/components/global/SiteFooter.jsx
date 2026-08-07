import GuardriskLogo from './GuardriskLogo';

/* --------------------------------------------------------------------------
   Global footer.

   The link list, office list and — importantly — the legal/licensing paragraph
   below are reproduced VERBATIM from guardrisk.co.za. Per SPEC §9 and §12 the
   entity names and licence descriptions must not be paraphrased or guessed, so
   nothing in `LEGAL` should be edited without legal/compliance sign-off.

   As with the header, this is replaced by the site's real footer component when
   the page is merged into the Guardrisk codebase (SPEC §6).
   -------------------------------------------------------------------------- */

const IMPORTANT_LINKS = [
  { label: 'Home', href: 'https://guardrisk.co.za/' },
  { label: 'About Us', href: 'https://guardrisk.co.za/about/' },
  { label: 'Security and fraud', href: 'https://guardrisk.co.za/security-and-fraud/' },
  { label: 'Careers', href: 'https://guardrisk.co.za/careers/' },
  { label: 'Contact Us', href: 'https://guardrisk.co.za/contact/' },
  { label: 'Newsroom', href: 'https://guardrisk.co.za/newsroom/' },
  { label: 'Business Reports', href: 'https://guardrisk.co.za/business-reports/' },
  { label: 'Compliance', href: 'https://guardrisk.co.za/compliance/' },
  { label: 'Public Privacy Policy', href: 'https://guardrisk.co.za/public-privacy-policy/' },
  { label: 'Our B-BBEE Rating', href: 'https://guardrisk.co.za/our-b-bbee-rating/' },
  { label: 'Complaints', href: 'https://guardrisk.co.za/complaints/' },
  { label: 'GGI Claims', href: 'https://guardrisk.co.za/ggi-claims/' },
];

const OFFICES = ['Johannesburg', 'Cape Town', 'Durban', 'Mauritius', 'Gibraltar'];

const LEGAL =
  'Guardrisk Insurance Company Limited is a licensed Non-Life insurer and authorised Financial Services Provider, ' +
  'Guardrisk Life Limited is a licensed life insurer and authorised Financial Services Provider, ' +
  'Guardrisk Microinsurance Limited which is a Composite Life and Non-Life licensed insurer and authorised Financial Services Provider, ' +
  'Guardrisk Allied Products and Services (Pty) Limited and Partner Risk Solutions (Pty) Limited are both authorised Financial Services Providers. ' +
  'Guardrisk is part of Momentum Group Limited.';

export default function SiteFooter() {
  return (
    <footer className="gr-footer">
      <div className="gr-container gr-footer__grid">
        <div className="gr-footer__brand">
          <GuardriskLogo tone="light" />
          <p>
            Guardrisk is a specialist insurer and a proven leader in cell captive and alternative
            insurance structures.
          </p>
        </div>

        <nav className="gr-footer__col" aria-labelledby="gr-footer-links">
          <h2 id="gr-footer-links">Important Links</h2>
          <ul className="gr-footer__links">
            {IMPORTANT_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="gr-footer__col">
          <h2>Get In Touch</h2>
          <ul className="gr-footer__offices">
            {OFFICES.map((office) => (
              <li key={office}>{office}</li>
            ))}
          </ul>
          <a className="gr-footer__contact-link" href="https://guardrisk.co.za/contact/">
            Contact details
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      <div className="gr-container gr-footer__legal">
        <p>
          © {new Date().getFullYear()} Guardrisk. All rights reserved. {LEGAL}
        </p>
      </div>
    </footer>
  );
}

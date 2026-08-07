import { useEffect, useState } from 'react';
import GuardriskLogo from './GuardriskLogo';

/* --------------------------------------------------------------------------
   Global header.

   Nav structure and URLs are the REAL guardrisk.co.za navigation, read from the
   live site's markup. SPEC §6 asks that this page reuse the site's existing
   header rather than rebuild one — when this page is merged into the Guardrisk
   codebase, delete this component and mount the page inside the real layout.
   It exists here only so the standalone prototype sits in correct context.
   -------------------------------------------------------------------------- */

const NAV = [
  { label: 'About Us', href: 'https://guardrisk.co.za/about/' },
  {
    label: 'Offerings',
    href: '#',
    children: [
      { label: 'Cell Captives', href: 'https://guardrisk.co.za/cell-captives/' },
      { label: 'Insurtech', href: 'https://guardrisk.co.za/Insurtech/' },
      { label: 'General Insurance', href: 'https://guardrisk.co.za/general-insurance/' },
      { label: 'International', href: 'https://guardrisk.co.za/international/' },
      { label: 'Mining rehabilitation guarantees', href: 'https://guardrisk.co.za/mining-rehabilitation-guarantees/' },
      { label: 'Premium Finance', href: 'https://guardrisk.co.za/premium-finance/' },
      { label: 'UMA', href: 'https://guardrisk.co.za/uma/' },
      { label: 'Microinsurance', href: 'https://guardrisk.co.za/microinsurance/' },
      { label: 'Embedded Insurance', href: '/embedded-insurance/', current: true },
    ],
  },
  { label: 'Careers', href: 'https://guardrisk.co.za/careers/' },
  {
    label: 'News',
    href: '#',
    children: [
      { label: 'Newsroom', href: 'https://guardrisk.co.za/newsroom/' },
      { label: 'Complaints', href: 'https://guardrisk.co.za/complaints/' },
    ],
  },
  { label: 'Contact Us', href: 'https://guardrisk.co.za/contact/' },
];

export default function SiteHeader() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMobileOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <header className="gr-header">
      <a className="gr-skip-link" href="#main">
        Skip to content
      </a>

      <div className="gr-header__inner">
        <a className="gr-header__brand" href="https://guardrisk.co.za/">
          {/* alt="" — the link already carries its own accessible name below,
              so labelling the image too would announce Guardrisk twice. */}
          <GuardriskLogo alt="" />
          <span className="gr-visually-hidden">Guardrisk home</span>
        </a>

        <nav className="gr-nav" aria-label="Primary">
          <ul className="gr-nav__list">
            {NAV.map((item) => (
              <li
                key={item.label}
                className={`gr-nav__item${item.children ? ' has-children' : ''}`}
                onMouseEnter={() => item.children && setOpenMenu(item.label)}
                onMouseLeave={() => item.children && setOpenMenu(null)}
              >
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className="gr-nav__link"
                      aria-expanded={openMenu === item.label}
                      onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                    >
                      {item.label}
                      <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
                        <path d="M2 4.5 6 8.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </button>
                    <ul
                      className={`gr-nav__dropdown${openMenu === item.label ? ' is-open' : ''}`}
                      onFocus={() => setOpenMenu(item.label)}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) setOpenMenu(null);
                      }}
                    >
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <a href={child.href} aria-current={child.current ? 'page' : undefined}>
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a className="gr-nav__link" href={item.href}>
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <a className="gr-btn gr-btn--accent gr-btn--sm gr-header__cta" href="#contact">
          Talk to an expert
        </a>

        <button
          type="button"
          className="gr-header__burger"
          aria-expanded={mobileOpen}
          aria-controls="gr-mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="gr-visually-hidden">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            {mobileOpen ? (
              <path d="M5 5l14 14M19 5 5 19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M3.5 7h17M3.5 12h17M3.5 17h17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <div id="gr-mobile-nav" className={`gr-mobile-nav${mobileOpen ? ' is-open' : ''}`} hidden={!mobileOpen}>
        <ul>
          {NAV.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <>
                  <span className="gr-mobile-nav__group">{item.label}</span>
                  <ul>
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a href={child.href} aria-current={child.current ? 'page' : undefined}>
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <a href={item.href}>{item.label}</a>
              )}
            </li>
          ))}
        </ul>
        <a className="gr-btn gr-btn--accent" href="#contact" onClick={() => setMobileOpen(false)}>
          Talk to an expert
        </a>
      </div>
    </header>
  );
}

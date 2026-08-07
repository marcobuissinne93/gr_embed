import SiteHeader from '../components/global/SiteHeader';
import SiteFooter from '../components/global/SiteFooter';
import Hero from '../components/embedded/Hero';
import WhatIsEmbedded from '../components/embedded/WhatIsEmbedded';
import HowItWorks from '../components/embedded/HowItWorks';
import ProductCatalogue from '../components/embedded/ProductCatalogue';
import Ecosystem from '../components/embedded/Ecosystem';
import IntegrationJourney from '../components/embedded/IntegrationJourney';
import KeyBenefits from '../components/embedded/KeyBenefits';
import ComplianceTrustBar from '../components/embedded/ComplianceTrustBar';
import CaseStudyStrip from '../components/embedded/CaseStudyStrip';
import ClosingCTA from '../components/embedded/ClosingCTA';

import '../styles/tokens.css';
import '../styles/embedded-insurance.css';

/**
 * Guardrisk — Embedded Insurance.
 *
 * Section order follows the information architecture in SPEC §3. On merge into
 * the Guardrisk site, drop <SiteHeader> / <SiteFooter> and mount everything
 * between them inside the existing global layout (SPEC §6).
 */
export default function EmbeddedInsurancePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <WhatIsEmbedded />
        <HowItWorks />
        <ProductCatalogue />
        <Ecosystem />
        <IntegrationJourney />
        <KeyBenefits />
        <ComplianceTrustBar />
        <CaseStudyStrip />
        <ClosingCTA />
      </main>
      <SiteFooter />
    </>
  );
}

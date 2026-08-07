import { useId } from 'react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

/* --------------------------------------------------------------------------
   Hero illustration — embedded insurance in an e-commerce checkout.

   Note: SPEC §3 specifies "no diagram" in the hero. Added at Marco's request to
   make the example box concrete. It is deliberately quieter than the four
   section diagrams so it supports the headline rather than competing with it.

   Prices are rendered as neutral bars, never numerals — a figure here would read
   as a real quote, and no Guardrisk pricing has been confirmed.
   -------------------------------------------------------------------------- */

export default function CheckoutIllustration() {
  const reduceMotion = usePrefersReducedMotion();
  const titleId = useId();
  const descId = useId();

  return (
    <svg
      className={`gr-checkout${reduceMotion ? '' : ' is-animated'}`}
      viewBox="0 0 344 220"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <title id={titleId}>Embedded insurance in an e-commerce checkout</title>
      <desc id={descId}>
        A checkout summary showing a smartphone in the basket, with an optional screen cover
        already selected on the line below it, and a pay button. The insurance is offered inside
        the checkout rather than on a separate insurer&rsquo;s site.
      </desc>

      {/* Checkout panel */}
      <rect className="gr-checkout__panel" x="1" y="1" width="342" height="218" rx="14" />

      {/* Window chrome */}
      <text className="gr-checkout__eyebrow" x="20" y="29">
        CHECKOUT
      </text>
      <circle className="gr-checkout__dot" cx="300" cy="24" r="3" />
      <circle className="gr-checkout__dot" cx="311" cy="24" r="3" />
      <circle className="gr-checkout__dot" cx="322" cy="24" r="3" />
      <path className="gr-checkout__rule" d="M0 44h344" />

      {/* Basket line — the product the customer actually came for */}
      <rect className="gr-checkout__tile" x="20" y="62" width="40" height="40" rx="9" />
      <g className="gr-checkout__glyph" transform="translate(30 72)">
        <rect x="4.5" y="1" width="11" height="18" rx="2.2" />
        <path d="M8.4 4h3.2" />
      </g>
      <text className="gr-checkout__label" x="74" y="79">
        Smartphone
      </text>
      <rect className="gr-checkout__bar" x="74" y="87" width="56" height="6" rx="3" />
      <rect className="gr-checkout__bar" x="278" y="76" width="46" height="8" rx="4" />

      {/* The embedded moment: cover offered inline, already ticked */}
      <g className="gr-checkout__addon">
        <rect className="gr-checkout__addon-box" x="14" y="114" width="316" height="52" rx="11" />
        <rect className="gr-checkout__check" x="28" y="131" width="18" height="18" rx="5" />
        <path className="gr-checkout__tick" d="m32.5 140.2 3.2 3.2 5.8-6" />
        <g className="gr-checkout__shield" transform="translate(58 131)">
          <path d="M9 .8 16 3.4v5.2c0 4-2.8 7.2-7 8.6-4.2-1.4-7-4.6-7-8.6V3.4z" />
          <path d="m6 9.4 2.1 2.1 3.9-4" />
        </g>
        <text className="gr-checkout__addon-label" x="86" y="139">
          Add screen cover
        </text>
        <text className="gr-checkout__addon-note" x="86" y="154">
          Cover starts the moment you pay
        </text>
        <rect className="gr-checkout__addon-bar" x="278" y="136" width="46" height="8" rx="4" />
      </g>

      {/* Pay */}
      <rect className="gr-checkout__pay" x="20" y="178" width="304" height="30" rx="8" />
      <text className="gr-checkout__pay-label" x="172" y="197" textAnchor="middle">
        Pay now
      </text>
    </svg>
  );
}

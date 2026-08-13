import { icons } from './diagramIcons';

/* A card for one embedding model.
 *
 * The model badge leads, because the model is the point of the section — the
 * product and sector are only the illustration. The basket mock at the foot
 * carries the same distinction visually: the checkout model shows a line the
 * customer added, the fully-embedded model shows one that was already there.
 *
 * The mock is an illustration of the flow, not a screenshot of a real Guardrisk
 * product, and deliberately carries no pricing. */

export default function CaseStudyCard({
  icon,
  model,
  modelTone = 'checkout',
  sector,
  title,
  body,
  basket,
  addOn,
  badge,
}) {
  return (
    <article className={`gr-case gr-case--${modelTone}`}>
      <header className="gr-case__head">
        <span className="gr-case__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" focusable="false">
            {icons[icon]}
          </svg>
        </span>
        <span className="gr-case__model">{model}</span>
      </header>

      <p className="gr-case__sector">{sector}</p>
      <h3 className="gr-case__title">{title}</h3>
      <p className="gr-case__body">{body}</p>

      <div className="gr-case__receipt" aria-hidden="true">
        <div className="gr-case__line">
          <span>{basket}</span>
          <span className="gr-case__rule" />
        </div>
        <div className="gr-case__line gr-case__line--addon">
          <span>{addOn}</span>
          <span className="gr-case__badge">{badge}</span>
        </div>
      </div>
    </article>
  );
}

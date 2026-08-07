import { icons } from './diagramIcons';

/* An illustrated example card. The small "receipt" panel restates the moment of
   embedding concretely — it is an illustration of the flow, not a screenshot of
   a real Guardrisk product, and carries no pricing. */

export default function CaseStudyCard({ icon, sector, title, body, basket, addOn }) {
  return (
    <article className="gr-case">
      <header className="gr-case__head">
        <span className="gr-case__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" focusable="false">
            {icons[icon]}
          </svg>
        </span>
        <span className="gr-case__sector">{sector}</span>
      </header>

      <h3 className="gr-case__title">{title}</h3>
      <p className="gr-case__body">{body}</p>

      <div className="gr-case__receipt" aria-hidden="true">
        <div className="gr-case__line">
          <span>{basket}</span>
          <span className="gr-case__rule" />
        </div>
        <div className="gr-case__line gr-case__line--addon">
          <span>{addOn}</span>
          <span className="gr-case__badge">Added at checkout</span>
        </div>
      </div>
    </article>
  );
}

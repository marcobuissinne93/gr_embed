/**
 * Small numbered label above a section heading. The rule + index give the page
 * a documentation-like rhythm rather than a marketing-deck one.
 */
export default function SectionEyebrow({ children, index, tone = 'light' }) {
  return (
    <p className={`gr-eyebrow gr-eyebrow--${tone}`}>
      {index ? <span className="gr-eyebrow__index">{index}</span> : null}
      <span className="gr-eyebrow__rule" aria-hidden="true" />
      <span className="gr-eyebrow__text">{children}</span>
    </p>
  );
}

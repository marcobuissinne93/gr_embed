import useInView from '../../hooks/useInView';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

/**
 * Fade + 14px rise on first entry into the viewport.
 *
 * Reduced-motion users get the fully-visible end state immediately with no
 * transition at all (SPEC §8) — the observer is never even attached.
 */
export default function RevealOnScroll({ children, as: Tag = 'div', delay = 0, className = '', ...rest }) {
  const reduceMotion = usePrefersReducedMotion();
  const [ref, inView] = useInView({ disabled: reduceMotion });

  return (
    <Tag
      ref={ref}
      className={`gr-reveal${inView ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay && !reduceMotion ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

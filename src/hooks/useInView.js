import { useEffect, useRef, useState } from 'react';

/**
 * Fires once, the first time the element crosses the threshold, then
 * disconnects (SPEC §8: reveals run once, not on every scroll-back).
 *
 * Returns `[ref, inView]`. If IntersectionObserver is unavailable, or the user
 * prefers reduced motion, `inView` starts true so content is never trapped in
 * a hidden pre-animation state.
 */
export default function useInView({ threshold = 0.2, rootMargin = '0px 0px -8% 0px', disabled = false } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(disabled);

  useEffect(() => {
    if (disabled) {
      setInView(true);
      return undefined;
    }

    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, disabled]);

  return [ref, inView];
}

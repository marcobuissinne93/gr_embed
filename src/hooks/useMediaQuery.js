import { useEffect, useState } from 'react';

/**
 * Drives the diagrams' *layout* switch (horizontal ⇄ vertical), not just their
 * scale — SPEC §10 requires a real mobile layout, so the SVG geometry itself is
 * recomputed rather than the desktop drawing being shrunk.
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mql = window.matchMedia(query);
    const onChange = (event) => setMatches(event.matches);

    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

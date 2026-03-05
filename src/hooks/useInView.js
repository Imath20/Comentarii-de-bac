import { useRef, useEffect, useState } from 'react';

/**
 * Hook that returns true when the element enters the viewport.
 * Useful for lazy loading heavy content (iframes, canvas, etc.).
 */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const { rootMargin = '100px', threshold = 0.01, once = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return [ref, isInView];
}

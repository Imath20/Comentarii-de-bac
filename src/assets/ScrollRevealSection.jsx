import React, { useRef, useEffect, useState } from 'react';

/**
 * Wrapper component that reveals content with animation when it enters the viewport.
 * Uses Intersection Observer for performant scroll-triggered loading.
 */
const ScrollRevealSection = ({ children, className = '', delay = 0, rootMargin = '80px' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        rootMargin,
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal-section ${isVisible ? 'scroll-reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

export default ScrollRevealSection;

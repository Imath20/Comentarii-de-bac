import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    const savedState = location.state;
    const explicitRestore = savedState && typeof savedState.restoreScroll === 'number' ? savedState.restoreScroll : null;
    const key = `scroll:${location.pathname}`;
    const stored = Number(sessionStorage.getItem(key));

    const targetTop = explicitRestore !== null
      ? explicitRestore
      : navType === 'POP' && !Number.isNaN(stored)
        ? stored
        : 0;

    const applyScroll = () => window.scrollTo({ top: targetTop, left: 0, behavior: 'auto' });

    applyScroll();
    const rafId = requestAnimationFrame(applyScroll);
    const timeoutId = setTimeout(applyScroll, 60);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      sessionStorage.setItem(key, String(window.scrollY || 0));
    };
  }, [location.pathname, navType]);

  return null;
}



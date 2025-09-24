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

    const baseTop = explicitRestore !== null
      ? explicitRestore
      : navType === 'POP' && !Number.isNaN(stored)
        ? stored
        : 0;

    // Dynamic offset (navbar height) for list/landing pages
    const isListPage = location.pathname === '/' || location.pathname.startsWith('/opere') || location.pathname.startsWith('/scriitori');
    const getNavbarOffset = () => {
      const nav = document.querySelector('.navbar');
      return (nav && nav.offsetHeight) ? nav.offsetHeight + 8 : 56; // fallback
    };
    const targetTop = baseTop + (isListPage && explicitRestore === null ? getNavbarOffset() : 0);

    const applyScroll = () => window.scrollTo({ top: targetTop, left: 0, behavior: 'auto' });

    applyScroll();
    const rafId = requestAnimationFrame(applyScroll);
    const timeoutId = setTimeout(applyScroll, 60);
    // When we have an explicit restore (e.g., coming from a detail page back to exact y), be extra sure
    const extraTimeouts = [];
    if (explicitRestore !== null) {
      [120, 240, 400].forEach((ms) => {
        extraTimeouts.push(setTimeout(applyScroll, ms));
      });
      const onLoad = () => applyScroll();
      window.addEventListener('load', onLoad, { once: true });
      extraTimeouts.push({ _isListener: true, handler: onLoad });
    }

    // For dynamic grids/images (like Opere), re-apply after images/layout settle
    let intervalId = null;
    let mutationObserver = null;
    const imgUnloaders = [];
    const interactionUnloaders = [];
    let pendingRestore = true;

    const cancelRestore = () => {
      pendingRestore = false;
      if (intervalId) { clearInterval(intervalId); intervalId = null; }
    };
    const bindCancelOnUserInteraction = () => {
      const cancelEvents = ['wheel', 'touchstart', 'keydown', 'mousedown'];
      cancelEvents.forEach(evt => {
        const handler = () => cancelRestore();
        window.addEventListener(evt, handler, { passive: true, once: true });
        interactionUnloaders.push(() => window.removeEventListener(evt, handler));
      });
      // Also cancel if user scrolls away significantly
      const onScroll = () => {
        if (Math.abs(window.scrollY - targetTop) > 8) cancelRestore();
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      interactionUnloaders.push(() => window.removeEventListener('scroll', onScroll));
    };

    const isOpere = location.pathname.startsWith('/opere');
    const isHome = location.pathname === '/';
    if (isOpere || isHome) {
      bindCancelOnUserInteraction();
      // Re-apply several times quickly, but stop once target reached or user interacts
      let attempts = 0;
      intervalId = setInterval(() => {
        if (!pendingRestore) return;
        const delta = Math.abs(window.scrollY - targetTop);
        applyScroll();
        attempts += 1;
        if (delta <= 2 || attempts >= 24) {
          cancelRestore();
        }
      }, 50);

      // Apply on image load events while pendingRestore
      const containerSelectors = isOpere
        ? ['.opere-grid-container']
        : ['.index-opere-grid', '.index-biblioteca-grid', '.index-scriitori-grid', '.index-videoclipuri-grid'];
      containerSelectors.forEach((sel) => {
        const container = document.querySelector(sel);
        if (container) {
          const imgs = Array.from(container.querySelectorAll('img'));
          imgs.forEach((img) => {
            if (img && !img.complete) {
              const onLoad = () => { if (pendingRestore) applyScroll(); };
              img.addEventListener('load', onLoad, { once: true });
              imgUnloaders.push(() => img.removeEventListener('load', onLoad));
            }
          });
          // Observe DOM changes that might affect layout
          if (!mutationObserver) {
            mutationObserver = new MutationObserver(() => { if (pendingRestore) applyScroll(); });
          }
          mutationObserver.observe(container, { childList: true, subtree: true });
        }
      });
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      extraTimeouts.forEach((t) => {
        if (t && t._isListener) {
          window.removeEventListener('load', t.handler);
        } else if (t) {
          clearTimeout(t);
        }
      });
      if (intervalId) clearInterval(intervalId);
      if (mutationObserver) mutationObserver.disconnect();
      imgUnloaders.forEach((un) => un());
      sessionStorage.setItem(key, String(window.scrollY || 0));
      interactionUnloaders.forEach((un) => un());
    };
  }, [location.pathname, navType]);

  return null;
}



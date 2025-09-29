import React, { useMemo, useRef, useState, useEffect } from 'react';
import Layout from '../assets/Layout';
import '../styles/style.scss';

// Date de exemplu pentru curente. Fiecare punct are glowColor, an, descriere, imagine și autori remarcați pentru tooltip.
const CURENTE_DATA = [
  {
    id: 'classic',
    nume: 'Clasicismul',
    interval: 'sec. XVII–XVIII',
    an: 1700,
    img: '/Banner/10.webp',
    glowColor: 'rgba(255,179,71,0.85)',
    descriere: 'Echilibru, rațiune, reguli stricte. Influență franceză.',
    autori: [
      { nume: 'Nicolas Boileau', img: '/scriitori/george_calinescu.webp' },
    ],
  },
  {
    id: 'romantic',
    nume: 'Romantismul',
    interval: 'cca. 1800–1870',
    an: 1830,
    img: '/opere/Luceafarul.webp',
    glowColor: 'rgba(122,58,0,0.9)',
    descriere: 'Sentiment, imaginație, natura și individul. În RO: Eminescu.',
    autori: [
      { nume: 'Mihai Eminescu', img: '/scriitori/eminescu_mihai.webp' },
      { nume: 'Vasile Alecsandri', img: '/scriitori/alecsandri.webp' },
    ],
  },
  {
    id: 'realist',
    nume: 'Realismul',
    interval: 'cca. 1830–1900',
    an: 1880,
    img: '/opere/enigma-otiliei.webp',
    glowColor: 'rgba(255, 215, 0, 0.9)',
    descriere: 'Reflectă fidel realitatea socială. În RO: Rebreanu, Călinescu.',
    autori: [
      { nume: 'Liviu Rebreanu', img: '/scriitori/rebreanu.webp' },
      { nume: 'George Călinescu', img: '/scriitori/george_calinescu.webp' },
    ],
  },
  {
    id: 'symbol',
    nume: 'Simbolismul',
    interval: 'cca. 1886–1910',
    an: 1895,
    img: '/opere/plumb.webp',
    glowColor: 'rgba(103, 58, 183, 0.9)',
    descriere: 'Sugestie, muzicalitate, corespondențe. În RO: Bacovia.',
    autori: [
      { nume: 'George Bacovia', img: '/scriitori/bacovia.webp' },
    ],
  },
  {
    id: 'modern',
    nume: 'Modernismul',
    interval: 'cca. 1900–1945',
    an: 1925,
    img: '/opere/testament.webp',
    glowColor: 'rgba(0, 188, 212, 0.9)',
    descriere: 'Inovație formală, introspecție, urban. În RO: Arghezi, Blaga.',
    autori: [
      { nume: 'Tudor Arghezi', img: '/scriitori/arghezi.webp' },
      { nume: 'Lucian Blaga', img: '/scriitori/blaga.webp' },
    ],
  },
  {
    id: 'avangarda',
    nume: 'Avangarda',
    interval: 'cca. 1910–1930',
    an: 1920,
    img: '/opere/riga-crypto.webp',
    glowColor: 'rgba(244, 67, 54, 0.9)',
    descriere: 'Ruperea convențiilor: dadaism, suprarealism. În RO: Tzara.',
    autori: [
      { nume: 'Tristan Tzara', img: '/scriitori/stanescu.webp' },
    ],
  },
  {
    id: 'postbelic',
    nume: 'Postbelic/Contemporan',
    interval: '1945–prezent',
    an: 1970,
    img: '/opere/morometii.webp',
    glowColor: 'rgba(76, 175, 80, 0.9)',
    descriere: 'Diversitate stilistică, teme sociale. În RO: Preda, Sorescu.',
    autori: [
      { nume: 'Marin Preda', img: '/scriitori/preda.webp' },
      { nume: 'Marin Sorescu', img: '/scriitori/sorescu.webp' },
    ],
  },
];

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

export default function Curente() {
  const [darkTheme, setDarkTheme] = useState(() => document.body.classList.contains('dark-theme'));

  // Timeline horizontal state
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const isDraggingRef = useRef(false);
  const lastPosRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef(null);
  const ITEM_WIDTH = 300; // lățimea estimată a unui element pentru centrare (mai mare)
  const [startOffset, setStartOffset] = useState(0);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const lockAxisRef = useRef(null); // 'x' | 'y' | null
  const inactivityTimerRef = useRef(null);
  const nudgeRafRef = useRef(null);
  const isNudgingRef = useRef(false);
  const restartTimerRef = useRef(null);

  const cancelIdleNudge = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
    if (nudgeRafRef.current) cancelAnimationFrame(nudgeRafRef.current);
    isNudgingRef.current = false;
  };

  const animateScrollBy = (container, delta, duration = 700) => {
    if (!container) return Promise.resolve();
    return new Promise((resolve) => {
      const start = performance.now();
      const from = container.scrollLeft;
      const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      const step = (now) => {
        const p = Math.min(1, (now - start) / duration);
        container.scrollLeft = from + delta * easeInOut(p);
        if (p < 1) {
          nudgeRafRef.current = requestAnimationFrame(step);
        } else {
          resolve();
        }
      };
      nudgeRafRef.current = requestAnimationFrame(step);
    });
  };

  const performOneNudge = async () => {
    const container = containerRef.current;
    if (!container || isDraggingRef.current) return;
    const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
    const sl = container.scrollLeft;
    const dx = 48;
    if (sl <= 8) {
      await animateScrollBy(container, Math.min(dx, maxScroll - sl));
      await animateScrollBy(container, -Math.min(dx, container.scrollLeft));
    } else if (sl >= maxScroll - 8) {
      await animateScrollBy(container, -Math.min(dx, sl));
      await animateScrollBy(container, Math.min(dx, maxScroll - container.scrollLeft));
    } else {
      await animateScrollBy(container, dx);
      await animateScrollBy(container, -dx);
    }
  };

  const startIdleNudgeLoop = () => {
    if (isNudgingRef.current) return;
    isNudgingRef.current = true;
    const loop = async () => {
      while (isNudgingRef.current) {
        await performOneNudge();
        // mică pauză între cicluri
        await new Promise(r => setTimeout(r, 800));
      }
    };
    loop();
  };

  const armInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (!isNudgingRef.current) startIdleNudgeLoop();
    }, 10000);
  };

  // momentum scroll
  const stepMomentum = () => {
    const container = containerRef.current;
    if (!container) return;
    // apply friction
    velocityRef.current *= 0.95;
    if (Math.abs(velocityRef.current) < 0.15) {
      velocityRef.current = 0;
      rafRef.current = null;
      return;
    }
    container.scrollLeft -= velocityRef.current;
    rafRef.current = requestAnimationFrame(stepMomentum);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onPointerDown = (e) => {
      isDraggingRef.current = true;
      container.classList.add('dragging');
      lastPosRef.current = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      cancelIdleNudge();
      armInactivityTimer();
    };
    const onPointerMove = (e) => {
      if (!isDraggingRef.current) return;
      const x = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
      const delta = x - lastPosRef.current;
      lastPosRef.current = x;
      container.scrollLeft -= delta;
      velocityRef.current = delta; // for momentum
    };
    const endDrag = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      container.classList.remove('dragging');
      if (!rafRef.current && Math.abs(velocityRef.current) > 0) {
        rafRef.current = requestAnimationFrame(stepMomentum);
      }
      // reîncepe nudge loop după o mică pauză
      if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
      restartTimerRef.current = setTimeout(() => {
        if (!isDraggingRef.current) startIdleNudgeLoop();
      }, 4000);
    };

    // mouse drag (desktop)
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', endDrag);
    // touch cu axis-lock
    const onTouchStart = (e) => {
      const t = e.touches && e.touches[0];
      touchStartXRef.current = t ? t.clientX : 0;
      touchStartYRef.current = t ? t.clientY : 0;
      lockAxisRef.current = null;
      isDraggingRef.current = false; // nu pornim drag-ul până nu decidem axa
      lastPosRef.current = touchStartXRef.current;
      cancelIdleNudge();
      armInactivityTimer();
    };
    const onTouchMove = (e) => {
      const t = e.touches && e.touches[0];
      if (!t) return;
      const dx = t.clientX - touchStartXRef.current;
      const dy = t.clientY - touchStartYRef.current;
      if (lockAxisRef.current == null) {
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);
        const threshold = 4; // px - lock mai rapid
        if (absX > threshold || absY > threshold) {
          lockAxisRef.current = absX >= absY ? 'x' : 'y';
          if (lockAxisRef.current === 'x') {
            isDraggingRef.current = true;
            // prevenim imediat scroll-ul vertical al paginii
            if (e.cancelable) e.preventDefault();
          }
        }
      }
      if (lockAxisRef.current === 'x') {
        // blocăm pe OX: prevenim scroll vertical implicit cât timp facem drag orizontal
        if (e.cancelable) e.preventDefault();
        const x = t.clientX;
        const delta = x - lastPosRef.current;
        lastPosRef.current = x;
        container.scrollLeft -= delta;
        velocityRef.current = delta;
      } else {
        // lăsăm OY: nu prevenim, nu drag-uim
        isDraggingRef.current = false;
      }
    };
    const onTouchEnd = () => {
      if (lockAxisRef.current === 'x' && Math.abs(velocityRef.current) > 0) {
        if (!rafRef.current) rafRef.current = requestAnimationFrame(stepMomentum);
      }
      isDraggingRef.current = false;
      lockAxisRef.current = null;
      if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
      restartTimerRef.current = setTimeout(() => {
        if (!isDraggingRef.current) startIdleNudgeLoop();
      }, 4000);
    };
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchend', endDrag);

    // wheel horizontal with shift-like behavior
    const onWheel = (e) => {
      if (!e.deltaX && Math.abs(e.deltaY) > 0) {
        container.scrollLeft += e.deltaY * 0.9;
      } else {
        container.scrollLeft += e.deltaX * 0.9;
      }
    };
    container.addEventListener('wheel', onWheel, { passive: true });
    const onWheelAny = () => { cancelIdleNudge(); armInactivityTimer(); };
    container.addEventListener('wheel', onWheelAny, { passive: true });

    // pornește nudge-ul continuu imediat; se va opri la interacțiune
    startIdleNudgeLoop();
    // prevenim dbl-tap zoom pe iOS în timpul dragului
    const preventDoubleTapZoom = (e) => {
      if (isDraggingRef.current) e.preventDefault();
    };
    container.addEventListener('gesturestart', preventDoubleTapZoom);
    container.addEventListener('gesturechange', preventDoubleTapZoom);
    container.addEventListener('gestureend', preventDoubleTapZoom);

    return () => {
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', endDrag);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('wheel', onWheelAny);
      container.removeEventListener('gesturestart', preventDoubleTapZoom);
      container.removeEventListener('gesturechange', preventDoubleTapZoom);
      container.removeEventListener('gestureend', preventDoubleTapZoom);
      cancelIdleNudge();
    };
  }, []);

  // Calculează padding-left astfel încât primul element să înceapă la jumătatea ecranului
  useEffect(() => {
    const computeOffset = () => {
      const viewportHalf = (window.innerWidth || 0) / 2;
      const offset = Math.max(16, Math.round(viewportHalf - ITEM_WIDTH / 2));
      setStartOffset(offset);
    };
    computeOffset();
    window.addEventListener('resize', computeOffset);
    return () => window.removeEventListener('resize', computeOffset);
  }, []);

  // title as on other pages
  return (
    <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
      <div className="curente-page">
      <div className="page-hero">
        <h1 className="page-title">{
          'Curente literare'.split(' ').map((word, wi) => (
            <span className="page-title-word" key={wi}>
              {word.split('').map((l, i) => <span key={i}>{l}</span>)}
            </span>
          ))
        }</h1>
        <p className="page-desc">Cronologie interactivă a principalelor curente literare.</p>
      </div>

      <div className="container">
        <div className={`curente-timeline-wrapper ${darkTheme ? 'dark-theme' : ''}`}>
          <div className="curente-timeline-scroll" ref={containerRef}>
            <div className="curente-timeline-track" ref={trackRef} style={{ paddingLeft: startOffset }}>
              {CURENTE_DATA.map((c, index) => (
                <div className="curente-item" key={c.id}>
                  <div
                    className="curente-checkpoint"
                    style={{ boxShadow: `0 0 0 10px ${c.glowColor} inset, 0 0 36px ${c.glowColor}` }}
                  >
                    <img src={c.img} alt={c.nume} className="curente-checkpoint-img" />
                    <div className="curente-popover">
                      <div className="curente-popover-title">{c.nume}</div>
                      <div className="curente-popover-date">{c.interval}</div>
                      <div className="curente-popover-authors">
                        {c.autori.map((a, i) => (
                          <div className="curente-author" key={i}>
                            <img src={a.img} alt={a.nume} />
                            <span>{a.nume}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="curente-year">{c.an}</div>
                  <div className="curente-desc">{c.descriere}</div>
                  <button className={`curente-button ${darkTheme ? 'dark-theme' : ''}`}>Vezi mai multe</button>
                </div>
              ))}
            </div>
          </div>
          <div className="curente-timeline-axis" />
        </div>
      </div>
      </div>
    </Layout>
  );
}



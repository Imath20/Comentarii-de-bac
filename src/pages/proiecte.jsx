import React, { useEffect, useState } from 'react';
import Layout from '../assets/Layout';
import '../styles/style.scss';

const proiecteList = [
  { titlu: 'Romantismul', desc: 'Site dedicat studiului romantismului, cu definitii, exemple si galerie foto', url: 'https://romantismul.vercel.app/', type: 'site' },
  { titlu: 'Simbolismul', desc: 'Site dedicat înţelegerii simbolismului, cu definiţii, poze şi muzică', url: 'https://simbolism.vercel.app/', type: 'site' },
  { titlu: 'Harap-Alb', desc: 'Site despre drumul lui Harap-Alb spre Împăratul Roşu', url: 'https://stefanarctic.github.io/Drumul_Catre_Imparatul_Ros/', type: 'site' },
  { titlu: 'Originile Române', desc: 'Prezentare despre Originile Române', url: 'https://docs.google.com/presentation/d/e/2PACX-1vQ_XsLRNJ8Plz_pBupcGCCAY43ZS4AYZccbiQZZGmejOhxNAPXkbmVgB4hE3qyXKw/pubembed?start=false&loop=false&delayms=3000', type: 'ppt' },
  { titlu: 'Revoluţia de la 1848', desc: 'Prezentare despre Revoluţia de la 1848', url: 'https://docs.google.com/presentation/d/e/2PACX-1vRJ9Wy8bKIYYKx0jHxIFRglwRUWJ-8iBEWVfhJhH541JeGKXdQnR3wS_k8shEm9_g/pubembed?start=false&loop=false&delayms=3000', type: 'ppt' },
  { titlu: 'Literatura română', desc: 'Prezentare despre Literatura Română', url: 'https://docs.google.com/presentation/d/e/2PACX-1vTeTsk18haztUvj0PjIDT8rFKME7A7-Wkgmd40DlLbAkZhrCCNVg_oNKxNj0j30Eg/pubembed?start=false&loop=false&delayms=3000', type: 'ppt' },
  { titlu: 'Infografic: Structura subiectelor', desc: 'Un infografic clar despre structura examenului.' },
  { titlu: 'Blog: Jurnal de BAC', desc: 'Povești, sfaturi și experiențe personale de la elevi.' },
  { titlu: 'Aplicație: Organizator BAC', desc: 'O aplicație web pentru planificarea studiului.' },
  { titlu: 'Galerie: Arta la BAC', desc: 'Galerie cu desene, picturi și colaje inspirate de teme de BAC.' },
  { titlu: 'Mapa: Figuri de stil', desc: 'O mapă interactivă cu figuri de stil și exemple.' },
  { titlu: 'Expo: Portrete de scriitori', desc: 'Expoziție virtuală cu portrete și biografii.' },
  { titlu: 'Timeline: Curente și epoci', desc: 'Cronologie interactivă a literaturii române.' },
  { titlu: 'Harta: Literatura pe regiuni', desc: 'Harta literară a României cu autori locali.' },
  { titlu: 'Broșură: Eseul perfect', desc: 'Ghid complet pentru scrierea eseului de BAC.' },
  { titlu: 'Mini-enciclopedie BAC', desc: 'Enciclopedie compactă cu termeni literari.' },
  { titlu: 'Colecție: Eseuri model', desc: 'Colecție de eseuri exemplare pentru BAC.' },
  { titlu: 'Workshop: Dicție și retorică', desc: 'Workshop-uri practice de dicție.' },
  { titlu: 'Joc: Cuvinte încrucișate', desc: 'Joc interactiv cu vocabular literar.' },
  { titlu: 'Seria: BAC în 5 minute', desc: 'Serie de clipuri scurte cu explicații.' },
  { titlu: 'Studiu de caz: Ion', desc: 'Analiză detaliată a romanului Ion.' },
  { titlu: 'Panou: Personaje memorabile', desc: 'Panouri cu personaje din literatura română.' },
  { titlu: 'Set: Fișe de învățare', desc: 'Set complet de fișe pentru fiecare autor.' },
  { titlu: 'Interviuri: Profii spun', desc: 'Interviuri cu profesori de română.' },
  { titlu: 'Serată: Literatura vie', desc: 'Serate literare cu recitări și muzică.' },
  { titlu: 'Template: Structuri de eseu', desc: 'Template-uri pentru diferite tipuri de eseu.' },
  { titlu: 'Checklist: Înainte de examen', desc: 'Checklist complet pentru ziua de BAC.' },
  { titlu: 'Mindmap: Tematici majore', desc: 'Mindmap-uri cu tematici literare.' },
  { titlu: 'Calendar: Plan de recapitulare', desc: 'Calendar personalizat pentru BAC.' },
  { titlu: 'Carnet: Note și idei', desc: 'Carnet digital pentru notițe literare.' },
  { titlu: 'Quiz: Curente literare', desc: 'Quiz-uri tematice pe curente literare.' },
  { titlu: 'Video: Stiluri narative', desc: 'Explicații video despre stiluri narative.' },
  { titlu: 'Podcast: Autori în dialog', desc: 'Podcast-uri cu discuții despre autori.' },
  { titlu: 'Galerie: Citate ilustrate', desc: 'Galerie cu citate și ilustrații.' },
  { titlu: 'Jurnal vizual: BAC journey', desc: 'Jurnal vizual al pregătirii pentru BAC.' },
];

export default function Proiecte() {
  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkTheme);
    localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const angles = [-7, 4, -3, 6, -5, 5, -4, 7, -2, 3, 2, -6, 5, -4, 3, -2, 1, -5, 6, -3, 4, -1, 2, -2, 3, -3, 1, -1, 2, -2, 4, -4, 5, -5, 6];
  const pinColors = ['#ff595e','#ffca3a','#8ac926','#1982c4','#6a4c93','#f9844a','#43aa8b','#b5838d','#e07a5f','#e07a5f','#9d4edd'];

  return (
    <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled}>
      <div className="page-hero">
        <h1 className="page-title">{
          'Proiecte'.split(' ').map((word, wi) => (
            <span className="page-title-word" key={wi}>
              {word.split('').map((l, i) => <span key={i}>{l}</span>)}
            </span>
          ))
        }</h1>
        <p className="page-desc">Tabla cu proiectele elevilor, un caleidoscop de idei.</p>
      </div>

      <section className={`index-section proiecte-page ${darkTheme ? 'dark-theme' : ''}`}>
        <div className={`index-proiecte-container ${darkTheme ? 'dark-theme' : ''}`}>
          <div className="index-proiecte-header">
            <h2 className={`index-proiecte-title ${darkTheme ? 'dark-theme' : ''}`}>Proiecte</h2>
          </div>
          <div className={`index-proiecte-desc ${darkTheme ? 'dark-theme' : ''}`}>
            Proiectele colegilor noștri – idei creative, teme, prezentări și inițiative deosebite.
          </div>

          <div className="index-proiecte-grid">
            {proiecteList.map((proj, idx) => (
              <div
                key={`${proj.titlu}-${idx}`}
                className="index-proiect-card"
                style={{ '--angle': `${angles[idx % angles.length]}deg` }}
                onClick={() => {
                  if (!proj.url) return;
                  window.open(proj.url, '_blank', 'noopener,noreferrer');
                }}
              >
                {/* push pin */}
                <svg width="30" height="36" viewBox="0 0 40 48" style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', zIndex: 4 }}>
                  <defs>
                    <radialGradient id={`pinHeadGrad-page-${idx}`} cx="50%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                      <stop offset="35%" stopColor="rgba(255,255,255,0.6)" />
                      <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
                    </radialGradient>
                    <linearGradient id={`pinNeckGrad-page-${idx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#d9b38c" />
                      <stop offset="100%" stopColor="#a17852" />
                    </linearGradient>
                    <filter id={`pinShadow-page-${idx}`} x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="2" stdDeviation="1.3" floodColor="rgba(0,0,0,0.35)" />
                    </filter>
                  </defs>
                  <path d="M20 20 L21 42 L20 46 L19 42 Z" fill="#b0b0b0" stroke="#6b6b6b" strokeWidth="0.6" />
                  <rect x="18.7" y="22" width="2.6" height="8" rx="1.2" fill={`url(#pinNeckGrad-page-${idx})`} stroke="#5a3c28" strokeWidth="0.6" />
                  <g filter={`url(#pinShadow-page-${idx})`}>
                    <circle cx="20" cy="16" r="9" fill={pinColors[idx % pinColors.length]} stroke="#2a2a2a" strokeWidth="1" />
                    <circle cx="17" cy="13" r="3.2" fill={`url(#pinHeadGrad-page-${idx})`} />
                  </g>
                  <ellipse cx="20" cy="6" rx="10" ry="4" fill="rgba(0,0,0,0.18)" transform="translate(0,24) skewX(-10)" />
                </svg>

                <div className="index-proiect-title">{proj.titlu}</div>
                <div className="index-proiect-desc">{proj.desc}</div>
              </div>
            ))}
          </div>

          <div className={`index-proiecte-footer ${darkTheme ? 'dark-theme' : ''}`}>
            <svg width="120" height="25" viewBox="0 0 200 32" style={{ display: 'block' }}>
              <rect x="12" y="12" width="52" height="6" rx="2" fill="#ffffff" stroke="#dcdcdc" strokeWidth="1" />
              <rect x="80" y="9" width="84" height="12" rx="6" fill="#f0efe7" stroke="#8a8a8a" strokeWidth="1" />
              <rect x="84" y="10" width="30" height="10" rx="5" fill="#e53935" />
              <rect x="166" y="9" width="18" height="12" rx="3" fill="#e53935" stroke="#9b1f1c" strokeWidth="1" />
              <rect x="186" y="10" width="8" height="10" rx="2.5" fill="#2a2a2a" />
            </svg>
          </div>
        </div>
      </section>
    </Layout>
  );
}



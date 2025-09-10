import React, { useEffect, useState } from 'react';
import Navbar from '../assets/Navbar';
import Footer from '../assets/Footer';
import '../styles/style.scss';

const proiecteList = Array.from({ length: 35 }).map((_, i) => {
  const titles = [
    'Revista BAC+', 'Podcast: BAC la Cafea', 'Prezentare: Eminescu altfel', 'Quiz literar', 'Poster: Curente literare',
    'Video: BAC Explained', 'Infografic: Structura subiectelor', 'Blog: Jurnal de BAC', 'Aplicație: Organizator BAC', 'Galerie: Arta la BAC',
    'Mapa: Figuri de stil', 'Expo: Portrete de scriitori', 'Timeline: Curente și epoci', 'Harta: Literatura pe regiuni', 'Broșură: Eseul perfect',
    'Mini-enciclopedie BAC', 'Colecție: Eseuri model', 'Workshop: Dicție și retorică', 'Joc: Cuvinte încrucișate', 'Seria: BAC în 5 minute',
    'Studiu de caz: Ion', 'Panou: Personaje memorabile', 'Set: Fișe de învățare', 'Interviuri: Profii spun', 'Serată: Literatura vie',
    'Template: Structuri de eseu', 'Checklist: Înainte de examen', 'Mindmap: Tematici majore', 'Calendar: Plan de recapitulare', 'Carnet: Note și idei',
    'Quiz: Curente literare', 'Video: Stiluri narative', 'Podcast: Autori în dialog', 'Galerie: Citate ilustrate', 'Fișier: Greșeli frecvente',
  ];
  const descriptions = [
    'Idei creative, teme, prezentări și inițiative deosebite.',
    'Colecție realizată de elevi pentru elevi.',
    'Resurse rapide pentru recapitulare eficientă.',
    'Materiale ilustrate și interactive.',
    'Educație prin multimedia și joc.'
  ];
  return {
    titlu: titles[i % titles.length],
    desc: descriptions[i % descriptions.length]
  };
});

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

  const angles = [-7, 4, -3, 6, -5, 5, -4, 7, -2, 3, 2, -6, 5, -4, 3, -2, 1, -5, 6, -3, 4, -1, 2, -2, 3, -3, 1, -1, 2, -2, 4, -4, 5, -5, 6, -6];
  const pinColors = ['#ff595e','#ffca3a','#8ac926','#1982c4','#6a4c93','#f9844a','#43aa8b','#b5838d','#e07a5f','#9d4edd'];

  return (
    <>
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled} />
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

      <section className={`proiecte-section ${darkTheme ? 'dark-theme' : ''}`}>
        <div className={`proiecte-board-container ${darkTheme ? 'dark-theme' : ''}`}>
          <h2 className={`proiecte-title ${darkTheme ? 'dark-theme' : ''}`}>Proiectele noastre în colaborare cu alţi colegi</h2>
          <div className={`proiecte-desc ${darkTheme ? 'dark-theme' : ''}`}>
            Exploreaza si inspiră-te din 35 de bilete fixate cu bolduri !
          </div>

          <div className="proiecte-grid">
            {proiecteList.map((proj, idx) => (
              <div
                key={`${proj.titlu}-${idx}`}
                className="proiecte-card"
                style={{ transform: `rotate(${angles[idx % angles.length]}deg)` }}
                onMouseOver={e => {
                  e.currentTarget.style.boxShadow = '0 14px 28px rgba(60, 40, 20, 0.28)';
                  e.currentTarget.style.transform = `scale(1.07) rotate(${angles[idx % angles.length]}deg)`;
                  e.currentTarget.style.zIndex = 3;
                }}
                onMouseOut={e => {
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(60, 40, 20, 0.18)';
                  e.currentTarget.style.transform = `rotate(${angles[idx % angles.length]}deg)`;
                  e.currentTarget.style.zIndex = 2;
                }}
              >
                <svg width="30" height="36" viewBox="0 0 40 48" style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', zIndex: 4 }}>
                  <defs>
                    <radialGradient id={`pinHeadGrad-${idx}`} cx="50%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
                      <stop offset="35%" stopColor="rgba(255,255,255,0.6)"/>
                      <stop offset="100%" stopColor="rgba(0,0,0,0.2)"/>
                    </radialGradient>
                    <linearGradient id={`pinNeckGrad-${idx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#d9b38c"/>
                      <stop offset="100%" stopColor="#a17852"/>
                    </linearGradient>
                    <filter id={`pinShadow-${idx}`} x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="2" stdDeviation="1.3" floodColor="rgba(0,0,0,0.35)"/>
                    </filter>
                  </defs>
                  <path d="M20 20 L21 42 L20 46 L19 42 Z" fill="#b0b0b0" stroke="#6b6b6b" strokeWidth="0.6"/>
                  <rect x="18.7" y="22" width="2.6" height="8" rx="1.2" fill={`url(#pinNeckGrad-${idx})`} stroke="#5a3c28" strokeWidth="0.6"/>
                  <g filter={`url(#pinShadow-${idx})`}>
                    <circle cx="20" cy="16" r="9" fill={pinColors[idx % pinColors.length]} stroke="#2a2a2a" strokeWidth="1"/>
                    <circle cx="17" cy="13" r="3.2" fill={`url(#pinHeadGrad-${idx})`} />
                  </g>
                  <ellipse cx="20" cy="6" rx="10" ry="4" fill="rgba(0,0,0,0.18)" transform="translate(0,24) skewX(-10)" />
                </svg>
                <div className="proiecte-card-title">{proj.titlu}</div>
                <div className="proiecte-card-desc">{proj.desc}</div>
              </div>
            ))}
          </div>

          <div className={`proiecte-footer ${darkTheme ? 'dark-theme' : ''}`}>
            <svg width="140" height="28" viewBox="0 0 200 32" style={{ display: 'block' }}>
              <rect x="12" y="12" width="52" height="6" rx="2" fill="#ffffff" stroke="#dcdcdc" strokeWidth="1" />
              <rect x="80" y="9" width="84" height="12" rx="6" fill="#f0efe7" stroke="#8a8a8a" strokeWidth="1" />
              <rect x="84" y="10" width="30" height="10" rx="5" fill="#e53935" />
              <rect x="166" y="9" width="18" height="12" rx="3" fill="#e53935" stroke="#9b1f1c" strokeWidth="1" />
              <rect x="186" y="10" width="8" height="10" rx="2.5" fill="#2a2a2a" />
            </svg>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}



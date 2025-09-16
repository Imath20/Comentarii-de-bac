import React, { useEffect, useState } from 'react';
import Layout from '../assets/Layout';
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
                  e.currentTarget.style.zIndex = 1;
                }}
              >
                <div className="pin" style={{ backgroundColor: pinColors[idx % pinColors.length] }} />
                <div className="proiecte-card-title">{proj.titlu}</div>
                <div className="proiecte-card-desc">{proj.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}



import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../assets/Layout';
import '../styles/style.scss';

const SECTII = [
  { slug: 'naratorul', titlu: 'Naratorul și tipurile de perspectivă narativă', subtitlu: 'Text epic', numar: 'I' },
  { slug: 'notatiile-autorului', titlu: 'Rolul notațiilor autorului', subtitlu: 'Text dramatic', numar: 'II' },
  { slug: 'semnificatia-lirica', titlu: 'Semnificația textului liric', subtitlu: 'Poezie', numar: 'III' },
];

export default function GhidSubiect2() {
  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkTheme);
    localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled}>
      <div className={`ghid-s2-page ${darkTheme ? 'dark-theme' : ''}`}>
        <div className="ghid-s2-container">
          <nav className="ghid-s2-breadcrumb" aria-label="Navigare ghid">
            <Link to="/ghiduri" className={`ghid-s2-breadcrumb-arrow ${darkTheme ? 'dark-theme' : ''}`} aria-label="Înapoi">
              ←
            </Link>
            <Link to="/ghiduri" className={`ghid-s2-breadcrumb-back ${darkTheme ? 'dark-theme' : ''}`}>
              Ghiduri BAC
            </Link>
            <span className="ghid-s2-breadcrumb-sep">/</span>
            <span className="ghid-s2-breadcrumb-current">Subiectul II</span>
          </nav>
        </div>
        <header className="ghid-s2-hero">
          <h1 className="ghid-s2-main-title">Subiectul II. Înțelege, Aplică, Scrie</h1>
          <p className="ghid-s2-intro">
            Fiecare tip de cerință din Subiectul II se desfășoară pe trei niveluri: înțelegerea conceptului, identificarea lui în text și modelul de redactare. Alege una dintre cele trei secțiuni de mai jos.
          </p>
          <div className="ghid-s2-enunt">
            <p className="ghid-s2-enunt-text">
              La bac, cerința din Subiectul II cere de obicei un răspuns de minim 50–80 de cuvinte, argumentat cu elemente din text. Folosește modelele de redactare din fiecare secțiune ca punct de plecare.
            </p>
          </div>
          <nav className="ghid-s2-cards" aria-label="Secțiuni ghid">
            {SECTII.map((s) => (
              <Link
                key={s.slug}
                to={`/subiecte/ghid-subiect-2/${s.slug}`}
                className={`ghid-s2-card ${darkTheme ? 'dark-theme' : ''}`}
              >
                <span className="ghid-s2-card-nr">{s.numar}</span>
                <span className="ghid-s2-card-titlu">{s.titlu}</span>
                <span className="ghid-s2-card-subtitlu">{s.subtitlu}</span>
              </Link>
            ))}
          </nav>
        </header>

        <div className="ghid-s2-container">
          <section className="ghid-s2-concluzie">
            <h2 className="ghid-s2-concluzie-title">Concluzie generală</h2>
            <p className="ghid-s2-text">
              Cele trei tipuri de cerințe presupun competențe diferite: analiză naratologică (epic), analiză structural-dramatică (dramatic), interpretare simbolică (liric).
            </p>
            <p className="ghid-s2-text">
              Un răspuns reușit trebuie să fie: coerent, argumentat prin elemente din text, formulat într-un limbaj adecvat, structurat logic.
            </p>
          </section>
        </div>

        <div className="ghid-s2-cta">
          <button
            type="button"
            className={`ghid-s2-back-btn ${darkTheme ? 'dark-theme' : ''}`}
            onClick={() => navigate('/subiecte?tip=2')}
          >
            Rezolvă Sub II
          </button>
        </div>
      </div>
    </Layout>
  );
}

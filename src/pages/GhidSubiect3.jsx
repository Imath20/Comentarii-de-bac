import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../assets/Layout';
import '../styles/style.scss';

const SECTII = [
  { slug: 'structura', titlu: 'Structura comentariului', subtitlu: 'Introducere, dezvoltare, încheiere', numar: 'I' },
  { slug: 'planuri', titlu: 'Planuri și organizare', subtitlu: 'Cum structurezi răspunsul', numar: 'II' },
  { slug: 'cerinte', titlu: 'Cerințe specifice', subtitlu: 'Tipuri de cerințe la Subiectul III', numar: 'III' },
];

export default function GhidSubiect3() {
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
            <span className="ghid-s2-breadcrumb-current">Subiectul III</span>
          </nav>
        </div>
        <header className="ghid-s2-hero">
          <h1 className="ghid-s2-main-title">Subiectul III. Comentariu și Eseu</h1>
          <p className="ghid-s2-intro">
            Subiectul III cere un eseu argumentativ sau comentariu pe baza unui fragment și a operelor studiate. Fiecare secțiune de mai jos te ghidează prin structură, planuri și cerințe specifice.
          </p>
          <div className="ghid-s2-enunt">
            <p className="ghid-s2-enunt-text">
              La bac, Subiectul III presupune un răspuns lung (eseu sau comentariu), cu structură liberă, argumentare personală și opera literară la alegere. Folosește modelele din fiecare secțiune ca punct de plecare.
            </p>
          </div>
          <nav className="ghid-s2-cards" aria-label="Secțiuni ghid">
            {SECTII.map((s) => (
              <Link
                key={s.slug}
                to={`/subiecte/ghid-subiect-3/${s.slug}`}
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
              Subiectul III verifică capacitatea de a structura un eseu argumentativ, de a argumenta cu opere literare și de a exprima o poziție personală coerentă.
            </p>
            <p className="ghid-s2-text">
              Un comentariu reușit trebuie să fie: structurat logic, argumentat cu opere studiate, formulat într-un limbaj adecvat, cu concluzie personală.
            </p>
          </section>
        </div>

        <div className="ghid-s2-cta">
          <button
            type="button"
            className={`ghid-s2-back-btn ${darkTheme ? 'dark-theme' : ''}`}
            onClick={() => navigate('/subiecte?tip=3')}
          >
            Rezolvă Sub III
          </button>
        </div>
      </div>
    </Layout>
  );
}

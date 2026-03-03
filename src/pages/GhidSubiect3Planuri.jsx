import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../assets/Layout';
import '../styles/style.scss';

export default function GhidSubiect3Planuri() {
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
            <Link to="/subiecte/ghid-subiect-3" className={`ghid-s2-breadcrumb-arrow ${darkTheme ? 'dark-theme' : ''}`} aria-label="Înapoi">
              ←
            </Link>
            <Link to="/subiecte/ghid-subiect-3" className={`ghid-s2-breadcrumb-back ${darkTheme ? 'dark-theme' : ''}`}>
              Ghid Subiect III
            </Link>
            <span className="ghid-s2-breadcrumb-sep">/</span>
            <span className="ghid-s2-breadcrumb-current">Planuri și organizare</span>
          </nav>
          <nav className="ghid-s2-subnav" aria-label="Alte secțiuni">
            <Link to="/subiecte/ghid-subiect-3/structura" className={`ghid-s2-subnav-link ${darkTheme ? 'dark-theme' : ''}`}>1. Structura comentariului</Link>
            <Link to="/subiecte/ghid-subiect-3/cerinte" className={`ghid-s2-subnav-link ${darkTheme ? 'dark-theme' : ''}`}>3. Cerințe specifice</Link>
          </nav>

          <section className="ghid-s2-section">
            <h1 className="ghid-s2-section-title">II. Planuri și organizare</h1>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">1. De ce facem plan</h2>
              <p className="ghid-s2-text">
                Planul te ajută să organizezi ideile înainte de a scrie. În timp limitat, un plan clar previne derapajele și asigură că răspunsul acoperă toate cerințele.
              </p>
              <p className="ghid-s2-text">
                Alocă 5–10 minute pentru planificare. Notează teza, argumentele principale și ordinea lor.
              </p>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">2. Elemente ale planului</h2>
              <ul className="ghid-s2-list">
                <li>teza: ce vrei să demonstrezi</li>
                <li>argumente: 2–3 idei principale cu susținere din text și opera</li>
                <li>ordinea: introducere → dezvoltare (argument 1, 2, 3) → încheiere</li>
              </ul>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">3. Model de plan</h2>
              <p className="ghid-s2-text">Exemplu simplu:</p>
              <ul className="ghid-s2-list">
                <li>I. Introducere: tema + teză</li>
                <li>II. Dezvoltare: argument 1 (fragment + opera), argument 2, argument 3</li>
                <li>III. Încheiere: concluzie</li>
              </ul>
              <p className="ghid-s2-text">
                Adaptează planul la cerința specifică. Unele cerințe cer mai multe opere sau un anumit unghi de abordare.
              </p>
            </div>

            <div className="ghid-s2-cta">
              <button type="button" className={`ghid-s2-back-btn ${darkTheme ? 'dark-theme' : ''}`} onClick={() => navigate('/subiecte/ghid-subiect-3')}>
                Înapoi la ghid
              </button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../assets/Layout';
import '../styles/style.scss';

export default function GhidSubiect3Structura() {
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
            <span className="ghid-s2-breadcrumb-current">Structura comentariului</span>
          </nav>
          <nav className="ghid-s2-subnav" aria-label="Alte secțiuni">
            <Link to="/subiecte/ghid-subiect-3/planuri" className={`ghid-s2-subnav-link ${darkTheme ? 'dark-theme' : ''}`}>2. Planuri și organizare</Link>
            <Link to="/subiecte/ghid-subiect-3/cerinte" className={`ghid-s2-subnav-link ${darkTheme ? 'dark-theme' : ''}`}>3. Cerințe specifice</Link>
          </nav>

          <section className="ghid-s2-section">
            <h1 className="ghid-s2-section-title">I. Structura comentariului (Introducere, dezvoltare, încheiere)</h1>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">1. Introducerea</h2>
              <p className="ghid-s2-text">
                Introducerea prezintă tema și teza comentariului. Trebuie să atragi atenția și să anunți direcția argumentării. Poți include o referință la fragment sau la contextul literar.
              </p>
              <ul className="ghid-s2-list">
                <li>prezintă tema și opera</li>
                <li>formulează teza sau poziția ta</li>
                <li>anunță structura argumentării</li>
              </ul>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">2. Dezvoltarea</h2>
              <p className="ghid-s2-text">
                Dezvoltarea este partea centrală a comentariului. Fiecare paragraf prezintă un argument sau o idee, susținută cu elemente din fragment și din opera literară.
              </p>
              <ul className="ghid-s2-list">
                <li>paragraf = o idee principală</li>
                <li>argumente din text și din opera</li>
                <li>tranziții între paragrafe</li>
              </ul>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">3. Încheierea</h2>
              <p className="ghid-s2-text">
                Încheierea sintetizează argumentele și reia teza sau concluzia. Poți include o reflecție personală sau o deschidere către context mai larg.
              </p>
              <p className="ghid-s2-text">
                Evită informații noi în încheiere. Concluzia trebuie să fie coerentă cu ce ai dezvoltat.
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

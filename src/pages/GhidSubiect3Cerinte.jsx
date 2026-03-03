import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../assets/Layout';
import '../styles/style.scss';

export default function GhidSubiect3Cerinte() {
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
            <span className="ghid-s2-breadcrumb-current">Cerințe specifice</span>
          </nav>
          <nav className="ghid-s2-subnav" aria-label="Alte secțiuni">
            <Link to="/subiecte/ghid-subiect-3/structura" className={`ghid-s2-subnav-link ${darkTheme ? 'dark-theme' : ''}`}>1. Structura comentariului</Link>
            <Link to="/subiecte/ghid-subiect-3/planuri" className={`ghid-s2-subnav-link ${darkTheme ? 'dark-theme' : ''}`}>2. Planuri și organizare</Link>
          </nav>

          <section className="ghid-s2-section">
            <h1 className="ghid-s2-section-title">III. Cerințe specifice la Subiectul III</h1>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">1. Tipuri de cerințe</h2>
              <p className="ghid-s2-text">
                Subiectul III poate cere comentariu pe un fragment, eseu argumentativ sau analiză comparativă. Cerința specifică ce opere trebuie incluse și cum trebuie structurat răspunsul.
              </p>
              <ul className="ghid-s2-list">
                <li>comentariu pe fragment cu opera la alegere</li>
                <li>eseu pe tema X cu opera Y și Z</li>
                <li>analiză comparativă între fragmente sau opere</li>
              </ul>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">2. Ce verifică cerința</h2>
              <p className="ghid-s2-text">
                Cerința verifică: înțelegerea fragmentului, cunoașterea operelor, capacitatea de argumentare, structurarea și coerența răspunsului.
              </p>
              <p className="ghid-s2-text">
                Citește cu atenție cerința și asigură-te că răspunsul acoperă toate elementele solicitate: număr de opere, tip de abordare, lungime.
              </p>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">3. Criterii de evaluare</h2>
              <ul className="ghid-s2-list">
                <li>respectarea cerinței</li>
                <li>argumentare cu elemente din text și din opere</li>
                <li>structură logică (introducere, dezvoltare, încheiere)</li>
                <li>limbaj corect și adecvat</li>
              </ul>
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

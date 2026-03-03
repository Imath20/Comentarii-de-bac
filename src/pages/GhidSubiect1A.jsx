import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../assets/Layout';
import '../styles/style.scss';

export default function GhidSubiect1A() {
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
            <Link to="/subiecte/ghid-subiect-1" className={`ghid-s2-breadcrumb-arrow ${darkTheme ? 'dark-theme' : ''}`} aria-label="Înapoi">
              ←
            </Link>
            <Link to="/subiecte/ghid-subiect-1" className={`ghid-s2-breadcrumb-back ${darkTheme ? 'dark-theme' : ''}`}>
              Ghid Subiect I
            </Link>
            <span className="ghid-s2-breadcrumb-sep">/</span>
            <span className="ghid-s2-breadcrumb-current">Subpunct A</span>
          </nav>
          <nav className="ghid-s2-subnav" aria-label="Alte secțiuni">
            <Link to="/subiecte/ghid-subiect-1/b" className={`ghid-s2-subnav-link ${darkTheme ? 'dark-theme' : ''}`}>B. Subpunct B</Link>
          </nav>

          <section className="ghid-s2-section">
            <h1 className="ghid-s2-section-title">A. Cinci cerințe cu răspuns deschis</h1>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">1. Tipuri de cerințe</h2>
              <p className="ghid-s2-text">
                Subpunctul A din Subiectul I include 5 cerințe cu răspuns deschis pe baza unui fragment de text. Fiecare cerință valorând 6 puncte (30 puncte în total). Verbele folosite în enunțuri indică tipul de răspuns așteptat:
              </p>
              <ul className="ghid-s2-list">
                <li><strong>Indică</strong> — răspuns scurt și direct, fără citat</li>
                <li><strong>Menționează</strong> — identifică aspecte din paragraf, fără citat</li>
                <li><strong>Precizează</strong> — analizează în profunzime, justifică cu o secvență din text</li>
                <li><strong>Explică</strong> — oferă două idei din întregul fragment (30–35 cuvinte), fără citat</li>
                <li><strong>Prezintă</strong> — analizează o secvență în 30–50 cuvinte, parafrazare preferată</li>
              </ul>
              <p className="ghid-s2-text">
                Toate răspunsurile trebuie extrase din textul dat.
              </p>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">2. Strategii de răspuns</h2>
              <p className="ghid-s2-text">
                Citește cu atenție cerința și identifică verbul cheie (Indică, Menționează etc.). Caută în text informațiile relevante. Formulează răspunsul în enunțuri complete, nu doar cuvinte izolate.
              </p>
              <p className="ghid-s2-text">
                La Precizează, folosește un citat semnificativ. La Explică și Prezintă, respectă limita de cuvinte și evită parafrazarea excesivă.
              </p>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">3. Erori de evitat</h2>
              <ul className="ghid-s2-list">
                <li>răspunsuri care nu respectă cerința</li>
                <li>informații inventate sau din afara textului</li>
                <li>formulări prea vagi sau prea lungi</li>
              </ul>
            </div>

            <div className="ghid-s2-cta">
              <button type="button" className={`ghid-s2-back-btn ${darkTheme ? 'dark-theme' : ''}`} onClick={() => navigate('/subiecte/ghid-subiect-1')}>
                Înapoi la ghid
              </button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

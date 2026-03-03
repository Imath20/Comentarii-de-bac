import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../assets/Layout';
import '../styles/style.scss';

export default function GhidSubiect1B() {
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
            <Link to="/subiecte/ghid-subiect-1" className={`ghid-s2-breadcrumb-back ${darkTheme ? 'dark-theme' : ''}`}>
              Ghid Subiect I
            </Link>
            <span className="ghid-s2-breadcrumb-sep">/</span>
            <span className="ghid-s2-breadcrumb-current">Subpunct B</span>
          </nav>
          <nav className="ghid-s2-subnav" aria-label="Alte secțiuni">
            <Link to="/subiecte/ghid-subiect-1/a" className={`ghid-s2-subnav-link ${darkTheme ? 'dark-theme' : ''}`}>A. Subpunct A</Link>
          </nav>

          <section className="ghid-s2-section">
            <h1 className="ghid-s2-section-title">B. Argumentare pe baza textului</h1>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">1. Cerința Subpunctului B</h2>
              <p className="ghid-s2-text">
                Subpunctul B cere un răspuns argumentat pe baza textului. Trebuie să prezinți o poziție sau o interpretare și să o susții cu elemente din fragmentul dat.
              </p>
              <p className="ghid-s2-text">
                Răspunsul trebuie să fie coerent, structurat și bazat exclusiv pe informațiile din text.
              </p>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">2. Structura răspunsului</h2>
              <p className="ghid-s2-text">Un răspuns reușit include:</p>
              <ul className="ghid-s2-list">
                <li>o teză sau poziție clară</li>
                <li>argumente extrase din text (citate sau parafrază)</li>
                <li>legătura explicită între argumente și teză</li>
                <li>concluzie scurtă</li>
              </ul>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">3. Model de redactare</h2>
              <p className="ghid-s2-text">
                Începe cu poziția ta. Apoi prezintă argumentele, citând sau parafrazând din text. Conectează fiecare argument la teză. Încheie cu o concluzie care reia ideea principală.
              </p>
              <p className="ghid-s2-model">
                Teză: [poziția ta]. Argument 1: [element din text]. Argument 2: [alt element]. Concluzie: [sintetizare].
              </p>
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

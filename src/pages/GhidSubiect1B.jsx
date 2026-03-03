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
            <Link to="/subiecte/ghid-subiect-1" className={`ghid-s2-breadcrumb-arrow ${darkTheme ? 'dark-theme' : ''}`} aria-label="Înapoi">
              ←
            </Link>
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
            <h1 className="ghid-s2-section-title">B. Text argumentativ (min. 150 cuvinte)</h1>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">1. Cerința Subpunctului B</h2>
              <p className="ghid-s2-text">
                Subpunctul B cere redactarea unui text argumentativ de minimum 150 cuvinte. Trebuie să argumentezi o problemă pusă în discuție, raportându-te atât la fragmentul din Partea A, cât și la experiența personală sau culturală.
              </p>
              <p className="ghid-s2-text">
                Un argument trebuie extras din fragment; cel de-al doilea poate proveni din experiența ta existențială sau din cultura generală.
              </p>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">2. Structura răspunsului</h2>
              <p className="ghid-s2-text">Un text argumentativ reușit include:</p>
              <ul className="ghid-s2-list">
                <li>teză (ipoteză) — poziția ta, cu conectori: „Consider că…”, „Sunt de părere că…”</li>
                <li>argument 1 — din fragmentul dat, cu citat sau parafrază</li>
                <li>argument 2 — din experiența personală sau culturală</li>
                <li>concluzie — reluarea tezei, cu conectori: „În concluzie…”, „Prin urmare…”</li>
              </ul>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">3. Model de redactare</h2>
              <p className="ghid-s2-text">
                Începe cu teza. Dezvoltă fiecare argument într-un alineat distinct. Folosește conectori logici (În primul rând, În al doilea rând). Încheie cu o concluzie pertinentă care demonstrează valabilitatea argumentelor.
              </p>
              <p className="ghid-s2-model">
                Teză: [poziția ta]. Argument 1: [element din fragment]. Argument 2: [experiență personală/culturală]. Concluzie: [sintetizare].
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

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../assets/Layout';
import { RECAP_BY_PART_4, RECAP_SHEETS } from '../data/recapSheets';
import '../styles/style.scss';

export default function RecapRapid() {
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

  return (
    <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled}>
      <div className={`recap-page ${darkTheme ? 'dark-theme' : ''}`}>
        <header className="recap-hero">
          <h1 className="recap-main-title">
            Recapitulare pentru Bac în 30 secunde
          </h1>
          <p className="recap-intro">
            Toate operele de bac, pe categorii și curente literare. Alege o operă și citește esențialul în câteva secunde.
          </p>
        </header>

        <div className="recap-sections recap-sections-4">
          {RECAP_BY_PART_4.map(({ part, curente }) => (
            <section key={part} className="recap-section recap-section-part" aria-labelledby={`recap-${part}`}>
              <h2 id={`recap-${part}`} className="recap-part-title">
                {part}
              </h2>
              {curente.map(({ curent, label, items }) => (
                <div key={curent} className="recap-curent-block">
                  <h3 className="recap-curent-title">{label}</h3>
                  <ul className="recap-grid">
                    {items.map(({ titlu, slug }) => {
                      const sheet = RECAP_SHEETS[slug];
                      const canonic = sheet?.canonic;
                      return (
                        <li key={slug}>
                          <Link
                            to={`/recap/${slug}`}
                            className={`recap-card ${darkTheme ? 'dark-theme' : ''}`}
                          >
                            <span className="recap-card-titlu">{titlu}</span>
                            <span className="recap-card-meta">{label}</span>
                            {canonic && (
                              <span className="recap-card-canonic">{canonic === 'canonic' ? 'Canonic' : 'Necanonic'}</span>
                            )}
                            <span className="recap-card-cta">Deschide →</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
}

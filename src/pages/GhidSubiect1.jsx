import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../assets/Layout';
import '../styles/style.scss';

const SECTII = [
  { slug: 'a', titlu: 'Subpunct A', subtitlu: 'Cerințe de tip grilă și răspuns scurt', numar: 'A' },
  { slug: 'b', titlu: 'Subpunct B', subtitlu: 'Argumentare pe baza textului', numar: 'B' },
];

export default function GhidSubiect1() {
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
        <header className="ghid-s2-hero">
          <h1 className="ghid-s2-main-title">Subiectul I. Înțelege și Răspunde</h1>
          <p className="ghid-s2-intro">
            Subiectul I cuprinde două subpuncte: A și B. Fiecare presupune tipuri diferite de cerințe și strategii de răspuns. Alege una dintre cele două secțiuni de mai jos.
          </p>
          <div className="ghid-s2-enunt">
            <p className="ghid-s2-enunt-text">
              La bac, Subiectul I testează înțelegerea textului și capacitatea de a răspunde precis la cerințe. Subpunctul A include cerințe de tip grilă sau răspuns scurt; Subpunctul B cere argumentare pe baza textului.
            </p>
          </div>
          <nav className="ghid-s2-cards" aria-label="Secțiuni ghid">
            {SECTII.map((s) => (
              <Link
                key={s.slug}
                to={`/subiecte/ghid-subiect-1/${s.slug}`}
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
              Subiectul I verifică competențele de lectură și înțelegere a textului. Un răspuns reușit trebuie să fie precis, concis și argumentat cu elemente din text.
            </p>
            <p className="ghid-s2-text">
              Citește cu atenție cerința, identifică informațiile relevante în text și formulează răspunsul în mod clar și coerent.
            </p>
          </section>
        </div>

        <div className="ghid-s2-cta">
          <button
            type="button"
            className={`ghid-s2-back-btn ${darkTheme ? 'dark-theme' : ''}`}
            onClick={() => navigate('/subiecte?tip=1')}
          >
            Rezolvă Sub I
          </button>
        </div>
      </div>
    </Layout>
  );
}

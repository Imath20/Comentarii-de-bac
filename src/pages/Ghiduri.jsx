import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../assets/Layout';
import '../styles/style.scss';

const GHIDURI = [
  {
    nr: 'I',
    titlu: 'Subiectul I',
    subtitlu: 'Înțelege și Răspunde',
    descriere: 'Subpuncte A și B — 5 cerințe cu răspuns deschis și text argumentativ (min. 150 cuvinte).',
    href: '/subiecte/ghid-subiect-1',
  },
  {
    nr: 'II',
    titlu: 'Subiectul II',
    subtitlu: 'Înțelege, Aplică, Scrie',
    descriere: 'Naratorul, notațiile autorului și semnificația textului liric — modele de redactare.',
    href: '/subiecte/ghid-subiect-2',
  },
  {
    nr: 'III',
    titlu: 'Subiectul III',
    subtitlu: 'Comentariu și Eseu',
    descriere: 'Structura comentariului, planuri și cerințe specifice — eseu argumentativ.',
    href: '/subiecte/ghid-subiect-3',
  },
];

export default function Ghiduri() {
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
      <div className={`ghiduri-page ${darkTheme ? 'dark-theme' : ''}`}>
        <header className="ghiduri-hero">
          <h1 className="ghiduri-main-title">Ghiduri BAC</h1>
          <p className="ghiduri-intro">
            Ghiduri structurate pentru fiecare subiect de la bacalaureat. Alege subiectul dorit și descoperă modele de redactare, strategii și cerințe specifice.
          </p>
        </header>

        <nav className="ghiduri-grid" aria-label="Ghiduri disponibile">
          {GHIDURI.map((g) => (
            <Link
              key={g.nr}
              to={g.href}
              className={`ghiduri-card ${darkTheme ? 'dark-theme' : ''}`}
            >
              <span className="ghiduri-card-nr">{g.nr}</span>
              <h2 className="ghiduri-card-titlu">{g.titlu}</h2>
              <span className="ghiduri-card-subtitlu">{g.subtitlu}</span>
              <p className="ghiduri-card-desc">{g.descriere}</p>
              <span className="ghiduri-card-cta">Deschide ghidul →</span>
            </Link>
          ))}
        </nav>
      </div>
    </Layout>
  );
}

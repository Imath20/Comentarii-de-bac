import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../assets/Layout';
import '../styles/style.scss';

export default function GhidSubiect2Naratorul() {
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
            <Link to="/subiecte/ghid-subiect-2" className={`ghid-s2-breadcrumb-arrow ${darkTheme ? 'dark-theme' : ''}`} aria-label="Înapoi">
              ←
            </Link>
            <Link to="/subiecte/ghid-subiect-2" className={`ghid-s2-breadcrumb-back ${darkTheme ? 'dark-theme' : ''}`}>
              Ghid Subiect II
            </Link>
            <span className="ghid-s2-breadcrumb-sep">/</span>
            <span className="ghid-s2-breadcrumb-current">Naratorul</span>
          </nav>
          <nav className="ghid-s2-subnav" aria-label="Alte secțiuni">
            <Link to="/subiecte/ghid-subiect-2/notatiile-autorului" className={`ghid-s2-subnav-link ${darkTheme ? 'dark-theme' : ''}`}>2. Notațiile autorului</Link>
            <Link to="/subiecte/ghid-subiect-2/semnificatia-lirica" className={`ghid-s2-subnav-link ${darkTheme ? 'dark-theme' : ''}`}>3. Semnificația lirică</Link>
          </nav>

          <section className="ghid-s2-section">
            <h1 className="ghid-s2-section-title">I. Naratorul și tipurile de perspectivă narativă (text epic)</h1>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">1. Delimitări teoretice</h2>
              <p className="ghid-s2-text">
                Naratorul reprezintă instanța care relatează evenimentele într-un text epic. El nu trebuie confundat cu autorul real, deoarece naratorul este o voce construită în interiorul operei literare.
              </p>
              <p className="ghid-s2-text">
                În analiza narativă, identificarea tipului de narator presupune observarea a trei aspecte esențiale:
              </p>
              <ul className="ghid-s2-list">
                <li>persoana narativă</li>
                <li>gradul de implicare în acțiune</li>
                <li>nivelul de cunoaștere a evenimentelor</li>
              </ul>
              <p className="ghid-s2-text">
                Aceste elemente determină perspectiva narativă și modul în care cititorul are acces la universul ficțional.
              </p>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">2. Clasificarea naratorului</h2>
              <p className="ghid-s2-label">A. În funcție de persoana narativă</p>
              <p className="ghid-s2-text"><strong>Narator la persoana I (subiectiv)</strong></p>
              <p className="ghid-s2-text">Caracteristici:</p>
              <ul className="ghid-s2-list">
                <li>folosește verbe și pronume la persoana I</li>
                <li>este implicat direct în acțiune</li>
                <li>exprimă sentimente, impresii, reflecții</li>
              </ul>
              <p className="ghid-s2-text">
                Perspectiva este internă, iar relatarea are caracter confesiv sau memorialistic. Cititorul are acces direct la trăirile naratorului, însă informația poate fi limitată sau subiectivă.
              </p>
              <p className="ghid-s2-text"><strong>Narator la persoana a III-a (obiectiv)</strong></p>
              <p className="ghid-s2-text">Caracteristici:</p>
              <ul className="ghid-s2-list">
                <li>folosește verbe la persoana a III-a</li>
                <li>prezintă faptele din exterior</li>
                <li>poate fi omniscient sau limitat</li>
              </ul>
              <p className="ghid-s2-text">
                Perspectiva este, de regulă, externă, iar relatarea sugerează detașare și obiectivitate.
              </p>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">3. În funcție de gradul de cunoaștere</h2>
              <p className="ghid-s2-text"><strong>Narator omniscient</strong></p>
              <p className="ghid-s2-text">Cunoaște: gândurile personajelor, trecutul și viitorul acestora, motivațiile ascunse. Este specific prozei tradiționale (realism, roman obiectiv).</p>
              <p className="ghid-s2-text"><strong>Narator limitat</strong></p>
              <p className="ghid-s2-text">Relatează din perspectiva unui singur personaj sau are acces restrâns la informație. Caracteristic prozei moderne.</p>
              <p className="ghid-s2-text"><strong>Narator martor</strong></p>
              <p className="ghid-s2-text">Participă la acțiune, dar nu este personaj principal. Oferă o perspectivă parțială.</p>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">4. Modalități de identificare în text</h2>
              <p className="ghid-s2-text">Identificarea tipului de narator presupune analiza următoarelor elemente:</p>
              <ul className="ghid-s2-list">
                <li>pronume și forme verbale</li>
                <li>accesul la gândurile personajelor</li>
                <li>intervenții explicative</li>
                <li>comentarii sau judecăți de valoare</li>
              </ul>
              <p className="ghid-s2-text">
                Prezența exprimărilor precum „își spunea în sinea lui” indică omnisciența. Confesiunea directă sugerează narator subiectiv.
              </p>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">5. Importanța perspectivei narative</h2>
              <p className="ghid-s2-text">Perspectiva determină:</p>
              <ul className="ghid-s2-list">
                <li>gradul de implicare emoțională</li>
                <li>nivelul de obiectivitate</li>
                <li>structura informației</li>
                <li>modul de construire a personajelor</li>
              </ul>
              <p className="ghid-s2-text">
                În romanul realist, perspectiva omniscientă creează impresia de veridicitate. În romanul modern, perspectiva limitată accentuează relativismul și fragmentarea realității.
              </p>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">6. Model de redactare coerent</h2>
              <p className="ghid-s2-model">
                Naratorul este obiectiv, iar perspectiva narativă este externă. Relatarea la persoana a III-a, evidențiată prin formele verbale specifice, sugerează detașarea instanței narative față de evenimente. Prin accesul la universul interior al personajelor, naratorul capătă statut omniscient, contribuind la conturarea unei imagini complete asupra acțiunii.
              </p>
            </div>
          </section>

          <div className="ghid-s2-cta">
            <button type="button" className={`ghid-s2-next-btn ${darkTheme ? 'dark-theme' : ''}`} onClick={() => navigate('/subiecte/ghid-subiect-2/notatiile-autorului')}>
              Următorul →
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

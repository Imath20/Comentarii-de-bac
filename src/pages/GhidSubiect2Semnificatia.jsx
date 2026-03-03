import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../assets/Layout';
import '../styles/style.scss';

export default function GhidSubiect2Semnificatia() {
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
            <span className="ghid-s2-breadcrumb-current">Semnificația lirică</span>
          </nav>
          <nav className="ghid-s2-subnav" aria-label="Alte secțiuni">
            <Link to="/subiecte/ghid-subiect-2/naratorul" className={`ghid-s2-subnav-link ${darkTheme ? 'dark-theme' : ''}`}>1. Naratorul</Link>
            <Link to="/subiecte/ghid-subiect-2/notatiile-autorului" className={`ghid-s2-subnav-link ${darkTheme ? 'dark-theme' : ''}`}>2. Notațiile autorului</Link>
          </nav>

          <section className="ghid-s2-section">
            <h1 className="ghid-s2-section-title">III. Semnificația textului liric</h1>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">1. Delimitare conceptuală</h2>
              <p className="ghid-s2-text">
                Semnificația unui text liric presupune identificarea ideii centrale și a mesajului transmis prin intermediul imaginilor artistice și al figurilor de stil.
              </p>
              <p className="ghid-s2-text">Textul liric se caracterizează prin:</p>
              <ul className="ghid-s2-list">
                <li>prezența eului liric</li>
                <li>exprimarea directă a sentimentelor</li>
                <li>subiectivitate</li>
                <li>limbaj artistic</li>
              </ul>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">2. Elemente de analizat</h2>
              <p className="ghid-s2-text">Pentru stabilirea semnificației se au în vedere:</p>
              <ul className="ghid-s2-list">
                <li>tema</li>
                <li>motivele literare</li>
                <li>atmosfera</li>
                <li>imaginile artistice</li>
                <li>figurile de stil</li>
                <li>câmpurile semantice dominante</li>
              </ul>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">3. Tema și mesajul</h2>
              <p className="ghid-s2-text">
                Tema reprezintă aspectul general abordat (iubirea, natura, condiția umană, timpul, moartea etc.).
              </p>
              <p className="ghid-s2-text">
                Mesajul este ideea profundă care rezultă din asocierea imaginilor poetice.
              </p>
              <p className="ghid-s2-text">Atmosfera poate fi: elegiacă, melancolică, contemplativă, dramatică, solemnă.</p>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">4. Mecanismul construirii semnificației</h2>
              <p className="ghid-s2-text">Semnificația rezultă din:</p>
              <ul className="ghid-s2-list">
                <li>relația dintre imagini</li>
                <li>opoziții simbolice</li>
                <li>repetiții</li>
                <li>sugestii sonore</li>
                <li>simboluri</li>
              </ul>
              <p className="ghid-s2-text">
                În lirica simbolistă, semnificația este sugerată indirect. În lirica romantică, accentul cade pe intensitatea trăirii. În lirica modernă, mesajul poate fi ambiguu și deschis interpretării.
              </p>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">5. Model de redactare coerent</h2>
              <p className="ghid-s2-model">
                Textul liric valorifică tema …, exprimând în mod direct stările eului liric. Atmosfera este …, configurată prin imagini artistice și figuri de stil relevante. Asocierea elementelor simbolice sugerează mesajul …, evidențiind o viziune subiectivă asupra existenței.
              </p>
            </div>
          </section>

          <div className="ghid-s2-cta">
            <button type="button" className={`ghid-s2-next-btn ${darkTheme ? 'dark-theme' : ''}`} onClick={() => navigate('/subiecte/ghid-subiect-2')}>
              Următorul →
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

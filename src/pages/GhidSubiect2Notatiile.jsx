import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../assets/Layout';
import '../styles/style.scss';

export default function GhidSubiect2Notatiile() {
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
            <span className="ghid-s2-breadcrumb-current">Notațiile autorului</span>
          </nav>
          <nav className="ghid-s2-subnav" aria-label="Alte secțiuni">
            <Link to="/subiecte/ghid-subiect-2/naratorul" className={`ghid-s2-subnav-link ${darkTheme ? 'dark-theme' : ''}`}>1. Naratorul</Link>
            <Link to="/subiecte/ghid-subiect-2/semnificatia-lirica" className={`ghid-s2-subnav-link ${darkTheme ? 'dark-theme' : ''}`}>3. Semnificația lirică</Link>
          </nav>

          <section className="ghid-s2-section">
            <h1 className="ghid-s2-section-title">II. Rolul notațiilor autorului (text dramatic)</h1>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">1. Definire</h2>
              <p className="ghid-s2-text">
                Notațiile autorului (indicațiile scenice) sunt intervenții explicative inserate în textul dramatic, având rol orientativ pentru reprezentarea scenică.
              </p>
              <p className="ghid-s2-text">
                Acestea nu fac parte din dialog, ci completează structura dramatică.
              </p>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">2. Tipuri de informații oferite</h2>
              <p className="ghid-s2-text">Notațiile pot preciza:</p>
              <ul className="ghid-s2-list">
                <li>decorul</li>
                <li>timpul acțiunii</li>
                <li>mișcarea scenică</li>
                <li>gesturile personajelor</li>
                <li>tonul replicilor</li>
                <li>starea emoțională</li>
                <li>elemente de recuzită</li>
              </ul>
              <p className="ghid-s2-text">Prin urmare, ele au o funcție descriptivă și interpretativă.</p>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">3. Roluri esențiale</h2>
              <p className="ghid-s2-text"><strong>Rol structural.</strong> Organizează acțiunea dramatică și clarifică situațiile scenice.</p>
              <p className="ghid-s2-text"><strong>Rol atmosferic.</strong> Contribuie la construirea cadrului și la sugerarea tensiunii dramatice.</p>
              <p className="ghid-s2-text"><strong>Rol caracterizator.</strong> Gesturile, mimica sau tonul indicat dezvăluie trăsături de caracter.</p>
              <p className="ghid-s2-text"><strong>Rol interpretativ.</strong> Orientează lectura și montarea scenică.</p>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">4. Particularități</h2>
              <p className="ghid-s2-text">
                Textul dramatic este destinat reprezentării. Notațiile autorului compensează lipsa naratorului, oferind informațiile necesare înțelegerii situației.
              </p>
              <p className="ghid-s2-text">
                În absența acestora, dialogul ar deveni ambiguu sau incomplet.
              </p>
            </div>

            <div className="ghid-s2-block">
              <h2 className="ghid-s2-block-title">5. Model de redactare coerent</h2>
              <p className="ghid-s2-model">
                Notațiile autorului au rolul de a completa dialogul prin precizări referitoare la decor, mișcare scenică și tonalitatea replicilor. Ele contribuie la conturarea atmosferei și la caracterizarea indirectă a personajelor, orientând atât interpretarea scenică, cât și receptarea textului dramatic.
              </p>
            </div>
          </section>

          <div className="ghid-s2-cta">
            <button type="button" className={`ghid-s2-next-btn ${darkTheme ? 'dark-theme' : ''}`} onClick={() => navigate('/subiecte/ghid-subiect-2/semnificatia-lirica')}>
              Următorul →
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

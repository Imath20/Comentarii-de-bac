import React, { useEffect, useState } from 'react';
import Navbar from '../assets/Navbar';
import Footer from '../assets/Footer';
import ScriitoriHoraCanvas from '../assets/ScriitoriHoraCanvas';
import '../styles/style.scss';

const scriitoriList = [
  {
    nume: 'Ion Creangă',
    date: '1837 – 1889',
    img: '/public/scriitori/creanga_ion.png',
    color: 'rgba(255,179,71,0.82)',
  },
  {
    nume: 'Mihai Eminescu',
    date: '1850 – 1889',
    img: '/public/scriitori/eminescu_mihai.png',
    color: 'rgba(122,58,0,0.82)',
  },
  {
    nume: 'I.L. Caragiale',
    date: '1852 – 1912',
    img: '/public/scriitori/il-caragiale.png',
    color: 'rgba(255,179,71,0.82)',
  },
  {
    nume: 'Ioan Slavici',
    date: '1848 – 1925',
    img: '/public/scriitori/ioan_slavici.png',
    color: 'rgba(122,58,0,0.82)',
  },
  {
    nume: 'Liviu Rebreanu',
    date: '1885 – 1944',
    img: '/public/scriitori/liviu_rebreanu_nou.png',
    color: 'rgba(255,179,71,0.82)',
  },
  {
    nume: 'George Călinescu',
    date: '1899 – 1965',
    img: '/public/scriitori/george_calinescu.png',
    color: 'rgba(255,179,71,0.82)',
  },
];

const opereList = [
  {
    titlu: 'Moara cu noroc',
    autor: 'Ioan Slavici',
    data: 'Redactare: 1880',
    img: '/public/opere/moara-cu-noroc.png',
  },
  {
    titlu: 'Ion',
    autor: 'Liviu Rebreanu',
    data: 'Redactare: 1920',
    img: '/public/opere/Ion.png',
  },
  {
    titlu: 'O scrisoare pierdută',
    autor: 'I.L. Caragiale',
    data: 'Redactare: 1884',
    img: '/public/opere/scrisoare-pierduta.png',
  },
  {
    titlu: 'Luceafărul',
    autor: 'Mihai Eminescu',
    data: 'Redactare: 1883',
    img: '/public/opere/Luceafarul.png',
  },
  {
    titlu: 'Harap-Alb',
    autor: 'Ion Creangă',
    data: 'Redactare: 1877',
    img: '/public/opere/Harap-Alb.png',
  },
  {
    titlu: 'Enigma Otiliei',
    autor: 'George Călinescu',
    data: 'Redactare: 1938',
    img: '/public/opere/enigma-otiliei.png',
  },
];

function getScriitorKey(nume) {
  return nume
    .toLowerCase()
    .replace(/ă/g, 'a').replace(/â/g, 'a').replace(/î/g, 'i').replace(/ș/g, 's').replace(/ş/g, 's').replace(/ț/g, 't').replace(/ţ/g, 't')
    .replace(/[^a-z0-9 ]/g, '')
    .split(' ')[1] // prenumele (ex: Mihai Eminescu -> eminescu)
    || nume.toLowerCase();
}

const Index = () => {
  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const [scrolled, setScrolled] = useState(false);
  const cardSize = 320;

  // Culoare bandă tematică
  const bandaColor = darkTheme ? 'rgba(26,13,0,0.82)' : 'rgba(255,179,71,0.82)';

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
    <div className="page-wrapper">
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled} />
      <main className="main-content">
        <div className="page-hero">
          <h1 className="page-title">{
            'Comentarii de BAC'.split(' ').map((word, wi) => (
              <span className="page-title-word" key={wi}>
                {word.split('').map((l, i) => <span key={i}>{l}</span>)}
              </span>
            ))
          }</h1>
          <p className="page-desc">Platforma ta pentru comentarii, resurse și inspirații de BAC.</p>
          <ScriitoriHoraCanvas />
        </div>
      </main>
      <section className={`index-welcome-section ${darkTheme ? 'dark-theme' : ''}`}>
        <h2 className={`index-welcome-title ${darkTheme ? 'dark-theme' : ''}`}>Bine ați venit !</h2>
        <p className={`index-welcome-text ${darkTheme ? 'dark-theme' : ''}`}>
            pe platforma <b>Comentarii de BAC</b><br /><br />
           Aici găsești tot ce ai nevoie pentru a te pregăti eficient la limba și literatura română: comentarii detaliate, rezumate, modele de subiecte, resurse pentru fiecare scriitor important și explicații pe înțelesul tuturor. Indiferent dacă vrei să aprofundezi operele literare, să recapitulezi rapid sau să descoperi perspective noi, ai la dispoziție materiale structurate, moderne și ușor de parcurs.<br /><br />
           Platforma este gândită să te ajute să înveți mai ușor, să-ți organizezi timpul și să ai încredere la examen.
        </p>
        <div className={`index-welcome-subtitle ${darkTheme ? 'dark-theme' : ''}`}>
          Succes la BAC!
        </div>
      </section>
      <section className={`index-section ${darkTheme ? 'dark-theme' : ''}`}>
        <h2 className={`index-section-title ${darkTheme ? 'dark-theme' : ''}`}>Opere</h2>
        <div className="index-opere-grid">
          {opereList.map((opera, idx) => (
            <div
              key={opera.titlu}
              className={`index-opera-card ${darkTheme ? 'dark-theme' : ''}`}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.055)';
                e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(60,40,20,0.22)';
                e.currentTarget.style.zIndex = 2;
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 24px 0 rgba(124,79,43,0.13)';
                e.currentTarget.style.zIndex = 1;
              }}
            >
              <img
                src={opera.img}
                alt={opera.titlu}
                className={darkTheme ? 'dark-theme' : ''}
              />
              {/* Gradient overlay for readability */}
              <div className={`index-opera-overlay ${darkTheme ? 'dark-theme' : ''}`} />
              {/* Content overlay */}
              <div className="index-opera-content">
                <div className="index-opera-title">{opera.titlu}</div>
                <div className="index-opera-author">{opera.autor}</div>
                <div className={`index-opera-date ${darkTheme ? 'dark-theme' : ''}`}>{opera.data.replace('Redactare: ', '')}</div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => window.location.href = '/opere'}
          className={`index-primary-button ${darkTheme ? 'dark-theme' : ''}`}
          onMouseOver={e => {
            e.currentTarget.style.background = darkTheme ? 'rgba(80,40,0,0.98)' : '#ffd591';
            e.currentTarget.style.boxShadow = '0 4px 24px 0 rgba(124,79,43,0.18)';
            e.currentTarget.style.transform = 'scale(1.045)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = darkTheme ? 'rgba(47,24,0,0.92)' : 'rgba(255,179,71,0.92)';
            e.currentTarget.style.boxShadow = '0 2px 16px 0 rgba(124, 79, 43, 0.10)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Vezi toate operele
        </button>
      </section>
      <section className={`index-section ${darkTheme ? 'dark-theme' : ''}`}>
        <h2 className={`index-section-title ${darkTheme ? 'dark-theme' : ''}`}>Scriitori</h2>
        <div className="index-scriitori-grid">
          {scriitoriList.map((scriitor, idx) => {
            const key = getScriitorKey(scriitor.nume);
            return (
              <a
                key={scriitor.nume}
                href={`/scriitor?name=${key}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  className={`index-scriitor-card ${darkTheme ? 'dark-theme' : ''}`}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'scale(1.045)';
                    e.currentTarget.style.zIndex = 2;
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.zIndex = 1;
                  }}
                >
                  <img
                    src={scriitor.img}
                    alt={scriitor.nume}
                  />
                  <div className={`index-scriitor-info ${darkTheme ? 'dark-theme' : ''}`}>
                    <div>{scriitor.nume}</div>
                    <div className="index-scriitor-dates">{scriitor.date}</div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
        <button
          onClick={() => window.location.href = '/scriitori'}
          className={`index-primary-button ${darkTheme ? 'dark-theme' : ''}`}
          onMouseOver={e => {
            e.currentTarget.style.background = darkTheme ? 'rgba(80,40,0,0.98)' : '#ffd591';
            e.currentTarget.style.boxShadow = '0 4px 24px 0 rgba(124,79,43,0.18)';
            e.currentTarget.style.transform = 'scale(1.045)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = darkTheme ? 'rgba(47,24,0,0.92)' : 'rgba(255,179,71,0.92)';
            e.currentTarget.style.boxShadow = '0 2px 16px 0 rgba(124, 79, 43, 0.10)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Vezi toți scriitorii
        </button>
      </section>
      <section className={`index-section ${darkTheme ? 'dark-theme' : ''}`}>
        <h2 className={`index-section-title ${darkTheme ? 'dark-theme' : ''}`}>Subiecte</h2>
        <div className="index-subiecte-grid">
          {[
            {
              nr: 'I',
              titlu: 'Subiectul 1',
              componente: [
                'Text la prima vedere',
                'Cerinte de înțelegere și analiză',
                'Argumentare pe baza textului'
              ],
              link: '/subiecte#subiectul1',
            },
            {
              nr: 'II',
              titlu: 'Subiectul 2',
              componente: [
                'Eseu structurat',
                'Temă literară sau tip de text',
                'Exemple din opere studiate'
              ],
              link: '/subiecte#subiectul2',
            },
            {
              nr: 'III',
              titlu: 'Subiectul 3',
              componente: [
                'Eseu argumentativ',
                'Opere literare la alegere',
                'Structură liberă, argumentare personală'
              ],
              link: '/subiecte#subiectul3',
            },
          ].map((sub, idx) => (
            <div
              key={sub.nr}
              className={`index-subiect-card ${darkTheme ? 'dark-theme' : ''}`}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.045)';
                e.currentTarget.style.zIndex = 2;
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.zIndex = 1;
              }}
            >
              <div className={`index-subiect-number ${darkTheme ? 'dark-theme' : ''}`}>{sub.nr}</div>
              <div className={`index-subiect-title ${darkTheme ? 'dark-theme' : ''}`}>{sub.titlu}</div>
              <ul className={`index-subiect-list ${darkTheme ? 'dark-theme' : ''}`}>
                {sub.componente.map((c, i) => (
                  <li key={i}>
                    <span className={`bullet-point ${darkTheme ? 'dark-theme' : ''}`}>&#8226;</span>
                    <span className="component-text">{c}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={e => { e.stopPropagation(); window.location.href = sub.link; }}
                className={`index-subiect-button ${darkTheme ? 'dark-theme' : ''}`}
                onMouseOver={e => {
                  e.currentTarget.style.background = darkTheme ? '#ffd591' : '#ffd591';
                  e.currentTarget.style.transform = 'scale(1.07)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = darkTheme ? 'rgba(255,179,71,0.82)' : 'rgba(255,179,71,0.92)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Vezi cerințele
              </button>
            </div>
          ))}
        </div>
        <div className="index-button-container">
          <button
            onClick={() => window.location.href = '/subiecte'}
            className={`index-secondary-button ${darkTheme ? 'dark-theme' : ''}`}
            onMouseOver={e => {
              e.currentTarget.style.background = darkTheme ? 'rgba(255,179,71,0.08)' : '#fffbe6';
              e.currentTarget.style.color = darkTheme ? '#1a0d00' : '#7a3a00';
              e.currentTarget.style.transform = 'scale(1.045)';
              e.currentTarget.style.borderColor = darkTheme ? '#fffbe6' : '#ffb347';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = darkTheme ? '#ffd591' : '#7a3a00';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = darkTheme ? '#ffd591' : '#ffb347';
            }}
          >
            Vezi toate subiectele
          </button>
          <button
            onClick={() => window.location.href = '/ai'}
            className={`index-primary-button ${darkTheme ? 'dark-theme' : ''}`}
            onMouseOver={e => {
              e.currentTarget.style.background = darkTheme ? 'rgba(80,40,0,0.98)' : '#ffd591';
              e.currentTarget.style.boxShadow = '0 4px 24px 0 rgba(124,79,43,0.18)';
              e.currentTarget.style.transform = 'scale(1.045)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = darkTheme ? 'rgba(47,24,0,0.92)' : 'rgba(255,179,71,0.92)';
              e.currentTarget.style.boxShadow = '0 2px 16px 0 rgba(124, 79, 43, 0.10)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Rezolvă cu AI
          </button>
        </div>
      </section>
      <section className={`index-section ${darkTheme ? 'dark-theme' : ''}`}>
        <div className={`index-proiecte-container ${darkTheme ? 'dark-theme' : ''}`}>
          <h2 className={`index-proiecte-title ${darkTheme ? 'dark-theme' : ''}`}>Proiecte</h2>
          <div className={`index-proiecte-desc ${darkTheme ? 'dark-theme' : ''}`}>
            Proiectele colegilor noștri – idei creative, teme, prezentări și inițiative deosebite.
          </div>
          <div className="index-proiecte-grid">
            {[
              { titlu: 'Revista BAC+', desc: 'O revistă digitală cu articole, eseuri și creații literare ale elevilor.' },
              { titlu: 'Podcast: BAC la Cafea', desc: 'Discuții relaxate despre subiecte de BAC, cu invitați speciali.' },
              { titlu: 'Prezentare: Eminescu altfel', desc: 'O prezentare interactivă despre viața și opera lui Eminescu.' },
              { titlu: 'Quiz literar', desc: 'Un joc online cu întrebări din literatura română pentru BAC.' },
              { titlu: 'Poster: Curente literare', desc: 'Un poster vizual cu principalele curente literare și autori.' },
              { titlu: 'Video: BAC Explained', desc: 'Clipuri video scurte care explică cerințele de la BAC.' },
              { titlu: 'Infografic: Structura subiectelor', desc: 'Un infografic clar despre structura examenului.' },
              { titlu: 'Blog: Jurnal de BAC', desc: 'Povești, sfaturi și experiențe personale de la elevi.' },
              { titlu: 'Aplicație: Organizator BAC', desc: 'O aplicație web pentru planificarea studiului.' },
              { titlu: 'Galerie: Arta la BAC', desc: 'Galerie cu desene, picturi și colaje inspirate de teme de BAC.' },
            ].map((proj, idx) => {
              const angles = [-7, 4, -3, 6, -5, 5, -4, 7, -2, 3];
              const pinColors = ['#ff595e','#ffca3a','#8ac926','#1982c4','#6a4c93','#f9844a','#43aa8b','#b5838d','#e07a5f','#9d4edd'];
              return (
                <div
                  key={proj.titlu}
                  className="index-proiect-card"
                  style={{ transform: `rotate(${angles[idx]}deg)` }}
                  onMouseOver={e => {
                    e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(60,40,20,0.22)';
                    e.currentTarget.style.transform = `scale(1.07) rotate(${angles[idx]}deg)`;
                    e.currentTarget.style.zIndex = 3;
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.boxShadow = '0 2px 12px 0 rgba(60,40,20,0.13)';
                    e.currentTarget.style.transform = `rotate(${angles[idx]}deg)`;
                    e.currentTarget.style.zIndex = 2;
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 32 32" style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', zIndex: 4 }}>
                    <circle cx="16" cy="16" r="8" fill={pinColors[idx]} stroke="#222" strokeWidth="1.5" />
                    <rect x="14.7" y="20" width="2.6" height="6" rx="1.1" fill="#b08968" stroke="#222" strokeWidth="1" />
                  </svg>
                  <div className="index-proiect-title">{proj.titlu}</div>
                  <div className="index-proiect-desc">{proj.desc}</div>
                </div>
              );
            })}
          </div>
          <div className={`index-proiecte-footer ${darkTheme ? 'dark-theme' : ''}`}>
            <svg width="44" height="14" viewBox="0 0 44 14" style={{ display: 'block' }}>
              <rect x="0" y="4" width="36" height="6" rx="2.5" fill="#fff" stroke="#e0e0e0" strokeWidth="1.2" />
              <rect x="36" y="5.5" width="7" height="3" rx="1.2" fill="#e0e0e0" />
            </svg>
            <svg width="38" height="16" viewBox="0 0 38 16" style={{ display: 'block' }}>
              <rect x="0" y="4" width="28" height="8" rx="3" fill="#1976d2" stroke="#0d305a" strokeWidth="1.2" />
              <rect x="28" y="5.5" width="7" height="5" rx="2" fill="#fff" stroke="#0d305a" strokeWidth="1.2" />
              <rect x="35" y="6.5" width="2.5" height="3" rx="1.1" fill="#222" />
            </svg>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index; 
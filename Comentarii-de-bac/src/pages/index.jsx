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
      <section style={{ width: '100%', maxWidth: 1300, margin: '0 auto', marginTop: '3.5rem', marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{
          fontSize: '2.7rem',
          fontWeight: 900,
          letterSpacing: '0.10em',
          color: darkTheme ? 'rgba(255,255,255,0.95)' : '#4e2e1e',
          marginBottom: '1.1rem',
          textAlign: 'center',
          textShadow: '0 2px 8px rgba(60,40,20,0.10)'
        }}>Bine ați venit !</h2>
        <p style={{
          fontSize: '1.25rem',
          fontWeight: 500,
          color: darkTheme ? 'rgba(255,255,255,0.95)' : '#4e2e1e',
          textAlign: 'center',
          maxWidth: 1200,
          margin: 0,
          textShadow: '0 2px 8px rgba(60,40,20,0.10)',
          lineHeight: 1.7,
        }}>
            pe platforma <b>Comentarii de BAC</b><br /><br />
           Aici găsești tot ce ai nevoie pentru a te pregăti eficient la limba și literatura română: comentarii detaliate, rezumate, modele de subiecte, resurse pentru fiecare scriitor important și explicații pe înțelesul tuturor. Indiferent dacă vrei să aprofundezi operele literare, să recapitulezi rapid sau să descoperi perspective noi, ai la dispoziție materiale structurate, moderne și ușor de parcurs.<br /><br />
           Platforma este gândită să te ajute să înveți mai ușor, să-ți organizezi timpul și să ai încredere la examen.
        </p>
        <div style={{
          marginTop: '1.7rem',
          fontSize: '2.1rem',
          fontWeight: 900,
          color: darkTheme ? 'rgba(255,255,255,0.95)' : '#4e2e1e',
          textAlign: 'center',
          letterSpacing: '0.04em',
          textShadow: '0 2px 8px rgba(60,40,20,0.10)'
        }}>
          Succes la BAC!
        </div>
      </section>
      <section style={{ width: '100%', margin: '0 auto', marginTop: '4rem', marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{
          fontSize: '3.2rem',
          fontWeight: 900,
          letterSpacing: '0.12em',
          color: darkTheme ? 'rgba(255,255,255,0.95)' : '#4e2e1e',
          marginBottom: '2.5rem',
          textAlign: 'center',
          textShadow: '0 2px 8px rgba(60,40,20,0.10)'
        }}>Opere</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2.2rem',
          width: '100%',
          maxWidth: 1300,
          justifyItems: 'center',
          padding: '0 1.5rem',
        }}>
          {opereList.map((opera, idx) => (
            <div
              key={opera.titlu}
              style={{
                width: 400,
                height: 210,
                borderRadius: '1.5rem',
                overflow: 'hidden',
                boxShadow: '0 4px 24px 0 rgba(124,79,43,0.13)',
                background: 'transparent',
                border: 'none',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                transition: 'box-shadow 0.22s cubic-bezier(.4,1.4,.6,1), transform 0.18s cubic-bezier(.4,1.4,.6,1)',
                cursor: 'pointer',
              }}
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
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '1.5rem',
                  display: 'block',
                  filter: darkTheme ? 'brightness(0.92)' : 'brightness(0.98)',
                }}
              />
              {/* Gradient overlay for readability */}
              <div style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                height: '45%',
                background: darkTheme
                  ? 'linear-gradient(0deg, rgba(26,13,0,0.92) 60%, rgba(26,13,0,0.18) 100%)'
                  : 'linear-gradient(0deg, rgba(255,179,71,0.92) 60%, rgba(255,179,71,0.10) 100%)',
                zIndex: 1,
                pointerEvents: 'none',
              }} />
              {/* Content overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                zIndex: 2,
                padding: '1.1em 0 1.1em 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                color: '#fff',
                textShadow: '0 2px 8px rgba(60,40,20,0.18)',
              }}>
                <div style={{
                  fontSize: '1.45rem',
                  fontWeight: 900,
                  fontStyle: 'italic',
                  marginBottom: 6,
                  letterSpacing: '0.04em',
                  textAlign: 'center',
                  lineHeight: 1.13,
                }}>{opera.titlu}</div>
                <div style={{
                  fontSize: '1.05rem',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  opacity: 0.93,
                  marginBottom: 4,
                  textAlign: 'center',
                }}>{opera.autor}</div>
                <div style={{
                  fontSize: '0.98rem',
                  fontWeight: 600,
                  background: darkTheme ? 'rgba(255,255,255,0.13)' : 'rgba(255,255,255,0.22)',
                  color: darkTheme ? '#ffd591' : '#7a3a00',
                  borderRadius: '1.2em',
                  padding: '0.18em 1.1em',
                  marginTop: 4,
                  display: 'inline-block',
                  boxShadow: '0 1px 6px 0 rgba(60,40,20,0.10)',
                  letterSpacing: '0.03em',
                }}>{opera.data.replace('Redactare: ', '')}</div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => window.location.href = '/opere'}
          style={{
            marginTop: '2.7rem',
            padding: '1.1em 2.7em',
            fontSize: '1.25rem',
            fontWeight: 900,
            borderRadius: '2.5em',
            border: 'none',
            background: darkTheme ? 'rgba(47,24,0,0.92)' : 'rgba(255,179,71,0.92)',
            color: '#fff',
            boxShadow: '0 2px 16px 0 rgba(124, 79, 43, 0.10)',
            cursor: 'pointer',
            letterSpacing: '0.04em',
            transition: 'background 0.18s, box-shadow 0.18s, transform 0.18s cubic-bezier(.4,1.4,.6,1)',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
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
      <section style={{ width: '100%', margin: '0 auto', marginTop: '4rem', marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{
          fontSize: '3.2rem',
          fontWeight: 900,
          letterSpacing: '0.12em',
          color: darkTheme ? 'rgba(255,255,255,0.95)' : '#4e2e1e',
          marginBottom: '2.5rem',
          textAlign: 'center',
          textShadow: '0 2px 8px rgba(60,40,20,0.10)'
        }}>Scriitori</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2.5rem',
          width: '100%',
          maxWidth: 1020,
          justifyItems: 'center',
          padding: '0 1.5rem',
        }}>
          {scriitoriList.map((scriitor, idx) => {
            const key = getScriitorKey(scriitor.nume);
            return (
              <a
                key={scriitor.nume}
                href={`/scriitor?name=${key}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  style={{
                    width: cardSize,
                    height: cardSize,
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    boxShadow: '0 4px 24px 0 rgba(124,79,43,0.10)',
                    background: 'transparent',
                    border: 'none',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    transition: 'transform 0.18s cubic-bezier(.4,1.4,.6,1)',
                    cursor: 'pointer',
                  }}
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
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '1.5rem',
                      display: 'block',
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    padding: '0.5em 0 0.3em 0',
                    background: bandaColor,
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: '1.05rem',
                    textAlign: 'center',
                    letterSpacing: '0.04em',
                    textShadow: '0 2px 8px rgba(60,40,20,0.10)',
                    borderBottomLeftRadius: '1.5rem',
                    borderBottomRightRadius: '1.5rem',
                    backdropFilter: 'blur(1.5px)',
                  }}>
                    <div>{scriitor.nume}</div>
                    <div style={{ fontWeight: 500, fontSize: '0.93em', opacity: 0.92 }}>{scriitor.date}</div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
        <button
          onClick={() => window.location.href = '/scriitori'}
          style={{
            marginTop: '2.7rem',
            padding: '1.1em 2.7em',
            fontSize: '1.25rem',
            fontWeight: 900,
            borderRadius: '2.5em',
            border: 'none',
            background: darkTheme ? 'rgba(47,24,0,0.92)' : 'rgba(255,179,71,0.92)',
            color: '#fff',
            boxShadow: '0 2px 16px 0 rgba(124, 79, 43, 0.10)',
            cursor: 'pointer',
            letterSpacing: '0.04em',
            transition: 'background 0.18s, box-shadow 0.18s, transform 0.18s cubic-bezier(.4,1.4,.6,1)',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
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
      <section style={{ width: '100%', margin: '0 auto', marginTop: '4rem', marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{
          fontSize: '3.2rem',
          fontWeight: 900,
          letterSpacing: '0.12em',
          color: darkTheme ? 'rgba(255,255,255,0.95)' : '#4e2e1e',
          marginBottom: '2.5rem',
          textAlign: 'center',
          textShadow: '0 2px 8px rgba(60,40,20,0.10)'
        }}>Subiecte</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2.5rem',
          width: '100%',
          maxWidth: 1020,
          justifyItems: 'center',
          justifyContent: 'center',
          padding: '0 1.5rem',
        }}>
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
              style={{
                width: 320,
                minHeight: 340,
                borderRadius: '1.5rem',
                background: darkTheme ? 'rgba(26,13,0,0.82)' : 'rgba(255,179,71,0.13)',
                boxShadow: '0 4px 24px 0 rgba(124,79,43,0.10)',
                padding: '2.2rem 1.2rem 1.5rem 1.2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                transition: 'transform 0.18s cubic-bezier(.4,1.4,.6,1)',
                cursor: 'pointer',
                minHeight: 340,
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.045)';
                e.currentTarget.style.zIndex = 2;
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.zIndex = 1;
              }}
            >
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: darkTheme ? 'rgba(255,179,71,0.82)' : 'rgba(255,179,71,0.92)',
                color: darkTheme ? '#1a0d00' : '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '2.1rem',
                position: 'absolute',
                top: -32,
                left: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 2px 8px 0 rgba(124,79,43,0.10)',
                border: darkTheme ? '2px solid #fff' : '2px solid #fffbe6',
              }}>{sub.nr}</div>
              <div style={{
                marginTop: 40,
                fontSize: '1.35rem',
                fontWeight: 900,
                color: darkTheme ? 'rgba(255,255,255,0.95)' : '#4e2e1e',
                marginBottom: 12,
                textAlign: 'center',
                letterSpacing: '0.04em',
              }}>{sub.titlu}</div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                marginBottom: 18,
                width: '100%',
                color: darkTheme ? '#fbeec1' : '#7a3a00',
                fontWeight: 500,
                fontSize: '1.05rem',
                textAlign: 'left',
                lineHeight: 1.5,
              }}>
                {sub.componente.map((c, i) => (
                  <li key={i} style={{ marginBottom: 4, paddingLeft: 8, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, top: 0, color: darkTheme ? '#ffb347' : '#7a3a00', fontWeight: 900 }}>&#8226;</span>
                    <span style={{ marginLeft: 18 }}>{c}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={e => { e.stopPropagation(); window.location.href = sub.link; }}
                style={{
                  marginTop: 'auto',
                  padding: '0.6em 1.5em',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  borderRadius: '2em',
                  border: 'none',
                  background: darkTheme ? 'rgba(255,179,71,0.82)' : 'rgba(255,179,71,0.92)',
                  color: darkTheme ? '#1a0d00' : '#fff',
                  boxShadow: '0 2px 8px 0 rgba(124,79,43,0.10)',
                  cursor: 'pointer',
                  letterSpacing: '0.03em',
                  transition: 'background 0.18s, box-shadow 0.18s, transform 0.18s cubic-bezier(.4,1.4,.6,1)',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'block',
                }}
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
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1020,
          marginTop: '2.7rem',
          gap: '0.7rem',
        }}>
          <button
            onClick={() => window.location.href = '/subiecte'}
            style={{
              padding: '1.1em 2.7em',
              fontSize: '1.25rem',
              fontWeight: 900,
              borderRadius: '2.5em',
              border: `2.5px solid ${darkTheme ? '#ffd591' : '#ffb347'}`,
              background: 'transparent',
              color: darkTheme ? '#ffd591' : '#7a3a00',
              boxShadow: 'none',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              transition: 'border 0.18s, color 0.18s, background 0.18s, transform 0.18s cubic-bezier(.4,1.4,.6,1)',
              display: 'block',
              flex: 1,
              maxWidth: 'none',
            }}
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
            style={{
              padding: '1.1em 2.7em',
              fontSize: '1.25rem',
              fontWeight: 900,
              borderRadius: '2.5em',
              border: 'none',
              background: darkTheme ? 'rgba(47,24,0,0.92)' : 'rgba(255,179,71,0.92)',
              color: '#fff',
              boxShadow: '0 2px 16px 0 rgba(124, 79, 43, 0.10)',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              transition: 'background 0.18s, box-shadow 0.18s, transform 0.18s cubic-bezier(.4,1.4,.6,1)',
              display: 'block',
              flex: 1,
              maxWidth: 'none',
            }}
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
      <section
        style={{
          width: '100%',
          margin: '0 auto',
          marginTop: '4rem',
          marginBottom: '4rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 'min(950px, 98vw)',
            height: '420px',
            background: darkTheme ? '#3a2312' : '#a97c50',
            border: darkTheme ? '6px double #2a170a' : '6px double #7a5232',
            boxShadow: '0 8px 48px 0 rgba(60,40,20,0.18)',
            padding: '2.2rem 1.2rem 1.2rem 1.2rem',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <h2
            style={{
              fontSize: '2.1rem',
              fontWeight: 900,
              letterSpacing: '0.12em',
              color: darkTheme ? 'rgba(255,255,255,0.95)' : '#fffbe6',
              marginBottom: '0.5rem',
              textAlign: 'center',
              textShadow: '0 2px 8px rgba(60,40,20,0.10)',
              zIndex: 2,
            }}
          >Proiecte</h2>
          <div
            style={{
              fontSize: '1.01rem',
              fontWeight: 500,
              color: darkTheme ? 'rgba(255,255,255,0.92)' : '#fffbe6',
              textAlign: 'center',
              maxWidth: 500,
              margin: '0 0 0.7rem 0',
              textShadow: '0 2px 8px rgba(60,40,20,0.10)',
              lineHeight: 1.5,
              zIndex: 2,
            }}
          >
            Proiectele colegilor noștri – idei creative, teme, prezentări și inițiative deosebite.
          </div>
          <div
            style={{
              position: 'absolute',
              top: 180,
              left: 0,
              width: '100%',
              height: 220,
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gridTemplateRows: 'repeat(2, 1fr)',
              gap: '18px 28px',
              justifyItems: 'center',
              alignItems: 'center',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
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
                  style={{
                    width: 140,
                    minHeight: 70,
                    background: darkTheme ? '#fbeec1' : '#fffbe6',
                    borderRadius: '0.7rem',
                    boxShadow: '0 2px 12px 0 rgba(60,40,20,0.13)',
                    padding: '0.7rem 0.6rem 0.6rem 0.6rem',
                    position: 'relative',
                    transform: `rotate(${angles[idx]}deg)` ,
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'auto',
                    transition: 'box-shadow 0.18s, transform 0.18s cubic-bezier(.4,1.4,.6,1)',
                  }}
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
                  <div style={{
                    fontWeight: 900,
                    fontSize: '0.99rem',
                    color: '#7a3a00',
                    marginBottom: 4,
                    textAlign: 'center',
                    letterSpacing: '0.02em',
                    lineHeight: 1.1,
                  }}>{proj.titlu}</div>
                  <div style={{
                    fontWeight: 500,
                    fontSize: '0.81rem',
                    color: '#4e2e1e',
                    opacity: 0.92,
                    textAlign: 'center',
                    lineHeight: 1.1,
                  }}>{proj.desc}</div>
                </div>
              );
            })}
          </div>
          <div style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: 24,
            background: darkTheme ? '#6a4322' : '#b88a4a',
            borderTop: darkTheme ? '2px solid #2a170a' : '2px solid #a97c50',
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5,
            boxShadow: '0 2px 8px 0 rgba(60,40,20,0.10)',
            gap: 32,
          }}>
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
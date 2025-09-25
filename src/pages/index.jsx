import React, { useEffect, useState } from 'react';
import Layout from '../assets/Layout';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ScriitoriHoraCanvas from '../assets/ScriitoriHoraCanvas';
import '../styles/style.scss';

const scriitoriList = [
  {
    nume: 'Ion Creangă',
    date: '1837 – 1889',
    img: '/scriitori/creanga_ion.webp',
    color: 'rgba(255,179,71,0.82)',
  },
  {
    nume: 'Mihai Eminescu',
    date: '1850 – 1889',
    img: '/scriitori/eminescu_mihai.webp',
    color: 'rgba(122,58,0,0.82)',
  },
  {
    nume: 'I.L. Caragiale',
    date: '1852 – 1912',
    img: '/scriitori/il-caragiale.webp',
    color: 'rgba(255,179,71,0.82)',
  },
  {
    nume: 'Ioan Slavici',
    date: '1848 – 1925',
    img: '/scriitori/ioan_slavici.webp',
    color: 'rgba(122,58,0,0.82)',
  },
  {
    nume: 'Liviu Rebreanu',
    date: '1885 – 1944',
    img: '/scriitori/liviu_rebreanu_nou.webp',
    color: 'rgba(255,179,71,0.82)',
  },
  {
    nume: 'George Călinescu',
    date: '1899 – 1965',
    img: '/scriitori/george_calinescu.webp',
    color: 'rgba(255,179,71,0.82)',
  },
];

const opereList = [
  {
    titlu: 'Povestea lui Harap-Alb',
    autor: 'Ion Creangă',
    data: 'Redactare: 1877',
    img: '/opere/Harap-Alb.webp',
  },
  {
    titlu: 'Moara cu noroc',
    autor: 'Ioan Slavici',
    data: 'Redactare: 1880',
    img: '/opere/moara-cu-noroc.webp',
  },
  {
    titlu: 'Ion',
    autor: 'Liviu Rebreanu',
    data: 'Redactare: 1920',
    img: '/opere/Ion.webp',
  },
  {
    titlu: 'Enigma Otiliei',
    autor: 'George Călinescu',
    data: 'Redactare: 1938',
    img: '/opere/enigma-otiliei.webp',
  },
  {
    titlu: 'Luceafărul',
    autor: 'Mihai Eminescu',
    data: 'Redactare: 1883',
    img: '/opere/Luceafarul.webp',
  },
  {
    titlu: 'Plumb',
    autor: 'George Bacovia',
    data: 'Redactare: 1916',
    img: '/opere/plumb.webp',
    categorie: 'poezie',
    canonic: true
},
];

// Lista cu primele 6 cărți pentru bibliotecă
const bibliotecaList = [
  {
    titlu: 'Povestea lui Harap-Alb',
    autor: 'Ion Creangă',
    data: 'Redactare: 1877',
    img: '/opere/Harap-Alb.webp',
    categorie: 'basm',
    canonic: true,
    jsonFile: 'harap-alb',
    tip: 'opera'
},
{
    titlu: 'Moara cu noroc',
    autor: 'Ioan Slavici',
    data: 'Redactare: 1880',
    img: '/opere/moara-cu-noroc.webp',
    categorie: 'nuvela',
    canonic: true,
    jsonFile: 'moara-cu-noroc',
    tip: 'opera'
},
{
    titlu: 'Ion',
    autor: 'Liviu Rebreanu',
    data: 'Redactare: 1920',
    img: '/opere/Ion.webp',
    categorie: 'roman',
    romanSubcategorie: 'roman-social',
    canonic: true,
    jsonFile: 'ion',
    tip: 'opera'
},
{
    titlu: 'Enigma Otiliei',
    autor: 'George Călinescu',
    data: 'Redactare: 1938',
    img: '/opere/enigma-otiliei.webp',
    categorie: 'roman',
    romanSubcategorie: 'roman-balzacian',
    canonic: true,
    jsonFile: 'enigma-otiliei',
    tip: 'opera'
},
{
    titlu: 'Luceafărul',
    autor: 'Mihai Eminescu',
    data: 'Redactare: 1883',
    img: '/opere/Luceafarul.webp',
    categorie: 'poezie',
    canonic: true,
    jsonFile: 'luceafarul',
    tip: 'opera'
},
{
    titlu: 'Plumb',
    autor: 'George Bacovia',
    data: 'Redactare: 1916',
    img: '/opere/plumb.webp',
    categorie: 'poezie',
    canonic: true,
    jsonFile: null,
    tip: 'opera',
    poemKey: 'plumb'
},
];

// Lista cu primele 6 videoclipuri
const videoclipuriList = [
  {
    id: '1',
    titlu: 'Ion Creangă - Povestea lui Harap-Alb',
    descriere: 'Povestea lui Harap-Alb',
    videoId: 'RMl6c8B0VvE',
    categorie: 'basm',
    durata: '37:28',
    autor: 'Ion Creangă',
  },
  {
    id: '2',
    titlu: 'Ioan Slavici - Moara cu noroc',
    descriere: 'Moara cu noroc',
    videoId: 'hNYSY47Ze38',
    categorie: 'nuvela',
    durata: '1:45:53',
    autor: 'Ioan Slavici',
  },
  {
    id: '3',
    titlu: 'Liviu Rebreanu - Ion',
    descriere: 'Blestemul Pământului',
    videoId: 'C4eED--KNTQ',
    categorie: 'roman',
    durata: '1:47:49',
    autor: 'Liviu Rebreanu',
  },
  {
    id: '4',
    titlu: 'Liviu Rebreanu - Ion',
    descriere: 'Blestemul Iubirii',
    videoId: 'Aenpo2ipreQ',
    categorie: 'roman',
    durata: '1:35:26',
    autor: 'Liviu Rebreanu',
  },
  {
    id: '5',
    titlu: 'George Călinescu - Enigma Otiliei',
    descriere: 'Enigma Otiliei - Felix si Otilia',
    videoId: '8hUf1le6N4A',
    categorie: 'roman',
    durata: '2:28:29',
    autor: 'George Călinescu',
  },
  {
    id: '6',
    titlu: 'Mihail Sadoveanu - Baltagul',
    descriere: 'Baltagul',
    videoId: 'MWKSkj0cBM8',
    categorie: 'roman',
    durata: '1:42:41',
    autor: 'Mihail Sadoveanu',
  },
];

function getScriitorKey(nume) {
  const normalized = nume
    .toLowerCase()
    .replace(/ă/g, 'a').replace(/â/g, 'a').replace(/î/g, 'i').replace(/ș/g, 's').replace(/ş/g, 's').replace(/ț/g, 't').replace(/ţ/g, 't')
    .replace(/[^a-z0-9 .-]/g, ' ');
  const tokens = normalized.split(/\s+/).filter(Boolean);
  // Prefer the last meaningful token (e.g., 'caragiale' from 'i.l. caragiale')
  for (let i = tokens.length - 1; i >= 0; i--) {
    const t = tokens[i].replace(/\.+/g, '');
    if (t && t.length > 1 && /[a-z0-9]/.test(t)) return t;
  }
  // Fallback to whole normalized string if parsing failed
  return normalized.replace(/\s+/g, '-');
}

function slugify(text) {
  if (!text) return '';
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const Index = () => {
  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const [scrolled, setScrolled] = useState(false);
  const [showProiecteModal, setShowProiecteModal] = useState(false);
  const [presentation, setPresentation] = useState(null); // { title, url, type, rawUrl }
  const [pdfFallbackUrl, setPdfFallbackUrl] = useState(null);
  const [showPresentationModal, setShowPresentationModal] = useState(false);
  const cardSize = 320;
  const navigate = useNavigate();
  const location = useLocation();

  // Culoare bandă tematică
  const bandaColor = darkTheme ? 'rgba(26,13,0,0.82)' : 'rgba(255,179,71,0.82)';

  // Theme application is centralized in Layout; avoid duplicating body class/localStorage here

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const getEmbedUrl = (rawUrl, type) => {
    if (!rawUrl) return '';
    try {
      // sanitize accidental quotes/spaces
      const cleanedRawUrl = String(rawUrl).trim().replace(/^"|"$/g, '');
      // Support both absolute and relative URLs
      const url = new URL(cleanedRawUrl, window.location.origin);
      const isLocalhost = /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname) || window.location.port === '5173';
      const isHttps = window.location.protocol === 'https:';
      // Google Slides: support both normal and published links
      if (url.hostname.includes('docs.google.com') && url.pathname.includes('/presentation')) {
        // If it's already a published link, keep it (works with /pub and /pubembed)
        if (/\/pub(embed)?/i.test(url.pathname)) {
          // normalize to /pubembed for better iframe controls
          return url.href.replace(/\/pub(\?.*)?$/i, (m) => m.startsWith('/pubembed') ? m : m.replace('/pub', '/pubembed'));
        }
        // Published form uses /d/e/<id>/...
        const published = url.pathname.match(/\/presentation\/d\/e\/([^/]+)/);
        if (published && published[1]) {
          const id = published[1];
          return `https://docs.google.com/presentation/d/e/${id}/embed?start=false&loop=false&delayms=3000`;
        }
        // Standard form uses /d/<id>/...
        const standard = url.pathname.match(/\/presentation\/d\/([^/]+)/);
        if (standard && standard[1]) {
          const id = standard[1];
          return `https://docs.google.com/presentation/d/${id}/embed?start=false&loop=false&delayms=3000`;
        }
        // fallback to naive replacement
        const replaced = url.href.replace(/\/edit.*$/, '/embed').replace(/\/view.*$/, '/embed');
        return replaced;
      }
      // Google Drive file links -> preview (embeddable)
      if (url.hostname.includes('drive.google.com') && url.pathname.includes('/file/')) {
        // Transform /file/d/<id>/view to /file/d/<id>/preview
        const previewHref = url.href
          .replace(/\/view(\?.*)?$/, '/preview')
          .replace(/\/edit(\?.*)?$/, '/preview');
        return previewHref;
      }
      // Direct PPT/PPTX files -> Office viewer
      const isPpt = type === 'ppt' || /\.(ppt|pptx)$/i.test(url.pathname);
      if (isPpt) {
        // Office Viewer needs a publicly accessible HTTPS URL; skip embedding in local/dev
        if (isLocalhost || !isHttps) {
          return '';
        }
        const absoluteHref = url.href;
        return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteHref)}`;
      }
      // Default: return absolute URL
      return url.href;
    } catch {
      // Fallback: best-effort Office viewer for PPT if we couldn't parse the URL
      if (type === 'ppt' || /\.(ppt|pptx)$/i.test(String(rawUrl))) {
        const absolute = `${window.location.origin}${String(rawUrl).startsWith('/') ? '' : '/'}${rawUrl}`;
        return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absolute)}`;
      }
      return rawUrl;
    }
  };

  // Probe for sibling PDF fallback when a PPT is opened locally or cannot be embedded
  useEffect(() => {
    const probePdf = async () => {
      setPdfFallbackUrl(null);
      if (!presentation || presentation.type !== 'ppt') return;
      const raw = presentation.rawUrl || '';
      const pdfUrlCandidate = raw.replace(/\.(pptx?|PPTX?)$/, '.pdf');
      if (!/\.pdf$/i.test(pdfUrlCandidate)) return;
      try {
        const absolute = new URL(pdfUrlCandidate, window.location.origin).href;
        const resp = await fetch(absolute, { method: 'GET', cache: 'no-store' });
        if (resp.ok) {
          setPdfFallbackUrl(absolute);
        }
      } catch {
        setPdfFallbackUrl(null);
      }
    };
    probePdf();
  }, [presentation]);

  return (
    <div className="page-wrapper">
      <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled}>
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
              onClick={() => navigate(`/opera/${slugify(opera.titlu)}`, { state: { opera, from: { pathname: location.pathname, scrollY: window.scrollY } } })}
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
          onClick={() => navigate('/opere')}
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

      {/* Secțiunea Bibliotecă */}
      <section className={`index-section ${darkTheme ? 'dark-theme' : ''}`}>
        <div className={`index-biblioteca-container ${darkTheme ? 'dark-theme' : ''}`}>
          <div className="index-biblioteca-header">
            <h2 className={`index-biblioteca-title ${darkTheme ? 'dark-theme' : ''}`}>Biblioteca</h2>
            <div className={`index-biblioteca-desc ${darkTheme ? 'dark-theme' : ''}`}>
              Opere canonice și non-canonice din literatura română pentru BAC
            </div>
          </div>

          <div className="index-biblioteca-grid">
            {bibliotecaList.map((carte, idx) => (
              <div
                key={`${carte.titlu}-${carte.autor}`}
                className={`index-biblioteca-card ${darkTheme ? 'dark-theme' : ''}`}
                onClick={() => navigate(carte.jsonFile ? `/carte/${carte.jsonFile}` : '/biblioteca', { state: { from: { pathname: location.pathname, scrollY: window.scrollY } } })}
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
                  src={carte.img}
                  alt={carte.titlu}
                  className="index-biblioteca-card-img"
                />
                <div className={`index-biblioteca-card-overlay ${darkTheme ? 'dark-theme' : ''}`} />
                <div className="index-biblioteca-card-content">
                  <div className="index-biblioteca-card-title">{carte.titlu}</div>
                  <div className="index-biblioteca-card-author">{carte.autor}</div>
                  <div className={`index-biblioteca-card-date ${darkTheme ? 'dark-theme' : ''}`}>
                    {carte.data.replace('Redactare: ', '')}
                  </div>
                  <div className={`index-biblioteca-card-category ${darkTheme ? 'dark-theme' : ''}`}>
                    {carte.categorie}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/biblioteca')}
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
            Vezi toată biblioteca
          </button>
        </div>
      </section>
      {/*sectiunea scriitori*/}
      <section className={`index-section ${darkTheme ? 'dark-theme' : ''}`}>
        <h2 className={`index-section-title ${darkTheme ? 'dark-theme' : ''}`}>Scriitori</h2>
        <div className="index-scriitori-grid">
          {scriitoriList.map((scriitor, idx) => {
            const key = getScriitorKey(scriitor.nume);
            return (
              <Link
                key={scriitor.nume}
                to={`/scriitor?name=${key}`}
                state={{ from: { pathname: location.pathname, scrollY: window.scrollY } }}
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
              </Link>
            );
          })}
        </div>
        <button
          onClick={() => navigate('/scriitori')}
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
              link: '/subiecte?tip=1',
            },
            {
              nr: 'II',
              titlu: 'Subiectul 2',
              componente: [
                'Eseu structurat',
                'Temă literară sau tip de text',
                'Exemple din opere studiate'
              ],
              link: '/subiecte?tip=2',
            },
            {
              nr: 'III',
              titlu: 'Subiectul 3',
              componente: [
                'Eseu argumentativ',
                'Opere literare la alegere',
                'Structură liberă, argumentare personală'
              ],
              link: '/subiecte?tip=3',
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
                onClick={e => { e.stopPropagation(); navigate(sub.link); }}
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
            onClick={() => navigate('/subiecte')}
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
            onClick={() => navigate('/ai')}
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

      {/* Secțiunea Videoclipuri */}
      <section className={`index-section ${darkTheme ? 'dark-theme' : ''}`}>
        <div className={`index-videoclipuri-container ${darkTheme ? 'dark-theme' : ''}`}>
          <div className="index-videoclipuri-header">
            <h2 className={`index-videoclipuri-title ${darkTheme ? 'dark-theme' : ''}`}>Videoclipuri</h2>
            <div className={`index-videoclipuri-desc ${darkTheme ? 'dark-theme' : ''}`}>
              Filme ale operelelor românești pentru BAC
            </div>
          </div>

          <div className="index-videoclipuri-grid">
            {videoclipuriList.map((film) => (
              <div
                key={film.id}
                className={`index-videoclipuri-card ${darkTheme ? 'dark-theme' : 'light-theme'}`}
                onClick={() => navigate('/videoclipuri')}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(60,40,20,0.22)';
                  e.currentTarget.style.zIndex = 2;
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 24px 0 rgba(124,79,43,0.13)';
                  e.currentTarget.style.zIndex = 1;
                }}
              >
                <div className="index-videoclipuri-video-container">
                  <iframe
                    src={`https://www.youtube.com/embed/${film.videoId}`}
                    title={film.titlu}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="index-videoclipuri-iframe"
                  ></iframe>
                </div>
                <div className={`index-videoclipuri-card-info ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
                  <h3 className="index-videoclipuri-card-title">{film.titlu}</h3>
                  <p className="index-videoclipuri-card-descriere">{film.descriere}</p>
                  <div className="index-videoclipuri-card-meta">
                    <span className="index-videoclipuri-card-durata">{film.durata}</span>
                    <span className="index-videoclipuri-card-autor">{film.autor}</span>
                    <span className="index-videoclipuri-card-categorie">
                      {film.categorie}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/videoclipuri')}
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
            Vezi toate videoclipurile
          </button>
        </div>
      </section>

      <section className={`index-section ${darkTheme ? 'dark-theme' : ''}`}>
        <div className={`index-proiecte-container ${darkTheme ? 'dark-theme' : ''}`}>
          <div className="index-proiecte-header">
            <h2 className={`index-proiecte-title ${darkTheme ? 'dark-theme' : ''}`}>Proiecte</h2>
            <button
              className={`index-proiecte-fullscreen-btn ${darkTheme ? 'dark-theme' : ''}`}
              onClick={() => setShowProiecteModal(true)}
              title="Vezi tabla completă"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          </div>
          <div className={`index-proiecte-desc ${darkTheme ? 'dark-theme' : ''}`}>
            Proiectele colegilor noștri – idei creative, teme, prezentări și inițiative deosebite.
          </div>
          <div className="index-proiecte-grid">
            {[
              { titlu: 'Romantismul', desc: 'Site dedicat studiului romantismului, cu definitii, exemple si galerie foto', url: 'https://romantismul.vercel.app/', type: 'site' },
              { titlu: 'Simbolismul', desc: 'Site dedicat înţelegerii simbolismului, cu definiţii, poze şi muzică', url: 'https://simbolism.vercel.app/', type: 'site' },
              { titlu: 'Harap-Alb', desc: 'Site despre drumul lui Harap-Alb spre Împăratul Roşu', url: 'https://stefanarctic.github.io/Drumul_Catre_Imparatul_Ros/', type: 'site' },
              { titlu: 'Originile Române', desc: 'Prezentare despre Originile Române', url: 'https://docs.google.com/presentation/d/e/2PACX-1vQ_XsLRNJ8Plz_pBupcGCCAY43ZS4AYZccbiQZZGmejOhxNAPXkbmVgB4hE3qyXKw/pubembed?start=false&loop=false&delayms=3000', type: 'ppt' },
              { titlu: 'Revoluţia de la 1848', desc: 'Prezentare despre Revoluţia de la 1848', url: 'https://docs.google.com/presentation/d/e/2PACX-1vRJ9Wy8bKIYYKx0jHxIFRglwRUWJ-8iBEWVfhJhH541JeGKXdQnR3wS_k8shEm9_g/pubembed?start=false&loop=false&delayms=3000', type: 'ppt' },
              { titlu: 'Literatura română', desc: 'Prezentare despre Literatura Română', url: 'https://docs.google.com/presentation/d/e/2PACX-1vTeTsk18haztUvj0PjIDT8rFKME7A7-Wkgmd40DlLbAkZhrCCNVg_oNKxNj0j30Eg/pubembed?start=false&loop=false&delayms=3000', type: 'ppt' },
              { titlu: 'Infografic: Structura subiectelor', desc: 'Un infografic clar despre structura examenului.' },
              { titlu: 'Blog: Jurnal de BAC', desc: 'Povești, sfaturi și experiențe personale de la elevi.' },
              { titlu: 'Aplicație: Organizator BAC', desc: 'O aplicație web pentru planificarea studiului.' },
              { titlu: 'Galerie: Arta la BAC', desc: 'Galerie cu desene, picturi și colaje inspirate de teme de BAC.' },
            ].map((proj, idx) => {
              const angles = [-7, 4, -3, 6, -5, 5, -4, 7, -2, 3];
              const pinColors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#f9844a', '#43aa8b', '#b5838d', '#e07a5f', '#9d4edd'];
              return (
                <div
                  key={proj.titlu}
                  className="index-proiect-card"
                  style={{ transform: `rotate(${angles[idx]}deg)` }}
                  onClick={() => {
                    if (proj.url) {
                      const isGoogleSlides = /docs\.google\.com\/.+\/presentation/.test(proj.url || '');
                      const isPptFile = /\.(ppt|pptx)$/i.test((() => { try { return new URL(proj.url).pathname; } catch { return ''; } })());
                      if (proj.type === 'ppt' || isPptFile || isGoogleSlides) {
                        setPresentation({ title: proj.titlu, url: getEmbedUrl(proj.url, 'ppt'), type: 'ppt', rawUrl: proj.url });
                        setShowPresentationModal(true);
                      } else {
                        window.open(proj.url, '_blank', 'noopener,noreferrer');
                      }
                    }
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
                  {/* realistic push pin with cork-cast shadow */}
                  <svg width="30" height="36" viewBox="0 0 40 48" style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', zIndex: 4 }}>
                    <defs>
                      <radialGradient id={`pinHeadGrad-${idx}`} cx="50%" cy="40%" r="60%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                        <stop offset="35%" stopColor="rgba(255,255,255,0.6)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
                      </radialGradient>
                      <linearGradient id={`pinNeckGrad-${idx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#d9b38c" />
                        <stop offset="100%" stopColor="#a17852" />
                      </linearGradient>
                      <filter id={`pinShadow-${idx}`} x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="2" stdDeviation="1.3" floodColor="rgba(0,0,0,0.35)" />
                      </filter>
                    </defs>
                    {/* metal needle */}
                    <path d="M20 20 L21 42 L20 46 L19 42 Z" fill="#b0b0b0" stroke="#6b6b6b" strokeWidth="0.6" />
                    {/* neck */}
                    <rect x="18.7" y="22" width="2.6" height="8" rx="1.2" fill={`url(#pinNeckGrad-${idx})`} stroke="#5a3c28" strokeWidth="0.6" />
                    {/* head */}
                    <g filter={`url(#pinShadow-${idx})`}>
                      <circle cx="20" cy="16" r="9" fill={pinColors[idx]} stroke="#2a2a2a" strokeWidth="1" />
                      <circle cx="17" cy="13" r="3.2" fill={`url(#pinHeadGrad-${idx})`} />
                    </g>
                    {/* cast shadow on cork */}
                    <ellipse cx="20" cy="6" rx="10" ry="4" fill="rgba(0,0,0,0.18)" transform="translate(0,24) skewX(-10)" />
                  </svg>
                  <div className="index-proiect-title">{proj.titlu}</div>
                  <div className="index-proiect-desc">{proj.desc}</div>
                </div>
              );
            })}
          </div>
          <div className={`index-proiecte-footer ${darkTheme ? 'dark-theme' : ''}`}>
            {/* slimmer tray markers */}
            <svg width="120" height="25" viewBox="0 0 200 32" style={{ display: 'block' }}>
              {/* chalk */}
              <rect x="12" y="12" width="52" height="6" rx="2" fill="#ffffff" stroke="#dcdcdc" strokeWidth="1" />
              {/* red permanent marker (slimmer) */}
              <rect x="80" y="9" width="84" height="12" rx="6" fill="#f0efe7" stroke="#8a8a8a" strokeWidth="1" />
              <rect x="84" y="10" width="30" height="10" rx="5" fill="#e53935" />
              <rect x="166" y="9" width="18" height="12" rx="3" fill="#e53935" stroke="#9b1f1c" strokeWidth="1" />
              <rect x="186" y="10" width="8" height="10" rx="2.5" fill="#2a2a2a" />
            </svg>
          </div>
        </div>
      </section>

      {/* Modal Proiecte Full Screen */}
      {showProiecteModal && (
        <div className={`index-proiecte-modal-overlay ${darkTheme ? 'dark-theme' : ''}`} onClick={() => setShowProiecteModal(false)}>
          <div className={`index-proiecte-modal ${darkTheme ? 'dark-theme' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className={`index-proiecte-modal-header ${darkTheme ? 'dark-theme' : ''}`}>
              <h3 className={`index-proiecte-modal-title ${darkTheme ? 'dark-theme' : ''}`}>Proiectele colegilor</h3>
              <button
                className={`index-proiecte-modal-close ${darkTheme ? 'dark-theme' : ''}`}
                onClick={() => setShowProiecteModal(false)}
                title="Minimizează"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                </svg>
              </button>
            </div>

            <div className={`index-proiecte-modal-board ${darkTheme ? 'dark-theme' : ''}`}>
              <div className="index-proiecte-modal-grid">
                {[
                  { titlu: 'Romantismul', desc: 'Site dedicat studiului romantismului, cu definiţii, exemple şi galerie foto', url: 'https://romantismul.vercel.app/', type: 'site' },
                  { titlu: 'Simbolismul', desc: 'Site dedicat înţelegerii simbolismului, cu definiţii, poze şi muzică', url: 'https://simbolism.vercel.app/', type: 'site' },
                  { titlu: 'Harap-Alb', desc: 'Site despre drumul lui Harap-Alb spre Împăratul Roşu', url: 'https://stefanarctic.github.io/Drumul_Catre_Imparatul_Ros/', type: 'site' },
                  { titlu: 'Originile Române', desc: 'Prezentare despre Originile Române', url: 'https://docs.google.com/presentation/d/e/2PACX-1vQ_XsLRNJ8Plz_pBupcGCCAY43ZS4AYZccbiQZZGmejOhxNAPXkbmVgB4hE3qyXKw/pubembed?start=false&loop=false&delayms=3000', type: 'ppt' },
                  { titlu: 'Revoluţia de la 1848', desc: 'Prezentare despre Revoluţia de la 1848', url: 'https://docs.google.com/presentation/d/e/2PACX-1vRJ9Wy8bKIYYKx0jHxIFRglwRUWJ-8iBEWVfhJhH541JeGKXdQnR3wS_k8shEm9_g/pubembed?start=false&loop=false&delayms=3000', type: 'ppt' },
                  { titlu: 'Literatura română', desc: 'Prezentare despre Literatura Română', url: 'https://docs.google.com/presentation/d/e/2PACX-1vTeTsk18haztUvj0PjIDT8rFKME7A7-Wkgmd40DlLbAkZhrCCNVg_oNKxNj0j30Eg/pubembed?start=false&loop=false&delayms=3000', type: 'ppt' },
                  { titlu: 'Infografic: Structura subiectelor', desc: 'Un infografic clar despre structura examenului.' },
                  { titlu: 'Blog: Jurnal de BAC', desc: 'Povești, sfaturi și experiențe personale de la elevi.' },
                  { titlu: 'Aplicație: Organizator BAC', desc: 'O aplicație web pentru planificarea studiului.' },
                  { titlu: 'Galerie: Arta la BAC', desc: 'Galerie cu desene, picturi și colaje inspirate de teme de BAC.' },
                  { titlu: 'Mapa: Figuri de stil', desc: 'O mapă interactivă cu figuri de stil și exemple.' },
                  { titlu: 'Expo: Portrete de scriitori', desc: 'Expoziție virtuală cu portrete și biografii.' },
                  { titlu: 'Timeline: Curente și epoci', desc: 'Cronologie interactivă a literaturii române.' },
                  { titlu: 'Harta: Literatura pe regiuni', desc: 'Harta literară a României cu autori locali.' },
                  { titlu: 'Broșură: Eseul perfect', desc: 'Ghid complet pentru scrierea eseului de BAC.' },
                  { titlu: 'Mini-enciclopedie BAC', desc: 'Enciclopedie compactă cu termeni literari.' },
                  { titlu: 'Colecție: Eseuri model', desc: 'Colecție de eseuri exemplare pentru BAC.' },
                  { titlu: 'Workshop: Dicție și retorică', desc: 'Workshop-uri practice de dicție.' },
                  { titlu: 'Joc: Cuvinte încrucișate', desc: 'Joc interactiv cu vocabular literar.' },
                  { titlu: 'Seria: BAC în 5 minute', desc: 'Serie de clipuri scurte cu explicații.' },
                  { titlu: 'Studiu de caz: Ion', desc: 'Analiză detaliată a romanului Ion.' },
                  { titlu: 'Panou: Personaje memorabile', desc: 'Panouri cu personaje din literatura română.' },
                  { titlu: 'Set: Fișe de învățare', desc: 'Set complet de fișe pentru fiecare autor.' },
                  { titlu: 'Interviuri: Profii spun', desc: 'Interviuri cu profesori de română.' },
                  { titlu: 'Serată: Literatura vie', desc: 'Serate literare cu recitări și muzică.' },
                  { titlu: 'Template: Structuri de eseu', desc: 'Template-uri pentru diferite tipuri de eseu.' },
                  { titlu: 'Checklist: Înainte de examen', desc: 'Checklist complet pentru ziua de BAC.' },
                  { titlu: 'Mindmap: Tematici majore', desc: 'Mindmap-uri cu tematici literare.' },
                  { titlu: 'Calendar: Plan de recapitulare', desc: 'Calendar personalizat pentru BAC.' },
                  { titlu: 'Carnet: Note și idei', desc: 'Carnet digital pentru notițe literare.' },
                  { titlu: 'Quiz: Curente literare', desc: 'Quiz-uri tematice pe curente literare.' },
                  { titlu: 'Video: Stiluri narative', desc: 'Explicații video despre stiluri narative.' },
                  { titlu: 'Podcast: Autori în dialog', desc: 'Podcast-uri cu discuții despre autori.' },
                  { titlu: 'Galerie: Citate ilustrate', desc: 'Galerie cu citate și ilustrații.' },
                  { titlu: 'Jurnal vizual: BAC journey', desc: 'Jurnal vizual al pregătirii pentru BAC.' }
                ].map((proj, idx) => {
                  const angles = [-7, 4, -3, 6, -5, 5, -4, 7, -2, 3, 2, -6, 5, -4, 3, -2, 1, -5, 6, -3, 4, -1, 2, -2, 3, -3, 1, -1, 2, -2, 4, -4, 5, -5, 6];
                  const pinColors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#f9844a', '#43aa8b', '#b5838d', '#e07a5f', '#9d4edd'];
                  return (
                    <div
                      key={proj.titlu}
                      className="index-proiecte-modal-card"
                      style={{ transform: `rotate(${angles[idx % angles.length]}deg)` }}
                      onClick={() => {
                        if (proj.url) {
                          const isGoogleSlides = /docs\.google\.com\/.+\/presentation/.test(proj.url || '');
                          const isPptFile = /\.(ppt|pptx)$/i.test((() => { try { return new URL(proj.url).pathname; } catch { return ''; } })());
                          if (proj.type === 'ppt' || isPptFile || isGoogleSlides) {
                            setPresentation({ title: proj.titlu, url: getEmbedUrl(proj.url, 'ppt'), type: 'ppt', rawUrl: proj.url });
                            setShowPresentationModal(true);
                          } else {
                            window.open(proj.url, '_blank', 'noopener,noreferrer');
                          }
                        }
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.boxShadow = '0 14px 28px rgba(60,40,20,0.28)';
                        e.currentTarget.style.transform = `scale(1.07) rotate(${angles[idx % angles.length]}deg)`;
                        e.currentTarget.style.zIndex = 3;
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.boxShadow = '0 6px 12px rgba(60,40,20,0.18)';
                        e.currentTarget.style.transform = `rotate(${angles[idx % angles.length]}deg)`;
                        e.currentTarget.style.zIndex = 2;
                      }}
                    >
                      <svg width="30" height="36" viewBox="0 0 40 48" style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', zIndex: 4 }}>
                        <defs>
                          <radialGradient id={`modalPinHeadGrad-${idx}`} cx="50%" cy="40%" r="60%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                            <stop offset="35%" stopColor="rgba(255,255,255,0.6)" />
                            <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
                          </radialGradient>
                          <linearGradient id={`modalPinNeckGrad-${idx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#d9b38c" />
                            <stop offset="100%" stopColor="#a17852" />
                          </linearGradient>
                          <filter id={`modalPinShadow-${idx}`} x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow dx="0" dy="2" stdDeviation="1.3" floodColor="rgba(0,0,0,0.35)" />
                          </filter>
                        </defs>
                        <path d="M20 20 L21 42 L20 46 L19 42 Z" fill="#b0b0b0" stroke="#6b6b6b" strokeWidth="0.6" />
                        <rect x="18.7" y="22" width="2.6" height="8" rx="1.2" fill={`url(#modalPinNeckGrad-${idx})`} stroke="#5a3c28" strokeWidth="0.6" />
                        <g filter={`url(#modalPinShadow-${idx})`}>
                          <circle cx="20" cy="16" r="9" fill={pinColors[idx % pinColors.length]} stroke="#2a2a2a" strokeWidth="1" />
                          <circle cx="17" cy="13" r="3.2" fill={`url(#modalPinHeadGrad-${idx})`} />
                        </g>
                        <ellipse cx="20" cy="6" rx="10" ry="4" fill="rgba(0,0,0,0.18)" transform="translate(0,24) skewX(-10)" />
                      </svg>
                      <div className="index-proiecte-modal-card-title">{proj.titlu}</div>
                      <div className="index-proiecte-modal-card-desc">{proj.desc}</div>
                    </div>
                  );
                })}
              </div>

              <div className={`index-proiecte-modal-footer ${darkTheme ? 'dark-theme' : ''}`}>
                <svg width="140" height="28" viewBox="0 0 200 32" style={{ display: 'block' }}>
                  <rect x="12" y="12" width="52" height="6" rx="2" fill="#ffffff" stroke="#dcdcdc" strokeWidth="1" />
                  <rect x="80" y="9" width="84" height="12" rx="6" fill="#f0efe7" stroke="#8a8a8a" strokeWidth="1" />
                  <rect x="84" y="10" width="30" height="10" rx="5" fill="#e53935" />
                  <rect x="166" y="9" width="18" height="12" rx="3" fill="#e53935" stroke="#9b1f1c" strokeWidth="1" />
                  <rect x="186" y="10" width="8" height="10" rx="2.5" fill="#2a2a2a" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPresentationModal && presentation && (
        <div className={`index-proiecte-modal-overlay ${darkTheme ? 'dark-theme' : ''}`} onClick={() => setShowPresentationModal(false)}>
          <div className={`index-proiecte-modal ${darkTheme ? 'dark-theme' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className={`index-proiecte-modal-header ${darkTheme ? 'dark-theme' : ''}`}>
              <h3 className={`index-proiecte-modal-title ${darkTheme ? 'dark-theme' : ''}`}>{presentation.title}</h3>
              <button
                className={`index-proiecte-modal-close ${darkTheme ? 'dark-theme' : ''}`}
                onClick={() => setShowPresentationModal(false)}
                title="Închide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="index-presentation-frame-wrapper">
              {presentation.url ? (
                <iframe
                  src={presentation.url}
                  title={presentation.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  style={{ width: '100%', height: '85vh', borderRadius: 12 }}
                ></iframe>
              ) : (
                <div style={{
                  width: '100%',
                  height: '70vh',
                  borderRadius: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {pdfFallbackUrl ? (
                    <iframe
                      src={pdfFallbackUrl}
                      title={`${presentation.title} - PDF`}
                      style={{ width: '100%', height: '85vh', borderRadius: 12, background: '#fff' }}
                    />
                  ) : (
                    <>
                      <div style={{ marginBottom: 16, fontSize: 16, opacity: 0.8 }}>
                        Prezentările PowerPoint pot fi integrate doar dintr-un URL public HTTPS.
                      </div>
                      <a
                        href={presentation.rawUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`index-primary-button ${darkTheme ? 'dark-theme' : ''}`}
                      >
                        Descarcă prezentarea
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      </Layout>
    </div>
  );
};

export default Index; 
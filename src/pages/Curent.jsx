import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Layout from '../assets/Layout';
import CURENTE, { curenteById } from '../data/curente';

export default function Curent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [darkTheme, setDarkTheme] = useState(() => document.body.classList.contains('dark-theme'));
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  const curent = useMemo(() => curenteById[id] || null, [id]);

  const renderBlock = (block, idx) => {
    if (!block) return null;
    switch (block.type) {
      case 'text':
        return (
          <p key={`text-${idx}`} className="curent-paragraph">
            {block.content}
          </p>
        );
      case 'subheading':
        return (
          <h4 key={`subheading-${idx}`} className="curent-subheading">
            {block.content}
          </h4>
        );
      case 'list': {
        const listClass = ['curent-list'];
        if (block.style === 'dash') listClass.push('curent-list-dash');
        if (block.style === 'numbered') listClass.push('curent-list-numbered');
        return (
          <div key={`list-${idx}`} className="curent-list-wrapper">
            {block.intro && <p className="curent-list-intro">{block.intro}</p>}
            <ul className={listClass.join(' ')}>
              {(block.items || []).map((item, itemIdx) => {
                if (typeof item === 'string') {
                  return (
                    <li key={`list-${idx}-item-${itemIdx}`}>
                      <span>{item}</span>
                    </li>
                  );
                }
                return (
                  <li key={`list-${idx}-item-${itemIdx}`}>
                    {item.title && <div className="curent-list-item-title">{item.title}</div>}
                    {item.description && (
                      <div className="curent-list-item-description">{item.description}</div>
                    )}
                    {item.subitems && item.subitems.length > 0 && (
                      <ul className="curent-sublist">
                        {item.subitems.map((sub, subIdx) => (
                          <li key={`list-${idx}-item-${itemIdx}-sub-${subIdx}`}>{sub}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      }
      default:
        return null;
    }
  };

  const goBack = () => {
    const y = (location.state && location.state.from && typeof location.state.from.scrollY === 'number') ? location.state.from.scrollY : 0;
    const fromPath = (location.state && location.state.from && location.state.from.pathname) || '/curente';
    const curenteScrollLeft = location.state && typeof location.state.curenteScrollLeft === 'number' ? location.state.curenteScrollLeft : 0;
    navigate(fromPath, { replace: true, state: { restoreScroll: y, restoreCurenteScroll: curenteScrollLeft } });
  };

  const goToScriitor = (slug) => {
    if (!slug) return;
    navigate(`/scriitor?name=${slug}`, { state: { from: { pathname: `/curent/${id}`, scrollY: window.scrollY } } });
  };

  useEffect(() => {
    if (!isImageFullscreen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsImageFullscreen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isImageFullscreen]);

  if (!curent) {
    return (
      <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
        <div className="container" style={{ padding: '40px 16px' }}>
          <button className="scriitor-back-btn-inline" onClick={goBack} title="Înapoi">Înapoi</button>
          <h1>Curentul nu a fost găsit</h1>
        </div>
      </Layout>
    );
  }

  return (
    <>
      {/* Back to Curente - persistent */}
      <button
        className="opera-back-btn"
        onClick={goBack}
        aria-label="Înapoi la Curente"
      >
        <span className="back-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </span>
        <span className="back-text">Înapoi</span>
      </button>
      <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} hideNavbar={true}>
      <div className="curent-page">
        <div
          className={`scriitor-banner ${curent.id}`}
          style={{
            background: `url(${curent.img}) center center/cover no-repeat`,
            backgroundPosition: 'center 40%'
          }}
          title={curent.nume}
          onClick={() => setIsImageFullscreen(true)}
          role="button"
          aria-label="Deschide imaginea pe tot ecranul"
        >
        </div>

        <div className="curent-main-layout scriitor-main-layout">
          <div className="curent-left scriitor-left-column">
            <div className="scriitor-info-card">
              <h2>{curent.nume}</h2>
              <div className="scriitor-dates">{curent.interval}</div>
            </div>

            <div className="scriitor-section">
              <div className="scriitor-presentation">
                <div className="scriitor-presentation-extra">
                  <p>{curent.descriere}</p>
                </div>
              </div>
            </div>

            <div className="scriitor-friends">
              <div className="scriitor-section-title">Scriitori reprezentativi</div>
              <div className="scriitor-friends-grid">
                {curent.autori && curent.autori.length > 0 ? (
                  curent.autori.map((a, i) => (
                    <div
                      key={i}
                      className="scriitor-friend-item"
                      onClick={() => goToScriitor(a.slug)}
                    >
                      <img src={a.img} alt={a.nume} />
                      <div className="scriitor-friend-name">{a.nume}</div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <p>Vom adăuga curând autorii principali ai acestui curent.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="curent-right scriitor-right-column">
            {curent.sections && curent.sections.length > 0 ? (
              <div className="curent-content">
                {curent.sections.map((section, sectionIdx) => (
                  <section key={`section-${sectionIdx}`} className="curent-section">
                    {section.title && <h3>{section.title}</h3>}
                    {section.subtitle && <p className="curent-section-subtitle">{section.subtitle}</p>}
                    {(section.blocks || []).map((block, blockIdx) =>
                      renderBlock(block, `${sectionIdx}-${blockIdx}`)
                    )}
                  </section>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Revenim curând cu mai multe detalii despre acest curent.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      </Layout>
      {isImageFullscreen && (
        <div
          onClick={() => setIsImageFullscreen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '16px'
          }}
          aria-modal="true"
          role="dialog"
        >
          <img
            src={curent.img}
            alt={curent.nume}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
          <button
            onClick={() => setIsImageFullscreen(false)}
            aria-label="Închide imaginea pe tot ecranul"
            style={{
              position: 'fixed',
              top: '12px',
              right: '12px',
              background: 'rgba(0,0,0,0.6)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 10px',
              cursor: 'pointer',
              outline: 'none',
              '&:focus': {
                outline: 'none'
              }
            }}
          >
            Închide
          </button>
        </div>
      )}
    </>
  );
}



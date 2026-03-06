import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import Layout from '../assets/Layout';
import { RECAP_SHEETS, curentToLabel } from '../data/recapSheets';
import '../styles/style.scss';

export default function RecapOpera() {
  const { slug } = useParams();
  const contentRef = useRef(null);
  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const [scrolled, setScrolled] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const data = slug ? RECAP_SHEETS[slug] : null;

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkTheme);
    localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDownloadPdf = () => {
    const element = contentRef.current;
    if (!element || !data) return;
    setPdfLoading(true);
    const filename = `recap-${slug}.pdf`;
    // Forțează capturarea întregii înălțimi ca să nu se taie rânduri în PDF
    const fullHeight = element.scrollHeight + 40;
    const fullWidth = element.scrollWidth;
    const opt = {
      margin: 12,
      filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        width: fullWidth,
        height: fullHeight,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save()
      .then(() => setPdfLoading(false))
      .catch(() => setPdfLoading(false));
  };

  if (!data) {
    return (
      <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled}>
        <div className={`recap-page ${darkTheme ? 'dark-theme' : ''}`}>
          <div className="recap-not-found">
            <p>Recap negăsit pentru această operă.</p>
            <Link to="/recap" className="recap-back-link">← Înapoi la Recap rapid</Link>
          </div>
        </div>
      </Layout>
    );
  }

  const { titlu, autor, curent, publicare, canonic, tema, ideeaPrincipala, simbolCentral, imaginiArtistice, elementeDe, relatiaPersonaje, particularitatiPersonaj, caracterizarePersonaj, pentruEseu, timpCitire } = data;

  return (
    <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled}>
      <div className={`recap-page recap-opera-page ${darkTheme ? 'dark-theme' : ''}`}>
        <header className="recap-opera-header">
          <p className="recap-opera-breadcrumb">
            <Link to="/recap">Recap rapid</Link>
            <span aria-hidden="true"> / </span>
            <span>{titlu}</span>
          </p>
          <p className="recap-opera-meta">
            <span className="recap-opera-badge">{data ? curentToLabel(data.curent) : ''}</span>
            {canonic && (
              <span className="recap-opera-badge recap-opera-canonic">{canonic === 'canonic' ? 'Canonic' : 'Necanonic'}</span>
            )}
          </p>
        </header>

        <div ref={contentRef} className="recap-opera-content">
          <h1 className="recap-opera-title">{titlu} — recap în 30 secunde</h1>
          <p className="recap-opera-timp">Timp de citire: {timpCitire || 30} sec</p>
          <ul className="recap-opera-meta-list">
            <li><span className="recap-symbol" aria-hidden="true">●</span> Autor: {autor}</li>
            <li><span className="recap-symbol" aria-hidden="true">●</span> Curent literar: {curent}</li>
            <li><span className="recap-symbol" aria-hidden="true">●</span> Publicare: {publicare}</li>
            {canonic && (
              <li><span className="recap-symbol" aria-hidden="true">●</span> {canonic === 'canonic' ? 'Canonic' : 'Necanonic'}</li>
            )}
          </ul>

          <section className="recap-block">
            <h2 className="recap-block-title"><span className="recap-symbol" aria-hidden="true">●</span> Tema</h2>
            <p className="recap-block-text">{tema}</p>
          </section>

          <section className="recap-block">
            <h2 className="recap-block-title"><span className="recap-symbol" aria-hidden="true">●</span> Ideea principală</h2>
            <p className="recap-block-text">{ideeaPrincipala}</p>
          </section>

          {simbolCentral && (
            <section className="recap-block">
              <h2 className="recap-block-title"><span className="recap-symbol" aria-hidden="true">■</span> Simbol central</h2>
              <p className="recap-simbol-nume">{simbolCentral.nume}</p>
              <p className="recap-simbol-sugestii-label">Sugerează:</p>
              <ul className="recap-bullets">
                {simbolCentral.sugestii.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </section>
          )}

          {imaginiArtistice && imaginiArtistice.length > 0 && (
            <section className="recap-block">
              <h2 className="recap-block-title"><span className="recap-symbol" aria-hidden="true">◆</span> Două imagini artistice importante</h2>
              <ul className="recap-imagini-list">
                {imaginiArtistice.map((img, i) => (
                  <li key={i}>
                    <span className="recap-imagine-nr">{i + 1}.</span>
                    <strong>{img.nume}</strong>
                    <span className="recap-imagine-explicatie"> — {img.explicatie}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {elementeDe && elementeDe.length > 0 && (
            <section className="recap-block">
              <h2 className="recap-block-title"><span className="recap-symbol" aria-hidden="true">★</span> Elemente de {curent || 'analiză'}</h2>
              <ul className="recap-bullets recap-inline-bullets">
                {elementeDe.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </section>
          )}

          {relatiaPersonaje && (
            <section className="recap-block">
              <h2 className="recap-block-title"><span className="recap-symbol" aria-hidden="true">◆</span> Relația dintre 2 personaje</h2>
              <p className="recap-relatie-personaje">
                <strong>{relatiaPersonaje.personaj1}</strong> — <strong>{relatiaPersonaje.personaj2}</strong>: {relatiaPersonaje.descriere}
              </p>
            </section>
          )}

          {particularitatiPersonaj && (
            <section className="recap-block">
              <h2 className="recap-block-title"><span className="recap-symbol" aria-hidden="true">■</span> Particularități ale unui personaj principal</h2>
              <p className="recap-block-text">{particularitatiPersonaj}</p>
            </section>
          )}

          {caracterizarePersonaj && (
            <section className="recap-block">
              <h2 className="recap-block-title"><span className="recap-symbol" aria-hidden="true">■</span> Caracterizarea personajului principal</h2>
              <p className="recap-block-text">{caracterizarePersonaj}</p>
            </section>
          )}

          <section className="recap-block recap-pentru-eseu">
            <h2 className="recap-block-title"><span className="recap-symbol" aria-hidden="true">■</span> Pentru eseu (de reținut)</h2>
            <p className="recap-block-text recap-eseu-text">{pentruEseu}</p>
          </section>
        </div>

        <footer className="recap-opera-actions">
          <Link to={`/opera/${slug}`} className="recap-btn recap-btn-primary">
            Vezi comentariul complet →
          </Link>
          <button
            type="button"
            className="recap-btn recap-btn-secondary recap-print-hide"
            onClick={handleDownloadPdf}
            disabled={pdfLoading}
          >
            {pdfLoading ? 'Se generează…' : 'Descarcă PDF'}
          </button>
        </footer>
      </div>
    </Layout>
  );
}

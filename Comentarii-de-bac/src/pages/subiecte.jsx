import React, { useEffect, useState } from 'react';
import Navbar from '../assets/Navbar';
import Footer from '../assets/Footer';
import '../styles/style.scss';

export default function Subiecte() {
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
    <>
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled} />
      <div className="page-hero">
        <h1 className="page-title">{
          'Subiecte'.split(' ').map((word, wi) => (
            <span className="page-title-word" key={wi}>
              {word.split('').map((l, i) => <span key={i}>{l}</span>)}
            </span>
          ))
        }</h1>
        <p className="page-desc">Aici vei găsi subiecte de BAC, modele și rezolvări.</p>
      </div>
      <div className="container">
        {/* box eliminat */}
      </div>
      <Footer />
    </>
  );
} 
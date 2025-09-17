import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({
  children,
  darkTheme: darkThemeProp,
  setDarkTheme: setDarkThemeProp,
  scrolled: scrolledProp,
  transparentOnTop = false,
}) {
  const controlsTheme = typeof setDarkThemeProp === 'function';
  const [darkThemeInternal, setDarkThemeInternal] = useState(() => {
    if (typeof darkThemeProp === 'boolean') return darkThemeProp;
    return localStorage.getItem('theme') === 'dark';
  });
  const [scrolledInternal, setScrolledInternal] = useState(false);

  const darkTheme = typeof darkThemeProp === 'boolean' ? darkThemeProp : darkThemeInternal;
  const setDarkTheme = controlsTheme ? setDarkThemeProp : setDarkThemeInternal;
  const scrolled = typeof scrolledProp === 'boolean' ? scrolledProp : scrolledInternal;

  useEffect(() => {
    if (!controlsTheme) {
      document.body.classList.toggle('dark-theme', darkThemeInternal);
      localStorage.setItem('theme', darkThemeInternal ? 'dark' : 'light');
    } else {
      document.body.classList.toggle('dark-theme', darkTheme);
    }
  }, [darkTheme, darkThemeInternal, controlsTheme]);

  useEffect(() => {
    if (typeof scrolledProp === 'boolean') return;
    const onScroll = () => setScrolledInternal(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrolledProp]);

  return (
    <>
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled} transparentOnTop={transparentOnTop} />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}


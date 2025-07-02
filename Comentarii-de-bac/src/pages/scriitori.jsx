import React, { useEffect, useState } from 'react';
import Navbar from '../assets/Navbar';
import Footer from '../assets/Footer';
import '../styles/style.scss';
import Select from 'react-select';

// Lista completă cu scriitorii și categorii
const scriitoriList = [
  {
    nume: 'Ion Creangă',
    date: '1837 – 1889',
    img: '/scriitori/creanga.jpg',
    color: 'rgba(255,179,71,0.82)',
    categorie: 'basm',
    canonic: true
  },
  {
    nume: 'Mihai Eminescu',
    date: '1850 – 1889',
    img: '/scriitori/eminescu.jpg',
    color: 'rgba(122,58,0,0.82)',
    categorie: 'poezie',
    canonic: true
  },
  {
    nume: 'I.L. Caragiale',
    date: '1852 – 1912',
    img: '/scriitori/il-caragiale.png',
    color: 'rgba(255,179,71,0.82)',
    categorie: 'comedie',
    canonic: true
  },
  {
    nume: 'Ioan Slavici',
    date: '1848 – 1925',
    img: '/scriitori/ioan_slavici.png',
    color: 'rgba(122,58,0,0.82)',
    categorie: 'roman',
    canonic: true
  },
  {
    nume: 'Liviu Rebreanu',
    date: '1885 – 1944',
    img: '/scriitori/liviu_rebreanu_nou.png',
    color: 'rgba(255,179,71,0.82)',
    categorie: 'roman',
    canonic: true
  },
  {
    nume: 'George Călinescu',
    date: '1899 – 1965',
    img: '/scriitori/george_calinescu.png',
    color: 'rgba(255,179,71,0.82)',
    categorie: 'roman',
    canonic: true
  },
  {
    nume: 'Camil Petrescu',
    date: '1894 – 1957',
    img: '/scriitori/camil_rezerva.png',
    color: 'rgba(122,58,0,0.82)',
    categorie: 'roman',
    canonic: true
  },
  {
    nume: 'Ion Barbu',
    date: '1895 – 1961',
    img: '/scriitori/barbu_ion.png',
    color: 'rgba(255,179,71,0.82)',
    categorie: 'poezie',
    canonic: true
  },
  {
    nume: 'Lucian Blaga',
    date: '1895 – 1961',
    img: '/scriitori/lucian_blaga.png',
    color: 'rgba(122,58,0,0.82)',
    categorie: 'poezie',
    canonic: true
  },
  {
    nume: 'Tudor Arghezi',
    date: '1880 – 1967',
    img: '/scriitori/tudor_arghezi.png',
    color: 'rgba(255,179,71,0.82)',
    categorie: 'poezie',
    canonic: true
  },
  {
    nume: 'George Bacovia',
    date: '1881 – 1957',
    img: '/scriitori/bacovia_rezerva.png',
    color: 'rgba(122,58,0,0.82)',
    categorie: 'poezie',
    canonic: true
  },
  {
    nume: 'Mihail Sadoveanu',
    date: '1880 – 1961',
    img: '/scriitori/mihail-sadoveanu-3.png',
    color: 'rgba(255,179,71,0.82)',
    categorie: 'roman',
    canonic: true
  },
  {
    nume: 'Marin Preda',
    date: '1922 – 1980',
    img: '/scriitori/marin_preda.png',
    color: 'rgba(122,58,0,0.82)',
    categorie: 'roman',
    canonic: true
  },
  {
    nume: 'Nichita Stănescu',
    date: '1933 – 1983',
    img: '/scriitori/nichita_stanescu_rezerva.png',
    color: 'rgba(255,179,71,0.82)',
    categorie: 'poezie',
    canonic: true
  },
  {
    nume: 'Marin Sorescu',
    date: '1936 – 1996',
    img: '/scriitori/marin_sorescu.png',
    color: 'rgba(122,58,0,0.82)',
    categorie: 'poezie',
    canonic: true
  },
  {
    nume: 'Titu Maiorescu',
    date: '1840 – 1917',
    img: '/scriitori/titu_maiorescu (2).png',
    color: 'rgba(122,58,0,0.82)',
    categorie: 'critica',
    canonic: true
  },
  {
    nume: 'Mircea Eliade',
    date: '1907 – 1986',
    img: '/scriitori/mircea-eliade.png',
    color: 'rgba(255,179,71,0.82)',
    categorie: 'roman',
    canonic: false
  },
  {
    nume: 'Costache Negruzzi',
    date: '1808 – 1868',
    img: '/scriitori/costache-negruzzi.png',
    color: 'rgba(255,179,71,0.82)',
    categorie: 'roman',
    canonic: false
  },
  {
    nume: 'Ion Pillat',
    date: '1891 – 1945',
    img: '/scriitori/ion_pillat.png',
    color: 'rgba(122,58,0,0.82)',
    categorie: 'poezie',
    canonic: false
  },
  {
    nume: 'Vasile Voiculescu',
    date: '1884 – 1963',
    img: '/scriitori/vasile_voiculescu.png',
    color: 'rgba(255,179,71,0.82)',
    categorie: 'poezie',
    canonic: false
  }
];

const categorii = [
  { id: 'toate', nume: 'Toate categoriile' },
  { id: 'poezie', nume: 'Poezie' },
  { id: 'roman', nume: 'Roman' },
  { id: 'comedie', nume: 'Comedie' },
  { id: 'basm', nume: 'Basm' },
  { id: 'critica', nume: 'Critică literară' }
];

// Opțiuni pentru react-select
const genOptions = categorii.map(categorie => ({ value: categorie.id, label: categorie.nume }));
const canonicOptions = [
  { value: 'toate', label: 'Toți' },
  { value: 'canonic', label: 'Canonici' },
  { value: 'necanonic', label: 'Non-canonici' }
];

const customSelectStyles = (darkTheme) => ({
  control: (provided, state) => ({
    ...provided,
    minWidth: 270,
    maxWidth: 320,
    height: '56px',
    borderRadius: '2.2rem',
    border: `1.5px solid ${darkTheme ? '#a97c50' : '#ececec'}`,
    background: darkTheme ? '#4e2e1e' : '#f7f8fa',
    color: darkTheme ? 'rgba(255,255,255,0.95)' : '#222',
    fontWeight: 500,
    fontSize: '1.13rem',
    boxShadow: state.isFocused ? `0 0 0 2px ${darkTheme ? '#ffd591' : '#a3a3a3'}` : 'none',
    '&:hover': { borderColor: darkTheme ? '#ffd591' : '#a3a3a3' },
    cursor: 'pointer',
    paddingLeft: 0,
    paddingRight: 0,
    transition: 'all 0.3s',
    outline: 'none',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '56px',
    padding: '0 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    position: 'relative',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '2.2rem',
    background: darkTheme ? '#4e2e1e' : '#f7f8fa',
    color: darkTheme ? 'rgba(255,255,255,0.95)' : '#222',
    boxShadow: '0 8px 32px 0 rgba(60,40,20,0.18)',
    overflow: 'hidden',
    zIndex: 10,
    marginTop: 6,
  }),
  option: (provided, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: darkTheme ? 'rgba(255,255,255,0.95)' : '#222',
    background: state.isSelected
      ? (darkTheme ? '#a97c50' : '#ffd591')
      : state.isFocused
        ? (darkTheme ? '#6a4322' : '#fff')
        : (darkTheme ? '#4e2e1e' : '#f7f8fa'),
    fontWeight: state.isSelected ? 700 : 500,
    fontSize: '1.13rem',
    cursor: 'pointer',
    borderRadius: 0,
    padding: '0.7rem 0',
    minHeight: 40,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: darkTheme ? 'rgba(255,255,255,0.95)' : '#222',
    textAlign: 'center',
    fontWeight: 500,
    width: '100%',
    fontSize: '1.13rem',
    display: 'flex',
    alignItems: 'center',
    height: '56px',
    position: 'absolute',
    left: '1.5rem',
    right: '1.5rem',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: darkTheme ? '#ffd591' : '#a97c50',
    padding: 8,
    transition: 'color 0.2s',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    height: '56px',
    position: 'absolute',
    right: '1.5rem',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  input: (provided) => ({ ...provided, display: 'none' }),
  menuList: (provided) => ({ ...provided, padding: 0, maxHeight: 'none', overflowY: 'auto' }),
});

export default function Scriitori() {
  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('toate');
  const [canonicFilter, setCanonicFilter] = useState('toate'); // 'toate', 'canonic', 'necanonic'

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkTheme);
    localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Filtrare scriitori
  const filteredScriitori = scriitoriList.filter(scriitor => {
    const matchesSearch = scriitor.nume.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'toate' || scriitor.categorie === selectedCategory;
    const matchesCanonic = canonicFilter === 'toate' || 
                          (canonicFilter === 'canonic' && scriitor.canonic) ||
                          (canonicFilter === 'necanonic' && !scriitor.canonic);
    return matchesSearch && matchesCategory && matchesCanonic;
  });

  // Banda colorată ca pe landing
  const cardSize = 320;
  const bandaColor = darkTheme ? 'rgba(26,13,0,0.82)' : 'rgba(255,179,71,0.82)';

  return (
    <>
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled} />
      <div className="page-hero">
        <h1 className="page-title">{
          'Scriitori'.split(' ').map((word, wi) => (
            <span className="page-title-word" key={wi}>
              {word.split('').map((l, i) => <span key={i}>{l}</span>)}
            </span>
          ))
        }</h1>
        <p className="page-desc">Aici vei găsi comentarii și resurse despre scriitorii importanți pentru BAC.</p>
      </div>

      <div className="container">
        {/* Search Bar și Dropdown-uri */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1300,
          margin: '0 auto 1.5rem auto',
          padding: 0,
          gap: '1.5rem',
        }}>
          {/* Search Bar */}
          <div style={{
            position: 'relative',
            flex: 1,
            minWidth: 0,
            maxWidth: '100%',
          }}>
            <div style={{
              position: 'absolute',
              left: '1.2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.25rem',
              color: darkTheme ? 'rgba(180,180,180,0.55)' : 'rgba(60,40,20,0.45)',
              zIndex: 2
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Caută scriitori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '90%',
                padding: '1.1rem 1.5rem 1.1rem 3.2rem',
                fontSize: '1.13rem',
                borderRadius: '2.2rem',
                border: darkTheme ? '1.5px solid #a97c50' : '1.5px solid #ececec',
                background: darkTheme ? '#4e2e1e' : '#f7f8fa',
                color: darkTheme ? 'rgba(255,255,255,0.95)' : '#222',
                outline: 'none',
                transition: 'all 0.3s',
                boxShadow: darkTheme ? '0 2px 12px 0 rgba(60,40,20,0.18)' : '0 2px 8px 0 rgba(60,40,20,0.08)',
                fontWeight: 500,
                letterSpacing: '0.01em',
              }}
              onFocus={e => {
                e.target.style.borderColor = darkTheme ? '#ffd591' : '#a3a3a3';
                e.target.style.background = darkTheme ? '#6a4322' : '#fff';
              }}
              onBlur={e => {
                e.target.style.borderColor = darkTheme ? '#a97c50' : '#ececec';
                e.target.style.background = darkTheme ? '#4e2e1e' : '#f7f8fa';
              }}
            />
          </div>
          {/* Dropdown Gen cu react-select */}
          <div style={{ minWidth: 200, flexShrink: 0 }}>
            <Select
              options={genOptions}
              value={genOptions.find(opt => opt.value === selectedCategory)}
              onChange={opt => setSelectedCategory(opt.value)}
              styles={customSelectStyles(darkTheme)}
              isSearchable={false}
              menuPlacement="auto"
              placeholder="Gen"
              theme={theme => ({
                ...theme,
                borderRadius: 20,
                colors: {
                  ...theme.colors,
                  primary25: darkTheme ? '#3a2312' : '#f7f8fa',
                  primary: darkTheme ? '#ffd591' : '#a97c50',
                  neutral0: darkTheme ? '#2a170a' : '#fffbeee',
                  neutral80: darkTheme ? '#ffd591' : '#4e2e1e',
                },
              })}
            />
          </div>
          {/* Dropdown Canonic cu react-select */}
          <div style={{ minWidth: 200, flexShrink: 0 }}>
            <Select
              options={canonicOptions}
              value={canonicOptions.find(opt => opt.value === canonicFilter)}
              onChange={opt => setCanonicFilter(opt.value)}
              styles={customSelectStyles(darkTheme)}
              isSearchable={false}
              menuPlacement="auto"
              placeholder="Canonici"
              theme={theme => ({
                ...theme,
                borderRadius: 20,
                colors: {
                  ...theme.colors,
                  primary25: darkTheme ? '#3a2312' : '#f7f8fa',
                  primary: darkTheme ? '#ffd591' : '#a97c50',
                  neutral0: darkTheme ? '#2a170a' : '#fffbeee',
                  neutral80: darkTheme ? '#ffd591' : '#4e2e1e',
                },
              })}
            />
          </div>
        </div>

        {/* Butoane categorii canonice sub search bar */}
        <div style={{
          display: 'flex',
          gap: '0.9rem',
          justifyContent: 'flex-start',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: 1300,
          margin: '0 auto 1.5rem auto',
          padding: '0 1.5rem',
        }}>
          {categorii.filter(c => c.id !== 'toate').map(categorie => (
            <button
              key={categorie.id}
              onClick={() => setSelectedCategory(categorie.id)}
              style={{
                padding: '0.7rem 1.5rem',
                borderRadius: '2rem',
                border: selectedCategory === categorie.id ? '2px solid #4e2e1e' : '2px solid #ececec',
                background: selectedCategory === categorie.id ? (darkTheme ? '#a97c50' : '#ffd591') : (darkTheme ? '#4e2e1e' : '#f7f8fa'),
                color: selectedCategory === categorie.id ? (darkTheme ? '#4e2e1e' : '#222') : (darkTheme ? 'rgba(255,255,255,0.95)' : '#222'),
                fontWeight: selectedCategory === categorie.id ? 700 : 500,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedCategory === categorie.id ? '0 2px 8px rgba(60,40,20,0.10)' : 'none',
                outline: 'none'
              }}
            >
              {categorie.nume}
            </button>
          ))}
        </div>

        {/* Grid Scriitori */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2.5rem',
          width: '100%',
          maxWidth: 1300,
          justifyItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}>
          {filteredScriitori.map((scriitor, idx) => (
            <div
              key={scriitor.nume}
              style={{
                width: cardSize,
                height: cardSize,
                borderRadius: '2.2rem',
                overflow: 'hidden',
                boxShadow: 'none',
                border: darkTheme ? '1.5px solid #a97c50' : '1.5px solid #ececec',
                background: 'transparent',
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
                  borderRadius: '2.2rem',
                  display: 'block',
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '0.5em 0 0.3em 0',
                background: bandaColor,
                color: '#fff',
                fontWeight: 900,
                fontSize: '1.05rem',
                textAlign: 'center',
                letterSpacing: '0.04em',
                textShadow: '0 2px 8px rgba(60,40,20,0.10)',
                borderBottomLeftRadius: '2.2rem',
                borderBottomRightRadius: '2.2rem',
                backdropFilter: 'blur(1.5px)',
              }}>
                <div>{scriitor.nume}</div>
                <div style={{ fontWeight: 500, fontSize: '0.93em', opacity: 0.92 }}>{scriitor.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Mesaj când nu sunt rezultate */}
        {filteredScriitori.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1.5rem',
            color: darkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(60,40,20,0.7)',
            fontSize: '1.2rem',
            fontWeight: '500'
          }}>
            Nu s-au găsit scriitori care să corespundă criteriilor de căutare.
          </div>
        )}
      </div>
      <Footer />
    </>
  );
} 
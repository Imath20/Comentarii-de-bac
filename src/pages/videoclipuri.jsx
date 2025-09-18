import React, { useEffect, useState } from 'react';
import Layout from '../assets/Layout';
import '../styles/style.scss';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

// Lista cu filme YouTube
const filmeList = [
  {
    id: '1',
    titlu: 'Ion Creangă - Povestea lui Harap-Alb',
    descriere: 'Harap-Alb',
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
    durata: '1:43:48',
    autor: 'Mihail Sadoveanu',
  },
];

// Categorii pentru filtrare
const categorii = [
  { id: 'toate', nume: 'Toate' },
  { id: 'poezie', nume: 'Poezie' },
  { id: 'proza', nume: 'Proză' },
  { id: 'roman', nume: 'Roman' },
  { id: 'comedie', nume: 'Comedie' },
  { id: 'basm', nume: 'Basme' },
  { id: 'nuvela', nume: 'Nuvelă' },
  { id: 'teatru', nume: 'Teatru' }
];

// Opțiuni pentru dropdown-ul de categorii
const genOptions = [
  { value: 'toate', label: 'Toate categoriile' },
  { value: 'poezie', label: 'Poezie' },
  { value: 'proza', label: 'Proză' },
  { value: 'roman', label: 'Roman' },
  { value: 'comedie', label: 'Comedie' },
  { value: 'basm', label: 'Basme' },
  { value: 'nuvela', label: 'Nuvelă' },
  { value: 'teatru', label: 'Teatru' }
];

// Stiluri pentru react-select
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
    boxShadow: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease',
    '&:hover': {
      borderColor: darkTheme ? '#ffd591' : '#a97c50',
      background: darkTheme ? '#5a341e' : '#ffffff',
      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.12)',
      transform: 'translateY(-1px)',
      cursor: 'pointer',
    },
    '&:focus-within': {
      borderColor: darkTheme ? '#ffd591' : '#a97c50',
      boxShadow: `0 0 0 1px ${darkTheme ? '#ffd591' : '#a97c50'}`,
      cursor: 'pointer',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? (darkTheme ? '#ffd591' : '#a97c50')
      : state.isFocused
      ? (darkTheme ? '#3a2312' : '#f7f8fa')
      : 'transparent',
    color: state.isSelected
      ? (darkTheme ? '#2a170a' : '#fff')
      : (darkTheme ? '#ffd591' : '#4e2e1e'),
    padding: '12px 16px',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.15s ease, transform 0.1s ease',
    '&:hover': {
      backgroundColor: darkTheme ? '#3a2312' : '#f0f2f5',
      transform: 'translateX(2px)',
      cursor: 'pointer',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: darkTheme ? 'rgba(255,255,255,0.95)' : '#222',
    fontWeight: 500,
    fontSize: '1.13rem',
  }),
  input: (provided) => ({
    ...provided,
    color: darkTheme ? 'rgba(255,255,255,0.95)' : '#222',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: darkTheme ? '#4e2e1e' : '#f7f8fa',
    border: `1.5px solid ${darkTheme ? '#a97c50' : '#ececec'}`,
    borderRadius: '1.1rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    zIndex: 200,
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '8px 0',
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'transparent',
    },
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: darkTheme ? '#ffd591' : '#a97c50',
    padding: '8px',
    transition: 'color 0.2s, transform 0.15s ease',
    cursor: 'pointer',
    '&:hover': {
      color: darkTheme ? '#ffd591' : '#a97c50',
      transform: 'scale(1.08)',
      cursor: 'pointer',
    },
  }),
});

export default function Videoclipuri() {
  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('toate');
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

  // Filtrare filme
  const filteredFilme = filmeList.filter(film => {
    const matchesSearch = film.titlu.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         film.descriere.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         film.autor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'toate' || film.categorie === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout darkTheme={darkTheme} scrolled={scrolled}>
      <div className="page-hero">
        <h1 className="page-title">{
          'Videoclipuri'.split(' ').map((word, wi) => (
            <span className="page-title-word" key={wi}>
              {word.split('').map((l, i) => <span key={i}>{l}</span>)}
            </span>
          ))
        }</h1>
        <p className="page-desc">Catalog al filmelor despre operele românești</p>
      </div>

      <div className="container">

        {/* Search Bar și Dropdown-uri */}
        <div className="videoclipuri-filters-container">
          {/* Search Bar */}
          <div className="videoclipuri-search-container">
            <div className={`videoclipuri-search-icon ${darkTheme ? 'dark-theme' : ''}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Caută filme..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`videoclipuri-search-input ${darkTheme ? 'dark-theme' : ''}`}
            />
          </div>
          {/* Dropdown Categorie cu react-select */}
          <div className="videoclipuri-select-container">
             <Select
               options={genOptions}
               value={genOptions.find(opt => opt.value === selectedCategory)}
               onChange={opt => setSelectedCategory(opt.value)}
               styles={customSelectStyles(darkTheme)}
               isSearchable={false}
               menuPlacement="auto"
               placeholder="Categorie"
             />
          </div>
        </div>

        {/* Butoane categorii sub search bar */}
        <div className="videoclipuri-filter-buttons">
          {categorii.filter(c => c.id !== 'toate').map(categorie => (
            <button
              key={categorie.id}
              onClick={() => setSelectedCategory(categorie.id)}
              className={`videoclipuri-filter-button ${darkTheme ? 'dark-theme' : ''} ${selectedCategory === categorie.id ? 'selected' : ''}`}
            >
              {categorie.nume}
            </button>
          ))}
        </div>

        {/* Grid Filme */}
        <div className="videoclipuri-grid-container">
          {filteredFilme.map((film) => (
            <div
              key={film.id}
              className={`videoclipuri-card ${darkTheme ? 'dark-theme' : 'light-theme'}`}
            >
              <div className="videoclipuri-video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${film.videoId}`}
                  title={film.titlu}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="videoclipuri-iframe"
                ></iframe>
              </div>
              <div className={`videoclipuri-card-info ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
                <h3 className="videoclipuri-card-title">{film.titlu}</h3>
                <p className="videoclipuri-card-descriere">{film.descriere}</p>
                <div className="videoclipuri-card-meta">
                  <span className="videoclipuri-card-durata">{film.durata}</span>
                  <span className="videoclipuri-card-autor">{film.autor}</span>
                  <span className="videoclipuri-card-categorie">
                    {categorii.find(c => c.id === film.categorie)?.nume}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFilme.length === 0 && (
          <div className="videoclipuri-no-results">
            <p>Nu s-au găsit filme care să corespundă criteriilor de căutare.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

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
  {
    id: '7',
    titlu: 'IL Caragiale - O scrisoare pierdută',
    descriere: 'O scrisoare pierdută',
    videoId: 'HnQPMYJNud8',
    categorie: 'comedie',
    durata: '2:13:08',
    autor: 'IL Caragiale',
  },
  {
    id: '8',
    titlu: 'Mihai Eminescu - Luceafărul',
    descriere: 'Luceafărul',
    videoId: '5X_COpZg01Q',
    categorie: 'poezie',
    durata: '15:40',
    autor: 'Mihai Eminescu',
  },
  {
    id: '9',
    titlu: 'George Bacovia - Plumb',
    descriere: 'Plumb',
    videoId: 'mW0EjMrbjcY',
    categorie: 'poezie',
    durata: '1:06',
    autor: 'George Bacovia',
  },
  {
    id: '10',
    titlu: 'Camil Petrescu',
    descriere: 'Ultima noapte de dragoste, întâia noapte de război',
    videoId: 'x5O2NGuucIs',
    categorie: 'roman',
    durata: '1:39:15',
    autor: 'Camil Petrescu',
  },
  {
    id: '11',
    titlu: 'Marin Preda - Moromeții',
    descriere: 'Morometii - Vol. 1',
    videoId: 'NHaNm-Acmx8',
    categorie: 'roman',
    durata: '2:28:04',
    autor: 'Marin Preda',
  },
  {
    id: '12',
    titlu: 'Marin Preda - Moromeții',
    descriere: 'Morometii - Vol. 2',
    videoId: '9Eb1tKL3AJU',
    categorie: 'roman',
    durata: '1:47:27',
    autor: 'Marin Preda',
  },
  {
    id: '13',
    titlu: 'Marin Sorescu - Iona',
    descriere: 'Iona',
    videoId: 'rxHq37u_7-I',
    categorie: 'teatru',
    durata: '50:35',
    autor: 'Marin Sorescu',
  },
  {
    id: '14',
    titlu: 'Ion Creangă - Amintiri din copilărie',
    descriere: 'Amintiri din copilărie',
    videoId: 'KdG_IcX_npA',
    categorie: 'proza',
    durata: '1:11:28',
    autor: 'Ion Creangă',
  },
  {
    id: '15',
    titlu: 'Liviu Rebreanu - Răscoala',
    descriere: 'Rascoala',
    videoId: 'K1Dh96vnSwY',
    categorie: 'roman',
    durata: '1:32:44',
    autor: 'Liviu Rebreanu',
  },
  {
    id: '16',
    titlu: 'Costache Negruzzi',
    descriere: 'Alexandru Lăpușneanu',
    videoId: 'TU-HD71VJxQ',
    categorie: 'roman',
    durata: '2:21:48',
    autor: 'Costache Negruzzi',
  },
  {
    id: '18',
    titlu: 'IL Caragiale - O noapte furtunoasă',
    descriere: 'O noapte furtunoasă',
    videoId: 'aEoCaq7RGmc',
    categorie: 'teatru',
    durata: '1:09:39',
    autor: 'IL Caragiale',
  },
  {
    id: '19',
    titlu: 'Ion Creangă - Dănilă Prepeleac',
    descriere: 'Dănilă Prepeleac',
    videoId: 'vQ1l6vsXHwc',
    categorie: 'proza',
    durata: '1:08:14',
    autor: 'Ion Creangă',
  }
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

// Stiluri pentru react-select (aliniate cu Opere/Scriitori/Biblioteca)
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
  dropdownIndicator: (provided) => ({
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

export default function Videoclipuri() {
  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('toate');
  const [sortOption, setSortOption] = useState('none');
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

  const sortOptions = [
    { value: 'none', label: 'Fără sortare' },
    { value: 'durata-asc', label: 'Durată ↑' },
    { value: 'durata-desc', label: 'Durată ↓' },
    { value: 'az', label: 'A–Z' },
    { value: 'za', label: 'Z–A' },
  ];

  const parseDurationToSeconds = (durata) => {
    if (!durata) return 0;
    const parts = String(durata).split(':').map(n => parseInt(n, 10));
    if (parts.length === 3) {
      const [h, m, s] = parts;
      return (isNaN(h)?0:h) * 3600 + (isNaN(m)?0:m) * 60 + (isNaN(s)?0:s);
    }
    if (parts.length === 2) {
      const [m, s] = parts;
      return (isNaN(m)?0:m) * 60 + (isNaN(s)?0:s);
    }
    return 0;
  };

  const sortedFilme = [...filteredFilme].sort((a, b) => {
    switch (sortOption) {
      case 'durata-asc':
        return parseDurationToSeconds(a.durata) - parseDurationToSeconds(b.durata);
      case 'durata-desc':
        return parseDurationToSeconds(b.durata) - parseDurationToSeconds(a.durata);
      case 'az':
        return a.titlu.localeCompare(b.titlu, 'ro', { sensitivity: 'base' });
      case 'za':
        return b.titlu.localeCompare(a.titlu, 'ro', { sensitivity: 'base' });
      default:
        return 0;
    }
  });

  return (
    <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled}>
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
          {/* Dropdown Sortare */}
          <div className="videoclipuri-select-container">
            <Select
              options={sortOptions}
              value={sortOptions.find(opt => opt.value === sortOption)}
              onChange={opt => setSortOption(opt.value)}
              styles={customSelectStyles(darkTheme)}
              isSearchable={false}
              menuPlacement="auto"
              placeholder="Sortează"
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
          {sortedFilme.map((film) => (
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

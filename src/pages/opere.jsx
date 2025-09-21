import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../assets/Layout';
import '../styles/style.scss';
import Select from 'react-select';

// Lista completă cu opere și categorii
const opereList = [
    {
        titlu: 'Povestea lui Harap-Alb',
        autor: 'Ion Creangă',
        data: 'Redactare: 1877',
        img: '/opere/Harap-Alb.webp',
        categorie: 'basm',
        canonic: true
    },
    {
        titlu: 'Moara cu noroc',
        autor: 'Ioan Slavici',
        data: 'Redactare: 1880',
        img: '/opere/moara-cu-noroc.webp',
        categorie: 'nuvela',
        canonic: true
    },
    {
        titlu: 'Ion',
        autor: 'Liviu Rebreanu',
        data: 'Redactare: 1920',
        img: '/opere/Ion.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-social',
        canonic: true
    },
    {
        titlu: 'Enigma Otiliei',
        autor: 'George Călinescu',
        data: 'Redactare: 1938',
        img: '/opere/enigma-otiliei.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-balzacian',
        canonic: true
    },
    {
        titlu: 'Luceafărul',
        autor: 'Mihai Eminescu',
        data: 'Redactare: 1883',
        img: '/opere/Luceafarul.webp',
        categorie: 'poezie',
        canonic: true
    },
    {
        titlu: 'Plumb',
        autor: 'George Bacovia',
        data: 'Redactare: 1916',
        img: '/opere/plumb.webp',
        categorie: 'poezie',
        canonic: true
    },
    {
        titlu: 'O scrisoare pierdută',
        autor: 'I.L. Caragiale',
        data: 'Redactare: 1884',
        img: '/opere/scrisoare-pierduta.webp',
        categorie: 'comedie',
        canonic: true
    },
    {
        titlu: 'Baltagul',
        autor: 'Mihail Sadoveanu',
        data: 'Redactare: 1930',
        img: '/opere/baltagul.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-mitic',
        canonic: true
    },
    {
        titlu: 'Ultima noapte de dragoste, întaia noapte de razboi',
        autor: 'Camil Petrescu',
        data: 'Redactare: 1930',
        img: '/opere/ultima-noapte.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-subiectiv',
        canonic: true
    },
    {
        titlu: 'Flori de mucigai',
        autor: 'Tudor Arghezi',
        data: 'Redactare: 1919',
        img: '/opere/flori-mucigai.webp',
        categorie: 'poezie',
        canonic: true
    },
    {
        titlu: 'Eu nu strivesc corola de minuni a lumii',
        autor: 'Lucian Blaga',
        data: 'Redactare: 1919',
        img: '/opere/corola_minuni.webp',
        categorie: 'poezie',
        canonic: true
    },
    {
        titlu: 'Riga crypto si lapona enigel',
        autor: 'Ion Barbu',
        data: 'Redactare: 1930',
        img: '/opere/riga-crypto.webp',
        categorie: 'poezie',
        canonic: true
    },
    {
        titlu: 'Morometii',
        autor: 'Marin Preda',
        data: 'Redactare: 1955/1967',
        img: '/opere/morometii.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-autobiografic',
        canonic: true
    },
    {
        titlu: 'Leoaică tânără, iubirea',
        autor: 'Nichita Stănescu',
        data: 'Redactare: 1964',
        img: '/opere/leoaica-iubirea.webp',
        categorie: 'poezie',
        canonic: true
    },
    {
        titlu: 'Iona',
        autor: 'Marin Sorescu',
        data: 'Redactare: 1968',
        img: '/opere/iona.webp',
        categorie: 'comedie',
        canonic: true
    },
    {
        titlu: 'Formele fara fond',
        autor: 'Titu Maiorescu',
        data: 'Redactare: 1868',
        img: '/opere/formele.webp',
        categorie: 'critica',
        canonic: true
    },
    {
        titlu: 'Mara',
        autor: 'Ioan Slavici',
        data: 'Redactare: 1894',
        img: '/opere/mara.webp',
        categorie: 'roman',
        canonic: false
    },
    {
        titlu: 'Testament',
        autor: 'Tudor Arghezi',
        data: 'Redactare: 1927',
        img: '/opere/testament-orizontala.webp',
        categorie: 'poezie',
        canonic: false
    },
    {
        titlu: 'Amintiri din copilărie',
        autor: 'Ion Creangă',
        data: 'Redactare: 1881-1892',
        img: '/opere/amintiri-copil.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-autobiografic',
        canonic: false
    },
    {
        titlu: 'Răscoala',
        autor: 'Liviu Rebreanu',
        data: 'Redactare: 1932',
        img: '/opere/rascoala.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-social',
        canonic: false
    },
    {
        titlu: 'Hanul Ancuţei',
        autor: 'Mihail Sadoveanu',
        data: 'Redactare: 1928',
        img: '/opere/hanul-ancutei.webp',
        categorie: 'nuvela',
        canonic: false
    },
    {
        titlu: 'Maytreyi',
        autor: 'Mircea Eliade',
        data: 'Redactare: 1933',
        img: '/opere/maytreyi.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-autobiografic',
        canonic: false
    },
    {
        titlu: 'Alexandru Lăpușneanu',
        autor: 'Costache Negruzzi',
        data: 'Redactare: 1840',
        img: '/opere/lapusneanu.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-istoric',
        canonic: false
    },
    {
        titlu: 'Aci sosi pe vremuri',
        autor: 'Ion Pillat',
        data: 'Redactare: 1923',
        img: '/opere/aci-sosi.webp',
        categorie: 'poezie',
        canonic: false
    },
    {
        titlu: 'În Grădina Ghetsimani',
        autor: 'Vasile Voiculescu',
        data: 'Redactare: 1921',
        img: '/opere/gradina-ghetsimani.webp',
        categorie: 'poezie',
        canonic: false
    },
];

const categorii = [
    { id: 'toate', nume: 'Toate categoriile' },
    { id: 'poezie', nume: 'Poezie' },
    { id: 'roman', nume: 'Roman' },
    { id: 'comedie', nume: 'Comedie' },
    { id: 'basm', nume: 'Basm' },
    { id: 'nuvela', nume: 'Nuvelă' },
    { id: 'critica', nume: 'Critică literară' }
];

// Opțiuni pentru react-select
const genOptions = categorii.map(categorie => ({ value: categorie.id, label: categorie.nume }));
const canonicOptions = [
    { value: 'toate', label: 'Toate' },
    { value: 'canonice', label: 'Canonice' },
    { value: 'necanonice', label: 'Non-canonice' }
];

const romanSubcategoriiOptions = [
    { value: 'toate', label: 'Toate subcategoriile' },
    { value: 'roman-balzacian', label: 'Roman balzacian' },
    { value: 'roman-subiectiv', label: 'Roman subiectiv' },
    { value: 'roman-autobiografic', label: 'Roman autobiografic' },
    { value: 'roman-mitic', label: 'Roman mitic' },
    { value: 'roman-social', label: 'Roman social' },
    { value: 'roman-istoric', label: 'Roman istoric' }
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

export default function Opre() {
    const navigate = useNavigate();
    const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
    const [scrolled, setScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('toate');
    const [canonicFilter, setCanonicFilter] = useState('toate'); // 'toate', 'canonic', 'necanonic'
    const [romanSubcategorieFilter, setRomanSubcategorieFilter] = useState('toate');

    useEffect(() => {
        document.body.classList.toggle('dark-theme', darkTheme);
        localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
    }, [darkTheme]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Reset roman subcategory filter when category changes from roman
    useEffect(() => {
        if (selectedCategory !== 'roman') {
            setRomanSubcategorieFilter('toate');
        }
    }, [selectedCategory]);

    // Filtrare opere
    const filteredOpere = opereList.filter(opera => {
        const matchesSearch = opera.titlu.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'toate' || opera.categorie === selectedCategory;
        const matchesCanonic = canonicFilter === 'toate' ||
            (canonicFilter === 'canonice' && opera.canonic) ||
            (canonicFilter === 'necanonice' && !opera.canonic);
        const matchesRomanSubcategorie = romanSubcategorieFilter === 'toate' || 
            (selectedCategory === 'roman' && opera.romanSubcategorie === romanSubcategorieFilter);
        return matchesSearch && matchesCategory && matchesCanonic && matchesRomanSubcategorie;
    });

    // Banda colorată ca pe landing
    const cardSize = 320;
    const bandaColor = darkTheme ? 'rgba(26,13,0,0.82)' : 'rgba(255,179,71,0.82)';

    const slugify = (text) => {
        if (!text) return '';
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    };

    return (
        <>
            <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled} />
            <div className="page-hero">
                <h1 className="page-title">{
                    'Opere'.split(' ').map((word, wi) => (
                        <span className="page-title-word" key={wi}>
                            {word.split('').map((l, i) => <span key={i}>{l}</span>)}
                        </span>
                    ))
                }</h1>
                <p className="page-desc">Aici vei găsi comentarii și resurse despre operele importante pentru BAC.</p>
            </div>

            <div className="container">
                {/* Search Bar și Dropdown-uri */}
                <div className="opere-filters-container">
                    {/* Search Bar */}
                    <div className="opere-search-container">
                        <div className={`opere-search-icon ${darkTheme ? 'dark-theme' : ''}`}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Caută opere..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`opere-search-input ${darkTheme ? 'dark-theme' : ''}`}
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
                    <div className="opere-select-container">
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
                    <div className="opere-select-container">
                        <Select
                            options={canonicOptions}
                            value={canonicOptions.find(opt => opt.value === canonicFilter)}
                            onChange={opt => setCanonicFilter(opt.value)}
                            styles={customSelectStyles(darkTheme)}
                            isSearchable={false}
                            menuPlacement="auto"
                            placeholder="Canonice"
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
                <div className="opere-filter-buttons">
                    {categorii.filter(c => c.id !== 'toate').map(categorie => (
                        <button
                            key={categorie.id}
                            onClick={() => setSelectedCategory(categorie.id)}
                            className={`opere-filter-button ${darkTheme ? 'dark-theme' : ''} ${selectedCategory === categorie.id ? 'selected' : ''}`}
                        >
                            {categorie.nume}
                        </button>
                    ))}
                    
                    {/* Dropdown Subcategorii Roman - în linie cu butoanele */}
                    {selectedCategory === 'roman' && (
                        <div className="opere-roman-subcategory-container">
                            <Select
                                options={romanSubcategoriiOptions}
                                value={romanSubcategoriiOptions.find(opt => opt.value === romanSubcategorieFilter)}
                                onChange={opt => setRomanSubcategorieFilter(opt.value)}
                                styles={customSelectStyles(darkTheme)}
                                isSearchable={false}
                                menuPlacement="auto"
                                placeholder="Subcategorii roman"
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
                    )}
                </div>

                {/* Grid Opere */}
                <div className="opere-grid-container">
                    {filteredOpere.map((opera, idx) => (
                        <div
                            key={opera.titlu}
                            className={`opere-card ${darkTheme ? 'dark-theme' : ''}`}
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
                            onClick={() => {
                                const slug = slugify(opera.titlu);
                                navigate(`/opera/${slug}`, { state: { opera } });
                            }}
                        >
                            <img
                                src={opera.img}
                                alt={opera.titlu}
                            />
                            {/* Gradient overlay for readability */}
                            <div className={`opere-card-overlay ${darkTheme ? 'dark-theme' : ''}`} />
                            {/* Content overlay */}
                            <div className="opere-card-content">
                                <div className="opere-card-title">{opera.titlu}</div>
                                <div className="opere-card-author">{opera.autor}</div>
                                <div className={`opere-card-date ${darkTheme ? 'dark-theme' : ''}`}>
                                    {opera.data.replace('Redactare: ', '')}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mesaj când nu sunt rezultate */}
                {filteredOpere.length === 0 && (
                    <div className={`opere-no-results ${darkTheme ? 'dark-theme' : ''}`}>
                        Nu s-au găsit opere care să corespundă criteriilor de căutare.
                    </div>
                )}
            </div>
            <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled} />
        </>
    );
} 
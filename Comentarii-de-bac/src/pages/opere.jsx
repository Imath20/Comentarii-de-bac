import React, { useEffect, useState } from 'react';
import Navbar from '../assets/Navbar';
import Footer from '../assets/Footer';
import '../styles/style.scss';
import Select from 'react-select';

// Lista completă cu opere și categorii
const opereList = [
    {
        titlu: 'Moara cu noroc',
        autor: 'Ioan Slavici',
        data: 'Redactare: 1880',
        img: '/public/opere/moara-cu-noroc.png',
        categorie: 'nuvela',
        canonic: true
    },
    {
        titlu: 'Ion',
        autor: 'Liviu Rebreanu',
        data: 'Redactare: 1920',
        img: '/public/opere/Ion.png',
        categorie: 'roman',
        romanSubcategorie: 'roman-social',
        canonic: true
    },
    {
        titlu: 'O scrisoare pierdută',
        autor: 'I.L. Caragiale',
        data: 'Redactare: 1884',
        img: '/public/opere/scrisoare-pierduta.png',
        categorie: 'comedie',
        canonic: true
    },
    {
        titlu: 'Luceafărul',
        autor: 'Mihai Eminescu',
        data: 'Redactare: 1883',
        img: '/public/opere/Luceafarul.png',
        categorie: 'poezie',
        canonic: true
    },
    {
        titlu: 'Harap-Alb',
        autor: 'Ion Creangă',
        data: 'Redactare: 1877',
        img: '/public/opere/Harap-Alb.png',
        categorie: 'basm',
        canonic: true
    },
    {
        titlu: 'Enigma Otiliei',
        autor: 'George Călinescu',
        data: 'Redactare: 1938',
        img: '/public/opere/enigma-otiliei.png',
        categorie: 'roman',
        romanSubcategorie: 'roman-balzacian',
        canonic: true
    },
    {
        titlu: 'Baltagul',
        autor: 'Mihail Sadoveanu',
        data: 'Redactare: 1930',
        img: '/public/opere/baltagul.png',
        categorie: 'roman',
        romanSubcategorie: 'roman-mitic',
        canonic: true
    },
    {
        titlu: 'Plumb',
        autor: 'George Bacovia',
        data: 'Redactare: 1916',
        img: '/public/opere/plumb.png',
        categorie: 'poezie',
        canonic: true
    },
    {
        titlu: 'Mara',
        autor: 'Ioan Slavici',
        data: 'Redactare: 1894',
        img: '/public/opere/mara.png',
        categorie: 'nuvela',
        canonic: true
    },
    {
        titlu: 'Ultima noapte de dragoste, întaia noapte de razboi',
        autor: 'Camil Petrescu',
        data: 'Redactare: 1930',
        img: '/public/opere/ultima-noapte.png',
        categorie: 'roman',
        romanSubcategorie: 'roman-subiectiv',
        canonic: true
    },
    {
        titlu: 'Riga crypto si lapona enigel',
        autor: 'Ion Barbu',
        data: 'Redactare: 1930',
        img: '/public/opere/riga-crypto.png',
        categorie: 'poezie',
        canonic: true
    },
    {
        titlu: 'Eu nu strivesc corola de minuni a lumii',
        autor: 'Lucian Blaga',
        data: 'Redactare: 1919',
        img: '/public/opere/corola-minuni.png',
        categorie: 'poezie',
        canonic: true
    },
    {
        titlu: 'Testament',
        autor: 'Tudor Arghezi',
        data: 'Redactare: 1927',
        img: '/public/opere/testament.png',
        categorie: 'poezie',
        canonic: true
    },
    {
        titlu: 'Morometii',
        autor: 'Marin Preda',
        data: 'Redactare: 1955/1967',
        img: '/public/opere/morometii.png',
        categorie: 'roman',
        romanSubcategorie: 'roman-autobiografic',
        canonic: true
    },
    {
        titlu: 'Leoaică tânără, iubirea',
        autor: 'Nichita Stănescu',
        data: 'Redactare: 1964',
        img: '/public/opere/leoaica-iubirea.png',
        categorie: 'poezie',
        canonic: true
    },
    {
        titlu: 'Iona',
        autor: 'Marin Sorescu',
        data: 'Redactare: 1968',
        img: '/public/opere/iona.png',
        categorie: 'comedie',
        canonic: true
    },
    {
        titlu: 'Formele fara fond',
        autor: 'Titu Maiorescu',
        data: 'Redactare: 1868',
        img: '/public/opere/formele.png',
        categorie: 'critica',
        canonic: true
    },
    {
        titlu: 'Amintiri din copilărie',
        autor: 'Ion Creangă',
        data: 'Redactare: 1881-1892',
        img: '/public/opere/amintiri-copil.png',
        categorie: 'roman',
        romanSubcategorie: 'roman-autobiografic',
        canonic: false
    },
    {
        titlu: 'Răscoala',
        autor: 'Liviu Rebreanu',
        data: 'Redactare: 1932',
        img: '/public/opere/rascoala.png',
        categorie: 'roman',
        romanSubcategorie: 'roman-social',
        canonic: false
    },
    {
        titlu: 'Hanul Ancuţei',
        autor: 'Mihail Sadoveanu',
        data: 'Redactare: 1928',
        img: '/public/opere/hanul-ancutei.png',
        categorie: 'nuvela',
        canonic: false
    },
    {
        titlu: 'Maytreyi',
        autor: 'Mircea Eliade',
        data: 'Redactare: 1933',
        img: '/public/opere/maytreyi.png',
        categorie: 'roman',
        romanSubcategorie: 'roman-autobiografic',
        canonic: false
    },
    {
        titlu: 'Alexandru Lăpușneanu',
        autor: 'Costache Negruzzi',
        data: 'Redactare: 1840',
        img: '/public/opere/lapusneanu.png',
        categorie: 'roman',
        romanSubcategorie: 'roman-istoric',
        canonic: false
    },
    {
        titlu: 'Aci sosi pe vremuri',
        autor: 'Ion Pillat',
        data: 'Redactare: 1923',
        img: '/public/opere/aci-sosi.png',
        categorie: 'poezie',
        canonic: false
    },
    {
        titlu: 'În Grădina Ghetsimani',
        autor: 'Vasile Voiculescu',
        data: 'Redactare: 1921',
        img: '/public/opere/gradina-ghetsimani.png',
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

export default function Opre() {
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

    return (
        <>
            <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled} />
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
                            placeholder="Caută opere..."
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
                    alignItems: 'center',
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
                    
                    {/* Dropdown Subcategorii Roman - în linie cu butoanele */}
                    {selectedCategory === 'roman' && (
                        <div style={{ minWidth: 200, flexShrink: 0, marginLeft: '8rem' }}>
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
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '2.2rem',
                    width: '100%',
                    maxWidth: 1300,
                    justifyItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    padding: '0 1.5rem',
                }}>
                    {filteredOpere.map((opera, idx) => (
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

                {/* Mesaj când nu sunt rezultate */}
                {filteredOpere.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: '3rem 1.5rem',
                        color: darkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(60,40,20,0.7)',
                        fontSize: '1.2rem',
                        fontWeight: '500'
                    }}>
                        Nu s-au găsit opere care să corespundă criteriilor de căutare.
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
} 
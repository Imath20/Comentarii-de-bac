import React, { useEffect, useState } from 'react';
import Navbar from '../assets/Navbar';
import Footer from '../assets/Footer';
import '../styles/style.scss';
import '../styles/subiecte.scss';
import Select from 'react-select';

// Lista completă cu subiecte
const subiecteList = [
    {
        titlu: 'Analiza unui text literar',
        descriere: 'Analizează un text literar din perspectiva tematică, stilistică și a compoziției. Identifică elementele specifice genului literar și argumentează cu exemple din text.',
        numarSubiect: 1,
        data: '2024',
        an: 2024,
        tip: 'analiza'
    },
    {
        titlu: 'Compoziția pe o temă dată',
        descriere: 'Scrie o compoziție pe o temă dată, folosind exemple din literatura română și universală. Demonstrează cunoștințele literare și capacitatea de argumentare.',
        numarSubiect: 2,
        data: '2024',
        an: 2024,
        tip: 'compozitie'
    },
    {
        titlu: 'Analiza comparativă',
        descriere: 'Realizează o analiză comparativă între două opere literare, evidențiind asemănările și deosebirile din perspectiva tematică, stilistică și a compoziției.',
        numarSubiect: 3,
        data: '2024',
        an: 2024,
        tip: 'comparativ'
    },
    {
        titlu: 'Analiza unui text literar',
        descriere: 'Analizează un text literar din perspectiva tematică, stilistică și a compoziției. Identifică elementele specifice genului literar și argumentează cu exemple din text.',
        numarSubiect: 1,
        data: '2023',
        an: 2023,
        tip: 'analiza'
    },
    {
        titlu: 'Compoziția pe o temă dată',
        descriere: 'Scrie o compoziție pe o temă dată, folosind exemple din literatura română și universală. Demonstrează cunoștințele literare și capacitatea de argumentare.',
        numarSubiect: 2,
        data: '2023',
        an: 2023,
        tip: 'compozitie'
    },
    {
        titlu: 'Analiza comparativă',
        descriere: 'Realizează o analiză comparativă între două opere literare, evidențiind asemănările și deosebirile din perspectiva tematică, stilistică și a compoziției.',
        numarSubiect: 3,
        data: '2023',
        an: 2023,
        tip: 'comparativ'
    },
    {
        titlu: 'Analiza unui text literar',
        descriere: 'Analizează un text literar din perspectiva tematică, stilistică și a compoziției. Identifică elementele specifice genului literar și argumentează cu exemple din text.',
        numarSubiect: 1,
        data: '2022',
        an: 2022,
        tip: 'analiza'
    },
    {
        titlu: 'Compoziția pe o temă dată',
        descriere: 'Scrie o compoziție pe o temă dată, folosind exemple din literatura română și universală. Demonstrează cunoștințele literare și capacitatea de argumentare.',
        numarSubiect: 2,
        data: '2022',
        an: 2022,
        tip: 'compozitie'
    },
    {
        titlu: 'Analiza comparativă',
        descriere: 'Realizează o analiză comparativă între două opere literare, evidențiind asemănările și deosebirile din perspectiva tematică, stilistică și a compoziției.',
        numarSubiect: 3,
        data: '2022',
        an: 2022,
        tip: 'comparativ'
    },
    {
        titlu: 'Analiza unui text literar',
        descriere: 'Analizează un text literar din perspectiva tematică, stilistică și a compoziției. Identifică elementele specifice genului literar și argumentează cu exemple din text.',
        numarSubiect: 1,
        data: '2021',
        an: 2021,
        tip: 'analiza'
    },
    {
        titlu: 'Compoziția pe o temă dată',
        descriere: 'Scrie o compoziție pe o temă dată, folosind exemple din literatura română și universală. Demonstrează cunoștințele literare și capacitatea de argumentare.',
        numarSubiect: 2,
        data: '2021',
        an: 2021,
        tip: 'compozitie'
    },
    {
        titlu: 'Analiza comparativă',
        descriere: 'Realizează o analiză comparativă între două opere literare, evidențiind asemănările și deosebirile din perspectiva tematică, stilistică și a compoziției.',
        numarSubiect: 3,
        data: '2021',
        an: 2021,
        tip: 'comparativ'
    }
];

const tipuriSubiecte = [
    { id: 'toate', nume: 'Toate subiectele' },
    { id: '1', nume: 'Subiect 1' },
    { id: '2', nume: 'Subiect 2' },
    { id: '3', nume: 'Subiect 3' }
];

const ani = [
    { id: 'toate', nume: 'Toți anii' },
    { id: '2024', nume: '2024' },
    { id: '2023', nume: '2023' },
    { id: '2022', nume: '2022' },
    { id: '2021', nume: '2021' },
    { id: '2020', nume: '2020' },
    { id: '2019', nume: '2019' }
];

// Opțiuni pentru react-select
const tipOptions = tipuriSubiecte.map(tip => ({ value: tip.id, label: tip.nume }));
const anOptions = ani.map(an => ({ value: an.id, label: an.nume }));

const customSelectStyles = (darkTheme) => ({
    control: (provided, state) => ({
        ...provided,
        minWidth: 180,
        maxWidth: 240,
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
        fontWeight: 500,
        fontSize: '1.13rem',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: darkTheme ? 'rgba(255,255,255,0.6)' : '#666',
        fontWeight: 500,
        fontSize: '1.13rem',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: darkTheme ? '#a97c50' : '#666',
        paddingRight: '1.5rem',
        '&:hover': {
            color: darkTheme ? '#ffd591' : '#333',
        },
    }),
});

export default function Subiecte() {
    const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
    const [scrolled, setScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTip, setSelectedTip] = useState('toate');
    const [selectedAn, setSelectedAn] = useState('toate');

    useEffect(() => {
        document.body.classList.toggle('dark-theme', darkTheme);
        localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
    }, [darkTheme]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Filtrare subiecte
    const filteredSubiecte = subiecteList.filter(subiect => {
        const matchesSearch = subiect.titlu.toLowerCase().includes(searchTerm.toLowerCase()) ||
            subiect.descriere.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTip = selectedTip === 'toate' || subiect.numarSubiect.toString() === selectedTip;
        const matchesAn = selectedAn === 'toate' || subiect.an.toString() === selectedAn;

        return matchesSearch && matchesTip && matchesAn;
    });

    return (
        <>
            <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled} />

            <div className="page-hero">
                <h1 className="page-title">
                    {'Subiecte de BAC'.split(' ').map((word, wi) => (
                        <span className="page-title-word" key={wi}>
                            {word.split('').map((l, i) => <span key={i}>{l}</span>)}
                        </span>
                    ))}
                </h1>
                <p className="page-desc">Explorează subiectele de la Bacalaureat din anii anteriori și familiarizează-te cu tipurile de cerințe</p>
            </div>

            <div className="container">
                <div className="subiecte-container">
                    {/* Search Bar și Filtre */}
                    <div className="subiecte-search-section">
                        {/* Search Bar */}
                    <div className="subiecte-search-container">
                        <div className={`subiecte-search-icon ${darkTheme ? 'dark-theme' : ''}`}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Caută subiecte..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`subiecte-search-input ${darkTheme ? 'dark-theme' : ''}`}
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
                    {/* Dropdown Tip cu react-select */}
                    <div className="subiecte-select-container">
                        <Select
                            options={tipOptions}
                            value={tipOptions.find(opt => opt.value === selectedTip)}
                            onChange={opt => setSelectedTip(opt.value)}
                            styles={customSelectStyles(darkTheme)}
                            isSearchable={false}
                            menuPlacement="auto"
                            placeholder="Subiect"
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
                    {/* Dropdown An cu react-select */}
                    <div className="subiecte-select-container">
                        <Select
                            options={anOptions}
                            value={anOptions.find(opt => opt.value === selectedAn)}
                            onChange={opt => setSelectedAn(opt.value)}
                            styles={customSelectStyles(darkTheme)}
                            isSearchable={false}
                            menuPlacement="auto"
                            placeholder="An"
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

                {/* Butoane tipuri subiecte sub search bar */}
                <div className="subiecte-filter-buttons">
                    {tipuriSubiecte.filter(t => t.id !== 'toate').map(tip => (
                        <button
                            key={tip.id}
                            onClick={() => setSelectedTip(tip.id)}
                            className={`subiecte-filter-button ${darkTheme ? 'dark-theme' : ''} ${selectedTip === tip.id ? 'selected' : ''}`}
                        >
                            {tip.nume}
                        </button>
                    ))}
                </div>

                {/* Grid Subiecte */}
                <div className="subiecte-grid-container">
                    {filteredSubiecte.map((subiect, idx) => (
                        <div
                            key={`${subiect.numarSubiect}-${subiect.an}`}
                            className={`subiecte-card ${darkTheme ? 'dark-theme' : ''}`}
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
                            {/* Background gradient */}
                            <div className={`subiecte-card-bg ${darkTheme ? 'dark-theme' : ''}`} />
                            {/* Content */}
                            <div className="subiecte-card-content">
                                <div className="subiecte-card-title">{subiect.titlu}</div>
                                <div className="subiecte-card-description">{subiect.descriere}</div>
                                <div className="subiecte-card-footer">
                                    <div className={`subiecte-card-date ${darkTheme ? 'dark-theme' : ''}`}>
                                        {subiect.data}
                                    </div>
                                    <div className={`subiecte-card-number ${darkTheme ? 'dark-theme' : ''}`}>
                                        Subiect {subiect.numarSubiect}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mesaj când nu sunt rezultate */}
                {filteredSubiecte.length === 0 && (
                    <div className={`subiecte-no-results ${darkTheme ? 'dark-theme' : ''}`}>
                        Nu s-au găsit subiecte care să corespundă criteriilor de căutare.
                    </div>
                )}
            </div>
        </div >
            <Footer darkTheme={darkTheme} />
        </>
    );
} 
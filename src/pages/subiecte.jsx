import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SubiectModal from '../assets/SubiectModal';
import Layout from '../assets/Layout';
import '../styles/style.scss';
import '../styles/subiecte.scss';
import Select from 'react-select';
import subiecteList from '../data/subiecte';
const tipuriSubiecte = [
    { id: 'toate', nume: 'Toate subiectele' },
    { id: '1', nume: 'Subiect 1' },
    { id: '2', nume: 'Subiect 2' },
    { id: '3', nume: 'Subiect 3' }
];

const ani = [
    { id: 'toate', nume: 'Toți anii' },
    { id: '2025', nume: '2025' },
    { id: '2024', nume: '2024' },
    { id: '2023', nume: '2023' },
    { id: '2022', nume: '2022' },
    { id: '2021', nume: '2021' },
    { id: '2020', nume: '2020' },
    { id: '2019', nume: '2019' }
];

const sesiuni = [
    { id: 'toate', nume: 'Toate sesiunile' },
    { id: 'sesiune de vară', nume: 'Sesiune de vară' },
    { id: 'sesiune specială', nume: 'Sesiune specială' },
    { id: 'sesiune de toamnă', nume: 'Sesiune de toamnă' },
    { id: 'model', nume: 'Model' },
    { id: 'rezervă', nume: 'Rezervă' },
    { id: 'simulare', nume: 'Simulare' }
];

// Opțiuni pentru react-select
const tipOptions = tipuriSubiecte.map(tip => ({ value: tip.id, label: tip.nume }));
const anOptions = ani.map(an => ({ value: an.id, label: an.nume }));
const sesiuneOptions = sesiuni.map(sesiune => ({ value: sesiune.id, label: sesiune.nume }));
// Opțiuni subpunct pentru Subiectul 1 (A/B scurt)
const subpunctOptions = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' }
];

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
    const location = useLocation();
    const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
    const [scrolled, setScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTip, setSelectedTip] = useState('toate');
    const [selectedAn, setSelectedAn] = useState('toate');
    const [selectedSesiune, setSelectedSesiune] = useState('toate');
    const [selectedSubpunct, setSelectedSubpunct] = useState(null);
    const [selectedProfil, setSelectedProfil] = useState('real');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSubiect, setActiveSubiect] = useState(null);

    useEffect(() => {
        // Add transition class for smooth theme change
        document.body.classList.add('theme-transitioning');
        document.body.classList.toggle('dark-theme', darkTheme);
        localStorage.setItem('theme', darkTheme ? 'dark' : 'light');

        // Remove transition class after animation completes
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 400);
    }, [darkTheme]);

    useEffect(() => {
        const onScroll = () => {
            // Don't change navbar state when modal is open
            if (!isModalOpen) {
                setScrolled(window.scrollY > 10);
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [isModalOpen]);

    // Preia filtrele din URL (query sau hash) și setează filtrele inițiale
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        let tip = params.get('tip');
        let an = params.get('an');
        let profil = params.get('profil');
        let subpunct = params.get('subpunct');

        // Backward-compat: suport pentru hash vechi (#subiectul1 etc.)
        if (!tip && location.hash) {
            if (location.hash.includes('subiectul1')) tip = '1';
            else if (location.hash.includes('subiectul2')) tip = '2';
            else if (location.hash.includes('subiectul3')) tip = '3';
        }

        if (tip && ['1', '2', '3', 'toate'].includes(tip)) {
            setSelectedTip(tip);
        }

        if (an && (anOptions.some(o => o.value === an))) {
            setSelectedAn(an);
        } else if (an === 'toate') {
            setSelectedAn('toate');
        }

        if (profil && (profil === 'uman' || profil === 'real')) {
            setSelectedProfil(profil);
        }

        if ((tip === '1') && (subpunct === 'A' || subpunct === 'B')) {
            setSelectedSubpunct(subpunct);
        }
    }, [location.search, location.hash]);

    // Resetează subpunctul când nu este selectat Subiectul 1
    useEffect(() => {
        if (selectedTip !== '1') {
            setSelectedSubpunct(null);
        }
    }, [selectedTip]);

    // Filtrare subiecte
    const filteredSubiecte = subiecteList.filter(subiect => {
        // Search in title and description
        const searchLower = searchTerm.toLowerCase();
        const titluLower = subiect.titlu ? subiect.titlu.toLowerCase() : '';
        const descriereLower = subiect.descriere ? subiect.descriere.toLowerCase() : '';

        const matchesSearch = !searchTerm ||
            titluLower.includes(searchLower) ||
            descriereLower.includes(searchLower);

        const matchesTip = selectedTip === 'toate' || subiect.numarSubiect.toString() === selectedTip;
        const matchesAn = selectedAn === 'toate' || subiect.an.toString() === selectedAn;
        const matchesSesiune = selectedSesiune === 'toate' || subiect.sesiune === selectedSesiune;
        // dacă este Subiectul 1 și există un subpunct selectat, filtrează și după subpunct
        const matchesSubpunct = selectedTip === '1' && selectedSubpunct
            ? subiect.subpunct === selectedSubpunct
            : true;
        // filtrează după profil (Uman/Real) pentru toate subiectele care au profil definit
        const matchesProfil = subiect.profil
            ? subiect.profil === selectedProfil
            : true;

        // Debug logging
        if (searchTerm) {
            console.log('=== Debug Search ===');
            console.log('Search term:', searchTerm);
            console.log('Title:', subiect.titlu);
            console.log('Description:', subiect.descriere);
            console.log('Matches search:', matchesSearch);
            console.log('Matches tip:', matchesTip);
            console.log('Matches an:', matchesAn);
            console.log('Matches sesiune:', matchesSesiune);
            console.log('Matches profil:', matchesProfil);
            console.log('Final result:', matchesSearch && matchesTip && matchesAn && matchesSesiune && matchesSubpunct && matchesProfil);
        }

        return matchesSearch && matchesTip && matchesAn && matchesSesiune && matchesSubpunct && matchesProfil;
    });

    const openSubiectModal = (subiect) => {
        setActiveSubiect(subiect);
        setIsModalOpen(true);
    };

    const closeSubiectModal = () => {
        setIsModalOpen(false);
        setActiveSubiect(null);
    };

    return (
        <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled}>
            <div className="subiecte-page">
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
                            {/* Dropdown Subpunct doar pentru Subiectul 1 */}
                            {selectedTip === '1' && (
                                <div className="subiecte-select-container">
                                    <Select
                                        options={subpunctOptions}
                                        value={subpunctOptions.find(opt => opt.value === selectedSubpunct) || null}
                                        onChange={opt => setSelectedSubpunct(opt?.value ?? null)}
                                        styles={customSelectStyles(darkTheme)}
                                        isSearchable={false}
                                        menuPlacement="auto"
                                        placeholder="A/B"
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
                            {/* Dropdown An cu react-select */}
                            <div className="subiecte-select-container">
                                <Select
                                    options={anOptions}
                                    value={anOptions.find(opt => opt.value === selectedAn)}
                                    onChange={opt => setSelectedAn(opt.value)}
                                    classNamePrefix="subiecte-an"
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

                            {/* Dropdown Sesiune */}
                            <div className="subiecte-select-container subiecte-sesiune-dropdown">
                                <Select
                                    options={sesiuneOptions}
                                    value={sesiuneOptions.find(opt => opt.value === selectedSesiune)}
                                    onChange={opt => setSelectedSesiune(opt.value)}
                                    styles={customSelectStyles(darkTheme)}
                                    isSearchable={false}
                                    menuPlacement="auto"
                                    placeholder="Sesiune"
                                    classNamePrefix="subiecte-sesiune"
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

                            <div
                                className={`subiecte-segmented ${darkTheme ? 'dark-theme' : ''} ${selectedProfil === 'real' ? 'opt-uman' : 'opt-real'}`}
                                role="tablist"
                                aria-label="Profil"
                            >
                                <div className="seg-thumb" aria-hidden="true" />
                                <button
                                    type="button"
                                    className="seg-option left"
                                    role="tab"
                                    aria-selected={selectedProfil === 'real'}
                                    onClick={() => setSelectedProfil('real')}
                                >
                                    Real
                                </button>
                                <button
                                    type="button"
                                    className="seg-option right"
                                    role="tab"
                                    aria-selected={selectedProfil === 'uman'}
                                    onClick={() => setSelectedProfil('uman')}
                                >
                                    Uman
                                </button>
                            </div>
                        </div>

                        {/* Grid Subiecte */}
                        <div className="subiecte-grid-container">
                            {filteredSubiecte.map((subiect, idx) => (
                                <div
                                    key={`subiect-${idx}-${subiect.numarSubiect}-${subiect.an}-${subiect.profil || 'P'}-${subiect.subpunct || 'N'}`}
                                    className={`subiecte-card ${darkTheme ? 'dark-theme' : ''}`}
                                    onClick={() => openSubiectModal(subiect)}
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
                                        {/* Badge profil în colțul dreapta-sus */}
                                        <div className={`subiecte-card-profil ${darkTheme ? 'dark-theme' : ''}`}>
                                            {subiect.profil ? subiect.profil.toUpperCase() : ''}
                                        </div>
                                        {/* Badge sesiune în stânga sus */}
                                        {subiect.sesiune && (
                                            <div className={`subiecte-card-sesiune ${darkTheme ? 'dark-theme' : ''}`}>
                                                {subiect.sesiune}
                                            </div>
                                        )}
                                        <div className="subiecte-card-title">{subiect.titlu}</div>
                                        <div className="subiecte-card-description">{subiect.descriere}</div>
                                        <div className="subiecte-card-footer">
                                            <div className={`subiecte-card-date ${darkTheme ? 'dark-theme' : ''}`}>
                                                {subiect.data}
                                            </div>
                                            <div className={`subiecte-card-number ${darkTheme ? 'dark-theme' : ''}`}>
                                                {subiect.numarSubiect === 1
                                                    ? `Subiect 1 - ${subiect.subpunct}`
                                                    : `Subiect ${subiect.numarSubiect}`}
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
                </div>
            </div>

            {/* Modal pentru subiect */}
            {isModalOpen && (
                <SubiectModal
                    isOpen={isModalOpen}
                    subiect={activeSubiect}
                    darkTheme={darkTheme}
                    onClose={closeSubiectModal}
                />
            )}

            {/* Floating Theme Toggle */}
            {/* <button
                className="floating-theme-toggle"
                onClick={() => setDarkTheme(!darkTheme)}
                aria-label="Schimbă tema"
                title={darkTheme ? 'Trece la tema luminoasă' : 'Trece la tema întunecată'}
            >
                {darkTheme ? '🌞' : '🌙'}
            </button> */}
        </Layout>
    );
} 
import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../assets/Layout';
import Select from 'react-select';
import '../styles/style.scss';
import '../styles/comentarii.scss'
import comentariiList from '../data/comentarii';

// Genuri aliniate cu pagina Biblioteca
const categorii = [
    { id: 'toate', nume: 'Toate categoriile' },
    { id: 'poezie', nume: 'Poezie' },
    { id: 'roman', nume: 'Roman' },
    { id: 'comedie', nume: 'Comedie' },
    { id: 'basm', nume: 'Basm' },
    { id: 'nuvela', nume: 'Nuvelă' },
    { id: 'critica', nume: 'Critică literară' },
    { id: 'memorii', nume: 'Memorii' },
    { id: 'poveste', nume: 'Poveste' },
    { id: 'schita', nume: 'Schiţă' }
];
const genOptions = categorii.map(categorie => ({ value: categorie.id, label: categorie.nume }));
// Prompturi rapide reduse
const categoriiQuick = categorii.filter(c => ['poezie', 'roman', 'comedie', 'nuvela', 'basm'].includes(c.id));

const customSelectStyles = (darkTheme) => ({
    control: (provided, state) => ({
        ...provided,
        // Allow the control to grow so long labels like "Toate categoriile" fit
        minWidth: 240,
        width: 'fit-content',
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
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: darkTheme ? '#a97c50' : '#666',
        paddingRight: '1.5rem',
        '&:hover': { color: darkTheme ? '#ffd591' : '#333' },
    }),
});

const planOptions = [
    { value: 'toate', label: 'Toate planurile' },
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'premium', label: 'Premium' },
];

const sortOptions = [
    { value: 'none', label: 'Fără sortare' },
    { value: 'az', label: 'A-Z' },
];

const Crown = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        <path d="M8 14l4-4 4 4" />
    </svg>
);

const Diamond = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 13L2 9l4-6z" />
        <path d="M11 3L8 9l4 13 4-13-3-6" />
    </svg>
);

export default function Comentarii() {
    const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
    const [scrolled, setScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategorie, setSelectedCategorie] = useState('toate');
    const [selectedPlan, setSelectedPlan] = useState('toate');
    const [sortOption, setSortOption] = useState('none');

    useEffect(() => {
        document.body.classList.add('theme-transitioning');
        document.body.classList.toggle('dark-theme', darkTheme);
        localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
        const t = setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 400);
        return () => clearTimeout(t);
    }, [darkTheme]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const categorieOptions = useMemo(() => genOptions, []);

    const filtered = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();
        return comentariiList.filter(c => {
            const matchesSearch = !q || c.titlu.toLowerCase().includes(q) || (c.descriere || '').toLowerCase().includes(q) || (c.categorie || '').toLowerCase().includes(q);
            const matchesCategorie = selectedCategorie === 'toate' || c.categorie === selectedCategorie;
            const matchesPlan = selectedPlan === 'toate' || c.plan === selectedPlan;
            return matchesSearch && matchesCategorie && matchesPlan;
        });
    }, [searchTerm, selectedCategorie, selectedPlan]);

    const sorted = useMemo(() => {
        const arr = [...filtered];
        switch (sortOption) {
            case 'az':
                return arr.sort((a, b) => a.titlu.localeCompare(b.titlu, 'ro', { sensitivity: 'base' }));
            default:
                return arr;
        }
    }, [filtered, sortOption]);

    return (
        <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled}>
            <div className="comentarii-page">
                <div className="page-hero">
                    <h1 className="page-title">
                        {'Comentarii'.split(' ').map((word, wi) => (
                            <span className="page-title-word" key={wi}>
                                {word.split('').map((l, i) => <span key={i}>{l}</span>)}
                            </span>
                        ))}
                    </h1>
            <p className="page-desc">Comentarii fără imagini, filtrabile după gen și plan</p>
                </div>

                <div className="container">
                    <div className="comentarii-container">
                        <div className="comentarii-search-section">
                            <div className="comentarii-search-container">
                                <div className={`comentarii-search-icon ${darkTheme ? 'dark-theme' : ''}`}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.35-4.35"></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Caută comentarii..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={`comentarii-search-input ${darkTheme ? 'dark-theme' : ''}`}
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

                            <div className="comentarii-select-container">
                                <Select
                                    options={categorieOptions}
                                    value={categorieOptions.find(opt => opt.value === selectedCategorie)}
                                    onChange={opt => setSelectedCategorie(opt.value)}
                                    styles={customSelectStyles(darkTheme)}
                                    isSearchable={false}
                                    menuPlacement="auto"
                                    placeholder="Gen"
                                    className="categories-select"
                                    classNamePrefix="categories"
                                />
                            </div>

                            <div className="comentarii-select-container">
                                <Select
                                    options={planOptions}
                                    value={planOptions.find(opt => opt.value === selectedPlan)}
                                    onChange={opt => setSelectedPlan(opt.value)}
                                    styles={customSelectStyles(darkTheme)}
                                    isSearchable={false}
                                    menuPlacement="auto"
                                    placeholder="Plan"
                                />
                            </div>
                        </div>

                        {/* Genuri + Sortare pe același rând */}
                        <div className="comentarii-filter-buttons">
                            <div className="comentarii-filter-buttons-left" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                                {categoriiQuick.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategorie(cat.id)}
                                        className={`comentarii-filter-button ${darkTheme ? 'dark-theme' : ''} ${selectedCategorie === cat.id ? 'selected' : ''}`}
                                    >
                                        {cat.nume}
                                    </button>
                                ))}
                            </div>
                            <div className="comentarii-select-container comentarii-sort-container">
                                <Select
                                    options={sortOptions}
                                    value={sortOptions.find(opt => opt.value === sortOption)}
                                    onChange={opt => setSortOption(opt.value)}
                                    styles={customSelectStyles(darkTheme)}
                                    isSearchable={false}
                                    menuPlacement="auto"
                                    placeholder="Sortare"
                                />
                            </div>
                        </div>

                        {/* Eliminat duplicatul de sortare de jos */}

                        <div className="comentarii-grid-container">
                            {sorted.map((c) => (
                                <div key={c.id} className={`comentarii-card ${darkTheme ? 'dark-theme' : ''}`}>
                                    <div className={`comentarii-card-bg ${darkTheme ? 'dark-theme' : ''}`} />
                                    <div className="comentarii-card-content">
                                        <div className={`comentarii-card-profil ${darkTheme ? 'dark-theme' : ''}`}>
                                            {c.plan === 'premium' ? <Crown size={16} /> : c.plan === 'pro' ? <Diamond size={16} /> : 'GRATIS'}
                                        </div>
                                        <div className="comentarii-card-title">{c.titlu}</div>
                                        <div className="comentarii-card-description">{c.autor}{c.descriere ? ` — ${c.descriere}` : ''}</div>
                                        <div className="comentarii-card-footer">
                                            <div className={`comentarii-card-date ${darkTheme ? 'dark-theme' : ''}`}>
                                                {c.autor}
                                            </div>
                                            <div className={`comentarii-card-number ${darkTheme ? 'dark-theme' : ''}`}>
                                                {c.plan === 'premium' ? 'Premium' : c.plan === 'pro' ? 'Pro' : 'Free'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {sorted.length === 0 && (
                            <div className={`comentarii-no-results ${darkTheme ? 'dark-theme' : ''}`}>
                                Nu s-au găsit comentarii după criteriile alese.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}



import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SubiectModal from '../assets/SubiectModal';
import Layout from '../assets/Layout';
import AdminAddButton from '../components/AdminAddButton';
import '../styles/style.scss';
import '../styles/subiecte.scss';
import Select from 'react-select';
import subiecteList from '../data/subiecte';
import { fetchSubiecteBatch } from '../firebase/subiecteService';
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

const FIRESTORE_ORDER_FIELD = 'createdAt';

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
    const navigate = useNavigate();
    const PAGE_SIZE = 12;
    const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
    const [scrolled, setScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTip, setSelectedTip] = useState('toate');
    const [selectedAn, setSelectedAn] = useState('toate');
    const [selectedSesiune, setSelectedSesiune] = useState('toate');
    const [selectedSubpunct, setSelectedSubpunct] = useState(null);
    const [selectedProfil, setSelectedProfil] = useState('real');
    const [sortOption, setSortOption] = useState('cronologic-desc');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSubiect, setActiveSubiect] = useState(null);
    const [subiecte, setSubiecte] = useState([]);
    const [loadingSubiecte, setLoadingSubiecte] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [lastFetchedDoc, setLastFetchedDoc] = useState(null);
    const [hasMoreSubiecte, setHasMoreSubiecte] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [usingLocalFallback, setUsingLocalFallback] = useState(false);
    const [localLoadedCount, setLocalLoadedCount] = useState(0);

    const firestoreOrderDirection = useMemo(() => {
        if (sortOption === 'cronologic-asc') {
            return 'asc';
        }
        return 'desc';
    }, [sortOption]);

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

    useEffect(() => {
        let isMounted = true;

        async function loadInitialSubiecte() {
            setLoadingSubiecte(true);
            setFetchError(null);
            setSubiecte([]);
            setLastFetchedDoc(null);
            setHasMoreSubiecte(true);
            setUsingLocalFallback(false);
            setLocalLoadedCount(0);

            try {
                const { items, lastDoc } = await fetchSubiecteBatch({
                    limit: PAGE_SIZE,
                    orderByField: FIRESTORE_ORDER_FIELD,
                    orderDirection: firestoreOrderDirection,
                });
                if (!isMounted) return;

                if (Array.isArray(items) && items.length > 0) {
                    setSubiecte(items);
                    setLastFetchedDoc(lastDoc || null);
                    setHasMoreSubiecte(items.length === PAGE_SIZE);
                    setUsingLocalFallback(false);
                    setLocalLoadedCount(items.length);
                } else {
                    setSubiecte([]);
                    setLastFetchedDoc(null);
                    setHasMoreSubiecte(false);
                    setUsingLocalFallback(false);
                    setLocalLoadedCount(0);
                    setFetchError('Nu există subiecte în baza de date. Adaugă subiecte din consola de administrare.');
                }
            } catch (error) {
                if (!isMounted) return;
                console.error('❌ Eroare la încărcarea subiectelor din Firestore:', error);
                setFetchError('Nu am reușit să preiau subiectele din baza de date. Se afișează varianta locală.');

                const initialLocal = subiecteList.slice(0, PAGE_SIZE);
                setSubiecte(initialLocal);
                setLastFetchedDoc(null);
                setHasMoreSubiecte(initialLocal.length < subiecteList.length);
                setUsingLocalFallback(true);
                setLocalLoadedCount(initialLocal.length);
            } finally {
                if (isMounted) {
                    setLoadingSubiecte(false);
                }
            }
        }

        loadInitialSubiecte();

        return () => {
            isMounted = false;
        };
    }, [PAGE_SIZE, firestoreOrderDirection]);

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

    const loadMoreSubiecte = useCallback(async () => {
        if (loadingSubiecte || isLoadingMore || !hasMoreSubiecte) {
            return;
        }

        setIsLoadingMore(true);

        try {
            if (usingLocalFallback) {
                const startIndex = localLoadedCount;
                const nextItems = subiecteList.slice(startIndex, startIndex + PAGE_SIZE);

                if (nextItems.length > 0) {
                    setSubiecte(prev => [...prev, ...nextItems]);
                    setLocalLoadedCount(prev => prev + nextItems.length);
                }

                if (startIndex + nextItems.length >= subiecteList.length) {
                    setHasMoreSubiecte(false);
                }
            } else {
                const { items, lastDoc } = await fetchSubiecteBatch({
                    limit: PAGE_SIZE,
                    cursor: lastFetchedDoc,
                    orderByField: FIRESTORE_ORDER_FIELD,
                    orderDirection: firestoreOrderDirection,
                });

                if (items.length > 0) {
                    setSubiecte(prev => [...prev, ...items]);
                }

                setLastFetchedDoc(items.length > 0 ? lastDoc || null : null);

                if (items.length < PAGE_SIZE) {
                    setHasMoreSubiecte(false);
                }
            }
        } catch (error) {
            console.error('❌ Eroare la încărcarea subiectelor suplimentare:', error);
            setHasMoreSubiecte(false);
        } finally {
            setIsLoadingMore(false);
        }
    }, [
        loadingSubiecte,
        isLoadingMore,
        hasMoreSubiecte,
        usingLocalFallback,
        localLoadedCount,
        PAGE_SIZE,
        lastFetchedDoc,
        firestoreOrderDirection,
    ]);

    const handleInfiniteScroll = useCallback(() => {
        if (loadingSubiecte || isLoadingMore || !hasMoreSubiecte) {
            return;
        }

        const scrollPosition = window.innerHeight + window.scrollY;
        const threshold = document.documentElement.scrollHeight - 400;

        if (scrollPosition >= threshold) {
            loadMoreSubiecte();
        }
    }, [loadingSubiecte, isLoadingMore, hasMoreSubiecte, loadMoreSubiecte]);

    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll);
        return () => {
            window.removeEventListener('scroll', handleInfiniteScroll);
        };
    }, [handleInfiniteScroll]);

    // Duplica automat subiectele de la profilul Real către Uman pentru 1A/1B și 2
    const augmentedSubiecte = useMemo(() => {
        if (selectedProfil !== 'uman') {
            return subiecte;
        }

        const candidates = (subiecte || []).filter((subiect) => {
            const profilValue = subiect.profil ? String(subiect.profil).toLowerCase() : '';
            if (profilValue && profilValue !== 'real') {
                return false;
            }

            const numar = subiect.numarSubiect ?? subiect.numar ?? null;
            const numarStr = numar != null ? String(numar) : '';
            const subpunctValue = subiect.subpunct ? String(subiect.subpunct).toUpperCase() : '';

            const isSubiect1AB =
                numarStr === '1' && (subpunctValue === 'A' || subpunctValue === 'B');
            const isSubiect2 = numarStr === '2';

            return isSubiect1AB || isSubiect2;
        });

        const mirrored = candidates.map((subiect, idx) => {
            const numar = subiect.numarSubiect ?? subiect.numar ?? 'N';
            const subpunctValue = subiect.subpunct
                ? String(subiect.subpunct).toUpperCase()
                : 'X';

            return {
                ...subiect,
                profil: 'uman',
                id: `${subiect.id || `subiect-${idx}`}-uman-copy-${numar}-${subpunctValue}`,
            };
        });

        return [...subiecte, ...mirrored];
    }, [selectedProfil, subiecte]);

    const filteredSubiecte = useMemo(() => {
        const searchLower = searchTerm.trim().toLowerCase();

        return augmentedSubiecte.filter((subiect) => {
            const titluLower = subiect.titlu ? subiect.titlu.toLowerCase() : '';
            const descriereLower = subiect.descriere ? subiect.descriere.toLowerCase() : '';

            const matchesSearch =
                !searchLower ||
                titluLower.includes(searchLower) ||
                descriereLower.includes(searchLower);

            const numar = subiect.numarSubiect ?? subiect.numar ?? null;
            const matchesTip =
                selectedTip === 'toate' || String(numar ?? '') === selectedTip;

            const anValue = subiect.an ?? subiect.anul ?? null;
            const matchesAn =
                selectedAn === 'toate' ||
                (anValue != null && String(anValue) === selectedAn);

            const sesiuneValue = subiect.sesiune ?? subiect.sesiuneId ?? null;
            const matchesSesiune =
                selectedSesiune === 'toate' || sesiuneValue === selectedSesiune;

            const subpunctValue = subiect.subpunct
                ? String(subiect.subpunct).toUpperCase()
                : null;
            const matchesSubpunct =
                selectedTip === '1' && selectedSubpunct
                    ? subpunctValue === selectedSubpunct
                    : true;

            const profilValue = subiect.profil
                ? String(subiect.profil).toLowerCase()
                : null;
            const matchesProfil = profilValue
                ? profilValue === selectedProfil
                : true;

            return (
                matchesSearch &&
                matchesTip &&
                matchesAn &&
                matchesSesiune &&
                matchesSubpunct &&
                matchesProfil
            );
        });
    }, [
        augmentedSubiecte,
        searchTerm,
        selectedTip,
        selectedAn,
        selectedSesiune,
        selectedSubpunct,
        selectedProfil,
    ]);

    const sortOptions = [
        { value: 'none', label: 'Fără sortare' },
        { value: 'cronologic-asc', label: 'Cronologic ↑' },
        { value: 'cronologic-desc', label: 'Cronologic ↓' },
    ];

    const extractYear = (subiect) => {
        if (!subiect) return NaN;

        if (subiect.an !== undefined && subiect.an !== null) {
            const yearFromField = parseInt(subiect.an, 10);
            if (!Number.isNaN(yearFromField)) {
                return yearFromField;
            }
        }

        const dataStr = subiect.data ?? '';
        if (!dataStr) return NaN;
        const match = String(dataStr).match(/(\d{4})/);
        return match ? parseInt(match[1], 10) : NaN;
    };

    const sortedSubiecte = useMemo(() => {
        if (!usingLocalFallback) {
            return filteredSubiecte;
        }

        if (sortOption === 'none') {
            return [...filteredSubiecte];
        }

        return [...filteredSubiecte].sort((a, b) => {
            const yearA = extractYear(a);
            const yearB = extractYear(b);
            const yearAFinite = Number.isFinite(yearA);
            const yearBFinite = Number.isFinite(yearB);

            if (!yearAFinite && !yearBFinite) return 0;
            if (!yearAFinite) return 1;
            if (!yearBFinite) return -1;

            if (sortOption === 'cronologic-asc') {
                return yearA - yearB;
            }

            return yearB - yearA;
        });
    }, [filteredSubiecte, sortOption, usingLocalFallback]);

    useEffect(() => {
        if (loadingSubiecte || isLoadingMore) {
            return;
        }
        if (!hasMoreSubiecte) {
            return;
        }
        if (sortedSubiecte.length >= PAGE_SIZE) {
            return;
        }

        loadMoreSubiecte();
    }, [
        sortedSubiecte.length,
        PAGE_SIZE,
        hasMoreSubiecte,
        loadingSubiecte,
        isLoadingMore,
        loadMoreSubiecte,
    ]);

    const openSubiectModal = (subiect) => {
        setActiveSubiect(subiect);
        setIsModalOpen(true);
    };

    const closeSubiectModal = () => {
        setIsModalOpen(false);
        setActiveSubiect(null);
    };

    const handleSubiectDelete = (subiectId) => {
        // If the deleted subject was the active one, close the modal
        if (activeSubiect?.id === subiectId) {
            closeSubiectModal();
        }

        setSubiecte((prevSubiecte) =>
            prevSubiecte.filter((subiect) => subiect.id !== subiectId)
        );
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

                            {/* Grup centrat: Sesiune + Sortare */}
                            <div className="subiecte-sesiune-sort">
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
                                <div className="subiecte-select-container subiecte-sort-container">
                                    <Select
                                        options={sortOptions}
                                        value={sortOptions.find(opt => opt.value === sortOption)}
                                        onChange={opt => setSortOption(opt.value)}
                                        styles={customSelectStyles(darkTheme)}
                                        isSearchable={false}
                                        menuPlacement="auto"
                                        placeholder="Sortare"
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

                        {selectedTip === '1' && (
                            <div
                                className={`subiecte-ghid-banner ${darkTheme ? 'dark-theme' : ''}`}
                                role="region"
                                aria-label="Ghid Subiect I"
                            >
                                <div className="subiecte-ghid-banner-content">
                                    <span className="subiecte-ghid-banner-title">Subiectul I. Înțelege și Răspunde</span>
                                    <p className="subiecte-ghid-banner-desc">Ghid cu Subpunct A și B — cerințe grilă, răspuns scurt și argumentare pe baza textului.</p>
                                    <button
                                        type="button"
                                        className={`subiecte-ghid-banner-btn ${darkTheme ? 'dark-theme' : ''}`}
                                        onClick={() => navigate('/subiecte/ghid-subiect-1')}
                                    >
                                        Deschide ghidul
                                    </button>
                                </div>
                            </div>
                        )}
                        {selectedTip === '2' && (
                            <div
                                className={`subiecte-ghid-banner ${darkTheme ? 'dark-theme' : ''}`}
                                role="region"
                                aria-label="Ghid Subiect II"
                            >
                                <div className="subiecte-ghid-banner-content">
                                    <span className="subiecte-ghid-banner-title">Subiectul II. Înțelege, Aplică, Scrie</span>
                                    <p className="subiecte-ghid-banner-desc">Ghid cu naratorul, notațiile autorului și semnificația textului liric — modele de redactare și exerciții.</p>
                                    <button
                                        type="button"
                                        className={`subiecte-ghid-banner-btn ${darkTheme ? 'dark-theme' : ''}`}
                                        onClick={() => navigate('/subiecte/ghid-subiect-2')}
                                    >
                                        Deschide ghidul
                                    </button>
                                </div>
                            </div>
                        )}
                        {selectedTip === '3' && (
                            <div
                                className={`subiecte-ghid-banner ${darkTheme ? 'dark-theme' : ''}`}
                                role="region"
                                aria-label="Ghid Subiect III"
                            >
                                <div className="subiecte-ghid-banner-content">
                                    <span className="subiecte-ghid-banner-title">Subiectul III. Comentariu și Eseu</span>
                                    <p className="subiecte-ghid-banner-desc">Ghid cu structura comentariului, planuri și cerințe specifice — modele pentru eseu argumentativ.</p>
                                    <button
                                        type="button"
                                        className={`subiecte-ghid-banner-btn ${darkTheme ? 'dark-theme' : ''}`}
                                        onClick={() => navigate('/subiecte/ghid-subiect-3')}
                                    >
                                        Deschide ghidul
                                    </button>
                                </div>
                            </div>
                        )}

                        {fetchError && (
                            <div className={`subiecte-no-results ${darkTheme ? 'dark-theme' : ''}`}>
                                {fetchError}
                            </div>
                        )}

                        {/* Grid Subiecte */}
                        {loadingSubiecte ? (
                            <div className="subiecte-loading-wrapper">
                                <div className={`subiecte-spinner ${darkTheme ? 'dark-theme' : ''}`} aria-label="Se încarcă subiectele" />
                            </div>
                        ) : (
                            <>
                                <div className="subiecte-grid-container">
                                    {sortedSubiecte.map((subiect, idx) => {
                                        const numarSubiect = subiect.numarSubiect ?? subiect.numar;
                                        const isSubiect1 = String(numarSubiect) === '1';

                                        return (
                                            <div
                                                key={subiect.id || `subiect-${idx}-${numarSubiect ?? 'N'}-${subiect.an ?? 'NA'}-${subiect.profil || 'P'}-${subiect.subpunct || 'N'}`}
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
                                                        {subiect.profil ? String(subiect.profil).toUpperCase() : ''}
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
                                                            {isSubiect1
                                                                ? `Subiect 1 - ${subiect.subpunct}`
                                                                : `Subiect ${numarSubiect}`}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Mesaj când nu sunt rezultate */}
                                {sortedSubiecte.length === 0 && (
                                    <div className={`subiecte-no-results ${darkTheme ? 'dark-theme' : ''}`}>
                                        Nu s-au găsit subiecte care să corespundă criteriilor de căutare.
                                    </div>
                                )}
                            </>
                        )}

                        {!loadingSubiecte && isLoadingMore && (
                            <div className="subiecte-loading-wrapper">
                                <div className={`subiecte-spinner ${darkTheme ? 'dark-theme' : ''}`} aria-label="Se încarcă mai multe subiecte" />
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
                    onDelete={handleSubiectDelete}
                />
            )}

            <AdminAddButton darkTheme={darkTheme} type="subiecte" />
        </Layout>
    );
} 
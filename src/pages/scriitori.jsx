import React, { useEffect, useState } from 'react';
import Layout from '../assets/Layout';
import '../styles/style.scss';
import '../styles/adminAddButton.scss';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import { fetchScriitori } from '../firebase/scriitoriService';
import { useAuth } from '../firebase/AuthContext';

// Fallback gol - datele se încarcă din Firebase
const scriitoriListFallback = [];

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
  const [darkTheme, setDarkTheme] = useState(() => document.body.classList.contains('dark-theme'));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('toate');
  const [canonicFilter, setCanonicFilter] = useState('toate'); // 'toate', 'canonic', 'necanonic'
  // Sortare implicită după ordine (nu 'none')
  const [sortOption, setSortOption] = useState('ordine');
  const { userProfile } = useAuth();
  const hasAdminAccess = userProfile?.isAdmin === true || userProfile?.isSemiAdmin === true;
  // Initialize with empty array - data will be loaded from Firebase
  const [scriitoriList, setScriitoriList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sortOptions = [
    { value: 'ordine', label: 'Ordine implicită' },
    { value: 'cronologic-asc', label: 'Cronologic ↑' },
    { value: 'cronologic-desc', label: 'Cronologic ↓' },
    { value: 'az', label: 'Ordine A–Z' },
  ];
  const navigate = useNavigate();

  // Load scriitori from Firestore
  useEffect(() => {
    const loadScriitori = async () => {
      try {
        setLoading(true);
        const scriitori = await fetchScriitori();
        // Convert to format expected by the page
        const formattedScriitori = scriitori
          .map(s => {
            const key = s.key || s.id;
            // Asigură-te că Veronica Micle are datele corecte
            if (key === 'veronica') {
              return {
                nume: s.nume || 'Veronica Micle',
                date: '1850 – 1889',
                img: s.img || '',
                color: s.color || 'rgba(255,179,71,0.82)',
                categorie: s.categorie || '',
                canonic: false, // Marcăm ca necanonic
                ordine: s.ordine !== undefined ? s.ordine : 999,
                key: key,
              };
            }
            return {
              nume: s.nume || '',
              date: s.date || '',
              img: s.img || '',
              color: s.color || 'rgba(255,179,71,0.82)',
              categorie: s.categorie || '',
              canonic: s.canonic !== undefined ? s.canonic : true,
              ordine: s.ordine !== undefined ? s.ordine : 999,
              key: key,
            };
          })
          .sort((a, b) => {
            // Sortează după ordine, dar asigură-te că Veronica Micle vine după Voiculescu
            const ordineA = a.ordine !== undefined ? a.ordine : 999;
            const ordineB = b.ordine !== undefined ? b.ordine : 999;
            
            // Dacă unul dintre ei este Voiculescu și celălalt este Veronica Micle
            const aIsVoiculescu = a.key === 'voiculescu';
            const bIsVoiculescu = b.key === 'voiculescu';
            const aIsVeronica = a.key === 'veronica';
            const bIsVeronica = b.key === 'veronica';
            
            if (aIsVoiculescu && bIsVeronica) return -1; // Voiculescu înainte
            if (aIsVeronica && bIsVoiculescu) return 1;  // Veronica după
            
            // Sortare normală după ordine
            if (ordineA !== ordineB) {
              return ordineA - ordineB;
            }
            return a.nume.localeCompare(b.nume, 'ro', { sensitivity: 'base' });
          });
        
        setScriitoriList(formattedScriitori);
        setError(null);
      } catch (error) {
        console.error('Error loading scriitori:', error);
        setError('Nu s-au putut încărca datele scriitorilor. Te rugăm să reîncerci mai târziu.');
        setScriitoriList([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadScriitori();
  }, []);

  // Theme is applied globally by Layout; do not toggle body/localStorage here

  // Filtrare scriitori
  const filteredScriitori = scriitoriList.filter(scriitor => {
    const matchesSearch = scriitor.nume.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'toate' || scriitor.categorie === selectedCategory;
    const matchesCanonic = canonicFilter === 'toate' || 
                          (canonicFilter === 'canonic' && scriitor.canonic) ||
                          (canonicFilter === 'necanonic' && !scriitor.canonic);
    return matchesSearch && matchesCategory && matchesCanonic;
  });

  const getYears = (dateStr) => {
    if (!dateStr) return { start: NaN, end: NaN };
    const matches = String(dateStr).match(/(\d{4}).*(\d{4})/);
    if (matches) {
      return { start: parseInt(matches[1], 10), end: parseInt(matches[2], 10) };
    }
    const single = String(dateStr).match(/(\d{4})/);
    return { start: single ? parseInt(single[1], 10) : NaN, end: NaN };
  };

  const sortedScriitori = [...filteredScriitori].sort((a, b) => {
    switch (sortOption) {
      case 'cronologic-asc': {
        const ay = getYears(a.date).start;
        const by = getYears(b.date).start;
        return ay - by;
      }
      case 'cronologic-desc': {
        const ay = getYears(a.date).start;
        const by = getYears(b.date).start;
        return by - ay;
      }
      case 'az':
        return a.nume.localeCompare(b.nume, 'ro', { sensitivity: 'base' });
      case 'ordine':
      default:
        // Sortare implicită după ordine (din Firestore), apoi după nume
        // Asigură-te că Veronica Micle apare după Voiculescu
        const aIsVoiculescu = a.key === 'voiculescu';
        const bIsVoiculescu = b.key === 'voiculescu';
        const aIsVeronica = a.key === 'veronica';
        const bIsVeronica = b.key === 'veronica';
        
        if (aIsVoiculescu && bIsVeronica) return -1; // Voiculescu înainte
        if (aIsVeronica && bIsVoiculescu) return 1;  // Veronica după
        
        const ordineA = a.ordine !== undefined ? a.ordine : 999;
        const ordineB = b.ordine !== undefined ? b.ordine : 999;
        if (ordineA !== ordineB) {
          return ordineA - ordineB;
        }
        return a.nume.localeCompare(b.nume, 'ro', { sensitivity: 'base' });
    }
  });

  // Banda colorată ca pe landing
  const cardSize = 320;
  const bandaColor = darkTheme ? 'rgba(26,13,0,0.82)' : 'rgba(255,179,71,0.82)';

  function getScriitorKey(nume) {
    // Normalizează numele pentru cheia din scriitoriData.js
    return nume
      .toLowerCase()
      .replace(/ă/g, 'a').replace(/â/g, 'a').replace(/î/g, 'i').replace(/ș/g, 's').replace(/ş/g, 's').replace(/ț/g, 't').replace(/ţ/g, 't')
      .replace(/[^a-z0-9 ]/g, '')
      .split(' ')[1] // prenumele (ex: Mihai Eminescu -> eminescu)
      || nume.toLowerCase();
  }

  return (
    <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
      <div className="page-hero">
        <h1 className="page-title">
          {'Scriitori'.split(' ').map((word, wi) => (
            <span className="page-title-word" key={wi}>
              {word.split('').map((l, i) => <span key={i}>{l}</span>)}
            </span>
          ))}
        </h1>
        <p className="page-desc">Aici vei găsi comentarii și resurse despre scriitorii importanți pentru BAC.</p>
        {loading && <p style={{ marginTop: '10px', fontSize: '14px', opacity: 0.7 }}>Se încarcă scriitorii...</p>}
        {error && (
          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            backgroundColor: darkTheme ? 'rgba(200, 0, 0, 0.2)' : 'rgba(200, 0, 0, 0.1)',
            borderRadius: '8px',
            border: `1px solid ${darkTheme ? 'rgba(200, 0, 0, 0.5)' : 'rgba(200, 0, 0, 0.3)'}`,
            color: darkTheme ? '#ff6b6b' : '#d32f2f'
          }}>
            {error}
          </div>
        )}
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
              placeholder="Caută scriitori..."
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
          {/* Sortarea a fost mutată mai jos, lângă prompturi */}
        </div>

        {/* Butoane categorii canonice sub search bar */}
        <div className="scriitori-filter-buttons">
          {categorii.filter(c => c.id !== 'toate').map(categorie => (
            <button
              key={categorie.id}
              onClick={() => setSelectedCategory(categorie.id)}
              className={`scriitori-filter-button ${darkTheme ? 'dark-theme' : ''} ${selectedCategory === categorie.id ? 'selected' : ''}`}
            >
              {categorie.nume}
            </button>
          ))}
          {/* Dropdown Sortare - mutat aici pe același rând cu prompturile */}
          <div className="scriitori-sort-container">
            <Select
              options={sortOptions}
              value={sortOptions.find(opt => opt.value === sortOption)}
              onChange={opt => setSortOption(opt.value)}
              styles={customSelectStyles(darkTheme)}
              isSearchable={false}
              menuPlacement="auto"
              placeholder="Sortează"
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

        {/* Grid Scriitori */}
        <div className="scriitori-grid-container">
          {sortedScriitori.map((scriitor, idx) => {
            const key = getScriitorKey(scriitor.nume);
            return (
              <div
                key={scriitor.nume}
                className={`scriitori-card ${darkTheme ? 'dark-theme' : ''}`}
                onClick={() => navigate(`/scriitor?name=${scriitor.key || key}`, { state: { from: { pathname: '/scriitori', scrollY: window.scrollY } } })}
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
                />
                <div className={`scriitori-card-info ${darkTheme ? 'dark-theme' : ''}`}>
                  <div>{scriitor.nume}</div>
                  <div className="scriitori-card-dates">{scriitor.date}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mesaj când nu sunt rezultate */}
        {filteredScriitori.length === 0 && (
          <div className={`scriitori-no-results ${darkTheme ? 'dark-theme' : ''}`}>
            Nu s-au găsit scriitori care să corespundă criteriilor de căutare.
          </div>
        )}
      </div>
      {hasAdminAccess && (
        <div className="admin-buttons-container">
          <button
            onClick={() => navigate('/admin?tab=scriitori')}
            className={`admin-manage-button ${darkTheme ? 'dark-theme' : ''}`}
            title="Gestionează scriitori"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"></path>
            </svg>
          </button>
          <button
            onClick={() => navigate('/admin?tab=scriitori&view=add')}
            className={`admin-add-button ${darkTheme ? 'dark-theme' : ''}`}
            title="Adaugă scriitor nou"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      )}
    </Layout>
  );
} 
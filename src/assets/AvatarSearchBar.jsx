import React, { useState, useEffect } from 'react';
import { getScriitoriData } from '../firebase/scriitoriService';

export default function AvatarSearchBar({ onSelect }) {
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);
  const [allScriitori, setAllScriitori] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load scriitori from Firestore
  useEffect(() => {
    const loadScriitori = async () => {
      try {
        const scriitoriData = await getScriitoriData();
        const scriitoriArray = Object.values(scriitoriData).map(s => ({
          nume: s.nume || '',
          img: s.img || '',
          key: s.key || s.id,
        }));
        setAllScriitori(scriitoriArray);
      } catch (error) {
        console.error('Error loading scriitori for search:', error);
        setAllScriitori([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadScriitori();
  }, []);

  const filtered = search.length === 0
    ? []
    : allScriitori.filter(s => s.nume.toLowerCase().includes(search.toLowerCase()));

  // Placeholder dispare dacă inputul e focus sau are text
  const showPlaceholder = !(focused || search.length > 0);

  return (
    <div className={`avatar-searchbar-banner-bar${focused ? ' focused' : ''}`}>
      <div className="avatar-main-inside-bar">
        <img
          src="/utilitary/ganditorimea avatar.webp"
          alt="Avatar principal"
          className="avatar-main-img-inside-bar"
        />
      </div>
      <span className="searchbar-lupa-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="9" r="7" stroke="#b88a1a" strokeWidth="2" />
          <line x1="14.2" y1="14.2" x2="18" y2="18" stroke="#b88a1a" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <input
        type="text"
        className="searchbar-input-inside-bar"
        placeholder={showPlaceholder ? "Caută pe Ganditorimea..." : ''}
        value={search}
        onChange={e => setSearch(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {!loading && filtered.length > 0 && (
        <ul className="searchbar-results" style={{ left: 0, right: 0, minWidth: '100%' }}>
          {filtered.map((s, idx) => (
            <li
              key={s.key || s.nume + idx}
              className="searchbar-result-item"
              onMouseDown={() => onSelect && onSelect(s)}
            >
              <img 
                src={s.img ? s.img.replace('/scriitori/', '/public/scriitori/').replace('/public/', '/') : ''} 
                alt={s.nume} 
                className="searchbar-result-avatar" 
              />
              <span className="searchbar-result-name">{s.nume}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
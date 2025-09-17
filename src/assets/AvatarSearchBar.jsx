import React, { useState } from 'react';
import scriitoriData from '../scriitoriData';

const allScriitori = Object.values(scriitoriData);

export default function AvatarSearchBar({ onSelect }) {
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);
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
      {filtered.length > 0 && (
        <ul className="searchbar-results" style={{ left: 0, right: 0, minWidth: '100%' }}>
          {filtered.map((s, idx) => (
            <li
              key={s.nume + idx}
              className="searchbar-result-item"
              onMouseDown={() => onSelect && onSelect(s)}
            >
              <img src={s.img.replace('/scriitori/', '/public/scriitori/').replace('/public/', '/')} alt={s.nume} className="searchbar-result-avatar" />
              <span className="searchbar-result-name">{s.nume}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
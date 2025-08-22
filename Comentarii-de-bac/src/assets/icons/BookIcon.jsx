import React from 'react';

export default function BookIcon({ className = '', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={22}
      height={22}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Coperta cărții */}
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" fill="#b88a4a" stroke="#7a5232" strokeWidth={1.3} />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill="#b88a4a" stroke="#7a5232" strokeWidth={1.3} />
      
      {/* Paginile */}
      <rect x="7" y="4" width="12" height="16" rx="0.5" fill="#fffbe6" stroke="#b88a4a" strokeWidth={0.7} />
      
      {/* Linii pentru text */}
      <line x1="8.5" y1="7" x2="17.5" y2="7" stroke="#b88a4a" strokeWidth="0.8" />
      <line x1="8.5" y1="9.5" x2="17.5" y2="9.5" stroke="#b88a4a" strokeWidth="0.8" />
      <line x1="8.5" y1="12" x2="17.5" y2="12" stroke="#b88a4a" strokeWidth="0.8" />
      <line x1="8.5" y1="14.5" x2="17.5" y2="14.5" stroke="#b88a4a" strokeWidth="0.8" />
      
      {/* Titlul cărții */}
      <line x1="8.5" y1="5.5" x2="17.5" y2="5.5" stroke="#7a5232" strokeWidth="1.2" />
    </svg>
  );
}

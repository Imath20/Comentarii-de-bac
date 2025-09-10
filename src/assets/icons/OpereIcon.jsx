import React from 'react';

export default function OpereIcon({ className = '', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={22}
      height={22}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Coperta stanga */}
      <path d="M3 6.5C3 5.12 4.12 4 5.5 4H11.5c.28 0 .5.22.5.5v15c0 .28-.22.5-.5.5H5.5A2.5 2.5 0 0 1 3 17.5V6.5Z" fill="#b88a4a" stroke="#7a5232" strokeWidth={1.3} />
      {/* Coperta dreapta */}
      <path d="M21 6.5C21 5.12 19.88 4 18.5 4H12.5c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5h6A2.5 2.5 0 0 0 21 17.5V6.5Z" fill="#b88a4a" stroke="#7a5232" strokeWidth={1.3} />
      {/* Pagini */}
      <rect x="6.2" y="5.7" width="5.1" height="12.6" rx="0.7" fill="#fffbe6" stroke="#b88a4a" strokeWidth={0.7} />
      <rect x="12.7" y="5.7" width="5.1" height="12.6" rx="0.7" fill="#fffbe6" stroke="#b88a4a" strokeWidth={0.7} />
      {/* Randuri scrise */}
      <line x1="7.2" y1="8.2" x2="10.8" y2="8.2" stroke="#b88a4a" strokeWidth={0.7} />
      <line x1="7.2" y1="10.2" x2="10.8" y2="10.2" stroke="#b88a4a" strokeWidth={0.7} />
      <line x1="7.2" y1="12.2" x2="10.8" y2="12.2" stroke="#b88a4a" strokeWidth={0.7} />
      <line x1="13.7" y1="8.2" x2="17.3" y2="8.2" stroke="#b88a4a" strokeWidth={0.7} />
      <line x1="13.7" y1="10.2" x2="17.3" y2="10.2" stroke="#b88a4a" strokeWidth={0.7} />
      <line x1="13.7" y1="12.2" x2="17.3" y2="12.2" stroke="#b88a4a" strokeWidth={0.7} />
    </svg>
  );
} 
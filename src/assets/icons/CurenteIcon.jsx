import React from 'react';

export default function CurenteIcon({ className = '', ...props }) {
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
      {/* Linia principală a timeline-ului */}
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" />
      
      {/* Punctele cronologice */}
      <circle cx="5" cy="12" r="2" fill="currentColor" />
      <circle cx="9" cy="12" r="2" fill="currentColor" />
      <circle cx="15" cy="12" r="2" fill="currentColor" />
      <circle cx="19" cy="12" r="2" fill="currentColor" />
      
      {/* Săgeți pentru direcția temporală */}
      <path d="M20 8l2 4-2 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      
      {/* Elemente decorative pentru literatura */}
      <path d="M7 6l1 2-1 2" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M11 6l1 2-1 2" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M17 6l1 2-1 2" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

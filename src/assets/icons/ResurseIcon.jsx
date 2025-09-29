import React from 'react';

export default function ResurseIcon({ className = '', ...props }) {
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
      {/* Folder/Archive icon representing resources */}
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      
      {/* Document/file icons inside */}
      <path d="M8 9h8" strokeWidth="1.5" />
      <path d="M8 12h6" strokeWidth="1.5" />
      <path d="M8 15h4" strokeWidth="1.5" />
      
      {/* Small decorative elements */}
      <circle cx="16" cy="8" r="1" fill="currentColor" />
      <path d="M14 8h2" strokeWidth="1" />
    </svg>
  );
}

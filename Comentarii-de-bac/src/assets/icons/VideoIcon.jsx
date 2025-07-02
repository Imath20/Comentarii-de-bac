import React from 'react';

export default function VideoIcon({ className = '', ...props }) {
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
      <rect x="3" y="5" width="18" height="14" rx="3" fill="currentColor" opacity="0.13" />
      <polygon points="10,9 16,12 10,15" fill="currentColor" opacity="0.7" />
    </svg>
  );
} 
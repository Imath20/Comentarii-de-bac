import React from 'react';

const Logo = ({ className = '', size = 'medium', darkTheme = false }) => {
  const sizeMap = {
    small: { width: 40, height: 40 },
    medium: { width: 60, height: 60 },
    large: { width: 80, height: 80 }
  };

  const { width, height } = sizeMap[size] || sizeMap.medium;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 60"
      className={`logo ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle with gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={darkTheme ? "#fbeec1" : "#4e2e1e"} />
          <stop offset="100%" stopColor={darkTheme ? "#d4af8a" : "#7c4f2b"} />
        </linearGradient>
        <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={darkTheme ? "#4e2e1e" : "#fbeec1"} />
          <stop offset="100%" stopColor={darkTheme ? "#7c4f2b" : "#d4af8a"} />
        </linearGradient>
      </defs>
      
      {/* Main circle background */}
      <circle
        cx="30"
        cy="30"
        r="28"
        fill="url(#logoGradient)"
        stroke={darkTheme ? "#fbeec1" : "#4e2e1e"}
        strokeWidth="1"
      />
      
      {/* Book/Scroll element - representing literature */}
      <rect
        x="15"
        y="12"
        width="30"
        height="36"
        rx="2"
        fill="url(#bookGradient)"
        stroke={darkTheme ? "#4e2e1e" : "#fbeec1"}
        strokeWidth="0.8"
      />
      
      {/* Book pages/spine */}
      <rect
        x="17"
        y="14"
        width="26"
        height="32"
        rx="1"
        fill={darkTheme ? "#4e2e1e" : "#fbeec1"}
        opacity="0.3"
      />
      
      {/* Text lines representing literature */}
      <line
        x1="20"
        y1="22"
        x2="40"
        y2="22"
        stroke={darkTheme ? "#fbeec1" : "#4e2e1e"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="26"
        x2="38"
        y2="26"
        stroke={darkTheme ? "#fbeec1" : "#4e2e1e"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="30"
        x2="42"
        y2="30"
        stroke={darkTheme ? "#fbeec1" : "#4e2e1e"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="34"
        x2="36"
        y2="34"
        stroke={darkTheme ? "#fbeec1" : "#4e2e1e"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Quill pen - representing writing */}
      <path
        d="M42 18 L48 12 L46 10 L40 16"
        fill={darkTheme ? "#4e2e1e" : "#fbeec1"}
        stroke={darkTheme ? "#fbeec1" : "#4e2e1e"}
        strokeWidth="0.8"
      />
      
      {/* Feather details */}
      <path
        d="M48 12 L52 8 L50 6 L46 10"
        fill={darkTheme ? "#4e2e1e" : "#fbeec1"}
        stroke={darkTheme ? "#fbeec1" : "#4e2e1e"}
        strokeWidth="0.6"
      />
      
      {/* Ink drop */}
      <ellipse
        cx="42"
        cy="20"
        rx="1.5"
        ry="2"
        fill={darkTheme ? "#fbeec1" : "#4e2e1e"}
        opacity="0.7"
      />
      
      {/* Decorative elements - Romanian cultural symbols */}
      {/* Small stars representing Romanian literature */}
      <g fill={darkTheme ? "#fbeec1" : "#4e2e1e"} opacity="0.6">
        <path d="M12 20 L13 23 L16 23 L14 25 L15 28 L12 26 L9 28 L10 25 L8 23 L11 23 Z" />
        <path d="M48 40 L49 42 L51 42 L50 43 L51 45 L48 44 L45 45 L46 43 L44 42 L47 42 Z" />
      </g>
      
      {/* Small decorative flourishes */}
      <path
        d="M8 35 Q12 33 16 35"
        stroke={darkTheme ? "#fbeec1" : "#4e2e1e"}
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M44 8 Q48 6 52 8"
        stroke={darkTheme ? "#fbeec1" : "#4e2e1e"}
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
};

export default Logo;
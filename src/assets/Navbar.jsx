import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import HomeIcon from './icons/HomeIcon';
import PenPaperIcon from './icons/PenPaperIcon';
import SlideIcon from './icons/SlideIcon';
import ExamPaperIcon from './icons/ExamPaperIcon';
import AiIcon from './icons/AiIcon';
import VideoIcon from './icons/VideoIcon';
import OpereIcon from './icons/OpereIcon';
import BookIcon from './icons/BookIcon';
import ResurseIcon from './icons/ResurseIcon';
import CurenteIcon from './icons/CurenteIcon';
import CommentIcon from './icons/CommentIcon';
import Logo from './Logo';
import { useAuth } from '../firebase/AuthContext';
import { getProfileImageUrl } from '../utils/cloudinary';

const NAV_CATEGORIES = [
  { name: 'Acasa', href: '/', icon: <HomeIcon className="nav-icon" /> },
  { name: 'Opere', href: '/opere', icon: <OpereIcon className="nav-icon" /> },
  { name: 'Comentarii', href: '/comentarii', icon: <CommentIcon className="nav-icon" /> },
  { name: 'Scriitori', href: '/scriitori', icon: <PenPaperIcon className="nav-icon" /> },
  { 
    name: 'Resurse', 
    href: '#', 
    icon: <ResurseIcon className="nav-icon" />,
    dropdown: [
      { name: 'Bibliotecă', href: '/biblioteca', icon: <BookIcon className="nav-icon" /> },
      { name: 'Videoclipuri', href: '/videoclipuri', icon: <VideoIcon className="nav-icon" /> },
      { name: 'Proiecte', href: '/proiecte', icon: <SlideIcon className="nav-icon" /> },
      { name: 'Curente', href: '/curente', icon: <CurenteIcon className="nav-icon" /> },
    ]
  },
  { name: 'Subiecte', href: '/subiecte', icon: <ExamPaperIcon className="nav-icon" /> },
  { name: 'AI', href: '/ai', icon: <AiIcon className="nav-icon" /> },
];

export default function Navbar({ darkTheme, setDarkTheme, scrolled }) {
  const menuRef = useRef(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0, visible: false });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userProfile, logout } = useAuth();

  const updateActiveUnderline = () => {
    const menu = menuRef.current;
    if (!menu) return;
    const menuRect = menu.getBoundingClientRect();
    const path = location.pathname || '/';
    
    // Check for active dropdown items first
    const dropdownItem = NAV_CATEGORIES.find(cat => 
      cat.dropdown && cat.dropdown.some(item => 
        item.href === '/' ? path === '/' : path.startsWith(item.href)
      )
    );
    
    if (dropdownItem) {
      const dropdownIndex = NAV_CATEGORIES.findIndex(cat => cat.name === dropdownItem.name);
      // Only consider top-level nav links to avoid indexing into dropdown items
      const links = menu.querySelectorAll(':scope > li > a');
      const dropdownLink = dropdownIndex >= 0 ? links[dropdownIndex] : null;
      if (dropdownLink) {
        const { left, width } = dropdownLink.getBoundingClientRect();
        setUnderline({ left: left - menuRect.left, width, visible: true });
      }
      return;
    }
    
    // Check for regular items
    const activeIndex = NAV_CATEGORIES.findIndex(cat => (
      cat.href === '/' ? path === '/' : path.startsWith(cat.href)
    ));
    // Only consider top-level nav links to avoid indexing into dropdown items
    const links = menu.querySelectorAll(':scope > li > a');
    const activeLink = activeIndex >= 0 ? links[activeIndex] : null;
    if (activeLink) {
      const { left, width } = activeLink.getBoundingClientRect();
      setUnderline({ left: left - menuRect.left, width, visible: true });
    } else {
      setUnderline(u => ({ ...u, visible: false }));
    }
  };

  const handleMouseEnter = (e) => {
    const item = e.currentTarget;
    const menu = menuRef.current;
    if (menu && item) {
      const { left: menuLeft } = menu.getBoundingClientRect();
      const { left, width } = item.getBoundingClientRect();
      setUnderline({ left: left - menuLeft, width, visible: true });
    }
  };
  
  const handleMouseLeave = () => {
    updateActiveUnderline();
  };

  const handleDropdownEnter = (categoryName) => {
    setActiveDropdown(categoryName);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    updateActiveUnderline();
    // Recalculate on window resize for responsive layouts
    const onResize = () => updateActiveUnderline();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <nav
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      style={scrolled ? {
        background: darkTheme
          ? 'rgba(47, 24, 0, 0.46)' // #1a0d00 pe dark
          : 'rgba(251, 184, 91, 0.46)', // #ffb347 pe light
        boxShadow: '0 2px 16px 0 rgba(124, 79, 43, 0.10)',
        transition: 'background 0.3s, box-shadow 0.3s',
        backdropFilter: 'blur(2px)',
        borderBottom: darkTheme
          ? '1.5px solid rgba(122, 58, 0, 0.18)'
          : '1.5px solid rgba(255, 179, 71, 0.18)',
      } : {}}
    >
      <Link to="/" className="navbar-logo">
        <Logo size="medium" darkTheme={darkTheme} />
        <span className="navbar-logo-text">Comentarii de BAC</span>
      </Link>
      <ul className="navbar-menu" ref={menuRef}>
        {NAV_CATEGORIES.map(cat => (
          <li 
            key={cat.name}
            className={cat.dropdown ? 'dropdown-container' : ''}
            onMouseEnter={cat.dropdown ? () => handleDropdownEnter(cat.name) : undefined}
            onMouseLeave={cat.dropdown ? handleDropdownLeave : undefined}
          >
            <Link
              to={cat.href}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={cat.dropdown ? 'dropdown-trigger' : ''}
            >
              <span className="nav-icon-wrapper">{cat.icon}</span>
              {cat.name}
              {cat.dropdown && <ChevronDown className="dropdown-arrow" size={20} />}
            </Link>
            {cat.dropdown && (
              <ul className={`dropdown-menu ${activeDropdown === cat.name ? 'active' : ''}`}>
                {cat.dropdown.map(item => (
                  <li key={item.name}>
                    <Link to={item.href}>
                      <span className="nav-icon-wrapper">{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        <div
          className="navbar-underline"
          style={{
            left: underline.left,
            width: underline.width,
            opacity: underline.visible ? 1 : 0,
          }}
        />
      </ul>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Profile Image - Clickable */}
            <Link
              to="/profil"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'transform 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {(userProfile?.photoURL || currentUser.photoURL) ? (
                <img
                  src={getProfileImageUrl(userProfile?.photoURL || currentUser.photoURL)}
                  alt={userProfile?.displayName || currentUser.displayName || 'User'}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: darkTheme
                      ? '2px solid rgba(255, 213, 145, 0.3)'
                      : '2px solid rgba(255, 179, 71, 0.3)',
                    transition: 'all 0.3s ease',
                    boxShadow: darkTheme
                      ? '0 2px 8px rgba(0, 0, 0, 0.2)'
                      : '0 2px 8px rgba(124, 79, 43, 0.15)',
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />
              ) : null}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: darkTheme
                    ? 'rgba(255, 213, 145, 0.1)'
                    : 'rgba(255, 179, 71, 0.1)',
                  display: (userProfile?.photoURL || currentUser.photoURL) ? 'none' : 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: darkTheme
                    ? '2px solid rgba(255, 213, 145, 0.3)'
                    : '2px solid rgba(255, 179, 71, 0.3)',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: darkTheme ? '#ffd591' : '#7a3a00',
                  transition: 'all 0.3s ease',
                  boxShadow: darkTheme
                    ? '0 2px 8px rgba(0, 0, 0, 0.2)'
                    : '0 2px 8px rgba(124, 79, 43, 0.15)',
                }}
              >
                {(userProfile?.displayName || currentUser.displayName || 'U').charAt(0).toUpperCase()}
              </div>
            </Link>
            <button
              onClick={async () => {
                try {
                  await logout();
                } catch (error) {
                  console.error('Error logging out:', error);
                }
              }}
              className="navbar-logout-button"
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                borderRadius: '6px',
                cursor: 'pointer',
                background: darkTheme
                  ? 'rgba(255, 87, 87, 0.1)'
                  : 'rgba(255, 87, 87, 0.1)',
                color: darkTheme ? '#ff5757' : '#ff5757',
                border: darkTheme
                  ? '1px solid rgba(255, 87, 87, 0.3)'
                  : '1px solid rgba(255, 87, 87, 0.3)',
                transition: 'all 0.3s ease',
                outline: 'none',
                '&:focus': {
                  outline: 'none',
                },
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = darkTheme
                  ? 'rgba(255, 87, 87, 0.2)'
                  : 'rgba(255, 87, 87, 0.15)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = darkTheme
                  ? 'rgba(255, 87, 87, 0.1)'
                  : 'rgba(255, 87, 87, 0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Deconectare
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="navbar-login-button"
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              fontWeight: '500',
              borderRadius: '6px',
              cursor: 'pointer',
              background: darkTheme
                ? 'rgba(255, 179, 71, 0.1)'
                : 'rgba(255, 179, 71, 0.92)',
              color: darkTheme ? '#ffb347' : '#7a3a00',
              border: darkTheme
                ? '1px solid rgba(255, 179, 71, 0.3)'
                : '1px solid rgba(122, 58, 0, 0.2)',
              transition: 'all 0.3s ease',
              outline: 'none',
              '&:focus': {
                outline: 'none',
              },
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = darkTheme
                ? 'rgba(255, 179, 71, 0.2)'
                : '#ffd591';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = darkTheme
                ? 'rgba(255, 179, 71, 0.1)'
                : 'rgba(255, 179, 71, 0.92)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Autentificare
          </button>
        )}
        <button
          className="theme-toggle"
          aria-label="Schimbă tema"
          onClick={() => setDarkTheme(t => !t)}
        >
          {darkTheme ? '🌙' : '🌞'}
        </button>
      </div>
    </nav>
  );
} 
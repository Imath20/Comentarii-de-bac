import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
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
import GhidSubiect2Icon from './icons/GhidSubiect2Icon';
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
      { name: 'Ghiduri BAC', href: '/ghiduri', icon: <GhidSubiect2Icon className="nav-icon" /> },
    ]
  },
  { name: 'Subiecte', href: '/subiecte', icon: <ExamPaperIcon className="nav-icon" /> },
  { name: 'AI', href: '/ai', icon: <AiIcon className="nav-icon" /> },
];

export default function Navbar({ darkTheme, setDarkTheme, scrolled }) {
  const menuRef = useRef(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0, visible: false });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
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

  useEffect(() => {
    // Close mobile menu on route change
    setMobileMenuOpen(false);
    setMobileDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setMobileDropdown(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const navbarActions = (
    <>
      {currentUser ? (
        <div className="navbar-auth">
          <Link to="/profil" className="navbar-profile-link" aria-label="Profil">
            {(userProfile?.photoURL || currentUser.photoURL) ? (
              <img
                src={getProfileImageUrl(userProfile?.photoURL || currentUser.photoURL)}
                alt={userProfile?.displayName || currentUser.displayName || 'User'}
                className="navbar-profile-image"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.navbar-profile-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
            ) : null}
            <div
              className="navbar-profile-fallback"
              style={{
                display: (userProfile?.photoURL || currentUser.photoURL) ? 'none' : 'flex',
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
            type="button"
          >
            Deconectare
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="navbar-login-button"
          type="button"
        >
          Autentificare
        </button>
      )}
      <button
        className="theme-toggle"
        aria-label="Schimbă tema"
        onClick={() => setDarkTheme(t => !t)}
        type="button"
      >
        {darkTheme ? '🌙' : '🌞'}
      </button>
    </>
  );

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
      <div className="navbar-right">
        <div className="navbar-actions">
          {navbarActions}
        </div>
        <button
          className="navbar-hamburger"
          type="button"
          aria-label={mobileMenuOpen ? 'Închide meniul' : 'Deschide meniul'}
          aria-expanded={mobileMenuOpen ? 'true' : 'false'}
          onClick={() => setMobileMenuOpen(o => !o)}
        >
          {mobileMenuOpen ? <X size={32} strokeWidth={3.5} /> : <Menu size={32} strokeWidth={3.5} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="navbar-mobile-panel" role="dialog" aria-label="Meniu navigare">
            <button
              className="navbar-mobile-theme-toggle"
              type="button"
              aria-label="Schimbă tema"
              onClick={() => setDarkTheme(t => !t)}
            >
              {darkTheme ? '🌙' : '🌞'}
            </button>
            <button
              className="navbar-mobile-close"
              type="button"
              aria-label="Închide meniul"
              onClick={() => {
                setMobileMenuOpen(false);
                setMobileDropdown(null);
              }}
            >
              <X size={28} strokeWidth={3} />
            </button>
            <div className="navbar-mobile-content">
              <h2 className="navbar-mobile-title">Meniu</h2>
              <ul className="navbar-mobile-menu">
                {NAV_CATEGORIES.map(cat => (
                  <li key={cat.name} className="navbar-mobile-item">
                    {cat.dropdown ? (
                      <>
                        <button
                          type="button"
                          className={`navbar-mobile-dropdown-trigger ${mobileDropdown === cat.name ? 'dropdown-open' : ''}`}
                          onClick={() => setMobileDropdown(d => (d === cat.name ? null : cat.name))}
                        >
                          <span className="nav-icon-wrapper">{cat.icon}</span>
                          <span className="navbar-mobile-item-label">{cat.name}</span>
                          <ChevronDown
                            className={`dropdown-arrow ${mobileDropdown === cat.name ? 'open' : ''}`}
                            size={20}
                          />
                        </button>
                        {mobileDropdown === cat.name && (
                          <ul className="navbar-mobile-submenu">
                            {cat.dropdown.map(item => (
                              <li key={item.name}>
                                <Link to={item.href} className="navbar-mobile-link">
                                  <span className="nav-icon-wrapper">{item.icon}</span>
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link to={cat.href} className="navbar-mobile-link">
                        <span className="nav-icon-wrapper">{cat.icon}</span>
                        {cat.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <div className="navbar-mobile-actions">
                {currentUser ? (
                  <div className="navbar-mobile-auth">
                    <Link to="/profil" className="navbar-profile-link" aria-label="Profil">
                      {(userProfile?.photoURL || currentUser.photoURL) ? (
                        <img
                          src={getProfileImageUrl(userProfile?.photoURL || currentUser.photoURL)}
                          alt={userProfile?.displayName || currentUser.displayName || 'User'}
                          className="navbar-profile-image"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.parentElement?.querySelector('.navbar-profile-fallback');
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div
                        className="navbar-profile-fallback"
                        style={{
                          display: (userProfile?.photoURL || currentUser.photoURL) ? 'none' : 'flex',
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
                      type="button"
                    >
                      Deconectare
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate('/login')}
                    className="navbar-login-button"
                    type="button"
                  >
                    Autentificare
                  </button>
                )}
              </div>
            </div>
          </div>
      )}
    </nav>
  );
} 
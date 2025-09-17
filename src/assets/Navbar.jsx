import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from './icons/HomeIcon';
import PenPaperIcon from './icons/PenPaperIcon';
import SlideIcon from './icons/SlideIcon';
import ExamPaperIcon from './icons/ExamPaperIcon';
import AiIcon from './icons/AiIcon';
import VideoIcon from './icons/VideoIcon';
import OpereIcon from './icons/OpereIcon';
import BookIcon from './icons/BookIcon';
import Logo from './Logo';

const NAV_CATEGORIES = [
  { name: 'Acasa', href: '/', icon: <HomeIcon className="nav-icon" /> },
  { name: 'Opere', href: '/opere', icon: <OpereIcon className="nav-icon" /> },
  { name: 'Bibliotecă', href: '/biblioteca', icon: <BookIcon className="nav-icon" /> },
  { name: 'Scriitori', href: '/scriitori', icon: <PenPaperIcon className="nav-icon" /> },
  { name: 'Subiecte', href: '/subiecte', icon: <ExamPaperIcon className="nav-icon" /> },
  { name: 'Videoclipuri', href: '/videoclipuri', icon: <VideoIcon className="nav-icon" /> },
  { name: 'Proiecte', href: '/proiecte', icon: <SlideIcon className="nav-icon" /> },
  { name: 'AI', href: '/ai', icon: <AiIcon className="nav-icon" /> },
];

export default function Navbar({ darkTheme, setDarkTheme, scrolled }) {
  const menuRef = useRef(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0, visible: false });
  const location = useLocation();

  const updateActiveUnderline = () => {
    const menu = menuRef.current;
    if (!menu) return;
    const menuRect = menu.getBoundingClientRect();
    const path = location.pathname || '/';
    const activeIndex = NAV_CATEGORIES.findIndex(cat => (
      cat.href === '/' ? path === '/' : path.startsWith(cat.href)
    ));
    const links = menu.querySelectorAll('a');
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
          <li key={cat.name}>
            <Link
              to={cat.href}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="nav-icon-wrapper">{cat.icon}</span>
              {cat.name}
            </Link>
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
      <button
        className="theme-toggle"
        aria-label="Schimbă tema"
        onClick={() => setDarkTheme(t => !t)}
      >
        {darkTheme ? '🌙' : '🌞'}
      </button>
    </nav>
  );
} 
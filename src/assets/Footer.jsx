import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Home, BookOpen, MessageSquare, Users, GraduationCap, Brain, Library, Video, Presentation, TrendingUp } from 'lucide-react';
import Logo from './Logo';
import GhidSubiect2Icon from './icons/GhidSubiect2Icon';

export default function Footer({ darkTheme: darkThemeProp }) {
  const [darkTheme, setDarkTheme] = useState(() => {
    if (typeof darkThemeProp === 'boolean') return darkThemeProp;
    return document.body.classList.contains('dark-theme');
  });

  useEffect(() => {
    if (typeof darkThemeProp === 'boolean') {
      setDarkTheme(darkThemeProp);
    } else {
      // Watch for theme changes
      const observer = new MutationObserver(() => {
        setDarkTheme(document.body.classList.contains('dark-theme'));
      });
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class'],
      });
      return () => observer.disconnect();
    }
  }, [darkThemeProp]);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section footer-brand">
          <Link to="/" className="footer-logo-link">
            <Logo size="medium" darkTheme={darkTheme} />
            <span className="footer-brand-text">Comentarii de BAC</span>
          </Link>
          <p className="footer-description">
            Platformă completă pentru pregătirea la examenul de bacalaureat la limba română. 
            Resurse, comentarii literare, opere și multe altele.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h3 className="footer-title">Navigare rapidă</h3>
          <ul className="footer-links">
            <li>
              <Link to="/">
                <Home size={16} />
                <span>Acasă</span>
              </Link>
            </li>
            <li>
              <Link to="/opere">
                <BookOpen size={16} />
                <span>Opere</span>
              </Link>
            </li>
            <li>
              <Link to="/comentarii">
                <MessageSquare size={16} />
                <span>Comentarii</span>
              </Link>
            </li>
            <li>
              <Link to="/scriitori">
                <Users size={16} />
                <span>Scriitori</span>
              </Link>
            </li>
            <li>
              <Link to="/subiecte">
                <GraduationCap size={16} />
                <span>Subiecte</span>
              </Link>
            </li>
            <li>
              <Link to="/ai">
                <Brain size={16} />
                <span>AI</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Resurse Section */}
        <div className="footer-section">
          <h3 className="footer-title">Resurse</h3>
          <ul className="footer-links">
            <li>
              <Link to="/biblioteca">
                <Library size={16} />
                <span>Bibliotecă</span>
              </Link>
            </li>
            <li>
              <Link to="/videoclipuri">
                <Video size={16} />
                <span>Videoclipuri</span>
              </Link>
            </li>
            <li>
              <Link to="/proiecte">
                <Presentation size={16} />
                <span>Proiecte</span>
              </Link>
            </li>
            <li>
              <Link to="/curente">
                <TrendingUp size={16} />
                <span>Curente literare</span>
              </Link>
            </li>
            <li>
              <Link to="/ghiduri">
                <GhidSubiect2Icon size={16} />
                <span>Ghiduri BAC</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section footer-contact">
          <h3 className="footer-title">Contact</h3>
          <div className="footer-contact-info">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=romanacoment@gmail.com" className="footer-email">
              <Mail size={18} />
              <span>romanacoment@gmail.com</span>
            </a>
          </div>
          <p className="footer-contact-text">
            Ai întrebări sau sugestii? Ne poți contacta oricând!
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">
            © {currentYear} Comentarii de BAC. Toate drepturile rezervate.
          </p>
          <p className="footer-legal">
            Conținut educațional pentru pregătirea la examenul de bacalaureat.
          </p>
        </div>
      </div>
    </footer>
  );
} 
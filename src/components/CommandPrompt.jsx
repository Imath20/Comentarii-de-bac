import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import { isAdminEmail } from '../utils/adminUtils';
import { deleteAllNotifications } from '../firebase/notificationsService';
import '../styles/commandPrompt.scss';

export default function CommandPrompt() {
  const [isOpen, setIsOpen] = useState(false);
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState([]);
  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const [inspectMode, setInspectMode] = useState(false);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const navigate = useNavigate();
  const { logout, userProfile, currentUser } = useAuth();
  const inspectModeRef = useRef(false);

  useEffect(() => {
    // Update theme when it changes
    const checkTheme = () => {
      setDarkTheme(localStorage.getItem('theme') === 'dark');
    };
    checkTheme();
    const interval = setInterval(checkTheme, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Keyboard shortcut: Shift+` (tilde) to toggle command prompt
    const handleKeyDown = (e) => {
      // Check for Shift+` (Backquote key with Shift produces ~)
      // Use code to detect the physical key, not the character
      if (e.shiftKey && e.code === 'Backquote') {
        // Don't trigger if we're typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
          return;
        }
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Focus input when opened
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    // Scroll output to bottom
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const addOutput = (message, type = 'info') => {
    setOutput((prev) => [...prev, { message, type, timestamp: new Date() }]);
  };

  const exitInspectMode = () => {
    inspectModeRef.current = false;
    setInspectMode(false);
    // Remove all outlines
    document.querySelectorAll('*').forEach((el) => {
      el.style.outline = '';
      el.style.outlineOffset = '';
      el.style.cursor = '';
    });
  };

  useEffect(() => {
    // Handle inspect mode
    if (inspectMode) {
      inspectModeRef.current = true;
      
      const handleMouseOver = (e) => {
        e.stopPropagation();
        // Highlight element
        e.target.style.outline = '2px solid #ffd591';
        e.target.style.outlineOffset = '2px';
        e.target.style.cursor = 'crosshair';
      };

      const handleMouseOut = (e) => {
        e.target.style.outline = '';
        e.target.style.outlineOffset = '';
        e.target.style.cursor = '';
      };

      const handleClick = (e) => {
        // Don't prevent default - allow normal interaction with page
        // Only log if clicking on page elements (not command prompt itself)
        const commandPromptElement = document.querySelector('.command-prompt');
        if (commandPromptElement && commandPromptElement.contains(e.target)) {
          return; // Ignore clicks inside command prompt
        }
        
        // Log element info to console
        console.log('Inspectarea elementului:', e.target);
        console.log('Element details:', {
          tag: e.target.tagName,
          id: e.target.id,
          classes: e.target.className,
          text: e.target.textContent?.substring(0, 100),
          styles: window.getComputedStyle(e.target),
        });
        
        const elementInfo = `${e.target.tagName.toLowerCase()}${e.target.id ? '#' + e.target.id : ''}${e.target.className ? '.' + e.target.className.split(' ').filter(c => c).join('.') : ''}`;
        addOutput(`Inspectat: ${elementInfo}`, 'success');
        addOutput('Detalii elementului logate în consolă. Apasă F12 pentru a le vedea.', 'info');
        exitInspectMode();
      };

      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          exitInspectMode();
        }
      };

      document.addEventListener('mouseover', handleMouseOver, true);
      document.addEventListener('mouseout', handleMouseOut, true);
      document.addEventListener('click', handleClick, true);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mouseover', handleMouseOver, true);
        document.removeEventListener('mouseout', handleMouseOut, true);
        document.removeEventListener('click', handleClick, true);
        document.removeEventListener('keydown', handleEscape);
        // Clean up any remaining outlines
        document.querySelectorAll('*').forEach((el) => {
          el.style.outline = '';
          el.style.outlineOffset = '';
          el.style.cursor = '';
        });
      };
    } else {
      inspectModeRef.current = false;
    }
  }, [inspectMode]);

  const executeCommand = async (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(' ');
    const command = parts[0];
    const args = parts.slice(1).join(' ');

    addOutput(`> ${cmd}`, 'command');

    switch (command) {
      case 'goto':
        if (!args) {
          addOutput('Utilizare: goto <path> (ex: goto home, goto scriitori, goto opere)', 'error');
          break;
        }
        
        // Map common names to routes
        const routeMap = {
          'home': '/',
          'scriitori': '/scriitori',
          'opere': '/opere',
          'comentarii': '/comentarii',
          'subiecte': '/subiecte',
          'biblioteca': '/biblioteca',
          'videoclipuri': '/videoclipuri',
          'proiecte': '/proiecte',
          'ai': '/ai',
          'curente': '/curente',
          'admin': '/admin',
          'login': '/login',
          'profil': '/profil',
        };
        
        const normalizedArgs = args.toLowerCase().trim();
        let route = routeMap[normalizedArgs];
        
        // If not in map, try using args as direct path
        if (!route) {
          // Check if it starts with /, if not add it
          route = normalizedArgs.startsWith('/') ? normalizedArgs : `/${normalizedArgs}`;
        }
        
        try {
          navigate(route);
          addOutput(`Navigat la: ${route}`, 'success');
        } catch (error) {
          addOutput(`Eroare la navigare la: ${route}`, 'error');
        }
        break;

      case 'search':
        const searchMatch = cmd.match(/search\s+"([^"]+)"/i);
        if (searchMatch) {
          const searchTerm = searchMatch[1];
          // Try to find search functionality on page
          const searchInputs = document.querySelectorAll('input[type="search"], input[placeholder*="search" i], input[placeholder*="cauta" i], input[placeholder*="caută" i]');
          if (searchInputs.length > 0) {
            const searchInput = searchInputs[0];
            searchInput.value = searchTerm;
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            searchInput.dispatchEvent(new Event('change', { bubbles: true }));
            searchInput.focus();
            addOutput(`Searching for: "${searchTerm}"`, 'success');
          } else {
            // Fallback: use browser find
            if (window.find) {
              window.find(searchTerm);
              addOutput(`Caută: "${searchTerm}" (folosind funcția de căutare a browserului)`, 'success');
            } else {
              addOutput('Nu s-a găsit funcționalitatea de căutare pe această pagină', 'error');
            }
          }
        } else {
          addOutput('Utilizare: search "termenul de căutare"', 'error');
        }
        break;

      case 'theme':
        if (args === 'dark') {
          document.body.classList.add('dark-theme');
          localStorage.setItem('theme', 'dark');
          setDarkTheme(true);
          addOutput('Tema schimbată în întunecată', 'success');
        } else if (args === 'light') {
          document.body.classList.remove('dark-theme');
          localStorage.setItem('theme', 'light');
          setDarkTheme(false);
          addOutput('Tema schimbată în luminoasă', 'success');
        } else {
          addOutput('Utilizare: theme dark | theme light', 'error');
        }
        break;

      case 'reload':
        window.location.reload();
        break;

      case 'show':
        if (args === 'logs') {
          // Open console
          addOutput('Logurile consolei sunt afișate în DevTools-ul browserului. Apasă F12 pentru a le deschide.', 'info');
          // Try to programmatically open console (browser dependent)
          console.log('Command Prompt: Console opened');
        } else {
          addOutput(`Comandă necunoscută: show ${args}`, 'error');
        }
        break;

      case 'inspect':
        setInspectMode(true);
        addOutput('Modul de inspectare activat. Poți naviga peste elemente și să le examinezi.', 'info');
        addOutput('Apasă ESC sau scrie "exit inspect" pentru a ieși din modul de inspectare.', 'info');
        break;

      case 'exit':
        if (args === 'inspect') {
          exitInspectMode();
          addOutput('Modul de inspectare dezactivat', 'success');
        } else {
          addOutput(`Comandă necunoscută: exit ${args}`, 'error');
        }
        break;

      case 'clear':
        if (!args) {
          // Clear command prompt output
          setOutput([]);
          addOutput('Linia de comandă ștearsă', 'success');
        } else if (args === 'cache') {
          // Clear browser cache
          if ('caches' in window) {
            caches.keys().then((names) => {
              names.forEach((name) => {
                caches.delete(name);
              });
              addOutput('Cache șters cu succes', 'success');
            });
          } else {
            addOutput('API-ul de cache nu este disponibil. Vă rugăm să ștergeți cache-ul manual din setările browserului.', 'error');
          }
        } else if (args === 'history') {
          // Clear notifications history - admin only
          const isAdmin = userProfile?.isAdmin === true || 
            (currentUser?.email && isAdminEmail(currentUser.email));
          
          if (!isAdmin) {
            addOutput('Nu ai permisiuni pentru această comandă. Doar administratorii pot șterge istoricul notificărilor.', 'error');
            break;
          }

          try {
            await deleteAllNotifications();
            addOutput('Istoricul notificărilor a fost șters cu succes', 'success');
          } catch (error) {
            addOutput(`Eroare la ștergerea istoricului: ${error.message}`, 'error');
          }
        } else {
          addOutput(`Unknown command: clear ${args}`, 'error');
        }
        break;

      case 'time':
        const now = new Date();
        const timeStr = now.toLocaleString('ro-RO', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        addOutput(timeStr, 'info');
        break;

      case 'delog':
        logout()
          .then(() => {
            addOutput('Deconectat cu succes', 'success');
            navigate('/');
          })
          .catch((error) => {
            addOutput(`Eroare la deconectare: ${error.message}`, 'error');
          });
        break;

      case 'open':
        if (args === 'admin') {
          navigate('/admin');
          addOutput('Navigat la panoul de administrare', 'success');
        } else {
          addOutput(`Destinație necunoscută: ${args}`, 'error');
        }
        break;

      case 'help':
        const isAdmin = userProfile?.isAdmin === true || 
          (currentUser?.email && isAdminEmail(currentUser.email));
        
        addOutput('Comenzi disponibile:', 'info');
        addOutput('  goto <path> - Navighează la pagina (ex: goto home, goto scriitori)', 'info');
        addOutput('  search "term" - Caută termenul pe pagina', 'info');
        addOutput('  theme dark/light - Schimbă tema', 'info');
        addOutput('  reload - Reîncarcă pagina', 'info');
        addOutput('  show logs - Afișează loguri în consolă', 'info');
        addOutput('  inspect - Activează modul de inspectare', 'info');
        addOutput('  exit inspect - Dezactivează modul de inspectare', 'info');
        addOutput('  clear - Șterge ieșirea din linia de comandă', 'info');
        addOutput('  clear cache - Șterge cache-ul browserului', 'info');
        if (isAdmin) {
          addOutput('  clear history - Șterge istoricul notificărilor (doar admini)', 'info');
        }
        addOutput('  time - Afișează ora și data curentă', 'info');
        addOutput('  delog - Deconectează contul', 'info');
        addOutput('  open admin - Navighează la panoul de administrare', 'info');
        addOutput('  help - Afișează mesajul de ajutor', 'info');
        addOutput('  exit/close - Închide linia de comandă', 'info');
        break;

      case 'close':
      case 'exit':
        setIsOpen(false);
        break;

      case '':
        // Empty command, do nothing
        break;

      default:
        addOutput(`Comandă necunoscută: ${command}. Scrie "help" pentru comenzile disponibile.`, 'error');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (command.trim()) {
        setHistory((prev) => [...prev, command]);
        setHistoryIndex(-1);
        executeCommand(command);
        setCommand('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCommand(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCommand(history[newIndex]);
        }
      }
    } else if (e.key === 'Escape') {
      if (inspectMode) {
        exitInspectMode();
        addOutput('Inspect mode disabled', 'success');
      } else {
        setIsOpen(false);
      }
    }
  };

  const togglePrompt = () => {
    setIsOpen(!isOpen);
  };

  if (!isOpen) {
    return (
      <button
        className={`command-prompt-toggle ${darkTheme ? 'dark-theme' : ''}`}
        onClick={togglePrompt}
        title="Deschide linia de comandă (Shift+~)"
        aria-label="Deschide linia de comandă"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M4 9h16M4 9l-2 8h20l-2-8M9 13h6" />
        </svg>
      </button>
    );
  }

  return (
    <div 
      className={`command-prompt-overlay ${darkTheme ? 'dark-theme' : ''} ${inspectMode ? 'inspect-mode' : ''}`} 
      onClick={(e) => {
        if (e.target === e.currentTarget && !inspectMode) {
          setIsOpen(false);
        }
      }}
      style={inspectMode ? { pointerEvents: 'none' } : {}}
    >
      <div 
        className={`command-prompt ${darkTheme ? 'dark-theme' : ''}`} 
        onClick={(e) => {
          if (!inspectMode) {
            e.stopPropagation();
          }
        }}
        style={inspectMode ? { pointerEvents: 'auto' } : {}}
      >
        <div className="command-prompt-header">
          <span className="command-prompt-title">Linia de comandă</span>
          <button
            className="command-prompt-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="command-prompt-output" ref={outputRef}>
          {output.length === 0 && (
            <div className="command-prompt-welcome">
              <div>Bine ai venit la linia de comandă</div>
              <div>Scrie "help" pentru comenzile disponibile</div>
            </div>
          )}
          {output.map((item, index) => (
            <div key={index} className={`command-prompt-line command-prompt-line-${item.type}`}>
              <span className="command-prompt-time">
                {item.timestamp.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
              <span className="command-prompt-message">{item.message}</span>
            </div>
          ))}
        </div>
        <div className="command-prompt-input-container">
          <span className="command-prompt-prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            className="command-prompt-input"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Scrie o comandă..."
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
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
  const { logout } = useAuth();
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
        console.log('Inspecting element:', e.target);
        console.log('Element details:', {
          tag: e.target.tagName,
          id: e.target.id,
          classes: e.target.className,
          text: e.target.textContent?.substring(0, 100),
          styles: window.getComputedStyle(e.target),
        });
        
        const elementInfo = `${e.target.tagName.toLowerCase()}${e.target.id ? '#' + e.target.id : ''}${e.target.className ? '.' + e.target.className.split(' ').filter(c => c).join('.') : ''}`;
        addOutput(`Inspected: ${elementInfo}`, 'success');
        addOutput('Element details logged to console. Press F12 to view.', 'info');
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

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(' ');
    const command = parts[0];
    const args = parts.slice(1).join(' ');

    addOutput(`> ${cmd}`, 'command');

    switch (command) {
      case 'goto':
        if (!args) {
          addOutput('Usage: goto <path> (e.g., goto home, goto scriitori, goto opere)', 'error');
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
          addOutput(`Navigated to: ${route}`, 'success');
        } catch (error) {
          addOutput(`Error navigating to: ${route}`, 'error');
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
              addOutput(`Searching for: "${searchTerm}" (using browser find)`, 'success');
            } else {
              addOutput('No search functionality found on this page', 'error');
            }
          }
        } else {
          addOutput('Usage: search "your search term"', 'error');
        }
        break;

      case 'theme':
        if (args === 'dark') {
          document.body.classList.add('dark-theme');
          localStorage.setItem('theme', 'dark');
          setDarkTheme(true);
          addOutput('Theme changed to dark', 'success');
        } else if (args === 'light') {
          document.body.classList.remove('dark-theme');
          localStorage.setItem('theme', 'light');
          setDarkTheme(false);
          addOutput('Theme changed to light', 'success');
        } else {
          addOutput('Usage: theme dark | theme light', 'error');
        }
        break;

      case 'reload':
        window.location.reload();
        break;

      case 'show':
        if (args === 'logs') {
          // Open console
          addOutput('Console logs are shown in browser DevTools. Press F12 to open.', 'info');
          // Try to programmatically open console (browser dependent)
          console.log('Command Prompt: Console opened');
        } else {
          addOutput(`Unknown command: show ${args}`, 'error');
        }
        break;

      case 'inspect':
        setInspectMode(true);
        addOutput('Inspect mode enabled. Hover over elements and click to inspect.', 'info');
        addOutput('Press ESC or type "exit inspect" to exit inspect mode.', 'info');
        break;

      case 'exit':
        if (args === 'inspect') {
          exitInspectMode();
          addOutput('Inspect mode disabled', 'success');
        } else {
          addOutput(`Unknown command: exit ${args}`, 'error');
        }
        break;

      case 'clear':
        if (!args) {
          // Clear command prompt output
          setOutput([]);
          addOutput('Command prompt cleared', 'success');
        } else if (args === 'cache') {
          // Clear browser cache
          if ('caches' in window) {
            caches.keys().then((names) => {
              names.forEach((name) => {
                caches.delete(name);
              });
              addOutput('Cache cleared successfully', 'success');
            });
          } else {
            addOutput('Cache API not available. Please clear cache manually from browser settings.', 'error');
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
            addOutput('Logged out successfully', 'success');
            navigate('/');
          })
          .catch((error) => {
            addOutput(`Error logging out: ${error.message}`, 'error');
          });
        break;

      case 'open':
        if (args === 'admin') {
          navigate('/admin');
          addOutput('Navigated to admin panel', 'success');
        } else {
          addOutput(`Unknown destination: ${args}`, 'error');
        }
        break;

      case 'help':
        addOutput('Available commands:', 'info');
        addOutput('  goto <path> - Navigate to page (e.g., goto home, goto scriitori)', 'info');
        addOutput('  search "term" - Search for term on page', 'info');
        addOutput('  theme dark/light - Change theme', 'info');
        addOutput('  reload - Reload the page', 'info');
        addOutput('  show logs - Show console logs info', 'info');
        addOutput('  inspect - Enable inspect mode', 'info');
        addOutput('  exit inspect - Disable inspect mode', 'info');
        addOutput('  clear - Clear command prompt output', 'info');
        addOutput('  clear cache - Clear browser cache', 'info');
        addOutput('  time - Show current time and date', 'info');
        addOutput('  delog - Logout from account', 'info');
        addOutput('  open admin - Navigate to admin panel', 'info');
        addOutput('  help - Show this help message', 'info');
        addOutput('  exit/close - Close command prompt', 'info');
        break;

      case 'close':
      case 'exit':
        setIsOpen(false);
        break;

      case '':
        // Empty command, do nothing
        break;

      default:
        addOutput(`Unknown command: ${command}. Type "help" for available commands.`, 'error');
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
        title="Open Command Prompt (Shift+~)"
        aria-label="Open Command Prompt"
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
          <span className="command-prompt-title">Command Prompt</span>
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
              <div>Welcome to Command Prompt</div>
              <div>Type "help" for available commands</div>
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
            placeholder="Type a command..."
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}


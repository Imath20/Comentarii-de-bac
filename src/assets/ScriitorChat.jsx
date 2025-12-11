import React, { useMemo, useState, useRef, useEffect } from 'react';
import {
  Plus,
  Trash2,
  History,
  X,
  RefreshCcw,
  Edit3,
  Send
} from 'lucide-react';

const ScriitorChat = ({ scriitorKey, onClose, scriitorMeta }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editingSessionTitle, setEditingSessionTitle] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const historyMenuRef = useRef(null);

  const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;          // primar
  const groqApiKeyBackup = import.meta.env.VITE_GROQ_API_KEY_1;  // secundar
  const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
  const groqApiKeys = useMemo(() => {
    return [groqApiKey, groqApiKeyBackup].filter(k => k && k !== 'undefined');
  }, [groqApiKey, groqApiKeyBackup]);
  const groqAvailable = useMemo(() => groqApiKeys.length > 0, [groqApiKeys]);
  const storageKey = useMemo(() => `scriitor-chat-${scriitorKey || 'default'}`, [scriitorKey]); // legacy
  const storageSessionsKey = useMemo(() => `scriitor-chat-sessions-${scriitorKey || 'default'}`, [scriitorKey]);
  
  if (!scriitorMeta) {
    return null;
  }

  const scriitorName = scriitorMeta.nume || 'Scriitor';
  const scriitorAvatar = scriitorMeta.img || '';

  // Construim un scurt rezumat biografic și de stil pentru prompt-ul AI
  const personaContext = useMemo(() => {
    const categorie = scriitorMeta?.categorie ? `Categorie: ${scriitorMeta.categorie}.` : '';
    const metaBio = scriitorMeta?.biografie || scriitorMeta?.prezentare?.bibliografie || '';
    const date = scriitorMeta?.date ? `Perioadă/ani: ${scriitorMeta.date}.` : '';
    const opere = scriitorMeta?.opere ? Object.values(scriitorMeta.opere).flat().slice(0, 6).join('; ') : '';
    const opereText = opere ? `Opere cunoscute: ${opere}.` : '';
    const info = scriitorMeta?.info ? Object.entries(scriitorMeta.info).map(([k, v]) => `${k}: ${v}`).join('; ') : '';
    const infoText = info ? `Informații: ${info}.` : '';
    return [categorie, date, opereText, infoText, metaBio].filter(Boolean).join(' ');
  }, [scriitorMeta]);

  const systemPrompt = useMemo(() => {
    return [
      `Ești ${scriitorName}, scriitor român. Vorbești la persoana I, menții tonul și vocabularul autorului, fără emoji și fără explicații tehnice.`,
      personaContext ? `Context util: ${personaContext}` : '',
      'Răspunde concis (1-4 fraze), cu respect pentru perioada ta istorică și temele recurente.',
      'Dacă nu ai o informație exactă, recunoaște onest și răspunde general, păstrând stilul scriitorului.',
      'Răspunde întotdeauna în limba română, păstrând autenticitatea stilului scriitorului.'
    ].filter(Boolean).join('\n\n');
  }, [personaContext, scriitorName]);

  const createWelcomeMessages = useMemo(() => () => ([
    {
      id: Date.now(),
      text: `Salut! Sunt ${scriitorName}. Îmi place să vorbesc cu oamenii și să împărtășesc gândurile mele. Cum te pot ajuta astăzi?`,
      sender: 'scriitor',
      timestamp: new Date()
    }
  ]), [scriitorName]);

  const currentSession = useMemo(
    () => sessions.find(s => s.id === currentSessionId),
    [sessions, currentSessionId]
  );

  const lastUserMessageId = useMemo(() => {
    const lastUser = [...messages].reverse().find(m => m.sender === 'user');
    return lastUser?.id || null;
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startRenameSession = (id) => {
    const current = sessions.find(s => s.id === id);
    setEditingSessionId(id);
    setEditingSessionTitle(current?.title || '');
  };

  const commitRenameSession = () => {
    const trimmed = (editingSessionTitle || '').trim();
    if (!editingSessionId) return;
    setSessions(prev => prev.map(s => s.id === editingSessionId ? { ...s, title: trimmed || s.title } : s));
    setEditingSessionId(null);
    setEditingSessionTitle('');
  };

  const cancelRenameSession = () => {
    setEditingSessionId(null);
    setEditingSessionTitle('');
  };

  const deleteSession = (id) => {
    if (sessions.length <= 1) {
      alert('Păstrează cel puțin un chat.');
      return;
    }
    setSessions(prev => {
      const filtered = prev.filter(s => s.id !== id);
      // dacă am șters sesiunea curentă, mută pe prima rămasă
      const nextCurrent = filtered[0];
      if (id === currentSessionId && nextCurrent) {
        setCurrentSessionId(nextCurrent.id);
        setMessages(nextCurrent.messages || []);
      }
      return filtered;
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Încarcă sesiunile (sau migrează istoricul vechi) și setează sesiunea curentă
  useEffect(() => {
    if (!scriitorMeta) return;

    const load = () => {
      const savedSessionsRaw = localStorage.getItem(storageSessionsKey);
      if (savedSessionsRaw) {
        try {
          const parsed = JSON.parse(savedSessionsRaw);
          if (Array.isArray(parsed) && parsed.length) {
            const normalized = parsed.map(s => ({
              ...s,
              messages: (s.messages || []).map(m => ({
                ...m,
                timestamp: m.timestamp ? new Date(m.timestamp) : new Date()
              }))
            }));
            setSessions(normalized);
            setCurrentSessionId(normalized[0].id);
            setMessages(normalized[0].messages || []);
            return;
          }
        } catch (_) {
          /* fall through to legacy */
        }
      }

      // Migrare din formatul vechi (un singur chat salvat)
      const legacy = localStorage.getItem(storageKey);
      let initialMessages = [];
      if (legacy) {
        try {
          const parsed = JSON.parse(legacy);
          if (Array.isArray(parsed) && parsed.length) {
            initialMessages = parsed.map(m => ({
              ...m,
              timestamp: m.timestamp ? new Date(m.timestamp) : new Date()
            }));
          }
        } catch (_) { /* ignore */ }
      }
      if (!initialMessages.length) {
        initialMessages = createWelcomeMessages();
      }
      const sessionId = `session-${Date.now()}`;
      const firstSession = {
        id: sessionId,
        title: 'Chat 1',
        createdAt: new Date().toISOString(),
        messages: initialMessages,
        lastUserText: ''
      };
      setSessions([firstSession]);
      setCurrentSessionId(sessionId);
      setMessages(initialMessages);
    };

    load();
  }, [scriitorMeta, storageSessionsKey, storageKey, createWelcomeMessages]);

  // Focus pe input (după montare sau schimbare scriitor)
  useEffect(() => {
    const t = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
    return () => clearTimeout(t);
  }, [scriitorKey]);

  // Persistă sesiunile (limităm fiecare la 60 mesaje)
  useEffect(() => {
    if (!sessions.length) return;
    const trimmed = sessions.map(s => ({
      ...s,
      messages: (s.messages || []).slice(-60).map(m => ({
        ...m,
        timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : m.timestamp
      }))
    }));
    localStorage.setItem(storageSessionsKey, JSON.stringify(trimmed));
  }, [sessions, storageSessionsKey]);

  // Sincronizează mesajele curente în sesiunea selectată
  useEffect(() => {
    if (!currentSessionId) return;
    setSessions(prev => prev.map(s => s.id === currentSessionId ? { ...s, messages } : s));
  }, [messages, currentSessionId]);

  // Fallback response dacă AI nu este disponibil
  const generateFallbackResponse = (userText) => {
    const contextualResponses = [
      "Este o întrebare care merită să fie gândită cu atenție. Fiecare zi aduce noi provocări și noi oportunități de a învăța despre viață și despre noi înșine.",
      "În viața mea am învățat că fiecare întrebare are răspunsul său, dar nu întotdeauna în forma pe care o așteptăm. Este important să fim atenți la lecțiile pe care ni le oferă experiența.",
      "Să știi că viața este plină de surprize și fiecare conversație ne poate învăța ceva nou. Este important să fim deschiși la învățăturile pe care ni le oferă fiecare zi.",
      "În gândurile mele reflectez asupra întrebării tale. Fiecare zi este o nouă lecție de viață, și fiecare întrebare ne aduce mai aproape de înțelegerea misterului existenței."
    ];
    
    return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
  };

  const buildGroqMessages = (userText) => {
    const history = messages.slice(-8).map((m) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }));

    return [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: userText }
    ];
  };

  const fetchGroqResponse = async (userText) => {
    const fallback = generateFallbackResponse(userText);

    // Dacă nu avem key/url valid, răspunde direct cu fallback
    if (!groqAvailable || !groqApiUrl) {
      return fallback;
    }

    const body = {
      model: 'openai/gpt-oss-120b',
      messages: buildGroqMessages(userText),
      temperature: 0.7,
      max_tokens: 320
    };

    for (const key of groqApiKeys) {
      try {
        const res = await fetch(groqApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
          },
          body: JSON.stringify(body)
        });

        if (!res.ok) {
          const text = await res.text().catch(() => '');
          let msg = `Eroare API Groq (${res.status})`;
          try {
            const data = JSON.parse(text);
            if (data?.error?.message) msg = data.error.message;
          } catch (_) { /* noop */ }
          console.warn('Groq API key fallback:', msg);
          continue; // încearcă următorul key
        }

        const data = await res.json();
        const content = data?.choices?.[0]?.message?.content?.trim();
        if (!content) {
          console.warn('Groq API fallback: răspuns gol', data);
          continue; // încearcă următorul key
        }
        return content;
      } catch (err) {
        console.warn('Groq API key fallback: excepție', err);
        // încearcă următorul key
      }
    }

    // Dacă toate cheile au eșuat
    return fallback;
  };

  // Funcție pentru afișarea treptată a textului (typing effect)
  const typeMessage = (fullText, messageId) => {
    // Oprește orice typing în curs
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    const words = fullText.split(' ');
    let currentIndex = 0;
    const wordsPerSecond = 10;
    const delay = 800 / wordsPerSecond; // ~333ms per cuvânt

    const typeInterval = setInterval(() => {
      if (currentIndex < words.length) {
        const currentText = words.slice(0, currentIndex + 1).join(' ');
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, text: currentText }
            : msg
        ));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        typingIntervalRef.current = null;
        setIsTyping(false);
      }
    }, delay);

    typingIntervalRef.current = typeInterval;
  };

  // Cleanup la unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isHistoryOpen && historyMenuRef.current && !historyMenuRef.current.contains(event.target)) {
        setIsHistoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isHistoryOpen]);

  const handleSendMessage = async (textOverride, { redo = false } = {}) => {
    const baseText = typeof textOverride === 'string' ? textOverride : inputMessage;
    const trimmed = (baseText || '').trim();
    if (!trimmed) return;

    // dacă nu există sesiune, creăm rapid una
    if (!currentSessionId) {
      const welcome = createWelcomeMessages();
      const newId = `session-${Date.now()}`;
      const newSession = {
        id: newId,
        title: 'Chat 1',
        createdAt: new Date().toISOString(),
        messages: welcome,
        lastUserText: ''
      };
      setSessions([newSession]);
      setCurrentSessionId(newId);
      setMessages(welcome);
    }

    setSessions(prev => prev.map(s => s.id === currentSessionId ? { ...s, lastUserText: trimmed } : s));

    const isEditing = Boolean(editingMessageId);
    let targetAssistantId = null;

    if (isEditing) {
      const userIdx = messages.findIndex(m => m.id === editingMessageId);
      const followingAssistant = userIdx !== -1
        ? messages.slice(userIdx + 1).find(m => m.sender === 'scriitor')
        : null;
      targetAssistantId = followingAssistant?.id || Date.now() + 1;

      setMessages(prev => {
        const updated = [...prev];
        const idx = updated.findIndex(m => m.id === editingMessageId);
        if (idx === -1) return prev;

        updated[idx] = { ...updated[idx], text: trimmed };

        const aIdx = updated.slice(idx + 1).findIndex(m => m.sender === 'scriitor');
        if (aIdx !== -1) {
          const realIdx = idx + 1 + aIdx;
          updated[realIdx] = { ...updated[realIdx], text: '' };
        } else {
          updated.splice(idx + 1, 0, {
            id: targetAssistantId,
            text: '',
            sender: 'scriitor',
            timestamp: new Date()
          });
        }
        return updated;
      });
      if (!redo) setInputMessage('');
      setEditingMessageId(null);
      setIsTyping(true);
    } else {
      const userMessage = {
        id: Date.now(),
        text: trimmed,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      if (!redo) setInputMessage('');
      setIsTyping(true);
    }

    try {
      let reply;

      if (groqAvailable) {
        reply = await fetchGroqResponse(trimmed);
      } else {
        reply = generateFallbackResponse(trimmed);
      }

      if (isEditing) {
        // tipărim în același loc
        typeMessage(reply, targetAssistantId);
      } else {
        // Creează mesajul cu text gol inițial
        const messageId = Date.now() + 1;
        const scriitorMessage = {
          id: messageId,
          text: '',
          sender: 'scriitor',
          timestamp: new Date()
        };

        // Adaugă mesajul gol în listă
        setMessages(prev => [...prev, scriitorMessage]);

        // Începe typing effect
        typeMessage(reply, messageId);
      }
    } catch (err) {
      console.error('Eroare Groq chat:', err);
      const fallback = generateFallbackResponse(trimmed);
      if (isEditing) {
        typeMessage(fallback, targetAssistantId);
      } else {
        const messageId = Date.now() + 1;
        const errorMessage = {
          id: messageId,
          text: '',
          sender: 'scriitor',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorMessage]);
        const fullText = groqAvailable
          ? `Am avut o problemă tehnică, dar iată un răspuns pe scurt: ${fallback}`
          : fallback;
        typeMessage(fullText, messageId);
      }
    }
  };

  const clearChat = () => {
    const welcome = createWelcomeMessages();
    setMessages(welcome);
    setSessions(prev => prev.map(s => s.id === currentSessionId ? { ...s, messages: welcome, lastUserText: '' } : s));
    setIsTyping(false);
  };

  const startNewChat = () => {
    const welcome = createWelcomeMessages();
    const newId = `session-${Date.now()}`;
    const newSession = {
      id: newId,
      title: `Chat ${sessions.length + 1}`,
      createdAt: new Date().toISOString(),
      messages: welcome,
      lastUserText: ''
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newId);
    setMessages(welcome);
    setIsTyping(false);
    setInputMessage('');
  };

  const selectSession = (id) => {
    const session = sessions.find(s => s.id === id);
    if (!session) return;
    setCurrentSessionId(id);
    setMessages(session.messages || []);
    setIsTyping(false);
    setInputMessage('');
  };

  const redoLast = async () => {
    const lastUser = [...messages].reverse().find(m => m.sender === 'user');
    if (!lastUser?.text) {
      alert('Nu există un mesaj anterior de refăcut.');
      return;
    }

    setIsTyping(true);

    // găsește replica scriitorului imediat după ultimul mesaj al utilizatorului
    const lastUserIndex = messages.findIndex(m => m.id === lastUser.id);
    const followingAssistant = messages
      .slice(lastUserIndex + 1)
      .find(m => m.sender === 'scriitor');

    let targetId = followingAssistant?.id;

    if (targetId) {
      // curăță textul existent pentru efectul de scriere
      setMessages(prev =>
        prev.map(m =>
          m.id === targetId ? { ...m, text: '' } : m
        )
      );
    } else {
      // dacă nu există un răspuns, adaugă unul nou legat de același moment
      targetId = Date.now() + 1;
      const scriitorMessage = {
        id: targetId,
        text: '',
        sender: 'scriitor',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, scriitorMessage]);
    }

    try {
      const reply = groqAvailable
        ? await fetchGroqResponse(lastUser.text)
        : generateFallbackResponse(lastUser.text);
      typeMessage(reply, targetId);
    } catch (err) {
      console.error('Eroare redo:', err);
      const fallback = generateFallbackResponse(lastUser.text);
      typeMessage(fallback, targetId);
    }
  };

  const editLast = (text) => {
    const lastUser = [...messages].reverse().find(m => m.sender === 'user');
    const value = text || lastUser?.text || '';
    if (!value) return;
    setEditingMessageId(lastUser?.id || null);
    setInputMessage(value);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateValue) => {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    return date.toLocaleTimeString('ro-RO', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="scriitor-chat-overlay" onClick={onClose}>
      <div className="scriitor-chat-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="scriitor-chat-header">
          <div className="scriitor-chat-avatar">
            <img src={scriitorAvatar} alt={scriitorName} />
          </div>
          <div className="scriitor-chat-info">
            <h3>{scriitorName}</h3>
            <span className="scriitor-chat-status">
              {isTyping ? 'Scrie...' : 'Online'}
            </span>
          </div>
          <div className="scriitor-chat-header-actions">
            <button
              className="scriitor-chat-icon-btn"
              onClick={startNewChat}
              title="Chat nou"
            >
              <Plus size={18} />
            </button>
            <button
              className="scriitor-chat-icon-btn"
              onClick={clearChat}
              disabled={!messages.length}
              title="Șterge chatul"
            >
              <Trash2 size={18} />
            </button>
            <div className="scriitor-chat-history-trigger" ref={historyMenuRef}>
              <button
                className={`scriitor-chat-icon-btn ${isHistoryOpen ? 'active' : ''}`}
                onClick={() => setIsHistoryOpen((prev) => !prev)}
                title="Istoric conversații"
              >
                <History size={18} />
              </button>
              {isHistoryOpen && (
                <div className="scriitor-chat-history-menu">
                  <div className="scriitor-chat-history-title">Istoric</div>
                  <div className="scriitor-chat-history-list">
                    {sessions.map((s) => {
                      const isEditingSession = editingSessionId === s.id;
                      return (
                        <div className="scriitor-chat-history-row" key={s.id}>
                          {isEditingSession ? (
                            <input
                              className={`scriitor-chat-history-item scriitor-chat-history-input ${s.id === currentSessionId ? 'active' : ''}`}
                              value={editingSessionTitle}
                              autoFocus
                              onChange={(e) => setEditingSessionTitle(e.target.value)}
                              onBlur={commitRenameSession}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  commitRenameSession();
                                } else if (e.key === 'Escape') {
                                  e.preventDefault();
                                  cancelRenameSession();
                                }
                              }}
                              placeholder="Nume chat"
                            />
                          ) : (
                            <button
                              className={`scriitor-chat-history-item ${s.id === currentSessionId ? 'active' : ''}`}
                              onClick={() => {
                                selectSession(s.id);
                                setIsHistoryOpen(false);
                              }}
                              title={new Date(s.createdAt).toLocaleString('ro-RO')}
                            >
                              {s.title || 'Chat'}
                            </button>
                          )}
                          <div className="scriitor-chat-history-actions">
                            <button
                              className="scriitor-chat-history-action-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                startRenameSession(s.id);
                              }}
                              title="Redenumește"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              className="scriitor-chat-history-action-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteSession(s.id);
                              }}
                              disabled={sessions.length <= 1}
                              title={sessions.length <= 1 ? 'Păstrează cel puțin un chat' : 'Șterge'}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    {!sessions.length && (
                      <span className="scriitor-chat-history-empty">Niciun chat salvat</span>
                    )}
                  </div>
                </div>
              )}
            </div>
            <button
              className="scriitor-chat-icon-btn scriitor-chat-close"
              onClick={onClose}
              title="Închide"
            >
              <X size={25} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="scriitor-chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`scriitor-chat-message ${message.sender === 'user' ? 'user' : 'scriitor'}`}
            >
              {message.sender === 'scriitor' && (
                <div className="scriitor-chat-avatar-small">
                  <img src={scriitorAvatar} alt={scriitorName} />
                </div>
              )}
              <div className="scriitor-chat-message-content">
                <div className="scriitor-chat-message-text">
                  {message.text}
                </div>
                <div className="scriitor-chat-message-meta">
                  <span className="scriitor-chat-message-time">
                    {formatTime(message.timestamp)}
                  </span>
                  {message.sender === 'user' && message.id === lastUserMessageId && (
                    <div className="scriitor-chat-message-actions">
                      <button
                        className="scriitor-chat-meta-btn"
                        onClick={redoLast}
                        disabled={!currentSession?.lastUserText}
                        title="Refă răspuns"
                      >
                        <RefreshCcw size={14} />
                      </button>
                      <button
                        className="scriitor-chat-meta-btn"
                        onClick={() => editLast(message.text)}
                        disabled={!currentSession?.lastUserText}
                        title="Editează mesaj"
                      >
                        <Edit3 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="scriitor-chat-input-container">
          <div className="scriitor-chat-input-wrapper">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Scrie un mesaj..."
              className="scriitor-chat-input"
              rows="1"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="scriitor-chat-send-btn"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriitorChat; 
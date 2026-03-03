import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { BookOpen, Plus, Trash2, X, Send, Maximize2 } from 'lucide-react';
import { useAuth } from '../firebase/AuthContext';
import {
  getChatbotSessions,
  addChatbotSession,
  updateChatbotSession,
  deleteChatbotSession,
} from '../firebase/chatbotService';
import '../styles/chatbot.scss';

const STORAGE_KEY_GUEST = 'chatbot-sessions-guest';
const ASSISTANT_NAME = 'Asistentul BAC';
const MAX_MESSAGES_PER_SESSION = 60;

const createWelcomeMessages = () => [
  {
    id: Date.now(),
    text: `Bună! Sunt ${ASSISTANT_NAME}. Te pot ajuta cu întrebări despre opere, scriitori, curente literare, comentarii și subiecte pentru bacalaureat. Cu ce te pot ajuta?`,
    sender: 'assistant',
    timestamp: new Date(),
  },
];

const systemPrompt = `Ești un asistent educațional pentru pregătirea la bacalaureat la limba și literatura română. Răspunde la întrebări despre opere, scriitori, curente literare, comentarii și subiecte. Fii concis, precis și util pentru elevi. Răspunde întotdeauna în limba română.`;

export default function Chatbot() {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
  const groqApiKeyBackup = import.meta.env.VITE_GROQ_API_KEY_1;
  const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
  const groqApiKeys = useMemo(
    () => [groqApiKey, groqApiKeyBackup].filter((k) => k && k !== 'undefined'),
    [groqApiKey, groqApiKeyBackup]
  );
  const groqAvailable = useMemo(() => groqApiKeys.length > 0, [groqApiKeys]);

  const [themeClass, setThemeClass] = useState(() =>
    document.body.classList.contains('dark-theme') || localStorage.getItem('theme') === 'dark'
      ? 'dark-theme'
      : ''
  );

  useEffect(() => {
    const checkTheme = () => {
      setThemeClass(document.body.classList.contains('dark-theme') ? 'dark-theme' : '');
    };
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    checkTheme();
    return () => observer.disconnect();
  }, []);

  const currentSession = useMemo(
    () => sessions.find((s) => s.id === currentSessionId),
    [sessions, currentSessionId]
  );

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const generateFallbackResponse = (apiConfigured = false) => {
    if (!apiConfigured) {
      return 'Setează VITE_GROQ_API_KEY în .env și repornește serverul de development (npm run dev) pentru a folosi asistentul AI.';
    }
    return 'A apărut o eroare la API. Verifică cheia Groq sau încearcă din nou mai târziu.';
  };

  const buildGroqMessages = (userText) => {
    const history = messages.slice(-8).map((m) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text,
    }));
    return [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: userText },
    ];
  };

  const fetchGroqResponse = async (userText) => {
    if (!groqAvailable || !groqApiUrl) return generateFallbackResponse(false);

    const body = {
      model: 'openai/gpt-oss-120b',
      messages: buildGroqMessages(userText),
      temperature: 0.7,
      max_tokens: 512,
    };

    for (const key of groqApiKeys) {
      try {
        const res = await fetch(groqApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const text = await res.text().catch(() => '');
          try {
            const data = JSON.parse(text);
            if (data?.error?.message) console.warn('Groq:', data.error.message);
          } catch (_) {}
          continue;
        }

        const data = await res.json();
        const content = data?.choices?.[0]?.message?.content?.trim();
        if (content) return content;
      } catch (err) {
        console.warn('Groq API error:', err);
      }
    }
    return generateFallbackResponse(true);
  };

  const typeMessage = (fullText, messageId, onComplete) => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    const words = fullText.split(' ');
    let currentIndex = 0;
    const delay = 80;

    const typeInterval = setInterval(() => {
      if (currentIndex < words.length) {
        const currentText = words.slice(0, currentIndex + 1).join(' ');
        setMessages((prev) =>
          prev.map((msg) => (msg.id === messageId ? { ...msg, text: currentText } : msg))
        );
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        typingIntervalRef.current = null;
        setIsTyping(false);
        onComplete?.(fullText, messageId);
      }
    }, delay);
    typingIntervalRef.current = typeInterval;
  };

  const persistSessions = useCallback(
    async (newSessions) => {
      if (currentUser?.uid) {
        const session = newSessions.find((s) => s.id === currentSessionId);
        if (session) {
          try {
            const isFirebaseId = session.id && !session.id.startsWith('session-');
            if (isFirebaseId) {
              await updateChatbotSession(currentUser.uid, session.id, {
                title: session.title,
                messages: (session.messages || []).slice(-MAX_MESSAGES_PER_SESSION),
                lastUserText: session.lastUserText,
                lastMessageAt: session.lastMessageAt || session.createdAt,
              });
            }
          } catch (err) {
            console.warn('Chatbot persist error:', err);
          }
        }
      } else {
        const toStore = newSessions.map((s) => ({
          ...s,
          messages: (s.messages || []).map((m) => ({
            ...m,
            timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : m.timestamp,
          })),
        }));
        localStorage.setItem(STORAGE_KEY_GUEST, JSON.stringify(toStore));
      }
    },
    [currentUser, currentSessionId]
  );

  const loadSessions = useCallback(async () => {
    setIsLoadingSessions(true);
    try {
      if (currentUser?.uid) {
        const loaded = await getChatbotSessions(currentUser.uid);
        if (loaded.length > 0) {
          setSessions(loaded);
          setCurrentSessionId(loaded[0].id);
          setMessages(loaded[0].messages || []);
        } else {
          const welcome = createWelcomeMessages();
          const now = new Date().toISOString();
          const sessionData = {
            title: 'Chat nou',
            messages: welcome,
            lastUserText: '',
            createdAt: now,
            lastMessageAt: now,
          };
          const newId = await addChatbotSession(currentUser.uid, sessionData);
          const newSession = {
            id: newId,
            ...sessionData,
            messages: welcome,
            lastMessageAt: now,
          };
          setSessions([newSession]);
          setCurrentSessionId(newId);
          setMessages(welcome);
        }
      } else {
        const raw = localStorage.getItem(STORAGE_KEY_GUEST);
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const normalized = parsed.map((s) => ({
                ...s,
                messages: (s.messages || []).map((m) => ({
                  ...m,
                  timestamp: m.timestamp ? new Date(m.timestamp) : new Date(),
                })),
              }));
              setSessions(normalized);
              setCurrentSessionId(normalized[0].id);
              setMessages(normalized[0].messages || []);
            } else throw new Error('empty');
          } catch (_) {
            const welcome = createWelcomeMessages();
            const sessionId = `session-${Date.now()}`;
            const first = {
              id: sessionId,
              title: 'Chat nou',
              createdAt: new Date().toISOString(),
              messages: welcome,
              lastUserText: '',
            };
            setSessions([first]);
            setCurrentSessionId(sessionId);
            setMessages(welcome);
          }
        } else {
          const welcome = createWelcomeMessages();
          const sessionId = `session-${Date.now()}`;
          const first = {
            id: sessionId,
            title: 'Chat nou',
            createdAt: new Date().toISOString(),
            messages: welcome,
            lastUserText: '',
          };
          setSessions([first]);
          setCurrentSessionId(sessionId);
          setMessages(welcome);
        }
      }
    } catch (err) {
      console.warn('Chatbot load error:', err);
      const welcome = createWelcomeMessages();
      const sessionId = `session-${Date.now()}`;
      setSessions([
        {
          id: sessionId,
          title: 'Chat nou',
          createdAt: new Date().toISOString(),
          messages: welcome,
          lastUserText: '',
        },
      ]);
      setCurrentSessionId(sessionId);
      setMessages(welcome);
    } finally {
      setIsLoadingSessions(false);
    }
  }, [currentUser?.uid]);

  useEffect(() => {
    if (isOpen) loadSessions();
  }, [isOpen, loadSessions]);

  useEffect(() => {
    if (!sessions.length || !currentSessionId) return;
    const lastMsg = messages[messages.length - 1];
    const lastMessageAt =
      lastMsg?.timestamp instanceof Date
        ? lastMsg.timestamp.toISOString()
        : lastMsg?.timestamp || new Date().toISOString();
    setSessions((prev) =>
      prev.map((s) =>
        s.id === currentSessionId ? { ...s, messages, lastMessageAt } : s
      )
    );
  }, [messages, currentSessionId]);

  useEffect(() => {
    if (!sessions.length) return;
    persistSessions(sessions);
  }, [sessions]);

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  const handleSendMessage = async () => {
    const trimmed = (inputMessage || '').trim();
    if (!trimmed) return;

    const now = new Date().toISOString();
    const userMessage = {
      id: Date.now(),
      text: trimmed,
      sender: 'user',
      timestamp: new Date(),
    };
    let sessionIdToUpdate = currentSessionId;

    if (!currentSessionId) {
      const welcome = createWelcomeMessages();
      let newId;
      if (currentUser?.uid) {
        const messagesWithUser = [...welcome, userMessage];
        newId = await addChatbotSession(currentUser.uid, {
          title: trimmed.slice(0, 40) + (trimmed.length > 40 ? '...' : ''),
          messages: messagesWithUser,
          lastUserText: trimmed,
          createdAt: now,
          lastMessageAt: now,
        });
        console.log('[Chatbot] Chat nou creat în Firebase:', newId, messagesWithUser);
      } else {
        newId = `session-${Date.now()}`;
      }
      sessionIdToUpdate = newId;
      const newSession = {
        id: newId,
        title: trimmed.slice(0, 40) + (trimmed.length > 40 ? '...' : ''),
        createdAt: now,
        lastMessageAt: now,
        messages: [...welcome, userMessage],
        lastUserText: trimmed,
      };
      setSessions((prev) => [newSession, ...prev]);
      setCurrentSessionId(newId);
      setMessages([...welcome, userMessage]);
    } else {
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionIdToUpdate
            ? { ...s, lastUserText: trimmed, lastMessageAt: now, messages: updatedMessages }
            : s
        )
      );
      if (currentUser?.uid && !sessionIdToUpdate.startsWith('session-')) {
        updateChatbotSession(currentUser.uid, sessionIdToUpdate, {
          messages: updatedMessages.slice(-MAX_MESSAGES_PER_SESSION),
          lastUserText: trimmed,
          lastMessageAt: now,
        }).catch((err) => console.warn('Chatbot persist user msg:', err));
        console.log('[Chatbot] Mesaj user salvat:', sessionIdToUpdate);
      }
    }

    setInputMessage('');
    setIsTyping(true);

    try {
      const reply = await fetchGroqResponse(trimmed);
      const messageId = Date.now() + 1;
      const assistantMessage = {
        id: messageId,
        text: '',
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      typeMessage(reply, messageId, (fullText, completedMessageId) => {
        const current = messagesRef.current;
        const allMessages = current.map((m) =>
          m.id === completedMessageId ? { ...m, text: fullText } : m
        );
        setSessions((prev) =>
          prev.map((s) =>
            s.id === sessionIdToUpdate
              ? { ...s, messages: allMessages, lastMessageAt: new Date().toISOString() }
              : s
          )
        );
        if (currentUser?.uid && !sessionIdToUpdate.startsWith('session-')) {
          updateChatbotSession(currentUser.uid, sessionIdToUpdate, {
            messages: allMessages.slice(-MAX_MESSAGES_PER_SESSION),
            lastMessageAt: new Date().toISOString(),
          }).catch((err) => console.warn('Chatbot persist AI response:', err));
          console.log('[Chatbot] Răspuns AI salvat:', sessionIdToUpdate);
        }
      });
    } catch (err) {
      console.error('Chatbot error:', err);
      const fallback = generateFallbackResponse(groqAvailable);
      const messageId = Date.now() + 1;
      const fallbackMessage = {
        id: messageId,
        text: fallback,
        sender: 'assistant',
        timestamp: new Date(),
      };
      const allMessages = [...messages, userMessage, fallbackMessage];
      setMessages(allMessages);
      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionIdToUpdate
            ? { ...s, messages: allMessages, lastMessageAt: new Date().toISOString() }
            : s
        )
      );
      if (currentUser?.uid && !sessionIdToUpdate.startsWith('session-')) {
        updateChatbotSession(currentUser.uid, sessionIdToUpdate, {
          messages: allMessages.slice(-MAX_MESSAGES_PER_SESSION),
          lastMessageAt: new Date().toISOString(),
        }).catch((e) => console.warn('Chatbot persist fallback:', e));
      }
      setIsTyping(false);
    }
  };

  const startNewChat = async () => {
    const welcome = createWelcomeMessages();
    if (currentUser?.uid) {
      const now = new Date().toISOString();
      const newId = await addChatbotSession(currentUser.uid, {
        title: 'Chat nou',
        messages: welcome,
        lastUserText: '',
        createdAt: now,
        lastMessageAt: now,
      });
      const newSession = {
        id: newId,
        title: 'Chat nou',
        createdAt: now,
        lastMessageAt: now,
        messages: welcome,
        lastUserText: '',
      };
      setSessions((prev) => [newSession, ...prev]);
      setCurrentSessionId(newId);
      setMessages(welcome);
    } else {
      const newId = `session-${Date.now()}`;
      const newSession = {
        id: newId,
        title: 'Chat nou',
        createdAt: new Date().toISOString(),
        messages: welcome,
        lastUserText: '',
      };
      setSessions((prev) => [newSession, ...prev]);
      setCurrentSessionId(newId);
      setMessages(welcome);
    }
    setIsTyping(false);
    setInputMessage('');
  };

  const selectSession = (id) => {
    const session = sessions.find((s) => s.id === id);
    if (!session) return;
    setCurrentSessionId(id);
    setMessages(session.messages || []);
    setIsTyping(false);
    setInputMessage('');
  };

  const deleteSession = async (id) => {
    if (sessions.length <= 1) {
      alert('Păstrează cel puțin un chat.');
      return;
    }
    if (currentUser?.uid) {
      try {
        await deleteChatbotSession(currentUser.uid, id);
      } catch (err) {
        console.warn('Delete error:', err);
      }
    }
    const filtered = sessions.filter((s) => s.id !== id);
    setSessions(filtered);
    if (id === currentSessionId && filtered[0]) {
      setCurrentSessionId(filtered[0].id);
      setMessages(filtered[0].messages || []);
    }
  };

  const formatTimestamp = (dateValue) => {
    const d = dateValue instanceof Date ? dateValue : new Date(dateValue);
    return d.toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const userInitial = currentUser?.displayName?.charAt(0)?.toUpperCase() || 'U';

  return (
    <>
      {/* Floating button */}
      <button
        className={`chatbot-fab ${themeClass}`}
        onClick={() => setIsOpen(true)}
        aria-label="Deschide Caietul de BAC"
        type="button"
      >
        <BookOpen size={26} strokeWidth={2.5} />
      </button>

      {/* Panel overlay */}
      {isOpen && (
        <div className="chatbot-overlay" onClick={() => setIsOpen(false)}>
          <div
            className={`chatbot-panel ${themeClass}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left sidebar */}
            <div className="chatbot-sidebar">
              <div className="chatbot-sidebar-header">
                <div className="chatbot-avatar chatbot-avatar-assistant">
                  <BookOpen size={22} strokeWidth={2} />
                </div>
                <span className="chatbot-sidebar-title">{ASSISTANT_NAME}</span>
              </div>
              <button className="chatbot-btn-new" onClick={startNewChat} type="button">
                <Plus size={18} strokeWidth={2.5} />
                Pagină nouă
              </button>
              <p className="chatbot-cuprins-label">Cuprins</p>
              <div className="chatbot-sessions-list">
                {isLoadingSessions ? (
                  <div className="chatbot-loading">Se încarcă...</div>
                ) : (
                  sessions.map((s) => (
                    <div
                      key={s.id}
                      className={`chatbot-session-item ${s.id === currentSessionId ? 'active' : ''}`}
                    >
                      <button
                        className="chatbot-session-btn"
                        onClick={() => selectSession(s.id)}
                        type="button"
                      >
                        {(s.title || 'Chat').slice(0, 35)}
                        {(s.title || '').length > 35 ? '...' : ''}
                      </button>
                      <button
                        className="chatbot-session-delete"
                        onClick={() => deleteSession(s.id)}
                        disabled={sessions.length <= 1}
                        title="Șterge chat"
                        type="button"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right main area */}
            <div className="chatbot-main">
              <div className="chatbot-main-header">
                <span className="chatbot-main-title">Caietul meu</span>
                <div className="chatbot-header-actions">
                  <button className="chatbot-icon-btn" title="Maximizează" type="button">
                    <Maximize2 size={18} />
                  </button>
                  <button
                    className="chatbot-icon-btn chatbot-close"
                    onClick={() => setIsOpen(false)}
                    title="Închide"
                    type="button"
                  >
                    <X size={22} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              <div className="chatbot-messages">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`chatbot-message ${msg.sender === 'user' ? 'user' : 'assistant'}`}
                  >
                    {msg.sender === 'assistant' && (
                      <div className="chatbot-avatar chatbot-avatar-assistant chatbot-avatar-small">
                        <BookOpen size={18} strokeWidth={2} />
                      </div>
                    )}
                    <div className="chatbot-message-content">
                      <div className="chatbot-message-text">{msg.text}</div>
                      <div className="chatbot-message-meta">
                        <span className="chatbot-message-time">{formatTimestamp(msg.timestamp)}</span>
                      </div>
                    </div>
                    {msg.sender === 'user' && (
                      <div className="chatbot-avatar chatbot-avatar-user">{userInitial}</div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="chatbot-input-container">
                <div className="chatbot-input-wrapper">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Scrie aici..."
                    className="chatbot-input"
                    disabled={isTyping}
                  />
                  <button
                    className="chatbot-send-btn"
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    title="Trimite"
                    type="button"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

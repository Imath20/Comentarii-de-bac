import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { Plus, Trash2, X, Send, Maximize2, Minimize2, Edit3, RefreshCcw, Paperclip } from 'lucide-react';
import { useAuth } from '../firebase/AuthContext';
import { getProfileImageUrl } from '../utils/cloudinary';
import {
  getChatbotSessions,
  addChatbotSession,
  updateChatbotSession,
  deleteChatbotSession,
} from '../firebase/chatbotService';
import '../styles/chatbot.scss';

const STORAGE_KEY_GUEST = 'chatbot-sessions-guest';
const ASSISTANT_NAME = 'Profesor Whoo';
const ASSISTANT_AVATAR_LIGHT = '/asistent/Mr_Wooh_Smart_Small.png';
const ASSISTANT_AVATAR_DARK = '/asistent/Mr_Whoo_Dark.png';
const MAX_MESSAGES_PER_SESSION = 60;

const DARK_THEME_MESSAGE = 'Biblioteca a intrat în modul nocturn. Magistrul Whoo este acum de serviciu. 🌙';
const LIGHT_THEME_MESSAGE = 'Biblioteca s-a luminat. Profesor Whoo a revenit la catedră. ☀️';
const THEME_ANNOUNCEMENT_DURATION_MS = 10000;

const createWelcomeMessages = () => [
  {
    id: Date.now(),
    text: `Bună! Sunt ${ASSISTANT_NAME}. Te pot ajuta cu întrebări despre opere, scriitori, curente literare, comentarii și subiecte pentru bacalaureat. Cu ce te pot ajuta?`,
    sender: 'assistant',
    timestamp: new Date(),
  },
];

const systemPrompt = `Ești un asistent educațional pentru pregătirea la bacalaureat la limba și literatura română. Răspunde la întrebări despre opere, scriitori, curente literare, comentarii și subiecte. Fii concis, precis și util pentru elevi. Răspunde întotdeauna în limba română. Nu folosi markdown (**, ##, liste cu -, etc.). Răspunde doar cu text simplu și spații.`;

export default function Chatbot() {
  const { currentUser, userProfile } = useAuth();
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
  const profilePopupRef = useRef(null);
  const imageInputRef = useRef(null);
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

  const [isMaximized, setIsMaximized] = useState(false);
  const [showAssistantProfilePopup, setShowAssistantProfilePopup] = useState(false);
  const [themeAnnouncement, setThemeAnnouncement] = useState(null);
  const themeAnnouncementTimeoutRef = useRef(null);
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editingSessionTitle, setEditingSessionTitle] = useState('');
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [attachedImage, setAttachedImage] = useState(null);
  const [themeClass, setThemeClass] = useState(() =>
    document.body.classList.contains('dark-theme') || localStorage.getItem('theme') === 'dark'
      ? 'dark-theme'
      : ''
  );

  const assistantAvatarUrl = themeClass === 'dark-theme' ? ASSISTANT_AVATAR_DARK : ASSISTANT_AVATAR_LIGHT;
  const assistantDisplayName = themeClass === 'dark-theme' ? 'Magistrul Whoo' : ASSISTANT_NAME;

  const currentSession = useMemo(
    () => sessions.find((s) => s.id === currentSessionId),
    [sessions, currentSessionId]
  );
  const lastUserMessageId = useMemo(() => {
    const last = [...messages].reverse().find((m) => m.sender === 'user');
    return last?.id ?? null;
  }, [messages]);

  useEffect(() => {
    const checkTheme = () => {
      setThemeClass(document.body.classList.contains('dark-theme') ? 'dark-theme' : '');
    };
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    checkTheme();
    return () => observer.disconnect();
  }, []);

  // Focus popup la deschidere + Escape închide
  useEffect(() => {
    if (!showAssistantProfilePopup) return;
    const id = requestAnimationFrame(() => profilePopupRef.current?.focus());
    const onKey = (e) => {
      if (e.key === 'Escape') setShowAssistantProfilePopup(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('keydown', onKey);
    };
  }, [showAssistantProfilePopup]);

  // Un singur mesaj temporar la schimbare temă: doar textul, fără adăugare în chat. Timer 10s (reset la nouă schimbare).
  useEffect(() => {
    const clearTimer = () => {
      if (themeAnnouncementTimeoutRef.current) {
        clearTimeout(themeAnnouncementTimeoutRef.current);
        themeAnnouncementTimeoutRef.current = null;
      }
    };
    const onDark = () => {
      clearTimer();
      setThemeAnnouncement(DARK_THEME_MESSAGE);
    };
    const onLight = () => {
      clearTimer();
      setThemeAnnouncement(LIGHT_THEME_MESSAGE);
    };
    window.addEventListener('theme-changed-to-dark', onDark);
    window.addEventListener('theme-changed-to-light', onLight);
    return () => {
      clearTimer();
      window.removeEventListener('theme-changed-to-dark', onDark);
      window.removeEventListener('theme-changed-to-light', onLight);
    };
  }, []);

  // Când panoul e deschis și există un anunț de temă: pornim/repornim timerul de 10s; la expirare ascundem mesajul.
  useEffect(() => {
    if (!isOpen || !themeAnnouncement) return;
    if (themeAnnouncementTimeoutRef.current) clearTimeout(themeAnnouncementTimeoutRef.current);
    themeAnnouncementTimeoutRef.current = setTimeout(() => {
      setThemeAnnouncement(null);
      themeAnnouncementTimeoutRef.current = null;
    }, THEME_ANNOUNCEMENT_DURATION_MS);
    return () => {
      if (themeAnnouncementTimeoutRef.current) {
        clearTimeout(themeAnnouncementTimeoutRef.current);
        themeAnnouncementTimeoutRef.current = null;
      }
    };
  }, [isOpen, themeAnnouncement]);

  // Blochează scroll-ul paginii când asistentul e deschis (inclusiv scroll lateral)
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      const prevTouchAction = document.body.style.touchAction;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.style.touchAction = prevTouchAction;
      };
    }
  }, [isOpen]);

  const toggleMaximized = useCallback(() => setIsMaximized((prev) => !prev), []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const startRenameSession = (id) => {
    const session = sessions.find((s) => s.id === id);
    if (session) {
      setEditingSessionId(id);
      setEditingSessionTitle(session.title || 'Chat nou');
    }
  };

  const commitRenameSession = useCallback(() => {
    const trimmed = (editingSessionTitle || '').trim();
    if (!editingSessionId) return;
    setSessions((prev) =>
      prev.map((s) =>
        s.id === editingSessionId ? { ...s, title: trimmed || s.title || 'Chat nou' } : s
      )
    );
    if (currentUser?.uid && !editingSessionId.startsWith('session-')) {
      updateChatbotSession(currentUser.uid, editingSessionId, {
        title: trimmed || 'Chat nou',
      }).catch((err) => console.warn('Chatbot rename persist:', err));
    }
    setEditingSessionId(null);
    setEditingSessionTitle('');
  }, [editingSessionId, editingSessionTitle, currentUser?.uid]);

  const cancelRenameSession = () => {
    setEditingSessionId(null);
    setEditingSessionTitle('');
  };

  const editLastUserMessage = () => {
    const lastUser = [...messages].reverse().find((m) => m.sender === 'user');
    if (!lastUser) return;
    setEditingMessageId(lastUser.id);
    setInputMessage(lastUser.text || '');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const redoLastResponse = useCallback(async () => {
    const lastUser = [...messages].reverse().find((m) => m.sender === 'user');
    if (!lastUser?.text) return;
    const lastUserIdx = messages.findIndex((m) => m.id === lastUser.id);
    const followingAssistant = messages.slice(lastUserIdx + 1).find((m) => m.sender === 'assistant');
    let targetId = followingAssistant?.id;
    if (targetId) {
      setMessages((prev) =>
        prev.map((m) => (m.id === targetId ? { ...m, text: '' } : m))
      );
    } else {
      targetId = Date.now() + 1;
      setMessages((prev) => [
        ...prev,
        {
          id: targetId,
          text: '',
          sender: 'assistant',
          timestamp: new Date(),
        },
      ]);
    }
    setIsTyping(true);
    try {
      const reply = await fetchGroqResponse(lastUser.text, lastUser.imageDataUrl, true);
      typeMessage(reply, targetId, (fullText, completedMessageId) => {
        const current = messagesRef.current;
        const allMessages = current.map((m) =>
          m.id === completedMessageId ? { ...m, text: fullText } : m
        );
        setSessions((prev) =>
          prev.map((s) =>
            s.id === currentSessionId
              ? { ...s, messages: allMessages, lastMessageAt: new Date().toISOString() }
              : s
          )
        );
        if (currentUser?.uid && !currentSessionId?.startsWith('session-')) {
          updateChatbotSession(currentUser.uid, currentSessionId, {
            messages: allMessages.slice(-MAX_MESSAGES_PER_SESSION),
            lastMessageAt: new Date().toISOString(),
          }).catch((err) => console.warn('Chatbot persist redo:', err));
        }
      });
    } catch (err) {
      console.error('Chatbot redo error:', err);
      const fallback = generateFallbackResponse(groqAvailable);
      typeMessage(fallback, targetId);
      setIsTyping(false);
    }
  }, [messages, currentSessionId, currentUser?.uid]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const generateFallbackResponse = (apiConfigured = false) => {
    if (!apiConfigured) {
      return 'Setează VITE_GROQ_API_KEY în .env și repornește serverul de development (npm run dev) pentru a folosi asistentul AI.';
    }
    return 'A apărut o eroare la API. Verifică cheia Groq sau încearcă din nou mai târziu.';
  };

  const VISION_MODEL = 'llama-3.2-90b-vision-preview';
  const TEXT_MODEL = 'openai/gpt-oss-120b';

  const buildGroqMessages = (userText, imageDataUrl = null, isRedo = false) => {
    let source = messages;
    if (isRedo && messages.length > 0 && messages[messages.length - 1].sender === 'assistant') {
      source = messages.slice(0, -1);
    }
    const history = source.slice(-8).map((m) => {
      const text = m.sender === 'user' && (m.imageDataUrl || m.hadImage)
        ? `[Imagine atașată.] ${m.text || 'Ce vezi în imagine?'}`
        : m.text;
      return { role: m.sender === 'user' ? 'user' : 'assistant', content: text };
    });
    if (isRedo) {
      return [
        { role: 'system', content: systemPrompt + (imageDataUrl ? ' Utilizatorul poate atașa imagini; analizează conținutul și răspunde în limba română.' : '') },
        ...history,
      ];
    }
    const userPrompt = userText || 'Analizează imaginea atașată.';
    const lastUserContent = imageDataUrl
      ? `[Utilizatorul a atașat o imagine.] ${userPrompt}`
      : userPrompt;
    return [
      { role: 'system', content: systemPrompt + (imageDataUrl ? ' Utilizatorul poate atașa imagini; răspunde la întrebarea lui în limba română (dacă nu poți analiza imaginea, răspunde pe baza textului).' : '') },
      ...history,
      { role: 'user', content: lastUserContent },
    ];
  };

  const fetchGroqResponse = async (userText, imageDataUrl = null, isRedo = false) => {
    if (!groqAvailable || !groqApiUrl) return generateFallbackResponse(false);

    // Model text mereu (vision e adesea indisponibil); când e imagine, trimitem doar text cu indiciu "[Utilizatorul a atașat o imagine.]"
    const model = TEXT_MODEL;
    const body = {
      model,
      messages: buildGroqMessages(userText, imageDataUrl, isRedo),
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
        let content = data?.choices?.[0]?.message?.content;
        if (typeof content === 'string') content = content.trim();
        else if (Array.isArray(content)) {
          const textPart = content.find((p) => p?.type === 'text');
          content = textPart?.text ? String(textPart.text).trim() : '';
        } else content = '';
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
              // Păstrează doar sesiunile cu conținut real; elimină duplicatele "Chat nou" goale
              const withContent = normalized.filter((s) => (s.lastUserText || '').trim().length > 0);
              const toUse =
                withContent.length > 0
                  ? withContent
                  : [normalized[0]]; // un singur chat gol dacă toate sunt goale
              setSessions(toUse);
              setCurrentSessionId(toUse[0].id);
              setMessages(toUse[0].messages || []);
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
    const hasImage = Boolean(attachedImage);
    if (!trimmed && !hasImage) return;

    const now = new Date().toISOString();
    const userTextForTitle = trimmed || 'Poza atașată';
    const userMessage = {
      id: Date.now(),
      text: trimmed || (hasImage ? 'Analizează această imagine.' : ''),
      sender: 'user',
      timestamp: new Date(),
      ...(hasImage && { imageDataUrl: attachedImage }),
    };
    let sessionIdToUpdate = currentSessionId;
    let targetAssistantId = null;
    const isEditing = Boolean(editingMessageId);

    if (isEditing) {
      const userIdx = messages.findIndex((m) => m.id === editingMessageId);
      const followingAssistant = userIdx !== -1 ? messages.slice(userIdx + 1).find((m) => m.sender === 'assistant') : null;
      targetAssistantId = followingAssistant?.id ?? Date.now() + 1;
      setMessages((prev) => {
        const next = [...prev];
        const idx = next.findIndex((m) => m.id === editingMessageId);
        if (idx === -1) return prev;
        next[idx] = { ...next[idx], text: userMessage.text, ...(hasImage && { imageDataUrl: attachedImage }) };
        const aIdx = next.slice(idx + 1).findIndex((m) => m.sender === 'assistant');
        if (aIdx !== -1) {
          next[idx + 1 + aIdx] = { ...next[idx + 1 + aIdx], text: '' };
        } else {
          next.splice(idx + 1, 0, {
            id: targetAssistantId,
            text: '',
            sender: 'assistant',
            timestamp: new Date(),
          });
        }
        return next;
      });
      setEditingMessageId(null);
    } else if (!currentSessionId) {
      const welcome = createWelcomeMessages();
      let newId;
      if (currentUser?.uid) {
        const messagesWithUser = [...welcome, userMessage];
        newId = await addChatbotSession(currentUser.uid, {
          title: userTextForTitle.slice(0, 40) + (userTextForTitle.length > 40 ? '...' : ''),
          messages: messagesWithUser,
          lastUserText: userTextForTitle,
          createdAt: now,
          lastMessageAt: now,
        });
      } else {
        newId = `session-${Date.now()}`;
      }
      sessionIdToUpdate = newId;
      setSessions((prev) => [
        {
          id: newId,
          title: userTextForTitle.slice(0, 40) + (userTextForTitle.length > 40 ? '...' : ''),
          createdAt: now,
          lastMessageAt: now,
          messages: [...welcome, userMessage],
          lastUserText: userTextForTitle,
        },
        ...prev,
      ]);
      setCurrentSessionId(newId);
      setMessages([...welcome, userMessage]);
    } else {
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionIdToUpdate
            ? { ...s, lastUserText: userTextForTitle, lastMessageAt: now, messages: updatedMessages }
            : s
        )
      );
      if (currentUser?.uid && !sessionIdToUpdate.startsWith('session-')) {
        updateChatbotSession(currentUser.uid, sessionIdToUpdate, {
          messages: updatedMessages.slice(-MAX_MESSAGES_PER_SESSION),
          lastUserText: userTextForTitle,
          lastMessageAt: now,
        }).catch((err) => console.warn('Chatbot persist user msg:', err));
      }
    }

    setInputMessage('');
    setAttachedImage(null);
    if (imageInputRef.current) imageInputRef.current.value = '';
    setIsTyping(true);

    const imageToSend = hasImage ? attachedImage : null;
    if (isEditing && !targetAssistantId) targetAssistantId = Date.now() + 1;

    try {
      let reply = await fetchGroqResponse(userMessage.text, imageToSend);
      if (!reply || typeof reply !== 'string') reply = generateFallbackResponse(groqAvailable);
      const messageId = isEditing ? targetAssistantId : Date.now() + 1;
      if (!isEditing) {
        setMessages((prev) => [
          ...prev,
          { id: messageId, text: '', sender: 'assistant', timestamp: new Date() },
        ]);
      }
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
        }
      });
    } catch (err) {
      console.error('Chatbot error:', err);
      const fallback = generateFallbackResponse(groqAvailable);
      const messageId = isEditing ? targetAssistantId : Date.now() + 1;
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
      {/* Floating button - Profesor Whoo / Mr Whoo Evil în dark mode */}
      <button
        className={`chatbot-fab ${themeClass}`}
        onClick={() => setIsOpen(true)}
        aria-label="Deschide asistentul BAC"
        type="button"
      >
        <img
          src={assistantAvatarUrl}
          alt={assistantDisplayName}
          className="chatbot-fab-avatar"
        />
      </button>

      {/* Panel overlay */}
      {isOpen && (
        <div
          className="chatbot-overlay"
          onClick={() => {
            setIsMaximized(false);
            setIsOpen(false);
          }}
        >
          <div
            className={`chatbot-panel chatbot-book ${themeClass} ${isMaximized ? 'chatbot-maximized' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pagina stânga - Cuprins */}
            <div className="chatbot-page-left">
              {/* <span className="chatbot-page-number">i</span> */}
            <div className="chatbot-sidebar">
              <div className="chatbot-sidebar-header">
                <button
                  type="button"
                  className="chatbot-avatar chatbot-avatar-assistant chatbot-avatar-clickable"
                  onClick={() => setShowAssistantProfilePopup(true)}
                  aria-label={`Profil ${assistantDisplayName}`}
                  title="Deschide poza"
                >
                  <img src={assistantAvatarUrl} alt={assistantDisplayName} />
                </button>
                <span className="chatbot-sidebar-title">{assistantDisplayName}</span>
              </div>
              <button className="chatbot-btn-new" onClick={startNewChat} type="button">
                <Plus size={18} />
                Chat nou
              </button>
              <div className="chatbot-sessions-list">
                {isLoadingSessions ? (
                  <div className="chatbot-loading">Se încarcă...</div>
                ) : (
                  sessions.map((s) => (
                    <div
                      key={s.id}
                      className={`chatbot-session-item ${s.id === currentSessionId ? 'active' : ''}`}
                    >
                      {editingSessionId === s.id ? (
                        <input
                          type="text"
                          className="chatbot-session-rename-input"
                          value={editingSessionTitle}
                          onChange={(e) => setEditingSessionTitle(e.target.value)}
                          onBlur={commitRenameSession}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') commitRenameSession();
                            if (e.key === 'Escape') cancelRenameSession();
                          }}
                          autoFocus
                          aria-label="Redenumește chat"
                        />
                      ) : (
                        <>
                          <button
                            className="chatbot-session-btn"
                            onClick={() => selectSession(s.id)}
                            type="button"
                          >
                            {(s.title || 'Chat').slice(0, 35)}
                            {(s.title || '').length > 35 ? '...' : ''}
                          </button>
                          <div className="chatbot-session-actions">
                            <button
                              type="button"
                              className="chatbot-session-rename-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                startRenameSession(s.id);
                              }}
                              title="Redenumește"
                              aria-label="Redenumește chat"
                            >
                              <Edit3 size={14} />
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
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
            </div>

            {/* Cotor */}
            <div className="chatbot-book-spine" />

            {/* Pagina dreapta - Conversație */}
            <div className="chatbot-page-right">
              {/* <span className="chatbot-page-number">ii</span> */}
            <div className="chatbot-main">
              <div className="chatbot-main-header">
                <button
                  className="chatbot-icon-btn"
                  title={isMaximized ? 'Minimizează' : 'Maximizează'}
                  onClick={toggleMaximized}
                  type="button"
                >
                  {isMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <button
                  className="chatbot-icon-btn chatbot-close"
                  onClick={() => {
                    setIsMaximized(false);
                    setIsOpen(false);
                  }}
                  title="Închide"
                  type="button"
                >
                  <X size={22} strokeWidth={2.5} />
                </button>
              </div>

              {themeAnnouncement && (
                <div className={`chatbot-theme-announcement ${themeClass}`} role="status" aria-live="polite">
                  {themeAnnouncement}
                </div>
              )}

              <div className="chatbot-messages">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`chatbot-message ${msg.sender === 'user' ? 'user' : 'assistant'}`}
                  >
                    {msg.sender === 'assistant' && (
                      <button
                        type="button"
                        className="chatbot-avatar chatbot-avatar-assistant chatbot-avatar-small chatbot-avatar-clickable"
                        onClick={() => setShowAssistantProfilePopup(true)}
                        aria-label={`Profil ${assistantDisplayName}`}
                        title="Deschide poza"
                      >
                        <img src={assistantAvatarUrl} alt={assistantDisplayName} />
                      </button>
                    )}
                    <div className="chatbot-message-content">
                      {msg.sender === 'user' && (msg.imageDataUrl || msg.hadImage) && (
                        <div className="chatbot-message-image-wrap">
                          {msg.imageDataUrl ? (
                            <img src={msg.imageDataUrl} alt="Atașat" className="chatbot-message-image" />
                          ) : (
                            <span className="chatbot-message-image-placeholder">Imagine atașată (nu se reîncarcă)</span>
                          )}
                        </div>
                      )}
                      <div className="chatbot-message-text">{msg.text}</div>
                      <div className="chatbot-message-meta">
                        <span className="chatbot-message-time">{formatTimestamp(msg.timestamp)}</span>
                        {msg.sender === 'user' && msg.id === lastUserMessageId && (
                          <div className="chatbot-message-actions">
                            <button
                              type="button"
                              className="chatbot-message-action-btn"
                              onClick={redoLastResponse}
                              disabled={isTyping}
                              title="Refă răspunsul"
                              aria-label="Refă răspunsul"
                            >
                              <RefreshCcw size={14} />
                            </button>
                            <button
                              type="button"
                              className="chatbot-message-action-btn"
                              onClick={editLastUserMessage}
                              disabled={isTyping}
                              title="Editează mesaj"
                              aria-label="Editează mesaj"
                            >
                              <Edit3 size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    {msg.sender === 'user' && (
                      <div className="chatbot-avatar chatbot-avatar-user">
                        {(userProfile?.photoURL || currentUser?.photoURL) ? (
                          <img
                            src={getProfileImageUrl(userProfile?.photoURL || currentUser?.photoURL, {
                              size: 64,
                            })}
                            alt={userProfile?.displayName || currentUser?.displayName || 'User'}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.parentElement?.querySelector(
                                '.chatbot-avatar-user-fallback'
                              );
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <span
                          className="chatbot-avatar-user-fallback"
                          style={{
                            display:
                              userProfile?.photoURL || currentUser?.photoURL ? 'none' : 'flex',
                          }}
                        >
                          {userInitial}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="chatbot-input-container">
                {attachedImage && (
                  <div className="chatbot-attached-image-preview">
                    <img src={attachedImage} alt="Atașat" />
                    <button
                      type="button"
                      className="chatbot-attached-image-remove"
                      onClick={() => {
                        setAttachedImage(null);
                        if (imageInputRef.current) imageInputRef.current.value = '';
                      }}
                      aria-label="Elimină imaginea"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                <div className="chatbot-input-wrapper">
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    className="chatbot-file-input-hidden"
                    aria-hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file || !file.type.startsWith('image/')) return;
                      const reader = new FileReader();
                      reader.onload = () => setAttachedImage(reader.result);
                      reader.readAsDataURL(file);
                    }}
                  />
                  <button
                    type="button"
                    className="chatbot-attach-btn"
                    onClick={() => imageInputRef.current?.click()}
                    title="Atașează imagine"
                    aria-label="Atașează imagine"
                    disabled={isTyping}
                  >
                    <Paperclip size={20} />
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={attachedImage ? 'Scrie ceva despre imagine (opțional)...' : 'Scrie un mesaj...'}
                    className="chatbot-input"
                    disabled={isTyping}
                  />
                  <button
                    className="chatbot-send-btn"
                    onClick={handleSendMessage}
                    disabled={(!inputMessage.trim() && !attachedImage) || isTyping}
                    title="Trimite"
                    type="button"
                  >
                    <Send size={20} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                  </button>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup profil asistent - poza mare la click pe avatar */}
      {showAssistantProfilePopup && (
        <div
          ref={profilePopupRef}
          className={`chatbot-assistant-profile-popup-overlay ${themeClass}`}
          onClick={() => setShowAssistantProfilePopup(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Profil ${assistantDisplayName}`}
          tabIndex={-1}
        >
          <div
            className="chatbot-assistant-profile-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="chatbot-assistant-profile-popup-close"
              onClick={() => setShowAssistantProfilePopup(false)}
              aria-label="Închide"
            >
              ×
            </button>
            <div className="chatbot-assistant-profile-popup-image-wrap">
              <img src={assistantAvatarUrl} alt={assistantDisplayName} />
            </div>
            <p className="chatbot-assistant-profile-popup-name">{assistantDisplayName}</p>
          </div>
        </div>
      )}
    </>
  );
}

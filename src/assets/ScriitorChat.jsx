import React, { useMemo, useState, useRef, useEffect } from 'react';

const ScriitorChat = ({ scriitorKey, onClose, scriitorMeta }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const typingIntervalRef = useRef(null);

  const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
  const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
  const groqAvailable = Boolean(groqApiKey);
  
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Mesaj de bun venit
    setTimeout(() => {
      setMessages([
        {
          id: 1,
          text: `Salut! Sunt ${scriitorName}. Îmi place să vorbesc cu oamenii și să împărtășesc gândurile mele. Cum te pot ajuta astăzi?`,
          sender: 'scriitor',
          timestamp: new Date()
        }
      ]);
    }, 500);

    // Focus pe input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 1000);
  }, [scriitorName]);

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
    const body = {
      model: 'openai/gpt-oss-120b',
      messages: buildGroqMessages(userText),
      temperature: 0.7,
      max_tokens: 320
    };

    const res = await fetch(groqApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqApiKey}`
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
      throw new Error(msg);
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content?.trim();
    if (!content) throw new Error('Răspuns gol de la Groq');
    return content;
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

  const handleSendMessage = async () => {
    const trimmed = inputMessage.trim();
    if (!trimmed) return;

    const userMessage = {
      id: Date.now(),
      text: trimmed,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      let reply;

      if (groqAvailable) {
        reply = await fetchGroqResponse(trimmed);
      } else {
        reply = generateFallbackResponse(trimmed);
      }

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
    } catch (err) {
      console.error('Eroare Groq chat:', err);
      const fallback = generateFallbackResponse(trimmed);
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
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
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
          <button className="scriitor-chat-close" onClick={onClose}>
            ×
          </button>
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
                <div className="scriitor-chat-message-time">
                  {formatTime(message.timestamp)}
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
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriitorChat; 
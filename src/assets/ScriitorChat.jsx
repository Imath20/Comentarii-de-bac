import React, { useState, useRef, useEffect } from 'react';
import scriitoriChatData from '../data/scriitoriChatData';

const ScriitorChat = ({ scriitorKey, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scriitorData = scriitoriChatData[scriitorKey];
  
  if (!scriitorData) {
    return null;
  }

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
          text: `Salut! Sunt ${scriitorData.nume}. Îmi place să vorbesc cu oamenii și să împărtășesc gândurile mele. Cum te pot ajuta astăzi?`,
          sender: 'scriitor',
          timestamp: new Date()
        }
      ]);
    }, 500);

    // Focus pe input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 1000);
  }, []);

  // Funcție simplificată și îmbunătățită pentru a găsi cel mai potrivit răspuns
  const findBestResponse = (userMessage) => {
    const userText = userMessage.toLowerCase().trim();
    const dataset = scriitorData.dataset;
    
    // Caută match exact în dataset
    for (let item of dataset) {
      const promptText = item.prompt.toLowerCase().trim();
      
      // Verifică match exact
      if (userText === promptText) {
        return item.response;
      }
      
      // Verifică dacă întrebarea utilizatorului conține cuvinte cheie din prompt
      const promptWords = promptText.split(' ').filter(word => word.length > 2);
      const userWords = userText.split(' ').filter(word => word.length > 2);
      
      let matchCount = 0;
      for (const promptWord of promptWords) {
        for (const userWord of userWords) {
          if (userWord.includes(promptWord) || promptWord.includes(userWord)) {
            matchCount++;
          }
        }
      }
      
      // Dacă găsește cel puțin 2 cuvinte cheie comune, returnează răspunsul
      if (matchCount >= 2) {
        return item.response;
      }
    }
    
    // Dacă nu găsește match în dataset, folosește răspunsuri contextuale
    return generateContextualResponse(userText);
  };

  const generateContextualResponse = (userText) => {
    const userWords = userText.toLowerCase().split(' ');
    
    // Răspunsuri specifice pentru Eminescu
    if (scriitorKey === 'eminescu') {
      if (userWords.some(word => ['veronica', 'micle'].includes(word))) {
        return "Veronica... Ah, Veronica Micle! Este o persoană care a avut o influență mare asupra vieții mele. Prin scrisorile noastre am împărtășit gânduri și sentimente adânci. Este o femeie de o inteligență rară și de o sensibilitate artistică extraordinară.";
      }
      
      if (userWords.some(word => ['dragoste', 'iubire', 'amor'].includes(word))) {
        return "Dragostea este misterul cel mai mare al existenței! Este ca luceafărul din poezia mea - strălucitor și etern, dar mereu departe. Dragostea este sufletul lumii, este ceea ce ne face să trăim și să visăm. Fără dragoste, viața ar fi o noapte fără stele.";
      }
      
      if (userWords.some(word => ['poezie', 'vers', 'scriu'].includes(word))) {
        return "Poezia este pentru mine o modalitate de a atinge infinitul, de a exprima ceea ce nu poate fi spus cu cuvinte obișnuite. Fiecare vers este ca o bătaie a inimii, fiecare cuvânt este ales cu grijă pentru a transmite exact ceea ce simt.";
      }
      
      if (userWords.some(word => ['natura', 'stele', 'luna'].includes(word))) {
        return "Natura este cea mai mare învățătoare! În stele găsesc răspunsuri la întrebările mele, în luna găsesc melancolia care mă inspiră, în vânt găsesc vocea timpului care trece. Natura este poezia cea mai frumoasă scrisă de Dumnezeu.";
      }
      
      if (userWords.some(word => ['romania', 'patria', 'tara'].includes(word))) {
        return "România este inima mea! Este țara care m-a născut și care m-a format. Fiecare colț al patriei mele are farmecul său - de la munții noștri măreți până la câmpiile verzi, de la apele Dunării până la stepele Dobrogei.";
      }
      
      if (userWords.some(word => ['cine', 'est', 'sunt'].includes(word))) {
        return "Sunt Mihai Eminescu, poetul românilor. Sunt cel care a scris 'Luceafărul', 'Scrisori', 'Somnoroase păsări' și multe alte versuri care au rămas în inima poporului meu. Sunt cel care a încercat să exprime frumusețea și melancolia sufletului românesc.";
      }
    }
    
    // Răspunsuri generice dar mai relevante
    const contextualResponses = [
      "Este o întrebare care merită să fie gândită cu atenție. Fiecare zi aduce noi provocări și noi oportunități de a învăța despre viață și despre noi înșine.",
      "În viața mea am învățat că fiecare întrebare are răspunsul său, dar nu întotdeauna în forma pe care o așteptăm. Este important să fim atenți la lecțiile pe care ni le oferă experiența.",
      "Să știi că viața este plină de surprize și fiecare conversație ne poate învăța ceva nou. Este important să fim deschiși la învățăturile pe care ni le oferă fiecare zi.",
      "În gândurile mele reflectez asupra întrebării tale. Fiecare zi este o nouă lecție de viață, și fiecare întrebare ne aduce mai aproape de înțelegerea misterului existenței."
    ];
    
    return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulează timpul de gândire al scriitorului
    setTimeout(() => {
      const response = findBestResponse(inputMessage);
      
      const scriitorMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'scriitor',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, scriitorMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // 1-3 secunde
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
            <img src={scriitorData.avatar} alt={scriitorData.nume} />
          </div>
          <div className="scriitor-chat-info">
            <h3>{scriitorData.nume}</h3>
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
                  <img src={scriitorData.avatar} alt={scriitorData.nume} />
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
          
          {isTyping && (
            <div className="scriitor-chat-message scriitor">
              <div className="scriitor-chat-avatar-small">
                <img src={scriitorData.avatar} alt={scriitorData.nume} />
              </div>
              <div className="scriitor-chat-message-content">
                <div className="scriitor-chat-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke="currentColor"
                  strokeWidth="2"
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
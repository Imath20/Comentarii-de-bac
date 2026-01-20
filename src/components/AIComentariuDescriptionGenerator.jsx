import React, { useCallback, useState } from 'react';

/**
 * AI helper that reuses the 3D cube UI to generate a comment description
 * based on the title and author.
 */
const AIComentariuDescriptionGenerator = ({
  titlu,
  autor,
  onDescriptionGenerated,
  setMessage,
  darkTheme,
  isGenerating,
}) => {
  const [processing, setProcessing] = useState(false);
  const [cubeSpinning, setCubeSpinning] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (processing || isGenerating) return;
    
    if (!titlu || !titlu.trim() || !autor || !autor.trim()) {
      setMessage?.({ type: 'error', text: 'Completează mai întâi titlul și autorul.' });
      return;
    }

    const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
    const groqApiKeyBackup = import.meta.env.VITE_GROQ_API_KEY_1;
    const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
    const groqApiKeys = [groqApiKey, groqApiKeyBackup].filter(k => k && k !== 'undefined');

    if (groqApiKeys.length === 0) {
      setMessage?.({ type: 'error', text: 'Setează VITE_GROQ_API_KEY în .env.local.' });
      return;
    }

    setProcessing(true);
    setCubeSpinning(true);
    setMessage?.({ type: '', text: '' });

    try {
      const systemMessage = `Ești un expert în literatura română. Scrie o descriere scurtă și profesională pentru un comentariu literar.

Descrierea trebuie să fie:
- Concisă (40-80 de cuvinte)
- Profesională și academică
- Relevante pentru comentariul literar
- Fără emoticoane sau simboluri
- În limba română

Descrierea trebuie să menționeze pe scurt temele principale, stilul sau aspectele esențiale despre operă/autor, într-un mod care să fie util pentru cititori care doresc să înțeleagă rapid conținutul comentariului.`;

      const userMessage = `Titlu comentariu: "${titlu.trim()}"
Autor operă comentată: "${autor.trim()}"

Generează o descriere scurtă și profesională pentru acest comentariu literar, bazându-te pe cunoștințele tale despre opera și autorul menționat.`;

      const requestBody = {
        model: 'moonshotai/kimi-k2-instruct-0905',
        messages: [
          {
            role: 'system',
            content: systemMessage
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      };

      let generatedDescription = null;

      for (const key of groqApiKeys) {
        try {
          const response = await fetch(groqApiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${key}`
            },
            body: JSON.stringify(requestBody)
          });

          if (!response.ok) {
            console.warn('Groq API error:', response.status);
            continue;
          }

          const data = await response.json();
          const content = data?.choices?.[0]?.message?.content?.trim();
          
          if (content) {
            generatedDescription = content;
            break;
          }
        } catch (err) {
          console.warn('Groq API exception:', err);
          continue;
        }
      }

      if (generatedDescription) {
        onDescriptionGenerated?.(generatedDescription);
        setMessage?.({ type: 'success', text: 'Descriere generată cu succes cu AI!' });
      } else {
        throw new Error('Nu s-a putut genera descrierea. Încearcă din nou.');
      }
    } catch (error) {
      console.error('Eroare la generarea descrierii comentariului cu AI:', error);
      const message = error.message || 'Nu am putut genera descrierea. Încearcă din nou.';
      setMessage?.({ type: 'error', text: message });
    } finally {
      setProcessing(false);
      setTimeout(() => setCubeSpinning(false), 800);
    }
  }, [titlu, autor, onDescriptionGenerated, setMessage, processing, isGenerating]);

  return (
    <div
      className={`ai-cube-wrapper ${cubeSpinning ? 'spinning' : ''} ${processing || isGenerating ? 'processing' : ''}`}
      onClick={!(processing || isGenerating) ? handleGenerate : undefined}
      style={{
        cursor: (processing || isGenerating) ? 'not-allowed' : 'pointer',
        opacity: (processing || isGenerating) ? 0.6 : 1,
      }}
      title={(processing || isGenerating) ? 'Se generează...' : 'Generează descrierea cu AI'}
    >
      <div className="ai-cube-3d">
        <div className="ai-cube-inner">
          <div className="ai-cube-side ai-cube-front" style={{
            background: darkTheme
              ? 'linear-gradient(135deg, #a97c50 0%, #8b6b42 100%)'
              : 'linear-gradient(135deg, #ffd591 0%, #ffb366 100%)'
          }}>
            <div className="dice-dots dice-6">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
          <div className="ai-cube-side ai-cube-back" style={{
            background: darkTheme
              ? 'linear-gradient(135deg, #8b6b42 0%, #6d5233 100%)'
              : 'linear-gradient(135deg, #ffb366 0%, #ff9f33 100%)'
          }}>
            <div className="dice-dots dice-1">
              <span className="dot"></span>
            </div>
          </div>
          <div className="ai-cube-side ai-cube-right" style={{
            background: darkTheme
              ? 'linear-gradient(135deg, #8b6b42 0%, #6d5233 100%)'
              : 'linear-gradient(135deg, #ffb366 0%, #ff9f33 100%)'
          }}>
            <div className="dice-dots dice-3">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
          <div className="ai-cube-side ai-cube-left" style={{
            background: darkTheme
              ? 'linear-gradient(135deg, #a97c50 0%, #8b6b42 100%)'
              : 'linear-gradient(135deg, #ffd591 0%, #ffb366 100%)'
          }}>
            <div className="dice-dots dice-4">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
          <div className="ai-cube-side ai-cube-top" style={{
            background: darkTheme
              ? 'linear-gradient(135deg, #a97c50 0%, #8b6b42 100%)'
              : 'linear-gradient(135deg, #ffd591 0%, #ffb366 100%)'
          }}>
            <div className="dice-dots dice-5">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
          <div className="ai-cube-side ai-cube-bottom" style={{
            background: darkTheme
              ? 'linear-gradient(135deg, #8b6b42 0%, #6d5233 100%)'
              : 'linear-gradient(135deg, #ffb366 0%, #ff9f33 100%)'
          }}>
            <div className="dice-dots dice-2">
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIComentariuDescriptionGenerator;


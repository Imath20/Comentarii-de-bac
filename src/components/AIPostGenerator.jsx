import React, { useCallback, useState } from 'react';

/**
 * AI helper that reuses the 3D cube UI to generate a post text
 * based on a short brief and the selected scriitor profile.
 */
const AIPostGenerator = ({
  prompt,
  poemText = null,
  text = null,
  descriere = null,
  onTextGenerated,
  scriitor,
  setMessage,
  darkTheme,
  skipBrief = false,
}) => {
  const [processing, setProcessing] = useState(false);
  const [cubeSpinning, setCubeSpinning] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (processing) return;
    const brief = prompt?.trim();
    if (!skipBrief && !brief) {
      setMessage?.({ type: 'error', text: 'Scrie mai întâi despre ce vrei să fie postarea.' });
      return;
    }

    const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
    const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';

    if (!groqApiKey) {
      setMessage?.({ type: 'error', text: 'Setează VITE_GROQ_API_KEY în .env.local.' });
      return;
    }

    setProcessing(true);
    setCubeSpinning(true);
    setMessage?.({ type: '', text: '' });

    try {
      const scriitorName = scriitor?.nume || 'autorul';
      const scriitorPeriod = scriitor?.date || '';
      const scriitorCategory = scriitor?.categorie || '';
      const bioSnippet = (scriitor?.biografie || '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 480);

      // Debug: verifică dacă brief-ul este trimis corect
      if (!skipBrief) {
        console.log('Brief trimis către AI:', brief);
      }

      // Determină tipul de conținut pentru mesajul sistem
      let contentType = 'postare';
      if (poemText) {
        contentType = 'poezie';
      } else if (text) {
        contentType = 'postare';
      }

      const systemMessage = skipBrief 
        ? `Asumă-ți pe deplin identitatea literară a lui ${scriitorName}${scriitorPeriod ? ` (${scriitorPeriod})` : ''}${scriitorCategory ? `, ${scriitorCategory}` : ''}.

Scrie o descriere scurtă pentru o ${contentType}, ca și cum autorul ar prezenta propria operă.
Descrierea este scrisă la persoana I sau a III-a și pare destinată cititorilor contemporani autorului.

Public: oameni ai vremii respective (evită orice referință modernă: internet, social media, termeni actuali).
Ton: autentic pentru autor — respectă temele, obsesiile, stilul sintactic, vocabularul și ritmul frazei caracteristice lui.
Stil: natural, literar, cu una sau două trăsături recognoscibile (ex: ironie fină, lirism, gravitate, oralitate, solemnitate).
Nu explica stilul, nu comenta ce faci, nu ieși din rol.
Evită formulările explicative sau abstractizante de tip eseistic („X este Y", „are rolul de", „ordonează", „cristalizează").
Preferă imagini metaforice continue, comparații implicite și asocieri simbolice, fără concluzii explicite.
Lungime: 50–100 de cuvinte.
Fără emoticoane. Fără note explicative. Fără ghilimele.

Context util (folosește doar dacă ajută la autenticitate):  
${bioSnippet || '—'}

Returnează exclusiv textul final al descrierii, ca și cum ar fi fost scris direct de autor sau un critic contemporan.`
        : `Asumă-ți pe deplin identitatea literară a lui ${scriitorName}${scriitorPeriod ? ` (${scriitorPeriod})` : ''}${scriitorCategory ? `, ${scriitorCategory}` : ''}.

Scrie o postare scurtă ca și cum autorul ar avea o „gazetă" sau un spațiu public de exprimare specific epocii sale (nu modern).
Postarea este scrisă la persoana I și pare destinată contemporanilor autorului.

Public: oameni ai vremii respective (evită orice referință modernă: internet, social media, termeni actuali).
Perspectivă: eu / îmi / meu; cititorul este tu / voi.
Ton: autentic pentru autor — respectă temele, obsesiile, stilul sintactic, vocabularul și ritmul frazei caracteristice lui.
Stil: natural, literar, cu una sau două trăsături recognoscibile (ex: ironie fină, lirism, gravitate, oralitate, solemnitate).
Nu explica stilul, nu comenta ce faci, nu ieși din rol.
Evită formulările explicative sau abstractizante de tip eseistic („X este Y", „are rolul de", „ordonează", „cristalizează").
Preferă imagini metaforice continue, comparații implicite și asocieri simbolice, fără concluzii explicite.
Lungime: 80–150 de cuvinte.
Fără emoticoane. Fără note explicative. Fără ghilimele.

Context util despre autor (folosește doar dacă ajută la autenticitate):  
${bioSnippet || '—'}`;

      const poemSnippet = poemText 
        ? (poemText.replace(/\s+/g, ' ').trim().slice(0, 800))
        : null;
      
      const textSnippet = text 
        ? (text.replace(/\s+/g, ' ').trim().slice(0, 800))
        : null;

      // Debug
      console.log('=== AI POST GENERATOR DEBUG ===');
      console.log('PROMPT:', brief);
      console.log('POEM TEXT:', poemSnippet ? poemSnippet.substring(0, 100) + '...' : 'NU');
      console.log('TEXT:', textSnippet ? textSnippet.substring(0, 100) + '...' : 'NU');
      console.log('SKIP BRIEF:', skipBrief);
      console.log('================================');

      let userMessage = '';
      
      if (skipBrief) {
        // Pentru descriere (poezie sau text normal)
        if (brief && brief.trim()) {
          // Dacă există brief, îl folosim
          userMessage = `INSTRUCȚIUNI OBLIGATORII PENTRU DESCRIERE:
${brief.trim()}

Descrierea TREBUIE să se refere la: ${brief.trim()}

${poemSnippet ? `POEZIA COMPLETĂ (descrierea TREBUIE să se bazeze pe această poezie):
${poemSnippet}

` : textSnippet ? `TEXTUL POSTĂRII (descrierea TREBUIE să se bazeze pe acest text):
${textSnippet}

` : ''}Sarcina ta:
1. Scrie o descriere care se referă explicit la: "${brief.trim()}"
${poemSnippet ? '2. Descrierea TREBUIE să se bazeze pe poezia de mai sus' : textSnippet ? '2. Descrierea TREBUIE să se bazeze pe textul de mai sus' : ''}
3. Descrierea trebuie să fie relevantă pentru conținut și să respecte instrucțiunile date

Returnează exclusiv textul final al descrierii.`;
        } else if (poemSnippet) {
          // Dacă nu există brief dar există poezie, folosim doar poezia
          userMessage = `Generează descrierea pentru următoarea poezie:

${poemSnippet}

Descrierea trebuie să fie relevantă pentru poezia de mai sus.

Returnează exclusiv textul final al descrierii.`;
        } else if (textSnippet) {
          // Dacă nu există brief dar există text normal, folosim doar textul
          userMessage = `Generează descrierea pentru următorul text:

${textSnippet}

Descrierea trebuie să fie relevantă pentru textul de mai sus.

Returnează exclusiv textul final al descrierii.`;
        } else {
          // Fallback
          userMessage = 'Generează descrierea.';
        }
      } else {
        // Pentru postări normale
        userMessage = `IMPORTANT: Postarea trebuie să se concentreze EXACT pe următoarele idei și subiecte specificate în brief:

${brief}

Postarea trebuie să răspundă direct la brief-ul de mai sus și să abordeze subiectele, tonul și publicul specificate acolo. Nu ignora brief-ul - el este esențial pentru conținutul postării.

Returnează exclusiv textul final al postării, ca și cum ar fi fost scris direct de autor.`;
      }

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
        max_tokens: 320
      };

      const response = await fetch(groqApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        let errorMessage = `Eroare API: ${response.status} - ${response.statusText}`;

        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error?.message) {
            errorMessage = errorData.error.message;
          }
        } catch (_) {
          // keep fallback message
        }

        if (response.status === 401) {
          errorMessage = 'Eroare de autentificare. Verifică cheia API Groq.';
        } else if (response.status === 429) {
          errorMessage = 'Limită de solicitări depășită. Încearcă mai târziu.';
        } else if (response.status === 404) {
          errorMessage = 'Endpoint-ul API nu a fost găsit.';
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Better error handling for API response
      if (!data || !data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
        console.error('Unexpected API response structure:', data);
        throw new Error('Răspuns neașteptat de la API. Verifică configurația API-ului Groq.');
      }
      
      const generated = data.choices[0]?.message?.content?.trim();
      if (!generated) {
        console.error('Empty or missing content in API response:', data);
        throw new Error('Nu s-a primit text generat de la API. Răspunsul API-ului este gol sau invalid.');
      }

      onTextGenerated?.(generated);
      setMessage?.({ type: 'success', text: 'Text generat cu succes de AI!' });
    } catch (error) {
      console.error('Eroare la generarea postării cu AI:', error);
      const message = error.message || 'Nu am putut genera textul. Încearcă din nou.';
      setMessage?.({ type: 'error', text: message });
    } finally {
      setProcessing(false);
      setTimeout(() => setCubeSpinning(false), 800);
    }
  }, [prompt, poemText, text, scriitor, setMessage, onTextGenerated, processing, skipBrief]);

  return (
    <div
      className={`ai-cube-wrapper ${cubeSpinning ? 'spinning' : ''} ${processing ? 'processing' : ''}`}
      onClick={!processing ? handleGenerate : undefined}
      style={{
        cursor: processing ? 'not-allowed' : 'pointer',
        opacity: processing ? 0.6 : 1,
      }}
      title={processing ? 'Se generează...' : 'Generează textul postării cu AI'}
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

export default AIPostGenerator;


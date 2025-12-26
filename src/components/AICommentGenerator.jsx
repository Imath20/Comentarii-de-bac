import React, { useCallback, useMemo, useState } from 'react';

/**
 * AI helper that reuses the 3D cube UI to generate a comment text
 * based on the post context (descriere/text), scriitor and reactions mood.
 */
const AICommentGenerator = ({
  scriitor,
  descriere,
  text,
  poemText = null,
  reactions = [],
  commentAuthor,
  prompt = '',
  onTextGenerated,
  setMessage,
  darkTheme,
}) => {
  const [processing, setProcessing] = useState(false);
  const [cubeSpinning, setCubeSpinning] = useState(false);

  const scriitorName = scriitor?.nume || scriitor?.author || 'autorul';
  const scriitorPeriod = scriitor?.date || '';
  const scriitorCategory = scriitor?.categorie || '';

  const contentSnippet = useMemo(() => {
    return (text || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 750);
  }, [text]);

  const descriereSnippet = useMemo(() => {
    return (descriere || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 320);
  }, [descriere]);

  const reactionMood = useMemo(() => {
    if (!Array.isArray(reactions) || reactions.length === 0) {
      return 'nu există reacții încă (comentariu neutru, curios)';
    }
    const map = reactions.reduce((acc, r) => {
      const type = r?.reaction || 'like';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const moodLabels = {
      like: 'apreciere calmă',
      love: 'entuziasm',
      ador: 'admirație',
      wow: 'surpriză pozitivă',
      haha: 'amuzament',
      sad: 'melancolie',
      cry: 'tristețe puternică',
      angry: 'nemulțumire',
      strengh: 'încurajare',
      multumire: 'recunoștință',
      fire: 'energie',
      cool: 'relaxare',
      clap: 'aplaudat',
      Romania: 'mândrie locală',
    };

    const summary = Object.entries(map)
      .map(([type, count]) => `${count}x ${moodLabels[type] || type}`)
      .join(', ');

    return summary || 'nu există reacții încă (comentariu neutru, curios)';
  }, [reactions]);

  const handleGenerate = useCallback(async () => {
    if (processing) return;

    if (!scriitorName && !contentSnippet && !descriereSnippet) {
      setMessage?.({ type: 'error', text: 'Completează scriitorul sau textul postării pentru a genera comentariul.' });
      return;
    }

    const groqApiKeys = [
      import.meta.env.VITE_GROQ_API_KEY,
      import.meta.env.VITE_GROQ_API_KEY_1,
    ].filter((k) => k && k !== 'undefined');
    const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';

    if (!groqApiKeys.length) {
      setMessage?.({ type: 'error', text: 'Setează VITE_GROQ_API_KEY în .env.local.' });
      return;
    }

    const models = [
      'moonshotai/kimi-k2-instruct-0905',
      'llama-3.1-8b-instant',
      'openai/gpt-oss-120b',
      'llama-3.1-70b-versatile',
    ];

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    setProcessing(true);
    setCubeSpinning(true);
    setMessage?.({ type: '', text: '' });

    try {
      const persona = commentAuthor || 'un cititor al epocii';
      
      // Pentru poezii, folosim poemText, altfel folosim text normal
      // Dacă există poemText explicit, folosim doar pe acela
      const hasPoem = poemText && poemText.trim();
      const actualPoemText = hasPoem ? poemText : null;
      const actualText = hasPoem ? null : text; // Dacă e poezie, nu folosim text normal
      
      const poemSnippet = actualPoemText 
        ? (actualPoemText.replace(/\s+/g, ' ').trim().slice(0, 1000))
        : null;
      
      const textSnippet = actualText 
        ? (actualText.replace(/\s+/g, ' ').trim().slice(0, 750))
        : null;

      const promptText = prompt && prompt.trim() ? prompt.trim() : '';
      
      // Debug: verifică ce context este trimis
      console.log('=== AI COMMENT GENERATOR DEBUG ===');
      console.log('PROMPT:', promptText);
      console.log('POEZIE:', poemSnippet ? poemSnippet.substring(0, 100) + '...' : 'NU');
      console.log('TEXT:', textSnippet ? textSnippet.substring(0, 100) + '...' : 'NU');
      console.log('DESCRIERE:', descriereSnippet ? descriereSnippet.substring(0, 100) + '...' : 'NU');
      console.log('==================================');

      // Construiește systemMessage simplu
      const systemMessage = `Ești ${persona}, prieten/contemporan al lui ${scriitorName}${scriitorPeriod ? ` (${scriitorPeriod})` : ''}.

Scrie un comentariu scurt (30-70 cuvinte) la postarea lui, folosind un limbaj literar sofisticat, metaforic și misterios.

REGLAMENTE STRICTE:
- INTERZIS: cuvântul "frate" sau orice formă de adresare familiară excesivă
- INTERZIS: ton jocos, batjocoritor sau superficial
- INTERZIS: comentarii care "bat câmpii" sau se îndepărtează de subiect
- OBLIGATORIU: limbaj inteligent, metaforic, cu imagini simbolice
- OBLIGATORIU: ton misterios, profund, contemplativ
- OBLIGATORIU: referințe specifice la conținutul postării (imagini, teme, versuri)
- OBLIGATORIU: stil coerent cu epoca, fără termeni moderni

Ton: ${reactionMood}, dar exprimat prin metafore și imagini literare, nu direct.
Stil: literar, sofisticat, cu straturi de sens, evocativ, nu explicativ.

Nu folosi ghilimele, nu explica ce faci, scrie direct comentariul ca un scriitor contemporan care vorbește cu un alt scriitor.`;

      // Construiește userMessage cu prompt-ul și conținutul
      let userMessage = '';
      
      if (promptText) {
        userMessage = `⚠️⚠️⚠️ INSTRUCȚIUNI OBLIGATORII - RESPECTĂ ACESTE CUVINTE:
"${promptText}"

Comentariul TREBUIE să se refere explicit la aceste cuvinte: ${promptText}

CONTEXTUL POSTĂRII:

${descriereSnippet ? `DESCRIERE: ${descriereSnippet}\n\n` : ''}${poemSnippet ? `POEZIA COMPLETĂ (comentariul TREBUIE să se refere la această poezie și la instrucțiunile "${promptText}"):
${poemSnippet}

` : ''}${textSnippet ? `TEXTUL POSTĂRII (comentariul TREBUIE să se refere la acest text și la instrucțiunile "${promptText}"):
${textSnippet}

` : ''}SARCINA TA (ORDINE DE IMPORTANȚĂ):
1. PRIORITATE ABSOLUTĂ: Comentariul TREBUIE să se refere explicit la: "${promptText}" - aceste cuvinte trebuie să apară sau să fie evidente în comentariu
${poemSnippet ? '2. OBLIGATORIU: Comentariul TREBUIE să se refere la poezia de mai sus' : textSnippet ? '2. OBLIGATORIU: Comentariul TREBUIE să se refere la textul de mai sus' : ''}
3. Comentariul trebuie să fie relevant pentru descrierea și conținutul postării

AMINTESTE-TE: Instrucțiunile "${promptText}" sunt PRIORITATE ABSOLUTĂ. Comentariul trebuie să le respecte.

Returnează doar textul comentariului, fără explicații.`;
      } else {
        userMessage = `Scrie un comentariu scurt (30-70 cuvinte) la postarea lui ${scriitorName}.

${descriereSnippet ? `DESCRIERE: ${descriereSnippet}\n\n` : ''}${poemSnippet ? `POEZIA COMPLETĂ:
${poemSnippet}

` : ''}${textSnippet ? `TEXTUL POSTĂRII:
${textSnippet}

` : ''}Comentariul trebuie să fie relevant pentru conținutul de mai sus.

Returnează doar textul comentariului.`;
      }

      let lastError = null;
      let generated = '';

      for (const key of groqApiKeys) {
        if (generated) break;
        for (const model of models) {
          if (generated) break;

          const requestBody = {
            model,
            messages: [
              {
                role: 'system',
                content: systemMessage,
              },
              {
                role: 'user',
                content: userMessage,
              },
            ],
            temperature: 0.65,
            max_tokens: 200,
          };

          // 2 încercări per model pentru rate limiting / răspuns gol
          for (let attempt = 1; attempt <= 2; attempt++) {
            try {
              const response = await fetch(groqApiUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${key}`,
                },
                body: JSON.stringify(requestBody),
              });

              const textResponse = await response.text();

              if (!response.ok) {
                let errorMessage = `Eroare API: ${response.status} - ${response.statusText}`;
                try {
                  const errorData = JSON.parse(textResponse);
                  if (errorData.error?.message) {
                    errorMessage = errorData.error.message;
                  }
                } catch (_) {
                  if (textResponse) {
                    errorMessage = `${errorMessage}. Detalii: ${textResponse}`;
                  }
                }

                if (response.status === 401) {
                  errorMessage = 'Eroare de autentificare. Verifică cheia API Groq.';
                } else if (response.status === 429) {
                  errorMessage = 'Limită de solicitări depășită. Încearcă mai târziu.';
                } else if (response.status === 404) {
                  errorMessage = 'Endpoint-ul API nu a fost găsit.';
                }

                lastError = errorMessage;
                // la rate limit încearcă din nou
                if (response.status === 429 && attempt < 2) {
                  await sleep(400);
                  continue;
                }
                break;
              }

              let data = null;
              try {
                data = JSON.parse(textResponse);
              } catch (err) {
                lastError = 'Răspuns API nu este JSON.';
                break;
              }

              const rawContent =
                data?.choices?.[0]?.message?.content ??
                data?.choices?.[0]?.text ??
                '';

              const merged = Array.isArray(rawContent)
                ? rawContent.map((c) => (typeof c === 'string' ? c : c?.text || '')).join(' ').trim()
                : (typeof rawContent === 'string' ? rawContent : '').trim();

              if (!merged) {
                console.warn('AI comment empty content. Raw response:', data);
                lastError =
                  data?.error?.message ||
                  data?.choices?.[0]?.message?.content ||
                  'Nu am primit comentariul generat de la AI.';
                // încearcă alt model / alt key
              } else {
                generated = merged;
              }
            } catch (err) {
              lastError = err?.message || 'Eroare necunoscută la fetch.';
            }

            if (generated) break;
            if (attempt === 1) {
              await sleep(250);
            }
          }
        }
      }

      if (!generated) {
        throw new Error(lastError || 'Nu am primit comentariul generat de la AI.');
      }

      onTextGenerated?.(generated);
      setMessage?.({ type: 'success', text: 'Comentariu generat cu succes de AI!' });
    } catch (error) {
      console.error('Eroare la generarea comentariului cu AI:', error);
      const message = error.message || 'Nu am putut genera comentariul. Încearcă din nou.';
      setMessage?.({ type: 'error', text: message });
    } finally {
      setProcessing(false);
      setTimeout(() => setCubeSpinning(false), 800);
    }
  }, [processing, scriitorName, scriitorPeriod, scriitorCategory, contentSnippet, descriereSnippet, poemText, reactionMood, commentAuthor, prompt, onTextGenerated, setMessage]);

  return (
    <div
      className={`ai-cube-wrapper ${cubeSpinning ? 'spinning' : ''} ${processing ? 'processing' : ''}`}
      onClick={!processing ? handleGenerate : undefined}
      style={{
        cursor: processing ? 'not-allowed' : 'pointer',
        opacity: processing ? 0.6 : 1,
      }}
      title={processing ? 'Se generează...' : 'Generează comentariu cu AI'}
    >
      <div className="ai-cube-3d">
        <div className="ai-cube-inner">
          <div
            className="ai-cube-side ai-cube-front"
            style={{
              background: darkTheme
                ? 'linear-gradient(135deg, #a97c50 0%, #8b6b42 100%)'
                : 'linear-gradient(135deg, #ffd591 0%, #ffb366 100%)',
            }}
          >
            <div className="dice-dots dice-6">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
          <div
            className="ai-cube-side ai-cube-back"
            style={{
              background: darkTheme
                ? 'linear-gradient(135deg, #8b6b42 0%, #6d5233 100%)'
                : 'linear-gradient(135deg, #ffb366 0%, #ff9f33 100%)',
            }}
          >
            <div className="dice-dots dice-1">
              <span className="dot"></span>
            </div>
          </div>
          <div
            className="ai-cube-side ai-cube-right"
            style={{
              background: darkTheme
                ? 'linear-gradient(135deg, #8b6b42 0%, #6d5233 100%)'
                : 'linear-gradient(135deg, #ffb366 0%, #ff9f33 100%)',
            }}
          >
            <div className="dice-dots dice-3">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
          <div
            className="ai-cube-side ai-cube-left"
            style={{
              background: darkTheme
                ? 'linear-gradient(135deg, #a97c50 0%, #8b6b42 100%)'
                : 'linear-gradient(135deg, #ffd591 0%, #ffb366 100%)',
            }}
          >
            <div className="dice-dots dice-4">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
          <div
            className="ai-cube-side ai-cube-top"
            style={{
              background: darkTheme
                ? 'linear-gradient(135deg, #a97c50 0%, #8b6b42 100%)'
                : 'linear-gradient(135deg, #ffd591 0%, #ffb366 100%)',
            }}
          >
            <div className="dice-dots dice-5">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
          <div
            className="ai-cube-side ai-cube-bottom"
            style={{
              background: darkTheme
                ? 'linear-gradient(135deg, #8b6b42 0%, #6d5233 100%)'
                : 'linear-gradient(135deg, #ffb366 0%, #ff9f33 100%)',
            }}
          >
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

export default AICommentGenerator;


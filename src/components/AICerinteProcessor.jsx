import React, { useCallback, useState } from 'react';

/**
 * Handles AI-powered cerințe processing using Groq and keeps all AI-specific
 * code isolated from the admin dashboard component.
 */
const AICerinteProcessor = ({ subiectForm, setSubiectForm, setMessage, darkTheme }) => {
  const [processing, setProcessing] = useState(false);
  const [cubeSpinning, setCubeSpinning] = useState(false);

  const processCerinteWithAI = useCallback(async () => {
    if (!subiectForm.cerinte || !subiectForm.cerinte.trim()) {
      setMessage({ type: 'error', text: 'Te rog introdu mai întâi textul cerințelor.' });
      return;
    }

    const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
    const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';

    if (!groqApiKey) {
      setMessage({ type: 'error', text: 'Setează VITE_GROQ_API_KEY în .env.local.' });
      return;
    }

    setCubeSpinning(true);
    setProcessing(true);
    setMessage({ type: '', text: '' });

    try {
      const prompt = `Ești un expert în procesarea cerințelor pentru subiecte de BAC la limba română (Subiect 1 B, Subiect 2, Subiect 3).

Ai primit textul brut al cerințelor care poate conține mai multe cerințe amestecate, neformatate sau scrise într-un mod neclar.

Sarcina ta este să procesezi acest text și să extragi/formezi cerințele individuale, EXACT în formatul folosit în subiectele de BAC:

EXEMPLE DE FORMAT CORECT pentru SUBIECT 1 B (redactare):
- 'Cerințe totale: Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă înfățișarea unei persoane poate influența sau nu succesul acesteia, raportându-te atât la informațiile din textul Părintele „Geticei” de Grigore Băjenaru, cât și la experiența personală sau culturală, respectând reperele de conținut și de redactare.'
- 'Sumar conținut: formulează o opinie clară cu privire la temă, enunță și dezvoltă două argumente adecvate opiniei, sprijinite pe exemple/raționamente pertinente, și încheie cu o concluzie coerentă.'
- 'Sumar redactare: utilizează corect conectorii în argumentare; respectă normele limbii literare (exprimare, ortografie, punctuație), așezarea în pagină și lizibilitatea; respectă precizarea privind numărul minim de cuvinte.'

EXEMPLE DE FORMAT CORECT pentru SUBIECT 2 (eseu scurt):
- 'Prezintă, în minimum 50 de cuvinte, rolul notațiilor autorului în fragmentul de mai jos. '
- 'Conținut: precizează rolul notațiilor autorului în fragmentul de mai jos'
- 'Redactare: utiliză corect conectorii în argumentare; respectă normele limbii literare (exprimare, ortografie, punctuație), așezarea în pagină și lizibilitatea'

EXEMPLE DE FORMAT CORECT pentru SUBIECT 3 (eseu):
- 'Prezintă statutul social, psihologic, moral etc. al personajului ales'
- 'Evidențiază o trăsătură a personajului ales, prin două episoade/secvențe comentate'
- 'Analizează două elemente de structură, compoziție și/sau limbaj relevante pentru construcția personajului'

REGULI STRICTE:
1. Fiecare cerință trebuie să fie o propoziție completă, clară și bine formulată în limba română
2. Fiecare cerință trebuie să înceapă cu majusculă și să se termine cu punct (sau punct și virgulă dacă e cazul)
3. NU adăuga numerotare (1., 2., etc.) - fiecare cerință este o linie separată
4. NU adăuga prefixe precum "Cerința 1:", "a)", "b)", etc. (EXCEPTIE: pentru Subiect 1 B și 2, păstrează prefixele "Cerințe totale:", "Sumar conținut:", "Sumar redactare:", "Conținut:", "Redactare:" dacă apar în textul original)
5. NU adăuga explicații suplimentare sau comentarii
6. Păstrează terminologia specifică BAC (ex: "Indică", "Menționează", "Precizează", "Explică", "Prezintă", "Evidențiază", "Analizează", "valorificând textul dat", "justificându-ți răspunsul", etc.)
7. Dacă cerința menționează număr de cuvinte (ex: "minimum 150 de cuvinte", "30-50 de cuvinte"), păstrează-l exact
8. Păstrează ghilimelele și semnele de punctuație specifice (ex: „Geticei", „Odobescu")
9. Pentru Subiect 1 B: păstrează formatul cu "Cerințe totale:", "Sumar conținut:", "Sumar redactare:"
10. Pentru Subiect 2: păstrează formatul cu "Conținut:" și "Redactare:" dacă apare în text
11. Pentru Subiect 3: cerințele sunt directe, fără prefixe speciale

Textul brut de procesat:
${subiectForm.cerinte}

Returnează DOAR cerințele procesate, fiecare pe o linie separată, fără numerotare, fără prefixe inutile, fără explicații. Fiecare linie trebuie să fie o cerință completă, clară și bine formulată, exact ca în exemplele de mai sus.`;

      const requestBody = {
        model: 'openai/gpt-oss-120b',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
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
          if (errorData.error && errorData.error.message) {
            errorMessage = errorData.error.message;
          }
        } catch (_) {
          // Keep original error message
        }

        if (response.status === 401) {
          errorMessage = 'Eroare de autentificare. Verifică că cheia API Groq este validă și activă.';
        } else if (response.status === 429) {
          errorMessage = 'Ai depășit cota API. Verifică planul tău Groq sau așteaptă resetarea cotei.';
        } else if (response.status === 404) {
          errorMessage = 'Endpoint-ul nu a fost găsit. Verifică că URL-ul API este corect.';
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (!data.choices || !data.choices[0]?.message?.content) {
        throw new Error('Răspuns neașteptat de la API');
      }

      const processedText = data.choices[0].message.content.trim();

      if (!processedText) {
        throw new Error('Nu s-a primit text procesat de la API');
      }

      setSubiectForm(prev => ({ ...prev, cerinte: processedText }));
      setMessage({ type: 'success', text: 'Cerințele au fost procesate cu succes!' });
    } catch (error) {
      console.error('Eroare la procesarea cerințelor cu AI:', error);
      let errorMessage = error.message || 'Te rog încearcă din nou.';

      if (errorMessage.includes('401') || errorMessage.includes('autentificare')) {
        errorMessage = 'Eroare de autentificare. Verifică că cheia API Groq este validă și activă.';
      } else if (errorMessage.includes('429') || errorMessage.includes('quota')) {
        errorMessage = 'Ai depășit cota API. Verifică planul tău Groq sau așteaptă resetarea cotei.';
      } else if (errorMessage.includes('404')) {
        errorMessage = 'Endpoint-ul nu a fost găsit. Verifică că URL-ul API este corect.';
      } else if (errorMessage.includes('CORS') || errorMessage.includes('Failed to fetch')) {
        errorMessage = 'Eroare CORS. Groq API ar trebui să permită cereri din browser. Verifică că endpoint-ul este corect.';
      }

      setMessage({ type: 'error', text: `Eroare la procesarea cu AI: ${errorMessage}` });
    } finally {
      setProcessing(false);
      setTimeout(() => setCubeSpinning(false), 1000);
    }
  }, [subiectForm, setMessage, setSubiectForm]);

  return (
    <div
      className={`ai-cube-wrapper ${cubeSpinning ? 'spinning' : ''} ${processing ? 'processing' : ''}`}
      onClick={!processing ? processCerinteWithAI : undefined}
      style={{
        cursor: processing ? 'not-allowed' : 'pointer',
        opacity: processing ? 0.6 : 1,
      }}
      title="Procesează cerințele cu AI"
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
      <div
        className="ai-bernoulli-label"
        style={{
          color: darkTheme ? '#f5e0c3' : '#8b4f1f',
          textShadow: darkTheme
            ? '0 1px 2px rgba(0,0,0,0.4), 0 0 10px rgba(255, 213, 145, 0.3)'
            : '0 1px 2px rgba(0,0,0,0.15)',
        }}
      >
      </div>
    </div>
  );
};

export default AICerinteProcessor;


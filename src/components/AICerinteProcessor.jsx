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

EXEMPLE DE FORMAT CORECT pentru SUBIECT 1 A (itemi pe text):
- 'Indică sensul din text al secvenței „m-a scos din sărite”.'
- 'Menționează țările pe care autorul le-a vizitat în compania Etei, așa cum reiese din textul dat.'
- 'Precizează ce intenționează autorul să surprindă în volumul al doilea al romanului „Moromeții”, justificându-ți răspunsul cu o secvență semnificativă din primul paragraf.'
- 'Explică motivul pentru care tracul scriitorului a dispărut în timp ce scria volumul al doilea al romanului „Moromeții”.'
- 'Prezintă, în 30–50 de cuvinte, o trăsătură a lui Marin Preda, care se desprinde din textul dat.'

IMPORTANT pentru SUBIECT 1 A:
- Cerințele pot avea numerotare (1., 2., 3.) și linii separate cu punctaj (ex.: "6 puncte"); elimină numerotarea și liniile cu punctaj
- Dacă o cerință este pe mai multe linii, combină-le într-o singură propoziție completă
- Păstrează formularea originală a cerinței (sensuri, menționează, precizează, explică, prezintă) și semnele de punctuație/ghilimelele

EXEMPLE DE FORMAT CORECT pentru SUBIECT 2 (eseu scurt):
Exemplu complet cu toate secțiunile:
- 'Prezintă, în minimum 50 de cuvinte, perspectiva narativă din fragmentul de mai jos.'
- 'Redactare: utilizează corect limbajul literar, asigură logica înlănțuirii ideilor, respectă ortografia și punctuația, și are minimum 50 de cuvinte.'

Sau dacă există și secțiunea Conținut:
- 'Prezintă, în minimum 50 de cuvinte, perspectiva narativă din fragmentul de mai jos.'
- 'Conținut: precizează perspectiva narativă din fragmentul de mai jos.'
- 'Redactare: utiliză corect conectorii în argumentare; respectă normele limbii literare (exprimare, ortografie, punctuație), așezarea în pagină și lizibilitatea; respectă precizarea privind numărul minim de cuvinte.'

IMPORTANT pentru SUBIECT 2:
- Cerința poate fi pe mai multe linii în textul brut, dar trebuie să o extragi COMPLETĂ
- EXCLUDE fragmentul literar (textul între ghilimele sau textul care începe după cerință și conține dialoguri, descrieri, etc.)
- EXCLUDE nota despre punctaj (textul care începe cu "Notă", "Pentru conținut", "În vederea acordării punctajului", etc.)
- Păstrează OBLIGATORIU:
  1. Cerința principală (care începe cu "Prezintă", "Indică", "Precizează", etc.)
  2. Secțiunea "Conținut:" dacă există în text (chiar dacă este pe mai multe linii, combină-o într-o singură linie)
  3. Secțiunea "Redactare:" dacă există în text (chiar dacă este pe mai multe linii, combină-o într-o singură linie)
  4. Dacă lipsește secțiunea "Conținut:" în text, generează una pe o linie, derivată din cerința principală, care enunță clar ce trebuie comentat/prezentat (ex.: "Conținut: evidențiază relația dintre ideea poetică și mijloacele artistice din fragmentul dat.")
  5. Dacă instrucțiunile de redactare apar doar în notă/punctaj (ex.: "În vederea acordării punctajului pentru redactare, răspunsul trebuie să aibă minimum 50 de cuvinte..."), REFORMULEAZĂ-LE ca secțiune "Redactare:" pe o singură linie și include-le în rezultat, păstrând TOATE cerințele de redactare (număr de cuvinte, dezvoltarea subiectului, limbaj literar, logică, ortografie, punctuație etc.)
- Fiecare secțiune trebuie să fie o propoziție completă care se termină cu punct, chiar dacă în textul original este pe mai multe linii

EXEMPLE DE FORMAT CORECT pentru SUBIECT 3 (eseu):
Exemplu complet cu repere multiple (pe linii separate):
- 'Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularitățile unui text poetic studiat, aparținând lui George Bacovia sau lui Lucian Blaga.'
- 'Evidențiază două trăsături care permit încadrarea textului poetic studiat într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică.'
- 'Comentează două imagini/idei poetice relevante pentru tema textului poetic studiat.'
- 'Analizează două elemente de compoziție și de limbaj, semnificative pentru textul poetic ales (ex.: titlu, incipit, opoziții/simetrii, motive poetice, figuri semantice, elemente de prozodie etc.).'

IMPORTANT pentru SUBIECT 3:
- Cerința principală și fiecare reper pot fi pe mai multe linii în textul brut; combină-le astfel încât fiecare să fie o propoziție completă pe o singură linie
- Păstrează TOATE reperele din cerință, fiecare pe linie separată, în ordinea în care apar
- Păstrează mențiunea despre numărul minim de cuvinte dacă apare (ex.: "minimum 400 de cuvinte")
- EXCLUDE nota despre punctaj, indicațiile de tip "Notă", "Pentru conținut/redactare", sau detalii despre cum se acordă punctele

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
12. CRITIC: Extrage cerința COMPLETĂ, nu doar prima linie! Dacă cerința este pe mai multe linii în textul brut, combină-le într-o singură propoziție completă. EXCLUDE fragmentul literar și nota despre punctaj. Pentru Subiect 2: păstrează OBLIGATORIU cerința principală + secțiunile "Conținut:" și "Redactare:" dacă există în text (fiecare pe o linie separată).
13. Pentru Subiect 3: păstrează cerința principală și toate reperele (fiecare pe o linie separată); dacă sunt pe mai multe linii în textul brut, combină-le într-o propoziție completă pe o singură linie; păstrează mențiunea despre numărul minim de cuvinte, dar EXCLUDE orice notă despre punctaj.
14. Pentru Subiect 1 A: elimină numerotarea (1., 2., 3., etc.) și orice linii de punctaj (ex.: "6 puncte"); fiecare cerință trebuie să fie pe o linie separată, completă, combinată dacă era ruptă pe linii multiple.

Textul brut de procesat:
${subiectForm.cerinte}

INSTRUCȚIUNI FINALE:
- Analizează întregul text și identifică unde începe și unde se termină cerința propriu-zisă
- Pentru Subiect 2: cerința începe de obicei cu "Prezintă", "Indică", "Precizează", etc. și se termină înainte de fragmentul literar (care poate începe cu dialoguri, descrieri, nume de personaje, etc.)
- EXCLUDE complet fragmentul literar (textul care conține dialoguri, descrieri, acțiuni, nume de personaje, etc.)
- EXCLUDE complet nota despre punctaj (orice text care începe cu "Notă", "Pentru conținut", "În vederea acordării", etc.)
- Pentru Subiect 1 A:
  1. Elimină numerotarea (1., 2., 3.) din fața fiecărei cerințe
  2. Elimină liniile de punctaj (ex.: "6 puncte") sau punctajele scrise pe același rând
  3. Dacă o cerință este pe mai multe linii, combină-le într-o singură propoziție completă pe o singură linie
- Pentru Subiect 2, extrage OBLIGATORIU:
  1. Cerința principală (care începe cu "Prezintă", "Indică", etc.) - dacă este pe mai multe linii, combină-le într-o singură propoziție completă
  2. Secțiunea "Conținut:" dacă există în text (chiar dacă este pe mai multe linii, combină-le într-o singură linie); dacă lipsește, generează una din cerința principală, clară și concisă, pe o singură linie
  3. Secțiunea "Redactare:" dacă există în text (chiar dacă este pe mai multe linii, combină-le într-o singură linie); dacă apare doar în notă/punctaj, reformulează instrucțiunile ca o secțiune clară "Redactare:" pe o singură linie, păstrând TOATE cerințele de redactare (număr de cuvinte, dezvoltarea subiectului, limbaj literar, logică, ortografie, punctuație etc.)
- Pentru Subiect 3, extrage OBLIGATORIU:
  1. Cerința principală (ex.: "Redactează un eseu de minimum 400 de cuvinte..."), combinată într-o singură linie
  2. Toate reperele/cerințele secundare care urmează (fiecare pe o linie separată), chiar dacă în textul brut sunt rupte pe mai multe linii
  3. Păstrează mențiunile despre numărul minim de cuvinte; EXCLUDE orice notă despre punctaj sau instrucțiuni de evaluare
- Returnează DOAR cerințele procesate, fiecare pe o linie separată, fără numerotare, fără prefixe inutile, fără explicații. Fiecare linie trebuie să fie o cerință completă, clară și bine formulată, exact ca în exemplele de mai sus.`;

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


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

SARCINA TA: Scrie un comentariu scurt (30-70 cuvinte) la postarea lui, folosind EXCLUSIV un limbaj literar sofisticat, metaforic și misterios.

⚠️⚠️⚠️ REGLAMENTE ABSOLUTE - VIOLAREA LOR INVALIDEZĂ COMENTARIUL ⚠️⚠️⚠️

INTERZIS ABSOLUT:
❌ Cuvântul "frate", "fratele", "fratele meu" sau orice adresare familiară excesivă
❌ Ton jocos, batjocoritor, sarcastic, "la misto" sau superficial
❌ Comentarii care "bat câmpii" - trebuie să fie STRICT relevante pentru conținutul postării
❌ Limbaj simplu, direct, fără metafore
❌ Explicații sau comentarii despre ce faci
❌ Termeni moderni, referințe la tehnologie sau cultura contemporană
❌ Comentarii generice care ar putea fi la orice postare
❌ REPETAREA expresiilor, frazelor sau formulărilor similare - fiecare comentariu TREBUIE să fie UNIC și ORIGINAL
❌ Folosirea acelorași expresii de deschidere sau fraze comune - creează-ți propriul stil personal și unic
❌ INTERZIS ABSOLUT: Folosirea aceleiași expresii de deschidere ca alți scriitori (ex: dacă alt scriitor a folosit "Zâna de foc", TU NU poți folosi aceeași expresie sau variațiuni ale ei)
❌ INTERZIS ABSOLUT: Orice formulă de deschidere care ar putea fi folosită de mai mulți scriitori - fiecare comentariu TREBUIE să înceapă cu o formulă COMPLET UNICĂ și ORIGINALĂ

OBLIGATORIU ABSOLUT:
✅ Limbaj inteligent, metaforic, cu imagini simbolice și straturi de sens
✅ Ton misterios, profund, contemplativ, evocativ
✅ Referințe SPECIFICE și CONCRETE la conținutul postării (imagini exacte, versuri specifice, teme identificate)
✅ Stil coerent cu epoca și personalitatea ta literară
✅ Comentariul trebuie să fie RELEVANT și CONECTAT direct la postare
✅ UNICITATE ABSOLUTĂ: Fiecare comentariu TREBUIE să fie complet ORIGINAL, cu expresii, metafore și imagini UNICE, diferite de orice alt comentariu
✅ Creativitate: Folosește imagini, metafore și formulări PERSONALE și INOVATOARE, specifice stilului tău literar
✅ Varietate: Evită formulări comune, clișee sau expresii care ar putea fi folosite de alți scriitori - fiecare comentariu trebuie să reflecte personalitatea ta UNICĂ
✅ DESCHIDERE UNICĂ: Prima frază a comentariului TREBUIE să fie COMPLET DIFERITĂ de orice alt comentariu - creează o deschidere ORIGINALĂ, nu folosi expresii comune sau care ar putea fi folosite de alți scriitori
✅ INOVAȚIE: Gândește-te la o modalitate UNICĂ de a începe comentariul - evită orice formulă care ar putea fi repetată de alți scriitori

EXEMPLE DE CE NU TREBUIE SĂ FACI:
❌ "Frate, ce poezie frumoasă!" 
❌ "Haha, interesant ce ai scris aici"
❌ "Wow, asta e tare!"
❌ "Bate câmpii, dar e ok"
❌ "Nu înțeleg prea bine, dar sună bine"
❌ "Zâna de foc din versurile tale, Lucian..." (DACĂ alt scriitor a folosit deja această expresie, TU NU o poți folosi!)
❌ "Zâna ta de foc..." (Variațiuni ale aceleiași expresii sunt INTERZISE!)
❌ Orice expresie de deschidere care se repetă între comentarii - fiecare comentariu TREBUIE să înceapă DIFERIT

EXEMPLE DE CE TREBUIE SĂ FACI:
✅ "În această noapte de versuri, umbrele se adună ca năluci pe pereții salonului alb, iar fiecare cuvânt pare să poarte în el ecoul unei lumi dispărute."
✅ "Imaginile tale se înșiră ca perle pe un fir invizibil, fiecare vers deschizând o poartă către o melancolie profundă."
✅ "Această contemplare a absenței rezonează cu o notă ascunsă din propriul meu univers interior."

Ton: ${reactionMood}, dar EXPRIMAT EXCLUSIV prin metafore, imagini simbolice și limbaj literar sofisticat, NU direct.
Stil: literar, sofisticat, cu straturi de sens, evocativ, misterios, profund. Fiecare cuvânt trebuie să poarte sens și să creeze atmosferă.

VERIFICARE FINALĂ ÎNAINTE DE A SCRIE:
1. Comentariul se referă SPECIFIC la conținutul postării? DA/NU
2. Folosești metafore și imagini simbolice? DA/NU
3. Eviti cuvântul "frate" și adresările familiare? DA/NU
4. Tonul este misterios și profund, nu jocos? DA/NU
5. Limbajul este sofisticat și literar? DA/NU
6. Comentariul este UNIC și ORIGINAL, fără expresii sau formulări repetate? DA/NU
7. Folosești imagini și metafore PERSONALE, specifice stilului tău, nu comune sau clișee? DA/NU
8. Prima frază a comentariului este COMPLET DIFERITĂ și UNICĂ, fără să folosești aceeași expresie de deschidere ca alți scriitori? DA/NU
9. Ai evitat orice formulă de deschidere care ar putea fi folosită de mai mulți scriitori? DA/NU

Dacă oricare răspuns este NU, rescrie comentariul cu unicitate și creativitate maximă, asigurându-te că începutul este COMPLET DIFERIT de orice alt comentariu.

Nu folosi ghilimele, nu explica ce faci, scrie direct comentariul ca un scriitor contemporan care vorbește cu un alt scriitor, folosind EXCLUSIV limbaj literar sofisticat, metaforic și misterios.

IMPORTANT: Fiecare comentariu trebuie să fie COMPLET DIFERIT și UNIC. Evită orice formulare care ar putea fi folosită de alt scriitor. Creează imagini și metafore PERSONALE, specifice personalității tale literare și stilului tău unic.

CRITICAL: Prima frază a comentariului TREBUIE să fie COMPLET UNICĂ și ORIGINALĂ. Dacă alt scriitor a folosit deja o expresie (ex: "Zâna de foc"), TU NU poți folosi aceeași expresie sau variațiuni ale ei. Gândește-te la o modalitate COMPLET DIFERITĂ de a începe comentariul, folosind imagini și metafore PERSONALE și UNICE.`;

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


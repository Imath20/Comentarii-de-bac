import React, { useMemo, useRef, useState } from 'react';

// IMPORTANT:
// - Pentru OCR folosim DOAR modele multimodale (vision)
// - NU adăuga aici modele text (ex: `openai/gpt-oss-120b`, `llama-3.1-8b-instant`),
//   altfel Groq va da 400: "messages[x].content must be a string"
//   pentru că acele modele nu acceptă content ca array cu `image_url`.
// - Lista de mai jos copiază modelele folosite deja în `ai.jsx` pentru input de tip imagine.
const MODELS_VISION = [
  'moonshotai/kimi-k2-instruct-0905',
  'llama-3.2-11b-vision-preview',
  'llama-3.2-90b-vision-preview',
];

// Modele pentru generarea efectivă a celor 3 comentarii (text-only)
// Limităm la modele care chiar funcționează pe contul tău: Kimi + GPT OSS.
const MODELS_TEXT = [
  'moonshotai/kimi-k2-instruct-0905',
  'openai/gpt-oss-120b',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const decodeHtmlEntities = (s) => {
  if (!s) return s;
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
};

const stripCodeFences = (s) => {
  if (!s) return s;
  const fenced = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced && fenced[1]) return fenced[1].trim();
  return s;
};

const safeParseJson = (content) => {
  if (!content || typeof content !== 'string') return null;
  const cleaned = decodeHtmlEntities(stripCodeFences(content.trim()));
  try {
    return JSON.parse(cleaned);
  } catch (_) {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (err) {
        console.warn('Parse JSON fallback failed', err);
      }
    }
  }
  return null;
};

const countWords = (text = '') => {
  const t = (text || '')
    .replace(/[`*_#+>\[\]()]/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!t) return 0;
  return t.split(' ').filter(Boolean).length;
};

export default function AICommentsFromImages({ darkTheme, markdownToHtml }) {
  const imageInputRef = useRef(null);
  const [images, setImages] = useState([]); // [{name, dataUrl}]
  const [status, setStatus] = useState(null); // {type,text}
  const [processing, setProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [results, setResults] = useState(null); // {free, pro, premium}

  const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
  const groqApiKeys = useMemo(() => {
    return [import.meta.env.VITE_GROQ_API_KEY, import.meta.env.VITE_GROQ_API_KEY_1].filter(
      (k) => k && k !== 'undefined'
    );
  }, []);

  const setFeedback = (type, text) => setStatus({ type, text });

  const onFilesSelected = async (fileList) => {
    const files = Array.from(fileList || []).filter(Boolean);
    if (!files.length) return;

    const bad = files.find((f) => !f.type?.startsWith('image/'));
    if (bad) {
      setFeedback('error', 'Te rog încarcă doar imagini (JPG, PNG, WEBP).');
      return;
    }

    const readOne = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ name: file.name, dataUrl: reader.result });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    try {
      const data = await Promise.all(files.map(readOne));
      setImages(data);
      setExtractedText('');
      setResults(null);
      setFeedback('success', `${data.length} imagine(i) încărcată(e).`);
    } catch (err) {
      console.warn('FileReader error', err);
      setFeedback('error', 'Nu am putut citi imaginile. Încearcă din nou.');
    }
  };

  const reset = () => {
    setImages([]);
    setExtractedText('');
    setResults(null);
    setStatus(null);
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const groqChat = async ({ modelCandidates, messages, maxTokens }) => {
    let lastErr = null;

    for (const model of modelCandidates) {
      for (const key of groqApiKeys) {
        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            const res = await fetch(groqApiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${key}`,
              },
              body: JSON.stringify({
                model,
                messages,
                temperature: 0.3,
                max_tokens: maxTokens,
              }),
            });

            const rawText = await res.text().catch(() => '');
            if (!res.ok) {
              // Încearcă să extragi mesajul de eroare clar din JSON
              let friendly = rawText || `Eroare ${res.status}`;
              try {
                const errJson = rawText ? JSON.parse(rawText) : null;
                if (errJson?.error?.message) {
                  friendly = errJson.error.message;
                }
              } catch (_) {
                // rawText nu e JSON – lăsăm ca atare
              }

              console.error('[Groq] HTTP error', res.status, friendly);
              lastErr = friendly;

              if (res.status === 429) {
                const retryMatch = rawText.match(/try again in ([\d.]+)s/i);
                const retryMs = retryMatch ? Math.ceil(parseFloat(retryMatch[1]) * 1000) : 1500;
                await sleep(retryMs);
                continue;
              }
              // model decommissioned etc -> move on
              break;
            }

            let data = null;
            try {
              data = rawText ? JSON.parse(rawText) : null;
            } catch (_) {
              lastErr = 'Răspuns Groq nu este JSON parsabil.';
              continue;
            }

            const content = data?.choices?.[0]?.message?.content?.trim();
            if (!content) {
              lastErr = 'Răspuns AI gol.';
              continue;
            }

            const parsed = safeParseJson(content);
            if (!parsed || typeof parsed !== 'object') {
              lastErr = 'Nu am putut parsa JSON-ul din răspuns.';
              continue;
            }

            return parsed;
          } catch (err) {
            lastErr = err?.message || 'Eroare necunoscută.';
            await sleep(400);
          }
        }
      }
    }

    throw new Error(lastErr || 'Nu s-a putut obține răspuns de la Groq.');
  };

  const run = async () => {
    if (processing) return;
    if (!groqApiKeys.length) {
      setFeedback('error', 'Setează VITE_GROQ_API_KEY (și opțional VITE_GROQ_API_KEY_1) pentru a folosi Groq.');
      return;
    }

    const currentText = (extractedText || '').trim();
    if (!images.length && !currentText) {
      setFeedback('error', 'Încarcă cel puțin o imagine sau lipește textul comentariului în zona de mai jos.');
      return;
    }

    setProcessing(true);
    setResults(null);
    setFeedback('info', 'Pregătim textul și generăm cele 3 variante...');

    try {
      // În acest moment modelele Vision Groq folosite în trecut sunt decommissioned
      // și endpoint-ul /openai/v1/chat/completions nu mai acceptă content multimodal (image_url).
      // Ca să nu dăm erori 400 non-stop, nu mai încercăm OCR direct cu Groq.
      // În schimb:
      //  - dacă ai lipit deja textul în zona "Text extras (OCR)", îl folosim direct
      //  - dacă ai doar imagini, te rugăm să folosești un site OCR extern și să lipești textul acolo.
      let sourceText = currentText;
      if (!sourceText) {
        // avem imagini, dar nu și text
        throw new Error(
          'Modelele Groq cu imagini folosite înainte au fost dezactivate (decommissioned), ' +
          'iar endpoint-ul actual nu mai acceptă direct poze. Te rog convertește imaginile în text cu un OCR extern ' +
          'și lipește textul în zona „Text extras (OCR)”, apoi apasă din nou „Generează 3 comentarii”.'
        );
      }

      // Protecție pentru eroarea 413 (Request too large / TPM exceeded):
      // dacă textul e foarte mare, îl tăiem la o lungime rezonabilă pentru generarea de comentarii.
      const MAX_CHARS = 8000; // ~1500–2000 tokens, suficient pentru 3 comentarii lungi
      if (sourceText.length > MAX_CHARS) {
        sourceText = sourceText.slice(0, MAX_CHARS);
        setFeedback(
          'info',
          'Textul inițial a fost foarte lung; am folosit doar prima parte pentru a evita limita de tokens la Groq.'
        );
      }

      setExtractedText(sourceText);
      setFeedback('info', 'Generăm cele 3 variante (Free/Pro/Premium) și le formatăm...');

      const genSystem = [
        'Ești profesor de limba și literatura română.',
        'Din textul-sursă generează 3 variante de comentariu literar: Free / Pro / Premium.',
        'IMPORTANT: nu inventa idei care nu apar în sursă; poți reorganiza, clarifica și structura.',
        'Fiecare variantă trebuie să fie în limba română, cu subtitluri clare și paragrafe bine delimitate.',
        'Formatare: folosește markdown cu titluri (##) și liste unde e util. Pentru subliniere folosește sintaxa ++text++ (NU folosi HTML).',
        'CONDIȚII DE LUNGIME (obligatorii, nu aproximative):',
        '- Free: MINIM 400 de cuvinte și MAXIM 550 de cuvinte.',
        '- Pro: MINIM 600 de cuvinte și MAXIM 700 de cuvinte.',
        '- Premium: MINIM 800 de cuvinte și MAXIM 900 de cuvinte.',
        'Dacă o variantă ar ieși mai scurtă decât minimul cerut, trebuie să o EXTINZI (adaugă explicații, analize, conexiuni) până ajungi în interval.',
        'Dacă o variantă ar depăși maximul, trebuie să o SCURTEZI păstrând ideile esențiale.',
        'Returnează DOAR JSON valid, fără ``` și fără text extra.',
        'Format JSON obligatoriu:',
        '{ "free": { "markdown": "...", "wordCount": number }, "pro": { "markdown": "...", "wordCount": number }, "premium": { "markdown": "...", "wordCount": number } }',
      ].join('\n');

      const genUser = `TEXT-SURSĂ (OCR sau introdus manual):\n${sourceText}\n\nGenerează cele 3 variante acum.`;

      const genJson = await groqChat({
        modelCandidates: MODELS_TEXT,
        messages: [
          { role: 'system', content: genSystem },
          { role: 'user', content: genUser },
        ],
        maxTokens: 3500,
      });

      const freeMd = (genJson?.free?.markdown || '').toString().trim();
      const proMd = (genJson?.pro?.markdown || '').toString().trim();
      const premiumMd = (genJson?.premium?.markdown || '').toString().trim();

      if (!freeMd || !proMd || !premiumMd) {
        throw new Error('Generarea nu a returnat toate cele 3 variante.');
      }

      const computed = {
        free: { markdown: freeMd, wordCount: Number(genJson?.free?.wordCount) || countWords(freeMd) },
        pro: { markdown: proMd, wordCount: Number(genJson?.pro?.wordCount) || countWords(proMd) },
        premium: { markdown: premiumMd, wordCount: Number(genJson?.premium?.wordCount) || countWords(premiumMd) },
      };

      setResults(computed);
      setFeedback('success', 'Gata: am extras textul și am generat cele 3 comentarii.');
    } catch (err) {
      console.error(err);
      setFeedback('error', err?.message || 'Nu am putut genera comentariile.');
    } finally {
      setProcessing(false);
    }
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setFeedback('success', 'Copiat în clipboard.');
    } catch (_) {
      setFeedback('error', 'Nu am putut copia (permisiuni browser).');
    }
  };

  const themeClass = darkTheme ? 'dark-theme' : '';

  return (
    <div className={`ai-main-section ${themeClass}`}>
      <div className="ai-header">
        <h2 className="ai-main-title">Comentarii din poze (AI)</h2>
        <p className="ai-subtitle">
          Încarci poze cu comentariul (sau lipești direct textul transcris), iar AI-ul generează 3 variante: Free / Pro / Premium.
        </p>
      </div>

      <div className="ai-form">
        <div className="ai-form-group">
          <label className="ai-field-label">Imagini cu comentariul (una sau mai multe)</label>
          <div className="ai-image-upload">
            <label htmlFor="comment-images" className={`ai-image-label ${themeClass}`}>
              Încarcă imagini (multiple)
            </label>
            <input
              type="file"
              id="comment-images"
              accept="image/*"
              multiple
              className="ai-file-input"
              ref={imageInputRef}
              onChange={(e) => onFilesSelected(e.target.files)}
            />
          </div>
          {images.length > 0 && (
            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10 }}>
              {images.map((img) => (
                <div key={img.name} style={{ borderRadius: 10, overflow: 'hidden', border: darkTheme ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.12)' }}>
                  <img src={img.dataUrl} alt={img.name} style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
                  <div style={{ padding: '6px 8px', fontSize: 12, opacity: 0.85, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{img.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`ai-submit-btn ${themeClass} ${processing ? 'loading' : ''}`}
            disabled={processing || (!images.length && !extractedText.trim())}
            onClick={run}
          >
            {processing ? 'Se procesează...' : 'Generează 3 comentarii'}
          </button>
          <button type="button" className={`ai-submit-btn ${themeClass}`} disabled={processing} onClick={reset}>
            Resetează
          </button>
        </div>

        {status?.text && (
          <div
            style={{
              marginTop: 14,
              padding: '10px 12px',
              borderRadius: 10,
              background: status.type === 'error' ? 'rgba(255, 95, 82, 0.12)' : status.type === 'success' ? 'rgba(92, 184, 92, 0.12)' : 'rgba(76, 139, 255, 0.12)',
              border: darkTheme ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.08)',
            }}
          >
            {status.text}
          </div>
        )}
      </div>

      <div className={`ai-results-section ${themeClass}`} style={{ marginTop: 16 }}>
        <div className="ai-results-header">
          <h2 className="ai-results-title">Text extras (OCR) / introdus manual</h2>
        </div>
        <textarea
          className={`ai-field-textarea ${themeClass}`}
          rows={10}
          value={extractedText}
          onChange={(e) => setExtractedText(e.target.value)}
          style={{ width: '100%' }}
          placeholder="Dacă OCR-ul Groq nu funcționează, lipește aici textul comentariului (transcris din poze) și apasă „Generează 3 comentarii”."
        />
        <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
          <button type="button" className={`ai-submit-btn ${themeClass}`} onClick={() => copy(extractedText)} disabled={!extractedText}>
            Copiază textul
          </button>
        </div>
      </div>

      {results && (
        <div className={`ai-results-section ${themeClass}`} style={{ marginTop: 16 }}>
          <div className="ai-results-header">
            <h2 className="ai-results-title">Comentarii generate</h2>
          </div>

          {(['free', 'pro', 'premium']).map((tier) => {
            const label =
              tier === 'free'
                ? 'Free (400-550 cuvinte)'
                : tier === 'pro'
                ? 'Pro (600-700 cuvinte)'
                : 'Premium (800-900 cuvinte)';
            const md = results?.[tier]?.markdown || '';
            const wc = results?.[tier]?.wordCount ?? countWords(md);
            return (
              <div key={tier} style={{ marginTop: 14 }}>
                <div className="ai-section-header" style={{ alignItems: 'baseline' }}>
                  <h3 className="ai-feedback-title">{label}</h3>
                  <div style={{ marginLeft: 'auto', opacity: 0.85, fontSize: 13 }}>{wc} cuvinte</div>
                </div>
                <div className="ai-feedback-content" dangerouslySetInnerHTML={{ __html: markdownToHtml(md) }} />
                <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
                  <button type="button" className={`ai-submit-btn ${themeClass}`} onClick={() => copy(md)}>
                    Copiază {tier}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}



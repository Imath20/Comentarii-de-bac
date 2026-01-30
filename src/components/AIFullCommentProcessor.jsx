import React, { useMemo, useState } from 'react';

const COLOR_PALETTE = [
  { name: 'Galben deschis', value: '#ffd591' },
  { name: 'Portocaliu', value: '#ff9f33' },
  { name: 'Auriu', value: '#c58a28' },
  { name: 'Roz', value: '#e75c8d' },
  { name: 'Albastru', value: '#4c8bff' },
  { name: 'Verde', value: '#5cb85c' },
  { name: 'Liliac', value: '#b38bfa' },
  { name: 'Roșu', value: '#ff5f52' },
];

const sanitizeText = (text = '') => text.replace(/\s+/g, ' ').trim();

const isWordChar = (ch) => {
  if (!ch) return false;
  // litere/digit/underscore (unicode aware)
  return /[\p{L}\p{N}_]/u.test(ch);
};

const expandToWordBoundaries = (text, start, end) => {
  if (!text || start == null || end == null) return { start, end };
  let s = Math.max(0, Math.min(start, text.length));
  let e = Math.max(s, Math.min(end, text.length));

  // extinde doar dacă match-ul e „în interiorul” unui cuvânt
  while (s > 0 && isWordChar(text[s - 1]) && isWordChar(text[s])) {
    s -= 1;
  }
  while (e < text.length && isWordChar(text[e - 1]) && isWordChar(text[e])) {
    e += 1;
  }
  return { start: s, end: e };
};

const stripJson = (raw = '') => {
  const trimmed = raw.trim();
  if (trimmed.startsWith('```')) {
    return trimmed.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  }
  return trimmed;
};

const safeParseJson = (raw = '') => {
  const stripped = stripJson(raw);
  try {
    return JSON.parse(stripped);
  } catch (_) {
    const matches = stripped.match(/\{[\s\S]*\}/g);
    if (matches && matches.length) {
      const candidate = matches.reduce((longest, cur) =>
        cur.length > longest.length ? cur : longest, '');
      if (candidate) {
        try {
          return JSON.parse(candidate);
        } catch (err) {
          console.warn('JSON parse fallback failed', err);
        }
      }
    }
    throw new Error('Parse JSON failed');
  }
};

const findRange = (baseText, targetText, usedRanges, { expandToWord = false } = {}) => {
  const cleanTarget = sanitizeText(targetText);
  if (!cleanTarget) return null;

  const lowerBase = baseText.toLowerCase();
  const lowerTarget = cleanTarget.toLowerCase();
  let startIndex = 0;

  while (startIndex < baseText.length) {
    const found = lowerBase.indexOf(lowerTarget, startIndex);
    if (found === -1) break;
    const end = found + cleanTarget.length;
    const overlaps = Array.isArray(usedRanges)
      ? usedRanges.some((r) => found < r.end && end > r.start)
      : false;
    if (!overlaps) {
      if (Array.isArray(usedRanges)) {
        usedRanges.push({ start: found, end });
      }
      const range = expandToWord ? expandToWordBoundaries(baseText, found, end) : { start: found, end };
      return range;
    }
    startIndex = found + 1;
  }
  return null;
};

const AIFullCommentProcessor = ({ fullText, onProcessed, darkTheme, onStatus }) => {
  // până la 2 culori, exact ca un „theme” de evidențiere
  const [selectedColors, setSelectedColors] = useState([COLOR_PALETTE[0].value, COLOR_PALETTE[1].value]);
  const [formatTheme, setFormatTheme] = useState('highlight'); // 'highlight', 'underline', 'textColor'
  const [processing, setProcessing] = useState(false);
  const [cubeSpinning, setCubeSpinning] = useState(false);

  const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
  const groqApiKeyBackup = import.meta.env.VITE_GROQ_API_KEY_1;
  const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
  const groqKeys = useMemo(
    () => [groqApiKey, groqApiKeyBackup].filter((k) => k && k !== 'undefined'),
    [groqApiKey, groqApiKeyBackup]
  );

  const setFeedback = (type, text) => {
    if (onStatus) onStatus({ type, text });
  };

  const toggleColor = (value) => {
    setSelectedColors((prev) => {
      const exists = prev.includes(value);
      if (exists) {
        // scoate culoarea
        return prev.filter((c) => c !== value);
      }
      // maxim 2 culori
      if (prev.length >= 2) {
        return [...prev.slice(1), value];
      }
      return [...prev, value];
    });
  };

  const handleProcess = async () => {
    if (processing) return;
    if (!fullText || !fullText.trim()) {
      setFeedback('error', 'Adaugă textul complet al comentariului înainte să rulezi procesarea.');
      return;
    }

    if (!groqKeys.length) {
      setFeedback('error', 'Setează variabila VITE_GROQ_API_KEY în .env.local.');
      return;
    }

    if (!selectedColors.length) {
      setFeedback('error', 'Selectează cel puțin o culoare (maxim 2).');
      return;
    }

    const prompt = `Procesează următorul comentariu literar complet și împarte-l în paragrafe structurate cu subtitluri și formatare.

TEXTUL COMPLET:
${fullText}

SARCINA TA:
1. Împarte textul în paragrafe logice (3-8 paragrafe, în funcție de lungime)
2. Pentru fiecare paragraf, creează un subtitlu relevant și descriptiv
3. Aplică formatare consistentă folosind o SINGURĂ metodă de evidențiere (theme unic):
   - Dacă folosești highlight, folosește-l PESTE TOT (nu amesteca cu underline sau text color)
   - Dacă folosești underline, folosește-l PESTE TOT
   - Dacă folosești text color, folosește-l PESTE TOT
4. Marchează fragmente importante cu bold și italic unde este necesar (obligatoriu să existe și bold și italic în fiecare paragraf, dacă se poate)
5. Folosește NUMAI culorile de mai jos pentru evidențiere (prin colorKey):
   ${selectedColors.map((c, idx) => `[${idx}] ${c}`).join(', ')}

REGULI ABSOLUTE:
- O SINGURĂ metodă de evidențiere per comentariu (highlight SAU underline SAU textColor)
- Nu amesteca highlight cu underline sau textColor
- Subtitlurile trebuie să fie relevante și descriptive
- Paragrafele trebuie să aibă sens logic și să fie bine delimitate
- Bold pentru termeni/concepte cheie (max 5-8 per paragraf)
- Italic pentru citate sau fragmente speciale (max 3-5 per paragraf)
- Highlight/underline/textColor pentru fragmente esențiale (max 8-12 per paragraf)

Format JSON pentru evidențiere (folosește colorKey; NU returna substring-uri gen \"ana\" din \"analitic\"):
- highlight / underline / textColors: [{ "text": "fragment EXACT (cuvânt/expresie întreagă)", "colorKey": 0 }]
- bold / italic: ["cuvânt/expresie întreagă (nu substring)"]

Returnează DOAR JSON:
{
  "formatMethod": "highlight", // sau "underline" sau "textColor"
  "paragraphs": [
    {
      "title": "Subtitlu paragraf",
      "text": "Textul complet al paragrafului...",
      "highlights": [{ "text": "fragment exact 1", "colorKey": 0 }, { "text": "fragment exact 2", "colorKey": 1 }], // doar dacă formatMethod este "highlight"
      "underlines": [{ "text": "fragment exact 1", "colorKey": 0 }], // doar dacă formatMethod este "underline"
      "textColors": [{ "text": "fragment exact 1", "colorKey": 0 }], // doar dacă formatMethod este "textColor"
      "bold": ["termen cheie 1", "termen cheie 2"],
      "italic": ["citat sau fragment special"]
    }
  ]
}`.trim();

    const body = {
      model: 'moonshotai/kimi-k2-instruct-0905',
      messages: [
        {
          role: 'system',
          content: 'Răspunde DOAR cu JSON valid în câmpul content. Nu folosi reasoning. Nu adăuga text, explicații sau ```. Răspunsul trebuie să fie direct JSON valid.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 4000,
    };

    setProcessing(true);
    setCubeSpinning(true);
    setFeedback('', '');

    let lastError = null;

    for (const key of groqKeys) {
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
          lastError = text || `Eroare ${res.status}`;
          continue;
        }

        const rawText = await res.text();
        console.warn('AI raw response (debug):', rawText);

        let data;
        try {
          data = JSON.parse(rawText);
        } catch (err) {
          lastError = 'Răspuns API nu este JSON parsabil.';
          continue;
        }

        const rawContent = data?.choices?.[0]?.message?.content || '';
        if (!rawContent || typeof rawContent !== 'string') {
          lastError = 'Răspuns AI este gol.';
          continue;
        }
        console.warn('AI raw content (debug):', rawContent);

        let effectiveContent = rawContent;
        if (!effectiveContent.trim()) {
          const reasoning = data?.choices?.[0]?.message?.reasoning;
          if (reasoning && typeof reasoning === 'string') {
            effectiveContent = reasoning;
          }
        }

        if (!effectiveContent.trim()) {
          const reasoning = data?.choices?.[0]?.message?.reasoning;
          if (reasoning && typeof reasoning === 'string') {
            const candidate = reasoning.match(/\{[\s\S]*\}/);
            if (candidate && candidate[0]) {
              effectiveContent = candidate[0];
            }
          }
        }

        let parsed;
        try {
          parsed = safeParseJson(effectiveContent);
        } catch (err) {
          lastError = 'Răspuns AI nu este JSON valid.';
          continue;
        }

        if (!parsed?.paragraphs || !Array.isArray(parsed.paragraphs)) {
          lastError = 'Răspuns AI nu conține câmpul "paragraphs".';
          continue;
        }

        // Convert to RichTextEditor format
        const formatMethod = parsed.formatMethod || 'highlight';
        const structuredContent = parsed.paragraphs.map((para) => {
          const block = {
            type: 'paragraph',
            title: para.title || '',
            text: para.text || '',
            highlights: [],
            underlines: [],
            formats: [],
          };

          const baseText = block.text;
          // folosit doar pentru evidențiere (nu blocăm bold/italic să se suprapună peste highlight)
          const usedHighlightRanges = [];

          const getColorFromKey = (colorKey) => {
            const idx = Number.isInteger(colorKey) ? colorKey : 0;
            return selectedColors[idx] || selectedColors[0] || COLOR_PALETTE[0].value;
          };

          const pickColorDeterministic = (text) => {
            // fallback ca să folosim și a 2-a culoare chiar dacă AI trimite string fără colorKey
            const s = (text || '').toString();
            let h = 0;
            for (let i = 0; i < s.length; i += 1) {
              h = (h * 31 + s.charCodeAt(i)) >>> 0;
            }
            const idx = selectedColors.length > 1 ? (h % 2) : 0;
            return selectedColors[idx] || selectedColors[0] || COLOR_PALETTE[0].value;
          };

          // Apply formatting based on formatMethod
          if (formatMethod === 'highlight' && para.highlights) {
            para.highlights.forEach((item) => {
              const target = typeof item === 'string' ? item : item?.text;
              const colorKey = typeof item === 'object' && Number.isInteger(item.colorKey) ? item.colorKey : 0;
              const color = typeof item === 'string' ? pickColorDeterministic(target) : getColorFromKey(colorKey);
              const range = findRange(baseText, target, usedHighlightRanges, { expandToWord: true });
              if (range) {
                block.highlights.push({ ...range, color });
              }
            });
          } else if (formatMethod === 'underline' && para.underlines) {
            para.underlines.forEach((item) => {
              const target = typeof item === 'string' ? item : item?.text;
              const colorKey = typeof item === 'object' && Number.isInteger(item.colorKey) ? item.colorKey : 0;
              const color = typeof item === 'string' ? pickColorDeterministic(target) : getColorFromKey(colorKey);
              const range = findRange(baseText, target, usedHighlightRanges, { expandToWord: true });
              if (range) {
                block.underlines.push({ ...range, color });
              }
            });
          } else if (formatMethod === 'textColor' && para.textColors) {
            para.textColors.forEach((item) => {
              const target = typeof item === 'string' ? item : item?.text;
              const colorKey = typeof item === 'object' && Number.isInteger(item.colorKey) ? item.colorKey : 0;
              const color = typeof item === 'string' ? pickColorDeterministic(target) : getColorFromKey(colorKey);
              const range = findRange(baseText, target, usedHighlightRanges, { expandToWord: true });
              if (range) {
                block.formats.push({ ...range, type: 'color', value: color });
              }
            });
          }

          // Apply bold
          if (para.bold) {
            para.bold.forEach((fragment) => {
              const range = findRange(baseText, fragment, null, { expandToWord: true });
              if (range) {
                block.formats.push({ ...range, type: 'bold', value: true });
              }
            });
          }

          // Apply italic
          if (para.italic) {
            para.italic.forEach((fragment) => {
              const range = findRange(baseText, fragment, null, { expandToWord: true });
              if (range) {
                block.formats.push({ ...range, type: 'italic', value: true });
              }
            });
          }

          return block;
        });

        onProcessed(structuredContent);
        setFeedback('success', 'Comentariul a fost procesat și formatat cu succes!');
        setProcessing(false);
        setTimeout(() => setCubeSpinning(false), 800);
        return;
      } catch (err) {
        lastError = err?.message || 'Eroare necunoscută';
      }
    }

    setFeedback('error', `Nu am putut procesa comentariul. ${lastError || ''}`);
    setProcessing(false);
    setTimeout(() => setCubeSpinning(false), 800);
  };

  return (
    <div className={`ai-formatting-card ${darkTheme ? 'dark-theme' : ''}`}>
      <div className="ai-formatting-top">
        <div className="ai-formatting-info">
          <div className="ai-formatting-title">Procesează comentariu complet cu AI</div>
          <div className="ai-formatting-subtitle">
            AI-ul va împărți textul în paragrafe cu subtitluri și va aplica formatare consistentă.
          </div>
        </div>
        <div
          className={`ai-cube-wrapper ${cubeSpinning ? 'spinning' : ''} ${processing ? 'processing' : ''}`}
          onClick={!processing ? handleProcess : undefined}
          style={{
            cursor: processing ? 'not-allowed' : 'pointer',
            opacity: processing ? 0.6 : 1,
          }}
          title={processing ? 'Se procesează...' : 'Procesează comentariul complet'}
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
      </div>

      <div className="ai-formatting-colors">
        <div className="ai-formatting-colors-label">Alege până la 2 culori pentru theme-ul de evidențiere</div>
        <div className="ai-formatting-colors-grid">
          {COLOR_PALETTE.map((color) => {
            const active = selectedColors.includes(color.value);
            return (
              <button
                key={color.value}
                type="button"
                className={`ai-color-chip ${active ? 'active' : ''} ${darkTheme ? 'dark-theme' : ''}`}
                style={{ backgroundColor: color.value }}
                onClick={() => toggleColor(color.value)}
                title={color.name}
              >
                {active ? '✓' : ''}
              </button>
            );
          })}
        </div>
        <div className="ai-formatting-hint">
          AI-ul va folosi exclusiv aceste culori (prin colorKey) pentru evidențiere, max 2 culori per comentariu.
        </div>
      </div>
    </div>
  );
};

export default AIFullCommentProcessor;


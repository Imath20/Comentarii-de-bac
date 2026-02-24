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

const stripJson = (raw = '') => {
  const trimmed = raw.trim();
  if (trimmed.startsWith('```')) {
    return trimmed.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  }
  return trimmed;
};

const safeParseJson = (raw = '') => {
  const stripped = stripJson(raw);
  // încearcă întâi parse direct
  try {
    return JSON.parse(stripped);
  } catch (_) {
    // caută toate blocurile delimitate de { }
    const matches = stripped.match(/\{[\s\S]*\}/g);
    if (matches && matches.length) {
      // ia cel mai lung bloc
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

const findRange = (baseText, targetText, usedRanges) => {
  const cleanTarget = sanitizeText(targetText);
  if (!cleanTarget) return null;

  const lowerBase = baseText.toLowerCase();
  const lowerTarget = cleanTarget.toLowerCase();
  let startIndex = 0;

  while (startIndex < baseText.length) {
    const found = lowerBase.indexOf(lowerTarget, startIndex);
    if (found === -1) break;
    const end = found + cleanTarget.length;
    const overlaps = usedRanges.some((r) => found < r.end && end > r.start);
    if (!overlaps) {
      usedRanges.push({ start: found, end });
      return { start: found, end };
    }
    startIndex = found + 1;
  }
  return null;
};

const applyAiInstructions = (content, instructions, colorChoices, formatMethod = 'highlight') => {
  if (!Array.isArray(content)) return content;
  return content.map((block, index) => {
    if (block?.type !== 'paragraph' || !block.text) {
      return block;
    }

    const paragraph = instructions.find((p) => p.index === index);
    if (!paragraph) {
      return block;
    }

    const baseText = block.text;
    const highlights = [];
    const underlines = [];
    const formats = (block.formats || []).filter(
      (f) => f.type !== 'bold' && f.type !== 'italic' && f.type !== 'color'
    );

    // Apply only the selected format method
    const usedRanges = [];
    
    if (formatMethod === 'highlight' && paragraph.highlights) {
      (paragraph.highlights || []).forEach((h) => {
        const target = typeof h === 'string' ? h : h?.text;
        const colorKey = typeof h === 'object' && Number.isInteger(h.colorKey) ? h.colorKey : 0;
        const color = colorChoices[colorKey] || colorChoices[0] || '#ffd591';
        const range = findRange(baseText, target, usedRanges);
        if (range) {
          highlights.push({ ...range, color });
        }
      });
    } else if (formatMethod === 'underline' && paragraph.underlines) {
      (paragraph.underlines || []).forEach((u) => {
        const target = typeof u === 'string' ? u : u?.text;
        const colorKey = typeof u === 'object' && Number.isInteger(u.colorKey) ? u.colorKey : 0;
        const color = colorChoices[colorKey] || colorChoices[0] || '#c58a28';
        const range = findRange(baseText, target, usedRanges);
        if (range) {
          underlines.push({ ...range, color });
        }
      });
    } else if (formatMethod === 'textColor' && paragraph.textColors) {
      (paragraph.textColors || []).forEach((tc) => {
        const target = typeof tc === 'string' ? tc : tc?.text;
        const colorKey = typeof tc === 'object' && Number.isInteger(tc.colorKey) ? tc.colorKey : 0;
        const color = colorChoices[colorKey] || colorChoices[0] || '#ffd591';
        const range = findRange(baseText, target, usedRanges);
        if (range) {
          formats.push({ ...range, type: 'color', value: color });
        }
      });
    }

    // Apply bold
    const boldRanges = [];
    (paragraph.bold || []).forEach((txt) => {
      const range = findRange(baseText, txt, boldRanges);
      if (range) {
        formats.push({ ...range, type: 'bold', value: true });
      }
    });

    // Apply italic
    const italicRanges = [];
    (paragraph.italic || []).forEach((txt) => {
      const range = findRange(baseText, txt, italicRanges);
      if (range) {
        formats.push({ ...range, type: 'italic', value: true });
      }
    });

    return {
      ...block,
      highlights: formatMethod === 'highlight' ? highlights : [],
      underlines: formatMethod === 'underline' ? underlines : [],
      formats,
    };
  });
};

export { COLOR_PALETTE, sanitizeText, stripJson, safeParseJson, applyAiInstructions };

const AIComentariuFormatter = ({ content, onApply, darkTheme, onStatus }) => {
  const [selectedColors, setSelectedColors] = useState([COLOR_PALETTE[0].value, COLOR_PALETTE[1].value]);
  const [formatMethod, setFormatMethod] = useState('highlight'); // 'highlight', 'underline', 'textColor'
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
        return prev.filter((c) => c !== value);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), value];
      }
      return [...prev, value];
    });
  };

  const handleRun = async () => {
    if (processing) return;
    if (!Array.isArray(content) || content.length === 0) {
      setFeedback('error', 'Adaugă text înainte să rulezi AI-ul.');
      return;
    }

    const paragraphs = content
      .map((block, index) => ({
        index,
        text: sanitizeText(block?.text || ''),
      }))
      .filter((p) => p.text.length > 0);

    if (!paragraphs.length) {
      setFeedback('error', 'Completează cel puțin un paragraf cu text.');
      return;
    }

    if (!selectedColors.length) {
      setFeedback('error', 'Selectează cel puțin o culoare de highlight (maxim 3).');
      return;
    }

    if (!groqKeys.length) {
      setFeedback('error', 'Setează variabila VITE_GROQ_API_KEY în .env.local.');
      return;
    }

    const colorGuide = selectedColors.map((c, idx) => `[${idx}] ${c}`).join(', ');
    const formatMethodName = formatMethod === 'highlight' ? 'highlight' : formatMethod === 'underline' ? 'underline' : 'textColor';
    
    const prompt = `Marchează fragmente esențiale din comentariu literar folosind formatare LOGICĂ și CONSISTENTĂ.

Paragrafe:
${paragraphs.map((p) => `[${p.index}] ${p.text}`).join('\n\n')}

Culori disponibile: ${colorGuide}
Metodă de formatare: ${formatMethodName}

⚠️⚠️⚠️ REGULI ABSOLUTE - VIOLAREA LOR INVALIDEZĂ FORMATAREA ⚠️⚠️⚠️

OBLIGATORIU:
- Folosește EXCLUSIV metoda "${formatMethodName}" pentru evidențiere
- NU amesteca highlight cu underline sau textColor
- Dacă folosești ${formatMethodName}, folosește-l PESTE TOT, nu combina cu alte metode de evidențiere
- Folosește fragmente EXACTE din text (fără reformulări)
- Max 8-12 ${formatMethodName}/paragraf (folosește toate cele ${selectedColors.length} culori disponibile pentru varietate)
- Max 5-8 bold/paragraf (pentru termeni/concepte cheie)
- Max 3-5 italic/paragraf (pentru citate sau fragmente speciale)
- Distribuie culorile logic: folosește aceeași culoare pentru fragmente legate tematic

INTERZIS ABSOLUT:
❌ Să folosești highlight ȘI underline în același comentariu
❌ Să folosești highlight ȘI textColor în același comentariu
❌ Să folosești underline ȘI textColor în același comentariu
❌ Să amesteci metodele de evidențiere - O SINGURĂ metodă per comentariu!

Prioritizează pentru evidențiere:
- Teme principale și idei centrale
- Simboluri literare importante
- Imagini poetice și metafore
- Tehnici literare (figuri de stil, procedee artistice)
- Concepte cheie și termeni esențiali
- Caracterizări și descrieri relevante

Format JSON:
- ${formatMethodName}: [{"text":"fragment exact","colorKey":0}, ...] ${formatMethodName === 'textColor' ? '(folosește "textColors" ca cheie în JSON)' : ''}
- bold: ["fragment", "fragment"]
- italic: ["fragment", "fragment"]

Returnează DOAR JSON:
{
  "formatMethod": "${formatMethodName}",
  "paragraphs": [
    { "index": 0, "${formatMethodName === 'textColor' ? 'textColors' : formatMethodName}": [], "bold": [], "italic": [] }
  ]
}`.trim();

    const body = {
      model: 'openai/gpt-oss-120b',
      messages: [
        {
          role: 'system',
          content: 'Răspunde DOAR cu JSON valid în câmpul content. Nu folosi reasoning. Nu adăuga text, explicații sau ```. Răspunsul trebuie să fie direct JSON valid.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 2500,
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

        // fallback: dacă content e gol, încearcă reasoning ca JSON
        let effectiveContent = rawContent;
        if (!effectiveContent.trim()) {
          const reasoning = data?.choices?.[0]?.message?.reasoning;
          console.warn('AI reasoning (debug):', reasoning);
          if (reasoning && typeof reasoning === 'string') {
            effectiveContent = reasoning;
          }
        }

        // fallback: încercăm să extragem primul bloc JSON din reasoning dacă există
        if (!effectiveContent.trim()) {
          const reasoning = data?.choices?.[0]?.message?.reasoning;
          if (reasoning && typeof reasoning === 'string') {
            const candidate = reasoning.match(/\{[\s\S]*\}/);
            if (candidate && candidate[0]) {
              effectiveContent = candidate[0];
              console.warn('AI reasoning extracted JSON (debug):', effectiveContent);
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
        // Use formatMethod from response or fallback to selected formatMethod
        const responseFormatMethod = parsed.formatMethod || formatMethod;
        const updated = applyAiInstructions(content, parsed.paragraphs, selectedColors, responseFormatMethod);
        onApply(updated);
        setFeedback('success', 'Formatarea AI a fost aplicată.');
        setProcessing(false);
        setTimeout(() => setCubeSpinning(false), 800);
        return;
      } catch (err) {
        lastError = err?.message || 'Eroare necunoscută';
      }
    }

    setFeedback('error', `Nu am putut genera formatarea. ${lastError || ''}`);
    setProcessing(false);
    setTimeout(() => setCubeSpinning(false), 800);
  };

  return (
    <div className={`ai-formatting-card ${darkTheme ? 'dark-theme' : ''}`}>
      <div className="ai-formatting-top">
        <div className="ai-formatting-info">
          <div className="ai-formatting-title">Formatează automat cu AI</div>
          <div className="ai-formatting-subtitle">
            Alege până la 3 culori de highlight, iar AI-ul va pune highlight, underline, bold și italic pe toate paragrafele.
          </div>
        </div>
        <div
          className={`ai-cube-wrapper ${cubeSpinning ? 'spinning' : ''} ${processing ? 'processing' : ''}`}
          onClick={!processing ? handleRun : undefined}
          style={{
            cursor: processing ? 'not-allowed' : 'pointer',
            opacity: processing ? 0.6 : 1,
          }}
          title={processing ? 'Se generează...' : 'Aplică formatarea AI pe toate paragrafele'}
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
        <div className="ai-formatting-colors-label">Metodă de formatare</div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`ai-format-method-btn ${formatMethod === 'highlight' ? 'active' : ''} ${darkTheme ? 'dark-theme' : ''}`}
            onClick={() => setFormatMethod('highlight')}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: `2px solid ${formatMethod === 'highlight' ? (darkTheme ? '#a97c50' : '#ffd591') : (darkTheme ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)')}`,
              backgroundColor: formatMethod === 'highlight' ? (darkTheme ? 'rgba(169, 124, 80, 0.2)' : 'rgba(255, 213, 145, 0.2)') : 'transparent',
              color: darkTheme ? '#e0d5c4' : '#333',
              cursor: 'pointer',
            }}
          >
            Highlight
          </button>
          <button
            type="button"
            className={`ai-format-method-btn ${formatMethod === 'underline' ? 'active' : ''} ${darkTheme ? 'dark-theme' : ''}`}
            onClick={() => setFormatMethod('underline')}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: `2px solid ${formatMethod === 'underline' ? (darkTheme ? '#a97c50' : '#ffd591') : (darkTheme ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)')}`,
              backgroundColor: formatMethod === 'underline' ? (darkTheme ? 'rgba(169, 124, 80, 0.2)' : 'rgba(255, 213, 145, 0.2)') : 'transparent',
              color: darkTheme ? '#e0d5c4' : '#333',
              cursor: 'pointer',
            }}
          >
            Underline
          </button>
          <button
            type="button"
            className={`ai-format-method-btn ${formatMethod === 'textColor' ? 'active' : ''} ${darkTheme ? 'dark-theme' : ''}`}
            onClick={() => setFormatMethod('textColor')}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: `2px solid ${formatMethod === 'textColor' ? (darkTheme ? '#a97c50' : '#ffd591') : (darkTheme ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)')}`,
              backgroundColor: formatMethod === 'textColor' ? (darkTheme ? 'rgba(169, 124, 80, 0.2)' : 'rgba(255, 213, 145, 0.2)') : 'transparent',
              color: darkTheme ? '#e0d5c4' : '#333',
              cursor: 'pointer',
            }}
          >
            Culoare text
          </button>
        </div>
        <div className="ai-formatting-colors-label">Alege până la 3 culori pentru {formatMethod === 'highlight' ? 'highlight' : formatMethod === 'underline' ? 'underline' : 'culoare text'}</div>
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
          AI-ul va folosi EXCLUSIV metoda "{formatMethod}" pentru formatare. Culorile sunt trimise către AI ca index colorKey în ordinea selectată. Dacă alegi mai mult de 3, prima selecție va fi înlocuită.
        </div>
      </div>
    </div>
  );
};

export default AIComentariuFormatter;


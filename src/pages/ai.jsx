import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../assets/Layout';
import '../styles/style.scss';
import '../styles/ai.scss';
import AICommentsFromImages from '../components/AICommentsFromImages';

// Minimal, safe Markdown -> HTML converter (headings, lists, bold/italic, code, links)
const escapeHtml = (str) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const markdownToHtml = (md) => {
  if (!md || typeof md !== 'string') return '';
  let text = md.replace(/\r\n?/g, '\n');

  // Inject totals based on known rubric maxima by matching each line
  const RUBRIC_MAXIMA = [
    // Conținut (ex: poezie/eseu) – câte 6 puncte
    { pattern: /eviden[tț]ierea\s+a\s+dou[aă]\s+tr[ăa]s[ăa]turi/i, max: 6 },
    { pattern: /comentarea\s+a\s+dou[aă]\s+imagini|idei\s+poetice/i, max: 6 },
    { pattern: /analiza\s+a\s+dou[aă]\s+elemente\s+de\s+compozi[tț]ie|limbaj/i, max: 6 },

    // Redactare
    { pattern: /existen[tț]a\s+p[ăa]r[tț]ilor\s+componente/i, max: 1 },
    { pattern: /logica\s+înl[ăa]n[tț]uirii\s+ideilor/i, max: 2 },
    { pattern: /abilit[ăa][tț]i\s+de\s+analiz[ăa]\s+și\s+de\s+argumentare/i, max: 2 },
    { pattern: /utilizarea\s+limbii\s+literare/i, max: 2 },
    { pattern: /ortografia/i, max: 2 },
    { pattern: /punctua[tț]ia/i, max: 2 },
    { pattern: /a[sș]ezarea\s+în\s+pagin[ăa].*lizibilitatea/i, max: 1 },
  ];

  const annotateLine = (line) => {
    // Numbered feedback items: convert (n puncte) -> (n/n puncte) if not already x/y
    if (/^\s*\d+\.\s/.test(line) && !/\d\s*\/\s*\d/.test(line)) {
      let updatedNumbered = line
        .replace(/\(((?:\d+(?:[.,]\d+)?))\s*puncte?\)/i, (_, n) => `(${n}/${n} puncte)`)
        .replace(/\(((?:\d+(?:[.,]\d+)?))\s*punct\)/i, (_, n) => `(${n}/${n} punct)`);
      return updatedNumbered;
    }

    const found = RUBRIC_MAXIMA.find((r) => r.pattern.test(line));
    if (!found) return line;
    const max = found.max;
    // Already formatted x/y?
    if (/\d\s*\/\s*\d/.test(line)) return line;

    // Replace parenthetical values
    let updated = line
      .replace(/\(((?:\d+(?:[.,]\d+)?))\s*puncte?\)/gi, (_, n) => `(${n}/${max} puncte)`)
      .replace(/\(((?:\d+(?:[.,]\d+)?))\s*punct\)/gi, (_, n) => `(${n}/${max} punct)`);

    // Replace trailing values after separators – - :
    updated = updated
      .replace(/([\-–:])\s*(\d+(?:[.,]\d+)?)(?!\s*\/)\s*puncte\b/gi, (_, sep, n) => `${sep} ${n}/${max} puncte`)
      .replace(/([\-–:])\s*(\d+(?:[.,]\d+)?)(?!\s*\/)\s*punct\b/gi, (_, sep, n) => `${sep} ${n}/${max} punct`);

    return updated;
  };

  text = text
    .split('\n')
    .map(annotateLine)
    .join('\n');

  // Handle fenced code blocks ```lang\n...\n```
  text = text.replace(/```([\s\S]*?)```/g, (m, code) => {
    return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
  });

  // Split into blocks by two or more newlines, but keep ordered lists contiguous
  const blocks = text.split(/\n{2,}(?!\d+\.\s)/);
  const htmlBlocks = blocks.map((block) => {
    const lines = block.split('\n');

    // Headings
    if (/^#{1,6}\s/.test(block)) {
      return block
        .split('\n')
        .map((line) => {
          const m = line.match(/^(#{1,6})\s+(.*)$/);
          if (!m) return '';
          const level = m[1].length;
          const content = m[2];
          return `<h${level}>${inlineMd(content)}</h${level}>`;
        })
        .join('');
    }

    // Unordered lists (allow empty lines between items)
    if (lines.filter((l) => l.trim() !== '').every((l) => /^\s*[-*]\s+/.test(l))) {
      const items = lines
        .filter((l) => l.trim() !== '')
        .map((l) => l.replace(/^\s*[-*]\s+/, ''))
        .map((content) => `<li>${inlineMd(content)}</li>`) 
        .join('');
      return `<ul>${items}</ul>`;
    }

    // Ordered lists (allow empty lines between items)
    const nonEmpty = lines.filter((l) => l.trim() !== '');
    if (nonEmpty.length > 0 && nonEmpty.every((l) => /^\s*\d+\.\s+/.test(l))) {
      const items = nonEmpty
        .map((l) => l.replace(/^\s*\d+\.\s+/, ''))
        .map((content) => `<li>${inlineMd(content)}</li>`)
        .join('');
      return `<ol>${items}</ol>`;
    }

    // Fallback paragraph (preserve single newlines with <br>)
    return `<p>${inlineMd(lines.join('\\n')).replace(/\n/g, '<br/>')}</p>`;
  });

  return htmlBlocks.join('\n');
};

const inlineMd = (s) => {
  let t = escapeHtml(s);
  // Links [text](url)
  t = t.replace(/\[([^\]]+)\]\((https?:[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1<\/a>');
  // Bold **text**
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1<\/strong>');
  // Underline ++text++ (custom safe syntax)
  t = t.replace(/\+\+([^+]+)\+\+/g, '<u>$1<\/u>');
  // Italic _text_ or *text*
  t = t.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, '$1<em>$2<\/em>');
  t = t.replace(/(^|[^_])_([^_]+)_(?!_)/g, '$1<em>$2<\/em>');
  // Inline code `code`
  t = t.replace(/`([^`]+)`/g, '<code>$1<\/code>');
  return t;
};

export default function AI() {
  const location = useLocation();
  const imageInputRef = useRef(null);
  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [inputType, setInputType] = useState('text');
  const [aiMode, setAiMode] = useState('evaluator'); // 'evaluator' | 'commentsFromImages'
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    solution: '',
    rubric: ''
  });
  const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
  const groqApiKeyBackup = import.meta.env.VITE_GROQ_API_KEY_1;
  const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
  const groqApiKeys = useMemo(() => {
    return [groqApiKey, groqApiKeyBackup].filter((k) => k && k !== 'undefined');
  }, [groqApiKey, groqApiKeyBackup]);
  const groqAvailable = useMemo(() => groqApiKeys.length > 0 && !!groqApiUrl, [groqApiKeys, groqApiUrl]);

  // Derive score from breakdown text like "(6/6)" occurrences
  const deriveScoreFromText = (text) => {
    if (!text || typeof text !== 'string') return null;
    let sum = 0;
    const regex = /\((\d+)\s*\/\s*(\d+)\)/g;
    let match = null;
    while ((match = regex.exec(text)) !== null) {
      const obtained = parseInt(match[1], 10);
      if (!Number.isNaN(obtained)) sum += obtained;
    }
    if (sum === 0) return null;
    // Clamp to 0..30 (BAC total)
    return Math.max(0, Math.min(30, sum));
  };

  const coerceScore = (result) => {
    if (!result) return result;

    // Prioritizează score-ul direct din JSON
    if (typeof result.score === 'number' && !isNaN(result.score)) {
      const clamped = Math.max(0, Math.min(30, Math.round(result.score)));
      if (result.score !== clamped) {
        return { ...result, score: clamped };
      }
      return result;
    }
    
    // Dacă nu există score direct, încearcă să-l calculeze din scoreBreakdown
    if (Array.isArray(result.scoreBreakdown) && result.scoreBreakdown.length > 0) {
      const sum = result.scoreBreakdown
        .map((v) => (typeof v === 'number' ? v : Number.parseFloat(v)))
        .filter((n) => Number.isFinite(n))
        .reduce((a, b) => a + b, 0);
      if (Number.isFinite(sum) && sum >= 0) {
        const clamped = Math.max(0, Math.min(30, Math.round(sum)));
        return { ...result, score: clamped };
      }
    }
    
    // Ultimul fallback: încearcă să extragă din feedback
    const fromFeedback = deriveScoreFromText(result.feedback);
    if (fromFeedback != null) {
      return { ...result, score: fromFeedback };
    }
    
    // Dacă nu există niciun score, setează la 0
    if (result.score === undefined || result.score === null) {
      return { ...result, score: 0 };
    }
    
    return result;
  };

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkTheme);
    localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prefill via navigation state (from SubiectModal "Verifică cu AI")
  useEffect(() => {
    const prefill = location && location.state && location.state.prefill ? location.state.prefill : null;
    if (!prefill) return;

    if (prefill.inputType) {
      setInputType(prefill.inputType);
    }

    setFormData(prev => ({
      ...prev,
      rubric: prefill.rubric || prev.rubric,
    }));
  }, [location]);

  const handleInputTypeChange = (newType) => {
    if (newType === inputType || isTransitioning) return;

    // If we switch back to text, avoid showing the base64 image string
    if (newType === 'text' && formData.solution?.startsWith('data:image')) {
      setFormData(prev => ({ ...prev, solution: '' }));
      setImagePreview(null);
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
    }

    setIsTransitioning(true);
    
    // Add slide-out animation
    const currentElement = document.querySelector(`.ai-field-textarea, .ai-image-upload`);
    if (currentElement) {
      currentElement.classList.add('slide-out');
    }
    
    // Wait for slide-out animation, then change type and slide-in
    setTimeout(() => {
      setInputType(newType);
      
      setTimeout(() => {
        const newElement = document.querySelector(`.ai-field-textarea, .ai-image-upload`);
        if (newElement) {
          newElement.classList.add('slide-in');
        }
        
        setTimeout(() => {
          setIsTransitioning(false);
          // Remove animation classes
          const elements = document.querySelectorAll('.ai-field-textarea, .ai-image-upload');
          elements.forEach(el => {
            el.classList.remove('slide-out', 'slide-in');
          });
        }, 400);
      }, 50);
    }, 400);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const buildGroqMessages = ({ rubric, solution, type }) => {
    const commonText = [
      'Ești evaluator de lucrări pentru examenul de Bacalaureat la limba și literatura română.',
      'Evaluează strict după barem, calculează punctajul (max 30), oferă feedback detaliat pe criterii și sugestii de îmbunătățire.',
      'Răspuns strict JSON (fără ``` sau text în afara JSON), structura exactă: { "score": number între 0 și 30, "feedback": "markdown scurt cu criterii și puncte x/y", "suggestions": "markdown scurt cu recomandări", "scoreBreakdown": [numere opțional] }.'
    ].join('\n');

    const userText = `Barem de corectare:\n${rubric}\n\nEvaluează lucrarea de mai jos și calculează punctajul.`;

    if (type === 'image') {
      return [
        { role: 'system', content: commonText },
        {
          role: 'user',
          content: [
            { type: 'text', text: userText },
            { type: 'image_url', image_url: { url: solution } }
          ]
        }
      ];
    }

    return [
      { role: 'system', content: commonText },
      {
        role: 'user',
        content: `${userText}\n\nLucrare:\n${solution}`
      }
    ];
  };

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

  const parseGroqContent = (content) => {
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
          console.warn('Nu s-a putut parsa obiectul JSON extras', err);
        }
      }
    }
    return null;
  };

  const evaluateWithGroq = async () => {
    if (!groqAvailable) {
      setEvaluation({
        error: 'Setează variabilele VITE_GROQ_API_KEY (și opțional VITE_GROQ_API_KEY_1) pentru a folosi Groq.'
      });
      return;
    }

    const messages = buildGroqMessages({
      rubric: formData.rubric,
      solution: formData.solution,
      type: inputType
    });

    // Current Groq-recommended models (text + vision) with fallbacks
    const modelCandidates =
      inputType === 'image'
        ? ['moonshotai/kimi-k2-instruct-0905','llama-3.2-11b-vision-preview', 'llama-3.2-90b-vision-preview', 'llava-v1.5-7b-4096-preview']
        : ['llama-3.2-90b-text-preview', 'llama-3.2-11b-text-preview', 'llama-3.2-3b-preview', 'llama-3.1-8b-instant'];

    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    for (const model of modelCandidates) {
      for (const key of groqApiKeys) {
        let attempts = 0;
        while (attempts < 3) {
          attempts += 1;
          try {
            const response = await fetch(groqApiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${key}`
              },
              body: JSON.stringify({
                model,
                messages,
                temperature: 0.4,
                max_tokens: 700,
                response_format: { type: 'json_object' }
              })
            });

            const rawText = await response.text().catch(() => '');

            if (!response.ok) {
              console.warn(`Groq fallback (model=${model}, attempt=${attempts})`, response.status, rawText);
              if (response.status === 400 && rawText.includes('decommissioned')) {
                break; // treci la următorul model
              }
              if (response.status === 429) {
                const retryMatch = rawText.match(/try again in ([\d.]+)s/i);
                const retryMs = retryMatch ? Math.ceil(parseFloat(retryMatch[1]) * 1000) : 2000;
                await wait(retryMs);
                continue; // reîncearcă același model+cheie
              }
              // dacă json_validate_failed, încearcă următorul attempt cu același model
              if (rawText.includes('json_validate_failed') || rawText.includes('Failed to generate JSON')) {
                continue;
              }
              break;
            }

            let data = null;
            try {
              data = rawText ? JSON.parse(rawText) : null;
            } catch (_) {
              console.warn('Groq: nu am putut parsa json-ul brut', rawText);
            }

            const content = data?.choices?.[0]?.message?.content?.trim();
            if (!content) {
              console.warn('Groq a răspuns fără conținut', data);
              break;
            }

            const parsed = parseGroqContent(content);
            if (parsed && typeof parsed === 'object') {
              const result = {
                score: parsed.score,
                scoreBreakdown: parsed.scoreBreakdown,
                feedback: parsed.feedback || parsed.analysis || '',
                suggestions: parsed.suggestions || parsed.improvements || ''
              };
              setEvaluation(coerceScore(result));
              return;
            }

            // fallback: tratează conținutul ca feedback liber (după decodare)
            setEvaluation(
              coerceScore({
                feedback: decodeHtmlEntities(content),
                suggestions: ''
              })
            );
            return;
          } catch (err) {
            console.warn(`Groq key fallback exception (model=${model}, attempt=${attempts})`, err);
            await wait(500);
            continue;
          }
        }
      }
    }

    setEvaluation({
      error: 'Nu s-a putut obține un răspuns de la Groq. Încearcă din nou.'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.solution.trim() || !formData.rubric.trim()) {
      return;
    }
    
    setIsLoading(true);
    setEvaluation(null);

    try {
      await evaluateWithGroq();
    } finally {
      setIsLoading(false);
    }
  };

  const resetImageUpload = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, solution: '' }));
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type && file.type.startsWith('image/');
    if (field === 'solution' && !isImage) {
      alert('Te rog încarcă o imagine (JPG, PNG, WEBP).');
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.result
      }));

      if (field === 'solution' && isImage) {
        setImagePreview({
          url: event.target.result,
          name: file.name
        });
      }
    };

    if (isImage) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  };

  return (
    <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled}>
      
      <div className="page-hero">
        <h1 className="page-title">
          {'Evaluator Lucrări AI'.split(' ').map((word, wi) => (
            <span className="page-title-word" key={wi}>
              {word.split('').map((l, i) => <span key={i}>{l}</span>)}
            </span>
          ))}
        </h1>
        <p className="page-desc">Introduceți rezolvarea și baremul pentru a primi un punctaj estimativ, feedback și sfaturi de îmbunătățire</p>
      </div>

      <div className="container">
        <div className="ai-container">
          {/* Mode Selector */}
          <div className={`ai-main-section ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
            <div className="ai-header">
              <h2 className="ai-main-title">Evaluator Lucrări AI</h2>
              <p className="ai-subtitle">Introduceți rezolvarea și baremul pentru a primi un punctaj estimativ, feedback și sfaturi de îmbunătățire</p>
              
            </div>

            <div className="ai-input-type-selector" style={{ marginBottom: 14 }}>
              <button
                type="button"
                onClick={() => setAiMode('evaluator')}
                className={`ai-type-tab ${darkTheme ? 'dark-theme' : ''} ${aiMode === 'evaluator' ? 'active' : ''}`}
              >
                Evaluator lucrări
              </button>
              <button
                type="button"
                onClick={() => setAiMode('commentsFromImages')}
                className={`ai-type-tab ${darkTheme ? 'dark-theme' : ''} ${aiMode === 'commentsFromImages' ? 'active' : ''}`}
              >
                Comentarii din poze
              </button>
            </div>
            
            {aiMode === 'evaluator' && (
            <form onSubmit={handleSubmit} className="ai-form">
              {/* Input Type Selector */}
              <div className="ai-input-type-selector">
                <button
                  type="button"
                  onClick={() => handleInputTypeChange('text')}
                  className={`ai-type-tab ${darkTheme ? 'dark-theme' : ''} ${inputType === 'text' ? 'active' : ''}`}
                  disabled={isTransitioning}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                  Text
                </button>
                <button
                  type="button"
                  onClick={() => handleInputTypeChange('image')}
                  className={`ai-type-tab ${darkTheme ? 'dark-theme' : ''} ${inputType === 'image' ? 'active' : ''}`}
                  disabled={isTransitioning}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7,10 12,15 17,10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Imagine
                </button>
              </div>

              {/* Solution Input */}
              <div className="ai-form-group">
                <label className="ai-field-label">
                  Rezolvarea ta {inputType === 'text' ? '(text)' : '(imagine)'}
                </label>
                <div className="ai-input-container">
                  {inputType === 'text' ? (
                    <textarea
                      name="solution"
                      value={formData.solution}
                      onChange={handleInputChange}
                      placeholder="Scrie sau lipește aici textul rezolvării tale..."
                      className={`ai-field-textarea ${darkTheme ? 'dark-theme' : ''}`}
                      rows="12"
                      required
                    />
                  ) : (
                    <div className="ai-image-upload">
                      {imagePreview ? (
                        <div className="ai-image-preview">
                          <img src={imagePreview.url} alt="Rezolvare încărcată" />
                          <div className="ai-image-actions">
                            <div className="ai-image-meta">
                              <span className="ai-image-name">{imagePreview.name || 'Imagine încărcată'}</span>
                            </div>
                            <div className="ai-image-buttons">
                              <label htmlFor="solution-image" className="ai-change-image">
                                Schimbă imaginea
                              </label>
                              <button type="button" className="ai-remove-image" onClick={resetImageUpload}>
                                Șterge
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <label htmlFor="solution-image" className={`ai-image-label ${darkTheme ? 'dark-theme' : ''}`}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7,10 12,15 17,10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                          </svg>
                          Încarcă imaginea rezolvării
                        </label>
                      )}
                      <input
                        type="file"
                        id="solution-image"
                        accept="image/*"
                        className="ai-file-input"
                        ref={imageInputRef}
                        onChange={(e) => handleFileUpload(e, 'solution')}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Rubric Input */}
              <div className="ai-form-group">
                <label className="ai-field-label">
                  Barem de corectare
                </label>
                <div className="ai-input-container">
                  <textarea
                    name="rubric"
                    value={formData.rubric}
                    onChange={handleInputChange}
                    placeholder="Lipește aici baremul oficial..."
                    className={`ai-field-textarea ${darkTheme ? 'dark-theme' : ''}`}
                    rows="8"
                    required
                  />
                </div>
                <p className="ai-field-description">
                  Introduceți baremul complet pentru o evaluare cât mai corectă.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !formData.solution.trim() || !formData.rubric.trim() || isTransitioning}
                className={`ai-submit-btn ${darkTheme ? 'dark-theme' : ''} ${isLoading ? 'loading' : ''}`}
              >
                {isLoading ? (
                  <>
                    <div className="ai-loading-spinner"></div>
                    <span>Se evaluează...</span>
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13"/>
                      <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                    </svg>
                    <span>Evaluează Lucrarea</span>
                  </>
                )}
              </button>
            </form>
            )}
          </div>

          {/* Results Section */}
          {aiMode === 'evaluator' && evaluation && (
            <div className={`ai-results-section ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
              <div className="ai-results-header">
                <h2 className="ai-results-title">Rezultatele evaluării</h2>
                <div className="ai-results-icon">✨</div>
              </div>
              
              {evaluation.error ? (
                <div className="ai-error">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  {evaluation.error}
                </div>
              ) : (
                <div className="ai-evaluation-results">
                  {evaluation.score && (
                    <div className="ai-score-section">
                      <div className="ai-score-header">
                        <h3 className="ai-score-title">Punctaj obținut</h3>
                        <div className="ai-score-badge">Evaluat</div>
                      </div>
                      <div className="ai-score-display">
                        <span className="ai-score-number">{evaluation.score}</span>
                        <span className="ai-score-max">/ 30</span>
                      </div>
                      <div className="ai-score-bar">
                        <div 
                          className="ai-score-progress" 
                          style={{ width: `${(evaluation.score / 30) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {evaluation.feedback && (
                    <div className="ai-feedback-section">
                      <div className="ai-section-header">
                        <h3 className="ai-feedback-title">Feedback detaliat</h3>
                        <div className="ai-section-icon">💡</div>
                      </div>
                      <div className="ai-feedback-content" dangerouslySetInnerHTML={{ __html: markdownToHtml(evaluation.feedback) }} />
                    </div>
                  )}
                  
                  {evaluation.suggestions && (
                    <div className="ai-suggestions-section">
                      <div className="ai-section-header">
                        <h3 className="ai-suggestions-title">Sugestii de îmbunătățire</h3>
                        <div className="ai-section-icon">🚀</div>
                      </div>
                      <div className="ai-suggestions-content" dangerouslySetInnerHTML={{ __html: markdownToHtml(evaluation.suggestions) }} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {aiMode === 'commentsFromImages' && (
            <AICommentsFromImages darkTheme={darkTheme} markdownToHtml={markdownToHtml} />
          )}
        </div>
      </div>

    </Layout>
  );
}

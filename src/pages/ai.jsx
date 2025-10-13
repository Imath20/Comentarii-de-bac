import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../assets/Layout';
import '../styles/style.scss';
import '../styles/ai.scss';

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
  // Italic _text_ or *text*
  t = t.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, '$1<em>$2<\/em>');
  t = t.replace(/(^|[^_])_([^_]+)_(?!_)/g, '$1<em>$2<\/em>');
  // Inline code `code`
  t = t.replace(/`([^`]+)`/g, '<code>$1<\/code>');
  return t;
};

export default function AI() {
  const location = useLocation();
  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [inputType, setInputType] = useState('text');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    solution: '',
    rubric: ''
  });

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
    const candidates = [];
    if (typeof result.score === 'number') candidates.push(result.score);
    if (Array.isArray(result.scoreBreakdown)) {
      const sum = result.scoreBreakdown
        .map((v) => (typeof v === 'number' ? v : Number.parseFloat(v)))
        .filter((n) => Number.isFinite(n))
        .reduce((a, b) => a + b, 0);
      if (Number.isFinite(sum) && sum > 0) candidates.push(sum);
    }
    const fromFeedback = deriveScoreFromText(result.feedback);
    if (fromFeedback != null) candidates.push(fromFeedback);
    const best = candidates.length ? Math.max(...candidates) : null;
    if (best == null) return result;
    const clamped = Math.max(0, Math.min(30, Math.round(best)));
    // Only override if different to avoid unnecessary rerenders
    if (result.score !== clamped) {
      return { ...result, score: clamped };
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.solution.trim() || !formData.rubric.trim()) {
      return;
    }
    
    setIsLoading(true);
    setEvaluation(null);

    try {
      console.log('Sending request to Next.js Server Action...');
      
      // Create the exact API endpoint needed
      const apiEndpoint = 'https://romana-ai.vercel.app/api/evaluate';
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          solution: formData.solution,
          rubric: formData.rubric,
          inputType: inputType
        }),
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        console.log('Response content type:', contentType);
        
        if (contentType && contentType.includes('application/json')) {
          const result = await response.json();
          setEvaluation(coerceScore(result));
        } else {
          // If response is HTML, it might be an error page
          const text = await response.text();
          console.log('Response text:', text);
          throw new Error(`Server returned HTML instead of JSON. Status: ${response.status}`);
        }
      } else {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      
      // If CORS error, try with CORS proxy
      if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
        try {
          console.log('Trying with CORS proxy...');
          
          // Try different CORS proxy services
          const proxyServices = [
            `https://cors-anywhere.herokuapp.com/https://romana-ai.vercel.app/`,
            `https://thingproxy.freeboard.io/fetch/https://romana-ai.vercel.app/`,
            `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent('https://romana-ai.vercel.app/')}`
          ];

          let proxyResponse = null;
          for (const proxyUrl of proxyServices) {
            try {
              console.log(`Trying proxy: ${proxyUrl}`);
              proxyResponse = await fetch(proxyUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({
                  solution: formData.solution,
                  rubric: formData.rubric,
                  inputType: inputType,
                  headers: {
                    'next-action': 'evaluate'
                  }
                }),
              });

              if (proxyResponse.ok) {
                break;
              }
            } catch (proxyError) {
              console.error(`Proxy ${proxyUrl} failed:`, proxyError);
              continue;
            }
          }

          if (proxyResponse.ok) {
            const result = await proxyResponse.json();
            setEvaluation(coerceScore(result));
            return;
          }
        } catch (proxyError) {
          console.error('CORS proxy also failed:', proxyError);
        }

        setEvaluation({
          error: `Eroare CORS: Header-ul "next-action" nu este permis.

SOLUȚIA SIMPLĂ:
Pe serverul AI (romana-ai.vercel.app), în configurația CORS, adaugă "next-action" în lista de header-uri permise:

Access-Control-Allow-Headers: X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, next-action

Sau în Next.js, în middleware.ts sau vercel.json:
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Headers",
          "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, next-action"
        }
      ]
    }
  ]
}

Aplicația ta este configurată corect - doar serverul AI trebuie să permită header-ul "next-action".`
        });
      } else if (error.message.includes('405')) {
        setEvaluation({
          error: `Eroare 405: Endpoint-ul /api/evaluate nu există încă.

SOLUȚIA:
Pe serverul AI (romana-ai.vercel.app), trebuie să creezi endpoint-ul /api/evaluate.

Pentru Next.js App Router, creează fișierul:
📁 app/api/evaluate/route.ts

Codul necesar:
- import { NextRequest, NextResponse } from 'next/server';
- export async function POST(request: NextRequest)
- Procesează datele cu Google Gemini
- Returnează rezultatul cu NextResponse.json()

Aplicația ta este gata - doar trebuie să creezi endpoint-ul!`
        });
      } else if (error.message.includes('500')) {
        setEvaluation({
          error: `Eroare 500: Eroare internă pe server.

Problema: Serverul AI primește cererea, dar are o problemă la procesarea ei.

Soluții posibile:
1. Verificați logurile serverului AI pentru erori
2. Verificați că Google Gemini API este configurat corect
3. Verificați că datele trimise sunt în formatul corect

Pentru dezvoltatori: Verificați logurile serverului și configurația Google Gemini API.`
        });
      } else {
        setEvaluation({
          error: `Nu s-a putut conecta la serverul AI.

Erori întâlnite:
- ${error.message}

Soluții:
1. Verificați că serverul AI este online la https://romana-ai.vercel.app/
2. Contactați dezvoltatorii pentru a confirma endpoint-ul corect
3. Verificați documentația API-ului

Pentru dezvoltatori: Verificați configurația serverului AI.`
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          [field]: event.target.result
        }));
      };
      if (file.type && file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
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
          {/* Main Form Section */}
          <div className={`ai-main-section ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
            <div className="ai-header">
              <h2 className="ai-main-title">Evaluator Lucrări AI</h2>
              <p className="ai-subtitle">Introduceți rezolvarea și baremul pentru a primi un punctaj estimativ, feedback și sfaturi de îmbunătățire</p>
              
            </div>
            
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
                      <label htmlFor="solution-image" className={`ai-image-label ${darkTheme ? 'dark-theme' : ''}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="7,10 12,15 17,10"/>
                          <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Încarcă imaginea rezolvării
                      </label>
                      <input
                        type="file"
                        id="solution-image"
                        accept="image/*"
                        className="ai-file-input"
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
          </div>

          {/* Results Section */}
          {evaluation && (
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
        </div>
      </div>

    </Layout>
  );
}

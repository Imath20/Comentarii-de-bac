import React, { useState, useMemo, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../firebase/AuthContext';
import { addComentariu } from '../firebase/comentariiService';
import { COLOR_PALETTE, sanitizeText, stripJson, safeParseJson, applyAiInstructions } from './AIComentariuFormatter';
import '../styles/addToComentariiModal.scss';

const CATEGORII = [
  { id: 'poezie', nume: 'Poezie' },
  { id: 'roman', nume: 'Roman' },
  { id: 'comedie', nume: 'Comedie' },
  { id: 'basm', nume: 'Basm' },
  { id: 'nuvela', nume: 'Nuvelă' },
  { id: 'critica', nume: 'Critică literară' },
  { id: 'memorii', nume: 'Memorii' },
  { id: 'poveste', nume: 'Poveste' },
  { id: 'schita', nume: 'Schiţă' },
];

const PLAN_OPTIONS = [
  { value: 'free', label: 'Gratis' },
  { value: 'pro', label: 'Pro' },
  { value: 'premium', label: 'Premium' },
];

const TIP_OPTIONS = [
  { value: 'general', label: 'Comentariu general' },
  { value: 'tema-viziune', label: 'Tema și viziunea' },
  { value: 'caracterizare-personaj', label: 'Caracterizarea personajului' },
  { value: 'relatie-doua-personaje', label: 'Relația dintre personaje' },
];

function textToContentBlocks(text) {
  if (!text || typeof text !== 'string') return [];
  const paragraphs = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  if (paragraphs.length === 0 && text.trim()) return [{ type: 'paragraph', text: text.trim() }];
  return paragraphs.map((t) => ({ type: 'paragraph', text: t }));
}

export default function AddToComentariiModal({ comment, isOpen, onClose, darkTheme, onSuccess }) {
  const { currentUser, userProfile } = useAuth();
  const [titlu, setTitlu] = useState('');
  const [descriere, setDescriere] = useState('');
  const [autor, setAutor] = useState('');
  const [plan, setPlan] = useState('free');
  const [categorie, setCategorie] = useState('poezie');
  const [tip, setTip] = useState('general');
  const [formatBold, setFormatBold] = useState(true);
  const [formatItalic, setFormatItalic] = useState(true);
  const [formatHighlight, setFormatHighlight] = useState(true);
  const [formatUnderline, setFormatUnderline] = useState(false);
  const [formatTextColor, setFormatTextColor] = useState(false);
  const [selectedColors, setSelectedColors] = useState([COLOR_PALETTE[0].value, COLOR_PALETTE[1].value]);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [processing, setProcessing] = useState(false);
  const [generatingMeta, setGeneratingMeta] = useState(false);
  const metaGeneratedRef = React.useRef(false);

  const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
  const groqApiKeyBackup = import.meta.env.VITE_GROQ_API_KEY_1;
  const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
  const groqKeys = useMemo(
    () => [groqApiKey, groqApiKeyBackup].filter((k) => k && k !== 'undefined'),
    [groqApiKey, groqApiKeyBackup]
  );

  const generateMetaFromContent = useMemo(() => {
    return async (content) => {
      if (!content || !content.trim() || !groqKeys.length) return;
      setGeneratingMeta(true);
      const textSnippet = content.length > 2800 ? content.slice(0, 2800) + '...' : content;
      const prompt = `Pe baza următorului text de comentariu literar (fragment), generează DOAR un obiect JSON valid cu exact aceste chei:
- "titlu": string, titlu scurt și clar pentru comentariu (ex. "Luceafărul — comentariu", "Plumb — analiză")
- "descriere": string, o propoziție scurtă (max 120 caractere) care descrie ce conține comentariul
- "autor": string, numele autorului operei literare (ex. Mihai Eminescu, George Bacovia)

Text comentariu:
${textSnippet}

Returnează DOAR JSON valid, fără markdown, fără \`\`\`. Exemplu: {"titlu":"...","descriere":"...","autor":"..."}`;
      let lastErr = null;
      for (const key of groqKeys) {
        try {
          const res = await fetch(groqApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
            body: JSON.stringify({
              model: 'openai/gpt-oss-120b',
              messages: [
                { role: 'system', content: 'Răspunde DOAR cu JSON valid. Fără markdown, fără explicatii.' },
                { role: 'user', content: prompt },
              ],
              temperature: 0.25,
              max_tokens: 400,
            }),
          });
          if (!res.ok) {
            lastErr = await res.text().catch(() => '');
            continue;
          }
          const data = await res.json();
          const raw = data?.choices?.[0]?.message?.content || '';
          if (!raw || typeof raw !== 'string') {
            lastErr = 'Răspuns gol';
            continue;
          }
          const parsed = safeParseJson(raw);
          if (parsed.titlu != null) setTitlu(String(parsed.titlu).trim());
          if (parsed.descriere != null) setDescriere(String(parsed.descriere).trim());
          if (parsed.autor != null) setAutor(String(parsed.autor).trim());
          break;
        } catch (e) {
          lastErr = e?.message || 'Eroare';
        }
      }
      setGeneratingMeta(false);
    };
  }, [groqKeys, groqApiUrl]);

  const generateMetaRef = React.useRef(generateMetaFromContent);
  generateMetaRef.current = generateMetaFromContent;

  // Keep dependency array length fixed (exactly 2) to avoid "useEffect changed size between renders" error
  useEffect(() => {
    if (!isOpen || !comment) {
      if (!isOpen) metaGeneratedRef.current = null;
      return;
    }
    setTitlu(comment.titlu || '');
    setDescriere(comment.descriere || '');
    setAutor(comment.autor || '');
    setPlan(comment.plan === 'premium' ? 'premium' : comment.plan === 'pro' ? 'pro' : 'free');
    setCategorie(comment.categorie || comment.specieLiterara || 'poezie');
    setTip(comment.tip || 'general');
    setStatus({ type: '', text: '' });
    const raw = comment?.type === 'text' ? (comment.content || '') : '';
    const commentId = comment.id || '';
    if (raw.trim() && groqKeys.length && metaGeneratedRef.current !== commentId) {
      metaGeneratedRef.current = commentId;
      generateMetaRef.current(raw);
    }
  }, [isOpen, comment]);

  const rawContent = comment?.type === 'text' ? (comment.content || '') : '';
  const contentBlocks = useMemo(() => textToContentBlocks(rawContent), [rawContent]);

  const formatMethod = formatHighlight ? 'highlight' : formatUnderline ? 'underline' : formatTextColor ? 'textColor' : 'highlight';

  const toggleColor = (value) => {
    setSelectedColors((prev) => {
      if (prev.includes(value)) return prev.filter((c) => c !== value);
      if (prev.length >= 3) return [...prev.slice(1), value];
      return [...prev, value];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (processing || !comment) return;
    if (!titlu.trim()) {
      setStatus({ type: 'error', text: 'Completează titlul.' });
      return;
    }
    if (!autor.trim()) {
      setStatus({ type: 'error', text: 'Completează autorul.' });
      return;
    }
    if (contentBlocks.length === 0) {
      setStatus({ type: 'error', text: 'Comentariul nu are text de formatat.' });
      return;
    }
    if (selectedColors.length === 0) {
      setStatus({ type: 'error', text: 'Selectează cel puțin o culoare.' });
      return;
    }
    if (!groqKeys.length) {
      setStatus({ type: 'error', text: 'Setează VITE_GROQ_API_KEY în .env.local.' });
      return;
    }

    setProcessing(true);
    setStatus({ type: '', text: '' });

    const paragraphs = contentBlocks
      .map((block, index) => ({ index, text: sanitizeText(block?.text || '') }))
      .filter((p) => p.text.length > 0);

    if (paragraphs.length === 0) {
      setStatus({ type: 'error', text: 'Nu există paragrafe cu text.' });
      setProcessing(false);
      return;
    }

    const colorGuide = selectedColors.map((c, idx) => `[${idx}] ${c}`).join(', ');
    const formatMethodName = formatMethod;
    const useBold = formatBold ? 'Max 5-8 bold/paragraf (termeni cheie).' : 'NU folosi bold - lasă "bold": [].';
    const useItalic = formatItalic ? 'Max 3-5 italic/paragraf (citate).' : 'NU folosi italic - lasă "italic": [].';
    const prompt = `Marchează fragmente esențiale din comentariu literar și adaugă un subtitlu scurt pentru fiecare paragraf. Folosește EXCLUSIV metoda "${formatMethodName}" pentru evidențiere.
Paragrafe:
${paragraphs.map((p) => `[${p.index}] ${p.text}`).join('\n\n')}
Culori: ${colorGuide}
${useBold}
${useItalic}
OBLIGATORIU: Pentru fiecare paragraf adaugă "title": "Subtitlu scurt (3-8 cuvinte) care rezumă ideea paragrafului" - ex. "Tema centrală", "Structura poemului", "Simbolistica".
Returnează DOAR JSON valid, fără markdown:
{
  "formatMethod": "${formatMethodName}",
  "paragraphs": [
    { "index": 0, "title": "Subtitlu paragraf", "${formatMethodName === 'textColor' ? 'textColors' : formatMethodName}": [{"text":"fragment exact din text","colorKey":0}], "bold": ["fragment"], "italic": [] }
  ]
}
Reguli: fragmente EXACTE din text (copiat literal); max 8-12 evidențieri/paragraf; fiecare paragraf TREBUIE să aibă "title". Cheie culoare: ${formatMethodName === 'textColor' ? 'textColors' : formatMethodName}.`;

    let formattedContent = contentBlocks;
    let lastError = null;

    for (const key of groqKeys) {
      try {
        const res = await fetch(groqApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
          body: JSON.stringify({
            model: 'openai/gpt-oss-120b',
            messages: [
              { role: 'system', content: 'Răspunde DOAR cu JSON valid. Fără markdown, fără explicatii.' },
              { role: 'user', content: prompt },
            ],
            temperature: 0.3,
            max_tokens: 2500,
          }),
        });
        if (!res.ok) {
          lastError = await res.text().catch(() => '') || `Eroare ${res.status}`;
          continue;
        }
        const data = await res.json();
        const rawContent2 = data?.choices?.[0]?.message?.content || '';
        if (!rawContent2 || typeof rawContent2 !== 'string') {
          lastError = 'Răspuns gol';
          continue;
        }
        let parsed;
        try {
          parsed = safeParseJson(rawContent2);
        } catch {
          lastError = 'JSON invalid';
          continue;
        }
        if (!parsed?.paragraphs || !Array.isArray(parsed.paragraphs)) {
          lastError = 'Lipsește câmpul paragraphs';
          continue;
        }
        const responseFormatMethod = parsed.formatMethod || formatMethod;
        formattedContent = applyAiInstructions(contentBlocks, parsed.paragraphs, selectedColors, responseFormatMethod);
        // Apply subtitles (title) from AI to each block
        formattedContent = formattedContent.map((block, idx) => {
          const p = parsed.paragraphs.find((x) => x.index === idx);
          const title = p?.title != null && String(p.title).trim() ? String(p.title).trim() : block.title;
          return { ...block, title: title || undefined };
        });
        break;
      } catch (err) {
        lastError = err?.message || 'Eroare';
      }
    }

    if (formattedContent === contentBlocks && lastError) {
      setStatus({ type: 'error', text: `Formatare AI eșuată: ${lastError}. Poți adăuga fără formatare.` });
      setProcessing(false);
      return;
    }

    const hasFormatting = formattedContent.some(
      (b) =>
        (b.highlights && b.highlights.length > 0) ||
        (b.underlines && b.underlines.length > 0) ||
        (b.formats && b.formats.length > 0) ||
        (b.title && b.title.trim())
    );
    if (!hasFormatting) {
      setStatus({
        type: 'error',
        text: 'Formatarea nu s-a aplicat (AI nu a returnat evidențieri sau subtitluri). Încearcă din nou sau adaugă fără formatare.',
      });
      setProcessing(false);
      return;
    }

    const id = `${autor.toLowerCase().replace(/\s+/g, '-')}-${titlu.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    const payload = {
      id,
      titlu: titlu.trim(),
      autor: autor.trim(),
      categorie,
      tip,
      plan,
      descriere: descriere.trim(),
      content: formattedContent,
      createdBy: currentUser?.uid || '',
      createdByEmail: currentUser?.email || userProfile?.email || '',
      createdByName: userProfile?.displayName || currentUser?.displayName || '',
    };

    try {
      await addComentariu(payload);
      setStatus({ type: 'success', text: 'Comentariul a fost adăugat la pagina Comentarii.' });
      if (onSuccess) onSuccess();
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setStatus({ type: 'error', text: err?.message || 'Eroare la adăugare.' });
    } finally {
      setProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`add-to-comentarii-overlay ${darkTheme ? 'dark-theme' : ''}`} onClick={onClose} role="dialog" aria-modal="true">
      <div className={`add-to-comentarii-modal ${darkTheme ? 'dark-theme' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="add-to-comentarii-header">
          <h2>Adaugă la pagina Comentarii</h2>
          <button type="button" className="add-to-comentarii-close" onClick={onClose} aria-label="Închide">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-to-comentarii-form">
          <div className="add-to-comentarii-meta-row">
            <div className="add-to-comentarii-field">
              <label>Titlu</label>
              <input type="text" value={titlu} onChange={(e) => setTitlu(e.target.value)} placeholder="ex. Luceafărul — comentariu" className="add-to-comentarii-input" disabled={generatingMeta} autoComplete="off" />
            </div>
            <div className="add-to-comentarii-field">
              <label>Descriere</label>
              <input type="text" value={descriere} onChange={(e) => setDescriere(e.target.value)} placeholder="Scurtă descriere" className="add-to-comentarii-input" disabled={generatingMeta} />
            </div>
          </div>
          <div className="add-to-comentarii-field">
            <label>Autor (operă)</label>
            <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} placeholder="ex. Mihai Eminescu" className="add-to-comentarii-input" disabled={generatingMeta} />
            {rawContent.trim() && (
              <div className="add-to-comentarii-gen-btn-wrap" style={{ marginTop: '0.4rem', marginBottom: 0 }}>
                <button type="button" className="add-to-comentarii-gen-link" onClick={() => generateMetaFromContent(rawContent)} disabled={generatingMeta}>
                  {generatingMeta ? 'Se generează titlu, descriere și autor...' : 'Generează titlu, descriere și autor din nou'}
                </button>
              </div>
            )}
          </div>
          <div className="add-to-comentarii-row-3">
            <div className="add-to-comentarii-field">
              <label>Plan</label>
              <select value={plan} onChange={(e) => setPlan(e.target.value)} className="add-to-comentarii-select">
                {PLAN_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="add-to-comentarii-field">
              <label>Categorie</label>
              <select value={categorie} onChange={(e) => setCategorie(e.target.value)} className="add-to-comentarii-select">
                {CATEGORII.map((c) => (
                  <option key={c.id} value={c.id}>{c.nume}</option>
                ))}
              </select>
            </div>
            <div className="add-to-comentarii-field">
              <label>Tip comentariu</label>
              <select value={tip} onChange={(e) => setTip(e.target.value)} className="add-to-comentarii-select">
                {TIP_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="add-to-comentarii-format-section">
            <div className="add-to-comentarii-format-label">Formatează cu AI (bifează ce vrei)</div>
            <div className="add-to-comentarii-checkboxes">
              <label className="add-to-comentarii-check">
                <input type="checkbox" checked={formatBold} onChange={(e) => setFormatBold(e.target.checked)} />
                <span>Bold</span>
              </label>
              <label className="add-to-comentarii-check">
                <input type="checkbox" checked={formatItalic} onChange={(e) => setFormatItalic(e.target.checked)} />
                <span>Italic</span>
              </label>
              <label className="add-to-comentarii-check">
                <input type="checkbox" checked={formatHighlight} onChange={(e) => { setFormatHighlight(e.target.checked); if (e.target.checked) { setFormatUnderline(false); setFormatTextColor(false); } }} />
                <span>Highlight</span>
              </label>
              <label className="add-to-comentarii-check">
                <input type="checkbox" checked={formatUnderline} onChange={(e) => { setFormatUnderline(e.target.checked); if (e.target.checked) { setFormatHighlight(false); setFormatTextColor(false); } }} />
                <span>Underline</span>
              </label>
              <label className="add-to-comentarii-check">
                <input type="checkbox" checked={formatTextColor} onChange={(e) => { setFormatTextColor(e.target.checked); if (e.target.checked) { setFormatHighlight(false); setFormatUnderline(false); } }} />
                <span>Culoare text</span>
              </label>
            </div>
            <div className="add-to-comentarii-colors-label">Culori (până la 3)</div>
            <div className="add-to-comentarii-colors">
              {COLOR_PALETTE.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  className={`add-to-comentarii-color-chip ${selectedColors.includes(color.value) ? 'active' : ''}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => toggleColor(color.value)}
                  title={color.name}
                >
                  {selectedColors.includes(color.value) ? '✓' : ''}
                </button>
              ))}
            </div>
          </div>

          {status.text && (
            <div className={`add-to-comentarii-status ${status.type}`}>{status.text}</div>
          )}

          <div className="add-to-comentarii-actions">
            <button type="button" className="add-to-comentarii-btn secondary" onClick={onClose}>
              Anulare
            </button>
            <button type="submit" className="add-to-comentarii-btn primary" disabled={processing}>
              {processing ? 'Se formatează și se adaugă...' : 'Formatează cu AI și adaugă'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

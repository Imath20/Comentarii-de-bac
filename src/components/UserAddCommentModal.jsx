import React, { useState, useRef, useEffect } from 'react';
import { FileText, Image, Plus, Pencil, X, Scan, Sparkles } from 'lucide-react';
import { uploadImageToCloudinary } from '../utils/cloudinary';
import '../styles/admin.scss';
import '../styles/userAddCommentModal.scss';

const SPECII_LITERARE = [
  'roman', 'nuvelă', 'poezie simbolistă', 'poezie romantică', 'poezie modernistă',
  'comedie', 'basm', 'poveste', 'schiță', 'critică', 'memorii', 'dramă',
];

const CURENTE_LITERARE = [
  'realism', 'romantism', 'simbolism', 'modernism', 'postmodernism',
  'clasicism', 'baroc', 'iluminism', 'naturalism', 'expresionism',
];

const GENURI_LITERARE = [
  'epic', 'liric', 'dramatic', 'epic-liric', 'liric-dramatic',
];

const TIPURI_OPERA = [
  'obiectivă', 'subiectivă', 'realistă', 'modernistă', 'simbolistă',
  'romantică', 'naturalistă', 'expresionistă',
];

const TIP_COMENTARIU_OPTIONS = [
  { value: 'general', label: 'Comentariu general' },
  { value: 'tema-viziune', label: 'Tema și viziunea' },
  { value: 'caracterizare-personaj', label: 'Caracterizarea personajului' },
  { value: 'relatie-doua-personaje', label: 'Relația dintre două personaje' },
];

/**
 * Corectează caracterele românești corupte (encodare greșită sau erori OCR).
 * Când textul e copiat din PDF/Word cu encoding diferit sau extras prin OCR,
 * diacriticele (ș, ă, î, ţ, â) pot apărea ca ¥, þ, N y etc.
 */
function fixRomanianEncoding(text) {
  if (!text || typeof text !== 'string') return text;
  let result = text;
  // Encodare greșită (Windows-1250/ISO-8859-2 interpretat ca Latin-1)
  const encodingFixes = [
    ['¥', 'ș'],   // ș citit greșit
    ['þ', 'ț'],   // ț citit greșit
    ['Ÿ', 'ț'],   // ţ citit greșit
    ['ž', 'ș'],   // ş citit greșit
    ['º', 'ș'],   // unele variante
    ['ª', 'ț'],   // unele variante
  ];
  for (const [wrong, correct] of encodingFixes) {
    result = result.split(wrong).join(correct);
  }
  // Erori OCR frecvente pentru română
  result = result.replace(/\bN\s*y\b/gi, 'și');
  result = result.replace(/\bny\b/g, 'și');
  return result;
}

/**
 * Extrage cu AI (Groq) teme, motive, viziune și interpretare din textul comentariului.
 * Returnează { teme, motive, viziune, interpretare }.
 */
async function generateTemeMotiveViziuneInterpretareWithAI(text, groqApiKeys, groqApiUrl) {
  const t = (text || '').trim();
  if (!t) return null;
  const body = {
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: `Ești expert în literatura română. Analizează textul de comentariu literar și extrage:
- teme: temele principale (separate prin virgulă)
- motive: motivele literare (separate prin virgulă)
- viziune: viziunea autorului asupra lumii
- interpretare: interpretare succintă

Răspunde DOAR cu un JSON valid, fără alt text:
{"teme":"...","motive":"...","viziune":"...","interpretare":"..."}
Fiecare câmp maxim 80 caractere. În limba română.`,
      },
      {
        role: 'user',
        content: `Extrage din acest comentariu literar teme, motive, viziune și interpretare:\n\n${t}`,
      },
    ],
    temperature: 0.3,
    max_tokens: 300,
  };
  let lastError;
  for (const key of groqApiKeys) {
    try {
      const res = await fetch(groqApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        lastError = new Error(err?.error?.message || `Groq API: ${res.status}`);
        continue;
      }
      const json = await res.json();
      const content = (json?.choices?.[0]?.message?.content || '').trim();
      if (content) {
        const parsed = JSON.parse(content.replace(/```json?\s*|\s*```/g, '').trim());
        return {
          teme: (parsed.teme || '').trim(),
          motive: (parsed.motive || '').trim(),
          viziune: (parsed.viziune || '').trim(),
          interpretare: (parsed.interpretare || '').trim(),
        };
      }
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError || new Error('Nu s-a putut extrage cu AI.');
}

/** Groq limitează base64 la 4MB. Redimensionează imaginea dacă e prea mare. */
async function ensureImageUnderSizeLimit(dataUrl, maxBytes = 3.5 * 1024 * 1024) {
  const base64 = dataUrl?.split(',')[1];
  if (!base64) return dataUrl;
  const byteLength = (base64.length * 3) / 4;
  if (byteLength <= maxBytes) return dataUrl;
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      const scale = Math.sqrt(maxBytes / byteLength);
      width = Math.floor(width * scale);
      height = Math.floor(height * scale);
      width = Math.max(200, width);
      height = Math.max(200, height);
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const mime = dataUrl.match(/data:([^;]+);/)?.[1] || 'image/jpeg';
      const quality = 0.85;
      resolve(canvas.toDataURL(mime, quality));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

const UserAddCommentModal = ({ isOpen, onClose, onSubmit, onEditSubmit, initialComment, darkTheme, userDisplayName }) => {
  const [addMode, setAddMode] = useState('text');
  const [titlu, setTitlu] = useState('');
  const [autor, setAutor] = useState('');
  const [anAparitie, setAnAparitie] = useState('');
  const [curentLiterar, setCurentLiterar] = useState('');
  const [specieLiterara, setSpecieLiterara] = useState('');
  const [genLiterar, setGenLiterar] = useState('');
  const [tipOpera, setTipOpera] = useState('');
  const [tip, setTip] = useState('general');
  const [teme, setTeme] = useState('');
  const [motive, setMotive] = useState('');
  const [viziune, setViziune] = useState('');
  const [interpretare, setInterpretare] = useState('');
  const [plan, setPlan] = useState('free');
  const [textContent, setTextContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [ocrExtracting, setOcrExtracting] = useState(false);
  const [extractAILoading, setExtractAILoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const isEditMode = !!(initialComment?.id);

  useEffect(() => {
    if (isOpen && initialComment) {
      setAddMode(initialComment.type === 'image' ? 'image' : 'text');
      setTitlu(initialComment.titlu || '');
      setAutor(initialComment.autor || '');
      setAnAparitie(initialComment.anAparitie || '');
      setCurentLiterar(initialComment.curentLiterar || '');
      setSpecieLiterara(initialComment.specieLiterara || initialComment.categorie || '');
      setGenLiterar(initialComment.genLiterar || '');
      setTipOpera(initialComment.tipOpera || '');
      setTip(initialComment.tip || 'general');
      setTeme(initialComment.teme || '');
      setMotive(initialComment.motive || '');
      setViziune(initialComment.viziune || '');
      setInterpretare(initialComment.interpretare || '');
      setPlan(initialComment.plan || 'free');
      setTextContent(initialComment.type === 'text' ? (initialComment.content || '') : '');
      setImageFile(null);
      setImagePreview(initialComment.type === 'image' ? (initialComment.content || null) : null);
      setError('');
    } else if (isOpen && !initialComment) {
      resetForm();
    }
  }, [isOpen, initialComment?.id]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Disable scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        // Restore scroll position when modal closes
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const resetForm = () => {
    setAddMode('text');
    setTitlu('');
    setAutor('');
    setAnAparitie('');
    setCurentLiterar('');
    setSpecieLiterara('');
    setGenLiterar('');
    setTipOpera('');
    setTip('general');
    setTeme('');
    setMotive('');
    setViziune('');
    setInterpretare('');
    setPlan('free');
    setTextContent('');
    setImageFile(null);
    setImagePreview(null);
    setOcrExtracting(false);
    setExtractAILoading(false);
    setError('');
  };

  const handleClose = () => {
    onClose();
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Fișierul trebuie să fie o imagine');
      return;
    }
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Imaginea trebuie să fie mai mică de 10MB');
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleExtractTextFromImage = async () => {
    const source = imagePreview || (imageFile ? URL.createObjectURL(imageFile) : null);
    if (!source) return;
    const groqApiKey = import.meta.env.VITE_GROQ_API_KEY || import.meta.env.VITE_GROQ_API_KEY_1;
    const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
    if (!groqApiKey) {
      setError('Setează VITE_GROQ_API_KEY în .env.local pentru extragerea textului cu AI.');
      return;
    }
    setOcrExtracting(true);
    setError('');
    try {
      let dataUrl = source;
      if (source.startsWith('data:')) {
        dataUrl = await ensureImageUnderSizeLimit(source);
      } else if (source.startsWith('blob:')) {
        const resp = await fetch(source);
        const blob = await resp.blob();
        dataUrl = await new Promise((resolve, reject) => {
          const r = new FileReader();
          r.onload = () => resolve(r.result);
          r.onerror = reject;
          r.readAsDataURL(blob);
        });
        dataUrl = await ensureImageUnderSizeLimit(dataUrl);
        URL.revokeObjectURL(source);
      }
      const res = await fetch(groqApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${groqApiKey}` },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-scout-17b-16e-instruct',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Extrage textul exact din această imagine (OCR). Păstrează structura, paragrafele și formatarea. Limba este română. Returnează doar textul extras, fără explicații.',
                },
                { type: 'image_url', image_url: { url: dataUrl } },
              ],
            },
          ],
          max_tokens: 4096,
          temperature: 0.1,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `Groq API: ${res.status}`);
      }
      const json = await res.json();
      const extracted = (json?.choices?.[0]?.message?.content || '').trim();
      if (extracted) {
        setTextContent(fixRomanianEncoding(extracted));
        setAddMode('text');
        setImageFile(null);
        setImagePreview(null);
      } else {
        setError('Nu s-a putut extrage text din imagine. Încearcă o imagine mai clară.');
      }
    } catch (err) {
      setError(err?.message || 'Eroare la extragerea textului din imagine');
    } finally {
      setOcrExtracting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const submitData = (data) => {
      if (isEditMode && onEditSubmit) {
        return onEditSubmit(initialComment.id, data);
      }
      return onSubmit(data);
    };

    if (addMode === 'text') {
      const trimmed = textContent.trim();
      if (!trimmed) {
        setError('Te rog introdu textul comentariului');
        return;
      }
      setUploading(true);
      try {
        await submitData({
          type: 'text',
          content: trimmed,
          titlu,
          autor,
          anAparitie,
          curentLiterar,
          specieLiterara,
          genLiterar,
          tipOpera,
          tip,
          teme,
          motive,
          viziune,
          interpretare,
          plan,
        });
        resetForm();
        onClose();
      } catch (err) {
        setError(err.message || (isEditMode ? 'Eroare la actualizarea comentariului' : 'Eroare la adăugarea comentariului'));
      } finally {
        setUploading(false);
      }
    } else {
      let imageUrl;
      if (imageFile) {
        setUploading(true);
        try {
          imageUrl = await uploadImageToCloudinary(imageFile, 'user-comments');
        } catch (err) {
          setError(err.message || 'Eroare la încărcarea imaginii');
          setUploading(false);
          return;
        }
      } else if (isEditMode && initialComment?.type === 'image' && imagePreview) {
        imageUrl = imagePreview;
      } else {
        setError('Te rog selectează o imagine');
        return;
      }
      if (!imageFile) setUploading(true);
      try {
        await submitData({
          type: 'image',
          content: imageUrl,
          titlu,
          autor,
          anAparitie,
          curentLiterar,
          specieLiterara,
          genLiterar,
          tipOpera,
          tip,
          teme,
          motive,
          viziune,
          interpretare,
          plan,
        });
        resetForm();
        onClose();
      } catch (err) {
        setError(err.message || (isEditMode ? 'Eroare la actualizarea comentariului' : 'Eroare la încărcarea imaginii'));
      } finally {
        setUploading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`user-add-comment-modal-overlay ${darkTheme ? 'dark-theme' : ''}`}>
      <div
        className={`user-add-comment-modal user-add-comment-modal-expanded ${darkTheme ? 'dark-theme' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="user-add-comment-modal-header">
          <h2>{isEditMode ? 'Editează comentariu' : 'Adaugă comentariu'}</h2>
          <button type="button" onClick={handleClose} className="user-add-comment-modal-close" aria-label="Închide">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="user-add-comment-form">
          <div className="user-add-comment-tabs">
            <button
              type="button"
              className={`user-add-comment-tab ${addMode === 'text' ? 'active' : ''}`}
              onClick={() => { setAddMode('text'); setError(''); setImageFile(null); setImagePreview(null); }}
            >
              <FileText size={18} />
              Text
            </button>
            <button
              type="button"
              className={`user-add-comment-tab ${addMode === 'image' ? 'active' : ''}`}
              onClick={() => { setAddMode('image'); setError(''); setTextContent(''); }}
            >
              <Image size={18} />
              Imagine
            </button>
          </div>

          <div className="user-add-comment-form-row">
            <div className="admin-form-group">
              <label htmlFor="user-comment-titlu">Titlu *</label>
              <input
                id="user-comment-titlu"
                type="text"
                value={titlu}
                onChange={(e) => { setTitlu(e.target.value); setError(''); }}
                placeholder="Luceafărul — comentariu"
                className="admin-input"
                autoComplete="off"
                disabled={uploading}
              />
            </div>
            <div className="admin-form-group">
              <label htmlFor="user-comment-plan">Plan</label>
              <select
                id="user-comment-plan"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="admin-select"
                disabled={uploading}
              >
                <option value="free">Gratis</option>
                <option value="pro">Pro</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="user-comment-autor">Autor *</label>
            <input
              id="user-comment-autor"
              type="text"
              value={autor}
              onChange={(e) => { setAutor(e.target.value); setError(''); }}
              placeholder="Mihai Eminescu"
              className="admin-input"
              autoComplete="off"
              disabled={uploading}
            />
          </div>

          <div className="user-add-comment-form-row">
            <div className="admin-form-group">
              <label htmlFor="user-comment-an-aparitie">An apariție</label>
              <input
                id="user-comment-an-aparitie"
                type="text"
                value={anAparitie}
                onChange={(e) => { setAnAparitie(e.target.value); setError(''); }}
                placeholder="1920"
                className="admin-input"
                autoComplete="off"
                disabled={uploading}
              />
            </div>
            <div className="admin-form-group">
              <label htmlFor="user-comment-curent-literar">Curent literar</label>
              <select
                id="user-comment-curent-literar"
                value={curentLiterar}
                onChange={(e) => setCurentLiterar(e.target.value)}
                className="admin-select"
                disabled={uploading}
              >
                <option value="">Selectează</option>
                {CURENTE_LITERARE.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="user-add-comment-form-row">
            <div className="admin-form-group">
              <label htmlFor="user-comment-specie-literara">Specie literară</label>
              <select
                id="user-comment-specie-literara"
                value={specieLiterara}
                onChange={(e) => { setSpecieLiterara(e.target.value); setError(''); }}
                className="admin-select"
                disabled={uploading}
              >
                <option value="">Selectează</option>
                {SPECII_LITERARE.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label htmlFor="user-comment-gen-literar">Gen literar</label>
              <select
                id="user-comment-gen-literar"
                value={genLiterar}
                onChange={(e) => setGenLiterar(e.target.value)}
                className="admin-select"
                disabled={uploading}
              >
                <option value="">Selectează</option>
                {GENURI_LITERARE.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="user-comment-tip-opera">Tip operă</label>
            <select
              id="user-comment-tip-opera"
              value={tipOpera}
              onChange={(e) => setTipOpera(e.target.value)}
              className="admin-select"
              disabled={uploading}
            >
              <option value="">Selectează</option>
              {TIPURI_OPERA.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="admin-form-group">
            <label htmlFor="user-comment-tip">Tip comentariu</label>
            <select
              id="user-comment-tip"
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              className="admin-select"
              disabled={uploading}
            >
              {TIP_COMENTARIU_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="admin-form-group">
            <label htmlFor="user-comment-teme">Teme</label>
            <input
              id="user-comment-teme"
              type="text"
              value={teme}
              onChange={(e) => { setTeme(e.target.value); setError(''); }}
              placeholder="pământ, iubire, destin, națională..."
              className="admin-input"
              autoComplete="off"
              disabled={uploading}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="user-comment-motive">Motive</label>
            <input
              id="user-comment-motive"
              type="text"
              value={motive}
              onChange={(e) => { setMotive(e.target.value); setError(''); }}
              placeholder="drumul, crucea..."
              className="admin-input"
              autoComplete="off"
              disabled={uploading}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="user-comment-viziune">Viziune</label>
            <input
              id="user-comment-viziune"
              type="text"
              value={viziune}
              onChange={(e) => { setViziune(e.target.value); setError(''); }}
              placeholder="realistă, obiectivă..."
              className="admin-input"
              autoComplete="off"
              disabled={uploading}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="user-comment-interpretare">Interpretare</label>
            <input
              id="user-comment-interpretare"
              type="text"
              value={interpretare}
              onChange={(e) => { setInterpretare(e.target.value); setError(''); }}
              placeholder="drama țăranului sărac în lupta pentru pământ..."
              className="admin-input"
              autoComplete="off"
              disabled={uploading}
            />
          </div>

          {addMode === 'text' ? (
            <div className="admin-form-group">
              <label htmlFor="user-comment-text">Text complet *</label>
              <textarea
                id="user-comment-text"
                value={textContent}
                onChange={(e) => { setTextContent(e.target.value); setError(''); }}
                placeholder="Lipește sau scrie aici textul complet al comentariului..."
                rows={8}
                className="admin-textarea"
                autoComplete="off"
                disabled={uploading}
              />
              <div className="user-add-comment-text-actions">
                <button
                  type="button"
                  onClick={async () => {
                    const t = textContent?.trim();
                    if (!t) {
                      setError('Introdu mai întâi textul complet pentru extragere cu AI.');
                      return;
                    }
                    const groqKeys = [import.meta.env.VITE_GROQ_API_KEY, import.meta.env.VITE_GROQ_API_KEY_1]
                      .filter((k) => k && k !== 'undefined');
                    if (!groqKeys.length) {
                      setError('Setează VITE_GROQ_API_KEY în .env pentru extragerea cu AI.');
                      return;
                    }
                    setExtractAILoading(true);
                    setError('');
                    try {
                      const result = await generateTemeMotiveViziuneInterpretareWithAI(
                        t,
                        groqKeys,
                        import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions'
                      );
                      if (result) {
                        setTeme(result.teme);
                        setMotive(result.motive);
                        setViziune(result.viziune);
                        setInterpretare(result.interpretare);
                      }
                    } catch (err) {
                      setError(err?.message || 'Eroare la extragerea cu AI.');
                    } finally {
                      setExtractAILoading(false);
                    }
                  }}
                  disabled={uploading || extractAILoading || !textContent?.trim()}
                  className="user-add-comment-generate-desc"
                  title="Extrage cu AI teme, motive, viziune și interpretare din text"
                >
                  {extractAILoading ? (
                    <>
                      <span className="user-add-comment-spinner" />
                      Se extrage...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      Extrage teme, motive, viziune, interpretare cu AI
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="admin-form-group">
              <label>Imagine *</label>
              <div className="user-add-comment-image-upload">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="user-add-comment-file-input"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="user-add-comment-upload-trigger"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="user-add-comment-preview" />
                  ) : (
                    <>
                      <Image size={40} />
                      <span>Selectează o imagine</span>
                      <small>Max 10MB</small>
                    </>
                  )}
                </button>
                {imagePreview && (
                  <div className="user-add-comment-image-actions">
                    <button
                      type="button"
                      onClick={handleExtractTextFromImage}
                      disabled={ocrExtracting}
                      className="user-add-comment-extract-btn"
                      title="Extrage textul din imagine folosind AI (Groq Vision)"
                    >
                      {ocrExtracting ? (
                        <>
                          <span className="user-add-comment-spinner" />
                          Se extrage textul...
                        </>
                      ) : (
                        <>
                          <Scan size={18} />
                          Extrage text cu AI
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setImageFile(null); setImagePreview(null); }}
                      className="user-add-comment-clear-preview"
                    >
                      Șterge imaginea
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="user-add-comment-error">{error}</div>
          )}

          <div className="user-add-comment-actions">
            <button type="button" onClick={handleClose} className="user-add-comment-cancel">
              Anulează
            </button>
            <button type="submit" disabled={uploading || (addMode === 'image' && !imageFile && !(isEditMode && imagePreview))} className="admin-submit-button user-add-comment-submit">
              {uploading ? (
                <>
                  <span className="user-add-comment-spinner" />
                  {isEditMode ? 'Se actualizează...' : 'Se adaugă...'}
                </>
              ) : (
                <>
                  {isEditMode ? <Pencil size={18} /> : <Plus size={18} />}
                  {isEditMode ? 'Actualizează comentariu' : 'Adaugă comentariu'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAddCommentModal;

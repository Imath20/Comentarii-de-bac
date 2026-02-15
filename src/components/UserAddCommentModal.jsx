import React, { useState, useRef, useEffect } from 'react';
import { FileText, Image, Plus, X, Scan } from 'lucide-react';
import { createWorker } from 'tesseract.js';
import { uploadImageToCloudinary } from '../utils/cloudinary';
import '../styles/admin.scss';
import '../styles/userAddCommentModal.scss';

const CATEGORII = [
  'poezie', 'roman', 'comedie', 'basm', 'nuvela',
  'critica', 'memorii', 'poveste', 'schita',
];

const TIP_COMENTARIU_OPTIONS = [
  { value: 'general', label: 'Comentariu general' },
  { value: 'tema-viziune', label: 'Tema și viziunea' },
  { value: 'caracterizare-personaj', label: 'Caracterizarea personajului' },
  { value: 'relatie-doua-personaje', label: 'Relația dintre două personaje' },
];

/**
 * Uneste liniile care sunt doar wrap (aproape vertical) cu spațiu.
 * Păstrează newline doar când există spațiu gol evident între linii (paragraf).
 */
function mergeWrappedLines(blocks) {
  const lines = [];
  for (const block of blocks || []) {
    for (const para of block.paragraphs || []) {
      for (const line of para.lines || []) {
        const text = (line.text || '').trim();
        if (!text) continue;
        const bbox = line.bbox || {};
        const y0 = bbox.y0 ?? 0;
        const y1 = bbox.y1 ?? y0;
        const rowH = line.rowAttributes?.rowHeight ?? Math.max(1, y1 - y0);
        lines.push({ text, y0, y1, rowHeight: rowH });
      }
    }
  }
  if (lines.length === 0) return '';
  const avgRowHeight = lines.reduce((s, l) => s + l.rowHeight, 0) / lines.length;
  const PARAGRAPH_GAP_THRESHOLD = 0.85;
  const parts = [];
  for (let i = 0; i < lines.length; i++) {
    parts.push(lines[i].text);
    if (i < lines.length - 1) {
      const gap = lines[i + 1].y0 - lines[i].y1;
      const isParagraphBreak = gap > PARAGRAPH_GAP_THRESHOLD * avgRowHeight;
      parts.push(isParagraphBreak ? '\n' : ' ');
    }
  }
  return parts.join('').trim();
}

const UserAddCommentModal = ({ isOpen, onClose, onSubmit, darkTheme, userDisplayName }) => {
  const [addMode, setAddMode] = useState('text');
  const [titlu, setTitlu] = useState('');
  const [autor, setAutor] = useState('');
  const [categorie, setCategorie] = useState('');
  const [tip, setTip] = useState('general');
  const [descriere, setDescriere] = useState('');
  const [plan, setPlan] = useState('free');
  const [textContent, setTextContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [ocrExtracting, setOcrExtracting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

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
    setCategorie('');
    setTip('general');
    setDescriere('');
    setPlan('free');
    setTextContent('');
    setImageFile(null);
    setImagePreview(null);
    setOcrExtracting(false);
    setError('');
  };

  const handleClose = () => {
    resetForm();
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
    setOcrExtracting(true);
    setError('');
    try {
      const worker = await createWorker('ron+eng');
      const { data } = await worker.recognize(source, {}, { text: true, blocks: true });
      if (imageFile && source.startsWith('blob:')) URL.revokeObjectURL(source);
      await worker.terminate();
      let extracted = (data?.text || '').trim();
      if (extracted && data?.blocks?.length) {
        const merged = mergeWrappedLines(data.blocks);
        if (merged) extracted = merged;
      }
      if (extracted) {
        setTextContent(extracted);
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

    if (addMode === 'text') {
      const trimmed = textContent.trim();
      if (!trimmed) {
        setError('Te rog introdu textul comentariului');
        return;
      }
      setUploading(true);
      try {
        await onSubmit({
          type: 'text',
          content: trimmed,
          titlu,
          autor,
          categorie,
          tip,
          descriere,
          plan,
        });
        handleClose();
      } catch (err) {
        setError(err.message || 'Eroare la adăugarea comentariului');
      } finally {
        setUploading(false);
      }
    } else {
      if (!imageFile) {
        setError('Te rog selectează o imagine');
        return;
      }
      setUploading(true);
      try {
        const url = await uploadImageToCloudinary(imageFile, 'user-comments');
        await onSubmit({
          type: 'image',
          content: url,
          titlu,
          autor,
          categorie,
          tip,
          descriere,
          plan,
        });
        handleClose();
      } catch (err) {
        setError(err.message || 'Eroare la încărcarea imaginii');
      } finally {
        setUploading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`user-add-comment-modal-overlay ${darkTheme ? 'dark-theme' : ''}`} onClick={handleClose}>
      <div
        className={`user-add-comment-modal user-add-comment-modal-expanded ${darkTheme ? 'dark-theme' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="user-add-comment-modal-header">
          <h2>Adaugă comentariu</h2>
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

          <div className="admin-form-group">
            <label htmlFor="user-comment-categorie">Categorie *</label>
            <select
              id="user-comment-categorie"
              value={categorie}
              onChange={(e) => { setCategorie(e.target.value); setError(''); }}
              className="admin-select"
              disabled={uploading}
            >
              <option value="">Selectează categoria</option>
              {CATEGORII.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
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
            <label htmlFor="user-comment-descriere">Descriere</label>
            <input
              id="user-comment-descriere"
              type="text"
              value={descriere}
              onChange={(e) => { setDescriere(e.target.value); setError(''); }}
              placeholder="Teme, motive, viziune, specii și interpretare succintă."
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
                      title="Extrage textul din imagine folosind OCR"
                    >
                      {ocrExtracting ? (
                        <>
                          <span className="user-add-comment-spinner" />
                          Se extrage textul...
                        </>
                      ) : (
                        <>
                          <Scan size={18} />
                          Extrage textul din imagine
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
            <button type="submit" disabled={uploading || (addMode === 'image' && !imageFile)} className="admin-submit-button user-add-comment-submit">
              {uploading ? (
                <>
                  <span className="user-add-comment-spinner" />
                  Se adaugă...
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Adaugă comentariu
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

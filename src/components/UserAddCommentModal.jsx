import React, { useState, useRef } from 'react';
import { FileText, Image, Plus, X } from 'lucide-react';
import { uploadImageToCloudinary } from '../utils/cloudinary';
import '../styles/userAddCommentModal.scss';

const UserAddCommentModal = ({ isOpen, onClose, onSubmit, darkTheme }) => {
  const [addMode, setAddMode] = useState('text');
  const [textContent, setTextContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const resetForm = () => {
    setAddMode('text');
    setTextContent('');
    setImageFile(null);
    setImagePreview(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (addMode === 'text') {
      const trimmed = textContent.trim();
      if (!trimmed) {
        setError('Te rog introdu un comentariu');
        return;
      }
      setUploading(true);
      try {
        await onSubmit({ type: 'text', content: trimmed });
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
        await onSubmit({ type: 'image', content: url });
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
        className={`user-add-comment-modal ${darkTheme ? 'dark-theme' : ''}`}
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

          {addMode === 'text' ? (
            <div className="admin-form-group">
              <label htmlFor="user-comment-text">Comentariul tău *</label>
              <textarea
                id="user-comment-text"
                value={textContent}
                onChange={(e) => { setTextContent(e.target.value); setError(''); }}
                placeholder="Scrie comentariul tău..."
                rows={6}
                className="admin-textarea"
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
                  <button
                    type="button"
                    onClick={() => { setImageFile(null); setImagePreview(null); }}
                    className="user-add-comment-clear-preview"
                  >
                    Șterge imaginea
                  </button>
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

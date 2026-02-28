import React, { useState, useEffect } from 'react';
import { X, Copy } from 'lucide-react';
import { createSharedComment } from '../firebase/sharedCommentsService';
import '../styles/shareCommentModal.scss';

const ShareCommentModal = ({ comment, isOpen, onClose, darkTheme, onSuccess, userId }) => {
  const [step, setStep] = useState('confirming'); // confirming | generating | success
  const [shareId, setShareId] = useState(null);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setStep('confirming');
      setShareId(null);
      setCopyFeedback(false);
      setError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleConfirm = async () => {
    if (!comment || !userId) return;
    setStep('generating');
    setError(null);
    try {
      const id = await createSharedComment(userId, comment);
      setShareId(id);
      setStep('success');
      onSuccess?.();
    } catch (err) {
      setError(err?.message || 'Eroare la partajare');
      setStep('confirming');
    }
  };

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/comentarii/share/${shareId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 1500);
    } catch {
      setCopyFeedback(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`share-comment-overlay ${darkTheme ? 'dark-theme' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-comment-title"
      onClick={handleOverlayClick}
    >
      <div
        className={`share-comment-modal ${darkTheme ? 'dark-theme' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="share-comment-header">
          <h2 id="share-comment-title">
            {step === 'confirming' && 'Partajează comentariul'}
            {step === 'generating' && 'Se generează linkul...'}
            {step === 'success' && 'Link generat'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="share-comment-close"
            aria-label="Închide"
          >
            <X size={22} />
          </button>
        </div>

        <div className="share-comment-body">
          {step === 'confirming' && (
            <>
              <p className="share-comment-message">
                Ești sigur că vrei să partajezi acest comentariu? Va fi creat un link public pe care oricine îl poate accesa.
              </p>
              {error && (
                <p className="share-comment-message" style={{ color: '#b71c0c' }}>
                  {error}
                </p>
              )}
              <div className="share-comment-actions">
                <button
                  type="button"
                  className="share-comment-btn secondary"
                  onClick={onClose}
                >
                  Anulează
                </button>
                <button
                  type="button"
                  className="share-comment-btn primary"
                  onClick={handleConfirm}
                  disabled={!userId}
                >
                  Confirmă
                </button>
              </div>
            </>
          )}

          {step === 'generating' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
              <span className="share-comment-spinner" />
            </div>
          )}

          {step === 'success' && shareId && (
            <>
              <p className="share-comment-message">
                Linkul tău de partajare a fost generat. Copiază-l și trimite-l oricui vrei.
              </p>
              <div className="share-comment-link-wrap">
                <input
                  type="text"
                  readOnly
                  className="share-comment-link-input"
                  value={`${typeof window !== 'undefined' ? window.location.origin : ''}/comentarii/share/${shareId}`}
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`share-comment-copy-btn ${copyFeedback ? 'copied' : ''}`}
                >
                  <Copy size={18} />
                  {copyFeedback ? 'Copiat!' : 'Copiază'}
                </button>
              </div>
              <div className="share-comment-actions">
                <button
                  type="button"
                  className="share-comment-btn primary"
                  onClick={onClose}
                >
                  Închide
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareCommentModal;

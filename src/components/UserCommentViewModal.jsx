import React, { useEffect, useState } from 'react';
import { X, Copy, Pencil } from 'lucide-react';
import '../styles/userCommentViewModal.scss';

const TIP_COMENTARIU_LABELS = {
  'general': 'Comentariu general',
  'tema-viziune': 'Tema și viziunea',
  'caracterizare-personaj': 'Caracterizarea personajului',
  'relatie-doua-personaje': 'Relația dintre două personaje',
};

const UserCommentViewModal = ({ comment, isOpen, onClose, onEdit, darkTheme, formatDate }) => {
  const [imageFullscreen, setImageFullscreen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const handleCopy = async () => {
    const textToCopy = comment?.type === 'text'
      ? (comment.content || '')
      : (comment?.content || '');
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 1500);
    } catch {
      setCopyFeedback(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (imageFullscreen) setImageFullscreen(false);
        else onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose, imageFullscreen]);

  useEffect(() => {
    if (!isOpen) setImageFullscreen(false);
  }, [isOpen]);

  if (!isOpen || !comment) return null;

  const handleOverlayPointerDown = (e) => {
    if (e.target !== e.currentTarget) return;
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && sel.toString().length > 0) {
      const range = sel.getRangeAt(0);
      const modal = e.currentTarget.querySelector('.user-comment-view-modal');
      if (modal && modal.contains(range.commonAncestorContainer)) {
        return; // utilizatorul deselectează textul, nu închide
      }
    }
    onClose();
  };

  return (
    <div
      className={`user-comment-view-overlay ${darkTheme ? 'dark-theme' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-comment-view-title"
      onPointerDown={handleOverlayPointerDown}
    >
      <div
        className={`user-comment-view-modal ${darkTheme ? 'dark-theme' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="user-comment-view-header">
          <h2 id="user-comment-view-title">
            {comment.titlu || (comment.type === 'text' ? 'Comentariu' : 'Imagine')}
          </h2>
          <div className="user-comment-view-header-actions">
            <button
              type="button"
              onClick={handleCopy}
              className={`user-comment-view-action ${copyFeedback ? 'copied' : ''}`}
              aria-label="Copiază comentariul"
              title="Copiază"
            >
              <Copy size={20} />
              {copyFeedback && <span className="user-comment-view-copy-feedback">Copiat!</span>}
            </button>
            {onEdit && (
              <button
                type="button"
                onClick={() => { onClose(); onEdit(comment); }}
                className="user-comment-view-action"
                aria-label="Editează comentariul"
                title="Editează"
              >
                <Pencil size={20} />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="user-comment-view-close"
              aria-label="Închide"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="user-comment-view-body">
          {(comment.autor || comment.categorie || comment.tip || comment.descriere) && (
            <div className="user-comment-view-meta">
              {comment.autor && (
                <div className="user-comment-view-meta-item">
                  <span className="user-comment-view-label">Autor:</span>
                  <span>{comment.autor}</span>
                </div>
              )}
              {comment.categorie && (
                <div className="user-comment-view-meta-item">
                  <span className="user-comment-view-label">Categorie:</span>
                  <span>{comment.categorie}</span>
                </div>
              )}
              {comment.tip && (
                <div className="user-comment-view-meta-item">
                  <span className="user-comment-view-label">Tip comentariu:</span>
                  <span>{TIP_COMENTARIU_LABELS[comment.tip] || comment.tip}</span>
                </div>
              )}
              {comment.descriere && (
                <div className="user-comment-view-meta-item">
                  <span className="user-comment-view-label">Descriere:</span>
                  <span>{comment.descriere}</span>
                </div>
              )}
            </div>
          )}

          {comment.type === 'image' ? (
            <div
              className="user-comment-view-image-wrap user-comment-view-image-clickable"
              onClick={() => setImageFullscreen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setImageFullscreen(true); } }}
              title="Click pentru fullscreen"
            >
              <img src={comment.content} alt="Comentariu" className="user-comment-view-image" />
            </div>
          ) : (
            <div className="user-comment-view-text">
              {/* {(comment.content || '').replace(/\n/g, '\n\n')} */}
              {comment.content}
            </div>
          )}

          {comment.createdAt && (
            <div className="user-comment-view-date">
              {formatDate ? formatDate(comment.createdAt) : comment.createdAt}
            </div>
          )}
        </div>
      </div>

      {comment.type === 'image' && imageFullscreen && (
        <div
          className={`user-comment-view-fullscreen ${darkTheme ? 'dark-theme' : ''}`}
          onClick={(e) => { e.stopPropagation(); setImageFullscreen(false); }}
          role="button"
          tabIndex={0}
          aria-label="Închide fullscreen"
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setImageFullscreen(false); }}
            className="user-comment-view-fullscreen-close"
            aria-label="Închide"
          >
            <X size={32} />
          </button>
          <img
            src={comment.content}
            alt="Comentariu fullscreen"
            className="user-comment-view-fullscreen-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default UserCommentViewModal;

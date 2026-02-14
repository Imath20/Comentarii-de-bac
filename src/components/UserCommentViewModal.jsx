import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import '../styles/userCommentViewModal.scss';

const UserCommentViewModal = ({ comment, isOpen, onClose, darkTheme, formatDate }) => {
  const [imageFullscreen, setImageFullscreen] = useState(false);
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

  return (
    <div
      className={`user-comment-view-overlay ${darkTheme ? 'dark-theme' : ''}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-comment-view-title"
    >
      <div
        className={`user-comment-view-modal ${darkTheme ? 'dark-theme' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="user-comment-view-header">
          <h2 id="user-comment-view-title">
            {comment.titlu || (comment.type === 'text' ? 'Comentariu' : 'Imagine')}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="user-comment-view-close"
            aria-label="Închide"
          >
            <X size={24} />
          </button>
        </div>

        <div className="user-comment-view-body">
          {(comment.autor || comment.categorie || comment.descriere) && (
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

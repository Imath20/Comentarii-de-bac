import React, { useEffect, useState } from 'react';
import { X, Copy, CopyPlus, Pencil, ChevronDown, ChevronUp, Share2, Upload } from 'lucide-react';
import '../styles/userCommentViewModal.scss';

const TIP_COMENTARIU_LABELS = {
  'general': 'Comentariu general',
  'tema-viziune': 'Tema și viziunea',
  'caracterizare-personaj': 'Caracterizarea personajului',
  'relatie-doua-personaje': 'Relația dintre două personaje',
};

const parseListField = (str) => {
  if (!str || typeof str !== 'string') return [];
  return str.split(',').map((s) => s.trim()).filter(Boolean);
};

const isListLike = (str) => {
  const items = parseListField(str);
  if (items.length <= 1) return false;
  return items.every((s) => s.length < 50);
};

const UserCommentViewModal = ({ comment, isOpen, onClose, onEdit, onDuplicate, onShare, onAddToComentarii, darkTheme, formatDate }) => {
  const [imageFullscreen, setImageFullscreen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [metaExpanded, setMetaExpanded] = useState(true);

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
    if (!isOpen) {
      setImageFullscreen(false);
    } else {
      setMetaExpanded(true);
    }
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
          <div className="user-comment-view-header-top">
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
            {onDuplicate && (
              <button
                type="button"
                onClick={async () => {
                  await onDuplicate(comment);
                  onClose();
                }}
                className="user-comment-view-action"
                aria-label="Duplică comentariul"
                title="Duplică"
              >
                <CopyPlus size={20} />
                <span>Duplică</span>
              </button>
            )}
            {onShare && (
              <button
                type="button"
                onClick={() => { onClose(); onShare(comment); }}
                className="user-comment-view-action"
                aria-label="Partajează comentariul"
                title="Partajează"
              >
                <Share2 size={20} />
                <span>Partajează</span>
              </button>
            )}
            {onAddToComentarii && comment?.type === 'text' && (
              <button
                type="button"
                onClick={() => { onClose(); onAddToComentarii(comment); }}
                className="user-comment-view-action user-comment-view-action-add"
                aria-label="Adaugă la pagina Comentarii"
                title="Adaugă la Comentarii"
              >
                <Upload size={20} />
                <span>Adaugă la Comentarii</span>
              </button>
            )}
          </div>
        </div>

        <div className="user-comment-view-body">
          {(comment.autor || comment.anAparitie || comment.curentLiterar || comment.specieLiterara || comment.genLiterar || comment.tip || comment.teme || comment.motive || comment.viziune || comment.interpretare || comment.descriere) && (
            <div className="user-comment-view-meta">
              <div className="user-comment-view-meta-toggle-wrap">
                <button
                  type="button"
                  className="user-comment-view-meta-toggle"
                  onClick={() => setMetaExpanded((e) => !e)}
                  aria-expanded={metaExpanded}
                >
                  <span>Informații operă</span>
                  {metaExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {metaExpanded && (
                  <>
                    {(comment.autor || comment.anAparitie || comment.curentLiterar || comment.specieLiterara || comment.genLiterar || comment.tip) && (
                      <div className="user-comment-view-meta-row user-comment-view-meta-inline">
                        {comment.autor && (
                          <div className="user-comment-view-meta-item">
                            <span className="user-comment-view-label">Autor:</span>
                            <span>{comment.autor}</span>
                          </div>
                        )}
                        {comment.anAparitie && (
                          <div className="user-comment-view-meta-item">
                            <span className="user-comment-view-label">An apariție:</span>
                            <span>{comment.anAparitie}</span>
                          </div>
                        )}
                        {comment.curentLiterar && (
                          <div className="user-comment-view-meta-item">
                            <span className="user-comment-view-label">Curent literar:</span>
                            <span>{comment.curentLiterar}</span>
                          </div>
                        )}
                        {comment.specieLiterara && (
                          <div className="user-comment-view-meta-item">
                            <span className="user-comment-view-label">Specie literară:</span>
                            <span>{comment.specieLiterara}</span>
                          </div>
                        )}
                        {comment.genLiterar && (
                          <div className="user-comment-view-meta-item">
                            <span className="user-comment-view-label">Gen literar:</span>
                            <span>{comment.genLiterar}</span>
                          </div>
                        )}
                        {comment.tip && (
                          <div className="user-comment-view-meta-item">
                            <span className="user-comment-view-label">Tip comentariu:</span>
                            <span>{TIP_COMENTARIU_LABELS[comment.tip] || comment.tip}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {(comment.teme || comment.motive) && (
                      <div className="user-comment-view-meta-row user-comment-view-meta-tags">
                        {comment.teme && (
                          <div className="user-comment-view-field-block">
                            <span className="user-comment-view-label">Teme:</span>
                            {isListLike(comment.teme) ? (
                              <div className="user-comment-view-tags">
                                {parseListField(comment.teme).map((item, i) => (
                                  <span key={i} className="user-comment-view-tag">{item}</span>
                                ))}
                              </div>
                            ) : (
                              <span className="user-comment-view-value">{comment.teme}</span>
                            )}
                          </div>
                        )}
                        {comment.motive && (
                          <div className="user-comment-view-field-block">
                            <span className="user-comment-view-label">Motive:</span>
                            {isListLike(comment.motive) ? (
                              <div className="user-comment-view-tags">
                                {parseListField(comment.motive).map((item, i) => (
                                  <span key={i} className="user-comment-view-tag">{item}</span>
                                ))}
                              </div>
                            ) : (
                              <span className="user-comment-view-value">{comment.motive}</span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    {(comment.viziune || comment.interpretare || (comment.descriere && !comment.teme && !comment.motive && !comment.viziune && !comment.interpretare)) && (
                      <div className="user-comment-view-meta-row user-comment-view-meta-descriptive">
                        {comment.viziune && (
                          <div className="user-comment-view-field-block">
                            <span className="user-comment-view-label">Viziune:</span>
                            <span className="user-comment-view-value">{comment.viziune}</span>
                          </div>
                        )}
                        {comment.interpretare && (
                          <div className="user-comment-view-field-block">
                            <span className="user-comment-view-label">Interpretare:</span>
                            <span className="user-comment-view-value">{comment.interpretare}</span>
                          </div>
                        )}
                        {comment.descriere && !comment.teme && !comment.motive && !comment.viziune && !comment.interpretare && (
                          <div className="user-comment-view-field-block">
                            <span className="user-comment-view-label">Descriere:</span>
                            <span className="user-comment-view-value">{comment.descriere}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
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

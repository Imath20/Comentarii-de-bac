import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '../assets/Layout';
import { getUserCommentBySlug } from '../firebase/userCommentsService';
import '../styles/style.scss';
import '../styles/comentarii.scss';
import '../styles/profile.scss';
import '../styles/userCommentViewModal.scss';

const TIP_COMENTARIU_LABELS = {
  general: 'Comentariu general',
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

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return 'N/A';
  }
};

const ShareableCommentView = () => {
  const { userId, slug } = useParams();
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const checkTheme = () => {
      setDarkTheme(document.body.classList.contains('dark-theme') || localStorage.getItem('theme') === 'dark');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!userId || !slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    let cancelled = false;
    getUserCommentBySlug(userId, slug)
      .then((c) => {
        if (cancelled) return;
        setComment(c || null);
        setNotFound(!c);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [userId, slug]);

  if (loading) {
    return (
      <Layout darkTheme={darkTheme} setDarkTheme={() => {}} scrolled={false}>
        <div className={`comentarii-page ${darkTheme ? 'dark-theme' : ''}`} style={{ padding: '3rem', textAlign: 'center' }}>
          Se încarcă...
        </div>
      </Layout>
    );
  }

  if (notFound || !comment) {
    return (
      <Layout darkTheme={darkTheme} setDarkTheme={() => {}} scrolled={false}>
        <div className={`comentarii-page profile-comentarii-page ${darkTheme ? 'dark-theme' : ''}`}>
          <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>
            <p style={{ marginBottom: '1rem' }}>Acest comentariu nu există sau este setat ca privat.</p>
            <Link to="/" className="profile-comentarii-back-link" style={{ display: 'inline-flex' }}>
              <ArrowLeft size={20} />
              Înapoi la prima pagină
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout darkTheme={darkTheme} setDarkTheme={() => {}} scrolled={false}>
      <div className={`comentarii-page profile-comentarii-page ${darkTheme ? 'dark-theme' : ''}`}>
        <div className="page-hero">
          <Link to="/" className="profile-comentarii-back-link">
            <ArrowLeft size={20} />
            Înapoi
          </Link>
        </div>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <article className={`user-comment-view-modal user-comment-view-shareable ${darkTheme ? 'dark-theme' : ''}`}>
            <h1 className="user-comment-view-title-shareable">
              {comment.titlu || (comment.type === 'text' ? 'Comentariu' : 'Imagine')}
            </h1>

            <div className="user-comment-view-body">
              {(comment.autor || comment.anAparitie || comment.curentLiterar || comment.specieLiterara || comment.genLiterar || comment.tip || comment.teme || comment.motive || comment.viziune || comment.interpretare) && (
                <div className="user-comment-view-meta">
                  <div className="user-comment-view-meta-toggle-wrap">
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
                    {(comment.viziune || comment.interpretare) && (
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
                      </div>
                    )}
                  </div>
                </div>
              )}

              {comment.type === 'image' ? (
                <div className="user-comment-view-image-wrap">
                  <img src={comment.content} alt="Comentariu" className="user-comment-view-image" />
                </div>
              ) : (
                <div className="user-comment-view-text">{comment.content}</div>
              )}

              {comment.createdAt && (
                <div className="user-comment-view-date">{formatDate(comment.createdAt)}</div>
              )}
            </div>
          </article>
        </div>
      </div>
    </Layout>
  );
};

export default ShareableCommentView;

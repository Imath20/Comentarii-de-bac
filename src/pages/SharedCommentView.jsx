import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import Layout from '../assets/Layout';
import { ArrowLeft, CopyPlus } from 'lucide-react';
import { getSharedComment } from '../firebase/sharedCommentsService';
import { addUserComment } from '../firebase/userCommentsService';
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

const SharedCommentView = () => {
  const { shareId } = useParams();
  const { currentUser } = useAuth();
  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToPersonal, setAddingToPersonal] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.body.classList.contains('dark-theme') || localStorage.getItem('theme') === 'dark';
      setDarkTheme(isDark);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    window.addEventListener('storage', checkTheme);
    return () => {
      observer.disconnect();
      window.removeEventListener('storage', checkTheme);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkTheme);
  }, [darkTheme]);

  useEffect(() => {
    if (!shareId) {
      setError('Link invalid');
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getSharedComment(shareId);
        if (!data) {
          setError('Comentariul partajat nu a fost găsit.');
        } else {
          setComment(data);
        }
      } catch (err) {
        console.error('Error loading shared comment:', err);
        setError('A apărut o eroare la încărcarea comentariului.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [shareId]);

  const handleAddToPersonal = async () => {
    if (!currentUser || !comment) return;
    setAddingToPersonal(true);
    setAddSuccess(false);
    try {
      const commentData = {
        type: comment.type || 'text',
        content: comment.content || '',
        titlu: comment.titlu || '',
        autor: comment.autor || '',
        anAparitie: comment.anAparitie || '',
        curentLiterar: comment.curentLiterar || '',
        specieLiterara: comment.specieLiterara || '',
        genLiterar: comment.genLiterar || '',
        categorie: comment.categorie || comment.specieLiterara || '',
        tip: comment.tip || 'general',
        teme: comment.teme || '',
        motive: comment.motive || '',
        viziune: comment.viziune || '',
        interpretare: comment.interpretare || '',
        descriere: comment.descriere || '',
        plan: comment.plan || 'free',
        isPublic: false,
      };
      await addUserComment(currentUser.uid, commentData);
      setAddSuccess(true);
    } catch (err) {
      console.error('Error adding to personal:', err);
    } finally {
      setAddingToPersonal(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ro-RO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return 'N/A';
    }
  };

  if (loading) {
    return (
      <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={false}>
        <div className={`comentarii-loading ${darkTheme ? 'dark-theme' : ''}`} style={{ padding: '3rem', textAlign: 'center' }}>
          Se încarcă...
        </div>
      </Layout>
    );
  }

  if (error || !comment) {
    return (
      <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={false}>
        <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <p className={darkTheme ? 'dark-theme' : ''} style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
            {error || 'Comentariul nu a fost găsit.'}
          </p>
          <Link to="/" className={`profile-comentarii-back-link ${darkTheme ? 'dark-theme' : ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={20} />
            Înapoi la pagina principală
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={true}>
      <div className="comentarii-page profile-comentarii-page">
        <div className="page-hero">
          <Link to="/" className="profile-comentarii-back-link">
            <ArrowLeft size={20} />
            Înapoi
          </Link>
          <h1 className="page-title">
            <span className="page-title-word">Comentariu</span>
            <span className="page-title-word"> partajat</span>
          </h1>
          <p className="page-desc">
            Acest comentariu a fost partajat cu tine. Poți să îl previzualizezi și să îl adaugi la comentariile tale personale.
          </p>
        </div>

        <div className="container">
          <div
            className={`user-comment-view-modal shared-comment-view-content ${darkTheme ? 'dark-theme' : ''}`}
            style={{ margin: '0 auto 2rem', maxWidth: 720 }}
          >
            <div className="user-comment-view-header" style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(169, 124, 80, 0.25)' }}>
              <h2 id="shared-comment-title">
                {comment.titlu || (comment.type === 'text' ? 'Comentariu' : 'Imagine')}
              </h2>
              <div className="user-comment-view-header-actions">
                {currentUser ? (
                  <button
                    type="button"
                    onClick={handleAddToPersonal}
                    disabled={addingToPersonal}
                    className="user-comment-view-action user-comment-view-action-add"
                    aria-label="Adaugă la comentariile mele"
                    title="Adaugă la comentariile mele"
                  >
                    {addingToPersonal ? (
                      <span className="profile-comentarii-duplicate-spinner" style={{ width: 18, height: 18 }} />
                    ) : addSuccess ? (
                      'Adăugat!'
                    ) : (
                      <>
                        <CopyPlus size={20} />
                        <span>Adaugă la comentariile mele</span>
                      </>
                    )}
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="user-comment-view-action user-comment-view-action-add"
                    style={{ textDecoration: 'none' }}
                  >
                    <CopyPlus size={20} />
                    <span>Autentifică-te pentru a adăuga</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="user-comment-view-body">
              {(comment.autor || comment.anAparitie || comment.curentLiterar || comment.specieLiterara || comment.genLiterar || comment.tip || comment.teme || comment.motive || comment.viziune || comment.interpretare || comment.descriere) && (
                <div className="user-comment-view-meta">
                  <div className="user-comment-view-meta-toggle-wrap">
                    <div className="user-comment-view-meta-toggle" style={{ cursor: 'default' }}>
                      <span>Informații operă</span>
                    </div>
                    <div>
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
                    </div>
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

              {comment.sharedAt && (
                <div className="user-comment-view-date">
                  Partajat: {formatDate(comment.sharedAt)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SharedCommentView;

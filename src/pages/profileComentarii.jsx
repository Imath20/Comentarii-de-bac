import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import Layout from '../assets/Layout';
import { ArrowLeft, FileText, Image, Trash2 } from 'lucide-react';
import { getUserComments, addUserComment, deleteUserComment } from '../firebase/userCommentsService';
import UserAddCommentModal from '../components/UserAddCommentModal';
import UserCommentViewModal from '../components/UserCommentViewModal';
import '../styles/style.scss';
import '../styles/comentarii.scss';
import '../styles/profile.scss';
import '../styles/userAddCommentModal.scss';
import '../styles/userCommentViewModal.scss';

const ProfileComentarii = () => {
  const { currentUser, userProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const [userComments, setUserComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewComment, setViewComment] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    if (authLoading) return;
    if (!currentUser) {
      navigate('/login');
      return;
    }
  }, [currentUser, navigate, authLoading]);

  useEffect(() => {
    if (!currentUser?.uid) return;

    const loadComments = async () => {
      setCommentsLoading(true);
      try {
        const comments = await getUserComments(currentUser.uid);
        setUserComments(comments);
      } catch (err) {
        console.error('Error loading comments:', err);
        setUserComments([]);
      } finally {
        setCommentsLoading(false);
      }
    };
    loadComments();
  }, [currentUser?.uid]);

  const filteredComments = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return userComments;
    return userComments.filter((c) => {
      const searchIn = [
        c.content || '',
        c.titlu || '',
        c.autor || '',
        c.descriere || '',
        c.categorie || '',
      ].join(' ').toLowerCase();
      return searchIn.includes(q);
    });
  }, [userComments, searchTerm]);

  const handleAddComment = async (commentData) => {
    await addUserComment(currentUser.uid, commentData);
    const comments = await getUserComments(currentUser.uid);
    setUserComments(comments);
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Ești sigur că vrei să ștergi acest comentariu?')) return;
    setDeletingId(commentId);
    try {
      await deleteUserComment(currentUser.uid, commentId);
      setUserComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error('Error deleting comment:', err);
    } finally {
      setDeletingId(null);
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

  if (authLoading || !currentUser) {
    if (authLoading) {
      return (
        <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={false}>
          <div className={`comentarii-loading ${darkTheme ? 'dark-theme' : ''}`} style={{ padding: '3rem', textAlign: 'center' }}>
            Se încarcă...
          </div>
        </Layout>
      );
    }
    return null;
  }

  return (
    <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled}>
      <div className="comentarii-page profile-comentarii-page">
        <div className="page-hero">
          <Link to="/profil" className="profile-comentarii-back-link">
            <ArrowLeft size={20} />
            Înapoi la profil
          </Link>
          <h1 className="page-title">
            {'Comentariile mele'.split(' ').map((word, wi) => (
              <span className="page-title-word" key={wi}>
                {word.split('').map((l, i) => <span key={i}>{l}</span>)}
              </span>
            ))}
          </h1>
          <p className="page-desc">
            Comentarii personale (text sau imagini) vizibile doar pentru tine. Adaugă, vizualizează și gestionează comentariile tale.
          </p>
        </div>

        <div className="container">
          <div className="comentarii-container">
            <div className="comentarii-search-section">
              <div className="comentarii-search-container">
                <div className={`comentarii-search-icon ${darkTheme ? 'dark-theme' : ''}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Caută în comentariile tale..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`comentarii-search-input ${darkTheme ? 'dark-theme' : ''}`}
                />
              </div>
            </div>

            <div className="comentarii-grid-container">
              {commentsLoading && filteredComments.length === 0 && (
                <div className={`comentarii-loading ${darkTheme ? 'dark-theme' : ''}`}>Se încarcă...</div>
              )}
              {filteredComments.map((comment) => (
                <div
                  key={comment.id}
                  role="button"
                  tabIndex={0}
                  className={`comentarii-card profile-comentarii-card profile-comentarii-card-clickable ${darkTheme ? 'dark-theme' : ''}`}
                  onClick={() => setViewComment(comment)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setViewComment(comment); } }}
                >
                  <div className={`comentarii-card-bg ${darkTheme ? 'dark-theme' : ''}`} />
                  <div className="comentarii-card-content">
                    <div className={`comentarii-card-profil profile-comentarii-badge ${darkTheme ? 'dark-theme' : ''}`}>
                      {comment.plan === 'premium' ? 'Premium' : comment.plan === 'pro' ? 'Pro' : 'GRATIS'}
                    </div>
                    <div className="comentarii-card-title profile-comentarii-card-title">
                      {comment.titlu || (comment.type === 'text' ? (comment.content?.slice(0, 60) + (comment.content?.length > 60 ? '...' : '')) : 'Imagine')}
                    </div>
                    <div className="comentarii-card-description profile-comentarii-card-text">
                      {comment.autor || comment.descriere
                        ? `${comment.autor || ''}${comment.descriere ? ` — ${comment.descriere}` : ''}`
                        : ''}
                      {comment.type === 'text' && !comment.autor && !comment.descriere ? comment.content : ''}
                    </div>
                    {comment.type === 'image' && (
                      <div className="profile-comentarii-card-image-wrap">
                        <img src={comment.content} alt="Comentariu" className="profile-comentarii-card-image" />
                      </div>
                    )}
                    <div className="comentarii-card-footer profile-comentarii-card-footer">
                      <div className={`comentarii-card-date ${darkTheme ? 'dark-theme' : ''}`}>
                        {comment.autor || formatDate(comment.createdAt)}
                      </div>
                      <div className="profile-comentarii-footer-right">
                        {comment.categorie && (
                          <div className={`comentarii-card-number ${darkTheme ? 'dark-theme' : ''}`}>
                            {comment.categorie}
                          </div>
                        )}
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleDeleteComment(comment.id); }}
                        disabled={deletingId === comment.id}
                        className="profile-comentarii-delete-btn"
                        title="Șterge"
                      >
                        {deletingId === comment.id ? (
                          <span className="profile-comentarii-delete-spinner" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {!commentsLoading && filteredComments.length === 0 && (
              <div className={`comentarii-no-results ${darkTheme ? 'dark-theme' : ''}`}>
                {userComments.length === 0
                  ? 'Nu ai comentarii încă. Apasă butonul + pentru a adăuga primul comentariu.'
                  : 'Nu s-au găsit comentarii după criteriile de căutare.'}
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`profile-comentarii-fab ${darkTheme ? 'dark-theme' : ''}`}
        onClick={() => setIsModalOpen(true)}
        aria-label="Adaugă comentariu"
        title="Adaugă comentariu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      <UserAddCommentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddComment}
        darkTheme={darkTheme}
        userDisplayName={userProfile?.displayName || currentUser?.displayName}
      />

      <UserCommentViewModal
        comment={viewComment}
        isOpen={!!viewComment}
        onClose={() => setViewComment(null)}
        darkTheme={darkTheme}
        formatDate={formatDate}
      />
    </Layout>
  );
};

export default ProfileComentarii;

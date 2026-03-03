import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import Layout from '../assets/Layout';
import { Edit, Mail, Calendar, User, Shield, FileText, LayoutDashboard } from 'lucide-react';
import { getProfileImageUrl } from '../utils/cloudinary';
import '../styles/style.scss';
import '../styles/profile.scss';

const Profile = () => {
  const { currentUser, userProfile, loadUserProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const [loading, setLoading] = useState(true);

  // Sync with theme changes from localStorage (when changed via Navbar)
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.body.classList.contains('dark-theme') || localStorage.getItem('theme') === 'dark';
      setDarkTheme(isDark);
    };
    
    // Check on mount
    checkTheme();
    
    // Observe body class changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    // Also listen to storage changes (for cross-tab sync)
    window.addEventListener('storage', checkTheme);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('storage', checkTheme);
    };
  }, []);

  useEffect(() => {
    if (authLoading) return; // Wait for auth to finish before redirecting
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Reload profile data
    const loadData = async () => {
      if (currentUser) {
        await loadUserProfile(currentUser.uid);
      }
      setLoading(false);
    };
    loadData();
  }, [currentUser, navigate, loadUserProfile, authLoading]);

  if (authLoading || !currentUser) {
    if (authLoading) {
      return (
        <div className="page-wrapper">
          <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
            <div className={`profile-loading ${darkTheme ? 'dark-theme' : ''}`}>
              <div className="profile-loading-text">Se încarcă...</div>
            </div>
          </Layout>
        </div>
      );
    }
    return null;
  }

  const displayName = userProfile?.displayName || currentUser.displayName || 'Utilizator';
  const email = userProfile?.email || currentUser.email || '';
  const photoURL = userProfile?.photoURL || currentUser.photoURL || '';
  const createdAt = userProfile?.createdAt || '';
  const bio = userProfile?.bio || '';
  const location = userProfile?.location || '';
  const school = userProfile?.school || '';
  const isAdmin = userProfile?.isAdmin === true;
  const isSemiAdmin = userProfile?.isSemiAdmin === true;
  const roleBadgeLabel = isAdmin ? 'Admin' : (isSemiAdmin ? 'Admin' : null);

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
      <div className="page-wrapper">
        <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
          <div className={`profile-loading ${darkTheme ? 'dark-theme' : ''}`}>
            <div className="profile-loading-text">
              Se încarcă...
            </div>
          </div>
        </Layout>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
        <div className={`profile-container ${darkTheme ? 'dark-theme' : ''}`}>
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-header-content">
              {/* Profile Image */}
              <div className="profile-image-wrapper">
                {photoURL ? (
                  <img
                    src={getProfileImageUrl(photoURL)}
                    alt={displayName}
                    className="profile-image"
                    onError={(e) => {
                      e.target.classList.add('hidden');
                      e.target.nextSibling.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`profile-image-placeholder ${photoURL ? 'hidden' : ''}`}>
                  {displayName.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Profile Info */}
              <div className="profile-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <h1 className="profile-name">
                    {displayName}
                  </h1>
                  {roleBadgeLabel && (
                    <div className="profile-admin-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '20px', background: darkTheme ? '#a97c50' : '#ffd591', color: darkTheme ? '#fff' : '#4e2e1e', fontSize: '0.9rem', fontWeight: 600 }}>
                      <Shield size={14} />
                      <span>{roleBadgeLabel}</span>
                    </div>
                  )}
                </div>
                <div className="profile-email">
                  <Mail size={16} />
                  <span>{email}</span>
                </div>
                {createdAt && (
                  <div className="profile-created-at">
                    <Calendar size={16} />
                    <span>Membru din {formatDate(createdAt)}</span>
                  </div>
                )}
              </div>

              {/* Edit Button */}
              <div className="profile-edit-buttons">
                <Link
                  to="/profil/edit"
                  className="profile-edit-button"
                >
                  <Edit size={18} />
                  <span>Editează profilul</span>
                </Link>
                <Link
                  to="/profil/comentarii"
                  className="profile-edit-button profile-comentarii-link"
                >
                  <FileText size={18} />
                  <span>Comentariile mele</span>
                </Link>
                {(isAdmin || isSemiAdmin) && (
                  <Link
                    to="/admin"
                    className="profile-edit-button profile-admin-dashboard-link"
                  >
                    <LayoutDashboard size={18} />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="profile-details">
            <h2 className="profile-details-title">
              <User size={24} />
              Informații personale
            </h2>

            <div className="profile-details-grid">
              {bio && (
                <div className="profile-detail-item">
                  <label className="profile-detail-label">
                    Despre mine
                  </label>
                  <p className="profile-detail-value">
                    {bio}
                  </p>
                </div>
              )}

              {location && (
                <div className="profile-detail-item">
                  <label className="profile-detail-label">
                    Locație
                  </label>
                  <p className="profile-detail-value">
                    {location}
                  </p>
                </div>
              )}

              {school && (
                <div className="profile-detail-item">
                  <label className="profile-detail-label">
                    Școală
                  </label>
                  <p className="profile-detail-value">
                    {school}
                  </p>
                </div>
              )}

              {!bio && !location && !school && (
                <p className="profile-details-empty">
                  Nu există informații suplimentare. Editează profilul pentru a adăuga detalii.
                </p>
              )}
            </div>
          </div>

        </div>
      </Layout>
    </div>
  );
};

export default Profile;


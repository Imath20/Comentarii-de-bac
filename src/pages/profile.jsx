import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import Layout from '../assets/Layout';
import { Edit, Mail, Calendar, User } from 'lucide-react';
import { getProfileImageUrl } from '../utils/cloudinary';
import '../styles/style.scss';
import '../styles/profile.scss';

const Profile = () => {
  const { currentUser, userProfile, loadUserProfile } = useAuth();
  const navigate = useNavigate();
  const [darkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [currentUser, navigate, loadUserProfile]);

  if (!currentUser) {
    return null;
  }

  const displayName = userProfile?.displayName || currentUser.displayName || 'Utilizator';
  const email = userProfile?.email || currentUser.email || '';
  const photoURL = userProfile?.photoURL || currentUser.photoURL || '';
  const createdAt = userProfile?.createdAt || '';
  const bio = userProfile?.bio || '';
  const location = userProfile?.location || '';
  const school = userProfile?.school || '';

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
        <Layout darkTheme={darkTheme} setDarkTheme={() => {}}>
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
      <Layout darkTheme={darkTheme} setDarkTheme={() => {}}>
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
                <h1 className="profile-name">
                  {displayName}
                </h1>
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
              <Link
                to="/profil/edit"
                className="profile-edit-button"
              >
                <Edit size={18} />
                <span>Editează profilul</span>
              </Link>
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


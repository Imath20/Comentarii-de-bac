import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import Layout from '../assets/Layout';
import { Edit, Mail, Calendar, User } from 'lucide-react';
import '../styles/style.scss';

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
          <div style={{
            minHeight: 'calc(100vh - 200px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              fontSize: '1.2rem',
              color: darkTheme ? '#ffd591' : '#7a3a00',
            }}>
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
        <div className="profile-container" style={{
          minHeight: 'calc(100vh - 200px)',
          padding: '2rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          {/* Profile Header */}
          <div className={`profile-header ${darkTheme ? 'dark-theme' : ''}`} style={{
            background: darkTheme
              ? 'rgba(47, 24, 0, 0.92)'
              : 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: darkTheme
              ? '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
              : '0 8px 32px 0 rgba(124, 79, 43, 0.2)',
            border: darkTheme
              ? '1px solid rgba(122, 58, 0, 0.3)'
              : '1px solid rgba(255, 179, 71, 0.3)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
            }}>
              {/* Profile Image */}
              <div style={{
                position: 'relative',
                flexShrink: 0,
              }}>
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt={displayName}
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: darkTheme
                        ? '3px solid rgba(255, 213, 145, 0.3)'
                        : '3px solid rgba(255, 179, 71, 0.3)',
                      boxShadow: darkTheme
                        ? '0 4px 16px rgba(0, 0, 0, 0.3)'
                        : '0 4px 16px rgba(124, 79, 43, 0.2)',
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: darkTheme
                      ? 'rgba(255, 213, 145, 0.1)'
                      : 'rgba(255, 179, 71, 0.1)',
                    display: photoURL ? 'none' : 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: darkTheme
                      ? '3px solid rgba(255, 213, 145, 0.3)'
                      : '3px solid rgba(255, 179, 71, 0.3)',
                    fontSize: '3rem',
                    color: darkTheme ? '#ffd591' : '#7a3a00',
                  }}
                >
                  {displayName.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Profile Info */}
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h1 className={`profile-name ${darkTheme ? 'dark-theme' : ''}`} style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  color: darkTheme ? '#ffd591' : '#7a3a00',
                }}>
                  {displayName}
                </h1>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  color: darkTheme ? 'rgba(255, 213, 145, 0.8)' : 'rgba(122, 58, 0, 0.8)',
                }}>
                  <Mail size={16} />
                  <span>{email}</span>
                </div>
                {createdAt && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: darkTheme ? 'rgba(255, 213, 145, 0.7)' : 'rgba(122, 58, 0, 0.7)',
                    fontSize: '0.9rem',
                  }}>
                    <Calendar size={16} />
                    <span>Membru din {formatDate(createdAt)}</span>
                  </div>
                )}
              </div>

              {/* Edit Button */}
              <Link
                to="/profil/edit"
                className={`profile-edit-button ${darkTheme ? 'dark-theme' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  background: darkTheme
                    ? 'rgba(255, 179, 71, 0.1)'
                    : 'rgba(255, 179, 71, 0.92)',
                  color: darkTheme ? '#ffb347' : '#7a3a00',
                  border: darkTheme
                    ? '1px solid rgba(255, 179, 71, 0.3)'
                    : '1px solid rgba(122, 58, 0, 0.2)',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = darkTheme
                    ? 'rgba(255, 179, 71, 0.2)'
                    : '#ffd591';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = darkTheme
                    ? 'rgba(255, 179, 71, 0.1)'
                    : 'rgba(255, 179, 71, 0.92)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Edit size={18} />
                <span>Editează profilul</span>
              </Link>
            </div>
          </div>

          {/* Profile Details */}
          <div className={`profile-details ${darkTheme ? 'dark-theme' : ''}`} style={{
            background: darkTheme
              ? 'rgba(47, 24, 0, 0.92)'
              : 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: darkTheme
              ? '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
              : '0 8px 32px 0 rgba(124, 79, 43, 0.2)',
            border: darkTheme
              ? '1px solid rgba(122, 58, 0, 0.3)'
              : '1px solid rgba(255, 179, 71, 0.3)',
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: darkTheme ? '#ffd591' : '#7a3a00',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <User size={24} />
              Informații personale
            </h2>

            <div style={{
              display: 'grid',
              gap: '1.5rem',
            }}>
              {bio && (
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    color: darkTheme ? 'rgba(255, 213, 145, 0.8)' : 'rgba(122, 58, 0, 0.8)',
                  }}>
                    Despre mine
                  </label>
                  <p style={{
                    color: darkTheme ? 'rgba(255, 213, 145, 0.9)' : 'rgba(122, 58, 0, 0.9)',
                    lineHeight: '1.6',
                  }}>
                    {bio}
                  </p>
                </div>
              )}

              {location && (
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    color: darkTheme ? 'rgba(255, 213, 145, 0.8)' : 'rgba(122, 58, 0, 0.8)',
                  }}>
                    Locație
                  </label>
                  <p style={{
                    color: darkTheme ? 'rgba(255, 213, 145, 0.9)' : 'rgba(122, 58, 0, 0.9)',
                  }}>
                    {location}
                  </p>
                </div>
              )}

              {school && (
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    color: darkTheme ? 'rgba(255, 213, 145, 0.8)' : 'rgba(122, 58, 0, 0.8)',
                  }}>
                    Școală
                  </label>
                  <p style={{
                    color: darkTheme ? 'rgba(255, 213, 145, 0.9)' : 'rgba(122, 58, 0, 0.9)',
                  }}>
                    {school}
                  </p>
                </div>
              )}

              {!bio && !location && !school && (
                <p style={{
                  color: darkTheme ? 'rgba(255, 213, 145, 0.7)' : 'rgba(122, 58, 0, 0.7)',
                  fontStyle: 'italic',
                }}>
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


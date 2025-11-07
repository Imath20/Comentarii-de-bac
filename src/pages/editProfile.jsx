import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import Layout from '../assets/Layout';
import { Save, ArrowLeft, User, Mail, MapPin, School, FileText } from 'lucide-react';
import '../styles/style.scss';

const EditProfile = () => {
  const { currentUser, userProfile, updateUserProfileData, profileLoading } = useAuth();
  const navigate = useNavigate();
  const [darkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    photoURL: '',
    bio: '',
    location: '',
    school: '',
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Initialize form with current data
    const displayName = userProfile?.displayName || currentUser.displayName || '';
    const email = userProfile?.email || currentUser.email || '';
    const photoURL = userProfile?.photoURL || currentUser.photoURL || '';
    
    setFormData({
      displayName,
      email,
      photoURL,
      bio: userProfile?.bio || '',
      location: userProfile?.location || '',
      school: userProfile?.school || '',
    });
    
    setLoading(false);
  }, [currentUser, userProfile, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      await updateUserProfileData(formData);
      setSuccess('Profilul a fost actualizat cu succes!');
      setTimeout(() => {
        navigate('/profil');
      }, 1500);
    } catch (err) {
      setError(err.message || 'A apărut o eroare la actualizarea profilului');
    } finally {
      setSaving(false);
    }
  };

  if (!currentUser || loading) {
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
        <div className="edit-profile-container" style={{
          minHeight: 'calc(100vh - 200px)',
          padding: '2rem',
          maxWidth: '700px',
          margin: '0 auto',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem',
          }}>
            <Link
              to="/profil"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: darkTheme
                  ? 'rgba(255, 179, 71, 0.1)'
                  : 'rgba(255, 179, 71, 0.1)',
                color: darkTheme ? '#ffb347' : '#7a3a00',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = darkTheme
                  ? 'rgba(255, 179, 71, 0.2)'
                  : 'rgba(255, 179, 71, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = darkTheme
                  ? 'rgba(255, 179, 71, 0.1)'
                  : 'rgba(255, 179, 71, 0.1)';
              }}
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: darkTheme ? '#ffd591' : '#7a3a00',
            }}>
              Editează profilul
            </h1>
          </div>

          {/* Form Card */}
          <div className={`edit-profile-card ${darkTheme ? 'dark-theme' : ''}`} style={{
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
            <form onSubmit={handleSubmit}>
              {/* Profile Image Preview */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '2rem',
              }}>
                <div style={{
                  position: 'relative',
                  marginBottom: '1rem',
                }}>
                  {formData.photoURL ? (
                    <img
                      src={formData.photoURL}
                      alt="Profile preview"
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
                        if (e.target.nextSibling) {
                          e.target.nextSibling.style.display = 'flex';
                        }
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
                      display: formData.photoURL ? 'none' : 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: darkTheme
                        ? '3px solid rgba(255, 213, 145, 0.3)'
                        : '3px solid rgba(255, 179, 71, 0.3)',
                      fontSize: '3rem',
                      color: darkTheme ? '#ffd591' : '#7a3a00',
                    }}
                  >
                    {formData.displayName.charAt(0).toUpperCase() || 'U'}
                  </div>
                </div>
                <label style={{
                  display: 'block',
                  width: '100%',
                  maxWidth: '400px',
                }}>
                  <span style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    color: darkTheme ? 'rgba(255, 213, 145, 0.8)' : 'rgba(122, 58, 0, 0.8)',
                  }}>
                    URL imagine profil
                  </span>
                  <input
                    type="url"
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      borderRadius: '8px',
                      border: darkTheme
                        ? '1px solid rgba(122, 58, 0, 0.3)'
                        : '1px solid rgba(122, 58, 0, 0.2)',
                      background: darkTheme
                        ? 'rgba(26, 13, 0, 0.5)'
                        : '#ffffff',
                      color: darkTheme ? '#ffd591' : '#7a3a00',
                      outline: 'none',
                    }}
                  />
                </label>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div style={{
                  background: 'rgba(255, 87, 87, 0.1)',
                  border: '1px solid rgba(255, 87, 87, 0.3)',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1.5rem',
                  color: '#ff5757',
                  fontSize: '0.9rem',
                }}>
                  {error}
                </div>
              )}

              {success && (
                <div style={{
                  background: 'rgba(76, 175, 80, 0.1)',
                  border: '1px solid rgba(76, 175, 80, 0.3)',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1.5rem',
                  color: '#4caf50',
                  fontSize: '0.9rem',
                }}>
                  {success}
                </div>
              )}

              {/* Form Fields */}
              <div style={{
                display: 'grid',
                gap: '1.5rem',
              }}>
                <label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    color: darkTheme ? 'rgba(255, 213, 145, 0.8)' : 'rgba(122, 58, 0, 0.8)',
                  }}>
                    <User size={16} />
                    Nume complet
                  </div>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      borderRadius: '8px',
                      border: darkTheme
                        ? '1px solid rgba(122, 58, 0, 0.3)'
                        : '1px solid rgba(122, 58, 0, 0.2)',
                      background: darkTheme
                        ? 'rgba(26, 13, 0, 0.5)'
                        : '#ffffff',
                      color: darkTheme ? '#ffd591' : '#7a3a00',
                      outline: 'none',
                    }}
                  />
                </label>

                <label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    color: darkTheme ? 'rgba(255, 213, 145, 0.8)' : 'rgba(122, 58, 0, 0.8)',
                  }}>
                    <Mail size={16} />
                    Email
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      borderRadius: '8px',
                      border: darkTheme
                        ? '1px solid rgba(122, 58, 0, 0.3)'
                        : '1px solid rgba(122, 58, 0, 0.2)',
                      background: darkTheme
                        ? 'rgba(26, 13, 0, 0.3)'
                        : 'rgba(122, 58, 0, 0.05)',
                      color: darkTheme ? 'rgba(255, 213, 145, 0.6)' : 'rgba(122, 58, 0, 0.6)',
                      outline: 'none',
                      cursor: 'not-allowed',
                    }}
                  />
                  <small style={{
                    display: 'block',
                    marginTop: '0.25rem',
                    fontSize: '0.8rem',
                    color: darkTheme ? 'rgba(255, 213, 145, 0.6)' : 'rgba(122, 58, 0, 0.6)',
                  }}>
                    Email-ul nu poate fi modificat
                  </small>
                </label>

                <label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    color: darkTheme ? 'rgba(255, 213, 145, 0.8)' : 'rgba(122, 58, 0, 0.8)',
                  }}>
                    <FileText size={16} />
                    Despre mine
                  </div>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Spune-ne ceva despre tine..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      borderRadius: '8px',
                      border: darkTheme
                        ? '1px solid rgba(122, 58, 0, 0.3)'
                        : '1px solid rgba(122, 58, 0, 0.2)',
                      background: darkTheme
                        ? 'rgba(26, 13, 0, 0.5)'
                        : '#ffffff',
                      color: darkTheme ? '#ffd591' : '#7a3a00',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                    }}
                  />
                </label>

                <label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    color: darkTheme ? 'rgba(255, 213, 145, 0.8)' : 'rgba(122, 58, 0, 0.8)',
                  }}>
                    <MapPin size={16} />
                    Locație
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Oraș, Țară"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      borderRadius: '8px',
                      border: darkTheme
                        ? '1px solid rgba(122, 58, 0, 0.3)'
                        : '1px solid rgba(122, 58, 0, 0.2)',
                      background: darkTheme
                        ? 'rgba(26, 13, 0, 0.5)'
                        : '#ffffff',
                      color: darkTheme ? '#ffd591' : '#7a3a00',
                      outline: 'none',
                    }}
                  />
                </label>

                <label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    color: darkTheme ? 'rgba(255, 213, 145, 0.8)' : 'rgba(122, 58, 0, 0.8)',
                  }}>
                    <School size={16} />
                    Școală
                  </div>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    placeholder="Numele școlii"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      borderRadius: '8px',
                      border: darkTheme
                        ? '1px solid rgba(122, 58, 0, 0.3)'
                        : '1px solid rgba(122, 58, 0, 0.2)',
                      background: darkTheme
                        ? 'rgba(26, 13, 0, 0.5)'
                        : '#ffffff',
                      color: darkTheme ? '#ffd591' : '#7a3a00',
                      outline: 'none',
                    }}
                  />
                </label>
              </div>

              {/* Submit Button */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '2rem',
              }}>
                <button
                  type="submit"
                  disabled={saving || profileLoading}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: (saving || profileLoading) ? 'not-allowed' : 'pointer',
                    background: darkTheme
                      ? 'rgba(255, 179, 71, 0.1)'
                      : 'rgba(255, 179, 71, 0.92)',
                    color: darkTheme ? '#ffb347' : '#7a3a00',
                    border: darkTheme
                      ? '1px solid rgba(255, 179, 71, 0.3)'
                      : '1px solid rgba(122, 58, 0, 0.2)',
                    transition: 'all 0.3s ease',
                    opacity: (saving || profileLoading) ? 0.6 : 1,
                  }}
                  onMouseOver={(e) => {
                    if (!saving && !profileLoading) {
                      e.currentTarget.style.background = darkTheme
                        ? 'rgba(255, 179, 71, 0.2)'
                        : '#ffd591';
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!saving && !profileLoading) {
                      e.currentTarget.style.background = darkTheme
                        ? 'rgba(255, 179, 71, 0.1)'
                        : 'rgba(255, 179, 71, 0.92)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {saving || profileLoading ? (
                    <>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: `2px solid ${darkTheme ? 'rgba(255, 179, 71, 0.3)' : 'rgba(122, 58, 0, 0.3)'}`,
                        borderTop: `2px solid ${darkTheme ? '#ffb347' : '#7a3a00'}`,
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                      }} />
                      <span>Se salvează...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>Salvează modificările</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default EditProfile;


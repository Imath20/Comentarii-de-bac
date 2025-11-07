import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import Layout from '../assets/Layout';
import { Save, ArrowLeft, User, Mail, MapPin, School, FileText } from 'lucide-react';
import '../styles/style.scss';
import '../styles/editProfile.scss';

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
          <div className={`edit-profile-loading ${darkTheme ? 'dark-theme' : ''}`}>
            <div className="edit-profile-loading-text">
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
        <div className={`edit-profile-container ${darkTheme ? 'dark-theme' : ''}`}>
          {/* Header */}
          <div className="edit-profile-header">
            <Link
              to="/profil"
              className="edit-profile-back-button"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="edit-profile-title">
              Editează profilul
            </h1>
          </div>

          {/* Form Card */}
          <div className="edit-profile-card">
            <form onSubmit={handleSubmit}>
              {/* Profile Image Preview */}
              <div className="edit-profile-image-preview">
                <div className="edit-profile-image-wrapper">
                  {formData.photoURL ? (
                    <img
                      src={formData.photoURL}
                      alt="Profile preview"
                      className="edit-profile-image"
                      onError={(e) => {
                        e.target.classList.add('hidden');
                        if (e.target.nextSibling) {
                          e.target.nextSibling.classList.remove('hidden');
                        }
                      }}
                    />
                  ) : null}
                  <div className={`edit-profile-image-placeholder ${formData.photoURL ? 'hidden' : ''}`}>
                    {formData.displayName.charAt(0).toUpperCase() || 'U'}
                  </div>
                </div>
                {/* <label className="edit-profile-image-label">
                  <span className="edit-profile-image-label-text">
                    URL imagine profil
                  </span>
                  <input
                    type="url"
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="edit-profile-input"
                  />
                </label> */}
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="edit-profile-message error">
                  {error}
                </div>
              )}

              {success && (
                <div className="edit-profile-message success">
                  {success}
                </div>
              )}

              {/* Form Fields */}
              <div className="edit-profile-form-fields">
                <label className="edit-profile-field">
                  <div className="edit-profile-field-label">
                    <User size={16} />
                    Nume complet
                  </div>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    required
                    className="edit-profile-input"
                  />
                </label>

                <label className="edit-profile-field">
                  <div className="edit-profile-field-label">
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
                    className="edit-profile-input edit-profile-input-disabled"
                  />
                  <small className="edit-profile-field-help">
                    Email-ul nu poate fi modificat
                  </small>
                </label>

                <label className="edit-profile-field">
                  <div className="edit-profile-field-label">
                    <FileText size={16} />
                    Despre mine
                  </div>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Spune-ne ceva despre tine..."
                    className="edit-profile-textarea"
                  />
                </label>

                <label className="edit-profile-field">
                  <div className="edit-profile-field-label">
                    <MapPin size={16} />
                    Locație
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Oraș, Țară"
                    className="edit-profile-input"
                  />
                </label>

                <label className="edit-profile-field">
                  <div className="edit-profile-field-label">
                    <School size={16} />
                    Școală
                  </div>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    placeholder="Numele școlii"
                    className="edit-profile-input"
                  />
                </label>
              </div>

              {/* Submit Button */}
              <div className="edit-profile-submit-container">
                <button
                  type="submit"
                  disabled={saving || profileLoading}
                  className="edit-profile-submit-button"
                >
                  {saving || profileLoading ? (
                    <>
                      <div className="edit-profile-spinner" />
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
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default EditProfile;


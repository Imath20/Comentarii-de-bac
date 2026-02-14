import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import Layout from '../assets/Layout';
import { Save, ArrowLeft, User, Mail, MapPin, School, FileText, Camera, X } from 'lucide-react';
import { getProfileImageUrl, uploadImageToCloudinary } from '../utils/cloudinary';
import '../styles/style.scss';
import '../styles/editProfile.scss';

// Crop circle size constants
const MIN_CROP_SIZE = 100;
const MAX_CROP_SIZE = 500;
const DEFAULT_CROP_SIZE = 300;
// Final output size
const FINAL_PROFILE_SIZE = 300;

const EditProfile = () => {
  const { currentUser, userProfile, updateUserProfileData, profileLoading, loading: authLoading } = useAuth();
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
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [cropImage, setCropImage] = useState(null);
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
  const [cropSize, setCropSize] = useState(DEFAULT_CROP_SIZE);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState('grab');
  const fileInputRef = React.useRef(null);
  const cropContainerRef = React.useRef(null);
  const imagePreviewRef = React.useRef(null);

  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    photoURL: '',
    bio: '',
    location: '',
    school: '',
  });

  useEffect(() => {
    if (authLoading) return;
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
  }, [currentUser, userProfile, navigate, authLoading]);

  // Add global mouse event listeners for dragging
  useEffect(() => {
    if (isDragging || isResizing) {
      const handleMouseMove = (e) => {
        if (!cropContainerRef.current || !imagePreviewRef.current) return;

        const containerRect = cropContainerRef.current.getBoundingClientRect();
        const imgRect = imagePreviewRef.current.getBoundingClientRect();

        if (isResizing) {
          // Resize mode: calculate distance from center to mouse
          const centerX = cropPosition.x + cropSize / 2;
          const centerY = cropPosition.y + cropSize / 2;
          const mouseX = e.clientX - containerRect.left;
          const mouseY = e.clientY - containerRect.top;
          
          // Calculate distance from center
          const distance = Math.sqrt(
            Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
          );
          
          // New size is twice the distance (radius * 2)
          const newSize = Math.max(MIN_CROP_SIZE, Math.min(MAX_CROP_SIZE, distance * 2));
          
          // Keep center fixed, adjust position
          const newX = Math.max(0, Math.min(centerX - newSize / 2, imgRect.width - newSize));
          const newY = Math.max(0, Math.min(centerY - newSize / 2, imgRect.height - newSize));
          
          setCropSize(newSize);
          setCropPosition({ x: newX, y: newY });
        } else {
          // Move mode
          let newX = e.clientX - containerRect.left - dragStart.x;
          let newY = e.clientY - containerRect.top - dragStart.y;

          // Constrain to image bounds
          newX = Math.max(0, Math.min(newX, imgRect.width - cropSize));
          newY = Math.max(0, Math.min(newY, imgRect.height - cropSize));

          setCropPosition({ x: newX, y: newY });
        }
      };
      const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, cropSize, cropPosition]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
    setSuccess('');
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Te rog selectează o imagine validă');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setError('Imaginea trebuie să fie mai mică de 10MB');
      return;
    }

    // Create image preview URL
    const reader = new FileReader();
    reader.onload = (event) => {
      setCropImage(event.target.result);
      setShowCropModal(true);
      // Reset crop position and size
      setCropSize(DEFAULT_CROP_SIZE);
      setIsDragging(false);
      setIsResizing(false);
      setCursorType('grab');
      setTimeout(() => {
        if (imagePreviewRef.current && cropContainerRef.current) {
          const img = imagePreviewRef.current;
          const imgRect = img.getBoundingClientRect();
          setCropPosition({
            x: (imgRect.width - DEFAULT_CROP_SIZE) / 2,
            y: (imgRect.height - DEFAULT_CROP_SIZE) / 2,
          });
        }
      }, 100);
    };
    reader.readAsDataURL(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCropMouseMove = (e) => {
    if (!cropContainerRef.current) return;
    
    const containerRect = cropContainerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;
    
    // Calculate distance from center of circle
    const centerX = cropPosition.x + cropSize / 2;
    const centerY = cropPosition.y + cropSize / 2;
    const distance = Math.sqrt(
      Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
    );
    
    // Check if near edge (within 20px of the circle edge)
    const radius = cropSize / 2;
    const edgeThreshold = 20;
    const isNearEdge = Math.abs(distance - radius) < edgeThreshold;
    
    if (isNearEdge && !isDragging && !isResizing) {
      setCursorType('nwse-resize');
    } else if (!isDragging && !isResizing) {
      setCursorType('grab');
    }
  };

  const handleCropMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!cropContainerRef.current) return;
    
    const containerRect = cropContainerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;
    
    // Calculate distance from center of circle
    const centerX = cropPosition.x + cropSize / 2;
    const centerY = cropPosition.y + cropSize / 2;
    const distance = Math.sqrt(
      Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
    );
    
    // Check if near edge (within 20px of the circle edge)
    const radius = cropSize / 2;
    const edgeThreshold = 20;
    const isNearEdge = Math.abs(distance - radius) < edgeThreshold;
    
    if (isNearEdge) {
      // Start resizing
      setIsResizing(true);
      setCursorType('nwse-resize');
    } else {
      // Start moving
      setIsDragging(true);
      setDragStart({
        x: e.clientX - containerRect.left - cropPosition.x,
        y: e.clientY - containerRect.top - cropPosition.y,
      });
      setCursorType('grabbing');
    }
  };


  const handleCropMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setCursorType('grab');
  };

  const handleCropWheel = (e) => {
    e.preventDefault();
    if (!imagePreviewRef.current) return;

    const img = imagePreviewRef.current;
    const imgRect = img.getBoundingClientRect();
    const delta = e.deltaY > 0 ? -20 : 20; // Scroll down = smaller, scroll up = larger
    const newSize = Math.max(MIN_CROP_SIZE, Math.min(MAX_CROP_SIZE, cropSize + delta));

    // Calculate the center point of the current crop circle
    const centerX = cropPosition.x + cropSize / 2;
    const centerY = cropPosition.y + cropSize / 2;

    // Calculate new position to keep the center point fixed
    const newX = Math.max(0, Math.min(centerX - newSize / 2, imgRect.width - newSize));
    const newY = Math.max(0, Math.min(centerY - newSize / 2, imgRect.height - newSize));

    setCropSize(newSize);
    setCropPosition({ x: newX, y: newY });
  };

  const cropAndUploadImage = async () => {
    if (!cropImage || !imagePreviewRef.current) return;

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const img = imagePreviewRef.current;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const scale = img.naturalWidth / img.width;

      canvas.width = FINAL_PROFILE_SIZE;
      canvas.height = FINAL_PROFILE_SIZE;

      // Draw circular crop
      ctx.beginPath();
      ctx.arc(FINAL_PROFILE_SIZE / 2, FINAL_PROFILE_SIZE / 2, FINAL_PROFILE_SIZE / 2, 0, 2 * Math.PI);
      ctx.clip();

      // Draw the cropped portion (scale from crop circle size to final size)
      ctx.drawImage(
        img,
        cropPosition.x * scale,
        cropPosition.y * scale,
        cropSize * scale,
        cropSize * scale,
        0,
        0,
        FINAL_PROFILE_SIZE,
        FINAL_PROFILE_SIZE
      );

      // Convert to blob and upload
      canvas.toBlob(async (blob) => {
        if (!blob) {
          setError('A apărut o eroare la procesarea imaginii');
          setUploading(false);
          return;
        }

        try {
          const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
          const uploadedUrl = await uploadImageToCloudinary(file, 'profile-pictures');

          setFormData(prev => ({
            ...prev,
            photoURL: uploadedUrl,
          }));

          setSuccess('Imaginea a fost încărcată cu succes!');
          setShowCropModal(false);
          setCropImage(null);
        } catch (err) {
          console.error('Upload error:', err);
          setError(err.message || 'A apărut o eroare la încărcarea imaginii');
        } finally {
          setUploading(false);
        }
      }, 'image/jpeg', 0.95);
    } catch (err) {
      console.error('Crop error:', err);
      setError('A apărut o eroare la procesarea imaginii');
      setUploading(false);
    }
  };

  const handleCancelCrop = () => {
    setShowCropModal(false);
    setCropImage(null);
    setCropPosition({ x: 0, y: 0 });
    setCropSize(DEFAULT_CROP_SIZE);
    setIsDragging(false);
    setIsResizing(false);
    setCursorType('grab');
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

  if (authLoading || !currentUser || loading) {
    if (authLoading) {
      return (
        <div className="page-wrapper">
          <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
            <div className={`edit-profile-loading ${darkTheme ? 'dark-theme' : ''}`}>
              <div className="edit-profile-loading-text">Se încarcă...</div>
            </div>
          </Layout>
        </div>
      );
    }
    return (
      <div className="page-wrapper">
        <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
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
      <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
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
                <div 
                  className="edit-profile-image-wrapper"
                  onMouseEnter={() => setIsHoveringImage(true)}
                  onMouseLeave={() => setIsHoveringImage(false)}
                  onClick={handleImageClick}
                  style={{ cursor: 'pointer' }}
                >
                  {formData.photoURL ? (
                    <img
                      src={getProfileImageUrl(formData.photoURL, { size: 120, circle: true })}
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
                  
                  {/* Hover Overlay */}
                  <div className={`edit-profile-image-overlay ${isHoveringImage ? 'visible' : ''}`}>
                    {uploading ? (
                      <div className="edit-profile-upload-spinner" />
                    ) : (
                      <>
                        <Camera size={24} />
                        <span>Schimbă imaginea</span>
                      </>
                    )}
                  </div>
                  
                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
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
                  {/* <small className="edit-profile-field-help">
                    Email-ul nu poate fi modificat
                  </small> */}
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

        {/* Crop Modal */}
        {showCropModal && (
          <div className={`edit-profile-crop-modal ${darkTheme ? 'dark-theme' : ''}`}>
            <div className="edit-profile-crop-modal-content">
              <div className="edit-profile-crop-modal-header">
                <h2>Selectează zona pentru imaginea de profil</h2>
                <button
                  type="button"
                  onClick={handleCancelCrop}
                  className="edit-profile-crop-modal-close"
                  disabled={uploading}
                >
                  <X size={20} />
                </button>
              </div>

              <div 
                className="edit-profile-crop-preview-container"
                ref={cropContainerRef}
                onWheel={handleCropWheel}
              >
                <img
                  ref={imagePreviewRef}
                  src={cropImage}
                  alt="Crop preview"
                  className="edit-profile-crop-preview-image"
                  onLoad={() => {
                    // Center crop on image load
                    if (imagePreviewRef.current) {
                      const img = imagePreviewRef.current;
                      setCropSize(DEFAULT_CROP_SIZE);
                      setCropPosition({
                        x: (img.width - DEFAULT_CROP_SIZE) / 2,
                        y: (img.height - DEFAULT_CROP_SIZE) / 2,
                      });
                    }
                  }}
                />
                <div
                  className="edit-profile-crop-circle"
                  style={{
                    left: `${cropPosition.x}px`,
                    top: `${cropPosition.y}px`,
                    width: `${cropSize}px`,
                    height: `${cropSize}px`,
                    cursor: cursorType,
                  }}
                  onMouseDown={handleCropMouseDown}
                  onMouseMove={handleCropMouseMove}
                  onMouseLeave={() => {
                    if (!isDragging && !isResizing) {
                      setCursorType('grab');
                    }
                  }}
                />
              </div>

              <div className="edit-profile-crop-modal-actions">
                <button
                  type="button"
                  onClick={handleCancelCrop}
                  className="edit-profile-crop-cancel-button"
                  disabled={uploading}
                >
                  Anulează
                </button>
                <button
                  type="button"
                  onClick={cropAndUploadImage}
                  className="edit-profile-crop-save-button"
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <div className="edit-profile-spinner" />
                      <span>Se procesează...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>Salvează</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default EditProfile;


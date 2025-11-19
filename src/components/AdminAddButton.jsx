import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import '../styles/adminAddButton.scss';

const AdminAddButton = ({ darkTheme, type = 'comentarii' }) => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  // Only show if user is admin
  if (!userProfile || (!userProfile.isAdmin && !userProfile.isSemiAdmin)) {
    return null;
  }

  const handleClick = () => {
    // Navigate to admin page with the appropriate tab
    if (type === 'subiecte') {
      navigate('/admin?tab=subiecte');
    } else if (type === 'filme') {
      navigate('/admin?tab=filme');
    } else {
      navigate('/admin?tab=comentarii');
    }
  };

  return (
    <button
      className={`admin-add-button ${darkTheme ? 'dark-theme' : ''}`}
      onClick={handleClick}
      aria-label={`Adaugă ${type === 'subiecte' ? 'subiect' : type === 'filme' ? 'film' : 'comentariu'}`}
      title={`Adaugă ${type === 'subiecte' ? 'subiect' : type === 'filme' ? 'film' : 'comentariu'}`}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  );
};

export default AdminAddButton;


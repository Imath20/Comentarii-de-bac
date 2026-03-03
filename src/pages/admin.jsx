import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../assets/Layout';
import AdminDashboard from '../components/AdminDashboard';
import { useAuth } from '../firebase/AuthContext';
import '../styles/style.scss';
import '../styles/admin.scss';

const Admin = () => {
  const { currentUser, userProfile, loadUserProfile } = useAuth();
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [initialCommentData, setInitialCommentData] = useState(null);
  const [addFromUserComment, setAddFromUserComment] = useState(false);
  const [initialSubjectData, setInitialSubjectData] = useState(null);

  // Force reload profile when accessing admin page to ensure isAdmin is up to date
  useEffect(() => {
    if (currentUser) {
      loadUserProfile(currentUser.uid, false).catch(error => {
        console.error('Error reloading profile:', error);
      });
    }
  }, [currentUser, loadUserProfile]);

  // Parse comment data from URL params
  useEffect(() => {
    const editParam = searchParams.get('edit');
    const addFromUser = searchParams.get('addFromUser') === '1';
    if (editParam) {
      try {
        const decoded = decodeURIComponent(editParam);
        const commentData = JSON.parse(decoded);
        setInitialCommentData(commentData);
        setAddFromUserComment(addFromUser);
      } catch (error) {
        console.error('Error parsing comment data from URL:', error);
        setInitialCommentData(null);
        setAddFromUserComment(false);
      }
    } else {
      setInitialCommentData(null);
      setAddFromUserComment(false);
    }
  }, [searchParams]);

  // Parse subject data from URL params
  useEffect(() => {
    const editSubiectParam = searchParams.get('editSubiect');
    if (editSubiectParam) {
      try {
        const decoded = decodeURIComponent(editSubiectParam);
        const subjectData = JSON.parse(decoded);
        setInitialSubjectData(subjectData);
      } catch (error) {
        console.error('Error parsing subject data from URL:', error);
        setInitialSubjectData(null);
      }
    } else {
      setInitialSubjectData(null);
    }
  }, [searchParams]);

  // Check if user has admin or semi-admin rights
  useEffect(() => {
    if (currentUser && userProfile) {
      const hasAdminAccess = userProfile.isAdmin === true || userProfile.isSemiAdmin === true;
      if (hasAdminAccess) {
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Nu ai permisiuni suficiente pentru a accesa panoul de administrare.');
        setIsAuthenticated(false);
      }
    } else if (currentUser && !userProfile) {
      // Profile is still loading, wait a bit
      const timer = setTimeout(() => {
        if (!userProfile) {
          setError('Se încarcă profilul...');
        }
      }, 2000);
      return () => clearTimeout(timer);
    } else if (!currentUser) {
      setError('Trebuie să te autentifici pentru a accesa panoul de administrare.');
      setIsAuthenticated(false);
    }
  }, [currentUser, userProfile]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Navigate to the appropriate page based on the active tab
    const tabParam = searchParams.get('tab');
    if (tabParam === 'subiecte') {
      navigate('/subiecte');
    } else {
      navigate('/comentarii');
    }
  };

  useEffect(() => {
    document.body.classList.add('theme-transitioning');
    document.body.classList.toggle('dark-theme', darkTheme);
    localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
    const t = setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 400);
    return () => clearTimeout(t);
  }, [darkTheme]);

  if (isAuthenticated) {
    return (
      <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
        <AdminDashboard 
          darkTheme={darkTheme} 
          onLogout={handleLogout} 
          initialCommentData={initialCommentData}
          addFromUserComment={addFromUserComment}
          initialSubjectData={initialSubjectData}
        />
      </Layout>
    );
  }

  if (!currentUser) {
    return (
      <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
        <div className="admin-login-container">
          <div className="admin-login-card">
            <h1 className="admin-login-title">Panou de Administrare</h1>
            <p className="admin-login-subtitle">
              Trebuie să te autentifici pentru a accesa panoul de administrare
            </p>

            {error && (
              <div className="admin-login-error">
                {error}
              </div>
            )}

            <button 
              onClick={() => navigate('/login')} 
              className="admin-submit-button"
            >
              Autentifică-te
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
        <div className="admin-login-container">
          <div className="admin-login-card">
            <h1 className="admin-login-title">Panou de Administrare</h1>
            <p className="admin-login-subtitle">
              Nu ai permisiuni de administrator
            </p>

            {error && (
              <div className="admin-login-error">
                {error}
              </div>
            )}

            <button 
              onClick={() => navigate('/')} 
              className="admin-submit-button"
            >
              Înapoi la pagina principală
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return null;
};

export default Admin;


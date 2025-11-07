import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import Layout from '../assets/Layout';
import '../styles/style.scss';

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError(err.message || 'A apărut o eroare la autentificare');
    } finally {
      setLoading(false);
    }
  };

  const [darkTheme] = useState(() => localStorage.getItem('theme') === 'dark');

  return (
    <div className="page-wrapper">
      <Layout darkTheme={darkTheme} setDarkTheme={() => {}}>
        <div className="login-container" style={{
          minHeight: 'calc(100vh - 200px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}>
          <div className={`login-card ${darkTheme ? 'dark-theme' : ''}`} style={{
            background: darkTheme 
              ? 'rgba(47, 24, 0, 0.92)' 
              : 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '3rem',
            boxShadow: darkTheme
              ? '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
              : '0 8px 32px 0 rgba(124, 79, 43, 0.2)',
            maxWidth: '450px',
            width: '100%',
            border: darkTheme
              ? '1px solid rgba(122, 58, 0, 0.3)'
              : '1px solid rgba(255, 179, 71, 0.3)',
          }}>
            <h1 className={`login-title ${darkTheme ? 'dark-theme' : ''}`} style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: darkTheme ? '#ffd591' : '#7a3a00',
              textAlign: 'center',
            }}>
              Autentificare
            </h1>
            <p className={`login-subtitle ${darkTheme ? 'dark-theme' : ''}`} style={{
              fontSize: '1rem',
              color: darkTheme ? 'rgba(255, 213, 145, 0.8)' : 'rgba(122, 58, 0, 0.8)',
              textAlign: 'center',
              marginBottom: '2rem',
            }}>
              Conectează-te pentru a accesa toate funcționalitățile platformei
            </p>

            {error && (
              <div className="login-error" style={{
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

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className={`login-google-button ${darkTheme ? 'dark-theme' : ''}`}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: '8px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                background: darkTheme
                  ? 'rgba(255, 255, 255, 0.1)'
                  : '#ffffff',
                color: darkTheme ? '#ffd591' : '#7a3a00',
                border: darkTheme
                  ? '1px solid rgba(255, 213, 145, 0.3)'
                  : '1px solid rgba(122, 58, 0, 0.2)',
                transition: 'all 0.3s ease',
                opacity: loading ? 0.6 : 1,
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = darkTheme
                    ? 'rgba(255, 255, 255, 0.15)'
                    : '#f5f5f5';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = darkTheme
                    ? 'rgba(255, 255, 255, 0.1)'
                    : '#ffffff';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: `3px solid ${darkTheme ? 'rgba(255, 213, 145, 0.3)' : 'rgba(122, 58, 0, 0.3)'}`,
                    borderTop: `3px solid ${darkTheme ? '#ffd591' : '#7a3a00'}`,
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                  <span>Se conectează...</span>
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continuă cu Google</span>
                </>
              )}
            </button>

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

export default Login;


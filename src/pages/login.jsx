import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import Layout from '../assets/Layout';
import '../styles/style.scss';

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { loginWithGoogle, loginWithEmailPassword, signUpWithEmailPassword, currentUser } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleEmailPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      
      if (isSignUp) {
        await signUpWithEmailPassword(email, password, displayName);
      } else {
        await loginWithEmailPassword(email, password);
      }
      
      navigate('/');
    } catch (err) {
      let errorMessage = 'A apărut o eroare la autentificare';
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'Utilizatorul nu există. Încearcă să te înregistrezi.';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Parolă incorectă.';
      } else if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'Acest email este deja înregistrat. Conectează-te.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Parola trebuie să aibă cel puțin 6 caractere.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Email invalid.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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

  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');

  return (
    <div className="page-wrapper">
      <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
        <div className="login-container">
          <div className="login-card">
            <h1 className="login-title">
              Autentificare
            </h1>
            <p className="login-subtitle">
              Conectează-te pentru a accesa toate funcționalitățile platformei
            </p>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <form onSubmit={handleEmailPasswordSubmit} className="login-email-form">
              {isSignUp && (
                <div className="login-form-group">
                  <label htmlFor="displayName">Nume</label>
                  <input
                    type="text"
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Introdu numele tău"
                    disabled={loading}
                    className="login-input"
                  />
                </div>
              )}
              
              <div className="login-form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="introdu@email.com"
                  required
                  disabled={loading}
                  className="login-input"
                />
              </div>

              <div className="login-form-group">
                <label htmlFor="password">Parolă</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introdu parola"
                  required
                  disabled={loading}
                  className="login-input"
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="login-email-button"
              >
                {loading ? (
                  <>
                    <div className="login-spinner" />
                    <span>{isSignUp ? 'Se înregistrează...' : 'Se conectează...'}</span>
                  </>
                ) : (
                  <span>{isSignUp ? 'Înregistrează-te' : 'Conectează-te'}</span>
                )}
              </button>

              <div className="login-toggle">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                  }}
                  className="login-toggle-button"
                  disabled={loading}
                >
                  {isSignUp 
                    ? 'Ai deja cont? Conectează-te' 
                    : 'Nu ai cont? Înregistrează-te'}
                </button>
              </div>
            </form>

            <div className="login-divider">
              <span>sau</span>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="login-google-button"
            >
              {loading ? (
                <>
                  <div className="login-spinner" />
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
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Login;


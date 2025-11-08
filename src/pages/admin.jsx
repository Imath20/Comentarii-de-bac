import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../assets/Layout';
import AdminDashboard from '../components/AdminDashboard';
import '../styles/style.scss';
import '../styles/admin.scss';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const navigate = useNavigate();

  // Check if already authenticated (stored in sessionStorage)
  useEffect(() => {
    const adminAuth = sessionStorage.getItem('adminAuthenticated');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setError('');

    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    
    if (!adminPassword) {
      setError('Parola admin nu este configurată. Contactează administratorul.');
      return;
    }

    if (password === adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuthenticated', 'true');
    } else {
      setError('Parolă incorectă. Încearcă din nou.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuthenticated');
    setPassword('');
    navigate('/');
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
        <AdminDashboard darkTheme={darkTheme} onLogout={handleLogout} />
      </Layout>
    );
  }

  return (
    <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
      <div className="admin-login-container">
        <div className="admin-login-card">
          <h1 className="admin-login-title">Panou de Administrare</h1>
          <p className="admin-login-subtitle">
            Introdu parola pentru a accesa panoul de administrare
          </p>

          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="admin-login-form">
            <div className="admin-form-group">
              <label htmlFor="admin-password">Parolă</label>
              <input
                type="password"
                id="admin-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Introdu parola"
                required
                className="admin-input"
                autoFocus
              />
            </div>

            <button type="submit" className="admin-submit-button">
              Accesează panoul
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;


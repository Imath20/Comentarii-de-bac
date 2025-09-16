import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../assets/Layout';
import '../styles/style.scss';
import '../styles/ai.scss';

export default function AI() {
  const location = useLocation();
  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [inputType, setInputType] = useState('text');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    solution: '',
    rubric: ''
  });

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkTheme);
    localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prefill via navigation state (from SubiectModal "Verifică cu AI")
  useEffect(() => {
    const prefill = location && location.state && location.state.prefill ? location.state.prefill : null;
    if (!prefill) return;

    if (prefill.inputType) {
      setInputType(prefill.inputType);
    }

    setFormData(prev => ({
      ...prev,
      rubric: prefill.rubric || prev.rubric,
    }));
  }, [location]);

  const handleInputTypeChange = (newType) => {
    if (newType === inputType || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Add slide-out animation
    const currentElement = document.querySelector(`.ai-field-textarea, .ai-image-upload`);
    if (currentElement) {
      currentElement.classList.add('slide-out');
    }
    
    // Wait for slide-out animation, then change type and slide-in
    setTimeout(() => {
      setInputType(newType);
      
      setTimeout(() => {
        const newElement = document.querySelector(`.ai-field-textarea, .ai-image-upload`);
        if (newElement) {
          newElement.classList.add('slide-in');
        }
        
        setTimeout(() => {
          setIsTransitioning(false);
          // Remove animation classes
          const elements = document.querySelectorAll('.ai-field-textarea, .ai-image-upload');
          elements.forEach(el => {
            el.classList.remove('slide-out', 'slide-in');
          });
        }, 400);
      }, 50);
    }, 400);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.solution.trim() || !formData.rubric.trim()) {
      return;
    }
    
    setIsLoading(true);
    setEvaluation(null);

    try {
      // Try different approaches to avoid CORS
      const response = await fetch('https://6000-firebase-studio-1755154591324.cluster-axf5tvtfjjfekvhwxwkkkzsk2y.cloudworkstations.dev/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin,
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify({
          ...formData,
          inputType
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setEvaluation(result);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      
      // Try alternative approach without CORS
      try {
        console.log('Trying alternative approach...');
        const response2 = await fetch('https://6000-firebase-studio-1755154591324.cluster-axf5tvtfjjfekvhwxwkkkzsk2y.cloudworkstations.dev/evaluate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            inputType
          }),
        });

        if (response2.ok) {
          const result = await response2.json();
          setEvaluation(result);
          return;
        }
      } catch (error2) {
        console.error('Alternative approach also failed:', error2);
      }
      
      // Check if it's a CORS error
      if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
        setEvaluation({
          error: 'Eroare CORS: Serverul AI nu permite cereri de la această origine. Pentru a rezolva această problemă, serverul AI trebuie să adauge header-ul "Access-Control-Allow-Origin: *" sau să permită cereri de la localhost:5173.'
        });
      } else {
        setEvaluation({
          error: 'A apărut o eroare la evaluarea lucrării. Vă rugăm să încercați din nou sau să contactați administratorul.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          [field]: event.target.result
        }));
      };
      if (file.type && file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    }
  };

  return (
    <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled}>
      
      <div className="page-hero">
        <h1 className="page-title">
          {'Evaluator Lucrări AI'.split(' ').map((word, wi) => (
            <span className="page-title-word" key={wi}>
              {word.split('').map((l, i) => <span key={i}>{l}</span>)}
            </span>
          ))}
        </h1>
        <p className="page-desc">Introduceți rezolvarea și baremul pentru a primi un punctaj estimativ, feedback și sfaturi de îmbunătățire</p>
      </div>

      <div className="container">
        <div className="ai-container">
          {/* Main Form Section */}
          <div className={`ai-main-section ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
            <div className="ai-header">
              <h2 className="ai-main-title">Evaluator Lucrări AI</h2>
              <p className="ai-subtitle">Introduceți rezolvarea și baremul pentru a primi un punctaj estimativ, feedback și sfaturi de îmbunătățire</p>
              
            </div>
            
            <form onSubmit={handleSubmit} className="ai-form">
              {/* Input Type Selector */}
              <div className="ai-input-type-selector">
                <button
                  type="button"
                  onClick={() => handleInputTypeChange('text')}
                  className={`ai-type-tab ${darkTheme ? 'dark-theme' : ''} ${inputType === 'text' ? 'active' : ''}`}
                  disabled={isTransitioning}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                  Text
                </button>
                <button
                  type="button"
                  onClick={() => handleInputTypeChange('image')}
                  className={`ai-type-tab ${darkTheme ? 'dark-theme' : ''} ${inputType === 'image' ? 'active' : ''}`}
                  disabled={isTransitioning}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7,10 12,15 17,10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Imagine
                </button>
              </div>

              {/* Solution Input */}
              <div className="ai-form-group">
                <label className="ai-field-label">
                  Rezolvarea ta {inputType === 'text' ? '(text)' : '(imagine)'}
                </label>
                <div className="ai-input-container">
                  {inputType === 'text' ? (
                    <textarea
                      name="solution"
                      value={formData.solution}
                      onChange={handleInputChange}
                      placeholder="Scrie sau lipește aici textul rezolvării tale..."
                      className={`ai-field-textarea ${darkTheme ? 'dark-theme' : ''}`}
                      rows="12"
                      required
                    />
                  ) : (
                    <div className="ai-image-upload">
                      <label htmlFor="solution-image" className={`ai-image-label ${darkTheme ? 'dark-theme' : ''}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="7,10 12,15 17,10"/>
                          <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Încarcă imaginea rezolvării
                      </label>
                      <input
                        type="file"
                        id="solution-image"
                        accept="image/*"
                        className="ai-file-input"
                        onChange={(e) => handleFileUpload(e, 'solution')}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Rubric Input */}
              <div className="ai-form-group">
                <label className="ai-field-label">
                  Barem de corectare
                </label>
                <div className="ai-input-container">
                  <textarea
                    name="rubric"
                    value={formData.rubric}
                    onChange={handleInputChange}
                    placeholder="Lipește aici baremul oficial..."
                    className={`ai-field-textarea ${darkTheme ? 'dark-theme' : ''}`}
                    rows="8"
                    required
                  />
                </div>
                <p className="ai-field-description">
                  Introduceți baremul complet pentru o evaluare cât mai corectă.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !formData.solution.trim() || !formData.rubric.trim() || isTransitioning}
                className={`ai-submit-btn ${darkTheme ? 'dark-theme' : ''} ${isLoading ? 'loading' : ''}`}
              >
                {isLoading ? (
                  <>
                    <div className="ai-loading-spinner"></div>
                    <span>Se evaluează...</span>
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13"/>
                      <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                    </svg>
                    <span>Evaluează Lucrarea</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          {evaluation && (
            <div className={`ai-results-section ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
              <div className="ai-results-header">
                <h2 className="ai-results-title">Rezultatele evaluării</h2>
                <div className="ai-results-icon">✨</div>
              </div>
              
              {evaluation.error ? (
                <div className="ai-error">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  {evaluation.error}
                </div>
              ) : (
                <div className="ai-evaluation-results">
                  {evaluation.score && (
                    <div className="ai-score-section">
                      <div className="ai-score-header">
                        <h3 className="ai-score-title">Punctaj obținut</h3>
                        <div className="ai-score-badge">Evaluat</div>
                      </div>
                      <div className="ai-score-display">
                        <span className="ai-score-number">{evaluation.score}</span>
                        <span className="ai-score-max">/ 10</span>
                      </div>
                      <div className="ai-score-bar">
                        <div 
                          className="ai-score-progress" 
                          style={{ width: `${(evaluation.score / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {evaluation.feedback && (
                    <div className="ai-feedback-section">
                      <div className="ai-section-header">
                        <h3 className="ai-feedback-title">Feedback detaliat</h3>
                        <div className="ai-section-icon">💡</div>
                      </div>
                      <div className="ai-feedback-content">
                        {evaluation.feedback}
                      </div>
                    </div>
                  )}
                  
                  {evaluation.suggestions && (
                    <div className="ai-suggestions-section">
                      <div className="ai-section-header">
                        <h3 className="ai-suggestions-title">Sugestii de îmbunătățire</h3>
                        <div className="ai-section-icon">🚀</div>
                      </div>
                      <div className="ai-suggestions-content">
                        {evaluation.suggestions}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </Layout>
  );
}

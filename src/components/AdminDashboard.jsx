import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addComentariu, updateComentariu } from '../firebase/comentariiService';
import { addSubiect } from '../firebase/subiecteService';
import RichTextEditor from './RichTextEditor';
import '../styles/admin.scss';

const AdminDashboard = ({ darkTheme, onLogout, initialCommentData }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('comentarii');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Comentariu form state
  const [comentariuForm, setComentariuForm] = useState({
    id: '',
    titlu: '',
    autor: '',
    categorie: '',
    plan: 'free',
    descriere: '',
    content: [], // Changed from text to content (array of blocks)
  });

  // Populate form when initialCommentData is provided
  useEffect(() => {
    if (initialCommentData) {
      setIsEditing(true);
      setComentariuForm({
        id: initialCommentData.id || '',
        titlu: initialCommentData.titlu || '',
        autor: initialCommentData.autor || '',
        categorie: initialCommentData.categorie || '',
        plan: initialCommentData.plan || 'free',
        descriere: initialCommentData.descriere || '',
        content: initialCommentData.content || (initialCommentData.text ? [{ type: 'paragraph', text: initialCommentData.text }] : []),
      });
      setActiveTab('comentarii');
    }
  }, [initialCommentData]);

  // Subiect form state
  const [subiectForm, setSubiectForm] = useState({
    titlu: '',
    descriere: '',
    numarSubiect: '1',
    subpunct: '',
    profil: 'real',
    data: '',
    an: new Date().getFullYear(),
    sesiune: 'sesiune de vară',
    tip: 'analiza',
    text: '',
    cerinte: '',
    punctaj: '',
  });

  const categorii = [
    'poezie', 'roman', 'comedie', 'basm', 'nuvela', 
    'critica', 'memorii', 'poveste', 'schita'
  ];

  const handleComentariuSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Validate content - at least one paragraph must have text
      if (!comentariuForm.content || comentariuForm.content.length === 0) {
        throw new Error('Trebuie să adaugi cel puțin un paragraf cu text');
      }

      const hasText = comentariuForm.content.some(block => 
        block.text && block.text.trim().length > 0
      );

      if (!hasText) {
        throw new Error('Trebuie să adaugi text în cel puțin un paragraf');
      }

      if (isEditing) {
        // Update existing comentariu
        if (!comentariuForm.id) {
          throw new Error('ID-ul comentariului este obligatoriu pentru editare');
        }

        await updateComentariu({
          ...comentariuForm,
        });

        setMessage({ type: 'success', text: 'Comentariul a fost actualizat cu succes!' });
        
        // Navigate to comentarii page after successful update
        setTimeout(() => {
          navigate('/comentarii');
        }, 500);
      } else {
        // Add new comentariu
        // Generate ID if not provided
        const id = comentariuForm.id || 
          `${comentariuForm.autor.toLowerCase().replace(/\s+/g, '-')}-${comentariuForm.titlu.toLowerCase().replace(/\s+/g, '-')}`;

        await addComentariu({
          ...comentariuForm,
          id,
        });

        setMessage({ type: 'success', text: 'Comentariul a fost adăugat cu succes!' });
      }

      // Reset form after successful submit (only if not editing, as we navigate away)
      if (!isEditing) {
        setComentariuForm({
          id: '',
          titlu: '',
          autor: '',
          categorie: '',
          plan: 'free',
          descriere: '',
          content: [],
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'adding'} comentariu:`, error);
      setMessage({ type: 'error', text: `Eroare: ${error.message || `Nu s-a putut ${isEditing ? 'actualiza' : 'adăuga'} comentariul`}` });
    } finally {
      setLoading(false);
    }
  };

  const handleSubiectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Parse cerinte and punctaj from textarea (one per line)
      const cerinte = subiectForm.cerinte
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
      
      const punctaj = subiectForm.punctaj
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

      await addSubiect({
        ...subiectForm,
        an: parseInt(subiectForm.an) || new Date().getFullYear(),
        numarSubiect: parseInt(subiectForm.numarSubiect) || 1,
        cerinte,
        punctaj,
      });

      setMessage({ type: 'success', text: 'Subiectul a fost adăugat cu succes!' });
      setSubiectForm({
        titlu: '',
        descriere: '',
        numarSubiect: '1',
        subpunct: '',
        profil: 'real',
        data: '',
        an: new Date().getFullYear(),
        sesiune: 'sesiune de vară',
        tip: 'analiza',
        text: '',
        cerinte: '',
        punctaj: '',
      });
    } catch (error) {
      console.error('Error adding subiect:', error);
      setMessage({ type: 'error', text: `Eroare: ${error.message || 'Nu s-a putut adăuga subiectul'}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h1>Panou de Administrare</h1>
        <button onClick={onLogout} className="admin-logout-button">
          Ieșire
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'comentarii' ? 'active' : ''}`}
          onClick={() => setActiveTab('comentarii')}
        >
          Adaugă Comentariu
        </button>
        <button
          className={`admin-tab ${activeTab === 'subiecte' ? 'active' : ''}`}
          onClick={() => setActiveTab('subiecte')}
        >
          Adaugă Subiect
        </button>
      </div>

      {message.text && (
        <div className={`admin-message ${message.type}`}>
          {message.text}
        </div>
      )}

      {activeTab === 'comentarii' && (
        <form onSubmit={handleComentariuSubmit} className="admin-form">
          <h2>{isEditing ? 'Editează Comentariu' : 'Adaugă Comentariu'}</h2>
          
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="comentariu-id">ID {isEditing ? '(nu poate fi modificat)' : '(opțional, se generează automat)'}</label>
              <input
                type="text"
                id="comentariu-id"
                value={comentariuForm.id}
                onChange={(e) => setComentariuForm({ ...comentariuForm, id: e.target.value })}
                placeholder="eminescu-luceafarul"
                className="admin-input"
                disabled={isEditing}
                style={isEditing ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="comentariu-plan">Plan</label>
              <select
                id="comentariu-plan"
                value={comentariuForm.plan}
                onChange={(e) => setComentariuForm({ ...comentariuForm, plan: e.target.value })}
                className="admin-select"
              >
                <option value="free">Free</option>
                <option value="pro">Pro</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="comentariu-titlu">Titlu *</label>
            <input
              type="text"
              id="comentariu-titlu"
              value={comentariuForm.titlu}
              onChange={(e) => setComentariuForm({ ...comentariuForm, titlu: e.target.value })}
              placeholder="Luceafărul — comentariu"
              required
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="comentariu-autor">Autor *</label>
            <input
              type="text"
              id="comentariu-autor"
              value={comentariuForm.autor}
              onChange={(e) => setComentariuForm({ ...comentariuForm, autor: e.target.value })}
              placeholder="Mihai Eminescu"
              required
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="comentariu-categorie">Categorie *</label>
            <select
              id="comentariu-categorie"
              value={comentariuForm.categorie}
              onChange={(e) => setComentariuForm({ ...comentariuForm, categorie: e.target.value })}
              required
              className="admin-select"
            >
              <option value="">Selectează categoria</option>
              {categorii.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="admin-form-group">
            <label htmlFor="comentariu-descriere">Descriere</label>
            <input
              type="text"
              id="comentariu-descriere"
              value={comentariuForm.descriere}
              onChange={(e) => setComentariuForm({ ...comentariuForm, descriere: e.target.value })}
              placeholder="Teme, motive, viziune, specii și interpretare succintă."
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="comentariu-content">Text complet *</label>
            <RichTextEditor
              value={comentariuForm.content}
              onChange={(content) => setComentariuForm({ ...comentariuForm, content })}
              darkTheme={darkTheme}
            />
          </div>

          <button type="submit" disabled={loading} className="admin-submit-button">
            {loading ? (isEditing ? 'Se actualizează...' : 'Se adaugă...') : (isEditing ? 'Actualizează Comentariu' : 'Adaugă Comentariu')}
          </button>
        </form>
      )}

      {activeTab === 'subiecte' && (
        <form onSubmit={handleSubiectSubmit} className="admin-form">
          <h2>Adaugă Subiect</h2>
          
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="subiect-titlu">Titlu *</label>
              <input
                type="text"
                id="subiect-titlu"
                value={subiectForm.titlu}
                onChange={(e) => setSubiectForm({ ...subiectForm, titlu: e.target.value })}
                placeholder="Părintele Geticei"
                required
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="subiect-numarSubiect">Număr Subiect *</label>
              <select
                id="subiect-numarSubiect"
                value={subiectForm.numarSubiect}
                onChange={(e) => setSubiectForm({ ...subiectForm, numarSubiect: e.target.value })}
                required
                className="admin-select"
              >
                <option value="1">Subiect 1</option>
                <option value="2">Subiect 2</option>
                <option value="3">Subiect 3</option>
              </select>
            </div>
          </div>

          {subiectForm.numarSubiect === '1' && (
            <div className="admin-form-group">
              <label htmlFor="subiect-subpunct">Subpunct (A/B)</label>
              <select
                id="subiect-subpunct"
                value={subiectForm.subpunct}
                onChange={(e) => setSubiectForm({ ...subiectForm, subpunct: e.target.value })}
                className="admin-select"
              >
                <option value="">Selectează subpunctul</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
          )}

          <div className="admin-form-group">
            <label htmlFor="subiect-descriere">Descriere *</label>
            <input
              type="text"
              id="subiect-descriere"
              value={subiectForm.descriere}
              onChange={(e) => setSubiectForm({ ...subiectForm, descriere: e.target.value })}
              placeholder="Citește urmatorul fragment..."
              required
              className="admin-input"
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="subiect-profil">Profil *</label>
              <select
                id="subiect-profil"
                value={subiectForm.profil}
                onChange={(e) => setSubiectForm({ ...subiectForm, profil: e.target.value })}
                required
                className="admin-select"
              >
                <option value="real">Real</option>
                <option value="uman">Uman</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label htmlFor="subiect-data">Data *</label>
              <input
                type="text"
                id="subiect-data"
                value={subiectForm.data}
                onChange={(e) => setSubiectForm({ ...subiectForm, data: e.target.value })}
                placeholder="2025"
                required
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="subiect-an">An *</label>
              <input
                type="number"
                id="subiect-an"
                value={subiectForm.an}
                onChange={(e) => setSubiectForm({ ...subiectForm, an: e.target.value })}
                placeholder="2025"
                required
                className="admin-input"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="subiect-sesiune">Sesiune *</label>
              <select
                id="subiect-sesiune"
                value={subiectForm.sesiune}
                onChange={(e) => setSubiectForm({ ...subiectForm, sesiune: e.target.value })}
                required
                className="admin-select"
              >
                <option value="sesiune de vară">Sesiune de vară</option>
                <option value="sesiune specială">Sesiune specială</option>
                <option value="sesiune de toamnă">Sesiune de toamnă</option>
                <option value="model">Model</option>
                <option value="rezervă">Rezervă</option>
                <option value="simulare">Simulare</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label htmlFor="subiect-tip">Tip *</label>
              <select
                id="subiect-tip"
                value={subiectForm.tip}
                onChange={(e) => setSubiectForm({ ...subiectForm, tip: e.target.value })}
                required
                className="admin-select"
              >
                <option value="analiza">Analiză</option>
                <option value="eseu">Eseu</option>
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="subiect-text">Text complet *</label>
            <textarea
              id="subiect-text"
              value={subiectForm.text}
              onChange={(e) => setSubiectForm({ ...subiectForm, text: e.target.value })}
              placeholder="Textul complet al subiectului..."
              required
              rows={10}
              className="admin-textarea"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="subiect-cerinte">Cerințe (câte una pe linie) *</label>
            <textarea
              id="subiect-cerinte"
              value={subiectForm.cerinte}
              onChange={(e) => setSubiectForm({ ...subiectForm, cerinte: e.target.value })}
              placeholder="Indică sensul din text al cuvântului prielnic&#10;Evidențiază o trăsătură a personajului..."
              required
              rows={5}
              className="admin-textarea"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="subiect-punctaj">Punctaj (câte unul pe linie sau array format)</label>
            <textarea
              id="subiect-punctaj"
              value={subiectForm.punctaj}
              onChange={(e) => setSubiectForm({ ...subiectForm, punctaj: e.target.value })}
              placeholder="Total: 10&#10;Conținut: 6&#10;Redactare: 4"
              rows={5}
              className="admin-textarea"
            />
          </div>

          <button type="submit" disabled={loading} className="admin-submit-button">
            {loading ? 'Se adaugă...' : 'Adaugă Subiect'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminDashboard;


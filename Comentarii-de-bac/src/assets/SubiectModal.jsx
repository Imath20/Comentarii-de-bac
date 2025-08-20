import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/subiectModal.scss';

export default function SubiectModal({ isOpen, subiect, darkTheme, onClose }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const getLongText = (s) => {
        if (!s) return '';
        if (s.text && typeof s.text === 'string') return s.text;
        return '';
    };

    const getCerințe = (s) => {
        if (!s) return [];
        if (Array.isArray(s.cerinte) && s.cerinte.length > 0) return s.cerinte;
        return [];
    };

    if (!isOpen) return null;

    return (
        <div className={`subiecte-modal-overlay ${darkTheme ? 'dark-theme' : ''}`} onClick={onClose}>
            <div className={`subiecte-modal ${darkTheme ? 'dark-theme' : ''}`} onClick={(e) => e.stopPropagation()}>
                <button className={`subiecte-modal-close ${darkTheme ? 'dark-theme' : ''}`} onClick={onClose} aria-label="Închide">×</button>
                <div className="subiecte-modal-content">
                    <div className="subiecte-modal-left">
                        <div className="subiecte-modal-header">
                            <div className="subiecte-modal-title">{subiect?.titlu}</div>
                            <div className="subiecte-modal-meta">
                                {subiect?.numarSubiect === 1 ? `Subiect 1 - ${subiect?.subpunct}` : `Subiect ${subiect?.numarSubiect}`} • {subiect?.profil?.toUpperCase?.()} • {subiect?.data}
                            </div>
                        </div>
                        <div className={`subiecte-modal-text ${darkTheme ? 'dark-theme' : ''}`}>
                            {getLongText(subiect) ? getLongText(subiect).split('\n').map((p, i) => (
                                <p key={i}>{p}</p>
                            )) : (
                                <div className="subiecte-modal-empty">Nu există text asociat acestui subiect.</div>
                            )}
                        </div>
                    </div>
                    <div className="subiecte-modal-right">
                        <div className="subiecte-cerinte-header">Cerințe</div>
                        <ol className={`subiecte-cerinte-list ${darkTheme ? 'dark-theme' : ''}`}>
                            {getCerințe(subiect).map((c, i) => (
                                <li key={i}>{c}</li>
                            ))}
                        </ol>
                        <div className="subiecte-modal-actions">
                            <button
                                className={`subiecte-ai-btn ${darkTheme ? 'dark-theme' : ''}`}
                                onClick={() => {
                                    navigate('/ai');
                                }}
                            >
                                Verifică cu AI
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



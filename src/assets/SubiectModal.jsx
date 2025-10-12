import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/subiectModal.scss';

export default function SubiectModal({ isOpen, subiect, darkTheme, onClose }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            // Store current scroll position
            const scrollY = window.scrollY;
            
            // Prevent background scroll by fixing the body
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
            
            // Store scroll position for restoration
            document.body.setAttribute('data-modal-scroll-y', scrollY.toString());
            
            return () => {
                // Restore scroll position and body styles when modal closes
                const savedScrollY = parseInt(document.body.getAttribute('data-modal-scroll-y') || '0');
                
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                
                document.body.removeAttribute('data-modal-scroll-y');
                
                // Restore scroll position
                window.scrollTo(0, savedScrollY);
            };
        }
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

    const getPunctaj = (s) => {
        if (!s) return [];
        if (Array.isArray(s.punctaj) && s.punctaj.length > 0) return s.punctaj;
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
                        <div className="subiecte-modal-right-content">
                            <div className="subiecte-cerinte-header">Cerințe</div>
                            <ol className={`subiecte-cerinte-list ${darkTheme ? 'dark-theme' : ''}`}>
                                {getCerințe(subiect).map((c, i) => (
                                    <li key={i}>{c}</li>
                                ))}
                            </ol>
                            {getPunctaj(subiect).length > 0 && (
                                <>
                                    <div className="subiecte-punctaj-header">Punctaj</div>
                                    <ol className={`subiecte-punctaj-list ${darkTheme ? 'dark-theme' : ''}`}>
                                        {getPunctaj(subiect).map((p, i) => (
                                            <li key={i}>{p} puncte</li>
                                        ))}
                                    </ol>
                                </>
                            )}
                        </div>
                        <div className="subiecte-modal-actions">
                            <button
                                className={`subiecte-ai-btn ${darkTheme ? 'dark-theme' : ''}`}
                                onClick={() => {
                                    // Construim un barem precompletat din cerințe și punctaj
                                    const cerinte = getCerințe(subiect);
                                    const punctaj = getPunctaj(subiect);
                                    const cerinteText = cerinte.length
                                        ? cerinte
                                            .map((c, idx) => {
                                                const pts = punctaj[idx] != null ? ` - ${punctaj[idx]} puncte` : '';
                                                return `${idx + 1}. ${c.trim()}${pts}`;
                                            })
                                            .join('\n')
                                        : '';

                                    const longText = getLongText(subiect)?.trim?.() || '';

                                    const rubricText = [
                                        cerinteText ? `Cerințe și punctaj:\n${cerinteText}` : '',
                                        longText ? `\n\nText pentru context:\n${longText}` : ''
                                    ]
                                        .filter(Boolean)
                                        .join('');

                                    navigate('/ai', {
                                        state: {
                                            prefill: {
                                                inputType: 'image',
                                                rubric: rubricText,
                                                // Trimitem și obiectul complet pentru extensii viitoare
                                                subiect
                                            }
                                        }
                                    });
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



import React, { useEffect } from 'react';
import '../styles/comentariiModal.scss';

export default function ComentariiModal({ isOpen, comentariu, darkTheme, onClose }) {
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

    if (!isOpen) return null;

    return (
        <div className={`comentarii-modal-overlay ${darkTheme ? 'dark-theme' : ''}`} onClick={onClose}>
            <div className={`comentarii-modal ${darkTheme ? 'dark-theme' : ''}`} onClick={(e) => e.stopPropagation()}>
                <button className={`comentarii-modal-close ${darkTheme ? 'dark-theme' : ''}`} onClick={onClose} aria-label="Închide">×</button>
                <div className="comentarii-modal-content">
                    <div className="comentarii-modal-header">
                        <div className="comentarii-modal-title">{comentariu?.titlu}</div>
                        <div className="comentarii-modal-meta">
                            {comentariu?.autor} • {comentariu?.categorie?.toUpperCase?.()} • {comentariu?.plan === 'premium' ? 'Premium' : comentariu?.plan === 'pro' ? 'Pro' : 'Free'}
                        </div>
                    </div>
                    <div className={`comentarii-modal-text ${darkTheme ? 'dark-theme' : ''}`}>
                        {comentariu?.text ? (
                            comentariu.text.split('\n').map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))
                        ) : (
                            <div className="comentarii-modal-empty">Nu există text disponibil pentru acest comentariu.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import { deleteSubiect } from '../firebase/subiecteService';
import { Trash2, Edit } from 'lucide-react';
import '../styles/subiectModal.scss';

export default function SubiectModal({ isOpen, subiect, darkTheme, onClose, onDelete }) {
    const navigate = useNavigate();
    const { currentUser, userProfile } = useAuth();
    const [isDeleting, setIsDeleting] = useState(false);
    const isAdmin = userProfile?.isAdmin === true;
    const isSemiAdmin = userProfile?.isSemiAdmin === true;
    const ownerId = subiect?.createdBy;
    const isOwner = !!(ownerId && currentUser?.uid === ownerId);
    const canEdit = isAdmin || (isSemiAdmin && isOwner);
    const canDelete = isAdmin;

    const handleDelete = async () => {
        if (!subiect?.id || !canDelete) {
            // If subject doesn't have an ID (from static file), show error
            alert('Acest subiect nu poate fi șters deoarece nu are un ID. Doar subiectele adăugate prin panoul de administrare pot fi șterse.');
            return;
        }
        
        const confirmed = window.confirm('Ești sigur că vrei să ștergi acest subiect? Această acțiune nu poate fi anulată.');
        if (!confirmed) return;

        setIsDeleting(true);
        try {
            await deleteSubiect(subiect.id);
            if (onDelete) {
                onDelete(subiect.id);
            }
            onClose();
        } catch (error) {
            console.error('Error deleting subiect:', error);
            alert('Eroare la ștergerea subiectului. Te rog încearcă din nou.');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleEdit = () => {
        if (!subiect?.id || !canEdit) {
            // If subject doesn't have an ID, show error
            alert('Acest subiect nu poate fi editat deoarece nu are un ID. Doar subiectele adăugate prin panoul de administrare pot fi editate.');
            return;
        }
        
        // Encode subject data as URL parameter
        const subjectData = encodeURIComponent(JSON.stringify(subiect));
        onClose();
        navigate(`/admin?editSubiect=${subjectData}`);
    };

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

    // Check if subiect is old (profil real AND an >= 2020 AND an < 2026)
    const isOldSubiect = (s) => {
        // Subiect vechi = profil "real" ȘI an >= 2020 ȘI an < 2026
        const profil = s?.profil?.toLowerCase?.() || '';
        const an = s?.an ? parseInt(s.an) : null;
        const data = s?.data ? parseInt(s.data) : null;
        const numarSubiect = s?.numarSubiect ?? s?.numar ?? null;
        const numarStr = numarSubiect != null ? String(numarSubiect) : '';
        
        // Folosim an sau data (care este disponibil)
        const subiectAn = an || data;

        // Subiectul 3 la profil uman acceptă mereu newlines, indiferent de an
        if (profil === 'uman' && numarStr === '3') {
            return true;
        }

        // Dacă este profil real și an între [2020, 2026), este vechi
        const isProfilReal = profil === 'real';
        const isProfilUmanEligible = profil === 'uman' && subiectAn && subiectAn >= 2021 && subiectAn < 2026;
        return isProfilReal || isProfilUmanEligible;
    };

    // Procesăm textul, păstrând și paragrafele goale rezultate din secvențe duble de \n sau /n
    const splitIntoParagraphs = (textValue) => {
        return textValue.split('\n').map((p) => {
            const trimmed = p.trim();
            // Folosim NBSP pentru a menține paragraful vizibil și când e gol
            return trimmed.length > 0 ? trimmed : '\u00A0';
        });
    };

    // Process text for display
    const getProcessedText = (s) => {
        const text = getLongText(s);
        if (!text) return [];
        
        // Subiectele vechi (profil real + an >= 2020) și Subiect 3 UMAN: recunosc Enter-ul ca newline
        if (isOldSubiect(s)) {
            // Acceptăm atât Enter, cât și secvențe scrise manual \n sau /n
            const normalized = text.replace(/(\\n|\/n|\r?\n)/g, '\n');
            return splitIntoParagraphs(normalized);
        } else {
            // Subiectele noi: NU recunosc Enter-ul, doar \n sau /n scrise manual
            const withoutRealNewlines = text.replace(/\r?\n/g, ' ');
            const normalized = withoutRealNewlines.replace(/(\\n|\/n)/g, '\n');
            return splitIntoParagraphs(normalized);
        }
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
                            {getLongText(subiect) ? getProcessedText(subiect).map((p, i) => (
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
                        {(canEdit || canDelete) && (
                            <div className="subiecte-modal-admin-footer">
                                {canEdit && (
                                  <button
                                      onClick={handleEdit}
                                      className={`subiecte-modal-edit ${darkTheme ? 'dark-theme' : ''}`}
                                      title="Editează subiectul"
                                  >
                                      <Edit size={16} />
                                      Editează subiectul
                                  </button>
                                )}
                                {canDelete && (
                                  <button
                                      onClick={handleDelete}
                                      disabled={isDeleting}
                                      className={`subiecte-modal-delete ${darkTheme ? 'dark-theme' : ''}`}
                                      title="Șterge subiectul"
                                  >
                                      <Trash2 size={16} />
                                      {isDeleting ? 'Se șterge...' : 'Șterge subiectul'}
                                  </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}



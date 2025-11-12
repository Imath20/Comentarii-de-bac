import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import { deleteComentariu } from '../firebase/comentariiService';
import { Trash2, Edit } from 'lucide-react';
import '../styles/comentariiModal.scss';

export default function ComentariiModal({ isOpen, comentariu, darkTheme, onClose, onDelete }) {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const isAdmin = userProfile?.isAdmin === true;

  const handleDelete = async () => {
    if (!comentariu?.id) return;
    
    const confirmed = window.confirm('Ești sigur că vrei să ștergi acest comentariu? Această acțiune nu poate fi anulată.');
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await deleteComentariu(comentariu.id);
      if (onDelete) {
        onDelete(comentariu.id);
      }
      onClose();
    } catch (error) {
      console.error('Error deleting comentariu:', error);
      alert('Eroare la ștergerea comentariului. Te rog încearcă din nou.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    if (!comentariu?.id) return;
    
    // Encode comment data as URL parameter
    const commentData = encodeURIComponent(JSON.stringify(comentariu));
    onClose();
    navigate(`/admin?edit=${commentData}`);
  };
    const renderContent = () => {
        // Check if content is structured (new format) or plain text (old format)
        if (comentariu?.content && Array.isArray(comentariu.content) && comentariu.content.length > 0) {
            // New structured format
            return comentariu.content.map((block, blockIndex) => {
                if (block.type === 'paragraph') {
                    const renderTextWithFormatting = () => {
                        if (!block.text) return null;
                        
                        // Collect all breakpoints (start and end positions of all formats)
                        const breakpoints = new Set([0, block.text.length]);
                        
                        // Add breakpoints from highlights
                        (block.highlights || []).forEach(h => {
                            breakpoints.add(h.start);
                            breakpoints.add(h.end);
                        });
                        
                        // Add breakpoints from underlines
                        (block.underlines || []).forEach(u => {
                            breakpoints.add(u.start);
                            breakpoints.add(u.end);
                        });
                        
                        // Add breakpoints from formats
                        (block.formats || []).forEach(f => {
                            breakpoints.add(f.start);
                            breakpoints.add(f.end);
                        });
                        
                        // Convert to sorted array
                        const sortedBreakpoints = Array.from(breakpoints).sort((a, b) => a - b);
                        
                        // Build segments
                        const segments = [];
                        for (let i = 0; i < sortedBreakpoints.length - 1; i++) {
                            const start = sortedBreakpoints[i];
                            const end = sortedBreakpoints[i + 1];
                            
                            if (start >= end) continue;
                            
                            const segmentText = block.text.substring(start, end);
                            if (segmentText.length === 0) continue;
                            
                            // Collect all formats that apply to this segment
                            const formats = {
                                highlight: null,
                                underline: null,
                                bold: false,
                                italic: false,
                                color: null,
                                fontFamily: null,
                                fontSize: null,
                            };
                            
                            // Check highlights
                            (block.highlights || []).forEach(h => {
                                if (h.start < end && h.end > start) {
                                    formats.highlight = h.color;
                                }
                            });
                            
                            // Check underlines
                            (block.underlines || []).forEach(u => {
                                if (u.start < end && u.end > start) {
                                    formats.underline = u.color;
                                }
                            });
                            
                            // Check other formats
                            (block.formats || []).forEach(f => {
                                if (f.start < end && f.end > start) {
                                    if (f.type === 'bold') formats.bold = true;
                                    if (f.type === 'italic') formats.italic = true;
                                    if (f.type === 'color') formats.color = f.value;
                                    if (f.type === 'fontFamily') formats.fontFamily = f.value;
                                    if (f.type === 'fontSize') formats.fontSize = f.value;
                                }
                            });
                            
                            segments.push({ text: segmentText, formats });
                        }
                        
                        return segments.map((segment, i) => {
                            const styles = {};
                            
                            // Only set color if explicitly specified in formats
                            // Otherwise, let CSS handle it based on dark theme
                            if (segment.formats.color) {
                                styles.color = segment.formats.color;
                            }
                            
                            if (segment.formats.highlight) {
                                styles.backgroundColor = segment.formats.highlight;
                            }
                            if (segment.formats.underline) {
                                styles.borderBottom = `2px solid ${segment.formats.underline}`;
                            }
                            if (segment.formats.bold) {
                                styles.fontWeight = 'bold';
                            }
                            if (segment.formats.italic) {
                                styles.fontStyle = 'italic';
                            }
                            if (segment.formats.fontFamily) {
                                styles.fontFamily = segment.formats.fontFamily;
                            }
                            if (segment.formats.fontSize) {
                                styles.fontSize = segment.formats.fontSize;
                            }
                            
                            return (
                                <span key={i} style={styles}>
                                    {segment.text}
                                </span>
                            );
                        });
                    };

                    const imageAlignment = block.image?.alignment || 'left';
                    
                    return (
                        <div key={blockIndex} className={`comentarii-content-block ${block.image ? `has-image-${imageAlignment}` : ''}`}>
                            {block.image && (
                                <div className={`comentarii-content-image ${imageAlignment}`}>
                                    <img src={block.image.url} alt="Comentariu" />
                                </div>
                            )}
                            <div className={`comentarii-content-text-wrapper ${block.image ? `text-${imageAlignment === 'left' ? 'right' : 'left'}` : ''}`}>
                                {block.title && (
                                    <div 
                                        className="comentarii-content-title"
                                        style={{
                                            fontWeight: 'bold',
                                            fontFamily: block.titleFont || 'inherit',
                                            marginBottom: block.text ? '0.5rem' : '0',
                                        }}
                                    >
                                        {block.title}
                                    </div>
                                )}
                                {block.text && (
                                    <p 
                                        className="comentarii-content-paragraph"
                                    >
                                        {renderTextWithFormatting()}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                }
                return null;
            });
        } else if (comentariu?.text) {
            // Old format - plain text (backward compatibility)
            return comentariu.text.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ));
        }
        return <div className="comentarii-modal-empty">Nu există text disponibil pentru acest comentariu.</div>;
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
                        {renderContent()}
                    </div>
                    {isAdmin && (
                        <div className="comentarii-modal-footer" style={{
                            marginTop: '24px',
                            paddingTop: '16px',
                            borderTop: `1px solid ${darkTheme ? '#6a4322' : '#e0e0e0'}`,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '12px'
                        }}>
                            <button
                                onClick={handleEdit}
                                className={`comentarii-modal-edit ${darkTheme ? 'dark-theme' : ''}`}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: darkTheme ? '#4e2e1e' : '#e3f2fd',
                                    color: darkTheme ? '#64b5f6' : '#1976d2',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    transition: 'all 0.2s',
                                    outline: 'none',
                                }}
                                title="Editează comentariul"
                            >
                                <Edit size={16} />
                                Editează comentariul
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className={`comentarii-modal-delete ${darkTheme ? 'dark-theme' : ''}`}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: darkTheme ? '#6a4322' : '#ffebee',
                                    color: darkTheme ? '#ff6b6b' : '#c62828',
                                    cursor: isDeleting ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    opacity: isDeleting ? 0.6 : 1,
                                    transition: 'all 0.2s',
                                    outline: 'none',
                                }}
                                title="Șterge comentariul"
                            >
                                <Trash2 size={16} />
                                {isDeleting ? 'Se șterge...' : 'Șterge comentariul'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

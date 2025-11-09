import React, { useState, useRef } from 'react';
import { uploadImageToCloudinary } from '../utils/cloudinary';
import '../styles/richTextEditor.scss';

const COLOR_PALETTE = [
  { name: 'Negru', value: '#000000' },
  { name: 'Alb', value: '#FFFFFF' },
  { name: 'Gri', value: '#808080' },
  { name: 'Galben', value: '#FFEB3B' },
  { name: 'Portocaliu', value: '#FF9800' },
  { name: 'Roz', value: '#E91E63' },
  { name: 'Verde', value: '#4CAF50' },
  { name: 'Albastru', value: '#2196F3' },
  { name: 'Violet', value: '#9C27B0' },
  { name: 'Roșu', value: '#F44336' },
  { name: 'Turcoaz', value: '#00BCD4' },
];

const TEXT_COLORS = [
  { name: 'Negru', value: '#000000' },
  { name: 'Alb', value: '#FFFFFF' },
  { name: 'Gri', value: '#808080' },
];

const FONT_FAMILIES = [
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Times New Roman', value: '"Times New Roman", serif' },
  { name: 'Georgia', value: 'Georgia, serif' },
  { name: 'Verdana', value: 'Verdana, sans-serif' },
  { name: 'Courier New', value: '"Courier New", monospace' },
  { name: 'Comic Sans MS', value: '"Comic Sans MS", cursive' },
];

const FONT_SIZES = [
  { name: '10px', value: '10px' },
  { name: '12px', value: '12px' },
  { name: '14px', value: '14px' },
  { name: '16px', value: '16px' },
  { name: '18px', value: '18px' },
  { name: '20px', value: '20px' },
  { name: '24px', value: '24px' },
  { name: '28px', value: '28px' },
  { name: '32px', value: '32px' },
];

const RichTextEditor = ({ value, onChange, darkTheme }) => {
  const [content, setContent] = useState(value || []);
  const [selectedText, setSelectedText] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRefs = useRef({});
  const imageRefs = useRef({});

  // Initialize with one empty paragraph if content is empty
  React.useEffect(() => {
    if (!content || content.length === 0) {
      const initialContent = [{ 
        type: 'paragraph', 
        text: '', 
        title: '',
        titleFont: '',
        highlights: [], 
        underlines: [],
        textColor: '#000000' // Default black
      }];
      setContent(initialContent);
      onChange(initialContent);
    }
  }, []);

  // Sync with external value changes
  React.useEffect(() => {
    if (value && JSON.stringify(value) !== JSON.stringify(content)) {
      setContent(value);
    }
  }, [value]);

  // Sync textarea heights with images when content changes
  React.useEffect(() => {
    const updateFunctions = [];
    
    content.forEach((block, index) => {
      if (block.image && imageRefs.current[index] && textareaRefs.current[index]) {
        const updateHeight = () => {
          const img = imageRefs.current[index];
          const textarea = textareaRefs.current[index];
          if (img && textarea) {
            const imageHeight = img.offsetHeight;
            if (imageHeight > 0) {
              textarea.style.height = `${imageHeight}px`;
            }
          }
        };
        
        const img = imageRefs.current[index];
        if (img.complete) {
          // Use setTimeout to ensure DOM is ready
          setTimeout(updateHeight, 0);
        } else {
          img.onload = updateHeight;
        }
        
        updateFunctions.push(updateHeight);
      }
    });
    
    // Add resize listener
    const handleResize = () => {
      updateFunctions.forEach(fn => fn());
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [content]);

  const handleAddParagraph = () => {
    const newContent = [...content, { 
      type: 'paragraph', 
      text: '', 
      title: '',
      titleFont: '',
      highlights: [], 
      underlines: [],
      textColor: '#000000' // Default black
    }];
    setContent(newContent);
    onChange(newContent);
  };

  const handleTextChange = (index, newText) => {
    const newContent = [...content];
    const block = newContent[index];
    const oldText = block.text || '';
    block.text = newText;
    
    // Remove formats that are now out of bounds
    const newLength = newText.length;
    
    // Clean highlights
    if (block.highlights) {
      block.highlights = block.highlights.filter(h => 
        h.start < newLength && h.end <= newLength
      );
    }
    
    // Clean underlines
    if (block.underlines) {
      block.underlines = block.underlines.filter(u => 
        u.start < newLength && u.end <= newLength
      );
    }
    
    // Clean formats
    if (block.formats) {
      block.formats = block.formats.filter(f => 
        f.start < newLength && f.end <= newLength
      );
    }
    
    setContent(newContent);
    onChange(newContent);
  };

  const handleTextSelect = (index, textarea) => {
    const selection = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    if (selection.length > 0) {
      setSelectedText({
        index,
        start: textarea.selectionStart,
        end: textarea.selectionEnd,
        text: selection,
      });
      // Keep panel open - don't close it
      if (showColorPicker !== index) {
        setShowColorPicker(index);
      }
    }
    // Don't close panel when selection is cleared
  };

  const applyFormatting = (formatType, value) => {
    if (!selectedText || !value) return; // Don't apply if value is empty

    const { index, start, end } = selectedText;
    const newContent = [...content];
    const block = newContent[index];

    // Initialize formatting arrays if they don't exist
    if (!block.formats) block.formats = [];

    // Check if there's already a format with the same type and value on this exact selection
    const existingFormat = (block.formats || []).find(
      f => f.type === formatType && f.start === start && f.end === end && f.value === value
    );

    if (existingFormat) {
      // Remove format (toggle off)
      block.formats = (block.formats || []).filter(
        f => !(f.type === formatType && f.start === start && f.end === end && f.value === value)
      );
    } else {
      // Remove any existing formats of the same type that overlap with this selection
      block.formats = (block.formats || []).filter(
        f => !(f.start < end && f.end > start && f.type === formatType)
      );

      // Add new format
      block.formats = [...(block.formats || []), { 
        start, 
        end, 
        type: formatType, 
        value 
      }];
      block.formats.sort((a, b) => a.start - b.start);
    }

    setContent(newContent);
    onChange(newContent);
    // Don't close panel or clear selection
  };

  const applyHighlight = (color) => {
    if (!selectedText) return;

    const { index, start, end } = selectedText;
    const newContent = [...content];
    const block = newContent[index];

    // Check if there's already a highlight with the same color on this exact selection
    const existingHighlight = (block.highlights || []).find(
      h => h.start === start && h.end === end && h.color === color
    );

    if (existingHighlight) {
      // Remove highlight (toggle off)
      block.highlights = (block.highlights || []).filter(
        h => !(h.start === start && h.end === end && h.color === color)
      );
    } else {
      // Remove any existing highlights/underlines that overlap with this selection
      block.highlights = (block.highlights || []).filter(
        h => !(h.start < end && h.end > start)
      );
      block.underlines = (block.underlines || []).filter(
        u => !(u.start < end && u.end > start)
      );

      // Add new highlight
      block.highlights = [...(block.highlights || []), { start, end, color }];
      block.highlights.sort((a, b) => a.start - b.start);
    }

    setContent(newContent);
    onChange(newContent);
    // Don't close panel or clear selection
  };

  const applyUnderline = (color) => {
    if (!selectedText) return;

    const { index, start, end } = selectedText;
    const newContent = [...content];
    const block = newContent[index];

    // Check if there's already an underline with the same color on this exact selection
    const existingUnderline = (block.underlines || []).find(
      u => u.start === start && u.end === end && u.color === color
    );

    if (existingUnderline) {
      // Remove underline (toggle off)
      block.underlines = (block.underlines || []).filter(
        u => !(u.start === start && u.end === end && u.color === color)
      );
    } else {
      // Remove any existing highlights/underlines that overlap with this selection
      block.highlights = (block.highlights || []).filter(
        h => !(h.start < end && h.end > start)
      );
      block.underlines = (block.underlines || []).filter(
        u => !(u.start < end && u.end > start)
      );

      // Add new underline
      block.underlines = [...(block.underlines || []), { start, end, color }];
      block.underlines.sort((a, b) => a.start - b.start);
    }

    setContent(newContent);
    onChange(newContent);
    // Don't close panel or clear selection
  };

  const applyTextColor = (color) => {
    if (!selectedText) return;

    const { index, start, end } = selectedText;
    const block = content[index];

    // Check if there's already a color format with the same color on this exact selection
    const existingColor = (block.formats || []).find(
      f => f.type === 'color' && f.start === start && f.end === end && f.value === color
    );

    if (existingColor) {
      // Remove color (toggle off - revert to default)
      const newContent = [...content];
      newContent[index].formats = (newContent[index].formats || []).filter(
        f => !(f.type === 'color' && f.start === start && f.end === end && f.value === color)
      );
      setContent(newContent);
      onChange(newContent);
    } else {
      // Apply new color
      applyFormatting('color', color);
    }
  };

  const toggleBold = () => {
    if (!selectedText) return;
    const { index, start, end } = selectedText;
    const block = content[index];
    
    // Check if selection already has bold
    const hasBold = (block.formats || []).some(
      f => f.type === 'bold' && f.start <= start && f.end >= end
    );

    if (hasBold) {
      // Remove bold
      const newContent = [...content];
      newContent[index].formats = (newContent[index].formats || []).filter(
        f => !(f.type === 'bold' && f.start <= start && f.end >= end)
      );
      setContent(newContent);
      onChange(newContent);
    } else {
      // Add bold
      applyFormatting('bold', true);
    }
  };

  const toggleItalic = () => {
    if (!selectedText) return;
    const { index, start, end } = selectedText;
    const block = content[index];
    
    // Check if selection already has italic
    const hasItalic = (block.formats || []).some(
      f => f.type === 'italic' && f.start <= start && f.end >= end
    );

    if (hasItalic) {
      // Remove italic
      const newContent = [...content];
      newContent[index].formats = (newContent[index].formats || []).filter(
        f => !(f.type === 'italic' && f.start <= start && f.end >= end)
      );
      setContent(newContent);
      onChange(newContent);
    } else {
      // Add italic
      applyFormatting('italic', true);
    }
  };

  const handleImageClick = (index) => {
    setImagePreview({ index, file: null, preview: null });
    fileInputRef.current?.click();
  };

  const handleImageFileSelect = async (e, index) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      alert('Te rog selectează o imagine validă');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview({
        index,
        file,
        preview: event.target.result,
        alignment: 'left', // default
      });
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // Reset input
  };

  const handleImageAlignmentChange = (alignment) => {
    setImagePreview({ ...imagePreview, alignment });
  };

  const handleTextColorChange = (index, color) => {
    const newContent = [...content];
    newContent[index].textColor = color;
    setContent(newContent);
    onChange(newContent);
  };

  const handleTitleChange = (index, title) => {
    const newContent = [...content];
    newContent[index].title = title;
    setContent(newContent);
    onChange(newContent);
  };

  const handleTitleFontChange = (index, font) => {
    const newContent = [...content];
    newContent[index].titleFont = font;
    setContent(newContent);
    onChange(newContent);
  };

  const confirmImageUpload = async () => {
    if (!imagePreview || !imagePreview.file) return;

    setUploadingImage(true);
    try {
      const uploadedUrl = await uploadImageToCloudinary(imagePreview.file, 'comentarii-images');
      
      const newContent = [...content];
      const block = newContent[imagePreview.index];
      
      // Add image to the block
      // When image is on left, text should be on right and vice versa
      block.image = {
        url: uploadedUrl,
        alignment: imagePreview.alignment || 'left',
      };

      setContent(newContent);
      onChange(newContent);
      setImagePreview(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Eroare la încărcarea imaginii. Te rog încearcă din nou.');
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = (index) => {
    const newContent = [...content];
    delete newContent[index].image;
    setContent(newContent);
    onChange(newContent);
  };

  const toggleImageAlignment = (index) => {
    const newContent = [...content];
    const block = newContent[index];
    if (block.image) {
      // Toggle alignment
      const newAlignment = block.image.alignment === 'left' ? 'right' : 'left';
      block.image = {
        ...block.image,
        alignment: newAlignment
      };
      setContent(newContent);
      onChange(newContent);
    }
  };

  const removeParagraph = (index) => {
    if (content.length <= 1) {
      alert('Trebuie să existe cel puțin un paragraf');
      return;
    }
    const newContent = content.filter((_, i) => i !== index);
    setContent(newContent);
    onChange(newContent);
  };

  const renderTextWithFormatting = (block, index) => {
    const textColor = block.textColor || '#000000';
    
    return (
      <div className="rich-text-preview" style={{ color: textColor }}>
        {block.title && (
          <div 
            className="rich-text-preview-title"
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
          <>
            {(() => {
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
                const styles = {
                  color: segment.formats.color || textColor,
                };
                
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
            })()}
          </>
        )}
      </div>
    );
  };

  return (
    <div className={`rich-text-editor ${darkTheme ? 'dark-theme' : ''}`}>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const index = imagePreview?.index;
          if (index !== undefined) {
            handleImageFileSelect(e, index);
          }
        }}
      />

      {content.map((block, index) => (
        <div key={index} className="rich-text-block">
          <div className="rich-text-block-header">
            <span className="rich-text-block-label">Paragraf {index + 1}</span>
            <div className="rich-text-block-actions">
              <div className="rich-text-color-selector">
                <label>Culoare text:</label>
                <select
                  value={block.textColor || '#000000'}
                  onChange={(e) => handleTextColorChange(index, e.target.value)}
                  className="rich-text-color-select"
                >
                  {TEXT_COLORS.map((color) => (
                    <option key={color.value} value={color.value}>
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="rich-text-action-btn"
                onClick={() => handleImageClick(index)}
                title="Adaugă imagine"
              >
                🖼️
              </button>
              {content.length > 1 && (
                <button
                  type="button"
                  className="rich-text-action-btn"
                  onClick={() => removeParagraph(index)}
                  title="Șterge paragraf"
                >
                  🗑️
                </button>
              )}
            </div>
          </div>

          <div className="rich-text-title-section">
            <div className="rich-text-title-input-group">
              <label htmlFor={`title-${index}`}>Titlu paragraf:</label>
              <input
                type="text"
                id={`title-${index}`}
                value={block.title || ''}
                onChange={(e) => handleTitleChange(index, e.target.value)}
                placeholder="Adaugă un titlu pentru paragraf..."
                className="rich-text-title-input"
              />
            </div>
            {block.title && (
              <div className="rich-text-title-font-group">
                <label htmlFor={`title-font-${index}`}>Font titlu:</label>
                <select
                  id={`title-font-${index}`}
                  value={block.titleFont || ''}
                  onChange={(e) => handleTitleFontChange(index, e.target.value)}
                  className="rich-text-title-font-select"
                >
                  <option value="">Implicit</option>
                  {FONT_FAMILIES.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className={`rich-text-content-wrapper ${block.image ? `has-image-${block.image?.alignment || 'left'}` : ''}`}>
            {block.image && (
              <div className="rich-text-image-preview">
                <img 
                  ref={(el) => {
                    imageRefs.current[index] = el;
                    if (el && textareaRefs.current[index]) {
                      // Sync textarea height with image height
                      const updateHeight = () => {
                        if (el && textareaRefs.current[index]) {
                          const imageHeight = el.offsetHeight;
                          textareaRefs.current[index].style.height = `${imageHeight}px`;
                        }
                      };
                      el.onload = updateHeight;
                      updateHeight();
                    }
                  }}
                  src={block.image.url} 
                  alt="Preview" 
                />
                <div className="rich-text-image-controls">
                  <button
                    type="button"
                    className="rich-text-toggle-alignment"
                    onClick={() => toggleImageAlignment(index)}
                    title={block.image.alignment === 'left' ? 'Mută pe dreapta' : 'Mută pe stânga'}
                  >
                    {block.image.alignment === 'left' ? '→' : '←'}
                  </button>
                  <button
                    type="button"
                    className="rich-text-remove-image"
                    onClick={() => removeImage(index)}
                    title="Șterge imaginea"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            <textarea
              ref={(el) => {
                textareaRefs.current[index] = el;
                if (el && block.image && imageRefs.current[index]) {
                  // Sync textarea height with image height
                  const updateHeight = () => {
                    if (imageRefs.current[index] && el) {
                      const imageHeight = imageRefs.current[index].offsetHeight;
                      el.style.height = `${imageHeight}px`;
                    }
                  };
                  // Wait for image to load
                  if (imageRefs.current[index].complete) {
                    updateHeight();
                  } else {
                    imageRefs.current[index].onload = updateHeight;
                  }
                }
              }}
              value={block.text}
              onChange={(e) => handleTextChange(index, e.target.value)}
              onSelect={(e) => handleTextSelect(index, e.target)}
              placeholder="Scrie textul paragrafului aici..."
              className={`rich-text-textarea ${block.image ? `text-${block.image.alignment === 'left' ? 'right' : 'left'}` : ''}`}
              rows={block.image ? undefined : 10}
              style={block.image ? { minHeight: 'auto' } : {}}
            />
          </div>

          <div className={`rich-text-preview-wrapper ${block.image ? `has-image-${block.image.alignment}` : ''}`}>
            {renderTextWithFormatting(block, index)}
          </div>

          {showColorPicker === index && (
            <div className="rich-text-formatting-panel">
              {selectedText && selectedText.index === index ? (
                <>
                  <div className="formatting-panel-section">
                    <label>Formatare text:</label>
                    <div className="formatting-buttons">
                      <button
                        type="button"
                        className={`formatting-btn ${(content[index].formats || []).some(f => f.type === 'bold' && f.start <= selectedText.start && f.end >= selectedText.end) ? 'active' : ''}`}
                        onClick={toggleBold}
                        title="Bold"
                      >
                        <strong>B</strong>
                      </button>
                      <button
                        type="button"
                        className={`formatting-btn ${(content[index].formats || []).some(f => f.type === 'italic' && f.start <= selectedText.start && f.end >= selectedText.end) ? 'active' : ''}`}
                        onClick={toggleItalic}
                        title="Italic"
                      >
                        <em>I</em>
                      </button>
                    </div>
                  </div>

                  <div className="formatting-panel-section">
                    <label>Font:</label>
                    <select
                      className="formatting-select"
                      value={(content[index].formats || []).find(f => 
                        f.type === 'fontFamily' && 
                        f.start <= selectedText.start && 
                        f.end >= selectedText.end
                      )?.value || ''}
                      onChange={(e) => {
                        if (e.target.value) {
                          applyFormatting('fontFamily', e.target.value);
                        } else {
                          // Remove font format if empty value selected
                          const newContent = [...content];
                          newContent[index].formats = (newContent[index].formats || []).filter(
                            f => !(f.type === 'fontFamily' && f.start <= selectedText.start && f.end >= selectedText.end)
                          );
                          setContent(newContent);
                          onChange(newContent);
                        }
                      }}
                    >
                      <option value="">Normal (elimină font)</option>
                      {FONT_FAMILIES.map((font) => (
                        <option key={font.value} value={font.value}>
                          {font.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="formatting-panel-section">
                    <label>Dimensiune:</label>
                    <select
                      className="formatting-select"
                      value={(content[index].formats || []).find(f => 
                        f.type === 'fontSize' && 
                        f.start <= selectedText.start && 
                        f.end >= selectedText.end
                      )?.value || ''}
                      onChange={(e) => {
                        if (e.target.value) {
                          applyFormatting('fontSize', e.target.value);
                        } else {
                          // Remove fontSize format if empty value selected
                          const newContent = [...content];
                          newContent[index].formats = (newContent[index].formats || []).filter(
                            f => !(f.type === 'fontSize' && f.start <= selectedText.start && f.end >= selectedText.end)
                          );
                          setContent(newContent);
                          onChange(newContent);
                        }
                      }}
                    >
                      <option value="">Normal (elimină dimensiune)</option>
                      {FONT_SIZES.map((size) => (
                        <option key={size.value} value={size.value}>
                          {size.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="formatting-panel-section">
                    <label>Culoare text:</label>
                    <div className="color-picker-colors">
                      {COLOR_PALETTE.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          className="color-picker-btn text-color"
                          style={{ backgroundColor: color.value }}
                          onClick={() => applyTextColor(color.value)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="formatting-panel-section">
                    <label>Highlight:</label>
                    <div className="color-picker-colors">
                      {COLOR_PALETTE.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          className="color-picker-btn highlight"
                          style={{ backgroundColor: color.value }}
                          onClick={() => applyHighlight(color.value)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="formatting-panel-section">
                    <label>Subliniază:</label>
                    <div className="color-picker-colors">
                      {COLOR_PALETTE.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          className="color-picker-btn underline"
                          style={{ borderBottomColor: color.value }}
                          onClick={() => applyUnderline(color.value)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="formatting-panel-empty">
                  Selectează text pentru a aplica formatare
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        className="rich-text-add-paragraph"
        onClick={handleAddParagraph}
      >
        + Adaugă Paragraf
      </button>

      {imagePreview && imagePreview.preview && (
        <div className="rich-text-image-modal">
          <div className="rich-text-image-modal-content">
            <h3>Preview Imagine</h3>
            <img src={imagePreview.preview} alt="Preview" />
            <div className="rich-text-image-alignment">
              <label>Poziție:</label>
              <button
                type="button"
                className={imagePreview.alignment === 'left' ? 'active' : ''}
                onClick={() => handleImageAlignmentChange('left')}
              >
                Stânga
              </button>
              <button
                type="button"
                className={imagePreview.alignment === 'right' ? 'active' : ''}
                onClick={() => handleImageAlignmentChange('right')}
              >
                Dreapta
              </button>
            </div>
            <div className="rich-text-image-modal-actions">
              <button
                type="button"
                onClick={() => setImagePreview(null)}
                disabled={uploadingImage}
              >
                Anulează
              </button>
              <button
                type="button"
                onClick={confirmImageUpload}
                disabled={uploadingImage}
              >
                {uploadingImage ? 'Se încarcă...' : 'Adaugă Imagine'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;


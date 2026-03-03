import React, { useState, useRef, useEffect } from 'react';
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

// Helper function to convert hex color to rgba with reduced alpha
const hexToRgba = (color, alpha = 0.5) => {
  // If already rgba, return as is (but we could also parse and adjust alpha)
  if (color.startsWith('rgba')) {
    return color;
  }
  
  // If already rgb, convert to rgba
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
  }
  
  // Handle hex colors
  let hex = color.replace('#', '');
  
  // Handle short hex (e.g., #FFF -> #FFFFFF)
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  // Parse hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const computeTextMutation = (previous = '', next = '') => {
  if (previous === next) return null;

  const prevLen = previous.length;
  const nextLen = next.length;
  let start = 0;

  while (start < prevLen && start < nextLen && previous[start] === next[start]) {
    start++;
  }

  let prevEnd = prevLen;
  let nextEnd = nextLen;

  while (prevEnd > start && nextEnd > start && previous[prevEnd - 1] === next[nextEnd - 1]) {
    prevEnd--;
    nextEnd--;
  }

  return {
    index: start,
    removedLength: prevEnd - start,
    addedLength: nextEnd - start,
  };
};

const clampRangeToText = (range, textLength) => {
  if (!range) return null;
  const safeStart = Math.max(0, Math.min(range.start, textLength));
  const safeEnd = Math.max(safeStart, Math.min(range.end, textLength));
  if (safeEnd <= safeStart) return null;
  return { ...range, start: safeStart, end: safeEnd };
};

const applyDeletionToRange = (range, index, length) => {
  if (!range || length <= 0) return range;
  const deleteEnd = index + length;

  if (deleteEnd <= range.start) {
    return { ...range, start: range.start - length, end: range.end - length };
  }

  if (index >= range.end) {
    return range;
  }

  let start = range.start;
  let end = range.end;
  let deleteIndex = index;
  let deleteLength = length;

  if (deleteIndex < start) {
    const removedBefore = Math.min(start - deleteIndex, deleteLength);
    start -= removedBefore;
    end -= removedBefore;
    deleteIndex += removedBefore;
    deleteLength -= removedBefore;
  }

  if (deleteLength <= 0) {
    return { ...range, start, end };
  }

  const overlapStart = Math.max(start, deleteIndex);
  const overlapEnd = Math.min(end, deleteIndex + deleteLength);
  const overlapLength = Math.max(0, overlapEnd - overlapStart);
  end -= overlapLength;

  if (end <= start) return null;

  return { ...range, start, end };
};

const applyInsertionToRange = (range, index, length) => {
  if (!range || length <= 0) return range;

  if (index <= range.start) {
    return { ...range, start: range.start + length, end: range.end + length };
  }

  if (index >= range.end) {
    return range;
  }

  return { ...range, end: range.end + length };
};

const updateRangesForMutation = (ranges = [], mutation, textLength) => {
  if (!mutation || !Array.isArray(ranges) || ranges.length === 0) return ranges || [];
  const { index, removedLength, addedLength } = mutation;

  return ranges
    .map((range) => {
      if (!range) return null;
      let updatedRange = { ...range };

      if (removedLength > 0) {
        updatedRange = applyDeletionToRange(updatedRange, index, removedLength);
        if (!updatedRange) return null;
      }

      if (addedLength > 0) {
        updatedRange = applyInsertionToRange(updatedRange, index, addedLength);
      }

      return clampRangeToText(updatedRange, textLength);
    })
    .filter(Boolean);
};

const getWordTokens = (text = '') => {
  const tokens = [];
  if (!text) {
    return tokens;
  }

  const wordRegex = /\S+/g;
  let match;

  while ((match = wordRegex.exec(text)) !== null) {
    tokens.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
    });
  }

  return tokens;
};

const buildCharWordMap = (text = '', tokens = []) => {
  const map = new Array(text.length).fill(-1);
  tokens.forEach((token, idx) => {
    for (let i = token.start; i < token.end; i += 1) {
      map[i] = idx;
    }
  });
  return map;
};

const EMPTY_PREVIEW_SELECTION = { blockIndex: null, wordIndices: [], lastWordIndex: null };

const ensureUniqueSortedWordIndices = (wordIndices = [], tokens = []) => {
  const seen = new Set();
  return wordIndices
    .filter((idx) => typeof idx === 'number' && idx >= 0 && idx < tokens.length)
    .filter((idx) => {
      if (seen.has(idx)) return false;
      seen.add(idx);
      return true;
    })
    .sort((a, b) => a - b);
};

const RichTextEditor = ({ value, onChange, darkTheme }) => {
  const [content, setContent] = useState(value || []);
  const [selectedText, setSelectedText] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [cropShape, setCropShape] = useState('rectangle'); // 'rectangle', 'circle', 'oval', 'freehand'
  const [isDrawing, setIsDrawing] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null); // 'nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w'
  const [moveOffset, setMoveOffset] = useState(null);
  const [resizeStart, setResizeStart] = useState(null);
  const [resizeStartCrop, setResizeStartCrop] = useState(null); // Original cropStart and cropEnd when resize starts
  const [cropPath, setCropPath] = useState([]);
  const [cropStart, setCropStart] = useState(null);
  const [cropEnd, setCropEnd] = useState(null);
  const fileInputRef = useRef(null);
  const textareaRefs = useRef({});
  const imageRefs = useRef({});
  const cropCanvasRef = useRef(null);
  const previewImageRef = useRef(null);
  const wordTokenCache = useRef({});
  const [previewSelection, setPreviewSelection] = useState(EMPTY_PREVIEW_SELECTION);

  const syncSelectedTextFromPreview = (selection) => {
    if (
      !selection ||
      selection.blockIndex === null ||
      !Array.isArray(selection.wordIndices) ||
      selection.wordIndices.length === 0
    ) {
      setSelectedText(null);
      setShowColorPicker(null);
      return;
    }

    const block = content[selection.blockIndex];
    if (!block || !block.text) {
      setSelectedText(null);
      setShowColorPicker(null);
      return;
    }

    const cachedTokens = wordTokenCache.current[selection.blockIndex];
    const tokens = cachedTokens && cachedTokens.length > 0 ? cachedTokens : getWordTokens(block.text);
    if (!cachedTokens || cachedTokens.length === 0) {
      wordTokenCache.current[selection.blockIndex] = tokens;
    }

    if (!tokens.length) {
      setSelectedText(null);
      setShowColorPicker(null);
      return;
    }

    const uniqueSorted = ensureUniqueSortedWordIndices(selection.wordIndices, tokens);
    if (!uniqueSorted.length) {
      setSelectedText(null);
      setShowColorPicker(null);
      return;
    }

    const firstToken = tokens[uniqueSorted[0]];
    const lastToken = tokens[uniqueSorted[uniqueSorted.length - 1]];
    if (!firstToken || !lastToken) {
      setSelectedText(null);
      setShowColorPicker(null);
      return;
    }

    const start = firstToken.start;
    const end = lastToken.end;

    setSelectedText({
      index: selection.blockIndex,
      start,
      end,
      text: block.text.substring(start, end),
    });
    setShowColorPicker(selection.blockIndex);
  };

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
    
    const mutation = computeTextMutation(oldText, newText);
    const newLength = newText.length;

    if (mutation) {
      block.highlights = updateRangesForMutation(block.highlights || [], mutation, newLength);
      block.underlines = updateRangesForMutation(block.underlines || [], mutation, newLength);
      block.formats = updateRangesForMutation(block.formats || [], mutation, newLength);
    }
    
    setContent(newContent);
    onChange(newContent);
  };

  const handleTextSelect = (index, textarea) => {
    const selection = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    if (selection.length > 0) {
      setPreviewSelection(EMPTY_PREVIEW_SELECTION);
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
    } else {
      setPreviewSelection(EMPTY_PREVIEW_SELECTION);
    }
    // Don't close panel when selection is cleared
  };

  const applyFormatting = (formatType, value, selectionOverride = null) => {
    if (!value) return; // Don't apply if value is empty

    const targetSelection = selectionOverride || selectedText;
    if (!targetSelection) return;

    const { index, start, end } = targetSelection;
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

  const applyHighlight = (color, selectionOverride = null) => {
    const targetSelection = selectionOverride || selectedText;
    if (!targetSelection) return;

    const { index, start, end } = targetSelection;
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

  const applyUnderline = (color, selectionOverride = null) => {
    const targetSelection = selectionOverride || selectedText;
    if (!targetSelection) return;

    const { index, start, end } = targetSelection;
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

  const applyTextColor = (color, selectionOverride = null) => {
    const targetSelection = selectionOverride || selectedText;
    if (!targetSelection) return;

    const { index, start, end } = targetSelection;
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
      applyFormatting('color', color, targetSelection);
    }
  };

  const toggleBold = (selectionOverride = null) => {
    const targetSelection = selectionOverride || selectedText;
    if (!targetSelection) return;
    const { index, start, end } = targetSelection;
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
      applyFormatting('bold', true, targetSelection);
    }
  };

  const toggleItalic = (selectionOverride = null) => {
    const targetSelection = selectionOverride || selectedText;
    if (!targetSelection) return;
    const { index, start, end } = targetSelection;
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
      applyFormatting('italic', true, targetSelection);
    }
  };

  const handlePreviewWordClick = (blockIndex, wordIndex, shiftKey = false) => {
    if (typeof wordIndex !== 'number' || wordIndex < 0) return;

    setPreviewSelection((prev) => {
      let nextSelection;
      if (shiftKey && prev.blockIndex === blockIndex && prev.lastWordIndex !== null) {
        const rangeStart = Math.min(prev.lastWordIndex, wordIndex);
        const rangeEnd = Math.max(prev.lastWordIndex, wordIndex);
        const merged = new Set(prev.wordIndices);
        for (let i = rangeStart; i <= rangeEnd; i += 1) {
          merged.add(i);
        }
        nextSelection = {
          blockIndex,
          wordIndices: Array.from(merged).sort((a, b) => a - b),
          lastWordIndex: wordIndex,
        };
      } else if (!shiftKey && prev.blockIndex === blockIndex && prev.wordIndices.length === 1 && prev.wordIndices[0] === wordIndex) {
        nextSelection = EMPTY_PREVIEW_SELECTION;
      } else {
        nextSelection = {
          blockIndex,
          wordIndices: [wordIndex],
          lastWordIndex: wordIndex,
        };
      }

      syncSelectedTextFromPreview(nextSelection);
      return nextSelection;
    });
  };

  const clearPreviewSelection = () => {
    setPreviewSelection(EMPTY_PREVIEW_SELECTION);
    syncSelectedTextFromPreview(EMPTY_PREVIEW_SELECTION);
  };

  const handleImageClick = (index) => {
    setImagePreview({ index, file: null, preview: null });
    fileInputRef.current?.click();
  };

  // Helper function to detect if image has removed background
  const detectRemovedBg = (fileName) => {
    if (!fileName) return false;
    const lowerName = fileName.toLowerCase();
    return lowerName.includes('removed-bg') || 
           lowerName.includes('removedbg') || 
           lowerName.includes('removed_bg') ||
           lowerName.includes('no-background') ||
           lowerName.includes('nobg') ||
           lowerName.includes('transparent-bg');
  };

  const handleImageFileSelect = async (e, index) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      alert('Te rog selectează o imagine validă');
      return;
    }

    // Check if image has removed background based on filename
    const isRemovedBg = detectRemovedBg(file.name);

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview({
        index,
        file,
        preview: event.target.result,
        alignment: 'left', // default
        removedBg: isRemovedBg, // Store removed-bg flag
      });
      // Reset crop state when new image is selected
      setCropShape('rectangle');
      setCropPath([]);
      setCropStart(null);
      setCropEnd(null);
      setIsResizing(false);
      setResizeHandle(null);
      setResizeStart(null);
      setResizeStartCrop(null);
      previewImageRef.current = null; // Reset cached image
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // Reset input
  };

  const handleImageAlignmentChange = (alignment) => {
    setImagePreview({ ...imagePreview, alignment });
  };

  // Get coordinates relative to canvas (accounting for CSS scaling)
  const getCanvasCoordinates = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0 || canvas.width === 0 || canvas.height === 0) {
      return { x: 0, y: 0 };
    }
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  // Draw crop overlay on canvas
  const drawCropOverlay = () => {
    if (!cropCanvasRef.current || !imagePreview?.preview) return;
    
    const canvas = cropCanvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Use cached image if available, otherwise load it
    const draw = (img) => {
      // Calculate canvas size
      const maxWidth = 600;
      const maxHeight = 400;
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      
      // Set canvas size only if it changed
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      
      // Clear and draw image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);
      
      // Draw dark overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      if (cropShape === 'freehand' && cropPath.length > 2) {
        // Draw freehand path
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.moveTo(cropPath[0].x, cropPath[0].y);
        for (let i = 1; i < cropPath.length; i++) {
          ctx.lineTo(cropPath[i].x, cropPath[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        
        // Draw outline
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cropPath[0].x, cropPath[0].y);
        for (let i = 1; i < cropPath.length; i++) {
          ctx.lineTo(cropPath[i].x, cropPath[i].y);
        }
        ctx.closePath();
        ctx.stroke();
      } else if (cropStart && cropEnd) {
        const startX = Math.min(cropStart.x, cropEnd.x);
        const startY = Math.min(cropStart.y, cropEnd.y);
        const width = Math.abs(cropEnd.x - cropStart.x);
        const height = Math.abs(cropEnd.y - cropStart.y);
        
        if (width > 5 && height > 5) {
          ctx.save();
          ctx.globalCompositeOperation = 'destination-out';
          
          if (cropShape === 'circle') {
            const radius = Math.min(width, height) / 2;
            const centerX = startX + width / 2;
            const centerY = startY + height / 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fill();
          } else if (cropShape === 'oval') {
            ctx.beginPath();
            ctx.ellipse(startX + width / 2, startY + height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Rectangle
            ctx.fillRect(startX, startY, width, height);
          }
          ctx.restore();
          
          // Draw outline
          ctx.strokeStyle = '#00ff00';
          ctx.lineWidth = 2;
          if (cropShape === 'circle') {
            const radius = Math.min(width, height) / 2;
            const centerX = startX + width / 2;
            const centerY = startY + height / 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.stroke();
          } else if (cropShape === 'oval') {
            ctx.beginPath();
            ctx.ellipse(startX + width / 2, startY + height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
            ctx.stroke();
          } else {
            ctx.strokeRect(startX, startY, width, height);
          }
          
          // Draw resize handles for rectangle shapes
          if (cropShape === 'rectangle' || cropShape === 'circle' || cropShape === 'oval') {
            const handleSize = 8;
            const handles = [
              { x: startX, y: startY }, // nw
              { x: startX + width / 2, y: startY }, // n
              { x: startX + width, y: startY }, // ne
              { x: startX + width, y: startY + height / 2 }, // e
              { x: startX + width, y: startY + height }, // se
              { x: startX + width / 2, y: startY + height }, // s
              { x: startX, y: startY + height }, // sw
              { x: startX, y: startY + height / 2 }, // w
            ];
            
            ctx.fillStyle = '#00ff00';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            
            handles.forEach(handle => {
              ctx.beginPath();
              ctx.arc(handle.x, handle.y, handleSize, 0, Math.PI * 2);
              ctx.fill();
              ctx.stroke();
            });
          }
        }
      }
    };
    
    if (previewImageRef.current && previewImageRef.current.complete) {
      draw(previewImageRef.current);
    } else {
      const img = new Image();
      img.onload = () => {
        previewImageRef.current = img;
        draw(img);
      };
      img.src = imagePreview.preview;
    }
  };

  // Check if point is inside the crop shape
  const isPointInShape = (point, shape, start, end, path) => {
    if (shape === 'freehand' && path.length > 2) {
      // Use ray casting algorithm for freehand polygon
      let inside = false;
      for (let i = 0, j = path.length - 1; i < path.length; j = i++) {
        const xi = path[i].x;
        const yi = path[i].y;
        const xj = path[j].x;
        const yj = path[j].y;
        const intersect = ((yi > point.y) !== (yj > point.y)) &&
          (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    } else if (start && end) {
      const startX = Math.min(start.x, end.x);
      const startY = Math.min(start.y, end.y);
      const endX = Math.max(start.x, end.x);
      const endY = Math.max(start.y, end.y);
      
      if (shape === 'circle') {
        const centerX = (startX + endX) / 2;
        const centerY = (startY + endY) / 2;
        const radius = Math.min(endX - startX, endY - startY) / 2;
        const dist = Math.sqrt(
          Math.pow(point.x - centerX, 2) + Math.pow(point.y - centerY, 2)
        );
        return dist <= radius;
      } else if (shape === 'oval') {
        const centerX = (startX + endX) / 2;
        const centerY = (startY + endY) / 2;
        const radiusX = (endX - startX) / 2;
        const radiusY = (endY - startY) / 2;
        const dx = point.x - centerX;
        const dy = point.y - centerY;
        return (dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY) <= 1;
      } else {
        // Rectangle
        return point.x >= startX && point.x <= endX && 
               point.y >= startY && point.y <= endY;
      }
    }
    return false;
  };

  // Get resize handle at point (for rectangle shapes only)
  const getResizeHandle = (point, start, end, handleSize = 8) => {
    if (!start || !end) return null;
    
    const startX = Math.min(start.x, end.x);
    const startY = Math.min(start.y, end.y);
    const endX = Math.max(start.x, end.x);
    const endY = Math.max(start.y, end.y);
    
    // Check corners first
    const corners = [
      { handle: 'nw', x: startX, y: startY },
      { handle: 'ne', x: endX, y: startY },
      { handle: 'sw', x: startX, y: endY },
      { handle: 'se', x: endX, y: endY },
    ];
    
    for (const corner of corners) {
      const dist = Math.sqrt(
        Math.pow(point.x - corner.x, 2) + Math.pow(point.y - corner.y, 2)
      );
      if (dist <= handleSize) {
        return corner.handle;
      }
    }
    
    // Check edges
    if (Math.abs(point.x - startX) <= handleSize && point.y >= startY && point.y <= endY) {
      return 'w';
    }
    if (Math.abs(point.x - endX) <= handleSize && point.y >= startY && point.y <= endY) {
      return 'e';
    }
    if (Math.abs(point.y - startY) <= handleSize && point.x >= startX && point.x <= endX) {
      return 'n';
    }
    if (Math.abs(point.y - endY) <= handleSize && point.x >= startX && point.x <= endX) {
      return 's';
    }
    
    return null;
  };

  // Get cursor style for resize handle
  const getResizeCursor = (handle) => {
    if (!handle) return 'default';
    const cursors = {
      'nw': 'nw-resize',
      'ne': 'ne-resize',
      'sw': 'sw-resize',
      'se': 'se-resize',
      'n': 'n-resize',
      's': 's-resize',
      'e': 'e-resize',
      'w': 'w-resize',
    };
    return cursors[handle] || 'default';
  };

  // Handle mouse down on crop canvas
  const handleCropMouseDown = (e) => {
    if (!cropCanvasRef.current) return;
    const coords = getCanvasCoordinates(e, cropCanvasRef.current);
    
    // Constrain coordinates to canvas bounds
    coords.x = Math.max(0, Math.min(coords.x, cropCanvasRef.current.width || 0));
    coords.y = Math.max(0, Math.min(coords.y, cropCanvasRef.current.height || 0));
    
    // Check for resize handle first (only for rectangle shapes)
    if (cropStart && cropEnd && (cropShape === 'rectangle' || cropShape === 'circle' || cropShape === 'oval')) {
      const handle = getResizeHandle(coords, cropStart, cropEnd, 10);
      if (handle) {
        setIsResizing(true);
        setResizeHandle(handle);
        setResizeStart({ ...coords });
        setResizeStartCrop({ start: { ...cropStart }, end: { ...cropEnd } });
        return;
      }
    }
    
    // Check if clicking on existing shape - if so, start moving
    const hasExistingShape = (cropShape === 'freehand' && cropPath.length > 2) || 
                            (cropStart && cropEnd);
    
    if (hasExistingShape && isPointInShape(coords, cropShape, cropStart, cropEnd, cropPath)) {
      // Start moving the shape
      setIsMoving(true);
      if (cropShape === 'freehand' && cropPath.length > 2) {
        // Calculate center of freehand path
        const centerX = cropPath.reduce((sum, p) => sum + p.x, 0) / cropPath.length;
        const centerY = cropPath.reduce((sum, p) => sum + p.y, 0) / cropPath.length;
        setMoveOffset({
          x: coords.x - centerX,
          y: coords.y - centerY
        });
      } else if (cropStart && cropEnd) {
        // Calculate center of rectangle/circle/oval
        const centerX = (cropStart.x + cropEnd.x) / 2;
        const centerY = (cropStart.y + cropEnd.y) / 2;
        setMoveOffset({
          x: coords.x - centerX,
          y: coords.y - centerY
        });
      }
      return;
    }
    
    // Otherwise, start drawing a new shape
    setIsDrawing(true);
    setIsMoving(false);
    setIsResizing(false);
    setResizeHandle(null);
    setMoveOffset(null);
    
    if (cropShape === 'freehand') {
      setCropPath([coords]);
    } else {
      setCropStart(coords);
      setCropEnd(coords);
    }
  };

  // Handle mouse move on crop canvas
  const handleCropMouseMove = (e) => {
    if (!cropCanvasRef.current) return;
    const coords = getCanvasCoordinates(e, cropCanvasRef.current);
    
    // Constrain coordinates to canvas bounds
    coords.x = Math.max(0, Math.min(coords.x, cropCanvasRef.current.width || 0));
    coords.y = Math.max(0, Math.min(coords.y, cropCanvasRef.current.height || 0));
    
    // Handle resizing
    if (isResizing && resizeHandle && resizeStart && resizeStartCrop) {
      const deltaX = coords.x - resizeStart.x;
      const deltaY = coords.y - resizeStart.y;
      
      const origStart = resizeStartCrop.start;
      const origEnd = resizeStartCrop.end;
      
      let newStartX = origStart.x;
      let newStartY = origStart.y;
      let newEndX = origEnd.x;
      let newEndY = origEnd.y;
      
      const canvasWidth = cropCanvasRef.current.width || 0;
      const canvasHeight = cropCanvasRef.current.height || 0;
      const minSize = 20; // Minimum size for crop area
      
      // Apply resize based on handle
      switch (resizeHandle) {
        case 'nw':
          newStartX = Math.max(0, Math.min(origStart.x + deltaX, origEnd.x - minSize));
          newStartY = Math.max(0, Math.min(origStart.y + deltaY, origEnd.y - minSize));
          break;
        case 'ne':
          newEndX = Math.min(canvasWidth, Math.max(origEnd.x + deltaX, origStart.x + minSize));
          newStartY = Math.max(0, Math.min(origStart.y + deltaY, origEnd.y - minSize));
          break;
        case 'sw':
          newStartX = Math.max(0, Math.min(origStart.x + deltaX, origEnd.x - minSize));
          newEndY = Math.min(canvasHeight, Math.max(origEnd.y + deltaY, origStart.y + minSize));
          break;
        case 'se':
          newEndX = Math.min(canvasWidth, Math.max(origEnd.x + deltaX, origStart.x + minSize));
          newEndY = Math.min(canvasHeight, Math.max(origEnd.y + deltaY, origStart.y + minSize));
          break;
        case 'n':
          newStartY = Math.max(0, Math.min(origStart.y + deltaY, origEnd.y - minSize));
          break;
        case 's':
          newEndY = Math.min(canvasHeight, Math.max(origEnd.y + deltaY, origStart.y + minSize));
          break;
        case 'e':
          newEndX = Math.min(canvasWidth, Math.max(origEnd.x + deltaX, origStart.x + minSize));
          break;
        case 'w':
          newStartX = Math.max(0, Math.min(origStart.x + deltaX, origEnd.x - minSize));
          break;
      }
      
      setCropStart({ x: newStartX, y: newStartY });
      setCropEnd({ x: newEndX, y: newEndY });
      return;
    }
    
    // Update cursor based on hover over resize handle (only when not actively resizing)
    if (!isDrawing && !isMoving && !isResizing && cropCanvasRef.current) {
      if (cropStart && cropEnd && (cropShape === 'rectangle' || cropShape === 'circle' || cropShape === 'oval')) {
        const handle = getResizeHandle(coords, cropStart, cropEnd, 10);
        if (handle) {
          cropCanvasRef.current.style.cursor = getResizeCursor(handle);
        } else if (isPointInShape(coords, cropShape, cropStart, cropEnd, cropPath)) {
          cropCanvasRef.current.style.cursor = 'move';
        } else {
          cropCanvasRef.current.style.cursor = 'crosshair';
        }
      } else if ((cropShape === 'freehand' && cropPath.length > 2) || (cropStart && cropEnd)) {
        if (isPointInShape(coords, cropShape, cropStart, cropEnd, cropPath)) {
          cropCanvasRef.current.style.cursor = 'move';
        } else {
          cropCanvasRef.current.style.cursor = 'crosshair';
        }
      } else {
        cropCanvasRef.current.style.cursor = 'crosshair';
      }
    } else if (isResizing && resizeHandle && cropCanvasRef.current) {
      // During resize, keep the resize cursor
      cropCanvasRef.current.style.cursor = getResizeCursor(resizeHandle);
    }
    
    if (isMoving && moveOffset) {
      // Move the existing shape
      if (cropShape === 'freehand' && cropPath.length > 2) {
        // Calculate new center and move all points
        const newCenterX = coords.x - moveOffset.x;
        const newCenterY = coords.y - moveOffset.y;
        const oldCenterX = cropPath.reduce((sum, p) => sum + p.x, 0) / cropPath.length;
        const oldCenterY = cropPath.reduce((sum, p) => sum + p.y, 0) / cropPath.length;
        const deltaX = newCenterX - oldCenterX;
        const deltaY = newCenterY - oldCenterY;
        
        setCropPath(prev => {
          return prev.map(p => {
            let newX = p.x + deltaX;
            let newY = p.y + deltaY;
            // Constrain to canvas bounds
            newX = Math.max(0, Math.min(newX, cropCanvasRef.current.width || 0));
            newY = Math.max(0, Math.min(newY, cropCanvasRef.current.height || 0));
            return { x: newX, y: newY };
          });
        });
      } else if (cropStart && cropEnd) {
        // Move rectangle/circle/oval
        const oldCenterX = (cropStart.x + cropEnd.x) / 2;
        const oldCenterY = (cropStart.y + cropEnd.y) / 2;
        const newCenterX = coords.x - moveOffset.x;
        const newCenterY = coords.y - moveOffset.y;
        const deltaX = newCenterX - oldCenterX;
        const deltaY = newCenterY - oldCenterY;
        
        const width = Math.abs(cropEnd.x - cropStart.x);
        const height = Math.abs(cropEnd.y - cropStart.y);
        
        let newStartX = cropStart.x + deltaX;
        let newStartY = cropStart.y + deltaY;
        let newEndX = cropEnd.x + deltaX;
        let newEndY = cropEnd.y + deltaY;
        
        // Constrain to canvas bounds
        const canvasWidth = cropCanvasRef.current.width || 0;
        const canvasHeight = cropCanvasRef.current.height || 0;
        
        if (newStartX < 0) {
          newEndX -= newStartX;
          newStartX = 0;
        }
        if (newStartY < 0) {
          newEndY -= newStartY;
          newStartY = 0;
        }
        if (newEndX > canvasWidth) {
          newStartX -= (newEndX - canvasWidth);
          newEndX = canvasWidth;
        }
        if (newEndY > canvasHeight) {
          newStartY -= (newEndY - canvasHeight);
          newEndY = canvasHeight;
        }
        
        setCropStart({ x: newStartX, y: newStartY });
        setCropEnd({ x: newEndX, y: newEndY });
      }
      return;
    }
    
    if (isDrawing) {
      if (cropShape === 'freehand') {
        setCropPath(prev => {
          // Limit path length to prevent performance issues
          const newPath = [...prev, coords];
          return newPath.length > 500 ? newPath.slice(-500) : newPath;
        });
      } else {
        setCropEnd(coords);
      }
    }
  };

  // Handle mouse up on crop canvas
  const handleCropMouseUp = () => {
    setIsDrawing(false);
    setIsMoving(false);
    setIsResizing(false);
    setResizeHandle(null);
    setResizeStart(null);
    setResizeStartCrop(null);
    setMoveOffset(null);
  };

  // Handle mouse leave to stop drawing/moving
  const handleCropMouseLeave = () => {
    setIsDrawing(false);
    setIsMoving(false);
    setIsResizing(false);
    setResizeHandle(null);
    setResizeStart(null);
    setResizeStartCrop(null);
    setMoveOffset(null);
    if (cropCanvasRef.current) {
      cropCanvasRef.current.style.cursor = 'crosshair';
    }
  };

  // Clear crop selection
  const clearCrop = () => {
    setCropStart(null);
    setCropEnd(null);
    setCropPath([]);
    setIsResizing(false);
    setResizeHandle(null);
    setResizeStart(null);
    setResizeStartCrop(null);
  };

  // Update crop overlay when crop state changes
  useEffect(() => {
    if (imagePreview?.preview && cropCanvasRef.current) {
      drawCropOverlay();
    }
  }, [imagePreview?.preview, cropStart, cropEnd, cropPath, cropShape, isDrawing, isMoving, isResizing]);

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

  // Crop image based on selected shape
  const cropImage = async (imageFile, shape, start, end, path) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Create a temporary canvas to draw the original image
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
        tempCtx.drawImage(img, 0, 0);
        
        let x, y, width, height;
        
        // Get canvas dimensions for scaling
        const canvasWidth = cropCanvasRef.current?.width || img.width;
        const canvasHeight = cropCanvasRef.current?.height || img.height;
        const scaleX = img.width / canvasWidth;
        const scaleY = img.height / canvasHeight;
        
        if (shape === 'freehand' && path.length > 2) {
          // For freehand, calculate bounding box
          const xs = path.map(p => p.x * scaleX);
          const ys = path.map(p => p.y * scaleY);
          x = Math.max(0, Math.min(...xs));
          y = Math.max(0, Math.min(...ys));
          const maxX = Math.min(img.width, Math.max(...xs));
          const maxY = Math.min(img.height, Math.max(...ys));
          width = maxX - x;
          height = maxY - y;
        } else if (start && end) {
          // Scale coordinates from preview size to actual image size
          const startX = Math.min(start.x, end.x) * scaleX;
          const startY = Math.min(start.y, end.y) * scaleY;
          const endX = Math.max(start.x, end.x) * scaleX;
          const endY = Math.max(start.y, end.y) * scaleY;
          
          x = Math.max(0, startX);
          y = Math.max(0, startY);
          width = Math.min(endX - x, img.width - x);
          height = Math.min(endY - y, img.height - y);
        } else {
          // No crop selected, return original image
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            resolve(new File([blob], imageFile.name, { type: imageFile.type }));
          }, imageFile.type);
          return;
        }
        
        // Ensure valid dimensions
        if (width <= 0 || height <= 0) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            resolve(new File([blob], imageFile.name, { type: imageFile.type }));
          }, imageFile.type);
          return;
        }
        
        // Determine output format - PNG for transparent shapes, original for rectangle
        const needsTransparency = shape === 'circle' || shape === 'oval' || shape === 'freehand';
        const outputType = needsTransparency ? 'image/png' : imageFile.type;
        
        // Set canvas size based on shape
        if (shape === 'circle') {
          const size = Math.min(width, height);
          canvas.width = size;
          canvas.height = size;
          // Clear canvas with transparent background
          ctx.clearRect(0, 0, size, size);
          ctx.save();
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(tempCanvas, x, y, size, size, 0, 0, size, size);
          ctx.restore();
        } else if (shape === 'oval') {
          canvas.width = width;
          canvas.height = height;
          // Clear canvas with transparent background
          ctx.clearRect(0, 0, width, height);
          ctx.save();
          ctx.beginPath();
          ctx.ellipse(width / 2, height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(tempCanvas, x, y, width, height, 0, 0, width, height);
          ctx.restore();
        } else if (shape === 'freehand' && path.length > 2) {
          canvas.width = width;
          canvas.height = height;
          // Clear canvas with transparent background
          ctx.clearRect(0, 0, width, height);
          ctx.save();
          ctx.beginPath();
          const minX = Math.min(...path.map(p => p.x * scaleX));
          const minY = Math.min(...path.map(p => p.y * scaleY));
          ctx.moveTo((path[0].x * scaleX) - x, (path[0].y * scaleY) - y);
          for (let i = 1; i < path.length; i++) {
            ctx.lineTo((path[i].x * scaleX) - x, (path[i].y * scaleY) - y);
          }
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(tempCanvas, x, y, width, height, 0, 0, width, height);
          ctx.restore();
        } else {
          // Rectangle - can also be transparent if needed
          canvas.width = width;
          canvas.height = height;
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(tempCanvas, x, y, width, height, 0, 0, width, height);
        }
        
        // Convert canvas to blob and then to File
        // Use PNG for transparent images to preserve alpha channel
        const fileName = needsTransparency 
          ? imageFile.name.replace(/\.[^/.]+$/, '.png')
          : imageFile.name;
        canvas.toBlob((blob) => {
          resolve(new File([blob], fileName, { type: outputType }));
        }, outputType, 1.0); // Maximum quality for PNG
      };
      img.src = imagePreview.preview;
    });
  };

  const confirmImageUpload = async () => {
    if (!imagePreview || !imagePreview.file) return;

    setUploadingImage(true);
    try {
      // Crop image if crop area is defined
      let fileToUpload = imagePreview.file;
      if (cropStart && cropEnd && cropShape !== 'freehand') {
        fileToUpload = await cropImage(imagePreview.file, cropShape, cropStart, cropEnd, []);
      } else if (cropShape === 'freehand' && cropPath.length > 0) {
        fileToUpload = await cropImage(imagePreview.file, cropShape, null, null, cropPath);
      }
      
      const uploadedUrl = await uploadImageToCloudinary(fileToUpload, 'comentarii-images');
      
      const newContent = [...content];
      const block = newContent[imagePreview.index];
      
      // Add image to the block
      // When image is on left, text should be on right and vice versa
      block.image = {
        url: uploadedUrl,
        alignment: imagePreview.alignment || 'left',
        removedBg: imagePreview.removedBg || false, // Store removed-bg flag
      };

      setContent(newContent);
      onChange(newContent);
      setImagePreview(null);
      // Reset crop state
      setCropShape('rectangle');
      setCropPath([]);
      setCropStart(null);
      setCropEnd(null);
      setIsResizing(false);
      setResizeHandle(null);
      setResizeStart(null);
      setResizeStartCrop(null);
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
    const baseText = block.text || '';
    const wordTokens = getWordTokens(baseText);
    wordTokenCache.current[index] = wordTokens;
    const charWordMap = buildCharWordMap(baseText, wordTokens);

    const buildStyledSpan = (segment) => {
      const textColorWithAlpha = segment.formats.color
        ? hexToRgba(segment.formats.color, 0.7)
        : hexToRgba(textColor, 0.7);

      const styles = {
        color: textColorWithAlpha,
      };

      if (segment.formats.highlight) {
        styles.backgroundColor = hexToRgba(segment.formats.highlight, 0.5);
      }
      if (segment.formats.underline) {
        styles.borderBottom = `2px solid ${hexToRgba(segment.formats.underline, 0.5)}`;
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
        <span key={segment.key} style={styles}>
          {segment.text}
        </span>
      );
    };

    const buildInteractiveContent = () => {
      if (!baseText) return null;

      const breakpoints = new Set([0, baseText.length]);

      (block.highlights || []).forEach((h) => {
        breakpoints.add(h.start);
        breakpoints.add(h.end);
      });

      (block.underlines || []).forEach((u) => {
        breakpoints.add(u.start);
        breakpoints.add(u.end);
      });

      (block.formats || []).forEach((f) => {
        breakpoints.add(f.start);
        breakpoints.add(f.end);
      });

      const sortedBreakpoints = Array.from(breakpoints).sort((a, b) => a - b);
      const segments = [];

      for (let i = 0; i < sortedBreakpoints.length - 1; i += 1) {
        const start = sortedBreakpoints[i];
        const end = sortedBreakpoints[i + 1];

        if (start >= end) {
          continue;
        }

        const segmentText = baseText.substring(start, end);
        if (!segmentText.length) {
          continue;
        }

        const formats = {
          highlight: null,
          underline: null,
          bold: false,
          italic: false,
          color: null,
          fontFamily: null,
          fontSize: null,
        };

        (block.highlights || []).forEach((h) => {
          if (h.start < end && h.end > start) {
            formats.highlight = h.color;
          }
        });

        (block.underlines || []).forEach((u) => {
          if (u.start < end && u.end > start) {
            formats.underline = u.color;
          }
        });

        (block.formats || []).forEach((f) => {
          if (f.start < end && f.end > start) {
            if (f.type === 'bold') formats.bold = true;
            if (f.type === 'italic') formats.italic = true;
            if (f.type === 'color') formats.color = f.value;
            if (f.type === 'fontFamily') formats.fontFamily = f.value;
            if (f.type === 'fontSize') formats.fontSize = f.value;
          }
        });

        segments.push({ text: segmentText, formats, start, end });
      }

      const splitSegments = [];

      segments.forEach((segment, segIdx) => {
        let pointer = segment.start;
        while (pointer < segment.end) {
          const currentWordIndex = charWordMap[pointer];
          let nextPointer = pointer + 1;

          while (nextPointer < segment.end && charWordMap[nextPointer] === currentWordIndex) {
            nextPointer += 1;
          }

          const pieceText = baseText.substring(pointer, nextPointer);
          splitSegments.push({
            key: `${segIdx}-${pointer}`,
            start: pointer,
            end: nextPointer,
            text: pieceText,
            wordIndex: currentWordIndex,
            formats: segment.formats,
          });

          pointer = nextPointer;
        }
      });

      const selectedWordSet = previewSelection.blockIndex === index
        ? new Set(previewSelection.wordIndices)
        : new Set();

      const nodes = [];
      let currentGroup = [];
      let currentWordIndex = null;

      const flushGroup = () => {
        if (!currentGroup.length) return;

        if (currentWordIndex === null || currentWordIndex === -1) {
          currentGroup.forEach((segment) => {
            nodes.push(buildStyledSpan(segment));
          });
        } else {
          const wordIndexForHandlers = currentWordIndex;
          const isSelected = selectedWordSet.has(wordIndexForHandlers);
          const wordKey = `word-${wordIndexForHandlers}-${currentGroup[0].start}`;
          nodes.push(
            <span
              key={wordKey}
              className={`preview-word${isSelected ? ' selected' : ''}`}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-label={`Selectează cuvântul "${wordTokens[wordIndexForHandlers]?.text || ''}"`}
              data-word-index={wordIndexForHandlers}
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.preventDefault();
                handlePreviewWordClick(index, wordIndexForHandlers, e.shiftKey);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePreviewWordClick(index, wordIndexForHandlers, e.shiftKey);
                } else if (e.key === 'Escape') {
                  clearPreviewSelection();
                }
              }}
            >
              {currentGroup.map((segment) => buildStyledSpan(segment))}
            </span>
          );
        }

        currentGroup = [];
      };

      splitSegments.forEach((segment) => {
        if (segment.wordIndex === currentWordIndex) {
          currentGroup.push(segment);
        } else {
          flushGroup();
          currentGroup = [segment];
          currentWordIndex = segment.wordIndex;
        }
      });

      flushGroup();
      return nodes;
    };
    
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
        {baseText && buildInteractiveContent()}
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
                autoComplete="off"
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
              <div className={`rich-text-image-preview ${block.image.removedBg ? 'removed-bg' : ''}`}>
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
            <h3>Previzualizare și Decupare Imagine</h3>
            
            {/* Crop Shape Selector */}
            <div className="rich-text-crop-shapes">
              <label>Formă decupare:</label>
              <div className="crop-shape-buttons">
                <button
                  type="button"
                  className={`crop-shape-btn ${cropShape === 'rectangle' ? 'active' : ''}`}
                  onClick={() => {
                    setCropShape('rectangle');
                    clearCrop();
                  }}
                  title="Dreptunghi"
                >
                  ⬜
                </button>
                <button
                  type="button"
                  className={`crop-shape-btn ${cropShape === 'circle' ? 'active' : ''}`}
                  onClick={() => {
                    setCropShape('circle');
                    clearCrop();
                  }}
                  title="Cerc"
                >
                  ⭕
                </button>
                <button
                  type="button"
                  className={`crop-shape-btn ${cropShape === 'oval' ? 'active' : ''}`}
                  onClick={() => {
                    setCropShape('oval');
                    clearCrop();
                  }}
                  title="Oval"
                >
                  ⚪
                </button>
                <button
                  type="button"
                  className={`crop-shape-btn ${cropShape === 'freehand' ? 'active' : ''}`}
                  onClick={() => {
                    setCropShape('freehand');
                    clearCrop();
                  }}
                  title="Linie liberă"
                >
                  ✏️
                </button>
                {(cropStart || cropPath.length > 0) && (
                  <button
                    type="button"
                    className="crop-shape-btn clear-crop"
                    onClick={clearCrop}
                    title="Șterge decupare"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>

            {/* Canvas Container for Image and Crop Overlay */}
            <div className="rich-text-canvas-container">
              <canvas
                ref={cropCanvasRef}
                className="rich-text-crop-canvas"
                onMouseDown={handleCropMouseDown}
                onMouseMove={handleCropMouseMove}
                onMouseUp={handleCropMouseUp}
                onMouseLeave={handleCropMouseLeave}
              />
            </div>

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
                onClick={() => {
                  setImagePreview(null);
                  clearCrop();
                }}
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


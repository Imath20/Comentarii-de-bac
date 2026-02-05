import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { extractConceptFromParagraph, searchCopyrightFreeImage, downloadAndUploadImage, generateBatchImagesFromJSON } from '../utils/imageSearch';

const COLOR_PALETTE = [
  { name: 'Galben deschis', value: '#ffd591' },
  { name: 'Portocaliu', value: '#ff9f33' },
  { name: 'Auriu', value: '#c58a28' },
  { name: 'Roz', value: '#e75c8d' },
  { name: 'Albastru', value: '#4c8bff' },
  { name: 'Verde', value: '#5cb85c' },
  { name: 'Liliac', value: '#b38bfa' },
  { name: 'Roșu', value: '#ff5f52' },
];

const sanitizeText = (text = '') => text.replace(/\s+/g, ' ').trim();

const isWordChar = (ch) => {
  if (!ch) return false;
  // litere/digit/underscore (unicode aware)
  return /[\p{L}\p{N}_]/u.test(ch);
};

const expandToWordBoundaries = (text, start, end) => {
  if (!text || start == null || end == null) return { start, end };
  let s = Math.max(0, Math.min(start, text.length));
  let e = Math.max(s, Math.min(end, text.length));

  // extinde doar dacă match-ul e „în interiorul” unui cuvânt
  while (s > 0 && isWordChar(text[s - 1]) && isWordChar(text[s])) {
    s -= 1;
  }
  while (e < text.length && isWordChar(text[e - 1]) && isWordChar(text[e])) {
    e += 1;
  }
  return { start: s, end: e };
};

const stripJson = (raw = '') => {
  const trimmed = raw.trim();
  if (trimmed.startsWith('```')) {
    return trimmed.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  }
  return trimmed;
};

const safeParseJson = (raw = '') => {
  const stripped = stripJson(raw);
  try {
    return JSON.parse(stripped);
  } catch (_) {
    const matches = stripped.match(/\{[\s\S]*\}/g);
    if (matches && matches.length) {
      const candidate = matches.reduce((longest, cur) =>
        cur.length > longest.length ? cur : longest, '');
      if (candidate) {
        try {
          return JSON.parse(candidate);
        } catch (err) {
          console.warn('JSON parse fallback failed', err);
        }
      }
    }
    throw new Error('Parse JSON failed');
  }
};

const findRange = (baseText, targetText, usedRanges, { expandToWord = false } = {}) => {
  const cleanTarget = sanitizeText(targetText);
  if (!cleanTarget) return null;

  const lowerBase = baseText.toLowerCase();
  const lowerTarget = cleanTarget.toLowerCase();
  let startIndex = 0;

  while (startIndex < baseText.length) {
    const found = lowerBase.indexOf(lowerTarget, startIndex);
    if (found === -1) break;
    const end = found + cleanTarget.length;
    const overlaps = Array.isArray(usedRanges)
      ? usedRanges.some((r) => found < r.end && end > r.start)
      : false;
    if (!overlaps) {
      if (Array.isArray(usedRanges)) {
        usedRanges.push({ start: found, end });
      }
      const range = expandToWord ? expandToWordBoundaries(baseText, found, end) : { start: found, end };
      return range;
    }
    startIndex = found + 1;
  }
  return null;
};

const AIFullCommentProcessor = ({ fullText, onProcessed, darkTheme, onStatus }) => {
  // până la 2 culori, exact ca un „theme” de evidențiere
  const [selectedColors, setSelectedColors] = useState([COLOR_PALETTE[0].value, COLOR_PALETTE[1].value]);
  const [formatTheme, setFormatTheme] = useState('highlight'); // 'highlight', 'underline', 'textColor'
  const [processing, setProcessing] = useState(false);
  const [cubeSpinning, setCubeSpinning] = useState(false);
  const lastProcessedTextRef = useRef('');
  const processingTimeoutRef = useRef(null);

  const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
  const groqApiKeyBackup = import.meta.env.VITE_GROQ_API_KEY_1;
  const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
  const groqKeys = useMemo(
    () => [groqApiKey, groqApiKeyBackup].filter((k) => k && k !== 'undefined'),
    [groqApiKey, groqApiKeyBackup]
  );

  const setFeedback = (type, text) => {
    if (onStatus) onStatus({ type, text });
  };

  const toggleColor = (value) => {
    setSelectedColors((prev) => {
      const exists = prev.includes(value);
      if (exists) {
        // scoate culoarea
        return prev.filter((c) => c !== value);
      }
      // maxim 2 culori
      if (prev.length >= 2) {
        return [...prev.slice(1), value];
      }
      return [...prev, value];
    });
  };

  const handleProcess = useCallback(async () => {
    if (processing) return;
    if (!fullText || !fullText.trim()) {
      setFeedback('error', 'Adaugă textul complet al comentariului înainte să rulezi procesarea.');
      return;
    }

    if (!groqKeys.length) {
      setFeedback('error', 'Setează variabila VITE_GROQ_API_KEY în .env.local.');
      return;
    }

    if (!selectedColors.length) {
      setFeedback('error', 'Selectează cel puțin o culoare (maxim 2).');
      return;
    }

    // Modele alternative pentru fallback
    const modelCandidates = [
      'moonshotai/kimi-k2-instruct-0905',
      'llama-3.2-90b-text-preview',
      'llama-3.2-11b-text-preview',
      'llama-3.1-8b-instant'
    ];

    const prompt = `Procesează următorul comentariu literar complet și împarte-l în paragrafe structurate cu subtitluri și formatare.

TEXTUL COMPLET:
${fullText}

SARCINA TA:
1. Împarte textul în paragrafe logice (3-8 paragrafe, în funcție de lungime)
2. Pentru fiecare paragraf, creează un subtitlu relevant și descriptiv
3. Aplică formatare consistentă folosind o SINGURĂ metodă de evidențiere (theme unic):
   - Dacă folosești highlight, folosește-l PESTE TOT (nu amesteca cu underline sau text color)
   - Dacă folosești underline, folosește-l PESTE TOT
   - Dacă folosești text color, folosește-l PESTE TOT
4. Marchează fragmente importante cu bold și italic unde este necesar (obligatoriu să existe și bold și italic în fiecare paragraf, dacă se poate)
5. Folosește NUMAI culorile de mai jos pentru evidențiere (prin colorKey):
   ${selectedColors.map((c, idx) => `[${idx}] ${c}`).join(', ')}

REGULI ABSOLUTE:
- O SINGURĂ metodă de evidențiere per comentariu (highlight SAU underline SAU textColor)
- Nu amesteca highlight cu underline sau textColor
- Subtitlurile trebuie să fie relevante și descriptive
- Paragrafele trebuie să aibă sens logic și să fie bine delimitate
- Bold pentru termeni/concepte cheie (max 5-8 per paragraf)
- Italic pentru citate sau fragmente speciale (max 3-5 per paragraf)
- Highlight/underline/textColor pentru fragmente esențiale (max 8-12 per paragraf)

IMPORTANT: Returnează DOAR JSON valid, fără markdown, fără explicații, fără markdown code blocks.

Format JSON obligatoriu:
{
  "formatMethod": "highlight",
  "paragraphs": [
    {
      "title": "Subtitlu paragraf",
      "text": "Textul complet al paragrafului...",
      "highlights": [{ "text": "fragment exact 1", "colorKey": 0 }],
      "bold": ["termen cheie 1"],
      "italic": ["citat sau fragment special"]
    }
  ]
}`.trim();

    const buildRequestBody = (model) => ({
      model,
      messages: [
        {
          role: 'system',
          content: 'Ești un asistent care procesează comentarii literare. Returnează DOAR JSON valid, fără markdown, fără text suplimentar, fără ```json```. Răspunsul trebuie să fie direct JSON valid care poate fi parsabil.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 3000,
      response_format: { type: 'json_object' }, // Forțează JSON
    });

    setProcessing(true);
    setCubeSpinning(true);
    setFeedback('', '');

    let lastError = null;
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Fallback: împarte textul manual în paragrafe dacă AI-ul eșuează
    const createFallbackContent = (text) => {
      if (!text || !text.trim()) return [];
      
      // Împarte textul la paragrafe (linii goale sau puncte urmate de majuscule)
      const paragraphs = text
        .split(/\n\s*\n|\.\s+(?=[A-ZĂÂÎȘȚ])/)
        .map(p => p.trim())
        .filter(p => p.length > 20); // Filtrează paragrafe prea scurte
      
      if (paragraphs.length === 0) {
        // Dacă nu găsește paragrafe, împarte la propoziții lungi
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
        const chunkSize = Math.ceil(sentences.length / 4);
        const chunks = [];
        for (let i = 0; i < sentences.length; i += chunkSize) {
          chunks.push(sentences.slice(i, i + chunkSize).join(' ').trim());
        }
        return chunks.map((chunk, idx) => ({
          type: 'paragraph',
          title: `Paragraf ${idx + 1}`,
          text: chunk,
          highlights: [],
          underlines: [],
          formats: [],
        }));
      }
      
      return paragraphs.map((para, idx) => ({
        type: 'paragraph',
        title: `Paragraf ${idx + 1}`,
        text: para,
        highlights: [],
        underlines: [],
        formats: [],
      }));
    };

    // Încearcă cu fiecare model
    for (const model of modelCandidates) {
      for (const key of groqKeys) {
        // Retry logic pentru rate limiting
        let attempts = 0;
        const maxAttempts = 2; // Redus la 2 pentru a nu consuma prea multe tokeni
        
        while (attempts < maxAttempts) {
          attempts += 1;
          try {
            const body = buildRequestBody(model);
            console.log(`[AI] Trying model: ${model}, attempt: ${attempts}, key: ${key.substring(0, 10)}...`);
            
            const res = await fetch(groqApiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${key}`,
              },
              body: JSON.stringify(body),
            });

          if (!res.ok) {
            const text = await res.text().catch(() => '');
            let errorData = null;
            
            // Încearcă să parseze eroarea ca JSON
            try {
              errorData = text ? JSON.parse(text) : null;
            } catch (_) {
              // Nu e JSON, folosește textul direct
            }

            // Extrage mesajul de eroare
            const errorMessage = errorData?.error?.message || text || `Eroare ${res.status}`;
            
            // Gestionează rate limiting (429 sau rate_limit_exceeded)
            if (res.status === 429 || errorMessage.includes('rate_limit') || errorMessage.includes('Rate limit')) {
              // Extrage timpul de așteptare din mesaj
              const retryMatch = errorMessage.match(/try again in ([\d.]+)\s*(ms|s|second|seconds)/i) || 
                                errorMessage.match(/([\d.]+)\s*(ms|s|second|seconds)/i);
              
              let retryMs = 2000; // default 2 secunde
              if (retryMatch) {
                const value = parseFloat(retryMatch[1]);
                const unit = retryMatch[2]?.toLowerCase();
                retryMs = unit === 'ms' || unit === 'millisecond' ? Math.ceil(value) : Math.ceil(value * 1000);
                // Adaugă un buffer de 500ms pentru siguranță
                retryMs += 500;
              } else {
                // Dacă nu găsește timp, folosește un delay progresiv
                retryMs = 1000 * attempts;
              }

              lastError = `Limită de solicitări depășită. Aștept ${Math.ceil(retryMs / 1000)} secunde...`;
              setFeedback('info', lastError);

              // Așteaptă înainte de retry
              if (attempts < maxAttempts) {
                await sleep(retryMs);
                continue; // Reîncearcă
              } else {
                lastError = 'Limită de solicitări depășită. Te rog încearcă mai târziu.';
                break; // Nu mai reîncearcă
              }
            }

            // Alte erori
            if (res.status === 401) {
              lastError = 'Eroare de autentificare. Verifică cheia API Groq.';
            } else if (res.status === 404) {
              lastError = 'Endpoint-ul API nu a fost găsit.';
            } else {
              lastError = errorMessage;
            }

            // Pentru erori non-rate-limit, treci la următoarea cheie
            if (attempts >= maxAttempts || res.status !== 429) {
              break;
            }
            continue;
          }

          const rawText = await res.text();
          console.warn('AI raw response (debug):', rawText);

          let data;
          try {
            data = JSON.parse(rawText);
          } catch (err) {
            lastError = 'Răspuns API nu este JSON parsabil.';
            if (attempts < maxAttempts) {
              await sleep(1000);
              continue;
            }
            break;
          }

          const rawContent = data?.choices?.[0]?.message?.content || '';
          if (!rawContent || typeof rawContent !== 'string') {
            lastError = 'Răspuns AI este gol.';
            if (attempts < maxAttempts) {
              await sleep(1000);
              continue;
            }
            break;
          }
          console.warn('AI raw content (debug):', rawContent);

          let effectiveContent = rawContent;
          if (!effectiveContent.trim()) {
            const reasoning = data?.choices?.[0]?.message?.reasoning;
            if (reasoning && typeof reasoning === 'string') {
              effectiveContent = reasoning;
            }
          }

          if (!effectiveContent.trim()) {
            const reasoning = data?.choices?.[0]?.message?.reasoning;
            if (reasoning && typeof reasoning === 'string') {
              const candidate = reasoning.match(/\{[\s\S]*\}/);
              if (candidate && candidate[0]) {
                effectiveContent = candidate[0];
              }
            }
          }

          let parsed;
          try {
            parsed = safeParseJson(effectiveContent);
            console.log('[AI] Parsed JSON successfully:', { 
              hasParagraphs: !!parsed?.paragraphs, 
              paragraphsCount: parsed?.paragraphs?.length 
            });
          } catch (err) {
            console.error('[AI] JSON parse error:', err, 'Content:', effectiveContent.substring(0, 200));
            lastError = `Răspuns AI nu este JSON valid: ${err.message}`;
            if (attempts < maxAttempts) {
              await sleep(1000);
              continue;
            }
            // Încearcă următorul model
            break;
          }

          if (!parsed || typeof parsed !== 'object') {
            lastError = 'Răspuns AI nu este un obiect JSON valid.';
            if (attempts < maxAttempts) {
              await sleep(1000);
              continue;
            }
            break;
          }

          if (!parsed?.paragraphs || !Array.isArray(parsed.paragraphs) || parsed.paragraphs.length === 0) {
            console.warn('[AI] Invalid paragraphs structure:', parsed);
            lastError = 'Răspuns AI nu conține paragrafe valide.';
            if (attempts < maxAttempts) {
              await sleep(1000);
              continue;
            }
            // Fallback: încearcă să creeze paragrafe manual
            console.log('[AI] Using fallback: creating paragraphs manually');
            const fallbackContent = createFallbackContent(fullText);
            if (fallbackContent.length > 0) {
              lastProcessedTextRef.current = fullText.trim();
              onProcessed(fallbackContent);
              setFeedback('success', 'Comentariul a fost procesat cu fallback manual (fără formatare AI).');
              setProcessing(false);
              setTimeout(() => setCubeSpinning(false), 800);
              return;
            }
            break;
          }

          // Convert to RichTextEditor format
          const formatMethod = parsed.formatMethod || 'highlight';
          
          // First, extract keywords and search for images for each paragraph
          setFeedback('info', 'Extragem concepte pentru imagini...');
          
          // Reset image cache for new processing
          const { resetImageCache } = await import('../utils/imageSearch');
          resetImageCache();
          
          // Track used keywords to avoid duplicates
          const usedKeywords = new Set();
          
          // Step 1: Extract all concepts from all paragraphs first
          const conceptsWithParagraphs = await Promise.all(
            parsed.paragraphs.map(async (para, paraIndex) => {
              const concept = await extractConceptFromParagraph(para.text || '', para.title || '', usedKeywords);
              if (concept) {
                usedKeywords.add(concept);
              }
              return { para, paraIndex, concept };
            })
          );
          
          // Step 2: Try batch generation with Hugging Face Spaces (if configured)
          const hfSpaceUrl = import.meta.env.VITE_HF_SPACE_URL;
          let batchImageMap = null;
          
          if (hfSpaceUrl) {
            try {
              setFeedback('info', 'Generăm imagini cu Hugging Face Spaces...');
              const concepts = conceptsWithParagraphs
                .map(item => item.concept)
                .filter(c => c && c.trim());
              
              if (concepts.length > 0) {
                const jsonInput = {
                  concepts: concepts,
                  type: 'icon',
                  style: 'minimal',
                  transparent: true
                };
                
                batchImageMap = await generateBatchImagesFromJSON(jsonInput);
                if (batchImageMap) {
                  console.log(`[HF Batch] Generated ${Object.keys(batchImageMap).length} images`);
                }
              }
            } catch (hfError) {
              console.warn('[HF Batch] Error in batch generation, falling back to individual search:', hfError);
            }
          }
          
          // Step 3: Process paragraphs and assign images
          setFeedback('info', 'Procesăm paragrafe și asignăm imagini...');
          
          const structuredContent = await Promise.all(
          conceptsWithParagraphs.map(async ({ para, paraIndex, concept }) => {
            const block = {
              type: 'paragraph',
              title: para.title || '',
              text: para.text || '',
              highlights: [],
              underlines: [],
              formats: [],
            };

          const baseText = block.text;
          // folosit doar pentru evidențiere (nu blocăm bold/italic să se suprapună peste highlight)
          const usedHighlightRanges = [];

          const getColorFromKey = (colorKey) => {
            const idx = Number.isInteger(colorKey) ? colorKey : 0;
            return selectedColors[idx] || selectedColors[0] || COLOR_PALETTE[0].value;
          };

          const pickColorDeterministic = (text) => {
            // fallback ca să folosim și a 2-a culoare chiar dacă AI trimite string fără colorKey
            const s = (text || '').toString();
            let h = 0;
            for (let i = 0; i < s.length; i += 1) {
              h = (h * 31 + s.charCodeAt(i)) >>> 0;
            }
            const idx = selectedColors.length > 1 ? (h % 2) : 0;
            return selectedColors[idx] || selectedColors[0] || COLOR_PALETTE[0].value;
          };

          // Apply formatting based on formatMethod
          if (formatMethod === 'highlight' && para.highlights) {
            para.highlights.forEach((item) => {
              const target = typeof item === 'string' ? item : item?.text;
              const colorKey = typeof item === 'object' && Number.isInteger(item.colorKey) ? item.colorKey : 0;
              const color = typeof item === 'string' ? pickColorDeterministic(target) : getColorFromKey(colorKey);
              const range = findRange(baseText, target, usedHighlightRanges, { expandToWord: true });
              if (range) {
                block.highlights.push({ ...range, color });
              }
            });
          } else if (formatMethod === 'underline' && para.underlines) {
            para.underlines.forEach((item) => {
              const target = typeof item === 'string' ? item : item?.text;
              const colorKey = typeof item === 'object' && Number.isInteger(item.colorKey) ? item.colorKey : 0;
              const color = typeof item === 'string' ? pickColorDeterministic(target) : getColorFromKey(colorKey);
              const range = findRange(baseText, target, usedHighlightRanges, { expandToWord: true });
              if (range) {
                block.underlines.push({ ...range, color });
              }
            });
          } else if (formatMethod === 'textColor' && para.textColors) {
            para.textColors.forEach((item) => {
              const target = typeof item === 'string' ? item : item?.text;
              const colorKey = typeof item === 'object' && Number.isInteger(item.colorKey) ? item.colorKey : 0;
              const color = typeof item === 'string' ? pickColorDeterministic(target) : getColorFromKey(colorKey);
              const range = findRange(baseText, target, usedHighlightRanges, { expandToWord: true });
              if (range) {
                block.formats.push({ ...range, type: 'color', value: color });
              }
            });
          }

          // Apply bold
          if (para.bold) {
            para.bold.forEach((fragment) => {
              const range = findRange(baseText, fragment, null, { expandToWord: true });
              if (range) {
                block.formats.push({ ...range, type: 'bold', value: true });
              }
            });
          }

          // Apply italic
          if (para.italic) {
            para.italic.forEach((fragment) => {
              const range = findRange(baseText, fragment, null, { expandToWord: true });
              if (range) {
                block.formats.push({ ...range, type: 'italic', value: true });
              }
            });
          }

          // Assign image to block if we have a concept
          if (concept) {
            console.log(`[Image] Extracted concept for paragraph "${block.title}": ${concept}`);
            
            try {
              let imageUrl = null;
              
              // First, try to use batch-generated image from HF Spaces
              if (batchImageMap && batchImageMap[concept]) {
                imageUrl = batchImageMap[concept];
                console.log(`[Image] Using batch-generated image from HF Spaces for "${concept}"`);
              }
              
              // If no batch image, search individually (will try HF Spaces first, then fallback to others)
              if (!imageUrl) {
                imageUrl = await searchCopyrightFreeImage(concept, { 
                  type: 'icon', 
                  perPage: 5, // Fetch more results for variety
                  resultIndex: paraIndex, // Rotate through results
                  useHuggingFace: true // Try HF Spaces first
                });
              }
              
              if (imageUrl) {
                // Skip zip files for now (would need extraction)
                // In the future, we could add JSZip to extract images from zip
                if (imageUrl.endsWith('.zip') || imageUrl.includes('blob:') || imageUrl.includes('application/zip')) {
                  console.warn(`[Image] Received zip file for "${concept}" - skipping (requires extraction)`);
                  // Could implement zip extraction here with JSZip
                } else {
                  // Download and upload to Cloudinary
                  const cloudinaryUrl = await downloadAndUploadImage(imageUrl, `${concept}_${paraIndex}`);
                  if (cloudinaryUrl) {
                    // Add image to block (default alignment: left, mark as removedBg for transparent)
                    block.image = {
                      url: cloudinaryUrl,
                      alignment: 'left',
                      removedBg: true, // Mark as transparent/no background
                    };
                    console.log(`[Image] Added relevant image for concept "${concept}" (paragraph ${paraIndex + 1})`);
                  } else {
                    console.warn(`[Image] Failed to upload image for concept "${concept}"`);
                  }
                }
              } else {
                console.warn(`[Image] No image found for concept "${concept}"`);
              }
            } catch (error) {
              console.warn(`[Image] Error searching image for concept "${concept}":`, error);
              // Continue without image if search fails
            }
          } else {
            console.warn(`[Image] No concept extracted for paragraph "${block.title}"`);
          }

          return block;
        })
        );

          // Mark text as processed
          lastProcessedTextRef.current = fullText.trim();
          
          onProcessed(structuredContent);
          setFeedback('success', 'Comentariul a fost procesat și formatat cu succes!');
          setProcessing(false);
          setTimeout(() => setCubeSpinning(false), 800);
          return; // Succes - iesim din toate loop-urile
        } catch (err) {
          lastError = err?.message || 'Eroare necunoscută';
          if (attempts < maxAttempts) {
            await sleep(1000 * attempts);
            continue;
          }
          break;
        }
      } // end while attempts
      
        // Dacă am ajuns aici și am eroare, treci la următoarea cheie
        if (lastError && lastError.includes('Limită de solicitări')) {
          // Pentru rate limit, nu mai încerca alte chei
          break;
        }
      } // end for keys
      
      // Dacă am reușit cu un model, nu mai încerca altele
      if (lastProcessedTextRef.current === fullText.trim()) {
        return;
      }
    } // end for models

    // Dacă toate modelele au eșuat, folosește fallback manual
    if (!lastProcessedTextRef.current || lastProcessedTextRef.current !== fullText.trim()) {
      console.log('[AI] All models failed, using manual fallback');
      const fallbackContent = createFallbackContent(fullText);
      if (fallbackContent.length > 0) {
        lastProcessedTextRef.current = fullText.trim();
        onProcessed(fallbackContent);
        setFeedback('info', 'Comentariul a fost procesat manual (AI-ul nu a putut genera formatare).');
        setProcessing(false);
        setTimeout(() => setCubeSpinning(false), 800);
        return;
      }
    }

    setFeedback('error', `Nu am putut procesa comentariul. ${lastError || 'Eroare necunoscută'}`);
    setProcessing(false);
    setTimeout(() => setCubeSpinning(false), 800);
  }, [fullText, selectedColors, groqKeys, groqApiUrl, onProcessed, onStatus]);

  // Auto-generate when text changes (debounced)
  useEffect(() => {
    // Clear any pending timeout
    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
    }

    // Skip if text is empty or same as last processed
    if (!fullText || !fullText.trim() || fullText.trim() === lastProcessedTextRef.current) {
      return;
    }

    // Skip if already processing
    if (processing) {
      return;
    }

    // Debounce: wait 2 seconds after user stops typing
    processingTimeoutRef.current = setTimeout(() => {
      // Check again if text is still valid and not already processed
      if (fullText && fullText.trim() && fullText.trim() !== lastProcessedTextRef.current && !processing) {
        handleProcess();
      }
    }, 2000);

    return () => {
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
    };
  }, [fullText, processing, handleProcess]);

  return (
    <div className={`ai-formatting-card ${darkTheme ? 'dark-theme' : ''}`}>
      <div className="ai-formatting-top">
        <div className="ai-formatting-info">
          <div className="ai-formatting-title">Procesează comentariu complet cu AI</div>
          <div className="ai-formatting-subtitle">
            AI-ul va împărți textul în paragrafe cu subtitluri, va aplica formatare consistentă și va adăuga imagini relevante automat.
            {processing && <span style={{ display: 'block', marginTop: '8px', color: darkTheme ? '#ffd591' : '#ff9f33' }}>Se procesează...</span>}
          </div>
        </div>
      </div>

      <div className="ai-formatting-colors">
        <div className="ai-formatting-colors-label">Alege până la 2 culori pentru theme-ul de evidențiere</div>
        <div className="ai-formatting-colors-grid">
          {COLOR_PALETTE.map((color) => {
            const active = selectedColors.includes(color.value);
            return (
              <button
                key={color.value}
                type="button"
                className={`ai-color-chip ${active ? 'active' : ''} ${darkTheme ? 'dark-theme' : ''}`}
                style={{ backgroundColor: color.value }}
                onClick={() => toggleColor(color.value)}
                title={color.name}
              >
                {active ? '✓' : ''}
              </button>
            );
          })}
        </div>
        <div className="ai-formatting-hint">
          AI-ul va folosi exclusiv aceste culori (prin colorKey) pentru evidențiere, max 2 culori per comentariu.
        </div>
      </div>
    </div>
  );
};

export default AIFullCommentProcessor;


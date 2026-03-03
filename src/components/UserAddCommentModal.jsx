import React, { useState, useRef, useEffect } from 'react';
import { FileText, Image, Plus, Pencil, X, Scan, Sparkles } from 'lucide-react';
import { uploadImageToCloudinary } from '../utils/cloudinary';
import '../styles/admin.scss';
import '../styles/userAddCommentModal.scss';

const SPECII_LITERARE = [
  'roman', 'nuvelă', 'poezie simbolistă', 'poezie romantică', 'poezie modernistă',
  'comedie', 'basm', 'poveste', 'schiță', 'critică', 'memorii', 'dramă',
];

const CURENTE_LITERARE = [
  'realism', 'romantism', 'simbolism', 'modernism', 'postmodernism',
  'clasicism', 'baroc', 'iluminism', 'naturalism', 'expresionism',
];

const GENURI_LITERARE = [
  'epic', 'liric', 'dramatic', 'epic-liric', 'liric-dramatic',
];

const TIP_COMENTARIU_OPTIONS = [
  { value: 'general', label: 'Comentariu general' },
  { value: 'tema-viziune', label: 'Tema și viziunea' },
  { value: 'caracterizare-personaj', label: 'Caracterizarea personajului' },
  { value: 'relatie-doua-personaje', label: 'Relația dintre două personaje' },
];

const PLAN_WORD_RANGES = {
  free: { min: 400, max: 550, label: 'Gratis' },
  pro: { min: 600, max: 700, label: 'Pro' },
  premium: { min: 800, max: 900, label: 'Premium' },
};
const MAX_IMAGES = 4;

/**
 * Corectează caracterele românești corupte (encodare greșită sau erori OCR).
 * Când textul e copiat din PDF/Word cu encoding diferit sau extras prin OCR,
 * diacriticele (ș, ă, î, ţ, â) pot apărea ca ¥, þ, N y etc.
 */
function fixRomanianEncoding(text) {
  if (!text || typeof text !== 'string') return text;
  let result = text;
  // Encodare greșită (Windows-1250/ISO-8859-2 interpretat ca Latin-1)
  const encodingFixes = [
    ['¥', 'ș'],   // ș citit greșit
    ['þ', 'ț'],   // ț citit greșit
    ['Ÿ', 'ț'],   // ţ citit greșit
    ['ž', 'ș'],   // ş citit greșit
    ['º', 'ș'],   // unele variante
    ['ª', 'ț'],   // unele variante
  ];
  for (const [wrong, correct] of encodingFixes) {
    result = result.split(wrong).join(correct);
  }
  // Erori OCR frecvente pentru română
  result = result.replace(/\bN\s*y\b/gi, 'și');
  result = result.replace(/\bny\b/g, 'și');
  return result;
}

function countWords(text) {
  const normalized = (text || '')
    .replace(/[`*_#+>\[\]()]/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!normalized) return 0;
  return normalized.split(' ').filter(Boolean).length;
}

/**
 * Extrage cu AI (Groq) din textul comentariului: titlu, autor, an, curent, specie, gen, teme, motive, viziune, interpretare.
 * Returnează { titlu, autor, anAparitie, curentLiterar, specieLiterara, genLiterar, teme, motive, viziune, interpretare }.
 */
async function generateMetaWithAI(text, groqApiKeys, groqApiUrl) {
  const t = (text || '').trim();
  if (!t) return null;
  const body = {
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: `Ești expert în literatura română. Analizează textul de comentariu literar și extrage:
- titlu: titlul operei comentate (scurt)
- autor: autorul operei
- anAparitie: anul apariției (număr de 4 cifre sau gol)
- curentLiterar: unul din: realism, romantism, simbolism, modernism, postmodernism, clasicism, baroc, iluminism, naturalism, expresionism (sau gol)
- specieLiterara: unul din: roman, nuvelă, poezie simbolistă, poezie romantică, poezie modernistă, comedie, basm, poveste, schiță, critică, memorii, dramă (sau gol)
- genLiterar: unul din: epic, liric, dramatic, epic-liric, liric-dramatic (sau gol)
- teme: temele principale (separate prin virgulă)
- motive: motivele literare (separate prin virgulă)
- viziune: viziunea autorului asupra lumii
- interpretare: interpretare succintă

Răspunde DOAR cu un JSON valid, fără alt text:
{"titlu":"...","autor":"...","anAparitie":"...","curentLiterar":"...","specieLiterara":"...","genLiterar":"...","teme":"...","motive":"...","viziune":"...","interpretare":"..."}
Câmpurile teme/motive/viziune/interpretare maxim 80 caractere. În limba română.`,
      },
      {
        role: 'user',
        content: `Extrage din acest comentariu literar toate câmpurile: titlu operă, autor, an apariție, curent literar, specie literară, gen literar, teme, motive, viziune, interpretare:\n\n${t}`,
      },
    ],
    temperature: 0.3,
    max_tokens: 450,
  };
  let lastError;
  for (const key of groqApiKeys) {
    try {
      const res = await fetch(groqApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        lastError = new Error(err?.error?.message || `Groq API: ${res.status}`);
        continue;
      }
      const json = await res.json();
      const content = (json?.choices?.[0]?.message?.content || '').trim();
      if (content) {
        const parsed = JSON.parse(content.replace(/```json?\s*|\s*```/g, '').trim());
        return {
          titlu: (parsed.titlu || '').trim(),
          autor: (parsed.autor || '').trim(),
          anAparitie: (parsed.anAparitie || '').toString().trim(),
          curentLiterar: (parsed.curentLiterar || '').trim(),
          specieLiterara: (parsed.specieLiterara || '').trim(),
          genLiterar: (parsed.genLiterar || '').trim(),
          teme: (parsed.teme || '').trim(),
          motive: (parsed.motive || '').trim(),
          viziune: (parsed.viziune || '').trim(),
          interpretare: (parsed.interpretare || '').trim(),
        };
      }
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError || new Error('Nu s-a putut extrage cu AI.');
}

/** Groq limitează base64 la 4MB. Redimensionează imaginea dacă e prea mare. */
async function ensureImageUnderSizeLimit(dataUrl, maxBytes = 3.5 * 1024 * 1024) {
  const base64 = dataUrl?.split(',')[1];
  if (!base64) return dataUrl;
  const byteLength = (base64.length * 3) / 4;
  if (byteLength <= maxBytes) return dataUrl;
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      const scale = Math.sqrt(maxBytes / byteLength);
      width = Math.floor(width * scale);
      height = Math.floor(height * scale);
      width = Math.max(200, width);
      height = Math.max(200, height);
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const mime = dataUrl.match(/data:([^;]+);/)?.[1] || 'image/jpeg';
      const quality = 0.85;
      resolve(canvas.toDataURL(mime, quality));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

const UserAddCommentModal = ({ isOpen, onClose, onSubmit, onEditSubmit, initialComment, darkTheme, userDisplayName }) => {
  const [addMode, setAddMode] = useState('text');
  const [titlu, setTitlu] = useState('');
  const [autor, setAutor] = useState('');
  const [anAparitie, setAnAparitie] = useState('');
  const [curentLiterar, setCurentLiterar] = useState('');
  const [specieLiterara, setSpecieLiterara] = useState('');
  const [genLiterar, setGenLiterar] = useState('');
  const [tip, setTip] = useState('general');
  const [teme, setTeme] = useState('');
  const [motive, setMotive] = useState('');
  const [viziune, setViziune] = useState('');
  const [interpretare, setInterpretare] = useState('');
  const [plan, setPlan] = useState('free');
  const [sourceText, setSourceText] = useState('');
  const [remixedText, setRemixedText] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [ocrExtracting, setOcrExtracting] = useState(false);
  const [extractAILoading, setExtractAILoading] = useState(false);
  const [remixLoading, setRemixLoading] = useState(false);
  const [remixFromImage, setRemixFromImage] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const isEditMode = !!(initialComment?.id);

  useEffect(() => {
    if (isOpen && initialComment) {
      setAddMode(initialComment.type === 'image' ? 'image' : 'text');
      setTitlu(initialComment.titlu || '');
      setAutor(initialComment.autor || '');
      setAnAparitie(initialComment.anAparitie || '');
      setCurentLiterar(initialComment.curentLiterar || '');
      setSpecieLiterara(initialComment.specieLiterara || initialComment.categorie || '');
      setGenLiterar(initialComment.genLiterar || '');
      setTip(initialComment.tip || 'general');
      setTeme(initialComment.teme || '');
      setMotive(initialComment.motive || '');
      setViziune(initialComment.viziune || '');
      setInterpretare(initialComment.interpretare || '');
      setPlan(initialComment.plan || 'free');
      setSourceText(initialComment.type === 'text' ? (initialComment.content || '') : '');
      setRemixedText('');
      setImageFiles([]);
      setImagePreviews(
        initialComment.type === 'image' && initialComment.content
          ? [{ id: `existing-${Date.now()}`, name: 'Imagine existentă', url: initialComment.content, isExisting: true }]
          : []
      );
      setError('');
    } else if (isOpen && !initialComment) {
      resetForm();
    }
  }, [isOpen, initialComment?.id]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Disable scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        // Restore scroll position when modal closes
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const resetForm = () => {
    setAddMode('text');
    setTitlu('');
    setAutor('');
    setAnAparitie('');
    setCurentLiterar('');
    setSpecieLiterara('');
    setGenLiterar('');
    setTip('general');
    setTeme('');
    setMotive('');
    setViziune('');
    setInterpretare('');
    setPlan('free');
    setSourceText('');
    setRemixedText('');
    setImageFiles([]);
    setImagePreviews([]);
    setOcrExtracting(false);
    setExtractAILoading(false);
    setRemixLoading(false);
    setRemixFromImage(false);
    setError('');
  };

  const handleClose = () => {
    onClose();
  };

  const appendImages = async (incomingFiles) => {
    const files = Array.from(incomingFiles || []).filter(Boolean);
    if (!files.length) return;

    const currentCount = imagePreviews.length;
    if (currentCount >= MAX_IMAGES) {
      setError(`Poți adăuga maximum ${MAX_IMAGES} poze.`);
      return;
    }

    const allowed = [];
    for (const file of files) {
      if (!file.type?.startsWith('image/')) {
        setError('Poți adăuga doar imagini.');
        continue;
      }
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setError(`Imaginea "${file.name}" depășește 10MB.`);
        continue;
      }
      allowed.push(file);
    }

    const slotsLeft = Math.max(0, MAX_IMAGES - currentCount);
    const finalFiles = allowed.slice(0, slotsLeft);
    if (!finalFiles.length) return;

    const previews = await Promise.all(
      finalFiles.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (ev) =>
              resolve({
                id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
                name: file.name,
                url: ev.target.result,
                isExisting: false,
              });
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    );

    setImageFiles((prev) => [...prev, ...finalFiles]);
    setImagePreviews((prev) => [...prev, ...previews]);
    setRemixFromImage(false);
    setError('');

    if (allowed.length > slotsLeft) {
      setError(`Au fost adăugate doar ${slotsLeft} poze (maxim ${MAX_IMAGES}).`);
    }
  };

  const handleImageFileChange = async (e) => {
    await appendImages(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImagePaste = async (e) => {
    const items = Array.from(e.clipboardData?.items || []);
    const imageBlobs = items
      .filter((item) => item.type && item.type.startsWith('image/'))
      .map((item) => item.getAsFile())
      .filter(Boolean);
    if (!imageBlobs.length) return;
    e.preventDefault();
    const files = imageBlobs.map(
      (blob, idx) => new File([blob], `pasted-image-${Date.now()}-${idx + 1}.png`, { type: blob.type || 'image/png' })
    );
    await appendImages(files);
  };

  const removeImageAtIndex = (idx) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
    setImageFiles((prev) => prev.filter((_, i) => i !== idx));
    setRemixFromImage(false);
  };

  const parseRemixJson = (content) => {
    if (!content || typeof content !== 'string') return null;
    const cleaned = content.replace(/```json?\s*|\s*```/g, '').trim();
    try {
      return JSON.parse(cleaned);
    } catch (_) {
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (!match) return null;
      try {
        return JSON.parse(match[0]);
      } catch {
        return null;
      }
    }
  };

  const getRemixTextFromParsed = (parsed) => {
    if (!parsed || typeof parsed !== 'object') return '';
    const text = parsed.markdown ?? parsed.content ?? parsed.text ?? '';
    return (text || '').toString().trim();
  };

  const stripMarkdownHeadings = (text) => {
    if (!text || typeof text !== 'string') return '';
    return text
      .split('\n')
      .map((line) => line.replace(/^\s{0,3}#{1,6}\s+/, ''))
      .join('\n')
      .trim();
  };

  const toDataUrl = async (source) => {
    if (!source) return null;
    if (source.startsWith('data:')) return source;
    const resp = await fetch(source);
    const blob = await resp.blob();
    return await new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = reject;
      r.readAsDataURL(blob);
    });
  };

  const extractTextFromDataUrl = async (source) => {
    const groqApiKey = import.meta.env.VITE_GROQ_API_KEY || import.meta.env.VITE_GROQ_API_KEY_1;
    const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
    if (!groqApiKey) {
      throw new Error('Setează VITE_GROQ_API_KEY în .env.local pentru extragerea textului cu AI.');
    }

    let dataUrl = await toDataUrl(source);
    dataUrl = await ensureImageUnderSizeLimit(dataUrl);

    const res = await fetch(groqApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${groqApiKey}` },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Extrage textul exact din această imagine (OCR). Păstrează structura, paragrafele și formatarea. Limba este română. Returnează doar textul extras, fără explicații.',
              },
              { type: 'image_url', image_url: { url: dataUrl } },
            ],
          },
        ],
        max_tokens: 4096,
        temperature: 0.1,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Groq API: ${res.status}`);
    }
    const json = await res.json();
    const extracted = (json?.choices?.[0]?.message?.content || '').trim();
    if (!extracted) {
      throw new Error('Nu s-a putut extrage text din imagine. Încearcă o imagine mai clară.');
    }
    return fixRomanianEncoding(extracted);
  };

  const extractTextFromCurrentImages = async () => {
    if (!imagePreviews.length) {
      throw new Error('Selectează mai întâi una sau mai multe imagini.');
    }
    const allTexts = [];
    for (let i = 0; i < imagePreviews.length; i += 1) {
      const extracted = await extractTextFromDataUrl(imagePreviews[i].url);
      if (extracted) allTexts.push(extracted.trim());
    }
    const combined = allTexts.filter(Boolean).join('\n\n');
    if (!combined.trim()) {
      throw new Error('Nu am putut extrage text din imaginile selectate.');
    }
    return combined;
  };

  const handleExtractTextFromImage = async () => {
    if (!imagePreviews.length) return;
    setOcrExtracting(true);
    setError('');
    try {
      const extracted = await extractTextFromCurrentImages();
      setSourceText(extracted);
      setRemixedText('');
      setAddMode('text');
      setImageFiles([]);
      setImagePreviews([]);
    } catch (err) {
      setError(err?.message || 'Eroare la extragerea textului din imagine');
    } finally {
      setOcrExtracting(false);
    }
  };

  const handleRemixWithAI = async () => {
    const groqApiKeys = [import.meta.env.VITE_GROQ_API_KEY, import.meta.env.VITE_GROQ_API_KEY_1]
      .filter((k) => k && k !== 'undefined');
    const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';

    if (!groqApiKeys.length) {
      setError('Setează VITE_GROQ_API_KEY în .env pentru Remix AI.');
      return;
    }

    const selectedPlan = PLAN_WORD_RANGES[plan] ? plan : 'free';
    const { min, max, label } = PLAN_WORD_RANGES[selectedPlan];

    setRemixLoading(true);
    setError('');
    try {
      let inputText = (sourceText || '').trim();
      let usedImageFlow = false;

      if (!inputText && addMode === 'image') {
        setOcrExtracting(true);
        inputText = await extractTextFromCurrentImages();
        setOcrExtracting(false);
        usedImageFlow = true;
        setSourceText(inputText);
      }

      if (!inputText) {
        throw new Error('Adaugă text (sau imagine) înainte de Remix AI.');
      }

      const models = [
        'llama-3.3-70b-versatile',
        'openai/gpt-oss-120b',
        'moonshotai/kimi-k2-instruct-0905',
      ];

      const buildPrompt = (extraInstruction = '') => ({
        system: [
          'Ești profesor de limba și literatura română.',
          'Rescrii (remixezi) un comentariu literar păstrând ideile de bază, dar cu exprimare mai clară, coerentă și matură.',
          `LUNGIME: între ${min} și ${max} cuvinte.`,
          'Nu folosi liste numerotate; preferă paragrafe bine structurate. Nu inventa opere sau citate inexistente.',
          'Răspunde DOAR cu textul remixat, fără JSON, fără explicații, fără titluri înainte de text.',
          extraInstruction,
        ].filter(Boolean).join('\n'),
        user: `Remixează următorul comentariu:\n\n${inputText}`,
      });

      let remixed = '';
      let remixedWords = 0;
      let lastErr = null;

      const runOnce = async (extraInstruction = '') => {
        const prompt = buildPrompt(extraInstruction);
        for (const key of groqApiKeys) {
          for (const model of models) {
            try {
              const res = await fetch(groqApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
                body: JSON.stringify({
                  model,
                  messages: [
                    { role: 'system', content: prompt.system },
                    { role: 'user', content: prompt.user },
                  ],
                  temperature: 0.5,
                  max_tokens: 2500,
                }),
              });
              const raw = await res.text();
              if (!res.ok) {
                let msg = `Groq API: ${res.status}`;
                try {
                  const errJson = JSON.parse(raw);
                  msg = errJson?.error?.message || msg;
                } catch {
                  if (raw) msg = raw;
                }
                lastErr = msg;
                continue;
              }
              const data = JSON.parse(raw);
              let content = (data?.choices?.[0]?.message?.content || '').trim();
              const parsed = parseRemixJson(content);
              let markdown = getRemixTextFromParsed(parsed);
              if (!markdown && content.length > 30) {
                markdown = content.replace(/^```\w*\s*|\s*```$/g, '').trim();
              }
              markdown = stripMarkdownHeadings(markdown || '');
              if (!markdown) {
                lastErr = 'Răspuns AI fără text remixat.';
                continue;
              }
              remixed = markdown;
              remixedWords = countWords(markdown);
              return true;
            } catch (err) {
              lastErr = err?.message || 'Eroare la Remix AI.';
            }
          }
        }
        return false;
      };

      const ok = await runOnce();
      if (!ok) {
        throw new Error(lastErr || 'Nu s-a putut genera remix-ul.');
      }

      if (remixedWords < min || remixedWords > max) {
        await runOnce(
          `Corectează lungimea: MINIM ${min}, MAXIM ${max} cuvinte. Răspunde doar cu textul.`
        );
      }

      setRemixedText(remixed);
      setAddMode('text');
      setRemixFromImage(usedImageFlow || addMode === 'image');
      setError('');
    } catch (err) {
      setError(err?.message || 'Nu am putut face remix-ul cu AI.');
    } finally {
      setRemixLoading(false);
      setOcrExtracting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const submitData = (data) => {
      if (isEditMode && onEditSubmit) {
        return onEditSubmit(initialComment.id, data);
      }
      return onSubmit(data);
    };

    if (addMode === 'text') {
      const baseText = sourceText.trim();
      const remixText = remixedText.trim();
      const trimmed = remixText || baseText;
      if (!trimmed) {
        setError('Te rog introdu textul comentariului');
        return;
      }
      setUploading(true);
      try {
        setRemixFromImage(false);
        await submitData({
          type: 'text',
          content: trimmed,
          titlu,
          autor,
          anAparitie,
          curentLiterar,
          specieLiterara,
          genLiterar,
          tip,
          slug: '',
          isPublic: false,
          teme,
          motive,
          viziune,
          interpretare,
          plan,
        });
        resetForm();
        onClose();
      } catch (err) {
        setError(err.message || (isEditMode ? 'Eroare la actualizarea comentariului' : 'Eroare la adăugarea comentariului'));
      } finally {
        setUploading(false);
      }
    } else {
      const imageFinalText = remixedText.trim() || sourceText.trim();
      if (remixFromImage && imageFinalText) {
        setUploading(true);
        try {
          await submitData({
            type: 'text',
            content: imageFinalText,
            titlu,
            autor,
            anAparitie,
            curentLiterar,
            specieLiterara,
            genLiterar,
            tip,
            slug: '',
            isPublic: false,
            teme,
            motive,
            viziune,
            interpretare,
            plan,
          });
          resetForm();
          onClose();
        } catch (err) {
          setError(err.message || (isEditMode ? 'Eroare la actualizarea comentariului' : 'Eroare la adăugarea comentariului'));
        } finally {
          setUploading(false);
        }
        return;
      }

      let imageUrl;
      if (imageFiles.length > 1) {
        setError('Pentru salvare ca imagine se acceptă o singură poză. Pentru mai multe poze, folosește Remix AI.');
        return;
      }
      if (imageFiles.length === 1) {
        setUploading(true);
        try {
          imageUrl = await uploadImageToCloudinary(imageFiles[0], 'user-comments');
        } catch (err) {
          setError(err.message || 'Eroare la încărcarea imaginii');
          setUploading(false);
          return;
        }
      } else if (isEditMode && initialComment?.type === 'image' && imagePreviews[0]?.url) {
        imageUrl = imagePreviews[0].url;
      } else {
        setError('Te rog selectează o imagine');
        return;
      }
      if (!imageFiles.length) setUploading(true);
      try {
        await submitData({
          type: 'image',
          content: imageUrl,
          titlu,
          autor,
          anAparitie,
          curentLiterar,
          specieLiterara,
          genLiterar,
          tip,
          slug: '',
          isPublic: false,
          teme,
          motive,
          viziune,
          interpretare,
          plan,
        });
        resetForm();
        onClose();
      } catch (err) {
        setError(err.message || (isEditMode ? 'Eroare la actualizarea comentariului' : 'Eroare la încărcarea imaginii'));
      } finally {
        setUploading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`user-add-comment-modal-overlay ${darkTheme ? 'dark-theme' : ''}`}>
      <div
        className={`user-add-comment-modal user-add-comment-modal-expanded ${darkTheme ? 'dark-theme' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="user-add-comment-modal-header">
          <h2>{isEditMode ? 'Editează comentariu' : 'Adaugă comentariu'}</h2>
          <button type="button" onClick={handleClose} className="user-add-comment-modal-close" aria-label="Închide">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="user-add-comment-form">
          <div className="user-add-comment-tabs">
            <button
              type="button"
              className={`user-add-comment-tab ${addMode === 'text' ? 'active' : ''}`}
              onClick={() => { setAddMode('text'); setError(''); setImageFiles([]); setImagePreviews([]); setRemixFromImage(false); }}
            >
              <FileText size={18} />
              Text
            </button>
            <button
              type="button"
              className={`user-add-comment-tab ${addMode === 'image' ? 'active' : ''}`}
              onClick={() => { setAddMode('image'); setError(''); setSourceText(''); setRemixedText(''); setRemixFromImage(false); }}
            >
              <Image size={18} />
              Imagine
            </button>
          </div>

          <div className="user-add-comment-form-row">
          <div className="admin-form-group">
            <label htmlFor="user-comment-titlu">Titlu *</label>
            <input
              id="user-comment-titlu"
              type="text"
              value={titlu}
              onChange={(e) => {
                setTitlu(e.target.value);
                setError('');
              }}
              placeholder="Luceafărul — comentariu"
              className="admin-input"
              autoComplete="off"
              disabled={uploading}
            />
            </div>
            <div className="admin-form-group">
              <label htmlFor="user-comment-plan">Plan</label>
              <select
                id="user-comment-plan"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="admin-select"
                disabled={uploading}
              >
                <option value="free">Gratis</option>
                <option value="pro">Pro</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="user-comment-autor">Autor *</label>
            <input
              id="user-comment-autor"
              type="text"
              value={autor}
              onChange={(e) => { setAutor(e.target.value); setError(''); }}
              placeholder="Mihai Eminescu"
              className="admin-input"
              autoComplete="off"
              disabled={uploading}
            />
          </div>

          <div className="user-add-comment-form-row">
            <div className="admin-form-group">
              <label htmlFor="user-comment-an-aparitie">An apariție</label>
              <input
                id="user-comment-an-aparitie"
                type="text"
                value={anAparitie}
                onChange={(e) => { setAnAparitie(e.target.value); setError(''); }}
                placeholder="1920"
                className="admin-input"
                autoComplete="off"
                disabled={uploading}
              />
            </div>
            <div className="admin-form-group">
              <label htmlFor="user-comment-curent-literar">Curent literar</label>
              <select
                id="user-comment-curent-literar"
                value={curentLiterar}
                onChange={(e) => setCurentLiterar(e.target.value)}
                className="admin-select"
                disabled={uploading}
              >
                <option value="">Selectează</option>
                {CURENTE_LITERARE.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="user-add-comment-form-row">
            <div className="admin-form-group">
              <label htmlFor="user-comment-specie-literara">Specie literară</label>
              <select
                id="user-comment-specie-literara"
                value={specieLiterara}
                onChange={(e) => { setSpecieLiterara(e.target.value); setError(''); }}
                className="admin-select"
                disabled={uploading}
              >
                <option value="">Selectează</option>
                {SPECII_LITERARE.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label htmlFor="user-comment-gen-literar">Gen literar</label>
              <select
                id="user-comment-gen-literar"
                value={genLiterar}
                onChange={(e) => setGenLiterar(e.target.value)}
                className="admin-select"
                disabled={uploading}
              >
                <option value="">Selectează</option>
                {GENURI_LITERARE.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="user-comment-tip">Tip comentariu</label>
            <select
              id="user-comment-tip"
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              className="admin-select"
              disabled={uploading}
            >
              {TIP_COMENTARIU_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="admin-form-group">
            <label htmlFor="user-comment-teme">Teme</label>
            <input
              id="user-comment-teme"
              type="text"
              value={teme}
              onChange={(e) => { setTeme(e.target.value); setError(''); }}
              placeholder="pământ, iubire, destin, națională..."
              className="admin-input"
              autoComplete="off"
              disabled={uploading}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="user-comment-motive">Motive</label>
            <input
              id="user-comment-motive"
              type="text"
              value={motive}
              onChange={(e) => { setMotive(e.target.value); setError(''); }}
              placeholder="drumul, crucea..."
              className="admin-input"
              autoComplete="off"
              disabled={uploading}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="user-comment-viziune">Viziune</label>
            <input
              id="user-comment-viziune"
              type="text"
              value={viziune}
              onChange={(e) => { setViziune(e.target.value); setError(''); }}
              placeholder="realistă, obiectivă..."
              className="admin-input"
              autoComplete="off"
              disabled={uploading}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="user-comment-interpretare">Interpretare</label>
            <input
              id="user-comment-interpretare"
              type="text"
              value={interpretare}
              onChange={(e) => { setInterpretare(e.target.value); setError(''); }}
              placeholder="drama țăranului sărac în lupta pentru pământ..."
              className="admin-input"
              autoComplete="off"
              disabled={uploading}
            />
          </div>

          {addMode === 'text' ? (
            <div className="admin-form-group">
              <label htmlFor="user-comment-source-text">Text extras / original *</label>
              <textarea
                id="user-comment-source-text"
                value={sourceText}
                onChange={(e) => { setSourceText(e.target.value); setError(''); }}
                placeholder="Lipește aici textul extras din poză sau textul original..."
                rows={8}
                className="admin-textarea"
                autoComplete="off"
                disabled={uploading}
              />
              <label htmlFor="user-comment-remix-text" style={{ marginTop: '0.85rem' }}>Text remixat (AI)</label>
              <textarea
                id="user-comment-remix-text"
                value={remixedText}
                onChange={(e) => { setRemixedText(e.target.value); setError(''); }}
                placeholder="Aici apare varianta remixată. Poți edita manual înainte de salvare."
                rows={8}
                className="admin-textarea"
                autoComplete="off"
                disabled={uploading || remixLoading}
              />
              <div className="user-add-comment-text-actions">
                <button
                  type="button"
                  onClick={async () => {
                    const t = sourceText?.trim();
                    if (!t) {
                      setError('Introdu mai întâi textul complet pentru extragere cu AI.');
                      return;
                    }
                    const groqKeys = [import.meta.env.VITE_GROQ_API_KEY, import.meta.env.VITE_GROQ_API_KEY_1]
                      .filter((k) => k && k !== 'undefined');
                    if (!groqKeys.length) {
                      setError('Setează VITE_GROQ_API_KEY în .env pentru extragerea cu AI.');
                      return;
                    }
                    setExtractAILoading(true);
                    setError('');
                    try {
                      const result = await generateMetaWithAI(
                        t,
                        groqKeys,
                        import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions'
                      );
                      if (result) {
                        if (result.titlu) setTitlu(result.titlu);
                        if (result.autor) setAutor(result.autor);
                        if (result.anAparitie !== undefined) setAnAparitie(result.anAparitie);
                        if (result.curentLiterar) setCurentLiterar(result.curentLiterar);
                        if (result.specieLiterara) setSpecieLiterara(result.specieLiterara);
                        if (result.genLiterar) setGenLiterar(result.genLiterar);
                        setTeme(result.teme || '');
                        setMotive(result.motive || '');
                        setViziune(result.viziune || '');
                        setInterpretare(result.interpretare || '');
                      }
                    } catch (err) {
                      setError(err?.message || 'Eroare la extragerea cu AI.');
                    } finally {
                      setExtractAILoading(false);
                    }
                  }}
                  disabled={uploading || extractAILoading || !sourceText?.trim()}
                  className="user-add-comment-generate-desc"
                  title="Extrage cu AI titlu, autor, an, curent, specie, gen, teme, motive, viziune și interpretare din text"
                >
                  {extractAILoading ? (
                    <>
                      <span className="user-add-comment-spinner" />
                      Se extrage...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      Extrage cu AI
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleRemixWithAI}
                  disabled={uploading || remixLoading || ocrExtracting || (!sourceText?.trim() && addMode !== 'image')}
                  className="user-add-comment-remix-btn"
                  title={`Remix AI pentru planul ${PLAN_WORD_RANGES[plan]?.label || 'Gratis'}`}
                >
                  {remixLoading ? (
                    <>
                      <span className="user-add-comment-spinner" />
                      Se face remix...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      Remix AI ({PLAN_WORD_RANGES[plan]?.label || 'Gratis'})
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="admin-form-group">
              <label>Imagine *</label>
              <div
                className="user-add-comment-image-upload"
                onPaste={handleImagePaste}
                tabIndex={0}
                title="Poți lipi imagini aici cu Ctrl+V"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageFileChange}
                  className="user-add-comment-file-input"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="user-add-comment-upload-trigger"
                >
                  {imagePreviews.length ? (
                    <div className="user-add-comment-previews-grid">
                      {imagePreviews.map((img, idx) => (
                        <div key={img.id || `${img.url}-${idx}`} className="user-add-comment-preview-item">
                          <img src={img.url} alt={img.name || `Poza ${idx + 1}`} className="user-add-comment-preview" />
                          <button
                            type="button"
                            className="user-add-comment-preview-remove"
                            onClick={(e) => { e.stopPropagation(); removeImageAtIndex(idx); }}
                            title="Șterge poza"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <Image size={40} />
                      <span>Selectează imagini (maxim 4)</span>
                      <small>Poți selecta multiplu (Shift) sau lipi cu Ctrl+V</small>
                    </>
                  )}
                </button>
                {imagePreviews.length > 0 && (
                  <div className="user-add-comment-image-actions">
                    <button
                      type="button"
                      onClick={handleExtractTextFromImage}
                      disabled={ocrExtracting}
                      className="user-add-comment-extract-btn"
                      title="Extrage textul din imagine folosind AI (Groq Vision)"
                    >
                      {ocrExtracting ? (
                        <>
                          <span className="user-add-comment-spinner" />
                          Se extrage textul...
                        </>
                      ) : (
                        <>
                          <Scan size={18} />
                          Extrage text cu AI
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleRemixWithAI}
                      disabled={ocrExtracting || remixLoading || uploading}
                      className="user-add-comment-remix-btn"
                      title={`Extrage și remixează pentru planul ${PLAN_WORD_RANGES[plan]?.label || 'Gratis'}`}
                    >
                      {remixLoading ? (
                        <>
                          <span className="user-add-comment-spinner" />
                          Se face remix...
                        </>
                      ) : (
                        <>
                          <Sparkles size={18} />
                          Remix AI ({PLAN_WORD_RANGES[plan]?.label || 'Gratis'})
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setImageFiles([]); setImagePreviews([]); }}
                      className="user-add-comment-clear-preview"
                    >
                      Șterge imaginile
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="user-add-comment-error">{error}</div>
          )}

          <div className="user-add-comment-actions">
            <button type="button" onClick={handleClose} className="user-add-comment-cancel">
              Anulează
            </button>
            <button
              type="submit"
              disabled={uploading || (addMode === 'image' && !imageFiles.length && !(isEditMode && imagePreviews.length))}
              className="admin-submit-button user-add-comment-submit"
            >
              {uploading ? (
                <>
                  <span className="user-add-comment-spinner" />
                  {isEditMode ? 'Se actualizează...' : 'Se adaugă...'}
                </>
              ) : (
                <>
                  {isEditMode ? <Pencil size={18} /> : <Plus size={18} />}
                  {isEditMode ? 'Actualizează comentariu' : 'Adaugă comentariu'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAddCommentModal;

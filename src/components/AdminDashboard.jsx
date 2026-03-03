import React, { useState, useEffect, useLayoutEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { addComentariu, updateComentariu } from '../firebase/comentariiService';
import { addSubiect, updateSubiect } from '../firebase/subiecteService';
import { addFilm, updateFilm } from '../firebase/filmeService';
import { 
  fetchScriitori, 
  addScriitor, 
  updateScriitor, 
  deleteScriitor,
  addPostToScriitor,
  updatePostForScriitor,
  deletePostFromScriitor,
  addCommentToPost,
  updateCommentInPost,
  deleteCommentFromPost
} from '../firebase/scriitoriService';
import { uploadImageToCloudinary } from '../utils/cloudinary';
import RichTextEditor from './RichTextEditor';
import AvatarSearchBar from '../assets/AvatarSearchBar';
import { getScriitoriData } from '../firebase/scriitoriService';
import { useAuth } from '../firebase/AuthContext';
import { createNotification } from '../firebase/notificationsService';
import AICerinteProcessor from './AICerinteProcessor';
import AIPostGenerator from './AIPostGenerator';
import AIComentariuFormatter, { safeParseJson } from './AIComentariuFormatter';
import AICommentGenerator from './AICommentGenerator';
import AIComentariuDescriptionGenerator from './AIComentariuDescriptionGenerator';
import AIFullCommentProcessor from './AIFullCommentProcessor';
import '../styles/admin.scss';

const REACTIONS = [
  { type: 'like', label: 'Like', emoji: '👍' },
  { type: 'love', label: 'Inimă', emoji: '❤️' },
  { type: 'ador', label: 'Ador', emoji: '😍' },
  { type: 'wow', label: 'Wow', emoji: '😮' },
  { type: 'haha', label: 'Haha', emoji: '😂' },
  { type: 'sad', label: 'Trist', emoji: '😢' },
  { type: 'cry', label: 'Plânge', emoji: '😭' },
  { type: 'angry', label: 'Nervos', emoji: '😡' },
  { type: 'strengh', label: 'Puternic', emoji: '💪' },
  { type: 'multumire', label: 'Mulțumit', emoji: '🙏' },
  { type: 'fire', label: 'Fierbinte', emoji: '🔥' },
  { type: 'cool', label: 'Tare', emoji: '😎' },
  { type: 'clap', label: 'Aplauze', emoji: '👏' },
  { type: 'Romania', label: 'Romania', emoji: '🇷🇴' }
];

const AdminDashboard = ({ darkTheme, onLogout, initialCommentData, addFromUserComment, initialSubjectData }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('comentarii');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingSubiect, setIsEditingSubiect] = useState(false);
  const [isEditingFilm, setIsEditingFilm] = useState(false);
  const [isEditingScriitor, setIsEditingScriitor] = useState(false);
  const [scriitoriList, setScriitoriList] = useState([]);
  const [selectedScriitor, setSelectedScriitor] = useState(null);
  const [scriitorView, setScriitorView] = useState('list'); // 'list', 'add', 'edit', 'posts', 'post-add', 'post-edit'
  const [allScriitoriForSearch, setAllScriitoriForSearch] = useState([]);
  const [expandedPoems, setExpandedPoems] = useState(new Set());
  const editingCommentRef = useRef(null);
  const hasInitializedTabRef = useRef(false);
  // Generate unique tab ID for this instance (each tab/component instance gets its own ID)
  // This ID is generated once per component mount and never changes
  const tabIdRef = useRef(`tab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const { currentUser, userProfile } = useAuth();
  const currentUserId = currentUser?.uid || null;
  const userEmail = currentUser?.email || userProfile?.email || '';
  const userDisplayName = userProfile?.displayName || currentUser?.displayName || '';
  const isAdminUser = userProfile?.isAdmin === true;
  const isSemiAdminUser = userProfile?.isSemiAdmin === true;
  const isLimitedAdminView = !isAdminUser && isSemiAdminUser;

  const canEditResource = useCallback((ownerId, { allowSemiAdminFullAccess = false } = {}) => {
    if (isAdminUser) return true;
    if (isSemiAdminUser) {
      if (allowSemiAdminFullAccess) {
        return true;
      }
      if (ownerId && currentUserId) {
        return ownerId === currentUserId;
      }
    }
    return false;
  }, [isAdminUser, isSemiAdminUser, currentUserId]);

  const ensureOwnershipContext = useCallback(() => {
    if (!currentUserId) {
      throw new Error('Profilul utilizatorului nu este încărcat. Reîncearcă după ce te autentifici din nou.');
    }
  }, [currentUserId]);

  const attachOwnershipMetadata = useCallback((payload = {}) => {
    if (!currentUserId) return payload;
    const enriched = { ...payload };
    if (!enriched.createdBy) {
      enriched.createdBy = currentUserId;
      enriched.createdByEmail = userEmail;
      enriched.createdByName = userDisplayName;
    }
    enriched.lastUpdatedBy = currentUserId;
    enriched.lastUpdatedByEmail = userEmail;
    enriched.lastUpdatedByName = userDisplayName;
    return enriched;
  }, [currentUserId, userEmail, userDisplayName]);

  const ensureCanEdit = useCallback((ownerId, errorMessage, options = {}) => {
    if (!canEditResource(ownerId, options)) {
      throw new Error(errorMessage || 'Nu ai permisiuni pentru a modifica această resursă.');
    }
  }, [canEditResource]);

  // Helper function to update URL params
  const updateUrlParams = useCallback((updates) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const metaGeneratedForCommentRef = useRef(null);
  const generateMetaFromContentRef = useRef(null);

  // Load all scriitori for searchbars
  useEffect(() => {
    const loadScriitoriForSearch = async () => {
      try {
        const scriitoriData = await getScriitoriData();
        const scriitoriArray = Object.values(scriitoriData).map(s => ({
          nume: s.nume || '',
          img: s.img || '',
          key: s.key || s.id,
          biografie: s.biografie || '',
          date: s.date || '',
          categorie: s.categorie || '',
        }));
        setAllScriitoriForSearch(scriitoriArray);
      } catch (error) {
        console.error('Error loading scriitori for search:', error);
      }
    };
    if (activeTab === 'scriitori') {
      loadScriitoriForSearch();
    }
  }, [activeTab]);

  // Comentariu form state
  const [comentariuForm, setComentariuForm] = useState({
    id: '',
    titlu: '',
    autor: '',
    categorie: '',
    tip: 'general',
    plan: 'free',
    descriere: '',
    content: [], // Changed from text to content (array of blocks)
    createdBy: '',
    createdByEmail: '',
    createdByName: '',
  });
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [fullCommentText, setFullCommentText] = useState('');

  // Read tab from URL params only on initial mount
  useEffect(() => {
    if (hasInitializedTabRef.current) return;
    const tabParam = searchParams.get('tab');
    if (tabParam === 'subiecte' || tabParam === 'comentarii' || tabParam === 'scriitori' || tabParam === 'filme') {
      setActiveTab(tabParam);
    }
    hasInitializedTabRef.current = true;
  }, [searchParams]);

  // Populate form when initialCommentData is provided
  useEffect(() => {
    if (initialCommentData) {
      const resolvedId = initialCommentData.id || initialCommentData.docId || initialCommentData.docID || '';
      const isAddFromUser = addFromUserComment === true;
      setIsEditing(!isAddFromUser && !!resolvedId);
      setEditingCommentId(isAddFromUser ? null : (resolvedId || null));
      const rawContent = initialCommentData.content ?? initialCommentData.text ?? '';
      const contentBlocks = Array.isArray(rawContent)
        ? rawContent
        : (typeof rawContent === 'string' && rawContent
            ? rawContent.split(/\n\n+/).map((t) => ({ type: 'paragraph', text: t.trim() })).filter((b) => b.text)
            : []);
      if (contentBlocks.length === 0 && typeof rawContent === 'string' && rawContent.trim()) {
        contentBlocks.push({ type: 'paragraph', text: rawContent.trim() });
      }
      setComentariuForm({
        id: isAddFromUser ? '' : (resolvedId || ''),
        titlu: initialCommentData.titlu || '',
        autor: initialCommentData.autor || '',
        categorie: initialCommentData.categorie || initialCommentData.specieLiterara || '',
        tip: initialCommentData.tip || 'general',
        plan: initialCommentData.plan === 'premium' ? 'premium' : initialCommentData.plan === 'pro' ? 'pro' : 'free',
        descriere: initialCommentData.descriere || '',
        content: contentBlocks.length ? contentBlocks : (initialCommentData.text ? [{ type: 'paragraph', text: initialCommentData.text }] : []),
        createdBy: initialCommentData.createdBy || '',
        createdByEmail: initialCommentData.createdByEmail || '',
        createdByName: initialCommentData.createdByName || '',
      });
      setActiveTab('comentarii');
      updateUrlParams({ tab: 'comentarii' });

      const contentStr = typeof rawContent === 'string'
        ? rawContent
        : (Array.isArray(rawContent) ? rawContent.map((b) => (typeof b === 'string' ? b : b?.text || '')).join('\n\n') : '');
      const needsMeta = isAddFromUser && contentStr.trim();
      const commentKey = initialCommentData.id || contentStr.slice(0, 100);
      if (needsMeta && metaGeneratedForCommentRef.current !== commentKey) {
        metaGeneratedForCommentRef.current = commentKey;
        generateMetaFromContentRef.current?.(contentStr, contentBlocks);
      }
    } else {
      setEditingCommentId(null);
      metaGeneratedForCommentRef.current = null;
    }
  }, [initialCommentData, addFromUserComment, updateUrlParams]);

  // Helper function to extract year from subject data (checks both 'an' and 'data' fields)
  const extractYearFromSubject = (subjectData) => {
    if (!subjectData) return new Date().getFullYear().toString();
    
    // First try 'an' field
    if (subjectData.an !== undefined && subjectData.an !== null) {
      const yearFromAn = parseInt(subjectData.an, 10);
      if (!Number.isNaN(yearFromAn)) {
        return yearFromAn.toString();
      }
    }
    
    // If 'an' is not available, try 'data' field
    const dataStr = subjectData.data ?? '';
    if (dataStr) {
      // Extract year from data string (e.g., "2025" or "2025 sesiune de vară")
      const match = String(dataStr).match(/(\d{4})/);
      if (match) {
        return match[1];
      }
    }
    
    // Default to current year
    return new Date().getFullYear().toString();
  };

  // Populate form when initialSubjectData is provided
  useEffect(() => {
    if (initialSubjectData) {
      setIsEditingSubiect(true);
      setSubiectForm({
        id: initialSubjectData.id || '',
        titlu: initialSubjectData.titlu || '',
        descriere: initialSubjectData.descriere || '',
        numarSubiect: initialSubjectData.numarSubiect?.toString() || '1',
        subpunct: initialSubjectData.subpunct || '',
        profil: initialSubjectData.profil || 'real',
        an: extractYearFromSubject(initialSubjectData),
        sesiune: initialSubjectData.sesiune || 'sesiune de vară',
        text: initialSubjectData.text || (typeof initialSubjectData.text === 'object' && initialSubjectData.text?.text ? initialSubjectData.text.text : ''),
        cerinte: Array.isArray(initialSubjectData.cerinte) 
          ? initialSubjectData.cerinte.join('\n')
          : (initialSubjectData.cerinte || ''),
        punctaj: Array.isArray(initialSubjectData.punctaj)
          ? initialSubjectData.punctaj.join('\n')
          : (initialSubjectData.punctaj || ''),
        createdBy: initialSubjectData.createdBy || '',
        createdByEmail: initialSubjectData.createdByEmail || '',
        createdByName: initialSubjectData.createdByName || '',
      });
      setActiveTab('subiecte');
      updateUrlParams({ tab: 'subiecte' });
      // Clear sessionStorage draft when editing an existing subiect
      try {
        const storageKey = `admin_subiect_form_draft_${tabIdRef.current}`;
        sessionStorage.removeItem(storageKey);
      } catch (error) {
        console.error('Error clearing subiect form draft from sessionStorage:', error);
      }
    }
  }, [initialSubjectData, updateUrlParams]);

  // Subiect form state
  const [subiectForm, setSubiectForm] = useState(() => {
    // Try to restore from sessionStorage on initial mount
    try {
      const storageKey = `admin_subiect_form_draft_${tabIdRef.current}`;
      const saved = sessionStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only restore if it's not empty (has at least one field filled)
        if (parsed && (parsed.titlu || parsed.text || parsed.cerinte || parsed.descriere)) {
          return {
            id: '',
            titlu: parsed.titlu || '',
            descriere: parsed.descriere || '',
            numarSubiect: parsed.numarSubiect || '1',
            subpunct: parsed.subpunct || '',
            profil: parsed.profil || 'real',
            an: parsed.an || new Date().getFullYear(),
            sesiune: parsed.sesiune || 'sesiune de vară',
            text: parsed.text || '',
            cerinte: parsed.cerinte || '',
            punctaj: parsed.punctaj || '',
            createdBy: '',
            createdByEmail: '',
            createdByName: '',
          };
        }
      }
    } catch (error) {
      console.error('Error restoring subiect form from sessionStorage:', error);
    }
    return {
      id: '',
      titlu: '',
      descriere: '',
      numarSubiect: '1',
      subpunct: '',
      profil: 'real',
      an: new Date().getFullYear(),
      sesiune: 'sesiune de vară',
      text: '',
      cerinte: '',
      punctaj: '',
      createdBy: '',
      createdByEmail: '',
      createdByName: '',
    };
  });

  const allowSubiectTextNewlines = useMemo(() => {
    const numarStr = (subiectForm.numarSubiect ?? '').toString();
    const profilLower = (subiectForm.profil ?? '').toLowerCase();
    return profilLower === 'uman' && numarStr === '3';
  }, [subiectForm.numarSubiect, subiectForm.profil]);

  // Save subiect form to sessionStorage whenever it changes (only when not editing)
  useEffect(() => {
    if (!isEditingSubiect && activeTab === 'subiecte') {
      try {
        // Only save if form has some content
        if (subiectForm.titlu || subiectForm.text || subiectForm.cerinte || subiectForm.descriere) {
          const formToSave = {
            titlu: subiectForm.titlu,
            descriere: subiectForm.descriere,
            numarSubiect: subiectForm.numarSubiect,
            subpunct: subiectForm.subpunct,
            profil: subiectForm.profil,
            an: subiectForm.an,
            sesiune: subiectForm.sesiune,
            text: subiectForm.text,
            cerinte: subiectForm.cerinte,
            punctaj: subiectForm.punctaj,
          };
          const storageKey = `admin_subiect_form_draft_${tabIdRef.current}`;
          sessionStorage.setItem(storageKey, JSON.stringify(formToSave));
        }
      } catch (error) {
        console.error('Error saving subiect form to sessionStorage:', error);
      }
    }
  }, [subiectForm, isEditingSubiect, activeTab]);

  // Restore subiect form from sessionStorage when tab becomes active (only when not editing and no initial data)
  useEffect(() => {
    if (activeTab === 'subiecte' && !isEditingSubiect && !initialSubjectData) {
      try {
        const storageKey = `admin_subiect_form_draft_${tabIdRef.current}`;
        const saved = sessionStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          // Only restore if it's not empty (has at least one field filled)
          if (parsed && (parsed.titlu || parsed.text || parsed.cerinte || parsed.descriere)) {
            setSubiectForm(prev => ({
              ...prev,
              titlu: parsed.titlu || prev.titlu,
              descriere: parsed.descriere || prev.descriere,
              numarSubiect: parsed.numarSubiect || prev.numarSubiect,
              subpunct: parsed.subpunct || prev.subpunct,
              profil: parsed.profil || prev.profil,
              an: parsed.an || prev.an,
              sesiune: parsed.sesiune || prev.sesiune,
              text: parsed.text || prev.text,
              cerinte: parsed.cerinte || prev.cerinte,
              punctaj: parsed.punctaj || prev.punctaj,
            }));
          }
        }
      } catch (error) {
        console.error('Error restoring subiect form from sessionStorage:', error);
      }
    }
  }, [activeTab, isEditingSubiect, initialSubjectData]);

  // Auto-set punctaj based on numarSubiect and subpunct
  useEffect(() => {
    // Only auto-set if not editing and form is not empty (user is actively working)
    if (!isEditingSubiect && activeTab === 'subiecte') {
      let newPunctaj = '';
      
      if (subiectForm.numarSubiect === '1' && subiectForm.subpunct === 'A') {
        // Subiect 1 A: 6 întrebări de 5 puncte fiecare
        newPunctaj = '6\n6\n6\n6\n6';
      } else if (subiectForm.numarSubiect === '1' && subiectForm.subpunct === 'B') {
        // Subiect 1 B: Total 20
        newPunctaj = 'Total: 20\nSumar conținut: 14\nSumar redactare: 6';
      } else if (subiectForm.numarSubiect === '2') {
        // Subiect 2: Total 10
        newPunctaj = 'Total: 10\nConținut: 6\nRedactare: 4 puncte (utilizarea limbii literare – 1 punct; logica înlănțuirii ideilor – 1 punct; ortografia – 1 punct; punctuaţia – 1 punct)';
      }
      else if (subiectForm.numarSubiect === '3') {
        // Subiect 3: 3 cerințe de 6 puncte + Redactare 12 puncte
        newPunctaj = '6\n6\n6\nRedactare: 12 puncte(existența părților componente – introducere, cuprins, încheiere – 1 punct; logica înlănțuirii ideilor – 1 punct; abilități de analiză și de argumentare – 3 puncte; utilizarea limbii literare – 2 puncte; ortografia – 2 puncte; punctuaţia – 2 puncte; așezarea în pagină, lizibilitatea – 1 punct)';
      }
      // Only update if we have a new punctaj value and it's different from current
      if (newPunctaj && newPunctaj !== subiectForm.punctaj) {
        setSubiectForm(prev => ({ ...prev, punctaj: newPunctaj }));
      }
    }
  }, [subiectForm.numarSubiect, subiectForm.subpunct, isEditingSubiect, activeTab]);

  const categorii = [
    'poezie', 'roman', 'comedie', 'basm', 'nuvela', 
    'critica', 'memorii', 'poveste', 'schita'
  ];

  const comentariuTipOptions = [
    { value: 'general', label: 'Comentariu general' },
    { value: 'tema-viziune', label: 'Tema și viziunea' },
    { value: 'caracterizare-personaj', label: 'Caracterizarea personajului' },
    { value: 'relatie-doua-personaje', label: 'Relația dintre două personaje' },
  ];

  const categoriiFilme = [
    'poezie', 'proza', 'roman', 'comedie', 'basm', 'nuvela', 'teatru'
  ];

  // Film form state
  const [filmForm, setFilmForm] = useState({
    id: '',
    titlu: '',
    descriere: '',
    videoId: '',
    categorie: '',
    durata: '',
    autor: '',
    createdBy: '',
    createdByEmail: '',
    createdByName: '',
  });

  // Scriitor form state
  const [scriitorForm, setScriitorForm] = useState({
    key: '',
    nume: '',
    date: '',
    img: '',
    banner: '',
    color: 'rgba(255,179,71,0.82)',
    categorie: '',
    canonic: true,
    friends: [],
    gallery: [],
    posts: [],
    prezentare: null, // { titlu: '', paragrafe: [] }
    biografie: '', // Text lung pentru "Citește tot"
    info: null, // { ocupatie, studii, activitate, locNastere, perioada, opere }
    opere: {}, // { 'opere de BAC': [], poezii: [], proza: [], etc. }
    ordine: 999,
    // Temporary fields for adding friends
    newFriendKey: '',
    newFriendName: '',
    // Temporary field for editing opere JSON
    opereJsonText: '',
    createdBy: '',
    createdByEmail: '',
    createdByName: '',
  });

  // Post form state (for adding/editing posts)
  const [postForm, setPostForm] = useState({
    id: '',
    date: '',
    author: '',
    text: '',
    descriere: '',
    image: '',
    pin: false,
    isPoem: false,
    isStory: false,
    poemTitle: '',
    poemText: '',
    poemPreview: '',
    poemImages: [],
    poemImagesOnLeft: true,
    storyTitle: '',
    storyText: '',
    storyImageOnLeft: true,
    showReadAllButton: false,
    readAllButtonText: '',
    readAllButtonLink: '',
    storyMoreText: '',
    pinnedActions: [],
    reactions: [],
    comments: [],
    // Temporary fields for adding new comment/reaction
    newCommentAuthor: '',
    newCommentKey: '',
    newCommentText: '',
    editingCommentText: '',
    newReactionFriendKey: '',
    newReactionFriendName: '',
    newReactionType: '',
    createdBy: '',
    createdByEmail: '',
    createdByName: '',
  });
  const [aiPostPrompt, setAiPostPrompt] = useState('');
  const [aiCommentPrompt, setAiCommentPrompt] = useState('');
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [isGeneratingReactions, setIsGeneratingReactions] = useState(false);
  const [isGeneratingComentariuDescription, setIsGeneratingComentariuDescription] = useState(false);
  const [isGeneratingComentariuMeta, setIsGeneratingComentariuMeta] = useState(false);
  const [isGeneratingTitlesOnly, setIsGeneratingTitlesOnly] = useState(false);
  const [richTextEditorKey, setRichTextEditorKey] = useState(0);
  const poemTextDebounceRef = useRef(null);
  const reactionsDebounceRef = useRef(null);
  const comentariuDescriereDebounceRef = useRef(null);

  // Generează doar id, categorie și titlurile paragrafelor cu Groq (pentru addFromUserComment)
  const generateMetaFromContent = useCallback(async (content, contentBlocks) => {
    if (!content || typeof content !== 'string' || !content.trim()) return;
    const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
    const groqApiKeyBackup = import.meta.env.VITE_GROQ_API_KEY_1;
    const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
    const groqKeys = [groqApiKey, groqApiKeyBackup].filter((k) => k && typeof k === 'string' && k.trim() && k !== 'undefined');
    if (groqKeys.length === 0) return;

    setIsGeneratingComentariuMeta(true);
    const numParagraphs = Array.isArray(contentBlocks) ? contentBlocks.length : 1;
    const textSnippet = content.length > 2800 ? content.slice(0, 2800) + '...' : content;
    const prompt = `Pe baza următorului text de comentariu literar, generează DOAR un obiect JSON valid cu exact aceste chei:
- "id": string, id URL-friendly (ex: mihai-eminescu-luceafarul-1234567890) - autor-titlu-sau-tema-timestamp
- "categorie": string, UNA din: poezie, roman, comedie, basm, nuvela, critica, memorii, poveste, schita
- "titluriParagrafe": array de ${numParagraphs} string-uri - câte un titlu scurt (3-8 cuvinte) pentru fiecare paragraf, în ordine

Text comentariu:
${textSnippet}

Returnează DOAR JSON valid, fără markdown, fără \`\`\`. Exemplu: {"id":"autor-operă-123","categorie":"poezie","titluriParagrafe":["Tema centrală","Structura","Simbolistica"]}`;

    try {
      for (const key of groqKeys) {
        try {
          const res = await fetch(groqApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key.trim()}` },
            body: JSON.stringify({
              model: 'openai/gpt-oss-120b',
              messages: [
                { role: 'system', content: 'Răspunde DOAR cu JSON valid. Fără markdown, fără explicatii.' },
                { role: 'user', content: prompt },
              ],
              temperature: 0.25,
              max_tokens: 500,
            }),
          });
          if (!res.ok) {
            if (res.status === 401) {
              setMessage({ type: 'error', text: 'Cheia API Groq (VITE_GROQ_API_KEY) este invalidă sau a expirat. Verifică .env și console.groq.com' });
            }
            continue;
          }
          const data = await res.json();
          const raw = data?.choices?.[0]?.message?.content || '';
          if (!raw || typeof raw !== 'string') continue;
          const parsed = safeParseJson(raw);
          const validCats = ['poezie', 'roman', 'comedie', 'basm', 'nuvela', 'critica', 'memorii', 'poveste', 'schita'];
          const cat = validCats.includes(parsed.categorie) ? parsed.categorie : 'poezie';
          const titles = Array.isArray(parsed.titluriParagrafe) ? parsed.titluriParagrafe : [];
          const updatedContent = (contentBlocks || []).map((block, i) => ({
            ...block,
            title: titles[i] != null ? String(titles[i]).trim() : (block.title || ''),
          }));
          setComentariuForm((prev) => ({
            ...prev,
            ...(parsed.id != null && { id: String(parsed.id).trim() }),
            categorie: cat,
            content: updatedContent.length ? updatedContent : prev.content,
          }));
          break;
        } catch {
          continue;
        }
      }
    } catch (err) {
      console.warn('Eroare la generarea meta din conținut:', err);
    } finally {
      setIsGeneratingComentariuMeta(false);
    }
  }, []);

  useLayoutEffect(() => {
    generateMetaFromContentRef.current = generateMetaFromContent;
  }, [generateMetaFromContent]);

  const generateTitlesOnly = useCallback(async () => {
    const contentBlocks = comentariuForm.content || [];
    const paragraphsWithText = contentBlocks.filter((b) => (b?.text || '').trim().length > 0);
    const contentStr = paragraphsWithText.map((b) => (b?.text || '').trim()).join('\n\n');

    console.log('[generateTitlesOnly] START', {
      contentBlocks,
      paragraphsWithText,
      numParagraphs: paragraphsWithText.length,
      contentStrLength: contentStr.length,
    });

    if (!contentStr.trim()) {
      console.log('[generateTitlesOnly] ABORT: niciun paragraf cu text');
      setMessage({ type: 'error', text: 'Adaugă paragrafe cu text înainte de a genera titlurile.' });
      return;
    }

    const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
    const groqApiKeyBackup = import.meta.env.VITE_GROQ_API_KEY_1;
    const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
    const groqKeys = [groqApiKey, groqApiKeyBackup].filter((k) => k && typeof k === 'string' && k.trim() && k !== 'undefined');

    console.log('[generateTitlesOnly] Groq config', {
      hasKey: !!groqApiKey,
      groqKeysLength: groqKeys.length,
      groqApiUrl,
    });

    if (groqKeys.length === 0) {
      console.log('[generateTitlesOnly] ABORT: VITE_GROQ_API_KEY lipsește în .env');
      setMessage({ type: 'error', text: 'Setează VITE_GROQ_API_KEY în .env' });
      return;
    }

    setIsGeneratingTitlesOnly(true);
    setMessage({ type: '', text: '' });
    const numParagraphs = paragraphsWithText.length;
    const textSnippet = contentStr.length > 2800 ? contentStr.slice(0, 2800) + '...' : contentStr;
    const prompt = `Pe baza textului de mai jos, generează DOAR un obiect JSON cu cheia "titluriParagrafe": un array de ${numParagraphs} string-uri - câte un titlu scurt (3-8 cuvinte) pentru fiecare paragraf, în ordine.

Text:
${textSnippet}

Returnează DOAR JSON valid. Exemplu: {"titluriParagrafe":["Tema centrală","Structura","Simbolistica"]}`;

    console.log('[generateTitlesOnly] Request', { numParagraphs, promptLength: prompt.length });

    const groqModels = ['llama-3.1-8b-instant', 'openai/gpt-oss-120b', 'llama-3.1-70b-versatile'];
    let succeeded = false;
    try {
      for (const key of groqKeys) {
        for (const model of groqModels) {
          try {
            const res = await fetch(groqApiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key.trim()}` },
              body: JSON.stringify({
                model,
                messages: [
                  { role: 'system', content: 'Răspunde DOAR cu JSON valid. Fără markdown.' },
                  { role: 'user', content: prompt },
                ],
                temperature: 0.25,
                max_tokens: 400,
              }),
            });

            const data = await res.json();
            const raw = data?.choices?.[0]?.message?.content || '';
            const groqError = data?.error;

            console.log('[generateTitlesOnly] Groq response', {
              ok: res.ok,
              status: res.status,
              model,
              raw: raw ? raw.slice(0, 200) : raw,
              groqError: groqError || null,
              data,
            });

            if (!res.ok) {
              console.warn('[generateTitlesOnly] Groq error body:', groqError || data);
              if (res.status === 401) setMessage({ type: 'error', text: 'Cheia API Groq invalidă.' });
              if (res.status === 400) setMessage({ type: 'error', text: groqError?.message || 'Request invalid (400). Încearcă alt model.' });
              continue;
            }
          if (!raw || typeof raw !== 'string') {
            console.log('[generateTitlesOnly] SKIP: răspuns gol');
            continue;
          }

          const parsed = safeParseJson(raw);
          const titles = Array.isArray(parsed?.titluriParagrafe) ? parsed.titluriParagrafe : [];

          console.log('[generateTitlesOnly] Parsed', { parsed, titles });

          if (titles.length === 0) {
            setMessage({ type: 'error', text: 'AI nu a returnat titluri. Încearcă din nou.' });
            continue;
          }

          let titleIdx = 0;
          const updatedContent = contentBlocks.map((block) => {
            const hasText = (block?.text || '').trim().length > 0;
            const newTitle = hasText && titles[titleIdx] != null ? String(titles[titleIdx++]).trim() : (block?.title || '');
            return { ...block, title: newTitle };
          });

          console.log('[generateTitlesOnly] SUCCESS', {
            titles,
            updatedContent,
          });

          setComentariuForm((prev) => ({ ...prev, content: updatedContent }));
          setRichTextEditorKey((k) => k + 1);
          setMessage({ type: 'success', text: `Titlurile au fost completate (${titles.length} paragrafe).` });
          succeeded = true;
          break;
        } catch (innerErr) {
          console.warn('[generateTitlesOnly] Inner error', innerErr);
          continue;
        }
        if (succeeded) break;
      }
      if (!succeeded) {
        console.log('[generateTitlesOnly] FAIL: niciun key nu a funcționat');
        setMessage({ type: 'error', text: 'Nu s-a putut genera. Verifică cheia API Groq în .env' });
      }
      }
    } catch (err) {
      console.warn('[generateTitlesOnly] Eroare la generarea titlurilor:', err);
      setMessage({ type: 'error', text: err?.message || 'Eroare la generare.' });
    } finally {
      setIsGeneratingTitlesOnly(false);
      console.log('[generateTitlesOnly] DONE');
    }
  }, [comentariuForm.content]);

  const handleComentariuContentChange = useCallback((content) => {
    setComentariuForm((prev) => ({ ...prev, content }));
  }, []);

  // Funcție pentru generarea automată a descrierii poeziei / poveștii / postării generale
  const generatePoemDescription = useCallback(async (poemText) => {
    if (!poemText || !poemText.trim() || !selectedScriitor) {
      return;
    }

    const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
    const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';

    if (!groqApiKey) {
      return; // Nu afișăm eroare, doar nu generăm
    }

    setIsGeneratingDescription(true);

    try {
      const scriitorName = selectedScriitor?.nume || 'autorul';
      const scriitorPeriod = selectedScriitor?.date || '';
      const scriitorCategory = selectedScriitor?.categorie || '';
      const bioSnippet = (selectedScriitor?.biografie || '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 480);

      // Determină tipul de conținut pentru mesajul sistem
      let contentType = 'postare';
      if (postForm.isPoem) {
        contentType = 'poezie';
      } else if (postForm.isStory) {
        contentType = 'povestire / fragment de proză';
      } else {
        contentType = 'postare';
      }

      const systemMessage = `Asumă-ți pe deplin identitatea literară a lui ${scriitorName}${scriitorPeriod ? ` (${scriitorPeriod})` : ''}${scriitorCategory ? `, ${scriitorCategory}` : ''}.

Scrie o descriere scurtă pentru o ${contentType}, ca și cum autorul ar prezenta propria operă.
Descrierea este scrisă la persoana I sau a III-a și pare destinată cititorilor contemporani autorului.

Public: oameni ai vremii respective (evită orice referință modernă: internet, social media, termeni actuali).
Ton: autentic pentru autor — respectă temele, obsesiile, stilul sintactic, vocabularul și ritmul frazei caracteristice lui.
Stil: natural, literar, cu una sau două trăsături recognoscibile (ex: ironie fină, lirism, gravitate, oralitate, solemnitate).
Nu explica stilul, nu comenta ce faci, nu ieși din rol.
Evită formulările explicative sau abstractizante de tip eseistic („X este Y", „are rolul de", „ordonează", „cristalizează").
Preferă imagini metaforice continue, comparații implicite și asocieri simbolice, fără concluzii explicite.
Lungime: 50–100 de cuvinte.
Fără emoticoane. Fără note explicative. Fără ghilimele.

Context util (folosește doar dacă ajută la autenticitate):  
${bioSnippet || '—'}

Returnează exclusiv textul final al descrierii, ca și cum ar fi fost scris direct de autor sau un critic contemporan.`;

      const poemSnippet = poemText
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 800);

      let userMessage = '';
      if (postForm.isPoem) {
        userMessage = `Generează descrierea pentru următoarea poezie:

${poemSnippet}

Descrierea trebuie să fie relevantă pentru poezia de mai sus.

Returnează exclusiv textul final al descrierii.`;
      } else if (postForm.isStory) {
        userMessage = `Generează descrierea pentru următoarea poveste / proză scurtă:

${poemSnippet}

Descrierea trebuie să fie relevantă pentru textul literar de mai sus.

Returnează exclusiv textul final al descrierii.`;
      } else {
        // Pentru postări generale
        userMessage = `Generează descrierea pentru următoarea postare:

${poemSnippet}

Descrierea trebuie să fie relevantă pentru conținutul postării de mai sus.

Returnează exclusiv textul final al descrierii.`;
      }

      const requestBody = {
        model: 'moonshotai/kimi-k2-instruct-0905',
        messages: [
          {
            role: 'system',
            content: systemMessage
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 320
      };

      const response = await fetch(groqApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        return; // Nu afișăm eroare pentru generarea automată
      }

      const data = await response.json();
      const generated = data.choices[0]?.message?.content?.trim();
      
      if (generated) {
        setPostForm((prev) => ({ ...prev, descriere: generated }));
      }
    } catch (error) {
      console.error('Eroare la generarea automată a descrierii:', error);
      // Nu afișăm eroare pentru generarea automată
    } finally {
      setIsGeneratingDescription(false);
    }
  }, [selectedScriitor, postForm.isPoem, postForm.isStory, postForm]);

  // Funcție pentru generarea automată a unei reacții pentru un prieten
  const generateReactionForFriend = useCallback(async (friend, poemText) => {
    if (!friend || !poemText || !poemText.trim() || !selectedScriitor) {
      return null;
    }

    const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
    const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';

    if (!groqApiKey) {
      return null;
    }

    try {
      const friendName = friend.nume || 'prietenul';
      const friendPeriod = friend.date || '';
      const friendCategory = friend.categorie || '';
      const friendBio = (friend.biografie || '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 300);

      const poemSnippet = poemText
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 600);

      // Determină tipul de conținut
      let contentType = 'postarea';
      if (postForm.isPoem) {
        contentType = 'poezia';
      } else if (postForm.isStory) {
        contentType = 'povestea';
      } else {
        contentType = 'postarea';
      }

      const systemMessage = `Ești ${friendName}${friendPeriod ? ` (${friendPeriod})` : ''}${friendCategory ? `, ${friendCategory}` : ''}, prieten/contemporan al lui ${selectedScriitor?.nume || 'autorul'}.

Analizează ${contentType} și alege o reacție emoțională adecvată bazată pe:
- Tema și tonul ${contentType === 'poezia' ? 'poeziei' : contentType === 'povestea' ? 'poveștii' : 'postării'} (tristețe, melancolie, frumusețe, etc.)
- Stilul și estetica ${contentType === 'poezia' ? 'poeziei' : contentType === 'povestea' ? 'poveștii' : 'postării'}
- Relația ta cu autorul și cu literatura
- Personalitatea ta literară

Reacții disponibile: like, love, ador, wow, haha, sad, cry, angry, strengh, multumire, fire, cool, clap, Romania

Context despre tine (folosește doar dacă ajută): ${friendBio || '—'}

Returnează DOAR tipul reacției (unul dintre: like, love, ador, wow, haha, sad, cry, angry, strengh, multumire, fire, cool, clap, Romania), fără explicații, fără text suplimentar.`;

      const userMessage = `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} lui ${selectedScriitor?.nume || 'autorul'}:

${poemSnippet}

Analizează ${contentType}: ce teme, ce imagini, ce ton, ce emoții transmite?
Alege reacția emoțională care se potrivește cel mai bine cu ceea ce simți la această ${contentType === 'poezia' ? 'poezie' : contentType === 'povestea' ? 'poveste' : 'postare'} specifică.

Returnează DOAR tipul reacției (like, love, ador, wow, haha, sad, cry, angry, strengh, multumire, fire, cool, clap, Romania).`;

      const requestBody = {
        model: 'moonshotai/kimi-k2-instruct-0905',
        messages: [
          {
            role: 'system',
            content: systemMessage
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 50
      };

      const response = await fetch(groqApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      const generated = data.choices[0]?.message?.content?.trim().toLowerCase();
      
      // Verifică dacă reacția generată este validă
      const validReactions = REACTIONS.map(r => r.type);
      const reactionType = validReactions.find(r => generated?.includes(r)) || 'like';
      
      return {
        friendKey: friend.key,
        reaction: reactionType
      };
    } catch (error) {
      console.error('Eroare la generarea reacției:', error);
      return null;
    }
  }, [selectedScriitor, postForm.isPoem, postForm.isStory]);

  // Funcție pentru generarea automată a unui comentariu pentru un prieten
  const generateCommentForFriend = useCallback(async (friend, poemText, descriere, existingReactions = []) => {
    if (!friend || !poemText || !poemText.trim() || !selectedScriitor) {
      return null;
    }

    const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
    const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';

    if (!groqApiKey) {
      return null;
    }

    try {
      const friendName = friend.nume || 'prietenul';
      const friendPeriod = friend.date || '';
      const friendCategory = friend.categorie || '';
      const friendBio = (friend.biografie || '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 300);

      const poemSnippet = poemText
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 1000);

      const descriereSnippet = descriere
        ? descriere.replace(/\s+/g, ' ').trim().slice(0, 320)
        : '';

      const reactionMood = existingReactions.length > 0
        ? existingReactions.map(r => {
            const reaction = REACTIONS.find(react => react.type === r.reaction);
            return reaction ? reaction.label : r.reaction;
          }).join(', ')
        : 'apreciere calmă';

      // Determină tipul de conținut
      let contentType = 'postarea';
      let contentTypeGen = 'postării';
      if (postForm.isPoem) {
        contentType = 'poezia';
        contentTypeGen = 'poeziei';
      } else if (postForm.isStory) {
        contentType = 'povestea';
        contentTypeGen = 'poveștii';
      } else {
        contentType = 'postarea';
        contentTypeGen = 'postării';
      }

      const systemMessage = `Ești ${friendName}${friendPeriod ? ` (${friendPeriod})` : ''}${friendCategory ? `, ${friendCategory}` : ''}, prieten/contemporan al lui ${selectedScriitor?.nume || 'autorul'}.

SARCINA TA: Scrie un comentariu scurt (30-70 cuvinte) la ${contentTypeGen} lui, folosind EXCLUSIV un limbaj literar sofisticat, metaforic și misterios.

⚠️⚠️⚠️ REGLAMENTE ABSOLUTE - VIOLAREA LOR INVALIDEZĂ COMENTARIUL ⚠️⚠️⚠️

INTERZIS ABSOLUT:
❌ Cuvântul "frate", "fratele", "fratele meu" sau orice adresare familiară excesivă
❌ Ton jocos, batjocoritor, sarcastic, "la misto" sau superficial
❌ Comentarii care "bat câmpii" - trebuie să fie STRICT relevante pentru poezia specifică
❌ Limbaj simplu, direct, fără metafore
❌ Explicații sau comentarii despre ce faci
❌ Termeni moderni, referințe la tehnologie sau cultura contemporană
❌ Comentarii generice care ar putea fi la orice poezie
❌ REPETAREA expresiilor, frazelor sau formulărilor similare - fiecare comentariu TREBUIE să fie UNIC și ORIGINAL
❌ Folosirea acelorași expresii de deschidere sau fraze comune - creează-ți propriul stil personal și unic
❌ INTERZIS ABSOLUT: Folosirea aceleiași expresii de deschidere ca alți scriitori (ex: dacă alt scriitor a folosit "Zâna de foc", TU NU poți folosi aceeași expresie sau variațiuni ale ei)
❌ INTERZIS ABSOLUT: Orice formulă de deschidere care ar putea fi folosită de mai mulți scriitori - fiecare comentariu TREBUIE să înceapă cu o formulă COMPLET UNICĂ și ORIGINALĂ

OBLIGATORIU ABSOLUT:
✅ Limbaj inteligent, metaforic, cu imagini simbolice și straturi de sens
✅ Ton misterios, profund, contemplativ, evocativ
✅ Referințe SPECIFICE și CONCRETE la ${contentTypeGen} de mai jos (imagini exacte, ${postForm.isPoem ? 'versuri specifice' : 'fragmente specifice'}, teme identificate, ton, stil)
✅ Stil coerent cu epoca și autentic pentru personalitatea ta literară
✅ Comentariul trebuie să fie RELEVANT și CONECTAT direct la ${contentTypeGen} specifică
✅ UNICITATE ABSOLUTĂ: Fiecare comentariu TREBUIE să fie complet ORIGINAL, cu expresii, metafore și imagini UNICE, diferite de orice alt comentariu
✅ Creativitate: Folosește imagini, metafore și formulări PERSONALE și INOVATOARE, specifice stilului tău literar
✅ Varietate: Evită formulări comune, clișee sau expresii care ar putea fi folosite de alți scriitori - fiecare comentariu trebuie să reflecte personalitatea ta UNICĂ
✅ DESCHIDERE UNICĂ: Prima frază a comentariului TREBUIE să fie COMPLET DIFERITĂ de orice alt comentariu - creează o deschidere ORIGINALĂ, nu folosi expresii comune sau care ar putea fi folosite de alți scriitori
✅ INOVAȚIE: Gândește-te la o modalitate UNICĂ de a începe comentariul - evită orice formulă care ar putea fi repetată de alți scriitori

EXEMPLE DE CE NU TREBUIE SĂ FACI:
❌ "Frate, ce poezie frumoasă!" 
❌ "Haha, interesant ce ai scris aici"
❌ "Wow, asta e tare!"
❌ "Bate câmpii, dar e ok"
❌ "Nu înțeleg prea bine, dar sună bine"
❌ "Zâna de foc din versurile tale, Lucian..." (DACĂ alt scriitor a folosit deja această expresie, TU NU o poți folosi!)
❌ "Zâna ta de foc..." (Variațiuni ale aceleiași expresii sunt INTERZISE!)
❌ Orice expresie de deschidere care se repetă între comentarii - fiecare comentariu TREBUIE să înceapă DIFERIT

EXEMPLE DE CE TREBUIE SĂ FACI:
✅ "În această noapte de versuri, umbrele se adună ca năluci pe pereții salonului alb, iar fiecare cuvânt pare să poarte în el ecoul unei lumi dispărute."
✅ "Imaginile tale se înșiră ca perle pe un fir invizibil, fiecare vers deschizând o poartă către o melancolie profundă."
✅ "Această contemplare a absenței rezonează cu o notă ascunsă din propriul meu univers interior."

Ton: ${reactionMood}, dar EXPRIMAT EXCLUSIV prin metafore, imagini simbolice și limbaj literar sofisticat, NU direct.
Stil: literar, sofisticat, cu straturi de sens, evocativ, misterios, profund, autentic pentru personalitatea ta literară. Fiecare cuvânt trebuie să poarte sens și să creeze atmosferă.

VERIFICARE FINALĂ ÎNAINTE DE A SCRIE:
1. Comentariul se referă SPECIFIC la ${contentTypeGen} de mai jos (imagini, ${postForm.isPoem ? 'versuri' : 'fragmente'}, teme)? DA/NU
2. Folosești metafore și imagini simbolice? DA/NU
3. Eviti cuvântul "frate" și adresările familiare? DA/NU
4. Tonul este misterios și profund, nu jocos? DA/NU
5. Limbajul este sofisticat și literar, autentic pentru stilul tău? DA/NU
6. Comentariul este UNIC și ORIGINAL, fără expresii sau formulări repetate? DA/NU
7. Folosești imagini și metafore PERSONALE, specifice stilului tău, nu comune sau clișee? DA/NU
8. Prima frază a comentariului este COMPLET DIFERITĂ și UNICĂ, fără să folosești aceeași expresie de deschidere ca alți scriitori? DA/NU
9. Ai evitat orice formulă de deschidere care ar putea fi folosită de mai mulți scriitori? DA/NU

Dacă oricare răspuns este NU, rescrie comentariul cu unicitate și creativitate maximă, asigurându-te că începutul este COMPLET DIFERIT de orice alt comentariu.

Nu folosi ghilimele, nu explica ce faci, scrie direct comentariul ca și cum ai vorbi cu autorul, folosind EXCLUSIV limbaj literar sofisticat, metaforic și misterios.

IMPORTANT: Fiecare comentariu trebuie să fie COMPLET DIFERIT și UNIC. Evită orice formulare care ar putea fi folosită de alt scriitor. Creează imagini și metafore PERSONALE, specifice personalității tale literare și stilului tău unic.

CRITICAL: Prima frază a comentariului TREBUIE să fie COMPLET UNICĂ și ORIGINALĂ. Dacă alt scriitor a folosit deja o expresie (ex: "Zâna de foc"), TU NU poți folosi aceeași expresie sau variațiuni ale ei. Gândește-te la o modalitate COMPLET DIFERITĂ de a începe comentariul, folosind imagini și metafore PERSONALE și UNICE.

Context despre tine (folosește doar dacă ajută la autenticitate): ${friendBio || '—'}`;

      let userMessage = '';
      if (postForm.isPoem) {
        userMessage = `Scrie un comentariu scurt (30-70 cuvinte) la poezia lui ${selectedScriitor?.nume || 'autorul'}.

${descriereSnippet ? `DESCRIERE: ${descriereSnippet}\n\n` : ''}POEZIA COMPLETĂ:
${poemSnippet}

IMPORTANT: Comentariul TREBUIE să se refere explicit la poezia de mai sus:
- La imagini specifice din poezie (ex: "salonul alb", "vals de voaluri", "sărutări", etc.)
- La teme și emoții transmise
- La versuri care te-au impresionat
- La stilul și tonul poeziei

Comentariul trebuie să fie relevant pentru poezia specifică și să reflecte personalitatea ta literară.

Returnează doar textul comentariului, fără explicații.`;
      } else if (postForm.isStory) {
        userMessage = `Scrie un comentariu scurt (30-70 cuvinte) la povestea lui ${selectedScriitor?.nume || 'autorul'}.

${descriereSnippet ? `DESCRIERE: ${descriereSnippet}\n\n` : ''}POVESTEA COMPLETĂ:
${poemSnippet}

IMPORTANT: Comentariul TREBUIE să se refere explicit la povestea de mai sus:
- La imagini specifice din poveste
- La teme și emoții transmise
- La fragmente care te-au impresionat
- La stilul și tonul poveștii

Comentariul trebuie să fie relevant pentru povestea specifică și să reflecte personalitatea ta literară.

Returnează doar textul comentariului, fără explicații.`;
      } else {
        userMessage = `Scrie un comentariu scurt (30-70 cuvinte) la postarea lui ${selectedScriitor?.nume || 'autorul'}.

${descriereSnippet ? `DESCRIERE: ${descriereSnippet}\n\n` : ''}POSTAREA COMPLETĂ:
${poemSnippet}

IMPORTANT: Comentariul TREBUIE să se refere explicit la postarea de mai sus:
- La imagini specifice din postare
- La teme și emoții transmise
- La fragmente care te-au impresionat
- La stilul și tonul postării

Comentariul trebuie să fie relevant pentru postarea specifică și să reflecte personalitatea ta literară.

Returnează doar textul comentariului, fără explicații.`;
      }

      const requestBody = {
        model: 'moonshotai/kimi-k2-instruct-0905',
        messages: [
          {
            role: 'system',
            content: systemMessage
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.65,
        max_tokens: 200
      };

      const response = await fetch(groqApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      const generated = data.choices[0]?.message?.content?.trim();
      
      if (generated) {
        return {
          key: friend.key,
          author: friend.nume,
          text: generated
        };
      }
      
      return null;
    } catch (error) {
      console.error('Eroare la generarea comentariului:', error);
      return null;
    }
  }, [selectedScriitor, postForm.isPoem, postForm.isStory]);

  // Funcție pentru generarea automată a descrierii comentariului
  const generateComentariuDescription = useCallback(async (titlu, autor) => {
    if (!titlu || !titlu.trim() || !autor || !autor.trim()) {
      return;
    }

    const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
    const groqApiKeyBackup = import.meta.env.VITE_GROQ_API_KEY_1;
    const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
    const groqApiKeys = [groqApiKey, groqApiKeyBackup].filter(k => k && k !== 'undefined');

    if (groqApiKeys.length === 0) {
      return; // Nu afișăm eroare, doar nu generăm
    }

    setIsGeneratingComentariuDescription(true);

    try {
      const systemMessage = `Ești un expert în literatura română. Scrie o descriere scurtă și profesională pentru un comentariu literar.

Descrierea trebuie să fie:
- Concisă (40-80 de cuvinte)
- Profesională și academică
- Relevante pentru comentariul literar
- Fără emoticoane sau simboluri
- În limba română

Descrierea trebuie să menționeze pe scurt temele principale, stilul sau aspectele esențiale despre operă/autor, într-un mod care să fie util pentru cititori care doresc să înțeleagă rapid conținutul comentariului.`;

      const userMessage = `Titlu comentariu: "${titlu.trim()}"
Autor operă comentată: "${autor.trim()}"

Generează o descriere scurtă și profesională pentru acest comentariu literar, bazându-te pe cunoștințele tale despre opera și autorul menționat.`;

      const requestBody = {
        model: 'moonshotai/kimi-k2-instruct-0905',
        messages: [
          {
            role: 'system',
            content: systemMessage
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      };

      let generatedDescription = null;

      for (const key of groqApiKeys) {
        try {
          const response = await fetch(groqApiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${key}`
            },
            body: JSON.stringify(requestBody)
          });

          if (!response.ok) {
            console.warn('Groq API error:', response.status);
            continue;
          }

          const data = await response.json();
          const content = data?.choices?.[0]?.message?.content?.trim();
          
          if (content) {
            generatedDescription = content;
            break;
          }
        } catch (err) {
          console.warn('Groq API exception:', err);
          continue;
        }
      }

      if (generatedDescription) {
        setComentariuForm((prev) => ({ ...prev, descriere: generatedDescription }));
      }
    } catch (error) {
      console.error('Eroare la generarea descrierii:', error);
    } finally {
      setIsGeneratingComentariuDescription(false);
    }
  }, []);

  // Generare automată a descrierii comentariului când se completează titlul și autorul
  useEffect(() => {
    // Curăță timeout-ul anterior
    if (comentariuDescriereDebounceRef.current) {
      clearTimeout(comentariuDescriereDebounceRef.current);
    }

    const titlu = comentariuForm.titlu?.trim();
    const autor = comentariuForm.autor?.trim();
    const descriere = comentariuForm.descriere?.trim();

    // Generează descrierea doar dacă:
    // - Ambele câmpuri sunt completate
    // - Nu se generează deja
    // - Descrierea nu există sau este goală/scurtă (sub 20 caractere) - nu regenerăm dacă există deja o descriere semnificativă
    // - Suntem în tab-ul comentarii
    const shouldGenerate = titlu && 
                          autor && 
                          !isGeneratingComentariuDescription &&
                          (!descriere || descriere.trim().length < 20) &&
                          activeTab === 'comentarii';

    if (shouldGenerate) {
      comentariuDescriereDebounceRef.current = setTimeout(() => {
        generateComentariuDescription(titlu, autor);
      }, 2000); // 2 secunde debounce
    }

    // Cleanup
    return () => {
      if (comentariuDescriereDebounceRef.current) {
        clearTimeout(comentariuDescriereDebounceRef.current);
      }
    };
  }, [comentariuForm.titlu, comentariuForm.autor, comentariuForm.descriere, isGeneratingComentariuDescription, activeTab, generateComentariuDescription]);

  // Funcție pentru generarea automată a reacțiilor și comentariilor pentru toți prietenii
  const generateReactionsAndComments = useCallback(async (textContent, descriere) => {
    if (!textContent || !textContent.trim() || !selectedScriitor) {
      console.log('❌ Condiții neîndeplinite pentru generare:', {
        hasTextContent: !!textContent,
        hasSelectedScriitor: !!selectedScriitor
      });
      return;
    }

    // Folosește scriitoriList dacă este disponibil (are același format ca selectedScriitor)
    // Altfel folosește allScriitoriForSearch, sau încarcă datele
    let scriitoriData = [];
    
    // Încearcă să folosească scriitoriList (are același format ca selectedScriitor)
    if (scriitoriList.length > 0) {
      scriitoriData = scriitoriList.map(s => ({
        nume: s.nume || '',
        img: s.img || '',
        key: s.key || s.id,
        biografie: s.biografie || '',
        date: s.date || '',
        categorie: s.categorie || '',
      }));
    } else if (allScriitoriForSearch.length > 0) {
      scriitoriData = allScriitoriForSearch;
    } else {
      // Dacă niciunul nu este disponibil, încarcă datele
      try {
        const scriitoriDataRaw = await getScriitoriData();
        scriitoriData = Object.values(scriitoriDataRaw).map(s => ({
          nume: s.nume || '',
          img: s.img || '',
          key: s.key || s.id,
          biografie: s.biografie || '',
          date: s.date || '',
          categorie: s.categorie || '',
        }));
        setAllScriitoriForSearch(scriitoriData);
      } catch (error) {
        console.error('Eroare la încărcarea scriitorilor:', error);
        return;
      }
    }

    console.log('🔍 Debug căutare prieteni:', {
      friendsRaw: selectedScriitor.friends || [],
      firstFriendType: typeof (selectedScriitor.friends || [])[0],
      firstFriendValue: (selectedScriitor.friends || [])[0],
      scriitoriDataKeys: scriitoriData.map(s => s.key).slice(0, 10), // Primele 10 pentru debugging
      scriitoriDataCount: scriitoriData.length
    });

    const friends = (selectedScriitor.friends || [])
      .map(friendItem => {
        // Extrage cheia - poate fi string direct sau obiect cu proprietatea key/nume
        let friendKey = null;
        if (typeof friendItem === 'string') {
          friendKey = friendItem;
        } else if (typeof friendItem === 'object' && friendItem !== null) {
          // Poate fi obiect cu key, id, sau nume
          friendKey = friendItem.key || friendItem.id || friendItem.nume || friendItem.name;
        }
        
        if (!friendKey) {
          console.log('⚠️ Nu s-a putut extrage cheia din:', friendItem);
          return null;
        }
        
        // Încearcă să găsească prietenul după key (exact match)
        let friend = scriitoriData.find(s => s.key === friendKey);
        
        // Dacă nu găsește, încearcă să găsească după key fără case sensitivity
        if (!friend && typeof friendKey === 'string') {
          friend = scriitoriData.find(s => 
            s.key && s.key.toLowerCase() === friendKey.toLowerCase()
          );
        }
        
        // Dacă încă nu găsește, încearcă să găsească după nume (pentru compatibilitate)
        if (!friend && typeof friendKey === 'string') {
          friend = scriitoriData.find(s => 
            s.nume && s.nume.toLowerCase() === friendKey.toLowerCase()
          );
        }
        
        // Debug pentru fiecare prieten
        if (!friend) {
          console.log(`⚠️ Nu s-a găsit prieten pentru cheia: "${friendKey}" (din:`, friendItem, ')');
        }
        
        return friend;
      })
      .filter(Boolean);

    console.log('👥 Prieteni găsiți:', {
      friendKeys: selectedScriitor.friends || [],
      friendsFound: friends.length,
      friendsNames: friends.map(f => f.nume),
      friendsKeys: friends.map(f => f.key),
      scriitoriDataCount: scriitoriData.length
    });

    if (friends.length === 0) {
      console.log('❌ Nu există prieteni pentru generare');
      return;
    }

    console.log(`✅ Generare reacții și comentarii pentru ${friends.length} prieteni...`);
    setIsGeneratingReactions(true);

    try {
      const newReactions = [];
      const newComments = [];

      // Număr aleator de reacții: minim 2, maxim 6 (sau numărul de prieteni disponibili)
      const numReactions = Math.min(
        Math.max(2, Math.floor(Math.random() * 5) + 2), // 2-6
        friends.length
      );
      
      // Amestecă prietenii și selectează aleatoriu pentru reacții
      const shuffledFriends = [...friends].sort(() => Math.random() - 0.5);
      const friendsToReact = shuffledFriends.slice(0, numReactions);
      
      console.log(`🎲 Generare ${numReactions} reacții din ${friends.length} prieteni disponibili`);
      
      for (const friend of friendsToReact) {
        const reaction = await generateReactionForFriend(friend, textContent);
        if (reaction) {
          newReactions.push(reaction);
          // Așteaptă puțin între apeluri pentru a evita rate limiting
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      // Număr aleator de comentarii: minim 1, maxim 6 (sau numărul de prieteni disponibili)
      const numComments = Math.min(
        Math.max(1, Math.floor(Math.random() * 6) + 1), // 1-6
        friends.length
      );
      
      // Amestecă prietenii și selectează aleatoriu pentru comentarii (poate include și pe cei cu reacții)
      const shuffledFriendsForComments = [...friends].sort(() => Math.random() - 0.5);
      const friendsToComment = shuffledFriendsForComments.slice(0, numComments);
      
      console.log(`💬 Generare ${numComments} comentarii din ${friends.length} prieteni disponibili`);
      
      for (const friend of friendsToComment) {
        const comment = await generateCommentForFriend(friend, textContent, descriere, newReactions);
        if (comment) {
          newComments.push(comment);
          // Așteaptă puțin între apeluri pentru a evita rate limiting
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      // Actualizează formularul cu reacțiile și comentariile generate
      if (newReactions.length > 0 || newComments.length > 0) {
        setPostForm((prev) => ({
          ...prev,
          reactions: [...(prev.reactions || []), ...newReactions],
          comments: [...(prev.comments || []), ...newComments]
        }));
      }
    } catch (error) {
      console.error('Eroare la generarea reacțiilor și comentariilor:', error);
    } finally {
      setIsGeneratingReactions(false);
    }
  }, [selectedScriitor, allScriitoriForSearch, scriitoriList, generateReactionForFriend, generateCommentForFriend, setAllScriitoriForSearch]);

  // Generare automată a descrierii când se introduce textul poeziei
  useEffect(() => {
    // Curăță timeout-ul anterior
    if (poemTextDebounceRef.current) {
      clearTimeout(poemTextDebounceRef.current);
    }

    // Dacă există text (poezie, poveste sau postare generală), generează descrierea după 2 secunde de la ultima tastă
    // Doar dacă descrierea este goală sau foarte scurtă (posibil generată anterior dar incompletă)
    const fullTextForDescription = postForm.isPoem 
      ? postForm.poemText 
      : (postForm.isStory ? [postForm.storyText, postForm.storyMoreText].filter(Boolean).join('\n\n') : postForm.text);

    const shouldGenerate = fullTextForDescription && 
                          fullTextForDescription.trim() && 
                          selectedScriitor && 
                          !isGeneratingDescription &&
                          (!postForm.descriere || postForm.descriere.trim().length < 20); // Nu regenerăm dacă există deja o descriere semnificativă

    if (shouldGenerate) {
      poemTextDebounceRef.current = setTimeout(() => {
        generatePoemDescription(fullTextForDescription);
      }, 2000); // 2 secunde debounce
    }

    // Cleanup
    return () => {
      if (poemTextDebounceRef.current) {
        clearTimeout(poemTextDebounceRef.current);
      }
    };
  }, [postForm.poemText, postForm.storyText, postForm.storyMoreText, postForm.text, postForm.isPoem, postForm.isStory, postForm.descriere, selectedScriitor, generatePoemDescription, isGeneratingDescription]);

  // Generare automată a reacțiilor și comentariilor după ce se generează descrierea
  useEffect(() => {
    // Curăță timeout-ul anterior
    if (reactionsDebounceRef.current) {
      clearTimeout(reactionsDebounceRef.current);
    }

    // Generează reacții și comentarii dacă:
    // - Există text suficient (minim 10 caractere) - poezie, poveste sau postare generală
    // - Există descriere (generată sau introdusă manual) - minim 20 caractere
    // - Nu se generează deja
    // - Nu există deja reacții sau comentarii (pentru a nu regenera)
    // - Descrierea nu se generează în acest moment
    // - Există prieteni
    // Pentru postările generale, folosim descrierea în loc de textul complet
    const fullTextForReactions = postForm.isPoem 
      ? postForm.poemText 
      : (postForm.isStory ? [postForm.storyText, postForm.storyMoreText].filter(Boolean).join('\n\n') : (postForm.descriere || postForm.text));

    const hasText = fullTextForReactions && fullTextForReactions.trim().length > 10;
    const hasDescriere = postForm.descriere && postForm.descriere.trim().length >= 20;
    const hasFriends = selectedScriitor && (selectedScriitor.friends || []).length > 0;
    // Nu mai verificăm allScriitoriForSearch.length > 0 pentru că funcția va încărca datele dacă nu sunt disponibile
    const noExistingReactions = (postForm.reactions || []).length === 0;
    const noExistingComments = (postForm.comments || []).length === 0;

    const shouldGenerate = hasText && 
                          hasDescriere &&
                          selectedScriitor && 
                          !isGeneratingReactions &&
                          !isGeneratingDescription &&
                          noExistingReactions &&
                          noExistingComments &&
                          hasFriends;

    if (shouldGenerate) {
      console.log('🔄 Declanșare generare reacții și comentarii...', {
        isPoem: postForm.isPoem,
        isStory: postForm.isStory,
        hasText,
        hasDescriere,
        hasFriends,
        friendsCount: (selectedScriitor.friends || []).length,
        scriitoriCount: allScriitoriForSearch.length
      });

      // Așteaptă 3 secunde după ce s-a generat descrierea pentru a se asigura că totul e gata
      reactionsDebounceRef.current = setTimeout(() => {
        console.log('🚀 Generare reacții și comentarii...');
        // Pentru postările generale, folosim descrierea ca text principal pentru reacții și comentarii
        const textForReactions = (!postForm.isPoem && !postForm.isStory) 
          ? postForm.descriere 
          : fullTextForReactions;
        generateReactionsAndComments(textForReactions, postForm.descriere);
      }, 3000);
    } else {
      // Debug: de ce nu se generează
      if (hasText && hasDescriere && selectedScriitor) {
        console.log('❌ Condiții neîndeplinite pentru generare:', {
          isPoem: postForm.isPoem,
          isStory: postForm.isStory,
          hasText,
          hasDescriere,
          hasFriends,
          isGeneratingReactions,
          isGeneratingDescription,
          noExistingReactions,
          noExistingComments,
          friendsCount: (selectedScriitor.friends || []).length,
          scriitoriCount: allScriitoriForSearch.length
        });
      }
    }

    // Cleanup
    return () => {
      if (reactionsDebounceRef.current) {
        clearTimeout(reactionsDebounceRef.current);
      }
    };
  }, [postForm.isPoem, postForm.isStory, postForm.poemText, postForm.storyText, postForm.storyMoreText, postForm.text, postForm.descriere, postForm.reactions, postForm.comments, selectedScriitor, allScriitoriForSearch, isGeneratingReactions, isGeneratingDescription, generateReactionsAndComments]);

  // Load scriitori when tab is active
  useEffect(() => {
    if (activeTab === 'scriitori') {
      loadScriitori();
    }
  }, [activeTab]);

  // Handle URL params after scriitori are loaded
  useEffect(() => {
    if (activeTab === 'scriitori' && scriitoriList.length > 0) {
      const scriitorParam = searchParams.get('scriitor');
      const actionParam = searchParams.get('action');
      const postIdParam = searchParams.get('postId');
      const commentIndexParam = searchParams.get('commentIndex');
      const viewParam = searchParams.get('view'); // 'list', 'add', 'edit', 'posts', 'post-add', 'post-edit'
      
      // If no params, check if we should restore from URL or default to list
      if (!scriitorParam && !actionParam && !viewParam) {
        // No params, default to list
        setScriitorView('list');
        setSelectedScriitor(null);
        return;
      }

      // Handle view param (for list, add, edit, posts)
      if (viewParam && ['list', 'add', 'edit', 'posts'].includes(viewParam)) {
        setScriitorView(viewParam);
        if (viewParam === 'list') {
          setSelectedScriitor(null);
        } else if (viewParam === 'posts' && scriitorParam) {
          const scriitor = scriitoriList.find(s => (s.key || s.id) === scriitorParam);
          if (scriitor) {
            setSelectedScriitor(scriitor);
          }
        } else if (viewParam === 'edit' && scriitorParam) {
          const scriitor = scriitoriList.find(s => (s.key || s.id) === scriitorParam);
          if (scriitor) {
            setSelectedScriitor(scriitor);
            setScriitorForm({
              key: scriitor.key || scriitor.id,
              nume: scriitor.nume || '',
              date: scriitor.date || '',
              img: scriitor.img || '',
              banner: scriitor.banner || '',
              color: scriitor.color || 'rgba(255,179,71,0.82)',
              categorie: scriitor.categorie || '',
              canonic: scriitor.canonic !== undefined ? scriitor.canonic : true,
              friends: scriitor.friends || [],
              gallery: scriitor.gallery || [],
              posts: scriitor.posts || [],
              prezentare: scriitor.prezentare || null,
              biografie: scriitor.biografie || '',
              info: scriitor.info || (scriitor.info === undefined ? null : {}),
              opere: scriitor.opere || {},
              ordine: scriitor.ordine !== undefined ? scriitor.ordine : 999,
              newFriendKey: '',
              newFriendName: '',
              opereJsonText: '',
              createdBy: scriitor.createdBy || '',
              createdByEmail: scriitor.createdByEmail || '',
              createdByName: scriitor.createdByName || '',
            });
            setIsEditingScriitor(true);
          }
        }
      }
      
      // Handle action param (for post-add, post-edit, edit-comment)
      if (scriitorParam && actionParam) {
        const scriitor = scriitoriList.find(s => (s.key || s.id) === scriitorParam);
        if (scriitor) {
          setSelectedScriitor(scriitor);
          
          if (actionParam === 'add-post') {
            setPostForm({
              id: '',
              date: '',
              author: scriitor.nume,
              text: '',
              descriere: '',
              image: '',
              pin: false,
              isPoem: false,
              isStory: false,
              poemTitle: '',
              poemText: '',
              poemPreview: '',
              poemImages: [],
              poemImagesOnLeft: true,
              storyTitle: '',
              storyText: '',
              storyImageOnLeft: true,
                showReadAllButton: false,
                readAllButtonText: '',
                readAllButtonLink: '',
                storyMoreText: '',
              pinnedActions: [],
              reactions: [],
              comments: [],
              createdBy: '',
              createdByEmail: '',
              createdByName: '',
            });
            setScriitorView('post-add');
          } else if (actionParam === 'edit-post' && postIdParam) {
            // Nu reîmprospăta postForm dacă deja suntem în modul de editare pentru aceeași postare
            // (pentru a nu pierde modificările nesalvate, inclusiv comentariile editate)
            const postIdNum = parseInt(postIdParam);
            const currentPostId = typeof postForm.id === 'string' ? parseInt(postForm.id) : postForm.id;
            const isSamePost = currentPostId === postIdNum || postForm.id === postIdParam;
            
            if (scriitorView !== 'post-edit' || !isSamePost) {
              const post = scriitor.posts?.find(p => p.id === postIdNum || p.id === postIdParam);
              if (post) {
                setPostForm({
                  id: post.id,
                  date: post.date || '',
                  author: post.author || scriitor.nume,
                  text: post.text || '',
                  descriere: post.descriere || '',
                  image: post.image || '',
                  pin: post.pin || false,
                  isPoem: post.isPoem || false,
                  isStory: post.isStory || false,
                  poemTitle: post.poemTitle || '',
                  poemText: post.poemText || '',
                  poemPreview: post.poemPreview || '',
                  poemImages: post.poemImages || [],
                  poemImagesOnLeft: post.poemImagesOnLeft !== undefined ? post.poemImagesOnLeft : true,
                  storyTitle: post.storyTitle || '',
                  storyText: post.storyText || '',
                  storyImageOnLeft: post.storyImageOnLeft !== undefined ? post.storyImageOnLeft : true,
                  showReadAllButton: post.showReadAllButton || false,
                  readAllButtonText: post.readAllButtonText || '',
                  readAllButtonLink: post.readAllButtonLink || '',
                  storyMoreText: post.storyMoreText || '',
                  pinnedActions: post.pinnedActions || [],
                  reactions: post.reactions || [],
                  comments: post.comments || [],
                  newCommentAuthor: '',
                  newCommentKey: '',
                  newCommentText: '',
                  editingCommentText: '',
                  newReactionFriendKey: '',
                  newReactionFriendName: '',
                  newReactionType: '',
                  createdBy: post.createdBy || '',
                  createdByEmail: post.createdByEmail || '',
                  createdByName: post.createdByName || '',
                });
              }
            }
            setScriitorView('post-edit');
          } else if (actionParam === 'edit-comment' && postIdParam && commentIndexParam !== null) {
            const post = scriitor.posts?.find(p => p.id === parseInt(postIdParam) || p.id === postIdParam);
            if (post && post.comments && post.comments[parseInt(commentIndexParam)]) {
              const commentToEdit = post.comments[parseInt(commentIndexParam)];
              // Open post edit view with the post data
              setPostForm({
                id: post.id,
                date: post.date || '',
                author: post.author || scriitor.nume,
                text: post.text || '',
                descriere: post.descriere || '',
                image: post.image || '',
                pin: post.pin || false,
                isPoem: post.isPoem || false,
                isStory: post.isStory || false,
                poemTitle: post.poemTitle || '',
                poemText: post.poemText || '',
                poemPreview: post.poemPreview || '',
                poemImages: post.poemImages || [],
                poemImagesOnLeft: post.poemImagesOnLeft !== undefined ? post.poemImagesOnLeft : true,
                storyTitle: post.storyTitle || '',
                storyText: post.storyText || '',
                storyImageOnLeft: post.storyImageOnLeft !== undefined ? post.storyImageOnLeft : true,
                pinnedActions: post.pinnedActions || [],
                reactions: post.reactions || [],
                comments: post.comments || [],
                createdBy: post.createdBy || '',
                createdByEmail: post.createdByEmail || '',
                createdByName: post.createdByName || '',
                showReadAllButton: post.showReadAllButton || false,
                readAllButtonText: post.readAllButtonText || '',
                readAllButtonLink: post.readAllButtonLink || '',
                storyMoreText: post.storyMoreText || '',
                editingCommentText: commentToEdit.text || '',
              });
              setScriitorView('post-edit');
              updateUrlParams({ view: 'post-edit', scriitor: scriitorParam, action: 'edit-post', postId: postIdParam, commentIndex: commentIndexParam });
            }
          }
        }
      }
    }
  }, [activeTab, searchParams, scriitoriList, updateUrlParams]);

  // Scroll to comment when editing a specific comment
  useEffect(() => {
    const commentIndexParam = searchParams.get('commentIndex');
    if (scriitorView === 'post-edit' && commentIndexParam !== null && editingCommentRef.current) {
      setTimeout(() => {
        editingCommentRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
  }, [scriitorView, searchParams]);

  const loadScriitori = async () => {
    try {
      const scriitori = await fetchScriitori();
      setScriitoriList(scriitori);
    } catch (error) {
      console.error('Error loading scriitori:', error);
      setMessage({ type: 'error', text: 'Eroare la încărcarea scriitorilor' });
    }
  };

  const handleComentariuSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      ensureOwnershipContext();
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
        const targetId = editingCommentId || comentariuForm.id;
        if (!targetId) {
          throw new Error('ID-ul comentariului este obligatoriu pentru editare');
        }

        ensureCanEdit(comentariuForm.createdBy, 'Nu poți edita un comentariu creat de altcineva.', { allowSemiAdminFullAccess: true });
        const payload = attachOwnershipMetadata({
          ...comentariuForm,
          id: targetId,
        });

        await updateComentariu(payload);

        setMessage({ type: 'success', text: 'Comentariul a fost actualizat cu succes!' });
        
        // Create notification
        try {
          await createNotification({
            type: 'comentariu',
            action: 'updated',
            userId: currentUserId,
            userName: userDisplayName,
            userEmail: userEmail,
            userPhotoURL: userProfile?.photoURL || currentUser?.photoURL || '',
            isSemiAdmin: isSemiAdminUser,
            itemName: comentariuForm.titlu,
            itemId: comentariuForm.id,
          });
        } catch (notifError) {
          console.error('Error creating notification:', notifError);
        }
        
        // Navigate to comentarii page after successful update
        setTimeout(() => {
          setIsEditing(false);
          setEditingCommentId(null);
          navigate('/comentarii');
        }, 500);
      } else {
        // Add new comentariu
        // Generate ID if not provided - add timestamp to allow multiple comments for same opera
        const id = comentariuForm.id || 
          `${comentariuForm.autor.toLowerCase().replace(/\s+/g, '-')}-${comentariuForm.titlu.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;

        const payload = attachOwnershipMetadata({
          ...comentariuForm,
          id,
        });

        console.log('Adding comentariu with payload:', payload);
        await addComentariu(payload);
        console.log('Comentariu added successfully to database');

        setMessage({ type: 'success', text: 'Comentariul a fost adăugat cu succes!' });
        
        // Create notification
        try {
          await createNotification({
            type: 'comentariu',
            action: 'added',
            userId: currentUserId,
            userName: userDisplayName,
            userEmail: userEmail,
            userPhotoURL: userProfile?.photoURL || currentUser?.photoURL || '',
            isSemiAdmin: isSemiAdminUser,
            itemName: comentariuForm.titlu,
            itemId: id,
          });
        } catch (notifError) {
          console.error('Error creating notification:', notifError);
        }
        
        // Reset form
        setComentariuForm({
          id: '',
          titlu: '',
          autor: '',
          categorie: '',
          tip: 'general',
          plan: 'free',
          descriere: '',
          content: [],
          createdBy: '',
          createdByEmail: '',
          createdByName: '',
        });
        setIsEditing(false);
        setEditingCommentId(null);
        
        // Navigate to comentarii page after successful add (same delay as edit)
        setTimeout(() => {
          navigate('/comentarii');
        }, 500);
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
      ensureOwnershipContext();
      // Parse cerinte and punctaj from textarea (one per line)
      const cerinte = subiectForm.cerinte
        // Accept both real new lines (Enter) and literal "\n" or "/n"
        .replace(/\r\n/g, '\n')
        .split(/\n|\\n|\/n/)
        .map(line => line.trim())
        .filter(line => line.length > 0);
      
      const punctaj = subiectForm.punctaj
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

      const yearValue = parseInt(subiectForm.an) || new Date().getFullYear();
      const subiectData = {
        ...subiectForm,
        an: yearValue,
        data: yearValue.toString(), // Also update 'data' field to match 'an'
        numarSubiect: parseInt(subiectForm.numarSubiect) || 1,
        cerinte,
        punctaj,
      };

      if (isEditingSubiect) {
        // Update existing subiect
        if (!subiectForm.id) {
          throw new Error('ID-ul subiectului este obligatoriu pentru editare');
        }
        ensureCanEdit(subiectForm.createdBy, 'Nu poți edita un subiect creat de altcineva.');
        const payload = attachOwnershipMetadata(subiectData);

        await updateSubiect(payload);

        setMessage({ type: 'success', text: 'Subiectul a fost actualizat cu succes!' });
        
        // Create notification
        try {
          await createNotification({
            type: 'subiect',
            action: 'updated',
            userId: currentUserId,
            userName: userDisplayName,
            userEmail: userEmail,
            userPhotoURL: userProfile?.photoURL || currentUser?.photoURL || '',
            isSemiAdmin: isSemiAdminUser,
            itemName: subiectForm.titlu,
            itemId: subiectForm.id,
          });
        } catch (notifError) {
          console.error('Error creating notification:', notifError);
        }
        
        // Clear sessionStorage draft after successful update
        try {
          const storageKey = `admin_subiect_form_draft_${tabIdRef.current}`;
          sessionStorage.removeItem(storageKey);
        } catch (error) {
          console.error('Error clearing subiect form draft from sessionStorage:', error);
        }
        
        // Navigate to subiecte page after successful update
        setTimeout(() => {
          navigate('/subiecte');
        }, 500);
      } else {
        // Add new subiect
        const payload = attachOwnershipMetadata(subiectData);
        await addSubiect(payload);

        setMessage({ type: 'success', text: 'Subiectul a fost adăugat cu succes!' });
        
        // Create notification
        try {
          await createNotification({
            type: 'subiect',
            action: 'added',
            userId: currentUserId,
            userName: userDisplayName,
            userEmail: userEmail,
            userPhotoURL: userProfile?.photoURL || currentUser?.photoURL || '',
            isSemiAdmin: isSemiAdminUser,
            itemName: subiectForm.titlu,
            itemId: subiectForm.id || '',
          });
        } catch (notifError) {
          console.error('Error creating notification:', notifError);
        }
        
        setSubiectForm({
          id: '',
          titlu: '',
          descriere: '',
          numarSubiect: '1',
          subpunct: '',
          profil: 'real',
          an: new Date().getFullYear(),
          sesiune: 'sesiune de vară',
          text: '',
          cerinte: '',
          punctaj: '',
          createdBy: '',
          createdByEmail: '',
          createdByName: '',
        });
        setIsEditingSubiect(false);
        // Clear sessionStorage draft after successful submission
        try {
          const storageKey = `admin_subiect_form_draft_${tabIdRef.current}`;
          sessionStorage.removeItem(storageKey);
        } catch (error) {
          console.error('Error clearing subiect form draft from sessionStorage:', error);
        }
        
        // Navigate to subiecte page after successful add
        setTimeout(() => {
          navigate('/subiecte');
        }, 500);
      }
    } catch (error) {
      console.error(`Error ${isEditingSubiect ? 'updating' : 'adding'} subiect:`, error);
      setMessage({ type: 'error', text: `Eroare: ${error.message || `Nu s-a putut ${isEditingSubiect ? 'actualiza' : 'adăuga'} subiectul`}` });
    } finally {
      setLoading(false);
    }
  };

  const handleFilmSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      ensureOwnershipContext();
      // Generate ID from titlu if not provided
      let filmId = filmForm.id;
      if (!filmId && filmForm.titlu) {
        filmId = filmForm.titlu.toLowerCase()
          .replace(/ă/g, 'a').replace(/â/g, 'a').replace(/î/g, 'i')
          .replace(/ș/g, 's').replace(/ş/g, 's').replace(/ț/g, 't').replace(/ţ/g, 't')
          .replace(/[^a-z0-9 ]/g, '')
          .split(' ')
          .filter(Boolean)
          .join('-')
          .substring(0, 50);
      }

      if (!filmId) {
        throw new Error('ID-ul filmului este obligatoriu (se generează automat din titlu)');
      }

      const filmData = {
        ...filmForm,
        id: filmId,
      };

      if (isEditingFilm) {
        // Update existing film
        if (!filmForm.id) {
          throw new Error('ID-ul filmului este obligatoriu pentru editare');
        }
        ensureCanEdit(filmForm.createdBy, 'Nu poți edita un film creat de altcineva.');
        const payload = attachOwnershipMetadata(filmData);

        await updateFilm(payload);

        setMessage({ type: 'success', text: 'Filmul a fost actualizat cu succes!' });
        
        // Create notification
        try {
          await createNotification({
            type: 'film',
            action: 'updated',
            userId: currentUserId,
            userName: userDisplayName,
            userEmail: userEmail,
            userPhotoURL: userProfile?.photoURL || currentUser?.photoURL || '',
            isSemiAdmin: isSemiAdminUser,
            itemName: filmForm.titlu,
            itemId: filmForm.id,
          });
        } catch (notifError) {
          console.error('Error creating notification:', notifError);
        }
        
        // Navigate to videoclipuri page after successful update
        setTimeout(() => {
          navigate('/videoclipuri');
        }, 500);
      } else {
        // Add new film
        const payload = attachOwnershipMetadata(filmData);
        await addFilm(payload);

        setMessage({ type: 'success', text: 'Filmul a fost adăugat cu succes!' });
        
        // Create notification
        try {
          await createNotification({
            type: 'film',
            action: 'added',
            userId: currentUserId,
            userName: userDisplayName,
            userEmail: userEmail,
            userPhotoURL: userProfile?.photoURL || currentUser?.photoURL || '',
            isSemiAdmin: isSemiAdminUser,
            itemName: filmForm.titlu,
            itemId: filmId,
          });
        } catch (notifError) {
          console.error('Error creating notification:', notifError);
        }
        
        setFilmForm({
          id: '',
          titlu: '',
          descriere: '',
          videoId: '',
          categorie: '',
          durata: '',
          autor: '',
          createdBy: '',
          createdByEmail: '',
          createdByName: '',
        });
        setIsEditingFilm(false);
      }
    } catch (error) {
      console.error(`Error ${isEditingFilm ? 'updating' : 'adding'} film:`, error);
      setMessage({ type: 'error', text: `Eroare: ${error.message || `Nu s-a putut ${isEditingFilm ? 'actualiza' : 'adăuga'} filmul`}` });
    } finally {
      setLoading(false);
    }
  };

  // Scriitor handlers
  const handleScriitorSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      ensureOwnershipContext();
      if (!scriitorForm.nume) {
        throw new Error('Numele este obligatoriu');
      }

      // Generate key from nume if not provided
      const key = scriitorForm.key || 
        scriitorForm.nume.toLowerCase()
          .replace(/ă/g, 'a').replace(/â/g, 'a').replace(/î/g, 'i')
          .replace(/ș/g, 's').replace(/ş/g, 's').replace(/ț/g, 't').replace(/ţ/g, 't')
          .replace(/[^a-z0-9 ]/g, '')
          .split(' ')
          .filter(Boolean)
          .slice(-1)[0] || 'scriitor';

      // Adaugă automat poza și banner-ul în galerie dacă există
      const gallery = [...(scriitorForm.gallery || [])];
      if (scriitorForm.img && scriitorForm.img.trim() !== '' && !gallery.includes(scriitorForm.img)) {
        gallery.push(scriitorForm.img);
      }
      if (scriitorForm.banner && scriitorForm.banner.trim() !== '' && !gallery.includes(scriitorForm.banner)) {
        gallery.push(scriitorForm.banner);
      }

      // Asigură-te că info este salvat corect (nu null dacă are valori)
      let infoToSave = scriitorForm.info;
      if (infoToSave) {
        // Verifică dacă info are cel puțin un câmp completat
        const hasInfo = Object.values(infoToSave).some(val => val && val.toString().trim() !== '');
        if (!hasInfo) {
          infoToSave = null;
        }
      }

      const scriitorData = {
        ...scriitorForm,
        key,
        gallery,
        info: infoToSave,
        // Elimină câmpurile temporare
        newFriendKey: undefined,
        newFriendName: undefined,
        opereJsonText: undefined,
      };

      if (isEditingScriitor) {
        ensureCanEdit(scriitorForm.createdBy, 'Nu poți edita un scriitor creat de altcineva.');
        const payload = attachOwnershipMetadata(scriitorData);
        await updateScriitor(key, payload);
        setMessage({ type: 'success', text: 'Scriitorul a fost actualizat cu succes!' });
        
        // Create notification
        try {
          await createNotification({
            type: 'scriitor',
            action: 'updated',
            userId: currentUserId,
            userName: userDisplayName,
            userEmail: userEmail,
            userPhotoURL: userProfile?.photoURL || currentUser?.photoURL || '',
            isSemiAdmin: isSemiAdminUser,
            itemName: scriitorForm.nume,
            itemId: key,
          });
        } catch (notifError) {
          console.error('Error creating notification:', notifError);
        }
      } else {
        const payload = attachOwnershipMetadata(scriitorData);
        await addScriitor(payload);
        setMessage({ type: 'success', text: 'Scriitorul a fost adăugat cu succes!' });
        
        // Create notification
        try {
          await createNotification({
            type: 'scriitor',
            action: 'added',
            userId: currentUserId,
            userName: userDisplayName,
            userEmail: userEmail,
            userPhotoURL: userProfile?.photoURL || currentUser?.photoURL || '',
            isSemiAdmin: isSemiAdminUser,
            itemName: scriitorForm.nume,
            itemId: key,
          });
        } catch (notifError) {
          console.error('Error creating notification:', notifError);
        }
      }

      await loadScriitori();
      setScriitorView('list');
      updateUrlParams({ view: 'list', scriitor: null, action: null, postId: null, commentIndex: null });
      setScriitorForm({
        key: '',
        nume: '',
        date: '',
        img: '',
        banner: '',
        color: 'rgba(255,179,71,0.82)',
        categorie: '',
        canonic: true,
        friends: [],
        gallery: [],
        posts: [],
        prezentare: null,
        biografie: '',
        info: null,
        opere: {},
        ordine: 999,
        newFriendKey: '',
        newFriendName: '',
        opereJsonText: '',
        createdBy: '',
        createdByEmail: '',
        createdByName: '',
      });
      setIsEditingScriitor(false);
      setSelectedScriitor(null);
    } catch (error) {
      console.error(`Error ${isEditingScriitor ? 'updating' : 'adding'} scriitor:`, error);
      setMessage({ type: 'error', text: `Eroare: ${error.message || `Nu s-a putut ${isEditingScriitor ? 'actualiza' : 'adăuga'} scriitorul`}` });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file, type) => {
    try {
      setLoading(true);
      const url = await uploadImageToCloudinary(file, 'scriitori');
      if (type === 'img') {
        setScriitorForm({ ...scriitorForm, img: url });
      } else if (type === 'banner') {
        setScriitorForm({ ...scriitorForm, banner: url });
      } else if (type === 'post') {
        setPostForm({ ...postForm, image: url });
      }
      setMessage({ type: 'success', text: 'Imagine încărcată cu succes!' });
    } catch (error) {
      console.error('Error uploading image:', error);
      // Show the full error message to help with debugging
      const errorMessage = error.message || 'Eroare la încărcarea imaginii';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!selectedScriitor) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      ensureOwnershipContext();
      const scriitorOwnerId = selectedScriitor.createdBy || '';
      // Validare pentru poezii
      if (postForm.isPoem) {
        if (!postForm.poemTitle) {
          throw new Error('Titlul poeziei este obligatoriu');
        }
        if (!postForm.poemText) {
          throw new Error('Textul poeziei este obligatoriu');
        }
        if (!postForm.poemImages || postForm.poemImages.length === 0) {
          throw new Error('Trebuie să adaugi cel puțin o imagine pentru poezie');
        }
        if (postForm.poemImages.length > 2) {
          throw new Error('Poți adăuga maxim 2 imagini pentru poezie');
        }
      }

      const postData = attachOwnershipMetadata({
        ...postForm,
        id: postForm.id || Date.now(),
        author: postForm.author || selectedScriitor.nume,
        // Dacă e poezie, nu folosi image, folosește poemImages
        image: postForm.isPoem ? '' : postForm.image,
      });

      if (scriitorView === 'post-edit') {
        ensureCanEdit(postForm.createdBy || scriitorOwnerId, 'Nu poți edita o postare creată de altcineva.', { allowSemiAdminFullAccess: true });
        await updatePostForScriitor(selectedScriitor.key, postForm.id, postData);
        setMessage({ type: 'success', text: 'Postarea a fost actualizată cu succes!' });
        
        // Create notification
        try {
          await createNotification({
            type: 'post',
            action: 'updated',
            userId: currentUserId,
            userName: userDisplayName,
            userEmail: userEmail,
            userPhotoURL: userProfile?.photoURL || currentUser?.photoURL || '',
            isSemiAdmin: isSemiAdminUser,
            itemName: postForm.poemTitle || postForm.storyTitle || postForm.text?.substring(0, 50) || 'Postare',
            itemId: postForm.id?.toString() || '',
            scriitorName: selectedScriitor.nume,
          });
        } catch (notifError) {
          console.error('Error creating notification:', notifError);
        }
      } else {
        if (!isAdminUser && !isSemiAdminUser) {
          throw new Error('Nu ai permisiuni pentru a adăuga postări.');
        }
        await addPostToScriitor(selectedScriitor.key, postData);
        setMessage({ type: 'success', text: 'Postarea a fost adăugată cu succes!' });
        
        // Create notification
        try {
          await createNotification({
            type: 'post',
            action: 'added',
            userId: currentUserId,
            userName: userDisplayName,
            userEmail: userEmail,
            userPhotoURL: userProfile?.photoURL || currentUser?.photoURL || '',
            isSemiAdmin: isSemiAdminUser,
            itemName: postForm.poemTitle || postForm.storyTitle || postForm.text?.substring(0, 50) || 'Postare',
            itemId: postData.id?.toString() || '',
            scriitorName: selectedScriitor.nume,
          });
        } catch (notifError) {
          console.error('Error creating notification:', notifError);
        }
      }

      // Colectează toate imaginile din postare și gestionează galeria
      const imagesToAdd = [];
      const imagesToRemove = [];
      
      // Pentru postări normale și story-uri: folosește postForm.image (nu postData.image care e '' pentru poezii)
      if (postForm.image && postForm.image.trim() !== '') {
        imagesToAdd.push(postForm.image);
      }
      
      // Pentru poezii: folosește postForm.poemImages
      if (postForm.poemImages && Array.isArray(postForm.poemImages)) {
        postForm.poemImages.forEach(img => {
          if (img && img.trim() !== '' && !imagesToAdd.includes(img)) {
            imagesToAdd.push(img);
          }
        });
      }
      
      // La editare, detectează imaginile eliminate
      if (scriitorView === 'post-edit') {
        const originalPost = selectedScriitor.posts?.find(p => p.id === postForm.id);
        if (originalPost) {
          const originalImages = [];
          if (originalPost.image && originalPost.image.trim() !== '') {
            originalImages.push(originalPost.image);
          }
          if (originalPost.poemImages && Array.isArray(originalPost.poemImages)) {
            originalPost.poemImages.forEach(img => {
              if (img && img.trim() !== '' && !originalImages.includes(img)) {
                originalImages.push(img);
              }
            });
          }
          
          // Identifică imaginile eliminate (erau în original, dar nu mai sunt în noua versiune)
          const removedImages = originalImages.filter(img => !imagesToAdd.includes(img));
          imagesToRemove.push(...removedImages);
          
          // Păstrează doar imaginile noi pentru adăugare
          const filtered = imagesToAdd.filter(img => !originalImages.includes(img));
          imagesToAdd.length = 0;
          imagesToAdd.push(...filtered);
        }
      }
      
      // Actualizează galeria: adaugă imaginile noi și elimină cele șterse
      if (selectedScriitor?.key) {
        try {
          const updated = await fetchScriitori();
          const currentScriitor = updated.find(s => s.key === selectedScriitor.key);
          if (currentScriitor) {
            let gallery = currentScriitor.gallery || [];
            
            // Adaugă imaginile noi
            if (imagesToAdd.length > 0) {
              const newImages = imagesToAdd.filter(img => !gallery.includes(img));
              if (newImages.length > 0) {
                gallery = [...gallery, ...newImages];
                console.log('✅ Imagini adăugate automat în galerie:', newImages);
              }
            }
            
            // Elimină imaginile șterse (doar dacă nu mai sunt în alte postări)
            if (imagesToRemove.length > 0) {
              // Verifică dacă imaginile sunt folosite în alte postări
              const allPosts = currentScriitor.posts || [];
              const imagesStillInUse = new Set();
              
              allPosts.forEach(p => {
                if (p.id !== postForm.id) { // Exclude postarea curentă
                  if (p.image && p.image.trim() !== '') {
                    imagesStillInUse.add(p.image);
                  }
                  if (p.poemImages && Array.isArray(p.poemImages)) {
                    p.poemImages.forEach(img => {
                      if (img && img.trim() !== '') {
                        imagesStillInUse.add(img);
                      }
                    });
                  }
                }
              });
              
              // Elimină doar imaginile care nu mai sunt folosite în nicio altă postare
              const imagesToRemoveFromGallery = imagesToRemove.filter(img => !imagesStillInUse.has(img));
              if (imagesToRemoveFromGallery.length > 0) {
                gallery = gallery.filter(img => !imagesToRemoveFromGallery.includes(img));
                console.log('✅ Imagini eliminate automat din galerie:', imagesToRemoveFromGallery);
              }
            }
            
            // Actualizează galeria doar dacă s-a schimbat ceva
            if (imagesToAdd.length > 0 || imagesToRemove.length > 0) {
              await updateScriitor(selectedScriitor.key, { gallery });
            }
          }
        } catch (error) {
          console.error('❌ Eroare la gestionarea galeriei:', error);
        }
      }

      // Reîncarcă lista de scriitori pentru a actualiza comentariile
      await loadScriitori();
      const updated = await fetchScriitori();
      const updatedScriitor = updated.find(s => s.key === selectedScriitor.key);
      if (updatedScriitor) {
        setSelectedScriitor(updatedScriitor);
      }

      // După salvarea postării:
      // - dacă am venit „din pagina scriitorului” (from=scriitor), navigăm înapoi la scriitor
      // - altfel rămânem în admin, în zona de postări (comportamentul vechi)
      const fromParamAfterSave = searchParams.get('from');
      if (fromParamAfterSave === 'scriitor' && selectedScriitor) {
        // Navighează înapoi la pagina scriitorului
        setTimeout(() => {
          navigate(`/scriitor?name=${selectedScriitor.key || selectedScriitor.id}`);
        }, 500);
      } else {
        setScriitorView('posts');
        if (selectedScriitor) {
          updateUrlParams({ view: 'posts', scriitor: selectedScriitor.key || selectedScriitor.id, action: null, postId: null, commentIndex: null, from: fromParamAfterSave || 'admin' });
        }
      }
      setPostForm({
        id: '',
        date: '',
        author: '',
        text: '',
        descriere: '',
        image: '',
        pin: false,
        isPoem: false,
        isStory: false,
        poemTitle: '',
        poemText: '',
        poemPreview: '',
        poemImages: [],
        poemImagesOnLeft: true,
        storyTitle: '',
        storyText: '',
        storyImageOnLeft: true,
        showReadAllButton: false,
        readAllButtonText: '',
        readAllButtonLink: '',
        storyMoreText: '',
        pinnedActions: [],
        reactions: [],
        comments: [],
        newCommentAuthor: '',
        newCommentKey: '',
        newCommentText: '',
        editingCommentText: '',
        newReactionFriendKey: '',
        newReactionFriendName: '',
        newReactionType: '',
        createdBy: '',
        createdByEmail: '',
        createdByName: '',
      });
      setAiPostPrompt('');
      setAiCommentPrompt('');
    } catch (error) {
      console.error('Error saving post:', error);
      setMessage({ type: 'error', text: `Eroare: ${error.message || 'Nu s-a putut salva postarea'}` });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteScriitor = async (scriitor) => {
    if (!isAdminUser) {
      setMessage({ type: 'error', text: 'Doar administratorii pot șterge scriitori.' });
      return;
    }
    if (!scriitor) return;
    const key = scriitor.key || scriitor.id;
    if (!key) {
      setMessage({ type: 'error', text: 'Nu s-a putut identifica scriitorul pentru ștergere.' });
      return;
    }
    // Admins can delete any scriitor; semi-admins are blocked earlier
    if (!window.confirm('Ești sigur că vrei să ștergi acest scriitor?')) return;

    try {
      setLoading(true);
      await deleteScriitor(key);
      setMessage({ type: 'success', text: 'Scriitorul a fost șters cu succes!' });
      
      // Create notification
      try {
        await createNotification({
          type: 'scriitor',
          action: 'deleted',
          userId: currentUserId,
          userName: userDisplayName,
          userEmail: userEmail,
          userPhotoURL: userProfile?.photoURL || currentUser?.photoURL || '',
          isSemiAdmin: isSemiAdminUser,
          itemName: scriitor.nume,
          itemId: key,
        });
      } catch (notifError) {
        console.error('Error creating notification:', notifError);
      }
      
      await loadScriitori();
    } catch (error) {
      console.error('Error deleting scriitor:', error);
      setMessage({ type: 'error', text: 'Eroare la ștergerea scriitorului' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!isAdminUser) {
      setMessage({ type: 'error', text: 'Doar administratorii pot șterge postări.' });
      return;
    }
    if (!selectedScriitor) return;
    const post = selectedScriitor.posts?.find((p) => p.id === postId);
    if (!post) {
      setMessage({ type: 'error', text: 'Postarea nu a fost găsită.' });
      return;
    }
    // Admins can delete any post; semi-admins are blocked earlier
    if (!window.confirm('Ești sigur că vrei să ștergi această postare?')) return;

    try {
      setLoading(true);
      
      // Colectează toate imaginile din postarea care va fi ștearsă
      const imagesToRemove = [];
      if (post.image && post.image.trim() !== '') {
        imagesToRemove.push(post.image);
      }
      if (post.poemImages && Array.isArray(post.poemImages)) {
        post.poemImages.forEach(img => {
          if (img && img.trim() !== '' && !imagesToRemove.includes(img)) {
            imagesToRemove.push(img);
          }
        });
      }
      
      // Șterge postarea
      await deletePostFromScriitor(selectedScriitor.key, postId);
      
      // Elimină imaginile din galerie (doar dacă nu mai sunt în alte postări)
      if (imagesToRemove.length > 0 && selectedScriitor?.key) {
        try {
          const updated = await fetchScriitori();
          const currentScriitor = updated.find(s => s.key === selectedScriitor.key);
          if (currentScriitor) {
            // Verifică dacă imaginile sunt folosite în alte postări
            const allPosts = currentScriitor.posts || [];
            const imagesStillInUse = new Set();
            
            allPosts.forEach(p => {
              if (p.image && p.image.trim() !== '') {
                imagesStillInUse.add(p.image);
              }
              if (p.poemImages && Array.isArray(p.poemImages)) {
                p.poemImages.forEach(img => {
                  if (img && img.trim() !== '') {
                    imagesStillInUse.add(img);
                  }
                });
              }
            });
            
            // Elimină doar imaginile care nu mai sunt folosite în nicio postare
            const imagesToRemoveFromGallery = imagesToRemove.filter(img => !imagesStillInUse.has(img));
            if (imagesToRemoveFromGallery.length > 0) {
              const gallery = currentScriitor.gallery || [];
              const updatedGallery = gallery.filter(img => !imagesToRemoveFromGallery.includes(img));
              await updateScriitor(selectedScriitor.key, { gallery: updatedGallery });
              console.log('✅ Imagini eliminate automat din galerie:', imagesToRemoveFromGallery);
            }
          }
        } catch (error) {
          console.error('❌ Eroare la eliminarea imaginilor din galerie:', error);
        }
      }
      
      setMessage({ type: 'success', text: 'Postarea a fost ștearsă cu succes!' });
      
      // Create notification
      try {
        await createNotification({
          type: 'post',
          action: 'deleted',
          userId: currentUserId,
          userName: userDisplayName,
          userEmail: userEmail,
          userPhotoURL: userProfile?.photoURL || currentUser?.photoURL || '',
          isSemiAdmin: isSemiAdminUser,
          itemName: post.poemTitle || post.storyTitle || post.text?.substring(0, 50) || 'Postare',
          itemId: postId?.toString() || '',
          scriitorName: selectedScriitor.nume,
        });
      } catch (notifError) {
        console.error('Error creating notification:', notifError);
      }
      
      await loadScriitori();
      const updated = await fetchScriitori();
      const updatedScriitor = updated.find(s => s.key === selectedScriitor.key);
      if (updatedScriitor) {
        setSelectedScriitor(updatedScriitor);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setMessage({ type: 'error', text: 'Eroare la ștergerea postării' });
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
      {isLimitedAdminView && (
        <div
          className="admin-info-banner"
          style={{
            background: 'rgba(169, 124, 80, 0.15)',
            border: '1px solid rgba(169, 124, 80, 0.5)',
            color: darkTheme ? '#ffd591' : '#4e2e1e',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '16px',
            display: 'none',
          }}
        >
          {/* Ai rol de semi-admin. Poți adăuga, edita și șterge doar conținutul creat de tine; conținutul altor administratori rămâne protejat. */}
        </div>
      )}

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'comentarii' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('comentarii');
            updateUrlParams({ tab: 'comentarii' });
          }}
        >
          Adaugă Comentariu
        </button>
        <button
          className={`admin-tab ${activeTab === 'subiecte' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('subiecte');
            updateUrlParams({ tab: 'subiecte' });
          }}
        >
          Adaugă Subiect
        </button>
        <button
          className={`admin-tab ${activeTab === 'scriitori' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('scriitori');
            updateUrlParams({ tab: 'scriitori' });
          }}
        >
          Gestionează Scriitori
        </button>
        <button
          className={`admin-tab ${activeTab === 'filme' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('filme');
            updateUrlParams({ tab: 'filme' });
          }}
        >
          Adaugă Film
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
                placeholder={isGeneratingComentariuMeta ? "Se generează cu AI..." : "eminescu-luceafarul"}
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
                <option value="free">Gratis</option>
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
              autoComplete="off"
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
            {isGeneratingComentariuMeta && (
              <small style={{ color: darkTheme ? '#c3b7a4' : '#666', display: 'block', marginTop: '4px' }}>
                ⏳ Se generează id, categorie și titlurile paragrafelor...
              </small>
            )}
          </div>

          <div className="admin-form-group">
            <label htmlFor="comentariu-tip">Tip comentariu</label>
            <select
              id="comentariu-tip"
              value={comentariuForm.tip}
              onChange={(e) => setComentariuForm({ ...comentariuForm, tip: e.target.value })}
              className="admin-select"
            >
              {comentariuTipOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="admin-form-group">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
              <label htmlFor="comentariu-descriere" style={{ marginBottom: 0 }}>Descriere</label>
              <AIComentariuDescriptionGenerator
                titlu={comentariuForm.titlu}
                autor={comentariuForm.autor}
                onDescriptionGenerated={(generatedDescription) => setComentariuForm((prev) => ({ ...prev, descriere: generatedDescription }))}
                setMessage={setMessage}
                darkTheme={darkTheme}
                isGenerating={isGeneratingComentariuDescription}
              />
            </div>
            <input
              type="text"
              id="comentariu-descriere"
              value={comentariuForm.descriere}
              onChange={(e) => setComentariuForm({ ...comentariuForm, descriere: e.target.value })}
              placeholder={isGeneratingComentariuDescription ? "Se generează descrierea automat..." : "Teme, motive, viziune, specii și interpretare succintă."}
              className="admin-input"
            />
            {isGeneratingComentariuDescription && (
              <small style={{ color: darkTheme ? '#c3b7a4' : '#666', display: 'block', marginTop: '4px' }}>
                ⏳ Se generează descrierea automat...
              </small>
            )}
          </div>

          <div className="admin-form-group">
            <label htmlFor="comentariu-full-text">Text complet (nelimitat - până la 1500+ cuvinte)</label>
            <textarea
              id="comentariu-full-text"
              value={fullCommentText}
              onChange={(e) => {
                setFullCommentText(e.target.value);
                // Auto-expand textarea
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              placeholder="Lipește sau scrie aici textul complet al comentariului (nelimitat)..."
              className="admin-textarea"
              style={{
                minHeight: '200px',
                resize: 'vertical',
                width: '100%',
                fontFamily: 'inherit',
                fontSize: '14px',
                lineHeight: '1.5',
                padding: '12px',
                border: `1px solid ${darkTheme ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
                borderRadius: '4px',
                backgroundColor: darkTheme ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                color: darkTheme ? '#e0d5c4' : '#333',
              }}
              onInput={(e) => {
                // Auto-expand on input
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
            <AIFullCommentProcessor
              fullText={fullCommentText}
              darkTheme={darkTheme}
              onProcessed={(structuredContent) => {
                setComentariuForm({ ...comentariuForm, content: structuredContent });
                setFullCommentText(''); // goliște textul
                // resetează înălțimea la dimensiunea inițială
                const el = document.getElementById('comentariu-full-text');
                if (el) {
                  el.style.height = '200px';
                }
              }}
              onStatus={setMessage}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="comentariu-content">Text structurat (paragrafe cu formatare) *</label>
            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                onClick={generateTitlesOnly}
                disabled={isGeneratingTitlesOnly || !comentariuForm.content?.length}
                className="admin-submit-button"
                style={{ padding: '10px 20px', fontSize: '14px' }}
              >
                {isGeneratingTitlesOnly ? 'Se completează titlurile...' : 'Completează titlurile paragrafelor cu AI'}
              </button>
              <span style={{ fontSize: '13px', color: darkTheme ? '#999' : '#666' }}>
                Generează titluri pentru fiecare paragraf din textul existent
              </span>
            </div>
            <RichTextEditor
              key={richTextEditorKey}
              value={comentariuForm.content}
              onChange={handleComentariuContentChange}
              darkTheme={darkTheme}
            />
            <AIComentariuFormatter
              content={comentariuForm.content}
              darkTheme={darkTheme}
              onApply={(updatedContent) => setComentariuForm({ ...comentariuForm, content: updatedContent })}
              onStatus={setMessage}
            />
          </div>

          <button type="submit" disabled={loading} className="admin-submit-button">
            {loading ? (isEditing ? 'Se actualizează...' : 'Se adaugă...') : (isEditing ? 'Actualizează Comentariu' : 'Adaugă Comentariu')}
          </button>
        </form>
      )}

      {activeTab === 'subiecte' && (
        <form onSubmit={handleSubiectSubmit} className="admin-form">
          <h2>{isEditingSubiect ? 'Editează Subiect' : 'Adaugă Subiect'}</h2>
          
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
                autoComplete="off"
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

            {subiectForm.numarSubiect === '1' && (
              <div className="admin-form-group" style={{ flex: '0 0 auto', width: '370px' }}>
                <label htmlFor="subiect-subpunct">Subpunct (A/B)</label>
                <select
                  id="subiect-subpunct"
                  value={subiectForm.subpunct}
                  onChange={(e) => setSubiectForm({ ...subiectForm, subpunct: e.target.value })}
                  className="admin-select"
                >
                  <option value="">Toate</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </div>
            )}
          </div>

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
          </div>

          <div className="admin-form-group">
            <label htmlFor="subiect-text">Text complet *</label>
            <textarea
              id="subiect-text"
              value={subiectForm.text}
              onChange={(e) => {
                // Allow Enter only pentru Subiectul 3 profil uman; altfel înlocuiește cu spațiu
                const rawValue = e.target.value;
                const value = allowSubiectTextNewlines
                  ? rawValue.replace(/\r\n/g, '\n')
                  : rawValue.replace(/\r?\n/g, ' ');
                setSubiectForm({ ...subiectForm, text: value });
              }}
              onKeyDown={(e) => {
                // Prevent Enter from creating newlines - replace with space (except Subiect 3 UMAN)
                if (!allowSubiectTextNewlines && e.key === 'Enter') {
                  e.preventDefault();
                  const textarea = e.target;
                  const start = textarea.selectionStart;
                  const end = textarea.selectionEnd;
                  const value = subiectForm.text.substring(0, start) + ' ' + subiectForm.text.substring(end);
                  setSubiectForm({ ...subiectForm, text: value });
                  // Restore cursor position
                  setTimeout(() => {
                    textarea.setSelectionRange(start + 1, start + 1);
                  }, 0);
                }
              }}
              placeholder="Textul complet al subiectului... (folosește \\n pentru paragraf nou)"
              required
              rows={10}
              className="admin-textarea"
            />
          </div>

          <div className="admin-form-group">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', gap: '10px' }}>
              <label htmlFor="subiect-cerinte">Cerințe (câte una pe linie) *</label>
              {(((subiectForm.numarSubiect === '1' && (subiectForm.subpunct === 'A' || subiectForm.subpunct === 'B')) ) || subiectForm.numarSubiect === '2' || subiectForm.numarSubiect === '3') && (
                <AICerinteProcessor
                  subiectForm={subiectForm}
                  setSubiectForm={setSubiectForm}
                  setMessage={setMessage}
                  darkTheme={darkTheme}
                />
              )}
            </div>
            <textarea
              id="subiect-cerinte"
              value={subiectForm.cerinte}
              onChange={(e) => {
                // Normalize to real new lines; still accept "/n" or "\n" typed manually
                const value = e.target.value.replace(/\\n|\/n/g, '\n');
                setSubiectForm({ ...subiectForm, cerinte: value });
              }}
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
            {loading ? (isEditingSubiect ? 'Se actualizează...' : 'Se adaugă...') : (isEditingSubiect ? 'Actualizează Subiect' : 'Adaugă Subiect')}
          </button>
        </form>
      )}

      {activeTab === 'filme' && (
        <form onSubmit={handleFilmSubmit} className="admin-form">
            <h2>{isEditingFilm ? 'Editează Film' : 'Adaugă Film'}</h2>
          
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="film-id">ID {isEditingFilm ? '(nu poate fi modificat)' : '(opțional, se generează automat din titlu)'}</label>
              <input
                type="text"
                id="film-id"
                value={filmForm.id}
                onChange={(e) => setFilmForm({ ...filmForm, id: e.target.value })}
                placeholder="ion-creanga-harap-alb"
                className="admin-input"
                disabled={isEditingFilm}
                style={isEditingFilm ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="film-categorie">Categorie *</label>
              <select
                id="film-categorie"
                value={filmForm.categorie}
                onChange={(e) => setFilmForm({ ...filmForm, categorie: e.target.value })}
                required
                className="admin-select"
              >
                <option value="">Selectează categoria</option>
                {categoriiFilme.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="film-titlu">Titlu *</label>
            <input
              type="text"
              id="film-titlu"
              value={filmForm.titlu}
              onChange={(e) => setFilmForm({ ...filmForm, titlu: e.target.value })}
              placeholder="Ion Creangă - Povestea lui Harap-Alb"
              required
              className="admin-input"
              autoComplete="off"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="film-descriere">Descriere *</label>
            <input
              type="text"
              id="film-descriere"
              value={filmForm.descriere}
              onChange={(e) => setFilmForm({ ...filmForm, descriere: e.target.value })}
              placeholder="Harap-Alb"
              required
              className="admin-input"
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="film-videoId">Video ID (YouTube) *</label>
              <input
                type="text"
                id="film-videoId"
                value={filmForm.videoId}
                onChange={(e) => setFilmForm({ ...filmForm, videoId: e.target.value })}
                placeholder="RMl6c8B0VvE"
                required
                className="admin-input"
              />
              <small style={{ color: darkTheme ? '#a97c50' : '#666', marginTop: '0.5rem', display: 'block' }}>
                Doar ID-ul din URL-ul YouTube (ex: din https://www.youtube.com/watch?v=RMl6c8B0VvE, folosește RMl6c8B0VvE)
              </small>
            </div>

            <div className="admin-form-group">
              <label htmlFor="film-durata">Durată *</label>
              <input
                type="text"
                id="film-durata"
                value={filmForm.durata}
                onChange={(e) => setFilmForm({ ...filmForm, durata: e.target.value })}
                placeholder="37:28"
                required
                className="admin-input"
              />
              <small style={{ color: darkTheme ? '#a97c50' : '#666', marginTop: '0.5rem', display: 'block' }}>
                Format: HH:MM:SS sau MM:SS
              </small>
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="film-autor">Autor *</label>
            <input
              type="text"
              id="film-autor"
              value={filmForm.autor}
              onChange={(e) => setFilmForm({ ...filmForm, autor: e.target.value })}
              placeholder="Ion Creangă"
              required
              className="admin-input"
            />
          </div>

            <button type="submit" disabled={loading} className="admin-submit-button">
              {loading ? (isEditingFilm ? 'Se actualizează...' : 'Se adaugă...') : (isEditingFilm ? 'Actualizează Film' : 'Adaugă Film')}
            </button>
          </form>
      )}

      {activeTab === 'scriitori' && (
        <div className="admin-scriitori-section">
          {scriitorView === 'list' && (
            <div>
              <div className="admin-scriitori-header">
                <h2 className="admin-scriitori-title">Lista Scriitori</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button 
                    onClick={() => {
                      setScriitorView('add');
                      updateUrlParams({ view: 'add', scriitor: null, action: null, postId: null, commentIndex: null });
                      setIsEditingScriitor(false);
                      setScriitorForm({
                        key: '',
                        nume: '',
                        date: '',
                        img: '',
                        banner: '',
                        color: 'rgba(255,179,71,0.82)',
                        categorie: '',
                        canonic: true,
                        friends: [],
                        gallery: [],
                        posts: [],
                        prezentare: null,
                        biografie: '',
                        info: null,
                        opere: {},
                        ordine: 999,
                        newFriendKey: '',
                        newFriendName: '',
                        opereJsonText: '',
                        createdBy: '',
                        createdByEmail: '',
                        createdByName: '',
                      });
                      setSelectedScriitor(null);
                    }}
                    className="admin-add-scriitor-button"
                  >
                    <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>+</span>
                    Adaugă Scriitor Nou
                  </button>
                  <button 
                    onClick={() => navigate(-1)}
                    className="admin-back-button"
                  >
                    Înapoi
                  </button>
                </div>
              </div>
              <div className="admin-scriitori-grid">
                {scriitoriList.map(scriitor => {
                  const canManageScriitor = canEditResource(scriitor.createdBy);
                  return (
                  <div key={scriitor.key || scriitor.id} className="admin-scriitor-card">
                    {scriitor.img && <img src={scriitor.img} alt={scriitor.nume} />}
                    <h3>{scriitor.nume}</h3>
                    <p>{scriitor.date}</p>
                    <div>
                      <button 
                        onClick={() => {
                          setSelectedScriitor(scriitor);
                          setScriitorView('posts');
                          updateUrlParams({ view: 'posts', scriitor: scriitor.key || scriitor.id, action: null, postId: null, commentIndex: null, from: 'admin' });
                        }}
                        className="admin-submit-button"
                        style={{ flex: 1 }}
                      >
                        Postări ({scriitor.posts?.length || 0})
                      </button>
                      {canManageScriitor && (
                        <button 
                        onClick={() => {
                          setScriitorForm({
                            key: scriitor.key || scriitor.id,
                            nume: scriitor.nume || '',
                            date: scriitor.date || '',
                            img: scriitor.img || '',
                            banner: scriitor.banner || '',
                            color: scriitor.color || 'rgba(255,179,71,0.82)',
                            categorie: scriitor.categorie || '',
                            canonic: scriitor.canonic !== undefined ? scriitor.canonic : true,
                            friends: scriitor.friends || [],
                            gallery: scriitor.gallery || [],
                            posts: scriitor.posts || [],
                            prezentare: scriitor.prezentare || null,
                            biografie: scriitor.biografie || '',
                            info: scriitor.info || (scriitor.info === undefined ? null : {}),
                            opere: scriitor.opere || {},
                            ordine: scriitor.ordine !== undefined ? scriitor.ordine : 999,
                            newFriendKey: '',
                            newFriendName: '',
                            opereJsonText: '',
                            createdBy: scriitor.createdBy || '',
                            createdByEmail: scriitor.createdByEmail || '',
                            createdByName: scriitor.createdByName || '',
                          });
                          setIsEditingScriitor(true);
                          setSelectedScriitor(scriitor);
                          setScriitorView('edit');
                          updateUrlParams({ view: 'edit', scriitor: scriitor.key || scriitor.id, action: null, postId: null, commentIndex: null });
                        }}
                        className="admin-submit-button"
                        style={{ flex: 1 }}
                      >
                        Editează
                      </button>
                      )}
                      {isAdminUser && (
                        <button 
                          onClick={() => handleDeleteScriitor(scriitor)}
                          className="admin-submit-button"
                          style={{ backgroundColor: '#dc3545', flex: 1, display: 'none'}}
                        >
                          Șterge
                        </button>
                      )}
                    </div>
                  </div>
                )})}
              </div>
            </div>
          )}

          {(scriitorView === 'add' || scriitorView === 'edit') && (
            <form onSubmit={handleScriitorSubmit} className="admin-form">
              <div className="admin-scriitor-form-header">
                <h1 className="admin-scriitor-form-title">{isEditingScriitor ? 'Editează Scriitor' : 'Adaugă Scriitor Nou'}</h1>
                <button 
                  type="button"
                  onClick={() => {
                    setScriitorView('list');
                    updateUrlParams({ view: 'list', scriitor: null, action: null, postId: null, commentIndex: null });
                    setIsEditingScriitor(false);
                    setSelectedScriitor(null);
                  }}
                  className="admin-back-button"
                >
                  Înapoi
                </button>
              </div>

              <div className="admin-form-group">
                <label htmlFor="scriitor-key">Key (opțional, se generează automat din nume)</label>
                <input
                  type="text"
                  id="scriitor-key"
                  value={scriitorForm.key}
                  onChange={(e) => setScriitorForm({ ...scriitorForm, key: e.target.value })}
                  placeholder="eminescu"
                  className="admin-input"
                  disabled={isEditingScriitor}
                />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label htmlFor="scriitor-nume">Nume *</label>
                  <input
                    type="text"
                    id="scriitor-nume"
                    value={scriitorForm.nume}
                    onChange={(e) => setScriitorForm({ ...scriitorForm, nume: e.target.value })}
                    placeholder="Mihai Eminescu"
                    required
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="scriitor-date">Date</label>
                  <input
                    type="text"
                    id="scriitor-date"
                    value={scriitorForm.date}
                    onChange={(e) => setScriitorForm({ ...scriitorForm, date: e.target.value })}
                    placeholder="1850 – 1889"
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group" style={{ flex: 1 }}>
                  <label htmlFor="scriitor-img">Imagine Profil</label>
                  {scriitorForm.img ? (
                    <div style={{ marginBottom: '10px' }}>
                      <img src={scriitorForm.img} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', border: '1px solid #ddd', objectFit: 'cover' }} />
                      <button type="button" onClick={() => setScriitorForm({ ...scriitorForm, img: '' })} style={{ marginTop: '8px', padding: '6px 12px', fontSize: '12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Șterge imagine
                      </button>
                    </div>
                  ) : null}
                  <input type="file" id="scriitor-img-file" accept="image/*" onChange={(e) => { if (e.target.files[0]) { handleImageUpload(e.target.files[0], 'img'); } }} style={{ display: 'none' }} />
                  <label htmlFor="scriitor-img-file" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: darkTheme ? '#a97c50' : '#ffd591', color: darkTheme ? '#fff' : '#4e2e1e', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 500, textAlign: 'center' }}>
                    {scriitorForm.img ? 'Schimbă imaginea' : 'Selectează imagine'}
                  </label>
                  <input type="text" value={scriitorForm.img} onChange={(e) => setScriitorForm({ ...scriitorForm, img: e.target.value })} placeholder="Sau introdu URL-ul imaginii" className="admin-input" style={{ marginTop: '10px' }} />
                </div>

                <div className="admin-form-group" style={{ flex: 1 }}>
                  <label htmlFor="scriitor-banner">Banner</label>
                  {scriitorForm.banner ? (
                    <div style={{ marginBottom: '10px' }}>
                      <img src={scriitorForm.banner} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', border: '1px solid #ddd', objectFit: 'cover' }} />
                      <button type="button" onClick={() => setScriitorForm({ ...scriitorForm, banner: '' })} style={{ marginTop: '8px', padding: '6px 12px', fontSize: '12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Șterge banner
                      </button>
                    </div>
                  ) : null}
                  <input type="file" id="scriitor-banner-file" accept="image/*" onChange={(e) => { if (e.target.files[0]) { handleImageUpload(e.target.files[0], 'banner'); } }} style={{ display: 'none' }} />
                  <label htmlFor="scriitor-banner-file" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: darkTheme ? '#a97c50' : '#ffd591', color: darkTheme ? '#fff' : '#4e2e1e', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 500, textAlign: 'center' }}>
                    {scriitorForm.banner ? 'Schimbă banner-ul' : 'Selectează banner'}
                  </label>
                  <input type="text" value={scriitorForm.banner} onChange={(e) => setScriitorForm({ ...scriitorForm, banner: e.target.value })} placeholder="Sau introdu URL-ul banner-ului" className="admin-input" style={{ marginTop: '10px' }} />
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label htmlFor="scriitor-categorie">Categorie</label>
                  <select
                    id="scriitor-categorie"
                    value={scriitorForm.categorie}
                    onChange={(e) => setScriitorForm({ ...scriitorForm, categorie: e.target.value })}
                    className="admin-select"
                  >
                    <option value="">Selectează categoria</option>
                    {categorii.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="admin-form-group">
                  <label htmlFor="scriitor-canonic">Canonic</label>
                  <select
                    id="scriitor-canonic"
                    value={scriitorForm.canonic ? 'true' : 'false'}
                    onChange={(e) => setScriitorForm({ ...scriitorForm, canonic: e.target.value === 'true' })}
                    className="admin-select"
                  >
                    <option value="true">Da</option>
                    <option value="false">Nu</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label htmlFor="scriitor-color">Culoare</label>
                  <input
                    type="text"
                    id="scriitor-color"
                    value={scriitorForm.color}
                    onChange={(e) => setScriitorForm({ ...scriitorForm, color: e.target.value })}
                    placeholder="rgba(255,179,71,0.82)"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="scriitor-ordine">Ordine</label>
                  <input
                    type="number"
                    id="scriitor-ordine"
                    value={scriitorForm.ordine}
                    onChange={(e) => setScriitorForm({ ...scriitorForm, ordine: parseInt(e.target.value) || 999 })}
                    placeholder="999"
                    className="admin-input"
                  />
                </div>
              </div>

              {/* Info mic (pentru ScriitorInfo) - MUTAT ÎNAINTE DE PREZENTARE */}
              <div className="admin-form-group">
                <label style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', display: 'block' }}>
                  Info mic (pentru afișare înainte de Prezentare)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Ocupație</label>
                    <input
                      type="text"
                      value={scriitorForm.info?.ocupatie || ''}
                      onChange={(e) => setScriitorForm({
                        ...scriitorForm,
                        info: { ...(scriitorForm.info || {}), ocupatie: e.target.value }
                      })}
                      placeholder="Poet, prozator, jurnalist"
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Studii</label>
                    <input
                      type="text"
                      value={scriitorForm.info?.studii || ''}
                      onChange={(e) => setScriitorForm({
                        ...scriitorForm,
                        info: { ...(scriitorForm.info || {}), studii: e.target.value }
                      })}
                      placeholder="Studii la Viena și Berlin"
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Activitate</label>
                    <input
                      type="text"
                      value={scriitorForm.info?.activitate || ''}
                      onChange={(e) => setScriitorForm({
                        ...scriitorForm,
                        info: { ...(scriitorForm.info || {}), activitate: e.target.value }
                      })}
                      placeholder="Redactor la Curierul de Iași"
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Loc naștere</label>
                    <input
                      type="text"
                      value={scriitorForm.info?.locNastere || ''}
                      onChange={(e) => setScriitorForm({
                        ...scriitorForm,
                        info: { ...(scriitorForm.info || {}), locNastere: e.target.value }
                      })}
                      placeholder="Născut în Ipotești, Botoșani"
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Perioada</label>
                    <input
                      type="text"
                      value={scriitorForm.info?.perioada || ''}
                      onChange={(e) => setScriitorForm({
                        ...scriitorForm,
                        info: { ...(scriitorForm.info || {}), perioada: e.target.value }
                      })}
                      placeholder="1850-1889"
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Opere</label>
                    <input
                      type="text"
                      value={scriitorForm.info?.opere || ''}
                      onChange={(e) => setScriitorForm({
                        ...scriitorForm,
                        info: { ...(scriitorForm.info || {}), opere: e.target.value }
                      })}
                      placeholder="Luceafărul, Scrisori, Poezii"
                      className="admin-input"
                    />
                  </div>
                </div>
              </div>

              {/* Opere structurate */}
              <div className="admin-form-group">
                <label style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', display: 'block' }}>
                  Opere structurate (pentru pagina Opere)
                </label>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Opere (JSON format)</label>
                  <textarea
                    value={scriitorForm.opereJsonText !== '' ? scriitorForm.opereJsonText : JSON.stringify(scriitorForm.opere || {}, null, 2)}
                    onChange={(e) => {
                      const textValue = e.target.value;
                      // Păstrează textul în state temporar pentru editare continuă
                      setScriitorForm({ ...scriitorForm, opereJsonText: textValue });
                      
                      // Încearcă să parseze JSON-ul
                      try {
                        if (textValue.trim() === '') {
                          setScriitorForm({ ...scriitorForm, opere: {}, opereJsonText: '' });
                        } else {
                          const parsed = JSON.parse(textValue);
                          setScriitorForm({ ...scriitorForm, opere: parsed, opereJsonText: '' });
                        }
                      } catch (err) {
                        // JSON invalid - păstrează doar textul pentru editare continuă
                        // Nu actualiza opere până când JSON-ul devine valid
                      }
                    }}
                    onBlur={(e) => {
                      // La blur, încearcă să parseze JSON-ul final
                      const textValue = e.target.value.trim();
                      if (textValue === '') {
                        setScriitorForm({ ...scriitorForm, opere: {}, opereJsonText: '' });
                      } else {
                        try {
                          const parsed = JSON.parse(textValue);
                          setScriitorForm({ ...scriitorForm, opere: parsed, opereJsonText: '' });
                        } catch (err) {
                          // JSON invalid - păstrează textul pentru a permite corectarea
                          // Utilizatorul va vedea eroarea și poate corecta
                        }
                      }
                    }}
                    placeholder='{\n  "opere de BAC": ["Luceafărul", "Scrisoarea I"],\n  "poezii": ["Luceafărul", "Scrisoarea I"],\n  "proza": ["Geniu pustiu"]\n}'
                    rows={10}
                    className="admin-textarea"
                    style={{ fontFamily: 'monospace', fontSize: '12px' }}
                  />
                  <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    Format JSON: {"{"} "categorie": ["opera1", "opera2"] {"}"}
                  </p>
                </div>
              </div>

              {/* Prezentare */}
              <div className="admin-form-group">
                <label style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', display: 'block' }}>
                  Prezentare (scurtă cu emoji-uri)
                </label>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Titlu</label>
                  <input
                    type="text"
                    value={scriitorForm.prezentare?.titlu || ''}
                    onChange={(e) => setScriitorForm({
                      ...scriitorForm,
                      prezentare: { ...(scriitorForm.prezentare || {}), titlu: e.target.value }
                    })}
                    placeholder="Titlul prezentării"
                    className="admin-input"
                    autoComplete="off"
                  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Paragrafe (câte unul pe linie, cu emoji-uri)</label>
                  <textarea
                    value={(scriitorForm.prezentare?.paragrafe || []).join('\n')}
                    onChange={(e) => setScriitorForm({
                      ...scriitorForm,
                      prezentare: {
                        ...(scriitorForm.prezentare || {}),
                        paragrafe: e.target.value.split('\n').filter(p => p.trim())
                      }
                    })}
                    placeholder="📚 Poet, prozator, jurnalist&#10;🎓 Studii la Viena și Berlin&#10;📰 Redactor la Curierul de Iași"
                    rows={5}
                    className="admin-textarea"
                  />
                </div>
              </div>

              {/* Biografie (Info mare) */}
              <div className="admin-form-group">
                <label htmlFor="scriitor-biografie" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', display: 'block' }}>
                  Biografie (Info mare - pentru "Citește tot")
                </label>
                <textarea
                  id="scriitor-biografie"
                  value={scriitorForm.biografie || ''}
                  onChange={(e) => setScriitorForm({ ...scriitorForm, biografie: e.target.value })}
                  placeholder="Textul complet al biografiei scriitorului..."
                  rows={10}
                  className="admin-textarea"
                />
              </div>

              {/* Prieteni */}
              <div className="admin-form-group">
                <label style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', display: 'block' }}>
                  Prieteni
                </label>
                {(scriitorForm.friends || []).map((friendKey, idx) => {
                  const friend = allScriitoriForSearch.find(s => s.key === friendKey);
                  return friend ? (
                    <div key={idx} style={{ marginBottom: '15px', padding: '15px', backgroundColor: darkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', borderRadius: '8px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <img src={friend.img || ''} alt={friend.nume} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div style={{ flex: 1, fontWeight: 'bold' }}>{friend.nume}</div>
                      <button type="button" onClick={() => { const newFriends = [...(scriitorForm.friends || [])]; newFriends.splice(idx, 1); setScriitorForm({ ...scriitorForm, friends: newFriends }); }} style={{ padding: '5px 10px', fontSize: '12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Șterge
                      </button>
                    </div>
                  ) : null;
                })}
                <div style={{ padding: '15px', backgroundColor: darkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', borderRadius: '8px', marginTop: '10px' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Adaugă prieten</label>
                    {scriitorForm.newFriendName && (
                      <div style={{ marginBottom: '8px', padding: '8px', backgroundColor: darkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src={allScriitoriForSearch.find(s => s.key === scriitorForm.newFriendKey)?.img || ''} alt={scriitorForm.newFriendName} style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
                        <span style={{ fontWeight: 'bold' }}>{scriitorForm.newFriendName}</span>
                        <button type="button" onClick={() => setScriitorForm({ ...scriitorForm, newFriendKey: '', newFriendName: '' })} style={{ marginLeft: 'auto', padding: '4px 8px', fontSize: '12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                          ×
                        </button>
                      </div>
                    )}
                    {!scriitorForm.newFriendName && (
                      <div style={{ position: 'relative' }}>
                        <AvatarSearchBar onSelect={(scriitor) => { setScriitorForm({ ...scriitorForm, newFriendKey: scriitor.key, newFriendName: scriitor.nume, }); }} />
                      </div>
                    )}
                  </div>
                  <button type="button" onClick={() => { if (scriitorForm.newFriendKey && !(scriitorForm.friends || []).includes(scriitorForm.newFriendKey)) { setScriitorForm({ ...scriitorForm, friends: [...(scriitorForm.friends || []), scriitorForm.newFriendKey], newFriendKey: '', newFriendName: '', }); } }} disabled={!scriitorForm.newFriendKey || (scriitorForm.friends || []).includes(scriitorForm.newFriendKey)} style={{ padding: '8px 16px', fontSize: '14px', backgroundColor: (scriitorForm.newFriendKey && !(scriitorForm.friends || []).includes(scriitorForm.newFriendKey)) ? (darkTheme ? '#a97c50' : '#ffd591') : '#ccc', color: darkTheme ? '#fff' : '#4e2e1e', border: 'none', borderRadius: '6px', cursor: (scriitorForm.newFriendKey && !(scriitorForm.friends || []).includes(scriitorForm.newFriendKey)) ? 'pointer' : 'not-allowed', }}>
                    Adaugă prieten
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="admin-submit-button">
                {loading ? (isEditingScriitor ? 'Se actualizează...' : 'Se adaugă...') : (isEditingScriitor ? 'Actualizează Scriitor' : 'Adaugă Scriitor')}
              </button>
            </form>
          )}

          {scriitorView === 'posts' && selectedScriitor && (
            <div>
              <div className="admin-posts-header">
                <h2 className="admin-posts-title">Postări - {selectedScriitor.nume}</h2>
                <div className="admin-posts-actions">
                  <button 
                    onClick={() => {
                      setPostForm({
                        id: '',
                        date: '',
                        author: selectedScriitor.nume,
                        text: '',
                        descriere: '',
                        image: '',
                        pin: false,
                        isPoem: false,
                        isStory: false,
                        poemTitle: '',
                        poemText: '',
                        poemImages: [],
                        poemImagesOnLeft: true,
                        storyTitle: '',
                        storyText: '',
                        storyImageOnLeft: true,
                    showReadAllButton: false,
                    readAllButtonText: '',
                    readAllButtonLink: '',
                    readMoreText: '',
                        pinnedActions: [],
                        reactions: [],
                        comments: [],
                        newCommentAuthor: '',
                        newCommentKey: '',
                        newCommentText: '',
                        newReactionFriendKey: '',
                        newReactionFriendName: '',
                        newReactionType: '',
                      });
                      setAiPostPrompt('');
                      setAiCommentPrompt('');
                      setScriitorView('post-add');
                      const currentFrom = searchParams.get('from');
                      updateUrlParams({ action: 'add-post', scriitor: selectedScriitor.key || selectedScriitor.id, postId: null, commentIndex: null, from: currentFrom || 'posts' });
                    }}
                    className="admin-add-post-button"
                  >
                    <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>+</span>
                    Adaugă Postare
                  </button>
                  <button 
                    onClick={() => {
                      const fromParam = searchParams.get('from');
                      if (fromParam === 'scriitor' && selectedScriitor) {
                        // Navighează înapoi la pagina scriitorului
                        navigate(`/scriitor?name=${selectedScriitor.key || selectedScriitor.id}`);
                      } else {
                        // Navighează înapoi la lista de scriitori din admin
                        setScriitorView('list');
                        updateUrlParams({ view: 'list', scriitor: null, action: null, postId: null, commentIndex: null, from: null });
                        setSelectedScriitor(null);
                      }
                    }}
                    className="admin-back-button"
                  >
                    Înapoi
                  </button>
                </div>
              </div>
              <div className="admin-posts-list">
                {(!selectedScriitor.posts || selectedScriitor.posts.length === 0) ? (
                  <div className="admin-posts-empty">
                    <p>Nu există postări pentru acest scriitor.</p>
                  </div>
                ) : (
                  selectedScriitor.posts?.map(post => {
                    const postOwnerId = post.createdBy || selectedScriitor.createdBy;
                    const canManagePost = canEditResource(postOwnerId);
                    return (
                    <div key={post.id} className="admin-post-card">
                      <div className="admin-post-content">
                        <div className="admin-post-header">
                          <h4 className="admin-post-date">
                            {post.date} {post.pin && <span className="admin-post-pin">📌</span>}
                          </h4>
                        </div>
                        {post.isPoem && post.descriere && (
                          <p className="admin-post-text">{post.descriere}</p>
                        )}
                        {!post.isPoem && post.text && (
                          <p className="admin-post-text">{post.text}</p>
                        )}
                        {post.isPoem && post.poemImages && post.poemImages.length > 0 ? (
                          <div className="admin-post-image-container" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {post.poemImages.map((img, idx) => (
                              <img 
                                key={idx}
                                src={img} 
                                alt={`Poezie ${idx + 1}`} 
                                className="admin-post-image" 
                                style={{ maxWidth: '150px', maxHeight: '300px', objectFit: 'contain' }}
                                onError={(e) => { e.target.style.display = 'none'; }} 
                              />
                            ))}
                          </div>
                        ) : post.image && (
                          <div className="admin-post-image-container">
                            <img src={post.image} alt="post" className="admin-post-image" onError={(e) => { e.target.style.display = 'none'; }} />
                          </div>
                        )}
                        {post.isPoem && (
                          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: darkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', borderRadius: '6px' }}>
                            <strong>Poezie:</strong> {post.poemTitle || 'Fără titlu'}
                            {post.poemText && (
                              <>
                                <div style={{ marginTop: '10px' }}>
                                  <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '5px', color: darkTheme ? '#d4a574' : '#8b6b42' }}>
                                    Poezia preview
                                  </div>
                                  <div style={{ fontSize: '12px', color: darkTheme ? '#ccc' : '#666', maxHeight: '100px', overflow: 'hidden', whiteSpace: 'pre-wrap' }}>
                                    {post.poemText.substring(0, 150)}...
                                  </div>
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                  <button
                                    onClick={() => {
                                      setExpandedPoems(prev => {
                                        const newSet = new Set(prev);
                                        if (newSet.has(post.id)) {
                                          newSet.delete(post.id);
                                        } else {
                                          newSet.add(post.id);
                                        }
                                        return newSet;
                                      });
                                    }}
                                    style={{
                                      background: 'transparent',
                                      border: `1px solid ${darkTheme ? '#d4a574' : '#8b6b42'}`,
                                      color: darkTheme ? '#d4a574' : '#8b6b42',
                                      padding: '4px 12px',
                                      borderRadius: '4px',
                                      cursor: 'pointer',
                                      fontSize: '12px',
                                      fontWeight: '500'
                                    }}
                                  >
                                    {expandedPoems.has(post.id) ? 'Ascunde' : 'Vezi tot'}
                                  </button>
                                </div>
                                {expandedPoems.has(post.id) && (
                                  <div style={{ marginTop: '10px' }}>
                                    <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '5px', color: darkTheme ? '#d4a574' : '#8b6b42' }}>
                                      Poezia full
                                    </div>
                                    <div style={{ fontSize: '12px', color: darkTheme ? '#ccc' : '#666', whiteSpace: 'pre-wrap' }}>
                                      {post.poemText}
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        )}
                        <div className="admin-post-stats">
                          <span>Reacții: {post.reactions?.length || 0}</span>
                          <span>Comentarii: {post.comments?.length || 0}</span>
                        </div>
                      </div>
                      <div className="admin-post-actions">
                        {canManagePost && (
                          <>
                            <button 
                              onClick={() => {
                                setPostForm({
                                  id: post.id,
                                  date: post.date || '',
                                  author: post.author || selectedScriitor.nume,
                                  text: post.text || '',
                                  descriere: post.descriere || '',
                                  image: post.image || '',
                                  pin: post.pin || false,
                                  isPoem: post.isPoem || false,
                                  isStory: post.isStory || false,
                                  poemTitle: post.poemTitle || '',
                                  poemText: post.poemText || '',
                                  poemPreview: post.poemPreview || '',
                                  poemImages: post.poemImages || [],
                                  poemImagesOnLeft: post.poemImagesOnLeft !== undefined ? post.poemImagesOnLeft : true,
                                  storyTitle: post.storyTitle || '',
                                  storyText: post.storyText || '',
                                  storyImageOnLeft: post.storyImageOnLeft !== undefined ? post.storyImageOnLeft : true,
                                  showReadAllButton: post.showReadAllButton || false,
                                  readAllButtonText: post.readAllButtonText || '',
                                  readAllButtonLink: post.readAllButtonLink || '',
                                  readMoreText: post.readMoreText || '',
                                  pinnedActions: post.pinnedActions || [],
                                  reactions: post.reactions || [],
                                  comments: post.comments || [],
                                  newCommentAuthor: '',
                                  newCommentKey: '',
                                  newCommentText: '',
                                  newReactionFriendKey: '',
                                  newReactionFriendName: '',
                                  newReactionType: '',
                                });
                              setAiPostPrompt('');
                              setAiCommentPrompt('');
                                setScriitorView('post-edit');
                                const currentFrom = searchParams.get('from');
                                updateUrlParams({ action: 'edit-post', scriitor: selectedScriitor.key || selectedScriitor.id, postId: post.id, commentIndex: null, from: currentFrom || 'posts' });
                              }}
                              className="admin-post-edit-button"
                            >
                              Editează
                            </button>
                            {isAdminUser && (
                              <button 
                                onClick={() => handleDeletePost(post.id)}
                                className="admin-post-delete-button"
                              >
                                Șterge
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  );
                  })
                )}
              </div>
            </div>
          )}

          {(scriitorView === 'post-add' || scriitorView === 'post-edit') && selectedScriitor && (
            <form onSubmit={handlePostSubmit} className="admin-form">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
                  {scriitorView === 'post-edit' ? 'Editează Postare' : 'Adaugă Postare Nouă'} - {selectedScriitor.nume}
                </h1>
                <button 
                  type="button"
                  onClick={() => {
                    const fromParam = searchParams.get('from');
                    if (fromParam === 'scriitor' && selectedScriitor) {
                      // Navighează înapoi la pagina scriitorului
                      navigate(`/scriitor?name=${selectedScriitor.key || selectedScriitor.id}`);
                    } else if (fromParam === 'posts' || fromParam === 'admin') {
                      // Navighează înapoi la pagina de postări
                      setScriitorView('posts');
                      updateUrlParams({ view: 'posts', scriitor: selectedScriitor.key || selectedScriitor.id, action: null, postId: null, commentIndex: null, from: fromParam });
                    } else {
                      // Fallback: navighează înapoi la lista de scriitori
                      setScriitorView('list');
                      updateUrlParams({ view: 'list', scriitor: null, action: null, postId: null, commentIndex: null, from: null });
                      setSelectedScriitor(null);
                    }
                  }}
                  className="admin-back-button"
                >
                  Înapoi
                </button>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label htmlFor="post-date">Dată *</label>
                  <input
                    type="text"
                    id="post-date"
                    value={postForm.date}
                    onChange={(e) => setPostForm({ ...postForm, date: e.target.value })}
                    placeholder="15 ianuarie 1883"
                    required
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="post-author">Autor</label>
                  <input
                    type="text"
                    id="post-author"
                    value={postForm.author}
                    onChange={(e) => setPostForm({ ...postForm, author: e.target.value })}
                    placeholder={selectedScriitor.nume}
                    className="admin-input"
                  />
                </div>
              </div>

              {/* Brief pentru descriere - apare întotdeauna */}
              <div className="admin-form-group">
                <label htmlFor="descriere-ai-brief">Despre ce să scrie AI-ul pentru descriere (brief scurt)</label>
                <textarea
                  id="descriere-ai-brief"
                  value={aiPostPrompt}
                  onChange={(e) => setAiPostPrompt(e.target.value)}
                  placeholder={postForm.isPoem ? "Ex.: să descrie tema poeziei, să evidențieze un aspect specific, să comenteze stilul..." : "Ex.: să descrie conținutul postării, să evidențieze un aspect specific..."}
                  rows={2}
                  className="admin-textarea"
                  style={{ marginBottom: '10px' }}
                />
                <small style={{ color: darkTheme ? '#c3b7a4' : '#666', display: 'block', marginBottom: '10px' }}>
                  {postForm.isPoem 
                    ? "Scrie 1-2 idei despre ce aspecte să acopere descrierea; AI-ul va folosi și textul poeziei."
                    : "Scrie 1-2 idei despre ce aspecte să acopere descrierea; AI-ul va folosi și textul postării."}
                </small>
              </div>

              {/* Descriere - apare întotdeauna */}
              <div className="admin-form-group">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                  <label htmlFor="post-descriere" style={{ marginBottom: 0 }}>Descriere</label>
                  <AIPostGenerator
                    prompt={aiPostPrompt}
                    poemText={postForm.isPoem ? postForm.poemText : null}
                    text={!postForm.isPoem && !postForm.isStory ? postForm.text : null}
                    descriere={postForm.descriere || null}
                    onTextGenerated={(generatedText) => setPostForm((prev) => ({ ...prev, descriere: generatedText }))}
                    scriitor={selectedScriitor}
                    setMessage={setMessage}
                    darkTheme={darkTheme}
                    skipBrief={true}
                  />
                </div>
                <textarea
                  id="post-descriere"
                  value={postForm.descriere}
                  onChange={(e) => setPostForm({ ...postForm, descriere: e.target.value })}
                  placeholder={postForm.isPoem ? "Descrierea poeziei..." : "Descrierea postării..."}
                  rows={3}
                  className="admin-textarea"
                />
                <small style={{ color: darkTheme ? '#c3b7a4' : '#666' }}>
                  {postForm.isPoem 
                    ? (isGeneratingDescription 
                        ? '⏳ Se generează descrierea automat...' 
                        : isGeneratingReactions
                        ? '⏳ Se generează reacțiile și comentariile automat...'
                        : 'Descrierea, reacțiile și comentariile se generează automat când introduci textul poeziei. Poți completa manual sau apasă cubul pentru a regenera.')
                    : (postForm.isStory
                        ? (isGeneratingDescription 
                            ? '⏳ Se generează descrierea automat...' 
                            : isGeneratingReactions
                            ? '⏳ Se generează reacțiile și comentariile automat...'
                            : 'Descrierea, reacțiile și comentariile se generează automat când introduci textul poveștii. Poți completa manual sau apasă cubul pentru a regenera.')
                        : (isGeneratingDescription 
                            ? '⏳ Se generează descrierea automat...' 
                            : isGeneratingReactions
                            ? '⏳ Se generează reacțiile și comentariile automat...'
                            : 'Descrierea, reacțiile și comentariile se generează automat când introduci textul postării. Poți completa manual sau apasă cubul pentru a regenera.'))}
                </small>
              </div>

              {/* Checkbox Poezie - după descriere */}
              <div className="admin-form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={postForm.isPoem}
                    onChange={(e) => {
                      const isPoem = e.target.checked;
                      setPostForm({ 
                        ...postForm, 
                        isPoem,
                        // Dacă se schimbă la poezie, resetează câmpurile normale
                        image: isPoem ? '' : postForm.image,
                        poemImages: isPoem ? (postForm.poemImages || []) : [],
                        poemImagesOnLeft: isPoem ? (postForm.poemImagesOnLeft !== undefined ? postForm.poemImagesOnLeft : true) : true,
                        poemTitle: isPoem ? postForm.poemTitle : '',
                        poemText: isPoem ? postForm.poemText : '',
                        poemPreview: isPoem ? postForm.poemPreview : '',
                      });
                    }}
                    style={{ marginRight: '5px' }}
                  />
                  Poezie (imagine verticală cu text în dreapta)
                </label>
              </div>

              {/* Tip special de postare: Poveste / text cu card ca în pagina scriitorului */}
              {!postForm.isPoem && (
                <div className="admin-form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={postForm.isStory}
                      onChange={(e) => {
                        const isStory = e.target.checked;
                        setPostForm({
                          ...postForm,
                          isStory,
                          // Dacă devine poveste, mutăm textul curent în storyText (dacă nu e deja setat)
                          storyText: isStory ? (postForm.storyText || postForm.text) : postForm.storyText,
                          storyTitle: isStory ? (postForm.storyTitle || selectedScriitor.nume) : postForm.storyTitle,
                        });
                      }}
                      style={{ marginRight: '5px' }}
                    />
                    Poveste / text cu imagine pe lateral (tip „Amintiri din copilărie”)
                  </label>
                </div>
              )}

              {!postForm.isPoem ? (
                <>
                  {/* Text principal: în funcție de tipul de postare */}
                  <div className="admin-form-group">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                      <label htmlFor="post-text" style={{ marginBottom: 0 }}>
                        {postForm.isStory ? 'Text poveste *' : 'Text *'}
                      </label>
                      <AIPostGenerator
                        prompt={aiPostPrompt}
                        onTextGenerated={(generatedText) =>
                          setPostForm((prev) => ({
                            ...prev,
                            ...(prev.isStory ? { storyText: generatedText } : { text: generatedText }),
                          }))
                        }
                        scriitor={selectedScriitor}
                        setMessage={setMessage}
                        darkTheme={darkTheme}
                      />
                    </div>
                    <textarea
                      id="post-text"
                      value={postForm.isStory ? (postForm.storyText || '') : (postForm.text || '')}
                      onChange={(e) =>
                        setPostForm({
                          ...postForm,
                          ...(postForm.isStory ? { storyText: e.target.value } : { text: e.target.value }),
                        })
                      }
                      placeholder={postForm.isStory ? 'Textul poveștii / fragmentului de proză...' : 'Textul postării...'}
                      required
                      rows={5}
                      className="admin-textarea"
                    />
                    <small style={{ color: darkTheme ? '#c3b7a4' : '#666' }}>
                      Poți completa manual sau apasă cubul pentru a genera automat textul.
                    </small>
                  </div>

                  {/* Câmpuri suplimentare pentru poveste: titlu operă + text buton „Vezi mai mult” */}
                  {postForm.isStory && (
                    <>
                      <div className="admin-form-group">
                        <label htmlFor="story-title">Titlu operă / poveste</label>
                        <input
                          type="text"
                          id="story-title"
                          value={postForm.storyTitle || ''}
                          onChange={(e) =>
                            setPostForm({
                              ...postForm,
                              storyTitle: e.target.value,
                            })
                          }
                          placeholder="Amintiri din copilărie"
                          className="admin-input"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label htmlFor="story-more-text">Continuarea textului (se afișează doar în popup „Vezi mai mult”)</label>
                        <textarea
                          id="story-more-text"
                          value={postForm.storyMoreText || ''}
                          onChange={(e) =>
                            setPostForm({
                              ...postForm,
                              storyMoreText: e.target.value,
                            })
                          }
                          placeholder="Continuarea poveștii, paragrafe suplimentare care apar doar în fereastra mare..."
                          rows={5}
                          className="admin-textarea"
                        />
                      </div>
                    </>
                  )}

                  <div className="admin-form-row">
                    <div className="admin-form-group" style={{ flex: 1 }}>
                      <label htmlFor="post-image">
                        {postForm.isStory ? 'Imagine (verticală, ca la ilustrațiile de poveste)' : 'Imagine (dreptunghiulară)'}
                      </label>
                      {postForm.image ? (
                        <div style={{ marginBottom: '10px' }}>
                          <img 
                            src={postForm.image} 
                            alt="Preview" 
                            style={{ 
                              maxWidth: '100%', 
                              maxHeight: '200px', 
                              borderRadius: '8px',
                              border: '1px solid #ddd',
                              objectFit: 'cover'
                            }} 
                          />
                          <button
                            type="button"
                            onClick={() => setPostForm({ ...postForm, image: '' })}
                            style={{
                              marginTop: '8px',
                              padding: '6px 12px',
                              fontSize: '12px',
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                            }}
                          >
                            Șterge imagine
                          </button>
                        </div>
                      ) : null}
                      <input
                        type="file"
                        id="post-image-file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            handleImageUpload(e.target.files[0], 'post');
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                      <label
                        htmlFor="post-image-file"
                        style={{
                          display: 'inline-block',
                          padding: '10px 20px',
                          backgroundColor: darkTheme ? '#a97c50' : '#ffd591',
                          color: darkTheme ? '#fff' : '#4e2e1e',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: 500,
                          textAlign: 'center',
                        }}
                      >
                        {postForm.image ? 'Schimbă imaginea' : 'Selectează imagine'}
                      </label>
                      <input
                        type="text"
                        value={postForm.image}
                        onChange={(e) => setPostForm({ ...postForm, image: e.target.value })}
                        placeholder="Sau introdu URL-ul imaginii"
                        className="admin-input"
                        style={{ marginTop: '10px' }}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={postForm.pin}
                          onChange={(e) => setPostForm({ ...postForm, pin: e.target.checked })}
                          style={{ marginRight: '5px' }}
                        />
                        Pin (fixează postarea)
                      </label>
                    </div>
                  </div>

                  {/* Opțiune poziție imagine pentru povești */}
                  {postForm.isStory && (
                    <div className="admin-form-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={postForm.storyImageOnLeft !== false}
                          onChange={(e) => {
                            setPostForm({ 
                              ...postForm, 
                              storyImageOnLeft: e.target.checked 
                            });
                          }}
                          style={{ marginRight: '5px' }}
                        />
                        Imagine pe stânga (debifat = imagine pe dreapta)
                      </label>
                    </div>
                  )}

                  {/* Opțiuni „Citește tot” pentru povești / texte mai lungi (doar link, textul rămâne „Citește tot”) */}
                  {postForm.isStory && (
                    <div className="admin-form-group">
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                        Opțiuni „Citește tot” (deschide cartea în BookReader)
                      </label>
                      <div style={{ marginBottom: '10px' }}>
                        <label>
                          <input
                            type="checkbox"
                            checked={postForm.showReadAllButton}
                            onChange={(e) =>
                              setPostForm({
                                ...postForm,
                                showReadAllButton: e.target.checked,
                              })
                            }
                            style={{ marginRight: '5px' }}
                          />
                          Afișează butonul „Citește tot”
                        </label>
                      </div>
                      {postForm.showReadAllButton && (
                        <div className="admin-form-group">
                            <label htmlFor="readall-link">Link către pagina cărții (BookReader) *</label>
                            <input
                              type="text"
                              id="readall-link"
                              value={postForm.readAllButtonLink || ''}
                              onChange={(e) =>
                                setPostForm({ ...postForm, readAllButtonLink: e.target.value })
                              }
                              placeholder="/carte/amintiri-din-copilarie"
                              className="admin-input"
                              required
                            />
                            <small style={{ color: darkTheme ? '#c3b7a4' : '#666' }}>
                              Acesta este link-ul care se deschide când utilizatorul apasă „Citește tot”
                              (de exemplu `/carte/amintiri-din-copilarie`).
                            </small>
                          </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="admin-form-group">
                    <label htmlFor="poem-preview">Poezia preview</label>
                    <textarea
                      id="poem-preview"
                      value={postForm.poemPreview}
                      onChange={(e) => setPostForm({ ...postForm, poemPreview: e.target.value })}
                      placeholder="Introdu textul pentru preview (primele linii ale poeziei)..."
                      rows={5}
                      className="admin-textarea"
                      style={{ fontFamily: 'monospace', fontSize: '14px' }}
                    />
                    <small style={{ color: darkTheme ? '#c3b7a4' : '#666' }}>
                      Introdu manual textul pentru preview. Acesta va fi afișat înainte de butonul "Vezi tot".
                    </small>
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="poem-text">Text poezie *</label>
                    <textarea
                      id="poem-text"
                      value={postForm.poemText}
                      onChange={(e) => setPostForm({ ...postForm, poemText: e.target.value })}
                      placeholder="Vreme trece, vreme vine..."
                      required
                      rows={15}
                      className="admin-textarea"
                      style={{ fontFamily: 'monospace', fontSize: '14px' }}
                    />
                    <small style={{ color: darkTheme ? '#c3b7a4' : '#666' }}>
                      Introdu textul complet al poeziei manual.
                    </small>
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="poem-title">Titlu poezie *</label>
                    <input
                      type="text"
                      id="poem-title"
                      value={postForm.poemTitle}
                      onChange={(e) => setPostForm({ ...postForm, poemTitle: e.target.value })}
                      placeholder="Glossă"
                      required
                      className="admin-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Imagini poezie (verticale, maxim 2) *</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      {(postForm.poemImages || []).map((img, idx) => (
                        <div key={idx} style={{ 
                          border: '1px solid #ddd', 
                          borderRadius: '8px', 
                          padding: '15px',
                          backgroundColor: darkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                        }}>
                          <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                            <img 
                              src={img} 
                              alt={`Poezie ${idx + 1}`}
                              style={{ 
                                maxWidth: '200px', 
                                maxHeight: '400px', 
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                objectFit: 'contain'
                              }} 
                            />
                            <div style={{ flex: 1 }}>
                              <input
                                type="text"
                                value={img}
                                onChange={(e) => {
                                  const newImages = [...(postForm.poemImages || [])];
                                  newImages[idx] = e.target.value;
                                  setPostForm({ ...postForm, poemImages: newImages });
                                }}
                                placeholder="URL imagine"
                                className="admin-input"
                                style={{ marginBottom: '10px' }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newImages = postForm.poemImages.filter((_, i) => i !== idx);
                                  setPostForm({ ...postForm, poemImages: newImages });
                                }}
                                style={{
                                  padding: '6px 12px',
                                  fontSize: '12px',
                                  backgroundColor: '#dc3545',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                }}
                              >
                                Șterge imagine
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {(postForm.poemImages || []).length < 2 && (
                        <div style={{ border: '1px dashed #ddd', borderRadius: '8px', padding: '15px' }}>
                          <input
                            type="file"
                            id={`poem-image-file-${(postForm.poemImages || []).length}`}
                            accept="image/*"
                            onChange={async (e) => {
                              if (e.target.files[0]) {
                                try {
                                  setLoading(true);
                                  const url = await uploadImageToCloudinary(e.target.files[0], 'scriitori');
                                  setPostForm({ 
                                    ...postForm, 
                                    poemImages: [...(postForm.poemImages || []), url] 
                                  });
                                  setMessage({ type: 'success', text: 'Imagine încărcată cu succes!' });
                                } catch (error) {
                                  console.error('Error uploading image:', error);
                                  // Show the full error message to help with debugging
                                  const errorMessage = error.message || 'Eroare la încărcarea imaginii';
                                  setMessage({ type: 'error', text: errorMessage });
                                } finally {
                                  setLoading(false);
                                }
                              }
                            }}
                            style={{ display: 'none' }}
                          />
                          <label
                            htmlFor={`poem-image-file-${(postForm.poemImages || []).length}`}
                            style={{
                              display: 'inline-block',
                              padding: '10px 20px',
                              backgroundColor: darkTheme ? '#a97c50' : '#ffd591',
                              color: darkTheme ? '#fff' : '#4e2e1e',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              fontWeight: 500,
                              textAlign: 'center',
                              marginRight: '10px',
                            }}
                          >
                            Adaugă imagine {(postForm.poemImages || []).length + 1}
                          </label>
                          <input
                            type="text"
                            value=""
                            onChange={(e) => {
                              if (e.target.value.trim()) {
                                setPostForm({ 
                                  ...postForm, 
                                  poemImages: [...(postForm.poemImages || []), e.target.value.trim()] 
                                });
                                e.target.value = '';
                              }
                            }}
                            placeholder="Sau introdu URL-ul imaginii"
                            className="admin-input"
                            style={{ display: 'inline-block', width: 'auto', minWidth: '300px' }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && e.target.value.trim()) {
                                setPostForm({ 
                                  ...postForm, 
                                  poemImages: [...(postForm.poemImages || []), e.target.value.trim()] 
                                });
                                e.target.value = '';
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={postForm.poemImagesOnLeft !== false}
                        onChange={(e) => {
                          setPostForm({ 
                            ...postForm, 
                            poemImagesOnLeft: e.target.checked 
                          });
                        }}
                        style={{ marginRight: '5px' }}
                      />
                      Imagini pe stânga (debifat = imagini pe dreapta)
                    </label>
                  </div>

                  <div className="admin-form-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={postForm.pin}
                        onChange={(e) => setPostForm({ ...postForm, pin: e.target.checked })}
                        style={{ marginRight: '5px' }}
                      />
                      Pin (fixează postarea)
                    </label>
                  </div>
                </>
              )}

              {/* Comentarii */}
              <div className="admin-form-group">
                <label style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', display: 'block' }}>
                  Comentarii
                </label>
                {(postForm.comments || []).map((comment, idx) => {
                  const commentIndexParam = searchParams.get('commentIndex');
                  const isEditingComment = commentIndexParam !== null && parseInt(commentIndexParam) === idx;
                  return (
                  <div 
                    key={idx} 
                    ref={isEditingComment ? editingCommentRef : null}
                    style={{ 
                      marginBottom: '15px', 
                      padding: '15px', 
                      backgroundColor: isEditingComment 
                        ? (darkTheme ? 'rgba(169, 124, 80, 0.3)' : 'rgba(255, 213, 145, 0.4)')
                        : (darkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'),
                      borderRadius: '8px',
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                      border: isEditingComment ? `2px solid ${darkTheme ? '#a97c50' : '#ffd591'}` : 'none',
                      transition: 'all 0.3s ease'
                    }}>
                    <img 
                      src={allScriitoriForSearch.find(s => s.key === comment.key)?.img || ''} 
                      alt={comment.author}
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{comment.author}</div>
                      {isEditingComment ? (
                        <div style={{ marginTop: '10px' }}>
                          <textarea
                            value={postForm.editingCommentText || comment.text}
                            onChange={(e) => setPostForm({ ...postForm, editingCommentText: e.target.value })}
                            placeholder="Textul comentariului..."
                            rows={3}
                            className="admin-textarea"
                            style={{ width: '100%', marginBottom: '10px' }}
                          />
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                              type="button"
                              onClick={() => {
                                const newComments = [...(postForm.comments || [])];
                                newComments[idx] = {
                                  ...newComments[idx],
                                  text: postForm.editingCommentText || comment.text,
                                };
                                setPostForm({ 
                                  ...postForm, 
                                  comments: newComments,
                                  editingCommentText: '',
                                });
                                updateUrlParams({ 
                                  view: 'post-edit', 
                                  scriitor: selectedScriitor?.key || selectedScriitor?.id, 
                                  action: 'edit-post', 
                                  postId: postForm.id, 
                                  commentIndex: null 
                                });
                              }}
                              style={{
                                padding: '6px 12px',
                                fontSize: '12px',
                                backgroundColor: darkTheme ? '#a97c50' : '#ffd591',
                                color: darkTheme ? '#fff' : '#4e2e1e',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                              }}
                            >
                              Salvează
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setPostForm({ ...postForm, editingCommentText: '' });
                                updateUrlParams({ 
                                  view: 'post-edit', 
                                  scriitor: selectedScriitor?.key || selectedScriitor?.id, 
                                  action: 'edit-post', 
                                  postId: postForm.id, 
                                  commentIndex: null 
                                });
                              }}
                              style={{
                                padding: '6px 12px',
                                fontSize: '12px',
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                              }}
                            >
                              Anulează
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>{comment.text}</div>
                      )}
                    </div>
                    {!isEditingComment && (
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button
                          type="button"
                          onClick={() => {
                            setPostForm({ 
                              ...postForm, 
                              editingCommentText: comment.text 
                            });
                            updateUrlParams({ 
                              view: 'post-edit', 
                              scriitor: selectedScriitor?.key || selectedScriitor?.id, 
                              action: 'edit-post', 
                              postId: postForm.id, 
                              commentIndex: idx 
                            });
                          }}
                          style={{
                            padding: '5px 10px',
                            fontSize: '12px',
                            backgroundColor: darkTheme ? '#a97c50' : '#ffd591',
                            color: darkTheme ? '#fff' : '#4e2e1e',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                          }}
                        >
                          Editează
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const newComments = [...(postForm.comments || [])];
                            newComments.splice(idx, 1);
                            setPostForm({ ...postForm, comments: newComments });
                          }}
                          style={{
                            padding: '5px 10px',
                            fontSize: '12px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                          }}
                        >
                          Șterge
                        </button>
                      </div>
                    )}
                  </div>
                  );
                })}
                <div style={{ 
                  padding: '15px', 
                  backgroundColor: darkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  borderRadius: '8px',
                  marginTop: '10px'
                }}>
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Autor comentariu</label>
                    {postForm.newCommentAuthor && (
                      <div style={{ 
                        marginBottom: '8px', 
                        padding: '8px', 
                        backgroundColor: darkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <img 
                          src={allScriitoriForSearch.find(s => s.key === postForm.newCommentKey)?.img || ''} 
                          alt={postForm.newCommentAuthor}
                          style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <span style={{ fontWeight: 'bold' }}>{postForm.newCommentAuthor}</span>
                        <button
                          type="button"
                          onClick={() => setPostForm({ ...postForm, newCommentAuthor: '', newCommentKey: '' })}
                          style={{
                            marginLeft: 'auto',
                            padding: '4px 8px',
                            fontSize: '12px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                          }}
                        >
                          ×
                        </button>
                      </div>
                    )}
                    {!postForm.newCommentAuthor && (
                      <div style={{ position: 'relative' }}>
                        <AvatarSearchBar
                          onSelect={(scriitor) => {
                            const commentAuthor = scriitor.nume;
                            const commentKey = scriitor.key;
                            setPostForm({
                              ...postForm,
                              newCommentAuthor: commentAuthor,
                              newCommentKey: commentKey,
                            });
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Despre ce să scrie AI-ul (brief pentru comentariu)</label>
                    <textarea
                      value={aiCommentPrompt}
                      onChange={(e) => setAiCommentPrompt(e.target.value)}
                      placeholder="Ex.: să comenteze un aspect specific al poeziei, să facă o observație despre stil, să reacționeze la un vers anume..."
                      rows={2}
                      className="admin-textarea"
                      style={{ marginBottom: '10px' }}
                    />
                    <small style={{ color: darkTheme ? '#c3b7a4' : '#666', display: 'block', marginBottom: '10px' }}>
                      Scrie 1-2 idei despre ce aspecte să acopere comentariul; AI-ul va folosi și poezia/textul postării.
                    </small>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                      <label style={{ display: 'block', marginBottom: 0 }}>Text comentariu</label>
                      <AICommentGenerator
                        scriitor={selectedScriitor || { nume: postForm.author }}
                        descriere={postForm.descriere}
                        text={postForm.isPoem ? postForm.poemText : (postForm.isStory ? postForm.storyText : postForm.text)}
                        poemText={postForm.isPoem ? postForm.poemText : null}
                        reactions={postForm.reactions}
                        commentAuthor={postForm.newCommentAuthor}
                        prompt={aiCommentPrompt}
                        onTextGenerated={(generatedText) => setPostForm((prev) => ({ ...prev, newCommentText: generatedText }))}
                        setMessage={setMessage}
                        darkTheme={darkTheme}
                      />
                    </div>
                    <textarea
                      value={postForm.newCommentText || ''}
                      onChange={(e) => setPostForm({ ...postForm, newCommentText: e.target.value })}
                      placeholder="Textul comentariului..."
                      rows={3}
                      className="admin-textarea"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (postForm.newCommentAuthor && postForm.newCommentText) {
                        const newComment = {
                          key: postForm.newCommentKey,
                          author: postForm.newCommentAuthor,
                          text: postForm.newCommentText,
                          createdBy: currentUserId || '',
                          createdByEmail: userEmail,
                          createdByName: userDisplayName,
                        };
                        setPostForm({
                          ...postForm,
                          comments: [...(postForm.comments || []), newComment],
                          newCommentAuthor: '',
                          newCommentKey: '',
                          newCommentText: '',
                        });
                      }
                    }}
                    disabled={!postForm.newCommentAuthor || !postForm.newCommentText}
                    style={{
                      padding: '8px 16px',
                      fontSize: '14px',
                      backgroundColor: (postForm.newCommentAuthor && postForm.newCommentText) 
                        ? (darkTheme ? '#a97c50' : '#ffd591')
                        : '#ccc',
                      color: darkTheme ? '#fff' : '#4e2e1e',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: (postForm.newCommentAuthor && postForm.newCommentText) ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Adaugă comentariu
                  </button>
                </div>
              </div>

              {/* Reacții */}
              <div className="admin-form-group">
                <label style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', display: 'block' }}>
                  Reacții
                </label>
                {(postForm.reactions || []).map((reaction, idx) => (
                  <div key={idx} style={{ 
                    marginBottom: '15px', 
                    padding: '15px', 
                    backgroundColor: darkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    borderRadius: '8px',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center'
                  }}>
                    <img 
                      src={allScriitoriForSearch.find(s => s.key === reaction.friendKey)?.img || ''} 
                      alt=""
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        {allScriitoriForSearch.find(s => s.key === reaction.friendKey)?.nume || reaction.friendKey}
                      </div>
                      <div style={{ fontSize: '20px' }}>
                        {REACTIONS.find(r => r.type === reaction.reaction)?.emoji || '👍'} 
                        {' '}
                        {REACTIONS.find(r => r.type === reaction.reaction)?.label || reaction.reaction}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newReactions = [...(postForm.reactions || [])];
                        newReactions.splice(idx, 1);
                        setPostForm({ ...postForm, reactions: newReactions });
                      }}
                      style={{
                        padding: '5px 10px',
                        fontSize: '12px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Șterge
                    </button>
                  </div>
                ))}
                <div style={{ 
                  padding: '15px', 
                  backgroundColor: darkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  borderRadius: '8px',
                  marginTop: '10px'
                }}>
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Scriitor</label>
                    {postForm.newReactionFriendName && (
                      <div style={{ 
                        marginBottom: '8px', 
                        padding: '8px', 
                        backgroundColor: darkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <img 
                          src={allScriitoriForSearch.find(s => s.key === postForm.newReactionFriendKey)?.img || ''} 
                          alt={postForm.newReactionFriendName}
                          style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <span style={{ fontWeight: 'bold' }}>{postForm.newReactionFriendName}</span>
                        <button
                          type="button"
                          onClick={() => setPostForm({ ...postForm, newReactionFriendKey: '', newReactionFriendName: '' })}
                          style={{
                            marginLeft: 'auto',
                            padding: '4px 8px',
                            fontSize: '12px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                          }}
                        >
                          ×
                        </button>
                      </div>
                    )}
                    {!postForm.newReactionFriendName && (
                      <div style={{ position: 'relative' }}>
                        <AvatarSearchBar
                          onSelect={(scriitor) => {
                            setPostForm({
                              ...postForm,
                              newReactionFriendKey: scriitor.key,
                              newReactionFriendName: scriitor.nume,
                            });
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Reacție</label>
                    <select
                      value={postForm.newReactionType || ''}
                      onChange={(e) => setPostForm({ ...postForm, newReactionType: e.target.value })}
                      className="admin-select"
                    >
                      <option value="">Selectează reacția</option>
                      {REACTIONS.map(r => (
                        <option key={r.type} value={r.type}>
                          {r.emoji} {r.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (postForm.newReactionFriendKey && postForm.newReactionType) {
                        const newReaction = {
                          friendKey: postForm.newReactionFriendKey,
                          reaction: postForm.newReactionType,
                        };
                        setPostForm({
                          ...postForm,
                          reactions: [...(postForm.reactions || []), newReaction],
                          newReactionFriendKey: '',
                          newReactionFriendName: '',
                          newReactionType: '',
                        });
                      }
                    }}
                    disabled={!postForm.newReactionFriendKey || !postForm.newReactionType}
                    style={{
                      padding: '8px 16px',
                      fontSize: '14px',
                      backgroundColor: (postForm.newReactionFriendKey && postForm.newReactionType)
                        ? (darkTheme ? '#a97c50' : '#ffd591')
                        : '#ccc',
                      color: darkTheme ? '#fff' : '#4e2e1e',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: (postForm.newReactionFriendKey && postForm.newReactionType) ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Adaugă reacție
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="admin-submit-button">
                {loading ? (scriitorView === 'post-edit' ? 'Se actualizează...' : 'Se adaugă...') : (scriitorView === 'post-edit' ? 'Actualizează Postare' : 'Adaugă Postare')}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;


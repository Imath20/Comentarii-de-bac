import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
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
import AIComentariuFormatter from './AIComentariuFormatter';
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

const AdminDashboard = ({ darkTheme, onLogout, initialCommentData, initialSubjectData }) => {
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
  
  // Load all scriitori for searchbars
  useEffect(() => {
    const loadScriitoriForSearch = async () => {
      try {
        const scriitoriData = await getScriitoriData();
        const scriitoriArray = Object.values(scriitoriData).map(s => ({
          nume: s.nume || '',
          img: s.img || '',
          key: s.key || s.id,
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
    plan: 'free',
    descriere: '',
    content: [], // Changed from text to content (array of blocks)
    createdBy: '',
    createdByEmail: '',
    createdByName: '',
  });
  const [editingCommentId, setEditingCommentId] = useState(null);

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
      setIsEditing(true);
      setEditingCommentId(resolvedId || null);
      setComentariuForm({
        id: resolvedId || '',
        titlu: initialCommentData.titlu || '',
        autor: initialCommentData.autor || '',
        categorie: initialCommentData.categorie || '',
        plan: initialCommentData.plan || 'free',
        descriere: initialCommentData.descriere || '',
        content: initialCommentData.content || (initialCommentData.text ? [{ type: 'paragraph', text: initialCommentData.text }] : []),
        createdBy: initialCommentData.createdBy || '',
        createdByEmail: initialCommentData.createdByEmail || '',
        createdByName: initialCommentData.createdByName || '',
      });
      setActiveTab('comentarii');
      updateUrlParams({ tab: 'comentarii' });
    } else {
      setEditingCommentId(null);
    }
  }, [initialCommentData, updateUrlParams]);

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
    image: '',
    pin: false,
    isPoem: false,
    isStory: false,
    poemTitle: '',
    poemText: '',
    poemImages: [],
    storyTitle: '',
    storyText: '',
    pinnedActions: [],
    reactions: [],
    comments: [],
    // Temporary fields for adding new comment/reaction
    newCommentAuthor: '',
    newCommentKey: '',
    newCommentText: '',
    newReactionFriendKey: '',
    newReactionFriendName: '',
    newReactionType: '',
    createdBy: '',
    createdByEmail: '',
    createdByName: '',
  });
  const [aiPostPrompt, setAiPostPrompt] = useState('');
  const [aiPoemPrompt, setAiPoemPrompt] = useState('');

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
              image: '',
              pin: false,
              isPoem: false,
              isStory: false,
              poemTitle: '',
              poemText: '',
              poemImages: [],
              storyTitle: '',
              storyText: '',
              pinnedActions: [],
              reactions: [],
              comments: [],
              createdBy: '',
              createdByEmail: '',
              createdByName: '',
            });
            setScriitorView('post-add');
          } else if (actionParam === 'edit-post' && postIdParam) {
            const post = scriitor.posts?.find(p => p.id === parseInt(postIdParam) || p.id === postIdParam);
            if (post) {
              setPostForm({
                id: post.id,
                date: post.date || '',
                author: post.author || scriitor.nume,
                text: post.text || '',
                image: post.image || '',
                pin: post.pin || false,
                isPoem: post.isPoem || false,
                isStory: post.isStory || false,
                poemTitle: post.poemTitle || '',
                poemText: post.poemText || '',
                poemImages: post.poemImages || [],
                storyTitle: post.storyTitle || '',
                storyText: post.storyText || '',
                pinnedActions: post.pinnedActions || [],
                reactions: post.reactions || [],
                comments: post.comments || [],
                createdBy: post.createdBy || '',
                createdByEmail: post.createdByEmail || '',
                createdByName: post.createdByName || '',
              });
              setScriitorView('post-edit');
            }
          } else if (actionParam === 'edit-comment' && postIdParam && commentIndexParam !== null) {
            const post = scriitor.posts?.find(p => p.id === parseInt(postIdParam) || p.id === postIdParam);
            if (post && post.comments && post.comments[parseInt(commentIndexParam)]) {
              // Open post edit view with the post data
              setPostForm({
                id: post.id,
                date: post.date || '',
                author: post.author || scriitor.nume,
                text: post.text || '',
                image: post.image || '',
                pin: post.pin || false,
                isPoem: post.isPoem || false,
                isStory: post.isStory || false,
                poemTitle: post.poemTitle || '',
                poemText: post.poemText || '',
                poemImages: post.poemImages || [],
                storyTitle: post.storyTitle || '',
                storyText: post.storyText || '',
                pinnedActions: post.pinnedActions || [],
                reactions: post.reactions || [],
                comments: post.comments || [],
                createdBy: post.createdBy || '',
                createdByEmail: post.createdByEmail || '',
                createdByName: post.createdByName || '',
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
        // Generate ID if not provided
        const id = comentariuForm.id || 
          `${comentariuForm.autor.toLowerCase().replace(/\s+/g, '-')}-${comentariuForm.titlu.toLowerCase().replace(/\s+/g, '-')}`;

        const payload = attachOwnershipMetadata({
          ...comentariuForm,
          id,
        });

        await addComentariu(payload);

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
      }

      // Reset form after successful submit (only if not editing, as we navigate away)
      if (!isEditing) {
        setComentariuForm({
          id: '',
          titlu: '',
          autor: '',
          categorie: '',
          plan: 'free',
          descriere: '',
          content: [],
          createdBy: '',
          createdByEmail: '',
          createdByName: '',
        });
        setIsEditing(false);
        setEditingCommentId(null);
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
      setMessage({ type: 'error', text: 'Eroare la încărcarea imaginii' });
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

      // Dacă postarea are o imagine, adaugă-o automat în galerie
      if (postData.image && postData.image.trim() !== '') {
        // La editare, verifică dacă imaginea s-a schimbat
        let imageToAdd = postData.image;
        if (scriitorView === 'post-edit') {
          const originalPost = selectedScriitor.posts?.find(p => p.id === postForm.id);
          if (originalPost && originalPost.image === postData.image) {
            // Imaginea nu s-a schimbat, nu trebuie să o adăugăm din nou
            imageToAdd = null;
          }
        }
        
        if (imageToAdd) {
          const updated = await fetchScriitori();
          const currentScriitor = updated.find(s => s.key === selectedScriitor.key);
          if (currentScriitor) {
            const gallery = currentScriitor.gallery || [];
            // Verifică dacă imaginea nu există deja în galerie
            if (!gallery.includes(imageToAdd)) {
              const updatedGallery = [...gallery, imageToAdd];
              await updateScriitor(selectedScriitor.key, { gallery: updatedGallery });
              console.log('✅ Imagine adăugată automat în galerie:', imageToAdd);
            }
          }
        }
      }

      await loadScriitori();
      const updated = await fetchScriitori();
      const updatedScriitor = updated.find(s => s.key === selectedScriitor.key);
      if (updatedScriitor) {
        setSelectedScriitor(updatedScriitor);
      }
      setScriitorView('posts');
      if (selectedScriitor) {
        updateUrlParams({ view: 'posts', scriitor: selectedScriitor.key || selectedScriitor.id, action: null, postId: null, commentIndex: null, from: 'admin' });
      }
      setPostForm({
        id: '',
        date: '',
        author: '',
        text: '',
        image: '',
        pin: false,
        isPoem: false,
        isStory: false,
        poemTitle: '',
        poemText: '',
        poemImages: [],
        storyTitle: '',
        storyText: '',
        pinnedActions: [],
        reactions: [],
        comments: [],
        newCommentAuthor: '',
        newCommentKey: '',
        newCommentText: '',
        newReactionFriendKey: '',
        newReactionFriendName: '',
        newReactionType: '',
        createdBy: '',
        createdByEmail: '',
        createdByName: '',
      });
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
      await deletePostFromScriitor(selectedScriitor.key, postId);
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
                placeholder="eminescu-luceafarul"
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
          </div>

          <div className="admin-form-group">
            <label htmlFor="comentariu-descriere">Descriere</label>
            <input
              type="text"
              id="comentariu-descriere"
              value={comentariuForm.descriere}
              onChange={(e) => setComentariuForm({ ...comentariuForm, descriere: e.target.value })}
              placeholder="Teme, motive, viziune, specii și interpretare succintă."
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="comentariu-content">Text complet *</label>
            <RichTextEditor
              value={comentariuForm.content}
              onChange={(content) => setComentariuForm({ ...comentariuForm, content })}
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
                        image: '',
                        pin: false,
                        isPoem: false,
                        isStory: false,
                        poemTitle: '',
                        poemText: '',
                        poemImages: [],
                        storyTitle: '',
                        storyText: '',
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
                      setAiPoemPrompt('');
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
                        <p className="admin-post-text">{post.text}</p>
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
                              <div style={{ marginTop: '5px', fontSize: '12px', color: darkTheme ? '#ccc' : '#666', maxHeight: '100px', overflow: 'hidden' }}>
                                {post.poemText.substring(0, 100)}...
                              </div>
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
                                  image: post.image || '',
                                  pin: post.pin || false,
                                  isPoem: post.isPoem || false,
                                  isStory: post.isStory || false,
                                  poemTitle: post.poemTitle || '',
                                  poemText: post.poemText || '',
                                  poemImages: post.poemImages || [],
                                  storyTitle: post.storyTitle || '',
                                  storyText: post.storyText || '',
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
                              setAiPoemPrompt('');
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
                        poemTitle: isPoem ? postForm.poemTitle : '',
                        poemText: isPoem ? postForm.poemText : '',
                      });
                    }}
                    style={{ marginRight: '5px' }}
                  />
                  Poezie (imagine verticală cu text în dreapta)
                </label>
              </div>

              {!postForm.isPoem ? (
                <>
                  <div className="admin-form-group">
                    <label htmlFor="post-ai-brief">Despre ce să scrie AI-ul (brief scurt)</label>
                    <textarea
                      id="post-ai-brief"
                      value={aiPostPrompt}
                      onChange={(e) => setAiPostPrompt(e.target.value)}
                      placeholder="Ex.: anunță apariția unei noi ediții, pune un highlight dintr-o operă, descrie o amintire din copilărie, invită elevii la lectură..."
                      rows={3}
                      className="admin-textarea"
                    />
                    <small style={{ color: darkTheme ? '#c3b7a4' : '#666' }}>
                      Scrie 1-2 idei despre subiect, ton și public; AI-ul va folosi profilul scriitorului selectat.
                    </small>
                  </div>

                  <div className="admin-form-group">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                      <label htmlFor="post-text" style={{ marginBottom: 0 }}>Text *</label>
                      <AIPostGenerator
                        prompt={aiPostPrompt}
                        onTextGenerated={(generatedText) => setPostForm((prev) => ({ ...prev, text: generatedText }))}
                        scriitor={selectedScriitor}
                        setMessage={setMessage}
                        darkTheme={darkTheme}
                      />
                    </div>
                    <textarea
                      id="post-text"
                      value={postForm.text}
                      onChange={(e) => setPostForm({ ...postForm, text: e.target.value })}
                      placeholder="Textul postării..."
                      required
                      rows={5}
                      className="admin-textarea"
                    />
                    <small style={{ color: darkTheme ? '#c3b7a4' : '#666' }}>
                      Poți completa manual sau apasă cubul pentru a genera automat pe baza brief-ului de mai sus.
                    </small>
                  </div>

                  <div className="admin-form-row">
                    <div className="admin-form-group" style={{ flex: 1 }}>
                      <label htmlFor="post-image">Imagine (dreptunghiulară)</label>
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
                </>
              ) : (
                <>
                  <div className="admin-form-group">
                    <label htmlFor="poem-ai-brief">Despre ce să scrie AI-ul (brief poezie)</label>
                    <textarea
                      id="poem-ai-brief"
                      value={aiPoemPrompt}
                      onChange={(e) => setAiPoemPrompt(e.target.value)}
                      placeholder="Ex.: o amintire din copilărie, o metaforă despre timp, un peisaj specific autorului..."
                      rows={3}
                      className="admin-textarea"
                    />
                    <small style={{ color: darkTheme ? '#c3b7a4' : '#666' }}>
                      1-2 idei, imagini sau teme; AI-ul va scrie poezia în stilul autorului, la persoana I.
                    </small>
                  </div>

                  <div className="admin-form-group">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                      <label htmlFor="poem-text" style={{ marginBottom: 0 }}>Text poezie *</label>
                      <AIPostGenerator
                        prompt={aiPoemPrompt}
                        onTextGenerated={(generatedText) => setPostForm((prev) => ({ ...prev, poemText: generatedText }))}
                        scriitor={selectedScriitor}
                        setMessage={setMessage}
                        darkTheme={darkTheme}
                        target="poem"
                      />
                    </div>
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
                      Poți edita manual sau apasă cubul pentru a genera versurile după brief.
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
                                  setMessage({ type: 'error', text: 'Eroare la încărcarea imaginii' });
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
                      <div>{comment.text}</div>
                    </div>
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
                    <label style={{ display: 'block', marginBottom: '5px' }}>Text comentariu</label>
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


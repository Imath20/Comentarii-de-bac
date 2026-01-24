import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getScriitoriData } from '../firebase/scriitoriService';
import { fetchScriitor, deleteCommentFromPost, updateScriitor, applyModerationCorrections } from '../firebase/scriitoriService';
import ScriitorInfo from '../assets/ScriitorInfo';
import AvatarSearchBar from '../assets/AvatarSearchBar';
import ScriitorChat from '../assets/ScriitorChat';
import AIContentModerator from '../components/AIContentModerator';
import { useAuth } from '../firebase/AuthContext';
import ScrollToTop from '../components/ScrollToTop';
import '../styles/adminAddButton.scss';

// Date pentru poeziile scurte
const shortPoems = {
  'plumb': {
    titlu: 'Plumb',
    autor: 'George Bacovia',
    data: '1916',
    text: `Plumb

Dormeau adânc sicriele de plumb,
Și flori de plumb și funerar vestmânt...
Stam singur în cavou... și era vânt...
Și scârțâiau coroanele de plumb.

Dormea întors amorul meu de plumb
Pe flori de plumb... și-am început să-l strig...
Stam singur lângă mort... și era frig...
Și-i atârnau aripile de plumb.`
  },
  'testament': {
    titlu: 'Testament',
    autor: 'Tudor Arghezi',
    data: '1927',
    text: `
Nu-ţi voi lăsa drept bunuri, după moarte,
Decât un nume adunat pe o carte,
În seara răzvrătită care vine
De la străbunii mei până la tine,
Prin râpi şi gropi adânci
Suite de bătrânii mei pe brânci
Şi care, tânăr, să le urci te-aşteaptă
Cartea mea-i, fiule, o treaptă.

Aşeaz-o cu credinţă căpătâi.
Ea e hrisovul vostru cel dintâi.
Al robilor cu saricile, pline
De osemintele vărsate-n mine.

Ca să schimbăm, acum, întâia oară
Sapa-n condei şi brazda-n calimară
Bătrânii au adunat, printre plăvani,
Sudoarea muncii sutelor de ani.
Din graiul lor cu-ndemnuri pentru vite
Eu am ivit cuvinte potrivite
Şi leagăne urmaşilor stăpâni.
Şi, frământate mii de săptămâni
Le-am prefăcut în versuri şi-n icoane,
Făcui din zdrenţe muguri şi coroane.
Veninul strâns l-am preschimbat în miere,
Lăsând întreagă dulcea lui putere.

Am luat ocara, şi torcând uşure
Am pus-o când să-mbie, când să-njure.
Am luat cenuşa morţilor din vatră
Şi am făcut-o Dumnezeu de piatră,
Hotar înalt, cu două lumi pe poale,
Păzind în piscul datoriei tale.

Durerea noastră surdă şi amară
O grămădii pe-o singură vioară,
Pe care ascultând-o a jucat
Stăpânul, ca un ţap înjunghiat.
Din bube, mucegaiuri şi noroi
Iscat-am frumuseţi şi preţuri noi.
Biciul răbdat se-ntoarce în cuvinte
Si izbăveşte-ncet pedesitor
Odrasla vie-a crimei tuturor.
E-ndreptăţirea ramurei obscure
Ieşită la lumină din padure
Şi dând în vârf, ca un ciorchin de negi
Rodul durerii de vecii întregi.

Întinsă leneşă pe canapea,
Domniţa suferă în cartea mea.
Slova de foc şi slova faurită
Împărechiate-n carte se mărită,
Ca fierul cald îmbrăţişat în cleşte.
Robul a scris-o, Domnul o citeşte,
Făr-a cunoaşte ca-n adâncul ei
Zace mania bunilor mei.`
  },
  'flori-mucigai': {
    titlu: 'Flori de mucigai',
    autor: 'Tudor Arghezi',
    data: '1919',
    text: `
Le-am scris cu unghia pe tencuială
Pe un părete de firidă goală,
Pe întuneric, în singurătate,
Cu puterile neajutate
Nici de taurul, nici de leul, nici de vulturul
Care au lucrat împrejurul
Lui Luca, lui Marcu şi lui Ioan.
Sunt stihuri fără an,
Stihuri de groapă,
De sete de apă
Şi de foame de scrum,
Stihurile de acum.
Când mi s-a tocit unghia îngerească
Am lăsat-o să crească
Şi nu mi-a crescut -
Sau nu o mai am cunoscut.

Era întuneric. Ploaia bătea departe, afară.
Şi mă durea mâna ca o ghiară
Neputincioasă să se strângă
Şi m-am silit să scriu cu unghiile de la mâna stângă.`
  },
  'eu-nu-strivesc-corola': {
    titlu: 'Eu nu strivesc corola de minuni a lumii',
    autor: 'Lucian Blaga',
    data: '1919',
    text: `Eu nu strivesc corola de minuni a lumii
şi nu ucid
cu mintea tainele, ce le-ntâlnesc
în calea mea
în flori, în ochi, pe buze ori morminte.
Lumina altora
sugrumă vraja nepătrunsului ascuns
în adâncimi de întuneric,
dar eu,
eu cu lumina mea sporesc a lumii taină -
şi-ntocmai cum cu razele ei albe luna
nu micşorează, ci tremurătoare
măreşte şi mai tare taina nopţii,
aşa îmbogăţesc şi eu întunecata zare
cu largi fiori de sfânt mister
şi tot ce-i neînţeles
se schimbă-n neînţelesuri şi mai mari
sub ochii mei-
căci eu iubesc
şi flori şi ochi şi buze şi morminte.`
  },
  'leoaica-iubirea': {
    titlu: 'Leoaică tânără, iubirea',
    autor: 'Nichita Stănescu',
    data: '1964',
    text: `Leoaică tânără, iubirea
mi-a sarit în faţă.
Mă pândise-n încordare
mai demult.
Colţii albi mi i-a înfipt în faţă,
m-a muşcat leoaica, azi, de faţă.
Şi deodata-n jurul meu, natura
se făcu un cerc, de-a-dura,
când mai larg, când mai aproape,
ca o strîngere de ape.
Şi privirea-n sus ţîşni,
curcubeu tăiat în două,
şi auzul o-ntîlni
tocmai lângă ciorcârlii.

Mi-am dus mâna la sprînceană,
la timplă şi la bărbie,
dar mâna nu le mai ştie.
Şi alunecă-n neştire
pe-un deşert în strălucire,
peste care trece-alene
o leoaică aramie
cu mişcările viclene,
incă-o vreme,
si-ncă-o vreme..`
  },
  'aci-sosi': {
    titlu: 'Aci sosi pe vremuri',
    autor: 'Ion Pillat',
    data: '1923',
    text: `La casa amintirii cu-obloane si pridvor,
Paienjeni zabrelira si poarta, si zavor.

Iar hornul nu mai trage alene din ciubuc
De când luptara-n codru si poteri, si haiduc.

În drumul lor spre zare îmbatrânira plopii.
Aci sosi pe vremuri bunica-mi Calyopi.

Nerabdator bunicul pândise de la scara
Berlina leganata prin lanuri de secara.

Pie-atunci nu erau trenuri ca azi, si din berlina
Sari, subtire, -o fata în larga crinolina.

Privind cu ea sub luna câmpia ca un lac,
Bunicul meu desigur i-a recitat Le lac.

Iar când deasupra casei ca umbre berze cad,
Îi spuse Sburatorul de-un tânar Eliad.

Ea-l asculta tacuta, cu ochi de peruzea…
Si totul ce romantic, ca-n basme, se urzea.

Si cum sedeau… departe, un clopot a sunat,
De nunta sau de moarte, în turnul vechi din sat.

Dar ei, în clipa asta simteau ca-o sa ramâna…
De mult e mort bunicul, bunica e batrâna…

Ce straniu lucru: vremea! Deodata pe perete
Te vezi aievea numai în stersele portrete.

Te recunosti în ele, dar nu si-n fata ta,
Caci trupul tau te uita, dar tu nu-l poti uita….

Ca ieri sosi bunica… si vii acuma tu:
Pe urmele berlinei trasura ta statu.

Acelasi drum te-aduse prin lanul de secara.
Ca dânsa tragi, în dreptul pridvorului, la scara.

Subtire, calci nisipul pe care ea sari.
Cu berzele într-ânsul amurgul se opri….

Si m-ai gasit, zâmbindu-mi, ca prea naiv eram
Când ti-am soptit poeme de bunul Francis Jammes.

Iar când în noapte câmpul fu lac întins sub luna
Si-am spus Balada lunei de Horia Furtuna,.

M-ai ascultat pe gânduri, cu ochi de ametist,
Si ti-am parut romantic si poate simbolist.

Si cum sedeam… departe, un clopot a sunat,
Acelasi clopot poate, în turnul vechi din sat….

De nunta sau de moarte, în turnul vechi din sat.`
  },
  'gradina-ghetsimani': {
    titlu: 'În Grădina Ghetsimani',
    autor: 'Vasile Voiculescu',
    data: '1921',
    text: `Iisus lupta cu soarta și nu primea paharul...
Căzut pe brânci în iarbă, se-mpotrivea îtruna.
Curgeau sudori de sânge pe chipu-i alb ca varul
Și-amarnica-i strigare stârnea în slăvi furtuna.

O mâna nendurată, ținând grozava cupă,
Se coboară-miindu-l și i-o ducea la gură...
Și-o sete uriașă stă sufletul să-i rupă...
Dar nu voia s-atingă infama băutură.

În apa ei verzuie jucau sterlici de miere
Și sub veninul groaznic simțea că e dulceață...
Dar fălcile-nclestându-și, cu ultima putere
Bătându-se cu moartea, uitase de viață!

Deasupra fără tihnă, se frământau măslinii,
Păreau că vor să fugă din loc, să nu-l mai vadă...
Treceau bătăi de aripi prin vraiștea grădinii
Și uliii de seară dau roate dupa pradă.`
  }
};

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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Scriitor = () => {
  const query = useQuery();
  const name = query.get('name');
  const bannerRef = useRef(null);
  const profileImgRef = useRef(null);
  const leftColumnRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullscreenTarget, setFullscreenTarget] = useState(null); // 'banner' | 'profile' | null
  const [likesModal, setLikesModal] = useState({ open: false, postId: null });
  const [showChat, setShowChat] = useState(false);
  const [showModerator, setShowModerator] = useState(false);
  const [profilePreviewOpen, setProfilePreviewOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, userProfile } = useAuth();
  const currentUserId = currentUser?.uid || null;
  const isAdmin = userProfile?.isAdmin === true;
  const isSemiAdmin = userProfile?.isSemiAdmin === true;
  const canEditResource = useCallback((ownerId, { allowSemiAdminFullAccess = false } = {}) => {
    if (isAdmin) return true;
    if (isSemiAdmin) {
      if (allowSemiAdminFullAccess) {
        return true;
      }
      if (ownerId && currentUserId) {
        return ownerId === currentUserId;
      }
    }
    return false;
  }, [isAdmin, isSemiAdmin, currentUserId]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scriitoriData, setScriitoriData] = useState({});
  const canManageCurrentScriitor = data?.createdBy ? canEditResource(data.createdBy) : false;

  // Load scriitor data from Firestore
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        console.log('Loading scriitor:', name);
        
        // Load all scriitori for friends/comments references
        const allScriitori = await getScriitoriData();
        console.log('Loaded all scriitori:', Object.keys(allScriitori).length);
        setScriitoriData(allScriitori);
        
        // Load specific scriitor
        const scriitor = await fetchScriitor(name);
        console.log('Fetched scriitor:', scriitor ? scriitor.nume : 'null', scriitor);
        
        if (scriitor) {
          console.log('Setting data for:', scriitor.nume, 'Posts:', scriitor.posts?.length || 0);
          // Ensure all required fields exist
          const cleanedScriitor = {
            ...scriitor,
            nume: scriitor.nume || '',
            date: scriitor.date || '',
            img: scriitor.img || '',
            banner: scriitor.banner || '',
            friends: Array.isArray(scriitor.friends) ? scriitor.friends : [],
            gallery: Array.isArray(scriitor.gallery) ? scriitor.gallery : [],
            posts: Array.isArray(scriitor.posts) ? scriitor.posts : [],
          };
          setData(cleanedScriitor);
        } else {
          console.warn('Scriitor not found:', name);
          setData(null);
        }
      } catch (error) {
        console.error('Error loading scriitor data:', error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    
    if (name) {
      loadData();
    } else {
      setLoading(false);
      setData(null);
    }
  }, [name]);

  const handleFullScreen = () => {
    if (!isFullScreen) {
      if (bannerRef.current.requestFullscreen) {
        bannerRef.current.requestFullscreen();
      } else if (bannerRef.current.webkitRequestFullscreen) {
        bannerRef.current.webkitRequestFullscreen();
      } else if (bannerRef.current.msRequestFullscreen) {
        bannerRef.current.msRequestFullscreen();
      }
      setFullscreenTarget('banner');
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      // Scroll la top după tranziție (după 700ms)
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 700);
    }
  };

  const handleProfileFullScreen = () => {
    // Salvează poziția de scroll curentă
    const currentScrollY = window.scrollY;
    setScrollPosition(currentScrollY);
    
    setProfilePreviewOpen(true);
    // Previne scroll-ul pe body când modalul este deschis
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${currentScrollY}px`;
    document.body.style.width = '100%';
  };

  const closeProfilePreview = () => {
    setProfilePreviewOpen(false);
    // Restaurează scroll-ul pe body
    document.body.style.overflow = 'unset';
    document.body.style.position = 'unset';
    document.body.style.top = 'unset';
    document.body.style.width = 'unset';
    // Restaurează poziția de scroll
    window.scrollTo(0, scrollPosition);
  };

  useEffect(() => {
    const handleChange = () => {
      const fsElement = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
      setIsFullScreen(!!fsElement);
      if (!fsElement) {
        setFullscreenTarget(null);
      } else if (fsElement === bannerRef.current) {
        setFullscreenTarget('banner');
      } else if (fsElement === profileImgRef.current) {
        setFullscreenTarget('profile');
      }
    };
    document.addEventListener('fullscreenchange', handleChange);
    document.addEventListener('webkitfullscreenchange', handleChange);
    document.addEventListener('msfullscreenchange', handleChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleChange);
      document.removeEventListener('webkitfullscreenchange', handleChange);
      document.removeEventListener('msfullscreenchange', handleChange);
    };
  }, []);

  // Apply theme and persist
  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkTheme);
    localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  // TOATE HOOKS-URILE TREBUIE SĂ FIE AICI, ÎNAINTE DE ORICE RETURN CONDITIONAL
  // Pentru comentarii expandabile
  const [expandedComments, setExpandedComments] = useState({});
  
  // Pentru expandarea textului poeziei
  const [expandedPoems, setExpandedPoems] = useState({});
  
  // Pentru modalul cu toți prietenii
  const [showAllFriendsModal, setShowAllFriendsModal] = useState(false);
  
  // Pentru modal preview poezie
  const [poemPreviewModal, setPoemPreviewModal] = useState({ open: false, post: null });
  
  // Pentru modal "Citește tot"
  const [readAllModal, setReadAllModal] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Pentru modal Bibliografie (Citește tot descrierea)
  const [bioModalOpen, setBioModalOpen] = useState(false);
  
  // Pentru galerie poezie
  const [poemGalleryModal, setPoemGalleryModal] = useState({ open: false, images: [], startIndex: 0 });
  const [poemGalleryCurrentIndex, setPoemGalleryCurrentIndex] = useState(0);

  // Galerie preview state
  const [galleryPreviewIdx, setGalleryPreviewIdx] = useState(null);
  const [galleryCurrentIndex, setGalleryCurrentIndex] = useState(0);
  // Overview mode (show all thumbnails like a task view)
  const [galleryOverviewOpen, setGalleryOverviewOpen] = useState(false);
  const [overviewIndex, setOverviewIndex] = useState(0);
  const overviewGridRef = useRef(null);
  // Modal pentru toate imaginile din galerie
  const [galleryAllModalOpen, setGalleryAllModalOpen] = useState(false);
  const [galleryAllModalPage, setGalleryAllModalPage] = useState(0);
  // Sidebar pentru preview imagine din galerie
  const [gallerySidebarOpen, setGallerySidebarOpen] = useState(false);
  const [gallerySidebarIndex, setGallerySidebarIndex] = useState(0);
  // Modal overlay pentru preview imagine peste galerie
  const [galleryImagePreviewOpen, setGalleryImagePreviewOpen] = useState(false);
  const [galleryImagePreviewIndex, setGalleryImagePreviewIndex] = useState(0);

  // Funcții helper (nu sunt hooks, pot fi după hooks)
  const toggleComments = (postId) => {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const togglePoemText = (postId) => {
    setExpandedPoems((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Funcție pentru a obține textul poeziei
  const getPoemText = (poemKey) => {
    return shortPoems[poemKey]?.text || 'Poezia nu este disponibilă momentan.';
  };

  const openAllFriendsModal = () => setShowAllFriendsModal(true);
  const closeAllFriendsModal = () => setShowAllFriendsModal(false);

  const openPoemPreview = (post) => {
    // Salvează poziția de scroll curentă
    const currentScrollY = window.scrollY;
    setScrollPosition(currentScrollY);
    
    // Dacă este o poezie scurtă, creează un obiect post cu datele necesare
    if (post.isPoem && shortPoems[post.poemTitle]) {
      const poemData = shortPoems[post.poemTitle];
      setPoemPreviewModal({ 
        open: true, 
        post: {
          poemTitle: poemData.titlu,
          poemText: poemData.text,
          isPoem: true
        }
      });
    } else {
      setPoemPreviewModal({ open: true, post });
    }
    // Previne scroll-ul pe body când modalul este deschis
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${currentScrollY}px`;
    document.body.style.width = '100%';
  };
  const closePoemPreview = () => {
    setPoemPreviewModal({ open: false, post: null });
    // Restaurează scroll-ul pe body
    document.body.style.overflow = 'unset';
    document.body.style.position = 'unset';
    document.body.style.top = 'unset';
    document.body.style.width = 'unset';
    // Restaurează poziția de scroll
    window.scrollTo(0, scrollPosition);
  };
  
  const openReadAllModal = () => {
    // Salvează poziția de scroll curentă
    const currentScrollY = window.scrollY;
    setScrollPosition(currentScrollY);
    
    setReadAllModal(true);
    // Previne scroll-ul pe body când modalul este deschis
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${currentScrollY}px`;
    document.body.style.width = '100%';
  };
  
  const closeReadAllModal = () => {
    setReadAllModal(false);
    // Restaurează scroll-ul pe body
    document.body.style.overflow = 'unset';
    document.body.style.position = 'unset';
    document.body.style.top = 'unset';
    document.body.style.width = 'unset';
    // Restaurează poziția de scroll
    window.scrollTo(0, scrollPosition);
  };

  const openBioModal = () => {
    // Salvează poziția de scroll curentă
    const currentScrollY = window.scrollY;
    setScrollPosition(currentScrollY);
    
    setBioModalOpen(true);
    // Previne scroll-ul pe body când modalul este deschis
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${currentScrollY}px`;
    document.body.style.width = '100%';
  };
  const closeBioModal = () => {
    setBioModalOpen(false);
    // Restaurează scroll-ul pe body
    document.body.style.overflow = 'unset';
    document.body.style.position = 'unset';
    document.body.style.top = 'unset';
    document.body.style.width = 'unset';
    // Restaurează poziția de scroll
    window.scrollTo(0, scrollPosition);
  };

  const openPoemGallery = (images, startIndex = 0) => {
    // Salvează poziția de scroll curentă
    const currentScrollY = window.scrollY;
    setScrollPosition(currentScrollY);
    
    setGalleryOverviewOpen(false);
    setOverviewIndex(startIndex);
    setPoemGalleryModal({ open: true, images, startIndex });
    setPoemGalleryCurrentIndex(startIndex);
    // Previne scroll-ul pe body când modalul este deschis
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${currentScrollY}px`;
    document.body.style.width = '100%';
  };
  const closePoemGallery = () => {
    setGalleryOverviewOpen(false);
    setPoemGalleryModal({ open: false, images: [], startIndex: 0 });
    setPoemGalleryCurrentIndex(0);
    setOverviewIndex(0);
    // Restaurează scroll-ul pe body
    document.body.style.overflow = 'unset';
    document.body.style.position = 'unset';
    document.body.style.top = 'unset';
    document.body.style.width = 'unset';
    // Restaurează poziția de scroll
    window.scrollTo(0, scrollPosition);
  };

  const openGalleryPreview = (idx) => {
    setGalleryOverviewOpen(false);
    setGalleryPreviewIdx(idx);
    setGalleryCurrentIndex(idx);
    setOverviewIndex(idx);
    // Previne scroll-ul pe body când modalul este deschis
    const currentScrollY = window.scrollY;
    setScrollPosition(currentScrollY);
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${currentScrollY}px`;
    document.body.style.width = '100%';
  };
  const closeGalleryPreview = () => {
    setGalleryOverviewOpen(false);
    setGalleryPreviewIdx(null);
    setGalleryCurrentIndex(0);
    setOverviewIndex(0);
    // Restaurează scroll-ul pe body și poziția
    document.body.style.overflow = 'unset';
    document.body.style.position = 'unset';
    document.body.style.top = 'unset';
    document.body.style.width = 'unset';
    window.scrollTo(0, scrollPosition);
  };

  // Funcție pentru ștergerea unei imagini din galerie (doar pentru admini)
  const handleDeleteGalleryImage = async (imageIndex, e) => {
    if (e) {
      e.stopPropagation(); // Previne deschiderea preview-ului când se apasă butonul
    }
    
    if (!isAdmin) {
      alert('Doar administratorii pot șterge imagini din galerie.');
      return;
    }

    if (!data || !data.key) {
      alert('Eroare: Datele scriitorului nu sunt disponibile.');
      return;
    }

    const gallery = data.gallery || [];
    if (imageIndex < 0 || imageIndex >= gallery.length) {
      alert('Eroare: Index imagine invalid.');
      return;
    }

    const imageToDelete = gallery[imageIndex];
    if (!window.confirm(`Ești sigur că vrei să ștergi această imagine din galerie?`)) {
      return;
    }

    try {
      // Șterge imaginea din array
      const updatedGallery = gallery.filter((_, idx) => idx !== imageIndex);
      
      // Actualizează în Firestore
      await updateScriitor(data.key, { gallery: updatedGallery });
      
      // Actualizează datele locale
      const updatedData = { ...data, gallery: updatedGallery };
      setData(updatedData);
      
      // Dacă era deschis preview-ul pentru această imagine sau următoarea, închide-l sau ajustează index-ul
      if (galleryImagePreviewOpen && galleryImagePreviewIndex === imageIndex) {
        setGalleryImagePreviewOpen(false);
      } else if (galleryImagePreviewIndex > imageIndex) {
        setGalleryImagePreviewIndex(prev => prev - 1);
      }
      
      // Dacă nu mai sunt imagini, închide modalul
      if (updatedGallery.length === 0) {
        setGalleryAllModalOpen(false);
        setGalleryImagePreviewOpen(false);
      }
      
      console.log('✅ Imagine ștearsă din galerie cu succes');
    } catch (error) {
      console.error('❌ Eroare la ștergerea imaginii din galerie:', error);
      alert('Eroare la ștergerea imaginii. Te rugăm să încerci din nou.');
    }
  };

  // Keyboard navigation for gallery modals (left/right, A/D; Space/Enter => forward)
  useEffect(() => {
    if (!data) return; // Early return if data not loaded
    
    const handleKeyDown = (e) => {
      const key = e.key;
      const gallery = data.gallery || [];
      
      // Determine which gallery is active
      const isImageGalleryOpen = galleryPreviewIdx !== null && Array.isArray(gallery) && gallery.length > 0;
      const isPoemGalleryOpen = poemGalleryModal.open && Array.isArray(poemGalleryModal.images) && poemGalleryModal.images.length > 0;

      if (!isImageGalleryOpen && !isPoemGalleryOpen) return;

      const goPrev = () => {
        if (isImageGalleryOpen) {
          setGalleryCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
        } else if (isPoemGalleryOpen) {
          setPoemGalleryCurrentIndex((prev) => (prev === 0 ? poemGalleryModal.images.length - 1 : prev - 1));
        }
      };

      const goNext = () => {
        if (isImageGalleryOpen) {
          setGalleryCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
        } else if (isPoemGalleryOpen) {
          setPoemGalleryCurrentIndex((prev) => (prev === poemGalleryModal.images.length - 1 ? 0 : prev + 1));
        }
      };

      // Tab key opens overview (prevents default focus traversal)
      if (key === 'Tab') {
        e.preventDefault();
        e.stopPropagation();
        // Initialize selection to current image index depending on which gallery is open
        if (isImageGalleryOpen) {
          setOverviewIndex(galleryCurrentIndex);
        } else if (isPoemGalleryOpen) {
          setOverviewIndex(poemGalleryCurrentIndex);
        }
        setGalleryOverviewOpen(true);
        return;
      }

      // Close overview with Escape
      if (key === 'Escape' && galleryOverviewOpen) {
        e.preventDefault();
        e.stopPropagation();
        setGalleryOverviewOpen(false);
        return;
      }

      // When overview is open, allow navigating selection with arrows and confirm with Enter
      if (galleryOverviewOpen) {
        if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
          e.preventDefault();
          e.stopPropagation();
          const total = isImageGalleryOpen ? gallery.length : poemGalleryModal.images.length;
          setOverviewIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
          return;
        }
        if (key === 'ArrowRight' || key === 'd' || key === 'D') {
          e.preventDefault();
          e.stopPropagation();
          const total = isImageGalleryOpen ? gallery.length : poemGalleryModal.images.length;
          setOverviewIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
          return;
        }
        if (key === 'ArrowUp' || key === 'w' || key === 'W') {
          e.preventDefault();
          e.stopPropagation();
          const total = isImageGalleryOpen ? gallery.length : poemGalleryModal.images.length;
          let columns = 1;
          if (overviewGridRef.current) {
            const styles = window.getComputedStyle(overviewGridRef.current);
            const cols = styles.getPropertyValue('grid-template-columns');
            if (cols) columns = cols.trim().split(/\s+/).length;
          }
          setOverviewIndex((prev) => {
            const next = prev - columns;
            return next < 0 ? 0 : next;
          });
          return;
        }
        if (key === 'ArrowDown' || key === 's' || key === 'S') {
          e.preventDefault();
          e.stopPropagation();
          const total = isImageGalleryOpen ? gallery.length : poemGalleryModal.images.length;
          let columns = 1;
          if (overviewGridRef.current) {
            const styles = window.getComputedStyle(overviewGridRef.current);
            const cols = styles.getPropertyValue('grid-template-columns');
            if (cols) columns = cols.trim().split(/\s+/).length;
          }
          setOverviewIndex((prev) => {
            const next = prev + columns;
            return next > total - 1 ? total - 1 : next;
          });
          return;
        }
        if (key === 'Enter' || key === 'NumpadEnter') {
          e.preventDefault();
          e.stopPropagation();
          if (isImageGalleryOpen) {
            setGalleryCurrentIndex(overviewIndex);
          } else if (isPoemGalleryOpen) {
            setPoemGalleryCurrentIndex(overviewIndex);
          }
          setGalleryOverviewOpen(false);
          return;
        }
        // Ignore other keys while overview is open
        return;
      }

      // Map keys
      const isPrevKey = key === 'ArrowLeft' || key === 'a' || key === 'A';
      const isNextKey = key === 'ArrowRight' || key === 'd' || key === 'D' || key === ' ' || key === 'Enter';

      if (isPrevKey || isNextKey) {
        // Prevent page scroll on Space/Arrows while modal is open
        e.preventDefault();
        e.stopPropagation();
      }

      if (isPrevKey) {
        goPrev();
      } else if (isNextKey) {
        goNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [galleryPreviewIdx, data, poemGalleryModal, galleryOverviewOpen, overviewIndex, galleryCurrentIndex, poemGalleryCurrentIndex]);

  // Ensure the selected overview item stays in view when navigating
  useEffect(() => {
    if (!galleryOverviewOpen || !overviewGridRef.current) return;
    const items = overviewGridRef.current.querySelectorAll('.scriitor-gallery-overview-item');
    const el = items[overviewIndex];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }, [galleryOverviewOpen, overviewIndex]);




  // RETURN CONDITIONAL - TREBUIE SĂ FIE DUPĂ TOATE HOOKS-URILE
  if (loading) {
    return (
      <div className="scriitor-not-found" style={{ padding: '40px', textAlign: 'center' }}>
        Se încarcă...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="scriitor-not-found" style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Scriitorul nu a fost găsit.</h2>
        <p>Key: {name}</p>
        <button 
          onClick={() => navigate('/scriitori')}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: darkTheme ? '#a97c50' : '#ffd591',
            color: darkTheme ? '#fff' : '#4e2e1e',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Înapoi la Scriitori
        </button>
      </div>
    );
  }

  // Acum putem folosi data în siguranță
  // Prieteni, galerie, postări
  const friends = data.friends || [];
  const gallery = data.gallery || [];

  // Helper pentru sortarea postărilor cronologic (după dată) + pin întotdeauna sus
  function parsePostDateToTimestamp(dateStr) {
    if (!dateStr || typeof dateStr !== 'string') return 0;

    const str = dateStr.toLowerCase().trim();

    // Mapare luni în română -> index lună
    const monthMap = {
      'ianuarie': 1,
      'februarie': 2,
      'martie': 3,
      'aprilie': 4,
      'mai': 5,
      'iunie': 6,
      'iulie': 7,
      'august': 8,
      'septembrie': 9,
      'octombrie': 10,
      'noiembrie': 11,
      'decembrie': 12,
    };

    // Extrage anul (ultimul număr cu 4 cifre din șir)
    const yearMatch = str.match(/(\d{4})(?!.*\d{4})/);
    const year = yearMatch ? parseInt(yearMatch[1], 10) : 0;

    // Extrage luna din text (dacă există un nume de lună în română)
    let month = 1;
    for (const [name, value] of Object.entries(monthMap)) {
      if (str.includes(name)) {
        month = value;
        break;
      }
    }

    // Extrage ziua (primul număr cu 1–2 cifre, înainte de an de obicei)
    const dayMatch = str.match(/\b(\d{1,2})\b/);
    const day = dayMatch ? parseInt(dayMatch[1], 10) : 1;

    // Dacă nu avem an, întoarcem 0 ca fallback (vor apărea la începutul listei)
    if (!year) return 0;

    return new Date(year, month - 1, day).getTime();
  }

  const posts = (data.posts || [])
    .slice()
    .sort((a, b) => {
      // Pin first
      if (a.pin && !b.pin) return -1;
      if (!a.pin && b.pin) return 1;

      // Apoi sortare cronologică după dată (de la cele mai vechi la cele mai noi)
      const timeA = parsePostDateToTimestamp(a.date);
      const timeB = parsePostDateToTimestamp(b.date);

      return timeA - timeB;
    });

  const friendsCount = friends.length;

  // Navigare către alt scriitor
  const goToScriitor = (key) => {
    const prevFrom = (location.state && location.state.from) || { pathname: '/scriitori', scrollY: 0 };
    navigate(`/scriitor?name=${key}`, { state: { from: prevFrom } });
  };

  // Helper to get scriitor data by key (for friends/comments)
  const getScriitorByKey = (key) => {
    return scriitoriData[key];
  };

  // Navigare către poezie (placeholder)
  const goToPoezie = (link) => {
    if (link) navigate(link);
  };

  // Handler pentru moderare AI
  const handleModerate = async (corrections) => {
    try {
      await applyModerationCorrections(name, corrections);
      
      // Reîncarcă datele scriitorului după moderare
      const updatedScriitor = await fetchScriitor(name);
      if (updatedScriitor) {
        setData(updatedScriitor);
      }
      
      alert(`✅ Moderate cu succes! ${corrections.length} acțiuni aplicate.`);
    } catch (error) {
      console.error('Eroare la moderare:', error);
      alert('❌ Eroare la aplicarea moderării. Verifică consola pentru detalii.');
    }
  };

  // Șterge un prieten
  const handleDeleteFriend = async (friendKey) => {
    if (!window.confirm('Ești sigur că vrei să ștergi acest prieten?')) {
      return;
    }

    try {
      const currentFriends = [...(data.friends || [])];
      
      // Normalizează cheile pentru comparație
      const normalizeKey = (key) => {
        if (typeof key === 'string') return key.trim().toLowerCase();
        if (key && typeof key === 'object' && key.key) return String(key.key).trim().toLowerCase();
        return String(key || '').trim().toLowerCase();
      };
      
      const normalizedTargetKey = normalizeKey(friendKey);
      
      // Șterge prietenul
      const updatedFriends = currentFriends.filter(f => {
        const friendKeyNormalized = normalizeKey(typeof f === 'string' ? f : (f.key || f));
        return friendKeyNormalized !== normalizedTargetKey;
      });
      
      await updateScriitor(name, { friends: updatedFriends });
      
      // Reîncarcă datele
      const updatedScriitor = await fetchScriitor(name);
      if (updatedScriitor) {
        setData(updatedScriitor);
      }
      
      alert('✅ Prieten șters cu succes!');
    } catch (error) {
      console.error('Eroare la ștergerea prietenului:', error);
      alert('❌ Eroare la ștergerea prietenului. Verifică consola pentru detalii.');
    }
  };

  // Helper: get likes from friends with specific reactions
  function getFriendLikes(post) {
    if (!post.reactions) {
      // Fallback pentru postările fără reacții specifice
      return friends.map((f, i) => ({
        ...f,
        reaction: REACTIONS[i % REACTIONS.length].type,
      }));
    }

    // Folosește reacțiile specifice din date
    return post.reactions.map(reaction => {
      const friend = friends.find(f => f.key === reaction.friendKey);
      if (friend) {
        return {
          ...friend,
          reaction: reaction.reaction,
        };
      }
      return null;
    }).filter(Boolean);
  }

  // Helper: get unique reactions grouped by type
  function getUniqueReactions(post) {
    const allReactions = getFriendLikes(post);
    const reactionGroups = {};

    allReactions.forEach(reaction => {
      if (!reactionGroups[reaction.reaction]) {
        reactionGroups[reaction.reaction] = [];
      }
      reactionGroups[reaction.reaction].push(reaction);
    });

    return reactionGroups;
  }

  function getReactionEmoji(type) {
    const r = REACTIONS.find(r => r.type === type);
    return r ? r.emoji : '👍';
  }



  return (
    <div className="scriitor-page">
        {/* Banner pe toată lățimea ferestrei */}
        <div
          ref={bannerRef}
          className={`scriitor-banner ${isFullScreen ? 'fullscreen' : ''} ${name}`}
          style={{
            background: data.banner ? `url(${data.banner}) center center/cover no-repeat` : 'transparent',
            backgroundPosition: name === 'eminescu' ? 'center 30%' : name === 'preda' ? 'center 50%' : name === 'sorescu' ? 'center 50%' : name === 'voiculescu' ? 'center 80%' : 'center 20%',
          }}
         onClick={handleFullScreen}
         title={isFullScreen ? 'Ieși din full screen' : 'Click pentru full screen'}
       >
        {/* AvatarSearchBar pe stânga sus, doar dacă nu e fullscreen - doar pe mobile */}
        {!isFullScreen && (
          <div className="avatar-searchbar-banner-wrapper" onClick={(e) => e.stopPropagation()}>
            <AvatarSearchBar onSelect={s => {
              const key = s.key || Object.keys(scriitoriData).find(k => scriitoriData[k]?.nume === s.nume);
              if (key) goToScriitor(key);
            }} />
          </div>
        )}
        {/* Buton back în banner - doar pe mobile */}
        {!isFullScreen && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              const y = (location.state && location.state.from && typeof location.state.from.scrollY === 'number') ? location.state.from.scrollY : 0;
              const fromPath = (location.state && location.state.from && location.state.from.pathname) || '/scriitori';
              navigate(fromPath, { replace: true, state: { restoreScroll: y } });
            }}
            className="scriitor-back-btn-banner"
            title="Înapoi"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        {/* Theme toggle button - floating in banner top-right */}
        {!isFullScreen && (
          <div
            style={{ position: 'absolute', top: 14, right: 14, zIndex: 2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="theme-toggle"
              aria-label="Comută tema"
              title={darkTheme ? 'Comută pe luminoasă' : 'Comută pe întunecată'}
              onClick={() => setDarkTheme(v => !v)}
            >
              {darkTheme ? '☀️' : '🌙'}
            </button>
          </div>
        )}
        {!isFullScreen && (
          <>
            <div
              className="scriitor-profile-image"
              onClick={(e) => { e.stopPropagation(); handleProfileFullScreen(); }}
              title="Click pentru full screen"
            >
              <img ref={profileImgRef} src={data.img || ''} alt={data.nume || 'Scriitor'} />
            </div>
          </>
        )}
      </div>
      {/* Layout principal: stânga (info, galerie, prieteni), dreapta (postări) */}
      <div className="scriitor-main-layout">
        {/* Stânga */}
        <div className="scriitor-left-column" ref={leftColumnRef}>
          <div className="scriitor-left-sticky">
          {/* AvatarSearchBar eliminat de aici */}
          {/* Buton înapoi - stil ca fullscreen button */}
                     <button onClick={() => {
            const y = (location.state && location.state.from && typeof location.state.from.scrollY === 'number') ? location.state.from.scrollY : 0;
            const fromPath = (location.state && location.state.from && location.state.from.pathname) || '/scriitori';
            navigate(fromPath, { replace: true, state: { restoreScroll: y } });
          }}
             className="scriitor-back-btn-inline"
             onMouseEnter={(e) => {
               e.target.style.transform = 'translateX(-8px)';
             }}
             onMouseLeave={(e) => {
               e.target.style.transform = 'translateX(0)';
             }}
             title="Înapoi"
           >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
                     {/* Info personală */}
           <div className="scriitor-info-card">
             <h2>{data.nume || 'Scriitor'}</h2>
             {data.date && <div className="scriitor-dates">{data.date}</div>}
           </div>
                       {/* Prezentare */}
            <div className="scriitor-section">
              <div className="scriitor-section-title">Prezentare</div>
              <div className="scriitor-presentation">
                <ScriitorInfo info={data.info} name={name} />
                <div className="scriitor-presentation-extra">
                  {data.prezentare?.paragrafe?.map((paragraf, index) => (
                    <p key={index}>{paragraf}</p>
                  ))}
                </div>
                {/* Buton Citește tot în același chenar */}
                <div className="scriitor-presentation-actions">
                  <button
                    onClick={openBioModal}
                    className="vezi-mai-mult"
                    title="Citește toată bibliografia"
                  >
                    {/* <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 4h16v13H6.5A2.5 2.5 0 0 0 4 19.5V4z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg> */}
                    <span>Citește tot</span>
                  </button>
                </div>
              </div>
              {/* Butoane */}
              <div className="scriitor-buttons-container">
                <button
                  onClick={() => setShowChat(true)}
                  className="scriitor-chat-button"
                  title={`Vorbește cu ${data.nume}`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Vorbește cu {data.nume}</span>
                </button>
                
                <button
                  onClick={openReadAllModal}
                  className="scriitor-readall-button"
                  title="Vezi toate operele"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Vezi toate operele</span>
                </button>
              </div>
            </div>
          {/* Galerie */}
          <div className="scriitor-section">
            <div className="scriitor-section-title">Galerie</div>
            <div className="scriitor-gallery-grid">
              {gallery.slice(0, 9).map((img, idx) => (
                <div key={idx} className="scriitor-gallery-item">
                  <img
                    src={img}
                    alt="galerie"
                    onClick={() => openGalleryPreview(idx)}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            {/* Buton "Vezi toate" când sunt mai mult de 9 imagini */}
            {gallery.length > 9 && (
              <div className="scriitor-gallery-view-all">
                <button 
                  className="scriitor-gallery-view-all-btn"
                  onClick={() => {
                    const currentScrollY = window.scrollY;
                    setScrollPosition(currentScrollY);
                    setGalleryAllModalPage(0); // Reset to first page
                    setGalleryAllModalOpen(true);
                    document.body.style.overflow = 'hidden';
                    document.body.style.position = 'fixed';
                    document.body.style.top = `-${currentScrollY}px`;
                    document.body.style.width = '100%';
                  }}
                >
                  Vezi toate ({gallery.length})
                </button>
              </div>
            )}
          </div>
          {/* Prieteni - grid ca la galerie, hover cu nume */}
          <div className="scriitor-friends">
            <div className="scriitor-section-title">Prieteni</div>
            {/* Sus: număr prieteni */}
            <div className="scriitor-friends-count">
              {friendsCount} prieteni
            </div>
            <div className="scriitor-friends-grid">
              {friends.slice(0, 9).map((friend, idx) => (
                <div
                  key={friend.key}
                  className="scriitor-friend-item"
                  onClick={(e) => {
                    // Nu naviga dacă click-ul este pe butonul de ștergere
                    if (e.target.closest('.scriitor-friend-delete-btn')) {
                      return;
                    }
                    goToScriitor(friend.key);
                  }}
                >
                  {(isAdmin || isSemiAdmin) && (
                    <button
                      className="scriitor-friend-delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFriend(friend.key);
                      }}
                      title="Șterge prieten"
                    >
                      ×
                    </button>
                  )}
                  <img
                    src={friend.img}
                    alt={friend.name}
                  />
                  <div className="scriitor-friend-name">
                    {friend.name}
                  </div>
                </div>
              ))}
            </div>
            {/* Buton "Vezi toți prietenii" când sunt mai mult de 9 */}
            {friendsCount > 9 && (
              <div className="scriitor-friends-view-all">
                <button 
                  className="scriitor-friends-view-all-btn"
                  onClick={openAllFriendsModal}
                >
                  Vezi toți prietenii ({friendsCount})
                </button>
              </div>
            )}
          </div>
          </div>
        </div>
        {/* Dreapta: postări */}
        <div className="scriitor-right-column">
          <div style={{ marginBottom: '15px' }}>
            <div className="scriitor-posts-title">Postări</div>
          </div>
          <div className="scriitor-posts-container">
            {posts.map((post) => (
              <div key={post.id} className={`scriitor-post ${post.pin ? 'pinned' : ''} ${post.link ? 'clickable' : ''}`} onClick={() => post.link && !post.pinnedActions && goToPoezie(post.link)}>
                {post.pin && <div className="scriitor-post-pin">📌 Pin</div>}
                <div className="scriitor-post-date">{post.date}</div>
                {post.isPoem && post.descriere && (
                  <div className="scriitor-post-text">{post.descriere}</div>
                )}
                {post.isStory && post.descriere && (
                  <div className="scriitor-post-text">{post.descriere}</div>
                )}
                {!post.isPoem && !post.isStory && post.text && (
                  <div className="scriitor-post-text">{post.text}</div>
                )}
                
                {/* Butoane pentru postările pinned */}
                {post.pin && post.pinnedActions && (
                  <div className="scriitor-pinned-actions">
                    {post.pinnedActions.map((action, idx) => (
                      <button
                        key={idx}
                        className={`scriitor-pinned-action-btn scriitor-pinned-action-${action.type}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (action.link === '#') {
                            // Pentru comentariul operei (link gol)
                            alert('Pagina cu comentariul operei va fi disponibilă în curând!');
                          } else if (action.isPoem) {
                            // Pentru poeziile scurte, afișează popup-ul
                            openPoemPreview({
                              poemTitle: action.link,
                              isPoem: true
                            });
                          } else {
                            // Pentru citirea operei
                            navigate(action.link);
                          }
                        }}
                      >
                        <span className="scriitor-pinned-action-icon">{action.icon}</span>
                        <span className="scriitor-pinned-action-text">{action.text}</span>
                      </button>
                    ))}
                  </div>
                )}
                {post.isPoem ? (
                  <div className={`scriitor-poem-container ${post.poemImagesOnLeft === false ? 'scriitor-poem-reversed' : ''}`}>
                    {/* Stânga: imagini poezie */}
                    <div className="scriitor-poem-images">
                      {post.poemImages && post.poemImages.map((img, idx) => (
                        <div key={idx} className="scriitor-poem-image"
                          onClick={(e) => {
                            e.stopPropagation();
                            openPoemGallery(post.poemImages, idx);
                            setPoemGalleryCurrentIndex(idx);
                          }}
                        >
                          <img
                            src={img}
                            alt={`${post.poemTitle} ${idx + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    {/* Dreapta: text poezie */}
                    <div className="scriitor-poem-content">
                      <h3 className="scriitor-poem-title">
                        {post.poemTitle}
                      </h3>
                      <div style={{ marginBottom: '10px' }}>
                        <div className="scriitor-poem-text" style={{ whiteSpace: 'pre-wrap' }}>
                          {post.poemPreview || (post.poemText && post.poemText.length > 500 ? `${post.poemText.substring(0, 500)}...` : post.poemText) || 'Fără preview'}
                        </div>
                      </div>
                      {(() => {
                        // Calculează numărul de linii din preview
                        const previewText = post.poemPreview || (post.poemText && post.poemText.length > 500 ? post.poemText.substring(0, 500) : post.poemText) || '';
                        const previewLines = previewText ? previewText.split('\n').length : 0;
                        
                        // Calculează numărul de linii din textul complet
                        const fullText = post.poemText || '';
                        const fullLines = fullText ? fullText.split('\n').length : 0;
                        
                        // Afișează butonul doar dacă numărul de linii este diferit și există text complet
                        const shouldShowButton = fullText.length > 0 && previewLines !== fullLines;
                        
                        return shouldShowButton ? (
                          <div className="scriitor-poem-expand">
                            <button
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                openPoemPreview(post);
                              }}
                            >
                              Vezi tot
                            </button>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  </div>
                ) : post.isStory ? (
                  <div className={`scriitor-story-container ${post.storyImageOnLeft === false ? 'scriitor-story-reversed' : ''}`}>
                    {/* Stânga: imagine poveste (verticală, ca la poezie) */}
                    <div className="scriitor-story-image">
                      {post.image && (
                        <div className="scriitor-story-image-wrapper"
                          onClick={(e) => {
                            e.stopPropagation();
                            openPoemGallery([post.image], 0);
                            setPoemGalleryCurrentIndex(0);
                          }}
                        >
                          <img
                            src={post.image}
                            alt={`${post.storyTitle}`}
                          />
                        </div>
                      )}
                    </div>
                    {/* Dreapta: text poveste */}
                    <div className="scriitor-story-content">
                      <h3 className="scriitor-story-title">
                        {post.storyTitle || 'Poveste'}
                      </h3>
                      <div className="scriitor-story-text">
                        {expandedPoems[post.id]
                          ? post.storyText.split('\n\n').slice(0, 2).join('\n\n')
                          : post.storyText.split('\n\n').slice(0, 2).join('\n\n')
                        }
                      </div>
                      <div className="scriitor-story-expand">
                        <button
                          className="vezi-mai-mult"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPoemPreviewModal({ 
                              open: true, 
                              post: { 
                                title: post.storyTitle || post.poemTitle || "Poveste",
                                storyTitle: post.storyTitle,
                                poemTitle: post.poemTitle,
                                text: post.storyMoreText || post.storyText || post.poemText,
                                storyText: post.storyText,
                                poemText: post.poemText,
                                showReadAllButton: post.showReadAllButton,
                                readAllButtonText: post.readAllButtonText,
                                readAllButtonLink: post.readAllButtonLink
                              } 
                            });
                            // Salvează poziția de scroll curentă și previne scroll-ul pe body
                            const currentScrollY = window.scrollY;
                            setScrollPosition(currentScrollY);
                            document.body.style.overflow = 'hidden';
                            document.body.style.position = 'fixed';
                            document.body.style.top = `-${currentScrollY}px`;
                            document.body.style.width = '100%';
                          }}
                        >
                          Vezi mai mult
                        </button>
                        {post.showReadAllButton && post.readAllButtonLink && (
                          <button
                            className="citeste-tot"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(post.readAllButtonLink, { 
                                state: { from: location.pathname + location.search } 
                              });
                            }}
                          >
                            Citește tot
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : post.image && (
                  <div className="scriitor-post-image">
                    <img src={post.image} alt="postare" />
                  </div>
                )}
                <div className="scriitor-post-actions">
                  <span
                    onClick={e => { e.stopPropagation(); setLikesModal({ open: true, postId: post.id }); }}
                  >
                    {(() => {
                      const uniqueReactions = getUniqueReactions(post);
                      const reactionTypes = Object.keys(uniqueReactions);
                      const totalReactions = getFriendLikes(post).length;

                      if (totalReactions === 0) {
                        return '👍 0';
                      }

                      // Afișează doar o emoție de fiecare tip
                      const displayReactions = reactionTypes.map(type => getReactionEmoji(type)).join(' ');
                      return `${displayReactions} ${totalReactions}`;
                    })()}
                  </span>
                  <span onClick={e => { e.stopPropagation(); toggleComments(post.id); }}>💬 {post.comments.length} comentarii</span>
                  <span>🔗 Distribuie</span>
                </div>
                {/* Comentarii */}
                {expandedComments[post.id] && (
                  <div className="scriitor-comments">
                    {post.comments.length === 0 && <div className="scriitor-no-comments">Niciun comentariu încă.</div>}
                    {post.comments.map((c, idx) => {
                      const friendData = getScriitorByKey(c.key);
                      const commentOwnerId = c.createdBy || post.createdBy || data?.createdBy;
                      const canManageComment = canEditResource(commentOwnerId, { allowSemiAdminFullAccess: true });
                      const canDeleteComment = isAdmin;
                      return (
                      <div key={idx} className="scriitor-comment">
                        <img src={friendData?.img} alt={c.author} />
                        <span className="scriitor-comment-author" onClick={() => goToScriitor(c.key)}>{c.author}</span>
                        <span className="scriitor-comment-text">{c.text}</span>
                        {(canManageComment || canDeleteComment) && (
                          <div className="scriitor-comment-actions">
                            {canManageComment && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/admin?tab=scriitori&scriitor=${name}&action=edit-comment&postId=${post.id}&commentIndex=${idx}&from=scriitor`);
                                }}
                                className="scriitor-comment-edit-button"
                                title="Editează comentariu"
                              >
                                ✏️
                              </button>
                            )}
                            {canDeleteComment && (
                              <button
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  if (window.confirm('Ești sigur că vrei să ștergi acest comentariu?')) {
                                    try {
                                      await deleteCommentFromPost(name, post.id, idx);
                                      const updatedData = await fetchScriitor(name);
                                      if (updatedData) {
                                        setData(updatedData);
                                      }
                                    } catch (error) {
                                      console.error('Error deleting comment:', error);
                                      alert('Eroare la ștergerea comentariului');
                                    }
                                  }
                                }}
                                className="scriitor-comment-delete-button"
                                title="Șterge comentariu"
                              >
                                🗑️
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                      );
                    })}
                  </div>
                )}
                {(() => {
                  const postOwnerId = post.createdBy || data?.createdBy;
                  const canManagePost = canEditResource(postOwnerId, { allowSemiAdminFullAccess: true });
                  const canDeletePost = isAdmin;
                  if (!canManagePost) {
                    return null;
                  }
                  return (
                  <div className="scriitor-post-admin-actions">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin?tab=scriitori&scriitor=${name}&action=edit-post&postId=${post.id}&from=scriitor`);
                      }}
                      className={`scriitor-post-edit-button ${darkTheme ? 'dark-theme' : ''}`}
                      title="Editează postare"
                    >
                      ✏️ Editează
                    </button>
                    {canDeletePost && (
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (window.confirm('Ești sigur că vrei să ștergi această postare?')) {
                            try {
                              const { deletePostFromScriitor } = await import('../firebase/scriitoriService');
                              await deletePostFromScriitor(name, post.id);
                              const updatedData = await fetchScriitor(name);
                              if (updatedData) {
                                setData(updatedData);
                              }
                            } catch (error) {
                              console.error('Error deleting post:', error);
                              alert('Eroare la ștergerea postării');
                            }
                          }
                        }}
                        className="scriitor-post-delete-button"
                        title="Șterge postare"
                      >
                        🗑️ Șterge
                      </button>
                    )}
                  </div>
                  );
                })()}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Galerie Preview Modal */}
      {galleryPreviewIdx !== null && (
        <div
          className="scriitor-modal-overlay"
          onClick={closeGalleryPreview}
        >
          <div className="scriitor-gallery-modal">
            {/* Overview overlay for main gallery */}
            {galleryOverviewOpen && (
              <div className="scriitor-gallery-overview" onClick={(e) => { e.stopPropagation(); setGalleryOverviewOpen(false); }}>
                <div className="scriitor-gallery-overview-grid" ref={overviewGridRef} onClick={(e) => e.stopPropagation()}>
                  {gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className={`scriitor-gallery-overview-item ${idx === overviewIndex ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOverviewIndex(idx);
                        setGalleryCurrentIndex(idx);
                        setGalleryOverviewOpen(false);
                      }}
                    >
                      <img src={img} alt={`galerie ${idx + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <img
              src={gallery[galleryCurrentIndex]}
              alt="preview galerie"
              onClick={e => e.stopPropagation()}
            />
            {/* Buton închidere - în colțul imaginii */}
            <button
              onClick={closeGalleryPreview}
              className="scriitor-modal-close-btn"
              title="Închide galerie"
              tabIndex={0}
              onMouseDown={e => e.preventDefault()}
            >
              ×
            </button>
                         {/* Buton stânga */}
              {gallery.length > 1 && !galleryOverviewOpen && (
               <button
                 onClick={(e) => {
                   e.stopPropagation();
                   setGalleryCurrentIndex((prev) =>
                     prev === 0 ? gallery.length - 1 : prev - 1
                   );
                 }}
                 className="scriitor-nav-btn-left"
                 onMouseEnter={(e) => {
                   e.target.style.transform = 'translateY(-50%) translateX(-8px)';
                 }}
                 onMouseLeave={(e) => {
                   e.target.style.transform = 'translateY(-50%) translateX(0)';
                 }}
                 title="Imaginea anterioară"
               >
                 ‹
               </button>
             )}
                         {/* Buton dreapta */}
              {gallery.length > 1 && !galleryOverviewOpen && (
               <button
                 onClick={(e) => {
                   e.stopPropagation();
                   setGalleryCurrentIndex((prev) =>
                     prev === gallery.length - 1 ? 0 : prev + 1
                   );
                 }}
                 className="scriitor-nav-btn-right"
                 onMouseEnter={(e) => {
                   e.target.style.transform = 'translateY(-50%) translateX(8px)';
                 }}
                 onMouseLeave={(e) => {
                   e.target.style.transform = 'translateY(-50%) translateX(0)';
                 }}
                 title="Imaginea următoare"
               >
                 ›
               </button>
             )}
            {/* Indicator poziție */}
            {gallery.length > 1 && (
              <div className="scriitor-modal-indicators">
                {gallery.map((_, idx) => (
                  <div
                    key={idx}
                    className={`scriitor-modal-indicator ${idx === galleryCurrentIndex ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setGalleryCurrentIndex(idx);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {profilePreviewOpen && (
        <div
          className="scriitor-modal-overlay"
          onClick={closeProfilePreview}
        >
          <div className="scriitor-gallery-modal">
            <img
              src={data.img}
              alt={data.nume}
              onClick={e => e.stopPropagation()}
            />
            <button
              onClick={closeProfilePreview}
              className="scriitor-modal-close-btn"
              title="Închide"
              tabIndex={0}
              onMouseDown={e => e.preventDefault()}
            >
              ×
            </button>
          </div>
        </div>
      )}
      {likesModal.open && (
        <div
          className="scriitor-modal-overlay scriitor-modal-overlay-likes"
          onClick={() => setLikesModal({ open: false, postId: null })}
        >
          <div
            className="scriitor-likes-modal"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setLikesModal({ open: false, postId: null })}
              className="scriitor-modal-close-btn-likes"
              title="Închide tabela de like-uri"
            >×</button>
            <h3>Reacții la postare</h3>
            <table>
              <thead>
                <tr>
                  <th>Prieten</th>
                  <th>Reacție</th>
                </tr>
              </thead>
              <tbody>
                {getFriendLikes(posts.find(p => p.id === likesModal.postId)).map((like, idx) => (
                  <tr key={like.key}>
                    <td>
                      <img src={like.img} alt={like.name} />
                      <span>{like.name}</span>
                    </td>
                    <td>{getReactionEmoji(like.reaction)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {getFriendLikes(posts.find(p => p.id === likesModal.postId)).length === 0 && (
              <div className="scriitor-no-likes">Niciun prieten nu a reacționat încă.</div>
            )}
          </div>
        </div>
      )}

      {/* Modal Bibliografie - design ca la preview poezie */}
      {bioModalOpen && (
        <div
          className="scriitor-modal-overlay scriitor-modal-overlay-poem"
          onClick={closeBioModal}
        >
          <div
            className="scriitor-poem-preview-modal bio"
            onClick={e => e.stopPropagation()}
          >
            <div className="scriitor-poem-preview-header">
              <h2>Biografie - {data.nume}</h2>
              <button
                onClick={closeBioModal}
                className="scriitor-modal-close-btn-poem"
                title="Închide"
              >
                ×
              </button>
            </div>

            <div className="scriitor-poem-preview-content bio">
              <div className="scriitor-poem-preview-text bio">
                {(() => {
                  const source = data.biografie || data.prezentare?.bibliografie || '';
                  const paragraphs = typeof source === 'string' ? source.split(/\n\s*\n/) : [];
                  return paragraphs.map((p, idx) => (<p key={idx}>{p}</p>));
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal Preview Poezie */}
      {poemPreviewModal.open && (
        <div
          className="scriitor-modal-overlay scriitor-modal-overlay-poem"
          onClick={closePoemPreview}
        >
          <div
            className={`scriitor-poem-preview-modal ${poemPreviewModal.post.storyTitle || poemPreviewModal.post.storyText ? 'story' : ''}`}
            onClick={e => e.stopPropagation()}
          >
            {/* Header cu titlu centrat și buton închidere */}
            <div className="scriitor-poem-preview-header">
              <h2>
                {poemPreviewModal.post.poemTitle || poemPreviewModal.post.storyTitle}
              </h2>
              <button
                onClick={closePoemPreview}
                className="scriitor-modal-close-btn-poem"
                title="Închide preview"
              >
                ×
              </button>
            </div>

            {/* Conținut cu scroll - poezie sau poveste */}
                            <div className="scriitor-poem-preview-content">
                  <div className="scriitor-poem-preview-text">
                    {poemPreviewModal.post.text || poemPreviewModal.post.poemText || poemPreviewModal.post.storyText}
                    {poemPreviewModal.post.showReadAllButton && poemPreviewModal.post.readAllButtonLink && (
                      <div className="scriitor-poem-preview-actions">
                        <button
                          onClick={() => {
                            closePoemPreview();
                            navigate(poemPreviewModal.post.readAllButtonLink, { 
                              state: { from: location.pathname + location.search } 
                            });
                          }}
                          className="scriitor-poem-preview-read-btn"
                        >
                          Citește tot
                        </button>
                      </div>
                    )}
                  </div>
                </div>
          </div>
        </div>
      )}
      {/* Modal Galerie Poezie */}
      {poemGalleryModal.open && (
        <div
          className="scriitor-modal-overlay scriitor-modal-overlay-gallery"
          onClick={closePoemGallery}
        >
          <div className="scriitor-gallery-modal">
            {/* Overview overlay for poem gallery */}
            {galleryOverviewOpen && (
              <div className="scriitor-gallery-overview" onClick={(e) => { e.stopPropagation(); setGalleryOverviewOpen(false); }}>
                <div className="scriitor-gallery-overview-grid" ref={overviewGridRef} onClick={(e) => e.stopPropagation()}>
                  {poemGalleryModal.images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`scriitor-gallery-overview-item ${idx === overviewIndex ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOverviewIndex(idx);
                        setPoemGalleryCurrentIndex(idx);
                        setGalleryOverviewOpen(false);
                      }}
                    >
                      <img src={img} alt={`poezie ${idx + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <img
              src={poemGalleryModal.images[poemGalleryCurrentIndex]}
              alt="galerie poezie"
              onClick={e => e.stopPropagation()}
            />
            {/* Buton închidere - în colțul imaginii */}
            <button
              onClick={closePoemGallery}
              className="scriitor-modal-close-btn"
              title="Închide galerie"
              tabIndex={0}
              onMouseDown={e => e.preventDefault()}
            >
              ×
            </button>
                         {/* Buton stânga */}
              {poemGalleryModal.images.length > 1 && !galleryOverviewOpen && (
               <button
                 onClick={(e) => {
                   e.stopPropagation();
                   setPoemGalleryCurrentIndex((prev) =>
                     prev === 0 ? poemGalleryModal.images.length - 1 : prev - 1
                   );
                 }}
                 className="scriitor-nav-btn-left"
                 onMouseEnter={(e) => {
                   e.target.style.transform = 'translateY(-50%) translateX(-8px)';
                 }}
                 onMouseLeave={(e) => {
                   e.target.style.transform = 'translateY(-50%) translateX(0)';
                 }}
                 title="Imaginea anterioară"
               >
                 ‹
               </button>
             )}
                         {/* Buton dreapta */}
              {poemGalleryModal.images.length > 1 && !galleryOverviewOpen && (
               <button
                 onClick={(e) => {
                   e.stopPropagation();
                   setPoemGalleryCurrentIndex((prev) =>
                     prev === poemGalleryModal.images.length - 1 ? 0 : prev + 1
                   );
                 }}
                 className="scriitor-nav-btn-right"
                 onMouseEnter={(e) => {
                   e.target.style.transform = 'translateY(-50%) translateX(8px)';
                 }}
                 onMouseLeave={(e) => {
                   e.target.style.transform = 'translateY(-50%) translateX(0)';
                 }}
                 title="Imaginea următoare"
               >
                 ›
               </button>
             )}
            {/* Indicator poziție */}
            {poemGalleryModal.images.length > 1 && (
              <div className="scriitor-modal-indicators">
                {poemGalleryModal.images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`scriitor-modal-indicator ${idx === poemGalleryCurrentIndex ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPoemGalleryCurrentIndex(idx);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Chat Component */}
      {showChat && (
        <ScriitorChat
          scriitorKey={name}
          scriitorMeta={data}
          onClose={() => setShowChat(false)}
        />
      )}

      {/* AI Content Moderator */}
      {showModerator && (
        <AIContentModerator
          scriitor={data}
          allScriitori={scriitoriData}
          onModerate={handleModerate}
          onClose={() => setShowModerator(false)}
        />
      )}

      {/* Modal "Citește tot" */}
      {readAllModal && (
        <div
          className="scriitor-modal-overlay scriitor-modal-overlay-readall"
          onClick={closeReadAllModal}
        >
          <div
            className="scriitor-readall-modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="scriitor-readall-header">
              <h2>Opere Complete - {data.nume}</h2>
              <button
                onClick={closeReadAllModal}
                className="scriitor-modal-close-btn-poem"
                title="Închide"
              >
                ×
              </button>
            </div>
            
            <div className="scriitor-readall-content">
              {(() => {
                const opere = data.opere || {};
                
                // Definim ordinea și numele categoriilor pentru afișare
                const categoriiOrdonat = [
                  // Categorii principale pentru BAC (cele mai importante)
                  { key: 'opere de BAC', nume: 'Opere de BAC' },
                  { key: 'opere de BAC necanonice', nume: 'Opere de BAC necanonice' },
                  { key: 'poezii', nume: 'Poezii' },
                  { key: 'romane', nume: 'Romane' },
                  { key: 'nuvele', nume: 'Nuvele' },
                  { key: 'teatru', nume: 'Teatru' },
                  { key: 'proza', nume: 'Proză' },
                  
                  // Categorii literare secundare
                  { key: 'povești', nume: 'Povești' },
                  { key: 'povestiri', nume: 'Povestiri' },
                  { key: 'momente', nume: 'Momente și schițe' },
                  { key: 'literatura_copii', nume: 'Literatură copii'},
                  
                  // Categorii de non-ficțiune importante
                  { key: 'critica', nume: 'Critică literară' },
                  { key: 'eseuri', nume: 'Eseuri' },
                  { key: 'memorii', nume: 'Memorii' },
                  { key: 'autobiografii', nume: 'Autobiografii' },
                  { key: 'jurnal', nume: 'Jurnal intim' },
                  { key: 'scrisori', nume: 'Scrisori' },
                  
                  // Categorii științifice și academice
                  { key: 'filosofie', nume: 'Filosofie' },
                  { key: 'estetica', nume: 'Estetică' },
                  { key: 'studii', nume: 'Studii' },
                  { key: 'matematica', nume: 'Matematică' },
                  
                  // Categorii de traduceri și studii
                  { key: 'traduceri', nume: 'Traduceri' },
                  { key: 'antologii', nume: 'Antologii' },
                  { key: 'literatura_universala', nume: 'Literatură universală' },
                  { key: 'studii_straine', nume: 'Studii în limbi străine' },
                  
                  // Categorii de publicistică și jurnalism
                  { key: 'publicistica', nume: 'Publicistică' },
                  { key: 'reportaje', nume: 'Reportaje' },
                  { key: 'note_calatorie', nume: 'Note de calatorie' },
                  { key: 'conferinte', nume: 'Conferinţe'},
                  
                  // Categorii educaționale
                  { key: 'manuale', nume: 'Manuale' },
                  { key: 'lucrari_pedagogice', nume: 'Lucrări pedagogice' },
                  { key: 'broșuri', nume: 'Broșuri' },
                  
                  // Categorii de reviste și publicații
                  { key: 'reviste', nume: 'Reviste' },
                  { key: 'jurnale', nume: 'Jurnale' },
                  
                  // Categorii specializate
                  { key: 'parodii', nume: 'Parodii' },
                  { key: 'manuscrise', nume: 'Manuscrise' },
                  { key: 'discuri', nume: 'Discuri'},
                  { key: 'ecranizari', nume: 'Ecranizări' },
                  
                  // Categorii politice și administrative
                  { key: 'politica', nume: 'Politică' }
                ];
                
                return (
                  <>
                    {categoriiOrdonat.map(({ key, nume }) => {
                      const opereleCategorie = opere[key];
                      if (!opereleCategorie || opereleCategorie.length === 0) return null;
                      
                      return (
                        <div key={key} className="scriitor-readall-section">
                          <h3>{nume}</h3>
                          <ul>
                            {opereleCategorie.map((opera, index) => (
                              <li key={index}>{opera}</li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </>
                );
              })()}
            </div>
            

          </div>
        </div>
      )}
      
      {/* Modal cu toți prietenii */}
      {showAllFriendsModal && (
        <div
          className="scriitor-modal-overlay scriitor-modal-overlay-friends"
          onClick={closeAllFriendsModal}
        >
          <div
            className="scriitor-friends-modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="scriitor-friends-modal-header">
              <h2>Toți prietenii - {data.nume}</h2>
              <button
                onClick={closeAllFriendsModal}
                className="scriitor-modal-close-btn"
                title="Închide"
              >
                ×
              </button>
            </div>
            
            <div className="scriitor-friends-modal-content">
              <div className="scriitor-friends-modal-grid">
                {friends.map((friend, idx) => (
                  <div
                    key={friend.key}
                    className="scriitor-friends-modal-item"
                    onClick={(e) => {
                      // Nu naviga dacă click-ul este pe butonul de ștergere
                      if (e.target.closest('.scriitor-friend-delete-btn')) {
                        return;
                      }
                      closeAllFriendsModal();
                      goToScriitor(friend.key);
                    }}
                  >
                    {(isAdmin || isSemiAdmin) && (
                      <button
                        className="scriitor-friend-delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFriend(friend.key);
                          closeAllFriendsModal();
                        }}
                        title="Șterge prieten"
                      >
                        ×
                      </button>
                    )}
                    <img
                      src={friend.img}
                      alt={friend.name}
                    />
                    <div className="scriitor-friends-modal-name">
                      {friend.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal cu toate imaginile din galerie */}
      {galleryAllModalOpen && (
        <div
          className="scriitor-modal-overlay scriitor-modal-overlay-gallery-all"
          onClick={() => {
            setGalleryAllModalOpen(false);
            setGalleryImagePreviewOpen(false); // Close image preview when closing modal
            setGalleryAllModalPage(0); // Reset page when closing
            document.body.style.overflow = 'unset';
            document.body.style.position = 'unset';
            document.body.style.top = 'unset';
            document.body.style.width = 'unset';
            window.scrollTo(0, scrollPosition);
          }}
        >
          <div
            className="scriitor-gallery-all-modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="scriitor-gallery-all-modal-header">
              <h2>Galerie - {data.nume}</h2>
              <button
                onClick={() => {
                  setGalleryAllModalOpen(false);
                  setGalleryImagePreviewOpen(false); // Close image preview when closing modal
                  setGalleryAllModalPage(0); // Reset page when closing
                  document.body.style.overflow = 'unset';
                  document.body.style.position = 'unset';
                  document.body.style.top = 'unset';
                  document.body.style.width = 'unset';
                  window.scrollTo(0, scrollPosition);
                }}
                className="scriitor-modal-close-btn"
                title="Închide"
              >
                ×
              </button>
            </div>
            
            <div className={`scriitor-gallery-all-modal-content ${gallery.length > 15 ? 'no-scroll' : ''}`}>
              <div className="scriitor-gallery-all-modal-grid">
                {(() => {
                  const imagesPerPage = 15;
                  const totalPages = Math.ceil(gallery.length / imagesPerPage);
                  const startIndex = galleryAllModalPage * imagesPerPage;
                  const endIndex = startIndex + imagesPerPage;
                  const currentPageImages = gallery.slice(startIndex, endIndex);
                  
                  return currentPageImages.map((img, localIdx) => {
                    const globalIdx = startIndex + localIdx;
                    return (
                      <div
                        key={globalIdx}
                        className="scriitor-gallery-all-modal-item"
                        onClick={() => {
                          setGalleryImagePreviewIndex(globalIdx);
                          setGalleryImagePreviewOpen(true);
                          // Pe mobile, permite scroll-ul în overlay
                          if (window.innerWidth <= 768) {
                            document.body.style.overflow = '';
                            document.body.style.position = '';
                            document.body.style.top = '';
                            document.body.style.width = '';
                          }
                        }}
                      >
                        <img
                          src={img}
                          alt={`Galerie ${globalIdx + 1}`}
                          loading="lazy"
                        />
                        {isAdmin && (
                          <button
                            className="scriitor-gallery-delete-button"
                            onClick={(e) => handleDeleteGalleryImage(globalIdx, e)}
                            title="Șterge imagine"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>
              {gallery.length > 15 && (
                <div className="scriitor-gallery-all-modal-pagination">
                  <button
                    className="scriitor-gallery-pagination-btn"
                    onClick={() => setGalleryAllModalPage(prev => Math.max(0, prev - 1))}
                    disabled={galleryAllModalPage === 0}
                  >
                    ← Anterior
                  </button>
                  <span className="scriitor-gallery-pagination-info">
                    Pagina {galleryAllModalPage + 1} din {Math.ceil(gallery.length / 15)}
                  </span>
                  <button
                    className="scriitor-gallery-pagination-btn"
                    onClick={() => setGalleryAllModalPage(prev => prev + 1)}
                    disabled={galleryAllModalPage >= Math.ceil(gallery.length / 15) - 1}
                  >
                    Următor →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Modal overlay preview imagine peste galerie */}
      {galleryImagePreviewOpen && galleryAllModalOpen && (
        <div 
          className="scriitor-gallery-image-preview-overlay"
          onClick={() => {
            setGalleryImagePreviewOpen(false);
            // Restaurează body-ul pe mobile
            if (window.innerWidth <= 768) {
              const currentScrollY = window.scrollY;
              setScrollPosition(currentScrollY);
              document.body.style.overflow = 'hidden';
              document.body.style.position = 'fixed';
              document.body.style.top = `-${currentScrollY}px`;
              document.body.style.width = '100%';
            }
          }}
        >
          <div 
            className="scriitor-gallery-image-preview-modal"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setGalleryImagePreviewOpen(false);
                // Restaurează body-ul pe mobile
                if (window.innerWidth <= 768) {
                  const currentScrollY = window.scrollY;
                  setScrollPosition(currentScrollY);
                  document.body.style.overflow = 'hidden';
                  document.body.style.position = 'fixed';
                  document.body.style.top = `-${currentScrollY}px`;
                  document.body.style.width = '100%';
                }
              }}
              className="scriitor-gallery-image-preview-close"
              title="Închide"
            >
              ×
            </button>
            {isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteGalleryImage(galleryImagePreviewIndex, e);
                }}
                className="scriitor-gallery-image-preview-delete"
                title="Șterge imagine"
              >
                🗑️
              </button>
            )}
            <div className="scriitor-gallery-image-preview-content">
              <img
                src={gallery[galleryImagePreviewIndex]}
                alt={`Galerie ${galleryImagePreviewIndex + 1}`}
              />
            </div>
            {/* Buton stânga */}
            {gallery.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setGalleryImagePreviewIndex(prev => prev > 0 ? prev - 1 : gallery.length - 1);
                }}
                className="scriitor-gallery-image-preview-nav-btn-left"
                title="Imaginea anterioară"
              >
                ‹
              </button>
            )}
            {/* Buton dreapta */}
            {gallery.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setGalleryImagePreviewIndex(prev => prev < gallery.length - 1 ? prev + 1 : 0);
                }}
                className="scriitor-gallery-image-preview-nav-btn-right"
                title="Imaginea următoare"
              >
                ›
              </button>
            )}
            {/* Indicator poziție - dots */}
            {gallery.length > 1 && (
              <div className="scriitor-gallery-image-preview-indicators">
                {gallery.map((_, idx) => (
                  <div
                    key={idx}
                    className={`scriitor-gallery-image-preview-indicator ${idx === galleryImagePreviewIndex ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setGalleryImagePreviewIndex(idx);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {(isAdmin || isSemiAdmin) && (
        <div className="admin-buttons-container">
          <button
            onClick={() => navigate(`/admin?tab=scriitori&scriitor=${name}&view=posts&from=scriitor`)}
            className={`admin-manage-button ${darkTheme ? 'dark-theme' : ''}`}
            title="Gestionează postări"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"></path>
            </svg>
          </button>
          <button
            onClick={() => setShowModerator(true)}
            className={`admin-moderate-button ${darkTheme ? 'dark-theme' : ''}`}
            title="Moderare AI - Verifică comentarii și reacții"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </button>
          <button
            onClick={() => navigate(`/admin?tab=scriitori&scriitor=${name}&action=add-post&from=scriitor`)}
            className={`admin-add-button ${darkTheme ? 'dark-theme' : ''}`}
            title="Adaugă postare nouă"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      )}
      <ScrollToTop />
    </div>
  );
};

export default Scriitor; 
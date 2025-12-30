import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Layout from '../assets/Layout';
import { getScriitoriData } from '../firebase/scriitoriService';
import { getQuestionsForOpera, getGenericQuestions } from '../data/operaQuestions';
import { OPERA_DETAILS } from '../data/operaDetails';
import { curenteById } from '../data/curente';
import '../styles/style.scss';

// Date pentru poeziile scurte (copiate din Scriitor.jsx)

const shortPoems = {
  'plumb': {
    titlu: 'Plumb',
    autor: 'George Bacovia',
    data: '1916',
    text: `
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
  'flori-de-mucigai': {
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
  'eu-nu-strivesc-corola-de-minuni-a-lumii': {
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
  'leoaica-tanara-iubirea': {
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
  'aci-sosi-pe-vremuri': {
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
  'in-gradina-ghetsimani': {
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

const slugify = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

// Mapare simplă titlu -> jsonFile (ca în bibliotecă)
const OPERA_JSON_FILES = {
  'Povestea lui Harap-Alb': 'harap-alb',
  'Povestea lui Harap Alb': 'harap-alb',
  'Moara cu noroc': 'moara-cu-noroc',
  'Ion': 'ion',
  'O scrisoare pierdută': 'o-scrisoare-pierduta',
  'Baltagul': 'baltagul',
  'Mara': 'mara',
  'Ultima noapte de dragoste, întaia noapte de razboi': 'ultima-noapte-dragoste',
  'Luceafărul': 'luceafarul',
  'Plumb': 'plumb',
  'Eu nu strivesc corola de minuni a lumii': 'eu-nu-strivesc-corola',
  'Leoaică tânără, iubirea': 'leoaica-tanara-iubirea',
  'Flori de mucigai': 'flori-de-mucigai',
  'Enigma Otiliei': 'enigma-otiliei',
  'Riga crypto si lapona enigel': 'riga-crypto',
  'Aci sosi pe vremuri': 'aci-sosi-pe-vremuri',
  'În Grădina Ghetsimani': 'gradina-ghetsimani',
  'Morometii': 'morometii',
  'Iona': 'iona',
  'Formele fara fond': 'critice',
  'Alexandru Lăpușneanu': 'alexandru-lapusneanul',
  'Testament': 'testament',
  'Răscoala': 'rascoala',
  'Hanul Ancuţei': 'hanul-ancutei',
  'Maytreyi': 'maitreyi',
  'Nunta in cer': 'nunta-in-cer',
  'Amintiri din copilărie': 'amintiri-din-copilarie',
  'Pădurea spânzuraților': 'padurea-spanzuratilor',
  'Patul lui Procust': 'patul-lui-procust',
  'Popa Tanda': 'popa-tanda',
  'Ursul păcălit de vulpe': 'ursul-pacalit-de-vulpe',
  'Viață ca o pradă': 'viata-ca-o-prada',
  'Păcală în satul lui': 'pacala-in-satul-lui',
};

// Fallback imagine pentru opera (bazat pe titlu), folosită când navigarea prin taburi
// pierde location.state și nu mai avem `effectiveOpera.img` în memorie
const OPERA_IMAGES_BY_TITLE = {
  'Povestea lui Harap-Alb': '/opere/Harap-Alb.webp',
  'Moara cu noroc': '/opere/moara-cu-noroc.webp',
  'Ion': '/opere/Ion.webp',
  'Enigma Otiliei': '/opere/enigma-otiliei.webp',
  'Luceafărul': '/opere/Luceafarul.webp',
  'Plumb': '/opere/plumb.webp',
  'O scrisoare pierdută': '/opere/scrisoare-pierduta.webp',
  'Baltagul': '/opere/baltagul.webp',
  'Ultima noapte de dragoste, întaia noapte de razboi': '/opere/ultima-noapte.webp',
  'Flori de mucigai': '/opere/flori-mucigai.webp',
  'Eu nu strivesc corola de minuni a lumii': '/opere/corola_minuni.webp',
  'Riga crypto si lapona enigel': '/opere/riga-crypto.webp',
  'Morometii': '/opere/morometii.webp',
  'Leoaică tânără, iubirea': '/opere/leoaica-iubirea.webp',
  'Iona': '/opere/iona.webp',
  'Formele fara fond': '/opere/formele.webp',
  'Mara': '/opere/mara.webp',
  'Testament': '/opere/testament-orizontala.webp',
  'Amintiri din copilărie': '/opere/amintiri-copil.webp',
  'Răscoala': '/opere/rascoala.webp',
  'Hanul Ancuţei': '/opere/hanul-ancutei.webp',
  'Maytreyi': '/opere/maytreyi.webp',
  'Alexandru Lăpușneanu': '/opere/lapusneanu.webp',
  'Aci sosi pe vremuri': '/opere/aci-sosi.webp',
  'În Grădina Ghetsimani': '/opere/gradina-ghetsimani.webp',
  'Păcală în satul lui': '/opere/pacala-in-satul-lui.webp',
};

export default function Opera() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('prezentare');
  const [prevTab, setPrevTab] = useState('prezentare');
  const [poemModal, setPoemModal] = useState({ open: false, poem: null });
  const [scriitoriData, setScriitoriData] = useState({});
  const tabsOrder = [
    'prezentare',
    'analiza',
    'comentariu',
    'curent',
    'titlu',
    'rezumat',
    'simboluri',
    'videoclip',
    'proiect',
    'intrebari',
  ];
  const tabsLabels = {
    prezentare: 'Prezentare',
    analiza: 'Analiză',
    comentariu: 'Comentarii',
    curent: 'Curent',
    titlu: 'Titlu',
    rezumat: 'Rezumat',
    simboluri: 'Simboluri',
    videoclip: 'Videoclip',
    proiect: 'Proiect',
    intrebari: 'Întrebări',
  };
  const [slideDir, setSlideDir] = useState('slide-in-right');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [selectedCommentPack, setSelectedCommentPack] = useState(null); // 'gratis' | 'basic' | 'pro' | 'premium'
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(null); // 1..4 | 'all'

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkTheme);
    localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (prevTab === activeTab) return;
    const prevIdx = tabsOrder.indexOf(prevTab);
    const nextIdx = tabsOrder.indexOf(activeTab);
    setSlideDir(nextIdx > prevIdx ? 'slide-in-right' : 'slide-in-left');
    setPrevTab(activeTab);
  }, [activeTab]);

  // Scroll to top when component mounts (when opening an opera)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Load scriitori data from Firebase
  useEffect(() => {
    const loadScriitoriData = async () => {
      try {
        const data = await getScriitoriData();
        setScriitoriData(data);
      } catch (error) {
        console.error('Error loading scriitori data:', error);
      }
    };
    loadScriitoriData();
  }, []);

  const initialOpera = location.state && location.state.opera ? location.state.opera : null;

  // Slug din URL sau derivat din titlu
  const currentSlug = useMemo(() => {
    return (params && params.slug) ? params.slug : slugify(initialOpera && initialOpera.titlu ? initialOpera.titlu : '');
  }, [params, initialOpera]);

  // Detalii opera direct din slug (preferat când nu avem location.state)
  const detailsFromSlug = useMemo(() => {
    if (!currentSlug) return null;
    // direct: cheia din OPERA_DETAILS egală cu slug
    if (OPERA_DETAILS[currentSlug]) return OPERA_DETAILS[currentSlug];
    // fallback: caută în OPERA_DETAILS după normalizarea titlului către slug
    for (const [key, details] of Object.entries(OPERA_DETAILS)) {
      const detSlug = slugify(details.titlu);
      if (detSlug === currentSlug) return details;
    }
    return null;
  }, [currentSlug]);

  const effectiveOpera = useMemo(() => {
    if (initialOpera) return initialOpera;
    if (detailsFromSlug) {
      const title = detailsFromSlug.titlu || 'Operă';
      return {
        titlu: title,
        autor: detailsFromSlug.autor || '',
        data: detailsFromSlug.data || '',
        img: OPERA_IMAGES_BY_TITLE[title] || '',
        categorie: detailsFromSlug.categorie || '',
        canonic: detailsFromSlug.canonic,
      };
    }
    const titleFromSlug = currentSlug ? currentSlug.replace(/-/g, ' ') : '';
    return {
      titlu: titleFromSlug ? titleFromSlug.replace(/\b\w/g, (m) => m.toUpperCase()) : 'Operă',
      autor: '',
      data: '',
      img: '',
      categorie: '',
      canonic: undefined
    };
  }, [initialOpera, detailsFromSlug, currentSlug]);

  const bookSlug = useMemo(() => {
    // întâi din titlu mapat ca înainte
    const operaTitle = effectiveOpera && effectiveOpera.titlu ? effectiveOpera.titlu : '';
    const byTitle = OPERA_JSON_FILES[operaTitle] || null;
    if (byTitle) return byTitle;
    // apoi, dacă avem un slug care corespunde unei chei din detalii, folosește-l
    if (detailsFromSlug) return currentSlug;
    return null;
  }, [effectiveOpera, detailsFromSlug, currentSlug]);

  const operaDetails = useMemo(() => {
    // Preferă detalii obținute din slug
    if (detailsFromSlug) return detailsFromSlug;
    const operaTitle = effectiveOpera && effectiveOpera.titlu ? effectiveOpera.titlu : '';
    const jsonFile = OPERA_JSON_FILES[operaTitle];

    if (!jsonFile) {
      for (const [key, details] of Object.entries(OPERA_DETAILS)) {
        if (details.titlu === operaTitle) return details;
      }
      return null;
    }

    for (const [key, details] of Object.entries(OPERA_DETAILS)) {
      if (key === jsonFile) return details;
    }
    return null;
  }, [detailsFromSlug, effectiveOpera]);

  const [activeCharacterIndex, setActiveCharacterIndex] = useState(null);

  const handleRead = () => {
    if (isPoemWithPopup) {
      // For poems, show popup instead of navigating
      openPoemModal(isPoemWithPopup);
    } else if (bookSlug) {
      navigate(`/carte/${bookSlug}`);
    }
  };

  const scrollToContent = () => {
    const contentElement = document.getElementById('opera-content');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Functions for poem modal
  const blockScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const unblockScroll = () => {
    document.body.style.overflow = 'unset';
  };

  const openPoemModal = (poemKey) => {
    if (shortPoems[poemKey]) {
      setPoemModal({ open: true, poem: shortPoems[poemKey] });
      blockScroll();
    }
  };

  const closePoemModal = () => {
    setPoemModal({ open: false, poem: null });
    unblockScroll();
  };

  // Check if current opera is a poem that should show popup
  const isPoemWithPopup = useMemo(() => {
    const poemKeys = ['plumb', 'testament', 'flori-de-mucigai', 'eu-nu-strivesc-corola-de-minuni-a-lumii', 'leoaica-tanara-iubirea', 'aci-sosi-pe-vremuri', 'in-gradina-ghetsimani'];
    
    // Verifică prin titlul din effectiveOpera
    const operaTitle = effectiveOpera && effectiveOpera.titlu ? effectiveOpera.titlu.toLowerCase() : '';
    
    for (const key of poemKeys) {
      const poem = shortPoems[key];
      if (poem && poem.titlu.toLowerCase() === operaTitle) {
        return key;
      }
    }
    
    // Verifică prin operaDetails dacă există
    if (operaDetails && operaDetails.titlu) {
      const detailsTitle = operaDetails.titlu.toLowerCase();
      for (const key of poemKeys) {
        const poem = shortPoems[key];
        if (poem && poem.titlu.toLowerCase() === detailsTitle) {
          return key;
        }
      }
    }
    
    return false;
  }, [effectiveOpera, operaDetails]);

  // Asigură imaginea de fundal: preferă `effectiveOpera.img` (din navigation state),
  // altfel folosește fallback după titlu
  // Încarcă/salvează imaginea în sessionStorage pentru persistență între tab switch
  const storedImg = useMemo(() => {
    try {
      return currentSlug ? (sessionStorage.getItem(`opera.img.${currentSlug}`) || '') : '';
    } catch {
      return '';
    }
  }, [currentSlug]);

  useEffect(() => {
    if (effectiveOpera && effectiveOpera.img && currentSlug) {
      try { sessionStorage.setItem(`opera.img.${currentSlug}`, effectiveOpera.img); } catch {}
    }
  }, [effectiveOpera, currentSlug]);

  const fallbackImg = (effectiveOpera && effectiveOpera.titlu) ? OPERA_IMAGES_BY_TITLE[effectiveOpera.titlu] : '';
  const resolvedImg = effectiveOpera.img || storedImg || fallbackImg || '';
  const bgImage = resolvedImg ? resolvedImg.replace('/public', '') : '';

  // Preload pentru a reafișa rapid după revenirea în tab
  useEffect(() => {
    if (!bgImage) return;
    const img = new Image();
    img.src = bgImage;
  }, [bgImage]);

  // Găsește profilul autorului (cheie și poză) după nume
  const authorProfile = useMemo(() => {
    const authorName = (operaDetails && operaDetails.autor) || (effectiveOpera && effectiveOpera.autor) || '';
    if (!authorName || Object.keys(scriitoriData).length === 0) return null;

    const normalize = (text) =>
      (text || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .trim();

    const normalizedTarget = normalize(authorName);

    for (const [key, data] of Object.entries(scriitoriData)) {
      if (normalize(data.nume) === normalizedTarget) {
        return { key, img: data.img, nume: data.nume };
      }
    }
    return null;
  }, [operaDetails, effectiveOpera, scriitoriData]);

  const getCharacterDescription = (name) => {
    if (!operaDetails) return '';
    if (operaDetails.personajeDetalii && operaDetails.personajeDetalii[name]) {
      return operaDetails.personajeDetalii[name];
    }
    return `Caracterizarea pentru ${name} va fi disponibilă în curând.`;
  };

  // Helper function pentru a renderiza o secțiune de rezumat (folosită pentru toate secțiunile)
  const renderRezumatSectiune = (sectiune, sectIndex) => (
    <div key={sectIndex} className="rezumat-subsection">
      {sectiune.subtitlu && (
        <h4 className="rezumat-subtitle">{sectiune.subtitlu}</h4>
      )}
      {sectiune.text && (
        <p className="rezumat-text">{sectiune.text}</p>
      )}
      {sectiune.versuri && (
        <div className="rezumat-versuri">
          {sectiune.versuri.map((vers, index) => (
            <p key={index} className="rezumat-vers">
              {vers}
            </p>
          ))}
        </div>
      )}
      {sectiune.listaProbe && (
        <ul className="rezumat-list">
          {sectiune.listaProbe.map((item, index) => (
            <li key={index} className="rezumat-list-item">{item}</li>
          ))}
        </ul>
      )}
      {sectiune.textFinal && (
        <p className="rezumat-text">{sectiune.textFinal}</p>
      )}
    </div>
  );

  const renderRezumatSectionContent = (sectionData) => {
    if (!sectionData) return null;

    if (typeof sectionData === 'object' && sectionData.sectiuni) {
      return (
        <>
          {sectionData.sectiuni.map((sectiune, sectIndex) => renderRezumatSectiune(sectiune, sectIndex))}
        </>
      );
    }

    if (typeof sectionData === 'object') {
      return (
        <>
          {sectionData.text && (
            <p className="rezumat-text">{sectionData.text}</p>
          )}
          {sectionData.listaProbe && (
            <ul className="rezumat-list">
              {sectionData.listaProbe.map((item, index) => (
                <li key={index} className="rezumat-list-item">{item}</li>
              ))}
            </ul>
          )}
          {sectionData.textFinal && (
            <p className="rezumat-text">{sectionData.textFinal}</p>
          )}
        </>
      );
    }

    return <p className="rezumat-text">{sectionData}</p>;
  };

  const isPoemRezumatStructure = (rezumatData) => {
    if (!rezumatData || typeof rezumatData !== 'object') return false;
    return ['contextGeneral', 'analizaStrofaI', 'analizaStrofaII', 'analizaStrofaIII', 'analizaStrofaIV','analizaStrofaV', 'analizaStrofaVI', 'elementeSpecifice', 'concluzie'].some(
      (key) => rezumatData[key]
    );
  };

  const renderPoemSectiuni = (sectiuni) => {
    if (!Array.isArray(sectiuni)) return null;
    return sectiuni.map((sectiune, index) => (
      <div key={index} className="rezumat-subsection">
        {sectiune.subtitlu && <h4 className="rezumat-subtitle">{sectiune.subtitlu}</h4>}
        {sectiune.text && <p className="rezumat-text">{sectiune.text}</p>}
      </div>
    ));
  };

  const renderPoemVersuri = (versuri) => {
    if (!Array.isArray(versuri)) return null;
    return (
      <div className="rezumat-versuri">
        {versuri.map((vers, index) => (
          <div key={index} className="rezumat-subsection">
            <p className="rezumat-vers">{vers.text}</p>
            {vers.analiza && <p className="rezumat-text">{vers.analiza}</p>}
          </div>
        ))}
      </div>
    );
  };

  const renderPoemRezumatBlock = (rezumatData, blockIndex) => (
    <div key={blockIndex} className="rezumat-block">
      {rezumatData.contextGeneral && (
        <div className="rezumat-section">
          <h3 className="rezumat-section-title">Context general</h3>
          {renderPoemSectiuni(rezumatData.contextGeneral.sectiuni)}
        </div>
      )}
      {rezumatData.analizaStrofaI && (
        <div className="rezumat-section">
          <h3 className="rezumat-section-title">{rezumatData.analizaStrofaI.titlu || 'Analiza strofa I'}</h3>
          {renderPoemVersuri(rezumatData.analizaStrofaI.versuri)}
        </div>
      )}
      {rezumatData.analizaStrofaII && (
        <div className="rezumat-section">
          <h3 className="rezumat-section-title">{rezumatData.analizaStrofaII.titlu || 'Analiza strofa II'}</h3>
          {renderPoemVersuri(rezumatData.analizaStrofaII.versuri)}
        </div>
      )}
      {rezumatData.analizaStrofaIII && (
        <div className="rezumat-section">
          <h3 className="rezumat-section-title">{rezumatData.analizaStrofaIII.titlu || 'Analiza strofa III'}</h3>
          {renderPoemVersuri(rezumatData.analizaStrofaIII.versuri)}
        </div>
      )}
      {rezumatData.analizaStrofaIV && (
        <div className="rezumat-section">
          <h3 className="rezumat-section-title">{rezumatData.analizaStrofaIV.titlu || 'Analiza strofa IV'}</h3>
          {renderPoemVersuri(rezumatData.analizaStrofaIV.versuri)}
        </div>
      )}
      {rezumatData.analizaStrofaV && (
        <div className="rezumat-section">
          <h3 className="rezumat-section-title">{rezumatData.analizaStrofaV.titlu || 'Analiza strofa V'}</h3>
          {renderPoemVersuri(rezumatData.analizaStrofaV.versuri)}
        </div>
      )}
      {rezumatData.analizaStrofaVI && (
        <div className="rezumat-section">
          <h3 className="rezumat-section-title">{rezumatData.analizaStrofaVI.titlu || 'Analiza strofa VI'}</h3>
          {renderPoemVersuri(rezumatData.analizaStrofaVI.versuri)}
        </div>
      )}
      {rezumatData.elementeSpecifice && (
        <div className="rezumat-section">
          <h3 className="rezumat-section-title">{rezumatData.elementeSpecifice.subtitlu || 'Elemente specifice'}</h3>
          {Array.isArray(rezumatData.elementeSpecifice.sectiuni) &&
            rezumatData.elementeSpecifice.sectiuni.map((sectiune, index) => (
              <div key={index} className="rezumat-subsection">
                {sectiune.nume && <h4 className="rezumat-subtitle">{sectiune.nume}</h4>}
                {Array.isArray(sectiune.lista) && (
                  <ul className="rezumat-list">
                    {sectiune.lista.map((item, idx) => (
                      <li key={idx} className="rezumat-list-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </div>
      )}
      {rezumatData.concluzie && rezumatData.concluzie.text && (
        <div className="rezumat-section">
          <h3 className="rezumat-section-title">Concluzie</h3>
          <p className="rezumat-text">{rezumatData.concluzie.text}</p>
        </div>
      )}
    </div>
  );

  const renderRezumatBlock = (rezumatData, blockIndex, totalBlocks) => {
    if (!rezumatData) return null;

    if (isPoemRezumatStructure(rezumatData)) {
      return renderPoemRezumatBlock(rezumatData, blockIndex);
    }

    const sectionsConfig = [
      { key: 'incipit', title: 'Incipit' },
      { key: 'intriga', title: 'Intriga' },
      { key: 'desfasurarea', title: 'Desfășurarea acțiunii' },
      { key: 'punctulCulminant', title: 'Punctul culminant' },
      { key: 'deznodamant', title: 'Deznodământ' },
    ];

    return (
      <div key={blockIndex} className="rezumat-block">
        {totalBlocks > 1 && (
          <h3 className="rezumat-section-title">{`Rezumat - Volumul ${blockIndex + 1}`}</h3>
        )}
        {sectionsConfig.map(({ key, title }) => {
          const sectionValue = rezumatData?.[key];
          if (!sectionValue) return null;
          return (
            <div key={key} className="rezumat-section">
              <h3 className="rezumat-section-title">{title}</h3>
              {renderRezumatSectionContent(sectionValue)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderTabContent = () => {
    if (!operaDetails) {
      return (
        <div className="opera-no-details">
          <h3>Informații detaliate în curând</h3>
          <p>Lucrăm la completarea informațiilor pentru această operă. Revino mai târziu pentru analize detaliate, comentarii și resurse suplimentare.</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'prezentare':
        return (
          <div className="opera-tab-content">
            <div className="opera-description">
              <h3>Descriere</h3>
              <p>{operaDetails.descriere}</p>
            </div>

            <div className="opera-themes">
              <h3>Teme principale</h3>
              <ul>
                {operaDetails.teme.map((tema, index) => (
                  <li key={index}>{tema}</li>
                ))}
              </ul>
            </div>

            <div className="opera-characters">
              <h3>Personaje principale</h3>
              <ul>
                {operaDetails.personaje.map((personaj, index) => {
                  const isActive = activeCharacterIndex === index;
                  const descrierePersonaj = getCharacterDescription(personaj);
                  return (
                    <li
                      key={index}
                      className={`opera-character-item${isActive ? ' is-active' : ''}`}
                      onClick={() => setActiveCharacterIndex(isActive ? null : index)}
                    >
                      <button
                        type="button"
                        className="opera-character-button"
                      >
                        <span className="opera-character-name">{personaj}</span>
                        <span className="opera-character-toggle">{isActive ? '−' : '+'}</span>
                      </button>
                      {isActive && descrierePersonaj && (
                        <div className="opera-character-description">
                          {descrierePersonaj}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );

      case 'analiza':
        return (
          <div className="opera-tab-content">
            <div className="opera-analysis">
              <h3>Analiză literară</h3>
              <p>{operaDetails.analiza}</p>
            </div>

            <div className="opera-quotes">
              <h3>Citate importante</h3>
              <div className="quotes-list">
                {operaDetails.citate.map((citat, index) => (
                  <blockquote key={index} className="opera-quote">
                    {citat}
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        );

      case 'comentariu': {
        const title =
          (operaDetails && operaDetails.titlu) ||
          (effectiveOpera && effectiveOpera.titlu) ||
          '';
        const author =
          (operaDetails && operaDetails.autor) ||
          (effectiveOpera && effectiveOpera.autor) ||
          '';
        // Normalize title for search - replace "Harap Alb" with "harap-alb"
        let searchTitle = title;
        if (title && title.toLowerCase().includes('harap alb')) {
          searchTitle = title.replace(/harap alb/gi, 'harap-alb').toLowerCase();
        } else {
          searchTitle = title.toLowerCase();
        }
        const q = searchTitle || author.toLowerCase() || '';

        return (
          <div className="opera-tab-content">
            <div className="opera-comment-content">
              <h3>Comentarii</h3>
              <p>
                Deschide pagina dedicată de comentarii pentru această operă. Vei găsi acolo comentarii structurate pe niveluri și planuri.
              </p>
              <button
                className="opera-curent-link"
                onClick={() =>
                  navigate(`/comentarii${q ? `?q=${encodeURIComponent(q)}` : ''}`, {
                    state: {
                      from: { pathname: location.pathname, scrollY: window.scrollY },
                    },
                  })
                }
              >
                Vezi comentariile
              </button>
            </div>
          </div>
        );
      }

      case 'curent': {
        const curentId = operaDetails.curent || null;
        const curentData = curentId ? curenteById[curentId] : null;
        const curentText = curentData
          ? curentData.descriere
          : 'Curentul literar al acestei opere va fi explicat în curând, cu legături directe către pagina de curent.';
        return (
          <div className="opera-tab-content">
            <div className="opera-analysis">
              <h3>Curent literar</h3>
              <p>{curentText}</p>
              {curentId && (
                <button
                  className="opera-curent-link"
                  onClick={() =>
                    navigate(`/curent/${curentId}`, {
                      state: {
                        from: { pathname: location.pathname, scrollY: window.scrollY },
                      },
                    })
                  }
                >
                  Vezi pagina curentului
                </button>
              )}
            </div>
          </div>
        );
      }

      case 'titlu': {
        const titluSection = operaDetails.titluSection;
        const fallbackText = `Titlul „${effectiveOpera.titlu}” funcționează ca nucleu semantic al operei. Semnificația exactă diferă în funcție de interpretare, dar indică motivele principale, direcția tematică și statutul personajelor.`;
        const puncte = Array.isArray(titluSection?.puncte) ? titluSection.puncte : [];
        return (
          <div className="opera-tab-content">
            <div className="opera-analysis">
              <h3>Titlul și semnificația lui</h3>
              <p>{titluSection?.descriere || fallbackText}</p>
              {puncte.length > 0 && (
                <ul className="opera-title-points">
                  {puncte.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      }

      case 'rezumat':
        if (operaDetails.rezumat || (Array.isArray(operaDetails.rezumate) && operaDetails.rezumate.length > 0)) {
          const rezumateArray = Array.isArray(operaDetails.rezumate) && operaDetails.rezumate.length > 0
            ? operaDetails.rezumate
            : [operaDetails.rezumat];

          return (
            <div className="opera-tab-content">
              <div className="opera-rezumat">
                <h2 className="rezumat-title">{operaDetails.titlu} - Rezumat</h2>
                {rezumateArray.map((rezumatItem, rezIndex) =>
                  renderRezumatBlock(rezumatItem, rezIndex, rezumateArray.length)
                )}
              </div>
            </div>
          );
        }
        return (
          <div className="opera-tab-content">
            <div className="opera-analysis">
              <h3>Rezumat</h3>
              <p>Rezumatul detaliat va fi adăugat în curând. Între timp, consultă prezentarea și temele principale.</p>
            </div>
          </div>
        );

      case 'simboluri': {
        const simboluriSection = operaDetails.simboluriSection;
        const simboluri = Array.isArray(simboluriSection?.simboluri) ? simboluriSection.simboluri : [];
        return (
          <div className="opera-tab-content">
            <div className="opera-analysis">
              <h3>Simboluri și motive</h3>
              {simboluriSection ? (
                <>
                  {simboluriSection.descriere && (
                    <p>{simboluriSection.descriere}</p>
                  )}
                  {simboluri.length > 0 ? (
                    <ul className="opera-symbols-list">
                      {simboluri.map((simbol, index) => (
                        <li key={index} className="opera-symbol-item">
                          <h4>{simbol.nume}</h4>
                          <p>{simbol.explicatie}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Simbolurile specifice vor fi adăugate în curând.</p>
                  )}
                </>
              ) : (
                <ul>
                  <li>Motive recurente și simboluri-cheie (în lucru).</li>
                  <li>Semnificații și rolul lor în structura operei.</li>
                  <li>Legătura cu titlul și temele centrale.</li>
                </ul>
              )}
            </div>
          </div>
        );
      }

      case 'videoclip': {
        // Harta minimală titlu/opera -> videoId YouTube, inspirată din pagina Videoclipuri
        const videoMap = {
          'Ion': 'C4eED--KNTQ',
          'Moara cu noroc': 'hNYSY47Ze38',
          'Enigma Otiliei': '8hUf1le6N4A',
          'Luceafărul': '5X_COpZg01Q',
          'Baltagul': 'MWKSkj0cBM8',
          'Povestea lui Harap Alb': 'RMl6c8B0VvE',
          'O scrisoare pierdută': 'HnQPMYJNud8',
          'Moromeții': 'NHaNm-Acmx8',
          'Iona': 'rxHq37u_7-I',
        };
        const vid = videoMap[operaDetails.titlu] || null;
        return (
          <div className="opera-tab-content">
            <div className="opera-analysis">
              <h3>Videoclip</h3>
              {vid ? (
                <div className="opera-video-wrapper">
                  <iframe
                    src={`https://www.youtube.com/embed/${vid}`}
                    title={`Video ${operaDetails.titlu}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <p>Nu am găsit un videoclip asociat. Vezi mai multe în secțiunea Videoclipuri.</p>
              )}
            </div>
          </div>
        );
      }

      case 'proiect':
        return (
          <div className="opera-tab-content">
            <div className="opera-analysis">
              <h3>Proiect</h3>
              <p>Vezi proiecte și idei creative inspirate de această operă.</p>
              <div className="opera-actions">
                <button className="opera-read-btn" onClick={() => navigate('/proiecte')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  Deschide Proiecte
                </button>
              </div>
            </div>
          </div>
        );

      case 'intrebari': {
        const operaTitle = effectiveOpera && effectiveOpera.titlu ? effectiveOpera.titlu : '';
        const jsonFile = OPERA_JSON_FILES[operaTitle];
        const specificQuestions = getQuestionsForOpera(jsonFile || '');
        const questions = specificQuestions.length > 0 ? specificQuestions : getGenericQuestions(operaDetails);
        
        return (
          <div className="opera-tab-content">
            <div className="opera-quiz">
              <h3>Întrebări grilă</h3>
              <Quiz questions={questions} />
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  // Accessible custom select for consistent styled dropdown options
  function CustomSelect({ placeholder, selectedIndex, onSelect, ariaLabel, packLabel }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      const onKey = (e) => {
        if (e.key === 'Escape') setOpen(false);
      };
      if (open) document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }, [open]);

    useEffect(() => {
      const onClick = (e) => {
        if (!e.target.closest('.opera-custom-select')) setOpen(false);
      };
      if (open) document.addEventListener('click', onClick);
      return () => document.removeEventListener('click', onClick);
    }, [open]);

    const label = selectedIndex ? (selectedIndex === 'all' ? `Comentarii ${packLabel}` : `Comentariu ${selectedIndex}`) : placeholder;

    return (
      <div className="opera-custom-select">
        <button
          type="button"
          className={`ocs-button${open ? ' open' : ''}`}
          aria-haspopup="listbox"
          aria-expanded={open ? 'true' : 'false'}
          aria-label={ariaLabel}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`ocs-label${selectedIndex ? ' selected' : ''}`}>{label}</span>
          <span className="ocs-caret" aria-hidden="true" />
        </button>
        {open && (
          <div className="ocs-panel" role="listbox">
            <button
              role="option"
              aria-selected={selectedIndex === 'all'}
              className={`ocs-option${selectedIndex === 'all' ? ' active' : ''}`}
              onClick={() => {
                onSelect('all');
                setOpen(false);
              }}
            >
              {`Toate comentariile`}
            </button>
            {[1, 2, 3, 4].map((idx) => (
              <button
                key={idx}
                role="option"
                aria-selected={selectedIndex === idx}
                className={`ocs-option${selectedIndex === idx ? ' active' : ''}`}
                onClick={() => {
                  onSelect(idx);
                  setOpen(false);
                }}
              >
                {`Comentariu ${idx}`}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  function Quiz({ questions }) {
    const [answers, setAnswers] = useState({});
    const [checked, setChecked] = useState(false);
    const correctCount = Object.entries(answers).reduce((acc, [idx, val]) => acc + (val === questions[idx].correct ? 1 : 0), 0);

    return (
      <div className="quiz-container">
        {questions.map((q, idx) => (
          <div key={idx} className="quiz-item">
            <div className="quiz-question">{q.q}</div>
            <div className="quiz-options">
              {q.options.map((opt, oi) => {
                const isChosen = answers[idx] === oi;
                const isCorrect = checked && oi === q.correct;
                const isWrong = checked && isChosen && oi !== q.correct;
                return (
                  <button
                    key={oi}
                    className={`quiz-option${isChosen ? ' chosen' : ''}${isCorrect ? ' correct' : ''}${isWrong ? ' wrong' : ''}`}
                    onClick={() => !checked && setAnswers(a => ({ ...a, [idx]: oi }))}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {checked && q.explanation && (
              <div className="quiz-explanation">
                <strong>Explicație:</strong> {q.explanation}
              </div>
            )}
          </div>
        ))}

        <div className="quiz-actions">
          {!checked ? (
            <button className="quiz-submit" onClick={() => setChecked(true)}>Verifică</button>
          ) : (
            <div className="quiz-result">Corecte: {correctCount}/{questions.length}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    // <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled} transparentOnTop>

    // </Layout>
    <>
      {/* Back to Opere - persistent */}
      <button
        className="opera-back-btn"
        onClick={() => {
          const fromPath = (location.state && location.state.from && location.state.from.pathname) || '/opere';
          const y = (location.state && location.state.from && typeof location.state.from.scrollY === 'number') ? location.state.from.scrollY : 0;
          navigate(fromPath, { replace: true, state: { restoreScroll: y } });
        }}
        aria-label="Înapoi la Opere"
      >
        <span className="back-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </span>
        <span className="back-text">Înapoi</span>
      </button>
      <section
        className="opere-hero-full"
        style={{ backgroundImage: bgImage ? `url(${bgImage})` : undefined }}
      >
        <div className="opere-hero-overlay" />
        {authorProfile && (
          <button
            className="opera-author-avatar"
            onClick={() => navigate(`/scriitor?name=${authorProfile.key}`)}
            aria-label={`Deschide profilul lui ${authorProfile.nume}`}
          >
            <img src={authorProfile.img} alt={authorProfile.nume} />
            <div className="avatar-overlay" />
            <div className="avatar-label">{authorProfile.nume}</div>
          </button>
        )}
        <div className="opere-hero-content">
          <h1 className="opere-hero-title">{effectiveOpera.titlu || 'Operă'}</h1>
          {effectiveOpera.data && (
            <p className="opere-hero-subtitle">
              {effectiveOpera.data.replace('Redactare: ', '')}
            </p>
          )}
          {operaDetails && operaDetails.descriere && (
            <p className="opere-hero-desc">{operaDetails.descriere}</p>
          )}
          {/* Meta info (categorie, canonic) intentionally removed */}
        </div>
        <button onClick={scrollToContent} className="opere-scroll-cue" aria-label="Derulează pentru conținut">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="4 8 12 16 20 8"></polyline>
          </svg>
        </button>
      </section>

      <section id="opera-content" className="opera-content-container">
        {/* Dropdown-uri comentarii – custom, deasupra navbarului
        <div className="opera-comment-dropdowns">
          <CustomSelect
            placeholder="Comentarii gratis"
            ariaLabel="Comentarii gratis"
            packLabel="gratis"
            selectedIndex={selectedCommentPack === 'gratis' ? selectedCommentIndex : null}
            onSelect={(idx) => {
              setSelectedCommentPack('gratis');
              setSelectedCommentIndex(idx);
              setActiveTab('comentariu');
            }}
          />
          <CustomSelect
            placeholder="Comentarii basic"
            ariaLabel="Comentarii basic"
            packLabel="basic"
            selectedIndex={selectedCommentPack === 'basic' ? selectedCommentIndex : null}
            onSelect={(idx) => {
              setSelectedCommentPack('basic');
              setSelectedCommentIndex(idx);
              setActiveTab('comentariu');
            }}
          />
          <CustomSelect
            placeholder="Comentarii pro"
            ariaLabel="Comentarii pro"
            packLabel="pro"
            selectedIndex={selectedCommentPack === 'pro' ? selectedCommentIndex : null}
            onSelect={(idx) => {
              setSelectedCommentPack('pro');
              setSelectedCommentIndex(idx);
              setActiveTab('comentariu');
            }}
          />
          <CustomSelect
            placeholder="Comentarii premium"
            ariaLabel="Comentarii premium"
            packLabel="premium"
            selectedIndex={selectedCommentPack === 'premium' ? selectedCommentIndex : null}
            onSelect={(idx) => {
              setSelectedCommentPack('premium');
              setSelectedCommentIndex(idx);
              setActiveTab('comentariu');
            }}
          />
        </div> */}
        <div className="opera-tabs">
          <div className="opera-tabs-left">
            {tabsOrder.map(key => (
              <button
                key={key}
                className={`opera-tab ${activeTab === key ? 'active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                {tabsLabels[key]}
              </button>
            ))}
          </div>
          <button
            className="theme-toggle"
            aria-label="Schimbă tema"
            onClick={() => setDarkTheme(t => !t)}
          >
            {darkTheme ? '🌙' : '🌞'}
          </button>
        </div>

        <div className="opera-tab-content-wrapper">
          <div key={activeTab} className={`opera-tab-animated ${slideDir}`}>
            {renderTabContent()}
          </div>
        </div>

        {(bookSlug || isPoemWithPopup) && (
          <div className="opera-actions">
            <button className="opera-read-btn" onClick={handleRead}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              {isPoemWithPopup ? 'Citește poezia' : 'Citește opera completă'}
            </button>
          </div>
        )}
      </section>

      {/* Scroll to top button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top-btn"
          aria-label="Derulează în sus"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}

      {/* Poem Modal */}
      {poemModal.open && (
        <div className="opera-poem-modal-overlay" onClick={closePoemModal}>
          <div className={`opera-poem-modal ${darkTheme ? 'dark-theme' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className="opera-poem-modal-header">
              <h2>{poemModal.poem.titlu}</h2>
              <button 
                className="opera-poem-modal-close"
                onClick={closePoemModal}
              >
                ×
              </button>
            </div>
            <div className="opera-poem-modal-content">
              <div className="opera-poem-text">{poemModal.poem.text}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


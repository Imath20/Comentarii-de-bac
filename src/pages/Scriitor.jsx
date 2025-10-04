import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import scriitoriData from '../scriitoriData';
import ScriitorInfo from '../assets/ScriitorInfo';
import AvatarSearchBar from '../assets/AvatarSearchBar';
import ScriitorChat from '../assets/ScriitorChat';
import { getScriitorOpere } from '../data/scriitoriOpere';
import { getScriitorPrezentare } from '../data/scriitoriPrezentare';
import { getScriitorBiografie } from '../data/biografie/index.js';

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
  const data = scriitoriData[name];
  const bannerRef = useRef(null);
  const profileImgRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullscreenTarget, setFullscreenTarget] = useState(null); // 'banner' | 'profile' | null
  const [likesModal, setLikesModal] = useState({ open: false, postId: null });
  const [showChat, setShowChat] = useState(false);
  const [profilePreviewOpen, setProfilePreviewOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  if (!data) {
    return <div className="scriitor-not-found">Scriitorul nu a fost găsit.</div>;
  }

  // Prieteni, galerie, postări
  const friends = data.friends || [];
  const gallery = data.gallery || [];
  const posts = (data.posts || []).slice().sort((a, b) => (b.pin ? 1 : 0) - (a.pin ? 1 : 0)); // Pin first
  const friendsCount = friends.length;

  // Pentru comentarii expandabile
  const [expandedComments, setExpandedComments] = useState({});
  const toggleComments = (postId) => {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Pentru expandarea textului poeziei
  const [expandedPoems, setExpandedPoems] = useState({});
  const togglePoemText = (postId) => {
    setExpandedPoems((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Funcție pentru a obține textul poeziei
  const getPoemText = (poemKey) => {
    return shortPoems[poemKey]?.text || 'Poezia nu este disponibilă momentan.';
  };

  // Pentru modalul cu toți prietenii
  const [showAllFriendsModal, setShowAllFriendsModal] = useState(false);
  const openAllFriendsModal = () => setShowAllFriendsModal(true);
  const closeAllFriendsModal = () => setShowAllFriendsModal(false);

  // Pentru modal preview poezie
  const [poemPreviewModal, setPoemPreviewModal] = useState({ open: false, post: null });
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

  // Pentru modal "Citește tot"
  const [readAllModal, setReadAllModal] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
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

  // Pentru modal Bibliografie (Citește tot descrierea)
  const [bioModalOpen, setBioModalOpen] = useState(false);
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

  // Pentru galerie poezie
  const [poemGalleryModal, setPoemGalleryModal] = useState({ open: false, images: [], startIndex: 0 });
  const openPoemGallery = (images, startIndex = 0) => {
    // Salvează poziția de scroll curentă
    const currentScrollY = window.scrollY;
    setScrollPosition(currentScrollY);
    
    setPoemGalleryModal({ open: true, images, startIndex });
    setPoemGalleryCurrentIndex(startIndex);
    // Previne scroll-ul pe body când modalul este deschis
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${currentScrollY}px`;
    document.body.style.width = '100%';
  };
  const closePoemGallery = () => {
    setPoemGalleryModal({ open: false, images: [], startIndex: 0 });
    setPoemGalleryCurrentIndex(0);
    // Restaurează scroll-ul pe body
    document.body.style.overflow = 'unset';
    document.body.style.position = 'unset';
    document.body.style.top = 'unset';
    document.body.style.width = 'unset';
    // Restaurează poziția de scroll
    window.scrollTo(0, scrollPosition);
  };
  const [poemGalleryCurrentIndex, setPoemGalleryCurrentIndex] = useState(0);

  // Galerie preview state
  const [galleryPreviewIdx, setGalleryPreviewIdx] = useState(null);
  const [galleryCurrentIndex, setGalleryCurrentIndex] = useState(0);
  const openGalleryPreview = (idx) => {
    setGalleryPreviewIdx(idx);
    setGalleryCurrentIndex(idx);
  };
  const closeGalleryPreview = () => {
    setGalleryPreviewIdx(null);
    setGalleryCurrentIndex(0);
  };

  // Navigare către alt scriitor
  const goToScriitor = (key) => {
    const prevFrom = (location.state && location.state.from) || { pathname: '/scriitori', scrollY: 0 };
    navigate(`/scriitor?name=${key}`, { state: { from: prevFrom } });
  };

  // Navigare către poezie (placeholder)
  const goToPoezie = (link) => {
    if (link) navigate(link);
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
           background: `url(${data.banner}) center center/cover no-repeat`,
           backgroundPosition: name === 'eminescu' ? 'center 30%' : name === 'preda' ? 'center 50%' : name === 'sorescu' ? 'center 50%' : name === 'voiculescu' ? 'center 80%' : 'center 20%',
         }}
         onClick={handleFullScreen}
         title={isFullScreen ? 'Ieși din full screen' : 'Click pentru full screen'}
       >
        {/* AvatarSearchBar pe stânga sus, doar dacă nu e fullscreen */}
        {!isFullScreen && (
          <div className="avatar-searchbar-banner-wrapper" onClick={(e) => e.stopPropagation()}>
            <AvatarSearchBar onSelect={s => goToScriitor(Object.keys(scriitoriData).find(k => scriitoriData[k].nume === s.nume))} />
          </div>
        )}
        {!isFullScreen && (
          <>
            <div
              className="scriitor-profile-image"
              onClick={(e) => { e.stopPropagation(); handleProfileFullScreen(); }}
              title="Click pentru full screen"
            >
              <img ref={profileImgRef} src={data.img} alt={data.nume} />
            </div>
          </>
        )}
      </div>
      {/* Layout principal: stânga (info, galerie, prieteni), dreapta (postări) */}
      <div className="scriitor-main-layout">
        {/* Stânga */}
        <div className="scriitor-left-column">
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
             <h2>{data.nume}</h2>
             <div className="scriitor-dates">{data.date}</div>
           </div>
                       {/* Prezentare */}
            <div className="scriitor-section">
              <div className="scriitor-section-title">Prezentare</div>
              <div className="scriitor-presentation">
                <ScriitorInfo name={name} />
                <div className="scriitor-presentation-extra">
                  {(() => {
                    const prezentare = getScriitorPrezentare(name);
                    return prezentare.paragrafe.map((paragraf, index) => (
                      <p key={index}>{paragraf}</p>
                    ));
                  })()}
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
              {gallery.map((img, idx) => (
                <div key={idx} className="scriitor-gallery-item">
                  <img
                    src={img}
                    alt="galerie"
                    onClick={() => openGalleryPreview(idx)}
                  />
                </div>
              ))}
            </div>
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
                  onClick={() => goToScriitor(friend.key)}
                >
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
        {/* Dreapta: postări */}
        <div className="scriitor-right-column">
          <div className="scriitor-posts-title">Postări</div>
          <div className="scriitor-posts-container">
            {posts.map((post) => (
              <div key={post.id} className={`scriitor-post ${post.pin ? 'pinned' : ''} ${post.link ? 'clickable' : ''}`} onClick={() => post.link && !post.pinnedActions && goToPoezie(post.link)}>
                {post.pin && <div className="scriitor-post-pin">📌 Pin</div>}
                <div className="scriitor-post-date">{post.date}</div>
                <div className="scriitor-post-text">{post.text}</div>
                
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
                  <div className="scriitor-poem-container">
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
                      <div className="scriitor-poem-text">
                        {expandedPoems[post.id]
                          ? post.poemText
                          : post.poemText.split('\n\n').slice(0, 2).join('\n\n')
                        }
                      </div>
                      {post.poemText.split('\n\n').length > 2 && (
                        <div className="scriitor-poem-expand">
                          <button
                            onClick={(e) => { e.stopPropagation(); openPoemPreview(post); }}
                          >
                            Mai mult
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : post.isStory ? (
                  <div className="scriitor-story-container">
                    {/* Stânga: imagine poveste */}
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
                        {post.storyTitle}
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
                                text: post.storyText || post.poemText,
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
                            {post.readAllButtonText || 'Citește tot'}
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
                    {post.comments.map((c, idx) => (
                      <div key={idx} className="scriitor-comment">
                        <img src={scriitoriData[c.key]?.img} alt={c.author} />
                        <span className="scriitor-comment-author" onClick={() => goToScriitor(c.key)}>{c.author}</span>
                        <span className="scriitor-comment-text">{c.text}</span>
                      </div>
                    ))}
                  </div>
                )}
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
             {gallery.length > 1 && (
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
             {gallery.length > 1 && (
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
                  const source = getScriitorBiografie(name) || (getScriitorPrezentare(name)?.bibliografie || '');
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
            className="scriitor-poem-preview-modal"
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
                    {poemPreviewModal.post.poemText || poemPreviewModal.post.storyText || poemPreviewModal.post.text}
                    {poemPreviewModal.post.showReadAllButton && (
                      <div className="scriitor-poem-preview-actions">
                        <button
                          onClick={() => {
                            closePoemPreview();
                            navigate(poemPreviewModal.post.readAllButtonLink || '/carte/amintiri-din-copilarie', { 
                              state: { from: location.pathname + location.search } 
                            });
                          }}
                          className="scriitor-poem-preview-read-btn"
                        >
                          {poemPreviewModal.post.readAllButtonText || 'Citește tot'}
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
             {poemGalleryModal.images.length > 1 && (
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
             {poemGalleryModal.images.length > 1 && (
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
          onClose={() => setShowChat(false)}
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
                const opere = getScriitorOpere(name);
                
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
                    onClick={() => {
                      closeAllFriendsModal();
                      goToScriitor(friend.key);
                    }}
                  >
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
    </div>
  );
};

export default Scriitor; 
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Layout from '../assets/Layout';
import scriitoriData from '../scriitoriData';
import '../styles/style.scss';

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

const KNOWN_BOOK_SLUGS = new Set([
  'moara-cu-noroc',
  'ion',
  'o-scrisoare-pierduta',
  'harap-alb',
  'baltagul',
  'mara',
  'ultima-noapte-dragoste',
  'luceafarul',
  'enigma-otiliei',
  'riga-crypto',
  'morometii',
  'iona',
  'critice',
  'lapusneanu',
  'rascoala',
  'hanul-ancutei',
  'maitreyi',
  'nunta-in-cer',
  'amintiri-din-copilarie',
  'padurea-spanzuratilor',
  'patul-lui-procust',
  'popa-tanda',
  'ursul-pacalit-de-vulpe',
  'viata-ca-o-prada'
]);

// Map slug-uri alternative la cheile din OPERA_DETAILS
const OPERA_SLUG_ALIASES = {
  'povestea-lui-harap-alb': 'harap-alb',
  'ultima-noapte-de-dragoste-intaia-noapte-de-razboi': 'ultima-noapte-dragoste',
  'riga-crypto-si-lapona-enigel': 'riga-crypto',
  'formele-fara-fond': 'critice',
};

const resolveOperaSlug = (rawSlug) => {
  const slug = (rawSlug || '').toLowerCase();
  if (OPERA_DETAILS[slug]) return slug;
  if (OPERA_SLUG_ALIASES[slug]) return OPERA_SLUG_ALIASES[slug];
  return slug;
};

// Date detaliate despre opere
const OPERA_DETAILS = {
  'ion': {
    titlu: 'Ion',
    autor: 'Liviu Rebreanu',
    data: '1920',
    categorie: 'roman',
    canonic: true,
    descriere: 'Primul mare roman modern românesc, urmărește destinul lui Ion Glanetașu, obsedat de dorința de a avea pământ, care îl împinge spre alegeri dramatice și sfârșit tragic.',
    teme: ['iubirea pentru pământ', 'dorința de proprietate', 'conflictul social', 'destinul omului simplu'],
    personaje: ['Ion Glanetasu', 'Ana Baciu', 'Florica', 'Vasile Baciu', 'George Bulbuc'],
    analiza: 'Romanul explorează tema iubirii pentru pământ ca forță motrice a existenței umane. Ion Glanetasu este un personaj complex, dominat de dorința de a avea pământ, care îl determină să facă alegeri care îi schimbă viața.',
    citate: [
      '"Cât pământ, Doamne!..."',
      '"Pământul îi era drag ca ochii din cap."',
      '"Trebuie să aibă pământ mult, trebuie!"'
    ]
  },
  'luceafarul': {
    titlu: 'Luceafărul',
    autor: 'Mihai Eminescu',
    data: '1883',
    categorie: 'poezie',
    canonic: true,
    descriere: 'Capodoperă a poeziei românești, ilustrează iubirea imposibilă dintre Hyperion și Cătălina, opunând nemurirea idealului condiției efemere a omului.',
    teme: ['dragostea imposibilă', 'nemurirea vs. murirea', 'sacrificiul pentru dragoste', 'conflictul dintre cer și pământ'],
    personaje: ['Luceafărul (Hyperion)', 'Fata de împărat', 'Cătălin', 'Cătălina'],
    analiza: 'Poezia explorează tema dragostei imposibile între nemurire și murire. Luceafărul este personificarea idealului artistic și filosofic, iar fata reprezintă frumusețea efemeră a lumii pământești.',
    citate: [
      '"A fost odată ca \'n povești, / A fost ca niciodată"',
      '"Cobori în jos, luceafăr blând, / Alunecând pe-o rază"',
      '"O, ești frumos, cum numa \'n vis / Un înger se arată"'
    ]
  },
  'moara-cu-noroc': {
    titlu: 'Moara cu noroc',
    autor: 'Ioan Slavici',
    data: '1881',
    categorie: 'nuvelă',
    canonic: true,
    descriere: 'Nuvelă realistă ce arată cum dorința de îmbogățire îl duce pe Ghiță la degradare morală și pierderea familiei, sub influența lui Lică Sămădăul.',
    teme: ['degradarea morală', 'puterea baniului', 'corupția', 'consecințele alegerilor greșite'],
    personaje: ['Ghiță', 'Ana', 'Lică Sămădăul', 'Pintea căprarul', 'Bătrâna'],
    analiza: 'Nuvela explorează cum dorința de avere și putere poate corupe moralitatea omului. Ghiță începe ca un om cinstit, dar se lasă corupt de Lică Sămădăul, ajungând să-și sacrifice familia și principiile.',
    citate: [
      '"Omul să fie mulțumit cu sărăcia sa"',
      '"Aici, la Moara cu noroc, nu putea să stea nimeni fără voia lui Lică"',
      '"Să-ți fie frică de mine!"'
    ]
  },
  'o-scrisoare-pierduta': {
    titlu: 'O scrisoare pierdută',
    autor: 'Ion Luca Caragiale',
    data: '1884',
    categorie: 'comedie',
    canonic: true,
    descriere: 'Comedie satirică despre corupția și ridicolul vieții politice românești, declanșată de pierderea unei scrisori compromițătoare.',
    teme: ['corupția politică', 'ipocrizia socială', 'satira', 'comedia de situație'],
    personaje: ['Ștefan Tipătescu', 'Zoe Trahanache', 'Nae Cațavencu', 'Ștefan Petică', 'Farfuridi'],
    analiza: 'Caragiale creează o comedie perfectă despre corupția politică și ipocrizia socială. Fiecare personaj reprezintă un tip social specific, iar intriga se bazează pe o situație comică generată de dispariția scrisorii.',
    citate: [
      '"Să nu mai vorbim de asta!"',
      '"Am pierdut scrisoarea!"',
      '"Ce scrisoare?"'
    ]
  },
  'harap-alb': {
    titlu: 'Povestea lui Harap Alb',
    autor: 'Ion Creangă',
    data: '1877',
    categorie: 'basm',
    canonic: true,
    descriere: 'Basm cult inițiatic care urmărește drumul de maturizare al eroului, pus la încercare prin probe și aventuri fantastice. Harap Alb învinge obstacolele cu ajutorul inteligenței, al prietenilor fabuloși și al bunătății, devenind un model de omenie și curaj.',
    teme: ['călătoria inițiatică', 'înțelepciunea', 'bunătatea', 'dreptatea', 'magia'],
    personaje: ['Harap Alb', 'Împăratul Verde', 'Fata Împăratului', 'Baba Cloanța', 'Zmeul'],
    analiza: 'Basmul urmează structura clasică a basmului popular: eroul pleacă în călătorie, întâmpină obstacole, primește ajutor de la personaje magice și se întoarce victorios. Harap Alb reprezintă valorile pozitive ale poporului român.',
    citate: [
      '"Harap Alb, Harap Alb, / Călătorul cel mai bun"',
      '"Să nu te uiți înapoi!"',
      '"Bunătatea se răsplătește mereu"'
    ]
  },
  'baltagul': {
    titlu: 'Baltagul',
    autor: 'Mihail Sadoveanu',
    data: '1930',
    categorie: 'roman',
    canonic: true,
    descriere: 'Romanul căutării și al dreptății, în care Vitoria Lipan pornește hotărâtă să-și găsească soțul dispărut, într-o lume guvernată de tradiții și credință.',
    teme: ['iubirea conjugală', 'datoria', 'perseverența', 'viața țărănească', 'destinul femeii'],
    personaje: ['Vitoria Lipan', 'Ghiță Lipan', 'Nechifor Lipan', 'Baba Cloanța'],
    analiza: 'Sadoveanu creează un portret puternic al femeii țărănești prin personajul Vitoriei. Romanul explorează tema iubirii conjugale și a datoriei, Vitoria fiind gata să facă orice pentru a-și găsi soțul.',
    citate: [
      '"Vitoria Lipan, femeia cea bună"',
      '"Să-l găsesc pe Ghiță, să-l aduc acasă"',
      '"Baltagul în mână, inima plină de dor"'
    ]
  },
  'mara': {
    titlu: 'Mara',
    autor: 'Ioan Slavici',
    data: '1894',
    categorie: 'roman',
    canonic: true,
    descriere: 'Portret al unei femei transilvănene întreprinzătoare, prinsă între valorile tradiționale și noile schimbări sociale, într-o luptă pentru supraviețuire.',
    teme: ['viața femeii', 'tradițiile', 'modernizarea', 'lupta pentru supraviețuire', 'valorile morale'],
    personaje: ['Mara', 'Popa Toma', 'Ilie Glanetasu', 'Ana'],
    analiza: 'Slavici creează un portret autentic al femeii transilvănene prin personajul Marei. Romanul explorează conflictul dintre tradiție și modernitate, Mara reprezentând valorile tradiționale în fața schimbărilor sociale.',
    citate: [
      '"Mara, femeia cea bună"',
      '"Tradițiile nu se uită"',
      '"Viața e grea, dar trebuie să o duci"'
    ]
  },
  'ultima-noapte-dragoste': {
    titlu: 'Ultima noapte de dragoste, întâia noapte de război',
    autor: 'Camil Petrescu',
    data: '1930',
    categorie: 'roman',
    canonic: true,
    descriere: 'Roman modernist de analiză psihologică, urmărește frământările lui Ștefan Gheorghidiu între gelozie și experiența dură a frontului.',
    teme: ['psihologia personajelor', 'războiul', 'dragostea', 'modernismul', 'interiorul uman'],
    personaje: ['Ștefan Gheorghidiu', 'Eliza', 'Camil Petrescu'],
    analiza: 'Petrescu creează un roman psihologic complex, explorând interiorul uman în contextul războiului. Opera se caracterizează prin tehnici narrative moderne și analiza profundă a psihologiei personajelor.',
    citate: [
      '"Ultima noapte de dragoste"',
      '"Întâia noapte de război"',
      '"Psihologia e totul"'
    ]
  },
  'enigma-otiliei': {
    titlu: 'Enigma Otiliei',
    autor: 'George Călinescu',
    data: '1938',
    categorie: 'roman',
    canonic: true,
    descriere: 'Roman realist-balzacian care surprinde moravurile burgheziei bucureștene interbelice, prin destinul lui Felix și enigma feminină reprezentată de Otilia.',
    teme: ['dragostea', 'societatea interbelică', 'psihologia personajelor', 'realismul', 'Bucureștiul'],
    personaje: ['Otilia Mărculescu', 'Felix Sima', 'Agnes', 'Costache Giurgiuveanu'],
    analiza: 'Călinescu creează un roman realist complex, explorând psihologia personajelor și atmosfera societății interbelice. Otilia reprezintă enigma feminității moderne, iar Felix este tipul intelectualului confuz.',
    citate: [
      '"Enigma Otiliei"',
      '"Felix Sima, intelectualul confuz"',
      '"Bucureștiul interbelic"'
    ]
  },
  'morometii': {
    titlu: 'Moromeții',
    autor: 'Marin Preda',
    data: '1955',
    categorie: 'roman',
    canonic: true,
    descriere: 'Cronică rurală care surprinde viața familiei Moromete și schimbările sociale ce zdruncină echilibrul satului românesc în pragul modernizării.',
    teme: ['viața țărănească', 'transformările sociale', 'familia', 'politica', 'tradițiile'],
    personaje: ['Ilie Moromete', 'Catrina', 'Niculae', 'Paraschiv'],
    analiza: 'Preda creează un roman epic despre transformările societății românești prin prisma familiei Moromeților. Opera explorează conflictul dintre tradiție și modernitate, între vechi și nou.',
    citate: [
      '"Ilie Moromete, țăranul înțelept"',
      '"Catrina, femeia puternică"',
      '"Tradițiile se schimbă"'
    ]
  }
};

export default function Opera() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('prezentare');
  const [prevTab, setPrevTab] = useState('prezentare');
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
    comentariu: 'Comentariu',
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

  const initialOpera = location.state && location.state.opera ? location.state.opera : null;

  const effectiveOpera = useMemo(() => {
    if (initialOpera) return initialOpera;
    const titleFromSlug = params.slug ? params.slug.replace(/-/g, ' ') : '';
    return {
      titlu: titleFromSlug ? titleFromSlug.replace(/\b\w/g, (m) => m.toUpperCase()) : 'Operă',
      autor: '',
      data: '',
      img: '',
      categorie: '',
      canonic: undefined
    };
  }, [initialOpera, params.slug]);

  const bookSlug = useMemo(() => {
    const fromSlug = params.slug || '';
    if (KNOWN_BOOK_SLUGS.has(fromSlug)) return fromSlug;
    const fromTitle = slugify(effectiveOpera && effectiveOpera.titlu ? effectiveOpera.titlu : '');
    return KNOWN_BOOK_SLUGS.has(fromTitle) ? fromTitle : null;
  }, [params.slug, effectiveOpera]);

  const operaDetails = useMemo(() => {
    const resolved = resolveOperaSlug(params.slug || '');
    return OPERA_DETAILS[resolved] || null;
  }, [params.slug]);

  const handleRead = () => {
    if (bookSlug) {
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

  const bgImage = effectiveOpera.img ? effectiveOpera.img.replace('/public', '') : '';

  // Găsește profilul autorului (cheie și poză) după nume
  const authorProfile = useMemo(() => {
    const authorName = (operaDetails && operaDetails.autor) || (effectiveOpera && effectiveOpera.autor) || '';
    if (!authorName) return null;

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
  }, [operaDetails, effectiveOpera]);

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
                {operaDetails.personaje.map((personaj, index) => (
                  <li key={index}>{personaj}</li>
                ))}
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

      case 'comentariu':
        return (
          <div className="opera-tab-content">
            <div className="opera-comment-content">
              <h3>Comentariu literar</h3>
              <div className="comment-text">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p>
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
                </p>
              </div>
            </div>
          </div>
        );

      case 'curent': {
        const curentText = (() => {
          const categorie = operaDetails.categorie || '';
          if (categorie === 'roman') return 'Realism (roman), cu particularități specifice epocii/autorului.';
          if (categorie === 'poezie') return 'Modernism / Simbolism (poezie), în funcție de autor și perioadă.';
          if (categorie === 'nuvelă') return 'Realism (nuvelă), accent pe morală și tipologii.';
          if (categorie === 'comedie') return 'Realism satiric (comedie), critică socială și politică.';
          if (categorie === 'basm') return 'Romantism / tradiția basmului cult, motive folclorice.';
          return 'Curent literar: în lucru.';
        })();
        return (
          <div className="opera-tab-content">
            <div className="opera-analysis">
              <h3>Curent literar</h3>
              <p>{curentText}</p>
            </div>
          </div>
        );
      }

      case 'titlu':
        return (
          <div className="opera-tab-content">
            <div className="opera-analysis">
              <h3>Titlul și semnificația lui</h3>
              <p>
                Titlul „{effectiveOpera.titlu}” funcționează ca nucleu semantic al operei. Semnificația exactă diferă în
                funcție de interpretare, dar indică motivele principale, direcția tematică și statutul personajelor.
              </p>
            </div>
          </div>
        );

      case 'rezumat':
        return (
          <div className="opera-tab-content">
            <div className="opera-analysis">
              <h3>Rezumat</h3>
              <p>Rezumatul detaliat va fi adăugat în curând. Între timp, consultă prezentarea și temele principale.</p>
            </div>
          </div>
        );

      case 'simboluri':
        return (
          <div className="opera-tab-content">
            <div className="opera-analysis">
              <h3>Simboluri și motive</h3>
              <ul>
                <li>Motive recurente și simboluri-cheie (în lucru).</li>
                <li>Semnificații și rolul lor în structura operei.</li>
                <li>Legătura cu titlul și temele centrale.</li>
              </ul>
            </div>
          </div>
        );

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
        const questions = [
          {
            q: `Tema centrală în „${operaDetails.titlu}” este:`,
            options: ['Dragostea', 'Destinul și moralitatea', 'Amintirile copilăriei'],
            correct: 1,
          },
          {
            q: 'Curentul literar asociat operei este cel mai aproape de:',
            options: ['Romantism', 'Realism/Modernism (după caz)', 'Simbolism pur'],
            correct: 1,
          },
          {
            q: 'Titlul indică în primul rând:',
            options: ['Locul acțiunii', 'Motivul/ideea centrală', 'Numele autorului'],
            correct: 1,
          },
        ];
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

        {bookSlug && (
          <div className="opera-actions">
            <button className="opera-read-btn" onClick={handleRead}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              Citește opera completă
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
    </>
  );
}


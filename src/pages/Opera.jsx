import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Layout from '../assets/Layout';
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

// Date detaliate despre opere
const OPERA_DETAILS = {
  'ion': {
    titlu: 'Ion',
    autor: 'Liviu Rebreanu',
    data: '1920',
    categorie: 'roman',
    canonic: true,
    descriere: 'Romanul "Ion" este considerat primul roman modern românesc și una dintre cele mai importante opere ale literaturii române. Povestește despre iubirea pentru pământ și dorința de proprietate a țăranului Ion Glanetasu.',
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
    descriere: 'Poezia "Luceafărul" este considerată capodopera lirică a lui Eminescu și una dintre cele mai frumoase poezii ale literaturii universale. Povestește despre dragostea imposibilă dintre Luceafărul și o fată de împărat.',
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
    descriere: 'Nuvela "Moara cu noroc" este o operă realistă care prezintă degradarea morală a omului sub influența baniului și a puterii. Povestește despre Ghiță, cârciumarul de la Moara cu noroc, care se împrietenește cu Lică Sămădăul.',
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
    descriere: 'Comedia "O scrisoare pierdută" este o satiră ascuțită a vieții politice românești din perioada post-unionistă. Povestește despre o scrisoare compromițătoare care dispare și cauzează panică în cercurile politice.',
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
    descriere: 'Basmul "Povestea lui Harap Alb" este unul dintre cele mai frumoase basme populare românești. Povestește despre Harap Alb, fiul cel mai mic al împăratului, care pleacă în lume să-și caute norocul.',
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
    descriere: 'Romanul "Baltagul" este o operă realistă care prezintă viața țăranilor din Moldova la începutul secolului XX. Povestește despre Vitoria Lipan care pleacă să-și caute soțul dispărut.',
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
    descriere: 'Romanul "Mara" prezintă viața unei femei simple din Transilvania, Mara, care luptă pentru supraviețuire și respectarea valorilor tradiționale în fața modernizării societății.',
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
    descriere: 'Romanul "Ultima noapte de dragoste, întâia noapte de război" este o operă modernistă care explorează psihologia personajelor în contextul Primului Război Mondial.',
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
    descriere: 'Romanul "Enigma Otiliei" este o operă realistă care prezintă viața societății bucureștene din perioada interbelică prin prisma unei povești de dragoste complexe.',
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
    descriere: 'Romanul "Moromeții" prezintă viața unei familii de țărani din Oltenia în perioada interbelică și postbelică, explorând transformările sociale și politice ale epocii.',
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
    const slug = params.slug || '';
    return OPERA_DETAILS[slug] || null;
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

      default:
        return null;
    }
  };

  return (
    // <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled} transparentOnTop>

    // </Layout>
    <>
      <section
        className="opere-hero-full"
        style={{ backgroundImage: bgImage ? `url(${bgImage})` : undefined }}
      >
        <div className="opere-hero-overlay" />
        <div className="opere-hero-content">
          <h1 className="opere-hero-title">{effectiveOpera.titlu || 'Operă'}</h1>
          {(effectiveOpera.autor || effectiveOpera.data) && (
            <p className="opere-hero-subtitle">
              {(effectiveOpera.autor || '').trim()}
              {effectiveOpera.data ? ` • ${effectiveOpera.data.replace('Redactare: ', '')}` : ''}
            </p>
          )}
          {operaDetails && (
            <div className="opere-hero-meta">
              <span className="opera-category">{operaDetails.categorie}</span>
              {operaDetails.canonic && <span className="opera-canonical">Canonică</span>}
            </div>
          )}
        </div>
        <button onClick={scrollToContent} className="opere-scroll-cue" aria-label="Derulează pentru conținut">
          <span>Derulează pentru conținut</span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </section>

      <section id="opera-content" className="opera-content-container">
        <div className="opera-tabs">
          <button
            className={`opera-tab ${activeTab === 'prezentare' ? 'active' : ''}`}
            onClick={() => setActiveTab('prezentare')}
          >
            Prezentare
          </button>
          <button
            className={`opera-tab ${activeTab === 'analiza' ? 'active' : ''}`}
            onClick={() => setActiveTab('analiza')}
          >
            Analiză
          </button>
          <button
            className={`opera-tab ${activeTab === 'comentariu' ? 'active' : ''}`}
            onClick={() => setActiveTab('comentariu')}
          >
            Comentariu
          </button>
        </div>

        <div className="opera-tab-content-wrapper">
          {renderTabContent()}
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}
    </>
  );
}


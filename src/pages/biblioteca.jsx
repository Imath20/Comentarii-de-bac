import React, { useEffect, useState } from 'react';
import Layout from '../assets/Layout';
import { useNavigate } from 'react-router-dom';
import '../styles/style.scss';
import Select from 'react-select';

// Lista completă cu toate cărțile disponibile cu fișiere JSON
const cartiList = [
    // Opere canonice cu fișiere JSON
    {
        titlu: 'Moara cu noroc',
        autor: 'Ioan Slavici',
        data: 'Redactare: 1880',
        img: '/opere/moara-cu-noroc.webp',
        categorie: 'nuvela',
        canonic: true,
        jsonFile: 'moara-cu-noroc',
        tip: 'opera'
    },
    {
        titlu: 'Ion',
        autor: 'Liviu Rebreanu',
        data: 'Redactare: 1920',
        img: '/opere/Ion.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-social',
        canonic: true,
        jsonFile: 'ion',
        tip: 'opera'
    },
    {
        titlu: 'O scrisoare pierdută',
        autor: 'I.L. Caragiale',
        data: 'Redactare: 1884',
        img: '/opere/scrisoare-pierduta.webp',
        categorie: 'comedie',
        canonic: true,
        jsonFile: 'o-scrisoare-pierduta',
        tip: 'opera'
    },
    {
        titlu: 'Povestea lui Harap-Alb',
        autor: 'Ion Creangă',
        data: 'Redactare: 1877',
        img: '/opere/Harap-Alb.webp',
        categorie: 'basm',
        canonic: true,
        jsonFile: 'harap-alb',
        tip: 'opera'
    },
    {
        titlu: 'Baltagul',
        autor: 'Mihail Sadoveanu',
        data: 'Redactare: 1930',
        img: '/opere/baltagul.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-mitic',
        canonic: true,
        jsonFile: 'baltagul',
        tip: 'opera'
    },
    {
        titlu: 'Mara',
        autor: 'Ioan Slavici',
        data: 'Redactare: 1894',
        img: '/opere/mara.webp',
        categorie: 'roman',
        canonic: true,
        jsonFile: 'mara',
        tip: 'opera'
    },
    {
        titlu: 'Ultima noapte de dragoste, întaia noapte de razboi',
        autor: 'Camil Petrescu',
        data: 'Redactare: 1930',
        img: '/opere/ultima-noapte.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-subiectiv',
        canonic: true,
        jsonFile: 'ultima-noapte-dragoste',
        tip: 'opera'
    },
    {
        titlu: 'Amintiri din copilărie',
        autor: 'Ion Creangă',
        data: 'Redactare: 1881-1892',
        img: '/opere/amintiri-copil.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-autobiografic',
        canonic: false,
        jsonFile: 'amintiri-din-copilarie',
        tip: 'opera'
    },
        {
        titlu: 'Luceafărul',
        autor: 'Mihai Eminescu',
        data: 'Redactare: 1883',
        img: '/opere/Luceafarul.webp',
        categorie: 'poezie',
        canonic: true,
        jsonFile: 'luceafarul',
        tip: 'opera'
    },


    {
        titlu: 'Enigma Otiliei',
        autor: 'George Călinescu',
        data: 'Redactare: 1938',
        img: '/opere/enigma-otiliei.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-balzacian',
        canonic: true,
        jsonFile: 'enigma-otiliei',
        tip: 'opera'
    },
    {
        titlu: 'Plumb',
        autor: 'George Bacovia',
        data: 'Redactare: 1916',
        img: '/opere/plumb.webp',
        categorie: 'poezie',
        canonic: true,
        jsonFile: null,
        tip: 'opera',
        poemKey: 'plumb'
    },
    {
        titlu: 'Riga crypto si lapona enigel',
        autor: 'Ion Barbu',
        data: 'Redactare: 1930',
        img: '/opere/riga-crypto.webp',
        categorie: 'poezie',
        canonic: true,
        jsonFile: 'riga-crypto',
        tip: 'opera'
    },
    {
        titlu: 'Eu nu strivesc corola de minuni a lumii',
        autor: 'Lucian Blaga',
        data: 'Redactare: 1919',
        img: '/opere/corola_minuni.webp',
        categorie: 'poezie',
        canonic: true,
        jsonFile: null,
        tip: 'opera',
        poemKey: 'eu-nu-strivesc-corola'
    },
    {
        titlu: 'Flori de mucigai',
        autor: 'Tudor Arghezi',
        data: 'Redactare: 1919',
        img: '/opere/flori-mucigai.webp',
        categorie: 'poezie',
        canonic: true,
        jsonFile: null,
        tip: 'opera',
        poemKey: 'flori-mucigai'
    },
    {
        titlu: 'Testament',
        autor: 'Tudor Arghezi',
        data: 'Redactare: 1927',
        img: '/opere/testament-orizontala.webp',
        categorie: 'poezie',
        canonic: true,
        jsonFile: null,
        tip: 'opera',
        poemKey: 'testament'
    },
    {
        titlu: 'Morometii',
        autor: 'Marin Preda',
        data: 'Redactare: 1955/1967',
        img: '/opere/morometii.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-autobiografic',
        canonic: true,
        jsonFile: 'morometii',
        tip: 'opera'
    },
    {
        titlu: 'Leoaică tânără, iubirea',
        autor: 'Nichita Stănescu',
        data: 'Redactare: 1964',
        img: '/opere/leoaica-iubirea.webp',
        categorie: 'poezie',
        canonic: true,
        jsonFile: null,
        tip: 'opera',
        poemKey: 'leoaica-iubirea'
    },
    {
        titlu: 'Iona',
        autor: 'Marin Sorescu',
        data: 'Redactare: 1968',
        img: '/opere/iona.webp',
        categorie: 'comedie',
        canonic: true,
        jsonFile: 'iona',
        tip: 'opera'
    },
    {
        titlu: 'Formele fara fond',
        autor: 'Titu Maiorescu',
        data: 'Redactare: 1868',
        img: '/opere/formele.webp',
        categorie: 'critica',
        canonic: true,
        jsonFile: 'critice',
        tip: 'opera'
    },
    {
        titlu: 'Alexandru Lăpușneanu',
        autor: 'Costache Negruzzi',
        data: 'Redactare: 1840',
        img: '/opere/lapusneanu.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-istoric',
        canonic: false,
        jsonFile: 'lapusneanu',
        tip: 'opera'
    },
    {
        titlu: 'Răscoala',
        autor: 'Liviu Rebreanu',
        data: 'Redactare: 1932',
        img: '/opere/rascoala.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-social',
        canonic: false,
        jsonFile: 'rascoala',
        tip: 'opera'
    },
    {
        titlu: 'Hanul Ancuţei',
        autor: 'Mihail Sadoveanu',
        data: 'Redactare: 1928',
        img: '/opere/hanul-ancutei.webp',
        categorie: 'nuvela',
        canonic: false,
        jsonFile: 'hanul-ancutei',
        tip: 'opera'
    },
    {
        titlu: 'Maytreyi',
        autor: 'Mircea Eliade',
        data: 'Redactare: 1933',
        img: '/opere/maytreyi.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-autobiografic',
        canonic: false,
        jsonFile: 'maitreyi',
        tip: 'opera'
    },
    {
        titlu: 'Aci sosi pe vremuri',
        autor: 'Ion Pillat',
        data: 'Redactare: 1923',
        img: '/opere/aci-sosi.webp',
        categorie: 'poezie',
        canonic: false,
        jsonFile: null,
        tip: 'opera',
        poemKey: 'aci-sosi'
    },
    {
        titlu: 'În Grădina Ghetsimani',
        autor: 'Vasile Voiculescu',
        data: 'Redactare: 1921',
        img: '/opere/gradina-ghetsimani.webp',
        categorie: 'poezie',
        canonic: false,
        jsonFile: null,
        tip: 'opera',
        poemKey: 'gradina-ghetsimani'
    }
    ,
    {
        titlu: 'Amintiri de la Junimea din Iași',
        autor: 'G. Panu',
        data: 'Redactare: 1908',
        img: '/opere/amintiri-panu.webp',
        categorie: 'memorii',
        canonic: false,
        jsonFile: 'amintiri-de-la-junimea-din-iasi',
        tip: 'carte'
    },
    {
        titlu: 'Amintiri din Junimea',
        autor: 'Iacob Negruzzi',
        data: 'Redactare: 1889',
        img: '/opere/amintiri-negruzzi.webp',
        categorie: 'memorii',
        canonic: false,
        jsonFile: 'amintiri-din-junimea',
        tip: 'carte'
    },
    {
        titlu: 'Bubico',
        autor: 'I.L. Caragiale',
        data: 'Redactare: 1903',
        img: '/opere/bubico.webp',
        categorie: 'schita',
        canonic: false,
        jsonFile: 'bubico',
        tip: 'opera'
    },
    {
        titlu: 'Capra cu trei iezi',
        autor: 'Ion Creangă',
        data: 'Redactare: 1875',
        img: '/opere/capra-trei-iezi.webp',
        categorie: 'basm',
        canonic: false,
        jsonFile: 'capra-cu-trei-iezi',
        tip: 'opera'
    },
    {
        titlu: 'Dănilă Prepeleac',
        autor: 'Ion Creangă',
        data: 'Redactare: 1876',
        img: '/opere/danila-prepeleac.webp',
        categorie: 'basm',
        canonic: false,
        jsonFile: 'danila-prepeleac',
        tip: 'opera'
    },
    {
        titlu: 'Dl. Goe',
        autor: 'I.L. Caragiale',
        data: 'Redactare: 1900',
        img: '/opere/dl-goe.webp',
        categorie: 'schita',
        canonic: false,
        jsonFile: 'i-l-caragiale-dl-goe',
        tip: 'opera'
    },
    {
        titlu: 'Vizită',
        autor: 'I.L. Caragiale',
        data: 'Redactare: 1900',
        img: '/opere/vizita.webp',
        categorie: 'schita',
        canonic: false,
        jsonFile: 'i-l-caragiale-vizita',
        tip: 'opera'
    },
    {
        titlu: 'La Țigănci',
        autor: 'Mircea Eliade',
        data: 'Redactare: 1959',
        img: '/opere/la-tiganci.webp',
        categorie: 'nuvela',
        canonic: false,
        jsonFile: 'la-tiganci',
        tip: 'opera'
    },
    {
        titlu: 'O noapte furtunoasă',
        autor: 'I.L. Caragiale',
        data: 'Redactare: 1879',
        img: '/opere/noapte-furtunoasa.webp',
        categorie: 'comedie',
        canonic: true,
        jsonFile: 'o-noapte-furtunoasa',
        tip: 'opera'
    },
    {
        titlu: 'Pădurea spânzuraților',
        autor: 'Liviu Rebreanu',
        data: 'Redactare: 1922',
        img: '/opere/padure-spanzurati.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-de-razboi',
        canonic: true,
        jsonFile: 'padurea-spanzuratilor',
        tip: 'opera'
    },
    {
        titlu: 'Patul lui Procust',
        autor: 'Camil Petrescu',
        data: 'Redactare: 1933',
        img: '/opere/patul-procust.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-subiectiv',
        canonic: false,
        jsonFile: 'patul-lui-procust',
        tip: 'opera'
    },
    {
        titlu: 'Popa Tanda',
        autor: 'Ioan Slavici',
        data: 'Redactare: 1875',
        img: '/opere/popa-tanda.webp',
        categorie: 'nuvela',
        canonic: false,
        jsonFile: 'popa-tanda',
        tip: 'opera'
    },
    {
        titlu: 'Ursul păcălit de vulpe',
        autor: 'Ion Creangă',
        data: 'Redactare: 1875',
        img: '/opere/ursul-pacalit.webp',
        categorie: 'poveste',
        canonic: false,
        jsonFile: 'ursul-pacalit-de-vulpe',
        tip: 'opera'
    },
    {
        titlu: 'Viață ca o pradă',
        autor: 'Marin Preda',
        data: 'Redactare: 1977',
        img: '/opere/viata-prada.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-autobiografic',
        canonic: false,
        jsonFile: 'viata-ca-o-prada',
        tip: 'carte'
    },
    {
        titlu: 'Nuntă în cer',
        autor: 'Mircea Eliade',
        data: 'Redactare: 1938',
        img: '/opere/nunta-cer.webp',
        categorie: 'roman',
        romanSubcategorie: 'roman-psihologic',
        canonic: false,
        jsonFile: 'nunta-in-cer',
        tip: 'carte'
    }
];

const categorii = [
    { id: 'toate', nume: 'Toate categoriile' },
    { id: 'poezie', nume: 'Poezie' },
    { id: 'roman', nume: 'Roman' },
    { id: 'comedie', nume: 'Comedie' },
    { id: 'basm', nume: 'Basm' },
    { id: 'nuvela', nume: 'Nuvelă' },
    { id: 'critica', nume: 'Critică literară' },
    { id: 'memorii', nume: 'Memorii' },
    { id: 'poveste', nume: 'Poveste'},
    { id: 'schita', nume: 'Schiţă'}
];

// Opțiuni pentru react-select
const genOptions = categorii.map(categorie => ({ value: categorie.id, label: categorie.nume }));
const canonicOptions = [
    { value: 'toate', label: 'Toate' },
    { value: 'canonice', label: 'Canonice' },
    { value: 'necanonice', label: 'Non-canonice' }
];

const tipOptions = [
    { value: 'toate', label: 'Toate tipurile' },
    { value: 'opera', label: 'Opere' },
    { value: 'carte', label: 'Cărți' }
];

const romanSubcategoriiOptions = [
    { value: 'toate', label: 'Toate subcategoriile' },
    { value: 'roman-balzacian', label: 'Roman balzacian' },
    { value: 'roman-subiectiv', label: 'Roman subiectiv' },
    { value: 'roman-autobiografic', label: 'Roman autobiografic' },
    { value: 'roman-mitic', label: 'Roman mitic' },
    { value: 'roman-social', label: 'Roman social' },
    { value: 'roman-istoric', label: 'Roman istoric' },
    { value: 'roman-fantastic', label: 'Roman fantastic' }
];

const customSelectStyles = (darkTheme) => ({
  control: (provided, state) => ({
    ...provided,
    minWidth: 270,
    maxWidth: 320,
    height: '56px',
    borderRadius: '2.2rem',
    border: `1.5px solid ${darkTheme ? '#a97c50' : '#ececec'}`,
    background: darkTheme ? '#4e2e1e' : '#f7f8fa',
    color: darkTheme ? 'rgba(255,255,255,0.95)' : '#222',
    fontWeight: 500,
    fontSize: '1.13rem',
    boxShadow: state.isFocused ? `0 0 0 2px ${darkTheme ? '#ffd591' : '#a3a3a3'}` : 'none',
    cursor: 'pointer',
    paddingLeft: 0,
    paddingRight: 0,
    transition: 'all 0.3s',
    outline: 'none',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '56px',
    padding: '0 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    position: 'relative',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '2.2rem',
    background: darkTheme ? '#4e2e1e' : '#f7f8fa',
    color: darkTheme ? 'rgba(255,255,255,0.95)' : '#222',
    boxShadow: '0 8px 32px 0 rgba(60,40,20,0.18)',
    overflow: 'hidden',
    zIndex: 10,
    marginTop: 6,
  }),
  option: (provided, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: darkTheme ? 'rgba(255,255,255,0.95)' : '#222',
    background: state.isSelected
      ? (darkTheme ? '#a97c50' : '#ffd591')
      : state.isFocused
        ? (darkTheme ? '#6a4322' : '#fff')
        : (darkTheme ? '#4e2e1e' : '#f7f8fa'),
    fontWeight: state.isSelected ? 700 : 500,
    fontSize: '1.13rem',
    cursor: 'pointer',
    borderRadius: 0,
    padding: '0.7rem 0',
    minHeight: 40,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: darkTheme ? 'rgba(255,255,255,0.95)' : '#222',
    textAlign: 'center',
    fontWeight: 500,
    width: '100%',
    fontSize: '1.13rem',
    display: 'flex',
    alignItems: 'center',
    height: '56px',
    position: 'absolute',
    left: '1.5rem',
    right: '1.5rem',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: darkTheme ? '#ffd591' : '#a97c50',
    padding: 8,
    transition: 'color 0.2s',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    height: '56px',
    position: 'absolute',
    right: '1.5rem',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  input: (provided) => ({ ...provided, display: 'none' }),
  menuList: (provided) => ({ ...provided, padding: 0, maxHeight: 'none', overflowY: 'auto' }),
});

export default function Carti() {
    const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
    const [scrolled, setScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('toate');
    const [canonicFilter, setCanonicFilter] = useState('toate');
    const [tipFilter, setTipFilter] = useState('toate');
    const [romanSubcategorieFilter, setRomanSubcategorieFilter] = useState('toate');
    const [poemModal, setPoemModal] = useState({ open: false, poem: null });
    const navigate = useNavigate();

    // Funcție pentru a bloca scroll-ul din spate
    const blockScroll = () => {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '15px'; // Compensare pentru scrollbar
    };

    // Funcție pentru a debloca scroll-ul
    const unblockScroll = () => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    };

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
            text: `Testament
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
            text: `Flori de mucigai
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
           titlu : 'Eu nu strivesc corola de minuni a lumii',
           autor:   'Lucian Blaga',
           data:  '1919',
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
        'aci-sosi':{
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
        'gradina-ghetsimani':{
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

    useEffect(() => {
        document.body.classList.toggle('dark-theme', darkTheme);
        localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
    }, [darkTheme]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Reset roman subcategory filter when category changes from roman
    useEffect(() => {
        if (selectedCategory !== 'roman') {
            setRomanSubcategorieFilter('toate');
        }
    }, [selectedCategory]);

    // Cleanup pentru scroll când componenta se dezactivează
    useEffect(() => {
        return () => {
            unblockScroll(); // Asigură-te că scroll-ul este deblocat când componenta se dezactivează
        };
    }, []);

    // Filtrare cărți
    const filteredCarti = cartiList.filter(carte => {
        const matchesSearch = carte.titlu.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             carte.autor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'toate' || carte.categorie === selectedCategory;
        const matchesCanonic = canonicFilter === 'toate' ||
            (canonicFilter === 'canonice' && carte.canonic) ||
            (canonicFilter === 'necanonice' && !carte.canonic);
        const matchesTip = tipFilter === 'toate' || carte.tip === tipFilter;
        const matchesRomanSubcategorie = romanSubcategorieFilter === 'toate' || 
            (selectedCategory === 'roman' && carte.romanSubcategorie === romanSubcategorieFilter);
        return matchesSearch && matchesCategory && matchesCanonic && matchesTip && matchesRomanSubcategorie;
    });

    const handleCardClick = (carte) => {
        if (carte.jsonFile) {
            // Redirecționează către BookReader cu fișierul JSON
            navigate(`/carte/${carte.jsonFile}`, { state: { from: { pathname: '/biblioteca', scrollY: window.scrollY } } });
        } else if (carte.categorie === 'poezie' && carte.poemKey && shortPoems[carte.poemKey]) {
            // Pentru poeziile scurte, afișează popup-ul
            setPoemModal({ open: true, poem: shortPoems[carte.poemKey] });
            blockScroll(); // Blochează scroll-ul din spate
        } else {
            // Dacă nu există fișier JSON, afișează un mesaj
            alert('Fișierul JSON pentru această carte nu este disponibil momentan.');
        }
    };

    return (
        <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} scrolled={scrolled}>
            <div className="page-hero">
                <h1 className="page-title">{
                    'Bibliotecă'.split(' ').map((word, wi) => (
                        <span className="page-title-word" key={wi}>
                            {word.split('').map((l, i) => <span key={i}>{l}</span>)}
                        </span>
                    ))
                }</h1>
                <p className="page-desc">Aici vei găsi toate cărțile și operele importante pentru BAC, cu acces direct la PDF-uri.</p>
            </div>

            <div className="container">
                {/* Search Bar și Dropdown-uri */}
                <div className="opere-filters-container">
                    {/* Search Bar */}
                    <div className="opere-search-container">
                        <div className={`opere-search-icon ${darkTheme ? 'dark-theme' : ''}`}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Caută cărți sau autori..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`opere-search-input ${darkTheme ? 'dark-theme' : ''}`}
                            onFocus={e => {
                                e.target.style.borderColor = darkTheme ? '#ffd591' : '#a3a3a3';
                                e.target.style.background = darkTheme ? '#6a4322' : '#fff';
                            }}
                            onBlur={e => {
                                e.target.style.borderColor = darkTheme ? '#a97c50' : '#ececec';
                                e.target.style.background = darkTheme ? '#4e2e1e' : '#f7f8fa';
                            }}
                        />
                    </div>
                    
                    
                    
                    {/* Dropdown Gen cu react-select */}
                    <div className="opere-select-container">
                        <Select
                            options={genOptions}
                            value={genOptions.find(opt => opt.value === selectedCategory)}
                            onChange={opt => setSelectedCategory(opt.value)}
                            styles={customSelectStyles(darkTheme)}
                            isSearchable={false}
                            menuPlacement="auto"
                            placeholder="Gen"
                            theme={theme => ({
                                ...theme,
                                borderRadius: 20,
                                colors: {
                                    ...theme.colors,
                                    primary25: darkTheme ? '#3a2312' : '#f7f8fa',
                                    primary: darkTheme ? '#ffd591' : '#a97c50',
                                    neutral0: darkTheme ? '#2a170a' : '#fffbeee',
                                    neutral80: darkTheme ? '#ffd591' : '#4e2e1e',
                                },
                            })}
                        />
                    </div>
                    
                    {/* Dropdown Canonic cu react-select */}
                    <div className="opere-select-container">
                        <Select
                            options={canonicOptions}
                            value={canonicOptions.find(opt => opt.value === canonicFilter)}
                            onChange={opt => setCanonicFilter(opt.value)}
                            styles={customSelectStyles(darkTheme)}
                            isSearchable={false}
                            menuPlacement="auto"
                            placeholder="Canonice"
                            theme={theme => ({
                                ...theme,
                                borderRadius: 20,
                                colors: {
                                    ...theme.colors,
                                    primary25: darkTheme ? '#3a2312' : '#f7f8fa',
                                    primary: darkTheme ? '#ffd591' : '#a97c50',
                                    neutral0: darkTheme ? '#2a170a' : '#fffbeee',
                                    neutral80: darkTheme ? '#ffd591' : '#4e2e1e',
                                },
                            })}
                        />
                    </div>
                </div>

                {/* Butoane categorii sub search bar */}
                <div className="opere-filter-buttons">
                    {categorii.filter(c => c.id !== 'toate').map(categorie => (
                        <button
                            key={categorie.id}
                            onClick={() => setSelectedCategory(categorie.id)}
                            className={`opere-filter-button ${darkTheme ? 'dark-theme' : ''} ${selectedCategory === categorie.id ? 'selected' : ''}`}
                        >
                            {categorie.nume}
                        </button>
                    ))}
                    
                    {/* Dropdown Subcategorii Roman - în linie cu butoanele */}
                    {selectedCategory === 'roman' && (
                        <div className="opere-roman-subcategory-container">
                            <Select
                                options={romanSubcategoriiOptions}
                                value={romanSubcategoriiOptions.find(opt => opt.value === romanSubcategorieFilter)}
                                onChange={opt => setRomanSubcategorieFilter(opt.value)}
                                styles={customSelectStyles(darkTheme)}
                                isSearchable={false}
                                menuPlacement="auto"
                                placeholder="Subcategorii roman"
                                theme={theme => ({
                                    ...theme,
                                    borderRadius: 20,
                                    colors: {
                                        ...theme.colors,
                                        primary25: darkTheme ? '#3a2312' : '#f7f8fa',
                                        primary: darkTheme ? '#ffd591' : '#a97c50',
                                        neutral0: darkTheme ? '#2a170a' : '#fffbeee',
                                        neutral80: darkTheme ? '#ffd591' : '#4e2e1e',
                                    },
                                })}
                            />
                        </div>
                    )}
                </div>

                {/* Grid Cărți */}
                <div className={`biblioteca-grid-container ${filteredCarti.length === 1 ? 'single-result' : ''}`}>
                    {filteredCarti.map((carte, idx) => (
                        <div
                            key={`${carte.titlu}-${carte.autor}`}
                            className={`biblioteca-card ${darkTheme ? 'dark-theme' : ''} ${(carte.jsonFile || (carte.categorie === 'poezie' && carte.poemKey)) ? 'has-pdf' : 'no-pdf'}`}
                            onClick={() => handleCardClick(carte)}
                            style={{ cursor: (carte.jsonFile || (carte.categorie === 'poezie' && carte.poemKey)) ? 'pointer' : 'default' }}
                            onMouseOver={e => {
                                if (carte.jsonFile || (carte.categorie === 'poezie' && carte.poemKey)) {
                                    e.currentTarget.style.transform = 'scale(1.055)';
                                    e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(60,40,20,0.22)';
                                    e.currentTarget.style.zIndex = 2;
                                }
                            }}
                            onMouseOut={e => {
                                if (carte.jsonFile || (carte.categorie === 'poezie' && carte.poemKey)) {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 24px 0 rgba(124,79,43,0.13)';
                                    e.currentTarget.style.zIndex = 1;
                                }
                            }}
                        >
                            <img
                                src={carte.img}
                                alt={carte.titlu}
                                className="biblioteca-card-img"
                            />
                            {/* Gradient overlay for readability */}
                            <div className={`biblioteca-card-overlay ${darkTheme ? 'dark-theme' : ''}`} />
                            
                            {/* Content overlay */}
                            <div className="biblioteca-card-content">
                                <div className="biblioteca-card-title">{carte.titlu}</div>
                                <div className="biblioteca-card-author">{carte.autor}</div>
                                <div className={`biblioteca-card-date ${darkTheme ? 'dark-theme' : ''}`}>
                                    {carte.data.replace('Redactare: ', '')}
                                </div>
                                <div className={`biblioteca-card-category ${darkTheme ? 'dark-theme' : ''}`}>
                                    {carte.categorie}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mesaj când nu sunt rezultate */}
                {filteredCarti.length === 0 && (
                    <div className={`biblioteca-no-results ${darkTheme ? 'dark-theme' : ''}`}>
                        Nu s-au găsit cărți care să corespundă criteriilor de căutare.
                    </div>
                )}
            </div>

            {/* Popup pentru poeziile scurte */}
            {poemModal.open && (
                <div className="biblioteca-poem-modal-overlay" onClick={() => {
                    setPoemModal({ open: false, poem: null });
                    unblockScroll(); // Deblochează scroll-ul
                }}>
                    <div className={`biblioteca-poem-modal ${darkTheme ? 'dark-theme' : ''}`} onClick={(e) => e.stopPropagation()}>
                        <div className="biblioteca-poem-modal-header">
                            <h2>{poemModal.poem.titlu}</h2>
                            <button 
                                className="biblioteca-poem-modal-close"
                                onClick={() => {
                                    setPoemModal({ open: false, poem: null });
                                    unblockScroll(); // Deblochează scroll-ul
                                }}
                            >
                                ×
                            </button>
                        </div>
                        <div className="biblioteca-poem-modal-content">
                            <div className="biblioteca-poem-author">{poemModal.poem.autor}</div>
                            <div className="biblioteca-poem-date">{poemModal.poem.data}</div>
                            <div className="biblioteca-poem-text">{poemModal.poem.text}</div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

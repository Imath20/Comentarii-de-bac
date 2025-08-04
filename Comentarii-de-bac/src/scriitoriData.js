// Date pentru fiecare scriitor, folosite în pagina Scriitor.jsx
const scriitoriData = {
  eminescu: {
    nume: 'Mihai Eminescu',
    // date: '1850 – 1889',
    img: '/scriitori/eminescu_mihai.png',
    color: 'rgba(122,58,0,0.82)',
    banner: '/Banner/eminescu.png',
    friends: [
      {
        name: 'Ion Creangă',
        key: 'creanga',
        img: '/scriitori/creanga_ion.png',
      },
      {
        name: 'Ioan Slavici',
        key: 'slavici',
        img: '/scriitori/ioan_slavici.png',
      },
      {
        name: 'I.L. Caragiale',
        key: 'caragiale',
        img: '/scriitori/il-caragiale.png',
      },
      {
        name: 'Titu Maiorescu',
        key: 'maiorescu',
        img: '/scriitori/titu_maiorescu (2).png',
      },
    ],
    gallery: [
      '/Banner/eminescu.png',
      '/scriitori/eminescu_mihai.png',
      '/opere/Luceafarul.png',
      '/opere scriitori/Glossa-1.png',
      '/opere scriitori/Glossa-2.png',
    ],
    posts: [
      {
        id: 1,
        pin: true,
        date: '15 ianuarie 1883',
        author: 'Mihai Eminescu',
        text: 'Astăzi am publicat "Luceafărul". O poezie la care am lucrat ani de zile.',
        image: '/opere/Luceafarul.png',
        link: '/poezie/luceafarul',
        likes: 1883,
        reactions: [
          { friendKey: 'creanga', reaction: 'love' },
          { friendKey: 'slavici', reaction: 'strengh' },
          { friendKey: 'caragiale', reaction: 'cool' },
          { friendKey: 'maiorescu', reaction: 'fire' },
        ],
        comments: [
          {
            author: 'Ion Creangă',
            key: 'creanga',
            text: 'Felicitări, Mihai! O capodoperă!',
          },
          {
            author: 'Ioan Slavici',
            key: 'slavici',
            text: 'Incredibilă poezie, prietene!',
          },
        ],
      },
      {
        id: 2,
        date: '15 ianuarie 1850',
        author: 'Mihai Eminescu',
        text: 'M-am născut astăzi, la Ipotești. "A fi român e o mândrie!"',
        image: null,
        likes: 1850,
        reactions: [
          { friendKey: 'creanga', reaction: 'love' },
          { friendKey: 'slavici', reaction: 'love' },
          { friendKey: 'caragiale', reaction: 'strengh' },
        ],
        comments: [
          {
            author: 'Ion Creangă',
            key: 'creanga',
            text: 'La mulți ani, Mihai!',
          },
        ],
      },
      {
        id: 3,
        date: '1879',
        author: 'Mihai Eminescu',
        text: 'Am scris poezia "Glossă". Gânduri despre timp și viață.',
        image: '/opere scriitori/Glosa.png', 
        likes: 1879,
        reactions: [
          { friendKey: 'creanga', reaction: 'love' },
          { friendKey: 'slavici', reaction: 'like' },
          { friendKey: 'caragiale', reaction: 'wow' },
          { friendKey: 'maiorescu', reaction: 'clap' },
        ],
        comments: [],
        isPoem: true,
        poemTitle: 'Glossă',
        poemText: `Vreme trece, vreme vine,
Toate-s vechi și nouă toate;
Ce e rău și ce e bine
Tu te-ntreabă și socoate;
Nu spera și nu ai teamă,
Ce e val ca valul trece;
De te-ndeamnă, de te cheamă,
Tu rămâi la toate rece.

Multe trec pe dinainte,
În auz ne sună multe,
Cine ține toate minte
Și ar sta să le asculte?...
Tu așează-te deoparte,
Regăsindu-te pe tine,
Când cu zgomote deșarte
Vreme trece, vreme vine.

Nici încline a ei limbă
Recea cumpăn-a gândirii
Înspre clipa ce se schimbă
Pentru masca fericirii,
Ce din moartea ei se naște
Și o clipă ține poate;
Pentru cine o cunoaște
Toate-s vechi și nouă toate.

Privitor ca la teatru
Tu în lume să te-nchipui:
Joace unul și pe patru,
Totuși tu ghici-vei chipu-i,
Și de plânge, de se ceartă,
Tu în colț petreci în tine
Și-nțelegi din a lor artă
Ce e rău și ce e bine.

Viitorul și trecutul
Sunt a filei două fețe,
Vede-n capăt începutul
Cine știe să le-nvețe;
Tot ce-a fost ori o să fie
În prezent le-avem pe toate,
Dar de-a lor zădărnicie
Te întreabă și socoate.

Căci acelorași mijloace
Se supun câte există,
Și de mii de ani încoace
Lumea-i veselă și tristă;
Alte măști, aceeași piesă,
Alte guri, aceeași gamă,
Amăgit atât de-adese
Nu spera și nu ai teamă.

Nu spera când vezi mișeii
La izbândă făcând punte,
Te-or întrece nătărăii,
De ai fi cu stea în frunte;
Teamă n-ai, căta-vor iarăși
Între dânșii să se plece,
Nu te prinde lor tovarăș:
Ce e val, ca valul trece.

Cu un cântec de sirenă,
Lumea-ntinde lucii mreje;
Ca să schimbe-actorii-n scenă,
Te momește în vârteje;
Tu pe-alături te strecoară,
Nu băga nici chiar de seamă,
Din cărarea ta afară
De te-ndeamnă, de te cheamă.

De te-ating, să feri în laturi,
De hulesc, să taci din gură;
Ce mai vrei cu-a tale sfaturi,
Dacă știi a lor măsură;
Zică toți ce vor să zică,
Treacă-n lume cine-o trece;
Ca să nu-ndrăgești nimică,
Tu rămâi la toate rece.

Tu rămâi la toate rece,
De te-ndeamnă, de te cheamă;
Ce e val, ca valul trece,
Nu spera și nu ai teamă;
Te întreabă și socoate
Ce e rău și ce e bine;
Toate-s vechi și nouă toate:
Vreme trece, vreme vine.`,
        poemImages: ['/opere scriitori/Glossa-1.png', '/opere scriitori/Glossa-2.png']
      },
    ],
  },
  creanga: {
    nume: 'Ion Creangă',
    date: '1837 – 1889',
    img: '/scriitori/creanga_ion.png',
    color: 'rgba(255,179,71,0.82)',
    banner: '/Banner/creanga.jpg',
  },
  caragiale: {
    nume: 'I.L. Caragiale',
    date: '1852 – 1912',
    img: '/scriitori/il-caragiale.png',
    color: 'rgba(255,179,71,0.82)',
    banner: '/Banner/caragiale.png',
  },
  slavici: {
    nume: 'Ioan Slavici',
    date: '1848 – 1925',
    img: '/scriitori/ioan_slavici.png',
    color: 'rgba(122,58,0,0.82)',
    banner: '/Banner/slavici.png',
  },
  rebreanu: {
    nume: 'Liviu Rebreanu',
    date: '1885 – 1944',
    img: '/scriitori/liviu_rebreanu_nou.png',
    color: 'rgba(255,179,71,0.82)',
    banner: '/Banner/rebreanu.png',
  },
  calinescu: {
    nume: 'George Călinescu',
    date: '1899 – 1965',
    img: '/scriitori/george_calinescu.png',
    color: 'rgba(255,179,71,0.82)',
    banner: '/Banner/calinescu.png',
  },
  petrescu: {
    nume: 'Camil Petrescu',
    date: '1894 – 1957',
    img: '/scriitori/camil_rezerva.png',
    color: 'rgba(122,58,0,0.82)',
    //banner: '/Banner/wmremove-transformed.png',
  },
  barbu: {
    nume: 'Ion Barbu',
    date: '1895 – 1961',
    img: '/scriitori/barbu_ion.png',
    color: 'rgba(255,179,71,0.82)',
    //banner: '/Banner/wmremove-transformed.png',
  },
  blaga: {
    nume: 'Lucian Blaga',
    date: '1895 – 1961',
    img: '/scriitori/lucian_blaga.png',
    color: 'rgba(122,58,0,0.82)',
    //banner: '/Banner/wmremove-transformed.png',
  },
  arghezi: {
    nume: 'Tudor Arghezi',
    date: '1880 – 1967',
    img: '/scriitori/tudor_arghezi.png',
    color: 'rgba(255,179,71,0.82)',
    //banner: '/Banner/wmremove-transformed.png',
  },
  bacovia: {
    nume: 'George Bacovia',
    date: '1881 – 1957',
    img: '/scriitori/bacovia_rezerva.png',
    color: 'rgba(122,58,0,0.82)',
    //banner: '/Banner/wmremove-transformed.png',
  },
  sadoveanu: {
    nume: 'Mihail Sadoveanu',
    date: '1880 – 1961',
    img: '/scriitori/mihail-sadoveanu-3.png',
    color: 'rgba(255,179,71,0.82)',
    //banner: '/Banner/wmremove-transformed.png',
  },
  preda: {
    nume: 'Marin Preda',
    date: '1922 – 1980',
    img: '/scriitori/marin_preda.png',
    color: 'rgba(122,58,0,0.82)',
    //banner: '/Banner/wmremove-transformed.png',
  },
  stanescu: {
    nume: 'Nichita Stănescu',
    date: '1933 – 1983',
    img: '/scriitori/nichita_stanescu_rezerva.png',
    color: 'rgba(255,179,71,0.82)',
    //banner: '/Banner/wmremove-transformed.png',
  },
  sorescu: {
    nume: 'Marin Sorescu',
    date: '1936 – 1996',
    img: '/scriitori/marin_sorescu.png',
    color: 'rgba(122,58,0,0.82)',
    //banner: '/Banner/wmremove-transformed.png',
  },
  maiorescu: {
    nume: 'Titu Maiorescu',
    date: '1840 – 1917',
    img: '/scriitori/titu_maiorescu (2).png',
    color: 'rgba(122,58,0,0.82)',
    //banner: '/Banner/wmremove-transformed.png',
  },
  eliade: {
    nume: 'Mircea Eliade',
    date: '1907 – 1986',
    img: '/scriitori/mircea-eliade.png',
    color: 'rgba(255,179,71,0.82)',
    //banner: '/Banner/wmremove-transformed.png',
  },
  negruzzi: {
    nume: 'Costache Negruzzi',
    date: '1808 – 1868',
    img: '/scriitori/costache-negruzzi.png',
    color: 'rgba(255,179,71,0.82)',
    //banner: '/Banner/wmremove-transformed.png',
  },
  pillat: {
    nume: 'Ion Pillat',
    date: '1891 – 1945',
    img: '/scriitori/ion_pillat.png',
    color: 'rgba(122,58,0,0.82)',
    //banner: '/Banner/wmremove-transformed.png',
  },
  voiculescu: {
    nume: 'Vasile Voiculescu',
    date: '1884 – 1963',
    img: '/scriitori/vasile_voiculescu.png',
    color: 'rgba(255,179,71,0.82)',
    //banner: '/Banner/wmremove-transformed.png',
  },
};

export default scriitoriData; 
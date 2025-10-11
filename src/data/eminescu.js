const eminescu = {
  nume: 'Mihai Eminescu',
  // date: '1850 – 1889',
  img: '/scriitori/eminescu_mihai.webp',
  color: 'rgba(122,58,0,0.82)',
  banner: '/Banner/eminescu.webp',
  friends: [
    {
      name: 'Ion Creangă',
      key: 'creanga',
      img: '/scriitori/creanga_ion.webp',
    },
    {
      name: 'Ioan Slavici',
      key: 'slavici',
      img: '/scriitori/ioan_slavici.webp',
    },
    {
      name: 'I.L. Caragiale',
      key: 'caragiale',
      img: '/scriitori/il-caragiale.webp',
    },
    {
      name: 'Titu Maiorescu',
      key: 'maiorescu',
      img: '/scriitori/titu_maiorescu (2).webp',
    },
    {
      name: 'Veronica Micle',
      key: 'veronica',
      img: '/Profile ganditorimea/Veronica Micle.webp',
    },
    {
      name: 'Costache Negruzzi',
      key: 'negruzzi',
      img: '/scriitori/costache-negruzzi.webp',
    },
  ],
  gallery: [
    '/Banner/eminescu.webp',
    '/scriitori/eminescu_mihai.webp',
    '/opere/Luceafarul.webp',
    '/opere scriitori/Glossa-1.webp',
    '/opere scriitori/Glossa-2.webp',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '15 ianuarie 1883',
      author: 'Mihai Eminescu',
      text: 'Astăzi am publicat "Luceafărul". O poezie la care am lucrat ani de zile.',
      image: '/opere/Luceafarul.webp',
      pinnedActions: [
        {
          type: 'comentariu',
          text: 'Comentariul operei',
          link: '#', // Link gol pentru pagina care nu există încă
          icon: '📝'
        },
        {
          type: 'opera',
          text: 'Citește opera',
          link: '/carte/luceafarul', // Link către BookReader pentru Luceafărul
          icon: '📖'
        }
      ],
      likes: 1883,
      reactions: [
        { friendKey: 'veronica', reaction: 'ador' },
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
        { friendKey: 'veronica', reaction: 'ador' },
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
      image: '/opere scriitori/Glosa.webp', 
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
      poemImages: ['/opere scriitori/Glossa-1.webp', '/opere scriitori/Glossa-2.webp']
    },
  ],
};

export default eminescu; 
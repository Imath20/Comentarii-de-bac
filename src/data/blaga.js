const blaga = {
  nume: 'Lucian Blaga',
  // date: '1895 – 1961',
  img: '/scriitori/lucian_blaga.webp',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/blaga.webp',
  friends: [
    {
      name: 'Tudor Arghezi',
      key: 'arghezi',
      img: '/scriitori/tudor_arghezi.webp',
    },
    {
      name: 'Ion Barbu',
      key: 'barbu',
      img: '/scriitori/barbu_ion.webp',
    },
    {
      name: 'Eugen Lovinescu',
      key: 'lovinescu',
      img: '/scriitori/eugen_lovinescu.webp',
    },
    {
      name: 'George Bacovia',
      key: 'bacovia',
      img: '/scriitori/bacovia_rezerva.webp',
    },
    {
      name: 'Liviu Rebreanu',
      key: 'rebreanu',
      img: '/scriitori/liviu_rebreanu_nou.webp',
    },
    {
      name: 'Camil Petrescu',
      key: 'petrescu',
      img: '/scriitori/camil_rezerva.webp',
    },
    {
      name: 'George Călinescu',
      key: 'calinescu',
      img: '/scriitori/george_calinescu.webp',
    },
  ],
  gallery: [
    '/Banner/blaga.webp',
    '/scriitori/lucian_blaga.webp',
    '/opere/corola_minuni.webp',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '15 aprilie 1921',
      author: 'Lucian Blaga',
      text: 'Am publicat "Eu nu strivesc corola de minuni a lumii" - o poezie care să exploreze misterul existenței prin prisma luminii divine. Fiecare vers este o căutare a adevărului, fiecare cuvânt este o fereastră către infinit.',
      image: '/opere/corola_minuni.webp',
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
          link: 'eu-nu-strivesc-corola', // Link către popup pentru poezia Eu nu strivesc corola de minuni a lumii
          icon: '📖',
          isPoem: true
        }
      ],
      likes: 1921,
      reactions: [
        { friendKey: 'arghezi', reaction: 'ador' },
        { friendKey: 'barbu', reaction: 'love' },
        { friendKey: 'bacovia', reaction: 'strengh' },
        { friendKey: 'rebreanu', reaction: 'cool' },
        { friendKey: 'petrescu', reaction: 'fire' },
        { friendKey: 'calinescu', reaction: 'clap' },
      ],
      comments: [
        {
          author: 'Tudor Arghezi',
          key: 'arghezi',
          text: 'Minunată poezie, Luciane! "Eu nu strivesc corola de minuni a lumii" este o bijuterie filosofică!',
        },
        {
          author: 'Ion Barbu',
          key: 'barbu',
          text: 'Felicitări! Ai reușit să capturezi esența misterului în versuri!',
        },
        {
          author: 'George Bacovia',
          key: 'bacovia',
          text: 'Excelentă lucrare! Poeziile tale au o adâncime metafizică extraordinară!',
        },
      ],
    },
    {
      id: 2,
      date: '1919',
      author: 'Lucian Blaga',
      text: '„Lumina ce-o simt năvălindu-mi în piept când te văd- minunato...”\nAzi am scris aceste versuri despre taina care se aprinde în om când iubirea devine rază.\nLumina nu doar luminează lumea, o face să existe. ✨',
      image: '/opere scriitori/lumina.webp', 
      reactions: [
        { friendKey: 'arghezi', reaction: 'love' },
        { friendKey: 'barbu', reaction: 'like' },
        { friendKey: 'rebreanu', reaction: 'wow' },
        { friendKey: 'lovinescu', reaction: 'clap' },
        { friendKey: 'calinescu', reaction: 'cool' },
        { friendKey: 'petrescu', reaction: 'ador' },
        { friendKey: 'bacovia', reaction: 'fire' },
      ],
      comments: [
        {
          author: 'Ion Barbu',
          key: 'barbu',
          text: 'Formidabil cum ai transformat lumina în geometrie vie. E ca un cristal care respiră poezie.',
        },
        {
          author: 'Eugen Lovinescu',
          key: 'lovinescu',
          text: 'În estetica ta se simte sinteza dintre tradiție și modernism. Poezia ta e o metafizică a luminii, o nouă direcție pentru lirica românească.',
        },
        {
          author: 'George Calinescu',
          key: 'calinescu',
          text: 'Într-o lume în care lumina e doar fenomen fizic, tu o transformi în conștiință. Interesantă viziune, aproape filozofică.',
        },
      ],
      isPoem: true,
      poemTitle: 'Lumina',
      poemText: `Lumina ce-o simt
năvălindu-mi în piept când te vad,
oare nu e un strop din lumina
creată în ziua dintâi,
din lumina aceea-nsetată adânc de viață?

Nimicul zăcea-n agonie
când singur plutea-ntuneric și dat-a
un semn Nepătrunsul:
"Să fie lumină!"

O mare
și-un vifor nebun de lumină
facutu-s-a-n clipa:
o sete era de pacate, de-aventuri, de doruri, de patimi,
o sete de lume și soare.

Dar unde-a pierit orbitoarea
lumină de-atunci - cine știe?

Lumina ce-o simt năvălindu-mi
în piept când te vad - minunato,
e poate ca ultimul strop
din lumina creată în ziua dintâi.`,
      poemImages: ['/opere scriitori/lumina.webp']
    },
  ],
};

export default blaga; 
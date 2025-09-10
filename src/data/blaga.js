const blaga = {
  nume: 'Lucian Blaga',
  // date: '1895 – 1961',
  img: '/scriitori/lucian_blaga.png',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/blaga.png',
  friends: [
    {
      name: 'Tudor Arghezi',
      key: 'arghezi',
      img: '/scriitori/tudor_arghezi.png',
    },
    {
      name: 'Ion Barbu',
      key: 'barbu',
      img: '/scriitori/barbu_ion.png',
    },
    {
      name: 'George Bacovia',
      key: 'bacovia',
      img: '/scriitori/bacovia_rezerva.png',
    },
    {
      name: 'Liviu Rebreanu',
      key: 'rebreanu',
      img: '/scriitori/liviu_rebreanu_nou.png',
    },
    {
      name: 'Camil Petrescu',
      key: 'petrescu',
      img: '/scriitori/camil_rezerva.png',
    },
    {
      name: 'George Călinescu',
      key: 'calinescu',
      img: '/scriitori/george_calinescu.png',
    },
  ],
  gallery: [
    '/Banner/blaga.png',
    '/scriitori/lucian_blaga.png',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '15 aprilie 1921',
      author: 'Lucian Blaga',
      text: 'Am publicat "Eu nu strivesc corola de minuni a lumii" - o poezie care să exploreze misterul existenței prin prisma luminii divine. Fiecare vers este o căutare a adevărului, fiecare cuvânt este o fereastră către infinit.',
      image: '/opere/corola_minuni.png',
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
  ],
};

export default blaga; 
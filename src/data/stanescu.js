const stanescu = {
  nume: 'Nichita Stănescu',
  // date: '1933 – 1983',
  img: '/scriitori/nichita_stanescu_rezerva.webp',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/stanescu.webp',
  friends: [
    {
      name: 'Tudor Arghezi',
      key: 'arghezi',
      img: '/scriitori/tudor_arghezi.webp',
    },
    {
      name: 'Lucian Blaga',
      key: 'blaga',
      img: '/scriitori/lucian_blaga.webp',
    },
    {
      name: 'Ion Barbu',
      key: 'barbu',
      img: '/scriitori/barbu_ion.webp',
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
  ],
  gallery: [
    '/Banner/stanescu.webp',
    '/scriitori/nichita_stanescu_rezerva.webp',
    '/opere/leoaica-iubirea.webp',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '10 mai 1966',
      author: 'Nichita Stănescu',
      text: 'Am publicat "Leoaică tânără, iubirea" - o poezie care să exploreze esența existenței prin prisma metaforei și a simbolului. Fiecare vers este o revelație, fiecare cuvânt este o fereastră către infinit.',
      image: '/opere/leoaica-iubirea.webp',
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
          link: 'leoaica-iubirea', // Link către popup pentru poezia Leoaică tânără, iubirea
          icon: '📖',
          isPoem: true
        }
      ],
      likes: 1966,
      reactions: [
        { friendKey: 'arghezi', reaction: 'ador' },
        { friendKey: 'blaga', reaction: 'love' },
        { friendKey: 'barbu', reaction: 'strengh' },
        { friendKey: 'bacovia', reaction: 'cool' },
        { friendKey: 'rebreanu', reaction: 'fire' },
        { friendKey: 'petrescu', reaction: 'clap' },
      ],
      comments: [
        {
          author: 'Tudor Arghezi',
          key: 'arghezi',
          text: 'Minunată colecție, Nichita! Poeziile tale sunt adevărate bijuterii metaforice!',
        },
        {
          author: 'Lucian Blaga',
          key: 'blaga',
          text: 'Felicitări! Ai reușit să capturezi esența existenței în versuri!',
        },
        {
          author: 'Ion Barbu',
          key: 'barbu',
          text: 'Excelentă lucrare! Poeziile tale au o forță expresivă extraordinară!',
        },
      ],
    },
  ],
};

export default stanescu; 
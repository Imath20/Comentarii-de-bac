const voiculescu = {
  nume: 'Vasile Voiculescu',
  // date: '1884 – 1963',
  img: '/scriitori/vasile_voiculescu.png',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/voiculescu.png',
  friends: [
    {
      name: 'Tudor Arghezi',
      key: 'arghezi',
      img: '/scriitori/tudor_arghezi.png',
    },
    {
      name: 'Lucian Blaga',
      key: 'blaga',
      img: '/scriitori/lucian_blaga.png',
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
  ],
  gallery: [
    '/Banner/voiculescu.png',
    '/scriitori/vasile_voiculescu.png',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '15 martie 1921',
      author: 'Vasile Voiculescu',
      text: 'Am publicat "În Grădina Ghetsimani" - o poezie care să exploreze lupta cu soarta și suferința umană. Fiecare vers este o meditație asupra existenței, fiecare cuvânt este o expresie a condiției umane.',
      image: '/opere/gradina-ghetsimani.png',
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
          link: 'gradina-ghetsimani', // Link către popup pentru poezia În Grădina Ghetsimani
          icon: '📖',
          isPoem: true
        }
      ],
      likes: 1921,
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
          text: 'Minunată colecție, Vasile! Poeziile tale sunt adevărate bijuterii patriotice!',
        },
        {
          author: 'Lucian Blaga',
          key: 'blaga',
          text: 'Felicitări! Ai reușit să capturezi esența frumuseții românești!',
        },
        {
          author: 'Ion Barbu',
          key: 'barbu',
          text: 'Excelentă lucrare! Poeziile tale au o forță patriotică extraordinară!',
        },
      ],
    },
  ],
};

export default voiculescu; 
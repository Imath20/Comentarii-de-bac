const bacovia = {
  nume: 'George Bacovia',
  // date: '1881 – 1957',
  img: '/scriitori/bacovia_rezerva.png',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/bacovia.png',
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
    '/Banner/bacovia.png',
    '/scriitori/bacovia_rezerva.png',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '15 martie 1916',
      author: 'George Bacovia',
      text: 'Am publicat "Plumb" - o poezie care să exploreze melancolia și singurătatea existenței urbane. Fiecare vers este o picătură de plumb, fiecare cuvânt este o expresie a stării de spirit moderne.',
      image: '/opere/plumb.png',
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
          link: 'plumb', // Link către popup pentru poezia Plumb
          icon: '📖',
          isPoem: true
        }
      ],
      likes: 1916,
      reactions: [
        { friendKey: 'arghezi', reaction: 'ador' },
        { friendKey: 'blaga', reaction: 'love' },
        { friendKey: 'barbu', reaction: 'strengh' },
        { friendKey: 'rebreanu', reaction: 'cool' },
        { friendKey: 'petrescu', reaction: 'fire' },
        { friendKey: 'calinescu', reaction: 'clap' },
      ],
      comments: [
        {
          author: 'Tudor Arghezi',
          key: 'arghezi',
          text: 'Minunată colecție, George! Poeziile tale sunt adevărate bijuterii literare!',
        },
        {
          author: 'Lucian Blaga',
          key: 'blaga',
          text: 'Felicitări! Ai reușit să capturezi esența melancoliei în versuri!',
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

export default bacovia; 
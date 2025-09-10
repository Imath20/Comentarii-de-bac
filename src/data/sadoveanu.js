const sadoveanu = {
  nume: 'Mihail Sadoveanu',
  // date: '1880 – 1961',
  img: '/scriitori/mihail-sadoveanu-3.png',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/sadoveanu.png',
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
    '/Banner/sadoveanu.png',
    '/scriitori/mihail-sadoveanu-3.png',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '15 martie 1930',
      author: 'Mihail Sadoveanu',
      text: 'Am publicat "Baltagul" - un roman care să exploreze viața țăranilor români din Moldova. Fiecare pagină este impregnată cu frumusețea naturii și cu înțelepciunea poporului nostru.',
      image: '/opere/baltagul.png',
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
          link: '/carte/baltagul', // Link către BookReader pentru Baltagul
          icon: '📖'
        }
      ],
      likes: 1930,
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
          text: 'Minunat roman, Mihail! Ai prins perfect frumusețea Moldovei!',
        },
        {
          author: 'Lucian Blaga',
          key: 'blaga',
          text: 'Felicitări! Ai reușit să capturezi esența naturii românești!',
        },
        {
          author: 'Ion Barbu',
          key: 'barbu',
          text: 'Excelentă lucrare! Romanul tău este o capodoperă pastorală!',
        },
      ],
    },
  ],
};

export default sadoveanu; 
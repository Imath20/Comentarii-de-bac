const barbu = {
  nume: 'Ion Barbu',
  // date: '1895 – 1961',
  img: '/scriitori/barbu_ion.png',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/barbu.png',
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
    {
      name: 'Mihail Sadoveanu',
      key: 'sadoveanu',
      img: '/scriitori/mihail-sadoveanu-3.png',
    },
    {
      name: 'Ion Pillat',
      key: 'pillat',
      img: '/scriitori/ion_pillat.png',
    },
    {
      name: 'Marin Preda',
      key: 'preda',
      img: '/scriitori/marin_preda.png',
    },
    {
      name: 'Marin Sorescu',
      key: 'sorescu',
      img: '/scriitori/marin_sorescu.png',
    },
    {
      name: 'Nichita Stănescu',
      key: 'stanescu',
      img: '/scriitori/nichita_stanescu_rezerva.png',
    },
    {
      name: 'Vasile Voiculescu',
      key: 'voiculescu',
      img: '/scriitori/vasile_voiculescu.png',
    },
    {
      name: 'Mircea Eliade',
      key: 'eliade',
      img: '/scriitori/mircea-eliade.png',
    },
  ],
  gallery: [
    '/Banner/barbu.png',
    '/scriitori/barbu_ion.png',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '10 mai 1930',
      author: 'Ion Barbu',
      text: 'Am publicat "Riga Crypto" - o poezie care să exploreze complexitatea existenței prin prisma matematicii și filosofiei. Fiecare vers este o ecuație poetică, fiecare cuvânt este o variabilă a vieții.',
      image: '/opere/riga-crypto.png',
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
          link: '/carte/riga-crypto', // Link către BookReader pentru Riga Crypto
          icon: '📖'
        }
      ],
      likes: 1930,
      reactions: [
        { friendKey: 'arghezi', reaction: 'ador' },
        { friendKey: 'blaga', reaction: 'love' },
        { friendKey: 'bacovia', reaction: 'strengh' },
        { friendKey: 'rebreanu', reaction: 'cool' },
        { friendKey: 'petrescu', reaction: 'fire' },
        { friendKey: 'calinescu', reaction: 'clap' },
      ],
      comments: [
        {
          author: 'Tudor Arghezi',
          key: 'arghezi',
          text: 'Minunată poezie, Ioane! "Riga Crypto" este o bijuterie matematică!',
        },
        {
          author: 'Lucian Blaga',
          key: 'blaga',
          text: 'Felicitări! Ai reușit să unifici poezia cu matematica!',
        },
        {
          author: 'George Bacovia',
          key: 'bacovia',
          text: 'Excelentă lucrare! Poeziile tale au o precizie matematică extraordinară!',
        },
      ],
    },
  ],
};

export default barbu; 
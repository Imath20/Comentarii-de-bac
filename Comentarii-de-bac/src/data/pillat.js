const pillat = {
  nume: 'Ion Pillat',
  // date: '1891 – 1945',
  img: '/scriitori/ion_pillat.png',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/pillat.png',
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
    '/Banner/pillat.png',
    '/scriitori/ion_pillat.png',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '8 decembrie 1923',
      author: 'Ion Pillat',
      text: 'Am publicat "Aci sosi pe vremuri" - o poezie care să exploreze frumusețea naturii românești și să exprime dragostea pentru țară. Fiecare vers este o declarație de iubire pentru România.',
      image: '/opere/aci-sosi.png',
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
          link: 'aci-sosi', // Link către popup pentru poezia Aci sosi pe vremuri
          icon: '📖',
          isPoem: true
        }
      ],
      likes: 1923,
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
          text: 'Minunată colecție, Ioane! Poeziile tale sunt adevărate bijuterii patriotice!',
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

export default pillat; 
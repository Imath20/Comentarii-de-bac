const arghezi = {
  nume: 'Tudor Arghezi',
  // date: '1880 – 1967',
  img: '/scriitori/tudor_arghezi.png',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/arghezi.png',
  friends: [
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
    '/Banner/arghezi.png',
    '/scriitori/tudor_arghezi.png',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '15 martie 1927',
      author: 'Tudor Arghezi',
      text: 'Am publicat "Testament" - o poezie care să exploreze moștenirea spirituală și culturală a poporului român. Fiecare vers este o testamentare a valorilor noastre, fiecare cuvânt este o moștenire pentru generațiile viitoare.',
      image: '/opere/testament.png',
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
          link: 'testament', // Link către popup pentru poezia Testament
          icon: '📖',
          isPoem: true
        }
      ],
      likes: 1927,
      reactions: [
        { friendKey: 'blaga', reaction: 'ador' },
        { friendKey: 'barbu', reaction: 'love' },
        { friendKey: 'bacovia', reaction: 'strengh' },
        { friendKey: 'rebreanu', reaction: 'cool' },
        { friendKey: 'petrescu', reaction: 'fire' },
        { friendKey: 'calinescu', reaction: 'clap' },
      ],
      comments: [
        {
          author: 'Lucian Blaga',
          key: 'blaga',
          text: 'Excelentă colecție, Tudore! Poeziile tale sunt adevărate bijuterii literare!',
        },
        {
          author: 'Ion Barbu',
          key: 'barbu',
          text: 'Felicitări! Ai reușit să capturezi esența vieții în versuri!',
        },
        {
          author: 'George Bacovia',
          key: 'bacovia',
          text: 'Minunată lucrare! Poeziile tale au o forță expresivă extraordinară!',
        },
      ],
    },
  ],
};

export default arghezi; 
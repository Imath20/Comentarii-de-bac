const sorescu = {
  nume: 'Marin Sorescu',
  // date: '1936 – 1996',
  img: '/scriitori/marin_sorescu.png',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/sorescu.png',
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
    '/Banner/sorescu.png',
    '/scriitori/marin_sorescu.png',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '20 aprilie 1975',
      author: 'Marin Sorescu',
      text: 'Am publicat "Iona" - o piesă de teatru care să exploreze existențialismul și absurdul vieții moderne. Fiecare replică este o întrebare despre sensul existenței, fiecare personaj este o metaforă a condiției umane.',
      image: '/opere/iona.png',
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
          link: '/carte/iona', // Link către BookReader pentru Iona
          icon: '📖'
        }
      ],
      likes: 1975,
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
          text: 'Minunată piesă, Marin! Ai prins perfect absurdul existenței!',
        },
        {
          author: 'Lucian Blaga',
          key: 'blaga',
          text: 'Felicitări! Ai reușit să capturezi esența condiției umane!',
        },
        {
          author: 'Ion Barbu',
          key: 'barbu',
          text: 'Excelentă lucrare! Piesa ta este o capodoperă existențială!',
        },
      ],
    },
  ],
};

export default sorescu; 
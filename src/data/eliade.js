const eliade = {
  nume: 'Mircea Eliade',
  // date: '1907 – 1986',
  img: '/scriitori/mircea-eliade.webp',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/eliade.webp',
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
    '/Banner/eliade.webp',
    '/scriitori/mircea-eliade.webp',
    '/opere/maytreyi.webp',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '15 martie 1933',
      author: 'Mircea Eliade',
      text: 'Am publicat "Maitreyi" - un roman care să exploreze dragostea și spiritualitatea indiană. Fiecare pagină este o călătorie prin India, fiecare personaj este o reprezentare a filosofiei orientale.',
      image: '/opere/maytreyi.webp',
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
          link: '/carte/maitreyi', // Link către BookReader pentru Maitreyi
          icon: '📖'
        }
      ],
      likes: 1933,
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
          text: 'Minunat roman, Mircea! Ai prins perfect mitologia românească!',
        },
        {
          author: 'Lucian Blaga',
          key: 'blaga',
          text: 'Felicitări! Ai reușit să capturezi esența spiritualității!',
        },
        {
          author: 'Ion Barbu',
          key: 'barbu',
          text: 'Excelentă lucrare! Romanul tău este o capodoperă mitologică!',
        },
      ],
    },
  ],
};

export default eliade; 
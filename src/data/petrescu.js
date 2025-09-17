const petrescu = {
  nume: 'Camil Petrescu',
  // date: '1894 – 1957',
  img: '/scriitori/camil_rezerva.webp',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/petrescu.webp',
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
      name: 'George Călinescu',
      key: 'calinescu',
      img: '/scriitori/george_calinescu.webp',
    },
  ],
  gallery: [
    '/Banner/petrescu.webp',
    '/scriitori/camil_rezerva.webp',
    '/opere/ultima-noapte.webp',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '15 martie 1930',
      author: 'Camil Petrescu',
      text: 'Am publicat "Ultima noapte de dragoste, întâia noapte de război" - un roman care să exploreze existențialismul și dragostea în timpul Primului Război Mondial. Fiecare pagină este o meditație asupra existenței, fiecare personaj este o reprezentare a condiției umane.',
      image: '/opere/ultima-noapte.webp',
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
          link: '/carte/ultima-noapte-dragoste', // Link către BookReader pentru Ultima noapte de dragoste
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
        { friendKey: 'calinescu', reaction: 'clap' },
      ],
      comments: [
        {
          author: 'Tudor Arghezi',
          key: 'arghezi',
          text: 'Minunat roman, Camil! "Ultima noapte de dragoste" este o capodoperă psihologică!',
        },
        {
          author: 'Lucian Blaga',
          key: 'blaga',
          text: 'Felicitări! Ai reușit să capturezi esența sufletului uman!',
        },
        {
          author: 'Ion Barbu',
          key: 'barbu',
          text: 'Excelentă lucrare! Romanul tău este o capodoperă psihologică!',
        },
      ],
    },
  ],
};

export default petrescu; 
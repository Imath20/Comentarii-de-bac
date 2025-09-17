const preda = {
  nume: 'Marin Preda',
  // date: '1922 – 1980',
  img: '/scriitori/marin_preda.webp',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/preda.webp',
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
    '/Banner/preda.webp',
    '/scriitori/marin_preda.webp',
    '/opere/morometii.webp',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '15 martie 1960',
      author: 'Marin Preda',
      text: 'Am publicat "Moromeții" - un roman care să exploreze viața țăranilor români în perioada interbelică și postbelică. Fiecare pagină este o frescă a societății românești, fiecare personaj este un tip social autentic.',
      image: '/opere/morometii.webp',
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
          link: '/carte/morometii', // Link către BookReader pentru Moromeții
          icon: '📖'
        }
      ],
      likes: 1960,
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
          text: 'Minunat roman, Marin! Ai prins perfect spiritul epocii!',
        },
        {
          author: 'Lucian Blaga',
          key: 'blaga',
          text: 'Felicitări! Ai reușit să capturezi esența societății românești!',
        },
        {
          author: 'Ion Barbu',
          key: 'barbu',
          text: 'Excelentă lucrare! Romanul tău este o capodoperă socială!',
        },
      ],
    },
  ],
};

export default preda; 
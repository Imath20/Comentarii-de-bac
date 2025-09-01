const calinescu = {
  nume: 'George Călinescu',
  // date: '1899 – 1965',
  img: '/scriitori/george_calinescu.png',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/calinescu.png',
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
    '/Banner/calinescu.png',
    '/scriitori/george_calinescu.png',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '15 martie 1938',
      author: 'George Călinescu',
      text: 'Am publicat "Enigma Otiliei" - un roman care să exploreze viața intelectuală românească din perioada interbelică. Fiecare pagină este o frescă a societății românești, fiecare personaj este un tip social autentic.',
      image: '/opere/enigma-otiliei.png',
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
          link: '/carte/enigma-otiliei', // Link către BookReader pentru Enigma Otiliei
          icon: '📖'
        }
      ],
      likes: 1938,
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
          text: 'Minunat roman, George! Ai prins perfect spiritul epocii!',
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

export default calinescu; 
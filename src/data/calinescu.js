const calinescu = {
  nume: 'George Călinescu',
  // date: '1899 – 1965',
  img: '/scriitori/george_calinescu.webp',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/calinescu.webp',
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
      name: 'Eugen Lovinescu',
      key: 'lovinescu',
      img: '/scriitori/lovinescu_eugen.webp',
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
    '/Banner/calinescu.webp',
    '/scriitori/george_calinescu.webp',
    '/opere/enigma-otiliei.webp',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '15 martie 1938',
      author: 'George Călinescu',
      text: 'Am publicat "Enigma Otiliei" - un roman care să exploreze viața intelectuală românească din perioada interbelică. Fiecare pagină este o frescă a societății românești, fiecare personaj este un tip social autentic.',
      image: '/opere/enigma-otiliei.webp',
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
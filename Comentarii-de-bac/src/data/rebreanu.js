const rebreanu = {
  nume: 'Liviu Rebreanu',
  // date: '1885 – 1944',
  img: '/scriitori/liviu_rebreanu_nou.png',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/rebreanu.png',
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
      name: 'Camil Petrescu',
      key: 'petrescu',
      img: '/scriitori/camil_rezerva.png',
    },
    {
      name: 'George Călinescu',
      key: 'calinescu',
      img: '/scriitori/george_calinescu.png',
    },
  ],
  gallery: [
    '/Banner/rebreanu.png',
    '/scriitori/liviu_rebreanu_nou.png',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '25 august 1922',
      author: 'Liviu Rebreanu',
      text: 'Am publicat "Ion" - un roman care să exploreze viața țăranilor români din Transilvania. Fiecare pagină este impregnată cu frumusețea naturii și cu înțelepciunea poporului nostru.',
      image: '/opere/Ion.png',
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
          link: '/carte/ion', // Link către BookReader pentru Ion
          icon: '📖'
        }
      ],
      likes: 1922,
      reactions: [
        { friendKey: 'arghezi', reaction: 'ador' },
        { friendKey: 'blaga', reaction: 'love' },
        { friendKey: 'barbu', reaction: 'strengh' },
        { friendKey: 'bacovia', reaction: 'cool' },
        { friendKey: 'petrescu', reaction: 'fire' },
        { friendKey: 'calinescu', reaction: 'clap' },
      ],
      comments: [
        {
          author: 'Tudor Arghezi',
          key: 'arghezi',
          text: 'Minunat roman, Liviu! "Ion" este o capodoperă pastorală!',
        },
        {
          author: 'Lucian Blaga',
          key: 'blaga',
          text: 'Felicitări! Ai reușit să capturezi esența suferinței umane!',
        },
        {
          author: 'Ion Barbu',
          key: 'barbu',
          text: 'Excelentă lucrare! Romanul tău este o capodoperă literară!',
        },
      ],
    },
  ],
};

export default rebreanu; 
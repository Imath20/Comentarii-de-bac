const slavici = {
  nume: 'Ioan Slavici',
  // date: '1848 – 1925',
  img: '/scriitori/ioan_slavici.png',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/slavici.png',
  friends: [
    {
      name: 'Mihai Eminescu',
      key: 'eminescu',
      img: '/scriitori/eminescu_mihai.png',
    },
    {
      name: 'Ion Creangă',
      key: 'creanga',
      img: '/scriitori/creanga_ion.png',
    },
    {
      name: 'I.L. Caragiale',
      key: 'caragiale',
      img: '/scriitori/il-caragiale.png',
    },
    {
      name: 'Titu Maiorescu',
      key: 'maiorescu',
      img: '/scriitori/titu_maiorescu (2).png',
    },
    {
      name: 'Veronica Micle',
      key: 'veronica',
      img: '/Profile ganditorimea/Veronica Micle.png',
    },
  ],
  gallery: [
    '/Banner/slavici.png',
    '/scriitori/ioan_slavici.png',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '15 martie 1880',
      author: 'Ioan Slavici',
      text: 'Astăzi am publicat "Moara cu noroc". O nuvelă care să exploreze viața țăranilor români din Transilvania. Fiecare pagină este impregnată cu frumusețea naturii și cu înțelepciunea poporului nostru.',
      image: '/opere/moara-cu-noroc.png',
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
          link: '/carte/moara-cu-noroc', // Link către BookReader pentru Moara cu noroc
          icon: '📖'
        }
      ],
      likes: 1880,
      reactions: [
        { friendKey: 'eminescu', reaction: 'ador' },
        { friendKey: 'creanga', reaction: 'love' },
        { friendKey: 'caragiale', reaction: 'strengh' },
        { friendKey: 'maiorescu', reaction: 'cool' },
        { friendKey: 'rebreanu', reaction: 'fire' },
      ],
      comments: [
        {
          author: 'Mihai Eminescu',
          key: 'eminescu',
          text: 'Minunată nuvelă, Ioane! Ai prins perfect spiritul pastoral!',
        },
        {
          author: 'Ion Creangă',
          key: 'creanga',
          text: 'Felicitări! Ai reușit să capturezi esența naturii românești!',
        },
      ],
    },
    {
      id: 2,
      pin: true,
      date: '15 martie 1894',
      author: 'Ioan Slavici',
      text: 'Am publicat "Mara". O nuvelă care să exploreze viața femeilor române din Transilvania. Fiecare pagină este o poveste de dragoste și suferință, fiecare personaj este o reprezentare a condiției umane.',
      image: '/opere/mara.png',
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
          link: '/carte/mara', // Link către BookReader pentru Mara
          icon: '📖'
        }
      ],
      likes: 1894,
      reactions: [
        { friendKey: 'eminescu', reaction: 'love' },
        { friendKey: 'creanga', reaction: 'ador' },
        { friendKey: 'caragiale', reaction: 'strengh' },
        { friendKey: 'maiorescu', reaction: 'cool' },
        { friendKey: 'rebreanu', reaction: 'fire' },
      ],
      comments: [
        {
          author: 'Mihai Eminescu',
          key: 'eminescu',
          text: 'Minunată nuvelă, Ioane! "Mara" este o capodoperă pastorală!',
        },
        {
          author: 'Ion Creangă',
          key: 'creanga',
          text: 'Felicitări! Ai reușit să capturezi esența dragostei în versuri!',
        },
      ],
    },
  ],
};

export default slavici; 
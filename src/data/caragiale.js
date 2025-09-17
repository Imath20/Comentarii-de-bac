const caragiale = {
  nume: 'I.L. Caragiale',
  // date: '1852 – 1912',
  img: '/scriitori/il-caragiale.webp',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/caragiale.webp',
  friends: [
    {
      name: 'Mihai Eminescu',
      key: 'eminescu',
      img: '/scriitori/eminescu_mihai.webp',
    },
    {
      name: 'Ion Creangă',
      key: 'creanga',
      img: '/scriitori/creanga_ion.webp',
    },
    {
      name: 'Ioan Slavici',
      key: 'slavici',
      img: '/scriitori/ioan_slavici.webp',
    },
    {
      name: 'Titu Maiorescu',
      key: 'maiorescu',
      img: '/scriitori/titu_maiorescu (2).webp',
    },
    {
      name: 'Costache Negruzzi',
      key: 'negruzzi',
      img: '/scriitori/costache-negruzzi.webp',
    },
    {
      name: 'Veronica Micle',
      key: 'veronica',
      img: '/Profile ganditorimea/Veronica Micle.webp',
    },
  ],
  gallery: [
    '/Banner/caragiale.webp',
    '/scriitori/il-caragiale.webp',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '15 martie 1884',
      author: 'I.L. Caragiale',
      text: 'Astăzi am publicat "O scrisoare pierdută". O comedie care să exploreze viața politică românească prin prisma umorului și a satirii. Fiecare personaj este un tip social autentic, fiecare replică este o critică subtilă la adresa societății.',
      image: '/opere/scrisoare-pierduta.webp',
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
          link: '/carte/o-scrisoare-pierduta', // Link către BookReader pentru O scrisoare pierdută
          icon: '📖'
        }
      ],
      likes: 1884,
      reactions: [
        { friendKey: 'eminescu', reaction: 'ador' },
        { friendKey: 'creanga', reaction: 'love' },
        { friendKey: 'slavici', reaction: 'strengh' },
        { friendKey: 'maiorescu', reaction: 'cool' },
        { friendKey: 'negruzzi', reaction: 'fire' },
        { friendKey: 'veronica', reaction: 'clap' },
      ],
      comments: [
        {
          author: 'Mihai Eminescu',
          key: 'eminescu',
          text: 'Excelentă lucrare, I.L.! Ai prins perfect spiritul epocii!',
        },
        {
          author: 'Ion Creangă',
          key: 'creanga',
          text: 'Minunată satiră! Personajele tale sunt de neuitat!',
        },
        {
          author: 'Titu Maiorescu',
          key: 'maiorescu',
          text: 'Felicitări! Schițele tale sunt adevărate capodopere literare!',
        },
      ],
    },
  ],
};

export default caragiale; 
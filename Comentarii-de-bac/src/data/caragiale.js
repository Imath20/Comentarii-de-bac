const caragiale = {
  nume: 'I.L. Caragiale',
  // date: '1852 – 1912',
  img: '/scriitori/il-caragiale.png',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/caragiale.png',
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
      name: 'Ioan Slavici',
      key: 'slavici',
      img: '/scriitori/ioan_slavici.png',
    },
    {
      name: 'Titu Maiorescu',
      key: 'maiorescu',
      img: '/scriitori/titu_maiorescu (2).png',
    },
    {
      name: 'Costache Negruzzi',
      key: 'negruzzi',
      img: '/scriitori/costache-negruzzi.png',
    },
    {
      name: 'Veronica Micle',
      key: 'veronica',
      img: '/Profile ganditorimea/Veronica Micle.png',
    },
  ],
  gallery: [
    '/Banner/caragiale.png',
    '/scriitori/il-caragiale.png',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '15 martie 1884',
      author: 'I.L. Caragiale',
      text: 'Astăzi am publicat "O scrisoare pierdută". O comedie care să exploreze viața politică românească prin prisma umorului și a satirii. Fiecare personaj este un tip social autentic, fiecare replică este o critică subtilă la adresa societății.',
      image: '/opere/scrisoare-pierduta.png',
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
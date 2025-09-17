const maiorescu = {
  nume: 'Titu Maiorescu',
  // date: '1840 – 1917',
  img: '/scriitori/titu_maiorescu (2).webp',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/maiorescu.webp',
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
      name: 'I.L. Caragiale',
      key: 'caragiale',
      img: '/scriitori/il-caragiale.webp',
    },
    {
      name: 'Ioan Slavici',
      key: 'slavici',
      img: '/scriitori/ioan_slavici.webp',
    },
    {
      name: 'Veronica Micle',
      key: 'veronica',
      img: '/Profile ganditorimea/Veronica Micle.webp',
    },
  ],
  gallery: [
    '/Banner/maiorescu.webp',
    '/scriitori/titu_maiorescu (2).webp',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '15 martie 1868',
      author: 'Titu Maiorescu',
      text: 'Am publicat "Critice" - o colecție de articole care să exploreze direcția nouă în literatura română. Fiecare pagină este o analiză profundă a operelor literare, fiecare comentariu este o orientare pentru viitorul literaturii noastre.',
      image: '/opere/formele.webp',
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
          link: '/carte/critice', // Link către BookReader pentru Critice
          icon: '📖'
        }
      ],
      likes: 1868,
      reactions: [
        { friendKey: 'eminescu', reaction: 'ador' },
        { friendKey: 'creanga', reaction: 'love' },
        { friendKey: 'caragiale', reaction: 'strengh' },
        { friendKey: 'slavici', reaction: 'cool' },
        { friendKey: 'veronica', reaction: 'fire' },
      ],
      comments: [
        {
          author: 'Mihai Eminescu',
          key: 'eminescu',
          text: 'Minunat eseu, Titu! "Formele" definește perfect direcțiile literaturii!',
        },
        {
          author: 'Ion Creangă',
          key: 'creanga',
          text: 'Felicitări! Ai reușit să capturezi esența criticii literare!',
        },
        {
          author: 'I.L. Caragiale',
          key: 'caragiale',
          text: 'Excelentă lucrare! Critica ta este o capodoperă analitică!',
        },
      ],
    },
  ],
};

export default maiorescu; 
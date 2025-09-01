const negruzzi = {
  nume: 'Costache Negruzzi',
  // date: '1808 – 1868',
  img: '/scriitori/costache-negruzzi.png',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/negruzzi.png',
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
    '/Banner/negruzzi.png',
    '/scriitori/costache-negruzzi.png',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '20 martie 1848',
      author: 'Costache Negruzzi',
      text: 'Am publicat "Alexandru Lăpușneanu" - o nuvelă istorică care să exploreze viața domnitorului Moldovei. Fiecare pagină este impregnată cu istoria noastră, fiecare personaj este o reprezentare a epocii.',
      image: '/opere/lapusneanu.png',
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
          link: '/carte/lapusneanu', // Link către BookReader pentru Alexandru Lăpușneanu
          icon: '📖'
        }
      ],
      likes: 1848,
      reactions: [
        { friendKey: 'eminescu', reaction: 'ador' },
        { friendKey: 'creanga', reaction: 'love' },
        { friendKey: 'caragiale', reaction: 'strengh' },
        { friendKey: 'maiorescu', reaction: 'cool' },
        { friendKey: 'veronica', reaction: 'fire' },
      ],
      comments: [
        {
          author: 'Mihai Eminescu',
          key: 'eminescu',
          text: 'Minunată nuvelă, Costache! Ai prins perfect spiritul istoric!',
        },
        {
          author: 'Ion Creangă',
          key: 'creanga',
          text: 'Felicitări! Ai reușit să capturezi esența epocii!',
        },
        {
          author: 'Titu Maiorescu',
          key: 'maiorescu',
          text: 'Excelentă lucrare! Nuvela ta este o capodoperă istorică!',
        },
      ],
    },
  ],
};

export default negruzzi; 
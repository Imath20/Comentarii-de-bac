const veronica = {
  nume: 'Veronica Micle',
  // date: '1850 – 1889',
  img: '/Profile ganditorimea/Veronica Micle.webp',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/micle.webp',
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
      name: 'Titu Maiorescu',
      key: 'maiorescu',
      img: '/scriitori/titu_maiorescu (2).webp',
    },
  ],
  gallery: [
    '/Banner/micle.webp',
    '/Profile ganditorimea/Veronica Micle.webp',
    '/opere/formele.webp',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '20 august 1887',
      author: 'Veronica Micle',
      text: 'Am publicat "Rânduri pentru copil" - o colecție de poezii dedicate copilăriei și iubirii materne. Fiecare vers este impregnat cu dragostea pentru copii, fiecare cuvânt este o declarație de iubire pentru viață.',
      image: '/opere/formele.webp',
      link: '/poezie/randuri-pentru-copil',
      likes: 1887,
      reactions: [
        { friendKey: 'eminescu', reaction: 'ador' },
        { friendKey: 'creanga', reaction: 'love' },
        { friendKey: 'caragiale', reaction: 'strengh' },
        { friendKey: 'slavici', reaction: 'cool' },
        { friendKey: 'maiorescu', reaction: 'fire' },
      ],
      comments: [
        {
          author: 'Mihai Eminescu',
          key: 'eminescu',
          text: 'Minunată colecție, Veronica! Poeziile tale sunt adevărate bijuterii materne!',
        },
        {
          author: 'Ion Creangă',
          key: 'creanga',
          text: 'Felicitări! Ai reușit să capturezi esența iubirii pentru copii!',
        },
        {
          author: 'Titu Maiorescu',
          key: 'maiorescu',
          text: 'Excelentă lucrare! Poeziile tale au o forță maternală extraordinară!',
        },
      ],
    },
  ],
};

export default veronica; 
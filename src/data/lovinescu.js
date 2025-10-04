const lovinescu = {
  nume: 'Eugen Lovinescu',
  // date: '1881 – 1943',
  img: '/scriitori/eugen_lovinescu.webp',
  color: 'rgba(75,85,99,0.82)',
  banner: '/Banner/lovinescu.webp',
  friends: [
    {
      name: 'Titu Maiorescu',
      key: 'maiorescu',
      img: '/scriitori/titu_maiorescu (2).webp',
    },
    // {
    //   name: 'Mihail Dragomirescu',
    //   key: 'dragomirescu',
    //   img: '/scriitori/dragomirescu_mihail.webp',
    // },
    {
      name: 'Ion Barbu',
      key: 'barbu',
      img: '/scriitori/barbu_ion.webp',
    },
    // {
    //   name: 'Tudor Vianu',
    //   key: 'vianu',
    //   img: '/scriitori/vianu_tudor.webp',
    // },
    {
      name: 'Camil Petrescu',
      key: 'petrescu',
      img: '/scriitori/camil_rezerva.webp',
    },
    // {
    //   name: 'Hortensia Papadat-Bengescu',
    //   key: 'papadat',
    //   img: '/scriitori/papadat_hortensia.webp',
    // },
    {
      name: 'George Călinescu',
      key: 'calinescu',
      img: '/scriitori/george_calinescu.webp',
    },
    {
      name: 'Ion Pillat',
      key: 'pillat',
      img: '/scriitori/ion_pillat.webp',
    },
    {
      name: 'Liviu Rebreanu',
      key: 'rebreanu',
      img: '/scriitori/liviu_rebreanu_nou.webp',
    },
    {
      name: 'Mihail Sadoveanu',
      key: 'sadoveanu',
      img: '/scriitori/mihail-sadoveanu-3.webp',
    },
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
  ],
  gallery: [
    '/Banner/lovinescu.webp',
    '/scriitori/eugen_lovinescu.webp',
    // '/opere scriitori/istoria-literaturii-romane.webp',
    // '/opere scriitori/memorii-lovinescu.webp',
    // '/opere scriitori/sburatorul.webp',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '31 octombrie 1881',
      author: 'Eugen Lovinescu',
      text: 'M-am născut astăzi în Fălticeni. Începe o viață dedicată criticii literare și teoriei sincronismului.',
    //   image: '/scriitori/eugen_lovinescu.webp',
      pinnedActions: [
        {
          type: 'comentariu',
          text: 'Comentariul operei',
          link: '#',
          icon: '📝'
        },
        {
          type: 'opera',
          text: 'Citește opera',
          link: '/carte/istoria-literaturii-romane',
          icon: '📖'
        }
      ],
      likes: 1881,
      reactions: [
        { friendKey: 'maiorescu', reaction: 'clap' },
        { friendKey: 'dragomirescu', reaction: 'love' },
        { friendKey: 'barbu', reaction: 'strengh' },
        { friendKey: 'vianu', reaction: 'cool' },
        { friendKey: 'petrescu', reaction: 'fire' },
      ],
      comments: [
        {
          author: 'Titu Maiorescu',
          key: 'maiorescu',
          text: 'Bun venit în lumea criticii literare!',
        },
        {
          author: 'Mihail Dragomirescu',
          key: 'dragomirescu',
          text: 'Un nou critic se naște!',
        },
      ],
    },
    {
      id: 2,
      date: '1909',
      author: 'Eugen Lovinescu',
      text: 'Am obținut doctoratul la Paris cu lucrarea "Jean-Jacques Weiss et son oeuvre littéraire". O realizare importantă!',
    //   image: '/opere scriitori/doctorat-paris.webp',
      likes: 1909,
      reactions: [
        { friendKey: 'maiorescu', reaction: 'clap' },
        { friendKey: 'dragomirescu', reaction: 'love' },
        { friendKey: 'barbu', reaction: 'strengh' },
        { friendKey: 'vianu', reaction: 'cool' },
      ],
      comments: [
        {
          author: 'Titu Maiorescu',
          key: 'maiorescu',
          text: 'Felicitări pentru această realizare academică!',
        },
      ],
    },
    {
      id: 3,
      date: '1919',
      author: 'Eugen Lovinescu',
      text: 'Am înființat cenaclul Sburătorul și revista cu același nume. Un nou centru cultural în București!',
    //   image: '/opere scriitori/sburatorul.webp',
      likes: 1919,
      reactions: [
        { friendKey: 'barbu', reaction: 'love' },
        { friendKey: 'vianu', reaction: 'strengh' },
        { friendKey: 'petrescu', reaction: 'cool' },
        { friendKey: 'pillat', reaction: 'fire' },
        { friendKey: 'rebreanu', reaction: 'clap' },
      ],
      comments: [
        {
          author: 'Ion Barbu',
          key: 'barbu',
          text: 'Excelentă inițiativă! Sburătorul va fi un centru important pentru literatura română.',
        },
        {
          author: 'Tudor Vianu',
          key: 'vianu',
          text: 'Mulțumim pentru această oportunitate!',
        },
      ],
    },
    {
      id: 4,
      date: '1924-1925',
      author: 'Eugen Lovinescu',
      text: 'Am publicat "Istoria civilizației române moderne" în trei volume. O lucrare fundamentală despre evoluția culturii române.',
    //   image: '/opere scriitori/istoria-civilizatiei.webp',
      likes: 1924,
      reactions: [
        { friendKey: 'maiorescu', reaction: 'clap' },
        { friendKey: 'calinescu', reaction: 'love' },
        { friendKey: 'sadoveanu', reaction: 'strengh' },
        { friendKey: 'arghezi', reaction: 'cool' },
      ],
      comments: [
        {
          author: 'George Călinescu',
          key: 'calinescu',
          text: 'O lucrare monumentală despre cultura română!',
        },
        {
          author: 'Mihail Sadoveanu',
          key: 'sadoveanu',
          text: 'Analiza ta despre evoluția civilizației este remarcabilă.',
        },
      ],
    },
    {
      id: 5,
      date: '1926-1929',
      author: 'Eugen Lovinescu',
      text: 'Am publicat "Istoria literaturii române contemporane" în șase volume. O sinteză completă a literaturii române moderne.',
    //   image: '/opere scriitori/istoria-literaturii-romane.webp',
      likes: 1926,
      reactions: [
        { friendKey: 'calinescu', reaction: 'love' },
        { friendKey: 'blaga', reaction: 'strengh' },
        { friendKey: 'arghezi', reaction: 'cool' },
        { friendKey: 'pillat', reaction: 'fire' },
      ],
      comments: [
        {
          author: 'Lucian Blaga',
          key: 'blaga',
          text: 'O lucrare esențială pentru înțelegerea literaturii române!',
        },
        {
          author: 'Tudor Arghezi',
          key: 'arghezi',
          text: 'Critica ta este întotdeauna precisă și profundă.',
        },
      ],
    },
    {
      id: 6,
      date: '1930-1937',
      author: 'Eugen Lovinescu',
      text: 'Am publicat "Memorii" în trei volume. O confesiune literară despre viața și opera mea.',
    //   image: '/opere scriitori/memorii-lovinescu.webp',
      likes: 1930,
      reactions: [
        { friendKey: 'vianu', reaction: 'love' },
        { friendKey: 'petrescu', reaction: 'strengh' },
        { friendKey: 'pillat', reaction: 'cool' },
        { friendKey: 'rebreanu', reaction: 'fire' },
      ],
      comments: [
        {
          author: 'Tudor Vianu',
          key: 'vianu',
          text: 'Memoriile tale sunt o comoară pentru literatura română!',
        },
        {
          author: 'Camil Petrescu',
          key: 'petrescu',
          text: 'O mărturisire sinceră și profundă.',
        },
      ],
    },
    {
      id: 7,
      date: '1940',
      author: 'Eugen Lovinescu',
      text: 'Am publicat monografia "T. Maiorescu" în două volume. Un omagiu pentru mentorul meu spiritual.',
    //   image: '/opere scriitori/maiorescu-monografie.webp',
      likes: 1940,
      reactions: [
        { friendKey: 'calinescu', reaction: 'love' },
        { friendKey: 'vianu', reaction: 'strengh' },
        { friendKey: 'barbu', reaction: 'cool' },
        { friendKey: 'pillat', reaction: 'fire' },
      ],
      comments: [
        {
          author: 'George Călinescu',
          key: 'calinescu',
          text: 'O monografie magistrală despre Maiorescu!',
        },
        {
          author: 'Tudor Vianu',
          key: 'vianu',
          text: 'Ai reușit să surprinzi esența gândirii maioresciene.',
        },
      ],
    },
    {
      id: 8,
      date: '18 iulie 1943',
      author: 'Eugen Lovinescu',
      text: 'Astăzi mă despart de lumea aceasta. Am trăit pentru critică și pentru literatura română. Să rămână opera mea ca mărturie a pasiunii mele pentru frumos.',
      image: null,
      likes: 1943,
      reactions: [
        { friendKey: 'calinescu', reaction: 'love' },
        { friendKey: 'vianu', reaction: 'love' },
        { friendKey: 'barbu', reaction: 'love' },
        { friendKey: 'pillat', reaction: 'love' },
        { friendKey: 'rebreanu', reaction: 'love' },
        { friendKey: 'sadoveanu', reaction: 'love' },
        { friendKey: 'arghezi', reaction: 'love' },
        { friendKey: 'blaga', reaction: 'love' },
      ],
      comments: [
        {
          author: 'George Călinescu',
          key: 'calinescu',
          text: 'Ne vei lipsi, Eugen! Opera ta va rămâne eternă.',
        },
        {
          author: 'Tudor Vianu',
          key: 'vianu',
          text: 'Ai fost un mentor și un prieten neprețuit.',
        },
        {
          author: 'Lucian Blaga',
          key: 'blaga',
          text: 'Critica română își pierde unul dintre cei mai mari reprezentanți.',
        },
      ],
    },
  ],
};

export default lovinescu;

const creanga = {
  nume: 'Ion Creangă',
  // date: '1837 – 1889',
  img: '/scriitori/creanga_ion.webp',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/creanga.webp',
  friends: [
    {
      name: 'Mihai Eminescu',
      key: 'eminescu',
      img: '/scriitori/eminescu_mihai.webp',
    },
    {
      name: 'Ioan Slavici',
      key: 'slavici',
      img: '/scriitori/ioan_slavici.webp',
    },
    {
      name: 'I.L. Caragiale',
      key: 'caragiale',
      img: '/scriitori/il-caragiale.webp',
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
    '/Banner/creanga.webp',
    '/scriitori/creanga_ion.webp',
    '/opere/Harap-Alb.webp',
    '/opere/amintiri-copil.webp',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '15 martie 1877',
      author: 'Ion Creangă',
      text: 'Aha! Am scris povestea lui Harap-Alb! Să știi că era odată ca niciodată, un crai care avea trei fete... Și iată că am pus-o pe hârtie, să o poată citi toți copiii! Sunt foarte mulțumit de ea, drăgăliță-Doamne!',
      image: '/opere/Harap-Alb.webp',
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
          link: '/carte/harap-alb.webp', // Link către BookReader pentru Harap-Alb
          icon: '📖'
        }
      ],
      likes: 1877,
      reactions: [
        { friendKey: 'eminescu', reaction: 'love' },
        { friendKey: 'slavici', reaction: 'ador' },
        { friendKey: 'caragiale', reaction: 'strengh' },
        { friendKey: 'maiorescu', reaction: 'cool' },
        { friendKey: 'sadoveanu', reaction: 'fire' },
      ],
      comments: [
        {
          author: 'Mihai Eminescu',
          key: 'eminescu',
          text: 'Minunată poveste, Ioane! Ai prins perfect spiritul poporului nostru!',
        },
        {
          author: 'Ioan Slavici',
          key: 'slavici',
          text: 'Felicitări, Ioane! Poveștile tale vor rămâne în inima copiilor!',
        },
      ],
    },
    {
      id: 2,
      date: '1 martie 1837',
      author: 'Ion Creangă',
      text: 'M-am născut astăzi, la Humulești! Să știi că am venit pe lume într-o zi frumoasă de primăvară, drăgăliță-Doamne! Viața e o poveste frumoasă, și eu am început-o astăzi!',
      image: null,
      likes: 1837,
      reactions: [
        { friendKey: 'eminescu', reaction: 'love' },
        { friendKey: 'slavici', reaction: 'love' },
        { friendKey: 'caragiale', reaction: 'strengh' },
        { friendKey: 'sadoveanu', reaction: 'ador' },
      ],
      comments: [
        {
          author: 'Mihai Eminescu',
          key: 'eminescu',
          text: 'La mulți ani, Ioane! Să ai o viață frumoasă și plină de povești!',
        },
      ],
    },
    {
      id: 3,
      date: '1881',
      author: 'Ion Creangă',
      text: 'Am început să scriu "Amintiri din copilărie". Vreau să îmi amintesc vremurile frumoase de mic, să le pun pe hârtie pentru alții să le citească, drăgăliță-Doamne!',
      image: '/opere/amintiri-copil.webp',
      likes: 1881,
      reactions: [
        { friendKey: 'eminescu', reaction: 'love' },
        { friendKey: 'slavici', reaction: 'like' },
        { friendKey: 'caragiale', reaction: 'wow' },
        { friendKey: 'maiorescu', reaction: 'clap' },
      ],
      comments: [
        {
          author: 'Mihai Eminescu',
          key: 'eminescu',
          text: 'Minunată idee, Ioane! Copilăria este cea mai frumoasă perioadă din viața omului!',
        },
      ],
      isStory: true,
      storyTitle: 'Amintiri din copilărie',
      showReadAllButton: true,
      readAllButtonText: 'Citește tot',
      readAllButtonLink: '/carte/amintiri-din-copilarie',
      storyText: `Stau câteodată și-mi aduc aminte ce vremi și ce oameni mai erau în părțile noastre pe când începusem și eu, drăgăliță-Doamne, a mă ridica băiețaș la casa părinților mei, în satul Humulești, din târg drept peste apa Neamțului; sat mare și vesel, împărțit în trei părți, care se țin tot de una: Vatra satului, Delenii și Bejenii.

Ș-apoi Humuleștii, și pe vremea aceea, nu erau numai așa, un sat de oameni fără căpătâi, ci sat vechi răzășesc, întemeiat în toată puterea cuvântului: cu gospodari tot unul și unul, cu flăcăi voinici și fete mândre, care știau a învârti și hora, dar și suveica, de vuia satul de vatale în toate părțile; cu biserică frumoasă și niște preoți și dascăli și poporeni ca aceia, de făceau mare cinste satului lor.

Și părintele Ioan de sub deal, Doamne, ce om vrednic și cu bunătate mai era! Prin îndemnul său, ce mai pomi s-au pus în țintirim, care era îngrădit cu zăplaz de bârne, streșinit cu șindilă, și ce chilie durată s-a făcut la poarta bisericii pentru școală; ș-apoi, să fi văzut pe neobositul părinte cum umbla prin sat din casă în casă, împreună cu bădița Vasile a Ilioaei, dascălul bisericii, un holtei zdravăn, frumos și voinic, și sfătuia pe oameni să-și dea copiii la învățătură.

Și unde nu s-au adunat o mulțime de băieți și fete la școală, între care eram și eu, un băiat prizărit, rușinos și fricos și de umbra mea. Și cea dintâi școlăriță a fost însăși Smărăndița popii, o zgâtie de copilă ageră la minte și așa de silitoare, de întrecea mai pe toți băieții și din carte, dar și din nebunii.

Și ne pomenim într-una din zile că părintele vine la școală și ne aduce un scaun nou și lung, și după ce-a întrebat de dascăl, care cum ne purtăm, a stat puțin pe gânduri, apoi a pus nume scaunului Calul Balan și l-a lăsat în școală. În altă zi ne trezim că iar vine părintele la școală, cu moș Fotea, cojocarul satului, care ne aduce, dar de școală nouă, un drăguț de biciușor de curele, împletit frumos, și părintele îi pune nume Sfântul Nicolai, după cum este și hramul bisericii din Humulești...

Apoi poftește pe moș Fotea că, dacă i-or mai pica ceva curele bune, să mai facă așa, din când în când, câte unul, și ceva mai grosuț, dacă se poate... Bădița Vasile a zâmbit atunci, iară noi, școlarii, am rămas cu ochii holbați unii la alții.`,
    },
    {
      id: 4,
      date: '1885',
      author: 'Ion Creangă',
      text: 'Am publicat "Povești și povestiri"! Să știi că am adunat toate poveștile mele într-o carte frumoasă. Sunt foarte mulțumit că pot să fac oamenii să râdă și să se simtă bine cu poveștile mele, drăgăliță-Doamne!',
      image: '/opere/Harap-Alb.webp',
      likes: 1885,
      reactions: [
        { friendKey: 'eminescu', reaction: 'cool' },
        { friendKey: 'slavici', reaction: 'love' },
        { friendKey: 'caragiale', reaction: 'ador' },
        { friendKey: 'maiorescu', reaction: 'strengh' },
      ],
      comments: [
        {
          author: 'I.L. Caragiale',
          key: 'caragiale',
          text: 'Excelente povești, Ioane! Ai prins perfect spiritul poporului nostru!',
        },
        {
          author: 'Mihai Eminescu',
          key: 'eminescu',
          text: 'Felicitări, Ioane! Poveștile tale vor rămâne în inima românilor!',
        },
      ],
    },
  ],
};

export default creanga; 
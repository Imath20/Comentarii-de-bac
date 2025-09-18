const arghezi = {
  nume: 'Tudor Arghezi',
  // date: '1880 – 1967',
  img: '/scriitori/tudor_arghezi.webp',
  color: 'rgba(255,179,71,0.82)',
  banner: '/Banner/arghezi.webp',
  friends: [
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
    {
      name: 'George Călinescu',
      key: 'calinescu',
      img: '/scriitori/george_calinescu.webp',
    },
    {
      name: 'Mihail Sadoveanu',
      key: 'sadoveanu',
      img: '/scriitori/mihail-sadoveanu-3.webp',
    },
    {
      name: 'Ion Pillat',
      key: 'pillat',
      img: '/scriitori/ion_pillat.webp',
    },
    {
      name: 'Marin Preda',
      key: 'preda',
      img: '/scriitori/marin_preda.webp',
    },
    {
      name: 'Marin Sorescu',
      key: 'sorescu',
      img: '/scriitori/marin_sorescu.webp',
    },
    {
      name: 'Nichita Stănescu',
      key: 'stanescu',
      img: '/scriitori/nichita_stanescu_rezerva.webp',
    },
    {
      name: 'Vasile Voiculescu',
      key: 'voiculescu',
      img: '/scriitori/vasile_voiculescu.webp',
    },
    {
      name: 'Mircea Eliade',
      key: 'eliade',
      img: '/scriitori/mircea-eliade.webp',
    },
  ],
  gallery: [
    '/Banner/arghezi.webp',
    '/scriitori/tudor_arghezi.webp',
    '/opere/flori-mucigai.webp',
    '/opere/testament-verticala.webp',
  ],
  posts: [
    {
      id: 1,
      pin: true,
      date: '1919',
      author: 'Tudor Arghezi',
      text: 'Am scris Flori de mucigai în întunericul unei celule. Am zgâriat cu unghia pe hârtie, în mirosul greu al pereților umezi. Din murdărie, din mucegai, au răsărit florile mele negre, crude, dar vii. Poezia nu s-a născut din frumusețe, ci din zbucium și amar. Și totuși, chiar și acolo unde nu e lumină, răsar flori.',
      image: '/opere/flori-mucigai.webp',
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
          link: 'flori-mucigai', // Link către popup pentru poezia "Flori de mucigai"
          icon: '📖',
          isPoem: true
        }
      ],
      likes: 1927,
      reactions: [
        { friendKey: 'blaga', reaction: 'ador' },
        { friendKey: 'barbu', reaction: 'love' },
        { friendKey: 'bacovia', reaction: 'strengh' },
        { friendKey: 'rebreanu', reaction: 'cool' },
        { friendKey: 'petrescu', reaction: 'fire' },
        { friendKey: 'calinescu', reaction: 'clap' },
      ],
      comments: [
        {
          author: 'Lucian Blaga',
          key: 'blaga',
          text: 'Arghezi, ai smuls cuvintele din întuneric ca și cum ai aprinde o torță în peștera lumii. Poezia ta nu e floare de soare, ci floare de abis.',
        },
        {
          author: 'Ion Barbu',
          key: 'barbu',
          text: 'Florile tale sunt echivalentele unei geometrii bolnave. Nu frumusețea le face vii, ci rigorile suferinței.',
        },
        {
          author: 'George Bacovia',
          key: 'bacovia',
          text: 'Mucegai, pereți umezi, unghii pe hârtie... parcă te citesc și simt iarăși plumbul meu. Ai făcut din mizerie artă.',
        },
      ],
    },
    {
      id: 2,
      date: '1927',
      author: 'Tudor Arghezi',
      text: 'Am scris Testament ca să las urmașilor mei nu averi de aur, ci limba și truda mea așezată în versuri. Din sudoarea și necazul părinților am frământat cuvinte, am înălțat din durere o casă a poeziei. Ceea ce n-au putut ei rosti, am strâns eu în carte, ca glasul lor să nu se piardă. E moștenirea mea – un drum de la humă la cer.',
      image: '/opere/testament-verticala.webp',
      reactions: [
        { friendKey: 'blaga', reaction: 'love' },
        { friendKey: 'barbu', reaction: 'wow' },
        { friendKey: 'bacovia', reaction: 'strengh' },
        { friendKey: 'calinescu', reaction: 'clap' },
      ],
      comments: [
        {
          author: 'Lucian Blaga',
          key: 'blaga',
          text: 'Ai ridicat graiul truditorilor la demnitatea de catedrală. Poezia ta e o punte între glie și absolut.'
        },
        {
          author: 'George Călinescu',
          key: 'calinescu',
          text: 'Prin Testament, ai dat literaturii române un act de naștere modern. Ești moștenitorul limbii vechi și creator al celei noi.'
        }
      ],
      isPoem: true,
      poemImages: ['/opere/testament-verticala.webp', '/opere/textament-poza-1.webp'],
      poemTitle: 'Testament',
      poemText: `Testament
Nu-ţi voi lăsa drept bunuri, după moarte,
Decât un nume adunat pe o carte,
În seara răzvrătită care vine
De la străbunii mei până la tine,
Prin râpi şi gropi adânci
Suite de bătrânii mei pe brânci
Şi care, tânăr, să le urci te-aşteaptă
Cartea mea-i, fiule, o treaptă.

Aşeaz-o cu credinţă căpătâi.
Ea e hrisovul vostru cel dintâi.
Al robilor cu saricile, pline
De osemintele vărsate-n mine.

Ca să schimbăm, acum, întâia oară
Sapa-n condei şi brazda-n calimară
Bătrânii au adunat, printre plăvani,
Sudoarea muncii sutelor de ani.
Din graiul lor cu-ndemnuri pentru vite
Eu am ivit cuvinte potrivite
Şi leagăne urmaşilor stăpâni.
Şi, frământate mii de săptămâni
Le-am prefăcut în versuri şi-n icoane,
Făcui din zdrenţe muguri şi coroane.
Veninul strâns l-am preschimbat în miere,
Lăsând întreagă dulcea lui putere.

Am luat ocara, şi torcând uşure
Am pus-o când să-mbie, când să-njure.
Am luat cenuşa morţilor din vatră
Şi am făcut-o Dumnezeu de piatră,
Hotar înalt, cu două lumi pe poale,
Păzind în piscul datoriei tale.

Durerea noastră surdă şi amară
O grămădii pe-o singură vioară,
Pe care ascultând-o a jucat
Stăpânul, ca un ţap înjunghiat.
Din bube, mucegaiuri şi noroi
Iscat-am frumuseţi şi preţuri noi.
Biciul răbdat se-ntoarce în cuvinte
Si izbăveşte-ncet pedesitor
Odrasla vie-a crimei tuturor.
E-ndreptăţirea ramurei obscure
Ieşită la lumină din padure
Şi dând în vârf, ca un ciorchin de negi
Rodul durerii de vecii întregi.

Întinsă leneşă pe canapea,
Domniţa suferă în cartea mea.
Slova de foc şi slova faurită
Împărechiate-n carte se mărită,
Ca fierul cald îmbrăţişat în cleşte.
Robul a scris-o, Domnul o citeşte,
Făr-a cunoaşte ca-n adâncul ei
Zace mania bunilor mei.`,
    },
  ],
};

export default arghezi; 
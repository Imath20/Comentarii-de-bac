const veronica = {
  nume: 'Veronica Micle',
  date: '1850 – 1889',
  img: '/Profile ganditorimea/Veronica Micle.png',
  banner: '/Banner/veronica_banner.png',
  color: 'rgba(255,179,71,0.82)',
  friends: [
    { key: 'eminescu', name: 'Mihai Eminescu', img: '/scriitori/eminescu_mihai.png' },
    { key: 'caragiale', name: 'I.L. Caragiale', img: '/scriitori/il-caragiale.png' },
    { key: 'creanga', name: 'Ion Creangă', img: '/scriitori/creanga_ion.png' },    
    { key: 'slavici', name: 'Ioan Slavici', img: '/scriitori/ioan_slavici.png' },
  ],
  gallery: [
    '/opere/veronica_poezie1.png',
    '/opere/veronica_poezie2.png',
    '/opere/veronica_poezie3.png',
    '/opere/veronica_poezie4.png'
  ],
  posts: [
    {
      id: 1,
      date: '15 iunie 1889',
      text: 'Astăzi am primit o scrisoare de la Mihai... Îmi scrie despre poezia "Luceafărul" pe care a început să o compună. Sunt atât de fericită să văd cum își exprimă dragostea prin versuri.',
      pin: true,
      reactions: [
        { friendKey: 'eminescu', reaction: 'love' },
        { friendKey: 'creanga', reaction: 'like' },
        { friendKey: 'caragiale', reaction: 'ador' }
      ],
      comments: [
        { author: 'Mihai Eminescu', key: 'eminescu', text: 'Pentru tine, Veronica, scriu fiecare vers cu inima.' },
        { author: 'Ion Creangă', key: 'creanga', text: 'Frumoasă prietenie!' }
      ]
    },
    {
      id: 2,
      date: '22 mai 1888',
      text: 'Am citit din nou "Scrisori" de la Mihai. Fiecare cuvânt îmi aduce aminte de momentele petrecute împreună. Dragostea noastră va rămâne în versuri pentru veșnicie.',
      reactions: [
        { friendKey: 'eminescu', reaction: 'love' },
        { friendKey: 'slavici', reaction: 'like' }
      ],
      comments: [
        { author: 'Mihai Eminescu', key: 'eminescu', text: 'Te iubesc, Veronica!' }
      ]
    },
    {
      id: 3,
      date: '10 aprilie 1887',
      text: 'Astăzi am scris o poezie despre dragostea noastră. Mihai spune că sunt versurile mele cele mai frumoase. Sunt atât de recunoscătoare pentru această iubire care mă face să simt că trăiesc.',
      reactions: [
        { friendKey: 'eminescu', reaction: 'love' },
        { friendKey: 'rebreanu', reaction: 'like' },
        { friendKey: 'calinescu', reaction: 'ador' }
      ],
      comments: [
        { author: 'Mihai Eminescu', key: 'eminescu', text: 'Ești muza mea, Veronica!' },
        { author: 'I.L. Caragiale', key: 'caragiale', text: 'Frumoasă poezie!' }
      ]
    }
  ]
};

export default veronica; 
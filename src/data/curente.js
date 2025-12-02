// Centralized data for literary currents used by listing and detail page
// Each current includes id, name, period, year, image, description, color, and prominent authors

const CURENTE = [
  {
    id: 'umanism',
    nume: 'Umanismul',
    interval: 'sec. XV–XVI',
    an: 1550,
    img: '/curente/umanismul.webp',
    glowColor: 'rgba(89, 67, 2, 0.85)',
    descriere: 'Revenire la Antichitate, interes pentru om și rațiune.',
    autori: [],
    sections: [
      {
        title: 'Ce este Umanismul?',
        blocks: [
          {
            type: 'text',
            content: 'Umanismul este un curent cultural, filosofic și literar al Renașterii (secolele XIV–XVI), care a plasat în centrul preocupărilor sale omul, demnitatea lui, libertatea intelectuală și capacitatea de perfecționare prin educație. Acest curent a marcat trecerea de la viziunea medievală, dominată de autoritatea religioasă, la o concepție orientată spre rațiune, cultură și studiul lumii reale.'
          },
          {
            type: 'text',
            content: 'Umaniștii au promovat reîntoarcerea la moștenirea culturală a Antichității greco-romane și au valorizat studiile de filosofie, istorie, lingvistică, arte și științe exacte. Idealul central este „omul cultivat”, persoana care își folosește rațiunea pentru a înțelege lumea și pentru a se forma în mod armonios.'
          },
          {
            type: 'list',
            intro: 'E un curent care pune accent pe:',
            items: [
              'Revenirea la Antichitate: studierea textelor clasice și preluarea modelelor culturale greco-romane.',
              'Cultul educației și al culturii: promovarea studiului, a cunoașterii enciclopedice și a perfecționării intelectuale.',
              'Centrul interesului este omul: demnitatea, libertatea, rațiunea și moralitatea lui.',
              'Spirit critic și libertate de gândire: contestarea dogmelor și promovarea căutării adevărului prin rațiune.',
              'Deschidere către știință: interes pentru descoperiri geografice, astronomice și medicale.',
              'Stil literar clar și sobru: orientat spre idei morale, spre observația vieții reale și spre exprimarea demnității umane.'
            ]
          }
        ]
      },
      {
        title: 'Caracteristicile Umanismului',
        blocks: [
          {
            type: 'list',
            items: [
              {
                title: 'Omul în centru',
                description: 'Concepția umanistă plasează omul, demnitatea și rațiunea sa în centrul vieții culturale.'
              },
              {
                title: 'Primatul educației',
                description: 'Umanismul promovează formarea omului cultivat și dezvoltarea armonioasă prin studiu.'
              },
              {
                title: 'Întoarcerea la Antichitate',
                description: 'Modelele culturii greco-romane sunt recuperate și folosite ca fundament pentru reflecție și creație.'
              },
              {
                title: 'Spirit critic',
                description: 'Rațiunea devine instrumentul principal de analiză, interogație și descoperire a adevărului.'
              },
              {
                title: 'Deschidere către știință',
                description: 'Interes crescut pentru domenii precum astronomia, anatomia și geografia, privite ca mijloace de cunoaștere a lumii.'
              },
              {
                title: 'Cultivarea limbilor clasice',
                description: 'Studiul limbilor latină și greacă devine esențial pentru accesul la patrimoniul antic.'
              },
              {
                title: 'Literatură orientată spre om',
                description: 'Scriitura pune accent pe experiența umană, pe moralitate și pe reprezentarea autentică a vieții.'
              }
            ]
          }
        ]        
      },
      {
        title: 'Reprezentanții Umanismului',
        blocks: [
          {
            type: 'text',
            content: 'Principalii autori ai curentului, organizați clar și sistematic.'
          },
          {
            type: 'subheading',
            content: 'România'
          },
          {
            type: 'list',
            style: 'dash',
            items: [
              {
                title: 'Nicolaus Olahus',
                subitems: [
                  'umanist român de prim rang în secolul al XVI-lea',
                  'autor de lucrări istorice ce subliniază originea latină a românilor',
                  'susținător al dezvoltării educației și al culturii erudite'
                ]
              },
              {
                title: 'Grigore Ureche',
                subitems: [
                  'autorul „Letopisețului Țării Moldovei”',
                  'afirmă explicit originea romană a românilor („de la Râm ne tragem”)',
                  'introduce o perspectivă umanistă în istoriografie'
                ]
              },
              {
                title: 'Miron Costin',
                subitems: [
                  'continuă opera lui Ureche în letopiseț',
                  'promovează idealul omului cultivat și rolul educației',
                  'accentuează responsabilitatea omului în istorie („Nu sunt vremile sub cârma omului…”)'
                ]
              },
              {
                title: 'Ion Neculce',
                subitems: [
                  'autor al „O samă de cuvinte”',
                  'evidențiază psihologia personajelor și perspectiva umană',
                  'stil narativ apropiat de literatură, nu doar de cronica sobră'
                ]
              }
            ]
          },
          {
            type: 'subheading',
            content: 'Europa'
          },
          {
            type: 'list',
            style: 'dash',
            items: [
              {
                title: 'Dante Alighieri',
                subitems: [
                  'autorul „Divina Comedie”',
                  'figură esențială în tranziția spre gândirea umanistă'
                ]
              },
              {
                title: 'Francesco Petrarca',
                subitems: [
                  'considerat părintele umanismului',
                  'promovează studiul Antichității și idealul omului erudit'
                ]
              },
              {
                title: 'Giovanni Boccaccio',
                subitems: [
                  'autorul „Decameronului”',
                  'abordează teme legate de condiția umană și de viața reală'
                ]
              },
              {
                title: 'Erasmus din Rotterdam',
                subitems: [
                  'promotor al rațiunii, educației și toleranței',
                  'critic al abuzurilor și al dogmatismului religios'
                ]
              },
              {
                title: 'Thomas More',
                subitems: [
                  'autorul „Utopiei”',
                  'formulează un ideal social bazat pe echitate și moralitate umanistă'
                ]
              }
            ]
          }
        ]
      }      
    ],
  },
  {
    id: 'clasicism',
    nume: 'Clasicismul',
    interval: 'sec. XVII–XVIII',
    an: 1700,
    img: '/curente/clasicismul.webp',
    glowColor: 'rgba(247, 194, 97, 0.85)',
    descriere: 'Echilibru, rațiune, reguli stricte. Influență franceză.',
    autori: [
      { nume: 'Nicolas Boileau', slug: null, img: '/scriitori/boileau.webp' },
    ],
    sections: [
      {
        title: 'Ce este Clasicismul?',
        blocks: [
          {
            type: 'text',
            content: 'Clasicismul este un curent literar și artistic al secolelor XVII–XVIII, care promovează echilibrul, armonia, rațiunea și respectarea regulilor stricte de compoziție. Se bazează pe modele antice greco-romane și pe ideea de perfecțiune formală și morală, fiind o reacție împotriva exceselor barocului.'
          },
          {
            type: 'text',
            content: 'Acest curent urmărește să educe și să perfecționeze omul prin literatură, evidențiind virtutea, ordinea și echilibrul în viață și în artă. Clasicismul se caracterizează prin claritate, simetrie, măsură și respectarea regulilor dramatice și poetice.'
          },
          {
            type: 'list',
            intro: 'Principalele preocupări ale Clasicismului sunt:',
            items: [
              'Respectarea regulilor de compoziție și a unității de timp, loc și acțiune în dramă.',
              'Echilibrul și armonia în literatură și artă, evitând excesele și exagerările.',
              'Promovarea rațiunii și a moralității ca ghid în viață și în creație.',
              'Influența modelelor antice greco-romane în teme, stil și formă.',
              'Educația și formarea morală a cititorului sau spectatorului.',
              'Stil sobru și clar, cu un limbaj elevat și coerent.',
              'Evitarea subiectivității exagerate și a emoțiilor extreme.'
            ]
          }
        ]
      },
      {
        title: 'Caracteristicile Clasicismului',
        blocks: [
          {
            type: 'list',
            items: [
              {
                title: 'Rațiunea în centrul creației',
                description: 'Literatura clasică se supune rațiunii, echilibrului și proporției, evitând excesele emoționale.'
              },
              {
                title: 'Respectarea regulilor',
                description: 'Unitatea de timp, loc și acțiune în dramă și normele stricte de compoziție sunt fundamentale.'
              },
              {
                title: 'Modelul antichității',
                description: 'Autorii clasicismului urmează exemplul Greciei și Romei antice în temă, structură și morală.'
              },
              {
                title: 'Funcție moralizatoare',
                description: 'Scopul literaturii este să educe și să formeze virtutea cititorului sau spectatorului.'
              },
              {
                title: 'Claritate și sobrietate stilistică',
                description: 'Limbaj elevat, coerent și precis, evitând exagerările baroce.'
              },
              {
                title: 'Simetrie și armonie',
                description: 'Structurile narative și dramatice sunt echilibrate și ordonate, pentru a reflecta perfecțiunea formală.'
              }
            ]
          }
        ]
      },
      {
        title: 'Reprezentanții Clasicismului',
        blocks: [
          {
            type: 'text',
            content: 'Principalii autori ai curentului, organizați clar și sistematic.'
          },
          {
            type: 'subheading',
            content: 'România'
          },
          {
            type: 'list',
            style: 'dash',
            items: [
              {
                title: 'Ion Budai-Deleanu',
                subitems: [
                  'autor al epopeii „Țiganiada”',
                  'combină umorul și satira cu normele clasiciste',
                  'promovează claritatea și echilibrul stilistic'
                ]
              },
              {
                title: 'Costache Conachi',
                subitems: [
                  'poet și prozator clasicist',
                  'scrie cu respect pentru armonie și reguli literare',
                  'valorifică teme morale și educative'
                ]
              }
            ]
          },
          {
            type: 'subheading',
            content: 'Europa'
          },
          {
            type: 'list',
            style: 'dash',
            items: [
              {
                title: 'Molière',
                subitems: [
                  'dramaturg francez de marcă',
                  'comedii respectând reguli clasice și funcție moralizatoare',
                  'exemplu de echilibru și claritate stilistică'
                ]
              },
              {
                title: 'Jean Racine',
                subitems: [
                  'dramaturg francez, maestru al tragediei clasice',
                  'respectă unitatea de timp, loc și acțiune',
                  'exprimă emoții controlate și echilibrate'
                ]
              },
              {
                title: 'Voltaire',
                subitems: [
                  'scriitor și filosof iluminist, influențat de clasicism',
                  'promovează rațiunea și echilibrul moral',
                  'opere cu caracter educativ și critic social'
                ]
              },
              {
                title: 'La Fontaine',
                subitems: [
                  'autor de fabule franceze',
                  'stil clar, moralizator și elegant',
                  'inspirat din tradiția clasică și morală antică'
                ]
              }
            ]
          }
        ]
      }      
    ]
  },
  {
    id: 'iluminism',
    nume: 'Iluminismul',
    interval: 'sec. XVIII',
    an: 1750,
    img: '/curente/iluminismul.webp',
    glowColor: 'rgba(109, 76, 10, 0.85)',
    descriere: 'Rațiune, educație, spirit critic. Enciclopedism european.',
    autori: [],
    sections: [
      {
        title: 'Ce este Iluminismul?',
        blocks: [
          {
            type: 'text',
            content: 'Iluminismul este un curent cultural, filosofic și literar apărut în secolul XVIII, care promovează rațiunea, progresul, libertatea gândirii și critica autorităților tradiționale. Se caracterizează prin accentul pus pe cunoaștere, educație și drepturile fundamentale ale omului.'
          },
          {
            type: 'text',
            content: 'Scopul Iluminismului era să elibereze societatea de prejudecăți, superstiții și dogme, punând în centrul preocupărilor dezvoltarea intelectuală și morală a individului. Literatura și filosofia iluministă urmăresc să educe, să informeze și să stimuleze reflecția critică.'
          },
          {
            type: 'list',
            intro: 'Principalele idei și preocupări ale Iluminismului sunt:',
            items: [
              'Rațiunea ca ghid universal în cunoaștere și moralitate.',
              'Educația și cultura pentru emanciparea individului.',
              'Critica religiei, a autorității absolute și a prejudecăților sociale.',
              'Promovarea drepturilor naturale ale omului și a libertății de exprimare.',
              'Toleranța, justiția și echitatea socială ca idealuri fundamentale.',
              'Difuzarea cunoștințelor prin enciclopedii, tratate și literatură moralizatoare.',
              'Literatura și arta ca instrumente de reformă socială și educație morală.'
            ]
          }
        ]
      },
      {
        title: 'Caracteristicile Iluminismului',
        blocks: [
          {
            type: 'list',
            items: [
              {
                title: 'Rațiunea în centrul gândirii',
                description: 'Rațiunea devine principala modalitate de analiză și de judecată, înlocuind dogma și superstiția.'
              },
              {
                title: 'Funcție educativă și moralizatoare',
                description: 'Literatura și filozofia sunt folosite pentru formarea intelectuală și morală a individului.'
              },
              {
                title: 'Critica autorității',
                description: 'Se contestă absolutismul, privilegiile nobiliare și abuzurile Bisericii.'
              },
              {
                title: 'Progres social și uman',
                description: 'Se promovează reforme care vizează educația, drepturile omului și echitatea socială.'
              },
              {
                title: 'Difuzarea cunoașterii',
                description: 'Enciclopedii, tratate și publicații răspândesc ideile iluministe pentru un public cât mai larg.'
              },
              {
                title: 'Toleranță și libertate',
                description: 'Respectul pentru opinii diferite, libertatea de gândire și de exprimare sunt valori fundamentale.'
              },
              {
                title: 'Stil clar și rațional',
                description: 'Limbaj sobru, clar și coerent, pentru a transmite ideile în mod eficient și convingător.'
              }
            ]
          }
        ]
      },
      {
        title: 'Reprezentanții Iluminismului',
        blocks: [
          {
            type: 'text',
            content: 'Principalii autori și filosofi ai curentului, organizați clar și sistematic.'
          },
          {
            type: 'subheading',
            content: 'România'
          },
          {
            type: 'list',
            style: 'dash',
            items: [
              {
                title: 'Ion Budai-Deleanu',
                subitems: [
                  'autor și reformator cultural',
                  'promovează idei raționale și critice în epopeea „Țiganiada”',
                  'susține educația și perfecționarea individului'
                ]
              },
              {
                title: 'Samuil Micu',
                subitems: [
                  'teolog și istoric iluminist',
                  'implicat în traduceri și în promovarea culturii și educației',
                  'susține ideea progresului prin cunoaștere'
                ]
              },
              {
                title: 'Petru Maior',
                subitems: [
                  'filolog și istoric',
                  'apără originea latină a românilor prin argumente raționale',
                  'promovează educația ca instrument de emancipare'
                ]
              }
            ]
          },
          {
            type: 'subheading',
            content: 'Europa'
          },
          {
            type: 'list',
            style: 'dash',
            items: [
              {
                title: 'Voltaire',
                subitems: [
                  'scriitor și filosof francez',
                  'apără rațiunea, critica religia și autoritatea absolutistă',
                  'folosește satire și eseuri pentru a educa publicul'
                ]
              },
              {
                title: 'Jean-Jacques Rousseau',
                subitems: [
                  'filosof și scriitor francez',
                  'promovează educația și contractul social ca fundament al libertății',
                  'subiecte morale și sociale fundamentale pentru emanciparea individului'
                ]
              },
              {
                title: 'Denis Diderot',
                subitems: [
                  'coordonator al „Enciclopediei”',
                  'difuzează cunoașterea și ideile iluministe pentru publicul larg',
                  'promovează rațiunea și critica autorității tradiționale'
                ]
              },
              {
                title: 'Montesquieu',
                subitems: [
                  'filosof și jurist francez',
                  'apără separația puterilor și drepturile omului',
                  'studii și tratate care influențează gândirea politică modernă'
                ]
              }
            ]
          }
        ]
      }      
    ]
  },
  {
    id: 'pasoptism',
    nume: 'Pașoptismul',
    interval: 'cca. 1840–1860',
    an: 1848,
    img: '/curente/pasoptismul.webp',
    glowColor: 'rgba(161, 112, 14, 0.85)',
    descriere: 'Program cultural-național, modernizare, limbă și literatură.',
    autori: [],
  },
  {
    id: 'romantism',
    nume: 'Romantismul',
    interval: 'cca. 1800–1870',
    an: 1830,
    img: '/curente/romantismul.webp',
    glowColor: 'rgba(106, 90, 205, 0.85)',
    descriere: 'Sentiment, imaginație, natura și individul. În RO: Eminescu.',
    autori: [
      { nume: 'Mihai Eminescu', slug: 'eminescu', img: '/scriitori/eminescu_mihai.webp' },
      { nume: 'Vasile Alecsandri', slug: 'alecsandri', img: '/scriitori/alecsandri.webp' },
    ],
  },
  {
    id: 'junimism',
    nume: 'Criticismul junimist',
    interval: 'cca. 1863–1900',
    an: 1870,
    img: '/curente/criticismul.webp',
    glowColor: 'rgba(122,58,0,0.85)',
    descriere: 'Spirit critic, criterii estetice, "forme fără fond".',
    autori: [],
  },
  {
    id: 'realism',
    nume: 'Realismul',
    interval: 'cca. 1830–1900',
    an: 1880,
    img: '/curente/realismul.webp',
    glowColor: 'rgba(160, 127, 45, 0.85)',
    descriere: 'Reflectă fidel realitatea socială. În RO: Rebreanu, Călinescu.',
    autori: [
      { nume: 'Liviu Rebreanu', slug: 'rebreanu', img: '/scriitori/liviu_rebreanu_nou.webp' },
      { nume: 'George Călinescu', slug: 'calinescu', img: '/scriitori/george_calinescu.webp' },
    ],
  },
  {
    id: 'simbolism',
    nume: 'Simbolismul',
    interval: 'cca. 1886–1910',
    an: 1895,
    img: '/curente/simbolismul.webp',
    glowColor: 'rgba(103, 58, 183, 0.9)',
    descriere: 'Sugestie, muzicalitate, corespondențe. În RO: Bacovia.',
    autori: [
      { nume: 'George Bacovia', slug: 'bacovia', img: '/scriitori/bacovia_rezerva.webp' },
    ],
  },
  {
    id: 'prelungiri',
    nume: 'Prelungiri ale romantismului și simbolismului',
    interval: 'cca. 1900–1920',
    an: 1905,
    img: '/curente/prelungiri.webp',
    glowColor: 'rgba(72, 61, 139, 0.85)',
    descriere: 'Persistențe tematice și formale post-1900.',
    autori: [],
  },
  {
    id: 'avangarda',
    nume: 'Avangarda',
    interval: 'cca. 1910–1930',
    an: 1920,
    img: '/curente/avangarda.webp',
    glowColor: 'rgba(255, 69, 0, 0.85)',
    descriere: 'Ruperea convențiilor: dadaism, suprarealism. În RO: Tzara.',
    autori: [
      { nume: 'Tristan Tzara', slug: null, img: '/scriitori/stanescu.webp' },
    ],
  },
  {
    id: 'modernism',
    nume: 'Modernismul',
    interval: 'cca. 1900–1945',
    an: 1925,
    img: '/curente/modernismul.webp',
    glowColor: 'rgba(47, 79, 79, 0.85)',
    descriere: 'Inovație formală, introspecție, urban. În RO: Arghezi, Blaga.',
    autori: [
      { nume: 'Tudor Arghezi', slug: 'arghezi', img: '/scriitori/tudor_arghezi.webp' },
      { nume: 'Lucian Blaga', slug: 'blaga', img: '/scriitori/lucian_blaga.webp' },
    ],
  },
  {
    id: 'modern-interbelic',
    nume: 'Modernismul interbelic',
    interval: 'cca. 1918–1945',
    an: 1930,
    img: '/curente/interbelic.webp',
    glowColor: 'rgba(139, 69, 19, 0.85)',
    descriere: 'Inovație, sincronizare europeană, experiment estetic.',
    autori: [],
  },
  {
    id: 'traditionalism',
    nume: 'Traditionalismul',
    interval: 'cca. 1920–1940',
    an: 1930,
    img: '/curente/traditionalismul.webp',
    glowColor: 'rgba(34, 139, 34, 0.85)',
    descriere: 'Întoarcere la sat, ethos național, mit și religie.',
    autori: [],
  },
  {
    id: 'postbelic',
    nume: 'Perioada postbelică',
    interval: '1945–1989',
    an: 1965,
    img: '/curente/postbelic.webp',
    glowColor: 'rgba(105, 105, 105, 0.85)',
    descriere: 'Literatură sub constrângeri ideologice și deschideri parțiale.',
    autori: [],
  },
  {
    id: 'neomodernism',
    nume: 'Neomodernismul',
    interval: 'cca. 1960–1980',
    an: 1970,
    img: '/curente/neomodernismul.webp',
    glowColor: 'rgba(70, 130, 180, 0.85)',
    descriere: 'Reactualizare a modernismului, densitate metaforică, reflexiv.',
    autori: [],
  },
  {
    id: 'postmodernism',
    nume: 'Postmodernismul',
    interval: 'cca. 1980–prezent',
    an: 1990,
    img: '/curente/postmodernismul.webp',
    glowColor: 'rgba(255, 105, 180, 0.85)',
    descriere: 'Intertextualitate, ironie, ludic, amestec de registre.',
    autori: [],
  },
];

export const curenteById = CURENTE.reduce((acc, c) => { acc[c.id] = c; return acc; }, {});
export default CURENTE;



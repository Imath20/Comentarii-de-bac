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
    descriere: 'Umanismul pune în centrul culturii omul, rațiunea și demnitatea sa, promovând întoarcerea la valorile Antichității pentru formarea unui spirit cultivat.',
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
    an: 1600,
    img: '/curente/clasicismul.webp',
    glowColor: 'rgba(247, 194, 97, 0.85)',
    descriere: 'Clasicismul valorizează echilibrul, rigoarea, ordinea și respectarea modelelor antice, urmărind perfecțiunea morală și estetică. Literatura veche română.',
    autori: [
      { nume: 'Grigore Ureche', slug: null, img: '/scriitori/gheorghe_ureche.png' },
      { nume: 'Miron Costin', slug: null, img: '/scriitori/miron_costin.png' },
      { nume: 'Ion Neculce', slug: null, img: '/scriitori/ion_neculce.png' },
      { nume: 'Dimitrie Cantemir', slug: null, img: '/scriitori/dimitrie_cantemir.png' },
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
    descriere: 'Iluminismul exaltează rațiunea, educația și progresul, susținând emanciparea omului prin cunoaștere și spirit critic.',
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
    descriere: 'Pașoptismul susține modernizarea societății prin cultură, promovând patriotismul, identitatea națională și aspirațiile civice. Literatura modernă.',
    autori: [
      { nume: 'Vasile Alecsandri', slug: 'alecsandri', img: '/scriitori/vasile_alexandri.png' },
      { nume: 'Costache Negruzzi', slug: null, img: '/scriitori/costache-negruzzi.webp' },
      { nume: 'Alexandru Lăpușneanu', slug: null, img: '/scriitori/lapusneanu.webp' },
      { nume: 'Grigore Alexandrescu', slug: null, img: '/scriitori/alexandrescu.webp' },
      { nume: 'Mihail Kogălniceanu', slug: null, img: '/scriitori/kogalniceanu.webp' },
    ],
    sections: [
      {
        title: 'Ce este Pasoptismul?',
        blocks: [
          {
            type: 'text',
            content: 'Pasoptismul este un curent literar și politic românesc al secolului XIX, care se dezvoltă în jurul Revoluției de la 1848. Curentul combină idealurile de libertate, dreptate socială și națională cu preocupările pentru modernizarea societății și afirmarea identității românești.'
          },
          {
            type: 'text',
            content: 'Pasoptiștii promovează idei de emancipare națională, reforme sociale și culturale, precum și exprimarea sentimentelor și aspirațiilor poporului român prin literatură și jurnalism. Literatura pasoptistă combină patriotismul, activismul social și atenția pentru condiția omului în societate.'
          },
          {
            type: 'list',
            intro: 'Principalele preocupări și caracteristici ale Pasoptismului sunt:',
            items: [
              'Emanciparea națională și afirmarea identității românești.',
              'Promovarea libertății, dreptății sociale și civice.',
              'Critica nedreptăților sociale și a abuzurilor politice.',
              'Educația și cultura ca instrumente de modernizare a societății.',
              'Patriotismul și activismul civic prin literatură și publicistică.',
              'Combinația dintre sentiment și rațiune, între afectiv și ideologic.',
              'Sprijinirea ideilor revoluționare și a reformelor progresiste.'
            ]
          }
        ]
      },
      {
        title: 'Caracteristicile Pasoptismului',
        blocks: [
          {
            type: 'list',
            items: [
              {
                title: 'Patriotism activ',
                description: 'Scriitorii pasoptiști își exprimă iubirea de țară și doresc reforme sociale și politice.'
              },
              {
                title: 'Conștiință socială',
                description: 'Literatura abordează nedreptățile sociale și promovează echitatea și drepturile cetățenești.'
              },
              {
                title: 'Libertatea gândirii',
                description: 'Ideile sunt exprimate fără constrângeri, cu accent pe critica autorităților și a dogmelor.'
              },
              {
                title: 'Angajament civic',
                description: 'Autorii se implică în viața publică și sprijină mișcările revoluționare și reformiste.'
              },
              {
                title: 'Îmbinarea sentimentului cu rațiunea',
                description: 'Combinație între emoție patriotică și rațiune critică, pentru a educa și convinge cititorul.'
              },
              {
                title: 'Literatură moralizatoare și instruitivă',
                description: 'Textele transmit valori civice și morale, cu scop educativ și de conștientizare socială.'
              }
            ]
          }
        ]
      },
      {
        title: 'Reprezentanții Pasoptismului',
        blocks: [
          {
            type: 'text',
            content: 'Principalele personalități ale curentului pașoptist, prezentate sistematic, cu accent pe contribuțiile lor culturale, politice și ideologice.'
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
                title: 'Nicolae Bălcescu',
                subitems: [
                  'istoric, publicist și lider al Revoluției de la 1848',
                  'promotor al libertății, egalității și reformelor sociale',
                  'autor al lucrării „Românii supt Mihai Voievod Viteazul”'
                ]
              },
      
              {
                title: 'Vasile Alecsandri',
                subitems: [
                  'poet, dramaturg, diplomat',
                  'cântă idealurile naționale și folclorul românesc',
                  'participant activ la Revoluția pașoptistă'
                ]
              },
      
              {
                title: 'Mihail Kogălniceanu',
                subitems: [
                  'publicist, om politic, istoric',
                  'militează pentru modernizarea instituțiilor și emanciparea socială',
                  'autor al „Daciei literare”'
                ]
              },
      
              {
                title: 'Ion Heliade Rădulescu',
                subitems: [
                  'scriitor, filolog, tipograf',
                  'luptă pentru dezvoltarea limbii române și educației',
                  'fondator al presei moderne din Țara Românească'
                ]
              },
      
              {
                title: 'Cezar Bolliac',
                subitems: [
                  'poet și publicist cu vederi radicale',
                  'apără drepturile țăranilor',
                  'susținător fervent al revoluției'
                ]
              },
      
              {
                title: 'Nicolae Filimon',
                subitems: [
                  'proza modernă realistă cu preocupări sociale',
                  'autorul primului roman realist românesc – „Ciocoii vechi și noi”'
                ]
              },
      
              {
                title: 'Grigore Alexandrescu',
                subitems: [
                  'poet și fabulist',
                  'promovează spiritul civic și moralitatea',
                  'textele sale au un caracter satiric și patriotic'
                ]
              },
      
              {
                title: 'Anton Pann',
                subitems: [
                  'folclorist, compozitor și poet',
                  'culege și valorifică literatura populară',
                  'autor al numeroaselor povestiri cu morală'
                ]
              },
      
              {
                title: 'Costache Negruzzi',
                subitems: [
                  'proza realistă timpurie și nuvelistică istorică',
                  'autor al nuvelei „Alexandru Lăpușneanul”',
                  'membru marcant al curentului pașoptist moldovean'
                ]
              },
      
              {
                title: 'Andrei Mureșanu',
                subitems: [
                  'poet și revoluționar transilvănean',
                  'autorul poemului „Un răsunet”, devenit Imnul Național',
                  'militant pentru drepturile românilor ardeleni'
                ]
              },
      
              {
                title: 'Dimitrie Bolintineanu',
                subitems: [
                  'poet, diplomat, pașoptist activ',
                  'scrie despre eroii naționali, patriotism și libertate',
                  'autor al volumului „Legende istorice”'
                ]
              },
      
              {
                title: 'Avram Iancu',
                subitems: [
                  'lider al revoluționarilor români din Transilvania',
                  'apără drepturile naționale ale românilor și autonomia lor',
                  'simbol al luptei pentru libertate și identitate'
                ]
              },
      
              {
                title: 'Simion Bărnuțiu',
                subitems: [
                  'filosof și lider al Revoluției de la 1848 în Transilvania',
                  'autor al celebrului „Discurs de la Blaj”',
                  'promovează drepturile națiunii române și principiile constituționale'
                ]
              },
      
              {
                title: 'Andrei Șaguna',
                subitems: [
                  'episcop și mitropolit',
                  'apără drepturile culturale și religioase ale românilor ardeleni',
                  'susține educația și autonomia comunităților românești'
                ]
              },
      
              {
                title: 'Alexandru Ioan Cuza',
                subitems: [
                  'domnitor, personalitate centrală a modernizării României',
                  'realizează Unirea Principatelor (1859)',
                  'înfăptuiește reforme fundamentale în spirit pașoptist'
                ]
              },
      
              {
                title: 'Ion C. Brătianu',
                subitems: [
                  'om politic liberal',
                  'participant la Revoluția de la 1848',
                  'membru fondator al Partidului Național Liberal'
                ]
              },
      
              {
                title: 'Ion Ghica',
                subitems: [
                  'politician, economist și scriitor',
                  'participant la mișcarea de la 1848',
                  'autor al „Scrisorilor către Vasile Alecsandri”'
                ]
              },
      
              {
                title: 'C. A. Rosetti',
                subitems: [
                  'publicist, politician radical',
                  'lider marcant al pașoptismului muntean',
                  'militează pentru libertăți civile și reforme democratice'
                ]
              },
      
              {
                title: 'Frații Golești (Dinicu, Ștefan, Radu)',
                subitems: [
                  'familie de boieri revoluționari',
                  'susțin reformele sociale și educația',
                  'implicați în 1848 și în formarea instituțiilor moderne'
                ]
              },
      
              {
                title: 'George Barițiu',
                subitems: [
                  'publicist și lider transilvănean',
                  'fondator al presei românești din Ardeal',
                  'susținător al culturii și conștiinței naționale'
                ]
              },
      
              {
                title: 'Petrache Poenaru',
                subitems: [
                  'inventator și pedagog',
                  'participant la Revoluția de la 1821 și susținător al ideilor progresiste',
                  'inventatorul stiloului modern și promotor al educației'
                ]
              },
      
              {
                title: 'Gheorghe Asachi',
                subitems: [
                  'scriitor, pedagog, jurnalist',
                  'fondator al primei școli de inginerie din Moldova',
                  'promotor al culturii, artei și identității românești'
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
                title: 'Giuseppe Mazzini',
                subitems: [
                  'lider al mișcării naționaliste italiene',
                  'promotor al unității naționale și al drepturilor cetățenești',
                  'inspiră revoluțiile europene din 1848'
                ]
              },
              {
                title: 'Heinrich Heine',
                subitems: [
                  'poet german și publicist',
                  'critic al autoritarismului și al nedreptății sociale',
                  'adept al libertății politice'
                ]
              },
              {
                title: 'Victor Hugo',
                subitems: [
                  'scriitor, academician și om politic francez',
                  'apără libertatea, justiția socială și demnitatea umană',
                  'participant la luptele politice ale epocii'
                ]
              },
              {
                title: 'Alexandre Dumas (tată)',
                subitems: [
                  'autor de romane istorice cu accent pe idealuri de libertate',
                  'influențat de mișcările progresiste ale epocii',
                  'susținător al drepturilor omului'
                ]
              }
            ]
          }
        ]
      }
      
    ]
  },
  {
    id: 'romantism',
    nume: 'Romantismul',
    interval: 'cca. 1800–1870',
    an: 1830,
    img: '/curente/romantismul.webp',
    glowColor: 'rgba(106, 90, 205, 0.85)',
    descriere: 'Romantismul exprimă trăiri intense, idealuri ale libertății și evadarea în natură, istorie sau imaginar, valorizând geniul creator.',
    autori: [
      { nume: 'Mihai Eminescu', slug: 'eminescu', img: '/scriitori/eminescu_mihai.webp' },
      { nume: 'Vasile Alecsandri', slug: 'alecsandri', img: '/scriitori/alecsandri.webp' },
    ],
    sections: [
      {
        title: 'Ce este Romantismul?',
        blocks: [
          {
            type: 'text',
            content: 'Romantismul este un curent literar și artistic apărut la sfârșitul secolului al XVIII-lea și afirmat puternic în secolul al XIX-lea. El pune în prim-plan sensibilitatea, individualitatea, imaginația și aspirația spre absolut, reacționând împotriva raționalismului clasic și a rigidității regulilor tradiționale.'
          },
          {
            type: 'text',
            content: 'Scriitorii romantici valorizează emoția profundă, natura, idealurile naționale și explorarea interiorității umane. Ei cultivă libertatea creatoare, expresia subiectivă și reprezentarea condiției omului în dimensiunea ei morală, istorică și metafizică.'
          },
          {
            type: 'list',
            intro: 'Temele și direcțiile esențiale ale Romantismului includ:',
            items: [
              'Exprimarea intensă a sentimentelor: iubire, melancolie, dor, revoltă, aspirație.',
              'Cultul naturii ca refugiu, confesor și oglindă a sufletului.',
              'Interes pentru istorie, mitologie și identitatea națională.',
              'Individualism: accent pe trăirea interioară și singularitatea eului.',
              'Orientarea spre fantastic, vis, mister, supranatural.',
              'Evadarea: spre trecut, natură, spațiu, infinit, ideal.',
              'Libertatea totală a creației: respingerea regulilor stricte ale clasicismului.'
            ]
          }
        ]
      },
      {
        title: 'Caracteristicile Romantismului',
        blocks: [
          {
            type: 'list',
            items: [
              {
                title: 'Subiectivitate',
                description: 'Autorul își exprimă direct trăirile, emoțiile și conflictele interioare.'
              },
              {
                title: 'Cultul naturii',
                description: 'Natura este reprezentată ca spațiu al contemplației, libertății și armoniei sufletești.'
              },
              {
                title: 'Aspirația spre absolut',
                description: 'Idealul, infinitul și imposibilul devin teme centrale în explorarea spiritului uman.'
              },
              {
                title: 'Interes pentru istorie și tradiție',
                description: 'Revalorificarea miturilor, a folclorului și a trecutului eroic al națiunilor.'
              },
              {
                title: 'Evadarea romantică',
                description: 'Tendința de a fugi din realitatea imediată spre lumi ideale, fantastice sau istorice.'
              },
              {
                title: 'Personaje excepționale',
                description: 'Eroul romantic este adesea superior, conflictual, idealist sau vizionar.'
              },
              {
                title: 'Amestecul genurilor',
                description: 'Scriitorii renunță la separarea strictă a genurilor, combinând epic, liric și dramatic.'
              }
            ]
          }
        ]
      },
      {
        title: 'Reprezentanții Romantismului',
        blocks: [
          {
            type: 'text',
            content: 'Principalii autori ai curentului, organizați sistematic.'
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
                title: 'Mihai Eminescu',
                subitems: [
                  'cel mai important poet al romantismului românesc',
                  'cultivă tema iubirii, a naturii, a condiției umane și a aspirației spre absolut',
                  'poeme fundamentale: „Luceafărul”, „Scrisorile”, „Odă (în metru antic)”'
                ]
              },
              {
                title: 'Vasile Alecsandri',
                subitems: [
                  'poet, dramaturg și diplomat',
                  'valorifică folclorul, tradițiile și natura românească',
                  'scrieri reprezentative: „Pasteluri”, „Doine și Lăcrămioare”'
                ]
              },
              {
                title: 'G. Barițiu și alți autori pașoptiști',
                subitems: [
                  'promovează ideile romantice legate de istorie și identitate națională',
                  'susțin modernizarea culturii române'
                ]
              },
              {
                title: 'Costache Negruzzi',
                subitems: [
                  'autor romantic cu accente istorice și naționale',
                  'scrieri reprezentative: „Alexandru Lăpușneanul”, „Fragmente istorice”'
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
                title: 'Victor Hugo',
                subitems: [
                  'mare poet, dramaturg și romancier francez',
                  'operele sale combină idealul, libertatea și critica socială'
                ]
              },
              {
                title: 'Alfred de Musset',
                subitems: [
                  'poet și dramaturg francez',
                  'accent pe drame interioare și pasiuni intense'
                ]
              },
              {
                title: 'Johann Wolfgang von Goethe',
                subitems: [
                  'scriitor german fundamental',
                  'operele sale îmbină rațiunea cu sensibilitatea romantică („Faust”)'
                ]
              },
              {
                title: 'Novalis',
                subitems: [
                  'poet și filosof german',
                  'promotor al romantismului timpuriu, orientat spre ideal și mister'
                ]
              },
              {
                title: 'Lord Byron',
                subitems: [
                  'poet englez de mare influență',
                  'eroii săi sunt individualiști, rebeli, pasionali și melancolici'
                ]
              }
            ]
          }
        ]
      }      
    ]
  },
  {
    id: 'junimism',
    nume: 'Criticismul junimist',
    interval: 'cca. 1863–1900',
    an: 1860,
    img: '/curente/criticismul.webp',
    glowColor: 'rgba(122,58,0,0.85)',
    descriere: 'Criticismul junimist pune accent pe rigoare estetică, echilibru și selecția valorilor, criticând excesul retoric și lipsa de autenticitate. MARII CLASICI.',
    autori: [
      { nume: 'Mihai Eminescu', slug: 'eminescu', img: '/scriitori/eminescu_mihai.webp' },
      { nume: 'Ion Creangă', slug: 'creanga', img: '/scriitori/creanga_ion.webp' },
      { nume: 'I.L. Caragiale', slug: 'caragiale', img: '/scriitori/il-caragiale.webp' },
      { nume: 'Ioan Slavici', slug: 'slavici', img: '/scriitori/ioan_slavici.webp' },
    ],
    sections: [
      {
        title: 'Ce este Criticismul Junimist?',
        blocks: [
          {
            type: 'text',
            content: 'Criticismul junimist reprezintă direcția teoretică și estetică promovată de societatea „Junimea”, fondată la Iași în 1863. Este un curent literar și cultural care urmărește profesionalizarea literaturii române, eliminarea improvizației, promovarea valorii autentice și formarea unui gust estetic solid.'
          },
          {
            type: 'text',
            content: 'Junimiștii pun accent pe criteriul estetic, pe spirit critic obiectiv, pe claritate, logică și respectarea normelor limbii. Ei contestă excesele romantismului, retorica exagerată și artificialitatea unor opere considerate „lipsite de fundament”.'
          },
          {
            type: 'list',
            intro: 'Direcțiile centrale ale Criticismului Junimist includ:',
            items: [
              'Fundamentarea literaturii pe criteriul valorii estetice.',
              'Combaterea formelor fără fond din cultură și societate.',
              'Promovarea limbii literare clare, corecte și naturale.',
              'Rigoare logică și echilibru în analiză și expresie.',
              'Spirit critic obiectiv, lipsit de sentimentalismul romantic.',
              'Susținerea profesionalizării scrisului și a educației culturale.',
              'Introducerea normelor culturale moderne în viața literară românească.'
            ]
          }
        ]
      },
      {
        title: 'Caracteristicile Criticismului Junimist',
        blocks: [
          {
            type: 'list',
            items: [
              {
                title: 'Criteriul estetic',
                description: 'Opera este evaluată prin valoarea ei artistică, nu prin utilitatea morală sau națională.'
              },
              {
                title: 'Spirit critic',
                description: 'Analiza literară se bazează pe rațiune, argumentare și luciditate, nu pe entuziasm sau admirație necondiționată.'
              },
              {
                title: 'Claritate și simplitate',
                description: 'Promovarea stilului limpede, logic și lipsit de excese retorice.'
              },
              {
                title: 'Combaterea formelor fără fond',
                description: 'Ideea că instituțiile și creațiile culturale trebuie să aibă un fundament real, nu doar o aparență.'
              },
              {
                title: 'Normarea limbii literare',
                description: 'Lupta împotriva artificialității, a neologismelor inutile și a exagerărilor stilistice.'
              },
              {
                title: 'Realism moderat',
                description: 'Orientare spre observația lucidă a realității și respingerea fanteziei excesive.'
              },
              {
                title: 'Promovarea valorilor autentice',
                description: 'Afirmarea scriitorilor care respectă criteriul estetic și respingerea improvizației.'
              }
            ]
          }
        ]
      },
      {
        title: 'Reprezentanții Criticismului Junimist',
        blocks: [
          {
            type: 'text',
            content: 'Figurile centrale ale curentului, organizate sistematic.'
          },
          {
            type: 'subheading',
            content: 'Nucleul Junimist'
          },
          {
            type: 'list',
            style: 'dash',
            items: [
              {
                title: 'Titu Maiorescu',
                subitems: [
                  'principalul teoretician al Junimii',
                  'autor al conceptului „forme fără fond”',
                  'promotor al criteriului estetic și al rigoarei intelectuale',
                  'a susținut și a impus standarde moderne în critica românească'
                ]
              },
              {
                title: 'Petre P. Carp',
                subitems: [
                  'membru fondator al Junimii',
                  'sprijină modernizarea culturală și intelectuală',
                  'promotor al disciplinei și al seriozității în viața publică'
                ]
              },
              {
                title: 'Iacob Negruzzi',
                subitems: [
                  'editor al revistei „Convorbiri literare”',
                  'a contribuit la selecția și promovarea valorilor literare autentice',
                  'a menținut standardele estetice ale societății Junimea'
                ]
              }
            ]
          },
          {
            type: 'subheading',
            content: 'Scriitori susținuți de Junimea'
          },
          {
            type: 'list',
            style: 'dash',
            items: [
              {
                title: 'Mihai Eminescu',
                subitems: [
                  'poet canonic al literaturii române',
                  'Junimea l-a promovat și l-a publicat în „Convorbiri literare”',
                  'considerat modelul suprem al valorii estetice'
                ]
              },
              {
                title: 'Ion Creangă',
                subitems: [
                  'proza sa a fost consacrată de Junimea',
                  'valorifică oralitatea, naturalețea și autenticitatea limbii',
                  'opere reprezentative: „Amintiri din copilărie”, „Povești”, „Povestiri”'
                ]
              },
              {
                title: 'I.L. Caragiale',
                subitems: [
                  'dramaturg și prozator esențial',
                  'satirizează „formele fără fond” în viața socială românească',
                  'precizie, luciditate și spirit critic exemplar'
                ]
              },
              {
                title: 'Ioan Slavici',
                subitems: [
                  'proza realistă, echilibrată și morală',
                  'scrieri reprezentative: „Moara cu noroc”, „Popa Tanda”'
                ]
              }
            ]
          }
        ]
      }      
    ]
  },
  {
    id: 'realism',
    nume: 'Realismul',
    interval: 'cca. 1830–1900',
    an: 1880,
    img: '/curente/realismul.webp',
    glowColor: 'rgba(160, 127, 45, 0.85)',
    descriere: 'Realismul redă fidel viața socială, observând obiectiv tipologii, conflicte și realitatea cotidiană, fără idealizare.',
    autori: [
      { nume: 'Liviu Rebreanu', slug: 'rebreanu', img: '/scriitori/liviu_rebreanu_nou.webp' },
      { nume: 'George Călinescu', slug: 'calinescu', img: '/scriitori/george_calinescu.webp' },
    ],
    sections: [
      {
        title: 'Ce este Realismul?',
        blocks: [
          {
            type: 'text',
            content: 'Realismul este un curent literar apărut în secolul al XIX-lea, ca reacție la idealizarea și subiectivismul romantismului. El urmărește reprezentarea fidelă a realității, prin observație directă, spirit critic și analiza condiției umane în contexte sociale concrete.'
          },
          {
            type: 'text',
            content: 'Scriitorii realiști sunt interesați de mediile sociale, de relațiile dintre indivizi, de influența societății asupra destinului uman și de redarea vieții cotidiene fără exagerări. Stilul este obiectiv, echilibrat, clar și orientat spre studiu psihologic, moral și social.'
          },
          {
            type: 'list',
            intro: 'Direcțiile principale ale Realismului sunt:',
            items: [
              'Reprezentarea fidelă a realității, fără idealizare sau deformare.',
              'Analiza mediului social și a influenței acestuia asupra individului.',
              'Construcția de personaje complexe, motivate psihologic și social.',
              'Obiectivitate narativă și detașare de subiectivismul romantic.',
              'Observație minuțioasă a vieții cotidiene și a comportamentului uman.',
              'Critica societății și a instituțiilor care influențează destinul omului.',
              'Structură narativă clară, coerentă și bine organizată.'
            ]
          }
        ]
      },
      {
        title: 'Caracteristicile Realismului',
        blocks: [
          {
            type: 'list',
            items: [
              {
                title: 'Obiectivitate',
                description: 'Prezentarea faptelor și a personajelor fără intervenția afectivă a autorului.'
              },
              {
                title: 'Tipologie',
                description: 'Crearea unor personaje reprezentative pentru anumite categorii sociale sau psihologice.'
              },
              {
                title: 'Verosimilitate',
                description: 'Evenimentele, mediile și comportamentele trebuie să fie credibile și conforme cu realitatea.'
              },
              {
                title: 'Analiză socială',
                description: 'Realismul investighează structuri sociale, conflicte, marginalizare și condiția individului.'
              },
              {
                title: 'Construcție coerentă',
                description: 'Respectarea logicii, a cauzalității și a evoluției firești a situațiilor dramatice sau narative.'
              },
              {
                title: 'Limbaj adecvat',
                description: 'Stil sobru, clar, adaptat mediului și statutului social al personajelor.'
              },
              {
                title: 'Narațiune la persoana a III-a',
                description: 'Deseori narator omniscient, cu perspectivă amplă asupra lumii ficționale.'
              }
            ]
          }
        ]
      },
      {
        title: 'Reprezentanții Realismului',
        blocks: [
          {
            type: 'text',
            content: 'Mari autori ai realismului european și românesc, organizați riguros.'
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
                title: 'Ion Creangă',
                subitems: [
                  'proza sa se remarcă prin observația minuțioasă a lumii satului',
                  '„Amintiri din copilărie”, „Povești”, „Povestiri”',
                  'stil autentic, oralitate și fidelitate față de realitatea rurală'
                ]
              },
              {
                title: 'Ioan Slavici',
                subitems: [
                  'reprezentant marcant al realismului ardelean',
                  'operele sale analizează moralitatea și influența mediului social',
                  '„Moara cu noroc”, „Budulea Taichii”'
                ]
              },
              {
                title: 'Liviu Rebreanu',
                subitems: [
                  'roman psihologic și social de mare amploare',
                  '„Ion”, „Pădurea spânzuraților”, „Răscoala”',
                  'analiză profundă a motivațiilor umane și a determinismului social'
                ]
              },
              {
                title: 'George Călinescu',
                subitems: [
                  'autor al romanului „Enigma Otiliei”',
                  'abordează realismul prin construcție amplă, observație socială și tipologii memorabile'
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
                title: 'Honoré de Balzac',
                subitems: [
                  'creator al „Comediei Umane”',
                  'abordare enciclopedică a societății franceze',
                  'stil obiectiv, cu personaje tipice și analize sociale profunde'
                ]
              },
              {
                title: 'Gustave Flaubert',
                subitems: [
                  'autorul romanului „Madame Bovary”',
                  'perfecționist al stilului și al observației obiective'
                ]
              },
              {
                title: 'Charles Dickens',
                subitems: [
                  'descrieri detaliate ale mediilor urbane',
                  'critică socială amplă și personaje memorabile',
                  '„Oliver Twist”, „Marile speranțe”'
                ]
              },
              {
                title: 'Lev Tolstoi',
                subitems: [
                  'romane monumentale precum „Război și pace” și „Anna Karenina”',
                  'analiză psihologică profundă și frescă socială vastă'
                ]
              },
              {
                title: 'Fyodor Dostoievski',
                subitems: [
                  'exploră profunzimile psihologiei umane',
                  '„Crimă și pedeapsă”, „Frații Karamazov”'
                ]
              }
            ]
          }
        ]
      }      
    ]
  },
  {
    id: 'simbolism',
    nume: 'Simbolismul',
    interval: 'cca. 1886–1910',
    an: 1916,
    img: '/curente/simbolismul.webp',
    glowColor: 'rgba(103, 58, 183, 0.9)',
    descriere: 'Simbolismul explorează lumea interioară prin sugestie, muzicalitate și corespondențe, transformând poezia într-o expresie a stărilor sufletești. Realism în proză, Simbolism în poezie.',
    autori: [
      { nume: 'George Bacovia', slug: 'bacovia', img: '/scriitori/bacovia_rezerva.webp' },
    ],
    sections: [
      {
        title: 'Ce este Simbolismul?',
        blocks: [
          {
            type: 'text',
            content: 'Simbolismul este un curent literar și artistic apărut la sfârșitul secolului XIX, în Franța, și răspândit apoi în Europa și România. Curentul reacționează împotriva realismului și naturalismului, punând accent pe sugestie, muzicalitate, imaginație și exprimarea stărilor sufletești interioare.'
          },
          {
            type: 'text',
            content: 'Simboliștii folosesc imagini și simboluri pentru a exprima idei abstracte, emoții subtile și stări spirituale, evitând redarea directă a realității. Poezia simbolistă explorează misterul, visul, melancolia, fantasticul și dimensiunile transcendentalului.'
          },
          {
            type: 'list',
            intro: 'Caracteristicile principale ale Simbolismului sunt:',
            items: [
              'Preferința pentru sugestie și evocare, nu pentru descriere directă.',
              'Utilizarea simbolurilor și a metaforelor pentru exprimarea ideilor și emoțiilor.',
              'Explorarea interiorității și a stărilor sufletești complexe.',
              'Muzicalitatea limbajului: ritm, sonoritate și armonie.',
              'Accent pe vis, mister, fantastic și transcendental.',
              'Subiectivism extrem și introspecție.',
              'Refuzul realismului obiectiv și al constrângerilor logice stricte.'
            ]
          }
        ]
      },
      {
        title: 'Caracteristicile Simbolismului',
        blocks: [
          {
            type: 'list',
            items: [
              {
                title: 'Subiectivitate și introspecție',
                description: 'Poezia simbolistă este reflexia trăirilor interioare ale autorului.'
              },
              {
                title: 'Simbol și metaforă',
                description: 'Imaginile simbolistice sunt folosite pentru a exprima idei abstracte și emoții subtile.'
              },
              {
                title: 'Muzicalitatea limbajului',
                description: 'Stilul are un ritm și o sonoritate care intensifică efectul emoțional.'
              },
              {
                title: 'Evocarea misterului',
                description: 'Simbolismul sugerează, nu spune explicit; explorează necunoscutul și misterul existențial.'
              },
              {
                title: 'Evadarea din realitatea imediată',
                description: 'Se explorează visul, fantasticul, lumea spirituală și dimensiunile transcendentale.'
              },
              {
                title: 'Idealul estetic',
                description: 'Se urmărește frumusețea expresiei și armonia formelor, mai degrabă decât utilitatea sau moralitatea textului.'
              },
              {
                title: 'Reacție împotriva realismului',
                description: 'Se refuză redarea obiectivă și fidelă a realității, preferând sugestia și atmosfera.'
              }
            ]
          }
        ]
      },
      {
        title: 'Reprezentanții Simbolismului',
        blocks: [
          {
            type: 'text',
            content: 'Autori și poeți simboliști, organizați clar și sistematic.'
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
                title: 'Ștefan Petică',
                subitems: [
                  'poet simbolist român timpuriu',
                  'a promovat muzicalitatea și sugestia în versuri',
                  'teme: melancolie, vis, introspecție'
                ]
              },
              {
                title: 'Alexandru Macedonski',
                subitems: [
                  'poet, prozator și critic literar',
                  'fondator al revistei „Literatorul”',
                  'introduce simbolismul francez în literatura română'
                ]
              },
              {
                title: 'Ion Minulescu',
                subitems: [
                  'poet și prozator simbolist',
                  'scrie despre vis, iubire, melancolie și oraș',
                  'stil musical, sugestiv și modernist'
                ]
              },
              {
                title: 'George Bacovia',
                subitems: [
                  'poet simbolist târziu',
                  'teme: melancolie, singurătate, decădere',
                  'stil sobru, muzical și expresiv'
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
                title: 'Charles Baudelaire',
                subitems: [
                  'poet francez fundamental pentru simbolism',
                  'autor al „Les Fleurs du mal”',
                  'explorează melancolia, spleen-ul și frumusețea în decadență'
                ]
              },
              {
                title: 'Paul Verlaine',
                subitems: [
                  'poet francez simbolist',
                  'accent pe muzicalitate, sugestie și atmosferă',
                  'teme: iubire, vis, melancolie'
                ]
              },
              {
                title: 'Arthur Rimbaud',
                subitems: [
                  'poet francez de avangardă simbolistă',
                  'scrie poezii despre viziune, revoluție interioară și simboluri puternice'
                ]
              },
              {
                title: 'Stéphane Mallarmé',
                subitems: [
                  'poet francez simbolist de referință',
                  'a promovat poezia sugestivă, muzicală și complex simbolic'
                ]
              },
              {
                title: 'Paul Valéry',
                subitems: [
                  'poet și eseist francez simbolist târziu',
                  'explorează spiritul, simbolurile și formele perfecte ale limbajului'
                ]
              }
            ]
          }
        ]
      }      
    ]
  },
  {
    id: 'prelungiri',
    nume: 'Prelungiri ale romantismului și simbolismului',
    interval: 'cca. 1900–1920',
    an: 1905,
    img: '/curente/prelungiri.webp',
    glowColor: 'rgba(72, 61, 139, 0.85)',
    descriere: 'Acestă zonă literară îmbină sentimentul național, tradiția și expresivitatea cu tonalități simbolice și melancolice, păstrând lirismul profund.',
    autori: [],
    sections: [
      {
        title: 'Prelungiri ale Romantismului și Simbolismului în România',
        blocks: [
          {
            type: 'text',
            content: 'La sfârșitul secolului XIX și începutul secolului XX, influențele romantice și simboliste continuă să modeleze literatura română. Poeții și prozatorii acestei perioade combină sensibilitatea romantică cu tehnicile simboliste, abordând teme precum natura, identitatea națională, condiția omului, melancolia și aspirația spre absolut.'
          },
          {
            type: 'text',
            content: 'Acești autori valorifică folclorul, tradițiile populare, muzicalitatea limbii și simbolurile, creând o punte între romantismul clasic și modernismul emergent.'
          },
          {
            type: 'list',
            intro: 'Caracteristici ale acestei perioade literare:',
            items: [
              'Continuarea temelor romantice: iubire, natură, ideal, melancolie.',
              'Influența simbolismului: sugestie, muzicalitate, simbol, introspecție.',
              'Valorificarea folclorului și tradițiilor populare.',
              'Interes pentru identitatea națională și trecutul istoric.',
              'Combinație de stil liric, epic și, uneori, dramatic.',
              'Explorarea sentimentului de destin, de sacrificiu și de apartenență la comunitate.',
              'Expresia emoțiilor interioare prin imagini sugestive și metafore.'
            ]
          }
        ]
      },
      {
        title: 'Reprezentanți ai prelungirilor Romantismului și Simbolismului',
        blocks: [
          {
            type: 'text',
            content: 'Principalii autori ai acestei perioade, organizați clar și sistematic.'
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
                title: 'Octavian Goga',
                subitems: [
                  'poet, dramaturg și politician',
                  'teme: folclor, patrie, destin, melancolie',
                  'stil liric intens, muzical și expresiv',
                  'scrieri reprezentative: „Poezii”, „Cântece de vitejie”'
                ]
              },
              {
                title: 'George Coșbuc',
                subitems: [
                  'poet și traducător',
                  'valorifică folclorul și limba populară',
                  'teme: natură, muncă, viața satului românesc',
                  'stil clar, sobru, realist-romantic',
                  'scrieri reprezentative: „Balade și idile”, traduceri din Iliada'
                ]
              },
              {
                title: 'Duiliu Zamfirescu',
                subitems: [
                  'romancier cu influențe romantice și realiste',
                  'teme: viața rurală, destinul social și moral',
                  'scrieri reprezentative: „Viața la țară”, „În război”'
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
                title: 'Maurice Maeterlinck',
                subitems: [
                  'poet și dramaturg simbolist belgian',
                  'explorează destinul, misterul și fatalitatea',
                  'stil sugestiv și muzical'
                ]
              },
              {
                title: 'Stefan George',
                subitems: [
                  'poet simbolist german',
                  'teme: artă, ideal, simboluri mistice',
                  'stil musical și elaborat'
                ]
              },
              {
                title: 'Rainer Maria Rilke',
                subitems: [
                  'poet și prozator simbolist german',
                  'teme: introspecție, moarte, singurătate, transfigurare',
                  'stil liric și sugestiv'
                ]
              }
            ]
          }
        ]
      }      
    ]
  },
  {
    id: 'avangarda',
    nume: 'Avangarda',
    interval: 'cca. 1910–1930',
    an: 1920,
    img: '/curente/avangarda.webp',
    glowColor: 'rgba(255, 69, 0, 0.85)',
    descriere: 'Avangarda rupe orice convenție, experimentând radical cu limbajul, forma și imaginile pentru a crea literatură complet inovatoare.',
    autori: [
      { nume: 'Tristan Tzara', slug: null, img: '/scriitori/stanescu.webp' },
    ],
    sections: [
      {
        title: 'Ce este Avangarda?',
        blocks: [
          {
            type: 'text',
            content: 'Avangarda este un curent artistic și literar apărut la începutul secolului XX, ca reacție radicală la tradițiile anterioare, inclusiv la realism, simbolism și modernism clasic. Avangardiștii urmăresc inovația, experimentul, ruperea de tiparele estetice tradiționale și explorarea formelor expresive noi.'
          },
          {
            type: 'text',
            content: 'Curentul cuprinde mai multe tendințe (futurism, dadaism, suprarealism, expresionism) și se caracterizează prin dinamism, experiment lingvistic și vizual, subiectivism extrem, anti-convenționalism și interes pentru revoluția socială și culturală.'
          },
          {
            type: 'list',
            intro: 'Caracteristicile principale ale Avangardei sunt:',
            items: [
              'Ruptura totală de tradițiile estetice și literare.',
              'Experimentul formal: limbaj, vers, structuri narative sau plastice noi.',
              'Explorarea subconștientului, a visului, absurdului și fantasmagoriei.',
              'Anti-convenționalism și contestarea normelor sociale și artistice.',
              'Interdisciplinaritate: poezie, proză, teatru, pictură, fotografie, performance.',
              'Spirit revoluționar și inovator, dorința de a schimba cultura și societatea.',
              'Subiectivism extrem și accent pe expresia individuală a autorului.'
            ]
          }
        ]
      },
      {
        title: 'Caracteristicile Avangardei',
        blocks: [
          {
            type: 'list',
            items: [
              {
                title: 'Inovație și experiment',
                description: 'Formele și limbajul sunt reinventate, se caută expresii noi și neașteptate.'
              },
              {
                title: 'Contestarea tradiției',
                description: 'Se resping tiparele clasice, realismul, simbolismul și normele literare consacrate.'
              },
              {
                title: 'Impresionism interior și suprarealism',
                description: 'Explorarea subconștientului, visului, absurdului și a percepțiilor neașteptate.'
              },
              {
                title: 'Interdisciplinaritate',
                description: 'Literatura se intersectează cu arta vizuală, teatrul experimental, manifestul și performanța.'
              },
              {
                title: 'Provocarea cititorului și a privitorului',
                description: 'Se caută impact emoțional și intelectual prin forme neobișnuite și limbaj surprinzător.'
              },
              {
                title: 'Spirit revoluționar',
                description: 'Deseori există o dimensiune socială sau politică, dorința de schimbare a valorilor.'
              },
              {
                title: 'Subiectivism extrem',
                description: 'Accent pe expresia individuală, pe trăirile și viziunea proprie a artistului.'
              }
            ]
          }
        ]
      },
      {
        title: 'Reprezentanții Avangardei',
        blocks: [
          {
            type: 'text',
            content: 'Figuri marcante ale avangardei românești și europene, organizate sistematic.'
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
                title: 'Tristan Tzara',
                subitems: [
                  'fondator al dadaismului',
                  'poet, eseist și teoretician al avangardei',
                  'manifeste revoluționare, experiment radical cu limbajul și structura textelor'
                ]
              },
              {
                title: 'Gelu Naum',
                subitems: [
                  'poet, prozator și dramaturg suprarealist român',
                  'abordează visul, absurdul și fantasticul',
                  'stil liber, experimental, cu imagini neașteptate',
                  'participă la mișcarea avangardistă și la reviste precum „unu”'
                ]
              },
              {
                title: 'Ion Vinea',
                subitems: [
                  'poet, prozator și publicist',
                  'promovează futurismul și expresionismul în România',
                  'activ în reviste de avangardă precum „Contimporanul”'
                ]
              },
              {
                title: 'Stefan Roll',
                subitems: [
                  'poet și prozator avangardist',
                  'experimentează forme noi de expresie poetică și vizuală'
                ]
              },
              {
                title: 'Marin Iancu și Sașa Pană',
                subitems: [
                  'scriitori și critici ai avangardei românești',
                  'participă la manifestări futuriste și dadaiste, promovează inovația artistică'
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
                title: 'Filippo Tommaso Marinetti',
                subitems: [
                  'fondator al futurismului italian',
                  'manifest futurist care promovează viteză, tehnologie și ruptură de trecut'
                ]
              },
              {
                title: 'Hugo Ball',
                subitems: [
                  'fondator al dadaismului la Zürich',
                  'experiment radical cu limbajul și performanța'
                ]
              },
              {
                title: 'André Breton',
                subitems: [
                  'teoretician și poet suprarealist francez',
                  'scrieri și manifeste pentru libertatea imaginarului și subconștientului'
                ]
              },
              {
                title: 'Paul Éluard',
                subitems: [
                  'poet suprarealist francez',
                  'explorează visul, iubirea, libertatea și simbolurile'
                ]
              },
              {
                title: 'Max Ernst',
                subitems: [
                  'pictor și poet dadaist și suprarealist german',
                  'experiment vizual și textual, tehnici noi în artă'
                ]
              },
            ]
          }
        ]
      }
      
    ]
  },
  {
    id: 'modernism',
    nume: 'Modernismul',
    interval: 'cca. 1900–1945',
    an: 1925,
    img: '/curente/modernismul.webp',
    glowColor: 'rgba(47, 79, 79, 0.85)',
    descriere: 'Modernismul caută originalitate, introspecție și structură controlată, modernizând estetica prin tehnici noi și viziune intelectualizată.',
    autori: [
      { nume: 'Tudor Arghezi', slug: 'arghezi', img: '/scriitori/tudor_arghezi.webp' },
      { nume: 'Lucian Blaga', slug: 'blaga', img: '/scriitori/lucian_blaga.webp' },
    ],
    sections: [
      {
        title: 'Ce este Modernismul?',
        blocks: [
          {
            type: 'text',
            content: 'Modernismul este un curent literar și artistic apărut în prima jumătate a secolului XX, ca reacție la tradițiile anterioare, dar cu mai mult echilibru decât avangarda. Modernismul pune accent pe inovație, reflecție intelectuală, analiza psihologică și socială, fără a respinge complet formele și tradițiile literare anterioare.'
          },
          {
            type: 'text',
            content: 'Curentul se caracterizează prin realism psihologic, tehnici narative moderne, explorarea interiorității personajelor, preocupări sociale și filozofice, dar și prin stiluri literare elaborate, muzicale sau inovatoare. Modernismul a influențat atât poezia, cât și proza și teatrul românesc.'
          },
          {
            type: 'list',
            intro: 'Caracteristici principale ale Modernismului:',
            items: [
              'Inovație moderată: păstrează unele tradiții, dar experimentează forme și tehnici noi.',
              'Realism psihologic și analiză interioară a personajelor.',
              'Explorarea problemelor sociale și a conflictelor individ-societate.',
              'Stil sobru, elegant, uneori muzical sau simbolic.',
              'Interes pentru condiția umană, moralitate și destin.',
              'Echilibru între subiectivism și obiectivitate, între lirism și analiză.',
              'Tehnici narative moderne: monolog interior, perspectivă multiplu narativă.'
            ]
          }
        ]
      },
      {
        title: 'Caracteristicile Modernismului',
        blocks: [
          {
            type: 'list',
            items: [
              {
                title: 'Analiză psihologică',
                description: 'Explorarea adâncurilor psihologice ale personajelor și motivațiilor lor.'
              },
              {
                title: 'Observație socială',
                description: 'Redarea conflictelor dintre individ și mediul social sau istoric.'
              },
              {
                title: 'Stil literar variat',
                description: 'Se folosesc tehnici narative moderne, monolog interior, simbolism moderat, muzicalitate.'
              },
              {
                title: 'Interes pentru interioritate',
                description: 'Se explorează emoțiile, gândurile și dilemele interioare ale personajelor.'
              },
              {
                title: 'Reflecție filozofică și morală',
                description: 'Teme: destin, libertate, responsabilitate, raportul individ-societate.'
              },
              {
                title: 'Inovație formală',
                description: 'Structuri narative flexibile, evitarea tiparelor clasice stricte.'
              },
              {
                title: 'Echilibru între tradiție și experiment',
                description: 'Se păstrează elemente ale realismului și simbolismului, dar cu perspective noi.'
              }
            ]
          }
        ]
      },
      {
        title: 'Reprezentanții Modernismului',
        blocks: [
          {
            type: 'text',
            content: 'Principalii autori ai modernismului românesc, organizați clar și sistematic.'
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
                title: 'Camil Petrescu',
                subitems: [
                  'romancier, dramaturg și eseist',
                  'realism psihologic profund, tehnică modernă a monologului interior',
                  'scrieri reprezentative: „Ultima noapte de dragoste, întâia noapte de război”, „Patul lui Procust”'
                ]
              },
              {
                title: 'Liviu Rebreanu',
                subitems: [
                  'roman realist și modernist',
                  'abordează conflicte sociale și psihologice',
                  'scrieri reprezentative: „Ion”, „Pădurea spânzuraților”, „Răscoala”'
                ]
              },
              {
                title: 'Tudor Arghezi',
                subitems: [
                  'poet și prozator modernist',
                  'stil inovator, ritm și sonoritate variate',
                  'teme: viața, societatea, condiția umană'
                ]
              },
              {
                title: 'Ion Barbu',
                subitems: [
                  'poet și matematician',
                  'poezie simbolistă și modernistă, complexă, cu muzicalitate și filozofie ascunsă',
                  'scrieri reprezentative: „Joc secund”, „Riga Crypto și Lapona Enigel”'
                ]
              },
              {
                title: 'Mircea Eliade',
                subitems: [
                  'scriitor și eseist',
                  'explorează timp, mit, simbol și destin',
                  'scrieri reprezentative: „Maitreyi”, nuvelistică și proză modernistă'
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
                title: 'James Joyce',
                subitems: [
                  'scriitor irlandez modernist',
                  'tehnica fluxului conștiinței, monolog interior',
                  'scrieri reprezentative: „Ulysses”, „Dubliners”'
                ]
              },
              {
                title: 'Marcel Proust',
                subitems: [
                  'scriitor francez modernist',
                  'analiză minuțioasă a timpului, memoriei și psihologiei',
                  'scrieri reprezentative: „În căutarea timpului pierdut”'
                ]
              },
              {
                title: 'Virginia Woolf',
                subitems: [
                  'scriitoare engleză modernistă',
                  'tehnică monolog interior, explorarea psihicului feminin',
                  'scrieri reprezentative: „Mrs. Dalloway”, „To the Lighthouse”'
                ]
              },
              {
                title: 'Franz Kafka',
                subitems: [
                  'scriitor ceh de limbă germană',
                  'absurd, alienare, dileme existențiale',
                  'scrieri reprezentative: „Procesul”, „Castelul”'
                ]
              }
            ]
          }
        ]
      }           
    ]
  },
  {
    id: 'modern-interbelic',
    nume: 'Modernismul interbelic',
    interval: 'cca. 1918–1945',
    an: 1918,
    img: '/curente/interbelic.webp',
    glowColor: 'rgba(139, 69, 19, 0.85)',
    descriere: 'Modernismul interbelic combină inovație formală, sincronizare europeană și experiment estetic, reflectând o perioadă de tranziție între două războaie mondiale. Modernism în poezie, Realism în proză.',
    autori: [
      { nume: 'Liviu Rebreanu', slug: 'rebreanu', img: '/scriitori/liviu_rebreanu_nou.webp' },
      { nume: 'George Călinescu', slug: 'calinescu', img: '/scriitori/george_calinescu.webp' },
      { nume: 'Mihail Sadoveanu', slug: 'sadoveanu', img: '/scriitori/mihail-sadoveanu-3.webp' },
      { nume: 'Camil Petrescu', slug: 'petrescu', img: '/scriitori/camil_rezerva.webp' },
    ],
    sections: [
      {
        title: 'Modernismul târziu în România',
        blocks: [
          {
            type: 'text',
            content: 'Modernismul târziu românesc se dezvoltă în perioada interbelică, după anii 1920-1930, fiind caracterizat printr-o sinteză între inovație formală, introspecție psihologică și preocupări sociale. Este o perioadă în care scriitorii experimentează tehnici narative avansate, simbolism, influențe avangardiste, dar rămân ancorați în realitățile sociale și psihologice ale timpului.'
          },
          {
            type: 'text',
            content: 'Acest curent combină realismul psihologic, analiza socială și simbolismul, creând opere complexe, adesea introspective, cu personaje profund conturate și teme legate de identitate, destin, alienare și conflictul individ-societate.'
          },
          {
            type: 'list',
            intro: 'Caracteristicile Modernismului târziu:',
            items: [
              'Integrarea influențelor simboliste și avangardiste în proză și poezie.',
              'Realism psihologic profund, introspecție și analiza motivațiilor interioare ale personajelor.',
              'Teme sociale și existențiale: alienare, destin, conflict individ-societate.',
              'Stil literar elaborat, muzical și sugestiv, cu tehnici narative complexe.',
              'Echilibru între inovație formală și tradiție literară.',
              'Interes pentru condiția umană și explorarea psihicului.',
              'Expresie intelectuală și filozofică mai accentuată decât în modernismul clasic.'
            ]
          }
        ]
      },
      {
        title: 'Reprezentanții Modernismului târziu',
        blocks: [
          {
            type: 'text',
            content: 'Autori importanți ai modernismului târziu românesc, organizați sistematic.'
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
                title: 'G. Călinescu',
                subitems: [
                  'critic, eseist, romancier',
                  'integrează analiza socială și psihologică cu reflecții literare și istorice',
                  'scrieri: eseuri și romane cu influențe moderniste târzii'
                ]
              }
            ]
          },
        ]
      }
      
    ]
  },
  {
    id: 'traditionalism',
    nume: 'Traditionalismul',
    interval: 'cca. 1920–1940',
    an: 1944,
    img: '/curente/traditionalismul.webp',
    glowColor: 'rgba(34, 139, 34, 0.85)',
    descriere: 'Traditionalismul valorizează satul, natura, spiritualitatea și continuitatea culturală, idealizând rădăcinile identității românești. Poezie.',
    autori: [
      { nume: 'Tudor Arghezi', slug: 'arghezi', img: '/scriitori/tudor_arghezi.webp' },
      { nume: 'Lucian Blaga', slug: 'blaga', img: '/scriitori/lucian_blaga.webp' },
      { nume: 'Ion Barbu', slug: 'barbu', img: '/scriitori/barbu_ion.webp' },
    ],
    sections: [
      {
        title: 'Ce este Tradiționalismul?',
        blocks: [
          {
            type: 'text',
            content: 'Tradiționalismul românesc este un curent literar și ideologic apărut la sfârșitul secolului XIX și începutul secolului XX, care pune accent pe valorile tradiționale, viața rurală, folclorul și spiritualitatea poporului român. Acesta se constituie ca reacție împotriva modernismului și a influențelor occidentale, promovând conservatorism cultural și moral.'
          },
          {
            type: 'text',
            content: 'Tradiționalismul se manifestă în literatură prin atenție la mediul rural, viața țăranului, obiceiurile și credințele populare, printr-un limbaj simplu și autentic, dar cu valoare estetică și morală. Curentul a fost reprezentat prin reviste literare, articole, eseuri și creații poetice sau prozastice.'
          },
          {
            type: 'list',
            intro: 'Caracteristici principale ale Tradiționalismului:',
            items: [
              'Valorizarea vieții rurale și a satului românesc.',
              'Interes pentru folclor, tradiții și obiceiuri populare.',
              'Conservatorism cultural și moral: păstrarea valorilor naționale.',
              'Limbaj simplu, autentic, accesibil și sugestiv.',
              'Critică la adresa modernismului și a influențelor străine.',
              'Accent pe legătura dintre om, natură și comunitate.',
              'Preocupare pentru identitatea națională și continuitatea spirituală.'
            ]
          }
        ]
      },
      {
        title: 'Caracteristicile Tradiționalismului',
        blocks: [
          {
            type: 'list',
            items: [
              {
                title: 'Viața rurală',
                description: 'Satul, țăranul și obiceiurile sunt centrale, reflectând valori autentice și morale.'
              },
              {
                title: 'Folclor și tradiții',
                description: 'Culegerea și valorificarea poveștilor, datinilor, poeziei populare și a limbajului popular.'
              },
              {
                title: 'Conservatorism moral',
                description: 'Promovarea virtuților tradiționale, a credinței și a solidarității comunitare.'
              },
              {
                title: 'Limbaj autentic',
                description: 'Stil simplu, accesibil, dar estetic și sugestiv, inspirat din viața satului.'
              },
              {
                title: 'Critică la modernism',
                description: 'Se respinge excesele urbanizării, influențele occidentale și literatura „artificială”.'
              },
              {
                title: 'Identitate națională',
                description: 'Se pune accent pe origini, istorie, simboluri și valori românești.'
              },
              {
                title: 'Legătura om-natură-comunitate',
                description: 'Literatura reflectă armonia între om, mediul natural și viața colectivă.'
              }
            ]
          }
        ]
      },
      {
        title: 'Reprezentanții Tradiționalismului',
        blocks: [
          {
            type: 'text',
            content: 'Principalii autori ai tradiționalismului românesc, organizați clar și sistematic.'
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
                title: 'Mihail Sadoveanu',
                subitems: [
                  'romancier și nuvelist',
                  'teme: viața satului, natură, istorie, tradiții românești',
                  'stil narativ bogat, evocator, realist-tradiționalist',
                  'scrieri reprezentative: „Baltagul”, „Hanul Ancuței”, „Creanga de aur”'
                ]
              },
              {
                title: 'Nicolae Iorga',
                subitems: [
                  'istoric, eseist și publicist',
                  'promovează valorile tradiționale și patriotismul',
                  'a contribuit la ideologia Sămănătorismului și la studiul istoriei culturale'
                ]
              },
              {
                title: 'Alexandru Vlahuță',
                subitems: [
                  'scriitor și publicist',
                  'teme: viața rurală, natură, folclor',
                  'scrieri reprezentative: „România pitorească”, articole și nuvele'
                ]
              },
              {
                title: 'Ion Agârbiceanu',
                subitems: [
                  'proza și dramaturgia inspirată din viața satului',
                  'teme: religie, moralitate, conflict interior al țăranului',
                  'scrieri reprezentative: „Fefeleaga”, „Arhanghelii”'
                ]
              },
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
                title: 'Thomas Hardy',
                subitems: [
                  'scriitor și poet englez',
                  'teme: satul, tradiții, conflictul individ-societate',
                  'scrieri reprezentative: „Tess of the d’Urbervilles”, „The Mayor of Casterbridge”'
                ]
              },
            ]
          }
        ]
      }      
    ]
  },
  {
    id: 'postbelic',
    nume: 'Perioada postbelică',
    interval: '1945–1989',
    an: 1965,
    img: '/curente/postbelic.webp',
    glowColor: 'rgba(105, 105, 105, 0.85)',
    descriere: 'Literatura postbelică reflectă condiția umană marcată de traume istorice, restricții ideologice și căutări existențiale, diversificând stilurile și temele. Perioada postbelică / postmodernistă.',
    autori: [
      { nume: 'Marin Sorescu', slug: 'sorescu', img: '/scriitori/marin_sorescu.webp' },
      { nume: 'Nichita Stănescu', slug: 'stanescu', img: '/scriitori/nichita_stanescu_rezerva.webp' },
      { nume: 'Marin Preda', slug: 'preda', img: '/scriitori/marin_preda.webp' },
    ],
    sections: [
      {
        title: 'Literatura română postbelică',
        blocks: [
          {
            type: 'text',
            content: 'Perioada postbelică în literatura română, după 1945, este marcată de influența regimului comunist, dar și de o evoluție literară care cuprinde realism socialist, proză și poezie angajată, precum și apariția curentelor independente și experimentale mai târziu.'
          },
          {
            type: 'text',
            content: 'Această perioadă poate fi împărțită în mai multe etape: realismul socialist din primii ani postbelici, literatura angajată politic și social, apoi relaxarea cenzurii și apariția avangardei târzii și a modernismului românesc contemporan.'
          },
          {
            type: 'list',
            intro: 'Caracteristici principale ale literaturii postbelice:',
            items: [
              'Realism socialist (anii 1945–1965): promovarea ideologiei comuniste, glorificarea muncii, a colectivului și a „omului nou”.',
              'Poezia și proza angajată politic: teme sociale, patriotice, muncitorești.',
              'Restricții și cenzură: controlul ideologic asupra creației literare.',
              'Apariția curentelor independente după anii ’60: modernism, postmodernism, avangardă târzie.',
              'Explorarea subiectivității și introspecției în operele mai târzii.',
              'Diversitate stilistică: realism, experiment narativ, lirism, simbolism modern.',
              'Teme recurente: conflictul individ-societate, memoria colectivă, trauma războiului, constrângeri ideologice.'
            ]
          }
        ]
      },
      {
        title: 'Reprezentanții literaturii postbelice',
        blocks: [
          {
            type: 'text',
            content: 'Principalii autori ai literaturii postbelice românești, organizați clar și sistematic.'
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
                title: 'Marin Preda',
                subitems: [
                  'romancier realist și angajat social',
                  'teme: satul, orașul, conflicte sociale, destinul individului',
                  'scrieri reprezentative: „Moromeții”, „Cel mai iubit dintre pământeni”'
                ]
              },
              {
                title: 'Camil Petrescu (ultima perioadă)',
                subitems: [
                  'realism psihologic, introspecție',
                  'teme: relații interumane, conflict interior, destin',
                  'scrieri reprezentative: „Patul lui Procust” (adaptări ulterioare)'
                ]
              },
              {
                title: 'Geo Bogza',
                subitems: [
                  'poet, prozator și jurnalist',
                  'teme: sat, oraș, social, jurnalism narativ',
                  'scrieri reprezentative: reportaje și eseuri social-documentare'
                ]
              },
              {
                title: 'Nichita Stănescu',
                subitems: [
                  'poet modernist și simbolist târziu',
                  'teme: condiția umană, lirism, expresie personală',
                  'scrieri reprezentative: „Oul și sfera”, „Necuvintele”'
                ]
              },
              {
                title: 'Marin Sorescu',
                subitems: [
                  'poet, dramaturg și prozator',
                  'stil liric, umor, ironie, simbolism modern',
                  'scrieri reprezentative: „La Lilieci”, „Iona”'
                ]
              },
              {
                title: 'Mircea Dinescu',
                subitems: [
                  'poet și eseist angajat',
                  'critică socială, ironie, umor',
                  'scrieri reprezentative: poezie și articole de presă'
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
                title: 'Albert Camus',
                subitems: [
                  'scriitor și filozof francez',
                  'teme: absurd, condiția umană, libertate și responsabilitate',
                  'scrieri reprezentative: „Străinul”, „Ciuma”'
                ]
              },
              {
                title: 'Jean-Paul Sartre',
                subitems: [
                  'filozof și scriitor francez',
                  'existențialism, libertate, responsabilitate, angajament social',
                  'scrieri reprezentative: „Nașterea tragediei”, „Existența și nimicul”'
                ]
              },
              {
                title: 'Samuel Beckett',
                subitems: [
                  'scriitor irlandez, dramaturg și romancier',
                  'absurd, alienare, teme existențiale',
                  'scrieri reprezentative: „Așteptându-l pe Godot”, „Molloy”'
                ]
              }
            ]
          }
        ]
      }      
    ]
  },
  {
    id: 'neomodernism',
    nume: 'Neomodernismul',
    interval: 'cca. 1960–1980',
    an: 1970,
    img: '/curente/neomodernismul.webp',
    glowColor: 'rgba(70, 130, 180, 0.85)',
    descriere: 'Literatura postbelică reflectă condiția umană marcată de traume istorice, restricții ideologice și căutări existențiale, diversificând stilurile și temele.',
    autori: [],
    sections: [
      {
        title: 'Ce este Neomodernismul?',
        blocks: [
          {
            type: 'text',
            content: 'Neomodernismul reprezintă direcția literară contemporană care reia principiile modernismului și le adaptează lumii postcomuniste și societății globale. Curentul se dezvoltă în anii ’80–’90 și continuă până în prezent, valorizând inovația stilistică, reflexivitatea și analiza complexă a individului în raport cu societatea.'
          },
          {
            type: 'text',
            content: 'Acest curent combină realismul psihologic, experimentul formal și teme contemporane precum identitatea, globalizarea, trauma post-totalitară, alienarea, memoriile colective și introspecția profundă. Neomodernismul românesc se remarcă prin libertate estetică, pluralism de genuri și abordări, precum și prin stiluri sofisticate și rafinate.'
          },
          {
            type: 'list',
            intro: 'Caracteristici principale ale Neomodernismului:',
            items: [
              'Reflexivitate și introspecție: explorarea identității și a trăirilor interioare.',
              'Experiment formal și stilistic: combinarea genurilor, limbaj modern și inovator.',
              'Teme contemporane: postcomunism, globalizare, alienare, traume sociale și istorice.',
              'Pluralism estetic: coexistă realism, simbolism, lirism și postmodernism.',
              'Analiză psihologică și socială profundă.',
              'Libertate artistică și independență față de normele instituționale.',
              'Interes pentru memoria colectivă și reconstrucția istorică prin literatură.'
            ]
          }
        ]
      },
      {
        title: 'Caracteristicile Neomodernismului',
        blocks: [
          {
            type: 'list',
            items: [
              {
                title: 'Explorarea identității',
                description: 'Autorii analizează problemele identității personale și sociale, raportul individ-societate.'
              },
              {
                title: 'Experiment stilistic',
                description: 'Se utilizează tehnici noi de narațiune, poezie și eseu, combinarea registrelor și limbajelor.'
              },
              {
                title: 'Teme sociale și politice',
                description: 'Se tratează consecințele comunismului, transformările societale și fenomenele globale.'
              },
              {
                title: 'Libertate estetică',
                description: 'Autorii explorează orice formă literară, fără constrângeri ideologice sau estetice.'
              },
              {
                title: 'Intertextualitate și metatext',
                description: 'Referințe la literatura trecută, dialog cu modernismul, simbolismul și realismul clasic.'
              },
              {
                title: 'Psihologie și introspecție',
                description: 'Accent pe trăirile și conflictele interioare ale personajelor sau ale naratorului.'
              },
              {
                title: 'Pluralism și diversitate',
                description: 'Coexistă mai multe tendințe și stiluri: realism, lirism, experimentalism și postmodernism.'
              }
            ]
          }
        ]
      },
      {
        title: 'Reprezentanții Neomodernismului',
        blocks: [
          {
            type: 'text',
            content: 'Principalii autori ai neomodernismului românesc, organizați clar și sistematic.'
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
                title: 'Mircea Cărtărescu',
                subitems: [
                  'poet, prozator și eseist contemporan',
                  'stil liric, baroc, complex, combinație între realism, fantastic și introspecție',
                  'scrieri reprezentative: „Orbitor” (trilogie), poezie, eseuri'
                ]
              },
              {
                title: 'Norman Manea',
                subitems: [
                  'proza și eseistica centrate pe experiența postcomunistă și traumele totalitarismului',
                  'teme: exil, memorie, identitate și istorie',
                  'scrieri reprezentative: „Întoarcerea huliganului”, „Viața ca o pradă”'
                ]
              },
              {
                title: 'Gabriel Liiceanu',
                subitems: [
                  'eseist și filosof',
                  'scrieri critice, reflexive și morale, legate de cultură și identitate românească',
                  'scrieri reprezentative: „Jurnalul de la Păltiniș”'
                ]
              },
              {
                title: 'Ana Blandiana',
                subitems: [
                  'poetă și eseistă',
                  'teme: libertate, memorie, condiția umană, postcomunism',
                  'scrieri reprezentative: poezie și eseuri publicate după 1980'
                ]
              },
              {
                title: 'Ioan Groșan',
                subitems: [
                  'proza realistă cu accente moderniste',
                  'teme: satul, transformări sociale și culturale, ironie și umor',
                  'scrieri reprezentative: romane și nuvele postbelice'
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
                title: 'Umberto Eco',
                subitems: [
                  'scriitor și semiotician italian',
                  'teme: memorie, simbol, cultura contemporană',
                  'scrieri reprezentative: „Numele trandafirului”, „Pendulul lui Foucault”'
                ]
              },
              {
                title: 'Orhan Pamuk',
                subitems: [
                  'scriitor turc contemporan',
                  'teme: identitate, memorie, modernitate și tradiție',
                  'scrieri reprezentative: „Numele meu este Roșu”, „Istanbul”'
                ]
              },
              {
                title: 'Haruki Murakami',
                subitems: [
                  'scriitor japonez contemporan cu influențe neomoderniste',
                  'teme: alienare, memorie, realism magic și introspecție',
                  'scrieri reprezentative: „Norwegian Wood”, „Kafka pe malul mării”'
                ]
              }
            ]
          }
        ]
      }      
    ]
  },
  {
    id: 'postmodernism',
    nume: 'Postmodernismul',
    interval: 'cca. 1980–prezent',
    an: 1990,
    img: '/curente/postmodernismul.webp',
    glowColor: 'rgba(255, 105, 180, 0.85)',
    descriere: 'Postmodernismul combină ludicul, ironia și intertextualitatea într-o literatură liberă, fragmentară și reflexivă, care reinterpretează tradiția.',
    autori: [],
    sections: [
      {
        title: 'Ce este Postmodernismul?',
        blocks: [
          {
            type: 'text',
            content: 'Postmodernismul literar apare în România în a doua jumătate a secolului XX, ca reacție la modernism și la realismul tradițional. Curentul se caracterizează prin pluralism estetic, intertextualitate, ludicitate, relativism și experiment stilistic. Postmodernismul valorizează creativitatea individuală și libertatea expresivă, explorând teme precum identitatea, memoria, cultura și relația autor-text-cititor.'
          },
          {
            type: 'text',
            content: 'Postmodernismul include proza, poezia și teatrul, adesea cu ironie, autoironie și metaficțiune. Curentul utilizează citate, parodii, pastiche-uri, tehnici fragmentare și jocuri lingvistice, evidențiind relativitatea adevărului și a realității.'
          },
          {
            type: 'list',
            intro: 'Caracteristici principale ale Postmodernismului:',
            items: [
              'Pluralism estetic și stilistic: coexistă mai multe genuri și tehnici.',
              'Intertextualitate: referințe la opere literare anterioare și cultură generală.',
              'Fragmentare narativă și ludicitate: structuri neconvenționale, jocuri de limbaj.',
              'Ironie, pastiche și parodie: critică și reinterpretare a tradiției.',
              'Explorarea identității și memoriei: teme personale și sociale.',
              'Autoreferențialitate: reflecție asupra actului artistic și a literaturii.',
              'Libertate creativă și nonconformism față de reguli rigide.'
            ]
          }
        ]
      },
      {
        title: 'Caracteristicile Postmodernismului',
        blocks: [
          {
            type: 'list',
            items: [
              {
                title: 'Pluralism și experiment',
                description: 'Se combină stiluri, genuri și tehnici diferite, adesea inovatoare și ludice.'
              },
              {
                title: 'Intertextualitate',
                description: 'Textele fac referințe la alte opere literare, mituri și cultura populară.'
              },
              {
                title: 'Ironie și autoironie',
                description: 'Autorii folosesc umor, parodie și pastiche pentru a comenta tradiția și realitatea.'
              },
              {
                title: 'Fragmentare și non-linearitate',
                description: 'Structuri narative neconvenționale, deseori episodice și multiplicate în perspective.'
              },
              {
                title: 'Autoreferențialitate',
                description: 'Textele reflectă asupra propriului act creator și asupra relației cu cititorul.'
              },
              {
                title: 'Teme contemporane',
                description: 'Identitate, cultură, memorie colectivă și individuală, relația individ-societate.'
              }
            ]
          }
        ]
      },
      {
        title: 'Reprezentanții Postmodernismului',
        blocks: [
          {
            type: 'text',
            content: 'Principalii autori ai postmodernismului românesc, organizați clar și sistematic.'
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
                title: 'Nichita Stănescu',
                subitems: [
                  'poet cu lirism inovator și expresionism metaforic',
                  'explorează limitele limbajului și experiența umană',
                  'scrieri reprezentative: „Oul și sfera”, „Necuvintele”'
                ]
              },
              {
                title: 'Marin Sorescu',
                subitems: [
                  'poet, dramaturg și prozator',
                  'stil ironic, ludic, cu simbolism și parodie',
                  'scrieri reprezentative: „La Lilieci”, „Iona”'
                ]
              },
              {
                title: 'Mircea Cărtărescu',
                subitems: [
                  'proza și poezia postmodernă',
                  'teme: memorie, identitate, fantastic și autoironie',
                  'scrieri reprezentative: „Orbitor” (trilogie)'
                ]
              },
              {
                title: 'Dumitru Țepeneag',
                subitems: [
                  'proza experimentală și ludică',
                  'teme: identitate, absurd, alienare',
                  'scrieri reprezentative: romane și nuvele postmoderne'
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
                title: 'Umberto Eco',
                subitems: [
                  'scriitor și semiotician italian',
                  'teme: intertextualitate, jocuri simbolice, metaficțiune',
                  'scrieri reprezentative: „Numele trandafirului”, „Pendulul lui Foucault”'
                ]
              },
              {
                title: 'Italo Calvino',
                subitems: [
                  'scriitor italian postmodernist',
                  'stil ludic, fabulistic, experiment narativ',
                  'scrieri reprezentative: „Cosmicomics”, „Orașele invizibile”'
                ]
              },
              {
                title: 'Thomas Pynchon',
                subitems: [
                  'scriitor american postmodernist',
                  'teme: conspirație, memorie, tehnologie, ironie',
                  'scrieri reprezentative: „V.”, „Gravity’s Rainbow”'
                ]
              }
            ]
          }
        ]
      }      
    ]
  },
];

export const curenteById = CURENTE.reduce((acc, c) => { acc[c.id] = c; return acc; }, {});
export default CURENTE;



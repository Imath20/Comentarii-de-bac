// Detalii detaliate despre opere, extrase din `Opera.jsx`
// Exportate separat pentru a fi reutilizate și pentru a menține componenta mai curată.

export const OPERA_DETAILS = {
  'ion': {
    titlu: 'Ion',
    autor: 'Liviu Rebreanu',
    data: '1920',
    categorie: 'roman',
    canonic: true,
    descriere: 'Roman realist despre un țăran care își dorește cu orice preț pământ.',
    teme: ['setea de avere', 'iubirea', 'conflictul individului cu societatea'],
    personaje: ['Ion al Glanetașului', 'Ana', 'Vasile Baciu', 'Florica', 'George', 'Familia Herdelea'],
    analiza: 'Romanul explorează tema iubirii pentru pământ ca forță motrice a existenței umane. Ion Glanetasu este un personaj complex, dominat de dorința de a avea pământ, care îl determină să facă alegeri care îi schimbă viața.',
    citate: [
      '"Cât pământ, Doamne!..."',
      '"Pământul îi era drag ca ochii din cap."',
      '"Trebuie să aibă pământ mult, trebuie!"'
    ],
    titluSection: {
      descriere: 'Titlul romanului îl fixează pe Ion drept exponent al unei clase sociale și devine un semnal că totul gravitează în jurul setei individuale de ascensiune.',
      puncte: [
        'Prenumele comun sugerează tipologia – Ion devine un arhetip al țăranului din Ardeal.',
        'Lipsa unui nume de familie în titlu anulează diferențele dintre individ și colectiv, făcând din destinul său o lecție socială.',
        'Titlul contrastează cu aspiratia personajului: un nume banal pentru o ambiție nelimitată.'
      ]
    },
    simboluriSection: {
      descriere: 'Simbolistica romanului accentuează obsesia pentru pământ și echilibrul precar dintre iubire și avere.',
      simboluri: [
        {
          nume: 'Pământul',
          explicatie: 'Reprezintă puterea socială și statutul; Ion îl iubește ca pe o ființă vie, iar lupta pentru posesie îl dezumanizează.'
        },
        {
          nume: 'Hotarul',
          explicatie: 'Delimitarea pământului devine linia de demarcație între fericire și marginalitate, dar și cauza conflictului cu Vasile Baciu.'
        },
        {
          nume: 'Cununia forțată',
          explicatie: 'Ceremonia cu Ana simbolizează sacrificiul sentimentelor în fața interesului material.'
        }
      ]
    }
  },
  'luceafarul': {
    titlu: 'Luceafărul',
    autor: 'Mihai Eminescu',
    data: '1883',
    categorie: 'poezie',
    canonic: true,
    descriere: 'Poem filozofic și romantic despre iubirea imposibilă dintre Hyperion și Cătălina.',
    teme: ['condiția geniului', 'iubirea', 'aspirația spre absolut'],
    personaje: ['Hyperion (Luceafărul)', 'Cătălina', 'Cătălin', 'Demiurgul'],
    analiza: 'Poezia explorează tema dragostei imposibile între nemurire și murire. Luceafărul este personificarea idealului artistic și filosofic, iar fata reprezintă frumusețea efemeră a lumii pământești.',
    citate: [
      '"A fost odată ca \'n povești, / A fost ca niciodată"',
      '"Cobori în jos, luceafăr blând, / Alunecând pe-o rază"',
      '"O, ești frumos, cum numa \'n vis / Un înger se arată"'
    ],
    titluSection: {
      descriere: 'Titlul poemului aduce în prim-plan o figură astrală care devine emblemă a geniului romantic, punând în contrast eternitatea cu condiția umană.',
      puncte: [
        'Luceafărul este atât astrul călăuzitor, cât și alter-egoul lui Hyperion – semn că lumina și cunoașterea vin cu prețul singurătății.',
        'Cuvântul popular „luceafăr” păstrează tonalitatea de basm, dar Eminescu îl încarcă cu sens metafizic.',
        'Titlul anunță că focusul cade pe perspectiva geniului, nu pe povestea iubirii dintre Cătălina și Cătălin.'
      ]
    },
    simboluriSection: {
      descriere: 'Fiecare element esențial al poemului capătă valoare simbolică și trasează opoziția dintre absolut și contingent.',
      simboluri: [
        {
          nume: 'Hyperion/Luceafărul',
          explicatie: 'Simbol al geniului, al cunoașterii lucide și al imposibilității de a coborî la nivelul comun.'
        },
        {
          nume: 'Cătălina',
          explicatie: 'Figura muritoare a dorinței de fericire imediată; simbolizează lumea sensibilă și constrângerile ei.'
        },
        {
          nume: 'Marea și cerul',
          explicatie: 'Spații ale infinitului și ale misterului; trasează verticala dintre muritor și nemuritor.'
        },
        {
          nume: 'Demiurgul',
          explicatie: 'Reprezintă legea universală care interzice schimbarea ordinii cosmice și păstrează distanța dintre planuri.'
        }
      ]
    },
    rezumat:
    {
      incipit: {
        sectiuni: [
          {
            subtitlu: "Cadrul și atmosfera de basm cosmic",
            text: "Poemul începe cu formula tradițională, creând o atmosferă de basm fantastic și mit cosmic. Este introdusă Cătălina, o 'prea frumoasă fată' din neam împărătesc, singură la părinți.",
            versuri: [
              "A fost odată ca 'n povești,",
              "A fost ca niciodată"
            ]
          },
          {
            subtitlu: "Ritualul nocturn și nașterea iubirii",
            text: "În fiecare seară, tânăra prințesă se îndreaptă la fereastră și privește cerul, fiind fascinată de un Luceafăr care strălucește deasupra mării. Privirea ei melancolică devine un ritual nocturn:",
            versuri: [
              "Îl vede azi, îl vede mâni"
            ]
          },
          {
            subtitlu: "Iubirea la distanță",
            text: "Luceafărul, la rândul său, o observă pe fată, iar razele sale pătrund în camera prințesei, țesând și mângâindu-i trupu-ntinsă în pat. Este o iubire la distanță, imposibilă prin natura esențială a celor doi îndrăgostiți: Luceafărul este veșnic, Cătălina este muritoare.",
            versuri: [
              "O mreajă de văpaie"
            ]
          }
        ]
      },
      intriga: {
        sectiuni: [
          {
            subtitlu: "Conflictul central și prima chemare",
            text: "Conflictul central se conturează rapid: o iubire imposibilă între două ființe de naturi diferite. Cătălina, în somn, oftează și îl cheamă pe luceafăr să coboare la ea:",
            versuri: [
              "Cobori în jos, luceafăr blând,",
              "Alunecînd pe-o rază"
            ]
          },
          {
            subtitlu: "Prima coborâre și primul refuz (Forma acvatică)",
            text: "Hyperion (numele cosmic al luceafărului) ascultă chemarea și se aruncă fulgerător în mare, din adâncurile căreia renaște sub forma unui tânăr voievod cu 'păr de aur moale' și 'giulgi vânăt pe umeri' - un mort frumos cu ochii vii. El îi propune fetei să-l urmeze în palatele de mărgean, dar Cătălina refuză, speriată de frumusețea lui supra-omenească, spunându-i că este:",
            versuri: [
              "străin la vorbă şi la port"
            ]
          },
          {
            subtitlu: "A doua coborâre și al doilea refuz (Forma aeriană)",
            text: "După trei zile, Cătălina simte din nou dorul și repetă invocația. Hyperion coboară într-o manifestare și mai spectaculoasă: cerul și marea ard, iar din vâltoarea cosmică se naște un chip măreț, cu coroana de foc pe cap, 'scăldat în foc de soare' - un demon frumos. El îi explică originea sa cosmică, dar Cătălina refuză din nou:",
            versuri: [
              "Mă dor de crudul tău amor",
              "A pieptului meu coarde"
            ]
          }
        ]
      },
      desfasurarea: {
        sectiuni: [
          {
            subtitlu: "Marea provocare: Schimbul imposibil",
            text: "Înțelegând prăpastia ontologică, Cătălina, cu pragmatism, îi propune soluția. Hyperion, orbit de dragoste, acceptă schimbul imposibil și se hotărăște să meargă la Domnul lumii să ceară moartea – singura cale de a deveni muritor.",
            versuri: [
              "Eu sunt nemuritor,",
              "Şi tu eşti muritoare?",
              "Tu te coboară pe pământ,",
              "Fii muritor ca mine."
            ]
          },
          {
            subtitlu: "Călătoria cosmică și rugăciunea",
            text: "Începe călătoria grandioasă a lui Hyperion prin haosul primordial, străbătând în clipe drumuri de mii de ani, văzând lumi stingându-se. El ajunge până la marginea existenței, în 'adâncul întunecat', unde se roagă Demiurgului. El cere să fie dezlegat de 'greul negrei vecinicii' în schimbul unei 'ore de iubire'.",
            versuri: [
              "Te rog în mânǎ de pǎmânt",
              "Fiinţa mea o schimbǎ"
            ]
          },
          {
            subtitlu: "Intriga paralelă: Cătălina și Cătălin",
            text: "În timp ce Hyperion face călătoria cosmică, pe pământ se desfășoară o scenă paralelă. Cătălin, 'viclean copil de casă', un paj tânăr și 'îndrăsneţ cu ochii', o curtează pe Cătălina. El este opusul lui Hyperion: pământesc, simplu, direct. Cătălin îi explică pas cu pas ce înseamnă dragostea pământească. Cătălina, deși încă visează la luceafăr, recunoaște că el este un ideal inaccesibil:",
            versuri: [
              "Din bob în bob amorul",
              "În veci îl voi iubi şi 'n veci",
              "Va rămânea departe…"
            ]
          },
          {
            subtitlu: "Seducția și acceptarea relativului",
            text: "Cătălin o strânge la piept. Scena este plină de sensibilitate. Cătălina, deși încă speră la un noroc care să o lumineze, acceptă propunerea lui Cătălin de a fugi împreună în lume, renunțând la 'visul de luceferi'.",
            versuri: [
              "Şi ruşinos şi drăgălaş,",
              "Mai nu vrea, mai se lasă."
            ]
          }
        ]
      },
      punctulCulminant: {
        sectiuni: [
          {
            subtitlu: "Dialogul cu Demiurgul: Refuzul ontologic",
            text: "Punctul culminant este dialogul cosmic. Demiurgul îl numește pe Hyperion cu numele său cosmic. Răspunsul Demiurgului este un refuz categoric, argumentat filosofic. Hyperion nu poate muri pentru că este o forță cosmică fundamentală, parte din esența divină.",
            versuri: [
              "isvor de vremi",
              "Şi 'ntregitor de spaţiu",
              "Cine nu are moarte 'n el,",
              "Acela nu mai moare.",
              "lumină din lumină",
              "Tu din eternul meu întreg",
              "Rǎmâi a treia parte"
            ]
          },
          {
            subtitlu: "Filosofia ciclicității și a vanității umane",
            text: "Demiurgul expune o viziune despre eternitatea și ciclicitatea universului și despre vanitatea aspirațiilor umane. El îi oferă lui Hyperion alternative grandioase (să fie Buddha, Plato, cuceritor), dar toate exclud moartea:",
            versuri: [
              "Când valuri află un mormânt,",
              "Răsar în urmă valuri",
              "Dar piară oamenii cu toţi,",
              "S'ar naşte iarăşi oameni",
              "Dar moartea nu se poate…"
            ]
          },
          {
            subtitlu: "Întrebarea decisivă",
            text: "Demiurgul îl trimite pe Hyperion înapoi, punând întrebarea crucială care va duce la deznodământ:",
            versuri: [
              "Şi pentru cine vrei să mori?",
              "Întoarce-te, te 'ndreaptă",
              "Spre-acel pământ rătăcitori",
              "Şi vezi ce te aşteaptă"
            ]
          }
        ]
      },
      deznodamant: {
        sectiuni: [
          {
            subtitlu: "Întoarcerea lui Hyperion și scena finală",
            text: "Hyperion se întoarce în locul său menit din ceruri. Sub teii mândri șed 'doi tineri singuri' – Cătălina și Cătălin, îmbrățișați.",
            versuri: [
              "ca şi 'n ziua cea de ieri,",
              "Lumina şi-o revarsă",
              "doi tineri singuri",
              "vedea de sus",
              "Uimirea-n a lor faţă"
            ]
          },
          {
            subtitlu: "Ultima invocație și sentința cosmică",
            text: "Cătălina, 'îmbătată de amor', ridică ochii spre cer, vede luceafărul și, inocent, repetă invocația. Hyperion nu mai coboară, iar replica sa finală este sentința filosofică a întregului poem.",
            versuri: [
              "Cobori în jos, luceafăr blând,",
              "Alunecând pe-o rază,",
              "Pătrunde-n codru şi în gând,",
              "Norocu-mi luminează!"
            ]
          },
          {
            subtitlu: "Detașarea geniului și prețul nemuririi",
            text: "Replica finală exprimă detașarea supremă a geniului. Poemul se încheie cu proclamarea singurătății lucide a spiritului superior, în contrast cu fericirea trecătoare a omului comun.",
            versuri: [
              "Ce-ţi pasă ţie, chip de lut,",
              "Dac'oi fi eu sau altul?",
              "Trăind în cercul vostru strîmt",
              "Norocul vă petrece,",
              "Ci eu în lumea mea mă simt",
              "Nemuritor şi rece."
            ]
          }
        ]
      }
    }
  },
  'moara-cu-noroc': {
  titlu: 'Moara cu noroc',
  autor: 'Ioan Slavici',
  data: '1881',
  categorie: 'nuvelă',
  canonic: true,
  descriere: 'Nuvelă realist-psihologică și moralizatoare care urmărește degradarea unui om simplu sub influența banilor, fricii și dorinței de putere. Textul surprinde conflictul dintre aspirația spre îmbogățire și nevoia de a păstra echilibrul moral, subliniind importanța mediului și a caracterului în definirea destinului.',
  teme: [
    'conflictul dintre avere și moralitate',
    'influența mediului asupra individului',
    'puterea distrugătoare a lăcomiei',
    'destinul și responsabilitatea personală',
    'dezintegrarea familială',
    'coruperea sufletului'
  ],
  personaje: [
    'Ghiță',
    'Ana',
    'Lica Sămădăul',
    'bătrâna',
    'Pintea'
  ],
  personajeDetalii: {
    Ghiță: 'Protagonistul nuvelei, inițial om cinstit și harnic, care dorește să ofere familiei o viață mai bună. Presiunea banilor și influența lui Lică îl împing spre frică, compromisuri morale și, în final, autodistrugere. Evoluția lui este emblematică pentru omul slab în fața ispitelor.',
    Ana: 'Soția lui Ghiță, simbol al inocenței și al echilibrului familial. Observă degradarea morală a soțului, dar rămâne alături de el. Relația cu Lică o vulnerabilizează și contribuie la tragedia finală.',
    'Lica Sămădăul': 'Antagonistul nuvelei, personaj carismatic, inteligent și periculos. Domină psihologic pe cei din jur, manipulează, amenință și corupe. Reprezintă răul activ, un om fără limite morale.',
    bătrâna: 'Mama Anei, simbol al înțelepciunii tradiționale. Avertizează asupra pericolelor lăcomiei („Omul să fie mulțumit cu sărăcia sa”), funcționând ca voce morală a nuvelei.',
    Pintea: 'Căpitan de țară, întruchipează legea și dreptatea. Apare ca opozant direct al lui Lică, dar are prea puțină influență asupra deciziilor lui Ghiță.'
  },
  analiza: 'Nuvela urmărește, cu mijloace realiste și psihologice, prăbușirea morală a unui om care își depășește limitele din dorința de a câștiga mai bine. Slavici construiește un studiu moral despre slăbiciune, coruperea sufletului și efectele devastatoare ale alegerilor greșite. Relația dintre Ghiță și Lică devine axa principală a conflictului, evidențiind dependența psihologică și frica. Degradarea progresivă a protagonistului transformă nuvela într-o tragedie modernă despre responsabilitate și păcat.',
  citate: [
    'Omul să fie mulțumit cu sărăcia sa.',
    'Aici, la Moara cu noroc, nu putea să stea nimeni fără voia lui Lică.',
    'Să-ți fie frică de mine!',
    'Unde-i lege nu-i tocmeală.',
    'Frica-i la om ca frâul la cal.'
  ],
  titluSection: {
    descriere: 'Titlul funcționează ca avertisment moral și ca ironie tragică. Deși locul promite prosperitate, el devine scenă a ispitei, corupției și morții. Moara cu noroc devine un simbol al iluziilor care atrag omul dincolo de limitele sale.',
    puncte: [
      '„Moara cu noroc” sugerează inițial ideea de prosperitate, dar sensul real este ironic: moara aduce ruină, nu noroc.',
      'Locul este izolat, predispus la primejdii și rupt de comunitatea tradițională, ceea ce favorizează influența lui Lică.',
      'Titlul reflectă tema centrală: echilibrul fragil dintre aspirația materială și responsabilitatea morală.',
      'Moara devine personaj-simbol, un spațiu în care natura umană este pusă la încercare și unde alegerile greșite duc la tragedie.'
    ]
  },
  simboluriSection: {
    descriere: 'Simbolurile nuvelei scot în evidență relația dintre caracter, mediu și destin. Ele marchează momente-cheie ale degradării și reflectă tensiunea dintre moralitate și ispită.',
    simboluri: [
      {
        nume: 'Moara cu noroc',
        explicatie: 'Spațiu al tentațiilor și al instabilității morale; locul unde ascensiunea materială pare posibilă, dar unde corupția devine inevitabilă.'
      },
      {
        nume: 'Drumul',
        explicatie: 'Legătura dintre lumea ordonată a satului și universul violent al Sămădăului; simbol al destinului care poate fi schimbat prin alegeri bune sau rele.'
      },
      {
        nume: 'Banii',
        explicatie: 'Forța coruptă care distruge echilibrul interior al lui Ghiță, transformându-l într-un om dominat de frică și compromis.'
      },
      {
        nume: 'Focul final',
        explicatie: 'Actul purificator care distruge răul, dar și viețile celor vinovați sau inocenți; simbol al justiției morale implacabile.'
      },
      {
        nume: 'Lică Sămădăul',
        explicatie: 'Simbol al răului seducător și al haosului moral. Prezența lui corupe și dezbină, funcționând ca agent al distrugerii.'
      }
    ]
  },
    rezumat: {
      incipit: {
        sectiuni: [
          {
            subtitlu: "Dialogul inițial și oferta",
            text: "Povestea începe cu un dialog între Ghiță, un cizmar din sat, nevasta sa Ana și soacra lui, bătrâna înțeleaptă. Ghiță a primit oferta de a prelua cârciuma de la Moara cu Noroc, un loc binecuvântat dar izolat, situat la marginea drumului dintre Ineu și locurile rele."
          },
          {
            subtitlu: "Sfatul bătrânei și decizia",
            text: "Bătrâna, prezentând vocea înțelepciunii și a experienței, îl sfătuiește pe Ghiță să rămână mulțumit cu sărăcia sa, exprimând îngrijorarea că schimbarea ar putea aduce nenorociri: \"Omul să fie mulțumit cu sărăcia sa, căci, dacă e vorba, nu bogăția, ci liniștea colibei tale te face fericit.\"\nGhiță, însă, nemulțumit de viața modestă de cizmar, visează la îmbogățire rapidă și decide să plece la Moara cu Noroc de Sfântul Gheorghe.",
            listaProbe: [
              'Bătrâna sfătuiește prudență și mulțumire cu puțin;',
              'Ghiță visează la îmbogățire rapidă;',
              'Decizia finală: plecarea la Moara cu Noroc.'
            ]
          },
          {
            subtitlu: "Plecarea și locul",
            text: "Ana, tânără și frumoasă, blândă la fire, îl urmează pe soț fără să-și exprime îndoielile. Bătrâna, deși reticentă, acceptă să-i însoțească, rostiind profetic: \"Gând bun să ne dea Dumnezeu în tot ceasul!\"\nMoara cu Noroc este descrisă ca un loc înconjurat de frumusețe naturală, dar și de singurătate. Cinfive cruci stau înaintea morii părăsite, semne ale bucuriilor și primejdiilor prin care au trecut oamenii. Locul este binecuvântat de la venirea noile familii, iar drumeții încep să spună că se opresc \"la Ghiță\", nu la Moara cu Noroc."
          }
        ]
      },
      intriga: {
        sectiuni: [
          {
            subtitlu: "A. Prosperitatea inițială",
            text: "Primele luni aduc prosperitate. Cârciuma este mereu plină patru zile pe săptămână, de marți seară până sâmbătă. Ghiță, Ana și bătrâna numără banii sâmbăta și se simt binecuvântați: \"avea un ginere harnic, o fată norocoasă, doi nepoți sprinteni, iară sporul era dat de la Dumnezeu, dintr-un câștig făcut cu bine.\"\nDuminica, bătrâna merge la biserică, moment în care Ghiță și Ana rămân singuri cu copiii, bucurându-se de frumusețea vieții simple. Totuși, din când în când, când vântul zgâlțâie moara părăsită, locul pare străin și pustiicios, prefigurând evenimentele tragice ce vor urma."
          },
          {
            subtitlu: "B. Apariția lui Lică Sămădăul",
            text: "Intriga propriu-zisă se declanșează odată cu apariția lui Lică Sămădăul, personajul central negativ al nuvelei. Lică este descris ca un om înalt, uscățiv, cu mustața lungă, ochii verzi și mici, sprâncenele dese și împreunate - trăsături ce sugerează natura sa perfidă. El este sămădău (supraveghetor de turme de porci), om temut în toată lunca, despre care circulă multe zvonuri.\nLa prima întâlnire, Lică stabilește regulile jocului. Îl ia pe Ghiță deoparte și îi spune cu amenințare velată: \"Eu voiesc să știu totdeauna cine umblă pe drum, cine trece pe aici, cine ce zice și cine ce face, și voiesc ca nimeni afară de mine să nu știe.\" Când Ghiță ezită, Lică devine și mai direct: \"Eu sunt Lică, sămădăul... umblu ziua-n amiază mare pe drumul de țară și nimeni nu mă oprește în cale... nimeni nu cutează să fure, ba să-l ferească Dumnezeu pe acela pe care aș crede că-l pot bănui.\"\nGhiță înțelege că nu poate sta la Moara cu Noroc fără consimțământul lui Lică și acceptă, implicit, să devină ochii și urechile acestuia."
          },
          {
            subtitlu: "C. Compromisurile succesive",
            text: "Slavici construiește magistral degradarea morală a lui Ghiță prin compromisuri succesive:",
            listaProbe: [
              'Primul compromis: Lică îi lasă o verigă de sârmă cu semnele turmelor sale, cerându-i să urmărească porcii ce trec pe drum. Ghiță primește, justificându-se că astfel îl protejează pe Lică de hoți.',
              'Al doilea compromis: Când vine toamna, Lică trimite oameni să mănânce și să bea, oferindu-i lui Ghiță cinci grăsuni ca plată. Ghiță refuză inițial, dar bătrâna îl sfătuiește să primească.',
              'Al treilea compromis: Lică vine la cârciuma și îi ia cu forța banii lui Ghiță din saltarul mesei, promițând că îi va returna cu camătă. Ghiță, gândindu-se la Ana și copii, acceptă.'
            ],
            textFinal: "Momentul revelator survine când Ghiță se revoltă și îl apucă pe Lică de brațe, amenințându-l. Lică, însă, răspunde rece: \"Asta e treaba mea! Ori îmi vei face pe plac, ori îmi fac rând de alt om la Moara cu noroc.\"\nGhiță este prins în capcană. Pentru a scăpa, inventează o minciună salvată - trimite pe Laie, sluga sa, la popa din Fundureni, pentru a crea un martor că discută cu Lică despre afaceri legale. Cei doi ajung la o \"înțelegere\", dar natura ei este clară: Ghiță devine complice."
          }
        ]
      },
      desfasurarea: {
          sectiuni: [
            {
              "subtitlu": "A. Degradarea progresivă",
              "text": "După înțelegerea cu Lică, viața lui Ghiță se schimbă radical. He devine ursuz, violent cu slugile, distant față de Ana. Își cumpără pistoale, angajează o a doua slugă (Marți, un ungur înalt), și își ia doi câței pe care îi dresează să atace. Ana observă transformarea și suferă: \"Adeseori Ana ar fi voit să-l întrebe: 'Ghiță! ce-i cu tine?', însă ea nu mai îndrăznea să-i vorbească dezghețat ca mai nainte, căci se temea ca nu cumva el să se mânie și pe dânsa.\"\nRelația dintre Ghiță și Ana se deteriorează. El își petrece timpul cu câinii, neglijând familia. Ana simte că \"de când are câini, ține mai puțin la nevastă și la copii.\""
            },
            {
              "subtitlu": "B. Crima de la arândașul",
              "text": "Intriga se complică dramatic când, într-o zi de luni, Lică vine la cârciuma cu trei tovarăși: Buză-Ruptă, Săilă Boarul și Răuț. În prezența drumeților, Lică vorbește despre arândaș (proprietarul care închiriază cârciuma), întrebându-l pe Ghiță când va veni acesta. Vorbește suficient de tare pentru ca drumeții să audă, punând astfel bazele unui alibi.\nSeara, Buză-Ruptă și Săilă pleacă spre Ineu, Răuț dispare spre pădurea de la Fundureni, iar Lică rămâne peste noapte la cârciuma. Peste noapte, câinii latră de două ori. Ana, care nu poate dormi, îl vede pe Lică întorcându-se singur în zori de zi. Dimineața, Lică pleacă aparent calm.\nMarți dimineață sosește Pintea căprarul cu doi jandarmi. Au fost comise crime teribile: arândașul a fost călcat și jefuit în noaptea precedentă. Pintea îl ia pe Ghiță la cercetări la Ineu. Pe drum, descoperă o trăsură părăsită și un copil mort - alte victime ale bandei lui Lică."
            },
            {
              "subtitlu": "C. Investigația și judecata",
              "text": "La Ineu, Ghiță este confruntat cu mărturisirile slugilor sale. Marți povestește că Lică a stat cu Răuț, Buză-Ruptă și Săilă la cârciuma, că au vorbit despre arândaș, și că târziu în noapte a venit un om cu o femeie la Lică. Ghiță este prins în contradicții - susține că Lică a stat toată noaptea la cârciuma, dar nu poate dovedi acest lucru convingător.\nPintea, fost tovarăș de temnița al lui Lică, devine personajul care încearcă să-l prindă pe Sămădău. El îl pune pe Ghiță să accepte o slujnică - Uța - care de fapt este un om de pândă. Pintea descoperă în pădure cadavrul femeii din trăsură, ucisă prin înăbușire, și biciul lui Lică lângă trup. Mai târziu, găsește și pe jandarmul Hanțl rănit mortal, cu un cuțit înfipt în corp și o cârpă vânătă în mână - smulsă de pe fața atacatorului.\nLa judecata de la Oradea-Mare, Lică scapă prin viclenie și protecția stăpânilor săi influenți. Buză-Ruptă și Săilă Boarul sunt osândiți pe viață, deși mărturisirile lor contradictorii sugerează că sunt victime ale unui complot. Ghiță, pus în fața judecătorilor, trebuie să aleagă: ori îl trădează pe Lică și riscă răzbunarea, ori minte și devine complice deplin. El alege o cale de mijloc, declarând: \"Nu pot să jur că n-a plecat în noaptea aceea, fiindcă n-am stat mereu lângă dânsul; jur însă că l-am știut toată noaptea la cârciuma.\""
            },
            {
              "subtitlu": "D. Prăbușirea morală și materială",
              "text": "După judecată, Ghiță este eliberat, dar cinstea îi este distrusă. Oamenii din Ineu îl privesc cu bănuială. El însuși simte că \"cinstit nu e decât omul care a astupat gurile rele, pe care nimeni nu-l poate grăi de rău fără de a se da de rușine\" - și el nu mai este astfel de om.\nRelația cu Ana devine și mai tensionată. Ea bănuiește adevărul, dar nu îndrăznește să-l întrebe direct. Ghiță, copleșit de vinovăție și de frica de răzbunarea lui Lică, devine tot mai violent și distant. Într-o scenă teribilă, după ce Ana îl întreabă despre implicarea sa în crime, Ghiță îi scuipă în față: \"Mi-e scârbă când mă gândesc că am o nevastă care poate să mai trăiască cu un om precum tu mă socotești pe mine.\"\nÎn același timp, Lică continuă să vină la cârciuma și să-i aducă lui Ghiță bani murdari de la jafuri - hârtii noi-nouțe împunse cu acul (furate de la bancă), galbeni cu zimții piliți, argintărie de la arândaș. Ghiță, prins în capcană, acceptă să schimbe banii, dar ia legătura secret cu Pintea, promițându-i că îl va prinde pe Lică.\nÎnsă Ghiță însuși devine complice activ - păstrează jumătate din banii schimbați pentru sine, mințindu-l pe Pintea. Vinovăția și lăcomia îl corup complet. El adună o avere considerabilă, dar pierde tot ce avea mai de preț: cinstea, liniștea sufletului, dragostea familiei."
            },
            {
              "subtitlu": "E. Influența pernicioasă a Uței și atracția fatală",
              "text": "Pe măsură ce trece timpul - toamna, iarna, primăvara - atmosfera de la Moara cu Noroc devine din ce în ce mai coruptă. Uța, slujnica pusă de Pintea, se dovedește a fi o femeie dezmățată care organizează petreceri cu țigani pentru Lică. Ana, la început dezgustată, se obișnuiește treptat cu desfrâul și chiar începe să participe.\nLică, care până atunci evitase femeile ca pe o slăbiciune, devine fascinat de Ana. El vine din ce în ce mai des la cârciuma, joacă cu Ana, o sărută \"în glumă\", îi împletește un bici pentru băiat. Ana, neglijată de Ghiță, răspunde inconștient la atenția lui Lică. Slavici descrie magistral această atracție fatală, subtilă la început, din ce în ce mai evidentă.\nBătrâna, vocea conștiinței, încearcă să intervină înainte de Paști: \"Nu v-am spus-o până acum, fiindcă n-aveam pentru ce; acum vă zic să-l țineți mai departe de voi.\" Dar e prea târziu."
            }
          ]
        },
        punctulCulminant: {
          sectiuni: [
            {
              subtitlu: "A. Ziua de Paști - pregătirea catastrofei",
              text: "Punctul culminant al nuvelei este ziua de Paști, când toate firele acțiunii converg într-o tragedie inevitabilă. Ghiță, sub presiunea lui Pintea care îl acuză că îl protejează pe Lică, concepe un plan demonic: va trimite familia la Ineu de sărbători, îl va aștepta singur pe Lică (care i-a promis că vine cu mulți bani), îl va prinde cu dovezile asupra lui și îl va da jandarilor.\nPlanul se complică când Ana refuză să plece fără el. Ghiță, furios și disperat, îi aruncă cuvinte cumplite: \"Îmi stai în cale!\" Ana, rănită dar îndărătnică, răspunde: \"Tocmai de aceea voiesc să rămân [...] Ții la tine, Ghiță, strigă ea îndărătnicită, țin cu toată inima.\"\nÎn cele din urmă, pleacă doar bătrâna cu copiii. Ana rămâne cu Ghiță și cei doi slugi - Marți (care, se va dovedi, este omul lui Lică) și Uța."
            },
            {
              subtitlu: "B. Petrecerea macabră",
              text: "Duminică, în ziua de Paști, în timp ce credincioșii sunt la biserică, la Moara cu Noroc începe o petrecere desfrânată. Lică sosește cu Răuț și Păun, aducând o traistă cu \"scule\" (de fapt instrumente pentru spargeri) și șerparul plin cu galbeni furati. El este supărat că Ana nu a plecat, după cum stabiliseră, dar hotărăște să profite de situație.\nScena petrecerii este descrisă cu detalii macabre: țiganii cântă cu hârtii lipite pe frunte (bani murdari), Lică o joacă pe Ana până când \"abia îi mai atingeau picioarele pământul\", Ghiță joacă cu Uța într-o veselie forțată, toți beau și se destrăbălează.\nTensiunea erotică dintre Lică și Ana devine explicită. El o ia pe genunchi și o sărută, întrebându-l pe Ghiță în glumă: \"Măi Ghiță! [...] așa e că mi-o lași mie acu o dată, de ziua de Paști?\" Ghiță, otrăvit de gelozie dar temându-se să se dea de gol, răspunde: \"Fă cu ea ce vrei!\""
            },
            {
              subtitlu: "C. Planul diabolic",
              text: "Lică îl ia pe Ghiță deoparte și îi propune explicit: \"Noi ne-am înțeles: tu pleci pe ici încolo și mă lași pe mine aici cu dânsa.\"\nGhiță acceptă - nu pentru că e de acord, ci pentru că vede ocazia perfectă de răzbunare:",
              listaProbe: [
                'Va pleca la Ineu să-l aducă pe Pintea;',
                'Va prinde pe Lică în flagrant cu Ana și cu banii furati;',
                'În calcul său diabolic, sacrifică cinstea Anei pentru răzbunare.'
              ],
              textFinal: "Ana, văzându-l pe Ghiță plecând călare, înțelege că a fost trădată. În disperarea ei, ea face o alegere fatală - se supune lui Lică, cerându-i însă să promită \"un lucru\". Slavici nu spune explicit ce, dar se subînțelege că Ana îi cere lui Lică să o ia cu el, să fugă împreună."
            },
            {
              subtitlu: "D. Eșecul planului",
              text: "Planul lui Ghiță eșuează catastrofal. El sosește la Ineu cu Pintea și jandarmii, dar când se întorc spre Moara cu Noroc, îl văd pe Lică fugind călare în amurg. Câinii, pe care Ghiță îi cumpărase pentru protecție, îl trădează - îl recunosc pe Lică și nu latră.\nUrmărirea e zadarnică - murgul lui Lică e mai iute. Ghiță, cuprins de gelozie și disperare, se întoarce singur la cârciuma: \"Voi mergeți mai departe; eu mă întorc acasă să-mi închei socoteala cu dânsa.\""
            }
          ]
        },
        deznodamant: {
          sectiuni: [
            {
              subtitlu: "A. Dubla crimă",
              text: "Deznodământul este apocaliptic. Ghiță sosește la cârciuma găsind-o pe Ana singură. Scena care urmează este de o intensitate tragică remarcabilă:\nGhiță intră, încuie ușa și aruncă cheia: \"Nu vreau să mor, Ghiță! Nu vreau să mor!\" strigă Ana, aruncându-se în genunchi. Ghiță, transfigurat de durere și gelozie, răspunde cu o blândețe teribilă: \"Nu-ți fie frică [...] N-am să te chinuiesc: am să te omor cum mi-aș omorî copilul meu când ar trebui să-l scap de chinurile călăului.\"\nAna, neștiind de planul lui Ghiță, crede că va muri pentru adulter. Ea se apără: \"Dar de ce să mă omori? Ce-am păcătuit eu?\" Ghiță, care credea că Ana s-a dat lui Lică, realizează abia acum adevărul teribil: \"Acum văd c-am făcut rău, și dacă n-aș vedea din fața ta că eu te-am aruncat ca un ticălos în brațele lui pentru ca să-mi astâmpăr setea de răzbunare.\"\nAna, aflând adevărul, strigă disperat: \"Ghiță! Ghiță! de ce nu mi-ai spus-o tu mie asta la vreme!?\" Moment de catharsis tragic - cei doi înțeleg că dragostea lor a fost distrusă de neîncredere și mândrie.\nAfară se aude un huhurez (semn de moarte în folclorul românesc), apoi pași. \"Pintea cu jandarmii!\" șoptește Ghiță, scoțându-și cuțitul. \"Săriți, că mă omoară!\" strigă Ana.\nDar nu sunt jandarmii - sunt Lică cu Răuț și Păun, care se întorseseră pentru a-l ucide pe Ghiță și a ascunde dovezile. Răuț îi descarcă pistolul în ceafa lui Ghiță, care cade mort lângă Ana rănită.\nAna, văzându-l pe Lică, înțelege trădarea finală. Când el se pleacă asupra ei, ea \"îi mușcă mâna și își înfipse ghearele în obrajii lui\" - gest de blestare și răzbunare - apoi moare."
            },
            {
              subtitlu: "B. Nemesis",
              text: "După dublul omor, Lică dă ordine rapide: Răuț și Păun să caute banii din casă și să dea foc cârciumi când el se va apropia de Fundureni, pentru a-și crea un alibi.\nÎnsă Nemesis (răzbunarea divină) îl urmărește pe Lică. Când încearcă să fugă, murgul său, epuizat de drumul făcut în ploaie, cade mort. Lică rămâne pedestru, cu fața zgâriată de Ana (semn care îl incriminează), fără cal, cu râul umflat în față.\nSlavici descrie magistral disperarea lui Lică. El se gândește să se întoarcă la cârciuma în flăcări pentru a fura calul lui Ghiță. Pe drum, intră într-o biserică pentru a se adăposti de furtună. Acolo, încercând să fure o perdea de la altar, Lică are o revelație religioasă: \"Dumnezeu era acela care-l scăpase de atâtea primejdii, Dumnezeu îi lumina mintea și întuneca pe a celorlalți; cu Dumnezeu n-ar fivoit să se strice.\"\nDar când realizează că și-a uitat șerparul cu galbenii la Moara cu Noroc, Lică înnebunește: \"Îi era frică, încât îi venea să se arunce pe cal și să meargă și să fugă mereu.\" În biserica goală, sub privirea icoanelor, el rostește un blestem teribil: \"Unul câte unul, strigă el ridicându-și mâna dreaptă în sus, unul după altul, om cu om, toți trebuie să moară, toți care mă pot vinde!\"\nPleacă din biserică și merge la preot, mințind că îi pierise porci, creându-și astfel un alibi. Apoi se întoarce spre Moara cu Noroc, dar e prea târziu - Pintea îl zărește în lumina incendiului.\nÎn ultimul moment de viață, Lică alege sinuciderea în loc de spânzurătoare. Se repede cu capul în trunchiul unui stejar uscat, sfărâmându-și craniul. Pintea găsește cadavrul și, pentru a ascunde faptul că Lică a scăpat de justiție prin moarte, îl aruncă în râul umflat: \"A scăpat! [...] Dar asta nu are s-o afle nimeni în lume.\""
            },
            {
              subtitlu: "C. Epilogul",
              text: "Nuvelei se încheie cu o scenă de deznădejde absolută. Luni, după ce focul s-a stins complet, bătrâna vine cu copiii la ruinele cârciumi. Din tot ce fusese Moara cu Noroc nu mai rămăsese decât: \"zidurile afumate stăteau părăsite, privind cu tristețe la ziua senină și înveselitoare. [...] în fundul gropii, care fusese odinioară pivniță, nu se mai vedeau decât oasele albe ieșind pe ici, pe colo din cenușa groasă.\"\nBătrâna, care prezisese dezastrul de la început, plânge cu lacrimi alinătoare și spune simplu: \"Se vede c-au lăsat ferestrele deschise! [...] Simțeam eu că nu are să iasă bine; dar așa le-a fost dat!...”\nApoi ia copiii orfani și pleacă mai departe - imagine a vieții care continuă după tragedie, dar și a ciclului etern al nenorocirilor cauzate de lăcomie și compromisuri morale."
            }
          ]
        }
      },
  },
  'o-scrisoare-pierduta': {
    titlu: 'O scrisoare pierdută',
    autor: 'I.L. Caragiale',
    data: '1884',
    categorie: 'comedie',
    canonic: true,
    descriere: 'Comedie satirică despre viața politică și corupția din societatea românească.',
    teme: ['politica', 'demagogia', 'corupția', 'satira socială'],
    personaje: ['Zaharia Trahanache', 'Zoe', 'Ștefan Tipătescu', 'Nae Cațavencu', 'Farfuridi', 'Brânzovenescu', 'Pristanda'],
    analiza: 'Caragiale creează o comedie perfectă despre corupția politică și ipocrizia socială. Fiecare personaj reprezintă un tip social specific, iar intriga se bazează pe o situație comică generată de dispariția scrisorii.',
    citate: [
      '"Să nu mai vorbim de asta!"',
      '"Am pierdut scrisoarea!"',
      '"Ce scrisoare?"'
    ],
    rezumat: {
        incipit: {
          sectiuni: [
            {
              subtitlu: "Contextul acțiunii și atacurile din presă",
              text: "Acțiunea începe în casa prefectului Ștefan Tipătescu din capitala unui județ de munte. Tipătescu este furios din cauza atacurilor virulente din ziarul Răcnetul Carpați, condus de Nae Cațavencu, care îl numește vampir și mișel."
            },
            {
              subtitlu: "Descoperirea complotului",
              text: "Tipătescu discută cu polițaiul Ghiță Pristanda, omul său servil și corupt. Pristanda îi povestește că a spionat o întrunire secretă la casa lui Cațavencu, unde adversarii politici discutau despre alegeri. Cațavencu a menționat că deține o scrisoare compromițătoare care îi va asigura victoria electorală, dar polițaiul nu a reușit să afle conținutul ei."
            },
            {
              subtitlu: "Misiunea lui Pristanda",
              text: "Tipătescu, bănuind pericolul, îi ordonă lui Pristanda să afle despre ce scrisoare este vorba și de la cine provine, căci bănuiește că este o armă periculoasă în mâinile lui Cațavencu."
            }
          ]
        },
        intriga: {
          sectiuni: [
            {
              subtitlu: "Prima complicație: Scrisoarea compromițătoare",
              text: "Zaharia Trahanache, președintele Comitetului electoral și soțul Zoei, sosește agitat la prefectură. El îi povestește lui Tipătescu că Nae Cațavencu l-a chemat și i-a arătat o scrisoare de dragoste, scrisă de Tipătescu către Zoe, în care o invita la el acasă. Trahanache crede că este o plastografie (falsificare)."
            },
            {
              subtitlu: "Dezvăluirea adevărului și șantajul",
              text: "După plecarea lui Trahanache, apare Zoe Trahanache. Ea mărturisește că scrisoarea este autentică, fiind pierdută de ea pe stradă. Cațavencu, care a găsit-o, o șantajează: cere sprijin la alegeri în schimbul restituirii scrisorii. Tipătescu ordonă arestarea lui Cațavencu."
            },
            {
              subtitlu: "Cetățeanul turmentat și dispariția inițială a scrisorii",
              text: "Pristanda nu găsește scrisoarea la Cațavencu. Între timp, Cetățeanul turmentat, un alegător beat, dezvăluie că el a găsit scrisoarea pe drum, dar i-a fost furată de Cațavencu în timpul unei beții, exact când se pregătea s-o ducă la andrisant."
            }
          ]
        },
        desfasurarea: {
          sectiuni: [
            {
              subtitlu: "Tensiunea din Comitetul electoral",
              text: "Farfuridi și Brânzovenescu, membri ai Comitetului, vin la prefect cu bănuieli de trădare, amenințând că vor trimite depeșe la București dacă Tipătescu va face un joc dublu cu opoziția."
            },
            {
              subtitlu: "Pactul cu Cațavencu și presiunea Zoei",
              text: "Zoe, disperată, îl convinge pe Tipătescu să cedeze. Sub presiunea emoțională (amenință cu sinuciderea), Tipătescu acceptă să sprijine candidatura lui Cațavencu la colegiul al doilea. Se face un pact: Cațavencu va fi ales deputat și va restitui scrisoarea după proclamarea rezultatelor."
            },
            {
              subtitlu: "Răsturnarea de situație: Telegrama de la Centru",
              text: "Exact când lucrurile păreau rezolvate, sosește o telegramă urgentă de la guvern: se impune ca la colegiul al doilea să fie ales Agamemnon Dandanache, un vechi luptător de la 48. Decizia guvernului este o înaltă și ultimă chestie de încredere pentru prefect."
            },
            {
              subtitlu: "Întrunirea electorală și dezastrul",
              text: "La întrunirea publică, după discursul confuz al lui Farfuridi, Trahanache proclamă candidatul Comitetului: Agamemnon Dandanache, nu Cațavencu. Cațavencu strigă Trădare! și amenință că va dezvălui o rușine. Scandalu ia amploare, iar Pristanda și susținătorii lui Dandanache îl bat și îl evacuează forțat din sală."
            }
          ]
        },
        punctulCulminant: {
          sectiuni: [
            {
              subtitlu: "Dispariția lui Cațavencu și apariția lui Dandanache",
              text: "Zoe este disperată din cauza dispariției lui Cațavencu. Tipătescu încearcă s-o liniștească, arătându-i o poliță falsificată a lui Cațavencu ca armă de șantaj. Apare Dandanache, candidatul impus, care povestește, cu un aer candid, cum și-a asigurat el candidatura șantajând pe cineva cu o scrisoare de amor (pe care o păstrează pentru viitor)."
            },
            {
              subtitlu: "Loviturile fatale: Cațavencu pierde scrisoarea",
              text: "Pristanda îl aduce pe Cațavencu. Zoe îi cere să facă schimbul: polița contra scrisorii. Caţavencu mărturiseşte, cu disperare, că a pierdut scrisoarea în timpul scandalului de la întrunire, când i-a fost smulsă pălăria în căptușeala căreia o ascunsese. Zoe este devastată."
            },
            {
              subtitlu: "Salvarea miraculoasă",
              text: "În momentul cel mai dramatic, apare Cetățeanul turmentat purtând pălăria lui Cațavencu. El dezvăluie că a găsit scrisoarea în căptușeală și, aplicând regulile de fost împărțitor la poștă, o înmânează andrisantului (destinatarului), adică Zoei. Zoe este salvată."
            }
          ]
        },
        deznodamant: {
          sectiuni: [
            {
              subtitlu: "Reconcilierea generală și umilirea lui Cațavencu",
              text: "Zoe, având scrisoarea în siguranță, devine brusc generoasă. Îi promite lui Caţavencu că nu va folosi poliţa falsificată, cu singura condiție ca el să conducă manifestația publică și să prezideze banchetul în cinstea noului deputat Dandanache. Caţavencu, învins, recunoaște autoritatea noii puteri."
            },
            {
              subtitlu: "Banchetul ipocriziei",
              text: "Piesa se încheie cu o scenă de mare fast și veselie în grădina lui Trahanache. Toţi se îmbrățișează. Dandanache (alesul), Trahanache (naivul fericit), Tipătescu și Zoe (împăcați) și Caţavencu (umilit, dar salvat de Zoe) sunt prezenți. Caţavencu ține un discurs bombastic despre binefacerile unui sistem constituțional. Toți strigă Trăiască!, în timp ce muzica atacă marșul triumfal, ilustrând triumful corupției și al oportunismului."
            }
          ]
      }
    },
  },
  'harap-alb': {
      titlu: "Povestea lui Harap Alb",
      autor: "Ion Creangă",
      data: "1877",
      categorie: "basm",
      canonic: true,
      descriere: "Basm cult despre drumul inițiatic al mezinului craiului, care trece prin încercări succesive pentru a deveni un conducător matur, drept și înțelept. Textul combină elemente fantastice cu observații realiste, umor și înțelepciune populară.",
      teme: [
        "binele vs. răul",
        "maturizarea eroului",
        "inițierea și transformarea",
        "prietenia și solidaritatea",
        "identitatea și adevărul",
        "moralitatea și dreptatea"
      ],
      personaje: [
        "Harap-Alb",
        "Craiul",
        "Împăratul Verde",
        "Împăratul Roș",
        "Spânul",
        "Gerilă",
        "Flămânzilă",
        "Setilă",
        "Ochilă",
        "Păsări-Lăți-Lungilă",
        "Sfânta Duminică",
        "Calul Năzdrăvan",
        "Fata Împăratului Roș"
      ],
      personajeDetalii: {
        "Harap-Alb": "Eroul principal, cel mai mic fiu al craiului. La început naiv, impulsiv și încrezător în oameni, dar cu o inimă bună. Greșeala de a se încrede în Spân îi declanșează drumul inițiatic. Prin probe grele, ajutor primit de la personaje fantastice și capacitatea de a arăta milă, modestie și curaj, devine un lider matur și drept.",
        "Craiul": "Tatăl eroului, conducător înțelept, care își testează fiii pentru a vedea care este cu adevărat vrednic de a porni la drum. Îl susține indirect pe Harap-Alb și reprezintă autoritatea părintească și tradiția.",
        "Împăratul Verde": "Unchiul lui Harap-Alb, fără urmași, în căutarea unui moștenitor demn. La curtea lui se desfășoară o parte importantă a acțiunii. Reprezintă puterea legitimă, ordinea și stabilitatea.",
        "Împăratul Roș": "Antagonist secundar, dar puternic. Crud, autoritar, impune probe imposibile pentru a testa pe cel ce vrea să-i ia fata. El reprezintă obstacolul final și încercarea supremă în evoluția eroului.",
        "Spânul": "Antieroul basmului, expresia răului, a falsității și trădării. Profită de încrederea lui Harap-Alb, îi fură identitatea, îl transformă în sluga lui și îl exploatează. Prin comportamentul lui, contribuie paradoxal la maturizarea eroului.",
        "Gerilă": "Om cu putere supranaturală asupra frigului. Reușește să înghețe tot ce atinge. Devine aliat al lui Harap-Alb în proba salatelor și ilustrează resursele miraculoase care apar atunci când eroul merită ajutor.",
        "Flămânzilă": "Un uriaș cu o foame de nestăvilit. Poate devora cantități imense și îl ajută pe Harap-Alb în cauza sa. Reprezintă hiperbola specifică basmului și simbolizează nevoia uriașă de resurse în momente limită.",
        "Setilă": "Personaj fantastic capabil să bea ape întregi. Îl susține pe Harap-Alb la proba apei din curtea împăratului Roș. Este expresia exagerării comice și a sprijinului necondiționat.",
        "Ochilă": "Om cu vedere pătrunzătoare, capabil să vadă la distanțe enorme și prin obiecte. Este simbolul discernământului, al clarviziunii și al adevărului care nu poate fi ascuns.",
        "Păsări-Lăți-Lungilă": "Personaj cu brațe extrem de lungi, capabil să ajungă în locuri imposibile. Reprezintă posibilitatea de a depăși limite aparent de netrecut prin colaborare.",
        "Sfânta Duminică": "Figură protectoare, binevoitoare, oferă lui Harap-Alb ajutor și sfaturi. Reprezintă intervenția divină, moralitatea și binecuvântarea eroului.",
        "Calul Năzdrăvan": "Animal magic, ghid și protector. Deși pare slab și bătrân, are puteri extraordinare. Este simbolul înțelepciunii ascunse și al loialității absolute.",
        "Fata Împăratului Roș": "Personaj cheie în final. Deșteaptă, curajoasă și loială, îl ajută pe Harap-Alb să-și recapete identitatea și să-l învingă pe Spân. Reprezintă armonia finală și unirea binelui cu dreptatea."
      },
      analiza: "Basm cult cu structură tradițională, construit în jurul unui drum inițatic. Naratorul omniscient introduce elemente populare, umor, ironie și înțelepciune. Tema maturizării este centrală: Harap-Alb devine erou nu prin forță, ci prin bunătate, empatie, curaj și capacitatea de a învăța din greșeli. Personajele fantastice nu sunt simple figuri decorative, ci reprezintă resursele morale și sprijinul primit atunci când ești demn de ajutor. Spânul, deși antagonist, este esențial deoarece declanșează transformarea eroului. Finalul restabilește ordinea, confirmând adevărul moral: binele învinge răul, iar identitatea adevărată nu poate fi ascunsă la nesfârșit.",
      citate: [
        "Omul sfintește locul.",
        "La plăcinte înainte, la război înapoi.",
        "Cine are curaj și credință, trece marea și se-nchină.",
        "Unde-i unul nu-i putere; unde-s mulți puterea crește.",
        "Sfatul bun e mai de preț decât o pungă de galbeni."
      ],
      titluSection: {
        descriere: "Titlul pune accent pe identitatea aparent umilă a eroului și ascunde în spatele numelui de slugă un drum complex de transformare. El anunță tema centrală: descoperirea sinelui și depășirea condiției impuse.",
        puncte: [
          "Numele Harap-Alb reflectă pierderea identității nobiliare și începutul unei etape de învățare și maturizare.",
          "Contrastează între „Harap”, asociat cu starea de robie, și „Alb”, simbol al purității și al potențialului moral.",
          "Transformarea numelui devine simbolul trecerii de la aparență la esență: sub masca slujii se ascunde viitorul împărat.",
          "Titlul susține ideea că adevărata valoare a eroului nu ține de rang, ci de faptele sale."
        ]
      },
      simboluriSection: {
        descriere: "Simbolurile din basm evidențiază evoluția eroului, lupta dintre bine și rău, dar și importanța alegerilor morale. Elementele miraculoase și obiectele întâlnite au rol formator și îl pregătesc pe Harap-Alb pentru statutul final.",
        simboluri: [
          {
            nume: "Podul",
            explicatie: "Locul unde Harap-Alb îl întâlnește pe Spân și își pierde identitatea nobilă; simbolizează trecerea decisivă între copilărie și maturitate."
          },
          {
            nume: "Fântâna",
            explicatie: "Spațiul în care Spânul îl păcălește pe tânăr; semnifică punctul vulnerabil al eroului și consecințele naivității."
          },
          {
            nume: "Calul năzdrăvan",
            explicatie: "Este ghidul interior al eroului, simbolul înțelepciunii, loialității și al forței reale ascunse sub aparențe simple."
          },
          {
            nume: "Probele împăratului Roș",
            explicatie: "Fiecare probă reprezintă o etapă a maturizării: autocontrol, răbdare, solidaritate și curaj."
          },
          {
            nume: "Masca identității furate",
            explicatie: "Situația în care Harap-Alb trăiește sub numele impus de Spân simbolizează lupta dintre identitatea adevărată și rolurile sociale impuse."
          }
        ]
      },      
    rezumat: {
      incipit: {
        sectiuni: [
          {
            subtitlu: "Contextul fabulos și motivul împăratului fără moștenitori",
            text: "Povestea începe cu prezentarea cadrului fabulos: un crai cu trei feciori și fratele său, Verde-împărat, care domnea într-o țară îndepărtată. Împăratul Verde, aflat la bătrânețe și fără moștenitori masculi, îi trimite o scrisoare fratelui său, cerându-i să-i trimită pe cel mai vrednic dintre nepoți pentru a-l face moștenitor al împărăției."
          },
          {
            subtitlu: "Proba inițială și eșecul fraților mai mari",
            text: "Craiul îi cheamă pe cei trei feciori și le oferă această șansă. Primii doi frați pornesc cu încredere, dar sunt înfricoșați de un urs (de fapt, tatăl lor deghizat) care le iese în cale la un pod, simbol al trecerii la maturitate. Ei se întorc rușinați acasă."
          },
          {
            subtitlu: "Intervenția ajutoarei magice",
            text: "Cel mai mic fiu, mâhnit de cuvintele aspre ale tatălui, este sfătuit de o babă cerșetoare (Sfânta Duminică deghizată) să ceară calul, armele și hainele cu care tatăl său a fost mire. Urmând sfatul, tânărul alege calul miraculos din herghelie (care vorbește), trece cu succes proba ursului (aruncând pielea de urs de la tatăl său) și pornește în călătorie, fiind pregătit pentru drumul inițiatic."
          }
        ]
      },
      intriga: {
        sectiuni: [
          {
            subtitlu: "Elementul perturbator: Apariția Spânului",
            text: "Conflictul principal se declanșează când tânărul fiu de crai întâlnește în codru un om spân viclean. Deși tatăl îl avertizase să se ferească de oamenii spâni și mai ales de cei roșii, eroul este forțat de împrejurări să-l angajeze ca slugă. Spânul, prefăcându-se de trei ori în straie diferite, reușește să-l convingă pe fiul craiului să-l ia cu el."
          },
          {
            subtitlu: "Scena fântânii și pierderea identității",
            text: "Momentul crucial al intrigii survine când Spânul îl păcălește pe tânăr să coboare într-o fântână pentru a se răcori. Profitând de situație, Spânul închide capacul și îl șantajează: fie jură ascultare deplină și acceptă să devină slugă, primind numele de Harap-Alb (slugă albă), fie moare în fântână. Sub amenințare, tânărul jură pe ascuțișul paloșului său și își pierde identitatea, devenind rob al Spânului. Acesta îi fură identitatea, cartea de la crai, banii și armele, prezentându-se el însuși drept nepotul împăratului Verde."
          },
          {
            subtitlu: "Jurământul și condiția inițiatică",
            text: "Prin jurământ, Harap-Alb acceptă o condiție umilitoare și periculoasă, dar necesară pentru dezvoltarea sa. De acum înainte, drumul său va fi un ciclu de probe inițiatice impuse de stăpânul său, Spânul."
          }
        ]
      },
      desfasurarea: {
        sectiuni: [
          {
            subtitlu: "Probele impuse de Spân la curtea împăratului Verde",
            text: "Ajunși la împărăție, Spânul este primit cu cinste ca nepot, în timp ce Harap-Alb este trimis la grajd ca slugă. Fetele împăratului observă cruzimea Spânului și bunătatea lui Harap-Alb. Pentru a-l pierde, Spânul îi impune sarcini aproape imposibile, pe care Harap-Alb le îndeplinește doar cu ajutor magic:",
            listaProbe: [
              "Sălățile din Grădina Ursului: Harap-Alb trebuie să aducă salate dintr-o grădină păzită de un urs teribil. Cu ajutorul Sfintei Duminici, Harap-Alb adoarme ursul și aduce o sarcină uriașă de salati.",
              "Pielea Cerbului cu pietre prețioase: Trebuie să jupuiască un cerb magic a cărui privire omoară. Sfânta Duminică îi dă obrăzarul și sabia lui Statu-Palmă-Barbă-Cot. Harap-Alb taie capul cerbului când acesta adoarme și aduce comoara la palat.",
              "Cea mai grea probă: să aducă fata unui împărat crud și viclean. În călătorie, Harap-Alb își arată bunătatea și primește în schimb ajutoare magice (aripă de la furnici și albine) și cinci tovarăși cu puteri supranaturale: Gerilă, Flămânzilă, Setilă, Ochilă și Păsări-Lăți-Lungilă."
            ]
          },
          {
            subtitlu: "Probele de la împăratul Roș",
            text: "Împăratul Roș le impune probe menite să-i ucidă:",
            listaProbe: [
              "Casa de aramă înfierbântată: Gerilă salvează grupul înghețând casa.",
              "Alegerea macului de nisip: Furnicile chemate prin aripa magică îndeplinesc sarcina.",
              "Străjuirea și prinderea fetei: Fata se preface în pasăre și fuge, dar Ochilă o vede, iar Păsări-Lăți-Lungilă o prinde.",
              "Recunoașterea fetei adevărate: Crăiasa albinelor o indică pe cea adevărată.",
              "Cursa dintre cal și turturică: Calul lui Harap-Alb reușește să obțină prin vicleșug mere dulci și apă vie și moartă, elemente necesare pentru înviere."
            ]
          }
        ]
      },
      punctulCulminant: {
        sectiuni: [
          {
            subtitlu: "A. Demascarea și tăierea capului",
            text: "Momentul de tensiune maximă survine la întoarcerea la împărăția Verde. Fata împăratului Roș dezvăluie adevărul: Harap-Alb este adevăratul nepot, nu Spânul. În furia sa, trădarea fiind descoperită, Spânul se repede la Harap-Alb și îi taie capul dintr-o lovitură de paloș, invocând jurământul încălcat. Eroul moare, iar răutatea pare să fi triumfat."
          },
          {
            subtitlu: "B. Răzbunarea calului magic",
            text: "Calul magic al lui Harap-Alb se răzbună imediat, apucându-l pe Spân cu dinții și zburând cu el până la nori, apoi îl aruncă jos unde acesta se face praf și pulbere. Astfel, condiția inițiatică a fost îndeplinită, iar Spânul își primește pedeapsa."
          }
        ]
      },
      deznodamant: {
        sectiuni: [
          {
            subtitlu: "A. Învierea și restabilirea ordinii",
            text: "Fata împăratului Roș intervine salvator: pune la loc capul lui Harap-Alb, îl înconjoară cu cele trei smicele de măr dulce, toarnă apă moartă (să se lipească tăieturile) și apă vie (să reînvie). Harap-Alb învie, zicând că adormise adânc. Adevărul este restabilit: el primește înapoi identitatea sa de fiu de crai, primește binecuvântarea împăratului Verde și devine împărat, căsătorindu-se cu fata împăratului Roș."
          },
          {
            subtitlu: "B. Nunta și fericirea veșnică",
            text: "Nunta este grandioasă și la ea participă toate ființele magice care l-au ajutat (Crăiasa furnicilor, Crăiasa albinelor, Sfânta Duminică). Veselia ține ani întregi și acum mai ține încă, semn al victoriei binelui, al triumfului eroului inițiat și al restabilirii echilibrului în lume."
          }
        ]
      }
    }
  },

  'baltagul': {
    titlu: 'Baltagul',
    autor: 'Mihail Sadoveanu',
    data: '1930',
    categorie: 'roman',
    canonic: true,
    descriere: 'Roman tradițional despre căutarea și răzbunarea soțului ucis.',
    teme: ['dreptatea', 'datoria familială', 'tradiția'],
    personaje: ['Vitoria Lipan', 'Nechifor Lipan', 'Gheorghiță', 'Minodora'],
    analiza: 'Sadoveanu creează un portret puternic al femeii țărănești prin personajul Vitoriei. Romanul explorează tema iubirii conjugale și a datoriei, Vitoria fiind gata să facă orice pentru a-și găsi soțul.',
    citate: [
      '"Vitoria Lipan, femeia cea bună"',
      '"Să-l găsesc pe Ghiță, să-l aduc acasă"',
      '"Baltagul în mână, inima plină de dor"'
    ],
    rezumat: {
        incipit: {
          sectiuni: [
            {
              subtitlu: "Legenda și contextul inițial",
              text: "Povestea începe cu o legendă despre cum Dumnezeu a împărțit neamurile pământului, lăsându-i pe munteni ultimii, dăruindu-le \"o inimă ușoară\" pentru a se bucura de puținul lor. Această poveste o spunea Nechifor Lipan la petreceri."
            },
            {
              subtitlu: "Situația Vitoriei Lipan",
              text: "Vitoria Lipan, nevasta lui Nechifor, stă singură pe prispă, torcând și așteptând. Soțul ei a plecat după oi la Dorna înainte de Sfântul Andrei (toamna) și nu s-a mai întors. Femeia încearcă să pătrundă cu gândul până la el, iar un vis rău îi confirmă temerile: îl vede pe Nechifor călare, cu spatele întors către ea, trecând o apă neagră spre apus - semn de moarte."
            },
            {
              subtitlu: "Situația inițială",
              text: "Au trecut peste 70 de zile de la plecarea lui Nechifor, iar lipsa oricărui semn sau mesaj o determină pe Vitoria să înceapă pregătirile pentru a afla adevărul.",
              listaProbe: [
                'Nechifor Lipan a plecat după oi la Dorna înainte de Sfântul Andrei;',
                'Nu s-a mai întors și nu a trimis niciun semn;',
                'Fiul lor Gheorghiță este aflat cu oile la iernatic la Jijiia;',
                'Visul rău al Vitoriei prefigurează moartea soțului.'
              ]
            }
          ]
        },
        intriga: {
          sectiuni: [
            {
              subtitlu: "Personajele principale și situația de bază",
              text: "Personajele care declanșează și susțin intriga sunt:",
              listaProbe: [
                'Vitoria Lipan - soția lui Nechifor, femeie inteligentă, perseverentă, cu ochi aprigi.',
                'Nechifor Lipan - cioban înstărit, a cărui dispariție este punctul de plecare al acțiunii.',
                'Gheorghiță - fiul adolescent, care o însoțește pe Vitoria în căutare.',
                'Calistrat Bogza și Ilie Cutui - cei doi munteni care l-au însoțit pe Nechifor de la Dorna.',
              ]
            },
            {
              subtitlu: "",
              text: 'Nechifor Lipan a plecat în toamnă să cumpere 300 de oi de la Dorna. Faptul că nu a trimis niciun semn și că băciul Alexa și Gheorghiță cer bani, fără a-l fi văzut pe Nechifor, confirmă suspiciunea unei nenorociri petrecute pe drum.'
            },
            {
              subtitlu: "Pregătirile Vitoriei și postul",
              text: "Vitoria înțelege că trebuie să acționeze, dar o face metodic, urmând rânduielile străvechi și cele bisericești (armonizarea lumii creștine cu cea arhaică):\n O duce pe fiica, Minodora, la mănăstirea Vărățicului (la maică Melania), pentru a o feri de rău.\n Face post de 12 vineri, se roagă la mănăstirea Bistrița (Sfânta Ana), se spovedește și se împărtășește.\n Vinde marfa negustorului David, cere părintelui Danilă să scrie jalba (plângerea oficială) și să binecuvânteze baltagul făcut pentru Gheorghiță (arma justiției).\n\nDupă aceste pregătiri, Vitoria și Gheorghiță pornesc la drum, urmând traseul oilor, cu o determinare de neclintit."
            }
          ]
        },
        desfasurarea: {
          sectiuni: [
            {
              subtitlu: "A. Drumul și primele indicii (Măgura - Dorna)",
              text: "Vitoria și Gheorghiță (cu cai, sanie și puști) pornesc în căutare. Femeia se comportă ca un detectiv neobosit, întrebând la fiecare han și cârciumă pe unde a trecut Nechifor.\n La Farcașa, asistă la o adunare condusă de subprefectul Anastase Balmez, învățând cum funcționează legea scrisă.\n La Borca și în alte sate găsește urme: Nechifor a trecut, purta cojoc de miel negru și căciulă brumarie (semne distinctive).\n Fierarul Pricop din Fărcașa îi confirmă că l-a potcovit pe calul lui Nechifor cu potcoave speciale."
            },
            {
              subtitlu: "B. Adevărul de la Vatra Dornei și traseul oilor",
              text: "La Vatra Dornei, Vitoria află de la un slujbaș neamț informația crucială:\n Nechifor a cumpărat 300 de oi de la Gheorghe Adamachi și Vasile Ursachi.\n A făcut învoială să vândă 100 de oi (partea sa de câștig) la doi munteni: Calistrat Bogza și Ilie Cutui.\n Cei trei au plecat împreună cu oile spre vale. Neamțul nu l-a mai văzut pe Nechifor de atunci.\n\nVitoria continuă urmărirea pe drumul oilor (Călugăreni, Broșteni, Paltiniș), adunând detalii (Nechifor a cerut să se binecuvânteze oile, i-a hrănit câinele)."
            },
            {
              subtitlu: "C. Descoperirea locului crimei",
              text: "Punctul de cotitură este la Suha, unde la domnu Iorgu Vasiliu, Vitoria descoperă că au ajuns doar doi călăreți: Bogza și Cutui. Nechifor a dispărut între Sabașa și Suha, pe muntele Stanisoara!\nBogza și Cutui, interogați de Vitoria, susțin că s-au despărțit de Nechifor la Crucea Italienilor și că acesta s-ar fi întors spre casă cu banii. Vitoria observă că se contrazic și insinuează inteligent că trebuia să fie un martor la vânzare.\n\nFemeia primește ajutor providențial de la soția lui Vasiliu, Cucoana Maria, și de la domnul Toma din Sabașa. Dar cel mai important indiciu este câinele."
            },
            {
              subtitlu: "D. Ajutorul câinelui Lupu",
              text: "La Sabașa, Vitoria îl găsește pe câinele lui Nechifor, Lupu, la un gospodar. Câinele o recunoaște imediat și se manifestă zgomotos, dovedind loialitate. Vitoria realizează că Lupu, care se ducea periodic într-o zonă din munți, știe adevărul. Îl ia pe Lupu în lanț pentru a-l ghida."
            }
          ]
        },
        punctulCulminant: {
          sectiuni: [
            {
              subtitlu: "A. Găsirea trupului",
              text: "Cu câinele Lupu în frunte, Vitoria și Gheorghiță trec din nou Stanisoara. Când ajung la un pod, Lupu devine neliniștit, latră și trage cu putere spre o râpă. Gheorghiță îl urmează în prăpastie. \n\nÎn adâncul văgăunii, sub mal, găsesc: osemintele lui Nechifor Lipan, scheletul calului, cojocul, căciula brumarie, chimirul și tașca goală, și, cel mai important, căpătâna spartă de baltag - dovada crimei. Vitoria strânge osemintele, aprinde o făclie și trimite după autorități."
            },
            {
              subtitlu: "B. Înscenarea dezvăluirii la Pomană",
              text: "Vitoria raportează cele descoperite autorităților (subprefect, doctor, procuror) și cere ca Bogza și Cutui să fie anchetați. Subprefectul decide să-i cheme pe cei doi la înmormântare pentru \"confruntare cu cadavrul\".\n\nLa masa de pomană de la Sabașa, Vitoria pune în scenă dezvăluirea: cere să vadă baltagul lui Bogza și o povestește cu detalii șocante, deși nu fusese de față, reconstituind crima prin intuiție și logică: cum Bogza l-a lovit pe Nechifor pe la spate în cap, cum calul și omul au fost împinși în prăpastie, și cum câinele a încercat să-l apere."
            },
            {
              subtitlu: "C. Mărturisirea și justiția",
              text: "Bogza, uluit că femeia știe totul și simțind că nu mai poate scăpa, explodează, se repede după baltag. Gheorghiță sloboade câinele Lupu, care se năpustește asupra ucigașului. Gheorghiță îl lovește pe Bogza cu baltagul în frunte (împlinind astfel justiția), iar Bogza, rănit mortal, mărturisește: \"Am pălît într-adevăr pe Nechifor Lipan și l-am prăvălit în râpă\". Recunoaște că au vrut să-i ia oile."
            }
          ]
        },
        deznodamant: {
          sectiuni: [
            {
              subtitlu: "A. Restabilirea ordinii și pedeapsa",
              text: "Imediat după mărturisire, Bogza moare pe prispă. Cutui este arestat și confirmă faptele. Ordinea este restabilită: Nechifor primește dreptate, iar ucigașii sunt pedepsiți. Turma de oi va fi returnată familiei Lipan."
            },
            {
              subtitlu: "B. Planurile de reîntoarcere la viață",
              text: "Vitoria, cu aceeași minte limpede și puternică, planifică următoarele rânduieli pentru a reface echilibrul vieții:\n Plătește pe toți cei care au ajutat și face parastasul de 3 zile pentru Nechifor.\n Merge la Ștefănești (Prut) să vadă turma de la Rarău și să rezolve problemele administrative.\n Pregătește întoarcerea oilor la munte la păsunea de vară.\n Va aduce pe Minodora de la mănăstire să vadă mormântul.\n Se va întoarce la Măgura pentru a-și relua viața, alături de Gheorghiță, transformat acum în bărbat. Refuză categoric o căsătorie nepotrivită pentru Minodora."
            }
          ]
        }
      }
  },
  'mara': {
    titlu: 'Mara',
    autor: 'Ioan Slavici',
    data: '1894',
    categorie: 'roman',
    canonic: true,
    descriere: 'Roman realist despre destinul unei mame care își sacrifică viața pentru copii.',
    teme: ['familia', 'educația', 'tradiția'],
    personaje: ['Mara', 'Persida', 'Trică', 'Bandi', 'Natl'],
    analiza: 'Slavici creează un portret autentic al femeii transilvănene prin personajul Marei. Romanul explorează conflictul dintre tradiție și modernitate, Mara reprezentând valorile tradiționale în fața schimbărilor sociale.',
    citate: [
      '"Mara, femeia cea bună"',
      '"Tradițiile nu se uită"',
      '"Viața e grea, dar trebuie să o duci"'
    ]
  },
  'ultima-noapte-dragoste': {
    titlu: 'Ultima noapte de dragoste, întâia noapte de război',
    autor: 'Camil Petrescu',
    data: '1930',
    categorie: 'roman',
    canonic: true,
    descriere: 'Roman psihologic ce surprinde iubirea pasională și experiența războiului.',
    teme: ['iubirea', 'gelozia', 'războiul', 'luciditatea'],
    personaje: ['Ștefan Gheorghidiu', 'Ela'],
    analiza: 'Petrescu creează un roman psihologic complex, explorând interiorul uman în contextul războiului. Opera se caracterizează prin tehnici narrative moderne și analiza profundă a psihologiei personajelor.',
    citate: [
      '"Ultima noapte de dragoste"',
      '"Întâia noapte de război"',
      '"Psihologia e totul"'
    ]
  },
  'enigma-otiliei': {
    titlu: 'Enigma Otiliei',
    autor: 'George Călinescu',
    data: '1938',
    categorie: 'roman',
    canonic: true,
    descriere: 'Roman realist-balzacian despre moștenire și formarea tinerilor.',
    teme: ['iubirea', 'moștenirea', 'educația', 'maturizarea'],
    personaje: ['Otilia Marculescu', 'Felix Sima', 'moș Costache', 'Aglae', 'Pascalopol'],
    analiza: 'Călinescu creează un roman realist complex, explorând psihologia personajelor și atmosfera societății interbelice. Otilia reprezintă enigma feminității moderne, iar Felix este tipul intelectualului confuz.',
    citate: [
      '"Enigma Otiliei"',
      '"Felix Sima, intelectualul confuz"',
      '"Bucureștiul interbelic"'
    ],
    rezumat: 
    {
      incipit: {
        sectiuni: [
          {
            subtitlu: "Sosirea lui Felix Sima în București",
            text: "Romanul debutează în iulie 1909, cu sosirea lui Felix Sima, un tânăr orfan de 18 ani, la București, pentru a locui la tutorele său legal, Costache Giurgiuveanu, și a urma studiile de medicină. Este prezentată descrierea detaliată a străzii Antim, element al tehnicii balzaciene, care anticipează lumea stranie și misterioasă a familiei Tulea."
          },
          {
            subtitlu: "Atmosfera și casa Giurgiuveanu",
            text: "Descrierea casei lui Costache Giurgiuveanu, cu aspectul ei de cocioabă, scoate în evidență o ambianță ciudată, plină de mister, dar și de dezordine, reflectând firea avarului proprietar. De la intrare, Felix este întâmpinat cu replica celebră: 'Nu-nu știu... nu-nu stă nimeni aici!'"
          },
          {
            subtitlu: "Temele principale",
            text: "Opera este un roman realist balzacian ce prezintă societatea bucureșteană de la începutul secolului XX. Temele principale sunt: lupta pentru moștenire, avaritia, arivismul, complexitatea feminină și maturizarea (Bildungsroman) tânărului Felix."
          }
        ]
      },
      intriga: {
        sectiuni: [
          {
            subtitlu: "Lumea bizară a familiei Tulea",
            text: "Odată ajuns în casă, Felix descoperă lumea bizară a familiei Tulea: Aglae, sora lui Costache, împreună cu fetele ei, Aurica și Olimpia, și ginerele Stănică Rațiu. Această familie este dominată de ipocrizie, meschinărie și lăcomie, fiind obsedată de averea bătrânului."
          },
          {
            subtitlu: "Obiectul disputei: moștenirea și Otilia",
            text: "În centrul disputei se află moștenirea lui Costache, un avar ce nu își dezvăluie niciodată averea, dar și Otilia Mărculescu, o tânără enigmatică și protejată a acestuia, care nu are o situație materială legal asigurată. Otilia este disputată afectiv de Felix Sima și de celălalt protector al ei, boierul Leonida Pascalopol."
          },
          {
            subtitlu: "Elementul perturbator",
            text: "Intriga este declanșată de sosirea lui Felix Sima, care devine o amenințare la adresa planurilor familiei Tulea, deoarece prezența sa (ca moștenitor legal al tatălui său) și idila sa cu Otilia complică și mai mult lupta pentru banii bătrânului Giurgiuveanu."
          }
        ]
      },
      desfasurarea: {
        sectiuni: [
          {
            subtitlu: "Conflictul succesoral și arivismul",
            text: "Conflictul succesoral se intensifică. Aglae Tulea, considerând-o pe Otilia o intrusă, încearcă prin diverse metode să pună mâna pe averea fratelui său. Principalul instrument al acesteia este Stănică Rațiu, un avocat parvenit, abil și intrigant, obsedat de ascensiunea socială. Stănică manipulează pe toată lumea, fiind interesat de averea soției sale, Olimpia (care se măritase cu el pentru a scăpa de acasă), dar și de banii lui Costache."
          },
          {
            subtitlu: "Idila și enigma Otiliei",
            text: "Felix se îndrăgostește de Otilia. Relația lor este însă contrazisă de comportamentul enigmatic al fetei, care oscilează între o atitudine de soră, o afecțiune sinceră și flirtul cu Pascalopol. Felix este un spirit rațional, iar Otilia este o fire romantică, libertină și imprevizibilă. Ea îl iubește pe Felix, dar este conștientă că o căsătorie cu el i-ar înfrâna viitorul, impunându-i o viață grea de student sărac."
          },
          {
            subtitlu: "Portretele realiste și comedia umană",
            text: "Călinescu realizează o galerie de personaje memorabile care ilustrează defecte umane (avaritia, meschinăria, arivismul): Avaritia lui Costache ('Bani nu-nu-s'), meschinăria Aglaei (care nu se sfiește să o alunge pe Otilia din casă la moartea fratelui), fanariotismul discret al lui Pascalopol (un boier cultivat, dar care acceptă rolul său ambiguu de protector al Otiliei) și arivismul lui Stănică Rațiu, care este prototipul omului fără scrupule."
          },
          {
            subtitlu: "Evoluția lui Felix (Bildungsroman)",
            text: "Felix evoluează de la stadiul de adolescent naiv la cel de tânăr matur. El se concentrează pe studii, luând o decizie pragmatică: să nu-i lege destinul Otiliei, ci să se concentreze pe carieră. El înțelege treptat complexitatea Otiliei și a relațiilor umane, acceptând că fericirea se află în împlinirea profesională."
          }
        ]
      },
      punctulCulminant: {
        sectiuni: [
          {
            subtitlu: "Moartea lui Costache Giurgiuveanu",
            text: "Momentul culminant al luptei pentru moștenire este declanșat de boala și moartea lui Costache. Bătrânul suferă mai multe atacuri cerebrale. Cu o precizie diabolică, Stănică Rațiu, sub pretextul că are grijă de el, pătrunde în camera lui Costache și îi fură toți banii ascunși, lăsându-l fără apărare. Avarul moare sărac, sub privirile neputincioase ale familiei. După moartea lui, Aglae o alungă imediat pe Otilia din casă."
          },
          {
            subtitlu: "Decizia Otiliei",
            text: "Otilia, conștientă că rămânerea alături de Felix i-ar compromite viitorul și că ar ajunge o povară, îl părăsește. Ea alege să se căsătorească cu Pascalopol, cel care îi putea oferi securitatea financiară și stabilitatea pe care Felix, student sărac, nu i-o putea oferi la acel moment. Felix acceptă resemnat decizia Otiliei și pleacă la Iași pentru a-și continua studiile, rupând orice legătură cu familia Tulea."
          },
          {
            subtitlu: "Reîntâlnirea și revelația",
            text: "Punctul culminant al destinului Otiliei este reîntâlnirea de după mulți ani dintre Felix și Pascalopol. Felix, devenit între timp un medic reputat, se întâlnește cu Pascalopol la Paris și află că Otilia l-a părăsit pe acesta și s-a recăsătorit cu un conte. Pascalopol îi arată lui Felix o fotografie a Otiliei, transformată într-o femeie matură și banală."
          }
        ]
      },
      deznodamant: {
        sectiuni: [
          {
            subtitlu: "Înțelegerea finală a enigmei",
            text: "Felix înțelege că Otilia este o enigmă, o ființă complexă și imprevizibilă, care, prin decizia ei de a se căsători cu un conte, a căutat o viață de lux și aventură. Finalul romanului este ambiguu, Otilia fiind descrisă ca o femeie frumoasă, dar banalizată de trecerea timpului."
          },
          {
            subtitlu: "Destinul lui Felix și al familiei Tulea",
            text: "Felix Sima devine un medic reputat și se căsătorește cu o femeie dintr-o clasă socială superioară. El nu uită însă niciodată prima sa iubire, Otilia. Destinul familiei Tulea este amar: Stănică Rațiu reușește să parvină (devine politician, divorțează și se recăsătorește), dar Aglae, incapabilă să obțină averea lui Costache, rămâne tot o femeie meschină, iar Aurica moare singură și nebună. Avarul Costache a fost singurul care și-a păstrat averea, într-un mod simbolic, refuzând să o împartă până la moarte."
          },
          {
            subtitlu: "Reflecția finală",
            text: "Ultima replică a lui Felix, rostită în fața casei bătrânului, este: 'Aici nu stă nimeni'. Ea reia replica de la începutul romanului, dar cu o semnificație profundă: acum, casa este cu adevărat goală, iar misterul și viața au dispărut. Felix păstrează vie doar amintirea enigmaticei Otilia, simbol al tinereții și al iluziilor pierdute."
          }
        ]
      }
    }
  },
  'morometii': {
    titlu: 'Moromeții',
    autor: 'Marin Preda',
    data: '1955/1967',
    categorie: 'roman',
    canonic: true,
    descriere: 'Roman realist despre destrămarea unei familii de țărani din Câmpia Dunării.',
    teme: ['familia', 'satul tradițional', 'schimbarea socială'],
    personaje: ['Ilie Moromete', 'Catrina', 'Niculae', 'Paraschiv', 'Achim', 'Nilă'],
    analiza: 'Preda creează un roman epic despre transformările societății românești prin prisma familiei Moromeților. Opera explorează conflictul dintre tradiție și modernitate, între vechi și nou.',
    citate: [
      '"Ilie Moromete, țăranul înțelept"',
      '"Catrina, femeia puternică"',
      '"Tradițiile se schimbă"'
    ]
  },
  'plumb': {
    titlu: 'Plumb',
    autor: 'George Bacovia',
    data: '1916',
    categorie: 'poezie',
    canonic: true,
    descriere: 'Poezie simbolistă ce exprimă singurătatea și moartea prin simbolul „plumbului”.',
    teme: ['moartea', 'singurătatea', 'neputința comunicării'],
    personaje: ['eul liric'],
    analiza: 'Bacovia creează o atmosferă de melancolie profundă prin metafora plumbului, care sugerează greutatea și monotonia existenței. Poezia explorează tema singurătății și a tristeții prin imagini concrete și simbolice.',
    citate: [
      '"Dormeau adânc sicriele de plumb"',
      '"Stam singur în cavou... și era vânt"',
      '"Și-i atârnau aripile de plumb"'
    ]
  },
  'testament': {
    titlu: 'Testament',
    autor: 'Tudor Arghezi',
    data: '1927',
    categorie: 'poezie',
    canonic: true,
    descriere: 'Poezie manifest despre menirea artei și moștenirea spirituală.',
    teme: ['arta', 'moștenirea', 'creația'],
    personaje: ['eul liric'],
    analiza: 'Arghezi creează o poezie-manifest despre rolul poetului în societate și despre transformarea experienței dureroase în artă. Opera explorează tema moștenirii culturale și a responsabilității artistului.',
    citate: [
      '"Nu-ți voi lăsa drept bunuri, după moarte"',
      '"Cartea mea-i, fiule, o treaptă"',
      '"Din bube, mucegaiuri și noroi / Iscat-am frumuseți și prețuri noi"'
    ]
  },
  'flori-de-mucigai': {
    titlu: 'Flori de mucigai',
    autor: 'Tudor Arghezi',
    data: '1919',
    categorie: 'poezie',
    canonic: true,
    descriere: 'Volum liric inspirat de experiența detenției, cu poezii despre degradare și suferință.',
    teme: ['existența', 'degradarea', 'creația din suferință'],
    personaje: ['eul liric'],
    analiza: 'Arghezi creează o poezie despre puterea creatoare care poate transforma chiar și mizeria în artă. Opera explorează tema creației artistice în condiții extreme și a transformării experienței dureroase în frumusețe.',
    citate: [
      '"Le-am scris cu unghia pe tencuială"',
      '"Sunt stihuri fără an, / Stihuri de groapă"',
      '"Și m-am silit să scriu cu unghiile de la mâna stângă"'
    ]
  },
  'eu-nu-strivesc-corola-de-minuni-a-lumii': {
    titlu: 'Eu nu strivesc corola de minuni a lumii',
    autor: 'Lucian Blaga',
    data: '1919',
    categorie: 'poezie',
    canonic: true,
    descriere: 'Poezie filozofică despre misterul existenței și atitudinea creatorului.',
    teme: ['misterul', 'cunoașterea', 'iubirea'],
    personaje: ['eul liric'],
    analiza: 'Blaga creează o poezie despre rolul poetului în descoperirea misterului existenței. Opera explorează tema tainei universale și a modului în care poezia poate dezvălui misterul lumii.',
    citate: [
      '"Eu nu strivesc corola de minuni a lumii"',
      '"eu cu lumina mea sporesc a lumii taină"',
      '"căci eu iubesc / și flori și ochi și buze și morminte"'
    ]
  },
  'leoaica-tanara-iubirea': {
    titlu: 'Leoaică tânără, iubirea',
    autor: 'Nichita Stănescu',
    data: '1964',
    categorie: 'poezie',
    canonic: true,
    descriere: 'Poezie modernă despre experiența iubirii ca forță revelatoare.',
    teme: ['iubirea', 'cunoașterea', 'existența'],
    personaje: ['eul liric'],
    analiza: 'Stănescu creează o poezie despre iubire ca forță primitivă și transformatoare. Opera explorează tema iubirii prin metafore animalice și imagini senzoriale puternice.',
    citate: [
      '"Leoaică tânără, iubirea / mi-a sărit în față"',
      '"m-a mușcat leoaica, azi, de față"',
      '"o leoaică aramie / cu mișcările viclene"'
    ]
  },
  'aci-sosi-pe-vremuri': {
    titlu: 'Aci sosi pe vremuri',
    autor: 'Ion Pillat',
    data: '1923',
    categorie: 'poezie',
    canonic: true,
    descriere: 'Poezie tradiționalistă evocând trecutul și trecerea timpului.',
    teme: ['nostalgia', 'timpul', 'familia'],
    personaje: ['eul liric'],
    analiza: 'Pillat creează o poezie despre amintire și tradiții familiale. Opera explorează tema legăturii cu trecutul și a frumuseții naturii românești prin povestea bunicii.',
    citate: [
      '"Aci sosi pe vremuri bunica-mi Calyopi"',
      '"Privind cu ea sub luna câmpia ca un lac"',
      '"Si totul ce romantic, ca-n basme, se urzea"'
    ]
  },
  'in-gradina-ghetsimani': {
    titlu: 'În Grădina Ghetsimani',
    autor: 'Vasile Voiculescu',
    data: '1921',
    categorie: 'poezie',
    canonic: true,
    descriere: 'Poezie religioasă despre suferința lui Hristos înaintea răstignirii.',
    teme: ['credința', 'sacrificiul', 'suferința'],
    personaje: ['eul liric', 'Hristos'],
    analiza: 'Voiculescu creează o poezie despre lupta dintre bine și rău, despre sacrificiul și refuzul răului. Opera explorează tema puterii divine și a alegerii morale.',
    citate: [
      '"Iisus lupta cu soarta și nu primea paharul"',
      '"Dar nu voia s-atingă infama băutură"',
      '"Bătându-se cu moartea, uitase de viață!"'
    ]
  },
  'riga-crypto': {
    titlu: 'Riga Crypto și Lapona Enigel',
    autor: 'Ion Barbu',
    data: '1930',
    categorie: 'poem',
    canonic: true,
    descriere: 'Poem alegoric despre incompatibilitatea dintre două lumi.',
    teme: ['iubirea', 'incompatibilitatea', 'destinul'],
    personaje: ['Riga Crypto', 'Lapona Enigel'],
    analiza: 'Barbu creează un poem alegoric despre incompatibilitatea dintre două lumi.',
    citate: [
      
    ]
  },
  'lapusneanu': {
    titlu: 'Alexandru Lăpușneanu',
    autor: 'Costache Negruzzi',
    data: '1840',
    categorie: 'nuvelă',
    canonic: true,
    descriere: 'Nuvelă istorică despre domnia crudă a lui Lăpușneanu.',
    teme: ['puterea', 'răzbunarea', 'istoria'],
    personaje: ['Alexandru Lăpușneanu', 'Ruxanda', 'Moțoc'],
    analiza: 'Negruzzi creează o nuvelă istorică despre complexitatea puterii și alegerilor morale.',
    citate: [
      '"Dacă voi nu mă vreți, eu vă vreau"'
    ]
  },
  'maitreyi': {
    titlu: 'Maitreyi',
    autor: 'Mircea Eliade',
    data: '1933',
    categorie: 'roman',
    canonic: true,
    descriere: 'Roman exotic despre iubirea pasională dintre un european și o tânără indiană.',
    teme: ['iubirea', 'diferențele culturale', 'pasiunea'],
    personaje: ['Allan', 'Maitreyi', 'Narendra Sen'],
    analiza: 'Eliade creează un roman despre dragostea imposibilă și inițierea prin prisma diferențelor culturale.',
    citate: [
      '"Maitreyi, dragostea imposibilă"'
    ]
  },
  'critice': {
    titlu: 'Formele fără fond',
    autor: 'Titu Maiorescu',
    data: '1868',
    categorie: 'eseu',
    canonic: true,
    descriere: 'Eseu critic ce denunță imitațiile culturale fără bază reală.',
    teme: ['critica socială', 'cultura', 'modernizarea falsă'],
    personaje: ['– (eseu)'],
    analiza: 'Maiorescu formulează teoria formelor fără fond, criticând importul de instituții și modele fără suport real în societate.',
    citate: []
  },
  'hanul-ancutei': {
    titlu: 'Hanul Ancuţei',
    autor: 'Mihail Sadoveanu',
    data: '1928',
    categorie: 'nuvelă',
    canonic: true,
    descriere: 'Volum de povestiri în ramă, relatate la han.',
    teme: ['oralitatea', 'trecutul', 'legenda'],
    personaje: ['Ancuța', 'povestitorii (Moș Leonte, Ioniță comisul, alții)'],
    analiza: 'Sadoveanu creează o nuvelă despre atmosfera unui han moldovenesc și despre tradițiile rurale. Opera explorează tema schimbărilor sociale prin prisma unui han tradițional.',
    citate: [
      '"Hanul Ancuței, locul întâlnirilor"'
    ]
  }
};

export default OPERA_DETAILS;



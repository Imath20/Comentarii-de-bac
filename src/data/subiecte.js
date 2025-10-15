const subiecteList = [
    {
        titlu: `Grigore Băjenaru, 
        Părintele „Geticei" `,
        descriere: 'Citește urmatorul fragment al lui Grigore Băjenaru și rezolvă cerințele date.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2025',
        an: 2025,
        sesiune: 'sesiune de vară',
        tip: 'analiza',
        text: `Era în anul universitar 1926-1927, prin octombrie, la Facultatea de Filozofie și Litere din București. Toți profesorii începuseră să-și inaugureze cursurile și, la unii dintre ei, sălile erau pline până la refuz. Cea mai mare afluență o găseai la cursurile lui N. Iorga, Vasile Pârvan, Mihail Dragomirescu, C.C. Giurescu, Charles Drouhet, Ovid Densusianu și I. Aurel Candrea; la unii, pentru talentul oratoric; la alții, pentru știința pură, iar la cei din a treia categorie, și pentru oratorie, și pentru știință. 
Profesorul Vasile Pârvan, care preda „Arheologia”, era și un foarte bun vorbitor, și un excepțional om de știință [...].
La deschiderea cursului său, sala „Odobescu” era ticsită nu numai de studenți, ci și de îndrăgostiții de rara măiestrie a profesorului de a prezenta arheologia, cu un neîntrecut farmec poetic. [...] 
În sală stăpânea rumoarea obișnuită în toate sălile de conferințe în asemenea ocazii. Lumea își împărtășește păreri, face aprecieri, caracterizări și pronosticuri, nu se poate abține să nu vorbească și este firesc să fie așa. 
Deodată, orice șoaptă încetă brusc și asistența se ridică în picioare, începând să aplaude. 
La început n-am putut zări pe nimeni. Soarele de toamnă, în crepuscul, străbătea palid și delicat pe ferestrele largi ale sălii de curs, prefirându-și ultimele raze [...]. Părea o aureolă estompată, care totuși îmi luă ochii pentru o clipă numai. Privirea mi se obișnui instantaneu și, în spatele catedrei, zării un omuleț, cu o figură nespus de simpatică, așteptând momentul prielnic să-și înceapă alocuțiunea*. Ochii-i, extrem de vioi, îi străluceau de o neobișnuită inteligență. Și, cu toate că de statură mică, bărbatul de la catedră îți impunea, de la început chiar, prin atitudinea sa hotărâtă, dârză, așa cum pe timpuri probabil, impresionaseră faimoșii conducători de oști: Alexandru Macedon, Ștefan cel Mare și Napoleon, nici ei prea mari de statură.
Plecându-și ușor capul, în semn de răspuns la salutul ce-i fusese adresat prin ridicarea în picioare și aplauze, profesorul se adresă asistenței cu voce caldă și pătrunzătoare: 
— Cei care mă cunosc din anii trecuți s-au obișnuit cu mine; cei noi vor fi surprinși să constate că au în fața dumnealor un om cu înfățișare modestă, mic de stat… un om care-și ilustrează perfect numele: Pârvan… numele vine de la „parvus”, adică mic, biet… fără o înfățișare arătoasă, deci „parvus” – „parvanus” ‒ „pârvan”...!
Un ropot de aplauze pornite din suflet răsplăti din plin gluma strălucitului profesor. [...] 
Toți îl ascultam într-o tăcere desăvârșită, religioasă, într-o admirație deosebită. Eu îi sorbeam cuvintele și aș fi dorit ca alocuțiunea lui, ce mă fermecase ca nicio alta până atunci, să dureze ore întregi, dacă ar fi fost posibil. 
Căci în fața noastră, a studenților săi extaziați de maestrul lor, nu vorbea un profesor universitar oarecare, ci un bărbat care, până la vârsta de 45 de ani neîmpliniți, urcase cu strălucire toate treptele gloriei științifice și universitare și se afla acum în vârful piramidei, încununarea prodigioasei sale activități istorice fiind faimoasa lucrare Getica – o protoistorie a Daciei.`,
        cerinte: [
            'Indică sensul din text al cuvântului prielnic și al secvenței pe timpuri.  ',
            'Menționează o caracteristică a profesorilor la al căror curs de inaugurare sălile erau pline, valorificând textul dat. ',
            'Precizează momentul zilei în care are loc cursul de inaugurare susținut de Vasile Pârvan, justificându-ți răspunsul cu o secvență din text. ',
            'Explică un motiv pentru care Vasile Pârvan face referire la originea numelui său.',
            'Prezintă, în 30-50 de cuvinte, atmosfera din sala „Odobescu”, de dinaintea începerii cursului susținut de Vasile Pârvan, așa cum reiese din textul dat. ',
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Redactează un text ',
        descriere: 'Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă înfățișarea unei persoane poate influența sau nu succesul acesteia.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2025',
        an: 2025,
        sesiune: 'sesiune de vară',
        tip: 'redactare',
        text: `Era în anul universitar 1926-1927, prin octombrie, la Facultatea de Filozofie și Litere din București. Toți profesorii începuseră să-și inaugureze cursurile și, la unii dintre ei, sălile erau pline până la refuz. Cea mai mare afluență o găseai la cursurile lui N. Iorga, Vasile Pârvan, Mihail Dragomirescu, C.C. Giurescu, Charles Drouhet, Ovid Densusianu și I. Aurel Candrea; la unii, pentru talentul oratoric; la alții, pentru știința pură, iar la cei din a treia categorie, și pentru oratorie, și pentru știință. 
        Profesorul Vasile Pârvan, care preda „Arheologia”, era și un foarte bun vorbitor, și un excepțional om de știință [...].
        La deschiderea cursului său, sala „Odobescu” era ticsită nu numai de studenți, ci și de îndrăgostiții de rara măiestrie a profesorului de a prezenta arheologia, cu un neîntrecut farmec poetic. [...] 
        În sală stăpânea rumoarea obișnuită în toate sălile de conferințe în asemenea ocazii. Lumea își împărtășește păreri, face aprecieri, caracterizări și pronosticuri, nu se poate abține să nu vorbească și este firesc să fie așa. 
        Deodată, orice șoaptă încetă brusc și asistența se ridică în picioare, începând să aplaude. 
        La început n-am putut zări pe nimeni. Soarele de toamnă, în crepuscul, străbătea palid și delicat pe ferestrele largi ale sălii de curs, prefirându-și ultimele raze [...]. Părea o aureolă estompată, care totuși îmi luă ochii pentru o clipă numai. Privirea mi se obișnui instantaneu și, în spatele catedrei, zării un omuleț, cu o figură nespus de simpatică, așteptând momentul prielnic să-și înceapă alocuțiunea*. Ochii-i, extrem de vioi, îi străluceau de o neobișnuită inteligență. Și, cu toate că de statură mică, bărbatul de la catedră îți impunea, de la început chiar, prin atitudinea sa hotărâtă, dârză, așa cum pe timpuri probabil, impresionaseră faimoșii conducători de oști: Alexandru Macedon, Ștefan cel Mare și Napoleon, nici ei prea mari de statură.
        Plecându-și ușor capul, în semn de răspuns la salutul ce-i fusese adresat prin ridicarea în picioare și aplauze, profesorul se adresă asistenței cu voce caldă și pătrunzătoare: 
        — Cei care mă cunosc din anii trecuți s-au obișnuit cu mine; cei noi vor fi surprinși să constate că au în fața dumnealor un om cu înfățișare modestă, mic de stat… un om care-și ilustrează perfect numele: Pârvan… numele vine de la „parvus”, adică mic, biet… fără o înfățișare arătoasă, deci „parvus” – „parvanus” ‒ „pârvan”...!
        Un ropot de aplauze pornite din suflet răsplăti din plin gluma strălucitului profesor. [...] 
        Toți îl ascultam într-o tăcere desăvârșită, religioasă, într-o admirație deosebită. Eu îi sorbeam cuvintele și aș fi dorit ca alocuțiunea lui, ce mă fermecase ca nicio alta până atunci, să dureze ore întregi, dacă ar fi fost posibil. 
        Căci în fața noastră, a studenților săi extaziați de maestrul lor, nu vorbea un profesor universitar oarecare, ci un bărbat care, până la vârsta de 45 de ani neîmpliniți, urcase cu strălucire toate treptele gloriei științifice și universitare și se afla acum în vârful piramidei, încununarea prodigioasei sale activități istorice fiind faimoasa lucrare Getica – o protoistorie a Daciei.`,
        cerinte: [
            'Cerințe totale: Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă înfățișarea unei persoane poate influența sau nu succesul acesteia, raportându-te atât la informațiile din textul Părintele „Geticei” de Grigore Băjenaru, cât și la experiența personală sau culturală, respectând reperele de conținut și de redactare.',
            'Sumar conținut: formulează o opinie clară cu privire la temă, enunță și dezvoltă două argumente adecvate opiniei, sprijinite pe exemple/raționamente pertinente, și încheie cu o concluzie coerentă.',
            'Sumar redactare: utilizează corect conectorii în argumentare; respectă normele limbii literare (exprimare, ortografie, punctuație), așezarea în pagină și lizibilitatea; respectă precizarea privind numărul minim de cuvinte.'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Prezentarea unui fragment literar',
        descriere: 'Prezintă, în minimum 50 de cuvinte, rolul notațiilor autorului în fragmentul de mai jos. ',
        numarSubiect: 2,
        profil: 'real',
        data: '2025',
        an: 2025,
        sesiune: 'sesiune de vară',
        tip: 'eseu',
        text: `ACTUL I 
        TABLOUL I 
        Încăpere strâmtă, săracă, dar curată, în casa curelarului Ion Sorcovă.  
        În mijloc, ușă deschisă: se văd poarta și strada, iar dincolo de stradă, maidan de gunoi, tăiat în două de linia ferată. În dreapta ușii, fereastră cu perdele albe și mușcate roșii. În stânga ușii, un dulap de lemn. În colț, pat de scânduri [...]. 
        E în amurg și ultimele raze ale soarelui împurpurează perdelele albe. [...] 
        SCENA II 
        SORCOVĂ, NASTASIA, VULPAȘIN 
        VULPAȘIN (s-a oprit în prag, sfielnic, se descoperă; e în cămașă, cu mânecile sumese și palmele murdare, așa cum a ieșit din atelier; dând cu ochii de Nastasia, tresare și coboară privirea): Bună seara! (Nu știe ce să facă cu pălăria.) 
        NASTASIA (s-a întunecat, nemulțumire). 
        SORCOVĂ: Noroc, Vulpașine! 
        VULPAȘIN (încearcă surâs și se apropie de Nastasia cu mâna întinsă): Îmi pare bine că te văd! 
        NASTASIA (îi întoarce spatele și iese, trântind ușa). 
        G.M. Zamfirescu, Domnișoara Nastasia  `,
        cerinte: [
            `Prezintă, în minimum 50 de cuvinte, rolul notațiilor autorului în fragmentul de mai jos. `,
            `Conținut: precizează rolul notațiilor autorului în fragmentul de mai jos`,
            `Redactare: utiliză corect conectorii în argumentare; respectă normele limbii literare (exprimare, ortografie, punctuație), așezarea în pagină și lizibilitatea`,
        ],
        punctaj: [
            `Total: 10`,
            `Conținut: 6(precizează rolul notațiilor autorului în fragmentul de mai jos)`,
            `Redactare: 4(utilizarea limbii literare – 1 punct; logica înlănțuirii ideilor – 1 punct; ortografia – 1 punct; punctuaţia – 1 punct)`,
        ]
    },
    {
        titlu: 'Redactare eseu',
        descriere: 'Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități de construcție a unui personaj într-un text narativ studiat, aparținând lui Ion Creangă sau lui Ioan Slavici.',
        numarSubiect: 3,
        profil: 'real',
        data: '2025',
        an: 2025,
        sesiune: 'sesiune de vară',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități de construcție a unui personaj într-un text narativ studiat, aparținând lui Ion Creangă sau lui Ioan Slavici. În elaborarea eseului, vei avea în vedere următoarele repere: – prezentarea statutului social, psihologic, moral etc. al personajului ales; – evidențierea unei trăsături a personajului ales, prin două episoade/secvențe comentate; – analiza a două elemente de structură, de compoziție și/sau de limbaj ale textului narativ studiat, relevante pentru construcția personajului ales (de exemplu: acțiune, conflict, modalități de caracterizare, relații temporale și spațiale, incipit, final, tehnici narative, instanțe ale comunicării narative, registre stilistice, limbaj etc.). Notă Ordinea integrării reperelor în cuprinsul eseului este la alegere. Pentru conţinutul eseului, vei primi 18 puncte (câte 6 puncte pentru fiecare cerinţă/reper). Pentru redactarea eseului, vei primi 12 puncte (existența părților componente – introducere, cuprins, încheiere – 1 punct; logica înlănțuirii ideilor – 1 punct; abilități de analiză și de argumentare – 3 puncte; utilizarea limbii literare – 2 puncte; ortografia – 2 puncte; punctuaţia – 2 puncte; așezarea în pagină, lizibilitatea – 1 punct). În vederea acordării punctajului pentru redactare, eseul trebuie să aibă minimum 400 de cuvinte şi să dezvolte subiectul propus.`,
        cerinte: [
            'Prezintă statutul social, psihologic, moral etc. al personajului ales',
            'Evidențiază o trăsătură a personajului ales, prin două episoade/secvențe comentate',
            'Analizează două elemente de structură, compoziție și/sau limbaj relevante pentru construcția personajului'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'Nichifor Crainic, Pribeag în țara mea. Sub mască. Memorii',
        descriere: 'Citește următorul fragment al lui Nichifor Crainic și rezolvă cerințele date.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2025',
        an: 2025,
        sesiune: 'rezervă',
        tip: 'analiza',
        text: `Am ajuns cu trenul într-o seară de toamnă. E o mică localitate minieră, unde lumea e obișnuită cu vizitatori străini. Casă arătoasă, iar în față un rând de dalii înalte, roșii, violete și galbene care, la lumina becului electric, arătau feeric. Soțul, funcționar public; ea, absolventă de liceu și un băiețaș de cinci ani și jumătate, care avea să fie prietenul meu. Mă cunoșteau din casa învățătoarei și știau că sunt unchiul lor din Bucovina. M-au primit prietenos ca pe o rudă despre care nu știau mare lucru [...]. 
La puțin timp după sosirea mea, stăpâna casei a căzut bolnavă și avea să zacă o lună și jumătate, îngrijită de medicul circumscripției locale. M-am oferit să duc eu gospodăria, aducându-mi aminte că, la mama acasă, deși copil încă, făcusem lucrul acesta cu îndemânare. Când părinții plecau la muncă, lăsau totul în seama mea, îngrijeam un frate și surorile mai mici, vedeam de orătănii* spre bucuria mamei [...].  
Întâia grijă era să pregătesc hrana porcilor, fierbând cartofii, dozând cantitatea de urluială*, răcind fiertura, fiindcă nu te jucai cu foamea furibundă a indivizilor acestora, care altfel și-ar fi ars gâtlejul. Apoi aruncam grăunțele la păsări, căci, dacă n-o făceam la timp, năvăleau peste mine în bucătărie. Fierbeam laptele și pregăteam cafeaua. Laptele e cel mai hoț aliment; te pândește cum nu ești atent, sare din oală spumegând și s-aruncă în foc ca un călugăr budist. Se scula băiețașul [...]. Eram o atracție pentru el, fiindcă aveam o barbă căruntă și o lulea grozavă, cum nu mai avea nimeni în sat. Îl puneam în rânduială și luam împreună micul-dejun. Tata pleca prea de dimineață. Era foarte dificil la masă. Ca mulți copii de vârsta lui, nu voia să mănânce. Atunci a trebuit să mâncăm în joacă. Toate numele politice le cunoștea și toate personagiile din cărțile ce i se citiseră. Îl luam pe genunchi și-i spuneam: Acum mâncăm pe Roosevelt, acum mâncăm pe Churchill [...]. Îi mânca pe toți cu unt și marmeladă de măceșe pe pâine și cafea cu lapte. De unde mai înainte aceste delicii erau fade, că nu merita să pună gurița pe ele, acum, condimentate cu celebrități, aveau un gust extraordinar, spre hazul părinților. [...] 
După asta, cu hârtie și creion, mergeam la bolnavă, stabileam meniul zilei și scriam amănunțit cum se prepară fiecare mâncare. Cum multe le știam, n-am greșit mai niciodată. Am descoperit că vocația mea adevărată era aceea de bucătar. [...] Bineînțeles, asistentul meu în noua meserie, care îmi plăcea, și colaboratorul meu la bucătărie era băiețașul, nelipsit de lângă mine. La masă, ne simțeam obligați ca noi să mâncăm mai cu poftă bunătățile pregătite de amândoi.  
Mai avea și alte cusururi băiețașul. În vecinătate, nu era niciun copil de seama lui cu care să se joace. Și cum duduia de energie și cum n-avea ce face cu ea, o ștergea de-acasă și colinda prin tot satul, fără să spună când și unde a plecat. Deștept foc și umblăreț, toată lumea îl cunoștea. Părinții nu înțelegeau acest vagabondaj. Tatăl n-avea timp să se ocupe de el, deși amândoi îl adorau. Pe maică-sa, dispariția lui în necunoscut o băga în groază. Doamne ferește, cine știe ce putea să i se întâmple.  
Nichifor Crainic, Pribeag în țara mea. Sub mască. Memorii. 23 august 1944 – 24 mai 1947  
*orătănii – păsări de curte 
*urluială – boabe de cereale măcinate și întrebuințate ca hrană pentru animale`,
        cerinte: [
            'Indică sensul din text al cuvântului arătoasă și al secvenței băga în groază.',
            'Menționează vocația pe care și-o descoperă Nichifor Crainic în timpul șederii la familia care îl găzduiește, utilizând informaţiile din textul dat.',
            'Precizează reacția părinților la schimbarea comportamentului copilului la micul-dejun, justificându-ți răspunsul cu o secvență semnificativă din text.',
            'Explică un motiv pentru care băiatul obișnuiește să plece de acasă.',
            'Prezintă, în 30-50 de cuvinte, o trăsătură morală a lui Nichifor Crainic, aşa cum reiese din textul dat.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Redactează un text argumentativ',
        descriere: 'Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă experiențele din copilărie influențează sau nu comportamentul unei persoane.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2025',
        an: 2025,
        sesiune: 'rezervă',
        tip: 'redactare',
        text: `Am ajuns cu trenul într-o seară de toamnă. E o mică localitate minieră, unde lumea e obișnuită cu vizitatori străini. Casă arătoasă, iar în față un rând de dalii înalte, roșii, violete și galbene care, la lumina becului electric, arătau feeric. Soțul, funcționar public; ea, absolventă de liceu și un băiețaș de cinci ani și jumătate, care avea să fie prietenul meu. Mă cunoșteau din casa învățătoarei și știau că sunt unchiul lor din Bucovina. M-au primit prietenos ca pe o rudă despre care nu știau mare lucru [...]. 
La puțin timp după sosirea mea, stăpâna casei a căzut bolnavă și avea să zacă o lună și jumătate, îngrijită de medicul circumscripției locale. M-am oferit să duc eu gospodăria, aducându-mi aminte că, la mama acasă, deși copil încă, făcusem lucrul acesta cu îndemânare. Când părinții plecau la muncă, lăsau totul în seama mea, îngrijeam un frate și surorile mai mici, vedeam de orătănii* spre bucuria mamei [...].  
Întâia grijă era să pregătesc hrana porcilor, fierbând cartofii, dozând cantitatea de urluială*, răcind fiertura, fiindcă nu te jucai cu foamea furibundă a indivizilor acestora, care altfel și-ar fi ars gâtlejul. Apoi aruncam grăunțele la păsări, căci, dacă n-o făceam la timp, năvăleau peste mine în bucătărie. Fierbeam laptele și pregăteam cafeaua. Laptele e cel mai hoț aliment; te pândește cum nu ești atent, sare din oală spumegând și s-aruncă în foc ca un călugăr budist. Se scula băiețașul [...]. Eram o atracție pentru el, fiindcă aveam o barbă căruntă și o lulea grozavă, cum nu mai avea nimeni în sat. Îl puneam în rânduială și luam împreună micul-dejun. Tata pleca prea de dimineață. Era foarte dificil la masă. Ca mulți copii de vârsta lui, nu voia să mănânce. Atunci a trebuit să mâncăm în joacă. Toate numele politice le cunoștea și toate personagiile din cărțile ce i se citiseră. Îl luam pe genunchi și-i spuneam: Acum mâncăm pe Roosevelt, acum mâncăm pe Churchill [...]. Îi mânca pe toți cu unt și marmeladă de măceșe pe pâine și cafea cu lapte. De unde mai înainte aceste delicii erau fade, că nu merita să pună gurița pe ele, acum, condimentate cu celebrități, aveau un gust extraordinar, spre hazul părinților. [...] 
După asta, cu hârtie și creion, mergeam la bolnavă, stabileam meniul zilei și scriam amănunțit cum se prepară fiecare mâncare. Cum multe le știam, n-am greșit mai niciodată. Am descoperit că vocația mea adevărată era aceea de bucătar. [...] Bineînțeles, asistentul meu în noua meserie, care îmi plăcea, și colaboratorul meu la bucătărie era băiețașul, nelipsit de lângă mine. La masă, ne simțeam obligați ca noi să mâncăm mai cu poftă bunătățile pregătite de amândoi.  
Mai avea și alte cusururi băiețașul. În vecinătate, nu era niciun copil de seama lui cu care să se joace. Și cum duduia de energie și cum n-avea ce face cu ea, o ștergea de-acasă și colinda prin tot satul, fără să spună când și unde a plecat. Deștept foc și umblăreț, toată lumea îl cunoștea. Părinții nu înțelegeau acest vagabondaj. Tatăl n-avea timp să se ocupe de el, deși amândoi îl adorau. Pe maică-sa, dispariția lui în necunoscut o băga în groază. Doamne ferește, cine știe ce putea să i se întâmple.  
Nichifor Crainic, Pribeag în țara mea. Sub mască. Memorii. 23 august 1944 – 24 mai 1947  
*orătănii – păsări de curte 
*urluială – boabe de cereale măcinate și întrebuințate ca hrană pentru animale`,
        cerinte: [
            'Cerințe totale: Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă experiențele din copilărie influențează sau nu comportamentul unei persoane, raportându-te atât la informațiile din fragmentul extras din volumul Pribeag în țara mea. Sub mască. Memorii. 23 august 1944 – 24 mai 1947 de Nichifor Crainic, cât și la experiența personală sau culturală.',
            'Sumar conținut: formularea unei opinii faţă de problematica pusă în discuţie, enunţarea şi dezvoltarea corespunzătoare a două argumente adecvate opiniei și formularea unei concluzii pertinente',
            'Sumar redactare: utilizarea corectă a conectorilor în argumentare, respectarea normelor limbii literare (norme de exprimare, de ortografie și de punctuație), aşezarea în pagină, lizibilitatea, respectarea precizării privind numărul minim de cuvinte.'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Analiza unui text poetic',
        descriere: 'Comentează, în minimum 50 de cuvinte, textul de mai jos, evidențiind relația dintre ideea poetică și mijloacele artistice.',
        numarSubiect: 2,
        profil: 'real',
        data: '2025',
        an: 2025,
        sesiune: 'rezervă',
        tip: 'poezie',
        text: `Copilărie crudă, tot raiul tău uitat: 
Un car purtând recolta grădinilor în el, 
Re'nvii deplină iarăși, ca-n arcul de oțel 
Al unui orologiu stârnind, când sferturi bat, 
Un timp ce nu-l încape cadranul său rotat. 
Imagini migratoare, în stol foșnind aripi, 
Întoarse dintr-al undei fior în ochiul clar, 
Cum steaua roabă pietrei se mântuie-n amnar, 
Fiți doar secunda primă ce, ștearsă de pe chip, 
Egal se contopește în ceasul de nisip. 
Miron Radu Paraschivescu, Copilărie`,
        cerinte: [
            'Comentează, în minimum 50 de cuvinte, textul de mai jos, evidențiind relația dintre ideea poetică și mijloacele artistice.',
            'Conținut: precizează relația dintre ideea poetică și mijloacele artistice',
            'Redactare: utiliză corect conectorii în argumentare; respectă normele limbii literare (exprimare, ortografie, punctuație), așezarea în pagină și lizibilitatea'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6(precizează relația dintre ideea poetică și mijloacele artistice)',
            'Redactare: 4(utilizarea limbii literare – 1 punct; logica înlănțuirii ideilor – 1 punct; ortografia – 1 punct; punctuaţia – 1 punct)'
        ]
    },
    {
        titlu: 'Redactează un eseu',
        descriere: 'Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități de construcție a unui personaj într-un roman interbelic studiat.',
        numarSubiect: 3,
        profil: 'real',
        data: '2025',
        an: 2025,
        sesiune: 'rezervă',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități de construcție a unui personaj într-un roman interbelic studiat. În elaborarea eseului, vei avea în vedere următoarele repere: – prezentarea statutului social, psihologic, moral etc. al personajului ales; – evidențierea unei trăsături a personajului ales, prin două episoade/secvențe comentate; – analiza a două elemente de structură, de compoziție și/sau de limbaj ale romanului studiat, relevante pentru construcția personajului ales (de exemplu: acțiune, conflict, modalități de caracterizare, relații temporale și spațiale, incipit, final, tehnici narative, instanțe ale comunicării narative, registre stilistice, limbaj etc.). Notă Ordinea integrării reperelor în cuprinsul eseului este la alegere. Pentru conţinutul eseului, vei primi 18 puncte (câte 6 puncte pentru fiecare cerinţă/reper). Pentru redactarea eseului, vei primi 12 puncte (existența părților componente – introducere, cuprins, încheiere – 1 punct; logica înlănțuirii ideilor – 1 punct; abilități de analiză și de argumentare – 3 puncte; utilizarea limbii literare – 2 puncte; ortografia – 2 puncte; punctuaţia – 2 puncte; așezarea în pagină, lizibilitatea – 1 punct). În vederea acordării punctajului pentru redactare, eseul trebuie să aibă minimum 400 de cuvinte şi să dezvolte subiectul propus.`,
        cerinte: [
            'Prezintă statutul social, psihologic, moral etc. al personajului ales',
            'Evidențiază o trăsătură a personajului ales, prin două episoade/secvențe comentate',
            'Analizează două elemente de structură, compoziție și/sau limbaj relevante pentru construcția personajului'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'Ștefan Aug. Doinaș, Liviu Rusu, în vol. Evocări',
        descriere: 'Citește următorul fragment al lui Ștefan Aug. Doinaș și rezolvă cerințele date.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2025',
        an: 2025,
        sesiune: 'simulare',
        tip: 'analiza',
        text: `În ce mă privește, student la Medicină (numai că în sala de disecție citeam piesele lui Shakespeare și frecventam mai mult disciplinele de la Litere), rolul jucat de profesorul de Estetică a fost covârșitor. Veneam de la țară, elev silitor desigur, dar complet neintrodus în domeniile care mă atrăgeau, lipsit de gust în materie de arte și informație culturală – un adevărat „barbar" care nimerise în mijlocul Atenei, blocat de o timiditate aproape morbidă. Prima acțiune eficientă pe care a avut-o profesorul Liviu Rusu asupra mea a fost aceea de „a sparge" tocmai această timiditate. [...] 
Educația și instruirea mea estetică au început, însă, cu „Audițiile muzicale" pe care profesorul Liviu Rusu le ținea în prelungirea Seminarului de Estetică. Acestea, de asemenea, făceau săli pline. Ele complineau în mod nesistematic o reală istorie a muzicii simfonice clasice: audierea fiecărui disc era precedată de o expunere a profesorului. 
Pentru mine, atmosfera avea ceva incredibil: de inițiere într-un domeniu al unei arte de care eram total străin. În viața mea, până atunci, nu fusesem la un concert, nici nu ascultasem muzică simfonică. Intram într-un univers pe care nici măcar nu-l bănuisem, în care fiecare descoperire constituia un nou moment de delectare, în care – întâi de toate – aveam revelația propriei persoane. [...] 
Ca în tot ceea ce făcea profesorul, prezența sa fizică – vocea, gesticulația, pledoaria – precum și termenii săi marcau ca o pecete materia însăși a lecției: de-a lungul anilor, de câte ori am ascultat Mozart sau Beethoven, de pildă, în memoria mea apărea figura profesorului, iar unele dintre expresiile sale – deosebit de plastice – se însoțeau inevitabil de surâsurile sau chiar ironiile noastre. Nimic nu leagă pe elev de profesorul său mai mult decât omul care, coborând de pe estradă, ți se alătură asemenea unui camarad cu care poți să conversezi – prin cuvinte sau numai tăcând – de acord sau în contradictoriu. [...] 
În atmosfera acelor ani, când războiul – care era în toi – părea a se desfășura pe altă planetă, Universitatea „Regele Ferdinand" din Cluj, refugiată la Sibiu, trăia cu ardoare o rivalitate culturală pasionantă: între grupul de studenți mediciniști conduși de profesorul de anatomie Victor Papilian – care era un remarcabil prozator și dramaturg – și grupul celor de la Litere, Filosofie și Drept, animat de la catedră de Liviu Rusu, iar la nivel de cenaclu de Lucian Blaga. [...]  
„Arena" întrecerii culturale între studenții de la Medicină și cei de la Litere a fost teatrul amator universitar. [...] Profesorul Liviu Rusu a regizat un spectacol cu O scrisoare pierdută de I.L. Caragiale. 
Astăzi, montarea asigurată de profesorul nostru de Estetică ar apărea, desigur, ca o realizare modestă, cu „îndrăzneli" care au devenit lucruri de rutină ale artei scenice. Dar, pe vremea aceea, soluțiile artistice, experimentale, existente în acel spectacol, au avut mare efect: actorii înaintau spre scenă printre cele două rânduri de spectatori; unii interpreți se aflau în loje, îi interpelau pe cei din sală înainte de a coborî în spațiul scenic; la un moment dat, sufleorul dădea la o parte capacul cuștii sale pentru a interveni etc. [...] 
Spectacolul mi se pare a fi fost foarte important pentru noi, întrucât indica o sferă de preocupări care aveau să caracterizeze activitatea literară a tuturor prietenilor mei. 
Ștefan Aug. Doinaș, Liviu Rusu, în vol. Evocări`,
        cerinte: [
            'Indică sensul din text al cuvântului reală și al secvenței dădea la o parte.',
            'Menționează localitatea în care a funcționat în timpul războiului Universitatea „Regele Ferdinand", valorificând informațiile din text.',
            'Precizează domeniul artistic în care se manifestă spiritul competitiv al studenților de la Medicină și Litere, justificându-ți răspunsul cu o secvență semnificativă din textul dat.',
            'Explică un motiv pentru care spectacolul regizat de Liviu Rusu a atras atenția.',
            'Prezintă, în 30-50 de cuvinte, un efect pe care îl are muzica simfonică asupra tânărului Ștefan Aug. Doinaș.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Redactează un text argumentativ',
        descriere: 'Redactează un text de minimum 150 de cuvinte în care să argumentezi dacă profesorii contribuie sau nu la îmbogățirea experienței culturale a tinerilor.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2025',
        an: 2025,
        sesiune: 'simulare',
        tip: 'redactare',
        text: `În ce mă privește, student la Medicină (numai că în sala de disecție citeam piesele lui Shakespeare și frecventam mai mult disciplinele de la Litere), rolul jucat de profesorul de Estetică a fost covârșitor. Veneam de la țară, elev silitor desigur, dar complet neintrodus în domeniile care mă atrăgeau, lipsit de gust în materie de arte și informație culturală – un adevărat „barbar" care nimerise în mijlocul Atenei, blocat de o timiditate aproape morbidă. Prima acțiune eficientă pe care a avut-o profesorul Liviu Rusu asupra mea a fost aceea de „a sparge" tocmai această timiditate. [...] 
Educația și instruirea mea estetică au început, însă, cu „Audițiile muzicale" pe care profesorul Liviu Rusu le ținea în prelungirea Seminarului de Estetică. Acestea, de asemenea, făceau săli pline. Ele complineau în mod nesistematic o reală istorie a muzicii simfonice clasice: audierea fiecărui disc era precedată de o expunere a profesorului. 
Pentru mine, atmosfera avea ceva incredibil: de inițiere într-un domeniu al unei arte de care eram total străin. În viața mea, până atunci, nu fusesem la un concert, nici nu ascultasem muzică simfonică. Intram într-un univers pe care nici măcar nu-l bănuisem, în care fiecare descoperire constituia un nou moment de delectare, în care – întâi de toate – aveam revelația propriei persoane. [...] 
Ca în tot ceea ce făcea profesorul, prezența sa fizică – vocea, gesticulația, pledoaria – precum și termenii săi marcau ca o pecete materia însăși a lecției: de-a lungul anilor, de câte ori am ascultat Mozart sau Beethoven, de pildă, în memoria mea apărea figura profesorului, iar unele dintre expresiile sale – deosebit de plastice – se însoțeau inevitabil de surâsurile sau chiar ironiile noastre. Nimic nu leagă pe elev de profesorul său mai mult decât omul care, coborând de pe estradă, ți se alătură asemenea unui camarad cu care poți să conversezi – prin cuvinte sau numai tăcând – de acord sau în contradictoriu. [...] 
În atmosfera acelor ani, când războiul – care era în toi – părea a se desfășura pe altă planetă, Universitatea „Regele Ferdinand" din Cluj, refugiată la Sibiu, trăia cu ardoare o rivalitate culturală pasionantă: între grupul de studenți mediciniști conduși de profesorul de anatomie Victor Papilian – care era un remarcabil prozator și dramaturg – și grupul celor de la Litere, Filosofie și Drept, animat de la catedră de Liviu Rusu, iar la nivel de cenaclu de Lucian Blaga. [...]  
„Arena" întrecerii culturale între studenții de la Medicină și cei de la Litere a fost teatrul amator universitar. [...] Profesorul Liviu Rusu a regizat un spectacol cu O scrisoare pierdută de I.L. Caragiale. 
Astăzi, montarea asigurată de profesorul nostru de Estetică ar apărea, desigur, ca o realizare modestă, cu „îndrăzneli" care au devenit lucruri de rutină ale artei scenice. Dar, pe vremea aceea, soluțiile artistice, experimentale, existente în acel spectacol, au avut mare efect: actorii înaintau spre scenă printre cele două rânduri de spectatori; unii interpreți se aflau în loje, îi interpelau pe cei din sală înainte de a coborî în spațiul scenic; la un moment dat, sufleorul dădea la o parte capacul cuștii sale pentru a interveni etc. [...] 
Spectacolul mi se pare a fi fost foarte important pentru noi, întrucât indica o sferă de preocupări care aveau să caracterizeze activitatea literară a tuturor prietenilor mei. 
Ștefan Aug. Doinaș, Liviu Rusu, în vol. Evocări`,
        cerinte: [
            'Cerințe totale: Redactează un text de minimum 150 de cuvinte în care să argumentezi dacă profesorii contribuie sau nu la îmbogățirea experienței culturale a tinerilor, raportându-te atât la fragmentul extras din volumul Evocări de Ștefan Aug. Doinaș, cât și la experiența personală sau culturală.',
            'Sumar conținut: formularea unei opinii faţă de problematica pusă în discuţie, enunţarea şi dezvoltarea corespunzătoare a două argumente adecvate opiniei și formularea unei concluzii pertinente',
            'Sumar redactare: utilizarea corectă a conectorilor în argumentare, respectarea normelor limbii literare (norme de exprimare, de ortografie și de punctuație), aşezarea în pagină, lizibilitatea, respectarea precizării privind numărul minim de cuvinte.'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Analiza unui text poetic',
        descriere: 'Comentează, în minimum 50 de cuvinte, textul de mai jos, evidențiind relația dintre ideea poetică și mijloacele artistice.',
        numarSubiect: 2,
        profil: 'real',
        data: '2025',
        an: 2025,
        sesiune: 'simulare',
        tip: 'poezie',
        text: `De sticlă ‒ câmpia înghețată. 
Departe un șir de pomi despuiați 
scutură chiciura luminată. 
Au trecut sănii trase de boi 
albi ca zăpada, și aburind ca zarea, 
să încarce lemne din zăvoi. 
Am rămas singur, și e atât de frig 
încât aș putea să-mi văd cuvintele 
înghețând în aer, când te strig. 
Caut prin grădină pașii tăi, 
ieri le-am zărit în prima ninsoare urmele,  
umbre albastre, ca niște porumbei. 
Adrian Maniu, Iarnă`,
        cerinte: [
            'Comentează, în minimum 50 de cuvinte, textul de mai jos, evidențiind relația dintre ideea poetică și mijloacele artistice.',
            'Conținut: precizează relația dintre ideea poetică și mijloacele artistice',
            'Redactare: utiliză corect conectorii în argumentare; respectă normele limbii literare (exprimare, ortografie, punctuație), așezarea în pagină și lizibilitatea'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6(precizează relația dintre ideea poetică și mijloacele artistice)',
            'Redactare: 4(utilizarea limbii literare – 1 punct; logica înlănțuirii ideilor – 1 punct; ortografia – 1 punct; punctuaţia – 1 punct)'
        ]
    },
    {
        titlu: 'Redactează un eseu',
        descriere: 'Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități ale unui roman psihologic sau al experienței studiat.',
        numarSubiect: 3,
        profil: 'real',
        data: '2025',
        an: 2025,
        sesiune: 'simulare',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități ale unui roman psihologic sau al experienței studiat. În elaborarea eseului, vei avea în vedere următoarele repere: – evidențierea a două trăsături care fac posibilă încadrarea romanului studiat într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică; – comentarea a două episoade/secvențe semnificative pentru tema romanului studiat; – analiza a două elemente de structură, de compoziție și/sau de limbaj, relevante pentru romanul studiat (de exemplu: acțiune, conflict, relații temporale și spațiale, incipit, final, tehnici narative, instanțe ale comunicării narative, perspectivă narativă, registre stilistice, limbaj etc.). Notă Ordinea integrării reperelor în cuprinsul eseului este la alegere. Pentru conţinutul eseului, vei primi 18 puncte (câte 6 puncte pentru fiecare reper). Pentru redactarea eseului, vei primi 12 puncte (existența părților componente – introducere, cuprins, încheiere – 1 punct; logica înlănțuirii ideilor – 1 punct; abilități de analiză și de argumentare – 3 puncte; utilizarea limbii literare – 2 puncte; ortografia – 2 puncte; punctuaţia – 2 puncte; așezarea în pagină, lizibilitatea – 1 punct). În vederea acordării punctajului pentru redactare, eseul trebuie să aibă minimum 400 de cuvinte şi să dezvolte subiectul propus.`,
        cerinte: [
            'Evidențiază două trăsături care fac posibilă încadrarea romanului studiat într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică',
            'Comentează două episoade/secvențe semnificative pentru tema romanului studiat',
            'Analizează două elemente de structură, compoziție și/sau limbaj relevante pentru romanul studiat'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'Virgil Carianopol, Ion Pillat, în volumul Scriitori care au devenit amintiri',
        descriere: 'Citește următorul fragment al lui Virgil Carianopol și rezolvă cerințele date.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2025',
        an: 2025,
        sesiune: 'sesiune specială',
        tip: 'analiza',
        text: `Fără Ion Pillat n-ar fi întreagă galeria scriitorilor care au trăit şi s-au manifestat în spaţiul dintre cele două războaie mondiale. Puţin cunoscut şi apreciat de confrați, pentru lipsa lui din mijlocul lor, el a trăit totuși intens și a cunoscut o parte din glorie în viaţă. 
Pillat a fost un poet de interior. Departe totdeauna de zgomotul orașelor, a preferat biblioteca, studiul, singurătatea, liniștea, casa, oricăror altor risipiri. A scris mult, a tradus și a umblat. Este, poate, unul dintre singurii scriitori din vremea lui care a călcat cel mai mult țara pas cu pas, a căutat să-i descifreze frumusețile şi a iubit-o pentru că a cunoscut-o. I-a colindat mănăstirile, i-a ştiut monumentele și, mai ales, s-a îmbătat până la extaz de măreția munţilor și de neliniștea permanentă a mării. 
Pe Ion Pillat nu cred că ar putea spune cineva că l-a cunoscut total, şi aceasta nu pentru că era un om complicat. Dimpotrivă, amabil, simplu în expunere, scăpa totuși printre degete celui care ar fi vrut să-l cunoască mai de aproape. Era un poet dublat de un cunoscător adânc al sufletului omenesc. 
În tinereţea mea, cum am mai mărturisit şi cu alte ocazii, m-a interesat să cunosc, să aud, să-mi însemn şi, pentru că nu voiam să rămân numai la cei care frecventau cafeneaua literară, am căutat împrejurări favorabile şi pentru cunoașterea acelora pe care nu-i puteam întâlni decât în drum. [...]  
Găsisem la anticariat o plachetă din poezia lui Francis Jammes, în traducerea lui şi a lui N. I. Herescu. Am cumpărat-o şi am alergat din nou la Constantin Stelian, rugându-l să-mi înlesnească un autograf, dar cum acesta era tocmại în perioada unor examene, a trebuit să-mi amân bucuria. 
Prilejul s-a ivit tocmai la Ziua Cărţii, în anul 1938. Era într-o convorbire cu Horia Furtună și Ion Minulescu. Vorbeau despre traduceri şi Ion Pillat tocmai voia să demonstreze că traducerile sunt o necesitate și că apariţia lor masivă dovedeşte lipsa literaturii autohtone de calitate, de unde şi dezinteresul cititorului român faţă de lucrările scriitorilor români. 
— Este adevărat, susţinea el, că traducerea umple un gol, dar ea trebuie să completeze, nu să înlocuiască. 
M-a întrebat de ce vreau autograful. Răspunsul că aveam o bibliotecă frumoasă și că voiam s-o fac mai frumoasă se părea că l-a încântat. După ce mi-a scris câteva rânduri pe prima pagină a cărții, a scos din buzunar placheta Satul meu, apărută în colecţia „Cartea vremii", în anul 1923, şi-a semnat pe ea numele, a pus data şi mi-a întins-o. 
— Tot pentru biblioteca dumitale! 
M-am dus repede, am cumpărat Scrisori către Plante, carte care îmi apăruse cu un an mai înainte [...], am scris pe ea câteva rânduri şi m-am grăbit să i-o dau. 
L-am mai întâlnit după aceea de multe ori la Gândirea.  
Acum, de câte ori îl salutam, îmi zâmbea, iar când se ivea prilejul, îmi întindea mâna ca unui vechi cunoscut. 
Virgil Carianopol, Ion Pillat, în volumul Scriitori care au devenit amintiri`,
        cerinte: [
            'Indică sensul din text al cuvântului glorie și al secvenței din nou.',
            'Menționează numele celor doi traducători ai poeziilor lui Francis Jammes, utilizând informaţiile din textul dat.',
            'Precizează o pasiune a scriitorului Ion Pillat, justificându-ți răspunsul cu o secvență semnificativă din textul dat.',
            'Explică motivul pentru care Virgil Carianopol cumpără volumul Scrisori către Plante.',
            'Prezintă, în 30-50 de cuvinte, opinia lui Ion Pillat despre traduceri, așa cum reiese din textul dat.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Redactează un text argumentativ',
        descriere: 'Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă relațiile interumane sunt influențate sau nu de existența unor preocupări comune.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2025',
        an: 2025,
        sesiune: 'sesiune specială',
        tip: 'redactare',
        text: `Fără Ion Pillat n-ar fi întreagă galeria scriitorilor care au trăit şi s-au manifestat în spaţiul dintre cele două războaie mondiale. Puţin cunoscut şi apreciat de confrați, pentru lipsa lui din mijlocul lor, el a trăit totuși intens și a cunoscut o parte din glorie în viaţă. 
Pillat a fost un poet de interior. Departe totdeauna de zgomotul orașelor, a preferat biblioteca, studiul, singurătatea, liniștea, casa, oricăror altor risipiri. A scris mult, a tradus și a umblat. Este, poate, unul dintre singurii scriitori din vremea lui care a călcat cel mai mult țara pas cu pas, a căutat să-i descifreze frumusețile şi a iubit-o pentru că a cunoscut-o. I-a colindat mănăstirile, i-a ştiut monumentele și, mai ales, s-a îmbătat până la extaz de măreția munţilor și de neliniștea permanentă a mării. 
Pe Ion Pillat nu cred că ar putea spune cineva că l-a cunoscut total, şi aceasta nu pentru că era un om complicat. Dimpotrivă, amabil, simplu în expunere, scăpa totuși printre degete celui care ar fi vrut să-l cunoască mai de aproape. Era un poet dublat de un cunoscător adânc al sufletului omenesc. 
În tinereţea mea, cum am mai mărturisit şi cu alte ocazii, m-a interesat să cunosc, să aud, să-mi însemn şi, pentru că nu voiam să rămân numai la cei care frecventau cafeneaua literară, am căutat împrejurări favorabile şi pentru cunoașterea acelora pe care nu-i puteam întâlni decât în drum. [...]  
Găsisem la anticariat o plachetă din poezia lui Francis Jammes, în traducerea lui şi a lui N. I. Herescu. Am cumpărat-o şi am alergat din nou la Constantin Stelian, rugându-l să-mi înlesnească un autograf, dar cum acesta era tocmại în perioada unor examene, a trebuit să-mi amân bucuria. 
Prilejul s-a ivit tocmai la Ziua Cărţii, în anul 1938. Era într-o convorbire cu Horia Furtună și Ion Minulescu. Vorbeau despre traduceri şi Ion Pillat tocmai voia să demonstreze că traducerile sunt o necesitate și că apariţia lor masivă dovedeşte lipsa literaturii autohtone de calitate, de unde şi dezinteresul cititorului român faţă de lucrările scriitorilor români. 
— Este adevărat, susţinea el, că traducerea umple un gol, dar ea trebuie să completeze, nu să înlocuiască. 
M-a întrebat de ce vreau autograful. Răspunsul că aveam o bibliotecă frumoasă și că voiam s-o fac mai frumoasă se părea că l-a încântat. După ce mi-a scris câteva rânduri pe prima pagină a cărții, a scos din buzunar placheta Satul meu, apărută în colecţia „Cartea vremii", în anul 1923, şi-a semnat pe ea numele, a pus data şi mi-a întins-o. 
— Tot pentru biblioteca dumitale! 
M-am dus repede, am cumpărat Scrisori către Plante, carte care îmi apăruse cu un an mai înainte [...], am scris pe ea câteva rânduri şi m-am grăbit să i-o dau. 
L-am mai întâlnit după aceea de multe ori la Gândirea.  
Acum, de câte ori îl salutam, îmi zâmbea, iar când se ivea prilejul, îmi întindea mâna ca unui vechi cunoscut. 
Virgil Carianopol, Ion Pillat, în volumul Scriitori care au devenit amintiri`,
        cerinte: [
            'Cerințe totale: Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă relațiile interumane sunt influențate sau nu de existența unor preocupări comune, raportându-te atât la informațiile din fragmentul extras din volumul Scriitori care au devenit amintiri de Virgil Carianopol, cât și la experiența personală sau culturală.',
            'Sumar conținut: formularea unei opinii faţă de problematica pusă în discuţie, enunţarea şi dezvoltarea corespunzătoare a două argumente adecvate opiniei și formularea unei concluzii pertinente',
            'Sumar redactare: utilizarea corectă a conectorilor în argumentare, respectarea normelor limbii literare (norme de exprimare, de ortografie și de punctuație), aşezarea în pagină, lizibilitatea, respectarea precizării privind numărul minim de cuvinte.'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Analiza unui fragment dramatic',
        descriere: 'Prezintă, în minimum 50 de cuvinte, rolul notațiilor autorului în fragmentul de mai jos.',
        numarSubiect: 2,
        profil: 'real',
        data: '2025',
        an: 2025,
        sesiune: 'sesiune specială',
        tip: 'drama',
        text: `ACTUL II 
După o lună de la acțiunea primului act. E tot o duminică, spre dimineață, și pe fereastră se vede, în decorul cunoscut, toamna de octombrie. Interiorul casei lui Manole e mult schimbat. […] Încăperea, ca aspect general, are acum un aer de sărăcie, de pustiu, în bună concordanță cu perspectiva de dincolo de fereastră. Pomii îngălbeniți, goi și Dunărea ternă, cenușie ca portul, în ceața care s-a ridicat din ape și, în burnița egală, rece și monotonă, care se presupune că se cerne peste larg. La ridicarea cortinei, Manole se plimbă prin încăpere, cu mâinile la spate, adâncit în importanța lucrului pe care îl face. […] 
Manole dictează la roman. Maria, așezată la biroul obișnuit, la masa de mâncare, […]  așteaptă cu tocul atent, dar cu gândurile ei personale duse dincolo de manuscris, dincolo de oraș și parcă de lume. 
Câteva clipe de pauză. Manole se plimbă, Maria așteaptă. 
MANOLE (care, dincolo de preocuparea lui actuală – romanul – are cugetul greu din cauza Mariei și a legitimei sale tristeți, se oprește în fața ei și, văzând că se gândește „departe", zice cu blândețe): Ai ostenit? 
Tudor Mușatescu, Trenurile mele`,
        cerinte: [
            'Prezintă, în minimum 50 de cuvinte, rolul notațiilor autorului în fragmentul de mai jos.',
            'Conținut: precizează rolul notațiilor autorului în fragmentul de mai jos',
            'Redactare: utiliză corect conectorii în argumentare; respectă normele limbii literare (exprimare, ortografie, punctuație), așezarea în pagină și lizibilitatea'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6(precizează rolul notațiilor autorului în fragmentul de mai jos)',
            'Redactare: 4(utilizarea limbii literare – 1 punct; logica înlănțuirii ideilor – 1 punct; ortografia – 1 punct; punctuaţia – 1 punct)'
        ]
    },
    {
        titlu: 'Redactează un eseu',
        descriere: 'Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități ale unui text narativ studiat, aparținând lui Marin Preda.',
        numarSubiect: 3,
        profil: 'real',
        data: '2025',
        an: 2025,
        sesiune: 'sesiune specială',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități ale unui text narativ studiat, aparținând lui Marin Preda. În elaborarea eseului, vei avea în vedere următoarele repere: – evidențierea a două trăsături care fac posibilă încadrarea textului narativ studiat într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică; – comentarea a două episoade/secvențe semnificative pentru tema textului narativ studiat; – analiza a două elemente de structură, de compoziție și/sau de limbaj, relevante pentru textul narativ studiat (de exemplu: acțiune, conflict, relații temporale și spațiale, incipit, final, tehnici narative, instanțe ale comunicării narative, perspectivă narativă, registre stilistice, limbaj etc.). Notă Ordinea integrării reperelor în cuprinsul eseului este la alegere. Pentru conţinutul eseului, vei primi 18 puncte (câte 6 puncte pentru fiecare reper). Pentru redactarea eseului, vei primi 12 puncte (existența părților componente – introducere, cuprins, încheiere – 1 punct; logica înlănțuirii ideilor – 1 punct; abilități de analiză și de argumentare – 3 puncte; utilizarea limbii literare – 2 puncte; ortografia – 2 puncte; punctuaţia – 2 puncte; așezarea în pagină, lizibilitatea – 1 punct). În vederea acordării punctajului pentru redactare, eseul trebuie să aibă minimum 400 de cuvinte şi să dezvolte subiectul propus.`,
        cerinte: [
            'Evidențiază două trăsături care fac posibilă încadrarea textului narativ studiat într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică',
            'Comentează două episoade/secvențe semnificative pentru tema textului narativ studiat',
            'Analizează două elemente de structură, compoziție și/sau limbaj relevante pentru textul narativ studiat'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'Puia Florica Rebreanu, Pământul bătătorit de părintele meu. File de jurnal',
        descriere: 'Citește următorul fragment al Puiei Florica Rebreanu și rezolvă cerințele date.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2025',
        an: 2025,
        sesiune: 'model',
        tip: 'analiza',
        text: `Duminică, 12 august. Am căutat la izvoare pe Vasile fotograful să ne „imortalizăm" – măicuța și cu mine – într-o poză „artistică". Măicuța era foarte frumos îmbrăcată, în alb, și pieptănată cu cele două cozi pe cap. Am ales o poziție pe trepte, având pavilionul de cură în spate, ca un „fond" balnear. 
Poate că e un obicei depășit de a te fotografia, și mai ales în port popular. La mine este mai degrabă un obicei de familie. Tata mă alesese în copilărie ca modelul lui preferat. El avea pasiunea fotografiatului. Ținea să imortalizeze toate momentele și locurile care îi plăceau. Aparatul „Leica" era foarte modern prin 1934. [...] 
Dacă aș fi avut și eu această îndemânare și talent, cred că aș fi fotografiat pe tata, în toate momentele, la toate orele din noapte și zi. Dar, așa cum se întâmplă mai adesea, cel care fotografiază nu apare pe peliculă. Totuși, uneori tata nu rămânea în pagubă, deoarece îl fotografia mereu Radu, soțul meu, și deseori chiar când nu observa. Într-un rând, Radu l-a surprins în vizor strănutând. E o scenă rară în maldărul de fotografii cu tata. Asta însă îl supăra. Supărarea nu ținea mult. Un fotograf îl înțelege numaidecât pe altul. [...] 
Luni, 13 august. Expediem o telegramă Letiției Slăvoacă Miron, vestind-o că sosim la Ilva Mare sâmbătă 18 august. La poștă ne aștepta corespondență: două scrisori de la soțul meu, romanul Răscoala, tradus în ungurește de Galdi Laszlo, și alte două scrisori – adresate nouă la București – din partea Letiției, precum și una de la Liviu H. Oprescu. 
Scrisoarea lui Radu, pe optsprezece pagini, ne-a delectat prin umorul ei dens. Un obicei luat de la tata care îi relata pe larg măicuței întâmplările de peste zi, mai cu seamă din călătoriile în străinătate. Scrisorile erau întocmite de tata întotdeauna în ceasurile imediat următoare evenimentelor respective, când firesc ar fi fost să se odihnească. Era un mod al lui de relaxare, de recreere. Poate că cea mai caracteristică în acest sens este scrisoarea,  de „numai" șaisprezece pagini, expediată de la Oslo, la 18 martie 1928, duminică seara. [...] 
Odată ajunse la preoteasa Lazăr, ni se comunică regretul că nu am participat și noi la botezul nepotului ei, la petrecerea care a avut loc cu cei treisprezece invitați, dintre care cel mai plăcut musafir a fost pictorița Ileana Colonel Antonu, care a cântat și a fluierat doine, înveselind toată adunarea. 
O cunoșteam din anii trecuți. În drum spre casă, am întâlnit-o pe pictoriță care, bucuroasă, ne-a invitat vineri, să ne arate colecția sa de tablouri și obiecte de artă. 
Vineri, 17 august. Astăzi ne pregătim să mergem în vizită la Ileana Colonel Antonu – născută Cheffa – împreună cu părintele Lazăr și soția. [...] Pictorița este o femeie frumoasă, în ciuda celor șaizeci și cinci de ani ce-i poartă. E grațioasă și plină de temperament. Studiile și le-a făcut în Franța. A călătorit mult, culegând de peste tot frumosul, în toate formele lui. Originară din Bistrița, s-a stabilit până la urmă în Sângeorz. Din discuție, aflăm că multe țărănci vin la ea și o roagă ca, dintr-un chip mic, „cât un bob de porumb", dintr-o fotografie aproape ștearsă, să le zugrăvească copilița sau feciorelul morți mai demult. Vor, sărmanele, să aibă „chipul mare și zugrăvit în culori frumoase". Întotdeauna pictorița le-a satisfăcut dorințele. Atunci când le întreabă dacă „băiata" seamănă, mulțumirea lor este desăvârșită. „Aproape că grăiește", răspund ele. 
Puia Florica Rebreanu, Pământul bătătorit de părintele meu. File de jurnal`,
        cerinte: [
            'Indică sensul din text al cuvântului depășit și al secvenței pe larg.',
            'Menționează două domenii artistice în care se manifestă talentul Ileanei Colonel Antonu, utilizând informaţiile din textul dat.',
            'Precizează o caracteristică a scrisorii trimise de Radu soției sale, justificându-ți răspunsul cu o secvență semnificativă din textul dat.',
            'Explică un motiv pentru care Liviu Rebreanu scria scrisori imediat după câte un eveniment.',
            'Prezintă, în 30-50 de cuvinte, reacția femeilor la vederea portretelor realizate pornind de la fotografii în care apar copiii lor, aşa cum reiese din textul dat.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Redactează un text argumentativ',
        descriere: 'Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă fotografiile au sau nu un rol important în viața unei persoane.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2025',
        an: 2025,
        sesiune: 'model',
        tip: 'redactare',
        text: `Duminică, 12 august. Am căutat la izvoare pe Vasile fotograful să ne „imortalizăm" – măicuța și cu mine – într-o poză „artistică". Măicuța era foarte frumos îmbrăcată, în alb, și pieptănată cu cele două cozi pe cap. Am ales o poziție pe trepte, având pavilionul de cură în spate, ca un „fond" balnear. 
Poate că e un obicei depășit de a te fotografia, și mai ales în port popular. La mine este mai degrabă un obicei de familie. Tata mă alesese în copilărie ca modelul lui preferat. El avea pasiunea fotografiatului. Ținea să imortalizeze toate momentele și locurile care îi plăceau. Aparatul „Leica" era foarte modern prin 1934. [...] 
Dacă aș fi avut și eu această îndemânare și talent, cred că aș fi fotografiat pe tata, în toate momentele, la toate orele din noapte și zi. Dar, așa cum se întâmplă mai adesea, cel care fotografiază nu apare pe peliculă. Totuși, uneori tata nu rămânea în pagubă, deoarece îl fotografia mereu Radu, soțul meu, și deseori chiar când nu observa. Într-un rând, Radu l-a surprins în vizor strănutând. E o scenă rară în maldărul de fotografii cu tata. Asta însă îl supăra. Supărarea nu ținea mult. Un fotograf îl înțelege numaidecât pe altul. [...] 
Luni, 13 august. Expediem o telegramă Letiției Slăvoacă Miron, vestind-o că sosim la Ilva Mare sâmbătă 18 august. La poștă ne aștepta corespondență: două scrisori de la soțul meu, romanul Răscoala, tradus în ungurește de Galdi Laszlo, și alte două scrisori – adresate nouă la București – din partea Letiției, precum și una de la Liviu H. Oprescu. 
Scrisoarea lui Radu, pe optsprezece pagini, ne-a delectat prin umorul ei dens. Un obicei luat de la tata care îi relata pe larg măicuței întâmplările de peste zi, mai cu seamă din călătoriile în străinătate. Scrisorile erau întocmite de tata întotdeauna în ceasurile imediat următoare evenimentelor respective, când firesc ar fi fost să se odihnească. Era un mod al lui de relaxare, de recreere. Poate că cea mai caracteristică în acest sens este scrisoarea,  de „numai" șaisprezece pagini, expediată de la Oslo, la 18 martie 1928, duminică seara. [...] 
Odată ajunse la preoteasa Lazăr, ni se comunică regretul că nu am participat și noi la botezul nepotului ei, la petrecerea care a avut loc cu cei treisprezece invitați, dintre care cel mai plăcut musafir a fost pictorița Ileana Colonel Antonu, care a cântat și a fluierat doine, înveselind toată adunarea. 
O cunoșteam din anii trecuți. În drum spre casă, am întâlnit-o pe pictoriță care, bucuroasă, ne-a invitat vineri, să ne arate colecția sa de tablouri și obiecte de artă. 
Vineri, 17 august. Astăzi ne pregătim să mergem în vizită la Ileana Colonel Antonu – născută Cheffa – împreună cu părintele Lazăr și soția. [...] Pictorița este o femeie frumoasă, în ciuda celor șaizeci și cinci de ani ce-i poartă. E grațioasă și plină de temperament. Studiile și le-a făcut în Franța. A călătorit mult, culegând de peste tot frumosul, în toate formele lui. Originară din Bistrița, s-a stabilit până la urmă în Sângeorz. Din discuție, aflăm că multe țărănci vin la ea și o roagă ca, dintr-un chip mic, „cât un bob de porumb", dintr-o fotografie aproape ștearsă, să le zugrăvească copilița sau feciorelul morți mai demult. Vor, sărmanele, să aibă „chipul mare și zugrăvit în culori frumoase". Întotdeauna pictorița le-a satisfăcut dorințele. Atunci când le întreabă dacă „băiata" seamănă, mulțumirea lor este desăvârșită. „Aproape că grăiește", răspund ele. 
Puia Florica Rebreanu, Pământul bătătorit de părintele meu. File de jurnal`,
        cerinte: [
            'Cerințe totale: Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă fotografiile au sau nu un rol important în viața unei persoane, raportându-te atât la informațiile din fragmentul extras din volumul Pământul bătătorit de părintele meu. File de jurnal de Puia Florica Rebreanu, cât și la experiența personală sau culturală.',
            'Sumar conținut: formularea unei opinii faţă de problematica pusă în discuţie, enunţarea şi dezvoltarea corespunzătoare a două argumente adecvate opiniei și formularea unei concluzii pertinente',
            'Sumar redactare: utilizarea corectă a conectorilor în argumentare, respectarea normelor limbii literare (norme de exprimare, de ortografie și de punctuație), aşezarea în pagină, lizibilitatea, respectarea precizării privind numărul minim de cuvinte.'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Analiza unui text poetic',
        descriere: 'Comentează, în minimum 50 de cuvinte, textul de mai jos, evidențiind relația dintre ideea poetică și mijloacele artistice.',
        numarSubiect: 2,
        profil: 'real',
        data: '2025',
        an: 2025,
        sesiune: 'model',
        tip: 'poezie',
        text: `Sunt zece ani. Ce curios îmi pare 
Aspectul lucrurilor vechi, uitate!  
Ca dintr-un somn, deodată deșteptate,  
Parcă privesc c-un aer de mirare...  
Mai strâmtă-i casa, toate-s micșorate,  
Mă uit ca-n vis, și caut prin sertare, 
Nimicuri scumpe... inima-mi tresare 
De-o sfântă și duioasă pietate.  
Aceleași cadre-mpodobesc păreții,  
Din rame, cată lung și trist la mine:  
Povești pierdute-n haosul vieții.  
De farmecul de-odinioară pline,  
Îmi readuc parfumul tinereții...  
Parfum de flori crescute pe ruine.  
Alexandru Vlahuță, Sonet`,
        cerinte: [
            'Comentează, în minimum 50 de cuvinte, textul de mai jos, evidențiind relația dintre ideea poetică și mijloacele artistice.',
            'Conținut: precizează relația dintre ideea poetică și mijloacele artistice',
            'Redactare: utiliză corect conectorii în argumentare; respectă normele limbii literare (exprimare, ortografie, punctuație), așezarea în pagină și lizibilitatea'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6(precizează relația dintre ideea poetică și mijloacele artistice)',
            'Redactare: 4(utilizarea limbii literare – 1 punct; logica înlănțuirii ideilor – 1 punct; ortografia – 1 punct; punctuaţia – 1 punct)'
        ]
    },
    {
        titlu: 'Redactează un eseu',
        descriere: 'Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități ale unui text narativ studiat, aparținând lui Mihail Sadoveanu.',
        numarSubiect: 3,
        profil: 'real',
        data: '2025',
        an: 2025,
        sesiune: 'model',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități ale unui text narativ studiat, aparținând lui Mihail Sadoveanu. În elaborarea eseului, vei avea în vedere următoarele repere: – evidențierea a două trăsături care fac posibilă încadrarea textului narativ studiat într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică; – comentarea a două episoade/secvențe semnificative pentru tema textului narativ studiat; – analiza a două elemente de structură, de compoziție și/sau de limbaj, relevante pentru textul narativ studiat (de exemplu: acțiune, conflict, relații temporale și spațiale, incipit, final, tehnici narative, instanțe ale comunicării narative, perspectivă narativă, registre stilistice, limbaj etc.). Notă Ordinea integrării reperelor în cuprinsul eseului este la alegere. Pentru conţinutul eseului, vei primi 18 puncte (câte 6 puncte pentru fiecare cerinţă/reper). Pentru redactarea eseului, vei primi 12 puncte (existența părților componente – introducere, cuprins, încheiere – 1 punct; logica înlănțuirii ideilor – 1 punct; abilități de analiză și de argumentare – 3 puncte; utilizarea limbii literare – 2 puncte; ortografia – 2 puncte; punctuaţia – 2 puncte; așezarea în pagină, lizibilitatea – 1 punct). În vederea acordării punctajului pentru redactare, eseul trebuie să aibă minimum 400 de cuvinte şi să dezvolte subiectul propus.`,
        cerinte: [
            'Evidențiază două trăsături care fac posibilă încadrarea textului narativ studiat într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică',
            'Comentează două episoade/secvențe semnificative pentru tema textului narativ studiat',
            'Analizează două elemente de structură, compoziție și/sau limbaj relevante pentru textul narativ studiat'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'Gabriel Dimisianu, O vizită la Tudor Arghezi, în vol. Amintiri și portrete literare',
        descriere: 'Citeşte următorul fragment al autorului Gabriel Dimisianu, O vizită la Tudor Arghezi, în vol. Amintiri și portrete literare și rezolvă următoarele cerinţe:',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2024',
        an: 2024,
        sesiune: 'sesiune de vară',
        tip: 'analiza',
        text: `Eram, în 1960, tânăr redactor la Gazeta literară, când colega mea Andriana Fianu mi-a propus pe neașteptate, într-o după-amiază, s-o însoțesc acasă la Tudor Arghezi, de unde urma să luăm un text pe care poetul îl pregătise pentru revistă. [...] 
        I-am fost recunoscător Andrianei Fianu pentru ideea de-a mă lua cu ea la Arghezi, asta în primul moment, după care m-au copleșit emoțiile și mai c-aș fi renunțat. Atât că, ghicindu-mi frământarea, energica Adi nu mi-a lăsat timp să mă răzgândesc, ci m-a luat scurt: „Hai că nu te mănâncă, grăbește-te că-ntârziem!”. Ce era să fac? Am urmat-o fără murmur, pe drum tot gândindu-mă cum să mă comport când mă voi afla în fața marelui om. Voi fi ochi și urechi, dar mut, am decis până la urmă. Voi fi însoțitorul mut al colegei mele, care, prietenă cu Mițura*, obișnuită a casei, va avea ea toată inițiativa. Înainte de-a ne urca în troleibuz, în Piața Romană, am cumpărat flori, căci ne aflam în preajma zilei de 21 mai, când era aniversarea lui Arghezi. Și nu o aniversare oarecare, poetul împlinind chiar atunci optzeci de ani. 
        În epoca de care vorbesc, familia Arghezi ocupa un apartament la parterul unui mic bloc de pe Bulevardul Aviatorilor, în vecinătatea imediată a pieței cu același nume, azi Piața Charles de Gaulle. Am sunat, cineva ne-a deschis, conducându-ne într-un living cu ferestre mari, unde, după ce am așteptat câteva minute, a intrat poetul, neînsoțit. Ce m-a izbit îndată au fost pașii repezi făcuți de Arghezi, siguranța mișcărilor de om în toată puterea. Imaginea contrasta frapant cu aceea a neajutorării fizice pe care-o aveam despre poet de la cele câteva apariții în săli publice. Acolo pășea încet, ezitant, sprijinit în baston și ținut întotdeauna de braț de atleticul Baruțu*. Aici, în schimb, în spațiul intim, Arghezi se mișca dezinvolt, fără baston și fără Baruțu. Peste puțin timp a intrat și doamna Paraschiva, care s-a așezat pe un fotoliu, alături de Arghezi. [...]  
        De ce mi-era teamă, n-am scăpat. Adi m-a prezentat, cum era firesc, din moment ce mă adusese cu ea, dar a adăugat, rea inspirație, că sunt critic literar, unul dintre criticii tineri [...] în care se pun speranțe etc. Arghezi a reacționat, săgetându-mă cu o întrebare care m-a descumpănit: „Și ce vrei dumneata să critici?”. M-am pierdut, cred că roșisem, după care totuși am încercat să articulez un răspuns care era mai degrabă o dezvinovățire. Că eu de fapt nu vreau să critic ceva sau pe cineva, că mai mult decât să scriu îmi place să citesc, că dacă am o pasiune este cititul, însă, din obligație redacțională, trebuie din când în când să fac prezentări de cărți, nu neapărat critice… „Așa mai merge”, mi-a oprit Arghezi chinuita perorație*, schițând parcă și un zâmbet, după care m-a lăsat în plata Domnului, nemaiîntrebându-mă nimic. Fapt este că în acea împrejurare, luat repede și țintuit de privirea ironică a poetului, m-am lepădat nu ca Petru, de trei ori, ci numai o dată, de profesiunea pe care tocmai începusem s-o practic, de bine, de rău. Nu am mințit totuși în ce privește plăcerea cititului, care o întrecea, cum o întrece și acum, pe aceea a scrisului.  `,
        cerinte: [
            'Indică sensul din text al secvenței pe neașteptate și al cuvântului împrejurare. ',
            'Menționează numele revistei la care lucrează Andriana Fianu, utilizând informaţiile din textul dat.',
            'Precizează modul în care Gabriel Dimisianu își propune să se comporte în timpul vizitei la Tudor Arghezi, justificându-ți răspunsul cu o secvență semnificativă din textul dat. ',
            'Explică motivul pentru care Gabriel Dimisianu este surprins când Tudor Arghezi intră în cameră.',
            'Prezintă, în 30-50 de cuvinte, o trăsătură morală a lui Gabriel Dimisianu, care se desprinde din textul dat. ',
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Redactează un text ',
        descriere: 'Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă emoțiile influențează sau nu sinceritatea exprimării. ',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2024',
        an: 2024,
        sesiune: 'sesiune de vară',
        tip: 'redactare',
        text: `Eram, în 1960, tânăr redactor la Gazeta literară, când colega mea Andriana Fianu mi-a propus pe neașteptate, într-o după-amiază, s-o însoțesc acasă la Tudor Arghezi, de unde urma să luăm un text pe care poetul îl pregătise pentru revistă. [...] 
        I-am fost recunoscător Andrianei Fianu pentru ideea de-a mă lua cu ea la Arghezi, asta în primul moment, după care m-au copleșit emoțiile și mai c-aș fi renunțat. Atât că, ghicindu-mi frământarea, energica Adi nu mi-a lăsat timp să mă răzgândesc, ci m-a luat scurt: „Hai că nu te mănâncă, grăbește-te că-ntârziem!”. Ce era să fac? Am urmat-o fără murmur, pe drum tot gândindu-mă cum să mă comport când mă voi afla în fața marelui om. Voi fi ochi și urechi, dar mut, am decis până la urmă. Voi fi însoțitorul mut al colegei mele, care, prietenă cu Mițura*, obișnuită a casei, va avea ea toată inițiativa. Înainte de-a ne urca în troleibuz, în Piața Romană, am cumpărat flori, căci ne aflam în preajma zilei de 21 mai, când era aniversarea lui Arghezi. Și nu o aniversare oarecare, poetul împlinind chiar atunci optzeci de ani. 
        În epoca de care vorbesc, familia Arghezi ocupa un apartament la parterul unui mic bloc de pe Bulevardul Aviatorilor, în vecinătatea imediată a pieței cu același nume, azi Piața Charles de Gaulle. Am sunat, cineva ne-a deschis, conducându-ne într-un living cu ferestre mari, unde, după ce am așteptat câteva minute, a intrat poetul, neînsoțit. Ce m-a izbit îndată au fost pașii repezi făcuți de Arghezi, siguranța mișcărilor de om în toată puterea. Imaginea contrasta frapant cu aceea a neajutorării fizice pe care-o aveam despre poet de la cele câteva apariții în săli publice. Acolo pășea încet, ezitant, sprijinit în baston și ținut întotdeauna de braț de atleticul Baruțu*. Aici, în schimb, în spațiul intim, Arghezi se mișca dezinvolt, fără baston și fără Baruțu. Peste puțin timp a intrat și doamna Paraschiva, care s-a așezat pe un fotoliu, alături de Arghezi. [...]  
        De ce mi-era teamă, n-am scăpat. Adi m-a prezentat, cum era firesc, din moment ce mă adusese cu ea, dar a adăugat, rea inspirație, că sunt critic literar, unul dintre criticii tineri [...] în care se pun speranțe etc. Arghezi a reacționat, săgetându-mă cu o întrebare care m-a descumpănit: „Și ce vrei dumneata să critici?”. M-am pierdut, cred că roșisem, după care totuși am încercat să articulez un răspuns care era mai degrabă o dezvinovățire. Că eu de fapt nu vreau să critic ceva sau pe cineva, că mai mult decât să scriu îmi place să citesc, că dacă am o pasiune este cititul, însă, din obligație redacțională, trebuie din când în când să fac prezentări de cărți, nu neapărat critice… „Așa mai merge”, mi-a oprit Arghezi chinuita perorație*, schițând parcă și un zâmbet, după care m-a lăsat în plata Domnului, nemaiîntrebându-mă nimic. Fapt este că în acea împrejurare, luat repede și țintuit de privirea ironică a poetului, m-am lepădat nu ca Petru, de trei ori, ci numai o dată, de profesiunea pe care tocmai începusem s-o practic, de bine, de rău. Nu am mințit totuși în ce privește plăcerea cititului, care o întrecea, cum o întrece și acum, pe aceea a scrisului.  `,
        cerinte: [
            'Cerințe totale: Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă emoțiile influențează sau nu sinceritatea exprimării, raportându-te atât la informațiile din fragmentul extras din volumul Amintiri și portrete literare de Gabriel Dimisianu, cât și la experiența personală sau culturală.  ',
            'Sumar conținut:  formularea unei opinii faţă de problematica pusă în discuţie, enunţarea şi dezvoltarea corespunzătoare a două argumente adecvate opiniei și formularea unei concluzii pertinente',
            'Sumar redactare:  utilizarea corectă a conectorilor în argumentare, respectarea normelor limbii literare (norme de exprimare, de ortografie și de punctuație), aşezarea în pagină, lizibilitatea, respectarea precizării privind numărul minim de cuvinte. '
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Prezentarea unui fragment literar',
        descriere: 'Prezintă, în minimum 50 de cuvinte, rolul notațiilor autorului în fragmentul de mai jos. ',
        numarSubiect: 2,
        profil: 'real',
        data: '2024',
        an: 2024,
        sesiune: 'sesiune de vară',
        tip: 'eseu',
        text: `ACTUL I 
        O cameră simplu mobilată. [...] În stânga, lângă perete, o etajeră cu volume legate frumos și frumos orânduite. În dosul etajerei, o ușă care duce în odaia de dormit a doamnei Chirică și în camera copiilor. În dreapta, planul întâi, camera domnului Chirică. O ușă laterală, ceva mai sus, răspunde în coridorul care duce la bucătărie. În fund, un mic vestibul cu geamlâc. 
        Nichita și Varlam se zăresc în geamlâcul vestibulului. Varlam deschide și îi face loc lui Nichita. Amândoi își agață pălăriile în cuier. 
        NICHITA: Sunt tare curios să-l văd la față. 
        VARLAM: E neschimbat ca înfățișare, atâta doar, că anii i-au cam pungit obrajii. (Oprindu-se în prag.) Să știi că nu-i acasă. 
        NICHITA: Ce te face să crezi? 
        VARLAM: Dacă nu-i în colțișorul lui (arată biroul), slabă nădejde să fie... (Deschide ușa din dreapta, dispare o clipă, apoi se întoarce.) Nu-i. 
        Gh. Ciprian, Omul cu mârțoaga `,
        cerinte: [
            `Prezintă, în minimum 50 de cuvinte, rolul notațiilor autorului în fragmentul de mai jos. `,
            `Conținut: precizează rolul notațiilor autorului în fragmentul de mai jos`,
            `Redactare: utiliză corect conectorii în argumentare; respectă normele limbii literare (exprimare, ortografie, punctuație), așezarea în pagină și lizibilitatea`,
        ],
        punctaj: [
            `Total: 10`,
            `Conținut: 6(precizează rolul notațiilor autorului în fragmentul de mai jos)`,
            `Redactare: 4(utilizarea limbii literare – 1 punct; logica înlănțuirii ideilor – 1 punct; ortografia – 1 punct; punctuaţia – 1 punct)`,
        ]
    },
    {
        titlu: 'Redactare eseu',
        descriere: 'Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități ale unei nuvele studiate. ',
        numarSubiect: 3,
        profil: 'real',
        data: '2024',
        an: 2024,
        sesiune: 'sesiune de vară',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități de construcție a unui personaj într-un text narativ studiat, aparținând lui Ion Creangă sau lui Ioan Slavici. În elaborarea eseului, vei avea în vedere următoarele repere: – evidențierea a două trăsături care fac posibilă încadrarea nuvelei studiate într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică; – comentarea a două episoade/secvențe semnificative pentru tema nuvelei studiate; – analiza a două elemente de structură, de compoziție și/sau de limbaj, relevante pentru nuvela studiată (de exemplu: acțiune, conflict, relații temporale și spațiale, incipit, final, tehnici narative, instanțe ale comunicării narative, perspectivă narativă, registre stilistice, limbaj etc.). `,
        cerinte: [
            '',
            'Evidențiază o trăsătură a personajului ales, prin două episoade/secvențe comentate',
            'Analizează două elemente de structură, compoziție și/sau limbaj relevante pentru construcția personajului'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'Ioan Slavici, Scriitor, în volumul Amintiri',
        descriere: 'Citește următorul fragment al lui Ioan Slavici și rezolvă cerințele date.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2024',
        an: 2024,
        sesiune: 'model',
        tip: 'analiza',
        text: `Eu m-am simțit viața mea întreagă mai presus de toate dascăl. A le da altora învățături a fost pentru mine totdeauna o mulțumire, și cele mai vii mulțumiri le-am avut stând de vorbă cu oameni prin care mă puteam dumiri ori plimbându-mă cu elevii mei. Mai ales ca dascăl mi-am câștigat și pânea de toate zilele, și nu-mi aduc aminte să mi se fi-ntâmplat vreodată ca să fiu nemulțumit de-nvățăturile ce-am dat. 
Nu tot așa ca ziarist. 
Fiind adecă vorba de interesele obștești, îmi dădeam totdeauna silința să spun ceea ce simt, gândesc și vor cei mulți, și nu o dată mi se-ntâmpla să stau la-ndoială dacă nu cumva greșesc. Abia târziu de tot am ajuns să mă-ncredințez că sunt puțini oamenii care au convingeri. Cei mai mulți nici nu știu ce va să zică a fi convins. Ei au numai păreri, pe care le schimbă după împrejurări și după impulsiuni momentane. 
Partea individuală deci în scrisa mea ca ziarist erau îndrumările pe care le dădeam, iar aceste adeseori nu se potriveau cu felul de a gândi al celor mai mulți. 
Cu atât mai vârtos ieșea la iveală această râvnă dăscălească în scrierile mele literare. 
Nu puteam să mă-mpac cu gândul că lectura de orișice fel e numai o plăcută pierdere de vreme. În gândul meu, rostul scrierii a fost totdeauna îndrumarea spre o viețuire potrivită cu firea omenească. 
Din onorariul pe care-l aveam la Sibiu ca director al ziarului Tribuna ori din cel ce mi se dedea în urmă la București ca director al ziarului Minerva nu aveam să trăiesc. Cu atât mai puțin aș fi putut să trăiesc din onorariile ce am primit pentru scrierile mele literare. Ar fi trebuit să alerg și eu pe la redacțiuni, ca să mi se facă reclamă, și pe la autorități, ca să-mi cumpere exemplare, ceea ce era împotriva firii mele. 
Scriam deci pentru mulțumirea mea sufletească și-mi era destul că le făceam prin aceasta plăcere unora dintre prietenii și binevoitorii mei. O spun aceasta pentru ca să caracterizez timpul prin care am trecut. 
Scriam pentru că nu eram în stare să mă stăpânesc. Scăpat însă de neastâmpărul de care eram cuprins, puțin îmi păsa dacă se publică sau nu ceea ce am scris: îmi era destul că am citit scrisa mea în fața cuiva. Nu numai țineam apoi seamă de efectul produs de scriere, ci, scriind, îmi dădeam toată silința să mă potrivesc atât în plăsmuire, cât și în formă cu felul de a vedea și cu gustul acelora pe care-i aveam în vedere. Așa se adeverea în ceea ce mă privește că lucrarea literară se desfășoară sub înrâurirea publicului cititor.  
La Viena și la Iași am scris sub înrâurirea lui Eminescu, în primii ani ai petrecerii mele la București, sub a lui Titu Maiorescu, iar în urmă nu am publicat decât ceea ce am citit mai nainte soției mele. [...] 
Scriam, se-nțelege, mai ales când aveam timp liber. În timpul pe care l-am petrecut la Arad și la Oradea-Mare n-am scris însă pentru că nu aveam cui să-i citesc ceea ce aș fi scris, iar în timpul celor patrusprezece ani petrecuți la Măgurele, am scris puțin, pentru că nu aveam răgaz pentru așa ceva.  
Ioan Slavici, Scrietor, în volumul Amintiri`,
        cerinte: [
            'Indică sensul din text al cuvântului totdeauna și al secvenței nu eram în stare.',
            'Menționează denumirea publicațiilor pe care le-a condus Ioan Slavici, utilizând informaţiile din textul dat.',
            'Precizează numele unei personalități culturale care l-a influențat pe Ioan Slavici, justificându-ți răspunsul cu o secvență semnificativă din textul dat.',
            'Explică motivul pentru care Ioan Slavici se consideră împlinit mai ales prin activitatea sa didactică.',
            'Prezintă, în 30 – 50 de cuvinte, o trăsătură a lui Ioan Slavici, așa cum reiese din textul dat.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Redactează un text argumentativ',
        descriere: 'Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă procesul creației trebuie sau nu să fie influențat de așteptările publicului.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2024',
        an: 2024,
        sesiune: 'model',
        tip: 'redactare',
        text: `Eu m-am simțit viața mea întreagă mai presus de toate dascăl. A le da altora învățături a fost pentru mine totdeauna o mulțumire, și cele mai vii mulțumiri le-am avut stând de vorbă cu oameni prin care mă puteam dumiri ori plimbându-mă cu elevii mei. Mai ales ca dascăl mi-am câștigat și pânea de toate zilele, și nu-mi aduc aminte să mi se fi-ntâmplat vreodată ca să fiu nemulțumit de-nvățăturile ce-am dat. 
Nu tot așa ca ziarist. 
Fiind adecă vorba de interesele obștești, îmi dădeam totdeauna silința să spun ceea ce simt, gândesc și vor cei mulți, și nu o dată mi se-ntâmpla să stau la-ndoială dacă nu cumva greșesc. Abia târziu de tot am ajuns să mă-ncredințez că sunt puțini oamenii care au convingeri. Cei mai mulți nici nu știu ce va să zică a fi convins. Ei au numai păreri, pe care le schimbă după împrejurări și după impulsiuni momentane. 
Partea individuală deci în scrisa mea ca ziarist erau îndrumările pe care le dădeam, iar aceste adeseori nu se potriveau cu felul de a gândi al celor mai mulți. 
Cu atât mai vârtos ieșea la iveală această râvnă dăscălească în scrierile mele literare. 
Nu puteam să mă-mpac cu gândul că lectura de orișice fel e numai o plăcută pierdere de vreme. În gândul meu, rostul scrierii a fost totdeauna îndrumarea spre o viețuire potrivită cu firea omenească. 
Din onorariul pe care-l aveam la Sibiu ca director al ziarului Tribuna ori din cel ce mi se dedea în urmă la București ca director al ziarului Minerva nu aveam să trăiesc. Cu atât mai puțin aș fi putut să trăiesc din onorariile ce am primit pentru scrierile mele literare. Ar fi trebuit să alerg și eu pe la redacțiuni, ca să mi se facă reclamă, și pe la autorități, ca să-mi cumpere exemplare, ceea ce era împotriva firii mele. 
Scriam deci pentru mulțumirea mea sufletească și-mi era destul că le făceam prin aceasta plăcere unora dintre prietenii și binevoitorii mei. O spun aceasta pentru ca să caracterizez timpul prin care am trecut. 
Scriam pentru că nu eram în stare să mă stăpânesc. Scăpat însă de neastâmpărul de care eram cuprins, puțin îmi păsa dacă se publică sau nu ceea ce am scris: îmi era destul că am citit scrisa mea în fața cuiva. Nu numai țineam apoi seamă de efectul produs de scriere, ci, scriind, îmi dădeam toată silința să mă potrivesc atât în plăsmuire, cât și în formă cu felul de a vedea și cu gustul acelora pe care-i aveam în vedere. Așa se adeverea în ceea ce mă privește că lucrarea literară se desfășoară sub înrâurirea publicului cititor.  
La Viena și la Iași am scris sub înrâurirea lui Eminescu, în primii ani ai petrecerii mele la București, sub a lui Titu Maiorescu, iar în urmă nu am publicat decât ceea ce am citit mai nainte soției mele. [...] 
Scriam, se-nțelege, mai ales când aveam timp liber. În timpul pe care l-am petrecut la Arad și la Oradea-Mare n-am scris însă pentru că nu aveam cui să-i citesc ceea ce aș fi scris, iar în timpul celor patrusprezece ani petrecuți la Măgurele, am scris puțin, pentru că nu aveam răgaz pentru așa ceva.  
Ioan Slavici, Scrietor, în volumul Amintiri`,
        cerinte: [
            'Cerințe totale: Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă procesul creației trebuie sau nu să fie influențat de așteptările publicului, raportându-te atât la informațiile din textul Scrietor, extras din volumul Amintiri de Ioan Slavici, cât și la experiența personală sau culturală.',
            'Sumar conținut: formularea unei opinii față de problematica pusă în discuție, enunțarea şi dezvoltarea corespunzătoare a două argumente adecvate opiniei și formularea unei concluzii pertinente',
            'Sumar redactare: utilizarea corectă a conectorilor în argumentare, respectarea normelor limbii literare (norme de exprimare, de ortografie și de punctuație), așezarea în pagină, lizibilitatea, respectarea precizării privind numărul minim de cuvinte.'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Analiza unui text poetic',
        descriere: 'Comentează, în minimum 50 de cuvinte, textul de mai jos, evidențiind relația dintre ideea poetică și mijloacele artistice.',
        numarSubiect: 2,
        profil: 'real',
        data: '2024',
        an: 2024,
        sesiune: 'model',
        tip: 'poezie',
        text: `Același freamăt trece-n crâng, 
Aceleași ape-n văi se frâng, 
Căzând din stâncă-n stâncă, 

Același a rămas și-acum 
Conacu-n margine de drum, 
În liniște adâncă. 

Deasupra lui pier stoluri-stol 
Pribegii nori pe cerul gol, 
Și-n nopțile cu lună 

Ca ieri alături amândoi 
Stam ascultând glas de cimpoi 
Din munți în munți cum sună... 

Ion Pillat, Același freamăt`,
        cerinte: [
            'Comentează, în minimum 50 de cuvinte, textul de mai jos, evidențiind relația dintre ideea poetică și mijloacele artistice.',
            'Conținut: precizează relația dintre ideea poetică și mijloacele artistice',
            'Redactare: utiliză corect conectorii în argumentare; respectă normele limbii literare (exprimare, ortografie, punctuație), așezarea în pagină și lizibilitatea'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6(precizează relația dintre ideea poetică și mijloacele artistice)',
            'Redactare: 4(utilizarea limbii literare – 1 punct; logica înlănțuirii ideilor – 1 punct; ortografia – 1 punct; punctuația – 1 punct)'
        ]
    },
    {
        titlu: 'Redactează un eseu',
        descriere: 'Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități ale unui text dramatic postbelic studiat.',
        numarSubiect: 3,
        profil: 'real',
        data: '2024',
        an: 2024,
        sesiune: 'model',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități ale unui text dramatic postbelic studiat. În elaborarea eseului, vei avea în vedere următoarele repere: – evidențierea a două trăsături care fac posibilă încadrarea textului dramatic postbelic studiat într-un curent cultural/literar sau într-o orientare tematică; – comentarea a două scene/secvențe relevante pentru tema textului dramatic postbelic studiat; – analiza a două componente de structură şi/sau de limbaj, semnificative pentru textul dramatic postbelic studiat (de exemplu: acțiune, personaj, notațiile autorului, conflict dramatic, registre stilistice, limbaj, act, scenă etc.). Notă Ordinea integrării reperelor în cuprinsul eseului este la alegere. Pentru conţinutul eseului, vei primi 18 puncte (câte 6 puncte pentru fiecare cerinţă/reper). Pentru redactarea eseului, vei primi 12 puncte (existența părților componente – introducere, cuprins, încheiere – 1 punct; logica înlănțuirii ideilor – 1 punct; abilități de analiză și de argumentare – 3 puncte; utilizarea limbii literare – 2 puncte; ortografia – 2 puncte; punctuaţia – 2 puncte; așezarea în pagină, lizibilitatea – 1 punct). În vederea acordării punctajului pentru redactare, eseul trebuie să aibă minimum 400 de cuvinte şi să dezvolte subiectul propus.`,
        cerinte: [
            'Evidențiază două trăsături care fac posibilă încadrarea textului dramatic postbelic studiat într-un curent cultural/literar sau într-o orientare tematică',
            'Comentează două scene/secvențe relevante pentru tema textului dramatic postbelic studiat',
            'Analizează două componente de structură şi/sau de limbaj, semnificative pentru textul dramatic postbelic studiat'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'Liviu Rebreanu, Metropole',
        descriere: 'Citește următorul fragment al lui Liviu Rebreanu și rezolvă cerințele date.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2024',
        an: 2024,
        sesiune: 'simulare',
        tip: 'analiza',
        text: `În fiecare dimineață, când ies, oricât aș fi de grăbit, mă oprește un răstimp librăria de alături. E un local modest, ca mai toate librăriile pariziene, cu vitrinele întinse afară, pe tejghele ieftine, până în mijlocul trotuarului. Farmecul ei, și al tuturor, tocmai asta îl face. Astfel poate întâmpina și pe trecătorii cei mai indiferenți. Jumătate din deverul* cotidian de-aici iese, din vânzările de pe trotuar oamenilor grăbiți care altminteri n-ar fi cumpărat. 
Printre tejghele mișună veșnic curioșii. Cei ce zăbovesc mai îndelung sunt studenți care n-au mijloace să cumpere și care citesc aici cartea pe care le-o poftește inima. Și mai sunt alți însetați de carte, tineri și bătrâni, săraci care-și hrănesc astfel sufletul cu lectura ce le trebuie. Cărțile netăiate pricinuiesc sforțări speciale pentru a-și trăda cuprinsul. Câte-un pasionat face apel la librar și librarul îi taie* paginile dorite. De altminteri, când n-are cumpărători, librarul însuși împreună cu vânzătorii lui se amestecă printre cititorii clandestini, să citească și ei. 
Cartierul Latin e plin de librării, trotuarele lui oferă cărți la fiece pas. Și buchiniștii* legendari de pe chei și cei de la Odéon. Parcă e o cetate a cărții subt oblăduirea Institutului, a Sorbonei și a celorlalte uzine de cultură. Dacă n-a pornit de-aici, în orice caz aici se întreține cu ardoare cultul cărții și al literaturii. 
Nicăieri în lume cartea nu e mai prețuită ca în Franța. În alte țări poate să se citească mai mult, să se tipărească mai multe cărți. Aici, cartea e o realitate vie, un factor social cu o influență covârșitoare.  
Numai la Paris cartea devine un eveniment monden care interesează nu doar cercurile literare, ci și saloanele, pe oamenii de stat, colectivitățile. Aici, o carte stârnește pasiuni, elanuri, înrâurește politica sau justiția, e un element important al vieții obștești. Mândria presei franceze, de orice nuanță, continuă a fi rubrica literară, care nu e întâmplătoare, ci organică. O carte, un curent literar, o controversă estetică sunt subiecte care împodobesc deseori articole de fond, chiar în ziare strict politice. Nu s-ar putea închipui un ziar francez care să aibă spații rezervate pentru cinematograf și sporturi, fără să aibă mai întâi o rubrică foarte îngrijită a literelor, cum bunăoară se întâmplă nu numai la noi, dar chiar în țări de mare civilizație. Adevărat că acolo cititorii se interesează de faptele literare, ca și de cele diverse, și le reclamă, pe când ziarele noastre au scuza că rubrica literară e loc mort, fiindcă nimeni, afară de scriitorii înșiși, ba uneori nici chiar ei, nu se pasionează de soarta ei, pe când pentru sporturi, de pildă, se manifestă un interes tot mai viu, ceea ce justifică permanentizarea și sporirea cronicii respective. Colaborarea scriitorilor la ziarele franceze, în calitate de scriitori și, deci, cu contribuții oarecum de specialitate, e un fenomen special, vrednic de toată atenția. Relațiile dintre ziariști și scriitori sunt într-adevăr colegiale. Ziaristul francez se consideră scriitor înainte de toate, chiar când munca ziaristică îi impune obligații de șablon, ceea ce se constată din însuși felul îngrijit literar cum sunt scrise mai toate ziarele franceze. Scriitorii înșiși îi consideră drept colegi adevărați pe ziariști și nu disprețuiesc suveran scrisul destinat să trăiască o singură zi. Asemenea cordialitate de relații nu se mai întâlnește aiurea.    
Liviu Rebreanu, Metropole 
*dever – volumul vânzărilor de mărfuri pe o perioadă dată  
*a tăia – a desprinde, a desface filele unei cărți necitite, unite la margini 
*buchinist – persoană care se ocupă cu achiziționarea și cu vânzarea de cărți vechi`,
        cerinte: [
            'Indică sensul din text al cuvântului sforțări și al secvenței la fiece pas.',
            'Menționează soluția găsită de persoanele interesate de lectură, care nu au posibilitatea să-și cumpere cărți, utilizând informaţiile din textul dat.',
            'Precizează un efect al creșterii interesului față de sport în spațiul românesc, justificându-ți răspunsul cu o secvență semnificativă din textul dat.',
            'Explică un motiv pentru care tejghelele librăriilor din Paris sunt amplasate până în mijlocul trotuarului.',
            'Prezintă, în 30 – 50 de cuvinte, relația dintre jurnaliștii francezi și scriitori, aşa cum reiese din textul dat.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Redactează un text argumentativ',
        descriere: 'Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă presa contribuie sau nu la formarea gustului artistic al publicului.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2024',
        an: 2024,
        sesiune: 'simulare',
        tip: 'redactare',
        text: `În fiecare dimineață, când ies, oricât aș fi de grăbit, mă oprește un răstimp librăria de alături. E un local modest, ca mai toate librăriile pariziene, cu vitrinele întinse afară, pe tejghele ieftine, până în mijlocul trotuarului. Farmecul ei, și al tuturor, tocmai asta îl face. Astfel poate întâmpina și pe trecătorii cei mai indiferenți. Jumătate din deverul* cotidian de-aici iese, din vânzările de pe trotuar oamenilor grăbiți care altminteri n-ar fi cumpărat. 
Printre tejghele mișună veșnic curioșii. Cei ce zăbovesc mai îndelung sunt studenți care n-au mijloace să cumpere și care citesc aici cartea pe care le-o poftește inima. Și mai sunt alți însetați de carte, tineri și bătrâni, săraci care-și hrănesc astfel sufletul cu lectura ce le trebuie. Cărțile netăiate pricinuiesc sforțări speciale pentru a-și trăda cuprinsul. Câte-un pasionat face apel la librar și librarul îi taie* paginile dorite. De altminteri, când n-are cumpărători, librarul însuși împreună cu vânzătorii lui se amestecă printre cititorii clandestini, să citească și ei. 
Cartierul Latin e plin de librării, trotuarele lui oferă cărți la fiece pas. Și buchiniștii* legendari de pe chei și cei de la Odéon. Parcă e o cetate a cărții subt oblăduirea Institutului, a Sorbonei și a celorlalte uzine de cultură. Dacă n-a pornit de-aici, în orice caz aici se întreține cu ardoare cultul cărții și al literaturii. 
Nicăieri în lume cartea nu e mai prețuită ca în Franța. În alte țări poate să se citească mai mult, să se tipărească mai multe cărți. Aici, cartea e o realitate vie, un factor social cu o influență covârșitoare.  
Numai la Paris cartea devine un eveniment monden care interesează nu doar cercurile literare, ci și saloanele, pe oamenii de stat, colectivitățile. Aici, o carte stârnește pasiuni, elanuri, înrâurește politica sau justiția, e un element important al vieții obștești. Mândria presei franceze, de orice nuanță, continuă a fi rubrica literară, care nu e întâmplătoare, ci organică. O carte, un curent literar, o controversă estetică sunt subiecte care împodobesc deseori articole de fond, chiar în ziare strict politice. Nu s-ar putea închipui un ziar francez care să aibă spații rezervate pentru cinematograf și sporturi, fără să aibă mai întâi o rubrică foarte îngrijită a literelor, cum bunăoară se întâmplă nu numai la noi, dar chiar în țări de mare civilizație. Adevărat că acolo cititorii se interesează de faptele literare, ca și de cele diverse, și le reclamă, pe când ziarele noastre au scuza că rubrica literară e loc mort, fiindcă nimeni, afară de scriitorii înșiși, ba uneori nici chiar ei, nu se pasionează de soarta ei, pe când pentru sporturi, de pildă, se manifestă un interes tot mai viu, ceea ce justifică permanentizarea și sporirea cronicii respective. Colaborarea scriitorilor la ziarele franceze, în calitate de scriitori și, deci, cu contribuții oarecum de specialitate, e un fenomen special, vrednic de toată atenția. Relațiile dintre ziariști și scriitori sunt într-adevăr colegiale. Ziaristul francez se consideră scriitor înainte de toate, chiar când munca ziaristică îi impune obligații de șablon, ceea ce se constată din însuși felul îngrijit literar cum sunt scrise mai toate ziarele franceze. Scriitorii înșiși îi consideră drept colegi adevărați pe ziariști și nu disprețuiesc suveran scrisul destinat să trăiască o singură zi. Asemenea cordialitate de relații nu se mai întâlnește aiurea.    
Liviu Rebreanu, Metropole 
*dever – volumul vânzărilor de mărfuri pe o perioadă dată  
*a tăia – a desprinde, a desface filele unei cărți necitite, unite la margini 
*buchinist – persoană care se ocupă cu achiziționarea și cu vânzarea de cărți vechi`,
        cerinte: [
            'Cerințe totale: Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă presa contribuie sau nu la formarea gustului artistic al publicului, raportându-te atât la informațiile din fragmentul extras din volumul Metropole de Liviu Rebreanu, cât și la experiența personală sau culturală.',
            'Sumar conținut: formularea unei opinii față de problematica pusă în discuție, enunțarea şi dezvoltarea corespunzătoare a două argumente adecvate opiniei și formularea unei concluzii pertinente',
            'Sumar redactare: utilizarea corectă a conectorilor în argumentare, respectarea normelor limbii literare (norme de exprimare, de ortografie și de punctuație), așezarea în pagină, lizibilitatea, respectarea precizării privind numărul minim de cuvinte.'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Analiza rolului notațiilor autorului',
        descriere: 'Prezintă, în minimum 50 de cuvinte, rolul notațiilor autorului în fragmentul de mai jos.',
        numarSubiect: 2,
        profil: 'real',
        data: '2024',
        an: 2024,
        sesiune: 'simulare',
        tip: 'drama',
        text: `SCENA III 
NASTASIA, ION SORCOVĂ 
NASTASIA (schimbare, veselie nervoasă, neliniște; umblă de colo până colo și caută): N-ai văzut oglinda? 
SORCOVĂ (pe pat și se uită îngândurat la ea). 
NASTASIA: Parcă era la fereastră, adineauri. 
SORCOVĂ (gest: o fi fost...). 
NASTASIA (își aduce aminte și caută, grabnic, în cutia mesei): Uite-o! (Se privește în oglindă, scoate din cutia mesei: pudră – într-o hârtioară – și foiță roșie; iar se uită în oglindă și se întristează.) Nu-i așa că m-am urâțit? Și-am îmbătrânit, m-am zbârcit la ochi... 
SORCOVĂ (tace). 
NASTASIA (îl privește): De ce taci? Vreau să fiu frumoasă! Vine Vulpașin și vreau să fiu frumoasă! Ce te uiți așa la mine? (Râs chinuit.) 
George Mihail-Zamfirescu, Domnișoara Nastasia`,
        cerinte: [
            'Prezintă, în minimum 50 de cuvinte, rolul notațiilor autorului în fragmentul de mai jos.',
            'Conținut: precizează rolul notațiilor autorului în fragmentul de mai jos',
            'Redactare: utiliză corect conectorii în argumentare; respectă normele limbii literare (exprimare, ortografie, punctuație), așezarea în pagină și lizibilitatea'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6(precizează rolul notațiilor autorului în fragmentul de mai jos)',
            'Redactare: 4(utilizarea limbii literare – 1 punct; logica înlănțuirii ideilor – 1 punct; ortografia – 1 punct; punctuaţia – 1 punct)'
        ]
    },
    {
        titlu: 'Redactează un eseu',
        descriere: 'Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularităţi ale unui text poetic studiat, aparţinând lui Lucian Blaga.',
        numarSubiect: 3,
        profil: 'real',
        data: '2024',
        an: 2024,
        sesiune: 'simulare',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularităţi ale unui text poetic studiat, aparţinând lui Lucian Blaga. În elaborarea eseului, vei avea în vedere următoarele repere: – evidenţierea a două trăsături care fac posibilă încadrarea textului poetic într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică; – comentarea a două imagini/idei poetice relevante pentru tema textului poetic; – analiza a două elemente de compoziţie şi/sau de limbaj, semnificative pentru textul poetic (de exemplu: titlu, incipit, relații de opoziție și de simetrie, motive poetice, figuri semantice, elemente de prozodie etc.). Notă Ordinea integrării reperelor în cuprinsul eseului este la alegere. Pentru conţinutul eseului, vei primi 18 puncte (câte 6 puncte pentru fiecare cerinţă/reper). Pentru redactarea eseului, vei primi 12 puncte (existența părților componente – introducere, cuprins, încheiere – 1 punct; logica înlănțuirii ideilor – 1 punct; abilități de analiză și de argumentare – 3 puncte; utilizarea limbii literare – 2 puncte; ortografia – 2 puncte; punctuaţia – 2 puncte; așezarea în pagină, lizibilitatea – 1 punct). În vederea acordării punctajului pentru redactare, eseul trebuie să aibă minimum 400 de cuvinte şi să dezvolte subiectul propus.`,
        cerinte: [
            'Evidenţiază două trăsături care fac posibilă încadrarea textului poetic într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică',
            'Comentează două imagini/idei poetice relevante pentru tema textului poetic',
            'Analizează două elemente de compoziţie şi/sau de limbaj, semnificative pentru textul poetic'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'I. Valerian, interviu cu I. Al. Brătescu-Voinești, în vol. Cu scriitorii prin veac',
        descriere: 'Citește următorul fragment al lui I. Valerian și rezolvă cerințele date.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2024',
        an: 2024,
        sesiune: 'sesiune de toamnă',
        tip: 'analiza',
        text: `Ne alăturăm cu însuflețire la inițiativa luată de scriitori, în frunte cu președintele Liviu Rebreanu, pentru a sărbători pe I. Al. Brătescu-Voinești cu prilejul împlinirii vârstei de 60 de ani. Această săptămână de ovații nu-i numai a autorului intrat în istorie, ea reprezintă pentru breasla scriitoricească o ridicare în conștiința profesională, iar pentru tinerii poeți, nădejdi pentru vremuri mai bune. 
L-am găsit pe prozator într-o cameră din locuința sa amenajată în atelier, lucrând la un banc de tâmplărie. [...] 
— Deși știu că fugiți de interviuri, v-aș ruga, din partea cititorilor Vieții literare, să ne acordați câteva cuvinte în această săptămână consacrată dvs. 
— Simt o adâncă jenă. Îți mărturisesc sincer, îmi pare rău că se începe cu mine. Aș fi luat parte bucuros, împreună cu dvs., la această serbare, dar să fi fost vorba de altul. Uite, mă gândesc la ceilalți din generația mea, care ar fi meritat mai mult ca mine această onoare: Caragiale, Vlahuță etc.; Duiliu Zamfirescu n-a avut această bucurie când a împlinit 60 de ani. [...] 
Fără îndoială, gestul acesta al generației dvs. mă emoționează profund. Este frumos că, luându-se pildă din alte părți unde se sărbătoresc artiștii în vârstă, se introduce și la noi un obicei bun. Este puternică impresia când scriitorul, care este o fabrică de bucurii pentru alții, simte el însuși întorcându-se dintre oameni recunoștința, răsplătindu-i durerile măcar la bătrânețe. [...] 
— Mă întrebi de preferințele mele literare. Să-mi dai voie să nu răspund cu nume proprii. Sunt pentru cea mai desăvârșită libertate în artă, cu condițiunea să fie făcută cu convingere și sinceritate. 
Dar pentru că veni vorba de preferință, îți voi spune câteva cuvinte despre pasiunea pe care mi-o cunoști: pescuitul. Este un sport pe care-l recomand cu căldură oricărui intelectual, dar îndeosebi scriitorului. Stând nemișcat cu undița pe malul apei, gândurile curg la vale în voie și sufletul ți se purifică. Acolo, în calmul naturii, fenomenele pe care le crezi în oraș catastrofale le vezi ca printr-un binoclu întors. Îți dai seama de inutilitatea tuturor patimilor omenești. [...] În străinătate, pescuitul este iubit cu pasiune: oameni politici, artiști, profesori își petrec duminicile și sărbătorile pe malul râurilor, în sânul naturii. [...]  
Când nu plec la pescuit, divertismentul de la munca intelectuală mi-l procur cu lucrul tâmplăriei. Aici găsesc ritmul sufletesc care-mi trebuie pentru scris.  
Văd în ziarul Universul că se pun întrebări: „Ce-ai fi vrut să fii dacă nu erai ce ești?". Eu aș fi vrut să devin calfă de grădinar sau lucrător de mobile de lux. În aceste meserii sufletul găsește pacea ideală, rămânând în atenție numai lucrul în sine. Pasiunea florilor am moștenit-o de la tata, mic boiernaș la Târgoviște. Aveam și eu acolo o frumoasă grădină. Florile oferă o sursă perpetuă de fericire. Idealul meu este să mă retrag undeva la țară. Să am o grădiniță cu flori, pe care să le îngrijesc singur, iar în apropiere un râușor, în care să-mi arunc undița din când în când. 
I-am cerut voie să-i răpesc numai un sfert de ceas și am stat peste două ore. Vocea d-lui Brătescu-Voinești era atât de caldă, încât îmi părea că-mi vorbește bunicul copilăriei mele.  
I. Valerian, interviu cu I. Al. Brătescu-Voinești, în vol. Cu scriitorii prin veac`,
        cerinte: [
            'Indică sensul din text al cuvântului pildă și al secvenței din când în când.',
            'Menționează durata evenimentului în cadrul căruia a fost sărbătorit I. Al. Brătescu-Voinești, utilizând informaţiile din textul dat.',
            'Precizează un rol pe care tâmplăria îl are în ansamblul preocupărilor lui I. Al. Brătescu-Voinești, justificându-ți răspunsul cu o secvență semnificativă din textul dat.',
            'Explică motivul pentru care I. Al. Brătescu-Voinești consideră potrivită sărbătorirea scriitorilor.',
            'Prezintă, în 30-50 de cuvinte, o trăsătură morală a lui I. Al. Brătescu-Voinești, așa cum reiese din textul dat.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Redactează un text argumentativ',
        descriere: 'Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă activitățile în natură influențează sau nu stările sufletești.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2024',
        an: 2024,
        sesiune: 'sesiune de toamnă',
        tip: 'redactare',
        text: `Ne alăturăm cu însuflețire la inițiativa luată de scriitori, în frunte cu președintele Liviu Rebreanu, pentru a sărbători pe I. Al. Brătescu-Voinești cu prilejul împlinirii vârstei de 60 de ani. Această săptămână de ovații nu-i numai a autorului intrat în istorie, ea reprezintă pentru breasla scriitoricească o ridicare în conștiința profesională, iar pentru tinerii poeți, nădejdi pentru vremuri mai bune. 
L-am găsit pe prozator într-o cameră din locuința sa amenajată în atelier, lucrând la un banc de tâmplărie. [...] 
— Deși știu că fugiți de interviuri, v-aș ruga, din partea cititorilor Vieții literare, să ne acordați câteva cuvinte în această săptămână consacrată dvs. 
— Simt o adâncă jenă. Îți mărturisesc sincer, îmi pare rău că se începe cu mine. Aș fi luat parte bucuros, împreună cu dvs., la această serbare, dar să fi fost vorba de altul. Uite, mă gândesc la ceilalți din generația mea, care ar fi meritat mai mult ca mine această onoare: Caragiale, Vlahuță etc.; Duiliu Zamfirescu n-a avut această bucurie când a împlinit 60 de ani. [...] 
Fără îndoială, gestul acesta al generației dvs. mă emoționează profund. Este frumos că, luându-se pildă din alte părți unde se sărbătoresc artiștii în vârstă, se introduce și la noi un obicei bun. Este puternică impresia când scriitorul, care este o fabrică de bucurii pentru alții, simte el însuși întorcându-se dintre oameni recunoștința, răsplătindu-i durerile măcar la bătrânețe. [...] 
— Mă întrebi de preferințele mele literare. Să-mi dai voie să nu răspund cu nume proprii. Sunt pentru cea mai desăvârșită libertate în artă, cu condițiunea să fie făcută cu convingere și sinceritate. 
Dar pentru că veni vorba de preferință, îți voi spune câteva cuvinte despre pasiunea pe care mi-o cunoști: pescuitul. Este un sport pe care-l recomand cu căldură oricărui intelectual, dar îndeosebi scriitorului. Stând nemișcat cu undița pe malul apei, gândurile curg la vale în voie și sufletul ți se purifică. Acolo, în calmul naturii, fenomenele pe care le crezi în oraș catastrofale le vezi ca printr-un binoclu întors. Îți dai seama de inutilitatea tuturor patimilor omenești. [...] În străinătate, pescuitul este iubit cu pasiune: oameni politici, artiști, profesori își petrec duminicile și sărbătorile pe malul râurilor, în sânul naturii. [...]  
Când nu plec la pescuit, divertismentul de la munca intelectuală mi-l procur cu lucrul tâmplăriei. Aici găsesc ritmul sufletesc care-mi trebuie pentru scris.  
Văd în ziarul Universul că se pun întrebări: „Ce-ai fi vrut să fii dacă nu erai ce ești?". Eu aș fi vrut să devin calfă de grădinar sau lucrător de mobile de lux. În aceste meserii sufletul găsește pacea ideală, rămânând în atenție numai lucrul în sine. Pasiunea florilor am moștenit-o de la tata, mic boiernaș la Târgoviște. Aveam și eu acolo o frumoasă grădină. Florile oferă o sursă perpetuă de fericire. Idealul meu este să mă retrag undeva la țară. Să am o grădiniță cu flori, pe care să le îngrijesc singur, iar în apropiere un râușor, în care să-mi arunc undița din când în când. 
I-am cerut voie să-i răpesc numai un sfert de ceas și am stat peste două ore. Vocea d-lui Brătescu-Voinești era atât de caldă, încât îmi părea că-mi vorbește bunicul copilăriei mele.  
I. Valerian, interviu cu I. Al. Brătescu-Voinești, în vol. Cu scriitorii prin veac`,
        cerinte: [
            'Cerințe totale: Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă activitățile în natură influențează sau nu stările sufletești, raportându-te atât la informațiile din fragmentul extras din volumul Cu scriitorii prin veac, cât și la experiența personală sau culturală.',
            'Sumar conținut: formularea unei opinii faţă de problematica pusă în discuţie, enunţarea şi dezvoltarea corespunzătoare a două argumente adecvate opiniei și formularea unei concluzii pertinente',
            'Sumar redactare: utilizarea corectă a conectorilor în argumentare, respectarea normelor limbii literare (norme de exprimare, de ortografie și de punctuație), aşezarea în pagină, lizibilitatea, respectarea numărului minim de cuvinte.'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Analiza perspectivei narative',
        descriere: 'Prezintă, în minimum 50 de cuvinte, perspectiva narativă din fragmentul de mai jos.',
        numarSubiect: 2,
        profil: 'real',
        data: '2024',
        an: 2024,
        sesiune: 'sesiune de toamnă',
        tip: 'narativ',
        text: `Aproape de sfârșitul lunii, într-o zi când iar n-a găsit pe Dandu la întâlnirea fixată și după ce s-a consolat iar la Universitate cu colegii binevoitori, Liana s-a suit în tramvai și a pornit spre casă. Se uita distrată, din fereastra vagonului, la forfoteala lumii pe Calea Victoriei și pe bulevard. Deodată, în furnicarul de oameni de pe trotuarul cinematografelor, i se păru că zărește pe Dandu cu o femeie... Întoarse capul să se uite mai bine, dar tramvaiul gonea clopoțind furios și coroanele castanilor acoperiră grupul în care a zărit pălăria cafenie trasă pe ochi și în dreapta, cum o purta el. Vru să se dea jos la stația din Brezoianu, să alerge, să se convingă. Vagonul era arhiplin și ar fi trebuit să dea o luptă prea desperată ca să ajungă până la platforma de coborâre. 
„O, dacă asta e la mijloc!", își zicea mereu Liana nemaivăzând nimic până acasă, deși îi privea fix pe trecătorii de pe trotuare, parc-ar fi așteptat să mai apară pălăria cafenie...  
Liviu Rebreanu, Jar`,
        cerinte: [
            'Prezintă, în minimum 50 de cuvinte, perspectiva narativă din fragmentul de mai jos.',
            'Conținut: precizează perspectiva narativă din fragmentul de mai jos',
            'Redactare: utiliză corect conectorii în argumentare; respectă normele limbii literare (exprimare, ortografie, punctuație), așezarea în pagină și lizibilitatea'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6(precizează perspectiva narativă din fragmentul de mai jos)',
            'Redactare: 4(utilizarea limbii literare – 1 punct; logica înlănțuirii ideilor – 1 punct; ortografia – 1 punct; punctuaţia – 1 punct)'
        ]
    },
    {
        titlu: 'Redactează un eseu',
        descriere: 'Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularităţi ale unui text poetic studiat, aparţinând lui Mihai Eminescu sau lui George Bacovia.',
        numarSubiect: 3,
        profil: 'real',
        data: '2024',
        an: 2024,
        sesiune: 'sesiune de toamnă',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularităţi ale unui text poetic studiat, aparţinând lui Mihai Eminescu sau lui George Bacovia. În elaborarea eseului, vei avea în vedere următoarele repere: – evidenţierea a două trăsături care fac posibilă încadrarea textului poetic ales într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică; – comentarea a două imagini/idei poetice relevante pentru tema textului poetic ales; – analiza a două elemente de compoziţie şi/sau de limbaj, semnificative pentru textul poetic ales (de exemplu: titlu, incipit, relații de opoziție și de simetrie, motive poetice, figuri semantice, elemente de prozodie etc.). Notă Ordinea integrării reperelor în cuprinsul eseului este la alegere. Pentru conţinutul eseului, vei primi 18 puncte (câte 6 puncte pentru fiecare reper). Pentru redactarea eseului, vei primi 12 puncte (existența părților componente – introducere, cuprins, încheiere – 1 punct; logica înlănțuirii ideilor – 1 punct; abilități de analiză și de argumentare – 3 puncte; utilizarea limbii literare – 2 puncte; ortografia – 2 puncte; punctuaţia – 2 puncte; așezarea în pagină, lizibilitatea – 1 punct). În vederea acordării punctajului pentru redactare, eseul trebuie să aibă minimum 400 de cuvinte şi să dezvolte subiectul propus.`,
        cerinte: [
            'Evidenţiază două trăsături care fac posibilă încadrarea textului poetic ales într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică',
            'Comentează două imagini/idei poetice relevante pentru tema textului poetic ales',
            'Analizează două elemente de compoziţie şi/sau de limbaj, semnificative pentru textul poetic ales'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'Mihail Șerban, Amintiri',
        descriere: 'Citește următorul fragment al lui Mihail Șerban și rezolvă cerințele date.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2024',
        an: 2024,
        sesiune: 'sesiune specială',
        tip: 'analiza',
        text: `Lui Sadoveanu nu-i plăceau oamenii care vorbeau mult. Îi suporta cât îi suporta înverșunat în tăcere și dacă aceștia, la toate semnele lui – tăcere, uitatul pe fereastră, la ceas –, nu-și dădeau seama că au întrecut măsura, le-o spunea în față. Am asistat o dată la o scenă de acest fel plină de pitoresc. 
Într-o zi, aflându-mă la Sadoveanu – locuia pe atunci în strada Amiral Negrescu nr. 31 – a venit la dânsul un cunoscut publicist, celebru prin performanțele lui în vorbire. Era în stare să vorbească, fără să obosească, douăzeci și patru de ore în șir, ba poate și mai mult. Sărea de la un subiect la altul cu ușurința cu care o veveriță sare de pe o creangă pe alta. Era un om foarte deștept și foarte cult, dar suferea de boala asta – vorbea prea mult și într-un ritm obositor pentru cel care-l asculta. În privința asta era la antipodul lui Sadoveanu. Și totuși – se știe doar că uneori extremele se atrag – se bucura de prietenia lui Sadoveanu. 
Intrând în salonul vast de la parterul casei din strada Amiral Negrescu nr. 31, unde mă aflam împreună cu Sadoveanu și cu Constantin Mitru, cumnatul scriitorului, și unul din cei mai apropiați prieteni ai lui, noul oaspete, mic și pirpiriu, se afundă într-un fotoliu și începu să vorbească… Și a vorbit… Și a vorbit… Cred că, dacă nu l-ar fi oprit cineva, ar fi vorbit nouă zile și nouă nopți în șir și tot n-ar fi isprăvit. 
La început, vreo jumătate de ceas, Sadoveanu l-a ascultat atent, în tăcere, apoi și-a trimis privirile afară pe fereastră, apoi s-a uitat la ceas, o dată, de două ori. Constantin Mitru s-a ridicat de câteva ori, a răspuns la telefon, a ieșit de câteva ori pe ușă și o dată a lipsit atât de mult, încât cred că a fost până în oraș după ceva cumpărături… Când s-a întors, omul nostru tot mai vorbea… 
Eu, din fotoliul în care stăteam, mă uitam când la el, când la Sadoveanu și nu mă miram atât de performanța lui în vorbire, cât de răbdarea marelui scriitor de a-l asculta. 
Dar, cum toate au o limită, a avut-o și această răbdare. La un moment dat, când omul nostru era stăpânit ca de un delir al vorbirii, Sadoveanu a ridicat mâna și l-a oprit zicându-i: „Gata! Lasă-mă! M-ai obosit!". 
Firul vorbirii s-a rupt brusc. Omul nostru, mic și pirpiriu de felul lui, s-a făcut și mai mic, de părea un copil în brațele fotoliului larg, apoi, ca aruncat de arcurile acestuia, a sărit în picioare. I-a zis lui Sadoveanu, fără să se arate supărat: „Dacă v-am obosit, plec… — Poți să mai șezi, da' vorbește mai puțin și în alt tempo că m-ai obosit... — Nu, lasă, maestre, plec... că mi-am adus aminte că la unsprezece trebuia să fiu undeva și-i douăsprezece și jumătate... Plec, dar mai vin eu... — Bine, să mai vii!", i-a zis Sadoveanu zâmbind, întinzându-i mâna cu prietenie. 
După ce mi-a strâns și mie mâna, omul nostru a pornit și a ieșit aproape fugind, ca să ajungă „la timp" în locul unde trebuia să fie cu un ceas și jumătate mai devreme. 
Mihail Șerban, Amintiri`,
        cerinte: [
            'Indică sensul din text al secvenței în stare și al cuvântului oaspete.',
            'Menționează două indicii prin care Sadoveanu le sugera celorlalți că vorbesc prea mult, utilizând informaţiile din textul dat.',
            'Precizează atitudinea lui Sadoveanu în momentul plecării publicistului, justificându-ți răspunsul cu o secvență semnificativă din textul dat.',
            'Explică motivul pentru care publicistul se oprește brusc din vorbit.',
            'Prezintă, în 30-50 de cuvinte, o stare manifestată de Constantin Mitru în timp ce vorbește prietenul lui Sadoveanu, aşa cum reiese din textul dat.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Redactează un text argumentativ',
        descriere: 'Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă vorbitul excesiv este sau nu o dovadă de impolitețe.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2024',
        an: 2024,
        sesiune: 'sesiune specială',
        tip: 'redactare',
        text: `Lui Sadoveanu nu-i plăceau oamenii care vorbeau mult. Îi suporta cât îi suporta înverșunat în tăcere și dacă aceștia, la toate semnele lui – tăcere, uitatul pe fereastră, la ceas –, nu-și dădeau seama că au întrecut măsura, le-o spunea în față. Am asistat o dată la o scenă de acest fel plină de pitoresc. 
Într-o zi, aflându-mă la Sadoveanu – locuia pe atunci în strada Amiral Negrescu nr. 31 – a venit la dânsul un cunoscut publicist, celebru prin performanțele lui în vorbire. Era în stare să vorbească, fără să obosească, douăzeci și patru de ore în șir, ba poate și mai mult. Sărea de la un subiect la altul cu ușurința cu care o veveriță sare de pe o creangă pe alta. Era un om foarte deștept și foarte cult, dar suferea de boala asta – vorbea prea mult și într-un ritm obositor pentru cel care-l asculta. În privința asta era la antipodul lui Sadoveanu. Și totuși – se știe doar că uneori extremele se atrag – se bucura de prietenia lui Sadoveanu. 
Intrând în salonul vast de la parterul casei din strada Amiral Negrescu nr. 31, unde mă aflam împreună cu Sadoveanu și cu Constantin Mitru, cumnatul scriitorului, și unul din cei mai apropiați prieteni ai lui, noul oaspete, mic și pirpiriu, se afundă într-un fotoliu și începu să vorbească… Și a vorbit… Și a vorbit… Cred că, dacă nu l-ar fi oprit cineva, ar fi vorbit nouă zile și nouă nopți în șir și tot n-ar fi isprăvit. 
La început, vreo jumătate de ceas, Sadoveanu l-a ascultat atent, în tăcere, apoi și-a trimis privirile afară pe fereastră, apoi s-a uitat la ceas, o dată, de două ori. Constantin Mitru s-a ridicat de câteva ori, a răspuns la telefon, a ieșit de câteva ori pe ușă și o dată a lipsit atât de mult, încât cred că a fost până în oraș după ceva cumpărături… Când s-a întors, omul nostru tot mai vorbea… 
Eu, din fotoliul în care stăteam, mă uitam când la el, când la Sadoveanu și nu mă miram atât de performanța lui în vorbire, cât de răbdarea marelui scriitor de a-l asculta. 
Dar, cum toate au o limită, a avut-o și această răbdare. La un moment dat, când omul nostru era stăpânit ca de un delir al vorbirii, Sadoveanu a ridicat mâna și l-a oprit zicându-i: „Gata! Lasă-mă! M-ai obosit!". 
Firul vorbirii s-a rupt brusc. Omul nostru, mic și pirpiriu de felul lui, s-a făcut și mai mic, de părea un copil în brațele fotoliului larg, apoi, ca aruncat de arcurile acestuia, a sărit în picioare. I-a zis lui Sadoveanu, fără să se arate supărat: „Dacă v-am obosit, plec… — Poți să mai șezi, da' vorbește mai puțin și în alt tempo că m-ai obosit... — Nu, lasă, maestre, plec... că mi-am adus aminte că la unsprezece trebuia să fiu undeva și-i douăsprezece și jumătate... Plec, dar mai vin eu... — Bine, să mai vii!", i-a zis Sadoveanu zâmbind, întinzându-i mâna cu prietenie. 
După ce mi-a strâns și mie mâna, omul nostru a pornit și a ieșit aproape fugind, ca să ajungă „la timp" în locul unde trebuia să fie cu un ceas și jumătate mai devreme. 
Mihail Șerban, Amintiri`,
        cerinte: [
            'Cerințe totale: Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă vorbitul excesiv este sau nu o dovadă de impolitețe, raportându-te atât la informațiile din textul Amintiri de Mihail Șerban, cât și la experiența personală sau culturală.',
            'Sumar conținut: formularea unei opinii faţă de problematica pusă în discuţie, enunţarea şi dezvoltarea corespunzătoare a două argumente adecvate opiniei și formularea unei concluzii pertinente',
            'Sumar redactare: utilizarea corectă a conectorilor în argumentare, respectarea normelor limbii literare (norme de exprimare, de ortografie și de punctuație), aşezarea în pagină, lizibilitatea, respectarea privind numărul minim de cuvinte.'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Analiza perspectivei narative',
        descriere: 'Prezintă, în minimum 50 de cuvinte, perspectiva narativă din fragmentul de mai jos.',
        numarSubiect: 2,
        profil: 'real',
        data: '2024',
        an: 2024,
        sesiune: 'sesiune specială',
        tip: 'narativ',
        text: `Tăcură amândoi câteva clipe fără să se privească. Simțeau amândoi că-i desparte un zid și că nu se vor putea înțelege […]. 
Apoi se despărțiră ca doi străini. Își dădură mâna, își urară noroc, iar David îi zise la revedere […], ca și când ar fi vorbit cu oricare din camarazii ceilalți, cei de care sufletul său nu era legat prin nicio fibră. Rămase pe loc și se uită lung în urma lui Oprișor, care mergea cu capul sus, legănându-și puțin corpul și tăind aerul cu o cravașă* moale, foarte liniștit și nepăsător. Privindu-l, David se pomeni că-l invidiază. 
„Iată un om fericit care știe ce are să facă!" se gândi dânsul, trecându-i prin creieri, ca o fulgerare năprasnică, toate frământările și chinurile care pe dânsul îl făceau să nu știe ce are de făcut. 
Liviu Rebreanu, Catastrofa 
*cravașă – vargă elastică din piele, folosită la călărie pentru îndemnarea calului la alergat sau la mers`,
        cerinte: [
            'Prezintă, în minimum 50 de cuvinte, perspectiva narativă din fragmentul de mai jos.',
            'Conținut: precizează perspectiva narativă din fragmentul de mai jos',
            'Redactare: utiliză corect conectorii în argumentare; respectă normele limbii literare (exprimare, ortografie, punctuație), așezarea în pagină și lizibilitatea'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6(precizează perspectiva narativă din fragmentul de mai jos)',
            'Redactare: 4(utilizarea limbii literare – 1 punct; logica înlănțuirii ideilor – 1 punct; ortografia – 1 punct; punctuaţia – 1 punct)'
        ]
    },
    {
        titlu: 'Redactează un eseu',
        descriere: 'Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități ale unui text dramatic studiat.',
        numarSubiect: 3,
        profil: 'real',
        data: '2024',
        an: 2024,
        sesiune: 'sesiune specială',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități ale unui text dramatic studiat. În elaborarea eseului, vei avea în vedere următoarele repere: – evidențierea a două trăsături care fac posibilă încadrarea textului dramatic studiat într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică; – comentarea a două scene/secvențe relevante pentru tema textului dramatic studiat; – analiza a două componente de structură şi/sau de limbaj, semnificative pentru textul dramatic studiat (de exemplu: acțiune, personaj, notațiile autorului, conflict dramatic, registre stilistice, limbaj, act, scenă etc.). Notă Ordinea integrării reperelor în cuprinsul eseului este la alegere. Pentru conţinutul eseului, vei primi 18 puncte (câte 6 puncte pentru fiecare cerinţă/reper). Pentru redactarea eseului, vei primi 12 puncte (existența părților componente – introducere, cuprins, încheiere – 1 punct; logica înlănțuirii ideilor – 1 punct; abilități de analiză și de argumentare – 3 puncte; utilizarea limbii literare – 2 puncte; ortografia – 2 puncte; punctuaţia – 2 puncte; așezarea în pagină, lizibilitatea – 1 punct). În vederea acordării punctajului pentru redactare, eseul trebuie să aibă minimum 400 de cuvinte şi să dezvolte subiectul propus.`,
        cerinte: [
            'Evidențiază două trăsături care fac posibilă încadrarea textului dramatic studiat într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică',
            'Comentează două scene/secvențe relevante pentru tema textului dramatic studiat',
            'Analizează două componente de structură şi/sau de limbaj, semnificative pentru textul dramatic studiat'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'G. Călinescu, Ion Creangă. Viața și opera',
        descriere: 'Citește următorul fragment al lui G. Călinescu și rezolvă cerințele date.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2023',
        an: 2023,
        sesiune: 'sesiune de vară',
        tip: 'analiza',
        text: `Ninsese și omătul era „de o palmă domnească” de gros. Dis-de-dimineață, pe la orele șase și jumătate, Creangă privi din arhondaricul* mănăstirii un curcubeu ivit la răsărit, semn, poate, pentru el, de schimbări în bine. E de bănuit că o superstiție caracteristică bolnavilor cuprinsese sufletul povestitorului, fiindcă de aici încolo el pare a urmări de aproape starea lui Eminescu. Va fi avut credința că, dacă poetul învinge boala, oarecum asemănătoare cu a lui, ar fi biruit-o și el.
Eminescu plecă deocamdată la Botoșani, la Harieta, și Creangă rămase singur. Nemaicrezând în puterea apelor de la Slănic, și mai ales nemaicăpătând bilet gratuit de băi, începu să se tragă spre locurile copilăriei. Presimțea că n-are s-o mai ducă mult și, cu instinctul oamenilor simpli, voia să mai guste o dată din bucuriile vieții de sat. Poate că, sătul de leacurile doctorilor mari, care nu știau să spună nimic, cugetă să întrebe înțelepciunea poporului. În toamnă se duse pe la Târgu-Neamț. Zicea cum că el nu mai are mult de trăit și mai vrea să vadă o dată locurile copilăriei și neamurile. Pieptul îi era umflat de hârtii și, de acolo, scoase un exemplar din Povățuitor*, singurul pe care zicea că-l mai are, și-l dărui școlii unde învățase el împreună cu Conta și la vederea băncilor căreia va fi lăcrimat, scriind pe el: „Școalei primare de băieți No. 1, pentru bibliotecă”. Ruda cu care se-nvoia mai mult era cumintele și acum bătrânul popă Gheorghe. Pe acesta va fi căutat să-l ispitească asupra răspunsurilor bisericii la grozavele întrebări ale vieții și morții, însă părintele era om simplu, care nu pătrundea astfel de probleme. Poate că acum, încăpățânându-se într-o presimțire rea, Creangă voi să meargă și la biserica din Humulești, unde-l învățaseră carte bădița Vasile și părintele Ioan.
„— Moșule – zise el către părintele Gheorghe – hai la Humulești, să vedem pe părintele Teofan Focșa!” [...]
În 2 septembrie, la Iași sau la Neamț, după o vară secetoasă, la orele trei după-amiază, Creangă văzu pe cer la răsărit un alt curcubeu, care-i dădu poate o nouă alinare. De la Eminescu auzi iarăși știri bune. Însă peste câteva luni, prin februarie și mai 1888, fu din nou rău. Căderile îi erau grele, „asămine cu moartea”, și după aceea trupul mai era mișcat de convulsiuni.
„Bădiță Gheorghe dragă și preaiubite verișoare Anetă și Elenuță – scria el părintelui Creangă în stil înlăcrimat – mă aflu acum puțin mai binișor, dar tot îmi tremură carnea pe mine și sunt trist și descurajat din această pricină.” Din trebuința de a se agăța de ceva în viață devenise mai afectuos [...]. Se pare că din 1887, de când își luase rămas-bun de la locurile copilăriei și plânsese [...], Creangă nu mai mersese pe la Târgu-Neamț. Nici peste vară nu se mai duse la Slănic, zicând că nu poate și necerând la vreme nici bilet de băi gratuit, fără de care nu-nțelegea să se urnească, deși abecedarul lui stă să iasă în cea de a douăzeci și una ediție, fiind el totodată institutor cu patru gradații, debitant* de tutun și proprietar asociat de tipografie. În iarna lui 1888, însă, Creangă se porni iar la București împreună cu tipograful I. S. Ionescu, asociatul său. De bună seamă, plecase să se întâlnească cu Constantin și să mai vadă un doctor pentru boala sa.
G. Călinescu, Ion Creangă. Viața și opera
*arhondaric – aripă a unei clădiri dintr-o mănăstire ortodoxă, rezervată oaspeților
*Povățuitor – carte pentru uz didactic, realizată de Ion Creangă și de Gheorghe Enăchescu
*debitant – proprietar al unei tutungerii`,
        cerinte: [
            'Indică sensul din text al secvenței de bună seamă.',
            'Menționează două dintre sursele de venit ale lui Ion Creangă, utilizând informaţiile din textul dat.',
            'Precizează o posibilă semnificație a curcubeului pentru Ion Creangă, justificându-ți răspunsul cu o secvență semnificativă din textul dat.',
            'Explică un motiv pentru care Ion Creangă călătorește la Târgu-Neamț.',
            'Prezintă, în 30 – 50 de cuvinte, o trăsătură morală a lui Ion Creangă, aşa cum reiese din textul dat.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Redactează un text argumentativ',
        descriere: 'Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă oamenii trebuie sau nu să exprime recunoștință față de școlile în care au fost formați.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2023',
        an: 2023,
        sesiune: 'sesiune de vară',
        tip: 'redactare',
        text: `Ninsese și omătul era „de o palmă domnească” de gros. Dis-de-dimineață, pe la orele șase și jumătate, Creangă privi din arhondaricul* mănăstirii un curcubeu ivit la răsărit, semn, poate, pentru el, de schimbări în bine. E de bănuit că o superstiție caracteristică bolnavilor cuprinsese sufletul povestitorului, fiindcă de aici încolo el pare a urmări de aproape starea lui Eminescu. Va fi avut credința că, dacă poetul învinge boala, oarecum asemănătoare cu a lui, ar fi biruit-o și el.
Eminescu plecă deocamdată la Botoșani, la Harieta, și Creangă rămase singur. Nemaicrezând în puterea apelor de la Slănic, și mai ales nemaicăpătând bilet gratuit de băi, începu să se tragă spre locurile copilăriei. Presimțea că n-are s-o mai ducă mult și, cu instinctul oamenilor simpli, voia să mai guste o dată din bucuriile vieții de sat. Poate că, sătul de leacurile doctorilor mari, care nu știau să spună nimic, cugetă să întrebe înțelepciunea poporului. În toamnă se duse pe la Târgu-Neamț. Zicea cum că el nu mai are mult de trăit și mai vrea să vadă o dată locurile copilăriei și neamurile. Pieptul îi era umflat de hârtii și, de acolo, scoase un exemplar din Povățuitor*, singurul pe care zicea că-l mai are, și-l dărui școlii unde învățase el împreună cu Conta și la vederea băncilor căreia va fi lăcrimat, scriind pe el: „Școalei primare de băieți No. 1, pentru bibliotecă”. Ruda cu care se-nvoia mai mult era cumintele și acum bătrânul popă Gheorghe. Pe acesta va fi căutat să-l ispitească asupra răspunsurilor bisericii la grozavele întrebări ale vieții și morții, însă părintele era om simplu, care nu pătrundea astfel de probleme. Poate că acum, încăpățânându-se într-o presimțire rea, Creangă voi să meargă și la biserica din Humulești, unde-l învățaseră carte bădița Vasile și părintele Ioan.
„— Moșule – zise el către părintele Gheorghe – hai la Humulești, să vedem pe părintele Teofan Focșa!” [...]
În 2 septembrie, la Iași sau la Neamț, după o vară secetoasă, la orele trei după-amiază, Creangă văzu pe cer la răsărit un alt curcubeu, care-i dădu poate o nouă alinare. De la Eminescu auzi iarăși știri bune. Însă peste câteva luni, prin februarie și mai 1888, fu din nou rău. Căderile îi erau grele, „asămine cu moartea”, și după aceea trupul mai era mișcat de convulsiuni.
„Bădiță Gheorghe dragă și preaiubite verișoare Anetă și Elenuță – scria el părintelui Creangă în stil înlăcrimat – mă aflu acum puțin mai binișor, dar tot îmi tremură carnea pe mine și sunt trist și descurajat din această pricină.” Din trebuința de a se agăța de ceva în viață devenise mai afectuos [...]. Se pare că din 1887, de când își luase rămas-bun de la locurile copilăriei și plânsese [...], Creangă nu mai mersese pe la Târgu-Neamț. Nici peste vară nu se mai duse la Slănic, zicând că nu poate și necerând la vreme nici bilet de băi gratuit, fără de care nu-nțelegea să se urnească, deși abecedarul lui stă să iasă în cea de a douăzeci și una ediție, fiind el totodată institutor cu patru gradații, debitant* de tutun și proprietar asociat de tipografie. În iarna lui 1888, însă, Creangă se porni iar la București împreună cu tipograful I. S. Ionescu, asociatul său. De bună seamă, plecase să se întâlnească cu Constantin și să mai vadă un doctor pentru boala sa.
G. Călinescu, Ion Creangă. Viața și opera
*arhondaric – aripă a unei clădiri dintr-o mănăstire ortodoxă, rezervată oaspeților
*Povățuitor – carte pentru uz didactic, realizată de Ion Creangă și de Gheorghe Enăchescu
*debitant – proprietar al unei tutungerii`,
        cerinte: [
            'Cerințe totale: Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă oamenii trebuie sau nu să exprime recunoștință față de școlile în care au fost formați, raportându-te atât la informațiile din fragmentul extras din volumul Ion Creangă. Viața și opera de G. Călinescu, cât și la experiența personală sau culturală.',
            'Sumar conținut: formularea unei opinii, două argumente dezvoltate și o concluzie pertinentă',
            'Sumar redactare: conectori corecți, norme ale limbii literare, așezare în pagină, lizibilitate, respectarea numărului minim de cuvinte'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Analiza unui text poetic',
        descriere: 'Comentează, în minimum 50 de cuvinte, textul de mai jos, evidențiind relația dintre ideea poetică și mijloacele artistice.',
        numarSubiect: 2,
        profil: 'real',
        data: '2023',
        an: 2023,
        sesiune: 'sesiune de vară',
        tip: 'poezie',
        text: `A mele visuri risipite!
Ce-mi umplu inima de jale,
Le văd în frunzele pălite
Și-n pustiirea de pe vale.
De-a pururi sta-vor troienite,
Sub vremea ce s-așterne-n pale*,
A mele visuri risipite,
Ce-mi umplu inima de jale!
Copac, când zile fericite
Îți vor întoarce iar în cale
Podoaba ramurilor tale,
În noapte-or sta mai adâncite
A mele visuri risipite!
*pale – straturi
Al. Vlahuță, A mele visuri...`,
        cerinte: [
            'Comentează, în minimum 50 de cuvinte, textul de mai jos, evidențiind relația dintre ideea poetică și mijloacele artistice.',
            'Conținut: evidențiază relația dintre ideea poetică și mijloacele artistice',
            'Redactare: limbă literară, logică, ortografie, punctuație'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6',
            'Redactare: 4'
        ]
    },
    {
        titlu: 'Redactează un eseu',
        descriere: 'Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități ale unui text narativ studiat, aparținând lui Liviu Rebreanu sau lui Camil Petrescu.',
        numarSubiect: 3,
        profil: 'real',
        data: '2023',
        an: 2023,
        sesiune: 'sesiune de vară',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități ale unui text narativ studiat, aparținând lui Liviu Rebreanu sau lui Camil Petrescu. În elaborarea eseului, vei avea în vedere următoarele repere: – evidențierea a două trăsături care fac posibilă încadrarea textului narativ studiat într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică; – comentarea a două episoade/secvențe relevante pentru tema textului narativ studiat; – analiza a două elemente de structură, de compoziție și/sau de limbaj, semnificative pentru textul narativ studiat (de exemplu: acțiune, conflict, relații temporale și spațiale, incipit, final, tehnici narative, instanțe ale comunicării narative, perspectivă narativă, registre stilistice, limbaj etc.).`,
        cerinte: [
            'Evidențiază două trăsături de încadrare a textului narativ',
            'Comentează două episoade relevante pentru tema textului',
            'Analizează două elemente de structură/compoziție/limbaj relevante'
        ],
        punctaj: [6, 6, 6]
    },
    ,
    {
        titlu: 'Maria Banuș, Însemnările mele',
        descriere: 'Citește următorul fragment al Mariei Banuș și rezolvă cerințele date.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2023',
        an: 2023,
        sesiune: 'sesiune de toamnă',
        tip: 'analiza',
        text: `București, joi 22 decembrie 1927 
E prima zi de vacanță! Ce cuvinte miraculoase pentru o elevă! Cu toate astea, nu mă bucur. Așa sunt eu; aștept, aștept cu nerăbdare un lucru și după ce l-am căpătat nu mai îmi face nicio plăcere. Așa a fost și cu vacanța. Nu-i vorbă, nu mi se arată prea strălucită. Când mă gândesc că o să vină Bubi la București mi se face rău. O să-l am toată vacanța pe cap. N-ar trebui să scriu aceste cuvinte, căci e „un băiat foarte reușit” (cum îi zice mama). Știe mai multe limbi, face scrisori frumoase (cu stil), e primul în clasă, face sporturi, în fine, e un băiat model. Deși am scris în râs toate astea, văd că așa e. Nu știu de ce oare nu-l prea am eu la stomac. [...] Mă uit să văd ce am scris până acum [...]. În loc să spun ce am făcut azi, am înșirat vrute și nevrute. Așa, acuma să anunț marele eveniment care s-a săvârșit azi: am fost prima dată la patinaj. Mă înțelesesem cu Dida să vină să mă ia la 9½, dar a venit la 10¾, așa că până atunci m-am învârtit și am exersat la pian. Era să fac cunoștință cu băiatul lui Rusu (chiriașul nostru), dar nu l-am găsit acasă, plecase de la 7 dimineața. La patinaj. Parcă mă văd cu inima cât un purice și cu pieptul înainte, cum băteam la ușa lui Rusu. Orice aș face, tot timidă rămân cu străinii. În casă sunt obraznică și cu un străin mă fac mică, mică [...]. După cum am spus, la unsprezece a sosit Dida. Era foarte drăguță cu costumul ei de patinaj. Adică nu – am greșit – nu era drăguță cu costumul, ci cu figura ei. Are o față mică și simpatică, așa că o îmbracă bine orice pune. Și eu... când mă gândesc mi se strică toată buna dispoziție. [...] Deci îmi reiau firul povestirii, această persoană care nu e decât una și aceeași cu mine a plecat azi-dimineață la patinaj. Mai întâi am colindat câteva magazine ca să-și ia Dida patine și, după aceea, ne-am dus la Cișmigiu, la patinoarul din față. [...] 
Tineri, tinere, toți petrec, patinează, beau, mănâncă... Numai inima mea se strânge și pocăie sărăcuța... Și stau, tremur, mă uit cum se duce și vine lumea, numai eu nu patinez. De ce? Mi-e frică! Ah! Frica asta în fața oricărui lucru mă omoară. Tare mi-e frică să nu dau înapoi și în fața evenimentelor mai însemnate din viață. A, da. Iar am scris: mi-e frică, se putea altfel? 
După ce am dârdâit bine, de mi s-au făcut picioarele sloi, m-am avântat pe gheață „de brațul Didei”. N-am avut nicio altă senzație decât... frica. După ce-am mers puțin pe gheață, m-am dus iar în sală. Și iar tremuram de frig și iar mă simțeam oropsită, tare oropsită. Trecea atâta lume prin fața mea și toată mulțimea aceea era fericită... sau părea, cel puțin. Poate fiecare învățase să-și spuie că-i fericit. Cel puțin fața lor așa arăta. 
Stam și mă gândeam: sunt fată sportivă, patinez, joc tenis, am să ajung o fată modernă! Eu? Nu, niciodată, simt că nu-s făcută eu pentru asta. Și Fanny care mă invidiază că pot merge la patinaj! Dacă aș putea, cu dragă inimă aș lăsa-o în locul meu. Dar nu se poate... fiecare trebuie să meargă cum îi dictează mediul în care trăiește, nu după înclinările sale.`,
        cerinte: [
            'Indică sensul din text al secvenței vrute și nevrute.',
            'Menționează instrumentul muzical la care cânta Maria Banuș când era elevă, utilizând informaţiile din textul dat.',
            'Precizează atitudinea Mariei Banuș față de Bubi, justificându-ți răspunsul cu o secvență semnificativă din textul dat.',
            'Explică motivul pentru care, aflată la patinaj, eleva Maria Banuș se simte diferită de ceilalți.',
            'Prezintă, în 30 – 50 de cuvinte, o trăsătură morală a Mariei Banuș, aşa cum reiese din primul paragraf al textului dat.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Redactează un text argumentativ',
        descriere: 'Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă emoțiile influențează sau nu comportamentul unei persoane.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2023',
        an: 2023,
        sesiune: 'sesiune de toamnă',
        tip: 'redactare',
        text: `București, joi 22 decembrie 1927 
E prima zi de vacanță! Ce cuvinte miraculoase pentru o elevă! Cu toate astea, nu mă bucur. Așa sunt eu; aștept, aștept cu nerăbdare un lucru și după ce l-am căpătat nu mai îmi face nicio plăcere. Așa a fost și cu vacanța. Nu-i vorbă, nu mi se arată prea strălucită. Când mă gândesc că o să vină Bubi la București mi se face rău. O să-l am toată vacanța pe cap. N-ar trebui să scriu aceste cuvinte, căci e „un băiat foarte reușit” (cum îi zice mama). Știe mai multe limbi, face scrisori frumoase (cu stil), e primul în clasă, face sporturi, în fine, e un băiat model. Deși am scris în râs toate astea, văd că așa e. Nu știu de ce oare nu-l prea am eu la stomac. [...] Mă uit să văd ce am scris până acum [...]. În loc să spun ce am făcut azi, am înșirat vrute și nevrute. Așa, acuma să anunț marele eveniment care s-a săvârșit azi: am fost prima dată la patinaj. Mă înțelesesem cu Dida să vină să mă ia la 9½, dar a venit la 10¾, așa că până atunci m-am învârtit și am exersat la pian. Era să fac cunoștință cu băiatul lui Rusu (chiriașul nostru), dar nu l-am găsit acasă, plecase de la 7 dimineața. La patinaj. Parcă mă văd cu inima cât un purice și cu pieptul înainte, cum băteam la ușa lui Rusu. Orice aș face, tot timidă rămân cu străinii. În casă sunt obraznică și cu un străin mă fac mică, mică [...]. După cum am spus, la unsprezece a sosit Dida. Era foarte drăguță cu costumul ei de patinaj. Adică nu – am greșit – nu era drăguță cu costumul, ci cu figura ei. Are o față mică și simpatică, așa că o îmbracă bine orice pune. Și eu... când mă gândesc mi se strică toată buna dispoziție. [...] Deci îmi reiau firul povestirii, această persoană care nu e decât una și aceeași cu mine a plecat azi-dimineață la patinaj. Mai întâi am colindat câteva magazine ca să-și ia Dida patine și, după aceea, ne-am dus la Cișmigiu, la patinoarul din față. [...] 
Tineri, tinere, toți petrec, patinează, beau, mănâncă... Numai inima mea se strânge și pocăie sărăcuța... Și stau, tremur, mă uit cum se duce și vine lumea, numai eu nu patinez. De ce? Mi-e frică! Ah! Frica asta în fața oricărui lucru mă omoară. Tare mi-e frică să nu dau înapoi și în fața evenimentelor mai însemnate din viață. A, da. Iar am scris: mi-e frică, se putea altfel? 
După ce am dârdâit bine, de mi s-au făcut picioarele sloi, m-am avântat pe gheață „de brațul Didei”. N-am avut nicio altă senzație decât... frica. După ce-am mers puțin pe gheață, m-am dus iar în sală. Și iar tremuram de frig și iar mă simțeam oropsită, tare oropsită. Trecea atâta lume prin fața mea și toată mulțimea aceea era fericită... sau părea, cel puțin. Poate fiecare învățase să-și spuie că-i fericit. Cel puțin fața lor așa arăta. 
Stam și mă gândeam: sunt fată sportivă, patinez, joc tenis, am să ajung o fată modernă! Eu? Nu, niciodată, simt că nu-s făcută eu pentru asta. Și Fanny care mă invidiază că pot merge la patinaj! Dacă aș putea, cu dragă inimă aș lăsa-o în locul meu. Dar nu se poate... fiecare trebuie să meargă cum îi dictează mediul în care trăiește, nu după înclinările sale.`,
        cerinte: [
            'Cerințe totale: Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă emoțiile influențează sau nu comportamentul unei persoane, raportându-te atât la informațiile din fragmentul extras din volumul Însemnările mele de Maria Banuș, cât și la experiența personală sau culturală.',
            'Sumar conținut: opinie, două argumente dezvoltate, concluzie pertinentă',
            'Sumar redactare: conectori corecți, norme ale limbii literare, așezare în pagină, lizibilitate, număr minim de cuvinte'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Analiza unui text poetic',
        descriere: 'Comentează, în minimum 50 de cuvinte, textul de mai jos, evidențiind relația dintre ideea poetică și mijloacele artistice.',
        numarSubiect: 2,
        profil: 'real',
        data: '2023',
        an: 2023,
        sesiune: 'sesiune de toamnă',
        tip: 'poezie',
        text: `Trecutu-l știm atât cât l-am aflat 
C-a fost trăit și că s-a spulberat. 
Acumul se trăiește tot la fel. 
Se spulberă-n tăcere și nevăzut și el. 
Nu-l înțeleg de noi cum se desparte, 
Trăind cu noi și totuș mult departe. 
Că viața-și pierde și văzută drumul, 
Ca umbra și ca fumul. 
Au fost frumoase și trăite toate. 
Firește, zice gândul, și se poate. 
Trăiește-ntr-adevăr tot ce se vede? 
Tudor Arghezi, S-a spulberat`,
        cerinte: [
            'Comentează, în minimum 50 de cuvinte, textul de mai jos, evidențiind relația dintre ideea poetică și mijloacele artistice.',
            'Conținut: evidențiază relația idee poetică – mijloace artistice',
            'Redactare: limbă literară, logică, ortografie, punctuație'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6',
            'Redactare: 4'
        ]
    },
    {
        titlu: 'Redactează un eseu',
        descriere: 'Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități ale unui text narativ studiat, aparținând lui Mihail Sadoveanu sau lui G. Călinescu.',
        numarSubiect: 3,
        profil: 'real',
        data: '2023',
        an: 2023,
        sesiune: 'sesiune de toamnă',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități ale unui text narativ studiat, aparținând lui Mihail Sadoveanu sau lui G. Călinescu. În elaborarea eseului, vei avea în vedere următoarele repere: – evidențierea a două trăsături care fac posibilă încadrarea textului narativ studiat într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică; – comentarea a două episoade/secvențe relevante pentru tema textului narativ studiat; – analiza a două elemente de structură, de compoziție și/sau de limbaj, semnificative pentru textul narativ studiat (de exemplu: acțiune, conflict, relații temporale și spațiale, incipit, final, tehnici narative, instanțe ale comunicării narative, perspectivă narativă, registre stilistice, limbaj etc.).`,
        cerinte: [
            'Evidențiază două trăsături de încadrare a textului narativ',
            'Comentează două episoade relevante pentru tema textului',
            'Analizează două elemente de structură/compoziție/limbaj relevante'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'Sabina Cantacuzino – Din viața familiei Ion C. Brătianu',
        descriere: 'Citește fragmentul și rezolvă cerințele (Subiectul I A).',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2023',
        an: 2023,
        sesiune: 'sesiune specială',
        tip: 'analiza',
        text: `[Să revenim la 1879.] Anii următori nu au adus nicio schimbare în viața noastră, doar copiii creșteau fiecare după firea și dispozițiunile lui.
Ionel avea un talent deosebit pentru toate studiile, dezvoltat de profesori eminenți. La matematici, când bietul d. Alecu Borănescu se încurca la o problemă sau o teoremă, zicea: „Să iasă Brătianu și s-o dezlege”. La soluțiunea dată, adăuga, ca să aibă aerul de-a fi glumit: „Toți matematicienii mari încep cu B: Bertrand, Briot, Biot, Borănescu, poate într-o zi și Brătianu?” [...]
Ionel se destină ingineriei. După ce-și luă bacalaureatul, intră ca voluntar în Regimentul 2 Artilerie și, cum nu era ocupat la cazarmă decât dimineața de la 6 [la] 12, după-amiaza se ducea la Școala de Poduri și Șosele, admirabil organizată de G. Duca, unde cei mai buni profesori și absolvenți ai școalelor străine țineau cursuri. D. Duca, în special, s-a ocupat cu prepararea lui pentru Școala Politehnică din Paris. A făcut la București anul de elementare. Cele șase luni de voluntariat au fost în aceste condițiuni foarte obositoare. Dinu, mai liniștit, dar fără șovăire și cu multă conștiință, a urmat exact același program de la începutul la sfârșitul studiilor lor.
Vintilă, trimis la liceu dintr-un început, în clasa I, deși mama ar fi voit să-l mai ție acasă, a mers bine un an. Într-al doilea însă, din cauza boalei Piei și a mea, mama neputând să controleze destul de des ce făcea la școală, unde nici buletinele nu le da, nici punctualitatea profesorilor nu-i ținea în strună, având și un tovarăș de bancă ușurel și amator de panoramă* (care atunci preceda cinematografului), s-a legat cu Teodor Florescu și, în loc de a se plictisi în clasă, se desfătau prea des la panoramă, patinaj, Șosea sau jocuri prin curtea liceului. Rezultatul la examenul final n-a fost cel normal în familia noastră; Vintilă trecu clasa fără strălucire; părinții, mortificați și îngrijați, îl oropsiră pe timpul vacanței. Nicio pedeapsă materială nu-i fu dată; în aparență ducea aceeași viață ca noi, dar, când seara veneam în șir să îmbrățișăm părinții zicându-le noapte bună, în loc de sărutările și mângâierile date celor demni, Vintilă trebuia să treacă fără a primi măcar o privire de la tata. Bietul vinovat în fiecare zi își suferea chinul și se ducea la pat nenorocit, până când, la o serbare de familie, tata îl iertă. Rezultatul a fost radical. În urmă, niciunul n-a muncit atât în tot timpul studiilor și, pot zice, în tot timpul vieții. [...]
Dar nu numai la partea materială a vieții se gândeau părinții, ci, pe lângă învățătura ce ne dădeau, voiau să ne împodobească sufletul și cu simțul artelor. Îndată ce copiii începeau să se dezvolte, lecțiile de muzică erau completate cu audițiunea concertelor. Noi am fost printre primii abonați ai lui Wachmann la concertele simfonice în Ateneul de lângă Cișmigiu; nu venea un artist de seamă fără să nu-l auzim; mergeam la operă de câte ori se putea. [...] Rarele expoziții de pictură le vedeam regulat. Frații și surorile și-au dezvoltat gustul artistic după mijloace și împrejurări, dar niciunul n-ar fi neglijat vizitarea monumentelor și a muzeelor în călătoriile lor. Ionel nu scăpa nicio ocaziune spre a cunoaște chiar cele mai mici rămășițe interesante ale trecutului de câte ori străbătea cu automobilul un oraș sau un sat.
Sabina Cantacuzino, Din viața familiei Ion C. Brătianu, 1821 – 1891
*panoramă – tablou desfășurat circular, iluminat astfel încât spectatorul aflat în centrul încăperii să aibă iluzia unei imagini reale`,
        cerinte: [
            'Indică sensul din text al secvenței de seamă.',
            'Menționează statutul pe care îl are Ionel Brătianu în Regimentul 2 Artilerie, utilizând informațiile din text.',
            'Precizează o caracteristică a celor care predau la Școala de Poduri și Șosele, justificând cu o secvență din text.',
            'Explică motivul pentru care părinții îl pedepsesc pe Vintilă în timpul vacanței.',
            'Prezintă, în 30–50 de cuvinte, o trăsătură a lui Vintilă Brătianu, așa cum reiese din text.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Familia și gustul artistic – argumentare',
        descriere: 'Redactează un text (minim 150 cuvinte) despre rolul familiei în dezvoltarea gustului artistic (Subiectul I B).',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2023',
        an: 2023,
        sesiune: 'sesiune specială',
        tip: 'redactare',
        text: `[Să revenim la 1879.] Anii următori nu au adus nicio schimbare în viața noastră, doar copiii creșteau fiecare după firea și dispozițiunile lui.
Ionel avea un talent deosebit pentru toate studiile, dezvoltat de profesori eminenți. La matematici, când bietul d. Alecu Borănescu se încurca la o problemă sau o teoremă, zicea: „Să iasă Brătianu și s-o dezlege”. La soluțiunea dată, adăuga, ca să aibă aerul de-a fi glumit: „Toți matematicienii mari încep cu B: Bertrand, Briot, Biot, Borănescu, poate într-o zi și Brătianu?” [...]
Ionel se destină ingineriei. După ce-și luă bacalaureatul, intră ca voluntar în Regimentul 2 Artilerie și, cum nu era ocupat la cazarmă decât dimineața de la 6 [la] 12, după-amiaza se ducea la Școala de Poduri și Șosele, admirabil organizată de G. Duca, unde cei mai buni profesori și absolvenți ai școalelor străine țineau cursuri. D. Duca, în special, s-a ocupat cu prepararea lui pentru Școala Politehnică din Paris. A făcut la București anul de elementare. Cele șase luni de voluntariat au fost în aceste condițiuni foarte obositoare. Dinu, mai liniștit, dar fără șovăire și cu multă conștiință, a urmat exact același program de la începutul la sfârșitul studiilor lor.
Vintilă, trimis la liceu dintr-un început, în clasa I, deși mama ar fi voit să-l mai ție acasă, a mers bine un an. Într-al doilea însă, din cauza boalei Piei și a mea, mama neputând să controleze destul de des ce făcea la școală, unde nici buletinele nu le da, nici punctualitatea profesorilor nu-i ținea în strună, având și un tovarăș de bancă ușurel și amator de panoramă* (care atunci preceda cinematografului), s-a legat cu Teodor Florescu și, în loc de a se plictisi în clasă, se desfătau prea des la panoramă, patinaj, Șosea sau jocuri prin curtea liceului. Rezultatul la examenul final n-a fost cel normal în familia noastră; Vintilă trecu clasa fără strălucire; părinții, mortificați și îngrijați, îl oropsiră pe timpul vacanței. Nicio pedeapsă materială nu-i fu dată; în aparență ducea aceeași viață ca noi, dar, când seara veneam în șir să îmbrățișăm părinții zicându-le noapte bună, în loc de sărutările și mângâierile date celor demni, Vintilă trebuia să treacă fără a primi măcar o privire de la tata. Bietul vinovat în fiecare zi își suferea chinul și se ducea la pat nenorocit, până când, la o serbare de familie, tata îl iertă. Rezultatul a fost radical. În urmă, niciunul n-a muncit atât în tot timpul studiilor și, pot zice, în tot timpul vieții. [...]
Dar nu numai la partea materială a vieții se gândeau părinții, ci, pe lângă învățătura ce ne dădeau, voiau să ne împodobească sufletul și cu simțul artelor. Îndată ce copiii începeau să se dezvolte, lecțiile de muzică erau completate cu audițiunea concertelor. Noi am fost printre primii abonați ai lui Wachmann la concertele simfonice în Ateneul de lângă Cișmigiu; nu venea un artist de seamă fără să nu-l auzim; mergeam la operă de câte ori se putea. [...] Rarele expoziții de pictură le vedeam regulat. Frații și surorile și-au dezvoltat gustul artistic după mijloace și împrejurări, dar niciunul n-ar fi neglijat vizitarea monumentelor și a muzeelor în călătoriile lor. Ionel nu scăpa nicio ocaziune spre a cunoaște chiar cele mai mici rămășițe interesante ale trecutului de câte ori străbătea cu automobilul un oraș sau un sat.
Sabina Cantacuzino, Din viața familiei Ion C. Brătianu, 1821 – 1891
*panoramă – tablou desfășurat circular, iluminat astfel încât spectatorul aflat în centrul încăperii să aibă iluzia unei imagini reale`,
        cerinte: [
            'Cerințe totale: argumentează rolul familiei în formarea gustului artistic, raportându-te la fragment și la experiența personală/culturală.',
            'Sumar conținut: opinie clară, două argumente dezvoltate, concluzie pertinentă.',
            'Sumar redactare: conectori corecți; norme ale limbii literare; respectă minimul de cuvinte.'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Rolul notațiilor autorului – Horia Lovinescu',
        descriere: 'Prezintă, în minimum 50 de cuvinte, rolul notațiilor autorului (Subiectul II).',
        numarSubiect: 2,
        profil: 'real',
        data: '2023',
        an: 2023,
        sesiune: 'sesiune specială',
        tip: 'eseu',
        text: `Casa de la Snagov a sculptorului Crudu. Un hol mare. [...]
MANOLE (singur, s-a prăbușit într-un fotoliu cu schițele risipite lângă el. După o clipă se apleacă cu greu și începe să le strângă. Și le așază pe genunchi, trecându-și palma peste ele cu un gest de mângâiere. Apoi se ridică brusc, scrâșnind cu furie.): Idiotule! Idiotule! (Și pe această invectivă*, deschide larg ușile atelierului. Îl vedem apucând un ciocan și o daltă. Apoi dispare din ochii noștri; prin geamul mat îi vedem bine silueta, lângă un bloc uriaș de piatră. Ridică ciocanul și lovește, o dată, de două ori, de trei ori. Apoi, ciocanul îi cade din mână. Reintră în scenă descompus, cu mâna pe inimă. Se târăște până la fotoliu. E țeapăn, respiră greu.)
MANOLE: N-o să mai pot lucra niciodată. Niciodată... (Din interior apare Cristina.)
CRISTINA: M-a trimis mama... (Dar, când îl vede mai bine, rămâne împietrită, speriată. Tăcere. Manole ridică ochii spre ea și o privește un timp, care pare nesfârșit.)
Horia Lovinescu, Moartea unui artist
*invectivă – jignire, injurie`,
        cerinte: [
            'Conținut: prezintă rolul notațiilor autorului în fragment (minimum 50 de cuvinte).',
            'Redactare: limbă literară; logică a ideilor; ortografie; punctuație.'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6',
            'Redactare: 4'
        ]
    },
    {
        titlu: 'Eseu despre un text poetic (Bacovia sau Blaga)',
        descriere: 'Redactează un eseu (minim 400 de cuvinte) privind particularitățile unui text poetic studiat.',
        numarSubiect: 3,
        profil: 'real',
        data: '2023',
        an: 2023,
        sesiune: 'sesiune specială',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități ale unui text poetic studiat, aparținând lui George Bacovia sau lui Lucian Blaga.
În elaborarea eseului, vei avea în vedere următoarele repere:
– evidențierea a două trăsături care fac posibilă încadrarea textului poetic într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică;
– comentarea a două imagini/idei poetice relevante pentru tema textului poetic studiat;
– analiza a două elemente de compoziție și/sau de limbaj, semnificative pentru textul poetic ales (de exemplu: titlu, incipit, relații de opoziție și de simetrie, motive poetice, figuri semantice, elemente de prozodie etc.).
Notă: eseul trebuie să aibă minimum 400 de cuvinte și să dezvolte subiectul propus.`,
        cerinte: [
            'Evidențiază două trăsături de încadrare a textului poetic.',
            'Comentează două imagini/idei poetice relevante pentru temă.',
            'Analizează două elemente de compoziție și/sau de limbaj semnificative.'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'Interviu cu Marin Preda – Luceafărul (1974)',
        descriere: 'Citește fragmentul și rezolvă cerințele (Subiectul I A).',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2023',
        an: 2023,
        sesiune: 'rezervă',
        tip: 'analiza',
        text: `— Întrebările ce urmează vor să scoată în lumină secretul tinereții fără de bătrânețe, cuprinse deopotrivă în literatura pe care o scrieți. Care este cel mai vechi început? 
        — În 1942, spre primăvară, am cunoscut redacția literară a Timpului. Era condusă de M. R. Paraschivescu. Dar nu mai țin minte cum am ajuns la Timpul. Țin minte cum am ajuns să pun un picior pe țărmul literaturii. Prin legătură de generație. L-am cunoscut pe Geo Dumitrescu. De ce el și nu altul? Apăreau multe reviste. Mi-a căzut în mână Albatros. Filiațiile acestea literare nu sunt hotărâte voit, ci prin instinct. „La ăsta mă duc”, mi-am zis. Am citit adresa pe coperta revistei și m-am înființat pe Calea Griviței, numărul 257. Ei bine: la postul lui se găsea un băiat ca mine, un mărunțel foarte vioi, ai fi zis că mă aștepta. 
        — Câți ani aveați? 
        — 18 și unul, și altul.
        — Se putea scoate revistă la 18 ani? 
        — Uite că se putea. Geo era acolo, afișase Albatros pe ușa odăii. O odaie de patru pe patru, așa ceva. Și asta era și casa lui. Cum s-ar zice, se afla la domiciliu și la datorie în același timp. Ceea ce nu știu e dacă tinerii din zilele astea mai sunt atât de stabili. Pe atunci, nu era o glumă că Geo se afla la postul lui. Geografic, el reprezenta orașul. Venisem de foarte puțină vreme și nu cunoșteam pe nimeni în București. [...]  
        — Cum v-a primit Geo Dumitrescu? 
        — Am intrat, am discutat c-o fi, c-o păți. Cei de aceeași generație au mereu ce vorbi. Despre literatură, firește. Iar pe urmă nu mai avea să ne despartă nimic. Asta nu înseamnă că am evoluat împreună. [...] Dar iată că, după 30 de ani de carieră literară, această luminiță care s-a aprins pe Calea Griviței a rămas mereu aprinsă, cu voia sau fără voia lui.
        — A „lui”, Geo Dumitrescu?
        — Da. Pentru că tot datorită lui, probabil, nu mai țin minte prea bine, dar cred că tot prin Geo am ajuns la Timpul. Am intrat corector. [...]
        — Pentru o mare parte din cititori, afirmațiile dumneavoastră vor fi descoperiri. 
        — Sunt și pentru mine unele dintre ele, pe măsură ce mi le împrospătez. Țin minte că atunci, din tipografie, unde eram corector, am trimis la un moment dat o bucată literară intitulată Pârlitul. Tot la Timpul am trimis-o redactorului de pagină a II-a – care era pagina culturală. Nu mi-am făcut nicio idee dinainte despre ceea ce va urma și surpriza a fost copleșitoare: redactorul paginii (intitulată Popasuri), pe care nu-l cunoșteam și care era un poet, anume M. R. Paraschivescu, mi-a făcut o invitație la locuința lui Tiberiu Tretinescu, băiat tot din generația noastră și unde M. R. Paraschivescu, în maniera sa, care avea să devină fascinantă, care avea să fascineze și generațiile viitoare, a scos din buzunar un manuscris: „să vă citesc ceva formidabil!” a anunțat el. Când colo, aud că titlul lucrării era Pârlitul.
        Interviu cu Marin Preda, realizat de Sânziana Pop și publicat în Luceafărul, nr. 29/18 mai 1974`,
        cerinte: [
            'Indică sensul din text al secvenței țin minte.',
            'Menționează numele revistei al cărei sediu se află în locuința lui Geo Dumitrescu, utilizând informațiile din text.',
            'Precizează un efect pe care îl are asupra lui Marin Preda dialogul cu Sânziana Pop, justificând cu o secvență semnificativă din text.',
            'Explică motivul pentru care Marin Preda este surprins de titlul textului pe care vrea să îl citească M. R. Paraschivescu.',
            'Prezintă, în 30–50 de cuvinte, atitudinea lui Marin Preda față de Geo Dumitrescu, așa cum reiese din text.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Vârsta și inițiativa – argumentare',
        descriere: 'Redactează un text (minim 150 cuvinte) despre dacă vârsta e obstacol în inițierea proiectelor (Subiectul I B).',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2023',
        an: 2023,
        sesiune: 'rezervă',
        tip: 'redactare',
        text: `— Întrebările ce urmează vor să scoată în lumină secretul tinereții fără de bătrânețe, cuprinse deopotrivă în literatura pe care o scrieți. Care este cel mai vechi început? 
        — În 1942, spre primăvară, am cunoscut redacția literară a Timpului. Era condusă de M. R. Paraschivescu. Dar nu mai țin minte cum am ajuns la Timpul. Țin minte cum am ajuns să pun un picior pe țărmul literaturii. Prin legătură de generație. L-am cunoscut pe Geo Dumitrescu. De ce el și nu altul? Apăreau multe reviste. Mi-a căzut în mână Albatros. Filiațiile acestea literare nu sunt hotărâte voit, ci prin instinct. „La ăsta mă duc”, mi-am zis. Am citit adresa pe coperta revistei și m-am înființat pe Calea Griviței, numărul 257. Ei bine: la postul lui se găsea un băiat ca mine, un mărunțel foarte vioi, ai fi zis că mă aștepta. 
        — Câți ani aveați? 
        — 18 și unul, și altul.
        — Se putea scoate revistă la 18 ani? 
        — Uite că se putea. Geo era acolo, afișase Albatros pe ușa odăii. O odaie de patru pe patru, așa ceva. Și asta era și casa lui. Cum s-ar zice, se afla la domiciliu și la datorie în același timp. Ceea ce nu știu e dacă tinerii din zilele astea mai sunt atât de stabili. Pe atunci, nu era o glumă că Geo se afla la postul lui. Geografic, el reprezenta orașul. Venisem de foarte puțină vreme și nu cunoșteam pe nimeni în București. [...]  
        — Cum v-a primit Geo Dumitrescu? 
        — Am intrat, am discutat c-o fi, c-o păți. Cei de aceeași generație au mereu ce vorbi. Despre literatură, firește. Iar pe urmă nu mai avea să ne despartă nimic. Asta nu înseamnă că am evoluat împreună. [...] Dar iată că, după 30 de ani de carieră literară, această luminiță care s-a aprins pe Calea Griviței a rămas mereu aprinsă, cu voia sau fără voia lui.
        — A „lui”, Geo Dumitrescu?
        — Da. Pentru că tot datorită lui, probabil, nu mai țin minte prea bine, dar cred că tot prin Geo am ajuns la Timpul. Am intrat corector. [...]
        — Pentru o mare parte din cititori, afirmațiile dumneavoastră vor fi descoperiri. 
        — Sunt și pentru mine unele dintre ele, pe măsură ce mi le împrospătez. Țin minte că atunci, din tipografie, unde eram corector, am trimis la un moment dat o bucată literară intitulată Pârlitul. Tot la Timpul am trimis-o redactorului de pagină a II-a – care era pagina culturală. Nu mi-am făcut nicio idee dinainte despre ceea ce va urma și surpriza a fost copleșitoare: redactorul paginii (intitulată Popasuri), pe care nu-l cunoșteam și care era un poet, anume M. R. Paraschivescu, mi-a făcut o invitație la locuința lui Tiberiu Tretinescu, băiat tot din generația noastră și unde M. R. Paraschivescu, în maniera sa, care avea să devină fascinantă, care avea să fascineze și generațiile viitoare, a scos din buzunar un manuscris: „să vă citesc ceva formidabil!” a anunțat el. Când colo, aud că titlul lucrării era Pârlitul.
        Interviu cu Marin Preda, realizat de Sânziana Pop și publicat în Luceafărul, nr. 29/18 mai 1974`,
        cerinte: [
            'Cerințe totale: argumentează dacă vârsta este sau nu un obstacol în inițierea proiectelor, raportându-te la fragment și la experiența personală/culturală.',
            'Sumar conținut: opinie clară, două argumente dezvoltate, concluzie pertinentă.',
            'Sumar redactare: conectori corecți; norme ale limbii literare; respectă minimul de cuvinte.'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Modalități de caracterizare a personajului – Mircea Eliade',
        descriere: 'Prezintă, în minimum 50 de cuvinte, două modalități de caracterizare a personajului (Subiectul II).',
        numarSubiect: 2,
        profil: 'real',
        data: '2023',
        an: 2023,
        sesiune: 'rezervă',
        tip: 'eseu',
        text: 'În dimineața de 28 aprilie, un vizitator neașteptat bătu la ușa portarului Julius. Necunoscutul era un tânăr lung, palid, și vorbea puțin gângav, stânjenit, dar afectându-și în același timp gângăveala; se rezemă într-un baston necioplit, pe care îl ținea cu amândouă mâinile la spate. Julius venise numai cu puține minute înainte, ca să deschidă ferestrele sălii de lectură și să scuture praful din biroul directorului. Era singur în toată clădirea. Era încă prea devreme, nu mai mult de șase jumătate. Firește, vizitatorul neașteptat îl înciudă, cu atât mai mult cu cât vorbirea lui împiedicată se dovedea plină de taine. Julius nu izbutise să-i afle numele. Era străin, de-abia picat de la gară; Julius zărise geamantanul în trăsura care îl aștepta la poarta bibliotecii. Nici motivul vizitei nu izbuti să-l afle. Necunoscutul revenea – după scurte pauze, în care timp schimba poziția bastonului – la aceeași întrebare inițială:  — Și știi bine că nimic nu s-a schimbat în bibliotecă? Julius îl asigura stăruitor că totul era ca mai înainte; nu s-a schimbat nimic, pentru că toate erau bune așa cum erau; de ce să se schimbe? — Bibliotecarul e aici? — Cum se poate? D. Cesare vine la opt. Biblioteca se deschide la nouă. Cum ar putea veni cu noaptea în cap? — Firește, firește... Așadar, nimic?... Hm! E de necrezut! Dumneata ai fost aici astă-noapte? — Nu rămâne nimeni noaptea aici, dar ușa o închid eu, seara. Și vedeți, e destul de zdravănă. Mircea Eliade, Lumina ce se stinge...',
        cerinte: [
            'Conținut: prezintă două modalități de caracterizare a personajului identificate în fragment (minimum 50 de cuvinte).',
            'Redactare: limbă literară; logică a ideilor; ortografie; punctuație.'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6',
            'Redactare: 4'
        ]
    },
    {
        titlu: 'Eseu despre un text poetic (Mihai Eminescu)',
        descriere: 'Redactează un eseu (minim 400 de cuvinte) privind particularitățile unui text poetic studiat, aparținând lui Mihai Eminescu.',
        numarSubiect: 3,
        profil: 'real',
        data: '2023',
        an: 2023,
        sesiune: 'rezervă',
        tip: 'eseu',
        text: 'Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularităţi ale unui text poetic studiat, aparţinând lui Mihai Eminescu. În elaborarea eseului, vei avea în vedere următoarele repere: – evidenţierea a două trăsături care fac posibilă încadrarea textului poetic într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică; – comentarea a două imagini/idei poetice relevante pentru tema textului poetic; – analiza a două elemente de compoziţie şi/sau de limbaj, semnificative pentru textul poetic (de exemplu: titlu, incipit, relații de opoziție și de simetrie, motive poetice, figuri semantice, elemente de prozodie etc.).',
        cerinte: [
            'Evidențiază două trăsături de încadrare a textului poetic.',
            'Comentează două imagini/idei poetice relevante pentru temă.',
            'Analizează două elemente de compoziție și/sau de limbaj semnificative.'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'Vasile Tițescu, L-am cunoscut pe Liviu Rebreanu',
        descriere: 'Citește fragmentul și rezolvă cerințele (Subiectul I A).',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2023',
        an: 2023,
        sesiune: 'simulare',
        tip: 'analiza',
        text: `În anul 1930, familia Rebreanu a cumpărat o casă și o mică grădină cu pomi și vie la 3 km de Pitești, în comuna Valea Mare, o casă veche, situată pe o pantă de deal, dispusă cu fața spre miazăzi, însorită toată ziua, cu o priveliște minunată, având în față dealuri acoperite de vii și pomi fructiferi și o pădure seculară, deci o perspectivă plină de încântare. Casa trebuia reparată, modernizată, trebuiau noi dependințe, împrejmuită cu gard, via lucrată, pomii curățați, pavaj, grădină cu flori... Toate cereau bani, care lipseau. Rebreanu s-a împrumutat la o bancă din Pitești. Câțiva ani a plătit din greu rate, dobânzi mari, și multe alte necazuri, dar, până la sfârșit, familia Rebreanu avea o reședință la țară, cu confort modern, într-o poziție minunată, în aer curat, unde scriitorul, într-un mediu prielnic de liniște, a putut să gândească, să scrie romanele care i-au adus gloria, titlul de academician, care l-au încadrat nemuritor în literatura română și străină. Aici a trăit anii cei mai buni, aici era locul de relaxare, aici își primea oaspeții, nu prea numeroși, și prietenii mai mult din familie; familia Rebreanu, familia Mihail Sorbul, familia Ionel Rădulescu și familia mea ne întâlneam în reuniuni familiale și prietenești, când la Valea Mare, când la Gălășești-Argeș, la reședința lui Sorbul, când la mine, la Pitești. Eu, devenit medic al acestor familii, le-am cunoscut și zilele bune și zilele grele, necazurile, bolile, care se abăteau adesea asupra lor. [...] 
Liviu Rebreanu era o figură reprezentativă: un bărbat înalt, falnic, cu o înfățișare distinsă, cu părul blond, pieptănat cu o buclă pe fruntea senină, ochi albaștri-verzui, cu un zâmbet luminos. Vorbea cu o voce caldă, ușor răgușită, liniștit, fără gesturi. Mergea cu pași mari, siguri; se îmbrăca îngrijit, de o eleganță naturală. Întreaga lui ținută arăta o deosebită distincție, care impunea respect. Comportarea lui față de oameni era aceea a unui om bun, blând, cu multă răbdare, avea multă simplitate în conversație, evita folosirea cuvintelor pompoase și radicale, era ușor de înțeles de orice convorbitor. Indiferent cu cine vorbea, avea răbdare să asculte cu atenție și bunăvoință, făcea impresia că studia pe cel ce îl avea în față. În decursul anilor, arareori l-am auzit vorbind despre operele sale, evita sistematic astfel de subiecte. Avea o modestie, chiar un fel de timiditate înnăscută, făcea abstracție de meritele sale, de rezultatele sale în literatură, era mai bucuros să asculte pe cineva decât să vorbească, era un fel de interiorizat, totuși asculta cu plăcere glume spuse de alții, râzând uneori cu poftă. Citea, se cultiva zilnic, avea la Valea Mare o bibliotecă bogată, ocupând pereții unei camere, cu cărți de diferiți scriitori, cu diferite subiecte, în diferite ediții. [...] 
Îl pasiona studiul cerului: în nopțile senine studia cărți de astronomie și cu o lunetă, din pridvorul casei, studia stelele pe cer. Printre puținele pasiuni, îi făcea o mare plăcere să conducă mașina, cu geamurile deschise; avea nevoie de aer mult, curat, să vadă verdeață, flori, natura îl înviora; grădina casei de la Valea Mare cu pomi, via și florile ei îi făceau o deosebită atracție, păstrată din copilăria petrecută la țară. [...] 
Văzut în ansamblu, Rebreanu părea a fi un optimist, păstra încredere în toate acțiunile lui, ducea o viață liniștită, puțin pretențios cumpărată, se simțea peste tot și întotdeauna mulțumit.
Vasile Tițescu, L-am cunoscut pe Liviu Rebreanu, în vol. Amintiri despre Liviu Rebreanu`,
        cerinte: [
            'Indică sensul din text al secvenței peste tot.',
            'Menționează localitatea în care trăiește Vasile Tițescu, utilizând informațiile din text.',
            'Precizează una dintre pasiunile lui Liviu Rebreanu, justificând cu o secvență din text.',
            'Explică motivul pentru care Liviu Rebreanu împrumută bani de la bancă.',
            'Prezintă, în 30–50 de cuvinte, o trăsătură a lui Liviu Rebreanu, evidențiată în relațiile cu ceilalți.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Succesul și mediul de lucru – argumentare (Simulare)',
        descriere: 'Redactează un text (minim 150 cuvinte) despre dacă succesul e influențat de mediul de lucru (Subiectul I B).',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2023',
        an: 2023,
        sesiune: 'simulare',
        tip: 'redactare',
        text: `În anul 1930, familia Rebreanu a cumpărat o casă și o mică grădină cu pomi și vie la 3 km de Pitești, în comuna Valea Mare, o casă veche, situată pe o pantă de deal, dispusă cu fața spre miazăzi, însorită toată ziua, cu o priveliște minunată, având în față dealuri acoperite de vii și pomi fructiferi și o pădure seculară, deci o perspectivă plină de încântare. Casa trebuia reparată, modernizată, trebuiau noi dependințe, împrejmuită cu gard, via lucrată, pomii curățați, pavaj, grădină cu flori... Toate cereau bani, care lipseau. Rebreanu s-a împrumutat la o bancă din Pitești. Câțiva ani a plătit din greu rate, dobânzi mari, și multe alte necazuri, dar, până la sfârșit, familia Rebreanu avea o reședință la țară, cu confort modern, într-o poziție minunată, în aer curat, unde scriitorul, într-un mediu prielnic de liniște, a putut să gândească, să scrie romanele care i-au adus gloria, titlul de academician, care l-au încadrat nemuritor în literatura română și străină. Aici a trăit anii cei mai buni, aici era locul de relaxare, aici își primea oaspeții, nu prea numeroși, și prietenii mai mult din familie; familia Rebreanu, familia Mihail Sorbul, familia Ionel Rădulescu și familia mea ne întâlneam în reuniuni familiale și prietenești, când la Valea Mare, când la Gălășești-Argeș, la reședința lui Sorbul, când la mine, la Pitești. Eu, devenit medic al acestor familii, le-am cunoscut și zilele bune și zilele grele, necazurile, bolile, care se abăteau adesea asupra lor. [...] 
Liviu Rebreanu era o figură reprezentativă: un bărbat înalt, falnic, cu o înfățișare distinsă, cu părul blond, pieptănat cu o buclă pe fruntea senină, ochi albaștri-verzui, cu un zâmbet luminos. Vorbea cu o voce caldă, ușor răgușită, liniștit, fără gesturi. Mergea cu pași mari, siguri; se îmbrăca îngrijit, de o eleganță naturală. Întreaga lui ținută arăta o deosebită distincție, care impunea respect. Comportarea lui față de oameni era aceea a unui om bun, blând, cu multă răbdare, avea multă simplitate în conversație, evita folosirea cuvintelor pompoase și radicale, era ușor de înțeles de orice convorbitor. Indiferent cu cine vorbea, avea răbdare să asculte cu atenție și bunăvoință, făcea impresia că studia pe cel ce îl avea în față. În decursul anilor, arareori l-am auzit vorbind despre operele sale, evita sistematic astfel de subiecte. Avea o modestie, chiar un fel de timiditate înnăscută, făcea abstracție de meritele sale, de rezultatele sale în literatură, era mai bucuros să asculte pe cineva decât să vorbească, era un fel de interiorizat, totuși asculta cu plăcere glume spuse de alții, râzând uneori cu poftă. Citea, se cultiva zilnic, avea la Valea Mare o bibliotecă bogată, ocupând pereții unei camere, cu cărți de diferiți scriitori, cu diferite subiecte, în diferite ediții. [...] 
Îl pasiona studiul cerului: în nopțile senine studia cărți de astronomie și cu o lunetă, din pridvorul casei, studia stelele pe cer. Printre puținele pasiuni, îi făcea o mare plăcere să conducă mașina, cu geamurile deschise; avea nevoie de aer mult, curat, să vadă verdeață, flori, natura îl înviora; grădina casei de la Valea Mare cu pomi, via și florile ei îi făceau o deosebită atracție, păstrată din copilăria petrecută la țară. [...] 
Văzut în ansamblu, Rebreanu părea a fi un optimist, păstra încredere în toate acțiunile lui, ducea o viață liniștită, puțin pretențios cumpărată, se simțea peste tot și întotdeauna mulțumit.
Vasile Tițescu, L-am cunoscut pe Liviu Rebreanu, în vol. Amintiri despre Liviu Rebreanu`,
        cerinte: [
            'Cerințe totale: argumentează dacă succesul este sau nu influențat de mediul de lucru, raportându-te la fragment și la experiența personală/culturală.',
            'Sumar conținut: opinie clară, două argumente dezvoltate, concluzie pertinentă.',
            'Sumar redactare: conectori corecți; norme ale limbii literare; respectă minimul de cuvinte.'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Comentariu pe text – Tudor Arghezi',
        descriere: 'Comentează, în minimum 50 de cuvinte, relația idee poetică – mijloace artistice (Subiectul II).',
        numarSubiect: 2,
        profil: 'real',
        data: '2023',
        an: 2023,
        sesiune: 'simulare',
        tip: 'poezie',
        text: `E vântul care-mi bate-n geam
Ori mâinile iubitei mele,
Care-a zburat pe-un șir de stele
Să mă sărute când plângeam?

Sunt sunetele harpei mele,
Sunt sufletele unor morți
Ce bat în geamuri și la porți?

Oh! ploaia, ploaia-mi bate-n geam, –
Subt șirurile lungi de ploaie
Gândirea mea se încovoaie,
Suspinul meu e lung și stins,
Și imnul meu se-nalță mort
Din coarda ruptă ce-am întins.

Tudor Arghezi, Versuri`,
        cerinte: [
            'Conținut: comentează relația idee poetică – mijloace artistice (minimum 50 de cuvinte).',
            'Redactare: limbă literară; logică a ideilor; ortografie; punctuație.'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6',
            'Redactare: 4'
        ]
    },
    {
        titlu: 'Eseu – personaj dintr-un basm cult',
        descriere: 'Redactează un eseu (minim 400 de cuvinte) despre construcția unui personaj dintr-un basm cult studiat.',
        numarSubiect: 3,
        profil: 'real',
        data: '2023',
        an: 2023,
        sesiune: 'simulare',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități de construcție a unui personaj dintr-un basm cult studiat.
În elaborarea eseului, vei avea în vedere următoarele repere:
– prezentarea statutului social, psihologic, moral etc. al personajului ales;
– evidențierea unei trăsături a personajului ales, prin două episoade/secvențe comentate;
– analiza a două elemente de structură, de compoziție și/sau de limbaj ale basmului cult studiat, semnificative pentru construcția personajului ales (de exemplu: acțiune, conflict, modalități de caracterizare, relații temporale și spațiale, incipit, final, tehnici narative, instanțe ale comunicării narative, registre stilistice, limbaj etc.).`,
        cerinte: [
            'Prezintă statutul personajului ales.',
            'Evidențiază o trăsătură prin două episoade/secvențe comentate.',
            'Analizează două elemente de structură/compoziție/limbaj semnificative.'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'Nicolae Iorga, Doamna Elena Cuza',
        descriere: 'Citește fragmentul și rezolvă cerințele (Subiectul I A).',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2022',
        an: 2022,
        sesiune: 'sesiune de vară',
        tip: 'analiza',
        text: `Pe Doamna Elena* am văzut-o în zilele serbărilor amintitoare ale Unirii. Întovărășeam două studente ale Universității din București care veneau să-i înfățișeze o adresă de omagiu* din partea colegelor lor.
Casa ei o dăruise Doamna Elena lui Theodor Rosetti, atunci când ea se hotărâse a părăsi țara. Întorcându-se – nu știu de ce plecase, dar se întorsese de dor – ea primi găzduirea unei familii bogate din Piatra-Neamț, care-i puse la dispoziție o căsuță curată și veselă, în care ai fi crezut mai degrabă că se sălășluiește* primăvara unei familii de funcționari săraci, decât că în ea se adăpostește aceea care a fost Doamna țării.
Multă simplicitate și la primirea de către personalul străin care o înconjura pe Măria Sa. Și multă cuviință rezervată, multă liniște rece. Mi se părea că intru într-un cavou și că dincolo de ușa închisă, [...] voi găsi o umbră din acelea care multă vreme încă flutură în jurul mormintelor mari, fără plâns, fără glas.
Și nu, în acea odăiță neagră, în care se deslușea, în fundul unui fotoliu, dintr-o săracă rochie de doliu veșnic, sub un cauc* de călugăriță acoperit cu un văl simplu de lână, o figură măruntă, săpată fin în fildeș palid, – în odaia aceea era o vieață care știa, cetea, afla, care unea cunoștința întreagă a trecutului cu cunoștința desăvârșită a celor de astăzi, era o cugetare sigură și cuminte, era o inimă care bătea pentru tot ce e nobil și ochi în care nu secase izvorul lacrimilor acelora care țin vii durerile cele mari, ascunse de lume, pe care ele n-o privesc.
Când una din cele două fete îi citi, cu emoția ce și-o poate închipui oricine, rândurile din închinare, Doamna se ridică, sprijinindu-se greu pe bietele mâini bătrâne, care făcuseră odată atâta bine și care tremurau slăbite în mânecile de lână neagră. O vedeam acum limpede: era o femeie micuță de stat, foarte delicată, pe care o simțeai însă că putuse sta odinioară alături de un Domn – și ce Domn!
Îndrăznii a mă uita în ochii ei [...]. În orbitele adânc săpate, pline [...] de o umbră tristă, ochiul rămăsese, în liniștea lui împăcată, viu și puternic, uneori cu căutătura stăpânitoare, alteori înduioșat, bun, plin de binecuvântare. Cât se auzi pomenindu-se numele și faptele aceluia pentru care avuse toată iubirea femeii și o iertare pe care puține o pot da, acest ochi privi undeva, departe, unde mergea și gândul tuturor celor de față. Apoi, în arcuitura de jos a orbitei adânci, o lacrimă mare se strecură încet. După patruzeci de ani, ea putea să plângă încă pentru dânsul.
Și vorbi, cu un glas care n-avea îndoieli [...] și în care slăbiciunea punea doar un ritm încet, care te făcea să simți că acestea nu sunt vorbe ale tuturor celorlalți oameni, că e într-însele ceva imaterial, aș zice aproape supranatural, ca în tot ce privea pe această femeie demult ieșită din rândurile grăbite, zgomotoase, pătimașe și vulgare ale oamenilor. Și, în felul ei de a vorbi, știa să amestece două elemente care nu mai merg împreună azi, dar care prin unirea lor făceau și marele farmec al elocvenței marelui ei soț: cea mai desăvârșită simplicitate și cea mai autentică maiestate.
Când cetirea adresei se isprăvi, auzii aceste cuvinte de mulțumire, pe care le întovărășea un adevărat gest de suverană: „Să trăiască România tânără!”.
Nicolae Iorga, Doamna Elena Cuza, în volumul Oameni cari au fost
*Doamna Elena – soția lui Alexandru Ioan Cuza
*adresă de omagiu – scrisoare omagială
*a se sălășlui – a se așeza, a se stabili
*cauc – potcap; acoperământ de cap, înalt și rotund, făcut din pâslă, purtat de preoții și călugării ortodocși`,
        cerinte: [
            'Indică sensul din text al secvenței de față.',
            'Menționează scopul cu care studentele o vizitează pe Elena Cuza, utilizând informațiile din text.',
            'Precizează o reacție a Elenei Cuza când aude pomenindu-se numele soțului ei, justificând cu o secvență din text.',
            'Explică motivul pentru care Elena Cuza locuiește la Piatra-Neamț, după revenirea în țară.',
            'Prezintă, în 30–50 de cuvinte, o trăsătură morală a Elenei Cuza, așa cum reiese din text.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Întâlnirea cu o personalitate – argumentare',
        descriere: 'Redactează un text (minim 150 cuvinte) despre dacă întâlnirea cu o personalitate produce emoție (Subiectul I B).',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2022',
        an: 2022,
        sesiune: 'sesiune de vară',
        tip: 'redactare',
        text: `Pe Doamna Elena* am văzut-o în zilele serbărilor amintitoare ale Unirii. Întovărășeam două studente ale Universității din București care veneau să-i înfățișeze o adresă de omagiu* din partea colegelor lor.
Casa ei o dăruise Doamna Elena lui Theodor Rosetti, atunci când ea se hotărâse a părăsi țara. Întorcându-se – nu știu de ce plecase, dar se întorsese de dor – ea primi găzduirea unei familii bogate din Piatra-Neamț, care-i puse la dispoziție o căsuță curată și veselă, în care ai fi crezut mai degrabă că se sălășluiește* primăvara unei familii de funcționari săraci, decât că în ea se adăpostește aceea care a fost Doamna țării.
Multă simplicitate și la primirea de către personalul străin care o înconjura pe Măria Sa. Și multă cuviință rezervată, multă liniște rece. Mi se părea că intru într-un cavou și că dincolo de ușa închisă, [...] voi găsi o umbră din acelea care multă vreme încă flutură în jurul mormintelor mari, fără plâns, fără glas.
Și nu, în acea odăiță neagră, în care se deslușea, în fundul unui fotoliu, dintr-o săracă rochie de doliu veșnic, sub un cauc* de călugăriță acoperit cu un văl simplu de lână, o figură măruntă, săpată fin în fildeș palid, – în odaia aceea era o vieață care știa, cetea, afla, care unea cunoștința întreagă a trecutului cu cunoștința desăvârșită a celor de astăzi, era o cugetare sigură și cuminte, era o inimă care bătea pentru tot ce e nobil și ochi în care nu secase izvorul lacrimilor acelora care țin vii durerile cele mari, ascunse de lume, pe care ele n-o privesc.
Când una din cele două fete îi citi, cu emoția ce și-o poate închipui oricine, rândurile din închinare, Doamna se ridică, sprijinindu-se greu pe bietele mâini bătrâne, care făcuseră odată atâta bine și care tremurau slăbite în mânecile de lână neagră. O vedeam acum limpede: era o femeie micuță de stat, foarte delicată, pe care o simțeai însă că putuse sta odinioară alături de un Domn – și ce Domn!
Îndrăznii a mă uita în ochii ei [...]. În orbitele adânc săpate, pline [...] de o umbră tristă, ochiul rămăsese, în liniștea lui împăcată, viu și puternic, uneori cu căutătura stăpânitoare, alteori înduioșat, bun, plin de binecuvântare. Cât se auzi pomenindu-se numele și faptele aceluia pentru care avuse toată iubirea femeii și o iertare pe care puține o pot da, acest ochi privi undeva, departe, unde mergea și gândul tuturor celor de față. Apoi, în arcuitura de jos a orbitei adânci, o lacrimă mare se strecură încet. După patruzeci de ani, ea putea să plângă încă pentru dânsul.
Și vorbi, cu un glas care n-avea îndoieli [...] și în care slăbiciunea punea doar un ritm încet, care te făcea să simți că acestea nu sunt vorbe ale tuturor celorlalți oameni, că e într-însele ceva imaterial, aș zice aproape supranatural, ca în tot ce privea pe această femeie demult ieșită din rândurile grăbite, zgomotoase, pătimașe și vulgare ale oamenilor. Și, în felul ei de a vorbi, știa să amestece două elemente care nu mai merg împreună azi, dar care prin unirea lor făceau și marele farmec al elocvenței marelui ei soț: cea mai desăvârșită simplicitate și cea mai autentică maiestate.
Când cetirea adresei se isprăvi, auzii aceste cuvinte de mulțumire, pe care le întovărășea un adevărat gest de suverană: „Să trăiască România tânără!”.
Nicolae Iorga, Doamna Elena Cuza, în volumul Oameni cari au fost
*Doamna Elena – soția lui Alexandru Ioan Cuza
*adresă de omagiu – scrisoare omagială
*a se sălășlui – a se așeza, a se stabili
*cauc – potcap; acoperământ de cap, înalt și rotund, făcut din pâslă, purtat de preoții și călugării ortodocși`,
        cerinte: [
            'Cerințe totale: argumentează dacă întâlnirea cu o personalitate produce sau nu emoție, raportându-te la fragment și la experiența personală/culturală.',
            'Sumar conținut: opinie clară, două argumente dezvoltate, concluzie pertinentă.',
            'Sumar redactare: conectori corecți; norme ale limbii literare; respectă minimul de cuvinte.'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Perspectiva narativă – Cezar Petrescu',
        descriere: 'Prezintă, în minimum 50 de cuvinte, perspectiva narativă (Subiectul II).',
        numarSubiect: 2,
        profil: 'real',
        data: '2022',
        an: 2022,
        sesiune: 'sesiune de vară',
        tip: 'eseu',
        text: `Radu Comșa, oprit în ușă, îi căuta cu ochii peste mese. Când zări mâna colonelului ridicată, făcu semn că i-a văzut.
Era însoțit de un om în haine castanii, vărgate, decolorate pe umeri, cu fața ascunsă de umbra unei panamale* demodate, cu borurile foarte largi.
— E cu un tip! anunță unchiul Pol. Tonul acestei constatări lămurea îndestul că, după aparență, colonelul îl categorisise printre indivizii de la periferia umanității, care nu prezintă niciun interes pentru neamul Vardarilor. Tipul voia să se despartă și, din gesturi, se înțelegea că Radu Comșa stăruia să-l târâie după dânsul.
— Dar e domnul Probotă! strigă Mihai, recunoscându-l și sărind de pe scaun. Mă duc să-l aduc!...
Virgil Probotă, coleg de școală și prieten al lui Radu Comșa, dascăl de științe la un liceu din Capitală, fusese, ca student, preceptorul* Luminiței și al lui Mihai. Cu toată sarcina ingrată de a iniția doi copii răsfățați în tainele trigonometriei, în legile lui Newton și paragrafele lui Tacit, lăsase foștilor elevi amintirea unui om cu multe ciudățenii și stângăcii, amuzant de deformat, până la pedanterie, de învățătură, dar de o largă înțelegere și de o pasionată dragoste a cărților.
Cezar Petrescu, Întunecare
*panama – pălărie făcută dintr-o țesătură ușoară
*preceptor – persoană însărcinată cu educarea și instruirea particulară a unui copil`,
        cerinte: [
            'Conținut: prezintă perspectiva narativă identificată în fragment (minimum 50 de cuvinte).',
            'Redactare: limbă literară; logică a ideilor; ortografie; punctuație.'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6',
            'Redactare: 4'
        ]
    },
    {
        titlu: 'Eseu despre o comedie studiată',
        descriere: 'Redactează un eseu (minim 400 de cuvinte) despre particularitățile unei comedii studiate.',
        numarSubiect: 3,
        profil: 'real',
        data: '2022',
        an: 2022,
        sesiune: 'sesiune de vară',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități ale unei comedii studiate.
În elaborarea eseului, vei avea în vedere următoarele repere:
– evidențierea a două trăsături care fac posibilă încadrarea comediei studiate într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică;
– comentarea a două scene/secvențe relevante pentru tema comediei studiate;
– analiza a două componente de structură și/sau de limbaj, semnificative pentru comedia studiată (de exemplu: acțiune, personaj, notațiile autorului, conflict dramatic, registre stilistice, limbaj, act, scenă etc.).`,
        cerinte: [
            'Evidențiază două trăsături de încadrare a comediei.',
            'Comentează două scene/secvențe relevante.',
            'Analizează două componente de structură/limbaj semnificative.'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'Agatha Grigorescu-Bacovia, Bacovia. Poezie sau destin',
        descriere: 'Citește fragmentul și rezolvă cerințele (Subiectul I A).',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2022',
        an: 2022,
        sesiune: 'sesiune de toamnă',
        tip: 'analiza',
        text: `În dimineața lui 23 aprilie, Bacovia a fost de părere să facem o plimbare spre Gherăești. Auzisem că sunt crânguri tinere, zăvoaie minunate în această parte din lunca Bistriței.
Șoseaua era mărginită de cireși cu fructele amare. Până în 1936, când a devenit parc public, la Gherăești era un colț primitiv de natură, cu vegetație foarte bogată. Cireșii erau înfloriți și răspândeau o mireasmă amăruie, asemeni crizantemelor toamna.
Cerul era senin. Păsările cântau gureșe prin ramuri și, prin iarbă, zburdau gâze de tot felul. Mergeam apropiați, voioși că putem respira primăvara de pretutindeni.
Am intrat într-o zonă de arbuști înfloriți, apoi direct pe malurile foarte largi, ascunse de copacii deși, cu frunze destul de crude. Păreau din smalț fragil, pe care soarele răsfrângea aurul luminii pale. Bistrița tot nu se zărea. Eram abia în codrii din preajma ei. Pășeam prin iarba fragedă, plină de toporași. Îmi culesei un buchet, în timp ce Bacovia se așeză pe o buturugă asemeni unui scăunel [...].
Ciripitul păsărilor era o cascadă de triluri. Am stat și eu pe alt ciot de arbore retezat și ascultarăm tăcuți simfonia primăverii.
Am respirat cu nesaț prospețimea pajiștii înverzite, apoi am continuat drumul până am dat de malurile ondulate ale Bistriței. Deodată se iviră plute imense, conduse de țapinari* la vale. Cântau un cântec ce se stingea în largul apelor într-un vag ecou. De pe malul celălalt se auzea o doină din fluier și zărirăm ciobani cu oile. Unul ducea pe brațe un miel alb, pătat cu negru pe urechi și pe spate. Aici apa nu era prea lată. Nu trecu mult și se auzi un bucium îndepărtat dintr-un fund de pădure. Clipocitul apei se făcu simțit ca un pianissimo*.
Îmi adusei aminte versurile: Și vine, ca-n vremi de demult,/Din margini, un bucium de-alarmă...* — Acesta nu mai e de alarmă, interveni poetul. Vestește ciobanilor venirea primăverii.
Pe aici m-a prins într-o zi o furtună cumplită. Eram în clasa a IV-a*. Plecasem într-o după-amiază de acasă. Voiam să mă plimb pe malurile acestea liniștite, să ascult șoaptele valurilor și cântecul plutașilor. Deodată, s-a înnorat. Până să-mi dau seama, să-mi caut un adăpost, s-a pornit o rupere de nori cum nu mai văzusem niciodată. Am avut vreme să intru într-o scorbură de copac. Nu-l mai văd, l-au tăiat. Tuna, trăsnea, fulgera cu mii de artificii. Mă mir că nu a trăsnit copacul în care mă aflam. A fost teribil, teribil.
Când a stat ploaia se înserase și uitasem drumul. Rătăceam așa fără să știu unde. Întâlnii un cioban. Mă văzu ud și și plin de noroi. Trecusem printr-o mare emoție. Se uită la mine mirat. „Încotro?”. Îi spusei că am rătăcit drumul. Mă văzu elev. Se miră că am venit prin aceste părți, dar mă scoase la drumul cu cireși. Acasă, după ce mi-am revenit din spaimă, am început primele versuri din poezia Furtună. Mi-am adus aminte că aveam pe a doua zi niște versuri de tradus la limba latină și am lăsat poezia la o parte. După o altă furtună, în altă parte a Bistriței, am reluat-o și așa s-a născut acea poemă a spaimei încercate prin codrii Bacăului.
Dar aici a fost grozav. Părea că se lăsase cerul pe lume cu toate spaimele lui. Eram înfiorată. Mi-a spus poezia în timp ce eu urmăream curgerea apei învolburate cu clipocitul ei înfundat. Scoase un carnețel, notă ceva și câteva note pe două linii de portativ. Părea că se ferește, să nu-l văd. M-am și făcut că n-am observat nimic. Pe drum, la întoarcere, prin zăvoi, îmi fredonă un cântec. — L-am prins din clipocitul apei... acest cântec subțire și cam vag... nu-i așa?
Agatha Grigorescu-Bacovia, Bacovia. Poezie sau destin
*țapinar – muncitor care manevrează buștenii folosind o unealtă specifică, numită țapină
*pianissimo – foarte încet
*Versurile aparțin poeziei Toamnă de George Bacovia.
*Clasa a IV-a corespunde, în perioada antebelică, clasei a XII-a din prezent.`,
        cerinte: [
            'Indică sensul din text al secvenței de tot felul.',
            'Menționează numele râului pe malul căruia se plimbă cei doi tineri, utilizând informațiile din text.',
            'Precizează florile al căror miros este asociat de autoare cu cel al cireșilor înfloriți, justificând cu o secvență semnificativă din text.',
            'Explică motivul pentru care Bacovia se oprește din scrierea poeziei Furtună.',
            'Prezintă, în 30–50 de cuvinte, o trăsătură morală a autoarei, așa cum reiese din text.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Experiențe de viață și creație – argumentare',
        descriere: 'Redactează un text (minim 150 cuvinte) despre dacă experiențele de viață influențează procesul de creație (Subiectul I B).',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2022',
        an: 2022,
        sesiune: 'sesiune de toamnă',
        tip: 'redactare',
        text: `În dimineața lui 23 aprilie, Bacovia a fost de părere să facem o plimbare spre Gherăești. Auzisem că sunt crânguri tinere, zăvoaie minunate în această parte din lunca Bistriței.
Șoseaua era mărginită de cireși cu fructele amare. Până în 1936, când a devenit parc public, la Gherăești era un colț primitiv de natură, cu vegetație foarte bogată. Cireșii erau înfloriți și răspândeau o mireasmă amăruie, asemeni crizantemelor toamna.
Cerul era senin. Păsările cântau gureșe prin ramuri și, prin iarbă, zburdau gâze de tot felul. Mergeam apropiați, voioși că putem respira primăvara de pretutindeni.
Am intrat într-o zonă de arbuști înfloriți, apoi direct pe malurile foarte largi, ascunse de copacii deși, cu frunze destul de crude. Păreau din smalț fragil, pe care soarele răsfrângea aurul luminii pale. Bistrița tot nu se zărea. Eram abia în codrii din preajma ei. Pășeam prin iarba fragedă, plină de toporași. Îmi culesei un buchet, în timp ce Bacovia se așeză pe o buturugă asemeni unui scăunel [...].
Ciripitul păsărilor era o cascadă de triluri. Am stat și eu pe alt ciot de arbore retezat și ascultarăm tăcuți simfonia primăverii.
Am respirat cu nesaț prospețimea pajiștii înverzite, apoi am continuat drumul până am dat de malurile ondulate ale Bistriței. Deodată se iviră plute imense, conduse de țapinari* la vale. Cântau un cântec ce se stingea în largul apelor într-un vag ecou. De pe malul celălalt se auzea o doină din fluier și zărirăm ciobani cu oile. Unul ducea pe brațe un miel alb, pătat cu negru pe urechi și pe spate. Aici apa nu era prea lată. Nu trecu mult și se auzi un bucium îndepărtat dintr-un fund de pădure. Clipocitul apei se făcu simțit ca un pianissimo*.
Îmi adusei aminte versurile: Și vine, ca-n vremi de demult,/Din margini, un bucium de-alarmă...* — Acesta nu mai e de alarmă, interveni poetul. Vestește ciobanilor venirea primăverii.
Pe aici m-a prins într-o zi o furtună cumplită. Eram în clasa a IV-a*. Plecasem într-o după-amiază de acasă. Voiam să mă plimb pe malurile acestea liniștite, să ascult șoaptele valurilor și cântecul plutașilor. Deodată, s-a înnorat. Până să-mi dau seama, să-mi caut un adăpost, s-a pornit o rupere de nori cum nu mai văzusem niciodată. Am avut vreme să intru într-o scorbură de copac. Nu-l mai văd, l-au tăiat. Tuna, trăsnea, fulgera cu mii de artificii. Mă mir că nu a trăsnit copacul în care mă aflam. A fost teribil, teribil.
Când a stat ploaia se înserase și uitasem drumul. Rătăceam așa fără să știu unde. Întâlnii un cioban. Mă văzu ud și și plin de noroi. Trecusem printr-o mare emoție. Se uită la mine mirat. „Încotro?”. Îi spusei că am rătăcit drumul. Mă văzu elev. Se miră că am venit prin aceste părți, dar mă scoase la drumul cu cireși. Acasă, după ce mi-am revenit din spaimă, am început primele versuri din poezia Furtună. Mi-am adus aminte că aveam pe a doua zi niște versuri de tradus la limba latină și am lăsat poezia la o parte. După o altă furtună, în altă parte a Bistriței, am reluat-o și așa s-a născut acea poemă a spaimei încercate prin codrii Bacăului.
Dar aici a fost grozav. Părea că se lăsase cerul pe lume cu toate spaimele lui. Eram înfiorată. Mi-a spus poezia în timp ce eu urmăream curgerea apei învolburate cu clipocitul ei înfundat. Scoase un carnețel, notă ceva și câteva note pe două linii de portativ. Părea că se ferește, să nu-l văd. M-am și făcut că n-am observat nimic. Pe drum, la întoarcere, prin zăvoi, îmi fredonă un cântec. — L-am prins din clipocitul apei... acest cântec subțire și cam vag... nu-i așa?
Agatha Grigorescu-Bacovia, Bacovia. Poezie sau destin
*țapinar – muncitor care manevrează buștenii folosind o unealtă specifică, numită țapină
*pianissimo – foarte încet
*Versurile aparțin poeziei Toamnă de George Bacovia.
*Clasa a IV-a corespunde, în perioada antebelică, clasei a XII-a din prezent.`,
        cerinte: [
            'Cerințe totale: argumentează dacă experiențele de viață influențează sau nu procesul de creație, raportându-te la fragment și la experiența personală/culturală.',
            'Sumar conținut: opinie clară, două argumente dezvoltate, concluzie pertinentă.',
            'Sumar redactare: conectori corecți; norme ale limbii literare; respectă minimul de cuvinte.'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Perspectiva narativă – Ion Agârbiceanu',
        descriere: 'Prezintă, în minimum 50 de cuvinte, perspectiva narativă (Subiectul II).',
        numarSubiect: 2,
        profil: 'real',
        data: '2022',
        an: 2022,
        sesiune: 'sesiune de toamnă',
        tip: 'eseu',
        text: `Părintele crezu că a isprăvit cu bine tot și se simțea mulțumit; i se păru chiar că nimic nu se întâmplase în viața lui tihnită. Dar când ieși mai întâi pe uliță, i se păru ciudat că ochii trecătorilor se ațin după dânsul. Nicicând până acum oamenii nu se opriseră în drum să privească după el.
Teleguțenii* vedeau ceea ce el nu vedea: popa Man îmbătrânise tare. Părea că-i ceva frânt în el; umbla aplecat de spate, ca și când ar duce o povară grea. Când crezu că își poate începe viața lui obișnuită, popa Man simți o mare neîndemânare, o stângăcie ce-l umplu de teamă.
Nu cuteza însă să cerceteze de unde-i izvorăște acea neîndemânare. Ca într-o nețărmurită depărtare simțea răspunsul, deși nu cerceta.
Ion Agârbiceanu, Popa Man
*teleguțean – locuitor din Teleguța`,
        cerinte: [
            'Conținut: prezintă perspectiva narativă identificată în fragment (minimum 50 de cuvinte).',
            'Redactare: limbă literară; logică a ideilor; ortografie; punctuație.'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6',
            'Redactare: 4'
        ]
    },
    {
        titlu: 'Eseu despre un text poetic (Mihai Eminescu)',
        descriere: 'Redactează un eseu (minim 400 de cuvinte) privind particularitățile unui text poetic studiat, aparținând lui Mihai Eminescu.',
        numarSubiect: 3,
        profil: 'real',
        data: '2022',
        an: 2022,
        sesiune: 'sesiune de toamnă',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularităţi ale unui text poetic studiat, aparţinând lui Mihai Eminescu.
În elaborarea eseului, vei avea în vedere următoarele repere:
– evidenţierea a două trăsături care fac posibilă încadrarea textului poetic într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică;
– comentarea a două imagini/idei poetice relevante pentru tema textului poetic studiat;
– analiza a două elemente de compoziţie şi/sau de limbaj, semnificative pentru textul poetic ales (de exemplu: titlu, incipit, relații de opoziție și de simetrie, motive poetice, figuri semantice, elemente de prozodie etc.).`,
        cerinte: [
            'Evidențiază două trăsături de încadrare a textului poetic.',
            'Comentează două imagini/idei poetice relevante pentru temă.',
            'Analizează două elemente de compoziție și/sau de limbaj semnificative.'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'C. Rădulescu-Motru, Mărturisiri',
        descriere: 'Citește fragmentul și rezolvă cerințele (Subiectul I A).',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2022',
        an: 2022,
        sesiune: 'sesiune specială',
        tip: 'analiza',
        text: `Primele îndrumări, care probabil au hotărât în bună parte mersul carierei mele de profesor și publicist, le-am primit de la tatăl meu. Zic „probabil”, fiindcă despre propria viață cine face mărturisiri nu poate să nu amestece în ele și o mare doză de subiectivitate.
Tatăl m-a crescut foarte sever. Severitatea era în firea sa și era și în metoda educației de pe acea vreme. Acum șaptezeci de ani nu era la modă pedagogia indulgentă de astăzi. Copiii nu aveau dreptul să-și facă toate plăcerile. Mi-a fost interzisă astfel orice distracție prelungită și cu deosebire eram ferit de orice distracție care se putea preface în obicei. Un servitor al casei, [...] scripcar* în ceasurile lui libere, își pusese în cap să mă învețe și pe mine meșteșugul lui, dar tatăl meu, prinzând de veste, l-a certat strașnic și l-a mutat numaidecât cu serviciul. Aveam pe atunci trei ani și mi-aduc aminte bine de vorbele cu care l-a certat [...]: „Ce vrei, [...] să faci din copilul meu un pierde-vară?”.
Severitatea aceasta ceda în cazul când eram bolnav. Atunci era de acord și tatăl cu pedagogia indulgentă.
Prima clasă primară am făcut-o în școala satului meu natal, Butoiești, în județul Mehedinți, la vârsta de șase ani. Aveam ca învățător pe un bătrân, care știa citi și scrie potrivit, dar de socotit era rămas la cele patru operații aritmetice elementare. Când am terminat anul primei clase primare, știam mai mult decât învățătorul, dar nu fiindcă tatăl mă ajutase, ci prin munca proprie, făcută sub ochiul lui sever. Acest ochi sever m-a urmărit în tot cursul studiilor mele. N-a fost moment, chiar când mă găseam la studii universitare în străinătate, în care să nu-l simt îndreptat asupră-mi.
De la a doua clasă primară înainte, până la terminarea claselor secundare, am fost în școlile din Craiova, apoi patru ani în Universitatea din București; tot timpul de vacanță însă, și timpul de vacanță școlară la noi este destul de lung, eram din nou la țară, la Butoiești, în tovărășia tatălui meu. Până la vârsta de douăzeci și unu de ani, am fost astfel sub continua lui supraveghere. Independența totală de sub influența tatălui a început la mine după această vârstă, deodată cu plecarea în străinătate pentru continuarea de studii.
Îndrumările tatălui pe timpul vacanțelor școlare nu-mi erau date sub formă didactică. Nu eram nici examinat, nici obligat să ascult lecții în toată regula. Dacă ar fi procedat așa, desigur că influența lui asupra mea ar fi fost foarte scăzută. Eram prea sătul eu de lecțiile auzite în timpul școlii; apoi și cunoștințele lui științifice se mărgineau la acelea primite în șase clase secundare urmate la Liceul „Râureanu” din București și acestea încă nu în mod regulat. Procedarea tatălui consta în folosirea oricărei ocazii pentru a-mi atrage atenția și a-mi da explicațiile sale asupra faptelor care întâmplător ieșeau înaintea noastră și care prezentau pentru dânsul un interes.
C. Rădulescu-Motru, Mărturisiri
*scripcar – (reg.) lăutar care cântă la vioară`,
        cerinte: [
            'Indică sensul din text al secvenței prinzând de veste.',
            'Menționează localitatea în care s-a născut C. Rădulescu-Motru, utilizând informațiile din text.',
            'Precizează situația în care tatăl autorului devine mai indulgent, justificând cu o secvență semnificativă din text.',
            'Explică motivul pentru care tatăl schimbă locul de muncă al unuia dintre servitorii casei.',
            'Prezintă, în 30–50 de cuvinte, modul în care tatăl continuă, în timpul vacanțelor școlare, procesul de instruire a fiului, așa cum reiese din ultimul paragraf.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Severitatea în educație – argumentare',
        descriere: 'Redactează un text (minim 150 cuvinte) despre dacă severitatea este eficientă în educarea copiilor (Subiectul I B).',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2022',
        an: 2022,
        sesiune: 'sesiune specială',
        tip: 'redactare',
        text: `Primele îndrumări, care probabil au hotărât în bună parte mersul carierei mele de profesor și publicist, le-am primit de la tatăl meu. Zic „probabil”, fiindcă despre propria viață cine face mărturisiri nu poate să nu amestece în ele și o mare doză de subiectivitate.
Tatăl m-a crescut foarte sever. Severitatea era în firea sa și era și în metoda educației de pe acea vreme. Acum șaptezeci de ani nu era la modă pedagogia indulgentă de astăzi. Copiii nu aveau dreptul să-și facă toate plăcerile. Mi-a fost interzisă astfel orice distracție prelungită și cu deosebire eram ferit de orice distracție care se putea preface în obicei. Un servitor al casei, [...] scripcar* în ceasurile lui libere, își pusese în cap să mă învețe și pe mine meșteșugul lui, dar tatăl meu, prinzând de veste, l-a certat strașnic și l-a mutat numaidecât cu serviciul. Aveam pe atunci trei ani și mi-aduc aminte bine de vorbele cu care l-a certat [...]: „Ce vrei, [...] să faci din copilul meu un pierde-vară?”.
Severitatea aceasta ceda în cazul când eram bolnav. Atunci era de acord și tatăl cu pedagogia indulgentă.
Prima clasă primară am făcut-o în școala satului meu natal, Butoiești, în județul Mehedinți, la vârsta de șase ani. Aveam ca învățător pe un bătrân, care știa citi și scrie potrivit, dar de socotit era rămas la cele patru operații aritmetice elementare. Când am terminat anul primei clase primare, știam mai mult decât învățătorul, dar nu fiindcă tatăl mă ajutase, ci prin munca proprie, făcută sub ochiul lui sever. Acest ochi sever m-a urmărit în tot cursul studiilor mele. N-a fost moment, chiar când mă găseam la studii universitare în străinătate, în care să nu-l simt îndreptat asupră-mi.
De la a doua clasă primară înainte, până la terminarea claselor secundare, am fost în școlile din Craiova, apoi patru ani în Universitatea din București; tot timpul de vacanță însă, și timpul de vacanță școlară la noi este destul de lung, eram din nou la țară, la Butoiești, în tovărășia tatălui meu. Până la vârsta de douăzeci și unu de ani, am fost astfel sub continua lui supraveghere. Independența totală de sub influența tatălui a început la mine după această vârstă, deodată cu plecarea în străinătate pentru continuarea de studii.
Îndrumările tatălui pe timpul vacanțelor școlare nu-mi erau date sub formă didactică. Nu eram nici examinat, nici obligat să ascult lecții în toată regula. Dacă ar fi procedat așa, desigur că influența lui asupra mea ar fi fost foarte scăzută. Eram prea sătul eu de lecțiile auzite în timpul școlii; apoi și cunoștințele lui științifice se mărgineau la acelea primite în șase clase secundare urmate la Liceul „Râureanu” din București și acestea încă nu în mod regulat. Procedarea tatălui consta în folosirea oricărei ocazii pentru a-mi atrage atenția și a-mi da explicațiile sale asupra faptelor care întâmplător ieșeau înaintea noastră și care prezentau pentru dânsul un interes.
C. Rădulescu-Motru, Mărturisiri
*scripcar – (reg.) lăutar care cântă la vioară`,
        cerinte: [
            'Cerințe totale: argumentează dacă severitatea este sau nu eficientă în educarea copiilor, raportându-te la fragment și la experiența personală/culturală.',
            'Sumar conținut: opinie clară, două argumente dezvoltate, concluzie pertinentă.',
            'Sumar redactare: conectori corecți; norme ale limbii literare; respectă minimul de cuvinte.'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Comentariu pe text – Grigore Alexandrescu',
        descriere: 'Comentează relația idee poetică – mijloace artistice (Subiectul II).',
        numarSubiect: 2,
        profil: 'real',
        data: '2022',
        an: 2022,
        sesiune: 'sesiune specială',
        tip: 'poezie',
        text: `Încă o zi cu tine, o zi de fericire,
În dulcele extazuri ce simț când te privesc:
Încă un ceas... un zâmbet... Adânca mea iubire
Izvoarele nădejdei mai mult nu o hrănesc.

Și soarele mai palid din zi în zi îmi pare,
Și coardele vieței în pieptu-mi obosit
Se rup! Nici tinerețea, nici scumpa-ți sărutare,
Nu pot ele să schimbe ce soarta a voit.

Întorc acum asupră-ți privirea-mi dureroasă,
Ca cel din urmă-adio la tot ce am pierdut:
Din ceața veșniciei, stea blândă, luminoasă,
Te văd lucind departe, departe în trecut.

[...]

Grigore Alexandrescu, Încă o zi (fragment)`,
        cerinte: [
            'Conținut: comentează relația idee poetică – mijloace artistice (minimum 50 de cuvinte).',
            'Redactare: limbă literară; logică a ideilor; ortografie; punctuație.'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6',
            'Redactare: 4'
        ]
    },
    {
        titlu: 'Eseu despre un text narativ (Camil Petrescu sau G. Călinescu)',
        descriere: 'Redactează un eseu (minim 400 de cuvinte) privind particularitățile unui text narativ studiat.',
        numarSubiect: 3,
        profil: 'real',
        data: '2022',
        an: 2022,
        sesiune: 'sesiune specială',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități ale unui text narativ studiat, aparținând lui Camil Petrescu sau lui G. Călinescu.
În elaborarea eseului, vei avea în vedere următoarele repere:
– evidențierea a două trăsături care fac posibilă încadrarea textului narativ studiat într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică;
– comentarea a două episoade/secvențe relevante pentru tema textului narativ studiat;
– analiza a două elemente de structură, de compoziție și/sau de limbaj, semnificative pentru textul narativ studiat (de exemplu: acțiune, conflict, relații temporale și spațiale, incipit, final, tehnici narative, instanțe ale comunicării narative, perspectivă narativă, registre stilistice, limbaj etc.).`,
        cerinte: [
            'Evidențiază două trăsături de încadrare a textului narativ studiat.',
            'Comentează două episoade/secvențe relevante pentru tema textului.',
            'Analizează două elemente de structură/compoziție/limbaj semnificative.'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'Profira Sadoveanu, Destăinuiri',
        descriere: 'Citește fragmentul și rezolvă cerințele (Subiectul I A).',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2022',
        an: 2022,
        sesiune: 'simulare',
        tip: 'analiza',
        text: `N-aveam mai mult de 7 – 8 ani când a venit pentru întâia oară la noi, la Fălticeni, dar eu îl cunoșteam din auzite, din câte se spuneau în casă despre cei de la Viața Românească: de Garabet Ibrăileanu, care dormea ziua și noaptea sta treaz ca huhurezul, de Constantin Stere, ce se dovedea un strașnic om politic de temut, dar care în familie era bun ca pânea cea caldă, de D. D. Pătrășcanu și […] de Topîrceanu – ieșean de adopțiune, care purta tocuri înalte și pălărie cu fund mare ca să pară mai înalt și care se dovedea cel mai de seamă ajutor al lui Ibrăileanu, la redacție.
Subțirel și sprinten, părea un licean pe lângă tata, deși nu erau mai mult de șase ani între ei. Nu era frumos, un brunet cu față palidă; dar fruntea-i nobilă, deși nu prea înaltă, înflorea adeseori de câte-un cârlionț rebel scăpat din părul des și negru, pe care îl punea imediat cu malițiozitate la punct c-un pieptănuș scos din buzunărașul de la piept, unde își avea și vestitul puf de pudră cu care își potolea, la nevoie, luciul nasului. Gura, tăiată cu precizie și generozitate, arăta hotărâre, ascuțime și finețe.
Pe câtă vreme ochii, ochii negri de-o vioiciune fără astâmpăr, veșnic parcă la vânătoare, vedeau și observau totul și parcă te pătrundeau până în cele mai tainice ascunzișuri. Nu puteai scăpa de ei. Te citeau ca pe-o carte. Și parcă pentru a se scuza de indiscreție, ochiul stâng flutura rapid din pleoapă, cu vicleană delicateță.
— Ce-i, Miss? mi-a spus el, pe când abia ne cunoscusem, la un Paște [...] (mă poreclise Miss pentru că aveam părul ca mătasea de păpușoi, ochi albaștri-verzii, tenul roz și un nas puțintel cam lung). Ce-i, Miss? Ți-e frică de mine? Vino mai aproape, că doar n-am să te mănânc! N-aș putea spune că-mi era teamă, dar mă sfiam: sub privirea lui mă simțeam transparentă.
Și doar se amesteca în jocurile noastre: bătea mingea, se lua la întrecere din fugă, juca diabolo, popice și cred că, dacă nu s-ar fi temut că-și strică ținuta cochetă și impecabilă, s-ar fi cățărat și-n copaci, cum făceam noi. Iar mai târziu, la Iași, după 1918, pe când împlinisem doar treisprezece ani, cine m-a învățat să dansez? Nu el? La un Sf. Mihai? Căci făcea parte din puținii intimi ai tatălui meu care veneau de Arminden*, de Anul Nou și de Sf. Mihai la petrecerile, uneori cu lăutari, care aveau loc în dealul Copoului.
Tata îl iubea și-l prețuia pentru inteligența, talentul și discreția lui, căci era de-o discreție nemaipomenită, atât în ceea ce-i privea pe ceilalți, cât și-n ceea ce-l privea pe dânsul. Nu vorbea niciodată despre sine. Nimeni nu știa de unde vine, unde copilărise. Se auzea c-ar fi însurat. C-ar fi având un băiat. Dar nimeni nu-l văzuse. Trăia singur, într-o cămăruță mobilată. Lua masa în centru, la „Azuga”; o masă frugală, căci era cu sănătatea cam delicată și, în același timp, plin de cumpătare; după care masă, de multe ori urca în dealul Copoului și ne trezeam cu el, destul de devreme, că intra pe poartă. Îl anunțau câinii, care alergau cu toții lătrând.
— Vine dl Topîrceanu!... Noi cu toții, copiii, mai mari sau mai mici, îi alergam întru întâmpinare.
— Întâi cel mare!... spunea mosafirul, urcând treptele terasei dinspre grădină, cu pasu-i ușor legănat. Pentru noi, venirea lui era întotdeauna o sărbătoare; mai ales pentru cei mai mari, care, în afară de tragerea la țintă, popicele, croquetul, bumerangul și de alte multe jocuri inventate de el, prețuiam într-însul poetul și omul de spirit, veșnic prezenți în ființa lui ca o coardă-ntinsă.
Profira Sadoveanu, Destăinuiri
*Arminden – nume popular al zilei de 1 Mai`,
        cerinte: [
            'Indică sensul din text al secvenței de multe ori.',
            'Menționează două trăsături fizice ale Profirei Sadoveanu, utilizând informațiile din text.',
            'Precizează orașul în care locuia George Topîrceanu în momentul colaborării la revista coordonată de Garabet Ibrăileanu, justificând cu o secvență semnificativă din text.',
            'Explică motivul pentru care, în copilărie, autoarea se sfiește de Topîrceanu.',
            'Prezintă, în 30–50 de cuvinte, relația dintre Topîrceanu și copiii familiei Sadoveanu, așa cum reiese din text.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Discreția în viața privată – argumentare',
        descriere: 'Redactează un text (minim 150 cuvinte) despre importanța discreției în viața privată (Subiectul I B).',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2022',
        an: 2022,
        sesiune: 'simulare',
        tip: 'redactare',
        text: `N-aveam mai mult de 7 – 8 ani când a venit pentru întâia oară la noi, la Fălticeni, dar eu îl cunoșteam din auzite, din câte se spuneau în casă despre cei de la Viața Românească: de Garabet Ibrăileanu, care dormea ziua și noaptea sta treaz ca huhurezul, de Constantin Stere, ce se dovedea un strașnic om politic de temut, dar care în familie era bun ca pânea cea caldă, de D. D. Pătrășcanu și […] de Topîrceanu – ieșean de adopțiune, care purta tocuri înalte și pălărie cu fund mare ca să pară mai înalt și care se dovedea cel mai de seamă ajutor al lui Ibrăileanu, la redacție.
Subțirel și sprinten, părea un licean pe lângă tata, deși nu erau mai mult de șase ani între ei. Nu era frumos, un brunet cu față palidă; dar fruntea-i nobilă, deși nu prea înaltă, înflorea adeseori de câte-un cârlionț rebel scăpat din părul des și negru, pe care îl punea imediat cu malițiozitate la punct c-un pieptănuș scos din buzunărașul de la piept, unde își avea și vestitul puf de pudră cu care își potolea, la nevoie, luciul nasului. Gura, tăiată cu precizie și generozitate, arăta hotărâre, ascuțime și finețe.
Pe câtă vreme ochii, ochii negri de-o vioiciune fără astâmpăr, veșnic parcă la vânătoare, vedeau și observau totul și parcă te pătrundeau până în cele mai tainice ascunzișuri. Nu puteai scăpa de ei. Te citeau ca pe-o carte. Și parcă pentru a se scuza de indiscreție, ochiul stâng flutura rapid din pleoapă, cu vicleană delicateță.
— Ce-i, Miss? mi-a spus el, pe când abia ne cunoscusem, la un Paște [...] (mă poreclise Miss pentru că aveam părul ca mătasea de păpușoi, ochi albaștri-verzii, tenul roz și un nas puțintel cam lung). Ce-i, Miss? Ți-e frică de mine? Vino mai aproape, că doar n-am să te mănânc! N-aș putea spune că-mi era teamă, dar mă sfiam: sub privirea lui mă simțeam transparentă.
Și doar se amesteca în jocurile noastre: bătea mingea, se lua la întrecere din fugă, juca diabolo, popice și cred că, dacă nu s-ar fi temut că-și strică ținuta cochetă și impecabilă, s-ar fi cățărat și-n copaci, cum făceam noi. Iar mai târziu, la Iași, după 1918, pe când împlinisem doar treisprezece ani, cine m-a învățat să dansez? Nu el? La un Sf. Mihai? Căci făcea parte din puținii intimi ai tatălui meu care veneau de Arminden*, de Anul Nou și de Sf. Mihai la petrecerile, uneori cu lăutari, care aveau loc în dealul Copoului.
Tata îl iubea și-l prețuia pentru inteligența, talentul și discreția lui, căci era de-o discreție nemaipomenită, atât în ceea ce-i privea pe ceilalți, cât și-n ceea ce-l privea pe dânsul. Nu vorbea niciodată despre sine. Nimeni nu știa de unde vine, unde copilărise. Se auzea c-ar fi însurat. C-ar fi având un băiat. Dar nimeni nu-l văzuse. Trăia singur, într-o cămăruță mobilată. Lua masa în centru, la „Azuga”; o masă frugală, căci era cu sănătatea cam delicată și, în același timp, plin de cumpătare; după care masă, de multe ori urca în dealul Copoului și ne trezeam cu el, destul de devreme, că intra pe poartă. Îl anunțau câinii, care alergau cu toții lătrând.
— Vine dl Topîrceanu!... Noi cu toții, copiii, mai mari sau mai mici, îi alergam întru întâmpinare.
— Întâi cel mare!... spunea mosafirul, urcând treptele terasei dinspre grădină, cu pasu-i ușor legănat. Pentru noi, venirea lui era întotdeauna o sărbătoare; mai ales pentru cei mai mari, care, în afară de tragerea la țintă, popicele, croquetul, bumerangul și de alte multe jocuri inventate de el, prețuiam într-însul poetul și omul de spirit, veșnic prezenți în ființa lui ca o coardă-ntinsă.
Profira Sadoveanu, Destăinuiri
*Arminden – nume popular al zilei de 1 Mai`,
        cerinte: [
            'Cerințe totale: argumentează dacă păstrarea discreției în legătură cu viața privată este importantă sau nu, raportându-te la fragment și la experiența personală/culturală.',
            'Sumar conținut: opinie clară, două argumente dezvoltate, concluzie pertinentă.',
            'Sumar redactare: conectori corecți; norme ale limbii literare; respectă minimul de cuvinte.'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Rolul notațiilor autorului – G. M. Zamfirescu',
        descriere: 'Prezintă rolul notațiilor autorului (Subiectul II).',
        numarSubiect: 2,
        profil: 'real',
        data: '2022',
        an: 2022,
        sesiune: 'simulare',
        tip: 'eseu',
        text: `TABLOUL IV
S-a înserat, ca în orice zi de iarnă, devreme. Felinarul a fost aprins afară. În casă e o atmosferă plăcută, în care cuvântul pare mai armonios și mai plin de înțeles. Se poate întinde, mai ușor, o punte de la o inimă la alta.

SCENA I
MIOARA, STĂVĂROAIA

Mătușa și nepoata au băut cafele. Stau acum la masă, față în față, și caută în cești semnele norocului și ale nefericirii. Stăvăroaia, care a dormit după prânz, e binedispusă și pare mai tânără, dacă nu mai frumoasă. Mioara, dimpotrivă, e tristă și caută să-și ascundă ochii plânși. A rămas cu ceașca în mână și privirile în gol, în timp ce mătușa – cu o figură surâzătoare și comod instalată în fotoliu – îngână o frântură de romanță demodată.
STĂVĂROAIA (râde îngânat, cu o jenă prefăcută): Ba nu zău, inimioară, că e nebună ceașca asta!
George Mihail-Zamfirescu, Idolul și Ion Anapoda`,
        cerinte: [
            'Conținut: prezintă rolul notațiilor autorului în fragment (minimum 50 de cuvinte).',
            'Redactare: limbă literară; logică a ideilor; ortografie; punctuație.'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6',
            'Redactare: 4'
        ]
    },
    {
        titlu: 'Eseu despre un text poetic (Tudor Arghezi)',
        descriere: 'Redactează un eseu (minim 400 de cuvinte) privind particularitățile unui text poetic studiat, aparținând lui Tudor Arghezi.',
        numarSubiect: 3,
        profil: 'real',
        data: '2022',
        an: 2022,
        sesiune: 'simulare',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularităţi ale unui text poetic studiat, aparţinând lui Tudor Arghezi.
În elaborarea eseului, vei avea în vedere următoarele repere:
– evidenţierea a două trăsături care fac posibilă încadrarea textului poetic într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică;
– comentarea a două imagini/idei poetice relevante pentru tema textului poetic studiat;
– analiza a două elemente de compoziţie şi/sau de limbaj, semnificative pentru textul poetic ales (de exemplu: titlu, incipit, relații de opoziție și de simetrie, motive poetice, figuri semantice, elemente de prozodie etc.).`,
        cerinte: [
            'Evidențiază două trăsături de încadrare a textului poetic.',
            'Comentează două imagini/idei poetice relevante pentru temă.',
            'Analizează două elemente de compoziție și/sau de limbaj semnificative.'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'Mircea Eliade, Memorii',
        descriere: 'Citește fragmentul și rezolvă cerințele (Subiectul I A).',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2022',
        an: 2022,
        sesiune: 'model',
        tip: 'analiza',
        text: `În anul acela am avut un alt profesor de română, pe Mazilu. Ne-a plăcut de la început tuturor pentru că era mucalit*, îi plăcea să citească tare compozițiile noastre, comentându-le cu mult haz și ne vorbea neîncetat de literatură, ne îndemna să citim pe Odobescu, pe Slavici, pe Hogaș, „ca să ne îmbogățim mintea și vocabularul”, cum obișnuia să ne spună.
În martie ne-a dat acest subiect pentru compoziția de scris acasă: Cum am simțit că se face primăvară? De data aceasta, n-am mai amânat compoziția până în ultimul moment. Am început să scriu la începutul după-amiezii și n-am încheiat-o decât când m-a strigat mama de jos, din capul scării, să vin la masă. Vreo 20 de pagini de caiet, pe care le-am scris cu o stranie, necunoscută bucurie; parcă m-aș fi trezit deodată într-una din lumile cărților pe care le citisem, singurele lumi reale și cu sens pentru mine; parcă aș fi scris și eu ca unii din autorii aceștia adevărați – cei pe care nu-i învățam încă la școală – și aș fi scris ca să fiu citit de unul ca mine, iar nu de un profesor, pentru notă.
Mazilu avea obiceiul să ne privească zâmbind, în ochi, încercând parcă să ghicească autorul textului celui mai pitoresc, textul care i-ar fi dat lui prilejul să ne corecteze făcând o sumă de glume, cutremurând întreaga clasă într-o cascadă de hohote. Alegea câteva caiete, apoi se întorcea la catedră și începea să citească. Nu înțeleg cum am știut că, de data aceasta, va alege și caietul meu. Îl priveam cu un zâmbet complice și probabil că gestul acesta cutezător mă făcuse să roșesc pentru că, după ce a șovăit o clipă în dreptul băncii de alături, Mazilu s-a întors și mi-a cerut caietul. [...]
După prima pagină, Mazilu a ridicat ochii din caiet și m-a întrebat: „De unde ai copiat-o?” și, pentru că mă pregăteam să protestez, a adăugat: „Vreau să spun, de unde te-ai inspirat? Din ce carte?”. M-am îmbujorat și am ridicat neputincios din umeri. Mazilu a ghicit încurcătura mea și a reluat lectura cu un zâmbet misterios. La răstimpuri, ca să nu lase impresia că e vorba de o capodoperă, sublinia un adjectiv prea strident sau se întrerupea ca să-mi explice că făcusem o inadvertență.
Dar, când a terminat de citit, m-a privit în ochi și mi-a spus: „Bravo! Sunt nevoit să-ți dau nota zece!...” A fost prima mea victorie: recunoașterea, în fața întregii clase, că nu mai eram corigentul la limba română de anul trecut. Probabil că Mazilu fusese atât de surprins de povestirea mea, încât a vorbit în cancelarie, căci, la sfârșitul recreației, Moisescu a venit la mine și mi-a cerut caietul. Voia să citească și el aventurile mele onirice*, cu Crivăț-Împărat și toți cei care mai erau și pe care i-am uitat de mult.
Un adevărat triumf pe care, odată ajuns acasă, l-am relatat cu amănunte, deși nu știu dacă am reușit să înduplec rezerva și scepticismul părinților. (Tata mi-a spus că se va lăsa convins numai după ce va vedea nota zece trecută în carnet, adică la sfârșitul trimestrului.) Dar, pentru mine, experiența aceasta a avut urmări mult mai adânci. Descoperisem că, dacă sunt „inspirat”, pot scrie cu aceeași ușurință – deși nu cu aceeași viteză – cu care, câțiva ani înainte, urmăream pe ecranul meu interior aventurile armatei secrete. De mai multe ori până atunci încercasem să scriu, dar, după câteva pagini, mă simțeam deodată fără chef, reciteam consternat, umilit, ultimele rânduri și rupeam cu furie foile din caiet, le mototoleam, le azvârleam în foc. Acum mi se părea că aflasem secretul: nu puteam scrie bine decât dacă eram „inspirat”.
Mircea Eliade, Memorii
*mucalit – care știe să stârnească râsul, păstrând un aer serios; poznaș
*oniric – privitor la vise, care aparține visului`,
        cerinte: [
            'Indică sensul din text al secvenței cu amănunte.',
            'Menționează două modalități prin care profesorul Mazilu se face plăcut elevilor, utilizând informațiile din text.',
            'Precizează reacția pe care le-o provoacă părinților relatarea lui Mircea Eliade, justificând cu o secvență semnificativă din text.',
            'Explică un motiv pentru care elevul Mircea Eliade simte bucurie în timpul redactării temei.',
            'Prezintă, în 30–50 de cuvinte, atitudinea profesorului Mazilu după ce citește compunerea lui Mircea Eliade, așa cum reiese din text.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Inspirația și lectura – argumentare',
        descriere: 'Redactează un text (minim 150 cuvinte) despre dacă inspirația este stimulată de lectură (Subiectul I B).',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2022',
        an: 2022,
        sesiune: 'model',
        tip: 'redactare',
        text: `În anul acela am avut un alt profesor de română, pe Mazilu. Ne-a plăcut de la început tuturor pentru că era mucalit*, îi plăcea să citească tare compozițiile noastre, comentându-le cu mult haz și ne vorbea neîncetat de literatură, ne îndemna să citim pe Odobescu, pe Slavici, pe Hogaș, „ca să ne îmbogățim mintea și vocabularul”, cum obișnuia să ne spună.
În martie ne-a dat acest subiect pentru compoziția de scris acasă: Cum am simțit că se face primăvară? De data aceasta, n-am mai amânat compoziția până în ultimul moment. Am început să scriu la începutul după-amiezii și n-am încheiat-o decât când m-a strigat mama de jos, din capul scării, să vin la masă. Vreo 20 de pagini de caiet, pe care le-am scris cu o stranie, necunoscută bucurie; parcă m-aș fi trezit deodată într-una din lumile cărților pe care le citisem, singurele lumi reale și cu sens pentru mine; parcă aș fi scris și eu ca unii din autorii aceștia adevărați – cei pe care nu-i învățam încă la școală – și aș fi scris ca să fiu citit de unul ca mine, iar nu de un profesor, pentru notă.
Mazilu avea obiceiul să ne privească zâmbind, în ochi, încercând parcă să ghicească autorul textului celui mai pitoresc, textul care i-ar fi dat lui prilejul să ne corecteze făcând o sumă de glume, cutremurând întreaga clasă într-o cascadă de hohote. Alegea câteva caiete, apoi se întorcea la catedră și începea să citească. Nu înțeleg cum am știut că, de data aceasta, va alege și caietul meu. Îl priveam cu un zâmbet complice și probabil că gestul acesta cutezător mă făcuse să roșesc pentru că, după ce a șovăit o clipă în dreptul băncii de alături, Mazilu s-a întors și mi-a cerut caietul. [...]
După prima pagină, Mazilu a ridicat ochii din caiet și m-a întrebat: „De unde ai copiat-o?” și, pentru că mă pregăteam să protestez, a adăugat: „Vreau să spun, de unde te-ai inspirat? Din ce carte?”. M-am îmbujorat și am ridicat neputincios din umeri. Mazilu a ghicit încurcătura mea și a reluat lectura cu un zâmbet misterios. La răstimpuri, ca să nu lase impresia că e vorba de o capodoperă, sublinia un adjectiv prea strident sau se întrerupea ca să-mi explice că făcusem o inadvertență.
Dar, când a terminat de citit, m-a privit în ochi și mi-a spus: „Bravo! Sunt nevoit să-ți dau nota zece!...” A fost prima mea victorie: recunoașterea, în fața întregii clase, că nu mai eram corigentul la limba română de anul trecut. Probabil că Mazilu fusese atât de surprins de povestirea mea, încât a vorbit în cancelarie, căci, la sfârșitul recreației, Moisescu a venit la mine și mi-a cerut caietul. Voia să citească și el aventurile mele onirice*, cu Crivăț-Împărat și toți cei care mai erau și pe care i-am uitat de mult.
Un adevărat triumf pe care, odată ajuns acasă, l-am relatat cu amănunte, deși nu știu dacă am reușit să înduplec rezerva și scepticismul părinților. (Tata mi-a spus că se va lăsa convins numai după ce va vedea nota zece trecută în carnet, adică la sfârșitul trimestrului.) Dar, pentru mine, experiența aceasta a avut urmări mult mai adânci. Descoperisem că, dacă sunt „inspirat”, pot scrie cu aceeași ușurință – deși nu cu aceeași viteză – cu care, câțiva ani înainte, urmăream pe ecranul meu interior aventurile armatei secrete. De mai multe ori până atunci încercasem să scriu, dar, după câteva pagini, mă simțeam deodată fără chef, reciteam consternat, umilit, ultimele rânduri și rupeam cu furie foile din caiet, le mototoleam, le azvârleam în foc. Acum mi se părea că aflasem secretul: nu puteam scrie bine decât dacă eram „inspirat”.
Mircea Eliade, Memorii
*mucalit – care știe să stârnească râsul, păstrând un aer serios; poznaș
*oniric – privitor la vise, care aparține visului`,
        cerinte: [
            'Cerințe totale: argumentează dacă inspirația este sau nu stimulată de lectură, raportându-te la fragment și la experiența personală/culturală.',
            'Sumar conținut: opinie clară, două argumente dezvoltate, concluzie pertinentă.',
            'Sumar redactare: conectori corecți; norme ale limbii literare; respectă minimul de cuvinte.'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Caracterizarea personajului – Liviu Rebreanu',
        descriere: 'Prezintă două modalități de caracterizare a personajului (Subiectul II).',
        numarSubiect: 2,
        profil: 'real',
        data: '2022',
        an: 2022,
        sesiune: 'model',
        tip: 'eseu',
        text: `Rosmarin surâdea, în vreme ce Liana striga vesel:
 — Sunt frumoasă, Tincuțo?
Bătu din palme și se răsuci cu pași de dans împrejurul camerei, parcă ar fi auzit o mare noutate. Apoi, după ce Tinca ieși cu haina și blana, se așeză la masă, începând să examineze cu amănuntul cumpărăturile, explicând fiece lucru în vederea zilei de mâine.
Era obișnuită să primească complimente și totuși îi făceau plăcere ori de la cine veneau. Pe stradă bărbații întorceau capul după ea ca și când ar fi răspândit o vrajă irezistibilă. Figura ei de fetiță mirată și nevinovată, cu părul blond natural, cu obrajii puțin bucălați, cu nasul mic obraznic, nu o prea distingeau din mulțimea de femei drăgălașe care dau străzilor bucureștene, altfel puțin remarcabile, un aspect atât de simpatic.
Ochii ei însă fascinau prin culoarea lor albastră închisă cu reflexe violete, adumbriți de lungile gene blonde ca într-un cuib de aur. În privirile lor scăpăra curiozitatea inteligentă, un etern semn de întrebare și, mai ales în momentele de uitare de sine, o pâlpâire stranie, o melancolie tulburătoare ca un avertisment ascuns.
Liviu Rebreanu, Jar`,
        cerinte: [
            'Conținut: prezintă două modalități de caracterizare a personajului identificate în fragment (minimum 50 de cuvinte).',
            'Redactare: limbă literară; logică a ideilor; ortografie; punctuație.'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6',
            'Redactare: 4'
        ]
    },
    {
        titlu: 'Eseu despre un text poetic (Mihai Eminescu)',
        descriere: 'Redactează un eseu (minim 400 de cuvinte) privind particularitățile unui text poetic studiat, aparținând lui Mihai Eminescu.',
        numarSubiect: 3,
        profil: 'real',
        data: '2022',
        an: 2022,
        sesiune: 'model',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularităţi ale unui text poetic studiat, aparţinând lui Mihai Eminescu.
În elaborarea eseului, vei avea în vedere următoarele repere:
– evidenţierea a două trăsături care fac posibilă încadrarea textului poetic într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică;
– comentarea a două imagini/idei poetice relevante pentru tema textului poetic studiat;
– analiza a două elemente de compoziţie şi/sau de limbaj, semnificative pentru textul poetic ales (de exemplu: titlu, incipit, relații de opoziție și de simetrie, motive poetice, figuri semantice, elemente de prozodie etc.).`,
        cerinte: [
            'Evidențiază două trăsături de încadrare a textului poetic.',
            'Comentează două imagini/idei poetice relevante pentru temă.',
            'Analizează două elemente de compoziție și/sau de limbaj semnificative.'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'Șerban Cioculescu, Viața lui I. L. Caragiale',
        descriere: 'Citește fragmentul și rezolvă cerințele (Subiectul I A).',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2021',
        an: 2021,
        sesiune: 'sesiune de vară',
        tip: 'analiza',
        text: `Copilăria și adolescența lui Caragiale se caracterizează prin zburdălnicie, independență [...]. Luca și Ecaterina au avut de luptat cu temperamentul rebel, greu de stăpânit al lui Iancu*. Ei au adoptat, în împrejurare, cea mai bună metodă, a îngăduinții relative, care dă rezultate mai bune decât constrângerea. [...]
Dacă este adevărat că a absolvit și clasa a V-a secundară, probabil în capitală, lucrul arată că școlarul, chiar dacă se lăsa greu, nu era o fire cu totul neînfrânată. La moartea tatălui, însă, Iancu [...] începe a-și impune voința în fața văduvei. Strămutarea familiei la București este a doua biruință a tânărului voluntar*, înlesnită probabil de sfaturile rudelor bucureștene.
Din acest moment, un fiu rău s-ar fi emancipat cu totul de obligațiile familiale, părăsindu-și mama și sora. Iancu s-a arătat vrednic de îndatoririle unui pretimpuriu șef de familie. De la vârsta generoasă a celor 18 ani, s-a purtat bărbătește, căutând să-și găsească mijloacele de întreținere pentru dânsul și ai lui. Ca sufleur de al doilea și copist în trupa lui Pascaly, concesionară* a Teatrului Național din București, suficient retribuit, a putut face față nevoilor. Pentru Caragiale, datoria, credem noi, nu era atât un comandament etic, cât elanul afectiv al inimii. Iancu se simțea legat de ai lui organic, fără să-și bată capul cu principiile morale.
La 20 de ani, cum îi încredințează mai târziu lui Vlahuță, este sănătos și robust și duce bine la tăvăleală*, în feluritele îndeletniciri, muncind și alergând toată ziua și sfârșind cu lucrul de noapte al corectorului. Nu s-au păstrat scrisori de familie din vremea când Caragiale locuia, desigur, împreună cu Ecaterina și Lenci*. Numai când nevoile profesionale l-au despărțit de ele, le-a dat prilejul să-i scrie. Scrisorile datează din anii revizoratului său (1881 și următorii).
Sunt mărturii impresionante, prin confirmarea calităților filiale. Femeile nu aveau alt sprijin decât în Iancu. Mai toate scrisorile rostesc mulțumiri calde pentru ajutoarele bănești, trimise neprecupețit. Din leafa modestă de revizor școlar, Caragiale găsește mijlocul să asigure mamei și surorii o viață așezată, chiria și întreținerea unei slujnice. […]
Mai în termen, mai cu întârziere, Iancu trimite cât i se cere. Niciuna din solicitările bănești nu rămâne nesatisfăcută. Ecaterina mulțumește în cuvinte mișcătoare: „Îți mulțumesc, dragă, de parale, că nu mă uiți niciodată, nici pe tine, dragu’ mamii, să nu te uite Dumnezeu și tot binele din lume”. Sau: „Îți mulțumesc, scumpu’ meu fiu, de toate, să trăiești, să-ți dea Dumnezeu toate fericirile”. Altă dată se minunează de activitatea rodnică a fiului ei: „Iancule dragă, scump și neprețuitu-meu fiu, te sărut dulce, dulce! Am priimit cu multă veselie epistola ta, împreună cu 70 lei noi. Domnul să-ți sporească în toată vremea, dragul meu copil! Dar activ ai fost, domnule, nu glumă, ce să zici, fă-mă, mamă, să-ți semăn.” Scrisoarea se încheie cu recomandările din care se vede că afecțiunea mamelor nu ține seamă de vârsta copiilor: „Iancule dragă, păzești-te de timpul ăsta, nu scoate flanela de pe tine că te-nșală vântul de primăvară”.
Șerban Cioculescu, Viața lui I. L. Caragiale
*Iancu – apelativ pentru I. L. Caragiale
*voluntar – care acționează din proprie inițiativă
*concesionar – care are dreptul de a utiliza anumite bunuri ale statului
*a (o) duce (sau ține) la tăvăleală – a fi rezistent la eforturi fizice
*Lenci – fiica Ecaterinei și a lui Luca, sora lui I. L. Caragiale`,
        cerinte: [
            'Indică sensul din text al secvenței în toată vremea.',
            'Menționează două dintre îndeletnicirile care îi asigură venituri tânărului I. L. Caragiale, utilizând informațiile din text.',
            'Precizează principiul pe care părinții îl aplică în educarea lui Iancu, justificând cu o secvență semnificativă din text.',
            'Explică motivul pentru care I. L. Caragiale ajunge să comunice prin scrisori cu mama și cu sora sa.',
            'Prezintă, în 30–50 de cuvinte, o trăsătură morală a lui I. L. Caragiale, așa cum reiese din text.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Responsabilități familiale – argumentare',
        descriere: 'Redactează un text (minim 150 cuvinte) despre responsabilitățile față de familie în condiții de greutăți (Subiectul I B).',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2021',
        an: 2021,
        sesiune: 'sesiune de vară',
        tip: 'redactare',
        text: `Copilăria și adolescența lui Caragiale se caracterizează prin zburdălnicie, independență [...]. Luca și Ecaterina au avut de luptat cu temperamentul rebel, greu de stăpânit al lui Iancu*. Ei au adoptat, în împrejurare, cea mai bună metodă, a îngăduinții relative, care dă rezultate mai bune decât constrângerea. [...]
Dacă este adevărat că a absolvit și clasa a V-a secundară, probabil în capitală, lucrul arată că școlarul, chiar dacă se lăsa greu, nu era o fire cu totul neînfrânată. La moartea tatălui, însă, Iancu [...] începe a-și impune voința în fața văduvei. Strămutarea familiei la București este a doua biruință a tânărului voluntar*, înlesnită probabil de sfaturile rudelor bucureștene.
Din acest moment, un fiu rău s-ar fi emancipat cu totul de obligațiile familiale, părăsindu-și mama și sora. Iancu s-a arătat vrednic de îndatoririle unui pretimpuriu șef de familie. De la vârsta generoasă a celor 18 ani, s-a purtat bărbătește, căutând să-și găsească mijloacele de întreținere pentru dânsul și ai lui. Ca sufleur de al doilea și copist în trupa lui Pascaly, concesionară* a Teatrului Național din București, suficient retribuit, a putut face față nevoilor. Pentru Caragiale, datoria, credem noi, nu era atât un comandament etic, cât elanul afectiv al inimii. Iancu se simțea legat de ai lui organic, fără să-și bată capul cu principiile morale.
La 20 de ani, cum îi încredințează mai târziu lui Vlahuță, este sănătos și robust și duce bine la tăvăleală*, în feluritele îndeletniciri, muncind și alergând toată ziua și sfârșind cu lucrul de noapte al corectorului. Nu s-au păstrat scrisori de familie din vremea când Caragiale locuia, desigur, împreună cu Ecaterina și Lenci*. Numai când nevoile profesionale l-au despărțit de ele, le-a dat prilejul să-i scrie. Scrisorile datează din anii revizoratului său (1881 și următorii).
Sunt mărturii impresionante, prin confirmarea calităților filiale. Femeile nu aveau alt sprijin decât în Iancu. Mai toate scrisorile rostesc mulțumiri calde pentru ajutoarele bănești, trimise neprecupețit. Din leafa modestă de revizor școlar, Caragiale găsește mijlocul să asigure mamei și surorii o viață așezată, chiria și întreținerea unei slujnice. […]
Mai în termen, mai cu întârziere, Iancu trimite cât i se cere. Niciuna din solicitările bănești nu rămâne nesatisfăcută. Ecaterina mulțumește în cuvinte mișcătoare: „Îți mulțumesc, dragă, de parale, că nu mă uiți niciodată, nici pe tine, dragu’ mamii, să nu te uite Dumnezeu și tot binele din lume”. Sau: „Îți mulțumesc, scumpu’ meu fiu, de toate, să trăiești, să-ți dea Dumnezeu toate fericirile”. Altă dată se minunează de activitatea rodnică a fiului ei: „Iancule dragă, scump și neprețuitu-meu fiu, te sărut dulce, dulce! Am priimit cu multă veselie epistola ta, împreună cu 70 lei noi. Domnul să-ți sporească în toată vremea, dragul meu copil! Dar activ ai fost, domnule, nu glumă, ce să zici, fă-mă, mamă, să-ți semăn.” Scrisoarea se încheie cu recomandările din care se vede că afecțiunea mamelor nu ține seamă de vârsta copiilor: „Iancule dragă, păzești-te de timpul ăsta, nu scoate flanela de pe tine că te-nșală vântul de primăvară”.
Șerban Cioculescu, Viața lui I. L. Caragiale
*Iancu – apelativ pentru I. L. Caragiale
*voluntar – care acționează din proprie inițiativă
*concesionar – care are dreptul de a utiliza anumite bunuri ale statului
*a (o) duce (sau ține) la tăvăleală – a fi rezistent la eforturi fizice
*Lenci – fiica Ecaterinei și a lui Luca, sora lui I. L. Caragiale`,
        cerinte: [
            'Cerințe totale: argumentează dacă greutățile vieții pot determina sau nu neglijarea responsabilităților față de familie, raportându-te la fragment și la experiența personală/culturală.',
            'Sumar conținut: opinie clară, două argumente dezvoltate, concluzie pertinentă.',
            'Sumar redactare: conectori corecți; norme ale limbii literare; respectă minimul de cuvinte.'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Comentariu pe text – Ion Vinea',
        descriere: 'Comentează relația idee poetică – mijloace artistice (Subiectul II).',
        numarSubiect: 2,
        profil: 'real',
        data: '2021',
        an: 2021,
        sesiune: 'sesiune de vară',
        tip: 'poezie',
        text: `Limpede vârtej în cerul nostru,
anii ca un stol ne însoțesc.
Fragede au fost potecile.
Acum privirea ta luminează înainte.

Ascultă cum îngână fântânile
cuvintele rămase din trecut.
Ce cuminte mâna ta pe umăr
în acest țărm cu singur drum,
unde vremea ne poartă
ca un cântec de leagăn!

Ion Vinea, Drum`,
        cerinte: [
            'Conținut: comentează relația idee poetică – mijloace artistice (minimum 50 de cuvinte).',
            'Redactare: limbă literară; logică a ideilor; ortografie; punctuație.'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6',
            'Redactare: 4'
        ]
    },
    {
        titlu: 'Eseu despre o nuvelă studiată',
        descriere: 'Redactează un eseu (minim 400 de cuvinte) despre particularitățile unei nuvele studiate.',
        numarSubiect: 3,
        profil: 'real',
        data: '2021',
        an: 2021,
        sesiune: 'sesiune de vară',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularităţi ale unei nuvele studiate.
În elaborarea eseului, vei avea în vedere următoarele repere:
– evidențierea a două trăsături care fac posibilă încadrarea nuvelei studiate într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică;
– comentarea a două episoade/secvențe relevante pentru tema nuvelei studiate;
– analiza a două elemente de structură, de compoziție și/sau de limbaj, semnificative pentru nuvela studiată (de exemplu: acțiune, conflict, relații temporale și spațiale, incipit, final, tehnici narative, instanțe ale comunicării narative, perspectivă narativă, registre stilistice, limbaj etc.).`,
        cerinte: [
            'Evidențiază două trăsături de încadrare a nuvelei.',
            'Comentează două episoade/secvențe relevante.',
            'Analizează două elemente de structură/compoziție/limbaj semnificative.'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'Cella Serghi, E. Lovinescu evocat de...',
        descriere: 'Citește fragmentul și rezolvă cerințele (Subiectul I A).',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2021',
        an: 2021,
        sesiune: 'sesiune de toamnă',
        tip: 'analiza',
        text: `Era în anul 1938. Apăruse cartea mea. [...] Și, în momentul acela, noi coboram – mi se pare că strada e în pantă – și urca un bărbat cu un pas greoi, cu părul alb, cu ochi frumoși, negri, și au avut un moment de ezitare, mi s-a părut, și Camil, și Lovinescu, dar s-au oprit, cu toate că erau în polemică drastică. Și-atunci, Camil mi l-a prezentat pe Lovinescu. Lovinescu s-a uitat mirat la mine, pentru că păream mai tânără decât eram de fapt, și mi-a spus: „Dumneata ai scris Pânza de păianjen?" „Da!" „Păi am lăsat vorbă de atâtea ori [...] să vii la cenaclu, la Sburătorul. De ce n-ai venit până acum?" Nu știu ce-am spus.
După ce ne-am despărțit – și acest lucru iarăși l-am povestit, pentru că este foarte impresionant față de ceea ce știam eu sau credeam despre personalitatea lui Camil – m-a luat de mână Camil Petrescu și m-a dus într-o cofetărie și mi-a spus: „Vreau să stăm de vorbă, pentru că nu trebuie să treci peste ziua asta, peste clipele acestea, fără să-ți amintești de ele toată viața. Să nu te lași influențată de polemica dintre mine și Lovinescu; probabil c-ai fost influențată dacă te-a invitat și nu te-ai dus. Să ții minte numai atât, că este cea mai importantă zi din viața ta. Lovinescu este un om de cultură și are o poziție în literatură pe care nimeni n-a avut-o de la Maiorescu până la noi..." Și mi-a ținut o adevărată lecție. [...]
Și așa s-a întâmplat că am ajuns în fața maestrului. Și pot să spun că, într-un fel, destinul meu literar s-a hotărât atunci, pentru că, deși cartea mea apăruse, deși scriseseră despre mine Pompiliu Constantinescu și alți critici de aceeași valoare, deși nu pot să spun că m-am format la cenaclul lui Lovinescu, pentru că tot ce-am citit acolo, sau aproape tot, erau lucruri pe care pe parcurs le publicam sau mi se publicau, la Viața Românească și la Revista Fundațiilor, totuși a avut o importanță extraordinară această întâlnire. Pentru că Lovinescu, fie că a bănuit, fie că n-a bănuit, dar m-a întrebat: „Ce-ai de gând să mai scrii? Foarte bine, foarte frumos, ai scris o carte. Ei, acum ce faci? Cum va urma? Ce se va întâmpla mai departe?" Nu știu cum a dibuit că eu nu am intenția să mai scriu altă carte. Am avut ceva de spus, am spus și nu voiam să devin scriitoare. Adică nu credeam că voi fi în stare și nu simțeam nevoia să scriu cărți. Simțisem nevoia să scriu o carte. Dar Lovinescu nu m-a lăsat și m-a întrebat așa: „Hai, hai, spune, ce-ai de gând să mai scrii? Vezi că unii și alții te mai înțeapă ici, colo: că e cartea așa, că e cartea pe dincolo, dar, mă rog, de aia sunt ei critici... și cam toți te bănuiesc pe undeva c-ai pus toată experiența pe care o aveai într-o singură carte. Ce-i adevărat în chestia asta și ce ai de gând să scrii?" În momentul acela am fost atât de impresionată de această bănuială și am fost atât de impresionată de prietenia cu care îmi vorbea și de încrederea pe care simțeam că o are în mine, încât n-am îndrăznit să-i spun că nu voi mai scrie. Și am spus: „Mai am o singură experiență pe care n-am pus-o în cartea asta." „Și care anume?" „Experiența scrisului. Am pus tot. Dar n-am pus anii în care am scris. Despre anii în care am scris, despre această cursă de obstacole, despre această ocnă, despre cioplitul în piatră sau la sare, care este scrisul, eu n-am știut. Experiența asta n-am avut-o și experiența asta vreau s-o pun în carte, adică vreau să scriu despre cum se scrie o carte și eroina mea voi fi eu, dar într-o altă perioadă, în perioada scrisului." Și mi-a spus: „Interesant. Foarte interesant."
Cella Serghi, E. Lovinescu evocat de..., în volumul Amintiri și evocări despre E. Lovinescu`,
        cerinte: [
            'Indică sensul din text al secvenței ai de gând.',
            'Menționează două titluri de reviste care publicau creațiile Cellei Serghi, utilizând informațiile din text.',
            'Precizează atitudinea lui Camil Petrescu față de E. Lovinescu, justificând cu o secvență semnificativă din text.',
            'Explică motivul pentru care Cella Serghi consideră că E. Lovinescu i-a marcat destinul literar.',
            'Prezintă, în 30–50 de cuvinte, o caracteristică pe care o are experiența scrisului, în viziunea autoarei.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Diferențe de opinie – argumentare',
        descriere: 'Redactează un text (minim 150 cuvinte) despre diferențele de opinie și recunoașterea meritelor (Subiectul I B).',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2021',
        an: 2021,
        sesiune: 'sesiune de toamnă',
        tip: 'redactare',
        text: `Era în anul 1938. Apăruse cartea mea. [...] Și, în momentul acela, noi coboram – mi se pare că strada e în pantă – și urca un bărbat cu un pas greoi, cu părul alb, cu ochi frumoși, negri, și au avut un moment de ezitare, mi s-a părut, și Camil, și Lovinescu, dar s-au oprit, cu toate că erau în polemică drastică. Și-atunci, Camil mi l-a prezentat pe Lovinescu. Lovinescu s-a uitat mirat la mine, pentru că păream mai tânără decât eram de fapt, și mi-a spus: „Dumneata ai scris Pânza de păianjen?" „Da!" „Păi am lăsat vorbă de atâtea ori [...] să vii la cenaclu, la Sburătorul. De ce n-ai venit până acum?" Nu știu ce-am spus.
După ce ne-am despărțit – și acest lucru iarăși l-am povestit, pentru că este foarte impresionant față de ceea ce știam eu sau credeam despre personalitatea lui Camil – m-a luat de mână Camil Petrescu și m-a dus într-o cofetărie și mi-a spus: „Vreau să stăm de vorbă, pentru că nu trebuie să treci peste ziua asta, peste clipele acestea, fără să-ți amintești de ele toată viața. Să nu te lași influențată de polemica dintre mine și Lovinescu; probabil c-ai fost influențată dacă te-a invitat și nu te-ai dus. Să ții minte numai atât, că este cea mai importantă zi din viața ta. Lovinescu este un om de cultură și are o poziție în literatură pe care nimeni n-a avut-o de la Maiorescu până la noi..." Și mi-a ținut o adevărată lecție. [...]
Și așa s-a întâmplat că am ajuns în fața maestrului. Și pot să spun că, într-un fel, destinul meu literar s-a hotărât atunci, pentru că, deși cartea mea apăruse, deși scriseseră despre mine Pompiliu Constantinescu și alți critici de aceeași valoare, deși nu pot să spun că m-am format la cenaclul lui Lovinescu, pentru că tot ce-am citit acolo, sau aproape tot, erau lucruri pe care pe parcurs le publicam sau mi se publicau, la Viața Românească și la Revista Fundațiilor, totuși a avut o importanță extraordinară această întâlnire. Pentru că Lovinescu, fie că a bănuit, fie că n-a bănuit, dar m-a întrebat: „Ce-ai de gând să mai scrii? Foarte bine, foarte frumos, ai scris o carte. Ei, acum ce faci? Cum va urma? Ce se va întâmpla mai departe?" Nu știu cum a dibuit că eu nu am intenția să mai scriu altă carte. Am avut ceva de spus, am spus și nu voiam să devin scriitoare. Adică nu credeam că voi fi în stare și nu simțeam nevoia să scriu cărți. Simțisem nevoia să scriu o carte. Dar Lovinescu nu m-a lăsat și m-a întrebat așa: „Hai, hai, spune, ce-ai de gând să mai scrii? Vezi că unii și alții te mai înțeapă ici, colo: că e cartea așa, că e cartea pe dincolo, dar, mă rog, de aia sunt ei critici... și cam toți te bănuiesc pe undeva c-ai pus toată experiența pe care o aveai într-o singură carte. Ce-i adevărat în chestia asta și ce ai de gând să scrii?" În momentul acela am fost atât de impresionată de această bănuială și am fost atât de impresionată de prietenia cu care îmi vorbea și de încrederea pe care simțeam că o are în mine, încât n-am îndrăznit să-i spun că nu voi mai scrie. Și am spus: „Mai am o singură experiență pe care n-am pus-o în cartea asta." „Și care anume?" „Experiența scrisului. Am pus tot. Dar n-am pus anii în care am scris. Despre anii în care am scris, despre această cursă de obstacole, despre această ocnă, despre cioplitul în piatră sau la sare, care este scrisul, eu n-am știut. Experiența asta n-am avut-o și experiența asta vreau s-o pun în carte, adică vreau să scriu despre cum se scrie o carte și eroina mea voi fi eu, dar într-o altă perioadă, în perioada scrisului." Și mi-a spus: „Interesant. Foarte interesant."
Cella Serghi, E. Lovinescu evocat de..., în volumul Amintiri și evocări despre E. Lovinescu`,
        cerinte: [
            'Cerințe totale: argumentează dacă diferențele de opinie împiedică sau nu recunoașterea meritelor celuilalt, raportându-te la fragment și la experiența personală/culturală.',
            'Sumar conținut: opinie clară, două argumente dezvoltate, concluzie pertinentă.',
            'Sumar redactare: conectori corecți; norme ale limbii literare; respectă minimul de cuvinte.'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Notațiile autorului – Victor Ion Popa',
        descriere: 'Prezintă rolul notațiilor autorului în fragmentul de teatru (Subiectul II).',
        numarSubiect: 2,
        profil: 'real',
        data: '2021',
        an: 2021,
        sesiune: 'sesiune de toamnă',
        tip: 'teatru',
        text: `ACTUL I
Vezi înaintea ochilor un șir de case ca și cum le-ai privi din stradă. Sunt acolo trei prăvălii modeste, de târgușor provincial. Întâia este a lui Take, a doua este a lui Ianke și cea din urmă și micuță de tot, a lui Cadîr. Casa lui Take și a lui Ianke sunt construite absolut la fel, numai că sunt cu totul altfel zugrăvite. De pildă, zidurile casei lui Take sunt roșii, iar tabla de pe acoperiș albă, pe când casa lui Ianke are zidurile albastre și tabla de pe acoperiș roșie. Firma lui Take, pe care-i scris doar: „La Take", e neagră cu litere galbene, iar a lui Ianke e galbenă cu litere negre. Căsuța micuță a lui Cadîr și firma lui au luat de la fiecare câte o culoare. Așa, de pildă, zidurile sunt roșii, tabla neagră, firma galbenă cu litere albe. [...]
E vreme de vară. Toate cele trei prăvălii au perdele în față, cât ține micul trotuar provincial – firește, și ele deosebit colorate. E cald și zăpușeală. Ghicești apropierea serii – dar vipia* nămiezii s-a prelungit până aici. Poate să fie ora cinci. Ulița e pustie și nu se aude decât foarte departe – undeva – cântecul trist al unei flașnete*. Toţi trei negustorii, ușor și comod îmbrăcați de vară, dormitează pe scaune înadins puse în față, fiecare la prăvălia lui.

SCENA I
TAKE, IANKE și CADÎR

TAKE (somnoros și lehămetit de căldură, își șterge nădușeala oftând): Ooof, cald e!
IANKE: Și ce-mi spui asta mie?

Victor Ion Popa, Take, Ianke și Cadîr
*vipie – (regionalism) căldură mare, arșiță
*flașnetă – mică orgă mecanică portativă, acționată prin învârtirea unei manivele`,
        cerinte: [
            'Conținut: prezintă rolul notațiilor autorului în fragment (minimum 50 de cuvinte).',
            'Redactare: limbă literară; logică a ideilor; ortografie; punctuație.'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6',
            'Redactare: 4'
        ]
    },
    {
        titlu: 'Eseu despre construcția unui personaj',
        descriere: 'Redactează un eseu (minim 400 de cuvinte) despre particularitățile de construcție a unui personaj din Creangă sau Petrescu.',
        numarSubiect: 3,
        profil: 'real',
        data: '2021',
        an: 2021,
        sesiune: 'sesiune de toamnă',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități de construcție a unui personaj dintr-un text narativ studiat, aparținând lui Ion Creangă sau lui Camil Petrescu.
În elaborarea eseului, vei avea în vedere următoarele repere:
– prezentarea statutului social, psihologic, moral etc. al personajului ales;
– evidențierea unei trăsături a personajului ales, prin două episoade/secvențe comentate;
– analiza a două elemente de structură, de compoziție și/sau de limbaj ale textului narativ studiat, semnificative pentru construcția personajului ales (de exemplu: acțiune, conflict, modalități de caracterizare, relații temporale și spațiale, incipit, final, tehnici narative, instanțe ale comunicării narative, registre stilistice, limbaj etc.).`,
        cerinte: [
            'Prezintă statutul social, psihologic, moral etc. al personajului ales.',
            'Evidențiază o trăsătură a personajului prin două episoade/secvențe comentate.',
            'Analizează două elemente de structură/compoziție/limbaj semnificative pentru construcția personajului.'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'George Panu, Amintiri de la Junimea din Iași',
        descriere: 'Citește fragmentul și rezolvă cerințele (Subiectul I A).',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2021',
        an: 2021,
        sesiune: 'sesiune specială',
        tip: 'analiza',
        text: `Până la venirea lui Creangă la Junimea, culegătorii și povestitorii de povești erau domnii Slavici și Pompiliu, amândoi transilvăneni. Poveștile lor se resimțeau de această origine; scrise într-o limbă grea, de multe ori orășenească, poveștile lor trădau un fel de combinații literare care le stricau farmecul. Marele merit al lui Creangă a fost că el a scris poveștile întocmai sau aproape întocmai cum ele se spun la țară.
Când a venit Creangă la Junimea și și-a citit el singur poveștile, a fost o adevărată sărbătoare. Mi se pare că a început seria sa de povești cu Soacra cu trei nurori. Toți au început atunci a-l ruga pe Creangă să aducă și altele și cât mai curând. Apoi a urmat seria Capra cu trei iezi, Pungulița cu doi bani, Dănilă Prepeleac, Moș Nichifor Coțcaru etc.
În ce consistă valoarea poveștilor lui Creangă? Și cum reușește Creangă ca să fie povestitorul cel mai apropiat în limba poporului? Căci trebuie să admitem că dacă este ceva fermecător în poveștile lui Creangă este acel aer de țară, sunt acele expresii plastice, pentru noi cu totul dintr-o altă limbă, sunt acele apropouri naive, acel dialog de o sinceritate primitivă și acele cunoștinți foarte naive și reduse ale țăranului.
Cum că Ion Creangă era un om foarte deștept, foarte ager la minte nu mai rămâne îndoială; dar cunoștințele lui nu erau întinse. Creangă a rămas până la moarte țăranul din satul Vânători de lângă târgul Neamțului, și tot ce a învățat și a deprins peste fondul cu care a venit la oraș nu s-a prins, nu s-a asimilat cu dânsul. Afară de cunoștințele căpătate în școala preparandală privitoare la profesiunea de învățător, încolo Creangă a rămas ceea ce fusese. Aceasta explică succesul ce a avut cu poveștile. Dacă Ion Creangă devenea un om cult în sensul nostru, dacă s-ar fi depărtat de la felul deprinderilor căpătate în copilărie, el ar fi fost un povestitor ca toți surtucarii* de orașe. Din contră, cultura neputând să-l domineze și să-i schimbe ideile și vorba, Creangă, care avea în același timp și o inteligență vie, a putut să reproducă în limbajul în care crescuse poveștile pe care le auzise, fără ca deprinderi noi și limbajul nou să le defigureze.
Un povestitor de povești populare, ca să reușească, trebuie să pună pe un țăran de la țară ca să istorisească povestea, iar el să o scrie cuvânt cu cuvânt; altmintrelea este imposibil ca un om care gândește altfel, care vorbește altfel, să poată să reproducă un limbaj, impresii și imagini care nu sunt din fondul cunoștințelor sale obișnuite. De aici vine artificialitatea celor mai multe colecții de povești populare. Regretatul Ureche, care a scris și povești, este un exemplu izbitor de cele ce spun. Creangă n-avea decât să se lase târât de suvenirurile vii și nepieritoare ale vieții sale de la țară, pentru ca poveștile sale să fie aproape ca cele ce se ascultă la șezătoare.
George Panu, Amintiri de la Junimea din Iași
*surtucar – (pop.) târgoveț`,
        cerinte: [
            'Indică sensul din text al secvenței cât mai curând.',
            'Menționează profesia pentru care s-a pregătit Creangă, prin studiile efectuate, utilizând informațiile din text.',
            'Precizează o trăsătură morală a lui Creangă, justificând cu o secvență semnificativă din text.',
            'Explică motivul pentru care venirea lui Creangă la Junimea reprezintă un eveniment.',
            'Prezintă, în 30–50 de cuvinte, o caracteristică a poveștilor lui Creangă, așa cum reiese din text.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Simplitatea și succesul – argumentare',
        descriere: 'Redactează un text (minim 150 cuvinte) despre simplitatea ca piedică sau avantaj în succes (Subiectul I B).',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2021',
        an: 2021,
        sesiune: 'sesiune specială',
        tip: 'redactare',
        text: `Până la venirea lui Creangă la Junimea, culegătorii și povestitorii de povești erau domnii Slavici și Pompiliu, amândoi transilvăneni. Poveștile lor se resimțeau de această origine; scrise într-o limbă grea, de multe ori orășenească, poveștile lor trădau un fel de combinații literare care le stricau farmecul. Marele merit al lui Creangă a fost că el a scris poveștile întocmai sau aproape întocmai cum ele se spun la țară.
Când a venit Creangă la Junimea și și-a citit el singur poveștile, a fost o adevărată sărbătoare. Mi se pare că a început seria sa de povești cu Soacra cu trei nurori. Toți au început atunci a-l ruga pe Creangă să aducă și altele și cât mai curând. Apoi a urmat seria Capra cu trei iezi, Pungulița cu doi bani, Dănilă Prepeleac, Moș Nichifor Coțcaru etc.
În ce consistă valoarea poveștilor lui Creangă? Și cum reușește Creangă ca să fie povestitorul cel mai apropiat în limba poporului? Căci trebuie să admitem că dacă este ceva fermecător în poveștile lui Creangă este acel aer de țară, sunt acele expresii plastice, pentru noi cu totul dintr-o altă limbă, sunt acele apropouri naive, acel dialog de o sinceritate primitivă și acele cunoștinți foarte naive și reduse ale țăranului.
Cum că Ion Creangă era un om foarte deștept, foarte ager la minte nu mai rămâne îndoială; dar cunoștințele lui nu erau întinse. Creangă a rămas până la moarte țăranul din satul Vânători de lângă târgul Neamțului, și tot ce a învățat și a deprins peste fondul cu care a venit la oraș nu s-a prins, nu s-a asimilat cu dânsul. Afară de cunoștințele căpătate în școala preparandală privitoare la profesiunea de învățător, încolo Creangă a rămas ceea ce fusese. Aceasta explică succesul ce a avut cu poveștile. Dacă Ion Creangă devenea un om cult în sensul nostru, dacă s-ar fi depărtat de la felul deprinderilor căpătate în copilărie, el ar fi fost un povestitor ca toți surtucarii* de orașe. Din contră, cultura neputând să-l domineze și să-i schimbe ideile și vorba, Creangă, care avea în același timp și o inteligență vie, a putut să reproducă în limbajul în care crescuse poveștile pe care le auzise, fără ca deprinderi noi și limbajul nou să le defigureze.
Un povestitor de povești populare, ca să reușească, trebuie să pună pe un țăran de la țară ca să istorisească povestea, iar el să o scrie cuvânt cu cuvânt; altmintrelea este imposibil ca un om care gândește altfel, care vorbește altfel, să poată să reproducă un limbaj, impresii și imagini care nu sunt din fondul cunoștințelor sale obișnuite. De aici vine artificialitatea celor mai multe colecții de povești populare. Regretatul Ureche, care a scris și povești, este un exemplu izbitor de cele ce spun. Creangă n-avea decât să se lase târât de suvenirurile vii și nepieritoare ale vieții sale de la țară, pentru ca poveștile sale să fie aproape ca cele ce se ascultă la șezătoare.
George Panu, Amintiri de la Junimea din Iași
*surtucar – (pop.) târgoveț`,
        cerinte: [
            'Cerințe totale: argumentează dacă simplitatea este sau nu o piedică în calea succesului, raportându-te la fragment și la experiența personală/culturală.',
            'Sumar conținut: opinie clară, două argumente dezvoltate, concluzie pertinentă.',
            'Sumar redactare: conectori corecți; norme ale limbii literare; respectă minimul de cuvinte.'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Relația idee poetică – mijloace artistice – George Topîrceanu',
        descriere: 'Prezintă relația dintre ideea poetică și mijloacele artistice în poemul dat (Subiectul II).',
        numarSubiect: 2,
        profil: 'real',
        data: '2021',
        an: 2021,
        sesiune: 'sesiune specială',
        tip: 'poezie',
        text: `În noaptea tristă care ne desparte,
Tu poate simți în jurul tău suspine
Și fâlfâiri de aripi și de șoapte...
E dorul meu ce vine de departe
Și ostenit adoarme lângă tine,
Cuminte ca un fluture de noapte
Ce s-a lăsat la capul tău, pe-o carte
Închisă de la sine
Când ai simțit că somnul ne desparte...

George Topîrceanu, Șoapte`,
        cerinte: [
            'Conținut: prezintă relația dintre ideea poetică și mijloacele artistice (minimum 50 de cuvinte).',
            'Redactare: limbă literară; logică a ideilor; ortografie; punctuație.'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6',
            'Redactare: 4'
        ]
    },
    {
        titlu: 'Eseu despre un text narativ studiat',
        descriere: 'Redactează un eseu (minim 400 de cuvinte) despre particularitățile unui text narativ din Rebreanu sau Sadoveanu.',
        numarSubiect: 3,
        profil: 'real',
        data: '2021',
        an: 2021,
        sesiune: 'sesiune specială',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularităţi ale unui text narativ studiat, aparținând lui Liviu Rebreanu sau lui Mihail Sadoveanu.
În elaborarea eseului, vei avea în vedere următoarele repere:
– evidenţierea a două trăsături care fac posibilă încadrarea textului narativ studiat într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică;
– comentarea a două episoade/secvențe relevante pentru tema textului narativ studiat;
– analiza a două elemente de structură, de compoziție și/sau de limbaj, semnificative pentru textul narativ studiat (de exemplu: acțiune, conflict, modalități de caracterizare, relații temporale și spațiale, incipit, final, tehnici narative, instanțe ale comunicării narative, registre stilistice, limbaj etc.).`,
        cerinte: [
            'Evidențiază două trăsături de încadrare a textului narativ.',
            'Comentează două episoade/secvențe relevante pentru temă.',
            'Analizează două elemente de structură/compoziție/limbaj semnificative.'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'Jean Bart, Mărturisiri literare',
        descriere: 'Citește următorul fragment al lui Jean Bart și rezolvă cerințele date.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2021',
        an: 2021,
        sesiune: 'simulare',
        tip: 'analiza',
        text: `Eu mă consider fiu al Iașului, pentru că acolo am crescut și m-am format, până am plecat în lume. 
De Burdujeni nu-mi aduc aminte decât vag de tot; niște frânturi de amintiri. Prima imagine care mi-a rămas e din timpul războiului cu turcii, din 1877. Tatăl meu, fiind militar, a plecat în război și îmi amintesc jalea din casă cu ocazia acestui eveniment. Aceste lucruri le-am descris în Scrisorile tatii. 
Pe urmă îmi aduc aminte cum ședeam cu toții ai casei în jurul unei lămpi cu abajur verde și făceam scamă*. Pe vremea aceea, nu era vată pentru pansamente, ca astăzi, ci scamă. Toți ai casei făceau scamă, ce se trimitea la Crucea Roșie. De atunci am o amintire pe care am descris-o, dar e bine s-o repet în două cuvinte: îmi aduc aminte cum poștașul aduce într-o zi un mic pachet. Îl primesc eu și-l duc mamei. Era în el ceasul tatii. Eu nu-mi dădeam seama, pentru că eram prea mic, dar o văd pe mama că începe să plângă: credea că a fost ucis în război și în acel pachet se trimiteau familiei lucrurile găsite la el. 
A doua zi a venit o scrisoare de la tata și, natural, cu aceasta bucuria pentru întreaga familie. E o scenă care mi-a rămas din primii ani ai copilăriei. […] 
Clasele primare le-am făcut bineînțeles la Iași și în clasa a doua primară am avut de profesor chiar pe celebrul scriitor Ion Creangă. Eram prea mic, dar mi-l aduc bine aminte: un om gros și gras, cu o pălărie mare gri; mișca mult, sufla greu și se ștergea mereu cu o batistă mare de popă. După cum știți, a fost și el preot și prieten cu preotul Enăchescu, cu care a lucrat împreună Învățătorul copiilor*. 
Și ce mi-a rămas în minte știu că saluta pe copii, pe când ceilalți dascăli nici nu se uitau la ei. De câte ori îl salutam, el își scotea pălăria lui cea mare și noi, pentru asta, treceam de zece ori prin fața lui. 
Îi plăceau copiii și știu asta pentru că prin clasa a patra primară nu-l mai aveam pe el – ședeam în Sărărie, pe când el ședea în Țicău. Pe panta aceea ne dădeam cu săniuța și treceam chiar prin fața casei lui. El ieșea în poartă îmbrăcat într-un fel de cațaveică* de vulpe și uneori se suia cu noi în sanie și ne arăta cum trebuie să cârmuim; nu se supăra deloc când se răsturna sania cu noi și cu el. […] 
Domnilor, am trăit în mediul Iașului și cei care n-au trăit în Iași greu își pot da seama de acea atmosferă ieșeană. Am trecut și eu pe sub „plopii fără soț”. Am visat și eu la Grădina Copoului; chiar sub teiul lui Eminescu. Am văzut pe Eminescu; n-am vorbit cu el, pentru că eram copil. […] 
Și astăzi când mă duc la Iași, când și când, cu adevărată voluptate cutreier străzile Iașului, oprindu-mă la fiecare colț, căci îmi aduc aminte locurile unde am copilărit și întreaga istorie a Iașului. 
Jean Bart, Mărturisiri literare   
*scamă – (învechit, cu sens colectiv) fire destrămate dintr-o pânză uzată, scămoșate și întrebuințate la pansamente 
*Învățătorul copiilor – abecedar scris de Ion Creangă și de Gh. Enăchescu 
*cațaveică – haină lungă`,
        cerinte: [
            'Indică sensul din text al secvenței în două cuvinte.',
            'Menționează titlul lucrării în care Jean Bart evocă atmosfera din familia sa, ca urmare a plecării tatălui în război, utilizând informațiile din textul dat.',
            'Precizează o stare trăită de autor la revenirea în Iași, justificându-ți răspunsul cu o secvență semnificativă din textul dat.',
            'Explică motivul pentru care scrisoarea tatălui creează bucurie familiei.',
            'Prezintă, în 30 – 50 de cuvinte, atitudinea lui Ion Creangă față de copii, aşa cum reiese din textul dat.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Redactează un text argumentativ',
        descriere: 'Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă e importantă sau nu implicarea civică în perioadele de criză.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2021',
        an: 2021,
        sesiune: 'simulare',
        tip: 'redactare',
        text: `Eu mă consider fiu al Iașului, pentru că acolo am crescut și m-am format, până am plecat în lume. 
De Burdujeni nu-mi aduc aminte decât vag de tot; niște frânturi de amintiri. Prima imagine care mi-a rămas e din timpul războiului cu turcii, din 1877. Tatăl meu, fiind militar, a plecat în război și îmi amintesc jalea din casă cu ocazia acestui eveniment. Aceste lucruri le-am descris în Scrisorile tatii. 
Pe urmă îmi aduc aminte cum ședeam cu toții ai casei în jurul unei lămpi cu abajur verde și făceam scamă*. Pe vremea aceea, nu era vată pentru pansamente, ca astăzi, ci scamă. Toți ai casei făceau scamă, ce se trimitea la Crucea Roșie. De atunci am o amintire pe care am descris-o, dar e bine s-o repet în două cuvinte: îmi aduc aminte cum poștașul aduce într-o zi un mic pachet. Îl primesc eu și-l duc mamei. Era în el ceasul tatii. Eu nu-mi dădeam seama, pentru că eram prea mic, dar o văd pe mama că începe să plângă: credea că a fost ucis în război și în acel pachet se trimiteau familiei lucrurile găsite la el. 
A doua zi a venit o scrisoare de la tata și, natural, cu aceasta bucuria pentru întreaga familie. E o scenă care mi-a rămas din primii ani ai copilăriei. […] 
Clasele primare le-am făcut bineînțeles la Iași și în clasa a doua primară am avut de profesor chiar pe celebrul scriitor Ion Creangă. Eram prea mic, dar mi-l aduc bine aminte: un om gros și gras, cu o pălărie mare gri; mișca mult, sufla greu și se ștergea mereu cu o batistă mare de popă. După cum știți, a fost și el preot și prieten cu preotul Enăchescu, cu care a lucrat împreună Învățătorul copiilor*. 
Și ce mi-a rămas în minte știu că saluta pe copii, pe când ceilalți dascăli nici nu se uitau la ei. De câte ori îl salutam, el își scotea pălăria lui cea mare și noi, pentru asta, treceam de zece ori prin fața lui. 
Îi plăceau copiii și știu asta pentru că prin clasa a patra primară nu-l mai aveam pe el – ședeam în Sărărie, pe când el ședea în Țicău. Pe panta aceea ne dădeam cu săniuța și treceam chiar prin fața casei lui. El ieșea în poartă îmbrăcat într-un fel de cațaveică* de vulpe și uneori se suia cu noi în sanie și ne arăta cum trebuie să cârmuim; nu se supăra deloc când se răsturna sania cu noi și cu el. […] 
Domnilor, am trăit în mediul Iașului și cei care n-au trăit în Iași greu își pot da seama de acea atmosferă ieșeană. Am trecut și eu pe sub „plopii fără soț”. Am visat și eu la Grădina Copoului; chiar sub teiul lui Eminescu. Am văzut pe Eminescu; n-am vorbit cu el, pentru că eram copil. […] 
Și astăzi când mă duc la Iași, când și când, cu adevărată voluptate cutreier străzile Iașului, oprindu-mă la fiecare colț, căci îmi aduc aminte locurile unde am copilărit și întreaga istorie a Iașului. 
Jean Bart, Mărturisiri literare   
*scamă – (învechit, cu sens colectiv) fire destrămate dintr-o pânză uzată, scămoșate și întrebuințate la pansamente 
*Învățătorul copiilor – abecedar scris de Ion Creangă și de Gh. Enăchescu 
*cațaveică – haină lungă`,
        cerinte: [
            'Cerințe totale: Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă e importantă sau nu implicarea civică în perioadele de criză, raportându-te atât la informațiile din fragmentul extras din volumul Mărturisiri literare de Jean Bart, cât și la experiența personală sau culturală.',
            'Sumar conținut: opinie, două argumente dezvoltate, concluzie pertinentă',
            'Sumar redactare: conectori corecți, norme ale limbii literare, așezare în pagină, lizibilitate, număr minim de cuvinte'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Analiza notațiilor autorului',
        descriere: 'Prezintă, în minimum 50 de cuvinte, rolul notațiilor autorului în fragmentul de mai jos.',
        numarSubiect: 2,
        profil: 'real',
        data: '2021',
        an: 2021,
        sesiune: 'simulare',
        tip: 'drama',
        text: `În București, la Leonida. 
O odaie modestă de mahala. [...] la dreapta, o ușă; la stânga, o fereastră. De-o parte și de alta a scenei, câte un pat de culcare. În mijlocul odăii, o masă împrejurul căreia sunt așezate scaune de paie. Pe masă, o lampă cu gaz; pe globul lămpii un abat-jour* cusut pe canava*. În planul întâi, la stânga, o sobă cu ușa deschisă și cu câțiva tăciuni pâlpâind. Leonida e în halat, în papuci și cu scufia de noapte; Efimița în camizol*, fustă de flanelă roșie și legată la cap cu tulpan alb. Amândoi șed de vorbă la masă. 
SCENA I 
LEONIDA: Așa cum îți spusei, mă scol într-o dimineață și, știi obiceiul meu, pui mâna întâi și-ntâi pe Aurora democratică, să văz cum mai merge țara. O deschiz... și ce citesc? Uite, țin minte ca acuma: 
„11/23 Făurar...”. 
I. L. Caragiale, Conu Leonida față cu reacțiunea 
*abat-jour – (în franceză, în original) abajur – dispozitiv fixat în jurul unei lămpi, destinat să dirijeze lumina într-o anumită direcție  
*canava – țesătură rară din fire groase de bumbac, folosită pentru broderii 
*camizol – haină de casă scurtă, cu mâneci, pe care o purtau femeile`,
        cerinte: [
            'Prezintă, în minimum 50 de cuvinte, rolul notațiilor autorului în fragmentul de mai jos.',
            'Conținut: precizează rolul notațiilor autorului în fragmentul de mai jos',
            'Redactare: utilizează corect conectorii; respectă normele limbii literare, așezarea în pagină și lizibilitatea'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6',
            'Redactare: 4'
        ]
    },
    {
        titlu: 'Redactează un eseu',
        descriere: 'Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități ale unui text narativ studiat, aparținând lui Ioan Slavici.',
        numarSubiect: 3,
        profil: 'real',
        data: '2021',
        an: 2021,
        sesiune: 'simulare',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități ale unui text narativ studiat, aparținând lui Ioan Slavici. 
În elaborarea eseului, vei avea în vedere următoarele repere: – evidențierea a două trăsături care fac posibilă încadrarea textului narativ studiat într-o perioadă, într-un curent cultural/literar sau într-o orientare tematică; – comentarea a două episoade/secvențe relevante pentru tema textului narativ studiat; – analiza a două elemente de structură, de compoziție și/sau de limbaj, semnificative pentru textul narativ studiat (de exemplu: acțiune, conflict, relații temporale și spațiale, incipit, final, tehnici narative, instanțe ale comunicării narative, perspectivă narativă, registre stilistice, limbaj etc.).`,
        cerinte: [
            'Evidențiază două trăsături care fac posibilă încadrarea textului narativ în contextul său',
            'Comentează două episoade relevante pentru tema textului',
            'Analizează două elemente de structură/compoziție/limbaj relevante'
        ],
        punctaj: [6, 6, 6]
    },
    {
        titlu: 'Dinu & Nelli Pillat, Biruința unei iubiri',
        descriere: 'Citește următorul fragment al lui Dinu & Nelli Pillat și rezolvă cerințele date.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2021',
        an: 2021,
        sesiune: 'model',
        tip: 'analiza',
        text: `14 iulie 1943, Predeal 
Dinu drag, 
Sunt fericită că-mi scrii despre noile revelații pe care le ai în legătură cu romanul tău. Aceasta mă face să reînnoiesc ceea ce ți-am spus într-o zi, că niciodată să nu disperi atunci când întruchiparea ideilor tale întârzie să vină, căci timpul și viața trăită la rând îți măresc puterea de înțelegere, îmbogățindu-ți sufletul, dându-i mereu posibilitatea altor renașteri și cuprinsul altor lumini. 
Ți-am mărturisit mereu că mă încred deplin în talentul tău și afirmarea spuselor mele nu întârzie să vină. Aș prefera acum să ne plimbăm pe marginea lacurilor noastre și să-ți împărtășesc descoperirile și întrebările mele din ultimul timp. 
Pentru că zilele acestea a plouat teribil, norii vătuindu-mi și munții, și pădurile, am fost nevoită să stau în casă, să fac focul în sobă și, instalată cât mai comod, să citesc ca să uit de timp. Am început bineînțeles cu L'Idiot*. Probabil că vei fi dezamăgit de felul în care am înțeles această carte și de ecourile pe care le-a putut găsi în sufletul meu. Este totuși foarte natural să fie așa. 
Senzația pe care am simțit-o în decursul lecturii a fost aceea de chin, înăbușire, apăsare. Deseori simțeam nevoia să deschid fereastra și să respir cât mai mult aer. Dostoievski probabil a coborât în iad să-și adune personagiile, le-a botezat creștinește și apoi le-a dat drumul în lume. Și recunosc că iadul este și pe pământ și că de cele mai multe ori îl descopăr și în sufletul meu. 
Prințul Mîșkin nu a reușit decât în parte să-mi elibereze sufletul de înlănțuirea suferinței și a păcatelor celorlalte personagii. Și aceasta din următoarele motive:  
I. Am înțeles prea mult suferința și structura sufletească a celorlalte personagii principale, Nastasia Philipovna și Aglae, pentru ca să nu le aprob acțiunile. [...]  
De Mîșkin cred că m-aș fi îndrăgostit și eu nebunește, dacă aș fi luat parte la acțiunea romanului lui Dostoievski. 
II. În legătură cu Mîșkin am să-ți pun câteva întrebări pe care nu știu dacă am dreptul să ți le pun. 
Dacă Mîșkin ar fi posedat o inteligență mai complexă decât inteligența sufletească, ar fi putut fi tot așa cum era? 
Ce folos și ce mângâiere au adus Mîșkin și sacrificiul său sufletelor chinuite de celelalte personaje? 
De ce Mîșkin și toți eroii romanului au trebuit să sfârșească așa cum au sfârșit? 
Probabil că nici Dostoievski nu a crezut în posibilitatea vreunei îndreptări sau a unui alt sfârșit pentru sufletul omenesc. [...] Are o forță și o putere de pătrundere de parcă ar fi Dumnezeu. 
Probabil că ceea ce ți-am scris te va îndurera. Îmi pare teribil de rău că am simțit și înțeles astfel romanul lui Dostoievski. De fapt, bănuiesc că nu l-am înțeles deloc și mă întreb dacă voi ajunge să-l pătrund cu alt suflet și altă minte vreodată.  
Nelli 
Dinu & Nelli Pillat, Biruința unei iubiri   
*L'Idiot (limba franceză) – Idiotul, roman scris de F. M. Dostoievski. Ca majoritatea intelectualilor epocii, Nelli citește mai 
ales în limba franceză și folosește ortografia franceză a numelor.`,
        cerinte: [
            'Indică sensul din text al secvenței decât în parte.',
            'Menționează numele a două personaje din romanul Idiotul de Dostoievski, utilizând informațiile din textul dat.',
            'Precizează efectul pe care îl are lectura romanului asupra lui Nelli, justificându-ți răspunsul cu o secvență semnificativă din textul dat.',
            'Explică motivul pentru care impasul creator nu ar trebui să-l descurajeze pe Dinu, în viziunea lui Nelli.',
            'Prezintă, în 30 – 50 de cuvinte, o trăsătură a expeditoarei scrisorii, aşa cum reiese din textul dat.'
        ],
        punctaj: [6, 6, 6, 6, 6]
    },
    {
        titlu: 'Redactează un text argumentativ',
        descriere: 'Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă lectura este sau nu o modalitate de a te detașa de realitate.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2021',
        an: 2021,
        sesiune: 'model',
        tip: 'redactare',
        text: `14 iulie 1943, Predeal 
Dinu drag, 
Sunt fericită că-mi scrii despre noile revelații pe care le ai în legătură cu romanul tău. Aceasta mă face să reînnoiesc ceea ce ți-am spus într-o zi, că niciodată să nu disperi atunci când întruchiparea ideilor tale întârzie să vină, căci timpul și viața trăită la rând îți măresc puterea de înțelegere, îmbogățindu-ți sufletul, dându-i mereu posibilitatea altor renașteri și cuprinsul altor lumini. 
Ți-am mărturisit mereu că mă încred deplin în talentul tău și afirmarea spuselor mele nu întârzie să vină. Aș prefera acum să ne plimbăm pe marginea lacurilor noastre și să-ți împărtășesc descoperirile și întrebările mele din ultimul timp. 
Pentru că zilele acestea a plouat teribil, norii vătuindu-mi și munții, și pădurile, am fost nevoită să stau în casă, să fac focul în sobă și, instalată cât mai comod, să citesc ca să uit de timp. Am început bineînțeles cu L'Idiot*. Probabil că vei fi dezamăgit de felul în care am înțeles această carte și de ecourile pe care le-a putut găsi în sufletul meu. Este totuși foarte natural să fie așa. 
Senzația pe care am simțit-o în decursul lecturii a fost aceea de chin, înăbușire, apăsare. Deseori simțeam nevoia să deschid fereastra și să respir cât mai mult aer. Dostoievski probabil a coborât în iad să-și adune personagiile, le-a botezat creștinește și apoi le-a dat drumul în lume. Și recunosc că iadul este și pe pământ și că de cele mai multe ori îl descopăr și în sufletul meu. 
Prințul Mîșkin nu a reușit decât în parte să-mi elibereze sufletul de înlănțuirea suferinței și a păcatelor celorlalte personagii. Și aceasta din următoarele motive:  
I. Am înțeles prea mult suferința și structura sufletească a celorlalte personagii principale, Nastasia Philipovna și Aglae, pentru ca să nu le aprob acțiunile. [...]  
De Mîșkin cred că m-aș fi îndrăgostit și eu nebunește, dacă aș fi luat parte la acțiunea romanului lui Dostoievski. 
II. În legătură cu Mîșkin am să-ți pun câteva întrebări pe care nu știu dacă am dreptul să ți le pun. 
Dacă Mîșkin ar fi posedat o inteligență mai complexă decât inteligența sufletească, ar fi putut fi tot așa cum era? 
Ce folos și ce mângâiere au adus Mîșkin și sacrificiul său sufletelor chinuite de celelalte personaje? 
De ce Mîșkin și toți eroii romanului au trebuit să sfârșească așa cum au sfârșit? 
Probabil că nici Dostoievski nu a crezut în posibilitatea vreunei îndreptări sau a unui alt sfârșit pentru sufletul omenesc. [...] Are o forță și o putere de pătrundere de parcă ar fi Dumnezeu. 
Probabil că ceea ce ți-am scris te va îndurera. Îmi pare teribil de rău că am simțit și înțeles astfel romanul lui Dostoievski. De fapt, bănuiesc că nu l-am înțeles deloc și mă întreb dacă voi ajunge să-l pătrund cu alt suflet și altă minte vreodată.  
Nelli 
Dinu & Nelli Pillat, Biruința unei iubiri   
*L'Idiot (limba franceză) – Idiotul, roman scris de F. M. Dostoievski. Ca majoritatea intelectualilor epocii, Nelli citește mai 
ales în limba franceză și folosește ortografia franceză a numelor.`,
        cerinte: [
            'Cerințe totale: Redactează un text de minimum 150 de cuvinte, în care să argumentezi dacă lectura este sau nu o modalitate de a te detașa de realitate, raportându-te atât la informațiile din fragmentul extras din volumul Biruința unei iubiri de Dinu & Nelli Pillat, cât și la experiența personală sau culturală.',
            'Sumar conținut: opinie, două argumente dezvoltate, concluzie pertinentă',
            'Sumar redactare: conectori corecți, norme ale limbii literare, așezare în pagină, lizibilitate, număr minim de cuvinte'
        ],
        punctaj: ['Total: 20', 'Sumar conținut: 14', 'Sumar redactare: 6']
    },
    {
        titlu: 'Analiza unui text poetic',
        descriere: 'Comentează textul de mai jos, în minimum 50 de cuvinte, evidențiind relația dintre ideea poetică și mijloacele artistice.',
        numarSubiect: 2,
        profil: 'real',
        data: '2021',
        an: 2021,
        sesiune: 'model',
        tip: 'poezie',
        text: `Sunt solitarul pustiilor piețe 
Cu tristele becuri cu pală lumină – 
Când sună arama în noaptea deplină, 
Sunt solitarul pustiilor piețe. 
Tovarăș mi-i râsul hidos, și cu umbra 
Ce sperie câinii pribegi prin canale; 
Sub tristele becuri cu razele pale, 
Tovarăș mi-i râsul hidos, și cu umbra. 
Sunt solitarul pustiilor piețe 
Cu jocuri de umbră ce dau nebunie; 
Pălind în tăcere și-n paralizie, – 
Sunt solitarul pustiilor piețe... 
George Bacovia, Pălind`,
        cerinte: [
            'Comentează textul de mai jos, în minimum 50 de cuvinte, evidențiind relația dintre ideea poetică și mijloacele artistice.',
            'Conținut: evidențiază relația dintre ideea poetică și mijloacele artistice',
            'Redactare: limbă literară, logică a ideilor, ortografie, punctuație'
        ],
        punctaj: [
            'Total: 10',
            'Conținut: 6',
            'Redactare: 4'
        ]
    },
    {
        titlu: 'Redactează un eseu',
        descriere: 'Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități de construcție a unui personaj dintr-un basm cult studiat.',
        numarSubiect: 3,
        profil: 'real',
        data: '2021',
        an: 2021,
        sesiune: 'model',
        tip: 'eseu',
        text: `Redactează un eseu de minimum 400 de cuvinte, în care să prezinți particularități de construcție a unui personaj dintr-un basm cult studiat. 
În elaborarea eseului, vei avea în vedere următoarele repere: – prezentarea statutului social, psihologic, moral etc. al personajului ales; – evidențierea unei trăsături a personajului ales, prin două episoade/secvențe comentate; –analiza a două elemente de structură, de compoziție și de limbaj ale basmului cult studiat, semnificative pentru construcția personajului ales (de exemplu: acțiune, conflict, modalități de caracterizare, incipit, final, tehnici narative, perspectivă narativă, registre stilistice, limbaj etc.).`,
        cerinte: [
            'Prezintă statutul social, psihologic, moral etc. al personajului ales',
            'Evidențiază o trăsătură a personajului prin două episoade/secvențe comentate',
            'Analizează două elemente de structură/compoziție/limbaj semnificative pentru construcția personajului'
        ],
        punctaj: [6, 6, 6]
    }
];

export default subiecteList;



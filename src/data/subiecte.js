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
];

export default subiecteList;



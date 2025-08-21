const subiecteList = [
    {
        titlu: 'Analiza unui text literar',
        descriere: 'Analizează un text literar din perspectiva tematică, stilistică și a compoziției. Identifică elementele specifice genului literar și argumentează cu exemple din text.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2024',
        an: 2024,
        tip: 'analiza'
    },
    {
        titlu: `Grigore Băjenaru, 
        Părintele „Geticei” `,
        descriere: 'Citește urmatorul fragment al lui Grigore Băjenaru și rezolvă cerințele date.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2025',
        an: 2025,
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
        punctaj: [5, 5, 5, 5, 5]
    },
    {
        titlu: 'Analiza unui text literar',
        descriere: 'Analizează un text literar din perspectiva tematică, stilistică și a compoziției. Identifică elementele specifice genului literar și argumentează cu exemple din text.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'uman',
        data: '2024',
        an: 2024,
        tip: 'analiza'
    },
    {
        titlu: 'Analiza unui text literar',
        descriere: 'Analizează un text literar din perspectiva tematică, stilistică și a compoziției. Identifică elementele specifice genului literar și argumentează cu exemple din text.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'uman',
        data: '2024',
        an: 2024,
        tip: 'analiza'
    },
    {
        titlu: 'Compoziția pe o temă dată',
        descriere: 'Scrie o compoziție pe o temă dată, folosind exemple din literatura română și universală. Demonstrează cunoștințele literare și capacitatea de argumentare.',
        numarSubiect: 2,
        profil: 'uman',
        data: '2024',
        an: 2024,
        tip: 'compozitie'
    },
    {
        titlu: 'Compoziția pe o temă dată',
        descriere: 'Scrie o compoziție pe o temă dată, folosind exemple din literatura română și universală. Demonstrează cunoștințele literare și capacitatea de argumentare.',
        numarSubiect: 2,
        profil: 'real',
        data: '2024',
        an: 2024,
        tip: 'compozitie'
    },
    {
        titlu: 'Analiza comparativă',
        descriere: 'Realizează o analiză comparativă între două opere literare, evidențiind asemănările și deosebirile din perspectiva tematică, stilistică și a compoziției.',
        numarSubiect: 3,
        profil: 'uman',
        data: '2024',
        an: 2024,
        tip: 'comparativ'
    },
    {
        titlu: 'Analiza comparativă',
        descriere: 'Realizează o analiză comparativă între două opere literare, evidențiind asemănările și deosebirile din perspectiva tematică, stilistică și a compoziției.',
        numarSubiect: 3,
        profil: 'real',
        data: '2024',
        an: 2024,
        tip: 'comparativ'
    },
    {
        titlu: 'Analiza unui text literar',
        descriere: 'Analizează un text literar din perspectiva tematică, stilistică și a compoziției. Identifică elementele specifice genului literar și argumentează cu exemple din text.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'uman',
        data: '2023',
        an: 2023,
        tip: 'analiza'
    },
    {
        titlu: 'Analiza unui text literar',
        descriere: 'Analizează un text literar din perspectiva tematică, stilistică și a compoziției. Identifică elementele specifice genului literar și argumentează cu exemple din text.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2023',
        an: 2023,
        tip: 'analiza'
    },
    {
        titlu: 'Analiza unui text literar',
        descriere: 'Analizează un text literar din perspectiva tematică, stilistică și a compoziției. Identifică elementele specifice genului literar și argumentează cu exemple din text.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2023',
        an: 2023,
        tip: 'analiza'
    },
    {
        titlu: 'Analiza unui text literar',
        descriere: 'Analizează un text literar din perspectiva tematică, stilistică și a compoziției. Identifică elementele specifice genului literar și argumentează cu exemple din text.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'uman',
        data: '2023',
        an: 2023,
        tip: 'analiza'
    },
    {
        titlu: 'Compoziția pe o temă dată',
        descriere: 'Scrie o compoziție pe o temă dată, folosind exemple din literatura română și universală. Demonstrează cunoștințele literare și capacitatea de argumentare.',
        numarSubiect: 2,
        profil: 'uman',
        data: '2023',
        an: 2023,
        tip: 'compozitie'
    },
    {
        titlu: 'Compoziția pe o temă dată',
        descriere: 'Scrie o compoziție pe o temă dată, folosind exemple din literatura română și universală. Demonstrează cunoștințele literare și capacitatea de argumentare.',
        numarSubiect: 2,
        profil: 'real',
        data: '2023',
        an: 2023,
        tip: 'compozitie'
    },
    {
        titlu: 'Analiza comparativă',
        descriere: 'Realizează o analiză comparativă între două opere literare, evidențiind asemănările și deosebirile din perspectiva tematică, stilistică și a compoziției.',
        numarSubiect: 3,
        profil: 'uman',
        data: '2023',
        an: 2023,
        tip: 'comparativ'
    },
    {
        titlu: 'Analiza comparativă',
        descriere: 'Realizează o analiză comparativă între două opere literare, evidențiind asemănările și deosebirile din perspectiva tematică, stilistică și a compoziției.',
        numarSubiect: 3,
        profil: 'real',
        data: '2023',
        an: 2023,
        tip: 'comparativ'
    },
    {
        titlu: 'Analiza unui text literar',
        descriere: 'Analizează un text literar din perspectiva tematică, stilistică și a compoziției. Identifică elementele specifice genului literar și argumentează cu exemple din text.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'uman',
        data: '2022',
        an: 2022,
        tip: 'analiza'
    },
    {
        titlu: 'Analiza unui text literar',
        descriere: 'Analizează un text literar din perspectiva tematică, stilistică și a compoziției. Identifică elementele specifice genului literar și argumentează cu exemple din text.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2022',
        an: 2022,
        tip: 'analiza'
    },
    {
        titlu: 'Analiza unui text literar',
        descriere: 'Analizează un text literar din perspectiva tematică, stilistică și a compoziției. Identifică elementele specifice genului literar și argumentează cu exemple din text.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2022',
        an: 2022,
        tip: 'analiza'
    },
    {
        titlu: 'Analiza unui text literar',
        descriere: 'Analizează un text literar din perspectiva tematică, stilistică și a compoziției. Identifică elementele specifice genului literar și argumentează cu exemple din text.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'uman',
        data: '2022',
        an: 2022,
        tip: 'analiza'
    },
    {
        titlu: 'Compoziția pe o temă dată',
        descriere: 'Scrie o compoziție pe o temă dată, folosind exemple din literatura română și universală. Demonstrează cunoștințele literare și capacitatea de argumentare.',
        numarSubiect: 2,
        profil: 'uman',
        data: '2022',
        an: 2022,
        tip: 'compozitie'
    },
    {
        titlu: 'Compoziția pe o temă dată',
        descriere: 'Scrie o compoziție pe o temă dată, folosind exemple din literatura română și universală. Demonstrează cunoștințele literare și capacitatea de argumentare.',
        numarSubiect: 2,
        profil: 'real',
        data: '2022',
        an: 2022,
        tip: 'compozitie'
    },
    {
        titlu: 'Analiza comparativă',
        descriere: 'Realizează o analiză comparativă între două opere literare, evidențiind asemănările și deosebirile din perspectiva tematică, stilistică și a compoziției.',
        numarSubiect: 3,
        profil: 'uman',
        data: '2022',
        an: 2022,
        tip: 'comparativ'
    },
    {
        titlu: 'Analiza comparativă',
        descriere: 'Realizează o analiză comparativă între două opere literare, evidențiind asemănările și deosebirile din perspectiva tematică, stilistică și a compoziției.',
        numarSubiect: 3,
        profil: 'real',
        data: '2022',
        an: 2022,
        tip: 'comparativ'
    },
    {
        titlu: 'Analiza unui text literar',
        descriere: 'Analizează un text literar din perspectiva tematică, stilistică și a compoziției. Identifică elementele specifice genului literar și argumentează cu exemple din text.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'uman',
        data: '2021',
        an: 2021,
        tip: 'analiza'
    },
    {
        titlu: 'Analiza unui text literar',
        descriere: 'Analizează un text literar din perspectiva tematică, stilistică și a compoziției. Identifică elementele specifice genului literar și argumentează cu exemple din text.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'real',
        data: '2021',
        an: 2021,
        tip: 'analiza'
    },
    {
        titlu: 'Analiza unui text literar',
        descriere: 'Analizează un text literar din perspectiva tematică, stilistică și a compoziției. Identifică elementele specifice genului literar și argumentează cu exemple din text.',
        numarSubiect: 1,
        subpunct: 'A',
        profil: 'real',
        data: '2021',
        an: 2021,
        tip: 'analiza'
    },
    {
        titlu: 'Analiza unui text literar',
        descriere: 'Analizează un text literar din perspectiva tematică, stilistică și a compoziției. Identifică elementele specifice genului literar și argumentează cu exemple din text.',
        numarSubiect: 1,
        subpunct: 'B',
        profil: 'uman',
        data: '2021',
        an: 2021,
        tip: 'analiza'
    },
    {
        titlu: 'Compoziția pe o temă dată',
        descriere: 'Scrie o compoziție pe o temă dată, folosind exemple din literatura română și universală. Demonstrează cunoștințele literare și capacitatea de argumentare.',
        numarSubiect: 2,
        profil: 'uman',
        data: '2021',
        an: 2021,
        tip: 'compozitie'
    },
    {
        titlu: 'Compoziția pe o temă dată',
        descriere: 'Scrie o compoziție pe o temă dată, folosind exemple din literatura română și universală. Demonstrează cunoștințele literare și capacitatea de argumentare.',
        numarSubiect: 2,
        profil: 'real',
        data: '2021',
        an: 2021,
        tip: 'compozitie'
    },
    {
        titlu: 'Analiza comparativă',
        descriere: 'Realizează o analiză comparativă între două opere literare, evidențiind asemănările și deosebirile din perspectiva tematică, stilistică și a compoziției.',
        numarSubiect: 3,
        profil: 'uman',
        data: '2021',
        an: 2021,
        tip: 'comparativ'
    },
    {
        titlu: 'Analiza comparativă',
        descriere: 'Realizează o analiză comparativă între două opere literare, evidențiind asemănările și deosebirile din perspectiva tematică, stilistică și a compoziției.',
        numarSubiect: 3,
        profil: 'real',
        data: '2021',
        an: 2021,
        tip: 'comparativ'
    }
];

export default subiecteList;



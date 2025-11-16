// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Layout from '../assets/Layout';
// import { addScriitor, updateScriitor, fetchScriitor } from '../firebase/scriitoriService';
// import { scriitoriOpere } from '../data/scriitoriOpere';
// import { scriitoriPrezentare } from '../data/scriitoriPrezentare';
// import { getScriitorBiografie } from '../data/biografie/index.js';
// import '../styles/style.scss';

// // Import toate datele scriitorilor
// import eminescu from '../data/eminescu.js';
// import creanga from '../data/creanga.js';
// import caragiale from '../data/caragiale.js';
// import slavici from '../data/slavici.js';
// import rebreanu from '../data/rebreanu.js';
// import calinescu from '../data/calinescu.js';
// import petrescu from '../data/petrescu.js';
// import barbu from '../data/barbu.js';
// import blaga from '../data/blaga.js';
// import arghezi from '../data/arghezi.js';
// import bacovia from '../data/bacovia.js';
// import sadoveanu from '../data/sadoveanu.js';
// import preda from '../data/preda.js';
// import stanescu from '../data/stanescu.js';
// import sorescu from '../data/sorescu.js';
// import maiorescu from '../data/maiorescu.js';
// import eliade from '../data/eliade.js';
// import negruzzi from '../data/negruzzi.js';
// import pillat from '../data/pillat.js';
// import voiculescu from '../data/voiculescu.js';
// import veronica from '../data/veronica.js';
// import lovinescu from '../data/lovinescu.js';

// const scriitoriData = {
//   eminescu,
//   creanga,
//   caragiale,
//   slavici,
//   rebreanu,
//   calinescu,
//   petrescu,
//   barbu,
//   blaga,
//   arghezi,
//   bacovia,
//   sadoveanu,
//   preda,
//   stanescu,
//   sorescu,
//   maiorescu,
//   eliade,
//   negruzzi,
//   pillat,
//   voiculescu,
//   veronica,
//   lovinescu,
// };

// const MigrateScriitori = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState({ current: 0, total: 0, currentName: '' });
//   const [results, setResults] = useState([]);
//   const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');

//   const migrateAll = async () => {
//     setLoading(true);
//     setResults([]);
//     const scriitoriKeys = Object.keys(scriitoriData);
//     setProgress({ current: 0, total: scriitoriKeys.length, currentName: '' });

//     const newResults = [];

//     for (let i = 0; i < scriitoriKeys.length; i++) {
//       const key = scriitoriKeys[i];
//       const scriitor = scriitoriData[key];

//       try {
//         setProgress({
//           current: i + 1,
//           total: scriitoriKeys.length,
//           currentName: scriitor.nume || key,
//         });

//         // Pregătește datele pentru salvare
//         // Asigură-te că postările sunt incluse corect
//         const posts = Array.isArray(scriitor.posts) ? scriitor.posts : [];
//         const friends = Array.isArray(scriitor.friends) ? scriitor.friends : [];
//         const gallery = Array.isArray(scriitor.gallery) ? scriitor.gallery : [];
        
//         // Adaugă datele din opere, prezentare și biografie
//         const opere = scriitoriOpere[key] || {};
//         const prezentare = scriitoriPrezentare[key] || null;
//         const biografie = getScriitorBiografie(key) || '';
        
//         // Extrage informațiile info din fallback
//         const scriitoriInfoFallback = {
//           eminescu: {
//             ocupatie: 'Poet, prozator, jurnalist și publicist',
//             studii: 'Studii la Viena și Berlin',
//             activitate: 'Redactor la "Curierul de Iași"',
//             locNastere: 'Născut în Ipotești, Botoșani',
//             perioada: '1850-1889',
//             opere: '"Luceafărul", "Scrisori", "Poezii"'
//           },
//           caragiale: {
//             ocupatie: 'Dramaturg, prozator și jurnalist',
//             studii: 'Redactor la "Moftul Român"',
//             activitate: 'Director al Teatrului Național',
//             locNastere: 'Născut în Haimanalele, Prahova',
//             perioada: '1852-1912',
//             opere: '"O scrisoare pierdută", "Momente și schițe"'
//           },
//           creanga: {
//             ocupatie: 'Prozator, memorialist și pedagog',
//             studii: 'Seminarist la Socola',
//             activitate: 'Învățător în Humulești',
//             locNastere: 'Născut în Humulești, Neamț',
//             perioada: '1837-1889',
//             opere: '"Amintiri din copilărie", "Povești"'
//           },
//           slavici: {
//             ocupatie: 'Prozator, jurnalist și publicist',
//             studii: 'Redactor la "Tribuna"',
//             activitate: 'Senator în Parlamentul României',
//             locNastere: 'Născut în Șiria, Arad',
//             perioada: '1848-1925',
//             opere: '"Moara cu noroc", "Mara"'
//           },
//           rebreanu: {
//             ocupatie: 'Romancier, dramaturg și jurnalist',
//             studii: 'Redactor la "România Literară"',
//             activitate: 'Director al Teatrului Național',
//             locNastere: 'Născut în Târlișua, Bistrița-Năsăud',
//             perioada: '1885-1944',
//             opere: '"Ion", "Pădurea spânzuraților"'
//           },
//           calinescu: {
//             ocupatie: 'Critic literar, istoric și romancier',
//             studii: 'Studii la București și Paris',
//             activitate: 'Profesor universitar',
//             locNastere: 'Născut în București',
//             perioada: '1899-1965',
//             opere: '"Enigma Otiliei", "Istoria literaturii române"'
//           },
//           petrescu: {
//             ocupatie: 'Romancier, dramaturg și eseist',
//             studii: 'Studii la București',
//             activitate: 'Profesor universitar',
//             locNastere: 'Născut în Băneasa, Giurgiu',
//             perioada: '1894-1957',
//             opere: '"Ultima noapte de dragoste", "Patul lui Procust"'
//           },
//           barbu: {
//             ocupatie: 'Poet și matematician',
//             studii: 'Studii de matematică la București',
//             activitate: 'Profesor universitar',
//             locNastere: 'Născut în Câmpulung-Muscel',
//             perioada: '1895-1961',
//             opere: '"Joc secund", "Iseo"'
//           },
//           blaga: {
//             ocupatie: 'Poet, filozof și dramaturg',
//             studii: 'Studii la Viena și Cluj',
//             activitate: 'Profesor universitar',
//             locNastere: 'Născut în Lancrăm, Alba',
//             perioada: '1895-1961',
//             opere: '"Poemele luminii", "Trilogia culturii"'
//           },
//           arghezi: {
//             ocupatie: 'Poet, prozator și jurnalist',
//             studii: 'Studii la București',
//             activitate: 'Redactor la "Bilete de papagal"',
//             locNastere: 'Născut în București',
//             perioada: '1880-1967',
//             opere: '"Cuvinte potrivite", "Flori de mucigai"'
//           },
//           bacovia: {
//             ocupatie: 'Poet simbolist',
//             studii: 'Studii la București',
//             activitate: 'Funcționar public',
//             locNastere: 'Născut în Bacău',
//             perioada: '1881-1957',
//             opere: '"Plumb", "Scântei galbene"'
//           },
//           sadoveanu: {
//             ocupatie: 'Romancier și nuvelist',
//             studii: 'Studii la Iași',
//             activitate: 'Președinte al Uniunii Scriitorilor',
//             locNastere: 'Născut în Pașcani, Iași',
//             perioada: '1880-1961',
//             opere: '"Baltagul", "Hanul Ancutei"'
//           },
//           preda: {
//             ocupatie: 'Romancier și jurnalist',
//             studii: 'Studii la București',
//             activitate: 'Redactor la "România Literară"',
//             locNastere: 'Născut în Siliștea-Gumești, Teleorman',
//             perioada: '1922-1980',
//             opere: '"Moromeții", "Cel mai iubit dintre pământeni"'
//           },
//           stanescu: {
//             ocupatie: 'Poet și eseist',
//             studii: 'Studii la București',
//             activitate: 'Redactor la "România Literară"',
//             locNastere: 'Născut în Ploiești',
//             perioada: '1933-1983',
//             opere: '"11 elegii", "Noduri și semne"'
//           },
//           sorescu: {
//             ocupatie: 'Poet, dramaturg și eseist',
//             studii: 'Studii la Iași',
//             activitate: 'Redactor la "România Literară"',
//             locNastere: 'Născut în Bulzești, Dolj',
//             perioada: '1936-1996',
//             opere: '"Singur printre poeți", "Iona"'
//           },
//           maiorescu: {
//             ocupatie: 'Critic literar și filozof',
//             studii: 'Studii la Viena și Berlin',
//             activitate: 'Ministru al Educației',
//             locNastere: 'Născut în Craiova',
//             perioada: '1840-1917',
//             opere: '"Critice", "Istoria literaturii române"'
//           },
//           lovinescu: {
//             ocupatie: 'Critic literar și istoric',
//             studii: 'Studii la București',
//             activitate: 'Profesor universitar',
//             locNastere: 'Născut în Fălticeni',
//             perioada: '1881-1943',
//             opere: '"Istoria literaturii române", "Critice"'
//           },
//           eliade: {
//             ocupatie: 'Romancier, eseist și istoric al religiilor',
//             studii: 'Studii la București și Calcutta',
//             activitate: 'Profesor universitar',
//             locNastere: 'Născut în București',
//             perioada: '1907-1986',
//             opere: '"Maitreyi", "Noaptea de Sânziene"'
//           },
//           negruzzi: {
//             ocupatie: 'Prozator și dramaturg',
//             studii: 'Studii la Iași',
//             activitate: 'Președinte al Divanului Moldovei',
//             locNastere: 'Născut în Trifești, Neamț',
//             perioada: '1808-1868',
//             opere: '"Alexandru Lăpușneanu", "Zodia"'
//           },
//           pillat: {
//             ocupatie: 'Poet și traducător',
//             studii: 'Studii la București',
//             activitate: 'Redactor la "Convorbiri Literare"',
//             locNastere: 'Născut în București',
//             perioada: '1891-1945',
//             opere: '"Pe Argeș în sus", "Vatra"'
//           },
//           voiculescu: {
//             ocupatie: 'Poet și dramaturg',
//             studii: 'Studii de medicină la București',
//             activitate: 'Medic și scriitor',
//             locNastere: 'Născut în Pârscov, Buzău',
//             perioada: '1884-1963',
//             opere: '"Shakespeare", "Zahei orbul"'
//           },
//           veronica: {
//             ocupatie: 'Poetă și scriitoare',
//             studii: 'Studii la Iași și Viena',
//             activitate: 'Muza și iubita lui Mihai Eminescu',
//             locNastere: 'Născută în Năsăud, Transilvania',
//             perioada: '1850-1889',
//             opere: '"Scrisori către Eminescu", "Poezii", "Răsunetul inimii"'
//           }
//         };
//         const info = scriitoriInfoFallback[key] || null;
        
//         // Ordinea scriitorilor conform imaginii
//         const ordineMap = {
//           'creanga': 1,      // Ion Creangă
//           'eminescu': 2,     // Mihai Eminescu
//           'caragiale': 3,    // I.L. Caragiale
//           'slavici': 4,      // Ioan Slavici
//           'rebreanu': 5,     // Liviu Rebreanu
//           'calinescu': 6,    // George Călinescu
//           'bacovia': 7,      // George Bacovia
//           'sadoveanu': 8,    // Mihail Sadoveanu
//           'petrescu': 9,     // Camil Petrescu
//           'arghezi': 10,     // Tudor Arghezi
//           'blaga': 11,       // Lucian Blaga
//           'barbu': 12,       // Ion Barbu
//           'preda': 13,       // Marin Preda
//           'stanescu': 14,    // Nichita Stănescu
//           'sorescu': 15,     // Marin Sorescu
//           'maiorescu': 16,   // Titu Maiorescu
//           'lovinescu': 17,   // Eugen Lovinescu
//           'eliade': 18,      // Mircea Eliade
//           'negruzzi': 19,    // Costache Negruzzi
//           'pillat': 20,      // Ion Pillat
//           'voiculescu': 21,  // Vasile Voiculescu
//           'veronica': 22,    // Veronica Micle
//         };
//         const ordine = ordineMap[key] || 999;
        
//         // Categorii și canonic pentru fiecare scriitor (din fallback list)
//         const categorieMap = {
//           'eminescu': 'poezie',
//           'creanga': 'basm',
//           'caragiale': 'comedie',
//           'slavici': 'roman',
//           'rebreanu': 'roman',
//           'calinescu': 'roman',
//           'petrescu': 'roman',
//           'barbu': 'poezie',
//           'blaga': 'poezie',
//           'arghezi': 'poezie',
//           'bacovia': 'poezie',
//           'sadoveanu': 'roman',
//           'preda': 'roman',
//           'stanescu': 'poezie',
//           'sorescu': 'poezie',
//           'maiorescu': 'critica',
//           'eliade': 'critica',
//           'negruzzi': 'roman',
//           'pillat': 'poezie',
//           'voiculescu': 'poezie',
//           'veronica': 'poezie',
//           'lovinescu': 'critica',
//         };
        
//         const canonicMap = {
//           'eminescu': true,
//           'creanga': true,
//           'caragiale': true,
//           'slavici': true,
//           'rebreanu': true,
//           'calinescu': true,
//           'petrescu': true,
//           'barbu': true,
//           'blaga': true,
//           'arghezi': true,
//           'bacovia': true,
//           'sadoveanu': true,
//           'preda': true, // Marin Preda este canonic conform fallback
//           'stanescu': true, // Nichita Stănescu este canonic conform fallback
//           'sorescu': true, // Marin Sorescu este canonic conform fallback
//           'maiorescu': true,
//           'eliade': false, // Mircea Eliade este necanonic conform fallback
//           'negruzzi': false,
//           'pillat': false,
//           'voiculescu': false,
//           'veronica': false,
//           'lovinescu': true, // Eugen Lovinescu este canonic conform fallback
//         };
        
//         const categorie = categorieMap[key] || scriitor.categorie || '';
//         const canonic = canonicMap[key] !== undefined ? canonicMap[key] : (scriitor.canonic !== undefined ? scriitor.canonic : true);
        
//         // Date (anii de viață) din fallback list
//         const dateMap = {
//           'eminescu': '1850 – 1889',
//           'creanga': '1837 – 1889',
//           'caragiale': '1852 – 1912',
//           'slavici': '1848 – 1925',
//           'rebreanu': '1885 – 1944',
//           'calinescu': '1899 – 1965',
//           'petrescu': '1894 – 1957',
//           'barbu': '1895 – 1961',
//           'blaga': '1895 – 1961',
//           'arghezi': '1880 – 1967',
//           'bacovia': '1881 – 1957',
//           'sadoveanu': '1880 – 1961',
//           'preda': '1922 – 1980',
//           'stanescu': '1933 – 1983',
//           'sorescu': '1936 – 1996',
//           'maiorescu': '1840 – 1917',
//           'eliade': '1907 – 1986',
//           'negruzzi': '1808 – 1868',
//           'pillat': '1891 – 1945',
//           'voiculescu': '1884 – 1963',
//           'veronica': '1850 – 1889',
//           'lovinescu': '1881 – 1943',
//         };
//         const date = dateMap[key] || scriitor.date || '';
        
//         // Funcție pentru a elimina valorile undefined
//         const cleanObject = (obj) => {
//           if (obj === null || typeof obj !== 'object') {
//             return obj;
//           }
//           if (Array.isArray(obj)) {
//             return obj.map(item => cleanObject(item));
//           }
//           const cleaned = {};
//           for (const key in obj) {
//             if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
//               cleaned[key] = cleanObject(obj[key]);
//             }
//           }
//           return cleaned;
//         };
        
//         // Curăță toate valorile undefined din obiect
//         const cleanedScriitor = cleanObject(scriitor);
        
//         const dataToSave = {
//           ...cleanedScriitor,
//           key: key,
//           // Asigură-te că toate câmpurile necesare există
//           friends: friends,
//           gallery: gallery,
//           posts: posts, // Postările trebuie să fie un array
//           opere: opere,
//           prezentare: prezentare,
//           biografie: biografie,
//           info: info, // Informațiile pentru afișare înainte de Prezentare
//           ordine: ordine,
//           categorie: categorie,
//           canonic: canonic,
//           // Păstrează datele existente sau folosește cele din scriitor
//           nume: scriitor.nume || cleanedScriitor.nume || '',
//           date: date || scriitor.date || cleanedScriitor.date || '',
//           img: scriitor.img || cleanedScriitor.img || '',
//           banner: scriitor.banner || cleanedScriitor.banner || '',
//           color: scriitor.color || cleanedScriitor.color || 'rgba(255,179,71,0.82)',
//         };

//         console.log(`Migrating ${scriitor.nume}: ${posts.length} posts`);
        
//         // Verifică dacă scriitorul există deja
//         const existingScriitor = await fetchScriitor(key);
        
//         if (existingScriitor) {
//           // Dacă există, actualizează doar postările (și alte date dacă lipsesc)
//           await updateScriitor(key, {
//             posts: posts,
//             friends: friends,
//             gallery: gallery,
//             opere: opere,
//             prezentare: prezentare,
//             biografie: biografie,
//             info: info, // Informațiile pentru afișare înainte de Prezentare
//             ordine: ordine,
//             categorie: categorie,
//             canonic: canonic,
//             // Păstrează celelalte date existente
//             nume: scriitor.nume || existingScriitor.nume,
//             date: date || scriitor.date || existingScriitor.date,
//             img: scriitor.img || existingScriitor.img,
//             banner: scriitor.banner || existingScriitor.banner,
//             color: scriitor.color || existingScriitor.color || 'rgba(255,179,71,0.82)',
//           });
//           console.log(`✅ Updated ${scriitor.nume} with ${posts.length} posts`);
//         } else {
//           // Dacă nu există, adaugă-l complet
//           await addScriitor(dataToSave);
//           console.log(`✅ Added ${scriitor.nume} with ${posts.length} posts`);
//         }

//         newResults.push({
//           key,
//           nume: scriitor.nume || key,
//           status: 'success',
//           message: `Migrat cu succes - ${scriitor.posts?.length || 0} postări, ${scriitor.friends?.length || 0} prieteni`,
//         });
//       } catch (error) {
//         console.error(`Error migrating ${key}:`, error);
//         newResults.push({
//           key,
//           nume: scriitor.nume || key,
//           status: 'error',
//           message: `Eroare: ${error.message}`,
//         });
//       }

//       setResults([...newResults]);
//     }

//     setLoading(false);
//     setProgress({ current: 0, total: 0, currentName: '' });
    
//     // Cache clearing no longer needed - data is now loaded directly from Firestore
//   };

//   return (
//     <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
//       <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
//         <h1>Migrare Scriitori în Firestore</h1>
//         <p style={{ marginBottom: '20px' }}>
//           Acest script va transfera toate datele scriitorilor din fișierele locale în Firestore.
//         </p>

//         <button
//           onClick={migrateAll}
//           disabled={loading}
//           style={{
//             padding: '12px 24px',
//             fontSize: '16px',
//             backgroundColor: darkTheme ? '#a97c50' : '#ffd591',
//             color: darkTheme ? '#fff' : '#4e2e1e',
//             border: 'none',
//             borderRadius: '8px',
//             cursor: loading ? 'not-allowed' : 'pointer',
//             marginBottom: '20px',
//             opacity: loading ? 0.6 : 1,
//           }}
//         >
//           {loading ? 'Se migrează...' : 'Începe Migrarea'}
//         </button>

//         {loading && progress.total > 0 && (
//           <div style={{ marginBottom: '20px' }}>
//             <p>
//               Progres: {progress.current} / {progress.total}
//             </p>
//             <p>Scriitor curent: {progress.currentName}</p>
//             <div
//               style={{
//                 width: '100%',
//                 height: '20px',
//                 backgroundColor: darkTheme ? '#4e2e1e' : '#ececec',
//                 borderRadius: '10px',
//                 overflow: 'hidden',
//                 marginTop: '10px',
//               }}
//             >
//               <div
//                 style={{
//                   width: `${(progress.current / progress.total) * 100}%`,
//                   height: '100%',
//                   backgroundColor: darkTheme ? '#a97c50' : '#ffd591',
//                   transition: 'width 0.3s',
//                 }}
//               />
//             </div>
//           </div>
//         )}

//         {results.length > 0 && (
//           <div>
//             <h2>Rezultate:</h2>
//             <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
//               {results.map((result, idx) => (
//                 <div
//                   key={idx}
//                   style={{
//                     padding: '10px',
//                     marginBottom: '10px',
//                     backgroundColor:
//                       result.status === 'success'
//                         ? darkTheme
//                           ? 'rgba(0, 200, 0, 0.2)'
//                           : 'rgba(0, 200, 0, 0.1)'
//                         : darkTheme
//                         ? 'rgba(200, 0, 0, 0.2)'
//                         : 'rgba(200, 0, 0, 0.1)',
//                     borderRadius: '8px',
//                     border: `1px solid ${
//                       result.status === 'success'
//                         ? darkTheme
//                           ? 'rgba(0, 200, 0, 0.5)'
//                           : 'rgba(0, 200, 0, 0.3)'
//                         : darkTheme
//                         ? 'rgba(200, 0, 0, 0.5)'
//                         : 'rgba(200, 0, 0, 0.3)'
//                     }`,
//                   }}
//                 >
//                   <strong>{result.nume}</strong> ({result.key})
//                   <br />
//                   <span style={{ fontSize: '14px', color: darkTheme ? '#ccc' : '#666' }}>
//                     {result.message}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
//           <button
//             onClick={() => {
//               window.location.reload();
//             }}
//             style={{
//               padding: '10px 20px',
//               fontSize: '14px',
//               backgroundColor: darkTheme ? '#a97c50' : '#ffd591',
//               color: darkTheme ? '#fff' : '#4e2e1e',
//               border: 'none',
//               borderRadius: '8px',
//               cursor: 'pointer',
//             }}
//           >
//             🔄 Reîncarcă Pagina (pentru a vedea datele migrate)
//           </button>
//           <button
//             onClick={() => navigate('/admin?tab=scriitori')}
//             style={{
//               padding: '10px 20px',
//               fontSize: '14px',
//               backgroundColor: darkTheme ? '#4e2e1e' : '#ececec',
//               color: darkTheme ? '#fff' : '#222',
//               border: 'none',
//               borderRadius: '8px',
//               cursor: 'pointer',
//             }}
//           >
//             Mergi la Panoul de Admin
//           </button>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default MigrateScriitori;


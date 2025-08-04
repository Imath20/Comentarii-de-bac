import React from 'react';

const ScriitorInfo = ({ name }) => {
  const scriitoriInfo = {
    eminescu: {
      ocupatie: 'Poet, prozator, jurnalist și publicist',
      studii: 'Studii la Viena și Berlin',
      activitate: 'Redactor la "Curierul de Iași"',
      locNastere: 'Născut în Ipotești, Botoșani',
      perioada: '1850-1889',
      opere: '"Luceafărul", "Scrisori", "Poezii"'
    },
    caragiale: {
      ocupatie: 'Dramaturg, prozator și jurnalist',
      studii: 'Redactor la "Moftul Român"',
      activitate: 'Director al Teatrului Național',
      locNastere: 'Născut în Haimanalele, Prahova',
      perioada: '1852-1912',
      opere: '"O scrisoare pierdută", "Momente și schițe"'
    },
    creanga: {
      ocupatie: 'Prozator, memorialist și pedagog',
      studii: 'Seminarist la Socola',
      activitate: 'Învățător în Humulești',
      locNastere: 'Născut în Humulești, Neamț',
      perioada: '1837-1889',
      opere: '"Amintiri din copilărie", "Povești"'
    },
    slavici: {
      ocupatie: 'Prozator, jurnalist și publicist',
      studii: 'Redactor la "Tribuna"',
      activitate: 'Senator în Parlamentul României',
      locNastere: 'Născut în Șiria, Arad',
      perioada: '1848-1925',
      opere: '"Moara cu noroc", "Mara"'
    },
    rebreanu: {
      ocupatie: 'Romancier, dramaturg și jurnalist',
      studii: 'Redactor la "România Literară"',
      activitate: 'Director al Teatrului Național',
      locNastere: 'Născut în Târlișua, Bistrița-Năsăud',
      perioada: '1885-1944',
      opere: '"Ion", "Pădurea spânzuraților"'
    },
    calinescu: {
      ocupatie: 'Critic literar, istoric și romancier',
      studii: 'Profesor la Universitatea din București',
      activitate: 'Director al Bibliotecii Academiei',
      locNastere: 'Născut în Buzău',
      perioada: '1899-1965',
      opere: '"Istoria literaturii române", "Enigma Otiliei"'
    },
    petrescu: {
      ocupatie: 'Romancier, dramaturg și filozof',
      studii: 'Studii la Universitatea din București',
      activitate: 'Redactor la "Viața Românească"',
      locNastere: 'Născut în București',
      perioada: '1894-1957',
      opere: '"Ultima noapte de dragoste, întâia noapte de război", "Patul lui Procust"'
    },
    barbu: {
      ocupatie: 'Poet și matematician',
      studii: 'Studii de matematică la București',
      activitate: 'Profesor la Universitatea din București',
      locNastere: 'Născut în București',
      perioada: '1895-1961',
      opere: '"Joc secund", "Cântecul focului"'
    },
    blaga: {
      ocupatie: 'Poet, dramaturg și filozof',
      studii: 'Studii la Viena și Cluj',
      activitate: 'Profesor la Universitatea din Cluj',
      locNastere: 'Născut în Lăncișoara, Alba',
      perioada: '1895-1961',
      opere: '"Poemele luminii", "Meșterul Manole"'
    },
    arghezi: {
      ocupatie: 'Poet, prozator și jurnalist',
      studii: 'Studii la seminariul din București',
      activitate: 'Redactor la "Bilete de papagal"',
      locNastere: 'Născut în București',
      perioada: '1880-1967',
      opere: '"Cuvinte potrivite", "Flori de mucigai"'
    },
    bacovia: {
      ocupatie: 'Poet simbolist',
      studii: 'Studii la București și Iași',
      activitate: 'Avocat și funcționar public',
      locNastere: 'Născut în Bacău',
      perioada: '1881-1957',
      opere: '"Plumb", "Lacustră", "Scântei galbene"'
    },
    sadoveanu: {
      ocupatie: 'Prozator și jurnalist',
      studii: 'Studii la Iași',
      activitate: 'Președinte al Uniunii Scriitorilor',
      locNastere: 'Născut în Pașcani, Iași',
      perioada: '1880-1961',
      opere: '"Baltagul", "Hanu Ancuței", "Creanga de aur"'
    },
    preda: {
      ocupatie: 'Romancier și jurnalist',
      studii: 'Studii la București',
      activitate: 'Redactor la "România Literară"',
      locNastere: 'Născut în Siliștea Gumești, Teleorman',
      perioada: '1922-1980',
      opere: '"Moromeții", "Cel mai iubit dintre pământeni"'
    },
    stanescu: {
      ocupatie: 'Poet și eseist',
      studii: 'Studii la București',
      activitate: 'Redactor la "Gazeta Literară"',
      locNastere: 'Născut în Ploiești',
      perioada: '1933-1983',
      opere: '"11 elegii", "O viziune a sentimentelor"'
    },
    sorescu: {
      ocupatie: 'Poet, dramaturg și eseist',
      studii: 'Studii la București',
      activitate: 'Redactor la "România Literară"',
      locNastere: 'Născut în Bulzești, Dolj',
      perioada: '1936-1996',
      opere: '"Singur printre poeți", "Iona"'
    },
    maiorescu: {
      ocupatie: 'Critic literar și politician',
      studii: 'Studii la Viena și Berlin',
      activitate: 'Ministru al Instrucțiunii Publice',
      locNastere: 'Născut în Craiova',
      perioada: '1840-1917',
      opere: '"Critice", "Istoria literaturii române"'
    },
    eliade: {
      ocupatie: 'Romancier, istoric al religiilor și eseist',
      studii: 'Studii la București și Calcutta',
      activitate: 'Profesor la Universitatea din Chicago',
      locNastere: 'Născut în București',
      perioada: '1907-1986',
      opere: '"Maitreyi", "Noaptea de Sânziene"'
    },
    negruzzi: {
      ocupatie: 'Prozator și dramaturg',
      studii: 'Studii la Iași',
      activitate: 'Președinte al Divanului Moldovei',
      locNastere: 'Născut în Trifești, Neamț',
      perioada: '1808-1868',
      opere: '"Alexandru Lăpușneanu", "Zodia"'
    },
    pillat: {
      ocupatie: 'Poet și traducător',
      studii: 'Studii la București',
      activitate: 'Redactor la "Convorbiri Literare"',
      locNastere: 'Născut în București',
      perioada: '1891-1945',
      opere: '"Pe Argeș în sus", "Vatra"'
    },
    voiculescu: {
      ocupatie: 'Poet și dramaturg',
      studii: 'Studii de medicină la București',
      activitate: 'Medic și scriitor',
      locNastere: 'Născut în Pârscov, Buzău',
      perioada: '1884-1963',
      opere: '"Shakespeare", "Zahei orbul"'
    }
  };

  const info = scriitoriInfo[name];
  
  if (!info) {
    return null;
  }

  return (
    <>
      <div style={{ marginBottom: '0.8rem' }}>
        <span style={{ color: '#a97c50', fontWeight: 600 }}>📚</span> {info.ocupatie}
      </div>
      <div style={{ marginBottom: '0.8rem' }}>
        <span style={{ color: '#a97c50', fontWeight: 600 }}>🎓</span> {info.studii}
      </div>
      <div style={{ marginBottom: '0.8rem' }}>
        <span style={{ color: '#a97c50', fontWeight: 600 }}>📰</span> {info.activitate}
      </div>
      <div style={{ marginTop: '1rem', paddingTop: '0.8rem', borderTop: '1px solid #f0e6d6' }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <span style={{ color: '#a97c50', fontWeight: 600 }}>🏠</span> {info.locNastere}
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <span style={{ color: '#a97c50', fontWeight: 600 }}>📅</span> {info.perioada}
        </div>
        <div>
          <span style={{ color: '#a97c50', fontWeight: 600 }}>⭐</span> {info.opere}
        </div>
      </div>
    </>
  );
};

export default ScriitorInfo; 
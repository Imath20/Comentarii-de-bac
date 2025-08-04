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
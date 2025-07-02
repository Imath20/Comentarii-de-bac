import React from 'react';

export default function DespreNoi({ darkTheme }) {
  return (
    <section style={{
      width: '100%',
      margin: '0 auto',
      marginTop: '4rem',
      marginBottom: '4rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h2 style={{
        fontSize: '3.2rem',
        fontWeight: 900,
        letterSpacing: '0.12em',
        color: darkTheme ? 'rgba(255,255,255,0.95)' : '#4e2e1e',
        marginBottom: '2.5rem',
        textAlign: 'center',
        textShadow: '0 2px 8px rgba(60,40,20,0.10)'
      }}>Despre Noi</h2>
      <div style={{
        fontSize: '1.25rem',
        fontWeight: 500,
        color: darkTheme ? 'rgba(255,255,255,0.95)' : '#4e2e1e',
        textAlign: 'center',
        maxWidth: 1400,
        margin: 0,
        textShadow: '0 2px 8px rgba(60,40,20,0.10)',
        lineHeight: 1.7,
      }}>
        <p style={{margin: '0 0 1.5em 0'}}>Comentarii de BAC s-a născut dintr-o prietenie și o colaborare autentică dintre doi elevi și un profesor de limba romana, cu dorința de a aduce resursele de care am fi avut și noi nevoie, într-un format modern și prietenos.</p>
        <p style={{margin: '0 0 1.5em 0'}}>Am pus laolaltă idei, experiențe și pasiuni diferite: entuziasmul și curiozitatea elevilor, răbdarea și îndrumarea unui profesor, și am construit împreună o platformă unde fiecare poate găsi inspirație, explicații clare și materiale utile pentru BAC.</p>
        <p style={{margin: 0}}>Credem că atunci când generațiile lucrează împreună, rezultatele pot fi cu adevărat valoroase. Îți dorim succes și te invităm să folosești tot ce am pregătit cu grijă pentru tine!</p>
      </div>
    </section>
  );
} 
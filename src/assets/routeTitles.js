// Ordered list of [RegExp, title] pairs, matched against location.pathname
export const ROUTE_TITLES = [
  [/^\/$/, 'Acasa'],
  [/^\/opere$/, 'Opere'],
  [/^\/opera\//, 'Opera'],
  [/^\/scriitori$/, 'Scriitori'],
  [/^\/scriitor(?:\b|\/|$)/, 'Scriitor'],
  [/^\/biblioteca$/, 'Biblioteca'],
  [/^\/videoclipuri$/, 'Videoclipuri'],
  [/^\/proiecte$/, 'Proiecte'],
  [/^\/subiecte$/, 'Subiecte'],
  [/^\/ghiduri$/, 'Ghiduri BAC'],
  [/^\/subiecte\/ghid-subiect-1\/a$/, 'Subpunct A – Ghid Subiect I'],
  [/^\/subiecte\/ghid-subiect-1\/b$/, 'Subpunct B – Ghid Subiect I'],
  [/^\/subiecte\/ghid-subiect-1$/, 'Ghid Subiect I'],
  [/^\/subiecte\/ghid-subiect-2\/naratorul$/, 'Naratorul – Ghid Subiect II'],
  [/^\/subiecte\/ghid-subiect-2\/notatiile-autorului$/, 'Notațiile – Ghid Subiect II'],
  [/^\/subiecte\/ghid-subiect-2\/semnificatia-lirica$/, 'Semnificația – Ghid Subiect II'],
  [/^\/subiecte\/ghid-subiect-2$/, 'Ghid Subiect II'],
  [/^\/subiecte\/ghid-subiect-3\/structura$/, 'Structura – Ghid Subiect III'],
  [/^\/subiecte\/ghid-subiect-3\/planuri$/, 'Planuri – Ghid Subiect III'],
  [/^\/subiecte\/ghid-subiect-3\/cerinte$/, 'Cerințe – Ghid Subiect III'],
  [/^\/subiecte\/ghid-subiect-3$/, 'Ghid Subiect III'],
  [/^\/comentarii\/share\//, 'Comentariu partajat'],
  [/^\/comentarii$/, 'Comentarii'],
  [/^\/ai$/, 'AI'],
  [/^\/curente$/, 'Curente'],
  [/^\/curent\//, 'Curent'],
  [/^\/carte(?:\b|\/|$)/, 'Cititor de carte'],
  [/^\/profil\/comentarii$/, 'Comentariile mele'],
  [/^\/profil(?:\b|\/|$)/, 'Profil'],
  [/^\/login$/, 'Autentificare'],
  [/^\/admin$/, 'Admin'],
];

export function titleFromPath(pathname) {
  for (const [re, title] of ROUTE_TITLES) {
    if (re.test(pathname)) return title;
  }
  return 'Pagina';
}



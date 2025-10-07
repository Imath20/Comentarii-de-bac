// Ordered list of [RegExp, title] pairs, matched against location.pathname
export const ROUTE_TITLES = [
  [/^\/$/, 'Home'],
  [/^\/opere$/, 'Opere'],
  [/^\/opera\//, 'Opera'],
  [/^\/scriitori$/, 'Scriitori'],
  [/^\/scriitor(?:\b|\/|$)/, 'Scriitor'],
  [/^\/biblioteca$/, 'Biblioteca'],
  [/^\/videoclipuri$/, 'Videoclipuri'],
  [/^\/proiecte$/, 'Proiecte'],
  [/^\/subiecte$/, 'Subiecte'],
  [/^\/ai$/, 'AI'],
  [/^\/curente$/, 'Curente'],
  [/^\/curent\//, 'Curent'],
  [/^\/carte(?:\b|\/|$)/, 'BookReader'],
];

export function titleFromPath(pathname) {
  for (const [re, title] of ROUTE_TITLES) {
    if (re.test(pathname)) return title;
  }
  return 'Pagina';
}



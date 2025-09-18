// Loader pentru biografii per scriitor (un fișier per autor în acest director)
// Folosește import.meta.glob pentru a importa toate fișierele .js din folder

const modules = import.meta.glob('./*.js', { eager: true });

// Creează o hartă: nume_scriitor -> conținut biografie (string)
const nameToBiography = {};

for (const path in modules) {
  // Extrage numele fișierului fără extensie, ex: './arghezi.js' -> 'arghezi'
  const match = path.match(/\.\/(.*)\.js$/);
  if (!match) continue;
  const key = match[1];
  const mod = modules[path];
  const content = mod && (mod.default || mod.biografie || '');
  nameToBiography[key] = typeof content === 'string' ? content : '';
}

export function getScriitorBiografie(name) {
  return nameToBiography[name] || '';
}



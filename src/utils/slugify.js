/**
 * Generează un slug URL-safe din text (titlu).
 * Ex: "Povestea lui Harap-Alb" -> "povestea-lui-harap-alb"
 */
export function slugify(text) {
  if (!text || typeof text !== 'string') return '';
  const map = {
    ă: 'a', â: 'a', î: 'i', ș: 's', ț: 't', Ș: 's', Ț: 't',
    Ă: 'a', Â: 'a', Î: 'i',
  };
  let s = text.trim().toLowerCase();
  for (const [diac, plain] of Object.entries(map)) {
    s = s.split(diac).join(plain);
  }
  s = s.replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  return s || 'comentariu';
}

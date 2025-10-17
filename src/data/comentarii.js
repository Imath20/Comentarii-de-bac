// Lista comentarii – minimal initial data; extend as needed
// Campuri: id, titlu, autor, categorie, plan: 'free' | 'pro' | 'premium'
// Optional: descriere, tags, link

const comentariiList = [
  {
    id: 'eminescu-luceafarul',
    titlu: 'Luceafărul — comentariu',
    autor: 'Mihai Eminescu',
    categorie: 'poezie',
    plan: 'free',
    descriere: 'Teme, motive, viziune, specii și interpretare succintă.',
  },
  {
    id: 'arghezi-testament',
    titlu: 'Testament — comentariu',
    autor: 'Tudor Arghezi',
    categorie: 'poezie',
    plan: 'pro',
    descriere: 'Program estetic, simboluri centrale și analiză pe strofe.',
  },
  {
    id: 'bacovia-plumb',
    titlu: 'Plumb — comentariu',
    autor: 'George Bacovia',
    categorie: 'poezie',
    plan: 'premium',
    descriere: 'Atmosferă, cromatică, simboluri și modernismul bacovian.',
  },
];

export default comentariiList;



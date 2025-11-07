import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

export async function fetchComentarii() {
  const colRef = collection(db, 'comentarii');
  const q = query(colRef, orderBy('titlu'));
  const snap = await getDocs(q);
  return snap.docs.map(doc => {
    const data = doc.data();
    return {
      id: data.id || doc.id,
      titlu: data.titlu || '',
      autor: data.autor || '',
      categorie: data.categorie || '',
      plan: data.plan || 'free',
      descriere: data.descriere || '',
      text: data.text || '',
      // keep any extra fields for future use
      ...data,
    };
  });
}



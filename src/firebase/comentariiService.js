import { collection, getDocs, query, orderBy, doc, setDoc } from 'firebase/firestore';
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

/**
 * Add a new comentariu to Firestore
 * @param {Object} comentariuData - The comentariu data to add
 * @returns {Promise<void>}
 */
export async function addComentariu(comentariuData) {
  try {
    if (!comentariuData.id) {
      throw new Error('ID-ul comentariului este obligatoriu');
    }

    const comentariuRef = doc(db, 'comentarii', comentariuData.id);
    
    const dataToSave = {
      ...comentariuData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(comentariuRef, dataToSave, { merge: true });
    console.log('✅ Comentariu adăugat cu succes:', comentariuData.id);
  } catch (error) {
    console.error('❌ Eroare la adăugarea comentariului:', error);
    throw error;
  }
}



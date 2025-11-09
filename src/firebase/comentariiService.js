import { collection, getDocs, query, orderBy, doc, setDoc, deleteDoc } from 'firebase/firestore';
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
      text: data.text || '', // Old format for backward compatibility
      content: data.content || null, // New structured format
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

/**
 * Update an existing comentariu in Firestore
 * @param {Object} comentariuData - The comentariu data to update (must include id)
 * @returns {Promise<void>}
 */
export async function updateComentariu(comentariuData) {
  try {
    if (!comentariuData.id) {
      throw new Error('ID-ul comentariului este obligatoriu');
    }

    const comentariuRef = doc(db, 'comentarii', comentariuData.id);
    
    const dataToSave = {
      ...comentariuData,
      updatedAt: new Date().toISOString(),
    };

    await setDoc(comentariuRef, dataToSave, { merge: true });
    console.log('✅ Comentariu actualizat cu succes:', comentariuData.id);
  } catch (error) {
    console.error('❌ Eroare la actualizarea comentariului:', error);
    throw error;
  }
}

/**
 * Delete a comentariu from Firestore
 * @param {string} comentariuId - The ID of the comentariu to delete
 * @returns {Promise<void>}
 */
export async function deleteComentariu(comentariuId) {
  try {
    if (!comentariuId) {
      throw new Error('ID-ul comentariului este obligatoriu');
    }

    const comentariuRef = doc(db, 'comentarii', comentariuId);
    await deleteDoc(comentariuRef);
    console.log('✅ Comentariu șters cu succes:', comentariuId);
  } catch (error) {
    console.error('❌ Eroare la ștergerea comentariului:', error);
    throw error;
  }
}



import { collection, addDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Add a new subiect to Firestore
 * @param {Object} subiectData - The subiect data to add
 * @returns {Promise<void>}
 */
export async function addSubiect(subiectData) {
  try {
    const subiecteRef = collection(db, 'subiecte');
    
    const dataToSave = {
      ...subiectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // If ID is provided, use setDoc with the ID, otherwise use addDoc
    if (subiectData.id) {
      const subiectDocRef = doc(db, 'subiecte', subiectData.id);
      await setDoc(subiectDocRef, dataToSave);
      console.log('✅ Subiect adăugat cu succes:', subiectData.id);
    } else {
      await addDoc(subiecteRef, dataToSave);
      console.log('✅ Subiect adăugat cu succes');
    }
  } catch (error) {
    console.error('❌ Eroare la adăugarea subiectului:', error);
    throw error;
  }
}

/**
 * Update an existing subiect in Firestore
 * @param {Object} subiectData - The subiect data to update (must include id)
 * @returns {Promise<void>}
 */
export async function updateSubiect(subiectData) {
  try {
    if (!subiectData.id) {
      throw new Error('ID-ul subiectului este obligatoriu');
    }

    const subiectRef = doc(db, 'subiecte', subiectData.id);
    
    const dataToSave = {
      ...subiectData,
      updatedAt: new Date().toISOString(),
    };

    await setDoc(subiectRef, dataToSave, { merge: true });
    console.log('✅ Subiect actualizat cu succes:', subiectData.id);
  } catch (error) {
    console.error('❌ Eroare la actualizarea subiectului:', error);
    throw error;
  }
}

/**
 * Delete a subiect from Firestore
 * @param {string} subiectId - The ID of the subiect to delete
 * @returns {Promise<void>}
 */
export async function deleteSubiect(subiectId) {
  try {
    if (!subiectId) {
      throw new Error('ID-ul subiectului este obligatoriu');
    }

    const subiectRef = doc(db, 'subiecte', subiectId);
    await deleteDoc(subiectRef);
    console.log('✅ Subiect șters cu succes:', subiectId);
  } catch (error) {
    console.error('❌ Eroare la ștergerea subiectului:', error);
    throw error;
  }
}


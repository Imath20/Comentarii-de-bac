import { collection, addDoc } from 'firebase/firestore';
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

    await addDoc(subiecteRef, dataToSave);
    console.log('✅ Subiect adăugat cu succes');
  } catch (error) {
    console.error('❌ Eroare la adăugarea subiectului:', error);
    throw error;
  }
}


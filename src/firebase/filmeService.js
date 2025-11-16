import { collection, getDocs, query, orderBy, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Fetch all filme from Firestore
 * @returns {Promise<Array<Object>>}
 */
export async function fetchFilme() {
  try {
    const colRef = collection(db, 'filme');
    const q = query(colRef, orderBy('id'));
    const snap = await getDocs(q);
    return snap.docs.map(doc => {
      const data = doc.data();
      return {
        id: data.id || doc.id,
        titlu: data.titlu || '',
        descriere: data.descriere || '',
        videoId: data.videoId || '',
        categorie: data.categorie || '',
        durata: data.durata || '',
        autor: data.autor || '',
        ...data,
      };
    }).sort((a, b) => {
      // Sort by numeric ID if possible, otherwise by string
      const idA = parseInt(a.id) || 0;
      const idB = parseInt(b.id) || 0;
      if (idA !== 0 && idB !== 0) {
        return idA - idB;
      }
      // If IDs are not numeric, sort by string
      return (a.id || '').localeCompare(b.id || '');
    });
  } catch (error) {
    console.error('❌ Eroare la preluarea filmelor:', error);
    throw error;
  }
}

/**
 * Add a new film to Firestore
 * @param {Object} filmData - The film data to add
 * @returns {Promise<void>}
 */
export async function addFilm(filmData) {
  try {
    if (!filmData.id) {
      throw new Error('ID-ul filmului este obligatoriu');
    }

    const filmRef = doc(db, 'filme', filmData.id);
    
    const dataToSave = {
      ...filmData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(filmRef, dataToSave, { merge: true });
    console.log('✅ Film adăugat cu succes:', filmData.id);
  } catch (error) {
    console.error('❌ Eroare la adăugarea filmului:', error);
    throw error;
  }
}

/**
 * Update an existing film in Firestore
 * @param {Object} filmData - The film data to update (must include id)
 * @returns {Promise<void>}
 */
export async function updateFilm(filmData) {
  try {
    if (!filmData.id) {
      throw new Error('ID-ul filmului este obligatoriu');
    }

    const filmRef = doc(db, 'filme', filmData.id);
    
    const dataToSave = {
      ...filmData,
      updatedAt: new Date().toISOString(),
    };

    await setDoc(filmRef, dataToSave, { merge: true });
    console.log('✅ Film actualizat cu succes:', filmData.id);
  } catch (error) {
    console.error('❌ Eroare la actualizarea filmului:', error);
    throw error;
  }
}

/**
 * Delete a film from Firestore
 * @param {string} filmId - The ID of the film to delete
 * @returns {Promise<void>}
 */
export async function deleteFilm(filmId) {
  try {
    if (!filmId) {
      throw new Error('ID-ul filmului este obligatoriu');
    }

    const filmRef = doc(db, 'filme', filmId);
    await deleteDoc(filmRef);
    console.log('✅ Film șters cu succes:', filmId);
  } catch (error) {
    console.error('❌ Eroare la ștergerea filmului:', error);
    throw error;
  }
}


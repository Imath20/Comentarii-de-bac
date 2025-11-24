import { collection, addDoc, doc, setDoc, deleteDoc, getDocs, query, orderBy, limit as limitFn, startAfter } from 'firebase/firestore';
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

    // Avoid persisting empty string IDs on the document data
    if (!dataToSave.id) {
      delete dataToSave.id;
    }

    // If ID is provided, use setDoc with the ID, otherwise use addDoc
    if (subiectData.id) {
      const subiectDocRef = doc(db, 'subiecte', subiectData.id);
      await setDoc(subiectDocRef, {
        ...dataToSave,
        id: subiectData.id,
      });
      console.log('✅ Subiect adăugat cu succes:', subiectData.id);
    } else {
      const newDoc = await addDoc(subiecteRef, dataToSave);
      console.log('✅ Subiect adăugat cu succes:', newDoc.id);
    }
  } catch (error) {
    console.error('❌ Eroare la adăugarea subiectului:', error);
    throw error;
  }
}

/**
 * Fetch all subiecte from Firestore
 * @returns {Promise<Array<Object>>}
 */
export async function getAllSubiecte() {
  try {
    const subiecteRef = collection(db, 'subiecte');
    const snapshot = await getDocs(subiecteRef);

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      const resolvedId = typeof data.id === 'string' && data.id.trim().length > 0
        ? data.id
        : docSnap.id;

      return {
        ...data,
        id: resolvedId,
      };
    });
  } catch (error) {
    console.error('❌ Eroare la preluarea subiectelor:', error);
    throw error;
  }
}

/**
 * Fetch subiecte in batched chunks ordered by createdAt (desc by default)
 * @param {Object} options
 * @param {number} [options.limit=12] - Number of documents to fetch
 * @param {import('firebase/firestore').QueryDocumentSnapshot} [options.cursor] - Document snapshot to paginate from
 * @returns {Promise<{ items: Array<Object>, lastDoc: import('firebase/firestore').QueryDocumentSnapshot | null }>}
 */
export async function fetchSubiecteBatch({
  limit = 12,
  cursor = null,
  orderByField = 'createdAt',
  orderDirection = 'desc',
} = {}) {
  try {
    const subiecteRef = collection(db, 'subiecte');
    let subiecteQuery = query(
      subiecteRef,
      orderBy(orderByField, orderDirection),
      limitFn(limit)
    );

    if (cursor) {
      subiecteQuery = query(
        subiecteRef,
        orderBy(orderByField, orderDirection),
        startAfter(cursor),
        limitFn(limit)
      );
    }

    const snapshot = await getDocs(subiecteQuery);

    const items = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      const resolvedId = typeof data.id === 'string' && data.id.trim().length > 0
        ? data.id
        : docSnap.id;

      return {
        ...data,
        id: resolvedId,
      };
    });

    const lastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;

    return { items, lastDoc };
  } catch (error) {
    console.error('❌ Eroare la încărcarea subiectelor în loturi:', error);
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


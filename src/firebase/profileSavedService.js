import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

const SAVED_ESSAYS_COLLECTION = 'savedEssays';

/**
 * Get user's saved essays (eseuri salvate)
 * @param {string} userId - The user's UID
 * @returns {Promise<Array>} Array of saved essay objects
 */
export async function getSavedEssays(userId) {
  try {
    if (!userId) return [];
    const colRef = collection(db, 'users', userId, SAVED_ESSAYS_COLLECTION);
    const q = query(colRef, orderBy('savedAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error('getSavedEssays error:', error);
    return [];
  }
}

/**
 * Save an essay for the user
 * @param {string} userId - The user's UID
 * @param {object} data - { operaSlug, operaTitlu, ... }
 * @returns {Promise<string>} Document ID
 */
export async function saveEssay(userId, data) {
  if (!userId) throw new Error('User required');
  const colRef = collection(db, 'users', userId, SAVED_ESSAYS_COLLECTION);
  const docRef = await addDoc(colRef, { ...data, savedAt: new Date().toISOString() });
  return docRef.id;
}

/**
 * Remove a saved essay
 * @param {string} userId - The user's UID
 * @param {string} docId - Document ID
 */
export async function removeSavedEssay(userId, docId) {
  if (!userId || !docId) return;
  const docRef = doc(db, 'users', userId, SAVED_ESSAYS_COLLECTION, docId);
  await deleteDoc(docRef);
}

import { collection, getDocs, query, orderBy, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Get user's personal comments from Firestore
 * @param {string} userId - The user's UID
 * @returns {Promise<Array>} Array of comment objects
 */
export async function getUserComments(userId) {
  try {
    if (!userId) return [];

    const colRef = collection(db, 'users', userId, 'userComments');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);

    return snap.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        type: data.type || 'text',
        content: data.content || '',
        createdAt: data.createdAt || '',
      };
    });
  } catch (error) {
    console.error('Error fetching user comments:', error);
    throw error;
  }
}

/**
 * Add a personal comment for the user
 * @param {string} userId - The user's UID
 * @param {Object} commentData - { type: 'text' | 'image', content: string }
 * @returns {Promise<string>} The new comment's ID
 */
export async function addUserComment(userId, commentData) {
  try {
    if (!userId) {
      throw new Error('ID-ul utilizatorului este obligatoriu');
    }
    if (!commentData?.type || !commentData?.content?.trim()) {
      throw new Error('Tipul și conținutul comentariului sunt obligatorii');
    }

    const colRef = collection(db, 'users', userId, 'userComments');
    const dataToSave = {
      type: commentData.type,
      content: commentData.content.trim(),
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(colRef, dataToSave);
    console.log('✅ Comentariu personal adăugat cu succes:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Eroare la adăugarea comentariului personal:', error);
    throw error;
  }
}

/**
 * Delete a personal comment
 * @param {string} userId - The user's UID
 * @param {string} commentId - The comment's ID
 * @returns {Promise<void>}
 */
export async function deleteUserComment(userId, commentId) {
  try {
    if (!userId || !commentId) {
      throw new Error('ID-ul utilizatorului și al comentariului sunt obligatorii');
    }

    const commentRef = doc(db, 'users', userId, 'userComments', commentId);
    await deleteDoc(commentRef);
    console.log('✅ Comentariu personal șters cu succes:', commentId);
  } catch (error) {
    console.error('❌ Eroare la ștergerea comentariului personal:', error);
    throw error;
  }
}

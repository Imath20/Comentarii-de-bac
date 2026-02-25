import { collection, getDocs, query, orderBy, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
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
        titlu: data.titlu || '',
        autor: data.autor || '',
        anAparitie: data.anAparitie || '',
        curentLiterar: data.curentLiterar || '',
        specieLiterara: data.specieLiterara || data.categorie || '',
        genLiterar: data.genLiterar || '',
        categorie: data.categorie || data.specieLiterara || '',
        tip: data.tip || 'general',
        teme: data.teme || '',
        motive: data.motive || '',
        viziune: data.viziune || '',
        interpretare: data.interpretare || '',
        descriere: data.descriere || '',
        plan: data.plan || 'free',
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
 * @param {Object} commentData - { type, content, titlu?, autor?, categorie?, tip?, descriere?, plan? }
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
      titlu: commentData.titlu || '',
      autor: commentData.autor || '',
      anAparitie: commentData.anAparitie || '',
      curentLiterar: commentData.curentLiterar || '',
      specieLiterara: commentData.specieLiterara || '',
      genLiterar: commentData.genLiterar || '',
      categorie: commentData.specieLiterara || commentData.categorie || '',
      tip: commentData.tip || 'general',
      teme: commentData.teme || '',
      motive: commentData.motive || '',
      viziune: commentData.viziune || '',
      interpretare: commentData.interpretare || '',
      descriere: commentData.descriere || '',
      plan: commentData.plan || 'free',
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
 * Update a personal comment
 * @param {string} userId - The user's UID
 * @param {string} commentId - The comment's ID
 * @param {Object} commentData - { type, content, titlu?, autor?, categorie?, tip?, descriere?, plan? }
 * @returns {Promise<void>}
 */
export async function updateUserComment(userId, commentId, commentData) {
  try {
    if (!userId || !commentId) {
      throw new Error('ID-ul utilizatorului și al comentariului sunt obligatorii');
    }
    if (!commentData?.type || !commentData?.content?.trim()) {
      throw new Error('Tipul și conținutul comentariului sunt obligatorii');
    }

    const commentRef = doc(db, 'users', userId, 'userComments', commentId);
    const dataToSave = {
      type: commentData.type,
      content: commentData.content.trim(),
      titlu: commentData.titlu || '',
      autor: commentData.autor || '',
      anAparitie: commentData.anAparitie || '',
      curentLiterar: commentData.curentLiterar || '',
      specieLiterara: commentData.specieLiterara || '',
      genLiterar: commentData.genLiterar || '',
      categorie: commentData.specieLiterara || commentData.categorie || '',
      tip: commentData.tip || 'general',
      teme: commentData.teme || '',
      motive: commentData.motive || '',
      viziune: commentData.viziune || '',
      interpretare: commentData.interpretare || '',
      descriere: commentData.descriere || '',
      plan: commentData.plan || 'free',
    };

    await updateDoc(commentRef, dataToSave);
    console.log('✅ Comentariu personal actualizat cu succes:', commentId);
  } catch (error) {
    console.error('❌ Eroare la actualizarea comentariului personal:', error);
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

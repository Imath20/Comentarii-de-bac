import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Generate a short unique ID for share links
 */
function generateShareId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

/**
 * Create a public copy of a comment in sharedComments collection
 * @param {string} userId - The owner's UID
 * @param {Object} comment - The comment to share
 * @returns {Promise<string>} The shareId (document ID)
 */
export async function createSharedComment(userId, comment) {
  try {
    if (!userId || !comment) {
      throw new Error('Utilizatorul și comentariul sunt obligatorii');
    }

    const shareId = generateShareId();
    const docRef = doc(db, 'sharedComments', shareId);

    const dataToSave = {
      shareId,
      sharedBy: userId,
      sharedAt: new Date().toISOString(),
      type: comment.type || 'text',
      content: comment.content || '',
      titlu: comment.titlu || '',
      autor: comment.autor || '',
      anAparitie: comment.anAparitie || '',
      curentLiterar: comment.curentLiterar || '',
      specieLiterara: comment.specieLiterara || '',
      genLiterar: comment.genLiterar || '',
      categorie: comment.categorie || comment.specieLiterara || '',
      tip: comment.tip || 'general',
      teme: comment.teme || '',
      motive: comment.motive || '',
      viziune: comment.viziune || '',
      interpretare: comment.interpretare || '',
      descriere: comment.descriere || '',
      plan: comment.plan || 'free',
    };

    await setDoc(docRef, dataToSave);

    console.log('✅ Comentariu partajat cu succes:', shareId);
    return shareId;
  } catch (error) {
    console.error('❌ Eroare la partajarea comentariului:', error);
    throw error;
  }
}

/**
 * Get a shared comment by shareId
 * @param {string} shareId - The share ID from the URL
 * @returns {Promise<Object|null>} The shared comment or null if not found
 */
export async function getSharedComment(shareId) {
  try {
    if (!shareId) return null;

    const docRef = doc(db, 'sharedComments', shareId);
    const snap = await getDoc(docRef);

    if (!snap.exists()) return null;

    const data = snap.data();
    return {
      shareId: snap.id,
      sharedBy: data.sharedBy || '',
      sharedAt: data.sharedAt || '',
      type: data.type || 'text',
      content: data.content || '',
      titlu: data.titlu || '',
      autor: data.autor || '',
      anAparitie: data.anAparitie || '',
      curentLiterar: data.curentLiterar || '',
      specieLiterara: data.specieLiterara || '',
      genLiterar: data.genLiterar || '',
      categorie: data.categorie || data.specieLiterara || '',
      tip: data.tip || 'general',
      teme: data.teme || '',
      motive: data.motive || '',
      viziune: data.viziune || '',
      interpretare: data.interpretare || '',
      descriere: data.descriere || '',
      plan: data.plan || 'free',
    };
  } catch (error) {
    console.error('Error fetching shared comment:', error);
    throw error;
  }
}

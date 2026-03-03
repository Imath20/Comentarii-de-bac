import { collection, getDocs, query, orderBy, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

const SESSIONS_COLLECTION = 'chatbotSessions';

/**
 * Get user's chatbot sessions from Firestore
 * @param {string} userId - The user's UID
 * @returns {Promise<Array>} Array of session objects
 */
export async function getChatbotSessions(userId) {
  try {
    if (!userId) return [];

    const colRef = collection(db, 'users', userId, SESSIONS_COLLECTION);
    let snap;
    try {
      const q = query(colRef, orderBy('lastMessageAt', 'desc'));
      snap = await getDocs(q);
    } catch (orderError) {
      // Fallback for docs without lastMessageAt (legacy)
      const q = query(colRef, orderBy('createdAt', 'desc'));
      snap = await getDocs(q);
    }

    const result = snap.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title || 'Chat nou',
        messages: (data.messages || []).map((m) => ({
          ...m,
          timestamp: m.timestamp ? new Date(m.timestamp) : new Date(),
        })),
        createdAt: data.createdAt || '',
        lastMessageAt: data.lastMessageAt || data.createdAt || '',
        lastUserText: data.lastUserText || '',
      };
    });
    console.log('[Chatbot] Chat-uri încărcate:', result.length, result);
    return result;
  } catch (error) {
    console.error('Error fetching chatbot sessions:', error);
    throw error;
  }
}

/**
 * Add a new chatbot session for the user
 * @param {string} userId - The user's UID
 * @param {Object} session - { title, messages, lastUserText }
 * @returns {Promise<string>} The new session's ID
 */
export async function addChatbotSession(userId, session) {
  try {
    if (!userId) {
      throw new Error('ID-ul utilizatorului este obligatoriu');
    }

    const now = session.createdAt || new Date().toISOString();
    const colRef = collection(db, 'users', userId, SESSIONS_COLLECTION);
    const dataToSave = {
      title: session.title || 'Chat nou',
      messages: (session.messages || []).map((m) => ({
        ...m,
        timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : m.timestamp,
      })),
      createdAt: now,
      lastMessageAt: session.lastMessageAt || now,
      lastUserText: session.lastUserText || '',
    };

    const docRef = await addDoc(colRef, dataToSave);
    console.log('[Chatbot] Chat nou creat în Firebase:', docRef.id, dataToSave);
    return docRef.id;
  } catch (error) {
    console.error('Error adding chatbot session:', error);
    throw error;
  }
}

/**
 * Update an existing chatbot session
 * @param {string} userId - The user's UID
 * @param {string} sessionId - The session's ID
 * @param {Object} data - { title?, messages?, lastUserText? }
 * @returns {Promise<void>}
 */
export async function updateChatbotSession(userId, sessionId, data) {
  try {
    if (!userId || !sessionId) {
      throw new Error('ID-ul utilizatorului și al sesiunii sunt obligatorii');
    }

    const sessionRef = doc(db, 'users', userId, SESSIONS_COLLECTION, sessionId);
    const dataToSave = {};

    if (data.title !== undefined) dataToSave.title = data.title;
    if (data.lastUserText !== undefined) dataToSave.lastUserText = data.lastUserText;
    if (data.lastMessageAt !== undefined) dataToSave.lastMessageAt = data.lastMessageAt;
    if (data.messages !== undefined) {
      dataToSave.messages = data.messages.map((m) => ({
        ...m,
        timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : m.timestamp,
      }));
    }

    if (Object.keys(dataToSave).length > 0) {
      await updateDoc(sessionRef, dataToSave);
      console.log('[Chatbot] Chat actualizat în Firebase:', sessionId, Object.keys(dataToSave));
    }
  } catch (error) {
    console.error('Error updating chatbot session:', error);
    throw error;
  }
}

/**
 * Delete a chatbot session
 * @param {string} userId - The user's UID
 * @param {string} sessionId - The session's ID
 * @returns {Promise<void>}
 */
export async function deleteChatbotSession(userId, sessionId) {
  try {
    if (!userId || !sessionId) {
      throw new Error('ID-ul utilizatorului și al sesiunii sunt obligatorii');
    }

    const sessionRef = doc(db, 'users', userId, SESSIONS_COLLECTION, sessionId);
    await deleteDoc(sessionRef);
  } catch (error) {
    console.error('Error deleting chatbot session:', error);
    throw error;
  }
}

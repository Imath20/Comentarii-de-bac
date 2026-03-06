import { collection, getDocs, addDoc, query, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';

const ACTIVITY_LOG_COLLECTION = 'activityLog';

/**
 * Get user's activity log (jurnal activitate)
 * @param {string} userId - The user's UID
 * @param {number} maxEntries - Max number of entries to return (default 50)
 * @returns {Promise<Array>} Array of activity entries
 */
export async function getActivityLog(userId, maxEntries = 50) {
  try {
    if (!userId) return [];
    const colRef = collection(db, 'users', userId, ACTIVITY_LOG_COLLECTION);
    const q = query(colRef, orderBy('createdAt', 'desc'), limit(maxEntries));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error('getActivityLog error:', error);
    return [];
  }
}

/**
 * Add an activity entry for the user
 * @param {string} userId - The user's UID
 * @param {object} data - { type, operaSlug, ... }
 * @returns {Promise<string>} Document ID
 */
export async function addActivityEntry(userId, data) {
  if (!userId) return null;
  const colRef = collection(db, 'users', userId, ACTIVITY_LOG_COLLECTION);
  const docRef = await addDoc(colRef, { ...data, createdAt: new Date().toISOString() });
  return docRef.id;
}

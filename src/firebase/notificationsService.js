import { collection, addDoc, query, orderBy, onSnapshot, limit, getDocs, doc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Create a notification when an admin/semi-admin performs an action
 * @param {Object} notificationData - The notification data
 * @param {string} notificationData.type - Type: 'comentariu', 'subiect', 'scriitor', 'post', 'film'
 * @param {string} notificationData.action - Action: 'added', 'updated'
 * @param {string} notificationData.userId - User ID who performed the action
 * @param {string} notificationData.userName - User display name
 * @param {string} notificationData.userEmail - User email
 * @param {string} notificationData.userPhotoURL - User photo URL
 * @param {boolean} notificationData.isSemiAdmin - Whether the user is a semi-admin
 * @param {string} notificationData.itemName - Name/title of the item (e.g., comment title, writer name)
 * @param {string} notificationData.itemId - ID of the item
 * @param {string} notificationData.scriitorName - For posts, the writer name (optional)
 * @returns {Promise<void>}
 */
export async function createNotification(notificationData) {
  try {
    const notificationsRef = collection(db, 'notifications');
    
    const notification = {
      type: notificationData.type,
      action: notificationData.action,
      userId: notificationData.userId,
      userName: notificationData.userName,
      userEmail: notificationData.userEmail,
      userPhotoURL: notificationData.userPhotoURL || '',
      isSemiAdmin: notificationData.isSemiAdmin || false,
      itemName: notificationData.itemName || '',
      itemId: notificationData.itemId || '',
      scriitorName: notificationData.scriitorName || '',
      createdAt: new Date().toISOString(),
      read: false,
    };

    await addDoc(notificationsRef, notification);
    console.log('✅ Notificare creată:', notification.type, notification.action);
  } catch (error) {
    console.error('❌ Eroare la crearea notificării:', error);
    throw error;
  }
}

/**
 * Fetch all notifications (for admins only)
 * @param {number} maxResults - Maximum number of notifications to fetch
 * @returns {Promise<Array<Object>>}
 */
export async function fetchNotifications(maxResults = 50) {
  try {
    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      orderBy('createdAt', 'desc'),
      limit(maxResults)
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('❌ Eroare la preluarea notificărilor:', error);
    throw error;
  }
}

/**
 * Subscribe to notifications in real-time
 * @param {Function} callback - Callback function that receives notifications array
 * @param {number} maxResults - Maximum number of notifications to fetch
 * @returns {Function} - Unsubscribe function
 */
export function subscribeToNotifications(callback, maxResults = 50) {
  try {
    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      orderBy('createdAt', 'desc'),
      limit(maxResults)
    );
    
    return onSnapshot(q, (snapshot) => {
      const notifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(notifications);
    }, (error) => {
      console.error('❌ Eroare la subscrierea la notificări:', error);
      callback([]);
    });
  } catch (error) {
    console.error('❌ Eroare la subscrierea la notificări:', error);
    return () => {}; // Return empty unsubscribe function
  }
}

/**
 * Mark notification as read
 * @param {string} notificationId - The notification ID
 * @returns {Promise<void>}
 */
export async function markNotificationAsRead(notificationId) {
  try {
    const notificationRef = doc(db, 'notifications', notificationId);
    await updateDoc(notificationRef, { read: true });
  } catch (error) {
    console.error('❌ Eroare la marcarea notificării ca citită:', error);
    throw error;
  }
}

/**
 * Delete all notifications
 * @returns {Promise<void>}
 */
export async function deleteAllNotifications() {
  try {
    const notificationsRef = collection(db, 'notifications');
    const snapshot = await getDocs(notificationsRef);
    
    if (snapshot.empty) {
      console.log('✅ Nu există notificări de șters');
      return;
    }

    // Use batch to delete all notifications
    const batch = writeBatch(db);
    snapshot.docs.forEach((docSnap) => {
      batch.delete(docSnap.ref);
    });

    await batch.commit();
    console.log('✅ Toate notificările au fost șterse:', snapshot.size);
  } catch (error) {
    console.error('❌ Eroare la ștergerea notificărilor:', error);
    throw error;
  }
}


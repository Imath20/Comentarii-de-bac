import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Get user profile data from Firestore
 * @param {string} userId - The user's UID
 * @returns {Promise<Object|null>} User profile data or null if not found
 */
export async function getUserProfile(userId) {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);
    
    if (userDocSnap.exists()) {
      return userDocSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

/**
 * Create or update user profile in Firestore
 * @param {string} userId - The user's UID
 * @param {Object} profileData - Profile data to save
 * @param {boolean} isNewUser - Whether this is a new user (to preserve createdAt)
 * @returns {Promise<void>}
 */
export async function saveUserProfile(userId, profileData, isNewUser = false) {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);
    const exists = userDocSnap.exists();
    
    const dataToSave = {
      ...profileData,
      updatedAt: new Date().toISOString(),
    };
    
    // Only set createdAt if it's a new user and doesn't exist yet
    if (isNewUser && !exists) {
      dataToSave.createdAt = new Date().toISOString();
    } else if (exists && userDocSnap.data().createdAt) {
      // Preserve existing createdAt if it exists
      dataToSave.createdAt = userDocSnap.data().createdAt;
    } else if (!exists) {
      // If document doesn't exist, set createdAt
      dataToSave.createdAt = new Date().toISOString();
    }
    
    await setDoc(userDocRef, dataToSave, { merge: true });
    console.log('✅ User profile saved to database:', userId);
  } catch (error) {
    console.error('❌ Error saving user profile:', error);
    throw error;
  }
}

/**
 * Update user profile fields
 * @param {string} userId - The user's UID
 * @param {Object} updates - Fields to update
 * @returns {Promise<void>}
 */
export async function updateUserProfile(userId, updates) {
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}


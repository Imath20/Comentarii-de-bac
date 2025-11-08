import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import { getUserProfile, saveUserProfile } from './profileService';
import { getProfileImageUrl } from '../utils/cloudinary';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  const loginWithEmailPassword = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      
      // Check if user already exists in database
      const existingProfile = await getUserProfile(user.uid);
      const isNewUser = !existingProfile;

      // Create or update user profile in Firestore
      const profileData = {
        displayName: user.displayName || user.email?.split('@')[0] || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
        uid: user.uid,
      };
      
      // Save to database - preserve createdAt if user already exists
      await saveUserProfile(user.uid, profileData, isNewUser);
      
      console.log(isNewUser ? '✅ New user added to database' : '✅ Existing user updated in database');
    } catch (error) {
      console.error('❌ Error signing in with email/password:', error);
      throw error;
    }
  };

  const signUpWithEmailPassword = async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      
      // Update display name if provided
      if (displayName) {
        await updateProfile(user, { displayName });
      }
      
      // Create user profile in Firestore
      const profileData = {
        displayName: displayName || user.email?.split('@')[0] || '',
        email: user.email || '',
        photoURL: '',
        uid: user.uid,
      };
      
      await saveUserProfile(user.uid, profileData, true);
      
      console.log('✅ New user created and added to database');
    } catch (error) {
      console.error('❌ Error signing up with email/password:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user already exists in database
      const existingProfile = await getUserProfile(user.uid);
      const isNewUser = !existingProfile;
      
      // Transform Google profile image with Cloudinary
      const transformedPhotoURL = user.photoURL ? getProfileImageUrl(user.photoURL) : '';

      // Create or update user profile in Firestore
      const profileData = {
        displayName: user.displayName || '',
        email: user.email || '',
        photoURL: transformedPhotoURL,
        uid: user.uid, // Store UID for reference
      };
      
      // Save to database - preserve createdAt if user already exists
      await saveUserProfile(user.uid, profileData, isNewUser);
      
      console.log(isNewUser ? '✅ New user added to database' : '✅ Existing user updated in database');
    } catch (error) {
      console.error('❌ Error signing in with Google:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateUserProfileData = async (updates) => {
    if (!currentUser) throw new Error('No user logged in');
    
    try {
      setProfileLoading(true);
      
      // Prepare data to update (exclude email as it can't be changed)
      const dataToUpdate = {
        ...updates,
      };
      
      // Remove email from updates if present (email can't be changed)
      if (dataToUpdate.email) {
        delete dataToUpdate.email;
      }
      
      // Transform photoURL with Cloudinary if it's being updated
      let transformedPhotoURL = updates.photoURL;
      if (updates.photoURL && updates.photoURL !== currentUser.photoURL) {
        transformedPhotoURL = getProfileImageUrl(updates.photoURL);
        updates.photoURL = transformedPhotoURL;
      }

      // Update Firebase Auth profile if displayName or photoURL changed
      const authUpdates = {};
      if (updates.displayName !== undefined && updates.displayName !== currentUser.displayName) {
        authUpdates.displayName = updates.displayName;
      }
      if (transformedPhotoURL !== undefined && transformedPhotoURL !== currentUser.photoURL) {
        authUpdates.photoURL = transformedPhotoURL;
      }
      
      if (Object.keys(authUpdates).length > 0) {
        await updateProfile(auth.currentUser, authUpdates);
        console.log('✅ Firebase Auth profile updated');
      }
      
      // Update Firestore profile with all changes
      await saveUserProfile(currentUser.uid, dataToUpdate, false);
      console.log('✅ User profile updated in database:', Object.keys(dataToUpdate));
      
      // Refresh profile data and current user
      await loadUserProfile(currentUser.uid);
      
      // Update currentUser state to reflect changes
      setCurrentUser({ ...auth.currentUser });
    } catch (error) {
      console.error('❌ Error updating user profile:', error);
      throw error;
    } finally {
      setProfileLoading(false);
    }
  };

  const loadUserProfile = async (userId) => {
    try {
      setProfileLoading(true);
      const profile = await getUserProfile(userId);
      setUserProfile(profile);
    } catch (error) {
      console.error('Error loading user profile:', error);
      setUserProfile(null);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Load user profile from Firestore
        await loadUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loginWithGoogle,
    loginWithEmailPassword,
    signUpWithEmailPassword,
    logout,
    updateUserProfileData,
    loadUserProfile,
    loading,
    profileLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};


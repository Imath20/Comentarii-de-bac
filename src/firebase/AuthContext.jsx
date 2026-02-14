import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
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
import { getRoleFlags } from '../utils/adminUtils';

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
  const [modifiedUserProfile, setModifiedUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  const loginWithEmailPassword = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      
      // Check if user already exists in database
      const existingProfile = await getUserProfile(user.uid);
      const isNewUser = !existingProfile;

      const roleFlags = getRoleFlags(user.email || '');

      // Create or update user profile in Firestore
      const profileData = {
        displayName: user.displayName || user.email?.split('@')[0] || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
        uid: user.uid,
        ...roleFlags,
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
      
      const roleFlags = getRoleFlags(user.email || '');

      // Create user profile in Firestore
      const profileData = {
        displayName: displayName || user.email?.split('@')[0] || '',
        email: user.email || '',
        photoURL: '',
        uid: user.uid,
        ...roleFlags,
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

      const roleFlags = getRoleFlags(user.email || '');

      // Create or update user profile in Firestore
      const profileData = {
        displayName: user.displayName || '',
        email: user.email || '',
        photoURL: transformedPhotoURL,
        uid: user.uid, // Store UID for reference
        ...roleFlags,
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

      // Update role flags based on email (don't allow manual changes)
      if (currentUser.email) {
        const roleFlags = getRoleFlags(currentUser.email);
        dataToUpdate.isAdmin = roleFlags.isAdmin;
        dataToUpdate.isSemiAdmin = roleFlags.isSemiAdmin;
        dataToUpdate.role = roleFlags.role;
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

  const loadUserProfile = useCallback(async (userId, showLoading = true) => {
    try {
      if (showLoading) {
        setProfileLoading(true);
      }
      let profile = await getUserProfile(userId);
      
      // Check if user role matches their email and update profile if needed
      if (profile && profile.email) {
        const roleFlags = getRoleFlags(profile.email);
        const updates = {};

        if (profile.isAdmin !== roleFlags.isAdmin) {
          updates.isAdmin = roleFlags.isAdmin;
        }
        if (profile.isSemiAdmin !== roleFlags.isSemiAdmin) {
          updates.isSemiAdmin = roleFlags.isSemiAdmin;
        }
        if (profile.role !== roleFlags.role) {
          updates.role = roleFlags.role;
        }

        if (Object.keys(updates).length > 0) {
          console.log('🔄 Updating user profile role flags for', profile.email, updates);
          await saveUserProfile(userId, updates, false);
          profile = { ...profile, ...updates };
        }
      }
      
      setUserProfile(profile);
    } catch (error) {
      console.error('Error loading user profile:', error);
      setUserProfile(null);
    } finally {
      if (showLoading) {
        setProfileLoading(false);
      }
    }
  }, [saveUserProfile]);

  // Helper function to get shapeshift override from localStorage
  const getShapeshiftOverride = () => {
    try {
      const shapeshiftData = localStorage.getItem('shapeshift');
      if (!shapeshiftData) return null;
      
      const parsed = JSON.parse(shapeshiftData);
      const now = Date.now();
      
      // Check if shapeshift has expired
      if (parsed.expiresAt && now > parsed.expiresAt) {
        localStorage.removeItem('shapeshift');
        return null;
      }
      
      return parsed;
    } catch (error) {
      console.error('Error reading shapeshift data:', error);
      return null;
    }
  };

  // Helper function to apply shapeshift override to profile
  const applyShapeshiftOverride = (profile) => {
    if (!profile) return profile;
    
    const shapeshift = getShapeshiftOverride();
    if (!shapeshift) return profile;
    
    // Create a modified profile with shapeshift role
    const modifiedProfile = { ...profile };
    
    if (shapeshift.role === 'semi-admin') {
      modifiedProfile.isAdmin = false;
      modifiedProfile.isSemiAdmin = true;
      modifiedProfile.role = 'semi-admin';
    } else if (shapeshift.role === 'member' || shapeshift.role === 'user') {
      modifiedProfile.isAdmin = false;
      modifiedProfile.isSemiAdmin = false;
      modifiedProfile.role = 'user';
    }
    
    return modifiedProfile;
  };

  useEffect(() => {
    // Keep loading true until first auth state is known (prevents redirect to login on profile refresh)
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
      
      if (user) {
        // Load user profile from Firestore in background (non-blocking, no loading indicator)
        loadUserProfile(user.uid, false).catch(error => {
          console.error('Error loading user profile in background:', error);
        });
      } else {
        setUserProfile(null);
        // Clear shapeshift on logout
        localStorage.removeItem('shapeshift');
      }
    });

    return unsubscribe;
  }, [loadUserProfile]);

  // Effect to apply shapeshift override when userProfile changes
  useEffect(() => {
    if (userProfile) {
      const modifiedProfile = applyShapeshiftOverride(userProfile);
      setModifiedUserProfile(modifiedProfile);
    } else {
      setModifiedUserProfile(null);
    }
  }, [userProfile]);

  // Effect to check for expired shapeshift and update profile accordingly
  useEffect(() => {
    if (!userProfile || !currentUser) return;
    
    const checkShapeshift = () => {
      const shapeshift = getShapeshiftOverride();
      // If shapeshift was active but now expired, reload profile
      // The applyShapeshiftOverride will automatically remove the override
      // when shapeshift is null, so we just need to trigger a re-render
      // by updating the modified profile
      if (!shapeshift) {
        const modifiedProfile = applyShapeshiftOverride(userProfile);
        setModifiedUserProfile(modifiedProfile);
      }
    };

    // Check every second for expired shapeshift
    const interval = setInterval(checkShapeshift, 1000);
    return () => clearInterval(interval);
  }, [userProfile, currentUser]);

  const value = {
    currentUser,
    userProfile: modifiedUserProfile,
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
      {children}
    </AuthContext.Provider>
  );
};


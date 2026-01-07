import { collection, getDocs, query, orderBy, doc, setDoc, deleteDoc, addDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Fetch all scriitori from Firestore
 * @returns {Promise<Array<Object>>}
 */
export async function fetchScriitori() {
  try {
    const colRef = collection(db, 'scriitori');
    // Fetch all documents without sorting (we'll sort in JavaScript)
    const snap = await getDocs(colRef);
    const scriitori = snap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        key: data.key || doc.id,
        nume: data.nume || '',
        date: data.date || '',
        img: data.img || '',
        banner: data.banner || '',
        color: data.color || '',
        categorie: data.categorie || '',
        canonic: data.canonic !== undefined ? data.canonic : true,
        ordine: data.ordine !== undefined ? data.ordine : 999,
        friends: data.friends || [],
        gallery: data.gallery || [],
        posts: data.posts || [],
        opere: data.opere || {},
        prezentare: data.prezentare || null,
        biografie: data.biografie || '',
        info: data.info || null,
        ...data,
      };
    });
    
    // Sort in JavaScript: first by ordine, then by nume
    scriitori.sort((a, b) => {
      const ordineA = a.ordine !== undefined ? a.ordine : 999;
      const ordineB = b.ordine !== undefined ? b.ordine : 999;
      if (ordineA !== ordineB) {
        return ordineA - ordineB;
      }
      // If ordine is the same, sort by nume
      return a.nume.localeCompare(b.nume, 'ro', { sensitivity: 'base' });
    });
    
    return scriitori;
  } catch (error) {
    console.error('❌ Error fetching scriitori:', error);
    throw error;
  }
}

/**
 * Fetch a single scriitor by key/id
 * @param {string} scriitorKey - The key or id of the scriitor
 * @returns {Promise<Object|null>}
 */
export async function fetchScriitor(scriitorKey) {
  try {
    const scriitorRef = doc(db, 'scriitori', scriitorKey);
    const scriitorSnap = await getDoc(scriitorRef);
    
    if (!scriitorSnap.exists()) {
      return null;
    }
    
    const data = scriitorSnap.data();
    return {
      id: scriitorSnap.id,
      key: data.key || scriitorSnap.id,
      ...data,
    };
  } catch (error) {
    console.error('❌ Error fetching scriitor:', error);
    throw error;
  }
}

/**
 * Remove undefined values from an object (Firestore doesn't accept undefined)
 * @param {Object} obj - The object to clean
 * @returns {Object} - Cleaned object
 */
function removeUndefined(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => removeUndefined(item));
  }
  
  const cleaned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value !== undefined) {
        cleaned[key] = removeUndefined(value);
      }
    }
  }
  return cleaned;
}

/**
 * Add a new scriitor to Firestore
 * @param {Object} scriitorData - The scriitor data to add
 * @returns {Promise<void>}
 */
export async function addScriitor(scriitorData) {
  try {
    const scriitoriRef = collection(db, 'scriitori');
    
    const dataToSave = {
      ...scriitorData,
      friends: scriitorData.friends || [],
      gallery: scriitorData.gallery || [],
      posts: scriitorData.posts || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Remove all undefined values (Firestore doesn't accept undefined)
    const cleanedData = removeUndefined(dataToSave);

    // If key/id is provided, use setDoc with the key, otherwise use addDoc
    if (scriitorData.key || scriitorData.id) {
      const key = scriitorData.key || scriitorData.id;
      const scriitorDocRef = doc(db, 'scriitori', key);
      // Use setDoc with merge: false to completely replace the document (for initial migration)
      // This ensures posts array is completely replaced, not merged
      await setDoc(scriitorDocRef, { ...cleanedData, key }, { merge: false });
      console.log('✅ Scriitor adăugat/actualizat cu succes:', key, `(${cleanedData.posts?.length || 0} postări)`);
    } else {
      const docRef = await addDoc(scriitoriRef, cleanedData);
      console.log('✅ Scriitor adăugat cu succes:', docRef.id, `(${cleanedData.posts?.length || 0} postări)`);
    }
  } catch (error) {
    console.error('❌ Eroare la adăugarea scriitorului:', error);
    throw error;
  }
}

/**
 * Update an existing scriitor in Firestore
 * @param {string} scriitorKey - The key/id of the scriitor
 * @param {Object} scriitorData - The scriitor data to update
 * @returns {Promise<void>}
 */
export async function updateScriitor(scriitorKey, scriitorData) {
  try {
    if (!scriitorKey) {
      throw new Error('Key-ul scriitorului este obligatoriu');
    }

    const scriitorRef = doc(db, 'scriitori', scriitorKey);
    
    const dataToSave = {
      ...scriitorData,
      updatedAt: new Date().toISOString(),
    };

    // Remove all undefined values (Firestore doesn't accept undefined)
    const cleanedData = removeUndefined(dataToSave);

    await setDoc(scriitorRef, cleanedData, { merge: true });
    console.log('✅ Scriitor actualizat cu succes:', scriitorKey);
  } catch (error) {
    console.error('❌ Eroare la actualizarea scriitorului:', error);
    throw error;
  }
}

/**
 * Delete a scriitor from Firestore
 * @param {string} scriitorKey - The key/id of the scriitor to delete
 * @returns {Promise<void>}
 */
export async function deleteScriitor(scriitorKey) {
  try {
    if (!scriitorKey) {
      throw new Error('Key-ul scriitorului este obligatoriu');
    }

    const scriitorRef = doc(db, 'scriitori', scriitorKey);
    await deleteDoc(scriitorRef);
    console.log('✅ Scriitor șters cu succes:', scriitorKey);
  } catch (error) {
    console.error('❌ Eroare la ștergerea scriitorului:', error);
    throw error;
  }
}

/**
 * Add a post to a scriitor
 * @param {string} scriitorKey - The key/id of the scriitor
 * @param {Object} postData - The post data to add
 * @returns {Promise<void>}
 */
export async function addPostToScriitor(scriitorKey, postData) {
  try {
    const scriitor = await fetchScriitor(scriitorKey);
    if (!scriitor) {
      throw new Error('Scriitorul nu a fost găsit');
    }

    const posts = scriitor.posts || [];
    const newPost = {
      id: postData.id || Date.now(),
      ...postData,
      reactions: postData.reactions || [],
      comments: postData.comments || [],
    };
    
    posts.push(newPost);

    await updateScriitor(scriitorKey, { posts });
    console.log('✅ Postare adăugată cu succes pentru:', scriitorKey);
  } catch (error) {
    console.error('❌ Eroare la adăugarea postării:', error);
    throw error;
  }
}

/**
 * Update a post for a scriitor
 * @param {string} scriitorKey - The key/id of the scriitor
 * @param {number|string} postId - The id of the post
 * @param {Object} postData - The updated post data
 * @returns {Promise<void>}
 */
export async function updatePostForScriitor(scriitorKey, postId, postData) {
  try {
    const scriitor = await fetchScriitor(scriitorKey);
    if (!scriitor) {
      throw new Error('Scriitorul nu a fost găsit');
    }

    const posts = scriitor.posts || [];
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) {
      throw new Error('Postarea nu a fost găsită');
    }

    posts[postIndex] = {
      ...posts[postIndex],
      ...postData,
    };

    await updateScriitor(scriitorKey, { posts });
    console.log('✅ Postare actualizată cu succes pentru:', scriitorKey);
  } catch (error) {
    console.error('❌ Eroare la actualizarea postării:', error);
    throw error;
  }
}

/**
 * Delete a post from a scriitor
 * @param {string} scriitorKey - The key/id of the scriitor
 * @param {number|string} postId - The id of the post to delete
 * @returns {Promise<void>}
 */
export async function deletePostFromScriitor(scriitorKey, postId) {
  try {
    const scriitor = await fetchScriitor(scriitorKey);
    if (!scriitor) {
      throw new Error('Scriitorul nu a fost găsit');
    }

    const posts = (scriitor.posts || []).filter(p => p.id !== postId);

    await updateScriitor(scriitorKey, { posts });
    console.log('✅ Postare ștearsă cu succes pentru:', scriitorKey);
  } catch (error) {
    console.error('❌ Eroare la ștergerea postării:', error);
    throw error;
  }
}

/**
 * Add a comment to a post
 * @param {string} scriitorKey - The key/id of the scriitor
 * @param {number|string} postId - The id of the post
 * @param {Object} commentData - The comment data
 * @returns {Promise<void>}
 */
export async function addCommentToPost(scriitorKey, postId, commentData) {
  try {
    const scriitor = await fetchScriitor(scriitorKey);
    if (!scriitor) {
      throw new Error('Scriitorul nu a fost găsit');
    }

    const posts = scriitor.posts || [];
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) {
      throw new Error('Postarea nu a fost găsită');
    }

    const comments = posts[postIndex].comments || [];
    comments.push(commentData);

    posts[postIndex].comments = comments;
    await updateScriitor(scriitorKey, { posts });
    console.log('✅ Comentariu adăugat cu succes');
  } catch (error) {
    console.error('❌ Eroare la adăugarea comentariului:', error);
    throw error;
  }
}

/**
 * Update a comment in a post
 * @param {string} scriitorKey - The key/id of the scriitor
 * @param {number|string} postId - The id of the post
 * @param {number} commentIndex - The index of the comment
 * @param {Object} commentData - The updated comment data
 * @returns {Promise<void>}
 */
export async function updateCommentInPost(scriitorKey, postId, commentIndex, commentData) {
  try {
    const scriitor = await fetchScriitor(scriitorKey);
    if (!scriitor) {
      throw new Error('Scriitorul nu a fost găsit');
    }

    const posts = scriitor.posts || [];
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) {
      throw new Error('Postarea nu a fost găsită');
    }

    const comments = posts[postIndex].comments || [];
    if (commentIndex >= comments.length) {
      throw new Error('Comentariul nu a fost găsit');
    }

    comments[commentIndex] = { ...comments[commentIndex], ...commentData };
    posts[postIndex].comments = comments;
    
    await updateScriitor(scriitorKey, { posts });
    console.log('✅ Comentariu actualizat cu succes');
  } catch (error) {
    console.error('❌ Eroare la actualizarea comentariului:', error);
    throw error;
  }
}

/**
 * Delete a comment from a post
 * @param {string} scriitorKey - The key/id of the scriitor
 * @param {number|string} postId - The id of the post
 * @param {number} commentIndex - The index of the comment to delete
 * @returns {Promise<void>}
 */
export async function deleteCommentFromPost(scriitorKey, postId, commentIndex) {
  try {
    const scriitor = await fetchScriitor(scriitorKey);
    if (!scriitor) {
      throw new Error('Scriitorul nu a fost găsit');
    }

    const posts = scriitor.posts || [];
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) {
      throw new Error('Postarea nu a fost găsită');
    }

    const comments = (posts[postIndex].comments || []).filter((_, idx) => idx !== commentIndex);
    posts[postIndex].comments = comments;
    
    await updateScriitor(scriitorKey, { posts });
    console.log('✅ Comentariu șters cu succes');
  } catch (error) {
    console.error('❌ Eroare la ștergerea comentariului:', error);
    throw error;
  }
}

/**
 * Delete a reaction from a post
 * @param {string} scriitorKey - The key/id of the scriitor
 * @param {number|string} postId - The id of the post
 * @param {number} reactionIndex - The index of the reaction to delete
 * @returns {Promise<void>}
 */
export async function deleteReactionFromPost(scriitorKey, postId, reactionIndex) {
  try {
    const scriitor = await fetchScriitor(scriitorKey);
    if (!scriitor) {
      throw new Error('Scriitorul nu a fost găsit');
    }

    const posts = scriitor.posts || [];
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) {
      throw new Error('Postarea nu a fost găsită');
    }

    const reactions = (posts[postIndex].reactions || []).filter((_, idx) => idx !== reactionIndex);
    posts[postIndex].reactions = reactions;
    
    await updateScriitor(scriitorKey, { posts });
    console.log('✅ Reacție ștearsă cu succes');
  } catch (error) {
    console.error('❌ Eroare la ștergerea reacției:', error);
    throw error;
  }
}

/**
 * Apply moderation corrections (for AI moderator)
 * @param {string} scriitorKey - The key/id of the scriitor
 * @param {Array} corrections - Array of correction objects
 * @returns {Promise<void>}
 */
export async function applyModerationCorrections(scriitorKey, corrections) {
  try {
    const scriitor = await fetchScriitor(scriitorKey);
    if (!scriitor) {
      throw new Error('Scriitorul nu a fost găsit');
    }

    const posts = [...(scriitor.posts || [])];
    let modified = false;

    for (const correction of corrections) {
      const postIndex = posts.findIndex(p => p.id === correction.postId);
      if (postIndex === -1) continue;

      if (correction.type === 'comment') {
        if (correction.action === 'delete') {
          const comments = [...(posts[postIndex].comments || [])];
          if (correction.index < comments.length) {
            comments.splice(correction.index, 1);
            posts[postIndex].comments = comments;
            modified = true;
            console.log(`🗑️ Șters comentariu ${correction.index} din postarea ${correction.postId}`);
          }
        } else if (correction.action === 'correct') {
          const comments = [...(posts[postIndex].comments || [])];
          if (correction.index < comments.length && correction.corrected) {
            comments[correction.index] = {
              ...comments[correction.index],
              text: correction.corrected,
              moderatedAt: new Date().toISOString(),
              moderationReason: correction.reason
            };
            posts[postIndex].comments = comments;
            modified = true;
            console.log(`✏️ Corectat comentariu ${correction.index} din postarea ${correction.postId}`);
          }
        } else if (correction.action === 'add') {
          // Adaugă comentariu nou
          const comments = [...(posts[postIndex].comments || [])];
          comments.push(correction.commentData);
          posts[postIndex].comments = comments;
          modified = true;
          console.log(`➕ Adăugat comentariu nou la postarea ${correction.postId}`);
        }
      } else if (correction.type === 'reaction') {
        if (correction.action === 'delete') {
          const reactions = [...(posts[postIndex].reactions || [])];
          if (correction.index < reactions.length) {
            reactions.splice(correction.index, 1);
            posts[postIndex].reactions = reactions;
            modified = true;
            console.log(`🗑️ Ștearsă reacție ${correction.index} din postarea ${correction.postId}`);
          }
        } else if (correction.action === 'add') {
          // Adaugă reacție nouă
          const reactions = [...(posts[postIndex].reactions || [])];
          reactions.push(correction.reactionData);
          posts[postIndex].reactions = reactions;
          modified = true;
          console.log(`➕ Adăugată reacție nouă la postarea ${correction.postId}`);
        }
      }
    }

    if (modified) {
      await updateScriitor(scriitorKey, { posts });
      console.log('✅ Corectări de moderare aplicate cu succes');
    } else {
      console.log('ℹ️ Nicio modificare aplicată');
    }
  } catch (error) {
    console.error('❌ Eroare la aplicarea corectărilor de moderare:', error);
    throw error;
  }
}

/**
 * Get all scriitori as an object with keys (for backward compatibility)
 * @returns {Promise<Object>} Object with scriitor keys as properties
 */
export async function getScriitoriData() {
  try {
    const scriitoriArray = await fetchScriitori();
    const scriitoriObject = {};
    scriitoriArray.forEach(scriitor => {
      const key = scriitor.key || scriitor.id;
      scriitoriObject[key] = scriitor;
    });
    return scriitoriObject;
  } catch (error) {
    console.error('❌ Error getting scriitori data:', error);
    throw error;
  }
}


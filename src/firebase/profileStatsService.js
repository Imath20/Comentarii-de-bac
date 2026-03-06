/**
 * Profile stats (statistici profil). Stub – poate fi extins cu date din Firestore.
 * @param {string} userId - The user's UID
 * @returns {Promise<object>} Stats object (e.g. { savedCount, commentsCount })
 */
export async function getProfileStats(userId) {
  if (!userId) return { savedCount: 0, commentsCount: 0 };
  return { savedCount: 0, commentsCount: 0 };
}

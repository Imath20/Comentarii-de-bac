// Lista de email-uri admin
export const ADMIN_EMAILS = [
  'romanacoment@gmail.com',
  'matbajean@gmail.com',
  'aleluianu09@gmail.com',
];

export const SEMI_ADMIN_EMAILS = [
  'husaimarts@gmail.com',
  'nicoleta_constantin8@yahoo.com',
];

const normalizeEmail = (email) => (email ? email.toLowerCase().trim() : '');

export function getUserRole(email) {
  const normalized = normalizeEmail(email);
  if (!normalized) return 'user';
  if (ADMIN_EMAILS.includes(normalized)) return 'admin';
  if (SEMI_ADMIN_EMAILS.includes(normalized)) return 'semi-admin';
  return 'user';
}

export function getRoleFlags(email) {
  const role = getUserRole(email);
  return {
    role,
    isAdmin: role === 'admin',
    isSemiAdmin: role === 'semi-admin',
  };
}

/**
 * Verifică dacă un email este admin
 * @param {string} email - Email-ul de verificat
 * @returns {boolean} - true dacă email-ul este admin
 */
export function isAdminEmail(email) {
  return getUserRole(email) === 'admin';
}

/**
 * Verifică dacă un email are rol de semi-admin
 * @param {string} email
 * @returns {boolean}
 */
export function isSemiAdminEmail(email) {
  return getUserRole(email) === 'semi-admin';
}


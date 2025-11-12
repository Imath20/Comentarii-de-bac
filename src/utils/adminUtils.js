// Lista de email-uri admin
export const ADMIN_EMAILS = [
  'romanacoment@gmail.com',
  'matbajean@gmail.com',
  'aleluianu09@gmail.com',
  'nicoletaconstantin8@yahoo.com'
];

/**
 * Verifică dacă un email este admin
 * @param {string} email - Email-ul de verificat
 * @returns {boolean} - true dacă email-ul este admin
 */
export function isAdminEmail(email) {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase().trim());
}


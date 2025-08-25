/**
 * Safely builds a mailto URL with proper encoding and default values
 * @param {Object} params - Email parameters
 * @param {string} params.to - Recipient email address
 * @param {string} [params.firstName=''] - Sender's first name
 * @param {string} [params.lastName=''] - Sender's last name
 * @param {string} [params.email=''] - Sender's email address
 * @param {string} [params.subject=''] - Email subject
 * @param {string} [params.message=''] - Email message
 * @returns {string} Properly encoded mailto URL
 */
export function buildMailto({ 
  to, 
  firstName = '', 
  lastName = '', 
  email = '', 
  subject = '', 
  message = '' 
}) {
  // Safely join name parts, filtering out empty values
  const nameParts = [firstName.trim(), lastName.trim()].filter(Boolean);
  const fullName = nameParts.join(' ');
  
  // Build body with signature block, only including non-empty parts
  const bodyParts = [];
  
  if (message.trim()) {
    bodyParts.push(`Hi,\n\n${message.trim()}`);
  }
  
  // Add signature block
  const signatureParts = ['Best regards'];
  if (fullName) {
    signatureParts.push(fullName);
  }
  if (email.trim()) {
    signatureParts.push(email.trim());
  }
  
  if (signatureParts.length > 1) {
    bodyParts.push(`\n\n${signatureParts.join('\n')}`);
  }
  
  const body = bodyParts.join('');
  
  // Build mailto URL with proper encoding
  const params = new URLSearchParams();
  
  if (subject.trim()) {
    params.set('subject', subject.trim());
  }
  
  if (body) {
    params.set('body', body);
  }
  
  const queryString = params.toString();
  return `mailto:${encodeURIComponent(to)}${queryString ? `?${queryString}` : ''}`;
}

/**
 * Opens the user's email client without creating a blank tab
 * @param {string} href - The mailto URL to open
 */
export function openMailClient(href) {
  // Use window.location.href assignment to avoid blank tabs
  // This is more reliable than window.open for mailto links
  try {
    window.location.href = href;
  } catch {
    // Fallback: create a temporary anchor element and click it
    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
}
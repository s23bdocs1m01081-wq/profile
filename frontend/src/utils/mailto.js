/**
 * Mailto utilities for handling email composition with robust fallbacks
 */

/**
 * Build a mailto URL with proper encoding, excluding empty values
 * @param {Object} params - Email parameters
 * @param {string} params.to - Recipient email address
 * @param {string} [params.subject] - Email subject
 * @param {string} [params.body] - Email body
 * @returns {string} Properly encoded mailto URL
 */
export function buildMailto({ to, subject, body }) {
  if (!to) {
    throw new Error('Recipient email address is required');
  }

  const url = new URL(`mailto:${to}`);
  const searchParams = new URLSearchParams();

  // Only add subject if it's not empty
  if (subject && subject.trim()) {
    searchParams.set('subject', subject.trim());
  }

  // Only add body if it's not empty  
  if (body && body.trim()) {
    searchParams.set('body', body.trim());
  }

  // URLSearchParams automatically handles encoding
  const queryString = searchParams.toString();
  if (queryString) {
    url.search = queryString;
  }

  return url.toString();
}

/**
 * Build a Gmail compose URL with proper encoding
 * @param {Object} params - Email parameters
 * @param {string} params.to - Recipient email address
 * @param {string} [params.subject] - Email subject
 * @param {string} [params.body] - Email body
 * @returns {string} Gmail compose URL
 */
export function buildGmailCompose({ to, subject, body }) {
  if (!to) {
    throw new Error('Recipient email address is required');
  }

  const url = new URL('https://mail.google.com/mail/');
  const searchParams = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: to
  });

  // Only add subject if it's not empty
  if (subject && subject.trim()) {
    searchParams.set('su', subject.trim());
  }

  // Only add body if it's not empty
  if (body && body.trim()) {
    searchParams.set('body', body.trim());
  }

  url.search = searchParams.toString();
  return url.toString();
}

/**
 * Open email client using current tab navigation (no _blank to avoid empty tabs)
 * Uses anchor click fallback for better compatibility
 * @param {string} mailtoUrl - The mailto URL to open
 */
export function openMailClient(mailtoUrl) {
  try {
    // Create a temporary anchor element and click it
    // This is more reliable than window.location.href for mailto links
    const anchor = document.createElement('a');
    anchor.href = mailtoUrl;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  } catch {
    // Fallback to window.location.href if anchor method fails
    window.location.href = mailtoUrl;
  }
}
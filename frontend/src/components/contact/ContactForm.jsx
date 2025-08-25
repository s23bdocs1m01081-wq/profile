import React, { useState, useRef, useEffect } from 'react';
import { buildMailto, buildGmailCompose, openMailClient } from '../../utils/mailto.js';

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
    company: '' // honeypot field
  });
  
  const [submitState, setSubmitState] = useState('idle'); // idle | sending | success | error
  const [statusMessage, setStatusMessage] = useState('');
  const [showGmailFallback, setShowGmailFallback] = useState(false);
  const gmailFallbackTimeoutRef = useRef(null);

  // Get endpoint from environment variable
  const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (gmailFallbackTimeoutRef.current) {
        clearTimeout(gmailFallbackTimeoutRef.current);
      }
    };
  }, []);

  const handleGmailFallback = () => {
    const subject = formData.subject || 'Contact from Portfolio Website';
    const body = `Hi,

${formData.message}

Best regards,
${formData.firstName} ${formData.lastName}
${formData.email}`;

    try {
      const gmailUrl = buildGmailCompose({
        to: 'mohsanalimohsan649@gmail.com',
        subject,
        body
      });
      
      // Open Gmail in new tab
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      setShowGmailFallback(false);
    } catch (error) {
      console.error('Failed to open Gmail compose:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { firstName, email, message } = formData;
    
    if (!firstName.trim()) {
      setStatusMessage('First name is required.');
      return false;
    }
    
    if (!email.trim()) {
      setStatusMessage('Email is required.');
      return false;
    }
    
    if (!email.includes('@')) {
      setStatusMessage('Please enter a valid email address.');
      return false;
    }
    
    if (!message.trim()) {
      setStatusMessage('Message is required.');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check honeypot - if filled, it's spam
    if (formData.company) {
      setSubmitState('error');
      setStatusMessage('Submission blocked. Please try again.');
      return;
    }
    
    if (!validateForm()) {
      setSubmitState('error');
      return;
    }

    setSubmitState('sending');
    setStatusMessage('');

    if (contactEndpoint) {
      // Use form service endpoint
      try {
        const response = await fetch(contactEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
          }),
        });

        if (response.ok) {
          setSubmitState('success');
          setStatusMessage('Thank you! Your message has been sent successfully.');
          // Clear form
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: '',
            company: ''
          });
        } else {
          throw new Error('Failed to send message');
        }
      } catch {
        setSubmitState('error');
        setStatusMessage('Failed to send message. Please try again or use the email link below.');
      }
    } else {
      // Fallback to mailto with detection for failed handler
      const subject = formData.subject || 'Contact from Portfolio Website';
      const body = `Hi,

${formData.message}

Best regards,
${formData.firstName} ${formData.lastName}
${formData.email}`;
      
      try {
        const mailtoLink = buildMailto({
          to: 'mohsanalimohsan649@gmail.com',
          subject,
          body
        });
        
        // Clear any existing timeout
        if (gmailFallbackTimeoutRef.current) {
          clearTimeout(gmailFallbackTimeoutRef.current);
        }
        
        // Reset Gmail fallback state
        setShowGmailFallback(false);
        
        // Open mail client
        openMailClient(mailtoLink);
        
        // Detect if the page is still visible/focused after 1.5s
        // If so, the mailto handler likely didn't take over
        gmailFallbackTimeoutRef.current = setTimeout(() => {
          if (!document.hidden && document.hasFocus()) {
            setShowGmailFallback(true);
          }
        }, 1500);
        
        setSubmitState('success');
        setStatusMessage('Your email client should open now. If it doesn\'t, please use the Gmail option below or email me directly.');
        
      } catch {
        setSubmitState('error');
        setStatusMessage('Failed to open email client. Please copy mohsanalimohsan649@gmail.com and email me directly.');
      }
      
      // Clear form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
        company: ''
      });
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          style={{ display: 'none' }}
          tabIndex="-1"
          autoComplete="off"
        />

        {/* Name fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              aria-invalid={submitState === 'error' && !formData.firstName.trim()}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* Email field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-invalid={submitState === 'error' && (!formData.email.trim() || !formData.email.includes('@'))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
          />
        </div>

        {/* Subject field */}
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
          />
        </div>

        {/* Message field */}
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
            aria-invalid={submitState === 'error' && !formData.message.trim()}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-y"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={submitState === 'sending'}
          className="w-full bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          {submitState === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {/* Status message */}
        {statusMessage && (
          <div
            role="status"
            aria-live="polite"
            className={`mt-4 p-3 rounded-md text-sm ${
              submitState === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {statusMessage}
          </div>
        )}

        {/* Gmail fallback helper - appears when mailto handler likely didn't open */}
        {!contactEndpoint && showGmailFallback && (
          <div
            role="region"
            aria-live="polite"
            className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md"
          >
            <div className="text-sm text-blue-800">
              <p className="mb-3">
                <strong>Email client not opening?</strong> This can happen when your browser or operating system doesn't have a default mail handler configured.
              </p>
              <button
                onClick={handleGmailFallback}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Open Gmail compose instead
              </button>
            </div>
          </div>
        )}

        {/* Helper text for mailto fallback */}
        {!contactEndpoint && (
          <p className="mt-4 text-sm text-gray-600">
            This will open your email client with a pre-filled message to mohsanalimohsan649@gmail.com
          </p>
        )}
      </form>
    </div>
  );
}

export default ContactForm;
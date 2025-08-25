import React, { useState } from 'react';
import ContactForm from '../components/contact/ContactForm.jsx';
import ContactInfo from '../components/contact/ContactInfo.jsx';

function Contact() {
  const [showHelp, setShowHelp] = useState(false);
  const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
  const isDev = import.meta.env.DEV;

  return (
    <section className="py-20">
      {/* Development debug banner */}
      {isDev && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-6 mx-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <span className="text-yellow-800 font-medium">
                  [DEV] Contact Mode: {contactEndpoint ? 'Endpoint' : 'Mailto fallback'}
                </span>
              </div>
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="text-yellow-700 hover:text-yellow-900 underline focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"
              >
                {showHelp ? 'Hide' : 'Help'}
              </button>
            </div>
            {showHelp && (
              <div className="mt-3 text-sm text-yellow-700">
                <p className="mb-2"><strong>To configure email handlers:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong>Windows:</strong> Settings → Apps → Default apps → Email</li>
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Site Settings → Additional permissions → Protocol handlers</li>
                  <li><strong>Gmail:</strong> Visit Gmail → Settings (gear) → See all settings → General → Default email client</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">Let's Connect</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            I'm always interested in hearing about new opportunities and interesting projects. 
            Feel free to reach out if you'd like to collaborate or just want to say hello.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info - Left Column */}
          <div>
            <ContactInfo />
          </div>
          
          {/* Contact Form - Right Column */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
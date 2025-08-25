import React, { useState } from 'react';

function ContactInfo() {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText('mohsanalimohsan649@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      // Fallback - just open mailto if copy fails
      window.open('mailto:mohsanalimohsan649@gmail.com');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
        <p className="text-gray-700 leading-relaxed">
          I'm always interested in hearing about new opportunities and interesting projects. 
          Feel free to reach out if you'd like to collaborate or just want to say hello.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Email</h4>
          <div className="flex items-center gap-2">
            <button
              onClick={handleEmailCopy}
              className="text-slate-700 border-b border-slate-700 hover:text-slate-900 hover:border-slate-900 transition-colors pb-1 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded"
              title="Click to copy email address"
            >
              mohsanalimohsan649@gmail.com
            </button>
            {emailCopied && (
              <span className="text-xs text-green-600 font-medium">Copied!</span>
            )}
          </div>
          <a
            href="mailto:mohsanalimohsan649@gmail.com"
            className="inline-block mt-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Send email →
          </a>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Location</h4>
          <p className="text-gray-700">Pakistan</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Availability</h4>
          <p className="text-gray-700">Open to new opportunities</p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Connect</h4>
        <div className="space-y-2">
          <a
            href="https://github.com/Ch-Mohsan"
            target="_blank"
            rel="noreferrer"
            className="block text-slate-700 border-b border-slate-700 hover:text-slate-900 hover:border-slate-900 transition-colors pb-1 w-fit focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mohsan-zafar-21169136b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noreferrer"
            className="block text-slate-700 border-b border-slate-700 hover:text-slate-900 hover:border-slate-900 transition-colors pb-1 w-fit focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
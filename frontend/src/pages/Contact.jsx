import React from 'react';

function Contact() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h3 className="text-3xl font-semibold text-gray-900 mb-8">Let's Connect</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl">
          I'm always interested in hearing about new opportunities and interesting projects. 
          Feel free to reach out if you'd like to collaborate or just want to say hello.
        </p>
        <div className="flex flex-wrap gap-8">
          <a 
            target='_blank'
            href="mailto:mohsanalimohsan649@gmail.com" 
            className="text-slate-700 border-b border-slate-700 hover:text-slate-900 hover:border-slate-900 transition-colors pb-1"
            rel="noreferrer"
          >
            Email
          </a>
          <a 
            target='_blank'
            href="https://github.com/Ch-Mohsan" 
            className="text-slate-700 border-b border-slate-700 hover:text-slate-900 hover:border-slate-900 transition-colors pb-1"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a 
            target='_blank'
            href="https://www.linkedin.com/in/mohsan-zafar-21169136b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
            className="text-slate-700 border-b border-slate-700 hover:text-slate-900 hover:border-slate-900 transition-colors pb-1"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
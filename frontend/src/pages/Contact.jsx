import React from 'react';
import ContactForm from '../components/contact/ContactForm.jsx';
import ContactInfo from '../components/contact/ContactInfo.jsx';

function Contact() {
  return (
    <section className="py-20">
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
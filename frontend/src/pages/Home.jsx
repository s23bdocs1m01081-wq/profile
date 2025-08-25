import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-semibold text-gray-900 mb-6">
              Building clean, functional web applications with precision and care.
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              I'm a full-stack developer passionate about creating digital experiences that are both beautiful and meaningful.
            </p>
            <Link 
              to="/projects"
              className="inline-block text-slate-700 border-b border-slate-700 hover:text-slate-900 hover:border-slate-900 transition-colors pb-1"
            >
              See my work
            </Link>
          </div>
        </div>
      </section>

      {/* Blog/Currently Working Section */}
     
    </>
  );
}

export default Home;
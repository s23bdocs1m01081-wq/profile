import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects.js';

function Home() {
  const services = [
    {
      title: 'Front‑end engineering',
      description: 'Building accessible, responsive interfaces with React and TypeScript.'
    },
    {
      title: 'Back‑end & APIs',
      description: 'Designing reliable APIs with Node.js and Express, including auth and data workflows.'
    },
    {
      title: 'Delivery & Ops',
      description: 'CI/CD with GitHub Actions and zero‑config deploys to Vercel/Netlify.'
    }
  ];

  // Get first 3 projects for preview
  const selectedProjects = projects.slice(0, 3);

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

      {/* What I do Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">What I do</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="relative">
                <div className="h-full bg-white border border-gray-200 p-6">
                  <h3 className="font-semibold text-slate-700 mb-2">{service.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Tech stack</h2>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'JavaScript', 'Node.js', 'Express', 'Vite', 'Tailwind CSS', 'GitHub Actions', 'Vercel'].map((tech) => (
              <span key={tech} className="inline-block px-3 py-1 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Selected work Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Selected work</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {selectedProjects.map((project) => (
              <article key={project.slug} className="group bg-white border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {project.description.length > 100 ? `${project.description.substring(0, 100)}...` : project.description}
                </p>
                <Link 
                  to="/projects"
                  className="text-sm text-slate-700 border-b border-slate-700 hover:text-slate-900 hover:border-slate-900 transition-colors pb-1"
                >
                  View project
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link 
              to="/projects"
              className="inline-block text-slate-700 border-b border-slate-700 hover:text-slate-900 hover:border-slate-900 transition-colors pb-1"
            >
              See all work
            </Link>
          </div>
        </div>
      </section>
     
    </>
  );
}

export default Home;
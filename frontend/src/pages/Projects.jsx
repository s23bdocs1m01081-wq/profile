import React from 'react';
import { projects } from '../data/projects.js';
import ProjectCard from '../components/ProjectCard.jsx';

function Projects() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h3 className="text-3xl font-semibold text-gray-900 mb-12">Selected Work</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-semibold text-gray-900 mb-12">Currently Working</h3>
          <div className="space-y-8">
            {[
              {
                title: 'Call Agent',
                date: 'july, 31, 2025',
                excerpt: 'This is AI cll Agent here you can add bulk of contacts wapi.ai create calls to you customers and  marketing of you products    .',
              },
              {
                title: 'Booking Management Stytem ',
                date: 'july 15, 2025',
                excerpt: 'In this we can handel accounts of three different users Admin Station Manager and Passenger.',
              },
            ].map((post, index) => (
              <article key={index} className="py-6 border-b border-gray-200 last:border-b-0">
                <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                  <a href="#" className="hover:text-slate-700 transition-colors">{post.title}</a>
                </h4>
                <div className="text-sm text-gray-500 mb-3 font-mono">{post.date}</div>
                <p className="text-gray-700 leading-relaxed">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}

export default Projects;
import React from 'react';
import { Link } from 'react-router-dom';

function ProjectCard({ project }) {
  // Select the best available image
  const getProjectImage = () => {
    if (project.cover) return project.cover;
    if (project.image) return project.image;
    if (project.thumbnail) return project.thumbnail;
    if (project.sections && project.sections.length > 0 && project.sections[0].image) {
      return project.sections[0].image;
    }
    return null;
  };

  // Convert tech string to array and limit to 6 tags
  const getTechTags = () => {
    if (!project.tech) return [];
    return project.tech
      .split(',')
      .map(tag => tag.trim())
      .slice(0, 6);
  };

  const projectImage = getProjectImage();
  const techTags = getTechTags();

  return (
    <article className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 focus-within:ring-2 focus-within:ring-gray-400 focus-within:ring-offset-2">
      <Link 
        to={`/projects/${project.slug}`} 
        className="block focus:outline-none"
        aria-label={`View details for ${project.title}`}
      >
        {/* Device mockup container */}
        <div className="relative p-6 pb-4">
          {/* Subtle desktop surface behind phone */}
          <div className="absolute inset-x-4 top-8 bottom-4 bg-gray-50 rounded-lg opacity-30"></div>
          
          {/* Phone mockup */}
          <div className="relative bg-gray-900 rounded-[1.5rem] p-1 shadow-lg mx-auto max-w-[200px] aspect-[9/16]">
            {/* Phone screen */}
            <div className="bg-white rounded-[1.25rem] overflow-hidden h-full">
              {projectImage ? (
                <img 
                  src={projectImage} 
                  alt={`${project.title} preview`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  sizes="(max-width: 640px) 200px, (max-width: 768px) 180px, 160px"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <div className="text-gray-400 text-xs">No Preview</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <header className="px-6 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {project.description.length > 120 ? `${project.description.substring(0, 120)}...` : project.description}
          </p>

          {/* Tech tags */}
          {techTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {techTags.map((tag, index) => (
                <span 
                  key={index}
                  className="inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="text-sm text-slate-700 border-b border-slate-700 pb-1 inline-block group-hover:text-slate-900 group-hover:border-slate-900 transition-colors">
            View details
          </div>
        </header>
      </Link>
    </article>
  );
}

export default ProjectCard;
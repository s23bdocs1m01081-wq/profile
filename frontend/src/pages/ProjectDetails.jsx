import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects.js';
import FeatureSection from '../components/FeatureSection.jsx';

function ProjectDetails() {
  const { slug } = useParams();
  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    // Auto-advance carousel every 5 seconds
    intervalRef.current = setInterval(() => {
      setCurrentIndex((idx) => (idx + 1) % project.sections.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [project]);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-2xl font-semibold mb-4">Project not found</h1>
        <Link to="/projects" className="text-slate-700 border-b border-slate-700 hover:text-slate-900 hover:border-slate-900 pb-1">Back to Projects</Link>
      </div>
    );
  }

  // Determine device variant based on section title/content
  const getDeviceVariant = (section, index) => {
    const title = section.title.toLowerCase();
    
    // Phone variants
    if (title.includes('mobile') || title.includes('app') || title.includes('messaging') || title.includes('feed')) {
      return { device: 'phone', orientation: 'portrait', notch: true };
    }
    
    // Tablet variants  
    if (title.includes('tablet') || title.includes('collection') || title.includes('catalog')) {
      return { device: 'tablet', orientation: 'landscape' };
    }
    
    // Desktop variants
    if (title.includes('dashboard') || title.includes('admin') || title.includes('overview') || title.includes('workspace')) {
      return { device: 'desktop' };
    }
    
    // Laptop variants
    if (title.includes('detail') || title.includes('checkout') || title.includes('cart') || title.includes('storefront')) {
      return { device: 'laptop' };
    }
    
    // Default cycle through devices for variety
    const devices = [
      { device: 'phone', orientation: 'portrait', notch: true },
      { device: 'tablet', orientation: 'landscape' },
      { device: 'laptop' },
      { device: 'desktop' }
    ];
    
    return devices[index % devices.length];
  };

  const total = project.sections.length;

  const goTo = (index) => {
    setCurrentIndex((index + total) % total);
  };

  return (
    <main className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">{project.title}</h1>

        {/* Carousel */}
        <div className="relative mb-12 rounded-md shadow-md overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {project.sections.map((section, idx) => (
              <div className="min-w-full" key={section.title + idx}>
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-72 sm:h-80 md:h-96 object-cover"
                />
              </div>
            ))}
          </div>

          {/* Prev/Next */}
          <button
            aria-label="Previous slide"
            onClick={() => goTo(currentIndex - 1)}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white/90 p-2 rounded-full z-10"
          >
            <svg className="h-6 w-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
          </button>
          <button
            aria-label="Next slide"
            onClick={() => goTo(currentIndex + 1)}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white/90 p-2 rounded-full z-10"
          >
            <svg className="h-6 w-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {project.sections.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`w-3 h-3 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-white/60'} hover:bg-white`}
              />
            ))}
          </div>
        </div>

        {/* Project Intro */}
        <div className="text-lg text-gray-700 leading-relaxed space-y-4">
          <p>{project.description}</p>
        </div>

        {/* Sections with descriptions */}
        <section className="mt-12 space-y-16">
          {project.sections.map((section, idx) => {
            const deviceConfig = getDeviceVariant(section, idx);
            
            return (
              <FeatureSection
                key={section.title + idx}
                title={section.title}
                description={section.description}
                media={{
                  src: section.image,
                  alt: section.title,
                  ...deviceConfig
                }}
                reverse={idx % 2 === 1} // Alternate layout: even indices = normal, odd indices = reversed
                className="max-w-5xl mx-auto"
              />
            );
          })}
        </section>

        {/* Actions */}
        <div className="text-center mt-12 flex flex-wrap items-center justify-center gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-slate-700 border-b border-slate-700 hover:text-slate-900 hover:border-slate-900 pb-1"
            >
              Repository
            </a>
          )}
          <Link to="/projects" className="inline-block text-slate-700 border-b border-slate-700 hover:text-slate-900 hover:border-slate-900 pb-1">
            Back to Projects
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ProjectDetails;
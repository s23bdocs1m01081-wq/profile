import React from 'react';
import DeviceFrame from './DeviceFrame.jsx';

/**
 * FeatureSection component for displaying feature content with device mockups
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {string} props.description - Section description
 * @param {Object} props.media - Media configuration
 * @param {string} props.media.src - Image source URL
 * @param {string} props.media.alt - Image alt text
 * @param {'phone'|'tablet'|'laptop'|'desktop'} props.media.device - Device variant
 * @param {'portrait'|'landscape'} props.media.orientation - Device orientation
 * @param {boolean} props.media.notch - Show camera notch for phone
 * @param {boolean} props.reverse - Reverse layout (image on right, text on left)
 * @param {string} props.className - Additional CSS classes
 */
function FeatureSection({ 
  title, 
  description, 
  media, 
  reverse = false, 
  className = '' 
}) {
  const imageContent = (
    <DeviceFrame
      variant={media.device || 'phone'}
      orientation={media.orientation || 'portrait'}
      notch={media.notch || false}
      className="w-full"
    >
      <img
        src={media.src}
        alt={media.alt}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
      />
    </DeviceFrame>
  );

  const textContent = (
    <div className="space-y-4">
      <header>
        <h3 className="text-2xl font-semibold text-gray-900 leading-tight">
          {title}
        </h3>
      </header>
      <p className="text-gray-700 leading-relaxed">
        {description}
      </p>
    </div>
  );

  return (
    <section 
      className={`grid gap-8 md:gap-12 items-center ${className}`}
      role="region"
      aria-labelledby={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Mobile: Always stack with image first */}
      <div className="md:hidden space-y-6">
        <figure className="flex justify-center">
          {imageContent}
        </figure>
        {textContent}
      </div>

      {/* Desktop: Side-by-side layout with optional reverse */}
      <div className={`hidden md:grid md:grid-cols-2 md:gap-12 items-center ${
        reverse ? 'md:grid-flow-col-dense' : ''
      }`}>
        <figure className={`flex justify-center ${reverse ? 'md:col-start-2' : ''}`}>
          {imageContent}
        </figure>
        <div className={reverse ? 'md:col-start-1' : ''}>
          {textContent}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;